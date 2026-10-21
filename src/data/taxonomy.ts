/**
 * Master Enterprise Taxonomy & Relationship Engine — ApnaCare
 *
 * Implements the multidomain mapping connecting:
 * Customer Segment → Customer Problem → Solution → Service → Capability → Page Route → CTA → Outcome Metric
 */

import { SERVICES, CITIES, SITE, type Service, type ServiceCategory } from "./site";

export type HeatMapTier = "CORE" | "GROWTH" | "EMERGING" | "STRATEGIC";

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
      name: "Dedicated Railway Platform-to-Berth Escort",
      valueProposition: "Trained female transit attendant meets you at the station porch, coordinates coolies, escorts through platforms, and settles you in your coach berth.",
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
      name: "Dedicated Women Chauffeur & Mobility Escort",
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
