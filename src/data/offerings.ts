/**
 * LifeSakhi Offerings Data Model
 * 
 * Unites:
 * A. Human-led Care & Assistance (Operational)
 * B. Technology Solutions (10 categories with verified readiness statuses)
 * C. Women & Child Development (Lifelong wellbeing & SHG empowerment)
 * D. Partnership Solutions (Institutional, NGO, Hospital & Tech Collaborations)
 */

export type TechDeploymentStatus =
  | "Operational"
  | "Available Through Partners"
  | "Under Evaluation"
  | "Planned";

export interface TechSolutionCategory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  status: TechDeploymentStatus;
  statusDescription: string;
  whatItDoes: string;
  valueForFamily: string;
  keyFeatures: string[];
  useCases: string[];
  ctaLabel: string;
  ctaAction: "booking" | "enquiry" | "consultation";
}

export const TECHNOLOGY_CATEGORIES: TechSolutionCategory[] = [
  {
    id: "remote-patient-monitoring",
    number: "01",
    title: "Remote Patient Monitoring",
    subtitle: "Continuous clinical vitals streaming for remote families & doctors",
    status: "Operational",
    statusDescription:
      "Available across Bengaluru, Chennai, Hyderabad & Coimbatore paired with verified Saha nurse visits.",
    whatItDoes:
      "Connects clinically validated diagnostic devices (blood pressure cuffs, glucometers, pulse oximeters, ECG patches) to transmit physiological metrics directly into the patient's secure digital health record.",
    valueForFamily:
      "Adult children living in other cities or abroad can monitor aging parents' vitals in real time, avoiding emergency ward visits through early detection of spikes or anomalies.",
    keyFeatures: [
      "Blood pressure monitoring & trend charting",
      "Continuous heart rate & arrhythmia detection",
      "Digital glucose monitoring with meal correlation",
      "Oxygen saturation (SpO2) alerts",
      "Weight, sleep & daily sedentary activity tracking",
    ],
    useCases: [
      "Hypertension and post-cardiac surgical recovery at home",
      "Type-2 diabetes management for independent seniors",
      "COPD and respiratory monitoring during seasonal weather changes",
    ],
    ctaLabel: "Enquire About Monitoring",
    ctaAction: "consultation",
  },
  {
    id: "telehealth",
    number: "02",
    title: "Telehealth & Virtual Consultations",
    subtitle: "Direct video access to geriatric specialists, physicians & dieticians",
    status: "Available Through Partners",
    statusDescription:
      "Delivered in partnership with accredited clinical telehealth providers and visiting home nurses.",
    whatItDoes:
      "Enables high-definition video consultations between bedridden patients at home and specialist physicians, with on-site Saha attendants assisting with camera positioning, medical history review, and physical comfort.",
    valueForFamily:
      "Eliminates stressful, painful ambulance or wheelchair hospital trips for routine review appointments and prescription re-authorisations.",
    keyFeatures: [
      "Scheduled video consultations with verified doctors",
      "Post-operative medical follow-up reviews",
      "Specialist geriatrician & neurologist access",
      "Digital prescription generation & verification",
      "Liaison between family members and doctors",
    ],
    useCases: [
      "Post-discharge orthopedic follow-ups without leaving bed",
      "Neurological reviews for patients with dementia or Parkinson's",
      "Timely second opinions when sudden mobility decline occurs",
    ],
    ctaLabel: "Schedule Telehealth Consult",
    ctaAction: "consultation",
  },
  {
    id: "wearable-technology",
    number: "03",
    title: "Wearable Health Technology",
    subtitle: "Continuous physiological tracking & one-touch SOS dispatch",
    status: "Available Through Partners",
    statusDescription:
      "Tested and supported with leading partner smartwatches and lightweight medical telemetry bands.",
    whatItDoes:
      "Wearable sensors that continuously track heart rate variability, skin temperature, sleep staging, steps, and sudden impact, featuring dedicated physical SOS buttons configured to alert local family and the LifeSakhi care desk.",
    valueForFamily:
      "Seniors maintain everyday independence inside and outside the home while families enjoy 24/7 peace of mind knowing unexpected emergencies trigger instant alerts.",
    keyFeatures: [
      "Senior-friendly smartwatches with large numerals",
      "Continuous health-monitoring wristbands",
      "Low-profile clinical biosensor patches",
      "Instant SOS emergency alerts with GPS coordinates",
      "Geo-fencing and wandering alerts for cognitive care",
    ],
    useCases: [
      "Active seniors who enjoy independent morning walks",
      "Mild cognitive impairment or early-stage Alzheimer's safety",
      "Cardiac patients requiring continuous arrhythmia surveillance",
    ],
    ctaLabel: "Explore Wearable Devices",
    ctaAction: "enquiry",
  },
  {
    id: "smart-home-sensors",
    number: "04",
    title: "Smart-Home Ambient Sensors",
    subtitle: "Non-intrusive activity, movement & safety monitoring without cameras",
    status: "Under Evaluation",
    statusDescription:
      "Currently under pilot testing for privacy-first ambient safety across South Indian residential homes.",
    whatItDoes:
      "Discreet wireless sensors installed on doors, beds, refrigerators, and bathrooms that monitor daily living routines (movement, kitchen visits, nighttime bathroom trips) without invasive video surveillance.",
    valueForFamily:
      "Complete respect for senior privacy and dignity while detecting abnormal disruptions—such as prolonged lack of movement or stove left unattended—before they become emergencies.",
    keyFeatures: [
      "Passive infrared (PIR) room motion sensors",
      "Main entrance and balcony door opening sensors",
      "Bed occupancy pressure mats for sleep tracking",
      "Kitchen gas and stove heat sensors",
      "Ambient room temperature & humidity monitoring",
    ],
    useCases: [
      "Elderly parents living alone in their ancestral home",
      "Detecting unusual nighttime wanderings or dehydration",
      "Preventing kitchen accidents and unattended cooking hazards",
    ],
    ctaLabel: "Join Sensor Pilot Programme",
    ctaAction: "enquiry",
  },
  {
    id: "fall-detection-prevention",
    number: "05",
    title: "Fall Detection & Prevention",
    subtitle: "Instant impact alert & ambient radar prevention technologies",
    status: "Under Evaluation",
    statusDescription:
      "Combining verified wearable impact algorithms with emerging non-wearable wall radar sensors.",
    whatItDoes:
      "Uses multi-axis accelerometers, wall-mounted micro-radar beams, and bedside pressure pads to detect sudden falls instantly—even if the individual is unconscious or unable to reach a call bell.",
    valueForFamily:
      "Mitigates the critical 'long lie' hazard where a fallen senior remains on the floor for hours. Triggers automated emergency notifications to family and regional Saha rapid responders.",
    keyFeatures: [
      "Wearable multi-axis impact fall detection",
      "Wall-mounted privacy-safe radar fall sensors",
      "Bedside and bathroom pressure detection mats",
      "Waterproof bathroom emergency pull cords & buttons",
      "Automated SMS and voice dispatch to emergency contacts",
    ],
    useCases: [
      "Seniors with osteoarthritis, balance frailty, or vertigo",
      "High-risk bathroom and wet-area fall prevention",
      "Nighttime unassisted bed-transfer fall protection",
    ],
    ctaLabel: "Consult on Fall Safety",
    ctaAction: "consultation",
  },
  {
    id: "medication-technology",
    number: "06",
    title: "Medication Adherence Technology",
    subtitle: "Automated pill dispensers, audio-visual prompts & dose tracking",
    status: "Available Through Partners",
    statusDescription:
      "Integrated with partner smart dispenser hardware and Saha attendant routine verification logs.",
    whatItDoes:
      "Automates multi-dose daily medication schedules using locked, timed carousels that dispense only the correct pills at the prescribed hour, accompanied by chime alarms and smartphone notification confirmation.",
    valueForFamily:
      "Completely prevents accidental double-dosing or forgotten prescriptions, which represent the leading cause of preventable hospital admissions among elders.",
    keyFeatures: [
      "Tamper-proof smart automated pill carousels",
      "Audio, visual, and smartphone medication reminders",
      "Real-time dose adherence logging for caregivers",
      "Prescription refill tracking & pharmacy delivery sync",
      "Immediate alert if a scheduled dose is missed",
    ],
    useCases: [
      "Complex multi-drug regimens (cardiac, diabetic, hypertensive)",
      "Mild memory lapse or confusion regarding pill timing",
      "Families managing eldercare medications from afar",
    ],
    ctaLabel: "Inquire About Smart Dispensers",
    ctaAction: "enquiry",
  },
  {
    id: "voice-assistants",
    number: "07",
    title: "Voice-Assisted Living",
    subtitle: "Hands-free home control, emergency calls & friendly conversational aids",
    status: "Available Through Partners",
    statusDescription:
      "Custom configured for South Indian households with support for English, Hindi, Tamil, and Kannada phrases.",
    whatItDoes:
      "Deploys voice-activated smart hubs configured specifically for elderly convenience: voice-dialling family, turning bedside lights on/off without walking in the dark, and playing comforting devotional chants or music.",
    valueForFamily:
      "Reduces fall hazards from walking to light switches in darkness and provides a zero-effort way for bedridden seniors to request immediate help.",
    keyFeatures: [
      "Voice-activated lighting and room temperature control",
      "Hands-free emergency voice dialling ('Call my son / Call Saha')",
      "Custom voice medication and hydration reminders",
      "Regional audio entertainment (devotional music, news, audiobooks)",
      "Daily check-in routines and wake-up reassurance",
    ],
    useCases: [
      "Limited fine-motor dexterity or arthritis unable to use smartphones",
      "Bed-bound patients needing to adjust fan or light independently",
      "Combating daytime loneliness through easy conversational tools",
    ],
    ctaLabel: "Set Up Voice Assistance",
    ctaAction: "enquiry",
  },
  {
    id: "ai-predictive-analytics",
    number: "08",
    title: "AI & Predictive Health Analytics",
    subtitle: "Early trend pattern recognition to prevent acute medical crises",
    status: "Under Evaluation",
    statusDescription:
      "Data science models under development in collaboration with clinical technology partners.",
    whatItDoes:
      "Applies intelligent machine-learning algorithms across historical vitals, mobility data, fluid intake, and sleep metrics to identify subtle baseline deviations that precede acute clinical declines.",
    valueForFamily:
      "Transforms reactive care into proactive prevention: identifying early signs of urinary tract infections, cardiac decompensation, or pneumonia days before acute hospitalization is required.",
    keyFeatures: [
      "Baseline physiological trend modeling",
      "Activity and gait slowdown pattern detection",
      "Early warning indicators for respiratory & cardiac decline",
      "Customized family health summary digests",
      "Automated clinical risk scoring for care coordinators",
    ],
    useCases: [
      "Chronic heart failure and renal recovery monitoring",
      "Post-sepsis convalescence and infection surveillance",
      "Preventing repeat 30-day hospital readmissions",
    ],
    ctaLabel: "Learn About Predictive Care",
    ctaAction: "consultation",
  },
  {
    id: "care-management-platforms",
    number: "09",
    title: "Integrated Care-Management Platform",
    subtitle: "Unified digital hub connecting family, attending Saha & clinical nurse",
    status: "Operational",
    statusDescription:
      "Active in production powering LifeSakhi customer portals, Saha attendance logs, and supervisor reviews.",
    whatItDoes:
      "The digital backbone of LifeSakhi: provides families with real-time shift check-ins, caregiver profiles, vital sign charting, daily routine logs, and transparent billing in one unified portal.",
    valueForFamily:
      "Zero guesswork. Every shift is transparently documented with shift verification, supervisor nurse review, and direct communication channels.",
    keyFeatures: [
      "Real-time family-to-caregiver coordination desk",
      "Digital care plans tailored to individual patient needs",
      "Verified shift check-in / check-out with GPS cluster backup",
      "Nurse and physician documentation sharing",
      "Itemized GST compliant billing and digital invoicing",
    ],
    useCases: [
      "Families seeking complete transparency over home attendant shifts",
      "Remote siblings sharing unified updates regarding parents",
      "Clinical handovers between day and night care shifts",
    ],
    ctaLabel: "Access Care Portal",
    ctaAction: "booking",
  },
  {
    id: "assistive-robotics",
    number: "10",
    title: "Assistive Robotics & Mobility Augmentation",
    subtitle: "Robotic transfer assistance, companion robotics & gait support",
    status: "Planned",
    statusDescription:
      "Under technology review and international research evaluation for future institutional integration.",
    whatItDoes:
      "Explores next-generation robotic exoskeletons, mechanical transfer hoists, and socially assistive therapeutic robotic companions designed to aid patient lifting and provide interactive cognitive stimulation.",
    valueForFamily:
      "Protects both caregiver and patient from injury during physical transfers, while providing cutting-edge therapeutic support for advanced neurological conditions.",
    keyFeatures: [
      "Smart ergonomic patient lifting & transfer supports",
      "Gait assistance and robotic rehabilitation aids",
      "Socially assistive therapeutic companion robots",
      "Sensory touch therapy for advanced dementia care",
      "Robotic medication delivery in institutional wards",
    ],
    useCases: [
      "Completely bed-bound bariatric or quadriplegic patient transfers",
      "Specialized neuro-rehabilitation following severe stroke",
      "Institutional elderly living facilities and memory-care wings",
    ],
    ctaLabel: "Register for Future Updates",
    ctaAction: "enquiry",
  },
];

