import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BadgeCheck,
  Clock,
  HeartHandshake,
  IndianRupee,
  Pause,
  Play,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Copy,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  Radio,
  Zap,
  MessageCircle,
} from "lucide-react";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  SITE,
  SERVICES,
  PRICING_PLANS,
  ATTENDANTS,
  PROMOS,
  PROMO_ENDS_AT,
  ARTICLES,
  REVIEWS,
  CITIES,
  CATEGORIES,
  SAFETY_PILLARS,
  AUDIENCE_CHALLENGES,
  REAL_LIFE_STORIES,
  TRUST_VERIFICATION_STANDARDS,
  CARE_JOURNEY_STEPS,
  type ServiceCategory,
  formatINR,
  buildWhatsAppUrl,
} from "@/data/site";
import {
  SectionHeading,
  ServiceCard,
  PricingCard,
  AttendantCard,
  ArticleCard,
  CityCard,
} from "@/components/site/Cards";
import { BookLink, CallLink } from "@/components/site/Layout";
import { SOSDemoButton } from "@/components/site/SOS";
import { Countdown } from "@/components/site/Countdown";
import { savePromo } from "@/lib/promo";
import { track } from "@/lib/analytics";
import { seo } from "@/lib/seo";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import hero6 from "@/assets/hero-6.jpg";

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "ApnaCare — Trusted Women Attendants for Every Stage of Care",
      "Safe, police-verified and compassionate women attendants for elderly care, hospital assistance, nursing, post-natal care, women drivers and travel across South India.",
    ),
  component: Home,
});

const SLIDES = [
  {
    src: hero1,
    alt: "A compassionate woman attendant gently holding hands with a smiling elderly woman at home",
    caption: "Elderly Care & Home Companionship",
    heading: "Warm, Dignified Care for Your Loved Ones",
    sub: "Geriatric-certified women attendants providing 24/7 companionship, medication reminders, and mobility support.",
    cta: { label: "Book Elderly Care", service: "elderly-care" },
  },
  {
    src: hero2,
    alt: "An attendant assisting an elderly patient walk safely with a frame in a hospital recovery corridor",
    caption: "Hospital Bedside & Post-Surgical Support",
    heading: "Never Leave a Loved One Unattended in Hospital",
    sub: "Dedicated bedside attendants who coordinate with nurses, assist with hygiene, and keep you updated around the clock.",
    cta: { label: "Book Hospital Support", service: "hospital-attendants" },
  },
  {
    src: hero3,
    alt: "A professional woman chauffeur opening a vehicle door for an elderly woman at an airport terminal",
    caption: "Women Drivers & Airport Assistance",
    heading: "Safe, Reliable Women Drivers for Every Journey",
    sub: "Licensed and police-verified women chauffeurs for commutes, clinic visits, airport transfers, and outstation trips.",
    cta: { label: "Book a Driver", service: "women-drivers" },
  },
  {
    src: hero4,
    alt: "A certified female nurse gently taking vitals and checking blood pressure for a home patient",
    caption: "Clinical Home Nursing & Wound Care",
    heading: "Hospital-Grade Nursing in the Comfort of Home",
    sub: "Registered nurses with General Nursing and Midwifery (GNM) or B.Sc. Nursing credentials for wound care, injections, catheter management, and post-operative recovery.",
    cta: { label: "Book Nursing Services", service: "nursing-services" },
  },
  {
    src: hero5,
    alt: "A trained maternal care specialist tenderly swaddling a newborn baby while the mother rests",
    caption: "Post-Natal Maternal & Infant Recuperation",
    heading: "Cherished Support for New Mothers & Newborns",
    sub: "Experienced post-natal attendants for newborn massage, feeding guidance, and restorative rest for mothers.",
    cta: { label: "Book Post-Natal Care", service: "post-natal-care" },
  },
  {
    src: hero6,
    alt: "A verified woman security companion accompanying an executive safely through a busy transit hub",
    caption: "Protective Security & Safe Travel Mobility",
    heading: "Travel & Transit You Can Count On",
    sub: "Verified women companions for airport meet-and-greet, railway escorts, and end-to-end intercity journeys.",
    cta: { label: "Book Travel Support", service: "airport-pickup" },
  },
];

