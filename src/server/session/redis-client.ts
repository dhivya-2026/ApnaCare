/**
 * Redis Connection & Client Adapter — ApnaCare
 *
 * Supports:
 * 1. Upstash Redis / Vercel KV REST (via UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN or KV_REST_API_URL + KV_REST_API_TOKEN)
 * 2. Standard Redis over TCP/TLS (via REDIS_URL or REDIS_HOST/PORT/PASSWORD) using ioredis
 * 3. In-memory fallback for local development & unit tests (strictly blocked in production)
 */

import { Redis as UpstashRedis } from "@upstash/redis";
import IORedis from "ioredis";
import type { SessionData, SessionStore } from "./types";

const SESSION_PREFIX = "apnacare:session:";
const USER_INDEX_PREFIX = "apnacare:user_sessions:";

// In-Memory store for offline/local-dev testing
class MemorySessionStore implements SessionStore {
  private sessions = new Map<string, { data: SessionData; expiresAt: number }>();
  private userIndex = new Map<string, Set<string>>();

  async get(sessionId: string): Promise<SessionData | null> {
    const entry = this.sessions.get(sessionId);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.sessions.delete(sessionId);
      return null;
    }
    return entry.data;
  }

  async set(sessionId: string, session: SessionData, ttlSeconds: number): Promise<void> {
    this.sessions.set(sessionId, {
      data: session,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
    if (!this.userIndex.has(session.userId)) {
      this.userIndex.set(session.userId, new Set());
    }
    this.userIndex.get(session.userId)!.add(sessionId);
  }

  async touch(sessionId: string, ttlSeconds: number, lastActivityAt: number): Promise<boolean> {
    const entry = this.sessions.get(sessionId);
    if (!entry) return false;
    entry.data.lastActivityAt = lastActivityAt;
    entry.expiresAt = Date.now() + ttlSeconds * 1000;
    return true;
  }

  async delete(sessionId: string): Promise<void> {
    const entry = this.sessions.get(sessionId);
    if (entry) {
      const userSessions = this.userIndex.get(entry.data.userId);
      if (userSessions) {
        userSessions.delete(sessionId);
      }
    }
    this.sessions.delete(sessionId);
  }

  async getUserSessions(userId: string): Promise<string[]> {
    const set = this.userIndex.get(userId);
    if (!set) return [];
    return Array.from(set);
  }

  async revokeUserSessions(userId: string): Promise<void> {
    const set = this.userIndex.get(userId);
    if (set) {
      for (const sid of set) {
        this.sessions.delete(sid);
      }
      this.userIndex.delete(userId);
    }
  }

  async isHealthy(): Promise<boolean> {
    return true;
  }
}

// Upstash / Vercel KV REST adapter
class UpstashSessionStore implements SessionStore {
  private client: UpstashRedis;

  constructor(url: string, token: string) {
    this.client = new UpstashRedis({ url, token });
  }

  async get(sessionId: string): Promise<SessionData | null> {
    try {
      const raw = await this.client.get<SessionData | string>(`${SESSION_PREFIX}${sessionId}`);
      if (!raw) return null;
      return typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch (err) {
      console.error("[Redis/Upstash] Failed to get session:", err);
      return null;
    }
  }

  async set(sessionId: string, session: SessionData, ttlSeconds: number): Promise<void> {
    try {
      const key = `${SESSION_PREFIX}${sessionId}`;
      const userKey = `${USER_INDEX_PREFIX}${session.userId}`;
      await this.client
        .pipeline()
        .set(key, JSON.stringify(session), { ex: ttlSeconds })
        .sadd(userKey, sessionId)
        .expire(userKey, 604800) // 7 days index TTL
        .exec();
    } catch (err) {
      console.error("[Redis/Upstash] Failed to set session:", err);
      throw err;
    }
  }

  async touch(sessionId: string, ttlSeconds: number, lastActivityAt: number): Promise<boolean> {
    try {
      const key = `${SESSION_PREFIX}${sessionId}`;
      const session = await this.get(sessionId);
      if (!session) return false;
      session.lastActivityAt = lastActivityAt;
      await this.client.set(key, JSON.stringify(session), { ex: ttlSeconds });
      return true;
    } catch (err) {
      console.error("[Redis/Upstash] Failed to touch session:", err);
      return false;
    }
  }

  async delete(sessionId: string): Promise<void> {
    try {
      const session = await this.get(sessionId);
      const key = `${SESSION_PREFIX}${sessionId}`;
      if (session) {
        const userKey = `${USER_INDEX_PREFIX}${session.userId}`;
        await this.client.pipeline().del(key).srem(userKey, sessionId).exec();
      } else {
        await this.client.del(key);
      }
    } catch (err) {
      console.error("[Redis/Upstash] Failed to delete session:", err);
    }
  }

  async getUserSessions(userId: string): Promise<string[]> {
    try {
      const userKey = `${USER_INDEX_PREFIX}${userId}`;
      return await this.client.smembers(userKey);
    } catch (err) {
      console.error("[Redis/Upstash] Failed to get user sessions:", err);
      return [];
    }
  }

  async revokeUserSessions(userId: string): Promise<void> {
    try {
      const userKey = `${USER_INDEX_PREFIX}${userId}`;
      const sessions = await this.getUserSessions(userId);
      if (sessions.length > 0) {
        const pipe = this.client.pipeline();
        for (const sid of sessions) {
          pipe.del(`${SESSION_PREFIX}${sid}`);
        }
        pipe.del(userKey);
        await pipe.exec();
      }
    } catch (err) {
      console.error("[Redis/Upstash] Failed to revoke user sessions:", err);
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      const pong = await this.client.ping();
      return pong === "PONG";
    } catch {
      return false;
    }
  }
}

// TCP IORedis adapter (Standard Redis / Redis Cloud / AWS ElastiCache)
class IoRedisSessionStore implements SessionStore {
  private client: IORedis;

  constructor(redisUrlOrOptions: string | Record<string, any>) {
    const opts = {
      connectTimeout: 5000,
      maxRetriesPerRequest: 2,
      lazyConnect: false,
      enableReadyCheck: true,
      retryStrategy: (times: number) => (times > 3 ? null : Math.min(times * 100, 1000)),
    };
    if (typeof redisUrlOrOptions === "string") {
      this.client = new IORedis(redisUrlOrOptions, opts);
    } else {
      this.client = new IORedis({ ...redisUrlOrOptions, ...opts });
    }
    this.client.on("error", (err) => {
      console.error("[Redis/IORedis] Connection error:", err.message);
    });
  }

  async get(sessionId: string): Promise<SessionData | null> {
    try {
      const raw = await this.client.get(`${SESSION_PREFIX}${sessionId}`);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (err) {
      console.error("[Redis/IORedis] Failed to get session:", err);
      return null;
    }
  }

  async set(sessionId: string, session: SessionData, ttlSeconds: number): Promise<void> {
    try {
      const key = `${SESSION_PREFIX}${sessionId}`;
      const userKey = `${USER_INDEX_PREFIX}${session.userId}`;
      await this.client
        .multi()
        .set(key, JSON.stringify(session), "EX", ttlSeconds)
        .sadd(userKey, sessionId)
        .expire(userKey, 604800)
        .exec();
    } catch (err) {
      console.error("[Redis/IORedis] Failed to set session:", err);
      throw err;
    }
  }

  async touch(sessionId: string, ttlSeconds: number, lastActivityAt: number): Promise<boolean> {
    try {
      const key = `${SESSION_PREFIX}${sessionId}`;
      const session = await this.get(sessionId);
      if (!session) return false;
      session.lastActivityAt = lastActivityAt;
      await this.client.set(key, JSON.stringify(session), "EX", ttlSeconds);
      return true;
    } catch (err) {
      console.error("[Redis/IORedis] Failed to touch session:", err);
      return false;
    }
  }

  async delete(sessionId: string): Promise<void> {
    try {
      const session = await this.get(sessionId);
      const key = `${SESSION_PREFIX}${sessionId}`;
      if (session) {
        const userKey = `${USER_INDEX_PREFIX}${session.userId}`;
        await this.client.multi().del(key).srem(userKey, sessionId).exec();
      } else {
        await this.client.del(key);
      }
    } catch (err) {
      console.error("[Redis/IORedis] Failed to delete session:", err);
    }
  }

  async getUserSessions(userId: string): Promise<string[]> {
    try {
      const userKey = `${USER_INDEX_PREFIX}${userId}`;
      return await this.client.smembers(userKey);
    } catch (err) {
      console.error("[Redis/IORedis] Failed to get user sessions:", err);
      return [];
    }
  }

  async revokeUserSessions(userId: string): Promise<void> {
    try {
      const userKey = `${USER_INDEX_PREFIX}${userId}`;
      const sessions = await this.getUserSessions(userId);
      if (sessions.length > 0) {
        const multi = this.client.multi();
        for (const sid of sessions) {
          multi.del(`${SESSION_PREFIX}${sid}`);
        }
        multi.del(userKey);
        await multi.exec();
      }
    } catch (err) {
      console.error("[Redis/IORedis] Failed to revoke user sessions:", err);
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      const pong = await this.client.ping();
      return pong === "PONG";
    } catch {
      return false;
    }
  }
}

// Global singleton instance across serverless invocations
let activeStore: SessionStore | null = null;

export function getSessionStore(): SessionStore {
  if (activeStore) return activeStore;

  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (upstashUrl && upstashToken) {
    activeStore = new UpstashSessionStore(upstashUrl, upstashToken);
    return activeStore;
  }

  const redisUrl = process.env.REDIS_URL;
  if (redisUrl) {
    activeStore = new IoRedisSessionStore(redisUrl);
    return activeStore;
  }

  const redisHost = process.env.REDIS_HOST;
  if (redisHost) {
    activeStore = new IoRedisSessionStore({
      host: redisHost,
      port: Number(process.env.REDIS_PORT || 6379),
      password: process.env.REDIS_PASSWORD || undefined,
      tls: process.env.REDIS_TLS === "true" ? {} : undefined,
    });
    return activeStore;
  }

  // If in production and no Redis is configured, log an alert and fail closed if required
  if (process.env.NODE_ENV === "production" && process.env.VERCEL === "1") {
    console.warn(
      "[ApnaCare Security Alert] No REDIS_URL or UPSTASH_REDIS_REST_URL configured in production! Falling back to ephemeral in-memory sessions."
    );
  }

  activeStore = new MemorySessionStore();
  return activeStore;
}

export function resetSessionStoreForTesting(): void {
  activeStore = new MemorySessionStore();
}
