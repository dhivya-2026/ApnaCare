/**
 * GET/PATCH /api/customers/profile
 * GET /api/customers/bookings
 */

import { getSessionFromRequest } from "../../session/guard";
import { findCustomerByUserId, updateCustomer, findBookingsByCustomerId } from "../sheets-dal";

export const dynamic = "force-dynamic";

function reply(res: any, status: number, data: any): Response | void {
  const payload = JSON.stringify(data);
  if (res && typeof res.status === "function") return res.status(status).json(data);
  if (res && typeof res.end === "function") {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json");
    return res.end(payload);
  }
  return new Response(payload, { status, headers: { "Content-Type": "application/json" } });
}

async function parseBody(req: any): Promise<any> {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") { try { return JSON.parse(req.body); } catch { return {}; } }
  if (typeof req.json === "function") { try { return await req.json(); } catch { return {}; } }
  return {};
}

export default async function handler(req: any, res?: any) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) return reply(res, 401, { error: "Authentication required" });

    const url = req instanceof Request ? new URL(req.url).pathname : req.url?.split("?")[0] || "";
    const method = (req.method || "GET").toUpperCase();

    // GET /api/customers/bookings
    if (url.endsWith("/bookings")) {
      const customer = await findCustomerByUserId(session.userId);
      if (!customer) return reply(res, 404, { error: "Customer profile not found" });
      const bookings = await findBookingsByCustomerId(customer.customer_id);
      return reply(res, 200, { bookings });
    }

    // GET /api/customers/profile
    if (method === "GET") {
      const customer = await findCustomerByUserId(session.userId);
      if (!customer) return reply(res, 404, { error: "Customer profile not found" });
      return reply(res, 200, { profile: customer });
    }

    // PATCH /api/customers/profile
    if (method === "PATCH") {
      const body = await parseBody(req);
      const customer = await findCustomerByUserId(session.userId);
      if (!customer) return reply(res, 404, { error: "Customer profile not found" });

      const allowedFields = ["full_name", "phone", "alternate_phone", "city", "address", "preferred_language", "notification_preferences"];
      const updates: Record<string, string> = { updated_at: new Date().toISOString() };
      for (const field of allowedFields) {
        if (body[field] !== undefined) updates[field] = String(body[field]);
      }

      await updateCustomer(customer.customer_id, updates);
      return reply(res, 200, { success: true, message: "Profile updated." });
    }

    return reply(res, 405, { error: "Method Not Allowed" });
  } catch (err) {
    console.error("[customers] Error:", err);
    return reply(res, 500, { error: "Server error" });
  }
}

