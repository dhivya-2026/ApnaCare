/**
 * ApnaCare Operations Database — Google Apps Script Backend
 * 
 * Manages 12-tab operational workbook for ApnaCare:
 * 1. Users
 * 2. Customers
 * 3. Sahas
 * 4. Bookings
 * 5. Attendance
 * 6. Assignments
 * 7. Availability
 * 8. LeaveRequests
 * 9. Notifications
 * 10. AuditLog
 * 11. Reports
 * 12. Config
 */

const SHEET_CONFIG = {
  Users: ["userId", "email", "phone", "fullName", "role", "passwordHash", "accountStatus", "city", "createdAt", "updatedAt"],
  Customers: ["customerId", "userId", "fullName", "email", "phone", "city", "languagePreference", "emergencyContact", "createdAt"],
  Sahas: ["sahaId", "userId", "fullName", "email", "phone", "city", "approvalStatus", "serviceCapabilities", "languagesSpoken", "qualifications", "experience", "availability", "documentRefs", "createdAt", "updatedAt"],
  Bookings: ["bookingId", "customerId", "serviceType", "recipientName", "city", "shift", "startDate", "endDate", "durationDays", "status", "assignedSahaId", "notes", "careNeeds", "estimatedCost", "createdAt", "updatedAt"],
  Attendance: ["attendanceId", "sahaId", "bookingId", "date", "checkInTime", "checkOutTime", "checkInLat", "checkInLng", "checkOutLat", "checkOutLng", "status", "correctedBy", "correctionReason", "createdAt"],
  Assignments: ["assignmentId", "bookingId", "sahaId", "assignedAt", "status", "notes"],
  Availability: ["id", "sahaId", "dayOfWeek", "shift", "isAvailable", "updatedAt"],
  LeaveRequests: ["leaveId", "sahaId", "startDate", "endDate", "reason", "status", "reviewedBy", "createdAt"],
  Notifications: ["notificationId", "userId", "title", "message", "type", "isRead", "createdAt"],
  AuditLog: ["logId", "actorId", "action", "entity", "entityId", "details", "timestamp"],
  Reports: ["reportId", "reportType", "dateRange", "generatedAt", "summaryJson"],
  Config: ["key", "value", "description", "updatedAt"]
};

function getOrCreateSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * Initialize 12 tabs with column headers
 * Run this function once from the Apps Script editor to set up the workbook.
 */
