// Provider-agnostic analytics and ApnaCare Google Sheets integration.
import { useEffect } from "react";

export type Props = Record<string, unknown>;
export type Adapter = (event: string, props: Props) => void;

export const APPS_SCRIPT_URL =
  (import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL as string) ||
  "https://script.google.com/macros/s/AKfycbx6gwpPkEgsO9y0lksDo2MS4LFXna4dnv20XkC4_KJd3voXqxTCyBuwPg4g_BM896YV/exec";

export const APPS_SCRIPT_SHEET2_URL =
  (import.meta.env.VITE_GOOGLE_APPS_SCRIPT_SHEET2_URL as string) ||
  (import.meta.env.VITE_GOOGLE_APPS_SCRIPT_ANALYTICS_URL as string) ||
  "https://script.google.com/macros/s/AKfycbzXcPQUQh1SE6GW7KIQ6MS0tcXIVwRotu0M6uth-d1SvsGD89OytHgqkiYKersiyBwe/exec";

export const AIRTABLE_API_KEY =
  (import.meta.env.VITE_AIRTABLE_API_KEY as string) || "";

export const AIRTABLE_BASE_ID =
  (import.meta.env.VITE_AIRTABLE_BASE_ID as string) || "appd5rLxicUUJpImD";

export const AIRTABLE_TABLE_ID =
  (import.meta.env.VITE_AIRTABLE_TABLE_ID as string) || "tbl6DnBguLMnvIQI8";

export const CLARITY_ID =
  (import.meta.env.VITE_CLARITY_ID as string) || "yw5xnprinp";

export const JIRA_API_TOKEN =
  (import.meta.env.VITE_JIRA_API_TOKEN as string) || "";

export const JIRA_EMAIL =
  (import.meta.env.VITE_JIRA_EMAIL as string) || "divabhrati.ramco@gmail.com";

export const JIRA_DOMAIN =
  (import.meta.env.VITE_JIRA_DOMAIN as string) || "divabhratiramco.atlassian.net";

export const JIRA_PROJECT_KEY =
  (import.meta.env.VITE_JIRA_PROJECT_KEY as string) || "APNA";

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
    const now = Date.now();
    if (!sid) {
      const activeSid = localStorage.getItem("apnacare_active_sid");
      const lastActiveStr = localStorage.getItem("apnacare_last_active_ts");
      const lastActive = lastActiveStr ? parseInt(lastActiveStr, 10) : 0;
      if (activeSid && lastActive && now - lastActive < 30 * 60 * 1000) {
        sid = activeSid;
      } else {
        sid = "ses_" + now.toString(36) + "_" + Math.random().toString(36).substring(2, 7);
      }
      sessionStorage.setItem("apnacare_sid", sid);
      sessionStorage.setItem("apnacare_session_start_time", now.toString());
    }
    localStorage.setItem("apnacare_active_sid", sid);
    localStorage.setItem("apnacare_last_active_ts", now.toString());
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

    // In parallel, if this payload represents a customer lead, booking, or enquiry, forward to Airtable
    const isLead =
      Boolean(payload.customer_name || payload.name || payload.mobile || payload.phone || payload.email) ||
      ["booking", "callback", "contact", "sos", "partner", "chatbot", "lead"].includes(
        String(payload.event_type || "").toLowerCase()
      ) ||
      Boolean(payload.booking_ref || payload.enquiry_id || payload.contact_id || payload.alert_id);

    if (isLead) {
      sendToAirtable(enriched).catch((err) => {
        console.warn("Failed to dispatch lead to Airtable:", err);
      });
    }

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

// ─── Airtable CRM Dispatcher ──────────────────────────────────────────────────

/**
 * Ingests patient booking leads, callback requests, contact inquiries, and SOS alerts
 * directly into the connected Airtable CRM table (appd5rLxicUUJpImD / tbl6DnBguLMnvIQI8).
 */
