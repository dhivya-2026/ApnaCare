import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldAlert,
  BadgeCheck,
  IndianRupee,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { CANONICAL_NEEDS_DISCOVERY, type NeedDiscoveryOption } from "@/data/taxonomy";
import { formatINR, buildWhatsAppUrl } from "@/data/site";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

export function CareNavigator() {
  const [selectedNeedId, setSelectedNeedId] = useState<string>(
    CANONICAL_NEEDS_DISCOVERY[0]?.id ?? "need-elderly-support"
  );

  const currentNeed =
    CANONICAL_NEEDS_DISCOVERY.find((n) => n.id === selectedNeedId) ??
    CANONICAL_NEEDS_DISCOVERY[0]!;

  const waUrl = buildWhatsAppUrl(
    `Hi ApnaCare! I need advice regarding: "${currentNeed.triggerPhrase}". Could you help guide my family?`
  );

  return (
    <section id="care-navigator" className="scroll-mt-20 py-16 md:py-24 border-b border-border/50 bg-secondary/20">
      <div className="container-page">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5 text-terracotta" />
            <span>Need-First Care Navigator</span>
          </div>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold md:text-4xl lg:text-5xl text-foreground">
            What kind of help does your family need right now?
          </h2>
          <p className="mt-3 text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed">
            If you know the challenge but aren’t sure which service to choose, select your circumstance below.
            We’ll explain suitable options, provider qualifications, and clear role boundaries.
          </p>
        </div>

        {/* Navigator Container */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Situation Trigger Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-2.5" role="tablist" aria-label="Care Situations">
            {CANONICAL_NEEDS_DISCOVERY.map((item) => {
              const isSelected = item.id === selectedNeedId;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelectedNeedId(item.id);
                    track("care_navigator_select", { needId: item.id });
                  }}
                  className={`group relative flex items-center justify-between rounded-2xl p-4 text-left transition-all min-h-[56px] ${
                    isSelected
                      ? "border-2 border-primary bg-card shadow-soft text-foreground font-semibold"
                      : "border border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:bg-card hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid size-7 place-items-center rounded-full text-xs font-bold transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground group-hover:bg-primary-soft group-hover:text-primary"
                      }`}
                    >
                      {item.id === "need-guidance-undecided" ? "?" : "✓"}
                    </span>
                    <span className="text-sm font-medium leading-snug">{item.triggerPhrase}</span>
                  </div>
                  <ArrowRight
                    className={`size-4 shrink-0 transition-transform ${
                      isSelected
                        ? "text-primary translate-x-1"
                        : "text-muted-foreground/40 group-hover:translate-x-0.5"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Tailored Resolution Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-soft animate-fade-in">
              {/* Situation Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
                    Recommended Pathway
                  </span>
                  <h3 className="mt-1 text-xl sm:text-2xl font-bold text-foreground font-display">
                    {currentNeed.triggerPhrase}
                  </h3>
                </div>
                <div className="rounded-full bg-primary-soft px-3.5 py-1 text-xs font-semibold text-primary">
                  {currentNeed.status === "EXISTING_VERIFIED" ? "Verified Care Offering" : "Consultation Guidance"}
                </div>
              </div>

              {/* Context Description */}
              <p className="mt-5 text-sm sm:text-base text-foreground/90 leading-relaxed">
                {currentNeed.contextDescription}
              </p>

              {/* Scope & Provider Distinction Box */}
              <div className="mt-6 rounded-2xl border border-primary/20 bg-primary-soft/40 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="size-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                      Appropriate Provider: {currentNeed.providerType}
                    </p>
                    <p className="mt-1 text-xs text-foreground/80 leading-relaxed font-medium">
                      {currentNeed.clinicalBoundary}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing & Transparency */}
              <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4 border-t border-border/60 pt-5">
                <div>
                  <span className="text-xs text-muted-foreground block">Estimated Transparent Rate</span>
                  <span className="font-display text-2xl font-bold text-foreground">
                    {formatINR(currentNeed.estimatedStartingPrice)}
                    <span className="text-xs font-normal text-muted-foreground">/{currentNeed.priceUnit}</span>
                  </span>
                  <span className="text-[11px] text-muted-foreground block">+ 18% statutory GST · Zero broker fees</span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button asChild size="default" className="rounded-full font-semibold shadow-soft hover:shadow-lift min-h-[44px]">
                    <Link
                      to={currentNeed.directActionHref}
                      onClick={() => track("care_navigator_explore_click", { needId: currentNeed.id })}
                    >
                      <span>Explore Suitable Service</span>
                      <ArrowRight className="ml-1.5 size-4" />
                    </Link>
                  </Button>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("care_navigator_whatsapp_click", { needId: currentNeed.id })}
                    className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/10 px-5 py-2.5 text-xs font-semibold text-[#128C7E] hover:bg-[#25D366]/20 transition-colors min-h-[44px]"
                  >
                    <MessageCircle className="size-4 text-[#25D366]" />
                    <span>Ask on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Reassurance Callout */}
            <div className="mt-4 flex items-center gap-3 px-2 text-xs text-muted-foreground">
              <CheckCircle2 className="size-4 text-primary shrink-0" />
              <span>
                Every active care attendant is police-cleared, background-checked, and supported by a guaranteed 90-minute replacement cluster.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
