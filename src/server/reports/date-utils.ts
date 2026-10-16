import { ReportPeriod, ReportType } from "./types";

interface DateParts {
  year: number;
  month: number; // 1-12
  day: number;   // 1-31
  weekday: string; // "Sun", "Mon", ...
  weekdayIndex: number; // 0 = Sun, 1 = Mon, ..., 6 = Sat
}

/**
 * Extracts year, month, day, and day-of-week for a date within a specific IANA timezone.
 */
export function getDatePartsInTimezone(date: Date, timezone: string): DateParts {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
  });

  const parts: Record<string, string> = {};
  for (const part of formatter.formatToParts(date)) {
    parts[part.type] = part.value;
  }

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const weekday = parts.weekday || "Sun";

  return {
    year: parseInt(parts.year, 10),
    month: parseInt(parts.month, 10),
    day: parseInt(parts.day, 10),
    weekday,
    weekdayIndex: weekdayMap[weekday] ?? 0,
  };
}

/**
 * Formats a Date into a human-friendly string in the given timezone.
 */
export function formatTimestampInTimezone(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date) + ` (${timezone.includes("Kolkata") ? "IST" : timezone})`;
}

/**
 * Calculates the exact reporting period for Daily, Weekly, or Monthly reports.
 *
 * Rules:
 * - Daily: The previous complete calendar day (or specified override day).
 * - Weekly: The previous complete week (Monday to Sunday).
 * - Monthly: The previous complete calendar month (1st through last day).
 */
export function calculateReportPeriod(
  type: ReportType,
  timezone = "Asia/Kolkata",
  referenceDate = new Date(),
  overridePeriodKey?: string
): ReportPeriod {
  const now = referenceDate;
  const current = getDatePartsInTimezone(now, timezone);
  const generatedAt = formatTimestampInTimezone(now, timezone);
  const generatedAtIso = now.toISOString();

  if (type === "daily") {
    // If override provided (e.g. "2026-10-14")
    if (overridePeriodKey && /^\d{4}-\d{2}-\d{2}$/.test(overridePeriodKey)) {
      const [yStr, mStr, dStr] = overridePeriodKey.split("-");
      const y = parseInt(yStr, 10);
      const m = parseInt(mStr, 10);
      const d = parseInt(dStr, 10);
      const label = formatDailyLabel(y, m, d);
      return {
        type: "daily",
        key: overridePeriodKey,
        label,
        startDate: `${overridePeriodKey}T00:00:00`,
        endDate: `${overridePeriodKey}T23:59:59`,
        timezone,
        generatedAt,
        generatedAtIso,
      };
    }

    // Default: Previous complete calendar day
    const prevDayUtc = new Date(Date.UTC(current.year, current.month - 1, current.day - 1));
    const prevParts = {
      year: prevDayUtc.getUTCFullYear(),
      month: prevDayUtc.getUTCMonth() + 1,
      day: prevDayUtc.getUTCDate(),
    };

    const key = `${prevParts.year}-${pad2(prevParts.month)}-${pad2(prevParts.day)}`;
    const label = formatDailyLabel(prevParts.year, prevParts.month, prevParts.day);

    return {
      type: "daily",
      key,
      label,
      startDate: `${key}T00:00:00`,
      endDate: `${key}T23:59:59`,
      timezone,
      generatedAt,
      generatedAtIso,
    };
  }

  if (type === "weekly") {
    // Previous complete week: Monday to Sunday
    // Calculate how many days ago was the last Sunday
    // (if today is Sunday (0), last Sunday was 7 days ago)
    const dayOfWeek = current.weekdayIndex; // 0 = Sun, 1 = Mon, ..., 6 = Sat
    const daysSinceLastSunday = dayOfWeek === 0 ? 7 : dayOfWeek;

    const endSundayUtc = new Date(Date.UTC(current.year, current.month - 1, current.day - daysSinceLastSunday));
    const startMondayUtc = new Date(Date.UTC(endSundayUtc.getUTCFullYear(), endSundayUtc.getUTCMonth(), endSundayUtc.getUTCDate() - 6));

    const startParts = {
      year: startMondayUtc.getUTCFullYear(),
      month: startMondayUtc.getUTCMonth() + 1,
      day: startMondayUtc.getUTCDate(),
    };
    const endParts = {
      year: endSundayUtc.getUTCFullYear(),
      month: endSundayUtc.getUTCMonth() + 1,
      day: endSundayUtc.getUTCDate(),
    };

    const startIso = `${startParts.year}-${pad2(startParts.month)}-${pad2(startParts.day)}`;
    const endIso = `${endParts.year}-${pad2(endParts.month)}-${pad2(endParts.day)}`;

    const weekNumber = getIsoWeekNumber(startMondayUtc);
    const key = `${startParts.year}-W${pad2(weekNumber)}`;
    const label = `${formatMonthShort(startParts.month)} ${startParts.day} – ${formatMonthShort(endParts.month)} ${endParts.day}, ${endParts.year} (Week ${weekNumber})`;

    return {
      type: "weekly",
      key,
      label,
      startDate: `${startIso}T00:00:00`,
      endDate: `${endIso}T23:59:59`,
      timezone,
      generatedAt,
      generatedAtIso,
    };
  }

  // Monthly Report: Previous complete calendar month
  const prevMonthDate = new Date(Date.UTC(current.year, current.month - 2, 1));
  const prevYear = prevMonthDate.getUTCFullYear();
  const prevMonth = prevMonthDate.getUTCMonth() + 1; // 1-12

  // Days in that month: passing 0 for day of following month returns last day of target month
  const lastDay = new Date(Date.UTC(prevYear, prevMonth, 0)).getUTCDate();

  const key = `${prevYear}-${pad2(prevMonth)}`;
  const label = `${formatMonthFull(prevMonth)} ${prevYear} (1st – ${lastDay}th)`;
  const startDate = `${key}-01T00:00:00`;
  const endDate = `${key}-${pad2(lastDay)}T23:59:59`;

  return {
    type: "monthly",
    key,
    label,
    startDate,
    endDate,
    timezone,
    generatedAt,
    generatedAtIso,
  };
}

