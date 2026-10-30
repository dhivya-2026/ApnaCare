import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  BadgeCheck,
  Check,
  Clock,
  Languages,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  MessageCircle,
  FileText,
  HeartHandshake,
  MapPin,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SERVICES, formatINR, getService, buildWhatsAppUrl, SITE } from "@/data/site";
import {
  ENTERPRISE_SERVICES,
  buildServiceSchema,
  buildBreadcrumbSchema,
} from "@/data/enterprise-content";
import { getCanonicalPricing } from "@/data/canonicalPricing";
import { getCanonicalServiceBySlug } from "@/data/canonicalEcosystem";
import { SectionHeading, ServiceCard } from "@/components/site/Cards";
import { BookLink, CallLink } from "@/components/site/Layout";
import { PredictableNextSteps } from "@/components/site/PredictableNextSteps";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { seo } from "@/lib/seo";
import { CareRecoveryStory } from "@/components/site/CareRecoveryStory";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import hero6 from "@/assets/hero-6.jpg";
import nursingCare from "@/assets/nursing-care.jpg";

const SERVICE_STORY_IMAGES: Record<string, { img: string; alt: string }> = {
  "elderly-care": {
    img: hero1,
    alt: "Caregiver gently assisting an elderly South Indian lady at home with everyday living routines",
  },
  "hospital-attendants": {
    img: hero2,
    alt: "Attendant providing bedside support to a recovering patient in a hospital room",
  },
  "nursing-services": {
    img: nursingCare,
    alt: "Licensed registered nurse administering clinical care under physician prescription",
  },
  "post-natal-care": {
    img: hero4,
    alt: "Caregiver supporting a mother and newborn infant with comforting routines at home",
  },
  "travel-assistance": {
    img: hero5,
    alt: "Transit attendant providing assisted travel mobility assistance at railway terminal",
  },
  "lifestyle-support": {
    img: hero3,
    alt: "Professional companion coordinating family appointment and vehicle transit",
  },
  "home-personal-care": {
    img: hero6,
    alt: "Compassionate attendant assisting a senior gentleman in a sunny South Indian home garden",
  },
  "women-drivers": {
    img: hero3,
    alt: "Professional verified woman driver providing assisted travel for senior passenger safely",
  },
  "airport-pickup": {
    img: hero3,
    alt: "Verified airport travel companion assisting elder passenger at terminal gate",
  },
  "railway-assistance": {
    img: hero5,
    alt: "Platform assisted travel attendant guiding senior passenger safely through railway station",
  },
  "security-support": {
    img: hero5,
    alt: "Vetted security companion ensuring safe assisted travel and residential accompaniment",
  },
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = getService(params.slug);
    if (!s) throw notFound();
    const enterprise = ENTERPRISE_SERVICES[params.slug];
    const canonicalPricing = getCanonicalPricing(params.slug);
    const canonicalService = getCanonicalServiceBySlug(params.slug);
    return { s, enterprise, canonicalPricing, canonicalService };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return seo("Service Not Found — ApnaCare", "The requested service could not be found.", { noindex: true });
    }
    const { s, enterprise } = loaderData;
    const title = enterprise?.seo.title ?? `${s.name} — Verified Women Attendants | ApnaCare`;
    const description = enterprise?.seo.description ?? s.description;
    const primaryKeyword = enterprise?.seo.primaryKeyword ?? s.name;
    const secondaryKeywords = enterprise?.seo.secondaryKeywords ?? [s.category, "care attendant", "home care South India"];

    const schemas: Array<Record<string, unknown>> = [
      buildBreadcrumbSchema([
        { name: "Home", item: "https://apna-care.vercel.app" },
        { name: "Services", item: "https://apna-care.vercel.app/services" },
        { name: s.name, item: `https://apna-care.vercel.app/services/${s.slug}` },
      ]),
    ];

    if (enterprise) {
      schemas.push(buildServiceSchema(enterprise));
    }

    return seo(title, description, {
      canonical: `https://apna-care.vercel.app/services/${s.slug}`,
      keywords: [primaryKeyword, ...secondaryKeywords],
      schema: schemas,
    });
  },
  component: Detail,
});

const SERVICE_CTA_LABELS: Record<string, string> = {
  "elderly-care": "Enquire About Elder Care",
  "hospital-attendants": "Ask About Hospital Assistance",
  "nursing-services": "Enquire About Home Nursing",
  "post-natal-care": "Plan Postnatal Support",
  "travel-assistance": "Check Travel Support Availability",
  "women-drivers": "Enquire About Women Chauffeuses",
  "airport-pickup": "Book Airport Meet & Greet",
  "railway-assistance": "Arrange Station Assistance",
  "home-personal-care": "Enquire About Personal Care",
  "lifestyle-support": "Arrange Lifestyle Support",
  "security-support": "Request Security & Assisted Travel",
};

