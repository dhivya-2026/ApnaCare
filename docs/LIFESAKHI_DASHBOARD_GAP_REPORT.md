# LIFESAKHI — THREE-ROLE DASHBOARD TRANSFORMATION
## Phase 1: Comprehensive Application Audit & Implementation Gap Report

**Target Platform:** LifeSakhi Operational Ecosystem  
**Website:** https://apna-care.vercel.app/  
**Audit Scope:** Family User Dashboard, Saha Attendant Dashboard, Super Admin Dashboard, Shared Backend DAL, Session Management, Operational Workflows, and Test Architecture.

---

### Executive Summary

LifeSakhi operates as an integrated women-and-family care ecosystem spanning direct caregiving, clinical bedside assistance, postnatal care, and health technology. The web platform features active routes for all three primary personas:
1. `dashboard.user.tsx` (`/dashboard/user`)
2. `dashboard.attendant.tsx` (`/dashboard/attendant`)
3. `dashboard.admin.tsx` (`/dashboard/admin`)

This audit examined the entire codebase to evaluate what works, what is partially implemented, what is only a UI placeholder, what is missing, and what must be unified.

---

### Audit Findings Matrix

| Component / Subsystem | Current State | What Works | Gaps & Deficiencies | Required Transformation |
|---|---|---|---|---|
| **Role Authorization** | Partially Implemented | `ProtectedRoute.tsx` enforces client-side roles; cookie sessions managed via `src/server/session/` with fallback to demo sessions. | Endpoint `/api/admin/assign-attendant` vs `/api/admin/assign` had action name mismatches; session expiration in client-only demo state could lose role sync. | Unify backend token/cookie validation across all routes; ensure role isolation cannot be bypassed. |
| **Shared Data Model** | Partially Implemented | `src/server/auth/types.ts` defines `UserRecord`, `AttendantRecord`, `AdminRecord`, `BookingRecord`, `AssignmentRecord`, `AttendanceRecord`. In-memory DAL provides local persistence. | Bookings submitted via public `/booking` flow bypass `sheets-dal.ts` and only went to Google Sheets/Airtable webhooks, failing to hydrate the Family and Admin dashboard database. | Bridge booking engine with `sheets-dal.ts` so all bookings instantly reflect across Family, Admin, and Saha dashboards. |
| **Family Dashboard** | Partially Implemented | Tabs for Care, Bookings, Team, Vitals, Profile. Profile update API connected. | Lacks multi-family member management (e.g. adding elderly mother, newborn, father); lacks direct in-dashboard service discovery and guided booking wizard; lacks booking cancellation/change request flow. | Build multi-member management, in-dashboard booking engine with live status tracker, and cancellation request workflow. |
| **Saha Dashboard** | Partially Implemented | Tabs for Overview, Assignments, Attendance, Past History, Profile. Check-in/out calls `/api/saha/attendance`. | Document upload is UI mock without verified status transitions (`submitted` -> `under_review` -> `approved` -> `rejected`); availability management does not prevent schedule conflicts. | Implement document upload manager with verification states, calendar availability toggle, and decline reasons syncing to Admin. |
| **Admin Dashboard** | Partially Implemented | High-level overview, user list, attendant verification list, booking list, attendance logs, and automated daily/weekly reports. | Attendant assignment is a simple select dropdown without skill/location/availability matching; no dispute/correction handling for attendance. | Implement assisted **Saha Allocation Engine** with compatibility scoring (skills, city, availability, schedule conflict prevention). |
| **Cross-Role Sync** | Missing / Disconnected | Actions exist in isolation; local component states often rely on fallback state arrays rather than unified backend reactivity. | Booking by user doesn't update admin in real-time unless page refreshed; attendant assignment in admin doesn't notify user. | Connect all three dashboards to a reactive shared operational repository with audit logs and predictable event notifications. |

---

### Implementation Roadmap

1. **Step 1: Unified Shared DAL & Backend Enhancements (`src/server/auth/`)**
   - Harmonize dispatchers (`admin-dispatcher.ts`, `user-dispatcher.ts`, `saha-dispatcher.ts`).
   - Add family members store, service updates timeline, and notification event bus.
   - Ensure demo mode populates linked, cross-referenced data across all 3 roles.
2. **Step 2: Family User Dashboard Transformation (`src/routes/dashboard.user.tsx`)**
   - Multi-member family management (profiles, mobility levels, care notes).
   - In-dashboard Service Discovery & guided booking flow.
   - Real-time care timeline and Saha profile inspection.
   - Cancellation and shift modification requests.
3. **Step 3: Saha Attendant Dashboard Transformation (`src/routes/dashboard.attendant.tsx`)**
   - Document verification center (Aadhaar, Police clearance, Nursing certs).
   - Availability & shift schedule manager (prevent double booking).
   - Real-time assignment accept/decline with reason dispatch.
   - GPS-consented check-in/out and duty care logs.
4. **Step 4: Super Admin Dashboard & Allocation Engine (`src/routes/dashboard.admin.tsx`)**
   - Assisted Saha Allocation Engine with compatibility score & conflict detection.
   - Attendant document verification queue (Approve / Reject / Request Resubmit).
   - Central booking control with status transitions.
   - Real-time attendance monitoring & exception flagging.
5. **Step 5: End-to-End Operational Workflows & Automated Test Suite**
   - Vitest integration tests covering Workflow A through Workflow F.
   - Production build verification and zero regressions.
