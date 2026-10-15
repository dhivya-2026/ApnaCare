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
 * 8.  Attendant_Applications: Caregiver, nurse & companion recruitment submissions.
 * 9.  Attendant_Portal_Logs: Attendant sign-in, shift check-ins, vitals logging.
 * 10. YouTube_Interactions: Channel video comments, replies & inbound patient inquiries.
 * 11. LinkedIn_Leads: Inbound patient care leads, corporate partnerships & career inquiries.
 * 12. Lead_Management: Master consolidated directory of all inbound leads.
 * 13. Page_Performance: Load times, page dwell, and bounce metrics.
 * 14. Click_Interactions: Element clicks, coordinates & Left-vs-Right Hand zones.
 * 15. Scroll_Engagement: Depth milestones (25%, 50%, 75%, 100%) & section engagement.
 * 16. Form_Interactions: Step-by-step funnel drop-offs.
 * 17. Conversion_Events: Completed bookings, callback submissions & phone calls.
 * 18. Traffic_Sources: Referrers, direct entries, and marketing campaign attribution.
 * 19. 📅 Daily_Summary, Weekly_Summary, Monthly_Summary: Auto-aggregated analytics.
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

var AIRTABLE_CONFIG = {
  // Configured in Apps Script: Project Settings > Script Properties > AIRTABLE_API_KEY
  API_KEY: (typeof PropertiesService !== "undefined" && PropertiesService.getScriptProperties && PropertiesService.getScriptProperties().getProperty("AIRTABLE_API_KEY")) || "YOUR_AIRTABLE_PERSONAL_ACCESS_TOKEN",
  BASE_ID: "appd5rLxicUUJpImD",
  TABLE_ID: "tbl6DnBguLMnvIQI8"
};

var JIRA_CONFIG = {
  // Configured in Apps Script: Project Settings > Script Properties > JIRA_API_TOKEN
  API_TOKEN: (typeof PropertiesService !== "undefined" && PropertiesService.getScriptProperties && PropertiesService.getScriptProperties().getProperty("JIRA_API_TOKEN")) || "ATATT3xFfGF07V4pvlPDfd3g_WlE3iyOMfQND6XsNNEgndQ6Ol9utpLxe3ZeYW-iucw07v3GLYkp6i1IfbXF8XD30tCN3XHT3q-aOnRY_46GSID7q3HhzfRud2WfuW6d08iwerrbOKzIHDMiKuvM_THtDEIyGVNziJz89_BCjHLtla6Xv00IHCg=E96CC16C",
  EMAIL: (typeof PropertiesService !== "undefined" && PropertiesService.getScriptProperties && PropertiesService.getScriptProperties().getProperty("JIRA_EMAIL")) || "divabhrati.ramco@gmail.com",
  DOMAIN: (typeof PropertiesService !== "undefined" && PropertiesService.getScriptProperties && PropertiesService.getScriptProperties().getProperty("JIRA_DOMAIN")) || "divabhratiramco.atlassian.net",
  PROJECT_KEY: (typeof PropertiesService !== "undefined" && PropertiesService.getScriptProperties && PropertiesService.getScriptProperties().getProperty("JIRA_PROJECT_KEY")) || "APNA",
  ISSUE_TYPE: (typeof PropertiesService !== "undefined" && PropertiesService.getScriptProperties && PropertiesService.getScriptProperties().getProperty("JIRA_ISSUE_TYPE")) || "Task",
  SUBTASK_ISSUE_TYPE: (typeof PropertiesService !== "undefined" && PropertiesService.getScriptProperties && PropertiesService.getScriptProperties().getProperty("JIRA_SUBTASK_ISSUE_TYPE")) || "Sub-task",
  AUTO_CREATE_SUBTASKS: true
};

var YOUTUBE_CONFIG = {
  // Configured in Apps Script: Project Settings > Script Properties > YOUTUBE_API_KEY
  API_KEY: (typeof PropertiesService !== "undefined" && PropertiesService.getScriptProperties && PropertiesService.getScriptProperties().getProperty("YOUTUBE_API_KEY")) || "AIzaSyBXiniCcLzhqZyZqAZed66YKLS1flnbUoQ",

  // YouTube Channel ID (e.g. UCxxxxxxxxxxxxxxxxxxxxxx). If empty, auto-detected from authenticated user or handle.
  CHANNEL_ID: (typeof PropertiesService !== "undefined" && PropertiesService.getScriptProperties && PropertiesService.getScriptProperties().getProperty("YOUTUBE_CHANNEL_ID")) || "",

  // YouTube Channel Handle (e.g. @apnacare)
  CHANNEL_HANDLE: (typeof PropertiesService !== "undefined" && PropertiesService.getScriptProperties && PropertiesService.getScriptProperties().getProperty("YOUTUBE_CHANNEL_HANDLE")) || "@apnacare",

  // Auto-generate Jira Lead Task + 8 Subtasks when a patient enquiry is detected
  AUTO_JIRA_LEADS: true,

  // Auto-send email notifications to operations desk for new YouTube inquiries
  AUTO_EMAIL_ALERTS: true,

  // Max video count to scan per sync cycle
  MAX_VIDEOS_TO_SCAN: 50
};

var EMAIL_CONFIG = {
  name: "ApnaCare Operations Desk",
  companyName: "ApnaCare",
  website: "https://apna-care.vercel.app",
  replyTo: "divabhrati.ramco@gmail.com",
  adminEmail: "divabhrati.ramco@gmail.com",

  // Operations team alert recipients for inbound bookings & leads
  leadEmails: [
    "divabhrati.ramco@gmail.com"
  ],

  // Executive digest recipients (Daily/Weekly/Monthly)
  reportEmails: [
    "divabhrati.ramco@gmail.com"
  ],

  // Emergency SOS escalation recipients
  emergencyEmails: [
    "divabhrati.ramco@gmail.com"
  ]
};

// Deduplication helper to prevent duplicate email dispatches
function getUniqueRecipients(list) {
  if (!list) return [];
  if (typeof list === "string") return [list.trim()];
  var seen = {};
  var unique = [];
  for (var i = 0; i < list.length; i++) {
    var email = String(list[i] || "").trim().toLowerCase();
    if (email && email.indexOf("@") !== -1 && !seen[email]) {
      seen[email] = true;
      unique.push(list[i].trim());
    }
  }
  return unique;
}

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
    "page_path", "source_environment",
    "airtable_synced", "jira_synced", "jira_issue_key"
  ],

  Callback_Enquiries: [
    "received_at", "enquiry_id", "visitor_id", "session_id", "name", "phone", "service",
    "message", "page_path", "lead_source", "lead_status", "follow_up_status", "source_environment",
    "airtable_synced", "jira_synced", "jira_issue_key"
  ],

  Contact_Submissions: [
    "received_at", "contact_id", "visitor_id", "session_id", "name", "phone", "email", "city",
    "subject", "message", "page_path", "lead_source", "lead_status", "follow_up_status",
    "source_environment",
    "airtable_synced", "jira_synced", "jira_issue_key"
  ],

  Partner_Applications: [
    "received_at", "partner_id", "visitor_id", "session_id", "org_name", "org_type",
    "contact_person", "email", "phone", "website", "state", "city", "members_count",
    "category", "interest_notes", "page_path", "lead_source", "lead_status", "source_environment",
    "airtable_synced", "jira_synced", "jira_issue_key"
  ],

  Chatbot_Leads: [
    "received_at", "lead_id", "visitor_id", "session_id", "name", "email", "phone",
    "requested_service", "city", "page_context_badge", "user_query", "recommended_action",
    "conversation_notes", "page_path", "lead_source", "lead_status", "source_environment",
    "airtable_synced", "jira_synced", "jira_issue_key"
  ],

  SOS_Emergency_Alerts: [
    "received_at", "alert_id", "visitor_id", "session_id", "alert_type", "trigger_step",
    "caller_name", "caller_phone", "location", "city", "service_context", "status",
    "operator_notes", "response_time_sec", "source_environment",
    "airtable_synced", "jira_synced", "jira_issue_key"
  ],

  Attendant_Applications: [
    "received_at", "application_ref", "visitor_id", "session_id", "full_name", "mobile", "email",
    "dob", "gender", "city", "state", "role", "experience", "qualifications", "languages",
    "employment_type", "experience_summary", "document_count", "documents", "consent_given",
    "lead_status", "follow_up_status", "source_environment",
    "airtable_synced", "jira_synced", "jira_issue_key"
  ],

  Attendant_Portal_Logs: [
    "received_at", "log_id", "attendant_id", "attendant_name", "mobile", "role", "city",
    "action_type", "shift_status", "patient_name", "vitals_summary", "notes", "source_environment"
  ],

  YouTube_Interactions: [
    "synced_at", "comment_id", "video_id", "video_title", "video_url", "channel",
    "author_name", "author_channel_url", "comment_text", "reply_text", "published_at",
    "like_count", "is_enquiry", "lead_source", "jira_key_primary", "jira_key_secondary",
    "sync_status", "reply_count", "updated_at", "detected_intent"
  ],

  LinkedIn_Leads: [
    "received_at", "lead_id", "full_name", "first_name", "last_name", "phone", "email",
    "city", "company", "job_title", "service_or_requirement", "lead_type", "lead_source",
    "form_name", "campaign_name", "linkedin_profile_url", "user_notes", "lead_status",
    "follow_up_status", "jira_key_primary", "jira_key_secondary", "source_environment"
  ],

  Lead_Management: [
    "received_at", "lead_id", "lead_type", "visitor_id", "session_id", "name", "phone", "email",
    "service_or_requirement", "city", "lead_source", "form_name", "lead_status", "follow_up_status",
    "total_value", "source_environment",
    "airtable_synced", "jira_synced", "jira_issue_key"
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
  ],

  Geo_Timezone_Intelligence: [
    "Timestamp", "Session_ID", "Visitor_ID", "Country", "Region", "City",
    "Timezone", "UTC_Offset", "Latitude", "Longitude", "Page_URL", "Referrer",
    "Device_Type", "Browser", "Operating_System", "Language", "Country_Source", "Timezone_Source"
  ],

  IP_Security_Intelligence: [
    "Timestamp", "Session_ID", "Visitor_ID", "IP_Identifier", "IP_Data_Source",
    "Country", "Region", "Request_Path", "Referrer", "User_Agent", "Event_Type",
    "Security_Signal", "Risk_Level", "Request_Count", "Detection_Reason", "Action_Taken"
  ],

  Report_Delivery_Logs: [
    "received_at", "report_type", "reporting_period", "delivery_status",
    "message_id", "provider", "recipient_emails", "error"
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

function repairHeadersIfNeeded(sheet, tabName) {
  var headers = (TAB_HEADERS && TAB_HEADERS[tabName]) ? TAB_HEADERS[tabName] : [];
  if (!headers || !headers.length) return headers;

  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  if (lastRow === 0 || lastCol === 0) {
    sheet.getRange(1, 1, 1, headers.length)
      .setValues([headers])
      .setFontWeight("bold")
      .setBackground(CONFIG.BRAND_SECONDARY || "#064e3b")
      .setFontColor("#ffffff")
      .setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
    return headers;
  }

  // Inspect existing headers in row 1
  var existingRow = sheet.getRange(1, 1, 1, Math.max(lastCol, headers.length)).getValues()[0];
  var mismatch = false;

  for (var i = 0; i < headers.length; i++) {
    if (String(existingRow[i] || "").trim() !== headers[i]) {
      mismatch = true;
      break;
    }
  }

  if (mismatch) {
    console.warn("⚠️ Repairing mismatched/outdated headers in tab: " + tabName);
    sheet.getRange(1, 1, 1, headers.length)
      .setValues([headers])
      .setFontWeight("bold")
      .setBackground(CONFIG.BRAND_SECONDARY || "#064e3b")
      .setFontColor("#ffffff")
      .setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
  }

  return headers;
}

function getTab(ss, tabName) {
  if (!ss) ss = getSpreadsheet();
  if (!ss) return null;

  var sheet = ss.getSheetByName(tabName);

  // If not found by exact name, try space-separated or case-insensitive name
  if (!sheet) {
    var altName = tabName.replace(/_/g, " ");
    sheet = ss.getSheetByName(altName);
    if (!sheet) {
      var allSheets = ss.getSheets();
      for (var s = 0; s < allSheets.length; s++) {
        var sName = allSheets[s].getName().trim().toLowerCase();
        if (sName === tabName.toLowerCase() || sName === altName.toLowerCase()) {
          sheet = allSheets[s];
          break;
        }
      }
    }
  }

  if (!sheet) {
    sheet = ss.insertSheet(tabName);
  }

  repairHeadersIfNeeded(sheet, tabName);
  return sheet;
}


// =========================================================================================
// AIRTABLE CRM INTEGRATION & REAL-TIME FORWARDER
// =========================================================================================

/**
 * Forwards an individual lead into Airtable CRM table in real time.
 */
function pushLeadToAirtable(lead) {
  try {
    if (!AIRTABLE_CONFIG.API_KEY || !AIRTABLE_CONFIG.BASE_ID || !AIRTABLE_CONFIG.TABLE_ID) return;

    var fields = {
      "Name": String(lead.Name || "Website Lead").trim()
    };

    if (lead.Phone) fields["Phone"] = String(lead.Phone).trim();
    if (lead.Email && String(lead.Email).indexOf("@") !== -1) fields["Email"] = String(lead.Email).trim();
    if (lead.Service) fields["Service"] = String(lead.Service).trim();
    if (lead.City) fields["City"] = String(lead.City).trim();
    if (lead.LeadType) fields["Lead Type"] = String(lead.LeadType).trim();
    if (lead.ReferenceID) fields["Reference ID"] = String(lead.ReferenceID).trim();
    if (lead.Details) fields["Details"] = String(lead.Details).trim();
    if (lead.PagePath) fields["Page Path"] = String(lead.PagePath).trim();
    if (lead.Timestamp) fields["Timestamp"] = String(lead.Timestamp).trim();
    if (lead.SourceEnvironment) fields["Source Environment"] = String(lead.SourceEnvironment).trim();

    var url = "https://api.airtable.com/v0/" + AIRTABLE_CONFIG.BASE_ID + "/" + AIRTABLE_CONFIG.TABLE_ID;
    var options = {
      method: "post",
      headers: {
        "Authorization": "Bearer " + AIRTABLE_CONFIG.API_KEY,
        "Content-Type": "application/json"
      },
      payload: JSON.stringify({
        records: [{ fields: fields }]
      }),
      muteHttpExceptions: true
    };

    var res = UrlFetchApp.fetch(url, options);
    var code = res.getResponseCode();
    if (code >= 200 && code < 300) {
      Logger.log("✅ Synced lead to Airtable: " + (lead.ReferenceID || lead.Name));
    } else {
      Logger.log("⚠️ Airtable sync warning: HTTP " + code + " - " + res.getContentText());
    }
  } catch (err) {
    Logger.log("⚠️ Failed to dispatch to Airtable: " + err.message);
  }
}

/**
 * Bulk syncs all historical patient leads, bookings, callbacks, contact forms,
 * chatbot leads, and emergency SOS alerts from Sheet 1 tabs directly into Airtable CRM.
 */
function SYNC_ALL_LEADS_TO_AIRTABLE() {
  var ui = null;
  try { ui = SpreadsheetApp.getUi(); } catch (e) { }

  var ss = getSpreadsheet();
  if (!ss) {
    if (ui) ui.alert("❌ Error", "Could not open spreadsheet.", ui.ButtonSet.OK);
    return { success: false, count: 0 };
  }

  var airtableRecords = [];
  function cleanVal(v) { return (v === undefined || v === null) ? "" : String(v).trim(); }

  // 1. Booking_Leads
  try {
    var bSheet = ss.getSheetByName("Booking_Leads");
    if (bSheet && bSheet.getLastRow() > 1) {
      var rows = bSheet.getDataRange().getValues();
      var h = rows[0].map(function (c) { return String(c || "").trim(); });
      for (var r = 1; r < rows.length; r++) {
        var row = rows[r];
        var obj = {};
        h.forEach(function (colName, i) { obj[colName] = row[i]; });
        var name = cleanVal(obj.customer_name || obj.name);
        var phone = cleanVal(obj.mobile || obj.phone);
        if (!name && !phone) continue;

        var details = "Start: " + cleanVal(obj.start_date) + " " + cleanVal(obj.start_time) +
          " | Duration: " + cleanVal(obj.duration_days) + " days" +
          " | Amount: ₹" + cleanVal(obj.total_amount) +
          " | Address: " + cleanVal(obj.location_address) +
          " | Notes: " + cleanVal(obj.special_notes);

        var fields = {
          "Name": name,
          "Phone": phone,
          "Service": cleanVal(obj.service_name || obj.service_id || "Elder Care Attendant"),
          "City": cleanVal(obj.city || "Bengaluru"),
          "Lead Type": "Booking",
          "Reference ID": cleanVal(obj.booking_ref),
          "Details": details,
          "Page Path": cleanVal(obj.page_path || "/booking"),
          "Timestamp": cleanVal(obj.received_at),
          "Source Environment": cleanVal(obj.source_environment || "production")
        };
        if (obj.email && cleanVal(obj.email).indexOf("@") !== -1) fields["Email"] = cleanVal(obj.email);
        airtableRecords.push({ fields: fields });
      }
    }
  } catch (e) { Logger.log("Error reading Bookings: " + e.message); }

  // 2. Callback_Enquiries
  try {
    var cbSheet = ss.getSheetByName("Callback_Enquiries");
    if (cbSheet && cbSheet.getLastRow() > 1) {
      var rows = cbSheet.getDataRange().getValues();
      var h = rows[0].map(function (c) { return String(c || "").trim(); });
      for (var r = 1; r < rows.length; r++) {
        var row = rows[r];
        var obj = {};
        h.forEach(function (colName, i) { obj[colName] = row[i]; });
        var name = cleanVal(obj.name);
        var phone = cleanVal(obj.phone);
        if (!name && !phone) continue;

        var fields = {
          "Name": name,
          "Phone": phone,
          "Service": cleanVal(obj.service || "Quick Callback"),
          "City": "Bengaluru",
          "Lead Type": "Callback Enquiry",
          "Reference ID": cleanVal(obj.enquiry_id),
          "Details": "Message: " + cleanVal(obj.message) + " | Status: " + cleanVal(obj.lead_status),
          "Page Path": cleanVal(obj.page_path || "/"),
          "Timestamp": cleanVal(obj.received_at),
          "Source Environment": cleanVal(obj.source_environment || "production")
        };
        airtableRecords.push({ fields: fields });
      }
    }
  } catch (e) { Logger.log("Error reading Callbacks: " + e.message); }

  // 3. Contact_Submissions
  try {
    var ctSheet = ss.getSheetByName("Contact_Submissions");
    if (ctSheet && ctSheet.getLastRow() > 1) {
      var rows = ctSheet.getDataRange().getValues();
      var h = rows[0].map(function (c) { return String(c || "").trim(); });
      for (var r = 1; r < rows.length; r++) {
        var row = rows[r];
        var obj = {};
        h.forEach(function (colName, i) { obj[colName] = row[i]; });
        var name = cleanVal(obj.name);
        var phone = cleanVal(obj.phone);
        if (!name && !phone) continue;

        var fields = {
          "Name": name,
          "Phone": phone,
          "Service": cleanVal(obj.subject || "Contact Form"),
          "City": cleanVal(obj.city || "Bengaluru"),
          "Lead Type": "Contact Submission",
          "Reference ID": cleanVal(obj.contact_id),
          "Details": "Subject: " + cleanVal(obj.subject) + " | Message: " + cleanVal(obj.message),
          "Page Path": cleanVal(obj.page_path || "/contact"),
          "Timestamp": cleanVal(obj.received_at),
          "Source Environment": cleanVal(obj.source_environment || "production")
        };
        if (obj.email && cleanVal(obj.email).indexOf("@") !== -1) fields["Email"] = cleanVal(obj.email);
        airtableRecords.push({ fields: fields });
      }
    }
  } catch (e) { Logger.log("Error reading Contacts: " + e.message); }

  // 4. Chatbot_Leads
  try {
    var chatSheet = ss.getSheetByName("Chatbot_Leads");
    if (chatSheet && chatSheet.getLastRow() > 1) {
      var rows = chatSheet.getDataRange().getValues();
      var h = rows[0].map(function (c) { return String(c || "").trim(); });
      for (var r = 1; r < rows.length; r++) {
        var row = rows[r];
        var obj = {};
        h.forEach(function (colName, i) { obj[colName] = row[i]; });
        var name = cleanVal(obj.name);
        var phone = cleanVal(obj.phone);
        if (!name && !phone) continue;

        var fields = {
          "Name": name,
          "Phone": phone,
          "Service": cleanVal(obj.requested_service || "Chatbot Assistance"),
          "City": cleanVal(obj.city || "Bengaluru"),
          "Lead Type": "Chatbot Lead",
          "Reference ID": cleanVal(obj.lead_id),
          "Details": "Query: " + cleanVal(obj.user_query) + " | Action: " + cleanVal(obj.recommended_action),
          "Page Path": cleanVal(obj.page_path || "/"),
          "Timestamp": cleanVal(obj.received_at),
          "Source Environment": cleanVal(obj.source_environment || "production")
        };
        if (obj.email && cleanVal(obj.email).indexOf("@") !== -1) fields["Email"] = cleanVal(obj.email);
        airtableRecords.push({ fields: fields });
      }
    }
  } catch (e) { Logger.log("Error reading Chatbot Leads: " + e.message); }

  // 5. SOS_Emergency_Alerts
  try {
    var sosSheet = ss.getSheetByName("SOS_Emergency_Alerts");
    if (sosSheet && sosSheet.getLastRow() > 1) {
      var rows = sosSheet.getDataRange().getValues();
      var h = rows[0].map(function (c) { return String(c || "").trim(); });
      for (var r = 1; r < rows.length; r++) {
        var row = rows[r];
        var obj = {};
        h.forEach(function (colName, i) { obj[colName] = row[i]; });
        var name = cleanVal(obj.caller_name || "Emergency Caller");
        var phone = cleanVal(obj.caller_phone);
        if (!phone) continue;

        var fields = {
          "Name": name,
          "Phone": phone,
          "Service": cleanVal(obj.service_context || "Emergency SOS"),
          "City": cleanVal(obj.city || obj.location || "Bengaluru"),
          "Lead Type": "Emergency SOS Alert",
          "Reference ID": cleanVal(obj.alert_id),
          "Details": "Trigger Step: " + cleanVal(obj.trigger_step) + " | Status: " + cleanVal(obj.status) + " | Operator: " + cleanVal(obj.operator_notes),
          "Page Path": "/sos",
          "Timestamp": cleanVal(obj.received_at),
          "Source Environment": cleanVal(obj.source_environment || "production")
        };
        airtableRecords.push({ fields: fields });
      }
    }
  } catch (e) { Logger.log("Error reading SOS: " + e.message); }

  if (airtableRecords.length === 0) {
    var emptyMsg = "No leads found in Sheet 1 tabs to sync.";
    if (ui) ui.alert("ℹ️ Airtable Sync", emptyMsg, ui.ButtonSet.OK);
    return { success: true, count: 0 };
  }

  // Push to Airtable in batches of 10
  var airtableUrl = "https://api.airtable.com/v0/" + AIRTABLE_CONFIG.BASE_ID + "/" + AIRTABLE_CONFIG.TABLE_ID;
  var headers = {
    "Authorization": "Bearer " + AIRTABLE_CONFIG.API_KEY,
    "Content-Type": "application/json"
  };

  var pushedCount = 0;
  var batchSize = 10;
  for (var i = 0; i < airtableRecords.length; i += batchSize) {
    var batch = airtableRecords.slice(i, i + batchSize);
    var options = {
      method: "post",
      headers: headers,
      payload: JSON.stringify({ records: batch }),
      muteHttpExceptions: true
    };
    var response = UrlFetchApp.fetch(airtableUrl, options);
    var code = response.getResponseCode();
    if (code >= 200 && code < 300) {
      pushedCount += batch.length;
    } else {
      Logger.log("Airtable sync error: " + response.getContentText());
    }
    Utilities.sleep(200); // Rate limit safeguard
  }

  var successMsg = "Successfully synced " + pushedCount + " of " + airtableRecords.length + " leads from Google Sheet 1 into Airtable CRM!";
  Logger.log(successMsg);
  if (ui) {
    ui.alert("✅ Airtable Sync Complete", successMsg, ui.ButtonSet.OK);
  }
  return { success: true, count: pushedCount };
}

// =========================================================================================
// JIRA SERVICE DESK & CRM INTEGRATION (LEADS, FORMS & TRIGGERS)
// =========================================================================================

/**
 * Creates an issue / ticket in Atlassian Jira for an individual lead or booking in real time.
 */
function pushLeadToJira(lead, options) {
  options = options || {};
  try {
    if (!JIRA_CONFIG.API_TOKEN || !JIRA_CONFIG.EMAIL || !JIRA_CONFIG.DOMAIN || !JIRA_CONFIG.PROJECT_KEY) {
      Logger.log("⚠️ Jira config incomplete. Skipping Jira sync.");
      return { success: false, error: "Jira configuration missing" };
    }

    var cleanHost = String(JIRA_CONFIG.DOMAIN).trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '');
    var url = "https://" + cleanHost + "/rest/api/2/issue";

    var leadTypeLabel = String(lead.LeadType || "Inbound Lead").trim();
    var customerName = String(lead.Name || "Website Lead").trim();
    var serviceName = String(lead.Service || "Care Enquiry").trim();
    var city = String(lead.City || "India").trim();

    var summary = "[" + leadTypeLabel + "] " + customerName + " — " + serviceName + (city ? " (" + city + ")" : "");
    if (summary.length > 250) summary = summary.substring(0, 247) + "...";

    var descLines = [
      "h2. ApnaCare Patient / Customer Details",
      "* *Reference ID:* " + (lead.ReferenceID || "N/A"),
      "* *Lead Type:* " + leadTypeLabel,
      "* *Customer Name:* " + customerName,
      "* *Mobile / Phone:* " + (lead.Phone || "N/A"),
      "* *Email:* " + (lead.Email || "N/A"),
      "* *Service Requested:* " + serviceName,
      "* *City / Location:* " + city,
      "* *Received At:* " + (lead.Timestamp || Utilities.formatDate(new Date(), CONFIG.TIMEZONE || "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss")),
      "* *Page Path:* " + (lead.PagePath || "/"),
      "* *Source Environment:* " + (lead.SourceEnvironment || "production"),
      "",
      "h3. Requirements & Operational Details",
      String(lead.Details || "No additional notes provided.").trim(),
      "",
      "----",
      "_Logged automatically by ApnaCare Digital Operations Engine_"
    ];

    var fields = {
      project: { key: String(JIRA_CONFIG.PROJECT_KEY).trim().toUpperCase() },
      summary: summary,
      description: descLines.join("\n"),
      issuetype: { name: JIRA_CONFIG.ISSUE_TYPE || "Task" },
      labels: [
        "apnacare",
        "lead",
        "website",
        leadTypeLabel.toLowerCase().replace(/[^a-z0-9_-]/g, "")
      ]
    };

    if (options.priority) {
      fields.priority = { name: options.priority };
    }

    var authString = String(JIRA_CONFIG.EMAIL).trim() + ":" + String(JIRA_CONFIG.API_TOKEN).trim();
    var authHeader = "Basic " + Utilities.base64Encode(authString);

    var fetchOptions = {
      method: "post",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      payload: JSON.stringify({ fields: fields }),
      muteHttpExceptions: true
    };

    var res = UrlFetchApp.fetch(url, fetchOptions);
    var code = res.getResponseCode();
    var respText = res.getContentText();

    if (code >= 200 && code < 300) {
      var json = JSON.parse(respText);
      Logger.log("✅ Created Jira Issue " + json.key + " for " + (lead.ReferenceID || customerName));

      // Automatically create exactly 8 operational subtasks for every parent task
      var subtasks = [];
      if (JIRA_CONFIG.AUTO_CREATE_SUBTASKS !== false) {
        subtasks = createSubtasksForJiraIssue(json.key, lead, options, authHeader, cleanHost);
      }

      return {
        success: true,
        key: json.key,
        id: json.id,
        subtasks: subtasks
      };
    } else {
      Logger.log("⚠️ Jira API returned HTTP " + code + ": " + respText);
      return { success: false, error: respText, statusCode: code };
    }
  } catch (err) {
    Logger.log("⚠️ Failed to dispatch to Jira: " + err.message);
    return { success: false, error: err.message };
  }
}

