import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  Heart,
  Stethoscope,
  Activity,
  Baby,
  Train,
  Users,
  Plane,
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
  Filter,
  Clock,
  Sun,
  Moon,
  CalendarDays,
  Sliders,
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

type CategoryType = "all" | "elderly-home" | "hospital-recovery" | "maternal-infant" | "travel-transit" | "safety-corporate";
type ShiftType = "4hr" | "8hr" | "12hr-day" | "12hr-night" | "24hr" | "custom";
type SchedulePattern = "daily" | "weekdays" | "weekends" | "alternate";

interface RecipientType {
  id: string;
  icpNumber: string;
  category: CategoryType;
  label: string;
  sublabel: string;
  badge: string;
  icon: React.ReactNode;
  color: string;
  defaultServiceSlug: string;
  ageGroups: AgeGroup[];
}

const CATEGORY_TABS: { id: CategoryType; label: string; count: number }[] = [
  { id: "all", label: "All Profiles", count: 10 },
  { id: "elderly-home", label: "Elderly & Home", count: 2 },
  { id: "hospital-recovery", label: "Hospital & Recovery", count: 2 },
  { id: "maternal-infant", label: "Maternal & Baby", count: 1 },
  { id: "travel-transit", label: "Travel & Escort", count: 3 },
  { id: "safety-corporate", label: "Safety & Corporate", count: 2 },
];

