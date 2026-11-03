/**
 * POST /api/auth/register
 *
 * Registers a new CUSTOMER or SAHA account.
 * Creates:
 *  1. User record in the Users sheet (hashed password, role assignment)
 *  2. Customer or Saha profile record in the respective sheet
 *  3. A secure session cookie
 *
 * Never stores plaintext passwords.
 * Never trusts role from the request body — enforces allowed roles server-side.
 */

import { createSession } from "../../session/session-manager";
import { createSessionCookieHeader } from "../../session/cookies";
import { findUserByEmail, findUserByPhone, createUser, createCustomer, createSaha } from "../sheets-dal";
import { generateSalt, hashPassword, generateId } from "../password";
import { fromLegacyRole } from "../types";

export const dynamic = "force-dynamic";

function reply(res: any, status: number, data: any, headers: Record<string, string> = {}): Response | void {
  const payload = JSON.stringify(data);
  if (res && typeof res.status === "function" && typeof res.json === "function") {
    for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
    return res.status(status).json(data);
  }
  if (res && typeof res.setHeader === "function" && typeof res.end === "function") {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json");
    for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
    return res.end(payload);
  }
  return new Response(payload, { status, headers: { "Content-Type": "application/json", ...headers } });
}

async function parseBody(req: any): Promise<any> {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  if (typeof req.json === "function") {
    try { return await req.json(); } catch { return {}; }
  }
  return {};
}

export default async function handler(req: any, res?: any) {
  const method = (req.method || (req instanceof Request ? req.method : "GET")).toUpperCase();
  if (method !== "POST") return reply(res, 405, { error: "Method Not Allowed" });

  try {
    const body = await parseBody(req);
    const { email, phone, full_name, password, role: requestedRole, city, preferred_language } = body;

    // ── Input validation ──────────────────────────────────────────────
    if (!email || !phone || !full_name || !password) {
      return reply(res, 400, { error: "Full name, email, phone, and password are required." });
    }

    if (typeof password !== "string" || password.length < 8) {
      return reply(res, 400, { error: "Password must be at least 8 characters." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return reply(res, 400, { error: "Invalid email address." });
    }

    const phoneDigits = String(phone).replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      return reply(res, 400, { error: "Invalid mobile number. Enter a 10-digit Indian mobile number." });
    }

    // ── Role enforcement ─────────────────────────────────────────────
    // Only CUSTOMER and SAHA roles can self-register.
    // SUPER_ADMIN must be provisioned via backend tooling only.
    const allowedRoles = ["CUSTOMER", "SAHA"];
    const role: "CUSTOMER" | "SAHA" = allowedRoles.includes(requestedRole) ? requestedRole : "CUSTOMER";

    // ── Duplicate prevention ──────────────────────────────────────────
    const [existingByEmail, existingByPhone] = await Promise.all([
      findUserByEmail(email),
      findUserByPhone(phone),
    ]);

    if (existingByEmail) {
      return reply(res, 409, { error: "An account with this email already exists. Please sign in." });
    }
    if (existingByPhone) {
      return reply(res, 409, { error: "An account with this phone number already exists. Please sign in." });
    }

    // ── Create user record ────────────────────────────────────────────
    const now = new Date().toISOString();
    const userId = generateId("USR");
    const salt = generateSalt();
    const passwordHash = hashPassword(password, salt);

    const userRecord = {
      user_id: userId,
      email: email.toLowerCase().trim(),
      phone: phoneDigits,
      full_name: String(full_name).trim(),
      role,
      password_hash: passwordHash,
      password_salt: salt,
      account_status: "active",
      email_verified: "no",
      created_at: now,
      updated_at: now,
    };

    await createUser(userRecord);

    // ── Create role-specific profile ──────────────────────────────────
    if (role === "CUSTOMER") {
      const customerId = generateId("CST");
      await createCustomer({
        customer_id: customerId,
        user_id: userId,
        full_name: userRecord.full_name,
        email: userRecord.email,
        phone: userRecord.phone,
        alternate_phone: "",
        city: String(city || "").trim(),
        address: "",
        preferred_language: String(preferred_language || "English").trim(),
        notification_preferences: "email,whatsapp",
        created_at: now,
        updated_at: now,
      });
    } else if (role === "SAHA") {
      const sahaId = generateId("SAH");
      await createSaha({
        saha_id: sahaId,
        user_id: userId,
        full_name: userRecord.full_name,
        phone: userRecord.phone,
        email: userRecord.email,
        city: String(city || "").trim(),
        service_areas: "",
        experience_years: "0",
        education: "",
        capabilities: "[]",
        languages: String(preferred_language || "English"),
        verification_status: "pending",
        approval_status: "pending_review",
        account_status: "active",
        profile_completion: "20",
        created_at: now,
        updated_at: now,
      });
    }

    // ── Create session ────────────────────────────────────────────────
    const legacyRole = role === "SAHA" ? "attendant" : "coordinator";
    const session = await createSession(
      userId,
      legacyRole,
      {
        name: userRecord.full_name,
        mobile: userRecord.phone,
        city: String(city || ""),
      },
      {
        ip: req.headers?.["x-forwarded-for"] as string,
        userAgent: req.headers?.["user-agent"] as string,
      }
    );

    const isSecure = process.env.NODE_ENV === "production";
    const cookieHeader = createSessionCookieHeader(session.sessionId, 7200, isSecure);

    return reply(
      res,
      201,
      {
        success: true,
        authenticated: true,
        role,
        user: {
          id: userId,
          name: userRecord.full_name,
          email: userRecord.email,
          phone: userRecord.phone,
          role,
          city: String(city || ""),
        },
      },
      { "Set-Cookie": cookieHeader }
    );
  } catch (err) {
    console.error("[register] Error:", err);
    return reply(res, 500, { error: "Registration failed. Please try again." });
  }
}