function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = SLIDES[i]!;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, [paused]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setI((x) => (x - 1 + SLIDES.length) % SLIDES.length);
      if (e.key === "ArrowRight") setI((x) => (x + 1) % SLIDES.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const prev = () => setI((x) => (x - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setI((x) => (x + 1) % SLIDES.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="ApnaCare care moments"
      className="relative isolate overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide images */}
      {SLIDES.map((s, idx) => (
        <img
          key={idx}
          src={s.src}
          alt={idx === i ? s.alt : ""}
          aria-hidden={idx !== i}
          width={1600}
          height={1008}
          loading={idx === 0 ? "eager" : "lazy"}
          fetchPriority={idx === 0 ? "high" : "low"}
          className={`absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center] transition-opacity duration-1000 ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 -z-10 hero-scrim" />

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 grid size-10 place-items-center rounded-full bg-primary-foreground/15 text-primary-foreground backdrop-blur hover:bg-primary-foreground/30 transition-colors md:left-8"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 grid size-10 place-items-center rounded-full bg-primary-foreground/15 text-primary-foreground backdrop-blur hover:bg-primary-foreground/30 transition-colors md:right-8"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="container-page flex min-h-[82vh] flex-col justify-center py-20 text-primary-foreground">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur">
            <Sparkles className="size-3.5 text-terracotta" />
            {slide.caption}
          </p>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl animate-fade-up">
            Caring for Your Loved Ones Shouldn't Mean Carrying Everything Alone.
          </h1>

          <p className="mt-5 max-w-xl text-lg text-primary-foreground/90 leading-relaxed animate-fade-up">
            Whether you are supporting ageing parents, recovering after a hospital stay, welcoming a newborn, or balancing work with family responsibilities, ApnaCare helps you find dependable care tailored to your family's needs.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Button asChild size="lg" variant="warm">
              <a href="#audience-challenges">
                Find the Right Care
              </a>
            </Button>
            <a
              href={buildWhatsAppUrl("Hi ApnaCare! I would like to speak to your care team about finding the right care for my family.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("hero_talk_care_team")}
              className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/20 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-[#25D366]/30 transition-colors"
            >
              <MessageCircle className="size-4 text-[#25D366]" />
              Talk to Our Care Team
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4 text-xs text-primary-foreground/80 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-terracotta" /> 100% Police & Biometric Screening
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-primary" /> Active in Bengaluru, Chennai, Hyderabad & Coimbatore
            </span>
          </div>
        </div>

        {/* Slide indicators & playback controls */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            {SLIDES.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Show slide ${idx + 1}: ${s.caption}`}
                aria-current={idx === i}
                className={`h-2 rounded-full transition-all ${
                  idx === i
                    ? "w-10 bg-primary-foreground"
                    : "w-4 bg-primary-foreground/40 hover:bg-primary-foreground/70"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            className="grid size-8 place-items-center rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/25 backdrop-blur transition-colors"
          >
            {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
          </button>

          <span className="text-xs font-semibold text-primary-foreground/80 tracking-wide uppercase">
            {i + 1} / {SLIDES.length}
          </span>
        </div>
      </div>
    </section>
  );
}

const TRUST = [
  { icon: BadgeCheck, label: "100% Biometric & Police Screening" },
  { icon: ShieldCheck, label: "Clear Attendant vs Nurse Scope" },
  { icon: CheckCircle2, label: "Verified Care Continuity" },
  { icon: MessageCircle, label: "Scheduled WhatsApp Updates" },
  { icon: IndianRupee, label: "Transparent GST Invoicing" },
];

const PILLARS = [
  {
    t: "Safety",
    d: "Every companion undergoes biometric Aadhaar checks, court screening, police verification, and is linked to real-time GPS tracking with an instant 24/7 SOS alert trigger.",
  },
  {
    t: "Reliability",
    d: "Punctual, background-checked attendants with a guaranteed 90-minute backup replacement dispatch, so your family's care schedule is never left compromised.",
  },
  {
    t: "Supportiveness",
    d: "Gentle bedside presence, active communication, patient understanding and medication reminders — preserving human dignity every single day.",
  },
  {
    t: "Trust",
    d: `${SITE.yearsOfService} years serving over 1,200+ families with upfront pricing you see before submitting, backed by full refund protection and 18% GST tax invoices.`,
  },
];

const JOURNEY_STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "Browse 11 specialized categories and explore transparent per-day or per-trip rates.",
  },
  {
    num: "02",
    title: "Select",
    desc: "Choose preferred service, location, language fluencies, and required shift hours.",
  },
  {
    num: "03",
    title: "Verify",
    desc: "Receive and preview verified digital attendant profiles with credentials and certifications.",
  },
  {
    num: "04",
    title: "Book",
    desc: "Submit your reservation with transparent GST pricing, zero hidden fees, and instant confirmation.",
  },
  {
    num: "05",
    title: "Assign",
    desc: "Your dedicated woman attendant arrives punctually with supervisor coordination.",
  },
  {
    num: "06",
    title: "Support",
    desc: "Live shift check-in tracking, WhatsApp updates to family, and 24/7 control room telemetry.",
  },
  {
    num: "07",
    title: "Complete",
    desc: "Shift completion report, transparent rating submission, and effortless schedule renewal.",
  },
];

function RecommendationEngine() {
  const [recipient, setRecipient] = useState<
    "elder" | "hospital" | "maternal" | "travel" | "driver"
  >("elder");
  const [duration, setDuration] = useState<"day" | "livein" | "trip">("day");

  const recommendations = {
    elder: {
      name: "Senior Home Companionship & Care",
      serviceSlug: "elderly-care",
      price: duration === "livein" ? "₹2,499/day (24-hr live-in)" : "₹1,299/day (8-12 hrs)",
      points: [
        "Dedicated elderly care specialist with geriatric certification",
        "Medicine schedules, walking assistance & vitals logging",
        "Daily WhatsApp wellness updates to family",
      ],
    },
    hospital: {
      name: "Hospital Bedside & Staff Coordination",
      serviceSlug: "hospital-attendants",
      price: duration === "livein" ? "₹2,799/day (24-hr bedside)" : "₹1,499/day (12 hrs)",
      points: [
        "Continuous bedside vigil in inpatient rooms",
        "Assistance with hygiene, call-bell, and pharmacy errands",
        "Smooth handover between day and night nursing shifts",
      ],
    },
    maternal: {
      name: "Maternal Recuperation & Infant Care",
      serviceSlug: "post-natal-care",
      price: duration === "livein" ? "₹3,499/day (24-hr care)" : "₹1,999/day (12 hrs)",
      points: [
        "Certified infant massage, warm bath, and latch support",
        "Restorative night care so new mothers heal properly",
        "Post-delivery nutrition and hygiene supervision",
      ],
    },
    travel: {
      name: "Safe Transit & Gate-to-Gate Companion",
      serviceSlug: "airport-pickup",
      price: "₹999/trip (Airport) · ₹1,599/day (Outstation)",
      points: [
        "Arrival gate meet-and-greet with luggage assistance",
        "Live GPS tracking link shared directly with family",
        "Coordination with airline wheelchair ground teams",
      ],
    },
    driver: {
      name: "Professional Women Chauffeur",
      serviceSlug: "women-drivers",
      price: "₹1,199/day (8 hrs) · ₹1,799 (Outstation)",
      points: [
        "Licensed commercial chauffeuse with clean traffic records",
        "Defensive driving certified with emergency protocol training",
        "Safe escort for late-night city errands or elder clinics",
      ],
    },
  };

  const rec = recommendations[recipient];

  return (
    <div className="mt-12 rounded-3xl border border-border bg-card p-8 md:p-12 shadow-soft">
      <div className="grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <span className="eyebrow text-terracotta">Interactive Matcher</span>
          <h3 className="mt-2 text-2xl font-semibold md:text-3xl">
            Find the Perfect Care Package in 2 Clicks
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Tell us who needs assistance, and our matching logic immediately calculates the optimal
            caregiver profile and transparent rate.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                1. Who requires care?
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  { id: "elder", label: "Aging Parent / Elder" },
                  { id: "hospital", label: "Patient in Hospital" },
                  { id: "maternal", label: "Mother & Newborn" },
                  { id: "travel", label: "Solo / Elder Traveler" },
                  { id: "driver", label: "Daily Chauffeur" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      setRecipient(
                        item.id as "elder" | "hospital" | "maternal" | "travel" | "driver",
                      )
                    }
                    className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                      recipient === item.id
                        ? "bg-primary text-primary-foreground shadow-2xs"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                2. Shift Type
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  { id: "day", label: "Day Shift (8-12 hrs)" },
                  { id: "livein", label: "24-Hour Live-In" },
                  { id: "trip", label: "Transit / Trip Only" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDuration(item.id as "day" | "livein" | "trip")}
                    className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                      duration === item.id
                        ? "bg-terracotta text-terracotta-foreground shadow-2xs"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/30 bg-primary-soft/40 p-6 md:p-8">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground uppercase tracking-wider">
            Recommended Care Package
          </span>
          <h4 className="mt-4 font-display text-2xl font-bold text-foreground">{rec.name}</h4>
          <p className="mt-2 text-xl font-semibold text-primary">{rec.price}</p>

          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            {rec.points.map((pt) => (
              <li key={pt} className="flex items-start gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="default" className="flex-1">
              <Link to="/booking" search={{ service: rec.serviceSlug }}>
                Book This Package
              </Link>
            </Button>
            <Button asChild variant="outline" size="default">
              <Link to="/services/$slug" params={{ slug: rec.serviceSlug }}>
                View Full Details
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [selectedCat, setSelectedCat] = useState<"all" | ServiceCategory>("all");
  const filteredServices = SERVICES.filter(
    (s) => selectedCat === "all" || s.category === selectedCat,
  );
  const waUrl = buildWhatsAppUrl(
    "Hi ApnaCare! I would like to speak to your care team about finding the right care for my family."
  );

  return (
    <>
      <Hero />

      {/* Trust & Standards Bar */}
      <section aria-label="Trust indicators" className="border-b border-border bg-card">
        <ul className="container-page grid grid-cols-2 gap-4 py-6 md:grid-cols-5">
          {TRUST.map((t) => (
            <li key={t.label} className="flex items-center gap-3 text-sm font-semibold">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary shadow-2xs">
                <t.icon className="size-5" aria-hidden />
              </span>
              <span>{t.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION B: Audience-Based Problem Discovery */}
      <section id="audience-challenges" className="container-page py-20 md:py-28 scroll-mt-20">
        <SectionHeading
          center
          eyebrow="Who We Support"
          title="Every Family Faces Different Care Challenges."
          sub="We understand what your family is going through. Explore tailored support designed around your real-life situation."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AUDIENCE_CHALLENGES.map((item) => (
            <div
              key={item.id}
              className={`card-soft p-7 flex flex-col justify-between border transition-all hover:border-primary/50 hover:shadow-soft ${
                item.isFutureInitiative ? "bg-secondary/15" : ""
              }`}
            >
              <div>
                <span className="inline-block rounded-full bg-terracotta/15 px-3 py-1 text-xs font-bold text-terracotta">
                  {item.badge}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-foreground leading-snug">
                  {item.audience}
                </h3>

                <div className="mt-5 space-y-3.5 text-sm">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Does this sound familiar?
                    </p>
                    <p className="mt-1 text-foreground/90 leading-relaxed bg-background/60 p-3 rounded-xl border border-border/60">
                      {item.situation}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-terracotta">
                      Why this becomes difficult
                    </p>
                    <p className="mt-1 text-muted-foreground leading-relaxed">
                      {item.difficulty}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-destructive/80">
                      What can happen without support?
                    </p>
                    <p className="mt-1 text-muted-foreground leading-relaxed">
                      {item.whyItMatters}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-border flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold text-primary block">
                    {item.isFutureInitiative ? "Educational Guidance" : `Service: ${item.serviceName}`}
                  </span>
                </div>
                <Button asChild variant={item.isFutureInitiative ? "outline" : "warm"} size="sm">
                  <Link to={item.ctaLink as any}>
                    {item.ctaText} →
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION C: Real-Life Challenges Section */}
      <section className="border-y border-border bg-secondary/25 py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Real-Life Situations"
            title="Behind Every Care Request, There Is a Story."
            sub="Real situations we see every day — and how dependable care makes a meaningful difference."
          />

          <div className="mt-4 mx-auto max-w-2xl text-center">
            <p className="text-xs text-muted-foreground/80 italic">
              Note: The scenarios below represent illustrative family situations based on everyday care coordination challenges. ApnaCare does not publish fabricated customer testimonials or unverified patient claims.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {REAL_LIFE_STORIES.map((story) => (
              <div
                key={story.id}
                className="card-soft p-8 flex flex-col justify-between border border-border/80 hover:border-primary/40 transition-all hover:shadow-soft"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 pb-3">
                    <span className="text-xs font-bold text-terracotta uppercase tracking-wider">
                      {story.tag}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {story.persona}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold text-foreground">
                    {story.title}
                  </h3>

                  <div className="mt-5 space-y-4 text-sm">
                    <div className="bg-background/80 p-4 rounded-2xl border border-border/60">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Does this sound familiar?
                      </p>
                      <p className="text-foreground/90 leading-relaxed">
                        {story.situation}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-terracotta mb-1">
                        Why this becomes difficult
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {story.difficulty.replace(/^Why this becomes difficult:\s*/i, "")}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-destructive/80 mb-1">
                        What can happen without support?
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {story.implication.replace(/^What can happen without support:\s*/i, "")}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border/60">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                        How ApnaCare helps
                      </p>
                      <p className="text-foreground leading-relaxed">
                        {story.solution.replace(/^How ApnaCare helps:\s*/i, "")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-7 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Relevant service: {story.relatedServiceName}
                  </span>
                  <Button asChild variant="outline" size="sm">
                    <Link to={story.ctaLink as any}>
                      Explore This Solution →
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION D: How ApnaCare Helps (5-Step Customer Journey) */}
      <section id="how-it-works" className="container-page py-20 md:py-28 scroll-mt-20">
        <SectionHeading
          center
          eyebrow="Our Care Journey"
          title="How ApnaCare Helps Your Family"
          sub="A simple, reassuring care journey from your initial enquiry to verified daily care."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {CARE_JOURNEY_STEPS.map((step) => (
            <div
              key={step.step}
              className="card-soft p-6 flex flex-col justify-between border border-border/80 hover:border-primary/40 transition-all hover:shadow-soft relative"
            >
              <div>
                <span className="font-display text-3xl font-bold text-primary/70">
                  {step.step}
                </span>
                <h4 className="mt-4 text-lg font-semibold text-foreground leading-snug">
                  {step.title}
                </h4>
                <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <BookLink size="lg" variant="warm">
            Start Your Care Request Now
          </BookLink>
        </div>
      </section>

      {/* SECTION E: Trust and Safety Standards */}
      <section id="safety" className="border-t border-border bg-ink py-20 text-ink-foreground md:py-28 scroll-mt-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <span className="eyebrow text-terracotta">Safety, Trust & Clear Boundaries</span>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl text-ink-foreground">
              We Believe Families Deserve Complete Transparency
            </h2>
            <p className="mt-4 text-base md:text-lg text-ink-foreground/80 leading-relaxed">
              Caregiving is built on trust. We are explicit about how our caregivers are vetted, the clear scope of attendant practice vs registered nursing, and our daily family communication standards.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TRUST_VERIFICATION_STANDARDS.map((std, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur hover:bg-white/10 transition-colors"
              >
                <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  {std.badge}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {std.title}
                </h3>
                <p className="mt-3 text-sm text-ink-foreground/80 leading-relaxed">
                  {std.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4 pt-4 border-t border-white/10">
            <Button asChild variant="glass">
              <Link to="/safety">Read Complete Verification Process</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/15">
              <Link to="/safety-guidelines">Attendant Scope & Guidelines</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION F: Service Discovery */}
      <section id="services" className="container-page py-20 md:py-28 scroll-mt-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Service Directory"
            title="Available Care Services"
            sub="Prioritising elderly care, hospital bedside vigils, qualified clinical nursing, and post-natal support."
          />
          <Button asChild variant="outline">
            <Link to="/services">View All 11 Services</Link>
          </Button>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCat(cat.id);
                track("service_filter", { category: cat.id });
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                selectedCat === cat.id
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.slice(0, 6).map((s) => (
            <ServiceCard key={s.id} s={s} />
          ))}
        </div>

        {filteredServices.length > 6 && (
          <div className="mt-10 text-center">
            <Button asChild variant="warm" size="lg">
              <Link to="/services">Explore All {SERVICES.length} Services</Link>
            </Button>
          </div>
        )}
      </section>

      {/* Interactive Personalized Matcher */}
      <section className="container-page pb-20 md:pb-28">
        <RecommendationEngine />
      </section>

      {/* SECTION G: Pricing (Separate and Secondary) */}
      <section
        id="pricing"
        className="border-t border-border bg-secondary/20 py-20 md:py-28 scroll-mt-20"
        onMouseEnter={() => track("pricing_view")}
      >
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Transparent Pricing"
            title="Clear, Upfront Pricing With No Surprises"
            sub="Find starting prices for daytime shifts, overnight bedside care, and 24-hour live-in support. Transparent pricing with 18% statutory GST tax invoices and full refund protection prior to dispatch."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {PRICING_PLANS.map((p) => (
              <PricingCard key={p.id} p={p} />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-primary" /> Transparent Rates Disclosed Upfront
            </span>
            <span className="flex items-center gap-1.5">
              <BadgeCheck className="size-4 text-primary" /> 18% Statutory GST Tax Invoice Provided
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-primary" /> Refund Protection Prior to Care Dispatch
            </span>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              Need custom multi-week rates or hospital coordination?{" "}
              <Link to="/contact" className="text-primary font-semibold hover:underline">
                Speak with our care coordinators
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Verified Attendants Section */}
      <section id="attendants" className="container-page py-20 md:py-28 scroll-mt-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Our Verified Caregivers"
            title="Meet Our Attendant Specialists"
            sub="Caregivers and chauffeuses with verified police clearance, practical patient care diplomas, and verified reviews."
          />
          <Button asChild variant="outline">
            <Link to="/booking">Request an Attendant</Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ATTENDANTS.slice(0, 3).map((a) => (
            <AttendantCard key={a.id} a={a} />
          ))}
        </div>
      </section>

      {/* Integrated Emergency SOS Component */}
      <section id="sos" className="container-page pb-20 md:pb-28 scroll-mt-20">
        <div className="grid items-center gap-10 rounded-[2.5rem] border border-sos/25 bg-card p-8 shadow-soft md:p-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="eyebrow text-sos">Rapid Response Feature</span>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              24/7 Command SOS & Alert Protocol
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Every active booking is backed by our centralized coordination desk. In any crisis, an instant alert triggers emergency escalation, notifies designated family contacts, and coordinates appropriate support.
            </p>
            <ul className="mt-6 grid gap-2.5 text-sm sm:grid-cols-2">
              {[
                "Instant Emergency alert trigger",
                "Automated notification to family contacts",
                "24/7 dedicated care desk coordination",
                "Direct contact with local responders when needed",
              ].map((x) => (
                <li key={x} className="flex items-center gap-2 font-medium">
                  <ShieldCheck className="size-4 shrink-0 text-primary" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <div
              className="grid size-32 place-items-center rounded-full bg-sos text-sos-foreground animate-sos font-display text-3xl font-bold shadow-lift"
              aria-hidden
            >
              SOS
            </div>
            <SOSDemoButton />
            <p className="text-xs text-muted-foreground">
              Simulation only — no real emergency responders will be dispatched.
            </p>
          </div>
        </div>
      </section>

      {/* Client Reviews */}
      <section className="container-page py-20 md:py-28">
        <SectionHeading
          center
          eyebrow="Verified Testimonials"
          title="Trusted by 1,200+ Families Across South India"
          sub="Read genuine feedback from sons, daughters, and mothers who depend on ApnaCare daily."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <figure key={r.id} className="card-soft flex flex-col justify-between p-8">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1" aria-label={`${r.rating} out of 5 stars`}>
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-terracotta text-terracotta" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary">
                    <BadgeCheck className="size-3.5" /> Verified Booking
                  </span>
                </div>
                <blockquote className="mt-5 text-base leading-relaxed text-foreground">
                  “{r.testimonial}”
                </blockquote>
              </div>
              <figcaption className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">
                  {r.relation} · {r.location} · {r.service}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Problem-Led Knowledge Hub Preview */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Knowledge & Guidance"
              title="Guides for Family Well-Being"
              sub="Helpful, problem-led guides on eldercare coordination, questions for bedside attendants, and home preparation after hospital discharge."
            />
            <Button asChild variant="outline">
              <Link to="/knowledge-hub">Browse All Guides</Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.slice(0, 6).map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Active Operating Cities */}
      <section className="container-page py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Active Coverage"
            title="Operating Cities Across South India"
            sub="Dedicated care coordination hubs and vetted attendant clusters in Bengaluru, Chennai, Hyderabad, and Coimbatore."
          />
          <Button asChild variant="outline">
            <Link to="/cities">View All Cities</Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CITIES.map((c) => (
            <CityCard key={c.slug} c={c} />
          ))}
        </div>
      </section>

      {/* SECTION H: Final CTA */}
      <section id="enquiry" className="container-page pb-20 pt-10 md:pb-28">
        <div className="rounded-[3rem] bg-ink p-10 text-ink-foreground md:p-16">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="eyebrow text-terracotta">We Are Here For You</span>
              <h2 className="mt-3 max-w-lg text-balance text-4xl font-semibold md:text-5xl text-white">
                You Don't Have to Figure Out Care on Your Own.
              </h2>
              <p className="mt-4 max-w-md text-lg text-ink-foreground/80 leading-relaxed">
                Tell us what your family needs. Our team can help you explore the available care options and find dependable, compassionate support.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <BookLink size="lg" variant="warm">
                  Find the Right Care
                </BookLink>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/20 px-6 py-3.5 text-base font-semibold text-white backdrop-blur hover:bg-[#25D366]/30 transition-colors"
                >
                  <MessageCircle className="size-5 text-[#25D366]" />
                  Talk to Us on WhatsApp
                </a>
              </div>
            </div>
            <EnquiryForm
              title="Tell Us About Your Care Needs"
              subtitle="Share your requirements and a dedicated care coordinator will get in touch within 2 hours."
              className="bg-background text-foreground"
            />
          </div>
        </div>
      </section>
    </>
  );
}
