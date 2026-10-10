import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck, Clock, RefreshCw, AlertCircle, IndianRupee } from "lucide-react";
import { PageHero } from "@/components/site/Cards";
import { BookLink, CallLink } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/refund-policy")({
  head: () =>
    seo(
      "Refund & Cancellation Policy — ApnaCare",
      "Full refund protection, 100% money-back terms before dispatch, emergency credit policies, and GST credit note processing."
    ),
  component: RefundPolicyPage,
});

function RefundPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Fair & Transparent Invoicing"
        title="Refund & Cancellation Policy"
        sub="We believe in total financial transparency. If your care requirements change, our straightforward refund and credit guarantees ensure you never lose your hard-earned money."
      >
        <BookLink size="lg" variant="warm">
          Book an Attendant
        </BookLink>
        <CallLink variant="outline">Billing Desk: {SITE.SUPPORT_PHONE}</CallLink>
      </PageHero>

      <article className="container-page py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-12">
          {/* Highlight Cards */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-primary/30 bg-primary-soft/40 p-6">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <CheckCircle2 className="size-6" />
              </span>
              <h3 className="mt-4 text-xl font-semibold">100% Full Refund Guarantee</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Cancel at least 12 hours prior to the scheduled shift start time and receive a 100% immediate refund with zero cancellation fee.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-foreground">
                <RefreshCw className="size-6 text-primary" />
              </span>
              <h3 className="mt-4 text-xl font-semibold">Emergency Shift Credit</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                If emergency hospitalization or early hospital discharge occurs within 12 hours of the shift, receive 100% value credited toward future shifts.
              </p>
            </div>
          </div>

          <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">1. Cancellation Timelines & Refund Slabs</h2>
              <div className="overflow-x-auto rounded-2xl border border-border bg-card">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border bg-secondary/60 text-foreground font-semibold">
                    <tr>
                      <th className="p-4">Cancellation Notice</th>
                      <th className="p-4">Refund Outcome</th>
                      <th className="p-4">Processing Mode</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="p-4 font-medium text-foreground">&gt; 12 Hours before shift start</td>
                      <td className="p-4 text-primary font-semibold">100% Full Refund</td>
                      <td className="p-4">Original payment method (Bank / UPI)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-foreground">Within 4–12 Hours (Regular)</td>
                      <td className="p-4 font-semibold text-foreground">80% Refund or 100% ApnaCare Credit</td>
                      <td className="p-4">20% covers attendant travel stipend</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-foreground">Medical Emergency / ICU Admission</td>
                      <td className="p-4 text-primary font-semibold">100% ApnaCare Care Credit</td>
                      <td className="p-4">Usable anytime within 12 months</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-foreground">Attendant Missed Shift / Delay &gt; 45m</td>
                      <td className="p-4 text-primary font-semibold">100% Full Refund + Immediate Backup</td>
                      <td className="p-4">Free replacement priority dispatch</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">2. Replacement Guarantee vs. Cancellation</h2>
              <p>
                If your dissatisfaction is due to attendant compatibility, language barrier, or shift timing mismatch, you do not need to cancel. Simply inform your care coordinator. We will arrange a replacement attendant with zero transition penalty within 24 hours (or within 90 minutes for acute bedside requirements).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">3. Processing Timelines & GST Credit Notes</h2>
              <p>
                Approved refunds are initiated within <strong>24 business hours</strong> of your cancellation request. Depending on your issuing bank, funds reflect back into your original account within <strong>3 to 5 business days</strong>.
              </p>
              <p>
                A formal <strong>GST Credit Note</strong> compliant with Indian tax regulations will be automatically generated and emailed to your registered address for complete accounting transparency.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">4. How to Request a Cancellation or Refund</h2>
              <p>You can initiate a refund through any of the following channels:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Call your dedicated care coordinator or our 24/7 hotline at <a href={`tel:${SITE.SUPPORT_PHONE_TEL}`} className="text-primary font-semibold">{SITE.SUPPORT_PHONE}</a>.</li>
                <li>Send a WhatsApp message with your Booking ID to <a href={`https://wa.me/${SITE.WHATSAPP}`} target="_blank" rel="noreferrer" className="text-primary font-semibold">+{SITE.WHATSAPP}</a>.</li>
                <li>Email your booking confirmation to <a href={`mailto:${SITE.EMAIL}`} className="text-primary font-semibold">{SITE.EMAIL}</a> with the subject line "Refund Request - [Booking ID]".</li>
              </ul>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