/**
 * Calculates the preceding period for comparison (e.g. previous day, previous week, previous month).
 */
export function getPreviousPeriod(period: ReportPeriod): ReportPeriod {
  if (period.type === "daily") {
    const [yStr, mStr, dStr] = period.key.split("-");
    const d = new Date(Date.UTC(parseInt(yStr, 10), parseInt(mStr, 10) - 1, parseInt(dStr, 10) - 1));
    const prevKey = `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`;
    return calculateReportPeriod("daily", period.timezone, d, prevKey);
  }

  if (period.type === "weekly") {
    // 7 days prior to start date
    const [startIso] = period.startDate.split("T");
    const [yStr, mStr, dStr] = startIso.split("-");
    const priorDate = new Date(Date.UTC(parseInt(yStr, 10), parseInt(mStr, 10) - 1, parseInt(dStr, 10) - 7));
    return calculateReportPeriod("weekly", period.timezone, priorDate);
  }

  // Monthly: 1 month prior to target month
  const [yStr, mStr] = period.key.split("-");
  const priorMonthDate = new Date(Date.UTC(parseInt(yStr, 10), parseInt(mStr, 10) - 2, 1));
  const priorYear = priorMonthDate.getUTCFullYear();
  const priorMonth = priorMonthDate.getUTCMonth() + 1;
  const priorLastDay = new Date(Date.UTC(priorYear, priorMonth, 0)).getUTCDate();
  const priorKey = `${priorYear}-${pad2(priorMonth)}`;

  return {
    type: "monthly",
    key: priorKey,
    label: `${formatMonthFull(priorMonth)} ${priorYear}`,
    startDate: `${priorKey}-01T00:00:00`,
    endDate: `${priorKey}-${pad2(priorLastDay)}T23:59:59`,
    timezone: period.timezone,
    generatedAt: period.generatedAt,
    generatedAtIso: period.generatedAtIso,
  };
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function formatDailyLabel(y: number, m: number, d: number): string {
  const dateObj = new Date(Date.UTC(y, m - 1, d));
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${days[dateObj.getUTCDay()]}, ${months[m - 1]} ${d}, ${y}`;
}

function formatMonthShort(m: number): string {
  const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return shortMonths[m - 1] || "";
}

function formatMonthFull(m: number): string {
  const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return fullMonths[m - 1] || "";
}

function getIsoWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
