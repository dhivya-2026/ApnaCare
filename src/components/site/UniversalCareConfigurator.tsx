import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  Heart,
  Stethoscope,
  Baby,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  AlertCircle,
  MapPin,
  Languages,
  Check,
  RotateCcw,
  Users,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CARE_MODULES } from "@/data/careModules";
import { evaluateAttendantMatches, type MatchEvaluation } from "@/data/matchingEngine";
import { formatINR, buildWhatsAppUrl } from "@/data/site";
import { track } from "@/lib/analytics";

interface AgeGroup {
  id: string;
  label: string;
  sublabel: string;
  recommendedModuleIds: string[];
  defaultShift: "8hr" | "12hr" | "24hr";
  presetDays: number;
}

interface RecipientType {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  color: string;
  defaultServiceSlug: string;
  ageGroups: AgeGroup[];
}

const RECIPIENT_TYPES: RecipientType[] = [
  {
    id: "elderly",
    label: "An Elderly Parent",
    sublabel: "Senior citizen aged 60 and above",
    icon: <Heart className="size-6" />,
    color: "emerald",
    defaultServiceSlug: "elderly-care",
    ageGroups: [
      { id: "60-74", label: "60 \u2013 74 years", sublabel: "Active senior, needs daytime support", recommendedModuleIds: ["mod-daily-living", "mod-companionship", "mod-mobility"], defaultShift: "8hr", presetDays: 14 },
      { id: "75-84", label: "75 \u2013 84 years", sublabel: "Moderate dependency, needs full-day assistance", recommendedModuleIds: ["mod-daily-living", "mod-companionship", "mod-mobility", "mod-medication"], defaultShift: "12hr", presetDays: 30 },
      { id: "85plus", label: "85 years and above", sublabel: "High dependency, requires round-the-clock care", recommendedModuleIds: ["mod-daily-living", "mod-companionship", "mod-mobility", "mod-medication", "mod-family-logs"], defaultShift: "24hr", presetDays: 30 },
    ],
  },
  {
    id: "adult-patient",
    label: "An Adult Patient",
    sublabel: "Post-surgery, illness recovery, or hospital discharge",
    icon: <Stethoscope className="size-6" />,
    color: "blue",
    defaultServiceSlug: "hospital-attendants",
    ageGroups: [
      { id: "18-40", label: "18 \u2013 40 years", sublabel: "Recovery support, post-operative care", recommendedModuleIds: ["mod-daily-living", "mod-medication"], defaultShift: "12hr", presetDays: 7 },
      { id: "41-60", label: "41 \u2013 60 years", sublabel: "Chronic condition or surgical recovery", recommendedModuleIds: ["mod-daily-living", "mod-medication", "mod-mobility", "mod-family-logs"], defaultShift: "12hr", presetDays: 14 },
      { id: "60plus", label: "60 years and above", sublabel: "Elderly patient, higher support needs", recommendedModuleIds: ["mod-daily-living", "mod-medication", "mod-mobility", "mod-clinical-nursing", "mod-family-logs"], defaultShift: "24hr", presetDays: 30 },
    ],
  },
  {
    id: "new-mother",
    label: "A New Mother & Baby",
    sublabel: "Postnatal recovery and newborn care",
    icon: <Baby className="size-6" />,
    color: "pink",
    defaultServiceSlug: "post-natal-care",
    ageGroups: [
      { id: "newborn-0-1m", label: "Newborn (0 \u2013 1 month)", sublabel: "Intensive newborn and mother recovery support", recommendedModuleIds: ["mod-daily-living", "mod-companionship", "mod-family-logs"], defaultShift: "12hr", presetDays: 30 },
      { id: "infant-1-6m", label: "Infant (1 \u2013 6 months)", sublabel: "Ongoing infant care and mother wellbeing", recommendedModuleIds: ["mod-daily-living", "mod-companionship"], defaultShift: "8hr", presetDays: 14 },
    ],
  },
  {
    id: "child",
    label: "A Child or Toddler",
    sublabel: "Childcare, special needs, or illness support",
    icon: <Users className="size-6" />,
    color: "amber",
    defaultServiceSlug: "elderly-care",
    ageGroups: [
      { id: "toddler-1-4", label: "Toddler (1 \u2013 4 years)", sublabel: "Daytime supervision and play support", recommendedModuleIds: ["mod-daily-living", "mod-companionship"], defaultShift: "8hr", presetDays: 7 },
      { id: "child-5-12", label: "Child (5 \u2013 12 years)", sublabel: "After-school care or illness recovery support", recommendedModuleIds: ["mod-daily-living", "mod-companionship", "mod-medication"], defaultShift: "8hr", presetDays: 7 },
    ],
  },
];

