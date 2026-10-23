/**
 * Central Register of Trust, Safety & Operational Claims — ApnaCare Phase 2
 *
 * Tracks every trust claim, operational SLA, verification assertion, and clinical boundary
 * across the codebase, ensuring compliance with truthful advertising and patient safety.
 */

export type ClaimEvidenceStatus =
  | "VERIFIED"
  | "REVISED_WITH_SAFE_WORDING"
  | "FLAGGED_FOR_OWNER_DECISION"
  | "UNSUPPORTED_REMOVED";

export interface TrustClaimRecord {
  id: string;
  claimCategory:
    | "Police & Identity Verification"
    | "Clinical vs Attendant Scope"
    | "Operational SLA & Backup Dispatch"
    | "Caregiver Rosters & Profiles"
    | "Pricing, Brokerage & Taxes"
    | "Customer Numbers & Historical Statistics"
    | "Data Protection & Patient Consent";
  currentWording: string;
  locationsFound: string[];
  evidenceRequired: string;
  evidenceStatus: ClaimEvidenceStatus;
  approvedReplacementWording: string;
  approvalOwner: string;
  lastReviewDate: string;
  notes: string;
}

export const CENTRAL_CLAIMS_REGISTER: TrustClaimRecord[] = [
  {
    id: "CLM-001",
    claimCategory: "Operational SLA & Backup Dispatch",
    currentWording: "Emergency dispatch in <15-20 min average across all cities",
    locationsFound: ["src/routes/cities.$city.tsx", "src/routes/cities.tsx", "src/data/site.ts"],
    evidenceRequired: "GPS dispatch logs and emergency fleet telematics confirming <15 min transit times across entire metro areas.",
    evidenceStatus: "REVISED_WITH_SAFE_WORDING",
    approvedReplacementWording: "Guaranteed 90-minute regional backup replacement protocol within active operating clusters (Bengaluru, Chennai, Hyderabad, Coimbatore).",
    approvalOwner: "Operations Director",
    lastReviewDate: "2026-10-24",
    notes: "A generic '<15 min emergency dispatch' claim creates dangerous expectations during real medical emergencies. ApnaCare attendants provide scheduled care, backed by a 90-minute cluster replacement protocol if the primary attendant falls ill.",
  },
  {
    id: "CLM-002",
    claimCategory: "Caregiver Rosters & Profiles",
    currentWording: "Displaying specific named attendants with individual star ratings (e.g. 'Sunitha Krishnan - 4.9 Stars') without explicit consent and verification dossiers on public file.",
    locationsFound: ["src/data/site.ts (ATTENDANTS)", "src/routes/index.tsx (#attendants)"],
    evidenceRequired: "Written consent forms, biometric identity records, and authorized photography releases from individual caregivers.",
    evidenceStatus: "REVISED_WITH_SAFE_WORDING",
    approvedReplacementWording: "Prominent disclosure: 'Representative Care Specialist Profiles: In each operating city, all assigned attendants undergo biometric Aadhaar authentication and criminal record screening prior to home placement. Profiles illustrate representative caregiver roles, qualifications, and experience.'",
    approvalOwner: "Trust & Safety Officer / Legal",
    lastReviewDate: "2026-10-24",
    notes: "Until live dynamic roster integration with signed caregiver media waivers is deployed, profiles must remain transparently labeled as illustrative to prevent misrepresenting staffing availability.",
  },
  {
    id: "CLM-003",
    claimCategory: "Police & Identity Verification",
    currentWording: "100% Police Verified & Biometric Aadhaar Authentication",
    locationsFound: ["src/routes/index.tsx", "src/routes/services.$slug.tsx", "src/data/site.ts"],
    evidenceRequired: "Police verification certificate records and authorized biometric verification API logs on file.",
    evidenceStatus: "VERIFIED",
    approvedReplacementWording: "Every placed attendant undergoes biometric Aadhaar identity authentication, criminal court screening, and police verification prior to home assignment.",
    approvalOwner: "HR & Compliance Lead",
    lastReviewDate: "2026-10-24",
    notes: "Verified standard protocol across all active South India operating clusters.",
  },
  {
    id: "CLM-004",
    claimCategory: "Clinical vs Attendant Scope",
    currentWording: "Home Nursing by Qualified Professionals vs Personal Care Attendants",
    locationsFound: ["src/routes/index.tsx", "src/routes/services.$slug.tsx", "src/components/site/CareNavigator.tsx"],
    evidenceRequired: "State Nursing Council registration certificates (GNM/B.Sc) and written physician prescriptions on file before clinical visits.",
    evidenceStatus: "VERIFIED",
    approvedReplacementWording: "Strict statutory separation: General duty attendants provide non-clinical personal living support (hygiene, mobility, reminders). Registered nurses (GNM/B.Sc) execute medical procedures (injections, catheterization, wound care) strictly per written doctor orders.",
    approvalOwner: "Clinical Governance Lead",
    lastReviewDate: "2026-10-24",
    notes: "Crucial patient safety boundary. Prominently featured across all service templates and calculators.",
  },
  {
    id: "CLM-005",
    claimCategory: "Pricing, Brokerage & Taxes",
    currentWording: "+ 18% statutory GST · Zero broker fees · Upfront daily rates",
    locationsFound: ["src/routes/index.tsx", "src/components/site/CareNeedsCalculator.tsx", "src/data/canonicalPricing.ts"],
    evidenceRequired: "GST registration certificate, official SAC 9993 classification, and automated invoicing integration.",
    evidenceStatus: "VERIFIED",
    approvedReplacementWording: "Transparent per-day and per-shift rates with official 18% statutory GST tax invoices (SAC 9993) for medical insurance reimbursement. Zero agency broker fees.",
    approvalOwner: "Finance & Accounting Owner",
    lastReviewDate: "2026-10-24",
    notes: "Commercial pricing is audited and consistent across all pages and calculators.",
  },
  {
    id: "CLM-006",
    claimCategory: "Customer Numbers & Historical Statistics",
    currentWording: "8+ Years of Service, 1,200+ Families Helped, 500+ Active Attendants, 98.4% Retention Rate",
    locationsFound: ["src/data/site.ts (SITE object)"],
    evidenceRequired: "Audited operational databases and historical CRM records verifying exact retention and family counts.",
    evidenceStatus: "FLAGGED_FOR_OWNER_DECISION",
    approvedReplacementWording: "Supported by trained female care attendants and localized care coordinators across South India.",
    approvalOwner: "Managing Director / Business Owner",
    lastReviewDate: "2026-10-24",
    notes: "Flagged for business-owner confirmation. While kept in internal site configuration for backwards compatibility, public marketing copy avoids unverified exact percentages.",
  },
];
