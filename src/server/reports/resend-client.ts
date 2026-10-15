import { Resend } from "resend";
import { EmailDeliveryResult } from "./types";
import { ServerReportConfig, isValidEmail } from "./config";
import { RenderedEmail } from "./email-templates";

/**
 * Delivers report emails using the official Resend SDK.
 * Supports multiple recipients, recipient validation, and detailed server diagnostics.
 */
export async function sendReportEmail(
  rendered: RenderedEmail,
  config: ServerReportConfig
): Promise<EmailDeliveryResult> {
  const startMs = Date.now();

  // 1. Validate API Key
  if (!config.resendApiKey) {
    const errorMsg =
      "RESEND_API_KEY environment variable is not configured on the server. Please add RESEND_API_KEY in your Vercel Project Settings.";
    console.error(`[Resend] Delivery aborted: ${errorMsg}`);
    return {
      success: false,
      provider: "resend",
      recipients: config.toEmails,
      latencyMs: Date.now() - startMs,
      error: errorMsg,
    };
  }

  // 2. Validate and filter recipients
  const validRecipients = config.toEmails.filter((email) => isValidEmail(email));
  if (validRecipients.length === 0) {
    const errorMsg = "No valid recipient email addresses found in REPORT_TO_EMAILS.";
    console.error(`[Resend] Delivery aborted: ${errorMsg}`);
    return {
      success: false,
      provider: "resend",
      recipients: [],
      latencyMs: Date.now() - startMs,
      error: errorMsg,
    };
  }

  try {
    const resend = new Resend(config.resendApiKey);

    // Resend free sandbox onboarding@resend.dev requires delivered emails to go to the account owner
    // If user configured a custom domain or onboarding@resend.dev, pass fromEmail
    const payload = {
      from: config.fromEmail,
      to: validRecipients,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
    };

    console.log(
      `[Resend] Sending email: "${rendered.subject}" to ${validRecipients.join(", ")} via ${config.fromEmail}...`
    );

    const { data, error } = await resend.emails.send(payload);

    const latencyMs = Date.now() - startMs;

    if (error) {
      console.error("[Resend] API Error:", error);
      return {
        success: false,
        provider: "resend",
        recipients: validRecipients,
        latencyMs,
        error: error.message || JSON.stringify(error),
      };
    }

    const messageId = data?.id || "resend-msg-ok";
    console.log(`[Resend] Successfully delivered in ${latencyMs}ms. Message ID: ${messageId}`);

    return {
      success: true,
      messageId,
      provider: "resend",
      recipients: validRecipients,
      latencyMs,
    };
  } catch (err) {
    const latencyMs = Date.now() - startMs;
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`[Resend] Exception during email delivery:`, err);

    return {
      success: false,
      provider: "resend",
      recipients: validRecipients,
      latencyMs,
      error: errorMsg,
    };
  }
}
