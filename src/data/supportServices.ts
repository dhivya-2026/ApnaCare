/**
 * LifeSakhi Support Services Ecosystem — Three Primary Support Divisions
 * ──────────────────────────────────────────────────────────────────────
 * Single source of truth for:
 *  - Division A: Home Care & Personal Support
 *  - Division B: Mobility, Pickup & Travel Assistance
 *  - Division C: Technology for Assisted Living
 *
 * IMPORTANT — this module EXTENDS the existing service catalogue (src/data/site.ts).
 * Where a support service already exists (e.g. elderly-care, nursing-services,
 * post-natal-care, airport-pickup, railway-assistance, travel-assistance), the
 * `canonicalSlug` points at the established URL so no duplicate pages are created.
 * Alias routes (e.g. /services/home-nursing) redirect to the canonical URL.
 */

export type SupportDivisionId = "home-care" | "travel-mobility" | "assisted-living-technology";

export type SupportCareType = "non-clinical" | "clinical" | "travel" | "technology";

export type TravelType = "pickup" | "drop" | "railway" | "airport" | "short-distance" | "long-distance";

export type BookingFieldType =
  | "text"
  | "tel"
  | "number"
  | "date"
  | "time"
  | "select"
  | "multiselect"
  | "textarea";

export interface BookingFieldDef {
  name: string;
  label: string;
  type: BookingFieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  helper?: string;
  /** Options that depend on the selected city (e.g. airports). */
  optionsByCity?: Record<string, string[]>;
}

export interface SupportDivision {
  id: SupportDivisionId;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  whoFor: string[];
  keyOptions: string[];
  imageKey: SupportImageKey;
  imageAlt: string;
  accent: "primary" | "terracotta" | "ink";
}

export type SupportImageKey = "elderly" | "nursing" | "mother" | "travel" | "airport" | "home" | "technology";

export interface SupportServiceDef {
  /** Support identifier used in bookings, dashboards and analytics. */
  id: string;
  /** Public route slug (may be an alias that redirects to canonicalSlug). */
  routeSlug: string;
  /** Established URL slug under /services (or a full path for technology). */
  canonicalSlug: string;
  /** Full canonical path used for links. */
  path: string;
  /** Whether this service already existed before the expansion. */
  existedBefore: boolean;
  division: SupportDivisionId;
  careType: SupportCareType;
  travelType?: TravelType;
  name: string;
  shortDesc: string;
  heroHeadline: string;
  heroSummary: string;
  imageKey: SupportImageKey;
  imageAlt: string;
  whoNeeds: string[];
  situations: string[];
  included: string[];
  howItWorks: { title: string; desc: string }[];
  safety: string[];
  scopeNote?: string;
  availabilityNote: string;
  faqs: { q: string; a: string }[];
  /** Service-specific booking fields (common fields are added by the booking flow). */
  fields: BookingFieldDef[];
  seo: { title: string; description: string; keywords: string[] };
  /** Label stored in BookingRecord.service_category for operations reporting. */
  bookingCategory: string;
}

/* ─── Shared option lists ──────────────────────────────────────────────────── */

export const SUPPORT_CITIES = ["Bengaluru", "Chennai", "Hyderabad", "Coimbatore"] as const;

const VEHICLE_ARRANGEMENT = [
  "Companion only — family arranges the vehicle",
  "LifeSakhi woman driver for our own vehicle (subject to availability)",
  "Please help arrange a partner cab (subject to availability)",
];

const PASSENGER_ASSISTANCE = [
  "Senior citizen",
  "Wheelchair user",
  "Woman travelling alone",
  "Mother travelling with children",
  "Recovering patient",
  "Heavy luggage",
];

const LUGGAGE = ["No luggage", "1–2 bags", "3–4 bags", "5 or more bags"];

const AIRPORTS: Record<string, string[]> = {
  Bengaluru: ["Kempegowda International Airport (BLR)"],
  Chennai: ["Chennai International Airport (MAA)"],
  Hyderabad: ["Rajiv Gandhi International Airport (HYD)"],
  Coimbatore: ["Coimbatore International Airport (CJB)"],
};

const RAILWAY_STATIONS: Record<string, string[]> = {
  Bengaluru: [
    "KSR Bengaluru City Junction (SBC)",
    "Yesvantpur Junction (YPR)",
    "SMVT Bengaluru (Baiyappanahalli)",
    "Bengaluru Cantonment (BNC)",
    "Krishnarajapuram (KJM)",
  ],
  Chennai: [
    "Chennai Central (MAS)",
    "Chennai Egmore (MS)",
    "Tambaram (TBM)",
    "Perambur (PER)",
  ],
  Hyderabad: [
    "Secunderabad Junction (SC)",
    "Hyderabad Deccan / Nampally (HYB)",
    "Kacheguda (KCG)",
    "Lingampalli (LPI)",
  ],
  Coimbatore: ["Coimbatore Junction (CBE)", "Coimbatore North (CBF)", "Podanur Junction (PTJ)"],
};

/* ─── Divisions ────────────────────────────────────────────────────────────── */

export const SUPPORT_DIVISIONS: SupportDivision[] = [
  {
    id: "home-care",
    title: "Home Care & Nursing",
    shortTitle: "Home Care",
    tagline: "Dignified daily support, professional nursing and gentle care for new mothers — at home.",
    description:
      "Verified Saha attendants for everyday living, licensed GNM / B.Sc nurses for prescribed clinical care, and compassionate postnatal support for mother and baby.",
    whoFor: [
      "Elders living alone or with busy families",
      "Patients recovering after surgery or hospital stays",
      "New mothers and newborns in the first weeks",
    ],
    keyOptions: ["Elderly home care", "Home nursing (GNM / B.Sc)", "New mom & newborn support", "Family respite"],
    imageKey: "elderly",
    imageAlt: "Saha attendant gently supporting an elderly South Indian woman at home",
    accent: "primary",
  },
  {
    id: "travel-mobility",
    title: "Travel & Mobility Assistance",
    shortTitle: "Travel & Mobility",
    tagline: "A trusted companion for every pickup, drop, station, airport and journey.",
    description:
      "Pickup and drop coordination, railway station and airport assistance, and verified travel companions for local errands and long-distance journeys.",
    whoFor: [
      "Senior citizens travelling between cities",
      "Women travelling alone",
      "Mothers travelling with young children",
    ],
    keyOptions: [
      "Pickup & drop",
      "Railway station assistance",
      "Airport assistance",
      "Short & long-distance companions",
    ],
    imageKey: "travel",
    imageAlt: "Travel companion assisting a senior passenger with luggage at a railway platform",
    accent: "terracotta",
  },
  {
    id: "assisted-living-technology",
    title: "Technology for Assisted Living",
    shortTitle: "Assisted Living Tech",
    tagline: "Technology that makes independent living safer and care more connected.",
    description:
      "Remote monitoring, wearable SOS, smart-home safety sensors and family care coordination — introduced honestly, with clear deployment status for every solution.",
    whoFor: [
      "Parents living independently while children live elsewhere",
      "Families wanting visibility into care and attendance",
      "Seniors at risk of falls or emergencies at home",
    ],
    keyOptions: ["Remote monitoring", "Wearable SOS", "Smart home safety", "Family care coordination"],
    imageKey: "technology",
    imageAlt: "Senior gentleman at home using a simple health monitoring device with his family",
    accent: "ink",
  },
];

