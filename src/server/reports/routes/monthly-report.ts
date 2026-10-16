import { runReport, validateCronAuth } from "../report-runner";
import { getServerReportConfig } from "../config";

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

export default async function handler(req: any, res?: any) {
  try {
    const config = getServerReportConfig();

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

    const authReq = {
      headers: req.headers,
      query,
      url: req.url || "/api/cron/monthly-report",
    };

    const auth = validateCronAuth(authReq, config);
    if (!auth.authorized) {
      return reply(res, 401, {
        status: "error",
        code: "UNAUTHORIZED",
        message: auth.reason || "Unauthorized",
      });
    }

    const force = query.force === "true";
    const period = query.period || undefined;
    const isTest = query.test === "true";

    const result = await runReport({
      type: "monthly",
      force,
      periodKey: period,
      isTest,
    });

    const statusCode = 200;
    return reply(res, statusCode, result);
  } catch (err: any) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[MonthlyReportCron] Unhandled error:", err);
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
