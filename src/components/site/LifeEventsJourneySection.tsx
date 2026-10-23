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

export interface LifeEventJourney {
  id: string;
  tag: string;
  icon: React.ElementType;
  tabLabel: string;
  headline: string;
  subheadline: string;
  triggerEvent: string;
  underlyingFriction: string;
  emotionalBenefit: string;
  practicalRelief: string[];
  providerDistinction: {
    role: string;
    description: string;
    boundary: string;
  };
  startingPrice: number;
  pricingUnit: string;
  serviceSlug: string;
  primaryCtaText: string;
  image: string;
  alt: string;
}

export const LIFE_EVENT_JOURNEYS: LifeEventJourney[] = [
  {
    id: "journey-aging-parent",
    tag: "JOURNEY A: FAMILY ELDERCARE",
    icon: Heart,
    tabLabel: "Aging Parent Support",
    headline: "Your parents have always been there for you. Now, make sure they have the gentle support they need.",
    subheadline:
      "When aging parents begin to slow down or live alone, balancing work deadlines with constant anxiety about their safety and loneliness takes an emotional toll.",
    triggerEvent: "A parent begins struggling with daily bathing, taking medications on time, or experiences a close fall at home.",
    underlyingFriction:
      "You cannot be in two places at once. Worrying about unmonitored falls, skipped blood pressure pills, and emotional isolation drains family peace of mind.",
    emotionalBenefit: "Deep reassurance knowing your parents are treated with gentleness, dignity, and warm daily companionship.",
    practicalRelief: [
      "Assistance with morning bathing, grooming, and dignified personal hygiene",
      "Timely medication administration reminders strictly following doctor prescriptions",
      "Gentle walking and mobility support to prevent dangerous bathroom slips and falls",
      "Daily digital wellness logs and scheduled WhatsApp updates sent to family",
    ],
    providerDistinction: {
      role: "General Duty Assistant (Attendant)",
      description: "Trained in geriatric ergonomics, empathy, gentle mobility, and BLS first-aid.",
      boundary: "Attendants provide non-clinical companionship. For IV infusions or wound dressings, registered nurses are assigned.",
    },
    startingPrice: 1299,
    pricingUnit: "day",
    serviceSlug: "elderly-care",
    primaryCtaText: "Find Care for My Parent",
    image: hero1,
    alt: "Caregiver gently holding hands with an elderly woman at home",
  },
  {
    id: "journey-hospital-vigil",
    tag: "JOURNEY B: HOSPITALIZATION",
    icon: Activity,
    tabLabel: "Hospital Ward Bedside",
    headline: "When someone you love is in hospital, you have enough to think about.",
    subheadline:
      "Hospital corridors and overnight vigils leave families physically exhausted. An attentive attendant stays vigilantly bedside so you can recharge without worry.",
    triggerEvent: "A loved one is admitted to a hospital ward requiring constant 24-hour monitoring, hydration, and bedpan assistance.",
    underlyingFriction:
      "Hospital nurses juggle 10–15 ward patients at once. Family members burn out taking turns on plastic waiting room chairs overnight.",
    emotionalBenefit: "Relief and confidence knowing a dedicated, alert caregiver is beside your patient during their most vulnerable hours.",
    practicalRelief: [
      "Continuous bedside observation and immediate nursing call-bell assistance",
      "Gentle patient repositioning every 2 hours to avoid pressure bed sores",
      "Assistance with bedside sponging, oral hygiene, and feeding accompaniment",
      "Coordination with hospital ward duty staff during doctor rounds",
    ],
    providerDistinction: {
      role: "Hospital Bedside Attendant",
      description: "Experienced in hospital protocols, sterile room hygiene, and patient handling.",
      boundary: "Assists with comfort and vigil. Does not administer clinical IVs or adjust hospital monitor calibrations.",
    },
    startingPrice: 1399,
    pricingUnit: "day",
    serviceSlug: "hospital-attendants",
    primaryCtaText: "Get Help for a Hospital Stay",
    image: hero2,
    alt: "Patient receiving dedicated bedside support in hospital room",
  },
  {
    id: "journey-newborn-postnatal",
    tag: "JOURNEY C: FOURTH TRIMESTER",
    icon: Baby,
    tabLabel: "Postnatal & Newborn",
    headline: "Preparing for a new baby also means preparing gentle, restorative support for the mother.",
    subheadline:
      "Physical convalescence after delivery combined with infant night wakefulness can leave new mothers physically exhausted and emotionally overwhelmed.",
    triggerEvent: "A newborn arrives home, bringing joy along with latching fatigue, sleepless nights, and healing recovery.",
    underlyingFriction:
      "Without experienced fourth-trimester care, maternal sleep deprivation peaks, complicating postpartum recovery and emotional wellness.",
    emotionalBenefit: "Restful, restorative sleep for the mother and gentle, knowledgeable handling for the newborn.",
    practicalRelief: [
      "Traditional soothing newborn oil massage and warm bath accompaniment",
      "Mother's post-delivery traditional oil massage and hot water bath support",
      "Night wakefulness soothing and burping so mother gets 6–8 hours of restorative sleep",
      "Sterilization of infant feeding bottles and delicate clothing hygiene",
    ],
    providerDistinction: {
      role: "Trained Postnatal Caregiver (Japa Specialist)",
      description: "Knowledgeable in maternal recovery routines, infant burping, and soothing touch.",
      boundary: "Provides traditional non-clinical maternal & infant comfort. Does not prescribe pediatric medications.",
    },
    startingPrice: 1999,
    pricingUnit: "day",
    serviceSlug: "post-natal-care",
    primaryCtaText: "Explore Postnatal Support",
    image: hero4,
    alt: "Caregiver tenderly tending to a newborn baby while supporting the mother",
  },
  {
    id: "journey-post-surgery-recovery",
    tag: "JOURNEY D: SURGICAL CONVALESCENCE",
    icon: Stethoscope,
    tabLabel: "Home Nursing & Recovery",
    headline: "Recovery is easier to plan when the right clinical support is in place.",
    subheadline:
      "Discharging from the hospital is a milestone, but managing surgical dressings, IV lines, and catheters at home can cause severe anxiety without clinical support.",
    triggerEvent: "Hospital discharge following orthopedic joint replacement, abdominal surgery, or cardiac intervention.",
    underlyingFriction:
      "Frequent painful travel to outpatient clinics for basic wound cleaning increases hospital infection risks and patient discomfort.",
    emotionalBenefit: "Confidence that healing is progressing safely under sterile medical protocols in the familiar warmth of home.",
    practicalRelief: [
      "Hospital-grade sterile surgical wound dressings and suture line inspection",
      "Physician-prescribed IV infusions, subcutaneous, and intramuscular injections",
      "Urinary catheter changes, stoma care, and Ryle's tube enteral feeds",
      "Digital tracking of vital signs (BP, SpO2, blood glucose, temperature)",
    ],
    providerDistinction: {
      role: "Registered Nurse (GNM / B.Sc)",
      description: "State Nursing Council registered, clinically trained in aseptic wound care.",
      boundary: "Performs clinical procedures strictly as per written physician orders and discharge summaries.",
    },
    startingPrice: 1999,
    pricingUnit: "day",
    serviceSlug: "nursing-services",
    primaryCtaText: "Plan Care for Recovery",
    image: nursingCare,
    alt: "Registered nurse administering sterile wound care and checking patient vitals",
  },
  {
    id: "journey-accompanied-travel",
    tag: "JOURNEY E: ACCOMPANIED TRANSIT",
    icon: Plane,
    tabLabel: "Travel & Mobility",
    headline: "Getting where you need to go should feel safe, dignified, and manageable.",
    subheadline:
      "Navigating busy airports, railway boarding platforms, or solo outstation travel can feel overwhelming for elderly parents or recovering individuals.",
    triggerEvent: "An aging family member or patient needs to travel for a family wedding, medical consultation, or return home.",
    underlyingFriction:
      "Heavy luggage, confusing multi-terminal airport corridors, and wheelchair transfers are difficult to manage without a dependable companion.",
    emotionalBenefit: "Peace of mind for families knowing their loved one is safely escorted from departure curb to arrival doorstep.",
    practicalRelief: [
      "Curbside airport/railway meet-and-greet with luggage trolley assistance",
      "Dedicated wheelchair pushing and airline/station check-in escort",
      "Assistance with coach boarding, seat locating, hydration, and meal accompaniment",
      "Continuous live GPS check-ins and WhatsApp updates to family members throughout the journey",
    ],
    providerDistinction: {
      role: "Trained Travel Companion / Station Escort",
      description: "Vetted women escorts trained in passenger terminal navigation and transit support.",
      boundary: "Provides transit and mobility assistance. Does not drive commercial transport vehicles.",
    },
    startingPrice: 999,
    pricingUnit: "trip",
    serviceSlug: "travel-assistance",
    primaryCtaText: "Arrange Travel Companion",
    image: hero5,
    alt: "Vetted travel companion assisting a passenger with luggage and transit",
  },
  {
    id: "journey-institutional-care",
    tag: "JOURNEY F: INSTITUTIONAL & B2B",
    icon: Building2,
    tabLabel: "Hospital & Corporate",
    headline: "Care responsibilities should not leave employees or healthcare desks managing alone.",
    subheadline:
      "Hospitals need reliable bedside staffing to elevate patient experience, while progressive employers need caregiving benefits to prevent working caregivers from burning out.",
    triggerEvent: "Hospitals facing bedside attendant shortages, or corporates observing high absenteeism among dual-career caregivers.",
    underlyingFriction:
      "Unvetted local agency brokers provide unpredictable attendants with zero replacement guarantees, exposing organizations to liability.",
    emotionalBenefit: "Institutional reliability, professional SLA compliance, and genuine support for employees and patients alike.",
    practicalRelief: [
      "Pre-vetted bedside attendant deployment for hospital discharge lounges and ward floors",
      "Subsidized emergency caregiving benefit credits for corporate employee wellness",
      "Centralized invoicing, 100% statutory GST compliance, and enterprise SLAs",
      "Dedicated institutional account manager and guaranteed backup coverage",
    ],
    providerDistinction: {
      role: "Institutional Care Coordinator",
      description: "Dedicated account lead coordinating verified attendant clusters and enterprise billing.",
      boundary: "Partnership operations and enterprise SLAs. Seamless integration with hospital discharge workflows.",
    },
    startingPrice: 0,
    pricingUnit: "custom",
    serviceSlug: "ecosystem-partners",
    primaryCtaText: "Enquire About a Care Partnership",
    image: hero2,
    alt: "Healthcare professionals and coordinators collaborating in hospital facility",
  },
];

