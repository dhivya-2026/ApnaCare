import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Heart,
  Hospital,
  Stethoscope,
  Baby,
  Compass,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Clock,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Phone,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  FileCheck2,
  AlertCircle,
  HelpCircle,
  Calendar,
} from "lucide-react";
import {
  NEEDS_CATALOG,
  VERIFIED_CITIES,
  type CustomerNeed,
  type RecipientCategory,
} from "@/data/needs-catalog";
import { formatINR, buildWhatsAppUrl, SITE } from "@/data/site";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

interface RecipientOption {
  category: RecipientCategory;
  label: string;
  subtitle: string;
  icon: typeof Heart;
}

const RECIPIENT_OPTIONS: RecipientOption[] = [
  {
    category: "elderly_parent",
    label: "Aging Parent at Home",
    subtitle: "Companionship, daily mobility, bathing, joint comfort & medication reminders",
    icon: Heart,
  },
  {
    category: "hospital_patient",
    label: "Hospitalized Loved One",
    subtitle: "Inpatient bedside vigil, recovery ward assistance & discharge stepdown",
    icon: Hospital,
  },
  {
    category: "clinical_patient",
    label: "Clinical & Post-Op Recovery",
    subtitle: "Doctor-prescribed wound dressing, catheter care & sterile injections",
    icon: Stethoscope,
  },
  {
    category: "new_mother",
    label: "New Mother & Newborn",
    subtitle: "Traditional Japa massage, warm baths, colic soothing & maternal sleep",
    icon: Baby,
  },
  {
    category: "traveler",
    label: "Assisted Travel & Commute",
    subtitle: "Railway platform boarding, airport wheelchair escort, or women chauffeurs",
    icon: Compass,
  },
];

const SHIFT_OPTIONS = [
  { id: "day", label: "Day Shift (8–12 hrs)", desc: "Daily living & personal care" },
  { id: "night", label: "Night Shift (12 hrs)", desc: "Overnight vigil & bedside care" },
  { id: "live_in", label: "24/7 Continuous Live-In", desc: "Round-the-clock home support" },
  { id: "trip", label: "Per-Trip / Single Journey", desc: "Station or airport transit" },
];

