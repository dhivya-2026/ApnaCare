/**
 * ApnaCare Complete Care-Needs Taxonomy
 * ───────────────────────────────────────
 * Structured, expandable catalogue featuring 12 Primary Categories of Care,
 * Subcategories, Individual Selectable Tasks, Clinical Scope Classifications,
 * Contextual Situation Questions, and Capability Requirements.
 */

export type ClinicalClassification = "NON_CLINICAL" | "CLINICAL_NURSING" | "SPECIALIST_REHAB" | "TRANSIT_MOBILITY" | "COORDINATION";

export type ProfessionalRoleRequired =
  | "Saha Care Companion"
  | "Registered Nurse (GNM/B.Sc)"
  | "Physiotherapist / Specialist Therapist"
  | "Licensed Woman Chauffeuse / Transit Companion"
  | "Care Coordinator Desk";

export interface CareTask {
  id: string;
  name: string;
  description: string;
  clinicalClassification: ClinicalClassification;
  requiredRole: ProfessionalRoleRequired;
  requiresDoctorPrescription?: boolean;
  requiresAssessment?: boolean;
  pricingTag?: string; // e.g. "Included in Saha Shift", "Clinical Procedure Rate", "Trip-based"
}

export interface CareSubcategory {
  id: string;
  name: string;
  description: string;
  tasks: CareTask[];
}

export interface ContextualQuestionOption {
  id: string;
  label: string;
  recommendedTag?: string;
}

export interface ContextualQuestion {
  id: string;
  question: string;
  helpText?: string;
  options: ContextualQuestionOption[];
  isMultiSelect?: boolean;
}

export interface CareCategory {
  id: string;
  categoryNumber: number;
  name: string;
  tagline: string;
  iconName: string;
  color: string;
  subcategories: CareSubcategory[];
  contextualQuestions: ContextualQuestion[];
  isClinical: boolean;
  defaultServiceSlug: string;
}

