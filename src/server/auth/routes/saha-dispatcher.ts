import {
  getAttendantById,
  updateAttendant,
  getAttendantAssignments,
  updateAssignmentStatus,
  checkInAttendant,
  checkOutAttendant,
  getAttendanceRecords,
  getAttendantAvailability,
  setAttendantAvailability,
} from "../sheets-dal";
import { jsonResponse, errorResponse, parseJsonBody, authenticateRequest } from "../utils";

export async function handleSahaAction(request: Request, action: string): Promise<Response> {
  const { session, errorResponse: authErr } = await authenticateRequest(request, ["attendant", "saha", "admin"]);
  if (authErr || !session) return authErr || errorResponse("Unauthorized", 401);

  const attendantId = session.userId;
  const method = request.method.toUpperCase();

  // 1. Profile: GET / PUT
  if (action === "profile") {
    if (method === "GET") {
      const att = await getAttendantById(attendantId);
      if (!att) return errorResponse("Attendant record not found", 404);
      return jsonResponse({ attendant: att });
    }

    if (method === "PUT" || method === "POST") {
      const body = await parseJsonBody(request);
      if (!body) return errorResponse("No update data provided", 400);

      const updated = await updateAttendant(attendantId, {
        phone: body.phone,
        city: body.city,
        address: body.address,
        availability_status: body.availability_status,
        languages: body.languages,
        skills: body.skills,
      });

      return jsonResponse({ success: true, attendant: updated });
    }
  }

  // 2. Assignments: GET
  if (action === "assignments") {
    const list = await getAttendantAssignments(attendantId);
    return jsonResponse({ assignments: list });
  }

  // 3. Accept Assignment: POST
  if (action === "accept") {
    const body = await parseJsonBody(request);
    if (!body || !body.assignment_id) {
      return errorResponse("assignment_id is required", 400);
    }
    const updated = await updateAssignmentStatus(body.assignment_id, "accepted");
    return jsonResponse({ success: true, assignment: updated });
  }

  // 4. Reject Assignment: POST
  if (action === "reject") {
    const body = await parseJsonBody(request);
    if (!body || !body.assignment_id) {
      return errorResponse("assignment_id is required", 400);
    }
    const updated = await updateAssignmentStatus(body.assignment_id, "rejected", body.reason || "Scheduling conflict");
    return jsonResponse({ success: true, assignment: updated });
  }

  // 5. Attendance Check-in / Check-out: POST / GET
  if (action === "attendance") {
    if (method === "GET") {
      const records = await getAttendanceRecords({ attendantId });
      return jsonResponse({ records });
    }

    if (method === "POST") {
      const body = await parseJsonBody(request);
      if (!body || !body.booking_id || !body.type) {
        return errorResponse("booking_id and type (check_in or check_out) are required", 400);
      }

      if (body.type === "check_in") {
        const record = await checkInAttendant(body.booking_id, attendantId, body.location);
        return jsonResponse({ success: true, message: "Checked in successfully", record });
      }

      if (body.type === "check_out") {
        const record = await checkOutAttendant(body.booking_id, attendantId, body.location);
        return jsonResponse({ success: true, message: "Checked out successfully", record });
      }

      return errorResponse("Invalid attendance type: " + body.type, 400);
    }
  }

  // 6. Availability: GET / POST
  if (action === "availability") {
    if (method === "GET") {
      const records = await getAttendantAvailability(attendantId);
      return jsonResponse({ availability: records });
    }

    if (method === "POST") {
      const body = await parseJsonBody(request);
      if (!body || !body.date) {
        return errorResponse("date is required", 400);
      }
      const record = await setAttendantAvailability(attendantId, body.date, body.status || "available");
      return jsonResponse({ success: true, record });
    }
  }

  return errorResponse("Unknown saha action: " + action, 404);
}
