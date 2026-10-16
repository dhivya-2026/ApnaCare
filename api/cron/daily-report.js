// src/server/reports/config.ts
function getServerReportConfig() {
  const env = process.env;
  const smtpHost = env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(env.SMTP_PORT || "465", 10);
  const smtpSecure = env.SMTP_SECURE !== void 0 ? env.SMTP_SECURE === "true" : smtpPort === 465;
  const smtpUser = env.SMTP_USER || "ayvihd.06@gmail.com";
  const smtpPass = env.SMTP_PASS || "";
  const resendApiKey = env.RESEND_API_KEY || "";
  const emailProvider = env.EMAIL_PROVIDER === "resend" ? "resend" : "nodemailer";
  const fromEmail = env.REPORT_FROM_EMAIL || (smtpUser ? `ApnaCare Reports <${smtpUser}>` : "ApnaCare Reports <ayvihd.06@gmail.com>");
  const rawToEmails = env.REPORT_TO_EMAILS || "divabhrati.ramco@gmail.com";
  const toEmails = rawToEmails.split(",").map((e) => e.trim()).filter((e) => isValidEmail(e));
  if (toEmails.length === 0) {
    toEmails.push("divabhrati.ramco@gmail.com");
  }
  const cronSecret = env.CRON_SECRET || "";
  const timezone = env.REPORT_TIMEZONE || "Asia/Kolkata";
  const googleAppsScriptUrl = env.GOOGLE_APPS_SCRIPT_URL || env.VITE_GOOGLE_APPS_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbx6gwpPkEgsO9y0lksDo2MS4LFXna4dnv20XkC4_KJd3voXqxTCyBuwPg4g_BM896YV/exec";
  const isDevelopment = env.NODE_ENV !== "production" && env.VERCEL_ENV !== "production";
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
    isDevelopment
  };
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// src/server/reports/date-utils.ts
function getDatePartsInTimezone(date, timezone) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short"
  });
  const parts = {};
  for (const part of formatter.formatToParts(date)) {
    parts[part.type] = part.value;
  }
  const weekdayMap = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6
  };
  const weekday = parts.weekday || "Sun";
  return {
    year: parseInt(parts.year, 10),
    month: parseInt(parts.month, 10),
    day: parseInt(parts.day, 10),
    weekday,
    weekdayIndex: weekdayMap[weekday] ?? 0
  };
}
function formatTimestampInTimezone(date, timezone) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date) + ` (${timezone.includes("Kolkata") ? "IST" : timezone})`;
}
function calculateReportPeriod(type, timezone = "Asia/Kolkata", referenceDate = /* @__PURE__ */ new Date(), overridePeriodKey) {
  const now = referenceDate;
  const current = getDatePartsInTimezone(now, timezone);
  const generatedAt = formatTimestampInTimezone(now, timezone);
  const generatedAtIso = now.toISOString();
  if (type === "daily") {
    if (overridePeriodKey && /^\d{4}-\d{2}-\d{2}$/.test(overridePeriodKey)) {
      const [yStr, mStr, dStr] = overridePeriodKey.split("-");
      const y = parseInt(yStr, 10);
      const m = parseInt(mStr, 10);
      const d = parseInt(dStr, 10);
      const label3 = formatDailyLabel(y, m, d);
      return {
        type: "daily",
        key: overridePeriodKey,
        label: label3,
        startDate: `${overridePeriodKey}T00:00:00`,
        endDate: `${overridePeriodKey}T23:59:59`,
        timezone,
        generatedAt,
        generatedAtIso
      };
    }
    const prevDayUtc = new Date(Date.UTC(current.year, current.month - 1, current.day - 1));
    const prevParts = {
      year: prevDayUtc.getUTCFullYear(),
      month: prevDayUtc.getUTCMonth() + 1,
      day: prevDayUtc.getUTCDate()
    };
    const key2 = `${prevParts.year}-${pad2(prevParts.month)}-${pad2(prevParts.day)}`;
    const label2 = formatDailyLabel(prevParts.year, prevParts.month, prevParts.day);
    return {
      type: "daily",
      key: key2,
      label: label2,
      startDate: `${key2}T00:00:00`,
      endDate: `${key2}T23:59:59`,
      timezone,
      generatedAt,
      generatedAtIso
    };
  }
  if (type === "weekly") {
    const dayOfWeek = current.weekdayIndex;
    const daysSinceLastSunday = dayOfWeek === 0 ? 7 : dayOfWeek;
    const endSundayUtc = new Date(Date.UTC(current.year, current.month - 1, current.day - daysSinceLastSunday));
    const startMondayUtc = new Date(Date.UTC(endSundayUtc.getUTCFullYear(), endSundayUtc.getUTCMonth(), endSundayUtc.getUTCDate() - 6));
    const startParts = {
      year: startMondayUtc.getUTCFullYear(),
      month: startMondayUtc.getUTCMonth() + 1,
      day: startMondayUtc.getUTCDate()
    };
    const endParts = {
      year: endSundayUtc.getUTCFullYear(),
      month: endSundayUtc.getUTCMonth() + 1,
      day: endSundayUtc.getUTCDate()
    };
    const startIso = `${startParts.year}-${pad2(startParts.month)}-${pad2(startParts.day)}`;
    const endIso = `${endParts.year}-${pad2(endParts.month)}-${pad2(endParts.day)}`;
    const weekNumber = getIsoWeekNumber(startMondayUtc);
    const key2 = `${startParts.year}-W${pad2(weekNumber)}`;
    const label2 = `${formatMonthShort(startParts.month)} ${startParts.day} \u2013 ${formatMonthShort(endParts.month)} ${endParts.day}, ${endParts.year} (Week ${weekNumber})`;
    return {
      type: "weekly",
      key: key2,
      label: label2,
      startDate: `${startIso}T00:00:00`,
      endDate: `${endIso}T23:59:59`,
      timezone,
      generatedAt,
      generatedAtIso
    };
  }
  const prevMonthDate = new Date(Date.UTC(current.year, current.month - 2, 1));
  const prevYear = prevMonthDate.getUTCFullYear();
  const prevMonth = prevMonthDate.getUTCMonth() + 1;
  const lastDay = new Date(Date.UTC(prevYear, prevMonth, 0)).getUTCDate();
  const key = `${prevYear}-${pad2(prevMonth)}`;
  const label = `${formatMonthFull(prevMonth)} ${prevYear} (1st \u2013 ${lastDay}th)`;
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
    generatedAtIso
  };
}
function getPreviousPeriod(period) {
  if (period.type === "daily") {
    const [yStr2, mStr2, dStr] = period.key.split("-");
    const d = new Date(Date.UTC(parseInt(yStr2, 10), parseInt(mStr2, 10) - 1, parseInt(dStr, 10) - 1));
    const prevKey = `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`;
    return calculateReportPeriod("daily", period.timezone, d, prevKey);
  }
  if (period.type === "weekly") {
    const [startIso] = period.startDate.split("T");
    const [yStr2, mStr2, dStr] = startIso.split("-");
    const priorDate = new Date(Date.UTC(parseInt(yStr2, 10), parseInt(mStr2, 10) - 1, parseInt(dStr, 10) - 7));
    return calculateReportPeriod("weekly", period.timezone, priorDate);
  }
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
    generatedAtIso: period.generatedAtIso
  };
}
function pad2(n) {
  return n < 10 ? `0${n}` : `${n}`;
}
function formatDailyLabel(y, m, d) {
  const dateObj = new Date(Date.UTC(y, m - 1, d));
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${days[dateObj.getUTCDay()]}, ${months[m - 1]} ${d}, ${y}`;
}
function formatMonthShort(m) {
  const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return shortMonths[m - 1] || "";
}
function formatMonthFull(m) {
  const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return fullMonths[m - 1] || "";
}
function getIsoWeekNumber(d) {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 864e5 + 1) / 7);
}

// src/server/reports/data-source.ts
async function fetchReportMetrics(period, config) {
  try {
    const gasData = await fetchFromGoogleAppsScript(period, config);
    if (gasData) {
      try {
        const prevPeriod = getPreviousPeriod(period);
        const prevGasData = await fetchFromGoogleAppsScript(prevPeriod, config);
        if (prevGasData) {
          gasData.comparisons = {
            totalLeads: computeComparison(gasData.totalLeads, prevGasData.totalLeads),
            bookings: computeComparison(gasData.bookings, prevGasData.bookings),
            visitors: computeComparison(gasData.uniqueVisitors, prevGasData.uniqueVisitors),
            pageViews: computeComparison(gasData.pageViews, prevGasData.pageViews)
          };
        }
      } catch (compErr) {
        console.warn("Could not calculate comparison metrics:", compErr instanceof Error ? compErr.message : compErr);
      }
      return gasData;
    }
  } catch (gasErr) {
    console.warn("Notice: Google Apps Script data read failed, attempting Airtable fallback:", gasErr instanceof Error ? gasErr.message : gasErr);
  }
  try {
    const airtableData = await fetchFromAirtable(period);
    if (airtableData) {
      return airtableData;
    }
  } catch (airtableErr) {
    console.warn("Airtable fallback also unavailable:", airtableErr instanceof Error ? airtableErr.message : airtableErr);
  }
  return createEmptyMetrics(period.key, "empty");
}
async function fetchFromGoogleAppsScript(period, config) {
  if (!config.googleAppsScriptUrl) return null;
  const url = new URL(config.googleAppsScriptUrl);
  url.searchParams.set("action", "get_report_data");
  url.searchParams.set("type", period.type);
  url.searchParams.set("period_key", period.key);
  url.searchParams.set("start_date", period.startDate);
  url.searchParams.set("end_date", period.endDate);
  url.searchParams.set("timezone", period.timezone);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12e3);
  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
      redirect: "follow"
    });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} from Google Apps Script`);
    }
    const text = await response.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      throw new Error(`Invalid JSON received from GAS: ${text.slice(0, 100)}`);
    }
    if (json && json.status === "success" && json.metrics) {
      const m = json.metrics;
      const totalLeads = (m.bookings || 0) + (m.callbacks || 0) + (m.contacts || 0) + (m.partners || 0) + (m.chatbots || 0) + (m.youtubeLeads || 0) + (m.linkedinLeads || 0) + (m.attendantApplications || 0);
      const uniqueVisitors = m.uniqueVisitors || 0;
      const convRate = uniqueVisitors > 0 ? (totalLeads / uniqueVisitors * 100).toFixed(1) + "%" : m.conversionRate || "0.0%";
      return {
        periodKey: period.key,
        totalEvents: m.totalEvents || 0,
        uniqueVisitors,
        pageViews: m.pageViews || 0,
        bookings: m.bookings || 0,
        callbacks: m.callbacks || 0,
        contacts: m.contacts || 0,
        partners: m.partners || 0,
        chatbots: m.chatbots || 0,
        youtubeLeads: m.youtubeLeads || 0,
        linkedinLeads: m.linkedinLeads || 0,
        attendantApplications: m.attendantApplications || 0,
        sosAlerts: m.sosAlerts || 0,
        totalLeads,
        conversionRate: convRate,
        avgEngagementSec: m.avgEngagementSec || 0,
        sourceBreakdown: m.sourceBreakdown || {},
        cityBreakdown: m.cityBreakdown || {},
        serviceBreakdown: m.serviceBreakdown || {},
        dailyBreakdown: m.dailyBreakdown || [],
        dataSource: "google_apps_script"
      };
    }
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
async function fetchFromAirtable(period) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID || "appd5rLxicUUJpImD";
  const tableId = process.env.AIRTABLE_TABLE_ID || "tbl6DnBguLMnvIQI8";
  if (!apiKey) return null;
  const url = `https://api.airtable.com/v0/${baseId}/${tableId}?maxRecords=100`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` }
  });
  if (!response.ok) return null;
  const data = await response.json();
  if (!data.records) return null;
  const startMs = new Date(period.startDate).getTime();
  const endMs = new Date(period.endDate).getTime();
  let bookings = 0;
  let callbacks = 0;
  let contacts = 0;
  let others = 0;
  for (const rec of data.records) {
    const t = rec.createdTime ? new Date(rec.createdTime).getTime() : 0;
    if (t >= startMs && t <= endMs) {
      const type = String(rec.fields?.["Lead Type"] || rec.fields?.["Service"] || "").toLowerCase();
      if (type.includes("booking")) bookings++;
      else if (type.includes("callback")) callbacks++;
      else if (type.includes("contact")) contacts++;
      else others++;
    }
  }
  const totalLeads = bookings + callbacks + contacts + others;
  return {
    periodKey: period.key,
    totalEvents: totalLeads,
    uniqueVisitors: totalLeads,
    pageViews: totalLeads * 3,
    bookings,
    callbacks,
    contacts,
    partners: 0,
    chatbots: 0,
    youtubeLeads: 0,
    linkedinLeads: 0,
    attendantApplications: 0,
    sosAlerts: 0,
    totalLeads,
    conversionRate: "100%",
    avgEngagementSec: 120,
    dataSource: "airtable"
  };
}
function computeComparison(current, previous) {
  const changeDelta = current - previous;
  let changePercent = 0;
  if (previous > 0) {
    changePercent = Math.round((current - previous) / previous * 1e3) / 10;
  } else if (current > 0) {
    changePercent = 100;
  }
  const trend = changeDelta > 0 ? "up" : changeDelta < 0 ? "down" : "flat";
  return {
    current,
    previous,
    changePercent,
    changeDelta,
    trend
  };
}
function createEmptyMetrics(periodKey, source) {
  return {
    periodKey,
    totalEvents: 0,
    uniqueVisitors: 0,
    pageViews: 0,
    bookings: 0,
    callbacks: 0,
    contacts: 0,
    partners: 0,
    chatbots: 0,
    youtubeLeads: 0,
    linkedinLeads: 0,
    attendantApplications: 0,
    sosAlerts: 0,
    totalLeads: 0,
    conversionRate: "0.0%",
    avgEngagementSec: 0,
    dataSource: source
  };
}

// src/server/reports/email-templates.ts
function generateReportEmail(period, metrics, isTest = false) {
  const subject = generateSubject(period, isTest);
  const html = generateHtml(period, metrics, isTest);
  const text = generateText(period, metrics, isTest);
  return { subject, html, text };
}
function generateSubject(period, isTest) {
  const prefix = isTest ? "[TEST] " : "";
  if (period.type === "daily") {
    return `${prefix}ApnaCare | Daily Report | ${period.key}`;
  }
  if (period.type === "weekly") {
    return `${prefix}ApnaCare | Weekly Report | ${period.key}`;
  }
  return `${prefix}ApnaCare | Monthly Report | ${period.key}`;
}
function generateHtml(period, m, isTest) {
  const typeTitle = period.type === "daily" ? "Daily Operations Intelligence" : period.type === "weekly" ? "Weekly Executive Digest" : "Monthly Performance Review";
  const themeGradient = period.type === "daily" ? "linear-gradient(135deg, #047857 0%, #064e3b 100%)" : period.type === "weekly" ? "linear-gradient(135deg, #0284c7 0%, #0f172a 100%)" : "linear-gradient(135deg, #7c3aed 0%, #1e1b4b 100%)";
  const badgeBg = period.type === "daily" ? "rgba(16, 185, 129, 0.2)" : period.type === "weekly" ? "rgba(56, 189, 248, 0.2)" : "rgba(168, 85, 247, 0.2)";
  const leadsCompHtml = renderTrendBadge(m.comparisons?.totalLeads);
  const bookingsCompHtml = renderTrendBadge(m.comparisons?.bookings);
  const visitorsCompHtml = renderTrendBadge(m.comparisons?.visitors);
  const youtubeLeads = m.youtubeLeads ?? 0;
  const linkedinLeads = m.linkedinLeads ?? 0;
  const sosAlerts = m.sosAlerts ?? 0;
  const totalEvents = m.totalEvents ?? 0;
  const isEmpty = (m.totalLeads ?? 0) === 0 && (m.uniqueVisitors ?? 0) === 0;
  const dailyBreakdownHtml = m.dailyBreakdown && m.dailyBreakdown.length > 0 ? `
      <div style="margin-top:24px;border-top:1px solid #e2e8f0;padding-top:20px;">
        <h3 style="margin:0 0 12px 0;font-size:14px;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">Daily Activity Breakdown</h3>
        <table width="100%" style="border-collapse:collapse;font-size:12px;text-align:left;">
          <thead>
            <tr style="background:#f1f5f9;color:#475569;">
              <th style="padding:8px 10px;border-radius:4px 0 0 4px;">Date</th>
              <th style="padding:8px 10px;">Visitors</th>
              <th style="padding:8px 10px;">Bookings</th>
              <th style="padding:8px 10px;border-radius:0 4px 4px 0;">Total Leads</th>
            </tr>
          </thead>
          <tbody>
            ${m.dailyBreakdown.map(
    (d) => `
              <tr style="border-bottom:1px solid #f1f5f9;">
                <td style="padding:8px 10px;font-weight:600;color:#0f172a;">${d.date}</td>
                <td style="padding:8px 10px;color:#64748b;">${d.visitors}</td>
                <td style="padding:8px 10px;font-weight:600;color:#047857;">${d.bookings}</td>
                <td style="padding:8px 10px;font-weight:600;color:#c2410c;">${d.leads}</td>
              </tr>
            `
  ).join("")}
          </tbody>
        </table>
      </div>` : "";
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${generateSubject(period, isTest)}</title>
</head>
<body style="margin:0;padding:24px;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 4px 16px rgba(0,0,0,0.04);">
    
    <!-- Header -->
    <div style="background:${themeGradient};padding:32px 28px;color:#ffffff;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
        <span style="background:${badgeBg};color:#ffffff;border:1px solid rgba(255,255,255,0.3);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;">
          ${period.type.toUpperCase()} INTELLIGENCE
        </span>
        ${isTest ? '<span style="background:#fef08a;color:#854d0e;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:bold;">MANUAL TEST EXECUTION</span>' : ""}
      </div>
      <h1 style="margin:14px 0 4px 0;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">${typeTitle}</h1>
      <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.9);">${period.label}</p>
    </div>

    <!-- Metadata Bar -->
    <div style="background:#f1f5f9;padding:12px 28px;display:flex;justify-content:space-between;font-size:12px;color:#475569;border-bottom:1px solid #e2e8f0;">
      <span>Generated: <strong>${period.generatedAt}</strong></span>
      <span>Source: <strong>${m.dataSource === "google_apps_script" ? "Google Sheets (Live)" : m.dataSource === "airtable" ? "Airtable CRM" : "ApnaCare System"}</strong></span>
    </div>

    <!-- Empty activity alert if zero records -->
    ${isEmpty ? '<div style="background:#f8fafc;border-left:4px solid #94a3b8;padding:12px 28px;font-size:12px;color:#64748b;margin-top:12px;">\u2139\uFE0F No activity recorded for this period window.</div>' : ""}

    <!-- KPI Grid (4 Metrics) -->
    <div style="padding:24px 28px 12px 28px;">
      <table width="100%" style="border-collapse:separate;border-spacing:8px;margin-bottom:8px;">
        <tr>
          <!-- Total Leads -->
          <td width="25%" style="background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;padding:14px 10px;text-align:center;">
            <div style="font-size:10px;font-weight:700;color:#9a3412;letter-spacing:0.5px;">TOTAL LEADS</div>
            <div style="font-size:24px;font-weight:800;color:#c2410c;margin:4px 0;">${m.totalLeads ?? 0}</div>
            ${leadsCompHtml}
          </td>
          <!-- 6-Step Bookings -->
          <td width="25%" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:14px 10px;text-align:center;">
            <div style="font-size:10px;font-weight:700;color:#166534;letter-spacing:0.5px;">BOOKINGS</div>
            <div style="font-size:24px;font-weight:800;color:#047857;margin:4px 0;">${m.bookings ?? 0}</div>
            ${bookingsCompHtml}
          </td>
          <!-- Visitors -->
          <td width="25%" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px 10px;text-align:center;">
            <div style="font-size:10px;font-weight:700;color:#475569;letter-spacing:0.5px;">VISITORS</div>
            <div style="font-size:24px;font-weight:800;color:#0f172a;margin:4px 0;">${m.uniqueVisitors ?? 0}</div>
            ${visitorsCompHtml}
          </td>
          <!-- Conversion Rate -->
          <td width="25%" style="background:#fefce8;border:1px solid #fef08a;border-radius:12px;padding:14px 10px;text-align:center;">
            <div style="font-size:10px;font-weight:700;color:#854d0e;letter-spacing:0.5px;">CONVERSION</div>
            <div style="font-size:24px;font-weight:800;color:#b45309;margin:4px 0;">${m.conversionRate ?? "0.00%"}</div>
            <div style="font-size:10px;color:#a16207;">Lead/Visitor</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Detailed Lead Streams Table -->
    <div style="padding:0 28px 24px 28px;">
      <h3 style="margin:12px 0 10px 0;font-size:14px;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">Channel & Service Breakdown</h3>
      <table width="100%" style="border-collapse:collapse;font-size:13px;">
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">\u2B50 6-Step Verified Bookings:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#047857;">${m.bookings ?? 0}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">\u{1F4DE} Quick Callback Requests:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${m.callbacks ?? 0}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">\u{1F469}\u200D\u2695\uFE0F Caregiver / Nurse Applications:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${m.attendantApplications ?? 0}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">\u{1F4AC} Chatbot / AI Assistant Conversations:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${m.chatbots ?? 0}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">\u{1F3A5} YouTube Inquiries:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${youtubeLeads}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">\u{1F4BC} LinkedIn Leads:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${linkedinLeads}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">\u{1F91D} Ecosystem Partners:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${m.partners ?? 0}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">\u2709\uFE0F Contact Desk Submissions:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${m.contacts ?? 0}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">\u{1F6A8} 24/7 SOS Emergency Alerts:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#dc2626;">${sosAlerts}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#475569;">\u{1F4C8} Total Telemetry Events Logged:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#64748b;">${totalEvents}</td>
        </tr>
      </table>

      ${dailyBreakdownHtml}

      <!-- CTA Button -->
      <div style="margin-top:28px;text-align:center;">
        <a href="https://apna-care.vercel.app/" target="_blank" style="background:#047857;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:700;font-size:14px;display:inline-block;letter-spacing:0.3px;">
          Open ApnaCare Portal &rarr;
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f8fafc;padding:20px 28px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;text-align:center;">
      <p style="margin:0 0 4px 0;">This report was generated and dispatched automatically by <strong>Vercel Serverless Intelligence</strong> via Nodemailer SMTP.</p>
      <p style="margin:0;">ApnaCare Health & Mobility Support Services Pvt. Ltd. \xB7 24/7 Command Operations</p>
    </div>

  </div>
 </body>
 </html>
 `;
}
function renderTrendBadge(comp) {
  if (!comp) return '<div style="font-size:10px;color:#94a3b8;">vs prior: N/A</div>';
  const isUp = comp.trend === "up";
  const isDown = comp.trend === "down";
  const color = isUp ? "#16a34a" : isDown ? "#dc2626" : "#64748b";
  const arrow = isUp ? "\u25B2" : isDown ? "\u25BC" : "\u2022";
  const sign = comp.changePercent > 0 ? "+" : "";
  return `<div style="font-size:10px;font-weight:700;color:${color};">${arrow} ${sign}${comp.changePercent}%</div>`;
}
function generateText(period, m, isTest) {
  const prefix = isTest ? "[MANUAL TEST] " : "";
  const youtubeLeads = m.youtubeLeads ?? 0;
  const linkedinLeads = m.linkedinLeads ?? 0;
  const sosAlerts = m.sosAlerts ?? 0;
  const totalEvents = m.totalEvents ?? 0;
  return `
${prefix}APNACARE ${period.type.toUpperCase()} INTELLIGENCE REPORT
==================================================
Period: ${period.label}
Generated: ${period.generatedAt}
Data Source: ${m.dataSource}

KEY METRICS:
--------------------------------------------------
* Total Inbound Leads: ${m.totalLeads ?? 0}
* 6-Step Care Bookings: ${m.bookings ?? 0}
* Unique Website Visitors: ${m.uniqueVisitors ?? 0}
* Page Views: ${m.pageViews ?? 0}
* Visitor-to-Lead Conversion Rate: ${m.conversionRate ?? "0.00%"}

CHANNEL BREAKDOWN:
--------------------------------------------------
* 6-Step Verified Bookings: ${m.bookings ?? 0}
* Quick Callback Requests: ${m.callbacks ?? 0}
* Caregiver / Nurse Applications: ${m.attendantApplications ?? 0}
* Chatbot Conversations: ${m.chatbots ?? 0}
* YouTube Inquiries: ${youtubeLeads}
* LinkedIn Leads: ${linkedinLeads}
* Ecosystem Partners: ${m.partners ?? 0}
* Contact Desk Messages: ${m.contacts ?? 0}
* 24/7 SOS Emergency Alerts: ${sosAlerts}
* Total Telemetry Events Logged: ${totalEvents}

Open ApnaCare Portal: https://apna-care.vercel.app/

--
Generated automatically by Vercel Serverless Reporting via Nodemailer SMTP.
ApnaCare Operations Desk
`.trim();
}

