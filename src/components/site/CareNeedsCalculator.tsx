import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Calculator,
  Clock,
  IndianRupee,
  ShieldCheck,
  Check,
  Info,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookLink } from "./Layout";
import { formatINR, buildWhatsAppUrl } from "@/data/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface ServiceTier {
  id: string;
  name: string;
  serviceSlug: string;
  baseRate8Hr: number;
  baseRate12Hr: number;
  baseRate24Hr: number;
  providerType: string;
  typicalCoordinationHoursRelievedPerWeek: number;
  scopeSummary: string;
  clinicalBoundary: string;
}

const SERVICE_TIERS: ServiceTier[] = [
  {
    id: "elderly",
    name: "Elderly Companionship & Living Assistance",
    serviceSlug: "elderly-care",
    baseRate8Hr: 1099,
    baseRate12Hr: 1299,
    baseRate24Hr: 1899,
    providerType: "General Duty Assistant (Attendant)",
    typicalCoordinationHoursRelievedPerWeek: 42,
    scopeSummary: "Bathing, hygiene, medication reminder logging, walking assistance, and gentle emotional companionship.",
    clinicalBoundary: "Non-clinical personal care. For injections, IV drips, or wound dressings, registered nurses are required.",
  },
  {
    id: "hospital",
    name: "Hospital Ward Bedside Vigil",
    serviceSlug: "hospital-attendants",
    baseRate8Hr: 1199,
    baseRate12Hr: 1399,
    baseRate24Hr: 2099,
    providerType: "Hospital Bedside Attendant",
    typicalCoordinationHoursRelievedPerWeek: 56,
    scopeSummary: "Continuous bedside vigilance, bedpan assistance, patient turnings every 2 hrs, and call-bell coordination.",
    clinicalBoundary: "Assists patient ergonomics. Does not alter IV drip rates or adjust clinical monitor settings.",
  },
  {
    id: "nursing",
    name: "Certified Clinical Home Nursing",
    serviceSlug: "nursing-services",
    baseRate8Hr: 1699,
    baseRate12Hr: 1999,
    baseRate24Hr: 3199,
    providerType: "Registered Nurse (GNM / B.Sc)",
    typicalCoordinationHoursRelievedPerWeek: 35,
    scopeSummary: "Sterile wound management, injections, IV line maintenance, urinary catheters, and doctor-prescribed interventions.",
    clinicalBoundary: "Medically licensed clinical procedures performed strictly adhering to doctor written orders.",
  },
  {
    id: "postnatal",
    name: "Postnatal Maternal Rest & Newborn Care",
    serviceSlug: "post-natal-care",
    baseRate8Hr: 1699,
    baseRate12Hr: 1999,
    baseRate24Hr: 2999,
    providerType: "Postnatal Caregiver (Japa Specialist)",
    typicalCoordinationHoursRelievedPerWeek: 49,
    scopeSummary: "Traditional infant oil massage, warm water bathing, mother's rest massage, and overnight sleep coverage.",
    clinicalBoundary: "Traditional maternal comfort and infant soothing. Does not prescribe neonatal medications.",
  },
];

type ShiftTiming = "8hr" | "12hr" | "24hr";
type DurationOption = 7 | 14 | 30;

