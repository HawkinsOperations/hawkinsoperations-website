import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const websiteRoot = join(scriptDir, "..");
const orgRoot = join(websiteRoot, "..");
const generatedAt = new Date().toISOString();
const maxAgeHours = 14 * 24;
const proofCeiling =
  "Website rendering/reporting only. Does not prove runtime, signal, production, public-safe proof, customer deployment, final approval, merge readiness, or website-as-proof.";

const repoSpecs = [
  {
    repo: "HawkinsOperations/.github",
    authority: "source truth",
    dir: join(orgRoot, ".github"),
    publicPath: "architecture/REPO_AUTHORITY_MAP.md",
    method: "presence and git commit only; no metric derived in v0",
  },
  {
    repo: "HawkinsOperations/hoxline",
    authority: "Hoxline/product truth",
    dir: join(orgRoot, "hoxline"),
    publicPath: "examples/gauntlet/ho-det-001-full-loop-run-v0.json",
    method: "presence and git commit only; path contains product artifact, no metric derived in v0",
  },
  {
    repo: "HawkinsOperations/hawkinsoperations-detections",
    authority: "source truth",
    dir: join(orgRoot, "hawkinsoperations-detections"),
    publicPath: "detections/DETECTION_PROMOTION_MATRIX.yml",
    method: "presence and git commit only; no metric derived in v0",
  },
  {
    repo: "HawkinsOperations/hawkinsoperations-validation",
    authority: "validation truth",
    dir: join(orgRoot, "hawkinsoperations-validation"),
    publicPath: "activity/detection-activity-ledger-v1.json",
    method: "read-only corroborating source; not used to inflate reviewer-safe public metrics in v0",
  },
  {
    repo: "HawkinsOperations/hawkinsoperations-platform",
    authority: "platform/ledger truth",
    dir: join(orgRoot, "hawkinsoperations-platform"),
    publicPath: "contracts/reviewer-metrics-pipeline-v1-state.json",
    method: "read bounded reviewer metrics state when available",
  },
  {
    repo: "HawkinsOperations/hawkinsoperations-proof",
    authority: "proof/claim-authority truth",
    dir: join(orgRoot, "hawkinsoperations-proof"),
    publicPath: "proof/records/reviewer-metrics-pipeline-v1-summary.json",
    method: "read proof-owned reviewer-safe summary metrics",
  },
  {
    repo: "HawkinsOperations/hawkinsoperations-website",
    authority: "website rendering only",
    dir: websiteRoot,
    publicPath: "src/data/governanceSaves.ts",
    method: "count source-controlled public governance-save entries excluding PRIVATE_ONLY",
  },
];

function runGit(dir, args) {
  if (!existsSync(dir)) return null;
  try {
    return execFileSync("git", ["-c", `safe.directory=${dir.replaceAll("\\", "/")}`, "-C", dir, ...args], { encoding: "utf8" }).trim();
  } catch {
    return null;
  }
}

function readJson(repoDir, repoPath) {
  const fullPath = join(repoDir, repoPath);
  if (!existsSync(fullPath)) return null;
  return JSON.parse(readFileSync(fullPath, "utf8"));
}

function repoSource(spec) {
  const available = existsSync(spec.dir);
  const commit = available ? runGit(spec.dir, ["rev-parse", "HEAD"]) : null;
  return {
    repo: spec.repo,
    authority: spec.authority,
    path: spec.publicPath,
    commit,
    available,
    method: spec.method,
    notes: available
      ? "Source repository is locally available for generation."
      : "Source repository unavailable locally; generation must fail closed for metrics that depend on it.",
  };
}

function shortCommit(commit) {
  return commit ? commit.slice(0, 7) : "unverified";
}

function githubHref(repo, sourcePath, commit) {
  const repository = repo.replace("HawkinsOperations/", "HawkinsOperations/");
  if (!commit || !sourcePath) return `https://github.com/${repository}`;
  return `https://github.com/${repository}/blob/${commit}/${sourcePath}`;
}

