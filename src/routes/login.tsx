/**
 * /login — Role Selection Landing Page
 * Users choose their portal: Customer, Saha, or Admin
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, UserCheck, ShieldCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginLandingPage,
});

function LoginLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F4EF] via-background to-[#EEF6F3] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            Welcome to ApnaCare
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            How can we help you today?
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Sign in to your portal or create a new account to get started with trusted care services.
          </p>
        </div>

        {/* Portal Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Customer Card */}
          <Link
            to="/customer/login"
            className="group relative flex flex-col gap-5 rounded-3xl border-2 border-border bg-white p-8 shadow-sm transition-all hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Heart className="size-7 text-primary" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">For Families</div>
              <h2 className="text-xl font-bold text-foreground mb-2">I'm Looking for Care</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Manage bookings, track your care team, and view your personalised care plan.
              </p>
            </div>
            <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
              Sign in <ArrowRight className="size-4" />
            </div>
            <div className="absolute inset-0 rounded-3xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </Link>

          {/* Saha Card */}
          <Link
            to="/saha/login"
            className="group relative flex flex-col gap-5 rounded-3xl border-2 border-border bg-white p-8 shadow-sm transition-all hover:border-emerald-400/60 hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="size-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
              <UserCheck className="size-7 text-emerald-600" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">For Caregivers</div>
              <h2 className="text-xl font-bold text-foreground mb-2">I'm a Saha</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Manage your schedule, view assignments, check in/out, and track attendance.
              </p>
            </div>
            <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-emerald-600 group-hover:gap-3 transition-all">
              Sign in <ArrowRight className="size-4" />
            </div>
            <div className="absolute inset-0 rounded-3xl border-2 border-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </Link>

          {/* Admin Card */}
          <Link
            to="/admin/login"
            className="group relative flex flex-col gap-5 rounded-3xl border-2 border-border bg-white p-8 shadow-sm transition-all hover:border-slate-400/60 hover:shadow-lg hover:-translate-y-0.5"
          >
            <div className="size-14 rounded-2xl bg-slate-100 flex items-center justify-center">
              <ShieldCheck className="size-7 text-slate-600" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Operations</div>
              <h2 className="text-xl font-bold text-foreground mb-2">Admin Access</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Operational dashboard for ApnaCare staff. Restricted access only.
              </p>
            </div>
            <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-slate-600 group-hover:gap-3 transition-all">
              Sign in <ArrowRight className="size-4" />
            </div>
            <div className="absolute inset-0 rounded-3xl border-2 border-slate-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          New to ApnaCare?{" "}
          <Link to="/customer/register" className="text-primary font-semibold hover:underline">
            Create a family account
          </Link>
          {" "}or{" "}
          <Link to="/saha/register" className="text-emerald-600 font-semibold hover:underline">
            apply as a Saha
          </Link>
        </p>
      </div>
    </div>
  );
}