// src/server/reports/resend-client.ts
import { Resend } from "resend";
async function sendReportEmail(rendered, config) {
  const startMs = Date.now();
  if (!config.resendApiKey) {
    const errorMsg = "RESEND_API_KEY environment variable is not configured on the server. Please add RESEND_API_KEY in your Vercel Project Settings.";
    console.error(`[Resend] Delivery aborted: ${errorMsg}`);
    return {
      success: false,
      provider: "resend",
      recipients: config.toEmails,
      latencyMs: Date.now() - startMs,
      error: errorMsg
    };
  }
  const validRecipients = config.toEmails.filter((email) => isValidEmail(email));
  if (validRecipients.length === 0) {
    const errorMsg = "No valid recipient email addresses found in REPORT_TO_EMAILS.";
    console.error(`[Resend] Delivery aborted: ${errorMsg}`);
    return {
      success: false,
      provider: "resend",
      recipients: [],
      latencyMs: Date.now() - startMs,
      error: errorMsg
    };
  }
  try {
    const resend = new Resend(config.resendApiKey);
    const payload = {
      from: config.fromEmail,
      to: validRecipients,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text
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
        error: error.message || JSON.stringify(error)
      };
    }
    const messageId = data?.id || "resend-msg-ok";
    console.log(`[Resend] Successfully delivered in ${latencyMs}ms. Message ID: ${messageId}`);
    return {
      success: true,
      messageId,
      provider: "resend",
      recipients: validRecipients,
      latencyMs
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
      error: errorMsg
    };
  }
}

