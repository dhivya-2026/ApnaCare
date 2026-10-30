/**
 * Master Enterprise Taxonomy & Relationship Engine — ApnaCare
 *
 * Implements the multidomain mapping connecting:
 * Customer Segment → Customer Problem → Solution → Service → Capability → Page Route → CTA → Outcome Metric
 */

import { SERVICES, CITIES, SITE, type Service, type ServiceCategory } from "./site";

export type ServiceStatus =
  | "EXISTING_VERIFIED"
  | "EXISTING_UNVERIFIED"
  | "INFERRED_FROM_CONTENT"
  | "PROPOSED_EXPANSION"
  | "EXTERNAL_PARTNERSHIP_REQUIRED"
  | "OUT_OF_SCOPE"
  | "REQUIRES_CLINICAL_OR_REGULATORY_VALIDATION";

export type HeatMapTier = "CORE" | "GROWTH" | "EMERGING" | "STRATEGIC";

export interface AudiencePathway {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  situation: string;
  painPoint: string;
  desiredOutcome: string;
  recommendedServices: string[];
  ctaLabel: string;
  ctaHref: string;
  status: ServiceStatus;
}

export interface NeedDiscoveryOption {
  id: string;
  triggerPhrase: string;
  contextDescription: string;
  suggestedServiceSlug: string;
  providerType: "General Duty Assistant (Attendant)" | "Registered Nurse (GNM / B.Sc)" | "Licensed Driver / Assisted Travel";
  clinicalBoundary: string;
  estimatedStartingPrice: number;
  priceUnit: string;
  status: ServiceStatus;
  directActionHref: string;
}

export interface HumanCareOutcome {
  id: string;
  title: string;
  shortDescription: string;
  intendedBenefit: string;
  relevantServiceSlugs: string[];
}

export interface CustomerSegment {
  id: string;
  name: string;
  category: "family_caregiver" | "direct_recipient" | "corporate_partner";
  description: string;
  typicalProfile: string;
}

export interface CustomerProblem {
  id: string;
  title: string;
  domain: "geriatric_isolation" | "clinical_convalescence" | "maternal_recovery" | "transit_vulnerability" | "safety_compliance";
  description: string;
  consequence: string;
}

export interface SolutionDefinition {
  id: string;
  name: string;
  valueProposition: string;
  keyDifferentiator: string;
}

export interface CapabilityMapping {
  id: string;
  name: string;
  domain: "Care Delivery" | "Workforce & Trust" | "Transit Safety" | "Digital Operations";
  tier: HeatMapTier;
  standardSLA?: string;
}

