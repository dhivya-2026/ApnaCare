export type ReportType = "daily" | "weekly" | "monthly";

export interface ReportPeriod {
  type: ReportType;
  key: string;            // e.g. "2026-10-14", "2026-W41", "2026-09"
  label: string;          // Human readable (e.g. "October 14, 2026", "Oct 05 – Oct 11, 2026", "September 2026")
  startDate: string;      // ISO or YYYY-MM-DD
  endDate: string;        // ISO or YYYY-MM-DD
  timezone: string;       // e.g. "Asia/Kolkata"
  generatedAt: string;    // Human readable generation timestamp
  generatedAtIso: string; // ISO string
}

export interface MetricComparison {
  current: number;
  previous: number;
  changePercent: number; // e.g. +14.2% or -5.0%
  changeDelta: number;   // current - previous
  trend: "up" | "down" | "flat";
}

export interface ReportMetrics {
  periodKey: string;
  totalEvents: number;
  uniqueVisitors: number;
  pageViews: number;
  bookings: number;
  callbacks: number;
  contacts: number;
  partners: number;
  chatbots: number;
  youtubeLeads: number;
  linkedinLeads: number;
  attendantApplications: number;
  sosAlerts: number;
  totalLeads: number;
  conversionRate: string; // e.g. "6.4%"
  avgEngagementSec: number;
  sourceBreakdown?: Record<string, number>;
  cityBreakdown?: Record<string, number>;
  serviceBreakdown?: Record<string, number>;
  comparisons?: {
    totalLeads?: MetricComparison;
    bookings?: MetricComparison;
    visitors?: MetricComparison;
    pageViews?: MetricComparison;
  };
  dailyBreakdown?: Array<{
    date: string;
    events: number;
    visitors: number;
    bookings: number;
    leads: number;
  }>;
  dataSource: "google_apps_script" | "airtable" | "fallback" | "empty";
  isFallbackData?: boolean;
}

export interface EmailDeliveryResult {
  success: boolean;
  messageId?: string;
  provider: "resend";
  recipients: string[];
  latencyMs: number;
  error?: string;
  warning?: string;
}

export interface IdempotencyRecord {
  reportType: ReportType;
  periodKey: string;
  status: "DELIVERED" | "FAILED" | "PENDING";
  timestamp: string;
  messageId?: string;
  recipients: string[];
  provider: string;
  error?: string;
}

export interface ReportExecutionResult {
  success: boolean;
  reportType: ReportType;
  period: ReportPeriod;
  idempotency: {
    checked: boolean;
    alreadyDelivered: boolean;
    forced: boolean;
    record?: IdempotencyRecord;
  };
  metrics?: ReportMetrics;
  email?: EmailDeliveryResult;
  durationMs: number;
  error?: string;
}
