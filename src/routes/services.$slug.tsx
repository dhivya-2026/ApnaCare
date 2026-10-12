import { createFileRoute, notFound } from "@tanstack/react-router";
import { BadgeCheck, Check, Clock, Languages } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SERVICES, formatINR, getService } from "@/data/site";
import { SectionHeading, ServiceCard } from "@/components/site/Cards";
import { BookLink, CallLink } from "@/components/site/Layout";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => { const s = getService(params.slug); if (!s) throw notFound(); return { s }; },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Service not found — ApnaCare" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.s.name} — Verified Women Attendants | ApnaCare`;
    return { meta: [{ title: t }, { name: "description", content: loaderData.s.description }, { property: "og:title", content: t }, { property: "og:description", content: loaderData.s.description }] };
  },
  component: Detail,
});

function Detail() {
  const { s } = Route.useLoaderData();
  return (
    <>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow">{s.category} · {s.badge ?? "Service"}</p>
            <h1 className="mt-3 text-4xl font-semibold md:text-5xl">{s.name}</h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">{s.description}</p>
            <ul className="mt-6 space-y-2">
              {s.benefits.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm font-medium">
                  <Check className="size-4 shrink-0 text-primary" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookLink service={s.slug} size="lg" variant="warm">Book {s.name}</BookLink>
              <CallLink size="lg">Talk to a Coordinator</CallLink>
            </div>
          </div>
          <aside className="card-soft h-fit p-7 shadow-soft">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Starting at</p>
            <p className="mt-1 font-display text-4xl font-semibold">
              {formatINR(s.startingPrice)}
              <span className="text-base font-normal text-muted-foreground">/{s.pricingUnit}</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">+ 18% statutory GST · no hidden charges</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-sm font-semibold">
                <BadgeCheck className="size-4 text-terracotta" aria-hidden />
                Rated {s.rating}/5
              </span>
              <span className="text-xs text-muted-foreground">({s.reviewCount} verified bookings)</span>
            </div>
            <div className="mt-5 space-y-2 text-sm">
              <p className="flex items-center gap-2"><Clock className="size-4 shrink-0 text-primary" aria-hidden />{s.availability}</p>
              <p className="flex items-center gap-2"><Languages className="size-4 shrink-0 text-primary" aria-hidden />{s.languages.join(", ")}</p>
            </div>
            <BookLink service={s.slug} variant="warm" className="mt-6 w-full">Book {s.name} Now</BookLink>
            <p className="mt-3 text-center text-xs text-muted-foreground">Full refund protection before dispatch</p>
          </aside>
        </div>
      </section>

      <section className="container-page grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold">Why families need this</h2>
          <p className="mt-3 text-muted-foreground">{s.need}</p>
          <h2 className="mt-10 text-2xl font-semibold">Who it's for</h2>
          <ul className="mt-3 space-y-2">
            {s.whoFor.map((x) => <li key={x} className="flex gap-2"><Check className="size-5 shrink-0 text-primary" aria-hidden /><span>{x}</span></li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">What's included</h2>
          <ul className="mt-3 space-y-2">
            {s.includes.map((x) => <li key={x} className="flex gap-2"><Check className="size-5 shrink-0 text-primary" aria-hidden /><span>{x}</span></li>)}
          </ul>
          <h2 className="mt-10 text-2xl font-semibold">Safety &amp; qualifications</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {s.qualifications.map((x) => (
              <span key={x} className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-sm font-medium text-primary">
                <BadgeCheck className="size-4" aria-hidden />{x}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Every booking includes GPS shift tracking and 24/7 SOS command center support.</p>
        </div>
      </section>

      <section className="container-page pb-16">
        <h2 className="text-2xl font-semibold">Frequently asked about {s.name}</h2>
        <Accordion type="single" collapsible className="mt-4 card-soft px-6">
          {s.faqs.map((f, i) => (
            <AccordionItem key={i} value={String(i)}>
              <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Final booking CTA strip */}
      <section className="border-t border-border bg-primary py-12 text-primary-foreground">
        <div className="container-page flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">Ready to book {s.name}?</h2>
            <p className="mt-2 text-primary-foreground/80">Our coordinator will confirm your verified attendant within 2 hours of your booking.</p>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-3">
            <BookLink service={s.slug} size="lg" variant="warm">Book {s.name}</BookLink>
            <CallLink size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/15">Call Us</CallLink>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="container-page">
          <SectionHeading title="Related services you may need" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3).map((x) => <ServiceCard key={x.id} s={x} />)}
          </div>
        </div>
      </section>
    </>
  );
}
