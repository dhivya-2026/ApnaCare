import { describe, it, expect } from "vitest";
import {
  WOMEN_LEADERSHIP,
  SUB_NAV_LINKS,
  WHAT_WE_DO,
  CORE_VALUES,
  STRATEGIC_INVESTOR_PARTNER,
} from "../routes/about";

describe("About Us Page — Leadership, Architecture & Purpose", () => {
  describe("Women Leadership Team Mandate", () => {
    it("contains exactly the designated women leadership team members", () => {
      expect(WOMEN_LEADERSHIP).toHaveLength(2);
      const names = WOMEN_LEADERSHIP.map((l) => l.name);
      expect(names).toContain("Rohini Sankaranarayanan");
      expect(names).toContain("Prof. Shoba T");
    });

    it("has Rohini Sankaranarayanan configured as Chief Operating Officer (COO) in Executive Leadership", () => {
      const rohini = WOMEN_LEADERSHIP.find(
        (l) => l.name === "Rohini Sankaranarayanan",
      );
      expect(rohini).toBeDefined();
      expect(rohini?.designation).toBe("Chief Operating Officer (COO)");
      expect(rohini?.category).toBe("Executive Leadership");
      expect(rohini?.initials).toBe("RS");
      expect(rohini?.focusAreas.length).toBeGreaterThanOrEqual(3);
      expect(rohini?.roleDescription).toContain("regional care operations");
    });

    it("has Prof. Shoba T configured as Women Self-Help Group Outreach Manager in Community Outreach & Women's Empowerment", () => {
      const shoba = WOMEN_LEADERSHIP.find((l) => l.name === "Prof. Shoba T");
      expect(shoba).toBeDefined();
      expect(shoba?.designation).toBe(
        "Women Self-Help Group Outreach Manager",
      );
      expect(shoba?.category).toBe(
        "Community Outreach & Women's Empowerment",
      );
      expect(shoba?.initials).toBe("ST");
      expect(shoba?.focusAreas.length).toBeGreaterThanOrEqual(3);
      expect(shoba?.roleDescription).toContain("Self-Help Groups (SHGs)");
    });

    it("strictly contains only women leaders with no male profiles", () => {
      const maleNames = ["kumar", "rajesh", "suresh", "ramesh", "arun", "vijay", "john", "david"];
      for (const leader of WOMEN_LEADERSHIP) {
        for (const male of maleNames) {
          expect(leader.name.toLowerCase()).not.toContain(male);
        }
      }
    });

    it("uses dignified initials/monograms and non-invented placeholders without fake AI portraits", () => {
      for (const leader of WOMEN_LEADERSHIP) {
        expect(leader.initials).toMatch(/^[A-Z]{2}$/);
        expect(leader.accentGradient).toBeTruthy();
        expect(leader.quote).toBeTruthy();
      }
    });
  });

  describe("TRUSTGRID-Inspired Page Structure & Sub-Navigation", () => {
    it("defines the 7 required sticky sub-navigation anchors", () => {
      const expectedHrefs = [
        "#story",
        "#mission-vision",
        "#what-we-do",
        "#values",
        "#leadership",
        "#community",
        "#presence",
      ];
      expect(SUB_NAV_LINKS.map((l) => l.href)).toEqual(expectedHrefs);
    });

    it("includes the 6 core philosophy & values in the grid", () => {
      expect(CORE_VALUES).toHaveLength(6);
      const valueTitles = CORE_VALUES.map((v) => v.title);
      expect(valueTitles).toEqual([
        "Compassion First",
        "Trust & Safety",
        "Dignity in Care",
        "Women's Empowerment",
        "Accountability",
        "Community Impact",
      ]);
    });

    it("defines 5 family-outcome service cards under What We Do", () => {
      expect(WHAT_WE_DO).toHaveLength(5);
      const ids = WHAT_WE_DO.map((w) => w.id);
      expect(ids).toContain("elderly-care");
      expect(ids).toContain("hospital-attendant");
      expect(ids).toContain("clinical-nursing");
      expect(ids).toContain("post-natal");
      expect(ids).toContain("family-support");
    });
  });

  describe("Strategic Investor & Partner Integration — TRUSTGRID.AI", () => {
    it("recognizes TRUSTGRID.AI with exact required name and designation", () => {
      expect(STRATEGIC_INVESTOR_PARTNER).toBeDefined();
      expect(STRATEGIC_INVESTOR_PARTNER.name).toBe("TRUSTGRID.AI");
      expect(STRATEGIC_INVESTOR_PARTNER.designation).toBe("Strategic Investor & Partner");
      expect(STRATEGIC_INVESTOR_PARTNER.website).toBe("https://trustgrid.ai/");
    });

    it("presents the exact section eyebrow and main heading", () => {
      expect(STRATEGIC_INVESTOR_PARTNER.sectionEyebrow).toBe("INVESTOR & STRATEGIC PARTNERS");
      expect(STRATEGIC_INVESTOR_PARTNER.heading).toBe("Building a Stronger Future of Care, Together.");
    });

    it("includes the verified supporting copy and partnership narrative without invented figures", () => {
      expect(STRATEGIC_INVESTOR_PARTNER.summary).toBe(
        "ApnaCare is strengthened by strategic partnerships that support our vision of making dependable, accessible and compassionate care more accessible to families."
      );
      expect(STRATEGIC_INVESTOR_PARTNER.partnershipStatement).toContain(
        "We are proud to recognize TRUSTGRID.AI as a strategic investor and partner in ApnaCare's journey."
      );
      expect(STRATEGIC_INVESTOR_PARTNER.partnershipStatement).toContain(
        "technology-enabled care ecosystem focused on making care coordination simpler, more accessible and more dependable for families."
      );

      // Verify no invented investment amounts, funding rounds, or equity percentages
      const inventedTerms = ["series a", "series b", "million", "equity", "valuation", "seed round", "$", "crore"];
      for (const term of inventedTerms) {
        expect(STRATEGIC_INVESTOR_PARTNER.summary.toLowerCase()).not.toContain(term);
        expect(STRATEGIC_INVESTOR_PARTNER.partnershipStatement.toLowerCase()).not.toContain(term);
      }
    });

    it("verifies the official logo asset exists and is configured", () => {
      expect(STRATEGIC_INVESTOR_PARTNER.logo).toBeTruthy();
    });
  });

});
