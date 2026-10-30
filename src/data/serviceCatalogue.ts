/**
 * ApnaCare Comprehensive Service Catalogue & Customer Segments
 *
 * Implements the 6 primary categories and verified services based on
 * ApnaCare's customer segments and Ideal Customer Profiles (ICPs).
 */

import { type ServiceCategory, SERVICES } from "./site";

export type CatalogueCategoryId =
  | "care-at-home"
  | "hospital-assistance"
  | "travel-assistance"
  | "womens-mobility"
  | "family-support"
  | "business-institutional";

export interface CatalogueCategory {
  id: CatalogueCategoryId;
  code: "A" | "B" | "C" | "D" | "E" | "F";
  title: string;
  tagline: string;
  targetAudience: string;
  description: string;
  iconName: string;
  isInstitutional?: boolean;
}

export interface CatalogueService {
  id: string;
  name: string;
  categoryId: CatalogueCategoryId;
  shortDesc: string;
  description: string;
  intendedCustomer: string;
  keyBenefits: string[];
  whatIncluded: string[];
  whatNotIncluded: string[];
  availability: string;
  providerType:
    | "General Duty Assistant (Attendant)"
    | "Registered Nurse (GNM / B.Sc)"
    | "Licensed Woman Driver / Chauffeuse"
    | "Trained Travel Companion"
    | "Family Care & Childcare Assistant"
    | "Institutional Partnership Lead";
  isClinical: boolean;
  actionType: "book" | "request" | "business_enquiry";
  mappedCoreServiceSlug?: string;
  startingPrice?: number;
  pricingUnit?: "day" | "trip" | "hour" | "month" | "custom";
}

export interface CustomerEntryPoint {
  id: string;
  question: string;
  targetCategoryId: CatalogueCategoryId;
  suggestedServiceId: string;
  mappedCoreServiceSlug: string;
  subtitle: string;
}

export const CATALOGUE_CATEGORIES: CatalogueCategory[] = [
  {
    id: "care-at-home",
    code: "A",
    title: "Care at Home",
    tagline: "Compassionate bedside, recovery & routine daily living assistance",
    targetAudience: "For elderly people, patients, families and new parents",
    description:
      "Dignified daily support delivered directly in the safety and familiar comfort of home by thoroughly vetted female caregivers.",
    iconName: "Home",
  },
  {
    id: "hospital-assistance",
    code: "B",
    title: "Hospital Assistance",
    tagline: "Dedicated bedside vigil and hospital stay coordination",
    targetAudience: "For patients and families who need support during hospital stays",
    description:
      "Attentive non-medical bedside companions ensuring patient comfort, nurse coordination, and peace of mind for families during inpatient admissions.",
    iconName: "Building2",
  },
  {
    id: "travel-assistance",
    code: "C",
    title: "Travel Assistance",
    tagline: "Verified companions for journeys, transits and terminal navigation",
    targetAudience: "For women, senior citizens, patients and people who need support during journeys",
    description:
      "Reliable accompaniment for flights, train journeys, bus terminals, and medical appointments, with live tracking shared with designated family.",
    iconName: "Plane",
  },
  {
    id: "womens-mobility",
    code: "D",
    title: "Women's Mobility",
    tagline: "Safe commutes, chauffeuses and personal assisted travel",
    targetAudience: "For women who want additional support while travelling or commuting",
    description:
      "Licensed women drivers, personal safety assisted travel, and verified companion bookings designed specifically for women's daily mobility and evening commutes.",
    iconName: "Car",
  },
  {
    id: "family-support",
    code: "E",
    title: "Family Support",
    tagline: "Relief for working households and family caregivers",
    targetAudience: "For busy families, working professionals and households with caregiving responsibilities",
    description:
      "Flexible short-term home assistance, caregiver respite, meal prep support, and screened childcare to balance career and household responsibilities.",
    iconName: "HeartHandshake",
  },
  {
    id: "business-institutional",
    code: "F",
    title: "Business and Institutional Services",
    tagline: "Workforce caregiving, corporate travel & hospital staffing partnerships",
    targetAudience: "For healthcare institutions, corporate employers, and organizational partners",
    description:
      "Enterprise agreements, bulk service bookings, and institutional attendant staffing managed separately with dedicated SLAs and account management.",
    iconName: "Briefcase",
    isInstitutional: true,
  },
];

