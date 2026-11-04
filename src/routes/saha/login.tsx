import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCheck, Lock, Mail, AlertCircle, Loader2, ArrowLeft, Clock, ShieldCheck } from "lucide-react";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/saha/login")({
  head: () =>
    seo("Saha Care Team Sign In — ApnaCare", "Official portal for verified ApnaCare Saha care companions and specialists.", {
      noindex: true,
    }),
  component: SahaLoginPage,
});

function SahaLoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsPending(false);
    setIsSubmitting(true);

    try {
      const res = await login(email, password, "SAHA");
      if (res.success) {
        navigate({ to: "/saha/dashboard" });
      } else {
        if (res.code === "PENDING_APPROVAL") {
          setIsPending(true);
        } else {
          setError(res.error || "Unable to sign in. Please verify your credentials.");
        }
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-500/5 via-secondary/20 to-background">
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

        <div className="bg-card border border-border rounded-3xl p-8 shadow-soft">
          <div className="text-center mb-6">
            <div className="size-12 rounded-2xl bg-amber-500/10 text-amber-700 mx-auto flex items-center justify-center mb-3">
              <UserCheck className="size-6" />
            </div>
            <h1 className="font-serif text-2xl font-semibold text-foreground">Saha Care Team Sign In</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Shift check-in, assignment telemetry, and availability management
            </p>
          </div>

          {isPending && (
            <div className="mb-5 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <div className="flex items-center gap-2 font-bold mb-1">
                <Clock className="size-4 text-amber-700" />
                <span>Application Under Operations Review</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Your Saha profile has been received. Our clinical & background verification team reviews documents within 48 hours. You will receive a WhatsApp notification upon activation.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-start gap-2.5">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-xs font-medium">Registered Email</Label>
              <div className="relative mt-1">
                <Input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="saha@apnacare.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl pl-9"
                />
                <Mail className="size-4 text-muted-foreground absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-medium">Password</Label>
                <a href="tel:+918825493949" className="text-[11px] text-muted-foreground hover:underline">
                  Need Help?
                </a>
              </div>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
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
              className="w-full bg-[#2D5016] hover:bg-[#233f11] text-white rounded-xl py-5 font-semibold shadow-soft mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Open Saha Portal</span>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-border/60 text-center">
            <p className="text-xs text-muted-foreground">
              Want to join our verified Saha team?{" "}
              <Link to="/saha/register" className="font-semibold text-primary hover:underline">
                Apply as a Saha
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

