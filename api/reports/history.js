// src/server/reports/config.ts
function getServerReportConfig() {
  const env = process.env;
  const smtpHost = env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(env.SMTP_PORT || "465", 10);
  const smtpSecure = env.SMTP_SECURE !== void 0 ? env.SMTP_SECURE === "true" : smtpPort === 465;
  const smtpUser = env.SMTP_USER || "ayvihd.06@gmail.com";
  const smtpPass = env.SMTP_PASS || "vtjhedzeriwrdlme";
  const resendApiKey = env.RESEND_API_KEY || "";
  const emailProvider = env.EMAIL_PROVIDER === "resend" ? "resend" : "nodemailer";
  const fromEmail = env.REPORT_FROM_EMAIL || (smtpUser ? `ApnaCare Reports <${smtpUser}>` : "ApnaCare Reports <ayvihd.06@gmail.com>");
  const rawToEmails = env.REPORT_TO_EMAILS || "divabhrati.ramco@gmail.com";
  const toEmails = rawToEmails.split(",").map((e) => e.trim()).filter((e) => isValidEmail(e));
  if (toEmails.length === 0) {
    toEmails.push("divabhrati.ramco@gmail.com");
  }
  const cronSecret = env.CRON_SECRET || "8ea5471904719fdc4bb451a65e2fbe329c6233140f6c1584";
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

// src/server/reports/routes/history.ts
var dynamic = "force-dynamic";
function reply(res, statusCode, data) {
  const payload = JSON.stringify(data);
  if (res && typeof res.status === "function" && typeof res.json === "function") {
    return res.status(statusCode).json(data);
  }
  if (res && typeof res.setHeader === "function" && typeof res.end === "function") {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    return res.end(payload);
  }
  if (res && typeof res.writeHead === "function" && typeof res.end === "function") {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    return res.end(payload);
  }
  return new Response(payload, {
    status: statusCode,
    headers: { "Content-Type": "application/json" }
  });
}
async function handler(req, res) {
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
      url: req.url || "/api/reports/history"
    };
    const auth = validateCronAuth(authReq, config);
    if (!auth.authorized) {
      return reply(res, 401, {
        status: "error",
        code: "UNAUTHORIZED",
        message: auth.reason || "Unauthorized"
      });
    }
    if (config.googleAppsScriptUrl) {
      try {
        const url = new URL(config.googleAppsScriptUrl);
        url.searchParams.set("action", "get_delivery_history");
        const response = await fetch(url.toString(), {
          headers: { Accept: "application/json" },
          redirect: "follow"
        });
        if (response.ok) {
          const data = await response.json();
          return reply(res, 200, data);
        }
      } catch (fetchErr) {
        console.warn("[ReportHistory] Remote fetch failed, returning fallback:", fetchErr);
      }
    }
    return reply(res, 200, {
      status: "success",
      history: [],
      message: "No delivery logs found or remote sheet not configured."
    });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[ReportHistory] Unhandled error:", err);
    return reply(res, 500, {
      status: "error",
      message: errorMsg
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
