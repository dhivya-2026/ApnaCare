/**
 * Simple cookie-based session — NO Redis, NO hashing.
 * Cookie: apnacare_session=base64({ userId, role, email, fullName, phone, city, customerId, sahaId })
 */

const COOKIE_NAME = "apnacare_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface SimpleSession {
  userId: string;
  role: string;
  email: string;
  fullName: string;
  phone?: string;
  city?: string;
  customerId?: string;
  sahaId?: string;
}

export function encodeSession(session: SimpleSession): string {
  const payload = JSON.stringify(session);
  return Buffer.from(payload).toString("base64");
}

export function decodeSession(token: string): SimpleSession | null {
  try {
    const payload = Buffer.from(token, "base64").toString("utf-8");
    const parsed = JSON.parse(payload);
    if (!parsed.userId) return null;
    return parsed as SimpleSession;
  } catch {
    return null;
  }
}

export function buildSetCookieHeader(session: SimpleSession): string {
  const value = encodeSession(session);
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}`;
}

export function buildClearCookieHeader(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function getSessionFromRequest(req: any): SimpleSession | null {
  let cookieHeader = "";

  // Express/Vercel Node style
  if (req.headers && typeof req.headers === "object") {
    cookieHeader = req.headers.cookie || req.headers.Cookie || "";
  }

  // Web Request style
  if (!cookieHeader && typeof req.headers?.get === "function") {
    cookieHeader = req.headers.get("cookie") || "";
  }

  if (!cookieHeader) return null;

  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c: string) => {
      const eq = c.indexOf("=");
      return [c.slice(0, eq).trim(), c.slice(eq + 1).trim()];
    })
  );

  const token = cookies[COOKIE_NAME];
  if (!token) return null;

  return decodeSession(token);
}
