import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Heart,
  Activity,
  Baby,
  Stethoscope,
  Plane,
  Building2,
  Check,
  ShieldCheck,
  Clock,
  ArrowRight,
  MessageCircle,
  Sparkles,
  PhoneCall,
  Info,
  CalendarCheck,
  UserCheck,
  FileCheck,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookLink } from "./Layout";
import { formatINR, buildWhatsAppUrl, SITE } from "@/data/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero4 from "@/assets/hero-4.jpg";
import nursingCare from "@/assets/nursing-care.jpg";
import hero5 from "@/assets/hero-5.jpg";

export interface JourneyStep {
  step: string;
  title: string;
  description: string;
}

export interface LifeEventJourney {
  id: string;
  tag: string;
  icon: React.ElementType;
  tabLabel: string;
  headline: string;
  conciseSummary: string;
  familyChallenge: string;
  apnaCareSolution: string;
  emotionalOutcome: string;
  deliverables: Array<{ label: string; detail: string }>;
  providerDistinction: {
    role: string;
    description: string;
    boundary: string;
  };
  journeySteps: JourneyStep[];
  startingPrice: number;
  pricingUnit: string;
  serviceSlug: string;
  primaryCtaText: string;
  image: string;
  alt: string;
  badge: string;
}

export const LIFE_EVENT_JOURNEYS: LifeEventJourney[] = [
  {
    id: "journey-aging-parent",
    tag: "JOURNEY A: FAMILY ELDERCARE",
    icon: Heart,
    tabLabel: "Aging Parent Support",
    headline: "Make sure they have gentle, dignified daily support.",
    conciseSummary: "When aging parents begin to slow down or live alone, balancing career responsibilities with constant worry takes an emotional toll.",
    familyChallenge: "Worrying about unmonitored slip-and-falls, skipped medication doses, and emotional isolation while managing work.",
    apnaCareSolution: "Police-cleared women attendants delivering dignified personal care, routine medication reminders, and warm daily companionship.",
    emotionalOutcome: "Reassurance knowing your parents are treated with gentleness and respect, backed by daily WhatsApp logs.",
    deliverables: [
      { label: "Bathing & Personal Hygiene", detail: "Gentle morning routine & dignified bathroom transfer safety" },
      { label: "Prescription Reminders", detail: "Timely oral medicine schedules logged in daily digital charts" },
      { label: "Mobility & Fall Prevention", detail: "Steady walking assistance and room-to-room accompaniment" },
      { label: "Daily WhatsApp Wellness Logs", detail: "Family receives scheduled updates on meal intake and comfort" },
    ],
    providerDistinction: {
      role: "General Duty Assistant (Attendant)",
      description: "Trained in geriatric ergonomics, mobility transfers, and BLS first-aid.",
      boundary: "Attendants provide non-clinical support. For IV drips or clinical wound care, registered nurses are assigned.",
    },
    journeySteps: [
      { step: "01", title: "Share Routine & Language", description: "Tell us wake-up timings, mobility level, and Tamil/Telugu/Kannada preference." },
      { step: "02", title: "Preview Verified Profile", description: "Review Aadhaar authentication, police clearance badge, and past experience." },
      { step: "03", title: "Care Begins at Home", description: "Attendant arrives on schedule with gentle introduction and dignified support." },
      { step: "04", title: "Daily WhatsApp Updates", description: "Receive daily wellness summaries backed by our 90-min backup SLA." },
    ],
    startingPrice: 1299,
    pricingUnit: "day",
    serviceSlug: "elderly-care",
    primaryCtaText: "Find Care for My Parent",
    image: hero1,
    alt: "Caregiver gently holding hands with an elderly woman at home",
    badge: "Most Requested Family Care",
  },
  {
    id: "journey-hospital-vigil",
    tag: "JOURNEY B: HOSPITALIZATION",
    icon: Activity,
    tabLabel: "Hospital Ward Bedside",
    headline: "When someone you love is in hospital, you have enough to think about.",
    conciseSummary: "Hospital corridors and overnight vigils leave families exhausted. A dedicated attendant stays vigilantly bedside so you can rest.",
    familyChallenge: "Ward nurses juggle 10–15 patients; family members burn out taking turns overnight on hospital waiting room chairs.",
    apnaCareSolution: "Attentive bedside attendants providing continuous 24-hr vigils, bedpan assistance, repositioning, and immediate call-bell alerts.",
    emotionalOutcome: "Peace of mind knowing a dedicated, alert caregiver is bedside during your patient's most vulnerable recovery hours.",
    deliverables: [
      { label: "Continuous Bedside Vigil", detail: "Alert bedside presence and immediate duty nurse coordination" },
      { label: "Pressure Sore Prevention", detail: "Safe patient turnings every 2 hours to protect skin integrity" },
      { label: "Bedside Sponging & Hygiene", detail: "Gentle oral cleaning, bedpan handling, and fresh linen assist" },
      { label: "Doctor Round Coordination", detail: "Summarizes physician instructions for family members" },
    ],
    providerDistinction: {
      role: "Hospital Bedside Attendant",
      description: "Experienced in hospital protocols, ward hygiene, and gentle patient ergonomics.",
      boundary: "Assists with comfort and vigil. Does not administer clinical IVs or adjust hospital equipment.",
    },
    journeySteps: [
      { step: "01", title: "Hospital & Ward Details", description: "Share hospital name, room/ward number, and patient recovery requirements." },
      { step: "02", title: "Emergency Cluster Match", description: "Attendant dispatched from nearest hospital cluster with verified ID badge." },
      { step: "03", title: "Nurse Shift Handoff", description: "Attendant coordinates with ward duty staff for feeding and bedpan cycles." },
      { step: "04", title: "Family Rest Guarantee", description: "Overnight vigil coverage so family members can sleep and recharge." },
    ],
    startingPrice: 1399,
    pricingUnit: "day",
    serviceSlug: "hospital-attendants",
    primaryCtaText: "Get Help for a Hospital Stay",
    image: hero2,
    alt: "Patient receiving dedicated bedside support in hospital room",
    badge: "24/7 Ward Clusters Active",
  },
  {
    id: "journey-newborn-postnatal",
    tag: "JOURNEY C: FOURTH TRIMESTER",
    icon: Baby,
    tabLabel: "Postnatal & Newborn",
    headline: "Preparing for a baby also means preparing restorative support for mother.",
    conciseSummary: "Delivery recovery combined with infant night wakefulness causes extreme physical exhaustion. Gentle care restores restorative maternal rest.",
    familyChallenge: "Maternal sleep deprivation, latching fatigue, and anxiety surrounding delicate newborn oil baths and burping.",
    apnaCareSolution: "Traditional Japa-trained caregivers handling newborn massage, warm water baths, and dedicated night wakefulness coverage.",
    emotionalOutcome: "Deep, uninterrupted maternal sleep and joyful, calm confidence in the early weeks of parenthood.",
    deliverables: [
      { label: "Traditional Newborn Oil Bath", detail: "Gentle pediatric oil massage, warm bath, and burping technique" },
      { label: "Mother Post-Delivery Convalescence", detail: "Traditional oil massage and hot water bath accompaniment" },
      { label: "Restorative Night Sleep Coverage", detail: "Caregiver soothes infant wakefulness so mother sleeps 6–8 hours" },
      { label: "Hygiene & Sterilization", detail: "Sterilization of feeding bottles and delicate infant clothing" },
    ],
    providerDistinction: {
      role: "Postnatal Caregiver (Japa Specialist)",
      description: "Experienced in maternal recovery routines, traditional infant massage, and burping.",
      boundary: "Provides traditional non-clinical maternal & infant comfort. Does not prescribe neonatal medications.",
    },
    journeySteps: [
      { step: "01", title: "Delivery Date & Planning", description: "Share expected delivery date, hospital, and preferred shift arrangement." },
      { step: "02", title: "Japa Specialist Preview", description: "Review caregiver profile, traditional massage skills, and police clearance." },
      { step: "03", title: "Care Begins at Home", description: "Gentle oil massage, infant soothing, and mother's recovery routine begins." },
      { step: "04", title: "Uninterrupted Maternal Rest", description: "Mother recovers physically while caregiver handles soothing and swaddling." },
    ],
    startingPrice: 1999,
    pricingUnit: "day",
    serviceSlug: "post-natal-care",
    primaryCtaText: "Explore Postnatal Support",
    image: hero4,
    alt: "Caregiver tenderly tending to a newborn baby while supporting the mother",
    badge: "Restores 6–8h Maternal Sleep",
  },
  {
    id: "journey-post-surgery-recovery",
    tag: "JOURNEY D: SURGICAL CONVALESCENCE",
    icon: Stethoscope,
    tabLabel: "Home Nursing & Recovery",
    headline: "Recovery is easier to plan when the right clinical support is in place.",
    conciseSummary: "Managing surgical dressings, IV lines, and catheters at home can cause severe anxiety without hospital-grade sterile nursing support.",
    familyChallenge: "Painful, exhausting clinic trips for basic wound cleaning increase infection risks and patient distress.",
    apnaCareSolution: "Registered GNM/B.Sc female nurses delivering sterile wound dressings, IV infusions, and vital signs monitoring at home.",
    emotionalOutcome: "Confidence that post-op healing is progressing safely under sterile medical protocols in the comfort of home.",
    deliverables: [
      { label: "Sterile Surgical Wound Dressings", detail: "Hospital-grade aseptic dressing changes and suture inspection" },
      { label: "Prescription IV / IM Injections", detail: "Physician-ordered intravenous infusions and medication administration" },
      { label: "Catheter & Enteral Feed Care", detail: "Foley catheter maintenance, Ryle's tube feeds, and stoma support" },
      { label: "Digital Vitals Monitoring", detail: "BP, pulse, SpO2, blood glucose, and temperature logging" },
    ],
    providerDistinction: {
      role: "Registered Nurse (GNM / B.Sc)",
      description: "State Nursing Council registered, clinically trained in aseptic wound care.",
      boundary: "Performs clinical procedures strictly as per written physician orders and discharge summaries.",
    },
    journeySteps: [
      { step: "01", title: "Discharge Summary Review", description: "Share doctor's prescription, wound type, and required clinical shift hours." },
      { step: "02", title: "Licensed Nurse Matching", description: "State Nursing Council registered GNM/B.Sc nurse assigned with clinical kit." },
      { step: "03", title: "Aseptic Clinical Care", description: "Sterile dressing changes, vitals tracking, and medication administration." },
      { step: "04", title: "Physician Progress Chart", description: "Digital vitals and wound healing logs shared with treating surgeon." },
    ],
    startingPrice: 1999,
    pricingUnit: "day",
    serviceSlug: "nursing-services",
    primaryCtaText: "Plan Care for Recovery",
    image: nursingCare,
    alt: "Registered nurse administering sterile wound care and checking patient vitals",
    badge: "GNM / B.Sc Registered Nurses",
  },
  {
    id: "journey-accompanied-travel",
    tag: "JOURNEY E: ACCOMPANIED TRANSIT",
    icon: Plane,
    tabLabel: "Travel & Mobility",
    headline: "Getting where you need to go should feel safe, dignified, and manageable.",
    conciseSummary: "Navigating busy airports, railway boarding platforms, or solo outstation journeys is daunting for seniors and recovering patients.",
    familyChallenge: "Heavy luggage, multi-terminal airport corridors, and wheelchair transfers are overwhelming without a trusted companion.",
    apnaCareSolution: "Vetted women companions providing curbside airport/station meet-and-greet, luggage trolley handling, and live WhatsApp tracking.",
    emotionalOutcome: "Doorstep-to-doorstep peace of mind knowing your loved one has safe assisted travel throughout transit.",
    deliverables: [
      { label: "Airport Curbside Meet & Greet", detail: "Terminal arrival meet, luggage trolley assist, and airline check-in assisted travel" },
      { label: "Wheelchair Transit Support", detail: "Dedicated assisted travel through security, boarding gate, and cabin entry" },
      { label: "Railway Platform & Coach Assisted Travel", detail: "Station platform assistance, porter coordination, and coach boarding" },
      { label: "Live GPS WhatsApp Updates", detail: "Continuous journey checkpoints sent to family until destination arrival" },
    ],
    providerDistinction: {
      role: "Trained Travel Companion / Station Assisted Travel",
      description: "Vetted women companions trained in passenger terminal navigation and assisted travel.",
      boundary: "Provides passenger mobility and transit accompaniment. Does not drive commercial transport vehicles.",
    },
    journeySteps: [
      { step: "01", title: "Flight / Train Itinerary", description: "Share flight/train number, departure terminal, and wheelchair requirements." },
      { step: "02", title: "Vetted Companion Assigned", description: "Assisted travel companion assigned with verified ID badge and WhatsApp contact details." },
      { step: "03", title: "Curbside Meet & Transit", description: "Meet at terminal gate, baggage assist, security navigation, and boarding." },
      { step: "04", title: "Safe Arrival Confirmation", description: "Real-time updates sent to family until arrival at final doorstep." },
    ],
    startingPrice: 999,
    pricingUnit: "trip",
    serviceSlug: "travel-assistance",
    primaryCtaText: "Arrange Travel Companion",
    image: hero5,
    alt: "Vetted travel companion assisting a passenger with luggage and transit",
    badge: "Live GPS Family Check-ins",
  },
  {
    id: "journey-institutional-care",
    tag: "JOURNEY F: INSTITUTIONAL & B2B",
    icon: Building2,
    tabLabel: "Hospital & Corporate",
    headline: "Care responsibilities should not leave employees or healthcare desks managing alone.",
    conciseSummary: "Hospitals need reliable bedside staffing, while employers need caregiving benefits to prevent working caregivers from burning out.",
    familyChallenge: "Local agencies provide unverified attendants with zero replacement guarantees, creating liability and operational friction.",
    apnaCareSolution: "Pre-vetted attendant clusters deployed with centralized account management, 100% GST invoicing, and 90-min emergency backup SLAs.",
    emotionalOutcome: "Operational dependability, elevated patient experience, and genuine relief for dual-career corporate caregivers.",
    deliverables: [
      { label: "Hospital Bedside Staffing", detail: "Verified attendants for discharge lounges, post-op wards, and elderly vigils" },
      { label: "Corporate Caregiving Benefits", detail: "Subsidized eldercare and emergency attendant credits for employees" },
      { label: "Enterprise SLA & 90-Min Backup", detail: "Guaranteed replacement dispatch in Bengaluru, Chennai, Hyderabad & Coimbatore" },
      { label: "Centralized GST Invoicing", detail: "100% statutory tax invoice, compliance records, and account lead" },
    ],
    providerDistinction: {
      role: "Institutional Care Coordinator",
      description: "Dedicated account lead coordinating verified attendant clusters and enterprise billing.",
      boundary: "Partnership operations and enterprise SLAs. Seamless integration with hospital discharge workflows.",
    },
    journeySteps: [
      { step: "01", title: "Operational Needs Audit", description: "Review hospital ward attendant deficit or corporate employee care demand." },
      { step: "02", title: "Customized SLA Agreement", description: "Define cluster coverage, backup protocols, and subsidized corporate credits." },
      { step: "03", title: "Cluster Deployment", description: "Vetted attendant squad stationed with centralized supervisor coordination." },
      { step: "04", title: "Monthly Transparent Review", description: "Consolidated GST billing, patient satisfaction logs, and utilization reports." },
    ],
    startingPrice: 0,
    pricingUnit: "custom",
    serviceSlug: "ecosystem-partners",
    primaryCtaText: "Enquire About a Care Partnership",
    image: hero2,
    alt: "Healthcare professionals and coordinators collaborating in hospital facility",
    badge: "Enterprise SLAs & Compliance",
  },
];

