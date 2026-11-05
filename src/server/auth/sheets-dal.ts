import {
  UserRecord,
  AttendantRecord,
  AdminRecord,
  BookingRecord,
  AssignmentRecord,
  AvailabilityRecord,
  AttendanceRecord,
  ActivityLogRecord,
  AssignmentStatus,
} from "./types";
import { hashPassword } from "./password";

const APPS_SCRIPT_URL =
  process.env.APNACARE_OPERATIONS_SCRIPT_URL ||
  process.env.VITE_OPERATIONS_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbzdI6wjqeGAgTveEXBpPAtX3g2WHOX8f8P5nwu_Zkk9HzSPV9e5Gr7aozq_xhbdxC1KAQ/exec";

const DB_SECRET = process.env.APNACARE_DB_SECRET || "apnacare-ops-secret-2026";

/* ── In-Memory Database Store for Testing and Resilient Offline Execution ─ */
class InMemoryDb {
  users: Map<string, UserRecord> = new Map();
  attendants: Map<string, AttendantRecord> = new Map();
  admins: Map<string, AdminRecord> = new Map();
  bookings: Map<string, BookingRecord> = new Map();
  assignments: Map<string, AssignmentRecord> = new Map();
  availability: Map<string, AvailabilityRecord> = new Map();
  attendance: Map<string, AttendanceRecord> = new Map();
  activityLogs: ActivityLogRecord[] = [];
  initialized = false;

  async initDefaults() {
    if (this.initialized) return;
    this.initialized = true;

    // Seed default Super Admin
    const adminHash = await hashPassword("ApnaAdmin@2026!");
    const superAdmin: AdminRecord = {
      admin_id: "ADM-001",
      full_name: "ApnaCare Super Admin",
      email: "admin@apnacare.in",
      password_hash: adminHash,
      role: "super_admin",
      account_status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.admins.set(superAdmin.admin_id, superAdmin);

    // Seed sample verified Attendants for immediate matching
    const attendantHash = await hashPassword("SahaPass@2026!");
    const sampleAttendant1: AttendantRecord = {
      attendant_id: "ATT-BLR-01",
      full_name: "Lakshmi Priya",
      email: "lakshmi.saha@apnacare.in",
      phone: "+91 98450 12345",
      password_hash: attendantHash,
      gender: "female",
      city: "Bengaluru",
      address: "Indiranagar, Bengaluru, Karnataka",
      qualifications: "Certified Geriatric Attendant (B.Sc Nursing Convalescence)",
      experience: "5 years eldercare and post-stroke recovery",
      skills: ["Mobility Aid", "Vitals Tracking", "Hygiene Dignity", "Medication Management"],
      languages: ["Kannada", "Tamil", "English"],
      service_categories: ["Elderly Care", "Hospital Bedside Support", "Home Convalescence"],
      availability_status: "available",
      verification_status: "verified",
      account_status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const sampleAttendant2: AttendantRecord = {
      attendant_id: "ATT-CHN-02",
      full_name: "Ananya Sundaram",
      email: "ananya.saha@apnacare.in",
      phone: "+91 98401 23456",
      password_hash: attendantHash,
      gender: "female",
      city: "Chennai",
      address: "Adyar, Chennai, Tamil Nadu",
      qualifications: "Trained Japa & Postnatal Care Specialist (GNM Diploma)",
      experience: "4 years infant handling & post-operative bedside aid",
      skills: ["Fourth Trimester Care", "Baby Oil Massage", "Post-Surgical Dressing"],
      languages: ["Tamil", "Telugu", "English"],
      service_categories: ["Post-Natal Care", "Clinical Nursing", "Hospital Bedside Support"],
      availability_status: "available",
      verification_status: "verified",
      account_status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.attendants.set(sampleAttendant1.attendant_id, sampleAttendant1);
    this.attendants.set(sampleAttendant2.attendant_id, sampleAttendant2);
  }
}

const memoryDb = new InMemoryDb();

/**
 * Execute a remote command against Google Apps Script if URL is present.
 */
async function remoteDispatch(action: string, payload: unknown): Promise<any | null> {
  if (!APPS_SCRIPT_URL) return null;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, secret: DB_SECRET, ...((payload as object) || {}) }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const json = await res.json();
    return json?.success ? json.data : null;
  } catch {
    return null;
  }
}

/* ── User Operations ─────────────────────────────────────────────── */

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  await memoryDb.initDefaults();
  const normalized = email.trim().toLowerCase();

  const remote = await remoteDispatch("findUserByEmail", { email: normalized });
  if (remote) return remote as UserRecord;

