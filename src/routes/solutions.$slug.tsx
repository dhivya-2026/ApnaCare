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

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const icp = getICP(params.slug);
    if (!icp) throw notFound();
    return { icp };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return seo("Solution Not Found — ApnaCare", "The requested solution profile could not be found.");
    }
    const { icp } = loaderData;
    return seo(
      `${icp.name} Solutions — Verified Care & Transit | ApnaCare`,
      icp.subtitle
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
          rel="noreferrer"
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
              <ShieldCheck className="size-4 text-primary" /> 100% Police Verified
            </span>
            <span className="flex items-center gap-1.5 text-foreground">
              <Zap className="size-4 text-terracotta" /> 90-Min Backup Guarantee
            </span>
            <span className="flex items-center gap-1.5 text-foreground">
              <Clock className="size-4 text-primary" /> 24/7 Command SOS
            </span>
          </div>
        </div>
      </section>

      {/* Summary Narrative */}
      <section className="container-page py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Tailored Care Architecture</span>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl text-foreground">
            Purpose-Built for Your Specific Demands
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {icp.summary}
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
                  <CheckCircle2 className="size-3.5" /> ApnaCare Solution
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Services Portfolio */}
      <section className="border-y border-border bg-secondary/30 py-16 md:py-24">
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

      {/* Real Testimonial Spotlight */}
      <section className="container-page py-16 md:py-24">
        <div className="rounded-[2.5rem] bg-ink p-8 text-ink-foreground md:p-14">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow text-terracotta">Verified Experience</span>
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
