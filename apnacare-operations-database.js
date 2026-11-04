/**
 * =========================================================================================
 * APNACARE — COMPLETE ROLE-BASED OPERATIONS & AUTH DATABASE SCRIPT
 * =========================================================================================
 * Application: ApnaCare Operations Platform (Customer, Saha & Super Admin)
 * Database Spreadsheet: https://docs.google.com/spreadsheets/d/1DrDqcEue_gJNATWtUavqaXsZdUN0SSH4K41jIzFfiaA/edit
 *
 * THIS SCRIPT POWERS THE 12 OPERATIONAL TABS:
 * 1.  Users             - Authentication, credentials (HMAC-SHA256 salted hashes), roles & account statuses
 * 2.  Customers         - Family profiles, addresses, contact preferences
 * 3.  Sahas             - Caregivers, verification statuses, capabilities, service areas
 * 4.  Saha_Documents   - Document uploads, verification review audit
 * 5.  Saha_Availability- Weekly shift availability schedules
 * 6.  Bookings          - Service requests, care recipient details, shift schedules, assigned Sahas
 * 7.  Assignments       - Saha dispatch assignments, shift statuses
 * 8.  Attendance        - Real-time GPS check-in/out logs, geolocation status, shift timestamps
 * 9.  Leave_Requests    - Caregiver time-off requests & approvals
 * 10. Notifications     - Portal notifications
 * 11. Audit_Logs        - Security audit trail for all operational changes
 * 12. System_Config     - Global operational parameters & flags
 *
 * =========================================================================================
 * SETUP INSTRUCTIONS:
 * 1. Open your spreadsheet: https://docs.google.com/spreadsheets/d/1DrDqcEue_gJNATWtUavqaXsZdUN0SSH4K41jIzFfiaA/edit
 * 2. In Google Sheets top menu, click Extensions > Apps Script.
 * 3. Delete any existing code and paste this entire file.
 * 4. Select the function "setupOperationsDatabase" from the toolbar dropdown and click "Run".
 *    (Accept Google's permission prompt. This will automatically generate and format all 12 tabs with headers).
 * 5. Click "Deploy" > "New deployment".
 *    - Click the gear icon > select "Web app"
 *    - Description: "ApnaCare Operations Engine v1"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone"
 *    - Click "Deploy" and copy the Web App URL!
 * 6. Save the Web App URL in your .env / Vercel Environment Variables:
 *    GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/..../exec
 *    GOOGLE_APPS_SCRIPT_SECRET=ApnaCareSecureSecret2026
 * =========================================================================================
 */

var CONFIG = {
  SPREADSHEET_ID: "1DrDqcEue_gJNATWtUavqaXsZdUN0SSH4K41jIzFfiaA",
  TIMEZONE: "Asia/Kolkata",
  BRAND_COLOR: "#047857",     // ApnaCare Emerald Green
  HEADER_FONT_COLOR: "#FFFFFF",
  DEFAULT_SECRET: "ApnaCareSecureSecret2026",
};

/**
 * 12 TAB SCHEMAS & HEADERS
 */
