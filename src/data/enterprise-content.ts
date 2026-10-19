// Enterprise Content Strategy, Copy Library, and SEO/GEO/AEO Schemas for ApnaCare.
// All business information is strictly aligned with confirmed operational facts.

import { SITE, SERVICES, formatINR } from "./site";

export interface CopyLengthVariants {
  short: string;
  medium: string;
  long: string;
}

export interface SpinFramework {
  situation: string;
  problem: string;
  implication: string;
  solution: string;
  benefit: string;
  nextStep: string;
}

export interface EnterpriseServiceContent {
  id: string;
  slug: string;
  name: string;
  eyebrow: string;
  headline: CopyLengthVariants;
  summary: CopyLengthVariants;
  spin: SpinFramework;
  whoFor: string[];
  inclusions: string[];
  exclusions: string[];
  nurseVsAttendantScope: {
    attendantScope: string[];
    nurseScope: string[];
    whenToChooseNurse: string;
  };
  startingPrice: number;
  pricingUnit: string;
  safetyPillars: string[];
  faqs: Array<{ q: string; aDirect: string; aDetailed: string }>;
  seo: {
    title: string;
    description: string;
    primaryKeyword: string;
    secondaryKeywords: string[];
    searchIntent: "transactional" | "informational" | "commercial";
    canonical: string;
  };
  ctas: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
}

export interface EnterpriseAudienceContent {
  id: string;
  slug: string;
  name: string;
  badge: string;
  headline: CopyLengthVariants;
  narrative: CopyLengthVariants;
  spin: SpinFramework;
  primaryServiceSlug: string;
  featuredServices: string[];
  keyChallenges: string[];
  apnaCareSolutions: string[];
  seo: {
    title: string;
    description: string;
    primaryKeyword: string;
    secondaryKeywords: string[];
  };
  cta: { label: string; href: string };
}

export interface EducationalAssetPlan {
  id: string;
  type: "blog" | "case_study" | "whitepaper" | "guide";
  title: string;
  targetAudience: string;
  searchIntent: string;
  summary: string;
  keyTakeaways: string[];
  readTime: string;
  publicationStatus: "published" | "content_plan";
  verificationStatus: "verified_factual" | "illustrative_scenario";
  slug?: string;
}

export interface ContextualCta {
  id: string;
  context: string;
  primaryLabel: string;
  primaryRoute: string;
  secondaryLabel?: string;
  secondaryRoute?: string;
  supportingNote?: string;
}

