import { useState, useRef, useEffect, useMemo } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  MessageCircleHeart,
  X,
  Send,
  Phone,
  RotateCcw,
  MapPin,
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  User,
  Heart,
  Activity,
  Baby,
  Car,
  Check,
  ChevronRight,
  ArrowRight,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES, CITIES, SITE, formatINR, buildWhatsAppUrl, Service, getICP, getService } from "@/data/site";
import { track, sendToGoogleSheet } from "@/lib/analytics";
import { useVisitorPersona } from "@/hooks/useVisitorPersona";
import { recordBookingDraft, recordServiceInteraction } from "@/lib/sessionEngine";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BookingCardData {
  ref: string;
  customerName: string;
  mobile: string;
  serviceName: string;
  patientAge: string;
  city: string;
  location: string;
  shiftSchedule: string;
  duration: string;
  urgency: string;
  conditions: string;
}

export interface QuickReply {
  label: string;
  action:
    | { type: "message"; text: string; nextReplies?: QuickReply[] }
    | { type: "navigate"; to: string; label: string }
    | { type: "booking"; service: string }
    | { type: "whatsapp"; msg: string }
    | { type: "call" }
    | { type: "start_booking"; service?: string }
    | { type: "booking_answer"; field: string; value: string; displayLabel?: string };
}

export interface BotMsg {
  from: "bot" | "user";
  text: string;
  replies?: QuickReply[];
  link?: { label: string; href?: string; to?: string };
  bookingCard?: BookingCardData;
}

export interface PageContextInfo {
  badge: string;
  greeting: string;
  initialReplies: QuickReply[];
  service?: Service;
  whatsappMessage: string;
}

export type BookingStep =
  | "none"
  | "ask_service"
  | "ask_age"
  | "ask_city"
  | "ask_location"
  | "ask_shift"
  | "ask_duration"
  | "ask_conditions"
  | "ask_urgency"
  | "ask_contact"
  | "complete";

export interface BookingDraft {
  serviceId?: string;
  serviceName?: string;
  patientAge?: string;
  city?: string;
  location?: string;
  shiftSchedule?: string;
  duration?: string;
  conditions?: string;
  urgency?: string;
  customerName?: string;
  mobile?: string;
  ref?: string;
}

// ─── Global Fallback Menus ───────────────────────────────────────────────────

export const GLOBAL_MENU: QuickReply[] = [
  { label: "🏠 Elder Care", action: { type: "start_booking", service: "elderly-care" } },
  { label: "🏥 Hospital Assistance", action: { type: "start_booking", service: "hospital-attendants" } },
  { label: "✈️ Travel Support", action: { type: "start_booking", service: "travel-assistance" } },
  { label: "⚡ Book Care Attendant / Saha (Chat Booking)", action: { type: "start_booking" } },
  { label: "💉 Clinical Nursing (GNM/B.Sc)", action: { type: "start_booking", service: "nursing-services" } },
  { label: "👶 Post-Natal Care", action: { type: "start_booking", service: "post-natal-care" } },
  { label: "🚗 Women Drivers", action: { type: "start_booking", service: "women-drivers" } },
  {
    label: "🧭 Explore All Services",
    action: {
      type: "message",
      text: "ApnaCare offers comprehensive specialized care services across South India:\n• **Elderly Care**: Companionship & daily living\n• **Hospital Bedside**: 12h/24h ward vigil\n• **Clinical Nursing**: Registered GNM/B.Sc nurses\n• **Post-Natal**: Fourth trimester infant & maternal healing\n• **Mobility & Travel**: Station assisted travel & women chauffeuses\n\nWhich care pathway would you like to explore?",
      nextReplies: [
        { label: "🏠 Elder Care", action: { type: "start_booking", service: "elderly-care" } },
        { label: "🏥 Hospital Assistance", action: { type: "start_booking", service: "hospital-attendants" } },
        { label: "📞 Talk to a Coordinator", action: { type: "call" } },
      ],
    },
  },
  {
    label: "💰 Pricing & GST Rates",
    action: {
      type: "message",
      text: "ApnaCare pricing is transparent with statutory 18% GST invoices and zero agency broker fees:\n• **Elderly Care**: From ₹1,200/day (Day / Night / Live-in)\n• **Hospital Bedside**: From ₹1,400/shift (12h/24h)\n• **Clinical Nursing**: From ₹1,800/shift (GNM/B.Sc)\n• **Post-Natal Care**: From ₹1,500/day\n• **Women Drivers**: From ₹800/trip\n\nWould you like to book one of these services now in this chat?",
      nextReplies: [
        { label: "⚡ Book an Attendant Now", action: { type: "start_booking" } },
        { label: "💬 WhatsApp Inquiries", action: { type: "whatsapp", msg: "Hi ApnaCare! I have questions on pricing and packages." } },
        { label: "📞 Call Coordinator", action: { type: "call" } },
      ],
    },
  },
  {
    label: "🛡️ Police & Background Checks",
    action: {
      type: "message",
      text: "Every ApnaCare Saha team member undergoes:\n1. Station-level local police verification\n2. Aadhaar biometric authentication\n3. In-person residential address verification\n4. Hospital clinical & eldercare bedside drills\n5. 90-minute regional backup standby\n\nReady to book verified care for your family?",
      nextReplies: [
        { label: "⚡ Find Your Saha Now", action: { type: "start_booking" } },
        { label: "📞 Speak to Coordinator", action: { type: "call" } },
      ],
    },
  },
  { label: "📞 Talk to a Coordinator", action: { type: "call" } },
  {
    label: "💬 WhatsApp Care Desk",
    action: {
      type: "whatsapp",
      msg: "Hi ApnaCare! I would like more information about your care services.",
    },
  },
];

