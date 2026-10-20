/**
 * Enterprise Redis Session Management Types — ApnaCare
 */

export type UserRole = "attendant" | "coordinator" | "admin";

export interface AttendantMetadata {
  name: string;
  mobile: string;
  city: string;
  roleTitle?: string;
  attendantId?: string;
}

export interface SessionData {
  sessionId: string;
  userId: string;
  role: UserRole;
  metadata?: AttendantMetadata;
  createdAt: number; // Unix timestamp in ms
  lastActivityAt: number; // Unix timestamp in ms
  expiresAt: number; // Absolute max expiry in ms
  ipHash?: string;
  userAgentHash?: string;
}

export interface SessionConfig {
  cookieName: string;
  idleTimeoutSeconds: number; // e.g. 7200 (2 hours)
  maxLifetimeSeconds: number; // e.g. 604800 (7 days)
  secure: boolean;
  sameSite: "lax" | "strict" | "none";
  path: string;
}

export interface SessionStore {
  get(sessionId: string): Promise<SessionData | null>;
  set(sessionId: string, session: SessionData, ttlSeconds: number): Promise<void>;
  touch(sessionId: string, ttlSeconds: number, lastActivityAt: number): Promise<boolean>;
  delete(sessionId: string): Promise<void>;
  getUserSessions(userId: string): Promise<string[]>;
  revokeUserSessions(userId: string): Promise<void>;
  isHealthy(): Promise<boolean>;
}

export interface AuthResponse {
  authenticated: boolean;
  user?: {
    id: string;
    role: UserRole;
    metadata?: AttendantMetadata;
    lastActivityAt?: number;
    expiresAt?: number;
  };
  error?: string;
  code?: string;
}
