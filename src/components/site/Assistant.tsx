import { useState, useRef, useEffect, useMemo } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { MessageCircleHeart, X, Send, Phone, RotateCcw, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES, CITIES, SITE, formatINR, buildWhatsAppUrl, Service, getICP, getService } from "@/data/site";
import { track, sendToGoogleSheet } from "@/lib/analytics";
import { useVisitorPersona } from "@/hooks/useVisitorPersona";

// ─── Types ────────────────────────────────────────────────────────────────────

interface QuickReply {
  label: string;
  action:
    | { type: "message"; text: string; nextReplies?: QuickReply[] }
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

interface PageContextInfo {
  badge: string;
  greeting: string;
  initialReplies: QuickReply[];
  service?: Service;
  whatsappMessage: string;
}

// ─── Global Fallback Menus ───────────────────────────────────────────────────

const GLOBAL_MENU: QuickReply[] = [
  { label: "🏠 Elderly Care", action: { type: "booking", service: "elderly-care" } },
  { label: "🏥 Hospital Bedside", action: { type: "booking", service: "hospital-attendants" } },
  { label: "💉 Nursing Care", action: { type: "booking", service: "nursing-services" } },
  { label: "👶 Post-Natal Care", action: { type: "booking", service: "post-natal-care" } },
  { label: "🚗 Women Drivers", action: { type: "booking", service: "women-drivers" } },
  {
    label: "💰 Pricing & GST",
    action: { type: "navigate", to: "/#pricing", label: "View Pricing" },
  },
  {
    label: "📅 Book an Attendant",
    action: { type: "navigate", to: "/booking", label: "Go to Booking" },
  },
  {
    label: "🛡️ Safety Protocols",
    action: { type: "navigate", to: "/safety", label: "Safety Overview" },
  },
  { label: "📞 Call Coordinator", action: { type: "call" } },
  {
    label: "💬 WhatsApp Care Desk",
    action: {
      type: "whatsapp",
      msg: "Hi ApnaCare! I would like more information about your care services.",
    },
  },
];

// ─── Helper: Derive Context from Pathname ────────────────────────────────────

function getPageContext(pathname: string): PageContextInfo {
  // 0. ICP Solution pages: /solutions/:slug
  if (pathname.startsWith("/solutions/")) {
    const slug = pathname.replace("/solutions/", "").replace(/\/$/, "");
    const icp = getICP(slug);
    if (icp) {
      const servicesList = icp.featuredServices
        .map((s) => getService(s)?.name)
        .filter(Boolean)
        .join(", ");
      return {
        badge: icp.name,
        greeting: `Welcome! Looking for verified care solutions for **${icp.name}**?\n${icp.summary}\n\nI can answer questions on matched services (${servicesList}), pricing, or connect you with our specialized coordinator.`,
        whatsappMessage: `Hi ApnaCare! I'm viewing care solutions for ${icp.name} (${pathname}) and would like assistance.`,
        initialReplies: [
          {
            label: `🛡️ Solutions for ${icp.name}`,
            action: {
              type: "message",
              text: `Key solutions for ${icp.name}:\n• ${icp.painPoints.map((p) => `${p.problem} ➔ ${p.solution}`).join("\n• ")}`,
            },
          },
          {
            label: `⭐ Matched Services (${icp.featuredServices.length})`,
            action: {
              type: "message",
              text: `Recommended services for ${icp.name}:\n• ${icp.featuredServices
                .map((s) => {
                  const sObj = getService(s);
                  return sObj ? `${sObj.name} (${formatINR(sObj.startingPrice)}/${sObj.pricingUnit})` : s;
                })
                .join("\n• ")}`,
            },
          },
          {
            label: `💬 WhatsApp ${icp.name} Desk`,
            action: {
              type: "whatsapp",
              msg: `Hi ApnaCare! I'm interested in booking care solutions for ${icp.name}.`,
            },
          },
          {
            label: `📅 Book an Attendant`,
            action: { type: "booking", service: icp.featuredServices[0] || "elderly-care" },
          },
          {
            label: "📞 Call Coordinator",
            action: { type: "call" },
          },
          {
            label: "🌐 Explore Other Profiles",
            action: { type: "navigate", to: "/", label: "Home Page" },
          },
        ],
      };
    }
  }

  // 1. Service detail pages: /services/:slug
  if (pathname.startsWith("/services/")) {
    const slug = pathname.replace("/services/", "").replace(/\/$/, "");
    const service = SERVICES.find((s) => s.slug === slug);
    if (service) {
      const priceStr = `${formatINR(service.startingPrice)}/${service.pricingUnit}`;
      return {
        badge: service.name,
        service,
        greeting: `Hello! Interested in **${service.name}**?\n${service.shortDesc}\n\nI can answer pricing, responsibilities, or help you book right away.`,
        whatsappMessage: `Hi ApnaCare! I'm viewing the ${service.name} service (${pathname}) and have a question.`,
        initialReplies: [
          {
            label: `💰 Starting Price (${priceStr})`,
            action: {
              type: "message",
              text: `${service.name} begins at ${priceStr} (includes transparent 18% GST invoice). We offer day shifts, night shifts, and 24-hr live-in options.`,
            },
          },
          {
            label: "📋 What's Included?",
            action: {
              type: "message",
              text: `Key includes for ${service.name}:\n• ${service.includes.slice(0, 4).join("\n• ")}`,
            },
          },
          {
            label: "🛡️ Attendant Credentials",
            action: {
              type: "message",
              text: `Attendants for ${service.name} hold:\n• ${service.qualifications.join("\n• ")}\n• 100% Police verification & Aadhaar biometric verification.`,
            },
          },
          {
            label: `📅 Book ${service.name}`,
            action: { type: "booking", service: service.slug },
          },
          {
            label: "💬 WhatsApp Coordinator",
            action: {
              type: "whatsapp",
              msg: `Hi ApnaCare! I would like to book or ask about ${service.name}.`,
            },
          },
          {
            label: "🌐 Explore Other Services",
            action: { type: "navigate", to: "/services", label: "View All 11 Services" },
          },
        ],
      };
    }
  }

  // 2. Services index: /services
  if (pathname === "/services") {
    return {
      badge: "11 Care Services",
      greeting:
        "Welcome to our Services Directory! ApnaCare offers 11 verified care services across Home Care, Hospital Bedside, Nursing, Maternal, and Travel escorts. Which area can I help with?",
      whatsappMessage:
        "Hi ApnaCare! I'm exploring your services directory and would like guidance.",
      initialReplies: [
        { label: "👵 Elderly Companionship", action: { type: "booking", service: "elderly-care" } },
        {
          label: "🏥 Hospital Attendants",
          action: { type: "booking", service: "hospital-attendants" },
        },
        { label: "💉 Clinical Nursing", action: { type: "booking", service: "nursing-services" } },
        {
          label: "👶 Post-Natal Recovery",
          action: { type: "booking", service: "post-natal-care" },
        },
        { label: "🚗 Women Chauffeurs", action: { type: "booking", service: "women-drivers" } },
        {
          label: "✈️ Airport & Travel Escorts",
          action: { type: "booking", service: "airport-pickup" },
        },
        {
          label: "💰 Pricing Guide",
          action: { type: "navigate", to: "/#pricing", label: "View Pricing" },
        },
        {
          label: "📅 Start a Booking",
          action: { type: "navigate", to: "/booking", label: "Booking Wizard" },
        },
      ],
    };
  }

  // 3. Booking flow: /booking
  if (pathname === "/booking") {
    return {
      badge: "Booking Desk",
      greeting:
        "Need help completing your booking?\nI can assist with shift selections (Day Shift vs. 24-hr Live-In), city coverage, special dietary/medical notes, or payment questions.",
      whatsappMessage: "Hi ApnaCare! I'm filling out the booking form and need coordinator help.",
      initialReplies: [
        {
          label: "⏱️ Shift Options Explained",
          action: {
            type: "message",
            text: "We offer flexible schedules:\n• Day Shifts: 8-12 hours daily\n• Night Bedside Vigils: 10-12 hours overnight\n• 24-Hour Live-In: Continuous round-the-clock home support\n• Point-to-point transit/trip options.",
          },
        },
        {
          label: "🔄 Replacement Guarantee",
          action: {
            type: "message",
            text: "If an assigned attendant falls ill or has an emergency, a police-verified backup with comparable skill qualifications is dispatched within 90 minutes at zero extra fee.",
          },
        },
        {
          label: "💳 GST & Invoicing",
          action: {
            type: "message",
            text: "Every booking includes complete 18% GST tax invoices with zero hidden dispatcher markups or surge commissions. Standard cancellation policy allows full refunds before dispatch.",
          },
        },
        {
          label: "💬 WhatsApp Coordinator for Help",
          action: {
            type: "whatsapp",
            msg: "Hi ApnaCare! I'm on the booking page and would like help completing my attendant reservation.",
          },
        },
        {
          label: "📞 Call Emergency Dispatch Desk",
          action: { type: "call" },
        },
      ],
    };
  }

  // 4. Safety & Verification: /safety or /safety-guidelines
  if (pathname === "/safety" || pathname === "/safety-guidelines") {
    return {
      badge: "Safety & Verification",
      greeting:
        "Safety is the foundation of ApnaCare. All women attendants undergo 5-step police verification, Aadhaar biometric verification, and are supported by our 24/7 Command Center.",
      whatsappMessage: "Hi ApnaCare! I have questions regarding attendant verification and safety.",
      initialReplies: [
        {
          label: "👮 5-Step Verification Process",
          action: {
            type: "message",
            text: "Our 5-step screening includes:\n1. Biometric Aadhaar authentication\n2. Criminal record & court registry checks\n3. Physical home address verification\n4. Previous medical employment verification\n5. Clinical handling & patient hygiene evaluation.",
          },
        },
        {
          label: "🆘 24/7 Command SOS Telemetry",
          action: {
            type: "message",
            text: "Attendants and families have direct access to our 24/7 Indiranagar Command Center. Shift tracking, live check-ins, and rapid escalation protocols are monitored around the clock.",
          },
        },
        {
          label: "📜 Code of Conduct",
          action: {
            type: "message",
            text: "Attendants follow a strict code: zero medicine administration without prescription, complete client confidentiality, and punctual shift handovers.",
          },
        },
        { label: "📞 Call Emergency Line", action: { type: "call" } },
        {
          label: "📅 Book a Verified Attendant",
          action: { type: "navigate", to: "/booking", label: "Go to Booking" },
        },
      ],
    };
  }

  // 5. Cities coverage: /cities or /cities/:city
  if (pathname.startsWith("/cities")) {
    const slug = pathname.replace("/cities/", "").replace(/\/$/, "");
    const city = CITIES.find((c) => c.slug === slug);
    const cityName = city ? city.name : "Metro Cities";
    return {
      badge: city ? `${city.name} Care Hub` : "Metro Hubs",
      greeting: city
        ? `Welcome to our **${city.name} Command Hub**!\nWe have ${city.attendants} verified women attendants ready across ${city.name} with ${city.dispatch} dispatch and local language fluency.`
        : "ApnaCare operates active care hubs across Bengaluru, Chennai, Hyderabad, and Coimbatore with dedicated city command desks.",
      whatsappMessage: `Hi ApnaCare! I'm looking for women attendant services in ${cityName}.`,
      initialReplies: [
        {
          label: `⚡ Rapid Dispatch (${city?.dispatch ?? "< 20m"})`,
          action: {
            type: "message",
            text: `In ${cityName}, our mobile attendant network supports rapid dispatch with local supervisor coverage across key neighborhoods and major hospital corridors.`,
          },
        },
        {
          label: "🗣️ Language Fluency",
          action: {
            type: "message",
            text: `Our ${cityName} attendants speak fluent local and regional languages (Tamil, Kannada, Telugu, Hindi, English) to ensure comfortable, reassuring communication for your family.`,
          },
        },
        {
          label: `📅 Book Care in ${cityName}`,
          action: { type: "booking", service: "elderly-care" },
        },
        {
          label: `💬 WhatsApp ${cityName} Desk`,
          action: {
            type: "whatsapp",
            msg: `Hi ApnaCare! I need attendant support in ${cityName}.`,
          },
        },
      ],
    };
  }

  // 6. Contact & Helpline: /contact
  if (pathname === "/contact") {
    return {
      badge: "24/7 Support Desk",
      greeting:
        "Speak directly with an ApnaCare care coordinator. We operate 24/7 for urgent hospital bedside assignments, custom schedules, and emergency dispatch.",
      whatsappMessage:
        "Hi ApnaCare! I'm on the contact page and would like to speak with a care coordinator.",
      initialReplies: [
        {
          label: `📞 Toll-Free Line (${SITE.SUPPORT_PHONE})`,
          action: { type: "call" },
        },
        {
          label: `🚨 Emergency Desk (${SITE.EMERGENCY_LINE})`,
          action: {
            type: "message",
            text: `Our emergency desk (${SITE.EMERGENCY_LINE}) is monitored 24/7 for urgent inpatient bedside dispatch, post-op discharges, and critical support.`,
          },
        },
        {
          label: "🏢 Regional Office Locations",
          action: {
            type: "message",
            text: `Headquarters: ${SITE.headquarters}\nRegional command desks active across Bengaluru, Chennai, Hyderabad, and Coimbatore.`,
          },
        },
        {
          label: "💬 WhatsApp Coordinator",
          action: {
            type: "whatsapp",
            msg: "Hello ApnaCare! I need immediate care coordinator assistance.",
          },
        },
      ],
    };
  }

  // 7. About & Ecosystem: /about or /ecosystem-partners
  if (pathname === "/about" || pathname === "/ecosystem-partners") {
    return {
      badge: "About ApnaCare",
      greeting:
        "Discover ApnaCare's journey: empowering skilled women caregivers with fair compensation and dignity, while delivering trusted bedside and home support to families.",
      whatsappMessage:
        "Hi ApnaCare! I'm reading about your organization and would like to learn more.",
      initialReplies: [
        {
          label: "🤝 Hospital & Skill Partners",
          action: {
            type: "message",
            text: "We partner with leading healthcare institutions, nursing councils, and women's self-help groups to train, certify, and place compassionate care professionals.",
          },
        },
        {
          label: "📜 Our 8+ Year Journey",
          action: {
            type: "message",
            text: `ApnaCare has supported over ${SITE.familiesHelped} families with a ${SITE.retentionRate} satisfaction rating and 100% verified attendants.`,
          },
        },
        {
          label: "📅 Book a Care Attendant",
          action: { type: "navigate", to: "/booking", label: "Go to Booking" },
        },
        {
          label: "💬 Chat on WhatsApp",
          action: { type: "whatsapp", msg: "Hi ApnaCare! I'd like to talk to your team." },
        },
      ],
    };
  }

  // 8. Knowledge Hub: /knowledge-hub
  if (pathname.startsWith("/knowledge-hub")) {
    return {
      badge: "Knowledge Hub",
      greeting:
        "Reading our family guides? Ask me about senior citizen government pension schemes, fall-proofing your home, or safe travel rights for women.",
      whatsappMessage:
        "Hi ApnaCare! I have a question regarding your family care and safety guides.",
      initialReplies: [
        {
          label: "👵 Senior Welfare & Pensions",
          action: {
            type: "message",
            text: "India offers central and state welfare programs like Indira Gandhi National Old Age Pension Scheme (IGNOAPS) and health cards. Check our full guide in the Knowledge Hub!",
          },
        },
        {
          label: "🏡 Fall-Proof Home Tips",
          action: {
            type: "message",
            text: "Key safety steps: install grab rails in bathrooms, eliminate throw rugs, maintain non-slip lighting, and arrange attendant mobility support.",
          },
        },
        {
          label: "✈️ Safe Travel for Seniors",
          action: {
            type: "message",
            text: "Our chauffeuses and transit companions assist elderly relatives at airport gates, railway platforms, and door-to-door journeys.",
          },
        },
        {
          label: "📅 Book Home Companionship",
          action: { type: "booking", service: "elderly-care" },
        },
      ],
    };
  }

  // 9. FAQs: /faq
  if (pathname === "/faq") {
    return {
      badge: "FAQ Assistant",
      greeting:
        "Have questions? Here are the most common inquiries from families about shift timings, backup guarantees, GST invoicing, and caregiver screening.",
      whatsappMessage: "Hi ApnaCare! I have a question about your policies and services.",
      initialReplies: [
        {
          label: "💵 Transparent Rates & GST",
          action: {
            type: "message",
            text: "All bookings include 18% GST tax invoices with zero hidden agency surcharges. What you see on the booking confirmation is your exact final total.",
          },
        },
        {
          label: "🔄 Backup Attendant Dispatch",
          action: {
            type: "message",
            text: "If an attendant is sick or unavailable, a verified backup is dispatched within 90 minutes so your loved one's care is never interrupted.",
          },
        },
        {
          label: "🛡️ Can I preview the attendant profile?",
          action: {
            type: "message",
            text: "Yes! Once you submit your requirement, we share a verified digital profile with certifications and language fluencies for family approval.",
          },
        },
        {
          label: "💬 Chat on WhatsApp",
          action: { type: "whatsapp", msg: "Hi! I have a question from the FAQ page." },
        },
      ],
    };
  }

  // 10. Attendant Portal: /attendant-login
  if (pathname === "/attendant-login") {
    return {
      badge: "Attendant Portal",
      greeting:
        "Welcome care professional! Need help logging into your duty roster, submitting live attendance, or connecting with supervisor dispatch?",
      whatsappMessage: "Hi ApnaCare! I am an attendant needing portal or duty support.",
      initialReplies: [
        {
          label: "🔑 Portal Login & OTP Help",
          action: {
            type: "message",
            text: "Enter your registered 10-digit mobile number to receive an instant OTP. If you recently changed your number, contact your regional supervisor.",
          },
        },
        {
          label: "📞 Call Attendant Helpdesk",
          action: { type: "call" },
        },
        {
          label: "📋 Attendant Guidelines",
          action: { type: "navigate", to: "/safety-guidelines", label: "View Safety Guidelines" },
        },
      ],
    };
  }

  // Default / Homepage: /
  return {
    badge: "General Care Desk",
    greeting:
      "Hello! Welcome to ApnaCare.\nI can help you explore our verified women attendant services for elderly care, hospital bedside assistance, newborn recovery, or safe transit. How can I assist today?",
    whatsappMessage: "Hi ApnaCare! I would like to enquire about your women attendant services.",
    initialReplies: GLOBAL_MENU,
  };
}

// ─── Chatbot Component ────────────────────────────────────────────────────────

export function Assistant() {
  const location = useLocation();
  const pathname = location.pathname;

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Compute context dynamically based on current page
  const pageContext = useMemo(() => getPageContext(pathname), [pathname]);

  // Visitor persona — for personalised greeting prefix
  const persona = useVisitorPersona();

  // Build a persona-prefixed greeting for the initial bot message
  const personaGreeting = useMemo(() => {
    let prefix = "";
    if (persona.isReturning) {
      if (persona.hasBookingDraft) {
        prefix = `${persona.greeting}! Welcome back — you have an unfinished booking saved. I can help you continue it. `;
      } else if (persona.lastService) {
        const svcLabel = persona.lastService.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        prefix = `${persona.greeting}! Good to see you again — you were exploring **${svcLabel}** last time. `;
      } else if (persona.visitCount >= 3) {
        prefix = `${persona.greeting}! Great to have you back (visit #${persona.visitCount}). `;
      } else {
        prefix = `${persona.greeting}! Good to see you again. `;
      }
    } else {
      prefix = `${persona.greeting}! `;
    }
    return `${prefix}${pageContext.greeting}`;
  }, [persona.greeting, persona.isReturning, persona.lastService, persona.hasBookingDraft, persona.visitCount, pageContext.greeting]);

  // Messages state — initial message uses persona greeting
  const [msgs, setMsgs] = useState<BotMsg[]>(() => [
    {
      from: "bot",
      text: personaGreeting,
      replies: pageContext.initialReplies,
    },
  ]);

  const lastPathnameRef = useRef(pathname);

  // When user navigates to a different page, adapt chatbot with context change message
  useEffect(() => {
    if (lastPathnameRef.current !== pathname) {
      lastPathnameRef.current = pathname;
      const newCtx = getPageContext(pathname);

      setMsgs((prev) => {
        // If chat only had the initial message, simply replace it with the new context's greeting
        if (prev.length <= 1) {
          return [
            {
              from: "bot",
              text: newCtx.greeting,
              replies: newCtx.initialReplies,
            },
          ];
        }

        // If user was actively chatting, append a helpful context-switch notice
        return [
          ...prev,
          {
            from: "bot",
            text: `📍 *Switched to: ${newCtx.badge}*\n\n${newCtx.greeting}`,
            replies: newCtx.initialReplies,
          },
        ];
      });
    }
  }, [pathname]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [msgs, open]);

  // Reset to current page context
  const handleResetChat = () => {
    setMsgs([
      {
        from: "bot",
        text: pageContext.greeting,
        replies: pageContext.initialReplies,
      },
    ]);
  };

  const respondToChoice = (choice: QuickReply): BotMsg => {
    const { action } = choice;

    if (action.type === "message") {
      return {
        from: "bot",
        text: action.text,
        replies: action.nextReplies ?? pageContext.initialReplies,
      };
    }

    if (action.type === "navigate") {
      return {
        from: "bot",
        text: `Opening **${action.label}**. You can also continue chatting with me anytime!`,
        link: { label: action.label, to: action.to },
        replies: pageContext.initialReplies,
      };
    }

    if (action.type === "booking") {
      const s = SERVICES.find((item) => item.slug === action.service);
      const name = s ? s.name : "this care service";
      const price = s ? ` (from ${formatINR(s.startingPrice)}/${s.pricingUnit})` : "";
      return {
        from: "bot",
        text: `Great choice! You can reserve **${name}**${price} directly through our booking engine, or message our coordinator on WhatsApp.`,
        link: { label: `Book ${name}`, to: `/booking?service=${action.service}` },
        replies: [
          {
            label: "💬 WhatsApp Coordinator",
            action: {
              type: "whatsapp",
              msg: `Hi ApnaCare! I would like to book ${name}.`,
            },
          },
          {
            label: "📞 Call Support Desk",
            action: { type: "call" },
          },
          {
            label: "🔄 Back to Menu",
            action: {
              type: "message",
              text: "Here are more options for this page:",
              nextReplies: pageContext.initialReplies,
            },
          },
        ],
      };
    }

    if (action.type === "whatsapp") {
      const url = buildWhatsAppUrl(action.msg);
      return {
        from: "bot",
        text: "Connecting you directly to our WhatsApp care desk. A care coordinator will respond promptly.",
        link: { label: "Open WhatsApp Chat", href: url },
        replies: pageContext.initialReplies,
      };
    }

    if (action.type === "call") {
      return {
        from: "bot",
        text: `Our phone coordination line is active 24/7:\n📞 ${SITE.SUPPORT_PHONE}\nEmergency line: ${SITE.EMERGENCY_LINE}`,
        link: { label: `Call ${SITE.SUPPORT_PHONE}`, href: `tel:${SITE.SUPPORT_PHONE_TEL}` },
        replies: pageContext.initialReplies,
      };
    }

    return {
      from: "bot",
      text: "How else can I help your family?",
      replies: pageContext.initialReplies,
    };
  };

  const handleQuickReply = (choice: QuickReply) => {
    track("assistant_message", { label: choice.label, context: pageContext.badge });
    sendToGoogleSheet({
      event_type: "chatbot",
      event_name: "assistant_quick_reply",
      lead_type: "CHATBOT",
      form_name: "AI Care Assistant",
      lead_id: "chat_" + Date.now().toString(36),
      user_query: choice.label,
      requested_service: choice.action.type === "booking" ? choice.action.service : undefined,
      page_context_badge: pageContext.badge,
      page_path: pathname,
    }).catch(() => {});

    const userMsg: BotMsg = { from: "user", text: choice.label };
    const botReply = respondToChoice(choice);
    setMsgs((prev) => [...prev, userMsg, botReply]);
  };

  const handleTextInput = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");

    const phoneMatch = text.match(/(\+?91[\s-]?)?[6789]\d{9}/);
    const emailMatch = text.match(/[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/);

    sendToGoogleSheet({
      event_type: "chatbot",
      event_name: "assistant_text_message",
      lead_type: "CHATBOT",
      form_name: "AI Care Assistant",
      lead_id: "chat_" + Date.now().toString(36),
      user_query: text,
      phone: phoneMatch ? phoneMatch[0] : undefined,
      email: emailMatch ? emailMatch[0] : undefined,
      page_context_badge: pageContext.badge,
      page_path: pathname,
    }).catch(() => {});

    const lower = text.toLowerCase();

    // Context-sensitive keyword matching:
    let matchedChoice: QuickReply;

    if (
      lower.includes("price") ||
      lower.includes("cost") ||
      lower.includes("rate") ||
      lower.includes("fee")
    ) {
      if (pageContext.service) {
        matchedChoice = {
          label: text,
          action: {
            type: "message",
            text: `${pageContext.service.name} starts at ${formatINR(pageContext.service.startingPrice)}/${pageContext.service.pricingUnit} + 18% GST with transparent invoices and zero hidden charges.`,
          },
        };
      } else {
        matchedChoice = {
          label: text,
          action: { type: "navigate", to: "/#pricing", label: "View Transparent Pricing" },
        };
      }
    } else if (lower.includes("book") || lower.includes("reserve")) {
      if (pageContext.service) {
        matchedChoice = {
          label: text,
          action: { type: "booking", service: pageContext.service.slug },
        };
      } else {
        matchedChoice = {
          label: text,
          action: { type: "navigate", to: "/booking", label: "Start Booking Flow" },
        };
      }
    } else if (
      lower.includes("elder") ||
      lower.includes("senior") ||
      lower.includes("old") ||
      lower.includes("grandparent")
    ) {
      matchedChoice = { label: text, action: { type: "booking", service: "elderly-care" } };
    } else if (
      lower.includes("hospital") ||
      lower.includes("bedside") ||
      lower.includes("surgery") ||
      lower.includes("admit")
    ) {
      matchedChoice = { label: text, action: { type: "booking", service: "hospital-attendants" } };
    } else if (
      lower.includes("nurs") ||
      lower.includes("injection") ||
      lower.includes("dressing") ||
      lower.includes("catheter")
    ) {
      matchedChoice = { label: text, action: { type: "booking", service: "nursing-services" } };
    } else if (
      lower.includes("baby") ||
      lower.includes("natal") ||
      lower.includes("mother") ||
      lower.includes("newborn") ||
      lower.includes("delivery")
    ) {
      matchedChoice = { label: text, action: { type: "booking", service: "post-natal-care" } };
    } else if (lower.includes("driver") || lower.includes("car") || lower.includes("chauffeur")) {
      matchedChoice = { label: text, action: { type: "booking", service: "women-drivers" } };
    } else if (lower.includes("airport") || lower.includes("flight") || lower.includes("pickup")) {
      matchedChoice = { label: text, action: { type: "booking", service: "airport-pickup" } };
    } else if (lower.includes("travel") || lower.includes("train") || lower.includes("trip")) {
      matchedChoice = { label: text, action: { type: "booking", service: "travel-assistance" } };
    } else if (
      lower.includes("safe") ||
      lower.includes("police") ||
      lower.includes("verify") ||
      lower.includes("security")
    ) {
      matchedChoice = {
        label: text,
        action: {
          type: "message",
          text: "All ApnaCare attendants undergo a 5-step police verification process, Aadhaar biometric verification, address validation, and are tracked with 24/7 command center telemetry.",
        },
      };
    } else if (lower.includes("whatsapp")) {
      matchedChoice = {
        label: text,
        action: {
          type: "whatsapp",
          msg: `Hi ApnaCare! I am on the ${pageContext.badge} page and asked: "${text}"`,
        },
      };
    } else if (
      lower.includes("call") ||
      lower.includes("phone") ||
      lower.includes("contact") ||
      lower.includes("number")
    ) {
      matchedChoice = { label: text, action: { type: "call" } };
    } else {
      matchedChoice = {
        label: text,
        action: {
          type: "message",
          text: `Thank you for asking! For specialized details about "${text}" regarding ${pageContext.badge}, you can connect with our 24/7 care desk via WhatsApp or phone.`,
        },
      };
    }

    const userMsg: BotMsg = { from: "user", text };
    const botReply = respondToChoice(matchedChoice);
    setMsgs((prev) => [...prev, userMsg, botReply]);
  };

  const lastMsg = msgs[msgs.length - 1];
  const quickReplies = lastMsg?.replies ?? pageContext.initialReplies;
  const currentWhatsAppUrl = buildWhatsAppUrl(pageContext.whatsappMessage);

  return (
    <>
      {/* Launcher Button (bottom-right) with dynamic contextual tooltip on hover */}
      <div className="fixed bottom-24 right-4 z-50 flex items-center gap-2 md:bottom-6">
        {!open && pageContext.badge !== "General Care Desk" && (
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-background/95 px-3 py-1.5 text-xs font-semibold text-primary shadow-lift backdrop-blur animate-fade-in">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            {pageContext.badge} Help
          </span>
        )}

        <button
          onClick={() => {
            setOpen((v) => !v);
            if (!open) track("assistant_open", { context: pageContext.badge });
          }}
          aria-label={
            open ? "Close ApnaCare Assistant" : `Open ApnaCare Assistant for ${pageContext.badge}`
          }
          aria-expanded={open}
          className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform hover:scale-105"
        >
          {open ? <X className="size-5" /> : <MessageCircleHeart className="size-5" />}
        </button>
      </div>

      {/* Chat Panel */}
      {open && (
        <div
          role="dialog"
          aria-label={`ApnaCare Assistant — ${pageContext.badge}`}
          aria-modal="true"
          style={{ backgroundColor: "#ffffff" }}
          className="fixed bottom-40 right-4 z-50 flex max-h-[78vh] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border/80 shadow-2xl md:bottom-24 animate-fade-in"
        >
          {/* Header with Live Context Badge */}
          <div className="bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-base font-semibold flex items-center gap-1.5">
                  ApnaCare Assistant
                  <Sparkles className="size-3.5 opacity-80" />
                </p>
                <p className="text-xs opacity-80">Context-Aware Care Coordination</p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset to current page context"
                  aria-label="Reset chat to current page"
                  className="grid size-7 place-items-center rounded-full hover:bg-primary-foreground/15 transition-colors text-primary-foreground"
                >
                  <RotateCcw className="size-3.5" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close assistant"
                  className="grid size-7 place-items-center rounded-full hover:bg-primary-foreground/15 transition-colors text-primary-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Active Context Banner */}
            <div className="mt-2 flex items-center justify-between rounded-xl bg-primary-foreground/10 px-2.5 py-1 text-xs">
              <span className="flex items-center gap-1 font-medium truncate max-w-[240px]">
                <MapPin className="size-3 shrink-0 text-terracotta" />
                <span>Page: {pageContext.badge}</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">
                Live Context
              </span>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto p-4 bg-[#FAF8F5] dark:bg-muted/10"
            aria-live="polite"
            aria-relevant="additions"
          >
            {msgs.map((m, i) => (
              <div
                key={i}
                className={
                  m.from === "user"
                    ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm text-primary-foreground shadow-2xs"
                    : "max-w-[90%] rounded-2xl rounded-bl-sm bg-white border border-border/60 p-3.5 text-sm text-foreground shadow-2xs"
                }
              >
                {/* Text formatting with bold support */}
                <div className="space-y-1">
                  {m.text.split("\n").map((line, j) => {
                    if (!line.trim()) return <div key={j} className="h-1" />;
                    return (
                      <p key={j} className="leading-relaxed">
                        {line.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((chunk, k) => {
                          if (chunk.startsWith("**") && chunk.endsWith("**")) {
                            return (
                              <strong key={k} className="font-semibold text-primary">
                                {chunk.slice(2, -2)}
                              </strong>
                            );
                          }
                          if (chunk.startsWith("*") && chunk.endsWith("*")) {
                            return (
                              <em key={k} className="italic text-foreground font-medium">
                                {chunk.slice(1, -1)}
                              </em>
                            );
                          }
                          return chunk;
                        })}
                      </p>
                    );
                  })}
                </div>

                {/* Direct action link */}
                {m.link && (
                  <div className="mt-2.5 pt-2 border-t border-border/40">
                    {m.link.href ? (
                      <a
                        href={m.link.href}
                        target={m.link.href.startsWith("tel:") ? undefined : "_blank"}
                        rel="noreferrer"
                        onClick={() => {
                          track("assistant_link_click", { label: m.link!.label });
                          setOpen(false);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-2xs"
                      >
                        {m.link.label} →
                      </a>
                    ) : (
                      <Link
                        to={m.link.to!}
                        onClick={() => {
                          track("assistant_link_click", { label: m.link!.label });
                          setOpen(false);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-2xs"
                      >
                        {m.link.label} →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contextual Quick Replies Chips */}
          {quickReplies.length > 0 && (
            <div className="border-t border-border/80 bg-white p-3">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                <span>Suggested for {pageContext.badge}:</span>
                <span className="text-[10px] text-muted-foreground/70">
                  {quickReplies.length} options
                </span>
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                {quickReplies.map((choice, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickReply(choice)}
                    className="rounded-full border border-primary/25 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/15 transition-colors whitespace-nowrap"
                  >
                    {choice.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Contextual WhatsApp Handoff Bar */}
          <div className="flex items-center justify-between border-t border-border/70 bg-[#FAF8F5] px-3.5 py-2 text-xs">
            <span className="text-muted-foreground truncate max-w-[200px]">
              Need direct coordinator chat?
            </span>
            <a
              href={currentWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("assistant_whatsapp_click", { context: pageContext.badge })}
              className="inline-flex items-center gap-1 font-semibold text-[#128C7E] hover:underline"
            >
              <span>WhatsApp Desk</span> →
            </a>
          </div>

          {/* Text input with Send button */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTextInput();
            }}
            className="flex items-center gap-2 border-t border-border bg-white p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask about ${pageContext.badge}...`}
              className="flex-1 rounded-full border border-border bg-muted/40 px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim()}
              className="size-8 rounded-full shrink-0"
              aria-label="Send message"
            >
              <Send className="size-3.5" />
            </Button>
          </form>

          {/* Disclaimer */}
          <div className="bg-muted/40 px-3 py-1.5 text-center text-[10px] text-muted-foreground">
            For emergencies, call our 24/7 helpline{" "}
            <a href={`tel:${SITE.SUPPORT_PHONE_TEL}`} className="font-bold underline">
              {SITE.SUPPORT_PHONE}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
