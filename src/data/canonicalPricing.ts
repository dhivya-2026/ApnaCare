/**
 * Canonical Pricing Engine & Credible Commercial Strategy — ApnaCare Phase 2
 *
 * Implements audited rate structures, explicit pricing types (Confirmed vs Starting vs Assessment),
 * shift duration assumptions, and transparent GST disclosure rules.
 */

export type PricingType = "Confirmed" | "Starting price" | "Indicative estimate" | "Assessment required";

export interface ServicePricingModel {
  serviceSlug: string;
  serviceName: string;
  category: "home" | "healthcare" | "safety" | "travel" | "lifestyle";
  pricingType: PricingType;
  baseUnit: "day" | "procedure" | "trip" | "hour";
  pricingTiers: {
    shift8Hr?: number;
    shift12Hr?: number;
    shift24HrLiveIn?: number;
    perVisit?: number;
    perTrip?: number;
  };
  startingPrice: number;
  taxTreatment: {
    gstRate: number; // 0.18
    sacCode: string; // "9993"
    label: string; // "+ 18% statutory GST with official tax invoice"
    reimbursementEligible: boolean;
  };
  minimumEngagement: string;
  depositRequired: boolean;
  brokerFee: number; // 0
  replacementCost: number; // 0 (covered under 90-min SLA)
  shiftAssumptions: string;
  marketBenchmark: {
    cityAverages: Record<string, string>; // e.g., { Bengaluru: "₹1,200 - ₹1,600", Chennai: "₹1,100 - ₹1,500" }
    marketReferenceNote: string;
  };
}

