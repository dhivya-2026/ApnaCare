import { describe, it, expect } from "vitest";
import { calcBookingTotal } from "@/lib/pricing";

describe("booking pricing", () => {
  it("adds 18% GST", () => {
    expect(calcBookingTotal(1000, 1).finalAmount).toBe(1180);
  });
  it("applies CARECOMBO15 15% discount before GST", () => {
    const t = calcBookingTotal(2000, 1, 0.15);
    expect(t.discount).toBe(300);
    expect(t.finalAmount).toBe(2006);
  });
  it("multiplies by days", () => {
    expect(calcBookingTotal(1299, 3).subtotal).toBe(3897);
  });
});
