import { describe, it, expect } from "vitest";
import {
  CANONICAL_CARE_FAMILIES,
  CANONICAL_SERVICES,
  getCanonicalServiceBySlug,
  getCanonicalServicesByFamily,
} from "@/data/canonicalEcosystem";
import {
  CANONICAL_CITY_CLUSTERS,
  checkCityServiceAvailability,
  getOperationalCities,
  getPlannedExpansionCities,
} from "@/data/cityAvailability";
import {
  CANONICAL_SERVICE_PRICING,
  getCanonicalPricing,
} from "@/data/canonicalPricing";
import { CENTRAL_CLAIMS_REGISTER } from "@/data/claimsRegister";
import { SERVICES } from "@/data/site";

describe("Phase 2 — Canonical Care Ecosystem", () => {
  it("defines all canonical care service families with valid clinical governance", () => {
    expect(CANONICAL_CARE_FAMILIES.length).toBeGreaterThanOrEqual(8);

    CANONICAL_CARE_FAMILIES.forEach((family) => {
      expect(family.id).toBeTruthy();
      expect(family.name).toBeTruthy();
      expect(family.code).toMatch(/^FAM-[A-H]$/);
      expect(family.clinicalGovernance).toBeTruthy();
      expect(["Operational", "Assessment required", "Partner-delivered", "Planned", "Restricted", "Unavailable"]).toContain(
        family.readiness
      );
      expect(family.services.length).toBeGreaterThan(0);
    });
  });

  it("maps every canonical service to a valid provider type and clinical classification", () => {
    expect(CANONICAL_SERVICES.length).toBeGreaterThanOrEqual(11);

    CANONICAL_SERVICES.forEach((service) => {
      expect(service.id).toBeTruthy();
      expect(service.slug).toBeTruthy();
      expect(["Non-Clinical Personal Care", "Medically Licensed Clinical Nursing", "Non-Clinical Accompaniment"]).toContain(
        service.clinicalClassification
      );
      expect(service.applicableTax).toBe("18% Statutory GST (SAC 9993)");
      expect(service.startingPrice).toBeGreaterThan(0);
      expect(service.shiftDurations.length).toBeGreaterThan(0);
      expect(service.supportedActiveCities).toContain("bengaluru");
    });
  });

  it("allows retrieval of canonical services by slug and by family", () => {
    const elderCare = getCanonicalServiceBySlug("elderly-care");
    expect(elderCare).toBeDefined();
    expect(elderCare?.name).toBe("Elderly Care at Home");
    expect(elderCare?.familyId).toBe("fam-elderly-independent-living");

    const familyServices = getCanonicalServicesByFamily("fam-elderly-independent-living");
    expect(familyServices.length).toBeGreaterThan(0);
    expect(familyServices.map((s) => s.slug)).toContain("elderly-care");
  });
});

describe("Phase 2 — City-by-Service Availability Matrix", () => {
  it("distinguishes active operational metros from planned expansion cities", () => {
    const operational = getOperationalCities();
    const planned = getPlannedExpansionCities();

    expect(operational.length).toBe(4); // Bengaluru, Chennai, Hyderabad, Coimbatore
    expect(planned.length).toBe(4); // Kochi, Mysuru, Pune, Visakhapatnam

    expect(operational.map((c) => c.slug)).toEqual(
      expect.arrayContaining(["bengaluru", "chennai", "hyderabad", "coimbatore"])
    );
    expect(planned.map((c) => c.slug)).toEqual(
      expect.arrayContaining(["kochi", "mysuru", "pune", "visakhapatnam"])
    );
  });

  it("returns verified operational status and 90-min SLA for active metro queries", () => {
    const result = checkCityServiceAvailability("bengaluru", "elderly-care");
    expect(result.readiness).toBe("Operational");
    expect(result.canBookDirectly).toBe(true);
    expect(result.backupSLA).toBe("90-Min Regional Backup Protocol");
    expect(result.nextStepHref).toContain("/booking");
  });

  it("returns honest planned status and expression-of-interest link for expansion cities", () => {
    const result = checkCityServiceAvailability("kochi", "elderly-care");
    expect(result.readiness).toBe("Planned");
    expect(result.canBookDirectly).toBe(false);
    expect(result.isPlannedOnly).toBe(true);
    expect(result.nextStepHref).toContain("intent=city_interest");
  });

  it("returns honest unavailable status for non-operational locations", () => {
    const result = checkCityServiceAvailability("delhi", "elderly-care");
    expect(result.readiness).toBe("Unavailable");
    expect(result.canBookDirectly).toBe(false);
    expect(result.requiresAssessment).toBe(true);
  });
});

