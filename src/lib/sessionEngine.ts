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
  ACTIVE_SID:    PREFIX + "active_sid",
  LAST_ACTIVE_TS: PREFIX + "last_active_ts",
  SESSION_LAST_PAGE: PREFIX + "session_last_page",
  SESSION_PAGES_LIST: PREFIX + "session_pages_list",
} as const;

/** Active session inactivity timeout — 30 minutes */
export const SESSION_INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;

/** Booking draft key — must match the constant in booking.tsx */
const BOOKING_DRAFT_KEY = "apnacare_booking_draft_v1";
/** Booking draft is considered stale after 48 hours */
const BOOKING_DRAFT_TTL_MS = 48 * 60 * 60 * 1000;
/** Journey metadata TTL — 30 days */
const JOURNEY_TTL_MS = 30 * 24 * 60 * 60 * 1000;

/** Human-readable page titles for smart journey resumption */
const PAGE_TITLES: Record<string, string> = {
  "/": "Homepage",
  "/booking": "Booking Care Attendant",
  "/services": "Our Services",
  "/services/elderly-care": "Elderly Care",
  "/services/hospital-attendants": "Hospital Bedside Care",
  "/services/nursing-services": "Nursing Services",
  "/services/post-natal-care": "Post-Natal Care",
  "/services/women-drivers": "Women Drivers",
  "/services/airport-transfers": "Airport Transfers",
  "/services/airport-pickup": "Airport Transfers",
  "/services/travel-companions": "Travel Companionship",
  "/services/home-care": "Home Care",
  "/cities": "Our Cities",
  "/cities/bangalore": "Bangalore Care",
  "/cities/chennai": "Chennai Care",
  "/cities/mumbai": "Mumbai Care",
  "/cities/hyderabad": "Hyderabad Care",
  "/cities/delhi": "Delhi Care",
  "/about": "About ApnaCare",
  "/contact": "Contact Coordinator",
  "/faq": "FAQs",
  "/safety": "Safety & Verification",
  "/safety-guidelines": "Safety Guidelines",
  "/privacy": "Privacy Policy",
  "/terms": "Terms of Service",
  "/refund-policy": "Refund Policy",
  "/ecosystem-partners": "Ecosystem Partners",
  "/knowledge-hub": "Care Knowledge Hub",
  "/attendant-login": "Attendant Login",
};

export function getFriendlyPageLabel(path: string | null): string {
  if (!path || path === "/") return "Homepage";
  if (PAGE_TITLES[path]) return PAGE_TITLES[path];
  if (path.startsWith("/services/")) {
    const slug = path.replace("/services/", "").replace(/\/$/, "");
    return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }
  if (path.startsWith("/solutions/")) {
    const slug = path.replace("/solutions/", "").replace(/\/$/, "");
    return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }
  if (path.startsWith("/cities/")) {
    const slug = path.replace("/cities/", "").replace(/\/$/, "");
    return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) + " Care";
  }
  return path
    .replace(/^\//, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

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

export function touchSessionActivity(): void {
  if (!isBrowser()) return;
  const now = Date.now();
  lsSet(KEYS.LAST_ACTIVE_TS, String(now));
}

function getOrCreateSessionId(): string {
  if (!isBrowser()) return "ses_server";
  const now = Date.now();
  let sid = ssGet(KEYS.SID);

  // Check active session in localStorage within 30 minutes
  const activeSid = lsGet(KEYS.ACTIVE_SID);
  const lastActiveStr = lsGet(KEYS.LAST_ACTIVE_TS);
  const lastActive = lastActiveStr ? parseInt(lastActiveStr, 10) : 0;
  const isStillActive = Boolean(activeSid && lastActive && now - lastActive < SESSION_INACTIVITY_TIMEOUT_MS);

  if (sid) {
    // Keep active in localStorage
    lsSet(KEYS.ACTIVE_SID, sid);
    lsSet(KEYS.LAST_ACTIVE_TS, String(now));
    return sid;
  }

  if (isStillActive && activeSid) {
    // Re-use active session ID from recent visit
    sid = activeSid;
    ssSet(KEYS.SID, sid);
    lsSet(KEYS.LAST_ACTIVE_TS, String(now));
    return sid;
  }

  // Brand new session
  sid = "ses_" + now.toString(36) + "_" + Math.random().toString(36).slice(2, 7);
  ssSet(KEYS.SID, sid);
  ssSet(KEYS.SESSION_START, new Date().toISOString());
  lsSet(KEYS.ACTIVE_SID, sid);
  lsSet(KEYS.LAST_ACTIVE_TS, String(now));
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
  if (!path) return;
  touchSessionActivity();

  if (path !== "/") {
    lsSet(KEYS.LAST_PAGE, path);
    lsSet(KEYS.SESSION_LAST_PAGE, path);
    ssSet(KEYS.SESSION_LAST_PAGE, path);
    saveJourney({
      lastPage: path,
      lastActionLabel: path === "/booking"
        ? "Visited booking page"
        : `Visited ${getFriendlyPageLabel(path)}`,
      reachedBooking: path === "/booking" ? true : undefined as unknown as boolean,
    });
  }

  // Record session page trail (capped at last 10)
  try {
    const listRaw = ssGet(KEYS.SESSION_PAGES_LIST) || "[]";
    const list: string[] = JSON.parse(listRaw);
    if (list[list.length - 1] !== path) {
      list.push(path);
      ssSet(KEYS.SESSION_PAGES_LIST, JSON.stringify(list.slice(-10)));
    }
  } catch {
    /* ignore storage errors */
  }
}

/** Record that the visitor interacted with a service */
export function recordServiceInteraction(slug: string, label?: string): void {
  if (!slug) return;
  touchSessionActivity();
  lsSet(KEYS.LAST_SERVICE, slug);
  saveJourney({
    lastService: slug,
    lastActionLabel: label ? `Explored ${label}` : `Explored ${slug.replace(/-/g, " ")}`,
  });
}

/** Record that the visitor saved a booking draft (only the timestamp, not the content) */
export function recordBookingDraft(): void {
  touchSessionActivity();
  saveJourney({ bookingDraftSavedAt: Date.now(), reachedBooking: true });
}

/** Get the last visited page for the active session */
export function getLastSessionPage(): {
  path: string | null;
  label: string;
  hasDraft: boolean;
  sessionId: string;
} {
  const sid = getOrCreateSessionId();
  const sessionPage = ssGet(KEYS.SESSION_LAST_PAGE) || lsGet(KEYS.SESSION_LAST_PAGE) || lsGet(KEYS.LAST_PAGE);
  const validated = validateResumePath(sessionPage);
  const { hasDraft } = checkBookingDraft();

  return {
    path: validated,
    label: getFriendlyPageLabel(validated),
    hasDraft,
    sessionId: sid,
  };
}

/** Clear all journey personalization data */
export function clearJourney(): void {
  lsDel(KEYS.JOURNEY);
  lsDel(KEYS.LAST_PAGE);
  lsDel(KEYS.LAST_SERVICE);
  lsDel(KEYS.VISIT_COUNT);
  lsDel(KEYS.LAST_VISIT);
  lsDel(KEYS.ACTIVE_SID);
  lsDel(KEYS.LAST_ACTIVE_TS);
  lsDel(KEYS.SESSION_LAST_PAGE);
  lsDel(KEYS.SESSION_PAGES_LIST);
  try {
    sessionStorage.removeItem(KEYS.SESSION_LAST_PAGE);
    sessionStorage.removeItem(KEYS.SESSION_PAGES_LIST);
  } catch {
    /* ignore */
  }
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