const RECIPIENT_TYPES: RecipientType[] = [
  {
    id: "elderly",
    icpNumber: "ICP 1",
    category: "elderly-home",
    label: "Elderly Parent",
    sublabel: "Senior citizen aged 60+ needing daily living, companionship, mobility or bedside care",
    badge: "Most Requested",
    icon: <Heart className="size-6" />,
    color: "emerald",
    defaultServiceSlug: "elderly-care",
    ageGroups: [
      {
        id: "60-74",
        label: "60 – 74 years (Active Senior)",
        sublabel: "Needs daytime assistance, gentle mobility & conversational companionship",
        recommendedModuleIds: ["mod-daily-living", "mod-companionship", "mod-medication-reminder"],
        defaultShift: "8hr",
        presetDays: 14,
      },
      {
        id: "75-84",
        label: "75 – 84 years (Moderate Support)",
        sublabel: "Needs full-day hygiene assistance, fall prevention & medication schedule adherence",
        recommendedModuleIds: ["mod-daily-living", "mod-companionship", "mod-medication-reminder", "mod-family-logs"],
        defaultShift: "12hr",
        presetDays: 30,
      },
      {
        id: "85plus",
        label: "85+ years (High Dependency)",
        sublabel: "Round-the-clock bedside duty, assisted feeding, repositioning & night vigil",
        recommendedModuleIds: ["mod-daily-living", "mod-companionship", "mod-medication-reminder", "mod-respite-overnight", "mod-family-logs"],
        defaultShift: "24hr",
        presetDays: 30,
      },
    ],
  },
  {
    id: "hospital-patient",
    icpNumber: "ICP 2",
    category: "hospital-recovery",
    label: "Hospitalized Patient",
    sublabel: "Admitted or step-down patient needing round-the-clock ward bedside vigilance and nurse liaison",
    badge: "Hospital Care",
    icon: <Stethoscope className="size-6" />,
    color: "blue",
    defaultServiceSlug: "hospital-attendants",
    ageGroups: [
      {
        id: "hosp-child",
        label: "Pediatric Patient (0 – 17 yrs)",
        sublabel: "Ward bedside comfort, gentle routine & relief for exhausted parents",
        recommendedModuleIds: ["mod-hospital-bedside", "mod-family-logs"],
        defaultShift: "12hr",
        presetDays: 7,
      },
      {
        id: "hosp-adult",
        label: "Adult Patient (18 – 59 yrs)",
        sublabel: "General/private ward bedside duty, hydration, call-bell response & bathroom assist",
        recommendedModuleIds: ["mod-hospital-bedside", "mod-daily-living", "mod-family-logs"],
        defaultShift: "12hr",
        presetDays: 7,
      },
      {
        id: "hosp-senior",
        label: "Senior Patient (60+ yrs)",
        sublabel: "High vigilance, ICU step-down support, turn & position assistance & doctor update relay",
        recommendedModuleIds: ["mod-hospital-bedside", "mod-daily-living", "mod-medication-reminder", "mod-family-logs"],
        defaultShift: "24hr",
        presetDays: 14,
      },
    ],
  },
  {
    id: "post-surgery",
    icpNumber: "ICP 3",
    category: "hospital-recovery",
    label: "Surgery & Clinical Recovery",
    sublabel: "Post-op, ortho rehab, cardiac or post-discharge recovery requiring nursing & hygiene support",
    badge: "Clinical Rehab",
    icon: <Activity className="size-6" />,
    color: "sky",
    defaultServiceSlug: "nursing-services",
    ageGroups: [
      {
        id: "nursing-young",
        label: "Adult Post-Op (18 – 40 yrs)",
        sublabel: "Day surgery, sports injury / ACL repair, short convalescence recovery",
        recommendedModuleIds: ["mod-daily-living", "mod-medication-reminder"],
        defaultShift: "8hr",
        presetDays: 7,
      },
      {
        id: "nursing-mid",
        label: "Major Surgery Rehab (41 – 60 yrs)",
        sublabel: "Spine, cardiac or joint replacement recovery with vitals charting & wound hygiene",
        recommendedModuleIds: ["mod-daily-living", "mod-medication-reminder", "mod-clinical-nursing", "mod-family-logs"],
        defaultShift: "12hr",
        presetDays: 14,
      },
      {
        id: "nursing-senior",
        label: "Geriatric Post-Op (60+ yrs)",
        sublabel: "Complex recovery, sterile dressings, catheter management & assisted physio routine",
        recommendedModuleIds: ["mod-daily-living", "mod-medication-reminder", "mod-clinical-nursing", "mod-respite-overnight", "mod-family-logs"],
        defaultShift: "24hr",
        presetDays: 30,
      },
    ],
  },
  {
    id: "new-mother",
    icpNumber: "ICP 4",
    category: "maternal-infant",
    label: "New Mother & Baby",
    sublabel: "Postnatal maternal healing, lactation comfort and traditional gentle infant care (Japa)",
    badge: "Japa Specialists",
    icon: <Baby className="size-6" />,
    color: "pink",
    defaultServiceSlug: "post-natal-care",
    ageGroups: [
      {
        id: "newborn-0-1m",
        label: "Newborn Golden Month (0 – 1 month)",
        sublabel: "Intensive 40-day postpartum convalescence, oil massage, burping & night rest for mother",
        recommendedModuleIds: ["mod-postnatal-maternal", "mod-daily-living", "mod-family-logs"],
        defaultShift: "12hr",
        presetDays: 30,
      },
      {
        id: "infant-1-6m",
        label: "Infant Care & Weaning (1 – 6 months)",
        sublabel: "Baby routine development, soothing, feeding support & mother recuperation coverage",
        recommendedModuleIds: ["mod-postnatal-maternal", "mod-daily-living"],
        defaultShift: "8hr",
        presetDays: 14,
      },
    ],
  },
  {
    id: "women-travel",
    icpNumber: "ICP 5",
    category: "travel-transit",
    label: "Woman Travelling Alone",
    sublabel: "Verified female companion for intercity train, bus or late-night transit journeys across South India",
    badge: "Solo Travel",
    icon: <Train className="size-6" />,
    color: "violet",
    defaultServiceSlug: "travel-assistance",
    ageGroups: [
      {
        id: "travel-young",
        label: "Student / Young Professional (18 – 30 yrs)",
        sublabel: "Intercity train/bus companion, luggage safety, platform navigation & live family updates",
        recommendedModuleIds: ["mod-travel-companion", "mod-family-logs"],
        defaultShift: "8hr",
        presetDays: 1,
      },
      {
        id: "travel-adult",
        label: "Working Woman / Executive (31 – 50 yrs)",
        sublabel: "Multi-city business travel, night arrival escort, terminal transfer & pre-verified cab",
        recommendedModuleIds: ["mod-travel-companion", "mod-transit-escort", "mod-family-logs"],
        defaultShift: "8hr",
        presetDays: 2,
      },
    ],
  },
  {
    id: "senior-travel",
    icpNumber: "ICP 6",
    category: "travel-transit",
    label: "Senior Citizen Travel",
    sublabel: "Elderly travelling intercity for family weddings, pilgrimages, festivals or specialist medical visits",
    badge: "Assisted Travel",
    icon: <Users className="size-6" />,
    color: "teal",
    defaultServiceSlug: "travel-assistance",
    ageGroups: [
      {
        id: "senior-travel-60-74",
        label: "Active Senior Travelling (60 – 74 yrs)",
        sublabel: "Station escort, luggage handling, platform navigation, berth settling & journey check-ins",
        recommendedModuleIds: ["mod-travel-companion", "mod-transit-escort", "mod-family-logs"],
        defaultShift: "8hr",
        presetDays: 1,
      },
      {
        id: "senior-travel-75plus",
        label: "Vulnerable Senior Travelling (75+ yrs)",
        sublabel: "Wheelchair coordination, medication charting, meals assistance & complete door-to-door transit",
        recommendedModuleIds: ["mod-travel-companion", "mod-transit-escort", "mod-daily-living", "mod-medication-reminder", "mod-family-logs"],
        defaultShift: "12hr",
        presetDays: 2,
      },
    ],
  },
  {
    id: "airport",
    icpNumber: "ICP 7",
    category: "travel-transit",
    label: "Airport Assistance & Transfer",
    sublabel: "Punctual meet & greet at arrivals, baggage assistance, terminal navigation and safe door-to-door transfer",
    badge: "Airport Escort",
    icon: <Plane className="size-6" />,
    color: "amber",
    defaultServiceSlug: "travel-assistance",
    ageGroups: [
      {
        id: "airport-any",
        label: "Arrival / Departure Assistance",
        sublabel: "Terminal meet & greet, luggage handling, flight monitoring & seamless city cab transfer",
        recommendedModuleIds: ["mod-airport-assistance", "mod-family-logs"],
        defaultShift: "8hr",
        presetDays: 1,
      },
      {
        id: "airport-senior",
        label: "Senior Flyer / NRI Parent Return",
        sublabel: "Curbside wheelchair assistance, immigration exit pickup & accompanied journey back home",
        recommendedModuleIds: ["mod-airport-assistance", "mod-transit-escort", "mod-daily-living", "mod-family-logs"],
        defaultShift: "8hr",
        presetDays: 1,
      },
    ],
  },
  {
    id: "women-safety",
    icpNumber: "ICP 8",
    category: "safety-corporate",
    label: "Personal Safety Escort",
    sublabel: "Discreet vetted woman escort for medical visits, court hearings, evening social events & unfamiliar routes",
    badge: "Discreet Escort",
    icon: <Shield className="size-6" />,
    color: "rose",
    defaultServiceSlug: "travel-assistance",
    ageGroups: [
      {
        id: "escort-young",
        label: "Evening Event / Route Escort (18 – 30 yrs)",
        sublabel: "Late-night return, exam center commute or unfamiliar city navigation escort",
        recommendedModuleIds: ["mod-personal-escort", "mod-family-logs"],
        defaultShift: "8hr",
        presetDays: 1,
      },
      {
        id: "escort-adult",
        label: "Appointment / Legal Support (31+ yrs)",
        sublabel: "Medical appointment accompaniment, official hearings & safe door-to-door transit",
        recommendedModuleIds: ["mod-personal-escort", "mod-transit-escort", "mod-family-logs"],
        defaultShift: "8hr",
        presetDays: 2,
      },
    ],
  },
  {
    id: "corporate",
    icpNumber: "ICP 9",
    category: "safety-corporate",
    label: "Corporate & Institutional Care",
    sublabel: "B2B eldercare employee benefits, hospital ward attendant shifts, and executive safe transit",
    badge: "Enterprise / B2B",
    icon: <Briefcase className="size-6" />,
    color: "slate",
    defaultServiceSlug: "hospital-attendants",
    ageGroups: [
      {
        id: "corp-employee-care",
        label: "Employee Eldercare Benefit Plan",
        sublabel: "Dedicated home care attendant for employee's dependent elderly parents in South India",
        recommendedModuleIds: ["mod-daily-living", "mod-companionship", "mod-medication-reminder", "mod-family-logs"],
        defaultShift: "8hr",
        presetDays: 30,
      },
      {
        id: "corp-patient-support",
        label: "Hospital / Ward Attendant Deployment",
        sublabel: "Verified attendant shift coverage for hospital bed partner institutions & clinics",
        recommendedModuleIds: ["mod-hospital-bedside", "mod-daily-living", "mod-family-logs"],
        defaultShift: "12hr",
        presetDays: 30,
      },
      {
        id: "corp-women-commute",
        label: "Women Executive Safe Transit",
        sublabel: "Monthly contracted transit & late-shift escorts for female staff and visitors",
        recommendedModuleIds: ["mod-travel-companion", "mod-personal-escort", "mod-airport-assistance", "mod-family-logs"],
        defaultShift: "8hr",
        presetDays: 30,
      },
    ],
  },
  {
    id: "household",
    icpNumber: "ICP 10",
    category: "elderly-home",
    label: "Busy Household & Family Relief",
    sublabel: "Support with meal prep, light chores, caregiver respite & family supervision for working households",
    badge: "Caregiver Relief",
    icon: <Home className="size-6" />,
    color: "orange",
    defaultServiceSlug: "elderly-care",
    ageGroups: [
      {
        id: "hh-short",
        label: "Temporary Respite Relief (1 – 7 days)",
        sublabel: "Relief for primary family caregiver taking a needed break, travel or recovery",
        recommendedModuleIds: ["mod-household-assistance", "mod-companionship"],
        defaultShift: "8hr",
        presetDays: 3,
      },
      {
        id: "hh-recurring",
        label: "Regular Household Support (14 – 30 days)",
        sublabel: "Ongoing daily assistance, meal prep, routine care coordination & daily wellness logs",
        recommendedModuleIds: ["mod-household-assistance", "mod-daily-living", "mod-companionship", "mod-family-logs"],
        defaultShift: "8hr",
        presetDays: 14,
      },
    ],
  },
];

