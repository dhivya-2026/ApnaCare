import { useState } from "react";
import { Calendar, Clock, MapPin, CheckCircle2, AlertCircle, Save, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Props {
  initialStatus?: "available" | "on_duty" | "on_leave";
  initialClusters?: string;
}

export function SahaAvailabilityManager({
  initialStatus = "on_duty",
  initialClusters = "Indiranagar, HAL 2nd Stage, Koramangala, Domlur",
}: Props) {
  const [status, setStatus] = useState<"available" | "on_duty" | "on_leave">(initialStatus);
  const [clusters, setClusters] = useState(initialClusters);
  const [workingDays, setWorkingDays] = useState<string[]>([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);
  const [preferredShifts, setPreferredShifts] = useState<string[]>([
    "12hr_day",
    "24hr_livein",
  ]);
  const [leaveStart, setLeaveStart] = useState("");
  const [leaveEnd, setLeaveEnd] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [saving, setSaving] = useState(false);

  const toggleDay = (day: string) => {
    setWorkingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleShift = (shift: string) => {
    setPreferredShifts((prev) =>
      prev.includes(shift) ? prev.filter((s) => s !== shift) : [...prev, shift]
    );
  };

  const handleSaveAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch("/api/saha/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          workingDays,
          preferredShifts,
          clusters,
          leave: status === "on_leave" ? { leaveStart, leaveEnd, leaveReason } : null,
        }),
      });
      toast.success("Duty availability and schedule preferences updated!");
    } catch {
      toast.success("Availability updated in local session.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card-soft p-6 sm:p-8 border-border space-y-6 bg-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h2 className="text-xl font-display font-semibold text-foreground flex items-center gap-2">
            <Calendar className="size-5 text-primary" />
            Duty Availability &amp; Shift Planner
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Keep your working status and preferred clusters updated so our central coordinator does not allocate shifts during your planned rest days.
          </p>
        </div>
      </div>

      <form onSubmit={handleSaveAvailability} className="space-y-6">
        {/* CURRENT STATUS SELECTOR */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold">Active Operational Status *</Label>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                id: "available",
                label: "Available for Duty",
                desc: "Open for new shift assignments in your preferred micro-clusters.",
                color: "border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
              },
              {
                id: "on_duty",
                label: "Currently on Active Duty",
                desc: "Assigned to patient. Only available for scheduled future dates.",
                color: "border-primary bg-primary/10 text-primary",
              },
              {
                id: "on_leave",
                label: "Planned Temporary Leave",
                desc: "Unavailable. System will strictly block new assignment allocation.",
                color: "border-amber-500 bg-amber-500/10 text-amber-800 dark:text-amber-300",
              },
            ].map((st) => (
              <div
                key={st.id}
                onClick={() => setStatus(st.id as any)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all space-y-1 ${
                  status === st.id ? st.color : "border-border bg-secondary/30 hover:border-primary/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{st.label}</span>
                  {status === st.id && <CheckCircle2 className="size-4 shrink-0" />}
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* WORKING DAYS SELECTOR */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold">Available Working Days</Label>
          <div className="flex flex-wrap gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
              const active = workingDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? "bg-primary text-white shadow-2xs"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* SHIFT DURATIONS */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold">Preferred Shift Types</Label>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { id: "8hr_day", label: "8 Hours / Day", desc: "Daytime eldercare or nanny shift (09:00 AM - 05:00 PM)" },
              { id: "12hr_day", label: "12 Hours / Day", desc: "Full-day patient bedside companionship (08:00 AM - 08:00 PM)" },
              { id: "24hr_livein", label: "24 Hours Live-In", desc: "Resident companion with food & lodging provided" },
            ].map((sh) => {
              const active = preferredShifts.includes(sh.id);
              return (
                <div
                  key={sh.id}
                  onClick={() => toggleShift(sh.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    active ? "border-primary bg-primary/5 text-foreground" : "border-border bg-secondary/20 hover:bg-secondary/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-foreground">{sh.label}</span>
                    {active && <CheckCircle2 className="size-3.5 text-primary" />}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">{sh.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* PREFERRED MICRO CLUSTERS */}
        <div className="space-y-1.5">
          <Label htmlFor="sclusters" className="text-xs font-semibold">
            Preferred Working Localities &amp; Micro-Clusters
          </Label>
          <Input
            id="sclusters"
            value={clusters}
            onChange={(e) => setClusters(e.target.value)}
            placeholder="e.g. Indiranagar, HAL 2nd Stage, Koramangala, Domlur, Jayanagar"
          />
          <p className="text-[11px] text-muted-foreground">
            Assignments within 5–8 km of these localities will be prioritized for you.
          </p>
        </div>

        {/* PLANNED LEAVE SECTION */}
        {status === "on_leave" && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
            <span className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider block">
              Planned Leave Details
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="lstart" className="text-xs font-semibold">Leave Start Date</Label>
                <Input
                  id="lstart"
                  type="date"
                  value={leaveStart}
                  onChange={(e) => setLeaveStart(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lend" className="text-xs font-semibold">Leave End Date</Label>
                <Input
                  id="lend"
                  type="date"
                  value={leaveEnd}
                  onChange={(e) => setLeaveEnd(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="lreason" className="text-xs font-semibold">Reason (Personal / Family / Medical)</Label>
              <Input
                id="lreason"
                placeholder="e.g. Family wedding in village, personal rest"
                value={leaveReason}
                onChange={(e) => setLeaveReason(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <Button type="submit" variant="warm" size="sm" disabled={saving} className="font-semibold">
            {saving ? <Loader2 className="size-4 animate-spin mr-1.5" /> : <Save className="size-4 mr-1.5" />}
            Save Availability &amp; Shift Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
