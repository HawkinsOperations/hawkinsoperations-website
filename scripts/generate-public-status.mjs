import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
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
    publicPath: "proof/indexes/DETECTION_PROOF_STATUS_INDEX.yml",
    method: "derive current proof-record and ProofCard counts from unique non-null paths in the proof-owned current-authority index",
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

function sha256File(path) {
  return existsSync(path) ? createHash("sha256").update(readFileSync(path)).digest("hex") : null;
}

function committedText(dir, commit, path) {
  if (!commit) return null;
  try {
    return execFileSync("git", ["-c", `safe.directory=${dir.replaceAll("\\", "/")}`, "-C", dir, "show", `${commit}:${path}`], {
      encoding: "utf8",
    });
  } catch {
    return null;
  }
}

function sha256Text(value) {
  return value === null ? null : createHash("sha256").update(value, "utf8").digest("hex");
}

function repoSource(spec) {
  const repoAvailable = existsSync(spec.dir);
  const repositoryCommit = repoAvailable ? runGit(spec.dir, ["rev-parse", "HEAD"]) : null;
  const commit = repoAvailable ? runGit(spec.dir, ["log", "-1", "--format=%H", "--", spec.publicPath]) || repositoryCommit : null;
  const sourceText = repoAvailable ? committedText(spec.dir, commit, spec.publicPath) : null;
  const available = sourceText !== null;
  const resolvedRef = repoAvailable ? runGit(spec.dir, ["branch", "--show-current"]) || repositoryCommit : null;
  return {
    repo: spec.repo,
    authority: spec.authority,
    path: spec.publicPath,
    commit,
    repository_commit: repositoryCommit,
    resolved_ref: resolvedRef,
    source_fingerprint_sha256: sha256Text(sourceText),
    freshness_state: available && commit ? "fresh" : "source_unavailable",
    historical_snapshot: false,
    current_authority: true,
    available,
    method: spec.method,
    notes: available
      ? "Authoritative source path is locally available at the recorded repository revision."
      : "Authoritative source path is unavailable locally; dependent metrics fail closed.",
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
  const source = committedText(websiteRoot, sourceByRepo["HawkinsOperations/hawkinsoperations-website"]?.commit, "src/data/governanceSaves.ts");
  if (source === null) return null;
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

let proofSummary = null;
let lifetimeLedger = null;
const platformStateText = platformRepo
  ? committedText(platformRepo.dir, sourceByRepo["HawkinsOperations/hawkinsoperations-platform"]?.commit, platformRepo.publicPath)
  : null;
const validationLedgerText = validationRepo
  ? committedText(validationRepo.dir, sourceByRepo["HawkinsOperations/hawkinsoperations-validation"]?.commit, validationRepo.publicPath)
  : null;
const platformState = platformStateText === null ? null : JSON.parse(platformStateText);
const validationLedger = validationLedgerText === null ? null : JSON.parse(validationLedgerText);
const publicGovernanceSaveCount = countPublicGovernanceSaves();

function sourceVariant(source, path, method, { historicalSnapshot, currentAuthority }) {
  const commit = source ? runGit(proofRepo.dir, ["log", "-1", "--format=%H", "--", path]) || source.commit : null;
  const sourceText = source ? committedText(proofRepo.dir, commit, path) : null;
  const available = sourceText !== null;
  return source
    ? {
        ...source,
        path,
        commit,
        method,
        available,
        source_fingerprint_sha256: sha256Text(sourceText),
        freshness_state: available && source.commit ? "fresh" : "source_unavailable",
        historical_snapshot: historicalSnapshot,
        current_authority: currentAuthority,
      }
    : source;
}

function deriveProofIndexCounts() {
  const text = proofRepo && proofSource
    ? committedText(proofRepo.dir, proofSource.commit, "proof/indexes/DETECTION_PROOF_STATUS_INDEX.yml")
    : null;
  if (text === null) return null;
  const historicalSnapshot = /^\s*historical_snapshot:\s*true\s*$/m.test(text);
  const currentAuthority = /^\s*current_authority:\s*true\s*$/m.test(text);
  if (historicalSnapshot || !currentAuthority) return null;
  const records = [...text.matchAll(/^\s+proof_record_path:\s*([^#\r\n]+?)\s*$/gm)]
    .map((match) => match[1].trim())
    .filter((value) => value !== "null" && value !== "~");
  const cards = [...text.matchAll(/^\s+proof_card_path:\s*([^#\r\n]+?)\s*$/gm)]
    .map((match) => match[1].trim())
    .filter((value) => value !== "null" && value !== "~");
  if (new Set(records).size !== records.length || new Set(cards).size !== cards.length) return null;
  const publicSafeCount = [...text.matchAll(/^\s+public_safe_status:\s*PUBLIC_SAFE_APPROVED\s*$/gm)].length;
  return { proof_record_count: records.length, proof_card_count: cards.length, public_safe_count: publicSafeCount };
}

function sourceUnavailableMetric(id, label, unit, source, method) {
  return {
    id,
    label,
    value: null,
    unit,
    authority: source?.authority ?? "source unavailable",
    source_repo: source?.repo ?? "unknown",
    source_path: source?.path ?? "unknown",
    source_commit: source?.commit ?? null,
    source_repository_commit: source?.repository_commit ?? null,
    source_resolved_ref: source?.resolved_ref ?? null,
    source_fingerprint_sha256: source?.source_fingerprint_sha256 ?? null,
    method: method ?? source?.method ?? "source unavailable",
    generated_at: generatedAt,
    freshness_status: "source_unavailable",
    historical_snapshot: source?.historical_snapshot ?? false,
    current_authority: source?.current_authority ?? false,
    proof_ceiling: proofCeiling,
    claim_status: "source_unavailable",
    not_claiming: notClaiming(),
    blocked_reason: "Required public source artifact is unavailable, unreadable, or fails its authority derivation contract.",
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
    return sourceUnavailableMetric(id, label, unit, source, method);
  }
  const freshnessStatus = source.freshness_state;
  return {
    id,
    label,
    value,
    unit,
    authority: source.authority,
    source_repo: source.repo,
    source_path: source.path,
    source_commit: source.commit,
    source_repository_commit: source.repository_commit,
    source_resolved_ref: source.resolved_ref,
    source_fingerprint_sha256: source.source_fingerprint_sha256,
    method,
    generated_at: generatedAt,
    freshness_status: freshnessStatus,
    historical_snapshot: source.historical_snapshot,
    current_authority: source.current_authority,
    proof_ceiling: proofCeiling,
    claim_status: claimStatus,
    not_claiming: notClaiming(),
    ...(blockedReason ? { blocked_reason: blockedReason } : {}),
    display_value: String(value),
    display_label: label.replace(/\b\w/g, (letter) => letter.toUpperCase()),
    detail: `${source.historical_snapshot ? "historical snapshot" : freshnessStatus} from ${source.path} @ ${shortCommit(source.commit)}`,
    source_label: `${source.repo.replace("HawkinsOperations/", "")} ${shortCommit(source.commit)}`,
    source_href: githubHref(source.repo, source.path, source.commit),
    tone,
  };
}

const proofSource = sourceByRepo["HawkinsOperations/hawkinsoperations-proof"];
const platformSource = sourceByRepo["HawkinsOperations/hawkinsoperations-platform"];
const websiteSource = sourceByRepo["HawkinsOperations/hawkinsoperations-website"];
const proofSummarySource = sourceVariant(
  proofSource,
  "proof/records/reviewer-metrics-pipeline-v1-summary.json",
  "read explicitly historical proof-owned reviewer metrics summary",
  { historicalSnapshot: true, currentAuthority: false },
);
const lifetimeLedgerSource = sourceVariant(
  proofSource,
  "proof/records/lifetime-case-ledger-v1-public-summary.json",
  "read explicitly historical proof-owned lifetime case ledger public summary",
  { historicalSnapshot: true, currentAuthority: false },
);
const proofSummaryText = proofSummarySource
  ? committedText(proofRepo.dir, proofSummarySource.commit, proofSummarySource.path)
  : null;
const lifetimeLedgerText = lifetimeLedgerSource
  ? committedText(proofRepo.dir, lifetimeLedgerSource.commit, lifetimeLedgerSource.path)
  : null;
proofSummary = proofSummaryText === null ? null : JSON.parse(proofSummaryText);
lifetimeLedger = lifetimeLedgerText === null ? null : JSON.parse(lifetimeLedgerText);
const proofIndexCounts = deriveProofIndexCounts();
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
    source: proofSummarySource,
    method: "read historical proof-owned reviewer metrics summary controlled_validation_fire_count",
    detail: "historical controlled validation activity fires",
    tone: "green",
  }),
  validation_cases: metric({
    id: "validation_cases",
    label: "validation cases",
    value: proofMetrics.validation_case_count,
    source: proofSummarySource,
    method: "read historical proof-owned reviewer metrics summary validation_case_count",
    detail: "historical controlled validation case count",
    tone: "green",
  }),
  proof_records: metric({
    id: "proof_records",
    label: "proof records",
    value: proofIndexCounts?.proof_record_count,
    source: proofSource,
    method: "derive count of unique non-null proof_record_path values from current-authority proof status index",
    detail: "current proof-record path count",
    tone: "amber",
  }),
  proof_cards: metric({
    id: "proof_cards",
    label: "ProofCards",
    value: proofIndexCounts?.proof_card_count,
    source: proofSource,
    method: "derive count of unique non-null proof_card_path values from current-authority proof status index",
    detail: "current ProofCard path count",
    tone: "amber",
  }),
  blocked_claims: metric({
    id: "blocked_claims",
    label: "claims blocked",
    value: proofMetrics.blocked_claim_count,
    source: proofSummarySource,
    method: "read historical proof-owned reviewer metrics summary blocked_claim_count",
    detail: "historical reviewer metrics blocked-claim count",
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
    value: proofIndexCounts?.public_safe_count,
    source: proofSource,
    method: "derive zero approved public-safe entries from the current-authority proof status index; fail closed otherwise",
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
const websiteCommit = sourceByRepo["HawkinsOperations/hawkinsoperations-website"]?.repository_commit ?? null;

const publicStatus = {
  schema_version: "public-status-v0",
  generated_at: generatedAt,
  generated_by: "scripts/generate-public-status.mjs",
  generator_commit: websiteCommit,
  generator_fingerprint_sha256: sha256File(join(websiteRoot, "scripts/generate-public-status.mjs")),
  generation_mode: "generated_public_status_data_plane_v0",
  snapshot_label: "Generated public status v0 data plane",
  snapshot_class: "current_generated_rendering_snapshot",
  historical_snapshot: false,
  current_authority: false,
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
  source_repository_commit_refs: Object.fromEntries(
    sources.map((source) => [source.repo.replace("HawkinsOperations/", ""), source.repository_commit]),
  ),
  metric_list: metricList,
  metrics,
  current_metric_ids: metricList.filter((item) => item.current_authority).map((item) => item.id),
  historical_metric_ids: metricList.filter((item) => item.historical_snapshot).map((item) => item.id),
  known_gaps: [
    ...sourceUnavailable,
    {
      id: "runtime_signal_metrics_gated",
      status: "blocked",
      detail: "Runtime and signal metrics remain gated because no approved public-safe runtime evidence is published in source artifacts.",
    },
    {
      id: "hoxline_local_path_artifacts_not_published",
      status: "blocked_boundary",
      detail: "Local Hoxline execution artifacts are not copied into website public JSON; only sanitized repository-relative source identifiers are allowed.",
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
