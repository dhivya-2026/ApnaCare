/**
 * Central Brand Strategy, Life-Stage Experience & Vertical Architecture for LifeSakhi.
 *
 * Strictly distinguishes verified operational services (under Care & Assistance and
 * active SHG outreach) from proposed/expanding strategic verticals.
 */

export type VerticalReadiness =
  | "Operational Now"
  | "Active Outreach & Expanding"
  | "Proposed Programme";

export interface LifeStage {
  id: string;
  stepNumber: string;
  stageName: string;
  ageContext: string;
  headline: string;
  challenges: string;
  supportNeeded: string;
  howLifeSakhiContributes: string;
  programmesOrServices: string[];
  status: VerticalReadiness;
  ctaLabel: string;
  ctaTo: string;
  accentColor: "primary" | "terracotta" | "plum";
}

export interface LifeSakhiPillar {
  id: string;
  code: string;
  title: string;
  readiness: VerticalReadiness;
  summary: string;
  focusAreas: string[];
  ctaLabel: string;
  ctaTo: string;
  accent: "primary" | "terracotta" | "plum";
}

export const LIFESAKHI_BRAND = {
  name: "LifeSakhi",
  tagline: "Empowering Women. Enriching Lives.",
  supportingMessage: "Every Girl. Every Woman. Every Stage.",
  heroDescription:
    "From the beginning of a girl's journey to the golden years of a woman's life, LifeSakhi stands for development, dignity, wellbeing and opportunity.",
  philosophyStatement:
    "Women empowered → Families strengthened → Children supported → Communities developed → Future generations empowered.",
  philosophySummary:
    "LifeSakhi brings together two reinforcing commitments: supporting women and children through every chapter of life, while creating dignified training, employment, and leadership pathways for women across South India.",
} as const;

