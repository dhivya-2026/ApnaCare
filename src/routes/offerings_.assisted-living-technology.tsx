import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Check,
  AlertCircle,
  ArrowRight,
  Cpu,
  Phone,
  Sparkles,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/Cards";
import { CallLink } from "@/components/site/Layout";
import { TechnologyExplorer, STATUS_BADGE_CLASSES } from "@/components/site/assisted-living/TechnologyExplorer";
import { SeniorCareComparison } from "@/components/site/assisted-living/SeniorCareComparison";
import { ConnectedCareEcosystem } from "@/components/site/assisted-living/ConnectedCareEcosystem";
import {
  TechnologyDiscoveryForm,
  type DiscoveryIntent,
} from "@/components/site/assisted-living/TechnologyDiscoveryForm";
import {
  ASSISTED_LIVING_TECH_CATEGORIES,
  SENIOR_CARE_USE_CASES,
  INDIA_SOLUTION_BUNDLES,
  RESPONSIBLE_TECH_PILLARS,
  type AssistedLivingTechCategory,
} from "@/data/assistedLivingTech";
import { SUPPORT_IMAGES } from "@/components/site/SupportServiceDetail";
import { buildBreadcrumbSchema } from "@/data/enterprise-content";
import { SITE } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/offerings_/assisted-living-technology")({
  head: () =>
    seo(
      "Assisted Living Technology in India — Senior Care Tech & Connected Support | LifeSakhi",
      "Helping seniors live independently, keeping families connected, and bringing human care closer through responsible assisted living technology in India: remote patient monitoring, telehealth, wearables, fall safety, and digital care management.",
      {
        canonical: "https://apna-care.vercel.app/offerings/assisted-living-technology",
        keywords: [
          "Assisted Living Technology in India",
          "Senior Care Technology",
          "Remote Patient Monitoring for Elderly",
          "Smart Home Safety for Seniors",
          "Fall Detection for Elderly People",
          "Elderly Care Wearables",
          "Telehealth for Senior Citizens",
          "Medication Management for Seniors",
          "AI in Elderly Care",
          "Digital Senior Care Management",
        ],
        schema: [
          buildBreadcrumbSchema([
            { name: "Home", item: "https://apna-care.vercel.app" },
            { name: "Offerings", item: "https://apna-care.vercel.app/offerings" },
            {
              name: "Technology for Assisted Living",
              item: "https://apna-care.vercel.app/offerings/assisted-living-technology",
            },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "LifeSakhi Technology for Assisted Living",
            provider: { "@type": "Organization", name: "LifeSakhi" },
            areaServed: ["Bengaluru", "Chennai", "Hyderabad", "Coimbatore"],
            description:
              "Human-centred assisted living technology combining digital care coordination, partner monitoring devices, and verified Saha caregivers.",
          },
        ],
      }
    ),
  component: AssistedLivingTechnologyPage,
});

