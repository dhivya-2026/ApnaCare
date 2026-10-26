import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, HelpCircle, Phone, MessageCircle, ShieldCheck, CheckCircle2 } from "lucide-react";
import { SITE, buildWhatsAppUrl } from "@/data/site";
import { AEO_FAQS, buildFaqPageSchema, buildBreadcrumbSchema } from "@/data/enterprise-content";
import { PageHero } from "@/components/site/Cards";
import { BookLink } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () =>
    seo(
      "Frequently Asked Questions — ApnaCare Care & Safety Knowledge Base",
      "Direct, authoritative answers about ApnaCare attendant police verification, shift options, nurse vs attendant scope, pricing, and guaranteed 90-minute backup.",
      {
        canonical: "https://apna-care.vercel.app/faq",
        keywords: [
          "ApnaCare FAQ",
          "caregiver verification questions",
          "nurse vs attendant scope",
          "elderly care cost Bengaluru",
          "home care emergency backup",
        ],
        schema: [
          buildFaqPageSchema(AEO_FAQS),
          buildBreadcrumbSchema([
            { name: "Home", item: "https://apna-care.vercel.app" },
            { name: "FAQs", item: "https://apna-care.vercel.app/faq" },
          ]),
        ],
      }
    ),
  component: FAQPage,
});

const CATEGORIES = [
  "All",
  "Services & Scope",
  "Safety & Verification",
  "Booking & Pricing",
  "Daily Operations",
  "Coverage",
] as const;

function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = AEO_FAQS.filter((item) => {
    const matchesCat = activeCategory === "All" || item.category === activeCategory;
    const matchesQuery =
      query.trim() === "" ||
      item.q.toLowerCase().includes(query.toLowerCase()) ||
      item.aDirect.toLowerCase().includes(query.toLowerCase()) ||
      item.aDetailed.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const waUrl = buildWhatsAppUrl("Hello ApnaCare team! I have a question about care arrangements for my family.");

  return (
    <>
      <PageHero
        eyebrow="Answer Engine & FAQs"
        title="Direct Answers to Real Family Questions"
        sub="Clear, straightforward information regarding Saha team verification, nurse vs attendant scopes, transparent billing, and operational protocols."
      >
        <BookLink size="lg" variant="warm">
          Find Your Saha
        </BookLink>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/15 px-6 py-3 text-sm font-semibold text-[#128C7E] transition-colors hover:bg-[#25D366]/25"
        >
          <MessageCircle className="size-4 text-[#25D366]" />
          Ask Directly on WhatsApp
        </a>
      </PageHero>

      <section className="container-page py-12 md:py-20">
        {/* Search & Category Filter */}
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions (e.g. police verification, nurse scope, 90 min backup, pricing)..."
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

        {/* FAQs Accessible Accordion with AEO Direct Answers */}
        <div className="mx-auto mt-12 max-w-3xl">
          {filtered.length > 0 ? (
            <Accordion type="multiple" defaultValue={filtered.map((_, i) => String(i))} className="space-y-4">
              {filtered.map((faq, idx) => (
                <AccordionItem
                  key={faq.q}
                  value={String(idx)}
                  className="rounded-2xl border border-border bg-card shadow-soft transition-all hover:border-primary/40 overflow-hidden border-b-0"
                >
                  <AccordionTrigger className="flex w-full items-center justify-between p-6 text-left font-semibold text-base md:text-lg transition-colors hover:text-primary hover:no-underline">
                    <span className="flex items-center gap-3 pr-4">
                      <HelpCircle className="size-5 shrink-0 text-primary" />
                      {faq.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-0 text-sm leading-relaxed border-t border-border/50">
                    {/* AEO Direct Answer: Highlighted first sentence */}
                    <div className="rounded-xl bg-primary-soft/50 p-4 font-medium text-foreground">
                      <p className="text-xs uppercase font-bold tracking-wider text-primary mb-1">Direct Answer</p>
                      <p>{faq.aDirect}</p>
                    </div>

                    {/* Detailed Context */}
                    <div className="mt-4 text-muted-foreground space-y-2">
                      <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Practical Details</p>
                      <p>{faq.aDetailed}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-12 text-center">
              <p className="text-base font-semibold">No questions matching your search</p>
              <p className="mt-1 text-sm text-muted-foreground">Try clearing your filters or contact our care coordinators directly.</p>
              <Button onClick={() => { setQuery(""); setActiveCategory("All"); }} variant="outline" className="mt-4">
                Reset Search
              </Button>
            </div>
          )}
        </div>

        {/* Still Have Questions Reassurance Box */}
        <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-border bg-card p-8 md:p-10 shadow-soft">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <span className="eyebrow">Personal Support</span>
              <h3 className="mt-1 text-xl font-semibold text-foreground">Have a Specific Care Scenario?</h3>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                Our care coordinators are on call to explain care plans, shift hours, and matched caregiver options.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/15 px-5 py-2.5 text-xs font-semibold text-[#128C7E] transition-colors hover:bg-[#25D366]/25"
              >
                <MessageCircle className="size-4 text-[#25D366]" />
                WhatsApp
              </a>
              <Button asChild size="sm">
                <Link to="/contact">Contact Care Desk</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
