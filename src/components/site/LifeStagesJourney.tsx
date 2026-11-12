import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { LIFE_STAGES, type LifeStage } from "@/data/lifesakthi";
import { Button } from "@/components/ui/button";

function getBadgeClasses(status: LifeStage["status"]) {
  if (status === "Operational Now") {
    return "bg-primary/10 text-primary border-primary/20";
  }
  if (status === "Active Outreach & Expanding") {
    return "bg-terracotta/15 text-terracotta border-terracotta/30";
  }
  return "bg-plum/10 text-plum border-plum/20";
}

export function LifeStagesJourney({ compact = false }: { compact?: boolean }) {
  const [selectedId, setSelectedId] = useState<string>(LIFE_STAGES[0].id);
  const activeStage = LIFE_STAGES.find((s) => s.id === selectedId) ?? LIFE_STAGES[0];

  return (
    <div className="space-y-6">
      {/* Horizontal 6-stage timeline selector */}
      <div
        role="tablist"
        aria-label="Life stages supported by LifeSakthi"
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6"
      >
        {LIFE_STAGES.map((stage) => {
          const isSelected = stage.id === activeStage.id;
          return (
            <button
              key={stage.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedId(stage.id)}
              className={`group flex flex-col items-start rounded-2xl border p-3.5 text-left transition-all touch-target ${
                isSelected
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-primary-soft/40"
              }`}
            >
              <span
                className={`text-[11px] font-bold tracking-widest uppercase ${
                  isSelected ? "text-primary-foreground/80" : "text-primary"
                }`}
              >
                Stage {stage.stepNumber}
              </span>
              <span className="mt-1 font-display text-sm font-semibold leading-snug">
                {stage.stageName}
              </span>
              <span
                className={`mt-1 text-[11px] ${
                  isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}
              >
                {stage.ageContext}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail Card */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="eyebrow">
                Stage {activeStage.stepNumber} · {activeStage.ageContext}
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getBadgeClasses(
                  activeStage.status
                )}`}
              >
                <Sparkles className="size-3" />
                {activeStage.status}
              </span>
            </div>
            <h3 className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl">
              {activeStage.stageName} — {activeStage.headline}
            </h3>
          </div>
          <Button asChild size="lg" className="rounded-full shrink-0">
            <Link to={activeStage.ctaTo}>
              {activeStage.ctaLabel}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className={`mt-6 grid gap-6 ${compact ? "md:grid-cols-3" : "lg:grid-cols-4"}`}>
          <div className="rounded-2xl bg-background/70 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Key Challenges
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {activeStage.challenges}
            </p>
          </div>

          <div className="rounded-2xl bg-background/70 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Support & Opportunity Needed
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {activeStage.supportNeeded}
            </p>
          </div>

          <div className="rounded-2xl bg-primary-soft/50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              How LifeSakthi Contributes
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {activeStage.howLifeSakthiContributes}
            </p>
          </div>

          {!compact && (
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Programmes & Services
              </p>
              <ul className="mt-2.5 space-y-2">
                {activeStage.programmesOrServices.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {compact && (
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Available & Planned:
            </span>
            {activeStage.programmesOrServices.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground"
              >
                <CheckCircle2 className="size-3.5 text-primary" />
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
