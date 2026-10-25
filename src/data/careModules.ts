/**
 * Universal Care Modules & Configurator Taxonomy
 *
 * Implements the reusable care modules, situation definitions,
 * combination compatibility rules, and preset packages for ApnaCare.
 */

export interface CareModule {
  id: string;
  name: string;
  category:
    | "daily_living"
    | "companionship"
    | "clinical_nursing"
    | "maternal_infant"
    | "mobility_transit"
    | "coordination";
  description: string;
  iconName: string;
  isClinical: boolean;
  requiredStaffRole:
    | "General Duty Attendant"
    | "Registered Nurse (GNM/B.Sc)"
    | "Japa Newborn Specialist"
    | "Licensed Chauffeuse";
  allowedTasks: string[];
  excludedTasks: string[];
  baseDailyRate: number;
  unit: "day" | "shift" | "visit" | "trip";
  compatibleWith: string[]; // module ids
  requiresApproval: boolean;
}

export interface CareSituationTemplate {
  id: string;
  title: string;
  subtitle: string;
  category: "elderly" | "hospital" | "maternal" | "transit" | "respite";
  iconName: string;
  recommendedModuleIds: string[];
  presetShift: "8hr" | "12hr" | "24hr";
  estimatedDailyTotal: number;
  highlightTag: string;
}

