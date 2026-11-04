import registerHandler from "./routes/register";
import loginV2Handler from "./routes/login-v2";
import meHandler from "./routes/me";
import legacyLoginHandler from "../session/routes/login";
import legacySessionHandler from "../session/routes/session";
import legacyLogoutHandler from "../session/routes/logout";
import { reply } from "./utils";

export default async function handler(req: any, res?: any) {
  try {
    const rawUrl = req.url || "";
    const parsed = new URL(rawUrl, "http://localhost");
    const segments = parsed.pathname.split("/").filter(Boolean);
    const action = req.query?.action || segments[segments.length - 1] || "";

    if (action === "register") {
      return await registerHandler(req, res);
    }
    if (action === "login-v2") {
      return await loginV2Handler(req, res);
    }
    if (action === "me") {
      return await meHandler(req, res);
    }
    if (action === "login") {
      return await legacyLoginHandler(req, res);
    }
    if (action === "session") {
      return await legacySessionHandler(req, res);
    }
    if (action === "logout") {
      return await legacyLogoutHandler(req, res);
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
