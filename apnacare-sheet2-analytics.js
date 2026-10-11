/**
 * ==============================================================================================
 * APNACARE — ANALYTICS & INTELLIGENCE ENGINE (SHEET 2)
 * ==============================================================================================
 * Reads the raw collection spreadsheet (Sheet 1) and builds 16 analytics dashboards
 * in the centralized analytics spreadsheet (Sheet 2).
 *
 * SETUP INSTRUCTIONS:
 * 1. Open your Sheet 2 Google Spreadsheet (ApnaCare Analytics).
 * 2. Click Extensions > Apps Script.
 * 3. Replace all editor contents with this entire file and save (Ctrl+S).
 * 4. Run PULL_DATA_AND_BUILD_ALL_DASHBOARDS and authorize permissions when prompted.
 * 5. Run CREATE_ANALYTICS_REFRESH_TRIGGER to enable automated hourly refreshes.
 *
 * Safe Architecture:
 * - Read-only on Sheet 1 (does NOT clear, write, or modify raw data).
 * - Full PII privacy masking on patient contact details.
 * - Auto-detects Sheet 2 container or uses TARGET_SHEET_ID fallback.
 * - Supports Web App GET/POST for on-demand HTTP dashboard refreshes.
 * ==============================================================================================
 */

// ==============================================================================================
// 1. CONFIGURATION & CONSTANTS
// ==============================================================================================
var DATA_SHEET_ID = "1W3qIeqYaQQ5qt02x6JKjy7VcQPRRMaw0cHvePg1Vu7A";     // ApnaCare Sheet 1 (Raw Data)
var TARGET_SHEET_ID = "1SrjZRxt1bESmOOTTwoE4ogvXdmw5DrQ-1wyHBrTb8Lc";   // ApnaCare Sheet 2 (Analytics)
var SITE_BASE_URL = "https://apna-care.vercel.app/";
var TIMEZONE = "Asia/Kolkata";

var PALETTE = {
  navy: "#0F2B48", teal: "#0D9488", aqua: "#0891B2",
  green: "#16A34A", amber: "#D97706", red: "#DC2626",
  purple: "#7C3AED", pale: "#F1F5F9", white: "#FFFFFF",
  ink: "#0F172A", muted: "#64748B", blue: "#1E3A8A"
};

var SOURCE_TABS = [
  "Live_Traffic_Events", "Visitor_Sessions", "Page_Performance",
  "Click_Interactions", "Scroll_Engagement", "Form_Interactions",
  "Conversion_Events", "Traffic_Sources", "Booking_Leads",
  "Callback_Enquiries", "Contact_Submissions", "Partner_Applications",
  "Chatbot_Leads", "SOS_Emergency_Alerts", "Attendant_Portal_Logs",
  "Lead_Management", "Daily_Summary", "Weekly_Summary",
  "Monthly_Summary", "Geo_Timezone_Intelligence", "IP_Security_Intelligence"
];

var DASHBOARD_TABS = [
  "01 Mission Control", "02 Executive KPIs", "03 Traffic & Pages",
  "04 Visitor Retention", "05 Daily Heatmap", "06 Growth Trends",
  "07 Traffic Sources", "08 Device Profile", "09 CTA Clicks",
  "10 Scroll Engagement", "11 Session Intelligence", "12 Booking Funnel",
  "13 Leads & Operations", "14 Attendant & Chatbot",
  "15 Geo Profile", "16 Data Quality"
];

// ==============================================================================================
// 2. MENU & TRIGGER MANAGEMENT
// ==============================================================================================
function onOpen() {
  SpreadsheetApp.getUi().createMenu("🏥 ApnaCare Analytics")
    .addItem("🚀 Build / Refresh all 16 dashboards", "PULL_DATA_AND_BUILD_ALL_DASHBOARDS")
    .addItem("📤 Sync All Sheet 1 Leads to Airtable", "SYNC_ALL_LEADS_TO_AIRTABLE")
    .addSeparator()
    .addItem("⏰ Create hourly refresh trigger", "CREATE_ANALYTICS_REFRESH_TRIGGER")
    .addItem("🛑 Remove refresh triggers", "REMOVE_ANALYTICS_REFRESH_TRIGGERS")
    .addToUi();
}

function CREATE_ANALYTICS_REFRESH_TRIGGER() {
  REMOVE_ANALYTICS_REFRESH_TRIGGERS();
  ScriptApp.newTrigger("PULL_DATA_AND_BUILD_ALL_DASHBOARDS").timeBased().everyHours(1).create();
  try {
    SpreadsheetApp.getActiveSpreadsheet().toast("Hourly refresh trigger created.", "ApnaCare Analytics", 5);
  } catch (e) {}
}

function REMOVE_ANALYTICS_REFRESH_TRIGGERS() {
  var count = 0;
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === "PULL_DATA_AND_BUILD_ALL_DASHBOARDS") {
      ScriptApp.deleteTrigger(t);
      count++;
    }
  });
  try {
    SpreadsheetApp.getActiveSpreadsheet().toast("Removed " + count + " triggers.", "ApnaCare Analytics", 5);
  } catch (e) {}
}

function getOutputSpreadsheet_() {
  var active = null;
  try { active = SpreadsheetApp.getActiveSpreadsheet(); } catch (e) {}
  if (active) return active;

  try { active = SpreadsheetApp.getActive(); } catch (e) {}
  if (active) return active;

  if (TARGET_SHEET_ID && TARGET_SHEET_ID.trim() !== "") {
    try { return SpreadsheetApp.openById(TARGET_SHEET_ID.trim()); } catch (e) {}
  }
  throw new Error("Could not locate Sheet 2. Please open Sheet 2, or set TARGET_SHEET_ID in Code.gs.");
}

