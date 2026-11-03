/**
 * /saha/dashboard — Saha (caregiver) portal — mobile-first
 */

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  UserCheck, LogOut, CalendarDays, MapPin, Clock,
  CheckCircle2, Loader2, ChevronRight, Calendar, FileText, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/saha/dashboard")({
  component: SahaDashboardPage,
});

type Assignment = {
  assignment_id: string;
  booking_id: string;
  customer_name: string;
  service_type: string;
  shift_start_date: string;
  shift_type: string;
  city: string;
  address: string;
  status: string;
};

type Attendance = {
  attendance_id: string;
  check_in_time: string;
  check_out_time: string;
  check_in_date: string;
  status: string;
};

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    scheduled: "bg-blue-100 text-blue-700",
    active: "bg-emerald-100 text-emerald-700",
    completed: "bg-slate-100 text-slate-600",
    cancelled: "bg-red-100 text-red-600",
    checked_in: "bg-emerald-100 text-emerald-700",
    present: "bg-emerald-100 text-emerald-700",
    absent: "bg-red-100 text-red-600",
    late: "bg-amber-100 text-amber-700",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${map[status] ?? "bg-muted text-muted-foreground"}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

function SahaDashboardPage() {
  const navigate = useNavigate();
  const { user, role, isLoading, logout, profile } = useAuth();
  const [tab, setTab] = useState<"assignments" | "attendance" | "availability" | "leave">("assignments");
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [checkInLoading, setCheckInLoading] = useState(false);
  const [todayAttendance, setTodayAttendance] = useState<Attendance | null>(null);

  // Auth guard
  useEffect(() => {
    if (!isLoading && (!user || role !== "SAHA")) {
      navigate({ to: "/saha/login" });
    }
  }, [isLoading, user, role, navigate]);

  // Load data
  useEffect(() => {
    if (!user || role !== "SAHA") return;
    setDataLoading(true);
    Promise.all([
      fetch("/api/sahas/assignments", { credentials: "include" }).then(r => r.json()),
      fetch("/api/sahas/attendance", { credentials: "include" }).then(r => r.json()),
    ]).then(([asgn, att]) => {
      if (asgn.assignments) setAssignments(asgn.assignments);
      if (att.attendance) {
        setAttendance(att.attendance);
        const today = new Date().toISOString().slice(0, 10);
        setTodayAttendance(att.attendance.find((a: Attendance) => a.check_in_date === today) ?? null);
      }
    }).catch(() => toast.error("Failed to load data."))
      .finally(() => setDataLoading(false));
  }, [user, role]);

  async function handleCheckIn() {
    setCheckInLoading(true);
    try {
      const pos = await new Promise<GeolocationPosition>((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, { timeout: 10000 })
      ).catch(() => null);

      const body: Record<string, unknown> = {};
      if (pos) {
        body.latitude = pos.coords.latitude;
        body.longitude = pos.coords.longitude;
      }

      const r = await fetch("/api/sahas/attendance/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await r.json();
      if (r.ok) {
        setTodayAttendance(data.attendance);
        toast.success("Checked in successfully! 🎉");
      } else {
        toast.error(data.error || "Check-in failed.");
      }
    } finally {
      setCheckInLoading(false);
    }
  }

  async function handleCheckOut() {
    if (!todayAttendance) return;
    setCheckInLoading(true);
    try {
      const r = await fetch("/api/sahas/attendance/check-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ attendance_id: todayAttendance.attendance_id }),
      });
      const data = await r.json();
      if (r.ok) {
        setTodayAttendance(data.attendance);
        toast.success("Checked out. Have a good rest! 👋");
      } else {
        toast.error(data.error || "Check-out failed.");
      }
    } finally {
      setCheckInLoading(false);
    }
  }

  async function handleLogout() {
    await logout();
    navigate({ to: "/" });
  }

  if (isLoading || (!user && !isLoading)) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="size-8 animate-spin text-emerald-600" /></div>;
  }

  const sahaProfile = profile as Record<string, string> | null;
  const verificationStatus = sahaProfile?.verification_status ?? "pending";
  const isCheckedIn = todayAttendance && !todayAttendance.check_out_time;

  return (
    <div className="min-h-screen bg-[#F0FDF4]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="container-page flex items-center justify-between h-16 max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-emerald-100 flex items-center justify-center">
              <UserCheck className="size-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Saha Portal</p>
              <p className="text-sm font-semibold text-foreground">{user?.name ?? "Saha"}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground gap-2">
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>

      <div className="container-page py-6 max-w-lg mx-auto space-y-5">
        {/* Verification Banner */}
        {verificationStatus === "pending" && (
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
            <AlertCircle className="size-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-700">Verification Pending</p>
              <p className="text-xs text-amber-600 mt-0.5">Your application is under review. Our coordinator will contact you to collect documents.</p>
            </div>
          </div>
        )}
        {verificationStatus === "approved" && (
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3">
            <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-sm font-semibold text-emerald-700">Profile Verified ✓</p>
          </div>
        )}

        {/* Check In / Out Card */}
        <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">Today's Attendance</p>
              <p className="text-xs text-muted-foreground mt-0.5">{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</p>
            </div>
            {todayAttendance && <StatusBadge status={isCheckedIn ? "checked_in" : "present"} />}
          </div>

          {todayAttendance ? (
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Clock className="size-4 text-emerald-500" /> Checked in at <strong className="text-foreground">{todayAttendance.check_in_time}</strong></div>
              {todayAttendance.check_out_time && <div className="flex items-center gap-2"><CheckCircle2 className="size-4 text-slate-500" /> Checked out at <strong className="text-foreground">{todayAttendance.check_out_time}</strong></div>}
            </div>
          ) : null}

          {!todayAttendance ? (
            <Button onClick={handleCheckIn} disabled={checkInLoading} className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base">
              {checkInLoading ? <Loader2 className="size-5 animate-spin" /> : "🟢 Check In"}
            </Button>
          ) : isCheckedIn ? (
            <Button onClick={handleCheckOut} disabled={checkInLoading} variant="outline" className="w-full h-12 rounded-xl border-2 font-bold text-base border-slate-300">
              {checkInLoading ? <Loader2 className="size-5 animate-spin" /> : "⭕ Check Out"}
            </Button>
          ) : (
            <div className="rounded-xl bg-slate-50 border border-slate-200 py-3 text-center text-sm text-slate-500 font-medium">
              ✅ Shift complete for today
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="flex border-b border-border overflow-x-auto">
            {([
              { id: "assignments", icon: CalendarDays, label: "Assignments" },
              { id: "attendance", icon: Clock, label: "Attendance" },
              { id: "availability", icon: Calendar, label: "Availability" },
              { id: "leave", icon: FileText, label: "Leave" },
            ] as const).map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 text-xs font-semibold whitespace-nowrap transition-colors min-w-[80px] ${tab === t.id ? "bg-emerald-600 text-white" : "text-muted-foreground hover:bg-muted/40"}`}
              >
                <t.icon className="size-4" />
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-5">
            {/* Assignments */}
            {tab === "assignments" && (
              <div className="space-y-3">
                {dataLoading ? (
                  <div className="py-10 flex justify-center"><Loader2 className="size-6 animate-spin text-emerald-600" /></div>
                ) : assignments.length === 0 ? (
                  <div className="py-10 text-center">
                    <CalendarDays className="size-10 mx-auto text-muted-foreground/40 mb-3" />
                    <p className="text-muted-foreground font-medium">No assignments yet</p>
                  </div>
                ) : assignments.map(a => (
                  <div key={a.assignment_id} className="rounded-xl border border-border p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">{a.service_type}</p>
                      <StatusBadge status={a.status} />
                    </div>
                    <p className="text-xs text-muted-foreground">{a.customer_name}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><CalendarDays className="size-3" />{a.shift_start_date}</span>
                      <span className="flex items-center gap-1"><MapPin className="size-3" />{a.city}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Attendance history */}
            {tab === "attendance" && (
              <div className="space-y-3">
                {dataLoading ? (
                  <div className="py-10 flex justify-center"><Loader2 className="size-6 animate-spin text-emerald-600" /></div>
                ) : attendance.length === 0 ? (
                  <div className="py-10 text-center">
                    <Clock className="size-10 mx-auto text-muted-foreground/40 mb-3" />
                    <p className="text-muted-foreground font-medium">No attendance records yet</p>
                  </div>
                ) : attendance.slice(0, 30).map(a => (
                  <div key={a.attendance_id} className="rounded-xl border border-border p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{a.check_in_date}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {a.check_in_time} {a.check_out_time ? `→ ${a.check_out_time}` : "— not checked out"}
                      </p>
                    </div>
                    <StatusBadge status={a.status} />
                  </div>
                ))}
              </div>
            )}

            {/* Availability */}
            {tab === "availability" && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Set your weekly availability so our coordinators can assign you to suitable bookings.</p>
                <div className="rounded-xl bg-muted/40 border border-border p-4 text-sm text-center text-muted-foreground">
                  Availability calendar — coming soon. Contact your coordinator for schedule changes.
                </div>
              </div>
            )}

            {/* Leave */}
            {tab === "leave" && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Submit a leave request. Your coordinator will review and notify customers.</p>
                <div className="rounded-xl bg-muted/40 border border-border p-4 text-sm text-center text-muted-foreground">
                  Leave request form — coming soon. Please WhatsApp your coordinator for urgent leaves.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

