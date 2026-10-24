import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Heart,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  BadgeCheck,
  Compass,
  FileCheck2,
  Users,
  Building2,
  ArrowRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import { PageHero } from "@/components/site/Cards";
import { BookLink, CallLink } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { SITE, IMPACT, SAFETY_PILLARS, buildWhatsAppUrl } from "@/data/site";
import {
  BRAND_MESSAGING,
  CONTENT_GOVERNANCE_RULES,
  buildOrganizationSchema,
  buildBreadcrumbSchema,
} from "@/data/enterprise-content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo(
      "About ApnaCare — Dignity in Care, Empowerment in Service",
      "Learn about ApnaCare's mission, verified caregiving standards, and institutional commitment to safe, compassionate home healthcare and mobility across South India.",
      {
        canonical: "https://apna-care.vercel.app/about",
        keywords: [
          "about ApnaCare",
          "healthcare attendant mission",
          "women caregiver company India",
          "elderly care safety standards",
          "verified home care South India",
        ],
        schema: [
          buildOrganizationSchema(),
          buildBreadcrumbSchema([
            { name: "Home", item: "https://apna-care.vercel.app" },
            { name: "About Us", item: "https://apna-care.vercel.app/about" },
          ]),
        ],
      }
    ),
  component: AboutPage,
});

