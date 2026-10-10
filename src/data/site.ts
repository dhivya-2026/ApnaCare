// Central, config-driven content and data models for ApnaCare.
// Edit here — never hardcode content in individual components.

export const SITE = {
  name: "ApnaCare",
  legalName: "ApnaCare Health & Mobility Support Services Pvt. Ltd.",
  url: "https://apnacare.lovable.app",
  tagline: "Trusted Women Attendant Services You Can Rely On",
  coreMessage: "Trusted Women Attendants for Every Stage of Care",
  SUPPORT_PHONE: "+91 80000 00000",
  SUPPORT_PHONE_TEL: "+918000000000",
  WHATSAPP: "918000000000",
  EMAIL: "care@apnacare.in",
  EMERGENCY_LINE: "+91 80000 00000",
  GST_RATE: 0.18,
  yearsOfService: "8+",
  familiesHelped: "1,200+",
  activeAttendants: "500+",
  policeVerifiedPercent: "100%",
  retentionRate: "98.4%",
  operatingHours: "24 Hours / 7 Days a Week",
  headquarters: "4th Floor, SafeHub Towers, Indiranagar, Bengaluru, Karnataka 560038",
};

export type ServiceCategory = "home" | "healthcare" | "safety" | "travel" | "lifestyle";

export const CATEGORIES: { id: "all" | ServiceCategory; label: string; description: string }[] = [
  { id: "all", label: "All Services", description: "Complete directory of trusted women attendants for home, healthcare and mobility." },
  { id: "home", label: "Home & Personal Care", description: "Compassionate bedside and home daily living support for elders, new mothers and recovering family members." },
  { id: "healthcare", label: "Healthcare", description: "Qualified hospital attendants and nursing assistants for clinical, surgical and post-op care." },
  { id: "safety", label: "Safety & Security", description: "Vetted women security escorts, event attendants and residential safety support." },
  { id: "travel", label: "Travel & Mobility", description: "Chauffeuses, airport companions and railway transit attendants for safe journeys." },
  { id: "lifestyle", label: "Lifestyle Support", description: "Errand assistance, wellness accompaniment, social outings and routine companionship." },
];

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  shortDesc: string;
  description: string;
  rating: number;
  reviewCount: number;
  badge?: "Popular" | "Trending" | "High Demand" | "Specialized";
  startingPrice: number;
  pricingUnit: "day" | "trip" | "hour";
  benefits: string[];
  includes: string[];
  whoFor: string[];
  need: string;
  qualifications: string[];
  languages: string[];
  availability: string;
  featured: boolean;
  active: boolean;
  faqs: { q: string; a: string }[];
}

const COMMON_LANGS = ["English", "Hindi", "Tamil", "Kannada", "Telugu"];

const commonFaq = [
  {
    q: "How are ApnaCare attendants verified?",
    a: "Every attendant undergoes a rigorous 5-step background verification: biometric Aadhaar authentication, court and criminal record checks via authorized law enforcement partners, address verification, credential validation, and hands-on patient handling assessment.",
  },
  {
    q: "Are there any surprise fees or dispatcher commissions?",
    a: "Never. The price you see on your booking summary includes all base caregiver fees, supervisor coverage, and full 18% GST invoicing. There are zero dispatcher commissions or surge surcharges.",
  },
  {
    q: "What happens if our assigned attendant falls ill or has an emergency?",
    a: "We maintain a guaranteed backup dispatch protocol in each active operating cluster. If your primary attendant cannot attend due to an emergency, a verified backup with matched skills is dispatched within 90 minutes with zero transition penalty.",
  },
  {
    q: "Can I interview or review the attendant profile before confirmation?",
    a: "Yes. Once you submit your booking requirements, our care coordinator shares the verified digital profile with credentials, language fluencies, and experience records for your family's preview.",
  },
];

