import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();

const requiredFiles = [
  "app/layout.tsx",
  "app/page.tsx",
  "app/start/page.tsx",
  "app/proof/page.tsx",
  "app/aevumguard/page.tsx",
  "app/ai-security/page.tsx",
  "app/detections/page.tsx",
  "app/proof/ho-det-001/page.tsx",
  "app/proof-loop/page.tsx",
  "app/artifacts/page.tsx",
  "app/architecture/page.tsx",
  "app/architecture/truth-surfaces/page.tsx",
  "app/repos/page.tsx",
  "app/claim-firewall/page.tsx",
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
  "src/data/generated/public-status.generated.ts",
  "src/data/publicSurfaceIdentities.ts",
  "public/data/public-status.json",
  "docs/live-public-surface-stress-test.md",
  "components/CurrentProofSpine.tsx",
  "components/ReviewerRunPath.tsx",
  "public/.well-known/hawkinsoperations-proof.json",
  "public/.well-known/agent-skills/index.json",
  "public/_headers",
  "public/agent.md",
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
  { label: "Hoxline", href: "/hoxline/" },
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

const proofPage = readFileSync(join(root, "app/proof/page.tsx"), "utf8");
const proofHoDet001Page = readFileSync(join(root, "app/proof/ho-det-001/page.tsx"), "utf8");
const currentProofSpine = readFileSync(join(root, "components/CurrentProofSpine.tsx"), "utf8");
const claimFirewallPage = readFileSync(join(root, "app/claim-firewall/page.tsx"), "utf8");
const aevumguardPage = readFileSync(join(root, "app/aevumguard/page.tsx"), "utf8");
const hoxlinePage = readFileSync(join(root, "app/hoxline/page.tsx"), "utf8");
const controlsPage = readFileSync(join(root, "app/controls/page.tsx"), "utf8");
const claimFirewallComponent = readFileSync(join(root, "components/ClaimFirewall.tsx"), "utf8");
const proofRecordsData = readFileSync(join(root, "src/data/proofRecords.ts"), "utf8");
const navigationSource = readFileSync(join(root, "src/data/navigation.ts"), "utf8");
const hoxlineFrontDoorRequiredTerms = [
  ["src/data/navigation.ts", navigationSource, 'label: "Hoxline"'],
  ["src/data/navigation.ts", navigationSource, 'href: "/hoxline/"'],
  ["src/data/navigation.ts", navigationSource, "hoxline"],
  ["app/hoxline/page.tsx", hoxlinePage, "ProofOps control for the AI security era."],
  ["app/hoxline/page.tsx", hoxlinePage, "AI is not the authority. Evidence is."],
  ["app/hoxline/page.tsx", hoxlinePage, "The Claim Problem"],
  ["app/hoxline/page.tsx", hoxlinePage, "HO-DET-001 Controlled Demo Spotlight"],
  ["app/hoxline/page.tsx", hoxlinePage, "Authority Architecture"],
  ["app/hoxline/page.tsx", hoxlinePage, "Next Gate"],
  ["app/aevumguard/page.tsx", aevumguardPage, "Legacy compatibility route"],
  ["app/aevumguard/page.tsx", aevumguardPage, "AevumGuard was a prior working name"],
  ["app/aevumguard/page.tsx", aevumguardPage, 'canonical: "/hoxline/"'],
  ["app/aevumguard/page.tsx", aevumguardPage, 'href="/hoxline/"'],
  ["app/proof/page.tsx", proofPage, "Claim Firewall control surface"],
  ["app/proof/page.tsx", proofPage, "Open Claim Firewall"],
  ["app/proof/page.tsx", proofPage, "website rendering below proof authority"],
  ["app/claim-firewall/page.tsx", claimFirewallPage, "Hoxline Claim Authority capability"],
  ["app/claim-firewall/page.tsx", claimFirewallPage, "Claim Firewall is a wording enforcement edge inside Hoxline."],
  ["app/claim-firewall/page.tsx", claimFirewallPage, "Claim Firewall is not the product, platform, front-door repo, or an eighth repo."],
  ["app/claim-firewall/page.tsx", claimFirewallPage, "Website rendering is not proof"],
  ["app/claim-firewall/page.tsx", claimFirewallPage, "Public proof requires evidence linkage and explicit promotion."],
  ["app/controls/page.tsx", controlsPage, 'href="/hoxline/"'],
  ["app/controls/page.tsx", controlsPage, "Compatibility only"],
];
const hoxlineFrontDoorFailures = hoxlineFrontDoorRequiredTerms
  .filter(([, source, term]) => !source.includes(term))
  .map(([file, , term]) => `${file} must include ${term}.`);

if (hoxlineFrontDoorFailures.length > 0) {
  console.error(`Hoxline front-door invariant failed:\n${hoxlineFrontDoorFailures.map((line) => `- ${line}`).join("\n")}`);
  process.exit(1);
}

const lifetimeLedgerRequiredTerms = [
  ["app/proof/page.tsx", proofPage, "Lifetime Case Ledger v1"],
  ["app/proof/page.tsx", proofPage, "total_ledger_events"],
  ["app/proof/page.tsx", proofPage, "total_cases"],
  ["app/proof/page.tsx", proofPage, "public_safe_count"],
  ["app/proof/page.tsx", proofPage, "closed_case_count"],
  ["app/proof/page.tsx", proofPage, "NOT_PUBLIC_SAFE"],
  ["app/proof/page.tsx", proofPage, "SCHEMA_CONTRACT_VERIFIER_EXISTS_ONLY"],
  ["app/proof/page.tsx", proofPage, "HO-DET-001"],
  ["app/proof/page.tsx", proofPage, "HO-DET-011"],
  ["app/proof/page.tsx", proofPage, "HO-DET-012"],
  ["app/proof/page.tsx", proofPage, "VERIFICATION STATUS"],
  ["app/proof/page.tsx", proofPage, "Workflow-status indicators only"],
  ["app/proof/page.tsx", proofPage, "lifetime-ledger-public-summary"],
  ["app/proof/page.tsx", proofPage, "lifetime-ledger-proof-bundle"],
  ["app/proof/page.tsx", proofPage, "website is render-only"],
  ["app/proof/page.tsx", proofPage, "proof repo owns the summary and proof bundle"],
  ["app/proof/page.tsx", proofPage, "badges are workflow-status indicators only"],
  ["app/proof/page.tsx", proofPage, "no runtime, signal, public-safe runtime proof, SOCaaS, production, autonomous SOC, disposition, or case-closure claim is made"],
  ["src/data/proofRecords.ts", proofRecordsData, "lifetimeCaseLedgerV1"],
  ["src/data/proofRecords.ts", proofRecordsData, "total_ledger_events: 6"],
  ["src/data/proofRecords.ts", proofRecordsData, "total_cases: 6"],
  ["src/data/proofRecords.ts", proofRecordsData, "public_safe_count: 0"],
  ["src/data/proofRecords.ts", proofRecordsData, "closed_case_count: 0"],
  ["src/data/proofRecords.ts", proofRecordsData, "correction_event_count: 0"],
  ["src/data/proofRecords.ts", proofRecordsData, "superseding_event_count: 0"],
  ["src/data/proofRecords.ts", proofRecordsData, "NOT_PUBLIC_SAFE"],
  ["src/data/proofRecords.ts", proofRecordsData, "SCHEMA_CONTRACT_VERIFIER_EXISTS_ONLY"],
  ["src/data/navigation.ts", navigationSource, "lifetimeLedgerSummary"],
  ["src/data/navigation.ts", navigationSource, "lifetimeLedgerProofBundle"],
  ["src/data/navigation.ts", navigationSource, "lifetimeLedgerBadges"],
  ["src/data/navigation.ts", navigationSource, "proof/records/lifetime-case-ledger-v1-public-summary.json"],
  ["src/data/navigation.ts", navigationSource, "proof/records/lifetime-case-ledger-v1-proof-bundle.json"],
  ["src/data/navigation.ts", navigationSource, "actions/workflows/governance-gate.yml?query=branch%3Amain"],
];
const lifetimeLedgerFailures = lifetimeLedgerRequiredTerms
  .filter(([, source, term]) => !source.includes(term))
  .map(([file, , term]) => `${file} must include ${term}.`);

if (lifetimeLedgerFailures.length > 0) {
  console.error(`Lifetime Case Ledger render invariant failed:\n${lifetimeLedgerFailures.map((line) => `- ${line}`).join("\n")}`);
  process.exit(1);
}

const currentProofSpineRequiredTerms = [
  ["app/page.tsx", homePage, "CurrentProofSpine"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "current-proof-spine"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "@data/generated/public-status.generated"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "Generated public-status rendering input"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "Current Proof Spine"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "Proof authority, validation engine, platform control layer."],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "exposes built work first"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "Proof Authority"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "Validation Engine"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "Platform Control Layer"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "Proof records, proof cards, proof packs, reviewer maps, accomplishment ledgers, and authority-boundary case studies"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "Local pipelines, parity checks, case-packet contracts, claim scanners, activity ledgers, and CI gates"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "Factory commands, ledger gates, state manifests, runtime candidates, recoverability drills, and SOAR packet contracts"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "Reviewer Metrics Pipeline v1"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, 'metricDisplay("governed_cases")'],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "Separates strict governed cases from validation activity, proof records, and blocked-claim counts."],
  ["components/CurrentProofSpine.tsx", currentProofSpine, 'metricDisplay("validation_fires")'],
  ["components/CurrentProofSpine.tsx", currentProofSpine, 'metricDisplay("validation_cases")'],
  ["components/CurrentProofSpine.tsx", currentProofSpine, 'metricDisplay("proof_records")'],
  ["components/CurrentProofSpine.tsx", currentProofSpine, 'metricDisplay("blocked_claims")'],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "public-safe"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "HO-DET-001 Receipt Chain"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "reviewer handoff"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "Controlled test validated"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "Lifetime Case Ledger v1"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "state-manifest control"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "Runtime Case Collector v0"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "Runtime Route Proof v1 private-candidate review routing"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "Runner Trust Boundary"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "Separates public PR checks from manually triggered trusted-runner proof routes."],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "Standing Governance Controls"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "PR review rituals"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "Proof Pack 001 Quick Check"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "hash/verification path"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "Website rendering is not proof"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "GitHub Project metadata, website rendering, runtime truth, or signal truth into proof"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "does not promote proof"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "runtime-active status"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "signal-observed"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "public-safe runtime proof"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "production/SOCaaS/customer"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "deployment"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "FortiSIEM integration"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "AI disposition"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "analyst"],
  ["components/CurrentProofSpine.tsx", currentProofSpine, "disposition authority"],
];
const currentProofSpineFailures = currentProofSpineRequiredTerms
  .filter(([, source, term]) => !source.includes(term))
  .map(([file, , term]) => `${file} must include ${term}.`);

