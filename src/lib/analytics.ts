// Provider-agnostic analytics and ApnaCare Google Sheets integration.
type Props = Record<string, unknown>;
type Adapter = (event: string, props: Props) => void;

export const APPS_SCRIPT_URL =
  (import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL as string) ||
  "https://script.google.com/macros/s/AKfycbx6gwpPkEgsO9y0lksDo2MS4LFXna4dnv20XkC4_KJd3voXqxTCyBuwPg4g_BM896YV/exec";

// Ingest telemetry, leads, bookings or SOS alerts directly into the connected Google Sheet
export async function sendToGoogleSheet(payload: Props): Promise<boolean> {
  if (!APPS_SCRIPT_URL || typeof window === "undefined") return false;

  try {
    const enriched: Props = {
      client_timestamp: new Date().toISOString(),
      page_url: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title,
      referrer_url: document.referrer || "(direct_entry)",
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      screen_width: window.screen?.width || 0,
      screen_height: window.screen?.height || 0,
      device_type: window.innerWidth < 768 ? "Mobile" : window.innerWidth < 1024 ? "Tablet" : "Desktop",
      ...payload,
    };

    // Google Apps Script Web Apps require no-cors for cross-origin browser POST requests
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(enriched),
    });
    return true;
  } catch (err) {
    console.warn("Failed to dispatch to Google Sheets webhook:", err);
    return false;
  }
}

const adapters: Adapter[] = [
  (event, props) => {
    if (typeof window === "undefined") return;
    const w = window as unknown as { dataLayer?: unknown[]; _vid?: string; _sid?: string };
    (w.dataLayer ||= []).push({ event, ...props });

    // Retrieve or initialize persistent visitor and session IDs
    try {
      if (!w._vid) {
        w._vid = localStorage.getItem("apnacare_vid") || ("vis_" + Math.random().toString(36).substring(2, 9));
        localStorage.setItem("apnacare_vid", w._vid);
      }
      if (!w._sid) {
        w._sid = sessionStorage.getItem("apnacare_sid") || ("ses_" + Math.random().toString(36).substring(2, 9));
        sessionStorage.setItem("apnacare_sid", w._sid);
      }
    } catch {
      // ignore storage access errors in private modes
    }

    // Forward event to Google Apps Script
    sendToGoogleSheet({
      event_type: event.includes("submit") || event.includes("success") ? "lead" : "telemetry",
      event_name: event,
      visitor_id: w._vid,
      session_id: w._sid,
      ...props,
    }).catch(() => {});
  },
];

export function registerAnalyticsAdapter(a: Adapter) {
  adapters.push(a);
}

export function track(event: string, props: Props = {}) {
  for (const a of adapters) {
    try {
      a(event, props);
    } catch {
      /* ignore */
    }
  }
}
