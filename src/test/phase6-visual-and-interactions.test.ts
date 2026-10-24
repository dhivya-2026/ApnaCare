import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { COORDINATION_AREAS } from "@/components/site/CareCoordinationExplorer";
import { FAMILY_SITUATIONS } from "@/components/site/CareSituationSlider";

describe("Phase 6 Visual, Typography & Interaction System", () => {
  const stylesPath = path.resolve(__dirname, "../styles.css");
  const stylesCss = fs.readFileSync(stylesPath, "utf-8");

  describe("1. Typography and Readability System", () => {
    it("defines fluid typography utility classes for hero, section, card, and body", () => {
      expect(stylesCss).toContain(".text-fluid-hero");
      expect(stylesCss).toContain(".text-fluid-section");
      expect(stylesCss).toContain(".text-fluid-card");
      expect(stylesCss).toContain(".text-fluid-body");
      expect(stylesCss).toContain(".text-readable-muted");
    });

    it("uses clamp for fluid desktop/mobile scaling in hero and section headlines", () => {
      expect(stylesCss).toMatch(/\.text-fluid-hero\s*\{[^}]*clamp\(/);
      expect(stylesCss).toMatch(/\.text-fluid-section\s*\{[^}]*clamp\(/);
    });

    it("maintains WCAG 2.2 AA compliant high-contrast muted text token", () => {
      // Must be oklch(0.36 ... ) for sufficient contrast against ivory background
      expect(stylesCss).toContain("--muted-foreground: oklch(0.36 0.02 170)");
    });

    it("enforces comfortable body line-height and visible focus-visible indicators", () => {
      expect(stylesCss).toContain("line-height: 1.65;");
      expect(stylesCss).toContain(":focus-visible { outline: 2px solid var(--color-ring); outline-offset: 3px; }");
    });

    it("includes comprehensive prefers-reduced-motion damping for animations and transitions", () => {
      expect(stylesCss).toContain("@media (prefers-reduced-motion: reduce)");
      expect(stylesCss).toContain("animation-duration: 0.01ms !important;");
      expect(stylesCss).toContain("transition-duration: 0.01ms !important;");
      expect(stylesCss).toContain("scroll-behavior: auto !important;");
    });
  });

  describe("2. Priority Section A: Care Coordination Explorer", () => {
    it("has 6 comprehensive care coordination areas", () => {
      expect(COORDINATION_AREAS).toHaveLength(6);
    });

    it("includes all required dimensions from Section 7A", () => {
      const areaIds = COORDINATION_AREAS.map((a) => a.id);
      expect(areaIds).toContain("finding-support");
      expect(areaIds).toContain("identity-vetting");
      expect(areaIds).toContain("attendant-vs-nurse");
      expect(areaIds).toContain("backup-continuity");
      expect(areaIds).toContain("daily-updates");
      expect(areaIds).toContain("transparent-pricing");
    });

    it("clearly contrasts independent strain against ApnaCare coordinated solutions", () => {
      for (const area of COORDINATION_AREAS) {
        expect(area.independent.headline).toBeTruthy();
        expect(area.independent.painPoints.length).toBeGreaterThanOrEqual(2);
        expect(area.independent.riskFactor).toBeTruthy();

        expect(area.apnaCare.headline).toBeTruthy();
        expect(area.apnaCare.solutions.length).toBeGreaterThanOrEqual(2);
        expect(area.apnaCare.operationalGuarantee).toBeTruthy();
      }
    });

    it("explicitly distinguishes non-clinical attendants from licensed GNM/B.Sc nurses in boundaries area", () => {
      const boundaryArea = COORDINATION_AREAS.find((a) => a.id === "attendant-vs-nurse");
      expect(boundaryArea).toBeDefined();
      expect(boundaryArea?.apnaCare.solutions.some((s) => s.toLowerCase().includes("attendant"))).toBe(true);
      expect(boundaryArea?.apnaCare.solutions.some((s) => s.toLowerCase().includes("nurse"))).toBe(true);
      expect(boundaryArea?.apnaCare.operationalGuarantee).toContain("doctor orders");
    });
  });

  describe("3. Priority Section B: Post-Hospital Care Recovery Story", () => {
    const recoveryStoryPath = path.resolve(__dirname, "../components/site/CareRecoveryStory.tsx");
    const recoveryStoryContent = fs.readFileSync(recoveryStoryPath, "utf-8");

    it("renders the approved headline from Section 7B", () => {
      expect(recoveryStoryContent).toContain(
        "Recovery is hard enough. You shouldn't have to coordinate everything alone."
      );
    });

    it("presents 3 simple, understandable coordination steps", () => {
      expect(recoveryStoryContent).toContain("Comprehensive Triage & Clinical Scope Check");
      expect(recoveryStoryContent).toContain("Matched Attendant Assigned with Verified Digital Dossier");
      expect(recoveryStoryContent).toContain("Daily WhatsApp Care Logs & 90-Minute Cluster Backup");
    });

    it("explicitly documents the clinical vs attendant scope boundary notice", () => {
      expect(recoveryStoryContent).toContain("Medical Boundary");
      expect(recoveryStoryContent).toContain("Attendants provide non-clinical support");
      expect(recoveryStoryContent).toContain("Licensed medical procedures");
      expect(recoveryStoryContent).toContain("doctor prescription");
    });

    it("provides functional booking and WhatsApp call-to-actions", () => {
      expect(recoveryStoryContent).toContain("Book Recovery Attendant");
      expect(recoveryStoryContent).toContain("Discuss Recovery Plan on WhatsApp");
    });
  });

  describe("4. Care Situation Slider / Carousel (Section 8)", () => {
    it("contains 6 supported family care scenarios matching the taxonomy", () => {
      expect(FAMILY_SITUATIONS).toHaveLength(6);
      const situationIds = FAMILY_SITUATIONS.map((s) => s.id);
      expect(situationIds).toContain("aging-parent");
      expect(situationIds).toContain("post-hospital");
      expect(situationIds).toContain("clinical-nursing");
      expect(situationIds).toContain("postnatal-newborn");
      expect(situationIds).toContain("travel-mobility");
      expect(situationIds).toContain("caregiver-respite");
    });

    it("each situation card provides authentic imagery, scannable highlights, and starting price", () => {
      for (const sit of FAMILY_SITUATIONS) {
        expect(sit.image).toBeTruthy();
        expect(sit.alt).toBeTruthy();
        expect(sit.title).toBeTruthy();
        expect(sit.description).toBeTruthy();
        expect(sit.highlights.length).toBeGreaterThanOrEqual(3);
        expect(sit.startingPrice).toBeGreaterThan(0);
        expect(sit.serviceSlug).toBeTruthy();
      }
    });

    const sliderComponentPath = path.resolve(__dirname, "../components/site/CareSituationSlider.tsx");
    const sliderContent = fs.readFileSync(sliderComponentPath, "utf-8");

    it("provides accessible carousel semantics and navigation controls", () => {
      expect(sliderContent).toContain('role="region"');
      expect(sliderContent).toContain('aria-roledescription="carousel"');
      expect(sliderContent).toContain("Previous care situation");
      expect(sliderContent).toContain("Next care situation");
    });

    it("supports touch swipe navigation and a toggle to responsive grid view", () => {
      expect(sliderContent).toContain("onTouchStart");
      expect(sliderContent).toContain("onTouchEnd");
      expect(sliderContent).toContain("viewMode");
      expect(sliderContent).toContain("View All in Grid");
    });

    it("does not auto-advance automatically without user action", () => {
      expect(sliderContent).not.toContain("setInterval");
    });
  });

  describe("5. Time and Effort Calculator (Section 10)", () => {
    const calcPath = path.resolve(__dirname, "../components/site/CareNeedsCalculator.tsx");
    const calcContent = fs.readFileSync(calcPath, "utf-8");

    it("includes mobile-friendly touch stepper buttons for easy operation without precision dragging", () => {
      expect(calcContent).toContain("Decrease hands-on personal care hours");
      expect(calcContent).toContain("Increase hands-on personal care hours");
      expect(calcContent).toContain("Decrease care travel hours");
      expect(calcContent).toContain("Increase care travel hours");
      expect(calcContent).toContain("Decrease coordination hours");
      expect(calcContent).toContain("Increase coordination hours");
    });

    it("explicitly labels all output calculations as illustrative estimates", () => {
      expect(calcContent).toContain("Illustrative estimate based on your inputs");
      expect(calcContent).toContain("Methodology Notice");
    });

    it("keeps time relieved strictly separate from financial billing and cash guarantees", () => {
      expect(calcContent).toContain("not guaranteed cash savings or healthcare expense reductions");
      expect(calcContent).toContain("Statutory GST (18% Invoiced)");
      expect(calcContent).toContain("Total Estimated Cost:");
    });
  });

  describe("6. Integration into Route Templates", () => {
    const indexPath = path.resolve(__dirname, "../routes/index.tsx");
    const indexContent = fs.readFileSync(indexPath, "utf-8");

    it("mounts CareSituationSlider, CareCoordinationExplorer, and CareRecoveryStory on Homepage", () => {
      expect(indexContent).toContain("<CareSituationSlider");
      expect(indexContent).toContain("<CareCoordinationExplorer");
      expect(indexContent).toContain("<CareRecoveryStory");
    });

    const servicesSlugPath = path.resolve(__dirname, "../routes/services.$slug.tsx");
    const servicesSlugContent = fs.readFileSync(servicesSlugPath, "utf-8");

    it("mounts visual storytelling care story and CareRecoveryStory in service pages", () => {
      expect(servicesSlugContent).toContain("<CareRecoveryStory");
      expect(servicesSlugContent).toContain("SERVICE_STORY_IMAGES");
    });
  });
});
