import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Building2,
  HeartHandshake,
  Activity,
  Car,
  Plane,
  Home,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookLink, CallLink } from "./Layout";
import { formatINR } from "@/data/site";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import nursingCare from "@/assets/nursing-care.jpg";

export interface EnterpriseOffering {
  id: string;
  code: string;
  practiceTag: string;
  badgePill: string;
  title: string;
  serviceSlug: string;
  image: string;
  alt: string;
  metricChip: string;
  familyBottleneck: string;
  careSolution: string;
  impactBadge: string;
  timeframeBadge: string;
  startingPrice: number;
  pricingUnit: string;
  deliverables: string[];
  isClinical?: boolean;
}

const ENTERPRISE_OFFERINGS: EnterpriseOffering[] = [
  {
    id: "offering-home-care",
    code: "01",
    practiceTag: "GERIATRIC & HOME LIVING",
    badgePill: "CARE AT HOME",
    title: "Elderly Companionship & Daily Living Care",
    serviceSlug: "elderly-care",
    image: hero1,
    alt: "Caregiver gently assisting an elderly lady at home",
    metricChip: "90-Min Guaranteed Regional Backup Dispatch",
    familyBottleneck:
      "Ageing parents living alone face severe isolation and fall risks, while working adult children suffer constant anxiety trying to balance office demands with daily care.",
    careSolution:
      "Vetted, patient female caregivers delivering dignified mobility assistance, gentle bathing, medication adherence logging, and warm conversation in the elder's familiar home.",
    impactBadge: "Reduces home fall hazards with daily WhatsApp wellbeing logs",
    timeframeBadge: "8hr, 12hr Day Shifts or 24hr Live-In Placement",
    startingPrice: 1299,
    pricingUnit: "day",
    deliverables: [
      "Assistance with bathing, grooming, and dignified personal hygiene",
      "Safe transfers, walking support, and tripping hazard monitoring",
      "Medication reminders strictly logged as per physician instructions",
      "Nutritious light meal accompaniment and continuous hydration prompts",
    ],
  },
  {
    id: "offering-hospital-vigil",
    code: "02",
    practiceTag: "INPATIENT & BEDSIDE RECOVERY",
    badgePill: "HOSPITAL ASSISTANCE",
    title: "Hospital Bedside Vigil & Patient Support",
    serviceSlug: "hospital-attendants",
    image: hero2,
    alt: "Attendant supporting a patient in hospital room recovery",
    metricChip: "24/7 Dedicated Inpatient Bedside Vigil",
    familyBottleneck:
      "Extended hospital stays leave patients exhausted and disoriented, while family members face severe sleep deprivation trying to stay awake beside the hospital bed night after night.",
    careSolution:
      "Trained attendants maintaining continuous bedside observation, answering call bells, coordinating with duty nurses, and handling personal comfort so families can rest without fear.",
    impactBadge: "Zero unattended patient calls & continuous family liaison",
    timeframeBadge: "12hr Day/Night Shifts or 24hr Continuous Coverage",
    startingPrice: 1499,
    pricingUnit: "day",
    deliverables: [
      "Continuous bedside vigil and call-bell coordination with duty nurses",
      "Patient repositioning to prevent bedsores and safe bathroom transfers",
      "Collecting prescribed medicines and lab test reports from hospital desk",
      "Post-operative discharge preparation and accompanied transition home",
    ],
  },
  {
    id: "offering-clinical-nursing",
    code: "03",
    practiceTag: "CLINICAL HOME HEALTHCARE",
    badgePill: "CERTIFIED NURSING",
    title: "Qualified Clinical Nursing Services",
    serviceSlug: "nursing-services",
    image: nursingCare,
    alt: "Registered nurse checking patient vitals and sterile wound care",
    metricChip: "State Nursing Council Registered (GNM / B.Sc)",
    familyBottleneck:
      "Post-surgical wound management, IV lines, and catheters require hospital-grade sterility, but frequent clinic visits are painful, exhausting, and expose frail patients to infections.",
    careSolution:
      "Registered female nurses delivering clinical medical interventions strictly adhering to doctor prescriptions, maintaining hospital-grade aseptic protocols in the comfort of home.",
    impactBadge: "Prescription-compliant sterile dressings & infusion monitoring",
    timeframeBadge: "2hr Clinical Visits, 12hr Shifts, or 24hr Nursing",
    startingPrice: 1999,
    pricingUnit: "day",
    isClinical: true,
    deliverables: [
      "Sterile post-operative surgical wound dressings and suture monitoring",
      "Subcutaneous and intramuscular injections as prescribed by physician",
      "Urinary catheter changes and Ryle's tube enteral feed maintenance",
      "Vitals tracking: Blood pressure, SpO2, blood glucose, and temperature",
    ],
  },
  {
    id: "offering-maternal-newborn",
    code: "04",
    practiceTag: "FOURTH TRIMESTER CONVALESCENCE",
    badgePill: "POST-NATAL & NEWBORN",
    title: "Postnatal Mother Recuperation & Newborn Care",
    serviceSlug: "post-natal-care",
    image: hero4,
    alt: "Experienced caregiver tenderly caring for newborn while mother rests",
    metricChip: "Restores 6–8 Hours of Uninterrupted Maternal Sleep",
    familyBottleneck:
      "New parents face severe physical exhaustion and emotional overwhelm following delivery, with night wakefulness, latching fatigue, and delicate infant bathing anxiety.",
    careSolution:
      "Experienced maternal attendants providing traditional fourth-trimester care, infant oil massage, warm baths, soothing burping techniques, and dedicated night wakefulness coverage.",
    impactBadge: "Deep maternal physical rest and safe pediatric hygiene",
    timeframeBadge: "12hr Shifts, Overnight Sleep Coverage, or 30-Day Retainer",
    startingPrice: 1999,
    pricingUnit: "day",
    deliverables: [
      "Gentle traditional newborn oil massage and warm water bathing",
      "Mother's post-delivery traditional oil massage and warm bath support",
      "Night wakefulness soothing so the new mother sleeps uninterrupted",
      "Umbilical cord care and sterilization of infant feeding equipment",
    ],
  },
  {
    id: "offering-travel-mobility",
    code: "05",
    practiceTag: "ACCOMPANIED TRANSIT & TERMINALS",
    badgePill: "TRAVEL ASSISTANCE",
    title: "Accompanied Travel & Terminal Assistance",
    serviceSlug: "travel-assistance",
    image: hero5,
    alt: "Professional travel companion assisting elderly traveler",
    metricChip: "Real-Time WhatsApp GPS Tracking & Concourse Meet",
    familyBottleneck:
      "Airports and bustling railway junctions are physically daunting for seniors and solo travelers, causing acute boarding anxiety and high luggage strain.",
    careSolution:
      "Verified female travel companions meeting passengers at curbs or platforms, coordinating licensed porters, assisting through check-in and security, and assisting safely to train berths or flight gates.",
    impactBadge: "Eliminates transit disorientation with live photo updates to family",
    timeframeBadge: "Terminal Meet-and-Greet, Full Day, or Intercity Journeys",
    startingPrice: 999,
    pricingUnit: "trip",
    deliverables: [
      "Meet-and-greet at airport terminal exit or railway station concourse",
      "Luggage trolley assistance, licensed porter handling, and bag retrieval",
      "Wheelchair assistance coordination with airline or railway ground staff",
      "Live GPS trip tracking link and safe boarding confirmation texted to family",
    ],
  },
  {
    id: "offering-family-support",
    code: "06",
    practiceTag: "HOUSEHOLD BALANCE & RESPITE",
    badgePill: "FAMILY SUPPORT & RESPITE",
    title: "Family Caregiver Respite & Household Support",
    serviceSlug: "home-personal-care",
    image: hero3,
    alt: "Caregiver helping family with domestic balance and meal assistance",
    metricChip: "Scheduled Weekly Relief Preventing Caregiver Burnout",
    familyBottleneck:
      "Primary family caregivers face chronic emotional exhaustion and health decline when providing continuous round-the-clock care for a sick relative without scheduled breaks.",
    careSolution:
      "Trained caregivers step in for predictable weekly intervals, allowing primary family caregivers uninterrupted time to recharge, attend personal commitments, or travel.",
    impactBadge: "Prevents caregiver burnout with structured routine handover",
    timeframeBadge: "Half-Day, Full-Day, Weekend, or Multi-Week Stints",
    startingPrice: 1099,
    pricingUnit: "day",
    deliverables: [
      "Seamless takeover of the elder's daily routine, meals, and mobility",
      "Detailed briefing handover before and after each coverage interval",
      "Emergency contact channel and 24/7 coordinator link open throughout",
      "Light nutritious home meal preparation and hydration accompaniment",
    ],
  },
];

