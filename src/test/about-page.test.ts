import { describe, it, expect } from "vitest";
import {
  WOMEN_LEADERSHIP,
  SUB_NAV_LINKS,
  WHAT_WE_DO,
  CORE_VALUES,
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
});

