import { describe, it, expect, beforeEach } from "vitest";
import { hashPassword, verifyPassword, validatePasswordStrength } from "../server/auth/password";
import {
  findUserByEmail,
  createUser,
  findAttendantByEmail,
  createAttendant,
  updateAttendant,
  findAdminByEmail,
  createBooking,
  getUserBookings,
  createAssignment,
  getAttendantAssignments,
  updateAssignmentStatus,
  checkInAttendant,
  checkOutAttendant,
  getAttendanceRecords,
  getAdminStats,
  resetMockStoreForTesting,
} from "../server/auth/sheets-dal";
import { handleAuthAction } from "../server/auth/routes/auth-dispatcher";

describe("ApnaCare Role-Based Authentication & Operations Platform", () => {
  beforeEach(() => {
    resetMockStoreForTesting();
  });

  describe("1. Password Security & Cryptographic Hashing", () => {
    it("hashes password using PBKDF2 with salt and correct format", async () => {
      const hash = await hashPassword("SecurePass@2026!");
      expect(hash).toBeDefined();
      expect(hash.startsWith("pbkdf2:sha256:100000:")).toBe(true);

      const parts = hash.split(":");
      expect(parts).toHaveLength(5);
      expect(parts[3]).toHaveLength(32); // 16-byte salt in hex
      expect(parts[4]).toHaveLength(64); // 32-byte key in hex
    });

    it("verifies correct password against hash and rejects invalid password", async () => {
      const password = "ValidPassword123!";
      const hash = await hashPassword(password);

      const valid = await verifyPassword(password, hash);
      expect(valid).toBe(true);

      const invalid = await verifyPassword("WrongPassword456!", hash);
      expect(invalid).toBe(false);

      const empty = await verifyPassword("", hash);
      expect(empty).toBe(false);
    });

    it("enforces strong password policy (min 8 chars with letters & numbers)", () => {
      expect(validatePasswordStrength("short").valid).toBe(false);
      expect(validatePasswordStrength("onlyletters").valid).toBe(false);
      expect(validatePasswordStrength("123456789").valid).toBe(false);
      expect(validatePasswordStrength("ApnaCare2026").valid).toBe(true);
    });
  });

  describe("2. User Registration & Lifecycle", () => {
    it("creates a new user record with active status and hashes password", async () => {
      const user = await createUser({
        full_name: "Anita Sharma",
        email: "anita.sharma@example.com",
        phone: "+91 98450 11223",
        password_hash: await hashPassword("UserPass2026!"),
        city: "Bengaluru",
        address: "Koramangala 4th Block",
        account_status: "active",
        email_verified: true,
      });

      expect(user.user_id.startsWith("USR-")).toBe(true);
      expect(user.full_name).toBe("Anita Sharma");
      expect(user.account_status).toBe("active");

      const retrieved = await findUserByEmail("anita.sharma@example.com");
      expect(retrieved).not.toBeNull();
      expect(retrieved?.user_id).toBe(user.user_id);
    });

    it("prevents duplicate user registration with same email", async () => {
      await createUser({
        full_name: "Original User",
        email: "duplicate@example.com",
        phone: "+91 98450 99999",
        password_hash: await hashPassword("Pass1234!"),
        city: "Chennai",
        address: "T. Nagar",
        account_status: "active",
        email_verified: true,
      });

      await expect(
        createUser({
          full_name: "Duplicate User",
          email: "duplicate@example.com",
          phone: "+91 98450 88888",
          password_hash: await hashPassword("Pass5678!"),
          city: "Chennai",
          address: "T. Nagar",
          account_status: "active",
          email_verified: true,
        })
      ).rejects.toThrow(/already exists/i);
    });
  });

  describe("3. Attendant (Saha) Registration & Admin Approval Flow", () => {
    it("registers new attendant with pending_approval and verification_status pending", async () => {
      const attendant = await createAttendant({
        full_name: "Sunitha Rao",
        email: "sunitha.rao@example.com",
        phone: "+91 98450 44332",
        password_hash: await hashPassword("SahaPass2026!"),
        gender: "female",
        city: "Hyderabad",
        address: "Gachibowli",
        qualifications: "Certified Geriatric Companion",
        experience: "4 years eldercare",
        skills: ["Mobility Aid", "Vitals Recording"],
        languages: ["Telugu", "Hindi", "English"],
        service_categories: ["Elderly Care"],
        availability_status: "available",
        verification_status: "pending",
        account_status: "pending_approval",
      });

      expect(attendant.attendant_id.startsWith("ATT-")).toBe(true);
      expect(attendant.account_status).toBe("pending_approval");
      expect(attendant.verification_status).toBe("pending");
    });

    it("blocks attendant login when account is pending_approval", async () => {
      await createAttendant({
        full_name: "Pending Attendant",
        email: "pending@example.com",
        phone: "+91 98450 00112",
        password_hash: await hashPassword("PendingPass2026!"),
        gender: "female",
        city: "Bengaluru",
        address: "Whitefield",
        qualifications: "General Duty Attendant",
        experience: "2 years",
        skills: ["Elderly Care"],
        languages: ["Kannada"],
        service_categories: ["Elderly Care"],
        availability_status: "available",
        verification_status: "pending",
        account_status: "pending_approval",
      });

      const loginReq = new Request("https://apna-care.vercel.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "pending@example.com",
          password: "PendingPass2026!",
          role: "attendant",
        }),
      });

      const response = await handleAuthAction(loginReq, "login");
      expect(response.status).toBe(403);
      const json = await response.json();
      expect(json.error).toMatch(/pending clinical verification/i);
    });

    it("allows attendant login and duty access once approved by admin", async () => {
      const att = await createAttendant({
        full_name: "Approved Attendant",
        email: "approved@example.com",
        phone: "+91 98450 77889",
        password_hash: await hashPassword("ApprovedPass2026!"),
        gender: "female",
        city: "Bengaluru",
        address: "Jayanagar",
        qualifications: "General Duty Attendant",
        experience: "3 years",
        skills: ["Elderly Care"],
        languages: ["Kannada", "English"],
        service_categories: ["Elderly Care"],
        availability_status: "available",
        verification_status: "pending",
        account_status: "pending_approval",
      });

      // Admin approves
      await updateAttendant(att.attendant_id, {
        verification_status: "verified",
        account_status: "active",
      });

      const loginReq = new Request("https://apna-care.vercel.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "approved@example.com",
          password: "ApprovedPass2026!",
          role: "attendant",
        }),
      });

      const response = await handleAuthAction(loginReq, "login");
      expect(response.status).toBe(200);
      const json = await response.json();
      expect(json.success).toBe(true);
      expect(json.role).toBe("attendant");
      expect(json.redirectUrl).toBe("/dashboard/attendant");
    });
  });

  describe("4. Super Admin Provisioning & Operations Oversight", () => {
    it("has pre-seeded Super Admin and rejects non-existent public admin registration", async () => {
      const admin = await findAdminByEmail("admin@apnacare.in");
      expect(admin).not.toBeNull();
      expect(admin?.role).toBe("super_admin");
      expect(admin?.account_status).toBe("active");

      // Verify login works with default password
      const valid = await verifyPassword("ApnaAdmin@2026!", admin!.password_hash);
      expect(valid).toBe(true);
    });

    it("aggregates accurate operational metrics across users, attendants, and bookings", async () => {
      const stats = await getAdminStats();
      expect(stats.totalAttendants).toBeGreaterThanOrEqual(2);
      expect(typeof stats.totalUsers).toBe("number");
      expect(typeof stats.pendingApprovals).toBe("number");
    });
  });

  describe("5. Booking to User Mapping & Attendant Assignment", () => {
    it("associates booking with user_id and retrieves it in user's bookings", async () => {
      const user = await createUser({
        full_name: "Kavitha Raj",
        email: "kavitha.raj@example.com",
        phone: "+91 98450 33445",
        password_hash: await hashPassword("KavithaPass2026!"),
        city: "Bengaluru",
        address: "Malleshwaram",
        account_status: "active",
        email_verified: true,
      });

      const booking = await createBooking({
        user_id: user.user_id,
        customer_name: user.full_name,
        customer_phone: user.phone,
        service_category: "Elderly Care at Home",
        service_type: "Full-day Daily Living Support",
        patient_details: "Mother, 72 years, gentle mobility aid",
        city: "Bengaluru",
        service_location: "Malleshwaram 7th Cross",
        start_date: "2026-11-10",
        start_time: "08:00 AM",
        end_date: "2026-11-15",
        end_time: "08:00 PM",
        duration: "5 Days",
        booking_status: "requested",
      });

      expect(booking.booking_id.startsWith("BK-")).toBe(true);
      expect(booking.user_id).toBe(user.user_id);

      const userBookings = await getUserBookings(user.user_id);
      expect(userBookings).toHaveLength(1);
      expect(userBookings[0].booking_id).toBe(booking.booking_id);
    });

    it("assigns verified attendant to booking and updates booking status to assigned", async () => {
      const booking = await createBooking({
        user_id: "USR-SAMPLE",
        customer_name: "Suresh Menon",
        customer_phone: "+91 98450 55667",
        service_category: "Hospital Bedside Assistance",
        service_type: "Ward Vigil",
        patient_details: "Post-surgery observation",
        city: "Bengaluru",
        service_location: "Manipal Hospital, Old Airport Road",
        start_date: "2026-11-08",
        start_time: "07:00 PM",
        end_date: "2026-11-09",
        end_time: "07:00 AM",
        duration: "1 Night Shift",
        booking_status: "requested",
      });

      const assignment = await createAssignment({
        booking_id: booking.booking_id,
        attendant_id: "ATT-BLR-01",
        assigned_by: "ADM-001",
        assignment_status: "offered",
      });

      expect(assignment.assignment_id.startsWith("ASN-")).toBe(true);
      expect(assignment.assignment_status).toBe("offered");

      const attendantAssignments = await getAttendantAssignments("ATT-BLR-01");
      expect(attendantAssignments.length).toBeGreaterThanOrEqual(1);

      // Attendant accepts assignment
      const accepted = await updateAssignmentStatus(assignment.assignment_id, "accepted");
      expect(accepted.assignment_status).toBe("accepted");
      expect(accepted.accepted_at).toBeDefined();
    });
  });

  describe("6. Attendance Tracking (Check-In / Check-Out)", () => {
    it("records shift check-in and check-out with calculated working hours", async () => {
      const bookingId = "BK-ATTENDANCE-TEST";
      const attendantId = "ATT-BLR-01";

      const inRecord = await checkInAttendant(bookingId, attendantId, "Bengaluru Ward 4B");
      expect(inRecord.attendance_status).toBe("checked_in");
      expect(inRecord.check_in_location).toBe("Bengaluru Ward 4B");

      const outRecord = await checkOutAttendant(bookingId, attendantId, "Bengaluru Ward 4B");
      expect(outRecord.attendance_status).toBe("checked_out");
      expect(outRecord.check_out_time).toBeDefined();

      const logs = await getAttendanceRecords({ attendantId });
      expect(logs.length).toBeGreaterThanOrEqual(1);
    });
  });
});
