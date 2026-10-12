/**
 * ApnaCare Session Intelligence Engine
 * ─────────────────────────────────────
 * Provides session management, visit counting, journey memory, and
 * personalization signals. Built entirely on localStorage/sessionStorage
 * (no PII, no server-side tracking).
 *
 * ─── What is stored ───────────────────────────────────────────────────────────
 * localStorage (persists across sessions):
 *   apnacare_vid             — anonymous browser-scoped visitor ID
 *   apnacare_visit_count     — number of qualifying visits (not page navigations)
 *   apnacare_last_visit_ts   — ISO timestamp of the previous session start
 *   apnacare_last_page       — last meaningful page path (non-root)
 *   apnacare_last_service    — last service slug the visitor interacted with
 *   apnacare_welcome_dis_YYYY-MM-DD — daily welcome dismissal flag
 *   apnacare_journey         — JSON: { lastPage, lastService, bookingDraftTs, lastActionLabel }
 *
 * sessionStorage (cleared when tab is closed):
 *   apnacare_sid             — session ID (already used by analytics.ts)
 *   apnacare_session_counted — flag to prevent double-counting visits in one session
 *   apnacare_session_start   — ISO timestamp when this session started
 *
 * ─── Visit counting rules ─────────────────────────────────────────────────────
 * A "visit" is a new browser session (new tab/window open or session expired).
 * We use apnacare_session_counted in sessionStorage as a guard:
 *   - If it exists → we're in an existing session → don't increment visit count
 *   - If it doesn't → new session → increment and set the flag
 * This ensures:
 *   ✓ Route changes within the same session don't increment the count
 *   ✓ React Strict Mode double-mounts don't increment the count
 *   ✓ Page refreshes within the same tab don't increment the count
 *   ✓ Closing and reopening the browser tab starts a new session
 *
 * ─── How to clear ─────────────────────────────────────────────────────────────
 * Call sessionEngine.clearJourney() to reset all personalization data.
 * Users can also clear via browser storage settings.
 */

import { isBrowser } from "./analytics";

// ─── Storage helpers ──────────────────────────────────────────────────────────