const COLOR_MAP: Record<string, Record<string, string>> = {
  emerald: { ring: "ring-2 ring-emerald-500/40 border-emerald-500/60", bg: "bg-emerald-500/10", text: "text-emerald-700 dark:text-emerald-400", badge: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300" },
  blue: { ring: "ring-2 ring-blue-500/40 border-blue-500/60", bg: "bg-blue-500/10", text: "text-blue-700 dark:text-blue-400", badge: "bg-blue-500/20 text-blue-700 dark:text-blue-300" },
  pink: { ring: "ring-2 ring-pink-500/40 border-pink-500/60", bg: "bg-pink-500/10", text: "text-pink-700 dark:text-pink-400", badge: "bg-pink-500/20 text-pink-700 dark:text-pink-300" },
  amber: { ring: "ring-2 ring-amber-500/40 border-amber-500/60", bg: "bg-amber-500/10", text: "text-amber-700 dark:text-amber-400", badge: "bg-amber-500/20 text-amber-700 dark:text-amber-300" },
};

export function UniversalCareConfigurator() {
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(null);
  const [selectedAgeGroupId, setSelectedAgeGroupId] = useState<string | null>(null);
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>([]);
  const [shiftTiming, setShiftTiming] = useState<"8hr" | "12hr" | "24hr">("12hr");
  const [durationDays, setDurationDays] = useState<number>(14);
  const [selectedCity, setSelectedCity] = useState<string>("Bengaluru");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Tamil");

  const activeRecipient = useMemo(() => RECIPIENT_TYPES.find((r) => r.id === selectedRecipientId) ?? null, [selectedRecipientId]);
  const activeAgeGroup = useMemo(() => activeRecipient?.ageGroups.find((g) => g.id === selectedAgeGroupId) ?? null, [activeRecipient, selectedAgeGroupId]);
  const step = useMemo(() => { if (!selectedRecipientId) return 1; if (!selectedAgeGroupId) return 2; return 3; }, [selectedRecipientId, selectedAgeGroupId]);

  const handleSelectRecipient = (r: RecipientType) => { setSelectedRecipientId(r.id); setSelectedAgeGroupId(null); setSelectedModuleIds([]); track("configurator_recipient_selected", { recipient_id: r.id }); };
  const handleSelectAgeGroup = (ag: AgeGroup) => { setSelectedAgeGroupId(ag.id); setSelectedModuleIds([...ag.recommendedModuleIds]); setShiftTiming(ag.defaultShift); setDurationDays(ag.presetDays); track("configurator_age_group_selected", { age_group_id: ag.id }); };
  const handleToggleModule = (moduleId: string) => { setSelectedModuleIds((prev) => { const exists = prev.includes(moduleId); return exists ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]; }); };
  const handleReset = () => { setSelectedRecipientId(null); setSelectedAgeGroupId(null); setSelectedModuleIds([]); setShiftTiming("12hr"); setDurationDays(14); };

  const hasClinicalModule = useMemo(() => selectedModuleIds.includes("mod-clinical-nursing"), [selectedModuleIds]);

  const pricing = useMemo(() => {
    let baseDaily = 0;
    CARE_MODULES.filter((m) => selectedModuleIds.includes(m.id)).forEach((m) => { baseDaily += m.baseDailyRate; });
    if (baseDaily < 799) baseDaily = 799;
    const mult = shiftTiming === "8hr" ? 0.85 : shiftTiming === "24hr" ? 1.45 : 1.0;
    const dailyRate = Math.round(baseDaily * mult);
    const subtotal = dailyRate * durationDays;
    const gst = Math.round(subtotal * 0.18);
    return { dailyRate, subtotal, gst, total: subtotal + gst };
  }, [selectedModuleIds, shiftTiming, durationDays]);

  const topMatches = useMemo<MatchEvaluation[]>(() => {
    if (!activeRecipient) return [];
    return evaluateAttendantMatches({ requiredServiceSlug: activeRecipient.defaultServiceSlug, isClinicalRequired: hasClinicalModule, city: selectedCity, preferredLanguage: selectedLanguage, shiftTiming }).filter((m) => m.isEligible).slice(0, 3);
  }, [activeRecipient, hasClinicalModule, selectedCity, selectedLanguage, shiftTiming]);

  const waUrl = buildWhatsAppUrl(activeRecipient && activeAgeGroup ? `Hello ApnaCare! Looking for care for ${activeRecipient.label.toLowerCase()} (${activeAgeGroup.label}) in ${selectedCity}. Shift: ${shiftTiming}, Duration: ${durationDays} days, Language: ${selectedLanguage}. Please help me find a verified attendant.` : "Hello ApnaCare! I'd like to enquire about your care services.");

  return (
    <section id="care-configurator" className="scroll-mt-20 py-16 md:py-24 border-b border-border bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container-page">

        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5 text-terracotta" />
            <span>Personalised Care Planner</span>
          </div>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold md:text-4xl lg:text-5xl text-foreground">
            Who are you looking to care for?
          </h2>
          <p className="mt-3 text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed">
            Tell us who needs care and their age group. We will build a personalised plan and match verified attendants in your city.
          </p>
        </div>

        {/* Step breadcrumb */}
        <div className="mt-8 flex items-center gap-2 text-xs">
          {[{ n: 1, label: "Who needs care" }, { n: 2, label: "Age group" }, { n: 3, label: "Build your plan" }].map((s, idx) => (
            <div key={s.n} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 ${step >= s.n ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                <span className={`grid size-5 place-items-center rounded-full text-[10px] font-bold ${step > s.n ? "bg-primary text-primary-foreground" : step === s.n ? "bg-primary text-primary-foreground" : "bg-border text-muted-foreground"}`}>
                  {step > s.n ? <Check className="size-3 stroke-[3]" /> : s.n}
                </span>
                <span>{s.label}</span>
              </div>
              {idx < 2 && <ChevronRight className="size-3 text-border" />}
            </div>
          ))}
          {selectedRecipientId && (
            <button type="button" onClick={handleReset} className="ml-auto text-xs text-muted-foreground hover:text-primary flex items-center gap-1 font-medium">
              <RotateCcw className="size-3" /> Start over
            </button>
          )}
        </div>

        {/* Step 1 — Who needs care */}
        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-wider text-primary mb-4">Step 1 — Select who needs care</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RECIPIENT_TYPES.map((r) => {
              const isSelected = selectedRecipientId === r.id;
              const c = COLOR_MAP[r.color];
              return (
                <button key={r.id} type="button" onClick={() => handleSelectRecipient(r)} className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-200 flex flex-col gap-3 ${isSelected ? `${c.ring} ${c.bg} shadow-soft` : "border-border bg-card hover:border-primary/40 hover:bg-secondary/20"}`}>
                  <div className={`size-12 rounded-2xl flex items-center justify-center ${isSelected ? c.bg : "bg-secondary/50"}`}>
                    <span className={isSelected ? c.text : "text-muted-foreground"}>{r.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-foreground leading-snug">{r.label}</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{r.sublabel}</p>
                  </div>
                  {isSelected && (
                    <span className={`absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${c.badge}`}>
                      <Check className="size-2.5 stroke-[3]" /> Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2 — Age group */}
        {activeRecipient && (
          <div className="mt-12">
            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Step 2 — Select their age group</p>
            <p className="text-xs text-muted-foreground mb-4">We will automatically load the most suitable care modules and shift hours based on age.</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {activeRecipient.ageGroups.map((ag) => {
                const isSelected = selectedAgeGroupId === ag.id;
                const c = COLOR_MAP[activeRecipient.color];
                return (
                  <button key={ag.id} type="button" onClick={() => handleSelectAgeGroup(ag)} className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col gap-1.5 ${isSelected ? `${c.ring} ${c.bg} shadow-soft` : "border-border bg-card hover:border-primary/40 hover:bg-secondary/20"}`}>
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-foreground">{ag.label}</h4>
                      {isSelected && <CheckCircle2 className={`size-4 ${c.text}`} />}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{ag.sublabel}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isSelected ? c.badge : "bg-secondary text-muted-foreground"}`}>{ag.defaultShift} shift</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isSelected ? c.badge : "bg-secondary text-muted-foreground"}`}>{ag.recommendedModuleIds.length} modules</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3 — Modules + Plan + Matching */}
        {activeAgeGroup && (
          <div className="mt-12">

            {/* Modules */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">Step 3 — Customise care modules</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Pre-loaded for this profile. Add or remove as needed.</p>
                </div>
                <button type="button" onClick={() => setSelectedModuleIds([...activeAgeGroup.recommendedModuleIds])} className="text-xs text-primary hover:underline flex items-center gap-1 font-medium shrink-0">
                  <RotateCcw className="size-3" /> Reset
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {CARE_MODULES.map((mod) => {
                  const isChecked = selectedModuleIds.includes(mod.id);
                  return (
                    <div key={mod.id} onClick={() => handleToggleModule(mod.id)} className={`cursor-pointer select-none rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between ${isChecked ? "border-primary bg-card shadow-soft ring-1 ring-primary/30" : "border-border/80 bg-card/60 opacity-80 hover:opacity-100 hover:border-border"}`}>
                      <div>
                        <div className="flex items-start justify-between">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${mod.isClinical ? "bg-amber-500/10 text-amber-700" : "bg-primary-soft text-primary"}`}>{mod.isClinical ? "Registered Nurse" : "Attendant"}</span>
                          <div className={`size-5 rounded-md grid place-items-center transition-colors ${isChecked ? "bg-primary text-primary-foreground" : "border border-border bg-background"}`}>{isChecked && <Check className="size-3 stroke-[3]" />}</div>
                        </div>
                        <h4 className="mt-2 font-semibold text-sm text-foreground leading-snug">{mod.name}</h4>
                        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{mod.description}</p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-border/50 text-[11px] font-semibold text-primary">{mod.baseDailyRate > 0 ? `+${formatINR(mod.baseDailyRate)}/${mod.unit}` : "Included Standard"}</div>
                    </div>
                  );
                })}
              </div>

              {hasClinicalModule && (
                <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
                  <AlertCircle className="size-4 shrink-0 text-amber-600 mt-0.5" />
                  <div><span className="font-bold">Clinical Nursing Boundary:</span> Licensed nursing tasks require a valid doctor's prescription and are performed by State Nursing Council registered GNM/B.Sc nurses only.</div>
                </div>
              )}
            </div>

            {/* Preferences + Plan Summary */}
            <div className="mt-10 grid gap-8 lg:grid-cols-12 items-start">

              <div className="lg:col-span-6 space-y-5">
                <p className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground text-[10px]">4</span>
                  Shift, Duration & Location
                </p>

                <div className="p-5 rounded-2xl border border-border bg-card">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-2">Shift Timing</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[{ id: "8hr", label: "8-Hour Day", desc: "Daytime Support" }, { id: "12hr", label: "12-Hour Shift", desc: "Day or Night" }, { id: "24hr", label: "24-Hour Live-in", desc: "Round-the-clock" }].map((s) => (
                      <button key={s.id} type="button" onClick={() => setShiftTiming(s.id as "8hr" | "12hr" | "24hr")} className={`p-3 rounded-xl border text-center transition-all ${shiftTiming === s.id ? "border-primary bg-primary text-primary-foreground font-semibold" : "border-border bg-secondary/30 text-foreground hover:bg-secondary"}`}>
                        <div className="text-xs font-bold">{s.label}</div>
                        <div className={`text-[10px] mt-0.5 ${shiftTiming === s.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{s.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-border bg-card">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-2">Duration: <span className="text-primary">{durationDays} Days</span></label>
                  <div className="flex items-center gap-2">
                    {[7, 14, 30].map((days) => (
                      <button key={days} type="button" onClick={() => setDurationDays(days)} className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition-all ${durationDays === days ? "border-primary bg-primary text-primary-foreground" : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground"}`}>{days} Days</button>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-border bg-card grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1 mb-2"><MapPin className="size-3 text-primary" /> City</label>
                    <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full text-xs font-semibold rounded-xl border border-border bg-background p-2.5 focus:outline-none focus:ring-1 focus:ring-primary">
                      <option>Bengaluru</option><option>Chennai</option><option>Hyderabad</option><option>Coimbatore</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1 mb-2"><Languages className="size-3 text-primary" /> Language</label>
                    <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} className="w-full text-xs font-semibold rounded-xl border border-border bg-background p-2.5 focus:outline-none focus:ring-1 focus:ring-primary">
                      <option>Tamil</option><option>Kannada</option><option>Telugu</option><option>Malayalam</option><option>English</option><option>Hindi</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <p className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground text-[10px]">5</span>
                  Your Care Plan Summary
                </p>

                <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div>
                      <span className="text-xs font-semibold text-primary">Care Recipient Profile</span>
                      <h3 className="text-lg font-display font-semibold text-foreground mt-0.5">{activeRecipient?.label}</h3>
                      <p className="text-xs text-muted-foreground">{activeAgeGroup?.label}</p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary-soft text-primary">{selectedCity}</span>
                  </div>

                  <div className="py-4 border-b border-border space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">Care Modules ({selectedModuleIds.length})</span>
                    <div className="flex flex-wrap gap-1.5">
                      {CARE_MODULES.filter((m) => selectedModuleIds.includes(m.id)).map((m) => (
                        <span key={m.id} className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg bg-secondary/60 text-foreground"><Check className="size-3 text-primary" /> {m.name}</span>
                      ))}
                    </div>
                  </div>

                  <div className="py-4 border-b border-border space-y-2 text-xs">
                    {[["Shift", `${shiftTiming} presence`], ["Duration", `${durationDays} Days`], ["Language", selectedLanguage], ["Est. Daily Rate", `${formatINR(pricing.dailyRate)}/day`], ["GST (18%)", `+${formatINR(pricing.gst)}`]].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between text-muted-foreground"><span>{k}</span><span className="font-semibold text-foreground">{v}</span></div>
                    ))}
                    <div className="pt-2 flex items-center justify-between text-base font-bold text-foreground border-t border-border/60">
                      <span>Estimated Total (incl. GST)</span>
                      <span className="text-primary text-xl font-display">{formatINR(pricing.total)}</span>
                    </div>
                  </div>

                  <div className="pt-5 space-y-3">
                    <Button asChild size="lg" className="w-full rounded-full shadow-soft hover:shadow-lift min-h-[48px] font-bold text-sm">
                      <Link to="/booking" search={{ service: activeRecipient?.defaultServiceSlug ?? "elderly-care", city: selectedCity.toLowerCase() }} onClick={() => track("configurator_proceed_booking", { total: pricing.total, recipient: selectedRecipientId, ageGroup: selectedAgeGroupId, city: selectedCity })}>
                        Proceed with this Plan <ArrowRight className="size-4 ml-2" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="w-full rounded-full border-border bg-card hover:bg-secondary">
                      <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-[#128C7E]">
                        <MessageCircle className="size-4" /> Share Plan via WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Matched Attendants */}
            {topMatches.length > 0 && (
              <div className="mt-16 pt-12 border-t border-border">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="eyebrow">Real-Time Match</span>
                    <h3 className="mt-2 text-2xl font-display font-semibold text-foreground">Verified Attendants in {selectedCity}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Matched by credentials, police clearance, and {selectedLanguage} language capability.</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-4 text-primary" /><span>100% Background Screened</span></div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {topMatches.map(({ attendant, matchScore, matchReasons }) => (
                    <div key={attendant.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary-soft px-2 py-0.5 rounded">{attendant.badge}</span>
                            <h4 className="mt-2 font-semibold text-base text-foreground">{attendant.name}</h4>
                            <p className="text-xs text-muted-foreground">{attendant.role}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-foreground">{matchScore}% Match</span>
                            <div className="text-[10px] text-amber-600 font-semibold mt-0.5">&#9733; {attendant.rating} ({attendant.experience})</div>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-border/60 space-y-1.5">
                          {matchReasons.slice(0, 3).map((reason, rIdx) => (
                            <div key={rIdx} className="flex items-center gap-1.5 text-xs text-foreground/80"><CheckCircle2 className="size-3 text-primary shrink-0" /><span>{reason}</span></div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{attendant.languages.join(", ")}</span>
                        <Link to="/booking" search={{ service: attendant.services[0], city: attendant.city.toLowerCase() }} className="font-semibold text-primary hover:underline">Request Profile &#10148;</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
