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
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { ENTERPRISE_TAXONOMY_MAP, type TaxonomyRecord } from "@/data/taxonomy";
import { CITIES, formatINR, buildWhatsAppUrl } from "@/data/site";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

interface CareOption {
  id: string;
  label: string;
  subtitle: string;
  icon: typeof Heart;
  matchingTaxonomyIds: string[];
}

const CARE_RECIPIENT_OPTIONS: CareOption[] = [
  {
    id: "parent",
    label: "Aging Parent at Home",
    subtitle: "Companionship, daily mobility, bathing, and medication logging",
    icon: Heart,
    matchingTaxonomyIds: ["TAX-01", "TAX-10", "TAX-11"],
  },
  {
    id: "hospital",
    label: "Hospitalized Loved One",
    subtitle: "Bedside night vigil, recovery ward assistance, and nurse liaison",
    icon: Hospital,
    matchingTaxonomyIds: ["TAX-02"],
  },
  {
    id: "clinical",
    label: "Clinical & Post-Op Recovery",
    subtitle: "Doctor-prescribed wound dressing, catheter care, and injections",
    icon: Stethoscope,
    matchingTaxonomyIds: ["TAX-03"],
  },
  {
    id: "mother",
    label: "New Mother & Newborn",
    subtitle: "Traditional Japa massage, warm baths, colic soothing, and restorative rest",
    icon: Baby,
    matchingTaxonomyIds: ["TAX-04"],
  },
  {
    id: "transit",
    label: "Assisted Travel & Commute",
    subtitle: "Railway platform boarding, airport wheelchair escort, or women chauffeurs",
    icon: Compass,
    matchingTaxonomyIds: ["TAX-05", "TAX-06", "TAX-07"],
  },
];

