import {
  EmailDeliveryResult,
  IdempotencyRecord,
  ReportExecutionResult,
  ReportType,
} from "./types";
import { getServerReportConfig, ServerReportConfig } from "./config";
import { calculateReportPeriod } from "./date-utils";
import { fetchReportMetrics } from "./data-source";
import { generateReportEmail } from "./email-templates";
import { sendReportEmail } from "./resend-client";
import { checkReportDelivery, recordReportDelivery } from "./idempotency";

export interface RunReportOptions {
  type: ReportType;
  periodKey?: string;
  force?: boolean;
  isTest?: boolean;
  request?: Request;
}

/**
 * Validates request authorization against CRON_SECRET.
 * Supports:
 * - Authorization: Bearer <CRON_SECRET> (Standard Vercel Cron header)
 * - x-cron-secret: <CRON_SECRET>
 * - ?secret=<CRON_SECRET>
 */
export function validateCronAuth(
  request: Request | undefined,
  config: ServerReportConfig
): { authorized: boolean; reason?: string } {
  // If CRON_SECRET is configured, enforce it strictly
  if (config.cronSecret) {
    if (!request) {
      return { authorized: false, reason: "Request context missing" };
    }

    const authHeader = request.headers.get("authorization") || "";
    const xCronSecret = request.headers.get("x-cron-secret") || "";

    const url = new URL(request.url);
    const querySecret = url.searchParams.get("secret") || "";

    const bearerToken = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : authHeader.trim();

    const isMatch =
      bearerToken === config.cronSecret ||
      xCronSecret === config.cronSecret ||
      querySecret === config.cronSecret;

    if (!isMatch) {
      return {
        authorized: false,
        reason: "Invalid or missing authorization token. Supply Bearer <CRON_SECRET>.",
      };
    }

    return { authorized: true };
  }

  // If CRON_SECRET is NOT set in production, reject for security
  if (!config.isDevelopment) {
    return {
      authorized: false,
      reason:
        "CRON_SECRET is not configured in Vercel environment variables. All report execution is locked until CRON_SECRET is set.",
    };
  }

  // In local development only, allow unauthenticated test executions
  return { authorized: true };
}

/**
 * Central orchestrator: generates, verifies, and delivers reports.
 */
export async function runReport(options: RunReportOptions): Promise<ReportExecutionResult> {
  const startMs = Date.now();
  const config = getServerReportConfig();

  // 1. Calculate target reporting period
  const period = calculateReportPeriod(
    options.type,
    config.timezone,
    new Date(),
    options.periodKey
  );

  console.log(
    `[ReportRunner] Initiating ${options.type.toUpperCase()} report for period ${period.key} (${period.label}) in ${config.timezone}...`
  );

  // 2. Check Idempotency (unless force === true)
  const isForced = Boolean(options.force);
  let existingDelivery: IdempotencyRecord | null = null;

  if (!isForced) {
    existingDelivery = await checkReportDelivery(options.type, period.key, config);
    if (existingDelivery && existingDelivery.status === "DELIVERED") {
      console.log(
        `[ReportRunner] Idempotency: Report ${options.type}:${period.key} was already delivered on ${existingDelivery.timestamp}. Skipping duplicate send.`
      );
      return {
        success: true,
        reportType: options.type,
        period,
        idempotency: {
          checked: true,
          alreadyDelivered: true,
          forced: false,
          record: existingDelivery,
        },
        durationMs: Date.now() - startMs,
      };
    }
  }

  // 3. Fetch real business metrics
  const metrics = await fetchReportMetrics(period, config);

  // 4. Generate HTML and text emails
  const isTest = Boolean(options.isTest);
  const rendered = generateReportEmail(period, metrics, isTest);

  // 5. Deliver via Resend
  let emailResult: EmailDeliveryResult;
  try {
    emailResult = await sendReportEmail(rendered, config);
  } catch (err) {
    emailResult = {
      success: false,
      provider: "resend",
      recipients: config.toEmails,
      latencyMs: 0,
      error: err instanceof Error ? err.message : String(err),
    };
  }

  // 6. Record delivery for idempotency if successful
  if (emailResult.success) {
    const deliveryRecord: IdempotencyRecord = {
      reportType: options.type,
      periodKey: period.key,
      status: "DELIVERED",
      timestamp: new Date().toISOString(),
      messageId: emailResult.messageId,
      recipients: emailResult.recipients,
      provider: "resend",
    };
    await recordReportDelivery(deliveryRecord, config);
  }

  const durationMs = Date.now() - startMs;

  return {
    success: emailResult.success,
    reportType: options.type,
    period,
    idempotency: {
      checked: true,
      alreadyDelivered: false,
      forced: isForced,
    },
    metrics,
    email: emailResult,
    durationMs,
    error: emailResult.error,
  };
}
