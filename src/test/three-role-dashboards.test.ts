import { describe, it, expect, beforeEach } from "vitest";
import {
  findMatchingAttendants,
  getFamilyMembers,
  createFamilyMember,
  deleteFamilyMember,
  getTimelineEvents,
  addTimelineEvent,
  getDocumentsByAttendant,
  getAllPendingDocuments,
  verifyDocument,
  createBooking,
  createAssignment,
  getAttendantAssignments,
  updateAssignmentStatus,
  checkInAttendant,
  checkOutAttendant,
  getAttendanceRecords,
  resetMockStoreForTesting,
} from "../server/auth/sheets-dal";

describe("LifeSakhi Three-Role Connected Dashboard Workflows", () => {
  beforeEach(() => {
    resetMockStoreForTesting();
  });

  describe("1. Multi-Member Family Profile & Booking Creation", () => {
    it("allows family user to manage multiple members with health & mobility details", async () => {
      const initialMembers = await getFamilyMembers("USR-DEMO-001");
      expect(initialMembers.length).toBeGreaterThanOrEqual(2);

      const newMember = await createFamilyMember({
        user_id: "USR-DEMO-001",
        full_name: "Ramesh Sharma",
        relationship: "Father",
        age: 78,
        gender: "Male",
        primary_language: "Kannada",
        mobility_level: "wheelchair",
        care_notes: "Requires assistance with wheelchair transfers and physiotherapy exercises.",
      });

      expect(newMember.member_id).toBeDefined();
      expect(newMember.full_name).toBe("Ramesh Sharma");

      const updatedMembers = await getFamilyMembers("USR-DEMO-001");
      expect(updatedMembers.some((m) => m.member_id === newMember.member_id)).toBe(true);

      const deleted = await deleteFamilyMember("USR-DEMO-001", newMember.member_id);
      expect(deleted).toBe(true);
    });

    it("creates a booking tied to a family member and initializes the care timeline", async () => {
      const booking = await createBooking({
        user_id: "USR-DEMO-001",
        family_member_id: "MEM-001",
        family_member_name: "Saraswathi Sharma",
        customer_name: "Priya Sharma",
        customer_phone: "+91 98765 43210",
        service_category: "Elderly Care",
        city: "Bengaluru",
        service_location: "Indiranagar, Bengaluru",
        start_date: "2026-11-28",
        start_time: "08:00 AM",
        end_time: "08:00 PM",
        duration: "12 Hours Day Duty",
        notes: "Daily medication assistance and vitals tracking",
      });

      expect(booking.booking_id).toBeDefined();
      expect(booking.booking_status).toBe("requested");

      // Verify care timeline was initialized with request_submitted event
      const timeline = await getTimelineEvents(booking.booking_id);
      expect(timeline.length).toBeGreaterThanOrEqual(1);
      expect(timeline[0].event_type).toBe("request_submitted");
      expect(timeline[0].actor).toBe("family");
    });
  });

  describe("2. Assisted Saha Allocation Engine with Scoring & Conflict Detection", () => {
    it("evaluates candidates based on city, verification, qualification and micro-cluster proximity", async () => {
      // BK-BLR-102 is an unassigned booking in Bengaluru (Indiranagar)
      const candidates = await findMatchingAttendants("BK-BLR-102");
      expect(candidates.length).toBeGreaterThan(0);

      // Best candidate should be eligible and verified
      const topMatch = candidates[0];
      expect(topMatch.attendant.city).toBe("Bengaluru");
      expect(topMatch.isEligible).toBe(true);
      expect(topMatch.score).toBeGreaterThanOrEqual(60);
      expect(topMatch.matchReasons.length).toBeGreaterThan(0);
    });

    it("flags candidate conflict when attendant already has overlapping active booking", async () => {
      // ATT-BLR-01 is already assigned to active booking BK-BLR-101.
      // Matching for BK-BLR-102 (which overlaps in dates) should flag ATT-BLR-01 with a conflict warning.
      const candidates = await findMatchingAttendants("BK-BLR-102");
      expect(candidates).toBeDefined();
      const att1 = candidates.find((c) => c.attendant.attendant_id === "ATT-BLR-01");
      expect(att1).toBeDefined();
      expect(att1?.conflictWarning).toBeDefined();
      expect(att1?.conflictWarning).toContain("Active duty conflict");
    });
  });

  describe("3. Cross-Role Duty Assignment & Attendant Acceptance Lifecycle", () => {
    it("progresses status through assignment offer, Saha acceptance, and verified shift check-in", async () => {
      // 1. Admin creates assignment offer
      const assignment = await createAssignment({
        booking_id: "BK-BLR-102",
        attendant_id: "ATT-BLR-03",
        shift_type: "day",
        rate_per_shift: 1500,
        start_date: "2026-11-28",
        end_date: "2026-11-29",
      });
      expect(assignment.assignment_status).toBe("offered");

      // 2. Attendant receives assignment offer in their dashboard
      const attendantTasks = await getAttendantAssignments("ATT-BLR-03");
      const assignedTask = attendantTasks.find((t) => t.assignment.booking_id === "BK-BLR-102");
      expect(assignedTask).toBeDefined();

      // 3. Saha accepts the assignment
      const accepted = await updateAssignmentStatus(assignment.assignment_id, "accepted");
      expect(accepted.assignment_status).toBe("accepted");

      // Verify timeline updated with Saha acceptance
      const timelineAfterAccept = await getTimelineEvents("BK-BLR-102");
      expect(timelineAfterAccept.some((e) => e.event_type === "saha_accepted")).toBe(true);

      // 4. Saha arrives at family home and completes GPS-verified check-in
      const attendance = await checkInAttendant(
        "ATT-BLR-03",
        "BK-BLR-102",
        "12.9716, 77.5946 (Indiranagar, Geo-Verified)"
      );
      expect(attendance.attendance_status).toBe("checked_in");
      expect(attendance.check_in_location).toContain("Indiranagar");

      // Check attendance oversight record appears in Admin DB
      const allAttendance = await getAttendanceRecords();
      expect(allAttendance.some((a) => a.attendance_id === attendance.attendance_id)).toBe(true);
    });
  });

  describe("4. Shift Completion & Family Care Review", () => {
    it("allows Saha to mark duty completed with shift hours and family to record care feedback", async () => {
      // 1. Check out attendant
      const completedAttendance = await checkOutAttendant("ATT-BLR-01", "BK-BLR-101");
      expect(completedAttendance.attendance_status).toBe("checked_out");
      expect(completedAttendance.working_hours).toBeGreaterThan(0);

      // 2. Family adds 5-star review and care feedback to timeline
      const feedbackEvent = await addTimelineEvent({
        booking_id: "BK-BLR-101",
        actor: "user",
        actor_name: "Priya Sharma",
        event_type: "feedback_submitted",
        title: "5-Star Care Review Submitted",
        description: "Exceptional dedication, gentle companionship, and punctual vitals tracking.",
        metadata: {
          rating: 5,
          feedback: "Lakshmi was extraordinarily caring with my grandmother.",
        },
      });

      expect(feedbackEvent.event_id).toBeDefined();
      const updatedTimeline = await getTimelineEvents("BK-BLR-101");
      expect(updatedTimeline.some((e) => e.event_type === "feedback_submitted")).toBe(true);
    });
  });

  describe("5. Level-3 Credential Verification Queue", () => {
    it("retrieves attendant applicant documents and updates compliance approval", async () => {
      // Attendant ATT-BLR-04 has pending documents
      const docs = await getDocumentsByAttendant("ATT-BLR-04");
      expect(docs.length).toBeGreaterThan(0);

      const pendingDocs = await getAllPendingDocuments();
      expect(pendingDocs.length).toBeGreaterThan(0);

      const targetDoc = pendingDocs[0];
      const verified = await verifyDocument(targetDoc.document_id, "verified", "ADM-001");
      expect(verified.verification_status).toBe("verified");
      expect(verified.verified_by).toBe("ADM-001");
    });
  });
});
