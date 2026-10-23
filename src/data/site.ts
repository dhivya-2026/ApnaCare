// Central, config-driven content and data models for ApnaCare.
// Edit here — never hardcode content in individual components.

export const SITE = {
  name: "ApnaCare",
  legalName: "ApnaCare Health & Mobility Support Services Pvt. Ltd.",
  url: "https://apnacare.lovable.app",
  tagline: "Trusted Women Attendant Services You Can Rely On",
  coreMessage: "Trusted Women Attendants for Every Stage of Care",
  SUPPORT_PHONE: "+91 88254 93949",
  SUPPORT_PHONE_TEL: "+918825493949",
  WHATSAPP: "918825493949",
  EMAIL: "care@apnacare.in",
  EMERGENCY_LINE: "+91 88254 93949",
  GST_RATE: 0.18,
  yearsOfService: "8+",
  familiesHelped: "1,200+",
  activeAttendants: "500+",
  policeVerifiedPercent: "100%",
  retentionRate: "98.4%",
  operatingHours: "24 Hours / 7 Days a Week",
  headquarters: "4th Floor, SafeHub Towers, Indiranagar, Bengaluru, Karnataka 560038",
  LINKEDIN_URL: "https://www.linkedin.com/company/apna-care-india/",
};

export type ServiceCategory = "home" | "healthcare" | "safety" | "travel" | "lifestyle";

