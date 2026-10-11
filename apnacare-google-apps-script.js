/**
 * =========================================================================================
 * APNACARE — DIGITAL PRESENCE, TELEMETRY & AUTOMATED CARE OPERATIONS ENGINE
 * =========================================================================================
 * Application: ApnaCare — Trusted Women Attendants & Healthcare Companions
 * Production Website: https://apna-care.vercel.app/
 *
 * Dedicated Multi-Tab Routing Engine:
 * 1.  Live_Traffic_Events: Ingests all raw 56-column telemetry events.
 * 2.  Booking_Leads: Complete 6-step customer booking reservations.
 * 3.  Callback_Enquiries: Quick inbound callback and service enquiries.
 * 4.  Contact_Submissions: General inquiries, complaints & regional office messages.
 * 5.  Partner_Applications: Healthcare, hospital, NGO & corporate partner registrations.
 * 6.  Chatbot_Leads: Contextual AI Care Assistant conversations & requested services.
 * 7.  SOS_Emergency_Alerts: High-priority 24/7 command center triggers & simulations.
 * 8.  Attendant_Portal_Logs: Attendant sign-in, shift check-ins, vitals logging.
 * 9.  Lead_Management: Master consolidated directory of all inbound leads.
 * 10. Visitor_Sessions: Device, browser, and user session lifecycles.
 * 11. Page_Performance: Load times, page dwell, and bounce metrics.
 * 12. Click_Interactions: Element clicks, coordinates & Left-vs-Right Hand zones.
 * 13. Scroll_Engagement: Depth milestones (25%, 50%, 75%, 100%) & section engagement.
 * 14. Form_Interactions: Step-by-step funnel drop-offs.
 * 15. Conversion_Events: Completed bookings, callback submissions & phone calls.
 * 16. Traffic_Sources: Referrers, direct entries, and marketing campaign attribution.
 * 17. 📅 Daily_Summary, Weekly_Summary, Monthly_Summary: Auto-aggregated analytics.
 * =========================================================================================
 */

var CONFIG = {
  SPREADSHEET_ID: "1W3qIeqYaQQ5qt02x6JKjy7VcQPRRMaw0cHvePg1Vu7A", // Optional if script is bound directly to the sheet
  SYSTEM_NAME: "ApnaCare Digital Operations",
  DEFAULT_ENVIRONMENT: "production",
  TIMEZONE: "Asia/Kolkata",
  WEBSITE_URL: "https://apna-care.vercel.app",
  SUPPORT_PHONE: "+91 8825493949",
  WHATSAPP_NUMBER: "918825493949",
  BRAND_COLOR: "#047857",     // Deep Emerald
  BRAND_SECONDARY: "#064e3b",
  ACCENT_COLOR: "#c2410c"     // Terracotta
};

var EMAIL_CONFIG = {
  name: "ApnaCare Operations Desk",
  companyName: "ApnaCare",
  website: "https://apna-care.vercel.app",
  replyTo: "divabhrati.ramco@gmail.com",
  adminEmail: "divabhrati.ramco@gmail.com",

  // Operations team alert recipients for inbound bookings & leads
  leadEmails: [
    "divabhrati.ramco@gmail.com",
    "divabhrati.ramco@gmail.com"
  ],

  // Executive digest recipients (Daily/Weekly/Monthly)
  reportEmails: [
    "divabhrati.ramco@gmail.com",
    "divabhrati.ramco@gmail.com"
  ],

  // Emergency SOS escalation recipients
  emergencyEmails: [
    "divabhrati.ramco@gmail.com",
    "divabhrati.ramco@gmail.com"
  ]
};

// =========================================================================================
// TAB SCHEMAS (Headers for all 18 tabs)
// =========================================================================================
var TAB_HEADERS = {
  Live_Traffic_Events: [
    "received_at", "event_id", "event_type", "event_name", "visitor_id", "session_id",
    "client_timestamp", "user_id", "page_url", "page_path", "page_title", "previous_page",
    "referrer_url", "traffic_source", "utm_source", "utm_medium", "utm_campaign", "utm_term",
    "utm_content", "device_type", "browser", "browser_version", "operating_system",
    "screen_width", "screen_height", "viewport_width", "viewport_height", "language",
    "timezone", "network_type", "event_category", "event_action", "event_label", "section",
    "element_type", "element_id", "element_class", "element_text", "click_position_x",
    "click_position_y", "hand_zone", "scroll_percentage", "max_scroll_depth", "time_on_page_seconds",
    "session_duration_seconds", "interaction_count", "tab_visibility_status", "form_name",
    "form_id", "form_field_name", "form_status", "conversion_name", "conversion_value",
    "source_environment", "event_data_json"
  ],

  Booking_Leads: [
    "received_at", "booking_ref", "visitor_id", "session_id", "customer_name", "mobile", "email",
    "service_id", "service_name", "city", "location_address", "start_date", "start_time",
    "duration_days", "preferred_language", "special_notes", "promo_code", "base_price",
    "discount", "gst", "total_amount", "booking_status", "follow_up_status", "lead_source",
    "page_path", "source_environment"
  ],

  Callback_Enquiries: [
    "received_at", "enquiry_id", "visitor_id", "session_id", "name", "phone", "service",
    "message", "page_path", "lead_source", "lead_status", "follow_up_status", "source_environment"
  ],

  Contact_Submissions: [
    "received_at", "contact_id", "visitor_id", "session_id", "name", "phone", "email", "city",
    "subject", "message", "page_path", "lead_source", "lead_status", "follow_up_status",
    "source_environment"
  ],

  Partner_Applications: [
    "received_at", "partner_id", "visitor_id", "session_id", "org_name", "org_type",
    "contact_person", "email", "phone", "website", "state", "city", "members_count",
    "category", "interest_notes", "page_path", "lead_source", "lead_status", "source_environment"
  ],

  Chatbot_Leads: [
    "received_at", "lead_id", "visitor_id", "session_id", "name", "email", "phone",
    "requested_service", "city", "page_context_badge", "user_query", "recommended_action",
    "conversation_notes", "page_path", "lead_source", "lead_status", "source_environment"
  ],

  SOS_Emergency_Alerts: [
    "received_at", "alert_id", "visitor_id", "session_id", "alert_type", "trigger_step",
    "caller_name", "caller_phone", "location", "city", "service_context", "status",
    "operator_notes", "response_time_sec", "source_environment"
  ],

  Attendant_Portal_Logs: [
    "received_at", "log_id", "attendant_id", "attendant_name", "mobile", "role", "city",
    "action_type", "shift_status", "patient_name", "vitals_summary", "notes", "source_environment"
  ],

  Lead_Management: [
    "received_at", "lead_id", "lead_type", "visitor_id", "session_id", "name", "phone", "email",
    "service_or_requirement", "city", "lead_source", "form_name", "lead_status", "follow_up_status",
    "total_value", "source_environment"
  ],

  Visitor_Sessions: [
    "received_at", "event_id", "visitor_id", "session_id", "event_type", "client_timestamp",
    "page_url", "page_path", "referrer_url", "traffic_source", "device_type", "browser",
    "operating_system", "session_duration_seconds", "interaction_count",
    "is_returning_visitor", "source_environment"
  ],

  Page_Performance: [
    "received_at", "event_id", "visitor_id", "session_id", "page_url", "page_path",
    "page_title", "event_type", "time_on_page_seconds", "scroll_percentage",
    "max_scroll_depth", "traffic_source", "device_type", "source_environment"
  ],

  Click_Interactions: [
    "received_at", "event_id", "visitor_id", "session_id", "page_url", "page_path",
    "device_type", "element_type", "element_id", "element_class", "element_text",
    "click_position_x", "click_position_y", "hand_zone", "section", "event_label"
  ],

  Scroll_Engagement: [
    "received_at", "event_id", "visitor_id", "session_id", "page_url", "page_path",
    "device_type", "scroll_percentage", "max_scroll_depth", "time_on_page_seconds", "section"
  ],

  Form_Interactions: [
    "received_at", "event_id", "visitor_id", "session_id", "page_url", "page_path",
    "form_name", "form_id", "form_field_name", "form_status", "event_type"
  ],

  Conversion_Events: [
    "received_at", "event_id", "visitor_id", "session_id", "conversion_name",
    "conversion_value", "page_url", "traffic_source", "utm_source", "utm_medium",
    "utm_campaign", "source_environment"
  ],

  Traffic_Sources: [
    "received_at", "event_id", "visitor_id", "session_id", "page_url", "referrer_url",
    "traffic_source", "utm_source", "utm_medium", "utm_campaign", "utm_term"
  ],

  Daily_Summary: [
    "Date", "Total_Events", "Unique_Visitors", "Page_Views", "Bookings",
    "Callbacks", "Contacts", "Partner_Leads", "Chatbot_Leads", "Total_Leads",
    "Conversion_Rate", "Avg_Engagement_Sec"
  ],

  Weekly_Summary: [
    "Week_Start", "Total_Events", "Unique_Visitors", "Page_Views", "Bookings",
    "Callbacks", "Contacts", "Partner_Leads", "Chatbot_Leads", "Total_Leads",
    "Conversion_Rate", "Avg_Engagement_Sec"
  ],

  Monthly_Summary: [
    "Month", "Total_Events", "Unique_Visitors", "Page_Views", "Bookings",
    "Callbacks", "Contacts", "Partner_Leads", "Chatbot_Leads", "Total_Leads",
    "Conversion_Rate", "Avg_Engagement_Sec"
  ]
};

