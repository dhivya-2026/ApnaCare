import { describe, it, expect } from "vitest";
import {
  CENTRAL_CLAIMS_REGISTER,
  Phase4VerificationStatus,
  TrustClaimRecord,
} from "@/data/claimsRegister";
import {
  CANONICAL_SERVICE_PRICING,
  getCanonicalPricing,
} from "@/data/canonicalPricing";
import {
  CANONICAL_CARE_FAMILIES,
  CANONICAL_SERVICES,
  getCanonicalServiceBySlug,
} from "@/data/canonicalEcosystem";
import {
  checkCityServiceAvailability,
  getOperationalCities,
  getPlannedExpansionCities,
} from "@/data/cityAvailability";
import { SERVICES, CITIES, SITE } from "@/data/site";
import {
  APPS_SCRIPT_URL,
  AIRTABLE_BASE_ID,
  AIRTABLE_TABLE_ID,
  JIRA_PROJECT_KEY,
} from "@/lib/analytics";

describe("Phase 4 — Public Claims Verification Audit & Registry Integrity", () => {
  it("maintains a complete 10-claim register with all Phase 4 audit fields", () => {
    expect(CENTRAL_CLAIMS_REGISTER.length).toBe(10);

    const validStatuses: Phase4VerificationStatus[] = [
      "Verified",
      "Partially verified",
      "Pending owner confirmation",
      "Pending professional review",
      "Unsupported",
      "Retired",
    ];

    CENTRAL_CLAIMS_REGISTER.forEach((claim: TrustClaimRecord) => {
      expect(claim.id).toMatch(/^CLM-\d{3}$/);
      expect(claim.category).toBeTruthy();
      expect(claim.publicWording).toBeTruthy();
      expect(claim.locationsFound.length).toBeGreaterThan(0);
      expect(claim.evidenceRequired).toBeTruthy();
      expect(claim.evidenceAvailableInRepo).toBeTruthy();
      expect(validStatuses).toContain(claim.verificationStatus);
      expect(claim.ownerNeeded).toBeTruthy();
      expect(claim.recommendedWording).toBeTruthy();
      expect(claim.requiredFollowUp).toBeTruthy();
      expect(claim.lastReviewDate).toBeTruthy();
    });
  });

  it("strictly records UIDAI biometric claim (CLM-003) as partially verified with grounded wording", () => {
    const idClaim = CENTRAL_CLAIMS_REGISTER.find((c) => c.id === "CLM-003");
    expect(idClaim).toBeDefined();
    expect(idClaim?.verificationStatus).toBe("Partially verified");
    expect(idClaim?.recommendedWording).toContain("Government Photo ID Verified");
    expect(idClaim?.evidenceAvailableInRepo).toContain("No direct UIDAI biometric API integration");
  });

  it("strictly records medical insurance reimbursement (CLM-005) as pending professional review", () => {
    const insuranceClaim = CENTRAL_CLAIMS_REGISTER.find((c) => c.id === "CLM-005");
    expect(insuranceClaim).toBeDefined();
    expect(insuranceClaim?.verificationStatus).toBe("Pending professional review");
    expect(insuranceClaim?.recommendedWording).toContain("insurer policy terms");
    expect(insuranceClaim?.evidenceAvailableInRepo).toContain("retail health insurance policies in India generally exclude");
  });

  it("strictly records rapid emergency dispatch (CLM-008) with verified city coverage standards", () => {
    const coverageClaim = CENTRAL_CLAIMS_REGISTER.find((c) => c.id === "CLM-008");
    expect(coverageClaim).toBeDefined();
    expect(coverageClaim?.verificationStatus).toBe("Verified");
    expect(coverageClaim?.category).toBe("Service Coverage & City Availability");
  });

  it("strictly records historical retention stats (CLM-010) as pending owner confirmation", () => {
    const statsClaim = CENTRAL_CLAIMS_REGISTER.find((c) => c.id === "CLM-010");
    expect(statsClaim).toBeDefined();
    expect(statsClaim?.verificationStatus).toBe("Pending owner confirmation");
    expect(statsClaim?.ownerNeeded).toContain("Business Owner");
  });
});

