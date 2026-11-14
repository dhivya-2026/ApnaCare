import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ExternalLink,
  HeartHandshake,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { LifeStagesJourney } from "@/components/site/LifeStagesJourney";
import { PillarsGrid } from "@/components/site/PillarsGrid";
import { CareRecoveryStory } from "@/components/site/CareRecoveryStory";
import { UniversalCareConfigurator } from "@/components/site/UniversalCareConfigurator";
import { BusinessEnquiryModal } from "@/components/site/BusinessEnquiryModal";
import {
  SITE,
  SERVICES,
  buildWhatsAppUrl,
  formatINR,
} from "@/data/site";
import { LIFESAKHI_BRAND } from "@/data/lifesakhi";
import { WOMEN_LEADERSHIP, STRATEGIC_INVESTOR_PARTNER } from "@/routes/about";
import { seo } from "@/lib/seo";
import { buildOrganizationSchema, buildFaqPageSchema } from "@/data/enterprise-content";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";

const FAQS = [
  {
    q: "What is LifeSakhi and how does it relate to LifeSakhi?",
    a: "LifeSakhi is our expanded women and child development, empowerment, and lifelong wellbeing brand—uniting women's community empowerment with all verified Care & Assistance operations (elderly care, hospital bedside support, nursing, and postnatal care) previously operated under LifeSakhi.",
  },
  {
    q: "How are LifeSakhi Saha care companions verified and vetted?",
    a: "Every Saha care companion undergoes a structured 5-stage background verification: government photo ID authentication, police verification documentation filing, residential address checks, reference reviews, and practical caregiving skills assessment before assignment.",
  },
  {
    q: "What is the difference between a Saha care companion and a registered nurse?",
    a: "A Saha care companion provides supportive personal care—companionship, mobility assistance, bathing, feeding accompaniment, and oral prescription reminder logging. Registered nurses (GNM or B.Sc. Nursing) are medically licensed for clinical procedures such as sterile wound dressings, IV infusions, and catheter management under physician prescription.",
  },
  {
    q: "Which programmes are operational today vs. proposed for future rollout?",
    a: "All Care & Assistance services (elderly care, hospital bedside assistance, certified nursing, postnatal support, and assisted travel) and Women Self-Help Group (SHG) caregiver outreach are active today across Bengaluru, Chennai, Hyderabad, and Coimbatore. Broader Child Development, Adolescent Life Skills, and Entrepreneurship tracks are transparently marked as proposed or partner-seeking initiatives.",
  },
  {
    q: "Are there any hidden agency commissions or surprise fees for care services?",
    a: "None. Care service rates are published transparently on a per-day, per-shift, or monthly basis with official 18% statutory GST tax invoices (SAC 9993).",
  },
];

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "LifeSakhi — Empowering Women. Enriching Lives.",
      "Every Girl. Every Woman. Every Stage. LifeSakhi stands for women and child development, SHG empowerment, dignity, wellbeing, and trusted Saha care across South India.",
      {
        canonical: "https://apna-care.vercel.app",
        keywords: [
          "LifeSakhi",
          "women empowerment South India",
          "women and child development India",
          "elderly care at home Bengaluru Chennai Hyderabad Coimbatore",
          "hospital bedside attendant",
          "postnatal and newborn care",
          "women self help group employment",
        ],
        schema: [buildOrganizationSchema(), buildFaqPageSchema(FAQS)],
      }
    ),
  component: HomePage,
});

