import { z } from "zod";

export const phoneSchema = z.string().trim().regex(/^(\+91[\s-]?)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number");
export const emailSchema = z.string().trim().email("Enter a valid email").max(255);
export const optionalEmail = z.union([z.literal(""), emailSchema]);
export const nameSchema = z.string().trim().min(2, "Please enter a name").max(100);

export const partnerSchema = z.object({
  orgName: nameSchema,
  orgType: z.string().min(1, "Select organization type"),
  contact: nameSchema,
  phone: phoneSchema,
  email: optionalEmail,
  website: z.union([z.literal(""), z.string().trim().url("Enter a valid URL")]).optional(),
  city: z.string().trim().min(2, "Please enter your city"),
  state: z.string().trim().optional(),
  members: z.string().max(20).optional(),
  category: z.string().optional(),
  interest: z.string().max(1000).optional(),
});

export function fieldErrors(err: z.ZodError) {
  const out: Record<string, string> = {};
  for (const i of err.issues) out[String(i.path[0])] ??= i.message;
  return out;
}

export const ATTENDANT_ROLES = [
  "Elderly Care Attendant",
  "Patient Care Attendant",
  "Home Caregiver",
  "Nursing Professional",
  "Other",
] as const;

export const EXPERIENCE_LEVELS = [
  "Fresher",
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "More than 5 years",
] as const;

export const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Flexible"] as const;

export const INDIAN_LANGUAGES = [
  "Tamil",
  "English",
  "Hindi",
  "Telugu",
  "Malayalam",
  "Kannada",
  "Other",
] as const;

export const DOCUMENT_CATEGORIES = [
  "Resume or CV",
  "Government ID Proof",
  "Caregiving / Nursing Certificate",
  "Other Supporting Document",
] as const;

export interface UploadedDocMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
  category: string;
  uploadedAt: string;
  dataUrl?: string;
}

export const attendantApplicationSchema = z.object({
  fullName: nameSchema,
  mobile: phoneSchema,
  email: optionalEmail,
  dob: z.string().optional(),
  gender: z.string().optional(),
  city: z.string().trim().min(2, "Please enter your city"),
  state: z.string().trim().min(2, "Please select your state"),
  role: z.string().min(1, "Please select the role you are applying for"),
  experience: z.string().min(1, "Please select your years of experience"),
  qualifications: z.string().max(300).optional(),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  employmentType: z.string().min(1, "Select preferred employment type"),
  experienceSummary: z.string().max(2000).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must confirm the information is accurate and agree to recruitment processing." }),
  }),
});