function initializeSheets() {
  const ss = getOrCreateSpreadsheet();
  
  for (const [sheetName, headers] of Object.entries(SHEET_CONFIG)) {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    
    // Set headers if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#e2e8f0");
      sheet.setFrozenRows(1);
    }
  }

  // Populate initial Config keys if not present
  const configSheet = ss.getSheetByName("Config");
  if (configSheet && configSheet.getLastRow() <= 1) {
    configSheet.appendRow(["ADMIN_PROVISION_SECRET", "apnacare_operations_master_2026", "Master secret for super admin provisioning", new Date().toISOString()]);
    configSheet.appendRow(["AUTO_APPROVAL_ENABLED", "false", "Whether Sahas are auto-approved upon registration", new Date().toISOString()]);
  }

  return { success: true, message: "All 12 operational sheets initialized with enterprise schema" };
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "online",
      service: "ApnaCare Operations Engine",
      version: "2.0.0",
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, error: "Empty request payload" }, 400);
    }

    const request = JSON.parse(e.postData.contents);
    const { action, payload } = request;
    const ss = getOrCreateSpreadsheet();

    switch (action) {
      // -------------------------------------------------------------
      // USER ACTIONS
      // -------------------------------------------------------------
      case "CREATE_USER": {
        const sheet = ss.getSheetByName("Users");
        const headers = SHEET_CONFIG.Users;
        const row = headers.map(h => payload[h] !== undefined ? String(payload[h]) : "");
        sheet.appendRow(row);
        logAudit(ss, payload.userId, "CREATE", "Users", payload.userId, JSON.stringify(payload));
        return jsonResponse({ success: true, data: payload });
      }

      case "GET_USER_BY_EMAIL": {
        const user = findRowByColumn(ss, "Users", "email", payload.email);
        return jsonResponse({ success: true, data: user });
      }

      case "GET_USER_BY_ID": {
        const user = findRowByColumn(ss, "Users", "userId", payload.userId);
        return jsonResponse({ success: true, data: user });
      }

      case "UPDATE_USER": {
        updateRowByColumn(ss, "Users", "userId", payload.userId, payload.updates);
        return jsonResponse({ success: true });
      }

      // -------------------------------------------------------------
      // CUSTOMER ACTIONS
      // -------------------------------------------------------------
      case "CREATE_CUSTOMER": {
        const sheet = ss.getSheetByName("Customers");
        const headers = SHEET_CONFIG.Customers;
        const row = headers.map(h => payload[h] !== undefined ? String(payload[h]) : "");
        sheet.appendRow(row);
        return jsonResponse({ success: true, data: payload });
      }

      case "GET_CUSTOMER_BY_USER_ID": {
        const customer = findRowByColumn(ss, "Customers", "userId", payload.userId);
        return jsonResponse({ success: true, data: customer });
      }

      case "UPDATE_CUSTOMER": {
        updateRowByColumn(ss, "Customers", "customerId", payload.customerId, payload.updates);
        return jsonResponse({ success: true });
      }

      case "GET_ALL_CUSTOMERS": {
        const customers = getAllRows(ss, "Customers");
        return jsonResponse({ success: true, data: customers });
      }

      // -------------------------------------------------------------
      // SAHA ACTIONS
      // -------------------------------------------------------------
      case "CREATE_SAHA": {
        const sheet = ss.getSheetByName("Sahas");
        const headers = SHEET_CONFIG.Sahas;
        const row = headers.map(h => {
          const val = payload[h];
          if (Array.isArray(val) || (typeof val === "object" && val !== null)) {
            return JSON.stringify(val);
          }
          return val !== undefined ? String(val) : "";
        });
        sheet.appendRow(row);
        return jsonResponse({ success: true, data: payload });
      }

      case "GET_SAHA_BY_USER_ID": {
        const saha = findRowByColumn(ss, "Sahas", "userId", payload.userId);
        return jsonResponse({ success: true, data: parseSahaRow(saha) });
      }

      case "GET_SAHA_BY_ID": {
        const saha = findRowByColumn(ss, "Sahas", "sahaId", payload.sahaId);
        return jsonResponse({ success: true, data: parseSahaRow(saha) });
      }

      case "UPDATE_SAHA_STATUS": {
        updateRowByColumn(ss, "Sahas", "sahaId", payload.sahaId, {
          approvalStatus: payload.status,
          updatedAt: new Date().toISOString()
        });
        return jsonResponse({ success: true });
      }

      case "UPDATE_SAHA": {
        updateRowByColumn(ss, "Sahas", "sahaId", payload.sahaId, payload.updates);
        return jsonResponse({ success: true });
      }

      case "GET_ALL_SAHAS": {
        const sahas = getAllRows(ss, "Sahas").map(parseSahaRow);
        return jsonResponse({ success: true, data: sahas });
      }

      // -------------------------------------------------------------
      // BOOKING ACTIONS
      // -------------------------------------------------------------
      case "CREATE_BOOKING": {
        const sheet = ss.getSheetByName("Bookings");
        const headers = SHEET_CONFIG.Bookings;
        const row = headers.map(h => payload[h] !== undefined ? String(payload[h]) : "");
        sheet.appendRow(row);
        return jsonResponse({ success: true, data: payload });
      }

      case "GET_BOOKINGS_BY_CUSTOMER": {
        const bookings = filterRowsByColumn(ss, "Bookings", "customerId", payload.customerId);
        return jsonResponse({ success: true, data: bookings });
      }

      case "GET_BOOKINGS_BY_SAHA": {
        const bookings = filterRowsByColumn(ss, "Bookings", "assignedSahaId", payload.sahaId);
        return jsonResponse({ success: true, data: bookings });
      }

      case "GET_ALL_BOOKINGS": {
        const bookings = getAllRows(ss, "Bookings");
        return jsonResponse({ success: true, data: bookings });
      }

      case "UPDATE_BOOKING": {
        updateRowByColumn(ss, "Bookings", "bookingId", payload.bookingId, payload.updates);
        return jsonResponse({ success: true });
      }

      // -------------------------------------------------------------
      // ATTENDANCE ACTIONS
      // -------------------------------------------------------------
      case "CREATE_ATTENDANCE": {
        const sheet = ss.getSheetByName("Attendance");
        const headers = SHEET_CONFIG.Attendance;
        const row = headers.map(h => payload[h] !== undefined ? String(payload[h]) : "");
        sheet.appendRow(row);
        return jsonResponse({ success: true, data: payload });
      }

      case "GET_ATTENDANCE_BY_SAHA": {
        const attendance = filterRowsByColumn(ss, "Attendance", "sahaId", payload.sahaId);
        return jsonResponse({ success: true, data: attendance });
      }

      case "GET_ALL_ATTENDANCE": {
        const attendance = getAllRows(ss, "Attendance");
        return jsonResponse({ success: true, data: attendance });
      }

      case "CORRECT_ATTENDANCE": {
        updateRowByColumn(ss, "Attendance", "attendanceId", payload.attendanceId, payload.updates);
        return jsonResponse({ success: true });
      }

      default:
        return jsonResponse({ success: false, error: "Unknown action: " + action }, 400);
    }
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() }, 500);
  }
}