describe("Phase 4 — Commercial Pricing Integrity & Display Consistency", () => {
  it("enforces explicit pricing types and SAC 9993 GST treatment across all canonical services", () => {
    expect(Object.keys(CANONICAL_SERVICE_PRICING).length).toBeGreaterThanOrEqual(11);

    Object.entries(CANONICAL_SERVICE_PRICING).forEach(([slug, pricing]) => {
      expect(["Confirmed", "Starting price", "Indicative estimate", "Assessment required"]).toContain(
        pricing.pricingType
      );
      expect(pricing.startingPrice).toBeGreaterThan(0);
      expect(pricing.brokerFee).toBe(0);
      expect(pricing.depositRequired).toBe(false);
      expect(pricing.taxTreatment.gstRate).toBe(0.18);
      expect(pricing.taxTreatment.sacCode).toBe("9993");
      expect(pricing.shiftAssumptions).toBeTruthy();
    });
  });

  it("ensures starting prices are positive and explicitly disclosed for all public services", () => {
    SERVICES.forEach((service) => {
      const canonical = getCanonicalPricing(service.slug);
      expect(canonical).toBeDefined();
      expect(canonical?.startingPrice).toBeGreaterThan(0);
      expect(service.startingPrice).toBeGreaterThan(0);
    });

    // Verify key core care price alignments
    expect(getCanonicalPricing("elderly-care")?.startingPrice).toBe(1299);
    expect(getCanonicalPricing("hospital-attendants")?.startingPrice).toBe(1499);
    expect(getCanonicalPricing("nursing-services")?.startingPrice).toBe(1999);
    expect(getCanonicalPricing("post-natal-care")?.startingPrice).toBe(1999);
    expect(getCanonicalPricing("home-personal-care")?.startingPrice).toBe(1099);
  });

  it("verifies hierarchical pricing tiers (8h <= 12h < 24h live-in) for elderly care and hospital assistance", () => {
    const elderly = CANONICAL_SERVICE_PRICING["elderly-care"];
    expect(elderly.pricingTiers.shift8Hr).toBe(1099);
    expect(elderly.pricingTiers.shift12Hr).toBe(1299);
    expect(elderly.pricingTiers.shift24HrLiveIn).toBe(1799);
    expect(elderly.pricingTiers.shift8Hr!).toBeLessThan(elderly.pricingTiers.shift12Hr!);
    expect(elderly.pricingTiers.shift12Hr!).toBeLessThan(elderly.pricingTiers.shift24HrLiveIn!);

    const hospital = CANONICAL_SERVICE_PRICING["hospital-attendants"];
    expect(hospital.pricingTiers.shift12Hr).toBe(1499);
    expect(hospital.pricingTiers.shift24HrLiveIn).toBe(2099);
    expect(hospital.pricingTiers.shift12Hr!).toBeLessThan(hospital.pricingTiers.shift24HrLiveIn!);
  });
});

describe("Phase 4 — Clinical Governance & Role Boundaries", () => {
  it("enforces strict statutory role separation between non-clinical attendants and registered nurses", () => {
    const attendantService = getCanonicalServiceBySlug("elderly-care");
    expect(attendantService?.clinicalClassification).toBe("Non-Clinical Personal Care");
    expect(attendantService?.providerType).toBe("General Duty Assistant (Attendant)");
    expect(
      attendantService?.exclusions.some(
        (e) => e.toLowerCase().includes("injection") || e.toLowerCase().includes("wound")
      )
    ).toBe(true);

    const nurseService = getCanonicalServiceBySlug("nursing-services");
    expect(nurseService?.clinicalClassification).toBe("Medically Licensed Clinical Nursing");
    expect(nurseService?.providerType).toBe("Registered Nurse (GNM / B.Sc)");
    expect(
      nurseService?.inclusions.some(
        (i) => i.toLowerCase().includes("dressing") || i.toLowerCase().includes("injection")
      )
    ).toBe(true);
  });
});

describe("Phase 4 — City-Service Readiness & Anti-Misrepresentation Safeguards", () => {
  it("enforces live booking ONLY for operational metros and blocks direct booking for expansion hubs", () => {
    const operational = getOperationalCities();
    expect(operational.length).toBe(4);
    operational.forEach((city) => {
      const res = checkCityServiceAvailability(city.slug, "elderly-care");
      expect(res.canBookDirectly).toBe(true);
      expect(res.readiness).toBe("Operational");
    });

    const planned = getPlannedExpansionCities();
    expect(planned.length).toBe(4);
    planned.forEach((city) => {
      expect(city.overallReadiness).toBe("Planned");
      expect(city.operationalServices.length).toBe(0);
      const res = checkCityServiceAvailability(city.slug, "hospital-attendants");
      expect(res.canBookDirectly).toBe(false);
      expect(res.nextStepHref).toContain("intent=city_interest");
    });
  });
});

describe("Phase 4 — Downstream Integration & Webhook Contract Integrity", () => {
  it("preserves valid Google Apps Script, Airtable, and Jira production contract identifiers", () => {
    expect(APPS_SCRIPT_URL).toBeTruthy();
    expect(APPS_SCRIPT_URL).toContain("script.google.com");
    expect(AIRTABLE_BASE_ID).toBe("appd5rLxicUUJpImD");
    expect(AIRTABLE_TABLE_ID).toBe("tbl6DnBguLMnvIQI8");
    expect(JIRA_PROJECT_KEY).toBe("APNA");
  });

  it("verifies public contact channels and phone numbers are consistent", () => {
    expect(SITE.SUPPORT_PHONE).toBe("+91 88254 93949");
    expect(SITE.SUPPORT_PHONE_TEL).toBe("+918825493949");
    expect(SITE.WHATSAPP).toBe("918825493949");
    expect(SITE.EMAIL).toBe("care@apnacare.in");
  });
});
