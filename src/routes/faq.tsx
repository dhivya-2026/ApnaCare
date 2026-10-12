import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, HelpCircle, Phone, MessageCircle, HeartHandshake } from "lucide-react";
import { FAQS, SITE, type FAQItem } from "@/data/site";
import { PageHero } from "@/components/site/Cards";
import { BookLink, CallLink } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () =>
    seo(
      "Frequently Asked Questions — ApnaCare",
      "Answers to questions about ApnaCare attendant police verification, shift timings, transparent 18% GST pricing, emergency SOS response, and cancellation guarantees."
    ),
  component: FAQPage,
});

const CATEGORIES = [
  "All",
  "Safety & Verification",
  "Booking & Rescheduling",
  "Pricing & GST",
  "Caregiver Matching",
  "Emergency & SOS",
  "Partnerships",
] as const;

function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = FAQS.filter((item) => {
    const matchesCat = activeCategory === "All" || item.category === activeCategory;
    const matchesQuery =
      query.trim() === "" ||
      item.q.toLowerCase().includes(query.toLowerCase()) ||
      item.a.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <>
      <PageHero
        eyebrow="Got Questions?"
        title="Frequently Asked Questions"
        sub="Everything you need to know about our women attendant vetting, shift options, fair pricing, and emergency support protocols."
      >
        <BookLink size="lg" variant="warm">
          Book an Attendant
        </BookLink>
        <CallLink variant="outline">Ask a Care Coordinator</CallLink>
      </PageHero>

      <section className="container-page py-12 md:py-16">
        {/* Search & Category Filter */}
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions by keyword (e.g. police verification, refund, night shifts)..."
              className="h-14 w-full rounded-2xl border border-border bg-card pl-12 pr-4 text-base shadow-2xs outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accessible Accordion */}
        <div className="mx-auto mt-12 max-w-3xl">
          {filtered.length > 0 ? (
            <Accordion type="multiple" defaultValue={filtered.map((_, i) => String(i))} className="space-y-4">
              {filtered.map((faq, idx) => (
                <AccordionItem
                  key={faq.q}
                  value={String(idx)}
                  className="rounded-2xl border border-border bg-card shadow-2xs transition-all hover:border-primary/40 overflow-hidden border-b-0"
                >
                  <AccordionTrigger className="flex w-full items-center justify-between p-6 text-left font-semibold text-base md:text-lg transition-colors hover:text-primary hover:no-underline">
                    <span className="flex items-center gap-3 pr-4">
                      <HelpCircle className="size-5 shrink-0 text-primary/70" />
                      {faq.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="border-t border-border/60 bg-muted/20 px-6 pb-6 pt-4 text-sm md:text-base leading-relaxed text-muted-foreground">
                    <span className="mb-2 inline-block rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-foreground/70">
                      {faq.category}
                    </span>
                    <p className="mt-1">{faq.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              <p className="text-lg font-medium">No questions matched your search "{query}".</p>
              <p className="mt-2 text-sm">Try searching for a different keyword or contact our support team directly.</p>
              <Button onClick={() => { setQuery(""); setActiveCategory("All"); }} variant="outline" className="mt-4">
                Reset Filters
              </Button>
            </div>
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-border bg-card p-8 md:p-10 shadow-soft text-center">
          <HeartHandshake className="mx-auto size-12 text-primary" />
          <h3 className="mt-4 text-2xl font-semibold">Still have a question?</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Our care coordinators are available 24/7 to walk you through service configurations, attendant interviews, and custom family scheduling.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <CallLink size="lg" />
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Write to Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
