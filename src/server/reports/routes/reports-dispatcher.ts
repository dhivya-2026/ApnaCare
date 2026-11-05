import sendHandler from "./send";
import { GET as historyGet } from "./history";
import { reply } from "../../auth/utils";

export default async function handler(req: any, res?: any) {
  try {
    const rawUrl = req.url || "";
    const parsed = new URL(rawUrl, "http://localhost");
    const segments = parsed.pathname.split("/").filter(Boolean);
    const action = req.query?.action || segments[segments.length - 1] || "";

    if (action === "send") {
      return await sendHandler(req, res);
    }
    if (action === "history") {
      return await historyGet(req, res);
    }

    return reply(res, 404, { error: `Report endpoint not found: ${action}` });
  } catch (error) {
    console.error("[ReportsDispatcher] Error:", error);
    return reply(res, 500, { error: "Internal server error" });
  }
}

export async function GET(req: any, res?: any) {
  return handler(req, res);
}

export async function POST(req: any, res?: any) {
  return handler(req, res);
}

