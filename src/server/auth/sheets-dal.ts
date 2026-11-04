/**
 * ApnaCare Google Sheets Data Access Layer (DAL)
 *
 * All reads and writes to the Google Sheets database go through this file.
 * Never expose the service account credentials or Sheets ID to the client.
 *
 * Sheet: ApnaCare_Operations_Database
 * Tabs: Users | Customers | Sahas | Saha_Documents | Saha_Availability |
 *       Bookings | Assignments | Attendance | Leave_Requests | Notifications |
 *       Audit_Logs | System_Config
 *
 * Architecture: Uses the Google Apps Script Web App as a secured relay.
 * The GAS script checks a server-side secret key in the Authorization header
 * before accepting writes, so the VITE_ public key is only for read-like
 * anonymous submissions. All auth-sensitive operations use the server GAS URL.
 */

const GAS_URL = process.env.GOOGLE_APPS_SCRIPT_URL || process.env.VITE_GOOGLE_APPS_SCRIPT_URL || "";
const GAS_SECRET = process.env.GOOGLE_APPS_SCRIPT_SECRET || "";

// ── Low-level request helpers ─────────────────────────────────────────────────

async function gasRead(tab: string, query?: Record<string, string>): Promise<any[]> {
  if (!GAS_URL) {
    console.warn("[DAL] GAS_URL not configured — returning empty array");
    return [];
  }

  const params = new URLSearchParams({ action: "read", tab });
  if (query) {
    Object.entries(query).forEach(([k, v]) => params.set(k, v));
  }
  if (GAS_SECRET) {
    params.set("secret", GAS_SECRET);
  }

  const res = await fetch(`${GAS_URL}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${GAS_SECRET}`,
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    throw new Error(`[DAL] GAS read error: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  return Array.isArray(data) ? data : data.rows || [];
}

async function gasWrite(tab: string, row: Record<string, string>): Promise<{ success: boolean; id?: string }> {
  if (!GAS_URL) {
    console.warn("[DAL] GAS_URL not configured — write skipped");
    return { success: false };
  }

  const res = await fetch(GAS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GAS_SECRET}`,
    },
    body: JSON.stringify({ action: "write", tab, row, secret: GAS_SECRET }),
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    throw new Error(`[DAL] GAS write error: ${res.status} ${await res.text()}`);
  }

  return res.json();
}

