import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Heart,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  BadgeCheck,
  ArrowRight,
  Phone,
  MessageCircle,
  Building2,
  Clock,
  Compass,
  FileCheck2,
  Users,
  Eye,
  Activity,
  Calendar,
} from "lucide-react";
import { BookLink, CallLink } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { SITE, IMPACT, buildWhatsAppUrl } from "@/data/site";
import { buildOrganizationSchema, buildBreadcrumbSchema } from "@/data/enterprise-content";
import { seo } from "@/lib/seo";
import { track } from "@/lib/analytics";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import hero6 from "@/assets/hero-6.jpg";
import nursingCare from "@/assets/nursing-care.jpg";

export const Route = createFileRoute("/about")({
  head: () =>
    seo(
      "About ApnaCare — Care That Puts People First",
      "Learn how ApnaCare helps families navigate elderly care, hospital bedside assistance, and home convalescence with verified attendants and human empathy across South India.",
      {
        canonical: "https://apna-care.vercel.app/about",
        keywords: [
          "about ApnaCare",
          "elderly care brand South India",
          "verified home attendants",
          "compassionate caregiver philosophy",
          "family care coordination Bengaluru Chennai Hyderabad Coimbatore",
        ],
        schema: [
          buildOrganizationSchema(),
          buildBreadcrumbSchema([
            { name: "Home", item: "https://apna-care.vercel.app" },
            { name: "About Us", item: "https://apna-care.vercel.app/about" },
          ]),
        ],
      },
    ),
  component: AboutPage,
});

/* ── Interactive 3-Step Journey Data ─────────────────────────────── */
interface ApproachStep {
  id: number;
  label: string;
  headline: string;
  statement: string;
  description: string;
  image: string;
  imageAlt: string;
  pill: string;
  details: { label: string; value: string }[];
}

const APPROACH_STEPS: ApproachStep[] = [
  {
    id: 1,
    label: "1. Tell us what you need",
    headline: "We listen to your family first.",
    statement: "Share your loved one's daily routine, medical context, and preferred schedule.",
    description:
      "Every care situation is unique. Our regional care coordinators take time to understand physical mobility, medication needs, dietary habits, and language preferences before suggesting any care plan.",
    image: hero3,
    imageAlt: "Care coordinator calmly discussing care needs with a family member",
    pill: "Human Consultation",
    details: [
      { label: "Consultation", value: "Dedicated phone or WhatsApp discussion" },
      { label: "Personalization", value: "Mobility, language & dietary alignment" },
      { label: "Transparency", value: "No hidden charges or unexpected agency fees" },
    ],
  },
  {
    id: 2,
    label: "2. Explore your options",
    headline: "Review verified profiles with clear rates.",
    statement:
      "See background-verified attendant credentials, verified ID, and all-inclusive pricing.",
    description:
      "We provide complete visibility before you commit. You receive digital attendant profiles with verified experience, identity documentation, and all-inclusive daily rates with statutory GST.",
    image: nursingCare,
    imageAlt: "Verified care attendant professionally preparing care routines",
    pill: "Verified Transparency",
    details: [
      { label: "Verification", value: "100% government ID & police documentation" },
      { label: "Profile Preview", value: "Review skills, fluencies & past records" },
      { label: "Pricing", value: "Clear daily rate with official GST invoice" },
    ],
  },
  {
    id: 3,
    label: "3. Take the next step",
    headline: "Care begins with continuous coordinator support.",
    statement:
      "Stay connected through daily WhatsApp wellness logs, coordinator check-ins, and standby backup.",
    description:
      "Care is an ongoing relationship. Your family receives structured daily WhatsApp wellness logs tracking meals, vitals, and medication, backed by regional standby attendants if unexpected emergencies arise.",
    image: hero5,
    imageAlt: "Assisted care delivery with professional accompaniment and coordination",
    pill: "Active Coordination",
    details: [
      { label: "Daily Updates", value: "Structured WhatsApp vitals & meal logs" },
      { label: "Desk Vigil", value: "24/7 coordinator assistance for family" },
      { label: "Continuity", value: "Priority standby backup reassignment" },
    ],
  },
];