export const CATEGORIES: { id: "all" | ServiceCategory; label: string; description: string }[] = [
  {
    id: "all",
    label: "All Services",
    description:
      "Complete directory of trusted women attendants for home, healthcare and mobility.",
  },
  {
    id: "home",
    label: "Home & Personal Care",
    description:
      "Compassionate bedside and home daily living support for elders, new mothers and recovering family members.",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    description:
      "Qualified hospital attendants and nursing assistants for clinical, surgical and post-op care.",
  },
  {
    id: "safety",
    label: "Safety & Security",
    description: "Vetted women security escorts, event attendants and residential safety support.",
  },
  {
    id: "travel",
    label: "Travel & Mobility",
    description:
      "Chauffeuses, airport companions and railway transit attendants for safe journeys.",
  },
  {
    id: "lifestyle",
    label: "Lifestyle Support",
    description:
      "Errand assistance, wellness accompaniment, social outings and routine companionship.",
  },
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
    a: "Every attendant undergoes a structured 5-stage background verification: government photo ID authentication, police verification documentation filing, residential address checks, reference reviews, and practical caregiving skills assessment.",
  },
  {
    q: "Are there any surprise fees or dispatcher commissions?",
    a: "Never. The price on your booking summary transparently details the base caregiver fee plus 18% statutory GST, with a complete tax invoice provided. There are zero dispatcher commissions or surge surcharges.",
  },
  {
    q: "What happens if our assigned attendant falls ill or has an emergency?",
    a: "We maintain a priority cluster backup protocol across our active operating hubs. If your primary attendant cannot attend due to an unexpected illness or emergency, our regional care coordinator prioritizes standby attendant reassignment to minimize disruption to your care schedule.",
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
    shortDesc:
      "Compassionate 24/7 companionship, mobility assistance and routine medication support for senior citizens.",
    description:
      "Dedicated and trained women attendants providing compassionate companionship, mobility aid, medication schedules and emotional reassurance for elders at home. Designed to provide aging parents with dignified, compassionate care while offering working families reassurance and dependable support.",
    rating: 4.9,
    reviewCount: 420,
    badge: "Popular",
    startingPrice: 1299,
    pricingUnit: "day",
    benefits: [
      "24/7 companionship & safety supervision",
      "Daily living and mobility assistance",
      "Timely medication reminders & vitals logging",
    ],
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
    qualifications: [
      "Geriatric Care Certification",
      "Basic Life Support (BLS) & First Aid",
      "Full Police Verification Cleared",
    ],
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
    shortDesc:
      "Attentive bedside companionship, staff coordination, and recovery assistance during hospital stays.",
    description:
      "Trained female attendants who remain by your family member's hospital bedside day and night. They ensure comfort, assist with bathroom visits, coordinate with nurses and doctors, and keep remote family members continuously informed.",
    rating: 4.9,
    reviewCount: 310,
    badge: "Popular",
    startingPrice: 1499,
    pricingUnit: "day",
    benefits: [
      "Dedicated bedside vigil",
      "Direct coordination with hospital nursing staff",
      "Frequent vitals and comfort updates to family",
    ],
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
    qualifications: [
      "Hospital Bedside Protocol Training",
      "Infection Control Certification",
      "Police Background Verification",
    ],
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
    shortDesc:
      "Qualified female nurses for clinical injections, wound dressings, catheter care and post-operative recovery.",
    description:
      "Registered and certified female nurses providing clinical-grade care at home. From surgical wound management, IV infusion monitoring, and catheter changes to palliative comfort, our nurses combine hospital competence with warm bedside manners.",
    rating: 4.9,
    reviewCount: 285,
    badge: "Popular",
    startingPrice: 1999,
    pricingUnit: "day",
    benefits: [
      "Certified GNM and B.Sc. Nursing staff",
      "Sterile wound dressings & medication delivery",
      "Doctor prescription compliance",
    ],
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
    qualifications: [
      "Registered Nurse (GNM or B.Sc. Nursing)",
      "Active State Nursing Council Registration",
      "Police Verification Cleared",
    ],
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
    shortDesc:
      "Specialized maternal recuperation, newborn massage, feeding support and night soothing for new mothers.",
    description:
      "Experienced post-natal attendants trained in traditional Japa maternal care (traditional convalescence care, infant massage, and maternal recovery). They handle traditional baby bathing, feeding assistance, soothing, and allow new mothers the deep, undisturbed sleep needed to heal.",
    rating: 5.0,
    reviewCount: 190,
    badge: "Popular",
    startingPrice: 1999,
    pricingUnit: "day",
    benefits: [
      "Expert newborn massage & bath",
      "Breastfeeding latch & feeding support",
      "Restorative night rest for mother",
    ],
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
    qualifications: [
      "Certified Post-Natal & Infant Care",
      "Pediatric First Aid Certified",
      "Police Background Cleared",
    ],
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
    shortDesc:
      "Vetted women companions for intercity travel, family road trips, bus transits and destination stays.",
    description:
      "Reliable, background-checked women travel companions to accompany solo women, elderly parents, or young children on long-distance flights, trains, and outstation trips. From handling luggage to navigation and check-ins, they ensure safe and pleasant travel.",
    rating: 4.8,
    reviewCount: 145,
    badge: "Trending",
    startingPrice: 1599,
    pricingUnit: "day",
    benefits: [
      "End-to-end journey companionship",
      "Luggage & ticketing assistance",
      "Live GPS sharing with family",
    ],
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
    qualifications: [
      "Safe Travel Companion Training",
      "First Aid Certified",
      "Police Verification Cleared",
    ],
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
    shortDesc:
      "Gate-to-curb and terminal meet-and-greet airport companions for hassle-free flights and transfers.",
    description:
      "Dedicated female companions meeting passengers right at the airport arrival gate or assisting them from home through departure security. Ideal for seniors arriving late at night or international travelers navigating large terminals.",
    rating: 4.9,
    reviewCount: 210,
    badge: "Popular",
    startingPrice: 999,
    pricingUnit: "trip",
    benefits: [
      "Arrival gate meet-and-greet with name placard",
      "Wheelchair & baggage claim coordination",
      "Safe vehicle escort to doorstep",
    ],
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
    qualifications: [
      "Airport Ground Escort Trained",
      "Police Verification Cleared",
      "Valid ID Badges",
    ],
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
    shortDesc:
      "Platform-side meet, luggage porter coordination, and safe coach boarding for train travelers.",
    description:
      "Experienced female station companions who meet passengers at railway station entrances, assist through security checks, coordinate licensed porters, and escort passengers safely right to their coach berth.",
    rating: 4.8,
    reviewCount: 160,
    badge: "Specialized",
    startingPrice: 899,
    pricingUnit: "trip",
    benefits: [
      "Platform & coach berth escort",
      "Luggage & porter management",
      "Boarding confirmation to family",
    ],
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
    shortDesc:
      "Licensed, background-checked professional women chauffeurs for daily commutes, errands and city travel.",
    description:
      "Experienced, verified professional women drivers for personal vehicles or provided cars. Available for daily office commutes, senior clinic visits, children school runs, and outstation family trips.",
    rating: 4.8,
    reviewCount: 230,
    badge: "Trending",
    startingPrice: 1199,
    pricingUnit: "day",
    benefits: [
      "Licensed & defensive driving certified",
      "Police verified with clean traffic records",
      "Hourly, daily & monthly packages",
    ],
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
    qualifications: [
      "Commercial/Private Driving Licence",
      "Defensive Driving Certification",
      "Police Background Verification Cleared",
    ],
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
    shortDesc:
      "Trained women security escorts and protective companions for events, transit and residential peace of mind.",
    description:
      "Disciplined, physically trained female security personnel providing close protection, event security, cash/jewelry transit escorts, and residential gate surveillance with heightened situational awareness.",
    rating: 4.9,
    reviewCount: 115,
    badge: "High Demand",
    startingPrice: 1899,
    pricingUnit: "day",
    benefits: [
      "Trained in situational awareness & self-defense",
      "Discreet and professional conduct",
      "24/7 control room GPS link",
    ],
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
    qualifications: [
      "Security Guard Certification (PSARA compliant)",
      "Self-Defense & Martial Arts Trained",
      "Full Police Verification Cleared",
    ],
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
    shortDesc:
      "Warm daily living assistance, personal hygiene, and light domestic wellness support for home recuperation.",
    description:
      "Empathetic caregivers assisting with day-to-day household living, personal grooming, dietary scheduling, and mobility for individuals regaining strength after illnesses or living with mobility limitations.",
    rating: 4.8,
    reviewCount: 340,
    badge: "Popular",
    startingPrice: 1099,
    pricingUnit: "day",
    benefits: [
      "Gentle personal care with dignity",
      "Healthy meal & hydration routines",
      "Continuous family reassurance",
    ],
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
    qualifications: [
      "Personal Care Attendant Diploma",
      "Hygiene & Infection Prevention Trained",
      "Police Verification Cleared",
    ],
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
    shortDesc:
      "Social outing accompaniment, errand running, technology tutoring and wellness company for active seniors.",
    description:
      "Energetic and patient female companions to accompany active seniors on walks in the park, visits to friends, temple visits, bank chores, grocery shopping, and learning smartphones and video calling.",
    rating: 4.9,
    reviewCount: 175,
    badge: "Specialized",
    startingPrice: 899,
    pricingUnit: "day",
    benefits: [
      "Active social engagement & companionship",
      "Assistance with banking, errands & shopping",
      "Smartphone & video-call tutoring",
    ],
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
    qualifications: [
      "Elder Companion Training",
      "Digital Literacy Certified",
      "Police Verification Cleared",
    ],
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
    price: 899,
    unit: "trip",
    popular: false,
    serviceSlug: "railway-assistance",
    includes: [
      "Verified female attendant meeting at gate/platform",
      "Real-time GPS travel tracking link shared with family",
      "Help with luggage transfers and station check-ins",
      "Full background and police verification",
      "18% GST statutory tax invoice provided — no hidden fees",
    ],
  },
  {
    id: "daily",
    name: "Daily Attendant & Care",
    description: "Empathetic home care, hospital bedside assistance and nursing support.",
    price: 1299,
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
    name: "Custom Security & Escort",
    description: "Dedicated security guards, private escorts and customized shifts.",
    price: 1899,
    unit: "day",
    popular: false,
    serviceSlug: "security-support",
    includes: [
      "Fully trained defensive security or expert escort",
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
  "18% GST statutory tax invoice provided",
  "Full refund protection prior to dispatch (as per cancellation terms)",
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
    certifications: ["General Nursing and Midwifery (GNM)", "BLS Certified", "Infection Control"],
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
    certifications: [
      "Certified Infant Care Specialist",
      "Pediatric First Aid",
      "Post-Natal Therapy",
    ],
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
    certifications: [
      "PSARA Security Guard Certified",
      "Martial Arts & Self-Defense",
      "Command Center Protocol",
    ],
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
    phone: "+91 88254 93949",
    coverageAreas: [
      "Indiranagar",
      "Koramangala",
      "HSR Layout",
      "Whitefield",
      "Jayanagar",
      "Malleshwaram",
      "Hebbal",
      "Electronic City",
      "JP Nagar",
      "Bannerghatta",
    ],
    popularServices: ["Elderly Care", "Hospital Assistance", "Women Drivers", "Post-Natal Care"],
    description:
      "Our flagship command center in Bengaluru covers all central, eastern and southern tech corridors with instant emergency dispatch and verified attendants.",
  },
  {
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    attendants: "150+",
    families: "300+",
    dispatch: "<18 min",
    address: "CareTower, Anna Salai, T. Nagar, Chennai 600017",
    phone: "+91 88254 93949",
    coverageAreas: [
      "T. Nagar",
      "Adyar",
      "Mylapore",
      "Anna Nagar",
      "Velachery",
      "Besant Nagar",
      "Kilpauk",
      "OMR IT Corridor",
      "Nungambakkam",
      "Tambaram",
    ],
    popularServices: [
      "Elderly Care",
      "Nursing Services",
      "Hospital Assistance",
      "Airport Assistance",
    ],
    description:
      "Comprehensive medical and home attendant coverage across Chennai's historic residential areas and medical centers along Greams Road and Anna Salai.",
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    attendants: "100+",
    families: "200+",
    dispatch: "<20 min",
    address: "CyberCare Complex, Hitec City, Madhapur, Hyderabad 500081",
    phone: "+91 88254 93949",
    coverageAreas: [
      "Banjara Hills",
      "Jubilee Hills",
      "Gachibowli",
      "Hitec City",
      "Kondapur",
      "Kukatpally",
      "Secunderabad",
      "Madhapur",
      "Begumpet",
    ],
    popularServices: ["Nursing Services", "Post-Natal Care", "Women Drivers", "Security Support"],
    description:
      "Serving twin cities families with clinical-grade home nursing, post-natal recovery specialists, and executive women chauffeurs.",
  },
  {
    slug: "coimbatore",
    name: "Coimbatore",
    state: "Tamil Nadu",
    attendants: "60+",
    families: "100+",
    dispatch: "<15 min",
    address: "Greenway Hub, Avinashi Road, Peelamedu, Coimbatore 641004",
    phone: "+91 88254 93949",
    coverageAreas: [
      "RS Puram",
      "Peelamedu",
      "Race Course",
      "Gandhipuram",
      "Saibaba Colony",
      "Saravanampatti",
      "Singanallur",
      "Vadavalli",
    ],
    popularServices: [
      "Elderly Care",
      "Railway Assistance",
      "Home & Personal Care",
      "Lifestyle Support",
    ],
    description:
      "Dedicated elder care and railway transit companions for Coimbatore and surrounding Kongu region communities.",
  },
];

export const getCity = (slug: string) => CITIES.find((c) => c.slug === slug);

export type ArticleCategory =
  | "Government Schemes"
  | "Women Safety"
  | "Senior Citizen Care"
  | "Health Awareness"
  | "Travel Safety"
  | "Home Safety"
  | "Caregiver Guidance"
  | "Maternal & Newborn";

