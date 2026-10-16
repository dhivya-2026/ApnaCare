/**
 * Server-side configuration for ApnaCare Vercel reporting engine.
 * None of these variables are exposed to the client bundle (no VITE_ prefix for secrets).
 */

export interface ServerReportConfig {
  emailProvider: "nodemailer" | "resend";
  // SMTP / Nodemailer configuration
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  // Resend fallback configuration
  resendApiKey: string;
  // Common email configuration
  fromEmail: string;
  toEmails: string[];
  cronSecret: string;
  timezone: string;
  googleAppsScriptUrl: string;
  isDevelopment: boolean;
}

export function getServerReportConfig(): ServerReportConfig {
  const env = process.env;

  // SMTP Settings for Nodemailer
  const smtpHost = env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(env.SMTP_PORT || "465", 10);
  const smtpSecure =
    env.SMTP_SECURE !== undefined
      ? env.SMTP_SECURE === "true"
      : smtpPort === 465;
  const smtpUser = env.SMTP_USER || "ayvihd.06@gmail.com";
  const smtpPass = env.SMTP_PASS || "vtjhedzeriwrdlme";

  // Resend API Key: Server-only
  const resendApiKey = env.RESEND_API_KEY || "";

  // Choose provider: Nodemailer is primary per user requirement
  const emailProvider: "nodemailer" | "resend" =
    env.EMAIL_PROVIDER === "resend" ? "resend" : "nodemailer";

  // From Email: Verified sender address (e.g. ApnaCare Reports <ayvihd.06@gmail.com>)
  const fromEmail =
    env.REPORT_FROM_EMAIL ||
    (smtpUser
      ? `ApnaCare Reports <${smtpUser}>`
      : "ApnaCare Reports <ayvihd.06@gmail.com>");

  // Recipient Emails: Multiple comma-separated recipients supported
  const rawToEmails =
    env.REPORT_TO_EMAILS ||
    "divabhrati.ramco@gmail.com";
  const toEmails = rawToEmails
    .split(",")
    .map((e) => e.trim())
    .filter((e) => isValidEmail(e));

  // If no valid email parsed, fallback to default ops desk
  if (toEmails.length === 0) {
    toEmails.push("divabhrati.ramco@gmail.com");
  }

  // Cron Secret: Required for Vercel Cron authorization
  const cronSecret = env.CRON_SECRET || "8ea5471904719fdc4bb451a65e2fbe329c6233140f6c1584";

  // Reporting Timezone (defaults to Asia/Kolkata / IST)
  const timezone = env.REPORT_TIMEZONE || "Asia/Kolkata";

  // Data Source: Google Apps Script Web App URL (Server-side or inherited)
  const googleAppsScriptUrl =
    env.GOOGLE_APPS_SCRIPT_URL ||
    env.VITE_GOOGLE_APPS_SCRIPT_URL ||
    "https://script.google.com/macros/s/AKfycbx6gwpPkEgsO9y0lksDo2MS4LFXna4dnv20XkC4_KJd3voXqxTCyBuwPg4g_BM896YV/exec";

  const isDevelopment =
    env.NODE_ENV !== "production" && env.VERCEL_ENV !== "production";

  return {
    emailProvider,
    smtpHost,
    smtpPort,
    smtpSecure,
    smtpUser,
    smtpPass,
    resendApiKey,
    fromEmail,
    toEmails,
    cronSecret,
    timezone,
    googleAppsScriptUrl,
    isDevelopment,
  };
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
