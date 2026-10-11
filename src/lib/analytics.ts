// Provider-agnostic analytics and ApnaCare Google Sheets integration.
import { useEffect } from "react";

export type Props = Record<string, unknown>;
export type Adapter = (event: string, props: Props) => void;

export const APPS_SCRIPT_URL =
  (import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL as string) ||
  "https://script.google.com/macros/s/AKfycbx6gwpPkEgsO9y0lksDo2MS4LFXna4dnv20XkC4_KJd3voXqxTCyBuwPg4g_BM896YV/exec";

// ─── Environment & Device Detection ──────────────────────────────────────────

export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

export function getDeviceType(): "Mobile" | "Tablet" | "Desktop" {
  if (!isBrowser()) return "Desktop";
  const w = window.innerWidth;
  if (w < 768) return "Mobile";
  if (w < 1024) return "Tablet";
  return "Desktop";
}

export function getBrowserInfo(): { browser: string; version: string; os: string } {
  if (!isBrowser()) return { browser: "Chrome", version: "Latest", os: "Windows" };

  const ua = navigator.userAgent;
  let browser = "Chrome";
  let version = "Latest";
  let os = "Windows";

  // Operating System
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Macintosh|Mac OS X/i.test(ua)) os = "macOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  // Browser
  if (/Edg\//i.test(ua)) {
    browser = "Edge";
    version = ua.match(/Edg\/([\d.]+)/)?.[1] || "Latest";
  } else if (/Chrome\//i.test(ua) && !/Chromium\//i.test(ua)) {
    browser = "Chrome";
    version = ua.match(/Chrome\/([\d.]+)/)?.[1] || "Latest";
  } else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) {
    browser = "Safari";
    version = ua.match(/Version\/([\d.]+)/)?.[1] || "Latest";
  } else if (/Firefox\//i.test(ua)) {
    browser = "Firefox";
    version = ua.match(/Firefox\/([\d.]+)/)?.[1] || "Latest";
  } else if (/OPR\//i.test(ua)) {
    browser = "Opera";
    version = ua.match(/OPR\/([\d.]+)/)?.[1] || "Latest";
  }

  return { browser, version, os };
}

// ─── Traffic Source & Attribution Detection ──────────────────────────────────

export interface TrafficAttribution {
  traffic_source: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  referrer_url: string;
}

export function getTrafficAttribution(): TrafficAttribution {
  if (!isBrowser()) {
    return {
      traffic_source: "(direct)",
      utm_source: "(direct)",
      utm_medium: "(none)",
      utm_campaign: "(none)",
      utm_term: "(none)",
      utm_content: "(none)",
      referrer_url: "(direct_entry)",
    };
  }

  const params = new URLSearchParams(window.location.search);
  const utm_source = params.get("utm_source") || "";
  const utm_medium = params.get("utm_medium") || "(none)";
  const utm_campaign = params.get("utm_campaign") || "(none)";
  const utm_term = params.get("utm_term") || "(none)";
  const utm_content = params.get("utm_content") || "(none)";

  const referrer = document.referrer || "";
  let traffic_source = "(direct)";

  if (utm_source) {
    traffic_source = `Campaign: ${utm_source}`;
  } else if (referrer) {
    const refLower = referrer.toLowerCase();
    if (/google|bing|yahoo|duckduckgo|ecosia|baidu|yandex/.test(refLower)) {
      traffic_source = "Organic Search";
    } else if (/facebook|instagram|linkedin|twitter|t\.co|x\.com|youtube|pinterest|threads/.test(refLower)) {
      traffic_source = "Social Media";
    } else if (!referrer.includes(window.location.hostname)) {
      try {
        const refHost = new URL(referrer).hostname;
        traffic_source = `Referral: ${refHost}`;
      } catch {
        traffic_source = "Referral";
      }
    }
  }

  return {
    traffic_source: traffic_source || "(direct)",
    utm_source: utm_source || "(direct)",
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
    referrer_url: referrer || "(direct_entry)",
  };
}

// ─── Session & Visitor IDs ────────────────────────────────────────────────────

