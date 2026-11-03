/**
 * ApnaCare Authentication & Role Types
 * Extends the existing session system with full role-based access control.
 */

export type UserRole = "CUSTOMER" | "SAHA" | "SUPER_ADMIN";
// Legacy alias for backward compatibility with existing attendant portal
export type LegacyUserRole = "attendant" | "coordinator" | "admin";

export function toLegacyRole(role: UserRole): LegacyUserRole {
  if (role === "SAHA") return "attendant";
  if (role === "SUPER_ADMIN") return "admin";
  return "coordinator";
}

export function fromLegacyRole(role: string): UserRole {
  if (role === "attendant") return "SAHA";
  if (role === "admin") return "SUPER_ADMIN";
  if (role === "coordinator") return "SUPER_ADMIN";
  if (role === "CUSTOMER") return "CUSTOMER";
  if (role === "SAHA") return "SAHA";
  if (role === "SUPER_ADMIN") return "SUPER_ADMIN";
  return "CUSTOMER";
}

export interface UserRecord {
  user_id: string;
  email: string;
  phone: string;
  full_name: string;
  role: UserRole;
  password_hash: string; // SHA-256(salt + password), never plaintext
  password_salt: string;
  account_status: "active" | "inactive" | "suspended" | "pending";
  email_verified: "yes" | "no";
  created_at: string;
  updated_at: string;
}

export interface CustomerRecord {
  customer_id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  alternate_phone: string;
  city: string;
  address: string;
  preferred_language: string;
  notification_preferences: string;
  created_at: string;
  updated_at: string;
}

export interface SahaRecord {
  saha_id: string;
  user_id: string;
  full_name: string;
  phone: string;
  email: string;
  city: string;
  service_areas: string;
  experience_years: string;
  education: string;
  capabilities: string; // JSON array
  languages: string;
  verification_status: "pending" | "documents_pending" | "in_progress" | "approved" | "rejected";
  approval_status: "pending_review" | "approved" | "rejected" | "suspended";
  account_status: "active" | "inactive" | "suspended";
  profile_completion: string; // percentage 0-100
  created_at: string;
  updated_at: string;
}

export interface BookingRecord {
  booking_id: string;
  customer_id: string;
  care_recipient: string;
  service_type: string;
  care_requirements: string;
  city: string;
  service_location: string;
  latitude: string;
  longitude: string;
  start_date: string;
  end_date: string;
  shift_type: string;
  start_time: string;
  end_time: string;
  required_skills: string;
  preferred_language: string;
  booking_status:
    | "draft"
    | "requested"
    | "under_review"
    | "awaiting_confirmation"
    | "confirmed"
    | "saha_assigned"
    | "in_progress"
    | "completed"
    | "cancelled";
  assigned_saha_id: string;
  coordinator_notes: string;
  created_at: string;
  updated_at: string;
}

export interface AssignmentRecord {
  assignment_id: string;
  booking_id: string;
  customer_id: string;
  saha_id: string;
  assignment_status: "pending" | "accepted" | "declined" | "confirmed" | "completed" | "cancelled";
  scheduled_start: string;
  scheduled_end: string;
  assigned_by: string;
  accepted_at: string;
  confirmed_at: string;
  created_at: string;
  updated_at: string;
}

export interface AttendanceRecord {
  attendance_id: string;
  assignment_id: string;
  booking_id: string;
  saha_id: string;
  attendance_date: string;
  scheduled_start: string;
  scheduled_end: string;
  check_in_time: string;
  check_out_time: string;
  check_in_latitude: string;
  check_in_longitude: string;
  check_out_latitude: string;
  check_out_longitude: string;
  location_verification_status: "verified" | "out_of_range" | "gps_failed" | "not_checked" | "manually_approved";
  attendance_status: "present" | "late" | "absent" | "on_leave" | "pending_verification" | "manually_corrected";
  exception_notes: string;
  corrected_by: string;
  original_check_in: string;
  original_check_out: string;
  created_at: string;
  updated_at: string;
}

export interface LeaveRequest {
  leave_id: string;
  saha_id: string;
  start_date: string;
  end_date: string;
  leave_reason: string;
  approval_status: "pending" | "approved" | "rejected";
  reviewed_by: string;
  reviewed_at: string;
  created_at: string;
}

export interface AuditLog {
  log_id: string;
  actor_user_id: string;
  actor_role: UserRole;
  action: string;
  entity_type: string;
  entity_id: string;
  previous_value: string;
  new_value: string;
  timestamp: string;
  request_reference: string;
}

