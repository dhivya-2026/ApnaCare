import { z } from "zod";
import { hashPassword } from "../password";
import {
  findUserByEmail,
  createUser,
  createCustomer,
  createSaha,
} from "../sheets-dal";
import { createSession } from "../../session/session-manager";
import { createSessionCookieHeader } from "../../session/cookies";
import { reply, parseBody } from "../utils";
import type { UserRole } from "../types";

const RegisterSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["CUSTOMER", "SAHA"]),
  city: z.string().min(2, "City is required"),
  languagePreference: z.string().optional(),
  // Saha-specific fields
  qualifications: z.string().optional(),
  experience: z.string().optional(),
  serviceCapabilities: z.array(z.string()).optional(),
  languagesSpoken: z.array(z.string()).optional(),
  availability: z.string().optional(),
  documentRefs: z.string().optional(),
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
    const existing = await findUserByEmail(data.email);
    if (existing) {
      return reply(res, 409, { error: "An account with this email already exists" });
    }

    const passwordHash = await hashPassword(data.password);
    const userRecord = await createUser({
      email: data.email,
      phone: data.phone,
      fullName: data.fullName,
      role: data.role as UserRole,
      passwordHash,
      accountStatus: "ACTIVE",
      city: data.city,
    });

    let customerId: string | undefined;
    let sahaId: string | undefined;

    if (data.role === "CUSTOMER") {
      const customer = await createCustomer({
        userId: userRecord.userId,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        city: data.city,
        languagePreference: data.languagePreference || "English",
      });
      customerId = customer.customerId;
    } else if (data.role === "SAHA") {
      const saha = await createSaha({
        userId: userRecord.userId,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        city: data.city,
        approvalStatus: "PENDING_REVIEW",
        serviceCapabilities: data.serviceCapabilities || [],
        languagesSpoken: data.languagesSpoken || ["English", "Hindi"],
        qualifications: data.qualifications || "",
        experience: data.experience || "",
        availability: data.availability || JSON.stringify({}),
        documentRefs: data.documentRefs || JSON.stringify({}),
      });
      sahaId = saha.sahaId;
    }

    // Create session (SAHA can have a session to view their pending status)
    const session = await createSession(userRecord.userId, data.role as any, {
      name: userRecord.fullName,
      mobile: userRecord.phone,
      city: userRecord.city,
      customerId,
      sahaId,
      accountStatus: userRecord.accountStatus,
    });

    const cookieHeader = createSessionCookieHeader(session.sessionId);

    return reply(
      res,
      201,
      {
        success: true,
        user: {
          userId: userRecord.userId,
          fullName: userRecord.fullName,
          email: userRecord.email,
          role: userRecord.role,
          city: userRecord.city,
          customerId,
          sahaId,
          approvalStatus: data.role === "SAHA" ? "PENDING_REVIEW" : undefined,
        },
      },
      { "Set-Cookie": cookieHeader }
    );
  } catch (error) {
    console.error("[Register] Error:", error);
    return reply(res, 500, { error: "Internal server error" });
  }
}

