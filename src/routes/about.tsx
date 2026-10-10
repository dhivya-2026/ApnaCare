import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Heart, HeartHandshake, ShieldCheck, Sparkles, Target, Users, Award, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/Cards";
import { BookLink, CallLink } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { SITE, IMPACT, SAFETY_PILLARS } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo(
      "About ApnaCare — Trusted Women Attendant Services",
      "Learn about ApnaCare's mission to provide safe, verified and compassionate women attendants for families across India while empowering women with dignified healthcare and mobility careers."
    ),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Purpose & Philosophy"
        title="Dignity in Care. Empowerment in Service."
        sub="ApnaCare was founded with a singular conviction: families deserve uncompromised safety and gentleness when bringing a caregiver into their home, and the women providing that care deserve respect, fair wages, and professional dignity."
      >
        <BookLink size="lg" variant="warm">
          Book an Attendant
        </BookLink>
        <Button asChild variant="outline">
          <Link to="/ecosystem-partners">Join Our Ecosystem</Link>
        </Button>
      </PageHero>

      {/* Origin & Why We Exist */}
      <section className="container-page py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <span className="eyebrow">Why ApnaCare Exists</span>
            <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
              Bridging the Trust Deficit in In-Home and Transit Care
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                When an aging parent needs assistance, when a patient leaves the hospital with post-surgical drains, or when a daughter flies home late at night, families face an agonizing dilemma: how do you find someone dependable, vetted, and genuinely compassionate without relying on unregulated neighborhood agencies?
              </p>
              <p>
                Unorganized domestic care in India has historically suffered from unverified backgrounds, sudden caregiver absenteeism, zero institutional accountability, and unfair worker exploitation.
              </p>
              <p>
                ApnaCare transforms this landscape. We build an institutional safety net: 100% police verification, certified clinical and geriatric training, 24/7 command center monitoring, and guaranteed backup replacement within 90 minutes.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft space-y-6">
            <h3 className="text-xl font-semibold">Our Dual Mission</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <Heart className="size-6" />
                </span>
                <div>
                  <h4 className="font-semibold text-foreground">For Families</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Total peace of mind through rigorously vetted women attendants, transparent pricing, and seamless communication.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-terracotta/20 text-terracotta">
                  <Sparkles className="size-6" />
                </span>
                <div>
                  <h4 className="font-semibold text-foreground">For Women Caregivers</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Dignified economic empowerment, above-market compensation, comprehensive insurance, and ongoing career upskilling.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-secondary text-foreground">
                  <ShieldCheck className="size-6" />
                </span>
                <div>
                  <h4 className="font-semibold text-foreground">For Communities</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Strengthening social safety by creating institutional pathways between nursing colleges, SHGs, and homes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="border-y border-border bg-secondary/30 py-16 md:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="eyebrow">Our Guiding Values</span>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Built on Uncompromising Principles</h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="card-soft p-8">
              <div className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary font-display text-xl font-bold">01</div>
              <h3 className="mt-5 text-xl font-semibold">Absolute Safety First</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We never compromise vetting to speed up assignments. Police clearance, biometric checks, and in-person interviews are non-negotiable prerequisites.
              </p>
            </div>

            <div className="card-soft p-8">
              <div className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary font-display text-xl font-bold">02</div>
              <h3 className="mt-5 text-xl font-semibold">Empathy with Competence</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Clinical and technical skills are only half the requirement. We select women who listen patiently, preserve elder dignity, and bring warmth to bedside vigils.
              </p>
            </div>

            <div className="card-soft p-8">
              <div className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary font-display text-xl font-bold">03</div>
              <h3 className="mt-5 text-xl font-semibold">Honest Transparency</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Clear prices with no dispatcher cuts or sudden surge rates. Honest assessments of what care is needed, and prompt refunds if plans change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Standards Grid */}
      <section className="container-page py-16 md:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">Institutional Standards</span>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">The 6 Pillars of ApnaCare Trust</h2>
          <p className="mt-3 text-muted-foreground">How we ensure every caregiver deployed to your loved one meets the highest safety bar.</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SAFETY_PILLARS.map((p) => (
            <div key={p.title} className="card-soft p-6">
              <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <CheckCircle2 className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="bg-ink py-16 text-ink-foreground md:py-20">
        <div className="container-page">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta">Our Track Record</span>
            <h2 className="mt-2 text-3xl font-semibold">Measured by Trust and Dignity</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            {IMPACT.map(([val, label]) => (
              <div key={label} className="p-4">
                <p className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">{val}</p>
                <p className="mt-2 text-sm text-ink-foreground/75 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20 text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">Experience Trusted Women Care You Can Rely On</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Talk to a care coordinator today or reserve an attendant for your family's upcoming needs.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <BookLink size="lg">Book a Service</BookLink>
          <CallLink variant="outline" />
        </div>
      </section>
    </>
  );
}
