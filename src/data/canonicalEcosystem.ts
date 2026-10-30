/**
 * Canonical Care Ecosystem & Service Family Architecture — ApnaCare Phase 2
 *
 * Implements the comprehensive care families, explicit operational readiness states,
 * and clinical/non-clinical governance boundaries.
 */

export type OperationalReadiness =
  | "Operational"          // Verified as currently deliverable in active clusters
  | "Assessment required"  // Potentially available after reviewing family's specific needs
  | "Partner-delivered"    // Supplied through an approved, identified partner arrangement
  | "Planned"              // Under evaluation and not currently bookable
  | "Restricted"           // Requires special clinical governance or further safety review
  | "Unavailable";         // Not offered

export type DeliveryModel =
  | "In-Home Attendance (Day / Night Shift)"
  | "24-Hour Residential Live-in"
  | "Hospital Inpatient Bedside Vigil"
  | "Clinical Home Visit (Per-Procedure)"
  | "Chaperoned Journey / Assisted Travel"
  | "Dedicated Remote Family Care Coordination"
  | "Institutional / B2B Enterprise Agreement";

export type ClinicalClassification = "Non-Clinical Personal Care" | "Medically Licensed Clinical Nursing" | "Non-Clinical Accompaniment";

export interface CareServiceFamily {
  id: string;
  name: string;
  code: "FAM-A" | "FAM-B" | "FAM-C" | "FAM-D" | "FAM-E" | "FAM-F" | "FAM-G" | "FAM-H" | "FAM-I";
  tagline: string;
  description: string;
  targetICPs: string[];
  clinicalGovernance: string;
  readiness: OperationalReadiness;
  services: CanonicalService[];
}

export interface CanonicalService {
  id: string;
  slug: string;
  name: string;
  familyId: string;
  category: "home" | "healthcare" | "safety" | "travel" | "lifestyle";
  readiness: OperationalReadiness;
  clinicalClassification: ClinicalClassification;
  providerType:
    | "General Duty Assistant (Attendant)"
    | "Registered Nurse (GNM / B.Sc)"
    | "Licensed Woman Driver / Chauffeuse"
    | "Trained Travel Companion"
    | "Postnatal Specialist (Japa Caregiver)"
    | "Care Coordinator / Case Manager";
  shortDescription: string;
  fullDescription: string;
  whoItIsFor: string[];
  inclusions: string[];
  exclusions: string[];
  mandatoryPrerequisites: string[];
  pricingBasis: "Per Day (8-12h Shift)" | "Per Day (24h Live-in)" | "Per Procedure / Visit" | "Per Journey / Trip" | "Custom Quotation";
  startingPrice: number;
  pricingType: "Confirmed" | "Starting price" | "Indicative estimate" | "Assessment required";
  applicableTax: "18% Statutory GST (SAC 9993)" | "Exempt / To Be Determined";
  shiftDurations: string[];
  supportedActiveCities: string[];
  plannedExpansionCities: string[];
  relatedServiceSlugs: string[];
  lastVerificationDate: string;
  internalOwner: string;
}

