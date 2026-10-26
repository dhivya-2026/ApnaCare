import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ShieldCheck,
  BadgeCheck,
  Clock,
  IndianRupee,
  ArrowRight,
  MessageCircle,
  Phone,
  Sparkles,
  CheckCircle2,
  Star,
  MapPin,
  Languages,
  PhoneCall,
  UserCheck,
  AlertCircle,
  HelpCircle,
  CalendarCheck,
  FileCheck,
  Heart,
  Stethoscope,
  Info,
  Check,
  X,
  Layers,
  ArrowLeftRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import {
  SITE,
  ATTENDANTS,
  SERVICES,
  buildWhatsAppUrl,
  formatINR,
} from "@/data/site";
import { track } from "@/lib/analytics";
import { seo } from "@/lib/seo";
import { buildOrganizationSchema, buildFaqPageSchema } from "@/data/enterprise-content";
import { CareNeedsCalculator } from "@/components/site/CareNeedsCalculator";
import { CareNavigator } from "@/components/site/CareNavigator";
import { BusinessEnquiryModal } from "@/components/site/BusinessEnquiryModal";
import { CareSituationSlider } from "@/components/site/CareSituationSlider";
import { CareCoordinationExplorer } from "@/components/site/CareCoordinationExplorer";
import { CareRecoveryStory } from "@/components/site/CareRecoveryStory";
import { HeroCareShowcase } from "@/components/site/HeroCareShowcase";
import { UniversalCareConfigurator } from "@/components/site/UniversalCareConfigurator";
import { useLanguage } from "@/lib/i18n";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import nursingCare from "@/assets/nursing-care.jpg";

// Scannable, customer-focused FAQs answering genuine family questions
const FAQS = [
  {
    q: "How are ApnaCare Saha team members verified and vetted?",
    a: "Every Saha care companion undergoes a structured 5-stage background verification: government photo ID authentication, police verification documentation filing, residential address checks, reference reviews, and practical caregiving skills assessment before home assignment.",
  },
  {
    q: "What is the difference between a Saha care companion and a registered nurse?",
    a: "A Saha care companion provides supportive personal care — companionship, mobility assistance, bathing, feeding accompaniment, and oral prescription reminder logging. A registered nurse (GNM or B.Sc. Nursing) is medically licensed to perform clinical procedures such as sterile wound dressings, IV infusions, injections, and catheter management under physician prescription.",
  },
  {
    q: "How do families receive daily care updates?",
    a: "Saha team members maintain daily routine activity logs recording meal accompaniment, mobility exercises, and personal comfort. Families receive scheduled daily WhatsApp updates, while clinical vital sign charting is strictly conducted during registered nursing visits.",
  },
  {
    q: "What happens if our assigned Saha falls ill or has an emergency?",
    a: "We maintain a priority cluster backup protocol across our active operating hubs (Bengaluru, Chennai, Hyderabad, and Coimbatore). If your primary Saha cannot attend due to an illness or emergency, our regional coordinator prioritizes standby companion reassignment to minimize disruption to your care schedule.",
  },
  {
    q: "Can we preview the Saha profile before confirming?",
    a: "Yes. Once you share your requirements, your care coordinator shares the verified digital profile with background clearance, experience records, and language fluencies so your family can review and approve before work begins.",
  },
  {
    q: "Are there any hidden agency commissions or surprise fees?",
    a: "None. All rates are published transparently on a per-day, per-shift, or monthly basis with official 18% statutory GST tax invoices (SAC 9993). There are zero broker commissions, advance lock-in deposits, or unexpected booking markups.",
  },
];

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "ApnaCare — Care for Them. Peace of Mind for You.",
      "Trusted, police-verified care and support for your loved ones across South India. Compassionate elderly care, hospital assistance, certified nursing, and post-natal support.",
      {
        canonical: "https://apna-care.vercel.app",
        keywords: [
          "home care services India",
          "elderly care at home Bengaluru",
          "hospital bedside attendant Chennai",
          "certified nursing at home Hyderabad",
          "post natal care Coimbatore",
          "police verified women attendants",
        ],
        schema: [buildOrganizationSchema(), buildFaqPageSchema(FAQS)],
      }
    ),
  component: HomePage,
});