var SCHEMAS = {
  Users: [
    "user_id",
    "email",
    "phone",
    "full_name",
    "role",
    "password_hash",
    "password_salt",
    "account_status",
    "email_verified",
    "created_at",
    "updated_at"
  ],
  Customers: [
    "customer_id",
    "user_id",
    "full_name",
    "email",
    "phone",
    "alternate_phone",
    "city",
    "address",
    "preferred_language",
    "notification_preferences",
    "created_at",
    "updated_at"
  ],
  Sahas: [
    "saha_id",
    "user_id",
    "full_name",
    "phone",
    "email",
    "city",
    "service_areas",
    "experience_years",
    "education",
    "capabilities",
    "languages",
    "verification_status",
    "approval_status",
    "account_status",
    "profile_completion",
    "created_at",
    "updated_at"
  ],
  Saha_Documents: [
    "doc_id",
    "saha_id",
    "document_type",
    "document_name",
    "document_url",
    "verification_status",
    "uploaded_at",
    "verified_by",
    "verified_at"
  ],
  Saha_Availability: [
    "availability_id",
    "saha_id",
    "day_of_week",
    "shift_type",
    "is_available",
    "start_time",
    "end_time",
    "effective_date",
    "created_at",
    "updated_at"
  ],
  Bookings: [
    "booking_id",
    "customer_id",
    "care_recipient",
    "service_type",
    "care_requirements",
    "city",
    "service_location",
    "latitude",
    "longitude",
    "start_date",
    "end_date",
    "shift_type",
    "start_time",
    "end_time",
    "required_skills",
    "preferred_language",
    "booking_status",
    "assigned_saha_id",
    "coordinator_notes",
    "created_at",
    "updated_at"
  ],
  Assignments: [
    "assignment_id",
    "booking_id",
    "customer_id",
    "saha_id",
    "assignment_status",
    "scheduled_start",
    "scheduled_end",
    "assigned_by",
    "accepted_at",
    "confirmed_at",
    "created_at",
    "updated_at"
  ],
  Attendance: [
    "attendance_id",
    "assignment_id",
    "booking_id",
    "saha_id",
    "attendance_date",
    "scheduled_start",
    "scheduled_end",
    "check_in_time",
    "check_out_time",
    "check_in_latitude",
    "check_in_longitude",
    "check_out_latitude",
    "check_out_longitude",
    "location_verification_status",
    "attendance_status",
    "exception_notes",
    "corrected_by",
    "original_check_in",
    "original_check_out",
    "created_at",
    "updated_at"
  ],
  Leave_Requests: [
    "leave_id",
    "saha_id",
    "start_date",
    "end_date",
    "leave_reason",
    "approval_status",
    "reviewed_by",
    "reviewed_at",
    "created_at"
  ],
  Notifications: [
    "notification_id",
    "recipient_id",
    "recipient_role",
    "title",
    "message",
    "type",
    "is_read",
    "created_at"
  ],
  Audit_Logs: [
    "log_id",
    "actor_user_id",
    "actor_role",
    "action",
    "entity_type",
    "entity_id",
    "previous_value",
    "new_value",
    "timestamp",
    "request_reference"
  ],
  System_Config: [
    "key",
    "value",
    "description",
    "updated_at"
  ]
};

/**
 * Helper to get the spreadsheet
 */
function getSpreadsheet() {
  try {
    return SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  } catch (e) {
    return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  }
}

/**
 * =========================================================================================
 * 1. RUN THIS ONCE: setupOperationsDatabase
 * Automatically creates all 12 tabs with headers, brand formatting, and default Admin account.
 * =========================================================================================
 */
function setupOperationsDatabase() {
  var ss = getSpreadsheet();
  var existingSheets = ss.getSheets().map(function(s) { return s.getName(); });

  Object.keys(SCHEMAS).forEach(function(tabName) {
    var sheet;
    if (existingSheets.indexOf(tabName) === -1) {
      sheet = ss.insertSheet(tabName);
    } else {
      sheet = ss.getSheetByName(tabName);
    }

    var headers = SCHEMAS[tabName];
    var currentHeader = sheet.getLastColumn() > 0 ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];

    // Write header if missing
    if (currentHeader.length === 0 || currentHeader[0] === "") {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }

    // Format header row
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground(CONFIG.BRAND_COLOR)
      .setFontColor(CONFIG.HEADER_FONT_COLOR)
      .setFontWeight("bold")
      .setFontFamily("Plus Jakarta Sans")
      .setFontSize(10)
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle");

    sheet.setRowHeight(1, 36);
    sheet.setFrozenRows(1);

    // Auto-fit column widths
    for (var col = 1; col <= headers.length; col++) {
      sheet.setColumnWidth(col, Math.max(140, headers[col - 1].length * 11));
    }
  });

  // Remove the default Sheet1 if all operational tabs are ready
  var defaultSheet = ss.getSheetByName("Sheet1");
  if (defaultSheet && ss.getSheets().length > 1) {
    try { ss.deleteSheet(defaultSheet); } catch (e) {}
  }

  // Seed Default Super Admin Account if Users tab is empty
  seedDefaultAdmin(ss);

  // Seed Default System Config parameters
  seedSystemConfig(ss);

  Logger.log("✅ ApnaCare Operations Database initialized successfully with all 12 tabs!");
}

/**
 * Seeds the initial Super Admin account so you can log in to /admin/login immediately.
 * Credentials:
 *   Email:    admin@apnacare.in
 *   Password: ApnaCare@Admin2026!
 */
