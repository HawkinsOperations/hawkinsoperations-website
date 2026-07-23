import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const orgRoot = dirname(root);
const jsonPath = join(root, "public/data/public-status.json");
const tsPath = join(root, "src/data/generated/public-status.generated.ts");
const schemaPath = join(root, "schemas/public-status-v0.schema.json");

const failures = [];

function fail(message) {
  failures.push(message);
}

function hasForbiddenLocalPath(value) {
  if (typeof value === "string") {
    return /(?:^|[^A-Za-z])[A-Z]:[\\/]/i.test(value) || value.startsWith("file://");
  }
  if (Array.isArray(value)) return value.some(hasForbiddenLocalPath);
  if (value && typeof value === "object") return Object.values(value).some(hasForbiddenLocalPath);
  return false;
}

function runGit(dir, args) {
  try {
    return execFileSync("git", ["-c", `safe.directory=${dir.replaceAll("\\", "/")}`, "-C", dir, ...args], {
      encoding: "utf8",
    }).trim();
  } catch {
    return null;
  }
}

function sha256File(path) {
  if (!existsSync(path)) return null;
  const normalizedSource = readFileSync(path, "utf8").replace(/\r\n/g, "\n");
  return createHash("sha256").update(normalizedSource, "utf8").digest("hex");
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

const exactSourceRepos = [
  "HawkinsOperations/.github",
  "HawkinsOperations/hoxline",
  "HawkinsOperations/hawkinsoperations-detections",
  "HawkinsOperations/hawkinsoperations-validation",
  "HawkinsOperations/hawkinsoperations-platform",
  "HawkinsOperations/hawkinsoperations-proof",
  "HawkinsOperations/hawkinsoperations-website",
];

const metricContracts = {
  controls_fired: ["HawkinsOperations/hawkinsoperations-website", "src/data/governanceSaves.ts", false, true, "count governance save records excluding publicSafety PRIVATE_ONLY"],
  validation_fires: ["HawkinsOperations/hawkinsoperations-proof", "proof/records/reviewer-metrics-pipeline-v1-summary.json", true, false, "read historical proof-owned reviewer metrics summary controlled_validation_fire_count"],
  validation_cases: ["HawkinsOperations/hawkinsoperations-proof", "proof/records/reviewer-metrics-pipeline-v1-summary.json", true, false, "read historical proof-owned reviewer metrics summary validation_case_count"],
  proof_records: ["HawkinsOperations/hawkinsoperations-proof", "proof/indexes/DETECTION_PROOF_STATUS_INDEX.yml", false, true, "derive count of unique non-null proof_record_path values from current-authority proof status index"],
  proof_cards: ["HawkinsOperations/hawkinsoperations-proof", "proof/indexes/DETECTION_PROOF_STATUS_INDEX.yml", false, true, "derive count of unique non-null proof_card_path values from current-authority proof status index"],
  blocked_claims: ["HawkinsOperations/hawkinsoperations-proof", "proof/records/reviewer-metrics-pipeline-v1-summary.json", true, false, "read historical proof-owned reviewer metrics summary blocked_claim_count"],
  governed_cases: ["HawkinsOperations/hawkinsoperations-proof", "proof/records/lifetime-case-ledger-v1-public-summary.json", true, false, "read proof-owned lifetime case ledger public summary total_cases"],
  closed_case_count: ["HawkinsOperations/hawkinsoperations-proof", "proof/records/lifetime-case-ledger-v1-public-summary.json", true, false, "read proof-owned lifetime case ledger public summary closed_case_count"],
  public_safe_count: ["HawkinsOperations/hawkinsoperations-proof", "proof/indexes/DETECTION_PROOF_STATUS_INDEX.yml", false, true, "derive zero approved public-safe entries from the current-authority proof status index; fail closed otherwise"],
};

function localRepoPath(repo) {
  const name = repo?.replace("HawkinsOperations/", "");
  return name === "hawkinsoperations-website" ? root : join(orgRoot, name ?? "");
}

function normalizedRepoPath(value, issues) {
  const parts = value.replaceAll("\\", "/").split("/");
  if (!value || value.startsWith("/") || parts.includes("..")) {
    issues.push(`unsafe repository-relative path: ${value}`);
    return null;
  }
  return parts.filter((part) => part && part !== ".").join("/").toLowerCase();
}

function deriveCurrentProofCounts(repoDir, commit, sourcePath, issues) {
  const text = committedText(repoDir, commit, sourcePath);
  if (text === null) {
    issues.push("proof_records source index is missing from its stated revision.");
    return null;
  }
  if (!/^\s*current_authority:\s*true\s*$/m.test(text) || /^\s*historical_snapshot:\s*true\s*$/m.test(text)) {
    issues.push("proof_records source must declare current_authority=true and historical_snapshot=false.");
    return null;
  }
  const records = [...text.matchAll(/^\s+proof_record_path:\s*([^#\r\n]+?)\s*$/gm)]
    .map((match) => match[1].trim())
    .filter((value) => value !== "null" && value !== "~");
  const cards = [...text.matchAll(/^\s+proof_card_path:\s*([^#\r\n]+?)\s*$/gm)]
    .map((match) => match[1].trim())
    .filter((value) => value !== "null" && value !== "~");
  const normalizedRecords = records.map((path) => normalizedRepoPath(path, issues)).filter(Boolean);
  const normalizedCards = cards.map((path) => normalizedRepoPath(path, issues)).filter(Boolean);
  if (new Set(normalizedRecords).size !== records.length) issues.push("proof status index contains duplicate or aliased proof_record_path values.");
  if (new Set(normalizedCards).size !== cards.length) issues.push("proof status index contains duplicate or aliased proof_card_path values.");
  for (const path of [...records, ...cards]) {
    if (committedText(repoDir, commit, path) === null) {
      issues.push(`proof status index contains dangling path: ${path}`);
    }
  }
  return {
    proof_record_count: new Set(normalizedRecords).size,
    proof_card_count: new Set(normalizedCards).size,
    public_safe_count: [...text.matchAll(/^\s+public_safe_status:\s*PUBLIC_SAFE_APPROVED\s*$/gm)].length,
  };
}

function semanticIssues(candidate, { now = new Date(), checkLocalSources = true } = {}) {
  const issues = [];
  const generatedAt = new Date(candidate.generated_at).getTime();
  const ageHours = Math.floor((now.getTime() - generatedAt) / 3_600_000);
  if (!Number.isFinite(generatedAt) || ageHours < 0) issues.push("generated_at must be a valid non-future timestamp.");
  const sourceUnavailable = candidate.sources?.some((source) => !source.available || !source.commit);
  const metricUnavailable = candidate.metric_list?.some((metric) => metric.freshness_status === "source_unavailable");
  const metricUnverified = candidate.metric_list?.some((metric) => metric.freshness_status === "unverified");
  const expectedFreshness = sourceUnavailable || metricUnavailable
    ? "source_unavailable"
    : metricUnverified
      ? "unverified"
    : ageHours > candidate.freshness?.max_age_hours
      ? "stale"
      : "fresh";
  if (candidate.freshness?.status !== expectedFreshness) {
    issues.push(`freshness.status=${candidate.freshness?.status} contradicts computed ${expectedFreshness} at age ${ageHours} hours.`);
  }
  if (candidate.historical_snapshot !== false || candidate.current_authority !== false) {
    issues.push("website snapshot must declare historical_snapshot=false and current_authority=false.");
  }
  const declaredRepos = (candidate.sources ?? []).map((source) => source.repo);
  if (declaredRepos.length !== exactSourceRepos.length || new Set(declaredRepos).size !== exactSourceRepos.length) {
    issues.push("sources must contain exactly seven unique repository owners.");
  }
  if (exactSourceRepos.some((repo) => !declaredRepos.includes(repo)) || declaredRepos.some((repo) => !exactSourceRepos.includes(repo))) {
    issues.push("sources repository owners must equal the exact HawkinsOperations seven-repository set.");
  }
  for (const source of candidate.sources ?? []) {
    const key = source.repo.replace("HawkinsOperations/", "");
    if (candidate.source_commit_refs?.[key] !== source.commit ||
        candidate.source_repository_commit_refs?.[key] !== source.repository_commit) {
      issues.push(`source revision maps disagree with sources entry for ${source.repo}.`);
    }
  }
  const sourceKeys = exactSourceRepos.map((repo) => repo.replace("HawkinsOperations/", ""));
  for (const revisionMap of [candidate.source_commit_refs, candidate.source_repository_commit_refs]) {
    const keys = Object.keys(revisionMap ?? {});
    if (keys.length !== sourceKeys.length || keys.some((key) => !sourceKeys.includes(key))) {
      issues.push("source revision maps must contain exactly the seven canonical repository keys.");
    }
  }
  const expectedHistorical = new Set(candidate.historical_metric_ids ?? []);
  const expectedCurrent = new Set(candidate.current_metric_ids ?? []);
  const metricIds = new Set((candidate.metric_list ?? []).map((metric) => metric.id));
  if ([...expectedHistorical].some((id) => expectedCurrent.has(id))) {
    issues.push("current_metric_ids and historical_metric_ids must be disjoint.");
  }
  if ([...metricIds].some((id) => !expectedHistorical.has(id) && !expectedCurrent.has(id)) ||
      [...expectedHistorical, ...expectedCurrent].some((id) => !metricIds.has(id))) {
    issues.push("current and historical metric IDs must form a complete exact partition of metric_list.");
  }
  for (const metric of candidate.metric_list ?? []) {
    if (JSON.stringify(candidate.metrics?.[metric.id]) !== JSON.stringify(metric)) {
      issues.push(`metrics.${metric.id} object disagrees with its metric_list entry.`);
    }
    const contract = metricContracts[metric.id];
    if (!contract || metric.source_repo !== contract[0] || metric.source_path !== contract[1]) {
      issues.push(`metrics.${metric.id} owner/path does not match its exact authority contract.`);
    } else if (metric.historical_snapshot !== contract[2] || metric.current_authority !== contract[3]) {
      issues.push(`metrics.${metric.id} current/historical flags do not match its exact authority contract.`);
    } else if (metric.method !== contract[4]) {
      issues.push(`metrics.${metric.id} method does not match its exact derivation contract.`);
    }
    if (metric.historical_snapshot !== expectedHistorical.has(metric.id)) {
      issues.push(`metrics.${metric.id} historical classification disagrees with historical_metric_ids.`);
    }
    if (metric.current_authority !== expectedCurrent.has(metric.id)) {
      issues.push(`metrics.${metric.id} current-authority classification disagrees with current_metric_ids.`);
    }
    const expectedMetricFreshness = ["source_unavailable", "unverified"].includes(metric.freshness_status)
      ? metric.freshness_status
      : ageHours > candidate.freshness?.max_age_hours
        ? "stale"
        : "fresh";
    if (metric.freshness_status !== expectedMetricFreshness) {
      issues.push(`metrics.${metric.id}.freshness_status contradicts snapshot age.`);
    }
  }
  if (!checkLocalSources) return issues;
  const sourceRecords = [...(candidate.sources ?? []), ...(candidate.metric_list ?? [])];
  for (const source of sourceRecords) {
    if (!source.source_repo && !source.repo) continue;
    const repo = source.source_repo ?? source.repo;
    const path = source.source_path ?? source.path;
    const commit = source.source_commit ?? source.commit;
    const fingerprint = source.source_fingerprint_sha256;
    const repoDir = localRepoPath(repo);
    const fullPath = join(repoDir, path);
    if (!existsSync(fullPath)) {
      issues.push(`${repo}/${path} is missing.`);
      continue;
    }
    const currentPathCommit = runGit(repoDir, ["log", "-1", "--format=%H", "--", path]);
    const currentRepositoryCommit = runGit(repoDir, ["rev-parse", "HEAD"]);
    const repositoryCommit = source.source_repository_commit ?? source.repository_commit;
    const directParent = runGit(repoDir, ["rev-parse", "HEAD^"]);
    const boundedHoxlineSnapshotCycle = repo === "HawkinsOperations/hoxline" &&
      repositoryCommit === directParent && commit === currentPathCommit;
    if (commit !== currentPathCommit) issues.push(`${repo}/${path} records ${commit} but current source-path revision is ${currentPathCommit}.`);
    if (repo !== "HawkinsOperations/hawkinsoperations-website" && repositoryCommit !== currentRepositoryCommit && !boundedHoxlineSnapshotCycle) {
      issues.push(`${repo}/${path} records repository revision ${repositoryCommit} but current HEAD is ${currentRepositoryCommit}.`);
    }
    const revisionText = committedText(repoDir, commit, path);
    if (!fingerprint || fingerprint !== sha256Text(revisionText)) {
      issues.push(`${repo}/${path} source fingerprint does not match its stated committed revision.`);
    }
  }
  const proofMetric = candidate.metrics?.proof_records;
  const proofCardMetric = candidate.metrics?.proof_cards;
  if (proofMetric?.source_path !== "proof/indexes/DETECTION_PROOF_STATUS_INDEX.yml") {
    issues.push("proof_records must use the proof-owned current status index.");
  } else {
    if (proofMetric.source_repo !== "HawkinsOperations/hawkinsoperations-proof" || proofMetric.current_authority !== true || proofMetric.historical_snapshot !== false) {
      issues.push("proof_records owner and current-authority classification must match the proof-owned current index.");
    }
    const proofDir = localRepoPath(proofMetric.source_repo);
    const counts = deriveCurrentProofCounts(proofDir, proofMetric.source_commit, proofMetric.source_path, issues);
    if (counts && proofMetric.value !== counts.proof_record_count) issues.push("proof_records value disagrees with current proof status index.");
    if (counts && proofCardMetric?.value !== counts.proof_card_count) issues.push("proof_cards value disagrees with current proof status index.");
    if (counts && candidate.metrics?.public_safe_count?.value !== counts.public_safe_count) {
      issues.push("public_safe_count value disagrees with current proof status index.");
    }
  }
  return [...new Set(issues)];
}

for (const path of [jsonPath, tsPath, schemaPath]) {
  if (!existsSync(path)) fail(`Missing required public-status file: ${path}`);
}

const status = existsSync(jsonPath) ? JSON.parse(readFileSync(jsonPath, "utf8")) : null;
const tsSource = existsSync(tsPath) ? readFileSync(tsPath, "utf8") : "";

if (status) {
  if (status.schema_version !== "public-status-v0") fail("schema_version must be public-status-v0.");
  if (status.generated_by !== "scripts/generate-public-status.mjs") fail("generated_by must point to the generator script.");
  if (!status.generator_commit) fail("generator_commit is required.");
  if (status.generator_fingerprint_sha256 !== sha256File(join(root, "scripts/generate-public-status.mjs"))) {
    fail("generator_fingerprint_sha256 must match the current generator source.");
  }
  if (status.generation_mode !== "generated_public_status_data_plane_v0") fail("generation_mode must identify data plane v0.");
  if (status.freshness?.max_age_hours !== 336) fail("freshness.max_age_hours must be 336.");
  if (!["fresh", "stale", "source_unavailable", "unverified"].includes(status.freshness?.status)) {
    fail("freshness.status must be fresh, stale, source_unavailable, or unverified.");
  }
  if (!Array.isArray(status.sources) || status.sources.length < 7) fail("sources[] must enumerate the repo authority surfaces.");
  if (!Array.isArray(status.metric_list) || status.metric_list.length < 8) fail("metric_list[] must enumerate generated metrics.");
  if (!status.metrics || typeof status.metrics !== "object") fail("metrics object is required for website render compatibility.");
  if (hasForbiddenLocalPath(status)) fail("public-status JSON must not publish absolute local paths.");

  const requiredMetrics = [
    "controls_fired",
    "validation_fires",
    "validation_cases",
    "proof_records",
    "proof_cards",
    "blocked_claims",
    "governed_cases",
    "closed_case_count",
    "public_safe_count",
  ];
  for (const key of requiredMetrics) {
    const metric = status.metrics?.[key];
    if (!metric) {
      fail(`metrics.${key} is required.`);
      continue;
    }
    for (const field of [
      "id",
      "label",
      "unit",
      "authority",
      "source_repo",
      "source_path",
      "source_repository_commit",
      "source_resolved_ref",
      "source_fingerprint_sha256",
      "method",
      "generated_at",
      "freshness_status",
      "historical_snapshot",
      "current_authority",
      "proof_ceiling",
      "claim_status",
      "not_claiming",
      "display_value",
      "display_label",
      "source_label",
      "source_href",
    ]) {
      if (metric[field] === undefined || metric[field] === null || metric[field] === "") {
        fail(`metrics.${key}.${field} is required.`);
      }
    }
    if (typeof metric.value !== "number" && metric.freshness_status === "fresh") {
      fail(`metrics.${key}.value must be numeric when fresh.`);
    }
    if (!metric.source_commit && !["source_unavailable", "unverified"].includes(metric.freshness_status)) {
      fail(`metrics.${key}.source_commit is required unless unavailable or unverified.`);
    }
    if (!Array.isArray(metric.not_claiming) || !metric.not_claiming.includes("runtime proof")) {
      fail(`metrics.${key}.not_claiming must include runtime proof boundary.`);
    }
    if (/runtime|signal|production|public-safe approved|customer deployment/i.test(metric.claim_status)) {
      fail(`metrics.${key}.claim_status must not promote runtime/signal/production/public-safe/customer claims.`);
    }
  }

  if (status.metrics?.public_safe_count?.value !== 0) fail("public_safe_count must remain zero without approved public-safe proof.");
  if (status.public_safe?.value !== false) fail("public_safe.value must remain false.");
  if (status.website_rendering_boundary?.statement !== "Website rendering is not proof.") {
    fail("website rendering boundary must remain explicit.");
  }
  if (!status.proof_ceiling?.detail?.includes("Does not prove runtime")) fail("proof ceiling must preserve runtime/signal boundary.");
  if (!Array.isArray(status.known_gaps) || status.known_gaps.length === 0) fail("known_gaps[] is required.");
  for (const issue of semanticIssues(status)) fail(issue);
  if (!tsSource.includes(JSON.stringify(status, null, 2))) {
    fail("generated TypeScript snapshot must reproduce public-status JSON exactly.");
  }
}

for (const term of [
  "GENERATED_PUBLIC_STATUS_V0",
  "GENERATED_PUBLIC_STATUS_V0_SNAPSHOT",
  "generatedStatusFreshnessLabel",
  "isGeneratedStatusStale",
  "metricDisplay",
]) {
  if (!tsSource.includes(term)) fail(`generated TypeScript status must include ${term}.`);
}

const ownerSelfTestOnly = process.argv.includes("--owner-self-test-only");
if ((process.argv.includes("--self-test") || ownerSelfTestOnly) && status) {
  if (ownerSelfTestOnly) failures.length = 0;
  const hostileCases = [
    {
      name: "stale snapshot labeled fresh",
      mutate: (value) => {
        value.generated_at = "2000-01-01T00:00:00.000Z";
        value.freshness.status = "fresh";
      },
      expected: "contradicts computed stale",
    },
    {
      name: "future snapshot labeled fresh",
      mutate: (value) => {
        value.generated_at = "2999-01-01T00:00:00.000Z";
      },
      expected: "non-future timestamp",
    },
    {
      name: "forged proof count",
      mutate: (value) => {
        value.metrics.proof_records.value += 1;
      },
      expected: "proof_records value disagrees",
      checkLocalSources: true,
    },
    {
      name: "absolute path leakage",
      mutate: (value) => {
        value.sources[0].path = "C:\\Users\\example\\private.txt";
      },
      expected: "absolute path",
      customCheck: (value) => (hasForbiddenLocalPath(value) ? ["absolute path"] : []),
    },
    {
      name: "unauthorized public-safe promotion",
      mutate: (value) => {
        value.public_safe.value = true;
        value.metrics.public_safe_count.value = 1;
      },
      expected: "public_safe_count value disagrees",
      checkLocalSources: true,
    },
    {
      name: "source-owner override",
      mutate: (value) => {
        value.metrics.proof_cards.source_repo = "HawkinsOperations/hawkinsoperations-website";
        value.metrics.proof_cards.source_path = "package.json";
        const listMetric = value.metric_list.find((metric) => metric.id === "proof_cards");
        listMetric.source_repo = value.metrics.proof_cards.source_repo;
        listMetric.source_path = value.metrics.proof_cards.source_path;
      },
      expected: "owner/path does not match",
    },
    {
      name: "duplicate seven-repository source bypass",
      mutate: (value) => {
        value.sources[1] = structuredClone(value.sources[0]);
      },
      expected: "exactly seven unique",
    },
    {
      name: "current historical partition overlap",
      mutate: (value) => {
        value.historical_metric_ids.push(value.current_metric_ids[0]);
      },
      expected: "must be disjoint",
    },
    {
      name: "dirty worktree fingerprint substitution",
      mutate: (value) => {
        const hostileFingerprint = sha256Text("uncommitted worktree content");
        value.metrics.proof_records.source_fingerprint_sha256 = hostileFingerprint;
        value.metric_list.find((metric) => metric.id === "proof_records").source_fingerprint_sha256 = hostileFingerprint;
      },
      expected: "stated committed revision",
      checkLocalSources: true,
    },
    {
      name: "unreachable repository revision",
      mutate: (value) => {
        const source = value.sources.find((item) => item.repo === "HawkinsOperations/hoxline");
        source.repository_commit = "f".repeat(40);
        value.source_repository_commit_refs.hoxline = source.repository_commit;
      },
      expected: "current HEAD",
      checkLocalSources: true,
    },
  ];
  const selectedHostileCases = ownerSelfTestOnly
    ? hostileCases.filter((hostile) => [
        "future snapshot labeled fresh",
        "absolute path leakage",
        "source-owner override",
        "duplicate seven-repository source bypass",
        "current historical partition overlap",
      ].includes(hostile.name))
    : hostileCases;
  for (const hostile of selectedHostileCases) {
    const value = structuredClone(status);
    hostile.mutate(value);
    const issues = hostile.customCheck
      ? hostile.customCheck(value)
      : semanticIssues(value, { checkLocalSources: hostile.checkLocalSources ?? false });
    if (!issues.some((issue) => issue.includes(hostile.expected))) {
      fail(`self-test did not reject ${hostile.name}.`);
    }
  }
}

if (failures.length > 0) {
  console.error(`Public status verification failed:\n${failures.map((line) => `- ${line}`).join("\n")}`);
  process.exit(1);
}

console.log("Public status verification passed.");
