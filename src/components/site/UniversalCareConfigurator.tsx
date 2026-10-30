import { useState, useMemo, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  Heart,
  Stethoscope,
  Activity,
  Baby,
  Users,
  Shield,
  Briefcase,
  Home,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  AlertCircle,
  MapPin,
  Languages,
  Check,
  RotateCcw,
  ChevronRight,
  ChevronDown,
  Search,
  Clock,
  CalendarDays,
  X,
  Car,
  HelpCircle,
  Sliders,
  UserCheck,
  PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CARE_CATEGORIES,
  searchTasksByKeyword,
  type CareCategory,
  type CareTask,
} from "@/data/careNeedsTaxonomy";
import {
  generateCarePlan,
  RECIPIENT_OPTIONS,
  type RecipientProfileType,
  type RecipientProfile,
  type ScheduleType,
  type TimingPreference,
  type DurationOption,
  type PlanSchedule,
  type PlanPreferences,
  type GeneratedCarePlan,
} from "@/data/carePlanEngine";
import { formatINR, buildWhatsAppUrl, CITIES } from "@/data/site";
import { track } from "@/lib/analytics";

const STORAGE_KEY = "apnacare_custom_care_plan_draft_v2";

// Situation Presets for "Help Me Choose"
interface SituationPreset {
  id: string;
  title: string;
  recipientType: RecipientProfileType;
  badge: string;
  description: string;
  taskIds: string[];
  defaultDuration: DurationOption;
  defaultSchedule: ScheduleType;
}

const SITUATION_PRESETS: SituationPreset[] = [
  {
    id: "preset-elderly-home",
    title: "Elderly Parent at Home",
    recipientType: "elderly_parent",
    badge: "Most Common",
    description: "Daily hygiene, walking assistance, warm companionship, and medication prompts",
    taskIds: [
      "task-walk-indoor",
      "task-hyg-bathing",
      "task-meal-serving",
      "task-med-remind",
      "task-comp-conversation",
      "task-rel-daily-reports",
    ],
    defaultDuration: "full_day_12h",
    defaultSchedule: "daily",
  },
  {
    id: "preset-hospital-discharge",
    title: "Post-Hospital Recovery",
    recipientType: "adult",
    badge: "Surgical Recovery",
    description: "Post-discharge bedside care, surgical wound dressing, and mobility rehabilitation",
    taskIds: [
      "task-disch-home-acc",
      "task-post-rec-assist",
      "task-hyg-sponge",
      "task-proc-wound",
      "task-mon-bp",
      "task-rel-remote-updates",
    ],
    defaultDuration: "full_day_12h",
    defaultSchedule: "daily",
  },
  {
    id: "preset-newborn-maternal",
    title: "New Mother & Baby",
    recipientType: "new_mother",
    badge: "Fourth Trimester",
    description: "Traditional baby massage, newborn oil bath, mother nutrition, and sleep support",
    taskIds: [
      "task-mat-daily",
      "task-mat-meal",
      "task-nb-bath",
      "task-nb-diaper",
      "task-nb-feeding-rtn",
      "task-nb-overnight",
    ],
    defaultDuration: "full_day_12h",
    defaultSchedule: "daily",
  },
  {
    id: "preset-assisted-transit",
    title: "Hospital Visit & Errands",
    recipientType: "elderly_parent",
    badge: "Mobility & Transit",
    description: "Door-to-door transit, appointment accompaniment, and pharmacy pickup",
    taskIds: [
      "task-trans-appointment",
      "task-apt-doc-acc",
      "task-local-pharmacy",
      "task-saf-safe-arrival",
    ],
    defaultDuration: "hourly_4h",
    defaultSchedule: "one_time",
  },
];