export const CATALOGUE_SERVICES: CatalogueService[] = [
  // ==========================================
  // Category A: Care at Home
  // ==========================================
  {
    id: "cah-elderly-companion",
    name: "Elderly companion care",
    categoryId: "care-at-home",
    shortDesc: "Warm, respectful companionship and daily living assistance for aging parents.",
    description:
      "Warm conversation, mental engagement, routine mobility assistance, and daily company from patient, vetted female caregivers to combat isolation and maintain dignity.",
    intendedCustomer: "Senior citizens living alone or elders whose adult children work full-time.",
    keyBenefits: [
      "Consistent emotional companionship & active listening",
      "Assistance with reading, phone calls, and light hobbies",
      "Daily WhatsApp wellbeing summaries sent to adult children",
    ],
    whatIncluded: [
      "Friendly conversation and memory stimulation games",
      "Assistance walking indoors and gentle garden strolls",
      "Supervised hydration and scheduled tea/snack prep",
      "Accompanying during daytime home routines",
    ],
    whatNotIncluded: [
      "Invasive medical nursing or clinical procedures",
      "Heavy housekeeping or deep cleaning",
      "Financial or legal management",
    ],
    availability: "Available in 8-hour, 12-hour day shifts, and 24-hour residential care",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "elderly-care",
    startingPrice: 1299,
    pricingUnit: "day",
  },
  {
    id: "cah-daily-living",
    name: "Daily living assistance",
    categoryId: "care-at-home",
    shortDesc: "Hands-on help with bathing, dressing, personal hygiene, and grooming.",
    description:
      "Empathetic, dignified personal care assistance supporting elderly adults and individuals with reduced mobility in their daily personal routines.",
    intendedCustomer: "Seniors with arthritis, stiffness, or mobility constraints requiring personal care.",
    keyBenefits: [
      "Respectful personal hygiene preservation",
      "Safe transfers in bathrooms to prevent slip-and-fall hazards",
      "Clean, dignified grooming routines every morning",
    ],
    whatIncluded: [
      "Assistance with sponge baths or shower safety",
      "Dressing, hair combing, dental hygiene, and skin moisturizing",
      "Linen changing and organizing personal bedside area",
    ],
    whatNotIncluded: [
      "Sterile catheterization or clinical wound care",
      "Physical therapy without doctor instructions",
    ],
    availability: "Available for morning routines (4-6 hrs) or full-day 8-12 hr shifts",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "home-personal-care",
    startingPrice: 1099,
    pricingUnit: "day",
  },
  {
    id: "cah-mobility-assistance",
    name: "Mobility assistance",
    categoryId: "care-at-home",
    shortDesc: "Wheelchair support, safe room-to-room transfers, and fall-prevention monitoring.",
    description:
      "Physically supportive assistance for seniors and recovering patients who need steady hands while standing, walking with walkers, or transferring from bed to chair.",
    intendedCustomer: "Post-stroke patients, frail seniors, and individuals recovering from hip/knee replacements.",
    keyBenefits: [
      "Significant reduction in fall and fracture risks",
      "Confidence to move about the house safely",
      "Correct body mechanics and transfer techniques",
    ],
    whatIncluded: [
      "Bed-to-wheelchair and chair-to-walker transfers",
      "Steadying support during hallway walks",
      "Checking pathways for tripping hazards (rugs, cables)",
    ],
    whatNotIncluded: [
      "Aggressive rehabilitation beyond medical protocols",
      "Lifting patients exceeding safe single-caregiver limits without equipment",
    ],
    availability: "Available for day shifts and 24-hour continuous attendance",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "elderly-care",
    startingPrice: 1299,
    pricingUnit: "day",
  },
  {
    id: "cah-medication-reminders",
    name: "Medication reminders",
    categoryId: "care-at-home",
    shortDesc: "Strict adherence to doctor-prescribed dosage schedules and vitals tracking.",
    description:
      "Attendants ensure that oral medications are taken at the exact times prescribed by doctors, with clear documentation in daily health logs.",
    intendedCustomer: "Patients on multi-drug regimens for hypertension, diabetes, or post-operative recovery.",
    keyBenefits: [
      "Zero missed doses or dangerous accidental double doses",
      "Organized pill organizers and prescription adherence",
      "Immediate alert if patient refuses or experiences difficulty swallowing",
    ],
    whatIncluded: [
      "Handing pre-organized oral medications with water",
      "Logging time, dosage, and patient vitals (BP/pulse) in the digital log",
      "Informing family when prescriptions are running low",
    ],
    whatNotIncluded: [
      "Prescribing or modifying medical dosages",
      "Administering intravenous (IV) or intramuscular (IM) injections (requires RN)",
    ],
    availability: "Standard feature in all 8-hr, 12-hr, and 24-hr care shifts",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "elderly-care",
    startingPrice: 1299,
    pricingUnit: "day",
  },
  {
    id: "cah-meal-assistance",
    name: "Meal assistance",
    categoryId: "care-at-home",
    shortDesc: "Gentle feeding accompaniment, hydration prompts, and nutritious meal preparation.",
    description:
      "Patient feeding support for elders with tremors, swallowing fatigue, or low appetite, ensuring warm, wholesome nutrition throughout the day.",
    intendedCustomer: "Seniors with Parkinson's, post-stroke dysphagia, or general weakness.",
    keyBenefits: [
      "Prevents dehydration and nutritional decline",
      "Patient, unhurried feeding pace respecting the elder's comfort",
      "Preparation of soft, easy-to-digest home meals",
    ],
    whatIncluded: [
      "Assisting with light meal preparation (porridge, soups, soft rice)",
      "Gentle spoon feeding and seated posture monitoring to prevent choking",
      "Regular hydration and warm herbal drink reminders",
    ],
    whatNotIncluded: [
      "Commercial catering for large family gatherings",
      "Nasogastric (Ryle's) tube insertion (strictly performed by Registered Nurse)",
    ],
    availability: "Available on all daily care and live-in shifts",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "home-personal-care",
    startingPrice: 1099,
    pricingUnit: "day",
  },
  {
    id: "cah-respite-care",
    name: "Respite care for family caregivers",
    categoryId: "care-at-home",
    shortDesc: "Short-term relief allowing family members to rest, travel, or attend to personal needs.",
    description:
      "A compassionate, reliable caregiver steps in for a few days, a weekend, or several weeks, allowing primary family caregivers uninterrupted rest and recovery from caregiving burnout.",
    intendedCustomer: "Adult children, spouses, and family members carrying intense daily caregiving duties.",
    keyBenefits: [
      "Restores physical and emotional wellbeing for primary caregivers",
      "Seamless continuity of the elder's daily routine",
      "Thorough handover protocol before and after coverage",
    ],
    whatIncluded: [
      "Full coverage of the elder's daily routine and companionship",
      "Direct communication channel with family while away",
      "90-minute regional backup guarantee in active hubs",
    ],
    whatNotIncluded: [
      "Emergency permanent custodial takeover without family consent",
    ],
    availability: "Available from single 24-hour blocks up to 30-day respite intervals",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "elderly-care",
    startingPrice: 1399,
    pricingUnit: "day",
  },
  {
    id: "cah-overnight-livein",
    name: "Overnight and live-in care, subject to availability",
    categoryId: "care-at-home",
    shortDesc: "Continuous 24-hour resident care or dedicated overnight vigil.",
    description:
      "Attendants who stay in the home 24/7 or provide nighttime wakefulness support, ensuring elders who wake up confused or need bathroom trips at night are safe.",
    intendedCustomer: "Frail seniors with night wander tendencies, high fall risk, or living alone.",
    keyBenefits: [
      "Immediate nighttime response to calls for assistance",
      "Prevents dangerous dark hallway falls",
      "Comfort of continuous presence in the household",
    ],
    whatIncluded: [
      "Assistance with nighttime bathroom visits",
      "Soothing reassurance during nocturnal disorientation",
      "Morning hygiene and breakfast routine kickoff",
    ],
    whatNotIncluded: [
      "Domestic servitude or household cleaning for outside visitors",
    ],
    availability: "Subject to regional caregiver roster availability and bedroom accommodation",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "request",
    mappedCoreServiceSlug: "elderly-care",
    startingPrice: 1899,
    pricingUnit: "day",
  },
  {
    id: "cah-dementia-companionship",
    name: "Dementia companionship by appropriately trained caregivers",
    categoryId: "care-at-home",
    shortDesc: "Patient, de-escalating companion support for Alzheimer's and cognitive conditions.",
    description:
      "Caregivers trained in non-confrontational communication, cognitive stimulation, memory validation, and wandering supervision for seniors living with dementia.",
    intendedCustomer: "Individuals diagnosed with mild to moderate Alzheimer's, vascular dementia, or Lewy body dementia.",
    keyBenefits: [
      "Reduces agitation, confusion, and catastrophic reactions",
      "Safe, structured daily routine keeping the mind engaged",
      "Dignified validation therapy rather than arguing over memory lapses",
    ],
    whatIncluded: [
      "Engaging in photo album reminiscence and familiar songs",
      "Gentle redirection during agitation or sundowning episodes",
      "Continuous exit-door observation to prevent wandering outside",
    ],
    whatNotIncluded: [
      "Physical restraints of any kind (strictly forbidden by ApnaCare ethics)",
      "Psychiatric medical management without physician oversight",
    ],
    availability: "Available for 12-hour shifts and 24-hour residential placement",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "elderly-care",
    startingPrice: 1499,
    pricingUnit: "day",
  },
  {
    id: "cah-post-op-recovery",
    name: "Post-operative recovery assistance",
    categoryId: "care-at-home",
    shortDesc: "Dedicated physical assistance and comfort care following surgical discharge.",
    description:
      "Bridging the critical 2-4 weeks after hospital discharge, assisting with safe mobilization, ice pack application, diet compliance, and surgical recovery.",
    intendedCustomer: "Patients recovering from orthopedic, cardiac, general, or laparoscopic surgeries.",
    keyBenefits: [
      "Smoother healing environment reducing hospital readmission risks",
      "Gentle physical support getting in and out of bed",
      "Adherence to doctor's discharge instructions",
    ],
    whatIncluded: [
      "Assisting with prescribed gentle walking and limb elevation",
      "Nutritious post-op recovery meals and hydration",
      "Vitals logging (temperature, SpO2, blood pressure)",
    ],
    whatNotIncluded: [
      "Sterile wound debridement or surgical drain removal (requires Registered Nurse)",
    ],
    availability: "Available immediately upon hospital discharge notice",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "hospital-attendants",
    startingPrice: 1399,
    pricingUnit: "day",
  },
  {
    id: "cah-home-nursing",
    name: "Home nursing by qualified professionals",
    categoryId: "care-at-home",
    shortDesc: "Clinical care: injections, sterile dressings, catheters and IV infusions by licensed nurses.",
    description:
      "State-registered female nurses (GNM / B.Sc Nursing) delivering hospital-grade medical interventions strictly adhering to registered medical practitioner orders.",
    intendedCustomer: "Patients requiring sterile dressing, injections, chemotherapy monitoring, or tracheostomy/catheter maintenance.",
    keyBenefits: [
      "Hospital-grade clinical safety and strict aseptic techniques",
      "Licensed professionals registered with State Nursing Councils",
      "Direct doctor-prescription compliance and emergency escalation",
    ],
    whatIncluded: [
      "Sterile wound dressing and post-surgical suture monitoring",
      "Subcutaneous and intramuscular injections as prescribed",
      "Urinary catheter changes and Ryle's tube care",
      "Infusion monitoring and nebulization therapy",
    ],
    whatNotIncluded: [
      "Independent medical diagnosis or altering prescriptions",
      "Unprescribed intravenous administration",
    ],
    availability: "Clinical visit slots (2 hours), 12-hour day/night shifts, or 24-hour nursing",
    providerType: "Registered Nurse (GNM / B.Sc)",
    isClinical: true,
    actionType: "book",
    mappedCoreServiceSlug: "nursing-services",
    startingPrice: 1999,
    pricingUnit: "day",
  },
  {
    id: "cah-postnatal-mother",
    name: "Postnatal mother care",
    categoryId: "care-at-home",
    shortDesc: "Gentle fourth-trimester convalescence, lactation support, and maternal recuperation.",
    description:
      "Experienced maternal attendants providing traditional care, nutritious herbal food accompaniment, post-delivery massage, and compassionate recovery guidance.",
    intendedCustomer: "New mothers recovering from normal delivery or C-section births.",
    keyBenefits: [
      "Promotes physical healing and pelvic floor rest",
      "Emotional reassurance during hormone transitions",
      "Assistance with breastfeeding latch techniques and hydration",
    ],
    whatIncluded: [
      "Mother's post-delivery traditional oil massage and warm bath support",
      "Nutritious recovery broth and light meal preparation",
      "Gentle abdominal binder support and posture guidance",
    ],
    whatNotIncluded: [
      "Treating clinical postpartum complications (mastitis, severe hemorrhage)",
    ],
    availability: "Available for 12-hour daytime shifts or 24-hour monthly packages",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "post-natal-care",
    startingPrice: 1999,
    pricingUnit: "day",
  },
  {
    id: "cah-newborn-care",
    name: "Newborn care assistance",
    categoryId: "care-at-home",
    shortDesc: "Expert traditional baby massage, warm bath, umbilical hygiene, and gentle soothing.",
    description:
      "Trained infant care attendants supporting first-time parents with delicate newborn routines, diaper hygiene, burping, and sleep scheduling.",
    intendedCustomer: "Newborn infants from birth through 6 months of age.",
    keyBenefits: [
      "Confidence for anxious new parents",
      "Safe, gentle traditional baby bath and oil massage",
      "Strict hygiene standards preventing infant skin rashes",
    ],
    whatIncluded: [
      "Daily gentle mustard or almond oil baby massage",
      "Warm water baby bath and cradle cap care",
      "Umbilical cord cleaning according to pediatrician instructions",
      "Sterilization of feeding bottles and baby clothes care",
    ],
    whatNotIncluded: [
      "Neonatal ICU clinical interventions (requires Neonatal Nurse)",
    ],
    availability: "Available in 15-day, 30-day, and 60-day convalescence periods",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "post-natal-care",
    startingPrice: 1999,
    pricingUnit: "day",
  },
  {
    id: "cah-night-newborn",
    name: "Night-time newborn assistance",
    categoryId: "care-at-home",
    shortDesc: "Dedicated night wakefulness coverage so exhausted mothers can sleep uninterrupted.",
    description:
      "An attendant stays awake by the baby's cot, managing diaper changes, burping, soothing, and bringing the baby to mother solely for nursing, ensuring restored maternal sleep.",
    intendedCustomer: "Exhausted new parents suffering from severe sleep deprivation in the early weeks.",
    keyBenefits: [
      "Mothers receive uninterrupted 6-8 hours of vital restorative sleep",
      "Reduces postpartum exhaustion and maternal anxiety",
      "Calm, prompt soothing when baby wakes crying at night",
    ],
    whatIncluded: [
      "Nighttime wakefulness and monitoring the baby's sleep position",
      "Burping and rocking after feeds",
      "Night diaper changes and comfortable swaddling",
    ],
    whatNotIncluded: [
      "Daytime household chores during an overnight shift",
    ],
    availability: "10-hour night shifts (typically 9:00 PM to 7:00 AM)",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "post-natal-care",
    startingPrice: 1699,
    pricingUnit: "day",
  },
  {
    id: "cah-physiotherapy-coordination",
    name: "Physiotherapy coordination with qualified professionals",
    categoryId: "care-at-home",
    shortDesc: "Coordination with licensed physiotherapists for home rehabilitation exercises.",
    description:
      "Connecting families with certified physiotherapists for mobility rehabilitation, with the attendant helping the patient practice prescribed daily exercises between visits.",
    intendedCustomer: "Patients recovering from paralysis, fractures, joint replacements, or spinal conditions.",
    keyBenefits: [
      "Faster recovery of independent motor movement",
      "Continuity of daily stretching regimens between clinical visits",
      "Convenience of clinical rehabilitation at home",
    ],
    whatIncluded: [
      "Assisting the patient into position for the visiting physiotherapist",
      "Supervising prescribed gentle daily walking and range-of-motion routines",
      "Recording patient mobility milestones in the daily wellness log",
    ],
    whatNotIncluded: [
      "Unlicensed or aggressive joint manipulations by attendants",
    ],
    availability: "Coordinated alongside regular home care or as standalone visits",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: true,
    actionType: "request",
    mappedCoreServiceSlug: "home-personal-care",
    startingPrice: 1599,
    pricingUnit: "day",
  },

  // ==========================================
  // Category B: Hospital Assistance
  // ==========================================
  {
    id: "hosp-bedside-attendant",
    name: "Hospital bedside attendants",
    categoryId: "hospital-assistance",
    shortDesc: "Attentive female bedside vigil day and night in hospital inpatient wards.",
    description:
      "Trained attendants remaining by the patient's bedside around the clock, attending to call bells, bathroom transfers, sponge baths, and relieving tired family members.",
    intendedCustomer: "Patients admitted for surgery, chemotherapy, observation, or extended hospital stays.",
    keyBenefits: [
      "Patient is never left alone or unable to reach assistance",
      "Direct communication with duty nurses and doctors",
      "Family members can return home to sleep without guilt or panic",
    ],
    whatIncluded: [
      "Bedside call bell assistance and patient comfort adjustments",
      "Helping patient sit up, drink water, and use bedpan or urinal",
      "Repositioning patient to prevent painful pressure bedsores",
      "Collecting prescribed medicines and test results from hospital counters",
    ],
    whatNotIncluded: [
      "Administering hospital medications (strictly hospital staff's duty)",
      "Interfering with ICU clinical equipment",
    ],
    availability: "Available 24 hours a day with 12-hour day/night shifts or continuous 24-hr shifts",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "hospital-attendants",
    startingPrice: 1499,
    pricingUnit: "day",
  },
  {
    id: "hosp-patient-companionship",
    name: "Patient companionship",
    categoryId: "hospital-assistance",
    shortDesc: "Calm, reassuring emotional presence reducing anxiety in unfamiliar hospital rooms.",
    description:
      "Hospital rooms can be intimidating and lonely. Our compassionate female attendants provide comforting conversation, reading aloud, and soothing company throughout the stay.",
    intendedCustomer: "Elderly patients, pediatric patients requiring extra warmth, or solo patients admitted without family nearby.",
    keyBenefits: [
      "Significantly reduces hospital-induced delirium and acute anxiety",
      "A friendly, familiar face when family has to step out",
      "Encouraging hydration and eating hospital meals",
    ],
    whatIncluded: [
      "Engaging in gentle conversation and listening to concerns",
      "Assisting with reading newspapers, books, or tuning into favorite radio/audio",
      "Helping connect video calls to family members on the smartphone",
    ],
    whatNotIncluded: [
      "Giving medical advice or prognosis opinions",
    ],
    availability: "Available for day shifts and evening hours",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "hospital-attendants",
    startingPrice: 1399,
    pricingUnit: "day",
  },
  {
    id: "hosp-admission-discharge",
    name: "Hospital admission and discharge assistance",
    categoryId: "hospital-assistance",
    shortDesc: "Navigating billing paperwork, wheelchair assisted travel, and safe transition home.",
    description:
      "Handling the physically draining logistics of hospital admissions and discharge days: pharmacy lines, discharge summary collection, wheelchair assisted travel, and transport into the home bed.",
    intendedCustomer: "Families overwhelmed by hospital discharge formalities and elder transport.",
    keyBenefits: [
      "Streamlines paperwork queues while patient rests comfortably",
      "Safe, supported wheelchair assisted travel to the car",
      "Settles the patient comfortably into their home bed upon arrival",
    ],
    whatIncluded: [
      "Standing in pharmacy queues and billing counters with family",
      "Packing and double-checking patient belongings in the room",
      "Wheelchair transfer from hospital room to car door",
      "Accompanying the ride home and settling patient in bed with fresh linens",
    ],
    whatNotIncluded: [
      "Financial loan underwriting or medical insurance dispute resolution",
    ],
    availability: "Bookable as a dedicated single-day 6-8 hour transition service",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "hospital-attendants",
    startingPrice: 1499,
    pricingUnit: "day",
  },
  {
    id: "hosp-mobility-wheelchair",
    name: "Mobility and wheelchair assistance",
    categoryId: "hospital-assistance",
    shortDesc: "Safe wheelchair propulsion, diagnostic lab transfers, and corridor guidance.",
    description:
      "Navigating sprawling hospital campuses, radiology suites, MRI rooms, and diagnostic labs smoothly without making frail patients walk long distances.",
    intendedCustomer: "Patients attending outpatient diagnostic procedures, dialysis, or chemotherapy.",
    keyBenefits: [
      "Eliminates physical fatigue for weak or breathless patients",
      "Familiarity with hospital ramp navigation and elevator queues",
      "Patient stays safely seated and accompanied at all times",
    ],
    whatIncluded: [
      "Propelling hospital wheelchairs smoothly and safely",
      "Assisting patient onto exam tables with hospital technicians",
      "Holding bags, water bottles, and diagnostic file folders",
    ],
    whatNotIncluded: [
      "Handling diagnostic radiological equipment",
    ],
    availability: "Available in 4-hour visit blocks or full-day coverage",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "hospital-attendants",
    startingPrice: 1199,
    pricingUnit: "day",
  },
  {
    id: "hosp-visit-escorts",
    name: "Hospital visit assisted travel",
    categoryId: "hospital-assistance",
    shortDesc: "Accompanying elderly patients from home to outpatient doctor appointments.",
    description:
      "Meeting the senior at home, accompanying them in a cab to the hospital, waiting together through the doctor's queue, taking notes, and bringing them safely back home.",
    intendedCustomer: "Seniors with routine follow-ups whose adult children cannot take time off work.",
    keyBenefits: [
      "Senior never faces confusing hospital OPDs alone",
      "Clear written summary of doctor's instructions texted to family",
      "Safe doorstep-to-doorstep accompaniment",
    ],
    whatIncluded: [
      "Home pickup and accompanying ride to the clinic",
      "Registration token collection and waiting in consultation lobby",
      "Note-taking of doctor recommendations and prescription purchase",
      "Accompanied return trip and settling elder safely at home",
    ],
    whatNotIncluded: [
      "Making medical treatment decisions without family authorization",
    ],
    availability: "4-hour and 8-hour appointment slots available daily",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "hospital-attendants",
    startingPrice: 1299,
    pricingUnit: "day",
  },
  {
    id: "hosp-non-medical-support",
    name: "Non-medical patient support",
    categoryId: "hospital-assistance",
    shortDesc: "Assisting with dining, oral fluids, phone charging, and personal comfort in wards.",
    description:
      "Attendants focusing on the essential human comforts that busy hospital nursing staff rarely have time for: cutting fruit, pouring water, washing hands, and staying attentive.",
    intendedCustomer: "Inpatients admitted in shared or semi-private hospital rooms.",
    keyBenefits: [
      "Patient is treated with individual warmth and prompt dignity",
      "Frees nurses to focus on clinical and intravenous care",
      "Ensures the patient stays clean, warm, and comfortable",
    ],
    whatIncluded: [
      "Assisting with eating hospital diet meals and warm water sips",
      "Hand washing, oral rinses, and wiping face with warm washcloths",
      "Plugging in phone chargers and adjusting room air/blankets",
    ],
    whatNotIncluded: [
      "Administering prescription injections or medical dressings",
    ],
    availability: "Available on all hospital shift bookings",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "hospital-attendants",
    startingPrice: 1399,
    pricingUnit: "day",
  },
  {
    id: "hosp-post-discharge-home",
    name: "Post-discharge assistance at home",
    categoryId: "hospital-assistance",
    shortDesc: "Continuing hospital-grade care routines seamlessly at the patient's home.",
    description:
      "The same calm, structured bedside vigil transferred directly to the home bedroom following discharge, preventing relapse, bedsores, or medication errors.",
    intendedCustomer: "Patients returning home after major surgery or long illness.",
    keyBenefits: [
      "Smooth continuum of care without sudden drop in support",
      "Family learns safe transfer and recovery methods from attendant",
      "Daily digital wellness logs and temperature/vitals tracking",
    ],
    whatIncluded: [
      "Organizing bedside table with water, bell, and medicines",
      "Assisting with sponge baths and comfortable sleep positioning",
      "Scheduled mobility walking and light recovery meals",
    ],
    whatNotIncluded: [
      "Emergency acute resuscitation (call 112 / 108 immediately for acute emergencies)",
    ],
    availability: "Available immediately for 1 to 4 weeks post-discharge",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "home-personal-care",
    startingPrice: 1299,
    pricingUnit: "day",
  },

  // ==========================================
  // Category C: Travel Assistance
  // ==========================================
  {
    id: "trv-women-companions",
    name: "Women travel companions",
    categoryId: "travel-assistance",
    shortDesc: "Vetted female companions accompanying solo female travelers, seniors, or mothers.",
    description:
      "Background-checked women companions providing reassuring presence, luggage management, and travel coordination for peaceful journeys across South India.",
    intendedCustomer: "Solo women travelers, elderly mothers travelling to visit relatives, or women travelling for exams.",
    keyBenefits: [
      "Reassuring companion presence throughout the entire journey",
      "Help handling bulky luggage and navigation through stations",
      "Continuous journey check-ins shared with designated family contacts",
    ],
    whatIncluded: [
      "Doorstep meeting and continuous travel companionship",
      "Handling bags, security check coordination, and seating assistance",
      "Emergency coordination if journeys encounter delays or cancellations",
    ],
    whatNotIncluded: [
      "Armed security protection (companions provide watchful logistics and safety presence, not armed force)",
    ],
    availability: "Single-day transit, multi-day outstation, and round trips",
    providerType: "Trained Travel Companion",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "travel-assistance",
    startingPrice: 1599,
    pricingUnit: "day",
  },
  {
    id: "trv-railway-assistance",
    name: "Railway station assistance",
    categoryId: "travel-assistance",
    shortDesc: "Station concourse meet, licensed porter coordination, and coach berth seating.",
    description:
      "Trained station companions who meet passengers at railway station gates, guide them through security and foot overbridges, coordinate coolies, and settle them into train berths.",
    intendedCustomer: "Seniors, mothers with young children, or solo travelers boarding busy railway junctions.",
    keyBenefits: [
      "Eliminates the stress and confusion of crowded railway platforms",
      "Prevents rush-hour falls on stairs and foot overbridges",
      "Photo confirmation of elder safely seated sent to family",
    ],
    whatIncluded: [
      "Meet-and-greet at designated station concourse",
      "Train arrival and platform number verification",
      "Porter coordination and baggage assisted travel to the coach",
      "Settling passenger safely into berth with luggage secured",
    ],
    whatNotIncluded: [
      "Purchasing unreserved railway tickets or booking train tatkal quotas",
    ],
    availability: "24/7 across major junction stations in Bengaluru, Chennai, Hyderabad, Coimbatore",
    providerType: "Trained Travel Companion",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "railway-assistance",
    startingPrice: 899,
    pricingUnit: "trip",
  },
  {
    id: "trv-bus-terminal",
    name: "Bus terminal assistance",
    categoryId: "travel-assistance",
    shortDesc: "Intercity bus terminal meet-and-greet, bay navigation, and boarding assisted travel.",
    description:
      "Navigating crowded intercity bus stands (e.g. Majestic in Bengaluru, CMBT in Chennai, MGBS in Hyderabad), finding correct boarding bays, and ensuring safe seating.",
    intendedCustomer: "Elderly passengers and solo women taking intercity private or KSRTC/SETC buses.",
    keyBenefits: [
      "Avoids missing buses due to platform confusion",
      "Help carrying heavy luggage to the bus baggage hold",
      "Live update dispatched to family once the bus departs",
    ],
    whatIncluded: [
      "Meeting traveler at terminal entry or taxi stand",
      "Confirming operator bay and bus registration number",
      "Assisting passenger onto the bus and into reserved seat",
    ],
    whatNotIncluded: [
      "Driving the commercial omnibus vehicle",
    ],
    availability: "Available for scheduled morning, evening, and late-night bus departures",
    providerType: "Trained Travel Companion",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "travel-assistance",
    startingPrice: 899,
    pricingUnit: "trip",
  },
  {
    id: "trv-intercity-travel",
    name: "Intercity travel assistance",
    categoryId: "travel-assistance",
    shortDesc: "Accompanied round-trip or one-way travel across cities via train, flight, or car.",
    description:
      "A dedicated female companion travels the entire journey with the passenger—from their front door in one city to the doorstep of their destination in another city.",
    intendedCustomer: "Elderly parents relocating between children's homes, or patients travelling for specialized medical care.",
    keyBenefits: [
      "Unbroken continuum of care and watchful supervision",
      "Assistance with meals, medications, and bathroom stops during travel",
      "Complete peace of mind for adult children who cannot take leave to travel",
    ],
    whatIncluded: [
      "Full journey accompaniment door-to-door",
      "Managing ticketing, boarding passes, and transit transfers",
      "Routine medication administration reminders during the journey",
      "Live GPS location sharing with family throughout",
    ],
    whatNotIncluded: [
      "Covering passenger travel ticket costs (booked separately by client)",
    ],
    availability: "Advance booking required (minimum 24-48 hours notice)",
    providerType: "Trained Travel Companion",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "travel-assistance",
    startingPrice: 1799,
    pricingUnit: "day",
  },
  {
    id: "trv-airport-coordination",
    name: "Airport pickup and drop-off coordination",
    categoryId: "travel-assistance",
    shortDesc: "Punctual home pickup, curb departure assisted travel, or arrival gate vehicle transfer.",
    description:
      "Coordinating timely airport transit in verified vehicles, helping load baggage, and ensuring passengers reach the departure terminal with ample buffer time.",
    intendedCustomer: "Travelers departing for early-morning flights or arriving late at night.",
    keyBenefits: [
      "Punctual arrival with zero last-minute taxi cancellation panic",
      "Assistance loading and unloading heavy suitcases",
      "Safe, vetted transportation directly to home doorstep",
    ],
    whatIncluded: [
      "Punctual arrival at residence and luggage handling",
      "Direct transit to departure curb with live trip tracking",
      "Wheelchair assistance coordination at airline counter if needed",
    ],
    whatNotIncluded: [
      "Passing through CISF security gates without a valid boarding pass",
    ],
    availability: "24 hours a day with scheduled advance booking",
    providerType: "Licensed Woman Driver / Chauffeuse",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "airport-pickup",
    startingPrice: 1199,
    pricingUnit: "trip",
  },
  {
    id: "trv-airport-meet-greet",
    name: "Airport meet-and-greet assistance",
    categoryId: "travel-assistance",
    shortDesc: "Terminal arrival greeting with name placard, trolley help, and curb assisted travel.",
    description:
      "A warm, verified female companion meets arriving passengers right at the airport arrival concourse with a personalized placard, manages the luggage trolley, and assists them safely to their car.",
    intendedCustomer: "Senior citizens flying in alone, NRI parents, or solo international travelers.",
    keyBenefits: [
      "Instant relief upon exiting the arrival gate into crowded terminals",
      "No struggling with heavy baggage trolleys",
      "Immediate photo check-in sent to waiting family",
    ],
    whatIncluded: [
      "Flight status tracking and monitoring for delays",
      "Meeting with personalized name placard at terminal exit",
      "Luggage trolley assistance and coordinating pickup vehicle",
      "Accompanied assisted travel to vehicle door with live status confirmation",
    ],
    whatNotIncluded: [
      "Airside customs clearance bypassing official regulations",
    ],
    availability: "Available round the clock at Bengaluru (BLR), Chennai (MAA), Hyderabad (HYD), Coimbatore (CJB)",
    providerType: "Trained Travel Companion",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "airport-pickup",
    startingPrice: 999,
    pricingUnit: "trip",
  },
  {
    id: "trv-senior-citizen-travel",
    name: "Senior citizen travel assistance",
    categoryId: "travel-assistance",
    shortDesc: "Paced, gentle travel support tailored for elders with mobility or hearing limits.",
    description:
      "Specialized companion travel honoring the slower pace, frequent rest breaks, and medication schedules essential for senior citizens undertaking journeys.",
    intendedCustomer: "Elderly travelers who find modern airports and transit hubs physically overwhelming.",
    keyBenefits: [
      "Unhurried, patient travel pace preventing disorientation or stress",
      "Regular hydration and timely medication reminders",
      "Wheelchair coordination at every transit junction",
    ],
    whatIncluded: [
      "Door-to-door physical accompaniment throughout the journey",
      "Assistance with security trays, walking canes, and boarding lines",
      "Continuous family communication with photo updates",
    ],
    whatNotIncluded: [
      "Clinical medical emergencies on board (airline/railway emergency protocols apply)",
    ],
    availability: "Available for flights, trains, and intercity road journeys",
    providerType: "Trained Travel Companion",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "travel-assistance",
    startingPrice: 1599,
    pricingUnit: "day",
  },
  {
    id: "trv-luggage-terminal-navigation",
    name: "Luggage and terminal navigation assistance",
    categoryId: "travel-assistance",
    shortDesc: "Hands-on help maneuvering baggage and navigating gates, elevators and customs.",
    description:
      "Physical and navigational assistance through cavernous airports and train junctions, ensuring travelers find the correct gates, elevators, and baggage carousels effortlessly.",
    intendedCustomer: "Travelers with multi-piece baggage, families with toddlers, or elders with joint pain.",
    keyBenefits: [
      "Takes the heavy lifting off the traveler's shoulders",
      "Navigates confusing multi-terminal connections smoothly",
      "Eliminates anxiety around terminal gate changes",
    ],
    whatIncluded: [
      "Maneuvering baggage trolleys and assisting at check-in counters",
      "Guiding through terminal elevators, escalators, and boarding gates",
      "Retrieving bags from baggage carousel belt upon arrival",
    ],
    whatNotIncluded: [
      "Transporting prohibited items or unattended baggage",
    ],
    availability: "Available at all supported airport and railway hubs",
    providerType: "Trained Travel Companion",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "airport-pickup",
    startingPrice: 899,
    pricingUnit: "trip",
  },
  {
    id: "trv-door-to-door",
    name: "Door-to-door travel assistance, where available",
    categoryId: "travel-assistance",
    shortDesc: "Continuous unbroken supervision from home doorstep to final destination.",
    description:
      "Our companion arrives at your front door, assists into the vehicle, accompanies the entire transit, and only departs once the passenger is safely inside the destination residence.",
    intendedCustomer: "Vulnerable individuals, patients travelling for treatment, or elders travelling solo.",
    keyBenefits: [
      "Zero gaps in safety or companionship from start to finish",
      "Family never worries about intermediate transfer confusion",
      "End-to-end trip verification logged by ApnaCare coordinators",
    ],
    whatIncluded: [
      "Home departure assistance and packing verification",
      "Assisted travel (cab, flight, train, bus)",
      "Arrival handover to family at destination address",
    ],
    whatNotIncluded: [
      "International flights requiring foreign visa clearance",
    ],
    availability: "Available in all active coverage metro hubs and regional corridors",
    providerType: "Trained Travel Companion",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "travel-assistance",
    startingPrice: 1899,
    pricingUnit: "day",
  },
  {
    id: "trv-hospital-escorts",
    name: "Hospital and appointment assisted travel",
    categoryId: "travel-assistance",
    shortDesc: "Accompanied transport to clinical consultations, lab tests, and eye checkups.",
    description:
      "A trusted companion picks up the client at home, accompanies them to medical consults or eye dilation appointments, waits through the visit, and ensures safe transit home.",
    intendedCustomer: "Patients undergoing eye surgery, dialysis, or routine doctor consultations.",
    keyBenefits: [
      "Essential support when vision is temporarily blurred from eye drops",
      "Accompaniment through clinic waiting rooms and pharmacy",
      "Safe vehicle transit back to home bed",
    ],
    whatIncluded: [
      "Pickup from residence and accompanied vehicle ride",
      "Guiding into doctor's consultation suite and holding reports",
      "Safe arm-in-arm walking assistance after procedures",
    ],
    whatNotIncluded: [
      "Providing clinical opinions or consenting to surgical procedures",
    ],
    availability: "Available daily in 4-hour and 8-hour appointment packages",
    providerType: "Trained Travel Companion",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "travel-assistance",
    startingPrice: 1299,
    pricingUnit: "day",
  },
  {
    id: "trv-journey-updates",
    name: "Journey updates to designated family members",
    categoryId: "travel-assistance",
    shortDesc: "Real-time milestone notifications and live GPS tracking for family reassurance.",
    description:
      "Continuous digital updates dispatched via WhatsApp to family members at each journey stage: departure, security clearance, boarding, mid-transit, and arrival confirmation.",
    intendedCustomer: "Working adult children or NRIs wanting continuous visibility over traveling parents.",
    keyBenefits: [
      "Eliminates frantic 'where are they now?' phone calls",
      "Live GPS tracking link accessible from any smartphone",
      "Photographic confirmation upon safe arrival",
    ],
    whatIncluded: [
      "Automated milestone check-ins (Departure, Boarding, Arrival)",
      "Secure WhatsApp live location sharing during ground transit",
      "Immediate alert if trains or flights face operational delays",
    ],
    whatNotIncluded: [
      "Public broadcasting of passenger location (strictly shared with authorized contacts)",
    ],
    availability: "Included as a standard feature across all travel assistance bookings",
    providerType: "Trained Travel Companion",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "travel-assistance",
    startingPrice: 1199,
    pricingUnit: "trip",
  },

  // ==========================================
  // Category D: Women's Mobility
  // ==========================================
  {
    id: "wm-car-sharing",
    name: "Women-only car-sharing coordination",
    categoryId: "womens-mobility",
    shortDesc: "Verified women-only shared commutes with screened drivers and trusted co-riders.",
    description:
      "Coordinating secure shared rides for female working professionals and students along verified transit corridors, with background-checked women drivers and verified passengers.",
    intendedCustomer: "Women commuting to IT corridors, tech parks, hospitals, and universities.",
    keyBenefits: [
      "Zero anxiety traveling with unvetted male strangers in cabs",
      "Affordable shared commuting rates without compromising dignity",
      "Verified co-passengers authenticated via government ID checks",
    ],
    whatIncluded: [
      "Matching with verified women travelers along matched route corridors",
      "Licensed female driver adhering to defensive driving standards",
      "Live vehicle tracking shared with client's emergency contacts",
    ],
    whatNotIncluded: [
      "Open public hailing without prior identity verification",
    ],
    availability: "Morning and evening commute slots along major tech and university corridors",
    providerType: "Licensed Woman Driver / Chauffeuse",
    isClinical: false,
    actionType: "request",
    mappedCoreServiceSlug: "women-drivers",
    startingPrice: 399,
    pricingUnit: "trip",
  },
  {
    id: "wm-travel-companions",
    name: "Women travel companions",
    categoryId: "womens-mobility",
    shortDesc: "Verified women companions for outstation trips, weekend travel, and solo journeys.",
    description:
      "Travel with confidence: experienced female companions accompanying solo women across cities, ensuring hotel check-in safety and local navigation assistance.",
    intendedCustomer: "Solo women traveling for conferences, interviews, family functions, or leisure.",
    keyBenefits: [
      "Confidence exploring new cities without vulnerability",
      "Accompanied check-ins at hotels and transit junctions",
      "24/7 coordination desk connection",
    ],
    whatIncluded: [
      "Accompanied travel on flights, trains, and intercity cabs",
      "Assistance with hotel verification and room safety checks",
      "Discrete presence respecting personal privacy",
    ],
    whatNotIncluded: [
      "Guaranteed personal immunity against unpredictable public civil events",
    ],
    availability: "Available for single-day or multi-day travel bookings",
    providerType: "Trained Travel Companion",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "travel-assistance",
    startingPrice: 1599,
    pricingUnit: "day",
  },
  {
    id: "wm-workplace-commute",
    name: "Workplace commute assistance",
    categoryId: "womens-mobility",
    shortDesc: "Dedicated women chauffeurs for daily office commutes and late shift departures.",
    description:
      "Punctual, background-checked women drivers for your personal car or company vehicle, providing safe, relaxing daily commutes to work and back.",
    intendedCustomer: "Female corporate executives, IT professionals, and healthcare workers.",
    keyBenefits: [
      "Reliable daily arrival with zero driver cancellation stress",
      "Relax, take calls, or work comfortably in the back seat",
      "Thoroughly vetted drivers with clean police and driving records",
    ],
    whatIncluded: [
      "Daily doorstep vehicle pickup and safe route navigation",
      "Defensive driving adhering strictly to speed and safety laws",
      "Monthly package continuity with dedicated assigned driver",
    ],
    whatNotIncluded: [
      "Vehicle fuel and toll expenses (borne by client)",
    ],
    availability: "Available on monthly retainers, daily 8-hr shifts, or 4-hr split commute blocks",
    providerType: "Licensed Woman Driver / Chauffeuse",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "women-drivers",
    startingPrice: 1199,
    pricingUnit: "day",
  },
  {
    id: "wm-personal-safety-escorts",
    name: "Personal safety assisted travel",
    categoryId: "womens-mobility",
    shortDesc: "Vetted women security companions trained in situational awareness and assisted travel protection.",
    description:
      "Discreet, disciplined female security attendants providing physical accompaniment and vigilance for women attending high-density events or navigating sensitive situations.",
    intendedCustomer: "Women attending public appearances, high-profile events, or court proceedings.",
    keyBenefits: [
      "Heightened situational awareness and perimeter observation",
      "Discreet and professional presence without drawing unwanted attention",
      "Direct link to ApnaCare emergency command center",
    ],
    whatIncluded: [
      "Continuous close assisted travel during event or transit",
      "Advance venue reconnaissance and safe exit path planning",
      "Emergency de-escalation protocols",
    ],
    whatNotIncluded: [
      "Use of unauthorized lethal force or armed vigilantism",
    ],
    availability: "Hourly event blocks (minimum 4 hours) or full 12-hour protection details",
    providerType: "Trained Travel Companion",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "security-support",
    startingPrice: 1899,
    pricingUnit: "day",
  },
  {
    id: "wm-appointment-shopping",
    name: "Appointment and shopping assisted travel",
    categoryId: "womens-mobility",
    shortDesc: "Accompanying women during marketplace shopping, banking, and personal errands.",
    description:
      "A friendly, reliable female companion to accompany you through crowded shopping districts, jewelry showrooms, bank visits, and lifestyle appointments.",
    intendedCustomer: "Women who prefer company during errands or carrying shopping bags safely.",
    keyBenefits: [
      "Extra pair of hands for packages, shopping bags, and parking",
      "Warm company making routine errands pleasant",
      "Safe, watchful companion presence in busy bazaars",
    ],
    whatIncluded: [
      "Meeting at residence or mall entrance",
      "Assistance carrying parcels and navigating shopping crowds",
      "Waiting during appointments and salon/clinic visits",
    ],
    whatNotIncluded: [
      "Conducting financial transactions or signing legal documents",
    ],
    availability: "Available in flexible 4-hour and 8-hour day packages",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "lifestyle-support",
    startingPrice: 899,
    pricingUnit: "day",
  },
  {
    id: "wm-event-accompaniment",
    name: "Event accompaniment",
    categoryId: "womens-mobility",
    shortDesc: "Discreet companion support for weddings, corporate galas, and social functions.",
    description:
      "Professional female attendants providing dependable accompaniment, assistance with elaborate attire/jewelry, and safe return transit after evening social functions.",
    intendedCustomer: "Women attending evening weddings, family galas, or awards ceremonies.",
    keyBenefits: [
      "Safe, verified companion ensuring you never travel to/from events alone",
      "Assistance with wardrobe, purse holding, and personal comfort",
      "Punctual departure assisted travel once the event concludes",
    ],
    whatIncluded: [
      "Accompaniment from doorstep to event venue",
      "Assistance during the event according to client preferences",
      "Confirmed safe vehicle return transit to home doorstep",
    ],
    whatNotIncluded: [
      "Serving food or beverages to general event guests",
    ],
    availability: "Evening and weekend event slots (4 to 8 hours)",
    providerType: "Trained Travel Companion",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "lifestyle-support",
    startingPrice: 1299,
    pricingUnit: "day",
  },
  {
    id: "wm-late-evening-travel",
    name: "Late-evening travel accompaniment, subject to availability",
    categoryId: "womens-mobility",
    shortDesc: "Verified accompaniment for late-night airport returns, night shifts, and transits.",
    description:
      "Ensuring that women returning late at night from flights, hospital shifts, or work are met by a trusted female attendant who rides along until home entry is secure.",
    intendedCustomer: "Women arriving on late-night flights or departing late from hospital/IT shifts.",
    keyBenefits: [
      "Eliminates fear of isolated roads and late-night cab transits",
      "Attendant remains until client is safely inside their residence",
      "Live GPS sharing with designated emergency contacts",
    ],
    whatIncluded: [
      "Meeting at pickup point and riding inside vehicle together",
      "Walking client right to the door of apartment or home",
      "Verifying client is safely indoors before companion departs",
    ],
    whatNotIncluded: [
      "Guaranteed instant on-demand dispatch (requires advance scheduled booking)",
    ],
    availability: "Subject to verified attendant night shift scheduling (advance booking required)",
    providerType: "Trained Travel Companion",
    isClinical: false,
    actionType: "request",
    mappedCoreServiceSlug: "travel-assistance",
    startingPrice: 1199,
    pricingUnit: "trip",
  },
  {
    id: "wm-verified-companion-booking",
    name: "Verified companion booking",
    categoryId: "womens-mobility",
    shortDesc: "On-demand booking of 100% police-verified and ID-authenticated women companions.",
    description:
      "Transparent booking system connecting women with verified female companions whose Aadhaar, police records, address proof, and credentials have been verified by ApnaCare.",
    intendedCustomer: "Women seeking authentic, verified companion support without agency ambiguity.",
    keyBenefits: [
      "100% biometric and police background verification",
      "Digital credential profile shared before service confirmation",
      "Zero commission middlemen or undisclosed charges",
    ],
    whatIncluded: [
      "Digital profile review with photo, languages, and experience",
      "Direct coordinator dispatch with confirmed SLA",
      "Statutory tax invoice with GST breakdown",
    ],
    whatNotIncluded: [
      "Unverified third-party freelance marketplace listings",
    ],
    availability: "Available daily across all active operating clusters",
    providerType: "Trained Travel Companion",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "travel-assistance",
    startingPrice: 1099,
    pricingUnit: "day",
  },
  {
    id: "wm-family-emergency-contact",
    name: "Family or emergency contact coordination",
    categoryId: "womens-mobility",
    shortDesc: "Dedicated protocol connecting journeys with client emergency networks.",
    description:
      "Every journey and mobility booking integrates an active emergency contact protocol: designated family members receive automated trip milestones and direct hotline escalation access.",
    intendedCustomer: "Families of working women and solo travelers wanting dependable emergency coordination.",
    keyBenefits: [
      "Designated emergency contacts receive instant trip status alerts",
      "Direct line to regional operations control desk",
      "Documented escalation pathway if unexpected route diversions occur",
    ],
    whatIncluded: [
      "Recording up to two verified emergency contact numbers per booking",
      "Dispatching vehicle details, driver name, and live GPS link",
      "Immediate alert if vehicle remains stationary unexpectedly",
    ],
    whatNotIncluded: [
      "Replacing official 112 police emergency dispatch services",
    ],
    availability: "Standard protocol included in all women's mobility bookings",
    providerType: "Licensed Woman Driver / Chauffeuse",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "women-drivers",
    startingPrice: 1199,
    pricingUnit: "trip",
  },

  // ==========================================
  // Category E: Family Support
  // ==========================================
  {
    id: "fam-temporary-household",
    name: "Temporary household assistance",
    categoryId: "family-support",
    shortDesc: "Reliable extra hands for organizing living spaces and light domestic routines.",
    description:
      "Short-term domestic support helping busy households regain order during transitions, illnesses, or high-stress periods with trusted, respectful female assistants.",
    intendedCustomer: "Working couples, individuals recovering from illness, and busy family households.",
    keyBenefits: [
      "Relieves daily household clutter and domestic friction",
      "Respectful assistance honoring household customs",
      "Flexible hourly or daily scheduling",
    ],
    whatIncluded: [
      "Tidying living areas, organizing cupboards, and folding laundry",
      "Assisting with kitchen organization and grocery sorting",
      "Light daily upkeep to maintain a clean, peaceful living environment",
    ],
    whatNotIncluded: [
      "Heavy industrial cleaning or exterior window washing",
    ],
    availability: "Available for 4-hour, 6-hour, or 8-hour day shifts",
    providerType: "Family Care & Childcare Assistant",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "home-personal-care",
    startingPrice: 999,
    pricingUnit: "day",
  },
  {
    id: "fam-meal-prep",
    name: "Meal preparation assistance",
    categoryId: "family-support",
    shortDesc: "Wholesome home cooking assistance, vegetable chopping, and dietary support.",
    description:
      "Experienced kitchen assistants who prepare nutritious, hygienic vegetarian and non-vegetarian home-style meals according to your family's dietary preferences.",
    intendedCustomer: "Households balancing hectic office hours with elderly parents or growing children.",
    keyBenefits: [
      "Fresh, home-cooked food reducing reliance on unhealthy takeaway food",
      "Strict kitchen hygiene and food safety standards",
      "Customized to low-sodium, diabetic, or sattvic diet requirements",
    ],
    whatIncluded: [
      "Vegetable washing, peeling, and cutting",
      "Cooking fresh rotis, rice, dal, curries, and healthy soups",
      "Wiping kitchen countertops and organizing stored meals",
    ],
    whatNotIncluded: [
      "Catering for large commercial parties or banquet events",
    ],
    availability: "Available for morning, evening, or full-day culinary assistance",
    providerType: "Family Care & Childcare Assistant",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "home-personal-care",
    startingPrice: 899,
    pricingUnit: "day",
  },
  {
    id: "fam-childcare-babysitting",
    name: "Childcare and babysitting, subject to appropriate screening and safeguarding",
    categoryId: "family-support",
    shortDesc: "Vetted childcare attendants providing safe, engaging supervision for children.",
    description:
      "Screened female childcare companions providing attentive care, creative play, mealtime supervision, and homework company while parents work or attend commitments.",
    intendedCustomer: "Working parents and nuclear families needing dependable, background-checked childcare.",
    keyBenefits: [
      "Peace of mind knowing your child is supervised by a vetted caregiver",
      "Engaging screen-free play, reading, and storytelling",
      "Strict child safeguarding protocols and zero corporal punishment",
    ],
    whatIncluded: [
      "Attentive supervision and safe play monitoring",
      "Assisting with children's meals, snacks, and nap routines",
      "School bag packing, light homework company, and park outings",
    ],
    whatNotIncluded: [
      "Solo unsupervised custody of infants under 6 months without parental proximity",
    ],
    availability: "Subject to caregiver child-safeguarding certification and advance scheduling",
    providerType: "Family Care & Childcare Assistant",
    isClinical: false,
    actionType: "request",
    mappedCoreServiceSlug: "home-personal-care",
    startingPrice: 1099,
    pricingUnit: "day",
  },
  {
    id: "fam-caregiver-respite",
    name: "Family caregiver respite",
    categoryId: "family-support",
    shortDesc: "Scheduled relief so primary family caregivers can recharge and prevent burnout.",
    description:
      "When a family member provides round-the-clock care for a sick relative, our trained caregiver steps in for regular weekly breaks, restoring emotional stamina.",
    intendedCustomer: "Spouses, daughters, and sons who are primary unpaid caregivers at home.",
    keyBenefits: [
      "Essential emotional reset preventing caregiver depression and exhaustion",
      "Care recipient continues to receive competent, patient assistance",
      "Flexible half-day, full-day, or weekend scheduling",
    ],
    whatIncluded: [
      "Taking over daily caregiving routines (meals, mobility, company)",
      "Detailed briefing handover before caregiver departs",
      "Emergency contact channel open throughout coverage",
    ],
    whatNotIncluded: [
      "Permanent custodial substitution without family involvement",
    ],
    availability: "Available for recurring weekly slots or multi-day coverage",
    providerType: "General Duty Assistant (Attendant)",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "elderly-care",
    startingPrice: 1299,
    pricingUnit: "day",
  },
  {
    id: "fam-short-term-assistance",
    name: "Short-term home assistance",
    categoryId: "family-support",
    shortDesc: "Flexible coverage for sudden family illness, transitions, or visiting guests.",
    description:
      "Fast-response temporary assistance when your regular domestic helper is on leave, an unexpected family illness occurs, or family guests arrive.",
    intendedCustomer: "Households facing sudden domestic gaps or temporary family transitions.",
    keyBenefits: [
      "Bridging unexpected emergencies without locked long-term contracts",
      "Fast matching through regional attendant clusters",
      "Pay solely for the days you need",
    ],
    whatIncluded: [
      "Daily home routine support and elder assistance",
      "Errand running and light meal accompaniment",
      "Flexible daily extension based on household need",
    ],
    whatNotIncluded: [
      "Unilateral contract termination without required shift notice",
    ],
    availability: "Bookable for 1 to 14 day short-term stints",
    providerType: "Family Care & Childcare Assistant",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "home-personal-care",
    startingPrice: 1199,
    pricingUnit: "day",
  },
  {
    id: "fam-recurring-scheduled",
    name: "Recurring scheduled assistance",
    categoryId: "family-support",
    shortDesc: "Consistent weekly or monthly caregiver schedules for stable household balance.",
    description:
      "Assigning the same verified attendant on fixed weekly days (e.g. Mon/Wed/Fri mornings) for routine domestic accompaniment, grocery runs, and elder companion care.",
    intendedCustomer: "Families seeking predictable, long-term assistance routines.",
    keyBenefits: [
      "Consistent, familiar caregiver who understands your household habits",
      "Discounted monthly retainer pricing",
      "Automatic backup replacement if your assigned attendant falls ill",
    ],
    whatIncluded: [
      "Fixed recurring calendar schedule",
      "Dedicated primary caregiver with verified regional backup",
      "Consolidated monthly GST tax billing",
    ],
    whatNotIncluded: [
      "Unpredictable on-the-spot schedule changes without coordinator notice",
    ],
    availability: "Available across all active city hubs with monthly contracts",
    providerType: "Family Care & Childcare Assistant",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "home-personal-care",
    startingPrice: 999,
    pricingUnit: "day",
  },
  {
    id: "fam-errands-accompaniment",
    name: "Personal errands and accompaniment",
    categoryId: "family-support",
    shortDesc: "Help with grocery trips, utility payments, pharmacy collections, and social outings.",
    description:
      "A trustworthy assistant to run local errands, fetch medicines, accompany you to local markets, or assist active family elders with routine community outings.",
    intendedCustomer: "Busy professionals, seniors who need an extra hand, or convalescing individuals.",
    keyBenefits: [
      "Saves hours of valuable personal time every week",
      "Safe, accompanied visits to markets and offices",
      "Reliable receipt collection and expense documentation",
    ],
    whatIncluded: [
      "Accompanying to banks, post offices, pharmacies, and grocery stores",
      "Carrying heavy shopping bags and walking alongside",
      "Assisting elders with digital smartphone tasks and payments",
    ],
    whatNotIncluded: [
      "Handling personal banking PINs or unauthorized financial accounts",
    ],
    availability: "Available in 3-hour, 6-hour, and full-day errand packages",
    providerType: "Family Care & Childcare Assistant",
    isClinical: false,
    actionType: "book",
    mappedCoreServiceSlug: "lifestyle-support",
    startingPrice: 799,
    pricingUnit: "day",
  },

  // ==========================================
  // Category F: Business and Institutional Services
  // ==========================================
  {
    id: "biz-hospital-staffing",
    name: "Hospital attendant staffing partnerships",
    categoryId: "business-institutional",
    shortDesc: "Vetted non-clinical bedside attendant pools for private hospitals and nursing homes.",
    description:
      "Providing NABH-compliant hospital wards with trained, background-checked female General Duty Assistants (GDAs) for patient bedside vigils, reducing nurse burnout.",
    intendedCustomer: "Hospital administrators, nursing superintendents, and private clinic networks.",
    keyBenefits: [
      "Pre-vetted, police-cleared attendant workforce with hospital protocol training",
      "SLA-backed replacement guarantees and flexible shift rosters",
      "Full compliance with labor laws and institutional safety standards",
    ],
    whatIncluded: [
      "Dedicated institutional account manager and roster coordinator",
      "Uniformed attendants with photo biometric smart ID badges",
      "Monthly SLA compliance reports and centralized institutional billing",
    ],
    whatNotIncluded: [
      "Providing Registered Nurses for ICU / surgical theaters without medical licensing",
    ],
    availability: "Custom corporate SLA across Bengaluru, Chennai, Hyderabad, Coimbatore",
    providerType: "Institutional Partnership Lead",
    isClinical: false,
    actionType: "business_enquiry",
    pricingUnit: "custom",
  },
  {
    id: "biz-employee-caregiving",
    name: "Employee caregiving support",
    categoryId: "business-institutional",
    shortDesc: "Corporate wellness caregiving benefits supporting employees with elderly parents or babies.",
    description:
      "Partnering with progressive employers to offer subsidized home elder care, emergency post-op assistance, and postnatal support as an employee wellness benefit.",
    intendedCustomer: "Corporate HR leaders, employee wellness committees, and IT/consulting firms.",
    keyBenefits: [
      "Significantly reduces employee absenteeism and caregiving-induced turnover",
      "Attracts and retains senior female talent balancing care duties",
      "Seamless digital booking portal tailored for employees",
    ],
    whatIncluded: [
      "Custom company benefit landing page or corporate promo integration",
      "Subsidized or enterprise-sponsored care vouchers",
      "Quarterly wellness utilization and impact reporting",
    ],
    whatNotIncluded: [
      "Disclosing confidential employee medical data to employer",
    ],
    availability: "Available nationwide for corporate employee groups",
    providerType: "Institutional Partnership Lead",
    isClinical: false,
    actionType: "business_enquiry",
    pricingUnit: "custom",
  },
  {
    id: "biz-corporate-travel",
    name: "Corporate travel assistance",
    categoryId: "business-institutional",
    shortDesc: "Safe transit, chauffeuses, and terminal assisted travel for visiting female executives and delegates.",
    description:
      "Verified travel companions and professional women chauffeurs ensuring female executives, international delegates, and VIP clients travel safely across city appointments.",
    intendedCustomer: "Corporate travel desks, MNC administrative teams, and event organizers.",
    keyBenefits: [
      "Demonstrates high corporate duty-of-care for traveling female executives",
      "Punctual, vetted drivers with clean luxury vehicle options",
      "Direct GPS tracking and billing through corporate expense accounts",
    ],
    whatIncluded: [
      "Airport meet-and-greet with company placard",
      "Full-day chauffeur service adhering to strict confidentiality agreements",
      "Detailed trip receipts and corporate GST invoicing",
    ],
    whatNotIncluded: [
      "Armed close protection without specialized PSARA license agreement",
    ],
    availability: "Available on corporate retainer or on-demand advance booking",
    providerType: "Institutional Partnership Lead",
    isClinical: false,
    actionType: "business_enquiry",
    pricingUnit: "custom",
  },
  {
    id: "biz-women-commute-programs",
    name: "Women employee commute programmes",
    categoryId: "business-institutional",
    shortDesc: "Safe evening commutes and chauffeuse networks for women working late shifts.",
    description:
      "Turnkey safe transit programmes for BPO, healthcare, and IT companies operating night or rotational shifts, providing vetted female drivers and assisted travel companions.",
    intendedCustomer: "Enterprises with evening/night shifts prioritizing POSH and women safety compliance.",
    keyBenefits: [
      "100% compliance with statutory state guidelines for women night workers",
      "Verified drop-to-doorstep protocol with trip completion confirmation",
      "Dedicated corporate control room monitoring all active vehicles",
    ],
    whatIncluded: [
      "Scheduled fleet or dedicated chauffeuse routing",
      "Security companion assisted travel for the last mile to doorstep",
      "Real-time corporate dashboard tracking employee drop confirmations",
    ],
    whatNotIncluded: [
      "Unregistered third-party freelance cab dispatching",
    ],
    availability: "Contracted corporate commute routes with custom SLAs",
    providerType: "Institutional Partnership Lead",
    isClinical: false,
    actionType: "business_enquiry",
    pricingUnit: "custom",
  },
  {
    id: "biz-institutional-partnerships",
    name: "Institutional care partnerships",
    categoryId: "business-institutional",
    shortDesc: "Strategic collaborations with diagnostic chains, rehabilitation centers, and senior living.",
    description:
      "Partnering with senior living communities, retirement villas, and orthopedic clinics to provide integrated on-campus or home-transition care attendant solutions.",
    intendedCustomer: "Retirement communities, diagnostic chains, geriatric centers, and orthopedic hospitals.",
    keyBenefits: [
      "Extends healthcare partner's service boundary directly into the patient's home",
      "Seamless discharge transition reducing 30-day readmissions",
      "Co-branded patient care literature and shared clinical protocols",
    ],
    whatIncluded: [
      "Dedicated liaison coordinator embedded with partner staff",
      "Custom training modules aligned with institution's clinical preferences",
      "Regular clinical coordination reviews",
    ],
    whatNotIncluded: [
      "Sharing liability for hospital's independent internal malpractice",
    ],
    availability: "Active across South India healthcare networks",
    providerType: "Institutional Partnership Lead",
    isClinical: false,
    actionType: "business_enquiry",
    pricingUnit: "custom",
  },
  {
    id: "biz-bulk-bookings",
    name: "Bulk service bookings",
    categoryId: "business-institutional",
    shortDesc: "Volume-discounted attendant packages for large events, conferences, or long-term care.",
    description:
      "Structured bulk packages for organizations requiring multiple attendants simultaneously—for medical conferences, large family weddings, or multi-month institutional contracts.",
    intendedCustomer: "Event management companies, wedding planners, corporate foundations, and NGOs.",
    keyBenefits: [
      "Volume-discounted pricing tiers with dedicated supervision",
      "Single-point operational coordinator managing all assigned personnel",
      "Guaranteed simultaneous staffing with matched skillsets",
    ],
    whatIncluded: [
      "Multi-attendant dispatch with on-site supervisor",
      "Centralized attendance and performance logging",
      "Single master invoice with flexible credit payment terms",
    ],
    whatNotIncluded: [
      "Unplanned last-minute volume expansions exceeding contracted quota",
    ],
    availability: "Requires advance reservation (minimum 7-14 days prior to event)",
    providerType: "Institutional Partnership Lead",
    isClinical: false,
    actionType: "business_enquiry",
    pricingUnit: "custom",
  },
  {
    id: "biz-referral-partnerships",
    name: "Referral partnerships",
    categoryId: "business-institutional",
    shortDesc: "Collaborative referral programs for doctors, physiotherapists, and medical social workers.",
    description:
      "Enabling doctors, healthcare professionals, and medical social workers to refer patients in need of verified non-medical care at home with transparent coordination updates.",
    intendedCustomer: "Consulting physicians, orthopedic surgeons, gynecologists, and medical social workers.",
    keyBenefits: [
      "Ensures discharged patients adhere to prescribed home rest and hygiene",
      "Transparent patient status feedback returned to referring doctor",
      "Fast priority onboarding for referred patient families",
    ],
    whatIncluded: [
      "Direct priority WhatsApp channel for referring doctors and social workers",
      "Prompt patient contact within 30 minutes of referral receipt",
      "Ethical, compliant healthcare partnership agreements",
    ],
    whatNotIncluded: [
      "Paying unlawful fee splits or commercial commissions that violate medical council ethics",
    ],
    availability: "Open to registered medical practitioners and accredited healthcare institutions",
    providerType: "Institutional Partnership Lead",
    isClinical: false,
    actionType: "business_enquiry",
    pricingUnit: "custom",
  },
];

