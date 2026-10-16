import { runReport, validateCronAuth } from "../_lib/reports/report-runner";
import { getServerReportConfig } from "../_lib/reports/config";
import { ReportType } from "../_lib/reports/types";
import { toStandardRequest, sendNodeResponse } from "../_lib/reports/adapter";

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

export default async function handler(req: any, res?: any) {
  const request = await toStandardRequest(req);
  const response = request.method === "POST" ? await POST(request) : await GET(request);
  if (res && typeof res.status === "function") {
    return await sendNodeResponse(res, response);
  }
  return response;
}
