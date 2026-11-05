import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Users, UserPlus, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { CITIES } from "@/data/site";

export const Route = createFileRoute("/register/user")({
  head: () =>
    seo(
      "Create User Account — ApnaCare",
      "Register for an ApnaCare customer account to book and manage personalized in-home and hospital care.",
      { canonical: "https://apna-care.vercel.app/register/user" }
    ),
  component: UserRegisterPage,
});

function UserRegisterPage() {
  const navigate = useNavigate();
  const { refreshSession } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Bengaluru");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!agreeTerms) {
      setError("Please accept the Terms of Service and Privacy Policy to continue.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email,
          phone,
          city,
          address,
          password,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || !data.success) {
        setError(data.error || "Registration failed. Please try again.");
        toast.error(data.error || "Registration failed");
        return;
      }

      await refreshSession();
      toast.success("Account created successfully! Welcome to ApnaCare.");
      navigate({ to: "/dashboard/user" as any });
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Network error. Please try again.");
    }
  };

  return (
    <div className="container-page py-16 md:py-24 max-w-lg mx-auto">
      <div className="card-soft p-8 space-y-6 shadow-lift border-border">
        <div className="text-center space-y-2">
          <div className="size-12 rounded-2xl bg-primary-soft text-primary grid place-items-center mx-auto">
            <Users className="size-6" />
          </div>
          <h1 className="text-2xl font-display font-semibold text-foreground">Create User Account</h1>
          <p className="text-xs text-muted-foreground">
            Sign up to book verified Saha attendants and manage care schedules for your family.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-start gap-2.5">
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-semibold">Full Name *</Label>
            <Input
              id="name"
              placeholder="e.g. Ramesh Kumar"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="min-h-[44px]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="ramesh@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="city" className="text-xs font-semibold">City *</Label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full min-h-[44px] rounded-xl border border-input bg-card px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {CITIES.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="address" className="text-xs font-semibold">Area / Neighborhood</Label>
              <Input
                id="address"
                placeholder="e.g. Indiranagar"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="min-h-[44px]"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-semibold">Password *</Label>
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

          <div className="pt-2 flex items-start gap-2 text-xs">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 rounded border-gray-300 text-primary focus:ring-primary"
              required
            />
            <label htmlFor="terms" className="text-muted-foreground leading-snug">
              I accept ApnaCare's{" "}
              <Link to="/terms" target="_blank" className="text-primary underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" target="_blank" className="text-primary underline">
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          <Button type="submit" variant="warm" className="w-full min-h-[46px] font-semibold" disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <UserPlus className="size-4 mr-2" />}
            {loading ? "Creating your account..." : "Complete Registration"}
          </Button>
        </form>

        <div className="pt-4 border-t border-border text-center text-xs text-muted-foreground">
          Already registered?{" "}
          <Link to="/login/user" className="font-semibold text-primary hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