export function UniversalCareConfigurator() {
  // Step navigation: 1: Needs -> 2: Recipient -> 3: Situation -> 4: Schedule -> 5: Preferences -> 6: Plan Summary
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // Step 1: Needs selection state
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([
    "task-walk-indoor",
    "task-hyg-bathing",
    "task-med-remind",
    "task-comp-conversation",
  ]);
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<string[]>(["cat-mobility", "cat-daily-living"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Step 2: Recipient state
  const [recipientType, setRecipientType] = useState<RecipientProfileType>("elderly_parent");
  const [ageGroup, setAgeGroup] = useState("70–80 years");
  const [livingSituation, setLivingSituation] = useState("Living with family");

  // Step 3: Contextual situation questions state
  const [contextualAnswers, setContextualAnswers] = useState<Record<string, string | string[]>>({
    mobility_independence: "needs_stick_walker",
    daily_care_scope: "daytime_assistance",
    nursing_prescription: "rx_yes_available",
  });

  // Step 4: Schedule & Location state
  const [city, setCity] = useState("Bengaluru");
  const [area, setArea] = useState("Indiranagar / Koramangala");
  const [address, setAddress] = useState("");
  const [venueType, setVenueType] = useState<"home" | "hospital" | "transit_hub" | "other">("home");
  const [scheduleType, setScheduleType] = useState<ScheduleType>("daily");
  const [timing, setTiming] = useState<TimingPreference>("morning");
  const [duration, setDuration] = useState<DurationOption>("full_day_12h");
  const [calendarDays, setCalendarDays] = useState(14);
  const [startTime, setStartTime] = useState("08:00");

  // Step 5: Professional & Service Preferences
  const [preferredLanguage, setPreferredLanguage] = useState("Tamil");
  const [genderPreference, setGenderPreference] = useState<"female_only" | "male_only" | "no_preference">("female_only");
  const [continuityRequirement, setContinuityRequirement] = useState(true);
  const [familyUpdateFrequency, setFamilyUpdateFrequency] = useState<"daily_whatsapp" | "twice_daily" | "weekly_summary">("daily_whatsapp");
  const [customRequirements, setCustomRequirements] = useState("");

  // Restore draft from localStorage on initial mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const d = JSON.parse(saved);
        if (Array.isArray(d.selectedTaskIds) && d.selectedTaskIds.length > 0) {
          setSelectedTaskIds(d.selectedTaskIds);
        }
        if (d.recipientType) setRecipientType(d.recipientType);
        if (d.city) setCity(d.city);
        if (d.duration) setDuration(d.duration);
        if (d.preferredLanguage) setPreferredLanguage(d.preferredLanguage);
      }
    } catch {
      // Quiet fallback
    }
  }, []);

  // Save draft whenever selections change
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          selectedTaskIds,
          recipientType,
          city,
          duration,
          preferredLanguage,
          calendarDays,
        })
      );
    } catch {
      // Ignore quota error
    }
  }, [selectedTaskIds, recipientType, city, duration, preferredLanguage, calendarDays]);

  // Derived filtered search results
  const searchResults = useMemo(() => {
    return searchTasksByKeyword(searchQuery);
  }, [searchQuery]);

  // Derived selected tasks count per category
  const selectedCountByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of CARE_CATEGORIES) {
      let c = 0;
      for (const sub of cat.subcategories) {
        for (const t of sub.tasks) {
          if (selectedTaskIds.includes(t.id)) c++;
        }
      }
      counts[cat.id] = c;
    }
    return counts;
  }, [selectedTaskIds]);

  // Toggle category expansion
  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategoryIds((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
    track("planner_category_toggle", { category_id: catId });
  };

  // Toggle individual task selection
  const toggleTaskSelection = (taskId: string) => {
    setSelectedTaskIds((prev) => {
      const isSelected = prev.includes(taskId);
      const next = isSelected ? prev.filter((id) => id !== taskId) : [...prev, taskId];
      track(isSelected ? "planner_need_removed" : "planner_need_selected", { task_id: taskId });
      return next;
    });
  };

  // Apply a Situation Preset
  const applyPreset = (preset: SituationPreset) => {
    setSelectedTaskIds(preset.taskIds);
    setRecipientType(preset.recipientType);
    setDuration(preset.defaultDuration);
    setScheduleType(preset.defaultSchedule);
    setShowHelpModal(false);
    track("planner_preset_applied", { preset_id: preset.id });
  };

  // Build the Generated Care Plan using the Compatibility Engine
  const generatedPlan: GeneratedCarePlan = useMemo(() => {
    const recipient: RecipientProfile = {
      type: recipientType,
      label: RECIPIENT_OPTIONS.find((r) => r.id === recipientType)?.label ?? "Recipient",
      ageGroup,
      livingSituation,
    };

    const schedule: PlanSchedule = {
      city,
      area,
      address,
      venueType,
      scheduleType,
      timing,
      duration,
      calendarDays,
      startTime,
    };

    const preferences: PlanPreferences = {
      preferredLanguage,
      genderPreference,
      continuityRequirement,
      familyUpdateFrequency,
      specialNotes: customRequirements,
    };

    return generateCarePlan(selectedTaskIds, recipient, schedule, preferences, customRequirements);
  }, [
    selectedTaskIds,
    recipientType,
    ageGroup,
    livingSituation,
    city,
    area,
    address,
    venueType,
    scheduleType,
    timing,
    duration,
    calendarDays,
    startTime,
    preferredLanguage,
    genderPreference,
    continuityRequirement,
    familyUpdateFrequency,
    customRequirements,
  ]);

  // Active Contextual Questions based on user's selected categories
  const relevantContextualQuestions = useMemo(() => {
    const activeQuestions = [];
    for (const cat of CARE_CATEGORIES) {
      if ((selectedCountByCategory[cat.id] ?? 0) > 0 && cat.contextualQuestions.length > 0) {
        for (const q of cat.contextualQuestions) {
          activeQuestions.push({ category: cat, question: q });
        }
      }
    }
    return activeQuestions;
  }, [selectedCountByCategory]);

  // WhatsApp redirection URL
  const waUrl = buildWhatsAppUrl(
    `Hello ApnaCare! I have customized a care plan (${generatedPlan.id}) for my ${generatedPlan.recipient.label} in ${generatedPlan.schedule.city}. Could a regional care coordinator review this?`
  );

  return (
    <section
      id="care-planner"
      className="py-16 md:py-24 border-b border-border/60 bg-secondary/15 scroll-mt-20"
      aria-labelledby="care-planner-heading"
    >
      <div className="container-page">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-border/70">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft/80 px-3.5 py-1 text-xs font-semibold text-primary">
              <Sliders className="size-3.5" />
              <span>Intelligent Care Customisation Engine</span>
            </div>
            <h2
              id="care-planner-heading"
              className="mt-3 text-fluid-section font-display font-semibold text-foreground tracking-tight"
            >
              Customise Your Family's Exact Care Plan
            </h2>
            <p className="mt-3 text-fluid-body text-readable-muted">
              You don't need to fit into rigid healthcare packages. Choose specific tasks across 12 care categories, specify circumstances, and let ApnaCare organise the right support around your loved one.
            </p>
          </div>

          {/* Quick Stats & Reset Button */}
          <div className="flex items-center gap-3 self-start md:self-end shrink-0">
            <div className="rounded-2xl border border-border bg-card px-4 py-2.5 shadow-2xs text-xs">
              <span className="text-muted-foreground block text-[11px] font-medium uppercase tracking-wider">Selected Tasks</span>
              <span className="font-bold text-foreground text-sm flex items-center gap-1.5 mt-0.5">
                <CheckCircle2 className="size-4 text-primary" />
                {selectedTaskIds.length} tasks chosen
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowHelpModal(true)}
              className="inline-flex items-center gap-1.5 rounded-2xl border border-primary/30 bg-primary-soft/60 px-4 py-2.5 text-xs font-bold text-primary hover:bg-primary/10 transition-colors shadow-2xs min-h-[44px] cursor-pointer"
            >
              <HelpCircle className="size-4" />
              <span>Help Me Choose</span>
            </button>
          </div>
        </div>

        {/* Step Progress Bar (6 Steps) */}
        <nav aria-label="Care plan customisation steps" className="mt-8 overflow-x-auto pb-2">
          <ol className="flex items-center gap-2 sm:gap-3 min-w-[700px]">
            {[
              { num: 1, label: "1. Select Needs" },
              { num: 2, label: "2. Recipient" },
              { num: 3, label: "3. Situation" },
              { num: 4, label: "4. Schedule" },
              { num: 5, label: "5. Preferences" },
              { num: 6, label: "6. Personalised Plan" },
            ].map((s) => {
              const isCurrent = currentStep === s.num;
              const isPast = currentStep > s.num;
              return (
                <li key={s.num} className="flex-1">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(s.num as any)}
                    className={`w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                      isCurrent
                        ? "bg-primary text-primary-foreground shadow-soft ring-2 ring-primary/20"
                        : isPast
                        ? "bg-card border border-primary/30 text-foreground hover:bg-secondary/40"
                        : "bg-card/50 border border-border/80 text-muted-foreground hover:bg-secondary/20"
                    }`}
                  >
                    <span
                      className={`grid size-5 place-items-center rounded-full text-[10px] font-bold shrink-0 ${
                        isCurrent
                          ? "bg-primary-foreground text-primary"
                          : isPast
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {isPast ? <Check className="size-3" /> : s.num}
                    </span>
                    <span className="truncate">{s.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* ─────────────────────────────────────────────────────────────
            STEP 01: IDENTIFY THE NEEDS (12 CATEGORIES & MULTI-SELECT)
        ───────────────────────────────────────────────────────────── */}
        {currentStep === 1 && (
          <div className="mt-8 animate-fade-in space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground">
                  What kind of support does your loved one need?
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-readable-muted">
                  Every family has different needs. Select anything that applies. You can combine different types of support to create a plan that works for your family.
                </p>
              </div>

              {/* Search Field */}
              <div className="relative w-full sm:w-80 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tasks (e.g. wheelchair, injection, bath)..."
                  className="pl-9.5 pr-8 h-11 rounded-xl text-xs bg-card border-border"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* If searching: Show Instant Filtered Results */}
            {searchQuery.trim().length > 0 ? (
              <div className="rounded-3xl border border-primary/20 bg-card p-6 shadow-soft space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <Search className="size-4 text-primary" />
                    Search Results ({searchResults.length} matches for "{searchQuery}")
                  </h4>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-xs text-primary font-semibold hover:underline"
                  >
                    Clear Search
                  </button>
                </div>

                {searchResults.length === 0 ? (
                  <div className="py-8 text-center text-xs text-muted-foreground">
                    <p>No matching care tasks found for "{searchQuery}".</p>
                    <p className="mt-1">You can add this as a custom requirement in Step 5 or browse the 12 categories below.</p>
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {searchResults.map(({ task, category, subcategory }) => {
                      const isSelected = selectedTaskIds.includes(task.id);
                      return (
                        <div
                          key={task.id}
                          onClick={() => toggleTaskSelection(task.id)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                            isSelected
                              ? "bg-primary-soft/60 border-primary text-foreground shadow-2xs"
                              : "bg-secondary/30 border-border hover:border-primary/40 text-foreground/90"
                          }`}
                        >
                          <div
                            className={`mt-0.5 size-4.5 rounded-md border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "bg-primary border-primary text-primary-foreground"
                                : "border-muted-foreground/50 bg-card"
                            }`}
                          >
                            {isSelected && <Check className="size-3" />}
                          </div>
                          <div className="min-w-0 flex-1 text-xs">
                            <span className="font-semibold block truncate">{task.name}</span>
                            <span className="text-[11px] text-muted-foreground block line-clamp-1 mt-0.5">
                              {category.name} · {subcategory.name}
                            </span>
                            {task.clinicalClassification === "CLINICAL_NURSING" && (
                              <span className="inline-block mt-1 text-[10px] font-bold text-sky-800 dark:text-sky-300 bg-sky-100 dark:bg-sky-900/50 px-1.5 py-0.2 rounded">
                                Licensed Nurse
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : null}

            {/* 12 Categories Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {CARE_CATEGORIES.map((cat) => {
                const isExpanded = expandedCategoryIds.includes(cat.id);
                const selectedCount = selectedCountByCategory[cat.id] ?? 0;
                const totalTasksInCat = cat.subcategories.reduce((acc, sub) => acc + sub.tasks.length, 0);

                return (
                  <div
                    key={cat.id}
                    className={`rounded-3xl border transition-all overflow-hidden bg-card ${
                      selectedCount > 0
                        ? "border-primary/40 shadow-soft ring-1 ring-primary/20"
                        : "border-border/80 shadow-2xs hover:border-border"
                    }`}
                  >
                    {/* Category Card Header */}
                    <div
                      onClick={() => toggleCategoryExpand(cat.id)}
                      className="p-5 cursor-pointer select-none flex items-start justify-between gap-3 hover:bg-secondary/30 transition-colors"
                      role="button"
                      tabIndex={0}
                      aria-expanded={isExpanded}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") toggleCategoryExpand(cat.id);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="grid size-11 place-items-center rounded-2xl bg-primary-soft text-primary font-bold shrink-0 text-sm">
                          {cat.categoryNumber < 10 ? `0${cat.categoryNumber}` : cat.categoryNumber}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-foreground leading-snug">{cat.name}</h4>
                          </div>
                          <p className="mt-1 text-xs text-readable-muted line-clamp-2 leading-relaxed">
                            {cat.tagline}
                          </p>
                          <div className="mt-2.5 flex items-center gap-2">
                            {selectedCount > 0 ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-2.5 py-0.5 text-[10px] font-bold">
                                <Check className="size-3" /> {selectedCount} selected
                              </span>
                            ) : (
                              <span className="text-[11px] text-muted-foreground">
                                {totalTasksInCat} options
                              </span>
                            )}
                            {cat.isClinical && (
                              <span className="text-[10px] font-bold text-sky-800 dark:text-sky-300 bg-sky-100 dark:bg-sky-900/50 px-2 py-0.5 rounded-full">
                                Clinical Scope
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="p-1 rounded-lg text-muted-foreground hover:text-foreground shrink-0 mt-1">
                        {isExpanded ? <ChevronDown className="size-4.5" /> : <ChevronRight className="size-4.5" />}
                      </div>
                    </div>

                    {/* Expandable Subcategories and Tasks */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-border/60 bg-secondary/20 space-y-4">
                        {cat.subcategories.map((sub) => (
                          <div key={sub.id} className="space-y-2">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                              {sub.name}
                            </p>
                            <div className="space-y-1.5">
                              {sub.tasks.map((task) => {
                                const isSelected = selectedTaskIds.includes(task.id);
                                return (
                                  <label
                                    key={task.id}
                                    className={`flex items-start gap-2.5 p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                                      isSelected
                                        ? "bg-card border border-primary/30 text-foreground font-medium shadow-2xs"
                                        : "hover:bg-card/70 text-foreground/80"
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={isSelected}
                                      onChange={() => toggleTaskSelection(task.id)}
                                      className="mt-0.5 size-4 rounded accent-primary shrink-0 cursor-pointer"
                                    />
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center justify-between gap-1">
                                        <span className="font-semibold text-xs text-foreground">{task.name}</span>
                                        {task.requiresDoctorPrescription && (
                                          <span className="text-[9px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.2 rounded shrink-0">
                                            Rx Req
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[11px] text-muted-foreground leading-normal mt-0.5">
                                        {task.description}
                                      </p>
                                    </div>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Floating Step Bar */}
            <div className="rounded-2xl border border-border bg-card p-4 shadow-soft flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-muted-foreground">
                <span className="font-bold text-foreground text-sm">{selectedTaskIds.length} tasks selected</span> across{" "}
                <span className="font-semibold text-foreground">
                  {Object.values(selectedCountByCategory).filter((c) => c > 0).length} categories
                </span>
                . You can review and refine anytime.
              </div>

              <div className="flex items-center gap-3">
                {selectedTaskIds.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedTaskIds([])}
                    className="text-xs text-muted-foreground hover:text-destructive transition-colors font-medium cursor-pointer"
                  >
                    Clear Selections
                  </button>
                )}
                <Button
                  onClick={() => setCurrentStep(2)}
                  disabled={selectedTaskIds.length === 0}
                  className="rounded-full px-6 font-bold shadow-soft min-h-[44px]"
                >
                  Next: Who Needs Support? <ArrowRight className="size-4 ml-1.5" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            STEP 02: IDENTIFY THE RECIPIENT
        ───────────────────────────────────────────────────────────── */}
        {currentStep === 2 && (
          <div className="mt-8 animate-fade-in max-w-4xl mx-auto space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground">
                Who needs this support?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-readable-muted">
                Understanding who will receive care helps us match appropriate caregiver ergonomics, communication tone, and physical capabilities.
              </p>
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2">
              {RECIPIENT_OPTIONS.map((opt) => {
                const isSelected = recipientType === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => {
                      setRecipientType(opt.id);
                      if (opt.defaultAgeGroup) setAgeGroup(opt.defaultAgeGroup);
                    }}
                    className={`p-5 rounded-3xl border transition-all cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? "bg-card border-primary ring-2 ring-primary/25 shadow-soft"
                        : "bg-card/70 border-border hover:border-primary/40 hover:bg-card"
                    }`}
                  >
                    <div
                      className={`grid size-11 place-items-center rounded-2xl shrink-0 ${
                        isSelected ? "bg-primary text-primary-foreground font-bold" : "bg-primary-soft text-primary"
                      }`}
                    >
                      <UserCheck className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-foreground">{opt.label}</h4>
                        {isSelected && <span className="text-xs font-bold text-primary">Selected</span>}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{opt.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contextual Recipient Details */}
            <div className="p-6 rounded-3xl border border-border bg-card space-y-4">
              <h4 className="font-semibold text-sm text-foreground">Recipient Circumstances</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                    Age Group
                  </label>
                  <select
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    className="w-full h-11 rounded-xl border border-border bg-secondary/30 px-3 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Under 18 years">Under 18 years</option>
                    <option value="18–35 years">18–35 years (Young Adult / Postnatal)</option>
                    <option value="36–59 years">36–59 years (Adult Recovery)</option>
                    <option value="60–74 years">60–74 years (Active Senior)</option>
                    <option value="75–84 years">75–84 years (Elderly Parent)</option>
                    <option value="85+ years">85+ years (Super Senior Support)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                    Current Living Situation
                  </label>
                  <select
                    value={livingSituation}
                    onChange={(e) => setLivingSituation(e.target.value)}
                    className="w-full h-11 rounded-xl border border-border bg-secondary/30 px-3 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Living with family at home">Living with family at home</option>
                    <option value="Living alone independently">Living alone independently (Children in other city/abroad)</option>
                    <option value="Currently admitted in hospital">Currently admitted in hospital (Ward bedside)</option>
                    <option value="Senior living / retirement community">Senior living / retirement community</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setCurrentStep(1)} className="rounded-full">
                Back to Needs
              </Button>
              <Button onClick={() => setCurrentStep(3)} className="rounded-full px-6 font-bold">
                Next: Situation Questions <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            STEP 03: UNDERSTAND THE SITUATION (CONTEXTUAL QUESTIONS)
        ───────────────────────────────────────────────────────────── */}
        {currentStep === 3 && (
          <div className="mt-8 animate-fade-in max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground">
                Help Us Understand the Circumstances
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-readable-muted">
                We only ask questions relevant to your selected needs. This ensures clinical safety and prevents assigning over- or under-qualified professionals.
              </p>
            </div>

            {relevantContextualQuestions.length === 0 ? (
              <div className="rounded-3xl border border-border bg-card p-8 text-center text-xs text-muted-foreground space-y-2">
                <CheckCircle2 className="size-8 text-primary mx-auto" />
                <h4 className="font-semibold text-sm text-foreground">All Set for General Care</h4>
                <p>Your selected care tasks do not require specialized medical or mobility clearances. You can proceed directly to scheduling.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {relevantContextualQuestions.map(({ category, question }) => (
                  <div key={question.id} className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary-soft px-2.5 py-0.5 rounded-full">
                        {category.name}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-foreground">{question.question}</h4>
                    {question.helpText && (
                      <p className="text-xs text-muted-foreground">{question.helpText}</p>
                    )}

                    <div className="grid gap-2 sm:grid-cols-2 pt-2">
                      {question.options.map((opt) => {
                        const currentVal = contextualAnswers[question.id];
                        const isSelected = question.isMultiSelect
                          ? Array.isArray(currentVal) && currentVal.includes(opt.id)
                          : currentVal === opt.id;

                        return (
                          <div
                            key={opt.id}
                            onClick={() => {
                              if (question.isMultiSelect) {
                                const arr = Array.isArray(currentVal) ? [...currentVal] : [];
                                const next = arr.includes(opt.id) ? arr.filter((x) => x !== opt.id) : [...arr, opt.id];
                                setContextualAnswers((prev) => ({ ...prev, [question.id]: next }));
                              } else {
                                setContextualAnswers((prev) => ({ ...prev, [question.id]: opt.id }));
                              }
                            }}
                            className={`p-3 rounded-2xl border text-xs font-medium cursor-pointer transition-all flex items-center gap-2.5 ${
                              isSelected
                                ? "bg-primary-soft/70 border-primary text-foreground shadow-2xs"
                                : "bg-secondary/30 border-border hover:border-primary/40 text-foreground/80"
                            }`}
                          >
                            <div
                              className={`size-4 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
                              }`}
                            >
                              {isSelected && <Check className="size-2.5" />}
                            </div>
                            <span className="leading-snug">{opt.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setCurrentStep(2)} className="rounded-full">
                Back to Recipient
              </Button>
              <Button onClick={() => setCurrentStep(4)} className="rounded-full px-6 font-bold">
                Next: Location & Schedule <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            STEP 04: LOCATION & SCHEDULE
        ───────────────────────────────────────────────────────────── */}
        {currentStep === 4 && (
          <div className="mt-8 animate-fade-in max-w-4xl mx-auto space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground">
                Where and when is care needed?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-readable-muted">
                Customise schedule patterns, daily hours, and shift windows. Different service modules can be scheduled flexibly.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Location Card */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                  <MapPin className="size-4" /> Location Details
                </div>

                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                    City (Active Hubs)
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-11 rounded-xl border border-border bg-secondary/30 px-3 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {CITIES.map((c) => (
                      <option key={c.slug} value={c.name}>
                        {c.name} ({c.state})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                    Neighborhood / Locality
                  </label>
                  <Input
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Indiranagar, T. Nagar, Banjara Hills, RS Puram"
                    className="h-11 rounded-xl text-xs bg-secondary/30 border-border"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                    Care Setting
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "home", label: "Private Home / Flat" },
                      { id: "hospital", label: "Hospital Private/Ward" },
                      { id: "transit_hub", label: "Airport / Railway Station" },
                      { id: "other", label: "Other Destination" },
                    ].map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setVenueType(v.id as any)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                          venueType === v.id
                            ? "bg-primary-soft border-primary text-primary"
                            : "bg-secondary/20 border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Schedule Card */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                  <CalendarDays className="size-4" /> Shift Duration & Rhythm
                </div>

                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                    Shift Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value as any)}
                    className="w-full h-11 rounded-xl border border-border bg-secondary/30 px-3 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="hourly_4h">Short Visit (4 Hours / Trip)</option>
                    <option value="half_day_8h">Half Day (8 Hours Daytime)</option>
                    <option value="full_day_12h">Full Day (12 Hours Continuous Vigil)</option>
                    <option value="overnight_12h">Overnight Vigil (12 Hours Night Shift)</option>
                    <option value="round_the_clock_24h">24 Hours (Round-the-clock / Live-in)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                    Schedule Pattern
                  </label>
                  <select
                    value={scheduleType}
                    onChange={(e) => setScheduleType(e.target.value as any)}
                    className="w-full h-11 rounded-xl border border-border bg-secondary/30 px-3 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="daily">Daily Continuous Support</option>
                    <option value="weekly">Weekdays Only (Monday to Friday)</option>
                    <option value="one_time">Single Occasion / Appointment Shift</option>
                    <option value="custom">Custom Roster / Alternate Days</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                      Calendar Span
                    </label>
                    <select
                      value={calendarDays}
                      onChange={(e) => setCalendarDays(Number(e.target.value))}
                      className="w-full h-11 rounded-xl border border-border bg-secondary/30 px-3 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value={1}>1 Day (Single shift)</option>
                      <option value={7}>7 Days (1 Week)</option>
                      <option value={14}>14 Days (2 Weeks)</option>
                      <option value={30}>30 Days (1 Month)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                      Shift Start Time
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full h-11 rounded-xl border border-border bg-secondary/30 px-3 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setCurrentStep(3)} className="rounded-full">
                Back to Situation
              </Button>
              <Button onClick={() => setCurrentStep(5)} className="rounded-full px-6 font-bold">
                Next: Professional Preferences <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            STEP 05: PROFESSIONAL & SERVICE PREFERENCES
        ───────────────────────────────────────────────────────────── */}
        {currentStep === 5 && (
          <div className="mt-8 animate-fade-in max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground">
                Language & Caregiver Preferences
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-readable-muted">
                South Indian cultural familiarity matters. Select mother-tongue communication, update cadence, and specific household notes.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-6">
              {/* Language Selection */}
              <div>
                <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <Languages className="size-4 text-primary" /> Spoken Language of Care
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {["Tamil", "Telugu", "Kannada", "Malayalam", "English"].map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setPreferredLanguage(lang)}
                      className={`p-3 rounded-2xl border text-xs font-semibold transition-all text-center ${
                        preferredLanguage === lang
                          ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                          : "bg-secondary/30 border-border text-foreground hover:bg-secondary/60"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Caregiver Gender */}
              <div>
                <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <Users className="size-4 text-primary" /> Professional Gender Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "female_only", label: "Female Saha Preferred" },
                    { id: "male_only", label: "Male Attendant (Physical Lift)" },
                    { id: "no_preference", label: "No Preference / Earliest" },
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGenderPreference(g.id as any)}
                      className={`p-3 rounded-2xl border text-xs font-semibold transition-all text-center ${
                        genderPreference === g.id
                          ? "bg-primary-soft border-primary text-primary"
                          : "bg-secondary/30 border-border text-foreground/80 hover:bg-secondary/60"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Family Update Frequency */}
              <div>
                <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <MessageCircle className="size-4 text-primary" /> Family WhatsApp Update Frequency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "daily_whatsapp", label: "Daily WhatsApp Summary" },
                    { id: "twice_daily", label: "Morning & Evening Logs" },
                    { id: "weekly_summary", label: "Weekly Consolidate" },
                  ].map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setFamilyUpdateFrequency(u.id as any)}
                      className={`p-3 rounded-2xl border text-xs font-semibold transition-all text-center ${
                        familyUpdateFrequency === u.id
                          ? "bg-primary-soft border-primary text-primary"
                          : "bg-secondary/30 border-border text-foreground/80 hover:bg-secondary/60"
                      }`}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Requirements Textarea */}
              <div>
                <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-1.5">
                  Custom Requirements or Specific Tasks (Optional)
                </label>
                <textarea
                  rows={3}
                  value={customRequirements}
                  onChange={(e) => setCustomRequirements(e.target.value)}
                  placeholder="Specify any custom requests (e.g. strict vegetarian cooking, wheelchair van required, Tamil devotional songs listening, medication routine nuances)..."
                  className="w-full rounded-2xl border border-border bg-secondary/30 p-3.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Step Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setCurrentStep(4)} className="rounded-full">
                Back to Schedule
              </Button>
              <Button
                onClick={() => {
                  setCurrentStep(6);
                  track("planner_plan_generated", {
                    tasks_count: selectedTaskIds.length,
                    city,
                    duration,
                  });
                }}
                className="rounded-full px-7 font-bold shadow-soft"
              >
                Generate My Care Plan <Sparkles className="size-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            STEP 06: GENERATE THE PERSONALISED CARE PLAN (EDITABLE SUMMARY)
        ───────────────────────────────────────────────────────────── */}
        {currentStep === 6 && (
          <div className="mt-8 animate-fade-in space-y-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="eyebrow">Personalised Care Plan</span>
                <h3 className="mt-1 text-2xl sm:text-3xl font-display font-semibold text-foreground">
                  Your Personalised ApnaCare Plan
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-readable-muted">
                  Plan Reference: <span className="font-mono font-bold text-foreground">{generatedPlan.id}</span> · Ready to review and carry directly into booking.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentStep(1)}
                  className="rounded-full text-xs"
                >
                  <Sliders className="size-3.5 mr-1.5" /> Edit Selections
                </Button>
              </div>
            </div>

            {/* Statutory Clinical Scope Notice if mixing clinical & non-clinical */}
            {generatedPlan.clinicalBoundaryNotice && (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
                <AlertCircle className="size-5 shrink-0 text-amber-600 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Clinical Scope Separation:</strong> {generatedPlan.clinicalBoundaryNotice}
                </p>
              </div>
            )}

            <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] items-start">
              {/* Left Column: Modules & Selected Tasks */}
              <div className="space-y-6">
                {/* Recommended Service Modules */}
                <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <h4 className="font-bold text-base text-foreground flex items-center gap-2">
                      <Sparkles className="size-4 text-primary" />
                      Recommended Care Modules ({generatedPlan.recommendedModules.length})
                    </h4>
                    <span className="text-xs text-muted-foreground">Mapped from your needs</span>
                  </div>

                  <div className="space-y-4">
                    {generatedPlan.recommendedModules.map((mod) => (
                      <div
                        key={mod.id}
                        className="rounded-2xl border border-border/80 bg-secondary/20 p-4.5 space-y-3"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                              {mod.categoryName}
                            </span>
                            <h5 className="font-bold text-sm text-foreground mt-0.5">{mod.title}</h5>
                          </div>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              mod.requiredRole.includes("Nurse")
                                ? "bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300"
                                : "bg-primary-soft text-primary"
                            }`}
                          >
                            <UserCheck className="size-3" /> {mod.requiredRole}
                          </span>
                        </div>

                        <p className="text-xs text-readable-muted leading-relaxed">{mod.whyRecommended}</p>

                        <div className="pt-2 border-t border-border/60">
                          <p className="text-[11px] font-semibold text-muted-foreground mb-1.5">
                            Covered Tasks ({mod.coveredTaskNames.length}):
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {mod.coveredTaskNames.map((name) => (
                              <span
                                key={name}
                                className="inline-flex items-center gap-1 rounded-lg bg-card px-2 py-0.5 text-[10px] font-medium text-foreground border border-border"
                              >
                                <Check className="size-2.5 text-primary" /> {name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Tasks Breakdown by Category with Direct Remove */}
                <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <h4 className="font-bold text-sm text-foreground">
                      Selected Tasks Breakdown ({selectedTaskIds.length} tasks)
                    </h4>
                    <span className="text-xs text-muted-foreground">Click × to remove</span>
                  </div>

                  <div className="space-y-4">
                    {generatedPlan.selectedTasksByCategory.map(({ category, tasks }) => (
                      <div key={category.id} className="space-y-2">
                        <p className="text-xs font-bold text-primary uppercase tracking-wider">
                          {category.name} ({tasks.length})
                        </p>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {tasks.map((task) => (
                            <div
                              key={task.id}
                              className="p-2.5 rounded-xl border border-border/70 bg-secondary/30 flex items-center justify-between text-xs"
                            >
                              <span className="truncate pr-2 font-medium">{task.name}</span>
                              <button
                                type="button"
                                onClick={() => toggleTaskSelection(task.id)}
                                title="Remove task from plan"
                                className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors"
                              >
                                <X className="size-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Plan Summary Card & Booking CTAs */}
              <div className="space-y-6 lg:sticky lg:top-24">
                <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Care Recipient</span>
                      <h4 className="font-bold text-base text-foreground mt-0.5">{generatedPlan.recipient.label}</h4>
                      <p className="text-xs text-muted-foreground">{generatedPlan.recipient.ageGroup}</p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary-soft text-primary">
                      {generatedPlan.schedule.city}
                    </span>
                  </div>

                  {/* Schedule Details */}
                  <div className="space-y-2.5 text-xs pb-4 border-b border-border">
                    {[
                      ["Area / Locality", `${generatedPlan.schedule.area}`],
                      ["Language of Care", generatedPlan.preferences.preferredLanguage],
                      ["Schedule Pattern", generatedPlan.schedule.scheduleType.toUpperCase()],
                      ["Daily Duration", `${generatedPlan.schedule.duration.replace("_", " ")}`],
                      ["Reporting Time", generatedPlan.schedule.startTime || "08:00 AM"],
                      ["Calendar Span", `${generatedPlan.schedule.calendarDays} Days`],
                      ["Billable Shifts", `${generatedPlan.pricing.billableShifts} shifts`],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between text-muted-foreground">
                        <span>{k}</span>
                        <span className="font-semibold text-foreground text-right">{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-2 text-xs pb-4 border-b border-border">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Est. Base Shift Rate</span>
                      <span className="font-semibold text-foreground">
                        {formatINR(generatedPlan.pricing.estimatedShiftRate)}/shift
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Subtotal ({generatedPlan.pricing.billableShifts} shifts)</span>
                      <span className="font-semibold text-foreground">
                        {formatINR(generatedPlan.pricing.subtotal)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Statutory GST (18%)</span>
                      <span className="font-semibold text-foreground">
                        +{formatINR(generatedPlan.pricing.gstAmount)}
                      </span>
                    </div>
                    <div className="pt-2 flex items-center justify-between text-base font-bold text-foreground border-t border-border/60">
                      <span>Estimated Total (incl. GST)</span>
                      <span className="text-primary text-xl font-display">
                        {formatINR(generatedPlan.pricing.totalAmount)}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-tight pt-1">
                      {generatedPlan.pricing.pricingNote}
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3 pt-2">
                    <Button
                      asChild
                      size="lg"
                      className="w-full rounded-full shadow-soft font-bold min-h-[48px]"
                    >
                      <Link
                        to="/booking"
                        search={generatedPlan.bookingQueryParams}
                        onClick={() => {
                          track("planner_proceed_booking", {
                            plan_id: generatedPlan.id,
                            total: generatedPlan.pricing.totalAmount,
                            shifts: generatedPlan.pricing.billableShifts,
                            city: generatedPlan.schedule.city,
                          });
                        }}
                      >
                        Continue with My Care Plan <ArrowRight className="size-4 ml-2" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full rounded-full border-border bg-card hover:bg-secondary text-xs"
                    >
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track("planner_whatsapp_discuss", { plan_id: generatedPlan.id })}
                      >
                        <MessageCircle className="size-4 mr-2 text-emerald-600" />
                        Talk to a Care Coordinator on WhatsApp
                      </a>
                    </Button>
                  </div>

                  {/* Safety & Trust Micro-Badges */}
                  <div className="pt-3 border-t border-border/70 flex flex-col gap-1.5 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="size-3.5 text-primary" />
                      Aadhaar Biometric & Police Verification Verified
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5 text-primary" />
                      90-Minute Regional Cluster Standby Backup Protocol
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* "Help Me Choose" Situation Presets Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl rounded-3xl border border-border bg-card p-6 md:p-8 shadow-lift max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h4 className="text-xl font-bold font-display text-foreground">
                  Common Family Situations
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Select a starting situation to automatically populate recommended tasks. You can customise them freely afterwards.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-xl"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2">
              {SITUATION_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => applyPreset(preset)}
                  className="p-5 rounded-2xl border border-border bg-secondary/20 hover:border-primary/50 hover:bg-secondary/40 transition-all cursor-pointer space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary-soft px-2 py-0.5 rounded">
                      {preset.badge}
                    </span>
                    <h5 className="font-bold text-sm text-foreground mt-2">{preset.title}</h5>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                      {preset.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs text-primary font-semibold">
                    <span>{preset.taskIds.length} preselected tasks</span>
                    <span className="flex items-center gap-1">Apply ➔</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <Button variant="ghost" size="sm" onClick={() => setShowHelpModal(false)} className="text-xs">
                Close and return to manual selection
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