export function HomePage() {
  const [homeBizOpen, setHomeBizOpen] = useState(false);
  const waUrl = buildWhatsAppUrl("Hi LifeSakhi! I would like to learn more or request support.");
  const featuredServices = SERVICES.filter((s) => s.featured).slice(0, 4);

  return (
    <div className="bg-background">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary-soft/45 via-background to-background py-14 sm:py-20 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-primary shadow-2xs">
              <Sparkles className="size-3.5 text-terracotta" />
              {LIFESAKHI_BRAND.supportingMessage}
            </span>

            <h1 className="mt-5 font-display text-fluid-hero font-semibold text-foreground">
              {LIFESAKHI_BRAND.tagline}
            </h1>

            <p className="mt-4 max-w-2xl text-fluid-body text-muted-foreground">
              {LIFESAKHI_BRAND.heroDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Button asChild size="lg" className="rounded-full px-7 min-h-[48px]">
                <a href="#philosophy">
                  Explore Our Mission
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6 min-h-[48px]">
                <Link to="/pillars">Discover Our Initiatives</Link>
              </Button>
              <Button asChild size="lg" variant="warm" className="rounded-full px-6 min-h-[48px]">
                <Link to="/booking">Get Support</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-primary" />
                Active in Bengaluru, Chennai, Hyderabad & Coimbatore
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-primary" />
                Women-Led & SHG-Anchored
              </span>
            </div>
          </div>

          {/* Authentic South Indian Multi-Generational Visual Collage */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
            <div className="space-y-3.5">
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                <img
                  src={hero4}
                  alt="Mother and newborn supported by a trained LifeSakhi care companion"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="rounded-2xl border border-border bg-card p-3.5 shadow-2xs">
                <p className="text-xs font-bold uppercase tracking-wider text-terracotta">
                  Two-Way Impact
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Supporting families while creating dignified careers for women.
                </p>
              </div>
            </div>
            <div className="space-y-3.5 pt-6">
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                <img
                  src={hero1}
                  alt="Elderly woman cared for with dignity and warmth by a LifeSakhi Saha companion"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xs">
                <img
                  src={hero5}
                  alt="Confident Indian woman professional driving safely"
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR PHILOSOPHY */}
      <section id="philosophy" className="border-b border-border bg-card section-spacing scroll-mt-20">
        <div className="container-page max-w-5xl text-center">
          <p className="eyebrow">Our Philosophy</p>
          <h2 className="mt-3 font-display text-fluid-section font-semibold text-foreground">
            {LIFESAKHI_BRAND.philosophyStatement}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-fluid-body text-muted-foreground">
            {LIFESAKHI_BRAND.philosophySummary}
          </p>
        </div>
      </section>

      {/* 3. EVERY STAGE OF HER LIFE (INTERACTIVE 6-STAGE JOURNEY) */}
      <section id="life-stages" className="section-spacing scroll-mt-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <p className="eyebrow">The Life-Stage Experience</p>
              <h2 className="mt-2 font-display text-fluid-section font-semibold text-foreground">
                Every Stage of Her Life
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Select any life stage to explore the challenges, support needed, and how LifeSakhi contributes across a lifetime.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/life-stages">
                View Full 6-Stage Journey
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <LifeStagesJourney compact />
        </div>
      </section>

      {/* 4. OUR PILLARS */}
      <section id="pillars" className="border-y border-border bg-primary-soft/25 section-spacing scroll-mt-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <p className="eyebrow">Brand Architecture</p>
              <h2 className="mt-2 font-display text-fluid-section font-semibold text-foreground">
                Six Interconnected Pillars
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                We distinguish clearly between our operational Care &amp; Assistance services today and our expanding Women, Child, and Community development initiatives.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/pillars">Explore Pillar Details</Link>
            </Button>
          </div>

          <PillarsGrid />
        </div>
      </section>

      {/* 5. OUR WORK IN ACTION (OPERATIONAL CARE & CONFIGURATOR) */}
      <section id="care-in-action" className="section-spacing scroll-mt-20">
        <div className="container-page space-y-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow">Operational Today · South India</p>
              <h2 className="mt-2 font-display text-fluid-section font-semibold text-foreground">
                LifeSakhi Care &amp; Assistance in Action
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Need immediate support for an ageing parent, hospital admission, new mother, or family transit? Our verified Saha companions and registered nurses are active across Bengaluru, Chennai, Hyderabad, and Coimbatore.
              </p>
            </div>
            <Button asChild className="rounded-full">
              <Link to="/services">
                Browse All Services
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((svc) => (
              <Link
                key={svc.id}
                to="/services/$slug"
                params={{ slug: svc.slug }}
                className="group flex flex-col justify-between rounded-3xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  <span className="inline-block rounded-full bg-primary-soft px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                    Operational
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-foreground group-hover:text-primary">
                    {svc.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {svc.shortDesc}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs">
                  <span className="font-semibold text-foreground">
                    From {formatINR(svc.startingPrice)}/{svc.pricingUnit}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-primary">
                    Details <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Preserved Interactive Care Configurator */}
          <div className="rounded-3xl border border-border bg-card p-4 sm:p-8 shadow-soft">
            <UniversalCareConfigurator />
          </div>
        </div>
      </section>

      {/* 6. WOMEN EMPOWERING WOMEN */}
      <section className="border-y border-border bg-card section-spacing">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
              <img
                src={hero2}
                alt="LifeSakhi Saha care companion supporting patient recovery with professionalism"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6">
            <p className="eyebrow text-terracotta">Women Empowering Women</p>
            <h2 className="mt-2 font-display text-fluid-section font-semibold text-foreground">
              From Grassroots Self-Help Groups to Dignified Care Careers
            </h2>
            <p className="mt-4 text-fluid-body text-muted-foreground">
              Led by Women Self-Help Group Outreach Manager <strong>Prof. Shoba T</strong>, LifeSakhi partners with community networks across South India to train women in practical caregiving, safety protocols, and professional communication—enabling financial independence as verified <strong>Saha</strong> companions.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/become-an-attendant">
                  Become a Saha
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/attendant-login">Saha Portal Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STORIES THAT MATTER */}
      <section className="section-spacing">
        <div className="container-page">
          <CareRecoveryStory />
        </div>
      </section>

      {/* 8. LEADERSHIP & STRATEGIC PARTNERS */}
      <section className="border-y border-border bg-card section-spacing">
        <div className="container-page space-y-12">
          <div>
            <div className="max-w-2xl">
              <p className="eyebrow">Women Leadership &amp; Partners</p>
              <h2 className="mt-2 font-display text-fluid-section font-semibold text-foreground">
                Guided by Operational Rigour &amp; Strategic Partnerships
              </h2>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {WOMEN_LEADERSHIP.map((leader) => (
                <article
                  key={leader.id}
                  className="rounded-3xl border border-border bg-background p-6 sm:p-8"
                >
                  <div className="flex items-center gap-4">
                    <div className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground font-display text-lg font-bold">
                      {leader.initials}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {leader.name}
                      </h3>
                      <p className="text-sm font-medium text-primary">{leader.designation}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {leader.roleDescription}
                  </p>
                  {leader.quote && (
                    <blockquote className="mt-4 border-l-2 border-terracotta pl-4 text-sm italic text-foreground">
                      “{leader.quote}”
                    </blockquote>
                  )}
                </article>
              ))}
            </div>
          </div>

          {/* Strategic Investor & Partner — TRUSTGRID.AI */}
          <div className="rounded-3xl border border-border bg-primary-soft/30 p-6 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-4 flex flex-col items-start">
                <span className="eyebrow">{STRATEGIC_INVESTOR_PARTNER.sectionEyebrow}</span>
                <img
                  src={STRATEGIC_INVESTOR_PARTNER.logo}
                  alt="TRUSTGRID.AI official logo"
                  className="mt-4 h-14 w-auto object-contain"
                />
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-semibold text-foreground border border-border">
                  <BadgeCheck className="size-3.5 text-primary" />
                  {STRATEGIC_INVESTOR_PARTNER.designation}
                </span>
              </div>
              <div className="lg:col-span-8">
                <h3 className="font-display text-2xl font-semibold text-foreground">
                  {STRATEGIC_INVESTOR_PARTNER.heading}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {STRATEGIC_INVESTOR_PARTNER.partnershipStatement}
                </p>
                <div className="mt-5">
                  <Button asChild variant="outline" className="rounded-full">
                    <a
                      href={STRATEGIC_INVESTOR_PARTNER.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Explore TRUSTGRID.AI
                      <ExternalLink className="size-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. GET INVOLVED */}
      <section className="section-spacing">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow">Participate</p>
            <h2 className="mt-2 font-display text-fluid-section font-semibold text-foreground">
              Ways to Get Involved
            </h2>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/become-an-attendant"
              className="rounded-3xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
            >
              <Users className="size-6 text-primary" />
              <h3 className="mt-3 font-display text-lg font-semibold">Women Seeking Careers</h3>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Train and join as a verified Saha care companion.
              </p>
            </Link>
            <Link
              to="/booking"
              className="rounded-3xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
            >
              <HeartHandshake className="size-6 text-terracotta" />
              <h3 className="mt-3 font-display text-lg font-semibold">Families Seeking Support</h3>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Request elderly, hospital, postnatal, or nursing care.
              </p>
            </Link>
            <Link
              to="/ecosystem-partners"
              className="rounded-3xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
            >
              <Building2 className="size-6 text-plum" />
              <h3 className="mt-3 font-display text-lg font-semibold">NGOs &amp; Institutions</h3>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Collaborate on women skilling, SHGs, or child development.
              </p>
            </Link>
            <Link
              to="/get-involved"
              className="rounded-3xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
            >
              <Sparkles className="size-6 text-primary" />
              <h3 className="mt-3 font-display text-lg font-semibold">Volunteers &amp; Mentors</h3>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Contribute skills to community wellbeing initiatives.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-border bg-card section-spacing">
        <div className="container-page max-w-4xl">
          <div className="text-center">
            <p className="eyebrow">Clarity &amp; Trust</p>
            <h2 className="mt-2 font-display text-fluid-section font-semibold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-8 rounded-3xl border border-border bg-background p-6 sm:p-8">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className={idx === FAQS.length - 1 ? "border-b-0" : ""}
                >
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
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section id="enquiry" className="container-page py-16 md:py-24 scroll-mt-20">
        <div className="rounded-[2.5rem] bg-ink p-8 text-ink-foreground md:p-14 shadow-lift">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow text-terracotta">LifeSakhi · South India</span>
              <h2 className="mt-3 max-w-lg text-balance font-display text-3xl font-semibold md:text-4xl lg:text-5xl text-white leading-tight">
                Together, We Can Build Stronger Futures.
              </h2>
              <p className="mt-4 max-w-md text-base sm:text-lg text-ink-foreground/80 leading-relaxed">
                Whether your family needs dependable Saha care today or you want to collaborate on women and child development, our coordination desk is here to help.
              </p>

              <div className="mt-8 flex flex-wrap gap-3.5">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/20 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-[#25D366]/30 transition-colors min-h-[48px]"
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
                  <Link to="/booking">Request Care Support</Link>
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="ghost"
                  onClick={() => setHomeBizOpen(true)}
                  className="rounded-full text-white hover:bg-white/10 min-h-[48px]"
                >
                  Institutional Partnership
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-white/75">
                <a
                  href={`tel:${SITE.SUPPORT_PHONE_TEL}`}
                  className="flex items-center gap-1.5 font-medium text-white/90 hover:underline"
                >
                  <Phone className="size-3.5 text-terracotta" />
                  Direct Helpline: {SITE.SUPPORT_PHONE}
                </a>
                <span>•</span>
                <span>Bengaluru, Chennai, Hyderabad &amp; Coimbatore</span>
              </div>
            </div>

            <div className="rounded-2xl bg-background p-6 text-foreground shadow-lift">
              <EnquiryForm
                title="Connect With LifeSakhi"
                subtitle="Share your care requirement, Saha career interest, or partnership enquiry."
                className="bg-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      <BusinessEnquiryModal open={homeBizOpen} onOpenChange={setHomeBizOpen} />
    </div>
  );
}