export const ARTICLE_CATEGORIES: ("All" | ArticleCategory)[] = [
  "All",
  "Senior Citizen Care",
  "Caregiver Guidance",
  "Health Awareness",
  "Maternal & Newborn",
  "Home Safety",
  "Government Schemes",
  "Women Safety",
  "Travel Safety",
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
    slug: "coordinating-care-for-ageing-parents",
    title: "How Working Professionals Can Coordinate Care for Ageing Parents",
    category: "Caregiver Guidance",
    readTime: "5 min read",
    author: "ApnaCare Family Support Team",
    date: "October 2026",
    excerpt:
      "Practical ways urban professionals can balance demanding careers with elderly care, establish daily communication routines, and avoid burnout.",
    body: [
      "Balancing a high-responsibility career while looking after ageing parents is one of the most common challenges faced by urban professionals in India. The worry is rarely about intention; it is about practical bandwidth, unexpected hospital visits, and managing day-to-day safety from afar.",
      "The first step is establishing clear daily visibility rather than relying on anxious ad-hoc phone calls. Structured morning and evening check-ins, combined with a daily digital update on meals, hydration, and medication, provide immediate peace of mind while at work.",
      "Identify the true scope of care needed: does your parent need companion support with daily walking and meals, non-clinical bedside assistance, or clinical nursing? Conflating these leads to misaligned expectations and extra stress.",
      "Create a family shared care document listing attending doctors, current prescriptions, emergency hospital choices, and health insurance policy details so that any family member or caregiver can step in without friction.",
    ],
    keyTakeaways: [
      "Shift from anxious reactive calls to agreed daily check-in rhythms.",
      "Distinguish between non-clinical daily living support and clinical nursing care.",
      "Keep an accessible digital copy of medical history, prescriptions, and emergency contacts.",
    ],
  },
  {
    slug: "questions-before-choosing-bedside-attendant",
    title: "What Families Should Ask Before Choosing a Bedside Attendant",
    category: "Caregiver Guidance",
    readTime: "5 min read",
    author: "Clinical Operations Desk",
    date: "October 2026",
    excerpt:
      "A comprehensive checklist covering background verification, clinical vs non-clinical boundaries, emergency escalation, and shift continuity.",
    body: [
      "Inviting a bedside attendant into your home or hospital room requires immense trust. Families often make quick decisions during an acute health crisis without verifying essential operational details.",
      "Essential Question 1: How is the caregiver verified? Insist on government ID biometric verification, address validation, and police background clearance. Unverified private brokers often lack accountability.",
      "Essential Question 2: What are the caregiver's boundaries? Attendants provide compassionate, non-clinical assistance such as personal hygiene, mobility aid, feeding, and companionship. They must never administer IV medications, adjust oxygen flow, or insert catheters unless they hold registered nursing qualifications (GNM/B.Sc).",
      "Essential Question 3: What is the replacement and escalation protocol? Inquire what happens if the caregiver falls ill or cannot attend a shift. A reliable service will have clear protocols for continuity without leaving your family stranded.",
    ],
    keyTakeaways: [
      "Always verify police clearance and biometric Aadhaar screening.",
      "Clarify what an attendant can and cannot do clinically to ensure patient safety.",
      "Confirm backup dispatch policies before confirming multi-day commitments.",
    ],
  },
  {
    slug: "preparing-home-after-hospital-discharge",
    title: "Preparing the Home for Recovery After Hospital Discharge",
    category: "Home Safety",
    readTime: "6 min read",
    author: "Geriatric & Post-Op Advisory Cell",
    date: "October 2026",
    excerpt:
      "Essential preparations to arrange bedroom access, fall prevention, bathroom grab rails, and caregiver handovers before bringing a patient home.",
    body: [
      "The first 72 hours after leaving the hospital are critical for patient comfort and preventing accidental readmissions. Preparing the home environment in advance ensures a smooth and safe transition.",
      "Clear mobility pathways: eliminate loose carpets, trailing wires, and low footstools between the bedroom and bathroom. Ensure doorways accommodate walkers or wheelchairs if required.",
      "Bathroom adaptations: install heavy-duty stainless steel grab bars beside the commode and shower. A sturdy shower chair and non-slip rubber mats significantly reduce the danger of wet-floor falls.",
      "Establish a clear medication schedule: place morning, afternoon, and night medicines in labelled organizer boxes, and keep the hospital discharge summary clearly pinned where visiting doctors or caregivers can review it.",
    ],
    keyTakeaways: [
      "Inspect and clear all walking corridors before the patient arrives home.",
      "Install bathroom grab bars and use a seated shower chair for safe hygiene.",
      "Maintain a centralized medication chart derived directly from the hospital discharge summary.",
    ],
  },
  {
    slug: "caregiver-vs-qualified-nurse",
    title: "Understanding the Difference Between a Caregiver and a Qualified Nurse",
    category: "Health Awareness",
    readTime: "5 min read",
    author: "ApnaCare Clinical Board",
    date: "September 2026",
    excerpt:
      "Clarifying credentials, clinical responsibilities, and non-clinical care so families choose the right level of support for their loved one.",
    body: [
      "Families often use the terms 'attendant', 'caregiver', and 'nurse' interchangeably, but their training, legal scope of practice, and clinical responsibilities are fundamentally different.",
      "A Caregiver / Bedside Attendant provides essential non-clinical support. This includes personal hygiene, mobility assistance, companionship, meal assistance, reminders for pre-packaged oral medications, and reporting general comfort observations. They do not perform invasive clinical tasks.",
      "A Registered Nurse (GNM / B.Sc Nursing) is a licensed healthcare professional trained to administer intravenous (IV) infusions, intramuscular injections, sterile wound dressings, urinary catheter care, tracheostomy care, and complex vital monitoring under doctor prescription.",
      "Choosing the right level of care prevents clinical complications, avoids unnecessary expenses, and ensures that qualified professionals handle medical procedures safely.",
    ],
    keyTakeaways: [
      "Attendants focus on daily living activities, personal hygiene, and compassionate companionship.",
      "Registered nurses perform clinical procedures strictly under a doctor's valid prescription.",
      "Always clarify the clinical requirements of your family member before booking care.",
    ],
  },
  {
    slug: "supporting-new-mother-after-childbirth",
    title: "Practical Ways Families Can Support a New Mother After Childbirth",
    category: "Maternal & Newborn",
    readTime: "5 min read",
    author: "Maternal Care Desk",
    date: "September 2026",
    excerpt:
      "How family members and dedicated post-natal caregivers can share the physical load, protect maternal sleep, and foster restorative recovery.",
    body: [
      "The arrival of a newborn is a joyous milestone, but the physical and emotional recovery of the mother during the fourth trimester often receives secondary attention.",
      "Protecting maternal sleep is vital: sleep deprivation slows physical tissue healing and intensifies postpartum emotional fatigue. Partners and family can handle burping, diaper changes, and soothing between feeds so the mother can achieve continuous rest cycles.",
      "Practical nutritional and hydration support: preparing easily digestible, nutrient-dense traditional meals and ensuring the mother has warm water, broths, and healthy snacks within arm's reach.",
      "A trained post-natal attendant offers gentle assistance with infant hygiene, newborn sponge baths, and mother comfort routines, allowing the family to enjoy the new baby without feeling overwhelmed.",
    ],
    keyTakeaways: [
      "Prioritise uninterrupted sleep cycles for the recovering mother.",
      "Share non-feeding tasks like soothing, diapering, and burping.",
      "A dedicated post-natal attendant brings experienced, gentle support during early recovery.",
    ],
  },
  {
    slug: "elderly-care-preserving-independence",
    title: "How Elderly People Can Receive Support While Preserving Independence",
    category: "Senior Citizen Care",
    readTime: "5 min read",
    author: "Geriatric Wellness Desk",
    date: "September 2026",
    excerpt:
      "Caregiving is about enablement, not taking away autonomy. How respectful assistance maintains elder dignity, confidence, and physical health.",
    body: [
      "One of the deepest fears elderly parents face when accepting help is losing their autonomy or feeling like a burden to their children. Dignified caregiving must always focus on enablement rather than taking over.",
      "Encourage active participation: allow seniors to continue making their own daily choices regarding meals, clothes, leisure activities, and personal routines, stepping in only where physical safety requires assistance.",
      "Mobility encouragement: gentle assisted daily walks inside the home or in the garden preserve muscle tone and balance far better than prolonged bed rest.",
      "Respectful companionship: a compassionate attendant listens patiently to stories, respects personal space, and treats the senior with the warmth and cultural deference they deserve.",
    ],
    keyTakeaways: [
      "Support should enable seniors rather than take away their decision-making autonomy.",
      "Maintain safe, guided daily movement routines to preserve muscle strength.",
      "Treat every interaction with cultural respect, active listening, and patience.",
    ],
  },
  {
    slug: "women-travel-safety-rights",
    title: "Understanding Safety Rights & Travel Mandates for Women in India",
    category: "Women Safety",
    readTime: "4 min read",
    author: "ApnaCare Safety Cell",
    date: "October 2026",
    excerpt:
      "A practical, verified overview of travel safety provisions, 112 emergency integration, and reserved facilities every woman traveler should know.",
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
    excerpt:
      "An actionable introduction to Ayushman Bharat senior coverage, Indira Gandhi pension benefits, and state welfare provisions for elders.",
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
    excerpt:
      "Simple daily vital observations and hydration tracking families and attendants can record to prevent emergency hospitalizations.",
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
    excerpt:
      "Low-cost, highly effective structural modifications to prevent domestic falls and preserve elderly independence.",
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
    excerpt:
      "Practical checklist for booking wheelchair assistance, meal requests, and transit companion escorts.",
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
    testimonial:
      "Sunitha has been caring for my 82-year-old father for the past 6 months. Her patience, prompt medicine reminders, and genuine warmth made a massive difference. As a practicing surgeon, having a verified, reliable woman attendant gave me peace of mind I haven't had in years.",
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
    testimonial:
      "As first-time parents with no family in Bengaluru, we were completely overwhelmed after our baby's C-section birth. Ananya was a godsend. She handled the baby massage, helped my wife rest, and taught us safe swaddling. 100% transparent pricing and total reliability.",
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
    testimonial:
      "When my mother had knee replacement surgery at Apollo, I couldn't stay 24 hours at the hospital because of my office. Preeti stayed by her bedside, coordinated with the nurses, and kept me updated every few hours. Transparent invoicing and wonderful professionalism.",
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
    testimonial:
      "I had to travel alone from Coimbatore to Delhi for an eye treatment. ApnaCare arranged an airport companion who helped me with my heavy luggage, check-in, and wheelchair transfer. Extremely polite, dignified, and safety-focused service.",
    date: "2 months ago",
  },
];