/* ─── Common FAQ building blocks ───────────────────────────────────────────── */

const FAQ_VERIFICATION = {
  q: "How are LifeSakhi team members verified?",
  a: "Every Saha attendant and companion completes government photo-ID authentication, police verification documentation, address checks, reference reviews and a practical skills assessment before being assigned to any family.",
};

const FAQ_AVAILABILITY = {
  q: "Is this service available in my city?",
  a: "We currently operate in Bengaluru, Chennai, Hyderabad and Coimbatore. Availability differs by service and locality, so the booking form checks your city first and tells you honestly whether we can confirm directly or need a coordinator review.",
};

const FAQ_CONFIRMATION = {
  q: "When is my booking confirmed?",
  a: "Your request is first recorded as a New Request. A coordinator reviews it, checks staff availability, and confirms by phone or WhatsApp. You will see each status change in your LifeSakhi dashboard.",
};

const FAQ_FLEET = {
  q: "Does LifeSakhi provide the vehicle?",
  a: "LifeSakhi provides verified companions and, where available, women drivers for your own vehicle. We do not operate our own transport fleet. If you need a vehicle, we can help arrange a partner cab on request, subject to availability.",
};

/* ─── Support Services ─────────────────────────────────────────────────────── */

export const SUPPORT_SERVICES: SupportServiceDef[] = [
  // ════════════ DIVISION A — HOME CARE & PERSONAL SUPPORT ════════════
  {
    id: "home-care-elderly",
    routeSlug: "home-care-elderly",
    canonicalSlug: "elderly-care",
    path: "/services/elderly-care",
    existedBefore: true,
    division: "home-care",
    careType: "non-clinical",
    name: "Home Care Support – Aged",
    shortDesc: "Companionship, daily living, hygiene, mobility and medication reminders for elders at home.",
    heroHeadline: "Everyday support that lets your parents age with dignity at home",
    heroSummary:
      "Verified Saha attendants for companionship, bathing, mobility, meals and routine monitoring — day, night or live-in.",
    imageKey: "elderly",
    imageAlt: "Saha attendant helping an elderly mother walk safely inside her home",
    whoNeeds: [
      "Elderly individuals living independently",
      "Senior citizens living with working family members",
      "Parents whose children live in other cities or countries",
      "Individuals needing temporary or long-term daily assistance",
    ],
    situations: [
      "A parent has become unsteady on their feet and needs walking support",
      "The family caregiver is exhausted and needs respite",
      "An elder needs reminders for medicines and meals during the day",
      "Nights are difficult and someone needs to stay overnight",
    ],
    included: [
      "Elderly companionship",
      "Daily living assistance",
      "Bathing and personal hygiene assistance",
      "Mobility and walking assistance",
      "Wheelchair assistance",
      "Medication reminders (as prescribed — not administration)",
      "Meal and feeding assistance",
      "Routine monitoring and daily updates to family",
      "Overnight assistance, subject to availability",
      "Family caregiver respite",
    ],
    howItWorks: [
      { title: "Share the need", desc: "Tell us about your parent's routine, mobility and preferred language." },
      { title: "Availability check", desc: "We confirm Saha availability in your locality and shift type." },
      { title: "Matched Saha", desc: "A coordinator shares the verified Saha profile before the first shift." },
      { title: "Ongoing updates", desc: "Attendance and care updates appear in your family dashboard." },
    ],
    safety: [
      "Police verification and government ID authentication for every Saha",
      "Geo-verified shift check-in and check-out",
      "Coordinator supervision and standby backup across active clusters",
      "Strictly non-clinical scope — clinical procedures are referred to licensed nurses",
    ],
    scopeNote:
      "Saha attendants provide non-clinical support only. Injections, wound dressing, catheter care and other clinical procedures are delivered by licensed nurses through Home Care Nursing Support.",
    availabilityNote: "Day (8/12 hr), night and 24-hour live-in shifts across Bengaluru, Chennai, Hyderabad and Coimbatore.",
    faqs: [FAQ_VERIFICATION, FAQ_AVAILABILITY, FAQ_CONFIRMATION],
    fields: [
      { name: "recipient_name", label: "Elder's name", type: "text", required: true },
      { name: "recipient_age", label: "Elder's age", type: "number", required: true },
      {
        name: "mobility_level",
        label: "Mobility",
        type: "select",
        required: true,
        options: ["Independent", "Needs walking support", "Wheelchair user", "Mostly bed-bound"],
      },
      {
        name: "shift_type",
        label: "Shift type",
        type: "select",
        required: true,
        options: ["Day shift (8 hrs)", "Day shift (12 hrs)", "Night shift (12 hrs)", "24-hour live-in"],
      },
      { name: "duration_days", label: "Number of days", type: "number", required: true, placeholder: "e.g. 7" },
      {
        name: "support_needs",
        label: "Support needed",
        type: "multiselect",
        required: true,
        options: [
          "Companionship",
          "Daily living assistance",
          "Bathing & hygiene",
          "Mobility & walking",
          "Wheelchair assistance",
          "Medication reminders",
          "Meals & feeding",
          "Routine monitoring",
          "Overnight assistance",
          "Family respite",
        ],
      },
      { name: "preferred_language", label: "Preferred language", type: "select", options: ["Tamil", "Kannada", "Telugu", "Malayalam", "Hindi", "English"] },
    ],
    seo: {
      title: "Elderly Care at Home in Bengaluru, Chennai, Hyderabad & Coimbatore | LifeSakhi",
      description:
        "Verified Saha attendants for elderly companionship, bathing, mobility, medication reminders, meals and overnight support at home across South India.",
      keywords: ["elderly care at home", "home care for elderly parents", "senior care South India"],
    },
    bookingCategory: "Elderly Care",
  },
  {
    id: "home-nursing",
    routeSlug: "home-nursing",
    canonicalSlug: "nursing-services",
    path: "/services/nursing-services",
    existedBefore: true,
    division: "home-care",
    careType: "clinical",
    name: "Home Care Nursing Support",
    shortDesc: "Registered GNM and B.Sc nurses for doctor-prescribed procedures and recovery at home.",
    heroHeadline: "Licensed nursing care at home, following your doctor's prescription",
    heroSummary:
      "Registered GNM and B.Sc Nursing professionals for post-operative care, wound dressing, injections, catheter care and clinical monitoring.",
    imageKey: "nursing",
    imageAlt: "Registered nurse checking a recovering patient's vitals at home",
    whoNeeds: [
      "Patients discharged after surgery",
      "Elders with chronic conditions needing clinical monitoring",
      "Families needing prescribed injections or dressings at home",
    ],
    situations: [
      "A parent has been discharged and needs daily wound dressing",
      "The doctor has prescribed injections over several days",
      "A catheter needs regular care and monitoring",
      "Vitals need professional monitoring during recovery",
    ],
    included: [
      "Registered GNM nurses",
      "B.Sc Nursing professionals",
      "Post-operative nursing",
      "Wound dressing",
      "Injection administration",
      "Catheter care",
      "Clinical monitoring",
      "Recovery assistance",
      "Doctor-prescribed nursing procedures",
    ],
    howItWorks: [
      { title: "Share prescription", desc: "Tell us the procedures required and share the doctor's prescription." },
      { title: "Clinical review", desc: "Our coordinator reviews the request before a nurse is matched." },
      { title: "Registered nurse", desc: "A licensed GNM / B.Sc nurse visits as per the agreed schedule." },
      { title: "Visit records", desc: "Visit notes and attendance are recorded for the family." },
    ],
    safety: [
      "Nursing registration verified before assignment",
      "Procedures performed only against a valid doctor's prescription",
      "Clinical protocols for hygiene, sharps and medication handling",
      "Escalation to the treating doctor or emergency services when needed",
    ],
    scopeNote:
      "Licensed nursing support is separate from Saha attendant support. Clinical procedures are never assigned to non-clinical attendants.",
    availabilityNote: "Per-visit and shift-based nursing, subject to nurse availability in your locality.",
    faqs: [
      {
        q: "What is the difference between a nurse and a Saha attendant?",
        a: "A Saha attendant provides non-clinical daily living support. A registered nurse (GNM / B.Sc) performs clinical procedures such as injections, wound dressing and catheter care under a doctor's prescription.",
      },
      {
        q: "Do I need a doctor's prescription?",
        a: "Yes. All clinical procedures require a valid prescription or discharge summary from the treating doctor.",
      },
      FAQ_AVAILABILITY,
      FAQ_CONFIRMATION,
    ],
    fields: [
      { name: "recipient_name", label: "Patient's name", type: "text", required: true },
      { name: "recipient_age", label: "Patient's age", type: "number", required: true },
      { name: "nurse_qualification", label: "Nurse qualification preferred", type: "select", required: true, options: ["GNM", "B.Sc Nursing", "Either"] },
      {
        name: "procedures",
        label: "Procedures required",
        type: "multiselect",
        required: true,
        options: [
          "Post-operative nursing",
          "Wound dressing",
          "Injection administration",
          "Catheter care",
          "Clinical monitoring",
          "Recovery assistance",
          "Other prescribed procedure",
        ],
      },
      { name: "visit_type", label: "Visit type", type: "select", required: true, options: ["Single visit", "Daily visits", "12-hour shift", "24-hour shift"] },
      {
        name: "doctor_prescription",
        label: "Doctor's prescription",
        type: "select",
        required: true,
        options: ["Available — will share", "Will obtain before the visit"],
        helper: "Clinical procedures are only performed against a valid prescription.",
      },
      { name: "treating_doctor", label: "Treating doctor / hospital (optional)", type: "text" },
    ],
    seo: {
      title: "Home Nursing Services — GNM & B.Sc Nurses at Home | LifeSakhi",
      description:
        "Registered GNM and B.Sc nurses for post-operative care, wound dressing, injections and catheter care at home, following doctor prescriptions.",
      keywords: ["home nursing services", "nurse at home", "post operative care at home"],
    },
    bookingCategory: "Nursing Services",
  },
  {
    id: "new-mom-support",
    routeSlug: "new-mom-support",
    canonicalSlug: "post-natal-care",
    path: "/services/post-natal-care",
    existedBefore: true,
    division: "home-care",
    careType: "non-clinical",
    name: "New Mom Support",
    shortDesc: "Compassionate postnatal care for mother and newborn — recovery, feeding routines and rest.",
    heroHeadline: "Caring for the mother while she cares for her baby",
    heroSummary:
      "Experienced postnatal Sahas support maternal recovery, newborn hygiene and massage, feeding routines and night-time care so the new mother can rest.",
    imageKey: "mother",
    imageAlt: "Postnatal Saha supporting a new mother holding her newborn at home",
    whoNeeds: [
      "Mothers recovering after normal or C-section delivery",
      "Families without elders available to help",
      "Parents of twins or premature babies (after paediatric clearance)",
    ],
    situations: [
      "The mother needs rest and help with recovery routines",
      "Night feeds are leaving the family exhausted",
      "First-time parents want guidance with bathing and massage",
      "The family wants traditional postpartum support with modern hygiene",
    ],
    included: [
      "Postnatal mother care",
      "Maternal recovery assistance",
      "Newborn handling and care",
      "Baby massage and hygiene assistance",
      "Feeding routine assistance",
      "Night-time newborn support",
      "Mother rest and recovery assistance",
      "Postpartum family support",
    ],
    howItWorks: [
      { title: "Tell us your due date", desc: "Share delivery details, baby count and preferred shift." },
      { title: "Availability check", desc: "We confirm an experienced postnatal Saha for your dates." },
      { title: "Meet your Saha", desc: "Review the Saha profile before care begins." },
      { title: "Gentle routine", desc: "Daily routines and updates are recorded in your dashboard." },
    ],
    safety: [
      "Postnatal and newborn hygiene training",
      "Police and ID verification for every Saha",
      "Medical concerns escalated to your gynaecologist or paediatrician",
      "Non-clinical scope — no medication administration",
    ],
    availabilityNote: "Day, night and 24-hour live-in postnatal support, best booked 2–4 weeks before the due date.",
    faqs: [FAQ_VERIFICATION, FAQ_AVAILABILITY, FAQ_CONFIRMATION],
    fields: [
      { name: "mother_name", label: "Mother's name", type: "text", required: true },
      { name: "delivery_type", label: "Delivery", type: "select", required: true, options: ["Normal delivery", "C-section", "Not yet delivered"] },
      { name: "delivery_date", label: "Delivery / due date", type: "date", required: true },
      { name: "baby_count", label: "Babies", type: "select", required: true, options: ["One baby", "Twins"] },
      {
        name: "support_needs",
        label: "Support needed",
        type: "multiselect",
        required: true,
        options: [
          "Postnatal mother care",
          "Maternal recovery",
          "Newborn handling",
          "Baby massage & hygiene",
          "Feeding routine",
          "Night-time newborn support",
          "Mother rest & recovery",
          "Postpartum family support",
        ],
      },
      { name: "shift_type", label: "Shift type", type: "select", required: true, options: ["Day shift (12 hrs)", "Night shift (12 hrs)", "24-hour live-in"] },
      { name: "duration_days", label: "Number of days", type: "number", required: true, placeholder: "e.g. 30" },
    ],
    seo: {
      title: "New Mother Support & Newborn Care at Home | LifeSakhi",
      description:
        "Compassionate postnatal care for new mothers and newborns — recovery, baby massage, feeding routines and night support across South India.",
      keywords: ["new mother support", "postnatal care at home", "newborn care at home"],
    },
    bookingCategory: "Post-Natal Care",
  },

  // ════════════ DIVISION B — MOBILITY, PICKUP & TRAVEL ════════════
  {
    id: "pickup",
    routeSlug: "pickup",
    canonicalSlug: "pickup",
    path: "/services/pickup",
    existedBefore: false,
    division: "travel-mobility",
    careType: "travel",
    travelType: "pickup",
    name: "Pickup Assistance",
    shortDesc: "A verified companion meets your family member and accompanies them to their destination.",
    heroHeadline: "Someone trusted waiting at the pickup point",
    heroSummary:
      "Book a verified LifeSakhi companion to meet your family member at home, hospital, hotel or any pickup point and accompany them safely to their destination.",
    imageKey: "travel",
    imageAlt: "LifeSakhi companion meeting a senior woman at her gate for a pickup",
    whoNeeds: [
      "Seniors returning from hospital or a clinic",
      "Women arriving late in the city",
      "Visiting parents who are unfamiliar with the city",
    ],
    situations: [
      "Your parent is being discharged and you cannot reach in time",
      "A relative arrives at a bus stand late at night",
      "A senior needs help with luggage and getting into the vehicle",
    ],
    included: [
      "Meet at the pickup point at the scheduled time",
      "Passenger and luggage assistance",
      "Mobility support for seniors and wheelchair users",
      "Accompanied journey to the destination",
      "Pickup confirmation and assigned staff details shared with family",
    ],
    howItWorks: [
      { title: "Share pickup details", desc: "Pickup point, time, destination and passenger needs." },
      { title: "Availability check", desc: "We confirm a companion near the pickup location." },
      { title: "Staff assigned", desc: "Companion name and contact appear in your dashboard once assigned." },
      { title: "Pickup confirmed", desc: "The companion marks pickup and completion so operations can track it." },
    ],
    safety: [
      "Police-verified companions with ID badges",
      "Assigned staff details shared before pickup",
      "Pickup and completion status recorded by the companion",
      "Emergency contact informed of any delay",
    ],
    scopeNote:
      "LifeSakhi provides companions, not a transport fleet. Vehicles are arranged by the family, driven by a LifeSakhi woman driver in your own car, or booked via a partner cab on request.",
    availabilityNote: "Scheduled pickups in Bengaluru, Chennai and Hyderabad; Coimbatore after coordinator review.",
    faqs: [FAQ_FLEET, FAQ_VERIFICATION, FAQ_AVAILABILITY, FAQ_CONFIRMATION],
    fields: [
      { name: "pickup_location", label: "Pickup location", type: "text", required: true, placeholder: "Full address or landmark" },
      { name: "destination", label: "Destination", type: "text", required: true },
      { name: "passenger_name", label: "Passenger name", type: "text", required: true },
      { name: "passenger_count", label: "Number of passengers", type: "number", required: true, placeholder: "1" },
      { name: "passenger_assistance", label: "Passenger assistance", type: "multiselect", options: PASSENGER_ASSISTANCE },
      { name: "luggage", label: "Luggage", type: "select", required: true, options: LUGGAGE },
      { name: "mobility_requirements", label: "Special mobility requirements", type: "text", placeholder: "e.g. needs wheelchair, walker" },
      { name: "vehicle_arrangement", label: "Vehicle arrangement", type: "select", required: true, options: VEHICLE_ARRANGEMENT },
    ],
    seo: {
      title: "Pickup Assistance with a Verified Companion | LifeSakhi",
      description:
        "Book a verified LifeSakhi companion to meet and accompany seniors, women and families from any pickup point in Bengaluru, Chennai and Hyderabad.",
      keywords: ["pickup assistance for senior citizens", "escort pickup service", "women companion pickup"],
    },
    bookingCategory: "Pickup Assistance",
  },
  {
    id: "drop",
    routeSlug: "drop",
    canonicalSlug: "drop",
    path: "/services/drop",
    existedBefore: false,
    division: "travel-mobility",
    careType: "travel",
    travelType: "drop",
    name: "Drop Assistance",
    shortDesc: "Accompanied drop-off with a confirmed handover to the receiving person.",
    heroHeadline: "Safely accompanied — and handed over in person",
    heroSummary:
      "A verified companion accompanies your family member from the starting point to the drop destination and confirms the handover to the person receiving them.",
    imageKey: "travel",
    imageAlt: "Companion handing over an elderly passenger to her daughter at the destination",
    whoNeeds: [
      "Seniors travelling to a relative's home or hospital",
      "Children or teenagers who need a trusted adult escort",
      "Women who prefer accompanied travel",
    ],
    situations: [
      "A parent needs to reach a hospital appointment and be handed to staff",
      "A relative must be dropped at a station or another home",
      "The family needs proof that the drop was completed",
    ],
    included: [
      "Pickup from the starting location",
      "Accompanied journey to the drop destination",
      "Passenger and luggage assistance",
      "Handover to the named receiving person",
      "Drop completion confirmation recorded for the family and operations",
    ],
    howItWorks: [
      { title: "Share drop details", desc: "Start point, destination, time and who receives the passenger." },
      { title: "Availability check", desc: "We confirm a companion for the route and time." },
      { title: "Staff assigned", desc: "You see the companion's details once assigned." },
      { title: "Handover confirmed", desc: "The companion records the handover and completion." },
    ],
    safety: [
      "Handover only to the named receiving person",
      "Police-verified companions",
      "Completion status visible to family and operations",
      "Emergency contact informed of delays",
    ],
    scopeNote:
      "LifeSakhi does not operate its own vehicles. Choose the vehicle arrangement that suits you when booking.",
    availabilityNote: "Scheduled drops in Bengaluru, Chennai and Hyderabad; Coimbatore after coordinator review.",
    faqs: [FAQ_FLEET, FAQ_VERIFICATION, FAQ_AVAILABILITY, FAQ_CONFIRMATION],
    fields: [
      { name: "start_location", label: "Starting location", type: "text", required: true },
      { name: "drop_destination", label: "Drop destination", type: "text", required: true },
      { name: "passenger_name", label: "Passenger name", type: "text", required: true },
      { name: "passenger_count", label: "Number of passengers", type: "number", required: true, placeholder: "1" },
      { name: "passenger_assistance", label: "Assistance requirements", type: "multiselect", options: PASSENGER_ASSISTANCE },
      { name: "handover_name", label: "Receiving person's name", type: "text", required: true },
      { name: "handover_phone", label: "Receiving person's phone", type: "tel", required: true },
      { name: "vehicle_arrangement", label: "Vehicle arrangement", type: "select", required: true, options: VEHICLE_ARRANGEMENT },
    ],
    seo: {
      title: "Accompanied Drop Assistance with Handover Confirmation | LifeSakhi",
      description:
        "Verified companions accompany seniors, women and children to their destination and confirm the handover in person.",
      keywords: ["drop assistance for elderly", "escort drop service", "accompanied travel"],
    },
    bookingCategory: "Drop Assistance",
  },
  {
    id: "railway-assistance",
    routeSlug: "railway-assistance",
    canonicalSlug: "railway-assistance",
    path: "/services/railway-assistance",
    existedBefore: true,
    division: "travel-mobility",
    careType: "travel",
    travelType: "railway",
    name: "Railway Station Pickup & Assistance",
    shortDesc: "Station pickup, platform coordination, luggage help and confirmed handover for train travellers.",
    heroHeadline: "From the platform to the doorstep, without the stress",
    heroSummary:
      "A verified companion meets your family member at the station, helps with luggage and navigation, and coordinates the platform-to-vehicle handover.",
    imageKey: "travel",
    imageAlt: "Companion helping a senior passenger with luggage on a railway platform",
    whoNeeds: [
      "Elderly passengers arriving or departing by train",
      "Women travelling alone",
      "Mothers travelling with children",
    ],
    situations: [
      "A parent arrives early morning at a busy junction",
      "Heavy luggage and stairs make boarding difficult",
      "The family wants confirmation once the passenger is settled",
    ],
    included: [
      "Railway station pickup",
      "Arrival assistance",
      "Platform navigation, subject to railway access permissions",
      "Luggage assistance and licensed porter coordination",
      "Elderly passenger assistance",
      "Assistance for women travelling alone",
      "Assistance for mothers travelling with children",
      "Platform-to-vehicle coordination",
      "Passenger handover confirmation",
    ],
    howItWorks: [
      { title: "Share train details", desc: "Train number, station, date, coach and passenger needs." },
      { title: "Station coverage check", desc: "We confirm coverage for the station and time." },
      { title: "Companion assigned", desc: "Companion details are shared before arrival." },
      { title: "Handover confirmed", desc: "Pickup and handover are recorded for your family." },
    ],
    safety: [
      "Platform access follows Indian Railways rules and permissions",
      "Licensed porters used for heavy luggage",
      "Police-verified companions",
      "Handover confirmation shared with family",
    ],
    availabilityNote: "Major junctions in all four operating cities; smaller stations after coordinator review.",
    faqs: [FAQ_VERIFICATION, FAQ_AVAILABILITY, FAQ_CONFIRMATION, FAQ_FLEET],
    fields: [
      { name: "journey_direction", label: "Arrival or departure", type: "select", required: true, options: ["Arrival — pick up from station", "Departure — drop at station"] },
      { name: "station", label: "Railway station", type: "select", required: true, optionsByCity: RAILWAY_STATIONS },
      { name: "train_number", label: "Train number", type: "text", required: true, placeholder: "e.g. 12657" },
      { name: "train_name", label: "Train name", type: "text", placeholder: "e.g. Chennai Mail" },
      { name: "platform", label: "Platform (if known)", type: "text" },
      { name: "coach_seat", label: "Coach & seat (if applicable)", type: "text", placeholder: "e.g. B2 / 34" },
      { name: "passenger_name", label: "Passenger name", type: "text", required: true },
      { name: "passenger_count", label: "Passengers", type: "number", required: true, placeholder: "1" },
      { name: "luggage_count", label: "Luggage count", type: "number", placeholder: "2" },
      { name: "destination", label: "Destination after arrival / pickup point before departure", type: "text", required: true },
      { name: "passenger_assistance", label: "Special assistance", type: "multiselect", options: PASSENGER_ASSISTANCE },
    ],
    seo: {
      title: "Railway Station Assistance for Seniors & Women Travellers | LifeSakhi",
      description:
        "Station pickup, luggage assistance, platform coordination and handover confirmation at major railway stations in Bengaluru, Chennai, Hyderabad and Coimbatore.",
      keywords: ["railway station assistance", "senior citizen railway help", "station pickup service"],
    },
    bookingCategory: "Railway Assistance",
  },
  {
    id: "airport-assistance",
    routeSlug: "airport-assistance",
    canonicalSlug: "airport-pickup",
    path: "/services/airport-pickup",
    existedBefore: true,
    division: "travel-mobility",
    careType: "travel",
    travelType: "airport",
    name: "Airport Pickup & Assistance",
    shortDesc: "Meet-and-greet, terminal navigation, luggage help and airport-to-home transfers.",
    heroHeadline: "A familiar, friendly face at the airport",
    heroSummary:
      "Arrival meet-and-greet, departure assistance, terminal navigation and accompanied airport-to-home transfers for seniors, women and families.",
    imageKey: "airport",
    imageAlt: "Airport companion greeting an elderly passenger at the arrivals gate",
    whoNeeds: [
      "Elderly parents flying in to visit",
      "Women arriving on late-night flights",
      "Mothers travelling with infants",
    ],
    situations: [
      "A parent is flying alone for the first time",
      "A late-night arrival needs a trusted escort home",
      "Wheelchair assistance must be coordinated with airline staff",
    ],
    included: [
      "Airport pickup and airport drop",
      "Arrival meet-and-greet",
      "Departure assistance",
      "Terminal navigation (public areas)",
      "Luggage assistance",
      "Elderly passenger support",
      "Assistance for women travelling alone",
      "Mother and child travel assistance",
      "Airport-to-home transfers (with your chosen vehicle arrangement)",
    ],
    howItWorks: [
      { title: "Share flight details", desc: "Airport, terminal and, if relevant, flight number and time." },
      { title: "Coverage check", desc: "We confirm airport coverage for the date and time." },
      { title: "Companion assigned", desc: "You receive the companion's details before the flight." },
      { title: "Handover confirmed", desc: "Arrival/departure and handover are recorded for your family." },
    ],
    safety: [
      "Companions operate in public terminal areas; restricted zones follow airport and airline rules",
      "Wheelchair assistance coordinated with airline ground staff",
      "Police-verified companions with ID badges",
      "Flight delays monitored and family informed",
    ],
    availabilityNote: "BLR, MAA, HYD and CJB airports, with advance booking.",
    faqs: [FAQ_VERIFICATION, FAQ_AVAILABILITY, FAQ_CONFIRMATION, FAQ_FLEET],
    fields: [
      { name: "journey_direction", label: "Arrival or departure", type: "select", required: true, options: ["Arrival — pick up from airport", "Departure — drop at airport"] },
      { name: "airport", label: "Airport", type: "select", required: true, optionsByCity: AIRPORTS },
      { name: "terminal", label: "Terminal", type: "text", placeholder: "e.g. T2" },
      { name: "flight_number", label: "Flight number (optional)", type: "text", placeholder: "e.g. 6E 245" },
      { name: "airline", label: "Airline (optional)", type: "text" },
      { name: "passenger_name", label: "Passenger name", type: "text", required: true },
      { name: "passenger_count", label: "Passengers", type: "number", required: true, placeholder: "1" },
      { name: "luggage_count", label: "Luggage count", type: "number", placeholder: "2" },
      { name: "pickup_or_destination", label: "Home address (destination or pickup)", type: "text", required: true },
      { name: "passenger_assistance", label: "Assistance requirements", type: "multiselect", options: PASSENGER_ASSISTANCE },
      { name: "vehicle_arrangement", label: "Vehicle arrangement", type: "select", required: true, options: VEHICLE_ARRANGEMENT },
    ],
    seo: {
      title: "Airport Assistance for Senior Citizens & Women Travellers | LifeSakhi",
      description:
        "Meet-and-greet, terminal navigation, luggage help and accompanied airport-to-home transfers at BLR, MAA, HYD and CJB airports.",
      keywords: ["airport assistance for senior citizens", "airport meet and greet", "airport pickup for parents"],
    },
    bookingCategory: "Airport Assistance",
  },
  {
    id: "short-distance-companion",
    routeSlug: "short-distance-companion",
    canonicalSlug: "short-distance-companion",
    path: "/services/short-distance-companion",
    existedBefore: false,
    division: "travel-mobility",
    careType: "travel",
    travelType: "short-distance",
    name: "Short-Distance Travel Companion Support",
    shortDesc: "Accompanied local journeys for appointments, banking, shopping and errands.",
    heroHeadline: "A dependable companion for every local journey",
    heroSummary:
      "A verified companion accompanies your parent or family member to hospital appointments, doctor visits, the bank, shopping and local errands — and back home.",
    imageKey: "home",
    imageAlt: "Companion walking with an elderly gentleman to a clinic appointment",
    whoNeeds: [
      "Seniors who should not travel alone to appointments",
      "Women who prefer accompanied local travel",
      "Families who cannot take time off for errands",
    ],
    situations: [
      "A parent has a hospital follow-up while you are at work",
      "Banking or pension paperwork needs someone patient alongside",
      "An elder wants to go shopping or to the temple safely",
    ],
    included: [
      "Hospital appointments",
      "Doctor visits",
      "Shopping assistance",
      "Banking visits",
      "Local errands",
      "Women's assisted travel",
      "Elderly mobility assistance",
      "Accompanied local journeys",
    ],
    howItWorks: [
      { title: "Share the plan", desc: "Purpose, destination, time and expected duration." },
      { title: "Availability check", desc: "We confirm a companion in your locality." },
      { title: "Companion assigned", desc: "Companion details appear in your dashboard." },
      { title: "Journey completed", desc: "Start and completion are recorded for your family." },
    ],
    safety: [
      "Police-verified companions",
      "Companion support only — not licensed security or physical protection",
      "Family informed at start and completion",
      "Emergency escalation through the LifeSakhi care desk",
    ],
    scopeNote:
      "This is companion and mobility support. It is not a licensed security or close-protection service.",
    availabilityNote: "2 to 8 hour local journeys in Bengaluru, Chennai and Hyderabad; Coimbatore after coordinator review.",
    faqs: [
      {
        q: "Is this a security guard service?",
        a: "No. Short-distance companions provide accompaniment and mobility support. LifeSakhi does not promise licensed security or physical protection through this service.",
      },
      FAQ_FLEET,
      FAQ_AVAILABILITY,
      FAQ_CONFIRMATION,
    ],
    fields: [
      {
        name: "purpose",
        label: "Purpose of the journey",
        type: "select",
        required: true,
        options: [
          "Hospital appointment",
          "Doctor visit",
          "Shopping",
          "Banking visit",
          "Local errands",
          "Women's assisted travel",
          "Elderly mobility assistance",
          "Other local journey",
        ],
      },
      { name: "passenger_name", label: "Person being accompanied", type: "text", required: true },
      { name: "destination", label: "Destination(s)", type: "text", required: true },
      { name: "estimated_hours", label: "Estimated duration", type: "select", required: true, options: ["Up to 2 hours", "Up to 4 hours", "Up to 6 hours", "Up to 8 hours"] },
      { name: "passenger_assistance", label: "Assistance requirements", type: "multiselect", options: PASSENGER_ASSISTANCE },
      { name: "vehicle_arrangement", label: "Vehicle arrangement", type: "select", required: true, options: VEHICLE_ARRANGEMENT },
    ],
    seo: {
      title: "Short-Distance Travel Companion for Seniors & Women | LifeSakhi",
      description:
        "Verified companions for hospital appointments, doctor visits, banking, shopping and local errands in Bengaluru, Chennai and Hyderabad.",
      keywords: ["companion for hospital visits", "women's travel companion services", "elderly escort local"],
    },
    bookingCategory: "Short-Distance Companion",
  },
  {
    id: "long-distance-companion",
    routeSlug: "long-distance-companion",
    canonicalSlug: "travel-assistance",
    path: "/services/travel-assistance",
    existedBefore: true,
    division: "travel-mobility",
    careType: "travel",
    travelType: "long-distance",
    name: "Long-Distance Travel Companion Support",
    shortDesc: "Intercity journey accompaniment with scheduled family updates and arrival confirmation.",
    heroHeadline: "A companion for the whole journey, city to city",
    heroSummary:
      "Verified companions accompany seniors, patients and women travelling between cities — coordinating the journey, luggage and family updates until arrival.",
    imageKey: "travel",
    imageAlt: "Travel companion seated beside an elderly passenger on an intercity train",
    whoNeeds: [
      "Elderly parents travelling to visit children",
      "Patients travelling for medical treatment",
      "Women travelling solo between cities",
    ],
    situations: [
      "A parent needs to travel from Coimbatore to Bengaluru for treatment",
      "A senior is moving between children's homes in different cities",
      "A woman prefers a companion for an overnight journey",
    ],
    included: [
      "Intercity travel accompaniment",
      "Elderly travel assistance",
      "Medical travel support (non-clinical)",
      "Women's solo travel accompaniment",
      "Family-related travel",
      "Journey coordination",
      "Luggage assistance",
      "Scheduled family updates",
      "Arrival confirmation",
    ],
    howItWorks: [
      { title: "Share the journey", desc: "Cities, travel mode, date and passenger needs." },
      { title: "Feasibility review", desc: "We confirm companion availability and journey feasibility." },
      { title: "Companion assigned", desc: "You receive companion details and the update schedule." },
      { title: "Arrival confirmed", desc: "Updates during the journey and confirmation on arrival." },
    ],
    safety: [
      "Police-verified companions",
      "Scheduled updates to your emergency contact",
      "Tickets and transport booked separately by the family or via partners",
      "Non-clinical support — medical needs require a nurse or doctor clearance",
    ],
    scopeNote:
      "Companion staffing is separate from transportation. Tickets and vehicles are arranged by the family; LifeSakhi does not operate its own fleet.",
    availabilityNote: "Subject to staff availability and operational feasibility; every journey is reviewed before confirmation.",
    faqs: [FAQ_FLEET, FAQ_VERIFICATION, FAQ_AVAILABILITY, FAQ_CONFIRMATION],
    fields: [
      { name: "from_city", label: "Starting city", type: "text", required: true },
      { name: "to_city", label: "Destination city", type: "text", required: true },
      { name: "travel_mode", label: "Travel mode", type: "select", required: true, options: ["Train", "Flight", "Bus", "Car (family arranged)"] },
      { name: "journey_duration", label: "Estimated journey duration", type: "text", required: true, placeholder: "e.g. 6 hours" },
      { name: "passenger_name", label: "Passenger name", type: "text", required: true },
      { name: "passenger_count", label: "Passengers", type: "number", required: true, placeholder: "1" },
      {
        name: "companion_requirements",
        label: "Companion requirements",
        type: "multiselect",
        options: [
          "Elderly travel assistance",
          "Medical travel support",
          "Women's solo travel",
          "Family travel",
          "Luggage assistance",
          "Scheduled family updates",
        ],
      },
      { name: "return_journey", label: "Return journey", type: "select", options: ["One-way only", "Return companion needed"] },
    ],
    seo: {
      title: "Long-Distance Travel Companion for Seniors & Women | LifeSakhi",
      description:
        "Verified companions for intercity journeys with luggage help, scheduled family updates and arrival confirmation.",
      keywords: ["travel companion for elderly", "women's travel companion services", "intercity escort"],
    },
    bookingCategory: "Long-Distance Companion",
  },

  // ════════════ DIVISION C — TECHNOLOGY FOR ASSISTED LIVING ════════════
  {
    id: "assisted-living-technology",
    routeSlug: "assisted-living-technology",
    canonicalSlug: "assisted-living-technology",
    path: "/offerings/assisted-living-technology",
    existedBefore: false,
    division: "assisted-living-technology",
    careType: "technology",
    name: "Technology for Assisted Living",
    shortDesc: "Remote monitoring, wearable SOS, smart-home sensors and family care coordination.",
    heroHeadline: "Technology that makes independent living safer and care more connected",
    heroSummary:
      "Practical, honestly-labelled solutions — from family care coordination already running on LifeSakhi to partner wearables and evaluated smart-home sensors.",
    imageKey: "technology",
    imageAlt: "Senior using a wearable SOS device while his daughter checks updates on her phone",
    whoNeeds: [
      "Parents living alone while children live elsewhere",
      "Seniors at risk of falls",
      "Families wanting care and attendance visibility",
    ],
    situations: [
      "You worry about what happens if a parent falls at night",
      "You want to know the attendant arrived on time",
      "The doctor wants regular BP or glucose readings",
    ],
    included: [
      "Remote patient monitoring",
      "Wearable SOS solutions",
      "Smart home sensors",
      "Family care coordination",
      "Predictive health analytics (under evaluation)",
    ],
    howItWorks: [
      { title: "Request a demonstration", desc: "Tell us which solutions interest you." },
      { title: "Needs assessment", desc: "A coordinator checks home setup, connectivity and device compatibility." },
      { title: "Recommendation", desc: "We recommend deployed or partner solutions — never unavailable ones." },
      { title: "Setup & support", desc: "Partner devices are installed and linked to family contacts where supported." },
    ],
    safety: [
      "Every solution shows its real deployment status",
      "No fabricated live data, alerts or AI predictions",
      "Family access only for authorised contacts",
      "Partner devices follow partner privacy terms",
    ],
    availabilityNote: "Demonstrations in all four cities; device availability depends on partner coverage.",
    faqs: [
      {
        q: "Are all of these technologies live today?",
        a: "No. Each solution is labelled Deployed, Available Through Partners or Under Evaluation. We only recommend what can actually be delivered in your city.",
      },
      FAQ_AVAILABILITY,
      FAQ_CONFIRMATION,
    ],
    fields: [
      {
        name: "solutions",
        label: "Solutions of interest",
        type: "multiselect",
        required: true,
        options: [
          "Remote patient monitoring",
          "Wearable SOS",
          "Smart home sensors",
          "Family care coordination",
          "Predictive health analytics",
        ],
      },
      { name: "recipient_name", label: "Who is this for?", type: "text", required: true },
      { name: "living_situation", label: "Living situation", type: "select", required: true, options: ["Lives alone", "Lives with spouse", "Lives with family", "Has a Saha attendant"] },
      { name: "home_internet", label: "Home Wi-Fi available?", type: "select", options: ["Yes", "No", "Not sure"] },
      { name: "demo_preference", label: "Preferred demonstration", type: "select", required: true, options: ["Video call", "Home visit", "Phone call"] },
    ],
    seo: {
      title: "Assisted Living Technology — Remote Monitoring, SOS & Smart Home Safety | LifeSakhi",
      description:
        "Remote patient monitoring, wearable SOS, smart home sensors and family care coordination for seniors living independently — with honest deployment status.",
      keywords: ["assisted living technology", "wearable SOS for elderly", "remote monitoring for parents"],
    },
    bookingCategory: "Assisted Living Technology",
  },
];

