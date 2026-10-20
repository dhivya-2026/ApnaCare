/**
 * Enterprise Session Lifecycle Manager — ApnaCare
 */

import { randomBytes, createHash } from "crypto";
import { getSessionStore } from "./redis-client";
import { DEFAULT_SESSION_CONFIG } from "./cookies";
import type { SessionData, UserRole, AttendantMetadata } from "./types";

/**
 * Generate 256 bits of cryptographic entropy for opaque session IDs
 */
export function generateSessionId(): string {
  return randomBytes(32).toString("base64url");
}

function hashValue(val?: string): string | undefined {
  if (!val) return undefined;
  return createHash("sha256").update(val).digest("hex").slice(0, 16);
}

export async function createSession(
  userId: string,
  role: UserRole,
  metadata?: AttendantMetadata,
  reqContext?: { ip?: string; userAgent?: string }
): Promise<SessionData> {
  const store = getSessionStore();
  const sessionId = generateSessionId();
  const now = Date.now();

  const session: SessionData = {
    sessionId,
    userId,
    role,
    metadata,
    createdAt: now,
    lastActivityAt: now,
    expiresAt: now + DEFAULT_SESSION_CONFIG.maxLifetimeSeconds * 1000,
    ipHash: hashValue(reqContext?.ip),
    userAgentHash: hashValue(reqContext?.userAgent),
  };

  const ttl = DEFAULT_SESSION_CONFIG.idleTimeoutSeconds;
  await store.set(sessionId, session, ttl);
  return session;
}

export async function validateSession(
  sessionId?: string | null
): Promise<SessionData | null> {
  if (!sessionId || typeof sessionId !== "string" || sessionId.length < 16) {
    return null;
  }

  const store = getSessionStore();
  const session = await store.get(sessionId);
  if (!session) return null;

  const now = Date.now();

  // 1. Check absolute maximum lifetime
  if (now > session.expiresAt) {
    await store.delete(sessionId);
    return null;
  }

  // 2. Check idle timeout
  const idleMs = now - session.lastActivityAt;
  const maxIdleMs = DEFAULT_SESSION_CONFIG.idleTimeoutSeconds * 1000;
  if (idleMs > maxIdleMs) {
    await store.delete(sessionId);
    return null;
  }

  // 3. Sliding renewal: calculate remaining TTL capped by absolute expiry
  const remainingLifeSec = Math.floor((session.expiresAt - now) / 1000);
  const ttl = Math.min(DEFAULT_SESSION_CONFIG.idleTimeoutSeconds, remainingLifeSec);

  if (ttl > 0) {
    session.lastActivityAt = now;
    await store.touch(sessionId, ttl, now);
  }

  return session;
}

export async function rotateSession(
  oldSessionId: string,
  reqContext?: { ip?: string; userAgent?: string }
): Promise<SessionData | null> {
  const current = await validateSession(oldSessionId);
  if (!current) return null;

  const store = getSessionStore();
  const newSessionId = generateSessionId();
  const now = Date.now();

  const newSession: SessionData = {
    ...current,
    sessionId: newSessionId,
    lastActivityAt: now,
    ipHash: hashValue(reqContext?.ip) || current.ipHash,
    userAgentHash: hashValue(reqContext?.userAgent) || current.userAgentHash,
  };

  const remainingLifeSec = Math.floor((newSession.expiresAt - now) / 1000);
  const ttl = Math.min(DEFAULT_SESSION_CONFIG.idleTimeoutSeconds, remainingLifeSec);

  await store.set(newSessionId, newSession, ttl);
  await store.delete(oldSessionId);

  return newSession;
}

export async function revokeSession(sessionId: string): Promise<void> {
  if (!sessionId) return;
  const store = getSessionStore();
  await store.delete(sessionId);
}

export async function revokeAllUserSessions(userId: string): Promise<void> {
  if (!userId) return;
  const store = getSessionStore();
  await store.revokeUserSessions(userId);
}