// ==============================================================================================
// 3. MASTER DATA PULL & REFRESH ORCHESTRATION
// ==============================================================================================
function PULL_DATA_AND_BUILD_ALL_DASHBOARDS() {
  var output = getOutputSpreadsheet_();
  if (!output) throw new Error("Open this script from the separate ApnaCare Analytics spreadsheet.");
  if (!DATA_SHEET_ID || DATA_SHEET_ID.indexOf("PASTE_") === 0) {
    throw new Error("Set DATA_SHEET_ID to the ID of your raw data spreadsheet.");
  }

  var source = SpreadsheetApp.openById(DATA_SHEET_ID);
  var data = {};
  SOURCE_TABS.forEach(function(name) {
    try {
      var sheet = source.getSheetByName(name);
      data[name] = sheet && sheet.getLastRow() > 0 ? sheet.getDataRange().getValues() : [];
    } catch (e) {
      data[name] = [];
    }
  });

  // Extract structured objects
  var events = rowsAsObjects_(data.Live_Traffic_Events);
  var sessions = rowsAsObjects_(data.Visitor_Sessions);
  var pages = rowsAsObjects_(data.Page_Performance);
  var clicks = rowsAsObjects_(data.Click_Interactions);
  var scrolls = rowsAsObjects_(data.Scroll_Engagement);
  var forms = rowsAsObjects_(data.Form_Interactions);
  var conversions = rowsAsObjects_(data.Conversion_Events);
  var traffic = rowsAsObjects_(data.Traffic_Sources);
  
  // ApnaCare Healthcare Specific Lead Sources
  var bookings = rowsAsObjects_(data.Booking_Leads);
  var callbacks = rowsAsObjects_(data.Callback_Enquiries);
  var contacts = rowsAsObjects_(data.Contact_Submissions);
  var partners = rowsAsObjects_(data.Partner_Applications);
  var chatbot = rowsAsObjects_(data.Chatbot_Leads);
  var sos = rowsAsObjects_(data.SOS_Emergency_Alerts);
  var attendants = rowsAsObjects_(data.Attendant_Portal_Logs);
  var masterLeads = rowsAsObjects_(data.Lead_Management);

  var leads = []
    .concat(bookings.map(function(r){ r._sourceType = "Booking"; return r; }))
    .concat(callbacks.map(function(r){ r._sourceType = "Callback"; return r; }))
    .concat(contacts.map(function(r){ r._sourceType = "Contact"; return r; }))
    .concat(masterLeads.map(function(r){ r._sourceType = "Lead_Master"; return r; }));

  var geo = rowsAsObjects_(data.Geo_Timezone_Intelligence);
  var security = rowsAsObjects_(data.IP_Security_Intelligence);

  // Fallbacks & Deduplication
  if (!events.length) events = pages;
  var devFiltered = 0;
  events = events.filter(function(r) {
    var url = str_(val_(r, ["page_url", "url", "page_path"], "")).toLowerCase();
    var env = str_(val_(r, ["source_environment", "env"], "")).toLowerCase();
    if (env === "development" || url.indexOf("localhost") !== -1 || url.indexOf("127.0.0.1") !== -1) {
      devFiltered++;
      return false;
    }
    return true;
  });

  events = dedupe_(events, "event_id");
  clicks = dedupe_(clicks, "event_id");
  scrolls = dedupe_(scrolls, "event_id");
  sessions = dedupe_(sessions, "session_id");
  bookings = dedupe_(bookings, "booking_ref");
  callbacks = dedupe_(callbacks, "enquiry_id");
  sos = dedupe_(sos, "alert_id");

  var summary = {
    refreshedAt: new Date(),
    events: events,
    sessions: sessions,
    pages: pages,
    clicks: clicks,
    scrolls: scrolls,
    forms: forms,
    conversions: conversions,
    traffic: traffic,
    leads: leads,
    bookings: bookings,
    callbacks: callbacks,
    contacts: contacts,
    partners: partners,
    chatbot: chatbot,
    sos: sos,
    attendants: attendants,
    geo: geo,
    security: security,
    rawTabCounts: {},
    devRowsFiltered: devFiltered
  };

  SOURCE_TABS.forEach(function(name) {
    summary.rawTabCounts[name] = Math.max(0, (data[name] || []).length - 1);
  });

  // Build all 16 ApnaCare Analytics Dashboards
  buildMissionControl_(output, summary);
  buildExecutiveKPIs_(output, summary);
  buildTrafficPages_(output, summary);
  buildVisitorRetention_(output, summary);
  buildHeatmap_(output, summary);
  buildGrowthTrends_(output, summary);
  buildTrafficSources_(output, summary);
  buildDeviceProfile_(output, summary);
  buildClicks_(output, summary);
  buildScroll_(output, summary);
  buildSessions_(output, summary);
  buildFunnel_(output, summary);
  buildLeads_(output, summary);
  buildAttendantChatbot_(output, summary);
  buildGeo_(output, summary);
  buildDataQuality_(output, summary);

  // Focus Mission Control
  var mc = output.getSheetByName("01 Mission Control");
  if (mc) output.setActiveSheet(mc);

  try {
    output.toast("16 ApnaCare analytics dashboards refreshed successfully.", "ApnaCare Analytics", 6);
  } catch (e) {}

  return summary;
}

// ==============================================================================================
// 4. DATA PROCESSING & PRIVACY UTILITIES
// ==============================================================================================
function rowsAsObjects_(values) {
  if (!values || values.length < 2) return [];
  var headers = values[0].map(function(h) { return String(h || "").trim(); });
  return values.slice(1).filter(function(row) {
    return row.some(function(v) { return v !== "" && v !== null; });
  }).map(function(row) {
    var o = {};
    headers.forEach(function(h, i) { if (h) o[h] = row[i]; });
    return o;
  });
}

function dedupe_(rows, key) {
  var seen = {};
  return (rows || []).filter(function(r) {
    var value = r[key];
    if (value === "" || value === null || value === undefined) {
      var fallback = JSON.stringify(r);
      if (seen[fallback]) return false;
      seen[fallback] = true;
      return true;
    }
    var k = String(value);
    if (seen[k]) return false;
    seen[k] = true;
    return true;
  });
}