function countPublicGovernanceSaves() {
  const repoDir = websiteRoot;
  const sourcePath = "src/data/governanceSaves.ts";
  const fullPath = join(repoDir, sourcePath);
  if (!existsSync(fullPath)) return null;
  const source = readFileSync(fullPath, "utf8");
  const records = [...source.matchAll(/\{\s*id: "GS-[\s\S]*?\n\s*\}/g)].map((match) => match[0]);
  if (records.length === 0) return null;
  return records.filter((record) => !record.includes('publicSafety: "PRIVATE_ONLY"')).length;
}

const sources = repoSpecs.map(repoSource);
const sourceByRepo = Object.fromEntries(sources.map((source) => [source.repo, source]));
const proofRepo = repoSpecs.find((spec) => spec.repo.endsWith("hawkinsoperations-proof"));
const platformRepo = repoSpecs.find((spec) => spec.repo.endsWith("hawkinsoperations-platform"));
const validationRepo = repoSpecs.find((spec) => spec.repo.endsWith("hawkinsoperations-validation"));
const websiteRepo = repoSpecs.find((spec) => spec.repo.endsWith("hawkinsoperations-website"));

const proofSummary = proofRepo && existsSync(proofRepo.dir)
  ? readJson(proofRepo.dir, "proof/records/reviewer-metrics-pipeline-v1-summary.json")
  : null;
const lifetimeLedger = proofRepo && existsSync(proofRepo.dir)
  ? readJson(proofRepo.dir, "proof/records/lifetime-case-ledger-v1-public-summary.json")
  : null;
const platformState = platformRepo && existsSync(platformRepo.dir)
  ? readJson(platformRepo.dir, "contracts/reviewer-metrics-pipeline-v1-state.json")
  : null;
const validationLedger = validationRepo && existsSync(validationRepo.dir)
  ? readJson(validationRepo.dir, "activity/detection-activity-ledger-v1.json")
  : null;
const publicGovernanceSaveCount = countPublicGovernanceSaves();

function sourceUnavailableMetric(id, label, unit, source) {
  return {
    id,
    label,
    value: null,
    unit,
    authority: source?.authority ?? "source unavailable",
    source_repo: source?.repo ?? "unknown",
    source_path: source?.path ?? "unknown",
    source_commit: source?.commit ?? null,
    method: source?.method ?? "source unavailable",
    generated_at: generatedAt,
    freshness_status: "source_unavailable",
    proof_ceiling: proofCeiling,
    claim_status: "source_unavailable",
    not_claiming: notClaiming(),
    blocked_reason: "Required public source artifact is unavailable or unreadable.",
    display_value: "Unavailable",
    display_label: label,
    detail: "source unavailable; no public metric promoted",
    source_label: "source unavailable",
    source_href: source ? githubHref(source.repo, source.path, source.commit) : "/data/public-status.json",
    tone: "neutral",
  };
}

function notClaiming() {
  return [
    "runtime proof",
    "signal proof",
    "production readiness",
    "customer deployment",
    "public-safe runtime proof",
    "AI approval",
    "analyst approval",
    "website-as-proof",
  ];
}

function metric({ id, label, value, unit = "count", source, method, detail, tone, claimStatus = "bounded_generated_count", blockedReason }) {
  if (typeof value !== "number" || !source?.available || !source.commit) {
    return sourceUnavailableMetric(id, label, unit, source);
  }
  const freshnessStatus = "fresh";
  return {
    id,
    label,
    value,
    unit,
    authority: source.authority,
    source_repo: source.repo,
    source_path: source.path,
    source_commit: source.commit,
    method,
    generated_at: generatedAt,
    freshness_status: freshnessStatus,
    proof_ceiling: proofCeiling,
    claim_status: claimStatus,
    not_claiming: notClaiming(),
    ...(blockedReason ? { blocked_reason: blockedReason } : {}),
    display_value: String(value),
    display_label: label.replace(/\b\w/g, (letter) => letter.toUpperCase()),
    detail: `${freshnessStatus} from ${source.path} @ ${shortCommit(source.commit)}`,
    source_label: `${source.repo.replace("HawkinsOperations/", "")} ${shortCommit(source.commit)}`,
    source_href: githubHref(source.repo, source.path, source.commit),
    tone,
  };
}

const proofSource = sourceByRepo["HawkinsOperations/hawkinsoperations-proof"];
const platformSource = sourceByRepo["HawkinsOperations/hawkinsoperations-platform"];
const websiteSource = sourceByRepo["HawkinsOperations/hawkinsoperations-website"];
const lifetimeLedgerSource = proofSource
  ? {
      ...proofSource,
      path: "proof/records/lifetime-case-ledger-v1-public-summary.json",
      method: "read proof-owned lifetime case ledger public summary",
    }
  : proofSource;
const proofMetrics = proofSummary?.metrics ?? platformState?.metrics ?? {};
const ledgerCounts = lifetimeLedger?.ledger_counts ?? {};

const metrics = {
  controls_fired: metric({
    id: "controls_fired",
    label: "controls fired",
    value: publicGovernanceSaveCount,
    source: websiteSource,
    method: "count governance save records excluding publicSafety PRIVATE_ONLY",
    detail: "public-facing Governance Saves records",
    tone: "cyan",
  }),
  validation_fires: metric({
    id: "validation_fires",
    label: "validation fires",
    value: proofMetrics.controlled_validation_fire_count,
    source: proofSource,
    method: "read proof-owned reviewer metrics summary controlled_validation_fire_count",
    detail: "controlled validation activity fires",
    tone: "green",
  }),
  validation_cases: metric({
    id: "validation_cases",
    label: "validation cases",
    value: proofMetrics.validation_case_count,
    source: proofSource,
    method: "read proof-owned reviewer metrics summary validation_case_count",
    detail: "controlled validation case count",
    tone: "green",
  }),
  proof_records: metric({
    id: "proof_records",
    label: "proof records",
    value: proofMetrics.proof_record_count,
    source: proofSource,
    method: "read proof-owned reviewer metrics summary proof_record_count",
    detail: "proof-record activity metric",
    tone: "amber",
  }),
  blocked_claims: metric({
    id: "blocked_claims",
    label: "claims blocked",
    value: proofMetrics.blocked_claim_count,
    source: proofSource,
    method: "read proof-owned reviewer metrics summary blocked_claim_count",
    detail: "reviewer metrics blocked-claim count",
    tone: "red",
  }),
  governed_cases: metric({
    id: "governed_cases",
    label: "governed cases",
    value: ledgerCounts.total_cases ?? proofMetrics.lifetime_governed_cases,
    source: lifetimeLedgerSource,
    method: "read proof-owned lifetime case ledger public summary total_cases",
    detail: "strict governed case count",
    tone: "blue",
  }),
  closed_case_count: metric({
    id: "closed_case_count",
    label: "closed cases",
    value: ledgerCounts.closed_case_count,
    source: lifetimeLedgerSource,
    method: "read proof-owned lifetime case ledger public summary closed_case_count",
    detail: "closed case count remains zero",
    tone: "neutral",
  }),
  public_safe_count: metric({
    id: "public_safe_count",
    label: "public-safe",
    value: proofMetrics.public_safe_count ?? ledgerCounts.public_safe_count,
    source: proofSource,
    method: "read proof-owned reviewer metrics public_safe_count; keep zero unless proof-owned approval exists",
    detail: "public-safe count remains zero",
    tone: "neutral",
    claimStatus: "blocked_not_public_safe",
    blockedReason: "Public-safe proof is not present in approved public artifacts.",
  }),
};

const sourceUnavailable = sources.filter((source) => !source.available).map((source) => ({
  id: `${source.repo.replace("HawkinsOperations/", "").replace(/[^a-z0-9]+/gi, "_").toLowerCase()}_source_unavailable`,
  status: "source_unavailable",
  source_repo: source.repo,
  source_path: source.path,
  detail: source.notes,
}));

const metricList = Object.values(metrics);
const hasUnavailableMetric = metricList.some((item) => item.freshness_status !== "fresh");
const status = hasUnavailableMetric ? "source_unavailable" : "fresh";
const websiteCommit = sourceByRepo["HawkinsOperations/hawkinsoperations-website"]?.commit ?? null;

const publicStatus = {
  schema_version: "public-status-v0",
  generated_at: generatedAt,
  generated_by: "scripts/generate-public-status.mjs",
  generator_commit: websiteCommit,
  generation_mode: "generated_public_status_data_plane_v0",
  snapshot_label: "Generated public status v0 data plane",
  freshness_window_days: 14,
  freshness: {
    status,
    max_age_hours: maxAgeHours,
    age_hours: 0,
    evaluated_at: generatedAt,
  },
  stale_evaluation: {
    supported: true,
    method: "Compare generated_at to freshness.max_age_hours at render time; stale data remains visible.",
    stale_when_older_than_days: 14,
  },
  sources,
  source_repos: sources.map((source) => source.repo),
  source_paths: sources.map((source) => `${source.repo.replace("HawkinsOperations/", "")}/${source.path}`),
  source_commit_refs: Object.fromEntries(sources.map((source) => [source.repo.replace("HawkinsOperations/", ""), source.commit])),
  metric_list: metricList,
  metrics,
  known_gaps: [
    ...sourceUnavailable,
    {
      id: "runtime_signal_metrics_gated",
      status: "blocked",
      detail: "Runtime and signal metrics remain gated because no approved public-safe runtime evidence is published in source artifacts.",
    },
    {
      id: "hoxline_local_path_artifacts_not_published",
      status: "unverified",
      detail: "Hoxline local case-growth artifacts can contain absolute local paths and are not copied into website public JSON.",
    },
    {
      id: "validation_ledger_counts_not_used_to_inflate_public_snapshot",
      status: "static_example",
      detail: `Validation ledger currently reports ${validationLedger?.aggregate_metrics?.validation_case_count ?? "unavailable"} cases, but v0 renders proof-owned reviewer-safe counts until claim authority updates public proof records.`,
    },
  ],
  proof_ceiling: {
    raw: "WEBSITE_RENDERING_ONLY_PUBLIC_STATUS_V0",
    label: "Website rendering only",
    detail: proofCeiling,
  },
  snapshot_authority:
    "Generated website rendering data. It routes readers to owning proof/platform/validation records and does not claim live authority.",
  source_ownership_message:
    "Website rendering reads generated public status; proof, validation, platform, detections, Hoxline, and org routing records own their respective facts.",
  public_safe: {
    raw: "NOT_PUBLIC_SAFE",
    label: "Not public-safe",
    value: false,
    count: metrics.public_safe_count.value ?? 0,
    detail: "Public-safe runtime proof is not promoted by this website data plane.",
  },
  website_rendering_boundary: {
    raw: "RENDERING_ONLY",
    label: "Rendering only",
    statement: "Website rendering is not proof.",
  },
  no_proof_promotion_statement:
    "Generated public status is a snapshot/rendering input only. Proof, platform, validation, and source repositories remain authority.",
  owning_routes: {
    public_status_json: "/data/public-status.json",
    hoxline: "https://github.com/HawkinsOperations/hoxline",
    proof: "/proof/",
    validation: "/validation/",
    detections: "/detections/",
    platform_contracts: "/platform/contracts/",
    claim_firewall: "/claim-firewall/",
  },
  raw_status_constants: {
    FRESH: "Fresh",
    STALE: "Stale",
    SOURCE_UNAVAILABLE: "Source unavailable",
    UNVERIFIED: "Unverified",
    NOT_PUBLIC_SAFE: "Not public-safe",
    RENDERING_ONLY: "Rendering only",
    RUNTIME_BLOCKED: "Runtime blocked",
    RUNTIME_GATED: "Runtime gated",
    SIGNAL_MISSING_EVIDENCE: "Signal missing evidence",
    HUMAN_REVIEW_REQUIRED: "Human review required",
  },
  hoxline: {
    runner: { raw: "GAUNTLET_V0", label: "Gauntlet v0" },
    artifact: { raw: "HO-DET-001", label: "HO-DET-001" },
    proof_ceiling: { raw: "WEBSITE_RENDERING_ONLY_PUBLIC_STATUS_V0", label: "Website rendering only" },
    runtime: { raw: "RUNTIME_BLOCKED", label: "Runtime blocked" },
    signal: { raw: "SIGNAL_MISSING_EVIDENCE", label: "Signal missing evidence" },
    human_review: { raw: "HUMAN_REVIEW_REQUIRED", label: "Human review required" },
    public_safe: { raw: "NOT_PUBLIC_SAFE", label: "Not public-safe" },
  },
  reviewer_actions: {
    inspect_online: [
      {
        label: "Open generated public status JSON",
        href: "/data/public-status.json",
        detail: "Website-rendered generated data and source-owner routes.",
      },
      {
        label: "Open Hoxline repo",
        href: "https://github.com/HawkinsOperations/hoxline",
        detail: "Product/control route for the HO-DET-001 Gauntlet path.",
      },
      {
        label: "Open proof records",
        href: "/proof/",
        detail: "Proof authority route for records, proof packs, and ceilings.",
      },
      {
        label: "Open validation registry",
        href: "/validation/",
        detail: "Controlled validation status and fixture scope.",
      },
    ],
    download_json: {
      label: "Download/open public status JSON",
      href: "/data/public-status.json",
      detail: "Generated website input; not proof authority.",
    },
    clone_repo: {
      label: "Clone Hoxline",
      working_directory: "hoxline repo root",
      command: "git clone https://github.com/HawkinsOperations/hoxline.git",
    },
    run_commands: [
      {
        label: "Regenerate public status",
        repo: "HawkinsOperations/hawkinsoperations-website",
        working_directory: "hawkinsoperations-website repo root",
        command: "npm run public-status:generate",
        source_basis: "Website public status data plane generator.",
      },
      {
        label: "Verify public status",
        repo: "HawkinsOperations/hawkinsoperations-website",
        working_directory: "hawkinsoperations-website repo root",
        command: "npm run public-status:verify",
        source_basis: "Website public status data plane fail-closed verifier.",
      },
      {
        label: "Website site contract",
        repo: "HawkinsOperations/hawkinsoperations-website",
        working_directory: "hawkinsoperations-website repo root",
        command: "npm run check:site",
        source_basis: "Website generated-status and public-surface contract verifier.",
      },
      {
        label: "Website typecheck",
        repo: "HawkinsOperations/hawkinsoperations-website",
        working_directory: "hawkinsoperations-website repo root",
        command: "npm run typecheck",
        source_basis: "Website TypeScript verifier.",
      },
      {
        label: "Website visual QA",
        repo: "HawkinsOperations/hawkinsoperations-website",
        working_directory: "hawkinsoperations-website repo root",
        command: "npm run test:visual",
        source_basis: "Chromium viewport homepage visual QA.",
      },
    ],
  },
};

const serialized = `${JSON.stringify(publicStatus, null, 2)}\n`;
writeFileSync(join(websiteRoot, "public/data/public-status.json"), serialized);

const tsSource = `export const GENERATED_PUBLIC_STATUS_V0 = ${JSON.stringify(publicStatus, null, 2)} as const;

export const GENERATED_PUBLIC_STATUS_V0_SNAPSHOT = GENERATED_PUBLIC_STATUS_V0;

export type PublicStatusMetricKey = keyof typeof GENERATED_PUBLIC_STATUS_V0.metrics;

export const publicStatus = GENERATED_PUBLIC_STATUS_V0;

export function metricDisplay(key: PublicStatusMetricKey) {
  const metric = publicStatus.metrics[key];
  return {
    label: metric.label,
    value: metric.display_value,
    detail: metric.detail,
    source: metric.source_label,
    sourceHref: metric.source_href,
    tone: metric.tone,
    freshness: metric.freshness_status,
    sourceCommit: metric.source_commit ? metric.source_commit.slice(0, 7) : "unverified",
  };
}

export function generatedStatusAgeHours(now = new Date()) {
  const generatedAt = new Date(publicStatus.generated_at).getTime();
  return Math.floor((now.getTime() - generatedAt) / 3_600_000);
}

export function generatedStatusAgeDays(now = new Date()) {
  return Math.floor(generatedStatusAgeHours(now) / 24);
}

export function isGeneratedStatusStale(now = new Date()) {
  return generatedStatusAgeHours(now) > publicStatus.freshness.max_age_hours;
}

export function generatedStatusFreshnessLabel(now = new Date()) {
  if (isGeneratedStatusStale(now)) {
    return \`Stale: older than \${publicStatus.freshness.max_age_hours} hours\`;
  }
  return \`\${publicStatus.freshness.status}: under \${publicStatus.freshness.max_age_hours}-hour freshness window\`;
}
`;

writeFileSync(join(websiteRoot, "src/data/generated/public-status.generated.ts"), tsSource);

console.log(`Generated ${relative(process.cwd(), join(websiteRoot, "public/data/public-status.json"))}`);
console.log(`Generated ${relative(process.cwd(), join(websiteRoot, "src/data/generated/public-status.generated.ts"))}`);
