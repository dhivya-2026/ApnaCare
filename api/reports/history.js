// api/_lib/reports/config.ts
function getServerReportConfig() {
  const env = process.env;
  const smtpHost = env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(env.SMTP_PORT || "465", 10);
  const smtpSecure = env.SMTP_SECURE !== void 0 ? env.SMTP_SECURE === "true" : smtpPort === 465;
  const smtpUser = env.SMTP_USER || "divabhrati.ramco@gmail.com";
  const smtpPass = env.SMTP_PASS || "";
  const resendApiKey = env.RESEND_API_KEY || "";
  const emailProvider = smtpPass && !resendApiKey ? "nodemailer" : "resend";
  const fromEmail = env.REPORT_FROM_EMAIL || "ApnaCare Reports <onboarding@resend.dev>";
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

// api/_lib/reports/report-runner.ts
function validateCronAuth(request, config) {
  if (config.cronSecret) {
    if (!request) {
      return { authorized: false, reason: "Request context missing" };
    }
    const authHeader = request.headers.get("authorization") || "";
    const xCronSecret = request.headers.get("x-cron-secret") || "";
    const url = new URL(request.url);
    const querySecret = url.searchParams.get("secret") || "";
    const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : authHeader.trim();
    const isMatch = bearerToken === config.cronSecret || xCronSecret === config.cronSecret || querySecret === config.cronSecret;
    if (!isMatch) {
      return {
        authorized: false,
        reason: "Invalid or missing authorization token. Supply Bearer <CRON_SECRET>."
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

// api/_lib/reports/adapter.ts
async function toStandardRequest(req) {
  if (typeof Request !== "undefined" && req instanceof Request) {
    return req;
  }
  const protocol = req.headers?.["x-forwarded-proto"] || "https";
  const host = req.headers?.["x-forwarded-host"] || req.headers?.host || "localhost";
  const rawUrl = req.url || "/";
  const url = new URL(rawUrl, `${protocol}://${host}`);
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers || {})) {
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else if (value !== void 0) {
      headers.set(key, String(value));
    }
  }
  const method = (req.method || "GET").toUpperCase();
  let body = void 0;
  if (method !== "GET" && method !== "HEAD") {
    if (typeof req.body === "string" || Buffer.isBuffer(req.body)) {
      body = req.body;
    } else if (req.body && typeof req.body === "object") {
      body = JSON.stringify(req.body);
    }
  }
  return new Request(url.toString(), {
    method,
    headers,
    body
  });
}
async function sendNodeResponse(res, response) {
  if (!res || typeof res.status !== "function") return;
  res.status(response.status);
  response.headers.forEach((val, key) => {
    res.setHeader(key, val);
  });
  const text = await response.text();
  res.end(text);
}

// api/_src/reports/history.ts
var dynamic = "force-dynamic";
async function GET(request) {
  const config = getServerReportConfig();
  const auth = validateCronAuth(request, config);
  if (!auth.authorized) {
    return new Response(
      JSON.stringify({
        status: "error",
        code: "UNAUTHORIZED",
        message: auth.reason || "Unauthorized"
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
  try {
    if (config.googleAppsScriptUrl) {
      const url = new URL(config.googleAppsScriptUrl);
      url.searchParams.set("action", "get_delivery_history");
      const response = await fetch(url.toString(), {
        headers: { Accept: "application/json" },
        redirect: "follow"
      });
      if (response.ok) {
        const data = await response.json();
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }
    }
    return new Response(
      JSON.stringify({
        status: "success",
        history: [],
        message: "No delivery logs found or remote sheet not configured."
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        status: "error",
        message: err instanceof Error ? err.message : String(err)
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
async function handler(req, res) {
  const request = await toStandardRequest(req);
  const response = await GET(request);
  if (res && typeof res.status === "function") {
    return await sendNodeResponse(res, response);
  }
  return response;
}
export {
  GET,
  handler as default,
  dynamic
};
