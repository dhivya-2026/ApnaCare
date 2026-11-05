import crypto from "node:crypto";
import type {
  UserRecord,
  CustomerProfile,
  SahaProfile,
  BookingRecord,
  AttendanceRecord,
  SahaStatus,
} from "./types";

const memoryStore = {
  users: new Map<string, UserRecord>(),
  usersByEmail: new Map<string, string>(), // email -> userId
  customers: new Map<string, CustomerProfile>(),
  customersByUserId: new Map<string, string>(), // userId -> customerId
  sahas: new Map<string, SahaProfile>(),
  sahasByUserId: new Map<string, string>(), // userId -> sahaId
  bookings: new Map<string, BookingRecord>(),
  attendance: new Map<string, AttendanceRecord>(),
};

function getOpsUrl(): string | undefined {
  return process.env.GOOGLE_APPS_SCRIPT_OPS_URL || process.env.VITE_GOOGLE_APPS_SCRIPT_OPS_URL;
}

function isSheetsEnabled(): boolean {
  return process.env.GOOGLE_SHEETS_ENABLED === "true" && !!getOpsUrl();
}

export async function callOpsSheet<T>(action: string, payload: unknown): Promise<{ success: boolean; data?: T; error?: string }> {
  const url = getOpsUrl();
  if (!url) {
    return { success: false, error: "GOOGLE_APPS_SCRIPT_OPS_URL not configured" };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action,
        payload,
        secret: process.env.ADMIN_PROVISION_SECRET || "",
      }),
    });

    if (!res.ok) {
      return { success: false, error: `HTTP ${res.status}` };
    }

    const data = await res.json();
    return data as { success: boolean; data?: T; error?: string };
  } catch (err) {
    console.warn(`[SheetsDAL] Request failed for action ${action}:`, err);
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// -------------------------------------------------------------
// USER OPERATIONS
// -------------------------------------------------------------

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const normalized = email.trim().toLowerCase();

  if (isSheetsEnabled()) {
    const res = await callOpsSheet<UserRecord>("GET_USER_BY_EMAIL", { email: normalized });
    if (res.success && res.data) {
      memoryStore.users.set(res.data.userId, res.data);
      memoryStore.usersByEmail.set(normalized, res.data.userId);
      return res.data;
    }
  }

  const userId = memoryStore.usersByEmail.get(normalized);
  if (!userId) return null;
  return memoryStore.users.get(userId) || null;
}

export async function findUserById(userId: string): Promise<UserRecord | null> {
  if (isSheetsEnabled()) {
    const res = await callOpsSheet<UserRecord>("GET_USER_BY_ID", { userId });
    if (res.success && res.data) {
      memoryStore.users.set(res.data.userId, res.data);
      return res.data;
    }
  }

  return memoryStore.users.get(userId) || null;
}

export async function createUser(
  data: Omit<UserRecord, "userId" | "createdAt" | "updatedAt">
): Promise<UserRecord> {
  const now = new Date().toISOString();
  const userId = `usr_${crypto.randomUUID().slice(0, 8)}`;
  const record: UserRecord = {
    ...data,
    userId,
    email: data.email.trim().toLowerCase(),
    createdAt: now,
    updatedAt: now,
  };

  memoryStore.users.set(userId, record);
  memoryStore.usersByEmail.set(record.email, userId);

  if (isSheetsEnabled()) {
    await callOpsSheet("CREATE_USER", record);
  }

  return record;
}

export async function updateUser(userId: string, updates: Partial<UserRecord>): Promise<void> {
  const existing = memoryStore.users.get(userId);
  if (existing) {
    const updated: UserRecord = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    memoryStore.users.set(userId, updated);
  }

  if (isSheetsEnabled()) {
    await callOpsSheet("UPDATE_USER", { userId, updates });
  }
}

// -------------------------------------------------------------
// CUSTOMER OPERATIONS
// -------------------------------------------------------------

export async function createCustomer(
  data: Omit<CustomerProfile, "customerId" | "createdAt">
): Promise<CustomerProfile> {
  const customerId = `cust_${crypto.randomUUID().slice(0, 8)}`;
  const record: CustomerProfile = {
    ...data,
    customerId,
    createdAt: new Date().toISOString(),
  };

  memoryStore.customers.set(customerId, record);
  memoryStore.customersByUserId.set(record.userId, customerId);

  if (isSheetsEnabled()) {
    await callOpsSheet("CREATE_CUSTOMER", record);
  }

  return record;
}

