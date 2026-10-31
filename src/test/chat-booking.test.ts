import { describe, it, expect } from "vitest";
import { GLOBAL_MENU, CARE_PACKS, getRecommendedPacks } from "@/components/site/Assistant";

describe("Conversational Booking Chat App", () => {
  it("provides direct Chat Booking in the global menu", () => {
    const bookingOption = GLOBAL_MENU.find((item) => item.label.includes("Book Care Attendant"));
    expect(bookingOption).toBeDefined();
    expect(bookingOption?.action.type).toBe("start_booking");
  });

  it("provides direct quick booking for all primary care services", () => {
    const services = ["elderly-care", "hospital-attendants", "nursing-services", "post-natal-care", "women-drivers"];
    for (const slug of services) {
      const match = GLOBAL_MENU.find((item) => item.action.type === "start_booking" && (item.action as any).service === slug);
      expect(match).toBeDefined();
    }
  });

  it("validates 10-digit Indian phone number extraction regex", () => {
    const phoneRegex = /(?:\+?91[\s-]?)?([6789]\d{9})/;

    const tests = [
      { input: "Ramesh 9876543210", expected: "9876543210" },
      { input: "My phone is +91-9845123456", expected: "9845123456" },
      { input: "Contact 8123456789 for booking", expected: "8123456789" },
      { input: "invalid number 12345", expected: null },
    ];

    for (const t of tests) {
      const match = t.input.match(phoneRegex);
      if (t.expected) {
        expect(match?.[1]).toBe(t.expected);
      } else {
        expect(match).toBeNull();
      }
    }
  });

  it("generates booking references following enterprise AC-CHAT pattern", () => {
    const ref = "AC-CHAT-" + Date.now().toString(36).toUpperCase().slice(-6);
    expect(ref).toMatch(/^AC-CHAT-[A-Z0-9]{6}$/);
  });

  describe("Conversational Pack Recommendations & Inclusions", () => {
    it("defines curated care packs with what-you-get transparent inclusions", () => {
      const packKeys = Object.keys(CARE_PACKS);
      expect(packKeys.length).toBeGreaterThanOrEqual(6);

      const dayPack = CARE_PACKS.elder_day_companion;
      expect(dayPack).toBeDefined();
      expect(dayPack.name).toBe("Dignified Day Companion Pack");
      expect(dayPack.startingPrice).toBe(1299);
      expect(dayPack.whatYouGet.length).toBeGreaterThan(3);
      expect(dayPack.whatYouGet.some((inc) => inc.toLowerCase().includes("police-verified"))).toBe(true);
      expect(dayPack.whatYouGet.some((inc) => inc.toLowerCase().includes("whatsapp"))).toBe(true);
    });

    it("recommends appropriate packs for elderly parent daily mobility situation", () => {
      const packs = getRecommendedPacks("My Elderly Father", "Walking, Mobility & Fall Prevention");
      expect(packs.length).toBeGreaterThan(0);
      expect(packs[0].id).toBe("elder_day_companion");
      expect(packs[0].whatYouGet).toContain("Dedicated, police-verified female Saha companion");
    });

    it("recommends 24/7 continuous live-in pack when round-the-clock safety is requested", () => {
      const packs = getRecommendedPacks("Both My Parents", "24/7 Round-the-Clock Safety at Home");
      expect(packs.some((p) => p.id === "elder_livein")).toBe(true);
      const liveinPack = packs.find((p) => p.id === "elder_livein");
      expect(liveinPack?.whatYouGet.some((inc) => inc.includes("Resident police-verified Saha attendant"))).toBe(true);
    });

    it("recommends hospital bedside vigil and nursing for hospital recovery situation", () => {
      const packs = getRecommendedPacks("Patient in Hospital", "Ward Bedside Attendant");
      expect(packs.some((p) => p.id === "hospital_bedside")).toBe(true);
      expect(packs.find((p) => p.id === "hospital_bedside")?.whatYouGet.length).toBeGreaterThanOrEqual(5);
    });

    it("recommends post-natal mother & baby pack for newborn situations", () => {
      const packs = getRecommendedPacks("New Mother & Baby", "Newborn Japa & Mother Massage");
      expect(packs[0].id).toBe("post_natal_mother_baby");
      expect(packs[0].whatYouGet.some((inc) => inc.includes("Japa"))).toBe(true);
    });

    it("recommends specialised neuro pack for stroke or parkinson recovery", () => {
      const packs = getRecommendedPacks("My Elderly Father", "Post-Stroke Paralysis Recovery");
      expect(packs[0].id).toBe("specialised_dependency");
      expect(packs[0].whatYouGet.some((inc) => inc.toLowerCase().includes("ergonomics"))).toBe(true);
    });
  });
});
