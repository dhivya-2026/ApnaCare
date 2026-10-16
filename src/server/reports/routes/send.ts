import { runReport, validateCronAuth } from "../report-runner";
import { getServerReportConfig } from "../config";
import { ReportType } from "../types";

export const dynamic = "force-dynamic";

function reply(res: any, statusCode: number, data: any) {
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
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Universal Handler supporting both Node.js (req, res) on Vercel
 * and Web Standard Request -> Response.
 */
export default async function handler(req: any, res?: any) {
  try {
    const config = getServerReportConfig();

    // 1. Determine HTTP method
    const method = (req.method || (req instanceof Request ? req.method : "GET")).toUpperCase();

    // 2. Parse Query / URL parameters safely
    let query: Record<string, string> = {};
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

    // 3. Parse Body (if POST)
    let body: any = {};
    if (method === "POST") {
      if (req.body && typeof req.body === "object") {
        body = req.body;
      } else if (typeof req.body === "string") {
        try {
          body = JSON.parse(req.body);
        } catch {
          body = {};
        }
      } else if (typeof req.json === "function") {
        try {
          body = await req.json();
        } catch {
          body = {};
        }
      }
    }

    // 4. Validate Authorization
    // Allow secret in body if not in query or header
    if (body.secret && !query.secret) {
      query.secret = body.secret;
    }
    const authReq = {
      headers: req.headers,
      query,
      url: req.url || "/api/reports/send",
    };

    const auth = validateCronAuth(authReq, config);
    if (!auth.authorized) {
      return reply(res, 401, {
        status: "error",
        code: "UNAUTHORIZED",
        message: auth.reason || "Unauthorized. Supply Bearer <CRON_SECRET> or ?secret=...",
      });
    }

    // 5. Determine Report Parameters
    const rawType = body.type || query.type || "daily";
    const type: ReportType =
      rawType === "weekly" || rawType === "monthly" ? rawType : "daily";

    const period = body.period || query.period || undefined;
    const force =
      body.force !== undefined
        ? Boolean(body.force)
        : query.force === "true";
    const isTest =
      body.isTest !== undefined
        ? Boolean(body.isTest)
        : query.test !== "false"; // Defaults to true for safety

    // 6. Execute Report
    const result = await runReport({
      type,
      periodKey: period,
      force,
      isTest,
    });

    const statusCode = result.success ? 200 : result.email?.error ? 502 : 500;
    return reply(res, statusCode, result);
  } catch (err: any) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[ReportsSend] Unhandled error:", err);
    return reply(res, 500, {
      status: "error",
      code: "INTERNAL_ERROR",
      message: errorMsg,
    });
  }
}

export async function GET(req: any, res?: any) {
  return handler(req, res);
}

export async function POST(req: any, res?: any) {
  return handler(req, res);
}