export async function getCustomerByUserId(userId: string): Promise<CustomerProfile | null> {
  if (isSheetsEnabled()) {
    const res = await callOpsSheet<CustomerProfile>("GET_CUSTOMER_BY_USER_ID", { userId });
    if (res.success && res.data) {
      memoryStore.customers.set(res.data.customerId, res.data);
      memoryStore.customersByUserId.set(userId, res.data.customerId);
      return res.data;
    }
  }

  const customerId = memoryStore.customersByUserId.get(userId);
  if (!customerId) return null;
  return memoryStore.customers.get(customerId) || null;
}

export async function updateCustomer(
  customerId: string,
  updates: Partial<CustomerProfile>
): Promise<void> {
  const existing = memoryStore.customers.get(customerId);
  if (existing) {
    memoryStore.customers.set(customerId, { ...existing, ...updates });
  }

  if (isSheetsEnabled()) {
    await callOpsSheet("UPDATE_CUSTOMER", { customerId, updates });
  }
}

export async function getAllCustomers(): Promise<CustomerProfile[]> {
  if (isSheetsEnabled()) {
    const res = await callOpsSheet<CustomerProfile[]>("GET_ALL_CUSTOMERS", {});
    if (res.success && Array.isArray(res.data)) {
      for (const c of res.data) {
        memoryStore.customers.set(c.customerId, c);
        memoryStore.customersByUserId.set(c.userId, c.customerId);
      }
      return res.data;
    }
  }

  return Array.from(memoryStore.customers.values());
}

// -------------------------------------------------------------
// SAHA OPERATIONS
// -------------------------------------------------------------

export async function createSaha(
  data: Omit<SahaProfile, "sahaId" | "createdAt" | "updatedAt">
): Promise<SahaProfile> {
  const now = new Date().toISOString();
  const sahaId = `saha_${crypto.randomUUID().slice(0, 8)}`;
  const record: SahaProfile = {
    ...data,
    sahaId,
    createdAt: now,
    updatedAt: now,
  };

  memoryStore.sahas.set(sahaId, record);
  memoryStore.sahasByUserId.set(record.userId, sahaId);

  if (isSheetsEnabled()) {
    await callOpsSheet("CREATE_SAHA", record);
  }

  return record;
}

export async function getSahaByUserId(userId: string): Promise<SahaProfile | null> {
  if (isSheetsEnabled()) {
    const res = await callOpsSheet<SahaProfile>("GET_SAHA_BY_USER_ID", { userId });
    if (res.success && res.data) {
      memoryStore.sahas.set(res.data.sahaId, res.data);
      memoryStore.sahasByUserId.set(userId, res.data.sahaId);
      return res.data;
    }
  }

  const sahaId = memoryStore.sahasByUserId.get(userId);
  if (!sahaId) return null;
  return memoryStore.sahas.get(sahaId) || null;
}

export async function getSahaById(sahaId: string): Promise<SahaProfile | null> {
  if (isSheetsEnabled()) {
    const res = await callOpsSheet<SahaProfile>("GET_SAHA_BY_ID", { sahaId });
    if (res.success && res.data) {
      memoryStore.sahas.set(res.data.sahaId, res.data);
      return res.data;
    }
  }

  return memoryStore.sahas.get(sahaId) || null;
}

export async function updateSahaStatus(sahaId: string, status: SahaStatus): Promise<void> {
  const existing = memoryStore.sahas.get(sahaId);
  if (existing) {
    memoryStore.sahas.set(sahaId, {
      ...existing,
      approvalStatus: status,
      updatedAt: new Date().toISOString(),
    });
  }

  if (isSheetsEnabled()) {
    await callOpsSheet("UPDATE_SAHA_STATUS", { sahaId, status });
  }
}

