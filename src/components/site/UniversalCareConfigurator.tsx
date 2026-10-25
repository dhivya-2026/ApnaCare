import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  Heart,
  Building2,
  Stethoscope,
  Baby,
  Clock,
  Car,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  MessageCircle,
  AlertCircle,
  MapPin,
  Calendar,
  Languages,
  Check,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CARE_MODULES,
  CARE_SITUATION_TEMPLATES,
  type CareModule,
  type CareSituationTemplate,
} from "@/data/careModules";
import { evaluateAttendantMatches, type MatchEvaluation } from "@/data/matchingEngine";
import { formatINR, buildWhatsAppUrl, SITE, CITIES } from "@/data/site";
import { track } from "@/lib/analytics";

export function UniversalCareConfigurator() {
  // Step 1: Selected Situation
  const [selectedSituationId, setSelectedSituationId] = useState<string>("sit-parents-alone");

  // Step 2: Selected Modules
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>(() => {
    const template = CARE_SITUATION_TEMPLATES.find((t) => t.id === "sit-parents-alone");
    return template
      ? [...template.recommendedModuleIds]
      : ["mod-daily-living", "mod-companionship", "mod-family-logs"];
  });

  // Step 3: Schedule, Duration & Preferences
  const [shiftTiming, setShiftTiming] = useState<"8hr" | "12hr" | "24hr">("12hr");
  const [durationDays, setDurationDays] = useState<number>(14);
  const [selectedCity, setSelectedCity] = useState<string>("Bengaluru");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Tamil");

  // Active situation object
  const activeSituation = useMemo(() => {
    return (
      CARE_SITUATION_TEMPLATES.find((s) => s.id === selectedSituationId) ||
      CARE_SITUATION_TEMPLATES[0]
    );
  }, [selectedSituationId]);

  // Handle switching situation template
  const handleSelectSituation = (sit: CareSituationTemplate) => {
    setSelectedSituationId(sit.id);
    setSelectedModuleIds([...sit.recommendedModuleIds]);
    setShiftTiming(sit.presetShift);
    track("configurator_situation_selected", { situation_id: sit.id, title: sit.title });
  };

  // Toggle individual module
  const handleToggleModule = (moduleId: string) => {
    setSelectedModuleIds((prev) => {
      const exists = prev.includes(moduleId);
      const next = exists ? prev.filter((id) => id !== moduleId) : [...prev, moduleId];
      track("configurator_module_toggled", {
        module_id: moduleId,
        action: exists ? "remove" : "add",
      });
      return next;
    });
  };

  // Check if clinical nursing module is selected
  const hasClinicalModule = useMemo(() => {
    return selectedModuleIds.includes("mod-clinical-nursing");
  }, [selectedModuleIds]);

  // Pricing Calculation based on modules and shift
  const pricing = useMemo(() => {
    let baseDaily = 0;
    const selectedMods = CARE_MODULES.filter((m) => selectedModuleIds.includes(m.id));

    selectedMods.forEach((m) => {
      baseDaily += m.baseDailyRate;
    });

    // Ensure a baseline if few modules selected
    if (baseDaily < 799) baseDaily = 799;

    // Shift multipliers
    let shiftMultiplier = 1.0;
    if (shiftTiming === "8hr") shiftMultiplier = 0.85;
    if (shiftTiming === "24hr") shiftMultiplier = 1.45;

    const dailyRate = Math.round(baseDaily * shiftMultiplier);
    const subtotal = dailyRate * durationDays;
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;

    return { dailyRate, subtotal, gst, total };
  }, [selectedModuleIds, shiftTiming, durationDays]);

  // Intelligent Attendant Matching Evaluation
  const matchedEvaluations = useMemo<MatchEvaluation[]>(() => {
    let serviceSlug = "elderly-care";
    if (selectedSituationId === "sit-hospital-discharge") serviceSlug = "hospital-attendants";
    if (selectedSituationId === "sit-clinical-nursing") serviceSlug = "nursing-services";
    if (selectedSituationId === "sit-newborn-postnatal") serviceSlug = "post-natal-care";
    if (selectedSituationId === "sit-clinic-travel") serviceSlug = "travel-assistance";

    return evaluateAttendantMatches({
      requiredServiceSlug: serviceSlug,
      isClinicalRequired: hasClinicalModule,
      city: selectedCity,
      preferredLanguage: selectedLanguage,
      shiftTiming,
    });
  }, [selectedSituationId, hasClinicalModule, selectedCity, selectedLanguage, shiftTiming]);

  const topMatches = useMemo(
    () => matchedEvaluations.filter((m) => m.isEligible).slice(0, 3),
    [matchedEvaluations],
  );

  const waEnquiryUrl = buildWhatsAppUrl(
    `Hello ApnaCare! I configured a care plan for "${activeSituation.title}" in ${selectedCity} (${durationDays} days, ${shiftTiming} shift, Preferred language: ${selectedLanguage}). Could we review verified attendants?`,
  );

  return (
    <section
      id="care-configurator"
      className="scroll-mt-20 py-16 md:py-24 border-b border-border bg-gradient-to-b from-background via-secondary/20 to-background"
    >
      <div className="container-page">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5 text-terracotta" />
            <span>Interactive Care Configurator & Attendant Matcher</span>
          </div>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold md:text-4xl lg:text-5xl text-foreground">
            Design your family's care plan in a few taps.
          </h2>
          <p className="mt-3 text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed">
            Start from your real-life situation. Select what matters, customize shift hours, and see
            eligible, police-verified attendants matched in real time.
          </p>
        </div>

        {/* ── STAGE 1: SITUATION SELECTION ────────────────────────── */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground text-[10px]">
                1
              </span>
              Choose Your Family Situation
            </span>
            <span className="text-xs text-muted-foreground">
              Tap a situation to auto-load recommended care modules
            </span>
          </div>

          <div className="mt-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {CARE_SITUATION_TEMPLATES.map((sit) => {
              const isSelected = sit.id === selectedSituationId;
              return (
                <button
                  key={sit.id}
                  type="button"
                  onClick={() => handleSelectSituation(sit)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? "border-primary bg-primary-soft/50 shadow-soft ring-2 ring-primary/20"
                      : "border-border bg-card hover:border-primary/40 hover:bg-secondary/30"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {sit.highlightTag}
                      </span>
                      {isSelected && <CheckCircle2 className="size-4 text-primary" />}
                    </div>
                    <h3 className="mt-2.5 font-semibold text-foreground text-base">{sit.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {sit.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-medium text-foreground/80">
                    <span>Est. from {formatINR(sit.estimatedDailyTotal)}/day</span>
                    <span className="text-primary font-semibold">Select ➔</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── STAGE 2: MODULAR CARE COMPONENT SELECTION ────────────── */}
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground text-[10px]">
                2
              </span>
              Customize Care Modules
            </span>
            <button
              type="button"
              onClick={() => setSelectedModuleIds([...activeSituation.recommendedModuleIds])}
              className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
            >
              <RotateCcw className="size-3" /> Reset to Recommended
            </button>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CARE_MODULES.map((mod) => {
              const isChecked = selectedModuleIds.includes(mod.id);
              return (
                <div
                  key={mod.id}
                  onClick={() => handleToggleModule(mod.id)}
                  className={`cursor-pointer select-none rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between ${
                    isChecked
                      ? "border-primary bg-card shadow-soft ring-1 ring-primary/30"
                      : "border-border/80 bg-card/60 opacity-80 hover:opacity-100 hover:border-border"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          mod.isClinical
                            ? "bg-amber-500/10 text-amber-700"
                            : "bg-primary-soft text-primary"
                        }`}
                      >
                        {mod.isClinical ? "Registered Nurse" : "Attendant"}
                      </span>
                      <div
                        className={`size-5 rounded-md grid place-items-center transition-colors ${
                          isChecked
                            ? "bg-primary text-primary-foreground"
                            : "border border-border bg-background"
                        }`}
                      >
                        {isChecked && <Check className="size-3 stroke-[3]" />}
                      </div>
                    </div>

                    <h4 className="mt-2 font-semibold text-sm text-foreground leading-snug">
                      {mod.name}
                    </h4>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {mod.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-border/50 text-[11px] font-semibold text-primary">
                    {mod.baseDailyRate > 0
                      ? `+${formatINR(mod.baseDailyRate)}/${mod.unit}`
                      : "Included Standard"}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clinical Boundary Notice if Clinical module selected */}
          {hasClinicalModule && (
            <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
              <AlertCircle className="size-4 shrink-0 text-amber-600 mt-0.5" />
              <div>
                <span className="font-bold">Clinical Nursing Boundary Requirement:</span> Licensed
                nursing tasks (sterile dressings, injections, catheterization) require a valid
                doctor's written prescription and are strictly performed by State Nursing Council
                registered GNM/B.Sc nurses.
              </div>
            </div>
          )}
        </div>

        {/* ── STAGE 3 & 4: SCHEDULE & LIVE PLAN SUMMARY ─────────────── */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground text-[10px]">
                3
              </span>
              Preferences & Shift Details
            </span>

            {/* Shift Presets */}
            <div className="p-5 rounded-2xl border border-border bg-card">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-2">
                Shift Timing
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "8hr", label: "8-Hour Day", desc: "Daytime Living Support" },
                  { id: "12hr", label: "12-Hour Shift", desc: "Day or Night Vigil" },
                  { id: "24hr", label: "24-Hour Live-in", desc: "Round-the-clock Care" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setShiftTiming(s.id as "8hr" | "12hr" | "24hr")}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      shiftTiming === s.id
                        ? "border-primary bg-primary text-primary-foreground font-semibold"
                        : "border-border bg-secondary/30 text-foreground hover:bg-secondary"
                    }`}
                  >
                    <div className="text-xs font-bold">{s.label}</div>
                    <div
                      className={`text-[10px] mt-0.5 ${shiftTiming === s.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                    >
                      {s.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Selector */}
            <div className="p-5 rounded-2xl border border-border bg-card">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-2">
                Duration: <span className="text-primary">{durationDays} Days</span>
              </label>
              <div className="flex items-center gap-2">
                {[7, 14, 30].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setDurationDays(days)}
                    className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition-all ${
                      durationDays === days
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {days} Days Package
                  </button>
                ))}
              </div>
            </div>

            {/* City & Language Selectors */}
            <div className="p-5 rounded-2xl border border-border bg-card grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1 mb-2">
                  <MapPin className="size-3 text-primary" /> Service City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full text-xs font-semibold rounded-xl border border-border bg-background p-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Coimbatore">Coimbatore</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1 mb-2">
                  <Languages className="size-3 text-primary" /> Attendant Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full text-xs font-semibold rounded-xl border border-border bg-background p-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="Tamil">Tamil</option>
                  <option value="Kannada">Kannada</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Malayalam">Malayalam</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>
            </div>
          </div>

          {/* Dynamic Care Plan Summary Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground text-[10px]">
                4
              </span>
              Configured Care Plan Summary
            </span>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <span className="text-xs font-semibold text-primary">Generated Plan</span>
                  <h3 className="text-xl font-display font-semibold text-foreground">
                    {activeSituation.title}
                  </h3>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary-soft text-primary">
                  {selectedCity} Cluster
                </span>
              </div>

              {/* Module Pill List */}
              <div className="py-4 border-b border-border space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Included Modules ({selectedModuleIds.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {CARE_MODULES.filter((m) => selectedModuleIds.includes(m.id)).map((m) => (
                    <span
                      key={m.id}
                      className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg bg-secondary/60 text-foreground"
                    >
                      <Check className="size-3 text-primary" /> {m.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Schedule and Rates */}
              <div className="py-4 border-b border-border space-y-2 text-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Shift Schedule</span>
                  <span className="font-semibold text-foreground">
                    {shiftTiming} continuous presence
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Duration</span>
                  <span className="font-semibold text-foreground">{durationDays} Days</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Estimated Daily Rate</span>
                  <span className="font-semibold text-foreground">
                    {formatINR(pricing.dailyRate)}/day
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Statutory GST (18%)</span>
                  <span className="font-semibold text-foreground">+{formatINR(pricing.gst)}</span>
                </div>
                <div className="pt-2 flex items-center justify-between text-base font-bold text-foreground border-t border-border/60">
                  <span>Estimated Total (Inclusive GST)</span>
                  <span className="text-primary text-xl font-display">
                    {formatINR(pricing.total)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-5 space-y-3">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full shadow-soft hover:shadow-lift min-h-[48px] font-bold text-sm"
                >
                  <Link
                    to="/booking"
                    search={{
                      service:
                        activeSituation.category === "hospital"
                          ? "hospital-attendants"
                          : "elderly-care",
                      city: selectedCity.toLowerCase(),
                    }}
                    onClick={() =>
                      track("configurator_proceed_booking", {
                        total: pricing.total,
                        city: selectedCity,
                      })
                    }
                  >
                    Proceed with Configured Plan
                    <ArrowRight className="size-4 ml-2" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full rounded-full border-border bg-card hover:bg-secondary"
                >
                  <a
                    href={waEnquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-[#128C7E]"
                  >
                    <MessageCircle className="size-4" /> Share Plan with Care Coordinator on
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ── STAGE 5: MATCHED ATTENDANTS DISCOVERY ───────────────── */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="eyebrow">Real-Time Evaluation</span>
              <h3 className="mt-2 text-2xl font-display font-semibold text-foreground">
                Eligible Verified Attendants in {selectedCity}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Filtered strictly by required credentials, police clearance, and language
                capability.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-primary" />
              <span>100% Background Screened</span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topMatches.map(({ attendant, matchScore, matchReasons }) => (
              <div
                key={attendant.id}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary-soft px-2 py-0.5 rounded">
                        {attendant.badge}
                      </span>
                      <h4 className="mt-2 font-semibold text-base text-foreground">
                        {attendant.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">{attendant.role}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-foreground">{matchScore}% Match</span>
                      <div className="text-[10px] text-amber-600 font-semibold mt-0.5">
                        ★ {attendant.rating} ({attendant.experience})
                      </div>
                    </div>
                  </div>

                  {/* Match Explanations */}
                  <div className="mt-3 pt-3 border-t border-border/60 space-y-1.5">
                    {matchReasons.slice(0, 3).map((reason, rIdx) => (
                      <div
                        key={rIdx}
                        className="flex items-center gap-1.5 text-xs text-foreground/80"
                      >
                        <CheckCircle2 className="size-3 text-primary shrink-0" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{attendant.languages.join(", ")}</span>
                  <Link
                    to="/booking"
                    search={{ service: attendant.services[0], city: attendant.city.toLowerCase() }}
                    className="font-semibold text-primary hover:underline"
                  >
                    Request Profile ➔
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
