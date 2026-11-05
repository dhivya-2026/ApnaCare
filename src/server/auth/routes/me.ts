import { getSessionFromRequest } from "../simple-session";
import { getCustomerByUserId, getSahaByUserId } from "../sheets-dal";
import { reply } from "../utils";

export default async function handler(req: any, res?: any) {
  const method = (req.method || (req instanceof Request ? req.method : "GET")).toUpperCase();
  if (method !== "GET") {
    return reply(res, 405, { error: "Method Not Allowed" });
  }

  try {
    const session = getSessionFromRequest(req);
    if (!session || !session.userId) {
      return reply(res, 401, { authenticated: false, error: "Not authenticated" });
    }

    let customerProfile = null;
    let sahaProfile = null;

    if (session.role === "CUSTOMER") {
      try {
        customerProfile = await getCustomerByUserId(session.userId);
      } catch (e) {
        console.warn("[AuthMe] getCustomer error:", e);
      }
    } else if (session.role === "SAHA" || session.role === "attendant") {
      try {
        sahaProfile = await getSahaByUserId(session.userId);
      } catch (e) {
        console.warn("[AuthMe] getSaha error:", e);
      }
    }

    return reply(res, 200, {
      authenticated: true,
      user: {
        userId: session.userId,
        fullName: session.fullName,
        email: session.email,
        phone: session.phone || "",
        role: session.role,
        city: session.city || "",
        customerId: session.customerId,
        sahaId: session.sahaId,
      },
      customer: customerProfile,
      saha: sahaProfile,
    });
  } catch (error) {
    console.error("[AuthMe] Error:", error);
    return reply(res, 500, { authenticated: false, error: "Internal server error" });
  }
}

export async function GET(req: any, res?: any) {
  return handler(req, res);
}
