import { z } from "zod";
import { callOpsSheet } from "../sheets-dal";
import { buildSetCookieHeader } from "../simple-session";
import { reply, parseBody } from "../utils";

const RegisterSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["CUSTOMER", "SAHA"]),
  city: z.string().min(2, "City is required"),
  // Saha-specific optional fields
  qualifications: z.string().optional(),
  experience: z.string().optional(),
  serviceCapabilities: z.array(z.string()).optional(),
  languagesSpoken: z.array(z.string()).optional(),
  availability: z.string().optional(),
});

export default async function handler(req: any, res?: any) {
  const method = (req.method || (req instanceof Request ? req.method : "GET")).toUpperCase();
  if (method !== "POST") {
    return reply(res, 405, { error: "Method Not Allowed" });
  }

  try {
    const rawBody = await parseBody(req);
    const parsed = RegisterSchema.safeParse(rawBody);

    if (!parsed.success) {
      return reply(res, 400, {
        error: "Validation failed",
        details: parsed.error.issues.map((i) => i.message),
      });
    }

    const data = parsed.data;
    const email = data.email.trim().toLowerCase();

    // Check if user already exists in Google Sheet
    try {
      const existing = await callOpsSheet<any>("GET_USER_BY_EMAIL", { email });
      if (existing.success && existing.data && existing.data.email) {
        return reply(res, 409, { error: "An account with this email already exists" });
      }
    } catch (sheetCheckErr) {
      console.warn("[Register] Sheet lookup check error (proceeding):", sheetCheckErr);
    }

    // Generate simple IDs
    const userId = `usr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const now = new Date().toISOString();

    // Plaintext password per user request — stored in passwordHash / password_hash column per GAS
    const userRecord = {
      userId,
      user_id: userId,
      email,
      phone: data.phone,
      fullName: data.fullName,
      full_name: data.fullName,
      role: data.role,
      password: data.password,
      passwordHash: data.password,
      password_hash: data.password,
      accountStatus: "ACTIVE",
      account_status: "ACTIVE",
      city: data.city,
      createdAt: now,
      created_at: now,
      updatedAt: now,
      updated_at: now,
    };

    let customerId: string | undefined;
    let sahaId: string | undefined;

    // Save user and profile to Google Sheet
    try {
      await callOpsSheet("CREATE_USER", userRecord);

      if (data.role === "CUSTOMER") {
        customerId = `cust_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        await callOpsSheet("CREATE_CUSTOMER", {
          customerId,
          userId,
          fullName: data.fullName,
          email,
          phone: data.phone,
          city: data.city,
          languagePreference: "English",
          createdAt: now,
        });
      } else if (data.role === "SAHA") {
        sahaId = `saha_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        await callOpsSheet("CREATE_SAHA", {
          sahaId,
          userId,
          fullName: data.fullName,
          email,
          phone: data.phone,
          city: data.city,
          approvalStatus: "APPROVED",
          qualifications: data.qualifications || "",
          experience: data.experience || "",
          serviceCapabilities: (data.serviceCapabilities || []).join(","),
          languagesSpoken: (data.languagesSpoken || ["English"]).join(","),
          availability: data.availability || "",
          createdAt: now,
          updatedAt: now,
        });
      }
    } catch (sheetWriteErr) {
      console.warn("[Register] Sheet write non-fatal error:", sheetWriteErr);
    }

    // Set simple session cookie
    const cookie = buildSetCookieHeader({
      userId,
      role: data.role,
      email,
      fullName: data.fullName,
      phone: data.phone,
      city: data.city,
      customerId,
      sahaId,
    });

    return reply(
      res,
      201,
      {
        success: true,
        user: {
          userId,
          fullName: data.fullName,
          email,
          phone: data.phone,
          role: data.role,
          city: data.city,
          customerId,
          sahaId,
        },
      },
      { "Set-Cookie": cookie }
    );
  } catch (error: any) {
    console.error("[Register] Error:", error);
    return reply(res, 500, {
      error: error?.message || "Registration failed. Please try again.",
      details: error?.stack,
    });
  }
}

export async function POST(req: any, res?: any) {
  return handler(req, res);
}
