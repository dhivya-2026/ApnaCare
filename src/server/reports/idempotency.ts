import { IdempotencyRecord, ReportType } from "./types";
import { ServerReportConfig } from "./config";

// In-memory safety cache for container lifetime
const localDeliveryCache = new Map<string, IdempotencyRecord>();

/**
 * Checks if a report for a specific type and period has already been delivered.
 * Queries the persistent Google Sheets Report_Delivery_Logs tab via the Apps Script URL.
 */
export async function checkReportDelivery(
  reportType: ReportType,
  periodKey: string,
  config: ServerReportConfig
): Promise<IdempotencyRecord | null> {
  const cacheKey = `${reportType}:${periodKey}`;

  // 1. Check local container cache first
  const cached = localDeliveryCache.get(cacheKey);
  if (cached && cached.status === "DELIVERED") {
    return cached;
  }

  // 2. Query persistent Google Sheet Report_Delivery_Logs
  if (!config.googleAppsScriptUrl) {
    return null;
  }

  try {
    const url = new URL(config.googleAppsScriptUrl);
    url.searchParams.set("action", "check_report_delivery");
    url.searchParams.set("report_type", reportType);
    url.searchParams.set("period_key", periodKey);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
      redirect: "follow",
    });

    clearTimeout(timeout);

    if (response.ok) {
      const json: any = await response.json();
      if (json && json.status === "success" && json.delivered && json.record) {
        const record: IdempotencyRecord = {
          reportType,
          periodKey,
          status: "DELIVERED",
          timestamp: json.record.timestamp || new Date().toISOString(),
          messageId: json.record.message_id || "",
          recipients: json.record.recipients || [],
          provider: json.record.provider || "resend",
        };
        localDeliveryCache.set(cacheKey, record);
        return record;
      }
    }
  } catch (err) {
    console.warn(
      `[Idempotency] Could not check remote delivery log for ${cacheKey}:`,
      err instanceof Error ? err.message : err
    );
  }

  return null;
}

/**
 * Records a report delivery persistently to prevent future duplicate cron sends.
 */
export async function recordReportDelivery(
  record: IdempotencyRecord,
  config: ServerReportConfig
): Promise<boolean> {
  const cacheKey = `${record.reportType}:${record.periodKey}`;
  localDeliveryCache.set(cacheKey, record);

  if (!config.googleAppsScriptUrl) return false;

  try {
    const payload = {
      action: "log_report_delivery",
      event_type: "report_delivery",
      report_type: record.reportType,
      reporting_period: record.periodKey,
      delivery_status: record.status,
      timestamp: record.timestamp,
      message_id: record.messageId || "",
      provider: record.provider || "resend",
      recipient_emails: record.recipients.join(", "),
      error: record.error || "",
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(config.googleAppsScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      redirect: "follow",
    });

    clearTimeout(timeout);

    if (response.ok) {
      return true;
    }
  } catch (err) {
    console.error(
      `[Idempotency] Failed to record delivery log to persistent storage:`,
      err instanceof Error ? err.message : err
    );
  }

  return false;
}