/* ── Who ApnaCare Supports ───────────────────────────────────────── */
const CARE_SITUATIONS = [
  {
    id: "elderly-care",
    title: "Elderly Care at Home",
    eyebrow: "Senior Living",
    statement: "Gentle mobility aid, daily companionship, and medication reminders.",
    image: hero1,
    alt: "Caregiver gently holding hands and assisting an elderly lady at home",
    href: "/services/elderly-care",
    accent: "bg-primary-soft text-primary",
  },
  {
    id: "hospital-attendant",
    title: "Hospital Bedside Support",
    eyebrow: "In-Hospital & Recovery",
    statement: "Attentive bedside presence and continuous ward comfort assistance.",
    image: hero2,
    alt: "Dedicated bedside attendant assisting a recovering patient in a hospital room",
    href: "/services/hospital-attendant",
    accent: "bg-terracotta/20 text-terracotta",
  },
  {
    id: "home-attendant",
    title: "Home Attendant Assistance",
    eyebrow: "Daily Living Aid",
    statement: "Respectful hygiene assistance, sponge baths, and structured mobility support.",
    image: hero6,
    alt: "Attendant providing supportive home care and gentle assistance",
    href: "/services/bedridden-care",
    accent: "bg-secondary text-foreground",
  },
  {
    id: "post-operative",
    title: "Post-Operative Recovery",
    eyebrow: "Convalescence",
    statement: "Dedicated convalescence comfort, rest encouragement, and recovery monitoring.",
    image: hero4,
    alt: "Caregiver tenderly supporting post-operative convalescence and rest",
    href: "/services/post-operative-care",
    accent: "bg-primary-soft text-primary",
  },
];

/* ── Brand Values ────────────────────────────────────────────────── */
const BRAND_VALUES = [
  {
    title: "Dignity",
    tagline: "Person-first respect in every moment.",
    statement:
      "Every elder and patient is treated with patience, personal courtesy, and unhurried privacy.",
    icon: Heart,
    highlight: "Preserving individual self-respect",
  },
  {
    title: "Empathy",
    tagline: "We listen before recommending care.",
    statement:
      "Every family arrives with unique emotions and constraints. We meet you where you are.",
    icon: Compass,
    highlight: "Deep listening, zero judgment",
  },
  {
    title: "Trust",
    tagline: "Verified caregivers and transparent pricing.",
    statement:
      "Rigorous 5-stage background checks, police verification, and clear invoices with zero hidden fees.",
    icon: ShieldCheck,
    highlight: "100% verified credentials",
  },
  {
    title: "Independence",
    tagline: "Supporting autonomy, not replacing it.",
    statement:
      "We encourage seniors and recovering individuals to maintain control of their daily rhythms.",
    icon: Sparkles,
    highlight: "Empowering daily self-reliance",
  },
];

/* ── Real Coordination Challenges (The Problem) ─────────────────── */
const COORDINATION_CHALLENGES = [
  {
    title: "Unclear Care Options",
    statement: "Not knowing whether a parent needs a companion, an attendant, or clinical nursing.",
    solution: "Guidance on exact care scopes",
  },
  {
    title: "Managing from a Distance",
    statement:
      "Balancing career demands while coordinating a parent's daily care from another city.",
    solution: "Scheduled WhatsApp wellness logs",
  },
  {
    title: "The Trust Deficit",
    statement: "Worrying about unvetted agency workers, sudden absenteeism, and safety concerns.",
    solution: "Police-verified attendants & backup",
  },
  {
    title: "Caregiver Burnout",
    statement:
      "Carrying non-stop physical vigil without respite or dependable professional support.",
    solution: "Reliable respite & scheduled relief",
  },
];