const COLOR_MAP: Record<string, { ring: string; bg: string; text: string; badge: string; border: string }> = {
  emerald: {
    ring: "ring-2 ring-emerald-500/40 border-emerald-500/60",
    bg: "bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-400",
    badge: "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
    border: "border-emerald-500/40",
  },
  blue: {
    ring: "ring-2 ring-blue-500/40 border-blue-500/60",
    bg: "bg-blue-500/10",
    text: "text-blue-700 dark:text-blue-400",
    badge: "bg-blue-500/20 text-blue-800 dark:text-blue-300",
    border: "border-blue-500/40",
  },
  sky: {
    ring: "ring-2 ring-sky-500/40 border-sky-500/60",
    bg: "bg-sky-500/10",
    text: "text-sky-700 dark:text-sky-400",
    badge: "bg-sky-500/20 text-sky-800 dark:text-sky-300",
    border: "border-sky-500/40",
  },
  pink: {
    ring: "ring-2 ring-pink-500/40 border-pink-500/60",
    bg: "bg-pink-500/10",
    text: "text-pink-700 dark:text-pink-400",
    badge: "bg-pink-500/20 text-pink-800 dark:text-pink-300",
    border: "border-pink-500/40",
  },
  violet: {
    ring: "ring-2 ring-violet-500/40 border-violet-500/60",
    bg: "bg-violet-500/10",
    text: "text-violet-700 dark:text-violet-400",
    badge: "bg-violet-500/20 text-violet-800 dark:text-violet-300",
    border: "border-violet-500/40",
  },
  teal: {
    ring: "ring-2 ring-teal-500/40 border-teal-500/60",
    bg: "bg-teal-500/10",
    text: "text-teal-700 dark:text-teal-400",
    badge: "bg-teal-500/20 text-teal-800 dark:text-teal-300",
    border: "border-teal-500/40",
  },
  amber: {
    ring: "ring-2 ring-amber-500/40 border-amber-500/60",
    bg: "bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-400",
    badge: "bg-amber-500/20 text-amber-800 dark:text-amber-300",
    border: "border-amber-500/40",
  },
  rose: {
    ring: "ring-2 ring-rose-500/40 border-rose-500/60",
    bg: "bg-rose-500/10",
    text: "text-rose-700 dark:text-rose-400",
    badge: "bg-rose-500/20 text-rose-800 dark:text-rose-300",
    border: "border-rose-500/40",
  },
  slate: {
    ring: "ring-2 ring-slate-500/40 border-slate-500/60",
    bg: "bg-slate-500/10",
    text: "text-slate-700 dark:text-slate-400",
    badge: "bg-slate-500/20 text-slate-800 dark:text-slate-300",
    border: "border-slate-500/40",
  },
  orange: {
    ring: "ring-2 ring-orange-500/40 border-orange-500/60",
    bg: "bg-orange-500/10",
    text: "text-orange-700 dark:text-orange-400",
    badge: "bg-orange-500/20 text-orange-800 dark:text-orange-300",
    border: "border-orange-500/40",
  },
};

