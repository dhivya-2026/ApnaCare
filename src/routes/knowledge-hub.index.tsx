import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ARTICLES, ARTICLE_CATEGORIES } from "@/data/site";
import { ArticleCard, PageHero } from "@/components/site/Cards";
import { track } from "@/lib/analytics";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/knowledge-hub/")({
  head: () => seo("Knowledge Hub — ApnaCare Guides & Resources", "Articles and guides on women safety, senior citizen care, health awareness and government schemes."),
  component: Hub,
});

function Hub() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const list = ARTICLES.filter((a) => (cat === "All" || a.category === cat) && a.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHero eyebrow="Knowledge Hub" title="Education & Resources" sub="Articles, handbooks, and guides curated by safety experts and medical coordinators." />
      <section className="container-page py-12">
        <Input aria-label="Search articles" placeholder="Search articles…" value={q} onChange={(e) => setQ(e.target.value)} className="h-12 max-w-md rounded-full bg-card" />
        <div className="mt-6 flex flex-wrap gap-2">
          {ARTICLE_CATEGORIES.map((c) => <button key={c} aria-pressed={cat === c} onClick={() => { setCat(c); track("knowledge_filter", { c }); }} className={cn("rounded-full border px-4 py-2 text-sm font-medium", cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card")}>{c}</button>)}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
        {list.length === 0 && <p className="mt-10 text-center text-muted-foreground">No articles found.</p>}
      </section>
    </>
  );
}