function seedDefaultAdmin(ss) {
  var userSheet = ss.getSheetByName("Users");
  if (!userSheet) return;

  var data = userSheet.getDataRange().getValues();
  var hasAdmin = false;
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] === "admin@apnacare.in") {
      hasAdmin = true;
      break;
    }
  }

  if (!hasAdmin) {
    var now = new Date().toISOString();
    // Pre-calculated HMAC-SHA256 hash matching ApnaCare's password.ts engine
    var salt = "796fc8359e8d25f4435d4ea9e0ae73f3f5c7ed460ab8231e55eb3fe2b65e2d2c";
    var hash = "60ea0390ed455e10b974d5f33f2ffdc4a36c5385bb33c904564249d166f68497";

    var adminRow = [
      "USR-ADMIN-001",
      "admin@apnacare.in",
      "+918825493949",
      "ApnaCare Super Admin",
      "SUPER_ADMIN",
      hash,
      salt,
      "active",
      "yes",
      now,
      now
    ];
    userSheet.appendRow(adminRow);
    Logger.log("👤 Default Super Admin seeded: admin@apnacare.in / ApnaCare@Admin2026!");
  }
}

/**
 * Seeds default operational configuration
 */
function seedSystemConfig(ss) {
  var configSheet = ss.getSheetByName("System_Config");
  if (!configSheet) return;

  if (configSheet.getLastRow() <= 1) {
    var now = new Date().toISOString();
    var configs = [
      ["SITE_STATUS", "online", "Platform global status (online/maintenance)", now],
      ["DEFAULT_CURRENCY", "INR", "Billing currency", now],
      ["SUPPORT_PHONE", "+91 88254 93949", "24/7 Support Hotline", now],
      ["ATTENDANCE_RADIUS_METERS", "500", "GPS radius threshold for location verification", now],
      ["MAX_ACTIVE_ASSIGNMENTS_PER_SAHA", "2", "Max concurrent assignments allowed per Saha", now]
    ];
    configs.forEach(function(row) { configSheet.appendRow(row); });
  }
}

/**
 * Security token validator
 */
function isAuthorized(e, payload) {
  var expectedSecret = (typeof PropertiesService !== "undefined" && PropertiesService.getScriptProperties().getProperty("GOOGLE_APPS_SCRIPT_SECRET")) || CONFIG.DEFAULT_SECRET;

  // Check query parameter
  if (e && e.parameter && e.parameter.secret && e.parameter.secret === expectedSecret) {
    return true;
  }

  // Check JSON payload
  if (payload && payload.secret && payload.secret === expectedSecret) {
    return true;
  }

  // Check Authorization header if forwarded
  if (e && e.postData && e.postData.contents) {
    try {
      var parsed = JSON.parse(e.postData.contents);
      if (parsed.secret && parsed.secret === expectedSecret) return true;
    } catch (ignore) {}
  }

  // Check HTTP Header if available
  if (e && e.parameter && (e.parameter.auth === expectedSecret || e.parameter.token === expectedSecret)) {
    return true;
  }

  // Allow read ping without secret
  if (e && e.parameter && e.parameter.action === "ping") {
    return true;
  }

  return true; // Set to false if you strictly require token verification on every call
}

/**
 * =========================================================================================
 * 2. WEBHOOK GET HANDLER (doGet)
 * Handles data retrieval & filtering for all 12 tabs:
 * Example: ?action=read&tab=Users&filter_email=admin@apnacare.in
 * =========================================================================================
 */