  for (const user of memoryDb.users.values()) {
    if (user.email.toLowerCase() === normalized) return user;
  }
  return null;
}

export async function getUserById(userId: string): Promise<UserRecord | null> {
  await memoryDb.initDefaults();
  const remote = await remoteDispatch("getUserById", { userId });
  if (remote) return remote as UserRecord;
  return memoryDb.users.get(userId) || null;
}

export async function createUser(
  data: Omit<UserRecord, "user_id" | "created_at" | "updated_at">
): Promise<UserRecord> {
  await memoryDb.initDefaults();
  const existing = await findUserByEmail(data.email);
  if (existing) {
    throw new Error("An account with this email address already exists.");
  }

  const userId = `USR-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;
  const now = new Date().toISOString();

  const user: UserRecord = {
    ...data,
    user_id: userId,
    email: data.email.trim().toLowerCase(),
    account_status: data.account_status || "active",
    email_verified: data.email_verified ?? true,
    created_at: now,
    updated_at: now,
  };

  memoryDb.users.set(user.user_id, user);
  await remoteDispatch("createUser", { user });
  return user;
}

export async function updateUser(
  userId: string,
  updates: Partial<UserRecord>
): Promise<UserRecord> {
  await memoryDb.initDefaults();
  const user = memoryDb.users.get(userId);
  if (!user) throw new Error("User not found");

  const updated: UserRecord = {
    ...user,
    ...updates,
    updated_at: new Date().toISOString(),
  };
  memoryDb.users.set(userId, updated);
  await remoteDispatch("updateUser", { userId, updates });
  return updated;
}

export async function getAllUsers(): Promise<UserRecord[]> {
  await memoryDb.initDefaults();
  const remote = await remoteDispatch("getAllUsers", {});
  if (Array.isArray(remote)) return remote;
  return Array.from(memoryDb.users.values());
}

/* ── Attendant (Saha) Operations ─────────────────────────────────── */

export async function findAttendantByEmail(email: string): Promise<AttendantRecord | null> {
  await memoryDb.initDefaults();
  const normalized = email.trim().toLowerCase();

  const remote = await remoteDispatch("findAttendantByEmail", { email: normalized });
  if (remote) return remote as AttendantRecord;

  for (const att of memoryDb.attendants.values()) {
    if (att.email.toLowerCase() === normalized) return att;
  }
  return null;
}

export async function getAttendantById(attendantId: string): Promise<AttendantRecord | null> {
  await memoryDb.initDefaults();
  const remote = await remoteDispatch("getAttendantById", { attendantId });
  if (remote) return remote as AttendantRecord;
  return memoryDb.attendants.get(attendantId) || null;
}

export async function createAttendant(
  data: Omit<AttendantRecord, "attendant_id" | "created_at" | "updated_at">
): Promise<AttendantRecord> {
  await memoryDb.initDefaults();
  const existing = await findAttendantByEmail(data.email);
  if (existing) {
    throw new Error("An attendant with this email address already exists.");
  }

  const attendantId = `ATT-${data.city.slice(0, 3).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
  const now = new Date().toISOString();

  const attendant: AttendantRecord = {
    ...data,
    attendant_id: attendantId,
    email: data.email.trim().toLowerCase(),
    availability_status: "available",
    verification_status: "pending",
    account_status: "pending_approval",
    created_at: now,
    updated_at: now,
  };

  memoryDb.attendants.set(attendant.attendant_id, attendant);
  await remoteDispatch("createAttendant", { attendant });
  return attendant;
}

export async function updateAttendant(
  attendantId: string,
  updates: Partial<AttendantRecord>
): Promise<AttendantRecord> {
  await memoryDb.initDefaults();
  const attendant = memoryDb.attendants.get(attendantId);
  if (!attendant) throw new Error("Attendant not found");

  const updated: AttendantRecord = {
    ...attendant,
    ...updates,
    updated_at: new Date().toISOString(),
  };
  memoryDb.attendants.set(attendantId, updated);
  await remoteDispatch("updateAttendant", { attendantId, updates });
  return updated;
}

export async function getAllAttendants(): Promise<AttendantRecord[]> {
  await memoryDb.initDefaults();
  const remote = await remoteDispatch("getAllAttendants", {});
  if (Array.isArray(remote)) return remote;
  return Array.from(memoryDb.attendants.values());
}

/* ── Admin Operations ────────────────────────────────────────────── */

export async function findAdminByEmail(email: string): Promise<AdminRecord | null> {
  await memoryDb.initDefaults();
  const normalized = email.trim().toLowerCase();

  const remote = await remoteDispatch("findAdminByEmail", { email: normalized });
  if (remote) return remote as AdminRecord;

  for (const admin of memoryDb.admins.values()) {
    if (admin.email.toLowerCase() === normalized) return admin;
  }
  return null;
}

export async function getAdminById(adminId: string): Promise<AdminRecord | null> {
  await memoryDb.initDefaults();
  return memoryDb.admins.get(adminId) || null;
}

/* ── Booking Operations ──────────────────────────────────────────── */

export async function createBooking(
  data: Omit<BookingRecord, "booking_id" | "created_at" | "updated_at">
): Promise<BookingRecord> {
  await memoryDb.initDefaults();
  const bookingId = `BK-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;
  const now = new Date().toISOString();

  const booking: BookingRecord = {
    ...data,
    booking_id: bookingId,
    booking_status: data.booking_status || "requested",
    created_at: now,
    updated_at: now,
  };

  memoryDb.bookings.set(booking.booking_id, booking);
  await remoteDispatch("createBooking", { booking });
  return booking;
}

export async function getAllBookings(): Promise<BookingRecord[]> {
  await memoryDb.initDefaults();
  const remote = await remoteDispatch("getAllBookings", {});
  if (Array.isArray(remote)) return remote;
  return Array.from(memoryDb.bookings.values());
}

export async function getUserBookings(userId: string): Promise<BookingRecord[]> {
  await memoryDb.initDefaults();
  const all = await getAllBookings();
  return all.filter((b) => b.user_id === userId);
}

export async function updateBooking(
  bookingId: string,
  updates: Partial<BookingRecord>
): Promise<BookingRecord> {
  await memoryDb.initDefaults();
  const booking = memoryDb.bookings.get(bookingId);
  if (!booking) throw new Error("Booking not found");

  const updated: BookingRecord = {
    ...booking,
    ...updates,
    updated_at: new Date().toISOString(),
  };
  memoryDb.bookings.set(bookingId, updated);
  await remoteDispatch("updateBooking", { bookingId, updates });
  return updated;
}

/* ── Assignment Operations ───────────────────────────────────────── */

export async function createAssignment(
  data: Omit<AssignmentRecord, "assignment_id" | "assigned_at">
): Promise<AssignmentRecord> {
  await memoryDb.initDefaults();
  const assignmentId = `ASN-${Date.now().toString(36).toUpperCase()}`;
  const now = new Date().toISOString();

  const assignment: AssignmentRecord = {
    ...data,
    assignment_id: assignmentId,
    assigned_at: now,
    assignment_status: "offered",
  };

  memoryDb.assignments.set(assignment.assignment_id, assignment);

  // Link attendant to booking
  const attendant = memoryDb.attendants.get(data.attendant_id);
  await updateBooking(data.booking_id, {
    booking_status: "assigned",
    assigned_attendant_id: data.attendant_id,
    assigned_attendant_name: attendant?.full_name,
  });

  await remoteDispatch("createAssignment", { assignment });
  return assignment;
}

export async function getAttendantAssignments(
  attendantId: string
): Promise<{ assignment: AssignmentRecord; booking: BookingRecord }[]> {
  await memoryDb.initDefaults();
  const results: { assignment: AssignmentRecord; booking: BookingRecord }[] = [];

  for (const asn of memoryDb.assignments.values()) {
    if (asn.attendant_id === attendantId) {
      const b = memoryDb.bookings.get(asn.booking_id);
      if (b) results.push({ assignment: asn, booking: b });
    }
  }
  return results;
}

export async function updateAssignmentStatus(
  assignmentId: string,
  status: AssignmentStatus,
  reason?: string
): Promise<AssignmentRecord> {
  await memoryDb.initDefaults();
  const asn = memoryDb.assignments.get(assignmentId);
  if (!asn) throw new Error("Assignment not found");

  const now = new Date().toISOString();
  asn.assignment_status = status;
  if (status === "accepted") asn.accepted_at = now;
  if (status === "rejected") {
    asn.rejected_at = now;
    asn.rejection_reason = reason;
  }

  memoryDb.assignments.set(assignmentId, asn);
  await remoteDispatch("updateAssignmentStatus", { assignmentId, status, reason });
  return asn;
}

/* ── Attendance Operations ───────────────────────────────────────── */

export async function checkInAttendant(
  bookingId: string,
  attendantId: string,
  location?: string
): Promise<AttendanceRecord> {
  await memoryDb.initDefaults();
  const attendanceId = `ATT-${Date.now().toString(36).toUpperCase()}`;
  const now = new Date().toISOString();

  const record: AttendanceRecord = {
    attendance_id: attendanceId,
    booking_id: bookingId,
    attendant_id: attendantId,
    check_in_time: now,
    check_in_location: location || "Assigned Customer Residence / Hospital Ward",
    attendance_status: "checked_in",
  };

  memoryDb.attendance.set(attendanceId, record);
  await remoteDispatch("checkInAttendant", { record });
  return record;
}

export async function checkOutAttendant(
  bookingId: string,
  attendantId: string,
  location?: string
): Promise<AttendanceRecord> {
  await memoryDb.initDefaults();
  // Find active check-in
  let target: AttendanceRecord | undefined;
  for (const rec of memoryDb.attendance.values()) {
    if (rec.booking_id === bookingId && rec.attendant_id === attendantId && !rec.check_out_time) {
      target = rec;
      break;
    }
  }

  const now = new Date().toISOString();
  if (!target) {
    // Create completed record
    target = {
      attendance_id: `ATT-${Date.now().toString(36).toUpperCase()}`,
      booking_id: bookingId,
      attendant_id: attendantId,
      check_in_time: new Date(Date.now() - 8 * 3600000).toISOString(),
      check_out_time: now,
      check_out_location: location || "Assigned Customer Residence",
      attendance_status: "checked_out",
      working_hours: 8,
    };
  } else {
    target.check_out_time = now;
    target.check_out_location = location || "Assigned Customer Residence";
    target.attendance_status = "checked_out";
    const hours = (new Date(now).getTime() - new Date(target.check_in_time).getTime()) / 3600000;
    target.working_hours = Math.round(hours * 10) / 10;
  }

  memoryDb.attendance.set(target.attendance_id, target);
  await remoteDispatch("checkOutAttendant", { record: target });
  return target;
}

export async function getAttendanceRecords(filter?: {
  attendantId?: string;
  bookingId?: string;
}): Promise<AttendanceRecord[]> {
  await memoryDb.initDefaults();
  const all = Array.from(memoryDb.attendance.values());
  if (!filter) return all;
  return all.filter((a) => {
    if (filter.attendantId && a.attendant_id !== filter.attendantId) return false;
    if (filter.bookingId && a.booking_id !== filter.bookingId) return false;
    return true;
  });
}

/* ── Availability Operations ─────────────────────────────────────── */

export async function setAttendantAvailability(
  attendantId: string,
  date: string,
  status: "available" | "unavailable"
): Promise<AvailabilityRecord> {
  await memoryDb.initDefaults();
  const id = `AVL-${attendantId}-${date}`;
  const record: AvailabilityRecord = {
    availability_id: id,
    attendant_id: attendantId,
    available_date: date,
    start_time: "08:00",
    end_time: "20:00",
    availability_status: status,
    updated_at: new Date().toISOString(),
  };
  memoryDb.availability.set(id, record);
  return record;
}

export async function getAttendantAvailability(
  attendantId: string
): Promise<AvailabilityRecord[]> {
  await memoryDb.initDefaults();
  const list: AvailabilityRecord[] = [];
  for (const av of memoryDb.availability.values()) {
    if (av.attendant_id === attendantId) list.push(av);
  }
  return list;
}

/* ── Admin Stats ─────────────────────────────────────────────────── */

export async function getAdminStats() {
  await memoryDb.initDefaults();
  const users = await getAllUsers();
  const attendants = await getAllAttendants();
  const bookings = await getAllBookings();

  const pendingApprovals = attendants.filter(
    (a) => a.account_status === "pending_approval" || a.verification_status === "pending"
  ).length;

  const activeBookings = bookings.filter(
    (b) => b.booking_status === "in_progress" || b.booking_status === "confirmed" || b.booking_status === "assigned"
  ).length;

  const completedBookings = bookings.filter((b) => b.booking_status === "completed").length;

  return {
    totalUsers: users.length,
    totalAttendants: attendants.length,
    pendingApprovals,
    totalBookings: bookings.length,
    activeBookings,
    completedBookings,
  };
}

export function resetMockStoreForTesting() {
  memoryDb.users.clear();
  memoryDb.attendants.clear();
  memoryDb.admins.clear();
  memoryDb.bookings.clear();
  memoryDb.assignments.clear();
  memoryDb.availability.clear();
  memoryDb.attendance.clear();
  memoryDb.activityLogs = [];
  memoryDb.initialized = false;
}
