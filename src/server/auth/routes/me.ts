import { requireAuth } from "../../session/guard";
import {
  findUserById,
  getCustomerByUserId,
  getSahaByUserId,
} from "../sheets-dal";
import { reply } from "../utils";

export default async function handler(req: any, res?: any) {
  const method = (req.method || (req instanceof Request ? req.method : "GET")).toUpperCase();
  if (method !== "GET") {
    return reply(res, 405, { error: "Method Not Allowed" });
  }

  try {
    const auth = await requireAuth(req);
    if (!auth.authorized || !auth.session) {
      return reply(res, auth.status || 401, { error: auth.error || "Unauthorized" });
    }

    const { userId, role } = auth.session;
    const user = await findUserById(userId);

    if (!user) {
      return reply(res, 404, { error: "User not found" });
    }

    let customerProfile = null;
    let sahaProfile = null;

    if (role === "CUSTOMER") {
      customerProfile = await getCustomerByUserId(userId);
    } else if (role === "SAHA" || role === "attendant") {
      sahaProfile = await getSahaByUserId(userId);
    }

    return reply(res, 200, {
      authenticated: true,
      user: {
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        city: user.city,
        accountStatus: user.accountStatus,
        createdAt: user.createdAt,
      },
      customer: customerProfile,
      saha: sahaProfile,
    });
  } catch (error) {
    console.error("[AuthMe] Error:", error);
    return reply(res, 500, { error: "Internal server error" });
  }
}

