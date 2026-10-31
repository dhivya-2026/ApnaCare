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
import { getSavedCustomer, saveCustomer } from "@/lib/unifiedBookingEngine";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CarePack {
  id: string;
  name: string;
  badge: string;
  subtitle: string;
  serviceSlug: string;
  serviceName: string;
  startingPrice: number;
  pricingUnit: string;
  shiftSchedule: string;
  whatYouGet: string[];
  bestFor: string[];
}

export interface BookingCardData {
  ref: string;
  customerName: string;
  mobile: string;
  serviceName: string;
  patientAge: string;
  packName?: string;
  packInclusions?: string[];
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
  | "ask_recipient"
  | "ask_situation"
  | "recommend_packs"
  | "ask_city"
  | "ask_location"
  | "ask_urgency"
  | "ask_contact"
  | "complete"
  // Legacy / Direct fallbacks for backward compatibility
  | "ask_service"
  | "ask_age"
  | "ask_shift"
  | "ask_duration"
  | "ask_conditions";

export interface BookingDraft {
  serviceId?: string;
  serviceName?: string;
  recipient?: string;
  situation?: string;
  selectedPackId?: string;
  selectedPackName?: string;
  selectedPackInclusions?: string[];
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

// ─── Care Packs Catalog & Intelligent Recommendation Engine ──────────────────

export const CARE_PACKS: Record<string, CarePack> = {
  elder_day_companion: {
    id: "elder_day_companion",
    name: "Dignified Day Companion Pack",
    badge: "Most Popular",
    subtitle: "Everyday mobility, personal hygiene, and warm companionship while family is at work",
    serviceSlug: "elderly-care",
    serviceName: "Elderly Care at Home",
    startingPrice: 1299,
    pricingUnit: "12-hr day shift",
    shiftSchedule: "12-Hour Day Shift (8 AM - 8 PM)",
    whatYouGet: [
      "Dedicated, police-verified female Saha companion",
      "Morning sponge bath, personal grooming & dignity hygiene support",
      "Gentle walking assistance, wheelchair transfers & fall prevention",
      "Timely oral medication reminders & vital sign logging",
      "Nutritious warm meal accompaniment & light pantry preparation",
      "Daily WhatsApp digital wellness logs dispatched to family",
      "90-min regional emergency cluster standby replacement backup",
    ],
    bestFor: ["father", "mother", "parents", "elderly", "daily living", "walking", "bathing", "companionship"],
  },
  elder_livein: {
    id: "elder_livein",
    name: "24/7 Continuous Live-In Care Pack",
    badge: "Round-the-Clock Safety",
    subtitle: "Continuous day-and-night companion living at home for seniors needing round-the-clock peace of mind",
    serviceSlug: "elderly-care",
    serviceName: "Elderly Care at Home",
    startingPrice: 1799,
    pricingUnit: "24-hr day",
    shiftSchedule: "24-Hour Live-in Care (Continuous)",
    whatYouGet: [
      "Resident police-verified Saha attendant living in family home",
      "Night-time monitoring, bathroom assistance & zero unattended falls",
      "Complete personal hygiene, grooming, and bed-bound comfort",
      "Regular diet assistance, hydration reminders & routine tracking",
      "Direct daily oversight from dedicated regional care coordinator",
      "Standby replacement guarantee if primary attendant is unavailable",
      "18% statutory GST invoice with zero broker commissions",
    ],
    bestFor: ["24/7", "live in", "live-in", "night", "alone", "unattended", "parents alone", "continuous"],
  },
  hospital_bedside: {
    id: "hospital_bedside",
    name: "Hospital Ward Bedside Vigil Pack",
    badge: "Hospital & Recovery",
    subtitle: "Attentive bedside presence in private or general wards, relieving exhausted family members",
    serviceSlug: "hospital-attendants",
    serviceName: "Hospital & Bedside Support",
    startingPrice: 1499,
    pricingUnit: "12-hr shift",
    shiftSchedule: "12-Hour Day or Night Ward Vigil",
    whatYouGet: [
      "Attentive bedside attendant stationed in private or general ward",
      "Immediate nurse call-bell coordination & doctor instruction liaison",
      "Patient sponge baths, commode/bedpan assistance & fresh clothes change",
      "Position adjustments to prevent ward stiffness and bed sores",
      "Hourly WhatsApp status check-ins for anxious or distant family",
      "Discharge coordination: billing lines, wheelchair escort & home transfer",
    ],
    bestFor: ["hospital", "bedside", "ward", "icu", "surgery", "operation", "discharge", "post-op"],
  },
  clinical_nursing: {
    id: "clinical_nursing",
    name: "Certified Clinical Nursing Pack",
    badge: "Licensed GNM / B.Sc",
    subtitle: "Medical and surgical nursing procedures administered strictly per written physician prescription",
    serviceSlug: "nursing-services",
    serviceName: "Certified Clinical Nursing",
    startingPrice: 1999,
    pricingUnit: "clinical shift",
    shiftSchedule: "Visit or 12-Hour Clinical Nursing",
    whatYouGet: [
      "State Nursing Council registered GNM or B.Sc nurse",
      "Sterile surgical wound dressings & bedsore management",
      "IV infusions, doctor-prescribed injections & cannula management",
      "Catheter insertion / care and Ryle's tube feeding supervision",
      "Clinical vital signs charting & physician prescription adherence",
      "Emergency medical coordination protocols",
    ],
    bestFor: ["nurse", "nursing", "injection", "iv", "wound", "dressing", "catheter", "sterile", "clinical"],
  },
  post_natal_mother_baby: {
    id: "post_natal_mother_baby",
    name: "Mother & Baby Post-Natal Healing Pack",
    badge: "Traditional Japa & Nurturing",
    subtitle: "Gentle mother healing, traditional massage, and delicate newborn care routines",
    serviceSlug: "post-natal-care",
    serviceName: "Post-Natal & Infant Care",
    startingPrice: 1799,
    pricingUnit: "day",
    shiftSchedule: "10-Hour Day Shift or 24-Hour Live-in",
    whatYouGet: [
      "Experienced traditional Japa & maternal care specialist",
      "Traditional herbal mother massage & hot water fomentation",
      "Gentle baby oil massage, lukewarm bath & umbilical cord hygiene",
      "Post-C-section incision care & supportive recovery rest",
      "Night feeding support & burping so the new mother can rest and sleep",
      "Nutritious post-natal meal accompaniment for lactation",
    ],
    bestFor: ["baby", "mother", "newborn", "post-natal", "postnatal", "japa", "c-section", "pregnancy", "delivery"],
  },
  specialised_dependency: {
    id: "specialised_dependency",
    name: "High-Dependency & Neuro Support Pack",
    badge: "Specialized Attendant",
    subtitle: "Care for Parkinson's, post-stroke rehabilitation, and dementia memory support",
    serviceSlug: "elderly-care",
    serviceName: "Specialised Daily Support",
    startingPrice: 1599,
    pricingUnit: "shift",
    shiftSchedule: "12-Hour Shift or 24-Hour Live-in",
    whatYouGet: [
      "Attendant trained in patient ergonomics and neurological care",
      "Two-person gentle transfer techniques & anti-fall room safety",
      "Dementia redirection, memory validation & patient emotional calm",
      "Bed-bound sponge baths, diaper hygiene & skin integrity checks",
      "Assistance with doctor-prescribed physiotherapy movement drills",
      "Continuous coordination with regional supervisor & daily digital logs",
    ],
    bestFor: ["stroke", "parkinson", "dementia", "alzheimer", "paralysis", "bedridden", "dependent", "fracture", "high-dependency"],
  },
  assisted_travel_transit: {
    id: "assisted_travel_transit",
    name: "Door-to-Door Assisted Travel Pack",
    badge: "Assisted Travel & Transit",
    subtitle: "Accompanied travel for senior citizens, airport navigation, and railway platform assistance",
    serviceSlug: "travel-assistance",
    serviceName: "Assisted Travel",
    startingPrice: 899,
    pricingUnit: "trip",
    shiftSchedule: "Single Trip or Full-Day Travel Escort",
    whatYouGet: [
      "Verified female companion meeting at doorstep, airport curb or platform",
      "Luggage handling & licensed coolie coordination",
      "Wheelchair assistance through airport check-in, security & gate boarding",
      "Railway coach seat locating, luggage stowing & arrival greeting",
      "Live GPS trip feed and photo check-in sent to family WhatsApp",
      "Safe doorstep handover at destination address",
    ],
    bestFor: ["travel", "airport", "railway", "train", "flight", "transit", "station", "commute", "chauffeuse", "driver"],
  },
};

export function getRecommendedPacks(recipient: string, situation: string, serviceSlug?: string): CarePack[] {
  const query = `${recipient} ${situation} ${serviceSlug || ""}`.toLowerCase();

  if (serviceSlug === "post-natal-care" || query.includes("baby") || query.includes("newborn") || query.includes("japa") || query.includes("post-natal") || query.includes("postnatal")) {
    return [CARE_PACKS.post_natal_mother_baby, CARE_PACKS.elder_day_companion];
  }
  if (serviceSlug === "nursing-services" || query.includes("injection") || query.includes("wound") || query.includes("catheter") || query.includes("iv") || query.includes("sterile") || query.includes("clinical")) {
    return [CARE_PACKS.clinical_nursing, CARE_PACKS.hospital_bedside];
  }
  if (serviceSlug === "hospital-attendants" || query.includes("hospital") || query.includes("ward") || query.includes("surgery") || query.includes("icu") || query.includes("operation") || query.includes("discharge")) {
    return [CARE_PACKS.hospital_bedside, CARE_PACKS.clinical_nursing, CARE_PACKS.elder_day_companion];
  }
  if (serviceSlug === "travel-assistance" || serviceSlug === "women-drivers" || query.includes("airport") || query.includes("railway") || query.includes("flight") || query.includes("train") || query.includes("travel")) {
    return [CARE_PACKS.assisted_travel_transit, CARE_PACKS.elder_day_companion];
  }
  if (query.includes("stroke") || query.includes("parkinson") || query.includes("dementia") || query.includes("alzheimer") || query.includes("paralysis") || query.includes("bedridden") || query.includes("high-dependency")) {
    return [CARE_PACKS.specialised_dependency, CARE_PACKS.elder_livein, CARE_PACKS.elder_day_companion];
  }
  if (query.includes("24") || query.includes("live") || query.includes("night") || query.includes("alone") || query.includes("round the clock")) {
    return [CARE_PACKS.elder_livein, CARE_PACKS.elder_day_companion, CARE_PACKS.specialised_dependency];
  }

  // Default Elder Care recommendations: Day companion and 24/7 live-in
  return [CARE_PACKS.elder_day_companion, CARE_PACKS.elder_livein, CARE_PACKS.hospital_bedside];
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

export const STEP_PROGRESS_MAP: Record<BookingStep, { num: number; title: string }> = {
  none: { num: 0, title: "" },
  ask_recipient: { num: 1, title: "Who Needs Care" },
  ask_situation: { num: 2, title: "Care Situation" },
  recommend_packs: { num: 3, title: "Recommended Packs" },
  ask_city: { num: 4, title: "City" },
  ask_location: { num: 4, title: "Locality" },
  ask_urgency: { num: 5, title: "Start Date" },
  ask_contact: { num: 6, title: "Confirmation" },
  complete: { num: 6, title: "Booking Confirmed" },
  // Backward compatibility mappings
  ask_service: { num: 1, title: "Support Needed" },
  ask_age: { num: 2, title: "Patient Age" },
  ask_shift: { num: 4, title: "Shift Schedule" },
  ask_duration: { num: 4, title: "Duration" },
  ask_conditions: { num: 5, title: "Patient Needs" },
};

function getStepQuestion(step: BookingStep, draft: BookingDraft): { text: string; replies: QuickReply[]; placeholder?: string } {
  switch (step) {
    case "ask_recipient":
      return {
        text: "👋 Welcome to **ApnaCare Conversational Care Concierge**!\n\nLet's start by understanding your family's needs: **Who are you booking care for?**\n\n*(You can pick an option below or describe your family's situation in your own words)*",
        replies: [
          { label: "👴 My Elderly Father", action: { type: "booking_answer", field: "recipient", value: "My Elderly Father" } },
          { label: "👵 My Elderly Mother", action: { type: "booking_answer", field: "recipient", value: "My Elderly Mother" } },
          { label: "🧓 Both My Parents", action: { type: "booking_answer", field: "recipient", value: "Both My Parents" } },
          { label: "🏥 Patient in Hospital / Post-Op Recovery", action: { type: "booking_answer", field: "recipient", value: "Hospital / Post-Op Patient" } },
          { label: "👶 New Mother & Newborn Baby", action: { type: "booking_answer", field: "recipient", value: "New Mother & Baby" } },
          { label: "🧠 Chronic Care (Stroke, Parkinson's, Dementia)", action: { type: "booking_answer", field: "recipient", value: "Chronic / Specialised Care" } },
          { label: "👤 Myself / Personal Assistance", action: { type: "booking_answer", field: "recipient", value: "Myself" } },
          { label: "❌ Cancel", action: { type: "booking_answer", field: "cancel", value: "cancel" } },
        ],
        placeholder: "Type who needs care or explain your situation in words...",
      };

    case "ask_situation": {
      const rec = draft.recipient || "your loved one";
      const lowerRec = rec.toLowerCase();
      let situationOptions: { label: string; value: string }[] = [];

      if (lowerRec.includes("hospital") || lowerRec.includes("post-op")) {
        situationOptions = [
          { label: "🏥 Ward Bedside Attendant (Day or Night Vigil)", value: "Ward Bedside Attendant" },
          { label: "🩺 Post-Discharge Home Convalescence", value: "Post-Discharge Home Recovery" },
          { label: "💉 Prescribed Clinical Nursing (Wound, IV, Catheter)", value: "Clinical Nursing & Wound Care" },
          { label: "🚶 Mobility & Sponge Bath Assistance", value: "Mobility & Sponge Bath Assistance" },
        ];
      } else if (lowerRec.includes("mother") || lowerRec.includes("baby")) {
        situationOptions = [
          { label: "🍼 Newborn Oil Massage & Bathing (Japa)", value: "Newborn Japa & Mother Massage" },
          { label: "🤱 Post-C-Section Convalescence & Rest", value: "Post-C-Section Recovery" },
          { label: "🌙 Night-Time Feeding & Infant Respite", value: "Night Respite & Feeding Care" },
          { label: "🏡 24-hr Full-Time Mother & Baby Live-In", value: "24-hr Japa Live-in Care" },
        ];
      } else if (lowerRec.includes("chronic") || lowerRec.includes("stroke") || lowerRec.includes("dementia") || lowerRec.includes("parkinson")) {
        situationOptions = [
          { label: "🧠 Dementia / Alzheimer's Memory & Calm", value: "Dementia & Memory Care" },
          { label: "⚡ Post-Stroke Paralysis & Transfer Drills", value: "Post-Stroke Rehabilitation" },
          { label: "🤝 Parkinson's Daily Balance & Living", value: "Parkinson's Daily Support" },
          { label: "🛏️ Bedridden Diaper & Commode Care", value: "Bedridden & Diaper Hygiene" },
        ];
      } else {
        situationOptions = [
          { label: "🚶 Walking, Transfers & Fall Safety", value: "Walking & Fall Prevention" },
          { label: "🛁 Bathing, Dressing & Dignity Hygiene", value: "Bathing & Personal Hygiene" },
          { label: "💊 Medication Reminders & Companionship", value: "Medication & Companionship" },
          { label: "🛏️ Bedridden / Diaper & Commode Support", value: "Bedridden & Diaper Care" },
          { label: "🏡 24/7 Round-the-Clock Peace of Mind", value: "24/7 Live-in Safety" },
        ];
      }

      return {
        text: `Understood: care for **${rec}**.\n\n**Could you describe their current situation or what support they need most?**\n\n*(Pick an option or describe their condition in detail)*`,
        replies: [
          ...situationOptions.map((opt) => ({
            label: opt.label,
            action: { type: "booking_answer" as const, field: "situation", value: opt.value },
          })),
          { label: "❌ Cancel", action: { type: "booking_answer" as const, field: "cancel", value: "cancel" } },
        ],
        placeholder: "Type their physical/medical situation in detail...",
      };
    }

    case "recommend_packs": {
      const packs = getRecommendedPacks(draft.recipient || "", draft.situation || "", draft.serviceId);
      const packsSummary = packs
        .map(
          (p, idx) =>
            `📦 **Pack ${idx + 1}: ${p.name}** (${formatINR(p.startingPrice)} / ${p.pricingUnit})\n🏷️ *${p.badge}* · ${p.shiftSchedule}\n💡 *${p.subtitle}*\n**What they get:**\n• ${p.whatYouGet.join("\n• ")}`
        )
        .join("\n\n────────────────────\n\n");

      return {
        text: `✨ **Recommended Care Packs for ${draft.recipient || "Your Family"}**\nBased on your situation (*${draft.situation || "General Care"}*), here are our tailored packages with complete inclusion transparency:\n\n${packsSummary}\n\n**Which pack would you like to reserve?**`,
        replies: [
          ...packs.map((p, idx) => ({
            label: `👉 Choose Pack ${idx + 1}: ${p.name}`,
            action: {
              type: "booking_answer" as const,
              field: "pack",
              value: p.id,
              displayLabel: `Selected: ${p.name}`,
            },
          })),
          { label: "💬 Speak to Coordinator for Custom Plan", action: { type: "whatsapp" as const, msg: `Hi ApnaCare! I need a custom care plan for ${draft.recipient} (${draft.situation}).` } },
          { label: "❌ Cancel", action: { type: "booking_answer" as const, field: "cancel", value: "cancel" } },
        ],
        placeholder: "Select a pack above or ask a question...",
      };
    }

    case "ask_city": {
      const packName = draft.selectedPackName || "Care Package";
      return {
        text: `Excellent choice! You've selected **${packName}**.\n\n**Which city will your Saha be assisting in?**`,
        replies: [
          { label: "🏙️ Bengaluru", action: { type: "booking_answer", field: "city", value: "Bengaluru" } },
          { label: "🏛️ Chennai", action: { type: "booking_answer", field: "city", value: "Chennai" } },
          { label: "🕌 Hyderabad", action: { type: "booking_answer", field: "city", value: "Hyderabad" } },
          { label: "🌲 Coimbatore", action: { type: "booking_answer", field: "city", value: "Coimbatore" } },
          { label: "❌ Cancel", action: { type: "booking_answer", field: "cancel", value: "cancel" } },
        ],
        placeholder: "Select your city or type location...",
      };
    }

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

    case "ask_urgency":
      return {
        text: `Location noted: **${draft.location}, ${draft.city}**.\n\n**When would you like your Saha to start?**`,
        replies: [
          { label: "🚨 Immediately (Today / Urgent within 4 hrs)", action: { type: "booking_answer", field: "urgency", value: "Immediately (Today)" } },
          { label: "🌅 Tomorrow Morning", action: { type: "booking_answer", field: "urgency", value: "Tomorrow Morning" } },
          { label: "📅 Within 2 to 3 Days", action: { type: "booking_answer", field: "urgency", value: "Within 2-3 Days" } },
          { label: "🗓️ Next Week or Later", action: { type: "booking_answer", field: "urgency", value: "Next Week or Later" } },
          { label: "❌ Cancel", action: { type: "booking_answer", field: "cancel", value: "cancel" } },
        ],
        placeholder: "Select urgency or type start date...",
      };

    case "ask_contact": {
      const saved = typeof window !== "undefined" ? getSavedCustomer() : null;
      const hasSavedContact = saved && saved.name && saved.phone;
      const replies: QuickReply[] = [];
      if (hasSavedContact) {
        replies.push({
          label: `✅ Confirm as ${saved.name} (${saved.phone})`,
          action: { type: "booking_answer", field: "contact_preset", value: `${saved.name}||${saved.phone}` },
        });
      }
      replies.push(
        { label: "💬 Share Details on WhatsApp", action: { type: "whatsapp", msg: `Hi ApnaCare! I want to complete booking for ${draft.selectedPackName || draft.serviceName} in ${draft.city}.` } },
        { label: "📞 Call Coordinator Line", action: { type: "call" } },
        { label: "❌ Cancel Booking", action: { type: "booking_answer", field: "cancel", value: "cancel" } }
      );

      return {
        text: `All care specifications recorded! 🎯\n\nLastly, please provide your **Full Name** and **10-Digit Mobile Number** so our regional care coordinator in ${draft.city || "South India"} can assign your police-verified Saha.`,
        replies,
        placeholder: hasSavedContact ? `Confirm above or type Name & 10-digit mobile...` : "Type Name & 10-digit mobile (e.g. Ramesh, 9876543210)...",
      };
    }

    // Legacy fallbacks
    case "ask_service":
      return getStepQuestion("ask_recipient", draft);
    case "ask_age":
      return getStepQuestion("ask_situation", draft);
    case "ask_shift":
    case "ask_duration":
    case "ask_conditions":
      return getStepQuestion("recommend_packs", draft);

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

  // Start conversational booking flow
  const initiateBooking = (serviceSlug?: string) => {
    const savedCustomer = typeof window !== "undefined" ? getSavedCustomer() : null;
    let nextStep: BookingStep = "ask_recipient";
    let draftUpdate: BookingDraft = {
      city: savedCustomer?.city || "",
      customerName: savedCustomer?.name || "",
      mobile: savedCustomer?.phone || "",
    };

    if (serviceSlug) {
      const s = SERVICES.find((item) => item.slug === serviceSlug);
      draftUpdate = {
        ...draftUpdate,
        serviceId: serviceSlug,
        serviceName: s ? s.name : serviceSlug,
      };
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
      case "recipient":
        updatedDraft = { ...updatedDraft, recipient: value, patientAge: value };
        nextStep = "ask_situation";
        break;

      case "situation":
        updatedDraft = { ...updatedDraft, situation: value, conditions: value };
        nextStep = "recommend_packs";
        break;

      case "pack": {
        const pack = CARE_PACKS[value] || Object.values(CARE_PACKS)[0];
        updatedDraft = {
          ...updatedDraft,
          selectedPackId: pack.id,
          selectedPackName: pack.name,
          selectedPackInclusions: pack.whatYouGet,
          serviceId: pack.serviceSlug,
          serviceName: pack.serviceName,
          shiftSchedule: pack.shiftSchedule,
        };
        nextStep = "ask_city";
        break;
      }

      case "city":
        updatedDraft = { ...updatedDraft, city: value };
        nextStep = "ask_location";
        break;

      case "location":
        updatedDraft = { ...updatedDraft, location: value };
        nextStep = "ask_urgency";
        break;

      case "urgency":
        updatedDraft = { ...updatedDraft, urgency: value };
        nextStep = "ask_contact";
        break;

      case "contact_preset": {
        const [cName, cPhone] = value.split("||");
        setBookingDraft(updatedDraft);
        setMsgs((prev) => [...prev, userMsg]);
        completeBooking(cName, cPhone);
        return;
      }

      // Backward compatibility mappings
      case "service": {
        const s = SERVICES.find((item) => item.slug === value);
        updatedDraft = {
          ...updatedDraft,
          serviceId: value,
          serviceName: s ? s.name : value,
        };
        nextStep = "ask_recipient";
        break;
      }
      case "age":
        updatedDraft = { ...updatedDraft, patientAge: value, recipient: value };
        nextStep = "ask_situation";
        break;
      case "shift":
        updatedDraft = { ...updatedDraft, shiftSchedule: value };
        nextStep = "ask_city";
        break;
      case "duration":
        updatedDraft = { ...updatedDraft, duration: value };
        nextStep = "ask_urgency";
        break;
      case "condition":
        updatedDraft = { ...updatedDraft, conditions: value, situation: value };
        nextStep = "recommend_packs";
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

    // Save customer to unified store
    saveCustomer({
      name,
      phone,
      city: finalDraft.city || "Bengaluru",
      fullAddress: finalDraft.location || "",
      relationship: finalDraft.recipient || "Family Member",
    });

    // Dispatch lead via sendToGoogleSheet
    await sendToGoogleSheet({
      event_type: "booking",
      event_name: "chat_booking_completed",
      lead_type: "CHAT_BOOKING",
      form_name: "Conversational Chat Booking Concierge",
      booking_ref: ref,
      customer_name: name,
      name: name,
      mobile: phone,
      phone: phone,
      service_id: finalDraft.serviceId || "care-service",
      service_name: finalDraft.selectedPackName || finalDraft.serviceName || "Care Service",
      city: finalDraft.city || "South India",
      location_address: finalDraft.location || "",
      patient_age: finalDraft.recipient || finalDraft.patientAge || "",
      shift_type: finalDraft.shiftSchedule || "",
      duration_days: finalDraft.duration || "1",
      special_notes: `Pack: ${finalDraft.selectedPackName || "Standard"} | For: ${finalDraft.recipient} | Situation: ${finalDraft.situation} | Start: ${finalDraft.urgency}`,
      booking_status: "Submitted",
      follow_up_status: "Pending Coordinator Review",
      lead_source: "bottom_right_conversational_concierge",
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
      text: "🎉 **Care Request Successfully Registered!**\nYour customized care pack request has been dispatched to our regional command center. Here is your official service summary:",
      bookingCard: {
        ref,
        customerName: name,
        mobile: phone,
        serviceName: finalDraft.selectedPackName || finalDraft.serviceName || "Care Service",
        patientAge: finalDraft.recipient || finalDraft.patientAge || "Family Member",
        packName: finalDraft.selectedPackName,
        packInclusions: finalDraft.selectedPackInclusions,
        city: finalDraft.city || "South India",
        location: finalDraft.location || "City Center",
        shiftSchedule: finalDraft.shiftSchedule || "Standard Shift",
        duration: finalDraft.duration || "As requested",
        urgency: finalDraft.urgency || "Immediately",
        conditions: finalDraft.situation || finalDraft.conditions || "General care",
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
      if (bookingStep === "ask_recipient") {
        processBookingAnswer("recipient", text, text);
        return;
      }
      if (bookingStep === "ask_situation") {
        processBookingAnswer("situation", text, text);
        return;
      }
      if (bookingStep === "recommend_packs") {
        // If user typed 1 or 2 or a pack name
        const lowerT = text.toLowerCase();
        const packs = getRecommendedPacks(bookingDraft.recipient || "", bookingDraft.situation || "", bookingDraft.serviceId);
        let chosen = packs[0];
        if (lowerT.includes("2") || lowerT.includes("second") || (packs[1] && lowerT.includes(packs[1].name.toLowerCase()))) {
          chosen = packs[1] || packs[0];
        } else if (lowerT.includes("3") || lowerT.includes("third") || (packs[2] && lowerT.includes(packs[2].name.toLowerCase()))) {
          chosen = packs[2] || packs[0];
        }
        processBookingAnswer("pack", chosen.id, `Selected: ${chosen.name}`);
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
      if (bookingStep === "ask_urgency") {
        processBookingAnswer("urgency", text, text);
        return;
      }
      // Backward compatibility
      if (bookingStep === "ask_service") {
        processBookingAnswer("service", text, text);
        return;
      }
      if (bookingStep === "ask_age") {
        processBookingAnswer("age", text, text);
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
    }

    // Case 3: Free-form conversational intent detection from idle state
    const lower = text.toLowerCase();

    // Check if user explained a situation directly (e.g. "My father is 78 and had a stroke in Chennai")
    const hasRecipient = lower.includes("father") || lower.includes("mother") || lower.includes("parent") || lower.includes("grandfather") || lower.includes("grandmother") || lower.includes("patient") || lower.includes("baby") || lower.includes("myself");
    const hasSituation = lower.includes("stroke") || lower.includes("hospital") || lower.includes("surgery") || lower.includes("bedridden") || lower.includes("walking") || lower.includes("fall") || lower.includes("dementia") || lower.includes("parkinson") || lower.includes("bath") || lower.includes("nurse") || lower.includes("japa");

    if (hasRecipient && hasSituation) {
      setMsgs((prev) => [...prev, userMsg]);
      let extractedRecipient = "Family Member";
      if (lower.includes("father")) extractedRecipient = "My Father";
      else if (lower.includes("mother")) extractedRecipient = "My Mother";
      else if (lower.includes("parent")) extractedRecipient = "Both Parents";
      else if (lower.includes("baby")) extractedRecipient = "New Mother & Baby";
      else if (lower.includes("patient")) extractedRecipient = "Hospital / Recovery Patient";

      let extractedCity = "";
      if (lower.includes("bengaluru") || lower.includes("bangalore")) extractedCity = "Bengaluru";
      else if (lower.includes("chennai")) extractedCity = "Chennai";
      else if (lower.includes("hyderabad")) extractedCity = "Hyderabad";
      else if (lower.includes("coimbatore")) extractedCity = "Coimbatore";

      const updatedDraft: BookingDraft = {
        recipient: extractedRecipient,
        situation: text,
        patientAge: extractedRecipient,
        conditions: text,
        city: extractedCity,
      };

      setBookingDraft(updatedDraft);
      setBookingStep("recommend_packs");

      const packsQuestion = getStepQuestion("recommend_packs", updatedDraft);
      setMsgs((prev) => [
        ...prev,
        {
          from: "bot",
          text: `Thank you for explaining your situation! We have understood care for **${extractedRecipient}**${extractedCity ? ` in **${extractedCity}**` : ""}.\n\n${packsQuestion.text}`,
          replies: packsQuestion.replies,
        },
      ]);
      return;
    }

    // General booking intent detection
    if (lower.includes("book") || lower.includes("reserve") || lower.includes("need attendant") || lower.includes("hire") || lower.includes("want attendant") || lower.includes("looking for care")) {
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
    if (bookingStep === "ask_recipient") return "Who needs care? Or explain your situation...";
    if (bookingStep === "ask_situation") return "Describe their situation or what help is needed...";
    if (bookingStep === "recommend_packs") return "Click a pack above or ask any question...";
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

                    {/* Reserved Pack & What You Get */}
                    {m.bookingCard.packName && (
                      <div className="mt-3 rounded-xl bg-primary-soft/60 p-2.5 border border-primary/20">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-primary tracking-wider">Reserved Care Pack</span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-500/15 px-2 py-0.5 rounded-full">Included</span>
                        </div>
                        <p className="font-semibold text-xs text-foreground mt-0.5">{m.bookingCard.packName}</p>
                        {m.bookingCard.packInclusions && m.bookingCard.packInclusions.length > 0 && (
                          <div className="mt-2 space-y-1">
                            <p className="text-[10px] font-bold uppercase text-muted-foreground">What your family gets:</p>
                            <ul className="space-y-1 text-[11px] text-foreground">
                              {m.bookingCard.packInclusions.slice(0, 4).map((inc: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-1.5 leading-snug">
                                  <Check className="size-3 text-primary shrink-0 mt-0.5" />
                                  <span>{inc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-xl bg-secondary/35 p-2">
                        <dt className="text-[10px] uppercase font-bold text-muted-foreground">Service / Pack</dt>
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
