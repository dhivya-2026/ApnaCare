import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  calculateReportPeriod,
  getDatePartsInTimezone,
  getPreviousPeriod,
} from "../server/reports/date-utils";
import { generateReportEmail } from "../server/reports/email-templates";
import { validateCronAuth } from "../server/reports/report-runner";
import { ServerReportConfig } from "../server/reports/config";
import { ReportMetrics, ReportPeriod } from "../server/reports/types";

describe("Report Date Utilities", () => {
  it("extracts timezone date parts accurately for Asia/Kolkata", () => {
    // 2026-10-15T12:00:00Z = 2026-10-15 17:30:00 IST
    const date = new Date("2026-10-15T12:00:00Z");
    const parts = getDatePartsInTimezone(date, "Asia/Kolkata");

    expect(parts.year).toBe(2026);
    expect(parts.month).toBe(10);
    expect(parts.day).toBe(15);
    expect(parts.weekday).toBe("Thu");
    expect(parts.weekdayIndex).toBe(4);
  });

  it("calculates daily reporting period for previous complete calendar day", () => {
    // Reference: Thursday, 2026-10-15
    const refDate = new Date("2026-10-15T09:00:00+05:30");
    const period = calculateReportPeriod("daily", "Asia/Kolkata", refDate);

    expect(period.type).toBe("daily");
    expect(period.key).toBe("2026-10-14");
    expect(period.startDate).toBe("2026-10-14T00:00:00");
    expect(period.endDate).toBe("2026-10-14T23:59:59");
    expect(period.label).toContain("October 14, 2026");
  });

  it("supports manual override for daily report period", () => {
    const refDate = new Date("2026-10-15T09:00:00+05:30");
    const period = calculateReportPeriod("daily", "Asia/Kolkata", refDate, "2026-10-01");

    expect(period.key).toBe("2026-10-01");
    expect(period.startDate).toBe("2026-10-01T00:00:00");
    expect(period.endDate).toBe("2026-10-01T23:59:59");
  });

  it("calculates weekly reporting period for previous complete week (Mon to Sun)", () => {
    // On Monday, 2026-10-12: previous complete week should be Mon 2026-10-05 to Sun 2026-10-11
    const monday = new Date("2026-10-12T09:00:00+05:30");
    const period = calculateReportPeriod("weekly", "Asia/Kolkata", monday);

    expect(period.type).toBe("weekly");
    expect(period.startDate).toBe("2026-10-05T00:00:00");
    expect(period.endDate).toBe("2026-10-11T23:59:59");
    expect(period.label).toContain("Week");
  });

  it("calculates monthly reporting period for previous complete calendar month", () => {
    // On 2026-10-01: previous complete calendar month should be September (2026-09-01 to 2026-09-30)
    const oct1 = new Date("2026-10-01T09:00:00+05:30");
    const period = calculateReportPeriod("monthly", "Asia/Kolkata", oct1);

    expect(period.type).toBe("monthly");
    expect(period.key).toBe("2026-09");
    expect(period.startDate).toBe("2026-09-01T00:00:00");
    expect(period.endDate).toBe("2026-09-30T23:59:59");
    expect(period.label).toContain("September 2026 (1st – 30th)");
  });

  it("handles leap year February for monthly report", () => {
    // On March 1, 2024 (leap year): previous month is February 2024 (29 days)
    const march1 = new Date("2024-03-01T09:00:00+05:30");
    const period = calculateReportPeriod("monthly", "Asia/Kolkata", march1);

    expect(period.key).toBe("2024-02");
    expect(period.startDate).toBe("2024-02-01T00:00:00");
    expect(period.endDate).toBe("2024-02-29T23:59:59");
  });

  it("calculates preceding period for trend comparisons", () => {
    const dailyPeriod: ReportPeriod = {
      type: "daily",
      key: "2026-10-14",
      label: "Oct 14, 2026",
      startDate: "2026-10-14T00:00:00",
      endDate: "2026-10-14T23:59:59",
      timezone: "Asia/Kolkata",
      generatedAt: "Oct 15, 2026",
      generatedAtIso: "2026-10-15T00:00:00Z",
    };

    const prev = getPreviousPeriod(dailyPeriod);
    expect(prev.key).toBe("2026-10-13");
    expect(prev.startDate).toBe("2026-10-13T00:00:00");
  });
});

