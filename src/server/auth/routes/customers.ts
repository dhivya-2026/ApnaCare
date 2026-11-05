import { requireAuth } from "../../session/guard";
import {
  getCustomerByUserId,
  createCustomer,
  updateCustomer,
  updateUser,
  getBookingsByCustomerId,
  createBooking,
} from "../sheets-dal";
import { reply, parseBody } from "../utils";

export default async function handler(req: any, res?: any) {
  const method = (req.method || (req instanceof Request ? req.method : "GET")).toUpperCase();
  const rawUrl = req.url || (req instanceof Request ? req.url : "");
  const url = new URL(rawUrl || "http://localhost", "http://localhost");
  const segments = url.pathname.split("/").filter(Boolean);
  const action = req.query?.action || segments[segments.length - 1] || "";

  const auth = await requireAuth(req);
  if (!auth.authorized || !auth.session) {
    return reply(res, auth.status || 401, { error: auth.error || "Unauthorized" });
  }

  const { userId, metadata } = auth.session;
  let customer = await getCustomerByUserId(userId);
  if (!customer) {
    // Graceful fallback: create customer record so dashboard works seamlessly
    customer = await createCustomer({
      userId,
      fullName: metadata?.name || "Customer",
      email: auth.session.userId,
      phone: metadata?.mobile || "",
      city: metadata?.city || "Bengaluru",
      languagePreference: "English",
    });
  }

  try {
    // -----------------------------------------
    // Profile (GET / PATCH)
    // -----------------------------------------
    if (action === "profile" || url.pathname.endsWith("/profile")) {
      if (method === "GET") {
        return reply(res, 200, { customer });
      }

      if (method === "PATCH" || method === "PUT" || method === "POST") {
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
    }

    // -----------------------------------------
    // Bookings (GET / POST)
    // -----------------------------------------
    if (action === "bookings" || url.pathname.endsWith("/bookings")) {
      if (method === "GET") {
        const bookings = await getBookingsByCustomerId(customer.customerId);
        return reply(res, 200, { bookings });
      }

      if (method === "POST") {
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
    }

    return reply(res, 404, { error: `Endpoint not found: ${action}` });
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
