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
  HeartHandshake,
  Users,
  Check,
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
import { CareNavigator } from "@/components/site/CareNavigator";
import { CANONICAL_AUDIENCE_PATHWAYS, CANONICAL_CARE_OUTCOMES } from "@/data/taxonomy";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import hero6 from "@/assets/hero-6.jpg";
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

// The 4 prominent service discovery cards
const CORE_SERVICES = [
  {
    id: "elderly-care",
    slug: "elderly-care",
    title: "Elderly Care",
    benefit: "Support for the people who cared for you.",
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

// Visual Storytelling: Because Every Family Has a Story
const FAMILY_STORIES = [
  {
    category: "Working Professionals & Ageing Parents",
    headline: "Distance Shouldn't Mean Worrying Alone",
    sentence1:
      "Balancing demanding work schedules while living away from ageing parents is emotionally heavy when health needs arise.",
    sentence2:
      "ApnaCare connects your parents with trustworthy, gentle daily companionship and timely updates so you know they are never alone.",
    cta: "Explore Elderly Care",
    link: "/services/elderly-care",
    image: hero1,
    alt: "Warm companionship between caregiver and elderly lady",
  },
  {
    category: "Hospitalization & Post-Surgery",
    headline: "Relief When a Loved One is in Recovery",
    sentence1:
      "Hospital corridors and post-operative weeks place immense physical exhaustion on family members balancing office and childcare.",
    sentence2:
      "A dedicated ApnaCare bedside attendant stays vigilant around the clock, assisting with hygiene and comforting your loved one so you can recharge.",
    cta: "Explore Hospital Care",
    link: "/services/hospital-attendants",
    image: hero2,
    alt: "Patient receiving safe walking assistance after surgery",
  },
  {
    category: "Newborn Adjustments & Maternal Healing",
    headline: "Gentle Hands for the Early Days of Parenthood",
    sentence1:
      "Bringing a newborn home brings immense joy, but physical recovery and sleepless nights can leave new mothers overwhelmed without experienced help.",
    sentence2:
      "Our post-natal attendants handle gentle baby baths, feeding accompaniment, and soothing, ensuring the mother gets deep, restorative healing sleep.",
    cta: "Explore Post-Natal Care",
    link: "/services/post-natal-care",
    image: hero4,
    alt: "Caregiver tenderly tending to a newborn baby while supporting the mother",
  },
];

// Verified Trust Information
const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    title: "100% Police & Identity Verified",
    description:
      "Every attendant undergoes biometric Aadhaar verification, criminal court screening, and residential address checks before entering any home.",
  },
  {
    icon: BadgeCheck,
    title: "Clinical & Practical Care Training",
    description:
      "Comprehensive training in patient ergonomics, infection prevention, mobility transfer, and precise daily medication logging.",
  },
  {
    icon: Clock,
    title: "Guaranteed 90-Min Backup Protocol",
    description:
      "Never left without care. If your assigned attendant experiences an unexpected emergency, our local cluster dispatches a qualified backup within 90 minutes.",
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing & GST Invoicing",
    description:
      "No hidden agency commissions or surprise dispatch charges. Clear, upfront daily rates accompanied by official 18% GST tax invoices.",
  },
];

const AUDIENCE_IMAGES: Record<string, { image: string; alt: string }> = {
  "aud-elderly-parents": {
    image: hero1,
    alt: "Caregiver gently assisting an elderly lady at home",
  },
  "aud-post-hospital": {
    image: hero2,
    alt: "Attendant supporting a patient in recovery after hospital discharge",
  },
  "aud-new-mothers": {
    image: hero4,
    alt: "Experienced caregiver tenderly caring for newborn while mother rests",
  },
  "aud-travel-mobility": {
    image: hero5,
    alt: "Professional woman driver providing safe escorted transit",
  },
  "aud-everyday-care": {
    image: hero3,
    alt: "Caregiver helping senior with dignified everyday living routines",
  },
  "aud-family-coordinators": {
    image: hero6,
    alt: "Family coordinating care updates with supervisor peace of mind",
  },
};