// ─── Step Metadata & Question Generator ─────────────────────────────────────

const STEP_PROGRESS_MAP: Record<BookingStep, { num: number; title: string }> = {
  none: { num: 0, title: "" },
  ask_service: { num: 1, title: "Support Needed" },
  ask_age: { num: 2, title: "Patient Age & Profile" },
  ask_city: { num: 3, title: "City" },
  ask_location: { num: 3, title: "Locality / Ward" },
  ask_shift: { num: 4, title: "Shift Schedule" },
  ask_duration: { num: 4, title: "Duration" },
  ask_conditions: { num: 5, title: "Patient Needs" },
  ask_urgency: { num: 5, title: "Start Date" },
  ask_contact: { num: 6, title: "Contact Confirmation" },
  complete: { num: 6, title: "Booking Confirmed" },
};

function getStepQuestion(step: BookingStep, draft: BookingDraft): { text: string; replies: QuickReply[]; placeholder?: string } {
  switch (step) {
    case "ask_service":
      return {
        text: "👋 Welcome to **ApnaCare Chat-Based Booking**!\nLet's match the right verified Saha companion for your family in 2 minutes.\n\nFirst question: **What type of support or service does your family need?**",
        replies: [
          { label: "🏠 Elderly Care & Daily Living", action: { type: "booking_answer", field: "service", value: "elderly-care", displayLabel: "Elderly Care" } },
          { label: "🏥 Hospital Bedside Vigil", action: { type: "booking_answer", field: "service", value: "hospital-attendants", displayLabel: "Hospital Bedside" } },
          { label: "💉 Clinical Nursing (GNM/B.Sc)", action: { type: "booking_answer", field: "service", value: "nursing-services", displayLabel: "Clinical Nursing" } },
          { label: "👶 Post-Natal & Infant Care", action: { type: "booking_answer", field: "service", value: "post-natal-care", displayLabel: "Post-Natal Care" } },
          { label: "🧼 Home & Personal Care", action: { type: "booking_answer", field: "service", value: "home-personal-care", displayLabel: "Home & Personal Care" } },
          { label: "🚗 Verified Women Driver", action: { type: "booking_answer", field: "service", value: "women-drivers", displayLabel: "Women Driver" } },
          { label: "✈️ Travel & Station Assisted Travel", action: { type: "booking_answer", field: "service", value: "travel-assistance", displayLabel: "Travel Assistance" } },
          { label: "❌ Cancel Booking", action: { type: "booking_answer", field: "cancel", value: "cancel" } },
        ],
        placeholder: "Type your needed service or choose an option above...",
      };

    case "ask_age":
      return {
        text: `Understood: **${draft.serviceName || "Care Service"}**.\n\n**Who needs this care, and what is their approximate age?**`,
        replies: [
          { label: "👵 Mother (60-75 yrs)", action: { type: "booking_answer", field: "age", value: "Mother (60-75 yrs)" } },
          { label: "👴 Father (60-75 yrs)", action: { type: "booking_answer", field: "age", value: "Father (60-75 yrs)" } },
          { label: "🧓 Elderly Senior (75+ yrs)", action: { type: "booking_answer", field: "age", value: "Elderly Senior (75+ yrs)" } },
          { label: "🏥 Adult Patient (Post-Op / Hospital)", action: { type: "booking_answer", field: "age", value: "Adult Post-Op Patient" } },
          { label: "👶 New Mother & Newborn", action: { type: "booking_answer", field: "age", value: "New Mother & Newborn" } },
          { label: "👤 Self / Working Adult (25-55 yrs)", action: { type: "booking_answer", field: "age", value: "Self / Adult (25-55 yrs)" } },
          { label: "❌ Cancel", action: { type: "booking_answer", field: "cancel", value: "cancel" } },
        ],
        placeholder: "Select an option or type age (e.g. 78 years old)...",
      };

    case "ask_city":
      return {
        text: `Noted: Care for **${draft.patientAge}**.\n\n**Which city will your Saha be assisting in?**`,
        replies: [
          { label: "🏙️ Bengaluru", action: { type: "booking_answer", field: "city", value: "Bengaluru" } },
          { label: "🏛️ Chennai", action: { type: "booking_answer", field: "city", value: "Chennai" } },
          { label: "🕌 Hyderabad", action: { type: "booking_answer", field: "city", value: "Hyderabad" } },
          { label: "🌲 Coimbatore", action: { type: "booking_answer", field: "city", value: "Coimbatore" } },
          { label: "❌ Cancel", action: { type: "booking_answer", field: "cancel", value: "cancel" } },
        ],
        placeholder: "Select your city or type location...",
      };

    case "ask_location": {
      const city = draft.city || "Bengaluru";
      let areaSuggestions: string[] = [];
      if (city === "Bengaluru") {
        areaSuggestions = ["Indiranagar", "Whitefield", "Koramangala", "HSR Layout", "Jayanagar", "Hospital Ward"];
      } else if (city === "Chennai") {
        areaSuggestions = ["Adyar", "Anna Nagar", "T. Nagar", "Mylapore", "Velachery", "Hospital Ward"];
      } else if (city === "Hyderabad") {
        areaSuggestions = ["Hitec City", "Banjara Hills", "Gachibowli", "Jubilee Hills", "Madhapur", "Hospital Ward"];
      } else {
        areaSuggestions = ["RS Puram", "Peelamedu", "Race Course", "Saibaba Colony", "Gandhipuram", "Hospital Ward"];
      }
      return {
        text: `Operating Hub: **${city}**.\n\n**Which locality, apartment, or hospital ward?** (e.g. Indiranagar, Apollo Hospital, Anna Nagar)`,
        replies: [
          ...areaSuggestions.map((area) => ({
            label: area,
            action: { type: "booking_answer" as const, field: "location", value: area },
          })),
          { label: "❌ Cancel", action: { type: "booking_answer" as const, field: "cancel", value: "cancel" } },
        ],
        placeholder: `Enter area or landmark in ${city}...`,
      };
    }

    case "ask_shift":
      return {
        text: `Area noted: **${draft.location}, ${draft.city}**.\n\n**What shift schedule does your family require?**`,
        replies: [
          { label: "☀️ 12-Hour Day Shift (8 AM - 8 PM)", action: { type: "booking_answer", field: "shift", value: "12-Hour Day Shift (8 AM - 8 PM)" } },
          { label: "🌙 12-Hour Night Shift (8 PM - 8 AM)", action: { type: "booking_answer", field: "shift", value: "12-Hour Night Shift (8 PM - 8 AM)" } },
          { label: "🏡 24-Hour Live-in Care (Round-the-clock)", action: { type: "booking_answer", field: "shift", value: "24-Hour Live-in Care" } },
          { label: "⏱️ Part-Time / Per Trip", action: { type: "booking_answer", field: "shift", value: "Part-Time / Per Trip" } },
          { label: "❌ Cancel", action: { type: "booking_answer", field: "cancel", value: "cancel" } },
        ],
        placeholder: "Select preferred shift timing...",
      };

    case "ask_duration":
      return {
        text: `Shift: **${draft.shiftSchedule}**.\n\n**How long do you expect to need this care support?**`,
        replies: [
          { label: "🗓️ 1 to 7 Days (Short-term)", action: { type: "booking_answer", field: "duration", value: "1 to 7 Days" } },
          { label: "🗓️ 15 Days (Convalescence)", action: { type: "booking_answer", field: "duration", value: "15 Days" } },
          { label: "🗓️ 1 Month (30 Days)", action: { type: "booking_answer", field: "duration", value: "30 Days (1 Month)" } },
          { label: "🔄 Ongoing Monthly Care", action: { type: "booking_answer", field: "duration", value: "Ongoing Monthly" } },
          { label: "❌ Cancel", action: { type: "booking_answer", field: "cancel", value: "cancel" } },
        ],
        placeholder: "Select duration or type number of days...",
      };

    case "ask_conditions":
      return {
        text: `Duration: **${draft.duration}**.\n\n**Does the patient have any specific medical condition or support requirements?**`,
        replies: [
          { label: "🚶 Mobility Assist & Fall Safety", action: { type: "booking_answer", field: "condition", value: "Mobility Assist & Fall Safety" } },
          { label: "🛏️ Bedridden & Hygiene / Diaper Care", action: { type: "booking_answer", field: "condition", value: "Bedridden & Hygiene Care" } },
          { label: "💊 Medication & Vital Signs Check", action: { type: "booking_answer", field: "condition", value: "Medication & Vital Signs Check" } },
          { label: "🧠 Memory Care / Dementia Support", action: { type: "booking_answer", field: "condition", value: "Memory Care / Dementia Support" } },
          { label: "🩹 Post-Surgical Recovery Care", action: { type: "booking_answer", field: "condition", value: "Post-Surgical Recovery Care" } },
          { label: "🤝 Companionship & Light Support", action: { type: "booking_answer", field: "condition", value: "Companionship & Light Support" } },
          { label: "✅ No special condition / Standard care", action: { type: "booking_answer", field: "condition", value: "Standard care" } },
        ],
        placeholder: "Select or type any specific patient condition...",
      };

    case "ask_urgency":
      return {
        text: `Special requirements: **${draft.conditions}**.\n\n**When would you like your Saha to start?**`,
        replies: [
          { label: "🚨 Immediately (Today / Urgent within 4 hrs)", action: { type: "booking_answer", field: "urgency", value: "Immediately (Today)" } },
          { label: "🌅 Tomorrow Morning", action: { type: "booking_answer", field: "urgency", value: "Tomorrow Morning" } },
          { label: "📅 Within 2 to 3 Days", action: { type: "booking_answer", field: "urgency", value: "Within 2-3 Days" } },
          { label: "🗓️ Next Week or Later", action: { type: "booking_answer", field: "urgency", value: "Next Week or Later" } },
          { label: "❌ Cancel", action: { type: "booking_answer", field: "cancel", value: "cancel" } },
        ],
        placeholder: "Select urgency or type start date...",
      };

    case "ask_contact":
      return {
        text: `All care specs recorded! 🎯\n\nLastly, please provide your **Full Name** and **10-Digit Mobile Number** so our ${draft.city || "regional"} care coordinator can confirm your attendant dispatch and match.`,
        replies: [
          { label: "💬 Share Details on WhatsApp", action: { type: "whatsapp", msg: `Hi ApnaCare! I want to complete booking for ${draft.serviceName} in ${draft.city}.` } },
          { label: "📞 Call Coordinator Line", action: { type: "call" } },
          { label: "❌ Cancel Booking", action: { type: "booking_answer", field: "cancel", value: "cancel" } },
        ],
        placeholder: "Type Name & 10-digit mobile (e.g. Ramesh, 9876543210)...",
      };

    default:
      return { text: "", replies: [] };
  }
}

