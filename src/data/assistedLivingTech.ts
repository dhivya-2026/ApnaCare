/**
 * LifeSakhi — Comprehensive Assisted Living Technology Data Model
 * ───────────────────────────────────────────────────────────────
 * Structured, honest, maintainable data powering:
 *  - 10 Core Technology Categories with 4-tier Deployment Status
 *  - Traditional vs Technology-Enabled Senior Care + Interactive Scenario
 *  - 6 Senior-Care Use Cases
 *  - 4 India-Specific Proposed Solution Bundles
 *  - Connected Care Ecosystem (4 Components & 6 Roles)
 *  - 10 Privacy, Security & Responsible Technology Pillars
 *
 * Guardrail: No fabricated live telemetry, AI predictions, pricing, or unverified certifications.
 */

export type DeploymentStatusLabel =
  | "Deployed on LifeSakhi"
  | "Available Through Partners"
  | "Under Evaluation"
  | "Future Opportunity";

export interface AssistedLivingTechCategory {
  id: string;
  number: string;
  name: string;
  shortTagline: string;
  status: DeploymentStatusLabel;
  statusNote: string;
  whatItIs: string;
  howItWorks: string;
  devicesRequired: string[];
  whoBenefits: string[];
  problemsAddressed: string[];
  benefitsForSeniors: string[];
  benefitsForFamilies: string[];
  realWorldScenarios: string[];
  ctaLabel: string;
}