const SHIFT_PRESETS = [
  {
    id: "4hr" as ShiftType,
    label: "4-Hour Visit",
    hours: 4,
    defaultStart: "09:00",
    desc: "Short Respite & Clinic Visits",
    badge: "Short Visit",
    icon: Clock,
  },
  {
    id: "8hr" as ShiftType,
    label: "8-Hour Day",
    hours: 8,
    defaultStart: "08:00",
    desc: "Daytime Care & Routine",
    badge: "Standard",
    icon: Sun,
  },
  {
    id: "12hr-day" as ShiftType,
    label: "12-Hour Day",
    hours: 12,
    defaultStart: "08:00",
    desc: "Full Day Support (8 AM – 8 PM)",
    badge: "Full Day",
    icon: Sun,
  },
  {
    id: "12hr-night" as ShiftType,
    label: "12-Hour Night",
    hours: 12,
    defaultStart: "20:00",
    desc: "Overnight Bedside Vigil (8 PM – 8 AM)",
    badge: "Night Vigil",
    icon: Moon,
  },
  {
    id: "24hr" as ShiftType,
    label: "24-Hour Live-in",
    hours: 24,
    defaultStart: "08:00",
    desc: "Round-the-clock Resident Care",
    badge: "24x7 Stay",
    icon: Home,
  },
  {
    id: "custom" as ShiftType,
    label: "Custom Hours",
    hours: 6,
    defaultStart: "09:00",
    desc: "Tailor exact daily hours (2 to 24 hrs)",
    badge: "Flexible",
    icon: Sliders,
  },
];

const QUICK_START_TIMES = [
  { time: "06:00", label: "6:00 AM", tag: "Early Morning" },
  { time: "08:00", label: "8:00 AM", tag: "Standard Day" },
  { time: "09:30", label: "9:30 AM", tag: "Mid-Morning" },
  { time: "13:00", label: "1:00 PM", tag: "Afternoon" },
  { time: "17:00", label: "5:00 PM", tag: "Evening" },
  { time: "20:00", label: "8:00 PM", tag: "Night Vigil" },
  { time: "22:00", label: "10:00 PM", tag: "Late Night" },
];

const SCHEDULE_PATTERNS: { id: SchedulePattern; label: string; desc: string }[] = [
  { id: "daily", label: "Daily (All 7 Days)", desc: "Continuous daily coverage" },
  { id: "weekdays", label: "Weekdays (Mon–Fri)", desc: "Office hours & working days only" },
  { id: "weekends", label: "Weekends Only (Sat–Sun)", desc: "Family caregiver respite & relief" },
  { id: "alternate", label: "Alternate Days (~3 d/wk)", desc: "Dialysis, therapy or scheduled visits" },
];

function formatTime12h(time24: string): string {
  if (!time24) return "8:00 AM";
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10) || 8;
  const m = parseInt(mStr || "0", 10) || 0;
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  h = h ? h : 12;
  const mFormatted = m < 10 ? `0${m}` : m;
  return `${h}:${mFormatted} ${ampm}`;
}

function calculateShiftWindow(startTime24: string, hours: number): { windowText: string; isNextDay: boolean } {
  if (hours >= 24) {
    return {
      windowText: `${formatTime12h(startTime24)} (24-Hour Continuous Live-in)`,
      isNextDay: true,
    };
  }
  const [hStr, mStr] = startTime24.split(":");
  const startHour = parseInt(hStr, 10) || 8;
  const startMin = parseInt(mStr || "0", 10) || 0;
  const totalHours = startHour + hours;
  const endHour = totalHours % 24;
  const isNextDay = totalHours >= 24;
  const endHour12 = endHour % 12 === 0 ? 12 : endHour % 12;
  const ampm = endHour >= 12 ? "PM" : "AM";
  const mFormatted = startMin < 10 ? `0${startMin}` : startMin;
  const endFormatted = `${endHour12}:${mFormatted} ${ampm}${isNextDay ? " (Next Day)" : ""}`;

  return {
    windowText: `${formatTime12h(startTime24)} – ${endFormatted}`,
    isNextDay,
  };
}

