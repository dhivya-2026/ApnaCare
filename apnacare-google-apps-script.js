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
  ISSUE_TYPE: (typeof PropertiesService !== "undefined" && PropertiesService.getScriptProperties && PropertiesService.getScriptProperties().getProperty("JIRA_ISSUE_TYPE")) || "Task"
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

  Attendant_Portal_Logs: [
    "received_at", "log_id", "attendant_id", "attendant_name", "mobile", "role", "city",
    "action_type", "shift_status", "patient_name", "vitals_summary", "notes", "source_environment"
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
      return { success: true, key: json.key, id: json.id };
    } else {
      Logger.log("⚠️ Jira API returned HTTP " + code + ": " + respText);
      return { success: false, error: respText, statusCode: code };
    }
  } catch (err) {
    Logger.log("⚠️ Failed to dispatch to Jira: " + err.message);
    return { success: false, error: err.message };
  }
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
    return { success: false, error: err.message };
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

    // G. ATTENDANT PORTAL ACTIONS
    else if (formName.includes("attendant") || p.action_type || evtName.includes("attendant_")) {
      p.log_id = p.log_id || ("ATT-" + Date.now().toString(36).toUpperCase());
      writeResults.push(appendRowToTab(ss, "Attendant_Portal_Logs", p));
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

  getUniqueRecipients(EMAIL_CONFIG.reportEmails).forEach(function (em) {
    safeSendEmail({
      to: em,
      subject: "[ApnaCare] " + intervalName + " Digest — " + period + " (" + totalLeads + " Inbound Leads)",
      htmlBody: html,
      name: EMAIL_CONFIG.name,
      replyTo: EMAIL_CONFIG.replyTo
    });
  });

  // Also push digest intelligence to Jira as a tracking Task ticket
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

function setupAllApnaCareTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function (t) { ScriptApp.deleteTrigger(t); });

  // 1. Daily Executive Briefing every evening at 9:00 PM IST
  ScriptApp.newTrigger("dailyReport").timeBased().everyDays(1).atHour(21).create();

  // 2. Weekly Executive Digest every Friday at 9:00 PM IST
  ScriptApp.newTrigger("weeklyReport").timeBased().onWeekDay(ScriptApp.WeekDay.FRIDAY).atHour(21).create();

  // 3. Monthly Executive Summary on the 1st of every month at 9:00 AM IST
  ScriptApp.newTrigger("monthlyReport").timeBased().onMonthDay(1).atHour(9).create();

  // 4. Automatic Airtable Lead Sync every 10 minutes
  ScriptApp.newTrigger("AUTOMATED_AIRTABLE_SYNC_TRIGGER").timeBased().everyMinutes(10).create();

  // 5. Automatic Jira Lead Sync every 10 minutes
  ScriptApp.newTrigger("AUTOMATED_JIRA_SYNC_TRIGGER").timeBased().everyMinutes(10).create();

  try {
    SpreadsheetApp.getUi().alert("✅ Automated Report & Lead Sync Triggers Activated!\n\n• Daily, Weekly & Monthly Digests (Email + Jira)\n• 10-Minute Airtable Lead Sync\n• 10-Minute Jira Lead Sync");
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
      .addItem('⏰ Enable All Scheduled Triggers (Daily, Weekly, Monthly, Airtable & Jira)', 'setupAllApnaCareTriggers')
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

