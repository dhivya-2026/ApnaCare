import { runReport, validateCronAuth } from "../report-runner";
import { getServerReportConfig } from "../config";

export const dynamic = "force-dynamic";

export default async function handler(req: any, res?: any) {
  const isNode = res && typeof res.status === "function";

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
      url: req.url || "/api/cron/weekly-report",
    };

    const auth = validateCronAuth(authReq, config);
    if (!auth.authorized) {
      const errPayload = {
        status: "error",
        code: "UNAUTHORIZED",
        message: auth.reason || "Unauthorized",
      };
      if (isNode) return res.status(401).json(errPayload);
      return new Response(JSON.stringify(errPayload), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const force = query.force === "true";
    const period = query.period || undefined;
    const isTest = query.test === "true";

    const result = await runReport({
      type: "weekly",
      force,
      periodKey: period,
      isTest,
    });

    const statusCode = result.success ? 200 : result.email?.error ? 502 : 500;

    if (isNode) return res.status(statusCode).json(result);
    return new Response(JSON.stringify(result), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[WeeklyReportCron] Unhandled error:", err);
    const errPayload = {
      status: "error",
      code: "INTERNAL_ERROR",
      message: errorMsg,
    };
    if (isNode) return res.status(500).json(errPayload);
    return new Response(JSON.stringify(errPayload), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req: any, res?: any) {
  return handler(req, res);
}
