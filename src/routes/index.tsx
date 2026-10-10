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
  Radio,
  Zap,
} from "lucide-react";
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
  type ServiceCategory,
  formatINR,
} from "@/data/site";
import { SectionHeading, ServiceCard, PricingCard, AttendantCard, ArticleCard, CityCard } from "@/components/site/Cards";
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
      "Safe, police-verified and compassionate women attendants for elderly care, hospital assistance, nursing, post-natal care, women drivers and travel across South India."
    ),
  component: Home,
});

const SLIDES = [
  {
    src: hero1,
    alt: "A compassionate woman attendant gently holding hands with a smiling elderly woman at home",
    caption: "Elderly Care & Home Companionship",
  },
  {
    src: hero2,
    alt: "An attendant assisting an elderly patient walk safely with a frame in a hospital recovery corridor",
    caption: "Hospital Bedside & Post-Surgical Support",
  },
  {
    src: hero3,
    alt: "A professional woman chauffeur opening a vehicle door for an elderly woman at an airport terminal",
    caption: "Women Drivers & Airport Assistance",
  },
  {
    src: hero4,
    alt: "A certified female nurse gently taking vitals and checking blood pressure for a home patient",
    caption: "Clinical Home Nursing & Wound Care",
  },
  {
    src: hero5,
    alt: "A trained maternal care specialist tenderly swaddling a newborn baby while the mother rests",
    caption: "Post-Natal Maternal & Infant Recuperation",
  },
  {
    src: hero6,
    alt: "A verified woman security companion accompanying an executive safely through a busy transit hub",
    caption: "Protective Security & Safe Travel Mobility",
  },
];

