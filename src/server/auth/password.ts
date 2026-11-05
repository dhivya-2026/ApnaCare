import { randomBytes, pbkdf2 as pbkdf2Cb, timingSafeEqual } from "crypto";
import { promisify } from "util";

const pbkdf2 = promisify(pbkdf2Cb);

const ITERATIONS = 100_000;
const KEY_LEN = 32;
const DIGEST = "sha256";

/**
 * Hashes a plaintext password using cryptographically strong PBKDF2 with a random salt.
 * Format: pbkdf2:sha256:100000:<saltHex>:<hashHex>
 */
export async function hashPassword(password: string): Promise<string> {
  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
  const salt = randomBytes(16);
  const derivedKey = await pbkdf2(password, salt, ITERATIONS, KEY_LEN, DIGEST);
  return `pbkdf2:${DIGEST}:${ITERATIONS}:${salt.toString("hex")}:${derivedKey.toString("hex")}`;
}

/**
 * Verifies a plaintext password against a stored hash string using timing-safe comparison.
 */
export async function verifyPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  if (!password || !storedHash) return false;

  const parts = storedHash.split(":");
  if (parts.length === 5 && parts[0] === "pbkdf2") {
    const [, digest, iterStr, saltHex, hashHex] = parts;
    const iterations = parseInt(iterStr, 10);
    const salt = Buffer.from(saltHex, "hex");
    const originalHash = Buffer.from(hashHex, "hex");

    const derivedKey = await pbkdf2(
      password,
      salt,
      iterations,
      originalHash.length,
      digest
    );
    if (derivedKey.length !== originalHash.length) return false;
    return timingSafeEqual(derivedKey, originalHash);
  }

  return false;
}

/**
 * Validates password strength according to security standards.
 */
export function validatePasswordStrength(password: string): {
  valid: boolean;
  message?: string;
} {
  if (!password || password.length < 8) {
    return {
      valid: false,
      message: "Password must be at least 8 characters long",
    };
  }
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain both letters and numbers",
    };
  }
  return { valid: true };
}
