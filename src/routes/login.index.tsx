import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, HeartHandshake, ShieldCheck, ArrowRight, UserPlus, LogIn, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/login/")({
  head: () =>
    seo(
      "Welcome to ApnaCare — Unified Authentication Portal",
      "Sign in to your ApnaCare account. Access dedicated portals for families, Saha care attendants, and administrative operations.",
      { canonical: "https://apna-care.vercel.app/login" }
    ),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="relative overflow-hidden bg-background py-16 md:py-24">
      <div className="container-page max-w-5xl mx-auto space-y-12">
        {/* Portal Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkle className="size-3.5 fill-primary" />
            ACCESS YOUR PORTAL
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-foreground tracking-tight">
            Welcome to ApnaCare
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Your care journey starts here. Sign in to access your personalized ApnaCare account.
          </p>
        </div>

        {/* 3 Distinct Role Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1: Customer / User */}
          <div className="card-soft p-7 flex flex-col justify-between border-border/80 hover:border-primary/50 hover:shadow-lift transition-all duration-300">
            <div className="space-y-5">
              <div className="size-14 rounded-2xl bg-primary-soft text-primary grid place-items-center">
                <Users className="size-7" />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  For Families & Care Seekers
                </span>
                <h2 className="text-2xl font-display font-semibold text-foreground">User Login</h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Access your bookings, manage your care requirements, and stay connected with your assigned care team.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border space-y-3">
              <Button asChild variant="warm" className="w-full justify-between font-semibold shadow-soft">
                <Link to="/login/user">
                  <span>Login</span>
                  <LogIn className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-between font-medium">
                <Link to="/register/user">
                  <span>Create Account</span>
                  <UserPlus className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Card 2: Attendant / Saha */}
          <div className="card-soft p-7 flex flex-col justify-between border-border/80 hover:border-primary/50 hover:shadow-lift transition-all duration-300">
            <div className="space-y-5">
              <div className="size-14 rounded-2xl bg-emerald-500/10 text-emerald-600 grid place-items-center">
                <HeartHandshake className="size-7" />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                  For Verified Caregivers
                </span>
                <h2 className="text-2xl font-display font-semibold text-foreground">Saha Login</h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Manage your availability, view assignments, update attendance, and manage your professional profile.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border space-y-3">
              <Button asChild variant="default" className="w-full justify-between font-semibold shadow-soft bg-emerald-700 hover:bg-emerald-800 text-white">
                <Link to="/login/attendant">
                  <span>Login</span>
                  <LogIn className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-between font-medium">
                <Link to="/register/attendant">
                  <span>Register as Saha</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Card 3: Super Admin */}
          <div className="card-soft p-7 flex flex-col justify-between border-border/80 hover:border-primary/50 hover:shadow-lift transition-all duration-300">
            <div className="space-y-5">
              <div className="size-14 rounded-2xl bg-amber-500/10 text-amber-600 grid place-items-center">
                <ShieldCheck className="size-7" />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                  Operations & Oversight
                </span>
                <h2 className="text-2xl font-display font-semibold text-foreground">Admin Login</h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Access ApnaCare's operational dashboard to manage users, attendants, assignments, and bookings.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border space-y-3">
              <Button asChild variant="outline" className="w-full justify-between font-semibold border-amber-600/30 text-amber-900 dark:text-amber-300 hover:bg-amber-500/10">
                <Link to="/login/admin">
                  <span>Admin Login</span>
                  <LogIn className="size-4" />
                </Link>
              </Button>
              <p className="text-[11px] text-center text-muted-foreground">
                Authorized credentials only. No public registration.
              </p>
            </div>
          </div>
        </div>

        {/* Security & Reassurance note */}
        <div className="rounded-2xl bg-secondary/40 p-4 border border-border/60 text-center max-w-xl mx-auto text-xs text-muted-foreground">
          Protected by role-based session authorization and 256-bit encrypted authentication.
        </div>
      </div>
    </div>
  );
}