function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="ApnaCare care moments"
      className="relative isolate overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((s, idx) => (
        <img
          key={idx}
          src={s.src}
          alt={idx === i ? s.alt : ""}
          aria-hidden={idx !== i}
          width={1600}
          height={1008}
          className={`absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center] transition-opacity duration-1000 ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 -z-10 hero-scrim" />

      <div className="container-page flex min-h-[82vh] flex-col justify-center py-20 text-primary-foreground">
        <div className="max-w-2xl animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur">
            <Sparkles className="size-3.5 text-terracotta" />
            Premium care for every stage
          </p>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            Trusted Women Attendants for Every Stage of Care
          </h1>

          <p className="mt-5 max-w-xl text-lg text-primary-foreground/85 leading-relaxed">
            Safe, verified and compassionate support for elderly care, hospital assistance, nursing, post-natal recovery, and secure travel mobility.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <BookLink size="lg" variant="warm">
              Book a Service
            </BookLink>
            <CallLink variant="glass" className="h-13 px-7 text-base" />
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-primary-foreground/75 font-medium">
            <ShieldCheck className="size-4 text-terracotta" />
            <span>Active in Bengaluru, Chennai, Hyderabad & Coimbatore · &lt; 20m dispatch</span>
          </div>
        </div>

        {/* Carousel slide indicator & playback controls */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            {SLIDES.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Show slide ${idx + 1}: ${s.caption}`}
                aria-current={idx === i}
                className={`h-2 rounded-full transition-all ${
                  idx === i ? "w-10 bg-primary-foreground" : "w-4 bg-primary-foreground/40 hover:bg-primary-foreground/70"
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
            {SLIDES[i]?.caption}
          </span>
        </div>
      </div>
    </section>
  );
}

const TRUST = [
  { icon: BadgeCheck, label: "100% Verified Attendants" },
  { icon: ShieldCheck, label: "Police Record Cleared" },
  { icon: IndianRupee, label: "Transparent Pricing" },
  { icon: Clock, label: "24/7 Command Support" },
  { icon: HeartHandshake, label: `${SITE.yearsOfService} Years of Service` },
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
  { num: "01", title: "Discover", desc: "Browse 11 specialized categories and explore transparent per-day or per-trip rates." },
  { num: "02", title: "Select", desc: "Choose preferred service, location, language fluencies, and required shift hours." },
  { num: "03", title: "Verify", desc: "Receive and preview verified digital attendant profiles with credentials and certifications." },
  { num: "04", title: "Book", desc: "Submit your reservation with transparent GST pricing, zero hidden fees, and instant confirmation." },
  { num: "05", title: "Assign", desc: "Your dedicated woman attendant arrives punctually with supervisor coordination." },
  { num: "06", title: "Support", desc: "Live shift check-in tracking, WhatsApp updates to family, and 24/7 control room telemetry." },
  { num: "07", title: "Complete", desc: "Shift completion report, transparent rating submission, and effortless schedule renewal." },
];

function RecommendationEngine() {
  const [recipient, setRecipient] = useState<"elder" | "hospital" | "maternal" | "travel" | "driver">("elder");
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
          <h3 className="mt-2 text-2xl font-semibold md:text-3xl">Find the Perfect Care Package in 2 Clicks</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Tell us who needs assistance, and our matching logic immediately calculates the optimal caregiver profile and transparent rate.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">1. Who requires care?</label>
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
                    onClick={() => setRecipient(item.id as any)}
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
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">2. Shift Type</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  { id: "day", label: "Day Shift (8-12 hrs)" },
                  { id: "livein", label: "24-Hour Live-In" },
                  { id: "trip", label: "Transit / Trip Only" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDuration(item.id as any)}
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
    (s) => selectedCat === "all" || s.category === selectedCat
  );

  return (
    <>
      <Hero />

      {/* Trust Bar */}
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

      {/* Why Families Trust ApnaCare */}
      <section className="container-page py-20 md:py-28">
        <SectionHeading
          eyebrow="Why ApnaCare"
          title="Why Families Trust ApnaCare"
          sub="Our company is built on absolute dedication to family reassurance. We set the highest standards for safety, reliability, and compassionate care."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, n) => (
            <div key={p.t} className="card-soft p-7 transition-all hover:border-primary/40 hover:shadow-lift">
              <p className="font-display text-sm font-bold text-terracotta">0{n + 1}</p>
              <h3 className="mt-3 text-2xl font-semibold">{p.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works (Customer Journey) */}
      <section className="border-y border-border bg-secondary/30 py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="How It Works"
            title="A Seamless, Reassuring Care Journey"
            sub="From initial service discovery to live shift management and emergency escalation — arranged in minutes."
          />

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY_STEPS.slice(0, 4).map((step) => (
              <div key={step.num} className="card-soft p-6 relative">
                <span className="font-display text-2xl font-bold text-primary/70">{step.num}</span>
                <h4 className="mt-3 text-xl font-semibold">{step.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {JOURNEY_STEPS.slice(4).map((step) => (
              <div key={step.num} className="card-soft p-6 relative">
                <span className="font-display text-2xl font-bold text-terracotta">{step.num}</span>
                <h4 className="mt-3 text-xl font-semibold">{step.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded Services with Interactive Category Switcher */}
      <section className="container-page py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Our Care Portfolio"
            title="Complete Directory of 11 Care Services"
            sub="Women-led attendant solutions across Home, Healthcare, Travel, Security, and Lifestyle support."
          />
          <Button asChild variant="outline">
            <Link to="/services">View Service Directory</Link>
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

      {/* Personalized Matcher Engine */}
      <section className="container-page pb-20 md:pb-28">
        <RecommendationEngine />
      </section>

      {/* Transparent Pricing */}
      <section className="border-t border-border bg-secondary/20 py-20 md:py-28" onMouseEnter={() => track("pricing_view")}>
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Pricing"
            title="Transparent, Upfront Pricing"
            sub="Clear, honest rates with zero hidden charges. 18% GST tax invoicing included, with full refund protection before dispatch."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {PRICING_PLANS.map((p) => (
              <PricingCard key={p.id} p={p} />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-primary" /> Guaranteed No Hidden Charges</span>
            <span className="flex items-center gap-1.5"><BadgeCheck className="size-4 text-primary" /> 18% GST Invoicing Included</span>
            <span className="flex items-center gap-1.5"><Zap className="size-4 text-primary" /> Full Refund Protection Before Dispatch</span>
          </div>
        </div>
      </section>

      {/* Safety & Vetting Pillars */}
      <section className="bg-primary py-20 text-primary-foreground md:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-terracotta">Safety & Vetting</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight">Our Standard is Uncompromising Trust</h2>
            <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
              Every single ApnaCare attendant passes multi-step background checks, biometric authentication, state police clearance, and accredited clinical safety certifications.
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild variant="glass">
                <Link to="/safety">How We Verify Attendants</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/15">
                <Link to="/safety-guidelines">Safety Guidelines</Link>
              </Button>
            </div>
          </div>

          <ul className="grid gap-3.5 sm:grid-cols-2">
            {[
              "Biometric Aadhaar Authentication",
              "100% Police Record Verification",
              "Court & Criminal Screening",
              "BLS First Aid Certification",
              "Live GPS Shift Telemetry",
              "24/7 Command SOS Dispatch",
            ].map((x) => (
              <li key={x} className="flex items-center gap-3 rounded-2xl bg-primary-foreground/10 p-4 font-medium backdrop-blur">
                <ShieldCheck className="size-5 text-terracotta shrink-0" aria-hidden />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Meet Our Attendants */}
      <section className="container-page py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Our Verified People"
            title="Meet Our Attendant Specialists"
            sub="Real caregivers and chauffeuses with verified police clearance, patient care diplomas, and top client ratings."
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
      <section className="container-page pb-20 md:pb-28">
        <div className="grid items-center gap-10 rounded-[2.5rem] border border-sos/25 bg-card p-8 shadow-soft md:p-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="eyebrow text-sos">Rapid Response</span>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Integrated 24/7 Emergency SOS</h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Every booking is linked to our centralized Command Desk. In any crisis, an instant panic-button triggers real-time GPS telemetry, alerts designated kin, and coordinates emergency response.
            </p>
            <ul className="mt-6 grid gap-2.5 text-sm sm:grid-cols-2">
              {[
                "Instant Emergency SOS alert trigger",
                "Automated SMS/Email to kin contacts",
                "24/7 dedicated control room monitoring",
                "Live shift tracking via secure GPS link",
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

      {/* Promotions & Bundles */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Special Offers"
              title="Exclusive Care Bundles"
              sub="Combine complementary care services to maximize family safety while unlocking discounted pricing."
            />
            {PROMO_ENDS_AT && <Countdown endsAt={PROMO_ENDS_AT} />}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PROMOS.map((p) => (
              <div
                key={p.code}
                className="card-soft flex flex-col justify-between p-8"
                onMouseEnter={() => track("promo_view", { code: p.code })}
              >
                <div>
                  <span className="w-fit rounded-full bg-terracotta px-3 py-1 text-xs font-bold text-terracotta-foreground">
                    {p.label}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.includes}</p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-border">
                  <code className="rounded-xl border border-dashed border-primary bg-primary-soft/50 px-4 py-2 font-mono text-sm font-bold text-primary">
                    {p.code}
                  </code>
                  <Button
                    onClick={() => {
                      navigator.clipboard?.writeText(p.code);
                      savePromo(p.code);
                      track("promo_apply", { code: p.code });
                      toast.success(`${p.code} applied! Discount will appear on your booking summary.`);
                    }}
                    className="gap-2"
                  >
                    <Copy className="size-4" /> Copy & Apply Promo
                  </Button>
                </div>
              </div>
            ))}
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
                <p className="text-xs text-muted-foreground">{r.relation} · {r.location} · {r.service}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Knowledge Hub Preview */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Knowledge & Resources"
              title="Guides for Family Well-Being"
              sub="Practical handbooks on senior citizen government schemes, women travel safety, and elder home care."
            />
            <Button asChild variant="outline">
              <Link to="/knowledge-hub">Browse Knowledge Hub</Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ARTICLES.slice(0, 4).map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Cities Coverage */}
      <section className="container-page py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Active Coverage"
            title="Metro Command Centers"
            sub="Dedicated physical coordination hubs across South India's major metropolitan centers."
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

      {/* Final Call to Action */}
      <section className="container-page pb-20 pt-10 text-center md:pb-28">
        <div className="rounded-[3rem] bg-ink p-10 text-ink-foreground md:p-16">
          <h2 className="mx-auto max-w-2xl text-balance text-4xl font-semibold md:text-5xl">
            Dependable, gentle care arranged in minutes.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-foreground/80 leading-relaxed">
            Tell us what your family needs — we will match a verified woman attendant ready to step in with warmth and competence.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <BookLink size="lg" variant="warm">
              Book a Service
            </BookLink>
            <CallLink variant="glass" className="h-13 px-7 text-base" />
          </div>
        </div>
      </section>
    </>
  );
}
