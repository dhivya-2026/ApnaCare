import { getServerReportConfig } from "../_lib/reports/config";
import { validateCronAuth } from "../_lib/reports/report-runner";
import { toStandardRequest, sendNodeResponse } from "../_lib/reports/adapter";

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

  // Query Google Apps Script for delivery logs
  try {
    if (config.googleAppsScriptUrl) {
      const url = new URL(config.googleAppsScriptUrl);
      url.searchParams.set("action", "get_delivery_history");

      const response = await fetch(url.toString(), {
        headers: { Accept: "application/json" },
        redirect: "follow",
      });

      if (response.ok) {
        const data = await response.json();
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    return new Response(
      JSON.stringify({
        status: "success",
        history: [],
        message: "No delivery logs found or remote sheet not configured.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        status: "error",
        message: err instanceof Error ? err.message : String(err),
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
  const response = await GET(request);
  if (res && typeof res.status === "function") {
    return await sendNodeResponse(res, response);
  }
  return response;
}
