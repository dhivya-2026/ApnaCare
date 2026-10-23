import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  APNACARE_EVENT_TAXONOMY,
  ApnaCareEventName,
  sanitizeAnalyticsPayload,
  trackDeduplicated,
  submitLeadWithReliability,
  SENSITIVE_PII_KEYS,
} from "@/lib/analytics";
import { CANONICAL_NEEDS_DISCOVERY } from "@/data/taxonomy";
import {
  checkCityServiceAvailability,
  getOperationalCities,
  getPlannedExpansionCities,
} from "@/data/cityAvailability";
import { SERVICES, CITIES } from "@/data/site";
import { getCanonicalPricing } from "@/data/canonicalPricing";

describe("Phase 5 — Analytics Event Taxonomy & Privacy Guardrails", () => {
  const REQUIRED_EVENTS: ApnaCareEventName[] = [
    "care_situation_selected",
    "service_detail_viewed",
    "city_availability_checked",
    "pricing_details_viewed",
    "consultation_cta_clicked",
    "booking_started",
    "booking_step_completed",
    "booking_validation_failed",
    "booking_submission_attempted",
    "booking_submission_succeeded",
    "booking_submission_failed",
    "whatsapp_contact_clicked",
    "phone_contact_clicked",
    "city_interest_submitted",
  ];

  it("defines all 14 mandatory Phase 5 events in the taxonomy dictionary with trigger, permitted properties, and business purpose", () => {
    REQUIRED_EVENTS.forEach((eventName) => {
      const def = APNACARE_EVENT_TAXONOMY[eventName];
      expect(def, `Missing taxonomy definition for ${eventName}`).toBeDefined();
      expect(def.name).toBe(eventName);
      expect(def.trigger.length).toBeGreaterThan(10);
      expect(def.permittedProperties.length).toBeGreaterThan(0);
      expect(def.businessPurpose.length).toBeGreaterThan(10);
    });
  });

  it("strictly scrubs PII (names, phones, emails, street addresses, clinical notes) from telemetry payloads", () => {
    const rawPayloadWithPii = {
      event_type: "telemetry",
      service_id: "elderly-care",
      city: "Bengaluru",
      customer_name: "Anita Sharma",
      name: "Anita Sharma",
      phone: "+91 98765 43210",
      mobile: "9876543210",
      email: "anita.sharma@example.com",
      address: "Flat 401, Palm Court, Indiranagar",
      location_address: "Palm Court, Indiranagar",
      notes: "Patient has high blood pressure and needs insulin monitoring",
      special_notes: "Dementia stage 2 diagnosis",
      patient_diagnosis: "Dementia",
      duration_days: 14,
      starting_price: 1299,
    };

    const sanitized = sanitizeAnalyticsPayload(rawPayloadWithPii);

    // Verify non-sensitive properties are preserved
    expect(sanitized.service_id).toBe("elderly-care");
    expect(sanitized.city).toBe("Bengaluru");
    expect(sanitized.duration_days).toBe(14);
    expect(sanitized.starting_price).toBe(1299);

    // Verify all sensitive PII keys are stripped
    expect(sanitized.customer_name).toBeUndefined();
    expect(sanitized.name).toBeUndefined();
    expect(sanitized.phone).toBeUndefined();
    expect(sanitized.mobile).toBeUndefined();
    expect(sanitized.email).toBeUndefined();
    expect(sanitized.address).toBeUndefined();
    expect(sanitized.location_address).toBeUndefined();
    expect(sanitized.notes).toBeUndefined();
    expect(sanitized.special_notes).toBeUndefined();
    expect(sanitized.patient_diagnosis).toBeUndefined();

    // Verify SENSITIVE_PII_KEYS contains all core personal identifiers
    expect(SENSITIVE_PII_KEYS.has("name")).toBe(true);
    expect(SENSITIVE_PII_KEYS.has("mobile")).toBe(true);
    expect(SENSITIVE_PII_KEYS.has("phone")).toBe(true);
    expect(SENSITIVE_PII_KEYS.has("email")).toBe(true);
    expect(SENSITIVE_PII_KEYS.has("clinical_notes")).toBe(true);
  });

  it("scrubs embedded phone numbers and email addresses even if placed in arbitrary key values", () => {
    const maliciousPayload = {
      source: "referral_user@gmail.com",
      contact_string: "+919876543210",
      valid_category: "senior_living",
    };

    const sanitized = sanitizeAnalyticsPayload(maliciousPayload);
    expect(sanitized.source).toBeUndefined();
    expect(sanitized.contact_string).toBeUndefined();
    expect(sanitized.valid_category).toBe("senior_living");
  });

  it("deduplicates rapid event triggers within a window to prevent duplicate telemetry", () => {
    const dedupKey = "session_test_" + Date.now();
    const firstCall = trackDeduplicated("consultation_cta_clicked", dedupKey, { service: "elderly-care" }, 1500);
    const secondCall = trackDeduplicated("consultation_cta_clicked", dedupKey, { service: "elderly-care" }, 1500);

    expect(firstCall).toBe(true);
    expect(secondCall).toBe(false); // second call is suppressed
  });
});

