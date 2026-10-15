import { MetricComparison, ReportMetrics, ReportPeriod, ReportType } from "./types";

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

export function generateReportEmail(
  period: ReportPeriod,
  metrics: ReportMetrics,
  isTest = false
): RenderedEmail {
  const subject = generateSubject(period, isTest);
  const html = generateHtml(period, metrics, isTest);
  const text = generateText(period, metrics, isTest);

  return { subject, html, text };
}

function generateSubject(period: ReportPeriod, isTest: boolean): string {
  const prefix = isTest ? "[TEST] " : "";
  if (period.type === "daily") {
    return `${prefix}ApnaCare | Daily Report | ${period.key}`;
  }
  if (period.type === "weekly") {
    return `${prefix}ApnaCare | Weekly Report | ${period.key}`;
  }
  return `${prefix}ApnaCare | Monthly Report | ${period.key}`;
}

function generateHtml(period: ReportPeriod, m: ReportMetrics, isTest: boolean): string {
  const typeTitle =
    period.type === "daily"
      ? "Daily Operations Intelligence"
      : period.type === "weekly"
      ? "Weekly Executive Digest"
      : "Monthly Performance Review";

  const themeGradient =
    period.type === "daily"
      ? "linear-gradient(135deg, #047857 0%, #064e3b 100%)"
      : period.type === "weekly"
      ? "linear-gradient(135deg, #0284c7 0%, #0f172a 100%)"
      : "linear-gradient(135deg, #7c3aed 0%, #1e1b4b 100%)";

  const badgeBg =
    period.type === "daily"
      ? "rgba(16, 185, 129, 0.2)"
      : period.type === "weekly"
      ? "rgba(56, 189, 248, 0.2)"
      : "rgba(168, 85, 247, 0.2)";

  // Format comparisons if available
  const leadsCompHtml = renderTrendBadge(m.comparisons?.totalLeads);
  const bookingsCompHtml = renderTrendBadge(m.comparisons?.bookings);
  const visitorsCompHtml = renderTrendBadge(m.comparisons?.visitors);

  const youtubeLeads = m.youtubeLeads ?? 0;
  const linkedinLeads = m.linkedinLeads ?? 0;
  const sosAlerts = m.sosAlerts ?? 0;
  const totalEvents = m.totalEvents ?? 0;

  const isEmpty = (m.totalLeads ?? 0) === 0 && (m.uniqueVisitors ?? 0) === 0;

  // Daily breakdown table for Weekly / Monthly reports
  const dailyBreakdownHtml =
    m.dailyBreakdown && m.dailyBreakdown.length > 0
      ? `
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
            ${m.dailyBreakdown
              .map(
                (d) => `
              <tr style="border-bottom:1px solid #f1f5f9;">
                <td style="padding:8px 10px;font-weight:600;color:#0f172a;">${d.date}</td>
                <td style="padding:8px 10px;color:#64748b;">${d.visitors}</td>
                <td style="padding:8px 10px;font-weight:600;color:#047857;">${d.bookings}</td>
                <td style="padding:8px 10px;font-weight:600;color:#c2410c;">${d.leads}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>`
      : "";

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
        ${
          isTest
            ? '<span style="background:#fef08a;color:#854d0e;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:bold;">MANUAL TEST EXECUTION</span>'
            : ""
        }
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
    ${
      isEmpty
        ? '<div style="background:#f8fafc;border-left:4px solid #94a3b8;padding:12px 28px;font-size:12px;color:#64748b;margin-top:12px;">ℹ️ No activity recorded for this period window.</div>'
        : ""
    }

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
          <td style="padding:10px 0;color:#475569;">⭐ 6-Step Verified Bookings:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#047857;">${m.bookings ?? 0}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">📞 Quick Callback Requests:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${m.callbacks ?? 0}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">👩‍⚕️ Caregiver / Nurse Applications:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${m.attendantApplications ?? 0}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">💬 Chatbot / AI Assistant Conversations:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${m.chatbots ?? 0}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">🎥 YouTube Inquiries:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${youtubeLeads}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">💼 LinkedIn Leads:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${linkedinLeads}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">🤝 Ecosystem Partners:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${m.partners ?? 0}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">✉️ Contact Desk Submissions:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${m.contacts ?? 0}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">🚨 24/7 SOS Emergency Alerts:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#dc2626;">${sosAlerts}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#475569;">📈 Total Telemetry Events Logged:</td>
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
      <p style="margin:0 0 4px 0;">This report was generated and dispatched automatically by <strong>Vercel Serverless Intelligence</strong> via Resend.</p>
      <p style="margin:0;">ApnaCare Health & Mobility Support Services Pvt. Ltd. · 24/7 Command Operations</p>
    </div>

  </div>
 </body>
 </html>
 `;
}

function renderTrendBadge(comp?: MetricComparison): string {
  if (!comp) return '<div style="font-size:10px;color:#94a3b8;">vs prior: N/A</div>';
  const isUp = comp.trend === "up";
  const isDown = comp.trend === "down";
  const color = isUp ? "#16a34a" : isDown ? "#dc2626" : "#64748b";
  const arrow = isUp ? "▲" : isDown ? "▼" : "•";
  const sign = comp.changePercent > 0 ? "+" : "";
  return `<div style="font-size:10px;font-weight:700;color:${color};">${arrow} ${sign}${comp.changePercent}%</div>`;
}

function generateText(period: ReportPeriod, m: ReportMetrics, isTest: boolean): string {
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
Generated automatically by Vercel Serverless Reporting via Resend.
ApnaCare Operations Desk
`.trim();
}
