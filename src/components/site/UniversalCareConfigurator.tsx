import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
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
  ArrowLeft,
  MessageCircle,
  AlertCircle,
  MapPin,
  Languages,
  Check,
  RotateCcw,
  ChevronRight,
  Search,
  Clock,
  CalendarDays,
  X,
  Car,
  User,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CARE_CATEGORIES,
  searchTasksByKeyword,
  type CareCategory,
  type CareTask,
} from "@/data/careNeedsTaxonomy";
import {
  generateCarePlan,
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

// Visual Personas for Step 1
interface RecipientPersona {
  id: RecipientProfileType;
  title: string;
  subtitle: string;
  badge: string;
  icon: typeof User;
  defaultGender: "male" | "female" | "both" | "other";
  defaultAge: string;
  defaultNeeds: string[];
}

const PERSONAS: RecipientPersona[] = [
  {
    id: "elderly_parent",
    title: "My Father",
    subtitle: "Senior male needing walking, personal care, or companionship",
    badge: "Most Common",
    icon: User,
    defaultGender: "male",
    defaultAge: "70–80 years",
    defaultNeeds: ["task-walk-indoor", "task-hyg-bathing", "task-meal-serving", "task-med-remind"],
  },
  {
    id: "elderly_parent",
    title: "My Mother",
    subtitle: "Senior female needing gentle hygiene, mobility, and warmth",
    badge: "Most Common",
    icon: Heart,
    defaultGender: "female",
    defaultAge: "70–80 years",
    defaultNeeds: ["task-walk-indoor", "task-hyg-sponge", "task-meal-serving", "task-comp-conversation"],
  },
  {
    id: "elderly_parent",
    title: "Both Parents",
    subtitle: "Elderly couple needing shared domestic and wellness support",
    badge: "Couple Plan",
    icon: Users,
    defaultGender: "both",
    defaultAge: "70–80 years",
    defaultNeeds: ["task-walk-indoor", "task-hh-meal-prep", "task-med-remind", "task-comp-conversation"],
  },
  {
    id: "adult",
    title: "Post-Hospital Patient",
    subtitle: "Recovering from surgery, fracture, or hospital discharge",
    badge: "Post-Surgical",
    icon: Home,
    defaultGender: "female",
    defaultAge: "50–65 years",
    defaultNeeds: ["task-post-rec-assist", "task-disch-home-acc", "task-hyg-sponge", "task-proc-wound"],
  },
  {
    id: "new_mother",
    title: "New Mother & Baby",
    subtitle: "Traditional Japa care, baby oil massage & mother nutrition",
    badge: "Fourth Trimester",
    icon: Baby,
    defaultGender: "female",
    defaultAge: "Newborn + Mother",
    defaultNeeds: ["task-mat-daily", "task-mat-meal", "task-nb-bath", "task-nb-diaper", "task-nb-overnight"],
  },
  {
    id: "person_with_disability",
    title: "Specialised Daily Support",
    subtitle: "Parkinson's, post-stroke recovery, or dementia assistance",
    badge: "High Dependency",
    icon: Shield,
    defaultGender: "male",
    defaultAge: "60–75 years",
    defaultNeeds: ["task-dis-physical", "task-transfer-bed-chair", "task-hyg-sponge", "task-dis-supervision"],
  },
  {
    id: "child",
    title: "My Child / Toddler",
    subtitle: "Trusted nanny & babysitting while parents are at work or out of station",
    badge: "Nanny & Childcare",
    icon: Baby,
    defaultGender: "other",
    defaultAge: "3 years",
    defaultNeeds: [
      "task-child-supervision",
      "task-child-meals",
      "task-child-bedtime",
      "task-child-outstation-cover",
      "task-child-parent-updates",
    ],
  },
  {
    id: "myself",
    title: "Myself",
    subtitle: "Personal accompaniment, hospital appointments, or mobility",
    badge: "Self",
    icon: User,
    defaultGender: "other",
    defaultAge: "30–50 years",
    defaultNeeds: ["task-trans-appointment", "task-apt-doc-acc", "task-local-pharmacy"],
  },
];

export function UniversalCareConfigurator() {
  const navigate = useNavigate();

  // Progressive 5-step journey:
  // Step 1: Who Needs Care (Persona, Gender, Age)
  // Step 2: Care & Support Required (Visual theme pills, NO endless checkboxes)
  // Step 3: Location & Schedule (City, Duration, Calendar)
  // Step 4: Saha Language & Preferences (Language, Caregiver Gender)
  // Step 5: Custom Plan Review & Transparent Pricing
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // ─── Step 1: Recipient Profile State ─────────────────────────────────────
  const [selectedPersonaIdx, setSelectedPersonaIdx] = useState<number>(0);
  const [recipientType, setRecipientType] = useState<RecipientProfileType>("elderly_parent");
  const [recipientTitle, setRecipientTitle] = useState<string>("My Father");
  const [patientGender, setPatientGender] = useState<"male" | "female" | "both" | "other">("male");
  const [ageGroup, setAgeGroup] = useState<string>("70–80 years");
  const [livingSituation, setLivingSituation] = useState<string>("Living with family");

  // ─── Step 2: Care Needs State ────────────────────────────────────────────
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([
    "task-walk-indoor",
    "task-hyg-bathing",
    "task-med-remind",
    "task-comp-conversation",
  ]);
  const [activeCategoryId, setActiveCategoryId] = useState<string>("cat-mobility");
  const [searchQuery, setSearchQuery] = useState("");

  // ─── Step 3: Schedule & Location State ───────────────────────────────────
  const [city, setCity] = useState("Bengaluru");
  const [area, setArea] = useState("Indiranagar / Koramangala");
  const [duration, setDuration] = useState<DurationOption>("full_day_12h");
  const [scheduleType, setScheduleType] = useState<ScheduleType>("daily");
  const [calendarDays, setCalendarDays] = useState(14);
  const [timing, setTiming] = useState<TimingPreference>("morning");
  const [startTime, setStartTime] = useState("08:00");

  // ─── New Mother: Trimester State ─────────────────────────────────────────
  const [trimester, setTrimester] = useState<string>("");

  // ─── Step 4: Preferences State ───────────────────────────────────────────
  const [preferredLanguage, setPreferredLanguage] = useState("Tamil");
  const [genderPreference, setGenderPreference] = useState<"female_only" | "male_only" | "no_preference">("male_only");
  const [familyUpdateFrequency, setFamilyUpdateFrequency] = useState<"daily_whatsapp" | "twice_daily" | "weekly_summary">("daily_whatsapp");
  const [customRequirements, setCustomRequirements] = useState("");

  // Restore draft from localStorage on mount
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
        if (d.recipientTitle) setRecipientTitle(d.recipientTitle);
        if (d.patientGender) setPatientGender(d.patientGender);
        if (d.ageGroup) setAgeGroup(d.ageGroup);
        if (d.city) setCity(d.city);
        if (d.duration) setDuration(d.duration);
        if (d.preferredLanguage) setPreferredLanguage(d.preferredLanguage);
        // Restore persona card visual selection
        if (typeof d.selectedPersonaIdx === "number") setSelectedPersonaIdx(d.selectedPersonaIdx);
      }
    } catch {
      // Quiet fallback
    }
  }, []);

  // Save draft whenever key fields change
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          selectedTaskIds,
          recipientType,
          recipientTitle,
          patientGender,
          ageGroup,
          city,
          duration,
          preferredLanguage,
          calendarDays,
          selectedPersonaIdx,
        })
      );
    } catch {
      // Ignore
    }
  }, [
    selectedTaskIds,
    recipientType,
    recipientTitle,
    patientGender,
    ageGroup,
    city,
    duration,
    preferredLanguage,
    calendarDays,
    selectedPersonaIdx,
  ]);

  // Handle persona selection
  const handleSelectPersona = (idx: number) => {
    const p = PERSONAS[idx];
    setSelectedPersonaIdx(idx);
    setRecipientType(p.id);
    setRecipientTitle(p.title);
    setPatientGender(p.defaultGender);
    setAgeGroup(p.defaultAge);
    setSelectedTaskIds(p.defaultNeeds);

    // Reset trimester when switching away from new_mother
    if (p.id !== "new_mother") setTrimester("");

    // Adjust smart Saha gender recommendation
    if (p.defaultGender === "female") {
      setGenderPreference("female_only");
    } else if (p.defaultGender === "male") {
      setGenderPreference("male_only");
    } else {
      setGenderPreference("no_preference");
    }

    track("planner_persona_selected", { persona: p.title, gender: p.defaultGender });
  };

  // Toggle individual task selection
  const toggleTask = (taskId: string) => {
    setSelectedTaskIds((prev) => {
      const exists = prev.includes(taskId);
      const next = exists ? prev.filter((id) => id !== taskId) : [...prev, taskId];
      track(exists ? "planner_need_removed" : "planner_need_selected", { task_id: taskId });
      return next;
    });
  };

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchTasksByKeyword(searchQuery);
  }, [searchQuery]);

  // Active Category Object
  const activeCategory = useMemo(() => {
    return CARE_CATEGORIES.find((c) => c.id === activeCategoryId) || CARE_CATEGORIES[0];
  }, [activeCategoryId]);

  // Derived count per category
  const selectedCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of CARE_CATEGORIES) {
      let count = 0;
      for (const sub of cat.subcategories) {
        for (const t of sub.tasks) {
          if (selectedTaskIds.includes(t.id)) count++;
        }
      }
      counts[cat.id] = count;
    }
    return counts;
  }, [selectedTaskIds]);

  // Build Generated Care Plan
  const generatedPlan: GeneratedCarePlan = useMemo(() => {
    const recipient: RecipientProfile = {
      type: recipientType,
      label: recipientTitle,
      gender: patientGender,
      ageGroup,
      livingSituation,
    };

    const schedule: PlanSchedule = {
      city,
      area,
      venueType: "home",
      scheduleType,
      timing,
      duration,
      calendarDays,
      startTime,
    };

    const preferences: PlanPreferences = {
      preferredLanguage,
      genderPreference,
      continuityRequirement: true,
      familyUpdateFrequency,
      specialNotes: customRequirements,
    };

    return generateCarePlan(selectedTaskIds, recipient, schedule, preferences, customRequirements);
  }, [
    selectedTaskIds,
    recipientType,
    recipientTitle,
    patientGender,
    ageGroup,
    livingSituation,
    city,
    area,
    scheduleType,
    timing,
    duration,
    calendarDays,
    startTime,
    preferredLanguage,
    genderPreference,
    familyUpdateFrequency,
    customRequirements,
  ]);

  // Transition to /booking with active plan
  const handleProceedToBooking = () => {
    try {
      sessionStorage.setItem("apnacare_active_care_plan", JSON.stringify(generatedPlan));
    } catch {
      // Ignore
    }

    track("planner_booking_transfer", {
      plan_id: generatedPlan.id,
      tasks_count: selectedTaskIds.length,
      city,
      patient_gender: patientGender,
      recipient: recipientTitle,
    });

    navigate({
      to: "/booking",
      search: {
        service: generatedPlan.recommendedModules[0]?.serviceSlug || "elderly-care",
        city: city.toLowerCase(),
        duration: String(generatedPlan.schedule.calendarDays || 1),
        time: startTime,
        shift: duration,
        planId: generatedPlan.id,
      },
    });
  };

  const STEPS_NAV = [
    { num: 1, label: "Who Needs Care", icon: User },
    { num: 2, label: "Care & Support", icon: Heart },
    { num: 3, label: "Schedule & City", icon: CalendarDays },
    { num: 4, label: "Language & Match", icon: Languages },
    { num: 5, label: "Care Plan Review", icon: Sparkles },
  ];

  return (
    <section id="custom-care-plan" className="py-16 bg-gradient-to-b from-secondary/40 via-background to-secondary/20">
      <div className="container-page max-w-6xl">
        {/* Header Intro */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary mb-3">
            <Sparkles className="size-3.5" /> Intelligent Care Customisation
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Personalise Support for Your Family's Needs
          </h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
            No rigid packages or guesswork. Tell us who needs care, choose the exact daily assistance required, and let ApnaCare organise verified Saha companions and healthcare professionals around you.
          </p>

          {/* Interactive Stepper Indicator */}
          <div className="mt-8 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            {STEPS_NAV.map((s) => {
              const isCurrent = currentStep === s.num;
              const isPast = currentStep > s.num;
              const StepIcon = s.icon;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setCurrentStep(s.num as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                    isCurrent
                      ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20 scale-105"
                      : isPast
                      ? "bg-primary-soft text-primary hover:bg-primary-soft/80 cursor-pointer"
                      : "bg-muted text-muted-foreground/60 cursor-pointer hover:bg-muted/80"
                  }`}
                >
                  <StepIcon className="size-3.5 shrink-0" />
                  <span>
                    {s.num}. {s.label}
                  </span>
                  {isPast && <Check className="size-3 text-primary stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* STEP 1: WHO NEEDS CARE? (Persona, Patient Gender & Age)          */}
        {/* ───────────────────────────────────────────────────────────────── */}
        {currentStep === 1 && (
          <div className="card-soft p-6 md:p-10 shadow-soft max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
              <span className="text-xs font-bold uppercase text-terracotta tracking-wider">Step 1 of 5</span>
              <h3 className="text-2xl font-semibold mt-1">Who are you looking for care for?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Select the family member or loved one. We customize care routines and Saha matching based on their comfort and gender.
              </p>
            </div>

            {/* Persona Visual Cards Grid */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PERSONAS.map((p, idx) => {
                const isSelected = selectedPersonaIdx === idx;
                const PIcon = p.icon;
                return (
                  <button
                    key={p.title}
                    type="button"
                    onClick={() => handleSelectPersona(idx)}
                    className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? "bg-primary-soft/80 border-primary ring-2 ring-primary/20 shadow-sm"
                        : "bg-card border-border hover:border-primary/40 hover:bg-secondary/40"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`size-9 rounded-xl grid place-items-center ${
                            isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          <PIcon className="size-4.5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                          {p.badge}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm text-foreground">{p.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-snug">{p.subtitle}</p>
                    </div>

                    {isSelected && (
                      <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-primary">
                        <CheckCircle2 className="size-3.5" /> Selected
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── TRIMESTER QUESTION (only for New Mother & Baby) ─────────── */}
            {PERSONAS[selectedPersonaIdx]?.id === "new_mother" && (
              <div className="rounded-2xl border border-terracotta/30 bg-terracotta/5 p-5 space-y-3 animate-fade-in">
                <div>
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Baby className="size-4 text-terracotta" />
                    Which stage is the mother currently in? *
                  </label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Helps us match the right Japa / postnatal care routines, diet support and newborn assistance.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  {[
                    { id: "1st_trimester", label: "1st Trimester", sub: "Weeks 1–12", icon: "🌱" },
                    { id: "2nd_trimester", label: "2nd Trimester", sub: "Weeks 13–26", icon: "🤰" },
                    { id: "3rd_trimester", label: "3rd Trimester", sub: "Weeks 27–40", icon: "🤱" },
                    { id: "4th_trimester", label: "4th Trimester", sub: "After delivery (0–3 months)", icon: "👶" },
                  ].map((t) => {
                    const isSelected = trimester === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setTrimester(t.id);
                          // Adjust default care needs by trimester
                          if (t.id === "4th_trimester") {
                            setSelectedTaskIds(["task-mat-daily", "task-mat-meal", "task-nb-bath", "task-nb-diaper", "task-nb-overnight"]);
                          } else if (t.id === "3rd_trimester") {
                            setSelectedTaskIds(["task-mat-daily", "task-mat-meal", "task-walk-indoor", "task-hh-meal-prep"]);
                          } else {
                            setSelectedTaskIds(["task-mat-daily", "task-mat-meal", "task-comp-conversation"]);
                          }
                        }}
                        className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-0.5 ${
                          isSelected
                            ? "bg-terracotta/15 border-terracotta text-terracotta shadow-2xs font-bold"
                            : "bg-card border-border hover:border-terracotta/40 text-foreground"
                        }`}
                      >
                        <span className="text-lg leading-none">{t.icon}</span>
                        <span className="text-xs font-semibold mt-1">{t.label}</span>
                        <span className="text-[10px] text-muted-foreground leading-tight">{t.sub}</span>
                      </button>
                    );
                  })}
                </div>
                {!trimester && (
                  <p className="text-[11px] text-terracotta/80 font-medium flex items-center gap-1">
                    ⚠️ Please select a stage so we can customise the right care for mother & baby.
                  </p>
                )}
              </div>
            )}

            {/* PROMINENT GENDER OF THE PATIENT / MEMBER (User Request) */}
            <div className="rounded-2xl border border-primary/20 bg-primary-soft/30 p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <User className="size-4 text-primary" />
                    Gender of the Member needing support *
                  </label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Essential for matching: Ensures complete dignity, personal hygiene comfort (e.g. female attendant for mother's bathing) and cultural sensitivity.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {[
                  { id: "male", label: "Male", icon: "👨" },
                  { id: "female", label: "Female", icon: "👩" },
                  { id: "both", label: "Both Parents", icon: "👫" },
                  { id: "other", label: "Prefer Not to Say", icon: "🤝" },
                ].map((g) => {
                  const isChecked = patientGender === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => {
                        setPatientGender(g.id as any);
                        if (g.id === "female") setGenderPreference("female_only");
                        else if (g.id === "male") setGenderPreference("male_only");
                      }}
                      className={`h-12 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                        isChecked
                          ? "bg-primary text-primary-foreground border-primary shadow-2xs font-bold"
                          : "bg-card border-border hover:border-primary/40 text-foreground"
                      }`}
                    >
                      <span>{g.icon}</span>
                      <span>{g.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Age of Recipient (User can type any exact age or pick quick suggestion) & Living Setting */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="custom-age-input" className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Age of the Person Needing Care *
                  </label>
                  <span className="text-[11px] text-muted-foreground">Type any age or pick below</span>
                </div>
                <Input
                  id="custom-age-input"
                  type="text"
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  placeholder="e.g. 74 years, 4 years, 8 months, 82..."
                  className="h-11 rounded-xl text-sm bg-card border-border font-medium"
                />
                {/* Quick suggestions for 1-tap convenience without restricting the user */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    "75 years",
                    "82 years",
                    "68 years",
                    "4 years (Child)",
                    "2 years (Toddler)",
                    "6 months",
                    "45 years",
                  ].map((sugg) => (
                    <button
                      key={sugg}
                      type="button"
                      onClick={() => setAgeGroup(sugg)}
                      className={`px-2.5 py-1 rounded-lg text-xs border transition-all ${
                        ageGroup === sugg
                          ? "bg-primary text-primary-foreground border-primary font-bold shadow-2xs"
                          : "bg-card border-border hover:bg-secondary/60 text-foreground"
                      }`}
                    >
                      {sugg}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider block">
                  Current Living Setting / Situation *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "Living with family", label: "Living with family" },
                    { id: "Parents out of station / travelling", label: "Parents out of station ✈️" },
                    { id: "Living independently", label: "Living independently" },
                    { id: "Currently in hospital", label: "Currently in hospital 🏥" },
                    { id: "Bedbound / limited mobility", label: "Bedbound / recovery" },
                    { id: "Temporary relief cover", label: "Temporary relief cover" },
                  ].map((sit) => (
                    <button
                      key={sit.id}
                      type="button"
                      onClick={() => setLivingSituation(sit.id)}
                      className={`h-10 px-2.5 rounded-xl border text-xs font-semibold transition-all truncate text-left ${
                        livingSituation === sit.id
                          ? "bg-primary text-primary-foreground border-primary shadow-2xs font-bold"
                          : "bg-card border-border hover:border-primary/30 text-foreground"
                      }`}
                    >
                      {sit.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between border-t border-border pt-6">
              <span className="text-xs text-muted-foreground">
                Configuring care for: <strong className="text-foreground">{recipientTitle}</strong> ({patientGender}, {ageGroup})
              </span>
              <Button onClick={() => setCurrentStep(2)} className="gap-2">
                Continue to Care & Support <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* STEP 2: CARE & SUPPORT REQUIRED (Interactive Pills — NO ENDLESS CHECKBOXES) */}
        {/* ───────────────────────────────────────────────────────────────── */}
        {currentStep === 2 && (
          <div className="card-soft p-6 md:p-10 shadow-soft max-w-5xl mx-auto space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase text-terracotta tracking-wider">Step 2 of 5</span>
                <h3 className="text-2xl font-semibold mt-1">What daily support does {recipientTitle} need?</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Tap any task to add or remove it from your care plan. No tedious checklists or rigid packages.
                </p>
              </div>

              {/* Live Selected Counter Badge */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary text-primary-foreground flex items-center gap-1.5 shadow-2xs">
                  <Sparkles className="size-3.5" />
                  {selectedTaskIds.length} Needs Selected
                </span>
                {selectedTaskIds.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedTaskIds([])}
                    className="text-xs text-muted-foreground hover:text-destructive underline"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Live Selected Task Chips Ribbon */}
            {selectedTaskIds.length > 0 ? (
              <div className="rounded-2xl border border-primary/20 bg-primary-soft/30 p-3.5">
                <div className="flex items-center justify-between text-xs font-semibold text-foreground mb-2">
                  <span className="flex items-center gap-1.5 text-primary">
                    <CheckCircle2 className="size-4" /> Active Care Plan Items ({selectedTaskIds.length})
                  </span>
                  <span className="text-muted-foreground text-[11px]">Tap (✕) to remove</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTaskIds.map((taskId) => {
                    const match = CARE_CATEGORIES.flatMap((c) => c.subcategories.flatMap((s) => s.tasks)).find((t) => t.id === taskId);
                    return (
                      <span
                        key={taskId}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-card border border-primary/30 text-foreground shadow-2xs animate-fade-in"
                      >
                        <span>{match?.name || taskId}</span>
                        <button
                          type="button"
                          onClick={() => toggleTask(taskId)}
                          className="size-3.5 rounded-full hover:bg-muted grid place-items-center text-muted-foreground hover:text-foreground"
                          title="Remove item"
                        >
                          <X className="size-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                Tap any care requirement below to add it to your family's plan.
              </div>
            )}

            {/* Quick 1-Tap Persona Shortcut */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-secondary/50 border border-border text-xs">
              <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                <Zap className="size-3.5 text-primary" />
                Quick preset for <strong>{recipientTitle}</strong>:
              </span>
              <button
                type="button"
                onClick={() => {
                  const persona = PERSONAS[selectedPersonaIdx];
                  if (persona) {
                    setSelectedTaskIds(persona.defaultNeeds);
                  }
                }}
                className="text-primary font-bold hover:underline inline-flex items-center gap-1"
              >
                Apply Recommended Tasks for {recipientTitle} →
              </button>
            </div>

            {/* Quick Keyword Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Quick search any care need (e.g. walker, sponge bath, injection, insulin, temple, hospital)..."
                className="pl-9.5 pr-8 h-11 rounded-xl text-xs bg-card border-border"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Instant Search Results if typing */}
            {searchQuery.trim().length > 0 ? (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground">
                  Search Results for "{searchQuery}" ({searchResults.length} matches):
                </p>
                <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-3">
                  {searchResults.map(({ task, category }) => {
                    const isSelected = selectedTaskIds.includes(task.id);
                    return (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => toggleTask(task.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-card border-border hover:border-primary/40 text-foreground"
                        }`}
                      >
                        <div
                          className={`size-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected ? "bg-primary-foreground text-primary border-primary-foreground" : "border-muted-foreground/40 bg-card"
                          }`}
                        >
                          {isSelected && <Check className="size-3 stroke-[3]" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold leading-snug">{task.name}</p>
                          <p className={`text-[11px] mt-0.5 line-clamp-1 ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                            {category.name}
                          </p>
                          {task.clinicalClassification === "CLINICAL_NURSING" && (
                            <span className={`inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              isSelected ? "bg-white/20 text-white" : "bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300"
                            }`}>
                              Registered Nurse
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Interactive Category Navigator + Task Cards Cloud (NO endless vertical accordion!) */
              <div className="space-y-5">
                {/* Horizontal Category Nav Pills */}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                    Browse by Care Category (12 Primary Disciplines)
                  </label>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {CARE_CATEGORIES.map((cat) => {
                      const isActive = activeCategoryId === cat.id;
                      const count = selectedCounts[cat.id] ?? 0;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setActiveCategoryId(cat.id)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                            isActive
                              ? "bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/20"
                              : "bg-card border border-border hover:bg-secondary/60 text-foreground"
                          }`}
                        >
                          <span>{cat.name}</span>
                          {count > 0 && (
                            <span
                              className={`size-4.5 rounded-full text-[10px] font-bold grid place-items-center ${
                                isActive ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"
                              }`}
                            >
                              {count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Category Tasks Cloud */}
                <div className="rounded-3xl border border-border/80 bg-secondary/30 p-5 md:p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                    <div>
                      <h4 className="font-semibold text-base text-foreground">{activeCategory.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{activeCategory.tagline}</p>
                    </div>
                    {activeCategory.isClinical && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300 shrink-0">
                        <Stethoscope className="size-3.5" /> Clinical Discipline (Prescription Required)
                      </span>
                    )}
                  </div>

                  {/* Render Subcategories with Compact Interactive Pill Cards */}
                  <div className="space-y-5">
                    {activeCategory.subcategories.map((sub) => (
                      <div key={sub.id} className="space-y-2.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                          {sub.name}
                        </span>
                        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                          {sub.tasks.map((task) => {
                            const isSelected = selectedTaskIds.includes(task.id);
                            return (
                              <button
                                key={task.id}
                                type="button"
                                onClick={() => toggleTask(task.id)}
                                className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                                  isSelected
                                    ? "bg-primary text-primary-foreground border-primary shadow-sm ring-1 ring-primary/30"
                                    : "bg-card border-border hover:border-primary/40 hover:bg-secondary/40 text-foreground"
                                }`}
                              >
                                <div
                                  className={`size-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                                    isSelected
                                      ? "bg-primary-foreground text-primary border-primary-foreground"
                                      : "border-muted-foreground/40 bg-card"
                                  }`}
                                >
                                  {isSelected && <Check className="size-3.5 stroke-[3]" />}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-bold leading-snug">{task.name}</p>
                                  <p
                                    className={`text-[11px] mt-1 line-clamp-2 leading-relaxed ${
                                      isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                                    }`}
                                  >
                                    {task.description}
                                  </p>
                                  {task.clinicalClassification === "CLINICAL_NURSING" && (
                                    <span
                                      className={`inline-block mt-2 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                        isSelected
                                          ? "bg-white/20 text-white"
                                          : "bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300"
                                      }`}
                                    >
                                      Prescribed RN
                                    </span>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Controls */}
            <div className="flex items-center justify-between border-t border-border pt-6">
              <Button variant="outline" onClick={() => setCurrentStep(1)} className="gap-2">
                <ArrowLeft className="size-4" /> Back to Recipient
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                disabled={selectedTaskIds.length === 0}
                className="gap-2"
              >
                Continue to Schedule ({selectedTaskIds.length} Needs) <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* STEP 3: SCHEDULE, CITY & DURATION                                 */}
        {/* ───────────────────────────────────────────────────────────────── */}
        {currentStep === 3 && (
          <div className="card-soft p-6 md:p-10 shadow-soft max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
              <span className="text-xs font-bold uppercase text-terracotta tracking-wider">Step 3 of 5</span>
              <h3 className="text-2xl font-semibold mt-1">Where and when is care required?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Choose your city cluster, daily shift duration, and start date. All rates feature full transparency with 18% GST.
              </p>
            </div>

            {/* City Selection */}
            <div>
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">
                City / Metro Cluster in South India *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {[
                  { id: "Bengaluru", label: "Bengaluru", state: "Karnataka" },
                  { id: "Chennai", label: "Chennai", state: "Tamil Nadu" },
                  { id: "Hyderabad", label: "Hyderabad", state: "Telangana" },
                  { id: "Coimbatore", label: "Coimbatore", state: "Tamil Nadu" },
                  { id: "Kochi", label: "Kochi", state: "Kerala" },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCity(c.id)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      city.toLowerCase() === c.id.toLowerCase()
                        ? "bg-primary text-primary-foreground border-primary shadow-2xs font-bold"
                        : "bg-card border-border hover:border-primary/40 text-foreground"
                    }`}
                  >
                    <span className="block text-sm font-semibold">{c.label}</span>
                    <span className="block text-[10px] opacity-80 mt-0.5">{c.state}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Area / Neighborhood */}
            <div>
              <label htmlFor="area-input" className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">
                Locality / Apartment / Area in {city}
              </label>
              <Input
                id="area-input"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. Jayanagar 4th Block, Adyar Gandhinagar, Banjara Hills Rd 12, Kadavanthra..."
                className="h-12 rounded-xl text-sm"
              />
            </div>

            {/* Shift Duration Cards */}
            <div>
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">
                Daily Shift Duration *
              </label>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    id: "half_day_8h",
                    title: "Day Shift (8 Hours)",
                    hours: "8 hrs/day",
                    rate: "₹1,199 / shift",
                    desc: "Morning routine, bathing, walking & daytime companionship",
                  },
                  {
                    id: "full_day_12h",
                    title: "Full Day (12 Hours)",
                    hours: "12 hrs/day",
                    rate: "₹1,599 / shift",
                    desc: "Comprehensive morning to evening support (08:00 to 20:00)",
                  },
                  {
                    id: "overnight_12h",
                    title: "Night Vigil (12 Hours)",
                    hours: "12 hrs night",
                    rate: "₹1,599 / shift",
                    desc: "Overnight bedside vigil, sleep routine & washroom assistance",
                  },
                  {
                    id: "round_the_clock_24h",
                    title: "24-Hour Live-In",
                    hours: "24 hrs/day",
                    rate: "₹2,399 / day",
                    desc: "Round-the-clock peace of mind with continuous presence",
                  },
                ].map((dur) => {
                  const isSelected = duration === dur.id;
                  return (
                    <button
                      key={dur.id}
                      type="button"
                      onClick={() => setDuration(dur.id as any)}
                      className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? "bg-primary-soft/80 border-primary ring-2 ring-primary/20 shadow-sm"
                          : "bg-card border-border hover:border-primary/40 hover:bg-secondary/40"
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-secondary text-foreground">
                          {dur.hours}
                        </span>
                        <h5 className="font-semibold text-sm text-foreground mt-2">{dur.title}</h5>
                        <p className="text-xs text-muted-foreground mt-1 leading-snug">{dur.desc}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                        <span className="font-bold text-primary">{dur.rate}</span>
                        {isSelected && <Check className="size-4 text-primary" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total Calendar Span */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">
                  Duration of Care Requirement
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { days: 7, label: "1 Week" },
                    { days: 14, label: "2 Weeks" },
                    { days: 30, label: "1 Month" },
                    { days: 1, label: "1 Day (Trial)" },
                  ].map((d) => (
                    <button
                      key={d.days}
                      type="button"
                      onClick={() => setCalendarDays(d.days)}
                      className={`h-11 rounded-xl border text-xs font-semibold transition-all ${
                        calendarDays === d.days
                          ? "bg-primary text-primary-foreground border-primary font-bold shadow-2xs"
                          : "bg-card border-border hover:border-primary/40 text-foreground"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="start-time-input" className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">
                  Preferred Reporting Time
                </label>
                <select
                  id="start-time-input"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="h-11 w-full rounded-xl border border-input bg-card px-3 text-xs focus:border-primary outline-none"
                >
                  <option value="07:00">07:00 AM (Early Morning Routine)</option>
                  <option value="08:00">08:00 AM (Standard Daytime Shift)</option>
                  <option value="09:00">09:00 AM (Mid-Morning Start)</option>
                  <option value="12:00">12:00 PM (Afternoon Shift)</option>
                  <option value="20:00">08:00 PM (Overnight Night Vigil)</option>
                </select>
              </div>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center justify-between border-t border-border pt-6">
              <Button variant="outline" onClick={() => setCurrentStep(2)} className="gap-2">
                <ArrowLeft className="size-4" /> Back to Care Needs
              </Button>
              <Button onClick={() => setCurrentStep(4)} className="gap-2">
                Continue to Language & Match <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* STEP 4: SAHA LANGUAGE & PREFERENCES                               */}
        {/* ───────────────────────────────────────────────────────────────── */}
        {currentStep === 4 && (
          <div className="card-soft p-6 md:p-10 shadow-soft max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
              <span className="text-xs font-bold uppercase text-terracotta tracking-wider">Step 4 of 5</span>
              <h3 className="text-2xl font-semibold mt-1">Caregiver Preferences & Match Criteria</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Regional language compatibility and caregiver gender matching ensure your loved one feels relaxed and understood.
              </p>
            </div>

            {/* Caregiver Spoken Language */}
            <div>
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">
                Primary Language of Communication *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: "Tamil", name: "Tamil", native: "தமிழ்" },
                  { id: "Kannada", name: "Kannada", native: "ಕನ್ನಡ" },
                  { id: "Telugu", name: "Telugu", native: "తెలుగు" },
                  { id: "Malayalam", name: "Malayalam", native: "മലയാളം" },
                  { id: "English", name: "English", native: "English" },
                  { id: "Hindi", name: "Hindi", native: "हिन्दी" },
                ].map((lang) => (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setPreferredLanguage(lang.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      preferredLanguage === lang.id
                        ? "bg-primary text-primary-foreground border-primary shadow-2xs font-bold"
                        : "bg-card border-border hover:border-primary/40 text-foreground"
                    }`}
                  >
                    <span className="block text-sm font-semibold">{lang.name}</span>
                    <span className="block text-xs opacity-80 mt-0.5">{lang.native}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Caregiver Gender Preference */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Caregiver Gender Preference
                </label>
                {patientGender === "female" && (
                  <span className="text-xs font-bold text-primary flex items-center gap-1">
                    <Sparkles className="size-3" /> Recommended: Female Saha for {recipientTitle}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "female_only", label: "Female Saha", desc: "Recommended for personal hygiene & mother care" },
                  { id: "male_only", label: "Male Saha", desc: "Recommended for heavy mobility transfers" },
                  { id: "no_preference", label: "No Preference", desc: "First available verified professional" },
                ].map((gen) => (
                  <button
                    key={gen.id}
                    type="button"
                    onClick={() => setGenderPreference(gen.id as any)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      genderPreference === gen.id
                        ? "bg-primary text-primary-foreground border-primary shadow-2xs font-bold"
                        : "bg-card border-border hover:border-primary/40 text-foreground"
                    }`}
                  >
                    <div>
                      <span className="block text-sm font-semibold">{gen.label}</span>
                      <span className="block text-[11px] opacity-80 mt-1 leading-snug">{gen.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Remote Family Updates Cadence */}
            <div>
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">
                Family WhatsApp Update Schedule
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "daily_whatsapp", label: "Daily Evening Summary", sub: "Meals, vitals, mobility & mood report" },
                  { id: "twice_daily", label: "Twice Daily (Morning & Night)", sub: "Comprehensive status after each handover" },
                  { id: "weekly_summary", label: "Weekly Coordinator Sync", sub: "For independent seniors needing light check-ins" },
                ].map((up) => (
                  <button
                    key={up.id}
                    type="button"
                    onClick={() => setFamilyUpdateFrequency(up.id as any)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      familyUpdateFrequency === up.id
                        ? "bg-primary text-primary-foreground border-primary shadow-2xs font-bold"
                        : "bg-card border-border hover:border-primary/40 text-foreground"
                    }`}
                  >
                    <span className="block text-xs font-semibold">{up.label}</span>
                    <span className="block text-[11px] opacity-80 mt-1">{up.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Notes */}
            <div>
              <label htmlFor="notes-input" className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">
                Special Medical or Dietary Instructions (Optional)
              </label>
              <Textarea
                id="notes-input"
                rows={3}
                value={customRequirements}
                onChange={(e) => setCustomRequirements(e.target.value)}
                placeholder="e.g. Vegetarian diet, loves Tamil devotional music, walker usage, specific doctor review on Thursday..."
                className="rounded-xl text-xs"
              />
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center justify-between border-t border-border pt-6">
              <Button variant="outline" onClick={() => setCurrentStep(3)} className="gap-2">
                <ArrowLeft className="size-4" /> Back to Schedule
              </Button>
              <Button onClick={() => setCurrentStep(5)} className="gap-2" variant="warm">
                Generate My Care Plan <Sparkles className="size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* STEP 5: CUSTOM CARE PLAN REVIEW & TRANSPARENT PRICING             */}
        {/* ───────────────────────────────────────────────────────────────── */}
        {currentStep === 5 && (
          <div className="card-soft p-6 md:p-10 shadow-soft max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Top Success Ribbon */}
            <div className="rounded-3xl border border-primary/20 bg-primary-soft/40 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary text-primary-foreground mb-2">
                  <CheckCircle2 className="size-3.5" /> Care Plan Formulated
                </span>
                <h3 className="text-2xl font-semibold text-foreground">
                  Customized Care Plan for {recipientTitle}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Plan Reference: <strong className="font-mono text-foreground">{generatedPlan.id}</strong> · {city}, {area || "Area to confirm"}
                </p>
              </div>

              <div className="text-right sm:text-right">
                <span className="text-xs text-muted-foreground uppercase tracking-wider block">Estimated Shift Rate</span>
                <span className="text-2xl font-bold text-primary">
                  {formatINR(generatedPlan.pricing.estimatedShiftRate)}
                </span>
                <span className="text-xs text-muted-foreground block">/ shift</span>
              </div>
            </div>

            {/* Recipient Profile Badge */}
            <div className="grid sm:grid-cols-4 gap-3 text-xs">
              <div className="rounded-2xl bg-secondary/50 p-3.5">
                <span className="text-muted-foreground uppercase text-[10px] font-bold">Recipient</span>
                <p className="font-semibold text-foreground mt-0.5">{recipientTitle}</p>
                <p className="text-muted-foreground capitalize">{patientGender} · {ageGroup}</p>
              </div>
              <div className="rounded-2xl bg-secondary/50 p-3.5">
                <span className="text-muted-foreground uppercase text-[10px] font-bold">Shift Schedule</span>
                <p className="font-semibold text-foreground mt-0.5">{generatedPlan.schedule.duration.replace(/_/g, " ")}</p>
                <p className="text-muted-foreground">{calendarDays} shifts · Starting {startTime}</p>
              </div>
              <div className="rounded-2xl bg-secondary/50 p-3.5">
                <span className="text-muted-foreground uppercase text-[10px] font-bold">Caregiver Match</span>
                <p className="font-semibold text-foreground mt-0.5">{preferredLanguage} Speaker</p>
                <p className="text-muted-foreground capitalize">{genderPreference.replace(/_/g, " ")}</p>
              </div>
              <div className="rounded-2xl bg-secondary/50 p-3.5">
                <span className="text-muted-foreground uppercase text-[10px] font-bold">Verification</span>
                <p className="font-semibold text-foreground mt-0.5">Police Verified</p>
                <p className="text-muted-foreground">Govt ID & Skill Screened</p>
              </div>
            </div>

            {/* Statutory Clinical Notice (If Applicable) */}
            {generatedPlan.clinicalBoundaryNotice && (
              <div className="rounded-2xl border border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/40 p-4 text-xs space-y-1.5 text-sky-900 dark:text-sky-200">
                <div className="flex items-center gap-2 font-bold">
                  <Stethoscope className="size-4 text-sky-600 dark:text-sky-400" />
                  Statutory Clinical Care Separation Notice
                </div>
                <p className="leading-relaxed opacity-90">{generatedPlan.clinicalBoundaryNotice}</p>
              </div>
            )}

            {/* Itemized Tasks Included */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" />
                  Covered Daily Assistance Tasks ({selectedTaskIds.length})
                </h4>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  Edit Tasks
                </button>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {selectedTaskIds.map((taskId) => {
                  const match = CARE_CATEGORIES.flatMap((c) => c.subcategories.flatMap((s) => s.tasks)).find((t) => t.id === taskId);
                  return (
                    <div
                      key={taskId}
                      className="p-3 rounded-xl border border-border bg-card flex items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Check className="size-3.5 text-primary shrink-0 stroke-[3]" />
                        <span className="font-semibold truncate">{match?.name || taskId}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleTask(taskId)}
                        className="text-muted-foreground hover:text-destructive shrink-0"
                        title="Remove task"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Itemized Invoice & GST Calculation */}
            <div className="rounded-3xl border border-border bg-secondary/30 p-6 space-y-3">
              <h4 className="font-semibold text-sm text-foreground uppercase tracking-wider mb-2">
                Itemized Pricing Calculation
              </h4>

              <dl className="space-y-2 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <dt>
                    Base Care Assistance ({generatedPlan.pricing.billableShifts} shifts × {formatINR(generatedPlan.pricing.estimatedShiftRate)})
                  </dt>
                  <dd className="font-semibold text-foreground">{formatINR(generatedPlan.pricing.subtotal)}</dd>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <dt>Statutory 18% GST (SAC 9993 Invoicing)</dt>
                  <dd className="font-semibold text-foreground">{formatINR(generatedPlan.pricing.gstAmount)}</dd>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <dt>Agency Broker Fees / Hidden Charges</dt>
                  <dd className="font-semibold text-emerald-600 dark:text-emerald-400">₹0 (Zero Markup)</dd>
                </div>

                <div className="flex justify-between border-t border-border pt-3 text-base font-bold text-foreground">
                  <dt>Total Estimated Care Plan Fee</dt>
                  <dd className="text-primary text-xl font-mono">{formatINR(generatedPlan.pricing.totalAmount)}</dd>
                </div>
              </dl>

              <p className="text-[11px] text-muted-foreground pt-1">
                {generatedPlan.pricing.pricingNote}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleProceedToBooking}
                  className="flex-1 h-12 text-sm font-semibold gap-2 shadow-md"
                  variant="warm"
                >
                  Confirm & Reserve This Care Plan <ArrowRight className="size-4" />
                </Button>

                <Button asChild variant="outline" className="h-12 text-sm font-semibold gap-2 border-primary/40 text-primary">
                  <a
                    href={buildWhatsAppUrl(decodeURIComponent(generatedPlan.whatsAppSummary))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4" /> Discuss on WhatsApp
                  </a>
                </Button>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="size-3" /> Start Fresh or Change Recipient
                </button>
                <span>Standby coordinator backup included</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
