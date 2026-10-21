/**
 * Master Customer Needs & Service Verification Catalog — ApnaCare
 *
 * Implements an evidence-based, safety-governed taxonomy connecting real customer
 * situations and health/care concerns to verified ApnaCare services, professional
 * qualifications, clinical scope boundaries, and escalation protocols.
 *
 * Verification Statuses:
 * - VERIFIED_AVAILABLE: Directly bookable with established rate, SLA and verified workforce.
 * - NEEDS_BUSINESS_CONFIRMATION: Requires custom care desk assessment before confirmation.
 * - PARTNER_OR_REFERRAL_REQUIRED: Out of attendant scope; requires licensed external specialist (e.g., Physiotherapy).
 * - NOT_CURRENTLY_SUPPORTED: Red-flag or medical emergency requiring immediate 108/emergency escalation.
 */

export type VerificationStatus =
  | "VERIFIED_AVAILABLE"
  | "NEEDS_BUSINESS_CONFIRMATION"
  | "PARTNER_OR_REFERRAL_REQUIRED"
  | "NOT_CURRENTLY_SUPPORTED";

export type RecipientCategory =
  | "elderly_parent"
  | "hospital_patient"
  | "clinical_patient"
  | "new_mother"
  | "traveler"
  | "self_care";

export interface CustomerNeed {
  id: string;
  category: RecipientCategory;
  categoryLabel: string;
  label: string;
  situation: string;
  description: string;
  audience: string;
  status: VerificationStatus;
  primaryServiceSlug: string | null;
  serviceName: string | null;
  supportedCities: string[];
  price: number | null;
  billingBasis: "day" | "trip" | "consultation" | null;
  professionalQualification: string;
  inclusions: string[];
  exclusions: string[];
  safetyBoundary: string;
  clinicalNotice?: string;
  bookingPath: string | null;
  whatsappAction: string;
  evidenceBasis: string;
  lastReviewed: string;
}

export const VERIFIED_CITIES = ["Bengaluru", "Chennai", "Hyderabad", "Coimbatore"];

