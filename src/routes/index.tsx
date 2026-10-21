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
  ChevronRight,
  MapPin,
  Languages,
  Quote,
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
  buildWhatsAppUrl,
  formatINR,
} from "@/data/site";
import { track } from "@/lib/analytics";
import { seo } from "@/lib/seo";
import { buildOrganizationSchema, buildFaqPageSchema } from "@/data/enterprise-content";
import { GuidedCareDiscovery } from "@/components/site/GuidedCareDiscovery";
import { CareNavigatorWizard } from "@/components/site/CareNavigatorWizard";
import { CaregiverShowcase } from "@/components/site/CaregiverShowcase";
import { PricingEstimator } from "@/components/site/PricingEstimator";
import { InteractiveLifeMoments } from "@/components/site/InteractiveLifeMoments";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import nursingCare from "@/assets/nursing-care.jpg";

// Scannable, concise FAQs for visible display and schema extraction
const FAQS = [
  {
    q: "How are ApnaCare attendants verified and vetted?",
    a: "Every attendant undergoes a rigorous 5-step background verification: biometric Aadhaar authentication, court and criminal record checks via authorized law enforcement partners, address verification, credential validation, and hands-on patient handling assessment before any placement.",
  },
  {
    q: "What is the difference between a care attendant and a registered nurse?",
    a: "A care attendant provides supportive personal care — companionship, mobility assistance, bathing, feeding accompaniment, and prescription reminder logging. A registered nurse (GNM or B.Sc. Nursing) is medically licensed to perform clinical procedures such as sterile wound dressings, IV infusions, injections, and catheter management.",
  },
  {
    q: "How do families receive daily care updates?",
    a: "Attendants maintain daily digital activity logs recording vital signs, meal intake, and routine comfort. Families receive scheduled daily WhatsApp wellness summaries and have direct contact with their assigned care coordinator at all times.",
  },
  {
    q: "What happens if our assigned attendant falls ill or has an emergency?",
    a: "We maintain a guaranteed backup dispatch protocol in each active operating cluster (Bengaluru, Chennai, Hyderabad, and Coimbatore). If your primary attendant cannot attend due to an emergency, a verified backup with matched skills is dispatched within 90 minutes with zero transition penalty.",
  },
];

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "ApnaCare — Care for Them. Peace of Mind for You.",
      "Trusted, police-verified care and support for your loved ones across South India. Compassionate elderly care, hospital assistance, certified nursing, and post-natal support.",
      {
        canonical: "https://apnacare.co.in",
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

// Featured Hero Care Moments for smooth visual preview
const HERO_CARE_MOMENTS = [
  {
    image: hero1,
    title: "Elderly Care at Home",
    caption: "Compassionate companionship & daily mobility support",
    badge: "Senior Care",
    alt: "Caregiver gently holding hands with an elderly woman at home",
  },
  {
    image: hero2,
    title: "Hospital Bedside Vigil",
    caption: "Attentive assistance during recovery stays",
    badge: "Hospital Support",
    alt: "Attendant assisting a patient in hospital corridor",
  },
  {
    image: nursingCare,
    title: "Certified Home Nursing",
    caption: "Qualified GNM/B.Sc nurses for wound care & vitals",
    badge: "Clinical Nursing",
    alt: "Qualified Indian nurse checking blood pressure and vitals for a patient at home",
  },
  {
    image: hero4,
    title: "Post-Natal Maternal Support",
    caption: "Infant massage, soothing & restorative maternal rest",
    badge: "New Mothers",
    alt: "Post-natal attendant holding a newborn while mother rests",
  },
];

// 6 Human Situation Pathways (Section B: "What's happening in your family right now?")
const AUDIENCE_PATHWAYS = [
  {
    id: "senior-citizens",
    label: "Older Adults & Ageing Parents",
    tag: "Senior Living",
    situation: "Living away or noticing parents struggle with bathing, daily routines, or walking safely.",
    benefit: "Gentle daily living assistance, warm companionship & fall prevention at home.",
    description:
      "When steps slow down and routine tasks become difficult, your parents deserve patience, gentle hands, and dignified independence in their familiar home.",
    image: hero1,
    alt: "Caregiver gently assisting an elderly lady at home with patience",
    link: "/solutions/families-elderly",
    actionText: "Explore Senior Care",
  },
  {
    id: "hospital-assistance",
    label: "Patients Requiring Hospital Assistance",
    tag: "Hospital Vigil",
    situation: "A loved one is admitted to hospital and needs continuous, attentive bedside vigil and nurse coordination.",
    benefit: "Dedicated bedside vigil, hygiene assistance & real-time family WhatsApp updates.",
    description:
      "Hospital corridors can be exhausting for working families. Our bedside attendant stays through the night, assists with hygiene, and coordinates with ward staff.",
    image: hero2,
    alt: "Attendant assisting a recovering patient in a hospital corridor",
    link: "/services/hospital-attendants",
    actionText: "Explore Hospital Care",
  },
  {
    id: "post-hospitalization",
    label: "Post-Hospital & Post-Surgical Recovery",
    tag: "Convalescent Care",
    situation: "Discharging home after an operation, hip/knee replacement, or acute hospital admission.",
    benefit: "Safe bedroom transitions, incision monitoring, spirometry supervision & readmission prevention.",
    description:
      "The first 30 days after hospital discharge are the most vulnerable. We ensure safe bed-to-chair transfers, prescribed breathing exercises, and incision comfort.",
    image: hero2,
    alt: "Caregiver assisting patient walking after surgery during convalescence",
    link: "/solutions/post-hospitalization",
    actionText: "Explore Recovery Care",
  },
  {
    id: "mothers-newborns",
    label: "Mothers & Newborns (Fourth Trimester)",
    tag: "Maternal & Infant",
    situation: "Healing after delivery while navigating newborn soothing, feeding, and severe exhaustion.",
    benefit: "Japa-trained newborn massage, bath routines & mother rest for 7+ hours of healing sleep.",
    description:
      "The fourth trimester is about maternal healing, not physical exhaustion. Our experienced attendants take over infant massage and night soothing so mom heals.",
    image: hero4,
    alt: "Post-natal attendant gently holding and caring for a newborn baby",
    link: "/solutions/new-mothers",
    actionText: "Explore Maternal Care",
  },
  {
    id: "nursing-clinical",
    label: "Families Seeking Professional Nursing",
    tag: "Clinical Nursing",
    situation: "A loved one requires sterile clinical procedures at home as prescribed by a treating doctor.",
    benefit: "Registered GNM/B.Sc nurses for surgical wound dressings, injections, and catheter management.",
    description:
      "Hospital-grade clinical competence in the comfort of home. Licensed nurses handle surgical dressings, IV lines, vitals monitoring, and prescription compliance.",
    image: nursingCare,
    alt: "Qualified nurse checking patient vitals and health status at home",
    link: "/services/nursing-services",
    actionText: "Explore Clinical Nursing",
  },
  {
    id: "women-mobility",
    label: "Safe Mobility & Transit Accompaniment",
    tag: "Transit & Escort",
    situation: "Seniors or women needing dependable, verified escort for clinic visits, airports, or train stations.",
    benefit: "Licensed women chauffeuses, station platform escorts & doorstep wheelchair transit.",
    description:
      "Doorstep-to-destination assisted travel. Our verified women drivers and travel companions ensure seniors navigate crowded stations and clinics with complete peace.",
    image: hero5,
    alt: "Professional woman driver providing safe transit assistance",
    link: "/services/women-drivers",
    actionText: "Explore Transit Escort",
  },
];

// The 4 prominent service discovery cards
const CORE_SERVICES = [
  {
    id: "elderly-care",
    slug: "elderly-care",
    title: "Elderly Care",
    benefit: "Support for the people who cared for you.",
    audience: "For seniors & aging parents living at home",
    description:
      "Compassionate daily companionship, medication reminders, mobility assistance, and dignity for ageing parents at home.",
    price: 1299,
    unit: "day",
    image: hero1,
    alt: "Elderly woman sitting comfortably with a friendly caregiver",
    tag: "Most Requested",
    highlight: "Geriatric certified · 24/7 or Day Shifts",
  },
  {
    id: "hospital-attendants",
    slug: "hospital-attendants",
    title: "Hospital Assistance",
    benefit: "A helping hand when your family needs it.",
    audience: "For inpatients & recovering individuals",
    description:
      "Dedicated bedside attendants during hospital stays. Coordinates with nurses, assists with hygiene, and provides peaceful updates.",
    price: 1499,
    unit: "day",
    image: hero2,
    alt: "Attendant providing walking assistance in hospital",
    tag: "24/7 Vigil",
    highlight: "Inpatient coordination · Day & Night shifts",
  },
  {
    id: "nursing-services",
    slug: "nursing-services",
    title: "Nursing Services",
    benefit: "Qualified nursing support for eligible care needs.",
    audience: "For patients requiring clinical procedures",
    description:
      "Registered GNM and B.Sc nurses providing sterile wound care, injections, vitals monitoring, and post-surgical recovery at home.",
    price: 1999,
    unit: "day",
    image: nursingCare,
    alt: "Qualified nurse checking patient vitals and health status at home",
    tag: "Clinical Care",
    highlight: "Registered GNM/B.Sc · Doctor prescription compliant",
  },
  {
    id: "post-natal-care",
    slug: "post-natal-care",
    title: "Post-Natal Care",
    benefit: "More support for the early days of parenthood.",
    audience: "For new mothers & infants during the fourth trimester",
    description:
      "Experienced maternal and infant specialists assisting with newborn massage, bath routines, and soothing so mothers get restorative sleep.",
    price: 1999,
    unit: "day",
    image: hero4,
    alt: "Caregiver tenderly tending to a newborn baby while supporting the mother",
    tag: "Maternal Care",
    highlight: "Japa trained · Newborn massage & mother rest",
  },
];

// Verified Trust Information
const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    title: "Identity & Police Background Verification",
    description:
      "Every attendant undergoes biometric Aadhaar verification, court legal screenings, and residential address checks before entering any home.",
  },
  {
    icon: BadgeCheck,
    title: "Clear Role Boundaries & Practical Training",
    description:
      "Strict scope governance: supportive daily living care by trained GDAs, and sterile clinical procedures strictly by registered GNM/B.Sc nurses.",
  },
  {
    icon: Clock,
    title: "Guaranteed 90-Min Emergency Backup",
    description:
      "Continuity you can count on. If your assigned attendant experiences an unexpected emergency, our local city cluster dispatches a qualified backup within 90 minutes.",
  },
  {
    icon: IndianRupee,
    title: "Transparent Rates & GST Invoicing",
    description:
      "Zero hidden agency commissions or surprise placement fees. Upfront daily and monthly rates with official 18% GST tax invoices.",
  },
];