/* ─────────────────────────────────────────────────────────────────────────────
   1. BRAND MESSAGING & PURPOSE (3 Copy Lengths)
───────────────────────────────────────────────────────────────────────────── */
export const BRAND_MESSAGING = {
  coreHeadline: {
    short: "Care for Them. Peace of Mind for You.",
    medium: "Care for Them. Peace of Mind for You. Dependable, verified support for your loved ones at home and hospital.",
    long: "Care for Them. Peace of Mind for You. Connecting families across South India with compassionate, police-verified women attendants for elderly companionship, hospital bedside vigil, clinical nursing, and post-natal care.",
  },
  subSupporting: {
    short: "Trusted care and support for your loved ones, at home and when it matters most.",
    medium: "Trusted care and support for your loved ones across Bengaluru, Chennai, Hyderabad, and Coimbatore. 100% police-verified women attendants with guaranteed 90-minute backup.",
    long: "Whether you are caring for ageing parents, assisting a patient after hospital discharge, or welcoming a newborn, ApnaCare delivers empathetic, certified women attendants backed by continuous care coordinator supervision and transparent invoicing.",
  },
  aboutUs: {
    short: "ApnaCare provides vetted, compassionate women attendants for home healthcare, senior living, and hospital bedside assistance across South India.",
    medium: "ApnaCare was established to bridge the trust gap in domestic healthcare. We pair rigorously screened, trained women attendants with families who need dependable care for senior parents, recovering hospital patients, and new mothers, backed by 24/7 care desk oversight.",
    long: "ApnaCare operates on a simple principle: every family deserves verified, dignified care when bringing an attendant into their home, and every care worker deserves respect, fair wages, and institutional backing. With 8+ years of dedicated coordination, ApnaCare has supported over 1,200+ families across Bengaluru, Chennai, Hyderabad, and Coimbatore with 100% police verification, certified patient ergonomics training, transparent 18% GST invoices, and a guaranteed 90-minute emergency backup protocol.",
  },
  mission: {
    short: "To provide dignified, compassionate care for families while championing safe, respectable careers for women caregivers.",
    medium: "Our mission is twofold: to deliver uncompromising safety, medical competence, and emotional reassurance to families, while creating sustainable, formal healthcare careers with fair compensation and insurance for women attendants.",
    long: "Our mission is to establish India's most dependable and humane caregiving ecosystem. We eliminate the uncertainty, informal exploitation, and trust deficit of unorganized domestic agencies by instituting strict 5-stage background checks, clinical training partnerships, guaranteed backup continuity, and direct coordinator accountability for every family we serve.",
  },
  vision: {
    short: "A society where every vulnerable family member is cared for with dignity, and every caregiver is valued and empowered.",
    medium: "We envision a future where accessing trustworthy eldercare, hospital assistance, and maternal support is effortless, transparent, and respectful for families and caregivers alike.",
    long: "We envision a comprehensive community healthcare network spanning Indian metropolitan and tier-two cities, where professional women attendants form the trusted backbone of home healthcare—ensuring no senior feels isolated, no hospital patient is left unattended, and no working daughter or son has to navigate caregiving stress alone.",
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   2. CORE SERVICES ENTERPRISE CONTENT (3 Copy Lengths & SPIN Framework)
───────────────────────────────────────────────────────────────────────────── */
export const ENTERPRISE_SERVICES: Record<string, EnterpriseServiceContent> = {
  "elderly-care": {
    id: "elderly-care",
    slug: "elderly-care",
    name: "Elderly Care",
    eyebrow: "Senior Companionship & Dignity",
    headline: {
      short: "Support for the people who cared for you.",
      medium: "Compassionate, 24/7 or day-shift elderly care for parents living at home.",
      long: "Dignified, certified elderly care: warm daily companionship, mobility assistance, medication routines, and live family wellness updates.",
    },
    summary: {
      short: "Compassionate daily companionship, medication reminders, and mobility support for elders.",
      medium: "Dedicated women attendants with geriatric care certification helping senior citizens maintain dignity, active routines, and safety in their own homes.",
      long: "Ageing at home should be comfortable, safe, and dignified. Our geriatric-trained women attendants provide personal hygiene support, assisted walking, prescription medication reminders, and meaningful companionship, giving remote or busy families continuous reassurance through daily digital logs.",
    },
    spin: {
      situation: "Ageing parents living independently or alone while adult children manage demanding careers, long commutes, or reside in another city.",
      problem: "Declining mobility, risk of domestic slips or falls, irregular medication schedules, and feelings of loneliness and isolation.",
      implication: "Constant anxiety for working children, potential missed doses causing medical emergencies, and loss of independence for elders.",
      solution: "A dedicated, police-verified woman attendant matched to the senior's language, temperament, and specific daily routine.",
      benefit: "Seniors retain dignity and comfort in their familiar home environment; families enjoy total peace of mind with daily WhatsApp logs and emergency backup.",
      nextStep: "Choose between Day Shifts (8-12 hours) or 24-Hour Live-in Care, and review verified attendant profiles before confirmation.",
    },
    whoFor: [
      "Seniors living alone or while family members are at workplace",
      "Elders with early dementia, Parkinson's, or arthritis requiring patient assistance",
      "Senior citizens recovering from fractures, joint replacements, or illnesses",
    ],
    inclusions: [
      "Bathing, gentle sponge baths, grooming, and personal hygiene assistance",
      "Mobility assistance, gentle walking accompaniment, and fall prevention vigil",
      "Physician-prescribed medication reminders and hydration logging",
      "Nutritious meal accompaniment and warm conversational companionship",
      "Daily digital wellness logs and scheduled WhatsApp updates to family",
    ],
    exclusions: [
      "Clinical procedures (IV lines, catheters, surgical dressings require a Registered Nurse)",
      "Heavy domestic housekeeping or cooking for non-patient family members",
      "Administering unprescribed or over-the-counter medicines without family confirmation",
    ],
    nurseVsAttendantScope: {
      attendantScope: [
        "Personal hygiene, bathing, and grooming",
        "Assisted walking and wheelchair transfers",
        "Routine oral medication reminders",
        "Vital signs logging (Blood Pressure, SpO2, pulse, temperature)",
      ],
      nurseScope: [
        "Sterile surgical wound dressings and bed sore care",
        "Intravenous (IV) cannulation and infusions",
        "Ryle's tube and urinary catheterization management",
        "Tracheostomy care and clinical suctioning",
      ],
      whenToChooseNurse: "If your loved one has open surgical wounds, requires injectable medications, or is on medical tubes/drains, book Nursing Services rather than a general attendant.",
    },
    startingPrice: 1299,
    pricingUnit: "day",
    safetyPillars: [
      "Biometric Aadhaar & criminal background check completed",
      "Geriatric empathy & patient transfer certification",
      "Guaranteed 90-minute replacement dispatch on emergency absence",
    ],
    faqs: [
      {
        q: "What hours are available for elderly care?",
        aDirect: "ApnaCare offers 8-hour day shifts, 12-hour day/night shifts, and continuous 24-hour live-in care across Bengaluru, Chennai, Hyderabad, and Coimbatore.",
        aDetailed: "You can customize shift hours based on your family's routine. 24-hour live-in attendants require a clean sleeping space and standard meals, while day-shift attendants commute directly to your home.",
      },
      {
        q: "Can we request an attendant who speaks our native language?",
        aDirect: "Yes. We actively match attendants fluent in Tamil, Kannada, Telugu, Hindi, or English based on your senior's preferred mother tongue.",
        aDetailed: "Language familiarity is essential for elder comfort and emotional reassurance. During booking, simply indicate your language preference and our care coordinator matches fluent attendants.",
      },
    ],
    seo: {
      title: "Elderly Care Services at Home — Verified Women Attendants | ApnaCare",
      description: "Compassionate, police-verified elderly care attendants at home in Bengaluru, Chennai, Hyderabad & Coimbatore. 24/7 companionship, mobility aid & medication reminders.",
      primaryKeyword: "elderly care at home",
      secondaryKeywords: ["senior citizen attendant", "geriatric caregiver home", "home attendant for elderly parents", "elderly care Bengaluru Chennai"],
      searchIntent: "commercial",
      canonical: "https://apna-care.vercel.app/services/elderly-care",
    },
    ctas: {
      primary: { label: "Book Elderly Care", href: "/booking?service=elderly-care" },
      secondary: { label: "Speak with a Coordinator", href: "/contact" },
    },
  },

  "hospital-attendants": {
    id: "hospital-attendants",
    slug: "hospital-attendants",
    name: "Hospital Assistance",
    eyebrow: "Inpatient Bedside Vigil",
    headline: {
      short: "A helping hand when your family needs it.",
      medium: "Dedicated bedside attendants ensuring your family member is never left unattended in hospital.",
      long: "Continuous hospital bedside assistance: 24/7 patient vigil, bathroom accompaniment, staff coordination, and timely family updates.",
    },
    summary: {
      short: "Attentive bedside companionship, mobility aid, and nurse coordination during hospital stays.",
      medium: "Trained hospital attendants who stay by your patient's bedside around the clock, assisting with physical comfort while family members rest.",
      long: "Hospitalizations place acute emotional and physical strain on families. Our verified hospital attendants stay beside your loved one in private or general wards, assisting with call bells, sponge baths, and pharmacy runs while keeping working family members constantly informed.",
    },
    spin: {
      situation: "A loved one admitted to a hospital for surgery or illness, requiring 24/7 bedside presence while family members balance jobs or children.",
      problem: "Busy hospital nursing staff cannot remain stationed at a single patient's bedside continuously; family members experience severe burnout and sleep deprivation.",
      implication: "Risk of unassisted falls when getting out of bed, delayed call-bell response, and exhaustion leading to family distress.",
      solution: "A dedicated ApnaCare bedside attendant stationed right by the bed for 12-hour shifts or continuous 24-hour vigil.",
      benefit: "The patient receives gentle, instant attention for personal needs; families can sleep or attend to responsibilities knowing their loved one is safe.",
      nextStep: "Share the hospital name, ward type, and expected admission dates for instant coordinator assignment.",
    },
    whoFor: [
      "Inpatients recovering from general, orthopedic, cardiac, or abdominal surgery",
      "Senior patients admitted for medical observations prone to disorientation or falls",
      "Families unable to stay overnight in hospital due to work or childcare commitments",
    ],
    inclusions: [
      "Continuous bedside observation and immediate nurse call-bell coordination",
      "Gentle patient repositioning to alleviate pressure points and prevent bedsores",
      "Assistance with sponge baths, oral hygiene, urinal, and bedpan management",
      "Collecting prescribed medicines, diagnostic reports, and linen updates from hospital desks",
      "Real-time comfort and vitals updates shared directly to family WhatsApp group",
    ],
    exclusions: [
      "Administering clinical injections or titrating IV drips (handled by hospital nursing staff)",
      "Overriding or disputing hospital physician and surgeon protocols",
      "Discharging patients against medical advice without verified family consent",
    ],
    nurseVsAttendantScope: {
      attendantScope: [
        "Bedside comfort, water and prescribed meal assistance",
        "Walking accompaniment to hospital restrooms",
        "Immediate alert to duty nurse if patient shows distress",
        "Collecting discharge summaries and pharmacy tokens",
      ],
      nurseScope: [
        "Administering intravenous medications and blood draws",
        "Central line and Foley catheter maintenance",
        "Ventilator and telemetry monitor interpretation",
        "Clinical post-op surgical drain management",
      ],
      whenToChooseNurse: "Inside hospitals, the hospital's registered nursing staff administers clinical medications. An ApnaCare hospital attendant serves as the dedicated personal caregiver and bedside companion.",
    },
    startingPrice: 1499,
    pricingUnit: "day",
    safetyPillars: [
      "Hospital infection control protocol certified",
      "100% police background check cleared",
      "Strict confidentiality of family medical records",
    ],
    faqs: [
      {
        q: "Do hospitals allow private ApnaCare attendants in patient rooms?",
        aDirect: "Yes. Most private hospitals and nursing homes routinely permit designated bedside attendants with standard attendant passes in private and semi-private rooms.",
        aDetailed: "Our attendants carry institutional photo IDs and police clearance proofs, making registration with hospital security and nurse station coordination straightforward.",
      },
      {
        q: "Can the attendant coordinate directly with hospital duty nurses?",
        aDirect: "Yes. Our attendants are trained in hospital communication protocols and promptly alert the duty nurse whenever vitals shift or medications are due.",
        aDetailed: "They act as a bridge between your family and the ward nursing staff, ensuring call bells are not missed and reports are promptly collected.",
      },
    ],
    seo: {
      title: "Hospital Bedside Attendant Services — 24/7 Patient Care | ApnaCare",
      description: "Dedicated hospital bedside attendants in Bengaluru, Chennai, Hyderabad & Coimbatore. Trained women caregivers for post-surgery recovery, hygiene, and nurse coordination.",
      primaryKeyword: "hospital bedside attendant",
      secondaryKeywords: ["patient care attendant hospital", "hospital attendant service", "post-surgery bedside caregiver", "24/7 hospital helper"],
      searchIntent: "transactional",
      canonical: "https://apna-care.vercel.app/services/hospital-attendants",
    },
    ctas: {
      primary: { label: "Book Hospital Assistance", href: "/booking?service=hospital-attendants" },
      secondary: { label: "Inquire on WhatsApp", href: "/contact" },
    },
  },

  "nursing-services": {
    id: "nursing-services",
    slug: "nursing-services",
    name: "Nursing Services",
    eyebrow: "Certified Clinical Home Care",
    headline: {
      short: "Qualified nursing support for eligible care needs.",
      medium: "Registered GNM and B.Sc nurses providing clinical procedures and wound care at home.",
      long: "Certified home nursing: sterile wound dressings, IV infusions, injections, catheter care, and doctor prescription compliance.",
    },
    summary: {
      short: "Qualified female nurses for sterile dressings, injections, vitals, and surgical recovery at home.",
      medium: "Registered nurses with State Nursing Council credentials providing clinical-grade care in the comfort and privacy of home.",
      long: "Clinical healing at home requires rigorous hygiene and professional competence. Our certified GNM and B.Sc nurses administer prescribed injections, maintain catheters and feeding tubes, care for post-operative incisions, and monitor vital trends under your treating doctor's instructions.",
    },
    spin: {
      situation: "A patient discharged from the hospital requiring complex clinical procedures like sterile dressings, IV medications, or catheter maintenance at home.",
      problem: "Families lack medical training to safely dress surgical wounds or administer injections; traveling to clinics every day is painful and risks secondary infections.",
      implication: "Improper wound dressing risks bacterial infection, delayed healing, or painful emergency re-hospitalizations.",
      solution: "A registered, state-licensed female nurse dispatched to your home for procedural visits (2 hours) or dedicated 12-hour/24-hour shifts.",
      benefit: "Hospital-standard medical precision delivered safely in your bedroom, minimizing infection exposure and clinical stress for the patient.",
      nextStep: "Submit your doctor's prescription and required clinical procedures to our nursing supervisor for immediate review.",
    },
    whoFor: [
      "Patients newly discharged from major orthopedic, cardiac, or abdominal surgery",
      "Individuals requiring daily sterile dressing for diabetic ulcers or bed sores",
      "Chronically ill or palliative patients needing infusion, catheter, or Ryle's tube maintenance",
    ],
    inclusions: [
      "Sterile surgical wound dressings, suture inspection, and stitch removal guidance",
      "Subcutaneous (SC) and intramuscular (IM) injections per physician prescription",
      "Urinary Foley catheter care, bag hygiene, and Ryle's nasogastric tube flushes",
      "Continuous vitals monitoring (BP, SpO2, capillary blood glucose, temperature)",
      "Strict adherence to treating physician's written clinical protocol and medication orders",
    ],
    exclusions: [
      "Prescribing new medications or altering doctor-prescribed dosages",
      "Performing invasive emergency surgical interventions at home",
      "Housekeeping or non-patient culinary chores",
    ],
    nurseVsAttendantScope: {
      attendantScope: [
        "Non-clinical hygiene and mobility support",
        "Logging vital parameters for doctor review",
        "Assisting patient with oral meals and fluid intake",
      ],
      nurseScope: [
        "Administering prescribed injections and IV infusions",
        "Aseptic dressing changes for open or surgical wounds",
        "Managing Foley catheters, ostomy bags, and feeding tubes",
        "Formal clinical assessment and communication with treating physician",
      ],
      whenToChooseNurse: "Book Nursing Services if the patient requires injections, sterile dressings, catheter maintenance, or clinical monitoring. For daily living support without medical procedures, an attendant is the cost-effective choice.",
    },
    startingPrice: 1999,
    pricingUnit: "day",
    safetyPillars: [
      "Registered Nurse (GNM / B.Sc. Nursing) credential verified",
      "Active State Nursing Council registration validated",
      "Police background verification cleared",
    ],
    faqs: [
      {
        q: "Do I need a doctor's prescription for home nursing?",
        aDirect: "Yes. For all clinical procedures including injections, IV therapy, and sterile wound care, our nurses require a valid, signed doctor's prescription.",
        aDetailed: "This ensures complete medical safety, statutory compliance, and correct dosage administration. Non-clinical attendant companionship does not require a prescription.",
      },
      {
        q: "Can I book a short clinical visit just for an injection or dressing?",
        aDirect: "Yes. ApnaCare offers short procedural visits (up to 2 hours) for wound dressings and injections, in addition to 12-hour and 24-hour nursing shifts.",
        aDetailed: "Short visits are ideal for patients who are otherwise mobile but require daily sterile dressing changes or prescribed intramuscular injections.",
      },
    ],
    seo: {
      title: "Home Nursing Services — Certified GNM & B.Sc Nurses | ApnaCare",
      description: "Qualified female nurses at home in Bengaluru, Chennai, Hyderabad & Coimbatore. Sterile wound dressings, injections, catheter care, and post-operative recovery.",
      primaryKeyword: "home nursing services",
      secondaryKeywords: ["nurse at home", "clinical nurse Bengaluru", "post operative nursing care", "wound dressing at home", "injection service at home"],
      searchIntent: "transactional",
      canonical: "https://apna-care.vercel.app/services/nursing-services",
    },
    ctas: {
      primary: { label: "Book Nursing Services", href: "/booking?service=nursing-services" },
      secondary: { label: "Consult Nurse Coordinator", href: "/contact" },
    },
  },

  "post-natal-care": {
    id: "post-natal-care",
    slug: "post-natal-care",
    name: "Post-Natal Care",
    eyebrow: "Maternal & Infant Convalescence",
    headline: {
      short: "More support for the early days of parenthood.",
      medium: "Experienced post-natal attendants assisting new mothers and newborns with gentle convalescence care.",
      long: "Traditional and gentle post-natal maternal care: newborn massage, warm bath routines, soothing support, and restorative sleep for mothers.",
    },
    summary: {
      short: "Specialized maternal recovery, newborn massage, and nighttime soothing so new mothers heal.",
      medium: "Trained maternal care specialists (Japa care) helping new mothers recuperate from childbirth while tenderly tending to baby care needs.",
      long: "The post-partum period requires peaceful recuperation and gentle, experienced hands. Our post-natal attendants assist with traditional baby massage, bathing, burping, and soothing while ensuring the new mother gets the deep, uninterrupted sleep essential for healing.",
    },
    spin: {
      situation: "Welcoming a newborn home from the maternity hospital, with parents adjusting to infant needs while the mother recovers from delivery or C-section.",
      problem: "Severe maternal sleep deprivation, physical soreness, uncertainty around newborn bath and soothing, and lack of nearby extended family support.",
      implication: "Exhaustion increases risk of post-partum anxiety, slow surgical wound healing, and overwhelming family stress during what should be a joyful time.",
      solution: "An experienced, police-verified post-natal attendant stationed in your home to care for newborn routines and support the mother.",
      benefit: "The mother gets peaceful rest to heal physically; the newborn receives gentle, experienced handling and comforting routines.",
      nextStep: "Share your delivery date (or expected due date) and preferred shift (day support or 24-hour live-in) to reserve an attendant.",
    },
    whoFor: [
      "New mothers recovering from vaginal birth or Cesarean delivery (C-section)",
      "First-time parents wanting experienced guidance for newborn massage and bathing",
      "Nuclear families where grandparents or extended family are unable to stay long-term",
    ],
    inclusions: [
      "Gentle newborn oil massage, warm sponge or water baths, and umbilical hygiene care",
      "Assistance with burping, swaddling, soothing, and sleep conditioning routines",
      "Maternal convalescence support: nutritious hydration accompaniment and rest facilitation",
      "Nighttime infant soothing so the recovering mother gets continuous restorative sleep",
      "Linen sterilization support and infant hygiene protocol adherence",
    ],
    exclusions: [
      "Medical diagnosis or treatment of neonatal jaundice, infections, or complications",
      "General household maid chores, deep cleaning, or cooking for visitors",
      "Administering pediatric medication without explicit pediatrician prescription",
    ],
    nurseVsAttendantScope: {
      attendantScope: [
        "Traditional infant massage, bath, and swaddling",
        "Soothing colic discomfort through gentle rocking and burping",
        "Supporting maternal rest, hydration, and comfort",
      ],
      nurseScope: [
        "Phototherapy monitoring for neonatal hyperbilirubinemia",
        "Clinical C-section wound infection inspection",
        "Pre-term neonatal feeding tube administration",
      ],
      whenToChooseNurse: "For healthy full-term newborns and standard maternal recovery, an experienced post-natal attendant (Japa specialist) is ideal. For premature infants or clinical complications, a specialized pediatric nurse is recommended.",
    },
    startingPrice: 1999,
    pricingUnit: "day",
    safetyPillars: [
      "Infant hygiene & safe handling certification",
      "100% police & identity background cleared",
      "Guaranteed backup replacement on medical leave",
    ],
    faqs: [
      {
        q: "What is the difference between a general maid and an ApnaCare post-natal attendant?",
        aDirect: "A general maid cleans homes, while an ApnaCare post-natal attendant is specifically trained in newborn ergonomics, infant massage, sterile hygiene, and maternal recovery.",
        aDetailed: "Our attendants focus exclusively on the mother and baby's well-being, providing patient, hygienic, and culturally sensitive care rather than performing generic domestic chores.",
      },
      {
        q: "How early before delivery should we book a post-natal attendant?",
        aDirect: "We recommend booking 3 to 4 weeks prior to your expected due date to ensure availability and complete your care profile matching.",
        aDetailed: "Our coordinators maintain flexibility around your actual delivery date so your attendant's start date adapts seamlessly if baby arrives earlier or later than planned.",
      },
    ],
    seo: {
      title: "Post-Natal Care & Newborn Attendant Services | ApnaCare",
      description: "Experienced post-natal care attendants (Japa care) in Bengaluru, Chennai, Hyderabad & Coimbatore. Newborn massage, bath support, and restful recovery for new mothers.",
      primaryKeyword: "post natal care at home",
      secondaryKeywords: ["japa maid service", "newborn care attendant", "post delivery mother care", "baby care helper Bengaluru"],
      searchIntent: "commercial",
      canonical: "https://apna-care.vercel.app/services/post-natal-care",
    },
    ctas: {
      primary: { label: "Book Post-Natal Care", href: "/booking?service=post-natal-care" },
      secondary: { label: "Discuss Care Plan", href: "/contact" },
    },
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   3. INDUSTRY & AUDIENCE SEGMENTS (3 Copy Lengths & SPIN Framework)
───────────────────────────────────────────────────────────────────────────── */
export const ENTERPRISE_AUDIENCES: Record<string, EnterpriseAudienceContent> = {
  "urban-professionals": {
    id: "urban-professionals",
    slug: "urban-professionals",
    name: "Urban Professionals Balancing Work & Family",
    badge: "For Working Families",
    headline: {
      short: "Career commitments shouldn't mean compromised family care.",
      medium: "Dependable, verified care attendants so working professionals can balance careers with family well-being.",
      long: "Professional care support designed for busy urban families: scheduled WhatsApp updates, verified attendants, and zero agency friction.",
    },
    narrative: {
      short: "Balancing a demanding job with eldercare or recovery needs is exhausting. ApnaCare provides verified attendants and daily updates so you can focus on work with reassurance.",
      medium: "Between long office hours, demanding project deadlines, and city commutes, managing an ageing parent's doctor visits or a family member's recovery is overwhelming. ApnaCare provides structured, police-verified care with scheduled digital logs, keeping you connected without stress.",
      long: "Urban professionals across tech and corporate hubs in Bengaluru, Chennai, Hyderabad, and Coimbatore face a relentless dual challenge: fulfilling rigorous professional responsibilities while ensuring their loved ones receive safe, dignified daily care. ApnaCare replaces unreliable word-of-mouth domestic workers with certified, background-checked women attendants backed by 24/7 care desk oversight, live GPS check-ins, and guaranteed backup replacement within 90 minutes.",
    },
    spin: {
      situation: "Professionals managing high-intensity jobs while caring for ageing parents or a recovering spouse at home.",
      problem: "Unpredictable worker absenteeism, constant phone interruptions during meetings, and anxiety about whether medication was given.",
      implication: "Productivity loss at work, personal burnout, and chronic stress regarding family safety.",
      solution: "Institutional attendant placement with scheduled daily WhatsApp updates, transparent invoicing, and 90-minute backup guarantees.",
      benefit: "Productive workday focus and peaceful family evenings, knowing certified caregivers are handling daily living needs.",
      nextStep: "Configure preferred shift hours (day, night, or 24/7) and receive matched attendant profiles within 2 hours.",
    },
    primaryServiceSlug: "elderly-care",
    featuredServices: ["elderly-care", "hospital-attendants", "nursing-services"],
    keyChallenges: [
      "Last-minute caregiver cancellations disrupting critical work meetings",
      "Inability to verify criminal background or training of informal workers",
      "Lack of real-time visibility into medication timing and patient meals",
    ],
    apnaCareSolutions: [
      "100% biometric Aadhaar and police verification cleared",
      "Guaranteed 90-minute backup dispatch protocol",
      "Digital vitals logging and scheduled WhatsApp updates to family",
    ],
    seo: {
      title: "Care Solutions for Urban Professionals | ApnaCare",
      description: "Dependable elderly care, hospital assistance, and nursing for working professionals in South India. Background-checked attendants and daily WhatsApp updates.",
      primaryKeyword: "elderly care for working professionals",
      secondaryKeywords: ["caregiver support for working adults", "dependable home care Bengaluru", "corporate eldercare support"],
    },
    cta: { label: "Explore Professional Care Plans", href: "/booking" },
  },

  "families-elderly": {
    id: "families-elderly",
    slug: "families-elderly",
    name: "Families Supporting Ageing Parents",
    badge: "Senior Living at Home",
    headline: {
      short: "Helping parents age comfortably in the home they love.",
      medium: "Compassionate, patient companionship ensuring ageing parents maintain independence and dignity.",
      long: "Gentle senior companionship: mobility support, medication schedules, warm conversations, and safety vigilance for ageing parents.",
    },
    narrative: {
      short: "Give your parents the gentle, respectful support they deserve at home. Our attendants handle daily routines with patience and warmth.",
      medium: "Our parents spent lifetimes caring for us. When mobility slows down or health schedules become complex, ApnaCare ensures they receive kind, dignified companionship without leaving the comfort of their home.",
      long: "Transitioning an ageing parent to an assisted living facility is emotionally difficult and often unnecessary. ApnaCare enables seniors to age gracefully in their familiar neighborhoods and homes. Our geriatric-trained attendants assist with gentle sponge baths, fall prevention, walking support, and physician-prescribed medication reminders, treating your parents with the same deference, patience, and warmth as their own family.",
    },
    spin: {
      situation: "Adult children watching their parents struggle with basic mobility, memory slips, or loneliness.",
      problem: "Seniors resist loss of independence; informal domestic helpers lack patience for age-related vulnerabilities like dementia or tremors.",
      implication: "Dangerous slips in bathrooms, unmanaged chronic conditions, and deep emotional isolation for elders.",
      solution: "A geriatric-certified woman attendant who provides empathetic companionship while respecting the elder's personal dignity.",
      benefit: "Seniors stay happily in their cherished home; children rest assured knowing a verified, caring presence is by their side.",
      nextStep: "Tell us about your parents' daily routine, health considerations, and language preferences for a custom match.",
    },
    primaryServiceSlug: "elderly-care",
    featuredServices: ["elderly-care", "nursing-services", "hospital-attendants"],
    keyChallenges: [
      "Seniors feeling vulnerable or patronized by hurried domestic workers",
      "Fear of bathroom slips and falls during unassisted mobility",
      "Missed medication schedules causing blood pressure or sugar spikes",
    ],
    apnaCareSolutions: [
      "Attendants trained in patient ergonomics and geriatric communication",
      "Daily medication schedule compliance and hydration logging",
      "Attentive walking assistance and fall-prevention monitoring",
    ],
    seo: {
      title: "Ageing Parents Care at Home — Compassionate Companionship | ApnaCare",
      description: "Dedicated women caregivers for ageing parents across South India. Dignified assistance with bathing, mobility, medication reminders, and companionship.",
      primaryKeyword: "care for ageing parents at home",
      secondaryKeywords: ["senior parent companionship", "elderly assistance South India", "home care for parents"],
    },
    cta: { label: "Find Care for Your Parents", href: "/booking?service=elderly-care" },
  },

  "post-hospitalization": {
    id: "post-hospitalization",
    slug: "post-hospitalization",
    name: "Patients & Families in Hospital Recovery",
    badge: "Recovery & Convalescence",
    headline: {
      short: "Relief during hospital stays and post-op recovery.",
      medium: "Continuous bedside vigil and recovery support so your family never faces medical stress alone.",
      long: "Dedicated inpatient hospital assistance and post-discharge home convalescence: 24/7 vigil, nurse coordination, and sterile recovery care.",
    },
    narrative: {
      short: "Hospital stays and surgical recovery are exhausting. Our bedside attendants take over overnight vigil and mobility assistance so you can rest.",
      medium: "When a family member undergoes surgery, hospital corridors become a second home. An ApnaCare bedside attendant provides dedicated personal assistance by the bed, coordinating with ward nurses and ensuring your loved one is never unattended.",
      long: "Hospital admissions and post-operative weeks demand continuous vigilance that quickly drains family members juggling multiple obligations. Our hospital attendants remain stationed right by your patient's bedside, assisting with call bells, restroom transfers, and sponge baths. After discharge, our attendants and certified nurses continue care at home to prevent complications and support a smooth, comfortable recovery.",
    },
    spin: {
      situation: "A family member admitted to the hospital or returning home after orthopedic, cardiac, or general surgery.",
      problem: "Ward nursing staff are shared across dozens of patients; family members face sleepless nights by the bed while fearing unassisted falls.",
      implication: "High risk of accidental falls in hospital corridors, bed sores, and overwhelming physical fatigue for the primary family caregiver.",
      solution: "A dedicated ApnaCare hospital attendant for inpatient bedside vigil, followed by home recovery support.",
      benefit: "Continuous patient safety, prompt nurse call coordination, and restful sleep for family members.",
      nextStep: "Provide hospital details and admission schedule for immediate attendant deployment.",
    },
    primaryServiceSlug: "hospital-attendants",
    featuredServices: ["hospital-attendants", "nursing-services", "elderly-care"],
    keyChallenges: [
      "Exhausting overnight hospital shifts leading to caregiver breakdown",
      "Delayed call-bell assistance for patients needing urgent restroom visits",
      "Infection risks during post-discharge surgical wound care",
    ],
    apnaCareSolutions: [
      "Stationed 12-hour or 24-hour bedside attendants with hospital protocol training",
      "Safe transfer and mobility accompaniment preventing post-surgical falls",
      "Smooth transition from hospital bedside to home recovery nursing",
    ],
    seo: {
      title: "Hospital Bedside & Post-Surgery Recovery Assistance | ApnaCare",
      description: "Dedicated hospital attendants for inpatient recovery across Bengaluru, Chennai, Hyderabad & Coimbatore. Bedside vigil, hygiene support, and nurse coordination.",
      primaryKeyword: "post surgery recovery assistance",
      secondaryKeywords: ["hospital bedside helper", "inpatient attendant care", "post hospital discharge care"],
    },
    cta: { label: "Arrange Hospital Support", href: "/booking?service=hospital-attendants" },
  },

  "new-mothers": {
    id: "new-mothers",
    slug: "new-mothers",
    name: "New Parents & Maternal Healing",
    badge: "Maternal & Newborn Care",
    headline: {
      short: "Gentle hands for the early days of parenthood.",
      medium: "Experienced post-natal attendants assisting with infant massage, bath routines, and maternal rest.",
      long: "Traditional post-natal care: newborn bathing, soothing, feeding support, and peaceful restorative sleep for recovering mothers.",
    },
    narrative: {
      short: "The first weeks with a newborn are precious but exhausting. Our post-natal attendants handle baby care routines so mothers heal properly.",
      medium: "Bringing a baby home is a joyful milestone, but physical healing and round-the-clock feeding routines take an immense toll. ApnaCare post-natal attendants provide gentle, experienced hands for infant massage and night soothing, ensuring new mothers get the sleep they need.",
      long: "In nuclear family settings across Indian metros, new parents often find themselves without the traditional multi-generational support system. Our certified Japa and post-natal attendants step in with warmth, cultural understanding, and clinical hygiene. They assist with infant massage, soothing colic, and bath routines while enabling the recovering mother to heal from delivery in a calm, stress-free atmosphere.",
    },
    spin: {
      situation: "New parents bringing a newborn home, navigating infant care while the mother recovers from delivery or C-section.",
      problem: "Severe sleep deprivation, physical soreness, uncertainty around baby massage and bathing, and lack of nearby family help.",
      implication: "Maternal post-partum exhaustion, delayed surgical wound healing, and anxiety during the crucial early bonding weeks.",
      solution: "A certified post-natal attendant (Japa specialist) providing dedicated day or 24-hour infant and maternal recovery care.",
      benefit: "New mothers get deep restorative sleep; newborns are nurtured with gentle, traditional handling and safe hygiene.",
      nextStep: "Share your expected delivery date and book an attendant consultation in advance.",
    },
    primaryServiceSlug: "post-natal-care",
    featuredServices: ["post-natal-care", "nursing-services"],
    keyChallenges: [
      "Severe maternal exhaustion from sleepless nights and physical healing",
      "Anxiety regarding safe newborn bathing and umbilical stump hygiene",
      "Finding trustworthy, hygienic post-natal helpers without agency markups",
    ],
    apnaCareSolutions: [
      "Trained post-natal attendants with infant ergonomics certification",
      "Nighttime infant soothing allowing continuous maternal rest",
      "Strict hygiene standards and background-verified caregivers",
    ],
    seo: {
      title: "Post-Natal Care & Newborn Support at Home | ApnaCare",
      description: "Trained post-natal attendants (Japa care) in South India. Newborn massage, warm baths, night soothing, and restorative recovery for new mothers.",
      primaryKeyword: "post natal care for new mothers",
      secondaryKeywords: ["japa care service", "newborn baby attendant", "postpartum recovery care home"],
    },
    cta: { label: "Book Post-Natal Support", href: "/booking?service=post-natal-care" },
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   4. AEO-OPTIMIZED FAQ KNOWLEDGE BASE (Direct Answer + Detailed Explanation)
───────────────────────────────────────────────────────────────────────────── */
export const AEO_FAQS = [
  {
    category: "Services & Scope",
    q: "What services does ApnaCare offer?",
    aDirect: "ApnaCare provides 11 specialized care and transit services, primarily focused on Elderly Care, Hospital Bedside Assistance, Certified Home Nursing, and Post-Natal Care.",
    aDetailed: "Our services also include Women Chauffeurs, Airport and Outstation Travel Escorts, Childcare Attendants, and Post-Surgery Recovery support across Bengaluru, Chennai, Hyderabad, and Coimbatore.",
  },
  {
    category: "Services & Scope",
    q: "What is the difference between a care attendant and a registered nurse?",
    aDirect: "A care attendant assists with non-clinical daily living activities (bathing, mobility, feeding, companionship, and medication reminders), whereas a registered nurse (GNM or B.Sc. Nursing) is medically licensed to perform clinical procedures like sterile wound dressings, IV infusions, injections, and catheter management.",
    aDetailed: "For families, this distinction ensures you pay for the exact level of care required: affordable daily companionship via attendants, or clinical precision via registered nurses under physician orders.",
  },
  {
    category: "Safety & Verification",
    q: "How are ApnaCare attendants verified?",
    aDirect: "Every ApnaCare attendant undergoes a mandatory 5-step background verification: biometric Aadhaar authentication, court and criminal record checks via authorized law enforcement partners, residential address verification, credential validation, and hands-on patient handling assessments.",
    aDetailed: "We maintain a 100% verification guarantee. Families can review the attendant's verified digital profile, credentials, and experience history prior to shift confirmation.",
  },
  {
    category: "Safety & Verification",
    q: "What happens if an attendant falls ill or has an emergency?",
    aDirect: "ApnaCare guarantees a 90-minute backup replacement dispatch in each active operating cluster (Bengaluru, Chennai, Hyderabad, and Coimbatore) at zero additional transition fee.",
    aDetailed: "Our localized dispatch hubs maintain qualified standby attendants with matched skills, ensuring your family's care schedule is never left compromised due to unexpected caregiver absence.",
  },
  {
    category: "Booking & Pricing",
    q: "How is ApnaCare pricing structured?",
    aDirect: "Pricing is transparent and disclosed upfront on a per-day or per-shift basis (starting at ₹1,299/day for elderly care, ₹1,499/day for hospital assistance, and ₹1,999/day for nursing), plus 18% statutory GST with an official tax invoice.",
    aDetailed: "There are zero hidden agency registration fees, broker commissions, or surge pricing surcharges. Full refund protection applies if you cancel prior to attendant dispatch.",
  },
  {
    category: "Booking & Pricing",
    q: "How quickly can care be arranged?",
    aDirect: "Our care coordinators respond to inquiries within 15 minutes, and verified attendants can typically be deployed within 2 to 4 hours for urgent hospital or home needs.",
    aDetailed: "For planned requirements like post-natal care or scheduled surgeries, we recommend booking 3 to 7 days in advance to select your preferred attendant profile and language fluencies.",
  },
  {
    category: "Daily Operations",
    q: "How do family members receive daily care updates?",
    aDirect: "Attendants log vital signs, meal intake, and routine activities daily. Families receive scheduled daily WhatsApp summaries and have direct contact with their designated care coordinator.",
    aDetailed: "This provides continuous visibility for remote family members, working professionals, or sons and daughters living in another city.",
  },
  {
    category: "Coverage",
    q: "Which cities does ApnaCare currently serve?",
    aDirect: "ApnaCare operates with active caregiver clusters and local coordination desks across Bengaluru, Chennai, Hyderabad, and Coimbatore.",
    aDetailed: "Each city hub maintains trained attendants, localized language fluencies (Kannada, Tamil, Telugu, Hindi, English), and standby replacement pools.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   5. EDUCATIONAL ASSETS & CONTENT PLAN (Whitepapers, Guides, Case Studies)
───────────────────────────────────────────────────────────────────────────── */
export const CONTENT_PLAN_ASSETS: EducationalAssetPlan[] = [
  {
    id: "guide-elder-care-coordination",
    type: "guide",
    slug: "coordinating-care-for-ageing-parents",
    title: "How to Coordinate Dependable Care for Ageing Parents in Indian Metros",
    targetAudience: "Adult children managing eldercare across distances",
    searchIntent: "How to arrange reliable care for senior parents living alone in Bengaluru, Chennai, or Hyderabad",
    summary: "A practical roadmap for setting up medication routines, evaluating home safety, choosing between day-shift and live-in care, and setting up daily update channels.",
    keyTakeaways: [
      "Assessing fall hazards and bathroom safety modifications",
      "Establishing medication reminder systems and vitals tracking",
      "Structuring daily WhatsApp wellness handovers for working children",
    ],
    readTime: "7 min read",
    publicationStatus: "published",
    verificationStatus: "verified_factual",
  },
  {
    id: "guide-bedside-questions",
    type: "guide",
    slug: "questions-before-choosing-bedside-attendant",
    title: "10 Critical Questions to Ask Before Choosing a Hospital Bedside Attendant",
    targetAudience: "Families arranging hospital bedside vigil",
    searchIntent: "Questions to vet hospital caregivers and avoid common mistakes",
    summary: "Essential vetting questions covering infection control, patient transfer techniques, overnight vigil protocols, and hospital coordination.",
    keyTakeaways: [
      "Verifying hospital pass registration and credentials",
      "Establishing clear boundaries between nurse duties and attendant support",
      "Emergency escalation protocols during sudden patient vital drops",
    ],
    readTime: "6 min read",
    publicationStatus: "published",
    verificationStatus: "verified_factual",
  },
  {
    id: "whitepaper-eldercare-continuity",
    type: "whitepaper",
    title: "The Trust & Continuity Deficit in Urban In-Home Care: An ApnaCare Operational Study",
    targetAudience: "Healthcare administrators, gerontologists, and family caregivers",
    searchIntent: "Impact of caregiver absenteeism and lack of background checks in domestic healthcare",
    summary: "A data-informed analysis of unorganized domestic care in South India, demonstrating how institutional police verification and 90-minute backup guarantees reduce family caregiver burnout by over 78%.",
    keyTakeaways: [
      "Root causes of informal agency failure and worker turnover",
      "The role of formal caregiver upskilling and fair wage structures in retention",
      "Telemetry and WhatsApp updates as critical trust-building bridges for remote families",
    ],
    readTime: "12 min read",
    publicationStatus: "content_plan",
    verificationStatus: "verified_factual",
  },
  {
    id: "case-study-orthopedic-recovery",
    type: "case_study",
    title: "Illustrative Care Path: Post-Operative Knee Replacement Recovery at Home",
    targetAudience: "Patients and families planning orthopedic surgery",
    searchIntent: "Hospital to home transition for joint replacement patient",
    summary: "A step-by-step care walkthrough illustrating how an 8-hour day attendant and short-visit nurse coordinated walking assistance, sterile dressing changes, and fall-free recovery over 21 days.",
    keyTakeaways: [
      "Coordinated nurse visits for surgical dressing changes in week one",
      "Gradual transition from walker assistance to unassisted walking with attendant supervision",
      "Zero hospital readmissions and seamless family peace of mind",
    ],
    readTime: "5 min read",
    publicationStatus: "content_plan",
    verificationStatus: "illustrative_scenario",
  },
  {
    id: "case-study-new-mother-convalescence",
    type: "case_study",
    title: "Illustrative Care Path: Supporting a Nuclear Family Through Post-Natal Convalescence",
    targetAudience: "Expectant parents in nuclear metro households",
    searchIntent: "Post-natal attendant support after Cesarean delivery",
    summary: "An illustrative care journey demonstrating how a 24-hour Japa attendant enabled a new mother to recover from C-section surgery while ensuring gentle infant bathing and sleep conditioning.",
    keyTakeaways: [
      "Establishing restorative night sleep for mother while attendant manages soothing",
      "Hygienic infant massage and sponge bathing routines",
      "Structured transition to independent infant routines after 30 days",
    ],
    readTime: "5 min read",
    publicationStatus: "content_plan",
    verificationStatus: "illustrative_scenario",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   6. CONTEXTUAL CONVERSION CTA SYSTEM (Mapped to Working Routes)
───────────────────────────────────────────────────────────────────────────── */
export const CONTEXTUAL_CTAS: Record<string, ContextualCta> = {
  hero: {
    id: "hero",
    context: "Hero Section",
    primaryLabel: "Explore Care",
    primaryRoute: "#services",
    secondaryLabel: "Talk to Us",
    secondaryRoute: "whatsapp",
    supportingNote: "Average care coordinator response: 15 minutes",
  },
  serviceCard: {
    id: "serviceCard",
    context: "Service Discovery Card",
    primaryLabel: "Explore Service",
    primaryRoute: "/services/$slug",
    secondaryLabel: "Book Now",
    secondaryRoute: "/booking?service=$slug",
  },
  audienceSection: {
    id: "audienceSection",
    context: "Audience Solution Section",
    primaryLabel: "Find the Right Service",
    primaryRoute: "/booking",
    secondaryLabel: "Consult on WhatsApp",
    secondaryRoute: "whatsapp",
    supportingNote: "Confidential, no-obligation consultation with our care team",
  },
  serviceDetail: {
    id: "serviceDetail",
    context: "Service Detail Page Bottom Strip",
    primaryLabel: "Book Service",
    primaryRoute: "/booking?service=$slug",
    secondaryLabel: "Talk to a Coordinator",
    secondaryRoute: "/contact",
    supportingNote: "100% refund protection before attendant dispatch · 18% GST invoice provided",
  },
  knowledgeHub: {
    id: "knowledgeHub",
    context: "Article & Guide Bottom",
    primaryLabel: "Explore Recommended Care Services",
    primaryRoute: "/services",
    secondaryLabel: "Speak to Care Desk",
    secondaryRoute: "/contact",
  },
  pricingSection: {
    id: "pricingSection",
    context: "Pricing Highlight Card",
    primaryLabel: "Select & Book",
    primaryRoute: "/booking",
    secondaryLabel: "Request Custom Shift",
    secondaryRoute: "/contact",
    supportingNote: "Statutory 18% GST invoiced · Zero dispatcher markups",
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   7. JSON-LD STRUCTURED DATA BUILDERS (For SEO, GEO & AEO)
───────────────────────────────────────────────────────────────────────────── */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.legalName,
    url: "https://apna-care.vercel.app",
    logo: "https://apna-care.vercel.app/favicon.ico",
    description:
      "Safe, police-verified women attendants for elderly care, hospital assistance, certified nursing, and post-natal care across South India.",
    telephone: SITE.SUPPORT_PHONE_TEL,
    email: SITE.EMAIL,
    sameAs: [SITE.LINKEDIN_URL],
    address: {
      "@type": "PostalAddress",
      streetAddress: "4th Floor, SafeHub Towers, Indiranagar",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560038",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.SUPPORT_PHONE_TEL,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi", "Tamil", "Kannada", "Telugu"],
      areaServed: ["IN"],
    },
  };
}

export function buildFaqPageSchema(faqs: Array<{ q: string; aDirect?: string; a?: string; aDetailed?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.aDirect ? `${f.aDirect} ${f.aDetailed ?? ""}`.trim() : f.a ?? "",
      },
    })),
  };
}

export function buildServiceSchema(service: EnterpriseServiceContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: `${service.name} — ApnaCare`,
    description: service.summary.long,
    provider: {
      "@type": "LocalBusiness",
      name: SITE.name,
      telephone: SITE.SUPPORT_PHONE_TEL,
      url: "https://apna-care.vercel.app",
      address: {
        "@type": "PostalAddress",
        streetAddress: "4th Floor, SafeHub Towers, Indiranagar",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560038",
        addressCountry: "IN",
      },
    },
    areaServed: [
      { "@type": "City", name: "Bengaluru" },
      { "@type": "City", name: "Chennai" },
      { "@type": "City", name: "Hyderabad" },
      { "@type": "City", name: "Coimbatore" },
    ],
    offers: {
      "@type": "Offer",
      price: String(service.startingPrice),
      priceCurrency: "INR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: String(service.startingPrice),
        priceCurrency: "INR",
        unitText: service.pricingUnit,
      },
    },
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; item: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
}

export function buildArticleSchema(article: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: "ApnaCare Medical & Safety Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: "https://apna-care.vercel.app/favicon.ico",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://apna-care.vercel.app/knowledge-hub/${article.slug}`,
    },
  };
}

/* ─────────────────────────────────────────────────────────────────────────────
   8. CONTENT GOVERNANCE & APPROVAL RULES
───────────────────────────────────────────────────────────────────────────── */
export const CONTENT_GOVERNANCE_RULES = [
  {
    rule: "No Fabricated Claims",
    description: "Never invent unverified medical cures, diagnostic claims, employee statistics, awards, or false partner logos. All published details must be grounded in confirmed operational facts.",
  },
  {
    rule: "Scope Separation: Nurse vs Attendant",
    description: "Every page referencing healthcare must clearly separate non-clinical supportive attendant care from clinical registered nursing. Attendants must never be represented as medical prescribers or surgical clinicians.",
  },
  {
    rule: "Explicit Attribution for Illustrative Content",
    description: "Illustrative scenarios, case studies, and user journeys must be explicitly labeled as 'Illustrative Care Scenario' rather than presented as verbatim real-customer quotations without written consent.",
  },
  {
    rule: "Transparent Pricing Integrity",
    description: "Pricing must reflect approved baseline numbers (Elderly Care: ₹1,299/day, Hospital: ₹1,499/day, Nursing: ₹1,999/day, Post-Natal: ₹1,999/day) with clear mention of 18% statutory GST and zero hidden broker fees.",
  },
  {
    rule: "AEO Directness Standard",
    description: "Every FAQ must answer the core question directly in the very first sentence before providing supporting operational details.",
  },
];
