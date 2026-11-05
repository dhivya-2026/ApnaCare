import { buildSync } from "esbuild";
import { mkdirSync, rmSync, existsSync } from "fs";

// Clean old individual auth functions to prevent route collision on Vercel
if (existsSync("api/auth/login.js")) rmSync("api/auth/login.js");
if (existsSync("api/auth/session.js")) rmSync("api/auth/session.js");
if (existsSync("api/auth/logout.js")) rmSync("api/auth/logout.js");

mkdirSync("api/reports", { recursive: true });
mkdirSync("api/cron", { recursive: true });
mkdirSync("api/auth", { recursive: true });
mkdirSync("api/user", { recursive: true });
mkdirSync("api/saha", { recursive: true });
mkdirSync("api/admin", { recursive: true });

const targets = [
  { in: "src/server/reports/routes/send.ts", out: "api/reports/send.js" },
  { in: "src/server/reports/routes/history.ts", out: "api/reports/history.js" },
  { in: "src/server/reports/routes/daily-report.ts", out: "api/cron/daily-report.js" },
  { in: "src/server/reports/routes/weekly-report.ts", out: "api/cron/weekly-report.js" },
  { in: "src/server/reports/routes/monthly-report.ts", out: "api/cron/monthly-report.js" },
  { in: "src/server/auth/entry/auth-fn.ts", out: "api/auth/[action].js" },
  { in: "src/server/auth/entry/user-fn.ts", out: "api/user/[action].js" },
  { in: "src/server/auth/entry/saha-fn.ts", out: "api/saha/[action].js" },
  { in: "src/server/auth/entry/admin-fn.ts", out: "api/admin/[action].js" },
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
