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
  Sliders,
  TrendingDown,
  Heart,
  AlertCircle,
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
  reliefEfficiency: number; // percentage of physical burden relieved (0.75 - 0.90)
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
    reliefEfficiency: 0.85,
    scopeSummary: "Bathing, personal hygiene, timely medication reminders, walking support, and dignified companionship.",
    clinicalBoundary: "Non-clinical personal care. For clinical injections or sterile wound care, registered nurses are required.",
  },
  {
    id: "hospital",
    name: "Hospital Ward Bedside Vigil",
    serviceSlug: "hospital-attendants",
    baseRate8Hr: 1199,
    baseRate12Hr: 1399,
    baseRate24Hr: 2099,
    providerType: "Hospital Bedside Attendant",
    reliefEfficiency: 0.90,
    scopeSummary: "Continuous 24-hr bedside vigil, patient repositioning every 2 hrs, bedpan assistance, and duty nurse coordination.",
    clinicalBoundary: "Assists with comfort and vigil. Does not administer clinical IVs or adjust hospital equipment.",
  },
  {
    id: "nursing",
    name: "Certified Clinical Home Nursing",
    serviceSlug: "nursing-services",
    baseRate8Hr: 1699,
    baseRate12Hr: 1999,
    baseRate24Hr: 3199,
    providerType: "Registered Nurse (GNM / B.Sc)",
    reliefEfficiency: 0.80,
    scopeSummary: "Hospital-grade sterile wound dressings, IV infusions, injections, catheter management, and vital signs logging.",
    clinicalBoundary: "Medically licensed procedures performed strictly adhering to written physician orders.",
  },
  {
    id: "postnatal",
    name: "Postnatal Maternal Rest & Newborn Care",
    serviceSlug: "post-natal-care",
    baseRate8Hr: 1699,
    baseRate12Hr: 1999,
    baseRate24Hr: 2999,
    providerType: "Postnatal Caregiver (Japa Specialist)",
    reliefEfficiency: 0.85,
    scopeSummary: "Traditional newborn oil massage, warm baths, mother's recovery massage, and overnight sleep coverage.",
    clinicalBoundary: "Traditional maternal comfort and infant soothing. Does not prescribe neonatal medications.",
  },
];

type ShiftTiming = "8hr" | "12hr" | "24hr";
type DurationOption = 7 | 14 | 30;