// Section 6.6: Calm 5-step journey
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
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-3.5 py-1.5 text-xs font-semibold text-primary backdrop-blur animate-fade-in">
                <Sparkles className="size-3.5 text-terracotta" />
                <span>Human-Centered Care & Family Support</span>
              </div>

              {/* Main Headline */}
              <h1 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.14] animate-fade-up">
                Care that understands what your family needs.
              </h1>

              {/* Supporting Text */}
              <p className="mt-4 max-w-xl text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed animate-fade-up animate-delay-100">
                Finding support for someone you love can feel overwhelming. Start with what is happening, and explore the help that may be right for your family.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto animate-fade-up animate-delay-200">
                <Button asChild size="lg" className="rounded-full px-8 shadow-soft hover:shadow-lift transition-all min-h-[48px] font-bold">
                  <a href="#care-navigator" onClick={() => track("hero_find_right_support")}>
                    Find the Right Support
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-7 min-h-[48px] font-semibold border-border bg-card/80 hover:bg-secondary">
                  <a href="#enquiry" onClick={() => track("hero_talk_to_team")}>
                    Talk to Our Team
                  </a>
                </Button>
              </div>

              {/* Reassuring Quick Trust Metrics */}
              <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-medium text-muted-foreground animate-fade-up animate-delay-300">
                <span className="inline-flex items-center gap-1.5 text-foreground font-semibold">
                  <ShieldCheck className="size-4 text-primary" />
                  100% Police & Biometric Verification
                </span>
                <span className="inline-flex items-center gap-1.5 text-foreground font-semibold">
                  <BadgeCheck className="size-4 text-terracotta" />
                  Registered Nurses for Clinical Procedures
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4 text-primary" />
                  90-Min Guaranteed Backup Dispatch
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
                      <p className="text-xs font-semibold text-foreground">Immediate Assistance Available</p>
                      <p className="text-[11px] text-muted-foreground">Average care coordinator response: 15 mins</p>
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
          SECTION 6.2: AUDIENCE-FIRST DISCOVERY ("Who are you looking for support for?")
      ───────────────────────────────────────────────────────────── */}
      <section id="audiences" className="border-b border-border/50 bg-secondary/25 py-16 md:py-24 scroll-mt-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Audience Pathways</p>
            <h2 className="mt-2 text-balance font-display text-3xl font-semibold md:text-4xl lg:text-5xl text-foreground">
              Who are you looking for support for?
            </h2>
            <p className="mt-3 text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed">
              Start with the person and their life situation. Explore verified care pathways tailored to your family's circumstance.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CANONICAL_AUDIENCE_PATHWAYS.map((pathway) => {
              const meta = AUDIENCE_IMAGES[pathway.id] ?? { image: hero1, alt: pathway.title };
              return (
                <article
                  key={pathway.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
                >
                  <div>
                    {/* Visual Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted">
                      <img
                        src={meta.image}
                        alt={meta.alt}
                        width={600}
                        height={375}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold text-foreground backdrop-blur">
                        {pathway.eyebrow}
                      </span>
                    </div>

                    {/* Text Details */}
                    <div className="mt-5 space-y-2">
                      <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {pathway.title}
                      </h3>
                      <div className="rounded-xl bg-secondary/50 p-2.5 text-xs text-foreground/90 font-medium">
                        <span className="text-[10px] uppercase font-bold text-terracotta tracking-wider block mb-0.5">Family Situation:</span>
                        {pathway.situation}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                        <span className="font-semibold text-foreground/80">Desired Outcome:</span> {pathway.desiredOutcome}
                      </p>
                    </div>
                  </div>

                  {/* Link Action */}
                  <div className="mt-6 pt-4 border-t border-border">
                    <Link
                      to={pathway.ctaHref}
                      onClick={() => track("audience_pathway_click", { audience: pathway.id })}
                      className="inline-flex w-full items-center justify-between text-xs font-bold text-primary hover:underline group-hover:gap-2 transition-all min-h-[36px]"
                    >
                      <span>{pathway.ctaLabel}</span>
                      <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6.3: NEED-FIRST DISCOVERY (Care Navigator)
      ───────────────────────────────────────────────────────────── */}
      <CareNavigator />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6.4: HUMAN CARE OUTCOMES ("What Care Makes Possible")
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 border-b border-border/50 bg-background">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Meaningful Outcomes</p>
            <h2 className="mt-2 text-balance font-display text-3xl font-semibold md:text-4xl lg:text-5xl text-foreground">
              What Care Makes Possible
            </h2>
            <p className="mt-3 text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed">
              Care isn't just a list of tasks. It's about dignity, physical safety, and giving families back their peace of mind.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {CANONICAL_CARE_OUTCOMES.map((outcome) => (
              <div
                key={outcome.id}
                className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-200 hover:border-primary/40 hover:shadow-lift"
              >
                <div>
                  <div className="grid size-10 place-items-center rounded-2xl bg-primary-soft text-primary">
                    <HeartHandshake className="size-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-foreground leading-snug">
                    {outcome.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {outcome.shortDescription}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-border/60">
                  <p className="text-[11px] font-medium text-foreground/85 bg-secondary/50 rounded-lg p-2">
                    <span className="font-bold text-terracotta block text-[10px] uppercase">Intended Benefit:</span>
                    {outcome.intendedBenefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. FOUR PROMINENT VISUAL SERVICE CARDS
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
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
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
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. VISUAL STORYTELLING: “Because Every Family Has a Story”
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-secondary/35 py-16 md:py-24 border-y border-border/50">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">Visual Stories</p>
            <h2 className="mt-2 text-balance text-3xl font-semibold md:text-4xl">
              Because Every Family Has a Story.
            </h2>
            <p className="mt-3 text-pretty text-base text-muted-foreground">
              Real family moments that inspire our care mission every single day.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {FAMILY_STORIES.map((story, idx) => (
              <div
                key={idx}
                className="group flex flex-col rounded-3xl border border-border bg-card overflow-hidden shadow-soft transition-all duration-300 hover:shadow-lift"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <img
                    src={story.image}
                    alt={story.alt}
                    width={700}
                    height={440}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[11px] font-medium text-white/95 bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur">
                    Illustrative Scenario
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
                    {story.category}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-foreground leading-snug">
                    {story.headline}
                  </h3>
                  <div className="mt-3 space-y-2 flex-1">
                    <p className="text-xs text-muted-foreground leading-relaxed">{story.sentence1}</p>
                    <p className="text-xs text-foreground/90 leading-relaxed font-medium">{story.sentence2}</p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-border">
                    <Link
                      to={story.link}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline group-hover:gap-2 transition-all"
                    >
                      <span>{story.cta}</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Scenarios depict everyday care situations faced by families across South India.
          </p>
        </div>
      </section>

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
          VERIFIED ATTENDANTS DIRECTORY (Browse Attendants anchor: #attendants)
      ───────────────────────────────────────────────────────────── */}
      <section id="attendants" className="container-page py-16 md:py-24 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Verified Care Specialists</p>
            <h2 className="mt-2 text-balance text-3xl font-semibold md:text-4xl">
              Meet Our Verified Women Attendants
            </h2>
            <p className="mt-3 text-pretty text-base text-muted-foreground">
              Every caregiver is police-cleared, Aadhaar-verified, and certified for home and hospital assistance. Filter by city to view verified profiles and ratings.
            </p>
          </div>

          {/* Quick city filter */}
          <div className="flex flex-wrap gap-2 shrink-0" role="tablist" aria-label="Filter attendants by city">
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

        {/* Attendant Cards Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                      <h3 className="font-semibold text-foreground text-base truncate">{a.name}</h3>
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
                <div className="mt-4 rounded-xl bg-primary-soft/80 px-3 py-2 border border-primary/20 flex items-center gap-2">
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

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-border flex items-center gap-2">
                <Button asChild size="sm" className="w-full rounded-xl min-h-[44px]">
                  <Link
                    to="/booking"
                    search={{ service: a.services[0], city: a.city }}
                    onClick={() => track("attendant_request_click", { attendant: a.id })}
                  >
                    Request {a.name.split(" ")[0]}
                    <ArrowRight className="size-3.5 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Attendant Network Reassurance & Secondary Links */}
        <div className="mt-8 rounded-2xl border border-border bg-secondary/30 p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 text-foreground font-semibold">
              <ShieldCheck className="size-4 text-primary" />
              100% Police Verified
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-foreground font-semibold">
              <Clock className="size-4 text-primary" />
              90-Minute Guaranteed Backup Dispatch
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-foreground font-semibold">
              <CheckCircle2 className="size-4 text-primary" />
              Zero Direct Broker Surcharges
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link to="/become-an-attendant" className="text-primary hover:underline">
              Are you a care specialist? Join our team →
            </Link>
            <Link to="/attendant-login" className="text-muted-foreground hover:text-foreground">
              Attendant Portal Login →
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. SIMPLE THREE-STEP BOOKING EXPLANATION (anchor: #how-it-works)
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
          6. TRANSPARENT PRICING SECTION (Lower on the page, easy to find)
      ───────────────────────────────────────────────────────────── */}
      <section id="pricing" className="container-page py-16 md:py-24 scroll-mt-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Transparent Pricing</p>
          <h2 className="mt-2 text-balance text-3xl font-semibold md:text-4xl">
            Honest Rates with Zero Surprises
          </h2>
          <p className="mt-3 text-pretty text-base text-muted-foreground">
            Clear per-day and per-shift pricing. Includes statutory GST invoices and transparent caregiver compensation with no broker surcharges.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p
                className={`text-xs mt-0.5 ${
                  item.popular ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}
              >
                {item.subtitle}
              </p>

              <div className="mt-4 pt-3 border-t border-current/15">
                <span className="font-display text-3xl font-semibold">
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
                  className={`text-[11px] mt-0.5 ${
                    item.popular ? "text-primary-foreground/70" : "text-muted-foreground"
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
                  className="w-full"
                >
                  <Link to="/booking">Book Service</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-primary" /> Upfront rates before booking
          </span>
          <span className="flex items-center gap-1.5">
            <BadgeCheck className="size-4 text-primary" /> Official 18% GST invoice
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-primary" /> Free replacement within 90 mins
          </span>
        </div>
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
          SECTION 6.7: COMPASSIONATE FINAL CTA
      ───────────────────────────────────────────────────────────── */}
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
                subtitle="Share your family circumstance. A care coordinator will reach out gently within 15 minutes."
                className="bg-transparent"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
