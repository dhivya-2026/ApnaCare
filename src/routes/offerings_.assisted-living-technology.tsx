import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, CheckCircle2, ArrowRight, Cpu, AlertCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, SectionHeading } from "@/components/site/Cards";
import { CallLink } from "@/components/site/Layout";
import { ASSISTED_LIVING_SOLUTIONS, type TechReadiness } from "@/data/supportServices";
import { SITE } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/offerings_/assisted-living-technology")({
  head: () =>
    seo(
      "Assisted Living Technology — Remote Monitoring, SOS & Smart Home Safety | LifeSakhi",
      "Technology that makes independent living safer and care more connected: Remote Patient Monitoring, Wearable SOS, Smart Home Sensors and Family Care Coordination.",
      {
        canonical: "https://apna-care.vercel.app/offerings/assisted-living-technology",
        keywords: ["assisted living technology", "wearable SOS for elderly", "remote patient monitoring India"],
      }
    ),
  component: AssistedLivingTechnologyPage,
});

const READINESS_STYLES: Record<TechReadiness, string> = {
  Deployed: "bg-emerald-500/15 text-emerald-800 border-emerald-500/30",
  "Available Through Partners": "bg-primary/10 text-primary border-primary/25",
  "Under Evaluation": "bg-amber-500/15 text-amber-800 border-amber-500/30",
};

function AssistedLivingTechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Division C · Technology for Assisted Living"
        title="Technology That Makes Independent Living Safer and Care More Connected."
        sub="Practical assisted-living capabilities paired with human Saha support — with honest status labels showing what is live today, what is available through partners, and what is under evaluation."
      />

      <section className="container-page pt-8">
        <div className="flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary-soft/40 p-4 text-xs sm:text-sm text-foreground">
          <AlertCircle className="size-4 shrink-0 text-primary mt-0.5" aria-hidden />
          <p>
            <strong>Honest capability disclosure:</strong> Every solution below clearly marks whether it is{" "}
            <strong>Deployed</strong> on LifeSakhi, <strong>Available Through Partners</strong>, or{" "}
            <strong>Under Evaluation</strong>. We do not fabricate live device telemetry or AI predictions.
          </p>
        </div>
      </section>

      <section className="container-page py-12 space-y-8">
        <SectionHeading
          eyebrow="Five Solution Areas"
          title="How technology supports families and elders"
          sub="Explore what each solution does, who needs it, what equipment is required, and how to request a demonstration."
        />

        <div className="space-y-6">
          {ASSISTED_LIVING_SOLUTIONS.map((sol, idx) => (
            <article key={sol.id} id={sol.id} className="card-soft p-6 sm:p-8 bg-card border-border space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Solution 0{idx + 1}
                  </span>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">{sol.title}</h2>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${
                    READINESS_STYLES[sol.readiness]
                  }`}
                >
                  <Cpu className="size-3.5" aria-hidden />
                  {sol.readiness}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 text-xs sm:text-sm">
                <div className="rounded-2xl bg-secondary/35 p-4 border border-border/60">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary">What it is</p>
                  <p className="mt-1.5 text-foreground leading-relaxed">{sol.whatItIs}</p>
                </div>
                <div className="rounded-2xl bg-secondary/35 p-4 border border-border/60">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary">Who needs it</p>
                  <p className="mt-1.5 text-foreground leading-relaxed">{sol.whoNeedsIt}</p>
                </div>
                <div className="rounded-2xl bg-secondary/35 p-4 border border-border/60">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary">What problem it addresses</p>
                  <p className="mt-1.5 text-foreground leading-relaxed">{sol.problem}</p>
                </div>
                <div className="rounded-2xl bg-secondary/35 p-4 border border-border/60">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary">How it works</p>
                  <p className="mt-1.5 text-foreground leading-relaxed">{sol.howItWorks}</p>
                </div>
                <div className="rounded-2xl bg-secondary/35 p-4 border border-border/60">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary">What the family receives</p>
                  <p className="mt-1.5 text-foreground leading-relaxed">{sol.familyReceives}</p>
                </div>
                <div className="rounded-2xl bg-secondary/35 p-4 border border-border/60">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary">Equipment / integrations required</p>
                  <p className="mt-1.5 text-foreground leading-relaxed">{sol.equipment}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-primary shrink-0" aria-hidden />
                  <span>{sol.demo}</span>
                </p>
                <Button asChild size="sm" variant="warm" className="rounded-full text-xs font-semibold">
                  <Link to="/booking" search={{ service: "assisted-living-technology" }}>
                    Request Demonstration
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-primary py-12 text-primary-foreground">
        <div className="container-page flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-white">
              Discuss assisted living technology for your parents
            </h2>
            <p className="mt-2 text-sm text-primary-foreground/85 max-w-lg">
              Speak with our coordinator at {SITE.SUPPORT_PHONE} or submit a demonstration request with your home setup details.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="warm" className="rounded-full font-semibold">
              <Link to="/booking" search={{ service: "assisted-living-technology" }}>
                Request Technology Demo
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <CallLink />
          </div>
        </div>
      </section>
    </>
  );
}