export interface TaxonomyRecord {
  id: string;
  segment: CustomerSegment;
  problem: CustomerProblem;
  solution: SolutionDefinition;
  serviceSlug: string;
  serviceName: string;
  serviceCategory: ServiceCategory;
  startingPrice: number;
  capability: CapabilityMapping;
  pageRoute: string;
  primaryCta: {
    label: string;
    href: string;
    variant: "default" | "warm" | "outline";
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  outcomeMetric: {
    name: string;
    target: string;
    measurementMechanism: string;
  };
}

export const ENTERPRISE_TAXONOMY_MAP: TaxonomyRecord[] = [
  {
    id: "TAX-01",
    segment: {
      id: "seg-working-adult-child",
      name: "Working Adult Children & NRIs",
      category: "family_caregiver",
      description: "Professionals managing career responsibilities while living away from aging parents.",
      typicalProfile: "Aged 32-52 in IT/finance hubs or overseas, financing care for elderly parents.",
    },
    problem: {
      id: "prob-elderly-isolation-fall-risk",
      title: "Unassisted Ageing, Fall Vulnerability & Medication Gaps",
      domain: "geriatric_isolation",
      description: "Ageing parents living alone face high fall risks during bathing, missed medication times, and emotional loneliness.",
      consequence: "Unmonitored domestic accidents, rapid cognitive/physical decline, and constant family anxiety.",
    },
    solution: {
      id: "sol-dignified-geriatric-living",
      name: "Dignified Geriatric In-Home Living",
      valueProposition: "Compassionate, background-vetted female attendant stationed at home for daily mobility, feeding, and prescription logging.",
      keyDifferentiator: "100% police clearance, Aadhaar identity check, and guaranteed 90-minute replacement cluster dispatch.",
    },
    serviceSlug: "elderly-care",
    serviceName: "Elderly Care",
    serviceCategory: "home",
    startingPrice: 1299,
    capability: {
      id: "CAP-111",
      name: "Geriatric Mobility & Daily Living Assistance",
      domain: "Care Delivery",
      tier: "CORE",
      standardSLA: "Day shift / 24h live-in with 90-min backup coverage",
    },
    pageRoute: "/services/elderly-care",
    primaryCta: {
      label: "Book Elderly Care",
      href: "/booking?service=elderly-care",
      variant: "warm",
    },
    secondaryCta: {
      label: "Consult Care Team",
      href: "/contact",
    },
    outcomeMetric: {
      name: "Daily Check-in & Medication Adherence Rate",
      target: ">99.5%",
      measurementMechanism: "Attendant shift logging and family weekly telemetry digest",
    },
  },
  {
    id: "TAX-02",
    segment: {
      id: "seg-post-surgical-families",
      name: "Families of Hospitalized & Surgical Patients",
      category: "family_caregiver",
      description: "Family members unable to take weeks of absence for 24/7 inpatient hospital room vigilance.",
      typicalProfile: "Kin of patients admitted for orthopedic, cardiac, or oncology surgeries.",
    },
    problem: {
      id: "prob-hospital-ward-fatigue",
      title: "Inpatient Bedside Vigil Exhaustion & Ward Navigation",
      domain: "clinical_convalescence",
      description: "Hospital ward stays demand round-the-clock physical assistance for urinal use, mobility transfer, and nurse-call assistance.",
      consequence: "Severe family caregiver burnout, unassisted patient fall risks from hospital beds, and delayed recovery.",
    },
    solution: {
      id: "sol-bedside-hospital-vigil",
      name: "Inpatient Bedside Vigil & Patient Liaison",
      valueProposition: "Hospital-trained female attendants providing continuous ward vigilance, personal hygiene help, and nurse coordination.",
      keyDifferentiator: "Ward-certified attendants familiar with hospital floor protocols and nurse call bells.",
    },
    serviceSlug: "hospital-attendants",
    serviceName: "Hospital Assistance",
    serviceCategory: "healthcare",
    startingPrice: 1499,
    capability: {
      id: "CAP-112",
      name: "Inpatient Ward Vigil & Patient Ergonomics",
      domain: "Care Delivery",
      tier: "CORE",
      standardSLA: "12-hour night vigil or 24-hour continuous bed assignment",
    },
    pageRoute: "/services/hospital-attendants",
    primaryCta: {
      label: "Book Hospital Attendant",
      href: "/booking?service=hospital-attendants",
      variant: "default",
    },
    secondaryCta: {
      label: "Emergency Inpatient Request",
      href: "/contact",
    },
    outcomeMetric: {
      name: "Bedside Vigil Continuity & Zero Inpatient Falls",
      target: "100%",
      measurementMechanism: "Ward shift handover log & hospital discharge report",
    },
  },
  {
    id: "TAX-03",
    segment: {
      id: "seg-post-discharge-recovering",
      name: "Patients Discharged with Clinical Needs",
      category: "direct_recipient",
      description: "Patients discharged home requiring clinical nursing procedures under physician orders.",
      typicalProfile: "Patients recovering from surgery, wound management, or chronic infusion regimens.",
    },
    problem: {
      id: "prob-clinical-infection-wound-care",
      title: "Surgical Wound Infection Risk & Catheter Management",
      domain: "clinical_convalescence",
      description: "Non-medical attendants cannot legally perform sterile wound debridement, IV infusions, or catheter care at home.",
      consequence: "Hospital readmission from surgical site infections (SSI) or medication administration errors.",
    },
    solution: {
      id: "sol-skilled-clinical-nursing",
      name: "Certified Skilled Home Nursing Care",
      valueProposition: "Licensed GNM and B.Sc nurses providing doctor-prescription compliant clinical care, sterile dressings, and injections.",
      keyDifferentiator: "Strict separation between non-clinical attendant care and licensed medical nursing.",
    },
    serviceSlug: "nursing-services",
    serviceName: "Nursing Services",
    serviceCategory: "healthcare",
    startingPrice: 1999,
    capability: {
      id: "CAP-121",
      name: "Regulated Clinical Nursing & Aseptic Wound Protocol",
      domain: "Care Delivery",
      tier: "CORE",
      standardSLA: "2-hour visit, 12-hour clinical shift, or 24-hour ICU stepdown",
    },
    pageRoute: "/services/nursing-services",
    primaryCta: {
      label: "Book Nursing Care",
      href: "/booking?service=nursing-services",
      variant: "warm",
    },
    secondaryCta: {
      label: "Consult Nurse Supervisor",
      href: "/contact",
    },
    outcomeMetric: {
      name: "Surgical Site Aseptic Healing & Readmission Prevention",
      target: ">99%",
      measurementMechanism: "Physician clinical sign-off & nursing procedural documentation",
    },
  },
  {
    id: "TAX-04",
    segment: {
      id: "seg-first-time-mothers",
      name: "New Mothers & Nuclear Families",
      category: "direct_recipient",
      description: "First-time mothers recuperating from childbirth without local extended family presence.",
      typicalProfile: "Urban couples in nuclear households welcoming a newborn home after hospital delivery.",
    },
    problem: {
      id: "prob-maternal-exhaustion-infant-colic",
      title: "Severe Post-Partum Sleep Deprivation & Newborn Care Anxiety",
      domain: "maternal_recovery",
      description: "Recovering from delivery or C-section while navigating infant bath routines, colic soothing, and sleepless nights causes immense physical strain.",
      consequence: "Post-partum exhaustion, delayed incision healing, maternal anxiety, and feeding stress.",
    },
    solution: {
      id: "sol-post-natal-japa-care",
      name: "Traditional Maternal Healing & Newborn Japa Support",
      valueProposition: "Experienced post-natal female attendants supporting newborn oil massage, warm baths, and soothing so mothers sleep peacefully.",
      keyDifferentiator: "Vetted Japa caregivers combining traditional gentle care with strict infant hygiene and maternal convalescence.",
    },
    serviceSlug: "post-natal-care",
    serviceName: "Post-Natal Care",
    serviceCategory: "home",
    startingPrice: 1999,
    capability: {
      id: "CAP-131",
      name: "Maternal Convalescence & Newborn Handling Protocol",
      domain: "Care Delivery",
      tier: "CORE",
      standardSLA: "12-hour day assistance or 24-hour continuous live-in Japa shift",
    },
    pageRoute: "/services/post-natal-care",
    primaryCta: {
      label: "Book Post-Natal Care",
      href: "/booking?service=post-natal-care",
      variant: "warm",
    },
    secondaryCta: {
      label: "Chat with Maternal Advisor",
      href: "/contact",
    },
    outcomeMetric: {
      name: "Maternal Rest Hours & Infant Comfort Score",
      target: ">7 hours continuous maternal sleep/night",
      measurementMechanism: "Daily caregiver log & maternal wellness survey",
    },
  },
  {
    id: "TAX-05",
    segment: {
      id: "seg-senior-intercity-travellers",
      name: "Elderly & Vulnerable Railway Passengers",
      category: "direct_recipient",
      description: "Seniors boarding trains alone or navigating multi-platform terminal connections.",
      typicalProfile: "Aged 65+ traveling between South Indian cities (Chennai, Bengaluru, Coimbatore).",
    },
    problem: {
      id: "prob-railway-platform-navigation",
      title: "Railway Terminal Congestion, Footbridge Stairs & Luggage Burden",
      domain: "transit_vulnerability",
      description: "Navigating crowded railway stations with heavy bags and climbing steep overbridges causes immense physical stress and fall risks.",
      consequence: "Missed train connections, severe exhaustion, physical injury on platform stairs, and travel panic.",
    },
    solution: {
      id: "sol-railway-station-escort",
      name: "Dedicated Railway Platform-to-Berth Assisted Travel",
      valueProposition: "Trained female transit attendant meets you at the station porch, coordinates coolies, assists through platforms, and settles you in your coach berth.",
      keyDifferentiator: "Station portal protocol, luggage oversight, and verified coach seat settlement.",
    },
    serviceSlug: "railway-assistance",
    serviceName: "Railway Assistance",
    serviceCategory: "travel",
    startingPrice: 899,
    capability: {
      id: "CAP-211",
      name: "Station Porch-to-Berth Navigation & Boarding Protocol",
      domain: "Transit Safety",
      tier: "CORE",
      standardSLA: "Meet 45 minutes prior to scheduled train departure or arrival",
    },
    pageRoute: "/services/railway-assistance",
    primaryCta: {
      label: "Book Railway Assistance",
      href: "/booking?service=railway-assistance",
      variant: "default",
    },
    secondaryCta: {
      label: "WhatsApp Station Desk",
      href: "/contact",
    },
    outcomeMetric: {
      name: "On-Time Coach Boarding & Zero Transit Injury Rate",
      target: "100%",
      measurementMechanism: "SMS timestamp of coach seat settlement & family alert",
    },
  },
  {
    id: "TAX-06",
    segment: {
      id: "seg-solo-female-commuters",
      name: "Solo Female Tech Professionals & Executives",
      category: "direct_recipient",
      description: "Women commuting during night shifts, early airport departures, or unfamiliar business trips.",
      typicalProfile: "Software engineers, consultants, and corporate women in Bengaluru, Hyderabad, Chennai.",
    },
    problem: {
      id: "prob-late-night-commute-vulnerability",
      title: "Night Travel Harassment Risks, Cab Uncertainties & Driver Distrust",
      domain: "transit_vulnerability",
      description: "Late-night commutes in unfamiliar cabs or transit hubs introduce harassment concerns, unverified drivers, and safety anxieties.",
      consequence: "Severe travel distress, compromised personal safety, and career mobility restrictions.",
    },
    solution: {
      id: "sol-verified-women-chauffeuse",
      name: "Dedicated Women Chauffeur & Assisted Travel",
      valueProposition: "Licensed, police-verified women drivers for personal vehicle transit, airport pick-ups, or corporate day hire with live tracking.",
      keyDifferentiator: "Clean driving records, defensive driving certification, and GPS safety command center check-ins.",
    },
    serviceSlug: "women-drivers",
    serviceName: "Women Drivers",
    serviceCategory: "travel",
    startingPrice: 1199,
    capability: {
      id: "CAP-221",
      name: "Licensed Commercial Chauffeuse & Defensive Transit",
      domain: "Transit Safety",
      tier: "CORE",
      standardSLA: "On-demand trip, 4-hour city package, or outstation hire",
    },
    pageRoute: "/services/women-drivers",
    primaryCta: {
      label: "Book a Woman Driver",
      href: "/booking?service=women-drivers",
      variant: "warm",
    },
    secondaryCta: {
      label: "Corporate Transport Enquiry",
      href: "/contact",
    },
    outcomeMetric: {
      name: "Zero Security Incident Rate & Punctual Pickup %",
      target: "100% on-time, 0 incidents",
      measurementMechanism: "Live GPS trip telemetry and post-ride safety rating",
    },
  },
];

export function getTaxonomyByService(slug: string): TaxonomyRecord | undefined {
  return ENTERPRISE_TAXONOMY_MAP.find((item) => item.serviceSlug === slug);
}

export function getTaxonomyBySegment(segmentId: string): TaxonomyRecord[] {
  return ENTERPRISE_TAXONOMY_MAP.filter((item) => item.segment.id === segmentId);
}

export function getAllCapabilities(): CapabilityMapping[] {
  return ENTERPRISE_TAXONOMY_MAP.map((item) => item.capability);
}

export const CANONICAL_AUDIENCE_PATHWAYS: AudiencePathway[] = [
  {
    id: "aud-elderly-parents",
    slug: "families-elderly",
    title: "An Ageing Parent or Older Adult",
    eyebrow: "Geriatric Support",
    situation: "Parents living alone or needing gentle help with mobility, meals, and medication routines.",
    painPoint: "Worry about slips and falls, loneliness, skipped prescriptions, or declining stamina.",
    desiredOutcome: "Dignified independence at home with reliable daily companionship and physical safety.",
    recommendedServices: ["elderly-care", "nursing-services"],
    ctaLabel: "Explore Elder Care",
    ctaHref: "/solutions/families-elderly",
    status: "EXISTING_VERIFIED",
  },
  {
    id: "aud-post-hospital",
    slug: "post-hospitalization",
    title: "Someone Recovering After Hospitalization",
    eyebrow: "Convalescent Care",
    situation: "A loved one transitioning from hospital discharge to recovering at home after surgery or acute illness.",
    painPoint: "Surgical wound management, mobility weakness, catheter/IV care, and family exhaustion.",
    desiredOutcome: "Safe, peaceful recovery with professional bedside assistance and vitals tracking.",
    recommendedServices: ["hospital-attendants", "nursing-services"],
    ctaLabel: "Explore Recovery Support",
    ctaHref: "/solutions/post-hospitalization",
    status: "EXISTING_VERIFIED",
  },
  {
    id: "aud-new-mothers",
    slug: "new-mothers",
    title: "A New Mother or Newborn Situation",
    eyebrow: "Fourth Trimester",
    situation: "Exhausted parents adjusting to postpartum healing, infant soothing, and night sleep deprivation.",
    painPoint: "C-section recovery strain, nighttime feeding cycles, and lack of trusted traditional family help.",
    desiredOutcome: "Restorative night rest for mother and nurturing newborn oil massage and bathing.",
    recommendedServices: ["post-natal-care"],
    ctaLabel: "Explore Postpartum Care",
    ctaHref: "/solutions/new-mothers",
    status: "EXISTING_VERIFIED",
  },
  {
    id: "aud-travel-mobility",
    slug: "women-commuters",
    title: "Someone Needing Help Travelling or Getting Around",
    eyebrow: "Mobility & Assisted Travel",
    situation: "Vulnerable individuals, solo women, or elders requiring door-to-door transit protection.",
    painPoint: "Unsafe cabs, difficult station platforms, airport navigation hurdles, or luggage struggles.",
    desiredOutcome: "Punctual, vetted assisted travel in personal vehicles or at railway/airport stations.",
    recommendedServices: ["women-drivers", "airport-pickup", "railway-assistance", "travel-assistance"],
    ctaLabel: "Explore Transit Care",
    ctaHref: "/solutions/women-commuters",
    status: "EXISTING_VERIFIED",
  },
  {
    id: "aud-everyday-care",
    slug: "urban-professionals",
    title: "A Person Who Needs Everyday Assistance",
    eyebrow: "Daily Living",
    situation: "Individuals needing hands-on help with bathing, dressing, meal support, and light errands.",
    painPoint: "Loss of autonomy, struggle with activities of daily living (ADLs), or chronic fatigue.",
    desiredOutcome: "Respectful, discreet daily personal care delivered with patience and warmth.",
    recommendedServices: ["home-personal-care", "lifestyle-support"],
    ctaLabel: "Explore Personal Care",
    ctaHref: "/services/home-personal-care",
    status: "EXISTING_VERIFIED",
  },
  {
    id: "aud-family-coordinators",
    slug: "women-caregivers",
    title: "A Family Trying to Coordinate Care",
    eyebrow: "Caregiver Respite",
    situation: "Adult children balancing high-pressure employment with complex multi-family caregiving demands.",
    painPoint: "Caregiver burnout, coordinating multiple appointments, and anxiety while away at work.",
    desiredOutcome: "Transparent daily updates, dependable backup attendants, and complete peace of mind.",
    recommendedServices: ["elderly-care", "hospital-attendants", "nursing-services"],
    ctaLabel: "Explore Respite Care",
    ctaHref: "/solutions/women-caregivers",
    status: "EXISTING_VERIFIED",
  },
];

export const CANONICAL_NEEDS_DISCOVERY: NeedDiscoveryOption[] = [
  {
    id: "need-elderly-support",
    triggerPhrase: "I need help supporting an ageing parent",
    contextDescription: "Daily assistance with mobility, medication reminders, meal companionship, and fall prevention.",
    suggestedServiceSlug: "elderly-care",
    providerType: "General Duty Assistant (Attendant)",
    clinicalBoundary: "Non-clinical personal care. For injections, IVs, or catheter care, a registered nurse is required.",
    estimatedStartingPrice: 1299,
    priceUnit: "day",
    status: "EXISTING_VERIFIED",
    directActionHref: "/services/elderly-care",
  },
  {
    id: "need-hospital-homecoming",
    triggerPhrase: "Someone in my family is coming home from hospital",
    contextDescription: "Bedside assistance, patient transfer support, hygiene routines, and coordinating discharge recovery.",
    suggestedServiceSlug: "hospital-attendants",
    providerType: "General Duty Assistant (Attendant)",
    clinicalBoundary: "Supportive post-hospital care. Sterile wound dressings and clinical monitoring require licensed nursing.",
    estimatedStartingPrice: 1499,
    priceUnit: "day",
    status: "EXISTING_VERIFIED",
    directActionHref: "/services/hospital-attendants",
  },
  {
    id: "need-postpartum-support",
    triggerPhrase: "We need support after childbirth",
    contextDescription: "Specialized post-natal maternal rest, traditional newborn oil massage, infant bathing, and mother soothing.",
    suggestedServiceSlug: "post-natal-care",
    providerType: "General Duty Assistant (Attendant)",
    clinicalBoundary: "Non-clinical postpartum support. Medical neonatal complications require pediatrician hospital oversight.",
    estimatedStartingPrice: 1999,
    priceUnit: "day",
    status: "EXISTING_VERIFIED",
    directActionHref: "/services/post-natal-care",
  },
  {
    id: "need-safe-journey",
    triggerPhrase: "I need help arranging a journey",
    contextDescription: "Door-to-door assisted travel, women chauffeuse for personal cars, airport terminal assistance, or railway platform help.",
    suggestedServiceSlug: "women-drivers",
    providerType: "Licensed Driver / Assisted Travel",
    clinicalBoundary: "Defensive driving and assisted travel. Wheelchair transfers handled gently; emergency transport requires ambulance.",
    estimatedStartingPrice: 1199,
    priceUnit: "day",
    status: "EXISTING_VERIFIED",
    directActionHref: "/services/women-drivers",
  },
  {
    id: "need-everyday-care",
    triggerPhrase: "I need help with everyday care",
    contextDescription: "Dignified assistance with bathing, dressing, meal preparation accompaniment, and routine personal hygiene.",
    suggestedServiceSlug: "home-personal-care",
    providerType: "General Duty Assistant (Attendant)",
    clinicalBoundary: "Activities of daily living (ADL). Attendants do not perform invasive medical procedures.",
    estimatedStartingPrice: 1199,
    priceUnit: "day",
    status: "EXISTING_VERIFIED",
    directActionHref: "/services/home-personal-care",
  },
  {
    id: "need-clinical-nursing",
    triggerPhrase: "I need qualified medical procedures at home",
    contextDescription: "Doctor-prescribed injections, IV infusions, post-op sterile wound care, catheter care, and vitals monitoring.",
    suggestedServiceSlug: "nursing-services",
    providerType: "Registered Nurse (GNM / B.Sc)",
    clinicalBoundary: "Strictly performed under registered doctor's written prescription and medical guidelines.",
    estimatedStartingPrice: 1999,
    priceUnit: "day",
    status: "EXISTING_VERIFIED",
    directActionHref: "/services/nursing-services",
  },
  {
    id: "need-guidance-undecided",
    triggerPhrase: "I am not sure which service is suitable",
    contextDescription: "Speak directly with an empathetic care coordinator who will listen to your family circumstance and guide you.",
    suggestedServiceSlug: "elderly-care",
    providerType: "General Duty Assistant (Attendant)",
    clinicalBoundary: "Comprehensive needs assessment and transparent service matching with zero sales pressure.",
    estimatedStartingPrice: 1299,
    priceUnit: "day",
    status: "EXISTING_VERIFIED",
    directActionHref: "/contact",
  },
];

export const CANONICAL_CARE_OUTCOMES: HumanCareOutcome[] = [
  {
    id: "out-independence",
    title: "Maintaining Independence in Daily Routines",
    shortDescription: "Seniors continue living in the comfort of their familiar home environment.",
    intendedBenefit: "Gentle physical assistance without taking away autonomy or personal choices.",
    relevantServiceSlugs: ["elderly-care", "home-personal-care"],
  },
  {
    id: "out-everyday-dignity",
    title: "Receiving Respectful Everyday Assistance",
    shortDescription: "Help with bathing, mobility, and hygiene handled with patience and empathy.",
    intendedBenefit: "Dignified support from background-checked female caregivers trained in senior care.",
    relevantServiceSlugs: ["home-personal-care", "elderly-care"],
  },
  {
    id: "out-caregiver-peace",
    title: "Coordinating Family Caregiving with Calm",
    shortDescription: "Relief for working adult children through daily WhatsApp updates and 90-min backup.",
    intendedBenefit: "Work without constant anxiety knowing your loved one is in attentive hands.",
    relevantServiceSlugs: ["elderly-care", "hospital-attendants", "nursing-services"],
  },
  {
    id: "out-recovery-convalescence",
    title: "Accessing Appropriate Help During Recovery",
    shortDescription: "Dedicated support during the vulnerable weeks following hospital discharge.",
    intendedBenefit: "Reduction in fall risks, on-time medication logging, and peaceful convalescence.",
    relevantServiceSlugs: ["hospital-attendants", "nursing-services"],
  },
  {
    id: "out-maternal-rest",
    title: "Supporting Maternal Rest and Newborn Needs",
    shortDescription: "Restorative sleep for new mothers during the delicate fourth trimester.",
    intendedBenefit: "Experienced hands taking care of night burping, soothing, and traditional baby baths.",
    relevantServiceSlugs: ["post-natal-care"],
  },
  {
    id: "out-safe-journey",
    title: "Arranging an Accompanied Journey",
    shortDescription: "Door-to-door safety for women, elders, and patients travelling in unfamiliar settings.",
    intendedBenefit: "Verified women drivers and platform assistants assisting you every step of the way.",
    relevantServiceSlugs: ["women-drivers", "airport-pickup", "railway-assistance", "travel-assistance"],
  },
  {
    id: "out-professional-care",
    title: "Finding Appropriate, Qualified Professional Care",
    shortDescription: "Clear distinctions between non-clinical attendants and licensed clinical nurses.",
    intendedBenefit: "Prescription-compliant medical procedures delivered strictly by qualified GNM/B.Sc nurses.",
    relevantServiceSlugs: ["nursing-services"],
  },
];

export function validateTaxonomy(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const allIds = new Set<string>();

  for (const record of ENTERPRISE_TAXONOMY_MAP) {
    if (allIds.has(record.id)) {
      errors.push(`Duplicate record ID: ${record.id}`);
    }
    allIds.add(record.id);

    const foundService = SERVICES.find((s) => s.slug === record.serviceSlug);
    if (!foundService) {
      errors.push(`Taxonomy record ${record.id} references non-existent service: ${record.serviceSlug}`);
    }
  }

  for (const pathway of CANONICAL_AUDIENCE_PATHWAYS) {
    if (allIds.has(pathway.id)) {
      errors.push(`Duplicate audience ID: ${pathway.id}`);
    }
    allIds.add(pathway.id);

    for (const serviceSlug of pathway.recommendedServices) {
      if (!SERVICES.find((s) => s.slug === serviceSlug)) {
        errors.push(`Audience pathway ${pathway.id} references invalid service: ${serviceSlug}`);
      }
    }
  }

  for (const need of CANONICAL_NEEDS_DISCOVERY) {
    if (allIds.has(need.id)) {
      errors.push(`Duplicate need ID: ${need.id}`);
    }
    allIds.add(need.id);

    if (!SERVICES.find((s) => s.slug === need.suggestedServiceSlug)) {
      errors.push(`Need option ${need.id} references invalid service: ${need.suggestedServiceSlug}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
