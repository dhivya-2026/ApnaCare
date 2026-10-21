import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Heart,
  Hospital,
  Stethoscope,
  Baby,
  Compass,
  Shield,
  Activity,
  Check,
  Filter,
} from "lucide-react";
import { SERVICES, formatINR, buildWhatsAppUrl, type Service } from "@/data/site";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type IndustryCategory =
  | "all"
  | "elderly"
  | "hospital"
  | "nursing"
  | "maternal"
  | "travel"
  | "specialized";

export interface CatalogItem {
  id: string;
  slug: string;
  name: string;
  category: IndustryCategory;
  categoryLabel: string;
  professionalRole: string;
  verificationBadge: string;
  badgeVariant: "primary" | "terracotta" | "blue" | "secondary";
  shortDesc: string;
  keyInclusions: string[];
  price: number;
  pricingUnit: "day" | "trip" | "consultation";
  isPartnerNetwork?: boolean;
  partnerNotice?: string;
  shifts: string;
  supportedCities: string;
  popular?: boolean;
}

export const INDUSTRY_CATEGORIES: { id: IndustryCategory; label: string; icon: typeof Heart }[] = [
  { id: "all", label: "All Services", icon: Sparkles },
  { id: "elderly", label: "Elderly & Senior Care", icon: Heart },
  { id: "hospital", label: "Hospital & Convalescence", icon: Hospital },
  { id: "nursing", label: "Clinical Home Nursing", icon: Stethoscope },
  { id: "maternal", label: "Maternal & Newborn", icon: Baby },
  { id: "travel", label: "Assisted Travel & Drivers", icon: Compass },
  { id: "specialized", label: "Specialized & Security", icon: Shield },
];

