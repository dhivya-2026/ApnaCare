/**
 * ApnaCare Unified Booking & Consultation Engine
 * ────────────────────────────────────────────────
 * Centralized state, synchronization, lifecycle definitions, and submission handlers
 * across all three customer entry points:
 *
 * Entry A: Personalise Care (Needs-first dynamic configurator)
 * Entry B: Book a Service (Direct service-led guided booking)
 * Entry C: Talk to Us (Consultation & callback request)
 */

import { formatINR, SITE } from "@/data/site";
import { submitLeadWithReliability } from "@/lib/analytics";
import type { GeneratedCarePlan, PlanSchedule, PlanPreferences, RecipientProfile } from "@/data/carePlanEngine";
import type { ClinicalTriageStatus, IndividualRecipient, RiskFlag } from "@/data/familyBookingModel";

// ─── Lifecycle Status Types (Section 6) ────────────────────────────────────────

export type ConsultationStatus =
  | "Draft"
  | "Submitted"
  | "Callback pending"
  | "Contacted"
  | "Assessment initiated"
  | "Converted to booking"
  | "Closed";

export type BookingLifecycleStatus =
  | "Draft"
  | "Assessment in progress"
  | "Submitted"
  | "Information required"
  | "Clinical review required"
  | "Coordinator review"
  | "Matching"
  | "Awaiting confirmation"
  | "Confirmed"
  | "Active"
  | "Completed"
  | "Cancelled";

export interface UnifiedCustomerProfile {
  name: string;
  phone: string;
  email: string;
  city: string;
  relationship: string;
  emergencyName?: string;
  emergencyPhone?: string;
  fullAddress?: string;
}

export interface UnifiedConsultationRecord {
  consultationId: string;
  customer: UnifiedCustomerProfile;
  serviceRequested: string;
  timeframe: string;
  message?: string;
  status: ConsultationStatus;
  submittedAt: string;
  source: string;
}

export interface UnifiedBookingRecord {
  bookingRef: string;
  planId: string;
  customer: UnifiedCustomerProfile;
  recipient: RecipientProfile;
  recipients?: IndividualRecipient[];
  selectedTaskIds: string[];
  schedule: PlanSchedule;
  preferences: PlanPreferences;
  pricing: {
    estimatedShiftRate: number;
    billableShifts: number;
    subtotal: number;
    gstAmount: number;
    totalAmount: number;
  };
  triageStatus: ClinicalTriageStatus;
  clinicalReviewRequired: boolean;
  coordinatorReviewRequired: boolean;
  emergencyAlert: boolean;
  riskFlags: RiskFlag[];
  status: BookingLifecycleStatus;
  idempotencyToken: string;
  submittedAt: string;
}

// ─── Shared Storage Keys ──────────────────────────────────────────────────────

export const STORAGE_KEYS = {
  CUSTOMER: "apnacare_unified_customer_v1",
  ACTIVE_PLAN: "apnacare_active_care_plan",
  PLAN_DRAFT: "apnacare_custom_care_plan_draft_v2",
  CONSULTATION: "apnacare_active_consultation_v1",
} as const;

// ─── Storage Helpers ──────────────────────────────────────────────────────────

export function getSavedCustomer(): UnifiedCustomerProfile {
  if (typeof window === "undefined") {
    return { name: "", phone: "", email: "", city: "Bengaluru", relationship: "Family Member" };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOMER);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return { name: "", phone: "", email: "", city: "Bengaluru", relationship: "Family Member" };
}

export function saveCustomer(profile: Partial<UnifiedCustomerProfile>): void {
  if (typeof window === "undefined") return;
  try {
    const current = getSavedCustomer();
    const updated = { ...current, ...profile };
    localStorage.setItem(STORAGE_KEYS.CUSTOMER, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export function getSavedCarePlan(): GeneratedCarePlan | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.ACTIVE_PLAN) || localStorage.getItem(STORAGE_KEYS.PLAN_DRAFT);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.plan) return parsed.plan;
      if (parsed.id && parsed.pricing) return parsed;
    }
  } catch {
    // fallback
  }
  return null;
}

export function saveCarePlan(plan: GeneratedCarePlan): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEYS.ACTIVE_PLAN, JSON.stringify(plan));
    localStorage.setItem(STORAGE_KEYS.PLAN_DRAFT, JSON.stringify(plan));
  } catch {
    // ignore
  }
}

// ─── Entry C: Consultation Submission (Not an auto-confirmed booking) ──────────