export const NEEDS_CATALOG: CustomerNeed[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // 1. ELDERLY CARE & INDEPENDENT LIVING
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "NEED-ELD-01",
    category: "elderly_parent",
    categoryLabel: "Aging Parent at Home",
    label: "Daily Living, Bathing & Fall Prevention",
    situation: "My elderly parent lives at home and has trouble with bathing, walking safely, and everyday routines.",
    description: "Support for aging seniors who need a steady, compassionate hand for seated baths, walker assistance, meal serving, and fall risk reduction.",
    audience: "Working adult children and families caring for aging parents (65+ years).",
    status: "VERIFIED_AVAILABLE",
    primaryServiceSlug: "elderly-care",
    serviceName: "Elderly Care at Home",
    supportedCities: VERIFIED_CITIES,
    price: 1299,
    billingBasis: "day",
    professionalQualification: "Certified Female General Duty Assistant (GDA) with geriatric ergonomics training.",
    inclusions: [
      "Assisted seated baths, sponge baths, and grooming",
      "Fall prevention and steady support while walking or transferring",
      "Medication timekeeping and daily logging in care register",
      "Nutritious meal heating, tea serving, and hydration prompts",
      "Friendly companionship, reading, and gentle conversation",
    ],
    exclusions: [
      "Invasive medical procedures (no IV lines or catheters)",
      "Independent physician diagnoses or prescription modifications",
      "Heavy domestic deep cleaning or manual laundry",
    ],
    safetyBoundary: "Attendants provide non-clinical personal support. If the senior exhibits acute chest pain, sudden slurred speech, or high fever, the coordinator immediately contacts the family and emergency services.",
    clinicalNotice: "This is a non-clinical supportive care service. Medication is given only as per the doctor's written prescription.",
    bookingPath: "/booking?service=elderly-care",
    whatsappAction: "Inquire about Elderly Care at Home",
    evidenceBasis: "LASI Wave 1 (2020) & NITI Aayog Senior Care Reforms (2024)",
    lastReviewed: "2026-10-21",
  },
  {
    id: "NEED-ELD-02",
    category: "elderly_parent",
    categoryLabel: "Aging Parent at Home",
    label: "Shoulder or Joint Pain with Daily Difficulty",
    situation: "My elderly mother/father has shoulder pain, stiff knees, or joint limitations and struggles to reach, lift, or dress.",
    description: "Personal attendant assistance for daily dressing, grooming, and household tasks while accommodating joint discomfort and stiffness.",
    audience: "Adult children supporting parents experiencing osteoarthritis, frozen shoulder, or post-fall joint stiffness.",
    status: "VERIFIED_AVAILABLE",
    primaryServiceSlug: "elderly-care",
    serviceName: "Elderly Care (Daily Living Support)",
    supportedCities: VERIFIED_CITIES,
    price: 1299,
    billingBasis: "day",
    professionalQualification: "Certified General Duty Assistant (Non-clinical personal care specialist).",
    inclusions: [
      "Assistance with dressing, buttoning, and comb grooming without straining painful joints",
      "Retrieving overhead items and serving meals within easy reach",
      "Accompanying to local orthopaedic or physiotherapy clinic appointments",
      "Gentle warm-compress or ice-pack application strictly as instructed by treating doctor",
    ],
    exclusions: [
      "CANNOT diagnose musculoskeletal conditions or manipulate joints",
      "CANNOT prescribe painkillers, anti-inflammatory ointments, or exercise regimens",
      "DOES NOT replace licensed physiotherapy or orthopaedic consultations",
    ],
    safetyBoundary: "CRITICAL CLINICAL BOUNDARY: Attendants are non-clinical caregivers. Joint pain requires a clinical evaluation by an orthopaedist or licensed physiotherapist. If sudden severe swelling, inability to bear weight, or numbness appears, immediate medical evaluation is required.",
    clinicalNotice: "ApnaCare attendants support daily living around your parent's pain, but do not provide clinical physiotherapy or medical treatment.",
    bookingPath: "/booking?service=elderly-care",
    whatsappAction: "Consult Care Team regarding Joint Care Support",
    evidenceBasis: "MoHFW Geriatric Care Competencies & HSSC Home Health Guidelines",
    lastReviewed: "2026-10-21",
  },
  {
    id: "NEED-ELD-03",
    category: "elderly_parent",
    categoryLabel: "Aging Parent at Home",
    label: "Memory Care, Dementia & Routine Oversight",
    situation: "My parent has memory lapses, early-stage dementia, or wanders if left unattended during the day.",
    description: "Vigilant, patient daytime companion to maintain predictable daily routines, gentle cognitive engagement, and prevent unassisted wandering.",
    audience: "Families balancing demanding careers with safety supervision for parents with cognitive decline.",
    status: "VERIFIED_AVAILABLE",
    primaryServiceSlug: "elderly-care",
    serviceName: "Elderly Care (Memory Companion)",
    supportedCities: VERIFIED_CITIES,
    price: 1299,
    billingBasis: "day",
    professionalQualification: "Experienced Geriatric Attendant trained in patient de-escalation and dementia communication.",
    inclusions: [
      "Continuous calm supervision inside the residence",
      "Structured daily routine: waking, meals, hydration, and resting intervals",
      "Gentle reminiscence activities, photo albums, and calm conversations",
      "Discreet accompaniment to prevent unassisted wandering out of the house",
    ],
    exclusions: [
      "Physical restraints or involuntary confinement",
      "Psychiatric pharmacological adjustments",
      "Management of active severe psychotic agitation without medical oversight",
    ],
    safetyBoundary: "Caregivers do not physically restrain patients. Severe behavioral escalations must be managed by the treating neurologist/psychiatrist.",
    bookingPath: "/booking?service=elderly-care",
    whatsappAction: "Inquire about Dementia & Routine Care",
    evidenceBasis: "Dementia India Report (ARDSI) & WHO Global Action Plan on Dementia",
    lastReviewed: "2026-10-21",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2. HOSPITALIZATION & INPATIENT CONVALESCENCE
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "NEED-HOSP-01",
    category: "hospital_patient",
    categoryLabel: "Hospitalized Loved One",
    label: "Hospital Bedside Vigil (Day / Night Shifts)",
    situation: "A family member is admitted to a hospital ward, and our family cannot stay at the bedside 24/7.",
    description: "Dedicated bedside attendant stationed in the hospital room to assist with personal hygiene, bedpan, linen changes, and calling duty nurses.",
    audience: "Families managing inpatient admissions in private and corporate hospitals across South India.",
    status: "VERIFIED_AVAILABLE",
    primaryServiceSlug: "hospital-attendants",
    serviceName: "Hospital Assistance",
    supportedCities: VERIFIED_CITIES,
    price: 1499,
    billingBasis: "day",
    professionalQualification: "Hospital Ward Care Attendant trained in inpatient hygiene and infection control.",
    inclusions: [
      "Continuous bedside vigilance (12-hour night shift or 24-hour shift)",
      "Assistance with bedpan, urinal bottle, and commode chairs",
      "Gentle repositioning to prevent hospital-acquired bed sores",
      "Summoning duty nurses and doctors when IV alarms ring or patient needs attention",
      "WhatsApp status updates to family members unable to be at the hospital",
    ],
    exclusions: [
      "Adjusting IV infusion lines, oxygen flow meters, or medical monitors",
      "Dispensing injectable hospital medications directly",
      "Replacing registered hospital ward nursing staff",
    ],
    safetyBoundary: "Attendants strictly coordinate with hospital floor staff. All medical changes are handled by the hospital's registered nursing officers.",
    bookingPath: "/booking?service=hospital-attendants",
    whatsappAction: "Request Hospital Bedside Attendant",
    evidenceBasis: "ApnaCare Hospital Operational Guidelines & Hospital Ward Standards",
    lastReviewed: "2026-10-21",
  },
  {
    id: "NEED-HOSP-02",
    category: "hospital_patient",
    categoryLabel: "Hospitalized Loved One",
    label: "Post-Discharge Step-Down Recovery at Home",
    situation: "Patient is being discharged from the hospital after surgery or illness and needs temporary recovery support at home.",
    description: "Transitional home attendant care for the critical 7–30 day post-discharge window, supporting walking, meals, and hygiene.",
    audience: "Families coordinating home arrival after major surgery, fracture fixation, or medical treatment.",
    status: "VERIFIED_AVAILABLE",
    primaryServiceSlug: "hospital-attendants",
    serviceName: "Post-Hospital Home Recovery",
    supportedCities: VERIFIED_CITIES,
    price: 1499,
    billingBasis: "day",
    professionalQualification: "Experienced Convalescence Care Specialist (GDA).",
    inclusions: [
      "Zero-strain transfer techniques between bed, wheelchair, and commode",
      "Discharge prescription adherence and temperature/BP record-keeping",
      "Preparation of soft, recovery-appropriate meals and hydration",
      "Coordination with visiting home physiotherapists or doctors",
    ],
    exclusions: [
      "Surgical drain removal or invasive wound debridement",
      "Emergency acute re-intubation",
    ],
    safetyBoundary: "If post-discharge red flags occur (fever above 101°F, bleeding wound, sudden chest pain), attendant triggers immediate escalation protocol.",
    bookingPath: "/booking?service=hospital-attendants",
    whatsappAction: "Arrange Post-Hospital Home Attendant",
    evidenceBasis: "Post-Discharge Readmission Studies & HSSC Discharge Standards",
    lastReviewed: "2026-10-21",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. CLINICAL NURSING (PHYSICIAN PRESCRIBED)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "NEED-CLIN-01",
    category: "clinical_patient",
    categoryLabel: "Clinical & Post-Op Recovery",
    label: "Sterile Wound Dressing & Catheter Management",
    situation: "Patient has a surgical incision, bed sore, urinary Foley catheter, or Ryle's tube requiring sterile nursing care.",
    description: "State-registered GNM or B.Sc nurse providing sterile, doctor-prescribed nursing procedures in the comfort of your home.",
    audience: "Patients recovering from major operations or chronic conditions with invasive clinical needs.",
    status: "VERIFIED_AVAILABLE",
    primaryServiceSlug: "nursing-services",
    serviceName: "Certified Home Nursing",
    supportedCities: VERIFIED_CITIES,
    price: 1999,
    billingBasis: "day",
    professionalQualification: "State Nursing Council Registered GNM / B.Sc Nurse with verified clinical credentials.",
    inclusions: [
      "Sterile surgical wound dressing and suture inspection",
      "Foley catheter care, bag emptying, and hygienic tube maintenance",
      "Ryle's tube enteral feeding and position verification",
      "Precise recording of clinical vitals (SpO2, Blood Pressure, Pulse, Glucose)",
      "Strict adherence to aseptic protocols and biomedical waste disposal guidance",
    ],
    exclusions: [
      "Prescribing prescription medications independently",
      "Performing surgical procedures or deep debridement without surgeon present",
    ],
    safetyBoundary: "All clinical procedures must be backed by a written doctor's order. The nurse verifies prescription legitimacy before administering any treatment.",
    clinicalNotice: "Please keep your doctor's latest discharge summary and prescription ready for verification.",
    bookingPath: "/booking?service=nursing-services",
    whatsappAction: "Inquire about Certified Home Nursing",
    evidenceBasis: "Indian Nursing Council (INC) Standards & Clinical Establishments Act",
    lastReviewed: "2026-10-21",
  },
  {
    id: "NEED-CLIN-02",
    category: "clinical_patient",
    categoryLabel: "Clinical & Post-Op Recovery",
    label: "Prescribed IV / IM Injections & Infusions",
    situation: "Doctor has prescribed daily IV fluids, antibiotic infusions, or subcutaneous insulin requiring trained nursing administration.",
    description: "Safe, sterile administration of doctor-prescribed injectable medications by certified registered nurses.",
    audience: "Patients on scheduled injectable medication courses under active physician supervision.",
    status: "VERIFIED_AVAILABLE",
    primaryServiceSlug: "nursing-services",
    serviceName: "Home Nursing (Injectables & Infusions)",
    supportedCities: VERIFIED_CITIES,
    price: 1999,
    billingBasis: "day",
    professionalQualification: "Registered Nurse (GNM / B.Sc) with pharmacology administration certification.",
    inclusions: [
      "IV cannulation and maintenance with sterile dressings",
      "Administration of prescribed intravenous, intramuscular, or subcutaneous drugs",
      "Observation for post-injection allergic reactions or adverse events",
      "Clinical documentation of dosage, timing, and patient tolerance",
    ],
    exclusions: [
      "Administration of unprescribed or experimental drugs",
      "Independent dosage alteration without physician authorization",
    ],
    safetyBoundary: "Anaphylaxis protocol: Emergency contact with treating doctor and local hospital is maintained during all infusion sessions.",
    bookingPath: "/booking?service=nursing-services",
    whatsappAction: "Book Clinical Nursing for Injections",
    evidenceBasis: "MoHFW Injectable Safety Guidelines & Hospital stepdown protocols",
    lastReviewed: "2026-10-21",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. MATERNAL & POST-NATAL CARE
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "NEED-MAT-01",
    category: "new_mother",
    categoryLabel: "New Mother & Newborn",
    label: "Postpartum Convalescence & Newborn Japa Support",
    situation: "New mother recovering from delivery/C-section experiencing severe exhaustion, and needs experienced newborn handling.",
    description: "Compassionate, traditional postpartum attendant supporting herbal oil baby massage, warm baths, colic soothing, and maternal rest.",
    audience: "First-time mothers and nuclear families seeking experienced guidance during the first 0–90 days.",
    status: "VERIFIED_AVAILABLE",
    primaryServiceSlug: "post-natal-care",
    serviceName: "Post-Natal Maternal Care",
    supportedCities: VERIFIED_CITIES,
    price: 1999,
    billingBasis: "day",
    professionalQualification: "Certified Post-Natal & Infant Care Specialist with newborn hygiene credentials.",
    inclusions: [
      "Traditional gentle mustard/sesame oil baby massage and warm sponge bath",
      "Infant soothing, burping techniques, and diaper hygiene maintenance",
      "Post-cesarean recovery support and herbal warm water preparation for mother",
      "Enabling the mother to get 4–6 hours of uninterrupted healing sleep",
    ],
    exclusions: [
      "Pediatric clinical diagnosis or jaundice phototherapy",
      "Independent medication of newborn infants",
    ],
    safetyBoundary: "Attendant adheres strictly to safe sleep practices (baby on back, firm mattress, zero loose bedding). Any signs of high neonatal fever or lethargy are escalated to the pediatrician immediately.",
    bookingPath: "/booking?service=post-natal-care",
    whatsappAction: "Inquire about Post-Natal Maternal Care",
    evidenceBasis: "NFHS-5 Urban Maternal Postpartum Data & WHO Postnatal Care Guidelines",
    lastReviewed: "2026-10-21",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 5. ASSISTED TRAVEL & TRANSIT
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "NEED-TRV-01",
    category: "traveler",
    categoryLabel: "Assisted Travel & Commute",
    label: "Railway Station Boarding & Wheelchair Escort",
    situation: "Elderly parent or mobility-restricted family member traveling by train through crowded railway stations.",
    description: "Dedicated platform escort to meet family at drop-off, navigate foot-over-bridges, arrange wheelchair/porter, and settle senior safely into coach.",
    audience: "Families with seniors traveling via major South Indian railway junctions (Majestic, Chennai Central, Secunderabad, etc.).",
    status: "VERIFIED_AVAILABLE",
    primaryServiceSlug: "railway-assistance",
    serviceName: "Railway Station Assistance",
    supportedCities: VERIFIED_CITIES,
    price: 899,
    billingBasis: "trip",
    professionalQualification: "Verified Transit Safety Escort with station navigation training.",
    inclusions: [
      "Curbside station reception 60 minutes prior to train departure",
      "Station wheelchair push or escort across ramps and foot-over-bridges",
      "Porter coordination and luggage transfer to coach",
      "Assistance boarding coach stairs and verifying berth allocation",
      "Live WhatsApp confirmation to family once train departs",
    ],
    exclusions: [
      "Purchasing train tickets or unauthorized seat upgrades",
      "Traveling on the train beyond the platform boarding",
    ],
    safetyBoundary: "Escort remains on platform until train departs. Does not carry unverified parcels.",
    bookingPath: "/booking?service=railway-assistance",
    whatsappAction: "Book Railway Station Assistance",
    evidenceBasis: "ApnaCare Transit Protocol & Indian Railways Accessibility Guidelines",
    lastReviewed: "2026-10-21",
  },
  {
    id: "NEED-TRV-02",
    category: "traveler",
    categoryLabel: "Assisted Travel & Commute",
    label: "Airport Curbside-to-Gate Escort",
    situation: "Senior citizen, first-time flyer, or unaccompanied traveler navigating large airport terminals.",
    description: "Meet-and-greet curbside service, airline check-in accompaniment, security queue escort, and wheelchair guidance directly to boarding gate.",
    audience: "NRIs and working professionals arranging safe air travel for parents departing or arriving in Bengaluru, Chennai, or Hyderabad.",
    status: "VERIFIED_AVAILABLE",
    primaryServiceSlug: "airport-pickup",
    serviceName: "Airport Assistance",
    supportedCities: VERIFIED_CITIES,
    price: 999,
    billingBasis: "trip",
    professionalQualification: "Airport Hospitality & Transit Escort with airline protocol familiarity.",
    inclusions: [
      "Curbside meet-and-greet at departure terminal entrance",
      "Assistance with airline check-in counters and baggage tagging",
      "Escorting through CISF security gates and guiding to departure gate",
      "Arranging airline wheelchair transfers where requested",
    ],
    exclusions: [
      "Accessing restricted airside customs zones without passenger ticket",
      "Immigration authority representation",
    ],
    safetyBoundary: "Escort coordinates with official airline passenger assistance officers.",
    bookingPath: "/booking?service=airport-pickup",
    whatsappAction: "Inquire about Airport Assistance",
    evidenceBasis: "DGCA Passenger Facilitation Guidelines & Airport Operations",
    lastReviewed: "2026-10-21",
  },
  {
    id: "NEED-TRV-03",
    category: "traveler",
    categoryLabel: "Assisted Travel & Commute",
    label: "Safe Daily Commute with Verified Woman Chauffeur",
    situation: "Seeking a verified, professional woman driver for daily office commute, children's school transit, or senior hospital trips.",
    description: "Commercial-licensed, police-vetted woman driver providing punctual, defensive driving for personal vehicles or arranged cars.",
    audience: "Women professionals, families with teenage daughters, and elderly individuals requiring dependable drivers.",
    status: "VERIFIED_AVAILABLE",
    primaryServiceSlug: "women-drivers",
    serviceName: "Women Drivers & Chauffeurs",
    supportedCities: VERIFIED_CITIES,
    price: 1199,
    billingBasis: "day",
    professionalQualification: "Commercial Licensed Woman Chauffeur with verified background and defensive driving certification.",
    inclusions: [
      "Punctual chauffeuring in customer vehicle or designated car",
      "Pre-trip vehicle safety check (tire pressure, fuel, mirrors)",
      "Courteous, safe, defensive driving adhering to traffic regulations",
      "Assisting elderly passengers in and out of vehicle with bags",
    ],
    exclusions: [
      "Mechanical engine repairs",
      "Hazardous night driving beyond agreed contractual hours",
    ],
    safetyBoundary: "Zero alcohol tolerance, speed limiter compliance, and SOS integration.",
    bookingPath: "/booking?service=women-drivers",
    whatsappAction: "Book a Verified Woman Driver",
    evidenceBasis: "Ministry of Road Transport & Highways Commercial Driving Regulations",
    lastReviewed: "2026-10-21",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 6. SPECIALIZED / PARTNER REFERRALS & SAFETY ESCALATIONS
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "NEED-SPEC-PHYSIO",
    category: "clinical_patient",
    categoryLabel: "Clinical & Post-Op Recovery",
    label: "In-Home Physiotherapy & Rehabilitation Assessment",
    situation: "Patient needs post-stroke rehabilitation, joint mobilization, or formal physiotherapy sessions at home.",
    description: "ApnaCare attendants support daily mobility, but formal musculoskeletal rehabilitation requires a licensed BPT/MPT Physiotherapist.",
    audience: "Patients recovering from stroke, hip fractures, or chronic neuro-muscular conditions.",
    status: "PARTNER_OR_REFERRAL_REQUIRED",
    primaryServiceSlug: null,
    serviceName: "Licensed Physiotherapy (Partner Referral)",
    supportedCities: VERIFIED_CITIES,
    price: null,
    billingBasis: "consultation",
    professionalQualification: "Licensed Physiotherapist (BPT / MPT) with rehabilitation registry.",
    inclusions: [
      "Initial clinical assessment of range of motion and functional impairment",
      "Design of patient-specific exercise rehabilitation plan",
      "Training ApnaCare daily attendant on safe assisting techniques",
    ],
    exclusions: [
      "Unsupervised joint manipulation by non-physiotherapists",
    ],
    safetyBoundary: "CRITICAL SCOPE LIMITATION: ApnaCare General Duty Assistants do NOT deliver physiotherapy treatment. We can coordinate with your hospital's physiotherapist or refer to verified licensed partners.",
    clinicalNotice: "This service requires an evaluation by a licensed Physiotherapist. ApnaCare attendants assist with daily routines under their guidance.",
    bookingPath: null,
    whatsappAction: "Request Licensed Physiotherapist Referral",
    evidenceBasis: "Indian Association of Physiotherapists (IAP) Scope Guidelines",
    lastReviewed: "2026-10-21",
  },
  {
    id: "NEED-SPEC-EMERGENCY",
    category: "clinical_patient",
    categoryLabel: "Clinical & Post-Op Recovery",
    label: "Acute Chest Pain, Breathlessness or Sudden Neurological Deficit",
    situation: "Patient is experiencing sudden chest pressure, acute difficulty breathing, loss of consciousness, or slurred facial paralysis.",
    description: "MEDICAL EMERGENCY: Home care attendants and nurses cannot manage acute life-threatening emergencies. Immediate emergency ambulance transfer is required.",
    audience: "Any individual exhibiting emergency red-flag symptoms.",
    status: "NOT_CURRENTLY_SUPPORTED",
    primaryServiceSlug: null,
    serviceName: "Emergency Hospital Transfer (Call 108)",
    supportedCities: VERIFIED_CITIES,
    price: null,
    billingBasis: null,
    professionalQualification: "Emergency Medical Services (EMS) / ACLS Certified Paramedics.",
    inclusions: [
      "Immediate guidance to dial 108 or local emergency ambulance",
      "Immediate coordination with the closest tertiary hospital emergency room",
    ],
    exclusions: [
      "Home-based stabilization of acute cardiac arrest or massive stroke",
    ],
    safetyBoundary: "RED FLAG PROTOCOL: Do NOT book an attendant. Dial 108 or proceed immediately to the nearest Emergency Department. ApnaCare care coordinators will halt attendant dispatch in favor of emergency medical response.",
    clinicalNotice: "DO NOT WAIT: Call 108 immediately. ApnaCare does not provide emergency cardiac or stroke resuscitation at home.",
    bookingPath: null,
    whatsappAction: "Emergency Guidance Hotline",
    evidenceBasis: "National Emergency Life Support (NELS) Protocols & MoHFW",
    lastReviewed: "2026-10-21",
  },
];

/**
 * Filter needs catalog based on recipient category and optional city.
 */
export function filterNeedsCatalog(
  category?: RecipientCategory | "all",
  city?: string
): CustomerNeed[] {
  return NEEDS_CATALOG.filter((need) => {
    const matchesCategory = !category || category === "all" || need.category === category;
    const matchesCity = !city || need.supportedCities.some((c) => c.toLowerCase() === city.toLowerCase());
    return matchesCategory && matchesCity;
  });
}

/**
 * Get a specific need by ID.
 */
export function getCustomerNeed(id: string): CustomerNeed | undefined {
  return NEEDS_CATALOG.find((need) => need.id === id);
}
