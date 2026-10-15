import { runReport, validateCronAuth } from "../../src/server/reports/report-runner";
import { getServerReportConfig } from "../../src/server/reports/config";
import { ReportType } from "../../src/server/reports/types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const config = getServerReportConfig();

  // Try parsing request body
  let body: any = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  // If secret passed in body, allow validation
  let authRequest = request;
  if (body.secret && !request.headers.get("authorization")) {
    const url = new URL(request.url);
    url.searchParams.set("secret", body.secret);
    authRequest = new Request(url.toString(), {
      method: request.method,
      headers: request.headers,
    });
  }

  const auth = validateCronAuth(authRequest, config);
  if (!auth.authorized) {
    return new Response(
      JSON.stringify({
        status: "error",
        code: "UNAUTHORIZED",
        message: auth.reason || "Unauthorized. Supply Bearer <CRON_SECRET> or { secret: '...' } in body.",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const type: ReportType =
    body.type === "weekly" || body.type === "monthly" ? body.type : "daily";

  const period = body.period || undefined;
  const force = body.force !== false; // Default to force=true for manual tests
  const isTest = body.isTest !== false; // Default to isTest=true for manual tests

  try {
    const result = await runReport({
      type,
      periodKey: period,
      force,
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
    console.error("[ReportsSend] Error:", err);
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

// Also support GET for simple browser / curl testing
export async function GET(request: Request) {
  const config = getServerReportConfig();
  const auth = validateCronAuth(request, config);

  if (!auth.authorized) {
    return new Response(
      JSON.stringify({
        status: "error",
        code: "UNAUTHORIZED",
        message: auth.reason || "Unauthorized. Provide ?secret=<CRON_SECRET> or Authorization header.",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const url = new URL(request.url);
  const typeParam = url.searchParams.get("type");
  const type: ReportType =
    typeParam === "weekly" || typeParam === "monthly" ? typeParam : "daily";
  const period = url.searchParams.get("period") || undefined;
  const force = url.searchParams.get("force") === "true";
  const isTest = url.searchParams.get("test") !== "false";

  try {
    const result = await runReport({
      type,
      periodKey: period,
      force,
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
  if (request.method === "POST") return POST(request);
  return GET(request);
}
