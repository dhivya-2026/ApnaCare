/**
 * PersonalizedWelcome  (v3 — Session Intelligence & Journey Resumption Edition)
 * ─────────────────────────────────────────────────────────────────────────────
 * A warm, non-intrusive floating welcome card (bottom-left, above WhatsApp button).
 *
 * Core Features:
 *  - Session Continuity: Detects same session ID across returns and tab switches
 *  - Journey Memory: Records the last page visited in the session
 *  - Smart Resumption: Displays "Welcome back! Do you want to start where you left off?"
 *  - 1-Click Jump: Instant shortcut back to the visitor's last viewed service/page
 *  - Booking Draft Resumption: Recovers unfinished bookings immediately
 *  - Tab-Away Detection: Fires when visitor returns after moving to another tab (>= 2.5s)
 *  - Non-Intrusive: Does NOT interrupt active browsing from page to page
 *  - High-Contrast Shell: Pure white background (rgba(255,255,255,0.99)) with blur
 *    and deep shadows for 100% visibility over dark hero imagery
 *  - Accessible: role="complementary", aria-live="polite", keyboard dismissable
 */

import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  X,
  ArrowRight,
  Phone,
  CalendarDays,
  Sparkles,
  RotateCcw,
  BookOpen,
  MapPin,
  Compass,
} from "lucide-react";
import { useVisitorPersona, friendlyService } from "@/hooks/useVisitorPersona";
import { track } from "@/lib/analytics";
import {
  validateResumePath,
  getFriendlyPageLabel,
  getLastSessionPage,
} from "@/lib/sessionEngine";

// ─── Shortcut definitions ─────────────────────────────────────────────────────

interface Shortcut {
  id: string;
  label: string;
  icon: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  isPrimary?: boolean;
}

function buildShortcuts(
  isReturning: boolean,
  lastService: string | null,
  lastPage: string | null,
  hasBookingDraft: boolean,
  currentPath: string
): Shortcut[] {
  const shortcuts: Shortcut[] = [];

  // Priority 1: Incomplete booking draft
  if (hasBookingDraft) {
    shortcuts.push({
      id: "resume-booking",
      label: currentPath === "/booking" ? "Continue Current Booking" : "Resume My Booking",
      icon: <CalendarDays className="size-3.5" />,
      to: "/booking",
      isPrimary: true,
    });
  }

  // Priority 2: Resume last page (if different from current path)
  const validLastPage = validateResumePath(lastPage);
  if (
    validLastPage &&
    validLastPage !== currentPath &&
    validLastPage !== "/booking" &&
    shortcuts.length < 3
  ) {
    const pageLabel = getFriendlyPageLabel(validLastPage);
    shortcuts.push({
      id: "resume-page",
      label: `Continue: ${pageLabel}`,
      icon: <MapPin className="size-3.5" />,
      to: validLastPage,
      isPrimary: shortcuts.length === 0,
    });
  }

  // Priority 3: Continue from last explored service
  if (lastService && shortcuts.length < 3) {
    const serviceName = friendlyService(lastService);
    const servicePath = `/services/${lastService}`;
    if (currentPath !== servicePath) {
      shortcuts.push({
        id: "continue-service",
        label: `View: ${serviceName}`,
        icon: <BookOpen className="size-3.5" />,
        to: servicePath,
        isPrimary: shortcuts.length === 0,
      });
    } else {
      shortcuts.push({
        id: "book-service",
        label: `Book: ${serviceName}`,
        icon: <CalendarDays className="size-3.5" />,
        to: `/booking?service=${lastService}`,
        isPrimary: true,
      });
    }
  }

  // Priority 4: Explore services or book attendant
  if (shortcuts.length < 3) {
    shortcuts.push({
      id: "explore-services",
      label: currentPath === "/services" ? "Book an Attendant" : "Explore Care Services",
      icon: isReturning ? <CalendarDays className="size-3.5" /> : <Sparkles className="size-3.5" />,
      to: currentPath === "/services" ? "/booking" : "/services",
      isPrimary: shortcuts.length === 0,
    });
  }

  // Priority 5: Contact Coordinator
  if (shortcuts.length < 3) {
    shortcuts.push({
      id: "call",
      label: "Call Care Coordinator",
      icon: <Phone className="size-3.5" />,
      href: "tel:+918000000000",
    });
  }

  return shortcuts.slice(0, 3);
}

