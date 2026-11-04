import { z } from "zod";
import { verifyPassword } from "../password";
import {
  findUserByEmail,
  getCustomerByUserId,
  getSahaByUserId,
} from "../sheets-dal";
import { createSession } from "../../session/session-manager";
import { createSessionCookieHeader } from "../../session/cookies";
import { reply, parseBody } from "../utils";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["CUSTOMER", "SAHA", "SUPER_ADMIN"]).optional(),
});

export default async function handler(req: any, res?: any) {
  const method = (req.method || (req instanceof Request ? req.method : "GET")).toUpperCase();
  if (method !== "POST") {
    return reply(res, 405, { error: "Method Not Allowed" });
  }

  try {
    const rawBody = await parseBody(req);
    const parsed = LoginSchema.safeParse(rawBody);

    if (!parsed.success) {
      return reply(res, 400, {
        error: "Validation failed",
        details: parsed.error.issues.map((i) => i.message),
      });
    }

    const { email, password, role } = parsed.data;
    const user = await findUserByEmail(email);

    if (!user) {
      return reply(res, 401, { error: "Invalid email or password" });
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return reply(res, 401, { error: "Invalid email or password" });
    }

    if (user.accountStatus === "SUSPENDED") {
      return reply(res, 403, { error: "Account has been suspended. Please contact support." });
    }

    // Role check if specified
    if (role && user.role !== role) {
      return reply(res, 403, {
        error: `Invalid credentials for ${role} portal. Your account is registered as ${user.role}.`,
      });
    }

    let customerId: string | undefined;
    let sahaId: string | undefined;
    let approvalStatus: string | undefined;

    if (user.role === "CUSTOMER") {
      const cust = await getCustomerByUserId(user.userId);
      customerId = cust?.customerId;
    } else if (user.role === "SAHA") {
      const saha = await getSahaByUserId(user.userId);
      sahaId = saha?.sahaId;
      approvalStatus = saha?.approvalStatus;

      if (saha?.approvalStatus === "PENDING_REVIEW") {
        return reply(res, 403, {
          code: "PENDING_APPROVAL",
          error: "Your application is under review. ApnaCare operations will verify your documents within 48 hours.",
        });
      }

      if (saha?.approvalStatus === "REJECTED") {
        return reply(res, 403, {
          code: "APPLICATION_REJECTED",
          error: "Your Saha application was not approved. Please contact ApnaCare support for assistance.",
        });
      }
    }

    const session = await createSession(user.userId, user.role as any, {
      name: user.fullName,
      mobile: user.phone,
      city: user.city,
      customerId,
      sahaId,
      accountStatus: user.accountStatus,
    });

    const cookieHeader = createSessionCookieHeader(session.sessionId);

    return reply(
      res,
      200,
      {
        success: true,
        user: {
          userId: user.userId,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          city: user.city,
          customerId,
          sahaId,
          approvalStatus,
        },
      },
      { "Set-Cookie": cookieHeader }
    );
  } catch (error) {
    console.error("[LoginV2] Error:", error);
    return reply(res, 500, { error: "Internal server error" });
  }
}

export async function POST(req: any, res?: any) {
  return handler(req, res);
}