export const SERVICES: Service[] = [
  {
    id: "elderly-care",
    slug: "elderly-care",
    name: "Elderly Care",
    category: "home",
    shortDesc: "Compassionate 24/7 companionship, mobility assistance and routine medication support for senior citizens.",
    description: "Dedicated and trained women attendants providing compassionate companionship, mobility aid, medication schedules and emotional reassurance for elders at home. Designed to give aging parents dignifying, gentle care while offering working families total peace of mind.",
    rating: 4.9,
    reviewCount: 420,
    badge: "Popular",
    startingPrice: 1299,
    pricingUnit: "day",
    benefits: ["24/7 companionship & safety supervision", "Daily living and mobility assistance", "Timely medication reminders & vitals logging"],
    includes: [
      "Bathing, grooming and gentle personal hygiene assistance",
      "Mobility, walking support and fall-prevention monitoring",
      "Medicine administration reminders as per physician prescriptions",
      "Nutritious meal and hydration accompaniment",
      "Daily digital wellness logs and WhatsApp updates to family",
    ],
    whoFor: [
      "Seniors living alone or with busy family members",
      "Elders with dementia, Alzheimer's or Parkinson's requiring patience",
      "Seniors recovering from surgeries or joint replacement at home",
    ],
    need: "When aging parents need warm, dependable daily company and assistance, families need consistent care — not unpredictable temporary agency workers.",
    qualifications: ["Geriatric Care Certification", "Basic Life Support (BLS) & First Aid", "Full Police Verification Cleared"],
    languages: COMMON_LANGS,
    availability: "Day shifts (8-12 hrs), Night shifts, and 24-hour live-in options",
    featured: true,
    active: true,
    faqs: commonFaq,
  },
  {
    id: "hospital-attendants",
    slug: "hospital-attendants",
    name: "Hospital Assistance",
    category: "healthcare",
    shortDesc: "Attentive bedside companionship, staff coordination, and recovery assistance during hospital stays.",
    description: "Trained female attendants who remain by your family member's hospital bedside day and night. They ensure comfort, assist with bathroom visits, coordinate with nurses and doctors, and keep remote family members continuously informed.",
    rating: 4.9,
    reviewCount: 310,
    badge: "Popular",
    startingPrice: 1499,
    pricingUnit: "day",
    benefits: ["Dedicated bedside vigil", "Direct coordination with hospital nursing staff", "Frequent vitals and comfort updates to family"],
    includes: [
      "Continuous bedside observation and call-bell coordination",
      "Patient repositioning to prevent bedsores",
      "Assistance with sponge baths, linen changes, and oral hygiene",
      "Collecting prescribed medicines and test reports from hospital desk",
      "Post-operative discharge preparation and transport coordination",
    ],
    whoFor: [
      "Patients admitted for elective or emergency surgeries",
      "Long-term inpatient treatments (oncology, cardiology, orthopedics)",
      "Families balancing hospital visits with office or childcare demands",
    ],
    need: "Hospital stays are emotionally exhausting. A dedicated woman attendant by the bed ensures the patient is never unattended while the family rests.",
    qualifications: ["Hospital Bedside Protocol Training", "Infection Control Certification", "Police Background Verification"],
    languages: COMMON_LANGS,
    availability: "12-hour day/night shifts and 24-hour continuous care",
    featured: true,
    active: true,
    faqs: commonFaq,
  },
  {
    id: "nursing-services",
    slug: "nursing-services",
    name: "Nursing Services",
    category: "healthcare",
    shortDesc: "Qualified female nurses for clinical injections, wound dressings, catheter care and post-operative recovery.",
    description: "Registered and certified female nurses providing clinical-grade care at home. From surgical wound management, IV infusion monitoring, and catheter changes to palliative comfort, our nurses combine hospital competence with warm bedside manners.",
    rating: 4.9,
    reviewCount: 285,
    badge: "Popular",
    startingPrice: 1999,
    pricingUnit: "day",
    benefits: ["Certified GNM/B.Sc. nursing staff", "Sterile wound dressings & medication delivery", "Doctor prescription compliance"],
    includes: [
      "Blood pressure, SpO2, blood glucose, and temperature tracking",
      "Sterile surgical wound dressings and suture inspection",
      "Subcutaneous and intramuscular injections as prescribed",
      "Ryle's tube and urinary catheter maintenance",
      "Nebulization and oxygen concentrator management",
    ],
    whoFor: [
      "Patients newly discharged from major surgery",
      "Chronically ill patients needing daily clinical interventions",
      "Palliative and end-of-life compassionate medical support",
    ],
    need: "Clinical recovery at home requires professional expertise and strict hygiene without the cold stress of a hospital ward.",
    qualifications: ["Registered Nurse (GNM or B.Sc Nursing)", "Active State Nursing Council Registration", "Police Verification Cleared"],
    languages: COMMON_LANGS,
    availability: "Short clinical visits (2 hrs), 12-hour shifts, and 24-hour nursing",
    featured: true,
    active: true,
    faqs: commonFaq,
  },
  {
    id: "post-natal-care",
    slug: "post-natal-care",
    name: "Post-Natal Care",
    category: "home",
    shortDesc: "Specialized maternal recuperation, newborn massage, feeding support and night soothing for new mothers.",
    description: "Experienced post-natal attendants (Japani/Maldar trained) dedicated to newborn care and maternal recuperation. They handle traditional baby bathing, feeding assistance, soothing, and allow new mothers the deep, undisturbed sleep needed to heal.",
    rating: 5.0,
    reviewCount: 190,
    badge: "Popular",
    startingPrice: 1999,
    pricingUnit: "day",
    benefits: ["Expert newborn massage & bath", "Breastfeeding latch & feeding support", "Restorative night rest for mother"],
    includes: [
      "Gentle oil massage and warm bath for the newborn",
      "Umbilical cord care and diaper hygiene monitoring",
      "Mother's post-delivery nutrition and lactation support",
      "Night wakefulness soothing so mother sleeps uninterrupted",
      "Sterilization of feeding bottles and baby clothing care",
    ],
    whoFor: [
      "First-time mothers needing gentle, experienced guidance",
      "Mothers recovering from C-section deliveries needing physical rest",
      "Nuclear families where grandparents or extended family live far away",
    ],
    need: "The fourth trimester is physically and emotionally demanding. A loving, experienced woman attendant ensures mother and baby thrive.",
    qualifications: ["Certified Post-Natal & Infant Care", "Pediatric First Aid Certified", "Police Background Cleared"],
    languages: COMMON_LANGS,
    availability: "12-hour day shifts, Night rest shifts, or 24-hour residential care",
    featured: true,
    active: true,
    faqs: commonFaq,
  },
  {
    id: "travel-assistance",
    slug: "travel-assistance",
    name: "Travel Assistance",
    category: "travel",
    shortDesc: "Vetted women companions for intercity travel, family road trips, bus transits and destination stays.",
    description: "Reliable, background-checked women travel companions to accompany solo women, elderly parents, or young children on long-distance flights, trains, and outstation trips. From handling luggage to navigation and check-ins, they ensure safe and pleasant travel.",
    rating: 4.8,
    reviewCount: 145,
    badge: "Trending",
    startingPrice: 1599,
    pricingUnit: "day",
    benefits: ["End-to-end journey companionship", "Luggage & ticketing assistance", "Live GPS sharing with family"],
    includes: [
      "Home-to-destination continuous accompaniment",
      "Assistance with boarding passes, security clearance and seating",
      "Medication and meal management while traveling",
      "Real-time GPS trip tracking link shared with emergency contacts",
      "Immediate problem resolution if trains or flights are delayed",
    ],
    whoFor: [
      "Elderly parents visiting children in other cities or states",
      "Women traveling alone for work, medical consults, or exams",
      "Families needing an extra pair of hands with infants during transit",
    ],
    need: "Traveling through busy transit hubs can be intimidating. Having a calm, verified companion guarantees confidence and safety throughout.",
    qualifications: ["Safe Travel Companion Training", "First Aid Certified", "Police Verification Cleared"],
    languages: COMMON_LANGS,
    availability: "Single-day transit, multi-day outstation, and return tours",
    featured: false,
    active: true,
    faqs: commonFaq,
  },
  {
    id: "airport-pickup",
    slug: "airport-pickup",
    name: "Airport Assistance",
    category: "travel",
    shortDesc: "Gate-to-curb and terminal meet-and-greet airport companions for hassle-free flights and transfers.",
    description: "Dedicated female companions meeting passengers right at the airport arrival gate or assisting them from home through departure security. Ideal for seniors arriving late at night or international travelers navigating large terminals.",
    rating: 4.9,
    reviewCount: 210,
    badge: "Popular",
    startingPrice: 999,
    pricingUnit: "trip",
    benefits: ["Arrival gate meet-and-greet with name placard", "Wheelchair & baggage claim coordination", "Safe vehicle escort to doorstep"],
    includes: [
      "Flight status tracking and flight delay monitoring",
      "Personal meet-and-greet at terminal arrival gate",
      "Luggage trolley assistance and baggage retrieval",
      "Wheelchair assistance coordination with airport ground staff",
      "Accompanied ride home via verified transport with live tracking",
    ],
    whoFor: [
      "Elderly parents flying in from other cities",
      "Solo female travelers arriving on late-night flights",
      "First-time air travelers overwhelmed by large international terminals",
    ],
    need: "Airports are cavernous and confusing. A trusted woman waiting at the arrival gate transforms anxiety into relief.",
    qualifications: ["Airport Ground Escort Trained", "Police Verification Cleared", "Valid ID Badges"],
    languages: COMMON_LANGS,
    availability: "Available 24 hours a day with scheduled advance booking",
    featured: true,
    active: true,
    faqs: commonFaq,
  },
  {
    id: "railway-assistance",
    slug: "railway-assistance",
    name: "Railway Assistance",
    category: "travel",
    shortDesc: "Platform-side meet, luggage porter coordination, and safe coach boarding for train travelers.",
    description: "Experienced female station companions who meet passengers at railway station entrances, assist through security checks, coordinate licensed porters, and escort passengers safely right to their coach berth.",
    rating: 4.8,
    reviewCount: 160,
    badge: "Specialized",
    startingPrice: 899,
    pricingUnit: "trip",
    benefits: ["Platform & coach berth escort", "Luggage & porter management", "Boarding confirmation to family"],
    includes: [
      "Meet-and-greet at designated station concourse",
      "Platform change monitoring and train arrival tracking",
      "Luggage handling and coordination with licensed Coolies",
      "Settling passenger safely into coach and berth",
      "Photo and live status confirmation dispatched to family phone",
    ],
    whoFor: [
      "Senior citizens boarding or alighting crowded railway stations",
      "Women traveling with heavy luggage or young children",
      "Travelers changing trains at busy transit junctions",
    ],
    need: "Indian railway stations can be crowded and challenging for seniors. A verified companion makes boarding calm and seamless.",
    qualifications: ["Railway Transit Protocol Certified", "Police Verification Cleared"],
    languages: COMMON_LANGS,
    availability: "Available 24/7 across major junction stations",
    featured: false,
    active: true,
    faqs: commonFaq,
  },
  {
    id: "women-drivers",
    slug: "women-drivers",
    name: "Women Drivers",
    category: "travel",
    shortDesc: "Licensed, background-checked professional women chauffeurs for daily commutes, errands and city travel.",
    description: "Experienced, verified professional women drivers for personal vehicles or provided cars. Available for daily office commutes, senior clinic visits, children school runs, and outstation family trips.",
    rating: 4.8,
    reviewCount: 230,
    badge: "Trending",
    startingPrice: 1199,
    pricingUnit: "day",
    benefits: ["Licensed & defensive driving certified", "Police verified with clean traffic records", "Hourly, daily & monthly packages"],
    includes: [
      "Punctual arrival at your residence",
      "Safe driving adhering to speed limits and defensive road standards",
      "Assistance with groceries and walking elders into clinics",
      "Vehicle safety inspection (tyres, fuel, mirrors) before departure",
      "Emergency roadside breakdown protocol trained",
    ],
    whoFor: [
      "Women commuting late evenings wanting dependable security",
      "Senior citizens needing safe transit to hospital check-ups",
      "Families seeking a permanent, trusted female chauffeur",
    ],
    need: "Commuting across bustling metros feels far safer with a trusted, polite professional woman behind the wheel.",
    qualifications: ["Commercial/Private Driving Licence", "Defensive Driving Certification", "Police Background Verification Cleared"],
    languages: COMMON_LANGS,
    availability: "4-hour blocks, 8-hour daily shifts, or monthly retainers",
    featured: true,
    active: true,
    faqs: commonFaq,
  },
  {
    id: "security-support",
    slug: "security-support",
    name: "Security Support",
    category: "safety",
    shortDesc: "Trained women security escorts and protective companions for events, transit and residential peace of mind.",
    description: "Disciplined, physically trained female security personnel providing close protection, event security, cash/jewelry transit escorts, and residential gate surveillance with heightened situational awareness.",
    rating: 4.9,
    reviewCount: 115,
    badge: "High Demand",
    startingPrice: 1899,
    pricingUnit: "day",
    benefits: ["Trained in situational awareness & self-defense", "Discreet and professional conduct", "24/7 control room GPS link"],
    includes: [
      "Close personal escort during public appearances or legal hearings",
      "Security supervision at weddings, conferences, and private functions",
      "Escort for high-value transits (jewelry, cash, sensitive documents)",
      "Instant SOS beacon directly linked to ApnaCare Command Center",
      "Detailed route and venue security reconnaissance",
    ],
    whoFor: [
      "Women executives or public figures attending busy public gatherings",
      "Families hosting high-profile weddings or celebrations",
      "Individuals navigating sensitive legal or family court proceedings",
    ],
    need: "Discreet and vigilant security brings unwavering confidence in high-density or sensitive environments.",
    qualifications: ["Security Guard Certification (PSARA compliant)", "Self-Defense & Martial Arts Trained", "Full Police Verification Cleared"],
    languages: COMMON_LANGS,
    availability: "Hourly event shifts, 12-hour protection, and multi-day details",
    featured: false,
    active: true,
    faqs: commonFaq,
  },
  {
    id: "home-personal-care",
    slug: "home-personal-care",
    name: "Home & Personal Care",
    category: "home",
    shortDesc: "Warm daily living assistance, personal hygiene, and light domestic wellness support for home recuperation.",
    description: "Empathetic caregivers assisting with day-to-day household living, personal grooming, dietary scheduling, and mobility for individuals regaining strength after illnesses or living with mobility limitations.",
    rating: 4.8,
    reviewCount: 340,
    badge: "Popular",
    startingPrice: 1099,
    pricingUnit: "day",
    benefits: ["Gentle personal care with dignity", "Healthy meal & hydration routines", "Continuous family reassurance"],
    includes: [
      "Assistance with bathing, dressing, dental care, and hair grooming",
      "Light nutritious meal preparation and eating assistance",
      "Gentle stretching, doctor-prescribed mobility exercises",
      "Maintaining a clean, hygienic and slip-free patient recovery area",
      "Friendly conversation, reading aloud, and memory games",
    ],
    whoFor: [
      "Individuals recovering from orthopedic injuries or strokes",
      "Persons with chronic fatigue or temporary physical limitations",
      "Families seeking dependable daylight caregiving support",
    ],
    need: "Recovering at home is faster when everyday personal tasks are handled with dignity, patience, and kindness.",
    qualifications: ["Personal Care Attendant Diploma", "Hygiene & Infection Prevention Trained", "Police Verification Cleared"],
    languages: COMMON_LANGS,
    availability: "Flexible day shifts (6, 8, 10 or 12 hours)",
    featured: false,
    active: true,
    faqs: commonFaq,
  },
  {
    id: "lifestyle-support",
    slug: "lifestyle-support",
    name: "Lifestyle Support",
    category: "lifestyle",
    shortDesc: "Social outing accompaniment, errand running, technology tutoring and wellness company for active seniors.",
    description: "Energetic and patient female companions to accompany active seniors on walks in the park, visits to friends, temple visits, bank chores, grocery shopping, and learning smartphones and video calling.",
    rating: 4.9,
    reviewCount: 175,
    badge: "Specialized",
    startingPrice: 899,
    pricingUnit: "day",
    benefits: ["Active social engagement & companionship", "Assistance with banking, errands & shopping", "Smartphone & video-call tutoring"],
    includes: [
      "Accompanying seniors to parks, clubs, temples, and social gatherings",
      "Helping with utility bills, bank visits, and pharmacy shopping",
      "Teaching digital tools like WhatsApp video calls and digital payments",
      "Reading newspapers, books, and sharing engaging conversations",
      "Arranging rides, scheduling appointments, and managing calendars",
    ],
    whoFor: [
      "Active seniors experiencing loneliness or social isolation",
      "Parents of NRI children who want trusted local support for errands",
      "Elders wanting to stay independent and socially connected",
    ],
    need: "Healthy aging is about connection and purposeful activity. A warm lifestyle companion makes every day vibrant.",
    qualifications: ["Elder Companion Training", "Digital Literacy Certified", "Police Verification Cleared"],
    languages: COMMON_LANGS,
    availability: "Half-day outings (4 hrs) or full-day lifestyle support",
    featured: false,
    active: true,
    faqs: commonFaq,
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

export const PRICING_PLANS = [
  {
    id: "transit",
    name: "Transit Companion",
    description: "Safe assisted travel for airport, railway and city transits.",
    price: 799,
    unit: "trip",
    popular: false,
    serviceSlug: "airport-pickup",
    includes: [
      "Verified female attendant meeting at gate/platform",
      "Real-time GPS travel tracking link shared with family",
      "Help with luggage transfers and airport check-ins",
      "Full background and police verification",
      "18% GST invoicing included — no hidden fees",
    ],
  },
  {
    id: "daily",
    name: "Daily Attendant & Care",
    description: "Empathetic home care, hospital bedside assistance and nursing support.",
    price: 1199,
    unit: "day",
    popular: true,
    serviceSlug: "elderly-care",
    includes: [
      "Qualified bedside caregiver or nursing assistant",
      "Medicine schedules and continuous family updates",
      "Choice of English, Hindi, Tamil, Kannada, or Telugu",
      "Geriatric care or rehabilitation certified",
      "Guaranteed backup attendant in case of illness",
    ],
  },
  {
    id: "security",
    name: "Custom Security & Driver",
    description: "Dedicated security guards, private drivers and customized shifts.",
    price: 1999,
    unit: "day",
    popular: false,
    serviceSlug: "women-drivers",
    includes: [
      "Fully trained defensive security or expert driver",
      "Flexible hourly shifts and standby options",
      "Corporate-grade vetting and PSARA standards",
      "Direct 24/7 coordinator hotline and SOS dispatch",
      "Multi-person or group care configurations",
    ],
  },
];

export const PRICING_PROMISES = [
  "No surprise service charges",
  "No dispatcher commissions",
  "No emergency response premiums",
  "18% GST invoicing included",
  "Full refund protection before dispatch",
  "Guaranteed backup replacement",
  "8+ Years of Trusted Service",
];

export interface Attendant {
  id: string;
  name: string;
  role: string;
  rating: number;
  experience: string;
  certifications: string[];
  languages: string[];
  verification: string;
  services: string[];
  city: string;
  availability: string;
  bio: string;
  badge: string;
}

export const ATTENDANTS: Attendant[] = [
  {
    id: "a1",
    name: "Sunitha Krishnan",
    role: "Senior Elderly Care Specialist",
    rating: 4.9,
    experience: "6+ Years",
    certifications: ["First Aid Certified", "Geriatric Care Diploma", "Dementia Care Basics"],
    languages: ["Tamil", "English", "Malayalam"],
    verification: "Police Verification Cleared (Chennai City Police)",
    services: ["elderly-care", "hospital-attendants", "home-personal-care"],
    city: "Chennai",
    availability: "Available this week",
    bio: "Sunitha has supported over 80 seniors with patience, medication compliance, and warm companionship. Families consistently commend her calm bedside manner.",
    badge: "Senior Specialist",
  },
  {
    id: "a2",
    name: "Meera Nair",
    role: "Professional Driver & Companion",
    rating: 4.8,
    experience: "4 Years",
    certifications: ["Defensive Driving Certification", "Safe Attendant Certified", "First Aid"],
    languages: ["Kannada", "Tamil", "English"],
    verification: "Police Verification Cleared (Bengaluru City Police)",
    services: ["women-drivers", "airport-pickup", "travel-assistance"],
    city: "Bengaluru",
    availability: "Available this week",
    bio: "Meera brings 4 years of accident-free commercial driving. She is known for her punctuality, road safety awareness, and friendly assistance with airport baggage.",
    badge: "Top Rated Driver",
  },
  {
    id: "a3",
    name: "Preeti Patil",
    role: "Home Nursing Assistant",
    rating: 5.0,
    experience: "5 Years",
    certifications: ["General Nursing Certified (GNM)", "BLS Certified", "Infection Control"],
    languages: ["Telugu", "Hindi", "English"],
    verification: "Police Verification Cleared (Hyderabad Police)",
    services: ["nursing-services", "post-natal-care", "hospital-attendants"],
    city: "Hyderabad",
    availability: "Available this week",
    bio: "Preeti is a certified nursing assistant with 5 years of inpatient and home health experience. She specializes in sterile wound dressings and maternal post-natal care.",
    badge: "Clinical Lead",
  },
  {
    id: "a4",
    name: "Ananya Deshmukh",
    role: "Maternal & Newborn Care Specialist",
    rating: 5.0,
    experience: "7+ Years",
    certifications: ["Certified Infant Care Specialist", "Pediatric First Aid", "Post-Natal Therapy"],
    languages: ["Kannada", "Hindi", "English"],
    verification: "Police Verification Cleared (Bengaluru Police)",
    services: ["post-natal-care", "home-personal-care"],
    city: "Bengaluru",
    availability: "Available next week",
    bio: "Ananya has cared for more than 110 newborns and new mothers. She excels at gentle infant oil massage, latch support, and providing restorative rest to mothers.",
    badge: "Newborn Expert",
  },
  {
    id: "a5",
    name: "Revathi Sundaram",
    role: "Transit & Railway Escort Specialist",
    rating: 4.9,
    experience: "3+ Years",
    certifications: ["Transit Safety Certified", "Elder Assistance Protocol", "First Aid"],
    languages: ["Tamil", "English"],
    verification: "Police Verification Cleared (Coimbatore Police)",
    services: ["railway-assistance", "airport-pickup", "lifestyle-support"],
    city: "Coimbatore",
    availability: "Available this week",
    bio: "Revathi ensures smooth train and flight journeys for seniors traveling between Tamil Nadu and other metros. Extremely reliable with ticket and luggage coordination.",
    badge: "Transit Lead",
  },
  {
    id: "a6",
    name: "Kavitha Reddy",
    role: "Personal Security & Protective Escort",
    rating: 4.9,
    experience: "5 Years",
    certifications: ["PSARA Security Guard Certified", "Martial Arts & Self-Defense", "Command Center Protocol"],
    languages: ["Telugu", "Hindi", "English"],
    verification: "Police Verification Cleared (Cyberabad Police)",
    services: ["security-support", "women-drivers"],
    city: "Hyderabad",
    availability: "Available this week",
    bio: "Kavitha provides discreet and vigilant executive security, event accompaniment, and late-night travel escort with unmatched situational alertness.",
    badge: "Security Officer",
  },
];

export const PROMOS = [
  {
    code: "CARECOMBO15",
    name: "Care & Comfort Bundle",
    discount: 0.15,
    label: "15% OFF",
    includes: "Nursing Care + Elderly Hospital Attendant",
  },
  {
    code: "TRAVELSAFE10",
    name: "Safe Traveler Combo",
    discount: 0.1,
    label: "10% OFF",
    includes: "Airport Pickup + Dedicated Driver",
  },
];

export const PROMO_ENDS_AT: string | null = "2026-12-31T23:59:59+05:30";

export interface CityInfo {
  slug: string;
  name: string;
  state: string;
  attendants: string;
  families: string;
  dispatch: string;
  address: string;
  phone: string;
  coverageAreas: string[];
  popularServices: string[];
  description: string;
}

export const CITIES: CityInfo[] = [
  {
    slug: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    attendants: "220+",
    families: "450+",
    dispatch: "<15 min",
    address: "SafeHub Towers, 100 Feet Road, Indiranagar, Bengaluru 560038",
    phone: "+91 80000 00000",
    coverageAreas: ["Indiranagar", "Koramangala", "HSR Layout", "Whitefield", "Jayanagar", "Malleshwaram", "Hebbal", "Electronic City", "JP Nagar", "Bannerghatta"],
    popularServices: ["Elderly Care", "Hospital Assistance", "Women Drivers", "Post-Natal Care"],
    description: "Our flagship command center in Bengaluru covers all central, eastern and southern tech corridors with instant emergency dispatch and verified attendants.",
  },
  {
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    attendants: "150+",
    families: "300+",
    dispatch: "<18 min",
    address: "CareTower, Anna Salai, T. Nagar, Chennai 600017",
    phone: "+91 80000 00000",
    coverageAreas: ["T. Nagar", "Adyar", "Mylapore", "Anna Nagar", "Velachery", "Besant Nagar", "Kilpauk", "OMR IT Corridor", "Nungambakkam", "Tambaram"],
    popularServices: ["Elderly Care", "Nursing Services", "Hospital Assistance", "Airport Assistance"],
    description: "Comprehensive medical and home attendant coverage across Chennai's historic residential areas and medical centers along Greams Road and Anna Salai.",
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    attendants: "100+",
    families: "200+",
    dispatch: "<20 min",
    address: "CyberCare Complex, Hitec City, Madhapur, Hyderabad 500081",
    phone: "+91 80000 00000",
    coverageAreas: ["Banjara Hills", "Jubilee Hills", "Gachibowli", "Hitec City", "Kondapur", "Kukatpally", "Secunderabad", "Madhapur", "Begumpet"],
    popularServices: ["Nursing Services", "Post-Natal Care", "Women Drivers", "Security Support"],
    description: "Serving twin cities families with clinical-grade home nursing, post-natal recovery specialists, and executive women chauffeurs.",
  },
  {
    slug: "coimbatore",
    name: "Coimbatore",
    state: "Tamil Nadu",
    attendants: "60+",
    families: "100+",
    dispatch: "<15 min",
    address: "Greenway Hub, Avinashi Road, Peelamedu, Coimbatore 641004",
    phone: "+91 80000 00000",
    coverageAreas: ["RS Puram", "Peelamedu", "Race Course", "Gandhipuram", "Saibaba Colony", "Saravanampatti", "Singanallur", "Vadavalli"],
    popularServices: ["Elderly Care", "Railway Assistance", "Home & Personal Care", "Lifestyle Support"],
    description: "Dedicated elder care and railway transit companions for Coimbatore and surrounding Kongu region communities.",
  },
];

export const getCity = (slug: string) => CITIES.find((c) => c.slug === slug);

export type ArticleCategory = "Government Schemes" | "Women Safety" | "Senior Citizen Care" | "Health Awareness" | "Travel Safety" | "Home Safety";

export const ARTICLE_CATEGORIES: ("All" | ArticleCategory)[] = [
  "All",
  "Government Schemes",
  "Women Safety",
  "Senior Citizen Care",
  "Health Awareness",
  "Travel Safety",
  "Home Safety",
];

export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  readTime: string;
  excerpt: string;
  author: string;
  date: string;
  body: string[];
  keyTakeaways: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: "women-travel-safety-rights",
    title: "Understanding Safety Rights & Travel Mandates for Women in India",
    category: "Women Safety",
    readTime: "4 min read",
    author: "ApnaCare Safety Cell",
    date: "October 2026",
    excerpt: "A practical, verified overview of travel safety provisions, 112 emergency integration, and reserved facilities every woman traveler should know.",
    body: [
      "Knowing your rights makes every journey calmer and safer. This guide summarises verified safety measures, government mandates, and helplines available to women travellers across Indian transport networks.",
      "Key provisions include 24/7 designated women assistance booths at all major railway terminals, CCTV-equipped pink coach compartments, and priority emergency dispatch via the National Emergency Response Support System (ERSS - Dial 112).",
      "When using road transits or app-based rides, always ensure the GPS location link is active, inspect driver ID badges, and utilize vehicle child-lock safety checks before beginning the ride.",
      "Important helpline numbers: National Emergency: 112; Women Helpline (All India): 1091; Railway RPF Security Helpline: 139. Save these speed-dial contacts on your phone.",
    ],
    keyTakeaways: [
      "Dial 112 for instant multi-agency emergency response across India.",
      "Railway helpline 139 provides immediate RPF assistance inside train coaches.",
      "Always share real-time trip GPS tracking with at least one trusted family contact.",
    ],
  },
  {
    slug: "senior-citizen-schemes-pension",
    title: "Senior Citizen Support Schemes & Pension Benefits in India (2026 Guide)",
    category: "Government Schemes",
    readTime: "6 min read",
    author: "ApnaCare Social Support Desk",
    date: "September 2026",
    excerpt: "An actionable introduction to Ayushman Bharat senior coverage, Indira Gandhi pension benefits, and state welfare provisions for elders.",
    body: [
      "Several central and state welfare programmes offer substantial medical and financial assistance to senior citizens aged 60 and above. Recent policy updates have expanded Ayushman Bharat PM-JAY health insurance to cover all citizens aged 70 and above, regardless of income brackets.",
      "Under the National Social Assistance Programme (NSAP), the Indira Gandhi National Old Age Pension Scheme (IGNOAPS) provides monthly pensions for elders living below poverty thresholds, with state supplements boosting totals.",
      "Senior Citizen Savings Scheme (SCSS) and Pradhan Mantri Vaya Vandana Yojana (PMVVY) offer sovereign-backed fixed interest returns and quarterly payouts designed to beat inflation.",
      "To access these benefits, ensure your Aadhaar card has current demographic and biometric details updated, and keep copies of your age certificate, bank passbook, and local residency proof handy.",
    ],
    keyTakeaways: [
      "Citizens aged 70+ now qualify for ₹5 Lakh annual family health coverage under PM-JAY.",
      "Keep Aadhaar biometrics and phone linkage updated to prevent pension disbursal lapses.",
      "Contact your local district Social Welfare Department or CSC center for portal assistance.",
    ],
  },
  {
    slug: "health-monitoring-elder-care",
    title: "Crucial Daily Health Monitoring Metrics for Elder Care at Home",
    category: "Health Awareness",
    readTime: "5 min read",
    author: "Clinical Advisory Board",
    date: "September 2026",
    excerpt: "Simple daily vital observations and hydration tracking families and attendants can record to prevent emergency hospitalizations.",
    body: [
      "Early detection of subtle vital changes is the most powerful tool in geriatric home care. When caregivers track basic metrics daily, doctors can adjust dosages before a minor irregularity triggers an emergency ICU admission.",
      "The core vital checklist: Blood Pressure (measured seated after 5 minutes of rest), Heart Rate / Pulse, Blood Oxygen Saturation (SpO2), Morning Fasting Glucose (for diabetics), and Daily Fluid Intake vs. Output.",
      "Beyond numbers, watch for behavioral red flags: sudden confusion or disorientation (often an early sign of a urinary tract infection in seniors), loss of appetite, reluctance to walk, or unsteady gait.",
      "ApnaCare attendants log these readings twice daily in digital wellness reports accessible directly by family members and attending physicians.",
    ],
    keyTakeaways: [
      "Sudden confusion or disorientation in seniors frequently signals a treatable UTI or dehydration.",
      "Log blood pressure at the same time each morning for medically reliable comparisons.",
      "Maintain a hydration target of at least 1.5 to 2.0 litres of water and broths daily unless restricted.",
    ],
  },
  {
    slug: "fall-proof-home",
    title: "Tips for Creating an Elderly-Safe and Fall-Proof Household",
    category: "Home Safety",
    readTime: "4 min read",
    author: "Ergonomics & Safety Team",
    date: "August 2026",
    excerpt: "Low-cost, highly effective structural modifications to prevent domestic falls and preserve elderly independence.",
    body: [
      "Falls are the leading cause of accidental injury and loss of mobility among adults aged 65 and older. More than 70% of senior falls occur inside the home — predominantly in bathrooms, stairwells, and dimly lit hallways.",
      "Bathroom modifications are urgent: install stainless steel grab bars anchored into wall studs next to the western toilet and shower area. Replace slick tiled floors with anti-skid mats or non-slip adhesive strips. A shower bench eliminates dangerous balancing while bathing.",
      "Living room and bedroom safety: eliminate loose throw rugs or tape them down with heavy-duty double-sided carpet tape. Keep floor walkways free of trailing phone chargers and extension cords.",
      "Lighting is safety: install automatic motion-sensor night lights between the bedroom and bathroom. When seniors wake in the dark, immediate illumination prevents catastrophic stumbles.",
    ],
    keyTakeaways: [
      "Install sturdy grab bars beside the commode and inside the shower stall.",
      "Remove loose floor mats or anchor them firmly with anti-slip backing.",
      "Use automatic night lights to illuminate night-time pathways to the bathroom.",
    ],
  },
  {
    slug: "safe-travel-for-seniors",
    title: "Guide to Hassle-Free Air and Train Travel for Senior Citizens",
    category: "Travel Safety",
    readTime: "5 min read",
    author: "Transit Mobility Team",
    date: "August 2026",
    excerpt: "Practical checklist for booking wheelchair assistance, meal requests, and transit companion escorts.",
    body: [
      "Long-distance travel does not have to be stressful for elderly family members. With strategic advance planning, airlines and railways provide comprehensive accessibility services.",
      "When booking airline tickets, always select the 'WCHR' (Wheelchair for distance to ramp) or 'WCHS' (Wheelchair for stairs) code during reservation. Arrive at least 2.5 hours prior to domestic flights to ensure dedicated ground escort staff are assigned.",
      "For railway journeys, opt for lower berths and look for battery-operated buggy services available on Platform 1 of major junction stations. Book licensed Coolie services via official IRCTC portals where available.",
      "ApnaCare's Airport and Railway companions meet elderly parents right at their vehicle curb, manage all baggage, navigate security check counters, and remain by their side until departure.",
    ],
    keyTakeaways: [
      "Request airline wheelchair codes (WCHR) at the time of ticket booking, not at the check-in desk.",
      "Keep digital and laminated paper copies of photo ID and prescription medicines in hand luggage.",
      "Arrange an ApnaCare gate attendant for arrival meet-and-greet in unfamiliar terminals.",
    ],
  },
];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);

