/**
 * PersonalizedWelcome  (v2 — Session Intelligence Edition)
 * ─────────────────────────────────────────────────────────
 * A warm, non-intrusive welcome card (bottom-left, above WhatsApp button).
 *
 * Features:
 *  - Time-aware greeting (morning / afternoon / evening / night)
 *  - First / returning / Nth-visit recognition
 *  - "Continue where you left off" journey resumption
 *  - Booking draft resumption banner
 *  - Service recommendation shortcuts
 *  - Privacy reset ("Start fresh") option
 *  - Telemetry events via existing track() pipeline
 *  - Respects prefers-reduced-motion
 *  - Daily dismiss cycle (reappears next day)
 *  - Accessible: role, aria-labels, keyboard navigation, focus trap
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
} from "lucide-react";
import { useVisitorPersona, friendlyService } from "@/hooks/useVisitorPersona";
import { track } from "@/lib/analytics";
import { validateResumePath } from "@/lib/sessionEngine";

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
  hasBookingDraft: boolean
): Shortcut[] {
  const shortcuts: Shortcut[] = [];

  // Priority 1: Resume incomplete booking draft
  if (hasBookingDraft && isReturning) {
    shortcuts.push({
      id: "resume-booking",
      label: "Continue My Booking",
      icon: <CalendarDays className="size-3.5" />,
      to: "/booking",
      isPrimary: true,
    });
  }

  // Priority 2: Continue from last service
  if (lastService && shortcuts.length < 3) {
    shortcuts.push({
      id: "continue-service",
      label: `Continue: ${friendlyService(lastService)}`,
      icon: <BookOpen className="size-3.5" />,
      to: `/booking?service=${lastService}`,
      isPrimary: !hasBookingDraft,
    });
  }

  // Priority 3: Return to last page (non-homepage, non-booking)
  const validLastPage = validateResumePath(lastPage);
  if (
    validLastPage &&
    validLastPage !== "/" &&
    validLastPage !== "/booking" &&
    shortcuts.length < 3
  ) {
    const pageLabel = validLastPage
      .replace(/^\//, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    shortcuts.push({
      id: "resume-page",
      label: `Back to: ${pageLabel}`,
      icon: <MapPin className="size-3.5" />,
      to: validLastPage,
    });
  }

  // Fallback: Book now
  if (shortcuts.length < 3) {
    shortcuts.push({
      id: "book-now",
      label: isReturning ? "Book an Attendant" : "Explore Services",
      icon: isReturning ? (
        <CalendarDays className="size-3.5" />
      ) : (
        <Sparkles className="size-3.5" />
      ),
      to: isReturning ? "/booking" : "/services",
      isPrimary: shortcuts.length === 0,
    });
  }

  // Always offer contact
  if (shortcuts.length < 3) {
    shortcuts.push({
      id: "call",
      label: "Call Coordinator",
      icon: <Phone className="size-3.5" />,
      href: "tel:+918000000000",
    });
  }

  return shortcuts.slice(0, 3);
}

// ─── Markdown-lite renderer (bold only) ───────────────────────────────────────

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
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
  const [showPrivacyReset, setShowPrivacyReset] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = prefersReducedMotion();
  // Tracks when the page was hidden so we can measure away-time on re-focus
  const hiddenAtRef = useRef<number | null>(null);
  // Whether the popup was already triggered in this session (so tab-switch doesn't re-trigger infinitely)
  const triggeredRef = useRef(false);

  // Record meaningful page visits (not homepage)
  useEffect(() => {
    if (location.pathname && location.pathname !== "/") {
      persona.recordPage(location.pathname);
    }
    // Track service pages
    if (location.pathname.startsWith("/services/")) {
      const slug = location.pathname.replace("/services/", "").replace(/\/$/, "");
      if (slug) persona.recordService(slug);
    }
    if (location.pathname.startsWith("/solutions/")) {
      const slug = location.pathname.replace("/solutions/", "").replace(/\/$/, "");
      if (slug) persona.recordService(slug);
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Re-entry trigger logic ───────────────────────────────────────────────
  // The popup should ONLY appear when the visitor re-enters the site:
  //   1. New session after a previous visit (isReturning = true)
  //   2. Returning to this tab after being away on another tab for 2+ minutes
  //
  // It does NOT show:
  //   - On first-ever visit (no history)
  //   - While actively browsing within the same tab session
  //   - If dismissed today
  //
  // TAB_AWAY_THRESHOLD: 2 minutes (120 000 ms)
  const TAB_AWAY_THRESHOLD_MS = 2 * 60 * 1000;

  function triggerWelcome(trigger: "new_session" | "tab_return") {
    if (triggeredRef.current) return; // only once per session
    if (!persona.showWelcome) return; // dismissed today
    triggeredRef.current = true;
    const delay = reduceMotion ? 300 : 900;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setVisible(true);
      track("welcome_shown", {
        trigger,
        is_returning: persona.isReturning,
        time_slot: persona.timeSlot,
        visit_count: persona.visitCount,
        last_service: persona.lastService ?? "(none)",
        has_booking_draft: persona.hasBookingDraft,
        page_path: location.pathname,
      });
    }, delay);
  }

  // Trigger 1: New session for a returning visitor
  useEffect(() => {
    if (!persona.showWelcome) return;
    // Only show on returning sessions (visitCount > 1)
    // isReturning becomes true after the engine initialises
    if (persona.isReturning && !triggeredRef.current) {
      triggerWelcome("new_session");
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [persona.showWelcome, persona.isReturning]); // eslint-disable-line react-hooks/exhaustive-deps

  // Trigger 2: Tab re-focus after being away ≥ 2 minutes
  useEffect(() => {
    if (typeof document === "undefined") return;

    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        // Record when the user left
        hiddenAtRef.current = Date.now();
      } else if (document.visibilityState === "visible") {
        // User returned to the tab
        const hiddenAt = hiddenAtRef.current;
        if (hiddenAt === null) return; // wasn't hidden before
        const awayMs = Date.now() - hiddenAt;
        hiddenAtRef.current = null;

        if (awayMs >= TAB_AWAY_THRESHOLD_MS) {
          // Been away long enough — show the welcome card again
          // Reset triggeredRef so it can fire again after a meaningful absence
          triggeredRef.current = false;
          // Also reset dismiss for cross-tab re-entry (don't reset daily dismiss,
          // but allow it to show if persona.showWelcome is still true)
          if (!visible) {
            triggerWelcome("tab_return");
          }
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [persona.showWelcome, persona.isReturning, visible]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDismiss = useCallback(() => {
    setExiting(true);
    track("welcome_dismissed", {
      is_returning: persona.isReturning,
      time_slot: persona.timeSlot,
      visit_count: persona.visitCount,
    });
    const delay = reduceMotion ? 0 : 350;
    setTimeout(() => {
      setExiting(false);
      setVisible(false);
      persona.dismissWelcome();
    }, delay);
  }, [persona, reduceMotion]);

  const handlePrivacyReset = useCallback(() => {
    track("journey_reset", { visit_count: persona.visitCount });
    persona.clearJourney();
    setVisible(false);
  }, [persona]);

  function handleShortcutClick(shortcutId: string) {
    track("welcome_shortcut_click", {
      shortcut_id: shortcutId,
      is_returning: persona.isReturning,
      visit_count: persona.visitCount,
    });
    if (shortcutId !== "call") handleDismiss();
  }

  if (!visible && !exiting) return null;

  const shortcuts = buildShortcuts(
    persona.isReturning,
    persona.lastService,
    persona.lastPage,
    persona.hasBookingDraft
  );

  const transition = reduceMotion
    ? "opacity 0.15s ease"
    : "transform 0.38s cubic-bezier(.22,1,.36,1), opacity 0.32s ease";

  return (
    <div
      id="personalized-welcome-card"
      ref={cardRef}
      role="complementary"
      aria-label="Personalized welcome from ApnaCare"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: "6.5rem",
        left: "1rem",
        zIndex: 45,
        width: "min(22rem, calc(100vw - 2rem))",
        transform: reduceMotion
          ? undefined
          : exiting
          ? "translateY(20px)"
          : visible
          ? "translateY(0)"
          : "translateY(24px)",
        opacity: exiting ? 0 : visible ? 1 : 0,
        transition,
        pointerEvents: visible && !exiting ? "auto" : "none",
      }}
    >
      {/* ── Card shell ───────────────────────────────────────────────── */}
      <div
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(0,0,0,0.10)",
          borderRadius: "1rem",
          boxShadow:
            "0 24px 52px -10px rgba(0,0,0,0.32), 0 8px 16px -4px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}
      >
        {/* Top accent strip */}
        <div
          aria-hidden="true"
          style={{
            height: "3px",
            background: "linear-gradient(90deg, #285C52 0%, #3e887a 60%, transparent 100%)",
          }}
        />

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "0.875rem 1rem 0.5rem",
            gap: "0.5rem",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: "#1e293b",
                lineHeight: 1.25,
                marginBottom: "0.3rem",
              }}
            >
              {persona.greeting}
            </p>
            <p
              style={{
                fontSize: "0.78rem",
                color: "#64748b",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {renderInline(persona.subGreeting)}
            </p>
          </div>

          {/* Dismiss */}
          <button
            id="welcome-card-dismiss"
            aria-label="Dismiss welcome card"
            onClick={handleDismiss}
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "1.75rem",
              height: "1.75rem",
              borderRadius: "50%",
              background: "#f1f5f9",
              border: "none",
              cursor: "pointer",
              color: "#64748b",
              transition: "background 0.18s, color 0.18s",
              marginTop: "0.05rem",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(220,38,38,0.12)";
              (e.currentTarget as HTMLButtonElement).style.color = "#dc2626";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#f1f5f9";
              (e.currentTarget as HTMLButtonElement).style.color = "#64748b";
            }}
          >
            <X className="size-3.5" />
          </button>
        </div>

        {/* ── Divider ────────────────────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{ height: "1px", background: "#e2e8f0", margin: "0 1rem" }}
        />

        {/* ── Quick shortcuts ─────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.15rem",
            padding: "0.5rem 0.5rem 0.5rem",
          }}
        >
          {shortcuts.map((shortcut) => {
            const isPrimary = shortcut.isPrimary;
            const baseStyle: React.CSSProperties = {
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: isPrimary ? "0.5rem 0.75rem" : "0.45rem 0.6rem",
              borderRadius: "0.5rem",
              fontSize: "0.78rem",
              fontWeight: isPrimary ? 600 : 500,
              color: isPrimary ? "#fff" : "#1e293b",
              textDecoration: "none",
              border: "none",
              background: isPrimary ? "#285C52" : "transparent",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              transition: "background 0.14s",
            };

            const iconWrap: React.CSSProperties = {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "1.4rem",
              height: "1.4rem",
              borderRadius: "0.35rem",
              background: isPrimary ? "rgba(255,255,255,0.18)" : "rgba(40,92,82,0.12)",
              color: isPrimary ? "#fff" : "#285C52",
              flexShrink: 0,
            };

            const inner = (
              <>
                <span style={iconWrap}>{shortcut.icon}</span>
                <span style={{ flex: 1 }}>{shortcut.label}</span>
                <ArrowRight
                  className="size-3"
                  style={{ color: isPrimary ? "rgba(255,255,255,0.7)" : "#94a3b8", opacity: 0.9 }}
                />
              </>
            );

            const hoverBg = isPrimary ? "#1f4a42" : "#f1f5f9";
            const hoverColor = isPrimary ? "#fff" : "#1e293b";

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
                    (e.currentTarget as HTMLAnchorElement).style.color = hoverColor;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      isPrimary ? "#285C52" : "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.color = isPrimary ? "#fff" : "#1e293b";
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
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
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
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
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
            padding: "0.35rem 1rem 0.625rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
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
                boxShadow: "0 0 0 2px rgba(34,197,94,0.25)",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <span style={{ fontSize: "0.68rem", color: "#64748b", lineHeight: 1 }}>
              Care coordinators available · 24/7
            </span>
          </div>

          {/* Privacy reset toggle */}
          {persona.isReturning && (
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
                fontSize: "0.65rem",
                padding: "0.1rem 0.25rem",
                borderRadius: "0.3rem",
                transition: "color 0.14s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#64748b";
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

        {/* ── Privacy reset confirmation ──────────────────────────────── */}
        {showPrivacyReset && (
          <div
            style={{
              borderTop: "1px solid #e2e8f0",
              padding: "0.625rem 1rem",
              background: "#fafafa",
            }}
          >
            <p style={{ fontSize: "0.72rem", color: "#475569", marginBottom: "0.5rem" }}>
              This will clear your visit history and journey memory. The site will treat you as a new visitor.
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
                  color: "#fff",
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
                  background: "#fff",
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
