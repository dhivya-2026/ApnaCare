import { describe, it, expect } from "vitest";
import {
  CARE_CATEGORIES,
  findTaskById,
  searchTasksByKeyword,
} from "../data/careNeedsTaxonomy";
import {
  generateCarePlan,
  RECIPIENT_OPTIONS,
  RecipientProfile,
  PlanSchedule,
  PlanPreferences,
} from "../data/carePlanEngine";

describe("ApnaCare Intelligent Care Customisation Engine", () => {
  describe("Care Needs Taxonomy (12 Primary Categories)", () => {
    it("defines exactly 12 primary care categories", () => {
      expect(CARE_CATEGORIES).toHaveLength(12);
    });

    it("includes all 12 required category IDs in order", () => {
      const expectedIds = [
        "cat-mobility",
        "cat-transit",
        "cat-daily-living",
        "cat-nursing",
        "cat-hospital-recovery",
        "cat-companionship",
        "cat-household",
        "cat-maternal-infant",
        "cat-disability",
        "cat-rehabilitation",
        "cat-caregiver-relief",
        "cat-safety-accompaniment",
      ];
      expect(CARE_CATEGORIES.map((c) => c.id)).toEqual(expectedIds);
    });

    it("verifies every category has valid subcategories and non-empty tasks", () => {
      for (const cat of CARE_CATEGORIES) {
        expect(cat.name).toBeTruthy();
        expect(cat.subcategories.length).toBeGreaterThanOrEqual(1);
        for (const sub of cat.subcategories) {
          expect(sub.tasks.length).toBeGreaterThanOrEqual(2);
          for (const task of sub.tasks) {
            expect(task.id).toBeTruthy();
            expect(task.name).toBeTruthy();
            expect([
              "Saha Care Companion",
              "Registered Nurse (GNM/B.Sc)",
              "Physiotherapist / Specialist Therapist",
              "Licensed Woman Chauffeuse / Transit Companion",
              "Care Coordinator Desk",
            ]).toContain(task.requiredRole);
            expect([
              "NON_CLINICAL",
              "CLINICAL_NURSING",
              "SPECIALIST_REHAB",
              "TRANSIT_MOBILITY",
              "COORDINATION",
            ]).toContain(task.clinicalClassification);
          }
        }
      }
    });

    it("strictly tags invasive clinical tasks as CLINICAL_NURSING and requiring Registered Nurse", () => {
      const injectionFound = findTaskById("task-proc-injections");
      expect(injectionFound).toBeDefined();
      expect(injectionFound?.task.clinicalClassification).toBe("CLINICAL_NURSING");
      expect(injectionFound?.task.requiredRole).toBe("Registered Nurse (GNM/B.Sc)");
      expect(injectionFound?.task.requiresDoctorPrescription).toBe(true);

      const woundFound = findTaskById("task-proc-wound");
      expect(woundFound).toBeDefined();
      expect(woundFound?.task.clinicalClassification).toBe("CLINICAL_NURSING");
      expect(woundFound?.task.requiredRole).toBe("Registered Nurse (GNM/B.Sc)");
      expect(woundFound?.task.requiresDoctorPrescription).toBe(true);

      const catheterFound = findTaskById("task-proc-catheter");
      expect(catheterFound).toBeDefined();
      expect(catheterFound?.task.clinicalClassification).toBe("CLINICAL_NURSING");
      expect(catheterFound?.task.requiredRole).toBe("Registered Nurse (GNM/B.Sc)");
    });

    it("identifies non-clinical daily living tasks as Saha care companion scope", () => {
      const bathFound = findTaskById("task-hyg-sponge");
      expect(bathFound).toBeDefined();
      expect(bathFound?.task.clinicalClassification).toBe("NON_CLINICAL");
      expect(bathFound?.task.requiredRole).toBe("Saha Care Companion");

      const walkFound = findTaskById("task-walk-indoor");
      expect(walkFound).toBeDefined();
      expect(walkFound?.task.clinicalClassification).toBe("NON_CLINICAL");
      expect(walkFound?.task.requiredRole).toBe("Saha Care Companion");
    });

    it("searches tasks effectively by keyword across names, descriptions, and tags", () => {
      const walkerResults = searchTasksByKeyword("walker");
      expect(walkerResults.length).toBeGreaterThanOrEqual(1);
      expect(walkerResults.some((r) => r.task.id === "task-walk-walker")).toBe(true);

      const insulinResults = searchTasksByKeyword("insulin");
      expect(insulinResults.length).toBeGreaterThanOrEqual(1);
      expect(insulinResults.some((r) => r.task.id === "task-proc-insulin")).toBe(true);

      const nonExistent = searchTasksByKeyword("quantum_mechanics_xyz");
      expect(nonExistent).toHaveLength(0);
    });

    it("provides recipient profiles with age ranges and description hints", () => {
      expect(RECIPIENT_OPTIONS.length).toBeGreaterThanOrEqual(7);
      expect(RECIPIENT_OPTIONS.map((p) => p.id)).toContain("elderly_parent");
      expect(RECIPIENT_OPTIONS.map((p) => p.id)).toContain("new_mother");
    });
  });

  describe("Care Plan Generation Engine (generateCarePlan)", () => {
    const baseRecipient: RecipientProfile = {
      type: "elderly_parent",
      label: "Elderly Parent",
      ageGroup: "75-84",
      livingSituation: "Living with family",
    };

    const baseSchedule: PlanSchedule = {
      city: "Chennai",
      area: "Adyar",
      venueType: "home",
      scheduleType: "daily",
      timing: "morning",
      duration: "half_day_8h",
      calendarDays: 7,
      startTime: "08:00",
    };

    const basePreferences: PlanPreferences = {
      preferredLanguage: "Tamil",
      genderPreference: "no_preference",
      continuityRequirement: true,
      familyUpdateFrequency: "daily_whatsapp",
    };

    it("generates an elderly home care plan for mobility and personal daily living", () => {
      const plan = generateCarePlan(
        ["task-walk-indoor", "task-hyg-sponge", "task-comp-conversation"],
        baseRecipient,
        baseSchedule,
        basePreferences
      );

      expect(plan.id).toMatch(/^AC-PLAN-/);
      expect(plan.selectedTaskIds).toHaveLength(3);
      expect(plan.hasClinicalTasks).toBe(false);
      expect(plan.clinicalBoundaryNotice).toBeUndefined();

      // Verify recommended module is elderly-care
      expect(plan.recommendedModules.length).toBeGreaterThanOrEqual(1);
      expect(plan.recommendedModules.some((m) => m.serviceSlug === "elderly-care")).toBe(true);

      // Verify transparent pricing and GST
      expect(plan.pricing.estimatedShiftRate).toBeGreaterThan(0);
      expect(plan.pricing.billableShifts).toBe(7);
      expect(plan.pricing.subtotal).toBe(plan.pricing.estimatedShiftRate * 7);
      expect(plan.pricing.gstAmount).toBe(Math.round(plan.pricing.subtotal * 0.18));
      expect(plan.pricing.totalAmount).toBe(plan.pricing.subtotal + plan.pricing.gstAmount);
      expect(plan.feasibilityStatus).toBe("AVAILABLE");
    });

    it("enforces clinical boundary alerts when both clinical and non-clinical tasks are selected", () => {
      const plan = generateCarePlan(
        [
          "task-walk-indoor",
          "task-hyg-sponge",
          "task-proc-injections",
          "task-proc-wound",
        ],
        baseRecipient,
        { ...baseSchedule, duration: "full_day_12h", calendarDays: 14 },
        basePreferences
      );

      expect(plan.hasClinicalTasks).toBe(true);
      expect(plan.hasNonClinicalTasks).toBe(true);

      // Must have statutory clinical boundary notice
      expect(plan.clinicalBoundaryNotice).toBeDefined();
      expect(plan.clinicalBoundaryNotice).toContain("Statutory Care Separation");

      // Should recommend both nursing services and elderly care modules
      expect(plan.recommendedModules.some((m) => m.serviceSlug === "nursing-services")).toBe(true);
      expect(plan.recommendedModules.some((m) => m.serviceSlug === "elderly-care")).toBe(true);
      expect(plan.requiredRoles).toContain("Registered Nurse (GNM/B.Sc)");
      expect(plan.requiredRoles).toContain("Saha Care Companion");
    });

    it("maps transit tasks to women-drivers module", () => {
      const plan = generateCarePlan(
        ["task-trans-home-hosp", "task-local-pharmacy"],
        baseRecipient,
        { ...baseSchedule, duration: "hourly_4h", calendarDays: 1 },
        basePreferences
      );

      expect(plan.recommendedModules.some((m) => m.serviceSlug === "women-drivers")).toBe(true);
      expect(plan.feasibilityStatus).toBe("AVAILABLE");
    });

    it("maps postpartum and newborn tasks to post-natal-care module", () => {
      const plan = generateCarePlan(
        ["task-nb-bath", "task-mat-daily"],
        { type: "new_mother", label: "New Mother & Infant", ageGroup: "25-34" },
        { ...baseSchedule, duration: "full_day_12h", calendarDays: 30 },
        { ...basePreferences, preferredLanguage: "Malayalam" }
      );

      expect(plan.recommendedModules.some((m) => m.serviceSlug === "post-natal-care")).toBe(true);
      expect(plan.hasClinicalTasks).toBe(false);
      expect(plan.pricing.subtotal).toBeGreaterThan(0);
    });

    it("generates WhatsApp share message containing plan ID, tasks, and itemized pricing", () => {
      const plan = generateCarePlan(
        ["task-walk-indoor", "task-hyg-sponge"],
        baseRecipient,
        baseSchedule,
        basePreferences
      );

      const decoded = decodeURIComponent(plan.whatsAppSummary);
      expect(decoded).toContain(plan.id);
      expect(decoded).toContain("Indoor walking assistance");
      expect(decoded).toContain("Chennai");
      expect(decoded).toContain("18% GST");
      expect(plan.bookingQueryParams.city).toBe("chennai");
      expect(plan.bookingQueryParams.planId).toBe(plan.id);
    });

    it("marks specialist tracheostomy/rehab tasks as ASSESSMENT_REQUIRED", () => {
      const plan = generateCarePlan(
        ["task-rhb-physio"],
        baseRecipient,
        { ...baseSchedule, duration: "round_the_clock_24h" },
        basePreferences
      );

      expect(plan.feasibilityStatus).toBe("ASSESSMENT_REQUIRED");
      expect(plan.feasibilityReasons.some((r) => r.toLowerCase().includes("assessment"))).toBe(true);
    });
  });
});