export interface Review {
  id: string;
  name: string;
  relation: string;
  location: string;
  rating: number;
  service: string;
  verified: boolean;
  testimonial: string;
  date: string;
}

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Dr. K. S. Ramanathan",
    relation: "Son of 82-year-old elder",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    service: "Elderly Care",
    verified: true,
    testimonial: "Sunitha has been caring for my 82-year-old father for the past 6 months. Her patience, prompt medicine reminders, and genuine warmth made a massive difference. As a practicing surgeon, having a verified, reliable woman attendant gave me peace of mind I haven't had in years.",
    date: "2 weeks ago",
  },
  {
    id: "r2",
    name: "Shruti & Arvind Varma",
    relation: "Parents of newborn",
    location: "Bengaluru, Karnataka",
    rating: 5,
    service: "Post-Natal Care",
    verified: true,
    testimonial: "As first-time parents with no family in Bengaluru, we were completely overwhelmed after our baby's C-section birth. Ananya was a godsend. She handled the baby massage, helped my wife rest, and taught us safe swaddling. 100% transparent pricing and total reliability.",
    date: "1 month ago",
  },
  {
    id: "r3",
    name: "Meenakshi Sundaram",
    relation: "Daughter caring for mother",
    location: "Hyderabad, Telangana",
    rating: 5,
    service: "Hospital Assistance",
    verified: true,
    testimonial: "When my mother had knee replacement surgery at Apollo, I couldn't stay 24 hours at the hospital because of my office. Preeti stayed by her bedside, coordinated with the nurses, and kept me updated every few hours. Transparent invoicing and wonderful professionalism.",
    date: "3 weeks ago",
  },
  {
    id: "r4",
    name: "Rajeshwari Natarajan",
    relation: "Senior solo traveler",
    location: "Coimbatore, Tamil Nadu",
    rating: 5,
    service: "Airport Assistance",
    verified: true,
    testimonial: "I had to travel alone from Coimbatore to Delhi for an eye treatment. ApnaCare arranged an airport companion who helped me with my heavy luggage, check-in, and wheelchair transfer. Extremely polite, dignified, and safety-focused service.",
    date: "2 months ago",
  },
];

