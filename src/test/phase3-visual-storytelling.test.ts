import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 3 — LifeSakthi Brand Storytelling, Life Stages & Value Communication", () => {
  const indexPath = resolve(__dirname, "../routes/index.tsx");
  const indexContent = readFileSync(indexPath, "utf-8");

  const lifesakthiPath = resolve(__dirname, "../data/lifesakthi.ts");
  const lifesakthiContent = readFileSync(lifesakthiPath, "utf-8");

  const calculatorPath = resolve(__dirname, "../components/site/CareNeedsCalculator.tsx");
  const calculatorContent = readFileSync(calculatorPath, "utf-8");

  const stylesPath = resolve(__dirname, "../styles.css");
  const stylesContent = readFileSync(stylesPath, "utf-8");

  it("defines six distinct life stages for women and children in LifeSakthi data", () => {
    expect(lifesakthiContent).toContain('id: "birth-early-childhood"');
    expect(lifesakthiContent).toContain('id: "childhood-development"');
    expect(lifesakthiContent).toContain('id: "adolescence-growing-up"');
    expect(lifesakthiContent).toContain('id: "young-adulthood-independence"');
    expect(lifesakthiContent).toContain('id: "womanhood-motherhood"');
    expect(lifesakthiContent).toContain('id: "ageing-elderhood"');
  });

  it("defines six interconnected strategic pillars with transparent readiness badges", () => {
    expect(lifesakthiContent).toContain('id: "care-and-assistance"');
    expect(lifesakthiContent).toContain('id: "women-empowerment"');
    expect(lifesakthiContent).toContain('id: "health-and-wellbeing"');
    expect(lifesakthiContent).toContain('id: "child-development"');
    expect(lifesakthiContent).toContain('id: "community-development"');
    expect(lifesakthiContent).toContain('id: "learning-and-development"');
    expect(lifesakthiContent).toContain("Operational Now");
    expect(lifesakthiContent).toContain("Proposed Programme");
  });

  it("mounts the LifeStagesJourney, PillarsGrid, and CareRecoveryStory on the homepage", () => {
    expect(indexContent).toContain("<LifeStagesJourney");
    expect(indexContent).toContain("<PillarsGrid");
    expect(indexContent).toContain("<CareRecoveryStory");
    expect(indexContent).toContain("<UniversalCareConfigurator");
  });

  it("communicates LifeSakthi positioning and leadership", () => {
    expect(indexContent).toContain("LIFESAKTHI_BRAND.tagline");
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