describe("Phase 5 — Customer Journey Scenarios & Readiness Validation", () => {
  it("Scenario A (Family seeking eldercare): verifies canonical service mapping, pricing, and 90-min cluster backup SLA", () => {
    const elderDiscovery = CANONICAL_NEEDS_DISCOVERY.find((n) => n.id === "need-elderly-support");
    expect(elderDiscovery).toBeDefined();
    expect(elderDiscovery?.suggestedServiceSlug).toBe("elderly-care");

    const availability = checkCityServiceAvailability("bengaluru", "elderly-care");
    expect(availability.readiness).toBe("Operational");
    expect(availability.canBookDirectly).toBe(true);
    expect(availability.backupSLA).toContain("90-Min");
    expect(availability.nextStepHref).toBe("/booking?city=Bengaluru&service=elderly-care");

    const pricing = getCanonicalPricing("elderly-care");
    expect(pricing).toBeDefined();
    expect(pricing?.startingPrice).toBe(1299);
    expect(pricing?.taxTreatment.sacCode).toBe("9993");
    expect(pricing?.taxTreatment.label).toContain("18% statutory GST");
  });

  it("Scenario B (Hospital bedside assistance): maintains strict distinction between bedside attendants and qualified nurses", () => {
    const bedsideDiscovery = CANONICAL_NEEDS_DISCOVERY.find((n) => n.id === "need-hospital-homecoming");
    expect(bedsideDiscovery).toBeDefined();
    expect(bedsideDiscovery?.providerType).toContain("General Duty Assistant");
    expect(bedsideDiscovery?.clinicalBoundary).toContain("Sterile wound dressings and clinical monitoring require licensed nursing");

    const hospitalService = SERVICES.find((s) => s.slug === "hospital-attendants");
    expect(hospitalService).toBeDefined();
    expect(hospitalService?.whoFor.length).toBeGreaterThan(0);
  });

  it("Scenario C (Home nursing): enforces clinical prescription requirement and intake assessment prerequisites", () => {
    const nursingDiscovery = CANONICAL_NEEDS_DISCOVERY.find((n) => n.id === "need-clinical-nursing");
    expect(nursingDiscovery).toBeDefined();
    expect(nursingDiscovery?.providerType).toContain("Registered Nurse");
    expect(nursingDiscovery?.clinicalBoundary).toContain("registered doctor's written prescription");

    const nursingPricing = getCanonicalPricing("nursing-services");
    expect(nursingPricing).toBeDefined();
    expect(nursingPricing?.pricingTiers.perVisit).toBeDefined();
    expect(nursingPricing?.taxTreatment.sacCode).toBe("9993");
  });

  it("Scenario D (Postnatal support): clarifies maternal recovery scope and schedule options", () => {
    const postnatalDiscovery = CANONICAL_NEEDS_DISCOVERY.find((n) => n.id === "need-postpartum-support");
    expect(postnatalDiscovery).toBeDefined();
    expect(postnatalDiscovery?.suggestedServiceSlug).toBe("post-natal-care");
    expect(postnatalDiscovery?.clinicalBoundary).toContain("Non-clinical postpartum support");

    const postnatalService = SERVICES.find((s) => s.slug === "post-natal-care");
    expect(postnatalService).toBeDefined();
    expect(postnatalService?.startingPrice).toBe(1999);
  });

  it("Scenario E (Travel assistance): establishes transit boundary and per-trip or daily duration terms", () => {
    const travelDiscovery = CANONICAL_NEEDS_DISCOVERY.find((n) => n.id === "need-safe-journey");
    expect(travelDiscovery).toBeDefined();
    expect(travelDiscovery?.suggestedServiceSlug).toBe("women-drivers");
    expect(travelDiscovery?.priceUnit).toBe("day");

    const travelPricing = getCanonicalPricing("travel-assistance");
    expect(travelPricing?.pricingType).toBe("Confirmed");
    expect(travelPricing?.pricingTiers.perTrip).toBeDefined();
  });

  it("Scenario F (Planned city): guides visitor to expression-of-interest without live booking or misleading availability claims", () => {
    const plannedCities = getPlannedExpansionCities();
    expect(plannedCities.length).toBeGreaterThan(0);
    const kochi = plannedCities.find((c) => c.slug === "kochi");
    expect(kochi).toBeDefined();

    const result = checkCityServiceAvailability("kochi", "elderly-care");
    expect(result.readiness).toBe("Planned");
    expect(result.canBookDirectly).toBe(false);
    expect(result.isPlannedOnly).toBe(true);
    expect(result.backupSLA).toBeNull();
    expect(result.nextStepLabel).toContain("Express Interest");
    expect(result.nextStepHref).toContain("/contact?intent=city_interest&city=Kochi");
  });
});