export const PARTNER_CATEGORIES = [
  { name: "Nursing Colleges", desc: "Top state-accredited nursing institutions for clinical candidate recruitment and field training.", count: "45+" },
  { name: "Women's Colleges", desc: "Higher education institutions empowering young women with dignified employment paths.", count: "32+" },
  { name: "NGOs", desc: "Women-focused non-profits and grassroots community welfare societies.", count: "89+" },
  { name: "Women SHGs", desc: "National Rural Livelihoods Mission & urban Self Help Groups for direct livelihood generation.", count: "156+" },
  { name: "Driving Institutes", desc: "Certified motor driving schools conducting defensive driving and chauffeuse training.", count: "38+" },
  { name: "Hospitals & Healthcare", desc: "NABH-accredited hospitals, diagnostic clinics and home health provider networks.", count: "67+" },
  { name: "Corporate Partners", desc: "Enterprise leaders partnering on women safety programs, CSR, and eldercare employee benefits.", count: "24+" },
  { name: "Government Skill Centres", desc: "PMKVY and state skill development corporation affiliated vocational centers.", count: "52+" },
  { name: "Police Verification", desc: "Authorized third-party background and police record verification agencies.", count: "18+" },
  { name: "Legal Support", desc: "Women legal aid cells and labor advocacy counselors protecting attendant rights.", count: "12+" },
];

