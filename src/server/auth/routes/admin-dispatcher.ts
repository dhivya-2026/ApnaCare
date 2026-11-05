import {
  getAdminStats,
  getAllUsers,
  updateUser,
  getAllAttendants,
  updateAttendant,
  getAllBookings,
  updateBooking,
  createAssignment,
  getAttendanceRecords,
  getAttendantById,
} from "../sheets-dal";
import { jsonResponse, errorResponse, parseJsonBody, authenticateRequest } from "../utils";

export async function handleAdminAction(request: Request, action: string): Promise<Response> {
  const { session, errorResponse: authErr } = await authenticateRequest(request, ["admin", "super_admin"]);
  if (authErr || !session) return authErr || errorResponse("Admin privileges required", 403);

  const method = request.method.toUpperCase();

  // 1. Overview Statistics
  if (action === "overview" || action === "stats") {
    const stats = await getAdminStats();
    return jsonResponse({ stats });
  }

  // 2. User Management
  if (action === "users") {
    if (method === "GET") {
      const users = await getAllUsers();
      return jsonResponse({ users });
    }

    if (method === "PUT" || method === "POST") {
      const body = await parseJsonBody(request);
      if (!body || !body.user_id) return errorResponse("user_id is required", 400);

      const updated = await updateUser(body.user_id, {
        account_status: body.account_status,
      });
      return jsonResponse({ success: true, user: updated });
    }
  }

  // 3. Attendant Management
  if (action === "attendants") {
    const attendants = await getAllAttendants();
    return jsonResponse({ attendants });
  }

  if (action === "approve-attendant") {
    const body = await parseJsonBody(request);
    if (!body || !body.attendant_id) return errorResponse("attendant_id is required", 400);

    const updated = await updateAttendant(body.attendant_id, {
      verification_status: "verified",
      account_status: "active",
    });
    return jsonResponse({
      success: true,
      message: `Attendant ${updated.full_name} has been verified and activated.`,
      attendant: updated,
    });
  }

  if (action === "reject-attendant") {
    const body = await parseJsonBody(request);
    if (!body || !body.attendant_id) return errorResponse("attendant_id is required", 400);

    const updated = await updateAttendant(body.attendant_id, {
      verification_status: "rejected",
      account_status: "inactive",
    });
    return jsonResponse({
      success: true,
      message: `Attendant ${updated.full_name} application was marked rejected.`,
      attendant: updated,
    });
  }

  // 4. Booking Management
  if (action === "bookings") {
    if (method === "GET") {
      const bookings = await getAllBookings();
      return jsonResponse({ bookings });
    }

    if (method === "PUT" || method === "POST") {
      const body = await parseJsonBody(request);
      if (!body || !body.booking_id) return errorResponse("booking_id is required", 400);

      const updated = await updateBooking(body.booking_id, {
        booking_status: body.booking_status,
      });
      return jsonResponse({ success: true, booking: updated });
    }
  }

  // 5. Attendant Assignment
  if (action === "assign") {
    const body = await parseJsonBody(request);
    if (!body || !body.booking_id || !body.attendant_id) {
      return errorResponse("booking_id and attendant_id are required", 400);
    }

    const attendant = await getAttendantById(body.attendant_id);
    if (!attendant) return errorResponse("Selected attendant not found", 404);

    if (attendant.verification_status !== "verified" || attendant.account_status !== "active") {
      return errorResponse("Cannot assign an unverified or inactive attendant", 400);
    }

    const assignment = await createAssignment({
      booking_id: body.booking_id,
      attendant_id: body.attendant_id,
      assigned_by: session.userId,
      assignment_status: "offered",
    });

    return jsonResponse({
      success: true,
      message: `Assigned ${attendant.full_name} to booking ${body.booking_id}`,
      assignment,
    });
  }

  // 6. System Attendance
  if (action === "attendance") {
    const records = await getAttendanceRecords();
    return jsonResponse({ records });
  }

  return errorResponse("Unknown admin action: " + action, 404);
}