// -----------------------------------------------------------------
// SPREADSHEET HELPER UTILITIES
// -----------------------------------------------------------------

function jsonResponse(data, status = 200) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function parseSahaRow(saha) {
  if (!saha) return null;
  try {
    if (typeof saha.serviceCapabilities === "string" && saha.serviceCapabilities.startsWith("[")) {
      saha.serviceCapabilities = JSON.parse(saha.serviceCapabilities);
    }
  } catch(e) {}
  try {
    if (typeof saha.languagesSpoken === "string" && saha.languagesSpoken.startsWith("[")) {
      saha.languagesSpoken = JSON.parse(saha.languagesSpoken);
    }
  } catch(e) {}
  return saha;
}

function findRowByColumn(ss, sheetName, colName, value) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return null;
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return null;

  const headers = data[0];
  const colIndex = headers.indexOf(colName);
  if (colIndex === -1) return null;

  const target = String(value).toLowerCase().trim();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][colIndex]).toLowerCase().trim() === target) {
      const obj = {};
      headers.forEach((h, idx) => {
        obj[h] = data[i][idx];
      });
      return obj;
    }
  }
  return null;
}

function filterRowsByColumn(ss, sheetName, colName, value) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  const headers = data[0];
  const colIndex = headers.indexOf(colName);
  if (colIndex === -1) return [];

  const results = [];
  const target = String(value).toLowerCase().trim();

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][colIndex]).toLowerCase().trim() === target) {
      const obj = {};
      headers.forEach((h, idx) => {
        obj[h] = data[i][idx];
      });
      results.push(obj);
    }
  }
  return results;
}

function getAllRows(ss, sheetName) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  const headers = data[0];
  const results = [];

  for (let i = 1; i < data.length; i++) {
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = data[i][idx];
    });
    results.push(obj);
  }
  return results;
}

function updateRowByColumn(ss, sheetName, colName, value, updates) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return;
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return;

  const headers = data[0];
  const colIndex = headers.indexOf(colName);
  if (colIndex === -1) return;

  const target = String(value).toLowerCase().trim();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][colIndex]).toLowerCase().trim() === target) {
      for (const [k, v] of Object.entries(updates)) {
        const uCol = headers.indexOf(k);
        if (uCol !== -1) {
          const formatted = (typeof v === "object" && v !== null) ? JSON.stringify(v) : v;
          sheet.getRange(i + 1, uCol + 1).setValue(formatted);
        }
      }
      return;
    }
  }
}

function logAudit(ss, actorId, action, entity, entityId, details) {
  const sheet = ss.getSheetByName("AuditLog");
  if (!sheet) return;
  const logId = "log_" + new Date().getTime();
  sheet.appendRow([logId, actorId || "SYSTEM", action, entity, entityId, details, new Date().toISOString()]);
}