// ─── Markdown-lite renderer ───────────────────────────────────────────────────

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ color: "#1e293b", fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

// ─── Reduced-motion preference ────────────────────────────────────────────────

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PersonalizedWelcome() {
  const persona = useVisitorPersona();
  const location = useLocation();

  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [isReturnTrigger, setIsReturnTrigger] = useState(false);
  const [showPrivacyReset, setShowPrivacyReset] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = prefersReducedMotion();

  // Tracks when the page was hidden / blurred to measure away time on re-focus
  const hiddenAtRef = useRef<number | null>(null);
  // Timestamp when user manually dismissed the card (to avoid immediate re-spam within 10s)
  const dismissedAtRef = useRef<number | null>(null);
  // Whether the card has triggered on initial mount in this view
  const initialTriggerRef = useRef(false);

  // Threshold for tab away: 1.5 seconds (1500 ms)
  // Ensures any genuine tab switch or window blur triggers resumption on return
  const TAB_AWAY_THRESHOLD_MS = 1500;

  // 1. Record every meaningful route change
  useEffect(() => {
    if (location.pathname) {
      if (location.pathname !== "/") {
        persona.recordPage(location.pathname);
      }
      if (location.pathname.startsWith("/services/")) {
        const slug = location.pathname.replace("/services/", "").replace(/\/$/, "");
        if (slug) persona.recordService(slug);
      }
      if (location.pathname.startsWith("/solutions/")) {
        const slug = location.pathname.replace("/solutions/", "").replace(/\/$/, "");
        if (slug) persona.recordService(slug);
      }
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Helper to show the card with animation
  const showCard = useCallback(
    (trigger: "tab_return" | "session_reentry" | "new_session", isReturn = false) => {
      // Don't show if user dismissed within the last 10 seconds
      if (dismissedAtRef.current && Date.now() - dismissedAtRef.current < 10000) {
        return;
      }

      setIsReturnTrigger(isReturn);
      const delay = reduceMotion ? 100 : 350;

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setVisible(true);
        const sessionPage = getLastSessionPage();
        track("welcome_shown", {
          trigger,
          is_return_trigger: isReturn,
          session_id: sessionPage.sessionId,
          last_page: sessionPage.path ?? "(none)",
          last_service: persona.lastService ?? "(none)",
          has_booking_draft: persona.hasBookingDraft,
          current_path: location.pathname,
          visit_count: persona.visitCount,
        });
      }, delay);
    },
    [persona.lastService, persona.hasBookingDraft, persona.visitCount, location.pathname, reduceMotion]
  );

  // ─── Trigger 1: Tab exit & return (moving to another tab and later returning) ─
  useEffect(() => {
    if (typeof document === "undefined") return;

    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        hiddenAtRef.current = Date.now();
      } else if (document.visibilityState === "visible") {
        const hiddenAt = hiddenAtRef.current;
        if (hiddenAt !== null) {
          const awayMs = Date.now() - hiddenAt;
          hiddenAtRef.current = null;

          if (awayMs >= TAB_AWAY_THRESHOLD_MS) {
            // User moved away to another tab and returned!
            showCard("tab_return", true);
          }
        }
      }
    }

    function handleWindowBlur() {
      if (!hiddenAtRef.current) {
        hiddenAtRef.current = Date.now();
      }
    }

    function handleWindowFocus() {
      const hiddenAt = hiddenAtRef.current;
      if (hiddenAt !== null) {
        const awayMs = Date.now() - hiddenAt;
        hiddenAtRef.current = null;
        if (awayMs >= TAB_AWAY_THRESHOLD_MS) {
          showCard("tab_return", true);
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [showCard]);

  // ─── Trigger 2: Homepage return with existing session page history ──────────
  useEffect(() => {
    if (location.pathname === "/") {
      const sessionPage = getLastSessionPage();
      if (sessionPage.path && sessionPage.path !== "/") {
        const timer = setTimeout(() => {
          showCard("session_reentry", true);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname, showCard]);

  // ─── Trigger 3: Re-entering the site in the same session or returning visit ───
  useEffect(() => {
    if (initialTriggerRef.current) return;
    initialTriggerRef.current = true;

    // Check if this is a same-session return with a recorded last page
    const sessionPage = getLastSessionPage();
    const hasRecordedHistory = Boolean(
      sessionPage.path || sessionPage.hasDraft || persona.lastService
    );

    if (hasRecordedHistory) {
      const timer = setTimeout(() => {
        showCard("session_reentry", true);
      }, 600);
      return () => clearTimeout(timer);
    } else if (persona.isReturning && persona.showWelcome) {
      const timer = setTimeout(() => {
        showCard("new_session", false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [persona.isReturning, persona.showWelcome, persona.lastService, showCard]);

  const handleDismiss = useCallback(() => {
    setExiting(true);
    dismissedAtRef.current = Date.now();
    track("welcome_dismissed", {
      is_return: isReturnTrigger,
      visit_count: persona.visitCount,
      current_path: location.pathname,
    });
    const delay = reduceMotion ? 0 : 320;
    setTimeout(() => {
      setExiting(false);
      setVisible(false);
    }, delay);
  }, [isReturnTrigger, persona.visitCount, location.pathname, reduceMotion]);

  const handlePrivacyReset = useCallback(() => {
    track("journey_reset", { visit_count: persona.visitCount });
    persona.clearJourney();
    setShowPrivacyReset(false);
    setVisible(false);
  }, [persona]);

  function handleShortcutClick(shortcutId: string) {
    track("welcome_shortcut_click", {
      shortcut_id: shortcutId,
      is_return: isReturnTrigger,
      current_path: location.pathname,
    });
    if (shortcutId !== "call") handleDismiss();
  }

  if (!visible && !exiting) return null;

  // Resolve best resume target from session engine or persona
  const sessionPage = getLastSessionPage();
  const effectiveLastPage = sessionPage.path || persona.lastPage;
  const effectivePageLabel = sessionPage.path
    ? sessionPage.label
    : persona.lastPageLabel || "your previous page";

  const isCurrentlyOnLastPage =
    Boolean(effectiveLastPage) && effectiveLastPage === location.pathname;

  const shortcuts = buildShortcuts(
    persona.isReturning,
    persona.lastService,
    effectiveLastPage,
    persona.hasBookingDraft || sessionPage.hasDraft,
    location.pathname
  );

  const transition = reduceMotion
    ? "opacity 0.15s ease"
    : "transform 0.36s cubic-bezier(.16,1,.3,1), opacity 0.3s ease";

  return (
    <div
      id="personalized-welcome-card"
      ref={cardRef}
      role="complementary"
      aria-label="Welcome back to ApnaCare"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: "6.5rem",
        left: "1rem",
        zIndex: 60,
        width: "min(22.5rem, calc(100vw - 2rem))",
        transform: reduceMotion
          ? undefined
          : exiting
          ? "translateY(18px) scale(0.98)"
          : visible
          ? "translateY(0) scale(1)"
          : "translateY(22px) scale(0.98)",
        opacity: exiting ? 0 : visible ? 1 : 0,
        transition,
        pointerEvents: visible && !exiting ? "auto" : "none",
      }}
    >
      {/* ── Card Shell (Solid white, 100% visible over dark hero images) ── */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.99)",
          backdropFilter: "blur(16px)",
          border: "1.5px solid rgba(40, 92, 82, 0.18)",
          borderRadius: "1rem",
          boxShadow:
            "0 24px 50px -10px rgba(0, 0, 0, 0.30), 0 10px 20px -5px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
        }}
      >
        {/* Top vibrant emerald accent strip */}
        <div
          aria-hidden="true"
          style={{
            height: "4px",
            background: "linear-gradient(90deg, #285C52 0%, #3e887a 60%, #60a5fa 100%)",
          }}
        />

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div style={{ padding: "0.85rem 1rem 0.5rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "0.5rem",
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Category chip */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  background: "rgba(40, 92, 82, 0.09)",
                  color: "#1e564b",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  padding: "0.2rem 0.55rem",
                  borderRadius: "9999px",
                  letterSpacing: "0.02em",
                  marginBottom: "0.35rem",
                }}
              >
                <Compass className="size-3" />
                <span>
                  {isReturnTrigger || effectiveLastPage
                    ? "PICK UP WHERE YOU LEFT OFF"
                    : "WELCOME TO APNACARE"}
                </span>
              </div>

              {/* Main Headline */}
              <h3
                style={{
                  fontSize: "1.08rem",
                  fontWeight: 700,
                  letterSpacing: "-0.015em",
                  color: "#0f172a",
                  lineHeight: 1.25,
                  margin: "0 0 0.2rem",
                }}
              >
                {isReturnTrigger || persona.isReturning
                  ? "Welcome back! 👋"
                  : persona.greeting}
              </h3>

              {/* Sub-question */}
              <p
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "#285C52",
                  margin: "0 0 0.35rem",
                  lineHeight: 1.35,
                }}
              >
                {effectiveLastPage || persona.hasBookingDraft
                  ? "Do you want to start where you left off?"
                  : "How can our care team assist you today?"}
              </p>
            </div>

            {/* Dismiss button */}
            <button
              id="welcome-card-dismiss"
              aria-label="Dismiss welcome popup"
              onClick={handleDismiss}
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "1.85rem",
                height: "1.85rem",
                borderRadius: "50%",
                background: "#f1f5f9",
                border: "none",
                cursor: "pointer",
                color: "#64748b",
                transition: "background 0.16s, color 0.16s, transform 0.14s",
                marginTop: "0.1rem",
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget;
                btn.style.background = "rgba(220, 38, 38, 0.12)";
                btn.style.color = "#dc2626";
                btn.style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget;
                btn.style.background = "#f1f5f9";
                btn.style.color = "#64748b";
                btn.style.transform = "scale(1)";
              }}
            >
              <X className="size-3.5" />
            </button>
          </div>

          {/* Context Memory Box (Shows the recorded page they were in) */}
          {(effectiveLastPage || persona.hasBookingDraft) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 0.65rem",
                borderRadius: "0.5rem",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                marginTop: "0.35rem",
                marginBottom: "0.2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "0.35rem",
                  background: "rgba(40, 92, 82, 0.12)",
                  color: "#285C52",
                  flexShrink: 0,
                }}
              >
                {persona.hasBookingDraft ? (
                  <CalendarDays className="size-3.5" />
                ) : (
                  <MapPin className="size-3.5" />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0, fontSize: "0.76rem", color: "#475569" }}>
                {persona.hasBookingDraft ? (
                  <span>
                    You have an <strong>unfinished booking draft</strong> saved.
                  </span>
                ) : isCurrentlyOnLastPage ? (
                  <span>
                    You are viewing <strong>{effectivePageLabel}</strong>.
                  </span>
                ) : (
                  <span>
                    You were on <strong>{effectivePageLabel}</strong>.
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Intro text when no recorded page yet */}
          {!effectiveLastPage && !persona.hasBookingDraft && (
            <p
              style={{
                fontSize: "0.76rem",
                color: "#64748b",
                lineHeight: 1.45,
                margin: "0.25rem 0 0",
              }}
            >
              {renderInline(persona.subGreeting)}
            </p>
          )}
        </div>

        {/* ── Divider ────────────────────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{ height: "1px", background: "#f1f5f9", margin: "0.25rem 1rem" }}
        />

        {/* ── Quick Action Shortcuts ──────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
            padding: "0.4rem 0.65rem 0.55rem",
          }}
        >
          {shortcuts.map((shortcut) => {
            const isPrimary = shortcut.isPrimary;
            const baseStyle: React.CSSProperties = {
              display: "flex",
              alignItems: "center",
              gap: "0.55rem",
              padding: isPrimary ? "0.6rem 0.85rem" : "0.48rem 0.75rem",
              borderRadius: "0.55rem",
              fontSize: isPrimary ? "0.82rem" : "0.77rem",
              fontWeight: isPrimary ? 650 : 500,
              color: isPrimary ? "#ffffff" : "#1e293b",
              textDecoration: "none",
              border: isPrimary ? "none" : "1px solid #f1f5f9",
              background: isPrimary ? "#285C52" : "#f8fafc",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              transition: "all 0.15s ease",
              boxShadow: isPrimary
                ? "0 4px 12px rgba(40, 92, 82, 0.25)"
                : "none",
            };

            const iconWrap: React.CSSProperties = {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "1.5rem",
              height: "1.5rem",
              borderRadius: "0.35rem",
              background: isPrimary ? "rgba(255, 255, 255, 0.20)" : "rgba(40, 92, 82, 0.10)",
              color: isPrimary ? "#ffffff" : "#285C52",
              flexShrink: 0,
            };

            const inner = (
              <>
                <span style={iconWrap}>{shortcut.icon}</span>
                <span style={{ flex: 1, letterSpacing: "-0.01em" }}>{shortcut.label}</span>
                <ArrowRight
                  className="size-3.5"
                  style={{
                    color: isPrimary ? "rgba(255, 255, 255, 0.85)" : "#94a3b8",
                    transition: "transform 0.15s ease",
                  }}
                />
              </>
            );

            const hoverBg = isPrimary ? "#1f4a42" : "#f1f5f9";

            if (shortcut.to) {
              return (
                <Link
                  key={shortcut.id}
                  id={`welcome-shortcut-${shortcut.id}`}
                  to={shortcut.to as never}
                  style={baseStyle}
                  onClick={() => handleShortcutClick(shortcut.id)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = hoverBg;
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      isPrimary ? "#285C52" : "#f8fafc";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(0)";
                  }}
                >
                  {inner}
                </Link>
              );
            }

            if (shortcut.href) {
              return (
                <a
                  key={shortcut.id}
                  id={`welcome-shortcut-${shortcut.id}`}
                  href={shortcut.href}
                  style={baseStyle}
                  onClick={() => handleShortcutClick(shortcut.id)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = hoverBg;
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "#f8fafc";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(0)";
                  }}
                >
                  {inner}
                </a>
              );
            }

            return (
              <button
                key={shortcut.id}
                id={`welcome-shortcut-${shortcut.id}`}
                style={baseStyle}
                onClick={() => {
                  shortcut.onClick?.();
                  handleShortcutClick(shortcut.id);
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = hoverBg;
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateX(2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#f8fafc";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateX(0)";
                }}
              >
                {inner}
              </button>
            );
          })}
        </div>

        {/* ── Footer ─────────────────────────────────────────────────── */}
        <div
          style={{
            padding: "0.35rem 1rem 0.65rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
            borderTop: "1px solid #f1f5f9",
          }}
        >
          {/* Live status */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <div
              style={{
                width: "0.45rem",
                height: "0.45rem",
                borderRadius: "50%",
                background: "#22c55e",
                flexShrink: 0,
                boxShadow: "0 0 0 2px rgba(34, 197, 94, 0.25)",
              }}
            />
            <span style={{ fontSize: "0.68rem", color: "#64748b", lineHeight: 1 }}>
              Care coordinators available · 24/7
            </span>
          </div>

          {/* Privacy reset option */}
          {(persona.isReturning || effectiveLastPage) && (
            <button
              id="welcome-privacy-reset"
              aria-label="Clear journey history and start fresh"
              title="Clear my journey history"
              onClick={() => setShowPrivacyReset((v) => !v)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#94a3b8",
                display: "flex",
                alignItems: "center",
                gap: "0.2rem",
                fontSize: "0.66rem",
                padding: "0.15rem 0.35rem",
                borderRadius: "0.3rem",
                transition: "color 0.14s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#475569";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
              }}
            >
              <RotateCcw className="size-2.5" />
              Start fresh
            </button>
          )}
        </div>

        {/* ── Privacy reset confirmation panel ─────────────────────────── */}
        {showPrivacyReset && (
          <div
            style={{
              borderTop: "1px solid #e2e8f0",
              padding: "0.65rem 1rem",
              background: "#fafafa",
            }}
          >
            <p style={{ fontSize: "0.72rem", color: "#475569", margin: "0 0 0.5rem" }}>
              Clear recorded visit history and start fresh as a new visitor?
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                id="welcome-privacy-reset-confirm"
                onClick={handlePrivacyReset}
                style={{
                  flex: 1,
                  padding: "0.35rem 0.5rem",
                  borderRadius: "0.4rem",
                  border: "none",
                  background: "#ef4444",
                  color: "#ffffff",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Clear History
              </button>
              <button
                id="welcome-privacy-reset-cancel"
                onClick={() => setShowPrivacyReset(false)}
                style={{
                  flex: 1,
                  padding: "0.35rem 0.5rem",
                  borderRadius: "0.4rem",
                  border: "1px solid #e2e8f0",
                  background: "#ffffff",
                  color: "#64748b",
                  fontSize: "0.72rem",
                  cursor: "pointer",
                }}
              >
                Keep It
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