// Section D: How Care Works (Calm, 5-Step Sequence)
const CARE_JOURNEY_STEPS = [
  {
    step: "01",
    title: "Tell Us What Is Happening",
    description:
      "Share what your family is navigating. You don't need clinical terminology or a pre-selected package ready—just your family's circumstance.",
  },
  {
    step: "02",
    title: "Speak With Our Care Team",
    description:
      "A compassionate care coordinator discusses your loved one's specific mobility, routines, language preference, and comfort needs.",
  },
  {
    step: "03",
    title: "Understand Suitable Care Options",
    description:
      "We explain appropriate caregiver profiles, the distinction between supportive attendants and clinical nurses, and transparent daily rates.",
  },
  {
    step: "04",
    title: "Arrange Support If You Decide to Proceed",
    description:
      "Review background-checked caregiver profiles and verification dossiers before confirming. There is never high-pressure agency sales.",
  },
  {
    step: "05",
    title: "Stay Informed Through Daily Updates",
    description:
      "Receive scheduled daily WhatsApp updates documenting vitals, meal times, and routine comfort with direct supervisor access at all times.",
  },
];

// Section G: Authentic Family Stories & Case Studies
const AUTHENTIC_STORIES = [
  {
    situation: "Balancing Career Demands with an Aging Mother's Recovery",
    author: "Anand K.",
    relation: "Son (IT Director, Whitefield)",
    city: "Bengaluru",
    story:
      "Coordinating Amma's post-surgery recovery in Jayanagar while working across town in Whitefield was emotionally exhausting. The ApnaCare attendant didn't just help her walk safely—she sat with her, made warm rasam tea, and sent me WhatsApp vitals logs every morning so I could breathe at work.",
    careProvided: "12-Hour Daily Convalescent Attendant",
  },
  {
    situation: "Relieving Isolation for a Widowed Mother Living Alone",
    author: "Sravani M.",
    relation: "Daughter (Healthcare Professional)",
    city: "Hyderabad",
    story:
      "After my father passed away, my mother felt deeply isolated in our family home. ApnaCare matched a gentle Telugu-speaking companion who reads the morning newspaper with her, walks in the society garden, and helps her with video calls to my brother in Seattle.",
    careProvided: "Elderly Companionship & Errand Support",
  },
  {
    situation: "Restorative Healing Sleep During the Fourth Trimester",
    author: "Kavitha & Karthik",
    relation: "First-time Parents",
    city: "Chennai",
    story:
      "Welcoming our baby after a complicated C-section left both of us completely sleep-deprived. Having a calm, experienced maternal attendant take over night soothing, burping, and morning baby massage let me get 7 hours of restorative healing sleep each night.",
    careProvided: "Post-Natal Maternal & Infant Care",
  },
];

