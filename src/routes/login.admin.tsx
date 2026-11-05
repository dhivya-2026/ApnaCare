import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ShieldCheck, LogIn, Loader2, AlertCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/login/admin")({
  head: () =>
    seo(
      "Operations Administration Login — ApnaCare",
      "Restricted administrative console for ApnaCare operations and clinical coordination teams.",
      { canonical: "https://apna-care.vercel.app/login/admin" }
    ),
  component: AdminLoginPage,
});

function AdminLoginPage() {
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
    const res = await login({ email, password, role: "admin" });
    setLoading(false);

    if (res.success) {
      toast.success("Administrator session verified. Opening console...");
      navigate({ to: (res.redirectUrl || "/dashboard/admin") as any });
    } else {
      setError(res.error || "Administrative authentication failed. Check credentials.");
      toast.error(res.error || "Admin login failed");
    }
  };

  return (
    <div className="container-page py-16 md:py-24 max-w-md mx-auto">
      <div className="card-soft p-8 space-y-6 shadow-lift border-amber-600/30">
        <div className="text-center space-y-2">
          <div className="size-12 rounded-2xl bg-amber-500/10 text-amber-600 grid place-items-center mx-auto">
            <Lock className="size-6" />
          </div>
          <h1 className="text-2xl font-display font-semibold text-foreground">Operations Admin Login</h1>
          <p className="text-xs text-muted-foreground">
            Restricted access. Dedicated for authorized clinical coordinators and system administrators.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-start gap-2.5">
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

                {/* Demo Test Credentials Card */}
        <div className="rounded-xl border border-amber-600/20 bg-amber-500/10 p-3 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-amber-700">Super Admin Credentials:</span>
            <button
              type="button"
              onClick={() => {
                setEmail("admin@apnacare.in");
                setPassword("ApnaAdmin@2026!");
              }}
              className="text-[11px] font-bold text-amber-700 underline hover:text-amber-800 transition-colors"
            >
              Auto-Fill
            </button>
          </div>
          <p className="font-mono text-[11px] text-muted-foreground">
            admin@apnacare.in &bull; ApnaAdmin@2026!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-semibold">Administrator Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@apnacare.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="min-h-[44px]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs font-semibold">Security Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="min-h-[44px]"
            />
          </div>

          <Button type="submit" variant="warm" className="w-full min-h-[46px] font-semibold bg-amber-600 hover:bg-amber-700 text-white" disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <LogIn className="size-4 mr-2" />}
            {loading ? "Authenticating session..." : "Sign In to Admin Console"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const res = loginAsDemo("admin");
              navigate({ to: res.redirectUrl as any });
            }}
            className="w-full min-h-[44px] font-semibold border-amber-600/30 text-amber-800 dark:text-amber-300 hover:bg-amber-500/10"
          >
            ⚡ View Demo Admin Console (Instant Preview) &rarr;
          </Button>
        </form>

        <div className="pt-4 border-t border-border text-center space-y-2 text-xs text-muted-foreground">
          <p className="text-[11px]">
            Public registration is disabled. Super Admin accounts are provisioned via secure operations keys only.
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
