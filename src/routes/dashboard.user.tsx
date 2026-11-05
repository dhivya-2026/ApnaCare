import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import {
  Users,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Phone,
  MessageCircle,
  PlusCircle,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Loader2,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BookingRecord } from "@/server/auth/types";
import { SITE, buildWhatsAppUrl } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/dashboard/user")({
  head: () =>
    seo(
      "Customer Care Portal — ApnaCare",
      "Manage your active bookings, view assigned Saha attendants, and update care schedules.",
      { canonical: "https://apna-care.vercel.app/dashboard/user" }
    ),
  component: UserDashboardPage,
});

function UserDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <UserDashboardContent />
    </ProtectedRoute>
  );
}

function UserDashboardContent() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "team" | "profile">("overview");
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Profile edit state
  const [phone, setPhone] = useState(user?.phone || "");
  const [city, setCity] = useState(user?.city || "");
  const [address, setAddress] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    fetchBookings();
    fetchProfile();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoadingBookings(true);
      const res = await fetch("/api/user/bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || []);
      }
    } catch {
      // fallback
    } finally {
      setLoadingBookings(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile");
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setPhone(data.user.phone || "");
          setCity(data.user.city || "");
          setAddress(data.user.address || "");
        }
      }
    } catch {}
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, city, address }),
      });
      if (res.ok) {
        toast.success("Profile details updated successfully.");
      } else {
        toast.error("Failed to update profile.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setSavingProfile(false);
    }
  };

  const activeBookings = bookings.filter((b) => b.booking_status !== "completed" && b.booking_status !== "cancelled");
  const completedBookings = bookings.filter((b) => b.booking_status === "completed");

  const assignedCareTeam = bookings
    .filter((b) => b.assigned_attendant_name)
    .map((b) => ({
      attendantName: b.assigned_attendant_name,
      attendantId: b.assigned_attendant_id,
      serviceCategory: b.service_category,
      bookingId: b.booking_id,
      status: b.booking_status,
    }));

  const waSupportUrl = buildWhatsAppUrl(
    `Hello ApnaCare team, I am logged into my user portal (${user?.email}) and would like assistance with my booking.`
  );

  return (
    <div className="container-page py-8 md:py-12 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-3xl bg-primary-soft/60 border border-primary/20">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">CUSTOMER PORTAL</span>
          <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
            Welcome, {user?.name || "Care Seeker"}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Registered City: {user?.city || "South India"} · Account ID: {user?.id}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button asChild size="sm" variant="warm" className="font-semibold shadow-soft">
            <Link to="/booking">
              <PlusCircle className="size-4 mr-1.5" />
              Book New Service
            </Link>
          </Button>

          <Button size="sm" variant="outline" onClick={logout} className="text-xs font-medium">
            <LogOut className="size-3.5 mr-1.5" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-border pb-1 overflow-x-auto scrollbar-none text-xs font-semibold">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2.5 rounded-xl transition-all ${
            activeTab === "overview" ? "bg-primary text-white shadow-2xs" : "text-muted-foreground hover:bg-secondary"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-4 py-2.5 rounded-xl transition-all ${
            activeTab === "bookings" ? "bg-primary text-white shadow-2xs" : "text-muted-foreground hover:bg-secondary"
          }`}
        >
          My Bookings ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab("team")}
          className={`px-4 py-2.5 rounded-xl transition-all ${
            activeTab === "team" ? "bg-primary text-white shadow-2xs" : "text-muted-foreground hover:bg-secondary"
          }`}
        >
          My Care Team ({assignedCareTeam.length})
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2.5 rounded-xl transition-all ${
            activeTab === "profile" ? "bg-primary text-white shadow-2xs" : "text-muted-foreground hover:bg-secondary"
          }`}
        >
          My Profile & Support
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="card-soft p-5 border-border">
              <p className="text-xs text-muted-foreground font-medium">Active & Upcoming Services</p>
              <p className="text-3xl font-display font-bold text-primary mt-2">{activeBookings.length}</p>
            </div>
            <div className="card-soft p-5 border-border">
              <p className="text-xs text-muted-foreground font-medium">Completed Services</p>
              <p className="text-3xl font-display font-bold text-foreground mt-2">{completedBookings.length}</p>
            </div>
            <div className="card-soft p-5 border-border">
              <p className="text-xs text-muted-foreground font-medium">Assigned Saha Attendants</p>
              <p className="text-3xl font-display font-bold text-emerald-700 mt-2">{assignedCareTeam.length}</p>
            </div>
          </div>

          <div className="card-soft p-6 border-border space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-display font-semibold text-foreground">Recent Booking Activity</h2>
              <Button asChild variant="link" size="sm" onClick={() => setActiveTab("bookings")}>
                <span>View all bookings →</span>
              </Button>
            </div>

            {loadingBookings ? (
              <div className="py-8 text-center text-muted-foreground text-xs">
                <Loader2 className="size-5 animate-spin mx-auto mb-2 text-primary" />
                Loading your bookings...
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-10 bg-secondary/30 rounded-2xl border border-dashed border-border p-6 space-y-3">
                <Heart className="size-8 text-primary mx-auto" />
                <p className="text-sm font-semibold text-foreground">No active bookings found</p>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  You haven't requested any care services yet. Create your first customized care plan today.
                </p>
                <Button asChild size="sm" variant="warm">
                  <Link to="/booking">Book a Saha Attendant</Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {bookings.slice(0, 3).map((b) => (
                  <div key={b.booking_id} className="py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground text-sm">{b.service_category}</span>
                        <span className="rounded-full bg-primary-soft text-primary px-2.5 py-0.5 text-[10px] font-bold">
                          {b.booking_status}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-0.5">
                        Booking ID: {b.booking_id} · Date: {b.start_date} ({b.duration})
                      </p>
                    </div>

                    <div className="text-right">
                      {b.assigned_attendant_name ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
                          <UserCheck className="size-3.5" />
                          Saha: {b.assigned_attendant_name}
                        </span>
                      ) : (
                        <span className="text-amber-700 font-medium">Matching with Saha...</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: MY BOOKINGS */}
      {activeTab === "bookings" && (
        <div className="card-soft p-6 border-border space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-display font-semibold text-foreground">All Booking Requests</h2>
            <Button asChild size="sm" variant="warm">
              <Link to="/booking">New Booking</Link>
            </Button>
          </div>

          {bookings.length === 0 ? (
            <p className="text-xs text-muted-foreground py-6 text-center">No bookings on record.</p>
          ) : (
            <div className="divide-y divide-border">
              {bookings.map((b) => (
                <div key={b.booking_id} className="py-4 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-foreground">{b.service_category}</span>
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold">
                        {b.booking_status.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{b.booking_id}</span>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-3 text-xs text-muted-foreground">
                    <p className="flex items-center gap-1.5">
                      <Calendar className="size-3.5 text-primary" />
                      {b.start_date} to {b.end_date}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock className="size-3.5 text-primary" />
                      {b.start_time} - {b.end_time} ({b.duration})
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-primary" />
                      {b.city} ({b.service_location})
                    </p>
                  </div>

                  {b.assigned_attendant_name && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-between">
                      <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                        Assigned Saha Attendant: {b.assigned_attendant_name}
                      </span>
                      <span className="text-[11px] text-muted-foreground">ID: {b.assigned_attendant_id}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MY CARE TEAM */}
      {activeTab === "team" && (
        <div className="card-soft p-6 border-border space-y-4">
          <h2 className="text-lg font-display font-semibold text-foreground">Your Assigned Care Professionals</h2>
          <p className="text-xs text-muted-foreground">
            Saha companions assigned to your household have completed 5-tier identity and background verification.
          </p>

          {assignedCareTeam.length === 0 ? (
            <div className="text-center py-8 text-xs text-muted-foreground">
              No attendants currently assigned. Our clinical team matches companions upon booking confirmation.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {assignedCareTeam.map((team, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-secondary/30 border border-border space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-full bg-emerald-500/15 text-emerald-700 grid place-items-center font-bold text-sm">
                      {team.attendantName?.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{team.attendantName}</h3>
                      <p className="text-[11px] text-muted-foreground">Saha ID: {team.attendantId}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/80 text-xs text-muted-foreground space-y-1">
                    <p>Assignment: {team.serviceCategory}</p>
                    <p>Booking Reference: {team.bookingId}</p>
                    <div className="pt-2 flex items-center gap-2">
                      <a
                        href={waSupportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-700 font-semibold text-xs hover:bg-emerald-500/25"
                      >
                        <MessageCircle className="size-3.5" />
                        Coordinator Desk
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PROFILE & SUPPORT */}
      {activeTab === "profile" && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Form */}
          <div className="card-soft p-6 border-border space-y-4">
            <h2 className="text-lg font-display font-semibold text-foreground">Contact & Address Details</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
              <div className="space-y-1">
                <Label htmlFor="pname">Full Name</Label>
                <Input id="pname" value={user?.name || ""} disabled className="bg-muted text-muted-foreground" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="pemail">Registered Email</Label>
                <Input id="pemail" value={user?.email || ""} disabled className="bg-muted text-muted-foreground" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="pphone">Phone Number</Label>
                <Input id="pphone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>

              <div className="space-y-1">
                <Label htmlFor="pcity">City</Label>
                <Input id="pcity" value={city} onChange={(e) => setCity(e.target.value)} required />
              </div>

              <div className="space-y-1">
                <Label htmlFor="paddr">Default Service Address</Label>
                <Input id="paddr" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>

              <Button type="submit" variant="warm" size="sm" disabled={savingProfile}>
                {savingProfile ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </div>

          {/* Support Contacts */}
          <div className="card-soft p-6 border-border space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-lg font-display font-semibold text-foreground">ApnaCare Support Desk</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Need to reschedule a shift, update dietary instructions for your Saha attendant, or request clinical nurse escalation?
              </p>

              <div className="p-4 rounded-2xl bg-secondary/50 border border-border space-y-2 text-xs">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <Phone className="size-4 text-primary" />
                  Direct Command Line:
                </div>
                <a href={`tel:${SITE.SUPPORT_PHONE}`} className="text-sm font-bold text-primary hover:underline">
                  {SITE.SUPPORT_PHONE}
                </a>
                <p className="text-[11px] text-muted-foreground">Hours: {SITE.operatingHours}</p>
              </div>
            </div>

            <Button asChild variant="outline" className="w-full text-xs">
              <a href={waSupportUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4 mr-2 text-[#25D366]" />
                WhatsApp Priority Support
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