describe("Authorization and Security (CRON_SECRET)", () => {
  const mockConfig: ServerReportConfig = {
    emailProvider: "nodemailer",
    smtpHost: "smtp.gmail.com",
    smtpPort: 465,
    smtpSecure: true,
    smtpUser: "test@apnacare.in",
    smtpPass: "test_password_123",
    resendApiKey: "re_test_key",
    fromEmail: "ApnaCare Reports <reports@apnacare.in>",
    toEmails: ["test@apnacare.in"],
    cronSecret: "super_secure_cron_secret_123",
    timezone: "Asia/Kolkata",
    googleAppsScriptUrl: "",
    isDevelopment: false,
  };

  it("rejects unauthenticated requests without authorization header", () => {
    const req = new Request("https://apna-care.vercel.app/api/cron/daily-report");
    const result = validateCronAuth(req, mockConfig);

    expect(result.authorized).toBe(false);
    expect(result.reason).toContain("Supply Bearer <CRON_SECRET>");
  });

  it("rejects requests with incorrect bearer token", () => {
    const req = new Request("https://apna-care.vercel.app/api/cron/daily-report", {
      headers: { Authorization: "Bearer wrong_secret" },
    });
    const result = validateCronAuth(req, mockConfig);

    expect(result.authorized).toBe(false);
  });

  it("authorizes requests with correct Bearer header", () => {
    const req = new Request("https://apna-care.vercel.app/api/cron/daily-report", {
      headers: { Authorization: "Bearer super_secure_cron_secret_123" },
    });
    const result = validateCronAuth(req, mockConfig);

    expect(result.authorized).toBe(true);
  });

  it("authorizes requests with x-cron-secret header", () => {
    const req = new Request("https://apna-care.vercel.app/api/cron/daily-report", {
      headers: { "x-cron-secret": "super_secure_cron_secret_123" },
    });
    const result = validateCronAuth(req, mockConfig);

    expect(result.authorized).toBe(true);
  });

  it("authorizes requests with ?secret= query parameter for manual testing", () => {
    const req = new Request(
      "https://apna-care.vercel.app/api/reports/send?secret=super_secure_cron_secret_123"
    );
    const result = validateCronAuth(req, mockConfig);

    expect(result.authorized).toBe(true);
  });

  it("rejects all requests when CRON_SECRET is missing in production", () => {
    const prodConfigWithoutSecret: ServerReportConfig = {
      ...mockConfig,
      cronSecret: "",
      isDevelopment: false,
    };
    const req = new Request("https://apna-care.vercel.app/api/cron/daily-report");
    const result = validateCronAuth(req, prodConfigWithoutSecret);

    expect(result.authorized).toBe(false);
    expect(result.reason).toContain("CRON_SECRET is not configured");
  });
});

describe("Email Template Generation", () => {
  const samplePeriod: ReportPeriod = {
    type: "daily",
    key: "2026-10-14",
    label: "Wednesday, October 14, 2026",
    startDate: "2026-10-14T00:00:00",
    endDate: "2026-10-14T23:59:59",
    timezone: "Asia/Kolkata",
    generatedAt: "Oct 15, 2026, 9:00 AM IST",
    generatedAtIso: "2026-10-15T03:30:00.000Z",
  };

  const sampleMetrics: ReportMetrics = {
    totalLeads: 12,
    bookings: 5,
    callbacks: 3,
    contacts: 2,
    partners: 1,
    chatbots: 1,
    emergencyAlerts: 0,
    attendantApplications: 2,
    uniqueVisitors: 450,
    pageViews: 1280,
    telemetryEvents: 3400,
    conversionRate: "2.67%",
    avgEngagementSeconds: 142,
    source: "google_sheets",
    comparisons: {
      totalLeads: { current: 12, previous: 10, delta: 2, percentChange: 20, trend: "up" },
      bookings: { current: 5, previous: 4, delta: 1, percentChange: 25, trend: "up" },
    },
  };

  it("generates brand-compliant HTML and plain-text emails", () => {
    const email = generateReportEmail(samplePeriod, sampleMetrics, false);

    expect(email.subject).toBe("ApnaCare | Daily Report | 2026-10-14");
    expect(email.html).toContain("ApnaCare");
    expect(email.html).toContain("#047857"); // Brand Emerald
    expect(email.html).toContain("Wednesday, October 14, 2026");
    expect(email.html).toContain("12"); // Total leads
    expect(email.html).toContain("450"); // Unique visitors
    expect(email.html).toContain("2.67%"); // Conversion rate

    // Plain text version
    expect(email.text).toContain("APNACARE DAILY INTELLIGENCE REPORT");
    expect(email.text).toContain("Total Inbound Leads: 12");
  });

  it("includes TEST MODE indicator when isTest is true", () => {
    const email = generateReportEmail(samplePeriod, sampleMetrics, true);

    expect(email.subject).toContain("[TEST]");
    expect(email.html).toContain("MANUAL TEST EXECUTION");
    expect(email.text).toContain("[MANUAL TEST]");
  });

  it("renders weekly report subject format", () => {
    const weeklyPeriod: ReportPeriod = {
      ...samplePeriod,
      type: "weekly",
      key: "2026-W41",
    };
    const email = generateReportEmail(weeklyPeriod, sampleMetrics, false);
    expect(email.subject).toBe("ApnaCare | Weekly Report | 2026-W41");
  });

  it("renders monthly report subject format", () => {
    const monthlyPeriod: ReportPeriod = {
      ...samplePeriod,
      type: "monthly",
      key: "2026-09",
    };
    const email = generateReportEmail(monthlyPeriod, sampleMetrics, false);
    expect(email.subject).toBe("ApnaCare | Monthly Report | 2026-09");
  });

  it("handles empty metrics cleanly without broken HTML", () => {
    const emptyMetrics: ReportMetrics = {
      periodKey: "2026-10-14",
      totalLeads: 0,
      bookings: 0,
      callbacks: 0,
      contacts: 0,
      partners: 0,
      chatbots: 0,
      sosAlerts: 0,
      attendantApplications: 0,
      uniqueVisitors: 0,
      pageViews: 0,
      totalEvents: 0,
      conversionRate: "0.00%",
      avgEngagementSec: 0,
      youtubeLeads: 0,
      linkedinLeads: 0,
      dataSource: "empty",
    };

    const email = generateReportEmail(samplePeriod, emptyMetrics, false);
    expect(email.html).toContain("No activity recorded");
    expect(email.text).toContain("Total Inbound Leads: 0");
  });
});