export const COMPREHENSIVE_CATALOG: CatalogItem[] = [
  // ── Elderly & Senior Care ──
  {
    id: "cat-eld-01",
    slug: "elderly-care",
    name: "Elderly Care at Home",
    category: "elderly",
    categoryLabel: "Elderly & Senior Care",
    professionalRole: "Geriatric General Duty Assistant (GDA)",
    verificationBadge: "100% Police & Biometric Cleared",
    badgeVariant: "primary",
    shortDesc: "Compassionate companionship, seated bathing, walker mobility, fall prevention, and daily medication logging for aging parents.",
    keyInclusions: [
      "Assisted seated bathing, personal hygiene & grooming",
      "Fall prevention monitoring & steady walker support",
      "Medication adherence timekeeping & digital logging",
    ],
    price: 1299,
    pricingUnit: "day",
    shifts: "Day Shifts (8–12h), Night Shifts, or 24/7 Live-In",
    supportedCities: "Bengaluru · Chennai · Hyderabad · Coimbatore",
    popular: true,
  },
  {
    id: "cat-eld-02",
    slug: "home-personal-care",
    name: "Home Personal Care & Mobility",
    category: "elderly",
    categoryLabel: "Elderly & Senior Care",
    professionalRole: "Personal Care Attendant",
    verificationBadge: "Ergonomics & Hygiene Certified",
    badgeVariant: "secondary",
    shortDesc: "Warm, respectful personal care for seniors and convalescing individuals needing daily transfer, dressing, and feeding assistance.",
    keyInclusions: [
      "Dignified dressing, grooming, and dental care",
      "Gentle stretching and assisted mobility transfers",
      "Nutritious meal heating, tea serving & hydration prompts",
    ],
    price: 1099,
    pricingUnit: "day",
    shifts: "Flexible 6h, 8h, 10h, or 12h Daytime Shifts",
    supportedCities: "Bengaluru · Chennai · Hyderabad · Coimbatore",
  },
  {
    id: "cat-eld-03",
    slug: "elderly-care",
    name: "Dementia & Memory Care Companion",
    category: "elderly",
    categoryLabel: "Elderly & Senior Care",
    professionalRole: "Experienced Dementia Care Companion",
    verificationBadge: "Dementia Protocol Certified",
    badgeVariant: "primary",
    shortDesc: "Patient, vigilant companion focused on routine stabilization, calm communication, cognitive stimulation, and preventing wandering.",
    keyInclusions: [
      "Predictable daily routine management for waking & meals",
      "Gentle reminiscence activities and engaging conversations",
      "Discreet accompaniment to prevent unassisted wandering",
    ],
    price: 1299,
    pricingUnit: "day",
    shifts: "Day Shifts (8–12h) or 24/7 Continuous Live-In",
    supportedCities: "Bengaluru · Chennai · Hyderabad · Coimbatore",
    popular: true,
  },
  {
    id: "cat-eld-04",
    slug: "lifestyle-support",
    name: "Senior Lifestyle & Errand Support",
    category: "elderly",
    categoryLabel: "Elderly & Senior Care",
    professionalRole: "Companion & Digital Escort",
    verificationBadge: "Background Cleared",
    badgeVariant: "secondary",
    shortDesc: "Social accompaniment for active seniors: park walks, bank errands, temple visits, grocery trips, and smartphone/video calling guidance.",
    keyInclusions: [
      "Accompaniment on medical, banking, and temple visits",
      "WhatsApp video call and digital utility bill assistance",
      "Engaging companionship, reading aloud & shared walks",
    ],
    price: 899,
    pricingUnit: "day",
    shifts: "Half-Day Outings (4h) or Full-Day Support",
    supportedCities: "Bengaluru · Chennai · Hyderabad · Coimbatore",
  },

  // ── Hospital & Convalescence ──
  {
    id: "cat-hosp-01",
    slug: "hospital-attendants",
    name: "Hospital Bedside Vigil (Inpatient)",
    category: "hospital",
    categoryLabel: "Hospital & Convalescence",
    professionalRole: "Hospital Ward Care Attendant",
    verificationBadge: "Ward Protocol & Infection Control",
    badgeVariant: "terracotta",
    shortDesc: "Dedicated female attendant stationed by your loved one's hospital bed day and night to assist with hygiene, bedpans, and nurse coordination.",
    keyInclusions: [
      "12-hour night vigil or 24-hour continuous ward support",
      "Assistance with bedpan, urinal bottle & linen changes",
      "Coordination with hospital nursing staff & duty doctors",
    ],
    price: 1499,
    pricingUnit: "day",
    shifts: "12-Hour Night Shift (8 PM–8 AM) or 24/7 Stay",
    supportedCities: "All Major Private Hospitals in 4 Metros",
    popular: true,
  },
  {
    id: "cat-hosp-02",
    slug: "hospital-attendants",
    name: "Post-Surgical Step-Down Recovery",
    category: "hospital",
    categoryLabel: "Hospital & Convalescence",
    professionalRole: "Post-Op Convalescence Attendant",
    verificationBadge: "Zero-Strain Transfer Certified",
    badgeVariant: "secondary",
    shortDesc: "Transitional home recovery support for the critical 7–30 day post-discharge window after major surgery or fracture fixations.",
    keyInclusions: [
      "Safe bed-to-wheelchair transfers without surgical strain",
      "Temperature, BP, and discharge prescription adherence",
      "Liaison with visiting physiotherapists and family updates",
    ],
    price: 1499,
    pricingUnit: "day",
    shifts: "Day Shifts (10–12h) or 24-Hour Residential Shift",
    supportedCities: "Bengaluru · Chennai · Hyderabad · Coimbatore",
  },

  // ── Clinical Home Nursing ──
  {
    id: "cat-nurs-01",
    slug: "nursing-services",
    name: "Certified Home Nursing Care",
    category: "nursing",
    categoryLabel: "Clinical Home Nursing",
    professionalRole: "Registered GNM / B.Sc Nurse",
    verificationBadge: "State Nursing Council Registered",
    badgeVariant: "primary",
    shortDesc: "Clinical-grade nursing care at home: sterile surgical wound dressings, Foley catheter maintenance, and clinical vitals monitoring.",
    keyInclusions: [
      "Sterile surgical wound dressings & suture inspection",
      "Foley catheter care & Ryle's tube enteral feeds",
      "Doctor prescription compliance and vitals telemetry",
    ],
    price: 1999,
    pricingUnit: "day",
    shifts: "Clinical Visits (2h), 12h Shifts, or 24h Nursing",
    supportedCities: "Bengaluru · Chennai · Hyderabad · Coimbatore",
    popular: true,
  },
  {
    id: "cat-nurs-02",
    slug: "nursing-services",
    name: "Injectable & Infusion Nursing",
    category: "nursing",
    categoryLabel: "Clinical Home Nursing",
    professionalRole: "Clinical Nurse (Pharmacology Certified)",
    verificationBadge: "Aseptic Technique Verified",
    badgeVariant: "primary",
    shortDesc: "Sterile, physician-prescribed IV cannulation, antibiotic infusions, subcutaneous insulin, and post-injection patient monitoring.",
    keyInclusions: [
      "IV fluid infusions and sterile cannula maintenance",
      "Subcutaneous and intramuscular injections as prescribed",
      "Post-administration observation for adverse reactions",
    ],
    price: 1999,
    pricingUnit: "day",
    shifts: "Scheduled Medication Visits or Full Nursing Shift",
    supportedCities: "Bengaluru · Chennai · Hyderabad · Coimbatore",
  },

  // ── Maternal & Newborn ──
  {
    id: "cat-mat-01",
    slug: "post-natal-care",
    name: "Post-Natal Maternal Japa Care",
    category: "maternal",
    categoryLabel: "Maternal & Newborn",
    professionalRole: "Certified Japa & Maternal Attendant",
    verificationBadge: "Pediatric First Aid & Newborn Care",
    badgeVariant: "terracotta",
    shortDesc: "Traditional maternal convalescence, warm herbal baths, post-C-section recovery assistance, and ensuring mother gets deep restorative sleep.",
    keyInclusions: [
      "Post-delivery recuperation & herbal warm water care",
      "Night wakefulness soothing so mother gets 5–6h sleep",
      "Breastfeeding latch accompaniment & nutrition support",
    ],
    price: 1999,
    pricingUnit: "day",
    shifts: "12-Hour Day Shift or 24-Hour Live-In Japa",
    supportedCities: "Bengaluru · Chennai · Hyderabad · Coimbatore",
    popular: true,
  },
  {
    id: "cat-mat-02",
    slug: "post-natal-care",
    name: "Newborn Baby Massage & Hygiene",
    category: "maternal",
    categoryLabel: "Maternal & Newborn",
    professionalRole: "Infant Care Specialist",
    verificationBadge: "Newborn Hygiene Certified",
    badgeVariant: "secondary",
    shortDesc: "Experienced handling of newborn infants: traditional mustard/sesame oil body massage, warm sponge baths, burping, and colic soothing.",
    keyInclusions: [
      "Gentle oil infant massage and warm hygienic bath",
      "Umbilical cord care & hypoallergenic diaper hygiene",
      "Sterilization of baby clothes and feeding accessories",
    ],
    price: 1999,
    pricingUnit: "day",
    shifts: "Daily Morning Bath Shift or Full-Day Assistance",
    supportedCities: "Bengaluru · Chennai · Hyderabad · Coimbatore",
  },

  // ── Travel & Drivers ──
  {
    id: "cat-trv-01",
    slug: "railway-assistance",
    name: "Railway Station Platform Escort",
    category: "travel",
    categoryLabel: "Assisted Travel & Drivers",
    professionalRole: "Station Transit Safety Escort",
    verificationBadge: "Railway Protocol Certified",
    badgeVariant: "primary",
    shortDesc: "Meeting families at station drop-off, managing porters, navigating platform stairs/ramps with wheelchairs, and safe coach berth boarding.",
    keyInclusions: [
      "Curbside station reception 60 mins before departure",
      "Station wheelchair push or ramp escort across platforms",
      "Licensed porter coordination and berth settling",
    ],
    price: 899,
    pricingUnit: "trip",
    shifts: "Scheduled Advance Booking (24/7 Coverage)",
    supportedCities: "Majestic, Chennai Central, Secunderabad & Junctions",
    popular: true,
  },
  {
    id: "cat-trv-02",
    slug: "airport-pickup",
    name: "Airport Curbside-to-Gate Escort",
    category: "travel",
    categoryLabel: "Assisted Travel & Drivers",
    professionalRole: "Airport Ground Hospitality Escort",
    verificationBadge: "Airport Protocol Vetted",
    badgeVariant: "primary",
    shortDesc: "Curbside meet-and-greet, check-in baggage accompaniment, CISF security queue escort, and wheelchair transfer directly to boarding gate.",
    keyInclusions: [
      "Curbside meet-and-greet at departure or arrival terminal",
      "Airline check-in and baggage trolley management",
      "Wheelchair assistance coordination to aircraft gate",
    ],
    price: 999,
    pricingUnit: "trip",
    shifts: "Available 24 Hours / 7 Days a Week",
    supportedCities: "BLR, MAA, HYD & CJB Terminals",
  },
  {
    id: "cat-trv-03",
    slug: "women-drivers",
    name: "Verified Women Drivers & Chauffeurs",
    category: "travel",
    categoryLabel: "Assisted Travel & Drivers",
    professionalRole: "Commercial Licensed Woman Chauffeur",
    verificationBadge: "Clean Traffic & Police Verified",
    badgeVariant: "terracotta",
    shortDesc: "Punctual, defensive-driving certified women drivers for your personal car: office commutes, elder clinic visits, and safe family transit.",
    keyInclusions: [
      "Punctual arrival and pre-trip vehicle safety check",
      "Defensive, smooth driving adhering to traffic rules",
      "Assisting senior passengers in and out of the vehicle",
    ],
    price: 1199,
    pricingUnit: "day",
    shifts: "4-Hour Blocks, 8-Hour Daily Shifts, or Monthly",
    supportedCities: "Bengaluru · Chennai · Hyderabad · Coimbatore",
    popular: true,
  },
  {
    id: "cat-trv-04",
    slug: "travel-assistance",
    name: "Intercity Journey Travel Companion",
    category: "travel",
    categoryLabel: "Assisted Travel & Drivers",
    professionalRole: "Travel Safety Companion",
    verificationBadge: "First Aid & GPS Monitored",
    badgeVariant: "secondary",
    shortDesc: "Vetted women travel companions to accompany solo women, elderly parents, or young children on long-distance trains, flights, and road trips.",
    keyInclusions: [
      "End-to-end continuous journey accompaniment",
      "Medication and meal scheduling during travel",
      "Live GPS trip tracking link shared with family",
    ],
    price: 1599,
    pricingUnit: "day",
    shifts: "Single-Day Transit or Multi-Day Outstation Tours",
    supportedCities: "Intercity Transit across South India",
  },

  // ── Specialized & Security ──
  {
    id: "cat-spec-01",
    slug: "security-support",
    name: "Security Support & Female Marshals",
    category: "specialized",
    categoryLabel: "Specialized & Security",
    professionalRole: "Certified Security Marshal (PSARA)",
    verificationBadge: "Self-Defense & Security Cleared",
    badgeVariant: "secondary",
    shortDesc: "Trained female security personnel for close protection, high-profile weddings, sensitive court visits, and residential security vigilance.",
    keyInclusions: [
      "Close personal escort during public or legal appearances",
      "Security supervision at private events and celebrations",
      "24/7 command center link with emergency SOS beacon",
    ],
    price: 1899,
    pricingUnit: "day",
    shifts: "Hourly Event Shifts or 12-Hour Protection Details",
    supportedCities: "Bengaluru · Chennai · Hyderabad · Coimbatore",
  },
  {
    id: "cat-spec-02",
    slug: "nursing-services",
    name: "In-Home Physiotherapy (Partner Network)",
    category: "specialized",
    categoryLabel: "Specialized & Security",
    professionalRole: "Licensed Physiotherapist (BPT / MPT)",
    verificationBadge: "Allied Health Council Licensed",
    badgeVariant: "blue",
    shortDesc: "Formal musculoskeletal and neuro-rehabilitation for stroke recovery, joint stiffness, and post-TKR mobility delivered via verified clinical partners.",
    keyInclusions: [
      "Range of motion and functional impairment evaluation",
      "Custom rehabilitation exercise protocol design",
      "Training daily attendants on safe transfer mechanics",
    ],
    price: 800,
    pricingUnit: "consultation",
    isPartnerNetwork: true,
    partnerNotice: "Delivered via verified clinical physiotherapy partners. Daily attendants support routine living under their clinical guidance.",
    shifts: "45–60 Minute In-Home Clinical Sessions",
    supportedCities: "Bengaluru · Chennai · Hyderabad · Coimbatore",
  },
];

