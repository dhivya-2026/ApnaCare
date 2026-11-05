/**
 * Server-Side Session Guard & Authorization Helper — ApnaCare
 */

import { parseSessionCookie } from "./cookies";
import { validateSession } from "./session-manager";
import type { SessionData, UserRole } from "./types";

export interface RequestContext {
  headers: Record<string, string | string[] | undefined>;
  method?: string;
  ip?: string;
}

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
  const cookieHeader = extractCookieHeader(req);
  const sessionId = parseSessionCookie(cookieHeader);
  if (!sessionId) return null;
  return await validateSession(sessionId);
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

  if (requiredRole && session.role !== requiredRole && session.role !== "admin") {
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
