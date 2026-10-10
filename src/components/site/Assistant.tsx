import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MessageCircleHeart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/data/site";
import { track } from "@/lib/analytics";

// Rule-based mock engine. Replace `respond` with a server-backed AI call later.
const CHOICES: { label: string; service?: string; to?: "/safety" | "/ecosystem-partners" | "/services" | "/booking" }[] = [
  { label: "I need elderly care", service: "elderly-care" },
  { label: "I need hospital support", service: "hospital-attendants" },
  { label: "I need nursing care", service: "nursing-services" },
  { label: "I need travel assistance", service: "airport-pickup" },
  { label: "I need a women driver", service: "women-drivers" },
  { label: "I need airport assistance", service: "airport-pickup" },
  { label: "I need help with safety", to: "/safety" },
  { label: "I want to book a service", to: "/booking" },
  { label: "I am looking for a partnership", to: "/ecosystem-partners" },
  { label: "I am just exploring", to: "/services" },
];

type Msg = { from: "bot" | "me"; text: string; choice?: (typeof CHOICES)[number] };

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: "Hi! Welcome to ApnaCare. How can we help you today?" }]);

  const pick = (c: (typeof CHOICES)[number]) => {
    track("assistant_message", { text: c.label });
    const svc = c.service ? SERVICES.find((s) => s.slug === c.service) : undefined;
    if (svc) track("assistant_service_recommendation", { service: svc.slug });
    const reply = svc
      ? `I'd recommend ${svc.name} — from ₹${svc.startingPrice.toLocaleString("en-IN")}/${svc.pricingUnit}, with verified women attendants.`
      : "Here's the best place to start.";
    setMsgs((m) => [...m, { from: "me", text: c.label }, { from: "bot", text: reply, choice: c }]);
  };

  return (
    <>
      <button
        onClick={() => { setOpen(!open); if (!open) track("assistant_open"); }}
        aria-label={open ? "Close ApnaCare Assistant" : "Open ApnaCare Assistant"}
        aria-expanded={open}
        className="fixed bottom-24 right-4 z-50 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform hover:scale-105 md:bottom-6"
      >
        {open ? <X /> : <MessageCircleHeart />}
      </button>
      {open && (
        <div role="dialog" aria-label="ApnaCare Assistant" className="fixed bottom-40 right-4 z-50 flex max-h-[70vh] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden card-soft shadow-lift md:bottom-24">
          <div className="bg-primary px-5 py-4 text-primary-foreground">
            <p className="font-display text-lg font-semibold">ApnaCare Assistant</p>
            <p className="text-xs opacity-80">Guided help · not a medical advisor</p>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === "me" ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-secondary px-3 py-2 text-sm" : "max-w-[90%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm"}>
                {m.text}
                {m.choice && (
                  <div className="mt-2">
                    <Button asChild size="sm" onClick={() => { track("assistant_booking_start"); setOpen(false); }}>
                      {m.choice.service
                        ? <Link to="/booking" search={{ service: m.choice.service }}>Book this</Link>
                        : <Link to={m.choice.to!}>Go</Link>}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex max-h-40 flex-wrap gap-2 overflow-y-auto border-t border-border p-3">
            {CHOICES.map((c) => (
              <button key={c.label} onClick={() => pick(c)} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary">{c.label}</button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