export const ASSISTED_LIVING_TECH_CATEGORIES: AssistedLivingTechCategory[] = [
  {
    id: "remote-patient-monitoring",
    number: "01",
    name: "Remote Patient Monitoring",
    shortTagline: "Home vitals readings shared securely with authorised family & clinicians",
    status: "Available Through Partners",
    statusNote: "Delivered via partner Bluetooth health devices and visiting LifeSakhi nurses where supported.",
    whatItIs:
      "Connected home diagnostic tools—such as blood pressure cuffs, glucometers, pulse oximeters, and digital thermometers—that record physiological readings outside a clinic.",
    howItWorks:
      "The senior or a visiting Saha/nurse takes scheduled readings at home. Supported devices sync those readings via Bluetooth to a partner monitoring app or dashboard accessible to authorised family members.",
    devicesRequired: ["Partner Bluetooth BP monitor", "Digital glucometer", "Pulse oximeter (SpO2)", "Smartphone or home gateway"],
    whoBenefits: ["Seniors with hypertension, diabetes, or cardiac conditions", "Post-discharge patients", "Adult children living in other cities or abroad"],
    problemsAddressed: ["Gaps between infrequent clinic visits", "Unnoticed blood pressure or sugar spikes", "Anxiety among outstation family members"],
    benefitsForSeniors: ["Fewer exhausting trips to diagnostic labs", "Early clinical attention when readings drift"],
    benefitsForFamilies: ["Clear visibility of trends between doctor visits", "Faster coordination with the treating doctor"],
    realWorldScenarios: [
      "A 74-year-old father in Chennai checks morning BP and fasting sugar; his daughter in Bengaluru reviews the weekly trend before his doctor teleconsultation.",
    ],
    ctaLabel: "Enquire About Remote Monitoring",
  },
  {
    id: "telehealth",
    number: "02",
    name: "Telehealth and Virtual Healthcare",
    shortTagline: "Video consultations with physicians & specialists from home",
    status: "Available Through Partners",
    statusNote: "Facilitated through partner telehealth networks with Saha or nurse bedside assistance.",
    whatItIs:
      "Structured video and audio consultations connecting seniors at home with physicians, geriatric specialists, and dieticians without hospital travel.",
    howItWorks:
      "A family or coordinator books a slot with a partner telehealth doctor. A Saha attendant or visiting nurse can sit beside the senior to position the camera, share recent vitals, and note follow-up instructions.",
    devicesRequired: ["Smartphone, tablet, or laptop with camera", "Stable internet connection", "Recent prescriptions and vitals log"],
    whoBenefits: ["Mobility-restricted or bed-bound elders", "Post-operative patients needing routine reviews", "Seniors needing medication titrations"],
    problemsAddressed: ["Painful and risky transit to crowded OPDs", "Long waiting-room fatigue for elders", "Missed follow-ups due to caregiver work schedules"],
    benefitsForSeniors: ["Consult doctors from the comfort of their living room", "Less exposure to hospital-acquired infections"],
    benefitsForFamilies: ["Remote children can join the same video call", "Digital prescriptions stored cleanly for follow-up"],
    realWorldScenarios: [
      "After knee surgery, a senior mother attends her orthopaedic follow-up over video with her Saha holding the tablet and her son joining from Hyderabad.",
    ],
    ctaLabel: "Discuss Telehealth Setup",
  },
  {
    id: "wearable-technology",
    number: "03",
    name: "Wearable Health Technology",
    shortTagline: "Senior-friendly SOS bands & physiological tracking watches",
    status: "Available Through Partners",
    statusNote: "Supported through third-party senior wearables and SOS pendants; not a LifeSakhi-manufactured device.",
    whatItIs:
      "Lightweight wristwatches, bands, or pendants worn by seniors that feature a physical SOS alert button and, on supported models, step, sleep, and heart-rate tracking.",
    howItWorks:
      "When the senior presses the SOS button (or when a supported device triggers an alert), the partner device notifies pre-registered emergency contacts via SMS, call, or app notification.",
    devicesRequired: ["Partner SOS smartwatch or pendant", "Active SIM card or paired smartphone", "Regular charging routine"],
    whoBenefits: ["Independent seniors who go for morning walks", "Elders living alone during daytime hours", "Seniors with mild memory concerns"],
    problemsAddressed: ["Inability to reach a landline or mobile phone during a sudden dizzy spell", "Lack of location visibility if a wandering elder gets disoriented"],
    benefitsForSeniors: ["Confidence to step outside independently", "Simple one-button help without navigating touchscreens"],
    benefitsForFamilies: ["Immediate notification when SOS is pressed", "Reassurance during solo hours"],
    realWorldScenarios: [
      "An active 70-year-old who walks in the neighbourhood park wears a one-touch SOS band linked to his spouse and local emergency contact.",
    ],
    ctaLabel: "Explore Partner Wearables",
  },
  {
    id: "smart-home-sensors",
    number: "04",
    name: "Smart-Home Safety Sensors",
    shortTagline: "Privacy-first motion, door & kitchen safety sensors without cameras",
    status: "Under Evaluation",
    statusNote: "Currently under pilot evaluation for Indian homes; not yet offered as a standard deployed product.",
    whatItIs:
      "Discreet, non-camera wireless sensors placed on main doors, hallways, beds, or kitchen areas to observe routine movement patterns and potential safety hazards.",
    howItWorks:
      "Passive motion and contact sensors note routine activity (for example, morning movement or an exterior door opening late at night) and flag unusual gaps in activity where configured.",
    devicesRequired: ["PIR motion sensors", "Door/window contact sensors", "Local sensor hub and home Wi-Fi"],
    whoBenefits: ["Seniors living alone who refuse invasive cameras", "Families worried about night-time wandering or kitchen safety"],
    problemsAddressed: ["Privacy discomfort caused by indoor CCTV cameras", "Unnoticed prolonged inactivity or doors left open at night"],
    benefitsForSeniors: ["Complete dignity with zero video recording", "Discreet background safety net"],
    benefitsForFamilies: ["Routine reassurance without intrusive check-in phone calls"],
    realWorldScenarios: [
      "In pilot evaluations, a kitchen and hallway motion sensor checks whether an elder has started their usual morning routine by 9:00 AM.",
    ],
    ctaLabel: "Enquire About Sensor Pilots",
  },
  {
    id: "fall-detection-prevention",
    number: "05",
    name: "Fall Detection and Prevention",
    shortTagline: "Impact alerts, bathroom safety & ambient fall-risk prevention",
    status: "Under Evaluation",
    statusNote: "Wearable impact alerts are partner-dependent; ambient radar fall sensors are under evaluation.",
    whatItIs:
      "Technologies combining wearable accelerometers, bathroom pull-cords, bedside pressure mats, and emerging wall-mounted radar sensors aimed at detecting sudden falls or bed exits.",
    howItWorks:
      "If a sudden impact or unassisted night-time bed exit occurs on supported hardware, an alert is routed to registered family contacts or on-site caregivers so the senior is not left unassisted.",
    devicesRequired: ["Fall-capable wearable or bedside mat", "Bathroom emergency pull-cord (where wired)", "Wi-Fi or cellular alert bridge"],
    whoBenefits: ["Seniors with balance instability, vertigo, or osteoarthritis", "Elders recovering from hip or knee surgery"],
    problemsAddressed: ["The critical 'long lie' risk when a senior falls and cannot reach a phone", "Night-time bathroom transfer falls"],
    benefitsForSeniors: ["Faster help after a slip or fall", "Greater confidence moving around at night"],
    benefitsForFamilies: ["Reduced fear of an undetected fall while at work or living away"],
    realWorldScenarios: [
      "Combining grab-bars and non-slip mats with a bedside alert mat helps alert a night-shift Saha when an elder with Parkinson's tries to stand unassisted.",
    ],
    ctaLabel: "Consult on Fall Safety",
  },
  {
    id: "medication-technology",
    number: "06",
    name: "Medication Management Technology",
    shortTagline: "Timed pill dispensers, audio-visual reminders & dose logs",
    status: "Available Through Partners",
    statusNote: "Partner smart pill dispensers and mobile reminder tools paired with Saha non-clinical reminders.",
    whatItIs:
      "Structured pill-organiser carousels with audio-visual chimes and mobile reminder apps that prompt seniors at prescribed dose times.",
    howItWorks:
      "Prescribed tablets are pre-sorted into timed compartments by family or a nurse. At the scheduled hour, the dispenser sounds a chime and unlocks only the current slot, while logging whether the compartment was opened.",
    devicesRequired: ["Partner smart pill dispenser or reminder app", "Presorted weekly medication schedule"],
    whoBenefits: ["Seniors taking 4+ daily prescriptions", "Elders with mild forgetfulness", "Working families managing parents' schedules"],
    problemsAddressed: ["Skipped doses for blood pressure or diabetes", "Accidental double-dosing of similar-looking tablets"],
    benefitsForSeniors: ["Clear audio-visual cue without confusion", "Confidence in managing daily pills"],
    benefitsForFamilies: ["Confirmation that scheduled doses were accessed on time"],
    realWorldScenarios: [
      "A diabetic senior hears a gentle chime at 8:00 AM and takes only the morning compartment pills, while her Saha logs routine completion.",
    ],
    ctaLabel: "Enquire About Smart Dispensers",
  },
  {
    id: "voice-assistants",
    number: "07",
    name: "Voice Assistants and Smart Home Automation",
    shortTagline: "Hands-free lighting, reminders & calling via simple voice commands",
    status: "Available Through Partners",
    statusNote: "Configured using consumer smart speakers and smart plugs/bulbs with regional-language prompts where supported.",
    whatItIs:
      "Voice-controlled smart speakers paired with smart switches or bulbs so seniors can control room lights, set reminders, play devotional audio, or place calls hands-free.",
    howItWorks:
      "A smart speaker is placed near the bedside or living chair and linked to smart bulbs and family contacts. Saying a simple phrase turns on hallway lights before walking or calls a saved family number.",
    devicesRequired: ["Consumer smart speaker", "Smart bulbs or Wi-Fi plugs", "Home Wi-Fi and initial setup"],
    whoBenefits: ["Seniors with arthritis or tremors who struggle with small phone screens", "Elders with low vision", "Seniors feeling isolated at home"],
    problemsAddressed: ["Walking to wall switches in the dark", "Difficulty unlocking touchscreens during an urgent moment"],
    benefitsForSeniors: ["Instant lighting before getting out of bed", "Easy access to music, news, and family calls"],
    benefitsForFamilies: ["Quick setup using affordable off-the-shelf hardware"],
    realWorldScenarios: [
      "A senior with severe arthritis asks her bedside speaker to switch on the passage light before walking to the washroom at 3:00 AM.",
    ],
    ctaLabel: "Ask About Voice Setup",
  },
  {
    id: "ai-predictive-analytics",
    number: "08",
    name: "AI and Predictive Health Analytics",
    shortTagline: "Pattern and trend analysis to spot early changes over time",
    status: "Under Evaluation",
    statusNote: "Exploratory / under evaluation with technology partners; no live AI predictions are generated on LifeSakhi today.",
    whatItIs:
      "Analytical models that review longitudinal vitals, sleep, and activity logs to surface gradual deviations from a senior's personal baseline for human clinical review.",
    howItWorks:
      "Once sufficient consented baseline data exists from connected monitoring, trend algorithms look for sustained shifts (e.g., gradual mobility slowdown or rising resting heart rate) to flag for a doctor or coordinator—never as an automated diagnosis.",
    devicesRequired: ["Consistent longitudinal vitals or activity data", "Clinical oversight framework"],
    whoBenefits: ["Seniors with complex chronic conditions under physician care", "Senior-living communities evaluating preventive care"],
    problemsAddressed: ["Subtle health declines that go unnoticed across isolated single readings"],
    benefitsForSeniors: ["Earlier preventive conversations with their doctor"],
    benefitsForFamilies: ["Proactive care planning instead of sudden emergency rushes (future goal)"],
    realWorldScenarios: [
      "Proposed workflow: highlighting a 5-day downward trend in daily activity so a care coordinator schedules a routine nurse check.",
    ],
    ctaLabel: "Discuss Evaluation Roadmap",
  },
  {
    id: "care-management-platforms",
    number: "09",
    name: "Digital Care-Management Platforms",
    shortTagline: "Unified portal connecting families, Saha companions, nurses & coordinators",
    status: "Deployed on LifeSakhi",
    statusNote: "Operationally live on LifeSakhi across Family, Saha Attendant, and Super Admin dashboards.",
    whatItIs:
      "LifeSakhi's integrated web platform uniting family booking requests, multi-member care profiles, Saha assignment matching, GPS-verified shift attendance, and chronological care timelines.",
    howItWorks:
      "Families submit care or travel bookings and manage elder profiles online. Coordinators allocate verified Sahas, Sahas check in/out with location verification, and every milestone updates the shared Care Timeline.",
    devicesRequired: ["Any smartphone, tablet, or web browser", "No specialised hardware required"],
    whoBenefits: ["Every family using LifeSakhi care or travel services", "NRI/outstation children", "Saha attendants and regional coordinators"],
    problemsAddressed: ["Opaque caregiver agencies with no attendance proof", "Fragmented WhatsApp-only coordination across siblings"],
    benefitsForSeniors: ["Consistent routines captured in their member profile"],
    benefitsForFamilies: ["Live booking status, assigned Saha details, geo-verified check-ins, and timeline history"],
    realWorldScenarios: [
      "A daughter in Bengaluru sees her mother's Saha check in at 8:02 AM in Indiranagar and reads the shift completion note in her Family Dashboard.",
    ],
    ctaLabel: "Explore Family Care Portal",
  },
  {
    id: "assistive-robotics",
    number: "10",
    name: "Assistive and Care Robotics",
    shortTagline: "Mechanical transfer aids, rehabilitation robotics & companion aids",
    status: "Future Opportunity",
    statusNote: "Long-term future opportunity under research observation; not currently available for booking.",
    whatItIs:
      "Next-generation assistive hardware including ergonomic mechanical patient-transfer hoists, gait-training robotics, and socially assistive companion devices.",
    howItWorks:
      "Designed primarily for high-dependency mobility transfers and structured rehabilitation centres to reduce physical strain on caregivers and support repetitive physiotherapy exercises.",
    devicesRequired: ["Specialised institutional or home rehabilitation hardware"],
    whoBenefits: ["Completely bed-bound or bariatric care setups", "Neuro-rehabilitation centres and assisted-living facilities"],
    problemsAddressed: ["Caregiver back injuries during manual transfers", "Limited access to repetitive stroke rehab support"],
    benefitsForSeniors: ["Safer, gentler transfers and structured mobility support"],
    benefitsForFamilies: ["Future integration path as Indian clinical hardware matures"],
    realWorldScenarios: [
      "Future institutional partnership: equipping a post-stroke recovery wing with safe mechanical transfer lifts.",
    ],
    ctaLabel: "Register Partnership Interest",
  },
];