function AboutPage() {
  const [detailMode, setDetailMode] = useState<"concise" | "comprehensive">("concise");
  const waUrl = buildWhatsAppUrl("Hello ApnaCare team! I'd like to learn more about your organization and care philosophy.");

  return (
    <>
      <PageHero
        eyebrow="Our Purpose & Philosophy"
        title="Dignity in Care. Empowerment in Service."
        sub={BRAND_MESSAGING.aboutUs.short}
      >
        <Button asChild size="lg" variant="warm" className="min-h-[44px]">
          <Link to="/services">
            Explore Care Options
            <ArrowRight className="size-4 ml-1.5" />
          </Link>
        </Button>
        <BookLink size="lg" variant="outline" className="min-h-[44px]">
          Book an Attendant
        </BookLink>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors min-h-[44px]"
        >
          <MessageCircle className="size-4 text-[#25D366]" />
          Talk to Care Coordinators
        </a>
      </PageHero>

      {/* ── 1. The Core Narrative (Situation & Institutional Response) ── */}
      <section className="container-page py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <span className="eyebrow">Why ApnaCare Exists</span>
            <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
              Because inviting someone into your home takes real trust.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                When an ageing parent struggles with mobility, when a patient leaves the hospital with post-surgical drains, or when new parents bring home a newborn, families face an agonizing dilemma: how do you find someone dependable, vetted, and genuinely compassionate without relying on unregulated neighborhood agencies?
              </p>
              <p>
                Unorganized domestic care in India has historically suffered from unverified backgrounds, sudden caregiver absenteeism, zero institutional accountability, and unfair worker exploitation.
              </p>
              <p className="text-foreground font-medium">
                ApnaCare transforms this landscape. We build an institutional safety net: 100% police verification, certified clinical and geriatric training, 24/7 care desk monitoring, and a guaranteed backup replacement within 90 minutes.
              </p>
            </div>

            {/* Toggle between Concise and Comprehensive view */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-medium">View narrative depth:</span>
              <div className="inline-flex rounded-full border border-border bg-secondary/40 p-1 text-xs font-semibold">
                <button
                  onClick={() => setDetailMode("concise")}
                  className={`rounded-full px-3 py-1 transition-all ${
                    detailMode === "concise" ? "bg-card text-foreground shadow-2xs" : "text-muted-foreground"
                  }`}
                >
                  Summary
                </button>
                <button
                  onClick={() => setDetailMode("comprehensive")}
                  className={`rounded-full px-3 py-1 transition-all ${
                    detailMode === "comprehensive" ? "bg-card text-foreground shadow-2xs" : "text-muted-foreground"
                  }`}
                >
                  In-Depth History
                </button>
              </div>
            </div>

            {detailMode === "comprehensive" && (
              <div className="mt-4 rounded-2xl border border-primary/20 bg-primary-soft/40 p-5 text-sm text-muted-foreground leading-relaxed animate-fade-in">
                {BRAND_MESSAGING.aboutUs.long}
              </div>
            )}
          </div>

          {/* Dual Mission Pillars Card */}
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Our Dual Commitment</h3>
            <div className="space-y-5">
              <div className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <Heart className="size-6" />
                </span>
                <div>
                  <h4 className="font-semibold text-foreground">For Families</h4>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Uncompromising safety, police-verified attendants, transparent GST pricing, and live WhatsApp updates so you never have to carry caregiving anxiety alone.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-terracotta/20 text-terracotta">
                  <Sparkles className="size-6" />
                </span>
                <div>
                  <h4 className="font-semibold text-foreground">For Women Caregivers</h4>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Dignified economic empowerment, above-market compensation, insurance protection, and structured career upskilling in clinical hygiene and geriatric ergonomics.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-secondary text-foreground">
                  <ShieldCheck className="size-6" />
                </span>
                <div>
                  <h4 className="font-semibold text-foreground">For Healthcare Continuity</h4>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Clear separation between non-clinical attendant assistance and registered nursing procedures, ensuring patients receive medically safe and statutorily compliant care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Mission & Vision Statements ── */}
      <section className="border-y border-border bg-secondary/30 py-16 md:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="eyebrow">Core Direction</span>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Mission & Vision</h2>
            <p className="mt-3 text-muted-foreground">The north star guiding our coordinators and attendants across South India.</p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Mission */}
            <div className="card-soft p-8 md:p-10 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                  <Compass className="size-3.5" /> Our Mission
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">
                  {BRAND_MESSAGING.mission.short}
                </h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {BRAND_MESSAGING.mission.long}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-xs font-semibold text-primary">
                <CheckCircle2 className="size-4" />
                <span>Empowering caregivers · Reassuring families</span>
              </div>
            </div>

            {/* Vision */}
            <div className="card-soft p-8 md:p-10 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-terracotta/20 px-3 py-1 text-xs font-semibold text-terracotta-foreground">
                  <Sparkles className="size-3.5" /> Our Vision
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">
                  {BRAND_MESSAGING.vision.short}
                </h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {BRAND_MESSAGING.vision.long}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-xs font-semibold text-primary">
                <CheckCircle2 className="size-4" />
                <span>Institutional quality · Humane care</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Content Governance & Truth Standards ── */}
      <section className="container-page py-16 md:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">Enterprise Governance</span>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Our Commitment to Factual Integrity</h2>
          <p className="mt-3 text-muted-foreground">
            Healthcare communication demands uncompromising honesty. We adhere to strict governance rules that prevent fabricated claims, misleading medical advice, or unverified operational guarantees.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CONTENT_GOVERNANCE_RULES.map((rule, idx) => (
            <div key={idx} className="card-soft p-6 flex flex-col justify-between">
              <div>
                <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
                  <FileCheck2 className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{rule.rule}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{rule.description}</p>
              </div>
              <p className="mt-4 pt-3 border-t border-border text-[11px] text-primary font-medium">
                Mandatory Operational Policy
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Impact Track Record ── */}
      <section className="bg-ink py-16 text-ink-foreground md:py-20">
        <div className="container-page">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta">Operational Scale</span>
            <h2 className="mt-2 text-3xl font-semibold text-white">Measured by Real Family Trust</h2>
            <p className="mt-2 text-sm text-ink-foreground/75">
              Verified operational statistics across Bengaluru, Chennai, Hyderabad, and Coimbatore.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            {IMPACT.map(([val, label]) => (
              <div key={label} className="p-4">
                <p className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">{val}</p>
                <p className="mt-2 text-xs sm:text-sm text-ink-foreground/75 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Active City Operating Desks ── */}
      <section className="container-page py-16 md:py-24">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12 shadow-soft">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <span className="eyebrow">Operating Hubs</span>
              <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Local Care Desks in 4 Major Metros</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                We maintain physical care coordination desks, verified attendant pools, and standby replacement teams in Bengaluru, Chennai, Hyderabad, and Coimbatore.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Bengaluru (HQ)", "Chennai", "Hyderabad", "Coimbatore"].map((city) => (
                  <span
                    key={city}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary"
                  >
                    <Building2 className="size-3.5" />
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-secondary/40 p-6 space-y-4">
              <h3 className="font-semibold text-base text-foreground">Central Headquarters</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {SITE.headquarters}
              </p>
              <div className="pt-2 border-t border-border flex flex-wrap gap-4 text-xs">
                <span className="font-medium text-foreground">Direct Desk: {SITE.SUPPORT_PHONE}</span>
                <span className="text-muted-foreground">Operating: {SITE.operatingHours}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Final Call to Action ── */}
      <section className="container-page pb-20 text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">Experience Care Built on Dignity & Trust</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-sm sm:text-base">
          Our care coordinators are ready to understand your family's situation and match you with a verified attendant.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" variant="warm" className="min-h-[44px]">
            <Link to="/services">
              Explore Care Services
              <ArrowRight className="size-4 ml-1.5" />
            </Link>
          </Button>
          <BookLink size="lg" variant="outline" className="min-h-[44px]">
            Book an Attendant
          </BookLink>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/15 px-6 py-3 text-sm font-semibold text-[#128C7E] transition-colors hover:bg-[#25D366]/25 min-h-[44px]"
          >
            <MessageCircle className="size-4 text-[#25D366]" />
            Ask a Coordinator
          </a>
        </div>
      </section>
    </>
  );
}