// src/server/reports/nodemailer-client.ts
import nodemailer from "nodemailer";
async function sendReportEmailViaNodemailer(email, config) {
  const startMs = Date.now();
  const recipients = config.toEmails;
  if (recipients.length === 0) {
    return {
      success: false,
      provider: "nodemailer",
      recipients: [],
      latencyMs: 0,
      error: "No valid recipient email addresses configured in REPORT_TO_EMAILS."
    };
  }
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
      warning: "Simulated delivery: Configure SMTP_PASS with your Google App Password or SMTP credentials in production."
    };
  }
  if (!config.smtpPass) {
    return {
      success: false,
      provider: "nodemailer",
      recipients,
      latencyMs: 0,
      error: "SMTP_PASS is not configured in Vercel environment variables. For Gmail, generate a 16-character Google App Password."
    };
  }
  try {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpSecure,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass.replace(/\s+/g, "")
        // strip any spaces often copied in Google App Passwords
      },
      connectionTimeout: 1e4,
      greetingTimeout: 1e4,
      socketTimeout: 15e3
    });
    const info = await transporter.sendMail({
      from: config.fromEmail,
      to: recipients.join(", "),
      subject: email.subject,
      html: email.html,
      text: email.text
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
      latencyMs
    };
  } catch (err) {
    const latencyMs = Date.now() - startMs;
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[Nodemailer] SMTP Delivery Error:", errorMsg);
    let diagnosticHint = "";
    if (errorMsg.includes("Invalid login") || errorMsg.includes("535")) {
      diagnosticHint = " (Tip: If using Gmail, make sure 2-Step Verification is enabled and use a 16-character App Password, not your regular Google login password).";
    }
    return {
      success: false,
      provider: "nodemailer",
      recipients,
      latencyMs,
      error: `${errorMsg}${diagnosticHint}`
    };
  }
}

