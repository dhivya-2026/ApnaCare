/**
 * EnquiryForm — compact callback request form.
 * Use this on the homepage, service pages, and contact sections.
 * Fields: Name, Phone, Service, Optional message.
 * No backend is wired — shows a demo confirmation state.
 * Wire up onSubmit to a real endpoint before going live.
 */

import { useState } from "react";
import { Calendar, CheckCircle2, Phone, ShieldCheck, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SERVICES, CITIES, SITE } from "@/data/site";
import { track, submitLeadWithReliability } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface EnquiryFormProps {
  /** Pre-select a specific service */
  preselectedService?: string;
  /** Title shown above the form */
  title?: string;
  /** Subtitle / subheading */
  subtitle?: string;
  /** Extra className for the wrapper */
  className?: string;
  /** Google Calendar appointment booking URL */
  bookingUrl?: string;
}

interface FormState {
  name: string;
  phone: string;
  service: string;
  city: string;
  timeframe: string;
  message: string;
}

const PHONE_RE = /^[6-9]\d{9}$/;

export function EnquiryForm({
  preselectedService = "",
  title = "Request a Callback",
  subtitle = "Share your details and we'll call you within 2 hours.",
  className,
  bookingUrl = "https://calendar.app.google/tZ4exnXrAWnu9PuQ9",
}: EnquiryFormProps) {
  const [f, setF] = useState<FormState>({
    name: "",
    phone: "",
    service: preselectedService,
    city: "Bengaluru",
    timeframe: "Within 24-48 hrs",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const update = (field: keyof FormState, value: string) => {
    setF((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (submitError) setSubmitError(null);
  };

  const validate = (): boolean => {
    const errs: Partial<FormState> = {};
    if (!f.name.trim() || f.name.trim().length < 2) errs.name = "Please enter your full name.";
    if (!PHONE_RE.test(f.phone.replace(/\s/g, "")))
      errs.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!f.service) errs.service = "Please select a service.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (submitting) return;

    setSubmitting(true);
    setSubmitError(null);
    track("consultation_cta_clicked", { service: f.service, city: f.city, source_section: "enquiry_form" });
    track("enquiry_form_submit", { service: f.service, city: f.city });

    const result = await submitLeadWithReliability({
      event_type: "callback",
      event_name: "callback_requested",
      lead_type: "CALLBACK",
      form_name: "Quick Callback Form",
      enquiry_id: "enq_" + Date.now().toString(36),
      name: f.name,
      customer_name: f.name,
      phone: f.phone,
      mobile: f.phone,
      service: f.service,
      service_name: f.service,
      city: f.city,
      timeframe: f.timeframe,
      message: f.message ? `[${f.timeframe}] ${f.message}` : `[${f.timeframe}]`,
      lead_status: "New",
      follow_up_status: "Pending Callback",
      page_path: typeof window !== "undefined" ? window.location.pathname : "/",
    });

    setSubmitting(false);
    if (result.success) {
      setDone(true);
      track("enquiry_form_success", { service: f.service, city: f.city });
    } else {
      setSubmitError("We were unable to connect to the intake desk. Your details are preserved. Please click retry or call directly.");
    }
  };

  if (done) {
    return (
      <div className={cn("rounded-2xl border border-border bg-card p-8 text-center", className)}>
        <CheckCircle2 className="mx-auto mb-3 size-12 text-primary" />
        <h3 className="text-lg font-semibold">Callback Requested!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you, <strong>{f.name}</strong>. Our team will call you at <strong>{f.phone}</strong>{" "}
          within 2 hours.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Our regional care desk has logged your request and an experienced coordinator will connect with you promptly.
        </p>
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            asChild
            variant="warm"
            size="sm"
            className="gap-2 shadow-soft hover:shadow-lift"
          >
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("book_time_slot_click", { location: "quick_callback_form_success" })}
            >
              <Calendar className="size-3.5" />
              <span>Book a Time Slot on Calendar</span>
            </a>
          </Button>
          <button
            onClick={() => {
              setDone(false);
              setF({
                name: "",
                phone: "",
                service: preselectedService || "",
                city: "Bengaluru",
                timeframe: "Within 24-48 hrs",
                message: "",
              });
            }}
            className="text-xs font-medium text-primary underline hover:text-primary/80"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("rounded-2xl border border-border bg-card p-6 shadow-sm", className)}>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}

      <form onSubmit={handleSubmit} noValidate className="mt-5 grid gap-4">
        {/* Name */}
        <div>
          <Label htmlFor="enq-name">Your Name *</Label>
          <Input
            id="enq-name"
            value={f.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. Meena Krishnan"
            autoComplete="name"
            className={cn("mt-1", errors.name && "border-destructive")}
          />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="enq-phone">Mobile Number *</Label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-3 flex items-center text-xs text-muted-foreground font-medium pointer-events-none">
              +91
            </span>
            <Input
              id="enq-phone"
              type="tel"
              inputMode="numeric"
              value={f.phone}
              onChange={(e) => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="98765 43210"
              autoComplete="tel"
              className={cn("pl-10", errors.phone && "border-destructive")}
            />
          </div>
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>

        {/* Service */}
        <div>
          <Label htmlFor="enq-service">Service Required *</Label>
          <select
            id="enq-service"
            value={f.service}
            onChange={(e) => update("service", e.target.value)}
            className={cn(
              "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring",
              errors.service && "border-destructive",
            )}
          >
            <option value="">Select a service…</option>
            {SERVICES.filter((s) => s.active).map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
        </div>

        {/* City and Timeframe Selection */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="enq-city">City Cluster *</Label>
            <select
              id="enq-city"
              value={f.city}
              onChange={(e) => update("city", e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {CITIES.map((c) => (
                <option key={c.slug} value={c.name}>
                  {c.name}
                </option>
              ))}
              <option value="Other">Other City / Transit</option>
            </select>
          </div>

          <div>
            <Label htmlFor="enq-timeframe">Preferred Start Timeframe</Label>
            <select
              id="enq-timeframe"
              value={f.timeframe}
              onChange={(e) => update("timeframe", e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="Immediately (within 2-4 hrs)">Immediately (within 2-4 hrs)</option>
              <option value="Tomorrow">Tomorrow</option>
              <option value="Within 24-48 hrs">Within 24-48 hrs</option>
              <option value="This week">This week</option>
              <option value="Planning ahead">Planning ahead / Inpatient discharge</option>
            </select>
          </div>
        </div>

        {/* Optional message */}
        <div>
          <Label htmlFor="enq-message">
            Additional Details <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            id="enq-message"
            value={f.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="E.g. patient mobility level, shift hours, language preference…"
            rows={3}
            className="mt-1 resize-none"
          />
        </div>

        {submitError && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive flex items-start gap-2">
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">{submitError}</p>
              <button
                type="button"
                onClick={handleSubmit}
                className="underline font-bold text-destructive hover:text-destructive/80"
              >
                Retry Callback Request
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons: Request a Callback + Book a Time Slot */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <Button
            type="submit"
            disabled={submitting}
            className="flex-1 gap-2 whitespace-nowrap shadow-soft hover:shadow-lift"
            size="lg"
          >
            <Phone className="size-4" />
            {submitting ? "Sending…" : "Request a Callback"}
          </Button>

          <Button
            asChild
            variant="warm"
            size="lg"
            className="flex-1 gap-2 whitespace-nowrap shadow-soft hover:shadow-lift"
          >
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("book_time_slot_click", { location: "quick_callback_form" })}
            >
              <Calendar className="size-4" />
              <span>Book a Time Slot</span>
            </a>
          </Button>
        </div>

        <div className="space-y-1 text-center text-xs text-muted-foreground">
          <p>
            We typically respond within 15–30 minutes during operating hours. For urgent needs, call{" "}
            <a
              href={`tel:${SITE.SUPPORT_PHONE_TEL}`}
              className="font-semibold text-primary hover:underline"
            >
              {SITE.SUPPORT_PHONE}
            </a>
            .
          </p>
          <p className="text-[11px] text-muted-foreground/80 flex items-center justify-center gap-1.5 pt-1">
            <ShieldCheck className="size-3.5 text-primary shrink-0" />
            Zero spam guarantee. Your details are strictly used to coordinate care.
          </p>
        </div>
      </form>
    </div>
  );
}
