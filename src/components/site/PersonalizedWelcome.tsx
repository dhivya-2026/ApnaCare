/**
 * PersonalizedWelcome
 * ────────────────────
 * A warm, non-intrusive welcome card that appears at the bottom-left corner
 * of the screen. It:
 *  - Shows a time-aware greeting (morning / afternoon / evening / night)
 *  - Recognises returning visitors and surfacing "continue where you left off"
 *  - Offers 2–3 contextual quick-action shortcuts
 *  - Fires analytics events via the existing `track` pipeline
 *  - Animates in with a smooth slide-up and fades out on dismiss
 *  - Respects a daily dismiss cycle (won't re-appear after dismissal until next day)
 */

import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { X, ArrowRight, Phone, CalendarDays, Sparkles } from "lucide-react";
import { useVisitorPersona } from "@/hooks/useVisitorPersona";
import { track } from "@/lib/analytics";

// ─── Shortcut definitions ─────────────────────────────────────────────────────

interface Shortcut {
  id: string;
  label: string;
  icon: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
}

function buildShortcuts(
  isReturning: boolean,
  lastService: string | null
): Shortcut[] {
  const shortcuts: Shortcut[] = [];

  // If returning visitor with a known service, surface it first
  if (isReturning && lastService) {
    shortcuts.push({
      id: "continue-service",
      label: "Continue Booking",
      icon: <CalendarDays className="size-3.5" />,
      to: `/booking?service=${lastService}`,
    });
  }

  // Book now CTA
  if (shortcuts.length < 3) {
    shortcuts.push({
      id: "book-now",
      label: "Book an Attendant",
      icon: <CalendarDays className="size-3.5" />,
      to: "/booking",
    });
  }

  // Browse services
  if (shortcuts.length < 3) {
    shortcuts.push({
      id: "services",
      label: "Our Services",
      icon: <Sparkles className="size-3.5" />,
      to: "/#services",
    });
  }

  // Call coordinator
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

// ─── Component ────────────────────────────────────────────────────────────────

export function PersonalizedWelcome() {
  const persona = useVisitorPersona();
  const location = useLocation();

  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Record page visit whenever the path changes
  useEffect(() => {
    persona.recordPage(location.pathname);
  }, [location.pathname, persona.recordPage]);

  // Delay the entrance animation so the page content loads first
  useEffect(() => {
    if (!persona.showWelcome) {
      setVisible(false);
      return;
    }
    timerRef.current = setTimeout(() => {
      setVisible(true);
      track("welcome_card_shown", {
        is_returning: persona.isReturning,
        time_slot: persona.timeSlot,
        visit_count: persona.visitCount,
        last_service: persona.lastService ?? "(none)",
      });
    }, 1800); // 1.8 s delay — page settles first

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [persona.showWelcome]);

  function handleDismiss() {
    setExiting(true);
    track("welcome_card_dismissed", {
      is_returning: persona.isReturning,
      time_slot: persona.timeSlot,
    });
    setTimeout(() => {
      setExiting(false);
      setVisible(false);
      persona.dismissWelcome();
    }, 350);
  }

  function handleShortcutClick(shortcutId: string) {
    track("welcome_shortcut_click", {
      shortcut_id: shortcutId,
      is_returning: persona.isReturning,
    });
    handleDismiss();
  }

  if (!visible && !exiting) return null;

  const shortcuts = buildShortcuts(persona.isReturning, persona.lastService);

  return (
    <div
      id="personalized-welcome-card"
      role="complementary"
      aria-label="Personalized welcome"
      style={{
        position: "fixed",
        bottom: "6.5rem",
        left: "1rem",
        zIndex: 45,
        width: "min(22rem, calc(100vw - 2rem))",
        transform: exiting
          ? "translateY(20px)"
          : visible
          ? "translateY(0)"
          : "translateY(24px)",
        opacity: exiting ? 0 : visible ? 1 : 0,
        transition: "transform 0.38s cubic-bezier(.22,1,.36,1), opacity 0.32s ease",
        pointerEvents: visible && !exiting ? "auto" : "none",
      }}
    >
      {/* Card */}
      <div
        style={{
          background: "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--card)) 100%)",
          border: "1px solid hsl(var(--border))",
          borderRadius: "1rem",
          boxShadow:
            "0 8px 32px -4px rgba(0,0,0,0.18), 0 2px 8px -2px rgba(0,0,0,0.10), 0 0 0 1px hsl(var(--border)/0.5)",
          overflow: "hidden",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {/* Top accent gradient strip */}
        <div
          aria-hidden="true"
          style={{
            height: "3px",
            background:
              "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.6) 60%, transparent 100%)",
          }}
        />

        {/* Header */}
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
            {/* Greeting */}
            <p
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: "hsl(var(--foreground))",
                lineHeight: 1.25,
                marginBottom: "0.3rem",
              }}
            >
              {persona.greeting}
            </p>

            {/* Sub-greeting */}
            <p
              style={{
                fontSize: "0.78rem",
                color: "hsl(var(--muted-foreground))",
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
              background: "hsl(var(--muted))",
              border: "none",
              cursor: "pointer",
              color: "hsl(var(--muted-foreground))",
              transition: "background 0.18s, color 0.18s",
              marginTop: "0.05rem",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "hsl(var(--destructive)/0.12)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "hsl(var(--destructive))";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "hsl(var(--muted))";
              (e.currentTarget as HTMLButtonElement).style.color =
                "hsl(var(--muted-foreground))";
            }}
          >
            <X className="size-3.5" />
          </button>
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            height: "1px",
            background: "hsl(var(--border)/0.6)",
            margin: "0 1rem",
          }}
        />

        {/* Quick shortcuts */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.15rem",
            padding: "0.5rem 0.5rem 0.625rem",
          }}
        >
          {shortcuts.map((shortcut) => {
            const commonStyle: React.CSSProperties = {
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.45rem 0.6rem",
              borderRadius: "0.5rem",
              fontSize: "0.78rem",
              fontWeight: 500,
              color: "hsl(var(--foreground))",
              textDecoration: "none",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              transition: "background 0.14s",
            };

            const iconWrapStyle: React.CSSProperties = {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "1.4rem",
              height: "1.4rem",
              borderRadius: "0.35rem",
              background: "hsl(var(--primary)/0.12)",
              color: "hsl(var(--primary))",
              flexShrink: 0,
            };

            const inner = (
              <>
                <span style={iconWrapStyle}>{shortcut.icon}</span>
                <span style={{ flex: 1 }}>{shortcut.label}</span>
                <ArrowRight
                  className="size-3"
                  style={{ color: "hsl(var(--muted-foreground))", opacity: 0.7 }}
                />
              </>
            );

            const hoverBg = "hsl(var(--muted)/0.8)";

            if (shortcut.to) {
              return (
                <Link
                  key={shortcut.id}
                  id={`welcome-shortcut-${shortcut.id}`}
                  to={shortcut.to as never}
                  style={commonStyle}
                  onClick={() => handleShortcutClick(shortcut.id)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = hoverBg;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
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
                  style={commonStyle}
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
                style={commonStyle}
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

        {/* Footer badge */}
        <div
          style={{
            padding: "0.4rem 1rem 0.625rem",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
          }}
        >
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
          <span
            style={{
              fontSize: "0.68rem",
              color: "hsl(var(--muted-foreground))",
              lineHeight: 1,
            }}
          >
            Care coordinators available · 24 hrs / 7 days
          </span>
        </div>
      </div>
    </div>
  );
}
