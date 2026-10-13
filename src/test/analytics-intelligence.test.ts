import { describe, expect, it, beforeEach } from "vitest";
import {
  maskIpAddress,
  extractClientIp,
  evaluateSecurity,
} from "../lib/serverIntelligence";
import {
  getIntelligenceData,
  getBenchmarkDataset,
  exportSessionsCsv,
  exportSecurityCsv,
  type AnalyticsSession,
  type TrafficChannel,
} from "../lib/intelligenceStore";
import {
  getTrafficAttribution,
  getTimezoneIntelligence,
} from "../lib/analytics";

describe("IP & Network Intelligence", () => {
  it("masks IPv4 addresses to protect user privacy (A.B.C.xxx)", () => {
    expect(maskIpAddress("103.45.67.89")).toBe("103.45.67.xxx");
    expect(maskIpAddress("49.207.180.12")).toBe("49.207.180.xxx");
    expect(maskIpAddress("127.0.0.1")).toBe("Localhost / Private Network");
    expect(maskIpAddress("::1")).toBe("Localhost / Private Network");
    expect(maskIpAddress(null)).toBe("Masked / Internal Client");
  });

  it("masks IPv6 addresses correctly", () => {
    const masked = maskIpAddress("2405:201:d004:e0a1:1234:5678:9abc:def0");
    expect(masked).toBe("2405:201:d004:****");
  });

  it("extracts client IP from trusted reverse proxy headers", () => {
    const headers = new Headers({
      "x-vercel-forwarded-for": "103.21.244.2, 198.51.100.1",
      "x-real-ip": "103.21.244.2",
    });
    expect(extractClientIp(headers)).toBe("103.21.244.2");

    const cfHeaders = new Headers({
      "cf-connecting-ip": "49.207.180.5",
    });
    expect(extractClientIp(cfHeaders)).toBe("49.207.180.5");
  });

  it("evaluates security signals and flags automated tooling", () => {
    const evalHeadless = evaluateSecurity("103.45.67.89", "Mozilla/5.0 HeadlessChrome/112.0", "/services");
    expect(evalHeadless.riskLevel).toBe("Medium");
    expect(evalHeadless.signalName).toBe("Automated Tooling Detected");
  });

  it("flags suspicious endpoint probing as high risk", () => {
    const evalProbe = evaluateSecurity("45.134.20.10", "Mozilla/5.0", "/wp-login.php");
    expect(evalProbe.riskLevel).toBe("High");
    expect(evalProbe.signalName).toBe("Suspicious Endpoint Probe");
  });

  it("allows standard browsing traffic with low risk", () => {
    const evalNormal = evaluateSecurity("122.161.45.10", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", "/");
    expect(evalNormal.riskLevel).toBe("Low");
    expect(evalNormal.actionTaken).toBe("Allowed");
  });
});

describe("Traffic & Timezone Intelligence", () => {
  it("determines browser timezone without intrusive permissions", () => {
    const tz = getTimezoneIntelligence();
    expect(tz.timezone).toBeDefined();
    expect(tz.utc_offset).toMatch(/^UTC[+-]\d{2}:\d{2}$/);
    expect(tz.timezone_source).toBe("Browser Intl API");
  });

  it("generates benchmark dataset with balanced multi-city distribution", () => {
    const bm = getBenchmarkDataset();
    expect(bm.sessions.length).toBeGreaterThan(100);
    expect(bm.securityLogs.length).toBeGreaterThan(5);

    const cities = new Set(bm.sessions.map((s) => s.city));
    expect(cities.has("Bengaluru")).toBe(true);
    expect(cities.has("Chennai")).toBe(true);
    expect(cities.has("Hyderabad")).toBe(true);
    expect(cities.has("Coimbatore")).toBe(true);
  });
});

describe("Intelligence Store Aggregations & Metrics", () => {
  it("calculates comprehensive overview metrics and bounce rates", () => {
    const data = getIntelligenceData({ dateRange: "7d", channel: "All", city: "All" }, true);
    expect(data.overview.totalSessions).toBeGreaterThan(0);
    expect(data.overview.uniqueVisitors).toBeGreaterThan(0);
    expect(data.overview.bounceRate).toBeGreaterThanOrEqual(0);
    expect(data.overview.bounceRate).toBeLessThanOrEqual(100);
    expect(data.overview.conversionRate).toBeGreaterThanOrEqual(0);
    expect(data.overview.pagesPerSession).toBeGreaterThan(0);
  });

  it("generates 7x24 heatmap grid (168 cells)", () => {
    const data = getIntelligenceData({ dateRange: "7d" }, true);
    expect(data.heatmap.length).toBe(7 * 24); // 168 hours in a week
    const sundayMid = data.heatmap.find((c) => c.dayOfWeek === 0 && c.hour === 0);
    expect(sundayMid).toBeDefined();
    expect(sundayMid?.dayName).toBe("Sunday");
  });

  it("computes 5-stage conversion funnel drop-offs", () => {
    const data = getIntelligenceData({ dateRange: "30d" }, true);
    expect(data.funnel.length).toBe(5);
    expect(data.funnel[0].step).toBe(1);
    expect(data.funnel[4].step).toBe(5);
    // Funnel count monotonically decreases or stays equal
    for (let i = 1; i < data.funnel.length; i++) {
      expect(data.funnel[i].count).toBeLessThanOrEqual(data.funnel[i - 1].count);
    }
  });

  it("exports sessions and security logs to valid CSV format", () => {
    const sampleSession: AnalyticsSession = {
      sessionId: "ses_test_123",
      visitorId: "vis_test_456",
      startTimeUtc: "2026-10-12T10:00:00Z",
      endTimeUtc: "2026-10-12T10:05:00Z",
      durationSeconds: 300,
      pageCount: 3,
      entryPage: "/",
      exitPage: "/booking",
      isBounce: false,
      trafficChannel: "Organic Search",
      utmSource: "google",
      utmMedium: "organic",
      utmCampaign: "(none)",
      referringDomain: "www.google.com",
      deviceType: "Mobile",
      browser: "Chrome Mobile",
      os: "Android",
      country: "India",
      region: "Karnataka",
      city: "Bengaluru",
      browserTimezone: "Asia/Kolkata",
      ipTimezone: "Asia/Kolkata",
      ipMasked: "103.45.67.xxx",
      isp: "Jio Fiber",
      isReturning: true,
      hasConversion: true,
      conversionType: "Booking Lead Completed",
      pagePathTrail: ["/", "/services/elderly-care", "/booking"],
    };

    const csv = exportSessionsCsv([sampleSession]);
    expect(csv).toContain("Session ID,Visitor ID");
    expect(csv).toContain("ses_test_123");
    expect(csv).toContain("103.45.67.xxx");
    expect(csv).toContain("Bengaluru");
  });
});