function val_(row, names, fallback) {
  for (var i = 0; i < names.length; i++) {
    var v = row[names[i]];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return fallback === undefined ? "" : fallback;
}

function str_(v) { return v === undefined || v === null ? "" : String(v).trim(); }
function num_(v) { var n = Number(v); return isFinite(n) ? n : 0; }
function pct_(n, d) { return d ? n / d : 0; }

function parseDate_(v) {
  if (!v) return null;
  if (v instanceof Date && !isNaN(v.getTime())) return v;
  var d = new Date(String(v).replace(" IST", ""));
  return isNaN(d.getTime()) ? null : d;
}

function dateKey_(v) {
  var d = parseDate_(v);
  return d ? Utilities.formatDate(d, TIMEZONE, "yyyy-MM-dd") : "Unknown";
}

function eventDate_(r) {
  return val_(r, ["received_at", "client_timestamp", "timestamp", "Date", "Timestamp"], "");
}

function visitor_(r) { return str_(val_(r, ["visitor_id", "visitorId", "Visitor_ID"], "")); }
function session_(r) { return str_(val_(r, ["session_id", "sessionId", "Session_ID"], "")); }
function page_(r) { return str_(val_(r, ["page_path", "page_url", "pageUrl", "url", "Page_URL"], "(unknown)")); }
function eventName_(r) { return str_(val_(r, ["event_name", "event_type", "action", "event_action"], "(unknown)")); }

function mask_(v, type) {
  if (!v) return "—";
  var s = String(v).trim();
  if (type === "phone") {
    return s.length > 4 ? "******" + s.substring(s.length - 4) : "******";
  } else if (type === "email") {
    var p = s.split("@");
    return p.length === 2 ? (p[0].length > 2 ? p[0].substring(0, 2) + "***" : p[0].charAt(0) + "***") + "@" + p[1] : "***@***";
  } else if (type === "name") {
    return s.split(" ").map(function(w){ return w.length > 1 ? w.charAt(0) + "***" : w; }).join(" ");
  }
  return s;
}

function dashboard_(ss, name, title, subtitle, span) {
  var sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  sh.clear();
  sh.getCharts().forEach(function(chart) { sh.removeChart(chart); });
  sh.setHiddenGridlines(false);
  var width = Math.max(span || 8, 4);
  sh.getRange(1, 1, 1, width).merge().setValue(title)
    .setBackground(PALETTE.navy).setFontColor(PALETTE.white)
    .setFontSize(15).setFontWeight("bold").setHorizontalAlignment("left");
  sh.setRowHeight(1, 40);
  sh.getRange(2, 1, 1, width).merge().setValue(subtitle + " • Refreshed " +
    Utilities.formatDate(new Date(), TIMEZONE, "dd MMM yyyy HH:mm"))
    .setBackground(PALETTE.pale).setFontColor(PALETTE.muted).setFontSize(9.5);
  sh.setRowHeight(2, 24);
  sh.setFrozenRows(2);
  sh.setColumnWidths(1, width, 150);
  return sh;
}

function writeTable_(sh, row, col, headers, rows) {
  if (!headers || !headers.length) return row;
  sh.getRange(row, col, 1, headers.length).setValues([headers])
    .setBackground(PALETTE.teal).setFontColor(PALETTE.white).setFontWeight("bold").setWrap(true);
  if (rows && rows.length) {
    sh.getRange(row + 1, col, rows.length, headers.length).setValues(rows);
    for (var r = 0; r < rows.length; r++) {
      var bg = (r % 2 === 0) ? PALETTE.white : PALETTE.pale;
      sh.getRange(row + 1 + r, col, 1, headers.length).setBackground(bg).setFontColor(PALETTE.ink);
    }
    sh.getRange(row + 1, col, rows.length, headers.length).setBorder(true, true, true, true, true, true, "#E2E8F0", SpreadsheetApp.BorderStyle.SOLID);
  }
  return row + (rows ? rows.length : 0) + 1;
}

function writeKpis_(sh, items, startRow) {
  var row = startRow || 4, col = 1;
  items.forEach(function(item, i) {
    var c = col + (i % 4) * 2;
    var r = row + Math.floor(i / 4) * 3;
    sh.getRange(r, c, 1, 2).merge().setValue(item[0]).setBackground(PALETTE.navy)
      .setFontColor(PALETTE.white).setFontWeight("bold").setHorizontalAlignment("center").setWrap(true);
    sh.getRange(r + 1, c, 1, 2).merge().setValue(item[1]).setBackground(item[2] || PALETTE.teal)
      .setFontColor(PALETTE.white).setFontSize(16).setFontWeight("bold").setHorizontalAlignment("center");
  });
}

function countBy_(rows, getter) {
  var map = {};
  (rows || []).forEach(function(r) {
    var k = str_(getter(r)) || "(not provided)";
    map[k] = (map[k] || 0) + 1;
  });
  return Object.keys(map).map(function(k) { return [k, map[k]]; })
    .sort(function(a, b) { return b[1] - a[1]; });
}

function addChart_(sh, type, range, row, col, title) {
  if (range.getNumRows() < 2) return;
  try {
    var chart = sh.newChart().setChartType(type).addRange(range)
      .setPosition(row, col, 0, 0).setOption("title", title)
      .setOption("legend", { position: "bottom" }).setOption("width", 500).setOption("height", 290).build();
    sh.insertChart(chart);
  } catch (e) { console.log("Chart skipped: " + title + " " + e); }
}

// ==============================================================================================
// 5. THE 16 APNACARE ANALYTICS DASHBOARDS
// ==============================================================================================

/** Dashboard 1: Mission Control **/
function buildMissionControl_(ss, d) {
  var sh = dashboard_(ss, "01 Mission Control", "🏥 APNACARE • ANALYTICS MISSION CONTROL",
    "Central operations console for patient traffic, attendant bookings, and telemetry health", 8);
  var uniqueVisitors = {};
  d.events.forEach(function(r) { if (visitor_(r)) uniqueVisitors[visitor_(r)] = true; });
  var uniqueSessions = {};
  d.events.forEach(function(r) { if (session_(r)) uniqueSessions[session_(r)] = true; });
  var pageViews = d.events.filter(function(r) {
    var n = eventName_(r).toLowerCase(), t = str_(val_(r, ["event_type"], "")).toLowerCase();
    return n.indexOf("page_view") >= 0 || t === "page_view" || t === "page";
  }).length;

  writeKpis_(sh, [
    ["Total Live Events", d.events.length, PALETTE.teal],
    ["Unique Visitors", Object.keys(uniqueVisitors).length, PALETTE.blue],
    ["Active Sessions", Object.keys(uniqueSessions).length, PALETTE.purple],
    ["Page Views", pageViews > 0 ? pageViews : d.events.length, PALETTE.aqua],
    ["Attendant Bookings", d.bookings.length, PALETTE.green],
    ["Callback Enquiries", d.callbacks.length, PALETTE.amber],
    ["Emergency SOS Alerts", d.sos.length, PALETTE.red],
    ["Attendant Shift Logs", d.attendants.length, PALETTE.blue]
  ], 4);

  writeTable_(sh, 12, 1, ["Source tab name", "Data rows available"], Object.keys(d.rawTabCounts).map(function(k) {
    return [k, d.rawTabCounts[k]];
  }));
  sh.setColumnWidths(1, 8, 145);
}

/** Dashboard 2: Executive KPIs **/
function buildExecutiveKPIs_(ss, d) {
  var sh = dashboard_(ss, "02 Executive KPIs", "EXECUTIVE PERFORMANCE DASHBOARD",
    "Healthcare service demand, patient booking velocity, and acquisition indicators", 8);
  var visitors = {};
  d.events.forEach(function(r) { if (visitor_(r)) visitors[visitor_(r)] = true; });
  var vCount = Object.keys(visitors).length;
  var totalLeads = d.bookings.length + d.callbacks.length + d.contacts.length;
  var engagement = d.events.map(function(r) { return num_(val_(r, ["time_on_page_seconds", "session_duration_seconds"], 0)); });
  var avg = engagement.length ? Math.round(engagement.reduce(function(a,b){return a+b;},0) / engagement.length) : 0;

  writeKpis_(sh, [
    ["Total Traffic Events", d.events.length, PALETTE.teal],
    ["Unique Patients / Visitors", vCount, PALETTE.blue],
    ["Total Care Inquiries", totalLeads, PALETTE.green],
    ["Verified Bookings", d.bookings.length, PALETTE.purple],
    ["Inquiry Conversion Rate", (pct_(totalLeads, vCount || d.events.length) * 100).toFixed(1) + "%", PALETTE.amber],
    ["Avg Recorded Time (sec)", avg, PALETTE.aqua],
    ["Booking CTA Clicks", d.clicks.length, PALETTE.teal],
    ["Filtered Localhost Events", d.devRowsFiltered, PALETTE.muted]
  ], 4);

  var eventRows = countBy_(d.events, eventName_).slice(0, 12);
  writeTable_(sh, 12, 1, ["Event identifier", "Occurrences"], eventRows);
  addChart_(sh, Charts.ChartType.BAR, sh.getRange(12, 1, Math.max(2, eventRows.length + 1), 2), 12, 4, "Top interaction event types");
}

/** Dashboard 3: Traffic & Pages **/
function buildTrafficPages_(ss, d) {
  var sh = dashboard_(ss, "03 Traffic & Pages", "TRAFFIC & HEALTHCARE SERVICE PAGES",
    "Most-viewed patient routes, care service pages, and portal activity", 8);
  var rows = countBy_(d.events, page_).slice(0, 25);
  writeTable_(sh, 4, 1, ["Service route / URL", "Page visits"], rows);
  addChart_(sh, Charts.ChartType.BAR, sh.getRange(4, 1, Math.max(2, rows.length + 1), 2), 4, 4, "Top patient routes by volume");
  var pageTitleRows = countBy_(d.pages, function(r) { return val_(r, ["page_title", "page_path"], "(unknown)"); }).slice(0, 20);
  writeTable_(sh, 4, 7, ["Page title", "Records"], pageTitleRows);
}

/** Dashboard 4: Visitor Retention **/
function buildVisitorRetention_(ss, d) {
  var sh = dashboard_(ss, "04 Visitor Retention", "PATIENT VISITOR RETENTION & RECURRENCE",
    "Browser-level identification across new and returning family visitors", 8);
  var counts = {};
  d.events.forEach(function(r) { var id = visitor_(r); if (id) counts[id] = (counts[id] || 0) + 1; });
  var oneEvent = 0, repeatEvent = 0;
  Object.keys(counts).forEach(function(id) { if (counts[id] === 1) oneEvent++; else repeatEvent++; });

  writeKpis_(sh, [
    ["Identified Visitor IDs", Object.keys(counts).length, PALETTE.blue],
    ["Single-Visit Browsers", oneEvent, PALETTE.teal],
    ["Returning Care Evaluators", repeatEvent, PALETTE.green],
    ["Records Missing visitor_id", d.events.filter(function(r){return !visitor_(r);}).length, PALETTE.amber]
  ], 4);

  writeTable_(sh, 9, 1, ["Visitor segment", "Count"],
    [["First-time exploratory visitors (1 recorded event)", oneEvent],
     ["Returning / multi-interaction visitors (2+ recorded events)", repeatEvent]]);
  addChart_(sh, Charts.ChartType.PIE, sh.getRange(9, 1, 3, 2), 9, 4, "Visitor retention distribution");
}

/** Dashboard 5: Daily Heatmap **/
function buildHeatmap_(ss, d) {
  var sh = dashboard_(ss, "05 Daily Heatmap", "WEEKDAY × HOUR PATIENT ACTIVITY HEATMAP",
    "Hourly engagement density in Asia/Kolkata timezone for attendant staffing coverage", 26);
  var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"], matrix = [];
  for (var i=0;i<7;i++) matrix.push(new Array(24).fill(0));
  d.events.forEach(function(r) {
    var dt = parseDate_(eventDate_(r)); if (!dt) return;
    var day = Number(Utilities.formatDate(dt, TIMEZONE, "u")) % 7;
    var hour = Number(Utilities.formatDate(dt, TIMEZONE, "H"));
    matrix[day][hour]++;
  });
  var rows = matrix.map(function(a, i) { return [days[i]].concat(a); });
  writeTable_(sh, 4, 1, ["Day"].concat(Array.from({length:24}, function(_,i){return String(i).padStart(2,"0")+":00";})), rows);
  var all = [];
  matrix.forEach(function(row){row.forEach(function(n){all.push(n);});});
  var max = Math.max.apply(null, all.concat([1]));
  for (var r=0;r<7;r++) for (var c=0;c<24;c++) {
    var n=matrix[r][c], intensity=n/max;
    sh.getRange(5+r,2+c).setBackground(intensity > .7 ? "#0F766E" : intensity > .35 ? "#99F6E4" : intensity > 0 ? "#CCFBF1" : PALETTE.white)
      .setFontColor(intensity > .7 ? PALETTE.white : PALETTE.ink);
  }
  sh.setColumnWidth(1, 70);
  sh.setColumnWidths(2, 24, 48);
}

/** Dashboard 6: Growth Trends **/
function buildGrowthTrends_(ss, d) {
  var sh = dashboard_(ss, "06 Growth Trends", "PATIENT TRAFFIC & BOOKING MOMENTUM",
    "Daily event volume and patient booking requests over time", 8);
  var byDay = {};
  d.events.forEach(function(r) { var k=dateKey_(eventDate_(r)); if(k!=="Unknown") byDay[k]=(byDay[k]||0)+1; });
  var eventRows = Object.keys(byDay).sort().map(function(k){return [k,byDay[k]];});
  writeTable_(sh, 4, 1, ["Date", "Recorded events"], eventRows);
  addChart_(sh, Charts.ChartType.LINE, sh.getRange(4, 1, Math.max(2, eventRows.length + 1), 2), 4, 4, "Daily traffic growth trajectory");
  
  var bookingsByDay = {};
  d.bookings.concat(d.callbacks).forEach(function(r) {
    var k = dateKey_(eventDate_(r)); if (k !== "Unknown") bookingsByDay[k] = (bookingsByDay[k] || 0) + 1;
  });
  writeTable_(sh, 4, 7, ["Date", "Bookings & enquiries"], Object.keys(bookingsByDay).sort().map(function(k){return [k, bookingsByDay[k]];}));
}

/** Dashboard 7: Traffic Sources **/
function buildTrafficSources_(ss, d) {
  var sh = dashboard_(ss, "07 Traffic Sources", "PATIENT ACQUISITION & REFERRER CHANNELS",
    "Traffic attribution across direct visits, hospital referrals, and search campaigns", 8);
  var rows = countBy_(d.traffic.concat(d.events), function(r) {
    return val_(r, ["traffic_source", "utm_source", "referrer_url", "referrer"], "(direct / organic)");
  }).slice(0, 25);
  writeTable_(sh, 4, 1, ["Traffic channel / referrer", "Visits"], rows);
  addChart_(sh, Charts.ChartType.PIE, sh.getRange(4, 1, Math.max(2, rows.length + 1), 2), 4, 4, "Patient acquisition mix");
  
  var campaigns = countBy_(d.traffic.concat(d.events), function(r) {
    var s = str_(val_(r, ["utm_source"], "")), m = str_(val_(r, ["utm_medium"], "")), c = str_(val_(r, ["utm_campaign"], ""));
    return [s, m, c].filter(Boolean).join(" / ") || "(no active UTM campaign)";
  }).slice(0, 25);
  writeTable_(sh, 4, 7, ["UTM source / medium / campaign", "Records"], campaigns);
}

/** Dashboard 8: Device Profile **/
function buildDeviceProfile_(ss, d) {
  var sh = dashboard_(ss, "08 Device Profile", "DEVICE & ACCESSIBILITY PROFILE",
    "Hardware form factors and browsers used by patient families", 8);
  var devices = countBy_(d.events, function(r){ return val_(r, ["device_type", "deviceType"], "(not provided)"); });
  var browsers = countBy_(d.events, function(r){ return val_(r, ["browser"], "(not provided)"); });
  var systems = countBy_(d.events, function(r){ return val_(r, ["operating_system", "operatingSystem"], "(not provided)"); });
  writeTable_(sh, 4, 1, ["Device form factor", "Events"], devices);
  writeTable_(sh, 4, 4, ["Browser", "Events"], browsers);
  writeTable_(sh, 4, 7, ["Operating system", "Events"], systems);
  addChart_(sh, Charts.ChartType.PIE, sh.getRange(4, 1, Math.max(2, devices.length + 1), 2), 4, 10, "Mobile vs Desktop hardware share");
}

/** Dashboard 9: CTA Clicks **/
function buildClicks_(ss, d) {
  var sh = dashboard_(ss, "09 CTA Clicks", "BOOKING CTA & INTERACTION ANALYSIS",
    "Most-clicked healthcare reservation buttons and contact triggers", 8);
  var labels = countBy_(d.clicks, function(r){ return val_(r, ["element_text", "event_label", "element_id", "event_action"], "(unlabelled click)"); }).slice(0, 30);
  writeTable_(sh, 4, 1, ["CTA label / Button text", "Clicks"], labels);
  addChart_(sh, Charts.ChartType.BAR, sh.getRange(4, 1, Math.max(2, labels.length + 1), 2), 4, 4, "Most-clicked reservation elements");
  var sections = countBy_(d.clicks, function(r){ return val_(r, ["section", "page_path"], "(unknown section)"); }).slice(0, 25);
  writeTable_(sh, 4, 7, ["Page section", "Clicks"], sections);
}

/** Dashboard 10: Scroll Engagement **/
function buildScroll_(ss, d) {
  var sh = dashboard_(ss, "10 Scroll Engagement", "SCROLL DEPTH & CLINICAL CONTENT RETENTION",
    "Reading depth across elder care and post-surgery care service descriptions", 8);
  var buckets = { "0–24% (Header)": 0, "25–49% (Services)": 0, "50–74% (Care Details)": 0, "75–89% (Pricing/Reviews)": 0, "90–100% (Footer CTA)": 0, "Unknown": 0 };
  d.scrolls.forEach(function(r) {
    var n = num_(val_(r, ["max_scroll_depth", "scroll_percentage"], -1));
    if (n < 0) buckets["Unknown"]++; else if (n < 25) buckets["0–24% (Header)"]++; else if (n < 50) buckets["25–49% (Services)"]++; else if (n < 75) buckets["50–74% (Care Details)"]++; else if (n < 90) buckets["75–89% (Pricing/Reviews)"]++; else buckets["90–100% (Footer CTA)"]++;
  });
  var rows = Object.keys(buckets).map(function(k){ return [k, buckets[k]]; });
  writeTable_(sh, 4, 1, ["Scroll depth bucket", "Visitors reached"], rows);
  addChart_(sh, Charts.ChartType.COLUMN, sh.getRange(4, 1, rows.length + 1, 2), 4, 4, "Content scroll depth distribution");
  var pages = countBy_(d.scrolls, function(r){ return page_(r); }).slice(0, 25);
  writeTable_(sh, 4, 7, ["Service page", "Scroll events"], pages);
}

/** Dashboard 11: Session Intelligence **/
function buildSessions_(ss, d) {
  var sh = dashboard_(ss, "11 Session Intelligence", "SESSION INTELLIGENCE & PATIENT USER FLOW",
    "Session durations and interaction density as captured by live telemetry", 8);
  var ids = {}; d.sessions.forEach(function(r){ var id = session_(r); if (id) ids[id] = r; });
  d.events.forEach(function(r){ var id = session_(r); if (id && !ids[id]) ids[id] = r; });
  var durations = [], interactions = [];
  Object.keys(ids).forEach(function(id) {
    durations.push(num_(val_(ids[id], ["session_duration_seconds"], 0)));
    interactions.push(num_(val_(ids[id], ["interaction_count"], 0)));
  });
  var avgDur = durations.length ? Math.round(durations.reduce(function(a,b){return a+b;},0) / durations.length) : 0;
  var avgInt = interactions.length ? Math.round(interactions.reduce(function(a,b){return a+b;},0) / interactions.length) : 0;

  writeKpis_(sh, [
    ["Unique Session IDs", Object.keys(ids).length, PALETTE.teal],
    ["Average Duration (sec)", avgDur, PALETTE.blue],
    ["Average Interactions", avgInt, PALETTE.purple],
    ["Records Missing session_id", d.events.filter(function(r){return !session_(r);}).length, PALETTE.amber]
  ], 4);

  var table = Object.keys(ids).slice(0, 300).map(function(id) {
    var r = ids[id];
    return [id, visitor_(r), eventDate_(r), page_(r), num_(val_(r, ["session_duration_seconds"], 0)), num_(val_(r, ["interaction_count"], 0))];
  });
  writeTable_(sh, 9, 1, ["Session ID", "Visitor ID", "Timestamp", "Landing route", "Duration (sec)", "Interactions"], table);
}

/** Dashboard 12: Booking Funnel **/
function buildFunnel_(ss, d) {
  var sh = dashboard_(ss, "12 Booking Funnel", "PATIENT CARE BOOKING & INQUIRY FUNNEL",
    "Progression from discovery visit to verified attendant booking submission", 8);
  var uniqueVisitors = {};
  d.events.forEach(function(r){ if(visitor_(r)) uniqueVisitors[visitor_(r)] = true; });
  var vCount = Object.keys(uniqueVisitors).length || d.events.length;
  var serviceViews = d.events.filter(function(r){ return /elder|patient|surgery|mother|baby|palliative/i.test(page_(r)); }).length;
  var bookingStarts = d.events.filter(function(r){ return /book/i.test(page_(r)); }).length;

  var rows = [
    ["1. All Website Visitors", vCount],
    ["2. Healthcare Service Pages Viewed", serviceViews],
    ["3. Book Attendant Flow Started", bookingStarts],
    ["4. Form Interaction Recorded", d.forms.length],
    ["5. Callback / General Enquiries", d.callbacks.length + d.contacts.length],
    ["6. Verified Attendant Bookings Completed", d.bookings.length]
  ];
  writeTable_(sh, 4, 1, ["Conversion funnel milestone", "Recorded volume"], rows);
  addChart_(sh, Charts.ChartType.BAR, sh.getRange(4, 1, rows.length + 1, 2), 4, 4, "Healthcare booking funnel progression");
  var status = countBy_(d.forms, function(r){ return val_(r, ["form_status", "form_name"], "(not provided)"); });
  writeTable_(sh, 4, 7, ["Form status / Name", "Interactions"], status);
}

/** Dashboard 13: Leads & Operations **/
function buildLeads_(ss, d) {
  var sh = dashboard_(ss, "13 Leads & Operations", "APNACARE LEADS & SERVICE OPERATIONS QUEUE",
    "Consolidated patient reservations, callbacks, and contact requests (PII masked)", 8);
  var types = countBy_(d.leads, function(r){ return val_(r, ["_sourceType", "service_name", "service", "lead_type"], "(unspecified)"); });
  var statuses = countBy_(d.leads, function(r){ return val_(r, ["booking_status", "lead_status", "follow_up_status"], "(pending)"); });
  writeTable_(sh, 4, 1, ["Service / Lead category", "Volume"], types);
  writeTable_(sh, 4, 4, ["Operational status", "Volume"], statuses);

  var rows = d.leads.slice(0, 300).map(function(r) {
    return [
      eventDate_(r),
      str_(val_(r, ["_sourceType", "lead_type"], "Lead")),
      mask_(val_(r, ["customer_name", "name"], ""), "name"),
      mask_(val_(r, ["mobile", "phone"], ""), "phone"),
      str_(val_(r, ["service_name", "service_id", "service", "subject"], "Elder Care")),
      str_(val_(r, ["city"], "Bengaluru")),
      str_(val_(r, ["booking_status", "lead_status"], "New")),
      str_(val_(r, ["follow_up_status"], "Pending"))
    ];
  });
  writeTable_(sh, 9, 1, ["Date", "Type", "Client Name (Masked)", "Phone (Masked)", "Service Requirement", "City", "Status", "Follow-up"], rows);
}

/** Dashboard 14: Attendant & Chatbot **/
function buildAttendantChatbot_(ss, d) {
  var sh = dashboard_(ss, "14 Attendant & Chatbot", "ATTENDANT PORTAL LOGS & CHATBOT INTELLIGENCE",
    "Attendant check-ins, clinical vitals summaries, emergency SOS alerts, and chatbot leads", 8);
  writeKpis_(sh, [
    ["Attendant Shift Logs", d.attendants.length, PALETTE.teal],
    ["Emergency SOS Alerts", d.sos.length, PALETTE.red],
    ["Chatbot Care Inquiries", d.chatbot.length, PALETTE.purple],
    ["Partner Applications", d.partners.length, PALETTE.blue]
  ], 4);

  var attRows = d.attendants.slice(0, 100).map(function(r) {
    return [eventDate_(r), val_(r, ["attendant_name"], ""), val_(r, ["shift_status", "role"], ""), mask_(val_(r, ["patient_name"], ""), "name"), val_(r, ["vitals_summary", "notes"], "")];
  });
  writeTable_(sh, 8, 1, ["Timestamp", "Attendant Name", "Shift Status", "Patient", "Vitals / Notes Summary"], attRows);

  var botRows = d.chatbot.slice(0, 100).map(function(r) {
    return [eventDate_(r), mask_(val_(r, ["name"], ""), "name"), val_(r, ["requested_service"], ""), val_(r, ["user_query", "message"], ""), val_(r, ["recommended_action"], "")];
  });
  writeTable_(sh, 8, 6, ["Timestamp", "Patient Name", "Requested Service", "User Query", "Recommended Action"], botRows);
}

/** Dashboard 15: Geo Profile **/
function buildGeo_(ss, d) {
  var sh = dashboard_(ss, "15 Geo Profile", "GEOGRAPHIC & REGIONAL CARE PROFILE",
    "Regional demand distribution across Bengaluru, Tier-1/2 hubs, and overseas family inquiries", 8);
  var regions = countBy_(d.geo.concat(d.bookings).concat(d.events), function(r) {
    return val_(r, ["City", "city", "Region", "Timezone", "timezone", "Country"], "(Bengaluru / South India)");
  }).slice(0, 30);
  writeTable_(sh, 4, 1, ["City / Region / Timezone", "Records"], regions);
  addChart_(sh, Charts.ChartType.BAR, sh.getRange(4, 1, Math.max(2, regions.length + 1), 2), 4, 4, "Regional care inquiries distribution");
}

/** Dashboard 16: Data Quality **/
function buildDataQuality_(ss, d) {
  var sh = dashboard_(ss, "16 Data Quality", "DATA INTEGRITY & TELEMETRY COVERAGE",
    "Audits visitor tracking identifiers, timestamp coverage, and Sheet 1 source availability", 8);
  var missingVisitor = d.events.filter(function(r){ return !visitor_(r); }).length;
  var missingSession = d.events.filter(function(r){ return !session_(r); }).length;
  var missingTime = d.events.filter(function(r){ return !eventDate_(r); }).length;
  var missingPage = d.events.filter(function(r){ return !page_(r) || page_(r) === "(unknown)"; }).length;

  writeKpis_(sh, [
    ["Events Missing visitor_id", missingVisitor, PALETTE.amber],
    ["Events Missing session_id", missingSession, PALETTE.red],
    ["Events Missing timestamp", missingTime, PALETTE.purple],
    ["Events Missing page_path", missingPage, PALETTE.blue]
  ], 4);

  var rows = Object.keys(d.rawTabCounts).map(function(k){
    return [k, d.rawTabCounts[k], d.rawTabCounts[k] === 0 ? "Empty / No Rows" : "Active Data Pipeline"];
  });
  writeTable_(sh, 9, 1, ["Source tab name", "Data rows recorded", "Pipeline Status"], rows);
  var eventNames = countBy_(d.events, eventName_);
  writeTable_(sh, 9, 5, ["Event identifier", "Occurrences"], eventNames.slice(0, 30));
}

// ==============================================================================================
// 6. AIRTABLE CRM DIRECT SYNC ENGINE
// ==============================================================================================
var AIRTABLE_CONFIG = {
  // Configured in Apps Script: Project Settings > Script Properties > AIRTABLE_API_KEY
  API_KEY: (typeof PropertiesService !== "undefined" && PropertiesService.getScriptProperties && PropertiesService.getScriptProperties().getProperty("AIRTABLE_API_KEY")) || "YOUR_AIRTABLE_PERSONAL_ACCESS_TOKEN",
  BASE_ID: "appd5rLxicUUJpImD",
  TABLE_ID: "tbl6DnBguLMnvIQI8"
};

/**
 * Reads all existing patient bookings, callback requests, contact forms,
 * chatbot leads, and emergency SOS alerts from Google Sheet 1 and syncs them
 * directly into your Airtable CRM table!
 */
function SYNC_ALL_LEADS_TO_AIRTABLE() {
  var ui = null;
  try { ui = SpreadsheetApp.getUi(); } catch (e) {}

  var sourceSS = SpreadsheetApp.openById(DATA_SHEET_ID);
  var airtableRecords = [];

  function cleanVal(v) { return (v === undefined || v === null) ? "" : String(v).trim(); }

  // 1. Process Booking_Leads
  try {
    var bSheet = sourceSS.getSheetByName("Booking_Leads");
    if (bSheet && bSheet.getLastRow() > 1) {
      var rows = bSheet.getDataRange().getValues();
      var h = rows[0].map(function(c){ return String(c || "").trim(); });
      for (var r = 1; r < rows.length; r++) {
        var row = rows[r];
        var obj = {};
        h.forEach(function(colName, i){ obj[colName] = row[i]; });
        
        var name = cleanVal(obj.customer_name || obj.name);
        var phone = cleanVal(obj.mobile || obj.phone);
        if (!name && !phone) continue;

        var details = "Start: " + cleanVal(obj.start_date) + " " + cleanVal(obj.start_time) + 
                      " | Duration: " + cleanVal(obj.duration_days) + " days" +
                      " | Amount: ₹" + cleanVal(obj.total_amount) +
                      " | Language: " + cleanVal(obj.preferred_language) +
                      " | Address: " + cleanVal(obj.location_address) +
                      " | Notes: " + cleanVal(obj.special_notes);

        airtableRecords.push({
          fields: {
            "Name": name,
            "Phone": phone,
            "Email": cleanVal(obj.email),
            "Service": cleanVal(obj.service_name || obj.service_id || "Elder Care Attendant"),
            "City": cleanVal(obj.city || "Bengaluru"),
            "Lead Type": "Booking",
            "Reference ID": cleanVal(obj.booking_ref),
            "Details": details,
            "Page Path": cleanVal(obj.page_path || "/booking"),
            "Timestamp": cleanVal(obj.received_at),
            "Source Environment": cleanVal(obj.source_environment || "production")
          }
        });
      }
    }
  } catch (e) { Logger.log("Error reading Bookings: " + e.message); }

  // 2. Process Callback_Enquiries
  try {
    var cbSheet = sourceSS.getSheetByName("Callback_Enquiries");
    if (cbSheet && cbSheet.getLastRow() > 1) {
      var rows = cbSheet.getDataRange().getValues();
      var h = rows[0].map(function(c){ return String(c || "").trim(); });
      for (var r = 1; r < rows.length; r++) {
        var row = rows[r];
        var obj = {};
        h.forEach(function(colName, i){ obj[colName] = row[i]; });
        
        var name = cleanVal(obj.name);
        var phone = cleanVal(obj.phone);
        if (!name && !phone) continue;

        airtableRecords.push({
          fields: {
            "Name": name,
            "Phone": phone,
            "Email": "",
            "Service": cleanVal(obj.service || "Quick Callback"),
            "City": "Bengaluru",
            "Lead Type": "Callback Enquiry",
            "Reference ID": cleanVal(obj.enquiry_id),
            "Details": "Message: " + cleanVal(obj.message) + " | Status: " + cleanVal(obj.lead_status),
            "Page Path": cleanVal(obj.page_path || "/"),
            "Timestamp": cleanVal(obj.received_at),
            "Source Environment": cleanVal(obj.source_environment || "production")
          }
        });
      }
    }
  } catch (e) { Logger.log("Error reading Callbacks: " + e.message); }

  // 3. Process Contact_Submissions
  try {
    var ctSheet = sourceSS.getSheetByName("Contact_Submissions");
    if (ctSheet && ctSheet.getLastRow() > 1) {
      var rows = ctSheet.getDataRange().getValues();
      var h = rows[0].map(function(c){ return String(c || "").trim(); });
      for (var r = 1; r < rows.length; r++) {
        var row = rows[r];
        var obj = {};
        h.forEach(function(colName, i){ obj[colName] = row[i]; });
        
        var name = cleanVal(obj.name);
        var phone = cleanVal(obj.phone);
        if (!name && !phone) continue;

        airtableRecords.push({
          fields: {
            "Name": name,
            "Phone": phone,
            "Email": cleanVal(obj.email),
            "Service": cleanVal(obj.subject || "Contact Form"),
            "City": cleanVal(obj.city || "Bengaluru"),
            "Lead Type": "Contact Submission",
            "Reference ID": cleanVal(obj.contact_id),
            "Details": "Subject: " + cleanVal(obj.subject) + " | Message: " + cleanVal(obj.message),
            "Page Path": cleanVal(obj.page_path || "/contact"),
            "Timestamp": cleanVal(obj.received_at),
            "Source Environment": cleanVal(obj.source_environment || "production")
          }
        });
      }
    }
  } catch (e) { Logger.log("Error reading Contacts: " + e.message); }

  // 4. Process Chatbot_Leads
  try {
    var chatSheet = sourceSS.getSheetByName("Chatbot_Leads");
    if (chatSheet && chatSheet.getLastRow() > 1) {
      var rows = chatSheet.getDataRange().getValues();
      var h = rows[0].map(function(c){ return String(c || "").trim(); });
      for (var r = 1; r < rows.length; r++) {
        var row = rows[r];
        var obj = {};
        h.forEach(function(colName, i){ obj[colName] = row[i]; });
        
        var name = cleanVal(obj.name);
        var phone = cleanVal(obj.phone);
        if (!name && !phone) continue;

        airtableRecords.push({
          fields: {
            "Name": name,
            "Phone": phone,
            "Email": cleanVal(obj.email),
            "Service": cleanVal(obj.requested_service || "Chatbot Assistance"),
            "City": cleanVal(obj.city || "Bengaluru"),
            "Lead Type": "Chatbot Lead",
            "Reference ID": cleanVal(obj.lead_id),
            "Details": "Query: " + cleanVal(obj.user_query) + " | Recommendation: " + cleanVal(obj.recommended_action),
            "Page Path": cleanVal(obj.page_path || "/"),
            "Timestamp": cleanVal(obj.received_at),
            "Source Environment": cleanVal(obj.source_environment || "production")
          }
        });
      }
    }
  } catch (e) { Logger.log("Error reading Chatbot Leads: " + e.message); }

  // 5. Process SOS_Emergency_Alerts
  try {
    var sosSheet = sourceSS.getSheetByName("SOS_Emergency_Alerts");
    if (sosSheet && sosSheet.getLastRow() > 1) {
      var rows = sosSheet.getDataRange().getValues();
      var h = rows[0].map(function(c){ return String(c || "").trim(); });
      for (var r = 1; r < rows.length; r++) {
        var row = rows[r];
        var obj = {};
        h.forEach(function(colName, i){ obj[colName] = row[i]; });
        
        var name = cleanVal(obj.caller_name || "Emergency Caller");
        var phone = cleanVal(obj.caller_phone);
        if (!phone) continue;

        airtableRecords.push({
          fields: {
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
          }
        });
      }
    }
  } catch (e) { Logger.log("Error reading SOS: " + e.message); }

  // Clean empty email fields
  airtableRecords.forEach(function(rec) {
    if (rec.fields["Email"] && rec.fields["Email"].indexOf("@") === -1) {
      delete rec.fields["Email"];
    }
    if (!rec.fields["Email"]) {
      delete rec.fields["Email"];
    }
  });

  if (airtableRecords.length === 0) {
    var msg = "No lead records found in Sheet 1 to sync.";
    if (ui) ui.alert("ℹ️ Airtable Sync", msg, ui.ButtonSet.OK);
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
      Logger.log("Airtable sync batch error: " + response.getContentText());
    }
    Utilities.sleep(200); // Respect Airtable rate limit
  }

  var successMsg = "Successfully synced " + pushedCount + " of " + airtableRecords.length + " leads from Google Sheet 1 to Airtable!";
  Logger.log(successMsg);
  if (ui) {
    ui.alert("✅ Airtable Sync Complete", successMsg, ui.ButtonSet.OK);
  }
  return { success: true, count: pushedCount };
}

