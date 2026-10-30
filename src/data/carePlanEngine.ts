/**
 * ApnaCare Service Compatibility & Care-Plan Engine
 * ────────────────────────────────────────────────
 * Converts arbitrary customer task selections across 12 care categories
 * into recommended service modules, professional qualifications, clinical boundary
 * safeguards, transparent pricing, and structured booking parameters.
 */

import {
  CARE_CATEGORIES,
  findTaskById,
  type CareTask,
  type CareCategory,
  type ProfessionalRoleRequired,
  type ClinicalClassification,
} from "./careNeedsTaxonomy";
import { formatINR, SITE } from "./site";
import type { ClinicalTriageStatus, RiskFlag, IndividualRecipient } from "./familyBookingModel";

export type RecipientProfileType =
  | "elderly_parent"
  | "adult"
  | "child"
  | "new_mother"
  | "person_with_disability"
  | "myself"
  | "someone_else";

export type RecipientGender = "male" | "female" | "both" | "other" | "unspecified";

export interface RecipientProfile {
  type: RecipientProfileType;
  label: string;
  gender?: RecipientGender | string;
  ageGroup?: string;
  livingSituation?: string;
}

export type ScheduleType = "one_time" | "daily" | "weekly" | "custom";
export type TimingPreference = "morning" | "afternoon" | "evening" | "overnight" | "flexible";
export type DurationOption = "hourly_4h" | "half_day_8h" | "full_day_12h" | "overnight_12h" | "round_the_clock_24h";

export interface PlanSchedule {
  city: string;
  area: string;
  address?: string;
  venueType: "home" | "hospital" | "transit_hub" | "other";
  scheduleType: ScheduleType;
  timing: TimingPreference;
  duration: DurationOption;
  calendarDays: number;
  startDate?: string;
  startTime?: string;
  customModuleSchedules?: Record<string, { timing: TimingPreference; duration: DurationOption }>;
}

export interface PlanPreferences {
  preferredLanguage: string; // Tamil, Telugu, Kannada, Malayalam, English
  genderPreference: "female_only" | "male_only" | "no_preference";
  continuityRequirement: boolean;
  familyUpdateFrequency: "daily_whatsapp" | "twice_daily" | "weekly_summary";
  specialNotes?: string;
}

export interface RecommendedModule {
  id: string;
  serviceSlug: string;
  title: string;
  categoryName: string;
  requiredRole: ProfessionalRoleRequired;
  clinicalClassification: ClinicalClassification;
  whyRecommended: string;
  coveredTaskNames: string[];
  operationalStatus: "AVAILABLE" | "ASSESSMENT_REQUIRED" | "PARTNER_DEPENDENT";
  statusNote?: string;
  estimatedBaseRatePerShift?: number;
  unit: "shift" | "day" | "visit" | "trip";
}

export interface GeneratedCarePlan {
  id: string;
  recipient: RecipientProfile;
  recipients?: IndividualRecipient[];
  selectedTaskIds: string[];
  selectedTasksByCategory: {
    category: CareCategory;
    tasks: CareTask[];
  }[];
  recommendedModules: RecommendedModule[];
  requiredRoles: ProfessionalRoleRequired[];
  hasClinicalTasks: boolean;
  hasNonClinicalTasks: boolean;
  hasTransitTasks: boolean;
  hasSpecialistRehabTasks: boolean;
  clinicalBoundaryNotice?: string;
  feasibilityStatus: "AVAILABLE" | "ASSESSMENT_REQUIRED" | "PARTNER_DEPENDENT";
  feasibilityReasons: string[];
  triageStatus?: ClinicalTriageStatus;
  riskFlags?: RiskFlag[];
  assessmentAnswers?: Record<string, any>;
  schedule: PlanSchedule;
  preferences: PlanPreferences;
  pricing: {
    estimatedShiftRate: number;
    billableShifts: number;
    subtotal: number;
    gstAmount: number;
    totalAmount: number;
    isEstimateOnly: boolean;
    pricingNote: string;
  };
  whatsAppSummary: string;
  bookingQueryParams: Record<string, string>;
}