// =========================================================================================
// SPREADSHEET INITIALIZATION & CONNECTION
// =========================================================================================
function getSpreadsheet() {
  try {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (e) { }

  if (CONFIG.SPREADSHEET_ID && !CONFIG.SPREADSHEET_ID.includes("PASTE_")) {
    try {
      return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    } catch (e) {
      console.warn("Could not open spreadsheet by ID: " + e.toString());
    }
  }
  return null;
}

function getTab(ss, tabName) {
  if (!ss) ss = getSpreadsheet();
  if (!ss) return null;

  var sheet = ss.getSheetByName(tabName);
  var headers = (TAB_HEADERS && TAB_HEADERS[tabName]) ? TAB_HEADERS[tabName] : [];

  if (!sheet) {
    sheet = ss.insertSheet(tabName);
    if (headers.length > 0) {
      sheet.getRange(1, 1, 1, headers.length)
        .setValues([headers])
        .setFontWeight("bold")
        .setBackground(CONFIG.BRAND_SECONDARY || "#064e3b")
        .setFontColor("#ffffff")
        .setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }
  } else if (sheet.getLastRow() === 0 && headers.length > 0) {
    sheet.getRange(1, 1, 1, headers.length)
      .setValues([headers])
      .setFontWeight("bold")
      .setBackground(CONFIG.BRAND_SECONDARY || "#064e3b")
      .setFontColor("#ffffff")
      .setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// =========================================================================================
// MAIN WEBHOOK ENTRYPOINTS (doPost & doGet)
// =========================================================================================
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    system: CONFIG.SYSTEM_NAME,
    timestamp: normalizeTimestamp(new Date()),
    version: "2.0.0"
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  // Test payload fallback for safe execution from the Apps Script toolbar
  if (!e || !e.postData || !e.postData.contents) {
    e = {
      postData: {
        contents: JSON.stringify({
          event_type: "lead",
          event_name: "booking_submitted",
          lead_type: "BOOKING",
          form_name: "6-Step Booking Form",
          name: "Lakshmi Narayanan",
          mobile: "9876543210",
          email: "divabhrati.ramco@gmail.com",
          serviceId: "elderly-care",
          service_name: "Elderly Care & Home Companionship",
          city: "Bengaluru",
          location: "Indiranagar 100ft Road",
          date: "2026-10-15",
          time: "08:00 AM",
          duration: 30,
          preferredLanguage: "Tamil / English",
          notes: "Need compassionate female attendant for bedridden mother.",
          total_amount: 38970,
          page_path: "/booking"
        })
      }
    };
  }

  try {
    var rawPayload = JSON.parse(e.postData.contents);
    var ss = getSpreadsheet();
    if (!ss) {
      return ContentService.createTextOutput("Error: Spreadsheet inaccessible").setMimeType(ContentService.MimeType.TEXT);
    }

    var receivedAt = normalizeTimestamp(new Date());
    var p = enrichPayload(rawPayload, receivedAt);

    // 1. Append to Master Firehose (Live_Traffic_Events)
    appendRowToTab(ss, "Live_Traffic_Events", p);

    // 2. Specialized Multi-Tab Routing
    var evtName = String(p.event_name || "").toLowerCase();
    var formName = String(p.form_name || "").toLowerCase();
    var leadType = String(p.lead_type || "").toUpperCase();

    // A. BOOKING SUBMISSION (6-Step flow)
    if (leadType === "BOOKING" || evtName.includes("booking_submit") || formName.includes("booking") || (p.serviceId && p.date && p.mobile)) {
      p.lead_type = "BOOKING";
      p.booking_ref = p.booking_ref || p.ref || ("AC-" + Date.now().toString(36).toUpperCase().slice(-6));
      p.lead_id = p.booking_ref;
      p.customer_name = p.name || p.customer_name || "";
      p.service_name = p.service_name || p.service || p.serviceId || "";
      p.location_address = p.location || p.address || p.location_address || "";
      p.start_date = p.date || p.start_date || "";
      p.start_time = p.time || p.start_time || "";
      p.duration_days = p.duration || p.duration_days || 1;
      p.special_notes = p.notes || p.special_notes || "";
      p.booking_status = p.booking_status || "Confirmed";
      p.follow_up_status = p.follow_up_status || "Coordinator Assigned";

      appendRowToTab(ss, "Booking_Leads", p);
      appendRowToTab(ss, "Lead_Management", p);
      sendBookingAlertEmail(p);
    }

    // B. QUICK CALLBACK ENQUIRY
    else if (leadType === "CALLBACK" || evtName.includes("enquiry_form") || formName.includes("callback") || formName.includes("enquiry")) {
      p.lead_type = "CALLBACK";
      p.enquiry_id = p.enquiry_id || ("ENQ-" + Date.now().toString(36).toUpperCase());
      p.lead_id = p.enquiry_id;
      p.service = p.service || p.serviceId || "General";
      p.lead_status = p.lead_status || "New";
      p.follow_up_status = p.follow_up_status || "Callback Due (<2 hrs)";

      appendRowToTab(ss, "Callback_Enquiries", p);
      appendRowToTab(ss, "Lead_Management", p);
      sendCallbackAlertEmail(p);
    }

    // C. CONTACT FORM MESSAGE
    else if (leadType === "CONTACT" || evtName.includes("contact_form") || formName.includes("contact")) {
      p.lead_type = "CONTACT";
      p.contact_id = p.contact_id || ("CNT-" + Date.now().toString(36).toUpperCase());
      p.lead_id = p.contact_id;
      p.subject = p.subject || "General Enquiry";
      p.lead_status = p.lead_status || "New";
      p.follow_up_status = p.follow_up_status || "Pending";

      appendRowToTab(ss, "Contact_Submissions", p);
      appendRowToTab(ss, "Lead_Management", p);
      sendContactAlertEmail(p);
    }

    // D. ECOSYSTEM PARTNER REGISTRATION
    else if (leadType === "PARTNER" || evtName.includes("partner_form") || formName.includes("partner")) {
      p.lead_type = "PARTNER";
      p.partner_id = p.partner_id || ("PTR-" + Date.now().toString(36).toUpperCase());
      p.lead_id = p.partner_id;
      p.contact_person = p.contact || p.contact_person || p.name || "";
      p.lead_status = p.lead_status || "Under Review";

      appendRowToTab(ss, "Partner_Applications", p);
      appendRowToTab(ss, "Lead_Management", p);
      sendPartnerAlertEmail(p);
    }

    // E. CHATBOT / AI CARE ASSISTANT LEAD
    else if (leadType === "CHATBOT" || evtName.includes("assistant_") || formName.includes("chat") || formName.includes("assistant")) {
      p.lead_type = "CHATBOT";
      p.lead_id = p.lead_id || ("CHAT-" + Date.now().toString(36).toUpperCase());
      p.requested_service = p.requested_service || p.service || p.context || "";
      p.page_context_badge = p.context_badge || p.badge || p.page_context || "";
      p.lead_status = p.lead_status || "Bot Inquired";

      appendRowToTab(ss, "Chatbot_Leads", p);
      if (p.phone || (p.email && p.email.includes("@"))) {
        appendRowToTab(ss, "Lead_Management", p);
      }
    }

    // F. EMERGENCY SOS TRIGGER
    else if (evtName.includes("sos") || p.alert_type) {
      p.alert_id = p.alert_id || ("SOS-" + Date.now().toString(36).toUpperCase());
      p.alert_type = p.alert_type || (evtName.includes("demo") ? "Simulation Demo" : "Live SOS Trigger");
      p.status = p.status || "Escalated to Control Room";
      p.operator_notes = p.operator_notes || "Immediate protocol active";

      appendRowToTab(ss, "SOS_Emergency_Alerts", p);
      sendSOSAlertEmail(p);
    }

    // G. ATTENDANT PORTAL ACTIONS
    else if (formName.includes("attendant") || p.action_type || evtName.includes("attendant_")) {
      p.log_id = p.log_id || ("ATT-" + Date.now().toString(36).toUpperCase());
      appendRowToTab(ss, "Attendant_Portal_Logs", p);
    }

    // 3. Auxiliary Telemetry Routing
    if (p.event_type === "session" || evtName === "session_start" || evtName === "session_end") {
      appendRowToTab(ss, "Visitor_Sessions", p);
    }

    if (p.event_type === "page_view" || evtName === "page_view") {
      appendRowToTab(ss, "Page_Performance", p);
      appendRowToTab(ss, "Traffic_Sources", p);
    }

    if (p.event_type === "click" || evtName.includes("click") || p.event_category === "CTA") {
      appendRowToTab(ss, "Click_Interactions", p);
    }

    if (p.event_type === "scroll" || p.scroll_percentage > 0) {
      appendRowToTab(ss, "Scroll_Engagement", p);
    }

    if (p.event_type === "form" || /form/.test(evtName) || p.form_status === "submitted" || p.form_status === "in_progress") {
      appendRowToTab(ss, "Form_Interactions", p);
    }

    if (p.event_type === "conversion" || p.conversion_name !== "(none)" || evtName.includes("success")) {
      appendRowToTab(ss, "Conversion_Events", p);
    }

    return ContentService.createTextOutput("OK: ApnaCare Event Logged & Routed").setMimeType(ContentService.MimeType.TEXT);

  } catch (err) {
    console.error("doPost error:", err.toString());
    return ContentService.createTextOutput("Error: " + err.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}

// =========================================================================================
// ENRICHMENT & HANDEDNESS TELEMETRY ENGINE
// =========================================================================================
function enrichPayload(raw, receivedAt) {
  var p = raw || {};
  var now = new Date();
  var ts = p.client_timestamp || p.timestamp || now.toISOString();

  p.received_at = receivedAt || normalizeTimestamp(now);
  p.event_id = p.event_id || ("evt_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7));
  p.event_type = (p.event_type || p.type || "page_view").toLowerCase();
  p.event_name = p.event_name || p.event_action || "page_view";
  p.visitor_id = p.visitor_id || p.visitorId || ("vis_" + Math.random().toString(36).substring(2, 9));
  p.session_id = p.session_id || p.sessionId || ("ses_" + Math.random().toString(36).substring(2, 9));
  p.user_id = p.user_id || p.visitor_id;
  p.client_timestamp = ts;

  p.page_url = p.page_url || CONFIG.WEBSITE_URL;
  p.page_path = p.page_path || normalizeRoutePath(p.page_url);
  p.page_title = p.page_title || "ApnaCare — Trusted Women Attendants";
  p.previous_page = p.previous_page || "(direct_entry)";
  p.referrer_url = p.referrer_url || "(direct_entry)";

  p.traffic_source = p.traffic_source || "(direct)";
  p.utm_source = p.utm_source || "(direct)";
  p.utm_medium = p.utm_medium || "(none)";
  p.utm_campaign = p.utm_campaign || "(none)";
  p.utm_term = p.utm_term || "(none)";
  p.utm_content = p.utm_content || "(none)";

  p.device_type = p.device_type || "Desktop";
  p.browser = p.browser || "Chrome";
  p.browser_version = p.browser_version || "Latest";
  p.operating_system = p.operating_system || "Windows";
  p.screen_width = Number(p.screen_width) || 1920;
  p.screen_height = Number(p.screen_height) || 1080;
  p.viewport_width = Number(p.viewport_width) || 1280;
  p.viewport_height = Number(p.viewport_height) || 800;

  // Handedness / Thumb-Reach Ergonomics Detection for Mobile
  var posX = Number(p.click_position_x) || 0;
  if (!p.hand_zone) {
    if (p.device_type === "Mobile" || p.device_type === "Tablet" || p.viewport_width < 768) {
      var ratio = posX / (p.viewport_width || 390);
      if (ratio < 0.40) {
        p.hand_zone = "Left-Hand Zone";
      } else if (ratio > 0.60) {
        p.hand_zone = "Right-Hand Zone";
      } else {
        p.hand_zone = "Center / Dual Zone";
      }
    } else {
      p.hand_zone = "Desktop Pointer";
    }
  }

  p.scroll_percentage = Number(p.scroll_percentage) || 0;
  p.max_scroll_depth = Number(p.max_scroll_depth) || p.scroll_percentage;
  p.time_on_page_seconds = Number(p.time_on_page_seconds) || 15;
  p.session_duration_seconds = Number(p.session_duration_seconds) || p.time_on_page_seconds;

  p.lead_id = p.lead_id || ("lead_" + Date.now());
  p.name = p.name || p.customer_name || p.contact_person || "";
  p.phone = p.phone || p.mobile || "";
  p.email = p.email || "";
  p.city = p.city || "Bengaluru";
  p.service_or_requirement = p.service_name || p.service || p.serviceId || p.requirement || "Care Attendant";
  p.lead_source = p.lead_source || p.source || "website_inbound";
  p.lead_status = p.lead_status || "New";
  p.follow_up_status = p.follow_up_status || "Pending";
  p.source_environment = p.source_environment || CONFIG.DEFAULT_ENVIRONMENT;

  try { p.event_data_json = JSON.stringify(p); } catch (e) { p.event_data_json = "{}"; }
  return p;
}

function normalizeRoutePath(url) {
  if (!url) return "/";
  var s = String(url).replace(/^https?:\/\/[^\/]+/i, "").split("?")[0].split("#")[0].trim();
  if (!s.startsWith("/")) s = "/" + s;
  return s;
}

function normalizeTimestamp(d) {
  var dt;
  if (!d) dt = new Date();
  else if (d instanceof Date) dt = d;
  else if (typeof d === "number") dt = new Date(d);
  else if (typeof d === "string") {
    var s = d.replace(" IST", "").trim();
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(s)) s = s.replace(" ", "T");
    dt = new Date(s);
  } else dt = new Date();

  if (isNaN(dt.getTime())) dt = new Date();

  try {
    return Utilities.formatDate(dt, CONFIG.TIMEZONE || "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss") + " IST";
  } catch (err) {
    return Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss") + " IST";
  }
}

function parseDateSafe(ts) {
  if (!ts) return null;
  if (ts instanceof Date) return isNaN(ts.getTime()) ? null : ts;
  if (typeof ts === "number") {
    var dtNum = new Date(ts);
    return isNaN(dtNum.getTime()) ? null : dtNum;
  }
  var s = String(ts).replace(" IST", "").trim();
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(s)) s = s.replace(" ", "T");
  var d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

function getWeekStartDate(d) {
  var dt = parseDateSafe(d) || new Date();
  var date = new Date(dt.getTime());
  var day = date.getDay();
  var diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  return Utilities.formatDate(date, CONFIG.TIMEZONE || "Asia/Kolkata", "yyyy-MM-dd");
}

// =========================================================================================
// APPEND ROW WITH IN-TAB DEDUPLICATION
// =========================================================================================
function appendRowToTab(ss, tabName, p) {
  try {
    var sheet = getTab(ss, tabName);
    if (!sheet) return;
    var headers = (TAB_HEADERS && TAB_HEADERS[tabName]) ? TAB_HEADERS[tabName] : [];
    if (!headers.length) return;

    var lastRow = sheet.getLastRow();
    if (lastRow > 1 && p.event_id) {
      var checkRows = Math.min(60, lastRow - 1);
      var eventIdCol = headers.indexOf("event_id") + 1;
      if (eventIdCol > 0) {
        var recentIds = sheet.getRange(lastRow - checkRows + 1, eventIdCol, checkRows, 1).getValues();
        for (var i = 0; i < recentIds.length; i++) {
          if (String(recentIds[i][0]) === String(p.event_id)) {
            return;
          }
        }
      }
    }

    var row = headers.map(function (h) {
      var val = p[h];
      if (val === undefined || val === null) val = "";
      if (typeof val === "object") {
        try { val = JSON.stringify(val); } catch (e) { val = ""; }
      }
      return val;
    });

    sheet.appendRow(row);
  } catch (err) {
    console.warn("Could not append row to " + tabName + ": " + err.toString());
  }
}

// Helper: Fail-safe email dispatcher
function safeSendEmail(mailOptions) {
  try {
    MailApp.sendEmail(mailOptions);
    return true;
  } catch (err) {
    console.error("❌ Email sending failed: " + err.toString());
    return false;
  }
}

function escapeHtml(s) {
  return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function makeRow(key, val, isHighlight) {
  var bg = isHighlight ? "#ecfdf5" : "#ffffff";
  var color = isHighlight ? "#047857" : "#0f172a";
  return '<tr style="background:' + bg + ';border-bottom:1px solid #e2e8f0;">' +
    '<td style="padding:10px 14px;font-family:monospace;font-size:12px;font-weight:700;color:#64748b;width:32%;">' + escapeHtml(key) + '</td>' +
    '<td style="padding:10px 14px;font-size:13px;font-weight:' + (isHighlight ? '700' : '500') + ';color:' + color + ';">' + escapeHtml(val) + '</td>' +
    '</tr>';
}

// =========================================================================================
// 1. INSTANT BOOKING RESERVATION EMAIL ALERT
// =========================================================================================
function sendBookingAlertEmail(p) {
  var ref = p.booking_ref || p.lead_id || "AC-RESERVATION";
  var name = p.customer_name || p.name || "Valued Family";
  var service = p.service_name || p.serviceId || "Care Attendant";
  var city = p.city || "Bengaluru";
  var phone = p.mobile || p.phone || "Not provided";
  var email = p.email || "";
  var date = p.start_date || p.date || "Immediate";
  var time = p.start_time || p.time || "Flexible";
  var duration = (p.duration_days || p.duration || 1) + " Days";
  var total = p.total_amount ? ("₹" + Number(p.total_amount).toLocaleString("en-IN")) : "₹1,299";

  var html = [
    '<!DOCTYPE html><html><body style="margin:0;padding:20px;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif;">',
    '<div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #cbd5e1;box-shadow:0 10px 25px rgba(0,0,0,0.06);">',
    '  <div style="background:linear-gradient(135deg,#064e3b 0%,#047857 100%);padding:26px 24px;color:#fff;">',
    '    <span style="background:#10b981;color:#022c22;padding:4px 12px;border-radius:16px;font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">NEW APNACARE BOOKING</span>',
    '    <h1 style="margin:10px 0 4px 0;font-size:22px;font-weight:800;">' + escapeHtml(ref) + ' — ' + escapeHtml(name) + '</h1>',
    '    <p style="margin:0;color:#a7f3d0;font-size:13px;font-weight:600;">' + escapeHtml(service) + ' · ' + escapeHtml(city) + '</p>',
    '  </div>',
    '  <div style="padding:18px 24px;">',
    '    <table width="100%" style="border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">',
    makeRow("booking_ref", ref, true),
    makeRow("customer_name", name, true),
    makeRow("contact_phone", phone, true),
    makeRow("contact_email", email || "(Not provided)"),
    makeRow("service", service, true),
    makeRow("city", city),
    makeRow("address", p.location_address || p.location || "City center"),
    makeRow("schedule", date + " at " + time),
    makeRow("duration", duration),
    makeRow("language", p.preferred_language || "Tamil / English"),
    makeRow("special_notes", p.special_notes || p.notes || "None"),
    makeRow("total_amount", total, true),
    makeRow("received_at", p.received_at),
    '    </table>',
    '  </div>',
    '  <div style="background:#f8fafc;padding:16px 24px;text-align:center;border-top:1px solid #e2e8f0;">',
    phone ? '<a href="tel:' + escapeHtml(phone) + '" style="background:#047857;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:700;font-size:13px;margin:4px 6px;display:inline-block;">📞 Call Customer</a>' : '',
    '<a href="https://wa.me/' + (phone.replace(/[^0-9]/g, "")) + '" target="_blank" style="background:#16a34a;color:#fff;text-decoration:none;padding:10px 20px;border-radius:6px;font-weight:700;font-size:13px;margin:4px 6px;display:inline-block;">💬 WhatsApp Customer</a>',
    '  </div>',
    '</div></body></html>'
  ].join('');

  var recipients = EMAIL_CONFIG.leadEmails || ["operations@apnacare.in"];
  recipients.forEach(function (em) {
    safeSendEmail({
      to: em,
      subject: "⚡ [ApnaCare Booking] " + ref + " — " + name + " (" + city + ")",
      htmlBody: html,
      name: "ApnaCare Care Operations",
      replyTo: (email && email.includes("@")) ? email : EMAIL_CONFIG.replyTo
    });
  });

  // Client confirmation email
  if (email && email.includes("@")) {
    safeSendEmail({
      to: email,
      subject: "Your ApnaCare Booking is Received — Ref: " + ref,
      htmlBody: html,
      name: "ApnaCare",
      replyTo: EMAIL_CONFIG.replyTo
    });
  }
}

// =========================================================================================
// 2. QUICK CALLBACK ENQUIRY ALERT
// =========================================================================================
function sendCallbackAlertEmail(p) {
  var id = p.enquiry_id || p.lead_id || "ENQ-CALLBACK";
  var name = p.name || "Prospective Client";
  var phone = p.phone || "Not provided";
  var service = p.service || "General Attendant";

  var html = [
    '<div style="max-width:600px;margin:0 auto;font-family:sans-serif;background:#fff;border-radius:12px;border:1px solid #cbd5e1;overflow:hidden;">',
    '  <div style="background:#064e3b;padding:22px;color:#fff;">',
    '    <span style="background:#10b981;color:#022c22;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:bold;">CALLBACK REQUEST</span>',
    '    <h2 style="margin:8px 0 2px 0;">' + escapeHtml(name) + ' — ' + escapeHtml(service) + '</h2>',
    '    <p style="margin:0;color:#a7f3d0;font-size:12px;">' + escapeHtml(p.received_at) + '</p>',
    '  </div>',
    '  <div style="padding:18px;">',
    '    <table width="100%" style="border-collapse:collapse;">',
    makeRow("enquiry_id", id, true),
    makeRow("name", name, true),
    makeRow("phone", phone, true),
    makeRow("service", service, true),
    makeRow("message", p.message || "(None provided)"),
    makeRow("page_path", p.page_path || "/"),
    '    </table>',
    '    <div style="text-align:center;margin-top:16px;">',
    phone ? '<a href="tel:' + escapeHtml(phone) + '" style="background:#047857;color:#fff;text-decoration:none;padding:10px 22px;border-radius:6px;font-weight:bold;display:inline-block;">📞 Call Back Now</a>' : '',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('');

  (EMAIL_CONFIG.leadEmails || []).forEach(function (em) {
    safeSendEmail({
      to: em,
      subject: "📞 [Callback Request] " + name + " (" + phone + ") — " + service,
      htmlBody: html,
      name: "ApnaCare Quick Enquiries",
      replyTo: EMAIL_CONFIG.replyTo
    });
  });
}

// =========================================================================================
// 3. CONTACT FORM SUBMISSION ALERT
// =========================================================================================
function sendContactAlertEmail(p) {
  var name = p.name || "Website Inquirer";
  var city = p.city || "Bengaluru";
  var subject = p.subject || "General Inquiry";

  var html = [
    '<div style="max-width:600px;margin:0 auto;font-family:sans-serif;background:#fff;border-radius:12px;border:1px solid #cbd5e1;overflow:hidden;">',
    '  <div style="background:#064e3b;padding:22px;color:#fff;">',
    '    <span style="background:#10b981;color:#022c22;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:bold;">CONTACT DESK MESSAGE</span>',
    '    <h2 style="margin:8px 0 2px 0;">' + escapeHtml(subject) + ' — ' + escapeHtml(name) + '</h2>',
    '  </div>',
    '  <div style="padding:18px;">',
    '    <table width="100%" style="border-collapse:collapse;">',
    makeRow("name", name, true),
    makeRow("phone", p.phone || "N/A", true),
    makeRow("email", p.email || "N/A", true),
    makeRow("city", city),
    makeRow("subject", subject, true),
    makeRow("message", p.message || ""),
    makeRow("received_at", p.received_at),
    '    </table>',
    '  </div>',
    '</div>'
  ].join('');

  (EMAIL_CONFIG.leadEmails || []).forEach(function (em) {
    safeSendEmail({
      to: em,
      subject: "✉️ [Contact Form] " + subject + " — " + name + " (" + city + ")",
      htmlBody: html,
      name: "ApnaCare Contact Desk",
      replyTo: p.email || EMAIL_CONFIG.replyTo
    });
  });
}

// =========================================================================================
// 4. ECOSYSTEM PARTNER ALERT
// =========================================================================================
function sendPartnerAlertEmail(p) {
  var org = p.org_name || "Partner Organization";
  var type = p.org_type || "NGO / Healthcare Provider";
  var contact = p.contact_person || p.name || "Representative";

  var html = [
    '<div style="max-width:600px;margin:0 auto;font-family:sans-serif;background:#fff;border-radius:12px;border:1px solid #cbd5e1;overflow:hidden;">',
    '  <div style="background:#1e3a8a;padding:22px;color:#fff;">',
    '    <span style="background:#38bdf8;color:#082f49;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:bold;">ECOSYSTEM PARTNER INQUIRY</span>',
    '    <h2 style="margin:8px 0 2px 0;">' + escapeHtml(org) + ' (' + escapeHtml(type) + ')</h2>',
    '  </div>',
    '  <div style="padding:18px;">',
    '    <table width="100%" style="border-collapse:collapse;">',
    makeRow("organization", org, true),
    makeRow("org_type", type),
    makeRow("contact_person", contact, true),
    makeRow("phone", p.phone || "N/A", true),
    makeRow("email", p.email || "N/A", true),
    makeRow("location", (p.city || "") + ", " + (p.state || "")),
    makeRow("category", p.category || "General"),
    makeRow("members", p.members_count || "N/A"),
    makeRow("website", p.website || "N/A"),
    makeRow("received_at", p.received_at),
    '    </table>',
    '  </div>',
    '</div>'
  ].join('');

  (EMAIL_CONFIG.leadEmails || []).forEach(function (em) {
    safeSendEmail({
      to: em,
      subject: "🤝 [Ecosystem Partner] " + org + " (" + type + ") — " + contact,
      htmlBody: html,
      name: "ApnaCare Partnerships",
      replyTo: p.email || EMAIL_CONFIG.replyTo
    });
  });
}

// =========================================================================================
// 5. HIGH-PRIORITY EMERGENCY SOS ALERT
// =========================================================================================
function sendSOSAlertEmail(p) {
  var id = p.alert_id || "SOS-ALERT";
  var type = p.alert_type || "Emergency Trigger";

  var html = [
    '<div style="max-width:600px;margin:0 auto;font-family:sans-serif;background:#fff;border-radius:12px;border:2px solid #dc2626;overflow:hidden;">',
    '  <div style="background:#dc2626;padding:24px;color:#fff;">',
    '    <span style="background:#fff;color:#dc2626;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:bold;">🚨 24/7 COMMAND CENTER ALERT</span>',
    '    <h2 style="margin:8px 0 2px 0;">' + escapeHtml(type) + ' — ' + escapeHtml(id) + '</h2>',
    '    <p style="margin:0;color:#fee2e2;font-size:12px;">' + escapeHtml(p.received_at) + '</p>',
    '  </div>',
    '  <div style="padding:18px;">',
    '    <p style="font-weight:bold;color:#b91c1c;">A care emergency or simulation alert was triggered on the ApnaCare platform.</p>',
    '    <table width="100%" style="border-collapse:collapse;">',
    makeRow("alert_id", id, true),
    makeRow("alert_type", type, true),
    makeRow("city", p.city || "Bengaluru"),
    makeRow("service_context", p.service_context || "General"),
    makeRow("status", p.status || "Escalated to Control Room", true),
    '    </table>',
    '  </div>',
    '</div>'
  ].join('');

  (EMAIL_CONFIG.emergencyEmails || []).forEach(function (em) {
    safeSendEmail({
      to: em,
      subject: "🚨 [EMERGENCY SOS ALERT] " + type + " — " + id,
      htmlBody: html,
      name: "ApnaCare Command Center",
      replyTo: EMAIL_CONFIG.replyTo
    });
  });
}

// =========================================================================================
// DAILY, WEEKLY, MONTHLY INTERVAL AGGREGATION ENGINE
// =========================================================================================
function BUILD_AGGREGATED_INTERVAL_SUMMARIES() {
  var ss = getSpreadsheet();
  if (!ss) return;

  var liveSheet = ss.getSheetByName("Live_Traffic_Events");
  if (!liveSheet || liveSheet.getLastRow() < 2) {
    writeIntervalTable(ss, "Daily_Summary", {}, "Date");
    writeIntervalTable(ss, "Weekly_Summary", {}, "Week_Start");
    writeIntervalTable(ss, "Monthly_Summary", {}, "Month");
    return;
  }

  var data = liveSheet.getDataRange().getValues();
  if (!data || data.length < 2) return;

  var h = data[0];
  var findHeader = function (names) {
    for (var n = 0; n < names.length; n++) {
      var idx = h.indexOf(names[n]);
      if (idx !== -1) return idx;
    }
    return -1;
  };

  var tsCol = findHeader(["received_at", "client_timestamp"]);
  var typeCol = findHeader(["event_type", "type"]);
  var nameCol = findHeader(["event_name"]);
  var vidCol = findHeader(["visitor_id", "visitorId"]);
  var durCol = findHeader(["time_on_page_seconds", "session_duration_seconds"]);
  var formNameCol = findHeader(["form_name", "formName"]);

  var daily = {}, weekly = {}, monthly = {};

  for (var i = 1; i < data.length; i++) {
    var rawTs = tsCol > -1 ? data[i][tsCol] : null;
    var d = parseDateSafe(rawTs);
    if (!d) continue;

    var tz = CONFIG.TIMEZONE || "Asia/Kolkata";
    var dayKey = Utilities.formatDate(d, tz, "yyyy-MM-dd");
    var monthKey = Utilities.formatDate(d, tz, "yyyy-MM");
    var weekKey = getWeekStartDate(d);

    var vid = (vidCol > -1 && data[i][vidCol]) ? String(data[i][vidCol]) : ("v_" + i);
    var isPageView = typeCol > -1 ? (String(data[i][typeCol]).toLowerCase() === "page_view") : false;
    var evtName = nameCol > -1 ? String(data[i][nameCol]).toLowerCase() : "";
    var formName = formNameCol > -1 ? String(data[i][formNameCol] || "").toLowerCase() : "";
    var dur = durCol > -1 ? (Number(data[i][durCol]) || 0) : 0;

    var isBooking = evtName.includes("booking_submit") || formName.includes("booking");
    var isCallback = evtName.includes("enquiry_form") || formName.includes("callback") || formName.includes("enquiry");
    var isContact = evtName.includes("contact_form") || formName.includes("contact");
    var isPartner = evtName.includes("partner_form") || formName.includes("partner");
    var isChatbot = evtName.includes("assistant_") || formName.includes("assistant");
    var isLead = isBooking || isCallback || isContact || isPartner || isChatbot;

    accumulateApnaCareMetrics(daily, dayKey, vid, isPageView, isBooking, isCallback, isContact, isPartner, isChatbot, isLead, dur);
    accumulateApnaCareMetrics(weekly, weekKey, vid, isPageView, isBooking, isCallback, isContact, isPartner, isChatbot, isLead, dur);
    accumulateApnaCareMetrics(monthly, monthKey, vid, isPageView, isBooking, isCallback, isContact, isPartner, isChatbot, isLead, dur);
  }

  writeIntervalTable(ss, "Daily_Summary", daily, "Date");
  writeIntervalTable(ss, "Weekly_Summary", weekly, "Week_Start");
  writeIntervalTable(ss, "Monthly_Summary", monthly, "Month");
  console.log("✅ Daily, Weekly & Monthly Summaries Calculated.");
}

function accumulateApnaCareMetrics(bucket, key, vid, isPv, isB, isCb, isCt, isP, isCh, isL, dur) {
  if (!bucket || !key) return;
  if (!bucket[key]) {
    bucket[key] = {
      events: 0,
      visitors: new Set(),
      pvs: 0,
      bookings: 0,
      callbacks: 0,
      contacts: 0,
      partners: 0,
      chatbots: 0,
      leads: 0,
      totalDur: 0,
      timedEvents: 0
    };
  }

  bucket[key].events++;
  if (vid) bucket[key].visitors.add(vid);
  if (isPv) bucket[key].pvs++;
  if (isB) bucket[key].bookings++;
  if (isCb) bucket[key].callbacks++;
  if (isCt) bucket[key].contacts++;
  if (isP) bucket[key].partners++;
  if (isCh) bucket[key].chatbots++;
  if (isL) bucket[key].leads++;
  if (dur > 0) {
    bucket[key].totalDur += dur;
    bucket[key].timedEvents++;
  }
}

function writeIntervalTable(ss, tabName, bucket, label) {
  if (!ss || !bucket) return;
  var sh = getTab(ss, tabName);
  if (!sh) return;

  var headers = TAB_HEADERS[tabName] || [
    label || "Period", "Total_Events", "Unique_Visitors", "Page_Views", "Bookings",
    "Callbacks", "Contacts", "Partner_Leads", "Chatbot_Leads", "Total_Leads",
    "Conversion_Rate", "Avg_Engagement_Sec"
  ];

  try { sh.clearContents(); } catch (e) { }

  sh.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setFontWeight("bold")
    .setBackground(CONFIG.BRAND_SECONDARY || "#064e3b")
    .setFontColor("#ffffff")
    .setHorizontalAlignment("center");
  sh.setFrozenRows(1);

  var keys = Object.keys(bucket).sort().reverse();
  var rows = [];

  for (var i = 0; i < keys.length; i++) {
    var b = bucket[keys[i]];
    if (!b) continue;
    var uCount = b.visitors ? (b.visitors.size || 0) : 0;
    var convRate = uCount > 0 ? ((b.leads / uCount) * 100).toFixed(1) + "%" : "0.0%";
    var avgSec = b.timedEvents > 0 ? Math.round(b.totalDur / b.timedEvents) : 0;

    rows.push([
      keys[i],
      b.events || 0,
      uCount,
      b.pvs || 0,
      b.bookings || 0,
      b.callbacks || 0,
      b.contacts || 0,
      b.partners || 0,
      b.chatbots || 0,
      b.leads || 0,
      convRate,
      avgSec
    ]);
  }

  if (rows.length > 0) {
    sh.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
}

// =========================================================================================
// EXECUTIVE REPORTS DISPATCH (DAILY, WEEKLY, MONTHLY)
// =========================================================================================
function sendPeriodicExecutiveDigest(intervalName) {
  var ss = getSpreadsheet();
  if (!ss) return;
  BUILD_AGGREGATED_INTERVAL_SUMMARIES();

  var tabMap = { Daily: "Daily_Summary", Weekly: "Weekly_Summary", Monthly: "Monthly_Summary" };
  var sheet = ss.getSheetByName(tabMap[intervalName]);
  if (!sheet || sheet.getLastRow() < 2) return;

  var topRow = sheet.getRange(2, 1, 1, 12).getValues()[0];
  var period = topRow[0] || "N/A";
  var events = topRow[1] || 0;
  var visitors = topRow[2] || 0;
  var pageViews = topRow[3] || 0;
  var bookings = topRow[4] || 0;
  var callbacks = topRow[5] || 0;
  var contacts = topRow[6] || 0;
  var partners = topRow[7] || 0;
  var chatbots = topRow[8] || 0;
  var totalLeads = topRow[9] || 0;
  var convRate = topRow[10] || "0%";
  var avgSec = topRow[11] || 0;

  var themeColor = intervalName === "Daily" ? "#047857" : (intervalName === "Weekly" ? "#0284c7" : "#7c3aed");

  var html = [
    '<div style="max-width:620px;margin:0 auto;font-family:sans-serif;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">',
    '  <div style="background:linear-gradient(135deg,' + themeColor + ' 0%,#064e3b 100%);padding:26px;color:#fff;">',
    '    <span style="background:rgba(255,255,255,0.2);color:#fff;padding:3px 10px;border-radius:10px;font-size:11px;font-weight:bold;">' + intervalName.toUpperCase() + ' CARE INTELLIGENCE</span>',
    '    <h2 style="margin:10px 0 2px 0;font-size:22px;">ApnaCare Executive Digest — ' + period + '</h2>',
    '  </div>',
    '  <div style="padding:20px;display:grid;grid-template-columns:repeat(4,1fr);gap:10px;">',
    '    <div style="background:#f8fafc;padding:12px;border-radius:8px;text-align:center;"><div style="font-size:10px;color:#64748b;">VISITORS</div><div style="font-size:18px;font-weight:bold;color:#0f172a;">' + visitors + '</div></div>',
    '    <div style="background:#f8fafc;padding:12px;border-radius:8px;text-align:center;"><div style="font-size:10px;color:#64748b;">BOOKINGS</div><div style="font-size:18px;font-weight:bold;color:#047857;">' + bookings + '</div></div>',
    '    <div style="background:#f8fafc;padding:12px;border-radius:8px;text-align:center;"><div style="font-size:10px;color:#64748b;">TOTAL LEADS</div><div style="font-size:18px;font-weight:bold;color:#c2410c;">' + totalLeads + '</div></div>',
    '    <div style="background:#f8fafc;padding:12px;border-radius:8px;text-align:center;"><div style="font-size:10px;color:#64748b;">CONVERSION</div><div style="font-size:18px;font-weight:bold;color:#d97706;">' + convRate + '</div></div>',
    '  </div>',
    '  <div style="padding:0 22px 22px 22px;">',
    '    <table width="100%" style="border-collapse:collapse;font-size:13px;">',
    '      <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#64748b;">⭐ 6-Step Bookings:</td><td style="text-align:right;font-weight:bold;color:#047857;">' + bookings + '</td></tr>',
    '      <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#64748b;">📞 Quick Callbacks:</td><td style="text-align:right;font-weight:bold;">' + callbacks + '</td></tr>',
    '      <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#64748b;">✉️ Contact Messages:</td><td style="text-align:right;font-weight:bold;">' + contacts + '</td></tr>',
    '      <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#64748b;">🤝 Ecosystem Partners:</td><td style="text-align:right;font-weight:bold;">' + partners + '</td></tr>',
    '      <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#64748b;">💬 Chatbot Conversations:</td><td style="text-align:right;font-weight:bold;">' + chatbots + '</td></tr>',
    '      <tr><td style="padding:8px 0;color:#64748b;">📊 Telemetry Events Logged:</td><td style="text-align:right;font-weight:bold;">' + events + '</td></tr>',
    '    </table>',
    '    <div style="text-align:center;margin-top:20px;"><a href="' + ss.getUrl() + '" target="_blank" style="background:#064e3b;color:#ffffff;text-decoration:none;padding:10px 24px;border-radius:6px;font-weight:bold;display:inline-block;">Open ApnaCare Database Sheet &rarr;</a></div>',
    '  </div>',
    '</div>'
  ].join('');

  (EMAIL_CONFIG.reportEmails || []).forEach(function (em) {
    safeSendEmail({
      to: em,
      subject: "[ApnaCare] " + intervalName + " Digest — " + period + " (" + totalLeads + " Inbound Leads)",
      htmlBody: html,
      name: EMAIL_CONFIG.name,
      replyTo: EMAIL_CONFIG.replyTo
    });
  });
}

function dailyReport() { sendPeriodicExecutiveDigest("Daily"); }
function weeklyReport() { sendPeriodicExecutiveDigest("Weekly"); }
function monthlyReport() { sendPeriodicExecutiveDigest("Monthly"); }

// =========================================================================================
// ONE-CLICK REFRESH, DUPLICATE PURGE & INITIALIZATION
// =========================================================================================
function INITIALIZE_ALL_TABS() {
  var ss = getSpreadsheet();
  if (!ss) {
    console.error("❌ Could not connect to spreadsheet.");
    return;
  }
  Object.keys(TAB_HEADERS).forEach(function (tabName) {
    getTab(ss, tabName);
  });
  console.log("✅ All 18 ApnaCare tabs successfully initialized.");
  try {
    SpreadsheetApp.getUi().alert("✅ All 18 ApnaCare database tabs initialized successfully!");
  } catch (e) { }
}

function MASTER_REFRESH_RAW_DATA() {
  INITIALIZE_ALL_TABS();
  PURGE_DUPLICATES_FROM_ALL_TABS();
  BUILD_AGGREGATED_INTERVAL_SUMMARIES();
  try {
    SpreadsheetApp.getUi().alert("✅ Master Refresh Complete!\n\n• All 18 Tabs Verified.\n• Duplicate events purged.\n• Daily, Weekly & Monthly summaries recalculated.");
  } catch (e) { }
}

function PURGE_DUPLICATES_FROM_ALL_TABS() {
  var ss = getSpreadsheet();
  if (!ss) return;
  var tabs = Object.keys(TAB_HEADERS);
  var totalRemoved = 0;

  tabs.forEach(function (tabName) {
    var sheet = ss.getSheetByName(tabName);
    if (!sheet || sheet.getLastRow() < 3) return;
    var data = sheet.getDataRange().getValues();
    if (!data || data.length < 2) return;

    var headers = data[0];
    var idCol = headers.indexOf("event_id");
    if (idCol === -1) idCol = headers.indexOf("booking_ref");
    if (idCol === -1) idCol = headers.indexOf("lead_id");
    if (idCol === -1) idCol = headers.indexOf("enquiry_id");

    var seen = new Set();
    var rowsToKeep = [headers];

    for (var r = 1; r < data.length; r++) {
      var key = idCol > -1 && data[r][idCol] ? String(data[r][idCol]) : data[r].join("|");
      if (!seen.has(key)) {
        seen.add(key);
        rowsToKeep.push(data[r]);
      } else {
        totalRemoved++;
      }
    }

    if (rowsToKeep.length < data.length && rowsToKeep.length > 0) {
      sheet.clearContents();
      sheet.getRange(1, 1, rowsToKeep.length, headers.length).setValues(rowsToKeep);
    }
  });
  console.log("🧹 Duplicates removed: " + totalRemoved);
}

function setupAllApnaCareTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function (t) { ScriptApp.deleteTrigger(t); });

  // 1. Daily Executive Briefing every evening at 9:00 PM IST
  ScriptApp.newTrigger("dailyReport").timeBased().everyDays(1).atHour(21).create();

  // 2. Weekly Executive Digest every Friday at 9:00 PM IST
  ScriptApp.newTrigger("weeklyReport").timeBased().onWeekDay(ScriptApp.WeekDay.FRIDAY).atHour(21).create();

  // 3. Monthly Executive Summary on the 1st of every month at 9:00 AM IST
  ScriptApp.newTrigger("monthlyReport").timeBased().onMonthDay(1).atHour(9).create();

  try {
    SpreadsheetApp.getUi().alert("✅ Automated Email Report Triggers Activated (Daily, Weekly & Monthly)!");
  } catch (e) { }
}

function onOpen() {
  try {
    SpreadsheetApp.getUi()
      .createMenu('🏥 APNACARE OPERATIONS ENGINE')
      .addItem('🔄 Refresh & Recompute Summaries', 'MASTER_REFRESH_RAW_DATA')
      .addItem('📁 Initialize All Database Tabs', 'INITIALIZE_ALL_TABS')
      .addItem('🧹 Purge Duplicates Across Tabs', 'PURGE_DUPLICATES_FROM_ALL_TABS')
      .addSeparator()
      .addItem('⏰ Enable Automated Daily/Weekly/Monthly Reports', 'setupAllApnaCareTriggers')
      .addItem('🧪 Test Inbound Booking Alert Now', 'TEST_BOOKING_ALERT')
      .addToUi();
  } catch (e) { }
}

function TEST_BOOKING_ALERT() {
  sendBookingAlertEmail({
    received_at: normalizeTimestamp(new Date()),
    booking_ref: "AC-" + Date.now().toString(36).toUpperCase().slice(-6),
    customer_name: "Dr. Ananya Sundaram",
    mobile: "+91 98401 23456",
    email: "ananya.sundaram@gmail.com",
    service_name: "Hospital Bedside & Post-Surgical Support",
    city: "Chennai",
    location_address: "Apollo Main Hospital, Greams Road",
    start_date: "2026-10-15",
    start_time: "08:00 AM",
    duration_days: 7,
    preferred_language: "Tamil / English",
    special_notes: "Patient recovering from knee arthroplasty, requires bedside mobility support and vitals logging.",
    total_amount: 10493
  });
  console.log("✅ Test booking alert email sent.");
}