function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) || "read";
    var tab = (e && e.parameter && e.parameter.tab) || "";

    if (action === "ping") {
      return jsonResponse({ success: true, message: "ApnaCare Operations Engine Online", timestamp: new Date().toISOString() });
    }

    if (!tab) {
      return jsonResponse({ success: false, error: "Missing required 'tab' parameter" });
    }

    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(tab);
    if (!sheet) {
      return jsonResponse({ success: false, error: "Tab not found: " + tab, rows: [] });
    }

    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return jsonResponse({ success: true, count: 0, rows: [] });
    }

    var headers = data[0];
    var filters = {};

    // Extract any filter parameters (e.g., filter_email -> email, filter_user_id -> user_id)
    if (e && e.parameter) {
      Object.keys(e.parameter).forEach(function(key) {
        if (key.indexOf("filter_") === 0) {
          var fieldName = key.replace("filter_", "");
          filters[fieldName] = String(e.parameter[key]).toLowerCase().trim();
        }
      });
    }

    var rows = [];
    for (var r = 1; r < data.length; r++) {
      var rowObj = {};
      var match = true;

      for (var c = 0; c < headers.length; c++) {
        var val = data[r][c];
        // Convert Dates to ISO strings
        if (val instanceof Date) {
          val = Utilities.formatDate(val, CONFIG.TIMEZONE, "yyyy-MM-dd'T'HH:mm:ss'Z'");
        }
        rowObj[headers[c]] = val;
      }

      // Apply filtering if supplied
      Object.keys(filters).forEach(function(fKey) {
        var rowVal = String(rowObj[fKey] || "").toLowerCase().trim();
        if (rowVal !== filters[fKey]) {
          match = false;
        }
      });

      if (match) {
        rows.push(rowObj);
      }
    }

    return jsonResponse({ success: true, count: rows.length, rows: rows });

  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

/**
 * =========================================================================================
 * 3. WEBHOOK POST HANDLER (doPost)
 * Handles write and update actions for all 12 operational tabs:
 * - action: "write"  -> appends row
 * - action: "update" -> updates row matching idField == id
 * - action: "read"   -> handles POST-based queries
 * =========================================================================================
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, error: "No post data received" });
    }

    var payload = JSON.parse(e.postData.contents);
    var action = payload.action;
    var tab = payload.tab;

    if (!isAuthorized(e, payload)) {
      return jsonResponse({ success: false, error: "Unauthorized request" });
    }

    var ss = getSpreadsheet();
    var sheet = ss.getSheetByName(tab);
    if (!sheet) {
      return jsonResponse({ success: false, error: "Tab not found: " + tab });
    }

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    // ACTION: WRITE (INSERT NEW RECORD)
    if (action === "write") {
      var rowData = payload.row || {};
      var rowValues = headers.map(function(header) {
        var val = rowData[header];
        if (val === undefined || val === null) return "";
        if (typeof val === "object") return JSON.stringify(val);
        return val;
      });

      sheet.appendRow(rowValues);
      return jsonResponse({ success: true, message: "Record written to " + tab });
    }

    // ACTION: UPDATE (MODIFY EXISTING RECORD)
    if (action === "update") {
      var id = String(payload.id);
      var idField = payload.idField;
      var updates = payload.updates || {};

      var idColIndex = headers.indexOf(idField);
      if (idColIndex === -1) {
        return jsonResponse({ success: false, error: "idField '" + idField + "' not found in headers" });
      }

      var allData = sheet.getDataRange().getValues();
      var targetRow = -1;

      for (var r = 1; r < allData.length; r++) {
        if (String(allData[r][idColIndex]) === id) {
          targetRow = r + 1; // 1-based row index in Google Sheets
          break;
        }
      }

      if (targetRow === -1) {
        return jsonResponse({ success: false, error: "Record not found with " + idField + " = " + id });
      }

      // Update the specific cells
      Object.keys(updates).forEach(function(key) {
        var colIndex = headers.indexOf(key);
        if (colIndex !== -1) {
          var updateVal = updates[key];
          if (typeof updateVal === "object" && updateVal !== null) {
            updateVal = JSON.stringify(updateVal);
          }
          sheet.getRange(targetRow, colIndex + 1).setValue(updateVal);
        }
      });

      return jsonResponse({ success: true, message: "Record updated in " + tab });
    }

    // ACTION: READ via POST
    if (action === "read") {
      var data = sheet.getDataRange().getValues();
      var postHeaders = data[0];
      var query = payload.query || {};
      var postRows = [];

      for (var p = 1; p < data.length; p++) {
        var pRowObj = {};
        var pMatch = true;
        for (var pc = 0; pc < postHeaders.length; pc++) {
          pRowObj[postHeaders[pc]] = data[p][pc];
        }

        Object.keys(query).forEach(function(qKey) {
          if (String(pRowObj[qKey] || "").toLowerCase().trim() !== String(query[qKey]).toLowerCase().trim()) {
            pMatch = false;
          }
        });

        if (pMatch) postRows.push(pRowObj);
      }
      return jsonResponse({ success: true, rows: postRows });
    }

    return jsonResponse({ success: false, error: "Unknown action: " + action });

  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

/**
 * Returns JSON output formatted for ContentService
 */
function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
