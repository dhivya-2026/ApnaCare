/**
 * Senior Care Service Directory — Comprehensive Service Taxonomy
 *
 * Implements granular, evidence-based service catalog across 8 core categories (A through H)
 * with strict safety boundaries, provider distinctions (attendants vs. licensed nurses vs. physiotherapists),
 * verified operational capabilities, and transparent booking paths.
 */

export type SeniorCareCategoryId =
  | "daily-living"
  | "companionship"
  | "hospital-visits"
  | "home-nursing"
  | "doctors-therapy"
  | "post-hospital"
  | "dementia-specialised"
  | "mobility-transit";

export type SeniorCareProviderType =
  | "Trained General Duty Attendant (GDA)"
  | "Geriatric Personal Caregiver"
  | "Hospital Visit & Bedside Companion"
  | "Registered Nurse (GNM / B.Sc Nursing)"
  | "Licensed Physiotherapist (Partner Referral)"
  | "Registered Medical Specialist (External Coordination)"
  | "Verified Woman Chauffeur & Transit Escort";

export type ServiceAvailabilityStatus =
  | "VERIFIED_AVAILABLE"      // Standard operational capability with established rates
  | "ASSESSMENT_REQUIRED"     // Requires care desk intake review before confirmation
  | "PARTNER_COORDINATION";   // Coordinated through licensed external clinicians

export interface SeniorCareServiceItem {
  id: string;
  slug: string;
  name: string;
  categoryId: SeniorCareCategoryId;
  categoryLabel: string;
  categoryCode: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
  oneLiner: string;
  description: string;
  whoFor: string[];
  inclusions: string[];
  exclusions: string[];
  providerType: SeniorCareProviderType;
  providerRoleTag: "Non-Clinical Attendant" | "Clinical Nurse" | "Therapist / Doctor" | "Transit Escort";
  status: ServiceAvailabilityStatus;
  statusBadge: string;
  estimatedRate: string;
  baseBookingSlug: "elderly-care" | "hospital-attendants" | "nursing-services" | "travel-assistance" | "women-drivers";
  processSteps?: { step: number; title: string; detail: string }[];
  clinicalBoundaryNotice?: string;
  faqs: { q: string; a: string }[];
  featured?: boolean;
}

export interface SeniorCareCategoryInfo {
  id: SeniorCareCategoryId;
  code: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
  name: string;
  shortName: string;
  iconName: string;
  badge: string;
  description: string;
  primaryAudience: string;
  providerScopeNotice: string;
}

export const SENIOR_CARE_CATEGORIES: SeniorCareCategoryInfo[] = [
  {
    id: "daily-living",
    code: "A",
    name: "Daily Living & Personal Care",
    shortName: "Daily Living",
    iconName: "HeartHandshake",
    badge: "Personal Care",
    description: "Dignified, hands-on assistance with everyday hygiene, bathing, dressing, meal support, and safe indoor mobility.",
    primaryAudience: "Seniors with mobility limitations, joint stiffness, or weakness needing routine physical assistance at home.",
    providerScopeNotice: "Delivered by background-verified, patient-handling trained General Duty Attendants (non-clinical).",
  },
  {
    id: "companionship",
    code: "B",
    name: "Companionship & Independent Living",
    shortName: "Companionship",
    iconName: "Users",
    badge: "Social & Cognitive",
    description: "Meaningful social engagement, empathetic conversation, garden walks, errand accompaniment, and digital technology help.",
    primaryAudience: "Active seniors living alone or whose children live out of city/overseas wanting friendly, trusted interaction.",
    providerScopeNotice: "Delivered by vetted companionship attendants with elder communication and safety awareness skills.",
  },
  {
    id: "hospital-visits",
    code: "C",
    name: "Hospital Visits & Medical Appointments",
    shortName: "Hospital Visits",
    iconName: "Building2",
    badge: "Medical Escort",
    description: "Door-to-door accompaniment for outpatient appointments, OPD registration, diagnostic tests, waiting room vigil, and return travel.",
    primaryAudience: "Working adult children who cannot take leave for multi-hour routine doctor check-ups, scans, or blood collections.",
    providerScopeNotice: "Delivered by Hospital Visit Companions for navigation, waiting, and physical assistance. Companions do not interpret medical reports or give clinical advice.",
  },
  {
    id: "home-nursing",
    code: "D",
    name: "Home Nursing & Clinical Procedures",
    shortName: "Home Nursing",
    iconName: "Stethoscope",
    badge: "Clinical Care",
    description: "Hospital-grade clinical interventions including surgical wound dressings, injections, vitals monitoring, and catheter management.",
    primaryAudience: "Seniors requiring medical procedures prescribed by their treating physician under sterile nursing supervision.",
    providerScopeNotice: "Strictly delivered by licensed GNM or B.Sc registered nurses following a valid medical prescription.",
  },
  {
    id: "doctors-therapy",
    code: "E",
    name: "Doctors, Specialists & Home Therapy",
    shortName: "Therapy & Specialists",
    iconName: "Activity",
    badge: "Specialist Care",
    description: "Coordinated geriatric home visits, bedside physiotherapy, post-surgical rehabilitation, and clinical nutrition support.",
    primaryAudience: "Seniors recovering from fractures, stroke, or chronic illness requiring licensed therapist or doctor assessment at home.",
    providerScopeNotice: "Coordinated through licensed external clinical partners and registered physiotherapists following physician orders.",
  },
  {
    id: "post-hospital",
    code: "F",
    name: "Post-Hospital & Post-Surgical Recovery",
    shortName: "Post-Hospital",
    iconName: "ShieldAlert",
    badge: "Transitional Recovery",
    description: "Smooth hospital-to-home transition, post-op mobility vigil, fall-prevention transfers, and follow-up appointment tracking.",
    primaryAudience: "Seniors discharged after orthopaedic surgery, cardiac procedures, or acute admissions needing 2-6 weeks of convalescent support.",
    providerScopeNotice: "Structured recovery attendants and visiting registered nurses tailored to discharge summary guidelines.",
  },
  {
    id: "dementia-specialised",
    code: "G",
    name: "Dementia, Memory & Specialised Care",
    shortName: "Memory & Dementia",
    iconName: "Brain",
    badge: "Specialised Protocol",
    description: "Patient, de-escalating daily living support, structured memory routines, sundowning supervision, and wandering prevention.",
    primaryAudience: "Elders living with Mild Cognitive Impairment, Alzheimer's disease, Parkinson's disease, or stroke-induced deficits.",
    providerScopeNotice: "Assigned to dementia-trained senior caregivers with calm de-escalation skills and customized intake assessment.",
  },
  {
    id: "mobility-transit",
    code: "H",
    name: "Mobility, Transportation & Escort",
    shortName: "Mobility & Escort",
    iconName: "Car",
    badge: "Safe Transit",
    description: "Doorstep wheelchair assistance, accompanied cab transit, station and airport platform meet-and-greets with live GPS tracking.",
    primaryAudience: "Seniors needing trustworthy escort for essential banking, temple visits, family functions, or inter-city transit.",
    providerScopeNotice: "Delivered by verified transit attendants and licensed professional women drivers.",
  },
];