export const PARTNER_BENEFITS = [
  "Fair & Dignified Women Employment",
  "Institutional Police & Background Verification",
  "Digital Partner Portal & Real-Time Tracking",
  "South India Multicity Network & Cluster Scaling",
  "Documented Grassroots Social & Financial Impact",
  "Accredited Medical & Soft Skill Training Programs",
  "Corporate CSR Alignment & Transparent Audits",
  "Protective Safety Ecosystem with 24/7 SOS Support",
];

export const PARTNER_JOURNEY = [
  ["01 Identify Need", "Organization discovers partnership alignment with ApnaCare's mission."],
  ["02 Submit Request", "Complete the comprehensive digital partnership enquiry form with institutional details."],
  ["03 Admin Review", "Our Ecosystem Partnerships Directorate evaluates organizational credentials within 48 hours."],
  ["04 Document Verification", "Submission of registration certificates, 12A/80G status, or educational accreditation."],
  ["05 Strategic Discussion", "Virtual or in-person workshop to define candidate intake, safety protocols, and operational workflows."],
  ["06 MoU Execution", "Finalization and digital signing of mutually agreed partnership Memorandum of Understanding."],
  ["07 Onboarding & Training", "Candidates undergo ApnaCare safety curriculum, soft-skill training, and biometric verification."],
  ["08 Active Impact", "Active deployment of verified female attendants with real-time impact dashboard reporting."],
];