export function CareNeedsCalculator() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("elderly");
  const [shiftTiming, setShiftTiming] = useState<ShiftTiming>("12hr");
  const [durationDays, setDurationDays] = useState<DurationOption>(14);

  // Interactive Family Strain Sliders
  const [personalCareHoursPerWeek, setPersonalCareHoursPerWeek] = useState<number>(20);
  const [transitHoursPerWeek, setTransitHoursPerWeek] = useState<number>(4);
  const [coordinationHoursPerWeek, setCoordinationHoursPerWeek] = useState<number>(8);
  const [assignTimeValue, setAssignTimeValue] = useState<boolean>(true);
  const [hourlyTimeValue, setHourlyTimeValue] = useState<number>(350);

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

  // Financial Calculations
  const estimatedCareFee = dailyBaseFee * durationDays;
  const statutoryGST = Math.round(estimatedCareFee * 0.18);
  const totalEstimatedCost = estimatedCareFee + statutoryGST;

  // Time Relieved Calculations (Without double counting)
  const currentTotalWeeklyStrain = personalCareHoursPerWeek + transitHoursPerWeek + coordinationHoursPerWeek;
  const weeklyHoursRelieved = Math.round(currentTotalWeeklyStrain * selectedTier.reliefEfficiency);
  const totalHoursRelieved = Math.round((weeklyHoursRelieved / 7) * durationDays);
  const reductionPercentage = Math.round((weeklyHoursRelieved / currentTotalWeeklyStrain) * 100);

  // Indicative Value of Time (Explicitly labeled as NOT cash savings)
  const durationWeeks = durationDays / 7;
  const indicativeTimeValue = assignTimeValue
    ? Math.round(totalHoursRelieved * hourlyTimeValue)
    : 0;

  const waUrl = buildWhatsAppUrl(
    `Hello ApnaCare! I used the Care Needs Calculator for ${selectedTier.name} (${shiftTiming} shifts, ${durationDays} days). Estimated total: ${formatINR(
      totalEstimatedCost
    )}. Could you confirm availability and caregiver profiles in our city?`
  );

  return (
    <section
      id="care-calculator"
      className="scroll-mt-20 py-16 md:py-24 border-b border-border/60 bg-gradient-to-b from-secondary/15 via-background to-secondary/15"
    >
      <div className="container-page">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-3.5 py-1 text-xs font-semibold text-primary">
            <Calculator className="size-3.5 text-primary" />
            <span>Interactive Care-Needs & Time-Relief Demonstration</span>
          </div>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Understand the Real Cost & Family Time Restored
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Care isn't just an expense; it directly restores precious hours to working adult children and exhausted spouses. Adjust the sliders below to see your family's estimated time freed up alongside transparent pricing.
          </p>
        </div>

        {/* Main Grid: Interactive Inputs on Left (7 cols), Separate Outcomes on Right (5 cols) */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-soft">
            {/* Step 1: Care Scenario Selection */}
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
                        "rounded-2xl p-3.5 text-left transition-all border cursor-pointer min-h-[64px] flex flex-col justify-between",
                        isSelected
                          ? "border-primary bg-primary-soft/50 shadow-2xs font-semibold ring-1 ring-primary"
                          : "border-border bg-card hover:border-primary/40 hover:bg-secondary/40 text-muted-foreground hover:text-foreground"
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

            {/* Step 2: Coverage Timing & Duration */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                  Daily Shift Coverage
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: "8hr", label: "8-Hr" },
                    { id: "12hr", label: "12-Hr" },
                    { id: "24hr", label: "24-Hr" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setShiftTiming(s.id as ShiftTiming)}
                      className={cn(
                        "rounded-xl py-2 px-1 text-center text-xs font-bold transition-all border cursor-pointer",
                        shiftTiming === s.id
                          ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                          : "border-border bg-secondary/40 text-foreground hover:bg-secondary"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                  Planned Duration
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { days: 7, label: "1 Wk" },
                    { days: 14, label: "2 Wks" },
                    { days: 30, label: "1 Mo" },
                  ].map((d) => (
                    <button
                      key={d.days}
                      type="button"
                      onClick={() => setDurationDays(d.days as DurationOption)}
                      className={cn(
                        "rounded-xl py-2 px-1 text-center text-xs font-bold transition-all border cursor-pointer",
                        durationDays === d.days
                          ? "border-primary bg-primary-soft text-primary ring-1 ring-primary shadow-2xs"
                          : "border-border bg-secondary/40 text-foreground hover:bg-secondary"
                      )}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Interactive Family Strain Sliders (Addendum #4) */}
            <div className="rounded-2xl bg-secondary/30 p-5 border border-border/80 space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                  <Sliders className="size-3.5 text-primary" />
                  Your Current Weekly Caregiving Time
                </span>
                <span className="text-xs font-mono font-bold text-primary">
                  {currentTotalWeeklyStrain} hrs/wk total
                </span>
              </div>

              {/* Slider 1: Hands-on Personal Care */}
              <div>
                <div className="flex justify-between text-xs text-foreground mb-1">
                  <span>Hands-on care & physical chores covered by family:</span>
                  <span className="font-bold font-mono text-primary">{personalCareHoursPerWeek} hrs/wk</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={40}
                  step={1}
                  value={personalCareHoursPerWeek}
                  onChange={(e) => setPersonalCareHoursPerWeek(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-secondary rounded-lg cursor-pointer"
                  aria-label="Hands-on personal care hours per week"
                />
              </div>

              {/* Slider 2: Care Travel & Transit */}
              <div>
                <div className="flex justify-between text-xs text-foreground mb-1">
                  <span>Care-related travel, pharmacy & clinic trips:</span>
                  <span className="font-bold font-mono text-primary">{transitHoursPerWeek} hrs/wk</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={15}
                  step={1}
                  value={transitHoursPerWeek}
                  onChange={(e) => setTransitHoursPerWeek(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-secondary rounded-lg cursor-pointer"
                  aria-label="Care travel hours per week"
                />
              </div>

              {/* Slider 3: Coordination Stress */}
              <div>
                <div className="flex justify-between text-xs text-foreground mb-1">
                  <span>Coordination hours (calling doctors, scheduling, monitoring):</span>
                  <span className="font-bold font-mono text-primary">{coordinationHoursPerWeek} hrs/wk</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={20}
                  step={1}
                  value={coordinationHoursPerWeek}
                  onChange={(e) => setCoordinationHoursPerWeek(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-secondary rounded-lg cursor-pointer"
                  aria-label="Coordination hours per week"
                />
              </div>

              {/* Optional Illustrative Time Value Assignment */}
              <div className="pt-2 border-t border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="assign-val-toggle" className="text-xs font-semibold text-foreground flex items-center gap-1.5 cursor-pointer">
                    <input
                      id="assign-val-toggle"
                      type="checkbox"
                      checked={assignTimeValue}
                      onChange={(e) => setAssignTimeValue(e.target.checked)}
                      className="size-3.5 accent-primary rounded cursor-pointer"
                    />
                    Include illustrative value of personal/work time
                  </label>
                  {assignTimeValue && (
                    <span className="text-xs font-mono font-bold text-primary">
                      {formatINR(hourlyTimeValue)}/hr
                    </span>
                  )}
                </div>
                {assignTimeValue && (
                  <input
                    type="range"
                    min={150}
                    max={1000}
                    step={50}
                    value={hourlyTimeValue}
                    onChange={(e) => setHourlyTimeValue(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-secondary rounded-lg cursor-pointer"
                    aria-label="Hourly time value in rupees"
                  />
                )}
              </div>
            </div>

            {/* Scope & Role Safety Boundary */}
            <div className="rounded-xl bg-secondary/40 p-3.5 border border-border/70 text-xs text-muted-foreground leading-relaxed">
              <p>
                <strong>Provider Role:</strong> <span className="text-foreground font-semibold">{selectedTier.providerType}</span>. {selectedTier.scopeSummary}
              </p>
              <p className="mt-1 pt-1 border-t border-border/50 text-[11px]">
                <Info className="size-3 text-primary inline mr-1" />
                <strong>Limitation:</strong> {selectedTier.clinicalBoundary}
              </p>
            </div>
          </div>

          {/* Results Summary Column (Separate & Transparent Displays) */}
          <div className="lg:col-span-5 rounded-3xl border border-primary/30 bg-gradient-to-b from-card via-card to-primary-soft/20 p-6 sm:p-8 shadow-soft">
            <div className="flex items-center justify-between border-b border-border/80 pb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                Demonstrated Value
              </span>
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase">
                Zero Hidden Brokerage
              </span>
            </div>

            {/* Metric 1: Family Time Relieved (Hours) */}
            <div className="mt-5 rounded-2xl bg-primary-soft/60 p-4 border border-primary/20">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-primary">
                <span className="flex items-center gap-1.5">
                  <Clock className="size-4" />
                  Estimated Time Relieved:
                </span>
                <span className="rounded-full bg-primary text-primary-foreground px-2 py-0.5 text-[10px]">
                  ~{reductionPercentage}% of Routine Care
                </span>
              </div>
              <div className="mt-1 font-display text-3xl font-bold text-primary">
                ~{totalHoursRelieved} Hours
              </div>
              <p className="mt-1 text-xs text-foreground/80 leading-relaxed font-medium">
                Estimated support across your {durationDays}-day care plan based on your self-reported {currentTotalWeeklyStrain} hrs/week of personal chores, transit, and coordination.
              </p>
              <p className="mt-1.5 text-[10px] text-muted-foreground italic border-t border-primary/15 pt-1">
                *Illustrative estimate based on your inputs. Actual time relieved varies by patient needs, mobility level, and family involvement.
              </p>
            </div>

            {/* Metric 2: Indicative Value of Time (Explicitly Non-Cash) */}
            {assignTimeValue && (
              <div className="mt-4 rounded-xl bg-secondary/50 p-3 border border-border/80 text-xs">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block tracking-wider">
                  Indicative Productivity Benchmark:
                </span>
                <span className="font-display text-lg font-bold text-foreground">
                  ~{formatINR(indicativeTimeValue)}
                </span>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">
                  *Illustrative benchmark based on your custom {formatINR(hourlyTimeValue)}/hr personal valuation. This reflects personal time reclaimed, <em>not guaranteed cash savings or healthcare expense reductions</em>.
                </p>
              </div>
            )}

            {/* Metric 3: Itemized ApnaCare Service Cost */}
            <div className="mt-5 space-y-2 text-xs border-t border-border/80 pt-4">
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
              <div className="flex items-baseline justify-between border-t border-border/80 pt-2.5 text-sm">
                <span className="font-bold text-foreground">Total Estimated Cost:</span>
                <div className="text-right">
                  <span className="font-display text-2xl font-bold text-foreground">
                    {formatINR(totalEstimatedCost)}
                  </span>
                  <span className="block text-[10px] text-muted-foreground">
                    Official tax invoice provided
                  </span>
                </div>
              </div>
            </div>

            {/* Metric 4: Qualitative Non-Financial Outcomes */}
            <div className="mt-5 rounded-2xl bg-secondary/40 p-3.5 border border-border/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground block mb-2">
                Qualitative Non-Financial Outcomes:
              </span>
              <ul className="space-y-1.5 text-[11px] text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <Check className="size-3 text-primary shrink-0" />
                  <span>Uninterrupted 6–8h sleep without emergency wakefulness</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="size-3 text-primary shrink-0" />
                  <span>100% police & biometric Aadhaar verification on every caregiver</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="size-3 text-primary shrink-0" />
                  <span>Guaranteed 90-minute backup replacement SLA in active clusters</span>
                </li>
              </ul>
            </div>

            {/* Methodology & Assumption Notice */}
            <p className="mt-4 text-[10px] text-muted-foreground leading-relaxed flex items-start gap-1.5">
              <AlertCircle className="size-3 text-primary shrink-0 mt-0.5" />
              <span>
                <strong>Methodology Notice:</strong> Calculations are illustrative estimates based on standard cluster rates and reported caregiver hours. Final pricing is confirmed following clinical triage.
              </span>
            </p>

            {/* Action Row */}
            <div className="mt-6 space-y-2.5">
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