function Detail() {
  const { s, enterprise, canonicalPricing, canonicalService } = Route.useLoaderData();
  const waUrl = buildWhatsAppUrl(`Hello ApnaCare! I would like to inquire about ${s.name} for my family.`);
  const ctaLabel = SERVICE_CTA_LABELS[s.slug] ?? `Enquire About ${s.name}`;

  useEffect(() => {
    track("service_detail_viewed", {
      service_id: s.slug,
      service_name: s.name,
      category: s.category,
      readiness: canonicalService?.readiness || "Operational",
      starting_price: canonicalPricing?.startingPrice ?? s.startingPrice,
    });
    track("pricing_details_viewed", {
      service_id: s.slug,
      pricing_unit: s.pricingUnit,
      starting_price: canonicalPricing?.startingPrice ?? s.startingPrice,
      shift_types: canonicalPricing ? Object.keys(canonicalPricing.pricingTiers).join(", ") : "standard",
      has_gst_disclosure: true,
    });
  }, [s.slug]);

  return (
    <>
      {/* ── 1. Hero Section: Headline, Summary & Starting Rate ── */}
      <section className="border-b border-border bg-gradient-to-b from-secondary/40 via-background to-background">
        <div className="container-page grid gap-10 py-16 md:py-20 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow">{s.category}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-xs font-semibold text-primary">{enterprise?.eyebrow ?? s.badge ?? "Verified Service"}</span>
              {canonicalService && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                    {canonicalService.readiness}
                  </span>
                </>
              )}
            </div>

            <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-foreground">
              {enterprise ? enterprise.headline.medium : s.name}
            </h1>

            <p className="mt-4 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              {enterprise ? enterprise.summary.medium : s.description}
            </p>

            <ul className="mt-6 space-y-2.5">
              {s.benefits.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                  <Check className="size-4 shrink-0 text-primary" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Active City Coverage Quick Links */}
            <div className="mt-6 rounded-xl border border-border/70 bg-card/60 p-3.5 max-w-xl">
              <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <MapPin className="size-3.5 text-primary" /> Active Operating Clusters with 90-Min Regional Backup:
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                {["bengaluru", "chennai", "hyderabad", "coimbatore"].map((cSlug) => (
                  <Link
                    key={cSlug}
                    to="/cities/$city"
                    params={{ city: cSlug }}
                    className="rounded-md border border-border bg-background px-2.5 py-1 font-medium capitalize text-foreground hover:border-primary/60 hover:text-primary transition-colors"
                  >
                    {cSlug} · Operational
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3.5">
              <BookLink service={s.slug} size="lg" variant="warm">
                {ctaLabel}
              </BookLink>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/15 px-6 py-3 text-sm font-semibold text-[#128C7E] transition-colors hover:bg-[#25D366]/25"
              >
                <MessageCircle className="size-4 text-[#25D366]" />
                Inquire on WhatsApp
              </a>
            </div>
          </div>

          {/* Pricing & Transparency Card */}
          <aside className="card-soft h-fit p-7 md:p-8 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {canonicalPricing?.pricingType ?? "Transparent"} Pricing
              </span>
              <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                Zero Broker Fees
              </span>
            </div>

            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-display text-4xl font-semibold text-foreground">
                {formatINR(canonicalPricing?.startingPrice ?? s.startingPrice)}
              </span>
              <span className="text-sm font-normal text-muted-foreground">/{s.pricingUnit}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {canonicalPricing?.taxTreatment.label ?? "+ 18% statutory GST (SAC 9993)"}
            </p>

            {/* Shift durations & Tier breakdown */}
            {canonicalPricing?.pricingTiers && (
              <div className="mt-4 rounded-xl border border-border/80 bg-secondary/30 p-3 text-xs space-y-1.5">
                <span className="font-semibold text-foreground block">Verified Shift Rates:</span>
                {canonicalPricing.pricingTiers.shift8Hr && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>8-Hour Day Shift:</span>
                    <span className="font-medium text-foreground">{formatINR(canonicalPricing.pricingTiers.shift8Hr)}</span>
                  </div>
                )}
                {canonicalPricing.pricingTiers.shift12Hr && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>12-Hour Day/Night Shift:</span>
                    <span className="font-medium text-foreground">{formatINR(canonicalPricing.pricingTiers.shift12Hr)}</span>
                  </div>
                )}
                {canonicalPricing.pricingTiers.shift24HrLiveIn && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>24-Hour Residential Live-in:</span>
                    <span className="font-medium text-foreground">{formatINR(canonicalPricing.pricingTiers.shift24HrLiveIn)}/day</span>
                  </div>
                )}
                {canonicalPricing.pricingTiers.perVisit && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Per Clinical Procedure Visit:</span>
                    <span className="font-medium text-foreground">{formatINR(canonicalPricing.pricingTiers.perVisit)}</span>
                  </div>
                )}
                {canonicalPricing.pricingTiers.perTrip && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Single Journey Assisted Travel:</span>
                    <span className="font-medium text-foreground">{formatINR(canonicalPricing.pricingTiers.perTrip)}</span>
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                <BadgeCheck className="size-4 text-terracotta" aria-hidden />
                Rated {s.rating}/5
              </span>
              <span className="text-xs text-muted-foreground">({s.reviewCount} verified bookings)</span>
            </div>

            <div className="mt-5 space-y-2.5 text-xs text-muted-foreground border-t border-border pt-4">
              <p className="flex items-center gap-2">
                <Clock className="size-4 shrink-0 text-primary" aria-hidden />
                <span>{s.availability}</span>
              </p>
              <p className="flex items-center gap-2">
                <Languages className="size-4 shrink-0 text-primary" aria-hidden />
                <span>Available in: {s.languages.join(", ")}</span>
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden />
                <span>Government ID & Police Background Screened</span>
              </p>
            </div>

            <BookLink service={s.slug} variant="warm" className="mt-6 w-full">
              {ctaLabel}
            </BookLink>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Priority cluster standby backup · Full refund prior to dispatch
            </p>
            <p className="mt-2 border-t border-border/60 pt-2 text-center text-[10px] text-muted-foreground leading-snug">
              Official GST invoice provided. Medical insurance reimbursement eligibility depends on individual policy terms and insurer approval.
            </p>
          </aside>
        </div>
      </section>

      {/* ── 2. Visual Care Story & Situation Context (Priority Section B) ── */}
      {s.slug === "hospital-attendants" ? (
        <CareRecoveryStory sourceContext="service_hospital_attendants" />
      ) : enterprise ? (
        <section className="bg-secondary/25 py-16 border-b border-border/50">
          <div className="container-page max-w-5xl">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-soft">
              <div className="grid gap-8 lg:grid-cols-12 items-center">
                {/* Visual Image Column (5 cols) */}
                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted border border-border shadow-lift">
                    <img
                      src={SERVICE_STORY_IMAGES[s.slug]?.img ?? hero1}
                      alt={SERVICE_STORY_IMAGES[s.slug]?.alt ?? `${s.name} provided by ApnaCare`}
                      width={800}
                      height={600}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur shadow-xs">
                      {s.name}
                    </span>
                  </div>
                </div>

                {/* Narrative & Story Column (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <span className="eyebrow">Understanding Your Situation</span>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-display font-semibold text-foreground">
                      {s.slug === "nursing-services"
                        ? "Recovery is hard enough. You shouldn't have to coordinate clinical care alone."
                        : `Why Families Need ${s.name}`}
                    </h2>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-amber-600/20 bg-amber-500/5 p-4">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                          The Everyday Strain
                        </p>
                        <p className="mt-1 text-xs text-readable-muted leading-relaxed">
                          {enterprise.spin.situation}
                        </p>
                        <p className="mt-2 text-xs font-semibold text-foreground leading-snug">
                          {enterprise.spin.problem}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-primary/25 bg-primary-soft/40 p-4">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                          How ApnaCare Solves It
                        </p>
                        <p className="mt-1 text-xs font-semibold text-foreground leading-snug">
                          {enterprise.spin.solution}
                        </p>
                        <p className="mt-2 text-xs text-readable-muted leading-relaxed">
                          {enterprise.spin.benefit}
                        </p>
                      </div>
                    </div>

                    {/* Three Simple Coordination Steps */}
                    <div className="mt-6 border-t border-border/70 pt-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-foreground block mb-2">
                        How We Coordinate Care:
                      </span>
                      <div className="grid sm:grid-cols-3 gap-2 text-xs">
                        <div className="rounded-xl bg-secondary/35 p-2.5 border border-border/70">
                          <span className="font-bold text-primary block mb-0.5">1. Triage</span>
                          <span className="text-readable-muted text-[11px]">Match care level to daily living vs clinical needs</span>
                        </div>
                        <div className="rounded-xl bg-secondary/35 p-2.5 border border-border/70">
                          <span className="font-bold text-primary block mb-0.5">2. Verified ID</span>
                          <span className="text-readable-muted text-[11px]">Photo ID authenticated & police screened</span>
                        </div>
                        <div className="rounded-xl bg-secondary/35 p-2.5 border border-border/70">
                          <span className="font-bold text-primary block mb-0.5">3. Updates & Backup</span>
                          <span className="text-readable-muted text-[11px]">Daily WhatsApp logs & 90-min standby protocol</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* ── 3. What's Included vs Excluded ── */}
      <section className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Who it's for & Inclusions */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Who This Service is For</h2>
            <ul className="mt-4 space-y-2.5">
              {s.whoFor.map((x) => (
                <li key={x} className="flex gap-2.5 text-sm text-foreground">
                  <Check className="size-5 shrink-0 text-primary" aria-hidden />
                  <span>{x}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-2xl font-semibold text-foreground">What's Included in Every Shift</h2>
            <ul className="mt-4 space-y-2.5">
              {s.includes.map((x) => (
                <li key={x} className="flex gap-2.5 text-sm text-muted-foreground">
                  <Check className="size-5 shrink-0 text-primary" aria-hidden />
                  <span className="text-foreground">{x}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions & Scope Boundaries */}
          <div>
            {enterprise ? (
              <>
                <h2 className="text-2xl font-semibold text-foreground">Service Boundaries & Exclusions</h2>
                <p className="mt-2 text-xs text-muted-foreground">
                  To protect patient safety, our attendants operate strictly within defined care scopes:
                </p>
                <ul className="mt-4 space-y-2.5">
                  {enterprise.exclusions.map((x) => (
                    <li key={x} className="flex gap-2.5 text-sm text-muted-foreground">
                      <AlertCircle className="size-4 shrink-0 text-terracotta mt-0.5" aria-hidden />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>

                {/* Scope Comparison Callout */}
                <div className="mt-8 rounded-2xl border border-primary/20 bg-primary-soft/40 p-6">
                  <h3 className="font-semibold text-sm text-primary flex items-center gap-2">
                    <ShieldCheck className="size-4" />
                    Nurse vs Attendant Scope Clarity
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {enterprise.nurseVsAttendantScope.whenToChooseNurse}
                  </p>
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Need clinical wound dressing or injections?</span>
                    <Link to="/services/$slug" params={{ slug: "nursing-services" }} className="font-semibold text-primary hover:underline">
                      View Nursing Services →
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Safety & Qualifications</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.qualifications.map((x) => (
                    <span key={x} className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-medium text-primary">
                      <BadgeCheck className="size-4" aria-hidden />
                      {x}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                  Every booking is supervised by a localized care coordinator and includes 24/7 emergency dispatch support.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. Frequently Asked Questions about this Service ── */}
      <section className="bg-secondary/30 py-16 border-t border-border/50">
        <div className="container-page max-w-3xl">
          <SectionHeading
            center
            eyebrow="Clear Answers"
            title={`Frequently Asked About ${s.name}`}
            sub="Specific details about shift schedules, matching, and preparation."
          />
          <Accordion type="single" collapsible className="mt-8 card-soft px-6 shadow-soft">
            {s.faqs.map((f, i) => (
              <AccordionItem key={i} value={String(i)} className={i === s.faqs.length - 1 ? "border-b-0" : ""}>
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold py-4 hover:no-underline hover:text-primary">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-4">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Predictable Next Steps ── */}
      <PredictableNextSteps serviceName={s.name} />

      {/* ── 5. Contextual Final CTA Strip ── */}
      <section className="bg-primary py-12 text-primary-foreground">
        <div className="container-page flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl text-white">
              Ready to Arrange {s.name}?
            </h2>
            <p className="mt-2 text-sm text-primary-foreground/80 max-w-md">
              Share your schedule and language preference. Our care coordinator matches verified profiles within 2 hours.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-3">
            <BookLink service={s.slug} size="lg" variant="warm">
              {ctaLabel}
            </BookLink>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-primary-foreground/25 transition-colors"
            >
              <MessageCircle className="size-4 text-[#25D366]" />
              Talk on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── 6. Related Care Services ── */}
      <section className="py-16">
        <div className="container-page">
          <SectionHeading title="Related Services for Family Well-Being" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3).map((x) => (
              <ServiceCard key={x.id} s={x} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