/* ─── Section 5: Traditional vs Technology-Enabled Care ────────────────────── */

export const CARE_COMPARISON = {
  traditional: [
    { label: "Periodic hospital visits", detail: "Health is checked only during scheduled clinic trips or emergencies." },
    { label: "Reactive identification of health issues", detail: "Subtle changes at home are often noticed only after a crisis." },
    { label: "Limited family visibility", detail: "Outstation children rely on brief phone calls to guess how parents are doing." },
    { label: "Manual care coordination", detail: "Paper prescriptions, phone-tag with agencies, and unverified attendance." },
  ],
  techEnabled: [
    { label: "Continuous home monitoring where supported", detail: "Partner vitals devices and optional safety sensors bridge clinic gaps." },
    { label: "Early identification of potential changes", detail: "Gradual shifts in routine or vitals prompt timely human follow-up." },
    { label: "Connected family communication", detail: "Authorised family members see attendance, visit logs, and updates in one place." },
    { label: "Coordinated care interventions", detail: "Saha attendants, nurses, coordinators, and doctors act together smoothly." },
  ],
};

export interface ScenarioStep {
  step: number;
  actor: string;
  title: string;
  description: string;
  status: "Illustrative Workflow" | "Operationally Deployed";
}

export const CONNECTED_SCENARIO_STEPS: ScenarioStep[] = [
  {
    step: 1,
    actor: "Smart-Home Sensors",
    title: "Unusual morning routine gap observed",
    description: "In a sensor-equipped pilot home, hallway motion sensors note no movement past 9:00 AM for a father living alone in Chennai.",
    status: "Illustrative Workflow",
  },
  {
    step: 2,
    actor: "Wearable Monitoring",
    title: "Wearable SOS or activity check",
    description: "His partner wearable shows low morning step activity and remains ready for one-touch SOS if he feels dizzy.",
    status: "Illustrative Workflow",
  },
  {
    step: 3,
    actor: "Health Readings",
    title: "Home BP & glucose reading logged",
    description: "He takes a morning blood pressure reading on his Bluetooth monitor, showing a mildly elevated reading compared to last week.",
    status: "Illustrative Workflow",
  },
  {
    step: 4,
    actor: "Configured Alerts",
    title: "Threshold notification triggered",
    description: "The partner monitoring system sends a configured alert because the reading crossed his preset comfort range.",
    status: "Illustrative Workflow",
  },
  {
    step: 5,
    actor: "Family Notifications",
    title: "Outstation daughter notified immediately",
    description: "His daughter in Bengaluru receives the notification and checks his LifeSakhi Care Timeline from her phone.",
    status: "Operationally Deployed",
  },
  {
    step: 6,
    actor: "Nurse Follow-Up",
    title: "LifeSakhi coordinates a visiting nurse",
    description: "Through LifeSakhi, the family books a same-day home nursing check-up; the coordinator allocates a verified nurse.",
    status: "Operationally Deployed",
  },
  {
    step: 7,
    actor: "Telehealth Consultation",
    title: "Doctor reviews vitals on video",
    description: "With the nurse present, the treating doctor reviews the week's readings over a partner telehealth call and adjusts hydration/medication.",
    status: "Illustrative Workflow",
  },
  {
    step: 8,
    actor: "Home Caregiver Visits",
    title: "Saha companion provides daily support",
    description: "A verified Saha visits for daytime companionship and meal/medication reminders, checking in with GPS verification on LifeSakhi.",
    status: "Operationally Deployed",
  },
];

