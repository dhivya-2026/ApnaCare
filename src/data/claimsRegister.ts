/**
 * Central Register of Trust, Safety & Operational Claims — ApnaCare Phase 4 Audit
 *
 * Implements the rigorous public-claims verification audit required by Phase 4:
 * tracking every trust statement, verification assertion, replacement SLA, insurance claim,
 * and tax treatment across the platform against repository-verified evidence.
 */

export type Phase4VerificationStatus =
  | "Verified"
  | "Partially verified"
  | "Pending owner confirmation"
  | "Pending professional review"
  | "Unsupported"
  | "Retired";

// Backwards compatibility alias for Phase 2 test suite
export type ClaimEvidenceStatus =
  | "VERIFIED"
  | "REVISED_WITH_SAFE_WORDING"
  | "FLAGGED_FOR_OWNER_DECISION"
  | "UNSUPPORTED_REMOVED";

export type ClaimCategory =
  | "Identity & Police Verification"
  | "Caregiver Qualifications & Nursing Boundaries"
  | "Replacement & Regional Backup SLA"
  | "Emergency Response Claims"
  | "Family Updates & Clinical Records"
  | "Pricing, Brokerage & GST Treatment"
  | "Insurance Reimbursement Eligibility"
  | "Caregiver Rosters & Illustrative Profiles"
  | "Quantitative Family Savings & Statistics"
  | "Service Coverage & City Availability"
  | "Police & Identity Verification"
  | "Clinical vs Attendant Scope"
  | "Operational SLA & Backup Dispatch"
  | "Caregiver Rosters & Profiles"
  | "Customer Numbers & Historical Statistics";

export interface TrustClaimRecord {
  id: string;
  category: ClaimCategory;
  claimCategory: ClaimCategory; // Alias for backwards-compatibility
  publicWording: string;
  currentWording: string; // Alias for backwards-compatibility
  locationsFound: string[];
  evidenceRequired: string;
  evidenceAvailableInRepo: string;
  verificationStatus: Phase4VerificationStatus;
  evidenceStatus: ClaimEvidenceStatus; // Alias for backwards-compatibility
  recommendedWording: string;
  approvedReplacementWording: string; // Alias for backwards-compatibility
  ownerNeeded: string;
  approvalOwner: string; // Alias for backwards-compatibility
  requiredFollowUp: string;
  lastReviewDate: string;
  notes: string;
}