export const PARTNER_TYPES = [
  "NGOs & Non-Profits",
  "Women SHG Federations",
  "Nursing & Healthcare Colleges",
  "Accredited Hospitals & Clinics",
  "Skill Development Centers",
  "Driving Training Institutes",
  "Corporate CSR Foundations",
  "Government Agencies",
];

export const IMPACT = [
  ["500+", "Partner Organizations"],
  ["25+", "States & Union Territories"],
  ["10,000+", "Women Employed"],
  ["5,000,000+", "Hours of Safe Care Provided"],
];

export const STATE_PARTNERS = [
  { state: "Tamil Nadu", count: 156 },
  { state: "Karnataka", count: 124 },
  { state: "Telangana", count: 112 },
  { state: "Kerala", count: 98 },
  { state: "Andhra Pradesh", count: 87 },
  { state: "Maharashtra", count: 76 },
];

export const SUCCESS_STORIES = [
  {
    org: "Kudumbashree Community Development Society",
    role: "Women SHG Livelihood Partner",
    note: "Trained and placed over 240 rural women as certified geriatric attendants with monthly financial stability and health insurance coverage.",
  },
  {
    org: "St. Martha's College of Nursing",
    role: "Clinical Education Partner",
    note: "Structured home-nursing placement bridge for GNM graduates, enabling flexible post-op care shifts and clinical mentoring.",
  },
  {
    org: "Tamil Nadu Skill Development Corporation (TNSDC)",
    role: "Government Vocational Partner",
    note: "Co-created specialized women chauffeur and defensive driving certification cohorts across Chennai and Coimbatore.",
  },
  {
    org: "Apollo Hospitals Homecare Alliance",
    role: "Hospital Bedside Partner",
    note: "Seamless post-discharge bedside support ensuring zero unplanned readmissions for elderly orthopedic patients.",
  },
];

