import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LifeStagesJourney } from "@/components/site/LifeStagesJourney";
import { LIFESAKTHI_BRAND, LIFE_STAGES } from "@/data/lifesakthi";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/life-stages")({
  head: () =>
    seo(
      "Every Stage of Her Life — LifeSakthi",
      "Explore how LifeSakthi supports girls and women across six life stages: birth and early childhood, childhood, adolescence, young adulthood, motherhood, and elderhood.",
      {
        canonical: "https://apna-care.vercel.app/life-stages",
        keywords: [
          "LifeSakthi life stages",
          "women and child development India",
          "girl child development",
          "maternal wellbeing South India",
          "elderly women dignity",
        ],
      }
    ),
  component: LifeStagesPage,
});

function LifeStagesPage() {
  return (
    <div className="bg-background">
      {/* Header */}
      <section className="border-b border-border bg-primary-soft/35 section-spacing">
        <div className="container-page max-w-4xl">
          <p className="eyebrow">{LIFESAKTHI_BRAND.supportingMessage}</p>
          <h1 className="mt-3 font-display text-fluid-hero font-semibold text-foreground">
            A Lifelong Commitment — Not Just a Single Service
          </h1>
          <p className="mt-4 text-fluid-body text-muted-foreground">
            {LIFESAKTHI_BRAND.heroDescription} Select any stage below to see the challenges women and children face, the support needed, and how LifeSakthi contributes today and as we grow.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/booking">
                Request Support Now
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/get-involved">Join or Partner With Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Journey */}
      <section className="section-spacing">
        <div className="container-page">
          <LifeStagesJourney />
        </div>
      </section>

      {/* Full Six-Stage Narrative Grid */}
      <section id="early-stages" className="border-t border-border bg-card section-spacing">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">All Six Chapters</p>
            <h2 className="mt-2 font-display text-fluid-section font-semibold text-foreground">
              Connected Across Generations
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {LIFE_STAGES.map((stage) => (
              <article
                key={stage.id}
                id={stage.id === "young-adulthood-independence" ? "adulthood" : stage.id === "ageing-elderhood" ? "elderhood" : undefined}
                className="flex flex-col justify-between rounded-3xl border border-border bg-background p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                      Stage {stage.stepNumber} · {stage.ageContext}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-foreground">
                      <Sparkles className="size-3 text-primary" />
                      {stage.status}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                    {stage.stageName}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stage.howLifeSakthiContributes}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-border">
                  <Link
                    to={stage.ctaTo}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    {stage.ctaLabel}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
