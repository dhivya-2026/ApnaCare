import { useState } from "react";
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
import { Building2, CheckCircle2, ShieldCheck, Mail, Phone, ArrowRight } from "lucide-react";
import { track, sendToGoogleSheet } from "@/lib/analytics";
import { fieldErrors, nameSchema, phoneSchema, optionalEmail } from "@/lib/validation";
import { SITE, CITIES } from "@/data/site";
import type { CatalogueService } from "@/data/serviceCatalogue";

interface BusinessEnquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedService?: CatalogueService | null;
}

export function BusinessEnquiryModal({
  open,
  onOpenChange,
  selectedService,
}: BusinessEnquiryModalProps) {
  const [f, setF] = useState({
    orgName: "",
    contactPerson: "",
    email: "",
    phone: "",
    serviceType: selectedService?.name || "Hospital attendant staffing partnerships",
    city: "Bengaluru",
    estimatedHeadcount: "5-10 attendants",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setVal = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

    if (!f.orgName.trim() || f.orgName.trim().length < 2) {
      newErrors.orgName = "Please enter your organization or hospital name";
    }
    if (!f.contactPerson.trim() || f.contactPerson.trim().length < 2) {
      newErrors.contactPerson = "Please enter contact person name";
    }
    if (!f.phone.trim() || !/^\+?[0-9\s-]{10,14}$/.test(f.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) {
      newErrors.email = "Please enter a valid corporate email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    track("business_enquiry_submitted", {
      orgName: f.orgName,
      serviceType: f.serviceType,
      city: f.city,
    });

    try {
      await sendToGoogleSheet({
        formType: "business_enquiry",
        name: f.contactPerson,
        phone: f.phone,
        email: f.email,
        notes: `Org: ${f.orgName} | Service: ${f.serviceType} | City: ${f.city} | Headcount: ${f.estimatedHeadcount} | Notes: ${f.notes}`,
      });
    } catch (err) {
      // Non-blocking submission
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 rounded-3xl">
        <DialogHeader className="text-left space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1">
              <Building2 className="size-3.5" />
              Institutional & Corporate Partnerships
            </span>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-bold font-display text-foreground">
            Business Care & Staffing Enquiry
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            Partner with ApnaCare for hospital ward attendants, corporate employee caregiving benefits, or safe workforce transit with dedicated SLAs.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="mt-6 text-center py-6 space-y-4 animate-fade-in">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 className="size-10" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Enquiry Successfully Received</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{f.contactPerson}</strong>. Our Institutional Partnerships Lead will review your request for <strong>{f.orgName}</strong> and connect within 4 business hours with custom proposal details.
            </p>
            <div className="p-4 rounded-2xl bg-secondary text-xs text-muted-foreground">
              For urgent institutional hospital requirements, contact our corporate desk directly at{" "}
              <a href={`tel:${SITE.SUPPORT_PHONE_TEL}`} className="font-bold text-primary hover:underline">
                {SITE.SUPPORT_PHONE}
              </a>{" "}
              or email{" "}
              <a href={`mailto:${SITE.EMAIL}`} className="font-bold text-primary hover:underline">
                {SITE.EMAIL}
              </a>.
            </div>
            <Button onClick={resetForm} className="mt-4 w-full">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="orgName">Organization / Hospital Name *</Label>
                <Input
                  id="orgName"
                  value={f.orgName}
                  onChange={setVal("orgName")}
                  placeholder="e.g. Apollo Hospitals / Infosys"
                  className="mt-1 h-11 rounded-xl"
                  aria-invalid={Boolean(errors.orgName)}
                />
                {errors.orgName && <p className="mt-1 text-xs text-destructive">{errors.orgName}</p>}
              </div>

              <div>
                <Label htmlFor="contactPerson">Contact Person & Designation *</Label>
                <Input
                  id="contactPerson"
                  value={f.contactPerson}
                  onChange={setVal("contactPerson")}
                  placeholder="e.g. Dr. Priya Rao (Admin Head)"
                  className="mt-1 h-11 rounded-xl"
                  aria-invalid={Boolean(errors.contactPerson)}
                />
                {errors.contactPerson && (
                  <p className="mt-1 text-xs text-destructive">{errors.contactPerson}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Official Corporate Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={f.email}
                  onChange={setVal("email")}
                  placeholder="partnerships@company.com"
                  className="mt-1 h-11 rounded-xl"
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Direct Mobile / WhatsApp *</Label>
                <Input
                  id="phone"
                  value={f.phone}
                  onChange={setVal("phone")}
                  placeholder="+91 98765 43210"
                  className="mt-1 h-11 rounded-xl"
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="serviceType">Partnership Programme *</Label>
                <select
                  id="serviceType"
                  value={f.serviceType}
                  onChange={setVal("serviceType")}
                  className="mt-1 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm focus:border-primary outline-none"
                >
                  <option value="Hospital attendant staffing partnerships">Hospital Attendant Staffing</option>
                  <option value="Employee caregiving support">Employee Caregiving Benefits</option>
                  <option value="Corporate travel assistance">Corporate Travel & Executive Transit</option>
                  <option value="Women employee commute programmes">Women Employee Commute Programmes</option>
                  <option value="Institutional care partnerships">Institutional Care Partnerships</option>
                  <option value="Bulk service bookings">Bulk Service Bookings</option>
                  <option value="Referral partnerships">Clinical Referral Partnership</option>
                </select>
              </div>

              <div>
                <Label htmlFor="city">Primary City / Hub *</Label>
                <select
                  id="city"
                  value={f.city}
                  onChange={setVal("city")}
                  className="mt-1 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm focus:border-primary outline-none"
                >
                  {CITIES.map((c) => (
                    <option key={c.slug} value={c.name}>
                      {c.name} ({c.state})
                    </option>
                  ))}
                  <option value="Pan-India Multi-City">Pan-India Multi-City</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="estimatedHeadcount">Estimated Requirement / Scale</Label>
              <select
                id="estimatedHeadcount"
                value={f.estimatedHeadcount}
                onChange={setVal("estimatedHeadcount")}
                className="mt-1 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm focus:border-primary outline-none"
              >
                <option value="1-4 attendants (Pilot)">1-4 attendants (Pilot)</option>
                <option value="5-15 attendants (Departmental)">5-15 attendants (Departmental)</option>
                <option value="16-50 attendants (Full Facility)">16-50 attendants (Full Facility)</option>
                <option value="50+ enterprise workforce">50+ Enterprise Workforce</option>
              </select>
            </div>

            <div>
              <Label htmlFor="notes">Additional Scope, Shifts or Specific Requirements</Label>
              <Textarea
                id="notes"
                value={f.notes}
                onChange={setVal("notes")}
                placeholder="Mention shift timings (day/night), special patient protocols, or expected start timeline..."
                className="mt-1 rounded-xl text-sm"
                rows={3}
              />
            </div>

            <div className="rounded-xl border border-border/80 bg-secondary/40 p-3 text-xs text-muted-foreground flex items-center gap-2.5">
              <ShieldCheck className="size-4 shrink-0 text-primary" />
              <span>
                All institutional attendants are covered under statutory labor compliance, biometric tracking, and police background clearance.
              </span>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              variant="warm"
              className="w-full h-12 text-base font-semibold"
            >
              {submitting ? "Submitting Partnership Enquiry..." : "Submit Business Enquiry"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