export interface FAQItem {
  q: string;
  a: string;
  category: "Safety & Verification" | "Booking & Rescheduling" | "Pricing & GST" | "Caregiver Matching" | "Emergency & SOS" | "Partnerships";
}

export const FAQS: FAQItem[] = [
  {
    category: "Safety & Verification",
    q: "How does ApnaCare ensure attendant safety and trustworthiness?",
    a: "Every attendant undergoes a multi-layer verification process before assignment: 1) Aadhaar biometric identity check, 2) Formal police verification report via state police wings, 3) Prior employment reference validation, 4) Court record background screening, and 5) Rigorous in-person safety and behavioral assessment.",
  },
  {
    category: "Safety & Verification",
    q: "Can I view the attendant's credentials before they arrive at our home?",
    a: "Yes. Once your booking requirements are matched, our care team sends you a secure digital profile card containing the attendant's photograph, verified ID status, training certifications, languages spoken, and past customer ratings.",
  },
  {
    category: "Booking & Rescheduling",
    q: "How much advance notice is required to book an attendant?",
    a: "We recommend booking 24 to 48 hours in advance for planned hospital stays or elder care. However, in emergency or urgent situations, our priority dispatch protocol in active metro zones can dispatch an attendant in under 2 hours.",
  },
  {
    category: "Booking & Rescheduling",
    q: "Can I adjust the shift timings or change the assigned attendant?",
    a: "Absolutely. If you need to modify shift schedules, simply notify your dedicated care coordinator via WhatsApp or call. If you feel the caregiver is not the right cultural or language match, we provide a hassle-free replacement within 24 hours.",
  },
  {
    category: "Pricing & GST",
    q: "Are there any hidden dispatcher charges or surge fees?",
    a: "Zero hidden charges. ApnaCare operates on strict price transparency. All charges include base wages, coordinator support, backup guarantees, and an official 18% GST tax invoice for medical insurance or tax filing.",
  },
  {
    category: "Pricing & GST",
    q: "What is your refund and cancellation policy?",
    a: "You receive a 100% full refund if you cancel at least 12 hours before scheduled service commencement. If cancelled within 12 hours due to genuine emergency or hospitalization, you receive a full credit balance with zero deduction.",
  },
  {
    category: "Caregiver Matching",
    q: "Can we request an attendant who speaks our specific mother tongue?",
    a: "Yes! During the booking process, you can specify your preferred language (Tamil, Kannada, Telugu, Hindi, English, Malayalam). We prioritize language compatibility so seniors feel completely comfortable.",
  },
  {
    category: "Caregiver Matching",
    q: "Do you offer 24-hour live-in attendants?",
    a: "Yes. We offer 24-hour live-in care arrangements for elderly care, post-natal recovery, and post-operative patients. Live-in attendants require clean private accommodation and nutritious meals provided by the host family.",
  },
  {
    category: "Emergency & SOS",
    q: "How does the integrated Emergency SOS button work?",
    a: "Every active booking includes a live tracking dashboard with an instant SOS trigger. When activated by either the attendant or family, our 24/7 central control room receives immediate GPS telemetry, alerts designated emergency contacts via SMS, and coordinates with local medical/police responders.",
  },
  {
    category: "Partnerships",
    q: "How can nursing colleges, NGOs, or SHGs partner with ApnaCare?",
    a: "Institutions can visit our Ecosystem Partners page and submit an online partnership enquiry. Our partnership directors will arrange a formal credential review and MoU discussion within 48 hours.",
  },
];

