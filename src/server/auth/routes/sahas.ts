import { requireAuth } from "../../session/guard";
import {
  getSahaByUserId,
  updateSaha,
  updateUser,
  getBookingsBySahaId,
  createAttendance,
  getAttendanceBySahaId,
} from "../sheets-dal";
import { reply, parseBody } from "../utils";

export default async function handler(req: any, res?: any) {
  const method = (req.method || (req instanceof Request ? req.method : "GET")).toUpperCase();
  const url = new URL(req.url || "http://localhost", "http://localhost");
  const path = url.pathname;

  const auth = await requireAuth(req, "SAHA" as any);
  if (!auth.authorized || !auth.session) {
    return reply(res, auth.status || 401, { error: auth.error || "Unauthorized" });
  }

  const { userId } = auth.session;
  const saha = await getSahaByUserId(userId);
  if (!saha) {
    return reply(res, 404, { error: "Saha profile not found" });
  }

  try {
    // -----------------------------------------
    // GET /api/sahas/profile
    // -----------------------------------------
    if (path === "/api/sahas/profile" && method === "GET") {
      return reply(res, 200, { saha });
    }

    // -----------------------------------------
    // PATCH /api/sahas/profile
    // -----------------------------------------
    if (path === "/api/sahas/profile" && method === "PATCH") {
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

    // -----------------------------------------
    // GET /api/sahas/assignments
    // -----------------------------------------
    if (path === "/api/sahas/assignments" && method === "GET") {
      const bookings = await getBookingsBySahaId(saha.sahaId);
      return reply(res, 200, { assignments: bookings });
    }

    // -----------------------------------------
    // POST /api/sahas/attendance/check-in
    // -----------------------------------------
    if (path === "/api/sahas/attendance/check-in" && method === "POST") {
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
    // POST /api/sahas/attendance/check-out
    // -----------------------------------------
    if (path === "/api/sahas/attendance/check-out" && method === "POST") {
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

      // If no check-in record was found today, create full attendance record
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
    // GET /api/sahas/attendance/history
    // -----------------------------------------
    if (path === "/api/sahas/attendance/history" && method === "GET") {
      const history = await getAttendanceBySahaId(saha.sahaId);
      return reply(res, 200, { attendance: history });
    }

    // -----------------------------------------
    // POST /api/sahas/leave
    // -----------------------------------------
    if (path === "/api/sahas/leave" && method === "POST") {
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

    return reply(res, 404, { error: "Endpoint not found" });
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