function AssistedLivingTechnologyPage() {
  const [selectedTechId, setSelectedTechId] = useState<string | null>(null);
  const [selectedBundleId, setSelectedBundleId] = useState<string | null>(null);
  const [discoveryIntent, setDiscoveryIntent] = useState<DiscoveryIntent>("Request a Technology Demo");

  const scrollToDiscovery = (
    tech?: AssistedLivingTechCategory,
    bundleId?: string,
    intent?: DiscoveryIntent
  ) => {
    if (tech) setSelectedTechId(tech.id);
    if (bundleId) setSelectedBundleId(bundleId);
    if (intent) setDiscoveryIntent(intent);
    document.getElementById("technology-discovery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ─── 3. HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-gradient-to-b from-secondary/40 via-background to-background">
        <div className="container-page grid gap-10 py-14 md:py-20 lg:grid-cols-[1.35fr_1fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Link to="/offerings" className="font-semibold text-primary hover:underline">
                Offerings
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-semibold text-muted-foreground">Division C · Technology for Assisted Living</span>
            </div>

            <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-foreground">
              Technology That Makes Independent Living Safer and Care More Connected.
            </h1>

            <div className="mt-5 space-y-3 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                Technology is transforming senior care from reactive, hospital-centred treatment into proactive, connected and home-based care.
              </p>
              <p>
                Through remote health monitoring, telehealth, wearables, intelligent home sensors, AI-powered analytics and assistive technologies, seniors can maintain greater independence while families, caregivers and healthcare professionals stay connected.
              </p>
              <p className="font-medium text-foreground">
                LifeSakhi combines appropriate technology with human Saha support to help seniors live more safely, comfortably and independently.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                type="button"
                size="lg"
                variant="warm"
                className="rounded-full font-semibold"
                onClick={() => document.getElementById("technology-explorer")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore Technologies
                <ArrowRight className="size-4" />
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="rounded-full font-semibold"
                onClick={() => scrollToDiscovery(undefined, undefined, "Request a Care Consultation")}
              >
                Request a Technology Consultation
              </Button>
            </div>
          </div>

          {/* Indian Senior-Care Imagery + Connected Care Visual Card */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <img
                src={SUPPORT_IMAGES.elderly}
                alt="Elderly Indian mother at home supported by a LifeSakhi Saha companion"
                className="aspect-[4/3] w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-background/95 p-3.5 backdrop-blur border border-border/70">
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <HeartHandshake className="size-3.5" aria-hidden />
                  Human Care + Responsible Technology
                </p>
                <p className="mt-1 text-xs text-foreground leading-snug">
                  Helping seniors live independently, keeping families connected, and bringing human care closer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Honest Transparency Disclosure */}
      <section className="container-page pt-8">
        <div className="flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary-soft/35 p-4 text-xs sm:text-sm text-foreground">
          <AlertCircle className="size-4 shrink-0 text-primary mt-0.5" aria-hidden />
          <p>
            <strong>Honest capability disclosure:</strong> Every technology category below is clearly marked{" "}
            <strong>Deployed on LifeSakhi</strong>, <strong>Available Through Partners</strong>,{" "}
            <strong>Under Evaluation</strong>, or <strong>Future Opportunity</strong>. Third-party partner tools are never presented as LifeSakhi-manufactured products.
          </p>
        </div>
      </section>

      {/* ─── 4. TEN CORE TECHNOLOGY CATEGORIES ───────────────────────────────── */}
      <section id="technology-explorer" className="container-page py-14 scroll-mt-20 space-y-8">
        <SectionHeading
          eyebrow="10 Core Technology Categories"
          title="Assisted living technologies, explained clearly"
          sub="Filter by deployment status or search by need. Expand any card for equipment requirements, benefits, and real-world scenarios."
        />
        <TechnologyExplorer onSelectTechForEnquiry={(tech) => scrollToDiscovery(tech, undefined, "Request a Technology Demo")} />
      </section>

      {/* ─── 5. TECHNOLOGY-ENABLED SENIOR CARE ───────────────────────────────── */}
      <section className="bg-secondary/25 py-14 border-y border-border/60">
        <div className="container-page space-y-8">
          <SectionHeading
            eyebrow="Shifting From Reactive to Connected Care"
            title="How technology changes traditional senior care"
            sub="Compare traditional reactive care with continuous, connected support—and walk through a real-life multi-city family scenario."
          />
          <SeniorCareComparison />
        </div>
      </section>

      {/* ─── 6. SIX SENIOR-CARE USE CASES ────────────────────────────────────── */}
      <section className="container-page py-14 space-y-8">
        <SectionHeading
          eyebrow="Six Senior-Care Use Cases"
          title="Real family situations where technology and human support work together"
          sub="Each use case pairs practical tools with LifeSakhi's verified Saha companions and nurses."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SENIOR_CARE_USE_CASES.map((uc) => (
            <article key={uc.id} className="rounded-3xl border border-border bg-card overflow-hidden shadow-2xs flex flex-col">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                <img
                  src={SUPPORT_IMAGES[uc.imageKey]}
                  alt={uc.imageAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <h3 className="absolute bottom-3 left-4 font-display text-lg font-semibold text-white">
                  {uc.title}
                </h3>
              </div>

              <div className="p-5 space-y-3 text-xs flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div>
                    <span className="font-bold uppercase tracking-wider text-terracotta text-[10px]">The Senior&apos;s Challenge</span>
                    <p className="mt-0.5 text-foreground leading-relaxed">{uc.seniorProblem}</p>
                  </div>
                  <div>
                    <span className="font-bold uppercase tracking-wider text-primary text-[10px]">Relevant Technology</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {uc.relevantTechnology.map((t) => (
                        <span key={t} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-bold uppercase tracking-wider text-muted-foreground text-[10px]">How It Works</span>
                    <p className="mt-0.5 text-muted-foreground leading-relaxed">{uc.howItWorks}</p>
                  </div>
                  <div>
                    <span className="font-bold uppercase tracking-wider text-muted-foreground text-[10px]">How Families Benefit</span>
                    <p className="mt-0.5 text-muted-foreground leading-relaxed">{uc.familyBenefit}</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-primary-soft/40 p-3 border border-primary/15">
                  <span className="font-bold uppercase tracking-wider text-primary text-[10px] block">
                    LifeSakhi Human Support
                  </span>
                  <p className="mt-0.5 text-foreground leading-relaxed">{uc.humanSupportComplement}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─── 7. INDIA-SPECIFIC TECHNOLOGY SOLUTION BUNDLES ───────────────────── */}
      <section className="bg-secondary/25 py-14 border-y border-border/60">
        <div className="container-page space-y-8">
          <SectionHeading
            eyebrow="Proposed Solution Bundles for India"
            title="Four integrated care-and-technology concepts"
            sub="Designed for Indian homes and senior-living communities. Treated as proposed solution bundles—equipment sourcing, partner availability, and pricing are reviewed during consultation."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {INDIA_SOLUTION_BUNDLES.map((bundle) => (
              <article key={bundle.id} className="rounded-3xl border border-border bg-card p-6 sm:p-7 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">{bundle.code}</span>
                    <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                      {bundle.status}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold text-foreground">{bundle.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{bundle.intendedFor}</p>

                  <ul className="mt-4 space-y-2 text-xs text-foreground">
                    {bundle.components.map((c) => (
                      <li key={c} className="flex items-start gap-2">
                        <Check className="size-3.5 shrink-0 text-primary mt-0.5" aria-hidden />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 rounded-2xl bg-secondary/40 p-3 text-xs">
                    <strong className="text-foreground">Human care pairing:</strong>{" "}
                    <span className="text-muted-foreground">{bundle.humanPairing}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border/70 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[11px] text-muted-foreground max-w-xs">{bundle.note}</p>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full text-xs font-semibold shrink-0"
                    onClick={() => scrollToDiscovery(undefined, bundle.id, "Discuss a Senior-Care Technology Plan")}
                  >
                    Discuss This Bundle
                    <ArrowRight className="size-3.5" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. CONNECTED CARE ECOSYSTEM ─────────────────────────────────────── */}
      <section className="container-page py-14 space-y-8">
        <SectionHeading
          eyebrow="Connected Care Ecosystem"
          title="How devices, systems, caregivers and families connect"
          sub="Information moves smoothly from home to family and clinicians—always with human judgement guiding the next step."
        />
        <ConnectedCareEcosystem />
      </section>

      {/* ─── 9. PRIVACY, SECURITY AND RESPONSIBLE TECHNOLOGY ─────────────────── */}
      <section className="bg-secondary/25 py-14 border-y border-border/60">
        <div className="container-page space-y-8">
          <SectionHeading
            eyebrow="Trust & Responsible Deployment"
            title="Privacy, security and realistic technology boundaries"
            sub="Technology supports—and never replaces—professional medical care and compassionate human caregiving."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {RESPONSIBLE_TECH_PILLARS.map((pillar) => (
              <div key={pillar.title} className="rounded-2xl border border-border bg-card p-4 space-y-1.5">
                <ShieldCheck className="size-4 text-primary" aria-hidden />
                <h3 className="font-semibold text-xs sm:text-sm text-foreground">{pillar.title}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. TECHNOLOGY DEPLOYMENT STATUS MATRIX ─────────────────────────── */}
      <section className="container-page py-14 space-y-6">
        <SectionHeading
          eyebrow="Transparent Roadmap"
          title="Technology deployment status at a glance"
          sub="Exact status of all ten technology areas so families and institutions know what is operational today."
        />

        <div className="overflow-x-auto rounded-3xl border border-border bg-card">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-border bg-secondary/40 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-bold">Category</th>
                <th className="px-4 py-3 font-bold">Technology Area</th>
                <th className="px-4 py-3 font-bold">Deployment Status</th>
                <th className="px-4 py-3 font-bold">Operational Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ASSISTED_LIVING_TECH_CATEGORIES.map((t) => (
                <tr key={t.id} className="hover:bg-secondary/20">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{t.number}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">{t.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${STATUS_BADGE_CLASSES[t.status]
                        }`}
                    >
                      <Cpu className="size-3" aria-hidden />
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{t.statusNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── 11. CUSTOMER DISCOVERY & CONVERSION ─────────────────────────────── */}
      <section id="technology-discovery" className="bg-secondary/30 py-14 border-t border-border scroll-mt-20">
        <div className="container-page max-w-5xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="eyebrow flex items-center gap-1.5 text-primary">
                <Sparkles className="size-3.5" aria-hidden />
                Needs-Based Discovery
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-foreground">
                Find the right mix of technology and Saha care
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Share who needs support and your main concern. Our team will recommend honest, practical options.
              </p>
            </div>
            <CallLink />
          </div>

          <TechnologyDiscoveryForm
            preselectedTechId={selectedTechId}
            preselectedBundleId={selectedBundleId}
            preselectedIntent={discoveryIntent}
          />
        </div>
      </section>

      {/* ─── FINAL PROPOSITION STRIP ─────────────────────────────────────────── */}
      <section className="bg-primary py-10 text-primary-foreground">
        <div className="container-page flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <p className="font-display text-lg sm:text-xl font-semibold text-white max-w-2xl">
            &ldquo;Helping seniors live independently, keeping families connected, and bringing human care closer through responsible technology.&rdquo;
          </p>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button asChild size="sm" variant="warm" className="rounded-full font-semibold">
              <Link to="/booking">
                Book Human Care
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
            <a
              href={`tel:${SITE.SUPPORT_PHONE_TEL}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
            >
              <Phone className="size-3.5" />
              {SITE.SUPPORT_PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
