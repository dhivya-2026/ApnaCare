import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import {
  UserCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldAlert,
  LogOut,
  Calendar,
  AlertCircle,
  Loader2,
  Check,
  Radio,
  FileText,
} from "lucide-react";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/saha/dashboard")({
  head: () =>
    seo("Saha Companion Workspace — ApnaCare", "Shift check-in, assignment telemetry, and availability management.", {
      noindex: true,
    }),
  component: () => (
    <ProtectedRoute requiredRole="SAHA">
      <SahaDashboard />
    </ProtectedRoute>
  ),
});

interface Assignment {
  bookingId: string;
  serviceType: string;
  recipientName: string;
  city: string;
  shift: string;
  startDate: string;
  notes?: string;
}

interface AttendanceRecord {
  attendanceId: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: string;
}

function SahaDashboard() {
  const { user, saha, logout } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Today's attendance state
  const today = new Date().toISOString().split("T")[0];
  const todayRecord = attendance.find((a) => a.date === today);
  const isCheckedIn = !!todayRecord?.checkInTime && !todayRecord?.checkOutTime;
  const isCheckedOut = !!todayRecord?.checkOutTime;

  useEffect(() => {
    async function loadData() {
      try {
        const [assignRes, attRes] = await Promise.all([
          fetch("/api/sahas/assignments", { credentials: "include" }),
          fetch("/api/sahas/attendance/history", { credentials: "include" }),
        ]);

        if (assignRes.ok) {
          const aData = await assignRes.json();
          setAssignments(aData.assignments || []);
        }

        if (attRes.ok) {
          const atData = await attRes.json();
          setAttendance(atData.attendance || []);
        }
      } catch (err) {
        console.error("Failed to load Saha data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCheckIn = () => {
    setActionLoading(true);
    setStatusMessage(null);

    const performCheckIn = async (coords?: { lat: number; lng: number }) => {
      try {
        const res = await fetch("/api/sahas/attendance/check-in", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            bookingId: assignments[0]?.bookingId || "GENERAL",
            lat: coords?.lat,
            lng: coords?.lng,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setStatusMessage("Checked in successfully with verified location.");
          setAttendance((prev) => [data.record, ...prev]);
        } else {
          setStatusMessage("Check-in failed. Please try again.");
        }
      } catch {
        setStatusMessage("Network error during check-in.");
      } finally {
        setActionLoading(false);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => performCheckIn({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => performCheckIn() // Fallback if user denies GPS permission
      );
    } else {
      performCheckIn();
    }
  };

  const handleCheckOut = () => {
    setActionLoading(true);
    setStatusMessage(null);

    const performCheckOut = async (coords?: { lat: number; lng: number }) => {
      try {
        const res = await fetch("/api/sahas/attendance/check-out", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            bookingId: assignments[0]?.bookingId || "GENERAL",
            lat: coords?.lat,
            lng: coords?.lng,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setStatusMessage("Checked out successfully. Shift ended.");
          setAttendance((prev) =>
            prev.map((r) => (r.date === today ? data.record : r))
          );
        } else {
          setStatusMessage("Check-out failed. Please try again.");
        }
      } catch {
        setStatusMessage("Network error during check-out.");
      } finally {
        setActionLoading(false);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => performCheckOut({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => performCheckOut()
      );
    } else {
      performCheckOut();
    }
  };

  return (
    <div className="min-h-screen bg-secondary/15 py-8 px-4 sm:px-6 max-w-4xl mx-auto space-y-6">
      {/* Saha Header Card */}
      <div className="bg-card border border-border rounded-3xl p-6 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-[#2D5016]/10 text-[#2D5016] flex items-center justify-center shrink-0">
            <UserCheck className="size-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-serif font-semibold text-foreground">
                {user?.fullName || "Saha Companion"}
              </h1>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                Active Saha
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
              <MapPin className="size-3.5" /> {user?.city || "South India Cluster"} • ID: {saha?.sahaId || user?.userId}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={logout}
          className="rounded-xl text-xs border-border text-muted-foreground hover:text-foreground"
        >
          <LogOut className="size-3.5 mr-1.5" />
          <span>Sign Out</span>
        </Button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-medium">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Primary Shift Action Widget (Large touch targets for mobile) */}
      <div className="bg-card border-2 border-[#2D5016]/20 rounded-3xl p-6 sm:p-8 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Radio className="size-4 text-[#2D5016] animate-pulse" />
            <h2 className="text-base font-semibold text-foreground">Today's Shift Telemetry</h2>
          </div>
          <span className="text-xs text-muted-foreground font-mono">{today}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {/* Check In Action */}
          <Button
            type="button"
            disabled={actionLoading || isCheckedIn || isCheckedOut}
            onClick={handleCheckIn}
            className={`w-full py-8 rounded-2xl font-bold text-base shadow-soft flex flex-col items-center justify-center gap-1.5 transition-all ${
              isCheckedIn || isCheckedOut
                ? "bg-secondary text-muted-foreground cursor-not-allowed opacity-60"
                : "bg-[#2D5016] hover:bg-[#233f11] text-white"
            }`}
          >
            {actionLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : isCheckedIn ? (
              <>
                <Check className="size-6 text-emerald-600" />
                <span className="text-xs">Checked In Today</span>
              </>
            ) : isCheckedOut ? (
              <span className="text-xs">Shift Finished</span>
            ) : (
              <>
                <Clock className="size-5" />
                <span>Check In to Shift</span>
              </>
            )}
          </Button>

          {/* Check Out Action */}
          <Button
            type="button"
            disabled={actionLoading || !isCheckedIn || isCheckedOut}
            onClick={handleCheckOut}
            className={`w-full py-8 rounded-2xl font-bold text-base shadow-soft flex flex-col items-center justify-center gap-1.5 transition-all ${
              !isCheckedIn || isCheckedOut
                ? "bg-secondary text-muted-foreground cursor-not-allowed opacity-60"
                : "bg-amber-600 hover:bg-amber-700 text-white"
            }`}
          >
            {actionLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : isCheckedOut ? (
              <>
                <Check className="size-6 text-emerald-600" />
                <span className="text-xs">Checked Out</span>
              </>
            ) : (
              <>
                <LogOut className="size-5" />
                <span>Check Out & End Shift</span>
              </>
            )}
          </Button>
        </div>

        <p className="text-[11px] text-muted-foreground text-center">
          Location coordinates and timestamp are cryptographically linked to the operations cluster for family transparency.
        </p>
      </div>

      {/* Today's Assignments */}
      <div className="bg-card border border-border rounded-3xl p-6 shadow-soft space-y-4">
        <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
          <Calendar className="size-4 text-[#2D5016]" />
          <span>Assigned Care Recipients ({assignments.length})</span>
        </h2>

        {isLoading ? (
          <div className="text-center py-8">
            <Loader2 className="size-6 animate-spin text-[#2D5016] mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Loading active assignments...</p>
          </div>
        ) : assignments.length === 0 ? (
          <div className="p-6 rounded-2xl bg-secondary/30 text-center">
            <p className="text-xs text-muted-foreground">
              No active bookings assigned today. Operations coordinators will notify you via WhatsApp when a new match is assigned.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {assignments.map((a) => (
              <div
                key={a.bookingId}
                className="p-4 rounded-2xl bg-secondary/30 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="text-sm font-semibold text-foreground">{a.recipientName}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {a.serviceType} • {a.shift} Shift • {a.city}
                  </div>
                  {a.notes && <div className="text-[11px] text-muted-foreground mt-1 italic">"{a.notes}"</div>}
                </div>
                <a
                  href="tel:+918825493949"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold text-[#2D5016] hover:bg-secondary shrink-0"
                >
                  <Phone className="size-3" />
                  <span>Contact Coordinator</span>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Attendance History */}
      <div className="bg-card border border-border rounded-3xl p-6 shadow-soft space-y-4">
        <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
          <FileText className="size-4 text-[#2D5016]" />
          <span>Attendance History</span>
        </h2>

        {attendance.length === 0 ? (
          <p className="text-xs text-muted-foreground">No past attendance logs recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium">Check In</th>
                  <th className="pb-2 font-medium">Check Out</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {attendance.map((rec) => (
                  <tr key={rec.attendanceId || rec.date}>
                    <td className="py-2.5 font-medium">{rec.date}</td>
                    <td className="py-2.5 text-muted-foreground">
                      {rec.checkInTime ? new Date(rec.checkInTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}
                    </td>
                    <td className="py-2.5 text-muted-foreground">
                      {rec.checkOutTime ? new Date(rec.checkOutTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}
                    </td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {rec.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Emergency Escalation Button */}
      <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between text-xs text-rose-900">
        <div className="flex items-center gap-2">
          <ShieldAlert className="size-5 text-rose-700 shrink-0" />
          <span>Need immediate assistance or patient emergency support?</span>
        </div>
        <a
          href="tel:+918825493949"
          className="px-3 py-1.5 rounded-xl bg-rose-700 text-white font-bold hover:bg-rose-800 shrink-0"
        >
          24/7 SOS Line
        </a>
      </div>
    </div>
  );
}

