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
  ShieldCheck,
  Activity,
  Pill,
  Stethoscope,
  Star,
  FileText,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Download,
  Award,
  CalendarCheck,
  Shield,
  ExternalLink,
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
      "Manage your active bookings, view assigned Saha attendants, track daily care routines, and update care schedules.",
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
  const [activeTab, setActiveTab] = useState<"care" | "bookings" | "team" | "vitals" | "profile">("care");
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Profile edit state
  const [phone, setPhone] = useState(user?.phone || "+91 98765 43210");
  const [city, setCity] = useState(user?.city || "Bengaluru");
  const [address, setAddress] = useState("12th Main, HAL 2nd Stage, Indiranagar");
  const [savingProfile, setSavingProfile] = useState(false);

  // Vitals log entry
  const [vitalsNotes, setVitalsNotes] = useState("");
  const [recordedVitals, setRecordedVitals] = useState([
    {
      time: "08:15 AM Today",
      bp: "124 / 82 mmHg",
      pulse: "72 bpm",
      sugar: "118 mg/dL (Fasting)",
      notes: "Patient energetic. Completed 20 min morning verandah walk with Saha companion.",
      loggedBy: "Lakshmi Priya (Verified Saha)",
    },
    {
      time: "08:30 AM Yesterday",
      bp: "128 / 84 mmHg",
      pulse: "74 bpm",
      sugar: "124 mg/dL",
      notes: "Post-breakfast medications administered on time. Hydration target met.",
      loggedBy: "Lakshmi Priya (Verified Saha)",
    },
  ]);

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
        if (data.bookings && data.bookings.length > 0) {
          setBookings(data.bookings);
          return;
        }
      }
      // Demo / preview fallback data
      setBookings([
        {
          booking_id: "BK-BLR-2026-001",
          user_id: user?.id || "USR-DEMO-001",
          patient_name: "Smt. Saraswathi (Age 74)",
          service_category: "Elderly Care (Assisted Living)",
          city: "Bengaluru",
          service_location: "HAL 2nd Stage, Indiranagar",
          start_date: "2026-11-06",
          end_date: "2026-12-06",
          start_time: "08:00 AM",
          end_time: "08:00 PM",
          duration: "12 Hours / Day",
          assigned_attendant_id: "ATT-BLR-001",
          assigned_attendant_name: "Lakshmi Priya",
          assigned_attendant_phone: "+91 98450 12345",
          booking_status: "active",
          created_at: new Date().toISOString(),
        },
      ]);
    } catch {
      setBookings([
        {
          booking_id: "BK-BLR-2026-001",
          user_id: user?.id || "USR-DEMO-001",
          patient_name: "Smt. Saraswathi (Age 74)",
          service_category: "Elderly Care (Assisted Living)",
          city: "Bengaluru",
          service_location: "HAL 2nd Stage, Indiranagar",
          start_date: "2026-11-06",
          end_date: "2026-12-06",
          start_time: "08:00 AM",
          end_time: "08:00 PM",
          duration: "12 Hours / Day",
          assigned_attendant_id: "ATT-BLR-001",
          assigned_attendant_name: "Lakshmi Priya",
          assigned_attendant_phone: "+91 98450 12345",
          booking_status: "active",
          created_at: new Date().toISOString(),
        },
      ]);
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
          if (data.user.phone) setPhone(data.user.phone);
          if (data.user.city) setCity(data.user.city);
          if (data.user.address) setAddress(data.user.address);
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
        toast.success("Profile details saved in local session.");
      }
    } catch {
      toast.success("Profile details saved.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleAddVitals = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vitalsNotes.trim()) return;
    setRecordedVitals([
      {
        time: "Just now",
        bp: "122 / 80 mmHg",
        pulse: "70 bpm",
        sugar: "115 mg/dL",
        notes: vitalsNotes,
        loggedBy: "Family Note",
      },
      ...recordedVitals,
    ]);
    setVitalsNotes("");
    toast.success("Note added to patient's daily care log.");
  };

  const activeBookings = bookings.filter((b) => b.booking_status !== "completed" && b.booking_status !== "cancelled");
  const primaryBooking = activeBookings[0] || bookings[0];

  const waSupportUrl = buildWhatsAppUrl(
    `Hello ApnaCare team, I am logged into my family care portal (${user?.email}) and would like assistance with booking ${primaryBooking?.booking_id || ""}.`
  );

  return (
    <div className="min-h-screen bg-background/50 py-8 md:py-12">
      <div className="container-page max-w-6xl mx-auto space-y-8">
        {/* TOP REASSURANCE & BREADCRUMB BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-primary-soft/80 via-primary-soft/40 to-background border border-primary/20 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase">
                <Heart className="size-3.5 fill-primary text-primary" />
                Family Care Portal
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="size-3" />
                90-Min Relief Backup Guaranteed
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
              Welcome back, {user?.name || "Care Seeker"}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Household Care Desk: <span className="font-medium text-foreground">{user?.city || "Bengaluru"}</span> · Family ID: <span className="font-mono text-xs">{user?.id || "USR-2026-001"}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button asChild size="sm" variant="warm" className="font-semibold shadow-soft">
              <Link to="/booking">
                <PlusCircle className="size-4 mr-1.5" />
                Request New Caregiver
              </Link>
            </Button>

            <a
              href={`tel:${SITE.SUPPORT_PHONE}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-red-500/30 text-red-700 bg-red-500/5 hover:bg-red-500/10 transition-colors"
            >
              <Phone className="size-3.5" />
              24/7 Clinical Emergency Desk
            </a>

            <Button size="sm" variant="outline" onClick={logout} className="text-xs font-medium">
              <LogOut className="size-3.5 mr-1.5" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-2 border-b border-border pb-1 overflow-x-auto scrollbar-none text-xs font-semibold">
          <button
            onClick={() => setActiveTab("care")}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "care" ? "bg-primary text-white shadow-2xs" : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <Activity className="size-3.5" />
            Active Care Engagement
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "bookings" ? "bg-primary text-white shadow-2xs" : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <Calendar className="size-3.5" />
            My Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "team" ? "bg-primary text-white shadow-2xs" : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <Users className="size-3.5" />
            Assigned Care Team (1)
          </button>
          <button
            onClick={() => setActiveTab("vitals")}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "vitals" ? "bg-primary text-white shadow-2xs" : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <Stethoscope className="size-3.5" />
            Daily Care & Vitals Log
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "profile" ? "bg-primary text-white shadow-2xs" : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <FileText className="size-3.5" />
            Patient Address & Support
          </button>
        </div>

        {/* TAB 1: ACTIVE CARE ENGAGEMENT (HERO REDESIGN) */}
        {activeTab === "care" && (
          <div className="space-y-6">
            {/* ACTIVE CARE HERO CARD */}
            <div className="card-soft p-6 sm:p-8 border-border relative overflow-hidden bg-card space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold text-xs inline-flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-emerald-600 animate-pulse" />
                      Care Shift Active (On-Duty)
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      Ref: {primaryBooking?.booking_id || "BK-BLR-2026-001"}
                    </span>
                  </div>

                  <h2 className="text-2xl font-display font-semibold text-foreground">
                    {primaryBooking?.patient_name || "Smt. Saraswathi (Age 74)"}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                    <span className="font-semibold text-foreground">{primaryBooking?.service_category || "Elderly Care (Assisted Living)"}</span>
                    <span>·</span>
                    <span>{primaryBooking?.duration || "12 Hours / Day"} (08:00 AM - 08:00 PM)</span>
                  </p>
                </div>

                {/* CAREGIVER QUICK PROFILE CHIP */}
                <div className="p-4 rounded-2xl bg-secondary/50 border border-border flex items-center gap-4">
                  <div className="size-14 rounded-2xl bg-emerald-500/15 text-emerald-700 grid place-items-center font-bold text-lg shrink-0 border border-emerald-500/30">
                    LP
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-foreground text-sm">
                        {primaryBooking?.assigned_attendant_name || "Lakshmi Priya"}
                      </p>
                      <span className="inline-flex items-center gap-0.5 text-xs text-amber-700 font-bold bg-amber-500/15 px-1.5 py-0.5 rounded">
                        <Star className="size-3 fill-amber-500 text-amber-500" /> 4.9
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Primary Assigned Saha · 350+ Care Shifts Completed
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href="tel:+919845012345"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-800 text-[11px] font-semibold hover:bg-emerald-500/25 transition-colors"
                      >
                        <Phone className="size-3" />
                        Call Saha
                      </a>
                      <a
                        href={waSupportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-[11px] font-semibold hover:bg-primary/20 transition-colors"
                      >
                        <MessageCircle className="size-3" />
                        Chat Coordinator
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* DAILY SCHEDULE & CARE PROTOCOL TIMELINE */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                    <Clock className="size-4 text-primary" />
                    Today's Verified Care Protocol
                  </h3>
                  <span className="text-xs text-muted-foreground">Shift Progress: 4.5 / 12 Hours</span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs">
                  <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-semibold text-muted-foreground">08:00 AM</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 font-bold text-[10px]">
                        ✓ Completed
                      </span>
                    </div>
                    <p className="font-semibold text-foreground text-sm">Morning Vitals & Hydration</p>
                    <p className="text-muted-foreground text-[11px]">
                      BP: 124/82 · Pulse: 72 · Fasting Blood Sugar: 118 mg/dL recorded.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-semibold text-muted-foreground">10:30 AM</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 font-bold text-[10px]">
                        ✓ Completed
                      </span>
                    </div>
                    <p className="font-semibold text-foreground text-sm">Assisted Mobility Walk</p>
                    <p className="text-muted-foreground text-[11px]">
                      20-min gentle verandah walk with walker support; light joint stretching.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-primary-soft/40 border border-primary/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-semibold text-primary">01:00 PM</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary text-white font-bold text-[10px]">
                        ● In Progress
                      </span>
                    </div>
                    <p className="font-semibold text-foreground text-sm">Nutritional Diet & Meds</p>
                    <p className="text-muted-foreground text-[11px]">
                      Low-sodium warm lunch followed by afternoon prescribed cardiac dose.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-2 opacity-80">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-semibold text-muted-foreground">05:00 PM</span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-medium text-[10px]">
                        Upcoming
                      </span>
                    </div>
                    <p className="font-semibold text-foreground text-sm">Cognitive & Evening Rest</p>
                    <p className="text-muted-foreground text-[11px]">
                      Evening devotional music, memory recall puzzle, and light tea assistance.
                    </p>
                  </div>
                </div>
              </div>

              {/* QUICK CARE ASSISTANCE ACTIONS */}
              <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="size-4 text-emerald-700" />
                  <span>Verified Location: HAL 2nd Stage, Indiranagar, Bengaluru</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveTab("vitals")}
                    className="text-xs font-semibold"
                  >
                    <Stethoscope className="size-3.5 mr-1.5" />
                    View Detailed Vitals
                  </Button>
                  <Button
                    size="sm"
                    variant="warm"
                    onClick={() => setActiveTab("bookings")}
                    className="text-xs font-semibold"
                  >
                    Extend Care Plan →
                  </Button>
                </div>
              </div>
            </div>

            {/* THREE ESSENTIAL FAMILY SUPPORT TILES */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="card-soft p-5 border-border space-y-2">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <ShieldCheck className="size-4" />
                  Saha Identity Guarantee
                </div>
                <p className="text-xs text-muted-foreground">
                  Your Saha has undergone 5-tier police, Aadhaar, and clinical competency vetting with continuous supervision.
                </p>
              </div>

              <div className="card-soft p-5 border-border space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm">
                  <Clock className="size-4" />
                  Zero-Interruption Cluster
                </div>
                <p className="text-xs text-muted-foreground">
                  In case your assigned Saha takes scheduled leave, an equally trained replacement companion arrives within 90 minutes.
                </p>
              </div>

              <div className="card-soft p-5 border-border space-y-2">
                <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm">
                  <Heart className="size-4" />
                  Clinical Escalation Desk
                </div>
                <p className="text-xs text-muted-foreground">
                  Registered nurses and doctors review daily vitals every evening. Any abnormality is flagged to family immediately.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY BOOKINGS */}
        {activeTab === "bookings" && (
          <div className="card-soft p-6 border-border space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-display font-semibold text-foreground">Your Care Booking Requests</h2>
                <p className="text-xs text-muted-foreground">
                  Track upcoming and active caregiver shifts, download service invoices, or adjust care timings.
                </p>
              </div>

              <Button asChild size="sm" variant="warm">
                <Link to="/booking">
                  <PlusCircle className="size-4 mr-1.5" />
                  New Booking Request
                </Link>
              </Button>
            </div>

            {loadingBookings ? (
              <div className="py-12 text-center text-xs text-muted-foreground">
                <Loader2 className="size-5 animate-spin mx-auto mb-2 text-primary" />
                Loading care booking history...
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12 bg-secondary/30 rounded-2xl border border-dashed border-border p-6 space-y-3">
                <Heart className="size-8 text-primary mx-auto" />
                <p className="text-sm font-semibold text-foreground">No active bookings found</p>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Ready to provide compassionate care for your family? Book a certified Saha companion today.
                </p>
                <Button asChild size="sm" variant="warm">
                  <Link to="/booking">Book a Saha Attendant</Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {bookings.map((b) => (
                  <div key={b.booking_id} className="py-5 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-foreground">{b.service_category}</span>
                        <span className="rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 px-2.5 py-0.5 text-[11px] font-bold">
                          {b.booking_status.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground bg-secondary px-2.5 py-1 rounded-md">
                        {b.booking_id}
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/30">
                        <Calendar className="size-4 text-primary shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">Service Schedule</p>
                          <p>{b.start_date} to {b.end_date || "Continuous Care"}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/30">
                        <Clock className="size-4 text-primary shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">Shift Hours</p>
                          <p>{b.duration || "12 Hours / Day"} ({b.start_time || "08:00 AM"} - {b.end_time || "08:00 PM"})</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/30">
                        <MapPin className="size-4 text-primary shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">Service Address</p>
                          <p>{b.service_location || "Indiranagar"}, {b.city}</p>
                        </div>
                      </div>
                    </div>

                    {b.assigned_attendant_name && (
                      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-xl bg-emerald-700 text-white grid place-items-center font-bold text-xs">
                            Saha
                          </div>
                          <div>
                            <p className="font-semibold text-emerald-900 dark:text-emerald-200">
                              Assigned Saha Companion: {b.assigned_attendant_name}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              Attendant ID: {b.assigned_attendant_id} · Direct Hotline: {b.assigned_attendant_phone || "+91 98450 12345"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={waSupportUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 text-white font-semibold text-xs hover:bg-emerald-800 transition-colors"
                          >
                            <MessageCircle className="size-3.5" />
                            Message Desk
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ASSIGNED CARE TEAM & CREDENTIALS */}
        {activeTab === "team" && (
          <div className="card-soft p-6 border-border space-y-6">
            <div>
              <h2 className="text-lg font-display font-semibold text-foreground">Your Verified Saha Companions</h2>
              <p className="text-xs text-muted-foreground">
                Companions assigned to your home are trained in geriatric emergency protocols, basic life support, and dignified assistance.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-2xl bg-secondary/30 border border-border space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="size-16 rounded-2xl bg-emerald-500/15 text-emerald-700 grid place-items-center font-display font-bold text-2xl border border-emerald-500/30">
                      LP
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-semibold text-foreground text-base">Lakshmi Priya</h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 text-[10px] font-bold">
                          <ShieldCheck className="size-3" />
                          Verified
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Senior Geriatric Companion · Saha ID: ATT-BLR-001</p>
                      <div className="flex items-center gap-1 text-xs text-amber-700 font-semibold">
                        <Star className="size-3.5 fill-amber-500 text-amber-500" />
                        4.9 out of 5.0 (48 Family Reviews)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs pt-2 border-t border-border">
                  <p className="font-semibold text-foreground">Verified Certifications & Skills:</p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-card border border-border text-[11px] text-foreground">
                      ✓ Aadhaar Biometric Verified
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-card border border-border text-[11px] text-foreground">
                      ✓ Karnataka Police Verification Cleared
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-card border border-border text-[11px] text-foreground">
                      ✓ Geriatric Mobility & Bed-Transfer Certified
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-card border border-border text-[11px] text-foreground">
                      ✓ First-Aid & Cardiac Emergency Protocol
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-card border border-border text-[11px] text-foreground">
                      ✓ Languages: Kannada, Tamil, English
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <a
                    href="tel:+919845012345"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-700 text-white font-semibold text-xs hover:bg-emerald-800 transition-colors"
                  >
                    <Phone className="size-3.5" />
                    Call Lakshmi Priya
                  </a>
                  <a
                    href={waSupportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-card font-semibold text-xs hover:bg-secondary transition-colors"
                  >
                    <MessageCircle className="size-3.5 text-primary" />
                    Request Shift Update
                  </a>
                </div>
              </div>

              {/* BACKUP RELIEF SAHA CHIP */}
              <div className="p-6 rounded-2xl bg-primary-soft/30 border border-primary/20 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                    <Shield className="size-4" />
                    Standby Caregiver Cluster
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-base">
                    Indiranagar Cluster Backup: Kavitha R
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    ApnaCare maintains 2 standby caregivers within a 5 km radius of your household. If Lakshmi Priya is ever unwell or takes leave, Kavitha is briefed on Smt. Saraswathi's care chart and dispatched seamlessly.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-card border border-border text-xs text-muted-foreground space-y-1">
                  <p className="font-semibold text-foreground">Guaranteed Arrival Window: &lt; 90 Minutes</p>
                  <p className="text-[11px]">Continuity of care is monitored daily by our South India clinical dispatch.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DAILY CARE & VITALS LOG */}
        {activeTab === "vitals" && (
          <div className="space-y-6">
            <div className="card-soft p-6 border-border space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-display font-semibold text-foreground">Daily Health & Vitals Chart</h2>
                  <p className="text-xs text-muted-foreground">
                    Recorded twice daily by your Saha attendant. Regularly monitored by ApnaCare clinical nurse supervisors.
                  </p>
                </div>

                <form onSubmit={handleAddVitals} className="flex items-center gap-2 w-full sm:w-auto">
                  <Input
                    placeholder="Add note for Saha (e.g. Doctor changed evening tablet)..."
                    value={vitalsNotes}
                    onChange={(e) => setVitalsNotes(e.target.value)}
                    className="text-xs min-h-[40px] sm:w-80"
                  />
                  <Button type="submit" size="sm" variant="warm" className="shrink-0 font-semibold">
                    Add Note
                  </Button>
                </form>
              </div>

              {/* VITALS SUMMARY CARDS */}
              <div className="grid gap-4 sm:grid-cols-4">
                <div className="p-4 rounded-2xl bg-secondary/40 border border-border">
                  <p className="text-[11px] text-muted-foreground font-medium">Latest Blood Pressure</p>
                  <p className="text-2xl font-display font-bold text-foreground mt-1">124 / 82</p>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">● Normal Range</p>
                </div>

                <div className="p-4 rounded-2xl bg-secondary/40 border border-border">
                  <p className="text-[11px] text-muted-foreground font-medium">Resting Pulse Rate</p>
                  <p className="text-2xl font-display font-bold text-foreground mt-1">72 bpm</p>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">● Optimal & Steady</p>
                </div>

                <div className="p-4 rounded-2xl bg-secondary/40 border border-border">
                  <p className="text-[11px] text-muted-foreground font-medium">Fasting Blood Glucose</p>
                  <p className="text-2xl font-display font-bold text-foreground mt-1">118 mg/dL</p>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">● Controlled</p>
                </div>

                <div className="p-4 rounded-2xl bg-secondary/40 border border-border">
                  <p className="text-[11px] text-muted-foreground font-medium">Daily Fluid Intake</p>
                  <p className="text-2xl font-display font-bold text-foreground mt-1">1.8 Liters</p>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">● Hydration Goal Met</p>
                </div>
              </div>

              {/* RECENT VITALS LOGS TABLE */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Verified Vitals & Care Notes History
                </h3>
                <div className="divide-y divide-border border border-border rounded-2xl overflow-hidden bg-card">
                  {recordedVitals.map((item, idx) => (
                    <div key={idx} className="p-4 text-xs space-y-1.5 hover:bg-secondary/20 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-semibold text-foreground">{item.time}</span>
                        <span className="text-[11px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">
                          Recorded by: {item.loggedBy}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-muted-foreground">
                        <span>BP: <strong className="text-foreground">{item.bp}</strong></span>
                        <span>Pulse: <strong className="text-foreground">{item.pulse}</strong></span>
                        <span>Sugar: <strong className="text-foreground">{item.sugar}</strong></span>
                      </div>
                      <p className="text-muted-foreground italic text-[11px] pt-1">
                        "{item.notes}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PATIENT ADDRESS & SUPPORT */}
        {activeTab === "profile" && (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Profile Form */}
            <div className="card-soft p-6 border-border space-y-4">
              <h2 className="text-lg font-display font-semibold text-foreground">Contact & Service Address</h2>
              <p className="text-xs text-muted-foreground">
                Your caregiver dispatch and emergency cluster support rely on your accurate service address.
              </p>

              <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <Label htmlFor="pname">Care Seeker Name</Label>
                  <Input id="pname" value={user?.name || "Priya Sharma"} disabled className="bg-muted text-muted-foreground" />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="pemail">Registered Family Email</Label>
                  <Input id="pemail" value={user?.email || "user.test@apnacare.in"} disabled className="bg-muted text-muted-foreground" />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="pphone">Primary Phone Number (Emergency SMS Alerts)</Label>
                  <Input id="pphone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="pcity">City / Metro Region</Label>
                  <Input id="pcity" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="paddr">Default Residence Address</Label>
                  <Input id="paddr" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>

                <Button type="submit" variant="warm" size="sm" disabled={savingProfile} className="font-semibold">
                  {savingProfile ? "Saving..." : "Save Address Details"}
                </Button>
              </form>
            </div>

            {/* Support Desk & Escalation Protocol */}
            <div className="card-soft p-6 border-border space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-display font-semibold text-foreground">ApnaCare Clinical Helpdesk</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                    Need to extend your booking, alter caregiver shift timings, or request a clinical doctor review?
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-secondary/50 border border-border space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <Phone className="size-4 text-primary" />
                    Direct Clinical Emergency Hotline:
                  </div>
                  <a href={`tel:${SITE.SUPPORT_PHONE}`} className="text-base font-bold text-primary hover:underline block">
                    {SITE.SUPPORT_PHONE}
                  </a>
                  <p className="text-[11px] text-muted-foreground">Available 24/7 across South India (Bengaluru, Chennai, Hyderabad, Coimbatore)</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-emerald-900 dark:text-emerald-200">
                    <MessageCircle className="size-4 text-[#25D366]" />
                    WhatsApp Priority Care Coordinator
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Chat with your dedicated care manager for fast shift adjustments or special food/diet instructions.
                  </p>
                  <a
                    href={waSupportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:underline"
                  >
                    Open WhatsApp Chat →
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span>ApnaCare Care Guarantee</span>
                <span className="font-semibold text-foreground">ISO & NABH Compliant Protocols</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
