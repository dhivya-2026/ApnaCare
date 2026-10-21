import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Heart,
  Baby,
  Activity,
  Car,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  MessageCircle,
  Star,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ATTENDANTS, buildWhatsAppUrl, formatINR } from "@/data/site";
import { track } from "@/lib/analytics";

interface CareOption {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Heart;
  serviceSlug: string;
  baseRate: number;
  highlight: string;
}

const CARE_RECIPIENTS: CareOption[] = [
  {
    id: "elderly",
    title: "Aging Parent",
    subtitle: "Dignity, daily living routines, mobility support & gentle companionship",
    icon: Heart,
    serviceSlug: "elderly-care",
    baseRate: 1299,
    highlight: "Geriatric certified · Fall prevention",
  },
  {
    id: "maternal",
    title: "Newborn & Mom",
    subtitle: "Fourth-trimester maternal healing, infant soothing & restorative sleep",
    icon: Baby,
    serviceSlug: "post-natal-care",
    baseRate: 1999,
    highlight: "Japa trained · Baby massage & bath",
  },
  {
    id: "post_op",
    title: "Post-Op Patient",
    subtitle: "Hospital bedside vigil, safe transitions & surgical recovery",
    icon: Activity,
    serviceSlug: "hospital-attendants",
    baseRate: 1499,
    highlight: "Nurse coordination · 24/7 bedside vigil",
  },
  {
    id: "transit",
    title: "Safe Women Mobility",
    subtitle: "Police-cleared female chauffeurs for airport, hospital & night transit",
    icon: Car,
    serviceSlug: "women-drivers",
    baseRate: 1199,
    highlight: "Commercial licensed · GPS tracked",
  },
];

const CITIES = [
  { name: "Bengaluru", state: "Karnataka", tag: "HQ & 18 Hubs" },
  { name: "Chennai", state: "Tamil Nadu", tag: "14 Hubs" },
  { name: "Hyderabad", state: "Telangana", tag: "12 Hubs" },
  { name: "Coimbatore", state: "Tamil Nadu", tag: "8 Hubs" },
];

const SHIFTS = [
  {
    id: "24h",
    name: "24-Hour Live-in Care",
    desc: "Complete round-the-clock peace of mind. Attendant stays on premises.",
    multiplier: 1.38,
    badge: "Most Reassuring",
  },
  {
    id: "day",
    name: "10-12 Hour Day Shift",
    desc: "Daily mobility, hygiene, medication routines, and companionship while family is at work.",
    multiplier: 1.0,
    badge: "Day Support",
  },
  {
    id: "night",
    name: "10-12 Hour Night Shift",
    desc: "Vigilant overnight monitoring, restroom assistance, and peaceful rest for family.",
    multiplier: 1.08,
    badge: "Night Vigil",
  },
];

const SPECIAL_NEEDS = [
  { id: "mobility", label: "Fall Prevention & Walking Support" },
  { id: "medication", label: "Medication Reminders & Vital Logs" },
  { id: "hygiene", label: "Bed Bath & Personal Hygiene Support" },
  { id: "diet", label: "Feeding Accompaniment & Meal Timing" },
  { id: "infant", label: "Gentle Newborn Massage & Bath" },
  { id: "hospital", label: "Hospital Bedside Nurse Coordination" },
];

