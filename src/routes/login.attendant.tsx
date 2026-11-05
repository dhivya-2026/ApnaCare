import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { HeartHandshake, LogIn, Loader2, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/login/attendant")({
  head: () =>
    seo(
      "Saha Attendant Login — ApnaCare",
      "Sign in to your ApnaCare Saha attendant portal to view care assignments, check in for shifts, and update availability.",
      { canonical: "https://apna-care.vercel.app/login/attendant" }
    ),
  component: AttendantLoginPage,
});

function AttendantLoginPage() {
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setLoading(true);
    const res = await login({ email, password, role: "attendant" });
    setLoading(false);

    if (res.success) {
      toast.success("Welcome back, Saha companion! Redirecting...");
      navigate({ to: (res.redirectUrl || "/dashboard/attendant") as any });
    } else {
      setError(res.error || "Login failed. Check your email or phone number.");
      toast.error(res.error || "Login failed");
    }
  };

  return (
    <div className="container-page py-16 md:py-24 max-w-md mx-auto">
      <div className="card-soft p-8 space-y-6 shadow-lift border-border">
        <div className="text-center space-y-2">
          <div className="size-12 rounded-2xl bg-emerald-500/10 text-emerald-600 grid place-items-center mx-auto">
            <HeartHandshake className="size-6" />
          </div>
          <h1 className="text-2xl font-display font-semibold text-foreground">Saha Attendant Login</h1>
          <p className="text-xs text-muted-foreground">
            Sign in to manage your shift assignments, record attendance, and update availability.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-start gap-2.5">
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

                {/* Demo Test Credentials Card */}
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-emerald-700">Verified Saha Attendant:</span>
            <button
              type="button"
              onClick={() => {
                setEmail("lakshmi.saha@apnacare.in");
                setPassword("SahaPass@2026!");
              }}
              className="text-[11px] font-bold text-emerald-700 underline hover:text-emerald-800 transition-colors"
            >
              Auto-Fill
            </button>
          </div>
          <p className="font-mono text-[11px] text-muted-foreground">
            lakshmi.saha@apnacare.in &bull; SahaPass@2026!
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-emerald-500/20">
            <span className="font-semibold text-amber-700">Pending Approval Saha:</span>
            <button
              type="button"
              onClick={() => {
                setEmail("kavitha.saha@apnacare.in");
                setPassword("SahaPass@2026!");
              }}
              className="text-[11px] font-bold text-amber-700 underline hover:text-amber-800 transition-colors"
            >
              Auto-Fill
            </button>
          </div>
          <p className="font-mono text-[11px] text-muted-foreground">
            kavitha.saha@apnacare.in &bull; SahaPass@2026!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-semibold">Registered Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="saha@apnacare.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="min-h-[44px]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs font-semibold">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="min-h-[44px]"
            />
          </div>

          <Button type="submit" className="w-full min-h-[46px] font-semibold bg-emerald-700 hover:bg-emerald-800 text-white" disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <LogIn className="size-4 mr-2" />}
            {loading ? "Verifying credentials..." : "Sign In to Saha Portal"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const res = loginAsDemo("attendant");
              navigate({ to: res.redirectUrl as any });
            }}
            className="w-full min-h-[44px] font-semibold border-emerald-500/30 text-emerald-700 hover:bg-emerald-500/10"
          >
            ⚡ View Demo Saha Portal (Instant Preview) &rarr;
          </Button>
        </form>

        <div className="pt-4 border-t border-border text-center space-y-2 text-xs text-muted-foreground">
          <p>
            New care attendant or nurse?{" "}
            <Link to="/register/attendant" className="font-semibold text-emerald-700 hover:underline">
              Register as a Saha
            </Link>
          </p>
          <p>
            <Link to="/login" className="text-[11px] hover:underline">
              ← Return to all portal choices
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
