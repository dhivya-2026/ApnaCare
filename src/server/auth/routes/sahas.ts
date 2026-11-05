import { requireAuth } from "../../session/guard";
import {
  getSahaByUserId,
  createSaha,
  updateSaha,
  updateUser,
  getBookingsBySahaId,
  createAttendance,
  getAttendanceBySahaId,
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
  let saha = await getSahaByUserId(userId);
  if (!saha) {
    saha = await createSaha({
      userId,
      fullName: metadata?.name || "Care Saha",
      email: auth.session.userId,
      phone: metadata?.mobile || "",
      city: metadata?.city || "Bengaluru",
      approvalStatus: "APPROVED",
      serviceCapabilities: [],
      languagesSpoken: ["English", "Hindi"],
    });
  }

  try {
    // -----------------------------------------
    // GET / PATCH Profile
    // -----------------------------------------
    if (action === "profile" || url.pathname.endsWith("/profile")) {
      if (method === "GET") {
        return reply(res, 200, { saha });
      }

      if (method === "PATCH" || method === "PUT" || method === "POST") {
        const body = await parseBody(req);
        const updates: Record<string, any> = {};

        if (body.availability !== undefined) {
          updates.availability = typeof body.availability === "object" ? JSON.stringify(body.availability) : body.availability;
        }
        if (body.serviceCapabilities !== undefined) updates.serviceCapabilities = body.serviceCapabilities;
        if (body.languagesSpoken !== undefined) updates.languagesSpoken = body.languagesSpoken;
        if (body.city !== undefined) updates.city = body.city;

        await updateSaha(saha.sahaId, updates);
        if (body.city) {
          await updateUser(userId, { city: body.city });
        }

        return reply(res, 200, { success: true, message: "Profile updated" });
      }
    }

    // -----------------------------------------
    // GET Assignments
    // -----------------------------------------
    if (action === "assignments" || url.pathname.endsWith("/assignments")) {
      const bookings = await getBookingsBySahaId(saha.sahaId);
      return reply(res, 200, { assignments: bookings });
    }

    // -----------------------------------------
    // POST check-in
    // -----------------------------------------
    if (action === "check-in" || url.pathname.endsWith("/check-in")) {
      const body = await parseBody(req);
      const now = new Date();
      const today = now.toISOString().split("T")[0];

      const record = await createAttendance({
        sahaId: saha.sahaId,
        bookingId: body.bookingId || "GENERAL",
        date: today,
        checkInTime: now.toISOString(),
        checkInLat: body.lat ? Number(body.lat) : undefined,
        checkInLng: body.lng ? Number(body.lng) : undefined,
        status: "PRESENT",
      });

      return reply(res, 201, { success: true, message: "Check-in successful", record });
    }

    // -----------------------------------------
    // POST check-out
    // -----------------------------------------
    if (action === "check-out" || url.pathname.endsWith("/check-out")) {
      const body = await parseBody(req);
      const now = new Date();
      const today = now.toISOString().split("T")[0];

      const existingRecords = await getAttendanceBySahaId(saha.sahaId);
      const todayRecord = existingRecords.find((r) => r.date === today && !r.checkOutTime);

      if (todayRecord) {
        todayRecord.checkOutTime = now.toISOString();
        todayRecord.checkOutLat = body.lat ? Number(body.lat) : undefined;
        todayRecord.checkOutLng = body.lng ? Number(body.lng) : undefined;
        return reply(res, 200, { success: true, message: "Check-out successful", record: todayRecord });
      }

      const record = await createAttendance({
        sahaId: saha.sahaId,
        bookingId: body.bookingId || "GENERAL",
        date: today,
        checkInTime: now.toISOString(),
        checkOutTime: now.toISOString(),
        checkOutLat: body.lat ? Number(body.lat) : undefined,
        checkOutLng: body.lng ? Number(body.lng) : undefined,
        status: "PRESENT",
      });

      return reply(res, 200, { success: true, message: "Check-out recorded", record });
    }

    // -----------------------------------------
    // GET attendance history
    // -----------------------------------------
    if (action === "history" || url.pathname.endsWith("/history")) {
      const history = await getAttendanceBySahaId(saha.sahaId);
      return reply(res, 200, { attendance: history });
    }

    // -----------------------------------------
    // POST leave
    // -----------------------------------------
    if (action === "leave" || url.pathname.endsWith("/leave")) {
      const body = await parseBody(req);
      return reply(res, 200, {
        success: true,
        message: "Leave request submitted to coordinator for approval",
        request: {
          sahaId: saha.sahaId,
          startDate: body.startDate,
          endDate: body.endDate,
          reason: body.reason,
          status: "PENDING",
        },
      });
    }

    return reply(res, 404, { error: `Endpoint not found: ${action}` });
  } catch (error) {
    console.error("[SahaAPI] Error:", error);
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