async function gasUpdate(tab: string, id: string, idField: string, updates: Record<string, string>): Promise<boolean> {
  if (!GAS_URL) {
    console.warn("[DAL] GAS_URL not configured — update skipped");
    return false;
  }

  const res = await fetch(GAS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GAS_SECRET}`,
    },
    body: JSON.stringify({ action: "update", tab, id, idField, updates, secret: GAS_SECRET }),
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    throw new Error(`[DAL] GAS update error: ${res.status} ${await res.text()}`);
  }

  const result = await res.json();
  return result.success === true;
}

// ── Users ─────────────────────────────────────────────────────────────────────

export async function findUserByEmail(email: string): Promise<any | null> {
  const rows = await gasRead("Users", { filter_email: email.toLowerCase().trim() });
  return rows.find((r) => r.email?.toLowerCase() === email.toLowerCase().trim()) || null;
}

export async function findUserByPhone(phone: string): Promise<any | null> {
  const normalized = phone.replace(/\D/g, "").slice(-10);
  const rows = await gasRead("Users", { filter_phone: normalized });
  return rows.find((r) => r.phone?.replace(/\D/g, "").endsWith(normalized)) || null;
}

export async function findUserById(userId: string): Promise<any | null> {
  const rows = await gasRead("Users", { filter_user_id: userId });
  return rows.find((r) => r.user_id === userId) || null;
}

export async function createUser(user: {
  user_id: string;
  email: string;
  phone: string;
  full_name: string;
  role: string;
  password_hash: string;
  password_salt: string;
  account_status: string;
  email_verified: string;
  created_at: string;
  updated_at: string;
}): Promise<boolean> {
  const result = await gasWrite("Users", user as Record<string, string>);
  return result.success;
}

export async function updateUserStatus(userId: string, status: string, updatedAt: string): Promise<boolean> {
  return gasUpdate("Users", userId, "user_id", { account_status: status, updated_at: updatedAt });
}

// ── Customers ─────────────────────────────────────────────────────────────────

export async function findCustomerByUserId(userId: string): Promise<any | null> {
  const rows = await gasRead("Customers", { filter_user_id: userId });
  return rows.find((r) => r.user_id === userId) || null;
}

export async function findCustomerById(customerId: string): Promise<any | null> {
  const rows = await gasRead("Customers", { filter_customer_id: customerId });
  return rows.find((r) => r.customer_id === customerId) || null;
}

export async function createCustomer(customer: Record<string, string>): Promise<boolean> {
  const result = await gasWrite("Customers", customer);
  return result.success;
}

export async function updateCustomer(customerId: string, updates: Record<string, string>): Promise<boolean> {
  return gasUpdate("Customers", customerId, "customer_id", updates);
}

export async function getAllCustomers(): Promise<any[]> {
  return gasRead("Customers");
}

// ── Sahas ─────────────────────────────────────────────────────────────────────

export async function findSahaByUserId(userId: string): Promise<any | null> {
  const rows = await gasRead("Sahas", { filter_user_id: userId });
  return rows.find((r) => r.user_id === userId) || null;
}

export async function findSahaById(sahaId: string): Promise<any | null> {
  const rows = await gasRead("Sahas", { filter_saha_id: sahaId });
  return rows.find((r) => r.saha_id === sahaId) || null;
}

export async function createSaha(saha: Record<string, string>): Promise<boolean> {
  const result = await gasWrite("Sahas", saha);
  return result.success;
}

export async function updateSaha(sahaId: string, updates: Record<string, string>): Promise<boolean> {
  return gasUpdate("Sahas", sahaId, "saha_id", updates);
}

export async function getAllSahas(filters?: { city?: string; approval_status?: string; verification_status?: string }): Promise<any[]> {
  const query: Record<string, string> = {};
  if (filters?.city) query.filter_city = filters.city;
  if (filters?.approval_status) query.filter_approval_status = filters.approval_status;
  if (filters?.verification_status) query.filter_verification_status = filters.verification_status;
  return gasRead("Sahas", Object.keys(query).length ? query : undefined);
}

// ── Bookings ──────────────────────────────────────────────────────────────────

export async function findBookingsByCustomerId(customerId: string): Promise<any[]> {
  const rows = await gasRead("Bookings", { filter_customer_id: customerId });
  return rows.filter((r) => r.customer_id === customerId);
}

export async function findBookingById(bookingId: string): Promise<any | null> {
  const rows = await gasRead("Bookings", { filter_booking_id: bookingId });
  return rows.find((r) => r.booking_id === bookingId) || null;
}

export async function createBooking(booking: Record<string, string>): Promise<boolean> {
  const result = await gasWrite("Bookings", booking);
  return result.success;
}

export async function updateBooking(bookingId: string, updates: Record<string, string>): Promise<boolean> {
  return gasUpdate("Bookings", bookingId, "booking_id", updates);
}

export async function getAllBookings(filters?: { city?: string; booking_status?: string; assigned_saha_id?: string }): Promise<any[]> {
  const query: Record<string, string> = {};
  if (filters?.city) query.filter_city = filters.city;
  if (filters?.booking_status) query.filter_booking_status = filters.booking_status;
  if (filters?.assigned_saha_id) query.filter_assigned_saha_id = filters.assigned_saha_id;
  return gasRead("Bookings", Object.keys(query).length ? query : undefined);
}

// ── Assignments ───────────────────────────────────────────────────────────────

export async function findAssignmentsBySahaId(sahaId: string): Promise<any[]> {
  const rows = await gasRead("Assignments", { filter_saha_id: sahaId });
  return rows.filter((r) => r.saha_id === sahaId);
}

export async function findAssignmentsByBookingId(bookingId: string): Promise<any[]> {
  const rows = await gasRead("Assignments", { filter_booking_id: bookingId });
  return rows.filter((r) => r.booking_id === bookingId);
}

export async function createAssignment(assignment: Record<string, string>): Promise<boolean> {
  const result = await gasWrite("Assignments", assignment);
  return result.success;
}

export async function updateAssignment(assignmentId: string, updates: Record<string, string>): Promise<boolean> {
  return gasUpdate("Assignments", assignmentId, "assignment_id", updates);
}

export async function getAllAssignments(): Promise<any[]> {
  return gasRead("Assignments");
}

// ── Attendance ────────────────────────────────────────────────────────────────

export async function findAttendanceBySahaId(sahaId: string): Promise<any[]> {
  const rows = await gasRead("Attendance", { filter_saha_id: sahaId });
  return rows.filter((r) => r.saha_id === sahaId);
}

export async function findAttendanceByDate(date: string): Promise<any[]> {
  const rows = await gasRead("Attendance", { filter_attendance_date: date });
  return rows.filter((r) => r.attendance_date === date);
}

export async function findAttendanceByAssignmentId(assignmentId: string): Promise<any[]> {
  const rows = await gasRead("Attendance", { filter_assignment_id: assignmentId });
  return rows.filter((r) => r.assignment_id === assignmentId);
}

export async function createAttendance(record: Record<string, string>): Promise<boolean> {
  const result = await gasWrite("Attendance", record);
  return result.success;
}

export async function updateAttendance(attendanceId: string, updates: Record<string, string>): Promise<boolean> {
  return gasUpdate("Attendance", attendanceId, "attendance_id", updates);
}

export async function getAllAttendance(filters?: { attendance_date?: string; saha_id?: string; booking_id?: string }): Promise<any[]> {
  const query: Record<string, string> = {};
  if (filters?.attendance_date) query.filter_attendance_date = filters.attendance_date;
  if (filters?.saha_id) query.filter_saha_id = filters.saha_id;
  if (filters?.booking_id) query.filter_booking_id = filters.booking_id;
  return gasRead("Attendance", Object.keys(query).length ? query : undefined);
}

// ── Saha Availability ─────────────────────────────────────────────────────────

export async function findAvailabilityBySahaId(sahaId: string): Promise<any[]> {
  const rows = await gasRead("Saha_Availability", { filter_saha_id: sahaId });
  return rows.filter((r) => r.saha_id === sahaId);
}

export async function createAvailability(record: Record<string, string>): Promise<boolean> {
  const result = await gasWrite("Saha_Availability", record);
  return result.success;
}

export async function updateAvailability(availabilityId: string, updates: Record<string, string>): Promise<boolean> {
  return gasUpdate("Saha_Availability", availabilityId, "availability_id", updates);
}

// ── Leave Requests ────────────────────────────────────────────────────────────

export async function findLeaveRequestsBySahaId(sahaId: string): Promise<any[]> {
  const rows = await gasRead("Leave_Requests", { filter_saha_id: sahaId });
  return rows.filter((r) => r.saha_id === sahaId);
}

export async function getAllLeaveRequests(): Promise<any[]> {
  return gasRead("Leave_Requests");
}

export async function createLeaveRequest(record: Record<string, string>): Promise<boolean> {
  const result = await gasWrite("Leave_Requests", record);
  return result.success;
}

export async function updateLeaveRequest(leaveId: string, updates: Record<string, string>): Promise<boolean> {
  return gasUpdate("Leave_Requests", leaveId, "leave_id", updates);
}

// ── Audit Log ─────────────────────────────────────────────────────────────────

export async function writeAuditLog(log: {
  log_id: string;
  actor_user_id: string;
  actor_role: string;
  action: string;
  entity_type: string;
  entity_id: string;
  previous_value?: string;
  new_value?: string;
  timestamp: string;
  request_reference?: string;
}): Promise<void> {
  // Audit log failures should never block the main operation
  try {
    await gasWrite("Audit_Logs", {
      log_id: log.log_id,
      actor_user_id: log.actor_user_id,
      actor_role: log.actor_role,
      action: log.action,
      entity_type: log.entity_type,
      entity_id: log.entity_id,
      previous_value: log.previous_value || "",
      new_value: log.new_value || "",
      timestamp: log.timestamp,
      request_reference: log.request_reference || "",
    });
  } catch (err) {
    console.error("[DAL] Audit log write failed:", err);
  }
}

