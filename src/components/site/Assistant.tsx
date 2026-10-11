import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { MessageCircleHeart, X, Send, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES, SITE, buildWhatsAppUrl } from "@/data/site";
import { track } from "@/lib/analytics";

// ─── Rule-based chatbot engine ────────────────────────────────────────────────
// Replace the `respond` function with a real AI backend call when ready.
// This is a guided quick-reply flow — it does NOT claim to be AI or a live agent.

interface QuickReply {
  label: string;
  action:
    | { type: "message"; text: string; nextReplies?: string[] }
    | { type: "navigate"; to: string; label: string }
    | { type: "booking"; service: string }
    | { type: "whatsapp"; msg: string }
    | { type: "call" };
}

interface BotMsg {
  from: "bot" | "user";
  text: string;
  replies?: QuickReply[];
  link?: { label: string; href?: string; to?: string };
}

const SERVICE_REPLIES: QuickReply[] = SERVICES.filter((s) => s.active).map((s) => ({
  label: s.name,
  action: { type: "booking", service: s.slug },
}));

const MAIN_MENU: QuickReply[] = [
  { label: "🏠 Elderly Care", action: { type: "booking", service: "elderly-care" } },
  { label: "🏥 Hospital Attendants", action: { type: "booking", service: "hospital-attendants" } },
  { label: "💉 Nursing Services", action: { type: "booking", service: "nursing-services" } },
  { label: "👶 Post-Natal Care", action: { type: "booking", service: "post-natal-care" } },
  { label: "🚗 Women Drivers", action: { type: "booking", service: "women-drivers" } },
  { label: "✈️ Airport Transfers", action: { type: "booking", service: "airport-pickup" } },
  { label: "🧳 Travel Companion", action: { type: "booking", service: "travel-assistance" } },
  { label: "💰 Pricing", action: { type: "navigate", to: "/#pricing", label: "View Pricing" } },
  { label: "📅 Book Now", action: { type: "navigate", to: "/booking", label: "Go to Booking" } },
  {
    label: "🛡️ Safety & Trust",
    action: { type: "navigate", to: "/safety", label: "Safety Overview" },
  },
  { label: "📞 Contact Support", action: { type: "call" } },
  {
    label: "💬 WhatsApp Us",
    action: { type: "whatsapp", msg: "Hi! I'd like more info about ApnaCare services." },
  },
];

const SERVICE_ANSWERS: Record<string, { reply: string; price: string }> = {
  "elderly-care": {
    reply:
      "Elderly Care provides 24/7 compassionate companionship, medication reminders, mobility assistance, and daily wellness updates to family. Our attendants are geriatric-certified and police verified.",
    price: "Starting from ₹1,299/day",
  },
  "hospital-attendants": {
    reply:
      "Hospital Attendants stay by your family member's bedside round the clock, coordinate with nursing staff, assist with hygiene, and keep you updated every few hours.",
    price: "Starting from ₹1,499/day",
  },
  "nursing-services": {
    reply:
      "Qualified GNM/B.Sc nurses provide clinical home care including wound dressings, injections, catheter care, and vitals monitoring under doctor prescription compliance.",
    price: "Starting from ₹1,999/day",
  },
  "post-natal-care": {
    reply:
      "Post-natal specialists handle newborn oil massage, umbilical cord care, feeding support, and allow new mothers deep, restorative rest after delivery.",
    price: "Starting from ₹1,999/day",
  },
  "women-drivers": {
    reply:
      "Licensed, defensive-driving certified women chauffeurs available for daily commutes, clinic visits, school runs, and outstation trips with vehicle safety checks.",
    price: "Starting from ₹1,199/day",
  },
  "airport-pickup": {
    reply:
      "A trusted woman companion meets your family member at the arrival gate with a name placard, assists with baggage, wheelchair coordination, and escorts them safely home.",
    price: "Starting from ₹999/trip",
  },
  "travel-assistance": {
    reply:
      "End-to-end travel companions for intercity flights, trains, and road trips. They handle luggage, tickets, boarding, and share real-time GPS with your family.",
    price: "Starting from ₹1,599/day",
  },
};

