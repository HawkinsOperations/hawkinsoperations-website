import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();

const requiredFiles = [
  "src/pages/index.astro",
  "src/pages/start.astro",
  "src/pages/proof/index.astro",
  "src/pages/proof/ho-det-001/index.astro",
  "src/pages/artifacts/index.astro",
  "src/pages/architecture/index.astro",
  "src/pages/architecture/truth-surfaces/index.astro",
  "src/pages/repos.astro",
  "src/pages/controls.astro",
  "src/pages/field-notes/index.astro",
  "src/pages/about.astro",
  "src/pages/legacy.astro",
  "src/pages/changelog.astro",
  "src/data/proofRecords.ts",
  "src/data/repos.ts",
  "src/data/claims.ts",
  "src/data/truthSurfaces.ts",
  "src/data/truthPlanes.ts",
  "src/data/loopSteps.ts",
  "src/data/artifacts.ts",
  "src/data/navigation.ts",
  "src/assets/raylee-hawkins-portrait.jpg",
  "public/robots.txt",
  "public/sitemap.xml",
];

const missing = requiredFiles.filter((file) => !existsSync(join(root, file)));
if (missing.length > 0) {
  console.error(`Missing required site files:\n${missing.map((file) => `- ${file}`).join("\n")}`);
  process.exit(1);
}

const blockedTerms = [
  "production-ready",
  "fleet-wide",
  "runtime-active",
  "signal-observed",
  "public-safe",
  "Cribl-routed",
  "Wazuh-routed",
  "AWS-live",
  "autonomous SOC",
  "AI-approved disposition",
];

const allowedContext = [
  /blocked/i,
  /not claimed/i,
  /does not claim/i,
  /does not prove/i,
  /doesNotProve/,
  /not prove/i,
  /claim firewall/i,
  /promotion/i,
  /unsafe wording/i,
  /remains capped/i,
  /no .{0,80} claim/i,
  /blockedClaims/,
];

const scanRoots = ["README.md", "SCOPE.md", "STATUS.md", "src", "public"];
const scanExtensions = new Set([".astro", ".ts", ".md", ".mjs", ".json", ".xml", ".txt"]);

function collectFiles(target) {
  const absolute = join(root, target);
  if (!existsSync(absolute)) return [];
  const stat = statSync(absolute);
  if (stat.isFile()) return [absolute];
  const files = [];
  for (const entry of readdirSync(absolute)) {
    if (entry === "node_modules" || entry === "dist" || entry === ".astro" || entry === ".git") continue;
    files.push(...collectFiles(join(target, entry)));
  }
  return files;
}

const failures = [];
for (const file of scanRoots.flatMap(collectFiles)) {
  if (!scanExtensions.has(extname(file))) continue;
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    const matchedTerm = blockedTerms.find((term) => line.includes(term));
    if (!matchedTerm) return;
    const contextWindow = lines.slice(Math.max(0, index - 12), Math.min(lines.length, index + 13)).join(" ");
    if (!allowedContext.some((pattern) => pattern.test(contextWindow))) {
      failures.push(`${relative(root, file)}:${index + 1}: ${line.trim()}`);
    }
  });
}

if (failures.length > 0) {
  console.error(`Blocked-claim scan failed:\n${failures.map((line) => `- ${line}`).join("\n")}`);
  process.exit(1);
}

console.log("Site contract checks passed.");