/* ─── Technology solutions (Division C detail) ─────────────────────────────── */

export type TechReadiness = "Deployed" | "Available Through Partners" | "Under Evaluation";

export interface AssistedLivingSolution {
  id: string;
  offeringsId: string; // maps to TECHNOLOGY_CATEGORIES id in offerings.ts
  title: string;
  readiness: TechReadiness;
  whatItIs: string;
  whoNeedsIt: string;
  problem: string;
  howItWorks: string;
  familyReceives: string;
  equipment: string;
  demo: string;
}

export const ASSISTED_LIVING_SOLUTIONS: AssistedLivingSolution[] = [
  {
    id: "remote-monitoring",
    offeringsId: "remote-patient-monitoring",
    title: "Remote Patient Monitoring",
    readiness: "Available Through Partners",
    whatItIs: "Health readings from supported devices (BP monitor, glucometer, pulse oximeter) shared with authorised family members.",
    whoNeedsIt: "Seniors with hypertension, diabetes or post-surgical recovery needs.",
    problem: "Families living away cannot see how a parent's health is trending between doctor visits.",
    howItWorks: "Readings are taken at home (by the senior or a visiting nurse) and synced to a partner monitoring dashboard where integrations exist.",
    familyReceives: "Access to readings and trends through the partner dashboard; nurse visit notes through LifeSakhi.",
    equipment: "Partner-supported Bluetooth devices, a smartphone or hub, and home internet.",
    demo: "Request a video demonstration of the partner dashboard and supported devices.",
  },
  {
    id: "wearable-sos",
    offeringsId: "wearable-technology",
    title: "Wearable SOS Solutions",
    readiness: "Available Through Partners",
    whatItIs: "A pendant or watch with an SOS button that notifies emergency contacts when pressed.",
    whoNeedsIt: "Seniors who live alone or spend long hours alone at home.",
    problem: "In an emergency, a senior may not be able to reach a phone.",
    howItWorks: "Pressing SOS triggers the partner device's escalation workflow to the registered emergency contacts.",
    familyReceives: "SOS notifications according to the partner device's alert settings.",
    equipment: "Partner wearable with an active SIM or phone pairing; charging routine.",
    demo: "Request a demonstration of the device, SOS flow and escalation setup.",
  },
  {
    id: "smart-home-sensors",
    offeringsId: "smart-home-sensors",
    title: "Smart Home Sensors",
    readiness: "Under Evaluation",
    whatItIs: "Non-camera motion and door sensors that observe daily activity patterns.",
    whoNeedsIt: "Families who want privacy-respecting safety monitoring for a parent living alone.",
    problem: "Unusual inactivity or night-time wandering often goes unnoticed.",
    howItWorks: "Sensors are being evaluated with pilot families; fall-related alerts only where the specific device supports them.",
    familyReceives: "Pilot participants receive unusual-activity notifications from the evaluated system.",
    equipment: "Wireless sensors, a hub and stable home Wi-Fi.",
    demo: "Register interest to join the evaluation pilot.",
  },
  {
    id: "family-care-coordination",
    offeringsId: "care-management-platforms",
    title: "Family Care Coordination",
    readiness: "Deployed",
    whatItIs: "The LifeSakhi family dashboard: bookings, assigned Saha, attendance and care timeline in one place.",
    whoNeedsIt: "Any family using LifeSakhi care or travel services.",
    problem: "Coordinating caregivers over phone calls is stressful and opaque.",
    howItWorks: "Bookings, Saha assignments, geo-verified check-ins and completion updates flow automatically into your dashboard.",
    familyReceives: "Booking status, assigned personnel, attendance records and service timelines.",
    equipment: "Any smartphone or computer — no devices required.",
    demo: "Log in to your dashboard or request a walkthrough.",
  },
  {
    id: "predictive-analytics",
    offeringsId: "ai-predictive-analytics",
    title: "Predictive Health Analytics",
    readiness: "Under Evaluation",
    whatItIs: "Trend analysis on monitoring data to highlight potential risk indicators.",
    whoNeedsIt: "Seniors on long-term remote monitoring with clinical oversight.",
    problem: "Gradual changes in health are easy to miss until they become emergencies.",
    howItWorks: "Being evaluated with partners. No predictions are generated or shown on LifeSakhi today.",
    familyReceives: "Nothing yet — we will share results only once clinically validated.",
    equipment: "Would require an active remote monitoring setup.",
    demo: "Register interest for future updates.",
  },
];