// Section 2: Six distinct, realistic family situations supported by existing ApnaCare services
const FAMILY_SITUATIONS = [
  {
    id: "aging-parent",
    title: "Helping an Ageing Parent",
    tagline: "Dignified everyday living at home",
    trigger: "When everyday living becomes difficult or parents live independently.",
    description:
      "Gentle personal hygiene assistance, mobility support, medication routines, and warm companionship so seniors live safely and comfortably in familiar surroundings.",
    serviceName: "Elderly Care at Home",
    serviceSlug: "elderly-care",
    image: hero1,
    alt: "Caregiver gently holding hands and assisting an elderly lady at home",
    badge: "Senior Living",
    highlights: ["Daily mobility & transfer", "Medication reminder logging", "Nutritious meal accompaniment"],
    startingPrice: 1299,
  },
  {
    id: "post-hospital",
    title: "Supporting Hospital Recovery",
    tagline: "Bedside vigil & steady recovery",
    trigger: "When ward fatigue sets in or hospital discharge begins.",
    description:
      "Dedicated bedside attendants during hospital stays and post-discharge recovery at home, coordinating with doctors and nursing staff for seamless recuperation.",
    serviceName: "Hospital & Bedside Support",
    serviceSlug: "hospital-attendants",
    image: hero2,
    alt: "Attendant assisting a recovering patient in hospital corridor",
    badge: "Recovery & Hospital",
    highlights: ["Bedside observation & nurse call coordination", "Hygiene & bed-bound comfort", "Post-op home discharge care"],
    startingPrice: 1499,
  },
  {
    id: "clinical-nursing",
    title: "Prescribed Home Clinical Nursing",
    tagline: "Licensed procedures under doctor orders",
    trigger: "When sterile surgical dressings, IVs, or clinical monitoring are required.",
    description:
      "Registered GNM/B.Sc nurses who execute medical procedures, sterile wound dressings, and vital sign monitoring strictly per written physician prescription.",
    serviceName: "Certified Clinical Nursing",
    serviceSlug: "nursing-services",
    image: nursingCare,
    alt: "Registered nurse administering sterile clinical care under doctor prescription",
    badge: "Clinical Nursing",
    highlights: ["Sterile surgical dressings & bedsores", "IV infusions & prescribed injections", "Catheter & clinical charting"],
    startingPrice: 1999,
  },
  {
    id: "postnatal-newborn",
    title: "Postnatal Rest & Infant Support",
    tagline: "Restorative sleep for mother & baby",
    trigger: "When nighttime feedings and healing require trusted practical hands.",
    description:
      "Trained maternal and infant caregivers who assist with gentle newborn massage, soothing routines, and night vigil so new mothers get restorative rest.",
    serviceName: "Post-Natal Maternal Support",
    serviceSlug: "post-natal-care",
    image: hero4,
    alt: "Experienced caregiver tenderly caring for newborn baby while mother rests",
    badge: "Maternal & Infant",
    highlights: ["Gentle newborn bath & massage", "Feeding accompaniment", "Night-time rest coverage for mothers"],
    startingPrice: 1999,
  },
  {
    id: "travel-mobility",
    title: "Assisted Travel & Clinic Accompaniment",
    tagline: "Safe transit & appointment escort",
    trigger: "When medical checkups, outstation transit, or rail journeys need support.",
    description:
      "Vetted women chauffeuses and mobility companions for medical visits, airport arrivals, railway journeys, and safe local city transit.",
    serviceName: "Travel & Mobility Support",
    serviceSlug: "travel-assistance",
    image: hero5,
    alt: "Professional woman driver providing safe escorted transit for family member",
    badge: "Mobility & Transit",
    highlights: ["Door-to-door medical escort", "Airport & railway platform assistance", "Licensed women drivers"],
    startingPrice: 999,
  },
  {
    id: "caregiver-respite",
    title: "Caregiver Respite & Distant Coordination",
    tagline: "Burnout relief & remote oversight",
    trigger: "When primary family caregivers need time off or live in another city.",
    description:
      "Temporary relief coverage for tired family caregivers and structured daily WhatsApp care logs for children coordinating their parents' care from another city.",
    serviceName: "Family Respite & Lifestyle Support",
    serviceSlug: "lifestyle-support",
    image: hero3,
    alt: "Caregiver taking notes and coordinating health schedule with elderly family",
    badge: "Respite & Coordination",
    highlights: ["Scheduled WhatsApp updates for remote family", "Flexible half-day or weekend relief shifts", "Care continuity during helper leaves"],
    startingPrice: 899,
  },
];

