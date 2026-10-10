import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Bell,
  FileCheck,
  GraduationCap,
  Headphones,
  MapPin,
  Radio,
  ShieldCheck,
  Siren,
  Fingerprint,
  FileText,
  UserCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { ATTENDANTS, SITE, SAFETY_PILLARS } from "@/data/site";
import { AttendantCard, PageHero, SectionHeading } from "@/components/site/Cards";
import { BookLink, CallLink } from "@/components/site/Layout";
import { SOSDemoButton } from "@/components/site/SOS";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/safety")({
  head: () =>
    seo(
      "Safety & Attendant Verification Architecture — ApnaCare",
      "Our 5-stage vetting protocol: Biometric Aadhaar verification, state police clearance, clinical skill evaluations, GPS tracking and 24/7 command center SOS dispatch."
    ),
  component: Safety,
});

const VETTING_STAGES = [
  {
    step: "01",
    title: "Biometric Identity Authentication",
    desc: "Aadhaar and PAN biometric authentication validates legal identity and prevents proxy or unauthorized workers.",
  },
  {
    step: "02",
    title: "State Police Verification & Court Clearance",
    desc: "Comprehensive criminal history and judicial record checks conducted through state police departments.",
  },
  {
    step: "03",
    title: "Clinical & Practical Skill Assessment",
    desc: "Hands-on examination in patient mobility, geriatric assistance, infant hygiene, and sterile nursing protocols.",
  },
  {
    step: "04",
    title: "Emergency BLS & Compassionate Conduct",
    desc: "Basic Life Support (BLS) training, CPR certification, de-escalation skills, and non-disclosure ethics.",
  },
  {
    step: "05",
    title: "Command Center GPS Onboarding",
    desc: "Integration with ApnaCare's 24/7 telemetry grid with instant panic-button response protocols.",
  },
];

const SAFETY_FEATURES = [
  [FileCheck, "Rigorous Background Verification", "Physical residence verification, previous employer cross-referencing, and identity screening."],
  [ShieldCheck, "100% Police Record Cleared", "Mandatory law enforcement vetting before any shift assignment is permitted."],
  [GraduationCap, "Role-Specific Clinical Certification", "Accredited diplomas in geriatric care, newborn handling, or defensive commercial driving."],
  [BadgeCheck, "Soft-Skill & Dignity Training", "Sensitization toward elderly emotional needs, dementia patience, and polite bedside conduct."],
  [MapPin, "Live GPS Shift Telemetry", "Real-time location sharing during all transits and shift check-ins for complete visibility."],
  [Siren, "Instant Emergency SOS Beacon", "Every active booking includes a panic button directly routed to our central control room."],
  [Bell, "Automated Family Alerts", "Real-time SMS and WhatsApp check-in and check-out logs delivered to primary kin contacts."],
  [Radio, "24/7 Command Center Monitoring", "Continuous supervision with guaranteed 90-minute backup replacement dispatch."],
  [Headphones, "Dedicated Care Coordinator", "A dedicated human supervisor assigned to your family for schedule adjustments."],
] as const;

function Safety() {
  return (
    <>
      <PageHero
        eyebrow="Our Safety Covenant"
        title="Our Standard is Uncompromising Trust"
        sub="We treat your family's safety as a personal sacred duty. Every ApnaCare attendant passes our multi-tier background screening, clinical evaluations, and 24/7 command center monitoring."
      >
        <BookLink size="lg" variant="warm">
          Book a Verified Attendant
        </BookLink>
        <Button asChild variant="outline">
          <Link to="/safety-guidelines">Read Safety Guidelines & Code of Conduct</Link>
        </Button>
      </PageHero>

      {/* 5-Stage Vetting Protocol */}
      <section className="container-page py-16 md:py-24">
        <SectionHeading
          eyebrow="Verification Funnel"
          title="The 5-Stage Attendant Vetting Protocol"
          sub="Only 1 in 8 applicants successfully clears our background and practical patient-handling criteria."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-5">
          {VETTING_STAGES.map((v) => (
            <div key={v.step} className="card-soft p-6 flex flex-col justify-between">
              <div>
                <span className="font-display text-2xl font-bold text-terracotta">{v.step}</span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary">
                <ShieldCheck className="size-3.5" /> Stage Cleared
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Matrix */}
      <section className="border-y border-border bg-secondary/30 py-16 md:py-24">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Comprehensive Protection"
            title="9 Layers of Family & Patient Safeguards"
            sub="Engineered to provide total peace of mind for seniors living alone and recovering patients."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SAFETY_FEATURES.map(([Icon, t, d]) => (
              <div key={t} className="card-soft p-6">
                <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOS Simulation Box */}
      <section className="container-page py-16 md:py-24">
        <div className="flex flex-col items-start gap-8 rounded-[2.5rem] border border-sos/30 bg-card p-8 shadow-soft md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <span className="eyebrow text-sos">Rapid Response</span>
            <h2 className="mt-2 text-3xl font-semibold">Try the Integrated SOS Simulation</h2>
            <p className="mt-2 max-w-xl text-base text-muted-foreground leading-relaxed">
              Experience the instant panic-beacon response built into every active booking dashboard. See how coordinates, emergency kin alerts, and control-room communications activate within seconds.
            </p>
          </div>
          <div className="shrink-0 flex flex-col items-center gap-2">
            <SOSDemoButton />
            <span className="text-xs text-muted-foreground">Safe demo simulation · No real responders notified</span>
          </div>
        </div>
      </section>

      {/* Verified Attendant Showcase */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Our Verified Team"
              title="Meet Our Certified Attendant Specialists"
              sub="Carefully selected women caregivers with police clearance, certifications, and fluent local language abilities."
            />
            <Button asChild variant="outline">
              <Link to="/safety-guidelines">
                Review Guidelines <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ATTENDANTS.map((a) => (
              <AttendantCard key={a.id} a={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