// src/server/reports/idempotency.ts
var localDeliveryCache = /* @__PURE__ */ new Map();
async function checkReportDelivery(reportType, periodKey, config) {
  const cacheKey = `${reportType}:${periodKey}`;
  const cached = localDeliveryCache.get(cacheKey);
  if (cached && cached.status === "DELIVERED") {
    return cached;
  }
  if (!config.googleAppsScriptUrl) {
    return null;
  }
  try {
    const url = new URL(config.googleAppsScriptUrl);
    url.searchParams.set("action", "check_report_delivery");
    url.searchParams.set("report_type", reportType);
    url.searchParams.set("period_key", periodKey);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6e3);
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
      redirect: "follow"
    });
    clearTimeout(timeout);
    if (response.ok) {
      const json = await response.json();
      if (json && json.status === "success" && json.delivered && json.record) {
        const record = {
          reportType,
          periodKey,
          status: "DELIVERED",
          timestamp: json.record.timestamp || (/* @__PURE__ */ new Date()).toISOString(),
          messageId: json.record.message_id || "",
          recipients: json.record.recipients || [],
          provider: json.record.provider || "resend"
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
async function recordReportDelivery(record, config) {
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
      error: record.error || ""
    };
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8e3);
    const response = await fetch(config.googleAppsScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      redirect: "follow"
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

// src/server/reports/report-runner.ts
function validateCronAuth(request, config) {
  if (config.cronSecret) {
    if (!request) {
      return { authorized: false, reason: "Request context missing" };
    }
    let authHeader = "";
    let xCronSecret = "";
    if (typeof request.headers?.get === "function") {
      authHeader = request.headers.get("authorization") || "";
      xCronSecret = request.headers.get("x-cron-secret") || "";
    } else if (request.headers && typeof request.headers === "object") {
      authHeader = String(request.headers["authorization"] || "");
      xCronSecret = String(request.headers["x-cron-secret"] || "");
    }
    let querySecret = "";
    if (request.query && typeof request.query === "object") {
      querySecret = String(request.query.secret || "");
    }
    if (!querySecret && request.url) {
      try {
        const url = new URL(request.url, "https://apna-care.vercel.app");
        querySecret = url.searchParams.get("secret") || "";
      } catch {
        querySecret = "";
      }
    }
    const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : authHeader.trim();
    const isMatch = bearerToken && bearerToken === config.cronSecret || xCronSecret && xCronSecret === config.cronSecret || querySecret && querySecret === config.cronSecret;
    if (!isMatch) {
      return {
        authorized: false,
        reason: "Invalid or missing authorization token. Supply Bearer <CRON_SECRET> or ?secret=..."
      };
    }
    return { authorized: true };
  }
  if (!config.isDevelopment) {
    return {
      authorized: false,
      reason: "CRON_SECRET is not configured in Vercel environment variables. All report execution is locked until CRON_SECRET is set."
    };
  }
  return { authorized: true };
}
async function runReport(options) {
  const startMs = Date.now();
  const config = getServerReportConfig();
  const period = calculateReportPeriod(
    options.type,
    config.timezone,
    /* @__PURE__ */ new Date(),
    options.periodKey
  );
  console.log(
    `[ReportRunner] Initiating ${options.type.toUpperCase()} report for period ${period.key} (${period.label}) in ${config.timezone}...`
  );
  const isForced = Boolean(options.force);
  let existingDelivery = null;
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
          record: existingDelivery
        },
        durationMs: Date.now() - startMs
      };
    }
  }
  const metrics = await fetchReportMetrics(period, config);
  const isTest = Boolean(options.isTest);
  const rendered = generateReportEmail(period, metrics, isTest);
  let emailResult;
  try {
    if (config.emailProvider === "resend" && config.resendApiKey) {
      emailResult = await sendReportEmail(rendered, config);
    } else {
      emailResult = await sendReportEmailViaNodemailer(rendered, config);
    }
  } catch (err) {
    emailResult = {
      success: false,
      provider: config.emailProvider === "resend" ? "resend" : "nodemailer",
      recipients: config.toEmails,
      latencyMs: 0,
      error: err instanceof Error ? err.message : String(err)
    };
  }
  if (emailResult.success) {
    const deliveryRecord = {
      reportType: options.type,
      periodKey: period.key,
      status: "DELIVERED",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      messageId: emailResult.messageId,
      recipients: emailResult.recipients,
      provider: emailResult.provider
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
      forced: isForced
    },
    metrics,
    email: emailResult,
    durationMs,
    error: emailResult.error
  };
}