/* ─── Care builder categories (Phase 4) ────────────────────────────────────── */

export interface BuilderCategory {
  id: "home-care" | "mother-child" | "travel" | "technology";
  title: string;
  description: string;
  options: { id: string; label: string; serviceId: string }[];
}

export const CARE_BUILDER_CATEGORIES: BuilderCategory[] = [
  {
    id: "home-care",
    title: "Home Care",
    description: "Daily living, nursing and recovery support at home",
    options: [
      { id: "elderly-care", label: "Elderly care", serviceId: "home-care-elderly" },
      { id: "personal-assistance", label: "Personal assistance", serviceId: "home-care-elderly" },
      { id: "nursing", label: "Nursing", serviceId: "home-nursing" },
      { id: "post-op-recovery", label: "Post-operative recovery", serviceId: "home-nursing" },
      { id: "family-respite", label: "Family respite", serviceId: "home-care-elderly" },
    ],
  },
  {
    id: "mother-child",
    title: "Mother & Child",
    description: "Postnatal recovery and newborn care",
    options: [
      { id: "postnatal-care", label: "Postnatal care", serviceId: "new-mom-support" },
      { id: "newborn-care", label: "Newborn care", serviceId: "new-mom-support" },
      { id: "night-assistance", label: "Night assistance", serviceId: "new-mom-support" },
    ],
  },
  {
    id: "travel",
    title: "Travel",
    description: "Pickups, drops, stations, airports and journeys",
    options: [
      { id: "airport-pickup", label: "Airport pickup", serviceId: "airport-assistance" },
      { id: "airport-drop", label: "Airport drop", serviceId: "airport-assistance" },
      { id: "railway-pickup", label: "Railway station pickup", serviceId: "railway-assistance" },
      { id: "railway-assistance", label: "Railway station assistance", serviceId: "railway-assistance" },
      { id: "short-distance", label: "Short-distance accompaniment", serviceId: "short-distance-companion" },
      { id: "long-distance", label: "Long-distance accompaniment", serviceId: "long-distance-companion" },
      { id: "hospital-travel", label: "Hospital appointment travel", serviceId: "short-distance-companion" },
      { id: "pickup", label: "Pickup from any location", serviceId: "pickup" },
      { id: "drop", label: "Drop to any location", serviceId: "drop" },
    ],
  },
  {
    id: "technology",
    title: "Technology",
    description: "Monitoring, SOS and home safety",
    options: [
      { id: "remote-monitoring", label: "Remote monitoring", serviceId: "assisted-living-technology" },
      { id: "wearable-sos", label: "Wearable SOS", serviceId: "assisted-living-technology" },
      { id: "smart-home", label: "Smart home safety", serviceId: "assisted-living-technology" },
      { id: "assisted-living", label: "Assisted living technology", serviceId: "assisted-living-technology" },
    ],
  },
];

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