function respond(choice: QuickReply): BotMsg {
  const { action } = choice;

  if (action.type === "message") {
    return {
      from: "bot",
      text: action.text,
      replies: MAIN_MENU,
    };
  }

  if (action.type === "booking") {
    const info = SERVICE_ANSWERS[action.service];
    const svc = SERVICES.find((s) => s.slug === action.service);
    if (!svc || !info) {
      return { from: "bot", text: "Let me take you to our booking page.", replies: [] };
    }
    return {
      from: "bot",
      text: `${info.reply}\n\n${info.price} · Verified women attendants · 18% GST invoicing included.`,
      replies: [
        {
          label: `📅 Book ${svc.name}`,
          action: {
            type: "navigate",
            to: `/booking?service=${svc.slug}`,
            label: `Book ${svc.name}`,
          },
        },
        {
          label: "💬 Ask on WhatsApp",
          action: {
            type: "whatsapp",
            msg: `Hi! I'm interested in ${svc.name}. Can you share more details?`,
          },
        },
        {
          label: "⬅️ Main Menu",
          action: { type: "message", text: "Here's what I can help with:", nextReplies: [] },
        },
      ],
    };
  }

  if (action.type === "navigate") {
    return {
      from: "bot",
      text: `Here you go — tap the button below.`,
      link: { label: action.label, to: action.to },
      replies: [
        {
          label: "⬅️ Main Menu",
          action: { type: "message", text: "Here's what I can help with:", nextReplies: [] },
        },
      ],
    };
  }

  if (action.type === "whatsapp") {
    return {
      from: "bot",
      text: `You'll be redirected to WhatsApp to chat with our team directly.\n\n⚠️ Note: The number shown is a placeholder — please update it before going live.`,
      link: { label: "Open WhatsApp", href: buildWhatsAppUrl(action.msg) },
      replies: [
        {
          label: "⬅️ Main Menu",
          action: { type: "message", text: "Here's what I can help with:", nextReplies: [] },
        },
      ],
    };
  }

  if (action.type === "call") {
    return {
      from: "bot",
      text: `You can reach our support team at:\n📞 ${SITE.SUPPORT_PHONE}\n\nFor emergencies, please contact local emergency services (112) directly — we are not an emergency response service.`,
      link: { label: `Call ${SITE.SUPPORT_PHONE}`, href: `tel:${SITE.SUPPORT_PHONE_TEL}` },
      replies: [
        {
          label: "⬅️ Main Menu",
          action: { type: "message", text: "Here's what I can help with:", nextReplies: [] },
        },
      ],
    };
  }

  return {
    from: "bot",
    text: "I'm not sure how to help with that. Please choose an option below or contact our team directly.",
    replies: MAIN_MENU,
  };
}