export const PARTNER_CATEGORIES = [
  {
    name: "Nursing Colleges",
    desc: "Top state-accredited nursing institutions for clinical candidate recruitment and field training.",
    count: "45+",
  },
  {
    name: "Women's Colleges",
    desc: "Higher education institutions empowering young women with dignified employment paths.",
    count: "32+",
  },
  {
    name: "NGOs",
    desc: "Women-focused non-profits and grassroots community welfare societies.",
    count: "89+",
  },
  {
    name: "Women Self-Help Groups (SHGs)",
    desc: "National Rural Livelihoods Mission & urban Self Help Groups for direct livelihood generation.",
    count: "156+",
  },
  {
    name: "Driving Institutes",
    desc: "Certified motor driving schools conducting defensive driving and chauffeuse training.",
    count: "38+",
  },
  {
    name: "Hospitals & Healthcare",
    desc: "NABH-accredited hospitals, diagnostic clinics and home health provider networks.",
    count: "67+",
  },
  {
    name: "Corporate Partners",
    desc: "Enterprise leaders partnering on women safety programs, CSR, and eldercare employee benefits.",
    count: "24+",
  },
  {
    name: "Government Skill Centres",
    desc: "PMKVY and state skill development corporation affiliated vocational centers.",
    count: "52+",
  },
  {
    name: "Police Verification",
    desc: "Authorized third-party background and police record verification agencies.",
    count: "18+",
  },
  {
    name: "Legal Support",
    desc: "Women legal aid cells and labor advocacy counselors protecting attendant rights.",
    count: "12+",
  },
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
  [
    "02 Submit Request",
    "Complete the comprehensive digital partnership enquiry form with institutional details.",
  ],
  [
    "03 Admin Review",
    "Our Ecosystem Partnerships Directorate evaluates organizational credentials within 48 hours.",
  ],
  [
    "04 Document Verification",
    "Submission of registration certificates, 12A/80G status, or educational accreditation.",
  ],
  [
    "05 Strategic Discussion",
    "Virtual or in-person workshop to define candidate intake, safety protocols, and operational workflows.",
  ],
  [
    "06 MoU Execution",
    "Finalization and digital signing of mutually agreed partnership Memorandum of Understanding.",
  ],
  [
    "07 Onboarding & Training",
    "Candidates undergo ApnaCare safety curriculum, soft-skill training, and biometric verification.",
  ],
  [
    "08 Active Impact",
    "Active deployment of verified female attendants with real-time impact dashboard reporting.",
  ],
];

export const PARTNER_TYPES = [
  "NGOs & Non-Profits",
  "Women Self-Help Group (SHG) Federations",
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
    role: "Women Self-Help Group (SHG) Livelihood Partner",
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
  category:
    | "Safety & Verification"
    | "Booking & Rescheduling"
    | "Pricing & GST"
    | "Caregiver Matching"
    | "Emergency & SOS"
    | "Partnerships";
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
    q: "How can nursing colleges, NGOs, or Self-Help Groups (SHGs) partner with ApnaCare?",
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
    desc: "Rigorous training in geriatric care, patient handling, infant hygiene, Basic Life Support (BLS) & first aid, and compassionate communication.",
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
    title: "Guaranteed Attendant Replacement",
    desc: "If an attendant is unwell or if there is any mismatch, a vetted backup is dispatched swiftly without interrupting care.",
    icon: "UserCheck",
  },
];

export const formatINR = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

/**
 * Build a WhatsApp click-to-chat URL.
 * `msg` is optional — pass a pre-filled message for contextual enquiries.
 * The phone number is read from SITE.WHATSAPP (digits only, international format).
 * NOTE: The number in SITE.WHATSAPP is a placeholder. Replace it with the real number before going live.
 */
export const buildWhatsAppUrl = (msg?: string) => {
  const base = `https://wa.me/${SITE.WHATSAPP}`;
  if (!msg) return base;
  return `${base}?text=${encodeURIComponent(msg)}`;
};

// ─── Target Ideal Customer Profiles (ICPs) ───────────────────────────────────

export interface SpinServiceDetail {
  id: string;
  name: string;
  serviceSlug: string;
  situation: string;
  problem: string;
  implication: string;
  solution: string;
  benefits: string[];
  startingPrice: number;
  pricingUnit: string;
  ctaText: string;
}

export interface ICPInfo {
  slug: string;
  name: string;
  badge: string;
  subtitle: string;
  summary: string;
  painPoints: { problem: string; solution: string }[];
  featuredServices: string[];
  stat: { value: string; label: string };
  quote: { text: string; author: string; role: string; city: string };
  faqs: { q: string; a: string }[];
  spinServices?: SpinServiceDetail[];
  challengesContext?: string;
}

