import { buildSync } from "esbuild";
import { mkdirSync } from "fs";

mkdirSync("api/reports", { recursive: true });
mkdirSync("api/cron", { recursive: true });
mkdirSync("api/auth", { recursive: true });
mkdirSync("api/customers", { recursive: true });
mkdirSync("api/sahas/attendance", { recursive: true });
mkdirSync("api/admin/sahas", { recursive: true });
mkdirSync("api/admin/bookings", { recursive: true });
mkdirSync("api/admin/attendance", { recursive: true });

const targets = [
  { in: "src/server/reports/routes/send.ts", out: "api/reports/send.js" },
  { in: "src/server/reports/routes/history.ts", out: "api/reports/history.js" },
  { in: "src/server/reports/routes/daily-report.ts", out: "api/cron/daily-report.js" },
  { in: "src/server/reports/routes/weekly-report.ts", out: "api/cron/weekly-report.js" },
  { in: "src/server/reports/routes/monthly-report.ts", out: "api/cron/monthly-report.js" },
  // Legacy Saha session auth
  { in: "src/server/session/routes/login.ts", out: "api/auth/login.js" },
  { in: "src/server/session/routes/session.ts", out: "api/auth/session.js" },
  { in: "src/server/session/routes/logout.ts", out: "api/auth/logout.js" },
  // Multi-role Auth
  { in: "src/server/auth/routes/register.ts", out: "api/auth/register.js" },
  { in: "src/server/auth/routes/login-v2.ts", out: "api/auth/login-v2.js" },
  { in: "src/server/auth/routes/me.ts", out: "api/auth/me.js" },
  // Customer Portal APIs
  { in: "src/server/auth/routes/customers.ts", out: "api/customers/profile.js" },
  { in: "src/server/auth/routes/customers.ts", out: "api/customers/bookings.js" },
  // Saha Portal APIs
  { in: "src/server/auth/routes/sahas.ts", out: "api/sahas/profile.js" },
  { in: "src/server/auth/routes/sahas.ts", out: "api/sahas/assignments.js" },
  { in: "src/server/auth/routes/sahas.ts", out: "api/sahas/leave.js" },
  { in: "src/server/auth/routes/sahas.ts", out: "api/sahas/attendance/check-in.js" },
  { in: "src/server/auth/routes/sahas.ts", out: "api/sahas/attendance/check-out.js" },
  { in: "src/server/auth/routes/sahas.ts", out: "api/sahas/attendance/history.js" },
  // Super Admin Portal APIs
  { in: "src/server/auth/routes/admin.ts", out: "api/admin/dashboard.js" },
  { in: "src/server/auth/routes/admin.ts", out: "api/admin/customers.js" },
  { in: "src/server/auth/routes/admin.ts", out: "api/admin/sahas.js" },
  { in: "src/server/auth/routes/admin.ts", out: "api/admin/bookings.js" },
  { in: "src/server/auth/routes/admin.ts", out: "api/admin/attendance.js" },
  { in: "src/server/auth/routes/admin.ts", out: "api/admin/matching.js" },
  { in: "src/server/auth/routes/admin.ts", out: "api/admin/reports.js" },
  { in: "src/server/auth/routes/admin.ts", out: "api/admin/seed.js" },
  { in: "src/server/auth/routes/admin.ts", out: "api/admin/stats.js" },
  { in: "src/server/auth/routes/admin.ts", out: "api/admin/sahas/approve.js" },
  { in: "src/server/auth/routes/admin.ts", out: "api/admin/sahas/reject.js" },
  { in: "src/server/auth/routes/admin.ts", out: "api/admin/sahas/suspend.js" },
  { in: "src/server/auth/routes/admin.ts", out: "api/admin/bookings/[id].js" },
  { in: "src/server/auth/routes/admin.ts", out: "api/admin/attendance/[id].js" },
];

for (const target of targets) {
  buildSync({
    entryPoints: [target.in],
    outfile: target.out,
    bundle: true,
    platform: "node",
    target: "node20",
    format: "esm",
  });
  console.log(`✓ Built standalone serverless function: ${target.out}`);
}