export const LIFE_STAGES: LifeStage[] = [
  {
    id: "birth-early-childhood",
    stepNumber: "01",
    stageName: "Birth & Early Childhood",
    ageContext: "0–5 Years",
    headline: "A safe, healthy, and nurtured beginning for every girl child.",
    challenges:
      "Maternal recovery fatigue, newborn care anxiety, and early nutrition or safety gaps in nuclear and working families.",
    supportNeeded:
      "Trained newborn care support, safe early-childhood environments, and maternal rest during the crucial early months.",
    howLifeSakhiContributes:
      "Operational postnatal and newborn support through vetted caregivers today, alongside proposed early-childhood development initiatives.",
    programmesOrServices: [
      "Postnatal & Newborn Care Support (Operational)",
      "Maternal Recovery & Night-Vigil Assistance (Operational)",
      "Early Childhood Learning & Nutrition Awareness (Proposed)",
    ],
    status: "Operational Now",
    ctaLabel: "Explore Maternal & Newborn Care",
    ctaTo: "/services/post-natal-care",
    accentColor: "terracotta",
  },
  {
    id: "childhood-development",
    stepNumber: "02",
    stageName: "Childhood & Development",
    ageContext: "6–12 Years",
    headline: "Foundational learning, nutrition, and protection.",
    challenges:
      "Unequal access to foundational learning, personal safety awareness, and consistent nutritional and emotional support.",
    supportNeeded:
      "Safe community spaces, foundational education support, child safety guidance, and family encouragement.",
    howLifeSakhiContributes:
      "LifeSakhi is designing community-led child development and safety education initiatives in collaboration with local partners.",
    programmesOrServices: [
      "Educational Child Safety Guides (Active Resource)",
      "Girl Child Learning & Nutrition Support (Proposed)",
      "Community Protection & Wellbeing Outreach (Proposed)",
    ],
    status: "Proposed Programme",
    ctaLabel: "Partner on Child Development",
    ctaTo: "/get-involved",
    accentColor: "plum",
  },
  {
    id: "adolescence-growing-up",
    stepNumber: "03",
    stageName: "Adolescence & Growing Up",
    ageContext: "13–18 Years",
    headline: "Confidence, health literacy, and life skills for young women.",
    challenges:
      "Menstrual and preventive health stigma, digital and physical safety concerns, and limited guidance on future career pathways.",
    supportNeeded:
      "Preventive health awareness, life-skills mentoring, safe mobility, and exposure to vocational and educational opportunities.",
    howLifeSakhiContributes:
      "Building adolescent health awareness and life-skills modules to help girls transition into adulthood with confidence.",
    programmesOrServices: [
      "Adolescent Health & Hygiene Awareness (Proposed)",
      "Life Skills & Confidence Mentoring (Proposed)",
      "Safe Assisted Transit for Young Commuters (Operational)",
    ],
    status: "Proposed Programme",
    ctaLabel: "Explore Our Pillars",
    ctaTo: "/pillars",
    accentColor: "plum",
  },
  {
    id: "young-adulthood-independence",
    stepNumber: "04",
    stageName: "Young Adulthood & Independence",
    ageContext: "18–35 Years",
    headline: "Vocational skills, dignified employment, and financial agency.",
    challenges:
      "Barriers to formal employment, lack of structured vocational training, and unsafe or informal working conditions.",
    supportNeeded:
      "Structured skill development, police-verified professional credentials, fair compensation, and women-led community networks.",
    howLifeSakhiContributes:
      "Through Women Self-Help Group (SHG) outreach led by Prof. Shoba T, women gain vocational caregiving training and dignified employment as Saha professionals.",
    programmesOrServices: [
      "Become a Verified Saha Care Companion (Operational)",
      "Women SHG Vocational Caregiving Training (Active Outreach)",
      "Women Entrepreneurship & Leadership Pathways (Proposed)",
    ],
    status: "Active Outreach & Expanding",
    ctaLabel: "Join as a Saha",
    ctaTo: "/become-an-attendant",
    accentColor: "primary",
  },
  {
    id: "womanhood-motherhood",
    stepNumber: "05",
    stageName: "Womanhood & Motherhood",
    ageContext: "Maternity, Career & Family",
    headline: "Supporting mothers, working women, and family caregivers.",
    challenges:
      "Women disproportionately shoulder simultaneous responsibilities—career, motherhood, hospital vigils, and ageing parents—often without respite.",
    supportNeeded:
      "Reliable postnatal support, hospital bedside assistance, safe commute options, and trustworthy home care respite.",
    howLifeSakhiContributes:
      "Operational Care & Assistance services step in beside working women and mothers so they never have to sacrifice their own health or livelihood.",
    programmesOrServices: [
      "Postnatal & Fourth-Trimester Support (Operational)",
      "Hospital Bedside Assistance & Nursing (Operational)",
      "Family Respite & Safe Women Commutes (Operational)",
    ],
    status: "Operational Now",
    ctaLabel: "Request Family Support",
    ctaTo: "/booking",
    accentColor: "terracotta",
  },
  {
    id: "ageing-elderhood",
    stepNumber: "06",
    stageName: "Ageing & Elderhood",
    ageContext: "Senior Years",
    headline: "Living the later years with safety, companionship, and dignity.",
    challenges:
      "Loneliness, mobility decline, post-surgical recovery, and chronic care needs—especially when children live in other cities or abroad.",
    supportNeeded:
      "Consistent, empathetic daily companionship, mobility transfer assistance, medication routines, and licensed home nursing when prescribed.",
    howLifeSakhiContributes:
      "Police-verified Saha companions and registered GNM/B.Sc. nurses deliver structured in-home elderly care across South India.",
    programmesOrServices: [
      "Elderly Care & Daily Companionship (Operational)",
      "Certified Home Nursing — GNM / B.Sc. (Operational)",
      "Assisted Airport & Railway Travel (Operational)",
    ],
    status: "Operational Now",
    ctaLabel: "Explore Elderly Care",
    ctaTo: "/services/elderly-care",
    accentColor: "primary",
  },
];

