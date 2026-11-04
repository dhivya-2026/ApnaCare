import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Heart, UserCheck, ShieldCheck, ArrowRight, Sparkles, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  head: () =>
    seo(
      "Sign In & Get Started — ApnaCare",
      "Access your ApnaCare portal. Family care booking, Saha attendant portal, and secure operations management.",
      { noindex: true }
    ),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-[#2D5016]/5 via-background to-secondary/20 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2D5016]/10 text-[#2D5016] text-xs font-semibold mb-4">
            <Sparkles className="size-3.5" />
            <span>Secure Role-Based Access</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
            Welcome to ApnaCare
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Choose how you would like to continue today. Every portal is tailored to your care journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
          {/* Card 1: Customer Portal */}
          <div className="rounded-3xl border-2 border-[#2D5016]/20 bg-card p-8 shadow-soft hover:shadow-lift transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2D5016]/5 rounded-bl-full -z-0 pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="relative z-10">
              <div className="size-14 rounded-2xl bg-[#2D5016]/10 text-[#2D5016] flex items-center justify-center mb-6">
                <Heart className="size-7" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                Families & Individuals
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                I Need Care for My Family
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Book verified women Sahas for elder care, hospital accompaniment, new mother care, or home nursing. Track your bookings and care plans.
              </p>
            </div>
            <div className="relative z-10 pt-4 border-t border-border/60">
              <Button asChild className="w-full bg-[#2D5016] hover:bg-[#233f11] text-white rounded-xl py-6 font-semibold shadow-soft flex items-center justify-center gap-2">
                <Link to="/customer/login">
                  <span>Customer Sign In</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <div className="mt-3 text-center">
                <span className="text-xs text-muted-foreground">New to ApnaCare? </span>
                <Link to="/customer/register" className="text-xs font-semibold text-[#2D5016] hover:underline">
                  Create an account
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Saha Portal */}
          <div className="rounded-3xl border-2 border-primary/20 bg-card p-8 shadow-soft hover:shadow-lift transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0 pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="relative z-10">
              <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <UserCheck className="size-7" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 mb-2">
                Care Attendants & Sahas
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                I am a Saha (Attendant)
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Manage your assignments, record daily check-in and check-out with GPS, update your availability, and request coordinator support.
              </p>
            </div>
            <div className="relative z-10 pt-4 border-t border-border/60">
              <Button asChild variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/5 rounded-xl py-6 font-semibold flex items-center justify-center gap-2">
                <Link to="/saha/login">
                  <span>Saha Member Sign In</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <div className="mt-3 text-center">
                <span className="text-xs text-muted-foreground">Want to join our care team? </span>
                <Link to="/saha/register" className="text-xs font-semibold text-primary hover:underline">
                  Apply as a Saha
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Admin / Operations Access */}
        <div className="mt-10 max-w-md mx-auto text-center border-t border-border/80 pt-8">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <ShieldCheck className="size-4 text-muted-foreground" />
            <span>Authorized Operations & Command Desk</span>
          </div>
          <div>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg hover:bg-secondary/60 transition-colors"
            >
              <Building2 className="size-4" />
              <span>Super Admin & Operations Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