export function GuidedCareDiscovery({ className = "" }: { className?: string }) {
  const [selectedRecipient, setSelectedRecipient] = useState<string>("parent");
  const [selectedTaxonomyId, setSelectedTaxonomyId] = useState<string>("TAX-01");
  const [selectedCity, setSelectedCity] = useState<string>("Bengaluru");

  // Filter available taxonomy options based on selected recipient
  const availableTaxonomyRecords = useMemo(() => {
    const option = CARE_RECIPIENT_OPTIONS.find((o) => o.id === selectedRecipient);
    if (!option) return [ENTERPRISE_TAXONOMY_MAP[0]!];
    return ENTERPRISE_TAXONOMY_MAP.filter((t) => option.matchingTaxonomyIds.includes(t.id));
  }, [selectedRecipient]);

  // Current matched record
  const currentRecord = useMemo<TaxonomyRecord>(() => {
    const found = availableTaxonomyRecords.find((r) => r.id === selectedTaxonomyId);
    return found ?? availableTaxonomyRecords[0] ?? ENTERPRISE_TAXONOMY_MAP[0]!;
  }, [availableTaxonomyRecords, selectedTaxonomyId]);

  const handleRecipientChange = (id: string) => {
    setSelectedRecipient(id);
    const opt = CARE_RECIPIENT_OPTIONS.find((o) => o.id === id);
    if (opt && opt.matchingTaxonomyIds.length > 0) {
      setSelectedTaxonomyId(opt.matchingTaxonomyIds[0]!);
    }
    track("guided_care_recipient_select", { recipient: id });
  };

  const handleTaxonomySelect = (id: string) => {
    setSelectedTaxonomyId(id);
    track("guided_care_problem_select", { taxonomyId: id });
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    track("guided_care_city_select", { city });
  };

  const waUrl = useMemo(() => {
    const text = `Hello ApnaCare! I used your Care Discovery tool for my family.\n- Care Recipient: ${
      CARE_RECIPIENT_OPTIONS.find((o) => o.id === selectedRecipient)?.label
    }\n- Service Needed: ${currentRecord.serviceName} (${currentRecord.solution.name})\n- City: ${selectedCity}\nPlease share verified attendant profiles and availability.`;
    return buildWhatsAppUrl(text);
  }, [selectedRecipient, currentRecord, selectedCity]);

  return (
    <section className={`scroll-mt-20 ${className}`} id="guided-discovery">
      <div className="rounded-[2.5rem] border border-border bg-card p-6 md:p-10 lg:p-12 shadow-soft">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur">
            <Sparkles className="size-3.5 text-terracotta" />
            <span>Interactive Care Finder</span>
          </div>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground tracking-tight">
            Find the Right Support for Your Family
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Not sure which service fits? Answer 3 gentle questions to get matched with verified,
            police-cleared attendants in your city.
          </p>
        </div>

        {/* Step 1: Who needs support? */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            Step 1 · Who requires care or assistance?
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" role="radiogroup" aria-label="Who requires care">
            {CARE_RECIPIENT_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedRecipient === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleRecipientChange(opt.id)}
                  className={`flex flex-col text-left rounded-2xl p-4 border transition-all duration-200 min-h-[96px] ${
                    isSelected
                      ? "border-primary bg-primary-soft/50 ring-2 ring-primary/20 shadow-xs"
                      : "border-border bg-background hover:border-primary/40 hover:bg-secondary/30"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`grid size-8 place-items-center rounded-xl transition-colors ${
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="text-sm font-semibold text-foreground">{opt.label}</span>
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                    {opt.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: What is the primary situation or challenge? */}
        {availableTaxonomyRecords.length > 1 && (
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              Step 2 · What is the primary situation or challenge?
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {availableTaxonomyRecords.map((rec) => {
                const isSelected = currentRecord.id === rec.id;
                return (
                  <button
                    key={rec.id}
                    type="button"
                    onClick={() => handleTaxonomySelect(rec.id)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all min-h-[40px] ${
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground shadow-xs"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    <span>{rec.problem.title}</span>
                    <span className="text-[10px] opacity-80">({rec.serviceName})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Location Selection */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              <span>Step 3 · Service City</span>
            </p>
            <span className="text-[11px] text-muted-foreground">
              Guaranteed 90-minute backup coverage in active metro clusters
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {CITIES.map((city) => {
              const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();
              return (
                <button
                  key={city.name}
                  type="button"
                  onClick={() => handleCitySelect(city.name)}
                  className={`rounded-full px-5 py-2 text-xs font-semibold transition-all min-h-[38px] ${
                    isSelected
                      ? "bg-foreground text-background shadow-xs font-bold"
                      : "border border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {city.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Matched Result Card ── */}
        <div className="mt-8 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary-soft/40 via-card to-card p-6 md:p-8 shadow-soft">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            {/* Left 8 Cols: Solution Details & Verified Boundaries */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow">{currentRecord.serviceCategory}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-xs font-semibold text-primary">
                  Recommended: {currentRecord.serviceName}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="rounded-full bg-terracotta/15 px-2.5 py-0.5 text-[10px] font-bold text-terracotta uppercase tracking-wider">
                  Verified Match
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-foreground leading-tight">
                {currentRecord.solution.name}
              </h3>

              <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                {currentRecord.solution.valueProposition}
              </p>

              {/* Verified Trust Badges */}
              <div className="grid gap-2 sm:grid-cols-2 pt-2">
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="size-4 shrink-0 text-primary mt-0.5" />
                  <span>
                    <strong className="text-foreground">Strict Background Clearance:</strong> 100%
                    biometric Aadhaar check, police clearance certificate, and residential vetting.
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Clock className="size-4 shrink-0 text-primary mt-0.5" />
                  <span>
                    <strong className="text-foreground">SLA & Backup Guarantee:</strong>{" "}
                    {currentRecord.capability.standardSLA ?? "90-minute guaranteed replacement dispatch."}
                  </span>
                </div>
              </div>

              {/* Key Differentiator Notice */}
              <div className="rounded-xl border border-border/80 bg-background/80 p-3.5 text-xs text-muted-foreground">
                <strong className="text-foreground">Operational Scope: </strong>
                {currentRecord.solution.keyDifferentiator}
              </div>
            </div>

            {/* Right 4 Cols: Pricing & Direct Actions */}
            <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs">
              <div>
                <span className="text-xs text-muted-foreground">Starting Transparent Rate</span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-bold text-foreground">
                    {formatINR(currentRecord.startingPrice)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    /{currentRecord.serviceSlug.includes("assistance") ? "trip" : "day"}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  + 18% statutory GST · Zero agency commission
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary">
                  <CheckCircle2 className="size-4" />
                  <span>Active in {selectedCity}</span>
                </div>
              </div>

              <div className="mt-6 space-y-2.5">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full min-h-[46px] shadow-soft hover:shadow-lift"
                >
                  <Link
                    to="/booking"
                    search={{
                      service: currentRecord.serviceSlug,
                      city: selectedCity.toLowerCase(),
                    }}
                    onClick={() =>
                      track("guided_care_book_click", {
                        service: currentRecord.serviceSlug,
                        city: selectedCity,
                      })
                    }
                  >
                    <span>Book {currentRecord.serviceName}</span>
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("guided_care_whatsapp_click", {
                      service: currentRecord.serviceSlug,
                      city: selectedCity,
                    })
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/10 px-4 py-2.5 text-xs font-semibold text-[#128C7E] dark:text-[#25D366] hover:bg-[#25D366]/20 transition-colors min-h-[44px]"
                >
                  <MessageCircle className="size-4 text-[#25D366]" />
                  <span>Chat with Care Coordinator</span>
                </a>

                <div className="pt-2 text-center">
                  <Link
                    to={currentRecord.pageRoute}
                    className="text-xs text-muted-foreground hover:text-foreground hover:underline inline-flex items-center gap-1"
                  >
                    <span>View full service details & boundaries</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