function lsGet(key: string): string | null {
  if (!isBrowser()) return null;
  try { return localStorage.getItem(key); } catch { return null; }
}
function lsSet(key: string, value: string): void {
  if (!isBrowser()) return;
  try { localStorage.setItem(key, value); } catch { /* quota / private mode */ }
}
function lsDel(key: string): void {
  if (!isBrowser()) return;
  try { localStorage.removeItem(key); } catch { /* ignore */ }
}
function ssGet(key: string): string | null {
  if (!isBrowser()) return null;
  try { return sessionStorage.getItem(key); } catch { return null; }
}
function ssSet(key: string, value: string): void {
  if (!isBrowser()) return;
  try { sessionStorage.setItem(key, value); } catch { /* ignore */ }
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PREFIX = "apnacare_";
const KEYS = {
  VID:           PREFIX + "vid",
  VISIT_COUNT:   PREFIX + "visit_count",
  LAST_VISIT:    PREFIX + "last_visit_ts",
  LAST_PAGE:     PREFIX + "last_page",
  LAST_SERVICE:  PREFIX + "last_service",
  JOURNEY:       PREFIX + "journey",
  SID:           PREFIX + "sid",
  SESSION_COUNTED: PREFIX + "session_counted",
  SESSION_START: PREFIX + "session_start",
} as const;

/** Booking draft key — must match the constant in booking.tsx */
const BOOKING_DRAFT_KEY = "apnacare_booking_draft_v1";
/** Booking draft is considered stale after 48 hours */
const BOOKING_DRAFT_TTL_MS = 48 * 60 * 60 * 1000;
/** Journey metadata TTL — 30 days */
const JOURNEY_TTL_MS = 30 * 24 * 60 * 60 * 1000;

/** Allowlisted internal routes that are safe to navigate to */
export const VALID_RESUME_PATHS = new Set([
  "/",
  "/booking",
  "/services",
  "/cities",
  "/about",
  "/contact",
  "/faq",
  "/safety",
  "/safety-guidelines",
  "/privacy",
  "/terms",
  "/refund-policy",
  "/ecosystem-partners",
  "/knowledge-hub",
  "/attendant-login",
]);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface JourneyData {
  lastPage: string | null;
  lastService: string | null;
  lastActionLabel: string | null;
  lastActionTs: number | null;
  /** Whether visitor reached the booking page in a previous session */
  reachedBooking: boolean;
  /** Timestamp of saved booking draft (for cross-session resumption) */
  bookingDraftSavedAt: number | null;
}

export interface SessionState {
  /** Anonymous visitor ID, persists across sessions */
  visitorId: string;
  /** Current session ID */
  sessionId: string;
  /** Total qualifying visit count */
  visitCount: number;
  /** Whether this is a new session (false = existing session) */
  isNewSession: boolean;
  /** Whether visitCount > 1 */
  isReturning: boolean;
  /** ISO timestamp of previous session start */
  lastVisitAt: string | null;
  /** Journey memory from previous sessions */
  journey: JourneyData;
  /** Whether a resumable booking draft exists (non-sensitive, safe fields only) */
  hasBookingDraft: boolean;
}

// ─── Visitor ID ───────────────────────────────────────────────────────────────

function getOrCreateVisitorId(): string {
  if (!isBrowser()) return "vis_server";
  let vid = lsGet(KEYS.VID);
  if (!vid) {
    vid = "vis_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
    lsSet(KEYS.VID, vid);
  }
  return vid;
}

// ─── Session ID ───────────────────────────────────────────────────────────────

function getOrCreateSessionId(): string {
  if (!isBrowser()) return "ses_server";
  let sid = ssGet(KEYS.SID);
  if (!sid) {
    sid = "ses_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
    ssSet(KEYS.SID, sid);
    ssSet(KEYS.SESSION_START, new Date().toISOString());
  }
  return sid;
}

// ─── Visit count ──────────────────────────────────────────────────────────────

/**
 * Returns { visitCount, isNewSession }.
 * Increments the count only for new sessions (guards against double-mounts,
 * route changes, and page refreshes within the same session).
 */
function processVisit(): { visitCount: number; isNewSession: boolean } {
  if (!isBrowser()) return { visitCount: 1, isNewSession: false };

  const alreadyCounted = ssGet(KEYS.SESSION_COUNTED);
  if (alreadyCounted === "1") {
    // Existing session — just read stored count
    const raw = lsGet(KEYS.VISIT_COUNT);
    return { visitCount: raw ? parseInt(raw, 10) : 1, isNewSession: false };
  }

  // New session — increment and mark as counted
  const raw = lsGet(KEYS.VISIT_COUNT);
  const prevCount = raw ? parseInt(raw, 10) : 0;
  const newCount = prevCount + 1;

  ssSet(KEYS.SESSION_COUNTED, "1");
  lsSet(KEYS.VISIT_COUNT, String(newCount));
  // Save timestamp of the previous session start (before updating)
  // This is done by the caller reading LAST_VISIT before we update it

  return { visitCount: newCount, isNewSession: true };
}

// ─── Journey memory ───────────────────────────────────────────────────────────

function loadJourney(): JourneyData {
  const empty: JourneyData = {
    lastPage: null,
    lastService: null,
    lastActionLabel: null,
    lastActionTs: null,
    reachedBooking: false,
    bookingDraftSavedAt: null,
  };

  const raw = lsGet(KEYS.JOURNEY);
  if (!raw) return empty;

  try {
    const parsed = JSON.parse(raw) as Partial<JourneyData> & { savedAt?: number };
    // Expire old journey data
    if (parsed.lastActionTs && Date.now() - parsed.lastActionTs > JOURNEY_TTL_MS) {
      lsDel(KEYS.JOURNEY);
      return empty;
    }
    return {
      lastPage: parsed.lastPage ?? null,
      lastService: parsed.lastService ?? null,
      lastActionLabel: parsed.lastActionLabel ?? null,
      lastActionTs: parsed.lastActionTs ?? null,
      reachedBooking: parsed.reachedBooking ?? false,
      bookingDraftSavedAt: parsed.bookingDraftSavedAt ?? null,
    };
  } catch {
    return empty;
  }
}

function saveJourney(data: Partial<JourneyData>): void {
  const current = loadJourney();
  const updated: JourneyData = { ...current, ...data, lastActionTs: Date.now() };
  lsSet(KEYS.JOURNEY, JSON.stringify(updated));
}

// ─── Booking draft check ──────────────────────────────────────────────────────

/**
 * Checks whether a non-stale, non-sensitive booking draft exists.
 * The draft is stored by booking.tsx in sessionStorage under BOOKING_DRAFT_KEY.
 * We check both sessionStorage (same-tab) and mirror timestamps in localStorage.
 */
function checkBookingDraft(): { hasDraft: boolean; savedAt: number | null } {
  if (!isBrowser()) return { hasDraft: false, savedAt: null };

  // Check sessionStorage first (same-tab draft)
  try {
    const ss = sessionStorage.getItem(BOOKING_DRAFT_KEY);
    if (ss) {
      const parsed = JSON.parse(ss);
      // Draft exists if at least a service or non-empty field is set
      const hasContent = !!(parsed.serviceId || parsed.city || parsed.date);
      if (hasContent) {
        return { hasDraft: true, savedAt: null };
      }
    }
  } catch { /* ignore */ }

  // Check cross-session draft timestamp from journey
  const journey = loadJourney();
  if (journey.bookingDraftSavedAt) {
    const age = Date.now() - journey.bookingDraftSavedAt;
    if (age < BOOKING_DRAFT_TTL_MS) {
      return { hasDraft: true, savedAt: journey.bookingDraftSavedAt };
    }
  }

  return { hasDraft: false, savedAt: null };
}

// ─── Path allowlist validator ─────────────────────────────────────────────────

/**
 * Validates that a stored path is safe to navigate to.
 * Returns the path if valid, null otherwise.
 */
export function validateResumePath(path: string | null): string | null {
  if (!path) return null;
  // Exact match
  if (VALID_RESUME_PATHS.has(path)) return path;
  // Pattern matches for dynamic routes
  if (/^\/services\/[\w-]+$/.test(path)) return path;
  if (/^\/solutions\/[\w-]+$/.test(path)) return path;
  if (/^\/cities\/[\w-]+$/.test(path)) return path;
  if (/^\/knowledge-hub\/[\w-]+$/.test(path)) return path;
  return null;
}

// ─── Main initializer ─────────────────────────────────────────────────────────

/**
 * Initializes the session engine. Should be called once when the app mounts.
 * Safe to call multiple times — idempotent within a session.
 */
export function initSession(): SessionState {
  const visitorId = getOrCreateVisitorId();
  const sessionId = getOrCreateSessionId();

  const prevLastVisitAt = lsGet(KEYS.LAST_VISIT);
  const { visitCount, isNewSession } = processVisit();

  // Update last visit timestamp on new sessions
  if (isNewSession) {
    lsSet(KEYS.LAST_VISIT, new Date().toISOString());
  }

  const journey = loadJourney();
  const { hasDraft } = checkBookingDraft();

  return {
    visitorId,
    sessionId,
    visitCount,
    isNewSession,
    isReturning: visitCount > 1,
    lastVisitAt: prevLastVisitAt,
    journey,
    hasBookingDraft: hasDraft,
  };
}

// ─── Public mutation API ──────────────────────────────────────────────────────

/** Record that the visitor viewed a meaningful page */
export function recordPageVisit(path: string): void {
  if (!path || path === "/") return;
  lsSet(KEYS.LAST_PAGE, path);
  saveJourney({
    lastPage: path,
    lastActionLabel: path === "/booking"
      ? "Visited booking page"
      : `Visited ${path.replace(/^\//, "").replace(/-/g, " ")}`,
    reachedBooking: path === "/booking" ? true : undefined as unknown as boolean,
  });
}

/** Record that the visitor interacted with a service */
export function recordServiceInteraction(slug: string, label?: string): void {
  if (!slug) return;
  lsSet(KEYS.LAST_SERVICE, slug);
  saveJourney({
    lastService: slug,
    lastActionLabel: label ? `Explored ${label}` : `Explored ${slug.replace(/-/g, " ")}`,
  });
}

/** Record that the visitor saved a booking draft (only the timestamp, not the content) */
export function recordBookingDraft(): void {
  saveJourney({ bookingDraftSavedAt: Date.now(), reachedBooking: true });
}

/** Clear all journey personalization data */
export function clearJourney(): void {
  lsDel(KEYS.JOURNEY);
  lsDel(KEYS.LAST_PAGE);
  lsDel(KEYS.LAST_SERVICE);
  lsDel(KEYS.VISIT_COUNT);
  lsDel(KEYS.LAST_VISIT);
  // Also clear daily dismiss flags
  if (!isBrowser()) return;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("apnacare_welcome_dis")) {
        localStorage.removeItem(key);
        i--; // Adjust index after removal
      }
    }
  } catch { /* ignore */ }
}

