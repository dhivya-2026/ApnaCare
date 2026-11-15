import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Cpu,
  Phone,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";
import { track, sendToGoogleSheet } from "@/lib/analytics";
import { SITE, CITIES, buildWhatsAppUrl } from "@/data/site";
import type { TechSolutionCategory } from "@/data/offerings";

interface TechEnquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  technology: TechSolutionCategory | null;
}

const DEFAULT_WHO_FOR = [
  "Elderly Parent (Mother / Father)",
  "Self",
  "Spouse / Partner",
  "Post-Surgery / Recovery Patient",
  "Child / Adolescent",
  "Doctor / Clinical Referral",
];

function getPlaceholderForTech(techId?: string): string {
  switch (techId) {
    case "wearable-technology":
      return "e.g., Looking for an SOS smartwatch with fall alert and GPS tracking for my mother living in Bengaluru...";
    case "smart-home-sensors":
      return "e.g., Want privacy-safe movement and door sensors for elderly father living alone in Chennai...";
    case "remote-patient-monitoring":
      return "e.g., Need continuous blood pressure and glucose monitoring with physician dashboard access...";
    case "telehealth":
      return "e.g., Need geriatric specialist video follow-up for bedridden patient at home...";
    case "fall-detection-prevention":
      return "e.g., Looking for bathroom and bedside radar fall sensors for senior with balance difficulties...";
    case "medication-technology":
      return "e.g., Inquiring about automated pill dispenser with audio alarms for multiple daily prescriptions...";
    case "voice-assistants":
      return "e.g., Setting up voice lighting and emergency calling for senior who cannot use touchscreens...";
    case "ai-predictive-analytics":
      return "e.g., Interested in continuous baseline trend monitoring to prevent cardiac hospital readmissions...";
    case "care-management-platforms":
      return "e.g., Would like a walkthrough of family shift tracking and nurse coordination features...";
    case "assistive-robotics":
      return "e.g., Enquiring about mechanical lifting and transfer aids for bariatric patient...";
    default:
      return "Please share any specific medical condition, timeline, or family setup requirements...";
  }
}