export function LifeEventsJourneySection() {
  const [activeJourneyId, setActiveJourneyId] = useState<string>(LIFE_EVENT_JOURNEYS[0].id);
  const [activeTab, setActiveTab] = useState<"deliverables" | "journey">("deliverables");

  const activeJourney =
    LIFE_EVENT_JOURNEYS.find((j) => j.id === activeJourneyId) ?? LIFE_EVENT_JOURNEYS[0];

  const waUrl = buildWhatsAppUrl(
    `Hello ApnaCare! I would like to discuss support for: "${activeJourney.tabLabel}". Our family needs guidance.`
  );

  return (
    <section
      id="life-events"
      className="scroll-mt-20 py-16 md:py-24 bg-gradient-to-b from-background via-secondary/20 to-background border-b border-border/60"
    >
      <div className="container-page">
        {/* Section Header with concise emotional framing */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5 text-primary" />
            <span>Interactive Care Discovery</span>
          </div>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Start with What Is Happening in Your Life Right Now
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Finding dependable care isn't about browsing cold service catalogues. Select your family's situation below to see the exact relief, role boundaries, and predictable onboarding path.
          </p>
        </div>

        {/* Life Event Selector Pills (Mobile Horizontal Scroll / Desktop 6-Grid) */}
        <div
          role="tablist"
          aria-label="Care Life Situations"
          className="mt-10 flex gap-2.5 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-3 lg:grid-cols-6"
        >
          {LIFE_EVENT_JOURNEYS.map((journey) => {
            const isSelected = journey.id === activeJourneyId;
            const Icon = journey.icon;
            return (
              <button
                key={journey.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setActiveJourneyId(journey.id);
                  track("life_event_journey_select", { journeyId: journey.id });
                }}
                className={cn(
                  "flex items-center gap-2.5 rounded-2xl px-4 py-3 text-left transition-all shrink-0 min-h-[52px] cursor-pointer touch-target",
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-lift font-semibold ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : "bg-card border border-border text-foreground hover:border-primary/40 hover:bg-secondary/60 font-medium"
                )}
              >
                <Icon className={cn("size-4.5 shrink-0 transition-transform", isSelected ? "text-primary-foreground scale-110" : "text-primary")} />
                <span className="text-xs sm:text-sm whitespace-nowrap sm:whitespace-normal leading-tight">
                  {journey.tabLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Visual Storytelling Experience Card */}
        <div className="mt-8 rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-soft transition-all duration-300">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* Left 5 Cols: Visual Representation & Live Verification Badges */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted border border-border shadow-xs group">
                <img
                  key={activeJourney.image}
                  src={activeJourney.image}
                  alt={activeJourney.alt}
                  width={600}
                  height={450}
                  loading="lazy"
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 animate-fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Floating Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1 text-xs font-bold text-foreground backdrop-blur shadow-xs">
                    <ShieldCheck className="size-3.5 text-primary" />
                    {activeJourney.badge}
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-white/80">
                    South India Command Clusters
                  </p>
                  <p className="text-xs font-semibold leading-snug mt-0.5">
                    Bengaluru · Chennai · Hyderabad · Coimbatore
                  </p>
                </div>
              </div>

              {/* Problem vs Solution Split Chips (Compact Visual Storytelling) */}
              <div className="space-y-2.5">
                <div className="rounded-xl bg-destructive/5 p-3.5 border border-destructive/20 text-xs">
                  <span className="font-bold text-destructive uppercase tracking-wider block text-[10px] mb-1">
                    The Family Challenge:
                  </span>
                  <p className="text-foreground/90 font-medium leading-relaxed">
                    {activeJourney.familyChallenge}
                  </p>
                </div>

                <div className="rounded-xl bg-primary-soft/50 p-3.5 border border-primary/20 text-xs">
                  <span className="font-bold text-primary uppercase tracking-wider block text-[10px] mb-1">
                    The ApnaCare Relief:
                  </span>
                  <p className="text-foreground font-semibold leading-relaxed">
                    {activeJourney.apnaCareSolution}
                  </p>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Emotional Headline, Tabbed Deliverables & Dynamic 4-Step Journey */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Tag & Rate Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                    {activeJourney.tag}
                  </span>
                  {activeJourney.startingPrice > 0 ? (
                    <div className="inline-flex items-baseline gap-1 text-xs">
                      <span className="text-muted-foreground">Starting at</span>
                      <span className="font-display text-xl font-bold text-foreground">
                        {formatINR(activeJourney.startingPrice)}
                      </span>
                      <span className="text-muted-foreground">/{activeJourney.pricingUnit} + 18% GST</span>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-primary">Custom Enterprise SLA</span>
                  )}
                </div>

                {/* Emotional Display Headline */}
                <h3 className="mt-4 font-display text-2xl sm:text-3xl font-semibold text-foreground leading-tight">
                  “{activeJourney.headline}”
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {activeJourney.conciseSummary}
                </p>

                {/* Tab Switcher: Care Deliverables vs 4-Step Visual Journey */}
                <div className="mt-6 flex items-center gap-2 border-b border-border/80 pb-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("deliverables")}
                    className={cn(
                      "px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer",
                      activeTab === "deliverables"
                        ? "bg-primary text-primary-foreground shadow-2xs"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    1. Daily Care Deliverables
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("journey")}
                    className={cn(
                      "px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5",
                      activeTab === "journey"
                        ? "bg-primary text-primary-foreground shadow-2xs"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span>2. Visual 4-Step Journey</span>
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  </button>
                </div>

                {/* Content View: Tab 1 (Care Deliverables) */}
                {activeTab === "deliverables" && (
                  <div className="mt-4 space-y-4 animate-fade-in">
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {activeJourney.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-border/70 bg-secondary/30 p-3 flex items-start gap-2.5"
                        >
                          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 mt-0.5">
                            <Check className="size-3 font-bold" />
                          </span>
                          <div>
                            <p className="text-xs font-bold text-foreground leading-tight">{item.label}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{item.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Role Boundary Card */}
                    <div className="rounded-xl bg-secondary/50 p-3.5 border border-border text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">
                          Assigned: <strong className="text-primary">{activeJourney.providerDistinction.role}</strong>
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {activeJourney.providerDistinction.description}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[11px] text-muted-foreground border-t border-border/60 pt-1.5">
                        <Info className="size-3 text-primary inline mr-1" />
                        <strong>Safety Boundary:</strong> {activeJourney.providerDistinction.boundary}
                      </p>
                    </div>
                  </div>
                )}

                {/* Content View: Tab 2 (Dynamic Visual 4-Step Care Journey) */}
                {activeTab === "journey" && (
                  <div className="mt-4 animate-fade-in">
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {activeJourney.journeySteps.map((step) => (
                        <div
                          key={step.step}
                          className="rounded-xl border border-primary/20 bg-primary-soft/30 p-3.5 flex flex-col justify-between"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs font-bold text-primary bg-primary-soft px-2 py-0.5 rounded-md">
                              Step {step.step}
                            </span>
                            <span className="text-xs font-bold text-foreground truncate">{step.title}</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-[11px] text-muted-foreground flex items-center gap-1.5">
                      <ShieldCheck className="size-3.5 text-primary shrink-0" />
                      Zero automated billing before phone consultation and verified caregiver confirmation.
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Contextual CTA Strip */}
              <div className="mt-8 pt-5 border-t border-border flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="size-3.5 text-primary" />
                  <span>90-Min Emergency Backup SLA in Active Metros</span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {activeJourney.serviceSlug === "ecosystem-partners" ? (
                    <Button asChild variant="warm" size="default" className="min-h-[44px] font-semibold">
                      <Link to="/ecosystem-partners">
                        <span>{activeJourney.primaryCtaText}</span>
                        <ArrowRight className="ml-1.5 size-4" />
                      </Link>
                    </Button>
                  ) : (
                    <BookLink
                      service={activeJourney.serviceSlug}
                      variant="warm"
                      size="default"
                      className="min-h-[44px] font-semibold shadow-soft hover:shadow-lift"
                    >
                      <span>{activeJourney.primaryCtaText}</span>
                      <ArrowRight className="ml-1.5 size-4" />
                    </BookLink>
                  )}

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("life_event_whatsapp_click", { journeyId: activeJourney.id })}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#25D366] bg-[#25D366]/10 px-4 py-2.5 text-xs font-semibold text-[#128C7E] hover:bg-[#25D366]/20 transition-colors min-h-[44px]"
                  >
                    <MessageCircle className="size-4 text-[#25D366]" />
                    <span>Ask on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
