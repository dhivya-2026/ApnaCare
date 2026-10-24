import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Clock, MapPin, ShieldCheck, Users, ArrowRight, Sparkles, Building2, Info } from "lucide-react";
import { CITIES, SITE } from "@/data/site";
import { PageHero } from "@/components/site/Cards";
import { BookLink, CallLink } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";
import { getPlannedExpansionCities } from "@/data/cityAvailability";

export const Route = createFileRoute("/cities")({
  head: () =>
    seo(
      "Cities We Serve Across South India — ApnaCare",
      "ApnaCare verified women attendants across Bengaluru, Chennai, Hyderabad and Coimbatore, with regional expansion underway for Kochi, Mysuru, and Pune. Background screening and priority cluster backup protocol."
    ),
  component: CitiesPage,
});

function CitiesPage() {
  const plannedCities = getPlannedExpansionCities();

  return (
    <>
      <PageHero
        eyebrow="Regional Delivery Network"
        title="Cities We Serve Across South India"
        sub="Every active operating city features localized women attendant clusters, police background screening records, and a priority cluster backup protocol."
      >
        <BookLink size="lg" variant="warm">
          Book an Attendant
        </BookLink>
        <CallLink variant="outline">Speak to Regional Coordinator</CallLink>
      </PageHero>

      {/* Network Stats Bar (Truthful & Verified) */}
      <section className="border-b border-border bg-card py-6">
        <div className="container-page grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary font-bold">4</span>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Operational Metros</p>
              <p className="text-sm font-semibold">Bengaluru, Chennai, Hyd, Cbe</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary"><Users className="size-5" /></span>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Trained Attendants</p>
              <p className="text-sm font-semibold">Active In Local Clusters</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary"><Clock className="size-5" /></span>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Cluster Backup SLA</p>
              <p className="text-sm font-semibold">Priority Cluster Standby</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary"><ShieldCheck className="size-5" /></span>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Police Verification</p>
              <p className="text-sm font-semibold">ID & Police Screened</p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Operational Cities Grid */}
      <section className="container-page py-16 md:py-24">
        <div>
          <span className="eyebrow">Active Operational Metros</span>
          <h2 className="mt-2 text-3xl font-display font-semibold tracking-tight">
            Directly Serviced Metropolitan Hubs
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
            Bookings in these four metropolitan centers include verified attendants, supervisor oversight, and our priority cluster standby backup protocol.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {CITIES.map((c) => (
            <article
              key={c.slug}
              className="group card-soft flex flex-col justify-between p-8 transition-all hover:shadow-lift hover:border-primary/40"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-terracotta">{c.state}</span>
                    <h3 className="mt-1 text-3xl font-semibold tracking-tight">{c.name}</h3>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    Operational · Priority Backup
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.description}</p>

                <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-secondary/50 p-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Cluster SLA</p>
                    <p className="mt-1 font-display text-base font-bold text-primary">Priority Backup</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Verification</p>
                    <p className="mt-1 font-display text-base font-bold text-foreground">ID & Police Screened</p>
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
                <Button asChild variant="outline" size="default">
                  <Link to={`/cities/${c.slug}`}>
                    Explore {c.name} Coverage
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Planned Expansion Cities (Honest Expression of Interest) */}
      <section className="bg-secondary/25 py-16 md:py-24 border-t border-border/60">
        <div className="container-page">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-3.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5 text-terracotta" />
              <span>Regional Growth Roadmap</span>
            </div>
            <h2 className="mt-3 text-3xl font-display font-semibold tracking-tight text-foreground">
              Planned Expansion Hubs Under Evaluation
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
              To uphold our safety standards and standby backup protocols, we do not launch direct booking until local caregiver clusters are fully vetted and trained. Express interest below to help prioritize your city.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {plannedCities.map((city) => (
              <div
                key={city.slug}
                className="card-soft flex flex-col justify-between p-6 bg-card border-border/80 shadow-soft"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
                      {city.state}
                    </span>
                    <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-300">
                      Planned
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-foreground">{city.name}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {city.expansionEvaluationNotes}
                  </p>

                  <div className="mt-4 pt-3 border-t border-border/60">
                    <span className="text-[11px] font-semibold text-foreground/80 block mb-1.5">
                      Target Localities:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {city.coverageZones.map((z) => (
                        <span key={z.name} className="text-[10px] bg-secondary px-2 py-0.5 rounded text-muted-foreground">
                          {z.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <Button asChild size="sm" variant="outline" className="w-full text-xs font-semibold">
                    <Link to="/contact" search={{ intent: "city_interest", city: city.name }}>
                      Express Interest in {city.name} →
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-primary/20 bg-primary-soft/40 p-4 flex items-start gap-3 text-xs text-muted-foreground">
            <Info className="size-4 text-primary shrink-0 mt-0.5" />
            <p>
              <strong className="text-foreground">Commitment to Truth in Advertising:</strong> We never list a city as operational without verified physical command clusters. If your family requires care in an expansion city for long-term live-in arrangements, please contact our coordinator for a personalized feasibility review.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