export function CareNavigatorWizard() {
  const [step, setStep] = useState(1);
  const [selectedRecipient, setSelectedRecipient] = useState<CareOption>(CARE_RECIPIENTS[0]!);
  const [selectedCity, setSelectedCity] = useState("Bengaluru");
  const [selectedShift, setSelectedShift] = useState(SHIFTS[0]!);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(["mobility", "medication"]);

  const toggleNeed = (id: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculatedRate = Math.round(selectedRecipient.baseRate * selectedShift.multiplier);
  const monthlyEstimate = Math.round(calculatedRate * 30 * 0.85); // 15% monthly discount

  // Find matched attendants from database
  const matchedAttendants = ATTENDANTS.filter((a) => {
    const cityMatch = a.city.toLowerCase() === selectedCity.toLowerCase();
    const serviceMatch = a.services.includes(selectedRecipient.serviceSlug);
    return cityMatch && serviceMatch;
  }).slice(0, 2);

  // Fallback to any in that city if none match exact service
  const displayAttendants =
    matchedAttendants.length > 0
      ? matchedAttendants
      : ATTENDANTS.filter((a) => a.city.toLowerCase() === selectedCity.toLowerCase()).slice(0, 2);

  const bookingSearch = {
    service: selectedRecipient.serviceSlug,
    city: selectedCity,
    situation: `${selectedShift.name} in ${selectedCity} for ${selectedRecipient.title}. Special focus: ${selectedNeeds.join(", ")}`,
  };

  const waUrl = buildWhatsAppUrl(
    `Hello ApnaCare! I just ran your Care Navigator for ${selectedRecipient.title} in ${selectedCity} (${selectedShift.name}). I'd like to talk to a care coordinator.`
  );

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-gradient-to-b from-card via-card to-secondary/30 p-6 md:p-10 shadow-lift">
      {/* Top Banner with live badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5 text-terracotta" />
            <span>Interactive Care Navigator</span>
          </div>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Find the Exact Care Your Family Needs in 4 Simple Steps
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            No endless phone calls or high-pressure agency sales. Get an instant personalized care recommendation and verified attendant matches.
          </p>
        </div>

        {/* Progress Bar & Step Tracker */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step
                  ? "w-8 bg-primary"
                  : s < step
                  ? "w-4 bg-primary/60"
                  : "w-3 bg-muted"
              }`}
            />
          ))}
          <span className="ml-2 text-xs font-bold text-muted-foreground">
            {step === 5 ? "Matched" : `Step ${step} of 4`}
          </span>
        </div>
      </div>

      {/* ── STEP 1: Who Needs Care? ── */}
      {step === 1 && (
        <div className="py-8 animate-fade-in">
          <p className="text-xs font-bold uppercase tracking-wider text-terracotta">Step 1</p>
          <h4 className="mt-1 text-xl font-semibold text-foreground">Who requires care and assistance?</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            Select the situation that best matches your family's current reality.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CARE_RECIPIENTS.map((rec) => {
              const IconComp = rec.icon;
              const isSelected = selectedRecipient.id === rec.id;
              return (
                <button
                  key={rec.id}
                  type="button"
                  onClick={() => {
                    setSelectedRecipient(rec);
                    track("care_wizard_recipient_select", { recipient: rec.id });
                  }}
                  className={`group flex flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-200 min-h-[190px] ${
                    isSelected
                      ? "border-primary bg-primary-soft/40 shadow-soft ring-2 ring-primary/30"
                      : "border-border bg-card hover:border-primary/40 hover:bg-secondary/30"
                  }`}
                >
                  <div>
                    <div
                      className={`grid size-11 place-items-center rounded-xl transition-colors ${
                        isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground group-hover:bg-primary-soft group-hover:text-primary"
                      }`}
                    >
                      <IconComp className="size-5" />
                    </div>
                    <h5 className="mt-3.5 text-base font-semibold text-foreground">{rec.title}</h5>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {rec.subtitle}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-border/50 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-primary">{rec.highlight}</span>
                    <span className="text-muted-foreground">From {formatINR(rec.baseRate)}/day</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              size="lg"
              className="rounded-full px-8 shadow-soft"
              onClick={() => {
                setStep(2);
                track("care_wizard_step_next", { from: 1, to: 2 });
              }}
            >
              Next: Select Location
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ── STEP 2: Location ── */}
      {step === 2 && (
        <div className="py-8 animate-fade-in">
          <p className="text-xs font-bold uppercase tracking-wider text-terracotta">Step 2</p>
          <h4 className="mt-1 text-xl font-semibold text-foreground">Which city is care required in?</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            ApnaCare maintains local dispatch command centers and verified attendant clusters across these 4 metropolitan regions.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CITIES.map((c) => {
              const isSelected = selectedCity === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => {
                    setSelectedCity(c.name);
                    track("care_wizard_city_select", { city: c.name });
                  }}
                  className={`flex flex-col justify-between rounded-2xl border p-5 text-left transition-all ${
                    isSelected
                      ? "border-primary bg-primary-soft/40 shadow-soft ring-2 ring-primary/30"
                      : "border-border bg-card hover:border-primary/40 hover:bg-secondary/30"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
                      <MapPin className="size-5" />
                    </div>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                      {c.tag}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h5 className="text-lg font-semibold text-foreground">{c.name}</h5>
                    <p className="text-xs text-muted-foreground">{c.state}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setStep(1)} className="rounded-full">
              <ArrowLeft className="mr-2 size-4" /> Back
            </Button>
            <Button
              size="lg"
              className="rounded-full px-8 shadow-soft"
              onClick={() => {
                setStep(3);
                track("care_wizard_step_next", { from: 2, to: 3 });
              }}
            >
              Next: Choose Shift Timing
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ── STEP 3: Required Shift ── */}
      {step === 3 && (
        <div className="py-8 animate-fade-in">
          <p className="text-xs font-bold uppercase tracking-wider text-terracotta">Step 3</p>
          <h4 className="mt-1 text-xl font-semibold text-foreground">What care schedule does your family need?</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose the shift pattern that gives your household the greatest comfort and restful support.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {SHIFTS.map((s) => {
              const isSelected = selectedShift.id === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSelectedShift(s);
                    track("care_wizard_shift_select", { shift: s.id });
                  }}
                  className={`flex flex-col justify-between rounded-2xl border p-6 text-left transition-all ${
                    isSelected
                      ? "border-primary bg-primary-soft/40 shadow-soft ring-2 ring-primary/30"
                      : "border-border bg-card hover:border-primary/40 hover:bg-secondary/30"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="grid size-9 place-items-center rounded-xl bg-secondary text-foreground">
                        <Clock className="size-4 text-primary" />
                      </span>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                        {s.badge}
                      </span>
                    </div>
                    <h5 className="mt-4 text-base font-semibold text-foreground">{s.name}</h5>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/50 text-xs text-primary font-semibold">
                    Calculated from {formatINR(Math.round(selectedRecipient.baseRate * s.multiplier))}/day
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setStep(2)} className="rounded-full">
              <ArrowLeft className="mr-2 size-4" /> Back
            </Button>
            <Button
              size="lg"
              className="rounded-full px-8 shadow-soft"
              onClick={() => {
                setStep(4);
                track("care_wizard_step_next", { from: 3, to: 4 });
              }}
            >
              Next: Special Needs
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ── STEP 4: Special Needs ── */}
      {step === 4 && (
        <div className="py-8 animate-fade-in">
          <p className="text-xs font-bold uppercase tracking-wider text-terracotta">Step 4</p>
          <h4 className="mt-1 text-xl font-semibold text-foreground">Any specific daily priorities?</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            Select all that apply. This helps our clinical care coordinators match attendants with the exact required skill set.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SPECIAL_NEEDS.map((need) => {
              const isChecked = selectedNeeds.includes(need.id);
              return (
                <button
                  key={need.id}
                  type="button"
                  onClick={() => toggleNeed(need.id)}
                  className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                    isChecked
                      ? "border-primary bg-primary-soft/50 font-semibold text-primary shadow-2xs"
                      : "border-border bg-card text-foreground hover:bg-secondary/30"
                  }`}
                >
                  <div
                    className={`grid size-6 place-items-center rounded-lg border transition-colors ${
                      isChecked ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="size-4" />}
                  </div>
                  <span className="text-xs leading-snug">{need.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setStep(3)} className="rounded-full">
              <ArrowLeft className="mr-2 size-4" /> Back
            </Button>
            <Button
              size="lg"
              className="rounded-full px-8 shadow-lift"
              onClick={() => {
                setStep(5);
                track("care_wizard_complete", {
                  recipient: selectedRecipient.id,
                  city: selectedCity,
                  shift: selectedShift.id,
                  needsCount: selectedNeeds.length,
                });
              }}
            >
              Generate Care Recommendation
              <Sparkles className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ── STEP 5: Instant Recommended Plan & Matched Caregivers ── */}
      {step === 5 && (
        <div className="py-8 animate-fade-in">
          <div className="rounded-2xl border border-primary/20 bg-primary-soft/30 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  <BadgeCheck className="size-3.5" />
                  Recommended Care Match
                </span>
                <h4 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  {selectedShift.name} for {selectedRecipient.title} in {selectedCity}
                </h4>
                <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                  {selectedRecipient.subtitle}. Priority support includes:{" "}
                  <strong className="text-foreground">
                    {selectedNeeds
                      .map((id) => SPECIAL_NEEDS.find((n) => n.id === id)?.label)
                      .filter(Boolean)
                      .join(", ")}
                  </strong>
                  .
                </p>
              </div>

              {/* Pricing Callout Box */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-soft lg:w-72 shrink-0">
                <span className="text-xs font-semibold text-muted-foreground">Estimated Daily Rate</span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-bold text-foreground">
                    {formatINR(calculatedRate)}
                  </span>
                  <span className="text-xs text-muted-foreground">/day</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">+ 18% statutory GST invoice</p>
                <div className="mt-3 pt-3 border-t border-border/60">
                  <span className="text-[11px] text-primary font-semibold">
                    Monthly Plan: ~{formatINR(monthlyEstimate)}/mo (15% savings)
                  </span>
                </div>
              </div>
            </div>

            {/* Matched Verified Caregiver Previews */}
            <div className="mt-8 pt-6 border-t border-border/60">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Verified Available Care Specialists in {selectedCity}:
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {displayAttendants.map((att) => (
                  <div
                    key={att.id}
                    className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-2xs"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-${
                        att.id === "a1"
                          ? "1573496359142-b8d87734a5a2"
                          : att.id === "a2"
                          ? "1580489944761-15a19d654956"
                          : "1594744803329-e58b31de8bf5"
                      }?auto=format&fit=crop&w=120&q=80`}
                      alt={att.name}
                      className="size-14 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-sm text-foreground truncate">{att.name}</h5>
                        <span className="inline-flex items-center gap-0.5 text-xs font-bold text-terracotta">
                          <Star className="size-3 fill-terracotta" />
                          {att.rating}
                        </span>
                      </div>
                      <p className="text-xs text-primary font-medium">{att.role}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {att.experience} Exp · {att.languages.join(", ")}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-foreground mt-1">
                        <ShieldCheck className="size-3 text-primary" />
                        100% Police Verified
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border/60">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(1)}
                className="text-xs text-muted-foreground"
              >
                <RotateCcw className="mr-1.5 size-3.5" /> Start Over
              </Button>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/10 px-5 py-2.5 text-xs font-semibold text-[#128C7E] hover:bg-[#25D366]/20 transition-colors"
                >
                  <MessageCircle className="size-4 text-[#25D366]" />
                  Discuss with Coordinator
                </a>

                <Button asChild size="lg" className="rounded-full px-8 shadow-soft">
                  <Link to="/booking" search={bookingSearch}>
                    Book This Care Plan
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