export const ICPS: ICPInfo[] = [
  {
    slug: "urban-professionals",
    name: "Urban Professionals",
    badge: "Balanced Career & Family Care",
    subtitle:
      "Compassionate home care, bedside assistance, and qualified nursing support so working executives can balance intense careers with family care.",
    summary:
      "Managing demanding professional commitments while coordinating reliable care for ageing parents, post-surgical recovery, or a newborn can feel overwhelming. ApnaCare helps urban professionals arrange vetted, dependable support tailored to their family's realistic schedule and specific care needs.",
    challengesContext:
      "Does this sound familiar? You're in back-to-back meetings while worrying whether your parents took their afternoon medication, or you are struggling to arrange bedside shifts after a parent's sudden hospitalization. Balancing work with family care shouldn't mean carrying everything alone.",
    painPoints: [
      {
        problem: "Constant worry about ageing parents living alone while you are at work",
        solution:
          "Vetted geriatric care attendants provide companionship, mobility support, medication routines, and scheduled WhatsApp daily updates to keep your family informed.",
      },
      {
        problem: "Managing hospital bedside vigils alongside urgent workplace deadlines",
        solution:
          "Trained bedside attendants handle continuous non-clinical patient comfort, hygiene, and hospital staff coordination within their permitted attendant role.",
      },
      {
        problem: "Uncertainty regarding attendant qualifications and clinical vs non-clinical boundaries",
        solution:
          "Strict transparency: non-clinical daily living tasks are handled by trained attendants, while clinical procedures (injections, catheter, wound dressing) are delivered by registered GNM/B.Sc nurses under doctor prescription.",
      },
    ],
    spinServices: [
      {
        id: "elderly-care",
        name: "Elderly Care",
        serviceSlug: "elderly-care",
        situation:
          "You have a demanding job, long working hours, or frequent travel while your ageing parents live alone or need daily assistance.",
        problem:
          "You worry about their mobility, meals, medication routines, companionship, and everyday safety. You cannot always be physically present, and coordinating reliable help takes time.",
        implication:
          "Caregiving responsibilities can increase stress, create family coordination difficulties, and make it harder to respond promptly when support is needed.",
        solution:
          "ApnaCare's available elderly care services assist with daily activities, companionship, mobility support, and agreed care routines. Attendants log daily care observations so you stay connected with your parents' well-being throughout your working day.",
        benefits: [
          "Assistance with daily living activities & mobility",
          "Timely medication schedule reminders",
          "Warm companionship & conversation",
          "Agreed family updates via WhatsApp",
        ],
        startingPrice: 1200,
        pricingUnit: "day",
        ctaText: "Explore Elderly Care",
      },
      {
        id: "hospital-attendants",
        name: "Hospital Assistance / Bedside Care",
        serviceSlug: "hospital-attendants",
        situation:
          "A loved one has been admitted to hospital, and your work or family responsibilities prevent you from staying beside them continuously.",
        problem:
          "You need dependable assistance with everyday comfort, non-clinical support, and coordination with the hospital team within the attendant's permitted role.",
        implication:
          "Managing hospital visits, work commitments, and family communication simultaneously can become exhausting and stressful.",
        solution:
          "Available bedside assistance helps with patient comfort, hydration, mobility support to the washroom, and clear coordination with hospital nursing staff. Clinical decisions and clinical nursing remain strictly with hospital medical professionals.",
        benefits: [
          "Attentive bedside presence for non-clinical comfort",
          "Mobility support & personal hygiene assistance",
          "Coordination with hospital ward staff",
          "Shift handover notes for visiting family members",
        ],
        startingPrice: 1400,
        pricingUnit: "day",
        ctaText: "Explore Bedside Care",
      },
      {
        id: "nursing-services",
        name: "Nursing Services",
        serviceSlug: "nursing-services",
        situation:
          "A family member needs professional nursing care during recovery or while managing a clinician-prescribed care plan at home.",
        problem:
          "You need appropriately qualified nursing professionals and a clear understanding of the care they can provide.",
        implication:
          "Unclear care arrangements can increase family stress and make it harder to coordinate recovery and follow-up care.",
        solution:
          "ApnaCare connects families with registered GNM and B.Sc nurses equipped to provide clinician-prescribed procedures including wound dressing, catheter management, injections, and vital monitoring under authorized medical instructions.",
        benefits: [
          "Delivered by registered GNM / B.Sc nurses",
          "Strict adherence to physician care prescriptions",
          "Sterile dressing, injections & catheter maintenance",
          "Clinical documentation of vitals and recovery progress",
        ],
        startingPrice: 1800,
        pricingUnit: "shift",
        ctaText: "Explore Nursing Services",
      },
      {
        id: "post-natal-care",
        name: "Post-Natal Care",
        serviceSlug: "post-natal-care",
        situation:
          "Your family has welcomed a newborn, and the mother is recovering while everyone adjusts to feeding, rest, and new responsibilities.",
        problem:
          "Limited support can make everyday newborn care and maternal recovery more demanding.",
        implication:
          "Exhaustion and competing responsibilities can make the early weeks more stressful for the entire family.",
        solution:
          "ApnaCare offers post-natal care assistance with gentle newborn handling, maternal recovery comfort, and everyday practical support. We clearly distinguish non-clinical home assistance from medical lactation or paediatric clinical care.",
        benefits: [
          "Gentle newborn care & soothing assistance",
          "Support for maternal physical rest & recuperation",
          "Nutritious meal & warm water hydration assistance",
          "Calm fourth-trimester guidance for first-time parents",
        ],
        startingPrice: 1600,
        pricingUnit: "day",
        ctaText: "Explore Post-Natal Care",
      },
    ],
    featuredServices: ["elderly-care", "hospital-attendants", "nursing-services", "post-natal-care"],
    stat: { value: "1,200+", label: "Urban families actively supported" },
    quote: {
      text: "As a product director managing long work hours, having an ApnaCare attendant for my mother during her hip surgery recovery was an immense relief. The daily WhatsApp updates gave us peace of mind every single afternoon.",
      author: "Rahul Sunder",
      role: "Product Director",
      city: "Chennai",
    },
    faqs: [
      {
        q: "How do I get updates on my family member while I am at work?",
        a: "Attendants record scheduled observations on meals, hydration, and general comfort. Our care coordinators share updates via WhatsApp at agreed intervals during the shift.",
      },
      {
        q: "What is the difference between an attendant and a qualified nurse?",
        a: "Attendants provide non-clinical support (companionship, bathing, mobility, pre-packaged oral medicine reminders). Registered nurses (GNM/B.Sc) perform clinical procedures like wound dressing, IV injections, and catheter care under doctor prescription.",
      },
      {
        q: "Can attendants handle night shifts or live-in arrangements?",
        a: "Yes. Depending on your family's needs, we arrange daytime (8-12 hr) shifts, overnight bedside care, or 24-hour live-in support across active service clusters.",
      },
    ],
  },
  {
    slug: "families-elderly",
    name: "Ageing Parents & Families",
    badge: "Dignified Senior Living",
    subtitle:
      "Compassionate daily living support, companionship, and mobility assistance that preserves senior autonomy and family peace of mind.",
    summary:
      "Helping older family members live safely and comfortably in their own homes. Our attendants provide respectful companionship, assistance with personal care routines, and walking support while honoring each elder's personal dignity and independence.",
    painPoints: [
      {
        problem: "Fear of falls and mobility accidents when seniors walk unassisted",
        solution:
          "Trained attendants assist with walking, bathroom transfers, and posture support, reducing domestic fall risks.",
      },
      {
        problem: "Social isolation and loneliness when children are at work or living away",
        solution:
          "Respectful companionship, patient conversation in the senior's native language, and accompaniment for safe garden walks.",
      },
      {
        problem: "Irregular meals and missed medication schedules",
        solution:
          "Attendants ensure timely reminders for prescribed medications and assist with warm, nutritious meals.",
      },
    ],
    featuredServices: ["elderly-care", "home-personal-care", "lifestyle-support"],
    stat: { value: "800+", label: "Elders supported with dignified daily care" },
    quote: {
      text: "My mother felt hesitant about having outside help at first. But her attendant spoke fluent Tamil, listened to her stories, and treated her like family. It has brought back her confidence.",
      author: "Lakshmi Narayanan",
      role: "Daughter & Teacher",
      city: "Bengaluru",
    },
    faqs: [
      {
        q: "Can we request an attendant who speaks our parent's mother tongue?",
        a: "Yes. During requirement matching, we prioritize language compatibility (Tamil, Kannada, Telugu, Hindi, English) so seniors feel entirely at home.",
      },
      {
        q: "Do your attendants assist with doctor appointments and clinic visits?",
        a: "Yes. Our attendants can accompany seniors to routine doctor consultations, diagnostics, or neighbourhood visits.",
      },
    ],
  },
  {
    slug: "post-hospitalization",
    name: "Post-Hospital Recovery",
    badge: "Recovery & Bedside Continuity",
    subtitle:
      "Seamless bedside care and home recovery assistance to protect patient comfort and help families transition smoothly after discharge.",
    summary:
      "Returning home from a hospital stay or surgical procedure requires attentive care. ApnaCare provides trained bedside attendants and qualified clinical nurses to assist during the critical first weeks of recuperation.",
    painPoints: [
      {
        problem: "Uncertainty about safe transfers between bed, chair, and bathroom at home",
        solution:
          "Attendants trained in gentle patient transfer techniques safeguard mobility without straining surgical incisions.",
      },
      {
        problem: "Managing complex medication lists and clinical wound care prescriptions",
        solution:
          "Registered nurses handle prescribed sterile dressings and injections; attendants assist with general comfort and schedule tracking.",
      },
      {
        problem: "Family physical exhaustion from round-the-clock recovery vigils",
        solution:
          "Flexible shift options (daytime, overnight, or 24-hr live-in) ensure the patient is continuously supported while family members rest.",
      },
    ],
    featuredServices: ["hospital-attendants", "nursing-services", "elderly-care"],
    stat: { value: "99.1%", label: "Safe post-discharge transition satisfaction" },
    quote: {
      text: "When my father was discharged after hip surgery, having a trained bedside attendant at home made the whole difference. We avoided any slips and the hospital handover was completely smooth.",
      author: "Venkatesh Rao",
      role: "Son",
      city: "Hyderabad",
    },
    faqs: [
      {
        q: "How early should we book care before hospital discharge?",
        a: "We recommend booking 24 to 48 hours before the expected discharge date so your dedicated coordinator can finalize caregiver matching and shift schedules.",
      },
      {
        q: "Can the same attendant continue care from hospital ward to home?",
        a: "Yes, subject to hospital attendant permissions and location continuity within the same city.",
      },
    ],
  },
  {
    slug: "new-mothers",
    name: "New Mothers & Families",
    badge: "Fourth Trimester Support",
    subtitle:
      "Gentle maternal recuperation, newborn care assistance, and restorative support during the critical early weeks after childbirth.",
    summary:
      "Welcoming a newborn is a transformative journey, but maternal recovery requires dedicated hands. Our experienced post-natal attendants assist with newborn handling, soothing, and practical everyday support so mothers can achieve crucial rest.",
    painPoints: [
      {
        problem: "Severe maternal sleep deprivation slowing physical recovery",
        solution:
          "Attendants assist with burping, diapering, and infant soothing between feeds so the mother can experience uninterrupted sleep cycles.",
      },
      {
        problem: "Incision discomfort and limited physical mobility after delivery",
        solution:
          "Comfort assistance, warm hydration, and nutritious traditional meal coordination to support physical recovery.",
      },
      {
        problem: "Anxiety for first-time parents managing daily infant hygiene",
        solution:
          "Experienced attendants assist with gentle newborn sponge baths, hygienic cord-area care, and soothing techniques.",
      },
    ],
    featuredServices: ["post-natal-care", "home-personal-care"],
    stat: { value: "350+", label: "New mothers supported with gentle recovery" },
    quote: {
      text: "Recovering from a C-section while caring for a newborn was exhausting. Having an experienced post-natal attendant gave me the rest I needed to heal properly.",
      author: "Ananya Sharma",
      role: "New Mother",
      city: "Bengaluru",
    },
    faqs: [
      {
        q: "Does the attendant provide medical lactation consultations?",
        a: "No. Our post-natal attendants provide everyday non-clinical comfort support. For clinical lactation issues or medical infant complications, we always recommend consulting your paediatrician or IBCLC specialist.",
      },
      {
        q: "What is the typical duration for post-natal attendant support?",
        a: "Families typically arrange support for 15, 30, or 45 days during the early recovery period, on 10-hour day shifts or 24-hour live-in arrangements.",
      },
    ],
  },
  {
    slug: "women-caregivers",
    name: "Women Balancing Caregiving",
    badge: "Shared Responsibility & Rest",
    subtitle:
      "Practical care support for women managing careers, household responsibilities, and family care without having to carry everything alone.",
    summary:
      "Women frequently shoulder the unspoken mental and physical weight of family caregiving. ApnaCare provides reliable, verified in-home support that enables families to share the caregiving responsibility equitably and protect personal well-being.",
    painPoints: [
      {
        problem: "Physical and emotional burnout from managing work and dual caregiving roles",
        solution:
          "Dependable daytime attendants take on everyday elder assistance and home routines, freeing up crucial hours for rest and career focus.",
      },
      {
        problem: "Difficulty finding verified, respectful caregivers you can trust in your home",
        solution:
          "100% biometric Aadhaar verification, police background screening, and reference checks for every attendant dispatched.",
      },
      {
        problem: "Guilt when stepping away from eldercare responsibilities for personal commitments",
        solution:
          "Compassionate, respectful caregivers who treat elders with genuine warmth, ensuring your family is in loving and competent hands.",
      },
    ],
    featuredServices: ["elderly-care", "home-personal-care", "lifestyle-support"],
    stat: { value: "100%", label: "Biometric & police verified caregivers" },
    quote: {
      text: "Between my managerial role and looking after my mother-in-law, I was heading straight for burnout. Bringing in ApnaCare was the best decision for our whole family.",
      author: "Deepa Menon",
      role: "Marketing Director",
      city: "Bengaluru",
    },
    faqs: [
      {
        q: "Can I adjust care shifts if my work schedule changes weekly?",
        a: "Yes. Simply notify your dedicated care coordinator via WhatsApp to modify scheduled hours or plan coverage around travel.",
      },
    ],
  },
  {
    slug: "community-initiatives",
    name: "Community & Family Initiatives",
    badge: "Future Initiatives & Knowledge",
    subtitle:
      "Educational guidance, child safety resources, and forthcoming community partnerships supporting family well-being.",
    summary:
      "ApnaCare's active commercial services are focused on eldercare, hospital assistance, clinical nursing, post-natal recovery, and women mobility. As part of our social mission, we share educational safety resources and explore future community initiatives for broader family support.",
    painPoints: [
      {
        problem: "Understanding safe domestic environments for growing children",
        solution:
          "Free educational guides in our Knowledge Hub on home child-proofing, emergency contacts, and family safety planning.",
      },
      {
        problem: "Availability of specialized child or paediatric services",
        solution:
          "ApnaCare does NOT offer commercial childcare or education services. We provide transparent educational resources and collaborate with community healthcare partners.",
      },
    ],
    featuredServices: ["home-personal-care", "travel-assistance"],
    stat: { value: "6+", label: "Educational family guidance guides published" },
    quote: {
      text: "We appreciate ApnaCare's honesty in focusing on what they genuinely do best in adult care and nursing, while offering helpful educational resources for wider family safety.",
      author: "Advisory Board",
      role: "Community Health Initiative",
      city: "Bengaluru",
    },
    faqs: [
      {
        q: "Does ApnaCare provide commercial childcare, day-care, or tutoring services?",
        a: "No. ApnaCare does not provide commercial childcare, education, or nutrition services. Any forthcoming child wellness collaborations will be clearly announced as distinct community initiatives.",
      },
      {
        q: "Where can I find family safety and first-aid guides?",
        a: "Visit our Knowledge Hub for verified articles on eldercare coordination, home safety checklists, and government healthcare schemes.",
      },
    ],
  },
  {
    slug: "women-commuters",
    name: "Women Commuters",
    badge: "Solo Transit & Night Safety",
    subtitle:
      "Dependable, police-verified women drivers and transit companions for stress-free commutes, late shifts, and airport transit.",
    summary:
      "Whether traveling home from late-night tech park shifts, arriving at railway stations past midnight, or heading to the airport at 4 AM, our verified women drivers and transit companions ensure zero anxiety and complete peace of mind.",
    painPoints: [
      {
        problem: "Unpredictable late-night rides with unverified drivers and surge pricing",
        solution:
          "100% police-verified female chauffeuses with commercial badges, live GPS trip links, and 24/7 command center tracking.",
      },
      {
        problem: "Anxiety during solo airport arrivals or railway transits in unfamiliar cities",
        solution:
          "A trusted woman companion meets you at the arrival gate or platform with a placard, manages luggage, and escorts you safely to your doorstep.",
      },
      {
        problem: "Surge pricing and sudden driver cancellations during emergency commutes",
        solution:
          "Fixed, pre-booked transparent rates with verified backup dispatch.",
      },
    ],
    featuredServices: ["women-drivers", "airport-pickup", "travel-assistance"],
    stat: { value: "10,000+", label: "Safe night commutes & transits completed" },
    quote: {
      text: "Booking an ApnaCare woman driver for my 11 PM tech park commute changed my routine completely. Knowing there is a verified professional driver with real-time GPS sharing took all the fear out of late shifts.",
      author: "Pooja Hegde",
      role: "Senior Software Engineer",
      city: "Bengaluru",
    },
    faqs: [
      {
        q: "Can I book a woman driver on a recurring daily or monthly subscription?",
        a: "Yes! We offer single-trip bookings, full-day packages, and customized recurring weekly or monthly office commute schedules.",
      },
      {
        q: "Does the driver use our personal vehicle or provide one?",
        a: "Our verified chauffeuses can drive your personal car (automatic or manual transmission), or we can coordinate vehicle packages through our mobility partners.",
      },
    ],
  },
  {
    slug: "safety-partners",
    name: "Safety-Focused Partners",
    badge: "Enterprise & Institutional Trust",
    subtitle:
      "Vetted women security escorts, hospital bedside coordination, and workplace mobility programs for institutions that prioritize women's safety.",
    summary:
      "Designed for corporates ensuring late-shift employee transport compliance, healthcare facilities seeking trusted patient companions, and community institutions needing screened women attendants.",
    painPoints: [
      {
        problem: "Corporate compliance for night-shift women employees (POSH & State Transport Mandates)",
        solution:
          "Vetted security escorts and licensed chauffeuses with digital logs, GPS trip feeds, and command room panic integrations.",
      },
      {
        problem: "Hospitals experiencing nursing shortages for continuous non-clinical bedside vigilance",
        solution:
          "Hospital-certified women attendants manage inpatient non-clinical care, freeing medical staff to focus on clinical procedures.",
      },
      {
        problem: "Events, conferences, and exhibitions requiring high-trust female security and marshals",
        solution:
          "Trained, PSARA-compliant female security personnel for access control, VIP escorts, and event safety management.",
      },
    ],
    featuredServices: ["women-drivers", "hospital-attendants", "travel-assistance"],
    stat: { value: "100%", label: "Police & biometric compliance clearance" },
    quote: {
      text: "ApnaCare helped us establish a completely safe late-night transit escort protocol for our hospital's nursing and lab staff. Their background checks and telemetry tracking set the benchmark for employee safety.",
      author: "Dr. Meenakshi Sundaram",
      role: "Head of Hospital Operations",
      city: "Hyderabad",
    },
    faqs: [
      {
        q: "Can ApnaCare provide customized institutional contracts and GST invoicing?",
        a: "Yes, we provide corporate MSAs, monthly consolidated GST billing, dedicated account managers, and custom SLA agreements.",
      },
      {
        q: "What certifications do your security and transit escorts possess?",
        a: "All personnel undergo state police clearance, biometric verification, Basic Life Support (BLS) and first aid certification, and conflict de-escalation training.",
      },
    ],
  },
];

