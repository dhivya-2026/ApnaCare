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
      "Our 5-stage vetting protocol: Government photo ID authentication, state police background screening, practical care evaluations, check-in tracking, and regional supervisor backup coordination."
    ),
  component: Safety,
});

const VETTING_STAGES = [
  {
    step: "01",
    title: "Government Photo ID Authentication",
    desc: "Government-issued photo identification (Aadhaar / Voter ID / PAN) verified prior to placement to authenticate legal identity and prevent unauthorized worker substitutions.",
  },
  {
    step: "02",
    title: "Police Background Screening & Verification",
    desc: "Background screening documentation and police verification filings initiated with local jurisdictional stations prior to independent home assignment.",
  },
  {
    step: "03",
    title: "Practical Care & Mobility Skill Assessment",
    desc: "Hands-on evaluation in patient ergonomics, elderly assistance, infant hygiene routines, and sterile protocol distinctions.",
  },
  {
    step: "04",
    title: "Emergency BLS & Compassionate Conduct",
    desc: "Basic Life Support (BLS) training, emergency escalation protocols, de-escalation skills, and strict family privacy ethics.",
  },
  {
    step: "05",
    title: "Cluster Coordination & Check-In Onboarding",
    desc: "Onboarding into ApnaCare's regional coordination roster with scheduled shift check-ins and standby replacement protocols.",
  },
];

const SAFETY_FEATURES = [
  [
    FileCheck,
    "Rigorous Background Verification",
    "Physical residence verification, previous employer cross-referencing, and identity screening.",
  ],
  [
    ShieldCheck,
    "Mandatory Police Screening Process",
    "Mandatory law enforcement verification filing and background checks completed before home placement.",
  ],
  [
    GraduationCap,
    "Role-Specific Care Certification",
    "Accredited diplomas in geriatric care, newborn handling, or defensive commercial driving.",
  ],
  [
    BadgeCheck,
    "Soft-Skill & Dignity Training",
    "Sensitization toward elderly emotional needs, dementia patience, and polite bedside conduct.",
  ],
  [
    MapPin,
    "Scheduled Shift Check-In Telemetry",
    "Supervised check-ins during shift starts and transits for complete family visibility.",
  ],
  [
    Siren,
    "Emergency Escalation Protocol",
    "Direct supervisor escalation channel and emergency contact coordination for urgent situations.",
  ],
  [
    Bell,
    "Automated Family Alerts",
    "Real-time WhatsApp shift logs and routine living summaries delivered to designated family contacts.",
  ],
  [
    Radio,
    "Regional Cluster Coordination & Backup",
    "Continuous coordinator oversight with priority standby backup protocol across active operational clusters.",
  ],
  [
    Headphones,
    "Dedicated Care Coordinator",
    "A dedicated human supervisor assigned to your family for schedule adjustments.",
  ],
] as const;

function Safety() {
  return (
    <>
      <PageHero
        eyebrow="Trust & Safety Protocols"
        title="Know Who Steps Into Your Home"
        sub="Inviting a care attendant into your home or bedside takes trust. We verify identities, check background records, evaluate practical care skills, and coordinate daily schedules so your family doesn't have to carry the worry alone."
      >
        <BookLink size="lg" variant="warm">
          Find the Right Attendant
        </BookLink>
        <Button asChild variant="outline">
          <Link to="/safety-guidelines">Read Safety Guidelines & Code of Conduct</Link>
        </Button>
      </PageHero>

      {/* 5-Stage Vetting Protocol */}
      <section id="verification" className="container-page py-16 md:py-24 scroll-mt-20">
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
      <section id="emergency" className="container-page py-16 md:py-24 scroll-mt-20">
        <div className="flex flex-col items-start gap-8 rounded-[2.5rem] border border-sos/30 bg-card p-8 shadow-soft md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <span className="eyebrow text-sos">Rapid Response</span>
            <h2 className="mt-2 text-3xl font-semibold">Try the Integrated SOS Simulation</h2>
            <p className="mt-2 max-w-xl text-base text-muted-foreground leading-relaxed">
              Experience the instant panic-beacon response built into every active booking
              dashboard. See how coordinates, emergency kin alerts, and control-room communications
              activate within seconds.
            </p>
          </div>
          <div className="shrink-0 flex flex-col items-center gap-2">
            <SOSDemoButton />
            <span className="text-xs text-muted-foreground">
              Safe demo simulation · No real responders notified
            </span>
          </div>
        </div>
      </section>

      {/* Verified Attendant Showcase */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Representative Profiles"
              title="Illustrative Care Specialist Profiles"
              sub="Representative profiles illustrating background screening standards, language fluencies, and practical care certifications across regional caregiver clusters."
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