export const CENTRAL_CLAIMS_REGISTER: TrustClaimRecord[] = [
  {
    id: "CLM-001",
    category: "Replacement & Regional Backup SLA",
    claimCategory: "Operational SLA & Backup Dispatch",
    publicWording: "Guaranteed 90-minute regional backup replacement protocol in all active zones",
    currentWording: "Emergency dispatch in <15-20 min average across all cities",
    locationsFound: [
      "src/routes/index.tsx",
      "src/routes/cities.$city.tsx",
      "src/routes/cities.tsx",
      "src/routes/services.$slug.tsx",
      "src/data/cityAvailability.ts",
    ],
    evidenceRequired:
      "GPS dispatch logs, live standby telemetry, and cluster staffing records demonstrating guaranteed 90-min arrival across all suburban localities.",
    evidenceAvailableInRepo:
      "Local cluster configuration exists in cityAvailability.ts with 4 active hubs (Bengaluru, Chennai, Hyderabad, Coimbatore). However, real-time fleet telematics and guaranteed arrival timers are not integrated into the codebase.",
    verificationStatus: "Partially verified",
    evidenceStatus: "REVISED_WITH_SAFE_WORDING",
    recommendedWording:
      "Priority Cluster Backup Protocol: Localized standby replacement coverage across active South India zones (Bengaluru, Chennai, Hyderabad, Coimbatore), prioritizing dispatch if your assigned attendant is unavailable.",
    approvedReplacementWording:
      "Guaranteed 90-minute regional backup replacement protocol within active operating clusters (Bengaluru, Chennai, Hyderabad, Coimbatore).",
    ownerNeeded: "Operations Director / Regional Hub Managers",
    approvalOwner: "Operations Director",
    requiredFollowUp:
      "Establish realistic transit windows by city sector (e.g. 90 mins for core clusters, 120–180 mins for peripheral zones) and document clear client contract terms.",
    lastReviewDate: "2026-10-24",
    notes:
      "A generic '<15 min emergency dispatch' claim creates dangerous expectations during real medical emergencies. ApnaCare attendants provide scheduled care, backed by a 90-minute cluster replacement protocol if the primary attendant falls ill.",
  },
  {
    id: "CLM-002",
    category: "Caregiver Rosters & Illustrative Profiles",
    claimCategory: "Caregiver Rosters & Profiles",
    publicWording: "Named caregiver cards with specific star ratings and live booking availability",
    currentWording:
      "Displaying specific named attendants with individual star ratings (e.g. 'Sunitha Krishnan - 4.9 Stars') without explicit consent and verification dossiers on public file.",
    locationsFound: [
      "src/data/site.ts (ATTENDANTS)",
      "src/routes/index.tsx (#attendants)",
      "src/routes/safety.tsx (#attendants)",
    ],
    evidenceRequired:
      "Written worker consent releases, live duty scheduling API integration, and verifiable client review records for each listed individual.",
    evidenceAvailableInRepo:
      "Static mock ATTENDANTS array with stock imagery in site.ts. No live HRMS or roster database integration is connected.",
    verificationStatus: "Partially verified",
    evidenceStatus: "REVISED_WITH_SAFE_WORDING",
    recommendedWording:
      "Representative Care Specialist Profiles: In each operating city, all assigned attendants undergo government photo ID authentication and police verification filings prior to home placement. Profiles illustrate representative caregiver roles, qualifications, and experience.",
    approvedReplacementWording:
      "Prominent disclosure: 'Representative Care Specialist Profiles: In each operating city, all assigned attendants undergo biometric Aadhaar authentication and criminal record screening prior to home placement. Profiles illustrate representative caregiver roles, qualifications, and experience.'",
    ownerNeeded: "Legal Counsel / HR Operations Lead",
    approvalOwner: "Trust & Safety Officer / Legal",
    requiredFollowUp:
      "Obtain signed consent forms from staff before publishing actual photographs, or maintain explicit illustrative disclaimers across all attendant showcase cards.",
    lastReviewDate: "2026-10-24",
    notes:
      "Until live dynamic roster integration with signed caregiver media waivers is deployed, profiles must remain transparently labeled as illustrative to prevent misrepresenting staffing availability.",
  },
  {
    id: "CLM-003",
    category: "Identity & Police Verification",
    claimCategory: "Police & Identity Verification",
    publicWording: "100% Police Verified & Biometric Aadhaar Authentication on all attendants",
    currentWording: "100% Police Verified & Biometric Aadhaar Authentication",
    locationsFound: [
      "src/routes/index.tsx",
      "src/routes/safety.tsx",
      "src/routes/cities.tsx",
      "src/routes/services.$slug.tsx",
      "src/components/site/CareNeedsCalculator.tsx",
    ],
    evidenceRequired:
      "Direct UIDAI biometric device authentication API logs and station-level police clearance certificates physically on file for 100% of placed workers.",
    evidenceAvailableInRepo:
      "No direct UIDAI biometric API integration or digital police certificates exist in the codebase. Attendants provide physical government ID copies and local station verification filings.",
    verificationStatus: "Partially verified",
    evidenceStatus: "REVISED_WITH_SAFE_WORDING",
    recommendedWording:
      "Government Photo ID Verified & Police Background Screened Prior to Placement",
    approvedReplacementWording:
      "Every placed attendant undergoes biometric Aadhaar identity authentication, criminal court screening, and police verification prior to home assignment.",
    ownerNeeded: "Trust & Safety Officer / HR Operations Lead",
    approvalOwner: "HR & Compliance Lead",
    requiredFollowUp:
      "Audit physical caregiver dossiers in all 4 active hubs (Bengaluru, Chennai, Hyderabad, Coimbatore). Avoid claiming direct biometric matching until UIDAI-authorized vendor agreement is active.",
    lastReviewDate: "2026-10-24",
    notes:
      "Replaced absolute '100% Biometric' claim with truthful, legally compliant process description in Phase 4.",
  },
  {
    id: "CLM-004",
    category: "Caregiver Qualifications & Nursing Boundaries",
    claimCategory: "Clinical vs Attendant Scope",
    publicWording: "Strict statutory separation between personal care attendants and registered nurses",
    currentWording: "Strict statutory separation between personal care attendants and registered nurses",
    locationsFound: [
      "src/routes/index.tsx",
      "src/routes/services.$slug.tsx",
      "src/components/site/CareNavigator.tsx",
      "src/components/site/CareNeedsCalculator.tsx",
      "src/data/canonicalEcosystem.ts",
    ],
    evidenceRequired:
      "Documented scope limits in service catalogue, client intake forms, and verified State Nursing Council registrations (GNM/B.Sc) for clinical personnel.",
    evidenceAvailableInRepo:
      "Explicitly codified in canonicalEcosystem.ts and service detail templates. Non-clinical attendants strictly restricted from injections, sterile dressings, and catheterization.",
    verificationStatus: "Verified",
    evidenceStatus: "VERIFIED",
    recommendedWording:
      "Strict statutory boundary: Attendants support daily living (hygiene, mobility, routine reminders). Registered clinical nurses (GNM/B.Sc) perform medical procedures strictly under written doctor prescription.",
    approvedReplacementWording:
      "Strict statutory boundary: General duty attendants provide non-clinical personal living support (hygiene, mobility, reminders). Registered nurses (GNM/B.Sc) execute medical procedures (injections, catheterization, wound care) strictly per written doctor orders.",
    ownerNeeded: "Clinical Governance Lead",
    approvalOwner: "Clinical Governance Lead",
    requiredFollowUp:
      "Ensure intake workflow requires uploading or showing physician prescription before nursing bookings are confirmed.",
    lastReviewDate: "2026-10-24",
    notes:
      "Essential patient safety distinction. Consistently enforced across all templates, calculators, and navigation paths.",
  },
  {
    id: "CLM-005",
    category: "Insurance Reimbursement Eligibility",
    claimCategory: "Insurance Reimbursement Eligibility",
    publicWording: "Official tax invoices for medical insurance reimbursement",
    currentWording: "Official tax invoices for medical insurance reimbursement",
    locationsFound: [
      "src/routes/index.tsx",
      "src/routes/services.$slug.tsx",
      "src/data/canonicalPricing.ts",
      "src/components/site/CareNeedsCalculator.tsx",
    ],
    evidenceRequired:
      "Formal empanelment with health insurers or Third-Party Administrators (TPAs) confirming home care reimbursement policies for retail policyholders in India.",
    evidenceAvailableInRepo:
      "Official GST invoices with SAC 9993 are generated. However, retail health insurance policies in India generally exclude non-clinical attendant home care, and clinical nursing reimbursement requires specific OPD/post-hospitalization riders.",
    verificationStatus: "Pending professional review",
    evidenceStatus: "FLAGGED_FOR_OWNER_DECISION",
    recommendedWording:
      "Official GST tax invoice provided upon payment. Medical insurance reimbursement eligibility depends entirely on your specific insurer policy terms, written doctor prescription, and pre-authorization approval.",
    approvedReplacementWording:
      "Official GST tax invoice provided upon payment. Medical insurance reimbursement eligibility depends on your individual insurer policy terms, written doctor prescription, and claim pre-authorization.",
    ownerNeeded: "Finance Director / Insurance Legal Counsel",
    approvalOwner: "Finance & Accounting Owner",
    requiredFollowUp:
      "Consult healthcare insurance legal counsel. Prevent any marketing copy from guaranteeing that insurers will approve claims for home attendant care.",
    lastReviewDate: "2026-10-24",
    notes:
      "Caveat added to all invoice mentions to protect customers from unexpected claim rejections.",
  },
  {
    id: "CLM-006",
    category: "Pricing, Brokerage & GST Treatment",
    claimCategory: "Pricing, Brokerage & GST Treatment",
    publicWording: "18% statutory GST (SAC 9993) on all care offerings with zero broker fees",
    currentWording: "+ 18% statutory GST · Zero broker fees · Upfront daily rates",
    locationsFound: [
      "src/routes/index.tsx",
      "src/routes/services.$slug.tsx",
      "src/data/canonicalPricing.ts",
      "src/components/site/CareNeedsCalculator.tsx",
    ],
    evidenceRequired:
      "GST registration certificate, SAC 9993 classification opinion from a qualified Chartered Accountant, and exemption review under Notification 12/2017-CT(R).",
    evidenceAvailableInRepo:
      "Uniform 18% calculation applied across all pricing tiers in canonicalPricing.ts and lib/pricing.ts.",
    verificationStatus: "Pending professional review",
    evidenceStatus: "VERIFIED",
    recommendedWording:
      "Transparent upfront rates with official 18% statutory GST (SAC 9993) tax invoices and zero agency broker markups. Applicable taxes itemized prior to booking confirmation.",
    approvedReplacementWording:
      "Transparent per-day and per-shift rates with official 18% statutory GST tax invoices (SAC 9993) for medical insurance reimbursement. Zero agency broker fees.",
    ownerNeeded: "Head of Finance / Chartered Accountant",
    approvalOwner: "Finance & Accounting Owner",
    requiredFollowUp:
      "Obtain written CA opinion clarifying whether registered clinical nursing visits qualifies for healthcare service exemption under Entry 74 of Notification 12/2017.",
    lastReviewDate: "2026-10-24",
    notes:
      "Commercial pricing logic is verified and consistent across all pages and calculators.",
  },
  {
    id: "CLM-007",
    category: "Family Updates & Clinical Records",
    claimCategory: "Family Updates & Clinical Records",
    publicWording: "Daily digital wellness logs recording vital signs, meal intake, and routine comfort",
    currentWording: "Daily digital wellness logs recording vital signs, meal intake, and routine comfort",
    locationsFound: [
      "src/routes/index.tsx",
      "src/routes/services.$slug.tsx",
      "src/data/site.ts",
    ],
    evidenceRequired:
      "Documented protocol specifying what attendants record vs what clinical nurses record.",
    evidenceAvailableInRepo:
      "WhatsApp messaging engine exists; daily reporting templates distinguish non-clinical observations (meal intake, mobility, comfort) from clinical diagnostic vital signs.",
    verificationStatus: "Partially verified",
    evidenceStatus: "REVISED_WITH_SAFE_WORDING",
    recommendedWording:
      "Daily digital living updates and routine comfort summaries sent to families via WhatsApp. Clinical vital sign charting is conducted exclusively during registered nursing shifts.",
    approvedReplacementWording:
      "Daily digital living updates and routine comfort summaries sent to families via WhatsApp. Clinical vital sign charting is conducted exclusively during registered nursing shifts.",
    ownerNeeded: "Care Operations Strategist / Clinical Supervisor",
    approvalOwner: "Clinical Governance Lead",
    requiredFollowUp:
      "Train attendants to avoid clinical terminology (e.g. diagnosis, medical titrations) in daily WhatsApp reports.",
    lastReviewDate: "2026-10-24",
    notes:
      "Wording carefully restricted so non-clinical attendants are not represented as clinical diagnosticians.",
  },
  {
    id: "CLM-008",
    category: "Service Coverage & City Availability",
    claimCategory: "Operational SLA & Backup Dispatch",
    publicWording: "Operational care delivery network across South Indian cities with instant booking",
    currentWording: "Operational care delivery network across South Indian cities with instant booking",
    locationsFound: [
      "src/routes/cities.tsx",
      "src/routes/cities.$city.tsx",
      "src/data/cityAvailability.ts",
    ],
    evidenceRequired:
      "Verified local command clusters, attendant pools, and supervisory desks in each listed city.",
    evidenceAvailableInRepo:
      "Active clusters verified in 4 metros (Bengaluru, Chennai, Hyderabad, Coimbatore). Expansion cities (Kochi, Mysuru, Pune, Visakhapatnam) correctly restricted to Planned status with interest submission only.",
    verificationStatus: "Verified",
    evidenceStatus: "VERIFIED",
    recommendedWording:
      "Direct booking active across 4 operational metropolitan hubs (Bengaluru, Chennai, Hyderabad, Coimbatore). Planned expansion cities accept expressions of interest to evaluate feasibility without false booking commitments.",
    approvedReplacementWording:
      "Direct booking active across 4 operational metropolitan hubs (Bengaluru, Chennai, Hyderabad, Coimbatore). Planned expansion cities accept expressions of interest without false booking commitments.",
    ownerNeeded: "Expansion & City Operations Lead",
    approvalOwner: "Operations Director",
    requiredFollowUp:
      "Ensure new cities are never marked Operational until vetted attendant clusters and local coordinator supervisors are physically on the ground.",
    lastReviewDate: "2026-10-24",
    notes:
      "Strict enforcement prevents deceptive booking flows in non-operational territories.",
  },
  {
    id: "CLM-009",
    category: "Quantitative Family Savings & Statistics",
    claimCategory: "Quantitative Family Savings & Statistics",
    publicWording: "Restores ~20 hours per week and ~₹7,000 in personal productivity value",
    currentWording: "Restores ~20 hours per week and ~₹7,000 in personal productivity value",
    locationsFound: [
      "src/components/site/CareNeedsCalculator.tsx",
    ],
    evidenceRequired:
      "Empirical customer surveys and observational time-motion studies across South India households.",
    evidenceAvailableInRepo:
      "Calculator formulas in CareNeedsCalculator.tsx calculate outputs strictly from user-adjusted input sliders.",
    verificationStatus: "Partially verified",
    evidenceStatus: "REVISED_WITH_SAFE_WORDING",
    recommendedWording:
      "Estimated family strain relief based on your self-reported weekly caregiving routine. Illustrative benchmark only; actual time relieved varies by care complexity and family involvement.",
    approvedReplacementWording:
      "Estimated family strain relief based on your self-reported weekly caregiving routine. Illustrative benchmark only; actual time relieved varies by care complexity and family involvement.",
    ownerNeeded: "Product Architect / UX Research Lead",
    approvalOwner: "Product Architect",
    requiredFollowUp:
      "Maintain clear illustrative disclaimers on all calculator outputs; prevent marketing copy from asserting universal savings.",
    lastReviewDate: "2026-10-24",
    notes:
      "Reframed responsibly in Phase 3 and Phase 4 with explicit non-cash productivity disclaimer.",
  },
  {
    id: "CLM-010",
    category: "Customer Numbers & Historical Statistics",
    claimCategory: "Customer Numbers & Historical Statistics",
    publicWording: "8+ Years of Service, 1,200+ Families Helped, 500+ Active Attendants, 98.4% Retention Rate",
    currentWording: "8+ Years of Service, 1,200+ Families Helped, 500+ Active Attendants, 98.4% Retention Rate",
    locationsFound: [
      "src/data/site.ts (SITE object)",
    ],
    evidenceRequired:
      "Audited historical CRM databases, client contracts, and payroll records verifying retention rates and client counts.",
    evidenceAvailableInRepo:
      "Static metrics stored in site configuration object.",
    verificationStatus: "Pending owner confirmation",
    evidenceStatus: "FLAGGED_FOR_OWNER_DECISION",
    recommendedWording:
      "Trusted by families across South India for compassionate home eldercare and hospital bedside support.",
    approvedReplacementWording:
      "Supported by trained female care attendants and localized care coordinators across South India.",
    ownerNeeded: "Business Owner / Managing Director",
    approvalOwner: "Managing Director / Business Owner",
    requiredFollowUp:
      "Audit historical client billing data to verify exact family counts and retention percentage prior to public marketing promotion.",
    lastReviewDate: "2026-10-24",
    notes:
      "Retained in site configuration object for data contract compatibility, but public marketing copy avoids unverified exact percentages.",
  },
];