/* ─── Section 6: Six Senior-Care Use Cases ─────────────────────────────────── */

export interface SeniorUseCase {
  id: string;
  title: string;
  imageKey: "elderly" | "home" | "nursing" | "mother" | "travel" | "technology";
  imageAlt: string;
  seniorProblem: string;
  relevantTechnology: string[];
  howItWorks: string;
  familyBenefit: string;
  humanSupportComplement: string;
}

export const SENIOR_CARE_USE_CASES: SeniorUseCase[] = [
  {
    id: "ageing-in-place",
    title: "Ageing in Place",
    imageKey: "elderly",
    imageAlt: "Elderly Indian woman smiling comfortably at home with her caregiver",
    seniorProblem: "Parents want to stay in their own familiar home and neighbourhood, but family members worry about solo hours.",
    relevantTechnology: ["Digital Care-Management Platform", "Wearable SOS", "Smart-Home Sensors (pilot)"],
    howItWorks: "Routine shift tracking via LifeSakhi is paired with an optional wearable SOS button for solo hours between caregiver visits.",
    familyBenefit: "Parents retain independence at home while outstation children see verified visit attendance.",
    humanSupportComplement: "A daytime Saha companion assists with meals, walks, and conversation so home never feels isolating.",
  },
  {
    id: "fall-prevention",
    title: "Fall Prevention",
    imageKey: "home",
    imageAlt: "Caregiver walking closely beside a senior citizen in a bright home corridor",
    seniorProblem: "Fear of slipping in the bathroom or stumbling while walking to switch on lights at night.",
    relevantTechnology: ["Voice-Activated Lighting", "Fall Detection & Bedside Mats (under evaluation)", "Wearable SOS"],
    howItWorks: "Voice-controlled lights eliminate dark walks to switches, while bedside/wearable alerts notify family or caregivers if an impact occurs.",
    familyBenefit: "Reduces the risk of an unassisted fall going unnoticed for hours.",
    humanSupportComplement: "Trained Sahas provide physical walking assistance, safe bathroom transfers, and fall-hazard checks.",
  },
  {
    id: "chronic-disease-management",
    title: "Chronic-Disease Management",
    imageKey: "nursing",
    imageAlt: "Registered nurse measuring blood pressure for a senior patient at home",
    seniorProblem: "Managing diabetes, hypertension, or cardiac recovery requires consistent tracking between quarterly hospital visits.",
    relevantTechnology: ["Remote Patient Monitoring", "Telehealth Consultations", "Digital Care Logs"],
    howItWorks: "Partner BP, glucose, and SpO2 devices record readings at home, making them ready for partner video doctor reviews.",
    familyBenefit: "Eliminates stressful OPD queues for routine check-ups and keeps siblings aligned on clinical status.",
    humanSupportComplement: "Licensed GNM/B.Sc nurses perform prescribed clinical checks and coordinate follow-ups.",
  },
  {
    id: "dementia-care",
    title: "Dementia Care",
    imageKey: "elderly",
    imageAlt: "Patient caregiver sitting calmly with an elderly mother at home",
    seniorProblem: "Memory loss, sundowning restlessness, or risk of stepping outside unattended.",
    relevantTechnology: ["Door Sensors (under evaluation)", "Geo-fenced Wearables (partner)", "Routine Care Timeline"],
    howItWorks: "Door contact alerts and partner GPS wearables help notify family if an exterior door opens unexpectedly.",
    familyBenefit: "Extra safety layer against wandering without locking seniors indoors or relying on cameras.",
    humanSupportComplement: "Patient, dementia-sensitised Saha companions provide calm redirection, structured routines, and companionship.",
  },
  {
    id: "medication-adherence",
    title: "Medication Adherence",
    imageKey: "technology",
    imageAlt: "Caregiver reminding a senior gentleman about his morning medicine schedule",
    seniorProblem: "Multiple prescriptions at different times of day lead to missed or double-taken tablets.",
    relevantTechnology: ["Smart Pill Dispensers (partner)", "Audio Voice Reminders", "Shift Checklists"],
    howItWorks: "Timed dispensers chime and unlock only the scheduled dose compartment, while voice assistants reinforce meal/pill timings.",
    familyBenefit: "Fewer preventable medication errors and clearer adherence visibility.",
    humanSupportComplement: "Sahas provide timely non-clinical medication reminders; nurses handle injections and clinical infusions.",
  },
  {
    id: "social-connection",
    title: "Social Connection",
    imageKey: "travel",
    imageAlt: "Companion accompanying a senior citizen for a peaceful outdoor outing",
    seniorProblem: "Loneliness and hesitation using small smartphone screens keep seniors disconnected from family and community.",
    relevantTechnology: ["Voice Assistants for Hands-Free Calling", "Video Calling Assistance", "Care Portal Updates"],
    howItWorks: "Voice speakers initiate calls to family with a simple spoken name, and caregivers assist with WhatsApp video calls.",
    familyBenefit: "Warm, regular face-to-face connection between grandparents, children, and grandchildren.",
    humanSupportComplement: "Lifestyle and Saha companions accompany seniors to parks, temples, clubs, and social visits.",
  },
];

