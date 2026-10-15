import { runReport, validateCronAuth } from "../_lib/reports/report-runner";
import { getServerReportConfig } from "../_lib/reports/config";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const config = getServerReportConfig();
  const auth = validateCronAuth(request, config);

  if (!auth.authorized) {
    return new Response(
      JSON.stringify({
        status: "error",
        code: "UNAUTHORIZED",
        message: auth.reason || "Unauthorized",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const url = new URL(request.url);
    const force = url.searchParams.get("force") === "true";
    const period = url.searchParams.get("period") || undefined;
    const isTest = url.searchParams.get("test") === "true";

    const result = await runReport({
      type: "daily",
      force,
      periodKey: period,
      isTest,
      request,
    });

    const statusCode = result.success ? 200 : result.email?.error ? 502 : 500;

    return new Response(JSON.stringify(result), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[DailyReportCron] Unhandled error:", err);
    return new Response(
      JSON.stringify({
        status: "error",
        code: "INTERNAL_ERROR",
        message: msg,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export default async function handler(request: Request) {
  return GET(request);
}