export const SENIOR_CARE_SERVICES: SeniorCareServiceItem[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // CATEGORY A: Daily Living & Personal Care
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "SC-A01",
    slug: "bathing-grooming-assistance",
    name: "Bathing & Grooming Assistance",
    categoryId: "daily-living",
    categoryLabel: "Daily Living & Personal Care",
    categoryCode: "A",
    oneLiner: "Gentle, non-slip seated bath and grooming assistance respecting the senior's personal dignity and independence.",
    description: "Bathrooms represent the single highest fall-risk zone for seniors. Our patient female attendant assists with seated shower transfers, warm water preparation, gentle sponge baths for bed-bound seniors, hair washing, nail trimming, and oral hygiene.",
    whoFor: [
      "Seniors with knee osteoarthritis or balance issues fearful of slippery bathroom floors",
      "Elderly individuals recovering from surgery who cannot stand unassisted",
      "Families seeking a respectful, patient female caregiver for personal hygiene",
    ],
    inclusions: [
      "Safe seated shower or sponge bath assistance with non-slip protocol",
      "Assistance with drying, gentle moisturizer application, and skin fold check",
      "Hair combing, gentle oral hygiene, and routine nail maintenance",
      "Bathroom floor wipe-down after bath to eliminate lingering slip hazards",
    ],
    exclusions: [
      "Invasive medical wound washing (requires a registered nurse)",
      "Unsupervised shower transfers if senior is having acute dizziness",
    ],
    providerType: "Trained General Duty Attendant (GDA)",
    providerRoleTag: "Non-Clinical Attendant",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "From ₹1,299 / day shift",
    baseBookingSlug: "elderly-care",
    clinicalBoundaryNotice: "Non-clinical personal hygiene support. Surgical incisions requiring sterile dressing are handled by registered nurses.",
    faqs: [
      {
        q: "How do you ensure my parent does not feel awkward or embarrassed?",
        a: "Our attendants are specifically trained in privacy draping and respectful geriatric care. They encourage the senior to do what they can comfortably handle while providing gentle, unobtrusive support for the rest.",
      },
      {
        q: "What if my parent is completely bed-bound?",
        a: "We perform full bed-sponge baths using warm water, skin-friendly washcloths, and gentle lateral turning to maintain skin integrity without moving the senior out of bed.",
      },
    ],
    featured: true,
  },
  {
    id: "SC-A02",
    slug: "dressing-wardrobe-assistance",
    name: "Dressing & Wardrobe Assistance",
    categoryId: "daily-living",
    categoryLabel: "Daily Living & Personal Care",
    categoryCode: "A",
    oneLiner: "Comfort-first clothing and footwear support accommodating arthritis, shoulder stiffness, and post-surgery restrictions.",
    description: "Putting on sarees, dhotis, shirts, compression stockings, or orthopaedic footwear can be exhausting for seniors with shoulder capsulitis or hand tremors. Attendants provide patient, unhurried dressing support.",
    whoFor: [
      "Seniors with frozen shoulder, rheumatoid arthritis, or tremors",
      "Post-stroke patients with single-sided weakness (hemiparesis)",
      "Elders who struggle with buttons, zippers, or traditional attire fasteners",
    ],
    inclusions: [
      "Patient assistance with traditional or western everyday attire",
      "Help with socks, orthopaedic shoes, and anti-skid slippers",
      "Assistance putting on medical compression stockings when prescribed",
      "Neat folding and storage of worn clothing in laundry hampers",
    ],
    exclusions: [
      "Heavy laundry washing or ironing (attendant focuses purely on patient care)",
    ],
    providerType: "Geriatric Personal Caregiver",
    providerRoleTag: "Non-Clinical Attendant",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "Included in Elderly Care (₹1,299/day)",
    baseBookingSlug: "elderly-care",
    faqs: [
      {
        q: "Can the attendant assist with sarees and traditional Indian wear?",
        a: "Yes. All our caregivers are locally matched from South India and are completely adept with sarees, dhotis, and modest cultural clothing standards.",
      },
    ],
  },
  {
    id: "SC-A03",
    slug: "toileting-hygiene-support",
    name: "Toileting & Personal Hygiene Support",
    categoryId: "daily-living",
    categoryLabel: "Daily Living & Personal Care",
    categoryCode: "A",
    oneLiner: "Discreet commode, adult diaper changes, and scheduled bathroom transfer support preserving skin health and dignity.",
    description: "Prompt, dignified toileting support prevents urinary tract infections, skin breakdown, and catastrophic bathroom falls. Attendants assist with timed bathroom visits, commode chairs, bedpans, and meticulous peri-care diaper changes.",
    whoFor: [
      "Seniors with urge or stress incontinence needing regular scheduled prompts",
      "Bedridden or semi-ambulatory seniors using adult diapers or commode chairs",
      "Elders recovering from hip replacement who cannot use standard low toilets",
    ],
    inclusions: [
      "Assisted ambulation and transfers to western commode or raised toilet seat",
      "Discreet adult diaper inspection, timely changes, and antiseptic wipes",
      "Application of prescribed barrier creams to prevent moisture dermatitis/rashes",
      "Disposal of soiled sanitary supplies in sealed hygienic waste bags",
    ],
    exclusions: [
      "Indwelling Foley catheter insertion or irrigation (requires registered nurse)",
      "Treatment of infected decubitus pressure ulcers",
    ],
    providerType: "Trained General Duty Attendant (GDA)",
    providerRoleTag: "Non-Clinical Attendant",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "Included in Elderly Care (₹1,299/day)",
    baseBookingSlug: "elderly-care",
    faqs: [
      {
        q: "How often are diaper checks performed?",
        a: "Checks occur every 3 to 4 hours or immediately following soiled indications to ensure moisture is never left sitting on vulnerable senior skin.",
      },
    ],
  },
  {
    id: "SC-A04",
    slug: "feeding-mealtime-assistance",
    name: "Feeding & Mealtime Assistance",
    categoryId: "daily-living",
    categoryLabel: "Daily Living & Personal Care",
    categoryCode: "A",
    oneLiner: "Patient spoon-feeding, warm food serving, and hydration monitoring accommodating tremors or swallowing difficulties.",
    description: "Ensures seniors receive adequate daily nutrition and hydration without rush or risk of choking. Attendants heat pre-cooked meals, cut food into manageable soft portions, prompt sips of water, and keep upright posture during digestion.",
    whoFor: [
      "Seniors with Parkinsonian tremors who struggle with spoons and cups",
      "Elders prone to mild dysphagia (swallowing difficulties) needing upright feeding",
      "Seniors with poor appetite who need gentle, unhurried encouragement",
    ],
    inclusions: [
      "Re-heating home-cooked food and serving at comfortable dining temperature",
      "Cutting fruits, idlis, and vegetables into safe bite-sized pieces",
      "Patient, slow spoon-feeding and encouraging adequate fluid intake",
      "Ensuring 30 minutes of upright posture after meals to prevent acid reflux",
      "Logging meal and water volume in the daily WhatsApp family register",
    ],
    exclusions: [
      "Full family gourmet cooking (attendants focus exclusively on senior care and simple meal reheating)",
      "Nasogastric (Ryle's) tube feeding (handled under clinical nursing)",
    ],
    providerType: "Geriatric Personal Caregiver",
    providerRoleTag: "Non-Clinical Attendant",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "Included in Elderly Care (₹1,299/day)",
    baseBookingSlug: "elderly-care",
    faqs: [
      {
        q: "Can the attendant prepare simple tea and porridge for my parent?",
        a: "Yes. Attendants gladly prepare herbal tea, kanji (porridge), and heat meals cooked by family or cook.",
      },
    ],
  },
  {
    id: "SC-A05",
    slug: "walking-mobility-support",
    name: "Walking & Mobility Support",
    categoryId: "daily-living",
    categoryLabel: "Daily Living & Personal Care",
    categoryCode: "A",
    oneLiner: "Close gait supervision, walker positioning, and safe room-to-room accompaniment to build confidence without falls.",
    description: "Fear of falling often leads seniors into sedentary confinement, accelerating muscle atrophy. Our attendants walk closely beside the senior, providing steady elbow support, monitoring walker rubber tips, and clearing hallway floor obstructions.",
    whoFor: [
      "Seniors recovering from fractures or knee replacements practicing walking",
      "Elders with unsteady gait, diabetic neuropathy, or depth perception deficits",
      "Seniors who want to walk in their building compound or balcony safely",
    ],
    inclusions: [
      "Close side-by-side accompaniment during indoor and corridor walks",
      "Assistance standing up from armchairs and bed with proper body mechanics",
      "Inspection and correct positioning of walking frames, sticks, and wheelchairs",
      "Active scanning for rug edges, stray cables, and liquid spills",
    ],
    exclusions: [
      "Prescription of new gait biomechanics or formal physical therapy exercises",
    ],
    providerType: "Trained General Duty Attendant (GDA)",
    providerRoleTag: "Non-Clinical Attendant",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "From ₹1,299 / day shift",
    baseBookingSlug: "elderly-care",
    faqs: [
      {
        q: "Can the attendant assist my parent down stairs?",
        a: "Yes, provided the staircase has secure handrails and the senior has physician clearance for stair navigation. For high-fall-risk seniors, lift use is strictly maintained.",
      },
    ],
    featured: true,
  },
  {
    id: "SC-A06",
    slug: "bedridden-person-care",
    name: "Bedridden Person Assistance",
    categoryId: "daily-living",
    categoryLabel: "Daily Living & Personal Care",
    categoryCode: "A",
    oneLiner: "Meticulous 2-hourly lateral turning, bed-sponge hygiene, pressure sore prevention, and linen changes for immobile seniors.",
    description: "Completely bedridden elders require attentive vigilance to prevent painful decubitus ulcers (bedsores), chest congestion, and contractures. Attendants follow strict 2-hour lateral turning protocols and passive limb mobilization.",
    whoFor: [
      "Seniors with advanced neurological conditions, end-stage frailty, or coma",
      "Post-fracture patients during mandatory absolute bed-rest phases",
      "Palliative seniors receiving comfort-first home support",
    ],
    inclusions: [
      "Scheduled 2-hourly left/right/supine repositioning with support pillows",
      "Daily complete warm sponge bath and moisturization in bed",
      "Bed linen and drawsheet replacement without moving patient out of bed",
      "Assistance with urinal bottles or bedpan placement and thorough peri-cleansing",
      "Passive limb movement routines as approved by senior's doctor",
    ],
    exclusions: [
      "Debridement of stage 3 or stage 4 deep pressure ulcers (nursing/clinical scope)",
      "Invasive medical machine troubleshooting",
    ],
    providerType: "Trained General Duty Attendant (GDA)",
    providerRoleTag: "Non-Clinical Attendant",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "From ₹1,499 / 12-hr shift",
    baseBookingSlug: "elderly-care",
    faqs: [
      {
        q: "Do your attendants know how to use alpha air mattresses?",
        a: "Yes, attendants are trained in inspecting alternating pressure air mattresses and ensuring pumps operate continuously.",
      },
    ],
  },
  {
    id: "SC-A07",
    slug: "daily-routine-support",
    name: "Daily Routine & Prescription Timekeeping",
    categoryId: "daily-living",
    categoryLabel: "Daily Living & Personal Care",
    categoryCode: "A",
    oneLiner: "Structured daily routine anchoring: timely waking, hydration reminders, prescription logging, and calm winding-down.",
    description: "Establishes a predictable, calming daily cadence that reduces confusion and ensures chronic medications are taken exactly as prescribed by doctors with a glass of warm water.",
    whoFor: [
      "Seniors managing multiple daily medications (polypharmacy)",
      "Elders living alone whose day-night sleep cycles have become irregular",
      "Children wanting peace of mind that parents took morning and evening doses",
    ],
    inclusions: [
      "Reminding senior at doctor-prescribed medication intervals",
      "Handing medicine box or pill organizer with fresh water at meal times",
      "Logging each administered dose and time in daily care record",
      "Establishing regular wake-up, newspaper reading, and light stretching times",
      "Evening wind-down routine fostering peaceful, undisturbed sleep",
    ],
    exclusions: [
      "Prescribing medicines or altering dosages independently",
      "Administering intravenous medications (clinical nursing only)",
    ],
    providerType: "Geriatric Personal Caregiver",
    providerRoleTag: "Non-Clinical Attendant",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "Included in Elderly Care (₹1,299/day)",
    baseBookingSlug: "elderly-care",
    faqs: [
      {
        q: "Does the attendant decide what medicine to give?",
        a: "Never. The attendant only opens the senior's family-prepared pill organizer or follows the doctor's written prescription sheet.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // CATEGORY B: Companionship & Independent Living
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "SC-B01",
    slug: "elderly-companionship",
    name: "Elderly Companionship & Social Connection",
    categoryId: "companionship",
    categoryLabel: "Companionship & Independent Living",
    categoryCode: "B",
    oneLiner: "Warm, respectful conversation, reading, music, and emotional presence that relieves quiet domestic loneliness.",
    description: "Loneliness is as damaging to senior health as chronic illness. Our vetted companions sit with elders, listen to their stories, read vernacular newspapers aloud, play carrom or card games, and bring warmth back into quiet homes.",
    whoFor: [
      "Seniors whose children live abroad or in other metropolitan cities",
      "Widowed elders experiencing deep loneliness and quiet sadness at home",
      "Active seniors desiring intellectual and conversational engagement",
    ],
    inclusions: [
      "Attentive, respectful conversation in Kannada, Tamil, Telugu, Hindi or English",
      "Reading regional daily newspapers, devotional texts, or literature aloud",
      "Listening to traditional Carnatic/Hindustani music or playing board games",
      "Accompanying senior for evening tea and balcony time",
    ],
    exclusions: [
      "Heavy domestic housekeeping or maid cleaning duties",
    ],
    providerType: "Geriatric Personal Caregiver",
    providerRoleTag: "Non-Clinical Attendant",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "From ₹899 / 4-hr visit or ₹1,299 / full day",
    baseBookingSlug: "elderly-care",
    faqs: [
      {
        q: "Can I request a companion who speaks my mother's native language?",
        a: "Yes! Language matching (Tamil, Telugu, Kannada, Malayalam, Hindi) is one of our fundamental trust pillars.",
      },
    ],
    featured: true,
  },
  {
    id: "SC-B02",
    slug: "walking-companionship",
    name: "Walking Companionship & Park Visits",
    categoryId: "companionship",
    categoryLabel: "Companionship & Independent Living",
    categoryCode: "B",
    oneLiner: "Safe morning and evening walking companionship in society parks or quiet lanes with vigilant step-by-step supervision.",
    description: "Seniors often stop going for healthy walks because they are afraid of stray dogs, uneven footpaths, or sudden dizziness. A dedicated companion walks beside them, carrying water and phone, ensuring a refreshing outing.",
    whoFor: [
      "Seniors who miss morning walks due to fear of tripping on broken pavements",
      "Elders wanting gentle outdoor sunlight and fresh air for bone health",
      "Seniors in gated communities who want someone by their side",
    ],
    inclusions: [
      "Doorstep meet and accompaniment to apartment garden or neighborhood park",
      "Carrying senior's water bottle, umbrella, reading glasses, and mobile phone",
      "Guiding around uneven paver blocks, wet grass, and approaching pets",
      "Ensuring rests on park benches whenever pulse or breathing indicates",
    ],
    exclusions: [
      "High-speed jogging or athletic training",
    ],
    providerType: "Geriatric Personal Caregiver",
    providerRoleTag: "Non-Clinical Attendant",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "Included in Elderly Care or ₹899 / session",
    baseBookingSlug: "elderly-care",
    faqs: [
      {
        q: "What happens if it rains during the walk?",
        a: "The companion immediately redirects the senior to covered corridors or indoor clubhouse walking tracks to prevent wet foot slips.",
      },
    ],
  },
  {
    id: "SC-B03",
    slug: "errands-grocery-assistance",
    name: "Grocery & Essential Errands Assistance",
    categoryId: "companionship",
    categoryLabel: "Companionship & Independent Living",
    categoryCode: "B",
    oneLiner: "Accompaniment to local markets, pharmacies, and banks with steady arm support and bag carrying.",
    description: "Preserves the senior's sense of self-reliance. Instead of ordering everything remotely, the senior can visit their neighborhood vegetable vendor, temple, or post office with an attendant handling bags and navigation.",
    whoFor: [
      "Seniors who enjoy picking their own fresh groceries and temple flowers",
      "Elders needing help carrying heavier bags up apartment stairs",
      "Seniors visiting the local bank branch or pharmacy",
    ],
    inclusions: [
      "Walking accompaniment to local shops within walking radius",
      "Carrying shopping bags, groceries, and pharmacy supplies",
      "Helping senior cross neighborhood roads safely at designated zebra crossings",
      "Verifying printed bills against purchased items before leaving shop",
    ],
    exclusions: [
      "Independent handling of senior's ATM cards or banking PINs (seniors maintain full financial control)",
    ],
    providerType: "Geriatric Personal Caregiver",
    providerRoleTag: "Non-Clinical Attendant",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "From ₹899 / 4-hr block",
    baseBookingSlug: "elderly-care",
    faqs: [
      {
        q: "Does the attendant handle my father's bank account or money?",
        a: "No. For family safety, attendants are strictly prohibited from touching ATM cards, online banking passwords, or cash transactions directly.",
      },
    ],
  },
  {
    id: "SC-B04",
    slug: "smartphone-video-call-assistance",
    name: "Smartphone & Video-Call Tutoring",
    categoryId: "companionship",
    categoryLabel: "Companionship & Independent Living",
    categoryCode: "B",
    oneLiner: "Patient, non-judgmental technology assistance for WhatsApp video calls with grandchildren, digital bills, and news apps.",
    description: "Bridges the digital divide. Attendants patiently teach seniors how to answer WhatsApp calls from kids abroad, adjust screen brightness, recharge television subscriptions, and open devotional YouTube channels.",
    whoFor: [
      "Elders frustrated by modern smartphones or locked touchscreens",
      "Parents whose children live abroad in USA, UK, Europe, Singapore, or Australia",
      "Seniors who want to attend online family video gatherings independently",
    ],
    inclusions: [
      "Setting up high-volume WhatsApp video calls with NRI family members",
      "Teaching simple steps to read messages and voice-type in regional language",
      "Helping bookmark devotional streams, classical music, and news apps",
      "Connecting phone to home Wi-Fi and bluetooth hearing aids if configured",
    ],
    exclusions: [
      "Sharing financial OTPs, banking login creation, or UPI registration",
    ],
    providerType: "Geriatric Personal Caregiver",
    providerRoleTag: "Non-Clinical Attendant",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "Included in Companionship & Elderly Care",
    baseBookingSlug: "elderly-care",
    faqs: [
      {
        q: "My mother gets anxious touching the screen. Are attendants patient?",
        a: "Extremely. Our attendants explain buttons repeatedly with warmth and respect, never showing irritation.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // CATEGORY C: Hospital Visits & Medical Appointment Assistance (CORE SPOTLIGHT)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "SC-C01",
    slug: "hospital-visit-companion",
    name: "Hospital Visit Companion (Outpatient OPD)",
    categoryId: "hospital-visits",
    categoryLabel: "Hospital Visits & Medical Appointments",
    categoryCode: "C",
    oneLiner: "Complete door-to-door accompaniment for hospital visits: meet at home, OPD registration, waiting room vigil, diagnostics navigation, and safe return.",
    description: "Navigating massive corporate hospital lobbies, crowded token counters, long waiting corridors, and multi-floor diagnostic labs is physically punishing for aging seniors. When adult children are stuck in critical office meetings or live out of city, our verified Hospital Visit Companion meets the senior at their doorstep or hospital entrance, manages wheelchair transport, guides through registration, stays by their side during long waits, and escorts them safely back home.",
    whoFor: [
      "Adult children who cannot take a full workday off for routine doctor consultations",
      "Elderly parents living alone who feel overwhelmed by cavernous hospital campuses",
      "Seniors requiring wheelchair coordination across OPD, lab, and radiology buildings",
      "Patients needing an empathetic person to sit with them through 2-4 hour waiting queues",
    ],
    inclusions: [
      "Step 1: Doorstep meet-up at residence or agreed hospital lobby entrance",
      "Step 2: Securing hospital wheelchair and porter support if required",
      "Step 3: Standing in registration counter queues and presenting appointment slips",
      "Step 4: Continuous attentive companionship in waiting lounge with water & washroom assistance",
      "Step 5: Accompanying to consultation room door and respecting private doctor conversation",
      "Step 6: Escorting to diagnostic labs for blood sample submission or ultrasound/X-ray tokens",
      "Step 7: Pharmacy queue assistance to collect prescribed medicines",
      "Step 8: Arranging verified return transit and accompanying senior back to their living room",
      "Real-time WhatsApp milestone updates sent to children (Arrived / With Doctor / Returning)",
    ],
    exclusions: [
      "Clinical medical decision-making or giving patient consent on behalf of family",
      "Interpreting doctor's clinical diagnoses, CT/MRI scan films, or biopsy reports",
      "Emergency ambulance resuscitation (non-emergency accompaniment only; call 108 for acute trauma/arrest)",
      "Paying medical hospital bills from personal funds (family pays hospital directly via online portal or senior's card)",
    ],
    providerType: "Hospital Visit & Bedside Companion",
    providerRoleTag: "Non-Clinical Attendant",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "From ₹1,199 / half-day visit (up to 5 hours) + transport",
    baseBookingSlug: "hospital-attendants",
    processSteps: [
      {
        step: 1,
        title: "Punctual Meet & Departure",
        detail: "Companion arrives 45 mins before appointment, checks senior's file/ID, and coordinates verified transit.",
      },
      {
        step: 2,
        title: "Registration & Token Navigation",
        detail: "Wheelchair is arranged at the gate; companion handles registration slips, barcode tags, and clinic floor navigation.",
      },
      {
        step: 3,
        title: "Waiting Lounge Vigil",
        detail: "Senior rests comfortably while companion tracks doctor token displays, provides water, and assists with restrooms.",
      },
      {
        step: 4,
        title: "Diagnostics & Pharmacy",
        detail: "Guides to phlebotomy lab, radiology counters, and collects prescription medications with receipt verification.",
      },
      {
        step: 5,
        title: "Safe Return & Milestone Log",
        detail: "Accompanies senior safely into their home, settles them with warm tea, and sends WhatsApp confirmation to family.",
      },
    ],
    clinicalBoundaryNotice: "Important Safety Boundary: Hospital Visit Companions provide non-clinical mobility, queue, and navigation support. They do NOT provide medical consent, diagnose, or advise on treatment options.",
    faqs: [
      {
        q: "Does the companion go inside the doctor's consultation room?",
        a: "That is entirely the family's choice. If the senior and family prefer privacy, the companion waits right outside the door. If the senior asks for help remembering what to ask the doctor, the companion can accompany them with the senior's consent.",
      },
      {
        q: "How do I know what happened during the appointment?",
        a: "The companion sends milestone WhatsApp updates: when they reach the hospital, when they enter the consultation room, when tests are completed, and when they depart for home.",
      },
      {
        q: "Can the companion pick up my parent from home in an Uber or cab?",
        a: "Yes. The companion can arrive at your parent's home address, coordinate an app cab, travel with them in the vehicle, and accompany them all the way back.",
      },
    ],
    featured: true,
  },
  {
    id: "SC-C02",
    slug: "diagnostic-test-accompaniment",
    name: "Diagnostic Test & Blood Work Accompaniment",
    categoryId: "hospital-visits",
    categoryLabel: "Hospital Visits & Medical Appointments",
    categoryCode: "C",
    oneLiner: "Fasting blood test, MRI, CT scan, and ultrasound accompaniment with calm waiting support and post-test breakfast.",
    description: "Seniors undergoing fasting diagnostic profiles are often weak, dehydrated, and susceptible to fainting spells. Companions provide arm support during early morning lab visits and ensure prompt post-fast breakfast.",
    whoFor: [
      "Diabetic seniors undergoing morning fasting blood tests vulnerable to hypoglycaemic drops",
      "Elders undergoing claustrophobia-inducing MRI scans who need reassuring presence",
      "Seniors requiring bladder preparation before pelvic ultrasound scans",
    ],
    inclusions: [
      "Early morning home departure accompaniment for 8:00 AM fasting labs",
      "Helping senior settle in phlebotomy chair and holding arm afterwards",
      "Providing immediate pre-packed breakfast/juice once fasting sample is drawn",
      "Waiting outside scan room and assisting senior in changing into hospital gowns",
      "Safeguarding test acknowledgment receipt slips for digital family retrieval",
    ],
    exclusions: [
      "Radiation safety room entry during active X-ray or CT scanning",
      "Independent interpretation of lab test results",
    ],
    providerType: "Hospital Visit & Bedside Companion",
    providerRoleTag: "Non-Clinical Attendant",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "From ₹999 / visit (up to 4 hours)",
    baseBookingSlug: "hospital-attendants",
    faqs: [
      {
        q: "Can the companion collect the physical test reports the next day?",
        a: "Most hospitals provide digital PDF reports online now. If physical films (like X-ray/MRI) must be picked up, this can be added as a quick follow-up errand visit.",
      },
    ],
  },
  {
    id: "SC-C03",
    slug: "hospital-discharge-assistance",
    name: "Hospital Discharge Day & Transition Escort",
    categoryId: "hospital-visits",
    categoryLabel: "Hospital Visits & Medical Appointments",
    categoryCode: "C",
    oneLiner: "Patience through the 4-6 hour hospital discharge billing ordeal, packing hospital room belongings, and safe transit home.",
    description: "Discharge day is notorious for slow insurance approvals, pharmacy clearance, and endless desk rounds. Our attendant handles the room vigil, packs the senior's clothes and toiletries, and coordinates wheelchair discharge to the vehicle.",
    whoFor: [
      "Families exhausted after multi-day inpatient stays needing someone to manage the discharge day",
      "Patients newly ambulating with surgical wounds who must avoid sudden jerks",
      "Children who must work while hospital insurance approvals process",
    ],
    inclusions: [
      "Continuous bedside accompaniment while patient waits for final billing clearance",
      "Neat packing of personal toiletries, clothing, and medical records",
      "Collecting discharge summary folder, discharge medicines, and implants ID cards",
      "Wheelchair transfer from hospital room to pickup vehicle curb",
      "Assisted transit home and settling senior comfortably into their home bed",
    ],
    exclusions: [
      "Direct negotiation of insurance claim deductibles with third-party administrators (TPA)",
    ],
    providerType: "Hospital Visit & Bedside Companion",
    providerRoleTag: "Non-Clinical Attendant",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "From ₹1,499 / discharge shift",
    baseBookingSlug: "hospital-attendants",
    faqs: [
      {
        q: "Can the attendant transition into full-time home care after discharge?",
        a: "Yes! Many families book our 12-hour or 24-hour post-hospital recovery attendant to continue care at home immediately following discharge.",
      },
    ],
    featured: true,
  },
  {
    id: "SC-C04",
    slug: "clinic-followup-companion",
    name: "Local Clinic & Dental Appointment Companion",
    categoryId: "hospital-visits",
    categoryLabel: "Hospital Visits & Medical Appointments",
    categoryCode: "C",
    oneLiner: "Short 2-3 hour accompaniment to neighborhood eye clinics, dental centres, or orthopaedic follow-ups.",
    description: "Ideal for routine neighborhood appointments where hiring a full-day attendant is unnecessary. A companion meets the senior, walks them to the local clinic, and brings them back safely.",
    whoFor: [
      "Seniors visiting ophthalmologists for cataract checks or dilated eye drops",
      "Elders visiting local dental clinics for dentures or root canal sittings",
      "Seniors going for routine BP/sugar check-up at family doctor clinic",
    ],
    inclusions: [
      "Doorstep meet-up and travel to neighborhood clinic",
      "Holding senior's arm when leaving clinic after eye dilation drops",
      "Safe return accompaniment to home doorstep",
    ],
    exclusions: [
      "Operating complex medical machinery or administering clinical procedures",
    ],
    providerType: "Hospital Visit & Bedside Companion",
    providerRoleTag: "Non-Clinical Attendant",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "From ₹799 / short clinic block",
    baseBookingSlug: "hospital-attendants",
    faqs: [
      {
        q: "My mother has blurred vision after eye drops. Can the attendant guide her?",
        a: "Yes, this is an ideal situation. The companion ensures she does not step off curbs or misjudge stairs while vision is temporarily blurred.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // CATEGORY D: Home Nursing & Clinical Care
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "SC-D01",
    slug: "post-surgical-wound-dressing",
    name: "Surgical Wound Dressing & Suture Care",
    categoryId: "home-nursing",
    categoryLabel: "Home Nursing & Clinical Care",
    categoryCode: "D",
    oneLiner: "Sterile, antiseptic wound dressings by licensed GNM/B.Sc nurses following treating surgeon's discharge instructions.",
    description: "Post-operative surgical wounds (laparotomy, joint replacement, CABG sternal incisions) require strict aseptic technique to prevent hospital-acquired infections. Our licensed registered nurse visits on scheduled alternate days with sterile dressing packs.",
    whoFor: [
      "Patients discharged with surgical sutures, staples, or drain sites",
      "Diabetic seniors prone to slow wound healing or maceration",
      "Seniors unable to travel to hospital OPD every 48 hours for dressing changes",
    ],
    inclusions: [
      "Aseptic hand hygiene, sterile glove donning, and wound inspection for signs of infection (erythema, exudate)",
      "Gentle cleaning with prescribed normal saline or betadine solutions",
      "Application of sterile non-adherent dressings or waterproof shower barriers",
      "Suture / staple status documentation and immediate reporting to family",
    ],
    exclusions: [
      "Prescription of oral antibiotics without treating physician's written order",
      "Independent surgical debridement of necrotic tissue",
    ],
    providerType: "Registered Nurse (GNM / B.Sc Nursing)",
    providerRoleTag: "Clinical Nurse",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Licensed Nurse Required",
    estimatedRate: "From ₹699 / procedure visit + consumables",
    baseBookingSlug: "nursing-services",
    clinicalBoundaryNotice: "Clinical Procedure: Requires valid treating surgeon prescription or hospital discharge summary. Delivered exclusively by registered nurses.",
    faqs: [
      {
        q: "Does the nurse bring the sterile dressing materials?",
        a: "Families can provide prescribed dressings from hospital pharmacy, or we can coordinate a sterile disposable dressing kit upon advance request.",
      },
    ],
    featured: true,
  },
  {
    id: "SC-D02",
    slug: "vitals-glucose-bp-monitoring",
    name: "Vital Signs & Blood Glucose Monitoring",
    categoryId: "home-nursing",
    categoryLabel: "Home Nursing & Clinical Care",
    categoryCode: "D",
    oneLiner: "Accurate clinical tracking of blood pressure, blood glucose, SpO2, pulse rate, and temperature with trend logging.",
    description: "Fluctuating blood pressure and uncontrolled post-meal sugars cause silent microvascular damage and dizziness. Our nursing visits provide hospital-calibrated vital signs tracking with digital charts shared directly with family and doctor.",
    whoFor: [
      "Seniors adjusting to new antihypertensive or insulin titration regimens",
      "Elders with history of transient ischemic attacks (TIA) or cardiac arrhythmias",
      "Patients needing pre-operative or post-operative clinical stabilization logs",
    ],
    inclusions: [
      "Manual and digital calibrated sphygmomanometer blood pressure readings",
      "Fasting and post-prandial glucometer blood sugar testing",
      "Pulse oximeter SpO2 saturation and resting heart rate check",
      "Digital logging with red-flag alert thresholds communicated immediately",
    ],
    exclusions: [
      "Altering doctor's insulin dosage units independently",
    ],
    providerType: "Registered Nurse (GNM / B.Sc Nursing)",
    providerRoleTag: "Clinical Nurse",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "From ₹499 / visit or included in nursing shifts",
    baseBookingSlug: "nursing-services",
    faqs: [
      {
        q: "What if my parent's BP is dangerously high during the visit?",
        a: "Our nurses follow an emergency escalation protocol: immediate notification to family, doctor alert, and coordination with nearest emergency room if reading exceeds clinical thresholds.",
      },
    ],
  },
  {
    id: "SC-D03",
    slug: "catheter-feeding-tube-care",
    name: "Urinary Catheter & Ryle's Tube Care",
    categoryId: "home-nursing",
    categoryLabel: "Home Nursing & Clinical Care",
    categoryCode: "D",
    oneLiner: "Sterile Foley catheter bag maintenance, catheter changes, and nasogastric feeding tube aspiration checks by certified nurses.",
    description: "Indwelling medical lines carry strict infection control protocols. Our registered nurses perform aseptic catheter changes, secure leg straps to prevent accidental dislodgement, and verify nasogastric tube placement before feeds.",
    whoFor: [
      "Bedridden seniors with indwelling urinary Foley or suprapubic catheters",
      "Neurological or stroke patients receiving enteral nutrition via Ryle's tube",
      "Families wanting trained nursing care to prevent catheter blockage and UTIs",
    ],
    inclusions: [
      "Aseptic Foley catheter replacement as per manufacturer schedule",
      "Emptying, measurement, and charting of daily urinary output",
      "Ryle's tube patency verification and sterile water flushing protocol",
      "Inspection of nasal skin and fixation tape to prevent pressure erosion",
    ],
    exclusions: [
      "Blind catheterization in patients with known urethral stricture or false passage",
    ],
    providerType: "Registered Nurse (GNM / B.Sc Nursing)",
    providerRoleTag: "Clinical Nurse",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Licensed Nurse Required",
    estimatedRate: "From ₹799 / procedure visit",
    baseBookingSlug: "nursing-services",
    clinicalBoundaryNotice: "Sterile clinical procedure performed strictly by licensed nurses with doctor's order.",
    faqs: [
      {
        q: "Can a general duty attendant change my father's catheter?",
        a: "Absolutely NOT. Foley catheter insertion is an invasive sterile procedure that ApnaCare assigns exclusively to registered GNM/B.Sc nurses.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // CATEGORY E: Doctors, Specialists & Therapy
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "SC-E01",
    slug: "physiotherapy-at-home",
    name: "Physiotherapy & Mobility Rehabilitation at Home",
    categoryId: "doctors-therapy",
    categoryLabel: "Doctors, Specialists & Therapy",
    categoryCode: "E",
    oneLiner: "Bedside mobility rehab, gait retraining, and joint mobilization by licensed physiotherapists (BPT/MPT).",
    description: "Restores independence after joint replacement, spinal surgery, stroke, or prolonged bed rest. Licensed physiotherapists bring therapeutic equipment to your home, designing a customized strengthening and balance regimen.",
    whoFor: [
      "Seniors recovering from total knee (TKR) or hip replacement (THR)",
      "Stroke survivors working on neuro-rehabilitation and upper/lower limb function",
      "Elderly individuals with severe balance instability or Parkinsonian stiffness",
    ],
    inclusions: [
      "Comprehensive musculoskeletal and functional mobility assessment",
      "Passive, active-assisted, and active range of motion exercises",
      "Gait training with walker, crutches, or cane; stair navigation practice",
      "Pain modulation using TENS, ultrasound, or manual therapy techniques",
      "Home exercise program charted for family and daily attendant to supervise",
    ],
    exclusions: [
      "Diagnostic radiographic imaging (done at diagnostic centres)",
    ],
    providerType: "Licensed Physiotherapist (Partner Referral)",
    providerRoleTag: "Therapist / Doctor",
    status: "PARTNER_COORDINATION",
    statusBadge: "Coordinated Clinical Partner",
    estimatedRate: "From ₹850 - ₹1,200 / session",
    baseBookingSlug: "elderly-care",
    clinicalBoundaryNotice: "Therapy delivery: Conducted by certified BPT/MPT physiotherapists through partner network. Requires physician referral.",
    faqs: [
      {
        q: "How many sessions per week are recommended for knee replacement?",
        a: "Typically 3 to 5 sessions per week during the first 3 weeks post-surgery, tapering as independent mobility milestones are reached.",
      },
    ],
    featured: true,
  },
  {
    id: "SC-E02",
    slug: "geriatric-doctor-home-consultation",
    name: "Doctor Home Visit & Geriatric Assessment",
    categoryId: "doctors-therapy",
    categoryLabel: "Doctors, Specialists & Therapy",
    categoryCode: "E",
    oneLiner: "Comprehensive bedside medical examination by a registered physician for frail elders unable to travel to OPDs.",
    description: "Avoids the physical trauma of transporting bedridden or fragile seniors to hospital outpatient departments. Registered physicians conduct thorough bedside clinical evaluations, review multiple prescriptions, and update treatment plans.",
    whoFor: [
      "Extremely frail, immobile, or palliative seniors unable to sit in transit vehicles",
      "Seniors experiencing non-emergency clinical deterioration or persistent fatigue",
      "Comprehensive geriatric medication reviews to eliminate redundant drugs",
    ],
    inclusions: [
      "Complete physical examination: heart, lungs, abdomen, nervous system, and extremities",
      "Comprehensive medication chart review to prevent drug interactions (polypharmacy)",
      "Official valid printed/digital medical prescription and diagnostic advice",
      "Bedside clinical recommendations for family and nursing staff",
    ],
    exclusions: [
      "Acute medical emergencies: chest pain, active stroke, acute breathing arrest (call 108 immediately)",
    ],
    providerType: "Registered Medical Specialist (External Coordination)",
    providerRoleTag: "Therapist / Doctor",
    status: "PARTNER_COORDINATION",
    statusBadge: "Coordinated Clinical Partner",
    estimatedRate: "From ₹1,500 - ₹2,500 / consultation",
    baseBookingSlug: "nursing-services",
    clinicalBoundaryNotice: "Registered MBBS / MD physician home consultation coordinated with verified clinical partners. Non-emergency only.",
    faqs: [
      {
        q: "Is this service for sudden chest pain or stroke symptoms?",
        a: "No. For sudden loss of consciousness, chest crushing pain, or facial drooping, call 108 or proceed immediately to the nearest emergency hospital.",
      },
    ],
  },
  {
    id: "SC-E03",
    slug: "clinical-dietitian-consultation",
    name: "Geriatric Dietitian & Nutrition Planning",
    categoryId: "doctors-therapy",
    categoryLabel: "Doctors, Specialists & Therapy",
    categoryCode: "E",
    oneLiner: "Personalized dietary plans addressing diabetes, kidney function, hypertension, and swallowing modifications.",
    description: "Senior bodies process nutrients differently. Our clinical nutritionists design culturally tailored Indian meal charts that balance blood sugar, reduce renal strain, manage fluid restrictions, and provide soft-texture adaptations.",
    whoFor: [
      "Seniors with chronic kidney disease (CKD) requiring low-potassium, low-sodium plans",
      "Diabetic elders with erratic blood sugar fluctuations",
      "Underweight seniors with progressive sarcopenia (muscle loss) and loss of appetite",
    ],
    inclusions: [
      "Detailed nutritional history and dietary habits intake",
      "Macronutrient and micronutrient balance tailored to South Indian cuisine",
      "Clear guidance for home cook and attendant regarding portion sizes and timing",
    ],
    exclusions: [
      "Prescription of pharmaceutical drugs",
    ],
    providerType: "Registered Medical Specialist (External Coordination)",
    providerRoleTag: "Therapist / Doctor",
    status: "PARTNER_COORDINATION",
    statusBadge: "Coordinated Clinical Partner",
    estimatedRate: "From ₹800 / consultation",
    baseBookingSlug: "elderly-care",
    faqs: [
      {
        q: "Can the dietitian adapt the plan to traditional South Indian vegetarian food?",
        a: "Yes. All meal plans are based on regional staples like ragi, millets, rasam, dal, and local vegetables.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // CATEGORY F: Post-Hospital & Post-Surgical Recovery
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "SC-F01",
    slug: "post-hospital-recovery-attendant",
    name: "Post-Hospital Recovery Attendant (Convalescent Care)",
    categoryId: "post-hospital",
    categoryLabel: "Post-Hospital & Post-Surgical Recovery",
    categoryCode: "F",
    oneLiner: "Continuous 12 or 24-hour convalescent bedside support during the crucial 2 to 6 weeks following surgical discharge.",
    description: "The first 30 days after hospital discharge are the most vulnerable period for surgical complications, infections, and readmission. Our convalescent attendants assist with transfers, enforce doctor-prescribed activity limits, and maintain hygiene.",
    whoFor: [
      "Seniors discharged after orthopaedic hip, spine, or knee surgery",
      "Patients recovering from abdominal, cardiac, or oncology surgeries",
      "Seniors experiencing post-ICU muscular deconditioning and fatigue",
    ],
    inclusions: [
      "Safe transfers from bed to chair avoiding strain on surgical incisions",
      "Supervising prescribed post-surgery breathing exercises (spirometry)",
      "Strict enforcement of weight-bearing precautions as ordered by surgeon",
      "Medication logging, warm meal serving, and hydration monitoring",
      "Immediate alerting if fever, wound ooze, or sudden calf swelling occurs",
    ],
    exclusions: [
      "Surgical line removal or sterile suture extraction (registered nurse duty)",
    ],
    providerType: "Trained General Duty Attendant (GDA)",
    providerRoleTag: "Non-Clinical Attendant",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "From ₹1,399 / 12-hr shift or ₹2,499 / 24-hr live-in",
    baseBookingSlug: "hospital-attendants",
    faqs: [
      {
        q: "Can we book for 2 weeks or 1 month?",
        a: "Yes. Flexible packages are available from 7 days to multi-month recovery retainers.",
      },
    ],
    featured: true,
  },
  {
    id: "SC-F02",
    slug: "hospital-to-home-transition-support",
    name: "Hospital-to-Home Transition & Room Preparation",
    categoryId: "post-hospital",
    categoryLabel: "Post-Hospital & Post-Surgical Recovery",
    categoryCode: "F",
    oneLiner: "Home bedroom safety audit, hospital bed setup guidance, and initial 48-hour intensive settling-in support.",
    description: "Bringing an operated senior home is stressful if the bedroom isn't prepared. We guide room decluttering, non-slip pathway creation, medical equipment positioning (oxygen, alpha mattress, walker), and smooth initial settling.",
    whoFor: [
      "Families whose loved one is arriving home tomorrow after major surgery",
      "Homes needing immediate hazard elimination before the patient arrives",
    ],
    inclusions: [
      "Pre-arrival room inspection: clear wide pathways for walker/wheelchair",
      "Inspecting electric outlets for oxygen concentrator/suction machines",
      "Attendant waiting at home to receive the patient from hospital ambulance/cab",
      "Organizing medicine trays, emergency contact cards, and daily logbook",
    ],
    exclusions: [
      "Structural architectural alterations (civil masonry/carpentry work)",
    ],
    providerType: "Trained General Duty Attendant (GDA)",
    providerRoleTag: "Non-Clinical Attendant",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "From ₹1,499 / settling shift",
    baseBookingSlug: "hospital-attendants",
    faqs: [
      {
        q: "Can you help arrange medical bed or wheelchair rentals?",
        a: "Yes, our care coordinators can connect you with trusted local medical equipment rental partners in your city.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // CATEGORY G: Dementia, Memory & Specialised Care
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "SC-G01",
    slug: "dementia-alzheimers-support",
    name: "Dementia & Alzheimer's Daily Caregiver",
    categoryId: "dementia-specialised",
    categoryLabel: "Dementia, Memory & Specialised Care",
    categoryCode: "G",
    oneLiner: "Calm, patient de-escalation, memory-anchoring routines, sundowning supervision, and wandering prevention.",
    description: "Caring for an elder with dementia requires extraordinary emotional patience and specialized behavioral techniques. Our caregivers avoid confrontation, maintain familiar daily rituals, gently redirect repetitive questions, and keep elders safe during evening sundowning confusion.",
    whoFor: [
      "Elders diagnosed with Mild Cognitive Impairment, Alzheimer's, or Vascular Dementia",
      "Families experiencing severe caregiver burnout from continuous 24/7 supervision",
      "Seniors who exhibit agitation, wandering tendencies, or evening confusion",
    ],
    inclusions: [
      "Patient, non-confrontational communication using gentle validation techniques",
      "Maintaining consistent daily eating, bathing, and resting schedules",
      "Vigilant front-door supervision to prevent wandering and disorientation",
      "Calm redirection during evening sundowning episodes using soft music and low lighting",
      "Memory stimulation activities: photo album reminiscing, folding napkins, simple puzzles",
    ],
    exclusions: [
      "Physical restraint of agitated seniors (restraints are strictly prohibited)",
      "Psychiatric pharmacotherapy adjustments",
    ],
    providerType: "Geriatric Personal Caregiver",
    providerRoleTag: "Non-Clinical Attendant",
    status: "ASSESSMENT_REQUIRED",
    statusBadge: "Care Desk Assessment Required",
    estimatedRate: "From ₹1,499 / day shift (custom quote upon intake)",
    baseBookingSlug: "elderly-care",
    clinicalBoundaryNotice: "Specialized Protocol: Requires care intake assessment to evaluate wandering risk and behavioral triggers before placement.",
    faqs: [
      {
        q: "What if my parent refuses to bathe or take medicines?",
        a: "Our dementia-trained caregivers never force or argue. They use calm redirection, stepping away for 10 minutes and approaching again with a gentle, positive cue.",
      },
      {
        q: "Why is an intake assessment required for dementia care?",
        a: "Every dementia journey is unique. Understanding specific triggers, sleep patterns, and safety hazards ensures we match the most suitable caregiver profile.",
      },
    ],
    featured: true,
  },
  {
    id: "SC-G02",
    slug: "parkinsons-daily-living-support",
    name: "Parkinson's Disease Daily Living Assistance",
    categoryId: "dementia-specialised",
    categoryLabel: "Dementia, Memory & Specialised Care",
    categoryCode: "G",
    oneLiner: "Paced mobility, freezing-of-gait cues, tremors accommodation, and timely levodopa medicine discipline.",
    description: "Parkinson's disease fluctuates throughout the day between 'on' and 'off' medication states. Caregivers understand gait freezing, allow adequate time for unhurried movements, and ensure medication is administered at exact hourly intervals.",
    whoFor: [
      "Seniors with Parkinson's disease experiencing motor fluctuations and tremors",
      "Elders with Lewy Body Dementia needing steady balance support",
    ],
    inclusions: [
      "Strict adherence to timely prescription dosing to maintain motor control",
      "Visual and verbal cueing techniques when freezing of gait occurs",
      "Assistance with utensils, weighted cups, and buttoning clothing",
      "Close side support to prevent sudden backward falls (retropulsion)",
    ],
    exclusions: [
      "Altering Parkinson's medication dosages without doctor's written orders",
    ],
    providerType: "Geriatric Personal Caregiver",
    providerRoleTag: "Non-Clinical Attendant",
    status: "ASSESSMENT_REQUIRED",
    statusBadge: "Care Desk Assessment Required",
    estimatedRate: "From ₹1,399 / day shift",
    baseBookingSlug: "elderly-care",
    faqs: [
      {
        q: "Do caregivers know how to handle freezing episodes?",
        a: "Yes. They are trained not to pull the senior forward, but to cue rhythmic stepping or counting to overcome the freeze safely.",
      },
    ],
  },
  {
    id: "SC-G03",
    slug: "palliative-comfort-care",
    name: "Palliative & Comfort-Focused Home Support",
    categoryId: "dementia-specialised",
    categoryLabel: "Dementia, Memory & Specialised Care",
    categoryCode: "G",
    oneLiner: "Compassionate bedside presence, skin comfort, oral moistening, and emotional warmth for advanced illness care.",
    description: "When medical curative intent transitions to comfort-focused quality of life, dignity is paramount. Our attendants and visiting nurses provide gentle repositioning, dry mouth relief, soothing touch, and quiet presence.",
    whoFor: [
      "Elders in end-stage chronic conditions wishing to stay peacefully at home",
      "Families seeking compassionate night or continuous relief support",
    ],
    inclusions: [
      "Meticulous position changes to eliminate pain and pressure points",
      "Frequent oral hygiene, lip balm application, and ice chip / sponge moistening",
      "Gentle forehead and extremity massages with natural oils",
      "Respectful, quiet bedside presence supporting family members in grief",
    ],
    exclusions: [
      "Invasive medical procedures without palliative physician concurrence",
    ],
    providerType: "Trained General Duty Attendant (GDA)",
    providerRoleTag: "Non-Clinical Attendant",
    status: "ASSESSMENT_REQUIRED",
    statusBadge: "Care Desk Assessment Required",
    estimatedRate: "From ₹1,499 / shift (custom quote)",
    baseBookingSlug: "elderly-care",
    faqs: [
      {
        q: "Can you coordinate with our palliative care physician?",
        a: "Yes. Our coordinators coordinate closely with your treating palliative team or hospice care provider.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // CATEGORY H: Mobility, Transportation & Escort
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "SC-H01",
    slug: "hospital-transport-coordination",
    name: "Medical Transit & Hospital Transport Escort",
    categoryId: "mobility-transit",
    categoryLabel: "Mobility, Transportation & Escort",
    categoryCode: "H",
    oneLiner: "Doorstep-to-clinic assisted transit in verified private vehicle or verified cab with trained female driver/escort.",
    description: "Eliminates the stress of hailing auto-rickshaws or negotiating traffic. A trained female driver or escort arrives punctually at home, assists the senior into the car seat, fastens seatbelts, drives defensively, and drops off at the clinic lobby.",
    whoFor: [
      "Senior citizens who find auto-rickshaws too bumpy or high to climb into",
      "Elders with scheduled dialysis, chemotherapy, or radiotherapy appointments",
      "Women seniors preferring a calm, verified woman chauffeur",
    ],
    inclusions: [
      "Punctual arrival at residence and gentle assistance entering vehicle",
      "Smooth, defensive driving avoiding sudden jerks, bumps, or sharp turns",
      "Air-conditioned private vehicle with clean sanitized interior",
      "Waiting during short appointments or returning for scheduled pickup",
      "Live GPS trip sharing link sent to family members",
    ],
    exclusions: [
      "Emergency ambulance siren transit with active ventilator support (call 108 for critical emergencies)",
    ],
    providerType: "Verified Woman Chauffeur & Transit Escort",
    providerRoleTag: "Transit Escort",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "From ₹1,199 / 4-hr round trip package",
    baseBookingSlug: "women-drivers",
    faqs: [
      {
        q: "Can the driver also walk my mother into the clinic?",
        a: "Yes. Our drivers or accompanying escorts provide doorstep-to-reception support.",
      },
    ],
    featured: true,
  },
  {
    id: "SC-H02",
    slug: "railway-station-elder-assistance",
    name: "Railway Station Platform & Coach Escort",
    categoryId: "mobility-transit",
    categoryLabel: "Mobility, Transportation & Escort",
    categoryCode: "H",
    oneLiner: "Concourse meet, coolie coordination, platform navigation, and safe coach berth settling for senior train travelers.",
    description: "Major Indian junction stations can be intimidating. Our station companion meets senior passengers at the station porch, coordinates licensed porters, secures station wheelchairs, and settles the elder comfortably onto their train berth.",
    whoFor: [
      "Senior citizens traveling by train to visit family in other states",
      "Elders nervous about navigating crowded overbridges and platform changes",
    ],
    inclusions: [
      "Meeting senior at designated station entrance porch 45 mins prior to departure",
      "Tracking real-time platform announcements and train delays",
      "Arranging licensed porters for luggage transfer",
      "Escorting senior to exact train coach and berth, confirming seating comfort",
      "Sending confirmation photo and coach number verification to family",
    ],
    exclusions: [
      "Purchasing train tickets or handling tatkal reservations",
    ],
    providerType: "Verified Woman Chauffeur & Transit Escort",
    providerRoleTag: "Transit Escort",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "From ₹899 / station trip",
    baseBookingSlug: "travel-assistance",
    faqs: [
      {
        q: "Do you also provide arrival assistance when the train reaches destination?",
        a: "Yes! If the destination is Bengaluru, Chennai, Hyderabad, or Coimbatore, a companion can meet the senior at the arrival platform.",
      },
    ],
  },
  {
    id: "SC-H03",
    slug: "airport-senior-gate-escort",
    name: "Airport Terminal & Departure Gate Escort",
    categoryId: "mobility-transit",
    categoryLabel: "Mobility, Transportation & Escort",
    categoryCode: "H",
    oneLiner: "Terminal curb meet-and-greet, airline wheelchair coordination, check-in assistance, and safe gate accompaniment.",
    description: "Large international airport terminals require miles of walking and complex digital self-drop counters. Our companion guides seniors from home to the departure gate or meets them at arrival baggage claim.",
    whoFor: [
      "Senior parents flying domestically or internationally to visit children",
      "Elders flying alone who need help with baggage trolleys and gate transfers",
    ],
    inclusions: [
      "Meeting at airport departure curb or home residence",
      "Airline wheelchair assistance coordination at check-in counters",
      "Boarding pass printing and baggage tag attachment assistance",
      "Accompaniment through security check to the departure gate",
      "Photo and gate departure confirmation dispatched to family phone",
    ],
    exclusions: [
      "Entering flight aircraft without airline passenger ticket",
    ],
    providerType: "Verified Woman Chauffeur & Transit Escort",
    providerRoleTag: "Transit Escort",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "From ₹999 / airport trip",
    baseBookingSlug: "travel-assistance",
    faqs: [
      {
        q: "What if the flight is delayed?",
        a: "Our companion monitors the live flight radar status and coordinates pickup timing accordingly at no penalty.",
      },
    ],
  },
  {
    id: "SC-H04",
    slug: "temple-family-outing-accompaniment",
    name: "Temple & Social Function Outing Companion",
    categoryId: "mobility-transit",
    categoryLabel: "Mobility, Transportation & Escort",
    categoryCode: "H",
    oneLiner: "Accompaniment to temple darshans, family weddings, and social gatherings with watchful step support.",
    description: "Elders often skip beloved family weddings or temple visits because they worry about stairs, crowded queues, or having to use public restrooms. Our companion stays by their side throughout the outing so they can enjoy social moments with full dignity.",
    whoFor: [
      "Seniors wishing to visit temples with marble steps and crowded darshan queues",
      "Elders attending family marriages, anniversaries, or community events",
    ],
    inclusions: [
      "Doorstep accompaniment from home to venue and return",
      "Safeguarding senior's footwear and walking stick at temple counters",
      "Guiding through queues with elbow support and locating rest seating",
      "Bringing senior food and water at dining halls, preventing crowd jostling",
    ],
    exclusions: [
      "Purchasing special VIP darshan tickets (family arranges entry tickets)",
    ],
    providerType: "Geriatric Personal Caregiver",
    providerRoleTag: "Non-Clinical Attendant",
    status: "VERIFIED_AVAILABLE",
    statusBadge: "Verified & Bookable",
    estimatedRate: "From ₹1,199 / half-day outing (up to 5 hours)",
    baseBookingSlug: "elderly-care",
    faqs: [
      {
        q: "Can the companion travel with my mother in our family car?",
        a: "Yes, companions gladly ride in your family vehicle or in an arranged cab.",
      },
    ],
  },
];

/**
 * Helper to get a senior care service by slug
 */
export const getSeniorCareService = (slug: string): SeniorCareServiceItem | undefined => {
  return SENIOR_CARE_SERVICES.find((s) => s.slug === slug);
};

/**
 * Helper to get services by category
 */
export const getSeniorCareServicesByCategory = (categoryId: SeniorCareCategoryId): SeniorCareServiceItem[] => {
  return SENIOR_CARE_SERVICES.filter((s) => s.categoryId === categoryId);
};