export function CareNeedsCalculator() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("elderly");
  const [shiftTiming, setShiftTiming] = useState<ShiftTiming>("12hr");
  const [durationDays, setDurationDays] = useState<DurationOption>(14);

  const selectedTier = useMemo(
    () => SERVICE_TIERS.find((t) => t.id === selectedServiceId) ?? SERVICE_TIERS[0],
    [selectedServiceId]
  );

  const dailyBaseFee = useMemo(() => {
    switch (shiftTiming) {
      case "8hr":
        return selectedTier.baseRate8Hr;
      case "12hr":
        return selectedTier.baseRate12Hr;
      case "24hr":
        return selectedTier.baseRate24Hr;
    }
  }, [selectedTier, shiftTiming]);

  const estimatedCareFee = dailyBaseFee * durationDays;
  const statutoryGST = Math.round(estimatedCareFee * 0.18);
  const totalEstimatedCost = estimatedCareFee + statutoryGST;

  // Realistic family time calculation based on weekly hours relieved
  const totalFamilyHoursRelieved = Math.round(
    (selectedTier.typicalCoordinationHoursRelievedPerWeek / 7) * durationDays
  );

  const waUrl = buildWhatsAppUrl(
    `Hello ApnaCare! I calculated an estimate for ${selectedTier.name} (${shiftTiming} shifts for ${durationDays} days). Estimated total: ${formatINR(
      totalEstimatedCost
    )}. Could you help confirm caregiver availability in our city?`
  );

  return (
    <section id="care-calculator" className="scroll-mt-20 py-16 md:py-24 border-b border-border/60 bg-gradient-to-b from-secondary/15 via-background to-secondary/15">
      <div className="container-page">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-3.5 py-1 text-xs font-semibold text-primary">
            <Calculator className="size-3.5 text-primary" />
            <span>Transparent Care-Needs & Time-Relief Estimator</span>
          </div>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Understand the Real Cost & Family Time Restored
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Care isn't just a financial decision; it's about lifting the daily physical burden of managing care alone. Select your scenario below to see transparent rates and estimated family hours freed up.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 items-start">
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-soft">
            {/* Step 1: Select Care Scenario */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">
                1. Select Family Care Scenario
              </label>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {SERVICE_TIERS.map((tier) => {
                  const isSelected = tier.id === selectedServiceId;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => {
                        setSelectedServiceId(tier.id);
                        track("care_calculator_service_change", { service: tier.id });
                      }}
                      className={cn(
                        "rounded-2xl p-4 text-left transition-all border cursor-pointer min-h-[64px] flex flex-col justify-between",
                        isSelected
                          ? "border-primary bg-primary-soft/40 shadow-2xs font-semibold ring-1 ring-primary"
                          : "border-border bg-card/70 hover:border-primary/40 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <span className="text-xs sm:text-sm font-semibold text-foreground leading-snug">
                        {tier.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground mt-1">
                        From {formatINR(tier.baseRate12Hr)}/day
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Shift Timing */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">
                2. Required Daily Coverage
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: "8hr", label: "8-Hour Shift", sub: "Daytime Support" },
                  { id: "12hr", label: "12-Hour Shift", sub: "Most Popular (Day or Night)" },
                  { id: "24hr", label: "24-Hour Live-in", sub: "Continuous Residential" },
                ].map((s) => {
                  const isSelected = shiftTiming === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setShiftTiming(s.id as ShiftTiming);
                        track("care_calculator_shift_change", { shift: s.id });
                      }}
                      className={cn(
                        "rounded-2xl p-3.5 text-center transition-all border cursor-pointer min-h-[58px]",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground font-semibold shadow-2xs"
                          : "border-border bg-secondary/40 text-foreground hover:bg-secondary/70 font-medium"
                      )}
                    >
                      <div className="text-xs sm:text-sm font-bold leading-tight">{s.label}</div>
                      <div
                        className={cn(
                          "text-[10px] mt-0.5",
                          isSelected ? "text-primary-foreground/90" : "text-muted-foreground"
                        )}
                      >
                        {s.sub}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Planned Duration */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">
                3. Estimated Care Duration
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { days: 7, label: "1 Week", note: "Post-op transition" },
                  { days: 14, label: "2 Weeks", note: "Convalescence" },
                  { days: 30, label: "1 Month", note: "Comprehensive retainer" },
                ].map((d) => {
                  const isSelected = durationDays === d.days;
                  return (
                    <button
                      key={d.days}
                      type="button"
                      onClick={() => {
                        setDurationDays(d.days as DurationOption);
                        track("care_calculator_duration_change", { days: d.days });
                      }}
                      className={cn(
                        "rounded-2xl p-3.5 text-center transition-all border cursor-pointer min-h-[58px]",
                        isSelected
                          ? "border-primary bg-primary-soft text-primary font-bold ring-1 ring-primary shadow-2xs"
                          : "border-border bg-secondary/40 text-foreground hover:bg-secondary/70 font-medium"
                      )}
                    >
                      <div className="text-xs sm:text-sm font-bold leading-tight">{d.label}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{d.note}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inclusions & Boundary Details */}
            <div className="rounded-2xl bg-secondary/40 p-4 border border-border/80 text-xs space-y-2">
              <p className="font-semibold text-foreground">
                Assigned Role: <span className="text-primary">{selectedTier.providerType}</span>
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Included Support:</strong> {selectedTier.scopeSummary}
              </p>
              <p className="text-muted-foreground leading-relaxed pt-1 border-t border-border/50">
                <strong>Scope Limitation:</strong> {selectedTier.clinicalBoundary}
              </p>
            </div>
          </div>

          {/* Results Summary Column (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-primary/30 bg-gradient-to-b from-card via-card to-primary-soft/20 p-6 sm:p-8 shadow-soft">
            <div className="flex items-center justify-between border-b border-border/80 pb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                Transparent Estimate
              </span>
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase">
                Zero Brokerage Fees
              </span>
            </div>

            {/* Time Relieved Hero Badge */}
            <div className="mt-5 rounded-2xl bg-primary-soft/60 p-4 border border-primary/20">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <Clock className="size-4" />
                <span>Family Burden Relieved:</span>
              </div>
              <div className="mt-1 font-display text-3xl font-bold text-primary">
                ~{totalFamilyHoursRelieved} Hours
              </div>
              <p className="mt-1 text-xs text-foreground/80 leading-relaxed font-medium">
                Freeing ~{Math.round(totalFamilyHoursRelieved / (durationDays / 7))} hours/week of physical care coordination so family members can continue careers, care for children, and sleep restfully.
              </p>
            </div>

            {/* Price Breakdown */}
            <div className="mt-6 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Daily Caregiver Fee ({shiftTiming})</span>
                <span className="font-semibold text-foreground">{formatINR(dailyBaseFee)} / day</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Care Duration ({durationDays} days)</span>
                <span className="font-semibold text-foreground">{formatINR(estimatedCareFee)}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Statutory GST (18% Invoiced)</span>
                <span className="font-semibold text-foreground">{formatINR(statutoryGST)}</span>
              </div>
              <div className="flex items-baseline justify-between border-t border-border/80 pt-3 text-sm">
                <span className="font-bold text-foreground">Estimated Total:</span>
                <div className="text-right">
                  <span className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                    {formatINR(totalEstimatedCost)}
                  </span>
                  <span className="block text-[10px] text-muted-foreground">
                    All-inclusive tax invoice · Zero hidden commissions
                  </span>
                </div>
              </div>
            </div>

            {/* Transparent Assumptions Note */}
            <div className="mt-5 rounded-xl bg-secondary/60 p-3 text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2 border border-border/50">
              <Info className="size-3.5 text-primary shrink-0 mt-0.5" />
              <span>
                <strong>Methodology & Assumptions:</strong> Rates reflect standard verified attendant/nurse fees across South India clusters. Final fees depend on patient mobility tier, clinical severity, and city cluster. Estimates are not legally binding quotes until confirmed by care coordinator.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <BookLink
                service={selectedTier.serviceSlug}
                variant="warm"
                size="lg"
                className="w-full min-h-[46px] justify-center text-sm font-semibold shadow-soft"
              >
                <span>Book This Care Plan</span>
                <ArrowRight className="ml-1.5 size-4" />
              </BookLink>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("care_calculator_whatsapp_click", { tier: selectedTier.id })}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/15 px-4 py-2.5 text-xs font-semibold text-[#128C7E] hover:bg-[#25D366]/25 transition-colors min-h-[44px]"
              >
                <MessageCircle className="size-4 text-[#25D366]" />
                <span>Discuss Plan on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
