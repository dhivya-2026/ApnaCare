import { Link } from "@tanstack/react-router";
import { BadgeCheck, Check, Clock, MapPin, Star, Users, Zap, ArrowRight, Languages } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { formatINR, type Attendant, type Service, PRICING_PLANS, CITIES, ARTICLES } from "@/data/site";
import { BookLink } from "./Layout";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, sub, center, className }: { eyebrow?: string; title: string; sub?: ReactNode; center?: boolean; className?: string }) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight md:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-pretty text-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/[0.05] via-secondary/25 to-background py-16 md:py-24">
      {/* Ambient background glows for enterprise depth */}
      <div className="pointer-events-none absolute -top-28 right-0 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-1/4 -z-10 h-80 w-80 rounded-full bg-terracotta/10 blur-3xl" />

      <div className="container-page relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary shadow-2xs">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          {eyebrow}
        </div>
        <h1 className="mt-4 max-w-4xl font-display text-3xl font-semibold leading-[1.14] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-base text-muted-foreground leading-relaxed sm:text-lg md:text-xl">
          {sub}
        </p>
        {children && <div className="mt-8 flex flex-wrap items-center gap-3.5">{children}</div>}
      </div>
    </section>
  );
}

export function Rating({ value, reviews }: { value: number; reviews?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-semibold" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      <Star className="size-4 fill-terracotta text-terracotta" aria-hidden="true" />
      <span>{value.toFixed(1)}</span>
      <span className="text-xs text-muted-foreground font-normal">/ 5</span>
      {reviews ? <span className="text-xs text-muted-foreground font-normal">({reviews})</span> : null}
    </span>
  );
}