if (currentProofSpineFailures.length > 0) {
  console.error(`Current Proof Spine render invariant failed:\n${currentProofSpineFailures.map((line) => `- ${line}`).join("\n")}`);
  process.exit(1);
}

const claimFirewallVisualRequiredTerms = [
  ["app/claim-firewall/page.tsx", claimFirewallPage, "Claim Firewall"],
  ["app/claim-firewall/page.tsx", claimFirewallPage, "Public wording stays below the evidence ceiling"],
  ["app/claim-firewall/page.tsx", claimFirewallPage, "Website rendering is not proof"],
  ["app/claim-firewall/page.tsx", claimFirewallPage, "controls-hero"],
  ["app/claim-firewall/page.tsx", claimFirewallPage, "Unsupported security claims should fail before they reach the public page"],
  ["app/claim-firewall/page.tsx", claimFirewallPage, "WORDING"],
  ["app/claim-firewall/page.tsx", claimFirewallPage, "SCANNER"],
  ["app/claim-firewall/page.tsx", claimFirewallPage, "CEILING"],
  ["app/claim-firewall/page.tsx", claimFirewallPage, "PUBLIC WORDING ROUTE"],
  ["app/claim-firewall/page.tsx", claimFirewallPage, "public proof blocked"],
  ["app/claim-firewall/page.tsx", claimFirewallPage, "Product boundary"],
  ["app/claim-firewall/page.tsx", claimFirewallPage, "controls-hero__boundary-strip"],
  ["app/claim-firewall/page.tsx", claimFirewallPage, "Public proof requires evidence linkage and explicit promotion."],
  ["components/ClaimFirewall.tsx", claimFirewallComponent, "claim-firewall-demo"],
  ["components/ClaimFirewall.tsx", claimFirewallComponent, "Evidence ceiling gauge"],
  ["components/ClaimFirewall.tsx", claimFirewallComponent, "Blocked / not claimed"],
  ["components/ClaimFirewall.tsx", claimFirewallComponent, "CONTROLLED RISK CHIPS"],
  ["components/ClaimFirewall.tsx", claimFirewallComponent, "Allowed wording examples"],
  ["components/ClaimFirewall.tsx", claimFirewallComponent, "Unsafe wording examples"],
  ["components/ClaimFirewall.tsx", claimFirewallComponent, "Promotion gate timeline"],
  ["components/ClaimFirewall.tsx", claimFirewallComponent, "Outcome panel"],
  ["components/ClaimFirewall.tsx", claimFirewallComponent, "website rendering"],
  ["components/ClaimFirewall.tsx", claimFirewallComponent, "green CI"],
  ["components/ClaimFirewall.tsx", claimFirewallComponent, "AI support"],
  ["components/ClaimFirewall.tsx", claimFirewallComponent, "runtime candidate"],
  ["components/ClaimFirewall.tsx", claimFirewallComponent, "No public proof is created by this page"],
];
const claimFirewallVisualFailures = claimFirewallVisualRequiredTerms
  .filter(([, source, term]) => !source.includes(term))
  .map(([file, , term]) => `${file} must include ${term}.`);

