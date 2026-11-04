import { requireAuth } from "../../session/guard";
import {
  getCustomerByUserId,
  updateCustomer,
  updateUser,
  getBookingsByCustomerId,
  createBooking,
} from "../sheets-dal";
import { reply, parseBody } from "../utils";

export default async function handler(req: any, res?: any) {
  const method = (req.method || (req instanceof Request ? req.method : "GET")).toUpperCase();
  const url = new URL(req.url || "http://localhost", "http://localhost");
  const path = url.pathname;

  const auth = await requireAuth(req, "CUSTOMER" as any);
  if (!auth.authorized || !auth.session) {
    return reply(res, auth.status || 401, { error: auth.error || "Unauthorized" });
  }

  const { userId } = auth.session;
  const customer = await getCustomerByUserId(userId);
  if (!customer) {
    return reply(res, 404, { error: "Customer profile not found" });
  }

  try {
    // -----------------------------------------
    // GET /api/customers/profile
    // -----------------------------------------
    if (path === "/api/customers/profile" && method === "GET") {
      return reply(res, 200, { customer });
    }

    // -----------------------------------------
    // PATCH /api/customers/profile
    // -----------------------------------------
    if (path === "/api/customers/profile" && method === "PATCH") {
      const body = await parseBody(req);
      const allowedCustomer = ["fullName", "phone", "city", "languagePreference", "emergencyContact"];
      const updates: Record<string, any> = {};

      for (const key of allowedCustomer) {
        if (body[key] !== undefined) updates[key] = body[key];
      }

      await updateCustomer(customer.customerId, updates);
      if (body.fullName || body.phone || body.city) {
        await updateUser(userId, {
          fullName: body.fullName || customer.fullName,
          phone: body.phone || customer.phone,
          city: body.city || customer.city,
        });
      }

      return reply(res, 200, { success: true, message: "Profile updated successfully" });
    }

    // -----------------------------------------
    // GET /api/customers/bookings
    // -----------------------------------------
    if (path === "/api/customers/bookings" && method === "GET") {
      const bookings = await getBookingsByCustomerId(customer.customerId);
      return reply(res, 200, { bookings });
    }

    // -----------------------------------------
    // POST /api/customers/bookings
    // -----------------------------------------
    if (path === "/api/customers/bookings" && method === "POST") {
      const body = await parseBody(req);
      if (!body.serviceType || !body.recipientName || !body.city || !body.startDate) {
        return reply(res, 400, { error: "Missing required booking fields" });
      }

      const booking = await createBooking({
        customerId: customer.customerId,
        serviceType: body.serviceType,
        recipientName: body.recipientName,
        city: body.city,
        shift: body.shift || "FULL_DAY",
        startDate: body.startDate,
        endDate: body.endDate,
        durationDays: body.durationDays || 1,
        status: "REQUESTED",
        notes: body.notes || "",
        careNeeds: typeof body.careNeeds === "object" ? JSON.stringify(body.careNeeds) : body.careNeeds || "",
        estimatedCost: body.estimatedCost || 0,
      });

      return reply(res, 201, { success: true, booking });
    }

    return reply(res, 404, { error: "Endpoint not found" });
  } catch (error) {
    console.error("[CustomerAPI] Error:", error);
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

