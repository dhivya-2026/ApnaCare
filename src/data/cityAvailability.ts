/**
 * City-by-Service Availability & Regional Expansion Architecture — ApnaCare Phase 2
 *
 * Implements explicit operational readiness checking across active delivery clusters
 * and planned expansion cities, ensuring visitors receive honest availability without false claims.
 */

import { OperationalReadiness } from "./canonicalEcosystem";

export interface CityClusterConfig {
  slug: string;
  name: string;
  state: string;
  tier: "ACTIVE_METRO" | "PLANNED_EXPANSION";
  overallReadiness: OperationalReadiness;
  statusBadge: string;
  operationalClusterSLA: string; // e.g., "90-Min Regional Backup"
  commandCenterAddress?: string;
  coordinatorHelpline: string;
  coverageZones: Array<{
    name: string;
    type: "Core Cluster" | "Extended Corridor" | "Assessment Zone";
    readiness: OperationalReadiness;
  }>;
  operationalServices: string[];
  assessmentRequiredServices: string[];
  plannedServices: string[];
  expansionEvaluationNotes?: string;
}

export interface CityServiceAvailabilityResult {
  citySlug: string;
  cityName: string;
  serviceSlug: string;
  readiness: OperationalReadiness;
  canBookDirectly: boolean;
  requiresAssessment: boolean;
  isPlannedOnly: boolean;
  backupSLA: string | null;
  message: string;
  nextStepLabel: string;
  nextStepHref: string;
}

