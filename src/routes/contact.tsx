import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, MessageCircle, Phone, Siren, MapPin, Clock, Send, CheckCircle2, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SITE, SERVICES, CITIES, FAQS } from "@/data/site";
import { PageHero } from "@/components/site/Cards";
import { BookLink, CallLink } from "@/components/site/Layout";
import { track, submitLeadWithReliability } from "@/lib/analytics";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  validateSearch: z.object({
    intent: z.string().optional(),
    city: z.string().optional(),
    service: z.string().optional(),
  }),
  head: () =>
    seo(
      "Contact ApnaCare — 24/7 Care Coordination & Support",
      "Speak directly with an ApnaCare care coordinator. 24/7 emergency desk, regional offices in Bengaluru, Chennai, Hyderabad, and Coimbatore."
    ),
  component: Contact,
});

function Contact() {
  const search = Route.useSearch();
  const isCityInterest = search.intent === "city_interest";
  const isAssessment = search.intent === "assessment";

  const initialCity = search.city || "Bengaluru";
  const initialSubject = isCityInterest
    ? `Expression of Interest — ${search.city || "Expansion City"}`
    : isAssessment
    ? `Care Assessment Request — ${search.service || "Clinical Care"}`
    : "General Enquiry";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: initialCity,
    subject: initialSubject,
    message: isCityInterest
      ? `We would like to express interest for care support in ${initialCity}. Please notify us when localized attendant clusters become active.`
      : "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    const contactId = "cnt_" + Date.now().toString(36);

    const result = await submitLeadWithReliability({
      event_type: isCityInterest ? "city_interest" : "contact",
      event_name: isCityInterest ? "city_interest_submitted" : "contact_submitted",
      lead_type: isCityInterest ? "CITY_INTEREST" : "CONTACT",
      form_name: isCityInterest ? "Planned City Interest Form" : "Contact Desk Form",
      contact_id: contactId,
      name: form.name,
      customer_name: form.name,
      phone: form.phone,
      mobile: form.phone,
      email: form.email,
      city: form.city,
      subject: form.subject,
      message: form.message,
      lead_status: "New",
      follow_up_status: isCityInterest ? "Pending Expansion Notification" : "Pending Response",
      page_path: "/contact",
    });

    setSending(false);
    if (result.success) {
      setSubmitted(true);
      if (isCityInterest) {
        track("city_interest_submitted", {
          city: form.city,
          requested_service: search.service || "general",
          interest_id: contactId,
        });
      }
      track("contact_form_submit", { city: form.city, subject: form.subject });
      toast.success(
        isCityInterest
          ? `Interest recorded for ${form.city}! Our expansion desk will keep you updated.`
          : "Enquiry received! A care coordinator will call you shortly."
      );
    } else {
      toast.error("Transmission error. Please try again or call our 24/7 care desk directly.");
    }
  };

  return (
    <>
      <PageHero
        eyebrow="24/7 Care Coordination"
        title="We're Here for Your Family, Day and Night"
        sub="Speak directly with an experienced care coordinator about attendant assignments, hospital bedside assistance, custom schedules, or outstation mobility."
      >
        <BookLink size="lg" variant="warm">
          Book an Attendant
        </BookLink>
        <CallLink variant="outline">Call 24/7 Desk</CallLink>
      </PageHero>

      {/* Emergency & Direct Channels */}
      <section className="container-page py-12 md:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href={`tel:${SITE.SUPPORT_PHONE_TEL}`}
            onClick={() => {
              track("phone_contact_clicked", { channel_type: "support_phone", destination_number: SITE.SUPPORT_PHONE_TEL });
              track("support_call_click");
            }}
            className="card-soft p-6 transition-all hover:border-primary/50 hover:shadow-lift"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-primary-soft text-primary">
              <Phone className="size-6" />
            </span>
            <h2 className="mt-4 font-semibold text-lg">General Support Line</h2>
            <p className="mt-1 font-mono text-sm font-bold text-foreground">{SITE.SUPPORT_PHONE}</p>
            <p className="mt-1 text-xs text-muted-foreground">Dedicated care helpline across India</p>
          </a>

          <a
            href={`tel:${SITE.SUPPORT_PHONE_TEL}`}
            onClick={() => {
              track("phone_contact_clicked", { channel_type: "emergency_line", destination_number: SITE.EMERGENCY_LINE });
              track("emergency_call_click");
            }}
            className="card-soft border-sos/40 p-6 transition-all hover:border-sos hover:shadow-lift bg-sos/5"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-sos text-sos-foreground animate-sos">
              <Siren className="size-6" />
            </span>
            <h2 className="mt-4 font-semibold text-lg text-sos">24/7 Emergency Line</h2>
            <p className="mt-1 font-mono text-sm font-bold text-sos">{SITE.EMERGENCY_LINE}</p>
            <p className="mt-1 text-xs text-muted-foreground">Urgent hospital & SOS dispatch</p>
          </a>

          <a
            href={`https://wa.me/${SITE.WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              track("whatsapp_contact_clicked", { source_location: "contact_page_card" });
              track("whatsapp_click", { source: "contact_page" });
            }}
            className="card-soft p-6 transition-all hover:border-primary/50 hover:shadow-lift"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-primary-soft text-primary">
              <MessageCircle className="size-6" />
            </span>
            <h2 className="mt-4 font-semibold text-lg">WhatsApp Chat Desk</h2>
            <p className="mt-1 font-mono text-sm font-bold text-foreground">{SITE.SUPPORT_PHONE}</p>
            <p className="mt-1 text-xs text-muted-foreground">Instant coordinator chat</p>
          </a>

          <a
            href={`mailto:${SITE.EMAIL}`}
            onClick={() => track("email_click", { source: "contact_page" })}
            className="card-soft p-6 transition-all hover:border-primary/50 hover:shadow-lift"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-primary-soft text-primary">
              <Mail className="size-6" />
            </span>
            <h2 className="mt-4 font-semibold text-lg">Official Email</h2>
            <p className="mt-1 text-sm font-semibold text-foreground">{SITE.EMAIL}</p>
            <p className="mt-1 text-xs text-muted-foreground">Invoicing & institutional queries</p>
          </a>
        </div>
      </section>

      {/* Main Form & Hub Section */}
      <section className="container-page pb-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* Send an Enquiry Form */}
          <div className="card-soft p-8 md:p-10 shadow-soft">
            <span className="eyebrow">{isCityInterest ? "Regional Expansion" : "Message Us"}</span>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
              {isCityInterest ? `Express Interest for Care in ${form.city}` : "Send a Care Coordination Enquiry"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {isCityInterest
                ? "Direct online bookings are not yet enabled in this city as local caregiver vetting is underway. Share your requirements below to help us evaluate cluster deployment."
                : "Have questions about specific medical conditions, caregiver language requirements, or corporate coverage? Leave your details below."}
            </p>

            {isCityInterest && (
              <div className="mt-6 rounded-2xl border border-primary/25 bg-primary-soft/40 p-4 text-xs space-y-1.5 text-muted-foreground">
                <div className="flex items-center gap-2 font-semibold text-primary">
                  <Sparkles className="size-4" />
                  <span>Expansion Evaluation Hub</span>
                </div>
                <p>
                  We adhere to verified standby SLAs before opening instant booking. Registering your interest informs our deployment team and allows us to provide a personalized feasibility assessment for long-term or live-in care.
                </p>
              </div>
            )}

            {submitted ? (
              <div className="mt-8 rounded-2xl bg-primary-soft/50 p-8 text-center space-y-4">
                <CheckCircle2 className="mx-auto size-12 text-primary" />
                <h3 className="text-xl font-semibold">Thank you for reaching out</h3>
                <p className="text-sm text-muted-foreground">
                  {isCityInterest
                    ? `Your expression of interest for ${form.city} has been registered with our expansion desk. A coordinator will connect with you to review feasibility.`
                    : "Your enquiry has been assigned to our senior regional care desk. We will call you back within 30 minutes during active hours."}
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="c-name">Your Full Name *</Label>
                    <Input
                      id="c-name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-1.5 h-12 rounded-xl"
                      placeholder="e.g. Ananya Sen"
                    />
                  </div>
                  <div>
                    <Label htmlFor="c-phone">Mobile Number *</Label>
                    <Input
                      id="c-phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="mt-1.5 h-12 rounded-xl"
                      placeholder="98765 43210"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="c-email">Email Address</Label>
                    <Input
                      id="c-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-1.5 h-12 rounded-xl"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="c-city">Your City</Label>
                    <select
                      id="c-city"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="mt-1.5 h-12 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:border-primary"
                    >
                      <optgroup label="Operational Metros">
                        {CITIES.map((c) => (
                          <option key={c.slug} value={c.name}>{c.name}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Planned Expansion Hubs">
                        <option value="Kochi">Kochi (Planned)</option>
                        <option value="Mysuru">Mysuru (Planned)</option>
                        <option value="Pune">Pune (Planned)</option>
                        <option value="Visakhapatnam">Visakhapatnam (Planned)</option>
                      </optgroup>
                      <option value="Other">Other City / Outstation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="c-subject">Enquiry Subject</Label>
                  <select
                    id="c-subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="mt-1.5 h-12 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:border-primary"
                  >
                    {isCityInterest && (
                      <option value={`Expression of Interest — ${form.city}`}>
                        Expression of Interest — {form.city}
                      </option>
                    )}
                    <option value="General Enquiry">General Care Enquiry</option>
                    <option value="Elderly Care Arrangement">Elderly Care & Live-in Planning</option>
                    <option value="Hospital Bedside Attendant">Hospital Bedside Assistance</option>
                    <option value="Post-Natal Newborn Care">Post-Natal Maternal Support</option>
                    <option value="Clinical Care Assessment Request">Clinical Nursing Assessment Request</option>
                    <option value="Ecosystem Partnership">Ecosystem / Institutional Partnership</option>
                    <option value="Billing & Invoicing">Billing & Tax Invoice Query</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="c-message">How can we assist you? *</Label>
                  <Textarea
                    id="c-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="mt-1.5 rounded-xl text-sm"
                    placeholder="Describe your care timeline, family requirements, or special preferences..."
                  />
                </div>

                <Button type="submit" disabled={sending} className="w-full h-12 gap-2 text-base font-medium" variant="warm">
                  <Send className="size-4" /> {sending ? "Sending Message…" : "Submit Enquiry"}
                </Button>
              </form>
            )}
          </div>

          {/* Regional Office Hubs & Quick Links */}
          <div className="space-y-6">
            <div className="card-soft p-8">
              <span className="eyebrow">Metro Command Centers</span>
              <h3 className="mt-2 text-xl font-semibold">Regional Operations Hubs</h3>
              <div className="mt-6 space-y-5 text-sm">
                {CITIES.map((c) => (
                  <div key={c.slug} className="border-b border-border pb-4 last:border-none last:pb-0">
                    <p className="font-semibold text-foreground flex items-center justify-between">
                      <span>{c.name} Hub</span>
                      <span className="text-xs font-normal text-muted-foreground">{c.dispatch} SLA</span>
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed flex items-start gap-1.5">
                      <MapPin className="size-3.5 shrink-0 text-primary mt-0.5" />
                      {c.address}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-xs">
                      <Link to="/cities/$city" params={{ city: c.slug }} className="text-primary hover:underline font-semibold">
                        View City Coverage →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-soft p-8 bg-secondary/40">
              <h3 className="text-lg font-semibold">Institutional & Ecosystem Partners</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Representing a nursing college, hospital network, or women's self-help federation?
              </p>
              <Button asChild variant="outline" className="mt-4 w-full">
                <Link to="/ecosystem-partners">Ecosystem Partnership Portal</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick FAQ Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Common Queries</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/faq">View All FAQs →</Link>
            </Button>
          </div>
          <Accordion type="single" collapsible className="mt-6 card-soft px-6">
            {FAQS.slice(0, 4).map((f, i) => (
              <AccordionItem key={i} value={String(i)}>
                <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
