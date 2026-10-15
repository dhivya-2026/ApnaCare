import nodemailer from "nodemailer";
import { EmailDeliveryResult } from "./types";
import { ServerReportConfig } from "./config";
import { RenderedEmail } from "./email-templates";

/**
 * Sends a generated report email using Nodemailer via SMTP (Gmail App Password, Zoho, Custom SMTP).
 */
export async function sendReportEmailViaNodemailer(
  email: RenderedEmail,
  config: ServerReportConfig
): Promise<EmailDeliveryResult> {
  const startMs = Date.now();
  const recipients = config.toEmails;

  if (recipients.length === 0) {
    return {
      success: false,
      provider: "nodemailer",
      recipients: [],
      latencyMs: 0,
      error: "No valid recipient email addresses configured in REPORT_TO_EMAILS.",
    };
  }

  // If in local development or test mode without SMTP credentials, simulate delivery gracefully
  if (!config.smtpPass && config.isDevelopment) {
    console.warn(
      `[Nodemailer] Notice: SMTP_PASS is not configured in local development. Simulating successful delivery to: ${recipients.join(
        ", "
      )}`
    );
    return {
      success: true,
      messageId: `dev-simulated-${Date.now()}@apnacare.local`,
      provider: "nodemailer",
      recipients,
      latencyMs: Date.now() - startMs,
      warning:
        "Simulated delivery: Configure SMTP_PASS with your Google App Password or SMTP credentials in production.",
    };
  }

  if (!config.smtpPass) {
    return {
      success: false,
      provider: "nodemailer",
      recipients,
      latencyMs: 0,
      error:
        "SMTP_PASS is not configured in Vercel environment variables. For Gmail, generate a 16-character Google App Password.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpSecure,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass.replace(/\s+/g, ""), // strip any spaces often copied in Google App Passwords
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    const info = await transporter.sendMail({
      from: config.fromEmail,
      to: recipients.join(", "),
      subject: email.subject,
      html: email.html,
      text: email.text,
    });

    const latencyMs = Date.now() - startMs;
    console.log(
      `[Nodemailer] Successfully sent ${email.subject} to ${recipients.join(
        ", "
      )} in ${latencyMs}ms. Message ID: ${info.messageId}`
    );

    return {
      success: true,
      messageId: info.messageId,
      provider: "nodemailer",
      recipients,
      latencyMs,
    };
  } catch (err: any) {
    const latencyMs = Date.now() - startMs;
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[Nodemailer] SMTP Delivery Error:", errorMsg);

    let diagnosticHint = "";
    if (errorMsg.includes("Invalid login") || errorMsg.includes("535")) {
      diagnosticHint =
        " (Tip: If using Gmail, make sure 2-Step Verification is enabled and use a 16-character App Password, not your regular Google login password).";
    }

    return {
      success: false,
      provider: "nodemailer",
      recipients,
      latencyMs,
      error: `${errorMsg}${diagnosticHint}`,
    };
  }
}
