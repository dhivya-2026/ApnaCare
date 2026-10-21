import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { CheckCircle2, MapPin, ShieldCheck, ArrowLeft, ArrowRight, Languages, Calendar, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CITIES, SERVICES, SITE, formatINR } from "@/data/site";
import { PageHero } from "@/components/site/Cards";
import { fieldErrors, nameSchema, optionalEmail, phoneSchema } from "@/lib/validation";
import { findPromo, getSavedPromo, savePromo } from "@/lib/promo";
import { calcBookingTotal } from "@/lib/pricing";
import { track, sendToGoogleSheet } from "@/lib/analytics";
import { recordBookingDraft, recordServiceInteraction } from "@/lib/sessionEngine";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/booking")({
  validateSearch: z.object({
    service: z.string().optional(),
    city: z.string().optional(),
    needId: z.string().optional(),
    situation: z.string().optional(),
  }),
  head: () =>
    seo(
      "Book a Women Attendant — ApnaCare",
      "Reserve verified women attendants for elderly care, hospital assistance, nursing, post-natal recovery, and travel mobility across South India."
    ),
  component: BookingPage,
});

const STEPS = ["Customer", "Service", "Location", "Schedule", "Requirements", "Verification"];

const stepSchemas = [
  z.object({ name: nameSchema, mobile: phoneSchema, email: optionalEmail }),
  z.object({ serviceId: z.string().min(1, "Please choose a service") }),
  z.object({
    city: z.string().min(1, "Please select a city"),
    location: z.string().trim().min(3, "Please add your area, apartment or landmark").max(300),
  }),
  z.object({
    date: z.string().min(1, "Pick a start date").refine((d) => d >= new Date().toISOString().slice(0, 10), "Date cannot be in the past"),
    time: z.string().min(1, "Pick a start time"),
    duration: z.coerce.number().int().min(1).max(60),
  }),
  z.object({
    preferredLanguage: z.string().optional(),
    notes: z.string().max(1000),
  }),
  z.object({}),
];

const STORAGE_KEY = "apnacare_booking_draft_v1";

