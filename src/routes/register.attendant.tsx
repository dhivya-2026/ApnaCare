import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { HeartHandshake, UserPlus, Loader2, AlertCircle, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { CITIES } from "@/data/site";

export const Route = createFileRoute("/register/attendant")({
  head: () =>
    seo(
      "Join ApnaCare as a Saha Care Attendant — Dignified Livelihoods",
      "Apply to become a verified ApnaCare Saha care companion or clinical nurse with fair daily wages and professional supervision across South India.",
      { canonical: "https://apna-care.vercel.app/register/attendant" }
    ),
  component: AttendantRegisterPage,
});

const SKILL_OPTIONS = [
  "Elderly Care & Mobility Aid",
  "Hospital Bedside Assistance",
  "Post-Surgical Convalescence",
  "Hygiene, Bathing & Sponge",
  "Vital Signs Recording (BP/Pulse/SpO2)",
  "Fourth Trimester / Japa Mother Care",
  "Infant Oil Massage & Bathing",
  "Catheter & Ryle's Tube Care",
  "Dementia & Alzheimer's Companion",
];

const LANGUAGE_OPTIONS = ["Tamil", "Kannada", "Telugu", "Hindi", "Malayalam", "English"];

function AttendantRegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<"female" | "male" | "other">("female");
  const [city, setCity] = useState("Bengaluru");
  const [address, setAddress] = useState("");
  const [qualifications, setQualifications] = useState("Certified General Duty Attendant (GDA)");
  const [experience, setExperience] = useState("3+ years eldercare & patient bedside aid");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "Elderly Care & Mobility Aid",
    "Hygiene, Bathing & Sponge",
  ]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["Kannada", "English"]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (selectedSkills.length === 0) {
      setError("Please select at least one care skill.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register-attendant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email,
          phone,
          gender,
          city,
          address,
          qualifications,
          experience,
          skills: selectedSkills,
          languages: selectedLanguages,
          password,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || !data.success) {
        setError(data.error || "Registration submission failed.");
        toast.error(data.error || "Submission failed");
        return;
      }

      setSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Network error. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="container-page py-16 md:py-24 max-w-lg mx-auto">
        <div className="card-soft p-8 text-center space-y-6 shadow-lift border-border">
          <div className="size-16 rounded-full bg-emerald-500/15 text-emerald-600 grid place-items-center mx-auto">
            <CheckCircle2 className="size-8" />
          </div>
          <h1 className="text-2xl font-display font-semibold text-foreground">
            Application Received
          </h1>
          <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 space-y-2 text-xs text-muted-foreground text-left">
            <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
              <Clock className="size-4 text-primary" />
              Status: Awaiting Verification
            </div>
            <p className="leading-relaxed">
              Thank you for applying to join ApnaCare as a Saha care attendant. In accordance with
              clinical safety standards, all attendant profiles undergo Aadhaar and background
              verification before receiving assignment dispatch permissions.
            </p>
            <p className="leading-relaxed">
              Our regional care coordination desk in <strong>{city}</strong> will contact you via phone
              at <strong>{phone}</strong> within 24 to 48 hours.
            </p>
          </div>

          <Button asChild variant="warm" className="w-full">
            <Link to="/login/attendant">Return to Saha Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-16 md:py-24 max-w-2xl mx-auto">
      <div className="card-soft p-8 space-y-6 shadow-lift border-border">
        <div className="text-center space-y-2">
          <div className="size-12 rounded-2xl bg-emerald-500/10 text-emerald-600 grid place-items-center mx-auto">
            <HeartHandshake className="size-6" />
          </div>
          <h1 className="text-2xl font-display font-semibold text-foreground">Register as a Saha Attendant</h1>
          <p className="text-xs text-muted-foreground">
            Join South India's trusted care ecosystem with fair daily wages, direct bank transfers, and respectful working conditions.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-start gap-2.5">
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-semibold">Full Legal Name *</Label>
              <Input
                id="name"
                placeholder="As per Aadhaar Card"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="min-h-[44px]"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-semibold">Mobile Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98450 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="min-h-[44px]"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="saha@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="min-h-[44px]"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="gender" className="text-xs font-semibold">Gender *</Label>
              <select
                id="gender"
                value={gender}
                onChange={(e: any) => setGender(e.target.value)}
                className="w-full min-h-[44px] rounded-xl border border-input bg-card px-3 text-xs font-medium"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="city" className="text-xs font-semibold">Operating City *</Label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full min-h-[44px] rounded-xl border border-input bg-card px-3 text-xs font-medium"
              >
                {CITIES.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address" className="text-xs font-semibold">Local Address / Residence *</Label>
            <Input
              id="address"
              placeholder="Locality, Landmark, City"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="min-h-[44px]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="qual" className="text-xs font-semibold">Qualifications / Training</Label>
              <Input
                id="qual"
                value={qualifications}
                onChange={(e) => setQualifications(e.target.value)}
                className="min-h-[44px]"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="exp" className="text-xs font-semibold">Years of Experience</Label>
              <Input
                id="exp"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="min-h-[44px]"
              />
            </div>
          </div>

          {/* Skills checklist */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold">Core Care Skills & Capabilities</Label>
            <div className="grid gap-2 sm:grid-cols-2">
              {SKILL_OPTIONS.map((skill) => {
                const selected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs text-left transition-all ${
                      selected
                        ? "bg-emerald-500/10 border-emerald-500/40 text-foreground font-semibold"
                        : "bg-card border-border text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    <CheckCircle2
                      className={`size-4 shrink-0 ${selected ? "text-emerald-600" : "text-muted"}`}
                    />
                    <span>{skill}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold">Languages Spoken</Label>
            <div className="flex flex-wrap gap-2">
              {LANGUAGE_OPTIONS.map((lang) => {
                const selected = selectedLanguages.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleLanguage(lang)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      selected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary text-foreground border-border hover:bg-secondary/80"
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-border">
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-semibold">Create Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 8 chars"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="min-h-[44px]"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-xs font-semibold">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="min-h-[44px]"
              />
            </div>
          </div>

          <Button type="submit" className="w-full min-h-[46px] font-semibold bg-emerald-700 hover:bg-emerald-800 text-white" disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <UserPlus className="size-4 mr-2" />}
            {loading ? "Submitting application..." : "Submit Saha Application for Verification"}
          </Button>
        </form>

        <div className="pt-4 border-t border-border text-center text-xs text-muted-foreground">
          Already registered?{" "}
          <Link to="/login/attendant" className="font-semibold text-emerald-700 hover:underline">
            Sign in to Saha Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
