/**
 * ApnaCare Password Hashing Utilities
 * Uses Node.js crypto (no external deps) — PBKDF2-style SHA-256 salted hashing.
 * Never store or log plaintext passwords.
 */

import { randomBytes, createHmac, createHash } from "crypto";

/**
 * Generate a cryptographically random hex salt (64 chars = 256 bits)
 */
export function generateSalt(): string {
  return randomBytes(32).toString("hex");
}

/**
 * Hash a password with a known salt using HMAC-SHA256.
 * Returns a hex string. Use constant-time comparison for verification.
 */
export function hashPassword(password: string, salt: string): string {
  // Double-hash: SHA256(salt + SHA256(password)) for extra protection
  const innerHash = createHash("sha256").update(password).digest("hex");
  return createHmac("sha256", salt).update(innerHash).digest("hex");
}

/**
 * Constant-time comparison to prevent timing attacks.
 */
export function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * Verify a plaintext password against stored hash + salt.
 */
export function verifyPassword(password: string, salt: string, storedHash: string): boolean {
  const computed = hashPassword(password, salt);
  return secureCompare(computed, storedHash);
}

/**
 * Generate a unique ID with a given prefix.
 * e.g. generateId("USR") → "USR-1f2e3a4b5c6d"
 */
export function generateId(prefix: string): string {
  return `${prefix}-${randomBytes(6).toString("hex")}`;
}

