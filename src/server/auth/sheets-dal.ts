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
  FamilyMemberRecord,
  CareTimelineEvent,
  DocumentRecord,
  SahaMatchCandidate,
  VerificationStatus,
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
  familyMembers: Map<string, FamilyMemberRecord> = new Map();
  timelineEvents: Map<string, CareTimelineEvent[]> = new Map();
  documents: Map<string, DocumentRecord> = new Map();
  activityLogs: ActivityLogRecord[] = [];
  initialized = false;

  async initDefaults() {
    if (this.initialized) return;
    this.initialized = true;

    // Seed default Super Admin
    const adminHash = await hashPassword("ApnaAdmin@2026!");
    const superAdmin: AdminRecord = {
      admin_id: "ADM-001",
      full_name: "LifeSakhi Super Admin",
      email: "admin@lifesakhi.in",
      password_hash: adminHash,
      role: "super_admin",
      account_status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.admins.set(superAdmin.admin_id, superAdmin);

    // Seed default Family User
    const userHash = await hashPassword("UserPass@2026!");
    const demoUser: UserRecord = {
      user_id: "USR-DEMO-001",
      full_name: "Priya Sharma",
      email: "user.test@lifesakhi.in",
      phone: "+91 98765 43210",
      password_hash: userHash,
      city: "Bengaluru",
      address: "Flat 402, Shanthi Heights, 12th Main, HAL 2nd Stage, Indiranagar, Bengaluru",
      account_status: "active",
      email_verified: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.users.set(demoUser.user_id, demoUser);

    // Seed Family Members for Priya Sharma
    const member1: FamilyMemberRecord = {
      member_id: "MEM-001",
      user_id: demoUser.user_id,
      full_name: "Saraswathi Sharma",
      relationship: "Mother",
      age: 78,
      gender: "Female",
      mobility_level: "walker_assisted",
      dietary_medical_notes: "Hypertension managed by morning amlodipine. Mild post-stroke left-side weakness. Requires walker support for bathroom visits and dignified sponge bathing.",
      primary_language: "Kannada, Tamil",
      emergency_contact: "+91 98765 43210",
      created_at: new Date().toISOString(),
    };
    const member2: FamilyMemberRecord = {
      member_id: "MEM-002",
      user_id: demoUser.user_id,
      full_name: "Ananya Sharma",
      relationship: "Daughter (Newborn)",
      age: 1,
      gender: "Female",
      mobility_level: "independent",
      dietary_medical_notes: "Fourth trimester baby handling, umbilical cord hygiene, daily gentle massage, and pediatric vaccination routine.",
      primary_language: "English",
      emergency_contact: "+91 98765 43210",
      created_at: new Date().toISOString(),
    };
    this.familyMembers.set(member1.member_id, member1);
    this.familyMembers.set(member2.member_id, member2);

    // Seed sample verified Attendants for immediate matching
    const attendantHash = await hashPassword("SahaPass@2026!");
    const sampleAttendant1: AttendantRecord = {
      attendant_id: "ATT-BLR-01",
      full_name: "Lakshmi Priya",
      email: "lakshmi.saha@lifesakhi.in",
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
      email: "ananya.saha@lifesakhi.in",
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

    const sampleAttendant3: AttendantRecord = {
      attendant_id: "ATT-BLR-03",
      full_name: "Kavitha Murthy",
      email: "kavitha.saha@lifesakhi.in",
      phone: "+91 98840 77123",
      password_hash: attendantHash,
      gender: "female",
      city: "Bengaluru",
      address: "Koramangala, Bengaluru, Karnataka",
      qualifications: "Certified Japa Care Specialist & Mother-Baby Nurse",
      experience: "6 years maternal & neonatal daily care",
      skills: ["Fourth Trimester Care", "Infant Feeding & Hygiene", "Postnatal Bathing", "Newborn Care"],
      languages: ["Kannada", "Tamil", "Telugu", "English"],
      service_categories: ["Post-Natal Care", "Newborn Care", "Home Convalescence"],
      availability_status: "available",
      verification_status: "verified",
      account_status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const sampleAttendant4: AttendantRecord = {
      attendant_id: "ATT-BLR-04",
      full_name: "Meenakshi Rao",
      email: "meenakshi.saha@lifesakhi.in",
      phone: "+91 99012 34567",
      password_hash: attendantHash,
      gender: "female",
      city: "Bengaluru",
      address: "Jayanagar, Bengaluru, Karnataka",
      qualifications: "Diploma in Nursing Assistance (DNA)",
      experience: "2 years hospital ward assistant",
      skills: ["Bedside Transfer", "Patient Bathing", "Vital Signs"],
      languages: ["Kannada", "Hindi"],
      service_categories: ["Elderly Care", "Hospital Bedside Support"],
      availability_status: "available",
      verification_status: "pending",
      account_status: "pending_approval",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.attendants.set(sampleAttendant1.attendant_id, sampleAttendant1);
    this.attendants.set(sampleAttendant2.attendant_id, sampleAttendant2);
    this.attendants.set(sampleAttendant3.attendant_id, sampleAttendant3);
    this.attendants.set(sampleAttendant4.attendant_id, sampleAttendant4);

    // Seed verification documents for Meenakshi Rao (pending review)
    const doc1: DocumentRecord = {
      document_id: "DOC-MR-01",
      owner_id: sampleAttendant4.attendant_id,
      owner_type: "attendant",
      document_type: "id_proof",
      file_url: "/docs/meenakshi_aadhaar.pdf",
      verification_status: "pending",
      uploaded_at: new Date().toISOString(),
    };
    const doc2: DocumentRecord = {
      document_id: "DOC-MR-02",
      owner_id: sampleAttendant4.attendant_id,
      owner_type: "attendant",
      document_type: "police_verification",
      file_url: "/docs/meenakshi_police_clearance.pdf",
      verification_status: "pending",
      uploaded_at: new Date().toISOString(),
    };
    this.documents.set(doc1.document_id, doc1);
    this.documents.set(doc2.document_id, doc2);

    // Seed initial active bookings
    const activeBooking: BookingRecord = {
      booking_id: "BK-BLR-101",
      user_id: demoUser.user_id,
      customer_name: "Priya Sharma",
      customer_phone: "+91 98765 43210",
      service_category: "Elderly Care",
      service_type: "Dedicated Bedside Companion & Mobility Support",
      patient_details: "Saraswathi Sharma (78 yrs, Mother, Walker-assisted)",
      patient_member_id: member1.member_id,
      city: "Bengaluru",
      service_location: "Indiranagar 2nd Stage, Bengaluru",
      start_date: new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10),
      start_time: "08:00 AM",
      end_date: new Date(Date.now() + 12 * 86400000).toISOString().slice(0, 10),
      end_time: "08:00 PM",
      duration: "14 Days (12 hrs/day)",
      special_requirements: "Bathing assistance, morning vital signs logging, low sodium meal supervision.",
      booking_status: "in_progress",
      assigned_attendant_id: sampleAttendant1.attendant_id,
      assigned_attendant_name: sampleAttendant1.full_name,
      created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    };

    const requestedBooking: BookingRecord = {
      booking_id: "BK-BLR-102",
      user_id: demoUser.user_id,
      customer_name: "Priya Sharma",
      customer_phone: "+91 98765 43210",
      service_category: "Post-Natal Care",
      service_type: "Japa Mother & Newborn Care",
      patient_details: "Ananya Sharma (1 yr, Infant)",
      patient_member_id: member2.member_id,
      city: "Bengaluru",
      service_location: "Indiranagar 2nd Stage, Bengaluru",
      start_date: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
      start_time: "09:00 AM",
      end_date: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
      end_time: "07:00 PM",
      duration: "30 Days (10 hrs/day)",
      special_requirements: "Infant hygiene, daily oil bath, mother lactation assistance.",
      booking_status: "requested",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.bookings.set(activeBooking.booking_id, activeBooking);
    this.bookings.set(requestedBooking.booking_id, requestedBooking);

    // Seed active assignment for Lakshmi Priya
    const assignment1: AssignmentRecord = {
      assignment_id: "ASN-BLR-101",
      booking_id: activeBooking.booking_id,
      attendant_id: sampleAttendant1.attendant_id,
      assigned_by: superAdmin.admin_id,
      assignment_status: "accepted",
      assigned_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      accepted_at: new Date(Date.now() - 2 * 86400000 + 1800000).toISOString(),
    };
    this.assignments.set(assignment1.assignment_id, assignment1);

    // Seed initial attendance check-in
    const attendance1: AttendanceRecord = {
      attendance_id: "ATT-REC-101",
      booking_id: activeBooking.booking_id,
      attendant_id: sampleAttendant1.attendant_id,
      check_in_time: new Date(Date.now() - 3 * 3600000).toISOString(),
      check_in_location: "Indiranagar 2nd Stage, Bengaluru (Residence)",
      attendance_status: "checked_in",
    };
    this.attendance.set(attendance1.attendance_id, attendance1);

    // Seed timeline events for active booking
    this.timelineEvents.set(activeBooking.booking_id, [
      {
        event_id: "EVT-01",
        booking_id: activeBooking.booking_id,
        event_type: "request_submitted",
        title: "Care Request Submitted",
        description: "Family initiated 14-day elderly companion request for Saraswathi Sharma.",
        actor: "family",
        actor_name: "Priya Sharma",
        timestamp: activeBooking.created_at,
      },
      {
        event_id: "EVT-02",
        booking_id: activeBooking.booking_id,
        event_type: "saha_allocated",
        title: "Saha Companion Allocated",
        description: "Admin Operations matched Lakshmi Priya (Indiranagar Geriatric Specialist).",
        actor: "admin",
        actor_name: "Central Ops Desk",
        timestamp: assignment1.assigned_at,
      },
      {
        event_id: "EVT-03",
        booking_id: activeBooking.booking_id,
        event_type: "saha_accepted",
        title: "Assignment Confirmed",
        description: "Lakshmi Priya accepted duty shift.",
        actor: "saha",
        actor_name: "Lakshmi Priya",
        timestamp: assignment1.accepted_at || new Date().toISOString(),
      },
      {
        event_id: "EVT-04",
        booking_id: activeBooking.booking_id,
        event_type: "service_started",
        title: "Care Service In Progress",
        description: "Daily shift check-in recorded. Vitals and mobility aid in progress.",
        actor: "saha",
        actor_name: "Lakshmi Priya",
        timestamp: attendance1.check_in_time,
      },
    ]);
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
    const userEmail = user.email.toLowerCase();
    if (
      userEmail === normalized ||
      userEmail.replace("@lifesakhi.in", "@apnacare.in") === normalized ||
      userEmail.replace("@apnacare.in", "@lifesakhi.in") === normalized
    ) {
      return user;
    }
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
    const attEmail = att.email.toLowerCase();
    if (
      attEmail === normalized ||
      attEmail.replace("@lifesakhi.in", "@apnacare.in") === normalized ||
      attEmail.replace("@apnacare.in", "@lifesakhi.in") === normalized
    ) {
      return att;
    }
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
    const adminEmail = admin.email.toLowerCase();
    if (
      adminEmail === normalized ||
      adminEmail.replace("@lifesakhi.in", "@apnacare.in") === normalized ||
      adminEmail.replace("@apnacare.in", "@lifesakhi.in") === normalized
    ) {
      return admin;
    }
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

  // Auto-record initial timeline event
  const initialEvent: CareTimelineEvent = {
    event_id: `EVT-${Date.now().toString(36).toUpperCase()}`,
    booking_id: booking.booking_id,
    event_type: "request_submitted",
    title: "Care Request Submitted",
    description: `Care service (${booking.service_category}) requested for ${booking.customer_name}. Awaiting clinical coordinator review.`,
    actor: "family",
    actor_name: booking.customer_name,
    timestamp: now,
  };
  memoryDb.timelineEvents.set(booking.booking_id, [initialEvent]);

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

  // Auto-record allocation timeline event
  const assignEvent: CareTimelineEvent = {
    event_id: `EVT-${Date.now().toString(36).toUpperCase()}`,
    booking_id: data.booking_id,
    event_type: "saha_allocated",
    title: "Saha Companion Allocated",
    description: `Operations desk allocated verified companion ${attendant?.full_name || "Saha Specialist"}. Awaiting attendant duty confirmation.`,
    actor: "admin",
    actor_name: "Operations Desk",
    timestamp: now,
  };
  const list = memoryDb.timelineEvents.get(data.booking_id) || [];
  list.push(assignEvent);
  memoryDb.timelineEvents.set(data.booking_id, list);

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
  if (status === "accepted") {
    asn.accepted_at = now;
    await updateBooking(asn.booking_id, { booking_status: "confirmed" });
    const acceptEvent: CareTimelineEvent = {
      event_id: `EVT-${Date.now().toString(36).toUpperCase()}`,
      booking_id: asn.booking_id,
      event_type: "saha_accepted",
      title: "Duty Shift Confirmed",
      description: "Assigned Saha companion confirmed availability and accepted schedule.",
      actor: "saha",
      timestamp: now,
    };
    const list = memoryDb.timelineEvents.get(asn.booking_id) || [];
    list.push(acceptEvent);
    memoryDb.timelineEvents.set(asn.booking_id, list);
  }
  if (status === "rejected") {
    asn.rejected_at = now;
    asn.rejection_reason = reason;
    await updateBooking(asn.booking_id, {
      booking_status: "requested",
      assigned_attendant_id: undefined,
      assigned_attendant_name: undefined,
    });
    const declineEvent: CareTimelineEvent = {
      event_id: `EVT-${Date.now().toString(36).toUpperCase()}`,
      booking_id: asn.booking_id,
      event_type: "under_review",
      title: "Assignment Declined — Re-allocation Required",
      description: `Attendant declined assignment (${reason || "Scheduling conflict"}). Re-routed to coordinator queue.`,
      actor: "saha",
      timestamp: now,
    };
    const list = memoryDb.timelineEvents.get(asn.booking_id) || [];
    list.push(declineEvent);
    memoryDb.timelineEvents.set(asn.booking_id, list);
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

/* ── Family Members Operations ────────────────────────────────── */

export async function getFamilyMembers(userId: string): Promise<FamilyMemberRecord[]> {
  await memoryDb.initDefaults();
  const members: FamilyMemberRecord[] = [];
  for (const m of memoryDb.familyMembers.values()) {
    if (m.user_id === userId) members.push(m);
  }
  return members;
}

export async function createFamilyMember(
  data: Omit<FamilyMemberRecord, "member_id" | "created_at">
): Promise<FamilyMemberRecord> {
  await memoryDb.initDefaults();
  const id = `MEM-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;
  const member: FamilyMemberRecord = {
    ...data,
    member_id: id,
    created_at: new Date().toISOString(),
  };
  memoryDb.familyMembers.set(id, member);
  return member;
}

export async function deleteFamilyMember(userId: string, memberId: string): Promise<boolean> {
  await memoryDb.initDefaults();
  const member = memoryDb.familyMembers.get(memberId);
  if (member && member.user_id === userId) {
    memoryDb.familyMembers.delete(memberId);
    return true;
  }
  return false;
}

/* ── Care Timeline Operations ─────────────────────────────────── */

export async function getTimelineEvents(bookingId: string): Promise<CareTimelineEvent[]> {
  await memoryDb.initDefaults();
  const events = memoryDb.timelineEvents.get(bookingId) || [];
  return [...events].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
}

export async function addTimelineEvent(
  event: Omit<CareTimelineEvent, "event_id" | "timestamp">
): Promise<CareTimelineEvent> {
  await memoryDb.initDefaults();
  const fullEvent: CareTimelineEvent = {
    ...event,
    event_id: `EVT-${Date.now().toString(36).toUpperCase()}`,
    timestamp: new Date().toISOString(),
  };
  const list = memoryDb.timelineEvents.get(event.booking_id) || [];
  list.push(fullEvent);
  memoryDb.timelineEvents.set(event.booking_id, list);
  return fullEvent;
}

/* ── Documents Operations ─────────────────────────────────────── */

export async function getDocumentsByAttendant(attendantId: string): Promise<DocumentRecord[]> {
  await memoryDb.initDefaults();
  const docs: DocumentRecord[] = [];
  for (const d of memoryDb.documents.values()) {
    if (d.owner_id === attendantId) docs.push(d);
  }
  return docs;
}

export async function getAllPendingDocuments(): Promise<DocumentRecord[]> {
  await memoryDb.initDefaults();
  const docs: DocumentRecord[] = [];
  for (const d of memoryDb.documents.values()) {
    if (d.verification_status === "pending") docs.push(d);
  }
  return docs;
}

export async function verifyDocument(
  documentId: string,
  status: VerificationStatus,
  verifiedBy?: string
): Promise<DocumentRecord> {
  await memoryDb.initDefaults();
  const doc = memoryDb.documents.get(documentId);
  if (!doc) throw new Error("Document not found: " + documentId);

  doc.verification_status = status;
  doc.verified_by = verifiedBy || "Admin Operations";
  doc.verified_at = new Date().toISOString();
  memoryDb.documents.set(documentId, doc);
  return doc;
}

/* ── Assisted Saha Allocation Engine ─────────────────────────── */

export async function findMatchingAttendants(bookingId: string): Promise<SahaMatchCandidate[]> {
  await memoryDb.initDefaults();
  const booking = memoryDb.bookings.get(bookingId);
  if (!booking) throw new Error("Booking not found: " + bookingId);

  const attendants = await getAllAttendants();
  const candidates: SahaMatchCandidate[] = [];

  for (const att of attendants) {
    let score = 0;
    const matchReasons: string[] = [];
    let isEligible = true;
    let conflictWarning: string | undefined;

    // 1. Mandatory verification check
    if (att.verification_status !== "verified" || att.account_status !== "active") {
      isEligible = false;
      conflictWarning = "Verification pending: Mandatory police check and credential verification required before duty allocation.";
    } else {
      score += 25;
      matchReasons.push("Police & Identity Verified (Level-3 Checked)");
    }

    // 2. City & Location Compatibility
    if (att.city.toLowerCase() === booking.city.toLowerCase()) {
      score += 30;
      matchReasons.push(`City Match: Located in ${att.city}`);
      if (
        booking.service_location &&
        att.address &&
        booking.service_location.toLowerCase().includes(att.city.toLowerCase())
      ) {
        score += 10;
        matchReasons.push("Micro-cluster Proximity (<30 min transit radius)");
      }
    } else {
      isEligible = false;
      conflictWarning = `Geographic Incompatibility: Attendant in ${att.city}, service in ${booking.city}`;
    }

    // 3. Service Category & Skills Compatibility
    const categoryMatches = att.service_categories.some(
      (cat) =>
        cat.toLowerCase().includes(booking.service_category.toLowerCase()) ||
        booking.service_category.toLowerCase().includes(cat.toLowerCase())
    );
    if (categoryMatches) {
      score += 25;
      matchReasons.push(`Certified Specialist in ${booking.service_category}`);
    } else {
      const hasSkill = att.skills.some((sk) =>
        sk.toLowerCase().includes(booking.service_category.toLowerCase().split(" ")[0])
      );
      if (hasSkill) {
        score += 15;
        matchReasons.push("Related clinical caregiving skills matched");
      }
    }

    // 4. Availability & Double Booking Prevention
    if (att.availability_status === "on_leave") {
      isEligible = false;
      conflictWarning = "Attendant is currently marked on temporary leave";
    }

    for (const asn of memoryDb.assignments.values()) {
      if (
        asn.attendant_id === att.attendant_id &&
        (asn.assignment_status === "accepted" || asn.assignment_status === "offered")
      ) {
        const existingBooking = memoryDb.bookings.get(asn.booking_id);
        if (
          existingBooking &&
          existingBooking.booking_id !== booking.booking_id &&
          existingBooking.booking_status !== "completed" &&
          existingBooking.booking_status !== "cancelled"
        ) {
          if (
            existingBooking.start_date <= booking.end_date &&
            existingBooking.end_date >= booking.start_date
          ) {
            score -= 20;
            conflictWarning = `Active duty conflict: Currently assigned to ${existingBooking.booking_id} until ${existingBooking.end_date}`;
            if (asn.assignment_status === "accepted") {
              isEligible = false;
            }
          }
        }
      }
    }

    if (isEligible && !conflictWarning) {
      score += 10;
      matchReasons.push("Shift Availability Confirmed (Zero schedule conflicts)");
    }

    candidates.push({
      attendant: att,
      score: Math.max(0, Math.min(100, score)),
      isEligible,
      matchReasons,
      conflictWarning,
    });
  }

  return candidates.sort((a, b) => {
    if (a.isEligible && !b.isEligible) return -1;
    if (!a.isEligible && b.isEligible) return 1;
    return b.score - a.score;
  });
}

export function resetMockStoreForTesting() {
  memoryDb.users.clear();
  memoryDb.attendants.clear();
  memoryDb.admins.clear();
  memoryDb.bookings.clear();
  memoryDb.assignments.clear();
  memoryDb.availability.clear();
  memoryDb.attendance.clear();
  memoryDb.familyMembers.clear();
  memoryDb.timelineEvents.clear();
  memoryDb.documents.clear();
  memoryDb.activityLogs = [];
  memoryDb.initialized = false;
}
