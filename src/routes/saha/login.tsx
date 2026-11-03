/**
 * /saha/login — Saha / Caregiver login
 */

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, UserCheck, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/saha/login")({
  component: SahaLoginPage,
});

function SahaLoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const result = await login({ email: form.email, password: form.password });
    if (result.success) {
      toast.success("Welcome back, Saha!");
      navigate({ to: "/saha/dashboard" });
    } else {
      setError(result.error || "Login failed. Please check your credentials.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-[#EEF6F3] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="size-4" /> All portals
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-border p-8">
          <div className="size-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6">
            <UserCheck className="size-7 text-emerald-600" />
          </div>

          <h1 className="font-display text-2xl font-bold text-foreground mb-1">Saha Portal Login</h1>
          <p className="text-sm text-muted-foreground mb-8">Sign in to view your assignments, check in, and manage your availability.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required autoComplete="email" className="h-11 rounded-xl" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPw ? "text" : "password"} placeholder="••••••••"
                  value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required autoComplete="current-password" className="h-11 rounded-xl pr-10" />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-destructive/10 text-destructive text-sm px-4 py-3 border border-destructive/20">{error}</div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full h-11 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white">
              {isLoading ? <><Loader2 className="size-4 mr-2 animate-spin" /> Signing in…</> : "Sign in"}
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-6">
            New Saha applicant?{" "}
            <Link to="/saha/register" className="text-emerald-600 font-semibold hover:underline">Apply here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

