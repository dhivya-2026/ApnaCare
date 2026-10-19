import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FileText, BookOpen, Clock, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { ARTICLES, ARTICLE_CATEGORIES } from "@/data/site";
import {
  CONTENT_PLAN_ASSETS,
  buildBreadcrumbSchema,
} from "@/data/enterprise-content";
import { ArticleCard, PageHero } from "@/components/site/Cards";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/knowledge-hub/")({
  head: () =>
    seo(
      "Knowledge Hub — ApnaCare Family Care Guides & Research",
      "Educational articles, practical eldercare guides, hospital bedside protocols, and research whitepapers for families across South India.",
      {
        canonical: "https://apna-care.vercel.app/knowledge-hub",
        keywords: [
          "elderly care guides",
          "hospital bedside protocols",
          "caregiver vetting guide",
          "post natal advice",
          "home healthcare research",
        ],
        schema: [
          buildBreadcrumbSchema([
            { name: "Home", item: "https://apna-care.vercel.app" },
            { name: "Knowledge Hub", item: "https://apna-care.vercel.app/knowledge-hub" },
          ]),
        ],
      }
    ),
  component: Hub,
});

function Hub() {
  const [activeTab, setActiveTab] = useState<"guides" | "research">("guides");
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const filteredArticles = ARTICLES.filter(
    (a) =>
      (cat === "All" || a.category === cat) &&
      (q.trim() === "" ||
        a.title.toLowerCase().includes(q.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <>
      <PageHero
        eyebrow="Knowledge & Education"
        title="Family Care Knowledge Hub"
        sub="Practical handbooks, vetting checklists, and evidence-based caregiving research curated by our care coordinators."
      />

      {/* Primary Section Switcher */}
      <section className="border-b border-border bg-card">
        <div className="container-page flex items-center gap-6 py-4">
          <button
            onClick={() => setActiveTab("guides")}
            className={cn(
              "flex items-center gap-2 pb-2 text-sm font-semibold border-b-2 transition-colors",
              activeTab === "guides"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <BookOpen className="size-4" />
            <span>Practical Care Guides ({ARTICLES.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("research")}
            className={cn(
              "flex items-center gap-2 pb-2 text-sm font-semibold border-b-2 transition-colors",
              activeTab === "research"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <FileText className="size-4" />
            <span>Whitepapers & Case Studies ({CONTENT_PLAN_ASSETS.length})</span>
          </button>
        </div>
      </section>

      <section className="container-page py-12 md:py-16">
        {activeTab === "guides" ? (
          <div>
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <Input
                aria-label="Search guides"
                placeholder="Search care guides and checklists…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="h-12 max-w-md rounded-full bg-card"
              />
              <div className="flex flex-wrap gap-2">
                {ARTICLE_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    aria-pressed={cat === c}
                    onClick={() => {
                      setCat(c);
                      track("knowledge_filter", { c });
                    }}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all",
                      cat === c
                        ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((a) => (
                <ArticleCard key={a.slug} a={a} />
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="rounded-2xl border border-border bg-card p-12 text-center mt-10">
                <p className="text-base font-semibold">No guides matching your criteria</p>
                <p className="mt-1 text-sm text-muted-foreground">Try clearing your search terms or filters.</p>
                <Button onClick={() => { setQ(""); setCat("All"); }} variant="outline" className="mt-4">
                  Reset Filter
                </Button>
              </div>
            )}
          </div>
        ) : (
          /* Research, Whitepapers, and Case Studies Plan */
          <div className="space-y-12">
            <div>
              <span className="eyebrow">Enterprise Research & Case Studies</span>
              <h2 className="mt-2 text-2xl font-semibold md:text-3xl text-foreground">
                Evidence-Based Studies & Care Walkthroughs
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Documenting operational best practices, caregiver retention data, and verified care continuity pathways in South India.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {CONTENT_PLAN_ASSETS.map((asset) => (
                <article
                  key={asset.id}
                  className="card-soft p-6 md:p-8 flex flex-col justify-between hover:shadow-lift transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary capitalize">
                        {asset.type.replace("_", " ")}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {asset.readTime}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-semibold text-foreground leading-snug">
                      {asset.title}
                    </h3>
                    <p className="mt-2 text-xs font-medium text-terracotta">
                      Audience: {asset.targetAudience}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {asset.summary}
                    </p>

                    <div className="mt-5 space-y-1.5 border-t border-border pt-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Key Takeaways:</p>
                      {asset.keyTakeaways.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-foreground/90">
                          <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-medium">
                      Status: {asset.publicationStatus === "published" ? "Live Guide" : "Research Plan"}
                    </span>
                    {asset.slug ? (
                      <Link
                        to="/knowledge-hub/$slug"
                        params={{ slug: asset.slug }}
                        className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                      >
                        <span>Read Full Guide</span>
                        <ArrowRight className="size-3.5" />
                      </Link>
                    ) : (
                      <span className="text-xs font-semibold text-muted-foreground">
                        {asset.verificationStatus === "illustrative_scenario" ? "Illustrative Scenario" : "Internal Research"}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Governance Assurance Note */}
            <div className="rounded-2xl border border-primary/20 bg-primary-soft/30 p-6 flex items-start gap-4">
              <ShieldCheck className="size-5 text-primary shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-muted-foreground">
                <p className="font-semibold text-foreground">Content Governance & Integrity Standard</p>
                <p className="mt-1">
                  ApnaCare strictly distinguishes verified operational facts from illustrative planning models. Case studies with fictionalized names are labeled as illustrative care paths, and statistical citations reference confirmed operational records.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