// Section 3: Six Concrete Dimensions of Side-by-Side Coordination Comparison
const COORDINATION_COMPARISONS = [
  {
    category: "Finding & Assessing Suitable Support",
    independent: {
      headline: "Scattered Search & Uncertain Availability",
      points: [
        "Calling multiple informal domestic brokers or online classifieds with uncertain availability",
        "Relying on self-reported claims without verified criminal or court background checks",
        "Uncertainty about identity or residential history before inviting someone into home",
      ],
    },
    apnaCare: {
      headline: "Pre-Verified Staff & Clear Credentials",
      points: [
        "Direct matching from verified caregiver clusters based on assessed mobility needs and hours",
        "Standardized review: Government photo ID authentication, police verification filings, and reference checks",
        "Verified digital profile previewed and confirmed with family before work begins",
      ],
    },
  },
  {
    category: "Reviewing Identity & Credential Evidence",
    independent: {
      headline: "Unverified Photocopies & Informal Claims",
      points: [
        "Accepting unauthenticated identity photocopies without formal address or background validation",
        "No structured mechanism to verify prior patient handling records or clinical credentials",
        "Lack of standardized onboarding protocols or background screening dossiers",
      ],
    },
    apnaCare: {
      headline: "Government ID Authentication & Police Screening",
      points: [
        "Every attendant pre-screened with government photo ID authentication and police verification filings",
        "State Nursing Council credentials verified for all licensed GNM/B.Sc clinical nurses",
        "Practical training in patient mobility transfer, ergonomics, and oral medication logging",
      ],
    },
  },
  {
    category: "Clarifying Attendant vs. Nurse Responsibilities",
    independent: {
      headline: "Unclear Roles & Medical Safety Risks",
      points: [
        "Confusion between domestic helpers, attendants, and trained clinical nurses",
        "Risk of uncertified staff attempting sterile dressings, injections, or catheter procedures",
        "No structured checklist of daily tasks and hygiene responsibilities",
      ],
    },
    apnaCare: {
      headline: "Documented Scope & Role Distinction",
      points: [
        "Clear boundary: Attendants support daily living; GNM/B.Sc nurses perform clinical tasks",
        "Injections and sterile wound dressings strictly reserved for licensed nurses under doctor orders",
        "Explicit daily task plan agreed between family and local care coordinator",
      ],
    },
  },
  {
    category: "Coordinating Schedules, Backup & Continuity",
    independent: {
      headline: "Scrambling with Zero Backup",
      points: [
        "If caregiver is ill or leaves unexpectedly, the family is left alone without notice",
        "Forced emergency leaves from work or frantic search for untested temporary substitutes",
        "Repeating training and explaining routines from scratch every time someone changes",
      ],
    },
    apnaCare: {
      headline: "Priority Cluster Backup Protocol",
      points: [
        "Cluster-based standby protocol across Bengaluru, Chennai, Hyderabad, and Coimbatore",
        "Priority replacement attendant reassignment with zero transition penalty",
        "Continuous supervisor oversight ensures care continuity without family disruption",
      ],
    },
  },
  {
    category: "Providing Agreed Family Updates",
    independent: {
      headline: "Constant Worry & Anxious Phone Calls",
      points: [
        "Repeated check-in calls to check if medicines were given on schedule",
        "No objective record of meal intake, vitals, or daily comfort",
        "High anxiety for family members working away from home or in other cities",
      ],
    },
    apnaCare: {
      headline: "Scheduled WhatsApp Summaries",
      points: [
        "Daily digital wellness logs recording meals, mobility routines, and comfort observations",
        "Direct contact with a dedicated regional care coordinator at all times",
        "Peace of mind knowing your loved one is supported even when living at a distance",
      ],
    },
  },
  {
    category: "Explaining Pricing & Next Steps",
    independent: {
      headline: "Hidden Surcharges & Cash Uncertainty",
      points: [
        "Unexpected agency commissions, surge charges, or cash-only demands",
        "No formal tax invoices available for healthcare accounting or employer reimbursement",
        "Vague refund or cancellation policies if expectations are not met",
      ],
    },
    apnaCare: {
      headline: "Fixed Rates & Official GST Invoicing",
      points: [
        "Upfront published per-day and per-shift pricing with zero broker markups",
        "Official 18% statutory GST tax invoices (SAC 9993) provided for every booking",
        "Clear refund and replacement terms documented prior to confirmation",
      ],
    },
  },
];

// Section 3: Four-Stage Relief Progression (Concern -> Discussion -> Support Arranged -> Ongoing Coordination)
const CARE_DIFFERENCE_STEPS = [
  {
    step: "01",
    phase: "Family Concern",
    title: "Uncertainty & Care Strain",
    description:
      "An aging parent lives alone, a hospital discharge is scheduled, or a family struggles to balance caregiving with work commitments.",
    icon: AlertCircle,
    colorClass: "text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/25",
  },
  {
    step: "02",
    phase: "Care Discussion",
    title: "Needs, Timing & Hours Clarified",
    description:
      "A compassionate care coordinator listens without pressure. We assess mobility requirements, daily routines, shift duration, and language preferences.",
    icon: PhoneCall,
    colorClass: "text-primary bg-primary-soft border-primary/25",
  },
  {
    step: "03",
    phase: "Support Arranged",
    title: "Verified Specialist Matched",
    description:
      "A police-cleared Saha care companion or licensed nurse is assigned. You preview their credentials, background clearance, and clear GST rates before work begins.",
    icon: UserCheck,
    colorClass: "text-terracotta bg-terracotta/10 border-terracotta/25",
  },
  {
    step: "04",
    phase: "Ongoing Coordination",
    title: "Daily WhatsApp Logs & Oversight",
    description:
      "Families receive daily WhatsApp summaries tracking routine living comfort, backed by direct coordinator access and priority cluster standby backup.",
    icon: MessageCircle,
    colorClass: "text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
  },
];