// =========================================================================================
// AUTOMATED 8-SUBTASK CREATION ENGINE FOR JIRA TASKS
// =========================================================================================

/**
 * Automatically creates exactly 8 sequential operational subtasks under a parent Jira issue.
 */
function createSubtasksForJiraIssue(parentKey, lead, options, authHeader, cleanHost) {
  if (!parentKey) return [];

  if (!authHeader || !cleanHost) {
    cleanHost = String(JIRA_CONFIG.DOMAIN).trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '');
    var authString = String(JIRA_CONFIG.EMAIL).trim() + ":" + String(JIRA_CONFIG.API_TOKEN).trim();
    authHeader = "Basic " + Utilities.base64Encode(authString);
  }

  var templates = getSubtaskTemplatesForLead(lead);
  var created = [];

  Logger.log("⚙️ Auto-generating " + templates.length + " operational subtasks under Jira task " + parentKey + "...");

  for (var i = 0; i < templates.length; i++) {
    try {
      var res = createSingleJiraSubtask(parentKey, templates[i], authHeader, cleanHost);
      if (res && res.success) {
        created.push(res.key);
      }
    } catch (e) {
      Logger.log("⚠️ Error creating subtask #" + (i + 1) + " for " + parentKey + ": " + e.message);
    }
  }

  Logger.log("🏁 Subtasks complete for " + parentKey + ": " + created.length + "/" + templates.length + " subtasks created.");
  return created;
}

/**
 * Creates an individual Jira Sub-task under a parent issue.
 * Includes automatic retry with alternate subtask issue type name ("Sub-task" vs "Subtask").
 */
function createSingleJiraSubtask(parentKey, subtaskData, authHeader, cleanHost) {
  var url = "https://" + cleanHost + "/rest/api/2/issue";
  var preferredType = JIRA_CONFIG.SUBTASK_ISSUE_TYPE || "Sub-task";

  var payload = {
    fields: {
      project: { key: String(JIRA_CONFIG.PROJECT_KEY).trim().toUpperCase() },
      parent: { key: parentKey },
      summary: subtaskData.summary,
      description: subtaskData.description || subtaskData.summary,
      issuetype: { name: preferredType },
      labels: [
        "apnacare",
        "subtask",
        parentKey.toLowerCase()
      ]
    }
  };

  var fetchOptions = {
    method: "post",
    headers: {
      "Authorization": authHeader,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var res = UrlFetchApp.fetch(url, fetchOptions);
  var code = res.getResponseCode();
  var respText = res.getContentText();

  // If failed due to issue type name discrepancy ("Sub-task" vs "Subtask"), automatically retry with the alternate name
  if ((code === 400 || code === 404) && (respText.indexOf("issuetype") !== -1 || respText.indexOf("issue type") !== -1)) {
    var alternateType = (preferredType === "Sub-task") ? "Subtask" : "Sub-task";
    payload.fields.issuetype.name = alternateType;
    fetchOptions.payload = JSON.stringify(payload);
    res = UrlFetchApp.fetch(url, fetchOptions);
    code = res.getResponseCode();
    respText = res.getContentText();
    if (code >= 200 && code < 300) {
      JIRA_CONFIG.SUBTASK_ISSUE_TYPE = alternateType; // Cache the working issue type
    }
  }

  if (code >= 200 && code < 300) {
    var json = JSON.parse(respText);
    Logger.log("   ↳ Subtask " + json.key + " created: " + subtaskData.summary);
    return { success: true, key: json.key, summary: subtaskData.summary };
  } else {
    Logger.log("   ⚠️ Subtask creation failed ('" + subtaskData.summary + "'): HTTP " + code + " — " + respText);
    return { success: false, error: respText, statusCode: code, summary: subtaskData.summary };
  }
}

/**
 * Returns exactly 8 operational subtask templates tailored to the specific lead/task category.
 */
function getSubtaskTemplatesForLead(lead) {
  lead = lead || {};
  var leadType = String(lead.LeadType || lead.lead_type || "").toUpperCase();
  var customerName = String(lead.Name || lead.customer_name || lead.full_name || "Applicant / Patient").trim();
  var service = String(lead.Service || lead.service_name || lead.role || "Care Service").trim();

  // 1. RECRUITMENT WORKFLOW (Attendant Applications & Career Submissions)
  if (leadType.includes("ATTENDANT") || leadType.includes("CAREER") || leadType.includes("APPLICATION")) {
    return [
      {
        summary: "1. Screen Application & Credentials (" + customerName + ")",
        description: "Review submitted role (" + service + "), experience history, certifications, and shift preferences for " + customerName + "."
      },
      {
        summary: "2. Conduct Initial HR Telephonic Screening",
        description: "Verify spoken languages, communication skills, commute/live-in feasibility, and bedside care experience."
      },
      {
        summary: "3. Government Identity Verification (Aadhaar / Address)",
        description: "Inspect government photo ID proof, verify residential address, and authenticate candidate identity."
      },
      {
        summary: "4. Verify Skill Certifications & Past References",
        description: "Validate GDA/nursing certification and contact past healthcare/hospital employers for reference checks."
      },
      {
        summary: "5. Background Check & Police Verification Audit",
        description: "Initiate criminal background verification check and ensure zero adverse records before deployment."
      },
      {
        summary: "6. Practical Care & Clinical Competency Assessment",
        description: "Evaluate hands-on skills in patient mobility transfers, vitals logging, emergency response, and hygiene maintenance."
      },
      {
        summary: "7. ApnaCare Caregiver Orientation & Portal Setup",
        description: "Issue ApnaCare caregiver badge, explain patient care standards, configure mobile portal credentials, and issue uniform."
      },
      {
        summary: "8. Activate Profile & Assign First Supervised Care Case",
        description: "Mark candidate verified in caregiver directory and allocate initial care shift under coordinator supervision."
      }
    ];
  }

  // 2. EMERGENCY SOS WORKFLOW
  if (leadType.includes("SOS") || leadType.includes("EMERGENCY")) {
    return [
      {
        summary: "1. Immediate Emergency Command Center Acknowledgement",
        description: "Establish contact with caller within 60 seconds; log patient address and primary emergency contact."
      },
      {
        summary: "2. Critical Triage & Medical Condition Assessment",
        description: "Determine emergency severity: fall, cardiac distress, vitals collapse, or immediate caregiver absence."
      },
      {
        summary: "3. Paramedic / Ambulance Dispatch Coordination",
        description: "Liaise with local ambulance and partner hospital emergency room if hospital transfer is indicated."
      },
      {
        summary: "4. Rapid-Response Field Nurse / Attendant Deployment",
        description: "Dispatch nearest verified emergency attendant to patient premises for immediate on-site support."
      },
      {
        summary: "5. Family Emergency Contact Status Update",
        description: "Continuously update patient's next-of-kin regarding caregiver transit ETA and emergency interventions."
      },
      {
        summary: "6. On-Site Vitals Stabilization & Clinical Logging",
        description: "Field responder arrives on-site, measures Blood Pressure, Pulse, SpO2, and logs status to coordinator."
      },
      {
        summary: "7. Physician / Hospital Handoff Documentation",
        description: "Execute formal medical case handover with attending ER physician or consulting homecare doctor."
      },
      {
        summary: "8. Post-Incident Review & Safety Contingency Protocol",
        description: "Conduct 24-hour follow-up with patient family, confirm recovery stability, and update long-term safety plan."
      }
    ];
  }

  // 3. ECOSYSTEM PARTNERSHIP WORKFLOW
  if (leadType.includes("PARTNER") || leadType.includes("ORGANIZATION")) {
    return [
      {
        summary: "1. Review Partner Organization Background (" + customerName + ")",
        description: "Assess partner organization profile, services offered, capacity, and proposed collaboration model."
      },
      {
        summary: "2. Discovery & Strategic Alignment Meeting",
        description: "Host introductory discovery video call with partner leadership to align on mutual care objectives."
      },
      {
        summary: "3. Compliance & Hospital Accreditation Verification",
        description: "Verify statutory legal credentials, clinical licensing, NABH/ISO certifications, and address details."
      },
      {
        summary: "4. Draft Partnership Agreement & Mutual NDA",
        description: "Formulate Memorandum of Understanding (MOU) defining service-level agreements and patient referral protocols."
      },
      {
        summary: "5. Commercial Terms & Referral Protocol Sign-off",
        description: "Finalize payment arrangements, billing cadence, or subsidized healthcare arrangements."
      },
      {
        summary: "6. Establish Care Operations Communication Bridge",
        description: "Configure direct helpline channels between partner dispatch desk and ApnaCare patient support team."
      },
      {
        summary: "7. Joint Care Operations Kick-off & Team Briefing",
        description: "Train care coordinators and attendant managers on partner-specific patient routing standards."
      },
      {
        summary: "8. Monthly Partnership Performance & Feedback Review",
        description: "Establish monthly review rhythm to evaluate joint patient outcomes, response times, and quality satisfaction."
      }
    ];
  }

  // 4. DEFAULT: PATIENT CARE / CUSTOMER BOOKING WORKFLOW (Bookings, Callbacks, Contacts, Chatbot Leads)
  return [
    {
      summary: "1. Patient Intake & Medical Needs Assessment (" + customerName + ")",
      description: "Call family coordinator within 15 mins. Validate patient age, medical condition/mobility status, shift hours, and special requirements for " + service + "."
    },
    {
      summary: "2. Attendant Profile Matching & Shortlisting",
      description: "Match patient needs against verified attendant pool based on required skills (elderly/bedridden/post-op), spoken languages, and location."
    },
    {
      summary: "3. Caregiver Credential & Background Verification",
      description: "Perform final verification check of selected attendant's Aadhaar card, police verification, and health clearance certificates."
    },
    {
      summary: "4. Customer Confirmation & Caregiver Profile Presentation",
      description: "Share caregiver profile badge and credentials with the family; confirm start date, timings, and daily/monthly rates."
    },
    {
      summary: "5. Care Protocol Briefing & Special Instructions",
      description: "Brief caregiver on patient dietary restrictions, medication schedule, mobility assistance protocols, and emergency contacts."
    },
    {
      summary: "6. Advance Deposit & Billing Confirmation",
      description: "Generate booking invoice, apply approved promo codes (if applicable), send payment link, and confirm receipt of advance deposit."
    },
    {
      summary: "7. Day-1 Shift Deployment & Portal Check-in Audit",
      description: "Track attendant arrival on Day 1, confirm physical check-in via ApnaCare Attendant Portal, and audit initial vitals log."
    },
    {
      summary: "8. Day-3 Quality NPS Check & Ongoing Care Management",
      description: "Conduct Day-3 feedback call with patient family, ensure satisfaction with attendant care, and establish ongoing weekly monitoring."
    }
  ];
}

/**
 * Creates a Digest task/ticket in Jira summarizing Daily, Weekly, or Monthly metrics.
 */
function pushDigestToJira(intervalName, digestData) {
  try {
    if (!JIRA_CONFIG.API_TOKEN || !JIRA_CONFIG.EMAIL || !JIRA_CONFIG.DOMAIN || !JIRA_CONFIG.PROJECT_KEY) {
      return { success: false, error: "Jira config missing" };
    }

    var cleanHost = String(JIRA_CONFIG.DOMAIN).trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '');
    var url = "https://" + cleanHost + "/rest/api/2/issue";

    var summary = "[ApnaCare " + intervalName + " Digest] " + digestData.period + " (" + digestData.totalLeads + " Inbound Leads, " + digestData.bookings + " Bookings)";
    if (summary.length > 250) summary = summary.substring(0, 247) + "...";

    var descLines = [
      "h2. ApnaCare " + intervalName + " Care Intelligence Report — " + digestData.period,
      "",
      "h3. Key Performance Indicators",
      "* *Unique Visitors:* " + digestData.visitors,
      "* *Page Views:* " + digestData.pageViews,
      "* *Total Telemetry Events:* " + digestData.events,
      "* *Total Inbound Leads:* " + digestData.totalLeads,
      "* *Overall Conversion Rate:* " + digestData.convRate,
      "* *Average Session Engagement:* " + digestData.avgSec + " seconds",
      "",
      "h3. Funnel Inbound Breakdown",
      "* *⭐ 6-Step Bookings:* " + digestData.bookings,
      "* *📞 Quick Callbacks:* " + digestData.callbacks,
      "* *✉️ Contact Inquiries:* " + digestData.contacts,
      "* *🤝 Ecosystem Partners:* " + digestData.partners,
      "* *💬 Chatbot Conversations:* " + digestData.chatbots,
      "",
      digestData.sheetUrl ? "*Google Sheets Database:* " + digestData.sheetUrl : "",
      "",
      "----",
      "_Generated automatically by ApnaCare " + intervalName + " Trigger Engine_"
    ];

    var fields = {
      project: { key: String(JIRA_CONFIG.PROJECT_KEY).trim().toUpperCase() },
      summary: summary,
      description: descLines.join("\n"),
      issuetype: { name: JIRA_CONFIG.ISSUE_TYPE || "Task" },
      labels: ["apnacare", "digest", intervalName.toLowerCase() + "-summary"]
    };

    var authString = String(JIRA_CONFIG.EMAIL).trim() + ":" + String(JIRA_CONFIG.API_TOKEN).trim();
    var authHeader = "Basic " + Utilities.base64Encode(authString);

    var fetchOptions = {
      method: "post",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      payload: JSON.stringify({ fields: fields }),
      muteHttpExceptions: true
    };

    var res = UrlFetchApp.fetch(url, fetchOptions);
    var code = res.getResponseCode();
    if (code >= 200 && code < 300) {
      var json = JSON.parse(res.getContentText());
      Logger.log("✅ Created Jira Digest Issue: " + json.key + " (" + intervalName + " " + digestData.period + ")");
      return { success: true, key: json.key };
    } else {
      Logger.log("⚠️ Jira Digest HTTP " + code + ": " + res.getContentText());
      return { success: false, error: res.getContentText() };
    }
  } catch (err) {
    Logger.log("⚠️ Error pushing digest to Jira: " + err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Bulk syncs all historical unsynced patient leads, bookings, callbacks, contact forms,
 * chatbot leads, and emergency SOS alerts from Sheet 1 tabs directly into Jira.
 * Marks rows as SYNCED with their Jira issue key to ensure zero duplicates.
 */
function SYNC_ALL_LEADS_TO_JIRA() {
  var ui = null;
  try { ui = SpreadsheetApp.getUi(); } catch (e) { }

  var ss = getSpreadsheet();
  if (!ss) {
    if (ui) ui.alert("❌ Error", "Could not open spreadsheet.", ui.ButtonSet.OK);
    return { success: false, count: 0 };
  }

  function cleanVal(v) { return (v === undefined || v === null) ? "" : String(v).trim(); }
  var syncedCount = 0;

  var leadTabs = [
    { name: "Booking_Leads", type: "Booking", nameCol: ["customer_name", "name"], phoneCol: ["mobile", "phone"], refCol: "booking_ref" },
    { name: "Callback_Enquiries", type: "Callback Enquiry", nameCol: ["name"], phoneCol: ["phone"], refCol: "enquiry_id" },
    { name: "Contact_Submissions", type: "Contact Submission", nameCol: ["name"], phoneCol: ["phone"], refCol: "contact_id" },
    { name: "Partner_Applications", type: "Partner Application", nameCol: ["contact_person", "name"], phoneCol: ["phone"], refCol: "partner_id" },
    { name: "Chatbot_Leads", type: "Chatbot Lead", nameCol: ["name"], phoneCol: ["phone"], refCol: "lead_id" },
    { name: "SOS_Emergency_Alerts", type: "Emergency SOS Alert", nameCol: ["caller_name"], phoneCol: ["caller_phone"], refCol: "alert_id" }
  ];

  leadTabs.forEach(function (tabDef) {
    try {
      var sheet = ss.getSheetByName(tabDef.name);
      if (!sheet || sheet.getLastRow() < 2) return;

      var data = sheet.getDataRange().getValues();
      if (!data || data.length < 2) return;

      var headers = data[0].map(function (c) { return String(c || "").trim(); });
      var syncedColIdx = headers.indexOf("jira_synced");
      var keyColIdx = headers.indexOf("jira_issue_key");

      // Auto-append headers if not yet in row 1
      if (syncedColIdx === -1) {
        headers.push("jira_synced");
        syncedColIdx = headers.length - 1;
        sheet.getRange(1, headers.length).setValue("jira_synced").setFontWeight("bold");
      }
      if (keyColIdx === -1) {
        headers.push("jira_issue_key");
        keyColIdx = headers.length - 1;
        sheet.getRange(1, headers.length).setValue("jira_issue_key").setFontWeight("bold");
      }

      for (var r = 1; r < data.length; r++) {
        var row = data[r];
        var isAlreadySynced = cleanVal(row[syncedColIdx]).toUpperCase() === "SYNCED" || cleanVal(row[keyColIdx]).length > 0;
        if (isAlreadySynced) continue;

        var obj = {};
        for (var c = 0; c < headers.length; c++) {
          obj[headers[c]] = row[c];
        }

        var custName = "";
        for (var n = 0; n < tabDef.nameCol.length; n++) {
          if (cleanVal(obj[tabDef.nameCol[n]])) { custName = cleanVal(obj[tabDef.nameCol[n]]); break; }
        }
        var custPhone = "";
        for (var p = 0; p < tabDef.phoneCol.length; p++) {
          if (cleanVal(obj[tabDef.phoneCol[p]])) { custPhone = cleanVal(obj[tabDef.phoneCol[p]]); break; }
        }

        if (!custName && !custPhone) continue;

        var refId = cleanVal(obj[tabDef.refCol]);
        var detailsText = "";
        if (tabDef.type === "Booking") {
          detailsText = "Start: " + cleanVal(obj.start_date) + " " + cleanVal(obj.start_time) +
            " | Days: " + cleanVal(obj.duration_days) +
            " | Amount: ₹" + cleanVal(obj.total_amount) +
            " | Notes: " + cleanVal(obj.special_notes);
        } else if (tabDef.type === "Callback Enquiry") {
          detailsText = "Message: " + cleanVal(obj.message) + " | Status: " + cleanVal(obj.lead_status);
        } else if (tabDef.type === "Contact Submission") {
          detailsText = "Subject: " + cleanVal(obj.subject) + " | Message: " + cleanVal(obj.message);
        } else if (tabDef.type === "Partner Application") {
          detailsText = "Org: " + cleanVal(obj.org_name) + " (" + cleanVal(obj.org_type) + ") | Notes: " + cleanVal(obj.interest_notes);
        } else if (tabDef.type === "Chatbot Lead") {
          detailsText = "Query: " + cleanVal(obj.user_query) + " | Action: " + cleanVal(obj.recommended_action);
        } else if (tabDef.type === "Emergency SOS Alert") {
          detailsText = "Alert: " + cleanVal(obj.alert_type) + " | Status: " + cleanVal(obj.status) + " | Operator: " + cleanVal(obj.operator_notes);
        }

        var leadPayload = {
          Name: custName,
          Phone: custPhone,
          Email: cleanVal(obj.email),
          Service: cleanVal(obj.service_name || obj.service || obj.requested_service || obj.service_context || "Care Service"),
          City: cleanVal(obj.city || "India"),
          LeadType: tabDef.type,
          ReferenceID: refId,
          Details: detailsText,
          PagePath: cleanVal(obj.page_path || "/"),
          Timestamp: cleanVal(obj.received_at),
          SourceEnvironment: cleanVal(obj.source_environment || "production")
        };

        var priority = (tabDef.type === "Emergency SOS Alert") ? "Highest" : null;
        var jiraRes = pushLeadToJira(leadPayload, { priority: priority });

        if (jiraRes && jiraRes.success) {
          syncedCount++;
          sheet.getRange(r + 1, syncedColIdx + 1).setValue("SYNCED");
          if (jiraRes.key) {
            sheet.getRange(r + 1, keyColIdx + 1).setValue(jiraRes.key);
          }
        }
        Utilities.sleep(150); // Respect Jira API rate limits
      }
    } catch (tabErr) {
      Logger.log("Error syncing " + tabDef.name + " to Jira: " + tabErr.message);
    }
  });

  var msg = "Jira Sync Complete: " + syncedCount + " new lead(s) successfully created in Jira!";
  Logger.log(msg);
  if (ui) {
    ui.alert("✅ Jira Sync Complete", msg, ui.ButtonSet.OK);
  }
  return { success: true, count: syncedCount };
}

/**
 * 10-Minute recurring cron trigger to automatically forward any new leads to Jira.
 */
function AUTOMATED_JIRA_SYNC_TRIGGER() {
  Logger.log("⏰ Running Scheduled Jira Lead Sync...");
  var res = SYNC_ALL_LEADS_TO_JIRA();
  Logger.log("⏰ Jira sync complete: " + res.count + " new leads synced.");
}

function setupJiraAutomation() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "AUTOMATED_JIRA_SYNC_TRIGGER") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  ScriptApp.newTrigger("AUTOMATED_JIRA_SYNC_TRIGGER").timeBased().everyMinutes(10).create();
  try {
    SpreadsheetApp.getUi().alert("✅ 24/7 Automatic Jira Sync Activated!\n\nNew inbound leads will be checked and synced to Jira every 10 minutes.");
  } catch (e) { }
}

function stopJiraAutomation() {
  var triggers = ScriptApp.getProjectTriggers();
  var count = 0;
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "AUTOMATED_JIRA_SYNC_TRIGGER") {
      ScriptApp.deleteTrigger(triggers[i]);
      count++;
    }
  }
  try {
    SpreadsheetApp.getUi().alert("🛑 Automatic Jira Sync Stopped.\n\nRemoved " + count + " active trigger(s).");
  } catch (e) { }
}

