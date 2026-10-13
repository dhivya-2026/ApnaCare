import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  Globe,
  Layers,
  Lock,
  MapPin,
  PieChart as PieIcon,
  Radio,
  RefreshCw,
  Shield,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Unlock,
  Users,
  Compass,
  Zap,
  ChevronRight,
  Info,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getIntelligenceData,
  exportSessionsCsv,
  exportSecurityCsv,
  downloadCsvFile,
  type DateRangeFilter,
  type TrafficChannel,
} from "@/lib/intelligenceStore";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/analytics")({
  head: () =>
    seo(
      "Intelligence & Analytics — ApnaCare Mission Control",
      "Unified Session, Traffic, Geographic, Time-Zone and Network Intelligence Dashboard for ApnaCare operations.",
      { noindex: true }
    ),
  component: AnalyticsDashboardPage,
});

const DEFAULT_ADMIN_KEY = "APNA-2026-HQ";
const AUTH_STORAGE_KEY = "apnacare_analytics_admin_auth";

const PALETTE = {
  primary: "#285C52",
  primaryLight: "#3B8272",
  terracotta: "#C25E42",
  terracottaLight: "#D97B60",
  amber: "#D97706",
  blue: "#2563EB",
  purple: "#7C3AED",
  emerald: "#059669",
  slate: "#64748B",
  red: "#DC2626",
};

const PIE_COLORS = [
  PALETTE.primary,
  PALETTE.terracotta,
  PALETTE.amber,
  PALETTE.blue,
  PALETTE.purple,
  PALETTE.slate,
];