export const CARE_MODULES: CareModule[] = [
  {
    id: "mod-daily-living",
    name: "Personal Hygiene & Daily Living Assistance",
    category: "daily_living",
    description: "Support with sponge baths, oral hygiene, gentle dressing, and assisted walking.",
    iconName: "Heart",
    isClinical: false,
    requiredStaffRole: "General Duty Attendant",
    allowedTasks: [
      "Sponge baths & grooming",
      "Mobility transfer & fall prevention",
      "Meal & hydration accompaniment",
    ],
    excludedTasks: ["Clinical injections", "Wound dressing", "Catheter insertion"],
    baseDailyRate: 499,
    unit: "day",
    compatibleWith: [
      "mod-companionship",
      "mod-medication-reminder",
      "mod-family-logs",
      "mod-appointment-escort",
    ],
    requiresApproval: false,
  },
  {
    id: "mod-companionship",
    name: "Dignified Companionship & Cognitive Routine",
    category: "companionship",
    description:
      "Warm conversational presence, news reading, walking accompaniment, and daily structure.",
    iconName: "Sparkles",
    isClinical: false,
    requiredStaffRole: "General Duty Attendant",
    allowedTasks: [
      "Active conversation",
      "Accompanied veranda/garden walks",
      "Mental engagement & companionship",
    ],
    excludedTasks: ["Heavy domestic cleaning", "Clinical procedures"],
    baseDailyRate: 399,
    unit: "day",
    compatibleWith: ["mod-daily-living", "mod-medication-reminder", "mod-family-logs"],
    requiresApproval: false,
  },
  {
    id: "mod-medication-reminder",
    name: "Oral Prescription Reminders & Charting",
    category: "daily_living",
    description:
      "Timely verbal reminders for doctor-prescribed oral medications and logging in care record.",
    iconName: "Clock",
    isClinical: false,
    requiredStaffRole: "General Duty Attendant",
    allowedTasks: ["Prompting on prescription timings", "Logging medication taken in daily sheet"],
    excludedTasks: ["Prescribing medicines", "Administering IV/IM injections", "Modifying doses"],
    baseDailyRate: 299,
    unit: "day",
    compatibleWith: ["mod-daily-living", "mod-companionship", "mod-family-logs"],
    requiresApproval: false,
  },
  {
    id: "mod-hospital-bedside",
    name: "Hospital Ward Bedside Vigil & Coordination",
    category: "daily_living",
    description:
      "Continuous bedside presence in hospital wards, call-bell coordination, and family relief.",
    iconName: "Building2",
    isClinical: false,
    requiredStaffRole: "General Duty Attendant",
    allowedTasks: [
      "Bedside comfort & vigilance",
      "Assisting with nurse call bells",
      "Duty nurse coordination",
    ],
    excludedTasks: ["Operating ICU monitors", "Adjusting IV lines", "Medical decision making"],
    baseDailyRate: 699,
    unit: "shift",
    compatibleWith: ["mod-family-logs", "mod-daily-living"],
    requiresApproval: false,
  },
  {
    id: "mod-clinical-nursing",
    name: "Licensed Clinical Nursing Procedures",
    category: "clinical_nursing",
    description:
      "Registered GNM/B.Sc nurse visits for sterile surgical wound dressings, injections, and catheter care.",
    iconName: "Stethoscope",
    isClinical: true,
    requiredStaffRole: "Registered Nurse (GNM/B.Sc)",
    allowedTasks: [
      "Sterile surgical wound dressings",
      "IV/IM injections strictly per written prescription",
      "Catheter management & vital sign charting",
    ],
    excludedTasks: ["Prescribing medication without doctor orders", "Non-clinical domestic chores"],
    baseDailyRate: 1199,
    unit: "shift",
    compatibleWith: ["mod-daily-living", "mod-family-logs"],
    requiresApproval: true,
  },
  {
    id: "mod-postnatal-maternal",
    name: "Postnatal Rest & Newborn Care (Japa)",
    category: "maternal_infant",
    description:
      "Traditional gentle newborn oil massage, soothing, maternal convalescence rest coverage.",
    iconName: "Baby",
    isClinical: false,
    requiredStaffRole: "Japa Newborn Specialist",
    allowedTasks: [
      "Infant bath & soothing",
      "Nighttime vigil so mother rests",
      "Lactation comfort accompaniment",
    ],
    excludedTasks: ["Clinical paediatric treatments"],
    baseDailyRate: 899,
    unit: "day",
    compatibleWith: ["mod-family-logs", "mod-daily-living"],
    requiresApproval: false,
  },
  {
    id: "mod-transit-escort",
    name: "Assisted Transit & Medical Clinic Escort",
    category: "mobility_transit",
    description:
      "Door-to-door clinic visit accompaniment, wheelchair assistance, or railway/airport terminal escort.",
    iconName: "Car",
    isClinical: false,
    requiredStaffRole: "Licensed Chauffeuse",
    allowedTasks: [
      "Safe vehicle transit",
      "Wheelchair navigation & clinic queues",
      "Platform/terminal luggage coordination",
    ],
    excludedTasks: ["In-transit clinical emergencies"],
    baseDailyRate: 599,
    unit: "trip",
    compatibleWith: ["mod-family-logs"],
    requiresApproval: false,
  },
  {
    id: "mod-travel-companion",
    name: "Women Travel Companion",
    category: "mobility_transit",
    description:
      "A verified woman companion for train, bus or intercity journeys — from departure to arrival.",
    iconName: "Train",
    isClinical: false,
    requiredStaffRole: "Licensed Chauffeuse",
    allowedTasks: [
      "Accompany on train / bus journeys",
      "Luggage handling",
      "Platform & terminal navigation",
      "Journey status updates to family",
    ],
    excludedTasks: ["Clinical procedures", "Security enforcement"],
    baseDailyRate: 799,
    unit: "trip",
    compatibleWith: ["mod-family-logs", "mod-transit-escort"],
    requiresApproval: false,
  },
  {
    id: "mod-personal-escort",
    name: "Personal Safety Escort",
    category: "mobility_transit",
    description:
      "Vetted woman escort for appointments, events, late-evening travel and unfamiliar routes.",
    iconName: "Shield",
    isClinical: false,
    requiredStaffRole: "General Duty Attendant",
    allowedTasks: [
      "Accompany to appointments & events",
      "Late-evening route accompaniment",
      "Emergency contact coordination",
    ],
    excludedTasks: ["Enforcement actions", "Medical interventions"],
    baseDailyRate: 699,
    unit: "trip",
    compatibleWith: ["mod-family-logs", "mod-transit-escort"],
    requiresApproval: false,
  },
  {
    id: "mod-airport-assistance",
    name: "Airport Meet, Greet & Transfer",
    category: "mobility_transit",
    description:
      "Punctual airport meet-and-greet, luggage assistance, terminal navigation and door-to-door transfer coordination.",
    iconName: "Plane",
    isClinical: false,
    requiredStaffRole: "Licensed Chauffeuse",
    allowedTasks: [
      "Meet traveller at arrivals",
      "Baggage handling",
      "Transfer to home / hotel",
      "Flight-status monitoring",
    ],
    excludedTasks: ["Security checks", "Immigration"],
    baseDailyRate: 899,
    unit: "trip",
    compatibleWith: ["mod-family-logs", "mod-transit-escort"],
    requiresApproval: false,
  },
  {
    id: "mod-household-assistance",
    name: "Household & Family Assistance",
    category: "daily_living",
    description:
      "Meal preparation, light chores, childcare supervision and family relief for busy working households.",
    iconName: "Home",
    isClinical: false,
    requiredStaffRole: "General Duty Attendant",
    allowedTasks: [
      "Meal preparation",
      "Light household tasks",
      "Childcare supervision",
      "Caregiver relief",
    ],
    excludedTasks: ["Heavy construction", "Clinical procedures"],
    baseDailyRate: 499,
    unit: "day",
    compatibleWith: ["mod-companionship", "mod-family-logs", "mod-daily-living"],
    requiresApproval: false,
  },
  {
    id: "mod-respite-overnight",
    name: "Overnight Respite & Night Vigil",
    category: "daily_living",
    description:
      "Scheduled overnight presence so family caregivers can rest — monitoring, comfort and early-morning handover.",
    iconName: "Moon",
    isClinical: false,
    requiredStaffRole: "General Duty Attendant",
    allowedTasks: [
      "Overnight monitoring & companionship",
      "Comfort & repositioning",
      "Morning handover briefing",
    ],
    excludedTasks: ["Clinical interventions"],
    baseDailyRate: 799,
    unit: "shift",
    compatibleWith: ["mod-daily-living", "mod-medication-reminder", "mod-family-logs"],
    requiresApproval: false,
  },
  {
    id: "mod-family-logs",
    name: "Scheduled Daily WhatsApp Wellness Logs",
    category: "coordination",
    description:
      "Structured daily morning and evening digital updates on meals, routines, and overall comfort.",
    iconName: "MessageCircle",
    isClinical: false,
    requiredStaffRole: "General Duty Attendant",
    allowedTasks: ["Daily routine summary", "WhatsApp check-in with designated family"],
    excludedTasks: ["Medical diagnoses"],
    baseDailyRate: 0, // Included as ApnaCare standard
    unit: "day",
    compatibleWith: [
      "mod-daily-living",
      "mod-companionship",
      "mod-medication-reminder",
      "mod-hospital-bedside",
      "mod-clinical-nursing",
      "mod-postnatal-maternal",
      "mod-transit-escort",
    ],
    requiresApproval: false,
  },
];