export function TechEnquiryModal({
  open,
  onOpenChange,
  technology,
}: TechEnquiryModalProps) {
  const [f, setF] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Bengaluru",
    whoFor: "Elderly Parent (Mother / Father)",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Reset or adjust placeholder when technology changes
  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setErrors({});
    }
  }, [open, technology]);

  if (!technology) return null;

  const setVal =
    (k: keyof typeof f) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setF((prev) => ({ ...prev, [k]: e.target.value }));
      if (errors[k]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[k];
          return next;
        });
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!f.name.trim() || f.name.trim().length < 2) {
      newErrors.name = "Please enter your name";
    }
    if (!f.phone.trim() || !/^\+?[0-9\s-]{10,14}$/.test(f.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }
    if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    track("tech_offering_enquiry_submitted", {
      techId: technology.id,
      techTitle: technology.title,
      techStatus: technology.status,
      city: f.city,
      whoFor: f.whoFor,
    });

    try {
      await sendToGoogleSheet({
        formType: "technology_offering_enquiry",
        name: f.name,
        phone: f.phone,
        email: f.email || "Not provided",
        notes: `Offering: Category ${technology.number} - ${technology.title} (${technology.status}) | Who For: ${f.whoFor} | City: ${f.city} | Details: ${f.notes || "None"}`,
      });
    } catch {
      // Non-blocking submission
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onOpenChange(false);
  };

  const waTechMessage = `Hi LifeSakhi team, I would like to explore Category ${technology.number}: ${technology.title} for my family in ${f.city}.`;
  const waTechUrl = buildWhatsAppUrl(waTechMessage);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 rounded-3xl">
        <DialogHeader className="text-left space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="size-3.5" />
              Category {technology.number} · Technology Solutions
            </span>
            <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300">
              {technology.status}
            </span>
          </div>

          <DialogTitle className="text-2xl sm:text-3xl font-bold font-display text-foreground pt-1">
            Explore {technology.title}
          </DialogTitle>

          <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Connect directly with our care and health-tech coordinators to discuss devices, compatibility, family monitoring, and home setup.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="mt-6 text-center py-6 space-y-4 animate-fade-in">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 className="size-10" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Enquiry Received for {technology.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{f.name}</strong>. Our South India health-technology desk has received your request. A coordinator will call or WhatsApp you at <strong>{f.phone}</strong> within 15 minutes with device specifications, trial options, and home setup guidance.
            </p>

            <div className="p-4 rounded-2xl bg-secondary/70 text-xs text-muted-foreground space-y-2 text-left">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <ShieldCheck className="size-4 text-primary" />
                <span>Next steps from LifeSakhi:</span>
              </div>
              <p>• Verified device specification sheet and pricing details will be sent.</p>
              <p>• We will verify device compatibility with your family's routine.</p>
              <p>• Seamless integration with Saha home attendants if in-person assistance is required.</p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <Button
                asChild
                variant="outline"
                className="flex-1 rounded-full border-primary/20 text-xs font-semibold"
              >
                <a
                  href={waTechUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageCircle className="size-4 text-[#25D366]" />
                  Chat on WhatsApp Now
                </a>
              </Button>
              <Button onClick={handleClose} className="flex-1 rounded-full text-xs font-semibold">
                Done
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {/* Quick Context Summary */}
            <div className="rounded-2xl border border-border bg-background/60 p-3.5 text-xs">
              <p className="font-semibold text-foreground flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-primary" />
                {technology.subtitle}
              </p>
              <p className="mt-1 text-muted-foreground leading-relaxed line-clamp-2">
                {technology.whatItDoes}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="techName">Your Name *</Label>
                  <Input
                    id="techName"
                    value={f.name}
                    onChange={setVal("name")}
                    placeholder="e.g. Priya Raman"
                    className="mt-1 h-11 rounded-xl"
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-destructive">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="techPhone">Mobile / WhatsApp Number *</Label>
                  <Input
                    id="techPhone"
                    type="tel"
                    value={f.phone}
                    onChange={setVal("phone")}
                    placeholder="e.g. 98765 43210"
                    className="mt-1 h-11 rounded-xl"
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="techEmail">
                    Email Address <span className="text-muted-foreground text-xs font-normal">(Optional)</span>
                  </Label>
                  <Input
                    id="techEmail"
                    type="email"
                    value={f.email}
                    onChange={setVal("email")}
                    placeholder="For specs & pricing brochure"
                    className="mt-1 h-11 rounded-xl"
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="techCity">Your City / Location *</Label>
                  <select
                    id="techCity"
                    value={f.city}
                    onChange={setVal("city")}
                    className="mt-1 flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {CITIES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name} ({c.state})
                      </option>
                    ))}
                    <option value="Kochi">Kochi (Kerala)</option>
                    <option value="Mysuru">Mysuru (Karnataka)</option>
                    <option value="Other">Other City / Abroad</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="techWhoFor">Who is this technology for?</Label>
                <select
                  id="techWhoFor"
                  value={f.whoFor}
                  onChange={setVal("whoFor")}
                  className="mt-1 flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {DEFAULT_WHO_FOR.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="techNotes">
                  Specific Requirements or Questions{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    (Optional)
                  </span>
                </Label>
                <Textarea
                  id="techNotes"
                  value={f.notes}
                  onChange={setVal("notes")}
                  placeholder={getPlaceholderForTech(technology.id)}
                  rows={3}
                  className="mt-1 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 h-11 rounded-full text-xs font-semibold"
                >
                  {submitting ? "Sending..." : `Request Consultation for ${technology.title}`}
                  <ArrowRight className="size-4 ml-1.5" />
                </Button>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3 text-xs text-muted-foreground border-t border-border">
                <a
                  href={`tel:${SITE.SUPPORT_PHONE_TEL}`}
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <Phone className="size-3.5 text-primary" />
                  <span>Call {SITE.SUPPORT_PHONE}</span>
                </a>
                <a
                  href={waTechUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#128C7E] font-medium hover:underline"
                >
                  <MessageCircle className="size-3.5 text-[#25D366]" />
                  <span>Instant WhatsApp Help</span>
                </a>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
