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
  "runtime-active",
  "signal-observed",
  "public-safe",
  "public-safe runtime proof",
  "production-ready",
  "fleet-wide",
  "live Splunk fired",
  "Splunk-proven Runtime Signal 001",
  "Cribl-routed",
  "Wazuh-routed",
  "AWS-live",
  "autonomous SOC",
  "AI-approved disposition",
  "analyst-approved disposition",
  "PROVEN_PRIVATE_INTERNAL",
  "PRIVATE_RUNTIME_EVIDENCE_CAPTURED",
  "CONTROLLED_LAB_RUNTIME",
  "CONTROLLED_LAB_RUNTIME_MATCH_VERIFIED",
  "controlled lab runtime match",
  "HO-GPU-01",
  "marker-bearing",
  'proofCeiling: "PROVEN_PRIVATE_INTERNAL"',
];

const allowedContext = [
  /blocked/i,
  /not claimed/i,
  /not[-_ ]claimed/i,
  /does not claim/i,
  /does not prove/i,
  /doesNotProve/,
  /cannot[-_ ]prove/i,
  /not prove/i,
  /not public/i,
  /not public-safe/i,
  /not_public_safe/i,
  /claim firewall/i,
  /claim[- ]firewall/i,
  /promotion/i,
  /not promotion-authorizing/i,
  /unsafe wording/i,
  /remains capped/i,
  /no .{0,80} claim/i,
  /blockedClaims/,
  /excluded/i,
  /private\/internal material/i,
  /outside the public proof basis/i,
];

const privateRuntimeClaimTerms = [
  "PROVEN_PRIVATE_INTERNAL",
  "PRIVATE_RUNTIME_EVIDENCE_CAPTURED",
  "CONTROLLED_LAB_RUNTIME",
  "CONTROLLED_LAB_RUNTIME_MATCH_VERIFIED",
  "controlled lab runtime match",
  "Cribl-to-Splunk",
  "marker-bearing",
  "HO-GPU-01",
];

const renderedArtifactCopyField = /^\s*(title|description|proves|doesNotProve|proofCeiling|tags)\s*:/i;
const renderedArtifactBoundaryTerms = [
  ...privateRuntimeClaimTerms,
  "public-safe",
  'proofCeiling: "PROVEN_PRIVATE_INTERNAL"',
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
function isNeutralPublicSafeLabel(line) {
  return /Public-safe(?: state)?/i.test(line) && !/PUBLIC_SAFE|proof|runtime|promote|approved|supported/i.test(line);
}

for (const file of scanRoots.flatMap(collectFiles)) {
  if (!scanExtensions.has(extname(file))) continue;
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    const normalizedLine = line.toLowerCase();
    const matchedTerm = blockedTerms.find((term) => normalizedLine.includes(term.toLowerCase()));
    if (!matchedTerm) return;
    if (matchedTerm === "public-safe" && isNeutralPublicSafeLabel(line)) return;
    if (/cannotProve/.test(line)) return;
    const contextWindow = lines.slice(Math.max(0, index - 12), Math.min(lines.length, index + 13)).join(" ");
    if (!allowedContext.some((pattern) => pattern.test(contextWindow))) {
      failures.push(`${relative(root, file)}:${index + 1}: ${line.trim()}`);
    }

    const isPublicProofCeiling = /proofCeiling\s*:\s*["']PROVEN_PRIVATE_INTERNAL["']/i.test(line);
    if (isPublicProofCeiling) {
      failures.push(`${relative(root, file)}:${index + 1}: public artifact cards must not use PROVEN_PRIVATE_INTERNAL as proofCeiling`);
    }
  });

  lines.forEach((line, index) => {
    const renderedField = line.match(renderedArtifactCopyField)?.[1];
    if (!renderedField) return;
    const normalizedLine = line.toLowerCase();
    const privateTerm = renderedArtifactBoundaryTerms.find((term) => normalizedLine.includes(term.toLowerCase()));
    if (!privateTerm) return;
    const boundaryScoped =
      renderedField === "doesNotProve" ||
      /not to a public|does not prove|blocked|not public|outside the public proof basis/i.test(line);
    if (!boundaryScoped) {
      failures.push(`${relative(root, file)}:${index + 1}: public ${renderedField} field cannot assert private runtime, marker, or public-safe proof: ${line.trim()}`);
    }
  });
}

if (failures.length > 0) {
  console.error(`Blocked-claim scan failed:\n${failures.map((line) => `- ${line}`).join("\n")}`);
  process.exit(1);
}

console.log("Site contract checks passed.");
