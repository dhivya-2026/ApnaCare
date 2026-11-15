import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { X, HeartHandshake, Cpu, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

interface OptionChoice {
  id: "care" | "technology" | "women-child";
  title: string;
  description: string;
  icon: typeof HeartHandshake;
  targetUrl: string;
  badge: string;
}

const OPTIONS: OptionChoice[] = [
  {
    id: "care",
    title: "I Need Care or Assistance",
    description: "In-home elderly support, hospital bedside assistance, nursing or postnatal care.",
    icon: HeartHandshake,
    targetUrl: "/booking",
    badge: "Operational Now",
  },
  {
    id: "technology",
    title: "Explore Technology Solutions",
    description: "Remote monitoring, smart-home sensors, fall safety & care management.",
    icon: Cpu,
    targetUrl: "/offerings#technology",
    badge: "10 Categories",
  },
  {
    id: "women-child",
    title: "Explore Women & Child Initiatives",
    description: "Girl-child development, Self-Help Group employment & maternal health.",
    icon: Sparkles,
    targetUrl: "/offerings#women-child",
    badge: "Lifelong Impact",
  },
];

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"care" | "technology" | "women-child">("care");
  const location = useLocation();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Check if current route is excluded (booking, auth, dashboard)
  const isExcludedRoute = () => {
    const p = location.pathname.toLowerCase();
    return (
      p.startsWith("/booking") ||
      p.startsWith("/login") ||
      p.startsWith("/register") ||
      p.startsWith("/dashboard")
    );
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isExcludedRoute()) return;

    // Check frequency caps
    const sessionSeen = sessionStorage.getItem("lifesakhi_exit_intent_seen");
    if (sessionSeen) return;

    const lastShown = localStorage.getItem("lifesakhi_exit_intent_last_shown");
    if (lastShown) {
      const hoursSinceLast = (Date.now() - parseInt(lastShown, 10)) / (1000 * 60 * 60);
      if (hoursSinceLast < 24) return;
    }

    let isEnabled = false;
    // Wait for at least 8 seconds of engagement before activating exit detection
    const enableTimer = setTimeout(() => {
      isEnabled = true;
    }, 8000);

    // Desktop: Mouse leaving top boundary
    const handleMouseLeave = (e: MouseEvent) => {
      if (!isEnabled || isExcludedRoute()) return;
      if (e.clientY <= 10 && (!e.relatedTarget || (e.relatedTarget as HTMLElement).nodeName === "HTML")) {
        triggerPopup("desktop_top_boundary");
      }
    };

    // Mobile: Inactivity after significant scroll
    let scrollTriggered = false;
    let mobileTimer: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (!isEnabled || scrollTriggered || isExcludedRoute()) return;
      const scrollDepth = window.scrollY + window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;
      if (scrollDepth / totalHeight > 0.55) {
        scrollTriggered = true;
        // If mobile user scrolled half the page and then pauses, trigger gently
        mobileTimer = setTimeout(() => {
          if (!sessionStorage.getItem("lifesakhi_exit_intent_seen")) {
            triggerPopup("mobile_scroll_engagement");
          }
        }, 12000);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(enableTimer);
      if (mobileTimer) clearTimeout(mobileTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const triggerPopup = (source: string) => {
    if (sessionStorage.getItem("lifesakhi_exit_intent_seen")) return;
    if (isExcludedRoute()) return;

    sessionStorage.setItem("lifesakhi_exit_intent_seen", "true");
    localStorage.setItem("lifesakhi_exit_intent_last_shown", Date.now().toString());

    previousActiveElement.current = document.activeElement as HTMLElement;
    setIsOpen(true);

    track("exit_intent_impression", {
      trigger_source: source,
      current_route: location.pathname,
    });
  };

  const handleClose = (reason: "close_button" | "backdrop" | "escape") => {
    setIsOpen(false);
    track("exit_intent_dismissed", {
      dismiss_reason: reason,
      selected_option: selectedOption,
      current_route: location.pathname,
    });
    if (previousActiveElement.current) {
      previousActiveElement.current.focus();
    }
  };

  // Keyboard accessibility: Escape key and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose("escape");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSelectOption = (optId: "care" | "technology" | "women-child") => {
    setSelectedOption(optId);
    track("exit_intent_option_selected", {
      option_id: optId,
      current_route: location.pathname,
    });
  };

  const handleSubmit = () => {
    const selected = OPTIONS.find((o) => o.id === selectedOption) ?? OPTIONS[0];
    track("exit_intent_cta_clicked", {
      selected_option: selected.id,
      destination_url: selected.targetUrl,
      current_route: location.pathname,
    });
    setIsOpen(false);

    if (selected.targetUrl.includes("#")) {
      const [path, hash] = selected.targetUrl.split("#");
      navigate({ to: path as any });
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      navigate({ to: selected.targetUrl as any });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      aria-describedby="exit-intent-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-xs animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose("backdrop");
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-xl rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-8 animate-fade-up text-foreground"
      >
        {/* Accessible Close Button */}
        <button
          type="button"
          onClick={() => handleClose("close_button")}
          aria-label="Close dialog"
          className="absolute right-5 top-5 grid size-9 place-items-center rounded-full border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <X className="size-4" />
        </button>

        {/* Header Content */}
        <div className="pr-8">
          <span className="eyebrow text-terracotta">We are here to help</span>
          <h2 id="exit-intent-title" className="mt-2 font-display text-2xl font-semibold sm:text-3xl text-foreground">
            Before you go, let&apos;s make things a little easier.
          </h2>
          <p id="exit-intent-desc" className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Whether you&apos;re looking for care, exploring opportunities for women, or discovering technology-enabled solutions, we&apos;re here to help.
          </p>
        </div>

        {/* 3 Interactive Choices */}
        <div className="mt-6 space-y-3" role="radiogroup" aria-label="Select what you are looking for">
          {OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedOption === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all ${
                  isSelected
                    ? "border-primary bg-primary-soft/50 shadow-xs ring-1 ring-primary/40"
                    : "border-border bg-background/60 hover:border-primary/30 hover:bg-background"
                }`}
              >
                <div
                  className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl ${
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="size-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-semibold text-foreground">
                      {opt.title}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-card border border-border px-2 py-0.5 rounded-full shrink-0">
                      {opt.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {opt.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-6 pt-5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-primary shrink-0" />
            <span>South India care coordination desks</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleClose("close_button")}
              className="rounded-full flex-1 sm:flex-none"
            >
              Maybe Later
            </Button>
            <Button
              type="button"
              size="sm"
              variant="warm"
              onClick={handleSubmit}
              className="rounded-full font-bold flex-1 sm:flex-none shadow-soft"
            >
              <span>Request Assistance</span>
              <ArrowRight className="size-3.5 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

