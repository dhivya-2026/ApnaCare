/**
 * ApnaCare Dynamic Conditional Question & Triage Engine
 * ──────────────────────────────────────────────────────
 * Generates situation-aware assessment questions based on selected care tasks and recipient conditions.
 * Evaluates clinical risk flags, staffing requirements, and triage status without diagnostic claims.
 */

import { ClinicalTriageStatus, RiskFlag, IndividualRecipient } from "./familyBookingModel";

export type QuestionInputType =
  | "single_choice"
  | "multi_choice"
  | "boolean"
  | "text"
  | "number"
  | "select";

export interface ConditionalQuestion {
  id: string;
  category: "MOBILITY" | "CLINICAL" | "DAILY_LIVING" | "MATERNAL" | "CHILDCARE" | "SAFETY" | "EMERGENCY_SCREEN";
  question: string;
  description?: string;
  inputType: QuestionInputType;
  options?: { id: string; label: string; riskSeverity?: "LOW" | "MODERATE" | "HIGH"; triggersFollowUp?: string }[];
  placeholder?: string;
  required?: boolean;
  triggerTaskIds?: string[]; // Triggers if any of these tasks are selected
  triggerRecipientTypes?: string[]; // Triggers for specific recipient types
  clinicalReviewTrigger?: boolean;
  riskFlagIfAnswer?: Record<string, { label: string; severity: "LOW" | "MODERATE" | "HIGH" | "CRITICAL"; mitigation: string }>;
}

