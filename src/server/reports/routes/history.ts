import { getServerReportConfig } from "../config";
import { validateCronAuth } from "../report-runner";

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
      url: req.url || "/api/reports/history",
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
          if (isNode) return res.status(200).json(data);
          return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
      } catch (fetchErr) {
        console.warn("[ReportHistory] Remote fetch failed, returning fallback:", fetchErr);
      }
    }

    const fallback = {
      status: "success",
      history: [],
      message: "No delivery logs found or remote sheet not configured.",
    };

    if (isNode) return res.status(200).json(fallback);
    return new Response(JSON.stringify(fallback), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[ReportHistory] Unhandled error:", err);
    const errPayload = {
      status: "error",
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
