import { describe, it, expect } from "vitest";
import { calcBookingTotal } from "@/lib/pricing";
import { SERVICES, PRICING_PLANS } from "@/data/site";

describe("booking pricing calculations", () => {
  it("adds 18% statutory GST correctly on round base amounts", () => {
    const result = calcBookingTotal(1000, 1);
    expect(result.subtotal).toBe(1000);
    expect(result.gst).toBe(180);
    expect(result.finalAmount).toBe(1180);
  });

  it("calculates exact Elderly Care 1-day pricing (₹1,299 base + ₹234 GST = ₹1,533 total)", () => {
    const elderlyService = SERVICES.find((s) => s.slug === "elderly-care")!;
    expect(elderlyService.startingPrice).toBe(1299);

    const total = calcBookingTotal(elderlyService.startingPrice, 1);
    expect(total.units).toBe(1);
    expect(total.subtotal).toBe(1299);
    expect(total.base).toBe(1299);
    expect(total.discount).toBe(0);
    expect(total.taxable).toBe(1299);
    // 1299 * 0.18 = 233.82, rounded to 234
    expect(total.gst).toBe(234);
    // 1299 + 234 = 1533
    expect(total.finalAmount).toBe(1533);
  });

  it("applies CARECOMBO15 15% discount strictly before statutory GST", () => {
    const t = calcBookingTotal(2000, 1, 0.15);
    expect(t.subtotal).toBe(2000);
    expect(t.discount).toBe(300);
    expect(t.taxable).toBe(1700);
    // 1700 * 0.18 = 306
    expect(t.gst).toBe(306);
    expect(t.finalAmount).toBe(2006);
  });

  it("multiplies correctly across multi-day bookings", () => {
    const t = calcBookingTotal(1299, 3);
    expect(t.units).toBe(3);
    expect(t.subtotal).toBe(3897);
    // 3897 * 0.18 = 701.46, rounded to 701
    expect(t.gst).toBe(701);
    expect(t.finalAmount).toBe(4598);
  });

  it("handles edge cases gracefully without negative or fractional amounts", () => {
    // 0 units clamped to at least 1 unit
    const zeroUnits = calcBookingTotal(1299, 0);
    expect(zeroUnits.units).toBe(1);
    expect(zeroUnits.subtotal).toBe(1299);

    // Fractional days floored to integer units
    const fractionalUnits = calcBookingTotal(1000, 2.7);
    expect(fractionalUnits.units).toBe(2);
    expect(fractionalUnits.subtotal).toBe(2000);

    // Negative unit price clamped safely
    const negativePrice = calcBookingTotal(-500, 1);
    expect(negativePrice.subtotal).toBe(0);
    expect(negativePrice.finalAmount).toBe(0);

    // Discount rate clamped between 0 and 1
    const excessDiscount = calcBookingTotal(1000, 1, 1.5);
    expect(excessDiscount.discount).toBe(1000);
    expect(excessDiscount.finalAmount).toBe(0);
  });

  it("aligns PRICING_PLANS with corresponding service starting prices", () => {
    const transitPlan = PRICING_PLANS.find((p) => p.id === "transit")!;
    const railwayService = SERVICES.find((s) => s.slug === "railway-assistance")!;
    expect(transitPlan.price).toBe(railwayService.startingPrice);

    const dailyPlan = PRICING_PLANS.find((p) => p.id === "daily")!;
    const elderlyService = SERVICES.find((s) => s.slug === "elderly-care")!;
    expect(dailyPlan.price).toBe(elderlyService.startingPrice);

    const securityPlan = PRICING_PLANS.find((p) => p.id === "security")!;
    const securityService = SERVICES.find((s) => s.slug === "security-support")!;
    expect(securityPlan.price).toBe(securityService.startingPrice);
  });
});