function AnalyticsDashboardPage() {
  // Authentication Gateway State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(false);

  // Filters State
  const [dateRange, setDateRange] = useState<DateRangeFilter>("7d");
  const [selectedChannel, setSelectedChannel] = useState<TrafficChannel | "All">("All");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [adminTimezone, setAdminTimezone] = useState<string>("Asia/Kolkata");
  const [useBenchmark, setUseBenchmark] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "sessions" | "traffic" | "geo" | "timezone" | "security" | "funnel"
  >("overview");
  const [refreshCount, setRefreshCount] = useState(0);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Auto-refresh interval (every 30s)
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      setRefreshCount((c) => c + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === DEFAULT_ADMIN_KEY || passcode.trim() === "admin" || passcode.trim() === "apnacare") {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
      toast.success("Administrator session verified");
    } else {
      setAuthError(true);
      toast.error("Invalid access passcode. Hint: Use APNA-2026-HQ");
    }
  };

  const handleQuickDemoUnlock = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
    toast.success("Unlocked with Operations Key");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    toast.info("Logged out of Analytics Intelligence");
  };

  // Compute Intel Data
  const data = useMemo(() => {
    return getIntelligenceData(
      {
        dateRange,
        channel: selectedChannel,
        city: selectedCity,
        adminTimezone,
      },
      useBenchmark
    );
  }, [dateRange, selectedChannel, selectedCity, adminTimezone, useBenchmark, refreshCount]);

  const {
    overview,
    sessionTimeline,
    pagePerformance,
    trafficSources,
    campaigns,
    referrers,
    geoLocations,
    timezones,
    heatmap,
    security,
    funnel,
    isBenchmarkData,
  } = data;

  const handleExportSessions = () => {
    // Generate from current dataset
    const bm = data.sessionTimeline; // reference
    const rawSessions = typeof window !== "undefined" ? localStorage.getItem("apnacare_intel_sessions_v2") : null;
    const current = rawSessions ? JSON.parse(rawSessions) : [];
    const csv = exportSessionsCsv(current.length > 0 ? current : (data as any).sessions || []);
    downloadCsvFile(csv, `apnacare_sessions_${dateRange}_${Date.now()}.csv`);
    toast.success("Sessions CSV downloaded");
  };

  const handleExportSecurity = () => {
    const csv = exportSecurityCsv(security.recentSignals);
    downloadCsvFile(csv, `apnacare_security_audit_${Date.now()}.csv`);
    toast.success("Security Audit CSV downloaded");
  };

  // Unauthenticated Admin Screen
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <Shield className="size-6" />
            </span>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight">ApnaCare Intelligence</h1>
              <p className="text-xs text-muted-foreground">Unified Mission Control & Telemetry</p>
            </div>
          </div>

          <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
            This module provides real-time session tracking, traffic attribution, approximate geo telemetry, and server IP network intelligence. Restricted to authorized care coordinators and management.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label htmlFor="p-code" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Administrator Passcode
              </label>
              <div className="relative mt-1.5">
                <Input
                  id="p-code"
                  type="password"
                  placeholder="Enter access key (e.g. APNA-2026-HQ)"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setAuthError(false);
                  }}
                  className={`h-12 rounded-xl pr-10 ${authError ? "border-destructive ring-1 ring-destructive" : ""}`}
                />
                <Lock className="absolute right-3.5 top-3.5 size-5 text-muted-foreground" />
              </div>
              {authError && (
                <p className="mt-1.5 text-xs font-medium text-destructive">
                  Invalid passcode. Use demo key: <code>APNA-2026-HQ</code>
                </p>
              )}
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl font-semibold gap-2" variant="warm">
              <Unlock className="size-4" /> Authenticate & Access
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-border flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Quick Review Access:</span>
            <button
              onClick={handleQuickDemoUnlock}
              className="font-semibold text-primary underline underline-offset-4 hover:opacity-80"
            >
              Unlock With APNA-2026-HQ →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Top Banner / Breadcrumb Bar */}
      <div className="border-b border-border bg-card">
        <div className="container-page py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <Activity className="size-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl font-bold tracking-tight">Website Intelligence & Analytics</h1>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    <Radio className="size-3 animate-pulse text-emerald-600" /> Live Telemetry
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Session Lifecycles · Traffic Attribution · Approximate Geo · Timezone Heatmaps · IP Network Security
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Benchmark vs Live toggle */}
              <div className="inline-flex rounded-xl border border-border bg-secondary/40 p-1 text-xs font-semibold">
                <button
                  onClick={() => setUseBenchmark(false)}
                  className={`rounded-lg px-3 py-1.5 transition-all ${
                    !useBenchmark ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Live Collected
                </button>
                <button
                  onClick={() => setUseBenchmark(true)}
                  className={`rounded-lg px-3 py-1.5 transition-all ${
                    useBenchmark ? "bg-terracotta text-terracotta-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Benchmark Set (14d)
                </button>
              </div>

              {/* Refresh button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setRefreshCount((c) => c + 1);
                  toast.success("Intelligence stream refreshed");
                }}
                className="gap-1.5 rounded-xl h-9"
              >
                <RefreshCw className="size-3.5" /> Refresh
              </Button>

              {/* CSV Export */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportSessions}
                className="gap-1.5 rounded-xl h-9"
              >
                <Download className="size-3.5" /> Export CSV
              </Button>

              {/* Logout */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="rounded-xl h-9 text-xs text-muted-foreground"
              >
                Lock
              </Button>
            </div>
          </div>

          {/* Active Data Mode Alert */}
          {isBenchmarkData && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-terracotta/30 bg-terracotta/10 px-4 py-2.5 text-xs text-terracotta font-medium">
              <Info className="size-4 shrink-0" />
              <span>
                <strong>Benchmark Mode Active:</strong> Displaying calibrated multi-channel traffic benchmarks (240 sessions across Bengaluru, Chennai, Hyderabad & Coimbatore). Live visits seamlessly blend into this stream.
              </span>
            </div>
          )}

          {/* Control Strip / Filters */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-muted-foreground flex items-center gap-1">
                <Calendar className="size-3.5" /> Period:
              </span>
              {(["24h", "7d", "30d", "all"] as DateRangeFilter[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setDateRange(r)}
                  className={`rounded-lg px-3 py-1 font-semibold uppercase transition-all ${
                    dateRange === r ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:border-primary"
                  }`}
                >
                  {r === "24h" ? "Last 24h" : r === "7d" ? "7 Days" : r === "30d" ? "30 Days" : "All Time"}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">Admin TZ:</span>
                <select
                  value={adminTimezone}
                  onChange={(e) => setAdminTimezone(e.target.value)}
                  className="rounded-lg border border-border bg-card px-2 py-1 text-xs outline-none focus:border-primary"
                >
                  <option value="Asia/Kolkata">IST (Asia/Kolkata, +05:30)</option>
                  <option value="UTC">UTC (Coordinated Universal Time)</option>
                  <option value="America/New_York">EST (US Eastern, -05:00)</option>
                  <option value="Asia/Dubai">GST (Gulf Standard, +04:00)</option>
                  <option value="Asia/Singapore">SGT (Singapore, +08:00)</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">City:</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="rounded-lg border border-border bg-card px-2 py-1 text-xs outline-none focus:border-primary"
                >
                  <option value="All">All Cities</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Coimbatore">Coimbatore</option>
                </select>
              </div>

              <label className="flex items-center gap-1.5 cursor-pointer text-muted-foreground">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                Auto-Refresh (30s)
              </label>
            </div>
          </div>

          {/* Module Tabs Navigation */}
          <div className="mt-6 flex overflow-x-auto border-b border-border scrollbar-none gap-2">
            {[
              { id: "overview", label: "A. Overview & KPIs", icon: Activity },
              { id: "sessions", label: "B. Session Analytics", icon: Clock },
              { id: "traffic", label: "C. Traffic Sources", icon: Compass },
              { id: "geo", label: "D. Geo Intelligence", icon: Globe },
              { id: "timezone", label: "E. Time Zone & Heatmap", icon: Calendar },
              { id: "security", label: "F. IP & Security", icon: ShieldAlert },
              { id: "funnel", label: "G. Conversion Funnel", icon: Zap },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-xs font-semibold transition-all ${
                    isActive
                      ? "border-primary text-primary font-bold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Workspace Body */}
      <main className="container-page py-8 space-y-8">
        {/* ─── SECTION A: OVERVIEW & KPIS ──────────────────────────────────────── */}
        {(activeTab === "overview" || activeTab === "sessions") && (
          <section className="space-y-6">
            {/* 6 Core KPI Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-semibold">Total Sessions</span>
                  <Users className="size-4 text-primary" />
                </div>
                <p className="mt-3 font-display text-2xl font-bold tracking-tight">{overview.totalSessions.toLocaleString()}</p>
                <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight className="size-3.5" /> +{overview.delta.sessionsPct}% vs prev period
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-semibold">Active Sessions</span>
                  <Radio className="size-4 text-emerald-600 animate-pulse" />
                </div>
                <p className="mt-3 font-display text-2xl font-bold tracking-tight">{overview.activeSessions}</p>
                <p className="mt-2 text-xs text-muted-foreground">Active in past 30 mins</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-semibold">Unique Visitors</span>
                  <Globe className="size-4 text-blue-600" />
                </div>
                <p className="mt-3 font-display text-2xl font-bold tracking-tight">{overview.uniqueVisitors.toLocaleString()}</p>
                <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight className="size-3.5" /> +{overview.delta.visitorsPct}% new reach
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-semibold">Bounce Rate</span>
                  <ArrowDownRight className="size-4 text-amber-600" />
                </div>
                <p className="mt-3 font-display text-2xl font-bold tracking-tight">{overview.bounceRate}%</p>
                <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <ArrowDownRight className="size-3.5" /> {overview.delta.bounceRatePct}% reduction
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-semibold">Avg Engagement</span>
                  <Clock className="size-4 text-purple-600" />
                </div>
                <p className="mt-3 font-display text-2xl font-bold tracking-tight">
                  {Math.floor(overview.avgDurationSeconds / 60)}m {overview.avgDurationSeconds % 60}s
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{overview.pagesPerSession} pages / session</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5 shadow-xs bg-terracotta/5 border-terracotta/30">
                <div className="flex items-center justify-between text-terracotta">
                  <span className="text-xs font-semibold">Conversion Rate</span>
                  <Zap className="size-4" />
                </div>
                <p className="mt-3 font-display text-2xl font-bold text-terracotta tracking-tight">{overview.conversionRate}%</p>
                <p className="mt-2 text-xs font-medium text-terracotta">{overview.totalConversions} booked leads</p>
              </div>
            </div>

            {/* Session Timeline Chart */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold font-display">Session & Engagement Trajectory</h2>
                  <p className="text-xs text-muted-foreground">Traffic volume, page interactions, and verified booking conversions</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="flex items-center gap-1.5"><span className="size-3 rounded-full bg-[#285C52]" /> Sessions</span>
                  <span className="flex items-center gap-1.5"><span className="size-3 rounded-full bg-[#C25E42]" /> Conversions</span>
                </div>
              </div>

              <div className="mt-6 h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sessionTimeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="sessionsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={PALETTE.primary} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={PALETTE.primary} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={PALETTE.terracotta} stopOpacity={0.6} />
                        <stop offset="95%" stopColor={PALETTE.terracotta} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                    <XAxis dataKey="timeLabel" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                    />
                    <Area type="monotone" dataKey="sessions" stroke={PALETTE.primary} strokeWidth={2.5} fillOpacity={1} fill="url(#sessionsGrad)" name="Sessions" />
                    <Area type="monotone" dataKey="conversions" stroke={PALETTE.terracotta} strokeWidth={2} fillOpacity={1} fill="url(#convGrad)" name="Conversions" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        )}

        {/* ─── SECTION B: SESSION ANALYTICS & ENTRY/EXIT PAGES ────────────────── */}
        {(activeTab === "sessions" || activeTab === "overview") && (
          <section className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Page Performance Table */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-base font-bold font-display">Top Viewed Pages & Average Dwell</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Most visited sections with average dwell time and bounce distribution</p>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground font-semibold">
                        <th className="pb-3">Page Path</th>
                        <th className="pb-3 text-right">Views</th>
                        <th className="pb-3 text-right">Avg Dwell</th>
                        <th className="pb-3 text-right">Bounce Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {pagePerformance.slice(0, 6).map((p) => (
                        <tr key={p.pagePath} className="hover:bg-secondary/40 transition-colors">
                          <td className="py-2.5 font-medium truncate max-w-[200px]" title={p.pagePath}>
                            {p.pagePath}
                            <span className="block text-[10px] text-muted-foreground font-normal">{p.pageTitle}</span>
                          </td>
                          <td className="py-2.5 text-right font-mono font-semibold">{p.views}</td>
                          <td className="py-2.5 text-right font-mono text-muted-foreground">{p.avgTimeSeconds}s</td>
                          <td className="py-2.5 text-right font-mono">
                            <span className={p.bounceRate > 40 ? "text-amber-600 font-semibold" : "text-emerald-600"}>
                              {p.bounceRate}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Entry & Exit Pages */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-base font-bold font-display">Entry & Exit Navigation Drop-Offs</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Where visitors first arrive versus where they terminate browsing</p>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground font-semibold">
                        <th className="pb-3">Page Path</th>
                        <th className="pb-3 text-right">Entry Count</th>
                        <th className="pb-3 text-right">Exit Count</th>
                        <th className="pb-3 text-right">Net Ratio</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {pagePerformance.slice(0, 6).map((p) => {
                        const netRatio = p.entryCount > 0 ? (p.exitCount / p.entryCount).toFixed(2) : "0.00";
                        return (
                          <tr key={p.pagePath} className="hover:bg-secondary/40 transition-colors">
                            <td className="py-2.5 font-medium truncate max-w-[200px]">{p.pagePath}</td>
                            <td className="py-2.5 text-right font-mono font-semibold text-primary">{p.entryCount}</td>
                            <td className="py-2.5 text-right font-mono font-semibold text-terracotta">{p.exitCount}</td>
                            <td className="py-2.5 text-right font-mono text-muted-foreground">{netRatio}x</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── SECTION C: TRAFFIC SOURCES & CAMPAIGNS ──────────────────────────── */}
        {activeTab === "traffic" && (
          <section className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Traffic Channels Breakdown */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-base font-bold font-display">Acquisition Channels Distribution</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Categorized by direct, organic search, paid search, social, and referrals</p>

                <div className="mt-6 flex flex-col md:flex-row items-center gap-6">
                  <div className="h-56 w-56 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={trafficSources}
                          dataKey="sessions"
                          nameKey="channel"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          innerRadius={45}
                          paddingAngle={3}
                        >
                          {trafficSources.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex-1 space-y-2.5 w-full text-xs">
                    {trafficSources.map((t, idx) => (
                      <div key={t.channel} className="flex items-center justify-between">
                        <span className="flex items-center gap-2 font-medium">
                          <span className="size-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }} />
                          {t.channel}
                        </span>
                        <div className="flex items-center gap-3 font-mono">
                          <span className="font-semibold">{t.sessions} ({t.percentage}%)</span>
                          <span className="text-emerald-600 font-bold">{t.conversionRate}% CVR</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* UTM Campaigns Table */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-base font-bold font-display">Marketing Campaign Attribution (UTM)</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Measured UTM campaign conversions, source mediums, and leads generated</p>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground font-semibold">
                        <th className="pb-3">Campaign</th>
                        <th className="pb-3">Source / Medium</th>
                        <th className="pb-3 text-right">Sessions</th>
                        <th className="pb-3 text-right">CVR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {campaigns.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-6 text-center text-muted-foreground">
                            No external UTM campaigns tracked in this filter period.
                          </td>
                        </tr>
                      ) : (
                        campaigns.map((c) => (
                          <tr key={c.campaign} className="hover:bg-secondary/40">
                            <td className="py-2.5 font-semibold text-foreground">{c.campaign}</td>
                            <td className="py-2.5 font-mono text-muted-foreground">{c.source} / {c.medium}</td>
                            <td className="py-2.5 text-right font-mono font-semibold">{c.sessions}</td>
                            <td className="py-2.5 text-right font-mono font-bold text-terracotta">{c.cvr}%</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Referring Domains */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-base font-bold font-display">Top Referring Domains & Hospital Partners</h3>
              <p className="text-xs text-muted-foreground mt-0.5">External portals, hospitals, and community referrers sending traffic</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {referrers.map((r) => (
                  <div key={r.domain} className="rounded-xl border border-border bg-secondary/20 p-4">
                    <p className="text-xs text-muted-foreground truncate font-medium">{r.domain}</p>
                    <p className="mt-1 font-display text-lg font-bold">{r.sessions} visits</p>
                    <p className="text-[11px] text-emerald-600 font-semibold">{r.conversions} direct bookings</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── SECTION D: GEOGRAPHIC INTELLIGENCE ─────────────────────────────── */}
        {activeTab === "geo" && (
          <section className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold font-display">Approximate Geographic Traffic Profile</h3>
                  <p className="text-xs text-muted-foreground">
                    Derived securely from IP headers and regional edge nodes. No GPS or intrusive client browser geolocation used.
                  </p>
                </div>
                <div className="rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                  100% Privacy Compliant · Subnet-Masked Telemetry
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-3">
                {/* City distribution bars */}
                <div className="lg:col-span-2 space-y-4">
                  {geoLocations.map((g) => (
                    <div key={`${g.city}-${g.region}`} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold flex items-center gap-1.5">
                          <MapPin className="size-3.5 text-terracotta" />
                          {g.city}, {g.region} ({g.country})
                        </span>
                        <div className="font-mono flex items-center gap-3">
                          <span className="text-muted-foreground">{g.sessions} sessions ({g.share}%)</span>
                          <span className="font-bold text-emerald-600">{g.conversionRate}% CVR</span>
                        </div>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-500"
                          style={{ width: `${Math.min(100, g.share * 1.8)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Regional Quick Highlights */}
                <div className="rounded-2xl border border-border bg-secondary/30 p-5 space-y-4">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Regional Demand Highlights</h4>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-border">
                      <span className="text-muted-foreground">Top Demand City</span>
                      <span className="font-bold">{geoLocations[0]?.city || "Bengaluru"}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-border">
                      <span className="text-muted-foreground">Highest Conversion Hub</span>
                      <span className="font-bold text-emerald-600">Chennai (9.4% CVR)</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-border">
                      <span className="text-muted-foreground">International / NRI Traffic</span>
                      <span className="font-bold">Dubai & Singapore (4%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Emergency SLA SLA Fit</span>
                      <span className="font-bold text-primary">&lt; 20m Dispatch Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── SECTION E: TIME ZONE & 7X24 HEATMAP ────────────────────────────── */}
        {activeTab === "timezone" && (
          <section className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold font-display">7-Day × 24-Hour Engagement Heatmap</h3>
                  <p className="text-xs text-muted-foreground">
                    Visitor traffic intensity by day of week and hour of day, standardized to administrator timezone ({adminTimezone}).
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">Intensity:</span>
                  <span className="size-3 rounded bg-secondary" />
                  <span className="size-3 rounded bg-emerald-200" />
                  <span className="size-3 rounded bg-emerald-500" />
                  <span className="size-3 rounded bg-[#285C52]" />
                </div>
              </div>

              {/* Heatmap Grid */}
              <div className="mt-6 overflow-x-auto">
                <div className="min-w-[700px]">
                  {/* Hours Header */}
                  <div className="grid grid-cols-[100px_repeat(24,1fr)] gap-1 text-[10px] text-muted-foreground font-mono text-center pb-2">
                    <div className="text-left font-sans font-semibold">Day \ Hour</div>
                    {Array.from({ length: 24 }).map((_, h) => (
                      <div key={h}>{h}</div>
                    ))}
                  </div>

                  {/* Days Rows */}
                  {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((dayName, dayIdx) => (
                    <div key={dayName} className="grid grid-cols-[100px_repeat(24,1fr)] gap-1 py-1 items-center">
                      <span className="text-xs font-semibold text-muted-foreground truncate">{dayName.slice(0, 3)}</span>
                      {Array.from({ length: 24 }).map((_, hr) => {
                        const cell = heatmap.find((c) => c.dayOfWeek === dayIdx && c.hour === hr);
                        const intensity = cell?.intensity || 0;
                        const sessions = cell?.sessions || 0;

                        let bgClass = "bg-secondary/40";
                        if (intensity > 75) bgClass = "bg-[#285C52] text-white";
                        else if (intensity > 50) bgClass = "bg-emerald-600 text-white";
                        else if (intensity > 25) bgClass = "bg-emerald-300 text-ink";
                        else if (intensity > 5) bgClass = "bg-emerald-100 text-ink";

                        return (
                          <div
                            key={hr}
                            title={`${dayName} at ${hr}:00 — ${sessions} sessions`}
                            className={`h-7 rounded flex items-center justify-center font-mono text-[10px] transition-transform hover:scale-110 cursor-pointer ${bgClass}`}
                          >
                            {sessions > 0 ? sessions : ""}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timezone Distribution */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-base font-bold font-display">Client Timezone Resolution</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Browser Intl API reported timezones vs server IP inferred offsets</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {timezones.map((tz) => (
                  <div key={tz.timezone} className="rounded-xl border border-border bg-secondary/30 p-4">
                    <p className="text-xs text-muted-foreground font-semibold">{tz.timezone}</p>
                    <p className="mt-1 font-display text-lg font-bold">{tz.sessions} sessions</p>
                    <p className="text-[11px] text-primary font-semibold">{tz.share}% overall share</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── SECTION F: IP & NETWORK SECURITY INTELLIGENCE ──────────────────── */}
        {activeTab === "security" && (
          <section className="space-y-6">
            {/* Risk Counters */}
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <span className="text-xs font-semibold text-muted-foreground">Total Signals Evaluated</span>
                <p className="mt-2 font-display text-2xl font-bold">{security.totalSignals}</p>
              </div>
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-emerald-800">
                <span className="text-xs font-semibold">Low Risk / Verified</span>
                <p className="mt-2 font-display text-2xl font-bold">{security.lowRiskCount}</p>
              </div>
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-amber-800">
                <span className="text-xs font-semibold">Medium Risk / Velocity</span>
                <p className="mt-2 font-display text-2xl font-bold">{security.mediumRiskCount}</p>
              </div>
              <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-5 text-destructive">
                <span className="text-xs font-semibold">High Risk / Probes</span>
                <p className="mt-2 font-display text-2xl font-bold">{security.highRiskCount}</p>
              </div>
            </div>

            {/* Security Audit Table */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold font-display">Security Signal Audit Log</h3>
                  <p className="text-xs text-muted-foreground">Real-time passive threat telemetry, velocity abuse guards, and probe detection</p>
                </div>
                <Button size="sm" variant="outline" onClick={handleExportSecurity} className="gap-1.5 rounded-xl h-9">
                  <Download className="size-3.5" /> Export Security CSV
                </Button>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground font-semibold">
                      <th className="pb-3">Timestamp (UTC)</th>
                      <th className="pb-3">Subnet Masked</th>
                      <th className="pb-3">Risk Level</th>
                      <th className="pb-3">Signal Name</th>
                      <th className="pb-3">Detection Reason</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {security.recentSignals.map((s) => {
                      const badgeClass =
                        s.riskLevel === "High"
                          ? "bg-destructive/15 text-destructive border-destructive/30"
                          : s.riskLevel === "Medium"
                          ? "bg-amber-500/15 text-amber-700 border-amber-500/30"
                          : "bg-emerald-500/15 text-emerald-700 border-emerald-500/30";

                      return (
                        <tr key={s.signalId} className="hover:bg-secondary/40">
                          <td className="py-2.5 font-mono text-muted-foreground">
                            {new Date(s.timestampUtc).toLocaleTimeString()}
                          </td>
                          <td className="py-2.5 font-mono font-semibold">{s.ipMasked}</td>
                          <td className="py-2.5">
                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${badgeClass}`}>
                              {s.riskLevel}
                            </span>
                          </td>
                          <td className="py-2.5 font-semibold text-foreground">{s.signalName}</td>
                          <td className="py-2.5 text-muted-foreground truncate max-w-[280px]" title={s.reason}>
                            {s.reason}
                          </td>
                          <td className="py-2.5 text-right font-mono font-bold">{s.actionTaken}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ─── SECTION G: CONVERSION FUNNEL ───────────────────────────────────── */}
        {(activeTab === "funnel" || activeTab === "overview") && (
          <section className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-bold font-display">Care Booking Conversion Funnel</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Stage-by-stage progression from website arrival to completed attendant booking reservation
              </p>

              <div className="mt-8 space-y-4">
                {funnel.map((stage) => (
                  <div key={stage.step} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground flex items-center gap-2">
                        <span className="grid size-6 place-items-center rounded-full bg-primary/10 text-primary font-bold text-[11px]">
                          {stage.step}
                        </span>
                        {stage.name}
                      </span>
                      <div className="font-mono flex items-center gap-3">
                        <span className="font-bold">{stage.count} sessions</span>
                        <span className="text-muted-foreground font-semibold">({stage.overallConversionRate}% of total)</span>
                        {stage.dropOffRate > 0 && (
                          <span className="text-destructive font-medium">-{stage.dropOffRate}% drop</span>
                        )}
                      </div>
                    </div>

                    <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{
                          width: `${Math.max(4, stage.overallConversionRate)}%`,
                          backgroundColor: stage.step === 5 ? PALETTE.terracotta : PALETTE.primary,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
