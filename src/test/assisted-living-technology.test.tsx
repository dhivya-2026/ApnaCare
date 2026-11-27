import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import {
  ASSISTED_LIVING_TECH_CATEGORIES,
  CARE_COMPARISON,
  CONNECTED_SCENARIO_STEPS,
  SENIOR_CARE_USE_CASES,
  INDIA_SOLUTION_BUNDLES,
  ECOSYSTEM_COMPONENTS,
  ECOSYSTEM_ROLES,
  RESPONSIBLE_TECH_PILLARS,
} from "@/data/assistedLivingTech";
import { TechnologyExplorer } from "@/components/site/assisted-living/TechnologyExplorer";
import { SeniorCareComparison } from "@/components/site/assisted-living/SeniorCareComparison";
import { TechnologyDiscoveryForm } from "@/components/site/assisted-living/TechnologyDiscoveryForm";

describe("LifeSakhi Assisted Living Technology Experience", () => {
  beforeEach(() => {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.clear();
    }
  });

  it("defines all 10 technology categories with honest 4-tier deployment status labels", () => {
    expect(ASSISTED_LIVING_TECH_CATEGORIES).toHaveLength(10);

    const allowedStatuses = new Set([
      "Deployed on LifeSakhi",
      "Available Through Partners",
      "Under Evaluation",
      "Future Opportunity",
    ]);

    for (const cat of ASSISTED_LIVING_TECH_CATEGORIES) {
      expect(allowedStatuses.has(cat.status)).toBe(true);
      expect(cat.whatItIs).toBeTruthy();
      expect(cat.howItWorks).toBeTruthy();
      expect(cat.devicesRequired.length).toBeGreaterThan(0);
      expect(cat.whoBenefits.length).toBeGreaterThan(0);
      expect(cat.problemsAddressed.length).toBeGreaterThan(0);
      expect(cat.benefitsForSeniors.length).toBeGreaterThan(0);
      expect(cat.benefitsForFamilies.length).toBeGreaterThan(0);
      expect(cat.realWorldScenarios.length).toBeGreaterThan(0);
    }

    // Only Digital Care-Management Platforms is deployed directly on LifeSakhi
    const deployed = ASSISTED_LIVING_TECH_CATEGORIES.filter((c) => c.status === "Deployed on LifeSakhi");
    expect(deployed.map((d) => d.id)).toEqual(["care-management-platforms"]);
  });

  it("covers all 6 senior-care use cases, 4 India-specific bundles, ecosystem roles and 10 trust pillars", () => {
    expect(SENIOR_CARE_USE_CASES).toHaveLength(6);
    expect(INDIA_SOLUTION_BUNDLES).toHaveLength(4);
    for (const bundle of INDIA_SOLUTION_BUNDLES) {
      expect(bundle.status).toBe("Proposed Solution Bundle");
    }
    expect(ECOSYSTEM_COMPONENTS).toHaveLength(4);
    expect(ECOSYSTEM_ROLES).toHaveLength(6);
    expect(RESPONSIBLE_TECH_PILLARS).toHaveLength(10);
    expect(CARE_COMPARISON.traditional).toHaveLength(4);
    expect(CARE_COMPARISON.techEnabled).toHaveLength(4);
    expect(CONNECTED_SCENARIO_STEPS).toHaveLength(8);
  });

  it("renders TechnologyExplorer, filters by status, and expands technology details", () => {
    let selectedId = "";
    render(<TechnologyExplorer onSelectTechForEnquiry={(t) => (selectedId = t.id)} />);

    expect(screen.getByText("Remote Patient Monitoring")).toBeTruthy();
    expect(screen.getByText("Assistive and Care Robotics")).toBeTruthy();

    // Filter to Deployed on LifeSakhi
    fireEvent.click(screen.getByRole("tab", { name: "Deployed on LifeSakhi" }));
    expect(screen.getByText("Digital Care-Management Platforms")).toBeTruthy();
    expect(screen.queryByText("Assistive and Care Robotics")).toBeNull();

    // Trigger enquiry callback
    fireEvent.click(screen.getByRole("button", { name: /Explore Family Care Portal/i }));
    expect(selectedId).toBe("care-management-platforms");
  });

  it("steps through the interactive SeniorCareComparison scenario", () => {
    render(<SeniorCareComparison />);
    expect(screen.getByText(/Unusual morning routine gap observed/i)).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /Next Step/i }));
    expect(screen.getByText(/Wearable SOS or activity check/i)).toBeTruthy();
  });

  it("validates required contact fields in TechnologyDiscoveryForm", () => {
    render(<TechnologyDiscoveryForm preselectedTechId="wearable-technology" />);
    // Submit without name -> validation error
    const submitBtn = screen.getAllByRole("button", { name: /Request a Technology Demo/i }).pop()!;
    fireEvent.click(submitBtn);
    expect(screen.getByRole("alert").textContent).toContain("full name");
  });

  it("matches /offerings/assisted-living-technology route cleanly", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const matches = router.matchRoutes("/offerings/assisted-living-technology");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
