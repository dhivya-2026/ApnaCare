import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronDown,
  Cpu,
  ExternalLink,
  Handshake,
  Heart,
  HeartHandshake,
  Layers,
  Phone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { BusinessEnquiryModal } from "@/components/site/BusinessEnquiryModal";
import { TechEnquiryModal } from "@/components/site/TechEnquiryModal";
import {
  TECHNOLOGY_CATEGORIES,
  OFFERINGS_SECTIONS,
  type TechDeploymentStatus,
  type TechSolutionCategory,
} from "@/data/offerings";
import { SERVICES, SITE, formatINR } from "@/data/site";
import { STRATEGIC_INVESTOR_PARTNER } from "@/routes/about";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/offerings")({
  head: () =>
    seo(
      "Offerings — Care Services, Health Technology & Development Ecosystem | LifeSakhi",
      "Care that understands people. Technology that makes care smarter. Explore LifeSakhi's complete offerings: human-led care, 10 healthcare technology solutions, women & child development, and institutional partnerships.",
      {
        canonical: "https://apna-care.vercel.app/offerings",
        keywords: [
          "LifeSakhi offerings",
          "remote patient monitoring India",
          "elderly care technology South India",
          "telehealth for seniors",
          "smart home sensors eldercare",
          "women and child development",
          "healthcare institutional partnerships",
        ],
      }
    ),
  component: OfferingsPage,
});

function getStatusBadgeStyle(status: TechDeploymentStatus) {
  switch (status) {
    case "Operational":
      return "bg-primary text-primary-foreground";
    case "Available Through Partners":
      return "bg-secondary text-foreground border border-border";
    case "Under Evaluation":
      return "bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950/60 dark:text-amber-200";
    case "Planned":
      return "bg-muted text-muted-foreground border border-border";
  }
}

