import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Users,
  ArrowRight,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
  Check,
  MapPin,
} from "lucide-react";
import { getICP, getService, SERVICES, formatINR, SITE, buildWhatsAppUrl } from "@/data/site";
import { PageHero, SectionHeading, ServiceCard } from "@/components/site/Cards";
import { BookLink, CallLink } from "@/components/site/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PredictableNextSteps } from "@/components/site/PredictableNextSteps";
import { seo } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/data/enterprise-content";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const icp = getICP(params.slug);
    if (!icp) throw notFound();
    return { icp };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return seo("Solution Not Found — ApnaCare", "The requested solution profile could not be found.", { noindex: true });
    }
    const { icp } = loaderData;
    return seo(
      `${icp.name} Solutions — Verified Care & Transit | ApnaCare`,
      icp.subtitle,
      {
        canonical: `https://apna-care.vercel.app/solutions/${icp.slug}`,
        keywords: [icp.name, "family care solutions", "elderly care South India", "verified attendants", "post hospital recovery"],
        schema: [
          buildBreadcrumbSchema([
            { name: "Home", item: "https://apna-care.vercel.app" },
            { name: icp.name, item: `https://apna-care.vercel.app/solutions/${icp.slug}` },
          ]),
        ],
      }
    );
  },
  component: ICPSolutionPage,
});

