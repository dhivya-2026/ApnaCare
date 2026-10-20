import { describe, it, expect, beforeEach } from "vitest";
import {
  generateSessionId,
  createSession,
  validateSession,
  rotateSession,
  revokeSession,
  revokeAllUserSessions,
} from "../server/session/session-manager";
import { resetSessionStoreForTesting } from "../server/session/redis-client";
import {
  createSessionCookieHeader,
  clearSessionCookieHeader,
  parseSessionCookie,
  getEffectiveCookieName,
} from "../server/session/cookies";
import { requireAuth } from "../server/session/guard";

describe("Enterprise Redis Session Management", () => {
  beforeEach(() => {
    resetSessionStoreForTesting();
  });

  describe("Session ID Generation & Cryptographic Entropy", () => {
    it("generates opaque, URL-safe session IDs with high entropy", () => {
      const id1 = generateSessionId();
      const id2 = generateSessionId();

      expect(id1).toBeDefined();
      expect(typeof id1).toBe("string");
      // 32 bytes base64url is 43 characters
      expect(id1.length).toBeGreaterThanOrEqual(40);
      expect(id1).not.toBe(id2);
      expect(/^[A-Za-z0-9_-]+$/.test(id1)).toBe(true);
    });
  });

  describe("Session Lifecycle (Create, Validate, Renew, Expire)", () => {
    it("creates a new session with correct metadata and timestamps", async () => {
      const session = await createSession(
        "ATT-SK-01",
        "attendant",
        {
          name: "Sunitha Krishnan",
          mobile: "98401 23456",
          city: "Chennai",
          roleTitle: "Senior Elderly Care Specialist",
        },
        { ip: "203.0.113.195", userAgent: "Mozilla/5.0" }
      );

      expect(session).toBeDefined();
      expect(session.userId).toBe("ATT-SK-01");
      expect(session.role).toBe("attendant");
      expect(session.metadata?.name).toBe("Sunitha Krishnan");
      expect(session.createdAt).toBeGreaterThan(0);
      expect(session.lastActivityAt).toBe(session.createdAt);
      expect(session.expiresAt).toBeGreaterThan(session.createdAt);
    });

    it("retrieves and validates an active session", async () => {
      const created = await createSession("ATT-SK-01", "attendant", {
        name: "Sunitha Krishnan",
        mobile: "98401 23456",
        city: "Chennai",
      });

      const retrieved = await validateSession(created.sessionId);
      expect(retrieved).not.toBeNull();
      expect(retrieved?.userId).toBe("ATT-SK-01");
      expect(retrieved?.sessionId).toBe(created.sessionId);
    });

    it("rejects non-existent, empty, or malformed session IDs", async () => {
      expect(await validateSession(undefined)).toBeNull();
      expect(await validateSession(null)).toBeNull();
      expect(await validateSession("")).toBeNull();
      expect(await validateSession("short")).toBeNull();
      expect(await validateSession("non_existent_session_id_with_enough_length_to_pass_basic_checks")).toBeNull();
    });

    it("enforces absolute maximum lifetime expiry", async () => {
      const session = await createSession("ATT-SK-01", "attendant");
      // Artificially simulate an expired absolute lifetime
      session.expiresAt = Date.now() - 1000;

      // Updating the store directly
      const retrieved = await validateSession(session.sessionId);
      expect(retrieved).toBeNull();
    });

    it("enforces idle timeout expiry", async () => {
      const session = await createSession("ATT-SK-01", "attendant");
      // Simulate inactivity exceeding 2 hours (7200 seconds)
      session.lastActivityAt = Date.now() - 7300 * 1000;

      const retrieved = await validateSession(session.sessionId);
      expect(retrieved).toBeNull();
    });

    it("rotates session ID cleanly to prevent session fixation", async () => {
      const original = await createSession("ATT-SK-01", "attendant", {
        name: "Sunitha Krishnan",
        mobile: "98401 23456",
        city: "Chennai",
      });

      const rotated = await rotateSession(original.sessionId);
      expect(rotated).not.toBeNull();
      expect(rotated?.sessionId).not.toBe(original.sessionId);
      expect(rotated?.userId).toBe(original.userId);
      expect(rotated?.metadata?.name).toBe("Sunitha Krishnan");

      // Original session ID must be invalidated immediately
      expect(await validateSession(original.sessionId)).toBeNull();
      // New session ID must be valid
      expect(await validateSession(rotated!.sessionId)).not.toBeNull();
    });

    it("revokes an individual session on logout", async () => {
      const session = await createSession("ATT-SK-01", "attendant");
      expect(await validateSession(session.sessionId)).not.toBeNull();

      await revokeSession(session.sessionId);
      expect(await validateSession(session.sessionId)).toBeNull();
    });

    it("revokes all sessions belonging to a specific user", async () => {
      const session1 = await createSession("ATT-SK-01", "attendant");
      const session2 = await createSession("ATT-SK-01", "attendant");
      const otherUserSession = await createSession("ATT-OTHER-02", "attendant");

      await revokeAllUserSessions("ATT-SK-01");

      expect(await validateSession(session1.sessionId)).toBeNull();
      expect(await validateSession(session2.sessionId)).toBeNull();
      // Other user session must remain intact
      expect(await validateSession(otherUserSession.sessionId)).not.toBeNull();
    });
  });

  describe("Secure Cookie Configuration", () => {
    it("generates an HttpOnly, SameSite=Lax cookie header with appropriate Path and Max-Age", () => {
      const header = createSessionCookieHeader("test-session-1234567890", 7200, false);
      expect(header).toContain("apnacare_session=test-session-1234567890");
      expect(header).toContain("Path=/");
      expect(header).toContain("Max-Age=7200");
      expect(header).toContain("SameSite=Lax");
      expect(header).toContain("HttpOnly");
      expect(header).not.toContain("Secure");
    });

    it("includes Secure flag when isSecure is true", () => {
      const header = createSessionCookieHeader("test-session-1234567890", 7200, true);
      expect(header).toContain("Secure");
      expect(header).toContain("HttpOnly");
    });

    it("generates cookie clearance header with Max-Age=0 and 1970 expiration", () => {
      const header = clearSessionCookieHeader(false);
      expect(header).toContain("Max-Age=0");
      expect(header).toContain("Expires=Thu, 01 Jan 1970 00:00:00 GMT");
      expect(header).toContain("HttpOnly");
    });

    it("parses session cookie from Cookie header correctly", () => {
      const cookieHeader = "theme=light; apnacare_session=my_active_token_xyz; analytics_optin=true";
      const parsed = parseSessionCookie(cookieHeader);
      expect(parsed).toBe("my_active_token_xyz");
    });

    it("returns null when cookie header is missing or does not contain session cookie", () => {
      expect(parseSessionCookie(undefined)).toBeNull();
      expect(parseSessionCookie(null)).toBeNull();
      expect(parseSessionCookie("theme=light; user_pref=abc")).toBeNull();
    });
  });

  describe("Server-Side Authorization Guard", () => {
    it("authorizes requests with a valid session and matched role", async () => {
      const session = await createSession("ATT-SK-01", "attendant");
      const mockReq = {
        headers: {
          cookie: `apnacare_session=${session.sessionId}`,
        },
      };

      const result = await requireAuth(mockReq, "attendant");
      expect(result.authorized).toBe(true);
      expect(result.status).toBe(200);
      expect(result.session?.userId).toBe("ATT-SK-01");
    });

    it("rejects unauthenticated requests with 401 status", async () => {
      const mockReq = {
        headers: {},
      };

      const result = await requireAuth(mockReq, "attendant");
      expect(result.authorized).toBe(false);
      expect(result.status).toBe(401);
      expect(result.error).toContain("Authentication required");
    });

    it("rejects unauthorized roles with 403 status", async () => {
      const session = await createSession("ATT-SK-01", "attendant");
      const mockReq = {
        headers: {
          cookie: `apnacare_session=${session.sessionId}`,
        },
      };

      // Attendant trying to access admin-only resource
      const result = await requireAuth(mockReq, "admin");
      expect(result.authorized).toBe(false);
      expect(result.status).toBe(403);
      expect(result.error).toContain("insufficient permissions");
    });
  });
});