export const OFFERINGS_SECTIONS = [
  {
    id: "care-assistance",
    title: "Care & Assistance",
    eyebrow: "Human-Led Compassion · Operational Now",
    tagline: "Dignified bedside care, certified nursing, and daily living assistance.",
    description:
      "Our core operational foundation across South India: police-verified women attendants (Saha care companions) and registered GNM/B.Sc. nurses delivering dependable care in homes and hospital wards.",
    highlights: [
      "Elderly companionship & mobility assistance",
      "24/7 Hospital bedside attendance & nurse liaison",
      "Prescribed clinical home nursing (GNM / B.Sc)",
      "Postnatal recovery & newborn handling support",
      "Assisted travel, chauffeuses & railway/airport accompaniment",
      "Family respite & remote care coordination",
    ],
  },
  {
    id: "technology",
    title: "Technology Solutions",
    eyebrow: "Intelligent Ecosystem · 10 Solution Areas",
    tagline: "Care that understands people. Technology that makes care smarter.",
    description:
      "Bridging compassionate hands with intelligent health-tech: remote patient monitoring, telehealth, smart medication dispensers, ambient sensors, and AI analytics to anticipate emergencies before they happen.",
    highlights: [
      "10 distinct technology categories",
      "Transparent deployment statuses (Operational to Planned)",
      "Zero invasive cameras — privacy-first ambient sensing",
      "Designed specifically for Indian homes and senior comfort",
    ],
  },
  {
    id: "women-child",
    title: "Women & Child Development",
    eyebrow: "Lifelong Wellbeing & Empowerment",
    tagline: "For Her, Through Every Chapter of Life.",
    description:
      "LifeSakhi is dedicated to the strength, dignity, development and wellbeing of women and children—from early girl-child development and maternal health to vocational training and financial independence through Self-Help Groups.",
    highlights: [
      "Girl-child development & early childhood learning",
      "Adolescent health literacy & life-skills mentoring",
      "Maternal health & postpartum wellbeing",
      "Women Self-Help Group (SHG) vocational training",
      "Dignified employment & financial agency for women",
    ],
  },
  {
    id: "partnerships",
    title: "Partnership Solutions",
    eyebrow: "Collaborative Impact · Institutions & Communities",
    tagline: "Building a stronger future of care, together.",
    description:
      "We partner with NGOs, women's Self-Help Groups, hospitals, healthcare institutions, and technology innovators—including our strategic investor & partner TRUSTGRID.AI—to scale high-impact care across India.",
    highlights: [
      "Women Self-Help Group (SHG) training alliances",
      "Hospital discharge & bedside transition partnerships",
      "NGO community health & safety programmes",
      "Technology & health-device co-deployments",
      "Corporate eldercare & employee wellbeing benefits",
    ],
  },
];