export const getICP = (slug: string) => ICPS.find((item) => item.slug === slug);

// ─── Homepage Audience Problem Discovery Data ───────────────────────────────

export interface AudienceChallenge {
  id: string;
  audience: string;
  badge: string;
  situation: string;
  difficulty: string;
  whyItMatters: string;
  relevantServiceSlug: string | null;
  serviceName: string;
  ctaText: string;
  ctaLink: string;
  isFutureInitiative?: boolean;
}

export const AUDIENCE_CHALLENGES: AudienceChallenge[] = [
  {
    id: "working-professionals",
    audience: "Working Professionals Caring for Ageing Parents",
    badge: "Career & Family Balance",
    situation: "Balancing demanding work deadlines, long commutes, or travel while your ageing parents live alone at home.",
    difficulty: "Anxiety over unattended slips, missed meals, unmonitored medication times, and delayed communication during working hours.",
    whyItMatters: "Constant distraction impacts professional focus, while parents risk progressive isolation or unassisted accidents at home.",
    relevantServiceSlug: "elderly-care",
    serviceName: "Elderly Care",
    ctaText: "Explore Elderly Care Options",
    ctaLink: "/solutions/urban-professionals",
  },
  {
    id: "elderly-independence",
    audience: "Elderly People Needing Daily Living Support",
    badge: "Dignified Senior Living",
    situation: "Desiring to continue living in your cherished home despite slowing mobility, stiff joints, or recovery from illness.",
    difficulty: "Routine tasks such as safe bathing, walking to the porch, preparing meals, or remembering tablets become tiring hurdles.",
    whyItMatters: "Preserving personal dignity, daily autonomy, and warm companionship without feeling like a burden to your children.",
    relevantServiceSlug: "elderly-care",
    serviceName: "Home & Personal Care",
    ctaText: "Explore Senior Support",
    ctaLink: "/solutions/families-elderly",
  },
  {
    id: "post-hospital",
    audience: "Families Supporting a Loved One After Hospitalisation",
    badge: "Recovery & Continuity",
    situation: "Bringing a family member home following surgery, orthopedic intervention, or extended medical treatment.",
    difficulty: "Managing safe bed-to-chair transfers, fall risks in slippery bathrooms, and continuous bedside vigilance without exhausting the family.",
    whyItMatters: "The first two weeks post-discharge are critical to prevent accidental falls and unplanned hospital readmissions.",
    relevantServiceSlug: "hospital-attendants",
    serviceName: "Hospital & Bedside Assistance",
    ctaText: "Explore Bedside Care",
    ctaLink: "/solutions/post-hospitalization",
  },
  {
    id: "new-mothers",
    audience: "New Mothers & Families Caring for Newborns",
    badge: "Maternal Recuperation",
    situation: "Navigating the fourth trimester while recovering from delivery, coping with sleepless nights, and healing physically.",
    difficulty: "Overwhelming physical exhaustion, wound healing, round-the-clock feeding cycles, and practical household strain.",
    whyItMatters: "Restorative sleep and gentle maternal support protect maternal mental health, healing, and bonding with the baby.",
    relevantServiceSlug: "post-natal-care",
    serviceName: "Post-Natal Care",
    ctaText: "Explore Post-Natal Support",
    ctaLink: "/solutions/new-mothers",
  },
  {
    id: "nursing-support",
    audience: "Families Seeking Qualified Nursing Support at Home",
    badge: "Clinical Home Care",
    situation: "A loved one requires professional clinical procedures at home under an active physician's prescription.",
    difficulty: "Family members cannot safely administer IV infusions, sterile wound dressings, injections, or catheter maintenance.",
    whyItMatters: "Clinical precision, sterile technique, and qualified nurse monitoring prevent severe infections and ensure recovery progress.",
    relevantServiceSlug: "nursing-services",
    serviceName: "Qualified Home Nursing",
    ctaText: "Explore Nursing Services",
    ctaLink: "/services/nursing-services",
  },
  {
    id: "women-caregivers",
    audience: "Women Balancing Careers, Caregiving & Family",
    badge: "Shared Caregiving",
    situation: "Carrying the unspoken mental and physical load of household coordination, elder wellness, and career responsibilities.",
    difficulty: "Severe time poverty, chronic exhaustion, guilt when taking personal time, and lack of trusted help at home.",
    whyItMatters: "Reliable, vetted caregiving assistance restores personal autonomy, rest, and balance for women caregivers.",
    relevantServiceSlug: "home-personal-care",
    serviceName: "Personal & Home Care",
    ctaText: "Explore Caregiver Support",
    ctaLink: "/solutions/women-caregivers",
  },
  {
    id: "child-family-support",
    audience: "Parents Seeking Family Support & Child Safety Guidance",
    badge: "Educational Guidance · Future Initiative",
    situation: "Parents looking for trusted guidance on child home safety, emergency preparedness, and family wellness routines.",
    difficulty: "Finding verified, non-commercial child safety information and reliable family support ecosystems.",
    whyItMatters: "ApnaCare focuses on adult care, eldercare, and maternal recovery. We provide free educational safety resources while community initiatives develop.",
    relevantServiceSlug: null,
    serviceName: "Educational Community Hub",
    ctaText: "Browse Educational Guides",
    ctaLink: "/solutions/community-initiatives",
    isFutureInitiative: true,
  },
];

