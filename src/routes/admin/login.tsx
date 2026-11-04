import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Lock, Mail, AlertCircle, Loader2, ArrowLeft, KeyRound } from "lucide-react";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/login")({
  head: () =>
    seo("Command Operations Desk — ApnaCare", "Super Admin and clinical dispatch authorization portal.", {
      noindex: true,
    }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await login(email, password, "SUPER_ADMIN");
      if (res.success) {
        navigate({ to: "/admin/dashboard" });
      } else {
        setError(res.error || "Invalid administrator credentials.");
      }
    } catch {
      setError("An unexpected error occurred during admin authentication.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900/10 via-secondary/20 to-background">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Portal Selection</span>
          </Link>
        </div>

        <div className="bg-card border-2 border-slate-700/20 rounded-3xl p-8 shadow-soft">
          <div className="text-center mb-6">
            <div className="size-12 rounded-2xl bg-slate-900 text-white mx-auto flex items-center justify-center mb-3">
              <ShieldCheck className="size-6 text-emerald-400" />
            </div>
            <h1 className="font-serif text-2xl font-semibold text-foreground">Operations Command Desk</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Super Admin, Clinical Triage & Saha Matching Access
            </p>
          </div>

          <div className="mb-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2">
            <KeyRound className="size-4 shrink-0 text-amber-600" />
            <span>Authorized ApnaCare operations personnel only. Access is audited.</span>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-start gap-2.5">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="admin-email" className="text-xs font-medium">Administrator Email</Label>
              <div className="relative mt-1">
                <Input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@apnacare.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl pl-9"
                />
                <Mail className="size-4 text-muted-foreground absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <Label htmlFor="admin-pass" className="text-xs font-medium">Master Password</Label>
              <div className="relative mt-1">
                <Input
                  id="admin-pass"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl pl-9"
                />
                <Lock className="size-4 text-muted-foreground absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-5 font-semibold shadow-soft mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  <span>Verifying Authorization...</span>
                </>
              ) : (
                <span>Access Command Dashboard</span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