export const RECIPIENT_OPTIONS: { id: RecipientProfileType; label: string; sub: string; defaultAgeGroup?: string }[] = [
  { id: "elderly_parent", label: "Elderly Parent", sub: "Senior citizen (60+) needing companionship, mobility, or bedside support", defaultAgeGroup: "70–80 years" },
  { id: "adult", label: "Adult Family Member", sub: "Recovering from surgery, hospitalization, or temporary illness", defaultAgeGroup: "30–59 years" },
  { id: "new_mother", label: "New Mother & Infant", sub: "Postpartum maternal healing, fourth trimester rest, and traditional baby care", defaultAgeGroup: "Newborn + Mother" },
  { id: "person_with_disability", label: "Person with Disability", sub: "Functional physical, sensory, or neurological support", defaultAgeGroup: "Adult / Senior" },
  { id: "child", label: "Child / Toddler", sub: "Gentle childcare assistance, hospital accompaniment, or family relief", defaultAgeGroup: "0–12 years" },
  { id: "myself", label: "Myself", sub: "Personal appointment transit, post-discharge support, or personal escort", defaultAgeGroup: "Self" },
  { id: "someone_else", label: "Someone Else", sub: "Relative, neighbor, or corporate colleague", defaultAgeGroup: "Custom" },
];

/**
 * Multi-Recipient Family Care Plan Generator:
 * Takes multiple individual recipient profiles (e.g. Father needing mobility + Mother needing hygiene),
 * consolidates their tasks, evaluates whether one or two caregivers are needed, and outputs a combined family plan.
 */
export function generateFamilyCarePlan(
  recipients: IndividualRecipient[],
  schedule: PlanSchedule,
  preferences: PlanPreferences,
  customRequirements?: string
): GeneratedCarePlan {
  // Aggregate all unique task IDs across all recipients
  const allTaskIds = Array.from(new Set(recipients.flatMap((r) => r.selectedTaskIds)));

  // Combine risk flags across recipients
  const combinedRiskFlags = recipients.flatMap((r) => r.riskFlags || []);

  // Determine highest triage status
  let triageStatus: ClinicalTriageStatus = "STANDARD_ASSESSMENT";
  if (recipients.some((r) => r.triageStatus === "EMERGENCY_MEDICAL_ADVISED")) {
    triageStatus = "EMERGENCY_MEDICAL_ADVISED";
  } else if (recipients.some((r) => r.triageStatus === "CLINICAL_REVIEW_REQUIRED")) {
    triageStatus = "CLINICAL_REVIEW_REQUIRED";
  } else if (recipients.some((r) => r.triageStatus === "COORDINATOR_REVIEW_REQUIRED")) {
    triageStatus = "COORDINATOR_REVIEW_REQUIRED";
  }

  // Combined answers map
  const combinedAnswers: Record<string, any> = {};
  recipients.forEach((r) => {
    Object.assign(combinedAnswers, r.assessmentAnswers || {});
  });

  const primaryRecipient: RecipientProfile = {
    type: recipients.length > 1 ? "elderly_parent" : (recipients[0]?.relationship.toLowerCase().includes("mother") ? "elderly_parent" : "adult"),
    label: recipients.map((r) => r.name || r.relationship).join(" & "),
    gender: recipients.length > 1 ? "both" : recipients[0]?.gender || "unspecified",
    ageGroup: recipients.map((r) => `${r.relationship}: ${r.age}`).join(" · "),
    livingSituation: recipients[0]?.livingSituation || "Living together",
  };

  return generateCarePlan(
    allTaskIds,
    primaryRecipient,
    schedule,
    preferences,
    customRequirements,
    {
      triageStatus,
      riskFlags: combinedRiskFlags,
      answers: combinedAnswers,
      recipients,
    }
  );
}

/**
 * Service Compatibility Engine:
 * Analyzes selected tasks and determines proper module recommendations,
 * statutory role separations, and feasibility statuses.
 */