export function GuidedCareDiscovery({ className = "" }: { className?: string }) {
  // Wizard steps: 0 = Recipient, 1 = Situation, 2 = City & Shift, 3 = Recommendation
  const [step, setStep] = useState<number>(0);

  // User selections
  const [selectedCategory, setSelectedCategory] = useState<RecipientCategory>("elderly_parent");
  const [selectedNeedId, setSelectedNeedId] = useState<string>("NEED-ELD-01");
  const [selectedCity, setSelectedCity] = useState<string>("Bengaluru");
  const [isOtherCity, setIsOtherCity] = useState<boolean>(false);
  const [customCityName, setCustomCityName] = useState<string>("");
  const [selectedShift, setSelectedShift] = useState<string>("day");

  // Filter available needs for the chosen recipient category
  const availableNeeds = useMemo(() => {
    return NEEDS_CATALOG.filter((n) => n.category === selectedCategory);
  }, [selectedCategory]);

  // Currently matched need
  const currentNeed = useMemo<CustomerNeed>(() => {
    const found = availableNeeds.find((n) => n.id === selectedNeedId);
    return found ?? availableNeeds[0] ?? NEEDS_CATALOG[0]!;
  }, [availableNeeds, selectedNeedId]);

  // Handle category change
  const handleCategorySelect = (cat: RecipientCategory) => {
    setSelectedCategory(cat);
    const firstNeed = NEEDS_CATALOG.find((n) => n.category === cat);
    if (firstNeed) {
      setSelectedNeedId(firstNeed.id);
    }
    track("guided_care_step_completed", { step: "recipient", category: cat });
    setStep(1);
  };

  // Handle situation select
  const handleNeedSelect = (needId: string) => {
    setSelectedNeedId(needId);
    track("guided_care_step_completed", { step: "situation", needId });
    setStep(2);
  };

  // Handle city select
  const handleCitySelect = (city: string) => {
    if (city === "other") {
      setIsOtherCity(true);
      setSelectedCity("Other");
    } else {
      setIsOtherCity(false);
      setSelectedCity(city);
    }
  };

  // Final confirmation to view recommendation
  const handleProceedToRecommendation = () => {
    track("guided_care_step_completed", {
      step: "constraints",
      city: isOtherCity ? customCityName || "Other" : selectedCity,
      shift: selectedShift,
    });
    setStep(3);
  };

  // WhatsApp prefilled message
  const waUrl = useMemo(() => {
    const effectiveCity = isOtherCity ? (customCityName ? customCityName : "Outside 4 metros") : selectedCity;
    const recipientLabel = RECIPIENT_OPTIONS.find((r) => r.category === selectedCategory)?.label ?? "Family Member";

    const text =
      `Hello ApnaCare! I used your Care Discovery tool for my family:\n` +
      `• Care Recipient: ${recipientLabel}\n` +
      `• Specific Situation: ${currentNeed.label} (${currentNeed.situation})\n` +
      `• Recommended Service: ${currentNeed.serviceName ?? "Care Guidance"}\n` +
      `• City: ${effectiveCity}\n` +
      `• Shift Preference: ${selectedShift}\n` +
      `Please let me know availability, verification details, and next steps.`;

    return buildWhatsAppUrl(text);
  }, [selectedCategory, currentNeed, isOtherCity, customCityName, selectedCity, selectedShift]);

  // Reset wizard
  const handleReset = () => {
    setStep(0);
    setSelectedCategory("elderly_parent");
    setSelectedNeedId("NEED-ELD-01");
    setSelectedCity("Bengaluru");
    setIsOtherCity(false);
    setCustomCityName("");
    track("guided_care_reset", {});
  };

  return (
    <section className={`scroll-mt-20 ${className}`} id="guided-discovery">
      <div className="rounded-[2.5rem] border border-border bg-card p-6 md:p-10 lg:p-12 shadow-soft">
        {/* Top Header & Step Progress Bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur">
              <Sparkles className="size-3.5 text-terracotta" />
              <span>Evidence-Backed Care Discovery</span>
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              Describe Your Situation. Discover Verified Care.
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              We connect your family's exact situation to verified, background-checked women attendants with clear clinical boundaries.
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 shrink-0">
            {[0, 1, 2, 3].map((s) => (
              <span
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  step === s
                    ? "w-8 bg-primary"
                    : step > s
                    ? "w-3 bg-primary/40"
                    : "w-3 bg-muted"
                }`}
                aria-hidden
              />
            ))}
            <span className="text-xs font-semibold text-muted-foreground ml-2">
              Step {step + 1} of 4
            </span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            STEP 0: WHO NEEDS SUPPORT?
        ───────────────────────────────────────────────────────────── */}
        {step === 0 && (
          <div className="mt-8 animate-fade-in">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              Step 1 of 4 · Who requires care or assistance?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Select the person receiving care so we can tailor the right support options.
            </p>

            <div
              className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3"
              role="radiogroup"
              aria-label="Care recipient category"
            >
              {RECIPIENT_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedCategory === opt.category;
                return (
                  <button
                    key={opt.category}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleCategorySelect(opt.category)}
                    className={`flex flex-col text-left rounded-3xl p-6 border transition-all duration-200 min-h-[140px] group ${
                      isSelected
                        ? "border-primary bg-primary-soft/40 ring-2 ring-primary/20 shadow-xs"
                        : "border-border bg-background hover:border-primary/40 hover:bg-secondary/30"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid size-11 place-items-center rounded-2xl transition-colors ${
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground group-hover:bg-primary-soft group-hover:text-primary"
                          }`}
                        >
                          <Icon className="size-5" />
                        </span>
                        <span className="font-semibold text-base text-foreground">
                          {opt.label}
                        </span>
                      </div>
                      <ArrowRight className="size-4 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                      {opt.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            STEP 1: WHAT SITUATION OR CHALLENGE ARE THEY FACING?
        ───────────────────────────────────────────────────────────── */}
        {step === 1 && (
          <div className="mt-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  Step 2 of 4 · What specific situation or challenge are they facing?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Choose the situation that best describes your family's current day-to-day need.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(0)}
                className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="size-3.5" /> Change Person
              </Button>
            </div>

            <div className="mt-6 space-y-3.5" role="radiogroup" aria-label="Customer situations">
              {availableNeeds.map((need) => {
                const isSelected = selectedNeedId === need.id;
                const isRedFlag = need.status === "NOT_CURRENTLY_SUPPORTED";
                const isPartner = need.status === "PARTNER_OR_REFERRAL_REQUIRED";

                return (
                  <button
                    key={need.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleNeedSelect(need.id)}
                    className={`w-full flex flex-col md:flex-row md:items-center justify-between text-left rounded-2xl p-5 border transition-all duration-200 gap-4 group ${
                      isSelected
                        ? "border-primary bg-primary-soft/50 ring-2 ring-primary/20 shadow-xs"
                        : isRedFlag
                        ? "border-destructive/30 bg-destructive/5 hover:border-destructive/60"
                        : "border-border bg-background hover:border-primary/40 hover:bg-secondary/30"
                    }`}
                  >
                    <div className="space-y-1.5 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-base text-foreground">
                          {need.label}
                        </span>
                        {isRedFlag ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-destructive/15 px-2.5 py-0.5 text-[10px] font-bold text-destructive uppercase tracking-wider">
                            <AlertTriangle className="size-3" /> Medical Emergency
                          </span>
                        ) : isPartner ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                            <HelpCircle className="size-3" /> Clinical Specialist Required
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wider">
                            <CheckCircle2 className="size-3" /> Verified Service Match
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-foreground/90 font-medium">
                        "{need.situation}"
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {need.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                      {need.price && (
                        <div className="text-right">
                          <span className="text-[10px] text-muted-foreground block">Starting at</span>
                          <span className="text-sm font-bold text-foreground font-display">
                            {formatINR(need.price)}/{need.billingBasis}
                          </span>
                        </div>
                      )}
                      <span className="grid size-9 place-items-center rounded-xl bg-card border border-border group-hover:border-primary group-hover:text-primary transition-all">
                        <ArrowRight className="size-4" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex justify-between items-center pt-4 border-t border-border">
              <Button variant="outline" size="sm" onClick={() => setStep(0)} className="gap-2">
                <ArrowLeft className="size-4" /> Back to Step 1
              </Button>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            STEP 2: SERVICE LOCATION & SHIFT PREFERENCES
        ───────────────────────────────────────────────────────────── */}
        {step === 2 && (
          <div className="mt-8 animate-fade-in space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  Step 3 of 4 · City and Schedule Preferences
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Select your city and required shift timing so we can verify attendant availability.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(1)}
                className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="size-3.5" /> Change Situation
              </Button>
            </div>

            {/* City Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5 mb-3">
                <MapPin className="size-3.5 text-primary" /> Service City
              </label>
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
                {VERIFIED_CITIES.map((city) => {
                  const isSelected = !isOtherCity && selectedCity.toLowerCase() === city.toLowerCase();
                  return (
                    <button
                      key={city}
                      type="button"
                      onClick={() => handleCitySelect(city)}
                      className={`rounded-2xl p-4 text-left border transition-all ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-xs font-bold"
                          : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      <p className="text-sm font-semibold">{city}</p>
                      <p className="text-[11px] opacity-80 mt-0.5">Active Cluster (90m SLA)</p>
                    </button>
                  );
                })}

                {/* Other City Option */}
                <button
                  type="button"
                  onClick={() => handleCitySelect("other")}
                  className={`rounded-2xl p-4 text-left border transition-all ${
                    isOtherCity
                      ? "border-primary bg-primary text-primary-foreground shadow-xs font-bold"
                      : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  <p className="text-sm font-semibold">Other City</p>
                  <p className="text-[11px] opacity-80 mt-0.5">Custom Care Desk Request</p>
                </button>
              </div>

              {isOtherCity && (
                <div className="mt-4 rounded-2xl border border-border bg-secondary/30 p-4 max-w-md animate-fade-in">
                  <label htmlFor="custom-city-input" className="text-xs font-medium text-foreground block mb-1.5">
                    Enter your city or district:
                  </label>
                  <input
                    id="custom-city-input"
                    type="text"
                    value={customCityName}
                    onChange={(e) => setCustomCityName(e.target.value)}
                    placeholder="e.g. Mysuru, Madurai, Warangal, Kochi"
                    className="w-full rounded-xl border border-border bg-card px-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-[11px] text-muted-foreground mt-2">
                    Our care desk evaluates custom travel arrangements and outstation attendant placement on case-by-case requests.
                  </p>
                </div>
              )}
            </div>

            {/* Shift Preference */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5 mb-3">
                <Clock className="size-3.5 text-primary" /> Shift & Timing Preference
              </label>
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                {SHIFT_OPTIONS.map((opt) => {
                  const isSelected = selectedShift === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedShift(opt.id)}
                      className={`rounded-2xl p-4 text-left border transition-all ${
                        isSelected
                          ? "border-primary bg-primary-soft/50 ring-2 ring-primary/20 text-foreground font-semibold shadow-2xs"
                          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      <p className="text-xs font-bold text-foreground">{opt.label}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">{opt.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex justify-between items-center pt-6 border-t border-border">
              <Button variant="outline" size="sm" onClick={() => setStep(1)} className="gap-2">
                <ArrowLeft className="size-4" /> Previous Step
              </Button>
              <Button size="lg" onClick={handleProceedToRecommendation} className="gap-2">
                <span>View Matched Recommendation</span>
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            STEP 3: MATCHED RECOMMENDATION & CLINICAL SCOPE
        ───────────────────────────────────────────────────────────── */}
        {step === 3 && (
          <div className="mt-8 animate-fade-in space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  Step 4 of 4 · Verified Care Plan & Scope Recommendation
                </p>
                <h3 className="text-xl font-semibold text-foreground mt-0.5">
                  Recommendation for: {currentNeed.label}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStep(2)}
                  className="gap-1.5 text-xs"
                >
                  <ArrowLeft className="size-3.5" /> Edit Criteria
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="size-3.5" /> Start Over
                </Button>
              </div>
            </div>

            {/* ── CASE 1: MEDICAL EMERGENCY RED FLAG ── */}
            {currentNeed.status === "NOT_CURRENTLY_SUPPORTED" && (
              <div className="rounded-3xl border-2 border-destructive/80 bg-destructive/10 p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-3 text-destructive font-bold text-lg">
                  <AlertTriangle className="size-6 shrink-0" />
                  <span>EMERGENCY MEDICAL ATTENTION REQUIRED — DIAL 108 IMMEDIATELY</span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                  {currentNeed.safetyBoundary}
                </p>
                <div className="rounded-2xl bg-card/90 border border-border p-4 text-xs text-muted-foreground space-y-1">
                  <p className="font-semibold text-foreground">Why ApnaCare cannot dispatch an attendant:</p>
                  <p>
                    Home attendants and visiting nurses are not equipped to manage acute cardiac arrest, acute respiratory failure, or stroke resuscitation. Immediate emergency room triage via a motorized ambulance (Dial 108) is vital.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href="tel:108"
                    className="inline-flex items-center gap-2 rounded-full bg-destructive text-white px-6 py-3 font-bold text-sm hover:bg-destructive/90 transition-colors shadow-soft"
                  >
                    <Phone className="size-4" /> Dial 108 Emergency Ambulance
                  </a>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-xs font-semibold text-foreground hover:bg-secondary transition-colors"
                  >
                    <MessageCircle className="size-4 text-[#25D366]" /> Talk to ApnaCare Care Desk
                  </a>
                </div>
              </div>
            )}

            {/* ── CASE 2: PARTNER / SPECIALIST REFERRAL REQUIRED (e.g. Physiotherapy) ── */}
            {currentNeed.status === "PARTNER_OR_REFERRAL_REQUIRED" && (
              <div className="rounded-3xl border border-blue-500/40 bg-gradient-to-br from-blue-500/10 via-card to-card p-6 md:p-8 space-y-5 shadow-soft">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                    Specialist Clinical Referral Required
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs font-semibold text-foreground">
                    Licensed Physiotherapist (BPT / MPT) Assessment
                  </span>
                </div>

                <h3 className="font-display text-2xl font-semibold text-foreground">
                  {currentNeed.serviceName}
                </h3>

                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-950 dark:text-amber-200 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <AlertCircle className="size-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    Important Clinical Boundary:
                  </p>
                  <p className="leading-relaxed">
                    {currentNeed.safetyBoundary}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 pt-2">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                      What is Included via Partner Referral:
                    </p>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      {currentNeed.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-destructive">
                      What Attendants Cannot Do:
                    </p>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      {currentNeed.exclusions.map((exc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="size-1.5 rounded-full bg-destructive shrink-0 mt-1.5" />
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      Let our care coordinator coordinate the referral
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      We connect your family with licensed physiotherapy partners in {selectedCity}.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/15 px-6 py-3 text-xs font-semibold text-[#128C7E] dark:text-[#25D366] hover:bg-[#25D366]/25 transition-colors min-h-[44px]"
                    >
                      <MessageCircle className="size-4 text-[#25D366]" /> Request Physiotherapist Guidance
                    </a>
                    <Button asChild variant="outline" size="sm" className="rounded-full min-h-[44px]">
                      <Link to="/contact">Request Care Desk Callback</Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* ── CASE 3: VERIFIED AVAILABLE SERVICE MATCH ── */}
            {currentNeed.status === "VERIFIED_AVAILABLE" && (
              <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary-soft/40 via-card to-card p-6 md:p-8 lg:p-10 shadow-soft">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                  {/* Left 8 Cols: Solution Details, Boundaries & Qualifications */}
                  <div className="lg:col-span-8 space-y-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="eyebrow">{currentNeed.categoryLabel}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="rounded-full bg-primary-soft px-3 py-0.5 text-[11px] font-bold text-primary">
                        Verified Match: {currentNeed.serviceName}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {isOtherCity ? (customCityName ? customCityName : "Other Location") : selectedCity}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-foreground leading-tight">
                      {currentNeed.serviceName}
                    </h3>

                    <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                      {currentNeed.situation}
                    </p>

                    {/* Specific Clinical Notice (e.g. for Shoulder/Joint Pain or Nursing) */}
                    {currentNeed.clinicalNotice && (
                      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-950 dark:text-amber-200 space-y-1">
                        <p className="font-bold flex items-center gap-1.5">
                          <AlertCircle className="size-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                          Clinical Scope Notice:
                        </p>
                        <p className="leading-relaxed">{currentNeed.clinicalNotice}</p>
                      </div>
                    )}

                    {/* Professional Qualifications & Verification */}
                    <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                        <FileCheck2 className="size-4" /> Assigned Workforce Qualification
                      </p>
                      <p className="text-xs font-semibold text-foreground">
                        {currentNeed.professionalQualification}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="size-3.5 text-primary" /> 100% Police & Biometric Aadhaar Cleared
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3.5 text-primary" /> Guaranteed 90-Minute Backup Dispatch
                        </span>
                      </div>
                    </div>

                    {/* Inclusions vs Exclusions Breakdown */}
                    <div className="grid gap-5 sm:grid-cols-2 pt-1">
                      <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary">
                          What is Included in Care:
                        </p>
                        <ul className="space-y-1.5 text-xs text-muted-foreground">
                          {currentNeed.inclusions.map((inc, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Service Boundaries (What is Excluded):
                        </p>
                        <ul className="space-y-1.5 text-xs text-muted-foreground">
                          {currentNeed.exclusions.map((exc, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="size-1.5 rounded-full bg-muted-foreground shrink-0 mt-1.5" />
                              <span>{exc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Right 4 Cols: Pricing Card & Preserved Booking Handoff */}
                  <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-soft space-y-6">
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Transparent Price
                      </span>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="font-display text-3xl font-bold text-foreground">
                          {formatINR(currentNeed.price ?? 1299)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          /{currentNeed.billingBasis ?? "day"}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        + 18% statutory GST · Zero direct broker surcharge
                      </p>

                      <div className="mt-4 pt-4 border-t border-border space-y-2 text-xs">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Selected Shift:</span>
                          <span className="font-semibold text-foreground capitalize">
                            {SHIFT_OPTIONS.find((s) => s.id === selectedShift)?.label ?? selectedShift}
                          </span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Location Status:</span>
                          <span className="font-semibold text-primary">
                            {isOtherCity ? "Custom Desk Evaluation" : `Active Cluster in ${selectedCity}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {/* Preserved Booking Handoff */}
                      {currentNeed.primaryServiceSlug && (
                        <Button asChild size="lg" className="w-full rounded-full min-h-[48px] shadow-soft hover:shadow-lift">
                          <Link
                            to="/booking"
                            search={{
                              service: currentNeed.primaryServiceSlug,
                              city: isOtherCity ? "other" : selectedCity.toLowerCase(),
                              needId: currentNeed.id,
                              situation: currentNeed.label,
                            }}
                            onClick={() =>
                              track("guided_care_handoff_booking", {
                                needId: currentNeed.id,
                                service: currentNeed.primaryServiceSlug,
                                city: selectedCity,
                              })
                            }
                          >
                            <span>Book {currentNeed.serviceName}</span>
                            <ArrowRight className="ml-2 size-4" />
                          </Link>
                        </Button>
                      )}

                      {/* Preserved WhatsApp Handoff */}
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          track("guided_care_handoff_whatsapp", {
                            needId: currentNeed.id,
                            service: currentNeed.primaryServiceSlug,
                            city: selectedCity,
                          })
                        }
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/10 px-4 py-3 text-xs font-semibold text-[#128C7E] dark:text-[#25D366] hover:bg-[#25D366]/20 transition-colors min-h-[44px]"
                      >
                        <MessageCircle className="size-4 text-[#25D366]" />
                        <span>Chat with Care Coordinator</span>
                      </a>

                      <p className="text-[11px] text-center text-muted-foreground pt-1">
                        Average care desk response time: <strong>15 minutes</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