export function LifeEventsJourneySection() {
  const [activeJourneyId, setActiveJourneyId] = useState<string>(LIFE_EVENT_JOURNEYS[0].id);

  const activeJourney =
    LIFE_EVENT_JOURNEYS.find((j) => j.id === activeJourneyId) ?? LIFE_EVENT_JOURNEYS[0];

  const waUrl = buildWhatsAppUrl(
    `Hello ApnaCare! I would like to discuss support for: "${activeJourney.tabLabel}". Our family needs guidance.`
  );

  return (
    <section id="life-events" className="scroll-mt-20 py-16 md:py-24 bg-gradient-to-b from-background via-secondary/25 to-background border-b border-border/60">
      <div className="container-page">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5 text-primary" />
            <span>Event-Driven Care Architecture</span>
          </div>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Start with What Is Happening in Your Life Right Now
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Finding dependable care isn't about browsing cold service catalogues. It starts with recognizing the exact transition your family is navigating. Select your situation below.
          </p>
        </div>

        {/* Life Event Selector Pills (Mobile Scrollable / Desktop Grid) */}
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
                  "flex items-center gap-2.5 rounded-2xl px-4 py-3 text-left transition-all shrink-0 min-h-[50px] cursor-pointer",
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-lift font-semibold ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : "bg-card border border-border text-foreground hover:border-primary/40 hover:bg-secondary/60 font-medium"
                )}
              >
                <Icon className={cn("size-4.5 shrink-0", isSelected ? "text-primary-foreground" : "text-primary")} />
                <span className="text-xs sm:text-sm whitespace-nowrap sm:whitespace-normal leading-tight">
                  {journey.tabLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Event-Driven Resolution Dashboard */}
        <div className="mt-8 rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-soft animate-fade-in">
          {/* Top Tag & Life Phase Headline */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-6">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                {activeJourney.tag}
              </span>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground leading-tight">
                “{activeJourney.headline}”
              </h3>
              <p className="mt-2 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                {activeJourney.subheadline}
              </p>
            </div>
            {activeJourney.startingPrice > 0 ? (
              <div className="rounded-2xl bg-secondary/60 p-4 border border-border/60 text-right">
                <span className="text-[11px] font-semibold text-muted-foreground block uppercase tracking-wider">
                  Transparent Rate
                </span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  {formatINR(activeJourney.startingPrice)}
                </span>
                <span className="text-xs text-muted-foreground">/{activeJourney.pricingUnit} + 18% GST</span>
              </div>
            ) : (
              <div className="rounded-2xl bg-secondary/60 p-4 border border-border/60 text-right">
                <span className="text-[11px] font-semibold text-primary block uppercase tracking-wider">
                  Enterprise Partnership
                </span>
                <span className="font-display text-xl font-bold text-foreground">Custom SLA Quotes</span>
              </div>
            )}
          </div>

          {/* 3-Column Diagnostic Matrix: Trigger -> Underlying Friction -> Emotional Relief */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* 1. What Happened */}
            <div className="rounded-2xl bg-secondary/40 p-5 border border-border/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  <span className="grid size-5 place-items-center rounded-full bg-primary/10 text-primary font-mono text-[10px]">
                    1
                  </span>
                  The Triggering Life Event
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                  {activeJourney.triggerEvent}
                </p>
              </div>
              <p className="mt-4 text-[11px] text-muted-foreground italic border-t border-border/50 pt-2">
                Life changes without warning; quick support matters.
              </p>
            </div>

            {/* 2. What Is Difficult */}
            <div className="rounded-2xl bg-destructive/5 p-5 border border-destructive/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-destructive mb-2">
                  <span className="grid size-5 place-items-center rounded-full bg-destructive/15 text-destructive font-mono text-[10px]">
                    2
                  </span>
                  The Underlying Friction
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                  {activeJourney.underlyingFriction}
                </p>
              </div>
              <p className="mt-4 text-[11px] text-muted-foreground italic border-t border-destructive/10 pt-2">
                Managing everything alone leads to family caregiver burnout.
              </p>
            </div>

            {/* 3. The Personal Relief */}
            <div className="rounded-2xl bg-primary-soft/40 p-5 border border-primary/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground font-mono text-[10px]">
                    3
                  </span>
                  The Personal & Emotional Outcome
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed font-semibold">
                  {activeJourney.emotionalBenefit}
                </p>
              </div>
              <p className="mt-4 text-[11px] text-primary/80 font-medium border-t border-primary/15 pt-2">
                Dignity for your loved one; calm for your family.
              </p>
            </div>
          </div>

          {/* Practical Care Deliverables & Role Boundary */}
          <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start border-t border-border/80 pt-8">
            {/* Left 7 cols: Exactly What ApnaCare Provides */}
            <div className="lg:col-span-7">
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <Check className="size-4 text-primary" />
                Practical Care & Daily Activities Included:
              </h4>
              <ul className="mt-4 space-y-3">
                {activeJourney.practicalRelief.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-foreground/90">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 mt-0.5">
                      <Check className="size-3 font-bold" />
                    </span>
                    <span className="leading-snug font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right 5 cols: Provider Standards & Strict Scope Boundary */}
            <div className="lg:col-span-5 rounded-2xl bg-secondary/50 p-5 border border-border">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4.5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Caregiver Role & Credential Boundary
                </span>
              </div>
              <div className="mt-3 text-xs space-y-2">
                <p className="font-semibold text-foreground">
                  Assigned Provider: <span className="text-primary">{activeJourney.providerDistinction.role}</span>
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {activeJourney.providerDistinction.description}
                </p>
                <div className="rounded-xl bg-background/80 p-3 border border-border/70 mt-3 text-[11px] text-muted-foreground leading-relaxed">
                  <span className="font-bold text-foreground block mb-0.5 flex items-center gap-1">
                    <Info className="size-3 text-primary inline" /> Medical Safety Boundary:
                  </span>
                  {activeJourney.providerDistinction.boundary}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Contextual Action Strip */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/80 pt-6">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>South India Active Clusters: Bengaluru · Chennai · Hyderabad · Coimbatore</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {activeJourney.serviceSlug === "ecosystem-partners" ? (
                <Button asChild variant="warm" size="lg" className="min-h-[44px] font-semibold">
                  <Link to="/ecosystem-partners">
                    <span>{activeJourney.primaryCtaText}</span>
                    <ArrowRight className="ml-1.5 size-4" />
                  </Link>
                </Button>
              ) : (
                <BookLink
                  service={activeJourney.serviceSlug}
                  variant="warm"
                  size="lg"
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
                className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/10 px-5 py-2.5 text-xs font-semibold text-[#128C7E] hover:bg-[#25D366]/20 transition-colors min-h-[44px]"
              >
                <MessageCircle className="size-4 text-[#25D366]" />
                <span>Discuss on WhatsApp</span>
              </a>

              <a
                href={`tel:${SITE.SUPPORT_PHONE_TEL}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground px-3 py-2"
              >
                <PhoneCall className="size-3.5 text-primary" />
                <span>Call {SITE.SUPPORT_PHONE}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
