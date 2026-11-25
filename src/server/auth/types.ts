export type Role = "user" | "attendant" | "admin";

export type AccountStatus = "active" | "inactive" | "pending_approval" | "suspended";

export type VerificationStatus = "pending" | "verified" | "rejected";

export type BookingStatus =
  | "requested"
  | "confirmed"
  | "assigned"
  | "in_progress"
  | "completed"
  | "cancelled";

export type AssignmentStatus =
  | "offered"
  | "accepted"
  | "rejected"
  | "completed"
  | "cancelled";

export type AttendanceStatus =
  | "checked_in"
  | "checked_out"
  | "absent"
  | "flagged";

export interface UserRecord {
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  password_hash: string;
  profile_image?: string;
  city: string;
  address: string;
  account_status: AccountStatus;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface AttendantRecord {
  attendant_id: string;
  full_name: string;
  email: string;
  phone: string;
  password_hash: string;
  gender: "female" | "male" | "other";
  city: string;
  address: string;
  qualifications: string;
  experience: string;
  skills: string[];
  languages: string[];
  service_categories: string[];
  availability_status: "available" | "busy" | "on_leave";
  verification_status: VerificationStatus;
  account_status: AccountStatus;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface AdminRecord {
  admin_id: string;
  full_name: string;
  email: string;
  password_hash: string;
  role: "super_admin" | "ops_admin";
  account_status: AccountStatus;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface FamilyMemberRecord {
  member_id: string;
  user_id: string;
  full_name: string;
  relationship: string;
  age: number;
  gender: string;
  mobility_level: "independent" | "walker_assisted" | "wheelchair_bound" | "bedridden";
  dietary_medical_notes: string;
  primary_language?: string;
  emergency_contact?: string;
  created_at: string;
}

export interface CareTimelineEvent {
  event_id: string;
  booking_id: string;
  event_type:
    | "request_submitted"
    | "under_review"
    | "saha_allocated"
    | "saha_accepted"
    | "service_started"
    | "vitals_recorded"
    | "service_completed"
    | "cancellation_requested"
    | "cancelled";
  title: string;
  description: string;
  actor: "family" | "saha" | "admin" | "system";
  actor_name?: string;
  timestamp: string;
}

export interface SahaMatchCandidate {
  attendant: AttendantRecord;
  score: number;
  isEligible: boolean;
  matchReasons: string[];
  conflictWarning?: string;
}

export interface BookingRecord {
  booking_id: string;
  user_id: string;
  customer_name: string;
  customer_phone: string;
  service_category: string;
  service_type: string;
  patient_details: string;
  patient_member_id?: string;
  city: string;
  service_location: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  duration: string;
  special_requirements?: string;
  booking_status: BookingStatus;
  assigned_attendant_id?: string;
  assigned_attendant_name?: string;
  cancellation_reason?: string;
  modification_request?: string;
  service_notes?: string;
  rating_given?: number;
  feedback_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface AssignmentRecord {
  assignment_id: string;
  booking_id: string;
  attendant_id: string;
  assigned_by: string;
  assignment_status: AssignmentStatus;
  assigned_at: string;
  accepted_at?: string;
  rejected_at?: string;
  rejection_reason?: string;
}

export interface AvailabilityRecord {
  availability_id: string;
  attendant_id: string;
  available_date: string;
  start_time: string;
  end_time: string;
  availability_status: "available" | "unavailable";
  updated_at: string;
}

export interface AttendanceRecord {
  attendance_id: string;
  booking_id: string;
  attendant_id: string;
  check_in_time: string;
  check_in_location?: string;
  check_out_time?: string;
  check_out_location?: string;
  attendance_status: AttendanceStatus;
  working_hours?: number;
  remarks?: string;
}

export interface DocumentRecord {
  document_id: string;
  owner_id: string;
  owner_type: "user" | "attendant";
  document_type: "id_proof" | "police_verification" | "certification" | "medical_fitness";
  file_url: string;
  verification_status: VerificationStatus;
  verified_by?: string;
  uploaded_at: string;
  verified_at?: string;
}

export interface ActivityLogRecord {
  log_id: string;
  actor_id: string;
  actor_role: Role | "system";
  action: string;
  target_id?: string;
  description: string;
  timestamp: string;
  ip_reference?: string;
}

export interface AuthSessionUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  city: string;
  status: AccountStatus;
  verificationStatus?: VerificationStatus;
}
