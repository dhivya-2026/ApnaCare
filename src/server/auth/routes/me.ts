/**
 * GET /api/auth/me
 *
 * Returns the full user profile for the currently authenticated session.
 * Reads from the Users + role-specific (Customers/Sahas) sheet.
 * Returns 401 if no valid session exists.
 */

import { getSessionFromRequest } from "../../session/guard";
import { findUserById, findCustomerByUserId, findSahaByUserId } from "../sheets-dal";

export const dynamic = "force-dynamic";

function reply(res: any, status: number, data: any): Response | void {
  const payload = JSON.stringify(data);
  if (res && typeof res.status === "function" && typeof res.json === "function") {
    return res.status(status).json(data);
  }
  if (res && typeof res.setHeader === "function" && typeof res.end === "function") {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json");
    return res.end(payload);
  }
  return new Response(payload, { status, headers: { "Content-Type": "application/json" } });
}

function toLegacyRole(role: string): string {
  if (role === "SAHA") return "attendant";
  if (role === "SUPER_ADMIN") return "admin";
  return "coordinator";
}

export default async function handler(req: any, res?: any) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) {
      return reply(res, 401, { authenticated: false, error: "Not authenticated" });
    }

    const user = await findUserById(session.userId);
    if (!user) {
      return reply(res, 401, { authenticated: false, error: "User record not found" });
    }

    if (user.account_status === "suspended") {
      return reply(res, 403, { authenticated: false, error: "Account suspended" });
    }

    // Fetch role-specific profile
    let profile: any = null;
    const role = user.role || "CUSTOMER";

    if (role === "CUSTOMER") {
      profile = await findCustomerByUserId(session.userId);
    } else if (role === "SAHA") {
      profile = await findSahaByUserId(session.userId);
    }

    // Strip sensitive fields before returning to client
    const safeUser = {
      id: user.user_id,
      name: user.full_name,
      email: user.email,
      phone: user.phone,
      role,
      city: user.city || profile?.city || "",
      account_status: user.account_status,
      email_verified: user.email_verified === "yes",
      created_at: user.created_at,
    };

    return reply(res, 200, {
      authenticated: true,
      user: safeUser,
      profile: profile
        ? (({ password_hash, password_salt, ...safe }: any) => safe)(profile)
        : null,
      session: {
        expiresAt: session.expiresAt,
        lastActivityAt: session.lastActivityAt,
      },
    });
  } catch (err) {
    console.error("[me] Error:", err);
    return reply(res, 500, { authenticated: false, error: "Server error" });
  }
}

