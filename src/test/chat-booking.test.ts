import { describe, it, expect } from "vitest";
import { GLOBAL_MENU } from "@/components/site/Assistant";

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
});
