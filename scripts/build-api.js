import { buildSync } from "esbuild";
import { mkdirSync } from "fs";

mkdirSync("api/reports", { recursive: true });
mkdirSync("api/cron", { recursive: true });

const targets = [
  { in: "src/server/reports/routes/send.ts", out: "api/reports/send.js" },
  { in: "src/server/reports/routes/history.ts", out: "api/reports/history.js" },
  { in: "src/server/reports/routes/daily-report.ts", out: "api/cron/daily-report.js" },
  { in: "src/server/reports/routes/weekly-report.ts", out: "api/cron/weekly-report.js" },
  { in: "src/server/reports/routes/monthly-report.ts", out: "api/cron/monthly-report.js" },
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