export function getVisitorId(): string {
  if (!isBrowser()) return "vis_server";
  try {
    let vid = localStorage.getItem("apnacare_vid");
    if (!vid) {
      vid = "vis_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 7);
      localStorage.setItem("apnacare_vid", vid);
    }
    return vid;
  } catch {
    return "vis_" + Math.random().toString(36).substring(2, 9);
  }
}

export function getSessionId(): string {
  if (!isBrowser()) return "ses_server";
  try {
    let sid = sessionStorage.getItem("apnacare_sid");
    if (!sid) {
      sid = "ses_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 7);
      sessionStorage.setItem("apnacare_sid", sid);
      sessionStorage.setItem("apnacare_session_start_time", Date.now().toString());
    }
    return sid;
  } catch {
    return "ses_" + Math.random().toString(36).substring(2, 9);
  }
}

export function getSessionDurationSeconds(): number {
  if (!isBrowser()) return 0;
  try {
    const startStr = sessionStorage.getItem("apnacare_session_start_time");
    if (!startStr) return 0;
    const start = parseInt(startStr, 10);
    return Math.max(0, Math.round((Date.now() - start) / 1000));
  } catch {
    return 0;
  }
}

export function isReturningVisitor(): "Yes" | "No" {
  if (!isBrowser()) return "No";
  try {
    const hasVisited = localStorage.getItem("apnacare_has_visited");
    if (!hasVisited) {
      localStorage.setItem("apnacare_has_visited", "true");
      return "No";
    }
    return "Yes";
  } catch {
    return "No";
  }
}

// ─── Google Sheets Webhook Dispatcher ─────────────────────────────────────────