describe("Nodemailer Client Delivery", () => {
  it("rejects send if recipient list is empty", async () => {
    const { sendReportEmailViaNodemailer } = await import(
      "../server/reports/nodemailer-client"
    );

    const emptyRecipientConfig: ServerReportConfig = {
      emailProvider: "nodemailer",
      smtpHost: "smtp.gmail.com",
      smtpPort: 465,
      smtpSecure: true,
      smtpUser: "test@apnacare.in",
      smtpPass: "app_password_123",
      resendApiKey: "",
      fromEmail: "test@apnacare.in",
      toEmails: [],
      cronSecret: "secret",
      timezone: "Asia/Kolkata",
      googleAppsScriptUrl: "",
      isDevelopment: false,
    };

    const result = await sendReportEmailViaNodemailer(
      { subject: "Test", html: "<p>test</p>", text: "test" },
      emptyRecipientConfig
    );

    expect(result.success).toBe(false);
    expect(result.error).toContain("No valid recipient");
  });

  it("handles development mode without SMTP_PASS by simulating delivery", async () => {
    const { sendReportEmailViaNodemailer } = await import(
      "../server/reports/nodemailer-client"
    );

    const devConfigWithoutPass: ServerReportConfig = {
      emailProvider: "nodemailer",
      smtpHost: "smtp.gmail.com",
      smtpPort: 465,
      smtpSecure: true,
      smtpUser: "test@apnacare.in",
      smtpPass: "",
      resendApiKey: "",
      fromEmail: "test@apnacare.in",
      toEmails: ["recipient@apnacare.in"],
      cronSecret: "secret",
      timezone: "Asia/Kolkata",
      googleAppsScriptUrl: "",
      isDevelopment: true,
    };

    const result = await sendReportEmailViaNodemailer(
      { subject: "Test", html: "<p>test</p>", text: "test" },
      devConfigWithoutPass
    );

    expect(result.success).toBe(true);
    expect(result.provider).toBe("nodemailer");
    expect(result.warning).toContain("Simulated delivery");
  });

  it("fails in production when SMTP_PASS is missing", async () => {
    const { sendReportEmailViaNodemailer } = await import(
      "../server/reports/nodemailer-client"
    );

    const prodConfigWithoutPass: ServerReportConfig = {
      emailProvider: "nodemailer",
      smtpHost: "smtp.gmail.com",
      smtpPort: 465,
      smtpSecure: true,
      smtpUser: "test@apnacare.in",
      smtpPass: "",
      resendApiKey: "",
      fromEmail: "test@apnacare.in",
      toEmails: ["recipient@apnacare.in"],
      cronSecret: "secret",
      timezone: "Asia/Kolkata",
      googleAppsScriptUrl: "",
      isDevelopment: false,
    };

    const result = await sendReportEmailViaNodemailer(
      { subject: "Test", html: "<p>test</p>", text: "test" },
      prodConfigWithoutPass
    );

    expect(result.success).toBe(false);
    expect(result.error).toContain("SMTP_PASS is not configured");
  });
});