/* ─── Section 7: India-Specific Proposed Solution Bundles ──────────────────── */

export interface SolutionBundle {
  id: string;
  code: string;
  name: string;
  status: "Proposed Solution Bundle";
  intendedFor: string;
  components: string[];
  humanPairing: string;
  note: string;
}

export const INDIA_SOLUTION_BUNDLES: SolutionBundle[] = [
  {
    id: "basic-senior-safety-kit",
    code: "Bundle A",
    name: "Basic Senior Safety Kit",
    status: "Proposed Solution Bundle",
    intendedFor: "Independent seniors living alone or spending daytime hours unattended.",
    components: [
      "Emergency SOS button (partner wearable)",
      "Fall detection where supported by partner hardware",
      "Motion sensors (under pilot evaluation)",
      "Family alerts to registered emergency contacts",
    ],
    humanPairing: "Optional on-call Saha check-in or scheduled weekly companion visits.",
    note: "Proposed solution bundle — final availability depends on city, partner device stock, and home connectivity.",
  },
  {
    id: "chronic-care-monitoring-kit",
    code: "Bundle B",
    name: "Chronic-Care Monitoring Kit",
    status: "Proposed Solution Bundle",
    intendedFor: "Seniors managing hypertension, diabetes, COPD, or post-cardiac care at home.",
    components: [
      "Blood pressure monitoring (partner device)",
      "Glucose monitoring (partner device)",
      "SpO2 monitoring (partner device)",
      "Teleconsultation (partner doctor network)",
      "Medication reminders",
      "Nurse follow-up via LifeSakhi",
    ],
    humanPairing: "Scheduled registered nurse (GNM/B.Sc) visits and daily Saha routine support.",
    note: "Proposed solution bundle — equipment sourcing and teleconsultation integration are arranged through partners.",
  },
  {
    id: "post-hospital-recovery-package",
    code: "Bundle C",
    name: "Post-Hospital Recovery Package",
    status: "Proposed Solution Bundle",
    intendedFor: "Patients returning home after surgery, fracture, stroke, or prolonged ICU stay.",
    components: [
      "Physiotherapy coordination",
      "Wound-care support by registered nurses",
      "Health monitoring (vitals logging)",
      "Mobility equipment guidance (wheelchair, walker, hospital bed)",
      "Caregiver (Saha) visits",
    ],
    humanPairing: "12-hour or 24-hour Saha bedside support paired with prescribed nurse visits.",
    note: "Proposed solution bundle — clinical nursing and physiotherapy require treating doctor prescriptions.",
  },
  {
    id: "senior-living-management-platform",
    code: "Bundle D",
    name: "Senior-Living Management Platform",
    status: "Proposed Solution Bundle",
    intendedFor: "Retirement communities, assisted-living residences, and elder-care institutions.",
    components: [
      "Staff alerts and shift dispatch",
      "Resident activity tracking (where consented)",
      "Structured health and care records",
      "Family communication portal",
      "Emergency response escalation workflows",
    ],
    humanPairing: "Trained Saha ward/residence staffing and supervisor coordination.",
    note: "Proposed institutional solution — scoped per facility size, staffing model, and local infrastructure.",
  },
];

