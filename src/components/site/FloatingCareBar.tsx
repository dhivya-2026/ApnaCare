import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { MessageCircle, Phone, Siren, X, Sparkles, Clock } from "lucide-react";
import { SITE, buildWhatsAppUrl } from "@/data/site";
import { track } from "@/lib/analytics";

export function FloatingCareBar() {
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  // Don't show inside booking page to avoid distraction
  if (location.pathname.startsWith("/booking") || !visible) {
    return null;
  }

  const waUrl = buildWhatsAppUrl(
    "Hello ApnaCare coordinator! I need urgent care assistance for my family."
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-2 sm:p-3 pointer-events-none animate-fade-up">
      <div className="container-page max-w-4xl">
        <div className="pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 rounded-2xl border border-primary/20 bg-background/95 p-3 shadow-lift backdrop-blur-md">
          {/* Live Coordinator Indicator */}
          <div className="flex items-center gap-2.5 text-xs text-foreground font-medium">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-primary">Care Coordinator Online</span>
            <span className="hidden md:inline text-muted-foreground">• Response time: &lt;15 mins</span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("floating_whatsapp_click")}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/10 px-4 py-2 text-xs font-semibold text-[#128C7E] dark:text-[#25D366] hover:bg-[#25D366]/20 transition-colors min-h-[40px]"
            >
              <MessageCircle className="size-4 text-[#25D366]" />
              <span>WhatsApp Care Team</span>
            </a>

            <Link
              to="/booking"
              search={{ situation: "Urgent care coordinator dispatch request" }}
              onClick={() => track("floating_emergency_booking_click")}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 transition-all min-h-[40px]"
            >
              <Siren className="size-3.5 text-terracotta" />
              <span>Book Emergency Attendant</span>
            </Link>

            {/* Dismiss Button */}
            <button
              type="button"
              onClick={() => setVisible(false)}
              aria-label="Dismiss quick action bar"
              className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted shrink-0"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