// ==============================================================================================
// 7. WEB APP GET & POST ENDPOINTS
// ==============================================================================================
function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) ? e.parameter.action.toLowerCase() : "status";
    
    if (action === "sync_airtable" || action === "airtable") {
      var airtableRes = SYNC_ALL_LEADS_TO_AIRTABLE();
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Synced leads from Google Sheet 1 to Airtable.",
        syncedCount: airtableRes.count,
        timestamp: Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd HH:mm:ss")
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (action === "refresh" || action === "sync") {
      var summary = PULL_DATA_AND_BUILD_ALL_DASHBOARDS();
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Refreshed all 16 ApnaCare dashboards.",
        timestamp: Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd HH:mm:ss"),
        eventsLoaded: summary.events.length,
        bookingsLoaded: summary.bookings.length
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var output = getOutputSpreadsheet_();
    var sheets = output ? output.getSheets().map(function(s){ return s.getName(); }) : [];
    return ContentService.createTextOutput(JSON.stringify({
      service: "ApnaCare Analytics Engine (Sheet 2)",
      status: "online",
      spreadsheet: output ? output.getName() : "Unknown",
      dashboardsCount: sheets.filter(function(n){ return /^[0-9]{2}\s/.test(n); }).length,
      timestamp: Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd HH:mm:ss"),
      refreshUrl: "?action=refresh"
    }, null, 2)).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    var summary = PULL_DATA_AND_BUILD_ALL_DASHBOARDS();
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Refreshed all 16 dashboards via POST.",
      timestamp: Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd HH:mm:ss")
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