export const CANONICAL_CITY_CLUSTERS: CityClusterConfig[] = [
  // ==========================================
  // ACTIVE OPERATIONAL METROS (South India Core)
  // ==========================================
  {
    slug: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    tier: "ACTIVE_METRO",
    overallReadiness: "Operational",
    statusBadge: "Active Operating Hub",
    operationalClusterSLA: "90-Min Regional Backup Protocol",
    commandCenterAddress: "SafeHub Towers, 100 Feet Road, Indiranagar, Bengaluru 560038",
    coordinatorHelpline: "+91 88254 93949",
    coverageZones: [
      { name: "Indiranagar & Central", type: "Core Cluster", readiness: "Operational" },
      { name: "Koramangala & HSR Layout", type: "Core Cluster", readiness: "Operational" },
      { name: "Whitefield & ITPL Corridor", type: "Core Cluster", readiness: "Operational" },
      { name: "Jayanagar & JP Nagar", type: "Core Cluster", readiness: "Operational" },
      { name: "Malleshwaram & Rajajinagar", type: "Core Cluster", readiness: "Operational" },
      { name: "Hebbal & North Outer Ring Road", type: "Core Cluster", readiness: "Operational" },
      { name: "Electronic City Corridor", type: "Extended Corridor", readiness: "Operational" },
      { name: "Bannerghatta Road", type: "Extended Corridor", readiness: "Operational" },
      { name: "Kengeri & Mysore Road Suburbs", type: "Assessment Zone", readiness: "Assessment required" },
    ],
    operationalServices: [
      "elderly-care",
      "hospital-attendants",
      "nursing-services",
      "post-natal-care",
      "travel-assistance",
      "women-drivers",
      "airport-pickup",
      "railway-assistance",
      "home-personal-care",
      "lifestyle-support",
      "security-support",
    ],
    assessmentRequiredServices: [
      "specialized-dementia-care",
      "palliative-respite",
    ],
    plannedServices: [],
  },
  {
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    tier: "ACTIVE_METRO",
    overallReadiness: "Operational",
    statusBadge: "Active Operating Hub",
    operationalClusterSLA: "90-Min Regional Backup Protocol",
    commandCenterAddress: "CareTower, Anna Salai, T. Nagar, Chennai 600017",
    coordinatorHelpline: "+91 88254 93949",
    coverageZones: [
      { name: "T. Nagar & Nungambakkam", type: "Core Cluster", readiness: "Operational" },
      { name: "Adyar & Besant Nagar", type: "Core Cluster", readiness: "Operational" },
      { name: "Mylapore & Mandaveli", type: "Core Cluster", readiness: "Operational" },
      { name: "Anna Nagar & Kilpauk", type: "Core Cluster", readiness: "Operational" },
      { name: "Velachery & OMR IT Corridor", type: "Core Cluster", readiness: "Operational" },
      { name: "Greams Road Hospital Zone", type: "Core Cluster", readiness: "Operational" },
      { name: "Tambaram & Chromepet", type: "Extended Corridor", readiness: "Operational" },
      { name: "Porur & Vadapalani", type: "Extended Corridor", readiness: "Operational" },
      { name: "Avadi & Outer West", type: "Assessment Zone", readiness: "Assessment required" },
    ],
    operationalServices: [
      "elderly-care",
      "hospital-attendants",
      "nursing-services",
      "post-natal-care",
      "travel-assistance",
      "women-drivers",
      "airport-pickup",
      "railway-assistance",
      "home-personal-care",
      "lifestyle-support",
      "security-support",
    ],
    assessmentRequiredServices: [
      "specialized-dementia-care",
      "palliative-respite",
    ],
    plannedServices: [],
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    tier: "ACTIVE_METRO",
    overallReadiness: "Operational",
    statusBadge: "Active Operating Hub",
    operationalClusterSLA: "90-Min Regional Backup Protocol",
    commandCenterAddress: "CyberCare Complex, Hitec City, Madhapur, Hyderabad 500081",
    coordinatorHelpline: "+91 88254 93949",
    coverageZones: [
      { name: "Banjara Hills & Jubilee Hills", type: "Core Cluster", readiness: "Operational" },
      { name: "Hitec City, Madhapur & Kondapur", type: "Core Cluster", readiness: "Operational" },
      { name: "Gachibowli & Financial District", type: "Core Cluster", readiness: "Operational" },
      { name: "Kukatpally & Miyapur", type: "Core Cluster", readiness: "Operational" },
      { name: "Secunderabad & Begumpet", type: "Core Cluster", readiness: "Operational" },
      { name: "Somajiguda & Ameerpet", type: "Core Cluster", readiness: "Operational" },
      { name: "Uppal & LB Nagar", type: "Extended Corridor", readiness: "Operational" },
      { name: "Shamshabad Airport Corridor", type: "Extended Corridor", readiness: "Operational" },
      { name: "Kompally & Medchal", type: "Assessment Zone", readiness: "Assessment required" },
    ],
    operationalServices: [
      "elderly-care",
      "hospital-attendants",
      "nursing-services",
      "post-natal-care",
      "travel-assistance",
      "women-drivers",
      "airport-pickup",
      "railway-assistance",
      "home-personal-care",
      "lifestyle-support",
      "security-support",
    ],
    assessmentRequiredServices: [
      "specialized-dementia-care",
      "palliative-respite",
    ],
    plannedServices: [],
  },
  {
    slug: "coimbatore",
    name: "Coimbatore",
    state: "Tamil Nadu",
    tier: "ACTIVE_METRO",
    overallReadiness: "Operational",
    statusBadge: "Active Operating Hub",
    operationalClusterSLA: "90-Min Regional Backup Protocol",
    commandCenterAddress: "Greenway Hub, Avinashi Road, Peelamedu, Coimbatore 641004",
    coordinatorHelpline: "+91 88254 93949",
    coverageZones: [
      { name: "RS Puram & Saibaba Colony", type: "Core Cluster", readiness: "Operational" },
      { name: "Race Course & Gandhipuram", type: "Core Cluster", readiness: "Operational" },
      { name: "Peelamedu & Avinashi Road Corridor", type: "Core Cluster", readiness: "Operational" },
      { name: "Saravanampatti Tech Zone", type: "Core Cluster", readiness: "Operational" },
      { name: "Singanallur & Ramanathapuram", type: "Core Cluster", readiness: "Operational" },
      { name: "Vadavalli & Thondamuthur", type: "Extended Corridor", readiness: "Operational" },
      { name: "Pollachi Road & Kinathukadavu", type: "Assessment Zone", readiness: "Assessment required" },
    ],
    operationalServices: [
      "elderly-care",
      "hospital-attendants",
      "nursing-services",
      "post-natal-care",
      "travel-assistance",
      "airport-pickup",
      "railway-assistance",
      "home-personal-care",
      "lifestyle-support",
    ],
    assessmentRequiredServices: [
      "women-drivers",
      "security-support",
    ],
    plannedServices: [],
  },

  // ==========================================
  // PLANNED EXPANSION CITIES (Evaluation Phase)
  // ==========================================
  {
    slug: "kochi",
    name: "Kochi",
    state: "Kerala",
    tier: "PLANNED_EXPANSION",
    overallReadiness: "Planned",
    statusBadge: "Under Operational Evaluation",
    operationalClusterSLA: "Cluster Deployment in Progress",
    coordinatorHelpline: "+91 88254 93949",
    coverageZones: [
      { name: "Kakkanad & Infopark Corridor", type: "Assessment Zone", readiness: "Planned" },
      { name: "Ernakulam City & Panampilly Nagar", type: "Assessment Zone", readiness: "Planned" },
      { name: "Aluva & Nedumbassery Airport Corridor", type: "Assessment Zone", readiness: "Planned" },
    ],
    operationalServices: [],
    assessmentRequiredServices: [
      "travel-assistance", // Inter-city transit to/from Bengaluru/Chennai
      "airport-pickup",
    ],
    plannedServices: [
      "elderly-care",
      "hospital-attendants",
      "nursing-services",
      "post-natal-care",
    ],
    expansionEvaluationNotes:
      "Operational evaluation underway focusing on NRI family eldercare demand and vetted Malayalam-speaking attendants. We accept advance expressions of interest but do not offer instant 90-min dispatch until regional cluster staffing completes.",
  },
  {
    slug: "mysuru",
    name: "Mysuru",
    state: "Karnataka",
    tier: "PLANNED_EXPANSION",
    overallReadiness: "Planned",
    statusBadge: "Under Operational Evaluation",
    operationalClusterSLA: "Bengaluru Corridor Dispatch",
    coordinatorHelpline: "+91 88254 93949",
    coverageZones: [
      { name: "Gokulam & Jayalakshmipuram", type: "Assessment Zone", readiness: "Planned" },
      { name: "Saraswathipuram & Kuvempunagar", type: "Assessment Zone", readiness: "Planned" },
      { name: "Vijayanagar & Hootagalli", type: "Assessment Zone", readiness: "Planned" },
    ],
    operationalServices: [],
    assessmentRequiredServices: [
      "elderly-care", // Dispatched upon 48-hr advance review from Bengaluru corridor
      "travel-assistance",
    ],
    plannedServices: [
      "hospital-attendants",
      "nursing-services",
      "post-natal-care",
    ],
    expansionEvaluationNotes:
      "Evaluated as an extension of the Bengaluru-Mysuru expressway corridor. 24-hr live-in eldercare can be arranged on a scheduled 48-hr assessment basis.",
  },
  {
    slug: "pune",
    name: "Pune",
    state: "Maharashtra",
    tier: "PLANNED_EXPANSION",
    overallReadiness: "Planned",
    statusBadge: "Under Operational Evaluation",
    operationalClusterSLA: "Cluster Deployment in Progress",
    coordinatorHelpline: "+91 88254 93949",
    coverageZones: [
      { name: "Kothrud & Deccan", type: "Assessment Zone", readiness: "Planned" },
      { name: "Hinjawadi IT Corridor & Wakad", type: "Assessment Zone", readiness: "Planned" },
      { name: "Kalyani Nagar & Viman Nagar", type: "Assessment Zone", readiness: "Planned" },
    ],
    operationalServices: [],
    assessmentRequiredServices: [
      "corporate-caregiving-support",
    ],
    plannedServices: [
      "elderly-care",
      "hospital-attendants",
      "nursing-services",
    ],
    expansionEvaluationNotes:
      "Market feasibility study active for West India tech corridor. Families can register interest to receive updates when vetted Marathi and Hindi attendant rosters launch.",
  },
  {
    slug: "visakhapatnam",
    name: "Visakhapatnam",
    state: "Andhra Pradesh",
    tier: "PLANNED_EXPANSION",
    overallReadiness: "Planned",
    statusBadge: "Under Operational Evaluation",
    operationalClusterSLA: "Cluster Deployment in Progress",
    coordinatorHelpline: "+91 88254 93949",
    coverageZones: [
      { name: "MVP Colony & Beach Road", type: "Assessment Zone", readiness: "Planned" },
      { name: "Siripuram & Waltair", type: "Assessment Zone", readiness: "Planned" },
    ],
    operationalServices: [],
    assessmentRequiredServices: [
      "travel-assistance",
    ],
    plannedServices: [
      "elderly-care",
      "hospital-attendants",
    ],
    expansionEvaluationNotes:
      "Assessing healthcare and retirement community needs along coastal Andhra. Expressions of interest welcome.",
  },
];