describe("Phase 5 — Lead Pipeline Reliability & Idempotency", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    // Mock global fetch to test reliability response states without live internet dependency
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ status: "success" }),
      text: async () => "ok",
    } as unknown as Response);
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("generates structured reliable lead submission responses distinguishing status states", async () => {
    const payload = {
      booking_ref: "AC-TEST-1234",
      service_id: "elderly-care",
      city: "Bengaluru",
      duration_days: 7,
    };

    const resp = await submitLeadWithReliability(payload, "AC");
    expect(resp.referenceId).toBe("AC-TEST-1234");
    expect(typeof resp.success).toBe("boolean");
    expect(typeof resp.status).toBe("string");
    expect(["WEBHOOK_ACCEPTED", "STATUS_UNKNOWN", "DOWNSTREAM_FAILED"]).toContain(resp.status);
    expect(resp.timestamp).toBeTruthy();
  });

  it("handles transmission failure cleanly with retryAvailable flag set to true", async () => {
    // Simulate network error
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Network connection lost"));

    const resp = await submitLeadWithReliability({
      booking_ref: "AC-FAIL-999",
      service_id: "hospital-attendants",
    });

    expect(resp.success).toBe(false);
    expect(["STATUS_UNKNOWN", "DOWNSTREAM_FAILED"]).toContain(resp.status);
    expect(resp.retryAvailable).toBe(true);
    expect(resp.referenceId).toBe("AC-FAIL-999");
  });

  it("preserves unique client reference tokens for duplicate transmission detection", async () => {
    const tokenA = "AC-" + Date.now().toString(36).toUpperCase().slice(-6);
    const respA = await submitLeadWithReliability({ booking_ref: tokenA, service_id: "hospital-attendants" });
    expect(respA.referenceId).toBe(tokenA);
  });
});

describe("Phase 5 — Production Readiness & Operational Guardrails", () => {
  it("confirms 4 operational metros and strictly separates them from planned expansion cities", () => {
    const operational = getOperationalCities();
    const planned = getPlannedExpansionCities();

    expect(operational.length).toBe(4);
    const operationalSlugs = operational.map((c) => c.slug);
    expect(operationalSlugs).toEqual(["bengaluru", "chennai", "hyderabad", "coimbatore"]);

    const plannedSlugs = planned.map((c) => c.slug);
    expect(plannedSlugs).toContain("kochi");
    expect(plannedSlugs).toContain("mysuru");
    expect(plannedSlugs).toContain("pune");

    // Guarantee no intersection
    operationalSlugs.forEach((slug) => {
      expect(plannedSlugs).not.toContain(slug);
    });
  });

  it("verifies tax disclosures are consistently SAC 9993 and 18% statutory GST across all services", () => {
    SERVICES.forEach((service) => {
      const canonical = getCanonicalPricing(service.slug);
      expect(canonical).toBeDefined();
      expect(canonical?.taxTreatment.sacCode).toBe("9993");
      expect(canonical?.taxTreatment.gstRate).toBe(0.18);
      expect(canonical?.taxTreatment.label).toContain("18% statutory GST");
    });
  });
});
