/**
 * Secure Session Cookie Utilities — ApnaCare
 */

import type { SessionConfig } from "./types";

export const DEFAULT_SESSION_CONFIG: SessionConfig = {
  cookieName: "apnacare_session",
  idleTimeoutSeconds: 7200, // 2 hours idle
  maxLifetimeSeconds: 604800, // 7 days max lifetime
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

export function getEffectiveCookieName(isSecure: boolean = DEFAULT_SESSION_CONFIG.secure): string {
  // Use __Host- prefix only in secure production contexts
  if (isSecure && process.env.NODE_ENV === "production") {
    return `__Host-${DEFAULT_SESSION_CONFIG.cookieName}`;
  }
  return DEFAULT_SESSION_CONFIG.cookieName;
}

export function createSessionCookieHeader(
  sessionId: string,
  maxAgeSeconds: number = DEFAULT_SESSION_CONFIG.idleTimeoutSeconds,
  isSecure: boolean = DEFAULT_SESSION_CONFIG.secure
): string {
  const name = getEffectiveCookieName(isSecure);
  const parts = [
    `${name}=${sessionId}`,
    `Path=${DEFAULT_SESSION_CONFIG.path}`,
    `Max-Age=${maxAgeSeconds}`,
    `SameSite=${DEFAULT_SESSION_CONFIG.sameSite.charAt(0).toUpperCase() + DEFAULT_SESSION_CONFIG.sameSite.slice(1)}`,
    "HttpOnly",
  ];

  if (isSecure) {
    parts.push("Secure");
  }

  return parts.join("; ");
}

export function clearSessionCookieHeader(isSecure: boolean = DEFAULT_SESSION_CONFIG.secure): string {
  const name = getEffectiveCookieName(isSecure);
  const parts = [
    `${name}=`,
    `Path=${DEFAULT_SESSION_CONFIG.path}`,
    "Max-Age=0",
    "Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    `SameSite=${DEFAULT_SESSION_CONFIG.sameSite.charAt(0).toUpperCase() + DEFAULT_SESSION_CONFIG.sameSite.slice(1)}`,
    "HttpOnly",
  ];

  if (isSecure) {
    parts.push("Secure");
  }

  return parts.join("; ");
}

export function parseSessionCookie(cookieHeader?: string | null): string | null {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").map((c) => c.trim());
  const names = [
    `__Host-${DEFAULT_SESSION_CONFIG.cookieName}`,
    DEFAULT_SESSION_CONFIG.cookieName,
  ];

  for (const cookie of cookies) {
    for (const name of names) {
      if (cookie.startsWith(`${name}=`)) {
        const value = cookie.slice(name.length + 1).trim();
        return value || null;
      }
    }
  }

  return null;
}
