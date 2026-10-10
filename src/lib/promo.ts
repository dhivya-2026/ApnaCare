import { PROMOS } from "@/data/site";

const KEY = "apnacare_promo";
export function getSavedPromo(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(KEY);
}
export function savePromo(code: string | null) {
  if (typeof window === "undefined") return;
  if (code) sessionStorage.setItem(KEY, code); else sessionStorage.removeItem(KEY);
}
export const findPromo = (code: string | null | undefined) =>
  PROMOS.find((p) => p.code === (code || "").trim().toUpperCase());
