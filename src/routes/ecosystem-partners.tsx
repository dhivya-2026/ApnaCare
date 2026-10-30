import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Building2,
  ShieldCheck,
  Zap,
  Users,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  IMPACT,
  PARTNER_BENEFITS,
  PARTNER_CATEGORIES,
  PARTNER_JOURNEY,
  PARTNER_TYPES,
  STATE_PARTNERS,
  SUCCESS_STORIES,
  SITE,
  buildWhatsAppUrl,
} from "@/data/site";
import { PageHero, SectionHeading } from "@/components/site/Cards";
import { fieldErrors, partnerSchema } from "@/lib/validation";
import { track, sendToGoogleSheet } from "@/lib/analytics";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ecosystem-partners")({
  head: () =>
    seo(
      "Ecosystem Partners — ApnaCare",
      "Partner with ApnaCare to empower communities, streamline hospital discharge care, and provide dignified livelihood opportunities across South India."
    ),
  component: Partners,
});

const QUICK_PARTNER_TYPES = [
  { id: "Accredited Hospitals & Clinics", label: "🏥 Hospitals & Clinics" },
  { id: "Nursing & Healthcare Colleges", label: "🎓 Nursing Colleges" },
  { id: "NGOs & Non-Profits", label: "🤝 NGOs & SHGs" },
  { id: "Diagnostic Centers & Labs", label: "🧪 Diagnostic Labs" },
  { id: "Senior Living & Communities", label: "🏡 Senior Communities" },
  { id: "Corporate & CSR Partners", label: "🏢 Corporate / CSR" },
];

const POPULAR_CITIES = [
  "Bengaluru",
  "Chennai",
  "Hyderabad",
  "Coimbatore",
  "Kochi",
  "Other City",
];

const SIMPLE_STEPS = [
  {
    step: "01",
    title: "1-Minute Quick Connect",
    desc: "Share your organization name, city, and phone or WhatsApp number. No lengthy legal paperwork upfront.",
    badge: "Fast & Frictionless",
    icon: Zap,
  },
  {
    step: "02",
    title: "15-Min Alignment Call",
    desc: "Our South India Partnership Lead contacts you to discuss patient transit, post-discharge support, or nursing training cohorts.",
    badge: "Direct Coordinator",
    icon: Users,
  },
  {
    step: "03",
    title: "Quick Digital MoU & Go-Live",
    desc: "Review a simple mutual cooperation agreement, receive your dedicated cluster SLA desk, and start collaborating.",
    badge: "Active in 48 Hours",
    icon: ShieldCheck,
  },
];