if (claimFirewallVisualFailures.length > 0) {
  console.error(`Claim Firewall visual invariant failed:\n${claimFirewallVisualFailures.map((line) => `- ${line}`).join("\n")}`);
  process.exit(1);
}

if (!proofHoDet001Page.includes('title: "HO-DET-001 | HawkinsOperations"')) {
  console.error("HO-DET-001 proof route metadata must use HawkinsOperations, not stale HawkinsOps branding.");
  process.exit(1);
}

const discoveryProof = JSON.parse(readFileSync(join(root, "public/.well-known/hawkinsoperations-proof.json"), "utf8"));
const agentSkills = JSON.parse(readFileSync(join(root, "public/.well-known/agent-skills/index.json"), "utf8"));
const agentMarkdown = readFileSync(join(root, "public/agent.md"), "utf8");
const headersFile = readFileSync(join(root, "public/_headers"), "utf8");
const robotsText = readFileSync(join(root, "public/robots.txt"), "utf8");

const discoveryFailures = [];
if (discoveryProof.name !== "HawkinsOperations") {
  discoveryFailures.push("public/.well-known/hawkinsoperations-proof.json must identify HawkinsOperations by name.");
}
if (discoveryProof.claim_ceiling !== "source_and_navigation_metadata_only") {
  discoveryFailures.push("public/.well-known/hawkinsoperations-proof.json must cap claim_ceiling at source_and_navigation_metadata_only.");
}
if (!Array.isArray(discoveryProof.blocked_claims) || !discoveryProof.blocked_claims.includes("runtime_or_production_control")) {
  discoveryFailures.push("public/.well-known/hawkinsoperations-proof.json must block runtime_or_production_control.");
}
if (!Array.isArray(discoveryProof.reviewer_routes) || discoveryProof.reviewer_routes.length < 4) {
  discoveryFailures.push("public/.well-known/hawkinsoperations-proof.json must expose reviewer_routes for machine-readable navigation.");
}
if (!discoveryProof.reviewer_routes?.some((route) => route.id === "hoxline" && route.url === "https://hawkinsoperations.com/hoxline/")) {
  discoveryFailures.push("public/.well-known/hawkinsoperations-proof.json must expose /hoxline/ as the product front-door reviewer route.");
}
if (!agentMarkdown.includes("/hoxline/")) {
  discoveryFailures.push("public/agent.md must list /hoxline/ as a public entry point.");
}
if (agentMarkdown.includes("/aevumguard/")) {
  discoveryFailures.push("public/agent.md must not list /aevumguard/ as a current public entry point.");
}
if (agentMarkdown.includes("/claim-firewall/")) {
  discoveryFailures.push("public/agent.md must not list /claim-firewall/ as a public discovery entry point.");
}
if (agentSkills.agent_capability_boundary !== "read_review_navigation_only") {
  discoveryFailures.push("public/.well-known/agent-skills/index.json must cap agent_capability_boundary at read_review_navigation_only.");
}
if (!Array.isArray(agentSkills.skills) || agentSkills.skills.length < 4) {
  discoveryFailures.push("public/.well-known/agent-skills/index.json must list public read/review/navigation skills.");
}
for (const skill of agentSkills.skills ?? []) {
  if (skill.execution || skill.auth_required || skill.private_api || skill.runtime_action) {
    discoveryFailures.push(`agent skill ${skill.id ?? "<unknown>"} must not imply execution, auth, private API, or runtime action.`);
  }
}
const unsupportedDiscoveryClaimPatterns = [
  /MCP/i,
  /WebMCP/i,
  /OpenAI\s+cites/i,
  /ChatGPT\s+cites/i,
  /Apple\s+uses/i,
  /production\s+proven/i,
  /runtime\s+proven/i,
  /live\s+SOC\s+proven/i,
];
if (unsupportedDiscoveryClaimPatterns.some((pattern) => pattern.test(`${JSON.stringify(discoveryProof)} ${JSON.stringify(agentSkills)} ${agentMarkdown}`))) {
  discoveryFailures.push("agent discovery metadata must not imply MCP/WebMCP or unsupported citation/runtime/production claims.");
}
if (!headersFile.includes("Link: </.well-known/hawkinsoperations-proof.json>; rel=\"service-doc\"")) {
  discoveryFailures.push("public/_headers must add a homepage service-doc Link header to hawkinsoperations-proof.json.");
}
if (!headersFile.includes("Link: </agent.md>; rel=\"alternate\"; type=\"text/markdown\"")) {
  discoveryFailures.push("public/_headers must add a homepage alternate markdown Link header to agent.md.");
}
for (const directive of ["User-agent: *", "Allow: /", "Sitemap: https://hawkinsoperations.com/sitemap.xml", "Content-Signal: ai-train=no", "Content-Signal: search=yes", "Content-Signal: ai-input=yes"]) {
  if (!robotsText.includes(directive)) {
    discoveryFailures.push(`public/robots.txt must include ${directive}.`);
  }
}

