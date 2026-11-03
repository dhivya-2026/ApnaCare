/**
 * /saha/register — Saha / Caregiver application form
 */

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { UserCheck, ArrowLeft, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/saha/register")({
  component: SahaRegisterPage,
});

const CITIES = ["Bengaluru", "Chennai", "Hyderabad", "Coimbatore", "Other"];
const LANGS = ["Tamil", "Telugu", "Kannada", "Malayalam", "Hindi", "English"];

const CAPABILITIES = [
  { id: "elder_care", label: "Elder Care", emoji: "👴" },
  { id: "hospital_assistance", label: "Hospital Assistance", emoji: "🏥" },
  { id: "post_natal", label: "Post-Natal / Japa Care", emoji: "🤱" },
  { id: "child_care", label: "Nanny & Childcare", emoji: "👶" },
  { id: "assisted_travel", label: "Assisted Travel", emoji: "✈️" },
  { id: "specialised_daily", label: "Specialised Daily Support", emoji: "🛡️" },
  { id: "clinical_nursing", label: "Clinical Nursing (GNM/B.Sc)", emoji: "💉" },
  { id: "home_care", label: "Home Care Support", emoji: "🏠" },
  { id: "women_drivers", label: "Women Drivers", emoji: "🚗" },
];

const SHIFTS = ["Morning (6am–2pm)", "Afternoon (2pm–10pm)", "Night (10pm–6am)", "Full Day (Live-In)"];

function SahaRegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "",
    password: "", city: "Bengaluru", preferred_language: "Tamil",
    years_experience: "", education: "",
    capabilities: [] as string[],
    preferred_shifts: [] as string[],
    terms: false,
  });
  const [error, setError] = useState<string | null>(null);

  function f(k: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));
  }

  function toggleCap(id: string) {
    setForm(prev => ({
      ...prev,
      capabilities: prev.capabilities.includes(id) ? prev.capabilities.filter(c => c !== id) : [...prev.capabilities, id],
    }));
  }

  function toggleShift(s: string) {
    setForm(prev => ({
      ...prev,
      preferred_shifts: prev.preferred_shifts.includes(s) ? prev.preferred_shifts.filter(x => x !== s) : [...prev.preferred_shifts, s],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) return setError("Please enter a valid 10-digit Indian mobile number.");
    if (form.capabilities.length === 0) return setError("Please select at least one service capability.");
    if (!form.terms) return setError("Please accept the terms and conditions.");

    const result = await register({
      full_name: form.full_name,
      email: form.email,
      phone: form.phone.replace(/\s/g, ""),
      password: form.password,
      role: "SAHA",
      city: form.city,
      preferred_language: form.preferred_language,
    });

    if (result.success) {
      toast.success("Application submitted! We'll review and contact you soon.");
      navigate({ to: "/saha/dashboard" });
    } else {
      setError(result.error || "Application failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-[#EEF6F3] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="size-4" /> All portals
        </Link>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`size-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${s <= step ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"}`}>
                {s < step ? <Check className="size-4" /> : s}
              </div>
              {s < 3 && <div className={`h-0.5 w-12 transition-colors ${s < step ? "bg-emerald-600" : "bg-muted"}`} />}
            </div>
          ))}
          <span className="ml-2 text-sm text-muted-foreground">Step {step} of 3</span>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-border p-8">
          <div className="size-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6">
            <UserCheck className="size-7 text-emerald-600" />
          </div>

          {step === 1 && (
            <>
              <h1 className="font-display text-2xl font-bold text-foreground mb-1">Personal Information</h1>
              <p className="text-sm text-muted-foreground mb-8">Tell us about yourself so we can create your Saha profile.</p>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="full_name">Full name</Label>
                  <Input id="full_name" placeholder="Your full name" value={form.full_name} onChange={f("full_name")} required className="h-11 rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" value={form.email} onChange={f("email")} required className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Mobile</Label>
                    <Input id="phone" type="tel" placeholder="98765 43210" value={form.phone} onChange={f("phone")} required className="h-11 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Min. 8 characters" value={form.password} onChange={f("password")} required className="h-11 rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="city">Your city</Label>
                    <select id="city" value={form.city} onChange={f("city")} className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm">
                      {CITIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lang">Primary language</Label>
                    <select id="lang" value={form.preferred_language} onChange={f("preferred_language")} className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm">
                      {LANGS.map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
                <Button type="button" onClick={() => setStep(2)} disabled={!form.full_name || !form.email || !form.phone || !form.password} className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                  Next: Professional Info
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="font-display text-2xl font-bold text-foreground mb-1">Professional Details</h1>
              <p className="text-sm text-muted-foreground mb-8">Select the care services you can provide.</p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="exp">Years of experience</Label>
                    <Input id="exp" type="number" min="0" max="40" placeholder="e.g. 3" value={form.years_experience} onChange={f("years_experience")} className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="edu">Highest education</Label>
                    <Input id="edu" placeholder="e.g. GNM, B.Sc Nursing" value={form.education} onChange={f("education")} className="h-11 rounded-xl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Service capabilities <span className="text-muted-foreground text-xs">(select all that apply)</span></Label>
                  <div className="grid grid-cols-1 gap-2">
                    {CAPABILITIES.map(cap => (
                      <label key={cap.id} className={`flex items-center gap-3 rounded-xl border-2 p-3 cursor-pointer transition-colors ${form.capabilities.includes(cap.id) ? "border-emerald-500 bg-emerald-50" : "border-border hover:border-muted-foreground/30"}`}>
                        <input type="checkbox" checked={form.capabilities.includes(cap.id)} onChange={() => toggleCap(cap.id)} className="sr-only" />
                        <span className="text-lg">{cap.emoji}</span>
                        <span className="text-sm font-medium">{cap.label}</span>
                        {form.capabilities.includes(cap.id) && <Check className="size-4 text-emerald-600 ml-auto" />}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Preferred shift times</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {SHIFTS.map(s => (
                      <label key={s} className={`flex items-center gap-2 rounded-xl border-2 p-3 cursor-pointer transition-colors text-sm ${form.preferred_shifts.includes(s) ? "border-emerald-500 bg-emerald-50" : "border-border hover:border-muted-foreground/30"}`}>
                        <input type="checkbox" checked={form.preferred_shifts.includes(s)} onChange={() => toggleShift(s)} className="sr-only" />
                        {s}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 h-11 rounded-xl">Back</Button>
                  <Button type="button" onClick={() => setStep(3)} disabled={form.capabilities.length === 0} className="flex-1 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">Next: Review</Button>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <h1 className="font-display text-2xl font-bold text-foreground mb-1">Review & Submit</h1>
              <p className="text-sm text-muted-foreground mb-8">Review your application before submitting.</p>
              <div className="space-y-4">
                {/* Summary */}
                <div className="rounded-2xl bg-muted/40 p-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{form.full_name}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="font-medium">{form.email}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Mobile</span><span className="font-medium">{form.phone}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">City</span><span className="font-medium">{form.city}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Capabilities</span><span className="font-medium text-right">{form.capabilities.length} selected</span></div>
                </div>

                {/* Document upload note */}
                <div className="rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm px-4 py-3">
                  📎 After registration, our coordinator will contact you to collect verification documents (Aadhaar, training certificates, police clearance).
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.terms} onChange={f("terms")} className="mt-0.5 size-4 rounded border-border" />
                  <span className="text-sm text-muted-foreground">
                    I agree to ApnaCare's{" "}
                    <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>,{" "}
                    <Link to="/safety-guidelines" className="text-primary hover:underline">Safety Guidelines</Link>, and
                    consent to background verification.
                  </span>
                </label>

                {error && <div className="rounded-xl bg-destructive/10 text-destructive text-sm px-4 py-3 border border-destructive/20">{error}</div>}

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 h-11 rounded-xl">Back</Button>
                  <Button type="submit" disabled={isLoading || !form.terms} className="flex-1 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                    {isLoading ? <><Loader2 className="size-4 mr-2 animate-spin" /> Submitting…</> : "Submit Application"}
                  </Button>
                </div>
              </div>
            </form>
          )}

          <p className="text-sm text-center text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/saha/login" className="text-emerald-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

