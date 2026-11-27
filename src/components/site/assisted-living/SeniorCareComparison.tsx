import { useState } from "react";
import { CheckCircle2, AlertCircle, ArrowRight, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CARE_COMPARISON, CONNECTED_SCENARIO_STEPS } from "@/data/assistedLivingTech";
import { cn } from "@/lib/utils";

export function SeniorCareComparison() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const activeStep = CONNECTED_SCENARIO_STEPS[activeStepIdx] ?? CONNECTED_SCENARIO_STEPS[0];

  return (
    <div className="space-y-10">
      {/* Side-by-Side Comparison */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Traditional Care</span>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
              Reactive Model
            </span>
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground">
            Periodic hospital visits &amp; manual coordination
          </h3>
          <ul className="space-y-3 pt-1">
            {CARE_COMPARISON.traditional.map((item) => (
              <li key={item.label} className="rounded-2xl bg-secondary/40 p-3.5 border border-border/60">
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-primary/35 bg-primary-soft/25 p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Technology-Enabled Care</span>
            <span className="rounded-full bg-primary text-primary-foreground px-2.5 py-0.5 text-[11px] font-semibold">
              Proactive &amp; Connected
            </span>
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground">
            Home continuity paired with verified Saha support
          </h3>
          <ul className="space-y-3 pt-1">
            {CARE_COMPARISON.techEnabled.map((item) => (
              <li key={item.label} className="rounded-2xl bg-card p-3.5 border border-primary/20">
                <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-primary shrink-0" aria-hidden />
                  {item.label}
                </p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed pl-5">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interactive Real-Life Scenario */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-4">
          <div>
            <span className="eyebrow text-terracotta">Interactive Scenario Walkthrough</span>
            <h3 className="mt-1 font-display text-xl sm:text-2xl font-semibold text-foreground">
              An elderly father in Chennai &amp; his daughter in Bengaluru
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Step through how sensors, wearables, health readings, alerts, nurses, doctors, and Sahas work together—with clear labels showing illustrative steps vs deployed LifeSakhi workflows.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setActiveStepIdx(0)}
              className="rounded-full text-xs"
            >
              <RotateCcw className="size-3.5 mr-1" />
              Restart
            </Button>
            <Button
              type="button"
              size="sm"
              variant="warm"
              onClick={() => setActiveStepIdx((prev) => (prev + 1) % CONNECTED_SCENARIO_STEPS.length)}
              className="rounded-full text-xs font-semibold"
            >
              <Play className="size-3.5 mr-1" />
              Next Step
            </Button>
          </div>
        </div>

        {/* Step Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {CONNECTED_SCENARIO_STEPS.map((st, idx) => {
            const active = idx === activeStepIdx;
            return (
              <button
                key={st.step}
                type="button"
                onClick={() => setActiveStepIdx(idx)}
                className={cn(
                  "rounded-xl border p-2.5 text-left transition-all text-xs",
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                    : "border-border bg-secondary/35 text-foreground hover:border-primary/40"
                )}
              >
                <span className={cn("text-[10px] font-bold block", active ? "text-primary-foreground/80" : "text-muted-foreground")}>
                  Step {st.step}
                </span>
                <span className="font-semibold line-clamp-2 mt-0.5 block">{st.actor}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Detail Card */}
        <div className="rounded-2xl border border-primary/25 bg-secondary/30 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold text-primary-foreground">
                Step {activeStep.step} of {CONNECTED_SCENARIO_STEPS.length} · {activeStep.actor}
              </span>
              <span
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-[11px] font-bold",
                  activeStep.status === "Operationally Deployed"
                    ? "bg-emerald-500/15 text-emerald-800 border-emerald-500/30"
                    : "bg-amber-500/15 text-amber-800 border-amber-500/30"
                )}
              >
                {activeStep.status}
              </span>
            </div>
            <h4 className="font-display text-lg font-semibold text-foreground">{activeStep.title}</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{activeStep.description}</p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full shrink-0"
            onClick={() => setActiveStepIdx((prev) => (prev + 1) % CONNECTED_SCENARIO_STEPS.length)}
          >
            {activeStepIdx === CONNECTED_SCENARIO_STEPS.length - 1 ? "Back to Step 1" : "Continue Flow"}
            <ArrowRight className="size-3.5 ml-1" />
          </Button>
        </div>

        <p className="text-[11px] text-muted-foreground flex items-start gap-1.5">
          <AlertCircle className="size-3.5 shrink-0 text-primary mt-0.5" aria-hidden />
          <span>
            Steps labelled <strong>Illustrative Workflow</strong> show how partner devices and pilot sensors connect into care decisions; steps labelled <strong>Operationally Deployed</strong> run live on LifeSakhi today.
          </span>
        </p>
      </div>
    </div>
  );
}
