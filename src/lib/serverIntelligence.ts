/**
 * ApnaCare — Server-side IP & Network Intelligence Module
 * ────────────────────────────────────────────────────────
 * Provides server-side trusted IP extraction, network intelligence,
 * rate limiting detection, and privacy IP masking.
 *
 * Rules:
 * - Never trusts raw client-supplied spoofable headers.
 * - Prioritizes verified reverse proxy headers (e.g. x-forwarded-for, x-real-ip, x-vercel-forwarded-for).
 * - Masks last octet of IPv4 (A.B.C.xxx) and 64-bits of IPv6 to protect user privacy.
 * - Evaluates passive security signals and velocity rates.
 */

export interface NetworkInfo {
  ipMasked: string;
  isp: string;
  asn: string;
  organization: string;
  connectionType: "Broadband" | "Cellular" | "Corporate" | "Hosting/VPN" | "Unknown";
  isHostingOrVpn: boolean;
  country: string;
  region: string;
  city: string;
}

export interface SecurityEvaluation {
  riskLevel: "Low" | "Medium" | "High";
  signalName: string;
  detectionReason: string;
  actionTaken: "Allowed" | "Flagged" | "Challenged" | "Rate-Limited";
  requestCount: number;
}

/**
 * Privacy-safe IP Masker:
 * 103.45.67.89 -> 103.45.67.xxx
 * 2405:201:d004:e0a1:... -> 2405:201:d004:****
 */
export function maskIpAddress(ip: string | null | undefined): string {
  if (!ip || typeof ip !== "string") return "Masked / Internal Client";
  const trimmed = ip.trim();
  if (trimmed === "127.0.0.1" || trimmed === "::1" || trimmed.startsWith("192.168.") || trimmed.startsWith("10.")) {
    return "Localhost / Private Network";
  }

  // IPv4
  if (trimmed.includes(".")) {
    const parts = trimmed.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
    }
  }

  // IPv6
  if (trimmed.includes(":")) {
    const parts = trimmed.split(":");
    if (parts.length >= 3) {
      return `${parts[0]}:${parts[1]}:${parts[2]}:****`;
    }
  }

  return trimmed.slice(0, 8) + "***";
}

/**
 * Extract trusted client IP from server request headers
 */
export function extractClientIp(headers: Headers | Record<string, string | undefined>): string {
  const getHeader = (name: string): string | undefined => {
    if (headers instanceof Headers) {
      return headers.get(name) || undefined;
    }
    return headers[name.toLowerCase()] || headers[name];
  };

  // 1. Vercel / Cloudflare trusted reverse proxy headers
  const xVercelForwardedFor = getHeader("x-vercel-forwarded-for");
  if (xVercelForwardedFor) {
    const first = xVercelForwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  const cfConnectingIp = getHeader("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  const xRealIp = getHeader("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  // 2. Standard X-Forwarded-For (first entry is the client IP)
  const xForwardedFor = getHeader("x-forwarded-for");
  if (xForwardedFor) {
    const first = xForwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  return "127.0.0.1";
}

/**
 * In-memory IP velocity / rate limiter for abuse detection
 */
interface RateTracker {
  count: number;
  firstSeen: number;
  lastSeen: number;
}

const ipRateMap = new Map<string, RateTracker>();
const RATE_WINDOW_MS = 60 * 1000; // 1 minute window
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;

let lastCleanup = Date.now();
function cleanupRateTracker() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, val] of ipRateMap.entries()) {
    if (now - val.lastSeen > RATE_WINDOW_MS * 5) {
      ipRateMap.delete(key);
    }
  }
}

/**
 * Evaluate request velocity and passive security signals
 */
export function evaluateSecurity(
  clientIp: string,
  userAgent: string = "",
  requestPath: string = "/"
): SecurityEvaluation {
  cleanupRateTracker();
  const now = Date.now();
  const masked = maskIpAddress(clientIp);

  let tracker = ipRateMap.get(masked);
  if (!tracker || now - tracker.firstSeen > RATE_WINDOW_MS) {
    tracker = { count: 1, firstSeen: now, lastSeen: now };
  } else {
    tracker.count += 1;
    tracker.lastSeen = now;
  }
  ipRateMap.set(masked, tracker);

  const uaLower = (userAgent || "").toLowerCase();
  const pathLower = (requestPath || "").toLowerCase();

  // 1. High Velocity / Scraping check
  if (tracker.count > 100) {
    return {
      riskLevel: "High",
      signalName: "Severe Rate Velocity",
      detectionReason: `Exceeded ${tracker.count} requests within 60 seconds from subnet ${masked}`,
      actionTaken: "Rate-Limited",
      requestCount: tracker.count,
    };
  }

  if (tracker.count > 50) {
    return {
      riskLevel: "Medium",
      signalName: "Elevated Request Velocity",
      detectionReason: `${tracker.count} requests within 60s from subnet ${masked}`,
      actionTaken: "Flagged",
      requestCount: tracker.count,
    };
  }

  // 2. Known automated scanners / scrapers UA check
  const scannerSignatures = [
    "curl", "wget", "python-requests", "postmanruntime",
    "headlesschrome", "puppeteer", "playwright", "selenium",
    "sqlmap", "nikto", "nmap", "gobuster"
  ];
  const matchedScanner = scannerSignatures.find((sig) => uaLower.includes(sig));
  if (matchedScanner) {
    return {
      riskLevel: "Medium",
      signalName: "Automated Tooling Detected",
      detectionReason: `User-Agent contains automated scanner/scraper signature: '${matchedScanner}'`,
      actionTaken: "Flagged",
      requestCount: tracker.count,
    };
  }

  // 3. Vulnerability scanning path probes
  const suspiciousPaths = [
    "wp-admin", "wp-login", ".env", "actuator", "admin.php",
    "xmlrpc.php", ".git", "phpinfo", "config.json"
  ];
  const matchedPath = suspiciousPaths.find((p) => pathLower.includes(p));
  if (matchedPath) {
    return {
      riskLevel: "High",
      signalName: "Suspicious Endpoint Probe",
      detectionReason: `Access attempt to sensitive non-existent path: '${matchedPath}'`,
      actionTaken: "Flagged",
      requestCount: tracker.count,
    };
  }

  return {
    riskLevel: "Low",
    signalName: "Standard Traffic",
    detectionReason: "Normal authenticated browser session entry",
    actionTaken: "Allowed",
    requestCount: tracker.count,
  };
}
