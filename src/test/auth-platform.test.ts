import { describe, it, expect, beforeEach } from "vitest";
import { hashPassword, verifyPassword } from "../server/auth/password";
import {
  createUser,
  findUserByEmail,
  findUserById,
  createCustomer,
  getCustomerByUserId,
  createSaha,
  getSahaByUserId,
  updateSahaStatus,
  createBooking,
  getBookingsByCustomerId,
  createAttendance,
  getAttendanceBySahaId,
} from "../server/auth/sheets-dal";

describe("ApnaCare Auth Platform — Cryptography & Scrypt Hashes", () => {
  it("hashes password with unique salt and correctly verifies valid passwords", async () => {
    const rawPass = "SecretSecurePass123!";
    const hash = await hashPassword(rawPass);

    expect(hash).toContain(":");
    const [salt, derived] = hash.split(":");
    expect(salt.length).toBe(32);
    expect(derived.length).toBe(128); // 64 bytes in hex

    const isValid = await verifyPassword(rawPass, hash);
    expect(isValid).toBe(true);

    const isInvalid = await verifyPassword("WrongPassword", hash);
    expect(isInvalid).toBe(false);
  });

  it("produces distinct hashes for the same password due to random salt generation", async () => {
    const rawPass = "IdenticalInput123";
    const hash1 = await hashPassword(rawPass);
    const hash2 = await hashPassword(rawPass);

    expect(hash1).not.toBe(hash2);
    expect(await verifyPassword(rawPass, hash1)).toBe(true);
    expect(await verifyPassword(rawPass, hash2)).toBe(true);
  });
});

describe("ApnaCare Operations DAL — Multi-role User Management", () => {
  it("creates customer user record and links customer profile", async () => {
    const email = `customer_${Date.now()}@example.com`;
    const passwordHash = await hashPassword("CustomerPass123");

    const user = await createUser({
      email,
      phone: "+919876543210",
      fullName: "Ananya Sharma",
      role: "CUSTOMER",
      passwordHash,
      accountStatus: "ACTIVE",
      city: "Bengaluru",
    });

    expect(user.userId).toBeDefined();
    expect(user.email).toBe(email);
    expect(user.role).toBe("CUSTOMER");

    const found = await findUserByEmail(email);
    expect(found).not.toBeNull();
    expect(found?.userId).toBe(user.userId);

    const customer = await createCustomer({
      userId: user.userId,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      city: user.city,
      languagePreference: "Kannada",
      emergencyContact: "Spouse: +91 99999 88888",
    });

    expect(customer.customerId).toBeDefined();
    expect(customer.userId).toBe(user.userId);

    const profile = await getCustomerByUserId(user.userId);
    expect(profile).not.toBeNull();
    expect(profile?.customerId).toBe(customer.customerId);
    expect(profile?.languagePreference).toBe("Kannada");
  });

  it("creates saha applicant in PENDING_REVIEW status and transitions to APPROVED", async () => {
    const email = `saha_${Date.now()}@example.com`;
    const passwordHash = await hashPassword("SahaPass123");

    const user = await createUser({
      email,
      phone: "+918888877777",
      fullName: "Sunitha Krishnan",
      role: "SAHA",
      passwordHash,
      accountStatus: "ACTIVE",
      city: "Chennai",
    });

    const saha = await createSaha({
      userId: user.userId,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      city: user.city,
      approvalStatus: "PENDING_REVIEW",
      serviceCapabilities: ["Elder Care", "Hospital Assistance"],
      languagesSpoken: ["Tamil", "English"],
      qualifications: "GNM Nursing",
      experience: "5+ Years",
      availability: JSON.stringify({}),
      documentRefs: JSON.stringify({ aadhaarRef: "1234" }),
    });

    expect(saha.sahaId).toBeDefined();
    expect(saha.approvalStatus).toBe("PENDING_REVIEW");

    // Operations approve action
    await updateSahaStatus(saha.sahaId, "APPROVED");

    const updated = await getSahaByUserId(user.userId);
    expect(updated?.approvalStatus).toBe("APPROVED");
  });
});

describe("ApnaCare Operations DAL — Bookings & Shift Telemetry", () => {
  it("records booking creation and links to customer", async () => {
    const booking = await createBooking({
      customerId: "cust_demo_test",
      serviceType: "Elder Care & Geriatric Support",
      recipientName: "Mrs. Meenakshi Ammal (78 yrs)",
      city: "Bengaluru",
      shift: "FULL_DAY",
      startDate: "2026-11-10",
      status: "REQUESTED",
      notes: "Post-stroke mobility assistance required",
      estimatedCost: 1800,
    });

    expect(booking.bookingId).toBeDefined();
    expect(booking.status).toBe("REQUESTED");

    const list = await getBookingsByCustomerId("cust_demo_test");
    expect(list.some((b) => b.bookingId === booking.bookingId)).toBe(true);
  });

  it("captures attendance check-in and check-out records with timestamps", async () => {
    const today = new Date().toISOString().split("T")[0];
    const checkIn = new Date().toISOString();

    const attendance = await createAttendance({
      sahaId: "saha_test_telemetry",
      bookingId: "bk_demo_123",
      date: today,
      checkInTime: checkIn,
      checkInLat: 12.9716,
      checkInLng: 77.5946,
      status: "PRESENT",
    });

    expect(attendance.attendanceId).toBeDefined();
    expect(attendance.checkInLat).toBe(12.9716);

    const history = await getAttendanceBySahaId("saha_test_telemetry");
    expect(history.length).toBeGreaterThan(0);
    expect(history[0].status).toBe("PRESENT");
  });
});