export const ASSESSMENT_QUESTIONS_CATALOGUE: ConditionalQuestion[] = [
  // ─── 0. Universal Emergency Screening ─────────────────────────────────────────
  {
    id: "q_emergency_screen",
    category: "EMERGENCY_SCREEN",
    question: "Is the care recipient currently experiencing an acute medical emergency?",
    description: "Such as sudden chest pain, difficulty breathing, active severe bleeding, or sudden loss of consciousness.",
    inputType: "single_choice",
    options: [
      { id: "no_emergency", label: "No — The situation is medically stable" },
      { id: "active_emergency", label: "Yes — Immediate acute symptoms present", riskSeverity: "HIGH" },
    ],
    required: true,
    riskFlagIfAnswer: {
      active_emergency: {
        label: "Acute Medical Emergency Indicated",
        severity: "CRITICAL",
        mitigation: "Advise immediate 108 / 112 emergency medical services or urgent hospital emergency room transfer. ApnaCare home assistance is not an emergency response service.",
      },
    },
  },

  // ─── 1. Mobility & Transfer Assessment ───────────────────────────────────────
  {
    id: "q_mob_walking_independence",
    category: "MOBILITY",
    question: "Can the person walk independently or do they require physical weight-bearing support?",
    description: "Ensures we match an attendant with suitable ergonomics and physical transfer training.",
    inputType: "single_choice",
    triggerTaskIds: ["task-walk-indoor", "task-walk-outdoor", "task-walk-supervision", "task-assist-walker", "task-assist-stick", "task-stair-climb"],
    options: [
      { id: "independent_slow", label: "Walks independently (may need supervision or pacing)" },
      { id: "uses_stick_walker", label: "Uses walking stick or walker with light handrail support" },
      { id: "one_person_support", label: "Requires 1-person physical hold & balance support" },
      { id: "two_person_support", label: "Requires 2-person physical lifting / assistance", riskSeverity: "HIGH" },
      { id: "completely_bedbound", label: "Completely bedbound (cannot bear weight)", riskSeverity: "HIGH" },
    ],
    riskFlagIfAnswer: {
      two_person_support: {
        label: "Two-Person Physical Transfer Required",
        severity: "HIGH",
        mitigation: "Requires coordinator assessment for dual-staffing or mechanical transfer aids (e.g. hoist/sliding board) to prevent caregiver injury and ensure recipient dignity.",
      },
      completely_bedbound: {
        label: "Bedbound Mobility & Pressure Care",
        severity: "MODERATE",
        mitigation: "Regular 2-hour repositioning schedule and skin integrity monitoring required by trained attendant.",
      },
    },
  },
  {
    id: "q_mob_wheelchair_transfers",
    category: "MOBILITY",
    question: "What type of wheelchair assistance is needed?",
    inputType: "single_choice",
    triggerTaskIds: ["task-wc-indoor", "task-wc-outdoor", "task-wc-transfer", "task-transfer-bed-chair"],
    options: [
      { id: "manual_push", label: "Manual wheelchair (needs attendant to push and guide)" },
      { id: "motorized_guidance", label: "Motorized wheelchair (needs companion navigation support)" },
      { id: "bed_to_chair_pivot", label: "Pivot transfer from bed to wheelchair needed", riskSeverity: "MODERATE" },
    ],
  },
  {
    id: "q_mob_fall_history",
    category: "MOBILITY",
    question: "Has your loved one had a fall or near-fall incident in the past 6 months?",
    inputType: "single_choice",
    triggerTaskIds: ["task-fall-supervision", "task-fall-hazard-check", "task-walk-indoor", "task-stair-climb"],
    options: [
      { id: "no_falls", label: "No recent falls" },
      { id: "one_slip", label: "1 minor slip without serious injury" },
      { id: "frequent_falls", label: "Multiple falls or severe fear of falling", riskSeverity: "HIGH" },
    ],
    riskFlagIfAnswer: {
      frequent_falls: {
        label: "Elevated Fall Risk",
        severity: "HIGH",
        mitigation: "Assign attendant with verified fall-prevention protocol training; conduct home hazard checklist on Day 1.",
      },
    },
  },

  // ─── 2. Clinical Procedures & Nursing Scope ──────────────────────────────────
  {
    id: "q_clin_prescription_status",
    category: "CLINICAL",
    question: "Is there an active written prescription from a registered medical practitioner for the requested clinical procedure?",
    description: "ApnaCare strictly follows regulatory guidelines: clinical nursing procedures require valid physician orders.",
    inputType: "single_choice",
    clinicalReviewTrigger: true,
    triggerTaskIds: ["task-proc-injections", "task-proc-wound", "task-proc-catheter", "task-proc-feeding-tube", "task-proc-iv-infusion", "task-post-surg-vitals"],
    options: [
      { id: "prescription_ready", label: "Yes — Valid doctor's prescription available" },
      { id: "prescription_pending", label: "Prescription will be provided before service begins" },
      { id: "no_prescription", label: "No current prescription (need guidance on doctor consult)", riskSeverity: "HIGH" },
    ],
    riskFlagIfAnswer: {
      no_prescription: {
        label: "Missing Physician Prescription for Clinical Procedure",
        severity: "CRITICAL",
        mitigation: "Clinical review gatekeeper: A licensed registered nurse cannot perform invasive procedures without a documented prescription.",
      },
    },
  },
  {
    id: "q_clin_procedure_details",
    category: "CLINICAL",
    question: "Which medical equipment or supplies are currently installed or required?",
    inputType: "multi_choice",
    clinicalReviewTrigger: true,
    triggerTaskIds: ["task-proc-wound", "task-proc-catheter", "task-proc-feeding-tube", "task-vital-monitor", "task-post-surg-vitals"],
    options: [
      { id: "surgical_wound", label: "Surgical wound / sutures / dressing" },
      { id: "urinary_catheter", label: "Foley / Suprapubic urinary catheter" },
      { id: "ryles_tube", label: "Ryle's / Nasogastric feeding tube" },
      { id: "oxygen_concentrator", label: "Oxygen therapy / concentrator" },
      { id: "suction_machine", label: "Suction apparatus" },
      { id: "glucometer_bp", label: "Routine BP apparatus & glucometer" },
    ],
  },

  // ─── 3. Cognitive & Dementia Support ─────────────────────────────────────────
  {
    id: "q_cog_condition",
    category: "SAFETY",
    question: "Does the recipient show symptoms of cognitive decline, memory loss, or wandering?",
    inputType: "single_choice",
    triggerTaskIds: ["task-dis-supervision", "task-comp-conversation", "task-vigil-day", "task-vigil-night"],
    triggerRecipientTypes: ["person_with_disability", "elderly_parent"],
    options: [
      { id: "cognitively_clear", label: "No — Fully alert and oriented" },
      { id: "mild_forgetful", label: "Mild age-related forgetfulness" },
      { id: "diagnosed_dementia", label: "Diagnosed Alzheimer's / Dementia with wandering or sundowning", riskSeverity: "HIGH" },
    ],
    riskFlagIfAnswer: {
      diagnosed_dementia: {
        label: "Dementia & Wandering Vigilance",
        severity: "HIGH",
        mitigation: "Assign Saha with specialized gentle memory care and de-escalation experience; ensure exit doors are secured.",
      },
    },
  },

  // ─── 4. Maternal & Newborn Details ───────────────────────────────────────────
  {
    id: "q_mat_delivery_details",
    category: "MATERNAL",
    question: "Delivery type and postpartum recovery status:",
    inputType: "single_choice",
    triggerTaskIds: ["task-mat-daily", "task-mat-meal", "task-nb-bath", "task-nb-diaper", "task-nb-overnight", "task-mat-massage"],
    triggerRecipientTypes: ["new_mother"],
    options: [
      { id: "normal_full_term", label: "Normal delivery — Full term (smooth recovery)" },
      { id: "c_section_recovering", label: "C-Section delivery — Needs surgical wound protection & gentle mobility" },
      { id: "premature_nicu_graduate", label: "Premature newborn / NICU graduate needing extra thermal & hygiene care", riskSeverity: "HIGH" },
    ],
    riskFlagIfAnswer: {
      premature_nicu_graduate: {
        label: "Premature / Fragile Newborn Oversight",
        severity: "HIGH",
        mitigation: "Experienced Japa elder or Pediatric GNM nurse required; rigorous sanitization and temperature control protocols.",
      },
    },
  },
  {
    id: "q_mat_feeding_method",
    category: "MATERNAL",
    question: "Baby's primary feeding method:",
    inputType: "single_choice",
    triggerTaskIds: ["task-nb-diaper", "task-nb-overnight", "task-mat-meal"],
    triggerRecipientTypes: ["new_mother"],
    options: [
      { id: "exclusive_breastfeeding", label: "Direct breastfeeding (mother needs latch/burping assistance)" },
      { id: "expressed_bottle", label: "Expressed breast milk via bottle (attendant handles warm-up & feeding)" },
      { id: "formula_feeding", label: "Formula feeding (strict sterilization & measured scoop routines)" },
      { id: "combination", label: "Combination of breast milk and formula" },
    ],
  },

  // ─── 5. Childcare & Safety ───────────────────────────────────────────────────
  {
    id: "q_child_parent_location",
    category: "CHILDCARE",
    question: "Where will parents/guardians be during the care shift?",
    inputType: "single_choice",
    triggerTaskIds: ["task-child-supervision", "task-child-meals", "task-child-bedtime", "task-child-outstation-cover", "task-child-parent-updates"],
    triggerRecipientTypes: ["child"],
    options: [
      { id: "parents_wfh", label: "Parents working from home in another room" },
      { id: "parents_office", label: "Parents at office / local errands (returns evening)" },
      { id: "parents_outstation", label: "Parents traveling / out of station (requires trusted proxy guardian contact)", riskSeverity: "MODERATE" },
    ],
    riskFlagIfAnswer: {
      parents_outstation: {
        label: "Outstation Parent Proxy Protocol",
        severity: "MODERATE",
        mitigation: "Verified local emergency guardian required on record; hourly WhatsApp photo/status updates mandated.",
      },
    },
  },
];

