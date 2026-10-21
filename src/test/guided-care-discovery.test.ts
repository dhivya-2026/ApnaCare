import { describe, it, expect } from "vitest";
import {
  NEEDS_CATALOG,
  VERIFIED_CITIES,
  filterNeedsCatalog,
  getCustomerNeed,
  type CustomerNeed,
} from "../data/needs-catalog";
import { SERVICES } from "../data/site";

describe("Customer Needs & Service Verification Catalog", () => {
  it("contains valid, structured needs records across all core domains", () => {
    expect(NEEDS_CATALOG.length).toBeGreaterThanOrEqual(10);

    const validStatuses = [
      "VERIFIED_AVAILABLE",
      "NEEDS_BUSINESS_CONFIRMATION",
      "PARTNER_OR_REFERRAL_REQUIRED",
      "NOT_CURRENTLY_SUPPORTED",
    ];

    NEEDS_CATALOG.forEach((need) => {
      expect(need.id).toBeTruthy();
      expect(need.label).toBeTruthy();
      expect(need.situation).toBeTruthy();
      expect(need.description).toBeTruthy();
      expect(need.audience).toBeTruthy();
      expect(validStatuses).toContain(need.status);
      expect(need.safetyBoundary).toBeTruthy();
      expect(need.evidenceBasis).toBeTruthy();
      expect(need.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it("strictly enforces verified price and qualification integrity for VERIFIED_AVAILABLE needs", () => {
    const verified = NEEDS_CATALOG.filter((n) => n.status === "VERIFIED_AVAILABLE");
    expect(verified.length).toBeGreaterThan(0);

    verified.forEach((need) => {
      expect(need.price).toBeGreaterThan(0);
      expect(["day", "trip", "consultation"]).toContain(need.billingBasis);
      expect(need.primaryServiceSlug).toBeTruthy();
      expect(need.professionalQualification.length).toBeGreaterThan(10);
      expect(need.inclusions.length).toBeGreaterThan(0);
      expect(need.exclusions.length).toBeGreaterThan(0);

      // Verify that primaryServiceSlug matches an active service in SERVICES
      const matched = SERVICES.find((s) => s.slug === need.primaryServiceSlug);
      expect(matched).toBeDefined();
      expect(matched?.active).toBe(true);
    });
  });

  it("strictly enforces clinical boundaries for shoulder and joint pain (NEED-ELD-02)", () => {
    const jointNeed = getCustomerNeed("NEED-ELD-02");
    expect(jointNeed).toBeDefined();
    expect(jointNeed?.status).toBe("VERIFIED_AVAILABLE");
    expect(jointNeed?.primaryServiceSlug).toBe("elderly-care");

    // Must clearly state clinical notice and boundaries
    expect(jointNeed?.clinicalNotice).toContain("do not provide clinical physiotherapy");
    expect(jointNeed?.safetyBoundary).toContain("CRITICAL CLINICAL BOUNDARY");
    expect(jointNeed?.exclusions.some((e) => e.includes("diagnose"))).toBe(true);
  });

  it("correctly flags In-Home Physiotherapy as PARTNER_OR_REFERRAL_REQUIRED", () => {
    const physio = getCustomerNeed("NEED-SPEC-PHYSIO");
    expect(physio).toBeDefined();
    expect(physio?.status).toBe("PARTNER_OR_REFERRAL_REQUIRED");
    expect(physio?.primaryServiceSlug).toBeNull();
    expect(physio?.bookingPath).toBeNull();
    expect(physio?.safetyBoundary).toContain("CRITICAL SCOPE LIMITATION");
    expect(physio?.professionalQualification).toContain("Licensed Physiotherapist (BPT / MPT)");
  });

  it("correctly flags acute emergencies as NOT_CURRENTLY_SUPPORTED with 108 referral", () => {
    const emergency = getCustomerNeed("NEED-SPEC-EMERGENCY");
    expect(emergency).toBeDefined();
    expect(emergency?.status).toBe("NOT_CURRENTLY_SUPPORTED");
    expect(emergency?.primaryServiceSlug).toBeNull();
    expect(emergency?.safetyBoundary).toContain("108");
    expect(emergency?.clinicalNotice).toContain("Call 108 immediately");
  });

  it("correctly filters needs by recipient category and active cities", () => {
    const elderlyBengaluru = filterNeedsCatalog("elderly_parent", "Bengaluru");
    expect(elderlyBengaluru.length).toBeGreaterThanOrEqual(3);
    elderlyBengaluru.forEach((n) => {
      expect(n.category).toBe("elderly_parent");
      expect(n.supportedCities).toContain("Bengaluru");
    });

    const maternalChennai = filterNeedsCatalog("new_mother", "Chennai");
    expect(maternalChennai.length).toBeGreaterThanOrEqual(1);
    expect(maternalChennai[0]?.primaryServiceSlug).toBe("post-natal-care");

    const travelHyderabad = filterNeedsCatalog("traveler", "Hyderabad");
    expect(travelHyderabad.length).toBeGreaterThanOrEqual(3);
  });

  it("supports all 4 primary operating metros across verified services", () => {
    expect(VERIFIED_CITIES).toEqual(["Bengaluru", "Chennai", "Hyderabad", "Coimbatore"]);

    VERIFIED_CITIES.forEach((city) => {
      const cityServices = filterNeedsCatalog("all", city);
      expect(cityServices.length).toBeGreaterThan(5);
    });
  });
});