export const CANONICAL_SERVICE_PRICING: Record<string, ServicePricingModel> = {
  "elderly-care": {
    serviceSlug: "elderly-care",
    serviceName: "Elderly Care at Home",
    category: "home",
    pricingType: "Confirmed",
    baseUnit: "day",
    pricingTiers: {
      shift8Hr: 1099,
      shift12Hr: 1299,
      shift24HrLiveIn: 1799,
    },
    startingPrice: 1299,
    taxTreatment: {
      gstRate: 0.18,
      sacCode: "9993",
      label: "+ 18% statutory GST with official tax invoice",
      reimbursementEligible: true,
    },
    minimumEngagement: "1 Day (Flexible trial) or 7/14/30-Day Care Packages",
    depositRequired: false,
    brokerFee: 0,
    replacementCost: 0,
    shiftAssumptions: "8-hr morning/day shift, 12-hr day/night shift, or 24-hr live-in residential presence.",
    marketBenchmark: {
      cityAverages: {
        Bengaluru: "₹1,200 – ₹1,700 / day",
        Chennai: "₹1,100 – ₹1,500 / day",
        Hyderabad: "₹1,200 – ₹1,600 / day",
        Coimbatore: "₹1,000 – ₹1,400 / day",
      },
      marketReferenceNote: "Competitive with verified agency averages; ApnaCare includes priority cluster backup protocol and zero broker commissions.",
    },
  },
  "hospital-attendants": {
    serviceSlug: "hospital-attendants",
    serviceName: "Hospital Bedside Assistance",
    category: "healthcare",
    pricingType: "Confirmed",
    baseUnit: "day",
    pricingTiers: {
      shift12Hr: 1499,
      shift24HrLiveIn: 2099,
    },
    startingPrice: 1499,
    taxTreatment: {
      gstRate: 0.18,
      sacCode: "9993",
      label: "+ 18% statutory GST with official tax invoice",
      reimbursementEligible: true,
    },
    minimumEngagement: "1 Day / Single 12-hr night shift",
    depositRequired: false,
    brokerFee: 0,
    replacementCost: 0,
    shiftAssumptions: "12-hr day vigil, 12-hr night vigil, or 24-hr continuous two-shift bedside assignment.",
    marketBenchmark: {
      cityAverages: {
        Bengaluru: "₹1,400 – ₹1,900 / 12h shift",
        Chennai: "₹1,300 – ₹1,800 / 12h shift",
        Hyderabad: "₹1,400 – ₹1,850 / 12h shift",
        Coimbatore: "₹1,200 – ₹1,600 / 12h shift",
      },
      marketReferenceNote: "Inpatient bedside care prices match tier-1 tertiary hospital attendant desks without unannounced floor commissions.",
    },
  },
  "nursing-services": {
    serviceSlug: "nursing-services",
    serviceName: "Certified Clinical Home Nursing",
    category: "healthcare",
    pricingType: "Confirmed",
    baseUnit: "procedure",
    pricingTiers: {
      perVisit: 899,
      shift8Hr: 1699,
      shift12Hr: 1999,
      shift24HrLiveIn: 3199,
    },
    startingPrice: 1999,
    taxTreatment: {
      gstRate: 0.18,
      sacCode: "9993",
      label: "+ 18% statutory GST with official tax invoice",
      reimbursementEligible: true,
    },
    minimumEngagement: "Per Procedure Visit or 3-Day Clinical Course",
    depositRequired: false,
    brokerFee: 0,
    replacementCost: 0,
    shiftAssumptions: "Procedure-based clinical visits (e.g., sterile dressing/catheter) or 8-12h clinical shift monitoring.",
    marketBenchmark: {
      cityAverages: {
        Bengaluru: "₹1,800 – ₹2,500 / 12h RN shift",
        Chennai: "₹1,600 – ₹2,200 / 12h RN shift",
        Hyderabad: "₹1,700 – ₹2,400 / 12h RN shift",
        Coimbatore: "₹1,500 – ₹2,000 / 12h RN shift",
      },
      marketReferenceNote: "Requires registered GNM / B.Sc credentials; pricing strictly distinguishes medical nursing from general attendants.",
    },
  },
  "post-natal-care": {
    serviceSlug: "post-natal-care",
    serviceName: "Post-Natal Maternal & Newborn Support",
    category: "home",
    pricingType: "Confirmed",
    baseUnit: "day",
    pricingTiers: {
      shift12Hr: 1999,
      shift24HrLiveIn: 2799,
    },
    startingPrice: 1999,
    taxTreatment: {
      gstRate: 0.18,
      sacCode: "9993",
      label: "+ 18% statutory GST with official tax invoice",
      reimbursementEligible: true,
    },
    minimumEngagement: "7 Days (Trial) or Standard 28/42-Day Confinement Package",
    depositRequired: false,
    brokerFee: 0,
    replacementCost: 0,
    shiftAssumptions: "12-hr night maternal rest shift or 24-hr live-in traditional japa accompaniment.",
    marketBenchmark: {
      cityAverages: {
        Bengaluru: "₹50,000 – ₹80,000 / month (Live-in)",
        Chennai: "₹45,000 – ₹75,000 / month (Live-in)",
        Hyderabad: "₹48,000 – ₹78,000 / month (Live-in)",
        Coimbatore: "₹40,000 – ₹65,000 / month (Live-in)",
      },
      marketReferenceNote: "Daily rate transparently avoids lump-sum unrefundable agency upfront fees common with unorganized domestic helpers.",
    },
  },
  "travel-assistance": {
    serviceSlug: "travel-assistance",
    serviceName: "Travel & Mobility Assistance",
    category: "travel",
    pricingType: "Confirmed",
    baseUnit: "trip",
    pricingTiers: {
      perTrip: 999,
      shift8Hr: 1499,
    },
    startingPrice: 999,
    taxTreatment: {
      gstRate: 0.18,
      sacCode: "9993",
      label: "+ 18% statutory GST with official tax invoice",
      reimbursementEligible: true,
    },
    minimumEngagement: "Single journey / Half-day transit",
    depositRequired: false,
    brokerFee: 0,
    replacementCost: 0,
    shiftAssumptions: "Up to 4 hours per transit trip or 8 hours for full-day clinic/outstation accompaniment.",
    marketBenchmark: {
      cityAverages: {
        Bengaluru: "₹800 – ₹1,500 / transit",
        Chennai: "₹750 – ₹1,300 / transit",
        Hyderabad: "₹800 – ₹1,400 / transit",
        Coimbatore: "₹600 – ₹1,100 / transit",
      },
      marketReferenceNote: "Includes live family WhatsApp tracking and verified ID badge accompaniment.",
    },
  },
  "women-drivers": {
    serviceSlug: "women-drivers",
    serviceName: "Professional Women Chauffeuses",
    category: "travel",
    pricingType: "Confirmed",
    baseUnit: "day",
    pricingTiers: {
      shift8Hr: 1199,
      shift12Hr: 1499,
    },
    startingPrice: 1199,
    taxTreatment: {
      gstRate: 0.18,
      sacCode: "9993",
      label: "+ 18% statutory GST with official tax invoice",
      reimbursementEligible: true,
    },
    minimumEngagement: "Single Day Shift or Monthly Corporate/Family Retainer",
    depositRequired: false,
    brokerFee: 0,
    replacementCost: 0,
    shiftAssumptions: "8-hour day duty in customer's personal vehicle, overtime at ₹120/hour.",
    marketBenchmark: {
      cityAverages: {
        Bengaluru: "₹1,100 – ₹1,600 / day",
        Chennai: "₹1,000 – ₹1,400 / day",
        Hyderabad: "₹1,100 – ₹1,500 / day",
        Coimbatore: "₹900 – ₹1,300 / day",
      },
      marketReferenceNote: "Commercial badge drivers with defensive driving training and police verification.",
    },
  },
  "home-personal-care": {
    serviceSlug: "home-personal-care",
    serviceName: "Home & Personal Care",
    category: "home",
    pricingType: "Confirmed",
    baseUnit: "day",
    pricingTiers: {
      shift8Hr: 1099,
      shift12Hr: 1299,
    },
    startingPrice: 1099,
    taxTreatment: {
      gstRate: 0.18,
      sacCode: "9993",
      label: "+ 18% statutory GST with official tax invoice",
      reimbursementEligible: true,
    },
    minimumEngagement: "1 Day (Flexible trial)",
    depositRequired: false,
    brokerFee: 0,
    replacementCost: 0,
    shiftAssumptions: "8-hr morning/day personal grooming and hygiene shift.",
    marketBenchmark: {
      cityAverages: {
        Bengaluru: "₹1,000 – ₹1,500 / day",
        Chennai: "₹950 – ₹1,400 / day",
        Hyderabad: "₹1,000 – ₹1,450 / day",
        Coimbatore: "₹900 – ₹1,300 / day",
      },
      marketReferenceNote: "Non-clinical hygiene and bathroom safety assistance.",
    },
  },
  "airport-pickup": {
    serviceSlug: "airport-pickup",
    serviceName: "Airport Meet & Greet Assisted Travel",
    category: "travel",
    pricingType: "Confirmed",
    baseUnit: "trip",
    pricingTiers: {
      perTrip: 899,
    },
    startingPrice: 899,
    taxTreatment: {
      gstRate: 0.18,
      sacCode: "9993",
      label: "+ 18% statutory GST with official tax invoice",
      reimbursementEligible: true,
    },
    minimumEngagement: "Single Terminal Arrival or Departure (Up to 3.5 hours)",
    depositRequired: false,
    brokerFee: 0,
    replacementCost: 0,
    shiftAssumptions: "Meeting at arrival gate, luggage assistance, and vehicle handover.",
    marketBenchmark: {
      cityAverages: {
        Bengaluru: "₹800 – ₹1,400",
        Chennai: "₹750 – ₹1,200",
        Hyderabad: "₹800 – ₹1,300",
        Coimbatore: "₹650 – ₹1,000",
      },
      marketReferenceNote: "Includes flight delay buffer up to 90 minutes without surcharge.",
    },
  },
  "railway-assistance": {
    serviceSlug: "railway-assistance",
    serviceName: "Railway Platform Assistance",
    category: "travel",
    pricingType: "Confirmed",
    baseUnit: "trip",
    pricingTiers: {
      perTrip: 699,
    },
    startingPrice: 699,
    taxTreatment: {
      gstRate: 0.18,
      sacCode: "9993",
      label: "+ 18% statutory GST with official tax invoice",
      reimbursementEligible: true,
    },
    minimumEngagement: "Single Train Boarding / Deboarding (Up to 2.5 hours)",
    depositRequired: false,
    brokerFee: 0,
    replacementCost: 0,
    shiftAssumptions: "Meeting at station porch, porter coordination, and coach seat accompaniment.",
    marketBenchmark: {
      cityAverages: {
        Bengaluru: "₹600 – ₹1,000",
        Chennai: "₹550 – ₹900",
        Hyderabad: "₹600 – ₹950",
        Coimbatore: "₹500 – ₹800",
      },
      marketReferenceNote: "Porter fee reimbursed at actuals; accompaniment fee fixed.",
    },
  },
  "lifestyle-support": {
    serviceSlug: "lifestyle-support",
    serviceName: "Errand & Lifestyle Accompaniment",
    category: "lifestyle",
    pricingType: "Confirmed",
    baseUnit: "day",
    pricingTiers: {
      shift8Hr: 899,
    },
    startingPrice: 899,
    taxTreatment: {
      gstRate: 0.18,
      sacCode: "9993",
      label: "+ 18% statutory GST with official tax invoice",
      reimbursementEligible: true,
    },
    minimumEngagement: "Single 4-8 Hour Session",
    depositRequired: false,
    brokerFee: 0,
    replacementCost: 0,
    shiftAssumptions: "Clinic visits, temple visits, and social errand accompaniment.",
    marketBenchmark: {
      cityAverages: {
        Bengaluru: "₹800 – ₹1,200 / day",
        Chennai: "₹700 – ₹1,100 / day",
        Hyderabad: "₹750 – ₹1,150 / day",
        Coimbatore: "₹650 – ₹1,000 / day",
      },
      marketReferenceNote: "Friendly companionship; travel fares covered separately.",
    },
  },
  "security-support": {
    serviceSlug: "security-support",
    serviceName: "Custom Safety & Event Assisted Travel",
    category: "safety",
    pricingType: "Confirmed",
    baseUnit: "day",
    pricingTiers: {
      shift8Hr: 1899,
      shift12Hr: 2399,
    },
    startingPrice: 1899,
    taxTreatment: {
      gstRate: 0.18,
      sacCode: "9993",
      label: "+ 18% statutory GST with official tax invoice",
      reimbursementEligible: true,
    },
    minimumEngagement: "Single 8-Hour Event Shift or Night Standby",
    depositRequired: false,
    brokerFee: 0,
    replacementCost: 0,
    shiftAssumptions: "Event entrance safety, solo woman commuter transit standby.",
    marketBenchmark: {
      cityAverages: {
        Bengaluru: "₹1,800 – ₹2,800 / shift",
        Chennai: "₹1,600 – ₹2,500 / shift",
        Hyderabad: "₹1,700 – ₹2,600 / shift",
        Coimbatore: "₹1,500 – ₹2,200 / shift",
      },
      marketReferenceNote: "PSARA compliant background checks; unarmed assisted travel duty.",
    },
  },
  "care-coordination": {
    serviceSlug: "care-coordination",
    serviceName: "Dedicated Care Coordination & Remote Family Support",
    category: "healthcare",
    pricingType: "Confirmed",
    baseUnit: "day",
    pricingTiers: {
      shift8Hr: 499,
      shift12Hr: 699,
    },
    startingPrice: 499,
    taxTreatment: {
      gstRate: 0.18,
      sacCode: "9993",
      label: "+ 18% statutory GST with official tax invoice",
      reimbursementEligible: true,
    },
    minimumEngagement: "Weekly or Monthly Care Management Plan",
    depositRequired: false,
    brokerFee: 0,
    replacementCost: 0,
    shiftAssumptions: "Dedicated case manager, daily WhatsApp summaries, and doctor appointment coordination.",
    marketBenchmark: {
      cityAverages: {
        Bengaluru: "₹500 – ₹1,000 / week",
        Chennai: "₹450 – ₹900 / week",
        Hyderabad: "₹450 – ₹950 / week",
        Coimbatore: "₹400 – ₹800 / week",
      },
      marketReferenceNote: "Includes single-point-of-contact coordinator and WhatsApp updates.",
    },
  },
};

export function getCanonicalPricing(slug: string): ServicePricingModel | undefined {
  return CANONICAL_SERVICE_PRICING[slug];
}
