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
} from "lucide-react";
import { getICP, getService, SERVICES, formatINR, SITE, buildWhatsAppUrl } from "@/data/site";
import { PageHero, SectionHeading, ServiceCard } from "@/components/site/Cards";
import { BookLink, CallLink } from "@/components/site/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/site/EnquiryForm";
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
      {/* Hero Section */}
      <PageHero
        eyebrow={icp.badge}
        title={icp.name}
        sub={icp.subtitle}
      >
        <BookLink size="lg" variant="warm">
          Book for {icp.name}
        </BookLink>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/15 px-6 py-3 text-sm font-semibold text-[#128C7E] transition-colors hover:bg-[#25D366]/25"
        >
          <MessageCircle className="size-4 text-[#25D366]" />
          WhatsApp Consultation
        </a>
      </PageHero>

      {/* Stat Bar */}
      <section className="border-b border-border bg-card py-6">
        <div className="container-page flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary font-bold">
              <Users className="size-6" />
            </span>
            <div>
              <p className="font-display text-2xl font-bold text-foreground">{icp.stat.value}</p>
              <p className="text-xs text-muted-foreground uppercase font-semibold">{icp.stat.label}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-muted-foreground">
            <span className="flex items-center gap-1.5 text-foreground">
              <ShieldCheck className="size-4 text-primary" /> 100% Biometric & Police Verified
            </span>
            <span className="flex items-center gap-1.5 text-foreground">
              <CheckCircle2 className="size-4 text-terracotta" /> Verified Replacement Protocol
            </span>
            <span className="flex items-center gap-1.5 text-foreground">
              <Clock className="size-4 text-primary" /> Dedicated Care Desk
            </span>
          </div>
        </div>
      </section>

      {/* Summary Narrative */}
      <section className="container-page py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Understanding Your Family's Situation</span>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl text-foreground">
            We Understand What Your Family Is Going Through
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {icp.challengesContext || icp.summary}
          </p>
        </div>

        {/* Problems Solved Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {icp.painPoints.map((item, idx) => (
            <div key={idx} className="card-soft p-7 flex flex-col justify-between">
              <div>
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-terracotta/15 font-display text-sm font-bold text-terracotta">
                  0{idx + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground leading-snug">
                  {item.problem}
                </h3>
              </div>
              <div className="mt-6 pt-5 border-t border-border/70">
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1 flex items-center gap-1">
                  <CheckCircle2 className="size-3.5" /> How ApnaCare Helps
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
                View Complete Directory of 11 Services <ArrowRight className="size-4 ml-1.5" />
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
