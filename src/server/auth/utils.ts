import { parseSessionCookie, createSessionCookieHeader, clearSessionCookieHeader } from "../session/cookies";
import { validateSession } from "../session/session-manager";
import { SessionData, UserRole } from "../session/types";

export function jsonResponse(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

export function errorResponse(message: string, status = 400): Response {
  return jsonResponse({ error: message, success: false }, status);
}

export async function parseJsonBody<T = any>(request: Request): Promise<T | null> {
  try {
    const text = await request.text();
    if (!text) return null;
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

export async function authenticateRequest(
  request: Request,
  allowedRoles?: UserRole[]
): Promise<{ session: SessionData | null; errorResponse?: Response }> {
  const cookieHeader = request.headers.get("cookie");
  const sessionId = parseSessionCookie(cookieHeader);

  if (!sessionId) {
    return {
      session: null,
      errorResponse: errorResponse("Authentication required", 401),
    };
  }

  const session = await validateSession(sessionId);
  if (!session) {
    return {
      session: null,
      errorResponse: errorResponse("Session expired or invalid", 401),
    };
  }

  if (allowedRoles && allowedRoles.length > 0) {
    // Normalise roles (e.g. "admin" and "super_admin" allow each other)
    const normalizedRole = session.role;
    const isAllowed = allowedRoles.some((r) => {
      if (r === "admin" && (normalizedRole === "admin" || normalizedRole === "super_admin")) return true;
      if (r === "super_admin" && (normalizedRole === "admin" || normalizedRole === "super_admin")) return true;
      if (r === "user" && (normalizedRole === "user" || normalizedRole === "customer")) return true;
      if (r === "attendant" && (normalizedRole === "attendant" || normalizedRole === "saha")) return true;
      return r === normalizedRole;
    });

    if (!isAllowed) {
      return {
        session,
        errorResponse: errorResponse("Access denied: Insufficient privileges", 403),
      };
    }
  }

  return { session };
}