// ─── Real-Life Illustrative Family Scenarios ────────────────────────────────

export interface RealLifeStory {
  id: string;
  title: string;
  persona: string;
  tag: string;
  situation: string;
  difficulty: string;
  implication: string;
  solution: string;
  relatedServiceSlug: string;
  relatedServiceName: string;
  ctaLink: string;
}

export const REAL_LIFE_STORIES: RealLifeStory[] = [
  {
    id: "story-tech-professional",
    title: "The 2 PM Worry: Supporting an Ageing Father Across Town",
    persona: "Karthik, 36 · Senior Software Engineer, Bengaluru",
    tag: "Elderly Independence & Coordination",
    situation: "Karthik manages long workdays at an IT corridor office while his 78-year-old father, who has mild arthritis and unsteady balance, lives across the city.",
    difficulty: "Why this becomes difficult: A missed phone call at 2 PM causes instant dread of a bathroom slip or missed lunch, but Karthik cannot leave his workstation in the middle of office deliverables.",
    implication: "What can happen without support: Unmonitored days lead to irregular meals, missed blood pressure medications, progressive loneliness, and severe anxiety for the working son.",
    solution: "How ApnaCare helps: A verified woman eldercare attendant arrives by 9 AM, prepares warm meals, assists with mobility exercises, and sends an agreed midday WhatsApp update confirming vitals and meals.",
    relatedServiceSlug: "elderly-care",
    relatedServiceName: "Elderly Care",
    ctaLink: "/services/elderly-care",
  },
  {
    id: "story-hospital-bedside",
    title: "The Hospital Shift: When One Person Cannot Do It All",
    persona: "Sunita & Arvind · Working Siblings, Chennai",
    tag: "Post-Surgical Hospital Assistance",
    situation: "Their 72-year-old mother underwent emergency orthopedic surgery at a central hospital, requiring continuous non-clinical bedside vigilance.",
    difficulty: "Why this becomes difficult: Both siblings have demanding jobs and children at home; coordinating 24-hour hospital bedside shifts between them was leading to physical exhaustion.",
    implication: "What can happen without support: An unattended patient may attempt to reach the washroom unassisted, risking a fresh surgical site injury, while the family suffers severe sleep deprivation.",
    solution: "How ApnaCare helps: A trained bedside attendant takes over the daytime and overnight bedside vigils, assisting with hygiene, sipping water, and calling nurses, while sharing shift handover notes with the family.",
    relatedServiceSlug: "hospital-attendants",
    relatedServiceName: "Hospital Bedside Care",
    ctaLink: "/services/hospital-attendants",
  },
  {
    id: "story-fourth-trimester",
    title: "The Fourth Trimester: Healing While Caring for a Newborn",
    persona: "Priyanka, 29 · First-Time Mother, Hyderabad",
    tag: "Post-Natal Maternal Recovery",
    situation: "Priyanka returned home following a Caesarean delivery with her first child, while her spouse had to return to work after 10 days of leave.",
    difficulty: "Why this becomes difficult: Incision pain made lifting and soothing the baby agonizing, and severe sleep deprivation triggered deep emotional and physical exhaustion.",
    implication: "What can happen without support: Inadequate maternal rest slows tissue recovery, compounds postpartum stress, and turns a joyful family milestone into an overwhelming struggle.",
    solution: "How ApnaCare helps: A dedicated post-natal attendant assists with newborn soothing, gentle infant sponge baths, and practical comfort care, allowing Priyanka to achieve 3-hour unbroken sleep blocks to heal.",
    relatedServiceSlug: "post-natal-care",
    relatedServiceName: "Post-Natal Care",
    ctaLink: "/services/post-natal-care",
  },
  {
    id: "story-surgery-discharge",
    title: "Bringing Father Home: Safe Transition After Hip Replacement",
    persona: "Ramesh, 42 · Financial Analyst, Coimbatore",
    tag: "Post-Discharge Rehabilitation",
    situation: "His 74-year-old father was cleared for discharge after hip replacement surgery, but could not safely navigate the bedroom or bathroom without two-person support.",
    difficulty: "Why this becomes difficult: The family home has standard tile flooring, low seating, and bathroom steps; family members were terrified of causing a hip dislocation during transfers.",
    implication: "What can happen without support: Secondary falls during home recovery are the leading cause of emergency orthopedic readmissions within 30 days of discharge.",
    solution: "How ApnaCare helps: ApnaCare arranged a patient-transfer trained attendant to assist with walking frame guidance and personal hygiene, ensuring strict adherence to the surgeon's movement protocol.",
    relatedServiceSlug: "hospital-attendants",
    relatedServiceName: "Bedside & Recovery Care",
    ctaLink: "/services/hospital-attendants",
  },
  {
    id: "story-daughter-caregiver",
    title: "Balancing Two Homes: Protecting Eldercare Without Burnout",
    persona: "Meera, 40 · School Vice-Principal, Bengaluru",
    tag: "Shared Caregiving & Personal Dignity",
    situation: "Meera was splitting evenings and weekends between managing her own teenagers and visiting her widowed mother to prepare meals and check medicines.",
    difficulty: "Why this becomes difficult: Constantly rushing between two homes left Meera chronically exhausted and feeling guilty that she wasn't doing enough for either household.",
    implication: "What can happen without support: Caregiver burnout strains marital relationships, harms mental well-being, and turns visits to an ageing parent into rushed transactional chores.",
    solution: "How ApnaCare helps: Dependable daytime home care gives her mother warm, respectful company and wholesome daily routines, transforming Meera's evening visits into relaxed, loving family time.",
    relatedServiceSlug: "elderly-care",
    relatedServiceName: "Elderly Care",
    ctaLink: "/services/elderly-care",
  },
];