// Section 4: Four-Step Tangible Onboarding Layout
const ONBOARDING_STEPS = [
  {
    step: "01",
    icon: Clock,
    title: "Tell Us What Is Happening",
    description:
      "Share your family's situation, preferred city, required shift hours, and language preference. No advance deposit or clinical jargon needed.",
    meta: "Zero financial commitment",
  },
  {
    step: "02",
    icon: PhoneCall,
    title: "Discuss Needs, Timing & Budget",
    description:
      "Our local care coordinator reviews personal living vs clinical nursing boundaries, confirms schedule timing, and outlines transparent pricing options.",
    meta: "15–30 min consultation",
  },
  {
    step: "03",
    icon: UserCheck,
    title: "Review Suitable Services & Availability",
    description:
      "Inspect matched caregiver profiles with government photo ID authentication status, police verification records, experience history, and cluster readiness.",
    meta: "Full transparency before placement",
  },
  {
    step: "04",
    icon: CalendarCheck,
    title: "Confirm Agreed Care & Responsibilities",
    description:
      "Your assigned Saha arrives punctually. Families receive daily digital wellness logs via WhatsApp, backed by our priority cluster standby backup protocol.",
    meta: "Continuous coordinator oversight",
  },
];

// Section 5: Trust Pillars
const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    title: "Government ID Authentication & Police Screening",
    description:
      "Every Saha team member undergoes government photo ID authentication, police background screening filings, and residential address checks before entering any home.",
  },
  {
    icon: BadgeCheck,
    title: "Practical Care & First-Aid Training",
    description:
      "Comprehensive training in patient ergonomics, infection prevention, mobility transfer, and precise daily medication logging.",
  },
  {
    icon: Clock,
    title: "Priority Cluster Backup Protocol",
    description:
      "Reliable care continuity. If your primary Saha is unavailable due to an unexpected emergency, our local cluster prioritizes standby replacement dispatch.",
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing & GST Invoicing",
    description:
      "No hidden agency commissions or surprise dispatch charges. Clear, upfront daily rates accompanied by official 18% statutory GST tax invoices (SAC 9993).",
  },
];

// Section 7: Pricing Highlights
const PRICING_HIGHLIGHTS = [
  {
    title: "Day Shift Care",
    subtitle: "8 to 12 Hours Daytime",
    price: 1299,
    description: "Ideal for daily companionship, mobility assistance, medication routines, and meal assistance while family members are at work.",
    serviceSlug: "elderly-care",
    popular: false,
  },
  {
    title: "24-Hour Live-in Care",
    subtitle: "Continuous Day & Night",
    price: 1799,
    description: "Complete round-the-clock peace of mind for seniors or recovering individuals who need prompt assistance at any hour.",
    serviceSlug: "elderly-care",
    popular: true,
  },
  {
    title: "Hospital Bedside Assistance",
    subtitle: "12-Hr Shift or 24-Hr Vigil",
    price: 1499,
    description: "Dedicated bedside support in private or general wards, nurse bell assistance, hygiene care, and real-time family updates.",
    serviceSlug: "hospital-attendants",
    popular: false,
  },
  {
    title: "Certified Nursing Support",
    subtitle: "Clinical Procedures",
    price: 1999,
    description: "Registered GNM/B.Sc nurse visits for sterile surgical wound dressings, injections, catheter care, and doctor prescription compliance.",
    serviceSlug: "nursing-services",
    popular: false,
  },
];