describe("Phase 2 — Canonical Pricing Engine & GST Standards", () => {
  it("has canonical pricing for all public services", () => {
    SERVICES.forEach((service) => {
      const pricing = getCanonicalPricing(service.slug);
      expect(pricing).toBeDefined();
      expect(pricing?.brokerFee).toBe(0);
      expect(pricing?.taxTreatment.sacCode).toBe("9993");
      expect(pricing?.taxTreatment.gstRate).toBe(0.18);
      expect(pricing?.startingPrice).toBeGreaterThan(0);
    });
  });

  it("distinguishes shift pricing tiers accurately for elderly care", () => {
    const elderlyPricing = CANONICAL_SERVICE_PRICING["elderly-care"];
    expect(elderlyPricing).toBeDefined();
    expect(elderlyPricing.pricingTiers.shift8Hr).toBe(1099);
    expect(elderlyPricing.pricingTiers.shift12Hr).toBe(1299);
    expect(elderlyPricing.pricingTiers.shift24HrLiveIn).toBe(1799);
    // 24hr live-in must be greater than 12hr, which must be greater than 8hr
    expect(elderlyPricing.pricingTiers.shift24HrLiveIn).toBeGreaterThan(elderlyPricing.pricingTiers.shift12Hr!);
    expect(elderlyPricing.pricingTiers.shift12Hr).toBeGreaterThan(elderlyPricing.pricingTiers.shift8Hr!);
  });

  it("provides regional market benchmarks for transparency", () => {
    const nursingPricing = CANONICAL_SERVICE_PRICING["nursing-services"];
    expect(nursingPricing.marketBenchmark.cityAverages["Bengaluru"]).toBeTruthy();
    expect(nursingPricing.marketBenchmark.cityAverages["Chennai"]).toBeTruthy();
  });
});

describe("Phase 2 — Central Trust Claims Register", () => {
  it("tracks all high-impact claims with evidence status and approval owner", () => {
    expect(CENTRAL_CLAIMS_REGISTER.length).toBeGreaterThanOrEqual(6);

    CENTRAL_CLAIMS_REGISTER.forEach((claim) => {
      expect(claim.id).toMatch(/^CLM-\d{3}$/);
      expect(claim.claimCategory).toBeTruthy();
      expect(claim.currentWording).toBeTruthy();
      expect(claim.evidenceRequired).toBeTruthy();
      expect(["VERIFIED", "REVISED_WITH_SAFE_WORDING", "FLAGGED_FOR_OWNER_DECISION", "UNSUPPORTED_REMOVED"]).toContain(
        claim.evidenceStatus
      );
      expect(claim.approvedReplacementWording).toBeTruthy();
      expect(claim.approvalOwner).toBeTruthy();
      expect(claim.lastReviewDate).toBeTruthy();
    });
  });

  it("has revised unverified emergency dispatch into safe cluster backup wording", () => {
    const slaClaim = CENTRAL_CLAIMS_REGISTER.find((c) => c.id === "CLM-001");
    expect(slaClaim).toBeDefined();
    expect(slaClaim?.evidenceStatus).toBe("REVISED_WITH_SAFE_WORDING");
    expect(slaClaim?.approvedReplacementWording).toContain("90-minute regional backup");
  });

  it("requires representative profile disclosure until live roster consent is implemented", () => {
    const profileClaim = CENTRAL_CLAIMS_REGISTER.find((c) => c.id === "CLM-002");
    expect(profileClaim).toBeDefined();
    expect(profileClaim?.evidenceStatus).toBe("REVISED_WITH_SAFE_WORDING");
    expect(profileClaim?.approvedReplacementWording).toContain("Representative Care Specialist Profiles");
  });
});