// ─── Helper: Derive Context from Pathname ────────────────────────────────────

function getPageContext(pathname: string): PageContextInfo {
  // 0. ICP Solution pages: /solutions/:slug
  if (pathname.startsWith("/solutions/")) {
    const slug = pathname.replace("/solutions/", "").replace(/\/$/, "");
    const icp = getICP(slug);
    if (icp) {
      const topService = icp.featuredServices[0] || "elderly-care";
      const sObj = getService(topService);
      return {
        badge: icp.name,
        greeting: `Welcome! Looking for verified care solutions for **${icp.name}**?\n${icp.summary}\n\nI can facilitate an instant attendant booking right here in this chat, answer pricing questions, or connect you with our coordinator.`,
        whatsappMessage: `Hi ApnaCare! I'm viewing care solutions for ${icp.name} (${pathname}) and would like assistance.`,
        initialReplies: [
          {
            label: `⚡ Book Care in Chat (${sObj?.name || icp.name})`,
            action: { type: "start_booking", service: topService },
          },
          {
            label: `🛡️ Solutions for ${icp.name}`,
            action: {
              type: "message",
              text: `Key solutions for ${icp.name}:\n• ${icp.painPoints.map((p) => `${p.problem} ➔ ${p.solution}`).join("\n• ")}`,
            },
          },
          {
            label: `💰 Transparent Pricing`,
            action: {
              type: "message",
              text: `Recommended services for ${icp.name}:\n• ${icp.featuredServices
                .map((s) => {
                  const item = getService(s);
                  return item ? `${item.name} (${formatINR(item.startingPrice)}/${item.pricingUnit})` : s;
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
            label: "📞 Call Coordinator",
            action: { type: "call" },
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
        greeting: `Hello! Interested in **${service.name}**?\n${service.shortDesc}\n\nI can book this service for you directly in chat, answer inclusion specs, or explain our police verification standards.`,
        whatsappMessage: `Hi ApnaCare! I'm viewing the ${service.name} service (${pathname}) and have a question.`,
        initialReplies: [
          {
            label: `⚡ Book ${service.name} in Chat`,
            action: { type: "start_booking", service: service.slug },
          },
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
            label: "💬 WhatsApp Coordinator",
            action: {
              type: "whatsapp",
              msg: `Hi ApnaCare! I would like to book or ask about ${service.name}.`,
            },
          },
          {
            label: "📞 Call Care Desk",
            action: { type: "call" },
          },
        ],
      };
    }
  }

  // Default / Homepage: /
  return {
    badge: "General Care Desk",
    greeting:
      "Hello! Welcome to ApnaCare. I am your automated care assistant.\nWhat kind of assistance are you looking for today? I can help you explore verified care, check pricing, or initiate an enquiry directly in this chat.",
    whatsappMessage: "Hi ApnaCare! I would like to enquire about your care services.",
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

  // Dynamic context based on current page
  const pageContext = useMemo(() => getPageContext(pathname), [pathname]);

  // Visitor persona
  const persona = useVisitorPersona();

  // Booking conversational state machine
  const [bookingStep, setBookingStep] = useState<BookingStep>("none");
  const [bookingDraft, setBookingDraft] = useState<BookingDraft>({});

  // Persona greeting
  const personaGreeting = useMemo(() => {
    let prefix = "";
    if (persona.isReturning) {
      if (persona.hasBookingDraft) {
        prefix = `${persona.greeting}! Welcome back — you have an unfinished booking saved. I can help you complete it right here. `;
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

  // Messages state
  const [msgs, setMsgs] = useState<BotMsg[]>(() => [
    {
      from: "bot",
      text: personaGreeting,
      replies: pageContext.initialReplies,
    },
  ]);

  const lastPathnameRef = useRef(pathname);

  // Adapt on route change if not in active booking
  useEffect(() => {
    if (lastPathnameRef.current !== pathname) {
      lastPathnameRef.current = pathname;
      const newCtx = getPageContext(pathname);

      if (bookingStep === "none" || bookingStep === "complete") {
        setMsgs((prev) => {
          if (prev.length <= 1) {
            return [
              {
                from: "bot",
                text: newCtx.greeting,
                replies: newCtx.initialReplies,
              },
            ];
          }
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
    }
  }, [pathname, bookingStep]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [msgs, open]);

  // Reset to initial
  const handleResetChat = () => {
    setBookingStep("none");
    setBookingDraft({});
    setMsgs([
      {
        from: "bot",
        text: pageContext.greeting,
        replies: pageContext.initialReplies,
      },
    ]);
  };

  // Start booking flow
  const initiateBooking = (serviceSlug?: string) => {
    let nextStep: BookingStep = "ask_service";
    let draftUpdate: BookingDraft = {};

    if (serviceSlug) {
      const s = SERVICES.find((item) => item.slug === serviceSlug);
      draftUpdate = {
        serviceId: serviceSlug,
        serviceName: s ? s.name : serviceSlug,
      };
      nextStep = "ask_age";
    }

    setBookingDraft(draftUpdate);
    setBookingStep(nextStep);

    const question = getStepQuestion(nextStep, draftUpdate);
    setMsgs((prev) => [
      ...prev,
      {
        from: "bot",
        text: question.text,
        replies: question.replies,
      },
    ]);
  };

  // Process a booking answer step
  const processBookingAnswer = (field: string, value: string, displayLabel?: string) => {
    if (field === "cancel") {
      setBookingStep("none");
      setBookingDraft({});
      setMsgs((prev) => [
        ...prev,
        { from: "user", text: "Cancel Booking" },
        {
          from: "bot",
          text: "Booking cancelled. No problem! How else can I help your family?",
          replies: pageContext.initialReplies,
        },
      ]);
      return;
    }

    const userText = displayLabel || value;
    const userMsg: BotMsg = { from: "user", text: userText };

    let updatedDraft = { ...bookingDraft };
    let nextStep: BookingStep = bookingStep;

    switch (field) {
      case "service": {
        const s = SERVICES.find((item) => item.slug === value);
        updatedDraft = {
          ...updatedDraft,
          serviceId: value,
          serviceName: s ? s.name : value,
        };
        nextStep = "ask_age";
        break;
      }
      case "age":
        updatedDraft = { ...updatedDraft, patientAge: value };
        nextStep = "ask_city";
        break;
      case "city":
        updatedDraft = { ...updatedDraft, city: value };
        nextStep = "ask_location";
        break;
      case "location":
        updatedDraft = { ...updatedDraft, location: value };
        nextStep = "ask_shift";
        break;
      case "shift":
        updatedDraft = { ...updatedDraft, shiftSchedule: value };
        nextStep = "ask_duration";
        break;
      case "duration":
        updatedDraft = { ...updatedDraft, duration: value };
        nextStep = "ask_conditions";
        break;
      case "condition":
        updatedDraft = { ...updatedDraft, conditions: value };
        nextStep = "ask_urgency";
        break;
      case "urgency":
        updatedDraft = { ...updatedDraft, urgency: value };
        nextStep = "ask_contact";
        break;
    }

    setBookingDraft(updatedDraft);
    setBookingStep(nextStep);

    const nextQ = getStepQuestion(nextStep, updatedDraft);
    setMsgs((prev) => [
      ...prev,
      userMsg,
      {
        from: "bot",
        text: nextQ.text,
        replies: nextQ.replies,
      },
    ]);
  };

  // Finalize booking submission
  const completeBooking = async (name: string, phone: string) => {
    const ref = "AC-CHAT-" + Date.now().toString(36).toUpperCase().slice(-6);
    const finalDraft: BookingDraft = {
      ...bookingDraft,
      customerName: name,
      mobile: phone,
      ref,
    };

    setBookingDraft(finalDraft);
    setBookingStep("complete");

    // Dispatch lead via sendToGoogleSheet
    await sendToGoogleSheet({
      event_type: "booking",
      event_name: "chat_booking_completed",
      lead_type: "CHAT_BOOKING",
      form_name: "Conversational Chat Booking App",
      booking_ref: ref,
      customer_name: name,
      name: name,
      mobile: phone,
      phone: phone,
      service_id: finalDraft.serviceId || "care-service",
      service_name: finalDraft.serviceName || "Care Service",
      city: finalDraft.city || "South India",
      location_address: finalDraft.location || "",
      patient_age: finalDraft.patientAge || "",
      shift_type: finalDraft.shiftSchedule || "",
      duration_days: finalDraft.duration || "1",
      special_notes: `Patient: ${finalDraft.patientAge} | Needs: ${finalDraft.conditions} | Start: ${finalDraft.urgency} | Shift: ${finalDraft.shiftSchedule}`,
      booking_status: "Confirmed",
      follow_up_status: "Pending Coordinator Dispatch",
      lead_source: "bottom_right_chat_app",
      page_path: pathname,
    }).catch(() => {});

    // Session engine record & analytics tracking
    recordBookingDraft();
    if (finalDraft.serviceId) {
      recordServiceInteraction(finalDraft.serviceId, finalDraft.serviceName);
    }
    track("booking_submitted", { ref, service: finalDraft.serviceId, city: finalDraft.city });
    track("chat_booking_completed", { ref, service: finalDraft.serviceId });

    // Bot confirmation message with Interactive Booking Card
    const confirmationMsg: BotMsg = {
      from: "bot",
      text: "🎉 **Care Request Successfully Registered!**\nYour booking details have been dispatched to our regional care command center. Here is your official service requisition summary:",
      bookingCard: {
        ref,
        customerName: name,
        mobile: phone,
        serviceName: finalDraft.serviceName || "Care Service",
        patientAge: finalDraft.patientAge || "Family Member",
        city: finalDraft.city || "South India",
        location: finalDraft.location || "City Center",
        shiftSchedule: finalDraft.shiftSchedule || "Standard Shift",
        duration: finalDraft.duration || "As requested",
        urgency: finalDraft.urgency || "Immediately",
        conditions: finalDraft.conditions || "General care",
      },
      replies: [
        {
          label: "💬 Confirm on WhatsApp",
          action: {
            type: "whatsapp",
            msg: `Hi ApnaCare! I just registered booking reference ${ref} for ${finalDraft.serviceName} in ${finalDraft.city}. Please confirm attendant dispatch.`,
          },
        },
        {
          label: "📞 Call Coordinator Line",
          action: { type: "call" },
        },
        {
          label: "⚡ Book Another Service",
          action: { type: "start_booking" },
        },
        {
          label: "📋 Main Menu",
          action: { type: "message", text: "Here is our main menu:", nextReplies: GLOBAL_MENU },
        },
      ],
    };

    setMsgs((prev) => [...prev, confirmationMsg]);
  };

  // Quick reply handler
  const handleQuickReply = (choice: QuickReply) => {
    track("assistant_message", { label: choice.label, context: pageContext.badge });

    if (choice.action.type === "start_booking") {
      const userMsg: BotMsg = { from: "user", text: choice.label };
      setMsgs((prev) => [...prev, userMsg]);
      initiateBooking(choice.action.service);
      return;
    }

    if (choice.action.type === "booking_answer") {
      processBookingAnswer(choice.action.field, choice.action.value, choice.action.displayLabel);
      return;
    }

    if (choice.action.type === "booking") {
      const userMsg: BotMsg = { from: "user", text: choice.label };
      setMsgs((prev) => [...prev, userMsg]);
      initiateBooking(choice.action.service);
      return;
    }

    if (choice.action.type === "message") {
      const userMsg: BotMsg = { from: "user", text: choice.label };
      const botReply: BotMsg = {
        from: "bot",
        text: choice.action.text,
        replies: choice.action.nextReplies ?? pageContext.initialReplies,
      };
      setMsgs((prev) => [...prev, userMsg, botReply]);
      return;
    }

    if (choice.action.type === "navigate") {
      const userMsg: BotMsg = { from: "user", text: choice.label };
      const botReply: BotMsg = {
        from: "bot",
        text: `Opening **${choice.action.label}**. You can also continue chatting with me anytime!`,
        link: { label: choice.action.label, to: choice.action.to },
        replies: pageContext.initialReplies,
      };
      setMsgs((prev) => [...prev, userMsg, botReply]);
      return;
    }

    if (choice.action.type === "whatsapp") {
      const url = buildWhatsAppUrl(choice.action.msg);
      const userMsg: BotMsg = { from: "user", text: choice.label };
      const botReply: BotMsg = {
        from: "bot",
        text: "Connecting you directly to our WhatsApp care desk. A care coordinator will respond promptly.",
        link: { label: "Open WhatsApp Chat", href: url },
        replies: pageContext.initialReplies,
      };
      setMsgs((prev) => [...prev, userMsg, botReply]);
      return;
    }

    if (choice.action.type === "call") {
      const userMsg: BotMsg = { from: "user", text: choice.label };
      const botReply: BotMsg = {
        from: "bot",
        text: `Our phone coordination line is active 24/7:\n📞 **${SITE.SUPPORT_PHONE}**\nEmergency line: **${SITE.EMERGENCY_LINE}**`,
        link: { label: `Call ${SITE.SUPPORT_PHONE}`, href: `tel:${SITE.SUPPORT_PHONE_TEL}` },
        replies: pageContext.initialReplies,
      };
      setMsgs((prev) => [...prev, userMsg, botReply]);
      return;
    }
  };

  // Text input handler (processes user typed answers & conversational booking)
  const handleTextInput = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");

    const userMsg: BotMsg = { from: "user", text };

    // Case 1: In active booking contact step
    if (bookingStep === "ask_contact") {
      const phoneMatch = text.match(/(?:\+?91[\s-]?)?([6789]\d{9})/);
      if (phoneMatch) {
        const phone = phoneMatch[1];
        let name = text.replace(phoneMatch[0], "").replace(/[,.-]/g, "").trim();
        if (!name || name.length < 2) {
          name = "Valued Family Member";
        }
        setMsgs((prev) => [...prev, userMsg]);
        completeBooking(name, phone);
        return;
      } else {
        setMsgs((prev) => [
          ...prev,
          userMsg,
          {
            from: "bot",
            text: "⚠️ Please provide a valid **10-digit Indian mobile number** (e.g., 9876543210) so our regional care coordinator can reach you to confirm attendant dispatch.",
            replies: [
              { label: "💬 Share via WhatsApp", action: { type: "whatsapp", msg: `Hi ApnaCare! I want to confirm my booking: ${text}` } },
              { label: "📞 Call Coordinator Line", action: { type: "call" } },
              { label: "❌ Cancel Booking", action: { type: "booking_answer", field: "cancel", value: "cancel" } },
            ],
          },
        ]);
        return;
      }
    }

    // Case 2: In active booking question step (user typed free-form answer)
    if (bookingStep !== "none" && bookingStep !== "complete") {
      if (bookingStep === "ask_service") {
        processBookingAnswer("service", text, text);
        return;
      }
      if (bookingStep === "ask_age") {
        processBookingAnswer("age", text, text);
        return;
      }
      if (bookingStep === "ask_city") {
        processBookingAnswer("city", text, text);
        return;
      }
      if (bookingStep === "ask_location") {
        processBookingAnswer("location", text, text);
        return;
      }
      if (bookingStep === "ask_shift") {
        processBookingAnswer("shift", text, text);
        return;
      }
      if (bookingStep === "ask_duration") {
        processBookingAnswer("duration", text, text);
        return;
      }
      if (bookingStep === "ask_conditions") {
        processBookingAnswer("condition", text, text);
        return;
      }
      if (bookingStep === "ask_urgency") {
        processBookingAnswer("urgency", text, text);
        return;
      }
    }

    // Case 3: Free-form conversational intent detection from idle state
    const lower = text.toLowerCase();

    // Booking intent detection
    if (lower.includes("book") || lower.includes("reserve") || lower.includes("need attendant") || lower.includes("hire") || lower.includes("want attendant")) {
      setMsgs((prev) => [...prev, userMsg]);

      // Check if service mentioned
      let matchedService: string | undefined;
      if (lower.includes("elder") || lower.includes("senior") || lower.includes("old") || lower.includes("grandparent")) matchedService = "elderly-care";
      else if (lower.includes("hospital") || lower.includes("bedside") || lower.includes("ward")) matchedService = "hospital-attendants";
      else if (lower.includes("nurse") || lower.includes("nursing") || lower.includes("injection")) matchedService = "nursing-services";
      else if (lower.includes("baby") || lower.includes("natal") || lower.includes("mother")) matchedService = "post-natal-care";
      else if (lower.includes("driver") || lower.includes("car")) matchedService = "women-drivers";

      initiateBooking(matchedService);
      return;
    }

    // Price query
    if (lower.includes("price") || lower.includes("cost") || lower.includes("rate") || lower.includes("fee") || lower.includes("how much")) {
      setMsgs((prev) => [
        ...prev,
        userMsg,
        {
          from: "bot",
          text: "ApnaCare transparent pricing starts from:\n• **Elderly Care**: ₹1,200/day (Day / Night / 24h Live-in)\n• **Hospital Bedside**: ₹1,400/shift (12h/24h)\n• **Clinical Nursing**: ₹1,800/shift (GNM/B.Sc)\n• **Post-Natal Care**: ₹1,500/day\n• **Women Drivers**: ₹800/trip\n\nAll rates include statutory 18% GST invoices and zero agency broker fees. Would you like to book now?",
          replies: [
            { label: "⚡ Book in Chat Now", action: { type: "start_booking" } },
            { label: "💬 Inquire on WhatsApp", action: { type: "whatsapp", msg: `Hi ApnaCare! I'm inquiring about pricing: "${text}"` } },
            { label: "📞 Call Coordinator", action: { type: "call" } },
          ],
        },
      ]);
      return;
    }

    // Safety / police verification query
    if (lower.includes("safe") || lower.includes("police") || lower.includes("verify") || lower.includes("security") || lower.includes("background")) {
      setMsgs((prev) => [
        ...prev,
        userMsg,
        {
          from: "bot",
          text: "Safety & verification are fundamental to ApnaCare:\n• 100% Station-level police background certificates\n• Aadhaar biometric authentication\n• Residential address verification\n• 90-minute emergency regional backup standby\n\nWould you like to reserve a verified attendant?",
          replies: [
            { label: "⚡ Book an Attendant Now", action: { type: "start_booking" } },
            { label: "📞 Speak to Coordinator", action: { type: "call" } },
          ],
        },
      ]);
      return;
    }

    // Default conversational reply with booking CTA
    setMsgs((prev) => [
      ...prev,
      userMsg,
      {
        from: "bot",
        text: `Thank you for reaching out! Regarding "${text}", our care coordinators can assist you immediately. You can book an attendant directly in this chat or connect with us on WhatsApp.`,
        replies: [
          { label: "⚡ Book Care Attendant Now", action: { type: "start_booking" } },
          { label: "💬 WhatsApp Coordinator", action: { type: "whatsapp", msg: `Hi ApnaCare! Regarding: "${text}"` } },
          { label: "📞 Call 24/7 Desk", action: { type: "call" } },
        ],
      },
    ]);
  };

  const lastMsg = msgs[msgs.length - 1];
  const quickReplies = lastMsg?.replies ?? pageContext.initialReplies;
  const currentWhatsAppUrl = buildWhatsAppUrl(pageContext.whatsappMessage);

  // Dynamic input placeholder
  const inputPlaceholder = useMemo(() => {
    if (bookingStep === "ask_contact") return "Type Name and 10-digit mobile (e.g. Ramesh, 9876543210)...";
    if (bookingStep === "ask_age") return "Type patient age or relation (e.g. 78 years old)...";
    if (bookingStep === "ask_location") return `Type area or landmark in ${bookingDraft.city || "city"}...`;
    if (bookingStep !== "none" && bookingStep !== "complete") return "Type your answer or click an option above...";
    return `Ask about ${pageContext.badge} or type 'Book Care'...`;
  }, [bookingStep, bookingDraft.city, pageContext.badge]);

  // Current progress
  const stepInfo = STEP_PROGRESS_MAP[bookingStep];

  return (
    <>
      {/* Launcher Button (bottom-right) */}
      <div className="fixed bottom-24 right-4 z-50 flex items-center gap-2 md:bottom-6">
        {!open && (
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-background/95 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-lift backdrop-blur animate-fade-in">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            Book Care / Help Desk
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
          className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform hover:scale-105 active:scale-95"
        >
          {open ? <X className="size-5" /> : <MessageCircleHeart className="size-6" />}
        </button>
      </div>

      {/* Chat Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="ApnaCare Conversational Booking Assistant"
          aria-modal="true"
          style={{ backgroundColor: "#ffffff" }}
          className="fixed bottom-40 right-4 z-50 flex h-[620px] max-h-[85vh] w-[min(440px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl border border-border/90 shadow-2xl md:bottom-24 animate-fade-in text-card-foreground"
        >
          {/* Header with Live Coordinator Badge */}
          <div className="bg-primary px-4 py-3 text-primary-foreground shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-base font-semibold flex items-center gap-1.5">
                  ApnaCare Care Desk
                  <Sparkles className="size-3.5 text-terracotta" />
                </p>
                <p className="text-xs text-primary-foreground/80 flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Chat-Based Booking & Assistance
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  aria-label="Reset chat"
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
              <span className="text-[10px] uppercase font-bold tracking-wider text-primary-foreground/90">
                24/7 Dispatch Desk
              </span>
            </div>
          </div>

          {/* Booking Progress Bar when in active questionnaire */}
          {bookingStep !== "none" && bookingStep !== "complete" && (
            <div className="border-b border-border/80 bg-primary-soft/40 px-4 py-2 shrink-0">
              <div className="flex items-center justify-between text-xs font-bold text-primary mb-1">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  Step {stepInfo.num} of 6: {stepInfo.title}
                </span>
                <button
                  onClick={() => {
                    setBookingStep("none");
                    setBookingDraft({});
                    setMsgs((prev) => [
                      ...prev,
                      { from: "bot", text: "Booking reset. Here are our main options:", replies: GLOBAL_MENU },
                    ]);
                  }}
                  className="text-[10px] text-muted-foreground hover:text-destructive underline"
                >
                  Cancel
                </button>
              </div>
              <div className="h-1.5 w-full bg-border/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 rounded-full"
                  style={{ width: `${(stepInfo.num / 6) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3.5 overflow-y-auto p-4 bg-[#FAF8F5] dark:bg-muted/10"
            aria-live="polite"
            aria-relevant="additions"
          >
            {msgs.map((m, i) => (
              <div
                key={i}
                className={
                  m.from === "user"
                    ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm text-primary-foreground shadow-2xs"
                    : "max-w-[92%] rounded-2xl rounded-bl-sm bg-white border border-border/70 p-3.5 text-sm text-foreground shadow-2xs"
                }
              >
                {/* Text formatting with markdown bold & italics */}
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

                {/* Interactive Booking Confirmation Card */}
                {m.bookingCard && (
                  <div className="mt-3.5 overflow-hidden rounded-2xl border-2 border-primary/25 bg-card p-4 shadow-lift text-card-foreground">
                    <div className="flex items-center justify-between border-b border-border/80 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="grid size-8 place-items-center rounded-xl bg-emerald-500/15 text-emerald-700">
                          <CheckCircle2 className="size-5" />
                        </span>
                        <div>
                          <p className="text-xs font-bold text-foreground">Booking Confirmed & Dispatched</p>
                          <p className="text-[10px] text-muted-foreground">Coordinator Assigned</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-md border border-primary/20">
                        {m.bookingCard.ref}
                      </span>
                    </div>

                    <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-xl bg-secondary/35 p-2">
                        <dt className="text-[10px] uppercase font-bold text-muted-foreground">Service</dt>
                        <dd className="font-semibold text-foreground mt-0.5 truncate">{m.bookingCard.serviceName}</dd>
                      </div>
                      <div className="rounded-xl bg-secondary/35 p-2">
                        <dt className="text-[10px] uppercase font-bold text-muted-foreground">Patient / Age</dt>
                        <dd className="font-semibold text-foreground mt-0.5 truncate">{m.bookingCard.patientAge}</dd>
                      </div>
                      <div className="rounded-xl bg-secondary/35 p-2">
                        <dt className="text-[10px] uppercase font-bold text-muted-foreground">Location</dt>
                        <dd className="font-semibold text-foreground mt-0.5 truncate">{m.bookingCard.location}, {m.bookingCard.city}</dd>
                      </div>
                      <div className="rounded-xl bg-secondary/35 p-2">
                        <dt className="text-[10px] uppercase font-bold text-muted-foreground">Shift & Duration</dt>
                        <dd className="font-semibold text-foreground mt-0.5 truncate">{m.bookingCard.shiftSchedule}</dd>
                      </div>
                      <div className="rounded-xl bg-secondary/35 p-2">
                        <dt className="text-[10px] uppercase font-bold text-muted-foreground">Start Date</dt>
                        <dd className="font-semibold text-foreground mt-0.5 truncate">{m.bookingCard.urgency}</dd>
                      </div>
                      <div className="rounded-xl bg-secondary/35 p-2">
                        <dt className="text-[10px] uppercase font-bold text-muted-foreground">Contact</dt>
                        <dd className="font-semibold text-foreground mt-0.5 truncate">{m.bookingCard.customerName} ({m.bookingCard.mobile})</dd>
                      </div>
                    </dl>

                    <div className="mt-3 flex items-center gap-2 rounded-xl bg-primary-soft/50 p-2.5 text-[11px] text-muted-foreground border border-primary/20">
                      <ShieldCheck className="size-4 shrink-0 text-primary" />
                      <span>100% Police Verified & Biometric Attendants. A regional coordinator will call your mobile within 30 minutes.</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-border/70">
                      <a
                        href={buildWhatsAppUrl(`Hi ApnaCare! I just registered booking reference ${m.bookingCard.ref} for ${m.bookingCard.serviceName} in ${m.bookingCard.city}. Please confirm attendant dispatch.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#25D366] bg-[#25D366]/15 py-2 text-xs font-semibold text-[#128C7E] hover:bg-[#25D366]/25 transition-colors"
                      >
                        <MessageCircle className="size-3.5" />
                        Confirm on WhatsApp
                      </a>
                      <a
                        href={`tel:${SITE.SUPPORT_PHONE_TEL}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 py-2 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
                      >
                        <Phone className="size-3.5" />
                        Call Desk ({SITE.SUPPORT_PHONE})
                      </a>
                    </div>
                  </div>
                )}

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
            <div className="border-t border-border/80 bg-white p-3 shrink-0">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                <span>
                  {bookingStep !== "none" && bookingStep !== "complete"
                    ? `Options for ${stepInfo.title}:`
                    : `Suggested for ${pageContext.badge}:`}
                </span>
                <span className="text-[10px] text-muted-foreground/70">
                  {quickReplies.length} options
                </span>
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                {quickReplies.map((choice, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickReply(choice)}
                    className="rounded-full border border-primary/25 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/15 transition-colors whitespace-nowrap active:scale-95"
                  >
                    {choice.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Contextual WhatsApp Handoff Bar */}
          <div className="flex items-center justify-between border-t border-border/70 bg-[#FAF8F5] px-3.5 py-2 text-xs shrink-0">
            <span className="text-muted-foreground truncate max-w-[220px]">
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
            className="flex items-center gap-2 border-t border-border bg-white p-3 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={inputPlaceholder}
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

          {/* Emergency Disclaimer */}
          <div className="bg-muted/40 px-3 py-1.5 text-center text-[10px] text-muted-foreground shrink-0">
            24/7 South India Command Line:{" "}
            <a href={`tel:${SITE.SUPPORT_PHONE_TEL}`} className="font-bold underline">
              {SITE.SUPPORT_PHONE}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
