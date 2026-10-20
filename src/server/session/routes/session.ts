/**
 * Vercel Serverless Function: GET /api/auth/session
 *
 * Validates the session cookie against Redis, slides the active window TTL,
 * and returns the authenticated user context or 401.
 */

import { getSessionFromRequest } from "../guard";

export const dynamic = "force-dynamic";

function reply(res: any, statusCode: number, data: any) {
  const payload = JSON.stringify(data);
  if (res && typeof res.status === "function" && typeof res.json === "function") {
    return res.status(statusCode).json(data);
  }
  if (res && typeof res.setHeader === "function" && typeof res.end === "function") {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    return res.end(payload);
  }
  return new Response(payload, {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
}

export default async function handler(req: any, res?: any) {
  const method = (req.method || (req instanceof Request ? req.method : "GET")).toUpperCase();

  if (method !== "GET") {
    return reply(res, 405, { error: "Method Not Allowed" });
  }

  try {
    const session = await getSessionFromRequest(req);

    if (!session) {
      return reply(res, 401, {
        authenticated: false,
        error: "No active or valid session found",
      });
    }

    return reply(res, 200, {
      authenticated: true,
      user: {
        id: session.userId,
        role: session.role,
        name: session.metadata?.name,
        city: session.metadata?.city,
        roleTitle: session.metadata?.roleTitle,
        attendantId: session.metadata?.attendantId,
      },
      lastActivityAt: session.lastActivityAt,
      expiresAt: session.expiresAt,
    });
  } catch (error: any) {
    console.error("[Auth API] Session check error:", error);
    return reply(res, 500, { error: "Session validation service error" });
  }
}