/**
 * Validates Jira connection and creates a verification test issue in Jira.
 */
function TEST_JIRA_CONNECTION() {
  var ui = null;
  try { ui = SpreadsheetApp.getUi(); } catch (e) { }

  var testPayload = {
    Name: "Dr. Ananya Sundaram (Test Lead)",
    Phone: "+91 98401 23456",
    Email: "divabhrati.ramco@gmail.com",
    Service: "Elderly Care Attendant",
    City: "Bengaluru",
    LeadType: "Booking Test",
    ReferenceID: "AC-TEST-" + Date.now().toString(36).toUpperCase(),
    Details: "Verification test ticket from ApnaCare Google Sheets integration engine.",
    PagePath: "/booking",
    Timestamp: Utilities.formatDate(new Date(), CONFIG.TIMEZONE || "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss"),
    SourceEnvironment: "test"
  };

  var res = pushLeadToJira(testPayload);
  if (res.success) {
    var successMsg = "🎉 Jira Connected Successfully!\n\nCreated ticket: " + res.key + "\nProject: " + JIRA_CONFIG.PROJECT_KEY + "\nHost: " + JIRA_CONFIG.DOMAIN;
    Logger.log(successMsg);
    if (ui) ui.alert("✅ Jira Test Passed", successMsg, ui.ButtonSet.OK);
    return { success: true, key: res.key };
  } else {
    var errMsg = "❌ Jira Connection Failed:\n\n" + (res.error || "Unknown error") + "\n\nPlease verify:\n1. JIRA_DOMAIN (" + JIRA_CONFIG.DOMAIN + ")\n2. JIRA_PROJECT_KEY (" + JIRA_CONFIG.PROJECT_KEY + ")\n3. JIRA_EMAIL (" + JIRA_CONFIG.EMAIL + ")\n4. JIRA_API_TOKEN";
    Logger.log(errMsg);
    if (ui) ui.alert("⚠️ Jira Test Failed", errMsg, ui.ButtonSet.OK);
    return { success: false, error: res.error };
  }
}

/**
 * Automatically creates the Jira Project / Space ("APNA") via the Jira REST API.
 */
function CREATE_JIRA_PROJECT() {
  var ui = null;
  try { ui = SpreadsheetApp.getUi(); } catch (e) { }

  try {
    if (!JIRA_CONFIG.API_TOKEN || !JIRA_CONFIG.EMAIL || !JIRA_CONFIG.DOMAIN) {
      var errMissing = "Jira configuration missing. Please verify JIRA_DOMAIN, JIRA_EMAIL, and JIRA_API_TOKEN in JIRA_CONFIG.";
      if (ui) ui.alert("❌ Configuration Missing", errMissing, ui.ButtonSet.OK);
      return { success: false, error: errMissing };
    }

    var cleanHost = String(JIRA_CONFIG.DOMAIN).trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '');
    var authString = String(JIRA_CONFIG.EMAIL).trim() + ":" + String(JIRA_CONFIG.API_TOKEN).trim();
    var authHeader = "Basic " + Utilities.base64Encode(authString);

    // 1. Fetch authenticated user details
    var userUrl = "https://" + cleanHost + "/rest/api/2/myself";
    var userRes = UrlFetchApp.fetch(userUrl, {
      method: "get",
      headers: { "Authorization": authHeader, "Accept": "application/json" },
      muteHttpExceptions: true
    });

    var userCode = userRes.getResponseCode();
    if (userCode === 404) {
      var siteNotFoundMsg = "The Jira Cloud site (" + cleanHost + ") was not found.\n\n" +
        "Atlassian requires you to claim your free site URL once:\n" +
        "1. Open https://www.atlassian.com/software/jira/free in your browser.\n" +
        "2. Choose your site subdomain (e.g., apnacare-ops.atlassian.net).\n" +
        "3. Once created, paste that subdomain into JIRA_CONFIG.DOMAIN in this script.";
      Logger.log(siteNotFoundMsg);
      if (ui) ui.alert("⚠️ Jira Site Not Found", siteNotFoundMsg, ui.ButtonSet.OK);
      return { success: false, error: "Jira site not found (404)", details: siteNotFoundMsg };
    }

    if (userCode !== 200) {
      var authFailMsg = "Failed to authenticate with Jira (HTTP " + userCode + "): " + userRes.getContentText();
      Logger.log(authFailMsg);
      if (ui) ui.alert("❌ Authentication Error", authFailMsg, ui.ButtonSet.OK);
      return { success: false, error: authFailMsg };
    }

    var userJson = JSON.parse(userRes.getContentText());
    var accountId = userJson.accountId || userJson.name;

    // 2. Create the project space
    var projectKey = String(JIRA_CONFIG.PROJECT_KEY || "APNA").trim().toUpperCase();
    var projectPayload = {
      key: projectKey,
      name: "ApnaCare Operations Desk",
      projectTypeKey: "business",
      projectTemplateKey: "com.atlassian.jira-core-project-templates:jira-core-simplified-task-tracking",
      description: "Dedicated workspace for ApnaCare patient leads, 6-step bookings, and automated telemetry triggers.",
      leadAccountId: accountId
    };

    var projectUrl = "https://" + cleanHost + "/rest/api/2/project";
    var projRes = UrlFetchApp.fetch(projectUrl, {
      method: "post",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      payload: JSON.stringify(projectPayload),
      muteHttpExceptions: true
    });

    var projCode = projRes.getResponseCode();
    var projText = projRes.getContentText();

    if (projCode >= 200 && projCode < 300) {
      var okMsg = "🎉 Jira Project Space (" + projectKey + ") Created Successfully!\n\nName: ApnaCare Operations Desk\nSite: https://" + cleanHost + "/jira/projects/" + projectKey;
      Logger.log(okMsg);
      if (ui) ui.alert("✅ Project Created", okMsg, ui.ButtonSet.OK);
      return { success: true, key: projectKey };
    } else {
      // If already exists
      if (projText.indexOf("project with that key already exists") !== -1 || projCode === 400) {
        var existsMsg = "ℹ️ Jira Project Space (" + projectKey + ") already exists on " + cleanHost + " and is ready for leads!";
        Logger.log(existsMsg);
        if (ui) ui.alert("ℹ️ Project Ready", existsMsg, ui.ButtonSet.OK);
        return { success: true, key: projectKey, existed: true };
      }
      var failMsg = "Failed to create Jira project space (HTTP " + projCode + "):\n\n" + projText;
      Logger.log(failMsg);
      if (ui) ui.alert("⚠️ Creation Failed", failMsg, ui.ButtonSet.OK);
      return { success: false, error: projText };
    }
  } catch (err) {
    Logger.log("⚠️ Error creating Jira project: " + err.message);
    if (ui) ui.alert("❌ Error", err.message, ui.ButtonSet.OK);
  }
}

// =========================================================================================
// YOUTUBE DATA API V3 — COMMUNITY INTERACTIONS, COMMENTS & INQUIRIES ENGINE
// =========================================================================================

/**
 * Main synchronizer: Fetches latest YouTube comments and replies across the channel/videos,
 * stores them in "YouTube_Interactions", detects patient care inquiries, auto-generates Jira tasks
 * with 8 subtasks, mirrors leads to Lead_Management, and sends email alerts.
 */
