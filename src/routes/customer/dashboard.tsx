/**
 * /customer/dashboard — Customer portal
 */

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  CalendarDays, Heart, User, LogOut, Clock, CheckCircle2,
  XCircle, Loader2, ArrowRight, Phone, MapPin, RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/customer/dashboard")({
  component: CustomerDashboardPage,
});

type Booking = {
  booking_id: string;
  service_type: string;
  booking_status: string;
  shift_start_date: string;
  shift_type: string;
  city: string;
  assigned_saha_name?: string;
};

type Profile = {
  full_name: string;
  email: string;
  phone: string;
  city: string;
  preferred_language: string;
};

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    completed: "bg-slate-100 text-slate-600 border-slate-200",
    cancelled: "bg-red-100 text-red-600 border-red-200",
    in_progress: "bg-blue-100 text-blue-700 border-blue-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${map[status] ?? "bg-muted text-muted-foreground border-border"}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

function CustomerDashboardPage() {
  const navigate = useNavigate();
  const { user, role, isLoading, logout } = useAuth();
  const [tab, setTab] = useState<"bookings" | "team" | "profile">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  // Auth guard
  useEffect(() => {
    if (!isLoading && (!user || role !== "CUSTOMER")) {
      navigate({ to: "/customer/login" });
    }
  }, [isLoading, user, role, navigate]);

  // Load bookings
  useEffect(() => {
    if (!user || role !== "CUSTOMER") return;
    setDataLoading(true);
    Promise.all([
      fetch("/api/customers/bookings", { credentials: "include" }).then(r => r.json()),
      fetch("/api/customers/profile", { credentials: "include" }).then(r => r.json()),
    ]).then(([bData, pData]) => {
      if (bData.bookings) setBookings(bData.bookings);
      if (pData.profile) setProfile(pData.profile);
    }).catch(() => {
      toast.error("Failed to load your data.");
    }).finally(() => setDataLoading(false));
  }, [user, role]);

  async function handleLogout() {
    await logout();
    navigate({ to: "/" });
  }

  if (isLoading || (!user && !isLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  const total = bookings.length;
  const active = bookings.filter(b => b.booking_status === "confirmed" || b.booking_status === "in_progress").length;
  const completed = bookings.filter(b => b.booking_status === "completed").length;
  const pending = bookings.filter(b => b.booking_status === "pending").length;

  const activeSahas = bookings
    .filter(b => b.assigned_saha_name && (b.booking_status === "confirmed" || b.booking_status === "in_progress"))
    .map(b => b.assigned_saha_name!);

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="container-page flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Heart className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Family Portal</p>
              <p className="text-sm font-semibold text-foreground">{user?.name ?? "Welcome"}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground gap-2">
            <LogOut className="size-4" /> Sign out
          </Button>
        </div>
      </div>

      <div className="container-page py-8 max-w-5xl mx-auto space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Bookings", value: total, icon: CalendarDays, color: "text-primary" },
            { label: "Active", value: active, icon: Clock, color: "text-blue-600" },
            { label: "Completed", value: completed, icon: CheckCircle2, color: "text-emerald-600" },
            { label: "Pending", value: pending, icon: RefreshCw, color: "text-amber-600" },
          ].map(kpi => (
            <div key={kpi.label} className="bg-white rounded-2xl border border-border p-5">
              <kpi.icon className={`size-5 mb-2 ${kpi.color}`} />
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="flex border-b border-border">
            {(["bookings", "team", "profile"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-3.5 text-sm font-semibold capitalize transition-colors ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted/40"}`}
              >
                {t === "team" ? "My Care Team" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Bookings Tab */}
            {tab === "bookings" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-foreground">Your Bookings</h2>
                  <Button asChild size="sm" className="rounded-xl gap-2">
                    <Link to="/booking">
                      + New Booking <ArrowRight className="size-3" />
                    </Link>
                  </Button>
                </div>

                {dataLoading ? (
                  <div className="py-12 flex items-center justify-center">
                    <Loader2 className="size-6 animate-spin text-primary" />
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="py-12 text-center">
                    <CalendarDays className="size-10 mx-auto text-muted-foreground/40 mb-3" />
                    <p className="text-muted-foreground font-medium">No bookings yet</p>
                    <p className="text-sm text-muted-foreground mt-1">Start by finding care for your family.</p>
                    <Button asChild className="mt-4 rounded-xl">
                      <Link to="/booking">Find Care</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookings.map(b => (
                      <div key={b.booking_id} className="flex items-center justify-between rounded-xl border border-border p-4 hover:bg-muted/20 transition-colors">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-semibold text-foreground">{b.service_type}</p>
                            <StatusBadge status={b.booking_status} />
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                            <span className="flex items-center gap-1"><CalendarDays className="size-3" />{b.shift_start_date}</span>
                            <span className="flex items-center gap-1"><MapPin className="size-3" />{b.city}</span>
                            {b.assigned_saha_name && <span className="text-emerald-600 font-medium">{b.assigned_saha_name}</span>}
                          </div>
                        </div>
                        <ArrowRight className="size-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Team Tab */}
            {tab === "team" && (
              <div className="space-y-4">
                <h2 className="font-semibold text-foreground">Active Care Team</h2>
                {dataLoading ? (
                  <div className="py-12 flex items-center justify-center"><Loader2 className="size-6 animate-spin text-primary" /></div>
                ) : activeSahas.length === 0 ? (
                  <div className="py-12 text-center">
                    <User className="size-10 mx-auto text-muted-foreground/40 mb-3" />
                    <p className="text-muted-foreground font-medium">No active Saha assigned yet</p>
                    <p className="text-sm text-muted-foreground mt-1">Once a booking is confirmed, your assigned Saha will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[...new Set(activeSahas)].map(name => (
                      <div key={name} className="flex items-center gap-3 rounded-xl border border-border p-4">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{name}</p>
                          <p className="text-xs text-muted-foreground">Assigned Saha</p>
                        </div>
                        <a href={`tel:${""}`} className="ml-auto p-2 rounded-lg hover:bg-muted transition-colors">
                          <Phone className="size-4 text-primary" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {tab === "profile" && (
              <div className="space-y-4">
                <h2 className="font-semibold text-foreground">Profile</h2>
                {dataLoading || !profile ? (
                  <div className="py-12 flex items-center justify-center"><Loader2 className="size-6 animate-spin text-primary" /></div>
                ) : (
                  <div className="space-y-4 max-w-sm">
                    {[
                      { label: "Full name", value: profile.full_name },
                      { label: "Email", value: profile.email },
                      { label: "Mobile", value: profile.phone },
                      { label: "City", value: profile.city },
                      { label: "Language", value: profile.preferred_language },
                    ].map(row => (
                      <div key={row.label}>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{row.label}</p>
                        <p className="text-sm font-medium text-foreground">{row.value || "—"}</p>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="rounded-xl mt-2" disabled>
                      Edit Profile (coming soon)
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick CTA */}
        <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-semibold text-foreground">Need care for your family?</p>
            <p className="text-sm text-muted-foreground mt-0.5">Book a verified Saha for elder care, hospital assistance, and more.</p>
          </div>
          <Button asChild className="rounded-xl shrink-0">
            <Link to="/booking">Book Now <ArrowRight className="size-4 ml-1" /></Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