function ICPSolutionPage() {
  const { icp } = Route.useLoaderData();
  const matchedServices = icp.featuredServices
    .map((slug) => getService(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const waUrl = buildWhatsAppUrl(`Hi ApnaCare! I'm interested in care solutions for ${icp.name}.`);

  return (
    <>
      {/* ── Enterprise Hero: Split Layout with Telemetry & Care Commitments ── */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/[0.06] via-secondary/20 to-background py-14 md:py-20 lg:py-24">
        {/* Ambient atmospheric glows */}
        <div className="pointer-events-none absolute -top-32 right-0 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 -z-10 h-96 w-96 rounded-full bg-terracotta/10 blur-3xl" />

        <div className="container-page relative z-10 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary shadow-2xs">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              {icp.badge} · VERIFIED CARE COHORT
            </div>

            <h1 className="mt-4 font-display text-3xl font-semibold leading-[1.14] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              {icp.name}
            </h1>

            <p className="mt-5 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              {icp.subtitle}
            </p>

            {/* Core Commitments Strip */}
            <div className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-foreground">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-3" />
                </span>
                <span>100% Police & Biometric Clearance Verified Women Attendants & GNM Staff</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-foreground">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-3" />
                </span>
                <span>Bedside Ward Assistance with Seamless Transition to Home Convalescence</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-foreground">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-3" />
                </span>
                <span>Guaranteed 90-Minute Regional Backup Replacement Dispatch</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <BookLink size="lg" variant="warm">
                Book for {icp.name}
              </BookLink>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/15 px-6 py-3 text-sm font-semibold text-[#128C7E] shadow-2xs transition-all hover:bg-[#25D366]/25 hover:shadow-soft"
              >
                <MessageCircle className="size-4 text-[#25D366]" />
                WhatsApp Consultation
              </a>
              <CallLink variant="outline">
                Call Desk
              </CallLink>
            </div>
          </div>

          {/* Right Column: Operational Telemetry & Care Delivery Specs */}
          <aside className="card-soft relative overflow-hidden p-6 sm:p-8 shadow-lift border border-border/90 bg-card/95 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-border/80 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                  <ShieldCheck className="size-4.5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Operational Specs</h3>
                  <p className="text-[11px] text-muted-foreground">Regional Care Delivery Standards</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Hubs
              </span>
            </div>

            {/* 4-Stat Telemetry Matrix */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border/70 bg-secondary/30 p-3.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block line-clamp-1">{icp.stat.label}</span>
                <span className="mt-1 font-display text-2xl font-bold text-foreground block">{icp.stat.value}</span>
                <span className="mt-0.5 text-[11px] text-emerald-700 font-medium">Verified Feedback</span>
              </div>
              <div className="rounded-xl border border-border/70 bg-secondary/30 p-3.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">Emergency Backup</span>
                <span className="mt-1 font-display text-2xl font-bold text-foreground block">&lt; 90 min</span>
                <span className="mt-0.5 text-[11px] text-primary font-medium">Guaranteed Dispatch</span>
              </div>
              <div className="rounded-xl border border-border/70 bg-secondary/30 p-3.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">Caregiver Vetting</span>
                <span className="mt-1 font-display text-2xl font-bold text-foreground block">100%</span>
                <span className="mt-0.5 text-[11px] text-terracotta font-medium">Biometric & Police</span>
              </div>
              <div className="rounded-xl border border-border/70 bg-secondary/30 p-3.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">Support Line</span>
                <span className="mt-1 font-display text-2xl font-bold text-foreground block">24 / 7</span>
                <span className="mt-0.5 text-[11px] text-muted-foreground font-medium">Regional Care Desk</span>
              </div>
            </div>

            {/* Service Inclusions Highlights */}
            <div className="mt-5 space-y-1.5 border-t border-border/70 pt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">Inclusions for {icp.name}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Bedside vitals & hygiene logs, repositioning assistance, hospital discharge coordination, and zero-fee attendant replacements.
              </p>
            </div>

            {/* Active Cities */}
            <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
              <MapPin className="size-3 text-primary" />
              <span>Active Coverage:</span>
              <span className="font-semibold text-foreground">Bengaluru · Chennai · Hyderabad · Coimbatore</span>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Elevated Key Metric & Security Proof Strip ── */}
      <section className="border-b border-border bg-card py-6">
        <div className="container-page grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/70 p-4 shadow-2xs">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary font-bold">
              <Users className="size-5.5" />
            </span>
            <div>
              <p className="font-display text-2xl font-bold text-foreground">{icp.stat.value}</p>
              <p className="text-[11px] text-muted-foreground font-semibold uppercase">{icp.stat.label}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/70 p-4 shadow-2xs">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-700 font-bold">
              <ShieldCheck className="size-5.5" />
            </span>
            <div>
              <p className="text-base font-bold text-foreground">100% Verified</p>
              <p className="text-[11px] text-muted-foreground font-semibold uppercase">Biometric & Police Check</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/70 p-4 shadow-2xs">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-terracotta/15 text-terracotta font-bold">
              <CheckCircle2 className="size-5.5" />
            </span>
            <div>
              <p className="text-base font-bold text-foreground">&lt; 90 Min SLA</p>
              <p className="text-[11px] text-muted-foreground font-semibold uppercase">Replacement Protocol</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/70 p-4 shadow-2xs">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary font-bold">
              <Clock className="size-5.5" />
            </span>
            <div>
              <p className="text-base font-bold text-foreground">24/7 Regional</p>
              <p className="text-[11px] text-muted-foreground font-semibold uppercase">Dedicated Care Desk</p>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Narrative */}
      <section className="container-page py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            Understanding Your Family's Situation
          </div>
          <h2 className="mt-4 text-3xl font-semibold md:text-4xl text-foreground font-display">
            We Understand What Your Family Is Going Through
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {icp.challengesContext || icp.summary}
          </p>
        </div>

        {/* Problems Solved Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {icp.painPoints.map((item, idx) => (
            <div key={idx} className="card-soft overflow-hidden p-7 flex flex-col justify-between border border-border/80 hover:border-primary/40 hover:shadow-lift transition-all duration-200">
              <div>
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-terracotta/15 font-display text-sm font-bold text-terracotta">
                  0{idx + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-foreground leading-snug">
                  {item.problem}
                </h3>
              </div>
              <div className="mt-6 pt-5 border-t border-border/80 bg-primary-soft/30 -mx-7 -mb-7 p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="size-4" /> How ApnaCare Helps
                </p>
                <p className="text-sm text-foreground/90 leading-relaxed font-normal">
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPIN Framework Services Section */}
      {icp.spinServices && icp.spinServices.length > 0 && (
        <section className="border-t border-border bg-secondary/25 py-16 md:py-24">
          <div className="container-page">
            <SectionHeading
              center
              eyebrow="Situation · Challenge · Solution"
              title="How ApnaCare Tailors Care to Your Family"
              sub="Real-life situations, the specific difficulties families face, and the practical support we provide."
            />

            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              {icp.spinServices.map((svc) => (
                <div
                  key={svc.id}
                  className="card-soft flex flex-col justify-between p-8 border border-border/80 hover:border-primary/40 transition-all hover:shadow-soft"
                >
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4">
                      <h3 className="text-2xl font-semibold text-foreground">{svc.name}</h3>
                      <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
                        Starting {formatINR(svc.startingPrice)}/{svc.pricingUnit}
                      </span>
                    </div>

                    {/* Situation */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Does this sound familiar?
                      </p>
                      <p className="text-sm text-foreground/90 leading-relaxed bg-card/60 p-3.5 rounded-xl border border-border/50">
                        {svc.situation}
                      </p>
                    </div>

                    {/* Problem */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-terracotta mb-1">
                        Why this becomes difficult
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {svc.problem}
                      </p>
                    </div>

                    {/* Implication */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-destructive/80 mb-1">
                        What can happen without support?
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {svc.implication}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="pt-2 border-t border-border/60">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                        How ApnaCare helps
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        {svc.solution}
                      </p>
                    </div>

                    {/* Benefits checklist */}
                    <ul className="grid gap-2 pt-2 text-xs font-medium sm:grid-cols-2">
                      {svc.benefits.map((b, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-foreground/90">
                          <CheckCircle2 className="size-4 shrink-0 text-primary" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Footer: Secondary Pricing & CTA */}
                  <div className="mt-8 pt-5 border-t border-border flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Transparent base rate + 18% GST invoice
                      </p>
                      <Link
                        to="/services/$slug"
                        params={{ slug: svc.serviceSlug }}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        View inclusions & shift timings →
                      </Link>
                    </div>
                    <Button asChild variant="warm" size="sm">
                      <Link to="/services/$slug" params={{ slug: svc.serviceSlug }}>
                        {svc.ctaText}
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recommended Services Portfolio */}
      <section className="border-y border-border bg-card py-16 md:py-24">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Recommended Services"
            title={`Tailored Services for ${icp.name}`}
            sub="Carefully selected solutions matching the unique lifestyle and safety needs of your profile."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matchedServices.map((service) => (
              <ServiceCard key={service.id} s={service} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/services">
                View All Services <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Illustrative Scenario / Experience Spotlight */}
      <section className="container-page py-16 md:py-24">
        <div className="rounded-[2.5rem] bg-ink p-8 text-ink-foreground md:p-14">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow text-terracotta">Illustrative Experience</span>
            <blockquote className="mt-4 font-display text-xl leading-relaxed md:text-2xl text-ink-foreground">
              “{icp.quote.text}”
            </blockquote>
            <figcaption className="mt-6 border-t border-ink-foreground/20 pt-4">
              <p className="font-semibold text-lg text-primary-foreground">{icp.quote.author}</p>
              <p className="text-xs text-ink-foreground/70">{icp.quote.role} · {icp.quote.city}</p>
            </figcaption>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="container-page pb-16 md:pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] items-start">
          <div>
            <SectionHeading
              eyebrow="Common Questions"
              title={`FAQs for ${icp.name}`}
              sub="Clear answers about scheduling, security verifications, attendant replacements, and billing."
            />
            <div className="mt-8 flex flex-col gap-3">
              <BookLink size="lg" variant="warm">
                Book an Attendant Now
              </BookLink>
              <CallLink variant="outline">Call 24/7 Desk</CallLink>
            </div>
          </div>

          <Accordion type="single" collapsible className="card-soft px-6 py-2">
            {icp.faqs.map((faq, i) => (
              <AccordionItem key={i} value={String(i)}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Predictable Next Steps */}
      <PredictableNextSteps />

      {/* Callback Enquiry Form */}
      <section className="border-t border-border bg-secondary/20 py-16 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl">
            <EnquiryForm
              title={`Request a Callback for ${icp.name}`}
              subtitle="Share your requirements and an experienced care coordinator will call you back within 2 hours."
              className="card-soft bg-background p-8"
            />
          </div>
        </div>
      </section>
    </>
  );
}