/* ─── Section 8: Connected Care Ecosystem ──────────────────────────────────── */

export interface EcosystemComponent {
  id: string;
  step: string;
  title: string;
  summary: string;
  examples: string[];
}

export const ECOSYSTEM_COMPONENTS: EcosystemComponent[] = [
  {
    id: "smart-devices",
    step: "01",
    title: "Smart Devices",
    summary: "Capture signals and readings at home without disrupting daily life.",
    examples: ["Partner BP/glucose/SpO2 monitors", "SOS wearables & pendants", "Voice hubs & pilot sensors"],
  },
  {
    id: "digital-systems",
    step: "02",
    title: "Intelligent Digital Systems",
    summary: "Organise bookings, attendance, care timelines, and configured notifications.",
    examples: ["LifeSakhi Care Portal", "Geo-verified shift check-ins", "Care Timeline & partner alerts"],
  },
  {
    id: "human-care-teams",
    step: "03",
    title: "Human Care Teams",
    summary: "Interpret context in person and deliver compassionate, skilled assistance.",
    examples: ["Saha companions", "Registered GNM/B.Sc nurses", "Regional care coordinators"],
  },
  {
    id: "family-healthcare-network",
    step: "04",
    title: "Family & Healthcare Network",
    summary: "Keep loved ones informed and connect clinicians when medical decisions are needed.",
    examples: ["Local & outstation family", "Treating doctors & telehealth", "Technology partners"],
  },
];