// src/server/reports/routes/daily-report.ts
var dynamic = "force-dynamic";
async function handler(req, res) {
  const isNode = res && typeof res.status === "function";
  try {
    const config = getServerReportConfig();
    let query = {};
    if (req.query && typeof req.query === "object") {
      for (const [k, v] of Object.entries(req.query)) {
        query[k] = Array.isArray(v) ? v[0] : String(v || "");
      }
    } else if (req.url) {
      try {
        const parsed = new URL(req.url, "https://apna-care.vercel.app");
        parsed.searchParams.forEach((val, key) => {
          query[key] = val;
        });
      } catch {
        query = {};
      }
    }
    const authReq = {
      headers: req.headers,
      query,
      url: req.url || "/api/cron/daily-report"
    };
    const auth = validateCronAuth(authReq, config);
    if (!auth.authorized) {
      const errPayload = {
        status: "error",
        code: "UNAUTHORIZED",
        message: auth.reason || "Unauthorized"
      };
      if (isNode) return res.status(401).json(errPayload);
      return new Response(JSON.stringify(errPayload), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const force = query.force === "true";
    const period = query.period || void 0;
    const isTest = query.test === "true";
    const result = await runReport({
      type: "daily",
      force,
      periodKey: period,
      isTest
    });
    const statusCode = result.success ? 200 : result.email?.error ? 502 : 500;
    if (isNode) return res.status(statusCode).json(result);
    return new Response(JSON.stringify(result), {
      status: statusCode,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[DailyReportCron] Unhandled error:", err);
    const errPayload = {
      status: "error",
      code: "INTERNAL_ERROR",
      message: errorMsg
    };
    if (isNode) return res.status(500).json(errPayload);
    return new Response(JSON.stringify(errPayload), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
async function GET(req, res) {
  return handler(req, res);
}
export {
  GET,
  handler as default,
  dynamic
};