const WELCOME: BotMsg = {
  from: "bot",
  text: "Hi! 👋 Welcome to **ApnaCare**.\n\nI'm a guided assistant — not a live agent or AI. I can help you explore services, pricing, and get you to the right page.\n\nHow can I help you today?",
  replies: MAIN_MENU,
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<BotMsg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [msgs, open]);

  const handleQuickReply = (choice: QuickReply) => {
    track("assistant_message", { label: choice.label });

    const userMsg: BotMsg = { from: "user", text: choice.label };
    const botReply = respond(choice);

    setMsgs((prev) => [...prev, userMsg, botReply]);
  };

  const handleTextInput = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");

    // Simple keyword matching for free-text
    const lower = text.toLowerCase();
    const fallbackChoice: QuickReply =
      lower.includes("elder") || lower.includes("senior") || lower.includes("old")
        ? { label: text, action: { type: "booking", service: "elderly-care" } }
        : lower.includes("hospital") || lower.includes("bedside")
          ? { label: text, action: { type: "booking", service: "hospital-attendants" } }
          : lower.includes("nurs")
            ? { label: text, action: { type: "booking", service: "nursing-services" } }
            : lower.includes("baby") ||
                lower.includes("natal") ||
                lower.includes("mother") ||
                lower.includes("newborn")
              ? { label: text, action: { type: "booking", service: "post-natal-care" } }
              : lower.includes("driver") || lower.includes("car") || lower.includes("drive")
                ? { label: text, action: { type: "booking", service: "women-drivers" } }
                : lower.includes("airport") || lower.includes("flight")
                  ? { label: text, action: { type: "booking", service: "airport-pickup" } }
                  : lower.includes("travel") || lower.includes("train")
                    ? { label: text, action: { type: "booking", service: "travel-assistance" } }
                    : lower.includes("price") ||
                        lower.includes("cost") ||
                        lower.includes("fee") ||
                        lower.includes("rate")
                      ? {
                          label: text,
                          action: { type: "navigate", to: "/#pricing", label: "View Pricing" },
                        }
                      : lower.includes("book")
                        ? {
                            label: text,
                            action: { type: "navigate", to: "/booking", label: "Go to Booking" },
                          }
                        : lower.includes("whatsapp")
                          ? { label: text, action: { type: "whatsapp", msg: text } }
                          : lower.includes("call") ||
                              lower.includes("phone") ||
                              lower.includes("contact")
                            ? { label: text, action: { type: "call" } }
                            : {
                                label: text,
                                action: {
                                  type: "message",
                                  text: "I'm not sure about that. I'm a guided assistant and work best with the options below. For detailed help, please WhatsApp or call our team.",
                                },
                              };

    const userMsg: BotMsg = { from: "user", text };
    const botReply = respond(fallbackChoice);
    setMsgs((prev) => [...prev, userMsg, botReply]);
  };

  const lastMsg = msgs[msgs.length - 1];
  const quickReplies = lastMsg?.replies ?? [];

  return (
    <>
      {/* Launcher — bottom-right */}
      <button
        onClick={() => {
          setOpen((v) => !v);
          if (!open) track("assistant_open");
        }}
        aria-label={open ? "Close ApnaCare Assistant" : "Open ApnaCare Assistant"}
        aria-expanded={open}
        className="fixed bottom-24 right-4 z-50 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform hover:scale-105 md:bottom-6"
      >
        {open ? <X className="size-5" /> : <MessageCircleHeart className="size-5" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="ApnaCare Assistant"
          aria-modal="true"
          className="fixed bottom-40 right-4 z-50 flex max-h-[75vh] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-lift md:bottom-24 animate-fade-in"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <div>
              <p className="font-display text-base font-semibold">ApnaCare Assistant</p>
              <p className="text-xs opacity-80">Guided help · Not a live agent or AI</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="grid size-7 place-items-center rounded-full hover:bg-primary-foreground/15 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto p-4"
            aria-live="polite"
            aria-relevant="additions"
          >
            {msgs.map((m, i) => (
              <div
                key={i}
                className={
                  m.from === "user"
                    ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-primary/10 px-3 py-2 text-sm"
                    : "max-w-[90%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2.5 text-sm"
                }
              >
                {/* Render text with newlines */}
                {m.text.split("\n").map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < m.text.split("\n").length - 1 && <br />}
                  </span>
                ))}

                {/* Action link */}
                {m.link && (
                  <div className="mt-2">
                    {m.link.href ? (
                      <a
                        href={m.link.href}
                        target={m.link.href.startsWith("tel:") ? undefined : "_blank"}
                        rel="noreferrer"
                        onClick={() => {
                          track("assistant_link_click", { label: m.link!.label });
                          setOpen(false);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        {m.link.href.startsWith("tel:") ? <Phone className="size-3" /> : null}
                        {m.link.label}
                      </a>
                    ) : (
                      <Link
                        to={m.link.to!}
                        onClick={() => {
                          track("assistant_link_click", { label: m.link!.label });
                          setOpen(false);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        {m.link.label}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick replies */}
          {quickReplies.length > 0 && (
            <div className="flex max-h-36 flex-wrap gap-1.5 overflow-y-auto border-t border-border bg-secondary/30 p-3">
              {quickReplies.map((r) => (
                <button
                  key={r.label}
                  onClick={() => handleQuickReply(r)}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary hover:text-primary"
                >
                  {r.label}
                </button>
              ))}
            </div>
          )}

          {/* Text input */}
          <div className="flex gap-2 border-t border-border p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleTextInput();
              }}
              placeholder="Type a message…"
              aria-label="Type a message to the assistant"
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={handleTextInput}
              aria-label="Send message"
              className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
            >
              <Send className="size-4" />
            </button>
          </div>

          {/* Emergency disclaimer */}
          <p className="border-t border-border bg-muted/50 px-3 py-2 text-center text-[10px] text-muted-foreground leading-snug">
            🚨 For emergencies, dial <strong>112</strong>. This chatbot does not provide emergency
            response.
          </p>
        </div>
      )}
    </>
  );
}
