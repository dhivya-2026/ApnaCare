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
import { hashPassword } from "../password";
import { createSession } from "../../session/session-manager";
import { createSessionCookieHeader } from "../../session/cookies";
import { reply, parseBody } from "../utils";

export default async function handler(req: any, res?: any) {
  const method = (req.method || (req instanceof Request ? req.method : "GET")).toUpperCase();
  const url = new URL(req.url || "http://localhost", "http://localhost");
  const path = url.pathname;

  // -----------------------------------------------------------
  // SEED ROUTE (No session required, protected by secret)
  // -----------------------------------------------------------
  if (path === "/api/admin/seed" && method === "POST") {
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

      const passwordHash = await hashPassword(body.password);
      const user = await createUser({
        email: body.email,
        phone: body.phone || "+919876543210",
        fullName: body.fullName,
        role: "SUPER_ADMIN",
        passwordHash,
        accountStatus: "ACTIVE",
        city: body.city || "Bangalore",
      });

      const session = await createSession(user.userId, "SUPER_ADMIN" as any, {
        name: user.fullName,
        mobile: user.phone,
        city: user.city,
        roleTitle: "Super Admin / Operations Lead",
      });

      const cookieHeader = createSessionCookieHeader(session.sessionId);

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
  // ALL OTHER ADMIN ROUTES REQUIRE SUPER_ADMIN (or admin)
  // -----------------------------------------------------------
  const auth = await requireAuth(req, "SUPER_ADMIN" as any);
  if (!auth.authorized || !auth.session) {
    return reply(res, auth.status || 401, { error: auth.error || "Unauthorized" });
  }

  try {
    // -----------------------------------------
    // GET /api/admin/dashboard
    // -----------------------------------------
    if (path === "/api/admin/dashboard" && method === "GET") {
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
    if (path === "/api/admin/customers" && method === "GET") {
      const customers = await getAllCustomers();
      return reply(res, 200, { customers });
    }

    // -----------------------------------------
    // GET /api/admin/sahas
    // -----------------------------------------
    if (path === "/api/admin/sahas" && method === "GET") {
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
    if (path === "/api/admin/sahas/approve" && method === "POST") {
      const body = await parseBody(req);
      if (!body.sahaId) return reply(res, 400, { error: "Missing sahaId" });
      await updateSahaStatus(body.sahaId, "APPROVED");
      return reply(res, 200, { success: true, message: "Saha approved successfully" });
    }

    // -----------------------------------------
    // POST /api/admin/sahas/reject
    // -----------------------------------------
    if (path === "/api/admin/sahas/reject" && method === "POST") {
      const body = await parseBody(req);
      if (!body.sahaId) return reply(res, 400, { error: "Missing sahaId" });
      await updateSahaStatus(body.sahaId, "REJECTED");
      return reply(res, 200, { success: true, message: "Saha application rejected" });
    }

    // -----------------------------------------
    // POST /api/admin/sahas/suspend
    // -----------------------------------------
    if (path === "/api/admin/sahas/suspend" && method === "POST") {
      const body = await parseBody(req);
      if (!body.sahaId) return reply(res, 400, { error: "Missing sahaId" });
      await updateSahaStatus(body.sahaId, "SUSPENDED");
      return reply(res, 200, { success: true, message: "Saha suspended" });
    }

    // -----------------------------------------
    // GET /api/admin/bookings
    // -----------------------------------------
    if (path === "/api/admin/bookings" && method === "GET") {
      const city = url.searchParams.get("city");
      const status = url.searchParams.get("status");
      let bookings = await getAllBookings();

      if (city) bookings = bookings.filter((b) => b.city.toLowerCase() === city.toLowerCase());
      if (status) bookings = bookings.filter((b) => b.status === status);

      return reply(res, 200, { bookings });
    }

    // -----------------------------------------
    // PATCH /api/admin/bookings/:id
    // -----------------------------------------
    if (path.startsWith("/api/admin/bookings/") && method === "PATCH") {
      const bookingId = path.split("/").pop();
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
    if (path === "/api/admin/attendance" && method === "GET") {
      const date = url.searchParams.get("date");
      let records = await getAllAttendance();
      if (date) records = records.filter((r) => r.date === date);
      return reply(res, 200, { attendance: records });
    }

    // -----------------------------------------
    // PATCH /api/admin/attendance/:id
    // -----------------------------------------
    if (path.startsWith("/api/admin/attendance/") && method === "PATCH") {
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
    if (path === "/api/admin/matching" && method === "GET") {
      const bookingId = url.searchParams.get("bookingId");
      const bookings = await getAllBookings();
      const targetBooking = bookings.find((b) => b.bookingId === bookingId);

      const sahas = await getAllSahas();
      const approvedSahas = sahas.filter((s) => s.approvalStatus === "APPROVED");

      if (!targetBooking) {
        return reply(res, 200, { matchingSahas: approvedSahas });
      }

      // Rank by same city + capability match
      const scored = approvedSahas.map((s) => {
        let score = 0;
        if (s.city.toLowerCase() === targetBooking.city.toLowerCase()) score += 50;
        if (s.serviceCapabilities.some((cap) => targetBooking.serviceType.toLowerCase().includes(cap.toLowerCase()))) {
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
    if (path === "/api/admin/reports" && method === "GET") {
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

    return reply(res, 404, { error: "Endpoint not found" });
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

