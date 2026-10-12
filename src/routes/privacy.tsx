import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Cards";
import { SITE } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo(
      "Privacy Policy — ApnaCare",
      "How ApnaCare collects, processes, and protects customer, patient, and attendant personal data under India's Digital Personal Data Protection Act 2023."
    ),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Data Protection & Privacy"
        title="Privacy Policy"
        sub="We treat your family's personal, medical, and residential information with the highest degree of confidentiality and data security."
      />

      <article className="container-page py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-10 text-base leading-relaxed text-muted-foreground">
          <p className="text-sm font-semibold text-foreground">
            Effective Date: October 1, 2026 | Last Updated: October 2026
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Introduction & Scope</h2>
            <p>
              This Privacy Policy explains how {SITE.legalName} ("ApnaCare", "we", "us", or "our") collects, uses, stores, discloses, and protects your information when you use our website, mobile interfaces, telephone booking lines, and attendant dispatch services.
            </p>
            <p>
              We operate in compliance with India's <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Information We Collect</h2>
            <p>We only collect data necessary to fulfill care services safely and verify identity:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Customer & Contact Details:</strong> Full name, telephone number, email address, relationship to the care recipient, and residential dispatch address.</li>
              <li><strong>Care Recipient Information:</strong> Age, gender, mobility level, primary language, doctor-prescribed medication schedules, and dietary/hygiene preferences.</li>
              <li><strong>Emergency Contact Details:</strong> Secondary phone numbers and designated kin authorized to receive shift updates or emergency SOS notifications.</li>
              <li><strong>GPS Telemetry Data:</strong> Real-time transit coordinates during airport pickups, train accompaniments, or chauffeuse rides to ensure passenger and driver safety.</li>
              <li><strong>Technical Identifiers:</strong> Browser type, operating system, IP address, and anonymized conversion analytics cookies.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
            <p>Your information is used solely for the following legitimate purposes:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Matching and dispatching appropriate female attendants with suitable language fluencies and clinical certifications.</li>
              <li>Sharing booking summaries and verified digital attendant credential cards with the booking customer.</li>
              <li>Generating valid 18% GST tax invoices and managing payment processing.</li>
              <li>Broadcasting automated emergency telemetry and SMS alerts in the event of an SOS activation.</li>
              <li>Facilitating quality checks, satisfaction surveys, and dispute resolutions.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Strict Non-Disclosure & Third-Party Sharing</h2>
            <p>
              <strong>We never sell, rent, or monetize your personal or medical data to third-party advertisers or insurance brokers.</strong>
            </p>
            <p>Data is shared strictly with:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>The assigned, verified attendant (only necessary home address, patient name, and relevant care needs).</li>
              <li>Law enforcement authorities or emergency medical services (112 / 108) solely in the event of life-threatening emergencies or statutory compliance mandates.</li>
              <li>Authorized background verification partners for attendant police vetting.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Data Security & Storage</h2>
            <p>
              All customer and medical records are encrypted in transit via Transport Layer Security (TLS 1.3) and at rest utilizing AES-256 standards on servers physically located within India in compliance with RBI and Indian data localization mandates.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Your Rights Under DPDP Act 2023</h2>
            <p>You possess the following rights regarding your personal data:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Right to access a summary of personal data processed by ApnaCare.</li>
              <li>Right to correction and completion of inaccurate or misleading data.</li>
              <li>Right to erasure of personal data once the care engagement has concluded and statutory tax retention periods (7 years for GST audits) have expired.</li>
              <li>Right to nominate an individual to exercise rights in the event of incapacity.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Grievance Officer & Contact</h2>
            <p>
              For privacy inquiries, data access requests, or grievances under the DPDP Act, contact our appointed Data Protection & Grievance Officer:
            </p>
            <div className="rounded-2xl border border-border bg-card p-6 text-sm text-foreground">
              <p className="font-semibold">Grievance Redressal Officer</p>
              <p className="mt-1 text-muted-foreground">{SITE.legalName}</p>
              <p className="text-muted-foreground">{SITE.headquarters}</p>
              <p className="mt-2">Email: <a href={`mailto:${SITE.EMAIL}`} className="text-primary hover:underline">{SITE.EMAIL}</a></p>
              <p>Telephone: {SITE.SUPPORT_PHONE}</p>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