export const CUSTOMER_ENTRY_POINTS: CustomerEntryPoint[] = [
  {
    id: "entry-elderly",
    question: "I need care for my elderly parent",
    targetCategoryId: "care-at-home",
    suggestedServiceId: "cah-elderly-companion",
    mappedCoreServiceSlug: "elderly-care",
    subtitle: "Companionship, medication reminders & daily living support with dignity.",
  },
  {
    id: "entry-patient",
    question: "I need assistance for a patient",
    targetCategoryId: "hospital-assistance",
    suggestedServiceId: "hosp-bedside-attendant",
    mappedCoreServiceSlug: "hospital-attendants",
    subtitle: "Dedicated bedside vigil and hospital stay coordination day and night.",
  },
  {
    id: "entry-surgery",
    question: "I need help after surgery",
    targetCategoryId: "care-at-home",
    suggestedServiceId: "cah-post-op-recovery",
    mappedCoreServiceSlug: "nursing-services",
    subtitle: "Safe mobilization, wound hygiene & recovery convalescence at home.",
  },
  {
    id: "entry-maternal",
    question: "I need support for my newborn or postnatal recovery",
    targetCategoryId: "care-at-home",
    suggestedServiceId: "cah-postnatal-mother",
    mappedCoreServiceSlug: "post-natal-care",
    subtitle: "Maternal convalescence, newborn oil bath & soothing night assistance.",
  },
  {
    id: "entry-travel-companion",
    question: "I need a travel companion",
    targetCategoryId: "travel-assistance",
    suggestedServiceId: "trv-women-companions",
    mappedCoreServiceSlug: "travel-assistance",
    subtitle: "Vetted female companions for outstation trips, family visits & solo journeys.",
  },
  {
    id: "entry-transit-hub",
    question: "I need airport or railway assistance",
    targetCategoryId: "travel-assistance",
    suggestedServiceId: "trv-airport-meet-greet",
    mappedCoreServiceSlug: "airport-pickup",
    subtitle: "Arrival meet-and-greet, luggage trolley handling & platform coach assisted travel.",
  },
  {
    id: "entry-women-mobility",
    question: "I need women-only travel or car-sharing assistance",
    targetCategoryId: "womens-mobility",
    suggestedServiceId: "wm-car-sharing",
    mappedCoreServiceSlug: "women-drivers",
    subtitle: "Licensed chauffeuses, safe tech corridors & verified shared commutes.",
  },
  {
    id: "entry-temporary-home",
    question: "I need temporary help at home",
    targetCategoryId: "family-support",
    suggestedServiceId: "fam-temporary-household",
    mappedCoreServiceSlug: "home-personal-care",
    subtitle: "Reliable short-term home support, meal prep & caregiver respite.",
  },
  {
    id: "entry-institutional",
    question: "I represent a hospital or organization",
    targetCategoryId: "business-institutional",
    suggestedServiceId: "biz-hospital-staffing",
    mappedCoreServiceSlug: "security-support",
    subtitle: "Hospital staffing, employee caregiving benefits & institutional partnerships.",
  },
];

/**
 * Helpers to query the catalogue
 */
export function getCatalogueServicesByCategory(catId: CatalogueCategoryId): CatalogueService[] {
  return CATALOGUE_SERVICES.filter((s) => s.categoryId === catId);
}

export function getCatalogueServiceById(serviceId: string): CatalogueService | undefined {
  return CATALOGUE_SERVICES.find((s) => s.id === serviceId);
}

export function getCatalogueCategoryById(catId: CatalogueCategoryId): CatalogueCategory | undefined {
  return CATALOGUE_CATEGORIES.find((c) => c.id === catId);
}
