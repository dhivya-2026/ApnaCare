import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/data/site";
import { track } from "@/lib/analytics";

interface CareTier {
  id: string;
  name: string;
  dailyRate: number;
  description: string;
  serviceSlug: string;
}

const CARE_TIERS: CareTier[] = [
  {
    id: "elderly",
    name: "Elderly Care (Day Shift)",
    dailyRate: 1299,
    description: "Daily companion, mobility assistance, medication routines, and meal assistance at home.",
    serviceSlug: "elderly-care",
  },
  {
    id: "elderly-livein",
    name: "24/7 Live-in Elder Care",
    dailyRate: 1799,
    description: "Continuous day & night peace of mind with an on-premises companion for seniors.",
    serviceSlug: "elderly-care",
  },
  {
    id: "hospital",
    name: "Hospital Bedside Assistance",
    dailyRate: 1499,
    description: "Inpatient room vigil, nurse coordination, hygiene support, and family updates.",
    serviceSlug: "hospital-attendants",
  },
  {
    id: "nursing",
    name: "Certified Home Nursing",
    dailyRate: 1999,
    description: "Registered GNM/B.Sc nurses for sterile dressings, injections, vitals, and physician compliance.",
    serviceSlug: "nursing-services",
  },
  {
    id: "postnatal",
    name: "Post-Natal Maternal & Baby",
    dailyRate: 1999,
    description: "Japa-trained maternal rest, newborn massage, soothing, and physical healing support.",
    serviceSlug: "post-natal-care",
  },
  {
    id: "transit",
    name: "Police-Cleared Women Drivers",
    dailyRate: 1199,
    description: "Verified women chauffeurs for airport pickup, hospital visits, and safe city transit.",
    serviceSlug: "women-drivers",
  },
];

export function PricingEstimator() {
  const [selectedTier, setSelectedTier] = useState<CareTier>(CARE_TIERS[0]!);
  const [durationMode, setDurationMode] = useState<"daily" | "monthly">("daily");
  const [days, setDays] = useState(7);

  const effectiveDays = durationMode === "monthly" ? 30 : days;
  const baseTotal = selectedTier.dailyRate * effectiveDays;
  const discountRate = durationMode === "monthly" ? 0.15 : days >= 14 ? 0.1 : 0;
  const discountAmount = Math.round(baseTotal * discountRate);
  const subtotalAfterDiscount = baseTotal - discountAmount;
  const gstAmount = Math.round(subtotalAfterDiscount * 0.18);
  const totalAmount = subtotalAfterDiscount + gstAmount;

  return (
    <section id="pricing-estimator" className="container-page py-16 md:py-24 scroll-mt-20">
      <div className="rounded-[2.5rem] border border-border/80 bg-gradient-to-br from-card via-card to-secondary/30 p-6 md:p-12 shadow-lift">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
            <Percent className="size-3.5 text-terracotta" />
            <span>Honest, Transparent Pricing</span>
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Estimate Your Family's Care Investment
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            Zero hidden agency commission, zero surprise travel fees. Clear daily rates with official 18% GST invoices and complete caregiver fair-wage transparency.
          </p>
        </div>

        {/* Interactive Estimator Layout */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Selectors */}
          <div className="space-y-8 lg:col-span-7">
            {/* 1. Care Service Tier */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                1. Select Care Service
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {CARE_TIERS.map((tier) => {
                  const isSelected = selectedTier.id === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => {
                        setSelectedTier(tier);
                        track("pricing_estimator_tier_change", { tier: tier.id });
                      }}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary-soft/40 shadow-soft ring-2 ring-primary/30"
                          : "border-border bg-card hover:border-primary/40 hover:bg-secondary/20"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-sm text-foreground">{tier.name}</h4>
                        <span className="font-display text-sm font-bold text-primary">
                          {formatINR(tier.dailyRate)}/d
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {tier.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Duration Plan Toggle */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                2. Choose Duration
              </label>
              <div className="mt-3 flex rounded-full border border-border bg-muted/40 p-1 max-w-md">
                <button
                  type="button"
                  onClick={() => {
                    setDurationMode("daily");
                    track("pricing_estimator_mode_change", { mode: "daily" });
                  }}
                  className={`flex-1 rounded-full py-2.5 text-xs font-semibold transition-all ${
                    durationMode === "daily"
                      ? "bg-primary text-primary-foreground shadow-xs font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Daily Flexible Care (1–30 Days)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDurationMode("monthly");
                    track("pricing_estimator_mode_change", { mode: "monthly" });
                  }}
                  className={`flex-1 rounded-full py-2.5 text-xs font-semibold transition-all ${
                    durationMode === "monthly"
                      ? "bg-primary text-primary-foreground shadow-xs font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Monthly Subscription (Save 15%)
                </button>
              </div>

              {/* Day Slider if in Daily Mode */}
              {durationMode === "daily" && (
                <div className="mt-5 space-y-2 max-w-md rounded-2xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="text-foreground text-sm font-bold">{days} Days</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>1 Day</span>
                    <span>14 Days (10% Off)</span>
                    <span>30 Days</span>
                  </div>
                </div>
              )}
            </div>

            {/* Guarantees */}
            <div className="grid gap-3 sm:grid-cols-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                <ShieldCheck className="size-4 text-primary shrink-0" />
                <span>Zero agency commissions</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                <Clock className="size-4 text-primary shrink-0" />
                <span>90-min backup dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                <FileText className="size-4 text-primary shrink-0" />
                <span>Official GST invoices</span>
              </div>
            </div>
          </div>

          {/* Right Column: Breakdown Card */}
          <div className="rounded-3xl border border-primary/30 bg-card p-6 md:p-8 shadow-lift lg:col-span-5 relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" />
              Transparent Price Summary
            </span>

            <h3 className="mt-4 text-xl font-bold text-foreground">
              {selectedTier.name}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {effectiveDays} Days of verified personal assistance
            </p>

            <div className="mt-6 space-y-3 border-t border-border/80 pt-4 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Base Rate ({formatINR(selectedTier.dailyRate)} × {effectiveDays}d)</span>
                <span className="font-mono">{formatINR(baseTotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between font-semibold text-primary">
                  <span>
                    Duration Discount ({durationMode === "monthly" ? "15% Monthly" : "10% Multi-Day"})
                  </span>
                  <span className="font-mono">- {formatINR(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-mono">{formatINR(subtotalAfterDiscount)}</span>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Statutory 18% GST Invoice</span>
                <span className="font-mono">+ {formatINR(gstAmount)}</span>
              </div>
            </div>

            {/* Total Highlight */}
            <div className="mt-6 rounded-2xl bg-secondary/50 p-4 border border-border flex items-baseline justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Total Estimated
                </span>
                <p className="text-[11px] text-muted-foreground">All taxes & insurance included</p>
              </div>
              <div className="text-right">
                <span className="font-display text-3xl font-extrabold text-foreground">
                  {formatINR(totalAmount)}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <Button asChild size="lg" className="w-full rounded-full shadow-soft text-base font-semibold min-h-[48px]">
                <Link
                  to="/booking"
                  search={{
                    service: selectedTier.serviceSlug,
                    situation: `${effectiveDays} days estimated at ${formatINR(totalAmount)}`,
                  }}
                  onClick={() =>
                    track("pricing_estimator_proceed_click", {
                      tier: selectedTier.id,
                      days: effectiveDays,
                      total: totalAmount,
                    })
                  }
                >
                  Book with This Estimate
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              No advance lock-in. Cancel or adjust anytime with 24 hours notice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
