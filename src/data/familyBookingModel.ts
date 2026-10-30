/**
 * ApnaCare Data Architecture & Domain Models
 * ──────────────────────────────────────────
 * Defines structured, versioned data contracts for multi-recipient family care bookings,
 * clinical triage, assessment responses, risk flags, and Saha capability matching.
 */

export type ClinicalTriageStatus =
  | "STANDARD_ASSESSMENT"
  | "ADDITIONAL_INFO_REQUIRED"
  | "COORDINATOR_REVIEW_REQUIRED"
  | "CLINICAL_REVIEW_REQUIRED"
  | "SERVICE_CAPABILITY_UNAVAILABLE"
  | "EMERGENCY_MEDICAL_ADVISED";

export type RiskSeverity = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export interface RiskFlag {
  id: string;
  category: "MOBILITY" | "CLINICAL" | "COGNITIVE" | "PEDIATRIC" | "MATERNAL" | "ENVIRONMENTAL" | "SAFETY";
  severity: RiskSeverity;
  label: string;
  description: string;
  mitigationRequirement: string;
  requiresReview: boolean;
}

export interface AssessmentAnswer {
  questionId: string;
  recipientId: string;
  questionText: string;
  answer: string | string[] | boolean | number;
  displayText: string;
  triggersRiskFlag?: string;
  triggersClinicalReview?: boolean;
}

export interface IndividualRecipient {
  id: string;
  name: string;
  relationship: string; // e.g. "Father", "Mother", "Spouse", "Child", "Self"
  gender: "male" | "female" | "both" | "other" | "unspecified";
  age: string;
  livingSituation: string;
  primaryCondition?: string;
  notes?: string;
  selectedTaskIds: string[];
  assessmentAnswers: Record<string, any>;
  riskFlags: RiskFlag[];
  triageStatus: ClinicalTriageStatus;
}

export interface FamilyProfile {
  familyId: string;
  primaryContactName: string;
  primaryContactPhone: string;
  primaryContactEmail?: string;
  relationshipToRecipients: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  city: string;
  area: string;
  fullAddress?: string;
  landmark?: string;
  floorAndLift?: string;
  preferredCommunication: "whatsapp" | "phone" | "email";
}

export interface ConsentRecord {
  consentId: string;
  timestamp: string;
  ipAddress?: string;
  purposeSpecificCareNoticeAccepted: boolean;
  medicalInformationConsentAccepted: boolean;
  termsAndSafetyGuidelinesAccepted: boolean;
  marketingOptIn: boolean;
}

export interface SahaMatchingProfile {
  requiredRoles: string[];
  genderPreference: "female_only" | "male_only" | "no_preference";
  preferredLanguages: string[];
  requiredSkills: string[];
  minimumExperienceYears?: number;
  specialistCertificationsRequired?: string[];
  continuityPreference: boolean;
  dailyWhatsAppUpdates: boolean;
}
