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

      // Report & Cron Routes
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

      // Enterprise Operations & Multi-role Authentication Routes
      if (url.pathname === "/api/auth/register") {
        const { default: handler } = await import("./server/auth/routes/register");
        return await handler(request);
      }
      if (url.pathname === "/api/auth/login-v2") {
        const { default: handler } = await import("./server/auth/routes/login-v2");
        return await handler(request);
      }
      if (url.pathname === "/api/auth/me") {
        const { default: handler } = await import("./server/auth/routes/me");
        return await handler(request);
      }
      if (url.pathname.startsWith("/api/customers")) {
        const { default: handler } = await import("./server/auth/routes/customers");
        return await handler(request);
      }
      if (url.pathname.startsWith("/api/sahas")) {
        const { default: handler } = await import("./server/auth/routes/sahas");
        return await handler(request);
      }
      if (url.pathname.startsWith("/api/admin")) {
        const { default: handler } = await import("./server/auth/routes/admin");
        return await handler(request);
      }

      // Session & Login Handlers
      if (url.pathname === "/api/auth/login") {
        const { default: handler } = await import("./server/session/routes/login");
        return await handler(request);
      }
      if (url.pathname === "/api/auth/session") {
        const { default: handler } = await import("./server/session/routes/session");
        return await handler(request);
      }
      if (url.pathname === "/api/auth/logout") {
        const { default: handler } = await import("./server/session/routes/logout");
        return await handler(request);
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