export const SAFETY_PILLARS = [
  {
    title: "100% Police Verified",
    desc: "Every woman attendant's background is formally vetted through law enforcement records and judicial database screenings.",
    icon: "ShieldCheck",
  },
  {
    title: "Biometric Identity Authentication",
    desc: "Direct Aadhaar and PAN biometric matching ensures no impersonation or unverified proxy workers are dispatched.",
    icon: "Fingerprint",
  },
  {
    title: "Accredited Clinical & Soft-Skills Training",
    desc: "Rigorous training in geriatric care, patient handling, infant hygiene, BLS first aid, and compassionate communication.",
    icon: "GraduationCap",
  },
  {
    title: "Live GPS Trip & Shift Tracking",
    desc: "Real-time location sharing during all transits and check-ins at residential premises for transparent visibility.",
    icon: "MapPin",
  },
  {
    title: "24/7 Command Center & Instant SOS",
    desc: "Dedicated control room monitoring shifts around the clock with rapid escalation protocols in case of emergencies.",
    icon: "Radio",
  },
  {
    title: "Guaranteed Replacement Guarantee",
    desc: "If an attendant is unwell or if there is any mismatch, a vetted backup is dispatched swiftly without interrupting care.",
    icon: "UserCheck",
  },
];

export const formatINR = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