export function EnterpriseOfferingsShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);

  const activeOffering = ENTERPRISE_OFFERINGS[activeIdx]!;

  const toggleDrawer = (id: string) => {
    setOpenDrawerId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="section py-16 md:py-24 border-b border-border/50 bg-secondary/20" id="offerings">
      <div className="container-page">
        {/* Section Intro (TrustGrid Inspired Structure) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-3.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="size-3 text-terracotta" />
              <span>PRIMARY CARE PORTFOLIOS</span>
            </div>
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Human-Centered Care Offering Architecture
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
              Purpose-built care. <em>Structured for family peace of mind.</em>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Six dedicated care disciplines designed to resolve acute vulnerability in home recuperation, hospital inpatient stays, clinical nursing, infant care, travel transits, and caregiver burnout.
          </p>
        </div>

        {/* Practice Navigator Bar (Inspired by TrustGrid's Practice Tabs) */}
        <div
          role="tablist"
          aria-label="Care Offering Practices"
          className="mt-8 flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-none"
        >
          {ENTERPRISE_OFFERINGS.map((offering, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={offering.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setActiveIdx(idx);
                  track("offering_tab_select", { offering: offering.id });
                }}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all min-h-[44px]",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
              >
                <span className={cn(
                  "font-mono text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                  isSelected ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                )}>
                  {offering.code}
                </span>
                <span>{offering.badgePill}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Offering Split Card (The Signature TrustGrid Architecture) */}
        <div className="mt-8">
          <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-lift transition-all">
            <div className="grid lg:grid-cols-12 gap-0 items-stretch">
              {/* Left Column: Visual with Metric Chip & Floating Badges */}
              <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full overflow-hidden bg-muted">
                <img
                  src={activeOffering.image}
                  alt={activeOffering.alt}
                  width={720}
                  height={480}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Floating Category Pill Top-Left */}
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-background/95 px-3 py-1 text-xs font-bold text-foreground backdrop-blur shadow-xs">
                    {activeOffering.badgePill}
                  </span>
                </div>

                {/* Clinical Distinction Top-Right */}
                <div className="absolute top-4 right-4">
                  {activeOffering.isClinical ? (
                    <span className="rounded-full bg-blue-600/90 text-white px-2.5 py-1 text-[11px] font-bold backdrop-blur shadow-xs">
                      Clinical Registered Nurse
                    </span>
                  ) : (
                    <span className="rounded-full bg-primary/90 text-primary-foreground px-2.5 py-1 text-[11px] font-bold backdrop-blur shadow-xs">
                      Non-Medical Support
                    </span>
                  )}
                </div>

                {/* Metric Chip (TrustGrid Style) at bottom of visual */}
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-black/60 p-3.5 backdrop-blur text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <ShieldCheck className="size-4 text-emerald-400 shrink-0" />
                    <span>{activeOffering.metricChip}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-white/80 border-t border-white/10 pt-1.5">
                    <span>Verified Aadhaar Authentication</span>
                    <span className="font-mono text-emerald-300">100% Cleared</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Problem-to-Solution Storytelling & Specifications */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
                      {activeOffering.practiceTag}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      Domain {activeOffering.code} of 06
                    </span>
                  </div>

                  <h3 className="mt-2 text-2xl sm:text-3xl font-bold font-display text-foreground leading-snug">
                    <Link
                      to="/services/$slug"
                      params={{ slug: activeOffering.serviceSlug }}
                      className="hover:text-primary transition-colors"
                    >
                      {activeOffering.title}
                    </Link>
                  </h3>

                  {/* Family Challenge (Buyer Bottleneck Box - Inspired by TrustGrid) */}
                  <div className="mt-4 rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-xs sm:text-sm">
                    <span className="font-bold text-destructive uppercase tracking-wider block text-[10px] mb-1">
                      The Family Vulnerability & Friction:
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      {activeOffering.familyBottleneck}
                    </p>
                  </div>

                  {/* Care Solution Summary */}
                  <div className="mt-3.5">
                    <span className="font-bold text-primary uppercase tracking-wider block text-[10px] mb-1">
                      The ApnaCare Verified Solution:
                    </span>
                    <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                      {activeOffering.careSolution}
                    </p>
                  </div>

                  {/* Impact & Timeframe Telemetry Pills */}
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    <div className="inline-flex items-center gap-2 rounded-xl bg-primary-soft/60 px-3 py-1.5 text-xs font-medium text-primary">
                      <Activity className="size-3.5 text-primary" />
                      <span>{activeOffering.impactBadge}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-xl bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground">
                      <Clock className="size-3.5 text-muted-foreground" />
                      <span>{activeOffering.timeframeBadge}</span>
                    </div>
                  </div>

                  {/* Collapsible Deliverables Drawer (TrustGrid Style) */}
                  <div className="mt-6 border-t border-border pt-4">
                    <button
                      type="button"
                      onClick={() => toggleDrawer(activeOffering.id)}
                      className="flex w-full items-center justify-between text-xs font-bold text-foreground hover:text-primary transition-colors cursor-pointer py-1"
                      aria-expanded={openDrawerId === activeOffering.id}
                    >
                      <span className="flex items-center gap-1.5">
                        <Check className="size-4 text-primary" />
                        {openDrawerId === activeOffering.id
                          ? "Hide Care Deliverables & Safeguards"
                          : "View Care Deliverables & Safeguards (+)"}
                      </span>
                      {openDrawerId === activeOffering.id ? (
                        <ChevronUp className="size-4 text-primary" />
                      ) : (
                        <ChevronDown className="size-4 text-muted-foreground" />
                      )}
                    </button>

                    {openDrawerId === activeOffering.id && (
                      <div className="mt-3 rounded-2xl bg-secondary/50 p-4 border border-border/80 animate-fade-in">
                        <ul className="grid gap-2 sm:grid-cols-2 text-xs text-foreground/90">
                          {activeOffering.deliverables.map((item, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2">
                              <Check className="size-3.5 text-primary shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Rate & Dual Action Row */}
                <div className="mt-8 pt-5 border-t border-border flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] text-muted-foreground">Transparent Starting Fee</p>
                    <p className="font-display text-2xl font-bold text-foreground">
                      {formatINR(activeOffering.startingPrice)}
                      <span className="text-xs font-normal text-muted-foreground">
                        /{activeOffering.pricingUnit} + 18% GST Invoiced
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button asChild variant="outline" size="sm" className="min-h-[44px]">
                      <Link
                        to="/services/$slug"
                        params={{ slug: activeOffering.serviceSlug }}
                        onClick={() => track("offering_view_architecture", { slug: activeOffering.serviceSlug })}
                      >
                        <span>View Portfolio Specs</span>
                        <ArrowRight className="ml-1.5 size-3.5" />
                      </Link>
                    </Button>

                    <BookLink
                      service={activeOffering.serviceSlug}
                      variant="warm"
                      size="sm"
                      className="min-h-[44px]"
                    >
                      <span>Book Assessment</span>
                      <ArrowUpRight className="ml-1.5 size-4" />
                    </BookLink>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Bottom Explorer Grid (Showing remaining disciplines at a glance) */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ENTERPRISE_OFFERINGS.map((offering, idx) => (
            <button
              key={offering.id}
              type="button"
              onClick={() => {
                setActiveIdx(idx);
                const el = document.getElementById("offerings");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className={cn(
                "group flex flex-col justify-between rounded-2xl border p-4 text-left transition-all",
                activeIdx === idx
                  ? "border-primary bg-primary-soft/30 shadow-2xs ring-2 ring-primary/20"
                  : "border-border bg-card hover:border-primary/40 hover:bg-secondary/40"
              )}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-muted-foreground">
                    PRACTICE {offering.code}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-terracotta">
                    {offering.badgePill}
                  </span>
                </div>
                <h4 className="mt-2 text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  {offering.title}
                </h4>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                  {offering.careSolution}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-border flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">
                  {formatINR(offering.startingPrice)}/{offering.pricingUnit}
                </span>
                <span className="text-primary font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Inspect →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