export function UniversalCareConfigurator() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(null);
  const [selectedAgeGroupId, setSelectedAgeGroupId] = useState<string | null>(null);
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>([]);

  // Flexible Timing & Schedule States
  const [shiftType, setShiftType] = useState<ShiftType>("8hr");
  const [hoursPerDay, setHoursPerDay] = useState<number>(8);
  const [startTime, setStartTime] = useState<string>("08:00");
  const [schedulePattern, setSchedulePattern] = useState<SchedulePattern>("daily");
  const [durationDays, setDurationDays] = useState<number>(14);

  const [selectedCity, setSelectedCity] = useState<string>("Bengaluru");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Tamil");

  const filteredRecipients = useMemo(() => {
    if (selectedCategory === "all") return RECIPIENT_TYPES;
    return RECIPIENT_TYPES.filter((r) => r.category === selectedCategory);
  }, [selectedCategory]);

  const activeRecipient = useMemo(
    () => RECIPIENT_TYPES.find((r) => r.id === selectedRecipientId) ?? null,
    [selectedRecipientId]
  );

  const activeAgeGroup = useMemo(
    () => activeRecipient?.ageGroups.find((g) => g.id === selectedAgeGroupId) ?? null,
    [activeRecipient, selectedAgeGroupId]
  );

  const step = useMemo(() => {
    if (!selectedRecipientId) return 1;
    if (!selectedAgeGroupId) return 2;
    return 3;
  }, [selectedRecipientId, selectedAgeGroupId]);

  const handleSelectRecipient = (r: RecipientType) => {
    setSelectedRecipientId(r.id);
    setSelectedAgeGroupId(null);
    setSelectedModuleIds([]);
    track("configurator_recipient_selected", { recipient_id: r.id, icp: r.icpNumber });
  };

  const handleSelectAgeGroup = (ag: AgeGroup) => {
    setSelectedAgeGroupId(ag.id);
    setSelectedModuleIds([...ag.recommendedModuleIds]);
    setDurationDays(ag.presetDays);

    // Initialize sensible timing based on age group
    if (ag.defaultShift === "24hr") {
      setShiftType("24hr");
      setHoursPerDay(24);
      setStartTime("08:00");
    } else if (ag.defaultShift === "12hr") {
      if (ag.recommendedModuleIds.includes("mod-respite-overnight")) {
        setShiftType("12hr-night");
        setHoursPerDay(12);
        setStartTime("20:00");
      } else {
        setShiftType("12hr-day");
        setHoursPerDay(12);
        setStartTime("08:00");
      }
    } else {
      setShiftType("8hr");
      setHoursPerDay(8);
      setStartTime("08:00");
    }

    track("configurator_age_group_selected", { age_group_id: ag.id });
  };

  const handleSelectShiftPreset = (preset: (typeof SHIFT_PRESETS)[number]) => {
    setShiftType(preset.id);
    if (preset.id !== "custom") {
      setHoursPerDay(preset.hours);
      setStartTime(preset.defaultStart);
    }
  };

  const handleToggleModule = (moduleId: string) => {
    setSelectedModuleIds((prev) => {
      const exists = prev.includes(moduleId);
      return exists ? prev.filter((id) => id !== moduleId) : [...prev, moduleId];
    });
  };

  const handleReset = () => {
    setSelectedRecipientId(null);
    setSelectedAgeGroupId(null);
    setSelectedModuleIds([]);
    setShiftType("8hr");
    setHoursPerDay(8);
    setStartTime("08:00");
    setSchedulePattern("daily");
    setDurationDays(14);
  };

  const hasClinicalModule = useMemo(
    () => selectedModuleIds.includes("mod-clinical-nursing"),
    [selectedModuleIds]
  );

  const shiftWindow = useMemo(
    () => calculateShiftWindow(startTime, hoursPerDay),
    [startTime, hoursPerDay]
  );

  const billableShifts = useMemo(() => {
    if (schedulePattern === "weekdays") return Math.max(1, Math.round(durationDays * (5 / 7)));
    if (schedulePattern === "weekends") return Math.max(1, Math.round(durationDays * (2 / 7)));
    if (schedulePattern === "alternate") return Math.max(1, Math.round(durationDays * (3.5 / 7)));
    return durationDays;
  }, [durationDays, schedulePattern]);

  const pricing = useMemo(() => {
    let baseDaily = 0;
    CARE_MODULES.filter((m) => selectedModuleIds.includes(m.id)).forEach((m) => {
      baseDaily += m.baseDailyRate;
    });
    if (baseDaily < 799) baseDaily = 799;

    // Flexible hourly & shift multiplier
    let hourMult = 1.0;
    if (hoursPerDay <= 4) {
      hourMult = 0.65;
    } else if (hoursPerDay <= 8) {
      hourMult = 0.65 + ((hoursPerDay - 4) / 4) * 0.35; // 4h = 0.65x, 8h = 1.0x
    } else if (hoursPerDay <= 12) {
      const isNight =
        shiftType === "12hr-night" ||
        parseInt(startTime.split(":")[0], 10) >= 19 ||
        parseInt(startTime.split(":")[0], 10) <= 4;
      const topMult = isNight ? 1.35 : 1.25;
      hourMult = 1.0 + ((hoursPerDay - 8) / 4) * (topMult - 1.0);
    } else if (hoursPerDay < 24) {
      hourMult = 1.25 + ((hoursPerDay - 12) / 12) * 0.25;
    } else {
      hourMult = 1.55; // 24hr Live-in
    }

    const shiftRate = Math.round(baseDaily * hourMult);
    const subtotal = shiftRate * billableShifts;
    const gst = Math.round(subtotal * 0.18);
    return {
      baseDaily,
      hourMult,
      shiftRate,
      billableShifts,
      subtotal,
      gst,
      total: subtotal + gst,
    };
  }, [selectedModuleIds, hoursPerDay, shiftType, startTime, billableShifts]);

  const mappedShiftTiming: "8hr" | "12hr" | "24hr" =
    hoursPerDay >= 20 ? "24hr" : hoursPerDay > 8 ? "12hr" : "8hr";

  const topMatches = useMemo<MatchEvaluation[]>(() => {
    if (!activeRecipient) return [];
    return evaluateAttendantMatches({
      requiredServiceSlug: activeRecipient.defaultServiceSlug,
      isClinicalRequired: hasClinicalModule,
      city: selectedCity,
      preferredLanguage: selectedLanguage,
      shiftTiming: mappedShiftTiming,
    })
      .filter((m) => m.isEligible)
      .slice(0, 3);
  }, [activeRecipient, hasClinicalModule, selectedCity, selectedLanguage, mappedShiftTiming]);

  const activeScheduleLabel =
    SCHEDULE_PATTERNS.find((p) => p.id === schedulePattern)?.label ?? "Daily (All 7 Days)";

  const waUrl = buildWhatsAppUrl(
    activeRecipient && activeAgeGroup
      ? `Hello ApnaCare! Looking for verified care for ${activeRecipient.label} (${activeAgeGroup.label}, ${activeRecipient.icpNumber}) in ${selectedCity}.\n\n` +
          `• Timing Window: ${shiftWindow.windowText} (${hoursPerDay} hrs/shift)\n` +
          `• Schedule: ${activeScheduleLabel}\n` +
          `• Duration: ${durationDays} Days (${billableShifts} shifts)\n` +
          `• Preferred Language: ${selectedLanguage}\n` +
          `• Estimated Quote: ${formatINR(pricing.total)} (incl. GST)\n\n` +
          `Please share matching attendant profiles.`
      : "Hello ApnaCare! I'd like to enquire about your flexible care services."
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
            <span>Build Your Care Plan &bull; Universal Care Configurator</span>
          </div>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold md:text-4xl lg:text-5xl text-foreground">
            Who are you looking to care for?
          </h2>
          <p className="mt-3 text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed">
            Choose from 10 specialized care profiles across South India with complete flexibility on hours, shift timings, schedule frequency, and duration.
          </p>
        </div>

        {/* Step breadcrumb */}
        <div className="mt-8 flex items-center gap-2 text-xs">
          {[
            { n: 1, label: "Who needs care" },
            { n: 2, label: "Age & Profile" },
            { n: 3, label: "Build your plan" },
          ].map((s, idx) => (
            <div key={s.n} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1.5 ${
                  step >= s.n ? "text-foreground font-semibold" : "text-muted-foreground"
                }`}
              >
                <span
                  className={`grid size-5 place-items-center rounded-full text-[10px] font-bold ${
                    step > s.n
                      ? "bg-primary text-primary-foreground"
                      : step === s.n
                      ? "bg-primary text-primary-foreground"
                      : "bg-border text-muted-foreground"
                  }`}
                >
                  {step > s.n ? <Check className="size-3 stroke-[3]" /> : s.n}
                </span>
                <span>{s.label}</span>
              </div>
              {idx < 2 && <ChevronRight className="size-3 text-border" />}
            </div>
          ))}
          {selectedRecipientId && (
            <button
              type="button"
              onClick={handleReset}
              className="ml-auto text-xs text-muted-foreground hover:text-primary flex items-center gap-1 font-medium"
            >
              <RotateCcw className="size-3" /> Start over
            </button>
          )}
        </div>

        {/* Step 1 — Category Tabs & Who Needs Care */}
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              Step 1 — Select who needs care (10 Customer Segments)
            </p>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <Filter className="size-3.5 text-muted-foreground shrink-0 hidden sm:block" />
              {CATEGORY_TABS.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredRecipients.map((r) => {
              const isSelected = selectedRecipientId === r.id;
              const c = COLOR_MAP[r.color] || COLOR_MAP.emerald;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleSelectRecipient(r)}
                  className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between gap-3 ${
                    isSelected
                      ? `${c.ring} ${c.bg} shadow-soft`
                      : "border-border bg-card hover:border-primary/40 hover:bg-secondary/20"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.badge}`}>
                        {r.icpNumber}
                      </span>
                      {isSelected ? (
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${c.badge}`}>
                          <Check className="size-2.5 stroke-[3]" /> Selected
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full">
                          {r.badge}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <div className={`size-11 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? c.bg : "bg-secondary/60"}`}>
                        <span className={isSelected ? c.text : "text-muted-foreground"}>{r.icon}</span>
                      </div>
                      <h3 className="font-semibold text-base text-foreground leading-snug">{r.label}</h3>
                    </div>

                    <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {r.sublabel}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{r.ageGroups.length} Age Presets</span>
                    <span className="font-semibold text-primary">Configure &rarr;</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2 — Age / Specific Sub-group */}
        {activeRecipient && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  Step 2 — Select their specific profile or age group
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Selected: <span className="font-semibold text-foreground">{activeRecipient.label} ({activeRecipient.icpNumber})</span>. Choosing a sub-group automatically pre-loads recommended care modules, shifts & duration.
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {activeRecipient.ageGroups.map((ag) => {
                const isSelected = selectedAgeGroupId === ag.id;
                const c = COLOR_MAP[activeRecipient.color] || COLOR_MAP.emerald;
                return (
                  <button
                    key={ag.id}
                    type="button"
                    onClick={() => handleSelectAgeGroup(ag)}
                    className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between gap-2 ${
                      isSelected
                        ? `${c.ring} ${c.bg} shadow-soft`
                        : "border-border bg-card hover:border-primary/40 hover:bg-secondary/20"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm text-foreground">{ag.label}</h4>
                        {isSelected && <CheckCircle2 className={`size-4 ${c.text}`} />}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{ag.sublabel}</p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-border/40 flex flex-wrap gap-1.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isSelected ? c.badge : "bg-secondary text-muted-foreground"}`}>
                        {ag.defaultShift} preset
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isSelected ? c.badge : "bg-secondary text-muted-foreground"}`}>
                        {ag.presetDays} days preset
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isSelected ? c.badge : "bg-secondary text-muted-foreground"}`}>
                        {ag.recommendedModuleIds.length} modules
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3 — Customise Modules + Flexible Timing + Plan Summary */}
        {activeAgeGroup && (
          <div className="mt-12">
            {/* Modules Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    Step 3 — Customise care modules (Build Your Plan)
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Recommended modules pre-selected for {activeAgeGroup.label}. Click any module to add or remove it from your customized care package.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedModuleIds([...activeAgeGroup.recommendedModuleIds])}
                  className="text-xs text-primary hover:underline flex items-center gap-1 font-medium shrink-0"
                >
                  <RotateCcw className="size-3" /> Reset to defaults
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                        <div className="flex items-start justify-between gap-1">
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                              mod.isClinical
                                ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                                : "bg-primary-soft text-primary"
                            }`}
                          >
                            {mod.isClinical ? "Registered Nurse" : mod.requiredStaffRole.split(" ")[0]}
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
                        <h4 className="mt-2 font-semibold text-sm text-foreground leading-snug">{mod.name}</h4>
                        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                          {mod.description}
                        </p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-border/50 text-[11px] font-semibold text-primary">
                        {mod.baseDailyRate > 0 ? `+${formatINR(mod.baseDailyRate)}/${mod.unit}` : "Included Standard"}
                      </div>
                    </div>
                  );
                })}
              </div>

              {hasClinicalModule && (
                <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
                  <AlertCircle className="size-4 shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <span className="font-bold">Clinical Nursing Boundary:</span> Licensed nursing tasks require a valid doctor's prescription and are performed exclusively by State Nursing Council registered GNM/B.Sc nurses.
                  </div>
                </div>
              )}
            </div>

            {/* Flexible Timing, Shift, Schedule, Duration & Summary */}
            <div className="mt-10 grid gap-8 lg:grid-cols-12 items-start">
              {/* Controls Column */}
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground text-[10px]">
                      4
                    </span>
                    Flexible Shift Timing & Schedule
                  </p>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Customizable Hours
                  </span>
                </div>

                {/* Shift Type Presets */}
                <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                      Shift Format
                    </label>
                    <span className="text-[11px] text-muted-foreground">Select a standard shift or customize</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SHIFT_PRESETS.map((s) => {
                      const isSelected = shiftType === s.id;
                      const IconComp = s.icon;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => handleSelectShiftPreset(s)}
                          className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground shadow-soft ring-1 ring-primary/40"
                              : "border-border bg-secondary/30 text-foreground hover:bg-secondary/60 hover:border-primary/40"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <IconComp className={`size-4 ${isSelected ? "text-primary-foreground" : "text-primary"}`} />
                            <span
                              className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                isSelected ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground"
                              }`}
                            >
                              {s.badge}
                            </span>
                          </div>
                          <div className="mt-2">
                            <div className="text-xs font-bold leading-tight">{s.label}</div>
                            <div
                              className={`text-[10px] mt-0.5 line-clamp-1 ${
                                isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                              }`}
                            >
                              {s.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Daily Hours Stepper & Slider */}
                  {shiftType === "custom" && (
                    <div className="mt-3 pt-3 border-t border-border/60 animate-fade-in space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                          <Sliders className="size-3.5 text-primary" /> Daily Service Hours
                        </label>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setHoursPerDay((h) => Math.max(2, h - 1))}
                            className="size-6 rounded-md border border-border bg-secondary/40 text-sm font-bold text-foreground hover:bg-secondary flex items-center justify-center leading-none"
                          >
                            −
                          </button>
                          <span className="w-14 text-center text-xs font-bold text-primary px-2 py-1 rounded-md bg-primary-soft border border-primary/30">
                            {hoursPerDay} hrs
                          </span>
                          <button
                            type="button"
                            onClick={() => setHoursPerDay((h) => Math.min(24, h + 1))}
                            className="size-6 rounded-md border border-border bg-secondary/40 text-sm font-bold text-foreground hover:bg-secondary flex items-center justify-center leading-none"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <input
                        type="range"
                        min={2}
                        max={24}
                        step={1}
                        value={hoursPerDay}
                        onChange={(e) => setHoursPerDay(Number(e.target.value))}
                        className="w-full accent-primary h-1.5 rounded-full cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>2 hrs (Quick visit)</span>
                        <span>8 hrs (Day)</span>
                        <span>12 hrs (Extended)</span>
                        <span>24 hrs (Live-in)</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Shift Start Time & Shift Window */}
                <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                        Preferred Shift Start Time
                      </label>
                      <span className="text-[11px] text-muted-foreground">
                        Attendant reporting time at your location
                      </span>
                    </div>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="text-xs font-bold rounded-lg border border-primary/40 bg-primary-soft text-primary px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Quick Start Time Chips */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                    <span className="text-[10px] text-muted-foreground mr-1">Quick Slots:</span>
                    {QUICK_START_TIMES.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setStartTime(slot.time)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all ${
                          startTime === slot.time
                            ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                            : "border-border/70 bg-secondary/30 text-muted-foreground hover:text-foreground hover:border-border"
                        }`}
                      >
                        {slot.label} <span className="opacity-70 text-[9px]">({slot.tag})</span>
                      </button>
                    ))}
                  </div>

                  {/* Live Calculated Shift Window Display */}
                  <div className="mt-2 rounded-xl border border-primary/30 bg-primary-soft/50 p-3.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <Clock className="size-4 text-primary shrink-0" />
                      <div>
                        <div className="font-bold text-primary">Shift Window:</div>
                        <div className="font-semibold text-foreground text-xs sm:text-sm mt-0.5">
                          {shiftWindow.windowText}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-primary bg-background px-2.5 py-1 rounded-full border border-primary/30 whitespace-nowrap">
                      {hoursPerDay} hrs / shift
                    </span>
                  </div>
                </div>

                {/* Schedule Days Pattern */}
                <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                      Schedule Frequency
                    </label>
                    <span className="text-[11px] text-muted-foreground">Select active days per week</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {SCHEDULE_PATTERNS.map((pat) => (
                      <button
                        key={pat.id}
                        type="button"
                        onClick={() => setSchedulePattern(pat.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          schedulePattern === pat.id
                            ? "border-primary bg-primary text-primary-foreground font-semibold shadow-soft"
                            : "border-border bg-secondary/30 text-foreground hover:bg-secondary/60 hover:border-primary/40"
                        }`}
                      >
                        <div className="text-xs font-bold">{pat.label}</div>
                        <div
                          className={`text-[10px] mt-0.5 ${
                            schedulePattern === pat.id ? "text-primary-foreground/80" : "text-muted-foreground"
                          }`}
                        >
                          {pat.desc}
                        </div>
                      </button>
                    ))}
                  </div>

                  {schedulePattern !== "daily" && (
                    <div className="text-[11px] text-muted-foreground bg-secondary/40 p-2.5 rounded-lg border border-border/60 flex items-center gap-2">
                      <CalendarDays className="size-3.5 text-primary shrink-0" />
                      <span>
                        Cost calculated only for actual working shifts ({billableShifts} shifts across {durationDays} calendar days). Off-days are not billed.
                      </span>
                    </div>
                  )}
                </div>

                {/* Free-form Duration Slider */}
                <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                        Calendar Duration
                      </label>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Free-form duration: from single-day journey to 90-day ongoing care
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setDurationDays((d) => Math.max(1, d - 1))}
                        className="size-7 rounded-lg border border-border bg-secondary/40 text-sm font-bold text-foreground hover:bg-secondary flex items-center justify-center leading-none"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={90}
                        value={durationDays}
                        onChange={(e) => {
                          const v = parseInt(e.target.value, 10);
                          if (!isNaN(v)) setDurationDays(Math.min(90, Math.max(1, v)));
                        }}
                        className="w-14 text-center text-sm font-bold text-primary rounded-xl border border-primary/40 bg-primary-soft py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <button
                        type="button"
                        onClick={() => setDurationDays((d) => Math.min(90, d + 1))}
                        className="size-7 rounded-lg border border-border bg-secondary/40 text-sm font-bold text-foreground hover:bg-secondary flex items-center justify-center leading-none"
                      >
                        +
                      </button>
                      <span className="text-xs text-muted-foreground ml-0.5">days</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={90}
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full accent-primary h-1.5 rounded-full cursor-pointer"
                  />
                  <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                    <span className="text-[10px] text-muted-foreground mr-1">Quick Presets:</span>
                    {[1, 7, 14, 21, 30, 60, 90].map((days) => (
                      <button
                        key={days}
                        type="button"
                        onClick={() => setDurationDays(days)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border transition-all ${
                          durationDays === days
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground hover:border-border"
                        }`}
                      >
                        {days}d
                      </button>
                    ))}
                  </div>
                </div>

                {/* City & Language Selectors */}
                <div className="p-5 rounded-2xl border border-border bg-card grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1 mb-2">
                      <MapPin className="size-3 text-primary" /> City
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full text-xs font-semibold rounded-xl border border-border bg-background p-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option>Bengaluru</option>
                      <option>Chennai</option>
                      <option>Hyderabad</option>
                      <option>Coimbatore</option>
                      <option>Kochi</option>
                      <option>Madurai</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1 mb-2">
                      <Languages className="size-3 text-primary" /> Language
                    </label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="w-full text-xs font-semibold rounded-xl border border-border bg-background p-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option>Tamil</option>
                      <option>Kannada</option>
                      <option>Telugu</option>
                      <option>Malayalam</option>
                      <option>English</option>
                      <option>Hindi</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Plan Summary Column */}
              <div className="lg:col-span-6 space-y-6">
                <p className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground text-[10px]">
                    5
                  </span>
                  Your Care Plan Summary
                </p>

                <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-soft text-primary">
                          {activeRecipient?.icpNumber}
                        </span>
                        <span className="text-xs font-semibold text-primary">Care Recipient Profile</span>
                      </div>
                      <h3 className="text-lg font-display font-semibold text-foreground mt-1">
                        {activeRecipient?.label}
                      </h3>
                      <p className="text-xs text-muted-foreground">{activeAgeGroup?.label}</p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary-soft text-primary">
                      {selectedCity}
                    </span>
                  </div>

                  <div className="py-4 border-b border-border space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                      Care Modules ({selectedModuleIds.length})
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

                  <div className="py-4 border-b border-border space-y-2 text-xs">
                    {[
                      ["Shift Window", shiftWindow.windowText],
                      ["Daily Hours", `${hoursPerDay} hours/shift`],
                      ["Schedule", activeScheduleLabel],
                      ["Calendar Span", `${durationDays} Days`],
                      ["Billable Shifts", `${billableShifts} ${billableShifts === 1 ? "shift" : "shifts"}`],
                      ["Preferred Language", selectedLanguage],
                      ["Est. Shift Rate", `${formatINR(pricing.shiftRate)}/shift`],
                      ["GST (18%)", `+${formatINR(pricing.gst)}`],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between text-muted-foreground">
                        <span>{k}</span>
                        <span className="font-semibold text-foreground text-right">{v}</span>
                      </div>
                    ))}
                    <div className="pt-2 flex items-center justify-between text-base font-bold text-foreground border-t border-border/60">
                      <span>Estimated Total (incl. GST)</span>
                      <span className="text-primary text-xl font-display">{formatINR(pricing.total)}</span>
                    </div>
                  </div>

                  <div className="pt-5 space-y-3">
                    <Button
                      asChild
                      size="lg"
                      className="w-full rounded-full shadow-soft hover:shadow-lift min-h-[48px] font-bold text-sm"
                    >
                      <Link
                        to="/booking"
                        search={{
                          service: activeRecipient?.defaultServiceSlug ?? "elderly-care",
                          city: selectedCity.toLowerCase(),
                          duration: String(billableShifts),
                          time: startTime,
                          hours: String(hoursPerDay),
                          shift: shiftType,
                          schedule: schedulePattern,
                        }}
                        onClick={() =>
                          track("configurator_proceed_booking", {
                            total: pricing.total,
                            recipient: selectedRecipientId,
                            icp: activeRecipient?.icpNumber,
                            ageGroup: selectedAgeGroupId,
                            city: selectedCity,
                            duration: durationDays,
                            shifts: billableShifts,
                            hoursPerDay,
                            startTime,
                            schedulePattern,
                          })
                        }
                      >
                        Proceed with this Plan <ArrowRight className="size-4 ml-2" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full rounded-full border-border bg-card hover:bg-secondary"
                    >
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-[#128C7E]"
                      >
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
                    <h3 className="mt-2 text-2xl font-display font-semibold text-foreground">
                      Verified Attendants in {selectedCity}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Matched by credentials, police clearance, {selectedLanguage} language capability, and {hoursPerDay}-hour availability.
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
                            <h4 className="mt-2 font-semibold text-base text-foreground">{attendant.name}</h4>
                            <p className="text-xs text-muted-foreground">{attendant.role}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-foreground">{matchScore}% Match</span>
                            <div className="text-[10px] text-amber-600 font-semibold mt-0.5">
                              &#9733; {attendant.rating} ({attendant.experience})
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-border/60 space-y-1.5">
                          {matchReasons.slice(0, 3).map((reason, rIdx) => (
                            <div key={rIdx} className="flex items-center gap-1.5 text-xs text-foreground/80">
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
                          Request Profile &#10148;
                        </Link>
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
