import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  ArrowRight,
  FileCheck,
  Sparkles,
  MapPin,
  Clock,
} from "lucide-react";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/saha/register")({
  head: () =>
    seo("Apply as a Saha Care Companion — ApnaCare", "Join South India's trusted women care team. Fair remuneration, training, and dignified work.", {
      noindex: true,
    }),
  component: SahaRegisterPage,
});

const CITIES = ["Bengaluru", "Chennai", "Hyderabad", "Coimbatore", "Mysore", "Kochi", "Other"];

const CAPABILITIES = [
  "Elder Care & Geriatric Support",
  "New Mother & Baby (Japa)",
  "Hospital Bedside Assistance",
  "Post-Stroke / Parkinson's Care",
  "Palliative & Immobility Care",
  "Assisted Travel & Accompaniement",
  "Women Driver / Transport",
];

const QUALIFICATIONS = [
  "ANM (Auxiliary Nurse Midwife)",
  "GNM (General Nursing & Midwifery)",
  "B.Sc Nursing",
  "Certified Geriatric Caregiver",
  "Experienced Home Care Attendant",
  "Other Healthcare Certificate",
];

function SahaRegisterPage() {
  const { register: registerAuth } = useAuth();
  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    // Step 1: Personal
    fullName: "",
    email: "",
    phone: "",
    city: "Bengaluru",
    password: "",
    confirmPassword: "",
    // Step 2: Professional
    qualifications: "Certified Geriatric Caregiver",
    experience: "3+ Years",
    languagesSpoken: ["Kannada", "English", "Tamil"],
    // Step 3: Capabilities
    serviceCapabilities: ["Elder Care & Geriatric Support", "Hospital Bedside Assistance"] as string[],
    // Step 4: Verification & Docs
    aadhaarRef: "",
    previousAgency: "",
    agreeBackgroundCheck: true,
  });

  const toggleCapability = (cap: string) => {
    setFormData((prev) => {
      const exists = prev.serviceCapabilities.includes(cap);
      return {
        ...prev,
        serviceCapabilities: exists
          ? prev.serviceCapabilities.filter((c) => c !== cap)
          : [...prev.serviceCapabilities, cap],
      };
    });
  };

  const handleNext = () => {
    setError(null);
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
        setError("Please fill in all personal details.");
        return;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }
    if (step === 3 && formData.serviceCapabilities.length === 0) {
      setError("Please select at least one care capability.");
      return;
    }
    setStep((s) => s + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.agreeBackgroundCheck) {
      setError("Please consent to the clinical & background verification.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await registerAuth({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        password: formData.password,
        role: "SAHA",
        qualifications: formData.qualifications,
        experience: formData.experience,
        serviceCapabilities: formData.serviceCapabilities,
        languagesSpoken: formData.languagesSpoken,
        documentRefs: JSON.stringify({
          aadhaarRef: formData.aadhaarRef || "Reference Provided",
          previousAgency: formData.previousAgency,
        }),
      });

      if (res.success) {
        setIsSubmitted(true);
      } else {
        setError(res.error || "Submission failed. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred during registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 bg-gradient-to-b from-emerald-500/10 to-background">
        <div className="max-w-md w-full bg-card border border-border rounded-3xl p-8 text-center shadow-soft">
          <div className="size-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-4">
            <CheckCircle2 className="size-9" />
          </div>
          <h1 className="text-2xl font-serif font-semibold text-foreground">Application Received</h1>
          <div className="inline-block px-3 py-1 my-3 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
            Status: Pending Operations Review
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-6">
            Thank you for applying to join ApnaCare. Our South India Care Operations team verifies credentials and Aadhaar within 48 hours. A coordinator will reach out to you on <strong>{formData.phone}</strong>.
          </p>
          <div className="p-4 rounded-2xl bg-secondary/30 text-xs text-muted-foreground text-left space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-3.5 text-emerald-600" /> Profile created in verified Saha candidate pool
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-3.5 text-emerald-600" /> Background & Aadhaar verification initiated
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-3.5 text-emerald-600" /> Regional coordinator assigned: Bengaluru / South
            </div>
          </div>
          <Button asChild className="w-full bg-[#2D5016] hover:bg-[#233f11] text-white rounded-xl">
            <Link to="/saha/login">
              <span>Go to Saha Login</span>
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-500/5 via-secondary/20 to-background">
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <Link
            to="/saha/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Saha Login</span>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Step {step} of 4</span>
              <h1 className="font-serif text-2xl font-semibold text-foreground">Join as a Verified Saha</h1>
            </div>
            <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              {step}/4
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-secondary h-1.5 rounded-full mb-6 overflow-hidden">
            <div
              className="bg-[#2D5016] h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-start gap-2.5">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Details */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="saha-name" className="text-xs font-medium">Full Name (as per Aadhaar)</Label>
                  <Input
                    id="saha-name"
                    required
                    placeholder="e.g. Sunitha Devi"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="rounded-xl mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="saha-email" className="text-xs font-medium">Email Address</Label>
                  <Input
                    id="saha-email"
                    type="email"
                    required
                    placeholder="sunitha@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="rounded-xl mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="saha-phone" className="text-xs font-medium">WhatsApp / Mobile</Label>
                    <Input
                      id="saha-phone"
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="rounded-xl mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="saha-city" className="text-xs font-medium">Operating City</Label>
                    <select
                      id="saha-city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full h-10 rounded-xl border border-input bg-background px-3 text-xs mt-1"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="saha-pass" className="text-xs font-medium">Create Password</Label>
                    <Input
                      id="saha-pass"
                      type="password"
                      required
                      placeholder="Min 6 chars"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="rounded-xl mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="saha-cpass" className="text-xs font-medium">Confirm Password</Label>
                    <Input
                      id="saha-cpass"
                      type="password"
                      required
                      placeholder="Confirm"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="rounded-xl mt-1"
                    />
                  </div>
                </div>

                <Button type="button" onClick={handleNext} className="w-full bg-[#2D5016] hover:bg-[#233f11] text-white rounded-xl py-5 mt-2">
                  <span>Continue to Qualifications</span>
                  <ArrowRight className="size-4 ml-1.5" />
                </Button>
              </div>
            )}

            {/* Step 2: Qualifications & Experience */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="qual" className="text-xs font-medium">Primary Qualification</Label>
                  <select
                    id="qual"
                    value={formData.qualifications}
                    onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                    className="w-full h-10 rounded-xl border border-input bg-background px-3 text-xs mt-1"
                  >
                    {QUALIFICATIONS.map((q) => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="exp" className="text-xs font-medium">Caregiving Experience</Label>
                  <select
                    id="exp"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full h-10 rounded-xl border border-input bg-background px-3 text-xs mt-1"
                  >
                    <option value="1-2 Years">1 - 2 Years</option>
                    <option value="3-5 Years">3 - 5 Years</option>
                    <option value="5-10 Years">5 - 10 Years</option>
                    <option value="10+ Years">10+ Years</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="agency" className="text-xs font-medium">Previous Hospital or Agency (Optional)</Label>
                  <Input
                    id="agency"
                    placeholder="e.g. Manipal Hospital, Portea, Private home care"
                    value={formData.previousAgency}
                    onChange={(e) => setFormData({ ...formData, previousAgency: e.target.value })}
                    className="rounded-xl mt-1"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="rounded-xl">
                    Back
                  </Button>
                  <Button type="button" onClick={handleNext} className="flex-1 bg-[#2D5016] hover:bg-[#233f11] text-white rounded-xl">
                    <span>Next: Care Capabilities</span>
                    <ArrowRight className="size-4 ml-1.5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Care Capabilities */}
            {step === 3 && (
              <div className="space-y-4">
                <p className="text-xs text-muted-foreground">
                  Select all services you are trained or comfortable providing:
                </p>

                <div className="space-y-2.5">
                  {CAPABILITIES.map((cap) => {
                    const selected = formData.serviceCapabilities.includes(cap);
                    return (
                      <div
                        key={cap}
                        onClick={() => toggleCapability(cap)}
                        className={`p-3 rounded-2xl border cursor-pointer text-xs flex items-center justify-between transition-colors ${
                          selected
                            ? "bg-[#2D5016]/10 border-[#2D5016] text-[#2D5016] font-semibold"
                            : "bg-background border-border text-foreground hover:bg-secondary/40"
                        }`}
                      >
                        <span>{cap}</span>
                        {selected && <CheckCircle2 className="size-4 text-[#2D5016]" />}
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="rounded-xl">
                    Back
                  </Button>
                  <Button type="button" onClick={handleNext} className="flex-1 bg-[#2D5016] hover:bg-[#233f11] text-white rounded-xl">
                    <span>Next: Identification</span>
                    <ArrowRight className="size-4 ml-1.5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Verification & Consent */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="aadhaar" className="text-xs font-medium">Aadhaar Last 4 Digits or Reference</Label>
                  <Input
                    id="aadhaar"
                    placeholder="e.g. 5678 (for background verification)"
                    value={formData.aadhaarRef}
                    onChange={(e) => setFormData({ ...formData, aadhaarRef: e.target.value })}
                    className="rounded-xl mt-1"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Your full physical Aadhaar card will be verified in-person by an ApnaCare field manager.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-secondary/40 border border-border text-xs text-muted-foreground space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <ShieldCheck className="size-4 text-[#2D5016]" />
                    <span>ApnaCare Verification Standards</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    By submitting, you consent to criminal background checks, address verification, and emergency protocol orientation.
                  </p>
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    id="agreeCheck"
                    type="checkbox"
                    checked={formData.agreeBackgroundCheck}
                    onChange={(e) => setFormData({ ...formData, agreeBackgroundCheck: e.target.checked })}
                    className="mt-0.5 rounded border-border text-[#2D5016] focus:ring-[#2D5016]"
                  />
                  <Label htmlFor="agreeCheck" className="text-[11px] text-muted-foreground leading-tight cursor-pointer">
                    I confirm that all information provided is accurate and consent to verification by ApnaCare operations.
                  </Label>
                </div>

                <div className="flex gap-3 pt-3">
                  <Button type="button" variant="outline" onClick={() => setStep(3)} className="rounded-xl">
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#2D5016] hover:bg-[#233f11] text-white rounded-xl py-5 font-semibold shadow-soft"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin mr-2" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <span>Submit Saha Application</span>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

