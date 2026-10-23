import { ShieldCheck, PhoneCall, UserCheck, CalendarCheck, Clock, CheckCircle2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PredictableNextStepsProps {
  className?: string;
  variant?: "compact" | "full";
  serviceName?: string;
}

export function PredictableNextSteps({
  className,
  variant = "full",
  serviceName = "care attendant",
}: PredictableNextStepsProps) {
  const steps = [
    {
      step: "01",
      icon: Clock,
      title: "Submit Your Requirements (2 Min)",
      detail:
        "Share patient condition, city, preferred shift timing (day, night, 24-hr), and start urgency. No upfront deposit or payment is required.",
      meta: "Zero financial commitment",
    },
    {
      step: "02",
      icon: PhoneCall,
      title: "Care Coordinator Review (15–30 Min)",
      detail:
        "Our local South India care manager reviews the clinical vs non-clinical scope and calls to confirm language preference, routine, and dietary habits.",
      meta: "No cold call center script",
    },
    {
      step: "03",
      icon: UserCheck,
      title: "Preview Verified Profile & Background",
      detail:
        "You receive a verified attendant profile with government photo ID authentication status, police verification filing, past caregiving experience, and certifications.",
      meta: "Full transparency before placement",
    },
    {
      step: "04",
      icon: CalendarCheck,
      title: "Care Commences with Cluster Backup Protocol",
      detail:
        "The attendant arrives on schedule. Families receive daily routine updates via WhatsApp, backed by our priority cluster standby backup protocol.",
      meta: "Continuous oversight",
    },
  ];

  if (variant === "compact") {
    return (
      <div className={cn("rounded-2xl border border-border/80 bg-secondary/40 p-5", className)}>
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="size-4.5 text-primary" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
            What Happens Next — 4 Clear Steps
          </h4>
        </div>
        <ol className="space-y-2.5 text-xs text-foreground/90">
          {steps.map((s) => (
            <li key={s.step} className="flex items-start gap-2.5">
              <span className="font-mono text-[10px] font-bold text-primary bg-primary-soft rounded-full size-4.5 grid place-items-center shrink-0 mt-0.5">
                {s.step}
              </span>
              <div>
                <span className="font-semibold text-foreground">{s.title}: </span>
                <span className="text-muted-foreground">{s.detail}</span>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-2 text-[11px] text-muted-foreground">
          <Lock className="size-3.5 text-primary shrink-0" />
          <span>Submitting an inquiry initiates a consultation; it does not trigger automated billing.</span>
        </div>
      </div>
    );
  }

  return (
    <section className={cn("py-12 md:py-16 border-y border-border/60 bg-secondary/20", className)}>
      <div className="container-page">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-soft px-3.5 py-1 text-xs font-semibold text-primary">
            <CheckCircle2 className="size-3.5 text-primary" />
            <span>Predictable, Transparent Process</span>
          </div>
          <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-foreground">
            What Happens After You Inquire
          </h3>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            No high-pressure sales calls, hidden brokerage fees, or unexpected strangers. Here is our exact 4-step onboarding protocol for every family.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-2xs hover:shadow-soft transition-all"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-primary bg-primary-soft px-2.5 py-1 rounded-full">
                      Step {s.step}
                    </span>
                    <div className="grid size-9 place-items-center rounded-xl bg-secondary text-primary">
                      <Icon className="size-4.5" />
                    </div>
                  </div>
                  <h4 className="mt-4 text-base font-bold text-foreground leading-snug">
                    {s.title}
                  </h4>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {s.detail}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-border/60">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                    <ShieldCheck className="size-3.5" />
                    {s.meta}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Data Security & Privacy Commitment */}
        <div className="mt-8 mx-auto max-w-xl rounded-2xl bg-card border border-border/80 p-4 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
          <Lock className="size-4 text-primary shrink-0" />
          <span>
            <strong>Data Privacy Guarantee:</strong> Your phone number and family care requirements are shared strictly with your assigned care coordinator. We never sell contact information to third-party telemarketers.
          </span>
        </div>
      </div>
    </section>
  );
}