export function getSupportService(idOrSlug: string): SupportServiceDef | undefined {
  return SUPPORT_SERVICES.find(
    (s) => s.id === idOrSlug || s.routeSlug === idOrSlug || s.canonicalSlug === idOrSlug
  );
}

/** Support service whose canonical page lives at /services/<slug>. */
export function getSupportServiceByCanonical(slug: string): SupportServiceDef | undefined {
  return SUPPORT_SERVICES.find((s) => s.canonicalSlug === slug);
}

/** Returns the canonical slug when the slug is an alias, otherwise undefined. */
export function getAliasRedirect(slug: string): string | undefined {
  const s = SUPPORT_SERVICES.find((x) => x.routeSlug === slug && x.routeSlug !== x.canonicalSlug);
  return s && s.path.startsWith("/services/") ? s.canonicalSlug : undefined;
}

/** New service pages that have no entry in the legacy SERVICES catalogue. */
export function getNewSupportServicePage(slug: string): SupportServiceDef | undefined {
  return SUPPORT_SERVICES.find(
    (s) => !s.existedBefore && s.routeSlug === slug && s.path === `/services/${slug}`
  );
}

export function getServicesByDivision(division: SupportDivisionId): SupportServiceDef[] {
  return SUPPORT_SERVICES.filter((s) => s.division === division);
}

export function getDivision(id: string): SupportDivision | undefined {
  return SUPPORT_DIVISIONS.find((d) => d.id === id);
}

/** Resolve field options, applying city-specific option lists. */
export function resolveFieldOptions(field: BookingFieldDef, city: string): string[] {
  if (field.optionsByCity) return field.optionsByCity[city] ?? [];
  return field.options ?? [];
}
