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
  Users,
  Award,
  GraduationCap,
  Target,
  Handshake,
  MapPin,
  Activity,
  Sparkle,
} from "lucide-react";
import { BookLink } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { SITE, IMPACT, buildWhatsAppUrl } from "@/data/site";
import { buildOrganizationSchema, buildBreadcrumbSchema } from "@/data/enterprise-content";
import { seo } from "@/lib/seo";
import { track } from "@/lib/analytics";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero5 from "@/assets/hero-5.jpg";
import hero6 from "@/assets/hero-6.jpg";
import nursingCare from "@/assets/nursing-care.jpg";

export const Route = createFileRoute("/about")({
  head: () =>
    seo(
      "About ApnaCare — Women Leadership & Compassionate Family Care Across South India",
      "Learn how ApnaCare empowers families with verified women caregivers and hospital bedside assistance across Bengaluru, Chennai, Hyderabad, and Coimbatore.",
      {
        canonical: "https://apna-care.vercel.app/about",
        keywords: [
          "about ApnaCare",
          "women leadership healthcare India",
          "women self-help group caregivers",
          "elderly care brand South India",
          "verified home attendants",
          "Rohini Sankaranarayanan COO ApnaCare",
          "Prof Shoba T Women SHG ApnaCare",
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

/* ── Section Navigation Items (TRUSTGRID.AI inspired sub-navigation) ─ */
export const SUB_NAV_LINKS = [
  { label: "Our Story", href: "#story" },
  { label: "Mission & Vision", href: "#mission-vision" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Our Values", href: "#values" },
  { label: "Women Leadership", href: "#leadership" },
  { label: "Community Impact", href: "#community" },
  { label: "Our Presence", href: "#presence" },
];

/* ── Mandatory Women Leadership Data ─────────────────────────────── */
export interface WomanLeader {
  id: string;
  name: string;
  designation: string;
  category: "Executive Leadership" | "Community Outreach & Women's Empowerment";
  initials: string;
  roleDescription: string;
  focusAreas: string[];
  accentGradient: string;
  quote?: string;
}

export const WOMEN_LEADERSHIP: WomanLeader[] = [
  {
    id: "rohini-sankaranarayanan",
    name: "Rohini Sankaranarayanan",
    designation: "Chief Operating Officer (COO)",
    category: "Executive Leadership",
    initials: "RS",
    roleDescription:
      "Directs ApnaCare's regional care operations, caregiver quality assurance, and hospital bedside dispatch frameworks across South India. Rohini focuses on creating seamless, patient-first care experiences while instituting rigorous safety and verification benchmarks.",
    focusAreas: [
      "Operational Excellence & Care Quality",
      "Hospital & Bedside Support Networks",
      "Caregiver Safety & Rapid Standby Protocols",
      "South India Regional Desk Operations",
    ],
    accentGradient: "from-primary/25 via-emerald-100 to-primary-soft",
    quote:
      "Every family inviting a caregiver into their home or hospital room places profound trust in us. Our commitment is to honor that trust with unwavering operational rigor and genuine empathy.",
  },
  {
    id: "prof-shoba-t",
    name: "Prof. Shoba T",
    designation: "Women Self-Help Group Outreach Manager",
    category: "Community Outreach & Women's Empowerment",
    initials: "ST",
    roleDescription:
      "Leads grassroots partnerships with women's Self-Help Groups (SHGs) across semi-urban and rural South India. Prof. Shoba spearheads community outreach, vocational caregiving training programs, and financial independence initiatives that empower women to become certified Saha care professionals.",
    focusAreas: [
      "Women Self-Help Group (SHG) Partnerships",
      "Vocational Caregiving & Skills Training",
      "Livelihood Creation & Financial Inclusion",
      "Community Dignity & Ethical Employment",
    ],
    accentGradient: "from-terracotta/25 via-amber-100 to-secondary",
    quote:
      "Caregiving is inherently dignified work. By empowering women from self-help groups with professional skills and fair wages, we elevate entire families while solving urgent care needs for seniors.",
  },
];

/* ── What We Do: Core Care Services & Family Outcomes ────────────── */
export const WHAT_WE_DO = [
  {
    id: "elderly-care",
    title: "Elderly Care at Home",
    eyebrow: "Senior Living & Independence",
    statement: "Preserving personal autonomy, gentle mobility, and daily companionship in the comfort of home.",
    outcomes: ["Medication reminders & vitals tracking", "Unhurried assistance with bathing & hygiene", "Dedicated companionship & mental engagement"],
    image: hero1,
    alt: "Caregiver gently holding hands and assisting an elderly person at home",
    href: "/services/elderly-care",
  },
  {
    id: "hospital-attendant",
    title: "Hospital Bedside Assistance",
    eyebrow: "Ward & Post-Surgical Support",
    statement: "Continuous bedside vigilance, doctor-family liaison, and ward comfort when family cannot be present.",
    outcomes: ["Round-the-clock bedside comfort", "Assistance during post-op convalescence", "Real-time updates to family coordinators"],
    image: hero2,
    alt: "Dedicated bedside attendant assisting a recovering patient in a hospital room",
    href: "/services/hospital-attendant",
  },
  {
    id: "clinical-nursing",
    title: "Clinical Nursing (GNM/B.Sc)",
    eyebrow: "Licensed Clinical Procedures",
    statement: "Expert nursing support for IV infusions, tracheostomy, complex dressings, and catheter management.",
    outcomes: ["Licensed GNM and B.Sc nurses", "Strict clinical infection protocols", "Doctor-directed care chart maintenance"],
    image: nursingCare,
    alt: "Licensed nurse professionally preparing medical care routines",
    href: "/services/clinical-nursing",
  },
  {
    id: "post-natal",
    title: "Post-Natal & Infant Care",
    eyebrow: "Mother & Newborn Convalescence",
    statement: "Supportive fourth-trimester care combining traditional Japa wellness, baby oil massage, and mother rest.",
    outcomes: ["Traditional mother herbal & diet care", "Gentle infant massage & bathing routines", "Rest recovery support for new mothers"],
    image: hero5,
    alt: "Gentle mother and baby care assistance",
    href: "/services/post-natal-care",
  },
  {
    id: "family-support",
    title: "Family Support & Respite Care",
    eyebrow: "Caregiver Relief & Assisted Travel",
    statement: "Dependable relief for family members balancing demanding careers with long-term caregiving responsibilities.",
    outcomes: ["Assisted travel to hospital visits", "Scheduled respite relief for families", "Dedicated coordinator phone desk"],
    image: hero6,
    alt: "Attendant providing supportive accompaniment and gentle assistance",
    href: "/services/bedridden-care",
  },
];

/* ── 6 Core Philosophy & Values (TrustGrid 6-Grid Reference) ─────── */
export const CORE_VALUES = [
  {
    title: "Compassion First",
    eyebrow: "Human-Centered",
    statement: "Every interaction begins with empathy, active listening, and warmth. We treat every patient and senior as our own family.",
    icon: Heart,
    highlight: "Empathy before checklists",
  },
  {
    title: "Trust & Safety",
    eyebrow: "Rigorous Verification",
    statement: "5-tier background checks, Aadhaar and police verification, and continuous supervisor oversight ensure complete peace of mind.",
    icon: ShieldCheck,
    highlight: "100% verified credentials",
  },
  {
    title: "Dignity in Care",
    eyebrow: "Personal Respect",
    statement: "Honoring the personal routines, privacy, and self-respect of every care recipient with patience and unhurried courtesy.",
    icon: Sparkles,
    highlight: "Preserving individual autonomy",
  },
  {
    title: "Women's Empowerment",
    eyebrow: "Dignified Livelihoods",
    statement: "Creating fair-wage, respectable career pathways and financial independence for women caregivers from grassroots communities.",
    icon: Award,
    highlight: "Fair wages & financial autonomy",
  },
  {
    title: "Accountability",
    eyebrow: "Complete Transparency",
    statement: "Transparent daily pricing, daily structured WhatsApp wellness logs, and dedicated coordinator standby backup reassignment.",
    icon: CheckCircle2,
    highlight: "Structured daily WhatsApp logs",
  },
  {
    title: "Community Impact",
    eyebrow: "Grassroots Uplift",
    statement: "Partnering actively with Women Self-Help Groups to train, mentor, and elevate local women into certified care professionals.",
    icon: Handshake,
    highlight: "Self-Help Group (SHG) alliances",
  },
];

/* ── Interactive 3-Step Guided Pathway ───────────────────────────── */
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
    statement: "See background-verified Saha credentials, verified ID, and all-inclusive pricing.",
    description:
      "We provide complete visibility before you commit. You receive digital Saha profiles with verified experience, identity documentation, and all-inclusive daily rates with statutory GST.",
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
    statement: "Stay connected through daily WhatsApp wellness logs, coordinator check-ins, and standby backup.",
    description:
      "Care is an ongoing relationship. Your family receives structured daily WhatsApp wellness logs tracking meals, vitals, and medication, backed by regional standby Saha companions if unexpected emergencies arise.",
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

/* ── SHG Community Impact Pillars ────────────────────────────────── */
const SHG_PILLARS = [
  {
    title: "Grassroots Mobilization",
    description:
      "We partner directly with women's Self-Help Groups (SHGs) across rural and suburban Tamil Nadu, Karnataka, and Telangana to identify dedicated women eager to enter the formal care workforce.",
    icon: Users,
    badge: "Community Alliances",
  },
  {
    title: "Professional Care Academy",
    description:
      "Recruits undergo rigorous training modules in geriatric mobility assistance, hygiene dignity, vitals recording, hospital protocol, and patient communication led by healthcare mentors.",
    icon: GraduationCap,
    badge: "Accredited Training",
  },
  {
    title: "Economic Independence & Dignity",
    description:
      "Every certified Saha attendant receives timely, direct-to-bank compensation, transparent daily rates, health protections, and social dignity—empowering women to become financial anchors for their families.",
    icon: Award,
    badge: "Direct Compensation",
  },
  {
    title: "Safe, Supervised Workplaces",
    description:
      "We prioritize caregiver security. All client households are pre-verified, and our regional coordination desks maintain real-time WhatsApp check-ins and 24/7 emergency dispatch support.",
    icon: ShieldCheck,
    badge: "Caregiver Safety",
  },
];

/* ── Operating City Hubs ─────────────────────────────────────────── */
const OPERATING_METROS = [
  {
    name: "Bengaluru",
    isHQ: true,
    region: "Karnataka Regional Command",
    languages: ["Kannada", "English", "Hindi", "Tamil"],
    coverage: "Whitefield, Indiranagar, Koramangala, Jayanagar, HSR, Malleshwaram & across BBMP limits",
  },
  {
    name: "Chennai",
    isHQ: false,
    region: "Tamil Nadu Regional Desk",
    languages: ["Tamil", "English", "Telugu"],
    coverage: "Adyar, Anna Nagar, T. Nagar, Mylapore, Velachery, OMR corridor & Greater Chennai",
  },
  {
    name: "Hyderabad",
    isHQ: false,
    region: "Telangana Regional Desk",
    languages: ["Telugu", "Hindi", "English", "Urdu"],
    coverage: "Banjara Hills, Jubilee Hills, Gachibowli, Madhapur, Kukatpally & Secunderabad",
  },
  {
    name: "Coimbatore",
    isHQ: false,
    region: "Western Tamil Nadu Hub",
    languages: ["Tamil", "English", "Malayalam"],
    coverage: "RS Puram, Gandhipuram, Saibaba Colony, Peelamedu & Coimbatore healthcare belt",
  },
];

function AboutPage() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = APPROACH_STEPS[activeStepIndex];

  const waUrl = buildWhatsAppUrl(
    "Hello ApnaCare team! I am learning about your care philosophy and women leadership. I would like to discuss care options for my family.",
  );

  return (
    <div className="relative overflow-hidden bg-background text-foreground scroll-smooth">
      {/* ─────────────────────────────────────────────────────────────
          STICKY SUB-NAVIGATION (TRUSTGRID.AI INSPIRED)
      ───────────────────────────────────────────────────────────── */}
      <nav
        aria-label="About page section navigation"
        className="sticky top-16 z-30 border-b border-border/80 bg-background/95 backdrop-blur-md transition-all duration-200"
      >
        <div className="container-page flex items-center justify-between gap-4 overflow-x-auto py-2.5 scrollbar-none text-xs">
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {SUB_NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <span className="text-[11px] text-muted-foreground">
              South India Care Command:
            </span>
            <a
              href={`tel:${SITE.SUPPORT_PHONE}`}
              className="inline-flex items-center gap-1 font-semibold text-primary hover:underline text-xs"
            >
              <Phone className="size-3" />
              {SITE.SUPPORT_PHONE}
            </a>
          </div>
        </div>
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1 — HERO / ABOUT APNACARE
          Eyebrow: OUR PURPOSE & PEOPLE
          Headline: Care That Empowers Families. Opportunities That Empower Women.
          Supporting text: South India care ecosystem & dignified livelihoods.
      ───────────────────────────────────────────────────────────── */}
      <section
        id="story"
        className="relative border-b border-border/70 bg-gradient-to-b from-background via-background to-secondary/20 pt-12 pb-16 md:pt-20 md:pb-24"
      >
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Mission copy & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkle className="size-3.5 text-primary fill-primary animate-pulse" />
                OUR PURPOSE & PEOPLE
              </div>

              <h1 className="text-fluid-hero font-display font-semibold text-foreground tracking-tight leading-[1.12]">
                Care That Empowers Families.{" "}
                <span className="text-primary italic block sm:inline">
                  Opportunities That Empower Women.
                </span>
              </h1>

              <p className="text-fluid-card text-muted-foreground font-normal max-w-xl leading-relaxed">
                ApnaCare is building a more dependable and compassionate care ecosystem across South
                India, connecting families with trusted women caregivers and professional healthcare
                support while creating dignified livelihood opportunities for women.
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
                    Explore Our Care Services
                    <ArrowRight className="size-4 ml-2" />
                  </Link>
                </Button>

                <a
                  href="#leadership"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-secondary hover:border-primary/40 min-h-[48px] shadow-2xs"
                  onClick={() => track("about_hero_leadership_click", { destination: "#leadership" })}
                >
                  <Users className="size-4 text-primary" />
                  Meet Our Leadership
                </a>

                <BookLink
                  size="lg"
                  variant="outline"
                  className="min-h-[48px] px-6 text-sm font-semibold"
                >
                  Book a Service
                </BookLink>
              </div>

              {/* Reassurance Micro-Badges */}
              <div className="pt-4 border-t border-border/60 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  Women-led care coordination
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  Self-Help Group (SHG) partnerships
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  4 South Indian Metro Desks
                </span>
              </div>
            </div>

            {/* Right Column: Editorial Visual Composition */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-3 rounded-3xl bg-primary-soft/40 -rotate-1 transform -z-10" />

                <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
                  <img
                    src={hero1}
                    alt="Caregiver tenderly holding hands with an elderly patient at home"
                    className="w-full h-[380px] sm:h-[440px] object-cover object-center transition-transform duration-700 hover:scale-105"
                    loading="eager"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent pointer-events-none" />

                  {/* Floating Pill Badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-card/95 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-foreground border border-border/80 shadow-soft">
                    <BadgeCheck className="size-4 text-primary" />
                    Women Caregivers · Dignified Livelihoods
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-xs uppercase tracking-wider text-terracotta font-bold">
                      Dignity, Empathy, Independence
                    </p>
                    <p className="mt-1 text-sm sm:text-base font-medium leading-snug">
                      Connecting caring hearts with families who need dependable, honest support.
                    </p>
                  </div>
                </div>

                {/* Overlapping Quick Fact Badge */}
                <div className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-card/95 backdrop-blur-sm p-4 text-xs shadow-soft">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-9 place-items-center rounded-xl bg-primary-soft text-primary font-bold">
                      <Building2 className="size-4" />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">Operational Presence</p>
                      <p className="text-muted-foreground text-[11px]">
                        Bengaluru (HQ) · Chennai · Hyderabad · Coimbatore
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 text-[11px] font-semibold">
                    Live Desks
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2 — MISSION & VISION (TRUSTGRID DUAL-BLOCK ARCHITECTURE)
          Distinct dual blocks with high visual contrast.
      ───────────────────────────────────────────────────────────── */}
      <section
        id="mission-vision"
        className="container-page py-16 md:py-24 border-b border-border/70"
      >
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="eyebrow">GUIDING LIGHT</span>
          <h2 className="text-fluid-section font-display font-semibold text-foreground">
            Our Mission & Our Vision
          </h2>
          <p className="text-muted-foreground text-fluid-body leading-relaxed">
            The dual commitment that drives every coordinator conversation, caregiver training module, and family care plan.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Mission Card: Deep Ink contrast */}
          <div className="relative overflow-hidden rounded-3xl bg-ink text-ink-foreground p-8 sm:p-10 border border-white/10 shadow-lift flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1 text-xs font-semibold text-terracotta">
                <Target className="size-3.5" />
                OUR MISSION
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight">
                Dignified Care for Families, Respected Work for Women
              </h3>

              <blockquote className="text-sm sm:text-base text-ink-foreground/85 font-normal leading-relaxed pt-2 border-l-2 border-terracotta pl-4 italic">
                “To deliver reliable, dignified, and compassionate home and hospital care across South
                India by connecting families with trained, vetted women caregivers—creating peace of
                mind for families and empowering women with stable, respected livelihoods.”
              </blockquote>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="font-semibold text-white">For Families</p>
                <p className="text-ink-foreground/75 mt-0.5">Reliable, vetted care without agency ambiguity</p>
              </div>
              <div>
                <p className="font-semibold text-white">For Women</p>
                <p className="text-ink-foreground/75 mt-0.5">Direct fair compensation & societal respect</p>
              </div>
            </div>
          </div>

          {/* Vision Card: Warm Terracotta / Cream contrast */}
          <div className="relative overflow-hidden rounded-3xl bg-card border border-primary/20 p-8 sm:p-10 shadow-soft flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft border border-primary/20 px-3.5 py-1 text-xs font-semibold text-primary">
                <Compass className="size-3.5" />
                OUR VISION
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-semibold text-foreground tracking-tight">
                South India's Most Trusted Care Ecosystem
              </h3>

              <blockquote className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed pt-2 border-l-2 border-primary pl-4 italic">
                “To become South India's most trusted care ecosystem—where every family has
                effortless access to compassionate support, and every care worker is respected, fairly
                compensated, and empowered to thrive.”
              </blockquote>
            </div>

            <div className="mt-8 pt-6 border-t border-border grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="font-semibold text-foreground">Accessibility</p>
                <p className="text-muted-foreground mt-0.5">Effortless coordination across South India</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Empowerment</p>
                <p className="text-muted-foreground mt-0.5">Continuous growth paths for women caregivers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3 — WHAT WE DO (FAMILY OUTCOMES)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="what-we-do"
        className="container-page py-16 md:py-24 border-b border-border/70"
      >
        <div className="max-w-2xl">
          <span className="eyebrow">WHAT WE DO</span>
          <h2 className="mt-3 text-fluid-section font-display font-semibold text-foreground">
            Care Rooted in Real Family Outcomes
          </h2>
          <p className="mt-3 text-muted-foreground text-fluid-body leading-relaxed">
            Rather than generic agency staffing, ApnaCare provides situation-aware care modules
            tailored to each loved one's specific stage, mobility, and emotional comfort.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_WE_DO.map((item) => (
            <div
              key={item.id}
              className="card-soft overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lift"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-card/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-foreground shadow-2xs">
                    {item.eyebrow}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {item.statement}
                  </p>

                  <div className="mt-4 pt-4 border-t border-border space-y-1.5">
                    {item.outcomes.map((out, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-2 text-xs text-foreground/80">
                        <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Button asChild size="sm" variant="outline" className="w-full text-xs font-semibold">
                  <Link to={item.href}>
                    Explore {item.title}
                    <ArrowRight className="size-3.5 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Guided 3-Step Interactive Process */}
        <div className="mt-16 rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-soft">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
            <span className="eyebrow">OUR METHODOLOGY</span>
            <h3 className="text-2xl font-display font-semibold text-foreground">
              A Clearer Way to Find Dependable Care
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              We eliminate uncertainty with a transparent 3-step care coordination journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 rounded-2xl bg-secondary/40 border border-border max-w-2xl mx-auto mb-8">
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
                  className={`flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-semibold transition-all duration-200 touch-target ${
                    isSelected
                      ? "bg-card text-foreground shadow-soft border border-border/80"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span
                    className={`size-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
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

          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
                <Activity className="size-3.5" />
                {activeStep.pill}
              </div>
              <h4 className="text-xl sm:text-2xl font-display font-semibold text-foreground">
                {activeStep.headline}
              </h4>
              <p className="text-sm font-medium text-foreground/90 leading-relaxed">
                {activeStep.statement}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {activeStep.description}
              </p>
              <div className="space-y-2 pt-2 border-t border-border">
                {activeStep.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center justify-between text-xs py-0.5">
                    <span className="font-medium text-muted-foreground">{detail.label}</span>
                    <span className="font-semibold text-foreground">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-soft bg-muted">
                <img
                  src={activeStep.image}
                  alt={activeStep.imageAlt}
                  className="w-full h-[260px] sm:h-[300px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between text-xs font-medium">
                  <span>ApnaCare Coordination Pathway</span>
                  <span className="rounded-full bg-black/40 backdrop-blur-md px-2.5 py-0.5 text-[11px]">
                    Step 0{activeStep.id} of 03
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4 — PHILOSOPHY & CORE VALUES (6-GRID ARCHITECTURE)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="values"
        className="container-page py-16 md:py-24 border-b border-border/70"
      >
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="eyebrow">OUR PHILOSOPHY</span>
          <h2 className="text-fluid-section font-display font-semibold text-foreground">
            The Principles That Define Us
          </h2>
          <p className="text-muted-foreground text-fluid-body leading-relaxed">
            Every caregiver match, training module, and customer conversation is guided by six core
            commitments.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="card-soft p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                      <Icon className="size-6" />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-display font-semibold text-foreground">
                    {val.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-primary">{val.eyebrow}</p>
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    {val.statement}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-border text-[11px] font-medium text-foreground/80 flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                  <span>{val.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5 — MANDATORY WOMEN LEADERSHIP TEAM
          Strictly women only. Featuring Rohini Sankaranarayanan & Prof. Shoba T.
      ───────────────────────────────────────────────────────────── */}
      <section
        id="leadership"
        className="container-page py-16 md:py-24 border-b border-border/70"
      >
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            <Users className="size-3.5" />
            THE PEOPLE BEHIND APNACARE
          </div>
          <h2 className="text-fluid-section font-display font-semibold text-foreground">
            Meet the Women Leading Our Mission
          </h2>
          <p className="text-muted-foreground text-fluid-body leading-relaxed">
            ApnaCare is led by women executives and community champions dedicated to reshaping care
            delivery across South India through compassionate operations and grassroots women's
            empowerment.
          </p>
        </div>

        {/* Leadership Profile Cards Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {WOMEN_LEADERSHIP.map((leader) => (
            <div
              key={leader.id}
              className="card-soft overflow-hidden p-6 sm:p-8 flex flex-col justify-between border-border/90 hover:border-primary/40 hover:shadow-lift transition-all duration-300"
            >
              <div className="space-y-6">
                {/* Header: Avatar Placeholder & Category */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Consistent, elegant avatar monogram placeholder */}
                    <div
                      className={`size-20 sm:size-24 rounded-2xl bg-gradient-to-br ${leader.accentGradient} flex items-center justify-center border border-border shadow-inner font-display font-bold text-2xl sm:text-3xl text-foreground shrink-0`}
                      aria-label={`${leader.name} portrait placeholder`}
                    >
                      {leader.initials}
                    </div>

                    <div>
                      <span className="inline-block rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold text-foreground border border-border/60">
                        {leader.category}
                      </span>
                      <h3 className="mt-2 text-xl sm:text-2xl font-display font-semibold text-foreground leading-snug">
                        {leader.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-primary mt-0.5">
                        {leader.designation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Role Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {leader.roleDescription}
                </p>

                {/* Key Focus Areas */}
                <div className="space-y-2 pt-4 border-t border-border">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-foreground/70">
                    Areas of Responsibility:
                  </p>
                  <div className="grid gap-1.5 sm:grid-cols-2">
                    {leader.focusAreas.map((area, aIdx) => (
                      <div
                        key={aIdx}
                        className="flex items-center gap-2 text-xs text-foreground/80 bg-secondary/30 rounded-lg p-2 border border-border/40"
                      >
                        <CheckCircle2 className="size-3 text-primary shrink-0" />
                        <span className="truncate">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personal Quote */}
                {leader.quote && (
                  <blockquote className="rounded-xl bg-primary-soft/40 p-4 border-l-2 border-primary text-xs italic text-foreground/90 leading-relaxed">
                    “{leader.quote}”
                  </blockquote>
                )}
              </div>

              {/* Bottom Verification Badge */}
              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <BadgeCheck className="size-4 text-primary" />
                  ApnaCare Women Leadership Team
                </span>
                <span className="text-[11px] font-medium text-foreground/75">
                  South India Desk
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6 — COMMUNITY OUTREACH & WOMEN'S EMPOWERMENT (SHG FOCUS)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="community"
        className="container-page py-16 md:py-24 border-b border-border/70"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="eyebrow">COMMUNITY & SOCIAL IMPACT</span>
            <h2 className="text-fluid-section font-display font-semibold text-foreground">
              Partnering with Women Self-Help Groups
            </h2>
            <p className="text-fluid-body text-muted-foreground leading-relaxed">
              True healthcare resilience starts in the community. Through grassroots partnerships
              with women's Self-Help Groups (SHGs), ApnaCare bridges compassionate care for families
              with sustainable, dignified livelihoods for women.
            </p>

            <div className="p-5 rounded-2xl bg-secondary/40 border border-border/80 space-y-2">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <Handshake className="size-4" />
                Dignified Livelihood Pipeline
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                By providing formal caregiver accreditation, transparent daily wages, and safe client
                environments, we help women transition from irregular domestic work into respected,
                certified healthcare professions.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
            {SHG_PILLARS.map((pillar, pIdx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pIdx}
                  className="card-soft p-5 sm:p-6 flex flex-col justify-between transition-all hover:border-primary/40 hover:shadow-soft"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
                        <Icon className="size-5" />
                      </span>
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-semibold text-foreground border border-border/60">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-foreground">
                      {pillar.title}
                    </h3>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7 — OUR IMPACT (VERIFIED METRICS)
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-ink py-16 text-ink-foreground md:py-24 border-b border-border/70">
        <div className="container-page">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
              VERIFIED IMPACT
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white">
              Measurable Trust Across South India
            </h2>
            <p className="text-xs sm:text-sm text-ink-foreground/75 leading-relaxed">
              Every metric represents a senior cared for with patience, a recovering parent
              supported through convalescence, and a woman empowered with financial independence.
            </p>
          </div>

          {/* Impact Stats Grid */}
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
            {IMPACT.map(([val, label]) => (
              <div
                key={label}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                <p className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  {val}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-ink-foreground/80 font-medium">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8 — OUR PRESENCE (OPERATING METROS & REGIONAL DESKS)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="presence"
        className="container-page py-16 md:py-24 border-b border-border/70"
      >
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="eyebrow">OPERATIONAL FOOTPRINT</span>
          <h2 className="text-fluid-section font-display font-semibold text-foreground">
            Local Care Coordination in 4 South Indian Metros
          </h2>
          <p className="text-muted-foreground text-fluid-body leading-relaxed">
            Care cannot be run through a distant call center. We operate dedicated regional desks with
            care coordinators who speak your family's language and understand local hospital
            workflows.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OPERATING_METROS.map((metro) => (
            <div
              key={metro.name}
              className="card-soft p-6 flex flex-col justify-between hover:border-primary/40 hover:shadow-soft transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">{metro.name}</h3>
                  </div>
                  {metro.isHQ && (
                    <span className="rounded-full bg-primary-soft text-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      HQ
                    </span>
                  )}
                </div>

                <p className="text-xs font-semibold text-primary">{metro.region}</p>

                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground/80">Languages Spoken:</p>
                  <p className="text-[11px]">{metro.languages.join(" · ")}</p>
                </div>

                <div className="space-y-1.5 text-xs text-muted-foreground pt-3 border-t border-border">
                  <p className="font-medium text-foreground/80">Key Coverage:</p>
                  <p className="text-[11px] leading-relaxed">{metro.coverage}</p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-xs text-primary font-medium">
                <span>Active Coordinator Desk</span>
                <CheckCircle2 className="size-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 9 — CLOSING CTA
          Headline: “Because Every Family Deserves Peace of Mind.”
          Primary: Book a Service (/booking)
          Secondary: Talk to Our Care Team (WhatsApp / Phone)
      ───────────────────────────────────────────────────────────── */}
      <section className="container-page py-16 md:py-24 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="eyebrow">TAKE THE NEXT STEP</span>
          <h2 className="text-fluid-section font-display font-semibold text-foreground">
            Because Every Family Deserves Peace of Mind.
          </h2>
          <p className="text-muted-foreground text-fluid-body leading-relaxed max-w-xl mx-auto">
            Whether you need an attendant at home, bedside support in a hospital, or guidance on the
            right care plan, our team is here for you.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Button
              asChild
              size="lg"
              variant="warm"
              className="min-h-[48px] px-8 text-sm font-semibold shadow-soft"
            >
              <Link
                to="/booking"
                onClick={() => track("about_footer_book_click", { destination: "/booking" })}
              >
                Book a Service
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#25D366] bg-[#25D366]/15 px-6 py-3 text-sm font-semibold text-[#128C7E] transition-colors hover:bg-[#25D366]/25 min-h-[48px]"
              onClick={() => track("about_footer_whatsapp_click", { destination: "whatsapp" })}
            >
              <MessageCircle className="size-4 text-[#25D366]" />
              Talk to Our Care Team
            </a>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-[48px] px-6 text-sm font-semibold"
            >
              <Link to="/services">
                Explore Care Services
              </Link>
            </Button>
          </div>

          {/* Operating hours & phone reassurance */}
          <div className="mt-8 pt-6 border-t border-border/80 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Phone className="size-3.5 text-primary" />
              Direct Support Desk:{" "}
              <a
                href={`tel:${SITE.SUPPORT_PHONE}`}
                className="font-semibold text-foreground hover:underline"
              >
                {SITE.SUPPORT_PHONE}
              </a>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 text-primary" />
              Hours: {SITE.operatingHours}
            </span>
            <span>Support in Tamil, Kannada, Telugu, Hindi & English</span>
          </div>
        </div>
      </section>
    </div>
  );
}
