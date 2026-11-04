import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Lock, Mail, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/customer/login")({
  head: () =>
    seo("Customer Sign In — ApnaCare", "Sign in to manage your ApnaCare family care bookings and care plans.", {
      noindex: true,
    }),
  component: CustomerLoginPage,
});

function CustomerLoginPage() {
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
      const res = await login(email, password, "CUSTOMER");
      if (res.success) {
        navigate({ to: "/customer/dashboard" });
      } else {
        setError(res.error || "Unable to sign in. Please verify your credentials.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/30 to-background">
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
            <div className="size-12 rounded-2xl bg-[#2D5016]/10 text-[#2D5016] mx-auto flex items-center justify-center mb-3">
              <Heart className="size-6" />
            </div>
            <h1 className="font-serif text-2xl font-semibold text-foreground">Customer Sign In</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Access your family care plans, bookings, and assigned Sahas
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-start gap-2.5">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-xs font-medium">Email Address</Label>
              <div className="relative mt-1">
                <Input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@example.com"
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
                <span className="text-[11px] text-muted-foreground cursor-pointer hover:underline">
                  Forgot?
                </span>
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
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-border/60 text-center">
            <p className="text-xs text-muted-foreground">
              Don't have an account yet?{" "}
              <Link to="/customer/register" className="font-semibold text-[#2D5016] hover:underline">
                Register as Customer
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

