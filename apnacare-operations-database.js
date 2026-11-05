/**
 * ==============================================================================
 * ApnaCare Master Operations Database — Google Apps Script (10-Tab Engine)
 * ==============================================================================
 *
 * Deploy Instructions:
 * 1. Open your master Google Spreadsheet.
 * 2. Click Extensions > Apps Script.
 * 3. Replace the entire code editor content with this script.
 * 4. Run `initializeApnaCareDatabase()` once to create and format all 10 sheets with headers.
 * 5. Deploy as Web App:
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 6. Copy the Web App URL into your environment variable:
 *    APNACARE_OPERATIONS_SCRIPT_URL=<your-web-app-url>
 *    APNACARE_DB_SECRET=<your-db-secret> (defaults to "apnacare-ops-secret-2026")
 * ==============================================================================
 */

const CONFIG = {
  SECRET: "apnacare-ops-secret-2026",
  ADMIN_EMAIL: "admin@apnacare.in",
  // Initial PBKDF2 hash for ApnaAdmin@2026!
  ADMIN_PASSWORD_HASH:
    "pbkdf2:sha256:100000:7c5885068cf0cfabf6d2133ef146ecbb:36261543ea17b8f6731ba3c7a36cb92bfd29e3a35a74e142e0aebf73319be8f9",
};

const SCHEMAS = {
  Users: [
    "user_id", "full_name", "email", "phone", "password_hash",
    "profile_image", "city", "address", "account_status", "email_verified",
    "created_at", "updated_at", "last_login"
  ],
  Attendants: [
    "attendant_id", "full_name", "email", "phone", "password_hash",
    "gender", "city", "address", "qualifications", "experience",
    "skills", "languages", "service_categories", "availability_status",
    "verification_status", "account_status", "created_at", "updated_at", "last_login"
  ],
  Admins: [
    "admin_id", "full_name", "email", "password_hash", "role",
    "account_status", "created_at", "updated_at", "last_login"
  ],
  Bookings: [
    "booking_id", "user_id", "customer_name", "customer_phone",
    "service_category", "service_type", "patient_details", "city",
    "service_location", "start_date", "start_time", "end_date", "end_time",
    "duration", "special_requirements", "booking_status", "assigned_attendant_id",
    "created_at", "updated_at"
  ],
  Assignments: [
    "assignment_id", "booking_id", "attendant_id", "assigned_by",
    "assignment_status", "assigned_at", "accepted_at", "rejected_at", "rejection_reason"
  ],
  Availability: [
    "availability_id", "attendant_id", "available_date", "start_time",
    "end_time", "availability_status", "updated_at"
  ],
  Attendance: [
    "attendance_id", "booking_id", "attendant_id", "check_in_time",
    "check_in_location", "check_out_time", "check_out_location",
    "attendance_status", "working_hours", "remarks"
  ],
  Documents: [
    "document_id", "owner_id", "owner_type", "document_type", "file_url",
    "verification_status", "verified_by", "uploaded_at", "verified_at"
  ],
  Sessions: [
    "session_id", "user_id", "role", "token_hash", "created_at", "expires_at", "revoked_at"
  ],
  Activity_Logs: [
    "log_id", "actor_id", "actor_role", "action", "target_id",
    "description", "timestamp", "ip_reference"
  ]
};

/**
 * Run this function once from the Apps Script editor to initialize all worksheets.
 */
function initializeApnaCareDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  for (const [sheetName, headers] of Object.entries(SCHEMAS)) {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    // Set header row
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setBackground("#1E3A2F").setFontColor("#FFFFFF").setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  // Seed default Super Admin if not present
  const adminSheet = ss.getSheetByName("Admins");
  if (adminSheet.getLastRow() <= 1) {
    const now = new Date().toISOString();
    adminSheet.appendRow([
      "ADM-001",
      "ApnaCare Super Admin",
      CONFIG.ADMIN_EMAIL,
      CONFIG.ADMIN_PASSWORD_HASH,
      "super_admin",
      "active",
      now,
      now,
      ""
    ]);
  }

  Logger.log("✓ ApnaCare Master Database (10 Worksheets) initialized successfully!");
}

