/**
 * Server-Side Session Guard — ApnaCare
 * Fast cookie-based session verification with fallback to session-manager.
 */

import { getSessionFromRequest as getSimpleSession } from "../auth/simple-session";
import { parseSessionCookie } from "./cookies";
import { validateSession } from "./session-manager";
import type { SessionData, UserRole } from "./types";

export function extractCookieHeader(req: any): string | null {
  if (!req) return null;
  if (req.headers) {
    if (typeof req.headers.get === "function") {
      return req.headers.get("cookie");
    }
    return (req.headers["cookie"] || req.headers["Cookie"]) as string | null;
  }
  return null;
}

export async function getSessionFromRequest(req: any): Promise<SessionData | null> {
  // 1. Try simple session first (zero network, fast base64)
  const simple = getSimpleSession(req);
  if (simple) {
    return {
      sessionId: simple.userId,
      userId: simple.userId,
      role: (simple.role || "CUSTOMER") as UserRole,
      metadata: {
        name: simple.fullName,
        mobile: simple.phone || "",
        city: simple.city || "",
        customerId: simple.customerId,
        sahaId: simple.sahaId,
      },
      createdAt: Date.now(),
      lastActivityAt: Date.now(),
      expiresAt: Date.now() + 7 * 86400000,
    };
  }

  // 2. Fallback to session store (for tests / legacy session IDs)
  const cookieHeader = extractCookieHeader(req);
  const sessionId = parseSessionCookie(cookieHeader);
  if (!sessionId) return null;

  try {
    return await validateSession(sessionId);
  } catch {
    return null;
  }
}

export async function requireAuth(
  req: any,
  requiredRole?: UserRole
): Promise<{ authorized: boolean; session?: SessionData; error?: string; status: number }> {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return {
      authorized: false,
      error: "Authentication required",
      status: 401,
    };
  }

  if (
    requiredRole &&
    session.role !== requiredRole &&
    session.role !== "admin" &&
    session.role !== "SUPER_ADMIN"
  ) {
    return {
      authorized: false,
      error: "Forbidden: insufficient permissions",
      status: 403,
    };
  }

  return {
    authorized: true,
    session,
    status: 200,
  };
}
