import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  IndianRupee,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  AlertCircle,
  Building,
} from "lucide-react";
import { CANONICAL_NEEDS_DISCOVERY } from "@/data/taxonomy";
import { formatINR, buildWhatsAppUrl } from "@/data/site";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import {
  checkCityServiceAvailability,
  CANONICAL_CITY_CLUSTERS,
} from "@/data/cityAvailability";

export function CareNavigator() {
  const [selectedNeedId, setSelectedNeedId] = useState<string>(
    CANONICAL_NEEDS_DISCOVERY[0]?.id ?? "need-elderly-support"
  );
  const [selectedCity, setSelectedCity] = useState<string>("bengaluru");

  const currentNeed = useMemo(() => {
    return (
      CANONICAL_NEEDS_DISCOVERY.find((n) => n.id === selectedNeedId) ??
      CANONICAL_NEEDS_DISCOVERY[0]!
    );
  }, [selectedNeedId]);

  // Real-time city-by-service readiness check
  const availability = useMemo(() => {
    return checkCityServiceAvailability(selectedCity, currentNeed.suggestedServiceSlug);
  }, [selectedCity, currentNeed.suggestedServiceSlug]);

  const waUrl = buildWhatsAppUrl(
    `Hi ApnaCare team! I checked the Care Navigator for: "${currentNeed.triggerPhrase}" in ${availability.cityName}. Could you guide my family?`
  );

  return (
    <section id="care-navigator" className="scroll-mt-20 py-16 md:py-24 border-b border-border/50 bg-secondary/20">
      <div className="container-page">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5 text-terracotta" />
            <span>Readiness-Aware Care Navigator</span>
          </div>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold md:text-4xl lg:text-5xl text-foreground">
            What kind of help does your family need right now?
          </h2>
          <p className="mt-3 text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed">
            Select your family's situation and preferred location below. We'll show suitable options, clear attendant vs nurse boundaries, and verified local availability.
          </p>
        </div>

        {/* Location selector strip */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5 p-3 rounded-2xl bg-card border border-border">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 pl-2 mr-1">
            <MapPin className="size-3.5 text-primary" />
            Your City:
          </span>
          {CANONICAL_CITY_CLUSTERS.map((c) => {
            const isSelected = c.slug === selectedCity;
            const isOperational = c.tier === "ACTIVE_METRO";
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => {
                  setSelectedCity(c.slug);
                  track("care_navigator_city_change", { city: c.slug });
                }}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all min-h-[34px] ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <span>{c.name}</span>
                {!isOperational && (
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded ${
                    isSelected ? "bg-white/20 text-white" : "bg-primary-soft text-primary"
                  }`}>
                    Planned
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Navigator Container */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start">
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
                    track("care_navigator_select", { needId: item.id, city: selectedCity });
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
              {/* Situation Header & Location Readiness Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
                    Recommended Pathway
                  </span>
                  <h3 className="mt-1 text-xl sm:text-2xl font-bold text-foreground font-display">
                    {currentNeed.triggerPhrase}
                  </h3>
                </div>

                {/* Explicit Operational Readiness Pill */}
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                      availability.readiness === "Operational"
                        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25"
                        : availability.readiness === "Assessment required"
                        ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/25"
                        : "bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-500/25"
                    }`}
                  >
                    <span className="size-2 rounded-full bg-current" />
                    <span>{availability.readiness} in {availability.cityName}</span>
                  </span>
                </div>
              </div>

              {/* Context Description */}
              <p className="mt-5 text-sm sm:text-base text-foreground/90 leading-relaxed">
                {currentNeed.contextDescription}
              </p>

              {/* City Availability Note */}
              <div className="mt-4 rounded-xl bg-secondary/50 p-3.5 border border-border text-xs text-muted-foreground flex items-start gap-2.5">
                <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                <p>
                  <strong className="text-foreground">{availability.cityName} Status:</strong> {availability.message}
                </p>
              </div>

              {/* Scope & Provider Distinction Box */}
              <div className="mt-5 rounded-2xl border border-primary/20 bg-primary-soft/40 p-4 sm:p-5">
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
                  <span className="text-xs text-muted-foreground block">Starting Confirmed Rate</span>
                  <span className="font-display text-2xl font-bold text-foreground">
                    {formatINR(currentNeed.estimatedStartingPrice)}
                    <span className="text-xs font-normal text-muted-foreground">/{currentNeed.priceUnit}</span>
                  </span>
                  <span className="text-[11px] text-muted-foreground block">+ 18% statutory GST (SAC 9993) · Zero broker fees</span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button asChild size="default" className="rounded-full font-semibold shadow-soft hover:shadow-lift min-h-[44px]">
                    <Link
                      to={availability.nextStepHref}
                      onClick={() => track("care_navigator_explore_click", { needId: currentNeed.id, city: selectedCity })}
                    >
                      <span>{availability.nextStepLabel}</span>
                      <ArrowRight className="ml-1.5 size-4" />
                    </Link>
                  </Button>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("care_navigator_whatsapp_click", { needId: currentNeed.id, city: selectedCity })}
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
                {availability.backupSLA
                  ? `Every placement in ${availability.cityName} is backed by our ${availability.backupSLA}.`
                  : `Expressions of interest help us prioritize caregiver recruitment in ${availability.cityName}.`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