export const CANONICAL_CARE_FAMILIES: CareServiceFamily[] = [
  {
    id: "fam-elderly-independent-living",
    name: "Elderly Care & Independent Living",
    code: "FAM-A",
    tagline: "Dignified everyday living, mobility transfer, and companionship at home",
    description:
      "Supportive daily living assistance for senior citizens living independently or with working families across South India.",
    targetICPs: [
      "Working adult children managing eldercare from tech corridors",
      "Non-Resident Indians (NRIs) seeking reliable updates for parents in India",
      "Seniors recovering from age-related frailty or mild cognitive decline",
    ],
    clinicalGovernance:
      "Attendants provide non-clinical supportive care: bathing, mobility, companionship, and oral prescription reminder logging. Sterile procedures and injections are strictly excluded.",
    readiness: "Operational",
    services: [], // Populated below
  },
  {
    id: "fam-hospital-patient-assistance",
    name: "Hospital Bedside & Patient Assistance",
    code: "FAM-B",
    tagline: "Dedicated inpatient bedside vigil, mobility help, and discharge support",
    description:
      "Attentive non-clinical bedside attendants providing round-the-clock comfort, bathroom assistance, and nurse-call coordination during hospital admissions.",
    targetICPs: [
      "Families navigating acute or planned inpatient surgeries",
      "Caregivers experiencing ward fatigue while balancing jobs and childcare",
    ],
    clinicalGovernance:
      "Bedside attendants assist patient comfort and coordination. They do not adjust IV lines, titrate medication, or interfere with hospital medical protocols.",
    readiness: "Operational",
    services: [],
  },
  {
    id: "fam-clinical-nursing-rehab",
    name: "Clinical Nursing, Recovery & Rehabilitation",
    code: "FAM-C",
    tagline: "Registered GNM/B.Sc nurses for sterile wound care, injections, and post-op recovery",
    description:
      "Medically licensed home nursing procedures performed under active treating physician prescription.",
    targetICPs: [
      "Post-operative patients requiring sterile dressings and surgical drain monitoring",
      "Bed-bound patients requiring urinary catheterization or IV antibiotic administration",
    ],
    clinicalGovernance:
      "Strictly delivered by licensed GNM or B.Sc registered nurses holding state nursing council credentials. Written doctor's prescription mandatory prior to procedure.",
    readiness: "Operational",
    services: [],
  },
  {
    id: "fam-maternity-postpartum-newborn",
    name: "Maternity, Postpartum & Newborn Support",
    code: "FAM-D",
    tagline: "Gentle recovery for new mothers, newborn soothing, and night-shift coverage",
    description:
      "Experienced maternal and infant caregivers who assist with gentle infant massage, soothing, and night coverage so mothers get restorative rest.",
    targetICPs: [
      "First-time mothers needing restorative sleep and hands-on infant handling guidance",
      "Families navigating C-section recovery without resident extended family help",
    ],
    clinicalGovernance:
      "Provides traditional maternal comfort and newborn care. Non-clinical; does not replace pediatric or obstetric medical consultations.",
    readiness: "Operational",
    services: [],
  },
  {
    id: "fam-travel-mobility-accompaniment",
    name: "Travel, Mobility & Accompaniment",
    code: "FAM-E",
    tagline: "Vetted companions and chauffeuses for clinic visits, airports, and railway journeys",
    description:
      "Door-to-door journey accompaniment, station navigation, and licensed women chauffeuses for safe transit.",
    targetICPs: [
      "Elderly parents traveling outstation for medical checkups or family events",
      "Solo women travelers arriving late at night or navigating busy terminals",
    ],
    clinicalGovernance:
      "Accompaniment and transit assistance. Medical emergencies in transit trigger immediate escalation to nearest medical facility and family SOS contact.",
    readiness: "Operational",
    services: [],
  },
  {
    id: "fam-respite-household-support",
    name: "Family Respite & Household Care Continuity",
    code: "FAM-F",
    tagline: "Temporary relief for family caregivers and care continuity during emergencies",
    description:
      "Planned respite shifts and emergency coverage when a primary family caregiver needs time off or experiences unexpected commitments.",
    targetICPs: [
      "Primary caregivers facing physical and emotional burnout",
      "Households needing short-term assistance during family events or emergencies",
    ],
    clinicalGovernance:
      "Non-clinical daily living and household routine support related to care recipient's care plan.",
    readiness: "Operational",
    services: [],
  },
  {
    id: "fam-care-coordination-remote",
    name: "Care Coordination & Remote Family Support",
    code: "FAM-G",
    tagline: "Dedicated care managers, scheduled WhatsApp logs, and doctor appointment coordination",
    description:
      "Structured oversight for families living in different cities or abroad, ensuring consistent care communication and supervisor oversight.",
    targetICPs: [
      "NRIs and out-of-city professionals seeking regular objective updates on elderly parents",
      "Families coordinating multi-provider care across hospitals, labs, and home",
    ],
    clinicalGovernance:
      "Communication and administrative coordination. Does not make independent clinical diagnoses or emergency triage decisions.",
    readiness: "Operational",
    services: [],
  },
  {
    id: "fam-specialized-disability-institutional",
    name: "Specialized, Disability & Institutional Partnerships",
    code: "FAM-H",
    tagline: "Dementia companionship, palliative assistance, and hospital attendant staffing",
    description:
      "Care requiring specialist training or institutional agreements with healthcare providers and corporate employers.",
    targetICPs: [
      "Patients with Alzheimer's or Parkinson's requiring certified dementia companionship",
      "Hospital administrators and corporate HR leaders arranging employee caregiving support",
    ],
    clinicalGovernance:
      "Complex dementia and palliative care require specialized background screening and written physician care protocols. Corporate and hospital staffing governed by separate institutional SLA.",
    readiness: "Assessment required",
    services: [],
  },
];

