/**
 * Vercel Serverless Function: POST /api/auth/logout
 *
 * Revokes the session record in Redis and clears the session cookie.
 */

import { extractCookieHeader } from "../guard";
import { parseSessionCookie, clearSessionCookieHeader } from "../cookies";
import { revokeSession } from "../session-manager";

export const dynamic = "force-dynamic";

function reply(res: any, statusCode: number, data: any, headers: Record<string, string> = {}) {
  const payload = JSON.stringify(data);
  if (res && typeof res.status === "function" && typeof res.json === "function") {
    for (const [k, v] of Object.entries(headers)) {
      res.setHeader(k, v);
    }
    return res.status(statusCode).json(data);
  }
  if (res && typeof res.setHeader === "function" && typeof res.end === "function") {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    for (const [k, v] of Object.entries(headers)) {
      res.setHeader(k, v);
    }
    return res.end(payload);
  }
  return new Response(payload, {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

export default async function handler(req: any, res?: any) {
  const method = (req.method || (req instanceof Request ? req.method : "GET")).toUpperCase();

  if (method !== "POST") {
    return reply(res, 405, { error: "Method Not Allowed" });
  }

  try {
    const cookieHeader = extractCookieHeader(req);
    const sessionId = parseSessionCookie(cookieHeader);

    if (sessionId) {
      await revokeSession(sessionId);
    }

    const isSecure = process.env.NODE_ENV === "production";
    const clearCookie = clearSessionCookieHeader(isSecure);

    return reply(
      res,
      200,
      {
        success: true,
        authenticated: false,
        message: "Session successfully terminated",
      },
      {
        "Set-Cookie": clearCookie,
      }
    );
  } catch (error: any) {
    console.error("[Auth API] Logout error:", error);
    return reply(res, 500, { error: "Logout service error" });
  }
}