/**
 * Web App POST dispatcher
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    const data = JSON.parse(raw);

    // Verify secret
    if (data.secret !== CONFIG.SECRET) {
      return jsonResponse({ success: false, error: "Unauthorized access" }, 401);
    }

    const action = data.action;
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    switch (action) {
      case "findUserByEmail":
        return jsonResponse(findRowByColumn(ss, "Users", "email", data.email));

      case "getUserById":
        return jsonResponse(findRowByColumn(ss, "Users", "user_id", data.userId));

      case "createUser":
        return jsonResponse(appendRowObject(ss, "Users", data.user));

      case "updateUser":
        return jsonResponse(updateRowObject(ss, "Users", "user_id", data.userId, data.updates));

      case "getAllUsers":
        return jsonResponse(getAllRows(ss, "Users"));

      case "findAttendantByEmail":
        return jsonResponse(findRowByColumn(ss, "Attendants", "email", data.email));

      case "getAttendantById":
        return jsonResponse(findRowByColumn(ss, "Attendants", "attendant_id", data.attendantId));

      case "createAttendant":
        return jsonResponse(appendRowObject(ss, "Attendants", data.attendant));

      case "updateAttendant":
        return jsonResponse(updateRowObject(ss, "Attendants", "attendant_id", data.attendantId, data.updates));

      case "getAllAttendants":
        return jsonResponse(getAllRows(ss, "Attendants"));

      case "findAdminByEmail":
        return jsonResponse(findRowByColumn(ss, "Admins", "email", data.email));

      case "createBooking":
        return jsonResponse(appendRowObject(ss, "Bookings", data.booking));

      case "updateBooking":
        return jsonResponse(updateRowObject(ss, "Bookings", "booking_id", data.bookingId, data.updates));

      case "getAllBookings":
        return jsonResponse(getAllRows(ss, "Bookings"));

      case "createAssignment":
        return jsonResponse(appendRowObject(ss, "Assignments", data.assignment));

      case "updateAssignmentStatus":
        return jsonResponse(updateRowObject(ss, "Assignments", "assignment_id", data.assignmentId, {
          assignment_status: data.status,
          rejection_reason: data.reason || "",
          accepted_at: data.status === "accepted" ? new Date().toISOString() : "",
          rejected_at: data.status === "rejected" ? new Date().toISOString() : ""
        }));

      case "checkInAttendant":
      case "checkOutAttendant":
        return jsonResponse(appendRowObject(ss, "Attendance", data.record));

      default:
        return jsonResponse({ success: false, error: "Unknown action: " + action });
    }
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "online", system: "ApnaCare Operations Engine 2026" })
  ).setMimeType(ContentService.MimeType.JSON);
}

/* ── Helper Functions ────────────────────────────────────────────── */

function jsonResponse(data, status) {
  const result = typeof data === "object" && data !== null && "success" in data ? data : { success: true, data };
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function getSheetHeaders(sheet) {
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
}

function getAllRows(ss, sheetName) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet || sheet.getLastRow() <= 1) return [];

  const headers = getSheetHeaders(sheet);
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues();

  return rows.map(row => {
    const obj = {};
    headers.forEach((h, idx) => {
      let val = row[idx];
      try {
        if (typeof val === "string" && (val.startsWith("[") || val.startsWith("{"))) {
          val = JSON.parse(val);
        }
      } catch (e) {}
      obj[h] = val;
    });
    return obj;
  });
}

function findRowByColumn(ss, sheetName, colName, value) {
  const rows = getAllRows(ss, sheetName);
  const target = String(value).trim().toLowerCase();
  for (const r of rows) {
    if (String(r[colName]).trim().toLowerCase() === target) {
      return r;
    }
  }
  return null;
}

function appendRowObject(ss, sheetName, obj) {
  const sheet = ss.getSheetByName(sheetName);
  const headers = getSheetHeaders(sheet);
  const row = headers.map(h => {
    const val = obj[h];
    if (Array.isArray(val) || (typeof val === "object" && val !== null)) {
      return JSON.stringify(val);
    }
    return val !== undefined && val !== null ? val : "";
  });
  sheet.appendRow(row);
  return obj;
}

function updateRowObject(ss, sheetName, idCol, idVal, updates) {
  const sheet = ss.getSheetByName(sheetName);
  const headers = getSheetHeaders(sheet);
  const idColIndex = headers.indexOf(idCol) + 1;
  const numRows = sheet.getLastRow();

  if (numRows <= 1 || idColIndex === 0) return null;

  const idValues = sheet.getRange(2, idColIndex, numRows - 1, 1).getValues();
  for (let i = 0; i < idValues.length; i++) {
    if (String(idValues[i][0]).trim().toLowerCase() === String(idVal).trim().toLowerCase()) {
      const rowIndex = i + 2;
      for (const [key, val] of Object.entries(updates)) {
        const colIdx = headers.indexOf(key) + 1;
        if (colIdx > 0) {
          const formatted = Array.isArray(val) || (typeof val === "object" && val !== null) ? JSON.stringify(val) : val;
          sheet.getRange(rowIndex, colIdx).setValue(formatted);
        }
      }
      return { id: idVal, ...updates };
    }
  }
  return null;
}
