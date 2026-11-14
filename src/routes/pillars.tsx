import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PillarsGrid } from "@/components/site/PillarsGrid";
import { LIFESAKHI_BRAND } from "@/data/lifesakhi";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/pillars")({
  head: () =>
    seo(
      "Our Six Strategic Pillars — LifeSakhi",
      "Explore LifeSakhi's six ecosystem pillars: Care & Assistance, Women Empowerment, Health & Wellbeing, Child Development, Community Development, and Learning & Development.",
      {
        canonical: "https://apna-care.vercel.app/pillars",
        keywords: [
          "LifeSakhi pillars",
          "women empowerment South India",
          "child development initiatives",
          "Saha care and assistance",
          "women self help group training",
        ],
      }
    ),
  component: PillarsPage,
});

function PillarsPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-primary-soft/35 section-spacing">
        <div className="container-page max-w-4xl">
          <p className="eyebrow">LifeSakhi Ecosystem Architecture</p>
          <h1 className="mt-3 font-display text-fluid-hero font-semibold text-foreground">
            Six Pillars Built Around Strength, Care & Agency
          </h1>
          <p className="mt-4 text-fluid-body text-muted-foreground">
            {LIFESAKHI_BRAND.philosophySummary} Every pillar below transparently distinguishes our operational services today from active community outreach and proposed future programmes.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-primary/20 bg-card px-4 py-2.5 text-xs font-medium text-foreground">
            <ShieldCheck className="size-4 text-primary shrink-0" />
            <span>
              Transparency Standard: Proposed programmes are clearly marked and are not represented as currently operational until launched with verified partners.
            </span>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-page">
          <PillarsGrid />

          <div className="mt-12 rounded-3xl border border-border bg-card p-8 text-center">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Want to collaborate on expanding our pillars?
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
              Whether you represent a Women&apos;s Self-Help Group, an NGO, a hospital, or an educational institution, we welcome grounded partnerships across South India.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/get-involved">
                  Explore Ways to Get Involved
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/services">View Operational Care Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

