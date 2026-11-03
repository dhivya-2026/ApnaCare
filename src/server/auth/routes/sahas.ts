/**
 * Saha Portal API routes
 * GET/PATCH /api/sahas/profile
 * GET/POST /api/sahas/availability
 * GET /api/sahas/assignments
 * POST /api/sahas/attendance/check-in
 * POST /api/sahas/attendance/check-out
 * GET /api/sahas/attendance/history
 * POST /api/sahas/leave
 */

import { getSessionFromRequest } from "../../session/guard";
import {
  findSahaByUserId, updateSaha,
  findAvailabilityBySahaId, createAvailability,
  findAssignmentsBySahaId,
  findAttendanceBySahaId, createAttendance, updateAttendance,
  findLeaveRequestsBySahaId, createLeaveRequest,
  writeAuditLog,
} from "../sheets-dal";
import { generateId } from "../password";

export const dynamic = "force-dynamic";

function reply(res: any, status: number, data: any): Response | void {
  const payload = JSON.stringify(data);
  if (res && typeof res.status === "function") return res.status(status).json(data);
  if (res && typeof res.end === "function") {
    res.statusCode = status; res.setHeader("Content-Type", "application/json"); return res.end(payload);
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

    // Enforce SAHA or SUPER_ADMIN role
    const userRole = session.metadata?.roleTitle || session.role;
    const isSaha = session.role === "attendant" || userRole === "SAHA";
    const isAdmin = session.role === "admin" || userRole === "SUPER_ADMIN";
    if (!isSaha && !isAdmin) return reply(res, 403, { error: "Saha access required" });

    const rawUrl = req instanceof Request ? new URL(req.url).pathname : String(req.url || "").split("?")[0];
    const method = (req.method || "GET").toUpperCase();
    const now = new Date().toISOString();

    // GET /api/sahas/profile
    if (rawUrl.endsWith("/profile") && method === "GET") {
      const saha = await findSahaByUserId(session.userId);
      if (!saha) return reply(res, 404, { error: "Saha profile not found" });
      return reply(res, 200, { profile: saha });
    }

    // PATCH /api/sahas/profile
    if (rawUrl.endsWith("/profile") && method === "PATCH") {
      const body = await parseBody(req);
      const saha = await findSahaByUserId(session.userId);
      if (!saha) return reply(res, 404, { error: "Saha profile not found" });
      const allowed = ["full_name", "city", "service_areas", "experience_years", "education", "capabilities", "languages"];
      const updates: Record<string, string> = { updated_at: now };
      for (const f of allowed) { if (body[f] !== undefined) updates[f] = String(body[f]); }
      await updateSaha(saha.saha_id, updates);
      return reply(res, 200, { success: true });
    }

    // GET /api/sahas/availability
    if (rawUrl.endsWith("/availability") && method === "GET") {
      const saha = await findSahaByUserId(session.userId);
      if (!saha) return reply(res, 404, { error: "Saha profile not found" });
      const availability = await findAvailabilityBySahaId(saha.saha_id);
      return reply(res, 200, { availability });
    }

    // POST /api/sahas/availability
    if (rawUrl.endsWith("/availability") && method === "POST") {
      const body = await parseBody(req);
      const saha = await findSahaByUserId(session.userId);
      if (!saha) return reply(res, 404, { error: "Saha profile not found" });
      await createAvailability({
        availability_id: generateId("AVL"),
        saha_id: saha.saha_id,
        date: String(body.date || ""),
        day_of_week: String(body.day_of_week || ""),
        start_time: String(body.start_time || ""),
        end_time: String(body.end_time || ""),
        availability_status: String(body.availability_status || "available"),
        location: String(body.location || saha.city),
        created_at: now,
        updated_at: now,
      });
      return reply(res, 201, { success: true });
    }

    // GET /api/sahas/assignments
    if (rawUrl.endsWith("/assignments") && method === "GET") {
      const saha = await findSahaByUserId(session.userId);
      if (!saha) return reply(res, 404, { error: "Saha profile not found" });
      const assignments = await findAssignmentsBySahaId(saha.saha_id);
      return reply(res, 200, { assignments });
    }

    // POST /api/sahas/attendance/check-in
    if (rawUrl.endsWith("/check-in") && method === "POST") {
      const body = await parseBody(req);
      const saha = await findSahaByUserId(session.userId);
      if (!saha) return reply(res, 404, { error: "Saha profile not found" });

      // Prevent duplicate check-in for same assignment today
      const today = now.split("T")[0];
      const existing = await findAttendanceBySahaId(saha.saha_id);
      const todayRecord = existing.find(
        (r) => r.attendance_date === today && r.booking_id === body.booking_id && r.check_in_time && !r.check_out_time
      );
      if (todayRecord) return reply(res, 409, { error: "Already checked in for this assignment." });

      const attendanceId = generateId("ATT");
      await createAttendance({
        attendance_id: attendanceId,
        assignment_id: String(body.assignment_id || ""),
        booking_id: String(body.booking_id || ""),
        saha_id: saha.saha_id,
        attendance_date: today,
        scheduled_start: String(body.scheduled_start || ""),
        scheduled_end: String(body.scheduled_end || ""),
        check_in_time: now,
        check_out_time: "",
        check_in_latitude: String(body.latitude || ""),
        check_in_longitude: String(body.longitude || ""),
        check_out_latitude: "",
        check_out_longitude: "",
        location_verification_status: body.latitude ? "not_checked" : "gps_failed",
        attendance_status: "present",
        exception_notes: "",
        corrected_by: "",
        original_check_in: "",
        original_check_out: "",
        created_at: now,
        updated_at: now,
      });

      return reply(res, 201, { success: true, attendance_id: attendanceId, check_in_time: now });
    }

    // POST /api/sahas/attendance/check-out
    if (rawUrl.endsWith("/check-out") && method === "POST") {
      const body = await parseBody(req);
      const saha = await findSahaByUserId(session.userId);
      if (!saha) return reply(res, 404, { error: "Saha profile not found" });

      const { attendance_id } = body;
      if (!attendance_id) return reply(res, 400, { error: "attendance_id required" });

      await updateAttendance(attendance_id, {
        check_out_time: now,
        check_out_latitude: String(body.latitude || ""),
        check_out_longitude: String(body.longitude || ""),
        updated_at: now,
      });
      return reply(res, 200, { success: true, check_out_time: now });
    }

    // GET /api/sahas/attendance/history
    if (rawUrl.includes("/attendance") && method === "GET") {
      const saha = await findSahaByUserId(session.userId);
      if (!saha) return reply(res, 404, { error: "Saha profile not found" });
      const history = await findAttendanceBySahaId(saha.saha_id);
      return reply(res, 200, { attendance: history });
    }

    // POST /api/sahas/leave
    if (rawUrl.endsWith("/leave") && method === "POST") {
      const body = await parseBody(req);
      const saha = await findSahaByUserId(session.userId);
      if (!saha) return reply(res, 404, { error: "Saha profile not found" });
      await createLeaveRequest({
        leave_id: generateId("LVE"),
        saha_id: saha.saha_id,
        start_date: String(body.start_date || ""),
        end_date: String(body.end_date || ""),
        leave_reason: String(body.leave_reason || ""),
        approval_status: "pending",
        reviewed_by: "",
        reviewed_at: "",
        created_at: now,
      });
      return reply(res, 201, { success: true, message: "Leave request submitted." });
    }

    return reply(res, 405, { error: "Method Not Allowed" });
  } catch (err) {
    console.error("[sahas] Error:", err);
    return reply(res, 500, { error: "Server error" });
  }
}

