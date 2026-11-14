import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 3 — LifeSakhi Brand Storytelling, Life Stages & Value Communication", () => {
  const indexPath = resolve(__dirname, "../routes/index.tsx");
  const indexContent = readFileSync(indexPath, "utf-8");

  const lifesakhiPath = resolve(__dirname, "../data/lifesakhi.ts");
  const lifesakhiContent = readFileSync(lifesakhiPath, "utf-8");

  const calculatorPath = resolve(__dirname, "../components/site/CareNeedsCalculator.tsx");
  const calculatorContent = readFileSync(calculatorPath, "utf-8");

  const stylesPath = resolve(__dirname, "../styles.css");
  const stylesContent = readFileSync(stylesPath, "utf-8");

  it("defines six distinct life stages for women and children in LifeSakhi data", () => {
    expect(lifesakhiContent).toContain('id: "birth-early-childhood"');
    expect(lifesakhiContent).toContain('id: "childhood-development"');
    expect(lifesakhiContent).toContain('id: "adolescence-growing-up"');
    expect(lifesakhiContent).toContain('id: "young-adulthood-independence"');
    expect(lifesakhiContent).toContain('id: "womanhood-motherhood"');
    expect(lifesakhiContent).toContain('id: "ageing-elderhood"');
  });

  it("defines six interconnected strategic pillars with transparent readiness badges", () => {
    expect(lifesakhiContent).toContain('id: "care-and-assistance"');
    expect(lifesakhiContent).toContain('id: "women-empowerment"');
    expect(lifesakhiContent).toContain('id: "health-and-wellbeing"');
    expect(lifesakhiContent).toContain('id: "child-development"');
    expect(lifesakhiContent).toContain('id: "community-development"');
    expect(lifesakhiContent).toContain('id: "learning-and-development"');
    expect(lifesakhiContent).toContain("Operational Now");
    expect(lifesakhiContent).toContain("Proposed Programme");
  });

  it("mounts the LifeStagesJourney, PillarsGrid, and CareRecoveryStory on the homepage", () => {
    expect(indexContent).toContain("<LifeStagesJourney");
    expect(indexContent).toContain("<PillarsGrid");
    expect(indexContent).toContain("<CareRecoveryStory");
    expect(indexContent).toContain("<UniversalCareConfigurator");
  });

  it("communicates LifeSakhi positioning and leadership", () => {
    expect(indexContent).toContain("LIFESAKHI_BRAND.tagline");
    expect(indexContent).toContain("WOMEN_LEADERSHIP");
    expect(indexContent).toContain("STRATEGIC_INVESTOR_PARTNER");
  });

  it("ensures calculator frames productivity value responsibly without claiming guaranteed cash savings", () => {
    expect(calculatorContent).toContain("Estimated Time Relieved");
    expect(calculatorContent).toContain("Indicative Productivity Benchmark");
    expect(calculatorContent).toContain("not guaranteed cash savings or healthcare expense reductions");
    expect(calculatorContent).toContain("Illustrative estimate based on your inputs");
  });

  it("maintains strict reduced-motion accessibility in styles.css", () => {
    expect(stylesContent).toContain("@media (prefers-reduced-motion: reduce)");
    expect(stylesContent).toContain("animate-fade-up");
    expect(stylesContent).toContain("animate-fade-in");
  });
});