function BookingPage() {
  const search = Route.useSearch();
  const [step, setStep] = useState(0);

  const [f, setF] = useState(() => {
    const initialNotes = search.situation ? `Care Requirement: ${search.situation}` : "";
    const initial = {
      name: "",
      mobile: "",
      email: "",
      serviceId: search.service ?? "",
      city: search.city ?? "",
      location: "",
      date: "",
      time: "",
      duration: "1",
      preferredLanguage: "Tamil",
      notes: initialNotes,
    };
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...initial,
            ...parsed,
            serviceId: search.service || parsed.serviceId || "",
            city: search.city || parsed.city || "",
            notes: search.situation ? `Care Requirement: ${search.situation}` : (parsed.notes || initialNotes),
          };
        }
      } catch (e) {
        // Ignore session parse error
      }
    }
    return initial;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  // Sync draft to sessionStorage + record cross-session timestamp
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(f));
      // Record draft timestamp in journey memory for cross-session resumption
      // Only record when visitor has entered meaningful data (not just landing)
      const hasContent = !!(f.serviceId || f.city || f.date);
      if (hasContent) {
        recordBookingDraft();
      }
    }
  }, [f]);

  useEffect(() => {
    track("booking_flow_started", { page_path: "/booking" });
    // Record that the visitor reached the booking page
    recordBookingDraft();
    const p = getSavedPromo();
    if (p) {
      setPromoInput(p);
      const matched = findPromo(p);
      if (matched) setPromo(matched.code);
    }
  }, []);

  // Record service interaction when service is selected
  useEffect(() => {
    if (f.serviceId) {
      const svcObj = SERVICES.find((s) => s.slug === f.serviceId);
      recordServiceInteraction(f.serviceId, svcObj?.name);
    }
  }, [f.serviceId]);

  const svc = SERVICES.find((s) => s.slug === f.serviceId);
  const totals = useMemo(
    () => calcBookingTotal(svc?.startingPrice ?? 0, Number(f.duration) || 1, findPromo(promo)?.discount ?? 0),
    [svc, f.duration, promo]
  );

  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const next = () => {
    const r = stepSchemas[step]!.safeParse(f);
    if (!r.success) {
      setErrors(fieldErrors(r.error));
      return;
    }
    setErrors({});
    track("booking_step_completed", { step: STEPS[step] });
    setStep(step + 1);
  };

  const submit = async () => {
    if (submitting) return;
    setSubmitting(true);
    const ref = "AC-" + Date.now().toString(36).toUpperCase().slice(-6);

    // Forward booking directly to Google Sheet
    await sendToGoogleSheet({
      event_type: "booking",
      event_name: "booking_completed",
      lead_type: "BOOKING",
      form_name: "6-Step Booking Form",
      booking_ref: ref,
      customer_name: f.name,
      name: f.name,
      mobile: f.mobile,
      phone: f.mobile,
      email: f.email,
      service_id: f.serviceId,
      service_name: svc?.name || f.serviceId,
      city: f.city,
      location_address: f.location,
      start_date: f.date,
      start_time: f.time,
      duration_days: f.duration,
      preferred_language: f.preferredLanguage,
      special_notes: f.notes,
      promo_code: promo || "",
      base_price: totals.base,
      discount: totals.discount,
      gst: totals.gst,
      total_amount: totals.finalAmount,
      booking_status: "Confirmed",
      follow_up_status: "Pending Coordinator Dispatch",
      lead_source: "website_booking_flow",
      page_path: "/booking",
    });

    track("booking_submitted", { service: f.serviceId, city: f.city, ref });
    track("booking_success", { ref });
    savePromo(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STORAGE_KEY);
    }
    setDone(ref);
    setSubmitting(false);
  };

  if (done)
    return (
      <section className="container-page max-w-2xl py-16">
        <div className="card-soft p-8 md:p-12 shadow-soft">
          <div className="grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
            <CheckCircle2 className="size-10" />
          </div>
          <span className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-terracotta">
            Booking Confirmed & Dispatched
          </span>
          <h1 className="mt-2 text-3xl font-semibold">Care Request Successfully Registered</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Your unique booking reference is <strong className="text-foreground font-mono text-base">{done}</strong>.
            A regional care coordinator has received this request and will reach out on your mobile number to confirm the assigned attendant profile.
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-4 rounded-2xl bg-secondary/50 p-6 text-sm">
            {[
              ["Service", svc?.name],
              ["Duration", `${f.duration} ${svc?.pricingUnit === "trip" ? "Trip(s)" : "Day(s)"}`],
              ["Start Date", f.date],
              ["Start Time", f.time],
              ["City & Area", `${f.location}, ${f.city}`],
              ["Preferred Language", f.preferredLanguage || "English"],
              ["Contact Mobile", f.mobile],
              ["Estimated Total", formatINR(totals.finalAmount)],
              ["18% GST Invoicing", "Included in Total"],
              ["Attendant Match", "In Progress (Coordinator Dispatch)"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs text-muted-foreground uppercase">{k}</dt>
                <dd className="mt-1 font-semibold text-foreground">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 rounded-2xl border border-primary/20 bg-primary-soft/50 p-4 text-xs text-muted-foreground leading-relaxed flex items-center gap-3">
            <ShieldCheck className="size-5 shrink-0 text-primary" />
            <span>
              All assigned attendants carry biometric photo badges and state police verification certificates. If you need immediate assistance, our 24/7 desk is at{" "}
              <a href={`tel:${SITE.SUPPORT_PHONE_TEL}`} className="font-bold text-primary hover:underline">{SITE.SUPPORT_PHONE}</a>.
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="flex-1">
              <Link to="/">Back to Homepage</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/safety-guidelines">Review Safety Guidelines</Link>
            </Button>
          </div>
        </div>
      </section>
    );

  const Err = ({ k }: { k: string }) =>
    errors[k] ? (
      <p id={`${k}-err`} role="alert" className="mt-1.5 text-xs font-semibold text-destructive">
        {errors[k]}
      </p>
    ) : null;

  return (
    <>
      <PageHero
        eyebrow="Safe & Verified Care"
        title="Reserve an Attendant in 6 Simple Steps"
        sub="Complete your care requirements. Your session state is automatically saved, and our transparent rates detail the base caregiver fee plus 18% statutory GST invoice with zero hidden charges."
      />

      <section className="container-page grid gap-10 py-12 lg:grid-cols-[1.6fr_1fr]">
        <div className="card-soft p-6 md:p-10 shadow-soft">
          {/* Step Progress Pills */}
          <nav aria-label="Booking steps progress" className="flex flex-wrap gap-2">
            {STEPS.map((s, i) => {
              const isCurrent = i === step;
              const isPast = i < step;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    if (isPast) setStep(i);
                  }}
                  disabled={!isPast && !isCurrent}
                  aria-current={isCurrent ? "step" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all",
                    isCurrent
                      ? "bg-primary text-primary-foreground shadow-2xs"
                      : isPast
                      ? "bg-primary-soft text-primary cursor-pointer hover:bg-primary-soft/80"
                      : "bg-muted text-muted-foreground/60 cursor-not-allowed"
                  )}
                >
                  {i + 1}. {s}
                </button>
              );
            })}
          </nav>

          {/* Linear progress bar */}
          <div className="mt-4" aria-hidden>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Step {step + 1} of {STEPS.length} — {STEPS[step]}
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {/* Step 0: Customer */}
            {step === 0 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-semibold">1. Primary Contact Information</h3>
                <p className="text-sm text-muted-foreground">
                  The primary family member who will coordinate with our regional center and receive shift updates.
                </p>
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={f.name}
                    onChange={set("name")}
                    className="mt-1.5 h-12 rounded-xl"
                    placeholder="e.g. Ramesh Krishnan"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-err" : undefined}
                  />
                  <Err k="name" />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile Number (WhatsApp Enabled) *</Label>
                  <Input
                    id="mobile"
                    inputMode="tel"
                    value={f.mobile}
                    onChange={set("mobile")}
                    className="mt-1.5 h-12 rounded-xl"
                    placeholder="98765 43210"
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.mobile)}
                    aria-describedby={errors.mobile ? "mobile-err" : undefined}
                  />
                  <Err k="mobile" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address (For Tax Invoices & Receipts)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={f.email}
                    onChange={set("email")}
                    className="mt-1.5 h-12 rounded-xl"
                    placeholder="care@example.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-err" : undefined}
                  />
                  <Err k="email" />
                </div>
              </div>
            )}

            {/* Step 1: Service */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-semibold">2. Choose Care Service</h3>
                <p className="text-sm text-muted-foreground">Select from our 11 verified women attendant disciplines:</p>
                <div className="grid gap-3 sm:grid-cols-2 max-h-[480px] overflow-y-auto pr-1">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setF({ ...f, serviceId: s.slug })}
                      aria-pressed={f.serviceId === s.slug}
                      className={cn(
                        "rounded-2xl border p-4 text-left transition-all",
                        f.serviceId === s.slug
                          ? "border-primary bg-primary-soft/70 shadow-2xs ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50 bg-card"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase text-terracotta">{s.category}</span>
                        <span className="text-xs font-bold text-muted-foreground">★ {s.rating}</span>
                      </div>
                      <p className="mt-1 text-base font-semibold">{s.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{s.shortDesc}</p>
                      <p className="mt-3 font-display text-sm font-bold text-primary">
                        {formatINR(s.startingPrice)}<span className="font-normal text-xs text-muted-foreground">/{s.pricingUnit}</span>
                      </p>
                    </button>
                  ))}
                </div>
                <Err k="serviceId" />
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-semibold">3. Service Location</h3>
                <p className="text-sm text-muted-foreground">
                  Where should the attendant report? We maintain local attendant clusters in all active metro zones.
                </p>
                <div>
                  <Label htmlFor="city">Metropolitan City *</Label>
                  <select
                    id="city"
                    value={f.city}
                    onChange={set("city")}
                    aria-invalid={Boolean(errors.city)}
                    aria-describedby={errors.city ? "city-err" : undefined}
                    className="mt-1.5 h-12 w-full rounded-xl border border-input bg-card px-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  >
                    <option value="">Select a city</option>
                    {CITIES.map((c) => (
                      <option key={c.slug} value={c.name}>
                        {c.name} ({c.state}) — SLA {c.dispatch}
                      </option>
                    ))}
                  </select>
                  <Err k="city" />
                </div>
                <div>
                  <Label htmlFor="loc">Detailed Street Address / Landmark / Hospital *</Label>
                  <Input
                    id="loc"
                    value={f.location}
                    onChange={set("location")}
                    className="mt-1.5 h-12 rounded-xl"
                    placeholder="e.g. Flat 302, Palm Grove Apts, Indiranagar OR Apollo Hospital Greams Rd"
                    aria-invalid={Boolean(errors.location)}
                    aria-describedby={errors.location ? "location-err" : undefined}
                  />
                  <Err k="location" />
                </div>
                <div className="grid h-40 place-items-center rounded-2xl border border-dashed border-border bg-secondary/50 p-6 text-center text-sm text-muted-foreground">
                  <div>
                    <MapPin className="mx-auto mb-2 size-6 text-primary" />
                    <p className="font-medium text-foreground">Cluster Dispatch Available</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Coordinates captured securely for 24/7 command center check-in and transit tracking.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Schedule */}
            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-semibold">4. Shift Schedule & Duration</h3>
                <p className="text-sm text-muted-foreground">
                  Specify the start date and expected duration. Schedules can be adjusted later through your coordinator.
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="date">Start Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      min={new Date().toISOString().slice(0, 10)}
                      value={f.date}
                      onChange={set("date")}
                      className="mt-1.5 h-12 rounded-xl"
                      aria-invalid={Boolean(errors.date)}
                      aria-describedby={errors.date ? "date-err" : undefined}
                    />
                    <Err k="date" />
                  </div>
                  <div>
                    <Label htmlFor="time">Shift Start Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={f.time}
                      onChange={set("time")}
                      className="mt-1.5 h-12 rounded-xl"
                      aria-invalid={Boolean(errors.time)}
                      aria-describedby={errors.time ? "time-err" : undefined}
                    />
                    <Err k="time" />
                  </div>
                  <div>
                    <Label htmlFor="dur">{svc?.pricingUnit === "trip" ? "Number of Trips" : "Total Days"} *</Label>
                    <Input
                      id="dur"
                      type="number"
                      min={1}
                      max={60}
                      value={f.duration}
                      onChange={set("duration")}
                      className="mt-1.5 h-12 rounded-xl"
                      aria-invalid={Boolean(errors.duration)}
                      aria-describedby={errors.duration ? "duration-err" : undefined}
                    />
                    <Err k="duration" />
                  </div>
                </div>
                <p className="rounded-xl bg-primary-soft/50 p-3 text-xs text-primary font-medium">
                  Guaranteed Backup Dispatch: If your assigned attendant is unwell, a matched replacement is dispatched within 90 minutes.
                </p>
              </div>
            )}

            {/* Step 4: Requirements */}
            {step === 4 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-semibold">5. Specific Care Preferences</h3>
                <div>
                  <Label htmlFor="lang">Preferred Language of Communication</Label>
                  <select
                    id="lang"
                    value={f.preferredLanguage}
                    onChange={set("preferredLanguage")}
                    className="mt-1.5 h-12 w-full rounded-xl border border-input bg-card px-3 text-sm focus:border-primary outline-none"
                  >
                    <option value="Tamil">Tamil</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Malayalam">Malayalam</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="notes">Care Instructions & Mobility Details</Label>
                  <Textarea
                    id="notes"
                    rows={5}
                    value={f.notes}
                    onChange={set("notes")}
                    className="mt-1.5 rounded-xl text-sm"
                    placeholder="Details about patient mobility, specific dietary schedules, wheelchair handling, or flight/train number for airport meet-and-greets. (Please avoid sensitive financial notes)."
                  />
                  <Err k="notes" />
                </div>
              </div>
            )}

            {/* Step 5: Verification & Review */}
            {step === 5 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-semibold">6. Review & Verification</h3>
                <div className="flex items-start gap-3 rounded-2xl bg-secondary/60 p-4 text-sm leading-relaxed">
                  <ShieldCheck className="size-5 shrink-0 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Verified Coordinator Confirmation</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      We will call <strong>{f.mobile}</strong> to confirm your shift requirements and share the assigned attendant's verified credential card before dispatch.
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="promo">Promotional Voucher</Label>
                  <div className="mt-1.5 flex gap-2">
                    <Input
                      id="promo"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="h-12 uppercase rounded-xl"
                      placeholder="e.g. CARECOMBO15"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 px-5"
                      onClick={() => {
                        const p = findPromo(promoInput);
                        if (p) {
                          setPromo(p.code);
                          setErrors({});
                          track("promo_apply", { code: p.code });
                        } else {
                          setPromo(null);
                          setErrors({ promo: "Promo code not recognized or expired." });
                        }
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                  <Err k="promo" />
                  {promo && <p className="mt-1.5 text-xs font-semibold text-primary">Coupon {promo} active! Discount applied.</p>}
                </div>
              </div>
            )}
          </div>

          {/* Stepper Controls */}
          <div className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6">
            <Button
              variant="outline"
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
              className="gap-2"
            >
              <ArrowLeft className="size-4" /> Previous
            </Button>

            {step < STEPS.length - 1 ? (
              <Button onClick={next} className="gap-2">
                Next: {STEPS[step + 1]} <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button onClick={submit} disabled={submitting} className="gap-2" variant="warm">
                {submitting ? "Confirming Dispatch…" : "Submit Care Request"}
              </Button>
            )}
          </div>
        </div>

        {/* Live Transparent Price Summary Sidebar */}
        <aside className="card-soft h-fit p-6 lg:sticky lg:top-24 space-y-6" aria-label="Price summary">
          <div>
            <span className="eyebrow">Itemized Invoice</span>
            <h2 className="mt-1 text-2xl font-semibold">Pricing Summary</h2>
          </div>

          {svc ? (
            <div className="space-y-4">
              <div className="rounded-2xl bg-secondary/50 p-4">
                <p className="text-xs font-bold uppercase text-terracotta">{svc.category}</p>
                <p className="mt-1 text-lg font-semibold">{svc.name}</p>
                <p className="text-xs text-muted-foreground mt-1">Starting at {formatINR(svc.startingPrice)}/{svc.pricingUnit}</p>
              </div>

              <dl className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    Base Care ({totals.units} {svc.pricingUnit === "trip" ? "trip" : "day"}{totals.units > 1 ? "s" : ""})
                  </dt>
                  <dd className="font-medium">{formatINR(totals.subtotal)}</dd>
                </div>

                {totals.discount > 0 && (
                  <div className="flex justify-between text-primary font-medium">
                    <dt>Voucher Discount ({promo})</dt>
                    <dd>−{formatINR(totals.discount)}</dd>
                  </div>
                )}

                <div className="flex justify-between text-muted-foreground">
                  <dt>GST (18% Statutory Tax)</dt>
                  <dd>{formatINR(totals.gst)}</dd>
                </div>

                <div className="flex justify-between border-t border-border pt-3 text-lg font-bold text-foreground">
                  <dt>Total Final Amount</dt>
                  <dd className="font-display text-2xl text-primary">{formatINR(totals.finalAmount)}</dd>
                </div>
              </dl>

              <div className="space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <p className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-primary shrink-0" />
                  <span>Full refund protection before dispatch</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>Official 18% GST statutory tax invoice provided</span>
                </p>
                <p className="flex items-center gap-2">
                  <Sparkles className="size-4 text-primary shrink-0" />
                  <span>Zero dispatcher surcharges or hidden commissions</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              <p>Please select a service in Step 2 to generate an itemized price quotation.</p>
            </div>
          )}

          <div className="rounded-xl bg-card border border-border p-4 text-xs text-muted-foreground leading-relaxed">
            Need urgent hospital or elder dispatch today? Call our 24/7 command hotline directly at{" "}
            <a href={`tel:${SITE.SUPPORT_PHONE_TEL}`} className="font-bold text-primary hover:underline">{SITE.SUPPORT_PHONE}</a>.
          </div>
        </aside>
      </section>
    </>
  );
}
