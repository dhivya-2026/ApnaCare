import { buildSync } from "esbuild";
import { mkdirSync } from "fs";

mkdirSync("api/cron", { recursive: true });
mkdirSync("api/reports", { recursive: true });
mkdirSync("api/auth", { recursive: true });
mkdirSync("api/customers", { recursive: true });
mkdirSync("api/sahas/attendance", { recursive: true });
mkdirSync("api/admin/sahas", { recursive: true });
mkdirSync("api/admin/bookings", { recursive: true });

const targets = [
  // 1. Cron jobs dispatcher (handles /api/cron/daily-report, weekly-report, monthly-report)
  { in: "src/server/reports/routes/cron-dispatcher.ts", out: "api/cron/[type].js" },

  // 2. Reports dispatcher (handles /api/reports/history, /api/reports/send)
  { in: "src/server/reports/routes/reports-dispatcher.ts", out: "api/reports/[action].js" },

  // 3. Multi-role Auth dispatcher (handles /api/auth/register, login-v2, me, login, session, logout)
  { in: "src/server/auth/dispatch.ts", out: "api/auth/[action].js" },

  // 4. Customer portal API (handles /api/customers/profile, /api/customers/bookings)
  { in: "src/server/auth/routes/customers.ts", out: "api/customers/[action].js" },

  // 5. Saha portal API (handles /api/sahas/profile, /api/sahas/assignments, /api/sahas/leave)
  { in: "src/server/auth/routes/sahas.ts", out: "api/sahas/[action].js" },

  // 6. Saha attendance API (handles /api/sahas/attendance/check-in, check-out, history)
  { in: "src/server/auth/routes/sahas.ts", out: "api/sahas/attendance/[action].js" },

  // 7. Admin desk API (handles /api/admin/dashboard, customers, sahas, bookings, attendance, matching, reports, seed, stats)
  { in: "src/server/auth/routes/admin.ts", out: "api/admin/[action].js" },

  // 8. Admin saha action API (handles /api/admin/sahas/approve, reject, suspend)
  { in: "src/server/auth/routes/admin.ts", out: "api/admin/sahas/[action].js" },

  // 9. Admin booking update API (handles PATCH /api/admin/bookings/[id])
  { in: "src/server/auth/routes/admin.ts", out: "api/admin/bookings/[id].js" },
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
  console.log(`✓ Built serverless function: ${target.out}`);
}

console.log(`\n✓ Total serverless functions: ${targets.length} (within Vercel Hobby plan limit of 12)`);
