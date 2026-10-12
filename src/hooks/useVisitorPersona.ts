/**
 * useVisitorPersona  (v2 — Session-Intelligence-aware)
 * ──────────────────────────────────────────────────────
 * Builds a personalization persona from the Session Intelligence Engine.
 * All personalization is anonymous — no PII, no fingerprinting.
 *
 * Visit counting rules (defined in sessionEngine.ts):
 *  - A "visit" = a new browser session (new tab / session expired)
 *  - Navigation within the same session DOES NOT increment the count
 *  - React Strict Mode double-mounts DO NOT increment the count
 *  - Page refreshes within the same tab DO NOT increment the count
 */

import { useState, useEffect, useCallback } from "react";
import { isBrowser } from "@/lib/analytics";
import {
  initSession,
  recordPageVisit,
  recordServiceInteraction,
  dismissWelcomeToday,
  isWelcomeDismissedToday,
  clearJourney,
  validateResumePath,
  type SessionState,
} from "@/lib/sessionEngine";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TimeSlot = "morning" | "afternoon" | "evening" | "night";

export interface VisitorPersona {
  visitCount: number;
  isReturning: boolean;
  lastVisitAt: string | null;
  /** Validated last page path (allowlisted) or null */
  lastPage: string | null;
  lastService: string | null;
  lastActionLabel: string | null;
  /** Whether a resumable booking draft exists */
  hasBookingDraft: boolean;
  timeSlot: TimeSlot;
  greeting: string;
  subGreeting: string;
  showWelcome: boolean;
  /** Session state from the engine */
  session: SessionState | null;
  /** Dismiss welcome for today */
  dismissWelcome: () => void;
  /** Record a page visit */
  recordPage: (path: string) => void;
  /** Record a service interaction */
  recordService: (slug: string, label?: string) => void;
  /** Reset all journey data (privacy reset) */
  clearJourney: () => void;
}

// ─── Time-slot helpers ────────────────────────────────────────────────────────

function getTimeSlot(): TimeSlot {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "morning";
  if (h >= 12 && h < 17) return "afternoon";
  if (h >= 17 && h < 21) return "evening";
  return "night";
}

const SLOT_WORD: Record<TimeSlot, string> = {
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night",
};

const SLOT_EMOJI: Record<TimeSlot, string> = {
  morning: "🌅",
  afternoon: "☀️",
  evening: "🌆",
  night: "🌙",
};

// ─── Service label map ────────────────────────────────────────────────────────

const SERVICE_LABELS: Record<string, string> = {
  "elderly-care": "Elderly Care",
  "hospital-attendants": "Hospital Bedside Care",
  "nursing-services": "Nursing Services",
  "post-natal-care": "Post-Natal Care",
  "women-drivers": "Women Drivers",
  "airport-transfers": "Airport Transfers",
  "airport-pickup": "Airport Transfers",
  "travel-companions": "Travel Companionship",
  "home-care": "Home Care",
};