export const LIFESAKHI_PILLARS: LifeSakhiPillar[] = [
  {
    id: "care-and-assistance",
    code: "01",
    title: "LifeSakhi — Care & Assistance",
    readiness: "Operational Now",
    summary:
      "Retains and strengthens all active care operations across Bengaluru, Chennai, Hyderabad, and Coimbatore with police-verified Saha companions and registered nurses.",
    focusAreas: [
      "Elderly companionship & daily living assistance",
      "Hospital bedside vigilance & post-surgical support",
      "Certified home nursing (GNM / B.Sc.) under doctor orders",
      "Postnatal, newborn, assisted travel & family respite support",
    ],
    ctaLabel: "Browse Care Services",
    ctaTo: "/services",
    accent: "primary",
  },
  {
    id: "women-empowerment",
    code: "02",
    title: "LifeSakhi — Women Empowerment",
    readiness: "Active Outreach & Expanding",
    summary:
      "Anchored by grassroots Women Self-Help Group (SHG) outreach, turning caregiving and community leadership into pathways for financial independence.",
    focusAreas: [
      "SHG partnerships across semi-urban & rural South India",
      "Dignified employment & transparent compensation",
      "Women's financial independence & community participation",
      "Future entrepreneurship & leadership initiatives (Proposed)",
    ],
    ctaLabel: "Join the Saha Workforce",
    ctaTo: "/become-an-attendant",
    accent: "terracotta",
  },
  {
    id: "health-and-wellbeing",
    code: "03",
    title: "LifeSakhi — Health & Wellbeing",
    readiness: "Active Outreach & Expanding",
    summary:
      "Bridging active maternal and postnatal support with broader preventive health literacy and equitable access to trustworthy care.",
    focusAreas: [
      "Maternal health, pregnancy & postnatal recovery (Operational)",
      "Newborn handling & restorative family care (Operational)",
      "Women's preventive health awareness (Proposed)",
      "Community health education & care navigation (Proposed)",
    ],
    ctaLabel: "Explore Maternal & Health Support",
    ctaTo: "/services/post-natal-care",
    accent: "terracotta",
  },
  {
    id: "child-development",
    code: "04",
    title: "LifeSakhi — Child Development",
    readiness: "Proposed Programme",
    summary:
      "A strategic pillar dedicated to nurturing every girl child's potential through early childhood development, nutrition awareness, safety, and adolescent life skills.",
    focusAreas: [
      "Girl child development & equal opportunities",
      "Early childhood learning & nutrition support",
      "Child safety, protection & adolescent life skills",
      "Seeking NGO, school & institutional collaborators",
    ],
    ctaLabel: "Collaborate on Child Development",
    ctaTo: "/get-involved",
    accent: "plum",
  },
  {
    id: "community-development",
    code: "05",
    title: "LifeSakhi — Community Development",
    readiness: "Active Outreach & Expanding",
    summary:
      "Strengthening local ecosystems through Women Self-Help Groups, NGO alliances, hospital partnerships, and awareness drives.",
    focusAreas: [
      "Women's Self-Help Group (SHG) networks (Active)",
      "NGO & institutional collaboration frameworks",
      "Local community outreach & awareness programmes",
      "Inclusive social participation across South India",
    ],
    ctaLabel: "Explore Partnerships",
    ctaTo: "/ecosystem-partners",
    accent: "primary",
  },
  {
    id: "learning-and-development",
    code: "06",
    title: "LifeSakhi — Learning & Development",
    readiness: "Active Outreach & Expanding",
    summary:
      "Equipping women with practical vocational skills, structured caregiver onboarding, and progressive career pathways.",
    focusAreas: [
      "Practical caregiver & bedside skills training (Active)",
      "Saha onboarding, safety & infection-control protocols (Active)",
      "Women's vocational upskilling & leadership modules (Proposed)",
      "Structured career progression pathways (Proposed)",
    ],
    ctaLabel: "Apply for Training & Opportunities",
    ctaTo: "/become-an-attendant",
    accent: "plum",
  },
];
