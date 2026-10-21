import { describe, it, expect } from "vitest";
import {
  CATALOGUE_CATEGORIES,
  CATALOGUE_SERVICES,
  CUSTOMER_ENTRY_POINTS,
  getCatalogueServicesByCategory,
  getCatalogueServiceById,
} from "../data/serviceCatalogue";

describe("Service Catalogue & Customer Segments Architecture", () => {
  it("defines all six canonical service categories", () => {
    expect(CATALOGUE_CATEGORIES.length).toBe(6);

    const codes = CATALOGUE_CATEGORIES.map((c) => c.code);
    expect(codes).toEqual(["A", "B", "C", "D", "E", "F"]);

    const ids = CATALOGUE_CATEGORIES.map((c) => c.id);
    expect(ids).toContain("care-at-home");
    expect(ids).toContain("hospital-assistance");
    expect(ids).toContain("travel-assistance");
    expect(ids).toContain("womens-mobility");
    expect(ids).toContain("family-support");
    expect(ids).toContain("business-institutional");

    // Category F is strictly designated as institutional
    const bizCat = CATALOGUE_CATEGORIES.find((c) => c.id === "business-institutional");
    expect(bizCat?.isInstitutional).toBe(true);
  });

  it("contains all 14 specified Care at Home services", () => {
    const homeServices = getCatalogueServicesByCategory("care-at-home");
    expect(homeServices.length).toBe(14);

    const names = homeServices.map((s) => s.name.toLowerCase());
    expect(names).toContain("elderly companion care");
    expect(names).toContain("daily living assistance");
    expect(names).toContain("mobility assistance");
    expect(names).toContain("medication reminders");
    expect(names).toContain("meal assistance");
    expect(names).toContain("respite care for family caregivers");
    expect(names).toContain("overnight and live-in care, subject to availability");
    expect(names).toContain("dementia companionship by appropriately trained caregivers");
    expect(names).toContain("post-operative recovery assistance");
    expect(names).toContain("home nursing by qualified professionals");
    expect(names).toContain("postnatal mother care");
    expect(names).toContain("newborn care assistance");
    expect(names).toContain("night-time newborn assistance");
    expect(names).toContain("physiotherapy coordination with qualified professionals");
  });

  it("contains all 7 specified Hospital Assistance services", () => {
    const hospitalServices = getCatalogueServicesByCategory("hospital-assistance");
    expect(hospitalServices.length).toBe(7);

    const names = hospitalServices.map((s) => s.name.toLowerCase());
    expect(names).toContain("hospital bedside attendants");
    expect(names).toContain("patient companionship");
    expect(names).toContain("hospital admission and discharge assistance");
    expect(names).toContain("mobility and wheelchair assistance");
    expect(names).toContain("hospital visit escorts");
    expect(names).toContain("non-medical patient support");
    expect(names).toContain("post-discharge assistance at home");
  });

  it("contains all 11 specified Travel Assistance services", () => {
    const travelServices = getCatalogueServicesByCategory("travel-assistance");
    expect(travelServices.length).toBe(11);

    const names = travelServices.map((s) => s.name.toLowerCase());
    expect(names).toContain("women travel companions");
    expect(names).toContain("railway station assistance");
    expect(names).toContain("bus terminal assistance");
    expect(names).toContain("intercity travel assistance");
    expect(names).toContain("airport pickup and drop-off coordination");
    expect(names).toContain("airport meet-and-greet assistance");
    expect(names).toContain("senior citizen travel assistance");
    expect(names).toContain("luggage and terminal navigation assistance");
    expect(names).toContain("door-to-door travel assistance, where available");
    expect(names).toContain("hospital and appointment escorts");
    expect(names).toContain("journey updates to designated family members");
  });

  it("contains all 9 specified Women's Mobility services", () => {
    const mobilityServices = getCatalogueServicesByCategory("womens-mobility");
    expect(mobilityServices.length).toBe(9);

    const names = mobilityServices.map((s) => s.name.toLowerCase());
    expect(names).toContain("women-only car-sharing coordination");
    expect(names).toContain("women travel companions");
    expect(names).toContain("workplace commute assistance");
    expect(names).toContain("personal safety escorts");
    expect(names).toContain("appointment and shopping escorts");
    expect(names).toContain("event accompaniment");
    expect(names).toContain("late-evening travel accompaniment, subject to availability");
    expect(names).toContain("verified companion booking");
    expect(names).toContain("family or emergency contact coordination");
  });

  it("contains all 7 specified Family Support services", () => {
    const familyServices = getCatalogueServicesByCategory("family-support");
    expect(familyServices.length).toBe(7);

    const names = familyServices.map((s) => s.name.toLowerCase());
    expect(names).toContain("temporary household assistance");
    expect(names).toContain("meal preparation assistance");
    expect(names).toContain("childcare and babysitting, subject to appropriate screening and safeguarding");
    expect(names).toContain("family caregiver respite");
    expect(names).toContain("short-term home assistance");
    expect(names).toContain("recurring scheduled assistance");
    expect(names).toContain("personal errands and accompaniment");
  });

  it("contains all 7 specified Business and Institutional Services with dedicated business enquiry action", () => {
    const bizServices = getCatalogueServicesByCategory("business-institutional");
    expect(bizServices.length).toBe(7);

    const names = bizServices.map((s) => s.name.toLowerCase());
    expect(names).toContain("hospital attendant staffing partnerships");
    expect(names).toContain("employee caregiving support");
    expect(names).toContain("corporate travel assistance");
    expect(names).toContain("women employee commute programmes");
    expect(names).toContain("institutional care partnerships");
    expect(names).toContain("bulk service bookings");
    expect(names).toContain("referral partnerships");

    // All business services must require business_enquiry action
    for (const service of bizServices) {
      expect(service.actionType).toBe("business_enquiry");
    }
  });

  it("contains all 9 Customer-Focused Entry Points ('How can we help you?')", () => {
    expect(CUSTOMER_ENTRY_POINTS.length).toBe(9);

    const questions = CUSTOMER_ENTRY_POINTS.map((e) => e.question);
    expect(questions).toContain("I need care for my elderly parent");
    expect(questions).toContain("I need assistance for a patient");
    expect(questions).toContain("I need help after surgery");
    expect(questions).toContain("I need support for my newborn or postnatal recovery");
    expect(questions).toContain("I need a travel companion");
    expect(questions).toContain("I need airport or railway assistance");
    expect(questions).toContain("I need women-only travel or car-sharing assistance");
    expect(questions).toContain("I need temporary help at home");
    expect(questions).toContain("I represent a hospital or organization");

    for (const entry of CUSTOMER_ENTRY_POINTS) {
      const targetCat = CATALOGUE_CATEGORIES.find((c) => c.id === entry.targetCategoryId);
      expect(targetCat).toBeDefined();

      const targetSvc = getCatalogueServiceById(entry.suggestedServiceId);
      expect(targetSvc).toBeDefined();
    }
  });

  it("enforces explicit non-medical and clinical boundaries across all services", () => {
    for (const service of CATALOGUE_SERVICES) {
      expect(service.whatIncluded.length).toBeGreaterThanOrEqual(2);
      expect(service.whatNotIncluded.length).toBeGreaterThanOrEqual(1);
      expect(typeof service.isClinical).toBe("boolean");
      expect(service.intendedCustomer.length).toBeGreaterThan(10);
      expect(service.keyBenefits.length).toBeGreaterThanOrEqual(2);
    }
  });
});
