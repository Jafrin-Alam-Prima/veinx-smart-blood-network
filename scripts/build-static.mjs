// Builds a fully static export into ./out for sharing (zip it, or
// `npm run serve:out`). Uses the webpack builder for stability, then copies
// the launcher helpers (serve.cmd / serve.sh / START-HERE.txt) into ./out.
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const result = spawnSync("next", ["build", "--webpack"], {
  stdio: "inherit",
  shell: true,
  cwd: root,
  env: { ...process.env, STATIC_EXPORT: "1" },
});

if (result.status) process.exit(result.status);

const launchers = join(root, "scripts", "launchers");
const out = join(root, "out");
if (existsSync(launchers) && existsSync(out)) {
  for (const f of readdirSync(launchers)) {
    cpSync(join(launchers, f), join(out, f));
  }
  console.log("\n✓ Static export ready in ./out (launchers included).");
  console.log("  Preview: npm run serve:out  →  http://localhost:8000");
}
