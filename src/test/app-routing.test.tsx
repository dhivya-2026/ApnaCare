import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { SERVICES, CITIES, FAQS, ATTENDANTS } from "@/data/site";

describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  const routesToTest = [
    "/",
    "/services",
    "/services/elderly-care",
    "/booking",
    "/safety",
    "/safety-guidelines",
    "/cities",
    "/cities/bengaluru",
    "/about",
    "/faq",
    "/privacy",
    "/terms",
    "/refund-policy",
    "/ecosystem-partners",
    "/contact",
    "/attendant-login",
    "/knowledge-hub",
    "/knowledge-hub/women-travel-safety-rights",
    "/knowledge-hub/coordinating-care-for-ageing-parents",
    "/knowledge-hub/questions-before-choosing-bedside-attendant",
    "/knowledge-hub/caregiver-vs-qualified-nurse",
    "/solutions/women-commuters",
    "/solutions/urban-professionals",
    "/solutions/families-elderly",
    "/solutions/post-hospitalization",
    "/solutions/new-mothers",
    "/solutions/women-caregivers",
    "/solutions/community-initiatives",
    "/solutions/safety-partners",
    "/become-an-attendant",
  ];

  routesToTest.forEach((path) => {
    it(`matches a page for ${path} instead of falling back to root`, () => {
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    });
  });
});

describe("Data integrity & requirements", () => {
  it("contains all 11 required core care services", () => {
    expect(SERVICES.length).toBe(11);
    const slugs = SERVICES.map((s) => s.slug);
    expect(slugs).toContain("elderly-care");
    expect(slugs).toContain("hospital-attendants");
    expect(slugs).toContain("nursing-services");
    expect(slugs).toContain("post-natal-care");
    expect(slugs).toContain("travel-assistance");
    expect(slugs).toContain("airport-pickup");
    expect(slugs).toContain("railway-assistance");
    expect(slugs).toContain("women-drivers");
    expect(slugs).toContain("security-support");
    expect(slugs).toContain("home-personal-care");
    expect(slugs).toContain("lifestyle-support");
  });

  it("contains all 4 active metro coverage cities with details", () => {
    expect(CITIES.length).toBe(4);
    const cityNames = CITIES.map((c) => c.slug);
    expect(cityNames).toContain("bengaluru");
    expect(cityNames).toContain("chennai");
    expect(cityNames).toContain("hyderabad");
    expect(cityNames).toContain("coimbatore");
  });

  it("contains verified attendants and FAQs", () => {
    expect(ATTENDANTS.length).toBeGreaterThanOrEqual(6);
    expect(FAQS.length).toBeGreaterThanOrEqual(8);
  });
});
