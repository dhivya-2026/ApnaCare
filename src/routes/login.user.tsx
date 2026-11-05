import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Users, LogIn, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/login/user")({
  head: () =>
    seo(
      "Customer Login — ApnaCare",
      "Sign in to your ApnaCare customer account to view your bookings, care team, and service schedules.",
      { canonical: "https://apna-care.vercel.app/login/user" }
    ),
  component: UserLoginPage,
});

function UserLoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    const res = await login({ email, password, role: "user" });
    setLoading(false);

    if (res.success) {
      toast.success("Welcome back! Redirecting to your dashboard...");
      navigate({ to: (res.redirectUrl || "/dashboard/user") as any });
    } else {
      setError(res.error || "Login failed. Please check your credentials.");
      toast.error(res.error || "Login failed");
    }
  };

  return (
    <div className="container-page py-16 md:py-24 max-w-md mx-auto">
      <div className="card-soft p-8 space-y-6 shadow-lift border-border">
        <div className="text-center space-y-2">
          <div className="size-12 rounded-2xl bg-primary-soft text-primary grid place-items-center mx-auto">
            <Users className="size-6" />
          </div>
          <h1 className="text-2xl font-display font-semibold text-foreground">User Login</h1>
          <p className="text-xs text-muted-foreground">
            Sign in to access your family's care plans, schedules, and active bookings.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-start gap-2.5">
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

                {/* Demo Test Credentials Card */}
        <div className="rounded-xl border border-primary/20 bg-primary-soft/40 p-3 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-primary">Demo User Credentials:</span>
            <button
              type="button"
              onClick={() => {
                setEmail("user.test@apnacare.in");
                setPassword("UserPass@2026!");
              }}
              className="text-[11px] font-bold text-primary underline hover:text-primary/80 transition-colors"
            >
              Auto-Fill
            </button>
          </div>
          <p className="font-mono text-[11px] text-muted-foreground">
            user.test@apnacare.in &bull; UserPass@2026!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-semibold">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="min-h-[44px]"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-semibold">Password</Label>
            </div>
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

          <Button type="submit" variant="warm" className="w-full min-h-[46px] font-semibold" disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <LogIn className="size-4 mr-2" />}
            {loading ? "Signing in..." : "Sign In to User Portal"}
          </Button>
        </form>

        <div className="pt-4 border-t border-border text-center space-y-2 text-xs text-muted-foreground">
          <p>
            Don't have an account yet?{" "}
            <Link to="/register/user" className="font-semibold text-primary hover:underline">
              Create an account
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