export async function sendToAirtable(payload: Props): Promise<boolean> {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID || !isBrowser()) {
    return false;
  }

  try {
    const name = String(
      payload.customer_name ||
        payload.name ||
        payload.caller_name ||
        payload.contact_person ||
        payload.attendant_name ||
        ""
    ).trim();

    const phone = String(payload.mobile || payload.phone || payload.caller_phone || "").trim();
    const email = String(payload.email || "").trim();
    const service = String(
      payload.service_name ||
        payload.service ||
        payload.requested_service ||
        payload.service_id ||
        payload.subject ||
        ""
    ).trim();
    const city = String(
      payload.city || payload.location || payload.location_address || payload.state || ""
    ).trim();
    const leadType = String(
      payload.lead_type ||
        (payload.event_type === "booking"
          ? "Booking"
          : payload.event_type === "callback"
          ? "Callback"
          : payload.event_type === "sos"
          ? "Emergency SOS"
          : payload.event_type === "contact"
          ? "Contact"
          : payload.event_type === "partner"
          ? "Partner"
          : "Website Lead")
    ).trim();

    const refId = String(
      payload.booking_ref ||
        payload.enquiry_id ||
        payload.contact_id ||
        payload.alert_id ||
        payload.partner_id ||
        payload.lead_id ||
        payload.event_id ||
        ""
    ).trim();

    // Summary details string
    const detailsParts: string[] = [];
    if (payload.start_date) detailsParts.push(`Start: ${payload.start_date} ${payload.start_time || ""}`);
    if (payload.duration_days) detailsParts.push(`Duration: ${payload.duration_days} days`);
    if (payload.total_amount) detailsParts.push(`Total: ₹${payload.total_amount}`);
    if (payload.preferred_language) detailsParts.push(`Language: ${payload.preferred_language}`);
    if (payload.special_notes) detailsParts.push(`Notes: ${payload.special_notes}`);
    if (payload.message) detailsParts.push(`Message: ${payload.message}`);
    if (payload.user_query) detailsParts.push(`Query: ${payload.user_query}`);
    if (payload.recommended_action) detailsParts.push(`Action: ${payload.recommended_action}`);
    if (payload.vitals_summary) detailsParts.push(`Vitals: ${payload.vitals_summary}`);
    if (payload.shift_status) detailsParts.push(`Shift: ${payload.shift_status}`);
    if (payload.trigger_step) detailsParts.push(`Step: ${payload.trigger_step}`);

    const details = detailsParts.join(" | ");

    const fields: Record<string, string> = {
      Name: name || "Website Lead",
    };

    if (phone) fields["Phone"] = phone;
    if (email && email.includes("@")) fields["Email"] = email;
    if (service) fields["Service"] = service;
    if (city) fields["City"] = city;
    if (leadType) fields["Lead Type"] = leadType;
    if (refId) fields["Reference ID"] = refId;
    if (details) fields["Details"] = details;

    const pagePath = String(
      payload.page_path || (isBrowser() ? window.location.pathname : "/")
    ).trim();
    if (pagePath) fields["Page Path"] = pagePath;

    const ts = String(payload.client_timestamp || new Date().toISOString()).trim();
    if (ts) fields["Timestamp"] = ts;

    const env = String(
      payload.source_environment ||
        (isBrowser() && window.location.hostname.includes("localhost")
          ? "development"
          : "production")
    ).trim();
    if (env) fields["Source Environment"] = env;

    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;

    const res = await fetch(airtableUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [{ fields }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn("Airtable API returned error:", res.status, errText);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Failed to dispatch to Airtable:", err);
    return false;
  }
}

// ─── Dedicated Telemetry Senders ─────────────────────────────────────────────

// ─── Geo & Timezone Intelligence ─────────────────────────────────────────────

/** Returns timezone info from the browser's Intl API — no permission required */
export function getTimezoneIntelligence(): {
  timezone: string;
  utc_offset: string;
  language: string;
  timezone_source: string;
} {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";
  const offsetMins = new Date().getTimezoneOffset(); // minutes behind UTC
  const sign = offsetMins <= 0 ? "+" : "-";
  const abs = Math.abs(offsetMins);
  const utc_offset = `UTC${sign}${String(Math.floor(abs / 60)).padStart(2, "0")}:${String(abs % 60).padStart(2, "0")}`;
  const language = (isBrowser() ? navigator.language : "en-US") || "en-US";
  return { timezone, utc_offset, language, timezone_source: "Browser Intl API" };
}

interface GeoData {
  country: string;
  region: string;
  city: string;
  latitude: string;
  longitude: string;
  ip_identifier: string;
  ip_data_source: string;
  country_source: string;
}

const GEO_CACHE_KEY = "apnacare_geo_cache";
const GEO_CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes per session

/** Fetch geographic info via ip-api.com (free, no key required, privacy-safe).
 *  Returns truncated IP (A.B.C.xxx) and coarse city/region/country.
 *  Results are cached in sessionStorage so only one call is made per session tab.
 *  Failures are silent and return "Unavailable" for all fields. */
export async function fetchGeoIntelligence(): Promise<GeoData> {
  const unavailable: GeoData = {
    country: "Unavailable",
    region: "Unavailable",
    city: "Unavailable",
    latitude: "Unavailable",
    longitude: "Unavailable",
    ip_identifier: "Masked / Private Client",
    ip_data_source: "Service Unavailable",
    country_source: "Unavailable",
  };

  if (!isBrowser()) return unavailable;

  // Return cached value if still valid
  try {
    const cached = sessionStorage.getItem(GEO_CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as { ts: number; data: GeoData };
      if (Date.now() - parsed.ts < GEO_CACHE_TTL_MS) return parsed.data;
    }
  } catch {
    // ignore corrupt cache
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    // ip-api.com: free, no key, returns JSON with country/region/city/lat/lon/query (IP)
    // Fields limited to only what we need (minimizes data exposure)
    const resp = await fetch(
      "https://ip-api.com/json/?fields=status,country,regionName,city,lat,lon,query",
      { signal: controller.signal }
    );
    clearTimeout(timeout);

    if (!resp.ok) return unavailable;

    const json = await resp.json() as {
      status: string;
      country?: string;
      regionName?: string;
      city?: string;
      lat?: number;
      lon?: number;
      query?: string;
    };

    if (json.status !== "success") return unavailable;

    // Truncate last octet of IP for privacy: 103.45.67.89 → 103.45.67.xxx
    const rawIp = json.query || "";
    const ipParts = rawIp.split(".");
    const ip_identifier =
      ipParts.length === 4
        ? `${ipParts[0]}.${ipParts[1]}.${ipParts[2]}.xxx`
        : rawIp
        ? rawIp.substring(0, Math.ceil(rawIp.length * 0.6)) + "***"
        : "Masked / Private Client";

    const data: GeoData = {
      country: json.country || "Unavailable",
      region: json.regionName || "Unavailable",
      city: json.city || "Unavailable",
      latitude: json.lat != null ? String(Math.round(json.lat * 100) / 100) : "Unavailable",
      longitude: json.lon != null ? String(Math.round(json.lon * 100) / 100) : "Unavailable",
      ip_identifier,
      ip_data_source: "ip-api.com (Free Tier)",
      country_source: "IP-Based Geolocation (ip-api.com)",
    };

    // Cache result
    try {
      sessionStorage.setItem(GEO_CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
    } catch {
      // ignore storage errors
    }

    return data;
  } catch {
    return unavailable;
  }
}

// ─── IP Security Intelligence ────────────────────────────────────────────────

const SEC_REQ_COUNT_KEY = "apnacare_sec_req_count";
const SEC_SESSION_KEY = "apnacare_sec_logged";

/** Count page requests within this session (used for velocity detection) */
function incrementSessionRequestCount(): number {
  if (!isBrowser()) return 1;
  try {
    const current = parseInt(sessionStorage.getItem(SEC_REQ_COUNT_KEY) || "0", 10);
    const next = current + 1;
    sessionStorage.setItem(SEC_REQ_COUNT_KEY, String(next));
    return next;
  } catch {
    return 1;
  }
}

export interface SecuritySignalResult {
  security_signal: string;
  risk_level: "Low" | "Medium" | "High";
  detection_reason: string;
  action_taken: string;
  request_count: number;
}

/** Evaluate passive security signals available to client-side JS */
export function getSecuritySignals(): SecuritySignalResult {
  const reqCount = incrementSessionRequestCount();
  let signal = "Standard Traffic Signal";
  let risk: "Low" | "Medium" | "High" = "Low";
  let reason = "Normal authenticated session entry";
  const action = "Allowed";

  if (!isBrowser()) {
    return { security_signal: signal, risk_level: risk, detection_reason: reason, action_taken: action, request_count: reqCount };
  }

  const ua = navigator.userAgent || "";

  // Detect headless / automation signals
  const isHeadless =
    (typeof (navigator as Record<string, unknown>).webdriver === "boolean" && (navigator as Record<string, unknown>).webdriver === true) ||
    /HeadlessChrome|Puppeteer|Playwright|Selenium/i.test(ua);

  if (isHeadless) {
    signal = "Automation / Headless Browser Detected";
    risk = "Medium";
    reason = "navigator.webdriver=true or known automation UA string";
  } else if (reqCount > 80) {
    signal = "High Request Velocity";
    risk = "High";
    reason = `${reqCount} requests in single session — possible scraper or stress test`;
  } else if (reqCount > 40) {
    signal = "Elevated Request Velocity";
    risk = "Medium";
    reason = `${reqCount} requests in single session — above normal browsing rate`;
  } else if (!ua || ua.length < 20) {
    signal = "Suspicious User-Agent";
    risk = "Medium";
    reason = "Empty or unusually short User-Agent string";
  }

  return { security_signal: signal, risk_level: risk, detection_reason: reason, action_taken: action, request_count: reqCount };
}

/** Emit a dedicated security_signal event to the IP_Security_Intelligence sheet */
export async function trackSecuritySignal(
  signal?: string,
  risk?: "Low" | "Medium" | "High",
  reason?: string,
  action?: string
): Promise<void> {
  if (!isBrowser()) return;
  try {
    const base = getSecuritySignals();
    const { browser, version: _v, os } = getBrowserInfo();
    const attribution = getTrafficAttribution();

    await sendToGoogleSheet({
      event_type: "security_signal",
      event_name: "security_signal",
      security_signal: signal || base.security_signal,
      risk_level: risk || base.risk_level,
      detection_reason: reason || base.detection_reason,
      action_taken: action || base.action_taken,
      request_count: base.request_count,
      user_agent: isBrowser() ? navigator.userAgent : "",
      request_path: window.location.pathname,
      operating_system: os,
      browser,
      ...attribution,
    });
  } catch {
    // failures must never reach the user
  }
}

export function trackSessionStart() {
  if (!isBrowser()) return;
  try {
    const sessionLogged = sessionStorage.getItem("apnacare_session_logged");
    if (sessionLogged) return;
    sessionStorage.setItem("apnacare_session_logged", "true");

    const attribution = getTrafficAttribution();
    const { browser, version, os } = getBrowserInfo();
    const tzInfo = getTimezoneIntelligence();

    // 1. Standard session_start → Visitor_Sessions
    sendToGoogleSheet({
      event_type: "session",
      event_name: "session_start",
      ...attribution,
      browser,
      browser_version: version,
      operating_system: os,
      timezone: tzInfo.timezone,
      interaction_count: 1,
    });

    // 2. Geo/Timezone event — fires async, never blocks
    fetchGeoIntelligence()
      .then((geo) => {
        // Guard: only log once per session
        const geoLogged = sessionStorage.getItem("apnacare_geo_logged");
        if (geoLogged) return;
        sessionStorage.setItem("apnacare_geo_logged", "true");

        return sendToGoogleSheet({
          event_type: "geo_timezone",
          event_name: "geo_timezone",
          country: geo.country,
          region: geo.region,
          city: geo.city,
          timezone: tzInfo.timezone,
          utc_offset: tzInfo.utc_offset,
          latitude: geo.latitude,
          longitude: geo.longitude,
          language: tzInfo.language,
          ip_identifier: geo.ip_identifier,
          ip_data_source: geo.ip_data_source,
          country_source: geo.country_source,
          timezone_source: tzInfo.timezone_source,
          ...attribution,
        });
      })
      .catch(() => {});

    // 3. Security signal snapshot — fires async, never blocks
    setTimeout(() => {
      try {
        const secLogged = sessionStorage.getItem(SEC_SESSION_KEY);
        if (secLogged) return;
        sessionStorage.setItem(SEC_SESSION_KEY, "true");

        const sec = getSecuritySignals();
        // Only write to IP_Security_Intelligence for Medium/High risk or automation
        if (sec.risk_level !== "Low") {
          trackSecuritySignal(sec.security_signal, sec.risk_level, sec.detection_reason, sec.action_taken).catch(() => {});
        }
      } catch {
        // ignore
      }
    }, 1200);

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
  // Microsoft Clarity custom events & dimension tag sync
  (event, props) => {
    if (typeof window === "undefined") return;
    const clarity = (window as unknown as { clarity?: (...args: unknown[]) => void }).clarity;
    if (typeof clarity === "function") {
      try {
        clarity("event", event);
        if (props.service_name || props.service) {
          clarity("set", "service", String(props.service_name || props.service));
        }
        if (props.city) {
          clarity("set", "city", String(props.city));
        }
        if (props.lead_type) {
          clarity("set", "lead_type", String(props.lead_type));
        }
      } catch {
        /* ignore */
      }
    }
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
