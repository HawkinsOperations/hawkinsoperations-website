import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();

const requiredFiles = [
  "app/layout.tsx",
  "app/page.tsx",
  "app/start/page.tsx",
  "app/proof/page.tsx",
  "app/ai-security/page.tsx",
  "app/detections/page.tsx",
  "app/proof/ho-det-001/page.tsx",
  "app/proof-loop/page.tsx",
  "app/artifacts/page.tsx",
  "app/architecture/page.tsx",
  "app/architecture/truth-surfaces/page.tsx",
  "app/repos/page.tsx",
  "app/controls/page.tsx",
  "app/pipeline/page.tsx",
  "app/field-notes/page.tsx",
  "app/field-notes/[slug]/page.tsx",
  "app/about/page.tsx",
  "app/legacy/page.tsx",
  "app/changelog/page.tsx",
  "config/site.ts",
  "config/blocked-claims.ts",
  "config/proof-loop.ts",
  "config/truth-surfaces.ts",
  "config/repo-authority.ts",
  "src/data/proofRecords.ts",
  "src/data/repos.ts",
  "src/data/claims.ts",
  "src/data/truthSurfaces.ts",
  "src/data/truthPlanes.ts",
  "src/data/loopSteps.ts",
  "src/data/artifacts.ts",
  "src/data/fieldNotes.ts",
  "src/data/navigation.ts",
  "src/data/reviewerRoutes.ts",
  "src/data/credibilityMetrics.ts",
  "public/raylee-hawkins-portrait.jpg",
  "public/robots.txt",
  "public/sitemap.xml",
];

const missing = requiredFiles.filter((file) => !existsSync(join(root, file)));
if (missing.length > 0) {
  console.error(`Missing required site files:\n${missing.map((file) => `- ${file}`).join("\n")}`);
  process.exit(1);
}

const navigationData = readFileSync(join(root, "src/data/navigation.ts"), "utf8");
const primaryNavMatch = navigationData.match(/export const primaryNavigation: NavItem\[] = \[([\s\S]*?)\];/);
const expectedPrimaryNav = [
  { label: "Home", href: "/" },
  { label: "Proof", href: "/proof/" },
  { label: "Artifacts", href: "/artifacts/" },
  { label: "Detections", href: "/detections/" },
  { label: "AI Security", href: "/ai-security/" },
  { label: "About", href: "/about/" },
];
const navFailures = [];
if (!primaryNavMatch) {
  navFailures.push("src/data/navigation.ts must export primaryNavigation.");
} else {
  const navBlock = primaryNavMatch[1];
  const entries = [...navBlock.matchAll(/\{\s*label:\s*"([^"]+)",\s*href:\s*"([^"]+)"/g)].map((match) => ({
    label: match[1],
    href: match[2],
  }));
  if (entries.length !== expectedPrimaryNav.length) {
    navFailures.push(`primaryNavigation must contain exactly ${expectedPrimaryNav.length} entries; found ${entries.length}.`);
  }
  expectedPrimaryNav.forEach((expected, index) => {
    const actual = entries[index];
    if (!actual || actual.label !== expected.label || actual.href !== expected.href) {
      navFailures.push(`primaryNavigation[${index}] must be ${expected.label} -> ${expected.href}.`);
    }
  });
}

if (navFailures.length > 0) {
  console.error(`Primary navigation invariant failed:\n${navFailures.map((line) => `- ${line}`).join("\n")}`);
  process.exit(1);
}

const governanceSavesData = readFileSync(join(root, "src/data/governanceSaves.ts"), "utf8");
const governanceSavesExplorer = readFileSync(join(root, "components/GovernanceSavesExplorer.tsx"), "utf8");
const governanceSavesCockpit = readFileSync(join(root, "components/GovernanceSavesCockpit.tsx"), "utf8");
const governanceSavesPage = readFileSync(join(root, "app/proof/governance-saves/page.tsx"), "utf8");
const homePage = readFileSync(join(root, "app/page.tsx"), "utf8");

const governanceFailures = [];
if (!/export const publicGovernanceSaves = governanceSaves\.filter\(\s*\(save\) => save\.publicSafety !== "PRIVATE_ONLY",\s*\);/s.test(governanceSavesData)) {
  governanceFailures.push("src/data/governanceSaves.ts must export publicGovernanceSaves filtered to exclude PRIVATE_ONLY records.");
}

for (const [file, source] of [
  ["components/GovernanceSavesExplorer.tsx", governanceSavesExplorer],
  ["components/GovernanceSavesCockpit.tsx", governanceSavesCockpit],
]) {
  if (/\bgovernanceSaves\.(filter|map|length)\b/.test(source)) {
    governanceFailures.push(`${file} must render from publicGovernanceSaves, not the full governanceSaves source array.`);
  }
}

if (!/public-facing subset/i.test(governanceSavesPage) || !/not rendered/i.test(governanceSavesPage)) {
  governanceFailures.push("app/proof/governance-saves/page.tsx must describe Governance Saves as a public-facing subset and state that excluded records are not rendered.");
}

if (/all\s+GS-001\s+(?:through|→|-)\s+GS-080/i.test(governanceSavesPage) || /\b80\s+public/i.test(governanceSavesPage)) {
  governanceFailures.push("app/proof/governance-saves/page.tsx must not imply that all GS-001 through GS-080 records are public examples.");
}

if (governanceFailures.length > 0) {
  console.error(`Governance Saves public-rendering invariant failed:\n${governanceFailures.map((line) => `- ${line}`).join("\n")}`);
  process.exit(1);
}

const homepageInternalLabels = [
  "GS-001-GS-080 subset",
  "CONTROLLED_TEST_VALIDATED",
  "NOT_PUBLIC_SAFE",
  "RENDERING_ONLY",
];
const homepageLabelFailures = homepageInternalLabels.filter((term) => homePage.includes(term));
if (homepageLabelFailures.length > 0) {
  console.error(`Homepage public-value invariant failed:\n${homepageLabelFailures.map((term) => `- app/page.tsx must not lead with internal label ${term}`).join("\n")}`);
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

const failClosedLiteralTerms = [
  "PRIVATE_RUNTIME_EVIDENCE_CAPTURED",
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

const scanRoots = ["README.md", "SCOPE.md", "STATUS.md", "app", "components", "config", "src/data", "public", "dist", "out"];
const scanExtensions = new Set([".astro", ".ts", ".tsx", ".md", ".mjs", ".json", ".xml", ".txt", ".css", ".html", ".js"]);

function collectFiles(target) {
  const absolute = join(root, target);
  if (!existsSync(absolute)) return [];
  const stat = statSync(absolute);
  if (stat.isFile()) return [absolute];
  const files = [];
  for (const entry of readdirSync(absolute)) {
    if (entry === "node_modules" || entry === "dist" || entry === "out" || entry === ".astro" || entry === ".next" || entry === ".git") continue;
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
    const failClosedTerm = failClosedLiteralTerms.find((term) => normalizedLine.includes(term.toLowerCase()));
    if (failClosedTerm) {
      failures.push(`${relative(root, file)}:${index + 1}: public output must not render private-runtime literal ${failClosedTerm}`);
      return;
    }

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
