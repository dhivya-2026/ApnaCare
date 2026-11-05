import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      if (url.pathname === "/api/cron/daily-report") {
        const { GET } = await import("./server/reports/routes/daily-report");
        return await GET(request);
      }
      if (url.pathname === "/api/cron/weekly-report") {
        const { GET } = await import("./server/reports/routes/weekly-report");
        return await GET(request);
      }
      if (url.pathname === "/api/cron/monthly-report") {
        const { GET } = await import("./server/reports/routes/monthly-report");
        return await GET(request);
      }
      if (url.pathname === "/api/reports/send") {
        const { default: handler } = await import("./server/reports/routes/send");
        return await handler(request);
      }
      if (url.pathname === "/api/reports/history") {
        const { GET } = await import("./server/reports/routes/history");
        return await GET(request);
      }
      if (url.pathname.startsWith("/api/auth/")) {
        const action = url.pathname.replace(/^\/api\/auth\//, "").split("/")[0];
        const { handleAuthAction } = await import("./server/auth/routes/auth-dispatcher");
        return await handleAuthAction(request, action);
      }
      if (url.pathname.startsWith("/api/user/")) {
        const action = url.pathname.replace(/^\/api\/user\//, "").split("/")[0];
        const { handleUserAction } = await import("./server/auth/routes/user-dispatcher");
        return await handleUserAction(request, action);
      }
      if (url.pathname.startsWith("/api/saha/")) {
        const action = url.pathname.replace(/^\/api\/saha\//, "").split("/")[0];
        const { handleSahaAction } = await import("./server/auth/routes/saha-dispatcher");
        return await handleSahaAction(request, action);
      }
      if (url.pathname.startsWith("/api/admin/")) {
        const action = url.pathname.replace(/^\/api\/admin\//, "").split("/")[0];
        const { handleAdminAction } = await import("./server/auth/routes/admin-dispatcher");
        return await handleAdminAction(request, action);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