export const ECOSYSTEM_ROLES = [
  { role: "Saha Companions", responsibility: "Daily non-clinical living assistance, companionship, mobility support, and observation at home." },
  { role: "Registered Nurses", responsibility: "Doctor-prescribed wound care, injections, catheter care, and clinical vitals assessment." },
  { role: "Care Coordinators", responsibility: "Triage family needs, match verified Sahas, verify attendance, and coordinate escalations." },
  { role: "Family Members", responsibility: "Set consent preferences, receive updates and alerts, and participate in care decisions from anywhere." },
  { role: "Doctors", responsibility: "Review clinical trends, conduct telehealth or in-person consults, and issue prescriptions." },
  { role: "Technology Partners", responsibility: "Supply validated monitoring hardware, wearables, and device platforms with clear support terms." },
];

/* ─── Section 9: Privacy, Security & Responsible Technology ────────────────── */

export interface ResponsibleTechPillar {
  title: string;
  description: string;
}

export const RESPONSIBLE_TECH_PILLARS: ResponsibleTechPillar[] = [
  {
    title: "Consent-Based Monitoring",
    description: "Monitoring tools are introduced only with clear explanation and consent from the senior and authorised family members.",
  },
  {
    title: "Data Privacy",
    description: "Only authorised family contacts and assigned care coordinators see booking and care records; we avoid unnecessary camera surveillance.",
  },
  {
    title: "Information Security",
    description: "Role-based access controls separate Family, Saha, and Admin portals. We do not claim unverified third-party security certifications.",
  },
  {
    title: "Device Accuracy",
    description: "Home consumer devices can vary in calibration; abnormal readings should always be verified before medical decisions.",
  },
  {
    title: "False Alerts",
    description: "Wearables and motion sensors can trigger false alarms; human verification by family or coordinators prevents unnecessary panic.",
  },
  {
    title: "Digital Literacy",
    description: "Solutions are chosen for seniors who should not have to learn complex smartphone menus—preferring single buttons or voice.",
  },
  {
    title: "Regional-Language Accessibility",
    description: "Human coordination and voice setups prioritise Tamil, Kannada, Telugu, Malayalam, Hindi, and English comfort.",
  },
  {
    title: "Affordability",
    description: "We recommend practical, modular tools rather than locking families into expensive, unnecessary hardware packages.",
  },
  {
    title: "Internet Connectivity",
    description: "Power cuts and patchy Wi-Fi happen in Indian homes; offline-capable routines and human backup remain essential.",
  },
  {
    title: "Human Intervention & Escalation",
    description: "Technology never dispatches an ambulance autonomously on its own—trained humans and family decide the right next step.",
  },
];