function OfferingsPage() {
  const [bizModalOpen, setBizModalOpen] = useState(false);
  const [techModalOpen, setTechModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<TechSolutionCategory | null>(null);
  const [techFilter, setTechFilter] = useState<"All" | TechDeploymentStatus>("All");
  const [expandedTechId, setExpandedTechId] = useState<string | null>(null);

  const filteredTech = TECHNOLOGY_CATEGORIES.filter((t) => {
    if (techFilter === "All") return true;
    return t.status === techFilter;
  });

  const careServices = SERVICES.slice(0, 6);

  return (
    <div className="bg-background">
      {/* ─── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary-soft/45 via-background to-background py-16 sm:py-20 lg:py-24">
        <div className="container-page max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary shadow-2xs">
            <Sparkles className="size-3.5 text-terracotta" />
            Ecosystem Offerings
          </span>

          <h1 className="mt-5 font-display text-fluid-hero font-semibold text-foreground">
            Care that understands people.{" "}
            <span className="text-primary block sm:inline">
              Technology that makes care smarter.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-fluid-body text-muted-foreground">
            LifeSakhi brings together compassionate human support, intelligent healthcare technologies and community-led development to create a more connected, accessible and dependable care ecosystem.
          </p>

          {/* Quick Category Navigation Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            <a
              href="#care-assistance"
              className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:border-primary/40 hover:bg-primary-soft transition-colors"
            >
              1. Care &amp; Assistance
            </a>
            <a
              href="#technology"
              className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:border-primary/40 hover:bg-primary-soft transition-colors"
            >
              2. Technology Solutions (10 Areas)
            </a>
            <a
              href="#women-child"
              className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:border-primary/40 hover:bg-primary-soft transition-colors"
            >
              3. Women &amp; Child Development
            </a>
            <a
              href="#partnerships"
              className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:border-primary/40 hover:bg-primary-soft transition-colors"
            >
              4. Partnership Solutions
            </a>
          </div>
        </div>
      </section>

      {/* ─── 1. CARE & ASSISTANCE (HUMAN-LED SERVICES) ─────────────────────────── */}
      <section id="care-assistance" className="section-spacing scroll-mt-24">
        <span id="care" className="sr-only" />
        <div className="container-page space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="eyebrow">{OFFERINGS_SECTIONS[0].eyebrow}</span>
              <h2 className="mt-2 font-display text-fluid-section font-semibold text-foreground">
                {OFFERINGS_SECTIONS[0].title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {OFFERINGS_SECTIONS[0].description}
              </p>
            </div>
            <Button asChild size="lg" className="rounded-full">
              <Link to="/booking">
                Request Care Assistance
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {careServices.map((svc) => (
              <article
                key={svc.id}
                className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-2xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                      Operational Now
                    </span>
                    <span className="text-xs font-bold text-foreground">
                      From {formatINR(svc.startingPrice)}/{svc.pricingUnit}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                    {svc.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {svc.shortDesc}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-border pt-3">
                    {svc.benefits.slice(0, 3).map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs text-foreground">
                        <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-2 border-t border-border flex items-center justify-between">
                  <Link
                    to="/services/$slug"
                    params={{ slug: svc.slug }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    Service Details
                    <ArrowRight className="size-3.5" />
                  </Link>
                  <Button asChild size="sm" variant="outline" className="rounded-full text-xs">
                    <Link to="/booking" search={{ service: svc.id }}>
                      Book Now
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 2. TECHNOLOGY SOLUTIONS (10 CATEGORIES) ───────────────────────────── */}
      <section id="technology" className="border-t border-border bg-primary-soft/20 section-spacing scroll-mt-20">
        <div className="container-page space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="eyebrow">{OFFERINGS_SECTIONS[1].eyebrow}</span>
              <h2 className="mt-2 font-display text-fluid-section font-semibold text-foreground">
                Technology-Enabled Care Solutions
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Ten structured technology areas designed to bring real-time clinical visibility, passive fall protection, and intelligent care coordination to Indian homes and families.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <ShieldCheck className="size-4 text-primary shrink-0" />
              <span>Strictly verified readiness: no unverified medical claims.</span>
            </div>
          </div>

          {/* Deployment Status Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-2">
              Filter Status:
            </span>
            {(["All", "Operational", "Available Through Partners", "Under Evaluation", "Planned"] as const).map(
              (status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setTechFilter(status)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                    techFilter === status
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "border border-border bg-card text-muted-foreground hover:bg-background hover:text-foreground"
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>

          {/* 10 Technology Category Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {filteredTech.map((tech) => {
              const isExpanded = expandedTechId === tech.id;
              return (
                <article
                  key={tech.id}
                  id={tech.id}
                  className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between scroll-mt-24"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-display text-xs font-bold text-muted-foreground">
                        Category {tech.number}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${getStatusBadgeStyle(
                          tech.status
                        )}`}
                      >
                        {tech.status}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                      {tech.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-primary">
                      {tech.subtitle}
                    </p>

                    {/* What It Does */}
                    <div className="mt-4 rounded-2xl bg-background/70 p-3.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        What It Does
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-foreground">
                        {tech.whatItDoes}
                      </p>
                    </div>

                    {/* Value for Family */}
                    <div className="mt-3 rounded-2xl bg-primary-soft/40 p-3.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                        Value for Individual &amp; Family
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-foreground">
                        {tech.valueForFamily}
                      </p>
                    </div>

                    {/* Progressive Disclosure: Expandable Features & Use Cases */}
                    {isExpanded && (
                      <div className="mt-4 space-y-3 pt-3 border-t border-border animate-fade-in">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                            Key Capabilities:
                          </p>
                          <ul className="mt-2 space-y-1">
                            {tech.keyFeatures.map((feat) => (
                              <li key={feat} className="flex items-start gap-1.5 text-xs text-foreground">
                                <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                            Target Clinical &amp; Home Use Cases:
                          </p>
                          <ul className="mt-2 space-y-1">
                            {tech.useCases.map((uc) => (
                              <li key={uc} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                                <span className="size-1.5 rounded-full bg-terracotta shrink-0 mt-1.5" />
                                <span>{uc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <p className="text-[11px] text-muted-foreground italic pt-1">
                          Status note: {tech.statusDescription}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom CTA & Expand Toggle */}
                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setExpandedTechId(isExpanded ? null : tech.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span>{isExpanded ? "Show Less" : "View Use Cases & Capabilities"}</span>
                      <ChevronDown
                        className={`size-3.5 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <Button
                      size="sm"
                      variant="warm"
                      onClick={() => {
                        if (tech.ctaAction === "booking") {
                          window.location.href = "/booking";
                        } else {
                          setSelectedTech(tech);
                          setTechModalOpen(true);
                        }
                      }}
                      className="rounded-full text-xs font-semibold"
                    >
                      {tech.ctaLabel}
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 3. WOMEN & CHILD DEVELOPMENT ───────────────────────────────────────── */}
      <section id="women-child" className="section-spacing scroll-mt-20">
        <div className="container-page space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="eyebrow text-terracotta">{OFFERINGS_SECTIONS[2].eyebrow}</span>
              <h2 className="mt-2 font-display text-fluid-section font-semibold text-foreground">
                {OFFERINGS_SECTIONS[2].title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {OFFERINGS_SECTIONS[2].description}
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/life-stages">
                Explore All 6 Life Stages
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-3xl border border-border bg-card p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Early Years &amp; Protection
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                Girl-Child &amp; Early Development
              </h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Foundational learning, nutrition awareness, and community protection modules designed to give every girl child an empowered start.
              </p>
              <div className="mt-4 pt-3 border-t border-border">
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold text-foreground">
                  Active Resource &amp; Proposed Partner Tracks
                </span>
              </div>
            </article>

            <article className="rounded-3xl border border-border bg-card p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
                Adolescence &amp; Health Literacy
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                Adolescent Life Skills &amp; Safety
              </h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Menstrual health education, digital safety, confidence mentoring, and assisted safe transit for young women commuters.
              </p>
              <div className="mt-4 pt-3 border-t border-border">
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold text-foreground">
                  Safe Transit Active · Mentoring Expanding
                </span>
              </div>
            </article>

            <article className="rounded-3xl border border-border bg-card p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-plum">
                Livelihoods &amp; Agency
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                Women SHG Vocational Careers
              </h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Partnering with grassroots Self-Help Groups across South India to train women as certified Saha professionals with fair, transparent income.
              </p>
              <div className="mt-4 pt-3 border-t border-border">
                <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[10px] font-bold text-primary">
                  Operational &amp; Actively Hiring
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ─── 4. PARTNERSHIP SOLUTIONS ───────────────────────────────────────────── */}
      <section id="partnerships" className="border-t border-border bg-card section-spacing scroll-mt-20">
        <div className="container-page space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="eyebrow">{OFFERINGS_SECTIONS[3].eyebrow}</span>
              <h2 className="mt-2 font-display text-fluid-section font-semibold text-foreground">
                {OFFERINGS_SECTIONS[3].title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {OFFERINGS_SECTIONS[3].description}
              </p>
            </div>
            <Button
              type="button"
              onClick={() => setBizModalOpen(true)}
              className="rounded-full"
            >
              Partner With Us
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl border border-border bg-background p-6">
              <Users className="size-6 text-primary" />
              <h3 className="mt-3 font-display text-lg font-semibold">Women Self-Help Groups (SHGs)</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Grassroots skilling alliances creating structured healthcare and caregiving employment for women across semi-urban clusters.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-background p-6">
              <Building2 className="size-6 text-terracotta" />
              <h3 className="mt-3 font-display text-lg font-semibold">Hospital &amp; Healthcare Networks</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Bedside ward companion staffing, seamless hospital discharge transition protocols, and outpatient follow-up support.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-background p-6">
              <Cpu className="size-6 text-plum" />
              <h3 className="mt-3 font-display text-lg font-semibold">Health-Tech &amp; Device Innovators</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Co-piloting remote vitals streaming, sensor hardware, and fall detection with LifeSakhi caregiver validation at home.
              </p>
            </div>
          </div>

          {/* Strategic Partner Spotlight */}
          <div className="rounded-3xl border border-border bg-primary-soft/30 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="eyebrow">{STRATEGIC_INVESTOR_PARTNER.sectionEyebrow}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                  {STRATEGIC_INVESTOR_PARTNER.name} — {STRATEGIC_INVESTOR_PARTNER.designation}
                </h3>
                <p className="mt-2 max-w-xl text-xs text-muted-foreground leading-relaxed">
                  {STRATEGIC_INVESTOR_PARTNER.partnershipStatement}
                </p>
              </div>
              <Button asChild variant="outline" className="rounded-full shrink-0">
                <a
                  href={STRATEGIC_INVESTOR_PARTNER.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5"
                >
                  Visit TRUSTGRID.AI
                  <ExternalLink className="size-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bottom Callback / Enquiry Action ───────────────────────────────────── */}
      <section id="enquiry" className="container-page py-16 scroll-mt-20">
        <div className="rounded-[2.5rem] bg-ink p-8 text-ink-foreground md:p-12 shadow-lift">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow text-terracotta">Connect With LifeSakhi</span>
              <h2 className="mt-3 font-display text-3xl font-semibold text-white leading-tight">
                Ready to explore human-led care or technology solutions?
              </h2>
              <p className="mt-3 text-sm text-ink-foreground/80 leading-relaxed">
                Speak directly with a South India regional coordinator to discuss home care needs, smart technology deployments, or institutional partnerships.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${SITE.SUPPORT_PHONE_TEL}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  <Phone className="size-3.5 text-terracotta" />
                  Call {SITE.SUPPORT_PHONE}
                </a>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setBizModalOpen(true)}
                  className="rounded-full border-white/20 text-white bg-transparent hover:bg-white/10 text-xs"
                >
                  Corporate / Partner Enquiry
                </Button>
              </div>
            </div>

            <div className="rounded-2xl bg-background p-6 text-foreground shadow-lift">
              <EnquiryForm
                title="Request Information"
                subtitle="Share your requirement and we will contact you within 15 minutes."
                className="bg-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      <BusinessEnquiryModal open={bizModalOpen} onOpenChange={setBizModalOpen} />
      <TechEnquiryModal
        open={techModalOpen}
        onOpenChange={setTechModalOpen}
        technology={selectedTech}
      />
    </div>
  );
}