function AboutPage() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = APPROACH_STEPS[activeStepIndex];

  const waUrl = buildWhatsAppUrl(
    "Hello ApnaCare team! I'm learning about your care philosophy and would like to understand your care options for my family.",
  );

  return (
    <div className="relative overflow-hidden">
      {/* ─────────────────────────────────────────────────────────────
          HERO: EDITORIAL SPLIT COMPOSITION
          Eyebrow: CARE, WITH PEOPLE AT HEART
          Headline: Care is personal. So is our purpose.
          Supporting statement: Helping families find their next step in care.
      ───────────────────────────────────────────────────────────── */}
      <section className="relative border-b border-border/70 bg-gradient-to-b from-background via-background to-secondary/20 pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Precision Copy & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                <span className="size-2 rounded-full bg-primary animate-pulse" />
                Care, with people at heart
              </div>

              <h1 className="text-fluid-hero font-display font-semibold text-foreground tracking-tight">
                Care is personal. <br className="hidden sm:inline" />
                <span className="text-primary italic">So is our purpose.</span>
              </h1>

              <p className="text-fluid-card text-muted-foreground font-normal max-w-xl leading-relaxed">
                Helping families find their next step in care.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Button
                  asChild
                  size="lg"
                  variant="warm"
                  className="min-h-[48px] px-7 text-sm font-semibold shadow-soft"
                >
                  <Link
                    to="/services"
                    onClick={() => track("about_hero_explore_click", { destination: "/services" })}
                  >
                    Explore Care Options
                    <ArrowRight className="size-4 ml-2" />
                  </Link>
                </Button>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-secondary hover:border-primary/30 min-h-[48px] shadow-2xs"
                  onClick={() => track("about_hero_whatsapp_click", { destination: "whatsapp" })}
                >
                  <MessageCircle className="size-4 text-[#25D366]" />
                  Talk to Our Team
                </a>

                <BookLink
                  size="lg"
                  variant="outline"
                  className="min-h-[48px] px-6 text-sm font-semibold"
                >
                  Book an Attendant
                </BookLink>
              </div>

              {/* Reassurance Micro-Badges */}
              <div className="pt-4 border-t border-border/60 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  Police-verified attendants
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  Transparent daily rates
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  Direct coordinator support
                </span>
              </div>
            </div>

            {/* Right Column: Editorial Visual Experience */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background decorative warmth frame */}
                <div className="absolute -inset-3 rounded-3xl bg-primary-soft/40 -rotate-1 transform -z-10" />

                <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
                  <img
                    src={hero1}
                    alt="Caregiver gently holding hands and assisting an elderly lady at home"
                    className="w-full h-[380px] sm:h-[440px] object-cover object-center transition-transform duration-700 hover:scale-105"
                    loading="eager"
                  />

                  {/* Gentle gradient scrim at the bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent pointer-events-none" />

                  {/* Restrained Floating Reassurance Pill */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-card/95 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-foreground border border-border/80 shadow-soft">
                    <BadgeCheck className="size-4 text-primary" />
                    Human companionship · Verified support
                  </div>

                  {/* Bottom Image Caption & Identity Anchor */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-xs uppercase tracking-wider text-terracotta font-bold">
                      Dignity in Every Moment
                    </p>
                    <p className="mt-1 text-sm sm:text-base font-medium leading-snug">
                      Care that honors your loved one's independence and personal comfort.
                    </p>
                  </div>
                </div>

                {/* Overlapping Metro Desk Badge */}
                <div className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-card/90 backdrop-blur-sm p-4 text-xs shadow-soft">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-8 place-items-center rounded-xl bg-primary-soft text-primary font-bold">
                      <Building2 className="size-4" />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">Local Care Desks</p>
                      <p className="text-muted-foreground">
                        Bengaluru · Chennai · Hyderabad · Coimbatore
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-secondary/80 px-2.5 py-1 text-[11px] font-semibold text-foreground">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1 — PURPOSE
          Headline: “Care should feel human.”
          Communicate why ApnaCare exists through one concise statement & visual.
      ───────────────────────────────────────────────────────────── */}
      <section className="container-page py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Visual Column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <img
                src={hero3}
                alt="Care coordinator and family reviewing care schedules with calm reassurance"
                className="w-full h-[360px] sm:h-[420px] object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-semibold">
                  <Heart className="size-3.5 text-terracotta" />
                  Presence Over Transactions
                </span>
                <p className="mt-2 text-sm font-medium leading-relaxed">
                  "Care begins with truly listening to what your family needs today."
                </p>
              </div>
            </div>
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="eyebrow">Our Fundamental Purpose</span>
            <h2 className="text-fluid-section font-display font-semibold text-foreground">
              Care should feel human.
            </h2>
            <p className="text-fluid-card text-foreground font-medium leading-snug">
              Families deserve authentic empathy, dependable presence, and unhurried personal
              support.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/60">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary mt-0.5">
                  <Compass className="size-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-foreground text-base">
                    Direct Human Coordination
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Speak directly with a regional care coordinator who understands local hospitals,
                    languages, and family dynamics.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/60">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-terracotta/20 text-terracotta mt-0.5">
                  <Heart className="size-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-foreground text-base">
                    Respect for Personal Routines
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Attendants adapt to your parent's waking hours, meal timings, and prayer
                    routines rather than imposing rigid checklists.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/60">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary mt-0.5">
                  <CheckCircle2 className="size-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-foreground text-base">Shared Family Peace</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Consistent WhatsApp wellness logs ensure you know how your loved one is eating,
                    sleeping, and recovering every single day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2 — THE PROBLEM
          Headline: “Finding care can feel overwhelming.”
          Show real coordination challenges through concise labels and clear context.
      ───────────────────────────────────────────────────────────── */}
      <section className="border-y border-border/80 bg-secondary/25 py-16 md:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="eyebrow">The Reality Families Face</span>
            <h2 className="mt-3 text-fluid-section font-display font-semibold text-foreground">
              Finding care can feel overwhelming.
            </h2>
            <p className="mt-3 text-muted-foreground text-fluid-body leading-relaxed">
              When health needs change suddenly, families confront confusion, exhaustion, and
              difficult decisions.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COORDINATION_CHALLENGES.map((item, idx) => (
              <div
                key={idx}
                className="card-soft p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft"
              >
                <div>
                  <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary-soft text-xs font-bold text-primary">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-foreground leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {item.statement}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-border flex items-center gap-1.5 text-xs font-medium text-primary">
                  <CheckCircle2 className="size-3.5 shrink-0" />
                  <span>{item.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3 — THE APNACARE APPROACH (INTERACTIVE 3-STEP JOURNEY)
          Headline: “A clearer way to find support.”
          Interactive visual three-step journey with synchronized preview panels.
      ───────────────────────────────────────────────────────────── */}
      <section className="container-page py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">A Guided Pathway</span>
          <h2 className="mt-3 text-fluid-section font-display font-semibold text-foreground">
            A clearer way to find support.
          </h2>
          <p className="mt-3 text-muted-foreground text-fluid-body leading-relaxed">
            A guided, transparent pathway from your first conversation to daily care.
          </p>
        </div>

        {/* Interactive Step Switcher */}
        <div className="mt-12">
          {/* Step Navigation Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 rounded-2xl bg-secondary/40 border border-border max-w-3xl mx-auto">
            {APPROACH_STEPS.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    setActiveStepIndex(idx);
                    track("about_step_tab_click", { step: step.id });
                  }}
                  className={`flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-semibold transition-all duration-200 touch-target ${
                    isSelected
                      ? "bg-card text-foreground shadow-soft border border-border/80"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span
                    className={`size-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isSelected ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.id}
                  </span>
                  <span>{step.label.replace(/^\d+\.\s*/, "")}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Panel Display */}
          <div className="mt-8 rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-soft transition-all duration-300">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              {/* Step Content */}
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1 text-xs font-bold text-primary uppercase tracking-wider">
                  <Activity className="size-3.5" />
                  {activeStep.pill}
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
                  {activeStep.headline}
                </h3>

                <p className="text-base font-medium text-foreground/90 leading-relaxed">
                  {activeStep.statement}
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activeStep.description}
                </p>

                {/* Micro Details List */}
                <div className="space-y-2.5 pt-2 border-t border-border">
                  {activeStep.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center justify-between text-xs py-1">
                      <span className="font-medium text-muted-foreground">{detail.label}</span>
                      <span className="font-semibold text-foreground">{detail.value}</span>
                    </div>
                  ))}
                </div>

                {/* Step Action Button */}
                <div className="pt-2">
                  <Button asChild size="sm" variant="warm">
                    <Link to="/services">
                      Explore Care Options
                      <ArrowRight className="size-3.5 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Step Visual Preview */}
              <div className="lg:col-span-6">
                <div className="relative overflow-hidden rounded-2xl border border-border shadow-soft bg-muted">
                  <img
                    src={activeStep.image}
                    alt={activeStep.imageAlt}
                    className="w-full h-[300px] sm:h-[360px] object-cover object-center transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between text-xs font-medium">
                    <span>ApnaCare Care Pathway</span>
                    <span className="rounded-full bg-black/40 backdrop-blur-md px-3 py-1">
                      Stage 0{activeStep.id} of 03
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4 — WHO APNACARE SUPPORTS
          Headline: “Different needs. One human approach.”
          Image-led, clickable cards for audiences actually supported.
      ───────────────────────────────────────────────────────────── */}
      <section className="border-y border-border/80 bg-secondary/20 py-16 md:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="eyebrow">Care Situations</span>
            <h2 className="mt-3 text-fluid-section font-display font-semibold text-foreground">
              Different needs. One human approach.
            </h2>
            <p className="mt-3 text-muted-foreground text-fluid-body leading-relaxed">
              Thoughtful care tailored to your family's exact stage and circumstances.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CARE_SITUATIONS.map((sit) => (
              <Link
                key={sit.id}
                to={sit.href}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-lift"
                onClick={() => track("about_situation_card_click", { situation: sit.id })}
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img
                      src={sit.image}
                      alt={sit.alt}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-card/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-foreground shadow-2xs">
                      {sit.eyebrow}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {sit.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {sit.statement}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Explore service</span>
                  <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5 — BRAND VALUES
          Headline: “Care begins with respect.”
          Express existing values using a distinctive visual composition.
      ───────────────────────────────────────────────────────────── */}
      <section className="container-page py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">Guiding Principles</span>
          <h2 className="mt-3 text-fluid-section font-display font-semibold text-foreground">
            Care begins with respect.
          </h2>
          <p className="mt-3 text-muted-foreground text-fluid-body leading-relaxed">
            Four core values shape every coordinator conversation and attendant interaction.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BRAND_VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="card-soft p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft"
              >
                <div>
                  <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-display font-semibold text-foreground">
                    {val.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-primary">{val.tagline}</p>
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    {val.statement}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-border text-[11px] font-medium text-foreground/80 flex items-center gap-1.5">
                  <CheckCircle2 className="size-3 text-primary shrink-0" />
                  <span>{val.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          OPERATIONAL SCALE & LOCAL DESKS
          Transparent, verified facts grounded in South India metros.
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-ink py-16 text-ink-foreground md:py-20">
        <div className="container-page">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
              Verified Operational Presence
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-display font-semibold text-white">
              Local Care Coordination in 4 Metros
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-ink-foreground/75 leading-relaxed">
              We operate dedicated regional desks with verified attendant pools and standby
              reassignment across South India.
            </p>
          </div>

          {/* Operational Metrics */}
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
            {IMPACT.map(([val, label]) => (
              <div key={label} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="font-display text-3xl sm:text-4xl font-bold text-white">{val}</p>
                <p className="mt-1.5 text-xs text-ink-foreground/80 font-medium">{label}</p>
              </div>
            ))}
          </div>

          {/* City Desks Tags */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="text-ink-foreground/60">Operating Hubs:</span>
            {["Bengaluru (HQ)", "Chennai", "Hyderabad", "Coimbatore"].map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 font-semibold text-white border border-white/15"
              >
                <Building2 className="size-3.5 text-terracotta" />
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FINAL CALL TO ACTION
          Headline: “Ready to find the right care for your loved one?”
          Supporting statement: “Our care coordinators are here to listen and help you take the next step.”
      ───────────────────────────────────────────────────────────── */}
      <section className="container-page py-16 md:py-24 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="eyebrow">Taking the Next Step</span>
          <h2 className="text-fluid-section font-display font-semibold text-foreground">
            Ready to find the right care for your loved one?
          </h2>
          <p className="text-muted-foreground text-fluid-body leading-relaxed max-w-xl mx-auto">
            Our care coordinators are here to listen and help you take the next step.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Button
              asChild
              size="lg"
              variant="warm"
              className="min-h-[48px] px-8 text-sm font-semibold shadow-soft"
            >
              <Link to="/services">
                Explore Care Services
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#25D366] bg-[#25D366]/15 px-6 py-3 text-sm font-semibold text-[#128C7E] transition-colors hover:bg-[#25D366]/25 min-h-[48px]"
            >
              <MessageCircle className="size-4 text-[#25D366]" />
              Talk to a Coordinator
            </a>

            <BookLink
              size="lg"
              variant="outline"
              className="min-h-[48px] px-6 text-sm font-semibold"
            >
              Book an Attendant
            </BookLink>
          </div>

          {/* Operating hours & phone reassurance */}
          <div className="mt-8 pt-6 border-t border-border/80 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Phone className="size-3.5 text-primary" />
              Direct Desk:{" "}
              <a
                href={`tel:${SITE.SUPPORT_PHONE}`}
                className="font-semibold text-foreground hover:underline"
              >
                {SITE.SUPPORT_PHONE}
              </a>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 text-primary" />
              Operating: {SITE.operatingHours}
            </span>
            <span>Support in English, Hindi, Tamil, Kannada & Telugu</span>
          </div>
        </div>
      </section>
    </div>
  );
}
