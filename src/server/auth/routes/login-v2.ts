/**
 * POST /api/auth/login-v2
 *
 * Authenticates a user by email + password.
 * Role is resolved server-side from the stored user record — never from the client.
 *
 * Returns a role-specific redirect hint so the client can navigate to the
 * correct portal after login.
 */

import { createSession } from "../../session/session-manager";
import { createSessionCookieHeader } from "../../session/cookies";
import { findUserByEmail, findUserByPhone } from "../sheets-dal";
import { verifyPassword } from "../password";

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

/** Map stored role to the legacy role system used by the session store */
function toLegacyRole(role: string): "attendant" | "coordinator" | "admin" {
  if (role === "SAHA") return "attendant";
  if (role === "SUPER_ADMIN") return "admin";
  return "coordinator"; // CUSTOMER
}

/** Map stored role to the redirect path after login */
function roleToRedirect(role: string): string {
  if (role === "SAHA") return "/saha/dashboard";
  if (role === "SUPER_ADMIN") return "/admin/dashboard";
  return "/customer/dashboard";
}

export default async function handler(req: any, res?: any) {
  const method = (req.method || (req instanceof Request ? req.method : "GET")).toUpperCase();
  if (method !== "POST") return reply(res, 405, { error: "Method Not Allowed" });

  try {
    const body = await parseBody(req);
    const { email, phone, password } = body;

    if (!password) {
      return reply(res, 400, { error: "Password is required." });
    }
    if (!email && !phone) {
      return reply(res, 400, { error: "Email or phone number is required." });
    }

    // ── Look up the user ──────────────────────────────────────────────
    let user: any = null;
    if (email) {
      user = await findUserByEmail(email);
    } else if (phone) {
      user = await findUserByPhone(phone);
    }

    if (!user) {
      // Return a generic error to avoid user enumeration
      return reply(res, 401, { error: "Invalid credentials. Please check your email and password." });
    }

    // ── Check account status ──────────────────────────────────────────
    if (user.account_status === "suspended") {
      return reply(res, 403, { error: "This account has been suspended. Please contact ApnaCare support." });
    }
    if (user.account_status === "inactive") {
      return reply(res, 403, { error: "This account is inactive. Please contact ApnaCare support." });
    }

    // ── Verify password ───────────────────────────────────────────────
    const isValid = verifyPassword(password, user.password_salt || "", user.password_hash || "");
    if (!isValid) {
      return reply(res, 401, { error: "Invalid credentials. Please check your email and password." });
    }

    // ── SAHA: check approval status before granting full access ───────
    if (user.role === "SAHA" && user.approval_status === "pending_review") {
      // Still create a session but mark as pending
      // The Saha dashboard will show the pending state
    }

    // ── Create session ────────────────────────────────────────────────
    const session = await createSession(
      user.user_id,
      toLegacyRole(user.role),
      {
        name: user.full_name,
        mobile: user.phone,
        city: user.city || "",
        roleTitle: user.role,
        attendantId: user.user_id,
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
      200,
      {
        success: true,
        authenticated: true,
        role: user.role,
        redirect: roleToRedirect(user.role),
        user: {
          id: user.user_id,
          name: user.full_name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          city: user.city || "",
        },
      },
      { "Set-Cookie": cookieHeader }
    );
  } catch (err) {
    console.error("[login-v2] Error:", err);
    return reply(res, 500, { error: "Login failed. Please try again." });
  }
}

