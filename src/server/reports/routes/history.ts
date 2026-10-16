import { getServerReportConfig } from "../config";
import { validateCronAuth } from "../report-runner";

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
      url: req.url || "/api/reports/history",
    };

    const auth = validateCronAuth(authReq, config);
    if (!auth.authorized) {
      return reply(res, 401, {
        status: "error",
        code: "UNAUTHORIZED",
        message: auth.reason || "Unauthorized",
      });
    }

    // Query Google Apps Script for delivery logs
    if (config.googleAppsScriptUrl) {
      try {
        const url = new URL(config.googleAppsScriptUrl);
        url.searchParams.set("action", "get_delivery_history");

        const response = await fetch(url.toString(), {
          headers: { Accept: "application/json" },
          redirect: "follow",
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
      message: "No delivery logs found or remote sheet not configured.",
    });
  } catch (err: any) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[ReportHistory] Unhandled error:", err);
    return reply(res, 500, {
      status: "error",
      message: errorMsg,
    });
  }
}

export async function GET(req: any, res?: any) {
  return handler(req, res);
}
