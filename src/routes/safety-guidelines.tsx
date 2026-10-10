import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, AlertTriangle, CheckCircle, FileText, Lock, PhoneCall, Radio, UserCheck, HeartHandshake } from "lucide-react";
import { PageHero } from "@/components/site/Cards";
import { BookLink, CallLink } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { SITE, SAFETY_PILLARS } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/safety-guidelines")({
  head: () =>
    seo(
      "Safety Guidelines & Attendant Protocols — ApnaCare",
      "Operational safety rules, attendant codes of conduct, household guidelines for host families, and emergency escalation protocols."
    ),
  component: SafetyGuidelinesPage,
});

const HOUSEHOLD_RULES = [
  {
    title: "Safe and Dignified Environment",
    desc: "Host families must provide a safe, respectful environment free of verbal or physical hostility. For live-in shifts, a secure private sleeping space and clean washroom access are mandatory.",
  },
  {
    title: "Medication & Medical Orders",
    desc: "Attendants only administer or remind medications based on written prescriptions provided by registered medical practitioners. Attendants are prohibited from altering dosages independently.",
  },
  {
    title: "Shift Boundaries & Rest Hours",
    desc: "Caregivers on 12-hour or 24-hour shifts require designated rest intervals (at least 7-8 hours of sleep for live-in attendants) to maintain attentiveness and prevent caregiver burnout.",
  },
  {
    title: "Cash and Valuables Protocols",
    desc: "Attendants must never be asked to make personal financial loans or hold customer ATM PINs. Authorized digital expense cards or receipts must be used for grocery or medical errands.",
  },
  {
    title: "Emergency Beacon & Check-Ins",
    desc: "Both attendants and family members have direct access to the 24/7 ApnaCare Command Desk and instant SOS button. Any safety concern triggers immediate senior coordinator intervention.",
  },
];

const ATTENDANT_STANDARDS = [
  {
    title: "Zero Tolerance for Substance Use",
    desc: "Strict prohibition of alcohol, tobacco, or unprescribed drugs before or during active shifts. Violations trigger immediate termination and blacklisting.",
  },
  {
    title: "Confidentiality & Privacy",
    desc: "Attendants sign strict non-disclosure agreements regarding patient health conditions, family conversations, home layouts, and financial matters.",
  },
  {
    title: "Uniform, Identity Badge & Hygiene",
    desc: "All attendants wear clean clinical scrubs or professional attire, display their verified ApnaCare photo badge, and adhere to hospital-grade hand sanitization standards.",
  },
  {
    title: "Punctuality & Relief Handover",
    desc: "Attendants report 10 minutes prior to shift commencement and must never abandon a patient before the relief attendant or family member is present.",
  },
];

function SafetyGuidelinesPage() {
  return (
    <>
      <PageHero
        eyebrow="Safety Protocols & Code of Conduct"
        title="Safety Guidelines for Families and Attendants"
        sub="Trust is built on mutual respect, transparent guidelines, and strict institutional oversight. Review the operational standards that govern every ApnaCare shift."
      >
        <BookLink size="lg" variant="warm">
          Book an Attendant
        </BookLink>
        <CallLink variant="outline">Emergency Desk: {SITE.EMERGENCY_LINE}</CallLink>
      </PageHero>

      <section className="container-page py-16 md:py-24 space-y-16">
        {/* Core Philosophy Notice */}
        <div className="rounded-3xl border border-primary/20 bg-primary-soft/40 p-8 md:p-10">
          <div className="flex items-start gap-4">
            <ShieldCheck className="size-8 shrink-0 text-primary mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Our Mutual Safety Covenant</h2>
              <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                ApnaCare operates with a dual duty of care: safeguarding vulnerable patients and elders in the home, while ensuring female caregivers work in an environment characterized by dignity, physical security, and legal protections.
              </p>
            </div>
          </div>
        </div>

        {/* Guidelines for Host Families */}
        <section>
          <span className="eyebrow">Host Family Responsibilities</span>
          <h2 className="mt-2 text-3xl font-semibold">Guidelines for Families & Care Recipients</h2>
          <p className="mt-2 text-muted-foreground">
            Clear expectations ensure smooth caregiving and prevent misunderstandings.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {HOUSEHOLD_RULES.map((rule, idx) => (
              <div key={rule.title} className="card-soft p-6">
                <span className="font-display text-sm font-bold text-terracotta">Rule 0{idx + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{rule.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Guidelines for Attendants */}
        <section>
          <span className="eyebrow">Professional Standards</span>
          <h2 className="mt-2 text-3xl font-semibold">Attendant Code of Conduct & Ethics</h2>
          <p className="mt-2 text-muted-foreground">
            Mandatory standards every verified woman attendant commits to under contract.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {ATTENDANT_STANDARDS.map((std, idx) => (
              <div key={std.title} className="card-soft p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="size-5 text-primary" />
                  <h3 className="text-lg font-semibold">{std.title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed pl-8">{std.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Escalation Matrix */}
        <section className="rounded-3xl border border-border bg-card p-8 md:p-12 shadow-soft">
          <span className="eyebrow text-sos">Incident Escalation Matrix</span>
          <h2 className="mt-2 text-3xl font-semibold">How Incidents & Emergencies Are Handled</h2>
          <p className="mt-2 text-muted-foreground">
            Our 24/7 Command Center follows a documented 3-tier escalation protocol:
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-secondary/30 p-6">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-foreground">Level 1 · Operational</span>
              <h4 className="mt-4 font-semibold text-lg">Schedule or Language Mismatch</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Shift adjustment, communication difficulties, or non-urgent preferences. Coordinator resolves within 2 hours or schedules replacement.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-secondary/30 p-6">
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-400">Level 2 · Medical Concern</span>
              <h4 className="mt-4 font-semibold text-lg">Patient Condition Fluctuation</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Sudden fever, drop in SpO2, or minor fall without loss of consciousness. Attendant contacts family, supervising clinical lead, and primary doctor immediately.
              </p>
            </div>

            <div className="rounded-2xl border border-sos/30 bg-sos/10 p-6">
              <span className="rounded-full bg-sos px-3 py-1 text-xs font-bold text-sos-foreground">Level 3 · Emergency SOS</span>
              <h4 className="mt-4 font-semibold text-lg">Acute Medical or Safety Crisis</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Cardiac arrest, severe bleeding, or personal security threat. Immediate 112 / 108 ambulance dispatch, command center live telemetry, and local coordinator deployment.
              </p>
            </div>
          </div>
        </section>

        {/* Insurance & Legal Coverage */}
        <section className="rounded-3xl bg-ink p-8 text-ink-foreground md:p-12">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-terracotta">Insurance & Liability Protection</p>
              <h2 className="mt-2 text-3xl font-semibold">Institutional Safety Backing</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-foreground/80">
                All registered ApnaCare attendants are covered under our group accidental insurance and third-party professional liability framework. We partner with licensed risk underwriters to ensure complete coverage during hospital transits, home shifts, and chauffeuse assignments.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                <ShieldCheck className="size-6 text-terracotta shrink-0" />
                <span className="text-sm font-medium">Group Personal Accident Insurance for Attendants</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                <FileText className="size-6 text-terracotta shrink-0" />
                <span className="text-sm font-medium">Full 18% GST Compliant Digital Tax Invoices</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                <Radio className="size-6 text-terracotta shrink-0" />
                <span className="text-sm font-medium">Active Command Center Telemetry on Transit Services</span>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