// Ingest telemetry, leads, bookings or SOS alerts directly into the connected Google Sheet
export async function sendToGoogleSheet(payload: Props): Promise<boolean> {
  if (!APPS_SCRIPT_URL || !isBrowser()) return false;

  try {
    const { browser, version, os } = getBrowserInfo();
    const attribution = getTrafficAttribution();
    const vid = getVisitorId();
    const sid = getSessionId();

    const enriched: Props = {
      event_id: "evt_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      client_timestamp: new Date().toISOString(),
      visitor_id: vid,
      session_id: sid,
      user_id: vid,
      page_url: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title,
      device_type: getDeviceType(),
      browser,
      browser_version: version,
      operating_system: os,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      screen_width: window.screen?.width || 0,
      screen_height: window.screen?.height || 0,
      is_returning_visitor: isReturningVisitor(),
      session_duration_seconds: getSessionDurationSeconds(),
      ...attribution,
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

// ─── Dedicated Telemetry Senders ─────────────────────────────────────────────

export function trackSessionStart() {
  if (!isBrowser()) return;
  try {
    const sessionLogged = sessionStorage.getItem("apnacare_session_logged");
    if (sessionLogged) return;
    sessionStorage.setItem("apnacare_session_logged", "true");

    const attribution = getTrafficAttribution();
    const { browser, version, os } = getBrowserInfo();

    sendToGoogleSheet({
      event_type: "session",
      event_name: "session_start",
      ...attribution,
      browser,
      browser_version: version,
      operating_system: os,
      interaction_count: 1,
    });
  } catch {
    // ignore
  }
}

export function trackPageView(pathname?: string, timeOnPageSeconds: number = 0) {
  if (!isBrowser()) return;
  const path = pathname || window.location.pathname;
  const attribution = getTrafficAttribution();

  sendToGoogleSheet({
    event_type: "page_view",
    event_name: "page_view",
    page_path: path,
    page_title: document.title,
    page_url: window.location.href,
    time_on_page_seconds: timeOnPageSeconds,
    ...attribution,
  });
}

export function trackScrollMilestone(
  milestone: number,
  sectionName: string = "General Content",
  timeOnPageSeconds: number = 0
) {
  if (!isBrowser()) return;
  sendToGoogleSheet({
    event_type: "scroll",
    event_name: "scroll_depth",
    scroll_percentage: milestone,
    max_scroll_depth: milestone,
    section: sectionName,
    time_on_page_seconds: timeOnPageSeconds,
  });
}

export function trackClickInteraction(details: Props) {
  if (!isBrowser()) return;
  sendToGoogleSheet({
    event_type: "click",
    event_name: "element_click",
    event_category: "CTA",
    ...details,
  });
}

// ─── Adapter & Standard Track Function ────────────────────────────────────────

const adapters: Adapter[] = [
  (event, props) => {
    if (!isBrowser()) return;
    const w = window as unknown as { dataLayer?: unknown[] };
    (w.dataLayer ||= []).push({ event, ...props });

    // Infer appropriate event_type for Google Apps Script routing if not explicitly provided
    let inferredType = (props.event_type as string) || "telemetry";
    if (!props.event_type) {
      if (event.includes("submit") || event.includes("lead") || event.includes("booking")) {
        inferredType = "lead";
      } else if (event.includes("session")) {
        inferredType = "session";
      } else if (event.includes("page")) {
        inferredType = "page_view";
      } else if (event.includes("scroll")) {
        inferredType = "scroll";
      } else if (event.includes("click") || props.event_category === "CTA") {
        inferredType = "click";
      }
    }

    sendToGoogleSheet({
      event_type: inferredType,
      event_name: event,
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

// ─── React Hook for Automatic Full-Site Telemetry ────────────────────────────

export function useAutoTelemetry(pathname: string) {
  useEffect(() => {
    if (!isBrowser()) return;

    // 1. Session start trigger (once per browser session tab)
    trackSessionStart();

    // 2. Page View trigger on navigation / route change
    const pageStartTime = Date.now();
    trackPageView(pathname, 0);

    // 3. Scroll depth milestones tracking (25%, 50%, 75%, 100%)
    const milestonesReached = new Set<number>();

    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const pct = Math.min(100, Math.round((window.scrollY / scrollHeight) * 100));

      const thresholds = [25, 50, 75, 100];
      for (const t of thresholds) {
        if (pct >= t && !milestonesReached.has(t)) {
          milestonesReached.add(t);
          const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000);

          let section = `${t}% Depth`;
          try {
            const headings = document.querySelectorAll("h1, h2, h3, section");
            for (let i = headings.length - 1; i >= 0; i--) {
              const rect = headings[i].getBoundingClientRect();
              if (rect.top <= window.innerHeight * 0.5) {
                section = (headings[i].textContent || headings[i].getAttribute("aria-label") || section).slice(0, 50).trim();
                break;
              }
            }
          } catch {
            // fallback
          }

          trackScrollMilestone(t, section, timeOnPage);
        }
      }
    }

    // 4. Delegated Click Interaction Tracking
    function handleClick(e: MouseEvent) {
      try {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        const interactive = target.closest("a, button, input[type=submit], [role=button]");
        if (!interactive) return;

        const clientX = Math.round(e.clientX);
        const clientY = Math.round(e.clientY);
        const width = window.innerWidth || 390;
        const handZone =
          width < 768
            ? clientX / width < 0.4
              ? "Left-Hand Zone"
              : clientX / width > 0.6
              ? "Right-Hand Zone"
              : "Center / Dual Zone"
            : "Desktop Pointer";

        const text = (
          interactive.textContent ||
          interactive.getAttribute("aria-label") ||
          interactive.getAttribute("title") ||
          ""
        ).slice(0, 80).trim();

        trackClickInteraction({
          element_type: interactive.tagName.toLowerCase(),
          element_id: interactive.id || "",
          element_class: (interactive.className || "").toString().slice(0, 80),
          element_text: text || "Interactive Action",
          click_position_x: clientX,
          click_position_y: clientY,
          hand_zone: handZone,
          event_label: text || "CTA Click",
        });
      } catch {
        // ignore
      }
    }

    let scrollTimeout: NodeJS.Timeout | null = null;
    function throttledScroll() {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
        handleScroll();
      }, 250);
    }

    window.addEventListener("scroll", throttledScroll, { passive: true });
    document.addEventListener("click", handleClick, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      document.removeEventListener("click", handleClick);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [pathname]);
}
