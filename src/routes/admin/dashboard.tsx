/**
 * /admin/dashboard — Operations admin portal
 */

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ShieldCheck, LogOut, Users, UserCheck, CalendarDays, Clock,
  Loader2, TrendingUp, AlertCircle, CheckCircle2, XCircle,
  ChevronRight, Search, Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboardPage,
});

type KPIs = {
  total_customers: number;
  total_sahas: number;
  pending_sahas: number;
  total_bookings: number;
  active_bookings: number;
  today_assignments: number;
  checked_in_today: number;
  absent_today: number;
};

type Booking = {
  booking_id: string;
  customer_name: string;
  service_type: string;
  booking_status: string;
  shift_start_date: string;
  city: string;
  assigned_saha_name?: string;
};

type Saha = {
  saha_id: string;
  full_name: string;
  city: string;
  approval_status: string;
  verification_status: string;
  service_capabilities: string;
};

type Customer = {
  customer_id: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  account_status: string;
};

type AttendanceRecord = {
  attendance_id: string;
  saha_name: string;
  check_in_date: string;
  check_in_time: string;
  check_out_time: string;
  status: string;
  exception_flag: string;
};

function StatusBadge({ status, variant = "default" }: { status: string; variant?: "default" | "saha" }) {
  const statusMap: Record<string, string> = {
    confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    completed: "bg-slate-100 text-slate-600 border-slate-200",
    cancelled: "bg-red-100 text-red-600 border-red-200",
    in_progress: "bg-blue-100 text-blue-700 border-blue-200",
    approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    rejected: "bg-red-100 text-red-600 border-red-200",
    active: "bg-emerald-100 text-emerald-700 border-emerald-200",
    suspended: "bg-red-100 text-red-600 border-red-200",
    present: "bg-emerald-100 text-emerald-700",
    absent: "bg-red-100 text-red-600",
    late: "bg-amber-100 text-amber-700",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${statusMap[status] ?? "bg-muted text-muted-foreground border-border"}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

function AdminDashboardPage() {
  const navigate = useNavigate();
  const { user, role, isLoading, logout } = useAuth();
  const [tab, setTab] = useState<"overview" | "sahas" | "customers" | "bookings" | "attendance">("overview");
  const [kpis, setKpis] = useState<KPIs | null>(null);
  const [sahas, setSahas] = useState<Saha[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Auth guard
  useEffect(() => {
    if (!isLoading && (!user || role !== "SUPER_ADMIN")) {
      navigate({ to: "/admin/login" });
    }
  }, [isLoading, user, role, navigate]);

  // Load data
  useEffect(() => {
    if (!user || role !== "SUPER_ADMIN") return;
    setDataLoading(true);
    Promise.all([
      fetch("/api/admin/dashboard", { credentials: "include" }).then(r => r.json()),
      fetch("/api/admin/sahas", { credentials: "include" }).then(r => r.json()),
      fetch("/api/admin/customers", { credentials: "include" }).then(r => r.json()),
      fetch("/api/admin/bookings", { credentials: "include" }).then(r => r.json()),
      fetch("/api/admin/attendance", { credentials: "include" }).then(r => r.json()),
    ]).then(([dash, sahaData, custData, bkData, attData]) => {
      if (dash.kpis) setKpis(dash.kpis);
      if (sahaData.sahas) setSahas(sahaData.sahas);
      if (custData.customers) setCustomers(custData.customers);
      if (bkData.bookings) setBookings(bkData.bookings);
      if (attData.attendance) setAttendance(attData.attendance);
    }).catch(() => toast.error("Failed to load admin data."))
      .finally(() => setDataLoading(false));
  }, [user, role]);

  async function approveSaha(id: string) {
    setActionLoading(id);
    const r = await fetch("/api/admin/sahas/approve", {
      method: "POST", headers: { "Content-Type": "application/json" },
      credentials: "include", body: JSON.stringify({ saha_id: id }),
    });
    const data = await r.json();
    if (r.ok) {
      setSahas(s => s.map(x => x.saha_id === id ? { ...x, approval_status: "approved" } : x));
      toast.success(`${data.name ?? "Saha"} approved!`);
    } else toast.error(data.error || "Failed to approve.");
    setActionLoading(null);
  }

  async function rejectSaha(id: string) {
    setActionLoading(id);
    const r = await fetch("/api/admin/sahas/reject", {
      method: "POST", headers: { "Content-Type": "application/json" },
      credentials: "include", body: JSON.stringify({ saha_id: id, reason: "Does not meet requirements" }),
    });
    const data = await r.json();
    if (r.ok) {
      setSahas(s => s.map(x => x.saha_id === id ? { ...x, approval_status: "rejected" } : x));
      toast.success("Saha rejected.");
    } else toast.error(data.error || "Failed to reject.");
    setActionLoading(null);
  }

  function exportCSV(rows: object[], name: string) {
    if (!rows.length) return;
    const keys = Object.keys(rows[0]);
    const csv = [keys.join(","), ...rows.map(r => keys.map(k => `"${(r as Record<string,unknown>)[k] ?? ""}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${name}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  async function handleLogout() { await logout(); navigate({ to: "/" }); }

  if (isLoading || (!user && !isLoading)) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="size-8 animate-spin text-slate-600" /></div>;
  }

  const filteredSahas = sahas.filter(s => s.full_name.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase()));
  const filteredCustomers = customers.filter(c => c.full_name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));
  const filteredBookings = bookings.filter(b => b.customer_name?.toLowerCase().includes(search.toLowerCase()) || b.service_type?.toLowerCase().includes(search.toLowerCase()));
  const pendingSahas = sahas.filter(s => s.approval_status === "pending");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="container-page flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-slate-100 flex items-center justify-center">
              <ShieldCheck className="size-5 text-slate-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Operations Admin</p>
              <p className="text-sm font-semibold text-foreground">{user?.name ?? "Admin"}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground gap-2">
            <LogOut className="size-4" /> Sign out
          </Button>
        </div>
      </div>

      {/* Pending Sahas Alert */}
      {pendingSahas.length > 0 && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5">
          <div className="container-page flex items-center gap-2 text-amber-700 text-sm">
            <AlertCircle className="size-4 shrink-0" />
            <span><strong>{pendingSahas.length} Saha{pendingSahas.length > 1 ? "s" : ""}</strong> pending approval.</span>
            <button onClick={() => setTab("sahas")} className="ml-auto text-xs font-semibold underline">Review now</button>
          </div>
        </div>
      )}

      <div className="container-page py-6 space-y-6 max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-border pb-0">
          {([
            { id: "overview", icon: TrendingUp, label: "Overview" },
            { id: "sahas", icon: UserCheck, label: `Sahas${pendingSahas.length ? ` (${pendingSahas.length})` : ""}` },
            { id: "customers", icon: Users, label: "Customers" },
            { id: "bookings", icon: CalendarDays, label: "Bookings" },
            { id: "attendance", icon: Clock, label: "Attendance" },
          ] as const).map(t => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setSearch(""); }}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-t-lg border-b-2 transition-colors ${tab === t.id ? "border-slate-700 text-slate-700 bg-white" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              <t.icon className="size-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === "overview" && (
          <div className="space-y-6">
            {dataLoading ? (
              <div className="py-16 flex justify-center"><Loader2 className="size-8 animate-spin text-slate-500" /></div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total Customers", value: kpis?.total_customers ?? 0, icon: Users, color: "text-primary" },
                    { label: "Total Sahas", value: kpis?.total_sahas ?? 0, icon: UserCheck, color: "text-emerald-600" },
                    { label: "Active Bookings", value: kpis?.active_bookings ?? 0, icon: CalendarDays, color: "text-blue-600" },
                    { label: "Today Checked In", value: kpis?.checked_in_today ?? 0, icon: CheckCircle2, color: "text-emerald-600" },
                  ].map(kpi => (
                    <div key={kpi.label} className="bg-white rounded-2xl border border-border p-5">
                      <kpi.icon className={`size-5 mb-2 ${kpi.color}`} />
                      <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl border border-border p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Today's Operations</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span>Scheduled</span><strong>{kpis?.today_assignments ?? 0}</strong></div>
                      <div className="flex justify-between text-emerald-600"><span>Checked In</span><strong>{kpis?.checked_in_today ?? 0}</strong></div>
                      <div className="flex justify-between text-red-600"><span>Absent</span><strong>{kpis?.absent_today ?? 0}</strong></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-border p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Saha Pipeline</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span>Total</span><strong>{kpis?.total_sahas ?? 0}</strong></div>
                      <div className="flex justify-between text-amber-600"><span>Pending Review</span><strong>{kpis?.pending_sahas ?? 0}</strong></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-border p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Quick Actions</p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start rounded-xl" onClick={() => setTab("sahas")}>
                        Review Saha Applications <ChevronRight className="size-4 ml-auto" />
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start rounded-xl" onClick={() => setTab("attendance")}>
                        View Today's Attendance <ChevronRight className="size-4 ml-auto" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Sahas */}
        {tab === "sahas" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder="Search Sahas by name or city…" value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-10 rounded-xl" />
              </div>
              <Button variant="outline" size="sm" className="rounded-xl gap-2" onClick={() => exportCSV(sahas, "sahas")}>
                <Filter className="size-4" /> Export CSV
              </Button>
            </div>

            {dataLoading ? (
              <div className="py-16 flex justify-center"><Loader2 className="size-8 animate-spin text-slate-500" /></div>
            ) : (
              <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 border-b border-border">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden md:table-cell">City</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Capabilities</th>
                      <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredSahas.map(s => (
                      <tr key={s.saha_id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{s.full_name}</td>
                        <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{s.city}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-1">
                            <StatusBadge status={s.approval_status} />
                            {s.verification_status !== s.approval_status && <StatusBadge status={s.verification_status} />}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell text-xs max-w-[200px] truncate">{s.service_capabilities}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            {s.approval_status === "pending" && (
                              <>
                                <Button size="sm" disabled={actionLoading === s.saha_id} onClick={() => approveSaha(s.saha_id)}
                                  className="h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                                  {actionLoading === s.saha_id ? <Loader2 className="size-3 animate-spin" /> : "Approve"}
                                </Button>
                                <Button size="sm" variant="outline" disabled={actionLoading === s.saha_id} onClick={() => rejectSaha(s.saha_id)}
                                  className="h-8 rounded-lg text-red-600 border-red-200 hover:bg-red-50 text-xs">
                                  Reject
                                </Button>
                              </>
                            )}
                            {s.approval_status !== "pending" && (
                              <span className="text-xs text-muted-foreground italic">No actions</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredSahas.length === 0 && (
                  <div className="py-12 text-center text-muted-foreground text-sm">No Sahas found.</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Customers */}
        {tab === "customers" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder="Search customers…" value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-10 rounded-xl" />
              </div>
              <Button variant="outline" size="sm" className="rounded-xl gap-2" onClick={() => exportCSV(customers, "customers")}>
                <Filter className="size-4" /> Export CSV
              </Button>
            </div>
            {dataLoading ? (
              <div className="py-16 flex justify-center"><Loader2 className="size-8 animate-spin" /></div>
            ) : (
              <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 border-b border-border">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Email</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Phone</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">City</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredCustomers.map(c => (
                      <tr key={c.customer_id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{c.full_name}</td>
                        <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{c.email}</td>
                        <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{c.phone}</td>
                        <td className="px-4 py-3 text-muted-foreground">{c.city}</td>
                        <td className="px-4 py-3"><StatusBadge status={c.account_status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredCustomers.length === 0 && <div className="py-12 text-center text-muted-foreground text-sm">No customers found.</div>}
              </div>
            )}
          </div>
        )}

        {/* Bookings */}
        {tab === "bookings" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder="Search bookings…" value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-10 rounded-xl" />
              </div>
              <Button variant="outline" size="sm" className="rounded-xl gap-2" onClick={() => exportCSV(bookings, "bookings")}>
                <Filter className="size-4" /> Export CSV
              </Button>
            </div>
            {dataLoading ? (
              <div className="py-16 flex justify-center"><Loader2 className="size-8 animate-spin" /></div>
            ) : (
              <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 border-b border-border">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Customer</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Service</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Date</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">City</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Assigned Saha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredBookings.map(b => (
                      <tr key={b.booking_id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{b.customer_name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{b.service_type}</td>
                        <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{b.shift_start_date}</td>
                        <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{b.city}</td>
                        <td className="px-4 py-3"><StatusBadge status={b.booking_status} /></td>
                        <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{b.assigned_saha_name ?? <span className="italic text-xs">Unassigned</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredBookings.length === 0 && <div className="py-12 text-center text-muted-foreground text-sm">No bookings found.</div>}
              </div>
            )}
          </div>
        )}

        {/* Attendance */}
        {tab === "attendance" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder="Search by Saha name…" value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-10 rounded-xl" />
              </div>
              <Button variant="outline" size="sm" className="rounded-xl gap-2" onClick={() => exportCSV(attendance, "attendance")}>
                <Filter className="size-4" /> Export CSV
              </Button>
            </div>

            {/* Today KPIs */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Scheduled", value: attendance.length, color: "text-slate-700" },
                { label: "Checked In", value: attendance.filter(a => a.check_in_time).length, color: "text-emerald-600" },
                { label: "Absent", value: attendance.filter(a => a.status === "absent").length, color: "text-red-600" },
              ].map(k => (
                <div key={k.label} className="bg-white rounded-2xl border border-border p-4 text-center">
                  <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                </div>
              ))}
            </div>

            {dataLoading ? (
              <div className="py-16 flex justify-center"><Loader2 className="size-8 animate-spin" /></div>
            ) : (
              <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 border-b border-border">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Saha</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Date</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Check In</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Check Out</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {attendance.filter(a => a.saha_name?.toLowerCase().includes(search.toLowerCase())).map(a => (
                      <tr key={a.attendance_id} className={`hover:bg-muted/20 transition-colors ${a.exception_flag ? "bg-red-50/40" : ""}`}>
                        <td className="px-4 py-3 font-medium text-foreground flex items-center gap-2">
                          {a.exception_flag && <AlertCircle className="size-3.5 text-red-500 shrink-0" />}
                          {a.saha_name}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{a.check_in_date}</td>
                        <td className="px-4 py-3 text-muted-foreground">{a.check_in_time || "—"}</td>
                        <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{a.check_out_time || "—"}</td>
                        <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {attendance.length === 0 && <div className="py-12 text-center text-muted-foreground text-sm">No attendance records for today.</div>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

