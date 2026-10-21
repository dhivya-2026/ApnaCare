import { describe, it, expect } from "vitest";
import {
  SENIOR_CARE_CATEGORIES,
  SENIOR_CARE_SERVICES,
  getSeniorCareService,
  getSeniorCareServicesByCategory,
} from "@/data/senior-care-catalog";

describe("Senior Care Service Directory Taxonomy", () => {
  it("contains all 8 required categories (A through H)", () => {
    expect(SENIOR_CARE_CATEGORIES.length).toBe(8);
    const codes = SENIOR_CARE_CATEGORIES.map((c) => c.code);
    expect(codes).toEqual(["A", "B", "C", "D", "E", "F", "G", "H"]);
  });

  it("contains all required service categories with at least 2 services each", () => {
    SENIOR_CARE_CATEGORIES.forEach((cat) => {
      const services = getSeniorCareServicesByCategory(cat.id);
      expect(services.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("includes Hospital Visit Companion under Category C with full 5-step workflow", () => {
    const companion = getSeniorCareService("hospital-visit-companion");
    expect(companion).toBeDefined();
    expect(companion?.name).toContain("Hospital Visit Companion");
    expect(companion?.categoryCode).toBe("C");
    expect(companion?.categoryId).toBe("hospital-visits");
    expect(companion?.processSteps?.length).toBeGreaterThanOrEqual(5);
    expect(companion?.inclusions.length).toBeGreaterThanOrEqual(5);
    expect(companion?.exclusions.length).toBeGreaterThanOrEqual(3);
    expect(companion?.clinicalBoundaryNotice).toBeDefined();
  });

  it("strictly separates non-clinical attendants from licensed nurses and therapists", () => {
    const gdaServices = SENIOR_CARE_SERVICES.filter(
      (s) => s.providerRoleTag === "Non-Clinical Attendant"
    );
    const clinicalServices = SENIOR_CARE_SERVICES.filter(
      (s) => s.providerRoleTag === "Clinical Nurse"
    );
    const therapistServices = SENIOR_CARE_SERVICES.filter(
      (s) => s.providerRoleTag === "Therapist / Doctor"
    );

    expect(gdaServices.length).toBeGreaterThanOrEqual(10);
    expect(clinicalServices.length).toBeGreaterThanOrEqual(3);
    expect(therapistServices.length).toBeGreaterThanOrEqual(3);

    // Verify clinical services require licensed nurse
    clinicalServices.forEach((s) => {
      expect(s.providerType).toContain("Registered Nurse");
    });
  });

  it("all services link to valid core booking paths", () => {
    const validBookingSlugs = [
      "elderly-care",
      "hospital-attendants",
      "nursing-services",
      "travel-assistance",
      "women-drivers",
    ];

    SENIOR_CARE_SERVICES.forEach((s) => {
      expect(validBookingSlugs).toContain(s.baseBookingSlug);
      expect(s.inclusions.length).toBeGreaterThanOrEqual(2);
      expect(s.exclusions.length).toBeGreaterThanOrEqual(1);
      expect(s.whoFor.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("correctly identifies availability statuses (verified vs assessment vs partner)", () => {
    const verified = SENIOR_CARE_SERVICES.filter((s) => s.status === "VERIFIED_AVAILABLE");
    const assessment = SENIOR_CARE_SERVICES.filter((s) => s.status === "ASSESSMENT_REQUIRED");
    const partner = SENIOR_CARE_SERVICES.filter((s) => s.status === "PARTNER_COORDINATION");

    expect(verified.length).toBeGreaterThanOrEqual(12);
    expect(assessment.length).toBeGreaterThanOrEqual(3);
    expect(partner.length).toBeGreaterThanOrEqual(3);
  });
});
