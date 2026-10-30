import { describe, it, expect } from "vitest";
import {
  ENTERPRISE_TAXONOMY_MAP,
  getTaxonomyByService,
  getTaxonomyBySegment,
  getAllCapabilities,
  CANONICAL_AUDIENCE_PATHWAYS,
  CANONICAL_NEEDS_DISCOVERY,
  CANONICAL_CARE_OUTCOMES,
  validateTaxonomy,
} from "../data/taxonomy";
import { SERVICES } from "../data/site";

describe("Enterprise Taxonomy & Relationship Engine", () => {
  it("contains rich multidomain mappings across core domains", () => {
    expect(ENTERPRISE_TAXONOMY_MAP.length).toBeGreaterThanOrEqual(6);
  });

  it("verifies every taxonomy record has the complete 8-tuple mapping", () => {
    for (const record of ENTERPRISE_TAXONOMY_MAP) {
      // 1. Customer Segment
      expect(record.segment.id).toBeDefined();
      expect(record.segment.name).toBeDefined();
      expect(record.segment.typicalProfile).toBeDefined();

      // 2. Customer Problem
      expect(record.problem.id).toBeDefined();
      expect(record.problem.title).toBeDefined();
      expect(record.problem.consequence).toBeDefined();

      // 3. Solution
      expect(record.solution.id).toBeDefined();
      expect(record.solution.name).toBeDefined();
      expect(record.solution.valueProposition).toBeDefined();

      // 4. Service
      expect(record.serviceSlug).toBeDefined();
      expect(record.serviceName).toBeDefined();
      expect(record.startingPrice).toBeGreaterThan(0);

      // 5. Capability
      expect(record.capability.id).toBeDefined();
      expect(record.capability.tier).toMatch(/^(CORE|GROWTH|EMERGING|STRATEGIC)$/);

      // 6. Page Route
      expect(record.pageRoute.startsWith("/")).toBe(true);

      // 7. CTA
      expect(record.primaryCta.label).toBeDefined();
      expect(record.primaryCta.href.startsWith("/")).toBe(true);

      // 8. Outcome Metric
      expect(record.outcomeMetric.name).toBeDefined();
      expect(record.outcomeMetric.target).toBeDefined();
      expect(record.outcomeMetric.measurementMechanism).toBeDefined();
    }
  });

  it("ensures taxonomy starting prices strictly align with authoritative SERVICES data", () => {
    for (const record of ENTERPRISE_TAXONOMY_MAP) {
      const canonicalService = SERVICES.find((s) => s.slug === record.serviceSlug);
      expect(canonicalService).toBeDefined();
      expect(record.startingPrice).toBe(canonicalService?.startingPrice);
      expect(record.serviceName).toBe(canonicalService?.name);
    }
  });

  it("retrieves records correctly by service slug and segment ID", () => {
    const elderly = getTaxonomyByService("elderly-care");
    expect(elderly).toBeDefined();
    expect(elderly?.serviceName).toBe("Elderly Care");
    expect(elderly?.capability.id).toBe("CAP-111");

    const segmentRecords = getTaxonomyBySegment("seg-working-adult-child");
    expect(segmentRecords.length).toBeGreaterThan(0);
    expect(segmentRecords[0].serviceSlug).toBe("elderly-care");

    const capabilities = getAllCapabilities();
    expect(capabilities.length).toBe(ENTERPRISE_TAXONOMY_MAP.length);
  });

  it("validates canonical audience pathways across all 6 human situations", () => {
    expect(CANONICAL_AUDIENCE_PATHWAYS.length).toBe(6);
    for (const pathway of CANONICAL_AUDIENCE_PATHWAYS) {
      expect(pathway.id).toBeDefined();
      expect(pathway.title).toBeDefined();
      expect(pathway.situation).toBeDefined();
      expect(pathway.desiredOutcome).toBeDefined();
      expect(pathway.recommendedServices.length).toBeGreaterThan(0);
      expect(pathway.status).toBe("EXISTING_VERIFIED");
    }
  });

  it("validates canonical need discovery options with role boundaries", () => {
    expect(CANONICAL_NEEDS_DISCOVERY.length).toBeGreaterThanOrEqual(6);
    for (const need of CANONICAL_NEEDS_DISCOVERY) {
      expect(need.triggerPhrase).toBeDefined();
      expect(need.providerType).toMatch(/^(General Duty Assistant \(Attendant\)|Registered Nurse \(GNM \/ B\.Sc\)|Licensed Driver \/ Assisted Travel)$/);
      expect(need.clinicalBoundary).toBeDefined();
      expect(need.estimatedStartingPrice).toBeGreaterThan(0);
    }
  });

  it("passes comprehensive taxonomy integrity validation with 0 errors", () => {
    const result = validateTaxonomy();
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });
});
