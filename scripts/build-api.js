import { buildSync } from "esbuild";
import { mkdirSync } from "fs";

mkdirSync("api/reports", { recursive: true });
mkdirSync("api/cron", { recursive: true });
mkdirSync("api/auth", { recursive: true });
mkdirSync("api/customers", { recursive: true });
mkdirSync("api/sahas", { recursive: true });
mkdirSync("api/admin", { recursive: true });

const targets = [
  { in: "src/server/reports/routes/send.ts", out: "api/reports/send.js" },
  { in: "src/server/reports/routes/history.ts", out: "api/reports/history.js" },
  { in: "src/server/reports/routes/daily-report.ts", out: "api/cron/daily-report.js" },
  { in: "src/server/reports/routes/weekly-report.ts", out: "api/cron/weekly-report.js" },
  { in: "src/server/reports/routes/monthly-report.ts", out: "api/cron/monthly-report.js" },
  // Legacy Saha session auth (preserved for backward compatibility)
  { in: "src/server/session/routes/login.ts", out: "api/auth/login.js" },
  { in: "src/server/session/routes/session.ts", out: "api/auth/session.js" },
  { in: "src/server/session/routes/logout.ts", out: "api/auth/logout.js" },
  // New auth platform
  { in: "src/server/auth/routes/register.ts", out: "api/auth/register.js" },
  { in: "src/server/auth/routes/login-v2.ts", out: "api/auth/login-v2.js" },
  { in: "src/server/auth/routes/me.ts", out: "api/auth/me.js" },
  { in: "src/server/auth/routes/customers.ts", out: "api/customers/index.js" },
  { in: "src/server/auth/routes/customers.ts", out: "api/customers/[...slug].js" },
  { in: "src/server/auth/routes/sahas.ts", out: "api/sahas/index.js" },
  { in: "src/server/auth/routes/sahas.ts", out: "api/sahas/[...slug].js" },
  { in: "src/server/auth/routes/admin.ts", out: "api/admin/index.js" },
  { in: "src/server/auth/routes/admin.ts", out: "api/admin/[...slug].js" },
];

for (const target of targets) {
  buildSync({
    entryPoints: [target.in],
    outfile: target.out,
    bundle: true,
    platform: "node",
    target: "node20",
    format: "esm",
    // Do NOT externalize npm packages: bundle nodemailer, resend, date-fns so functions are 100% standalone
  });
  console.log(`✓ Built standalone serverless function: ${target.out}`);
}