// Transparent Pricing Highlights
const PRICING_HIGHLIGHTS = [
  {
    title: "Day Shift Care",
    subtitle: "8 to 12 Hours Daytime",
    price: 1299,
    description: "Ideal for daily companionship, mobility assistance, medication routines, and meal assistance while family is at work.",
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
  const [activeMoment, setActiveMoment] = useState(0);
  const [attendantCity, setAttendantCity] = useState("All");

  // Auto-cycle hero visual gently every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMoment((prev) => (prev + 1) % HERO_CARE_MOMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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

  const currentMoment = HERO_CARE_MOMENTS[activeMoment]!;
  const waUrl = buildWhatsAppUrl(
    "Hello ApnaCare team! I would like to learn more about care options for my family.",
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (What ApnaCare does within 5 seconds)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/40 via-background to-background py-12 md:py-20 lg:py-24 border-b border-border/50">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Short copy, immediate clarity, dual CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Live Status Pill with Pulsing Indicator */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-3.5 py-1.5 text-xs font-semibold text-primary backdrop-blur animate-fade-in">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                  </span>
                  <span>Care Coordinator Available (Response time: &lt;15 mins)</span>
                </div>
              </div>

              {/* Main Empathetic Headline (Section A) */}
              <h1 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.14] animate-fade-up">
                You don’t have to carry the worry alone.
              </h1>

              {/* Supporting Empathetic Text (Section A) */}
              <p className="mt-4 max-w-xl text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed animate-fade-up animate-delay-100">
                When someone you love needs support, knowing where to begin can be difficult. ApnaCare helps you understand your options and find care suited to your family's needs.
              </p>

              {/* Action Buttons (Section A: Primary & Secondary CTAs) */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto animate-fade-up animate-delay-200">
                <Button asChild size="lg" className="rounded-full px-8 shadow-soft hover:shadow-lift transition-all min-h-[48px] font-bold">
                  <a href="#enquiry" onClick={() => track("hero_talk_care_team")}>
                    Talk to Our Care Team
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-7 min-h-[48px] font-semibold border-border bg-card/80 hover:bg-secondary">
                  <a href="#situations" onClick={() => track("hero_explore_care_support")}>
                    Explore Care Support
                  </a>
                </Button>
              </div>

              {/* Reassuring Trust Banner */}
              <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-medium text-muted-foreground animate-fade-up animate-delay-300">
                <span className="inline-flex items-center gap-1.5 text-foreground font-semibold">
                  <ShieldCheck className="size-4 text-primary" />
                  100% Police &amp; Identity Verified
                </span>
                <span className="inline-flex items-center gap-1.5 text-foreground font-semibold">
                  <Clock className="size-4 text-primary" />
                  90-Min Emergency Backup Guarantee
                </span>
                <span className="inline-flex items-center gap-1.5 text-foreground font-semibold">
                  <Star className="size-4 fill-terracotta text-terracotta" />
                  4.9★ (1,200+ South Indian Families)
                </span>
              </div>
            </div>

            {/* Right Column: Visual lifestyle card with gentle transitions */}
            <div className="lg:col-span-5 animate-fade-in animate-delay-200">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background decorative warm blob */}
                <div
                  className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-primary/15 via-terracotta/15 to-secondary/30 blur-xl opacity-75 -z-10"
                  aria-hidden
                />

                {/* Rounded Card Visual */}
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                    <img
                      src={currentMoment.image}
                      alt={currentMoment.alt}
                      width={800}
                      height={600}
                      loading="eager"
                      fetchPriority="high"
                      className="h-full w-full object-cover transition-opacity duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    {/* Tag badge top-left */}
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-xs backdrop-blur">
                        {currentMoment.badge}
                      </span>
                    </div>

                    {/* Verified badge top-right */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 px-2.5 py-1 text-[11px] font-semibold text-primary-foreground shadow-xs backdrop-blur">
                        <BadgeCheck className="size-3.5" />
                        Verified Staff
                      </span>
                    </div>

                    {/* Caption at bottom of image */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="font-semibold text-base sm:text-lg leading-snug">{currentMoment.title}</p>
                      <p className="text-xs text-white/85 mt-0.5 line-clamp-1">{currentMoment.caption}</p>
                    </div>
                  </div>

                  {/* Moment Switcher Tabs below image */}
                  <div className="grid grid-cols-4 border-t border-border bg-secondary/20 p-2">
                    {HERO_CARE_MOMENTS.map((m, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveMoment(idx)}
                        className={`rounded-xl py-2 px-1 text-center text-[11px] font-medium transition-all ${
                          idx === activeMoment
                            ? "bg-card text-foreground font-semibold shadow-xs"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {m.badge}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Floating Reassurance Callout Card */}
                <div className="mt-3 flex items-center justify-between rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-soft backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="grid size-9 place-items-center rounded-full bg-primary-soft text-primary">
                      <Clock className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Care Coordinator Online</p>
                      <p className="text-[11px] text-muted-foreground">Average response: &lt;15 mins</p>
                    </div>
                  </div>
                  <Link
                    to="/booking"
                    className="text-xs font-semibold text-primary hover:underline shrink-0"
                  >
                    Book Now →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          INTERACTIVE CARE NAVIGATOR WIZARD (4-Step Guided Finder)
      ───────────────────────────────────────────────────────────── */}
      <section id="care-navigator" className="container-page py-12 md:py-16 scroll-mt-20">
        <CareNavigatorWizard />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION B: RECOGNISE THE VISITOR'S SITUATION (Section B)
      ───────────────────────────────────────────────────────────── */}
      <section id="situations" className="border-b border-border/50 bg-secondary/25 py-16 md:py-24 scroll-mt-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Understanding Your Situation</p>
            <h2 className="mt-2 text-balance font-display text-3xl font-semibold md:text-4xl lg:text-5xl text-foreground">
              What’s happening in your family right now?
            </h2>
            <p className="mt-3 text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed">
              Care begins with understanding your unique situation. Select the circumstance closest to your family to explore suitable, verified support without sales pressure.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCE_PATHWAYS.map((path) => (
              <article
                key={path.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
              >
                <div>
                  {/* Visual Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={path.image}
                      alt={path.alt}
                      width={500}
                      height={312}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 left-2.5 rounded-full bg-background/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground backdrop-blur">
                      {path.tag}
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="mt-5 space-y-2">
                    <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {path.label}
                    </h3>
                    <div className="rounded-xl bg-secondary/50 p-2.5 text-xs text-foreground/90 font-medium">
                      <span className="text-[10px] uppercase font-bold text-terracotta tracking-wider block mb-0.5">Family Situation:</span>
                      {path.situation}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                      {path.description}
                    </p>
                  </div>
                </div>

                {/* Link Action */}
                <div className="mt-6 pt-4 border-t border-border">
                  <Link
                    to={path.link}
                    onClick={() => track("audience_pathway_click", { audience: path.id })}
                    className="inline-flex w-full items-center justify-between text-xs font-bold text-primary hover:underline group-hover:gap-2 transition-all min-h-[36px]"
                  >
                    <span>{path.actionText}</span>
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. FOUR PROMINENT VISUAL SERVICE CARDS
      ───────────────────────────────────────────────────────────── */}
      <section id="services" className="container-page py-16 md:py-24 scroll-mt-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Our Core Care Services</p>
          <h2 className="mt-2 text-balance text-3xl font-semibold md:text-4xl">
            Thoughtful Care, Tailored to Real Family Needs
          </h2>
          <p className="mt-3 text-pretty text-base text-muted-foreground">
            Explore verified care support delivered with warmth and dignity. Every attendant is background-checked and supported by our clinical coordination team.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_SERVICES.map((s) => (
            <article
              key={s.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
            >
              {/* Image with zoom on hover */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <img
                  src={s.image}
                  alt={s.alt}
                  width={600}
                  height={450}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold text-foreground backdrop-blur">
                  {s.tag}
                </span>
                <span className="absolute bottom-3 left-3 text-xs font-medium text-white/90">
                  {s.highlight}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-xl font-semibold text-foreground">{s.title}</h3>
                <p className="mt-1.5 text-xs font-semibold text-primary">{s.benefit}</p>
                
                {/* Intended Audience Tag */}
                <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-foreground/80 bg-secondary/60 rounded-lg px-2.5 py-1">
                  <span className="text-muted-foreground text-[10px] uppercase tracking-wide font-semibold">For:</span>
                  <span className="truncate">{s.audience}</span>
                </div>

                <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {s.description}
                </p>

                {/* Price pill */}
                <div className="mt-4 pt-3 border-t border-border flex items-baseline justify-between">
                  <span className="text-[11px] text-muted-foreground">Starting from</span>
                  <span className="font-display text-lg font-semibold text-foreground">
                    {formatINR(s.price)}
                    <span className="text-xs font-normal text-muted-foreground">/{s.unit}</span>
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2 pt-1">
                  <Button asChild variant="outline" size="sm" className="w-full justify-between group-hover:border-primary transition-colors min-h-[44px]">
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      onClick={() => track("service_card_click", { service: s.slug })}
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Services Link */}
        <div className="mt-8 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <span>Looking for women chauffeurs, travel companions, or specialized therapy? View all 11 services</span>
            <ChevronRight className="size-4" />
          </Link>
        </div>

        {/* ── Interactive Guided Care Discovery Engine ── */}
        <div className="mt-16">
          <GuidedCareDiscovery />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. INTERACTIVE LIFE MOMENTS: Tabbed Before/After Scenario Overhaul
      ───────────────────────────────────────────────────────────── */}
      <InteractiveLifeMoments />

      {/* ─────────────────────────────────────────────────────────────
          4. WHY FAMILIES CAN CONSIDER APNACARE (Verified Trust Information)
      ───────────────────────────────────────────────────────────── */}
      <section className="container-page py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Trust & Safety Standards</p>
          <h2 className="mt-2 text-balance text-3xl font-semibold md:text-4xl">
            Why Families Can Depend on ApnaCare
          </h2>
          <p className="mt-3 text-pretty text-base text-muted-foreground">
            Inviting someone into your home or hospital room requires absolute confidence. We maintain verifiable safety, medical competency, and service continuity standards.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_PILLARS.map((p, idx) => {
            const IconComponent = p.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-200 hover:border-primary/40 hover:shadow-lift"
              >
                <div className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <IconComponent className="size-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-8 rounded-2xl border border-primary/20 bg-primary-soft/50 p-4 md:p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-primary shrink-0" />
            <p className="text-xs text-foreground font-medium">
              Every active booking includes live coordinator oversight and complete 18% GST tax invoices with zero hidden agent fees.
            </p>
          </div>
          <Link
            to="/safety"
            className="text-xs font-semibold text-primary hover:underline shrink-0"
          >
            Learn more about our safety standards →
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          INTERACTIVE CAREGIVER SHOWCASE (Browse Attendants anchor: #attendants)
      ───────────────────────────────────────────────────────────── */}
      <CaregiverShowcase />

      {/* ─────────────────────────────────────────────────────────────
          SECTION D: HOW CARE WORKS (Calm, 5-Step Sequence)
      ───────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-secondary/25 py-16 md:py-24 border-y border-border/50 scroll-mt-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Our Approach</p>
            <h2 className="mt-2 text-balance font-display text-3xl font-semibold md:text-4xl lg:text-5xl text-foreground">
              A Calm, Guided Path to the Right Care
            </h2>
            <p className="mt-3 text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed">
              We believe in listening before recommending. Here is how we support your family through every step—transparently, patiently, and without sales pressure.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {CARE_JOURNEY_STEPS.map((step) => (
              <div
                key={step.step}
                className="relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
              >
                <div>
                  <span className="font-display text-3xl font-bold text-primary/40">
                    {step.step}
                  </span>
                  <h3 className="mt-3 text-base font-bold text-foreground leading-snug">{step.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 shadow-soft hover:shadow-lift font-bold">
              <a href="#enquiry">Talk to Our Care Team</a>
            </Button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
            >
              <MessageCircle className="size-4 text-[#25D366]" />
              Discuss on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          TRANSPARENT CARE COST & PRICING ESTIMATOR (anchor: #pricing)
      ───────────────────────────────────────────────────────────── */}
      <PricingEstimator />

      {/* ─────────────────────────────────────────────────────────────
          SECTION G: AUTHENTIC STORIES AND TESTIMONIALS
      ───────────────────────────────────────────────────────────── */}
      <section className="container-page py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow">Real Experiences</p>
          <h2 className="mt-2 text-balance font-display text-3xl font-semibold md:text-4xl lg:text-5xl text-foreground">
            Stories From Families Who Walked This Path
          </h2>
          <p className="mt-3 text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed">
            Every family circumstance is unique. Here is how thoughtful care coordination brought relief, dignity, and calm to families across South India.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {AUTHENTIC_STORIES.map((item, idx) => (
            <article
              key={idx}
              className="relative flex flex-col justify-between rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:shadow-lift hover:border-primary/40"
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-terracotta uppercase tracking-wider">
                    <Quote className="size-3.5" />
                    {item.situation}
                  </span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed italic">
                  "{item.story}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-foreground block">{item.author}</span>
                    <span className="text-muted-foreground text-[11px]">{item.relation} · {item.city}</span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-secondary/70 px-2.5 py-1 text-[11px] font-medium text-foreground/80">
                  <CheckCircle2 className="size-3 text-primary shrink-0" />
                  <span>Care Arranged: {item.careProvided}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Story Privacy Notice */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Client names and sensitive medical details are protected in accordance with healthcare privacy standards. Shared with permission from families.
        </p>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. SHORT FAQS (Clear, scannable accordion)
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-secondary/35 py-16 md:py-24 border-y border-border/50">
        <div className="container-page max-w-3xl">
          <div className="text-center">
            <p className="eyebrow">Clear Answers</p>
            <h2 className="mt-2 text-balance text-3xl font-semibold md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-pretty text-base text-muted-foreground">
              Everything you need to know about safety, verification, and our care coordination.
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
                ask us directly on WhatsApp
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION H: GENTLE CONVERSION & HUMAN-CENTRED ENQUIRY
      ───────────────────────────────────────────────────────────── */}
      <section id="enquiry" className="container-page py-16 md:py-24 scroll-mt-20">
        <div className="rounded-[2.5rem] bg-ink p-8 text-ink-foreground md:p-14 shadow-lift">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left Column: Reassurance & Direct Contacts */}
            <div>
              <span className="eyebrow text-terracotta">We Are Here For You</span>
              <h2 className="mt-3 max-w-lg text-balance font-display text-3xl font-semibold md:text-4xl lg:text-5xl text-white leading-tight">
                You don’t need to have everything figured out before asking for help.
              </h2>
              <p className="mt-4 max-w-md text-base sm:text-lg text-ink-foreground/80 leading-relaxed">
                Tell us what your family is going through. Our care team will help you understand the next steps—without pressure, judgment, or obligation.
              </p>

              {/* Direct Quick Contact Buttons */}
              <div className="mt-8 flex flex-wrap gap-3.5">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/20 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-[#25D366]/30 transition-colors shadow-soft"
                >
                  <MessageCircle className="size-4 text-[#25D366]" />
                  Chat on WhatsApp
                </a>
                <Button asChild size="lg" variant="outline" className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20">
                  <Link to="/booking">Direct Booking Available</Link>
                </Button>
              </div>

              {/* Verified Operating Coverage */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-white/70">
                <span className="flex items-center gap-1.5 font-medium text-white/90">
                  <Phone className="size-3.5 text-terracotta" />
                  Direct Helpline: {SITE.SUPPORT_PHONE}
                </span>
                <span>•</span>
                <span>Active in Bengaluru, Chennai, Hyderabad & Coimbatore</span>
              </div>
            </div>

            {/* Right Column: Embedded Immediate Callback Form */}
            <div className="rounded-2xl bg-background p-6 text-foreground shadow-lift">
              <EnquiryForm
                title="Tell Us What Is Happening"
                subtitle="Share your situation and our care team will contact you within 15 minutes to guide you gently."
                className="bg-transparent"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