export function ComprehensiveServiceCatalog({ className = "" }: { className?: string }) {
  const [selectedCat, setSelectedCat] = useState<IndustryCategory>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredServices = useMemo(() => {
    return COMPREHENSIVE_CATALOG.filter((item) => {
      const matchesCategory = selectedCat === "all" || item.category === selectedCat;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.shortDesc.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.professionalRole.toLowerCase().includes(q) ||
        item.keyInclusions.some((inc) => inc.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCat, searchQuery]);

  return (
    <section id="services" className={`scroll-mt-20 ${className}`}>
      <div className="container-page py-12 md:py-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-border pb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur">
              <Sparkles className="size-3.5 text-terracotta" />
              <span>Evidence-Backed Industry Service Portfolio</span>
            </div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight leading-tight">
              All Care & Attendant Services, Categorized for Your Family
            </h2>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Explore our complete spectrum of verified care services across South India. From daily living and inpatient hospital vigils to clinical nursing, post-natal recovery, and safe transit.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              aria-label="Search all services"
              placeholder="Search by care need, e.g., dementia, bath, injection…"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                track("catalog_search", { q: e.target.value });
              }}
              className="h-12 rounded-full bg-card pl-11 pr-4 shadow-2xs border-border text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Industry Category Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-2" role="tablist" aria-label="Service categories">
          {INDUSTRY_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const count =
              cat.id === "all"
                ? COMPREHENSIVE_CATALOG.length
                : COMPREHENSIVE_CATALOG.filter((i) => i.category === cat.id).length;
            const isSelected = selectedCat === cat.id;

            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setSelectedCat(cat.id);
                  track("catalog_category_tab", { category: cat.id });
                }}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all min-h-[42px] ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-xs font-bold"
                    : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                <Icon className={`size-3.5 ${isSelected ? "text-primary-foreground" : "text-primary"}`} />
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                    isSelected ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Services Grid ── */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((svc) => {
            const waUrl = buildWhatsAppUrl(
              `Hello ApnaCare! I would like to inquire about ${svc.name} (${svc.categoryLabel}) for my family.`
            );

            return (
              <article
                key={svc.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lift"
              >
                <div>
                  {/* Card Header: Category & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 pb-3">
                    <span className="eyebrow text-terracotta">{svc.categoryLabel}</span>
                    <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wider">
                      {svc.verificationBadge}
                    </span>
                  </div>

                  {/* Title & Professional Designation */}
                  <div className="mt-3">
                    <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {svc.name}
                    </h3>
                    <p className="mt-0.5 text-xs font-semibold text-primary/90 flex items-center gap-1.5">
                      <ShieldCheck className="size-3.5" />
                      <span>{svc.professionalRole}</span>
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {svc.shortDesc}
                  </p>

                  {/* Partner Notice if applicable */}
                  {svc.isPartnerNetwork && svc.partnerNotice && (
                    <div className="mt-3 rounded-xl border border-blue-500/30 bg-blue-500/10 p-2.5 text-[11px] text-blue-900 dark:text-blue-300">
                      <strong>Clinical Network:</strong> {svc.partnerNotice}
                    </div>
                  )}

                  {/* Key Included Capabilities */}
                  <div className="mt-4 space-y-1.5 pt-3 border-t border-border/60">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      What is Included:
                    </p>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {svc.keyInclusions.map((inc, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="size-3.5 text-primary shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Shift Availability & Cities */}
                  <div className="mt-4 pt-3 border-t border-border/60 space-y-1 text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-3 text-primary shrink-0" />
                      <span className="truncate">{svc.shifts}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3 text-primary shrink-0" />
                      <span className="truncate">{svc.supportedCities}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price & Direct CTA Actions */}
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                        Transparent Rate
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-2xl font-bold text-foreground">
                          {formatINR(svc.price)}
                        </span>
                        <span className="text-xs text-muted-foreground">/{svc.pricingUnit}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground text-right">
                      + 18% statutory GST<br />Zero agent fees
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="grid gap-2 sm:grid-cols-2">
                    <Button asChild size="sm" className="rounded-full min-h-[42px] font-semibold">
                      <Link
                        to="/booking"
                        search={{ service: svc.slug }}
                        onClick={() => track("catalog_book_click", { service: svc.slug })}
                      >
                        <span>Book Service</span>
                        <ArrowRight className="ml-1 size-3.5" />
                      </Link>
                    </Button>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track("catalog_whatsapp_click", { service: svc.slug })}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#25D366] bg-[#25D366]/10 px-3 py-2 text-xs font-semibold text-[#128C7E] dark:text-[#25D366] hover:bg-[#25D366]/20 transition-colors min-h-[42px]"
                    >
                      <MessageCircle className="size-3.5 text-[#25D366]" />
                      <span>Inquire</span>
                    </a>
                  </div>

                  <div className="mt-3 text-center">
                    <Link
                      to="/services/$slug"
                      params={{ slug: svc.slug }}
                      className="text-[11px] font-semibold text-muted-foreground hover:text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <span>View full service details & boundaries</span>
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="mt-12 rounded-3xl bg-secondary/40 p-12 text-center max-w-xl mx-auto">
            <Activity className="size-10 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground">No specific service matched "{searchQuery}"</h3>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              We arrange custom care schedules and attendant matching across South India. Call our care coordinator desk or chat on WhatsApp.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button onClick={() => { setSearchQuery(""); setSelectedCat("all"); }} variant="outline" size="sm">
                Clear Filters
              </Button>
              <a
                href={buildWhatsAppUrl("Hello ApnaCare! I am looking for a custom care arrangement.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/10 px-4 py-2 text-xs font-semibold text-[#128C7E] dark:text-[#25D366]"
              >
                <MessageCircle className="size-3.5" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