if (discoveryFailures.length > 0) {
  console.error(`Agent discovery metadata invariant failed:\n${discoveryFailures.map((line) => `- ${line}`).join("\n")}`);
  process.exit(1);
}

const blockedTerms = [
  "runtime-active",
  "signal-observed",
  "public-safe",
  "public-safe runtime proof",
  "production-ready",
  "production deployment",
  "customer deployment",
  "SOCaaS deployment",
  "SOCaaS availability",
  "SOCaaS-ready",
  "FortiSIEM integration proven",
  "customer-ready product",
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
  /does not promote/i,
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

const publicStatusSource = readFileSync(join(root, "src/data/generated/public-status.generated.ts"), "utf8");
const publicStatusJson = JSON.parse(readFileSync(join(root, "public/data/public-status.json"), "utf8"));
const publicSurfaceIdentities = readFileSync(join(root, "src/data/publicSurfaceIdentities.ts"), "utf8");
const proofOfWorkCounterRail = readFileSync(join(root, "components/command-center/ProofOfWorkCounterRail.tsx"), "utf8");
const hoxlineEngineRoom = readFileSync(join(root, "components/hoxline/HoxlineEngineRoom.tsx"), "utf8");
const reviewerRunPath = readFileSync(join(root, "components/ReviewerRunPath.tsx"), "utf8");
const stressTestReport = readFileSync(join(root, "docs/live-public-surface-stress-test.md"), "utf8");

const publicStatusFailures = [];
for (const term of [
  "GENERATED_PUBLIC_STATUS_V0_SNAPSHOT",
  "generated_at",
  "generated_by",
  "generation_mode",
  "snapshot_label",
  "source_repos",
  "source_paths",
  "source_commit_refs",
  "freshness_window_days",
  "stale_evaluation",
  "proof_ceiling",
  "public_safe",
  "website_rendering_boundary",
  "no_proof_promotion_statement",
  "source_ownership_message",
  "owning_routes",
  "reviewer_actions",
  "raw_status_constants",
  "Controlled test validated",
  "Not public-safe",
  "Rendering only",
  "Website rendering is not proof.",
]) {
  if (!publicStatusSource.includes(term)) {
    publicStatusFailures.push(`src/data/generated/public-status.generated.ts must include ${term}.`);
  }
}

if (publicStatusJson.generated_by !== "GENERATED_PUBLIC_STATUS_V0_SNAPSHOT") {
  publicStatusFailures.push("public/data/public-status.json must be labeled GENERATED_PUBLIC_STATUS_V0_SNAPSHOT.");
}
if (publicStatusJson.generation_mode !== "bounded_v0_snapshot_fixture") {
  publicStatusFailures.push("public/data/public-status.json must include generation_mode bounded_v0_snapshot_fixture.");
}
if (!publicStatusJson.snapshot_label?.includes("Generated public status")) {
  publicStatusFailures.push("public/data/public-status.json must include a generated status snapshot_label.");
}
if (publicStatusJson.freshness_window_days !== 14) {
  publicStatusFailures.push("public/data/public-status.json must document the 14-day freshness window.");
}
if (publicStatusJson.stale_evaluation?.supported !== true || publicStatusJson.stale_evaluation?.stale_when_older_than_days !== 14) {
  publicStatusFailures.push("public/data/public-status.json must include stale evaluation support tied to the 14-day freshness window.");
}
if (publicStatusJson.website_rendering_boundary?.statement !== "Website rendering is not proof.") {
  publicStatusFailures.push("public/data/public-status.json must preserve the website rendering boundary.");
}
if (!publicStatusJson.no_proof_promotion_statement?.includes("snapshot/rendering input only")) {
  publicStatusFailures.push("public/data/public-status.json must state that generated status is a snapshot/rendering input only.");
}
if (!publicStatusJson.source_ownership_message?.includes("proof") || !publicStatusJson.source_ownership_message?.includes("validation")) {
  publicStatusFailures.push("public/data/public-status.json must include source ownership language.");
}
for (const routeKey of ["public_status_json", "hoxline", "proof", "validation", "detections", "platform_contracts", "claim_firewall"]) {
  if (!publicStatusJson.owning_routes?.[routeKey]) {
    publicStatusFailures.push(`public/data/public-status.json must include owning_routes.${routeKey}.`);
  }
}
for (const metricKey of [
  "controls_fired",
  "validation_fires",
  "validation_cases",
  "proof_records",
  "blocked_claims",
  "governed_cases",
  "closed_case_count",
  "public_safe_count",
]) {
  const metric = publicStatusJson.metrics?.[metricKey];
  if (!metric || typeof metric.value !== "number" || typeof metric.display_value !== "string" || !metric.display_label || !metric.source_href) {
    publicStatusFailures.push(`public/data/public-status.json metrics.${metricKey} must include value, display_value, display_label, and source_href.`);
  }
}
if (!Array.isArray(publicStatusJson.reviewer_actions?.inspect_online) || publicStatusJson.reviewer_actions.inspect_online.length < 4) {
  publicStatusFailures.push("public/data/public-status.json must include reviewer_actions.inspect_online with at least four source routes.");
}
if (publicStatusJson.reviewer_actions?.download_json?.href !== "/data/public-status.json") {
  publicStatusFailures.push("public/data/public-status.json must include reviewer_actions.download_json pointing to /data/public-status.json.");
}
if (!publicStatusJson.reviewer_actions?.clone_repo?.command?.includes("git clone https://github.com/HawkinsOperations/hoxline.git")) {
  publicStatusFailures.push("public/data/public-status.json must include the Hoxline clone command.");
}
for (const command of ["python -B -m hoxline demo quickstart", "python -B -m pytest -q tests", "python -B -m hoxline gauntlet verify", "npm run check:site", "npm run build"]) {
  if (!publicStatusJson.reviewer_actions?.run_commands?.some((entry) => entry.command.includes(command))) {
    publicStatusFailures.push(`public/data/public-status.json reviewer_actions.run_commands must include ${command}.`);
  }
}

for (const term of [
  "cinematic mission briefing",
  "interactive product console",
  "evidence room / receipt wall",
  "technical catalog / ATT&CK workbench",
  "operator origin / methodology bridge",
  "support-only AI model",
]) {
  if (!publicSurfaceIdentities.includes(term)) {
    publicStatusFailures.push(`src/data/publicSurfaceIdentities.ts must include ${term}.`);
  }
}

for (const [file, source, required] of [
  ["components/command-center/ProofOfWorkCounterRail.tsx", proofOfWorkCounterRail, "public-status.json"],
  ["components/command-center/ProofOfWorkCounterRail.tsx", proofOfWorkCounterRail, "generatedStatusFreshnessLabel"],
  ["components/command-center/ProofOfWorkCounterRail.tsx", proofOfWorkCounterRail, "ReviewerRunPath"],
  ["components/hoxline/HoxlineEngineRoom.tsx", hoxlineEngineRoom, "publicStatus.hoxline.runner.label"],
  ["components/hoxline/HoxlineEngineRoom.tsx", hoxlineEngineRoom, "publicStatus.source_ownership_message"],
  ["components/hoxline/HoxlineEngineRoom.tsx", hoxlineEngineRoom, "ReviewerRunPath"],
  ["components/ReviewerRunPath.tsx", reviewerRunPath, "Download, clone, and run commands"],
  ["components/ReviewerRunPath.tsx", reviewerRunPath, "details"],
  ["components/ReviewerRunPath.tsx", reviewerRunPath, "reviewer_actions"],
]) {
  if (!source.includes(required)) {
    publicStatusFailures.push(`${file} must consume generated public status via ${required}.`);
  }
}

for (const term of [
  "Page-overlap matrix",
  "REDUNDANCY_RISK",
  "REDUNDANCY_RISK decision table",
  "VISUAL_MONOTONY_RISK",
  "VISUAL_MONOTONY_RISK primitive inventory",
  "Prompt 4 should be: Public Site Visual Refactor + Evidence Consolidation",
  "Accomplishment-first rewrite inventory",
  "Partial reduction already made in this PR",
  "No-proof-promotion statement",
]) {
  if (!stressTestReport.includes(term)) {
    publicStatusFailures.push(`docs/live-public-surface-stress-test.md must include ${term}.`);
  }
}

if (publicStatusFailures.length > 0) {
  console.error(`Generated public status invariant failed:\n${publicStatusFailures.map((line) => `- ${line}`).join("\n")}`);
  process.exit(1);
}

const hardcodedMetricGuardFiles = [
  "app/page.tsx",
  "components/command-center/ProofOfWorkCounterRail.tsx",
  "components/CurrentProofSpine.tsx",
  "components/hoxline/HoxlineEngineRoom.tsx",
  "components/visual-intelligence/index.tsx",
  "src/data/systemShowcase.ts",
];
const hardcodedMetricAllowedFiles = new Set([
  "src/data/generated/public-status.generated.ts",
  "public/data/public-status.json",
  "docs/live-public-surface-stress-test.md",
]);
const riskyMetricPatterns = [
  /\b\d+\s+controls fired\b/i,
  /\b\d+\s+validation fires\b/i,
  /\b\d+\s+validation cases\b/i,
  /\b\d+\s+proof records\b/i,
  /\b\d+\s+blocked claims\b/i,
  /\b\d+\s+claims blocked\b/i,
  /\b\d+\s+governed cases\b/i,
  /\b\d+\s+public-safe\b/i,
  /\b\d+\s+closed cases\b/i,
  /\b(?:controls_fired|validation_fires|validation_cases|proof_records|blocked_claims|public_safe_count|closed_case_count)\s*[:=]\s*\d+\b/i,
];
const rawPrimaryCopyPatterns = [
  /<span>\s*(?:CONTROLLED_TEST_VALIDATED|NOT_PUBLIC_SAFE|RENDERING_ONLY|RUNTIME_BLOCKED|SIGNAL_MISSING_EVIDENCE|HUMAN_REVIEW_REQUIRED)\s*<\/span>/,
  /<StatusChip[^>]*>\s*(?:CONTROLLED_TEST_VALIDATED|NOT_PUBLIC_SAFE|RENDERING_ONLY|RUNTIME_BLOCKED|SIGNAL_MISSING_EVIDENCE|HUMAN_REVIEW_REQUIRED)\s*<\/StatusChip>/,
];
const metricGuardFailures = [];

for (const relativeFile of hardcodedMetricGuardFiles) {
  if (hardcodedMetricAllowedFiles.has(relativeFile)) continue;
  const source = readFileSync(join(root, relativeFile), "utf8");
  if (/HISTORICAL_POINT_IN_TIME/.test(source)) continue;
  const lines = source.split(/\r?\n/);
  lines.forEach((line, index) => {
    if (line.includes("@data/generated/public-status.generated")) return;
    if (riskyMetricPatterns.some((pattern) => pattern.test(line))) {
      metricGuardFailures.push(`${relativeFile}:${index + 1}: changing public metric must come from generated public status: ${line.trim()}`);
    }
    if (rawPrimaryCopyPatterns.some((pattern) => pattern.test(line))) {
      metricGuardFailures.push(`${relativeFile}:${index + 1}: raw status constants must be human-labeled in primary copy: ${line.trim()}`);
    }
  });
}

if (metricGuardFailures.length > 0) {
  console.error(`Hardcoded public metric guard failed:\n${metricGuardFailures.map((line) => `- ${line}`).join("\n")}`);
  process.exit(1);
}

console.log("Site contract checks passed.");
