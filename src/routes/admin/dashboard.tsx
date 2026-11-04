import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShieldCheck,
  Users,
  UserCheck,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Phone,
  FileSpreadsheet,
  RefreshCw,
  LogOut,
  Loader2,
  AlertCircle,
  Filter,
  Download,
  Building2,
} from "lucide-react";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/dashboard")({
  head: () =>
    seo("Command Operations Desk — ApnaCare", "Super Admin and operations dashboard for ApnaCare.", {
      noindex: true,
    }),
  component: () => (
    <ProtectedRoute requiredRole="SUPER_ADMIN">
      <AdminDashboard />
    </ProtectedRoute>
  ),
});

function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "sahas" | "customers" | "attendance" | "reports">("overview");

  // State data
  const [kpis, setKpis] = useState<any>({});
  const [bookings, setBookings] = useState<any[]>([]);
  const [sahas, setSahas] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Filters
  const [cityFilter, setCityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [dashRes, bookRes, sahaRes, custRes, attRes] = await Promise.all([
        fetch("/api/admin/dashboard", { credentials: "include" }),
        fetch("/api/admin/bookings", { credentials: "include" }),
        fetch("/api/admin/sahas", { credentials: "include" }),
        fetch("/api/admin/customers", { credentials: "include" }),
        fetch("/api/admin/attendance", { credentials: "include" }),
      ]);

      if (dashRes.ok) {
        const d = await dashRes.json();
        setKpis(d.kpis || {});
      }
      if (bookRes.ok) {
        const b = await bookRes.json();
        setBookings(b.bookings || []);
      }
      if (sahaRes.ok) {
        const s = await sahaRes.json();
        setSahas(s.sahas || []);
      }
      if (custRes.ok) {
        const c = await custRes.json();
        setCustomers(c.customers || []);
      }
      if (attRes.ok) {
        const a = await attRes.json();
        setAttendance(a.attendance || []);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSahaStatus = async (sahaId: string, action: "approve" | "reject" | "suspend") => {
    setActionMessage(null);
    try {
      const res = await fetch(`/api/admin/sahas/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ sahaId }),
      });

      if (res.ok) {
        setActionMessage(`Saha ${action}d successfully.`);
        loadData();
      } else {
        setActionMessage(`Failed to ${action} Saha.`);
      }
    } catch {
      setActionMessage("Error executing action.");
    }
  };

  const handleAssignSaha = async (bookingId: string, sahaId: string) => {
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ assignedSahaId: sahaId, status: "SAHA_ASSIGNED" }),
      });
      if (res.ok) {
        setActionMessage("Saha assigned to booking.");
        loadData();
      }
    } catch {
      setActionMessage("Error assigning Saha.");
    }
  };

  const exportCsv = (filename: string, rows: any[]) => {
    if (!rows || !rows.length) return;
    const headers = Object.keys(rows[0]).join(",");
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows.map((r) => Object.values(r).map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))].join("\n");
    const encoded = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encoded);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const approvedSahas = sahas.filter((s) => s.approvalStatus === "APPROVED");

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Admin Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-white/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="size-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-serif font-semibold">Command Operations Desk</h1>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  SUPER ADMIN
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                ApnaCare 24/7 South India Care Dispatch & Matching Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={loadData}
              className="rounded-xl border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
            >
              <RefreshCw className="size-3.5 mr-1.5" />
              <span>Refresh</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="rounded-xl border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
            >
              <LogOut className="size-3.5 mr-1.5" />
              <span>Exit Desk</span>
            </Button>
          </div>
        </div>

        {actionMessage && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-medium">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Tab Strip */}
        <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          {[
            { id: "overview", label: "Operations Overview" },
            { id: "bookings", label: `Bookings (${bookings.length})` },
            { id: "sahas", label: `Sahas (${sahas.length})` },
            { id: "customers", label: `Customers (${customers.length})` },
            { id: "attendance", label: `Live Attendance (${attendance.length})` },
            { id: "reports", label: "Data Reports & Export" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === t.id
                  ? "bg-slate-900 text-white shadow-soft"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
                <span className="text-[11px] font-medium text-slate-500">Total Families</span>
                <div className="text-2xl font-bold text-slate-900 mt-1">{kpis.totalCustomers || 0}</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
                <span className="text-[11px] font-medium text-slate-500">Registered Sahas</span>
                <div className="text-2xl font-bold text-slate-900 mt-1">{kpis.totalSahas || 0}</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
                <span className="text-[11px] font-medium text-amber-600">Pending Approvals</span>
                <div className="text-2xl font-bold text-amber-600 mt-1">{kpis.pendingApprovals || 0}</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
                <span className="text-[11px] font-medium text-slate-500">Total Bookings</span>
                <div className="text-2xl font-bold text-slate-900 mt-1">{kpis.totalBookings || 0}</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
                <span className="text-[11px] font-medium text-emerald-600">Active Services</span>
                <div className="text-2xl font-bold text-emerald-600 mt-1">{kpis.activeBookings || 0}</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
                <span className="text-[11px] font-medium text-slate-500">Today Check-Ins</span>
                <div className="text-2xl font-bold text-slate-900 mt-1">{kpis.todayCheckIns || 0}</div>
              </div>
            </div>

            {/* Quick Action: Pending Saha Approvals Banner */}
            {sahas.filter((s) => s.approvalStatus === "PENDING_REVIEW").length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6">
                <h3 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <Clock className="size-4" />
                  <span>Sahas Awaiting Document & Clinical Approval ({sahas.filter((s) => s.approvalStatus === "PENDING_REVIEW").length})</span>
                </h3>
                <div className="space-y-3">
                  {sahas
                    .filter((s) => s.approvalStatus === "PENDING_REVIEW")
                    .map((s) => (
                      <div
                        key={s.sahaId}
                        className="bg-white p-4 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <strong className="text-slate-900">{s.fullName}</strong> • {s.city} • Exp: {s.experience}
                          <div className="text-slate-500 mt-0.5">
                            Qualifications: {s.qualifications} | Capabilities: {(s.serviceCapabilities || []).join(", ")}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSahaStatus(s.sahaId, "approve")}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs h-8"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSahaStatus(s.sahaId, "reject")}
                            className="text-rose-600 hover:bg-rose-50 rounded-xl text-xs h-8"
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BOOKINGS */}
        {activeTab === "bookings" && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-soft space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Manage Care Bookings & Saha Assignment</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="pb-3 font-medium">Booking ID</th>
                    <th className="pb-3 font-medium">Recipient</th>
                    <th className="pb-3 font-medium">Service</th>
                    <th className="pb-3 font-medium">City</th>
                    <th className="pb-3 font-medium">Start Date</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Assigned Saha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((b) => (
                    <tr key={b.bookingId}>
                      <td className="py-3 font-mono text-slate-600">{b.bookingId}</td>
                      <td className="py-3 font-semibold text-slate-900">{b.recipientName}</td>
                      <td className="py-3 text-slate-600">{b.serviceType}</td>
                      <td className="py-3 text-slate-600">{b.city}</td>
                      <td className="py-3 text-slate-600">{b.startDate}</td>
                      <td className="py-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800">
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <select
                          value={b.assignedSahaId || ""}
                          onChange={(e) => handleAssignSaha(b.bookingId, e.target.value)}
                          className="h-8 rounded-lg border border-slate-300 text-xs px-2 bg-white"
                        >
                          <option value="">-- Assign Saha --</option>
                          {approvedSahas.map((s) => (
                            <option key={s.sahaId} value={s.sahaId}>
                              {s.fullName} ({s.city})
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SAHAS */}
        {activeTab === "sahas" && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-soft space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Saha Care Team Directory</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">City</th>
                    <th className="pb-3 font-medium">Experience</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sahas.map((s) => (
                    <tr key={s.sahaId}>
                      <td className="py-3 font-semibold text-slate-900">{s.fullName}</td>
                      <td className="py-3 text-slate-600">{s.city}</td>
                      <td className="py-3 text-slate-600">{s.experience}</td>
                      <td className="py-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {s.approvalStatus}
                        </span>
                      </td>
                      <td className="py-3 space-x-2">
                        {s.approvalStatus !== "APPROVED" && (
                          <button
                            onClick={() => handleSahaStatus(s.sahaId, "approve")}
                            className="text-emerald-700 hover:underline font-semibold"
                          >
                            Approve
                          </button>
                        )}
                        {s.approvalStatus !== "SUSPENDED" && (
                          <button
                            onClick={() => handleSahaStatus(s.sahaId, "suspend")}
                            className="text-rose-700 hover:underline font-semibold"
                          >
                            Suspend
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOMERS */}
        {activeTab === "customers" && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-soft space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Registered Family Customers</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="pb-3 font-medium">Customer ID</th>
                    <th className="pb-3 font-medium">Full Name</th>
                    <th className="pb-3 font-medium">Email</th>
                    <th className="pb-3 font-medium">Phone</th>
                    <th className="pb-3 font-medium">City</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {customers.map((c) => (
                    <tr key={c.customerId}>
                      <td className="py-3 font-mono text-slate-600">{c.customerId}</td>
                      <td className="py-3 font-semibold text-slate-900">{c.fullName}</td>
                      <td className="py-3 text-slate-600">{c.email}</td>
                      <td className="py-3 text-slate-600">{c.phone}</td>
                      <td className="py-3 text-slate-600">{c.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: ATTENDANCE */}
        {activeTab === "attendance" && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-soft space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Live Attendance Telemetry</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Saha ID</th>
                    <th className="pb-3 font-medium">Booking ID</th>
                    <th className="pb-3 font-medium">Check In</th>
                    <th className="pb-3 font-medium">Check Out</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendance.map((a) => (
                    <tr key={a.attendanceId}>
                      <td className="py-3 font-medium">{a.date}</td>
                      <td className="py-3 font-mono">{a.sahaId}</td>
                      <td className="py-3 font-mono">{a.bookingId}</td>
                      <td className="py-3 text-slate-600">{a.checkInTime || "—"}</td>
                      <td className="py-3 text-slate-600">{a.checkOutTime || "—"}</td>
                      <td className="py-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: REPORTS */}
        {activeTab === "reports" && (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-soft space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Operations Data Exports</h2>
              <p className="text-xs text-slate-500 mt-1">
                Download audit-ready CSV reports for clinical governance and operations review.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Bookings Export</h3>
                  <p className="text-xs text-slate-500 mt-1">All family bookings, shift details, and Saha assignments.</p>
                </div>
                <Button
                  onClick={() => exportCsv("apnacare-bookings", bookings)}
                  className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs mt-4"
                >
                  <Download className="size-3.5 mr-1.5" />
                  <span>Download Bookings CSV</span>
                </Button>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Saha Directory Export</h3>
                  <p className="text-xs text-slate-500 mt-1">Complete Saha roster, verification statuses, and capabilities.</p>
                </div>
                <Button
                  onClick={() => exportCsv("apnacare-sahas", sahas)}
                  className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs mt-4"
                >
                  <Download className="size-3.5 mr-1.5" />
                  <span>Download Sahas CSV</span>
                </Button>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Attendance Telemetry</h3>
                  <p className="text-xs text-slate-500 mt-1">Daily shift check-ins, timestamps, and status logs.</p>
                </div>
                <Button
                  onClick={() => exportCsv("apnacare-attendance", attendance)}
                  className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs mt-4"
                >
                  <Download className="size-3.5 mr-1.5" />
                  <span>Download Attendance CSV</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

