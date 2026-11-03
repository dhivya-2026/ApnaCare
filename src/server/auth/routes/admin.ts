/**
 * Super Admin Portal API
 * All routes require SUPER_ADMIN role.
 *
 * GET  /api/admin/dashboard   — KPI metrics
 * GET  /api/admin/customers   — All customers
 * GET  /api/admin/sahas       — All Sahas (with filters)
 * POST /api/admin/sahas/approve
 * POST /api/admin/sahas/reject
 * GET  /api/admin/bookings    — All bookings
 * PATCH/api/admin/bookings    — Update booking (assign Saha, change status)
 * POST /api/admin/assignments — Create assignment
 * GET  /api/admin/attendance  — Attendance monitoring
 * PATCH/api/admin/attendance  — Correct attendance record
 * GET  /api/admin/matching    — Find matching Sahas for a booking
 */

import { getSessionFromRequest } from "../../session/guard";
import {
  getAllCustomers, getAllSahas, updateSaha,
  getAllBookings, updateBooking,
  getAllAssignments, createAssignment, updateAssignment,
  getAllAttendance, updateAttendance,
  findBookingById, findSahaByUserId,
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

function requireAdmin(session: any): boolean {
  return session.role === "admin" || session.metadata?.roleTitle === "SUPER_ADMIN";
}

export default async function handler(req: any, res?: any) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) return reply(res, 401, { error: "Authentication required" });
    if (!requireAdmin(session)) return reply(res, 403, { error: "Admin access required" });

    const rawUrl = req instanceof Request ? new URL(req.url).pathname : String(req.url || "").split("?")[0];
    const method = (req.method || "GET").toUpperCase();
    const now = new Date().toISOString();

    // ── GET /api/admin/dashboard ──────────────────────────────────────
    if (rawUrl.endsWith("/dashboard") && method === "GET") {
      const [customers, sahas, bookings, assignments, attendance] = await Promise.all([
        getAllCustomers(),
        getAllSahas(),
        getAllBookings(),
        getAllAssignments(),
        getAllAttendance({ attendance_date: now.split("T")[0] }),
      ]);

      const pendingSahas = sahas.filter((s) => s.approval_status === "pending_review");
      const approvedSahas = sahas.filter((s) => s.approval_status === "approved");
      const activeBookings = bookings.filter((b) => ["in_progress", "confirmed", "saha_assigned"].includes(b.booking_status));
      const unassigned = bookings.filter((b) => !b.assigned_saha_id && ["requested", "under_review"].includes(b.booking_status));
      const todayCheckedIn = attendance.filter((a) => a.check_in_time && !a.check_out_time);
      const todayAbsent = attendance.filter((a) => a.attendance_status === "absent");
      const exceptions = attendance.filter((a) => ["late", "out_of_range", "manually_corrected"].includes(a.attendance_status || a.location_verification_status));

      return reply(res, 200, {
        kpi: {
          totalCustomers: customers.length,
          totalSahas: sahas.length,
          pendingSahaApplications: pendingSahas.length,
          approvedSahas: approvedSahas.length,
          activeBookings: activeBookings.length,
          unassignedBookings: unassigned.length,
          todayAttendance: attendance.length,
          todayCheckedIn: todayCheckedIn.length,
          todayAbsent: todayAbsent.length,
          attendanceExceptions: exceptions.length,
          totalBookings: bookings.length,
          activeAssignments: assignments.filter((a) => a.assignment_status === "confirmed").length,
        },
      });
    }

    // ── GET /api/admin/customers ──────────────────────────────────────
    if (rawUrl.endsWith("/customers") && method === "GET") {
      const customers = await getAllCustomers();
      return reply(res, 200, { customers });
    }

    // ── GET /api/admin/sahas ──────────────────────────────────────────
    if (rawUrl.endsWith("/sahas") && method === "GET") {
      const url = req instanceof Request ? new URL(req.url) : { searchParams: new URLSearchParams(String(req.url || "").split("?")[1] || "") };
      const params = url instanceof URL ? url.searchParams : url.searchParams;
      const sahas = await getAllSahas({
        city: params.get("city") || undefined,
        approval_status: params.get("approval_status") || undefined,
        verification_status: params.get("verification_status") || undefined,
      });
      return reply(res, 200, { sahas });
    }

    // ── POST /api/admin/sahas/approve ─────────────────────────────────
    if (rawUrl.endsWith("/sahas/approve") && method === "POST") {
      const body = await parseBody(req);
      const { saha_id } = body;
      if (!saha_id) return reply(res, 400, { error: "saha_id required" });
      await updateSaha(saha_id, {
        approval_status: "approved",
        verification_status: "approved",
        account_status: "active",
        updated_at: now,
      });
      await writeAuditLog({
        log_id: generateId("LOG"),
        actor_user_id: session.userId,
        actor_role: "SUPER_ADMIN",
        action: "APPROVE_SAHA",
        entity_type: "Saha",
        entity_id: saha_id,
        new_value: "approved",
        timestamp: now,
      });
      return reply(res, 200, { success: true, message: "Saha approved." });
    }

    // ── POST /api/admin/sahas/reject ──────────────────────────────────
    if (rawUrl.endsWith("/sahas/reject") && method === "POST") {
      const body = await parseBody(req);
      const { saha_id, reason } = body;
      if (!saha_id) return reply(res, 400, { error: "saha_id required" });
      await updateSaha(saha_id, {
        approval_status: "rejected",
        verification_status: "rejected",
        updated_at: now,
      });
      await writeAuditLog({
        log_id: generateId("LOG"),
        actor_user_id: session.userId,
        actor_role: "SUPER_ADMIN",
        action: "REJECT_SAHA",
        entity_type: "Saha",
        entity_id: saha_id,
        new_value: `rejected: ${reason || ""}`,
        timestamp: now,
      });
      return reply(res, 200, { success: true, message: "Saha rejected." });
    }

    // ── GET /api/admin/bookings ───────────────────────────────────────
    if (rawUrl.endsWith("/bookings") && method === "GET") {
      const url = req instanceof Request ? new URL(req.url) : { searchParams: new URLSearchParams(String(req.url || "").split("?")[1] || "") };
      const params = url instanceof URL ? url.searchParams : url.searchParams;
      const bookings = await getAllBookings({
        city: params.get("city") || undefined,
        booking_status: params.get("booking_status") || undefined,
      });
      return reply(res, 200, { bookings });
    }

    // ── PATCH /api/admin/bookings ─────────────────────────────────────
    if (rawUrl.endsWith("/bookings") && method === "PATCH") {
      const body = await parseBody(req);
      const { booking_id, ...updates } = body;
      if (!booking_id) return reply(res, 400, { error: "booking_id required" });
      const allowed = ["booking_status", "assigned_saha_id", "coordinator_notes", "shift_type", "start_time", "end_time"];
      const safeUpdates: Record<string, string> = { updated_at: now };
      for (const f of allowed) { if (updates[f] !== undefined) safeUpdates[f] = String(updates[f]); }
      await updateBooking(booking_id, safeUpdates);
      await writeAuditLog({
        log_id: generateId("LOG"),
        actor_user_id: session.userId,
        actor_role: "SUPER_ADMIN",
        action: "UPDATE_BOOKING",
        entity_type: "Booking",
        entity_id: booking_id,
        new_value: JSON.stringify(safeUpdates),
        timestamp: now,
      });
      return reply(res, 200, { success: true });
    }

    // ── POST /api/admin/assignments ───────────────────────────────────
    if (rawUrl.endsWith("/assignments") && method === "POST") {
      const body = await parseBody(req);
      const { booking_id, saha_id, scheduled_start, scheduled_end } = body;
      if (!booking_id || !saha_id) return reply(res, 400, { error: "booking_id and saha_id required" });

      const assignmentId = generateId("ASN");
      await createAssignment({
        assignment_id: assignmentId,
        booking_id,
        customer_id: body.customer_id || "",
        saha_id,
        assignment_status: "pending",
        scheduled_start: scheduled_start || "",
        scheduled_end: scheduled_end || "",
        assigned_by: session.userId,
        accepted_at: "",
        confirmed_at: "",
        created_at: now,
        updated_at: now,
      });

      // Update booking status and assigned saha
      await updateBooking(booking_id, {
        assigned_saha_id: saha_id,
        booking_status: "saha_assigned",
        updated_at: now,
      });

      await writeAuditLog({
        log_id: generateId("LOG"),
        actor_user_id: session.userId,
        actor_role: "SUPER_ADMIN",
        action: "ASSIGN_SAHA",
        entity_type: "Assignment",
        entity_id: assignmentId,
        new_value: JSON.stringify({ booking_id, saha_id }),
        timestamp: now,
      });

      return reply(res, 201, { success: true, assignment_id: assignmentId });
    }

    // ── GET /api/admin/attendance ─────────────────────────────────────
    if (rawUrl.endsWith("/attendance") && method === "GET") {
      const url = req instanceof Request ? new URL(req.url) : { searchParams: new URLSearchParams(String(req.url || "").split("?")[1] || "") };
      const params = url instanceof URL ? url.searchParams : url.searchParams;
      const today = now.split("T")[0];
      const records = await getAllAttendance({
        attendance_date: params.get("date") || today,
        saha_id: params.get("saha_id") || undefined,
        booking_id: params.get("booking_id") || undefined,
      });
      return reply(res, 200, { attendance: records, date: params.get("date") || today });
    }

    // ── PATCH /api/admin/attendance (correction with audit) ───────────
    if (rawUrl.endsWith("/attendance") && method === "PATCH") {
      const body = await parseBody(req);
      const { attendance_id, check_in_time, check_out_time, reason } = body;
      if (!attendance_id) return reply(res, 400, { error: "attendance_id required" });

      // Fetch original to preserve audit trail
      const allRecords = await getAllAttendance();
      const original = allRecords.find((r) => r.attendance_id === attendance_id);

      await updateAttendance(attendance_id, {
        ...(check_in_time ? { check_in_time, original_check_in: original?.check_in_time || "" } : {}),
        ...(check_out_time ? { check_out_time, original_check_out: original?.check_out_time || "" } : {}),
        attendance_status: "manually_corrected",
        corrected_by: session.userId,
        exception_notes: String(reason || ""),
        updated_at: now,
      });

      await writeAuditLog({
        log_id: generateId("LOG"),
        actor_user_id: session.userId,
        actor_role: "SUPER_ADMIN",
        action: "CORRECT_ATTENDANCE",
        entity_type: "Attendance",
        entity_id: attendance_id,
        previous_value: JSON.stringify({ check_in: original?.check_in_time, check_out: original?.check_out_time }),
        new_value: JSON.stringify({ check_in: check_in_time, check_out: check_out_time, reason }),
        timestamp: now,
      });

      return reply(res, 200, { success: true });
    }

    // ── GET /api/admin/matching ───────────────────────────────────────
    if (rawUrl.endsWith("/matching") && method === "GET") {
      const url = req instanceof Request ? new URL(req.url) : { searchParams: new URLSearchParams(String(req.url || "").split("?")[1] || "") };
      const params = url instanceof URL ? url.searchParams : url.searchParams;
      const bookingId = params.get("booking_id");
      if (!bookingId) return reply(res, 400, { error: "booking_id required" });

      const booking = await findBookingById(bookingId);
      if (!booking) return reply(res, 404, { error: "Booking not found" });

      // Fetch all approved Sahas and filter by city + capabilities
      const allSahas = await getAllSahas({ city: booking.city, approval_status: "approved" });
      const leaveRequests = await getAllAssignments(); // used for overlap check

      const matches = allSahas
        .filter((s) => {
          // Check not already assigned to conflicting shift
          const hasConflict = leaveRequests.some(
            (a) => a.saha_id === s.saha_id && a.assignment_status === "confirmed" &&
              ((a.scheduled_start <= booking.end_date) && (a.scheduled_end >= booking.start_date))
          );
          return !hasConflict;
        })
        .map((s) => ({
          saha_id: s.saha_id,
          name: s.full_name,
          city: s.city,
          service_areas: s.service_areas,
          capabilities: s.capabilities,
          languages: s.languages,
          experience_years: s.experience_years,
          verification_status: s.verification_status,
          approval_status: s.approval_status,
          match_reason: `City: ${s.city}, Experience: ${s.experience_years}yr`,
        }));

      return reply(res, 200, { booking, matches });
    }

    return reply(res, 404, { error: "Admin route not found" });
  } catch (err) {
    console.error("[admin] Error:", err);
    return reply(res, 500, { error: "Server error" });
  }
}