export const CARE_CATEGORIES: CareCategory[] = [
  // ─────────────────────────────────────────────────────────────
  // 01: ASSISTIVE MOBILITY & PHYSICAL MOVEMENT
  // ─────────────────────────────────────────────────────────────
  {
    id: "cat-mobility",
    categoryNumber: 1,
    name: "Assistive Mobility & Physical Movement",
    tagline: "Walking support, bed transfers, wheelchair accompaniment & fall prevention",
    iconName: "Activity",
    color: "emerald",
    isClinical: false,
    defaultServiceSlug: "elderly-care",
    contextualQuestions: [
      {
        id: "mobility_independence",
        question: "How independently can your loved one move at home?",
        helpText: "Helps us assign a Saha with the right physical transfer experience",
        options: [
          { id: "walks_independently", label: "Walks independently, needs watchful presence" },
          { id: "needs_stick_walker", label: "Uses walking stick or walker with guidance" },
          { id: "needs_full_transfer_support", label: "Needs active support for standing & transfers" },
          { id: "mostly_bedbound", label: "Mostly bedbound, requires turning & gentle repositioning" },
        ],
      },
      {
        id: "mobility_equipment",
        question: "What mobility equipment is currently used?",
        isMultiSelect: true,
        options: [
          { id: "eq_walker", label: "Four-wheel or standard walker" },
          { id: "eq_wheelchair", label: "Wheelchair (manual or electric)" },
          { id: "eq_stick", label: "Walking stick / cane" },
          { id: "eq_bedrail", label: "Hospital bed / side safety rails" },
          { id: "eq_none", label: "No equipment" },
        ],
      },
    ],
    subcategories: [
      {
        id: "sub-walking",
        name: "Walking Assistance",
        description: "Assisted walking indoors and outdoors with balance guard",
        tasks: [
          { id: "task-walk-indoor", name: "Indoor walking assistance", description: "Guided walking within the home to living room, dining, and restroom", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-walk-outdoor", name: "Outdoor walking assistance", description: "Veranda, garden, and apartment compound walking supervision", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-walk-supervision", name: "Walking supervision", description: "Watchful pacing behind elder to avoid trips and loss of balance", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-walk-stick", name: "Assistance using walking sticks", description: "Ensuring proper tripod/quad-cane placement and posture", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-walk-walker", name: "Assistance using walkers", description: "Steering and stabilization with folding or wheeled walkers", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-transfers",
        name: "Transfers & Weight Shifts",
        description: "Safe ergonomic transfers between bed, chair, and restroom",
        tasks: [
          { id: "task-transfer-bed-chair", name: "Bed-to-chair transfers", description: "Gentle pivoting transfer from cot edge to comfortable armchair", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-transfer-chair-wheelchair", name: "Chair-to-wheelchair transfers", description: "Locking brakes, swing-away footrests, and transfer guide", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-transfer-sit-stand", name: "Sitting-to-standing assistance", description: "Support during rising from dining chair, sofa, or bed", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-transfer-bathroom", name: "Bathroom transfers", description: "Careful guidance onto commode chair or shower bench", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-transfer-rooms", name: "Assisted movement between rooms", description: "Guiding elder safely from bedroom to dining or balcony", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-wheelchair",
        name: "Wheelchair Assistance",
        description: "Indoor navigation, ramps, thresholds, and outdoor accompaniment",
        tasks: [
          { id: "task-wc-indoor", name: "Indoor wheelchair movement", description: "Maneuvering corridors, door frames, and bedroom spaces safely", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-wc-outdoor", name: "Outdoor wheelchair assistance", description: "Navigating apartment ramps, footpaths, and garden trails", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-wc-entry-exit", name: "Wheelchair entry and exit", description: "Assisting safely into and out of vehicles or seating areas", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-wc-public", name: "Accompaniment in public spaces", description: "Wheelchair escort in temples, hospitals, parks, and malls", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-bed-mobility",
        name: "Bed Mobility & Pressure Relief",
        description: "Repositioning, side turning, and gentle elevation in bed",
        tasks: [
          { id: "task-bed-reposition", name: "Repositioning", description: "Adjusting pillows, backrests, and limb alignment for comfort", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-bed-turning", name: "Turning assistance", description: "Scheduled two-hourly side-to-side turning to prevent pressure sores", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-bed-sitting-up", name: "Sitting up", description: "Supporting elder from supine to upright sitting position for meals", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-bed-in-out", name: "Getting in and out of bed", description: "Assisting elder legs off the mattress and steadying feet on the floor", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-stairs",
        name: "Stair Assistance",
        description: "Step-by-step guidance on independent home stairs and thresholds",
        tasks: [
          { id: "task-stair-climb", name: "Stair climbing assistance", description: "Firm hand-under-arm support during ascent", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-stair-descent", name: "Stair descent assistance", description: "Steadying footsteps down steps with watchful pacing", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-stair-handrail", name: "Handrail support", description: "Guiding elder hand along the rail while carrying personal cane", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-fall-prevention",
        name: "Fall Prevention",
        description: "Proactive hazard identification and movement safety routines",
        tasks: [
          { id: "task-fall-supervision", name: "Mobility supervision", description: "Vigilant standby during high-risk moments (night visits, wet tiles)", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-fall-hazards", name: "Identifying home mobility hazards", description: "Pointing out loose rugs, slippery bathroom spots, and clutter", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-fall-routines", name: "Safe movement routines", description: "Encouraging pause-before-standing to counter postural dizziness", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-exercise",
        name: "Exercise Assistance",
        description: "Accompanying doctor/physio prescribed daily walking and mobility drills",
        tasks: [
          { id: "task-ex-prescribed", name: "Accompanying prescribed exercises", description: "Gentle encouragement during passive range-of-motion drills", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-ex-walking-routine", name: "Walking routines", description: "Morning or evening paced walks according to physician guidance", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-ex-reminders", name: "Movement reminders", description: "Prompting ankle pumps and deep breathing after prolonged rest", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 02: ASSISTED TRANSIT, PICK-UP & DROP
  // ─────────────────────────────────────────────────────────────
  {
    id: "cat-transit",
    categoryNumber: 2,
    name: "Assisted Transit, Pick-Up & Drop",
    tagline: "Hospital appointments, airport transfers, railway assistance & outstation travel",
    iconName: "Car",
    color: "amber",
    isClinical: false,
    defaultServiceSlug: "women-drivers",
    contextualQuestions: [
      {
        id: "transit_journey_type",
        question: "What kind of transit journey is required?",
        options: [
          { id: "local_hospital", label: "Local hospital, scan or doctor appointment" },
          { id: "airport_railway", label: "Airport or Railway station meet & assist" },
          { id: "errand_shopping", label: "Personal errands, bank, temple, or shopping" },
          { id: "outstation_intercity", label: "Intercity or outstation journey" },
        ],
      },
      {
        id: "transit_staffing_type",
        question: "Do you need a driver, a companion, or both?",
        options: [
          { id: "driver_plus_companion", label: "Driver + Care Companion (recommended for seniors needing assistance inside venues)" },
          { id: "chauffeuse_only", label: "Licensed Woman Chauffeuse only (traveler moves independently)" },
          { id: "companion_only", label: "Companion only (family has own car / cab arranged)" },
        ],
      },
      {
        id: "transit_trip_pattern",
        question: "Is this a one-way trip or round trip with waiting time?",
        options: [
          { id: "round_trip_wait", label: "Round trip with waiting time (e.g. 2–4 hours at clinic)" },
          { id: "one_way_drop", label: "One-way drop off" },
          { id: "one_way_pickup", label: "One-way pick up & safe arrival home" },
        ],
      },
    ],
    subcategories: [
      {
        id: "sub-hospital-transit",
        name: "Hospital Transportation",
        description: "Safe door-to-door transit to OPDs, day cares, and discharge",
        tasks: [
          { id: "task-trans-home-hosp", name: "Home-to-hospital", description: "Punctual pick-up, vehicle door assistance, and hospital porch arrival", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-trans-hosp-home", name: "Hospital-to-home", description: "Post-discharge or post-dialysis gentle vehicle ride back home", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-trans-appointment", name: "Appointment transportation", description: "Dedicated vehicle with waiting time during doctor consultation", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-trans-recurring-hosp", name: "Recurring hospital visits", description: "Scheduled multi-day visits (chemotherapy, radiation, dialysis cycles)", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
        ],
      },
      {
        id: "sub-diag-transit",
        name: "Diagnostic & Lab Visits",
        description: "Accompanied trips to scanning centers and diagnostic labs",
        tasks: [
          { id: "task-diag-lab", name: "Laboratory visits", description: "Morning fasting blood sample collection accompaniment", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-diag-scans", name: "Scan and imaging visits", description: "Transit to MRI, CT scan, or ultrasound facilities with waiting support", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-diag-centre-acc", name: "Diagnostic centre accompaniment", description: "Holding tokens, managing waiting rooms, and collecting tokens", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
        ],
      },
      {
        id: "sub-local-transit",
        name: "Local Transportation & Errands",
        description: "Neighborhood errands, bank tasks, pharmacy, and grocery trips",
        tasks: [
          { id: "task-local-pharmacy", name: "Pharmacy visits", description: "Pick-up and drop for medicine purchases with prescription matching", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-local-grocery", name: "Grocery visits", description: "Accompanied grocery shopping with gentle trolley and basket support", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-local-shopping", name: "Shopping", description: "Comfortable transport for apparel, footwear, or household purchases", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-local-bank", name: "Bank visits", description: "Escorted visit to bank branch for pension or signature formalities", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-local-errands", name: "Personal errands", description: "Utility bill settlements, post office, or government office tasks", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
        ],
      },
      {
        id: "sub-airport",
        name: "Airport Assistance",
        description: "Terminal accompaniment, check-in navigation, baggage guidance",
        tasks: [
          { id: "task-air-pickup", name: "Airport pick-up", description: "Paging at arrival gate, baggage trolley handling, and safe drive home", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-air-drop", name: "Airport drop", description: "Timely departure drop at correct terminal gate with luggage unloading", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-air-terminal-acc", name: "Terminal accompaniment", description: "Assisting through airline check-in counter and wheelchair request desk", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-air-checkin", name: "Check-in assistance", description: "Guiding senior with boarding pass printing, Aadhaar verification, and luggage tags", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-air-arrival", name: "Arrival assistance", description: "Coordinating with terminal buggy service and WhatsApp updates to family", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
        ],
      },
      {
        id: "sub-railway",
        name: "Railway Assistance",
        description: "Platform escorts, coolie coordination, and compartment boarding",
        tasks: [
          { id: "task-rail-pickup-drop", name: "Station pick-up and drop", description: "Pick-up / drop at major railway terminus (Bengaluru City, Chennai Central, Secunderabad, Coimbatore)", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-rail-platform", name: "Platform accompaniment", description: "Escorting across foot overbridges, escalators, and crowded platforms", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-rail-boarding", name: "Boarding assistance", description: "Assisting elder into compartment, settling luggage under berth, and confirming seat", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-rail-arrival", name: "Arrival assistance", description: "Meeting train at coach door upon deboarding and escorting to vehicle", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
        ],
      },
      {
        id: "sub-intercity",
        name: "Intercity & Outstation Travel",
        description: "Long-distance road travel across South Indian states",
        tasks: [
          { id: "task-ic-outstation", name: "Outstation travel", description: "Intercity highways (e.g. Bengaluru–Mysuru, Chennai–Puducherry, Hyderabad–Warangal)", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-ic-longdist", name: "Long-distance accompaniment", description: "Caregiver sitting beside elder during long drives to monitor hydration and stops", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Saha Care Companion" },
          { id: "task-ic-multistop", name: "Multi-stop journeys", description: "Itineraries with multiple halts for rest, temple visits, and meals", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
        ],
      },
      {
        id: "sub-social-outings",
        name: "Social and Personal Outings",
        description: "Family celebrations, marriages, religious visits, and functions",
        tasks: [
          { id: "task-soc-family", name: "Family functions", description: "Assisting senior throughout weddings, upanayanams, and anniversaries", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-soc-religious", name: "Religious visits", description: "Temple, church, or mosque accompaniment with pradakshina and seating support", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-soc-community", name: "Community events", description: "Music sabhas, club gatherings, and pensioner association meetings", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-soc-personal", name: "Personal appointments", description: "Auditor, lawyer, property registration, or family lunch accompaniment", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 03: EVERYDAY PERSONAL ASSISTANCE & DAILY LIVING
  // ─────────────────────────────────────────────────────────────
  {
    id: "cat-daily-living",
    categoryNumber: 3,
    name: "Everyday Personal Assistance & Daily Living",
    tagline: "Bathing, hygiene, dressing, meal support, daily routines & medication reminders",
    iconName: "Heart",
    color: "emerald",
    isClinical: false,
    defaultServiceSlug: "elderly-care",
    contextualQuestions: [
      {
        id: "daily_care_scope",
        question: "Which times of day require the most assistance?",
        options: [
          { id: "morning_routine", label: "Morning routine (bathing, hygiene, breakfast & medicine)" },
          { id: "daytime_assistance", label: "Full day support (morning through evening, 8–12 hours)" },
          { id: "night_bedtime", label: "Evening & overnight support (dinner, bedtime & night wakefulness)" },
          { id: "round_the_clock", label: "24-hour continuous live-in / day-night support" },
        ],
      },
    ],
    subcategories: [
      {
        id: "sub-hygiene",
        name: "Personal Hygiene",
        description: "Dignified bathing, sponge baths, hair care, and oral hygiene",
        tasks: [
          { id: "task-hyg-bathing", name: "Bathing assistance", description: "Assisted warm bath with anti-slip mats and gentle drying", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-hyg-sponge", name: "Sponge bath", description: "Bedside sponge bath for post-op, bedbound, or frail seniors", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-hyg-shower", name: "Shower supervision", description: "Standing by during independent shower to prevent slips and falls", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-hyg-oral", name: "Oral hygiene", description: "Toothbrushing assistance, denture rinsing, and mouthwash accompaniment", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-hyg-grooming", name: "Grooming", description: "Face washing, skin moisturization, comb through hair, and nail filing", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-hyg-hair", name: "Hair care", description: "Gentle hair oiling, combing, and hair washing accompaniment", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-dressing",
        name: "Dressing Assistance",
        description: "Choosing comfortable attire, buttons, dhotis, sarees, and footwear",
        tasks: [
          { id: "task-dress-clothing", name: "Dressing assistance", description: "Helping slip into fresh, loose cotton home clothes or nightwear", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-dress-changing", name: "Changing clothes", description: "Assisting with fresh clothes change after bath or sweat", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-dress-footwear", name: "Footwear assistance", description: "Helping put on anti-skid slippers, socks, or orthotic shoes", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-toileting",
        name: "Toileting & Continence Care",
        description: "Bathroom escort, commode transfers, and discreet diaper changes",
        tasks: [
          { id: "task-toilet-assist", name: "Bathroom assistance", description: "Guiding to toilet, clothing adjustment, and cleansing assistance", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-toilet-transfer", name: "Toilet transfers", description: "Supporting rise and sit on western commode with grab bar assistance", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-toilet-continence", name: "Continence-related personal assistance", description: "Discreet adult diaper changing, barrier cream application & linen freshness", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-meals",
        name: "Meals & Nutrition Support",
        description: "Serving warm home meals, feeding assistance, and hydration checks",
        tasks: [
          { id: "task-meal-serving", name: "Meal serving", description: "Serving hot vegetarian or customized meals at scheduled hours", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-meal-eating", name: "Eating assistance", description: "Assisting with eating utensils, cutting fruits, and encouragement", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-meal-feeding", name: "Feeding support", description: "Slow, patient spoon feeding for elders with tremors or post-stroke fatigue", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-meal-hydration", name: "Hydration reminders", description: "Regular water, buttermilk, tender coconut, and herbal soup reminders", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-meal-prep", name: "Meal preparation", description: "Warming meals, preparing kanji, porridge, or tea/coffee for recipient", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-routines",
        name: "Daily & Evening Routines",
        description: "Consistent schedule rhythm bringing stability and reassurance",
        tasks: [
          { id: "task-rtn-morning", name: "Morning routine", description: "Waking assistance, warm water, newspaper, and bath preparation", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-rtn-evening", name: "Evening routine", description: "Evening tea, veranda seating, puja lamp lighting assistance", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-rtn-bedtime", name: "Bedtime routine", description: "Nightwear change, warm foot wash, tucking in, and night lamp check", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-rtn-reminders", name: "Personal schedule reminders", description: "Reminding about doctor calls, favorite TV programmes, and family calls", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-med-routines",
        name: "Oral Medication Reminders",
        description: "Prescription schedule adherence (non-clinical prompt and logging)",
        tasks: [
          { id: "task-med-remind", name: "Medication reminders", description: "Checking prescription box and prompting exact dosage at doctor-prescribed times", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-med-schedule", name: "Prescription schedule reminders", description: "Maintaining pill organizers and logging timings in daily WhatsApp report", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-personal-org",
        name: "Personal Organisation",
        description: "Keeping recipient wardrobe and daily essentials organized and within reach",
        tasks: [
          { id: "task-org-clothing", name: "Clothing organisation", description: "Arranging folded clothes, towels, and innerwear neatly in wardrobe", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-org-belongings", name: "Personal belongings", description: "Keeping spectacles, walking stick, hearing aids, and books within easy reach", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-org-essentials", name: "Daily essentials", description: "Ensuring drinking flask, tissues, bell, and phone charger are accessible", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 04: ASSISTIVE MEDICAL CARE & PROFESSIONAL NURSING
  // ─────────────────────────────────────────────────────────────
  {
    id: "cat-nursing",
    categoryNumber: 4,
    name: "Assistive Medical Care & Professional Nursing",
    tagline: "Prescribed injections, sterile dressings, catheters, vitals charting & post-op nursing",
    iconName: "Stethoscope",
    color: "sky",
    isClinical: true,
    defaultServiceSlug: "nursing-services",
    contextualQuestions: [
      {
        id: "nursing_prescription",
        question: "Is there an active doctor prescription for the medical procedure?",
        helpText: "Registered nurses strictly administer clinical procedures under written prescription",
        options: [
          { id: "rx_yes_available", label: "Yes, written prescription available" },
          { id: "rx_hospital_discharge", label: "Yes, specified in hospital discharge summary" },
          { id: "rx_pending_consult", label: "Consultation pending, need coordinator assessment" },
        ],
      },
      {
        id: "nursing_frequency",
        question: "How frequently is nursing assistance required?",
        options: [
          { id: "single_procedure_visit", label: "Single visit (e.g. injection or dressing change)" },
          { id: "recurring_daily_visit", label: "Scheduled daily visits (1–2 visits/day for vitals & meds)" },
          { id: "day_night_shifts", label: "Continuous 12h/24h nursing shifts for intensive clinical care" },
        ],
      },
    ],
    subcategories: [
      {
        id: "sub-nursing-visits",
        name: "Nursing Shifts & Visits",
        description: "Home visits and dedicated shifts by licensed GNM / B.Sc nurses",
        tasks: [
          { id: "task-nurse-scheduled-visit", name: "Scheduled nursing visits", description: "Short focused clinical visits for specific injections or monitoring", clinicalClassification: "CLINICAL_NURSING", requiredRole: "Registered Nurse (GNM/B.Sc)", requiresDoctorPrescription: true },
          { id: "task-nurse-recurring-visit", name: "Recurring nursing visits", description: "Daily or alternate-day clinical visits under continuing treatment plan", clinicalClassification: "CLINICAL_NURSING", requiredRole: "Registered Nurse (GNM/B.Sc)", requiresDoctorPrescription: true },
          { id: "task-nurse-day-shift", name: "Day nursing shifts", description: "12-hour daytime clinical monitoring, IV infusions, and post-op care", clinicalClassification: "CLINICAL_NURSING", requiredRole: "Registered Nurse (GNM/B.Sc)", requiresDoctorPrescription: true },
          { id: "task-nurse-night-shift", name: "Night nursing shifts", description: "12-hour overnight clinical vigil for unstable vitals or tracheostomy", clinicalClassification: "CLINICAL_NURSING", requiredRole: "Registered Nurse (GNM/B.Sc)", requiresDoctorPrescription: true },
        ],
      },
      {
        id: "sub-clinical-procedures",
        name: "Clinical Procedures",
        description: "Sterile procedures performed strictly under medical prescription",
        tasks: [
          { id: "task-proc-injections", name: "Prescribed injections", description: "Subcutaneous or intramuscular injection administration (e.g. insulin, antibiotics)", clinicalClassification: "CLINICAL_NURSING", requiredRole: "Registered Nurse (GNM/B.Sc)", requiresDoctorPrescription: true },
          { id: "task-proc-insulin", name: "Prescribed insulin administration", description: "Sliding-scale blood glucose check and accurate insulin dosage injection", clinicalClassification: "CLINICAL_NURSING", requiredRole: "Registered Nurse (GNM/B.Sc)", requiresDoctorPrescription: true },
          { id: "task-proc-wound", name: "Wound dressing", description: "Aseptic surgical dressing, diabetic ulcer dressing, and bedsore management", clinicalClassification: "CLINICAL_NURSING", requiredRole: "Registered Nurse (GNM/B.Sc)", requiresDoctorPrescription: true },
          { id: "task-proc-catheter", name: "Catheter care", description: "Foley's catheter monitoring, bag emptying, hygiene, and sterile flush/replacement", clinicalClassification: "CLINICAL_NURSING", requiredRole: "Registered Nurse (GNM/B.Sc)", requiresDoctorPrescription: true },
          { id: "task-proc-feeding-tube", name: "Feeding tube care", description: "Ryle's tube / PEG tube formula administration and position verification", clinicalClassification: "CLINICAL_NURSING", requiredRole: "Registered Nurse (GNM/B.Sc)", requiresDoctorPrescription: true },
        ],
      },
      {
        id: "sub-clinical-monitoring",
        name: "Clinical Vitals Monitoring",
        description: "Objective vital signs charting and medical trend documentation",
        tasks: [
          { id: "task-mon-bp", name: "Blood pressure monitoring", description: "Standardized manual or digital sphygmomanometer readings and charting", clinicalClassification: "CLINICAL_NURSING", requiredRole: "Registered Nurse (GNM/B.Sc)" },
          { id: "task-mon-glucose", name: "Blood glucose monitoring", description: "Fasting, post-prandial, and random glucometer checks logged for physician review", clinicalClassification: "CLINICAL_NURSING", requiredRole: "Registered Nurse (GNM/B.Sc)" },
          { id: "task-mon-pulse", name: "Pulse monitoring", description: "Radial pulse rhythm, rate, and regular cardiac beats charting", clinicalClassification: "CLINICAL_NURSING", requiredRole: "Registered Nurse (GNM/B.Sc)" },
          { id: "task-mon-temp", name: "Temperature monitoring", description: "Digital thermometry and fever curve documentation", clinicalClassification: "CLINICAL_NURSING", requiredRole: "Registered Nurse (GNM/B.Sc)" },
          { id: "task-mon-spo2", name: "Oxygen saturation monitoring", description: "Pulse oximetry saturation (SpO2) checks at rest and post-effort", clinicalClassification: "CLINICAL_NURSING", requiredRole: "Registered Nurse (GNM/B.Sc)" },
        ],
      },
      {
        id: "sub-respiratory",
        name: "Respiratory Support",
        description: "Managing prescribed concentrators, BiPAP/CPAP, and nebulization",
        tasks: [
          { id: "task-resp-oxygen", name: "Prescribed oxygen support", description: "Monitoring nasal cannula flow rates, concentrator filters, and cylinder safety", clinicalClassification: "CLINICAL_NURSING", requiredRole: "Registered Nurse (GNM/B.Sc)", requiresDoctorPrescription: true },
          { id: "task-resp-equipment", name: "Respiratory equipment assistance", description: "BiPAP mask fit, CPAP humidification checks, and prescribed nebulization", clinicalClassification: "CLINICAL_NURSING", requiredRole: "Registered Nurse (GNM/B.Sc)", requiresDoctorPrescription: true },
        ],
      },
      {
        id: "sub-recovery-nursing",
        name: "Recovery & Specialised Nursing",
        description: "Complex home convalescence for post-operative, bedbound, or oncology patients",
        tasks: [
          { id: "task-rec-postop", name: "Post-operative nursing", description: "Post-cardiac, orthopedic joint replacement, or laparotomy home recovery nursing", clinicalClassification: "CLINICAL_NURSING", requiredRole: "Registered Nurse (GNM/B.Sc)", requiresDoctorPrescription: true, requiresAssessment: true },
          { id: "task-rec-bedridden", name: "Bedridden patient nursing", description: "High-dependency nursing with ICU step-down protocols and airway maintenance", clinicalClassification: "CLINICAL_NURSING", requiredRole: "Registered Nurse (GNM/B.Sc)", requiresDoctorPrescription: true, requiresAssessment: true },
          { id: "task-rec-chronic", name: "Doctor-directed chronic condition support", description: "Managing advanced CKD, stroke recovery, and cardiac failure at home", clinicalClassification: "CLINICAL_NURSING", requiredRole: "Registered Nurse (GNM/B.Sc)", requiresDoctorPrescription: true, requiresAssessment: true },
          { id: "task-rec-palliative", name: "Palliative nursing support", description: "Dignified pain management, symptom comfort, and compassionate bedside care", clinicalClassification: "CLINICAL_NURSING", requiredRole: "Registered Nurse (GNM/B.Sc)", requiresDoctorPrescription: true, requiresAssessment: true },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 05: HOSPITAL, RECOVERY & POST-DISCHARGE ASSISTANCE
  // ─────────────────────────────────────────────────────────────
  {
    id: "cat-hospital-recovery",
    categoryNumber: 5,
    name: "Hospital, Recovery & Post-Discharge Assistance",
    tagline: "Admission support, 24h bedside ward vigil, discharge coordination & convalescence",
    iconName: "Home",
    color: "purple",
    isClinical: false,
    defaultServiceSlug: "hospital-attendants",
    contextualQuestions: [
      {
        id: "hospital_journey_stage",
        question: "Where in the hospital journey are you right now?",
        options: [
          { id: "stage_current_bedside", label: "Currently admitted — need bedside attendant immediately" },
          { id: "stage_upcoming_admission", label: "Upcoming planned surgery / admission" },
          { id: "stage_discharge_planning", label: "Getting discharged in 24–48 hours — need home transition" },
          { id: "stage_already_home", label: "Already home — recovering after hospitalization" },
        ],
      },
    ],
    subcategories: [
      {
        id: "sub-hosp-admission",
        name: "Hospital Admission",
        description: "Assisting patient and family through billing, registration, and ward orientation",
        tasks: [
          { id: "task-hosp-reg", name: "Registration assistance", description: "Handling initial IP registration counters, insurance TPA desk, and queue waiting", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-hosp-nav", name: "Hospital navigation", description: "Guiding patient across diagnostics, lifts, pathology, and ward rooms", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-hosp-coord", name: "Admission coordination", description: "Helping unpack personal belongings, arranging room essentials, and settling in", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-hosp-bedside",
        name: "Bedside Ward Assistance",
        description: "Continuous bedside comfort in hospital private rooms and shared wards",
        tasks: [
          { id: "task-bed-comp", name: "Non-clinical bedside companionship", description: "Constant reassuring presence by the patient cot so family can rest", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-bed-stay-assist", name: "Personal assistance during hospital stays", description: "Calling duty nurses, water sipping assistance, and bedpan coordination", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-bed-day", name: "Daytime bedside support", description: "12-hour day vigil assisting during doctor rounds, tests, and sponge baths", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-bed-night", name: "Night-time bedside support", description: "12-hour overnight ward vigil attending to calls, washroom trips, and alarms", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-hosp-appointments",
        name: "Appointments & Reports",
        description: "Coordinating with hospital departments and collecting diagnostic reports",
        tasks: [
          { id: "task-apt-doc-acc", name: "Doctor appointment accompaniment", description: "Holding patient files, recording doctor instructions, and wheeling to OPD", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-apt-diag-assist", name: "Diagnostic appointment assistance", description: "Waiting outside X-ray/scan rooms and escorting back to ward", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-apt-report-coll", name: "Report collection coordination", description: "Collecting physical lab reports and test films from counters", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-hosp-discharge",
        name: "Discharge Coordination",
        description: "Assisting family through pharmacy clearing, settlement, and transition home",
        tasks: [
          { id: "task-disch-coord", name: "Discharge coordination", description: "Running pharmacy slips, verifying discharge summary receipt, and coordination", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-disch-paperwork", name: "Paperwork assistance", description: "Organizing receipts, medical bills, discharge instructions for family filing", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-disch-home-acc", name: "Hospital-to-home accompaniment", description: "Escorting in car/ambulance and settling patient safely into home bedroom", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-hosp-post-discharge",
        name: "Post-Discharge Home Recovery",
        description: "Crucial first 2–4 weeks of convalescence in familiar domestic environment",
        tasks: [
          { id: "task-post-rec-assist", name: "Recovery assistance at home", description: "Supporting mobility, diet, and rest protocols prescribed by surgeon", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-post-daily-living", name: "Daily living support", description: "Bathing, hygiene, and meal assistance during temporary physical vulnerability", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-post-followup-acc", name: "Follow-up appointment assistance", description: "Re-booking transport and escorting to surgical review/stitch removal OPDs", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-post-family-updates", name: "Family updates", description: "Daily structured WhatsApp updates on pain levels, mobility, and appetite", clinicalClassification: "COORDINATION", requiredRole: "Saha Care Companion" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 06: COMPANIONSHIP & SOCIAL WELLBEING
  // ─────────────────────────────────────────────────────────────
  {
    id: "cat-companionship",
    categoryNumber: 6,
    name: "Companionship & Social Wellbeing",
    tagline: "Conversation, hobbies, reading, outdoor walks, temple visits & digital literacy",
    iconName: "Sparkles",
    color: "pink",
    isClinical: false,
    defaultServiceSlug: "elderly-care",
    contextualQuestions: [
      {
        id: "comp_interests",
        question: "What activities does your loved one enjoy the most?",
        isMultiSelect: true,
        options: [
          { id: "int_talk_nostalgia", label: "Heartfelt conversation & sharing stories" },
          { id: "int_newspaper_books", label: "Reading newspapers, spiritual texts, or literature" },
          { id: "int_garden_walks", label: "Gentle outdoor strolls & fresh air" },
          { id: "int_temple_visits", label: "Temple or religious gatherings" },
          { id: "int_video_calls", label: "Staying in touch with children/grandchildren on video calls" },
        ],
      },
    ],
    subcategories: [
      {
        id: "sub-social-activities",
        name: "Meaningful Engagement & Hobbies",
        description: "Engaging mind, memory, and spirits through daily human warmth",
        tasks: [
          { id: "task-comp-conversation", name: "Conversation and companionship", description: "Attentive listening, reminiscing, and warm day-to-day conversation", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-comp-reading", name: "Reading assistance", description: "Reading daily Tamil/Telugu/Kannada/Malayalam/English newspapers and books aloud", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-comp-games", name: "Games and recreational activities", description: "Playing carrom, chess, cards, word puzzles, or memory board games", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-comp-hobbies", name: "Hobbies", description: "Assisting with gardening, knitting, Carnatic music listening, or scrapbooking", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-comp-walks", name: "Outdoor walks", description: "Gentle accompanied morning or evening strolls in neighborhood streets", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-comp-park", name: "Park visits", description: "Sitting in neighborhood parks, meeting peers, and enjoying nature", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-comp-religious", name: "Religious visits", description: "Temple visits, pooja assistance, bhajans, or church/mosque attendance", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-comp-functions", name: "Family function accompaniment", description: "Staying beside senior during family gatherings to attend to food & seating", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-comp-community", name: "Community participation", description: "Senior citizen associations, library visits, and community celebrations", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-digital-literacy",
        name: "Smartphone & Digital Assistance",
        description: "Helping seniors connect with distant children and manage everyday phone tasks",
        tasks: [
          { id: "task-dig-smartphone", name: "Smartphone assistance", description: "Troubleshooting WhatsApp, adjusting text sizes, and charging devices", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-dig-videocalls", name: "Video call assistance", description: "Connecting WhatsApp/FaceTime calls with children living abroad", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-dig-literacy", name: "Digital literacy assistance", description: "Guiding elder on audiobooks, devotional apps, and YouTube music", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-dig-engagement", name: "Social engagement routines", description: "Encouraging regular calls with old friends and relatives", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 07: HOUSEHOLD & PERSONAL ENVIRONMENT ASSISTANCE
  // ─────────────────────────────────────────────────────────────
  {
    id: "cat-household",
    categoryNumber: 7,
    name: "Household & Personal Environment Assistance",
    tagline: "Bed making, room tidying, light meal preparation, errands & accessibility checks",
    iconName: "Briefcase",
    color: "amber",
    isClinical: false,
    defaultServiceSlug: "home-personal-care",
    contextualQuestions: [],
    subcategories: [
      {
        id: "sub-home-env",
        name: "Recipient Living Space Care",
        description: "Light supportive tasks centered strictly around the care recipient",
        tasks: [
          { id: "task-hh-bedmaking", name: "Bed making", description: "Straightening bed sheets, plumping pillows, and freshening cot linen", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-hh-room-org", name: "Room organisation", description: "Keeping the elder's bedroom clean, ventilated, and organized", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-hh-laundry", name: "Personal laundry", description: "Washing and drying the recipient's personal clothes in washing machine", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-hh-clothing-org", name: "Clothing organisation", description: "Folding and shelving the recipient's daily wear neatly", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-hh-light-assist", name: "Light household assistance", description: "Keeping walking corridors clear of trip hazards and dusting elder table", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-hh-meal-prep", name: "Simple meal preparation", description: "Preparing simple healthy meals (rasam, upma, khichdi, idli, oats)", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-home-errands",
        name: "Errands & Supplies",
        description: "Fetching groceries, restocking necessities, and maintaining home safety",
        tasks: [
          { id: "task-hh-groceries", name: "Grocery shopping", description: "Purchasing fresh vegetables, fruits, and milk for recipient needs", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-hh-pharmacy", name: "Pharmacy collection", description: "Refilling chronic prescriptions at the neighborhood chemist", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-hh-errands", name: "Personal errands", description: "Dry cleaning drop/pick-up, tailoring, and utility tasks", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-hh-essentials", name: "Organisation of daily essentials", description: "Stocking adult diapers, wet wipes, and skin ointments by bedside", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-hh-restocking", name: "Restocking personal necessities", description: "Tracking inventory of daily toiletries, nutritional drinks, and supplements", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-hh-access-check", name: "Identifying home accessibility obstacles", description: "Noting poorly lit steps, slippery tiles, or lack of grab bars", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 08: MATERNITY, MOTHER & NEWBORN SUPPORT
  // ─────────────────────────────────────────────────────────────
  {
    id: "cat-maternal-infant",
    categoryNumber: 8,
    name: "Maternity, Mother, Newborn & Childcare",
    tagline: "Postnatal maternal healing, newborn care, nanny support for outstation parents & routines",
    iconName: "Baby",
    color: "pink",
    isClinical: false,
    defaultServiceSlug: "post-natal-care",
    contextualQuestions: [
      {
        id: "mat_infant_age",
        question: "How old is the baby or when is the expected due date?",
        options: [
          { id: "age_newborn_0_30d", label: "Newborn (0–30 days) — Fourth trimester initial healing" },
          { id: "age_infant_1_3m", label: "1–3 months infant" },
          { id: "age_infant_3_6m", label: "3–6 months infant" },
          { id: "due_date_upcoming", label: "Expecting soon — planning postpartum booking in advance" },
        ],
      },
      {
        id: "mat_shift_timing",
        question: "What timing of support does the mother need most?",
        options: [
          { id: "shift_day_10hr", label: "Daytime support (bath, mother meal, baby soothing)" },
          { id: "shift_night_12hr", label: "Night-time support (soothing, burping so mother can sleep)" },
          { id: "shift_24hr_livein", label: "24-hour Japa / Postnatal live-in support" },
        ],
      },
    ],
    subcategories: [
      {
        id: "sub-maternal",
        name: "Maternal Convalescence & Healing",
        description: "Nutritious recovery meals, comfort routines, and postpartum rest",
        tasks: [
          { id: "task-mat-daily", name: "Postnatal daily assistance", description: "Supporting new mother with room comfort, hydration, and gentle movement", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-mat-hygiene", name: "Personal hygiene assistance", description: "Support with warm post-delivery baths and comfortable dressing", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-mat-meal", name: "Meal support", description: "Serving traditional postpartum lactogenic foods, soups, and herbal decoctions", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-mat-rest", name: "Rest and routine assistance", description: "Managing doorbell and visitors so mother can achieve undisturbed nap cycles", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-newborn",
        name: "Newborn Care & Soothing",
        description: "Traditional gentle baby massage, oil bath, burping, and diapering",
        tasks: [
          { id: "task-nb-bath", name: "Newborn bathing support", description: "Experienced, gentle warm baby bath and oil massage routines", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-nb-diaper", name: "Diaper changing", description: "Frequent cotton nappy / diaper changing with rash prevention care", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-nb-hygiene", name: "Baby hygiene", description: "Umbilical hygiene cleanliness, nail care, and warm swaddling", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-nb-basic-care", name: "Basic baby care", description: "Comforting, holding, temperature observation, and clothing care", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-nb-feeding-rtn", name: "Feeding routine assistance", description: "Bringing baby to mother for feeding, burping over shoulder, and tracking logs", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-nb-sleep", name: "Baby sleep routine support", description: "Gentle rocking, white noise, and settling baby between feeds", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-nb-overnight", name: "Overnight newborn assistance", description: "Attending to middle-of-the-night cries and bringing baby for feeds", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-mat-family",
        name: "Postnatal Family Support",
        description: "Reassurance for first-time parents and multi-baby routines",
        tasks: [
          { id: "task-mat-first-time", name: "First-time parent support", description: "Calm coaching on burping holds, diapering, and decoding cry cues", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-mat-multiple", name: "Multiple newborn support", description: "Simultaneous care coordination for twin infants", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-mat-hh-assist", name: "Household assistance", description: "Baby bottle sterilization, baby laundry, and nursery tidiness", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-mat-day-night", name: "Day and night assistance", description: "Flexible shift transitions maintaining routine consistency", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-childcare-nanny",
        name: "Childcare, Nanny & Babysitting",
        description: "Trusted nanny and babysitting support when parents are at work, traveling, or out of station",
        tasks: [
          { id: "task-child-supervision", name: "Attentive child supervision", description: "Safe playtime supervision, active engagement, and safety oversight at home", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-child-meals", name: "Child feeding & healthy meals", description: "Preparing and serving child-friendly nutritious meals and snacks on schedule", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-child-routine", name: "School routine & homework guidance", description: "Helping child get ready, uniform/clothing, and homework desk presence", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-child-bedtime", name: "Bedtime routine & story reading", description: "Evening wind-down, storybooks, and settling child to sleep peacefully", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-child-outstation-cover", name: "Out-of-station parent relief cover", description: "Day-to-night dedicated nanny cover when parents travel out of station", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-child-parent-updates", name: "Parent photo & activity updates", description: "Regular WhatsApp photo updates and meal/sleep logs sent to travelling parents", clinicalClassification: "COORDINATION", requiredRole: "Care Coordinator Desk" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 09: DISABILITY & SPECIALISED DAILY SUPPORT
  // ─────────────────────────────────────────────────────────────
  {
    id: "cat-disability",
    categoryNumber: 9,
    name: "Disability & Specialised Daily Support",
    tagline: "Dedicated functional assistance for Parkinson's, stroke, dementia & sensory needs",
    iconName: "Shield",
    color: "indigo",
    isClinical: false,
    defaultServiceSlug: "elderly-care",
    contextualQuestions: [
      {
        id: "disability_assessment",
        question: "Has a specialist clinical assessment been completed recently?",
        helpText: "We recommend a coordinator review for high-dependency cases",
        options: [
          { id: "assess_yes", label: "Yes, medical assessment is up to date" },
          { id: "assess_needed", label: "Need ApnaCare care coordinator to evaluate home needs" },
        ],
      },
    ],
    subcategories: [
      {
        id: "sub-specialized-support",
        name: "Condition-Specific Daily Living",
        description: "Patience and specialized skill for neurological and sensory conditions",
        tasks: [
          { id: "task-dis-physical", name: "Physical disability assistance", description: "Active transfer assistance, wheelchair adaptation, and personal dignity support", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion", requiresAssessment: true },
          { id: "task-dis-visual", name: "Visual impairment assistance", description: "Verbal orientation, plate arrangement guidance, and obstacle-free walking", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-dis-hearing", name: "Hearing impairment communication assistance", description: "Clear written notes, visual cues, and sign/gesture comprehension", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-dis-cognitive", name: "Cognitive support", description: "Structured daily cueing, memory anchors, and patient, calm engagement", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-dis-supervision", name: "Routine supervision", description: "Preventing wandering, stove accidents, or disoriented medication intake", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-dis-neuro", name: "Neurological condition-related daily assistance", description: "Assisting with motor dyspraxia, speech pauses, and muscle fatigue", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion", requiresAssessment: true },
          { id: "task-dis-parkinsons", name: "Parkinson's-related mobility assistance", description: "Managing freezing gait, tremors during eating, and medication timing", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-dis-stroke", name: "Stroke-related functional assistance", description: "Support for hemiplegia, dressing weaker side first, and transfer assistance", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion", requiresAssessment: true },
          { id: "task-dis-dementia", name: "Dementia-related routine assistance", description: "Calm redirection, sundowning support, gentle reality orientation, and dignity", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion", requiresAssessment: true },
          { id: "task-dis-spinal", name: "Spinal cord injury-related mobility support", description: "Pressure area checks, sliding board transfers, and wheelchair positioning", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion", requiresAssessment: true },
          { id: "task-dis-high-dep", name: "High-dependency personal assistance", description: "Round-the-clock intensive personal hygiene and position shifts", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion", requiresAssessment: true },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 10: REHABILITATION & FUNCTIONAL RECOVERY
  // ─────────────────────────────────────────────────────────────
  {
    id: "cat-rehabilitation",
    categoryNumber: 10,
    name: "Rehabilitation & Functional Recovery",
    tagline: "Physiotherapy, stroke rehab, gait training, occupational therapy & home exercises",
    iconName: "Activity",
    color: "teal",
    isClinical: true,
    defaultServiceSlug: "nursing-services",
    contextualQuestions: [
      {
        id: "rehab_doctor_referral",
        question: "Has a doctor or orthopedic surgeon prescribed rehabilitation?",
        options: [
          { id: "rehab_rx_yes", label: "Yes, active prescription / protocol from doctor" },
          { id: "rehab_rx_eval", label: "Need initial physiotherapist assessment visit first" },
        ],
      },
    ],
    subcategories: [
      {
        id: "sub-rehab-therapies",
        name: "Specialized Physical & Functional Therapies",
        description: "Delivered strictly by qualified physiotherapists and licensed therapists",
        tasks: [
          { id: "task-rhb-physio", name: "Physiotherapy", description: "Targeted musculoskeletal mobilization, electrotherapy, and strength restoration", clinicalClassification: "SPECIALIST_REHAB", requiredRole: "Physiotherapist / Specialist Therapist", requiresDoctorPrescription: true },
          { id: "task-rhb-postsurg", name: "Post-surgical rehabilitation", description: "Knee replacement, hip fracture, or spine surgery recovery protocols", clinicalClassification: "SPECIALIST_REHAB", requiredRole: "Physiotherapist / Specialist Therapist", requiresDoctorPrescription: true },
          { id: "task-rhb-stroke", name: "Stroke rehabilitation", description: "Neuro-developmental therapy, motor retraining, and spasticity management", clinicalClassification: "SPECIALIST_REHAB", requiredRole: "Physiotherapist / Specialist Therapist", requiresDoctorPrescription: true, requiresAssessment: true },
          { id: "task-rhb-mobility", name: "Mobility rehabilitation", description: "Graduated gait retraining from parallel bars to quad-cane independence", clinicalClassification: "SPECIALIST_REHAB", requiredRole: "Physiotherapist / Specialist Therapist", requiresDoctorPrescription: true },
          { id: "task-rhb-balance", name: "Balance training", description: "Vestibular and proprioceptive drills to eliminate fear of falling", clinicalClassification: "SPECIALIST_REHAB", requiredRole: "Physiotherapist / Specialist Therapist" },
          { id: "task-rhb-occupational", name: "Occupational therapy", description: "Fine motor skills, utensil holding, and activities of daily living adaptation", clinicalClassification: "SPECIALIST_REHAB", requiredRole: "Physiotherapist / Specialist Therapist", requiresAssessment: true },
          { id: "task-rhb-speech", name: "Speech and language therapy", description: "Swallowing drills (dysphagia) and expressive speech therapy post-stroke", clinicalClassification: "SPECIALIST_REHAB", requiredRole: "Physiotherapist / Specialist Therapist", requiresAssessment: true },
          { id: "task-rhb-prescribed-ex", name: "Prescribed home exercise programmes", description: "Designing an achievable daily routine for Saha or family to accompany", clinicalClassification: "SPECIALIST_REHAB", requiredRole: "Physiotherapist / Specialist Therapist" },
          { id: "task-rhb-rehab-acc", name: "Rehabilitation appointment accompaniment", description: "Escorting patient safely to and from physiotherapy clinics or rehab centers", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Saha Care Companion" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 11: FAMILY CAREGIVER RELIEF & CARE COORDINATION
  // ─────────────────────────────────────────────────────────────
  {
    id: "cat-caregiver-relief",
    categoryNumber: 11,
    name: "Family Caregiver Relief & Care Coordination",
    tagline: "Respite shifts, remote family updates, shift handovers & multi-sibling coordination",
    iconName: "Users",
    color: "blue",
    isClinical: false,
    defaultServiceSlug: "elderly-care",
    contextualQuestions: [
      {
        id: "remote_family_status",
        question: "Do family members or children live outside the city or abroad?",
        options: [
          { id: "remote_abroad_nri", label: "Yes, family lives abroad (US, UK, UAE, Singapore) — Remote Family Plan" },
          { id: "remote_other_city", label: "Yes, children live in another Indian city" },
          { id: "local_same_home", label: "No, family lives in the same house or neighborhood" },
        ],
      },
    ],
    subcategories: [
      {
        id: "sub-respite-care",
        name: "Respite & Family Relief",
        description: "Preventing caregiver burnout and covering primary family absences",
        tasks: [
          { id: "task-rel-temp-replace", name: "Temporary caregiver replacement", description: "Stepping in when regular maid, family member, or attendant is on leave", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-rel-respite-shifts", name: "Scheduled respite shifts", description: "Weekly 8h or weekend relief shifts allowing daughter/son to rest", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-rel-recurring", name: "Recurring family relief", description: "Fixed weekly schedule giving family predictable personal time", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
        ],
      },
      {
        id: "sub-remote-coordination",
        name: "Remote Family Oversight & Logs",
        description: "Structured communication keeping distant children completely informed",
        tasks: [
          { id: "task-rel-remote-updates", name: "Remote family updates", description: "Objective morning and evening WhatsApp status summaries", clinicalClassification: "COORDINATION", requiredRole: "Care Coordinator Desk" },
          { id: "task-rel-daily-reports", name: "Daily care reports", description: "Structured record of meals taken, medicine times, sleep, and mood", clinicalClassification: "COORDINATION", requiredRole: "Saha Care Companion" },
          { id: "task-rel-apt-coord", name: "Appointment coordination", description: "Booking doctor reviews, diagnostic pickups, and sync with family", clinicalClassification: "COORDINATION", requiredRole: "Care Coordinator Desk" },
          { id: "task-rel-rx-org", name: "Prescription and report organisation", description: "Scanning and archiving medical prescriptions into digital family drive", clinicalClassification: "COORDINATION", requiredRole: "Care Coordinator Desk" },
          { id: "task-rel-scheduling", name: "Care scheduling", description: "Managing roster changes, festival leave covers, and shift rosters", clinicalClassification: "COORDINATION", requiredRole: "Care Coordinator Desk" },
          { id: "task-rel-handovers", name: "Shift handovers", description: "Detailed verbal and written handovers between incoming and outgoing Sahas", clinicalClassification: "COORDINATION", requiredRole: "Saha Care Companion" },
          { id: "task-rel-family-comm", name: "Family communication", description: "Dedicated single point-of-contact care coordinator on WhatsApp & phone", clinicalClassification: "COORDINATION", requiredRole: "Care Coordinator Desk" },
          { id: "task-rel-multi-sibling", name: "Multiple family member coordination", description: "Looping in brothers and sisters on joint WhatsApp group updates", clinicalClassification: "COORDINATION", requiredRole: "Care Coordinator Desk" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 12: SAFETY, SECURITY & PERSONAL ACCOMPANIMENT
  // ─────────────────────────────────────────────────────────────
  {
    id: "cat-safety-accompaniment",
    categoryNumber: 12,
    name: "Safety, Security & Personal Accompaniment",
    tagline: "Vetted women travel escorts, senior accompaniment, safe arrivals & night transfers",
    iconName: "ShieldCheck",
    color: "amber",
    isClinical: false,
    defaultServiceSlug: "women-drivers",
    contextualQuestions: [],
    subcategories: [
      {
        id: "sub-personal-safety",
        name: "Personal Escort & Travel Safety",
        description: "Vetted women security escorts, event attendants, and safe arrival coordination",
        tasks: [
          { id: "task-saf-women-travel", name: "Women's travel accompaniment", description: "Vetted companion accompanying solo women travelers during late evening transit", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-saf-senior-acc", name: "Senior citizen accompaniment", description: "Protective companion beside elder during crowded city transit or markets", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-saf-personal-escort", name: "Personal escort", description: "Discrete companion ensuring peace of mind during city transit and meetings", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-saf-hosp-visit", name: "Hospital visit accompaniment", description: "Waiting porch accompaniment ensuring patient is never left stranded", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-saf-airport", name: "Airport assistance", description: "Dedicated porch-to-porch security and luggage vigil", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-saf-railway", name: "Railway station assistance", description: "Safe platform escort and train boarding monitoring", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-saf-safe-arrival", name: "Safe arrival coordination", description: "Real-time trip telemetry and arrival confirmation ping to family", clinicalClassification: "COORDINATION", requiredRole: "Care Coordinator Desk" },
          { id: "task-saf-women-driver", name: "Women-driver requests", description: "Background-verified woman chauffeuse for city and airport commutes", clinicalClassification: "TRANSIT_MOBILITY", requiredRole: "Licensed Woman Chauffeuse / Transit Companion" },
          { id: "task-saf-event", name: "Event assistance", description: "On-site family function assistance for vulnerable seniors or VIP guests", clinicalClassification: "NON_CLINICAL", requiredRole: "Saha Care Companion" },
          { id: "task-saf-security-partner", name: "Verified security partner coordination", description: "Coordination with certified residential security partners where requested", clinicalClassification: "COORDINATION", requiredRole: "Care Coordinator Desk" },
        ],
      },
    ],
  },
];

// Helper to look up a task by ID across all categories
export function findTaskById(taskId: string): { task: CareTask; category: CareCategory; subcategory: CareSubcategory } | null {
  for (const cat of CARE_CATEGORIES) {
    for (const sub of cat.subcategories) {
      const match = sub.tasks.find((t) => t.id === taskId);
      if (match) return { task: match, category: cat, subcategory: sub };
    }
  }
  return null;
}

// Helper to search tasks by keyword across all categories
export function searchTasksByKeyword(query: string): { task: CareTask; category: CareCategory; subcategory: CareSubcategory }[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results: { task: CareTask; category: CareCategory; subcategory: CareSubcategory }[] = [];
  for (const cat of CARE_CATEGORIES) {
    for (const sub of cat.subcategories) {
      for (const task of sub.tasks) {
        if (
          task.name.toLowerCase().includes(q) ||
          task.description.toLowerCase().includes(q) ||
          sub.name.toLowerCase().includes(q) ||
          cat.name.toLowerCase().includes(q)
        ) {
          results.push({ task, category: cat, subcategory: sub });
        }
      }
    }
  }
  return results;
}