export async function submitConsultationRequest(data: {
  name: string;
  phone: string;
  email?: string;
  service: string;
  city: string;
  timeframe: string;
  message?: string;
  sourceSection?: string;
}): Promise<{ success: boolean; consultationId: string; error?: string }> {
  const consultationId = `AC-CON-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  saveCustomer({ name: data.name, phone: data.phone, email: data.email, city: data.city });

  try {
    const res = await submitLeadWithReliability(
      {
        event_type: "consultation",
        event_name: "consultation_requested",
        lead_type: "CONSULTATION",
        consultation_id: consultationId,
        enquiry_id: consultationId,
        customer_name: data.name,
        name: data.name,
        phone: data.phone,
        mobile: data.phone,
        email: data.email || "",
        service: data.service,
        service_name: data.service,
        city: data.city,
        timeframe: data.timeframe,
        consultation_status: "Submitted", // Section 6 lifecycle
        booking_status: "Draft", // Explicitly NOT confirmed
        follow_up_status: "Callback pending",
        message: data.message ? `[${data.timeframe}] ${data.message}` : `[${data.timeframe}]`,
        lead_source: data.sourceSection || "talk_to_us_form",
      },
      "AC-CON"
    );

    return {
      success: res.success,
      consultationId,
      error: res.success ? undefined : "Submission failed",
    };
  } catch (err: any) {
    return { success: false, consultationId, error: err.message || "Network error" };
  }
}

// ─── Entry A & B: Structured Booking Submission (Explicit Lifecycle) ──────────

export async function submitUnifiedBooking(data: {
  bookingRef: string;
  plan: GeneratedCarePlan;
  customer: UnifiedCustomerProfile;
  idempotencyToken?: string;
  entryPoint: "ENTRY_A_PERSONALISE" | "ENTRY_B_DIRECT_SERVICE";
}): Promise<{ success: boolean; bookingRef: string; error?: string }> {
  const { bookingRef, plan, customer, entryPoint } = data;
  saveCustomer(customer);
  saveCarePlan(plan);

  // Determine initial booking lifecycle status (Section 6)
  let initialStatus: BookingLifecycleStatus = "Submitted";
  if (plan.triageStatus === "CLINICAL_REVIEW_REQUIRED") {
    initialStatus = "Clinical review required";
  } else if (plan.triageStatus === "COORDINATOR_REVIEW_REQUIRED") {
    initialStatus = "Coordinator review";
  } else if (plan.triageStatus === "EMERGENCY_MEDICAL_ADVISED") {
    initialStatus = "Information required";
  }

  try {
    const res = await submitLeadWithReliability(
      {
        event_type: "booking",
        event_name: "booking_submitted",
        lead_type: "BOOKING",
        booking_ref: bookingRef,
        plan_id: plan.id,
        idempotency_token: data.idempotencyToken || `IDEMP-${bookingRef}`,
        customer_name: customer.name,
        name: customer.name,
        phone: customer.phone,
        mobile: customer.phone,
        email: customer.email,
        customer_relationship: customer.relationship,
        emergency_contact_name: customer.emergencyName || "",
        emergency_contact_phone: customer.emergencyPhone || "",
        recipient_name: plan.recipient.label,
        recipient_type: plan.recipient.type,
        recipient_gender: plan.recipient.gender,
        recipient_age: plan.recipient.ageGroup || "",
        city: plan.schedule.city,
        area: plan.schedule.area,
        full_address: customer.fullAddress || "",
        service_id: plan.recommendedModules[0]?.serviceSlug || "elderly-care",
        service_name: plan.recommendedModules.map((m) => m.title).join(" + "),
        duration_days: plan.schedule.calendarDays,
        shift_timing: plan.schedule.timing,
        reporting_time: plan.schedule.startTime || "08:00",
        preferred_language: plan.preferences.preferredLanguage,
        caregiver_gender_preference: plan.preferences.genderPreference,
        selected_tasks_count: plan.selectedTaskIds.length,
        selected_task_ids: plan.selectedTaskIds.join(", "),
        triage_status: plan.triageStatus || "STANDARD_ASSESSMENT",
        booking_status: initialStatus, // Initial lifecycle status, NOT auto-confirmed!
        follow_up_status: "Pending Coordinator Review",
        estimated_shift_rate: plan.pricing.estimatedShiftRate,
        estimated_subtotal: plan.pricing.subtotal,
        estimated_gst: plan.pricing.gstAmount,
        total_amount: plan.pricing.totalAmount,
        entry_point: entryPoint,
        lead_source: entryPoint === "ENTRY_B_DIRECT_SERVICE" ? "direct_service_booking" : "care_planner_journey",
      },
      "AC-BK"
    );

    return {
      success: res.success,
      bookingRef,
      error: res.success ? undefined : "Submission failed",
    };
  } catch (err: any) {
    return { success: false, bookingRef, error: err.message || "Network error" };
  }
}

