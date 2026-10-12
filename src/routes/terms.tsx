import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Cards";
import { SITE } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    seo(
      "Terms of Service — ApnaCare",
      "Terms and conditions governing the booking and provision of ApnaCare women attendant and mobility services."
    ),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal Agreement"
        title="Terms of Service"
        sub="Please review the operational terms, customer responsibilities, attendant rights, and service conditions governing ApnaCare."
      />

      <article className="container-page py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-10 text-base leading-relaxed text-muted-foreground">
          <p className="text-sm font-semibold text-foreground">
            Effective Date: October 1, 2026 | Last Updated: October 2026
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Agreement to Terms</h2>
            <p>
              By accessing our website, creating a booking request, or accepting services from {SITE.legalName} ("ApnaCare"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not proceed with a booking.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Nature of Services</h2>
            <p>
              ApnaCare matches families with pre-screened, police-verified women attendants for non-invasive home personal care, hospital bedside assistance, newborn/post-natal care, transit escorts, and chauffeuse driving services.
            </p>
            <p>
              <strong>Important Clinical Disclaimer:</strong> Unless specifically booking a Registered Nurse ("Nursing Services"), our attendants are trained caregivers and companions, not licensed doctors. Attendants do not prescribe medications, diagnose illnesses, or perform invasive surgical interventions. In any acute medical emergency, hospital treatment or Dial 108/112 must be summoned immediately.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Customer Obligations & Safety</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Safe Working Environment:</strong> The client agrees to provide a safe, respectful environment free of verbal harassment, sexual misconduct, physical violence, or hazardous living conditions.</li>
              <li><strong>Live-In Amenities:</strong> For 24-hour live-in arrangements, the client must provide a private, hygienic bed, clean sanitation facilities, and nutritious meals.</li>
              <li><strong>Prescription Accuracy:</strong> The client is solely responsible for providing written doctor prescriptions and genuine medications for the attendant to schedule or administer.</li>
              <li><strong>Zero Direct Employment Solicitations:</strong> Clients agree not to solicit or hire assigned attendants directly outside the ApnaCare platform during or within 12 months following service termination.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Invoicing, Payments & Taxes</h2>
            <p>
              All service fees are clearly presented on the booking quotation prior to submission. Quotations detail the transparent base caregiver fee plus mandatory statutory <strong>18% Goods and Services Tax (GST)</strong>, with an official compliant tax invoice provided for every booking.
            </p>
            <p>
              Payments must be made through authorized ApnaCare payment channels (UPI, Net Banking, Credit/Debit Cards, or bank transfer). Attendants are strictly prohibited from collecting cash advances or personal commissions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Dispatch SLAs & Replacement Commitments</h2>
            <p>
              ApnaCare maintains clear, distinct operational commitments based on the nature of the requirement:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Emergency SOS Escalation (&lt; 20 Minutes):</strong> Rapid coordinator response and emergency protocol activation across active metro hubs (Bengaluru, Chennai, Hyderabad, and Coimbatore) whenever an emergency beacon is triggered.
              </li>
              <li>
                <strong>Guaranteed Backup Dispatch (90 Minutes):</strong> If an attendant is unable to attend a scheduled shift due to illness or personal emergency, ApnaCare guarantees a replacement attendant with comparable qualifications dispatched within 90 minutes.
              </li>
              <li>
                <strong>Routine Compatibility Replacement (Within 24 Hours):</strong> If a family requests an attendant change due to language, demeanor, or scheduling preferences during an ongoing care plan, a matched replacement is assigned within 24 hours with zero transition penalty.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Limitation of Liability</h2>
            <p>
              While ApnaCare conducts rigorous multi-step police verifications, credential checks, and background investigations, care services occur in private home environments. To the maximum extent permitted by Indian law, ApnaCare's aggregate liability for direct claims arising under any booking shall not exceed the total fees paid by the client for the specific shift during which the dispute arose.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Governing Law & Dispute Resolution</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any unresolved dispute arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