export function friendlyService(slug: string): string {
  return (
    SERVICE_LABELS[slug] ??
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

// ─── Greeting builders ────────────────────────────────────────────────────────

function buildGreeting(timeSlot: TimeSlot): string {
  return `Good ${SLOT_WORD[timeSlot]} ${SLOT_EMOJI[timeSlot]}`;
}

function buildSubGreeting(
  isReturning: boolean,
  visitCount: number,
  lastService: string | null,
  lastPage: string | null,
  hasBookingDraft: boolean,
  timeSlot: TimeSlot
): string {
  if (!isReturning) {
    // First visit — warm introduction
    const intros: Record<TimeSlot, string> = {
      morning: "Starting your morning with care research? Let us help you find the perfect attendant — quickly and safely.",
      afternoon: "Good afternoon! We're here to help you find trusted women attendants for every care need.",
      evening: "Good evening! Looking for care support? Our verified attendants are available 24/7.",
      night: "Up late ensuring your loved one's care? We're here whenever you need us — around the clock. 💙",
    };
    return intros[timeSlot];
  }

  // Returning visitor — prioritise most contextual message

  // Priority 1: Incomplete booking draft
  if (hasBookingDraft) {
    return "Welcome back! You have an **unfinished booking** saved. Ready to continue where you left off?";
  }

  // Priority 2: Known service interest
  if (lastService) {
    return `Welcome back! You were exploring **${friendlyService(lastService)}** — shall we pick up where you left off?`;
  }

  // Priority 3: Known page
  const validPage = validateResumePath(lastPage);
  if (validPage && validPage !== "/" && validPage !== "/booking") {
    const pageLabel = validPage
      .replace(/^\//, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return `Welcome back! You were browsing our **${pageLabel}** page. Shall we continue?`;
  }

  // Priority 4: Visit-count milestones
  if (visitCount === 2) {
    return "Welcome back! We're happy to see you again. Our care coordinators are ready to help you today.";
  }
  if (visitCount === 3) {
    return "Welcome back for your **third visit**! 🌸 Let us help you find exactly the right care.";
  }
  if (visitCount >= 4) {
    return "Welcome back to ApnaCare. 💚 Your trust means everything to us — how can we help you today?";
  }

  return "Welcome back! We're glad you've returned. Our care coordinators are ready to assist.";
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useVisitorPersona(): VisitorPersona {
  const [initialized, setInitialized] = useState(false);
  const [session, setSession] = useState<SessionState | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (!isBrowser()) return;

    // Initialize session engine — idempotent, safe to call once
    const state = initSession();
    setSession(state);

    // Show welcome only if not dismissed today
    const dismissed = isWelcomeDismissedToday();
    setShowWelcome(!dismissed);
    setInitialized(true);
  }, []);

  const handleDismissWelcome = useCallback(() => {
    dismissWelcomeToday();
    setShowWelcome(false);
  }, []);

  const handleRecordPage = useCallback((path: string) => {
    recordPageVisit(path);
    // Update local session state with new page
    setSession((prev) =>
      prev
        ? {
            ...prev,
            journey: {
              ...prev.journey,
              lastPage: path,
            },
          }
        : prev
    );
  }, []);

  const handleRecordService = useCallback((slug: string, label?: string) => {
    recordServiceInteraction(slug, label);
    setSession((prev) =>
      prev
        ? {
            ...prev,
            journey: {
              ...prev.journey,
              lastService: slug,
            },
          }
        : prev
    );
  }, []);

  const handleClearJourney = useCallback(() => {
    clearJourney();
    setSession((prev) =>
      prev
        ? {
            ...prev,
            visitCount: 1,
            isReturning: false,
            journey: {
              lastPage: null,
              lastService: null,
              lastActionLabel: null,
              lastActionTs: null,
              reachedBooking: false,
              bookingDraftSavedAt: null,
            },
            hasBookingDraft: false,
          }
        : prev
    );
    setShowWelcome(false);
  }, []);

  // Build derived values
  const visitCount = session?.visitCount ?? 1;
  const isReturning = session?.isReturning ?? false;
  const lastPage = validateResumePath(session?.journey?.lastPage ?? null);
  const lastService = session?.journey?.lastService ?? null;
  const hasBookingDraft = session?.hasBookingDraft ?? false;
  const lastActionLabel = session?.journey?.lastActionLabel ?? null;
  const timeSlot = getTimeSlot();

  const greeting = buildGreeting(timeSlot);
  const subGreeting = initialized
    ? buildSubGreeting(isReturning, visitCount, lastService, lastPage, hasBookingDraft, timeSlot)
    : "We're here to help you find the right care.";

  return {
    visitCount,
    isReturning,
    lastVisitAt: session?.lastVisitAt ?? null,
    lastPage,
    lastService,
    lastActionLabel,
    hasBookingDraft,
    timeSlot,
    greeting,
    subGreeting,
    showWelcome: initialized && showWelcome,
    session,
    dismissWelcome: handleDismissWelcome,
    recordPage: handleRecordPage,
    recordService: handleRecordService,
    clearJourney: handleClearJourney,
  };
}
