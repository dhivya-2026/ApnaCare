import { describe, it, expect, beforeEach } from "vitest";
import {
  SUPPORT_DIVISIONS,
  SUPPORT_SERVICES,
  ASSISTED_LIVING_SOLUTIONS,
  CARE_BUILDER_CATEGORIES,
  getSupportService,
  getAliasRedirect,
  resolveFieldOptions,
} from "@/data/supportServices";
import { checkCityServiceAvailability } from "@/data/cityAvailability";
import { createBooking, getAllBookings, resetMockStoreForTesting } from "@/server/auth/sheets-dal";
import { handleUserAction } from "@/server/auth/routes/user-dispatcher";
import { createSession } from "@/server/session/session-manager";
import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";

describe("LifeSakhi Support Ecosystem Expansion", () => {
  beforeEach(() => {
    resetMockStoreForTesting();
  });

  it("exposes all 3 support divisions and 10 support services with booking fields", () => {
    expect(SUPPORT_DIVISIONS.map((d) => d.id)).toEqual([
      "home-care",
      "travel-mobility",
      "assisted-living-technology",
    ]);
    expect(SUPPORT_SERVICES).toHaveLength(10);
    for (const svc of SUPPORT_SERVICES) {
      expect(svc.fields.length).toBeGreaterThan(0);
      expect(svc.seo.title).toBeTruthy();
      expect(svc.seo.description).toBeTruthy();
    }
  });

  it("maps alias slugs to canonical established URLs without duplicating pages", () => {
    expect(getAliasRedirect("home-care-elderly")).toBe("elderly-care");
    expect(getAliasRedirect("home-nursing")).toBe("nursing-services");
    expect(getAliasRedirect("new-mom-support")).toBe("post-natal-care");
    expect(getAliasRedirect("airport-assistance")).toBe("airport-pickup");
    expect(getAliasRedirect("long-distance-companion")).toBe("travel-assistance");
    expect(getAliasRedirect("pickup")).toBeUndefined();
    expect(getAliasRedirect("drop")).toBeUndefined();
    expect(getAliasRedirect("short-distance-companion")).toBeUndefined();
  });

  it("resolves city-specific airport and railway station options", () => {
    const airportSvc = getSupportService("airport-pickup");
    const airportField = airportSvc?.fields.find((f) => f.name === "airport");
    expect(airportField).toBeDefined();
    expect(resolveFieldOptions(airportField!, "Bengaluru")[0]).toContain("Kempegowda");
    expect(resolveFieldOptions(airportField!, "Chennai")[0]).toContain("Chennai International");

    const railSvc = getSupportService("railway-assistance");
    const stationField = railSvc?.fields.find((f) => f.name === "station");
    expect(resolveFieldOptions(stationField!, "Hyderabad")).toContain("Secunderabad Junction (SC)");
  });

  it("enforces service-level city availability rather than assuming universal coverage", () => {
    const blrPickup = checkCityServiceAvailability("bengaluru", "pickup");
    expect(blrPickup.canBookDirectly).toBe(true);

    const cbePickup = checkCityServiceAvailability("coimbatore", "pickup");
    expect(cbePickup.canBookDirectly).toBe(false);
    expect(cbePickup.requiresAssessment).toBe(true);

    const kochiNursing = checkCityServiceAvailability("kochi", "nursing-services");
    expect(kochiNursing.canBookDirectly).toBe(false);
    expect(kochiNursing.isPlannedOnly).toBe(true);
  });

  it("includes all four Care Builder categories and five honest Assisted Living solutions", () => {
    expect(CARE_BUILDER_CATEGORIES.map((c) => c.id)).toEqual([
      "home-care",
      "mother-child",
      "travel",
      "technology",
    ]);
    expect(ASSISTED_LIVING_SOLUTIONS).toHaveLength(5);
    const statuses = new Set(ASSISTED_LIVING_SOLUTIONS.map((s) => s.readiness));
    expect(statuses.has("Deployed")).toBe(true);
    expect(statuses.has("Available Through Partners")).toBe(true);
    expect(statuses.has("Under Evaluation")).toBe(true);
  });

  it("persists travel, pickup/drop and technology fields into booking records and prevents duplicates", async () => {
    const booking = await createBooking({
      user_id: "USR-DEMO-001",
      customer_name: "Priya Sharma",
      customer_phone: "+91 98765 43210",
      service_category: "Pickup Assistance",
      service_type: "Pickup Assistance",
      division: "travel-mobility",
      travel_type: "pickup",
      pickup_location: "Apollo Hospital Greams Road",
      drop_location: "T. Nagar, Chennai",
      emergency_contact: "+91 98840 11223",
      service_details: { passenger_count: "1", luggage: "1–2 bags" },
      patient_details: "Saraswathi Sharma",
      city: "Chennai",
      service_location: "Apollo Hospital Greams Road",
      start_date: "2026-12-05",
      start_time: "10:00 AM",
      end_date: "2026-12-05",
      end_time: "12:00 PM",
      duration: "1 Trip(s)",
      booking_status: "requested",
    });

    const all = await getAllBookings();
    const saved = all.find((b) => b.booking_id === booking.booking_id);
    expect(saved?.pickup_location).toBe("Apollo Hospital Greams Road");
    expect(saved?.drop_location).toBe("T. Nagar, Chennai");
    expect(saved?.travel_type).toBe("pickup");

    // Route matching check for all new support pages
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    for (const p of [
      "/services/pickup",
      "/services/drop",
      "/services/short-distance-companion",
      "/services/airport-pickup",
      "/services/railway-assistance",
      "/offerings/assisted-living-technology",
    ]) {
      expect(router.matchRoutes(p).at(-1)?.routeId).not.toBe(rootRouteId);
    }

    // Duplicate check via user-dispatcher
    const session = await createSession("USR-DEMO-001", "user");
    const req = new Request("http://localhost/api/user/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `apnacare_session=${session.sessionId}`,
      },
      body: JSON.stringify({
        service_category: "Pickup Assistance",
        start_date: "2026-12-05",
        start_time: "10:00 AM",
      }),
    });
    const dupRes = await handleUserAction(req, "bookings");
    expect(dupRes.status).toBe(409);
  });
});
