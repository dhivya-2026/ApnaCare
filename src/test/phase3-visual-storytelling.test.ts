import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase 3 — Visual Storytelling, Care Journeys & Value Communication", () => {
  const indexPath = resolve(__dirname, "../routes/index.tsx");
  const indexContent = readFileSync(indexPath, "utf-8");

  const calculatorPath = resolve(__dirname, "../components/site/CareNeedsCalculator.tsx");
  const calculatorContent = readFileSync(calculatorPath, "utf-8");

  const stylesPath = resolve(__dirname, "../styles.css");
  const stylesContent = readFileSync(stylesPath, "utf-8");

  it("defines six distinct family care situations on the homepage", () => {
    expect(indexContent).toContain('id: "aging-parent"');
    expect(indexContent).toContain('id: "post-hospital"');
    expect(indexContent).toContain('id: "clinical-nursing"');
    expect(indexContent).toContain('id: "postnatal-newborn"');
    expect(indexContent).toContain('id: "travel-mobility"');
    expect(indexContent).toContain('id: "caregiver-respite"');

    // Verify grid layout uses 3 columns for balanced 2x3 cards on desktop
    expect(indexContent).toContain("sm:grid-cols-2 lg:grid-cols-3");
  });

  it("defines six concrete dimensions for coordination comparison", () => {
    expect(indexContent).toContain("Finding & Assessing Suitable Support");
    expect(indexContent).toContain("Reviewing Identity & Credential Evidence");
    expect(indexContent).toContain("Clarifying Attendant vs. Nurse Responsibilities");
    expect(indexContent).toContain("Coordinating Schedules, Backup & Continuity");
    expect(indexContent).toContain("Providing Agreed Family Updates");
    expect(indexContent).toContain("Explaining Pricing & Next Steps");
  });

  it("defines the four-stage relief journey with canonical phases", () => {
    expect(indexContent).toContain('phase: "Family Concern"');
    expect(indexContent).toContain('phase: "Care Discussion"');
    expect(indexContent).toContain('phase: "Support Arranged"');
    expect(indexContent).toContain('phase: "Ongoing Coordination"');
  });

  it("outlines a tangible four-step onboarding sequence", () => {
    expect(indexContent).toContain("Tell Us What Is Happening");
    expect(indexContent).toContain("Discuss Needs, Timing & Budget");
    expect(indexContent).toContain("Review Suitable Services & Availability");
    expect(indexContent).toContain("Confirm Agreed Care & Responsibilities");
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
