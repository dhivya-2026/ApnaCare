/**
 * useVisitorPersona
 * ─────────────────
 * Tracks anonymous visitor context in localStorage (no PII collected).
 * Provides time-aware greetings, returning-visitor recognition, and
 * "continue where you left off" shortcuts for the Smart Welcome Engine.
 *
 * Storage Keys (all prefixed `apnacare_`):
 *  apnacare_visit_count       — total number of site visits
 *  apnacare_last_visit        — ISO timestamp of previous visit
 *  apnacare_last_page         — last browsed page path
 *  apnacare_last_service      — last service the visitor showed interest in
 *  apnacare_welcome_dismissed — whether the welcome card has been dismissed today
 */

import { useState, useEffect, useCallback } from "react";
import { isBrowser } from "@/lib/analytics";

// ─── Storage helpers ──────────────────────────────────────────────────────────

function lsGet(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function lsSet(key: string, value: string): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore quota / private-browsing errors
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type TimeSlot = "morning" | "afternoon" | "evening" | "night";

export interface VisitorPersona {
  /** 1 on very first visit, 2+ on subsequent visits */
  visitCount: number;
  /** true when visitCount > 1 */
  isReturning: boolean;
  /** ISO string of last visit (before the current session), or null */
  lastVisitAt: string | null;
  /** Path of the last page the visitor browsed (from localStorage), or null */
  lastPage: string | null;
  /** Slug of the last service the visitor interacted with, or null */
  lastService: string | null;
  /** Current local time slot */
  timeSlot: TimeSlot;
  /** Human-readable greeting line (e.g. "Good morning 👋") */
  greeting: string;
  /** Context-aware sub-greeting tailored to visitor history */
  subGreeting: string;
  /** Whether the welcome card should be shown */
  showWelcome: boolean;
  /** Call this when the visitor dismisses the welcome card */
  dismissWelcome: () => void;
  /** Record that the visitor visited a certain page */
  recordPage: (path: string) => void;
  /** Record that the visitor showed interest in a service slug */
  recordService: (slug: string) => void;
}

// ─── Time-slot helper ────────────────────────────────────────────────────────

function getTimeSlot(): TimeSlot {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

const SLOT_EMOJI: Record<TimeSlot, string> = {
  morning: "🌅",
  afternoon: "☀️",
  evening: "🌆",
  night: "🌙",
};

const SLOT_WORD: Record<TimeSlot, string> = {
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night",
};

// ─── Friendly service label map ───────────────────────────────────────────────

const SERVICE_LABELS: Record<string, string> = {
  "elderly-care": "Elderly Care",
  "hospital-attendants": "Hospital Bedside Care",
  "nursing-services": "Nursing Services",
  "post-natal-care": "Post-Natal Care",
  "women-drivers": "Women Drivers",
  "airport-transfers": "Airport Transfers",
  "travel-companions": "Travel Companionship",
  "home-care": "Home Care",
};

function friendlyService(slug: string): string {
  return (
    SERVICE_LABELS[slug] ??
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

// ─── Sub-greeting builder ─────────────────────────────────────────────────────

function buildSubGreeting(
  isReturning: boolean,
  visitCount: number,
  lastService: string | null,
  lastPage: string | null,
  timeSlot: TimeSlot
): string {
  if (isReturning) {
    if (lastService) {
      return `Welcome back! You were exploring **${friendlyService(lastService)}** last time — shall we pick up where you left off?`;
    }
    if (lastPage && lastPage !== "/" && lastPage !== "") {
      const pageLabel = lastPage
        .replace(/^\//, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return `Welcome back! You were last browsing our **${pageLabel}** page. Shall we continue?`;
    }
    if (visitCount >= 5) {
      return `Great to see you again! 🌸 Your trust in ApnaCare means everything to us. How can we assist you today?`;
    }
    return `Welcome back! We're glad you've returned. Our care coordinators are ready to help.`;
  }

  const messages: Record<TimeSlot, string> = {
    morning:
      "Starting your morning with care research? Let us help you find the perfect attendant — quickly and safely.",
    afternoon:
      "Good afternoon! We're here to help you find trusted women attendants for every care need.",
    evening:
      "Good evening! Looking for care support? Our verified attendants are available 24/7.",
    night:
      "Up late ensuring your loved one's care? We're here whenever you need us — around the clock. 💙",
  };

  return messages[timeSlot];
}

// ─── Dismiss key (resets daily) ───────────────────────────────────────────────

function getDismissKey(): string {
  const today = new Date().toISOString().slice(0, 10);
  return `apnacare_welcome_dismissed_${today}`;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useVisitorPersona(): VisitorPersona {
  const [persona, setPersona] = useState<
    Omit<VisitorPersona, "dismissWelcome" | "recordPage" | "recordService">
  >(() => {
    const timeSlot = getTimeSlot();
    return {
      visitCount: 1,
      isReturning: false,
      lastVisitAt: null,
      lastPage: null,
      lastService: null,
      timeSlot,
      greeting: `Good ${SLOT_WORD[timeSlot]} ${SLOT_EMOJI[timeSlot]}`,
      subGreeting: buildSubGreeting(false, 1, null, null, timeSlot),
      showWelcome: false,
    };
  });

  useEffect(() => {
    if (!isBrowser()) return;

    const rawCount = lsGet("apnacare_visit_count");
    const prevVisitAt = lsGet("apnacare_last_visit");
    const lastPage = lsGet("apnacare_last_page");
    const lastService = lsGet("apnacare_last_service");

    const visitCount = rawCount ? parseInt(rawCount, 10) + 1 : 1;
    const isReturning = visitCount > 1;

    lsSet("apnacare_visit_count", String(visitCount));
    lsSet("apnacare_last_visit", new Date().toISOString());

    const dismissKey = getDismissKey();
    const alreadyDismissed = lsGet(dismissKey) === "1";

    const timeSlot = getTimeSlot();

    setPersona({
      visitCount,
      isReturning,
      lastVisitAt: prevVisitAt,
      lastPage,
      lastService,
      timeSlot,
      greeting: `Good ${SLOT_WORD[timeSlot]} ${SLOT_EMOJI[timeSlot]}`,
      subGreeting: buildSubGreeting(
        isReturning,
        visitCount,
        lastService,
        lastPage,
        timeSlot
      ),
      showWelcome: !alreadyDismissed,
    });
  }, []);

  const dismissWelcome = useCallback(() => {
    lsSet(getDismissKey(), "1");
    setPersona((prev) => ({ ...prev, showWelcome: false }));
  }, []);

  const recordPage = useCallback((path: string) => {
    if (!path || path === "/") return;
    lsSet("apnacare_last_page", path);
  }, []);

  const recordService = useCallback((slug: string) => {
    if (!slug) return;
    lsSet("apnacare_last_service", slug);
  }, []);

  return { ...persona, dismissWelcome, recordPage, recordService };
}