/**
 * Filter questions dynamically for a given recipient and selected tasks
 */
export function getQuestionsForRecipient(
  recipientType: string,
  selectedTaskIds: string[]
): ConditionalQuestion[] {
  return ASSESSMENT_QUESTIONS_CATALOGUE.filter((q) => {
    // Universal questions always include emergency screen
    if (q.category === "EMERGENCY_SCREEN") return true;

    // Check task trigger
    const matchesTask = q.triggerTaskIds?.some((id) => selectedTaskIds.includes(id));
    // Check recipient trigger
    const matchesRecipient = q.triggerRecipientTypes?.includes(recipientType);

    if (q.triggerTaskIds && q.triggerRecipientTypes) {
      return matchesTask || matchesRecipient;
    }
    if (q.triggerTaskIds) return matchesTask;
    if (q.triggerRecipientTypes) return matchesRecipient;
    return false;
  });
}

/**
 * Evaluates risk flags and clinical triage status from assessment answers
 */
export function evaluateAssessmentTriage(
  recipient: Partial<IndividualRecipient>,
  selectedTaskIds: string[],
  answers: Record<string, any>
): {
  riskFlags: RiskFlag[];
  triageStatus: ClinicalTriageStatus;
  clinicalReviewRequired: boolean;
  coordinatorReviewRequired: boolean;
  emergencyAlert: boolean;
} {
  const riskFlags: RiskFlag[] = [];
  let emergencyAlert = false;
  let clinicalReviewRequired = false;
  let coordinatorReviewRequired = false;

  // Check emergency screening
  if (answers["q_emergency_screen"] === "active_emergency") {
    emergencyAlert = true;
    riskFlags.push({
      id: "risk-emergency",
      category: "SAFETY",
      severity: "CRITICAL",
      label: "Active Medical Emergency Reported",
      description: "User indicated acute unstable medical distress.",
      mitigationRequirement: "Immediate hospital ER / 108 emergency escalation advised.",
      requiresReview: true,
    });
  }

  // Iterate questions catalogue to derive flags
  for (const q of ASSESSMENT_QUESTIONS_CATALOGUE) {
    const val = answers[q.id];
    if (!val) continue;

    if (q.riskFlagIfAnswer && q.riskFlagIfAnswer[val]) {
      const cfg = q.riskFlagIfAnswer[val];
      riskFlags.push({
        id: `risk-${q.id}-${val}`,
        category: q.category as any,
        severity: cfg.severity,
        label: cfg.label,
        description: `Triggered by response to: ${q.question}`,
        mitigationRequirement: cfg.mitigation,
        requiresReview: cfg.severity === "HIGH" || cfg.severity === "CRITICAL",
      });

      if (cfg.severity === "CRITICAL" || cfg.severity === "HIGH") {
        coordinatorReviewRequired = true;
      }
    }

    if (q.clinicalReviewTrigger && val) {
      clinicalReviewRequired = true;
    }
  }

  // Check if clinical tasks are selected in taxonomy
  const hasInvasiveClinicalTasks = selectedTaskIds.some((id) =>
    ["task-proc-injections", "task-proc-wound", "task-proc-catheter", "task-proc-feeding-tube", "task-proc-iv-infusion"].includes(id)
  );
  if (hasInvasiveClinicalTasks) {
    clinicalReviewRequired = true;
  }

  // Derive final status
  let triageStatus: ClinicalTriageStatus = "STANDARD_ASSESSMENT";
  if (emergencyAlert) {
    triageStatus = "EMERGENCY_MEDICAL_ADVISED";
  } else if (clinicalReviewRequired) {
    triageStatus = "CLINICAL_REVIEW_REQUIRED";
  } else if (coordinatorReviewRequired) {
    triageStatus = "COORDINATOR_REVIEW_REQUIRED";
  }

  return {
    riskFlags,
    triageStatus,
    clinicalReviewRequired,
    coordinatorReviewRequired,
    emergencyAlert,
  };
}

