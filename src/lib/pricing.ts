import { SITE } from "@/data/site";

export interface BookingTotalBreakdown {
  units: number;
  base: number;
  subtotal: number;
  discount: number;
  taxable: number;
  gst: number;
  finalAmount: number;
}

export function calcBookingTotal(unitPrice: number, units: number, discountRate = 0): BookingTotalBreakdown {
  const safeUnitPrice = Math.max(0, Math.round(unitPrice));
  const u = Math.max(1, Math.floor(units || 1));
  const subtotal = safeUnitPrice * u;
  const clampedDiscountRate = Math.min(1, Math.max(0, discountRate));
  const discount = Math.round(subtotal * clampedDiscountRate);
  const taxable = Math.max(0, subtotal - discount);
  const gst = Math.round(taxable * SITE.GST_RATE);
  const finalAmount = taxable + gst;

  return {
    units: u,
    base: subtotal,
    subtotal,
    discount,
    taxable,
    gst,
    finalAmount,
  };
}