function Partners() {
  const [sel, setSel] = useState(STATE_PARTNERS[0]?.state || "Tamil Nadu");
  const max = Math.max(...STATE_PARTNERS.map((s) => s.count));

  const whatsappPartnerUrl = buildWhatsAppUrl(
    "Hello ApnaCare Partnerships Team! We are interested in partnering with ApnaCare for healthcare/eldercare support. Please share the partnership details."
  );

  return (
    <>
      {/* Hero Section with Quick Options */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 via-background to-background py-12 md:py-20 border-b border-border/50">
        <div className="container-page max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5 text-terracotta" />
            <span>Institutional & Community Network</span>
          </div>

          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Partner with ApnaCare to Expand Trusted Healthcare & Community Care
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed text-balance">
            We partner with hospitals, nursing colleges, NGOs, diagnostic labs, and healthcare institutions across South India to deliver verified bedside support, post-op care, and women livelihood empowerment.
          </p>

          {/* Quick Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 shadow-soft hover:shadow-lift transition-all min-h-[48px] font-bold text-sm sm:text-base"
            >
              <a
                href="#partner-form"
                onClick={() => track("partner_hero_express_click")}
              >
                <span>⚡ 60-Second Express Application</span>
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-6 min-h-[48px] font-semibold border-primary/30 bg-primary-soft text-primary hover:bg-primary hover:text-primary-foreground text-sm sm:text-base transition-all"
            >
              <a
                href={whatsappPartnerUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("partner_hero_whatsapp_click")}
                className="inline-flex items-center gap-2"
              >
                <MessageSquare className="size-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-6 min-h-[48px] font-semibold border-border bg-card hover:bg-secondary text-sm sm:text-base"
            >
              <a
                href={`tel:${SITE.SUPPORT_PHONE_TEL}`}
                onClick={() => track("partner_hero_call_click")}
                className="inline-flex items-center gap-2"
              >
                <Phone className="size-4 text-primary" />
                <span>Call Desk: {SITE.SUPPORT_PHONE}</span>
              </a>
            </Button>
          </div>

          {/* Quick reassurance indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs font-medium text-muted-foreground pt-4 border-t border-border/50 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-foreground font-semibold">
              <Check className="size-4 text-primary" />
              Zero Upfront Fees
            </span>
            <span className="inline-flex items-center gap-1.5 text-foreground font-semibold">
              <Check className="size-4 text-primary" />
              24-Hour Review Turnaround
            </span>
            <span className="inline-flex items-center gap-1.5 text-foreground font-semibold">
              <Check className="size-4 text-primary" />
              Standard Digital MoUs
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-4 text-primary" />
              Dedicated Cluster Coordinator
            </span>
          </div>
        </div>
      </section>

      {/* 3-Step Simple Process Graphic */}
      <section className="container-page py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto">
          <SectionHeading
            title="How It Works: 3 Simple Steps to Partner"
            sub="We eliminated complicated institutional bureaucracy. Becoming an ApnaCare ecosystem partner is quick, structured, and transparent."
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SIMPLE_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="card-soft p-6 relative rounded-2xl border border-border/60 hover:border-primary/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-bold text-primary">
                      {step.step}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">
                      <Icon className="size-3.5" />
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-lg text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="container-page grid grid-cols-2 gap-4 py-8 md:grid-cols-4">
        {IMPACT.map(([n, l]) => (
          <div key={l} className="card-soft p-6 text-center">
            <p className="font-display text-4xl font-semibold text-primary">{n}</p>
            <p className="mt-1 text-sm text-muted-foreground">{l}</p>
          </div>
        ))}
      </section>

      {/* Ecosystem categories */}
      <section className="container-page py-12">
        <SectionHeading
          title="Ecosystem categories"
          sub="Our collaborative network spans healthcare, vocational education, and grassroots community organizations."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PARTNER_CATEGORIES.map((c) => (
            <div key={c.name} className="card-soft p-5">
              <p className="font-display text-2xl font-semibold text-primary">
                {c.count}
              </p>
              <h3 className="mt-2 font-semibold">{c.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partner network across India */}
      <section className="bg-secondary/40 py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              title="Partner network across India"
              sub="25+ states and union territories. Select a state to see partner counts."
            />
            <ul className="mt-8 space-y-2">
              {STATE_PARTNERS.map((s) => (
                <li key={s.state}>
                  <button
                    onClick={() => setSel(s.state)}
                    aria-pressed={sel === s.state}
                    className={cn(
                      "w-full rounded-2xl border p-3 text-left transition-all",
                      sel === s.state
                        ? "border-primary bg-card shadow-sm"
                        : "border-transparent hover:bg-card/60"
                    )}
                  >
                    <div className="flex justify-between text-sm font-semibold">
                      <span>{s.state}</span>
                      <span>{s.count}</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary transition-all duration-300"
                        style={{ width: `${(s.count / max) * 100}%` }}
                      />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title="Why partner with ApnaCare" />
            <div className="mt-8 grid grid-cols-2 gap-3">
              {PARTNER_BENEFITS.map((b) => (
                <div
                  key={b}
                  className="rounded-2xl bg-card p-4 text-sm font-semibold shadow-soft border border-border/50"
                >
                  {b}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Partner types: {PARTNER_TYPES.join(" · ")}
            </p>
          </div>
        </div>
      </section>

      {/* Partnership journey & Success Stories */}
      <section className="container-page py-16">
        <SectionHeading title="Detailed Onboarding Roadmap" />
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNER_JOURNEY.map(([t, d], i) => (
            <li
              key={t}
              className="card-soft p-5 animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <p className="font-display text-sm text-terracotta">0{i + 1}</p>
              <h3 className="mt-1 font-semibold">{t}</h3>
              <p className="text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
        <h3 className="mt-14 text-xl font-semibold">Success stories</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SUCCESS_STORIES.map((s) => (
            <div
              key={s.org}
              className="rounded-2xl border border-dashed border-border p-5 bg-card"
            >
              <p className="font-semibold text-foreground">{s.org}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Streamlined, Easier Partner Application Form */}
      <PartnerForm />
    </>
  );
}

function PartnerForm() {
  const [f, setF] = useState({
    orgName: "",
    orgType: "Accredited Hospitals & Clinics",
    contact: "",
    phone: "",
    city: "Bengaluru",
    email: "",
    website: "",
    state: "Karnataka",
    members: "",
    category: "Hospital Bedside & Post-Discharge Care",
    interest: "",
  });

  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [e, setE] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [createdPartnerId, setCreatedPartnerId] = useState("");

  const set = (k: keyof typeof f) => (ev: { target: { value: string } }) =>
    setF({ ...f, [k]: ev.target.value });

  const selectOrgType = (type: string) => {
    setF((prev) => ({ ...prev, orgType: type }));
    if (e.orgType) setE((prev) => ({ ...prev, orgType: "" }));
  };

  const selectCity = (city: string) => {
    if (city === "Other City") {
      setF((prev) => ({ ...prev, city: "" }));
    } else {
      let st = "Tamil Nadu";
      if (city === "Bengaluru") st = "Karnataka";
      if (city === "Hyderabad") st = "Telangana";
      if (city === "Kochi") st = "Kerala";
      setF((prev) => ({ ...prev, city, state: st }));
    }
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (state === "loading") return;

    const r = partnerSchema.safeParse(f);
    if (!r.success) {
      setE(fieldErrors(r.error));
      return;
    }
    setE({});
    setState("loading");
    track("partner_form_submit");

    const partnerId = "prt_" + Date.now().toString(36);
    setCreatedPartnerId(partnerId);

    await sendToGoogleSheet({
      event_type: "partner",
      event_name: "partner_application_submitted",
      lead_type: "PARTNER",
      form_name: "Ecosystem Partner Application (Fast-Track)",
      partner_id: partnerId,
      org_name: f.orgName,
      org_type: f.orgType,
      contact_person: f.contact,
      name: f.contact,
      email: f.email || "partner@apnacare.in",
      phone: f.phone,
      mobile: f.phone,
      website: f.website || "",
      state: f.state || "South India",
      city: f.city,
      members_count: f.members || "N/A",
      category: f.category || f.orgType,
      interest_notes: f.interest || "Express partner application",
      lead_status: "New",
      page_path: "/ecosystem-partners",
    });

    track("partner_form_success");
    setState("done");
  };

  const directWhatsAppUrl = buildWhatsAppUrl(
    `Hello ApnaCare Partnerships Team! I submitted a partner enquiry for "${f.orgName || "our organization"}" (${f.city || "South India"}). My name is ${f.contact || "Representative"} (${f.phone || "Phone"}). Please connect with us.`
  );

  return (
    <section id="partner-form" className="bg-secondary/40 py-16 scroll-mt-12">
      <div className="container-page max-w-4xl">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary mb-3">
            <Zap className="size-3.5" />
            <span>Fast-Track Application</span>
          </div>
          <SectionHeading
            title="Become an Ecosystem Partner"
            sub="No tedious paperwork or bureaucratic delays. Submit your details below or chat directly on WhatsApp to get started."
          />
        </div>

        {state === "done" ? (
          <div className="card-soft p-8 md:p-10 text-center max-w-2xl mx-auto border-2 border-primary/30">
            <div className="size-16 rounded-full bg-primary-soft flex items-center justify-center mx-auto text-primary">
              <CheckCircle2 className="size-10" />
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
              Partner Enquiry Received!
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Reference ID:{" "}
              <span className="font-mono font-semibold text-foreground">
                {createdPartnerId}
              </span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Thank you, <strong className="text-foreground">{f.contact}</strong>. Our South India Partnerships Director has received your information for <strong className="text-foreground">{f.orgName}</strong> and will connect via WhatsApp or phone within 24 hours.
            </p>

            <div className="mt-6 pt-6 border-t border-border flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full">
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <MessageSquare className="size-4" />
                  <span>Start WhatsApp Conversation Now</span>
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full"
                onClick={() => {
                  setState("idle");
                  setF({
                    orgName: "",
                    orgType: "Accredited Hospitals & Clinics",
                    contact: "",
                    phone: "",
                    city: "Bengaluru",
                    email: "",
                    website: "",
                    state: "Karnataka",
                    members: "",
                    category: "Hospital Bedside & Post-Discharge Care",
                    interest: "",
                  });
                }}
              >
                Submit Another Request
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Main Form (8 Cols) */}
            <form
              onSubmit={submit}
              noValidate
              className="lg:col-span-8 card-soft p-6 md:p-8 space-y-6 border border-border/70 shadow-soft"
            >
              {/* Quick Type Selection */}
              <div>
                <Label className="text-sm font-semibold text-foreground">
                  1. Organization Type *
                </Label>
                <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {QUICK_PARTNER_TYPES.map((t) => {
                    const isSelected = f.orgType === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => selectOrgType(t.id)}
                        className={cn(
                          "px-3 py-2.5 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between",
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground shadow-sm"
                            : "border-border/80 bg-card hover:bg-secondary text-foreground"
                        )}
                      >
                        <span className="truncate">{t.label}</span>
                        {isSelected && <Check className="size-3.5 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
                {e["orgType"] && (
                  <p className="mt-1 text-xs text-destructive">{e["orgType"]}</p>
                )}
              </div>

              {/* Organization Name & City */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="orgName" className="text-sm font-semibold">
                    2. Organization / Facility Name *
                  </Label>
                  <Input
                    id="orgName"
                    placeholder="e.g. Manipal Hospital / Mother Teresa Nursing"
                    value={f.orgName}
                    onChange={set("orgName")}
                    className="mt-1.5 h-12"
                  />
                  {e["orgName"] && (
                    <p className="mt-1 text-xs text-destructive">{e["orgName"]}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="city" className="text-sm font-semibold">
                    3. City / District *
                  </Label>
                  <Input
                    id="city"
                    placeholder="e.g. Bengaluru, Chennai, Hyderabad..."
                    value={f.city}
                    onChange={set("city")}
                    className="mt-1.5 h-12"
                  />
                  {/* City Quick Pills */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {POPULAR_CITIES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => selectCity(c)}
                        className={cn(
                          "px-2 py-0.5 rounded-md text-[11px] font-medium border transition-colors",
                          f.city === c
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted/50 hover:bg-muted text-muted-foreground border-transparent"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  {e["city"] && (
                    <p className="mt-1 text-xs text-destructive">{e["city"]}</p>
                  )}
                </div>
              </div>

              {/* Contact Person & Phone Number */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="contact" className="text-sm font-semibold">
                    4. Contact Person Name *
                  </Label>
                  <Input
                    id="contact"
                    placeholder="e.g. Dr. Rajesh / Sister Mary"
                    value={f.contact}
                    onChange={set("contact")}
                    className="mt-1.5 h-12"
                  />
                  {e["contact"] && (
                    <p className="mt-1 text-xs text-destructive">{e["contact"]}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-semibold">
                    5. Mobile / WhatsApp Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="10-digit number (e.g. 9876543210)"
                    value={f.phone}
                    onChange={set("phone")}
                    className="mt-1.5 h-12"
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Used for WhatsApp partnership coordinator introduction.
                  </p>
                  {e["phone"] && (
                    <p className="mt-1 text-xs text-destructive">{e["phone"]}</p>
                  )}
                </div>
              </div>

              {/* Optional Extended Details Toggle */}
              <div className="pt-2 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => setShowOptionalFields(!showOptionalFields)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  {showOptionalFields ? (
                    <>
                      <ChevronUp className="size-4" />
                      <span>Hide optional details (Email, Website, Notes)</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="size-4" />
                      <span>+ Add optional institutional details (Email, Website, Notes)</span>
                    </>
                  )}
                </button>

                {showOptionalFields && (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 pt-2 animate-fade-in">
                    <div>
                      <Label htmlFor="email" className="text-xs font-medium">
                        Official Email (Optional)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@hospital.org"
                        value={f.email}
                        onChange={set("email")}
                        className="mt-1.5 h-11"
                      />
                      {e["email"] && (
                        <p className="mt-1 text-xs text-destructive">{e["email"]}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="website" className="text-xs font-medium">
                        Website (Optional)
                      </Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://..."
                        value={f.website}
                        onChange={set("website")}
                        className="mt-1.5 h-11"
                      />
                      {e["website"] && (
                        <p className="mt-1 text-xs text-destructive">{e["website"]}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="interest" className="text-xs font-medium">
                        Specific Partnership Requirements or Notes (Optional)
                      </Label>
                      <Textarea
                        id="interest"
                        placeholder="e.g. Looking for post-discharge elderly attendants for orthopedic patients, or placement for 20 GNM nursing graduates..."
                        value={f.interest}
                        onChange={set("interest")}
                        rows={3}
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={state === "loading"}
                  className="w-full h-12 text-base font-bold shadow-soft hover:shadow-lift transition-all rounded-xl"
                >
                  {state === "loading" ? (
                    <span>Submitting Enquiry…</span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <span>Submit Quick Partner Request</span>
                      <ArrowRight className="size-4" />
                    </span>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-2.5">
                  ⚡ 100% Free to join • Standard digital MoU • Dedicated South India support desk
                </p>
              </div>
            </form>

            {/* Side Card: Instant WhatsApp & Phone Shortcut (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="card-soft p-6 rounded-2xl border border-primary/20 bg-primary-soft/30 space-y-4">
                <div className="size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <MessageSquare className="size-5" />
                </div>
                <h4 className="font-semibold text-foreground text-base">
                  Prefer Direct WhatsApp?
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Skip the web form entirely! Tap below to open a direct WhatsApp conversation with our South India Partnerships Director.
                </p>
                <Button
                  asChild
                  variant="default"
                  className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <a
                    href={whatsappPartnerUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => track("partner_sidebar_whatsapp_click")}
                    className="inline-flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="size-4" />
                    <span>WhatsApp Partnerships</span>
                  </a>
                </Button>
              </div>

              <div className="card-soft p-6 rounded-2xl border border-border space-y-3 bg-card">
                <div className="size-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                  <Phone className="size-5" />
                </div>
                <h4 className="font-semibold text-foreground text-base">
                  Direct Phone Desk
                </h4>
                <p className="text-xs text-muted-foreground">
                  Available Mon–Sat, 8:00 AM – 8:00 PM for institutional queries and urgent bedside tie-ups.
                </p>
                <a
                  href={`tel:${SITE.SUPPORT_PHONE_TEL}`}
                  className="inline-block text-sm font-bold text-primary hover:underline"
                >
                  {SITE.SUPPORT_PHONE}
                </a>
              </div>

              <div className="rounded-2xl border border-dashed border-border p-4 text-xs text-muted-foreground space-y-1.5">
                <p className="font-semibold text-foreground">
                  Who can partner?
                </p>
                <p>
                  Hospitals seeking zero-readmission post-op support, nursing colleges placing graduates, NGOs training women, and corporations deploying CSR eldercare.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
