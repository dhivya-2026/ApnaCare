import { SITE } from "@/data/site";

export function calcBookingTotal(unitPrice: number, units: number, discountRate = 0) {
  const u = Math.max(1, Math.floor(units));
  const subtotal = unitPrice * u;
  const discount = Math.round(subtotal * discountRate);
  const taxable = subtotal - discount;
  const gst = Math.round(taxable * SITE.GST_RATE);
  return { units: u, subtotal, discount, gst, finalAmount: taxable + gst };
}
