import { requireAuth } from "../../session/guard";
import {
  createUser,
  findUserByEmail,
  getAllCustomers,
  getAllSahas,
  getAllBookings,
  getAllAttendance,
  updateSahaStatus,
  updateBooking,
  correctAttendance,
} from "../sheets-dal";
import { buildSetCookieHeader } from "../simple-session";
import { reply, parseBody } from "../utils";

export default async function handler(req: any, res?: any) {
  const method = (req.method || (req instanceof Request ? req.method : "GET")).toUpperCase();
  const rawUrl = req.url || (req instanceof Request ? req.url : "");
  const url = new URL(rawUrl || "http://localhost", "http://localhost");
  const segments = url.pathname.split("/").filter(Boolean);
  const action = req.query?.action || req.query?.type || segments[segments.length - 1] || "";
  const path = url.pathname;

  // -----------------------------------------------------------
  // SEED ROUTE (No session required, protected by secret)
  // -----------------------------------------------------------
  if ((action === "seed" || path.endsWith("/seed")) && method === "POST") {
    try {
      const body = await parseBody(req);
      const expectedSecret = process.env.ADMIN_PROVISION_SECRET || "apnacare_operations_master_2026";

      if (!body.secret || body.secret !== expectedSecret) {
        return reply(res, 403, { error: "Invalid provisioning secret" });
      }

      if (!body.email || !body.password || !body.fullName) {
        return reply(res, 400, { error: "Missing required admin fields (email, password, fullName)" });
      }

      const existing = await findUserByEmail(body.email);
      if (existing) {
        return reply(res, 409, { error: "User already exists with this email" });
      }

      const user = await createUser({
        email: body.email,
        phone: body.phone || "+918825493949",
        fullName: body.fullName,
        role: "SUPER_ADMIN",
        password: body.password,
        passwordHash: body.password,
        accountStatus: "ACTIVE",
        city: body.city || "Bengaluru",
      });

      const cookieHeader = buildSetCookieHeader({
        userId: user.userId,
        role: "SUPER_ADMIN",
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        city: user.city,
      });

      return reply(
        res,
        201,
        {
          success: true,
          message: "Super admin provisioned successfully",
          user: {
            userId: user.userId,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
          },
        },
        { "Set-Cookie": cookieHeader }
      );
    } catch (err) {
      console.error("[AdminSeed] Error:", err);
      return reply(res, 500, { error: "Internal server error" });
    }
  }

  // -----------------------------------------------------------
  // ALL OTHER ADMIN ROUTES
  // -----------------------------------------------------------
  const auth = await requireAuth(req);
  if (!auth.authorized || !auth.session) {
    return reply(res, auth.status || 401, { error: auth.error || "Unauthorized" });
  }

  try {
    // -----------------------------------------
    // GET /api/admin/dashboard
    // -----------------------------------------
    if (action === "dashboard" || path.endsWith("/dashboard")) {
      const [customers, sahas, bookings, attendance] = await Promise.all([
        getAllCustomers(),
        getAllSahas(),
        getAllBookings(),
        getAllAttendance(),
      ]);

      const today = new Date().toISOString().split("T")[0];
      const todayAttendance = attendance.filter((a) => a.date === today);

      return reply(res, 200, {
        kpis: {
          totalCustomers: customers.length,
          totalSahas: sahas.length,
          pendingApprovals: sahas.filter((s) => s.approvalStatus === "PENDING_REVIEW").length,
          activeSahas: sahas.filter((s) => s.approvalStatus === "APPROVED").length,
          totalBookings: bookings.length,
          activeBookings: bookings.filter((b) => ["CONFIRMED", "SAHA_ASSIGNED", "IN_PROGRESS"].includes(b.status)).length,
          todayCheckIns: todayAttendance.length,
          completedBookings: bookings.filter((b) => b.status === "COMPLETED").length,
          cancelledBookings: bookings.filter((b) => b.status === "CANCELLED").length,
        },
        recentBookings: bookings.slice(-5).reverse(),
        pendingSahas: sahas.filter((s) => s.approvalStatus === "PENDING_REVIEW").slice(0, 5),
      });
    }

    // -----------------------------------------
    // GET /api/admin/customers
    // -----------------------------------------
    if (action === "customers" || path.endsWith("/customers")) {
      const customers = await getAllCustomers();
      return reply(res, 200, { customers });
    }

    // -----------------------------------------
    // GET /api/admin/sahas
    // -----------------------------------------
    if (action === "sahas" || path.endsWith("/sahas")) {
      const statusFilter = url.searchParams.get("status");
      let sahas = await getAllSahas();
      if (statusFilter) {
        sahas = sahas.filter((s) => s.approvalStatus === statusFilter);
      }
      return reply(res, 200, { sahas });
    }

    // -----------------------------------------
    // POST /api/admin/sahas/approve
    // -----------------------------------------
    if (action === "approve" || path.endsWith("/approve")) {
      const body = await parseBody(req);
      if (!body.sahaId) return reply(res, 400, { error: "Missing sahaId" });
      await updateSahaStatus(body.sahaId, "APPROVED");
      return reply(res, 200, { success: true, message: "Saha approved successfully" });
    }

    // -----------------------------------------
    // POST /api/admin/sahas/reject
    // -----------------------------------------
    if (action === "reject" || path.endsWith("/reject")) {
      const body = await parseBody(req);
      if (!body.sahaId) return reply(res, 400, { error: "Missing sahaId" });
      await updateSahaStatus(body.sahaId, "REJECTED");
      return reply(res, 200, { success: true, message: "Saha application rejected" });
    }

    // -----------------------------------------
    // POST /api/admin/sahas/suspend
    // -----------------------------------------
    if (action === "suspend" || path.endsWith("/suspend")) {
      const body = await parseBody(req);
      if (!body.sahaId) return reply(res, 400, { error: "Missing sahaId" });
      await updateSahaStatus(body.sahaId, "SUSPENDED");
      return reply(res, 200, { success: true, message: "Saha suspended" });
    }

    // -----------------------------------------
    // GET /api/admin/bookings
    // -----------------------------------------
    if (action === "bookings" || path.endsWith("/bookings")) {
      const city = url.searchParams.get("city");
      const status = url.searchParams.get("status");
      let bookings = await getAllBookings();
      if (city) bookings = bookings.filter((b) => b.city?.toLowerCase() === city.toLowerCase());
      if (status) bookings = bookings.filter((b) => b.status === status);
      return reply(res, 200, { bookings });
    }

    // -----------------------------------------
    // PATCH /api/admin/bookings/:id
    // -----------------------------------------
    if ((path.includes("/bookings/") || req.query?.id) && (method === "PATCH" || method === "POST")) {
      const bookingId = req.query?.id || path.split("/").pop();
      if (!bookingId) return reply(res, 400, { error: "Invalid bookingId" });

      const body = await parseBody(req);
      const updates: Record<string, any> = {};

      if (body.status !== undefined) updates.status = body.status;
      if (body.assignedSahaId !== undefined) {
        updates.assignedSahaId = body.assignedSahaId;
        if (!body.status) updates.status = "SAHA_ASSIGNED";
      }
      if (body.notes !== undefined) updates.notes = body.notes;

      await updateBooking(bookingId, updates);
      return reply(res, 200, { success: true, message: "Booking updated" });
    }

    // -----------------------------------------
    // GET /api/admin/attendance
    // -----------------------------------------
    if (action === "attendance" || path.endsWith("/attendance")) {
      const date = url.searchParams.get("date");
      let records = await getAllAttendance();
      if (date) records = records.filter((r) => r.date === date);
      return reply(res, 200, { attendance: records });
    }

    // -----------------------------------------
    // PATCH /api/admin/attendance/:id
    // -----------------------------------------
    if (path.includes("/attendance/") && (method === "PATCH" || method === "POST")) {
      const attendanceId = path.split("/").pop();
      if (!attendanceId) return reply(res, 400, { error: "Invalid attendanceId" });

      const body = await parseBody(req);
      await correctAttendance(attendanceId, {
        ...body,
        correctedBy: auth.session.userId,
        correctionReason: body.reason || "Manual admin correction",
      });

      return reply(res, 200, { success: true, message: "Attendance corrected" });
    }

    // -----------------------------------------
    // GET /api/admin/matching
    // -----------------------------------------
    if (action === "matching" || path.endsWith("/matching")) {
      const bookingId = url.searchParams.get("bookingId");
      const bookings = await getAllBookings();
      const targetBooking = bookings.find((b) => b.bookingId === bookingId);

      const sahas = await getAllSahas();
      const approvedSahas = sahas.filter((s) => s.approvalStatus === "APPROVED");

      if (!targetBooking) {
        return reply(res, 200, { matchingSahas: approvedSahas });
      }

      const scored = approvedSahas.map((s) => {
        let score = 0;
        if (s.city?.toLowerCase() === targetBooking.city?.toLowerCase()) score += 50;
        if (s.serviceCapabilities?.some((cap) => targetBooking.serviceType?.toLowerCase().includes(cap.toLowerCase()))) {
          score += 50;
        }
        return { saha: s, matchScore: score };
      });

      scored.sort((a, b) => b.matchScore - a.matchScore);
      return reply(res, 200, {
        booking: targetBooking,
        matchingSahas: scored.map((s) => ({ ...s.saha, matchScore: s.matchScore })),
      });
    }

    // -----------------------------------------
    // GET /api/admin/reports
    // -----------------------------------------
    if (action === "reports" || path.endsWith("/reports")) {
      const [bookings, attendance, sahas, customers] = await Promise.all([
        getAllBookings(),
        getAllAttendance(),
        getAllSahas(),
        getAllCustomers(),
      ]);

      return reply(res, 200, {
        generatedAt: new Date().toISOString(),
        summary: {
          totalBookings: bookings.length,
          totalAttendanceRecords: attendance.length,
          totalSahas: sahas.length,
          totalCustomers: customers.length,
        },
        bookings,
        attendance,
        sahas,
        customers,
      });
    }

    return reply(res, 404, { error: `Endpoint not found: ${action}` });
  } catch (error) {
    console.error("[AdminAPI] Error:", error);
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
