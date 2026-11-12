import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { LIFESAKTHI_PILLARS, type LifeSakthiPillar } from "@/data/lifesakthi";

function readinessStyle(readiness: LifeSakthiPillar["readiness"]) {
  if (readiness === "Operational Now") {
    return "bg-primary text-primary-foreground";
  }
  if (readiness === "Active Outreach & Expanding") {
    return "bg-terracotta/15 text-terracotta border border-terracotta/30";
  }
  return "bg-plum/10 text-plum border border-plum/20";
}

export function PillarsGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {LIFESAKTHI_PILLARS.map((pillar) => (
        <article
          key={pillar.id}
          className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-xs transition-shadow hover:shadow-md"
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-sm font-bold text-muted-foreground">
                Pillar {pillar.code}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${readinessStyle(
                  pillar.readiness
                )}`}
              >
                {pillar.readiness}
              </span>
            </div>

            <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
              {pillar.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {pillar.summary}
            </p>

            <ul className="mt-4 space-y-2 border-t border-border pt-4">
              {pillar.focusAreas.map((focus) => (
                <li key={focus} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{focus}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-2">
            <Link
              to={pillar.ctaTo}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              {pillar.ctaLabel}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
