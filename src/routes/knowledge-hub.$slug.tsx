import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, Clock, Calendar, User, ShieldCheck, CheckCircle2, Share2, BookOpen } from "lucide-react";
import { ARTICLES, getArticle } from "@/data/site";
import { ArticleCard } from "@/components/site/Cards";
import { BookLink } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { toast } from "sonner";

export const Route = createFileRoute("/knowledge-hub/$slug")({
  loader: ({ params }) => {
    const a = getArticle(params.slug);
    if (!a) throw notFound();
    return { a };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.a.title} — ApnaCare Knowledge Hub` },
            { name: "description", content: loaderData.a.excerpt },
            { property: "og:title", content: loaderData.a.title },
            { property: "og:description", content: loaderData.a.excerpt },
            { property: "og:type", content: "article" },
          ],
        }
      : { meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }] },
  component: ArticleDetailPage,
});

function ArticleDetailPage() {
  const { a } = Route.useLoaderData();

  useEffect(() => {
    track("knowledge_article_view", { slug: a.slug });
  }, [a.slug]);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Article link copied to clipboard!");
    }
  };

  return (
    <article className="container-page max-w-3xl py-12 md:py-20">
      <div className="mb-6 flex items-center justify-between">
        <Button asChild variant="ghost" size="sm" className="gap-2">
          <Link to="/knowledge-hub">
            <ArrowLeft className="size-4" /> Back to Knowledge Hub
          </Link>
        </Button>
        <Button onClick={handleShare} variant="outline" size="sm" className="gap-2">
          <Share2 className="size-3.5" /> Share Guide
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-muted-foreground">
        <span className="rounded-full bg-primary-soft px-3 py-1 text-primary">{a.category}</span>
        <span className="flex items-center gap-1"><Clock className="size-3.5" /> {a.readTime}</span>
        <span className="flex items-center gap-1"><Calendar className="size-3.5" /> {a.date}</span>
      </div>

      <h1 className="mt-4 text-3xl font-semibold leading-tight text-foreground md:text-4xl lg:text-5xl">
        {a.title}
      </h1>

      <p className="mt-4 text-lg text-muted-foreground leading-relaxed italic border-l-2 border-primary pl-4">
        {a.excerpt}
      </p>

      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground pb-8 border-b border-border">
        <User className="size-3.5 text-primary" />
        <span>Curated by: <strong className="text-foreground">{a.author}</strong></span>
      </div>

      {/* Key Takeaways Box */}
      {a.keyTakeaways && a.keyTakeaways.length > 0 && (
        <div className="my-8 rounded-3xl border border-primary/20 bg-primary-soft/40 p-6 md:p-8">
          <h2 className="text-base font-bold uppercase tracking-wider text-primary flex items-center gap-2">
            <CheckCircle2 className="size-5" /> Key Takeaways for Families
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-foreground">
            {a.keyTakeaways.map((k, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="font-display font-bold text-terracotta mt-0.5">•</span>
                <span className="leading-relaxed">{k}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Article Body */}
      <div className="space-y-6 text-base md:text-lg leading-relaxed text-foreground/90">
        {a.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-12 rounded-2xl bg-secondary/50 p-5 text-xs text-muted-foreground leading-relaxed flex items-start gap-3">
        <ShieldCheck className="size-5 shrink-0 text-primary mt-0.5" />
        <span>
          <strong>Informational Notice:</strong> This article is published by ApnaCare's safety and medical editorial desk for community awareness. It is not intended as a substitute for professional clinical diagnosis or legal counsel. Always consult registered physicians for specific medical concerns.
        </span>
      </div>

      {/* Care CTA */}
      <div className="mt-12 rounded-3xl border border-border bg-card p-8 text-center space-y-4 shadow-soft">
        <h3 className="text-2xl font-semibold">Need Hands-on Attendant Support at Home?</h3>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">
          Our verified women attendants assist with senior mobility, hospital bedside care, and newborn nurturing.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <BookLink size="lg" variant="warm">
            Book an Attendant
          </BookLink>
        </div>
      </div>

      {/* Related Articles */}
      <div className="mt-16 border-t border-border pt-12">
        <h2 className="text-2xl font-semibold">Related Reading & Resources</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 2).map((x) => (
            <ArticleCard key={x.slug} a={x} />
          ))}
        </div>
      </div>
    </article>
  );
}
