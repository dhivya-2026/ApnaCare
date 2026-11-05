import { getUserById, updateUser, getUserBookings, createBooking } from "../sheets-dal";
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
      const booking = await createBooking({
        user_id: userId,
        customer_name: body.customer_name || user?.full_name || "ApnaCare Customer",
        customer_phone: body.customer_phone || user?.phone || "",
        service_category: body.service_category,
        service_type: body.service_type || body.service_category,
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

  return errorResponse("Unknown user action: " + action, 404);
}