// ─── Trust & Safety Standards ───────────────────────────────────────────────

export const TRUST_VERIFICATION_STANDARDS = [
  {
    title: "Biometric & Identity Verification",
    badge: "100% Verified Identity",
    desc: "Every attendant's identity is authenticated through direct Aadhaar biometric matching and permanent residential address validation before assignment.",
  },
  {
    title: "Police & Judicial Background Checks",
    badge: "Law Enforcement Screened",
    desc: "Formal police verification records and judicial database screenings are conducted to ensure zero past criminal convictions or adverse records.",
  },
  {
    title: "Clear Attendant vs Nursing Scope",
    badge: "Defined Clinical Boundaries",
    desc: "Attendants provide compassionate, non-clinical daily living support. Clinical medical tasks (injections, catheter, wound dressing) are strictly handled by registered GNM/B.Sc nurses under valid doctor prescriptions.",
  },
  {
    title: "Caregiver Selection & Skills Assessment",
    badge: "Practical Care Competence",
    desc: "Every caregiver completes practical patient-handling assessments, geriatric sensitivity training, infant hygiene standards, and emergency communication protocols.",
  },
  {
    title: "Transparent Family Communication",
    badge: "Daily Peace of Mind",
    desc: "Scheduled shift observations and check-ins are shared via WhatsApp, ensuring working family members have visibility into daily care routines.",
  },
  {
    title: "Reliable Continuity & Escalation",
    badge: "Support You Can Count On",
    desc: "If an assigned attendant is unwell, our care coordination team works promptly to arrange a verified replacement with matched language and care skills.",
  },
];

// ─── 5-Step Customer Journey ────────────────────────────────────────────────

export const CARE_JOURNEY_STEPS = [
  {
    step: "01",
    title: "Tell Us About Your Care Needs",
    desc: "Share your family member's daily routine, mobility status, preferred shift timings, and language comfort through our simple online form or WhatsApp.",
  },
  {
    step: "02",
    title: "Get Guidance on the Right Service",
    desc: "A dedicated care coordinator reviews your requirements, clarifies non-clinical vs clinical needs, and recommends the appropriate service.",
  },
  {
    step: "03",
    title: "Discuss Arrangements & Availability",
    desc: "Review transparent shift pricing, discuss caregiver profiles, and confirm start dates with zero hidden charges or unexpected dispatcher fees.",
  },
  {
    step: "04",
    title: "Arrange Care & Receive Details",
    desc: "Receive the verified digital profile, photo ID confirmation, and clear service details before your caregiver's first scheduled shift.",
  },
  {
    step: "05",
    title: "Stay Connected with Your Care Team",
    desc: "Receive scheduled daily WhatsApp updates on meals, comfort, and routines, with a responsive care desk available whenever adjustments are needed.",
  },
];