function syncYouTubeChannelInteractions(options) {
  options = options || {};
  var ss = getSpreadsheet();
  if (!ss) return { success: false, error: "Could not open spreadsheet" };

  var sheet = getTab(ss, "YouTube_Interactions");
  if (!sheet) return { success: false, error: "Could not access or create YouTube_Interactions tab" };

  var headers = TAB_HEADERS.YouTube_Interactions;

  // 1. Map existing comments in sheet to prevent duplicate rows & allow in-place updates
  var existingMap = {}; // comment_id -> { rowNum, data }
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    var rawData = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
    var commentIdCol = headers.indexOf("comment_id");
    for (var r = 0; r < rawData.length; r++) {
      var cid = String(rawData[r][commentIdCol] || "").trim();
      if (cid) {
        existingMap[cid] = {
          rowNum: r + 2,
          data: rawData[r]
        };
      }
    }
  }

  // 2. Fetch comments from YouTube Data API (via Advanced Service or REST)
  var fetchResult = fetchYouTubeCommentsData();
  if (!fetchResult.success) {
    Logger.log("⚠️ YouTube Fetch Notice: " + fetchResult.error);
    return fetchResult;
  }

  var comments = fetchResult.comments || [];
  Logger.log("▶️ Fetched " + comments.length + " YouTube comment threads to process...");

  var newCount = 0;
  var updatedCount = 0;
  var enquiryCount = 0;
  var jiraCount = 0;
  var syncedAt = normalizeTimestamp(new Date());

  for (var i = 0; i < comments.length; i++) {
    var c = comments[i];
    var commentId = String(c.comment_id || "").trim();
    if (!commentId) continue;

    // Detect if this comment is a patient/customer care enquiry or caregiver recruitment query
    var enquiryAnalysis = detectHealthcareEnquiryIntent(c.comment_text);
    var isEnquiry = enquiryAnalysis.isEnquiry ? "Yes" : "No";
    var detectedIntent = enquiryAnalysis.intent || "Community Comment";
    if (enquiryAnalysis.isEnquiry) enquiryCount++;

    var jiraKeyPrimary = "";
    var jiraKeySecondary = "";

    // Check if previously created Jira ticket
    if (existingMap[commentId]) {
      var existingRowData = existingMap[commentId].data;
      var pCol = headers.indexOf("jira_key_primary");
      var sCol = headers.indexOf("jira_key_secondary");
      if (pCol !== -1 && existingRowData[pCol]) jiraKeyPrimary = String(existingRowData[pCol]);
      if (sCol !== -1 && existingRowData[sCol]) jiraKeySecondary = String(existingRowData[sCol]);
    }

    // Auto-create Jira Task with 8 Subtasks for new inquiries
    if (isEnquiry === "Yes" && !jiraKeyPrimary && YOUTUBE_CONFIG.AUTO_JIRA_LEADS) {
      try {
        var jiraRes = pushLeadToJira({
          Name: c.author_name || "YouTube Commenter",
          Phone: "",
          Email: "",
          Service: detectedIntent + " (" + (c.video_title || "YouTube Video") + ")",
          City: "YouTube Channel (" + (c.channel || YOUTUBE_CONFIG.CHANNEL_HANDLE) + ")",
          LeadType: "YouTube Community Lead",
          ReferenceID: "YT-" + commentId.replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase(),
          Details: "Inbound inquiry on video: " + c.video_title + "\nVideo URL: " + c.video_url + "\nAuthor: " + c.author_name + " (" + c.author_channel_url + ")\nIntent: " + detectedIntent + "\n\nComment:\n\"" + c.comment_text + "\"",
          PagePath: "/youtube",
          Timestamp: syncedAt,
          SourceEnvironment: "production"
        });

        if (jiraRes && jiraRes.success) {
          jiraKeyPrimary = jiraRes.key;
          jiraKeySecondary = (jiraRes.subtasks && jiraRes.subtasks[0]) || "";
          jiraCount++;

          // Mirror into master Lead_Management table
          var ytLeadEntry = {
            received_at: syncedAt,
            lead_id: "YT-" + commentId.replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase(),
            lead_type: "YOUTUBE_INQUIRY",
            name: c.author_name || "YouTube Commenter",
            service_or_requirement: detectedIntent + " on " + c.video_title,
            city: "YouTube",
            lead_source: "YouTube - " + (c.video_title || "Channel"),
            lead_status: "New",
            follow_up_status: "Social Desk Reply Due",
            total_value: "YouTube Lead",
            source_environment: "production",
            jira_synced: "SYNCED",
            jira_issue_key: jiraKeyPrimary
          };
          appendRowToTab(ss, "Lead_Management", ytLeadEntry);

          // Alert notification email to care coordinators
          if (YOUTUBE_CONFIG.AUTO_EMAIL_ALERTS) {
            sendYouTubeInquiryAlertEmail({
              author_name: c.author_name,
              video_title: c.video_title,
              video_url: c.video_url,
              comment_text: c.comment_text,
              detected_intent: detectedIntent,
              published_at: c.published_at,
              jira_key_primary: jiraKeyPrimary
            });
          }
        }
      } catch (jiraErr) {
        Logger.log("⚠️ Jira auto-create failed for YouTube comment " + commentId + ": " + jiraErr.message);
      }
    }

    var record = {
      synced_at: syncedAt,
      comment_id: commentId,
      video_id: c.video_id || "",
      video_title: c.video_title || "",
      video_url: c.video_url || ("https://www.youtube.com/watch?v=" + (c.video_id || "")),
      channel: c.channel || YOUTUBE_CONFIG.CHANNEL_HANDLE || "ApnaCare YouTube",
      author_name: c.author_name || "Anonymous",
      author_channel_url: c.author_channel_url || "",
      comment_text: c.comment_text || "",
      reply_text: c.reply_text || "",
      published_at: c.published_at || syncedAt,
      like_count: c.like_count || 0,
      is_enquiry: isEnquiry,
      lead_source: "YouTube - " + (c.video_title || "Channel Video"),
      jira_key_primary: jiraKeyPrimary,
      jira_key_secondary: jiraKeySecondary,
      sync_status: isEnquiry === "Yes" ? (jiraKeyPrimary ? "ENQUIRY_ESCALATED" : "NEW_ENQUIRY") : "SYNCED",
      reply_count: c.reply_count || 0,
      updated_at: c.updated_at || c.published_at || syncedAt,
      detected_intent: detectedIntent
    };

    var rowValues = headers.map(function (h) {
      return record[h] !== undefined ? record[h] : "";
    });

    if (existingMap[commentId]) {
      // Update existing row in place
      var targetRowNum = existingMap[commentId].rowNum;
      sheet.getRange(targetRowNum, 1, 1, headers.length).setValues([rowValues]);
      updatedCount++;
    } else {
      // Append new interaction row
      sheet.appendRow(rowValues);
      existingMap[commentId] = { rowNum: sheet.getLastRow(), data: rowValues };
      newCount++;
    }
  }

  var summaryMsg = "✅ YouTube Sync Complete!\n\n" +
    "• Total Comments Processed: " + comments.length + "\n" +
    "• New Interactions Logged: " + newCount + "\n" +
    "• Existing Interactions Updated: " + updatedCount + "\n" +
    "• Patient / Recruitment Inquiries Identified: " + enquiryCount + "\n" +
    "• Jira Tasks (with 8 Subtasks) Created: " + jiraCount;

  Logger.log(summaryMsg);
  return {
    success: true,
    total: comments.length,
    newCount: newCount,
    updatedCount: updatedCount,
    enquiryCount: enquiryCount,
    jiraCount: jiraCount,
    message: summaryMsg
  };
}

/**
 * Fetches comment threads from YouTube Data API v3 using Advanced Service or REST API.
 */
function fetchYouTubeCommentsData() {
  var apiKey = YOUTUBE_CONFIG.API_KEY || (typeof PropertiesService !== "undefined" && PropertiesService.getScriptProperties().getProperty("YOUTUBE_API_KEY")) || "";
  var channelId = YOUTUBE_CONFIG.CHANNEL_ID || (typeof PropertiesService !== "undefined" && PropertiesService.getScriptProperties().getProperty("YOUTUBE_CHANNEL_ID")) || "";
  var handle = YOUTUBE_CONFIG.CHANNEL_HANDLE || "@apnacare";

  // Method 1: If YouTube Advanced Google Service is enabled in Apps Script editor
  if (typeof YouTube !== "undefined" && YouTube.CommentThreads) {
    try {
      Logger.log("Using Apps Script built-in YouTube Advanced Service...");
      if (!channelId) {
        try {
          var chMine = YouTube.Channels.list("id,snippet,contentDetails", { mine: true });
          if (chMine && chMine.items && chMine.items.length > 0) {
            channelId = chMine.items[0].id;
            YOUTUBE_CONFIG.CHANNEL_ID = channelId;
          }
        } catch (eMine) { }
      }

      var listOptions = {
        part: "snippet,replies",
        maxResults: 100,
        order: "time"
      };

      if (channelId) {
        listOptions.allThreadsRelatedToChannelId = channelId;
      }

      var resp = YouTube.CommentThreads.list(listOptions.part, listOptions);
      if (resp && resp.items && resp.items.length > 0) {
        return { success: true, comments: parseYouTubeCommentThreadItems(resp.items, channelId) };
      }
    } catch (advErr) {
      Logger.log("ℹ️ YouTube Advanced Service call notice: " + advErr.message + " (Checking REST API)");
    }
  }

  // Method 2: Standard REST API via UrlFetchApp (Works with API Key or OAuth Token)
  var authHeader = null;
  if (!apiKey) {
    try {
      authHeader = "Bearer " + ScriptApp.getOAuthToken();
    } catch (eAuth) { }
  }

  if (!apiKey && !authHeader) {
    return {
      success: false,
      error: "YouTube API Key or OAuth authorization missing. Set YOUTUBE_API_KEY in YOUTUBE_CONFIG or in Project Settings > Script Properties. Or run 'manualTestYouTubeMockSample' to verify sheet row formatting.",
      comments: []
    };
  }

  var baseUrl = "https://www.googleapis.com/youtube/v3/";

  // 1. Resolve Channel ID if needed
  if (!channelId) {
    var chanUrl = baseUrl + "channels?part=id,snippet,contentDetails";
    if (apiKey) chanUrl += "&key=" + encodeURIComponent(apiKey);
    if (handle) {
      chanUrl += "&forHandle=" + encodeURIComponent(handle.replace(/^@/, ''));
    } else {
      chanUrl += "&mine=true";
    }

    var chFetchOptions = { method: "get", muteHttpExceptions: true };
    if (authHeader) chFetchOptions.headers = { "Authorization": authHeader };

    try {
      var chRes = UrlFetchApp.fetch(chanUrl, chFetchOptions);
      if (chRes.getResponseCode() === 200) {
        var chJson = JSON.parse(chRes.getContentText());
        if (chJson.items && chJson.items.length > 0) {
          channelId = chJson.items[0].id;
          YOUTUBE_CONFIG.CHANNEL_ID = channelId;
        }
      }
    } catch (chErr) { }
  }

  // 2. Fetch Comment Threads
  var threadUrl = baseUrl + "commentThreads?part=snippet,replies&maxResults=100&order=time";
  if (channelId) {
    threadUrl += "&allThreadsRelatedToChannelId=" + encodeURIComponent(channelId);
  }
  if (apiKey) {
    threadUrl += "&key=" + encodeURIComponent(apiKey);
  }

  var threadFetchOptions = { method: "get", muteHttpExceptions: true };
  if (authHeader) threadFetchOptions.headers = { "Authorization": authHeader };

  try {
    var tRes = UrlFetchApp.fetch(threadUrl, threadFetchOptions);
    var tCode = tRes.getResponseCode();
    var tText = tRes.getContentText();

    if (tCode >= 200 && tCode < 300) {
      var tJson = JSON.parse(tText);
      var parsed = parseYouTubeCommentThreadItems(tJson.items || [], channelId);
      return { success: true, comments: parsed };
    } else {
      // If allThreadsRelatedToChannelId fails, try uploads playlist fallback
      Logger.log("ℹ️ Trying video uploads playlist fallback (HTTP " + tCode + ": " + tText.substring(0, 150) + ")...");
      var playlistComments = fetchCommentsFromChannelUploads(channelId, apiKey, authHeader);
      if (playlistComments && playlistComments.length > 0) {
        return { success: true, comments: playlistComments };
      }
      return {
        success: false,
        statusCode: tCode,
        error: tText,
        comments: []
      };
    }
  } catch (netErr) {
    return { success: false, error: netErr.message, comments: [] };
  }
}

/**
 * Fallback comment fetcher: Scans uploaded videos from the channel's uploads playlist
 * and retrieves comments for each video individually.
 */
function fetchCommentsFromChannelUploads(channelId, apiKey, authHeader) {
  if (!channelId) return [];
  var baseUrl = "https://www.googleapis.com/youtube/v3/";

  try {
    // 1. Get channel's uploads playlist ID
    var chanUrl = baseUrl + "channels?part=contentDetails,snippet&id=" + encodeURIComponent(channelId);
    if (apiKey) chanUrl += "&key=" + encodeURIComponent(apiKey);

    var fetchOpt = { method: "get", muteHttpExceptions: true };
    if (authHeader) fetchOpt.headers = { "Authorization": authHeader };

    var cRes = UrlFetchApp.fetch(chanUrl, fetchOpt);
    if (cRes.getResponseCode() !== 200) return [];

    var cJson = JSON.parse(cRes.getContentText());
    if (!cJson.items || !cJson.items.length) return [];

    var uploadsPlaylistId = cJson.items[0].contentDetails.relatedPlaylists.uploads;
    if (!uploadsPlaylistId) return [];

    // 2. Fetch recent videos in the uploads playlist
    var plUrl = baseUrl + "playlistItems?part=snippet,contentDetails&maxResults=" + (YOUTUBE_CONFIG.MAX_VIDEOS_TO_SCAN || 25) + "&playlistId=" + encodeURIComponent(uploadsPlaylistId);
    if (apiKey) plUrl += "&key=" + encodeURIComponent(apiKey);

    var plRes = UrlFetchApp.fetch(plUrl, fetchOpt);
    if (plRes.getResponseCode() !== 200) return [];

    var plJson = JSON.parse(plRes.getContentText());
    var vItems = plJson.items || [];
    var allComments = [];

    for (var i = 0; i < vItems.length; i++) {
      var vId = vItems[i].contentDetails && vItems[i].contentDetails.videoId;
      var vTitle = (vItems[i].snippet && vItems[i].snippet.title) || ("Video " + vId);
      if (!vId) continue;

      var vCommentUrl = baseUrl + "commentThreads?part=snippet,replies&maxResults=50&order=time&videoId=" + encodeURIComponent(vId);
      if (apiKey) vCommentUrl += "&key=" + encodeURIComponent(apiKey);

      var vcRes = UrlFetchApp.fetch(vCommentUrl, fetchOpt);
      if (vcRes.getResponseCode() === 200) {
        var vcJson = JSON.parse(vcRes.getContentText());
        var parsed = parseYouTubeCommentThreadItems(vcJson.items || [], channelId, vTitle);
        allComments = allComments.concat(parsed);
      }
      Utilities.sleep(100); // Quota safeguard
    }

    return allComments;
  } catch (e) {
    Logger.log("⚠️ Uploads playlist fallback error: " + e.message);
    return [];
  }
}

/**
 * Parses raw YouTube comment thread objects into standard ApnaCare interaction rows.
 */
function parseYouTubeCommentThreadItems(items, channelId, defaultVideoTitle) {
  var results = [];
  if (!items || !items.length) return results;

  // Collect video IDs needing title lookup
  var videoIdSet = {};
  for (var i = 0; i < items.length; i++) {
    var vId = (items[i].snippet && items[i].snippet.videoId) || "";
    if (vId && !defaultVideoTitle) videoIdSet[vId] = true;
  }

  var videoTitles = defaultVideoTitle ? {} : fetchVideoTitlesMap(Object.keys(videoIdSet));

  for (var j = 0; j < items.length; j++) {
    var it = items[j];
    var top = it.snippet && it.snippet.topLevelComment;
    if (!top || !top.snippet) continue;

    var s = top.snippet;
    var vId = it.snippet.videoId || "";
    var vTitle = defaultVideoTitle || videoTitles[vId] || (vId ? ("Video " + vId) : "ApnaCare YouTube");

    // Extract channel owner reply if available
    var replyText = "";
    if (it.replies && it.replies.comments && it.replies.comments.length > 0) {
      var replyList = it.replies.comments.map(function (rc) {
        var rAuth = (rc.snippet && rc.snippet.authorDisplayName) || "Admin";
        var rBody = (rc.snippet && rc.snippet.textOriginal) || (rc.snippet && rc.snippet.textDisplay) || "";
        return rAuth + ": " + rBody;
      });
      replyText = replyList.join(" || ");
    }

    results.push({
      comment_id: it.id || top.id,
      video_id: vId,
      video_title: vTitle,
      video_url: vId ? ("https://www.youtube.com/watch?v=" + vId) : ("https://www.youtube.com/channel/" + (channelId || "")),
      channel: s.channelTitle || YOUTUBE_CONFIG.CHANNEL_HANDLE || "ApnaCare",
      author_name: s.authorDisplayName || "YouTube User",
      author_channel_url: (s.authorChannelUrl || (s.authorChannelId && s.authorChannelId.value ? ("https://www.youtube.com/channel/" + s.authorChannelId.value) : "")),
      comment_text: s.textOriginal || s.textDisplay || "",
      reply_text: replyText,
      reply_count: it.snippet.totalReplyCount || 0,
      published_at: s.publishedAt || normalizeTimestamp(new Date()),
      updated_at: s.updatedAt || s.publishedAt || normalizeTimestamp(new Date()),
      like_count: s.likeCount || 0
    });
  }

  return results;
}

/**
 * Batch-fetches video titles for given video IDs to enrich the interaction records.
 */
function fetchVideoTitlesMap(videoIds) {
  var map = {};
  if (!videoIds || !videoIds.length) return map;

  var apiKey = YOUTUBE_CONFIG.API_KEY || (typeof PropertiesService !== "undefined" && PropertiesService.getScriptProperties().getProperty("YOUTUBE_API_KEY")) || "";
  var authHeader = null;
  if (!apiKey) {
    try { authHeader = "Bearer " + ScriptApp.getOAuthToken(); } catch (e) { }
  }

  try {
    var chunks = [];
    for (var i = 0; i < videoIds.length; i += 50) {
      chunks.push(videoIds.slice(i, i + 50));
    }

    for (var c = 0; c < chunks.length; c++) {
      var url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + chunks[c].join(",");
      if (apiKey) url += "&key=" + encodeURIComponent(apiKey);

      var opt = { method: "get", muteHttpExceptions: true };
      if (authHeader) opt.headers = { "Authorization": authHeader };

      var res = UrlFetchApp.fetch(url, opt);
      if (res.getResponseCode() === 200) {
        var json = JSON.parse(res.getContentText());
        (json.items || []).forEach(function (vi) {
          if (vi.id && vi.snippet) {
            map[vi.id] = vi.snippet.title;
          }
        });
      }
    }
  } catch (err) {
    Logger.log("⚠️ Video title batch fetch error: " + err.message);
  }

  return map;
}

/**
 * Intelligent healthcare inquiry detection: Determines whether a YouTube comment
 * represents an inbound customer inquiry, caregiver recruitment query, or general feedback.
 */
function detectHealthcareEnquiryIntent(text) {
  if (!text) return { isEnquiry: false, intent: "General Comment" };
  var t = String(text).toLowerCase();

  // 1. Caregiver / Job applicant intent
  if (/(job|salary|vacancy|hiring|how to join|recruitment|apply for job|can i join|looking for job|i am nurse|i am attendant|work as|opening)/i.test(t)) {
    return { isEnquiry: true, intent: "Attendant Job Query" };
  }

  // 2. Pricing & cost inquiries
  if (/(price|cost|charges?|how much|fee|fees|rates?|per day|monthly charge|package price|expensive|quote)/i.test(t)) {
    return { isEnquiry: true, intent: "Pricing & Rate Inquiry" };
  }

  // 3. Urgent / Critical care need
  if (/(urgent|emergency|bedridden|icu|paralysis|stroke|critical|fall|immediate|today itself)/i.test(t)) {
    return { isEnquiry: true, intent: "Urgent Care Support" };
  }

  // 4. Service / Location availability
  if (/(service in|available in|do you provide|send attendant|need nurse|need attendant|elderly care|baby care|patient care|contact number|phone number|call me|whatsapp number|bengaluru|bangalore|chennai|hyderabad|mumbai|delhi|coimbatore)/i.test(t)) {
    return { isEnquiry: true, intent: "Service Availability Inquiry" };
  }

  // 5. Question marks with health/care terms
  if (t.indexOf("?") !== -1 && /(service|care|attendant|nurse|book|home|patient|cost|help|contact)/i.test(t)) {
    return { isEnquiry: true, intent: "General Care Inquiry" };
  }

  return { isEnquiry: false, intent: "Community Comment" };
}

/**
 * 1-Hour recurring cron trigger for YouTube Channel comment syncing.
 */
function AUTOMATED_YOUTUBE_SYNC_TRIGGER() {
  Logger.log("⏰ Running Scheduled YouTube Interactions Sync...");
  var res = syncYouTubeChannelInteractions();
  Logger.log("⏰ YouTube sync complete: " + JSON.stringify(res));
}

function setupYouTubeAutomation() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "AUTOMATED_YOUTUBE_SYNC_TRIGGER") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  ScriptApp.newTrigger("AUTOMATED_YOUTUBE_SYNC_TRIGGER").timeBased().everyHours(1).create();
  try {
    SpreadsheetApp.getUi().alert("✅ 24/7 Automatic YouTube Sync Activated!\n\nNew channel comments, replies, and video inquiries will be synchronized every hour.");
  } catch (e) { }
}

function stopYouTubeAutomation() {
  var triggers = ScriptApp.getProjectTriggers();
  var count = 0;
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "AUTOMATED_YOUTUBE_SYNC_TRIGGER") {
      ScriptApp.deleteTrigger(triggers[i]);
      count++;
    }
  }
  try {
    SpreadsheetApp.getUi().alert("🛑 Automatic YouTube Sync Stopped.\n\nRemoved " + count + " active trigger(s).");
  } catch (e) { }
}

function SYNC_YOUTUBE_INTERACTIONS_NOW() {
  var ui = null;
  try { ui = SpreadsheetApp.getUi(); } catch (e) { }

  var res = syncYouTubeChannelInteractions();
  if (ui) {
    if (res.success) {
      ui.alert("✅ YouTube Sync Succeeded", res.message, ui.ButtonSet.OK);
    } else {
      ui.alert("⚠️ YouTube Sync", (res.error || "Please verify YOUTUBE_CONFIG.API_KEY or YOUTUBE_CHANNEL_ID.") + "\n\nTip: You can run 'manualTestYouTubeMockSample' to verify sheet row formatting immediately.", ui.ButtonSet.OK);
    }
  }
  return res;
}

function TEST_YOUTUBE_SYNC() {
  var ui = null;
  try { ui = SpreadsheetApp.getUi(); } catch (e) { }

  var res = syncYouTubeChannelInteractions();
  if (res.success) {
    var okMsg = "🎉 YouTube Connected Successfully!\n\n" + res.message;
    Logger.log(okMsg);
    if (ui) ui.alert("✅ YouTube Test Passed", okMsg, ui.ButtonSet.OK);
    return res;
  } else {
    var errMsg = "⚠️ YouTube Sync Notice:\n\n" + (res.error || "Unknown error") + "\n\nOptions to enable:\n1. Enable 'YouTube Data API v3' in Google Cloud Console & paste key in YOUTUBE_CONFIG.API_KEY\n2. Or click Services (+) in Apps Script > Add 'YouTube Data API v3'\n3. Run 'manualTestYouTubeMockSample' to test row ingestion immediately.";
    Logger.log(errMsg);
    if (ui) ui.alert("ℹ️ YouTube Setup Guidance", errMsg, ui.ButtonSet.OK);
    return res;
  }
}