function HomePage() {
  const { strings, language } = useLanguage();
  const [attendantCity, setAttendantCity] = useState("All");
  const [homeBizOpen, setHomeBizOpen] = useState(false);
  const [showNavigator, setShowNavigator] = useState(false);
  const [coordinationView, setCoordinationView] = useState<"comparison" | "journey">("comparison");

  // Smooth scroll to hash anchor on load and on hash change
  useEffect(() => {
    const handleHashScroll = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const id = window.location.hash.replace("#", "");
        const target = document.getElementById(id);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

  const waUrl = buildWhatsAppUrl(
    "Hello ApnaCare team! I would like to learn more about care options for my family."
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          1. HUMAN-CENTRED HERO
          - Single memorable headline
          - Concise supporting sentence answering what, who, and where
          - Prominent primary CTA to booking/enquiry
          - Secondary action to existing contact channel (call/WhatsApp)
          - Warm, authentic visual (no carousel or long intro paragraph)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 via-background to-background py-12 md:py-20 lg:py-24 border-b border-border/50">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Direct, human, conversion-focused */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary backdrop-blur">
                <Sparkles className="size-3.5 text-terracotta" />
                <span>{strings.activeCitiesTitle}: {strings.activeCities}</span>
              </div>

              {/* One Memorable Headline */}
              <h1 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.12]">
                {strings.careCloserToHome}
              </h1>

              {/* One Concise Supporting Sentence */}
              <p className="mt-4 max-w-xl text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed">
                {strings.heroSupporting}
              </p>

              {/* Primary and Secondary Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-8 shadow-soft hover:shadow-lift transition-all min-h-[48px] font-bold text-sm sm:text-base"
                >
                  <Link
                    to="/booking"
                    onClick={() => track("hero_request_assistance")}
                  >
                    {strings.requestConsultation}
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full px-6 min-h-[48px] font-semibold border-border bg-card hover:bg-secondary text-sm sm:text-base"
                >
                  <a
                    href={`tel:${SITE.SUPPORT_PHONE_TEL}`}
                    onClick={() => track("hero_call_coordinator")}
                    className="inline-flex items-center gap-2"
                  >
                    <Phone className="size-4 text-primary" />
                    <span>{strings.callCoordinator} ({SITE.SUPPORT_PHONE})</span>
                  </a>
                </Button>
              </div>

              {/* Reassuring Trust Indicators */}
              <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-medium text-muted-foreground pt-4 border-t border-border/60">
                <span className="inline-flex items-center gap-1.5 text-foreground font-semibold">
                  <ShieldCheck className="size-4 text-primary" />
                  {strings.policeVerified}
                </span>
                <span className="inline-flex items-center gap-1.5 text-foreground font-semibold">
                  <BadgeCheck className="size-4 text-terracotta" />
                  {strings.nurseClarity}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4 text-primary" />
                  {strings.clusterBackup}
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Care Showcase with smooth loop switching & category tabs */}
            <div className="lg:col-span-5">
              <HeroCareShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. FAMILY SITUATIONS (CAROUSEL & SLIDER)
          - Interactive 6-scenario slider with touch swipe, keyboard, & grid toggle
      ───────────────────────────────────────────────────────────── */}
      <CareSituationSlider />

      {/* ─────────────────────────────────────────────────────────────
          UNIVERSAL CARE CONFIGURATOR & INTELLIGENT ATTENDANT MATCHER
          - Situation-led discovery, multi-module plan builder & matching
      ───────────────────────────────────────────────────────────── */}
      <UniversalCareConfigurator />

      {/* ─────────────────────────────────────────────────────────────
          3. CARE COORDINATION VALUE EXPLORER (PRIORITY SECTION A)
          - 6-area segmented control & interactive comparison
      ───────────────────────────────────────────────────────────── */}
      <CareCoordinationExplorer />

      {/* ─────────────────────────────────────────────────────────────
          PRIORITY SECTION B: POST-HOSPITAL CARE RECOVERY STORY
          - Image-led empathetic story with 3 simple steps & boundary notice
      ───────────────────────────────────────────────────────────── */}
      <CareRecoveryStory sourceContext="homepage" />

      {/* ─────────────────────────────────────────────────────────────
          4. HOW APNACARE WORKS
          - Existing 4-step onboarding layout
          - Clear, transparent process with zero high-pressure sales
      ───────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-16 md:py-24 border-b border-border/50 bg-background scroll-mt-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Predictable Onboarding</p>
            <h2 className="mt-2 text-balance font-display text-3xl font-semibold md:text-4xl lg:text-5xl text-foreground">
              What Happens After You Inquire
            </h2>
            <p className="mt-3 text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed">
              No high-pressure sales calls, hidden brokerage fees, or unexpected strangers. Here is our exact 4-step onboarding protocol for every family.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ONBOARDING_STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-primary bg-primary-soft rounded-full px-2.5 py-1">
                        STEP {s.step}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                        {s.meta}
                      </span>
                    </div>

                    <div className="grid size-11 place-items-center rounded-2xl bg-secondary text-primary mb-4">
                      <Icon className="size-5" />
                    </div>

                    <h3 className="text-base font-bold text-foreground leading-snug">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border/60">
                    <span className="text-[11px] font-semibold text-primary/90 flex items-center gap-1">
                      <CheckCircle2 className="size-3.5 text-primary" />
                      Standard protocol
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 shadow-soft font-bold min-h-[48px]">
              <a href="#enquiry">Talk to Our Care Coordinator</a>
            </Button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors min-h-[48px]"
            >
              <MessageCircle className="size-4 text-[#25D366]" />
              Discuss on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. TRUST AND REASSURANCE
          - Real verification process
          - Attendant vs Nurse clinical scope boundaries
          - Caregiver profiles with illustrative notice (Phase 0 resolution)
          - Regional backup procedures (90-min SLA)
      ───────────────────────────────────────────────────────────── */}
      <section id="attendants" className="py-16 md:py-24 border-b border-border/50 bg-secondary/25 scroll-mt-20">
        <div className="container-page">
          {/* Header */}
          <div className="max-w-3xl">
            <p className="eyebrow">Trust & Safety Standards</p>
            <h2 className="mt-2 text-balance font-display text-3xl font-semibold md:text-4xl lg:text-5xl text-foreground">
              Why Families Can Depend on ApnaCare
            </h2>
            <p className="mt-3 text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed">
              Inviting someone into your home or hospital room requires absolute confidence. We maintain verified safety protocols, clear medical boundaries, and backup guarantees.
            </p>
          </div>

          {/* 4 Trust Pillars */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_PILLARS.map((p, idx) => {
              const IconComponent = p.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-200 hover:border-primary/40 hover:shadow-lift"
                >
                  <div className="grid size-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                    <IconComponent className="size-5.5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Service Boundary Clarification (Crucial Trust Distinguisher) */}
          <div className="mt-10 rounded-3xl border border-primary/25 bg-card p-6 md:p-8 shadow-soft">
            <div className="flex items-center gap-2.5 mb-4">
              <Stethoscope className="size-5 text-terracotta" />
              <h3 className="font-display text-lg font-bold text-foreground">
                Understanding Care Boundaries: Attendants vs Registered Nurses
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-3xl mb-6">
              For patient safety and statutory compliance, ApnaCare clearly distinguishes between supportive daily living assistance and licensed clinical procedures:
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-secondary/30 p-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary mb-3">
                  <Heart className="size-3.5" />
                  Saha Care Companion (Non-Clinical Support)
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  Provides warm, supportive personal care and companionship for seniors and recovering patients:
                </p>
                <ul className="space-y-1.5 text-xs text-foreground/90">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                    <span>Bathing, sponge baths, and personal hygiene assistance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                    <span>Mobility support, walking companionship, and transfer safety</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                    <span>Feeding accompaniment and oral medication schedule reminders</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                    <span>Daily wellness logging and WhatsApp reports to family</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-terracotta/25 bg-terracotta/5 p-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-terracotta/15 px-3 py-1 text-xs font-bold text-terracotta mb-3">
                  <Stethoscope className="size-3.5" />
                  Registered Clinical Nurse (GNM / B.Sc)
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  Medically licensed to perform clinical procedures under treating physician prescription:
                </p>
                <ul className="space-y-1.5 text-xs text-foreground/90">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-terracotta shrink-0" />
                    <span>Sterile surgical wound dressings and bedsore management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-terracotta shrink-0" />
                    <span>IV infusions, intramuscular/subcutaneous injections</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-terracotta shrink-0" />
                    <span>Urinary catheterization and Ryle's tube feeding management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-terracotta shrink-0" />
                    <span>Vital sign clinical charting and post-op protocol execution</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Caregiver Profile Showcase with Phase 0 Transparency Notice */}
          <div className="mt-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <span className="eyebrow">Saha Profiles</span>
                <h3 className="mt-1 text-2xl font-bold font-display text-foreground">
                  Meet the people behind your peace of mind.
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-xl">
                  Meet the Saha team — people who support your family through everyday care needs, hospital visits, and important moments at home.
                </p>
              </div>

              {/* City filter */}
              <div className="flex flex-wrap gap-2 shrink-0" role="tablist" aria-label="Filter Saha team by city">
                {["All", "Bengaluru", "Chennai", "Hyderabad", "Coimbatore"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    role="tab"
                    aria-selected={attendantCity === c}
                    onClick={() => {
                      setAttendantCity(c);
                      track("attendant_city_filter", { city: c });
                    }}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-all min-h-[36px] ${
                      attendantCity === c
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "border border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {c === "All" ? "All Cities" : c}
                  </button>
                ))}
              </div>
            </div>

            {/* Illustrative Profiles Disclaimer Pill (Direct Phase 0 Credibility Compliance) */}
            <div className="mt-4 rounded-xl border border-border/80 bg-background/80 px-4 py-3 flex items-start gap-2.5 text-xs text-muted-foreground">
              <Info className="size-4 text-primary shrink-0 mt-0.5" />
              <p>
                <strong className="text-foreground font-semibold">Representative Profiles:</strong> The profiles below illustrate verified Saha roles, background checks, and skill sets. In each operating city, all assigned Saha companions undergo biometric Aadhaar authentication and criminal record screening prior to home placement.
              </p>
            </div>

            {/* Attendant Cards Grid */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ATTENDANTS.filter(
                (a) => attendantCity === "All" || a.city.toLowerCase() === attendantCity.toLowerCase()
              ).map((a) => (
                <article
                  key={a.id}
                  className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
                  onMouseEnter={() => track("attendant_card_hover", { attendant: a.id })}
                >
                  <div>
                    {/* Header: Avatar, Name, Role, Badge */}
                    <div className="flex items-start gap-3.5">
                      <Avatar className="size-14 ring-2 ring-primary/20 shrink-0">
                        <AvatarImage
                          src={`https://images.unsplash.com/photo-${
                            a.id === "a1"
                              ? "1573496359142-b8d87734a5a2"
                              : a.id === "a2"
                              ? "1580489944761-15a19d654956"
                              : a.id === "a3"
                              ? "1594744803329-e58b31de8bf5"
                              : a.id === "a4"
                              ? "1567532939604-b6b5b0db2604"
                              : a.id === "a5"
                              ? "1544005313-94ddf0286df2"
                              : "1573497019940-1c28c88b4f3e"
                          }?auto=format&fit=crop&w=200&q=80`}
                          alt={a.name}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {a.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-semibold text-foreground text-base truncate">{a.name}</h4>
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-terracotta/15 px-2 py-0.5 text-[11px] font-bold text-terracotta shrink-0">
                            <Star className="size-3 fill-terracotta text-terracotta" />
                            {a.rating}
                          </span>
                        </div>
                        <p className="text-xs text-primary font-medium truncate mt-0.5">{a.role}</p>
                        <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="size-3" />
                            {a.experience}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="size-3" />
                            {a.city}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Verification Pill */}
                    <div className="mt-4 rounded-xl bg-primary-soft px-3 py-2 border border-primary/20 flex items-center gap-2">
                      <BadgeCheck className="size-4 text-primary shrink-0" />
                      <span className="text-xs font-semibold text-primary truncate">
                        {a.verification}
                      </span>
                    </div>

                    {/* Bio */}
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {a.bio}
                    </p>

                    {/* Certifications tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Certifications">
                      {a.certifications.map((c) => (
                        <span
                          key={c}
                          className="rounded-full border border-border bg-secondary/40 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                          {c}
                        </span>
                      ))}
                    </div>

                    {/* Languages */}
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Languages className="size-3.5 shrink-0 text-primary" />
                      <span className="truncate">{a.languages.join(", ")}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-5 pt-3 border-t border-border flex items-center gap-2">
                    <Button asChild size="sm" className="w-full rounded-xl min-h-[44px]">
                      <Link
                        to="/booking"
                        search={{ service: a.services[0], city: a.city }}
                        onClick={() => track("attendant_request_click", { attendant: a.id })}
                      >
                        Choose Your Saha
                        <ArrowRight className="size-3.5 ml-1.5" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {/* Reassurance footer bar */}
            <div className="mt-8 rounded-2xl border border-border bg-card p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 text-foreground font-semibold">
                  <ShieldCheck className="size-4 text-primary" />
                  Police & Identity Verification on File
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5 text-foreground font-semibold">
                  <Clock className="size-4 text-primary" />
                  90-Min Backup Protocol
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5 text-foreground font-semibold">
                  <CheckCircle2 className="size-4 text-primary" />
                  Zero Direct Broker Surcharges
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold">
                <Link to="/safety" className="text-primary hover:underline">
                  Read our full safety standards →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. CARE OPTIONS
          - Concise overview of existing service categories
          - Keeps homepage focused on choosing appropriate help
          - Clear links to detailed pages
      ───────────────────────────────────────────────────────────── */}
      <section id="services" className="py-16 md:py-24 border-b border-border/50 bg-background scroll-mt-20">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow">Care Categories</p>
              <h2 className="mt-2 text-balance font-display text-3xl font-semibold md:text-4xl lg:text-5xl text-foreground">
                Explore Care by Category
              </h2>
              <p className="mt-3 text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed">
                Whether you need everyday living assistance, post-operative care, or clinical visits, we offer transparent options tailored to your family's needs.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNavigator(!showNavigator)}
                className="rounded-full text-xs font-semibold min-h-[38px]"
              >
                {showNavigator ? "Hide Care Navigator" : "Open Interactive Navigator"}
              </Button>
              <Button asChild size="sm" className="rounded-full text-xs font-bold min-h-[38px]">
                <Link to="/services">View All Services →</Link>
              </Button>
            </div>
          </div>

          {/* Interactive Care Navigator toggle */}
          {showNavigator && (
            <div className="mt-8 rounded-3xl border border-primary/20 bg-secondary/20 p-6">
              <CareNavigator />
            </div>
          )}

          {/* Category Cards Overview */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 6).map((srv) => (
              <div
                key={srv.id}
                className="group flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-bold text-foreground capitalize">
                      {srv.category}
                    </span>
                    <span className="text-xs font-bold text-primary font-display">
                      {formatINR(srv.startingPrice)}/{srv.pricingUnit}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {srv.name}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {srv.shortDesc}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-border/60 pt-3">
                    {srv.benefits.slice(0, 2).map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-[11px] text-foreground/80">
                        <CheckCircle2 className="size-3 text-primary shrink-0" />
                        <span className="line-clamp-1">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-border flex items-center justify-between">
                  <Link
                    to="/services/$slug"
                    params={{ slug: srv.slug }}
                    className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 min-h-[36px]"
                  >
                    <span>Service Details</span>
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <Button asChild size="sm" variant="ghost" className="text-xs rounded-full">
                    <Link to="/booking" search={{ service: srv.slug }}>
                      Book Now
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. PRICING AND CARE VALUE
          - Retains approved rates, GST disclosures, calculator formulas
          - Clear daily pricing cards
          - Integrated Care Needs & Time-Relief Estimator
      ───────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-16 md:py-24 border-b border-border/50 bg-secondary/25 scroll-mt-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Transparent Pricing & Care Value</p>
            <h2 className="mt-2 text-balance font-display text-3xl font-semibold md:text-4xl lg:text-5xl text-foreground">
              Honest Rates with Zero Surprises
            </h2>
            <p className="mt-3 text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed">
              Clear per-day and per-shift pricing. Includes statutory GST invoices and transparent caregiver compensation with no broker surcharges.
            </p>
          </div>

          {/* Pricing Highlight Cards */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRICING_HIGHLIGHTS.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col rounded-3xl border p-6 transition-all duration-200 ${
                  item.popular
                    ? "border-primary bg-primary text-primary-foreground shadow-lift relative"
                    : "border-border bg-card shadow-soft"
                }`}
              >
                {item.popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-terracotta px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-terracotta-foreground">
                    Most Requested
                  </span>
                )}
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p
                  className={`text-xs mt-0.5 ${
                    item.popular ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  {item.subtitle}
                </p>

                <div className="mt-4 pt-3 border-t border-current/15">
                  <span className="font-display text-3xl font-bold">
                    {formatINR(item.price)}
                  </span>
                  <span
                    className={`text-xs ml-1 ${
                      item.popular ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}
                  >
                    /day
                  </span>
                  <p
                    className={`text-[11px] mt-0.5 font-medium ${
                      item.popular ? "text-primary-foreground/75" : "text-muted-foreground"
                    }`}
                  >
                    + 18% statutory GST
                  </p>
                </div>

                <p
                  className={`mt-3 text-xs leading-relaxed flex-1 ${
                    item.popular ? "text-primary-foreground/90" : "text-muted-foreground"
                  }`}
                >
                  {item.description}
                </p>

                <div className="mt-5 pt-3">
                  <Button
                    asChild
                    size="sm"
                    variant={item.popular ? "secondary" : "outline"}
                    className="w-full rounded-xl font-semibold min-h-[42px]"
                  >
                    <Link to="/booking" search={{ service: item.serviceSlug }}>
                      Book Service
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Value Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <ShieldCheck className="size-4 text-primary" /> Upfront rates confirmed before placement
            </span>
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <BadgeCheck className="size-4 text-primary" /> Official 18% GST tax invoice for reimbursement
            </span>
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <CheckCircle2 className="size-4 text-primary" /> Free 90-min regional replacement guarantee
            </span>
          </div>

          {/* Interactive Calculator Section */}
          <div className="mt-14">
            <CareNeedsCalculator />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. FAQS AND FINAL CTA
          - Important customer questions first in accessible accordion
          - Finish with clear, compassionate enquiry action
      ───────────────────────────────────────────────────────────── */}
      <section id="faqs" className="py-16 md:py-24 border-b border-border/50 bg-background scroll-mt-20">
        <div className="container-page max-w-3xl">
          <div className="text-center">
            <p className="eyebrow">Clear Answers</p>
            <h2 className="mt-2 text-balance font-display text-3xl font-semibold md:text-4xl text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-pretty text-base text-muted-foreground">
              Essential answers regarding verification, attendant vs nurse scope, updates, and service guarantees.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-border bg-card p-6 md:p-8 shadow-soft">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className={idx === FAQS.length - 1 ? "border-b-0" : ""}>
                  <AccordionTrigger className="text-left font-semibold text-foreground text-sm sm:text-base py-4 hover:no-underline hover:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              Have another question?{" "}
              <Link to="/faq" className="text-primary font-semibold hover:underline">
                View all FAQs
              </Link>{" "}
              or{" "}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                ask our coordinator directly on WhatsApp
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FINAL COMPASSIONATE ENQUIRY ACTION */}
      <section id="enquiry" className="container-page py-16 md:py-24 scroll-mt-20">
        <div className="rounded-[2.5rem] bg-ink p-8 text-ink-foreground md:p-14 shadow-lift">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left Column: Reassurance & Direct Contacts */}
            <div>
              <span className="eyebrow text-terracotta">We Are Here For You</span>
              <h2 className="mt-3 max-w-lg text-balance font-display text-3xl font-semibold md:text-4xl lg:text-5xl text-white leading-tight">
                Not sure where to begin? Tell us what kind of support you are looking for.
              </h2>
              <p className="mt-4 max-w-md text-base sm:text-lg text-ink-foreground/80 leading-relaxed">
                Tell us what your family is going through. Our dedicated care team will help you understand the next steps—without pressure, judgment, or obligation.
              </p>

              {/* Direct Quick Contact Buttons */}
              <div className="mt-8 flex flex-wrap gap-3.5">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/20 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-[#25D366]/30 transition-colors shadow-soft min-h-[48px]"
                >
                  <MessageCircle className="size-4 text-[#25D366]" />
                  Chat on WhatsApp
                </a>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20 min-h-[48px]"
                >
                  <Link to="/booking">Direct Booking Available</Link>
                </Button>
              </div>

              {/* Verified Operating Coverage */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-white/70">
                <a
                  href={`tel:${SITE.SUPPORT_PHONE_TEL}`}
                  className="flex items-center gap-1.5 font-medium text-white/90 hover:underline"
                >
                  <Phone className="size-3.5 text-terracotta" />
                  Direct Helpline: {SITE.SUPPORT_PHONE}
                </a>
                <span>•</span>
                <span>Active in Bengaluru, Chennai, Hyderabad & Coimbatore</span>
              </div>
            </div>

            {/* Right Column: Embedded Immediate Callback Form */}
            <div className="rounded-2xl bg-background p-6 text-foreground shadow-lift">
              <EnquiryForm
                title="Tell Us What Is Happening"
                subtitle="Share your family circumstance. A care coordinator will reach out gently within 15 minutes."
                className="bg-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      <BusinessEnquiryModal
        open={homeBizOpen}
        onOpenChange={setHomeBizOpen}
      />
    </div>
  );
}
