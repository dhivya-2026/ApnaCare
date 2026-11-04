import { runReport } from "../report-runner";
import { getServerReportConfig } from "../config";
import { reply } from "../../auth/utils";

export default async function handler(req: any, res?: any) {
  try {
    const config = getServerReportConfig();
    const rawUrl = req.url || "";
    const parsed = new URL(rawUrl, "http://localhost");
    const segments = parsed.pathname.split("/").filter(Boolean);
    const lastSeg = req.query?.type || segments[segments.length - 1] || "";

    let reportType: "daily" | "weekly" | "monthly" = "daily";
    if (lastSeg.includes("weekly")) {
      reportType = "weekly";
    } else if (lastSeg.includes("monthly")) {
      reportType = "monthly";
    }

    const force = parsed.searchParams.get("force") === "true";
    const period = parsed.searchParams.get("period") || undefined;
    const isTest = parsed.searchParams.get("test") === "true";

    const result = await runReport({
      type: reportType,
      force,
      periodKey: period,
      isTest,
    });

    return reply(res, 200, result);
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[CronDispatcher] Error:", err);
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
