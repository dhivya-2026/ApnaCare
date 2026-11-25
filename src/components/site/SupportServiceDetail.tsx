import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Check,
  ShieldCheck,
  MapPin,
  Clock,
  AlertCircle,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookLink, CallLink } from "@/components/site/Layout";
import { SectionHeading } from "@/components/site/Cards";
import { buildWhatsAppUrl, SITE } from "@/data/site";
import { checkCityServiceAvailability } from "@/data/cityAvailability";
import {
  SUPPORT_CITIES,
  type SupportImageKey,
  type SupportServiceDef,
} from "@/data/supportServices";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import hero6 from "@/assets/hero-6.jpg";
import nursingCare from "@/assets/nursing-care.jpg";

export const SUPPORT_IMAGES: Record<SupportImageKey, string> = {
  elderly: hero1,
  nursing: nursingCare,
  mother: hero4,
  travel: hero5,
  airport: hero3,
  home: hero6,
  technology: hero2,
};

export function SupportServiceDetail({ service }: { service: SupportServiceDef }) {
  const [selectedCity, setSelectedCity] = useState<string>("bengaluru");
  const availability = checkCityServiceAvailability(selectedCity, service.routeSlug);
  const waUrl = buildWhatsAppUrl(`Hello LifeSakhi! I would like to enquire about ${service.name}.`);
  const imgSrc = SUPPORT_IMAGES[service.imageKey] || hero1;

  return (
    <>
      {/* 1. Hero section */}
      <section className="border-b border-border bg-gradient-to-b from-secondary/40 via-background to-background">
        <div className="container-page grid gap-10 py-14 md:py-20 lg:grid-cols-[1.35fr_1fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Link to="/services" className="font-semibold text-primary hover:underline">
                Support Services
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-semibold text-muted-foreground capitalize">
                {service.division.replace(/-/g, " ")}
              </span>
            </div>

            <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-foreground">
              {service.heroHeadline}
            </h1>

            <p className="mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              {service.heroSummary}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <BookLink service={service.routeSlug} size="lg" variant="warm">
                Book {service.name}
              </BookLink>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/10 px-6 py-3 text-sm font-semibold text-[#128C7E] transition-colors hover:bg-[#25D366]/20"
              >
                <MessageCircle className="size-4 text-[#25D366]" />
                Enquire on WhatsApp
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <img
              src={imgSrc}
              alt={service.imageAlt}
              className="aspect-[4/3] w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* 2. Who needs this support? & 3. Situations we help with */}
      <section className="container-page py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card-soft p-7 bg-card">
            <span className="eyebrow">Who It Is For</span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">
              Who needs this support?
            </h2>
            <ul className="mt-5 space-y-3">
              {service.whoNeeds.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="size-4 shrink-0 text-primary mt-1" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-soft p-7 bg-card">
            <span className="eyebrow">Everyday Situations</span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">
              Situations we help with
            </h2>
            <ul className="mt-5 space-y-3">
              {service.situations.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 shrink-0 text-terracotta mt-1" aria-hidden />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Services included */}
      <section className="bg-secondary/30 py-14 border-y border-border/60">
        <div className="container-page">
          <SectionHeading
            eyebrow="What Is Included"
            title={`What ${service.name} covers`}
            sub="Clear, honest scope so your family knows exactly what to expect."
          />

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {service.included.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2.5 rounded-2xl border border-border bg-card p-4 text-sm text-foreground"
              >
                <Check className="size-4 shrink-0 text-primary mt-0.5" aria-hidden />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {service.scopeNote && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs sm:text-sm text-foreground">
              <AlertCircle className="size-4 shrink-0 text-amber-700 mt-0.5" aria-hidden />
              <p>{service.scopeNote}</p>
            </div>
          )}
        </div>
      </section>

      {/* 5. How it works */}
      <section className="container-page py-14">
        <SectionHeading eyebrow="Simple Process" title="How it works" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {service.howItWorks.map((step, idx) => (
            <div key={step.title} className="card-soft p-6 bg-card">
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {idx + 1}
              </span>
              <h3 className="mt-3 font-semibold text-base text-foreground">{step.title}</h3>
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. How we maintain safety & 7. Availability and locations */}
      <section className="bg-secondary/25 py-14 border-y border-border/60">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <div className="card-soft p-7 bg-card">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck className="size-5" aria-hidden />
              <span className="eyebrow">Safety & Standards</span>
            </div>
            <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">
              How we maintain safety
            </h2>
            <ul className="mt-5 space-y-3">
              {service.safety.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                  <ShieldCheck className="size-4 shrink-0 text-primary mt-0.5" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-soft p-7 bg-card">
            <div className="flex items-center gap-2 text-primary">
              <MapPin className="size-5" aria-hidden />
              <span className="eyebrow">City Coverage</span>
            </div>
            <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">
              Availability and locations
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5">
              <Clock className="size-4 shrink-0 text-primary" aria-hidden />
              <span>{service.availabilityNote}</span>
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {SUPPORT_CITIES.map((city) => {
                const slug = city.toLowerCase();
                const active = selectedCity === slug;
                return (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setSelectedCity(slug)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors border ${
                      active
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:border-primary/60"
                    }`}
                  >
                    {city}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 rounded-2xl border border-border bg-secondary/40 p-4 text-xs sm:text-sm space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-foreground">{availability.cityName}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                    availability.canBookDirectly
                      ? "bg-emerald-500/15 text-emerald-700"
                      : "bg-amber-500/15 text-amber-800"
                  }`}
                >
                  {availability.readiness}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{availability.message}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Frequently asked questions */}
      <section className="container-page max-w-3xl py-14">
        <SectionHeading center eyebrow="Clear Answers" title="Frequently asked questions" />
        <Accordion type="single" collapsible className="mt-8 card-soft px-6 shadow-soft">
          {service.faqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={String(i)} className={i === service.faqs.length - 1 ? "border-b-0" : ""}>
              <AccordionTrigger className="text-left text-sm sm:text-base font-semibold py-4 hover:no-underline hover:text-primary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* 9. Booking CTA */}
      <section className="bg-primary py-12 text-primary-foreground">
        <div className="container-page flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-white">
              Ready to request {service.name}?
            </h2>
            <p className="mt-2 text-sm text-primary-foreground/85 max-w-lg">
              Submit your requirements in under two minutes or speak directly with our coordinator at {SITE.SUPPORT_PHONE}.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="warm" className="rounded-full font-semibold">
              <Link to="/booking" search={{ service: service.routeSlug }}>
                Request {service.name}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <CallLink />
          </div>
        </div>
      </section>
    </>
  );
}