/**
 * Checks exact city and service combination availability
 */
export function checkCityServiceAvailability(
  citySlug: string,
  serviceSlug: string
): CityServiceAvailabilityResult {
  const city = CANONICAL_CITY_CLUSTERS.find(
    (c) => c.slug.toLowerCase() === citySlug.toLowerCase()
  );

  if (!city) {
    return {
      citySlug,
      cityName: citySlug,
      serviceSlug,
      readiness: "Unavailable",
      canBookDirectly: false,
      requiresAssessment: true,
      isPlannedOnly: false,
      backupSLA: null,
      message: `ApnaCare does not currently operate in ${citySlug}. We can discuss custom arrangements or refer trusted regional resources.`,
      nextStepLabel: "Contact Coordinator",
      nextStepHref: "/contact",
    };
  }

  // Active Metro with verified service
  if (city.operationalServices.includes(serviceSlug)) {
    return {
      citySlug: city.slug,
      cityName: city.name,
      serviceSlug,
      readiness: "Operational",
      canBookDirectly: true,
      requiresAssessment: false,
      isPlannedOnly: false,
      backupSLA: city.operationalClusterSLA,
      message: `Operational across all major localities in ${city.name} with verified attendants and a guaranteed 90-minute regional backup protocol.`,
      nextStepLabel: `Book in ${city.name}`,
      nextStepHref: `/booking?city=${city.name}&service=${serviceSlug}`,
    };
  }

  // Service requiring special assessment in this city
  if (city.assessmentRequiredServices.includes(serviceSlug)) {
    return {
      citySlug: city.slug,
      cityName: city.name,
      serviceSlug,
      readiness: "Assessment required",
      canBookDirectly: false,
      requiresAssessment: true,
      isPlannedOnly: false,
      backupSLA: city.operationalClusterSLA,
      message: `Available in ${city.name} following an individual care-needs review by our regional coordinator to match qualified personnel.`,
      nextStepLabel: "Request Care Assessment",
      nextStepHref: `/contact?intent=assessment&city=${city.name}&service=${serviceSlug}`,
    };
  }

  // Planned expansion city
  if (city.tier === "PLANNED_EXPANSION") {
    return {
      citySlug: city.slug,
      cityName: city.name,
      serviceSlug,
      readiness: "Planned",
      canBookDirectly: false,
      requiresAssessment: false,
      isPlannedOnly: true,
      backupSLA: null,
      message: `ApnaCare is currently setting up caregiver clusters in ${city.name}. Express interest to be notified when bookings open in your neighborhood.`,
      nextStepLabel: `Express Interest in ${city.name}`,
      nextStepHref: `/contact?intent=city_interest&city=${city.name}&service=${serviceSlug}`,
    };
  }

  // Not offered in this specific city
  return {
    citySlug: city.slug,
    cityName: city.name,
    serviceSlug,
    readiness: "Unavailable",
    canBookDirectly: false,
    requiresAssessment: false,
    isPlannedOnly: false,
    backupSLA: null,
    message: `This service is currently unavailable in ${city.name}. Explore alternative care offerings or contact our care team.`,
    nextStepLabel: "View Available Services",
    nextStepHref: `/cities/${city.slug}`,
  };
}

export const getOperationalCities = () =>
  CANONICAL_CITY_CLUSTERS.filter((c) => c.tier === "ACTIVE_METRO");

export const getPlannedExpansionCities = () =>
  CANONICAL_CITY_CLUSTERS.filter((c) => c.tier === "PLANNED_EXPANSION");
