import {
  findUserByEmail,
  findAttendantByEmail,
  findAdminByEmail,
  createUser,
  createAttendant,
  getUserById,
  getAttendantById,
  getAdminById,
} from "../sheets-dal";
import { verifyPassword, hashPassword, validatePasswordStrength } from "../password";
import { createSession, revokeSession } from "../../session/session-manager";
import { createSessionCookieHeader, clearSessionCookieHeader, parseSessionCookie } from "../../session/cookies";
import { jsonResponse, errorResponse, parseJsonBody, authenticateRequest } from "../utils";

export async function handleAuthAction(request: Request, action: string): Promise<Response> {
  const method = request.method.toUpperCase();

  // 1. Session check: GET /api/auth/session
  if (action === "session" || (action === "me" && method === "GET")) {
    const { session, errorResponse: err } = await authenticateRequest(request);
    if (err || !session) return err || errorResponse("Unauthenticated", 401);

    let profile: any = null;
    if (session.role === "admin" || session.role === "super_admin") {
      profile = await getAdminById(session.userId);
    } else if (session.role === "attendant" || session.role === "saha") {
      profile = await getAttendantById(session.userId);
    } else {
      profile = await getUserById(session.userId);
    }

    return jsonResponse({
      authenticated: true,
      user: {
        id: session.userId,
        role: session.role,
        name: profile?.full_name || session.metadata?.name || "ApnaCare Member",
        email: profile?.email || "",
        phone: profile?.phone || session.metadata?.mobile || "",
        city: profile?.city || session.metadata?.city || "",
        status: profile?.account_status || "active",
        verificationStatus: profile?.verification_status,
      },
    });
  }

  // 2. Logout: POST /api/auth/logout
  if (action === "logout") {
    const cookieHeader = request.headers.get("cookie");
    const sessionId = parseSessionCookie(cookieHeader);
    if (sessionId) {
      await revokeSession(sessionId);
    }
    const clearCookie = clearSessionCookieHeader();
    return jsonResponse({ success: true, message: "Logged out successfully" }, 200, {
      "Set-Cookie": clearCookie,
    });
  }

  // 3. Login: POST /api/auth/login
  if (action === "login") {
    if (method !== "POST") return errorResponse("Method not allowed", 405);
    const body = await parseJsonBody(request);
    if (!body || !body.email || !body.password) {
      return errorResponse("Email and password are required", 400);
    }

    const email = String(body.email).trim().toLowerCase();
    const password = String(body.password);
    const requestedRole = body.role as string | undefined;

    // A. Check Admin if requested or attempted
    if (requestedRole === "admin" || requestedRole === "super_admin") {
      const admin = await findAdminByEmail(email);
      if (!admin) return errorResponse("Invalid email or password", 401);

      const valid = await verifyPassword(password, admin.password_hash);
      if (!valid) return errorResponse("Invalid email or password", 401);

      if (admin.account_status !== "active") {
        return errorResponse("Admin account is suspended or inactive", 403);
      }

      const session = await createSession(admin.admin_id, "admin", {
        name: admin.full_name,
        mobile: "",
        city: "Central Command",
      });

      const cookieHeader = createSessionCookieHeader(session.sessionId);
      return jsonResponse(
        {
          success: true,
          role: "admin",
          redirectUrl: "/dashboard/admin",
          user: { id: admin.admin_id, name: admin.full_name, email: admin.email, role: "admin" },
        },
        200,
        { "Set-Cookie": cookieHeader }
      );
    }

    // B. Check Attendant / Saha
    if (requestedRole === "attendant" || requestedRole === "saha") {
      const attendant = await findAttendantByEmail(email);
      if (!attendant) return errorResponse("Invalid credentials or unregistered Saha account", 401);

      const valid = await verifyPassword(password, attendant.password_hash);
      if (!valid) return errorResponse("Invalid credentials", 401);

      // Check approval status
      if (attendant.account_status === "pending_approval" || attendant.verification_status === "pending") {
        return errorResponse(
          "Your attendant application is pending clinical verification by ApnaCare. You will receive an SMS and email once approved.",
          403
        );
      }

      if (attendant.account_status !== "active") {
        return errorResponse("Your attendant account is inactive or suspended. Contact support.", 403);
      }

      const session = await createSession(attendant.attendant_id, "attendant", {
        name: attendant.full_name,
        mobile: attendant.phone,
        city: attendant.city,
        roleTitle: attendant.qualifications,
      });

      const cookieHeader = createSessionCookieHeader(session.sessionId);
      return jsonResponse(
        {
          success: true,
          role: "attendant",
          redirectUrl: "/dashboard/attendant",
          user: {
            id: attendant.attendant_id,
            name: attendant.full_name,
            email: attendant.email,
            phone: attendant.phone,
            city: attendant.city,
            role: "attendant",
          },
        },
        200,
        { "Set-Cookie": cookieHeader }
      );
    }

    // C. Default: Customer / User Login
    const user = await findUserByEmail(email);
    if (!user) {
      // If no customer record, check if they are an admin or attendant logging in through general portal
      const maybeAdmin = await findAdminByEmail(email);
      if (maybeAdmin && (await verifyPassword(password, maybeAdmin.password_hash))) {
        const session = await createSession(maybeAdmin.admin_id, "admin");
        const cookie = createSessionCookieHeader(session.sessionId);
        return jsonResponse(
          { success: true, role: "admin", redirectUrl: "/dashboard/admin" },
          200,
          { "Set-Cookie": cookie }
        );
      }
      return errorResponse("Invalid email or password", 401);
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) return errorResponse("Invalid email or password", 401);

    if (user.account_status !== "active") {
      return errorResponse("Account is suspended or deactivated", 403);
    }

    const session = await createSession(user.user_id, "user", {
      name: user.full_name,
      mobile: user.phone,
      city: user.city,
    });

    const cookieHeader = createSessionCookieHeader(session.sessionId);
    return jsonResponse(
      {
        success: true,
        role: "user",
        redirectUrl: "/dashboard/user",
        user: {
          id: user.user_id,
          name: user.full_name,
          email: user.email,
          phone: user.phone,
          city: user.city,
          role: "user",
        },
      },
      200,
      { "Set-Cookie": cookieHeader }
    );
  }

  // 4. Register Customer: POST /api/auth/register-user
  if (action === "register-user" || action === "register") {
    if (method !== "POST") return errorResponse("Method not allowed", 405);
    const body = await parseJsonBody(request);
    if (!body || !body.full_name || !body.email || !body.password || !body.phone) {
      return errorResponse("Full name, email, phone, and password are required", 400);
    }

    const pwCheck = validatePasswordStrength(body.password);
    if (!pwCheck.valid) {
      return errorResponse(pwCheck.message || "Password is not strong enough", 400);
    }

    const existing = await findUserByEmail(body.email);
    if (existing) {
      return errorResponse("An account with this email address already exists. Please log in.", 409);
    }

    const password_hash = await hashPassword(body.password);
    const user = await createUser({
      full_name: String(body.full_name).trim(),
      email: String(body.email).trim().toLowerCase(),
      phone: String(body.phone).trim(),
      password_hash,
      city: body.city || "Bengaluru",
      address: body.address || "",
      account_status: "active",
      email_verified: true,
    });

    const session = await createSession(user.user_id, "user", {
      name: user.full_name,
      mobile: user.phone,
      city: user.city,
    });

    const cookieHeader = createSessionCookieHeader(session.sessionId);
    return jsonResponse(
      {
        success: true,
        role: "user",
        redirectUrl: "/dashboard/user",
        user: { id: user.user_id, name: user.full_name, email: user.email, role: "user" },
      },
      201,
      { "Set-Cookie": cookieHeader }
    );
  }

  // 5. Register Attendant: POST /api/auth/register-attendant
  if (action === "register-attendant") {
    if (method !== "POST") return errorResponse("Method not allowed", 405);
    const body = await parseJsonBody(request);
    if (!body || !body.full_name || !body.email || !body.password || !body.phone) {
      return errorResponse("Required registration fields missing", 400);
    }

    const pwCheck = validatePasswordStrength(body.password);
    if (!pwCheck.valid) {
      return errorResponse(pwCheck.message || "Password is not strong enough", 400);
    }

    const existing = await findAttendantByEmail(body.email);
    if (existing) {
      return errorResponse("An attendant account with this email already exists.", 409);
    }

    const password_hash = await hashPassword(body.password);
    const attendant = await createAttendant({
      full_name: String(body.full_name).trim(),
      email: String(body.email).trim().toLowerCase(),
      phone: String(body.phone).trim(),
      password_hash,
      gender: body.gender || "female",
      city: body.city || "Bengaluru",
      address: body.address || "",
      qualifications: body.qualifications || "Trained Caregiver",
      experience: body.experience || "2+ years family support",
      skills: Array.isArray(body.skills) ? body.skills : ["Elderly Care", "Mobility Assistance"],
      languages: Array.isArray(body.languages) ? body.languages : ["Kannada", "English"],
      service_categories: Array.isArray(body.service_categories)
        ? body.service_categories
        : ["Elderly Care"],
      availability_status: "available",
      verification_status: "pending",
      account_status: "pending_approval",
    });

    return jsonResponse(
      {
        success: true,
        pendingApproval: true,
        message:
          "Your Saha attendant registration has been submitted. Our clinical coordinator team will review your application and contact you.",
        attendantId: attendant.attendant_id,
      },
      201
    );
  }

  return errorResponse("Unknown auth action: " + action, 404);
}
