/**
 * /customer/register — New customer registration
 */

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Heart, ArrowLeft, Loader2, Check, X as XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/customer/register")({
  component: CustomerRegisterPage,
});

const CITIES = ["Bengaluru", "Chennai", "Hyderabad", "Coimbatore", "Other"];
const LANGS = ["English", "Tamil", "Telugu", "Kannada", "Malayalam", "Hindi"];

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "At least 8 characters", pass: password.length >= 8 },
    { label: "Contains a number", pass: /\d/.test(password) },
    { label: "Contains uppercase", pass: /[A-Z]/.test(password) },
    { label: "Contains special character", pass: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter(c => c.pass).length;
  const colors = ["bg-destructive", "bg-orange-400", "bg-yellow-400", "bg-emerald-500", "bg-emerald-600"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  if (!password) return null;
  return (
    <div className="space-y-2 mt-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < score ? colors[score] : "bg-muted"}`} />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{labels[score]}</p>
      <div className="grid grid-cols-2 gap-1">
        {checks.map(c => (
          <div key={c.label} className={`flex items-center gap-1 text-xs ${c.pass ? "text-emerald-600" : "text-muted-foreground"}`}>
            {c.pass ? <Check className="size-3" /> : <XIcon className="size-3" />}
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomerRegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "",
    password: "", confirm_password: "",
    city: "Bengaluru", preferred_language: "English",
    terms: false,
  });
  const [error, setError] = useState<string | null>(null);

  function f(k: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ""))) {
      return setError("Please enter a valid 10-digit Indian mobile number.");
    }
    if (form.password !== form.confirm_password) {
      return setError("Passwords do not match.");
    }
    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters.");
    }
    if (!form.terms) {
      return setError("Please accept the terms and conditions.");
    }

    const result = await register({
      full_name: form.full_name,
      email: form.email,
      phone: form.phone.replace(/\s/g, ""),
      password: form.password,
      role: "CUSTOMER",
      city: form.city,
      preferred_language: form.preferred_language,
    });

    if (result.success) {
      toast.success("Account created! Welcome to ApnaCare.");
      navigate({ to: "/customer/dashboard" });
    } else {
      setError(result.error || "Registration failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F4EF] to-[#EEF6F3] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="size-4" /> All portals
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-border p-8">
          <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <Heart className="size-7 text-primary" />
          </div>

          <h1 className="font-display text-2xl font-bold text-foreground mb-1">Create Family Account</h1>
          <p className="text-sm text-muted-foreground mb-8">Join ApnaCare to access verified care services across South India.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="full_name">Full name</Label>
              <Input id="full_name" placeholder="Your full name" value={form.full_name} onChange={f("full_name")} required className="h-11 rounded-xl" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={form.email} onChange={f("email")} required className="h-11 rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Mobile number</Label>
                <Input id="phone" type="tel" placeholder="98765 43210" value={form.phone} onChange={f("phone")} required className="h-11 rounded-xl" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="city">City</Label>
                <select id="city" value={form.city} onChange={f("city")} className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lang">Preferred language</Label>
                <select id="lang" value={form.preferred_language} onChange={f("preferred_language")} className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {LANGS.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={f("password")}
                  required
                  className="h-11 rounded-xl pr-10"
                />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              <PasswordStrength password={form.password} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirm_password">Confirm password</Label>
              <Input
                id="confirm_password"
                type={showPw ? "text" : "password"}
                placeholder="Repeat your password"
                value={form.confirm_password}
                onChange={f("confirm_password")}
                required
                className="h-11 rounded-xl"
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={form.terms} onChange={f("terms")} className="mt-0.5 size-4 rounded border-border" />
              <span className="text-sm text-muted-foreground">
                I agree to ApnaCare's{" "}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </span>
            </label>

            {error && (
              <div className="rounded-xl bg-destructive/10 text-destructive text-sm px-4 py-3 border border-destructive/20">
                {error}
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full h-11 rounded-xl font-semibold">
              {isLoading ? <><Loader2 className="size-4 mr-2 animate-spin" /> Creating account…</> : "Create account"}
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/customer/login" className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