export async function updateSaha(sahaId: string, updates: Partial<SahaProfile>): Promise<void> {
  const existing = memoryStore.sahas.get(sahaId);
  if (existing) {
    memoryStore.sahas.set(sahaId, {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  }

  if (isSheetsEnabled()) {
    await callOpsSheet("UPDATE_SAHA", { sahaId, updates });
  }
}

export async function getAllSahas(): Promise<SahaProfile[]> {
  if (isSheetsEnabled()) {
    const res = await callOpsSheet<SahaProfile[]>("GET_ALL_SAHAS", {});
    if (res.success && Array.isArray(res.data)) {
      for (const s of res.data) {
        memoryStore.sahas.set(s.sahaId, s);
        memoryStore.sahasByUserId.set(s.userId, s.sahaId);
      }
      return res.data;
    }
  }

  return Array.from(memoryStore.sahas.values());
}

// -------------------------------------------------------------
// BOOKING OPERATIONS
// -------------------------------------------------------------

export async function createBooking(
  data: Omit<BookingRecord, "bookingId" | "createdAt" | "updatedAt">
): Promise<BookingRecord> {
  const now = new Date().toISOString();
  const bookingId = `bk_${crypto.randomUUID().slice(0, 8)}`;
  const record: BookingRecord = {
    ...data,
    bookingId,
    createdAt: now,
    updatedAt: now,
  };

  memoryStore.bookings.set(bookingId, record);

  if (isSheetsEnabled()) {
    await callOpsSheet("CREATE_BOOKING", record);
  }

  return record;
}

export async function getBookingsByCustomerId(customerId: string): Promise<BookingRecord[]> {
  if (isSheetsEnabled()) {
    const res = await callOpsSheet<BookingRecord[]>("GET_BOOKINGS_BY_CUSTOMER", { customerId });
    if (res.success && Array.isArray(res.data)) {
      for (const b of res.data) {
        memoryStore.bookings.set(b.bookingId, b);
      }
      return res.data;
    }
  }

  return Array.from(memoryStore.bookings.values()).filter((b) => b.customerId === customerId);
}

export async function getBookingsBySahaId(sahaId: string): Promise<BookingRecord[]> {
  if (isSheetsEnabled()) {
    const res = await callOpsSheet<BookingRecord[]>("GET_BOOKINGS_BY_SAHA", { sahaId });
    if (res.success && Array.isArray(res.data)) {
      for (const b of res.data) {
        memoryStore.bookings.set(b.bookingId, b);
      }
      return res.data;
    }
  }

  return Array.from(memoryStore.bookings.values()).filter((b) => b.assignedSahaId === sahaId);
}

export async function getAllBookings(): Promise<BookingRecord[]> {
  if (isSheetsEnabled()) {
    const res = await callOpsSheet<BookingRecord[]>("GET_ALL_BOOKINGS", {});
    if (res.success && Array.isArray(res.data)) {
      for (const b of res.data) {
        memoryStore.bookings.set(b.bookingId, b);
      }
      return res.data;
    }
  }

  return Array.from(memoryStore.bookings.values());
}

export async function updateBooking(
  bookingId: string,
  updates: Partial<BookingRecord>
): Promise<void> {
  const existing = memoryStore.bookings.get(bookingId);
  if (existing) {
    memoryStore.bookings.set(bookingId, {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  }

  if (isSheetsEnabled()) {
    await callOpsSheet("UPDATE_BOOKING", { bookingId, updates });
  }
}

// -------------------------------------------------------------
// ATTENDANCE OPERATIONS
// -------------------------------------------------------------

export async function createAttendance(
  data: Omit<AttendanceRecord, "attendanceId" | "createdAt">
): Promise<AttendanceRecord> {
  const attendanceId = `att_${crypto.randomUUID().slice(0, 8)}`;
  const record: AttendanceRecord = {
    ...data,
    attendanceId,
    createdAt: new Date().toISOString(),
  };

  memoryStore.attendance.set(attendanceId, record);

  if (isSheetsEnabled()) {
    await callOpsSheet("CREATE_ATTENDANCE", record);
  }

  return record;
}

export async function getAttendanceBySahaId(sahaId: string): Promise<AttendanceRecord[]> {
  if (isSheetsEnabled()) {
    const res = await callOpsSheet<AttendanceRecord[]>("GET_ATTENDANCE_BY_SAHA", { sahaId });
    if (res.success && Array.isArray(res.data)) {
      for (const a of res.data) {
        memoryStore.attendance.set(a.attendanceId, a);
      }
      return res.data;
    }
  }

  return Array.from(memoryStore.attendance.values()).filter((a) => a.sahaId === sahaId);
}

export async function getAllAttendance(): Promise<AttendanceRecord[]> {
  if (isSheetsEnabled()) {
    const res = await callOpsSheet<AttendanceRecord[]>("GET_ALL_ATTENDANCE", {});
    if (res.success && Array.isArray(res.data)) {
      for (const a of res.data) {
        memoryStore.attendance.set(a.attendanceId, a);
      }
      return res.data;
    }
  }

  return Array.from(memoryStore.attendance.values());
}

export async function correctAttendance(
  attendanceId: string,
  updates: Partial<AttendanceRecord>
): Promise<void> {
  const existing = memoryStore.attendance.get(attendanceId);
  if (existing) {
    memoryStore.attendance.set(attendanceId, { ...existing, ...updates });
  }

  if (isSheetsEnabled()) {
    await callOpsSheet("CORRECT_ATTENDANCE", { attendanceId, updates });
  }
}

