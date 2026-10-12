import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BadgeCheck, Clock, MapPin, Phone, ShieldCheck, Users, Zap, ArrowLeft, HeartHandshake } from "lucide-react";
import { getCity, CITIES, SERVICES, ATTENDANTS, SITE, formatINR } from "@/data/site";
import { PageHero, AttendantCard } from "@/components/site/Cards";
import { BookLink, CallLink } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/cities/$city")({
  loader: ({ params }) => {
    const city = getCity(params.city);
    if (!city) throw notFound();
    return { city };
  },
  head: ({ loaderData }) => {
    const city = loaderData?.city;
    const name = city?.name || "City Coverage";
    return seo(
      `Women Attendants in ${name} — ApnaCare`,
      `Verified women attendants for elderly care, hospital assistance and women drivers across ${name}. Emergency dispatch in ${city?.dispatch || "under 20 minutes"}.`
    );
  },
  component: CityDetailPage,
});

function CityDetailPage() {
  const { city } = Route.useLoaderData();
  const localAttendants = ATTENDANTS.filter((a) => a.city.toLowerCase() === city.name.toLowerCase());
  const cityServices = SERVICES.filter((s) => city.popularServices.some((ps) => ps.toLowerCase().includes(s.name.toLowerCase()) || s.name.toLowerCase().includes(ps.toLowerCase())));

  return (
    <>
      <PageHero
        eyebrow={`Local Coverage · ${city.state}`}
        title={`ApnaCare Women Attendants in ${city.name}`}
        sub={city.description}
      >
        <BookLink size="lg" variant="warm" city={city.name}>
          Book Attendant in {city.name}
        </BookLink>
        <CallLink variant="outline">Call {city.name} Command Desk</CallLink>
      </PageHero>

      <section className="border-b border-border bg-card py-6">
        <div className="container-page grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-secondary/50 p-4">
            <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5"><Users className="size-4 text-primary" /> Active Attendants</p>
            <p className="mt-2 font-display text-2xl font-bold">{city.attendants}</p>
          </div>
          <div className="rounded-2xl bg-secondary/50 p-4">
            <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5"><BadgeCheck className="size-4 text-primary" /> Families Supported</p>
            <p className="mt-2 font-display text-2xl font-bold">{city.families}</p>
          </div>
          <div className="rounded-2xl bg-secondary/50 p-4">
            <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5"><Zap className="size-4 text-sos" /> Emergency SLA</p>
            <p className="mt-2 font-display text-2xl font-bold text-sos">{city.dispatch}</p>
          </div>
          <div className="rounded-2xl bg-secondary/50 p-4">
            <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5"><ShieldCheck className="size-4 text-primary" /> Police Verification</p>
            <p className="mt-2 font-display text-2xl font-bold text-primary">100% Cleared</p>
          </div>
        </div>
      </section>

      <div className="container-page py-16">
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link to="/cities">
              <ArrowLeft className="size-4" /> Back to All Cities
            </Link>
          </Button>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.8fr_1.2fr]">
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold">Active Neighborhood & Locality Coverage</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Our vetted women attendants are deployed in localized residential clusters to ensure rapid reporting and reliable backup dispatch.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {city.coverageAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-medium shadow-2xs hover:border-primary/50"
                  >
                    <MapPin className="size-3.5 text-primary" />
                    {area}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Popular Care Services in {city.name}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {cityServices.map((s) => (
                  <div key={s.id} className="card-soft p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary">{s.badge || "Verified"}</span>
                        <span className="text-xs font-semibold text-muted-foreground">★ {s.rating}</span>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold">{s.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{s.shortDesc}</p>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-border pt-3">
                      <p className="font-display text-lg font-semibold">{formatINR(s.startingPrice)}<span className="text-xs font-normal text-muted-foreground">/{s.pricingUnit}</span></p>
                      <Button asChild size="sm">
                        <Link to="/booking" search={{ service: s.slug, city: city.name }}>Book Service</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">Featured Attendants in {city.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Profiles of verified women specialists actively accepting shifts in this metropolitan zone.
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {localAttendants.length > 0 ? (
                  localAttendants.map((a) => <AttendantCard key={a.id} a={a} />)
                ) : (
                  <div className="col-span-full rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
                    <p>Attendants actively on duty. Submit your care requirements to view matched profiles.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="card-soft p-7 sticky top-24">
              <h3 className="text-xl font-semibold">{city.name} Command Center</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Local coordination hub managing attendant routing, police verification coordination, and emergency response.
              </p>

              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase text-muted-foreground">Local Center Address</dt>
                  <dd className="mt-1 font-medium leading-relaxed">{city.address}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase text-muted-foreground">Direct Desk Line</dt>
                  <dd className="mt-1 font-medium flex items-center gap-2">
                    <Phone className="size-4 text-primary" />
                    <a href={`tel:${SITE.SUPPORT_PHONE_TEL}`} className="hover:underline">{city.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase text-muted-foreground">Operating Hours</dt>
                  <dd className="mt-1 font-medium flex items-center gap-2">
                    <Clock className="size-4 text-primary" />
                    24/7 Active Monitoring
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase text-muted-foreground">Emergency Dispatch SLA</dt>
                  <dd className="mt-1 font-semibold text-sos">{city.dispatch} average arrival time</dd>
                </div>
              </dl>

              <div className="mt-8 space-y-3">
                <Button asChild className="w-full" size="lg">
                  <Link to="/booking" search={{ city: city.name }}>Request Attendant in {city.name}</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/contact">Contact {city.name} Hub</Link>
                </Button>
              </div>

              <div className="mt-6 rounded-xl bg-primary-soft/60 p-4 text-xs leading-relaxed text-muted-foreground flex gap-3">
                <ShieldCheck className="size-5 shrink-0 text-primary" />
                <span>All {city.name} shifts are monitored by our centralized GPS dispatch control and backed by our replacement guarantee.</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