export function generateCarePlan(
  selectedTaskIds: string[],
  recipient: RecipientProfile,
  schedule: PlanSchedule,
  preferences: PlanPreferences,
  customRequirements?: string,
  assessmentData?: {
    triageStatus?: ClinicalTriageStatus;
    riskFlags?: RiskFlag[];
    answers?: Record<string, any>;
    recipients?: IndividualRecipient[];
  }
): GeneratedCarePlan {
  const planId = `AC-PLAN-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  // 1. Group tasks by category
  const tasksByCategoryMap = new Map<string, { category: CareCategory; tasks: CareTask[] }>();
  let hasClinical = false;
  let hasNonClinical = false;
  let hasTransit = false;
  let hasSpecialistRehab = false;

  for (const taskId of selectedTaskIds) {
    const found = findTaskById(taskId);
    if (!found) continue;

    const { task, category } = found;
    if (task.clinicalClassification === "CLINICAL_NURSING") hasClinical = true;
    if (task.clinicalClassification === "NON_CLINICAL") hasNonClinical = true;
    if (task.clinicalClassification === "TRANSIT_MOBILITY") hasTransit = true;
    if (task.clinicalClassification === "SPECIALIST_REHAB") hasSpecialistRehab = true;

    if (!tasksByCategoryMap.has(category.id)) {
      tasksByCategoryMap.set(category.id, { category, tasks: [] });
    }
    tasksByCategoryMap.get(category.id)!.tasks.push(task);
  }

  const selectedTasksByCategory = Array.from(tasksByCategoryMap.values());

  // 2. Recommend Service Modules
  const recommendedModules: RecommendedModule[] = [];
  const requiredRolesSet = new Set<ProfessionalRoleRequired>();
  const feasibilityReasons: string[] = [];
  let feasibilityStatus: "AVAILABLE" | "ASSESSMENT_REQUIRED" | "PARTNER_DEPENDENT" = "AVAILABLE";

  // Rule A: Assistive Mobility or Daily Living tasks -> Recommend Saha Care Companion Module
  const mobilityTasks = tasksByCategoryMap.get("cat-mobility")?.tasks ?? [];
  const dailyLivingTasks = tasksByCategoryMap.get("cat-daily-living")?.tasks ?? [];
  const householdTasks = tasksByCategoryMap.get("cat-household")?.tasks ?? [];
  const compTasks = tasksByCategoryMap.get("cat-companionship")?.tasks ?? [];

  const allSahaTasks = [...mobilityTasks, ...dailyLivingTasks, ...householdTasks, ...compTasks];
  if (allSahaTasks.length > 0) {
    requiredRolesSet.add("Saha Care Companion");
    recommendedModules.push({
      id: "mod-saha-daily-care",
      serviceSlug: "elderly-care",
      title: "Saha Home & Daily Living Care",
      categoryName: "Personal Living Assistance",
      requiredRole: "Saha Care Companion",
      clinicalClassification: "NON_CLINICAL",
      whyRecommended: `Matched for ${allSahaTasks.length} non-clinical personal living tasks including ${allSahaTasks.slice(0, 2).map((t) => t.name).join(" & ")}.`,
      coveredTaskNames: allSahaTasks.map((t) => t.name),
      operationalStatus: "AVAILABLE",
      estimatedBaseRatePerShift: schedule.duration === "hourly_4h" ? 899 : schedule.duration === "half_day_8h" ? 1199 : 1499,
      unit: "shift",
    });
  }

  // Rule B: Hospital or Post-Discharge Recovery tasks -> Bedside / Post-Hospital Module
  const hospitalTasks = tasksByCategoryMap.get("cat-hospital-recovery")?.tasks ?? [];
  if (hospitalTasks.length > 0) {
    requiredRolesSet.add("Saha Care Companion");
    recommendedModules.push({
      id: "mod-hospital-recovery",
      serviceSlug: "hospital-attendants",
      title: "Hospital Bedside & Post-Discharge Convalescence",
      categoryName: "Hospital & Recovery Support",
      requiredRole: "Saha Care Companion",
      clinicalClassification: "NON_CLINICAL",
      whyRecommended: "Dedicated continuous bedside accompaniment in ward or post-discharge home recovery.",
      coveredTaskNames: hospitalTasks.map((t) => t.name),
      operationalStatus: "AVAILABLE",
      estimatedBaseRatePerShift: 1499,
      unit: "shift",
    });
  }

  // Rule C: Clinical Nursing tasks -> Registered GNM / B.Sc Nurse Module
  const nursingTasks = tasksByCategoryMap.get("cat-nursing")?.tasks ?? [];
  if (nursingTasks.length > 0) {
    hasClinical = true;
    requiredRolesSet.add("Registered Nurse (GNM/B.Sc)");

    const needsRx = nursingTasks.some((t) => t.requiresDoctorPrescription);
    const needsAssess = nursingTasks.some((t) => t.requiresAssessment);

    if (needsAssess) {
      feasibilityStatus = "ASSESSMENT_REQUIRED";
      feasibilityReasons.push("Clinical recovery or high-dependency nursing requires clinical coordinator triage.");
    }

    recommendedModules.push({
      id: "mod-clinical-nursing",
      serviceSlug: "nursing-services",
      title: "Licensed Clinical Nursing Care",
      categoryName: "Medical & Nursing Care",
      requiredRole: "Registered Nurse (GNM/B.Sc)",
      clinicalClassification: "CLINICAL_NURSING",
      whyRecommended: `Prescribed clinical procedures (${nursingTasks.slice(0, 2).map((t) => t.name).join(", ")}) strictly administered by certified GNM/B.Sc nurses.`,
      coveredTaskNames: nursingTasks.map((t) => t.name),
      operationalStatus: needsAssess ? "ASSESSMENT_REQUIRED" : "AVAILABLE",
      statusNote: needsRx ? "Requires active doctor's prescription" : undefined,
      estimatedBaseRatePerShift: 1999,
      unit: "shift",
    });
  }

  // Rule D: Transit, Pick-Up & Drop -> Licensed Chauffeuse / Transit Module
  const transitTasks = tasksByCategoryMap.get("cat-transit")?.tasks ?? [];
  const safetyTasks = tasksByCategoryMap.get("cat-safety-accompaniment")?.tasks ?? [];
  const allTransitTasks = [...transitTasks, ...safetyTasks];

  if (allTransitTasks.length > 0) {
    hasTransit = true;
    requiredRolesSet.add("Licensed Woman Chauffeuse / Transit Companion");
    recommendedModules.push({
      id: "mod-transit-mobility",
      serviceSlug: "women-drivers",
      title: "Assisted Transit & Safe Mobility Accompaniment",
      categoryName: "Transit & Escort",
      requiredRole: "Licensed Woman Chauffeuse / Transit Companion",
      clinicalClassification: "TRANSIT_MOBILITY",
      whyRecommended: "Door-to-door transit, appointment waiting, and airport/railway assisted accompaniment.",
      coveredTaskNames: allTransitTasks.map((t) => t.name),
      operationalStatus: "AVAILABLE",
      estimatedBaseRatePerShift: 899,
      unit: "trip",
    });
  }

  // Rule E: Maternal, Newborn & Childcare -> Postnatal / Nanny Module
  const maternalTasks = tasksByCategoryMap.get("cat-maternal-infant")?.tasks ?? [];
  if (maternalTasks.length > 0) {
    const isChildNanny = recipient.type === "child" || maternalTasks.some((t) => t.id.startsWith("task-child-"));
    requiredRolesSet.add("Saha Care Companion");
    recommendedModules.push({
      id: isChildNanny ? "mod-childcare-nanny" : "mod-maternal-postnatal",
      serviceSlug: isChildNanny ? "home-personal-care" : "post-natal-care",
      title: isChildNanny ? "Trusted Childcare & Nanny Support" : "Postnatal Maternal & Newborn Support",
      categoryName: isChildNanny ? "Childcare & Family" : "Maternity & Newborn",
      requiredRole: "Saha Care Companion",
      clinicalClassification: "NON_CLINICAL",
      whyRecommended: isChildNanny
        ? "Attentive child supervision, nutritious meals, bedtime routines, and parent updates during travel or work."
        : "Traditional mother recovery nutrition, newborn warm bath, and sleep routine guidance.",
      coveredTaskNames: maternalTasks.map((t) => t.name),
      operationalStatus: "AVAILABLE",
      estimatedBaseRatePerShift: isChildNanny ? 1299 : 1799,
      unit: "day",
    });
  }

  // Rule F: Rehabilitation & Specialist Therapies -> Specialist Rehab Partner
  const rehabTasks = tasksByCategoryMap.get("cat-rehabilitation")?.tasks ?? [];
  if (rehabTasks.length > 0) {
    hasSpecialistRehab = true;
    requiredRolesSet.add("Physiotherapist / Specialist Therapist");
    feasibilityStatus = "ASSESSMENT_REQUIRED";
    feasibilityReasons.push("Physiotherapy and rehabilitation require prior clinical assessment by a verified physical therapist.");
    recommendedModules.push({
      id: "mod-specialist-rehab",
      serviceSlug: "nursing-services",
      title: "Specialist Physiotherapy & Functional Rehab",
      categoryName: "Rehabilitation",
      requiredRole: "Physiotherapist / Specialist Therapist",
      clinicalClassification: "SPECIALIST_REHAB",
      whyRecommended: "Targeted musculoskeletal mobilization, post-surgical gait rehabilitation, or neuro-motor therapy.",
      coveredTaskNames: rehabTasks.map((t) => t.name),
      operationalStatus: "ASSESSMENT_REQUIRED",
      statusNote: "Assessment & prescription protocol review required",
      estimatedBaseRatePerShift: 1200,
      unit: "visit",
    });
  }

  // Rule G: Disability & High Dependency tasks
  const disabilityTasks = tasksByCategoryMap.get("cat-disability")?.tasks ?? [];
  if (disabilityTasks.length > 0) {
    const needsAssess = disabilityTasks.some((t) => t.requiresAssessment);
    if (needsAssess && feasibilityStatus === "AVAILABLE") {
      feasibilityStatus = "ASSESSMENT_REQUIRED";
      feasibilityReasons.push("High-dependency or neurological conditions require a care coordinator home evaluation.");
    }
  }

  // Rule H: Caregiver Relief & Remote Coordination
  const reliefTasks = tasksByCategoryMap.get("cat-caregiver-relief")?.tasks ?? [];
  if (reliefTasks.length > 0) {
    requiredRolesSet.add("Care Coordinator Desk");
    recommendedModules.push({
      id: "mod-care-coordination",
      serviceSlug: "elderly-care",
      title: "Remote Family Oversight & Dedicated Coordinator Desk",
      categoryName: "Coordination & Relief",
      requiredRole: "Care Coordinator Desk",
      clinicalClassification: "COORDINATION",
      whyRecommended: "Daily structured WhatsApp reports, doctor appointment synchronization, and sibling updates.",
      coveredTaskNames: reliefTasks.map((t) => t.name),
      operationalStatus: "AVAILABLE",
      unit: "shift",
    });
  }

  // 3. Clinical vs Non-Clinical Boundary Notice
  let clinicalBoundaryNotice: string | undefined;
  if (hasClinical && hasNonClinical) {
    clinicalBoundaryNotice =
      "Statutory Care Separation: Your plan combines supportive daily living tasks (handled by your Saha Care Companion) with medical procedures (injections, catheter, sterile dressings — performed exclusively by a Registered GNM/B.Sc Nurse under doctor prescription).";
  } else if (hasClinical) {
    clinicalBoundaryNotice =
      "Medical Scope: All selected clinical procedures are administered strictly by licensed GNM / B.Sc nurses under a valid physician prescription.";
  }

  // 4. City Coverage Verification
  const activeMetros = ["bengaluru", "chennai", "hyderabad", "coimbatore"];
  const isCoveredCity = activeMetros.includes(schedule.city.toLowerCase());
  if (!isCoveredCity && schedule.city) {
    feasibilityStatus = "PARTNER_DEPENDENT";
    feasibilityReasons.push(`Direct on-demand dispatch is currently concentrated in 4 active metros (Bengaluru, Chennai, Hyderabad, Coimbatore). ${schedule.city} requests are handled via expression of interest.`);
  }

  // 5. Pricing Calculation (Multi-Module Transparent Aggregation)
  // Determine shift duration & frequency
  let shiftsPerDay = 1;
  let hoursPerShift = 8;
  if (schedule.duration === "hourly_4h") hoursPerShift = 4;
  else if (schedule.duration === "half_day_8h") hoursPerShift = 8;
  else if (schedule.duration === "full_day_12h" || schedule.duration === "overnight_12h") hoursPerShift = 12;
  else if (schedule.duration === "round_the_clock_24h") {
    hoursPerShift = 24;
    shiftsPerDay = 2; // Two 12h shifts or 24h live-in
  }

  // Billable shifts calculation
  let totalShifts = schedule.calendarDays;
  if (schedule.scheduleType === "weekly") {
    totalShifts = Math.max(1, Math.round(schedule.calendarDays * (5 / 7)));
  } else if (schedule.scheduleType === "one_time") {
    totalShifts = 1;
  }
  totalShifts = totalShifts * shiftsPerDay;

  // Base shift rate based on recommended modules
  // Primary module rate + reduced addon rates to avoid double charging
  let estimatedShiftRate = 0;
  if (recommendedModules.length > 0) {
    // Primary module gets full rate, secondary gets marginal fee
    const rates = recommendedModules
      .map((m) => m.estimatedBaseRatePerShift ?? 0)
      .sort((a, b) => b - a);
    estimatedShiftRate = rates[0] || 1200;
    for (let i = 1; i < rates.length; i++) {
      estimatedShiftRate += Math.round(rates[i] * 0.35); // 35% incremental add-on for multi-module coverage
    }
  } else {
    estimatedShiftRate = 1200;
  }

  const subtotal = estimatedShiftRate * totalShifts;
  const gstAmount = Math.round(subtotal * SITE.GST_RATE);
  const totalAmount = subtotal + gstAmount;

  const isEstimateOnly = feasibilityStatus !== "AVAILABLE" || hasSpecialistRehab;
  const pricingNote = isEstimateOnly
    ? "Estimated indicative total. Final quote confirmed after clinical coordinator review."
    : "Includes statutory 18% GST tax invoice (SAC 9993). Zero agency broker fees.";

  // 6. WhatsApp Formatted Summary
  const requiredRolesArray = Array.from(requiredRolesSet);
  const taskNamesList = selectedTasksByCategory
    .flatMap((c) => c.tasks.map((t) => `• ${t.name} (${c.category.name})`))
    .slice(0, 8)
    .join("\n");

  const recipientGenderTag = recipient.gender
    ? `${recipient.gender === "both" ? "Both Parents" : recipient.gender === "male" ? "Male" : recipient.gender === "female" ? "Female" : recipient.gender}, `
    : "";

  const whatsAppSummary = encodeURIComponent(
    `*ApnaCare Custom Care Plan (${planId})*\n\n` +
      `*Recipient:* ${recipient.label} (${recipientGenderTag}${recipient.ageGroup || "Age specified in consultation"})\n` +
      `*City & Area:* ${schedule.city}, ${schedule.area || "Area to confirm"}\n` +
      `*Schedule:* ${schedule.scheduleType.toUpperCase()} · ${schedule.duration} (${totalShifts} billable shifts)\n` +
      `*Language:* ${preferences.preferredLanguage}\n\n` +
      `*Care Tasks Selected (${selectedTaskIds.length}):*\n${taskNamesList}\n\n` +
      (clinicalBoundaryNotice ? `*Clinical Notice:* ${clinicalBoundaryNotice}\n\n` : "") +
      `*Estimated Total:* ${formatINR(totalAmount)} (incl. 18% GST)\n\n` +
      (customRequirements ? `*Special Notes:* ${customRequirements}\n\n` : "") +
      `Please connect me with a regional coordinator to confirm this customized plan.`
  );

  // 7. Booking Query Parameters
  const primaryServiceSlug =
    recommendedModules[0]?.serviceSlug ?? "elderly-care";

  const bookingQueryParams: Record<string, string> = {
    service: primaryServiceSlug,
    city: schedule.city.toLowerCase(),
    duration: String(totalShifts),
    time: schedule.startTime || "09:00",
    hours: String(hoursPerShift),
    shift: schedule.duration,
    schedule: schedule.scheduleType,
    planId,
  };

  if (assessmentData?.triageStatus === "CLINICAL_REVIEW_REQUIRED" || assessmentData?.triageStatus === "COORDINATOR_REVIEW_REQUIRED" || assessmentData?.triageStatus === "EMERGENCY_MEDICAL_ADVISED") {
    feasibilityStatus = "ASSESSMENT_REQUIRED";
    if (assessmentData?.triageStatus === "CLINICAL_REVIEW_REQUIRED") {
      feasibilityReasons.push("Clinical procedure or prescription verification required before staff assignment.");
    }
    if (assessmentData?.triageStatus === "EMERGENCY_MEDICAL_ADVISED") {
      feasibilityReasons.push("Emergency condition reported — routine home placement blocked.");
    }
  }

  return {
    id: planId,
    recipient,
    recipients: assessmentData?.recipients,
    selectedTaskIds,
    selectedTasksByCategory,
    recommendedModules,
    requiredRoles: requiredRolesArray,
    hasClinicalTasks: hasClinical,
    hasNonClinicalTasks: hasNonClinical,
    hasTransitTasks: hasTransit,
    hasSpecialistRehabTasks: hasSpecialistRehab,
    clinicalBoundaryNotice,
    feasibilityStatus,
    feasibilityReasons,
    triageStatus: assessmentData?.triageStatus,
    riskFlags: assessmentData?.riskFlags,
    assessmentAnswers: assessmentData?.answers,
    schedule,
    preferences,
    pricing: {
      estimatedShiftRate,
      billableShifts: totalShifts,
      subtotal,
      gstAmount,
      totalAmount,
      isEstimateOnly,
      pricingNote,
    },
    whatsAppSummary,
    bookingQueryParams,
  };
}