export const CARE_SITUATION_TEMPLATES: CareSituationTemplate[] = [
  {
    id: "sit-parents-alone",
    title: "My Elderly Parents Live Alone",
    subtitle:
      "Dignified routine support, gentle mobility, and daily peace of mind for living independently.",
    category: "elderly",
    iconName: "Heart",
    recommendedModuleIds: [
      "mod-daily-living",
      "mod-companionship",
      "mod-medication-reminder",
      "mod-family-logs",
    ],
    presetShift: "12hr",
    estimatedDailyTotal: 1299,
    highlightTag: "Most Selected for Seniors",
  },
  {
    id: "sit-hospital-discharge",
    title: "Hospital Stay or Post-Discharge Recovery",
    subtitle: "Continuous bedside comfort in hospital, transitioning to safe recuperation at home.",
    category: "hospital",
    iconName: "Building2",
    recommendedModuleIds: ["mod-hospital-bedside", "mod-daily-living", "mod-family-logs"],
    presetShift: "12hr",
    estimatedDailyTotal: 1499,
    highlightTag: "Post-Op & Inpatient Care",
  },
  {
    id: "sit-clinical-nursing",
    title: "Clinical Nursing Under Doctor Prescription",
    subtitle:
      "Sterile wound dressings, injections, catheter care, and vital signs monitoring by registered nurses.",
    category: "hospital",
    iconName: "Stethoscope",
    recommendedModuleIds: ["mod-clinical-nursing", "mod-family-logs"],
    presetShift: "8hr",
    estimatedDailyTotal: 1999,
    highlightTag: "Licensed GNM / B.Sc",
  },
  {
    id: "sit-newborn-postnatal",
    title: "Newborn Care & Mother's Fourth Trimester",
    subtitle:
      "Restorative sleep for new mothers with traditional newborn soothing and maternal support.",
    category: "maternal",
    iconName: "Baby",
    recommendedModuleIds: ["mod-postnatal-maternal", "mod-daily-living", "mod-family-logs"],
    presetShift: "12hr",
    estimatedDailyTotal: 1999,
    highlightTag: "Mother & Baby Care",
  },
  {
    id: "sit-distant-coordination",
    title: "Coordinating Care from Another City",
    subtitle:
      "Transparent daily oversight with scheduled WhatsApp wellness updates and standby backup.",
    category: "respite",
    iconName: "Clock",
    recommendedModuleIds: ["mod-daily-living", "mod-companionship", "mod-family-logs"],
    presetShift: "8hr",
    estimatedDailyTotal: 1099,
    highlightTag: "Remote Family Peace of Mind",
  },
  {
    id: "sit-clinic-travel",
    title: "Assisted Clinic Visits & Safe Transit",
    subtitle:
      "Vetted women drivers and mobility companions for doctor visits, airport, and railway travel.",
    category: "transit",
    iconName: "Car",
    recommendedModuleIds: ["mod-transit-escort", "mod-family-logs"],
    presetShift: "8hr",
    estimatedDailyTotal: 999,
    highlightTag: "Door-to-Door Mobility",
  },
];
