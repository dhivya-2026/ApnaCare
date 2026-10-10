import { z } from "zod";

export const phoneSchema = z.string().trim().regex(/^(\+91[\s-]?)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number");
export const emailSchema = z.string().trim().email("Enter a valid email").max(255);
export const optionalEmail = z.union([z.literal(""), emailSchema]);
export const nameSchema = z.string().trim().min(2, "Please enter a name").max(100);

export const partnerSchema = z.object({
  orgName: nameSchema, orgType: z.string().min(1, "Select a type"), contact: nameSchema,
  email: emailSchema, phone: phoneSchema,
  website: z.union([z.literal(""), z.string().trim().url("Enter a valid URL")]),
  state: z.string().trim().min(2, "Required"), city: z.string().trim().min(2, "Required"),
  members: z.string().max(10).optional(), category: z.string().optional(), interest: z.string().max(1000).optional(),
});

export function fieldErrors(err: z.ZodError) {
  const out: Record<string, string> = {};
  for (const i of err.issues) out[String(i.path[0])] ??= i.message;
  return out;
}