/** Get today's welcome dismissal key */
export function getWelcomeDismissKey(): string {
  const today = new Date().toISOString().slice(0, 10);
  return `apnacare_welcome_dis_${today}`;
}

/** Check if welcome was dismissed today */
export function isWelcomeDismissedToday(): boolean {
  return lsGet(getWelcomeDismissKey()) === "1";
}

/** Mark welcome as dismissed for today */
export function dismissWelcomeToday(): void {
  lsSet(getWelcomeDismissKey(), "1");
}

/** Get current session state (read-only, no side effects) */
export function getSessionState(): SessionState {
  const visitorId = lsGet(KEYS.VID) ?? "vis_unknown";
  const sessionId = ssGet(KEYS.SID) ?? "ses_unknown";
  const raw = lsGet(KEYS.VISIT_COUNT);
  const visitCount = raw ? parseInt(raw, 10) : 1;
  const lastVisitAt = lsGet(KEYS.LAST_VISIT);
  const journey = loadJourney();
  const { hasDraft } = checkBookingDraft();

  return {
    visitorId,
    sessionId,
    visitCount,
    isNewSession: ssGet(KEYS.SESSION_COUNTED) === "1",
    isReturning: visitCount > 1,
    lastVisitAt,
    journey,
    hasBookingDraft: hasDraft,
  };
}
