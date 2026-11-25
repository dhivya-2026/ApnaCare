import {
  getUserById,
  updateUser,
  getUserBookings,
  createBooking,
  updateBooking,
  getFamilyMembers,
  createFamilyMember,
  deleteFamilyMember,
  getTimelineEvents,
  addTimelineEvent,
} from "../sheets-dal";
import { jsonResponse, errorResponse, parseJsonBody, authenticateRequest } from "../utils";

export async function handleUserAction(request: Request, action: string): Promise<Response> {
  const { session, errorResponse: authErr } = await authenticateRequest(request, ["user", "customer", "admin"]);
  if (authErr || !session) return authErr || errorResponse("Unauthorized", 401);

  const userId = session.userId;
  const method = request.method.toUpperCase();

  // 1. Profile: GET / PUT
  if (action === "profile") {
    if (method === "GET") {
      const user = await getUserById(userId);
      if (!user) return errorResponse("User profile not found", 404);
      return jsonResponse({
        user: {
          id: user.user_id,
          name: user.full_name,
          email: user.email,
          phone: user.phone,
          city: user.city,
          address: user.address,
          status: user.account_status,
          createdAt: user.created_at,
        },
      });
    }

    if (method === "PUT" || method === "POST") {
      const body = await parseJsonBody(request);
      if (!body) return errorResponse("No update data provided", 400);

      const updated = await updateUser(userId, {
        full_name: body.full_name,
        phone: body.phone,
        city: body.city,
        address: body.address,
      });

      return jsonResponse({ success: true, user: updated });
    }
  }

  // 2. Bookings: GET / POST
  if (action === "bookings") {
    if (method === "GET") {
      const bookings = await getUserBookings(userId);
      return jsonResponse({ bookings });
    }

    if (method === "POST") {
      const body = await parseJsonBody(request);
      if (!body || !body.service_category || !body.start_date) {
        return errorResponse("Service category and start date are required", 400);
      }

      const user = await getUserById(userId);
      const existingBookings = await getUserBookings(userId);
      const isDuplicate = existingBookings.some(
        (b) =>
          b.booking_status !== "cancelled" &&
          b.service_category === body.service_category &&
          b.start_date === body.start_date &&
          b.start_time === (body.start_time || "08:00 AM")
      );
      if (isDuplicate) {
        return errorResponse("A booking for this service and schedule already exists.", 409);
      }

      const booking = await createBooking({
        user_id: userId,
        customer_name: body.customer_name || user?.full_name || "LifeSakhi Customer",
        customer_phone: body.customer_phone || user?.phone || "",
        service_category: body.service_category,
        service_type: body.service_type || body.service_category,
        division: body.division,
        travel_type: body.travel_type,
        pickup_location: body.pickup_location,
        drop_location: body.drop_location,
        emergency_contact: body.emergency_contact,
        service_details: body.service_details,
        payment_status: body.payment_status || "pending",
        patient_details: body.patient_details || "Family member",
        city: body.city || user?.city || "Bengaluru",
        service_location: body.service_location || body.address || user?.address || "Residence",
        start_date: body.start_date,
        start_time: body.start_time || "08:00 AM",
        end_date: body.end_date || body.start_date,
        end_time: body.end_time || "08:00 PM",
        duration: body.duration || "1 Day (12 hrs)",
        special_requirements: body.special_requirements || "",
        booking_status: "requested",
      });

      return jsonResponse({ success: true, booking }, 201);
    }
  }

  // 3. Family Members Management: GET / POST / DELETE
  if (action === "family-members") {
    if (method === "GET") {
      const members = await getFamilyMembers(userId);
      return jsonResponse({ members });
    }

    if (method === "POST") {
      const body = await parseJsonBody(request);
      if (!body || !body.full_name || !body.relationship) {
        return errorResponse("full_name and relationship are required", 400);
      }

      const member = await createFamilyMember({
        user_id: userId,
        full_name: body.full_name,
        relationship: body.relationship,
        age: Number(body.age) || 60,
        gender: body.gender || "Female",
        mobility_level: body.mobility_level || "independent",
        dietary_medical_notes: body.dietary_medical_notes || "",
        primary_language: body.primary_language || "English",
        emergency_contact: body.emergency_contact || "",
      });

      return jsonResponse({ success: true, member }, 201);
    }

    if (method === "DELETE") {
      const url = new URL(request.url);
      const memberId = url.searchParams.get("memberId");
      if (!memberId) return errorResponse("memberId query parameter is required", 400);

      const ok = await deleteFamilyMember(userId, memberId);
      return jsonResponse({ success: ok });
    }
  }

  // 4. Care Timeline for a Booking: GET
  if (action === "timeline") {
    const url = new URL(request.url);
    const bookingId = url.searchParams.get("bookingId");
    if (!bookingId) return errorResponse("bookingId query parameter is required", 400);

    const events = await getTimelineEvents(bookingId);
    return jsonResponse({ bookingId, events });
  }

  // 5. Cancel or Request Modification for a Booking: POST
  if (action === "cancel-booking") {
    const body = await parseJsonBody(request);
    if (!body || !body.booking_id) return errorResponse("booking_id is required", 400);

    const updated = await updateBooking(body.booking_id, {
      booking_status: "cancelled",
      cancellation_reason: body.reason || "Cancelled by family member",
    });

    await addTimelineEvent({
      booking_id: body.booking_id,
      event_type: "cancelled",
      title: "Booking Cancelled",
      description: `Service cancelled by family: ${body.reason || "Change in care requirements"}`,
      actor: "family",
      actor_name: session.userId,
    });

    return jsonResponse({ success: true, booking: updated });
  }

  // 6. Submit Service Feedback: POST
  if (action === "feedback") {
    const body = await parseJsonBody(request);
    if (!body || !body.booking_id || !body.rating) {
      return errorResponse("booking_id and rating (1-5) are required", 400);
    }

    const updated = await updateBooking(body.booking_id, {
      rating_given: Number(body.rating),
      feedback_notes: body.notes || "",
    });

    return jsonResponse({ success: true, booking: updated });
  }

  return errorResponse("Unknown user action: " + action, 404);
}
