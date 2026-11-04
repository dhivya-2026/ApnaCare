export type UserRole = "CUSTOMER" | "SAHA" | "SUPER_ADMIN";
export type AccountStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";
export type SahaStatus = "PENDING_REVIEW" | "APPROVED" | "REJECTED" | "SUSPENDED";
export type BookingStatus =
  | "DRAFT"
  | "REQUESTED"
  | "UNDER_REVIEW"
  | "CONFIRMED"
  | "SAHA_ASSIGNED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";
export type AttendanceStatus = "PRESENT" | "LATE" | "ABSENT" | "HALF_DAY" | "LEAVE_APPROVED";
export type ShiftType = "MORNING" | "EVENING" | "FULL_DAY" | "NIGHT" | "LIVE_IN";

export interface UserRecord {
  userId: string;
  email: string;
  phone: string;
  fullName: string;
  role: UserRole;
  passwordHash: string;
  accountStatus: AccountStatus;
  city: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerProfile {
  customerId: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  languagePreference: string;
  emergencyContact?: string;
  createdAt: string;
}

export interface SahaProfile {
  sahaId: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  approvalStatus: SahaStatus;
  serviceCapabilities: string[];
  languagesSpoken: string[];
  qualifications: string;
  experience: string;
  availability: string; // JSON stringified weekly availability
  documentRefs: string; // JSON stringified document references
  createdAt: string;
  updatedAt: string;
}

export interface BookingRecord {
  bookingId: string;
  customerId: string;
  serviceType: string;
  recipientName: string;
  city: string;
  shift: ShiftType;
  startDate: string;
  endDate?: string;
  durationDays?: number;
  status: BookingStatus;
  assignedSahaId?: string;
  notes?: string;
  careNeeds?: string; // JSON stringified
  estimatedCost?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceRecord {
  attendanceId: string;
  sahaId: string;
  bookingId: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  checkInLat?: number;
  checkInLng?: number;
  checkOutLat?: number;
  checkOutLng?: number;
  status: AttendanceStatus;
  correctedBy?: string;
  correctionReason?: string;
  createdAt: string;
}