export const CANONICAL_SERVICES: CanonicalService[] = [
  // --- Family A: Elderly Care & Independent Living ---
  {
    id: "SVC-001",
    slug: "elderly-care",
    name: "Elderly Care at Home",
    familyId: "fam-elderly-independent-living",
    category: "home",
    readiness: "Operational",
    clinicalClassification: "Non-Clinical Personal Care",
    providerType: "General Duty Assistant (Attendant)",
    shortDescription: "Compassionate daily companionship, personal hygiene assistance, and routine medication reminder logging for senior citizens.",
    fullDescription: "Dedicated and trained women attendants who provide dignified daily living support for aging parents at home. Attendants assist with morning routines, gentle sponge baths, walking transfers to prevent falls, meal accompaniment, and timely prescription reminders.",
    whoItIsFor: [
      "Seniors living alone whose children work full-time or live in another city",
      "Elders needing gentle support with bathing, dressing, and walking transfers",
      "Senior citizens recovering from surgery or managing mild mobility stiffness",
    ],
    inclusions: [
      "Bathing, sponge baths, and dignified personal hygiene assistance",
      "Indoor walking support and fall-prevention monitoring",
      "Medication reminders adhering to physician's written prescription schedule",
      "Nutritious meal and hydration accompaniment",
      "Daily digital wellness logs and scheduled WhatsApp summaries to family",
    ],
    exclusions: [
      "Administering intravenous (IV), intramuscular (IM), or insulin injections (requires Registered Nurse)",
      "Sterile surgical wound dressings or deep bedsore debridement",
      "Heavy domestic deep cleaning or non-caregiver household chores",
    ],
    mandatoryPrerequisites: [
      "Physician's written prescription provided for all medication schedules",
      "Safe, private resting space provided for 24-hour residential shifts",
    ],
    pricingBasis: "Per Day (8-12h Shift)",
    startingPrice: 1299,
    pricingType: "Confirmed",
    applicableTax: "18% Statutory GST (SAC 9993)",
    shiftDurations: ["8-Hour Day Shift", "12-Hour Day/Night Shift", "24-Hour Residential Live-in"],
    supportedActiveCities: ["bengaluru", "chennai", "hyderabad", "coimbatore"],
    plannedExpansionCities: ["kochi", "mysuru", "pune", "visakhapatnam"],
    relatedServiceSlugs: ["hospital-attendants", "home-personal-care", "nursing-services"],
    lastVerificationDate: "2026-10-24",
    internalOwner: "Care Operations Lead",
  },
  {
    id: "SVC-002",
    slug: "home-personal-care",
    name: "Home & Personal Care Assistance",
    familyId: "fam-elderly-independent-living",
    category: "home",
    readiness: "Operational",
    clinicalClassification: "Non-Clinical Personal Care",
    providerType: "General Duty Assistant (Attendant)",
    shortDescription: "Dedicated hands-on personal hygiene, grooming, bed-to-chair transfers, and dignified daily care.",
    fullDescription: "Respectful personal care assistance for seniors or recovering individuals who need physical assistance with sponge baths, oral hygiene, dressing, and room-to-room transfers.",
    whoItIsFor: [
      "Individuals recovering from orthopedic or hip surgery",
      "Seniors with limited physical flexibility needing personal grooming support",
    ],
    inclusions: [
      "Sponge baths, warm towel hygiene, and oral care",
      "Safe transfers between bed, wheelchair, and comfortable seating",
      "Linen change and keeping bedside care area clean and sanitized",
    ],
    exclusions: [
      "Sterile catheter insertion or tracheostomy care",
      "Manual patient lifting exceeding safe single-caregiver limits without equipment",
    ],
    mandatoryPrerequisites: ["Initial mobility assessment shared with coordinator"],
    pricingBasis: "Per Day (8-12h Shift)",
    startingPrice: 1099,
    pricingType: "Confirmed",
    applicableTax: "18% Statutory GST (SAC 9993)",
    shiftDurations: ["8-Hour Day Shift", "12-Hour Day Shift"],
    supportedActiveCities: ["bengaluru", "chennai", "hyderabad", "coimbatore"],
    plannedExpansionCities: ["kochi", "mysuru"],
    relatedServiceSlugs: ["elderly-care", "hospital-attendants"],
    lastVerificationDate: "2026-10-24",
    internalOwner: "Care Operations Lead",
  },

  // --- Family B: Hospital Bedside & Patient Assistance ---
  {
    id: "SVC-003",
    slug: "hospital-attendants",
    name: "Hospital Bedside Assistance",
    familyId: "fam-hospital-patient-assistance",
    category: "healthcare",
    readiness: "Operational",
    clinicalClassification: "Non-Clinical Personal Care",
    providerType: "General Duty Assistant (Attendant)",
    shortDescription: "Attentive bedside companionship, hygiene assistance, and nurse coordination during hospital admissions.",
    fullDescription: "Hospital-trained female attendants who remain beside your patient's bed day and night in private or general wards. They assist with bedpan usage, hygiene, call-bell coordination, and frequent updates to family members balancing jobs and childcare.",
    whoItIsFor: [
      "Families with hospitalized loved ones who cannot take weeks away from work",
      "Patients needing watchful bedside attendance to prevent post-op falls from hospital beds",
    ],
    inclusions: [
      "Continuous bedside observation and assistance with duty nurse call bells",
      "Comfort assistance: sponge baths, urinal handling, and patient repositioning",
      "Collecting prescribed medicines and test reports from hospital counter",
      "Frequent real-time WhatsApp updates to family on patient comfort and vitals",
    ],
    exclusions: [
      "Administering hospital IV medications or adjusting syringe pumps",
      "Operating hospital ventilators or intensive care equipment",
    ],
    mandatoryPrerequisites: ["Hospital ward visitation pass arranged by family"],
    pricingBasis: "Per Day (8-12h Shift)",
    startingPrice: 1499,
    pricingType: "Confirmed",
    applicableTax: "18% Statutory GST (SAC 9993)",
    shiftDurations: ["12-Hour Day Shift", "12-Hour Night Shift", "24-Hour Continuous Vigil"],
    supportedActiveCities: ["bengaluru", "chennai", "hyderabad", "coimbatore"],
    plannedExpansionCities: ["kochi", "mysuru", "pune"],
    relatedServiceSlugs: ["elderly-care", "nursing-services"],
    lastVerificationDate: "2026-10-24",
    internalOwner: "Clinical Governance Lead",
  },

  // --- Family C: Clinical Nursing, Recovery & Rehabilitation ---
  {
    id: "SVC-004",
    slug: "nursing-services",
    name: "Certified Clinical Home Nursing",
    familyId: "fam-clinical-nursing-rehab",
    category: "healthcare",
    readiness: "Operational",
    clinicalClassification: "Medically Licensed Clinical Nursing",
    providerType: "Registered Nurse (GNM / B.Sc)",
    shortDescription: "Qualified GNM and B.Sc nurses providing sterile wound care, injections, catheterization, and post-surgical recovery at home.",
    fullDescription: "Medically qualified nurses registered with state nursing councils. Nurses visit to execute sterile surgical wound dressings, intramuscular/subcutaneous injections, IV infusions, urinary catheter management, and vital sign monitoring strictly per written doctor orders.",
    whoItIsFor: [
      "Post-surgical patients requiring daily sterile wound care and infection control",
      "Patients requiring prescription IV medications, injections, or catheter maintenance",
    ],
    inclusions: [
      "Sterile wound dressing and post-surgical incision monitoring",
      "Prescribed intramuscular/subcutaneous injections and IV infusions",
      "Urinary catheter insertion/care and Ryle's tube feeding management",
      "Detailed clinical charting and reporting to treating physician",
    ],
    exclusions: [
      "Executing medical procedures without a signed physician prescription",
      "Prescribing new medications or altering prescribed dosages",
    ],
    mandatoryPrerequisites: [
      "Current, signed physician prescription detailing medication, dosage, and duration",
      "Sterile medical supplies provided by family or pre-ordered via authorized pharmacy",
    ],
    pricingBasis: "Per Procedure / Visit",
    startingPrice: 1999,
    pricingType: "Confirmed",
    applicableTax: "18% Statutory GST (SAC 9993)",
    shiftDurations: ["Per-Visit Procedure", "8-Hour Clinical Shift", "12-Hour Clinical Shift"],
    supportedActiveCities: ["bengaluru", "chennai", "hyderabad", "coimbatore"],
    plannedExpansionCities: ["kochi", "pune"],
    relatedServiceSlugs: ["hospital-attendants", "elderly-care"],
    lastVerificationDate: "2026-10-24",
    internalOwner: "Clinical Governance Lead",
  },

  // --- Family D: Maternity, Postpartum & Newborn Support ---
  {
    id: "SVC-005",
    slug: "post-natal-care",
    name: "Post-Natal Maternal & Newborn Support",
    familyId: "fam-maternity-postpartum-newborn",
    category: "home",
    readiness: "Operational",
    clinicalClassification: "Non-Clinical Personal Care",
    providerType: "Postnatal Specialist (Japa Caregiver)",
    shortDescription: "Experienced maternal caregivers assisting with gentle newborn massage, bath routines, and night vigil for mother's sleep.",
    fullDescription: "Traditional and trained post-natal caregivers who provide hands-on soothing, infant bathing, and mother recovery support. They handle late-night feedings and diaper changes so new mothers can get deep, restorative healing sleep after delivery.",
    whoItIsFor: [
      "First-time mothers needing gentle, experienced support with newborn soothing routines",
      "Mothers recovering from C-section deliveries needing night-time infant care coverage",
    ],
    inclusions: [
      "Gentle newborn oil massage, warm water bath, and burping routines",
      "Night-time diaper changes, swaddling, and soothing while mother sleeps",
      "Nutritious post-delivery hydration and dietary accompaniment for the mother",
      "Careful umbilical cord observation and hygiene reporting to parents",
    ],
    exclusions: [
      "Administering neonatal clinical medications without pediatric orders",
      "Heavy domestic cooking or household cleaning",
    ],
    mandatoryPrerequisites: ["Pediatrician discharge summary reviewed prior to start"],
    pricingBasis: "Per Day (8-12h Shift)",
    startingPrice: 1999,
    pricingType: "Confirmed",
    applicableTax: "18% Statutory GST (SAC 9993)",
    shiftDurations: ["12-Hour Night Shift", "24-Hour Live-in Care (28-day bookings)"],
    supportedActiveCities: ["bengaluru", "chennai", "hyderabad", "coimbatore"],
    plannedExpansionCities: ["kochi", "pune", "mysuru"],
    relatedServiceSlugs: ["elderly-care", "home-personal-care"],
    lastVerificationDate: "2026-10-24",
    internalOwner: "Maternal Care Lead",
  },

  // --- Family E: Travel, Mobility & Accompaniment ---
  {
    id: "SVC-006",
    slug: "travel-assistance",
    name: "Travel & Mobility Assistance",
    familyId: "fam-travel-mobility-accompaniment",
    category: "travel",
    readiness: "Operational",
    clinicalClassification: "Non-Clinical Accompaniment",
    providerType: "Trained Travel Companion",
    shortDescription: "Verified companions for airport arrivals, railway platform assistance, medical appointments, and transit navigation.",
    fullDescription: "Reliable travel companions who accompany senior citizens, recovering patients, and solo women during flights, train journeys, and hospital checkups, sharing live trip updates with designated family members.",
    whoItIsFor: [
      "Elderly parents traveling between cities who need baggage, wheelchair, and gate assisted travel",
      "Patients needing physical accompaniment to outstation specialty hospitals",
    ],
    inclusions: [
      "Meeting traveler at doorstep, airport terminal curb, or railway platform",
      "Wheelchair coordination, baggage handling, and security check assisted travel",
      "Continuous WhatsApp journey milestone updates to designated family",
    ],
    exclusions: [
      "Operating unauthorized or uninspected private vehicles",
      "Booking commercial airline tickets on behalf of customers",
    ],
    mandatoryPrerequisites: ["Travel tickets and passenger identification provided in advance"],
    pricingBasis: "Per Journey / Trip",
    startingPrice: 999,
    pricingType: "Confirmed",
    applicableTax: "18% Statutory GST (SAC 9993)",
    shiftDurations: ["Half-Day Transit (4h)", "Full-Day Journey Assisted Travel (8-12h)"],
    supportedActiveCities: ["bengaluru", "chennai", "hyderabad", "coimbatore"],
    plannedExpansionCities: ["kochi", "mysuru", "visakhapatnam"],
    relatedServiceSlugs: ["women-drivers", "airport-pickup", "railway-assistance"],
    lastVerificationDate: "2026-10-24",
    internalOwner: "Mobility Operations Lead",
  },
  {
    id: "SVC-007",
    slug: "women-drivers",
    name: "Professional Women Chauffeuses",
    familyId: "fam-travel-mobility-accompaniment",
    category: "travel",
    readiness: "Operational",
    clinicalClassification: "Non-Clinical Accompaniment",
    providerType: "Licensed Woman Driver / Chauffeuse",
    shortDescription: "Commercial-licensed women drivers for family vehicle chauffeuring, elder clinic visits, and safe evening commutes.",
    fullDescription: "Vetted women chauffeurs trained in defensive driving, vehicle ergonomics, and elderly passenger transfer. Available to drive the customer's personal vehicle for scheduled daily commutes, medical appointments, and outstation trips.",
    whoItIsFor: [
      "Senior citizens who prefer a gentle, patient driver for daily temple or hospital trips",
      "Working women seeking safe, vetted drivers for evening city commutes",
    ],
    inclusions: [
      "Driving customer's insured personal vehicle (manual or automatic)",
      "Assisting elderly passengers with door-to-door walking and assisted travel",
      "Punctual arrival and sanitized vehicle cab check",
    ],
    exclusions: [
      "Driving uninsured vehicles or vehicles with mechanical defects",
      "Commercial taxi or ride-hailing third-party operations",
    ],
    mandatoryPrerequisites: ["Valid vehicle registration, comprehensive insurance, and pollution certificate"],
    pricingBasis: "Per Day (8-12h Shift)",
    startingPrice: 1199,
    pricingType: "Confirmed",
    applicableTax: "18% Statutory GST (SAC 9993)",
    shiftDurations: ["8-Hour Daily Shift", "12-Hour Shift", "Monthly Retainer"],
    supportedActiveCities: ["bengaluru", "chennai", "hyderabad", "coimbatore"],
    plannedExpansionCities: ["pune", "mysuru"],
    relatedServiceSlugs: ["travel-assistance", "airport-pickup"],
    lastVerificationDate: "2026-10-24",
    internalOwner: "Mobility Operations Lead",
  },
  {
    id: "SVC-008",
    slug: "airport-pickup",
    name: "Airport Meet & Greet Assisted Travel",
    familyId: "fam-travel-mobility-accompaniment",
    category: "travel",
    readiness: "Operational",
    clinicalClassification: "Non-Clinical Accompaniment",
    providerType: "Trained Travel Companion",
    shortDescription: "Terminal arrival meet-and-greet, luggage handling, and safe vehicle handover for elderly parents and solo travelers.",
    fullDescription: "Stationed attendants at Bengaluru, Chennai, Hyderabad, and Coimbatore airports who receive travelers at the arrivals exit gate, assist with baggage trolleys, coordinate with authorized taxis, and accompany passengers until safe home arrival.",
    whoItIsFor: [
      "Seniors arriving on domestic or international flights whose children are stuck at work",
      "First-time air travelers unfamiliar with modern terminal navigation",
    ],
    inclusions: [
      "Arrival gate signage greeting with traveler's name",
      "Luggage trolley assistance and airline wheelchair assisted travel coordination",
      "Live location tracking shared with family until safe destination arrival",
    ],
    exclusions: ["Airside terminal entry beyond customs without airline authority passes"],
    mandatoryPrerequisites: ["Flight number and arrival timing shared 12 hours prior"],
    pricingBasis: "Per Journey / Trip",
    startingPrice: 899,
    pricingType: "Confirmed",
    applicableTax: "18% Statutory GST (SAC 9993)",
    shiftDurations: ["Airport Transit (Up to 4 hours)"],
    supportedActiveCities: ["bengaluru", "chennai", "hyderabad", "coimbatore"],
    plannedExpansionCities: ["kochi"],
    relatedServiceSlugs: ["travel-assistance", "women-drivers"],
    lastVerificationDate: "2026-10-24",
    internalOwner: "Mobility Operations Lead",
  },
  {
    id: "SVC-009",
    slug: "railway-assistance",
    name: "Railway Platform Assistance",
    familyId: "fam-travel-mobility-accompaniment",
    category: "travel",
    readiness: "Operational",
    clinicalClassification: "Non-Clinical Accompaniment",
    providerType: "Trained Travel Companion",
    shortDescription: "Platform assisted travel, coach seating assistance, porter coordination, and safe railway boarding for senior citizens.",
    fullDescription: "Dedicated attendants who meet travelers at station porticos, coordinate licensed railway porters, navigate overbridges/elevators, and ensure the traveler is safely settled in their train compartment with luggage secure.",
    whoItIsFor: [
      "Elderly parents boarding or deboarding major rail junctions (e.g., KSR Bengaluru, Chennai Central, Secunderabad, Coimbatore Junction)",
    ],
    inclusions: [
      "Meeting at station vehicle drop-off area 45 minutes before train departure",
      "Assistance navigating platform elevators, ramps, and foot overbridges",
      "Settling traveler in their reserved berth and verifying ticket with TTE",
    ],
    exclusions: ["Purchasing railway tickets or Tatkal bookings"],
    mandatoryPrerequisites: ["PNR and coach/berth details provided 6 hours prior"],
    pricingBasis: "Per Journey / Trip",
    startingPrice: 699,
    pricingType: "Confirmed",
    applicableTax: "18% Statutory GST (SAC 9993)",
    shiftDurations: ["Railway Platform Transit (Up to 3 hours)"],
    supportedActiveCities: ["bengaluru", "chennai", "hyderabad", "coimbatore"],
    plannedExpansionCities: ["mysuru", "kochi"],
    relatedServiceSlugs: ["travel-assistance", "women-drivers"],
    lastVerificationDate: "2026-10-24",
    internalOwner: "Mobility Operations Lead",
  },

  // --- Family F & G: Family Support, Respite & Lifestyle ---
  {
    id: "SVC-010",
    slug: "lifestyle-support",
    name: "Errand & Lifestyle Accompaniment",
    familyId: "fam-respite-household-support",
    category: "lifestyle",
    readiness: "Operational",
    clinicalClassification: "Non-Clinical Accompaniment",
    providerType: "General Duty Assistant (Attendant)",
    shortDescription: "Accompaniment for clinic visits, pharmacy pickups, bank visits, and social outings with elderly family members.",
    fullDescription: "Empathetic female companions who accompany seniors on routine weekly errands, medical checkups, temple visits, and bank appointments, providing physical arm support and peace of mind.",
    whoItIsFor: [
      "Independent seniors who need steady physical accompaniment while running errands",
    ],
    inclusions: [
      "Door-to-door arm support during walking and vehicle entry/exit",
      "Standing in pharmacy or clinic reception queues on senior's behalf",
      "Immediate phone update to family once errand is completed",
    ],
    exclusions: ["Authorized financial transactions or signing legal documents on senior's behalf"],
    mandatoryPrerequisites: ["Pre-planned itinerary and transport arrangements confirmed"],
    pricingBasis: "Per Day (8-12h Shift)",
    startingPrice: 899,
    pricingType: "Confirmed",
    applicableTax: "18% Statutory GST (SAC 9993)",
    shiftDurations: ["Half-Day (4h)", "Full-Day (8h)"],
    supportedActiveCities: ["bengaluru", "chennai", "hyderabad", "coimbatore"],
    plannedExpansionCities: ["mysuru", "kochi"],
    relatedServiceSlugs: ["elderly-care", "travel-assistance"],
    lastVerificationDate: "2026-10-24",
    internalOwner: "Care Operations Lead",
  },
  {
    id: "SVC-011",
    slug: "security-support",
    name: "Custom Safety & Event Assisted Travel",
    familyId: "fam-specialized-disability-institutional",
    category: "safety",
    readiness: "Operational",
    clinicalClassification: "Non-Clinical Accompaniment",
    providerType: "Trained Travel Companion",
    shortDescription: "Vetted women security companions for residential peace of mind, private transit, and community event assisted travel.",
    fullDescription: "Screened and trained female security companions adhering to PSARA standards. Suitable for solo women returning late from work events, residential security standby, or personal accompaniment during sensitive family situations.",
    whoItIsFor: [
      "Working women commuters seeking vetted late-evening assisted travel",
      "Families hosting private functions requiring female security presence",
    ],
    inclusions: [
      "Vetted female travel companion with background clearance and identity documentation",
      "Continuous observation and SOS escalation protocol to central command center",
    ],
    exclusions: ["Armed private security or law enforcement interventions"],
    mandatoryPrerequisites: ["Event schedule and location safety assessment"],
    pricingBasis: "Per Day (8-12h Shift)",
    startingPrice: 1899,
    pricingType: "Confirmed",
    applicableTax: "18% Statutory GST (SAC 9993)",
    shiftDurations: ["8-Hour Shift", "12-Hour Night Standby"],
    supportedActiveCities: ["bengaluru", "chennai", "hyderabad", "coimbatore"],
    plannedExpansionCities: ["pune"],
    relatedServiceSlugs: ["travel-assistance", "women-drivers"],
    lastVerificationDate: "2026-10-24",
    internalOwner: "Safety & Security Lead",
  },
  {
    id: "SVC-012",
    slug: "care-coordination",
    name: "Dedicated Care Coordination & Remote Family Support",
    familyId: "fam-care-coordination-remote",
    category: "healthcare",
    readiness: "Operational",
    clinicalClassification: "Non-Clinical Accompaniment",
    providerType: "Care Coordinator / Case Manager",
    shortDescription: "Structured care management, daily family WhatsApp summaries, and doctor appointment scheduling for remote families.",
    fullDescription: "Dedicated case management for NRI and out-of-city families needing reliable, structured oversight of elderly parents' health schedules, attendant reporting, and prescription refills.",
    whoItIsFor: [
      "NRIs and out-of-state adult children needing daily objective logs of parent care",
      "Families coordinating multiple home visits across nurses, attendants, and doctors",
    ],
    inclusions: [
      "Dedicated single point of contact regional care coordinator",
      "Scheduled daily WhatsApp care logs and weekly summary reports",
      "Coordination of doctor visits, lab sample pickups, and prescription refills",
    ],
    exclusions: ["Direct clinical decision-making or independent prescription modification"],
    mandatoryPrerequisites: ["Family intake assessment call and authorized emergency contact on record"],
    pricingBasis: "Per Day (8-12h Shift)",
    startingPrice: 499,
    pricingType: "Confirmed",
    applicableTax: "18% Statutory GST (SAC 9993)",
    shiftDurations: ["Monthly Dedicated Coordination", "Weekly Oversight Tier"],
    supportedActiveCities: ["bengaluru", "chennai", "hyderabad", "coimbatore"],
    plannedExpansionCities: ["kochi", "mysuru", "pune", "visakhapatnam"],
    relatedServiceSlugs: ["elderly-care", "hospital-attendants", "nursing-services"],
    lastVerificationDate: "2026-10-24",
    internalOwner: "Care Operations Strategist",
  },
];

// Populate care family service references
CANONICAL_CARE_FAMILIES.forEach((fam) => {
  fam.services = CANONICAL_SERVICES.filter((s) => s.familyId === fam.id);
});

export const getCanonicalServiceBySlug = (slug: string): CanonicalService | undefined => {
  return CANONICAL_SERVICES.find((s) => s.slug === slug);
};

export const getCanonicalServicesByFamily = (familyId: string): CanonicalService[] => {
  return CANONICAL_SERVICES.filter((s) => s.familyId === familyId);
};