export function ServiceCard({ s }: { s: Service }) {
  return (
    <article className="group flex flex-col card-soft p-6 transition-all hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-center justify-between">
        <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", s.badge === "Trending" ? "bg-terracotta/25 text-terracotta-foreground" : "bg-primary-soft text-primary")}>{s.badge ?? s.category}</span>
        <Rating value={s.rating} reviews={s.reviewCount} />
      </div>
      <h3 className="mt-4 text-xl font-semibold">{s.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">{s.shortDesc}</p>
      <ul className="mt-4 space-y-1.5">
        {s.benefits.slice(0, 3).map((b) => <li key={b} className="flex items-center gap-2 text-sm"><Check className="size-4 shrink-0 text-primary" aria-hidden /><span>{b}</span></li>)}
      </ul>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <div>
          <p className="text-xs text-muted-foreground">Starting at</p>
          <p className="font-display text-2xl font-semibold">
            {formatINR(s.startingPrice)}
            <span className="text-sm font-normal text-muted-foreground">/{s.pricingUnit}</span>
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">+ 18% GST invoiced</p>
        </div>
        <span className="rounded-full bg-primary-soft/60 px-2.5 py-1 text-xs font-semibold text-primary capitalize">{s.category}</span>
      </div>
      <div className="mt-4 flex gap-2">
        <BookLink service={s.slug} className="flex-1 min-h-[44px]">Book Service</BookLink>
        <Button asChild variant="outline" className="flex-1 min-h-[44px]">
          <Link to="/services/$slug" params={{ slug: s.slug }} onClick={() => track("service_view", { service: s.slug })}>Details</Link>
        </Button>
      </div>
    </article>
  );
}

export function PricingCard({ p }: { p: (typeof PRICING_PLANS)[number] }) {
  return (
    <article className={cn("relative flex flex-col rounded-3xl border p-7", p.popular ? "border-primary bg-primary text-primary-foreground shadow-lift" : "border-border bg-card shadow-soft")}>
      {p.popular && <span className="absolute -top-3 left-7 rounded-full bg-terracotta px-3 py-1 text-xs font-bold text-terracotta-foreground">Most Popular</span>}
      <h3 className="text-2xl font-semibold">{p.name}</h3>
      <p className={cn("mt-2 text-sm", p.popular ? "text-primary-foreground/80" : "text-muted-foreground")}>{p.description}</p>
      <p className="mt-6 font-display text-4xl font-semibold">{formatINR(p.price)}<span className="text-base font-normal opacity-70">/{p.unit}</span></p>
      <p className={cn("text-xs", p.popular ? "text-primary-foreground/70" : "text-muted-foreground")}>Starting price · GST invoiced</p>
      <ul className="mt-6 flex-1 space-y-3">
        {p.includes.map((i) => <li key={i} className="flex gap-2 text-sm"><Check className="mt-0.5 size-4 shrink-0" aria-hidden />{i}</li>)}
      </ul>
      <BookLink service={p.serviceSlug} variant={p.popular ? "warm" : "default"} className="mt-8 w-full min-h-[44px]">Book This Service</BookLink>
    </article>
  );
}

export function AttendantCard({ a, img }: { a: Attendant; img?: string }) {
  return (
    <article className="flex flex-col card-soft p-6 transition-all hover:border-primary/40 hover:shadow-lift">
      <div className="flex items-center gap-4">
        {img ? <img src={img} alt={`Portrait of ${a.name}`} loading="lazy" width={64} height={64} className="size-16 rounded-2xl object-cover" />
          : <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-primary-soft font-display text-xl font-semibold text-primary" aria-hidden>{a.name.split(" ").map((x) => x[0]).join("")}</div>}
        <div>
          <h3 className="text-lg font-semibold">{a.name}</h3>
          <p className="text-sm text-muted-foreground">{a.role}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
        <Rating value={a.rating} />
        <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="size-4" aria-hidden />{a.experience}</span>
        <span className="inline-flex items-center gap-1 text-muted-foreground"><MapPin className="size-4" aria-hidden />{a.city}</span>
      </div>
      <p className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary"><BadgeCheck className="size-4" aria-hidden />{a.verification}</p>
      <div className="mt-3 flex flex-wrap gap-1.5" role="list" aria-label="Certifications">
        {a.certifications.map((c) => <span key={c} role="listitem" className="rounded-full border border-border bg-secondary/30 px-2.5 py-1 text-xs font-medium">{c}</span>)}
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground"><Languages className="size-4" aria-hidden />{a.languages.join(", ")}</p>
      <BookLink service={a.services[0]} variant="outline" className="mt-6 min-h-[44px]">Choose {a.name.split(" ")[0]} as Your Saha</BookLink>
    </article>
  );
}

export function CityCard({ c }: { c: (typeof CITIES)[number] }) {
  return (
    <article className="card-soft p-6" onMouseEnter={() => track("city_view", { city: c.slug })}>
      <h3 className="text-2xl font-semibold">{c.name}</h3>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex items-center justify-between"><dt className="flex items-center gap-2 text-muted-foreground"><Users className="size-4" aria-hidden />Attendants</dt><dd className="font-semibold">{c.attendants}</dd></div>
        <div className="flex items-center justify-between"><dt className="flex items-center gap-2 text-muted-foreground"><BadgeCheck className="size-4" aria-hidden />Families helped</dt><dd className="font-semibold">{c.families}</dd></div>
        <div className="flex items-center justify-between"><dt className="flex items-center gap-2 text-muted-foreground"><Zap className="size-4" aria-hidden />Emergency dispatch</dt><dd className="font-semibold">{c.dispatch}</dd></div>
      </dl>
      <Button asChild variant="outline" className="mt-6 w-full"><Link to="/booking" search={{ city: c.name }}>Book in {c.name}</Link></Button>
    </article>
  );
}

export function ArticleCard({ a }: { a: (typeof ARTICLES)[number] }) {
  return (
    <article className="group flex flex-col card-soft p-6 transition-all hover:shadow-lift">
      <div className="flex items-center justify-between text-xs">
        <span className="rounded-full bg-secondary px-3 py-1 font-semibold">{a.category}</span>
        <span className="text-muted-foreground">{a.readTime}</span>
      </div>
      <h3 className="mt-4 flex-1 text-lg font-semibold leading-snug">{a.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
      <Link to="/knowledge-hub/$slug" params={{ slug: a.slug }} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link>
    </article>
  );
}
