import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Clock, MapPin, ShieldCheck, Users, Zap, ArrowRight } from "lucide-react";
import { CITIES, SITE } from "@/data/site";
import { PageHero } from "@/components/site/Cards";
import { BookLink, CallLink } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/cities")({
  head: () =>
    seo(
      "Cities We Serve — ApnaCare",
      "ApnaCare verified women attendants across Bengaluru, Chennai, Hyderabad and Coimbatore. Guaranteed background checks, 24/7 command center and rapid emergency dispatch."
    ),
  component: CitiesPage,
});

function CitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Active Metropolitan Coverage"
        title="Cities We Serve Across South India"
        sub="Every city features a dedicated physical command center, pre-vetted local women attendant clusters, and 24/7 centralized dispatch tracking."
      >
        <BookLink size="lg" variant="warm">
          Book an Attendant
        </BookLink>
        <CallLink variant="outline">Speak to Regional Coordinator</CallLink>
      </PageHero>

      {/* Network Stats Bar */}
      <section className="border-b border-border bg-card py-6">
        <div className="container-page grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary font-bold">4</span>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Metro Hubs</p>
              <p className="text-sm font-semibold">Active Command Centers</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary"><Users className="size-5" /></span>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Verified Attendants</p>
              <p className="text-sm font-semibold">{SITE.activeAttendants} On Active Duty</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary"><Zap className="size-5 text-sos" /></span>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Emergency Dispatch</p>
              <p className="text-sm font-semibold">&lt; 15-20 Min Average</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary"><ShieldCheck className="size-5" /></span>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Police Verification</p>
              <p className="text-sm font-semibold">{SITE.policeVerifiedPercent} Verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* City Grid */}
      <section className="container-page py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          {CITIES.map((c) => (
            <article
              key={c.slug}
              className="group card-soft flex flex-col justify-between p-8 transition-all hover:shadow-lift hover:border-primary/40"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-terracotta">{c.state}</span>
                    <h2 className="mt-1 text-3xl font-semibold tracking-tight">{c.name}</h2>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
                    <Zap className="size-3 text-sos" /> Dispatch {c.dispatch}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.description}</p>

                <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-secondary/50 p-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Active Attendants</p>
                    <p className="mt-1 font-display text-xl font-bold">{c.attendants}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Families Helped</p>
                    <p className="mt-1 font-display text-xl font-bold">{c.families}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Key Coverage Localities</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {c.coverageAreas.slice(0, 6).map((area) => (
                      <span key={area} className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs text-foreground/80">
                        {area}
                      </span>
                    ))}
                    {c.coverageAreas.length > 6 && (
                      <span className="rounded-lg bg-secondary px-2 py-1 text-xs font-semibold text-muted-foreground">
                        +{c.coverageAreas.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
                <Button asChild className="flex-1" size="default">
                  <Link to="/booking" search={{ city: c.name }}>
                    Book in {c.name}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/cities/$city" params={{ city: c.slug }}>
                    View Hub & Local Attendants <ArrowRight className="size-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Expansion announcement */}
      <section className="container-page pb-20">
        <div className="rounded-3xl border border-border bg-ink p-8 text-ink-foreground md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-terracotta">Network Expansion</p>
            <h3 className="mt-2 text-2xl font-semibold">Need care in a city not listed here?</h3>
            <p className="mt-2 max-w-xl text-sm text-ink-foreground/80">
              We are expanding into Kochi, Pune, and Mysuru. We also fulfill custom outstation travel companions and long-term care placements nationwide.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button asChild variant="warm" size="lg">
              <Link to="/contact">Request Outstation Care</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
