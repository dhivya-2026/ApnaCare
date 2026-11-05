import registerHandler from "./routes/register";
import loginV2Handler from "./routes/login-v2";
import meHandler from "./routes/me";
import { buildClearCookieHeader } from "./simple-session";
import { reply } from "./utils";

export default async function handler(req: any, res?: any) {
  try {
    const rawUrl = req.url || (req instanceof Request ? req.url : "");
    const parsed = new URL(rawUrl || "http://localhost", "http://localhost");
    const segments = parsed.pathname.split("/").filter(Boolean);
    const action = req.query?.action || segments[segments.length - 1] || "";

    if (action === "register") {
      return await registerHandler(req, res);
    }

    if (action === "login-v2" || action === "login") {
      return await loginV2Handler(req, res);
    }

    if (action === "me" || action === "session") {
      return await meHandler(req, res);
    }

    if (action === "logout") {
      const clearCookie = buildClearCookieHeader();
      return reply(
        res,
        200,
        { success: true, message: "Logged out successfully" },
        { "Set-Cookie": clearCookie }
      );
    }

    return reply(res, 404, { error: `Auth endpoint not found: ${action}` });
  } catch (error) {
    console.error("[AuthDispatcher] Error:", error);
    return reply(res, 500, { error: "Internal server error" });
  }
}

export async function GET(req: any, res?: any) {
  return handler(req, res);
}

export async function POST(req: any, res?: any) {
  return handler(req, res);
}

export async function PUT(req: any, res?: any) {
  return handler(req, res);
}

export async function PATCH(req: any, res?: any) {
  return handler(req, res);
}

export async function DELETE(req: any, res?: any) {
  return handler(req, res);
}