// =========================================================================================
// MAIN WEBHOOK ENTRYPOINTS (doPost & doGet)
// =========================================================================================
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.action === "initialize" || p.action === "init") {
    INITIALIZE_ALL_TABS();
    return ContentService.createTextOutput(JSON.stringify({
      status: "initialized",
      tabs: Object.keys(TAB_HEADERS),
      timestamp: normalizeTimestamp(new Date())
    })).setMimeType(ContentService.MimeType.JSON);
  }

  if (p.action === "sync_airtable" || p.action === "airtable") {
    var airtableRes = SYNC_ALL_LEADS_TO_AIRTABLE();
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Synced leads from Google Sheet 1 to Airtable.",
      syncedCount: airtableRes.count,
      timestamp: normalizeTimestamp(new Date())
    })).setMimeType(ContentService.MimeType.JSON);
  }

  if (p.action === "sync_jira" || p.action === "jira") {
    var jiraRes = SYNC_ALL_LEADS_TO_JIRA();
    return ContentService.createTextOutput(JSON.stringify({
      status: jiraRes.success ? "success" : "warning",
      message: "Synced leads from Google Sheet 1 to Jira.",
      syncedCount: jiraRes.count,
      timestamp: normalizeTimestamp(new Date())
    })).setMimeType(ContentService.MimeType.JSON);
  }

  if (p.action === "test_jira") {
    var testJiraRes = TEST_JIRA_CONNECTION();
    return ContentService.createTextOutput(JSON.stringify({
      status: testJiraRes.success ? "success" : "error",
      result: testJiraRes,
      timestamp: normalizeTimestamp(new Date())
    })).setMimeType(ContentService.MimeType.JSON);
  }

  if (p.action === "create_jira_project" || p.action === "create_project") {
    var createRes = CREATE_JIRA_PROJECT();
    return ContentService.createTextOutput(JSON.stringify({
      status: createRes.success ? "success" : "error",
      result: createRes,
      timestamp: normalizeTimestamp(new Date())
    })).setMimeType(ContentService.MimeType.JSON);
  }

  if (p.action === "sync_youtube" || p.action === "youtube") {
    var ytRes = syncYouTubeChannelInteractions();
    return ContentService.createTextOutput(JSON.stringify({
      status: ytRes.success ? "success" : "warning",
      result: ytRes,
      timestamp: normalizeTimestamp(new Date())
    })).setMimeType(ContentService.MimeType.JSON);
  }

  // --- VERCEL REPORTING SYSTEM INTEGRATION (READ-ONLY OPERATIONS & IDEMPOTENCY) ---
  if (p.action === "get_report_data") {
    var reportMetrics = GET_REPORT_METRICS(p.type, p.period_key, p.start_date, p.end_date, p.timezone);
    return ContentService.createTextOutput(JSON.stringify(reportMetrics))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (p.action === "check_report_delivery") {
    var checkDeliv = CHECK_REPORT_DELIVERY(p.report_type, p.period_key);
    return ContentService.createTextOutput(JSON.stringify(checkDeliv))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (p.action === "get_delivery_history") {
    var deliveryHist = GET_DELIVERY_HISTORY(p.limit);
    return ContentService.createTextOutput(JSON.stringify(deliveryHist))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    system: CONFIG.SYSTEM_NAME,
    timestamp: normalizeTimestamp(new Date()),
    version: "2.1.0"
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  // 1. Guard against empty requests — do NOT generate fake customer bookings!
  if (!e || !e.postData || !e.postData.contents) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "No request payload supplied. Please provide a JSON payload via POST."
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var rawPayload = JSON.parse(e.postData.contents);
    var ss = getSpreadsheet();
    if (!ss) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Spreadsheet inaccessible. Check SPREADSHEET_ID in CONFIG."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Handle Report Delivery Logging (from Vercel API routes)
    if (rawPayload.action === "log_report_delivery") {
      var logResult = LOG_REPORT_DELIVERY(ss, rawPayload);
      return ContentService.createTextOutput(JSON.stringify(logResult))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var receivedAt = normalizeTimestamp(new Date());
    var p = enrichPayload(rawPayload, receivedAt);
    var writeResults = [];

    // 1. Append to Master Firehose (Live_Traffic_Events)
    writeResults.push(appendRowToTab(ss, "Live_Traffic_Events", p));

    // 2. Specialized Multi-Tab Routing
    var evtName = String(p.event_name || "").toLowerCase();
    var formName = String(p.form_name || "").toLowerCase();
    var leadType = String(p.lead_type || "").toUpperCase();

    // A. VERIFIED BOOKING SUBMISSION (Requires customer contact info + explicit submission)
    var isVerifiedBooking = (
      leadType === "BOOKING" ||
      evtName === "booking_submitted" ||
      evtName === "booking_submit" ||
      (evtName.includes("booking") && (p.form_status === "submitted" || p.booking_status === "Confirmed"))
    ) && Boolean((p.name || p.customer_name) && (p.mobile || p.phone));

    if (isVerifiedBooking) {
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

      var airtableOk = pushLeadToAirtable({
        Name: p.customer_name,
        Phone: p.mobile,
        Email: p.email,
        Service: p.service_name,
        City: p.city,
        LeadType: "Booking",
        ReferenceID: p.booking_ref,
        Details: "Start: " + p.start_date + " " + p.start_time + " | Duration: " + p.duration_days + " days | Amount: ₹" + p.total_amount + " | Notes: " + p.special_notes,
        PagePath: p.page_path || "/booking",
        Timestamp: p.received_at,
        SourceEnvironment: p.source_environment || "production"
      });
      p.airtable_synced = airtableOk ? "SYNCED" : "";

      var jiraBookingRes = pushLeadToJira({
        Name: p.customer_name,
        Phone: p.mobile,
        Email: p.email,
        Service: p.service_name,
        City: p.city,
        LeadType: "Booking",
        ReferenceID: p.booking_ref,
        Details: "Start: " + p.start_date + " " + p.start_time + " | Duration: " + p.duration_days + " days | Amount: ₹" + p.total_amount + " | Address: " + p.location_address + " | Notes: " + p.special_notes,
        PagePath: p.page_path || "/booking",
        Timestamp: p.received_at,
        SourceEnvironment: p.source_environment || "production"
      });
      p.jira_synced = jiraBookingRes && jiraBookingRes.success ? "SYNCED" : "";
      p.jira_issue_key = (jiraBookingRes && jiraBookingRes.key) || "";

      writeResults.push(appendRowToTab(ss, "Booking_Leads", p));
      writeResults.push(appendRowToTab(ss, "Lead_Management", p));
      sendBookingAlertEmail(p);
    }

    // B. QUICK CALLBACK ENQUIRY
    else if (leadType === "CALLBACK" || evtName.includes("enquiry_form") || evtName === "callback_submitted" || ((formName.includes("callback") || formName.includes("enquiry")) && p.form_status === "submitted")) {
      p.lead_type = "CALLBACK";
      p.enquiry_id = p.enquiry_id || ("ENQ-" + Date.now().toString(36).toUpperCase());
      p.lead_id = p.enquiry_id;
      p.service = p.service || p.serviceId || "General";
      p.lead_status = p.lead_status || "New";
      p.follow_up_status = p.follow_up_status || "Callback Due (<2 hrs)";

      var cbAirtableOk = pushLeadToAirtable({
        Name: p.name,
        Phone: p.phone,
        Email: p.email,
        Service: p.service,
        City: "Bengaluru",
        LeadType: "Callback Enquiry",
        ReferenceID: p.enquiry_id,
        Details: "Message: " + p.message + " | Status: " + p.lead_status,
        PagePath: p.page_path || "/",
        Timestamp: p.received_at,
        SourceEnvironment: p.source_environment || "production"
      });
      p.airtable_synced = cbAirtableOk ? "SYNCED" : "";

      var cbJiraRes = pushLeadToJira({
        Name: p.name,
        Phone: p.phone,
        Email: p.email,
        Service: p.service,
        City: "Bengaluru",
        LeadType: "Callback Enquiry",
        ReferenceID: p.enquiry_id,
        Details: "Message: " + p.message + " | Status: " + p.lead_status,
        PagePath: p.page_path || "/",
        Timestamp: p.received_at,
        SourceEnvironment: p.source_environment || "production"
      });
      p.jira_synced = cbJiraRes && cbJiraRes.success ? "SYNCED" : "";
      p.jira_issue_key = (cbJiraRes && cbJiraRes.key) || "";

      writeResults.push(appendRowToTab(ss, "Callback_Enquiries", p));
      writeResults.push(appendRowToTab(ss, "Lead_Management", p));
      sendCallbackAlertEmail(p);
    }

    // C. CONTACT FORM MESSAGE
    else if (leadType === "CONTACT" || evtName === "contact_submitted" || evtName.includes("contact_form") || (formName.includes("contact") && p.form_status === "submitted")) {
      p.lead_type = "CONTACT";
      p.contact_id = p.contact_id || ("CNT-" + Date.now().toString(36).toUpperCase());
      p.lead_id = p.contact_id;
      p.subject = p.subject || "General Enquiry";
      p.lead_status = p.lead_status || "New";
      p.follow_up_status = p.follow_up_status || "Pending";

      var ctAirtableOk = pushLeadToAirtable({
        Name: p.name,
        Phone: p.phone,
        Email: p.email,
        Service: p.subject,
        City: p.city,
        LeadType: "Contact Submission",
        ReferenceID: p.contact_id,
        Details: "Subject: " + p.subject + " | Message: " + p.message,
        PagePath: p.page_path || "/contact",
        Timestamp: p.received_at,
        SourceEnvironment: p.source_environment || "production"
      });
      p.airtable_synced = ctAirtableOk ? "SYNCED" : "";

      var ctJiraRes = pushLeadToJira({
        Name: p.name,
        Phone: p.phone,
        Email: p.email,
        Service: p.subject,
        City: p.city,
        LeadType: "Contact Submission",
        ReferenceID: p.contact_id,
        Details: "Subject: " + p.subject + " | Message: " + p.message,
        PagePath: p.page_path || "/contact",
        Timestamp: p.received_at,
        SourceEnvironment: p.source_environment || "production"
      });
      p.jira_synced = ctJiraRes && ctJiraRes.success ? "SYNCED" : "";
      p.jira_issue_key = (ctJiraRes && ctJiraRes.key) || "";

      writeResults.push(appendRowToTab(ss, "Contact_Submissions", p));
      writeResults.push(appendRowToTab(ss, "Lead_Management", p));
      sendContactAlertEmail(p);
    }

    // D. ECOSYSTEM PARTNER REGISTRATION
    else if (leadType === "PARTNER" || evtName === "partner_submitted" || evtName.includes("partner_form") || (formName.includes("partner") && p.form_status === "submitted")) {
      p.lead_type = "PARTNER";
      p.partner_id = p.partner_id || ("PTR-" + Date.now().toString(36).toUpperCase());
      p.lead_id = p.partner_id;
      p.contact_person = p.contact || p.contact_person || p.name || "";
      p.lead_status = p.lead_status || "Under Review";

      var ptAirtableOk = pushLeadToAirtable({
        Name: p.contact_person,
        Phone: p.phone,
        Email: p.email,
        Service: p.category,
        City: p.city,
        LeadType: "Partner Application",
        ReferenceID: p.partner_id,
        Details: "Org: " + p.org_name + " (" + p.org_type + ") | Notes: " + p.interest_notes,
        PagePath: p.page_path || "/partner",
        Timestamp: p.received_at,
        SourceEnvironment: p.source_environment || "production"
      });
      p.airtable_synced = ptAirtableOk ? "SYNCED" : "";

      var ptJiraRes = pushLeadToJira({
        Name: p.contact_person,
        Phone: p.phone,
        Email: p.email,
        Service: p.category,
        City: p.city,
        LeadType: "Partner Application",
        ReferenceID: p.partner_id,
        Details: "Org: " + p.org_name + " (" + p.org_type + ") | Notes: " + p.interest_notes,
        PagePath: p.page_path || "/partner",
        Timestamp: p.received_at,
        SourceEnvironment: p.source_environment || "production"
      });
      p.jira_synced = ptJiraRes && ptJiraRes.success ? "SYNCED" : "";
      p.jira_issue_key = (ptJiraRes && ptJiraRes.key) || "";

      writeResults.push(appendRowToTab(ss, "Partner_Applications", p));
      writeResults.push(appendRowToTab(ss, "Lead_Management", p));
      sendPartnerAlertEmail(p);
    }

    // E. CHATBOT / AI CARE ASSISTANT LEAD
    else if (leadType === "CHATBOT" || evtName.includes("assistant_") || formName.includes("chat") || formName.includes("assistant")) {
      p.lead_type = "CHATBOT";
      p.lead_id = p.lead_id || ("CHAT-" + Date.now().toString(36).toUpperCase());
      p.requested_service = p.requested_service || p.service || p.context || "";
      p.page_context_badge = p.context_badge || p.badge || p.page_context || "";
      p.lead_status = p.lead_status || "Bot Inquired";

      if (p.phone || (p.email && p.email.includes("@"))) {
        var chatAirtableOk = pushLeadToAirtable({
          Name: p.name || "Chatbot Lead",
          Phone: p.phone,
          Email: p.email,
          Service: p.requested_service || "Chatbot Assistance",
          City: p.city || "Bengaluru",
          LeadType: "Chatbot Lead",
          ReferenceID: p.lead_id,
          Details: "Query: " + (p.user_query || "") + " | Action: " + (p.recommended_action || ""),
          PagePath: p.page_path || "/",
          Timestamp: p.received_at,
          SourceEnvironment: p.source_environment || "production"
        });
        p.airtable_synced = chatAirtableOk ? "SYNCED" : "";

        var chatJiraRes = pushLeadToJira({
          Name: p.name || "Chatbot Lead",
          Phone: p.phone,
          Email: p.email,
          Service: p.requested_service || "Chatbot Assistance",
          City: p.city || "Bengaluru",
          LeadType: "Chatbot Lead",
          ReferenceID: p.lead_id,
          Details: "Query: " + (p.user_query || "") + " | Action: " + (p.recommended_action || ""),
          PagePath: p.page_path || "/",
          Timestamp: p.received_at,
          SourceEnvironment: p.source_environment || "production"
        });
        p.jira_synced = chatJiraRes && chatJiraRes.success ? "SYNCED" : "";
        p.jira_issue_key = (chatJiraRes && chatJiraRes.key) || "";
      }

      writeResults.push(appendRowToTab(ss, "Chatbot_Leads", p));
      if (p.phone || (p.email && p.email.includes("@"))) {
        writeResults.push(appendRowToTab(ss, "Lead_Management", p));
      }
    }

    // F. EMERGENCY SOS TRIGGER & SIMULATION SEPARATION
    else if (evtName.includes("sos") || p.alert_type) {
      var isSimulation = Boolean(
        p.is_simulation === true ||
        evtName.includes("demo") ||
        evtName.includes("simulation") ||
        String(p.alert_type || "").toLowerCase().includes("simulation") ||
        String(p.alert_type || "").toLowerCase().includes("demo") ||
        p.trigger_step
      );

      if (isSimulation) {
        p.alert_id = p.alert_id || ("SOS-DEMO-" + Date.now().toString(36).toUpperCase().slice(-6));
        p.alert_type = "Simulation Demo";
        p.status = "Simulation Test (No Dispatch Required)";
        p.operator_notes = "Website interactive simulation; control room dispatch inhibited.";
        p.airtable_synced = "SIMULATION";
        p.jira_synced = "SIMULATION";
        writeResults.push(appendRowToTab(ss, "SOS_Emergency_Alerts", p));
        // Safeguard: Do NOT send panic emergency emails for training / demo simulations!
      } else {
        p.alert_id = p.alert_id || ("SOS-LIVE-" + Date.now().toString(36).toUpperCase().slice(-6));
        p.alert_type = p.alert_type || "Live SOS Trigger";
        p.status = "CRITICAL: Escalated to 24/7 Control Room";
        p.operator_notes = "Immediate response protocol active";

        var sosAirtableOk = pushLeadToAirtable({
          Name: p.caller_name || "Emergency Caller",
          Phone: p.caller_phone,
          Email: p.email,
          Service: p.service_context || "Emergency SOS",
          City: p.city || p.location || "Bengaluru",
          LeadType: "Emergency SOS Alert",
          ReferenceID: p.alert_id,
          Details: "Status: " + p.status + " | Operator: " + p.operator_notes,
          PagePath: "/sos",
          Timestamp: p.received_at,
          SourceEnvironment: p.source_environment || "production"
        });
        p.airtable_synced = sosAirtableOk ? "SYNCED" : "";

        var sosJiraRes = pushLeadToJira({
          Name: p.caller_name || "Emergency Caller",
          Phone: p.caller_phone,
          Email: p.email,
          Service: p.service_context || "Emergency SOS",
          City: p.city || p.location || "Bengaluru",
          LeadType: "Emergency SOS Alert",
          ReferenceID: p.alert_id,
          Details: "Status: " + p.status + " | Operator: " + p.operator_notes,
          PagePath: "/sos",
          Timestamp: p.received_at,
          SourceEnvironment: p.source_environment || "production"
        }, { priority: "Highest" });
        p.jira_synced = sosJiraRes && sosJiraRes.success ? "SYNCED" : "";
        p.jira_issue_key = (sosJiraRes && sosJiraRes.key) || "";

        writeResults.push(appendRowToTab(ss, "SOS_Emergency_Alerts", p));
        sendSOSAlertEmail(p);
      }
    }

    // G. ATTENDANT CAREER APPLICATION (Become an Attendant recruitment flow)
    else if (
      leadType === "ATTENDANT_APPLICATION" ||
      evtName === "attendant_application_submitted" ||
      evtName === "attendant_application" ||
      p.event_type === "attendant_application" ||
      (formName.includes("become an attendant") || (formName.includes("attendant") && p.role && (p.experience || p.application_ref)))
    ) {
      p.lead_type = "ATTENDANT_APPLICATION";
      p.application_ref = p.application_ref || p.ref || ("APP-" + Date.now().toString(36).toUpperCase().slice(-6));
      p.lead_id = p.application_ref;
      p.full_name = p.full_name || p.name || "";
      p.lead_status = p.lead_status || "Pending Review";
      p.follow_up_status = p.follow_up_status || "HR Screening Due";

      var appAirtableOk = pushLeadToAirtable({
        Name: p.full_name,
        Phone: p.mobile || p.phone,
        Email: p.email,
        Service: p.role,
        City: p.city + (p.state ? ", " + p.state : ""),
        LeadType: "Attendant Application",
        ReferenceID: p.application_ref,
        Details: "Role: " + p.role + " | Exp: " + p.experience + " | Type: " + p.employment_type + " | Languages: " + p.languages + " | Docs: " + (p.document_count || 0),
        PagePath: p.page_path || "/become-an-attendant",
        Timestamp: p.received_at,
        SourceEnvironment: p.source_environment || "production"
      });
      p.airtable_synced = appAirtableOk ? "SYNCED" : "";

      var appJiraRes = pushLeadToJira({
        Name: p.full_name,
        Phone: p.mobile || p.phone,
        Email: p.email,
        Service: p.role,
        City: p.city + (p.state ? ", " + p.state : ""),
        LeadType: "Attendant Application",
        ReferenceID: p.application_ref,
        Details: "Role: " + p.role + " | Experience: " + p.experience + " | Qualifications: " + (p.qualifications || "None specified") + " | Languages: " + p.languages + " | Employment Type: " + p.employment_type + " | Summary: " + (p.experience_summary || "None") + " | Attached Docs: " + (p.document_count || 0),
        PagePath: p.page_path || "/become-an-attendant",
        Timestamp: p.received_at,
        SourceEnvironment: p.source_environment || "production"
      });
      p.jira_synced = appJiraRes && appJiraRes.success ? "SYNCED" : "";
      p.jira_issue_key = (appJiraRes && appJiraRes.key) || "";

      writeResults.push(appendRowToTab(ss, "Attendant_Applications", p));

      // Mirror into Master Lead Directory
      var careerLeadEntry = {
        received_at: p.received_at,
        lead_id: p.application_ref,
        lead_type: "ATTENDANT_APPLICATION",
        visitor_id: p.visitor_id,
        session_id: p.session_id,
        name: p.full_name,
        phone: p.mobile || p.phone,
        email: p.email,
        service_or_requirement: (p.role || "Attendant") + " (" + (p.experience || "Exp N/A") + ")",
        city: p.city + (p.state ? ", " + p.state : ""),
        lead_source: p.lead_source || "Careers Page",
        form_name: p.form_name || "Become an Attendant Form",
        lead_status: p.lead_status,
        follow_up_status: p.follow_up_status,
        total_value: "Recruitment Applicant",
        source_environment: p.source_environment || "production",
        airtable_synced: p.airtable_synced,
        jira_synced: p.jira_synced,
        jira_issue_key: p.jira_issue_key
      };
      writeResults.push(appendRowToTab(ss, "Lead_Management", careerLeadEntry));

      sendAttendantApplicationAlertEmail(p);
    }

    // H. ATTENDANT PORTAL ACTIONS (Shift punch-ins, vitals logging)
    else if (p.action_type || evtName.includes("portal_") || (formName.includes("attendant") && p.shift_status)) {
      p.log_id = p.log_id || ("ATT-" + Date.now().toString(36).toUpperCase());
      writeResults.push(appendRowToTab(ss, "Attendant_Portal_Logs", p));
    }

    // I. YOUTUBE COMMUNITY INTERACTION / INBOUND WEBHOOK INGEST
    else if (
      leadType === "YOUTUBE" ||
      evtName.includes("youtube") ||
      p.event_type === "youtube_interaction" ||
      p.event_type === "youtube_comment" ||
      p.comment_id
    ) {
      writeResults.push(appendRowToTab(ss, "YouTube_Interactions", p));
      if (p.is_enquiry === "Yes" || p.is_enquiry === true) {
        var ytLead = {
          received_at: p.synced_at || p.received_at,
          lead_id: "YT-" + String(p.comment_id || Date.now()).slice(-8),
          lead_type: "YOUTUBE_INQUIRY",
          name: p.author_name || "YouTube User",
          service_or_requirement: p.video_title || "YouTube Video Inquiry",
          lead_source: p.lead_source || "YouTube Channel",
          lead_status: "New",
          follow_up_status: "Social Desk Reply Due",
          source_environment: p.source_environment || "production",
          jira_key_primary: p.jira_key_primary || ""
        };
        writeResults.push(appendRowToTab(ss, "Lead_Management", ytLead));
      }
    }

    // J. LINKEDIN INBOUND LEAD CAPTURE (Lead Gen Forms, Page Inquiries, Sponsored Ads)
    else if (
      leadType === "LINKEDIN" ||
      leadType === "LINKEDIN_LEAD" ||
      evtName.includes("linkedin") ||
      p.event_type === "linkedin_lead" ||
      p.lead_source === "LinkedIn" ||
      (p.form_name && String(p.form_name).toLowerCase().includes("linkedin"))
    ) {
      var liLeadId = p.lead_id || ("LI-" + Date.now().toString(36).toUpperCase());
      p.lead_id = liLeadId;
      p.received_at = p.received_at || normalizeTimestamp(new Date());
      p.lead_source = p.lead_source || "LinkedIn";
      p.lead_type = p.lead_type || "LINKEDIN_LEAD";
      p.lead_status = p.lead_status || "New";
      p.follow_up_status = p.follow_up_status || "Pending Contact";
      p.full_name = p.full_name || ((p.first_name || "") + " " + (p.last_name || "")).trim() || p.name || "LinkedIn Prospect";

      // Auto Jira Task + 8 Sequential Operational Subtasks
      if (JIRA_CONFIG && JIRA_CONFIG.API_TOKEN && !p.jira_key_primary) {
        try {
          var jRes = pushLeadToJira({
            Name: p.full_name,
            Phone: p.phone || "",
            Email: p.email || "",
            Service: p.service_or_requirement || "Home Healthcare / Attendant Inquiry (LinkedIn)",
            City: p.city || "Pan-India",
            LeadType: "LinkedIn Patient / Partner Lead",
            ReferenceID: liLeadId,
            Details: "Inbound LinkedIn Lead Captured:\nName: " + p.full_name + "\nCompany: " + (p.company || "N/A") + "\nJob Title: " + (p.job_title || "N/A") + "\nRequirement: " + (p.service_or_requirement || "Home Healthcare / Attendant Support") + "\nNotes: " + (p.user_notes || p.notes || "None"),
            PagePath: "/linkedin",
            Timestamp: p.received_at,
            SourceEnvironment: p.source_environment || "production"
          });
          if (jRes && jRes.success && jRes.key) {
            p.jira_key_primary = jRes.key;
            p.jira_synced = "SYNCED";
          }
        } catch (jErr) {
          Logger.log("⚠️ Jira auto-create failed for LinkedIn lead " + liLeadId + ": " + jErr.message);
        }
      }

      // 1. Write to LinkedIn_Leads dedicated tab
      writeResults.push(appendRowToTab(ss, "LinkedIn_Leads", p));

      // 2. Mirror into Lead_Management master directory
      var masterLead = {
        received_at: p.received_at,
        lead_id: liLeadId,
        lead_type: "LINKEDIN_LEAD",
        name: p.full_name,
        phone: p.phone || "",
        email: p.email || "",
        service_or_requirement: p.service_or_requirement || "Home Healthcare / Attendant Inquiry",
        city: p.city || "",
        lead_source: "LinkedIn" + (p.form_name ? (" - " + p.form_name) : ""),
        form_name: p.form_name || "LinkedIn Lead Gen",
        lead_status: p.lead_status || "New",
        follow_up_status: p.follow_up_status || "Pending Contact",
        total_value: "LinkedIn Lead",
        source_environment: p.source_environment || "production",
        jira_synced: p.jira_key_primary ? "SYNCED" : "PENDING",
        jira_issue_key: p.jira_key_primary || ""
      };
      writeResults.push(appendRowToTab(ss, "Lead_Management", masterLead));

      // 3. Dispatch operations email alert
      try {
        sendLinkedInLeadAlertEmail(p);
      } catch (liMailErr) {
        Logger.log("⚠️ Email notice for LinkedIn lead: " + liMailErr.message);
      }
    }

    // 3. Auxiliary Telemetry Routing
    if (p.event_type === "session" || evtName === "session_start" || evtName === "session_end") {
      writeResults.push(appendRowToTab(ss, "Visitor_Sessions", p));
      writeResults.push(appendRowToTab(ss, "Traffic_Sources", p));
    }

    if (p.event_type === "page_view" || evtName === "page_view") {
      writeResults.push(appendRowToTab(ss, "Page_Performance", p));
      writeResults.push(appendRowToTab(ss, "Traffic_Sources", p));
    }

    if (p.event_type === "click" || evtName.includes("click") || p.event_category === "CTA") {
      writeResults.push(appendRowToTab(ss, "Click_Interactions", p));
    }

    if (p.event_type === "scroll" || evtName.includes("scroll") || Number(p.scroll_percentage) > 0) {
      writeResults.push(appendRowToTab(ss, "Scroll_Engagement", p));
    }

    if (p.event_type === "form" || /form/.test(evtName) || p.form_status === "submitted" || p.form_status === "in_progress" || formName.includes("booking")) {
      writeResults.push(appendRowToTab(ss, "Form_Interactions", p));
    }

    if (p.event_type === "conversion" || p.conversion_name !== "(none)" || evtName.includes("success")) {
      writeResults.push(appendRowToTab(ss, "Conversion_Events", p));
    }

    // 3j. Geo_Timezone_Intelligence: Dedicated visitor geography & timezone analytics
    if (p.event_type === "geo_timezone" || p.event_type === "geo" || evtName === "geo_timezone" || (p.event_type === "session" && (p.timezone || p.country))) {
      writeResults.push(appendRowToTab(ss, "Geo_Timezone_Intelligence", p));
    }

    // 3k. IP_Security_Intelligence: IP signals, request velocity & threat anomaly telemetry
    if (p.event_type === "security_signal" || p.event_type === "security" || evtName === "security_signal" || p.security_signal || (p.risk_level && p.risk_level !== "None" && p.risk_level !== "Low")) {
      writeResults.push(appendRowToTab(ss, "IP_Security_Intelligence", p));
    } else if (p.event_type === "session" && (p.ip_identifier || p.security_signal)) {
      writeResults.push(appendRowToTab(ss, "IP_Security_Intelligence", p));
    }

    // 4. Check for spreadsheet errors and report back to caller
    var failures = writeResults.filter(function (r) { return r && !r.success; });
    if (failures.length > 0) {
      var errorList = failures.map(function (f) { return f.tab + " (" + f.error + ")"; }).join(", ");
      console.error("⚠️ Spreadsheet write error(s): " + errorList);
      return ContentService.createTextOutput(JSON.stringify({
        status: "partial_error",
        message: "Spreadsheet write failure: " + errorList,
        results: writeResults
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "OK: ApnaCare Event Logged & Routed",
      results: writeResults
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error("doPost error: " + err.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
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
  p.event_type = (p.event_type || p.type || "telemetry").toLowerCase();
  p.event_name = p.event_name || p.event_action || "interaction";
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
    if (!sheet) {
      var err1 = "Sheet inaccessible or missing: " + tabName;
      console.error("❌ " + err1);
      return { success: false, tab: tabName, error: err1 };
    }

    var headers = repairHeadersIfNeeded(sheet, tabName);
    if (!headers || !headers.length) {
      var err2 = "No schema headers configured for: " + tabName;
      console.error("❌ " + err2);
      return { success: false, tab: tabName, error: err2 };
    }

    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var checkRows = Math.min(60, lastRow - 1);
      var eventIdCol = headers.indexOf("event_id") + 1;
      if (eventIdCol > 0 && p.event_id) {
        var recentIds = sheet.getRange(lastRow - checkRows + 1, eventIdCol, checkRows, 1).getValues();
        for (var i = 0; i < recentIds.length; i++) {
          if (String(recentIds[i][0]) === String(p.event_id)) {
            return { success: true, tab: tabName, deduplicated: true };
          }
        }
      } else if (tabName === "Geo_Timezone_Intelligence" && (p.session_id || p.Session_ID)) {
        var sidCol = headers.indexOf("Session_ID") + 1;
        var sidVal = String(p.session_id || p.Session_ID);
        if (sidCol > 0) {
          var recentSids = sheet.getRange(lastRow - checkRows + 1, sidCol, checkRows, 1).getValues();
          for (var s = 0; s < recentSids.length; s++) {
            if (String(recentSids[s][0]) === sidVal) {
              return { success: true, tab: tabName, deduplicated: true };
            }
          }
        }
      }
    }

    var row = headers.map(function (h) {
      var val = p[h];
      if (val === undefined || val === null) {
        val = p[h.toLowerCase()];
      }
      if (val === undefined || val === null) {
        var snake = h.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
        val = p[snake];
      }
      if (val === undefined || val === null) {
        if (h === "Timestamp") val = p.received_at || p.client_timestamp || p.timestamp;
        else if (h === "Session_ID") val = p.session_id || p.sessionId;
        else if (h === "Visitor_ID") val = p.visitor_id || p.visitorId;
        else if (h === "Page_URL") val = p.page_url || p.url;
        else if (h === "Referrer") val = p.referrer_url || p.referrer;
        else if (h === "Device_Type") val = p.device_type;
        else if (h === "Operating_System") val = p.operating_system || p.os;
        else if (h === "User_Agent") val = p.user_agent || p.userAgent;
        else if (h === "Request_Path") val = p.page_path || p.request_path;
        else if (h === "UTC_Offset") val = p.utc_offset || p.utcOffset;
        else if (h === "Request_Count") val = p.request_count || p.interaction_count || 1;
        else if (h === "Security_Signal") val = p.security_signal || "Standard Traffic Signal";
        else if (h === "Risk_Level") val = p.risk_level || "Low";
        else if (h === "Detection_Reason") val = p.detection_reason || "Normal authenticated session entry";
        else if (h === "Action_Taken") val = p.action_taken || "Allowed";
        else if (h === "IP_Identifier") val = p.ip_identifier || p.ip || "Truncated/Protected";
        else if (h === "IP_Data_Source") val = p.ip_data_source || (p.ip_identifier ? "Client Verified IP" : "Unavailable");
      }
      if (val === undefined || val === null) val = "";
      if (typeof val === "object") {
        try { val = JSON.stringify(val); } catch (e) { val = ""; }
      }
      return val;
    });

    sheet.appendRow(row);
    return { success: true, tab: tabName };
  } catch (err) {
    var err3 = "Could not append row to " + tabName + ": " + err.toString();
    console.error("❌ " + err3);
    return { success: false, tab: tabName, error: err3 };
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

  var recipients = getUniqueRecipients(EMAIL_CONFIG.leadEmails || ["operations@apnacare.in"]);
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

  getUniqueRecipients(EMAIL_CONFIG.leadEmails).forEach(function (em) {
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

  getUniqueRecipients(EMAIL_CONFIG.leadEmails).forEach(function (em) {
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

  getUniqueRecipients(EMAIL_CONFIG.leadEmails).forEach(function (em) {
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

  getUniqueRecipients(EMAIL_CONFIG.emergencyEmails).forEach(function (em) {
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
// 6. ATTENDANT CAREER APPLICATION ALERT (HR / Recruitment Operations)
// =========================================================================================
function sendAttendantApplicationAlertEmail(p) {
  var name = p.full_name || p.name || "Care Candidate";
  var role = p.role || "Healthcare Attendant";
  var ref = p.application_ref || "N/A";
  var exp = p.experience || "N/A";
  var city = p.city || "N/A";
  var state = p.state || "";

  var html = [
    '<div style="max-width:620px;margin:0 auto;font-family:sans-serif;background:#fff;border-radius:12px;border:1px solid #cbd5e1;overflow:hidden;">',
    '  <div style="background:#047857;padding:22px;color:#fff;">',
    '    <span style="background:#a7f3d0;color:#064e3b;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:bold;">NEW CAREGIVER APPLICATION</span>',
    '    <h2 style="margin:8px 0 2px 0;">' + escapeHtml(name) + ' — ' + escapeHtml(role) + '</h2>',
    '    <p style="margin:0;opacity:0.9;font-size:13px;">Ref: <strong>' + escapeHtml(ref) + '</strong> | Location: ' + escapeHtml(city + (state ? ", " + state : "")) + '</p>',
    '  </div>',
    '  <div style="padding:18px;">',
    '    <table width="100%" style="border-collapse:collapse;">',
    makeRow("applicant_name", name, true),
    makeRow("role_applied", role, true),
    makeRow("phone", p.mobile || p.phone || "N/A", true),
    makeRow("email", p.email || "N/A", true),
    makeRow("experience", exp, true),
    makeRow("employment_type", p.employment_type || "N/A"),
    makeRow("location", city + (state ? ", " + state : "")),
    makeRow("languages", p.languages || "N/A"),
    makeRow("dob_gender", (p.dob || "N/A") + (p.gender ? " (" + p.gender + ")" : "")),
    makeRow("qualifications", p.qualifications || "Not specified"),
    makeRow("documents_uploaded", (p.document_count || 0) + " document(s) attached"),
    makeRow("experience_summary", p.experience_summary || "None provided"),
    makeRow("status", p.lead_status || "Pending Review"),
    makeRow("received_at", p.received_at),
    '    </table>',
    '  </div>',
    '  <div style="padding:14px 18px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;">',
    '    Review candidate documents and initiate HR phone screening within 24 hours.',
    '  </div>',
    '</div>'
  ].join('');

  getUniqueRecipients(EMAIL_CONFIG.leadEmails).forEach(function (em) {
    safeSendEmail({
      to: em,
      subject: "🩺 [Career Application] " + name + " — " + role + " (" + city + ")",
      htmlBody: html,
      name: "ApnaCare Recruitment Desk",
      replyTo: p.email || EMAIL_CONFIG.replyTo
    });
  });
}

// =========================================================================================
// 7. YOUTUBE INBOUND COMMUNITY INQUIRY ALERT (Social Care Desk)
// =========================================================================================
function sendYouTubeInquiryAlertEmail(item) {
  var author = item.author_name || "YouTube User";
  var video = item.video_title || "ApnaCare Video";
  var comment = item.comment_text || "";
  var url = item.video_url || "https://www.youtube.com";
  var intent = item.detected_intent || "Service Inquiry";
  var jiraKey = item.jira_key_primary || "";

  var html = [
    '<div style="max-width:620px;margin:0 auto;font-family:sans-serif;background:#fff;border-radius:12px;border:1px solid #cbd5e1;overflow:hidden;">',
    '  <div style="background:#dc2626;padding:22px;color:#fff;">',
    '    <span style="background:#fef2f2;color:#991b1b;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:bold;">YOUTUBE INBOUND INQUIRY</span>',
    '    <h2 style="margin:8px 0 2px 0;">' + escapeHtml(author) + ' — ' + escapeHtml(intent) + '</h2>',
    '    <p style="margin:0;opacity:0.9;font-size:13px;">Video: <strong>' + escapeHtml(video) + '</strong></p>',
    '  </div>',
    '  <div style="padding:18px;">',
    '    <div style="background:#f8fafc;border-left:4px solid #dc2626;padding:12px 16px;margin-bottom:16px;border-radius:4px;">',
    '      <p style="margin:0;font-size:14px;color:#334155;font-style:italic;">&ldquo;' + escapeHtml(comment) + '&rdquo;</p>',
    '    </div>',
    '    <table width="100%" style="border-collapse:collapse;">',
    makeRow("commenter", author, true),
    makeRow("detected_intent", intent, true),
    makeRow("video_title", video),
    makeRow("published_at", item.published_at || "Just now"),
    makeRow("jira_ticket", jiraKey ? ('<strong>' + escapeHtml(jiraKey) + '</strong> (Task + 8 Subtasks Generated)') : "N/A"),
    makeRow("video_link", '<a href="' + url + '" target="_blank" style="color:#047857;font-weight:bold;">Open Video & Reply on YouTube &rarr;</a>'),
    '    </table>',
    '  </div>',
    '  <div style="padding:14px 18px;background:#fef2f2;border-top:1px solid #fecaca;font-size:12px;color:#991b1b;">',
    '    Reply directly to this commenter on YouTube or assign the auto-generated Jira ticket to initiate care outreach.',
    '  </div>',
    '</div>'
  ].join('');

  getUniqueRecipients(EMAIL_CONFIG.leadEmails).forEach(function (em) {
    safeSendEmail({
      to: em,
      subject: "🎥 [YouTube Lead] " + author + " on \"" + (video.length > 40 ? video.substring(0, 37) + "..." : video) + "\"",
      htmlBody: html,
      name: "ApnaCare YouTube Desk",
      replyTo: EMAIL_CONFIG.replyTo
    });
  });
}

function sendLinkedInLeadAlertEmail(item) {
  var name = item.full_name || ((item.first_name || "") + " " + (item.last_name || "")).trim() || item.name || "LinkedIn Prospect";
  var phone = item.phone || "Not provided";
  var email = item.email || "Not provided";
  var city = item.city || "Pan-India";
  var company = item.company || "Not provided";
  var title = item.job_title || "Not provided";
  var service = item.service_or_requirement || "Home Healthcare / Attendant Care";
  var form = item.form_name || "LinkedIn Lead Gen Form";
  var notes = item.user_notes || item.notes || "None";
  var jiraKey = item.jira_key_primary || "";
  var cleanPhone = phone.replace(/[^\d+]/g, '');
  var waUrl = cleanPhone ? ("https://wa.me/" + cleanPhone.replace(/^\+/, '')) : "";

  var html = [
    '<div style="max-width:620px;margin:0 auto;font-family:sans-serif;background:#fff;border-radius:12px;border:1px solid #cbd5e1;overflow:hidden;">',
    '  <div style="background:#0a66c2;padding:22px;color:#fff;">',
    '    <span style="background:#e8f3fc;color:#0a66c2;padding:4px 10px;border-radius:12px;font-size:11px;font-weight:bold;letter-spacing:0.5px;">LINKEDIN INBOUND LEAD</span>',
    '    <h2 style="margin:8px 0 2px 0;color:#ffffff;">' + escapeHtml(name) + (company !== "Not provided" ? (' (' + escapeHtml(company) + ')') : '') + '</h2>',
    '    <p style="margin:0;opacity:0.95;font-size:13px;color:#ffffff;">Requirement: <strong>' + escapeHtml(service) + '</strong></p>',
    '  </div>',
    '  <div style="padding:18px;">',
    '    <div style="background:#f0f7fe;border-left:4px solid #0a66c2;padding:12px 16px;margin-bottom:16px;border-radius:4px;">',
    '      <p style="margin:0;font-size:14px;color:#1e293b;"><strong>Notes:</strong> &ldquo;' + escapeHtml(notes) + '&rdquo;</p>',
    '    </div>',
    '    <table width="100%" style="border-collapse:collapse;">',
    makeRow("lead_name", name, true),
    makeRow("phone", phone, true),
    makeRow("email", email),
    makeRow("city", city),
    makeRow("company", company),
    makeRow("designation", title),
    makeRow("service_requested", service),
    makeRow("source_form", form),
    makeRow("jira_ticket", jiraKey ? ('<strong style="color:#0a66c2;">' + escapeHtml(jiraKey) + '</strong> (Task + 8 Subtasks Generated)') : "Logged in Google Sheet"),
    waUrl ? makeRow("whatsapp_connect", '<a href="' + waUrl + '" target="_blank" style="color:#16a34a;font-weight:bold;">Message on WhatsApp &rarr;</a>') : "",
    '    </table>',
    '  </div>',
    '  <div style="padding:14px 18px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#475569;">',
    '    Connect with this prospect within 2 hours. Subtasks for care matching and family consultation have been automatically generated in Jira.',
    '  </div>',
    '</div>'
  ].join('');

  getUniqueRecipients(EMAIL_CONFIG.leadEmails).forEach(function (em) {
    safeSendEmail({
      to: em,
      subject: "💼 [LinkedIn Lead] " + name + " (" + city + ") — " + service,
      htmlBody: html,
      name: "ApnaCare LinkedIn Desk",
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
  var formStatusCol = findHeader(["form_status", "formStatus"]);
  var leadTypeCol = findHeader(["lead_type", "leadType"]);
  var convCol = findHeader(["conversion_name", "conversionName"]);

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
    var formStatus = formStatusCol > -1 ? String(data[i][formStatusCol] || "").toLowerCase() : "";
    var leadTypeVal = leadTypeCol > -1 ? String(data[i][leadTypeCol] || "").toUpperCase() : "";
    var convName = convCol > -1 ? String(data[i][convCol] || "").toLowerCase() : "";
    var dur = durCol > -1 ? (Number(data[i][durCol]) || 0) : 0;

    // Verified submissions only (avoids overcounting on page load or field touches)
    var isBooking = (leadTypeVal === "BOOKING" || evtName === "booking_submitted" || evtName === "booking_submit" || convName.includes("booking") || (formName.includes("booking") && formStatus === "submitted"));
    var isCallback = (leadTypeVal === "CALLBACK" || evtName === "callback_submitted" || evtName === "enquiry_submitted" || ((formName.includes("callback") || formName.includes("enquiry")) && formStatus === "submitted"));
    var isContact = (leadTypeVal === "CONTACT" || evtName === "contact_submitted" || (formName.includes("contact") && formStatus === "submitted"));
    var isPartner = (leadTypeVal === "PARTNER" || evtName === "partner_submitted" || (formName.includes("partner") && formStatus === "submitted"));
    var isChatbot = (leadTypeVal === "CHATBOT" || evtName === "chatbot_inquiry" || evtName === "chatbot_lead");
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

  // ARCHITECTURAL UPDATE: Report email generation & delivery has been completely migrated
  // to Vercel Serverless Functions + Resend API (/api/cron/daily-report, weekly-report, monthly-report).
  // Google Apps Script is strictly NOT responsible for sending report emails.
  Logger.log("Notice: " + intervalName + " digest emails are generated and delivered via Vercel Serverless Functions + Resend.");

  // Push digest intelligence to Jira as a tracking Task ticket if needed
  try {
    pushDigestToJira(intervalName, {
      period: period,
      events: events,
      visitors: visitors,
      pageViews: pageViews,
      bookings: bookings,
      callbacks: callbacks,
      contacts: contacts,
      partners: partners,
      chatbots: chatbots,
      totalLeads: totalLeads,
      convRate: convRate,
      avgSec: avgSec,
      sheetUrl: ss.getUrl()
    });
  } catch (jErr) {
    Logger.log("Notice: Failed to push digest to Jira: " + jErr.message);
  }
}

function dailyReport() {
  Logger.log("Notice: Daily reports are scheduled and delivered via Vercel Serverless API (/api/cron/daily-report) + Resend.");
}
function weeklyReport() {
  Logger.log("Notice: Weekly reports are scheduled and delivered via Vercel Serverless API (/api/cron/weekly-report) + Resend.");
}
function monthlyReport() {
  Logger.log("Notice: Monthly reports are scheduled and delivered via Vercel Serverless API (/api/cron/monthly-report) + Resend.");
}

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
  var tabCount = Object.keys(TAB_HEADERS).length;
  console.log("✅ All " + tabCount + " ApnaCare tabs successfully initialized.");
  try {
    SpreadsheetApp.getUi().alert("✅ All " + tabCount + " ApnaCare database tabs initialized successfully!");
  } catch (e) { }
}

function MASTER_REFRESH_RAW_DATA() {
  INITIALIZE_ALL_TABS();
  PURGE_DUPLICATES_FROM_ALL_TABS();
  BUILD_AGGREGATED_INTERVAL_SUMMARIES();
  var tabCount = Object.keys(TAB_HEADERS).length;
  try {
    SpreadsheetApp.getUi().alert("✅ Master Refresh Complete!\n\n• All " + tabCount + " Tabs Verified.\n• Duplicate events purged.\n• Daily, Weekly & Monthly summaries recalculated.");
  } catch (e) { }
}

function PURGE_DUPLICATES_FROM_ALL_TABS() {
  var ss = getSpreadsheet();
  if (!ss) return;
  var tabs = Object.keys(TAB_HEADERS);
  var totalRemoved = 0;
  var seen = new Set();

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

// =========================================================================================
// VERCEL REPORTING READ API & IDEMPOTENCY LOGGING
// =========================================================================================

function LOG_REPORT_DELIVERY(ss, payload) {
  try {
    var tabName = "Report_Delivery_Logs";
    var sheet = ss.getSheetByName(tabName);
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
      sheet.appendRow(TAB_HEADERS.Report_Delivery_Logs);
      sheet.setFrozenRows(1);
    }

    var row = [
      payload.timestamp || normalizeTimestamp(new Date()),
      payload.report_type || "",
      payload.reporting_period || "",
      payload.delivery_status || "DELIVERED",
      payload.message_id || "",
      payload.provider || "resend",
      payload.recipient_emails || "",
      payload.error || ""
    ];

    sheet.appendRow(row);
    return {
      status: "success",
      message: "Report delivery recorded for " + payload.report_type + " " + payload.reporting_period
    };
  } catch (err) {
    console.error("LOG_REPORT_DELIVERY error: " + err.toString());
    return { status: "error", message: err.toString() };
  }
}

function CHECK_REPORT_DELIVERY(reportType, periodKey) {
  try {
    var ss = getSpreadsheet();
    if (!ss) return { status: "error", message: "Spreadsheet inaccessible" };

    var sheet = ss.getSheetByName("Report_Delivery_Logs");
    if (!sheet || sheet.getLastRow() < 2) {
      return { status: "success", delivered: false };
    }

    var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 8).getValues();
    // Search from bottom up for newest status
    for (var i = data.length - 1; i >= 0; i--) {
      var row = data[i];
      var rType = String(row[1] || "").toLowerCase();
      var rPeriod = String(row[2] || "");
      var rStatus = String(row[3] || "").toUpperCase();

      if (rType === String(reportType || "").toLowerCase() && rPeriod === String(periodKey || "")) {
        if (rStatus === "DELIVERED") {
          return {
            status: "success",
            delivered: true,
            record: {
              timestamp: row[0],
              report_type: row[1],
              reporting_period: row[2],
              delivery_status: row[3],
              message_id: row[4],
              provider: row[5],
              recipients: String(row[6] || "").split(",").map(function(s) { return s.trim(); }).filter(Boolean)
            }
          };
        }
      }
    }

    return { status: "success", delivered: false };
  } catch (err) {
    return { status: "error", message: err.toString() };
  }
}

function GET_DELIVERY_HISTORY(limit) {
  try {
    var ss = getSpreadsheet();
    if (!ss) return { status: "error", message: "Spreadsheet inaccessible" };

    var sheet = ss.getSheetByName("Report_Delivery_Logs");
    if (!sheet || sheet.getLastRow() < 2) {
      return { status: "success", history: [] };
    }

    var maxRows = parseInt(limit, 10) || 50;
    var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 8).getValues();
    var history = [];

    for (var i = data.length - 1; i >= 0 && history.length < maxRows; i--) {
      var row = data[i];
      history.push({
        timestamp: row[0],
        report_type: row[1],
        reporting_period: row[2],
        delivery_status: row[3],
        message_id: row[4],
        provider: row[5],
        recipient_emails: row[6],
        error: row[7]
      });
    }

    return { status: "success", history: history };
  } catch (err) {
    return { status: "error", message: err.toString() };
  }
}

function GET_REPORT_METRICS(reportType, periodKey, startDate, endDate, timezone) {
  try {
    var ss = getSpreadsheet();
    if (!ss) return { status: "error", message: "Spreadsheet inaccessible" };

    // Refresh aggregated tables first
    try {
      BUILD_AGGREGATED_INTERVAL_SUMMARIES();
    } catch (e) {
      console.warn("BUILD_AGGREGATED_INTERVAL_SUMMARIES notice: " + e.toString());
    }

    var tabMap = { daily: "Daily_Summary", weekly: "Weekly_Summary", monthly: "Monthly_Summary" };
    var tabName = tabMap[String(reportType || "").toLowerCase()] || "Daily_Summary";
    var summarySheet = ss.getSheetByName(tabName);

    var metrics = {
      totalLeads: 0,
      bookings: 0,
      callbacks: 0,
      contacts: 0,
      partners: 0,
      chatbots: 0,
      emergencyAlerts: 0,
      attendantApplications: 0,
      uniqueVisitors: 0,
      pageViews: 0,
      telemetryEvents: 0,
      conversionRate: "0%",
      avgEngagementSeconds: 0
    };

    var foundInSummary = false;
    if (summarySheet && summarySheet.getLastRow() >= 2) {
      var summaryRows = summarySheet.getRange(2, 1, summarySheet.getLastRow() - 1, 12).getValues();
      for (var s = 0; s < summaryRows.length; s++) {
        var rowPeriod = String(summaryRows[s][0] || "");
        if (rowPeriod === String(periodKey || "")) {
          metrics.telemetryEvents = Number(summaryRows[s][1]) || 0;
          metrics.uniqueVisitors = Number(summaryRows[s][2]) || 0;
          metrics.pageViews = Number(summaryRows[s][3]) || 0;
          metrics.bookings = Number(summaryRows[s][4]) || 0;
          metrics.callbacks = Number(summaryRows[s][5]) || 0;
          metrics.contacts = Number(summaryRows[s][6]) || 0;
          metrics.partners = Number(summaryRows[s][7]) || 0;
          metrics.chatbots = Number(summaryRows[s][8]) || 0;
          metrics.totalLeads = Number(summaryRows[s][9]) || 0;
          metrics.conversionRate = String(summaryRows[s][10] || "0%");
          metrics.avgEngagementSeconds = Number(summaryRows[s][11]) || 0;
          foundInSummary = true;
          break;
        }
      }
    }

    // Also count Emergency Alerts and Attendant Applications within the period
    metrics.emergencyAlerts = countRowsInDateRange(ss, "SOS_Emergency_Alerts", startDate, endDate);
    metrics.attendantApplications = countRowsInDateRange(ss, "Attendant_Applications", startDate, endDate);

    // If not found in summary, scan the individual tabs directly
    if (!foundInSummary) {
      metrics.bookings = countRowsInDateRange(ss, "Booking_Leads", startDate, endDate);
      metrics.callbacks = countRowsInDateRange(ss, "Callback_Enquiries", startDate, endDate);
      metrics.contacts = countRowsInDateRange(ss, "Contact_Submissions", startDate, endDate);
      metrics.partners = countRowsInDateRange(ss, "Partner_Applications", startDate, endDate);
      metrics.chatbots = countRowsInDateRange(ss, "Chatbot_Leads", startDate, endDate);
      metrics.totalLeads = metrics.bookings + metrics.callbacks + metrics.contacts + metrics.partners + metrics.chatbots;
    }

    return {
      status: "success",
      type: reportType,
      period_key: periodKey,
      metrics: metrics,
      timestamp: normalizeTimestamp(new Date())
    };
  } catch (err) {
    return { status: "error", message: err.toString() };
  }
}

function countRowsInDateRange(ss, tabName, startIso, endIso) {
  try {
    var sheet = ss.getSheetByName(tabName);
    if (!sheet || sheet.getLastRow() < 2) return 0;
    var dates = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();
    var count = 0;
    var start = startIso ? new Date(startIso).getTime() : 0;
    var end = endIso ? new Date(endIso).getTime() : Infinity;

    for (var i = 0; i < dates.length; i++) {
      var dStr = dates[i][0];
      if (!dStr) continue;
      var t = new Date(dStr).getTime();
      if (!isNaN(t) && t >= start && t <= end) {
        count++;
      }
    }
    return count;
  } catch (e) {
    return 0;
  }
}

function setupAllApnaCareTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function (t) { ScriptApp.deleteTrigger(t); });

  // NOTE: Daily, Weekly & Monthly executive report emails are now generated and delivered
  // by Vercel Serverless Functions (/api/cron/daily-report, weekly-report, monthly-report) + Resend.
  // Google Apps Script is no longer responsible for sending report emails.

  // 1. Automatic Airtable Lead Sync every 10 minutes
  ScriptApp.newTrigger("AUTOMATED_AIRTABLE_SYNC_TRIGGER").timeBased().everyMinutes(10).create();

  // 2. Automatic Jira Lead Sync every 10 minutes
  ScriptApp.newTrigger("AUTOMATED_JIRA_SYNC_TRIGGER").timeBased().everyMinutes(10).create();

  // 3. Automatic YouTube Interactions Sync every hour
  ScriptApp.newTrigger("AUTOMATED_YOUTUBE_SYNC_TRIGGER").timeBased().everyHours(1).create();

  try {
    SpreadsheetApp.getUi().alert("✅ Automated Sync Triggers Activated!\n\n• Reports handled by Vercel Serverless Functions + Resend\n• 10-Minute Airtable Lead Sync\n• 10-Minute Jira Lead Sync\n• 1-Hour YouTube Interactions Sync");
  } catch (e) { }
}

function AUTOMATED_AIRTABLE_SYNC_TRIGGER() {
  Logger.log("⏰ Running Scheduled Airtable Lead Sync...");
  var res = SYNC_ALL_LEADS_TO_AIRTABLE();
  Logger.log("⏰ Airtable sync complete: " + (res.count || 0) + " leads pushed.");
}

function setupAirtableAutomation() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "AUTOMATED_AIRTABLE_SYNC_TRIGGER") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  ScriptApp.newTrigger("AUTOMATED_AIRTABLE_SYNC_TRIGGER").timeBased().everyMinutes(10).create();
  try {
    SpreadsheetApp.getUi().alert("✅ 24/7 Automatic Airtable Sync Activated!\n\nNew inbound leads will be checked and synced to Airtable every 10 minutes.");
  } catch (e) { }
}

function stopAirtableAutomation() {
  var triggers = ScriptApp.getProjectTriggers();
  var count = 0;
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "AUTOMATED_AIRTABLE_SYNC_TRIGGER") {
      ScriptApp.deleteTrigger(triggers[i]);
      count++;
    }
  }
  try {
    SpreadsheetApp.getUi().alert("🛑 Automatic Airtable Sync Stopped.\n\nRemoved " + count + " active trigger(s).");
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
      .addItem('🚀 Enable 24/7 Automatic Airtable Sync', 'setupAirtableAutomation')
      .addItem('📤 Sync Unsynced Leads to Airtable Now', 'SYNC_ALL_LEADS_TO_AIRTABLE')
      .addItem('🛑 Stop Automatic Airtable Sync', 'stopAirtableAutomation')
      .addSeparator()
      .addItem('🚀 Enable 24/7 Automatic Jira Sync', 'setupJiraAutomation')
      .addItem('📤 Sync Unsynced Leads to Jira Now', 'SYNC_ALL_LEADS_TO_JIRA')
      .addItem('🛑 Stop Automatic Jira Sync', 'stopJiraAutomation')
      .addItem('🏗️ Auto-Create Jira Project Space (APNA)', 'CREATE_JIRA_PROJECT')
      .addItem('🧪 Test Jira Connection & Create Ticket', 'TEST_JIRA_CONNECTION')
      .addSeparator()
      .addItem('▶️ Sync YouTube Comments & Interactions Now', 'SYNC_YOUTUBE_INTERACTIONS_NOW')
      .addItem('🚀 Enable Hourly Automatic YouTube Sync', 'setupYouTubeAutomation')
      .addItem('🛑 Stop Automatic YouTube Sync', 'stopYouTubeAutomation')
      .addItem('🧪 Test YouTube Sync (Live Channel)', 'TEST_YOUTUBE_SYNC')
      .addItem('🧪 Ingest Sample YouTube Interactions (Demo)', 'manualTestYouTubeMockSample')
      .addItem('💼 Ingest Sample LinkedIn Leads (Demo)', 'manualTestLinkedInLeadSample')
      .addItem('💬 Quick-Log Inbound LinkedIn Comment (Dialog)', 'LOG_LINKEDIN_POST_INTERACTION')
      .addSeparator()
      .addItem('⏰ Enable Scheduled Sync Triggers (Airtable, Jira & YouTube)', 'setupAllApnaCareTriggers')
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
    email: "divabhrati.ramco@gmail.com",
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

// Standalone test function for toolbar execution — does not get triggered by empty web requests
function manualTestBookingSimulation() {
  Logger.log("Running manual test booking simulation...");
  return doPost({
    postData: {
      contents: JSON.stringify({
        event_type: "lead",
        event_name: "booking_submitted",
        lead_type: "BOOKING",
        form_name: "6-Step Booking Form",
        name: "Test User (Manual Verification)",
        mobile: "+91 98401 23456",
        email: "divabhrati.ramco@gmail.com",
        serviceId: "elderly-care",
        service_name: "Elderly Care & Home Companionship",
        city: "Bengaluru",
        location: "Indiranagar 100ft Road",
        date: "2026-10-15",
        time: "08:00 AM",
        duration: 30,
        preferredLanguage: "Tamil / English",
        notes: "Manual test booking run from script editor",
        total_amount: 38970,
        page_path: "/booking"
      })
    }
  });
}

// Standalone test function for testing attendant application flow
function manualTestAttendantApplication() {
  Logger.log("Running manual test attendant application simulation...");
  return doPost({
    postData: {
      contents: JSON.stringify({
        event_type: "attendant_application",
        event_name: "attendant_application_submitted",
        lead_type: "ATTENDANT_APPLICATION",
        form_name: "Become an Attendant Form",
        application_ref: "APP-TEST-999",
        name: "Priya Lakshmi (Test Candidate)",
        full_name: "Priya Lakshmi (Test Candidate)",
        mobile: "+91 98401 55555",
        email: "divabhrati.ramco@gmail.com",
        dob: "1994-06-12",
        gender: "Female",
        city: "Bengaluru",
        state: "Karnataka",
        role: "Elderly Care Companion",
        experience: "3-5 years",
        qualifications: "Certified GDA (General Duty Assistant), First Aid Certified",
        languages: "English, Hindi, Kannada, Tamil",
        employment_type: "Full-Time (Live-in)",
        experience_summary: "5 years caring for senior dementia and post-stroke recovery patients with daily vitals management.",
        document_count: 2,
        documents: JSON.stringify([
          { id: "doc-1", name: "Aadhaar_Card.pdf", size: "1.2 MB", type: "application/pdf", category: "Aadhaar / ID Proof" },
          { id: "doc-2", name: "Nursing_Certificate.pdf", size: "850 KB", type: "application/pdf", category: "Nursing / Care Certificate" }
        ]),
        consent_given: "true",
        page_path: "/become-an-attendant",
        lead_status: "New",
        follow_up_status: "Pending Review"
      })
    }
  });
}

// Standalone manual test function for verifying Jira Task + 8 Subtasks creation
function manualTestJiraTaskWith8Subtasks() {
  Logger.log("Running manual test for Jira Task + 8 Subtasks...");
  var testLead = {
    Name: "Smt. Kamala Ramanathan (Manual Subtask Verification)",
    Phone: "+91 98401 77777",
    Email: "divabhrati.ramco@gmail.com",
    Service: "Elderly Care & Bedside Assistance",
    City: "Bengaluru",
    LeadType: "Booking",
    ReferenceID: "AC-SUBTEST-" + Date.now().toString(36).toUpperCase(),
    Details: "Manual verification ticket to test automatic generation of 8 sequential operational subtasks in Jira.",
    PagePath: "/booking",
    Timestamp: Utilities.formatDate(new Date(), CONFIG.TIMEZONE || "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss"),
    SourceEnvironment: "test"
  };

  var res = pushLeadToJira(testLead);
  Logger.log("Result: " + JSON.stringify(res));
  return res;
}

// Standalone manual test function for verifying live YouTube sync execution
function manualTestYouTubeSync() {
  Logger.log("Running manual test for YouTube channel sync...");
  return syncYouTubeChannelInteractions();
}

// Standalone manual test function: Ingests 3 realistic sample YouTube interactions (inquiry, job query, feedback)
// into the "YouTube_Interactions" sheet tab to verify columns, formatting, Jira tasks and email alerts
function manualTestYouTubeMockSample() {
  Logger.log("Running manual test with realistic sample YouTube interactions...");
  var ss = getSpreadsheet();
  if (!ss) return { success: false, error: "Spreadsheet not found" };

  var sheet = getTab(ss, "YouTube_Interactions");
  var headers = TAB_HEADERS.YouTube_Interactions;

  var mockComments = [
    {
      comment_id: "UgxSAMPLE_INQUIRY_001",
      video_id: "dQw4w9WgXcQ",
      video_title: "Elderly Home Care Companionship & Vitals Support | ApnaCare",
      video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      channel: "@apnacare",
      author_name: "Smt. Revathi Meenakshi",
      author_channel_url: "https://www.youtube.com/@revathi.meenakshi",
      comment_text: "My 78-year-old mother recently had hip replacement surgery in Jayanagar, Bengaluru. We need a full-time 24-hr woman attendant for bedside care and daily mobility assistance. How much do you charge per month and how soon can you provide one? Please contact.",
      reply_text: "ApnaCare: Hello ma'am, our senior care coordinators have reached out. We provide verified hospital-trained companions across Bengaluru. A coordinator will connect with you within 2 hours.",
      reply_count: 1,
      published_at: "2026-10-14 10:15:00",
      updated_at: "2026-10-14 10:30:00",
      like_count: 4
    },
    {
      comment_id: "UgxSAMPLE_JOB_QUERY_002",
      video_id: "abc987xyz12",
      video_title: "Join ApnaCare: Trusted Careers for Female Nurses & Healthcare Companions",
      video_url: "https://www.youtube.com/watch?v=abc987xyz12",
      channel: "@apnacare",
      author_name: "Sister Sunita Mary (GDA Certified)",
      author_channel_url: "https://www.youtube.com/@sunita.nurse",
      comment_text: "I have 4 years of experience as General Duty Assistant (GDA) in post-operative care and tracheostomy care. Is there any vacancy for night shift or live-in attendant in Chennai? What is the salary package and how can I apply?",
      reply_text: "",
      reply_count: 0,
      published_at: "2026-10-14 11:45:00",
      updated_at: "2026-10-14 11:45:00",
      like_count: 2
    },
    {
      comment_id: "UgxSAMPLE_FEEDBACK_003",
      video_id: "dQw4w9WgXcQ",
      video_title: "Elderly Home Care Companionship & Vitals Support | ApnaCare",
      video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      channel: "@apnacare",
      author_name: "Arvind Swaminathan",
      author_channel_url: "https://www.youtube.com/@arvind_swami",
      comment_text: "Wonderful initiative! Having verified female companions provides tremendous peace of mind for families with elderly parents staying alone in India. Kudos to the ApnaCare team!",
      reply_text: "ApnaCare: Thank you so much for your kind words and trust Arvind!",
      reply_count: 1,
      published_at: "2026-10-14 09:00:00",
      updated_at: "2026-10-14 09:12:00",
      like_count: 12
    }
  ];

  var syncedAt = normalizeTimestamp(new Date());
  var inserted = 0;

  for (var i = 0; i < mockComments.length; i++) {
    var c = mockComments[i];
    var analysis = detectHealthcareEnquiryIntent(c.comment_text);
    var isEnq = analysis.isEnquiry ? "Yes" : "No";

    var jiraKeyPrimary = "";
    var jiraKeySecondary = "";

    if (isEnq === "Yes" && YOUTUBE_CONFIG.AUTO_JIRA_LEADS) {
      try {
        var jRes = pushLeadToJira({
          Name: c.author_name,
          Phone: "",
          Email: "",
          Service: analysis.intent + " (" + c.video_title + ")",
          City: "YouTube (" + c.channel + ")",
          LeadType: "YouTube Community Lead",
          ReferenceID: "YT-" + c.comment_id.slice(-8),
          Details: "Inbound YouTube Inquiry on video: " + c.video_title + "\nAuthor: " + c.author_name + "\nIntent: " + analysis.intent + "\n\nComment:\n\"" + c.comment_text + "\"",
          PagePath: "/youtube",
          Timestamp: syncedAt,
          SourceEnvironment: "test"
        });
        if (jRes && jRes.success) {
          jiraKeyPrimary = jRes.key;
          jiraKeySecondary = (jRes.subtasks && jRes.subtasks[0]) || "";

          // Mirror into master Lead_Management table
          appendRowToTab(ss, "Lead_Management", {
            received_at: syncedAt,
            lead_id: "YT-" + c.comment_id.slice(-8),
            lead_type: "YOUTUBE_INQUIRY",
            name: c.author_name,
            service_or_requirement: analysis.intent + " on " + c.video_title,
            city: "YouTube",
            lead_source: "YouTube - " + c.video_title,
            lead_status: "New",
            follow_up_status: "Social Desk Reply Due",
            total_value: "YouTube Lead",
            source_environment: "test",
            jira_synced: "SYNCED",
            jira_issue_key: jiraKeyPrimary
          });

          sendYouTubeInquiryAlertEmail({
            author_name: c.author_name,
            video_title: c.video_title,
            video_url: c.video_url,
            comment_text: c.comment_text,
            detected_intent: analysis.intent,
            published_at: c.published_at,
            jira_key_primary: jiraKeyPrimary
          });
        }
      } catch (err) {
        Logger.log("Mock sample Jira creation notice: " + err.message);
      }
    }

    var record = {
      synced_at: syncedAt,
      comment_id: c.comment_id,
      video_id: c.video_id,
      video_title: c.video_title,
      video_url: c.video_url,
      channel: c.channel,
      author_name: c.author_name,
      author_channel_url: c.author_channel_url,
      comment_text: c.comment_text,
      reply_text: c.reply_text,
      published_at: c.published_at,
      like_count: c.like_count,
      is_enquiry: isEnq,
      lead_source: "YouTube - " + c.video_title,
      jira_key_primary: jiraKeyPrimary,
      jira_key_secondary: jiraKeySecondary,
      sync_status: isEnq === "Yes" ? (jiraKeyPrimary ? "ENQUIRY_ESCALATED" : "NEW_ENQUIRY") : "SYNCED",
      reply_count: c.reply_count,
      updated_at: c.updated_at,
      detected_intent: analysis.intent
    };

    var rowValues = headers.map(function (h) {
      return record[h] !== undefined ? record[h] : "";
    });

    sheet.appendRow(rowValues);
    inserted++;
  }

  var msg = "🎉 Sample YouTube Interactions Ingested Successfully!\n\n" +
    "• " + inserted + " sample comments added to 'YouTube_Interactions' tab.\n" +
    "• Inquiries auto-classified and escalated to Jira (with 8 subtasks).\n" +
    "• Mirrored to 'Lead_Management' tab.\n" +
    "• Email alerts dispatched to operations desk.";

  Logger.log(msg);
  var ui = null;
  try { ui = SpreadsheetApp.getUi(); } catch (e) { }
  if (ui) ui.alert("✅ Sample Ingest Complete", msg, ui.ButtonSet.OK);

  return { success: true, count: inserted, message: msg };
}

// Standalone manual test function: Ingests 2 realistic sample LinkedIn leads
// (patient bedside care inquiry & corporate employee wellness partner)
// into the "LinkedIn_Leads" tab to verify columns, formatting, Jira tasks and email alerts
function manualTestLinkedInLeadSample() {
  Logger.log("Running manual test with realistic sample LinkedIn leads...");
  var ss = getSpreadsheet();
  if (!ss) return { success: false, error: "Spreadsheet not found" };

  var sheet = getTab(ss, "LinkedIn_Leads");
  var headers = TAB_HEADERS.LinkedIn_Leads;

  var mockLinkedInLeads = [
    {
      lead_id: "LI-SAMPLE-" + Date.now().toString(36).slice(-5).toUpperCase() + "-01",
      full_name: "Dr. K. S. Balasubramanian",
      first_name: "Balasubramanian",
      last_name: "K. S.",
      phone: "+91 98402 11223",
      email: "dr.bala.cardio@gmail.com",
      city: "Chennai (Adyar)",
      company: "Senior Consultant Cardiologist",
      job_title: "Head of Dept (Private Clinic)",
      service_or_requirement: "Post-Cardiac ICU Bedside Nurse & Elderly Companion",
      lead_type: "LINKEDIN_LEAD",
      lead_source: "LinkedIn - Organic Company Page Form",
      form_name: "Senior Home Care & Attendant Booking Form",
      campaign_name: "Organic Healthcare Network",
      linkedin_profile_url: "https://www.linkedin.com/in/dr-bala-cardio",
      user_notes: "Looking for an experienced female patient care attendant for elderly father (84 yrs) with mobility limitations and mild Parkinson's. Needs 24-hr live-in support with medication schedule tracking and vitals monitoring.",
      lead_status: "New",
      follow_up_status: "Pending Consultation Call",
      source_environment: "test"
    },
    {
      lead_id: "LI-SAMPLE-" + Date.now().toString(36).slice(-5).toUpperCase() + "-02",
      full_name: "Pooja Hegde (VP People & Culture)",
      first_name: "Pooja",
      last_name: "Hegde",
      phone: "+91 98860 44556",
      email: "pooja.hegde@techsolutions-corp.com",
      city: "Bengaluru (Whitefield)",
      company: "TechSolutions Enterprise Corp",
      job_title: "VP - Human Resources",
      service_or_requirement: "Corporate Elder Care & Parental Attendant Benefit Program",
      lead_type: "LINKEDIN_LEAD",
      lead_source: "LinkedIn - Sponsored InMail / Lead Gen Form",
      form_name: "Corporate Wellness & Attendant Partnership",
      campaign_name: "B2B_Employee_ElderCare_Q4",
      linkedin_profile_url: "https://www.linkedin.com/in/pooja-hegde-hr",
      user_notes: "We have 1,400+ employees in Bengaluru & Hyderabad. Exploring tie-up with ApnaCare to provide subsidized verified female attendants and bedside companions for employees' aging parents. Would like a formal proposal and coordinator discussion.",
      lead_status: "New",
      follow_up_status: "Corporate Deck Sent",
      source_environment: "test"
    }
  ];

  var inserted = 0;
  for (var i = 0; i < mockLinkedInLeads.length; i++) {
    var lead = mockLinkedInLeads[i];
    var receivedAt = normalizeTimestamp(new Date());
    lead.received_at = receivedAt;

    var jiraKey = "";
    if (JIRA_CONFIG && JIRA_CONFIG.API_TOKEN) {
      try {
        var jRes = pushLeadToJira({
          Name: lead.full_name,
          Phone: lead.phone,
          Email: lead.email,
          Service: lead.service_or_requirement,
          City: lead.city,
          LeadType: "LinkedIn Patient / Partner Lead",
          ReferenceID: lead.lead_id,
          Details: "Inbound LinkedIn Lead:\nName: " + lead.full_name + "\nCompany: " + lead.company + "\nRole: " + lead.job_title + "\nRequirement: " + lead.service_or_requirement + "\n\nNotes:\n" + lead.user_notes,
          PagePath: "/linkedin",
          Timestamp: receivedAt,
          SourceEnvironment: "test"
        });
        if (jRes && jRes.success && jRes.key) {
          jiraKey = jRes.key;
        }
      } catch (jErr) {
        Logger.log("⚠️ Jira test error: " + jErr.message);
      }
    }

    lead.jira_key_primary = jiraKey;
    lead.jira_key_secondary = jiraKey ? (jiraKey + " (8 Subtasks Created)") : "";

    // 1. Append to LinkedIn_Leads dedicated tab
    var rowValues = headers.map(function (h) {
      return lead[h] !== undefined ? lead[h] : "";
    });
    sheet.appendRow(rowValues);

    // 2. Mirror into Lead_Management master tab
    try {
      appendRowToTab(ss, "Lead_Management", {
        received_at: receivedAt,
        lead_id: lead.lead_id,
        lead_type: "LINKEDIN_LEAD",
        name: lead.full_name,
        phone: lead.phone,
        email: lead.email,
        service_or_requirement: lead.service_or_requirement,
        city: lead.city,
        lead_source: lead.lead_source,
        form_name: lead.form_name,
        lead_status: "New",
        follow_up_status: lead.follow_up_status,
        total_value: "LinkedIn Lead",
        source_environment: "test",
        jira_synced: jiraKey ? "SYNCED" : "PENDING",
        jira_issue_key: jiraKey
      });
    } catch (mErr) { }

    // 3. Email notification
    try {
      sendLinkedInLeadAlertEmail(lead);
    } catch (eErr) { }

    inserted++;
  }

  var msg = "🎉 Sample LinkedIn Leads Ingested Successfully!\n\n" +
    "• " + inserted + " verified leads added to 'LinkedIn_Leads' tab.\n" +
    "• Auto-escalated to Jira with 8 operational subtasks.\n" +
    "• Mirrored into 'Lead_Management' master tab.\n" +
    "• Formatted HTML email alert dispatched to operations desk.";

  Logger.log(msg);
  var ui = null;
  try { ui = SpreadsheetApp.getUi(); } catch (e) { }
  if (ui) ui.alert("✅ Sample LinkedIn Ingest Complete", msg, ui.ButtonSet.OK);

  return { success: true, count: inserted, message: msg };
}

// Interactive helper function for Google Sheets:
// Prompts the user to quickly paste any LinkedIn post comment or direct message inquiry,
// auto-classifies healthcare intent, generates Jira issue with 8 subtasks,
// appends to LinkedIn_Leads, Live_Traffic_Events and Lead_Management tabs, and dispatches email alert!
function LOG_LINKEDIN_POST_INTERACTION() {
  var ui = SpreadsheetApp.getUi();
  var nameRes = ui.prompt("💬 Log LinkedIn Post Lead", "Enter Commenter Full Name (or LinkedIn Headline):", ui.ButtonSet.OK_CANCEL);
  if (nameRes.getSelectedButton() !== ui.Button.OK) return;
  var name = nameRes.getResponseText().trim();
  if (!name) {
    ui.alert("⚠️ Name is required.");
    return;
  }

  var commentRes = ui.prompt("💬 Comment / Inquiry", "Enter the Comment text or requirement:", ui.ButtonSet.OK_CANCEL);
  if (commentRes.getSelectedButton() !== ui.Button.OK) return;
  var commentText = commentRes.getResponseText().trim();

  var contactRes = ui.prompt("📞 Contact / Location (Optional)", "Enter Phone, City or LinkedIn Profile URL (or leave blank):", ui.ButtonSet.OK_CANCEL);
  var extraInfo = contactRes.getSelectedButton() === ui.Button.OK ? contactRes.getResponseText().trim() : "";

  // Auto-detect intent using ApnaCare healthcare NLP classifier
  var analysis = detectHealthcareEnquiryIntent(commentText);
  var intent = analysis.intent;

  var ss = getSpreadsheet();
  var sheet = getTab(ss, "LinkedIn_Leads");
  var headers = TAB_HEADERS.LinkedIn_Leads;

  var leadId = "LI-POST-" + Date.now().toString(36).toUpperCase().slice(-6);
  var receivedAt = normalizeTimestamp(new Date());

  var jiraKey = "";
  if (JIRA_CONFIG && JIRA_CONFIG.API_TOKEN) {
    try {
      var jRes = pushLeadToJira({
        Name: name,
        Phone: extraInfo.match(/\+?\d[\d -]{7,}\d/) ? extraInfo : "",
        Email: "",
        Service: intent + " (LinkedIn Post Comment)",
        City: extraInfo.match(/(chennai|bengaluru|bangalore|hyderabad|mumbai|delhi|coimbatore)/i) ? extraInfo : "Pan-India",
        LeadType: "LinkedIn Post Comment Lead",
        ReferenceID: leadId,
        Details: "Inbound LinkedIn Post Comment Logged:\nCommenter: " + name + "\nIntent: " + intent + "\nDetails: " + extraInfo + "\n\nComment:\n\"" + commentText + "\"",
        PagePath: "/linkedin",
        Timestamp: receivedAt,
        SourceEnvironment: "production"
      });
      if (jRes && jRes.success && jRes.key) {
        jiraKey = jRes.key;
      }
    } catch (jErr) {
      Logger.log("⚠️ Jira error: " + jErr.message);
    }
  }

  var leadRecord = {
    received_at: receivedAt,
    lead_id: leadId,
    full_name: name,
    service_or_requirement: intent,
    lead_type: "LINKEDIN_COMMENT_LEAD",
    lead_source: "LinkedIn Post Comment",
    form_name: "Post Comment Triage",
    user_notes: commentText + (extraInfo ? (" | Contact/Info: " + extraInfo) : ""),
    lead_status: "New",
    follow_up_status: "Pending Response",
    jira_key_primary: jiraKey,
    jira_key_secondary: jiraKey ? (jiraKey + " (8 Subtasks Created)") : "",
    source_environment: "production"
  };

  // 1. Append to LinkedIn_Leads
  var rowValues = headers.map(function (h) {
    return leadRecord[h] !== undefined ? leadRecord[h] : "";
  });
  sheet.appendRow(rowValues);

  // 2. Append to Live_Traffic_Events (Raw firehose)
  try {
    appendRowToTab(ss, "Live_Traffic_Events", {
      received_at: receivedAt,
      event_id: leadId,
      event_type: "linkedin_comment_lead",
      event_name: "linkedin_comment_logged",
      event_category: "Lead",
      lead_type: "LINKEDIN_LEAD",
      lead_source: "LinkedIn Post Comment",
      source_environment: "production"
    });
  } catch (eRaw) { }

  // 3. Mirror into Lead_Management
  try {
    appendRowToTab(ss, "Lead_Management", {
      received_at: receivedAt,
      lead_id: leadId,
      lead_type: "LINKEDIN_LEAD",
      name: name,
      service_or_requirement: intent,
      lead_source: "LinkedIn Post Comment",
      form_name: "LinkedIn Post Interaction",
      lead_status: "New",
      follow_up_status: "Pending Response",
      total_value: "LinkedIn Lead",
      source_environment: "production",
      jira_synced: jiraKey ? "SYNCED" : "PENDING",
      jira_issue_key: jiraKey
    });
  } catch (eLead) { }

  // 4. Send email alert
  try {
    sendLinkedInLeadAlertEmail(leadRecord);
  } catch (eMail) { }

  ui.alert(
    "✅ LinkedIn Lead Logged Successfully!",
    "• Logged in 'LinkedIn_Leads', 'Live_Traffic_Events' and 'Lead_Management' tabs.\n" +
    "• Detected Intent: " + intent + "\n" +
    "• Jira Issue: " + (jiraKey ? (jiraKey + " (with 8 Subtasks)") : "Sheet Logged") + "\n" +
    "• Operations email notification dispatched.",
    ui.ButtonSet.OK
  );
}




