import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const orgRoot = dirname(root);
const jsonPath = join(root, "public/data/public-status.json");
const tsPath = join(root, "src/data/generated/public-status.generated.ts");
const schemaPath = join(root, "schemas/public-status-v0.schema.json");
const manifestPath = join(root, "config/public-status-source-manifest-v1.json");
const failures = [];

const sourceContracts = {
  "HawkinsOperations/.github": {
    path: "architecture/REPO_AUTHORITY_MAP.md",
    authorityRole: "orchestration",
    consumerOnly: false,
    currentAuthority: true,
  },
  "HawkinsOperations/hoxline": {
    path: "schemas/case-growth-index-v0.schema.json",
    authorityRole: "review consumer",
    consumerOnly: true,
    currentAuthority: false,
  },
  "HawkinsOperations/hawkinsoperations-detections": {
    path: "detections/DETECTION_PROMOTION_MATRIX.yml",
    authorityRole: "detection source truth",
    consumerOnly: false,
    currentAuthority: true,
  },
  "HawkinsOperations/hawkinsoperations-validation": {
    path: "activity/detection-activity-ledger-v1.json",
    authorityRole: "controlled validation truth",
    consumerOnly: false,
    currentAuthority: true,
  },
  "HawkinsOperations/hawkinsoperations-platform": {
    path: "contracts/reviewer-metrics-pipeline-v1-state.json",
    authorityRole: "contract and mechanical truth",
    consumerOnly: false,
    currentAuthority: true,
  },
  "HawkinsOperations/hawkinsoperations-proof": {
    path: "proof/indexes/DETECTION_PROOF_STATUS_INDEX.yml",
    authorityRole: "proof and claim authority",
    consumerOnly: false,
    currentAuthority: true,
  },
  "HawkinsOperations/hawkinsoperations-website": {
    path: "schemas/public-status-v0.schema.json",
    authorityRole: "rendering consumer",
    consumerOnly: true,
    currentAuthority: false,
  },
};

const exactSourceRepos = Object.keys(sourceContracts);
const metricContracts = {
  controls_fired: {
    repo: "HawkinsOperations/hawkinsoperations-website",
    path: "src/data/governanceSaves.ts",
    historical: false,
    current: false,
    consumerOnly: true,
    method: "count source-controlled public governance-save entries excluding publicSafety PRIVATE_ONLY as render-only website content",
  },
  validation_fires: {
    repo: "HawkinsOperations/hawkinsoperations-proof",
    path: "proof/records/reviewer-metrics-pipeline-v1-summary.json",
    historical: true,
    current: false,
    consumerOnly: false,
    method: "read historical proof-owned reviewer metrics summary controlled_validation_fire_count",
  },
  validation_cases: {
    repo: "HawkinsOperations/hawkinsoperations-proof",
    path: "proof/records/reviewer-metrics-pipeline-v1-summary.json",
    historical: true,
    current: false,
    consumerOnly: false,
    method: "read historical proof-owned reviewer metrics summary validation_case_count",
  },
  proof_records: {
    repo: "HawkinsOperations/hawkinsoperations-proof",
    path: "proof/indexes/DETECTION_PROOF_STATUS_INDEX.yml",
    historical: false,
    current: true,
    consumerOnly: false,
    method: "derive count of unique non-null proof_record_path values from current-authority proof status index",
  },
  proof_cards: {
    repo: "HawkinsOperations/hawkinsoperations-proof",
    path: "proof/indexes/DETECTION_PROOF_STATUS_INDEX.yml",
    historical: false,
    current: true,
    consumerOnly: false,
    method: "derive count of unique non-null proof_card_path values from current-authority proof status index",
  },
  blocked_claims: {
    repo: "HawkinsOperations/hawkinsoperations-proof",
    path: "proof/records/reviewer-metrics-pipeline-v1-summary.json",
    historical: true,
    current: false,
    consumerOnly: false,
    method: "read historical proof-owned reviewer metrics summary blocked_claim_count",
  },
  governed_cases: {
    repo: "HawkinsOperations/hawkinsoperations-proof",
    path: "proof/records/lifetime-case-ledger-v1-public-summary.json",
    historical: true,
    current: false,
    consumerOnly: false,
    method: "read proof-owned lifetime case ledger public summary total_cases",
  },
  closed_case_count: {
    repo: "HawkinsOperations/hawkinsoperations-proof",
    path: "proof/records/lifetime-case-ledger-v1-public-summary.json",
    historical: true,
    current: false,
    consumerOnly: false,
    method: "read proof-owned lifetime case ledger public summary closed_case_count",
  },
  public_safe_count: {
    repo: "HawkinsOperations/hawkinsoperations-proof",
    path: "proof/indexes/DETECTION_PROOF_STATUS_INDEX.yml",
    historical: false,
    current: true,
    consumerOnly: false,
    method: "derive zero approved public-safe entries from the current-authority proof status index; fail closed otherwise",
  },
};

function fail(message) {
  failures.push(message);
}

function runGit(dir, args) {
  try {
    return execFileSync("git", ["-c", `safe.directory=${dir.replaceAll("\\", "/")}`, "-C", dir, ...args], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch {
    return null;
  }
}

function sha256Text(value) {
  return value === null ? null : createHash("sha256").update(value, "utf8").digest("hex");
}

function canonicalJson(value) {
  if (Array.isArray(value)) return value.map(canonicalJson);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalJson(value[key])]));
  }
  return value;
}

function normalizeSemanticText(value, path = "") {
  const normalizedEol = value.replace(/\r\n?/g, "\n");
  if (path.endsWith(".json")) {
    return `${JSON.stringify(canonicalJson(JSON.parse(normalizedEol)))}\n`;
  }
  return `${normalizedEol.split("\n").map((line) => line.replace(/[ \t]+$/g, "")).join("\n").replace(/\n*$/, "")}\n`;
}

function semanticFingerprint(value, path) {
  return sha256Text(normalizeSemanticText(value, path));
}

function committedText(dir, revision, path) {
  if (!revision) return null;
  try {
    return execFileSync(
      "git",
      ["-c", `safe.directory=${dir.replaceAll("\\", "/")}`, "-C", dir, "show", `${revision}:${path}`],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
    );
  } catch {
    return null;
  }
}

function localRepoPath(repo) {
  if (!exactSourceRepos.includes(repo)) return null;
  const name = repo?.replace("HawkinsOperations/", "");
  return name === "hawkinsoperations-website" ? root : join(orgRoot, name ?? "");
}

function normalizeOrigin(value) {
  return value
    ?.trim()
    .replace(/^git@github\.com:/i, "https://github.com/")
    .replace(/^ssh:\/\/git@github\.com\//i, "https://github.com/")
    .replace(/\/+$/, "")
    .toLowerCase();
}

function expectedOrigin(repo) {
  return `https://github.com/${repo}.git`;
}

function decodeRepeated(value) {
  let current = value;
  for (let index = 0; index < 4; index += 1) {
    try {
      const decoded = decodeURIComponent(current);
      if (decoded === current) break;
      current = decoded;
    } catch {
      break;
    }
  }
  return current;
}

function pathIssue(value) {
  if (typeof value !== "string") return null;
  const decoded = decodeRepeated(value);
  const slash = decoded.replaceAll("\\", "/");
  if (decoded.includes("\0")) return "NUL byte";
  if (/(?:^|[^A-Za-z])[a-z]:[\\/]/i.test(decoded)) return "Windows drive absolute path";
  if (/(?:^|\s)(?:\\\\|\/\/)[^/\\]/.test(decoded)) return "UNC path";
  if (/^file:\/\//i.test(decoded)) return "file URI";
  if (/^\/(?:home|users|etc|var|tmp|opt|root|mnt|private)(?:\/|$)/i.test(slash)) return "POSIX local absolute path";
  if (/(?:^|\/)\.\.(?:\/|$)/.test(slash)) return "path traversal";
  if (/%(?:2e|2f|5c|25)/i.test(value)) return "encoded path control";
  if (value.includes("\\") && value.includes("/")) return "mixed path separators";
  return null;
}

const promotionTokens = [
  "RUNTIME_ACTIVE",
  "SIGNAL_OBSERVED",
  "PUBLIC_SAFE_APPROVED",
  "PRODUCTION_READY",
  "CUSTOMER_DEPLOYED",
  "SOCAAS_DEPLOYED",
  "AI_APPROVED",
  "ANALYST_APPROVED",
  "FINAL_AUTHORIZATION",
  "CASE_CLOSED",
];
const privateTokens = ["PRIVATE_RAW", "PRIVATE_EVIDENCE", "RAW_WAZUH_ALERT", "MUFG", "CUSTOMER_IDENTIFIER"];
const authorityKeyPattern = /(?:ai|analyst).*(?:authority|approval)|final.*authorization|case.*closure|public.*safe.*approved|runtime.*active|signal.*observed/i;
const explicitlyBoundedKeys = new Set([
  "proof_ceiling",
  "not_claiming",
  "does_not_prove",
  "blocked_reason",
  "known_gaps",
  "detail",
  "statement",
  "no_proof_promotion_statement",
]);

function recursiveSecurityIssues(value, path = []) {
  const issues = [];
  const key = path.at(-1) ?? "";
  if (typeof value === "string") {
    const pathProblem = pathIssue(value);
    if (pathProblem) issues.push(`${path.join(".") || "<root>"} contains ${pathProblem}.`);
    if (!path.some((part) => explicitlyBoundedKeys.has(part))) {
      for (const token of promotionTokens) {
        if (value.toUpperCase().includes(token)) issues.push(`${path.join(".")} contains unauthorized promotion token ${token}.`);
      }
      for (const token of privateTokens) {
        if (value.toUpperCase().includes(token)) issues.push(`${path.join(".")} contains private marker ${token}.`);
      }
    }
    return issues;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => issues.push(...recursiveSecurityIssues(item, [...path, String(index)])));
    return issues;
  }
  if (value && typeof value === "object") {
    for (const [childKey, childValue] of Object.entries(value)) {
      if (
        authorityKeyPattern.test(childKey) &&
        !["current_authority", "authority", "authority_owner", "authority_role", "source_authority_owner", "source_authority_role"].includes(childKey) &&
        (childValue === true || (typeof childValue === "string" && !/^(?:false|blocked|none|not[_ -]?approved)$/i.test(childValue)))
      ) {
        issues.push(`${[...path, childKey].join(".")} attempts authority promotion.`);
      }
      issues.push(...recursiveSecurityIssues(childValue, [...path, childKey]));
    }
  }
  return issues;
}

function schemaNode(schema, documentSchema) {
  if (!schema?.$ref) return schema;
  if (!schema.$ref.startsWith("#/")) return null;
  return schema.$ref.slice(2).split("/").reduce((value, part) => value?.[part.replaceAll("~1", "/").replaceAll("~0", "~")], documentSchema);
}

function matchesType(value, type) {
  if (type === "null") return value === null;
  if (type === "array") return Array.isArray(value);
  if (type === "object") return value !== null && typeof value === "object" && !Array.isArray(value);
  if (type === "integer") return Number.isInteger(value);
  if (type === "number") return typeof value === "number" && Number.isFinite(value);
  return typeof value === type;
}

function schemaIssues(value, rawSchema, documentSchema, path = "$") {
  const schema = schemaNode(rawSchema, documentSchema);
  if (!schema) return [`${path}: unresolved or external schema reference.`];
  const issues = [];
  const types = schema.type === undefined ? [] : Array.isArray(schema.type) ? schema.type : [schema.type];
  if (types.length > 0 && !types.some((type) => matchesType(value, type))) {
    return [`${path}: expected type ${types.join("|")}.`];
  }
  if (schema.const !== undefined && JSON.stringify(value) !== JSON.stringify(schema.const)) issues.push(`${path}: const mismatch.`);
  if (schema.enum && !schema.enum.some((item) => JSON.stringify(item) === JSON.stringify(value))) issues.push(`${path}: unsupported enum value.`);
  if (schema.pattern && typeof value === "string" && !new RegExp(schema.pattern).test(value)) issues.push(`${path}: pattern mismatch.`);
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) issues.push(`${path}: too few items.`);
    if (schema.maxItems !== undefined && value.length > schema.maxItems) issues.push(`${path}: too many items.`);
    if (schema.uniqueItems && new Set(value.map((item) => JSON.stringify(item))).size !== value.length) issues.push(`${path}: duplicate items.`);
    value.forEach((item, index) => issues.push(...schemaIssues(item, schema.items ?? {}, documentSchema, `${path}[${index}]`)));
  } else if (value && typeof value === "object") {
    for (const required of schema.required ?? []) {
      if (!(required in value)) issues.push(`${path}.${required}: required property missing.`);
    }
    for (const [key, child] of Object.entries(value)) {
      if (schema.properties?.[key]) {
        issues.push(...schemaIssues(child, schema.properties[key], documentSchema, `${path}.${key}`));
      } else if (schema.additionalProperties === false) {
        issues.push(`${path}.${key}: unknown property rejected.`);
      } else if (schema.additionalProperties && typeof schema.additionalProperties === "object") {
        issues.push(...schemaIssues(child, schema.additionalProperties, documentSchema, `${path}.${key}`));
      }
    }
  }
  return issues;
}

function normalizedRepoPath(value, issues) {
  if (typeof value !== "string" || pathIssue(value)) {
    issues.push(`unsafe repository-relative path: ${String(value)}`);
    return null;
  }
  return value.replaceAll("\\", "/").split("/").filter((part) => part && part !== ".").join("/").toLowerCase();
}

function deriveCurrentProofCounts(repoDir, revision, sourcePath, issues) {
  const text = committedText(repoDir, revision, sourcePath);
  if (text === null) {
    issues.push("proof_records source index is missing from current checked source tree.");
    return null;
  }
  if (!/^\s*current_authority:\s*true\s*$/m.test(text) || /^\s*historical_snapshot:\s*true\s*$/m.test(text)) {
    issues.push("proof_records source must declare current_authority=true and historical_snapshot=false.");
    return null;
  }
  const records = [...text.matchAll(/^\s+proof_record_path:\s*([^#\r\n]+?)\s*$/gm)]
    .map((match) => match[1].trim()).filter((item) => item !== "null" && item !== "~");
  const cards = [...text.matchAll(/^\s+proof_card_path:\s*([^#\r\n]+?)\s*$/gm)]
    .map((match) => match[1].trim()).filter((item) => item !== "null" && item !== "~");
  const normalizedRecords = records.map((path) => normalizedRepoPath(path, issues)).filter(Boolean);
  const normalizedCards = cards.map((path) => normalizedRepoPath(path, issues)).filter(Boolean);
  if (new Set(normalizedRecords).size !== records.length) issues.push("proof status index contains duplicate or aliased proof_record_path values.");
  if (new Set(normalizedCards).size !== cards.length) issues.push("proof status index contains duplicate or aliased proof_card_path values.");
  for (const path of [...records, ...cards]) {
    if (committedText(repoDir, revision, path) === null) issues.push(`proof status index contains dangling path: ${path}`);
  }
  return {
    proof_record_count: normalizedRecords.length,
    proof_card_count: normalizedCards.length,
    public_safe_count: [...text.matchAll(/^\s+public_safe_status:\s*PUBLIC_SAFE_APPROVED\s*$/gm)].length,
  };
}

function verifyContentIdentity(record, repo, path, issues, { reviewedManifestBound = false } = {}) {
  const repoDir = localRepoPath(repo);
  if (!repoDir) {
    issues.push(`${String(repo)}: non-canonical repository owner rejected before filesystem access.`);
    return;
  }
  if (!existsSync(repoDir)) {
    issues.push(`${repo}: required sibling checkout is missing.`);
    return;
  }
  const origin = runGit(repoDir, ["remote", "get-url", "origin"]);
  if (normalizeOrigin(origin) !== normalizeOrigin(expectedOrigin(repo))) issues.push(`${repo}: canonical repository origin mismatch.`);
  const currentHead = runGit(repoDir, ["rev-parse", "HEAD"]);
  if (!currentHead) {
    issues.push(`${repo}: current checked HEAD is unavailable.`);
    return;
  }
  if (record.current_observed_head_sha !== record.source_observed_head_sha) {
    issues.push(`${repo}/${path}: recorded observed-head fields disagree.`);
  }
  if (!/^[a-f0-9]{40}$/.test(record.source_observed_head_sha ?? "")) {
    issues.push(`${repo}/${path}: source_observed_head_sha must be an immutable commit.`);
    return;
  }
  if (record.source_observation_kind !== "reviewed_immutable_commit") {
    issues.push(`${repo}/${path}: unsupported source observation kind.`);
  }
  if (runGit(repoDir, ["cat-file", "-t", record.source_observed_head_sha]) !== "commit") {
    issues.push(`${repo}/${path}: recorded source revision is unreachable.`);
    return;
  }
  if (
    runGit(repoDir, ["merge-base", "--is-ancestor", record.source_observed_head_sha, currentHead]) === null &&
    !reviewedManifestBound &&
    repo !== "HawkinsOperations/hawkinsoperations-website"
  ) {
    issues.push(`${repo}/${path}: recorded source revision is not reachable from current checked branch.`);
  }
  const currentBlob = runGit(repoDir, ["rev-parse", `${currentHead}:${path}`]);
  const observedBlob = runGit(repoDir, ["rev-parse", `${record.source_observed_head_sha}:${path}`]);
  if (!currentBlob) {
    issues.push(`${repo}/${path}: authoritative path is missing from current checked tree.`);
    return;
  }
  if (record.authoritative_git_blob_sha !== currentBlob || observedBlob !== currentBlob) {
    issues.push(`${repo}/${path}: authoritative Git blob does not equal the blob in the checked current tree.`);
  }
  const currentText = committedText(repoDir, currentHead, path);
  const expectedFingerprint = currentText === null ? null : semanticFingerprint(currentText, path);
  if (record.authoritative_content_fingerprint !== expectedFingerprint || record.source_fingerprint_sha256 !== expectedFingerprint) {
    issues.push(`${repo}/${path}: normalized semantic fingerprint does not match current authoritative content.`);
  }
  const expectedCommitTime = runGit(repoDir, ["show", "-s", "--format=%cI", record.source_observed_head_sha]);
  if (record.freshness_observation?.source_commit_time !== expectedCommitTime) {
    issues.push(`${repo}/${path}: freshness source_commit_time must come from the selected immutable source revision.`);
  }
  const trackedPathDirty = runGit(repoDir, ["diff", "--quiet", "HEAD", "--", path]) === null;
  if (trackedPathDirty) issues.push(`${repo}/${path}: dirty authoritative source path cannot be accepted.`);
}

function semanticIssues(candidate, { now = new Date(), checkLocalSources = true, schema = null, manifest = null } = {}) {
  const issues = [];
  if (schema) issues.push(...schemaIssues(candidate, schema, schema));
  issues.push(...recursiveSecurityIssues(candidate));
  const generatedAt = new Date(candidate.generated_at).getTime();
  const ageHours = Math.floor((now.getTime() - generatedAt) / 3_600_000);
  if (!Number.isFinite(generatedAt) || ageHours < 0) issues.push("generated_at must be a valid non-future timestamp.");
  const sourceUnavailable = candidate.sources?.some((source) => !source.available);
  const expectedFreshness = sourceUnavailable
    ? "source_unavailable"
    : ageHours > candidate.freshness?.max_age_hours ? "stale" : "fresh";
  if (candidate.freshness?.status !== expectedFreshness) {
    issues.push(`freshness.status=${candidate.freshness?.status} contradicts computed ${expectedFreshness} at age ${ageHours} hours.`);
  }
  if (candidate.historical_snapshot !== false || candidate.current_authority !== false) {
    issues.push("website snapshot must be a non-authoritative current rendering snapshot.");
  }
  const declaredRepos = (candidate.sources ?? []).map((source) => source.repo);
  if (
    declaredRepos.length !== exactSourceRepos.length ||
    new Set(declaredRepos.map((repo) => repo.toLowerCase())).size !== exactSourceRepos.length ||
    exactSourceRepos.some((repo) => !declaredRepos.includes(repo))
  ) {
    issues.push("sources must equal exactly seven case-sensitive canonical repository owners.");
  }
  const normalizedPaths = new Set();
  for (const source of candidate.sources ?? []) {
    const contract = sourceContracts[source.repo];
    if (
      !contract ||
      source.repository !== source.repo ||
      source.authority_owner !== source.repo ||
      source.authority_role !== contract.authorityRole ||
      source.path !== contract.path ||
      source.authoritative_path !== contract.path ||
      source.current_authority !== contract.currentAuthority ||
      source.consumer_only !== contract.consumerOnly ||
      source.canonical_origin !== expectedOrigin(source.repo)
    ) {
      issues.push(`${source.repo ?? "<unknown>"}: source owner/path/role/currentness contract mismatch.`);
    }
    const normalized = `${source.repo?.toLowerCase()}:${normalizedRepoPath(source.path, issues)}`;
    if (normalizedPaths.has(normalized)) issues.push(`${source.repo}/${source.path}: duplicate normalized source identity.`);
    normalizedPaths.add(normalized);
    const key = source.repo?.replace("HawkinsOperations/", "");
    for (const [mapName, field] of [
      ["source_commit_refs", "commit"],
      ["source_repository_commit_refs", "repository_commit"],
      ["source_blob_refs", "authoritative_git_blob_sha"],
      ["source_semantic_fingerprint_refs", "authoritative_content_fingerprint"],
    ]) {
      if (candidate[mapName]?.[key] !== source[field]) issues.push(`${mapName} disagrees with source record for ${source.repo}.`);
    }
    const sourceAge = Math.floor((now.getTime() - new Date(source.freshness_observation?.observed_at).getTime()) / 3_600_000);
    const sourceFreshness = !source.available ? "source_unavailable" : sourceAge > 336 ? "stale" : "fresh";
    if (source.freshness_state !== sourceFreshness || source.freshness_observation?.state !== sourceFreshness) {
      issues.push(`${source.repo}: freshness observation contradicts current age.`);
    }
  }
  const authorityRepos = (candidate.sources ?? []).filter((source) => source.current_authority && !source.consumer_only).map((source) => source.repo);
  const consumerRepos = (candidate.sources ?? []).filter((source) => source.consumer_only).map((source) => source.repo);
  if (JSON.stringify(candidate.authority_source_repos) !== JSON.stringify(authorityRepos)) issues.push("authority_source_repos disagrees with source roles.");
  if (JSON.stringify(candidate.consumer_source_repos) !== JSON.stringify(consumerRepos)) issues.push("consumer_source_repos disagrees with source roles.");
  if (consumerRepos.some((repo) => !["HawkinsOperations/hoxline", "HawkinsOperations/hawkinsoperations-website"].includes(repo))) {
    issues.push("only Hoxline and website may be generated consumers.");
  }
  const expectedManifestDigest = sha256Text(JSON.stringify(canonicalJson((candidate.sources ?? []).map((source) => ({
    repository: source.repository,
    authority_owner: source.authority_owner,
    authority_role: source.authority_role,
    authoritative_path: source.authoritative_path,
    source_observed_head_sha: source.source_observed_head_sha,
    source_observation_kind: source.source_observation_kind,
    authoritative_git_blob_sha: source.authoritative_git_blob_sha,
    authoritative_content_fingerprint: source.authoritative_content_fingerprint,
    historical_snapshot: source.historical_snapshot,
    current_authority: source.current_authority,
    consumer_only: source.consumer_only,
  })))));
  if (candidate.source_manifest_digest !== expectedManifestDigest) issues.push("source_manifest_digest does not bind the exact source identities.");

  const currentIds = new Set(candidate.current_metric_ids ?? []);
  const historicalIds = new Set(candidate.historical_metric_ids ?? []);
  const renderOnlyIds = new Set(candidate.render_only_metric_ids ?? []);
  if ([...currentIds].some((id) => historicalIds.has(id) || renderOnlyIds.has(id)) ||
      [...historicalIds].some((id) => renderOnlyIds.has(id))) {
    issues.push("current, historical, and render-only metric ID sets must be disjoint.");
  }
  const allMetricIds = new Set((candidate.metric_list ?? []).map((metric) => metric.id));
  const partition = new Set([...currentIds, ...historicalIds, ...renderOnlyIds]);
  if (partition.size !== allMetricIds.size || [...allMetricIds].some((id) => !partition.has(id))) {
    issues.push("current, historical, and render-only metric IDs must form an exact partition.");
  }
  for (const metric of candidate.metric_list ?? []) {
    if (JSON.stringify(candidate.metrics?.[metric.id]) !== JSON.stringify(metric)) {
      issues.push(`metrics.${metric.id} object disagrees with metric_list.`);
    }
    const contract = metricContracts[metric.id];
    if (
      !contract ||
      metric.source_repo !== contract.repo ||
      metric.source_authority_owner !== contract.repo ||
      metric.source_path !== contract.path ||
      metric.historical_snapshot !== contract.historical ||
      metric.current_authority !== contract.current ||
      metric.consumer_only !== contract.consumerOnly ||
      metric.method !== contract.method
    ) {
      issues.push(`metrics.${metric.id} owner/path/method/classification contract mismatch.`);
    }
    if (metric.current_authority !== currentIds.has(metric.id) ||
        metric.historical_snapshot !== historicalIds.has(metric.id) ||
        metric.consumer_only !== renderOnlyIds.has(metric.id)) {
      issues.push(`metrics.${metric.id} classification disagrees with metric partitions.`);
    }
  }
  if (candidate.metrics?.public_safe_count?.value !== 0 || candidate.public_safe?.value !== false) {
    issues.push("public-safe state must remain blocked and zero.");
  }
  if (candidate.website_rendering_boundary?.statement !== "Website rendering is not proof.") {
    issues.push("website rendering boundary must remain explicit.");
  }
  if (!checkLocalSources) return [...new Set(issues)];

  if (manifest?.manifest_version !== "public-status-source-manifest-v1" ||
      manifest?.observation_kind !== "reviewed_immutable_commit" ||
      manifest?.repositories?.length !== 7 ||
      Object.keys(manifest).some((key) => !["manifest_version", "observation_kind", "repositories"].includes(key))) {
    issues.push("immutable source manifest is missing or malformed.");
  } else {
    const manifestByRepo = Object.fromEntries(manifest.repositories.map((entry) => [entry.repository, entry]));
    if (Object.keys(manifestByRepo).length !== 7) issues.push("source manifest contains duplicate repository owners.");
    for (const source of candidate.sources ?? []) {
      const entry = manifestByRepo[source.repo];
      const allowedEntryKeys = ["repository", "revision", "authoritative_path"];
      if (entry && Object.keys(entry).some((key) => !allowedEntryKeys.includes(key))) {
        issues.push(`${source.repo}: source manifest entry has an unknown property.`);
      }
      if (!entry || entry.authoritative_path !== source.path) {
        issues.push(`${source.repo}: source manifest owner/path mismatch.`);
      } else if (entry.revision !== source.source_observed_head_sha) {
        issues.push(`${source.repo}: recorded source revision differs from reviewed immutable manifest.`);
      }
      const reviewedManifestBound = entry?.revision === source.source_observed_head_sha;
      verifyContentIdentity(source, source.repo, source.path, issues, { reviewedManifestBound });
    }
  }

  for (const metric of candidate.metric_list ?? []) {
    const manifestEntry = manifest?.repositories?.find((entry) => entry.repository === metric.source_repo);
    const reviewedManifestBound = manifestEntry?.revision === metric.source_observed_head_sha;
    verifyContentIdentity(metric, metric.source_repo, metric.source_path, issues, { reviewedManifestBound });
  }
  const generatorHead = candidate.generator_observed_head_sha;
  if (candidate.generator_commit !== generatorHead) issues.push("generator_commit must equal generator_observed_head_sha.");
  const currentWebsiteHead = runGit(root, ["rev-parse", "HEAD"]);
  if (runGit(root, ["cat-file", "-t", generatorHead]) !== "commit") {
    issues.push("generator observed head must be an available immutable reviewed revision.");
  }
  const generatorCurrentBlob = runGit(root, ["rev-parse", `${currentWebsiteHead}:scripts/generate-public-status.mjs`]);
  const generatorObservedBlob = runGit(root, ["rev-parse", `${generatorHead}:scripts/generate-public-status.mjs`]);
  if (candidate.generator_git_blob_sha !== generatorCurrentBlob || generatorObservedBlob !== generatorCurrentBlob) {
    issues.push("generator Git blob must equal the current checked-tree generator blob.");
  }
  const generatorText = committedText(root, currentWebsiteHead, "scripts/generate-public-status.mjs");
  if (candidate.generator_semantic_fingerprint !== semanticFingerprint(generatorText, "scripts/generate-public-status.mjs") ||
      candidate.generator_fingerprint_sha256 !== candidate.generator_semantic_fingerprint) {
    issues.push("generator normalized semantic fingerprint mismatch.");
  }
  if (runGit(root, ["diff", "--quiet", "HEAD", "--", "scripts/generate-public-status.mjs"]) === null) {
    issues.push("dirty generator provenance is rejected.");
  }

  const proofMetric = candidate.metrics?.proof_records;
  const counts = deriveCurrentProofCounts(
    localRepoPath("HawkinsOperations/hawkinsoperations-proof"),
    runGit(localRepoPath("HawkinsOperations/hawkinsoperations-proof"), ["rev-parse", "HEAD"]),
    "proof/indexes/DETECTION_PROOF_STATUS_INDEX.yml",
    issues,
  );
  if (counts && proofMetric?.value !== counts.proof_record_count) issues.push("proof_records value disagrees with current proof status index.");
  if (counts && candidate.metrics?.proof_cards?.value !== counts.proof_card_count) issues.push("proof_cards value disagrees with current proof status index.");
  if (counts && candidate.metrics?.public_safe_count?.value !== counts.public_safe_count) issues.push("public_safe_count value disagrees with current proof status index.");
  return [...new Set(issues)];
}

for (const path of [jsonPath, tsPath, schemaPath, manifestPath]) {
  if (!existsSync(path)) fail(`Missing required public-status file: ${path}`);
}

let status = null;
let schema = null;
let manifest = null;
try {
  status = JSON.parse(readFileSync(jsonPath, "utf8"));
  schema = JSON.parse(readFileSync(schemaPath, "utf8"));
  manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
} catch (error) {
  fail(`Public status, schema, or source manifest is not valid JSON: ${error.message}`);
}
const tsSource = existsSync(tsPath) ? readFileSync(tsPath, "utf8") : "";

if (status && schema && manifest) {
  for (const issue of semanticIssues(status, { schema, manifest })) fail(issue);
  if (!tsSource.includes(JSON.stringify(status, null, 2))) fail("generated TypeScript snapshot must reproduce public-status JSON exactly.");
  for (const term of [
    "GENERATED_PUBLIC_STATUS_V0",
    "GENERATED_PUBLIC_STATUS_V0_SNAPSHOT",
    "generatedStatusFreshnessLabel",
    "isGeneratedStatusStale",
    "metricDisplay",
  ]) {
    if (!tsSource.includes(term)) fail(`generated TypeScript status must include ${term}.`);
  }
}

const selfTestModes = new Set(process.argv.slice(2));
if (
  status &&
  schema &&
  manifest &&
  ["--self-test", "--owner-self-test-only", "--source-checkout-test", "--freshness-reachability-test", "--dirty-provenance-test", "--nested-claim-test", "--eol-self-test"]
    .some((mode) => selfTestModes.has(mode))
) {
  const hostileCases = [
    {
      name: "unknown nested shape",
      mutate: (value) => { value.known_gaps[0].extension = { harmless: true }; },
      expected: "unknown property rejected",
    },
    {
      name: "nested public-safe laundering",
      mutate: (value) => { value.known_gaps[0].nested = { public_safe_status: "PUBLIC_SAFE_APPROVED" }; },
      expected: "unknown property rejected",
    },
    {
      name: "nested runtime laundering",
      mutate: (value) => { value.reviewer_actions.inspect_online[0].metadata = { runtime_state: "RUNTIME_ACTIVE" }; },
      expected: "unknown property rejected",
    },
    {
      name: "Windows drive path",
      mutate: (value) => { value.sources[0].path = "C:\\Users\\private\\evidence.txt"; },
      expected: "Windows drive absolute path",
    },
    {
      name: "UNC path",
      mutate: (value) => { value.sources[0].notes = "\\\\private-host\\share\\evidence"; },
      expected: "UNC path",
    },
    {
      name: "POSIX private path",
      mutate: (value) => { value.sources[0].notes = "/home/operator/evidence"; },
      expected: "POSIX local absolute path",
    },
    {
      name: "mixed separator path",
      mutate: (value) => { value.sources[0].path = "schemas/..\\private.json"; },
      expected: "path traversal",
    },
    {
      name: "encoded traversal path",
      mutate: (value) => { value.sources[0].path = "schemas/%2e%2e/%2e%2e/private"; },
      expected: "path traversal",
    },
    {
      name: "double-encoded traversal path",
      mutate: (value) => { value.sources[0].path = "schemas/%252e%252e%255cprivate"; },
      expected: "path traversal",
    },
    {
      name: "wrong canonical source",
      mutate: (value) => { value.sources[0].path = "README.md"; value.sources[0].authoritative_path = "README.md"; },
      expected: "contract mismatch",
    },
    {
      name: "unreachable revision",
      mutate: (value) => {
        value.sources[0].source_observed_head_sha = "f".repeat(40);
        value.sources[0].current_observed_head_sha = "f".repeat(40);
      },
      expected: "differs from reviewed immutable manifest",
    },
    {
      name: "forged semantic fingerprint",
      mutate: (value) => { value.sources[0].authoritative_content_fingerprint = "0".repeat(64); },
      expected: "semantic fingerprint",
    },
    {
      name: "dirty source fingerprint substitution",
      mutate: (value) => {
        value.sources[0].authoritative_content_fingerprint = semanticFingerprint("uncommitted source\n", value.sources[0].path);
        value.sources[0].source_fingerprint_sha256 = value.sources[0].authoritative_content_fingerprint;
      },
      expected: "semantic fingerprint",
    },
    {
      name: "dirty generator fingerprint substitution",
      mutate: (value) => {
        value.generator_semantic_fingerprint = semanticFingerprint("uncommitted generator\n", "scripts/generate-public-status.mjs");
        value.generator_fingerprint_sha256 = value.generator_semantic_fingerprint;
      },
      expected: "generator normalized semantic fingerprint mismatch",
    },
    {
      name: "future observation",
      mutate: (value) => {
        value.generated_at = "2999-01-01T00:00:00.000Z";
        value.freshness.evaluated_at = value.generated_at;
      },
      expected: "non-future timestamp",
    },
    {
      name: "stale labeled fresh",
      mutate: (value) => { value.generated_at = "2000-01-01T00:00:00.000Z"; value.freshness.status = "fresh"; },
      expected: "contradicts computed stale",
    },
    {
      name: "source commit time from branch tip",
      mutate: (value) => { value.sources[0].freshness_observation.source_commit_time = "2999-01-01T00:00:00Z"; },
      expected: "selected immutable source revision",
    },
    {
      name: "website proof authority",
      mutate: (value) => { value.sources.find((source) => source.repo.endsWith("website")).current_authority = true; },
      expected: "contract mismatch",
    },
    {
      name: "Hoxline proof authority",
      mutate: (value) => { value.sources.find((source) => source.repo.endsWith("hoxline")).consumer_only = false; },
      expected: "contract mismatch",
    },
  ];
  const modeFilters = {
    "--owner-self-test-only": ["wrong canonical source", "website proof authority", "Hoxline proof authority"],
    "--source-checkout-test": ["wrong canonical source", "unreachable revision"],
    "--freshness-reachability-test": ["unreachable revision", "future observation", "stale labeled fresh", "source commit time from branch tip"],
    "--dirty-provenance-test": ["dirty source fingerprint substitution", "dirty generator fingerprint substitution"],
    "--nested-claim-test": ["unknown nested shape", "nested public-safe laundering", "nested runtime laundering"],
  };
  let selected = hostileCases;
  for (const [mode, names] of Object.entries(modeFilters)) {
    if (selfTestModes.has(mode) && !selfTestModes.has("--self-test")) selected = hostileCases.filter((item) => names.includes(item.name));
  }
  for (const hostile of selected) {
    const value = structuredClone(status);
    hostile.mutate(value);
    const issues = semanticIssues(value, { checkLocalSources: true, schema, manifest });
    if (!issues.some((issue) => issue.includes(hostile.expected))) {
      fail(`self-test did not reject ${hostile.name}; expected diagnostic containing "${hostile.expected}".`);
    }
  }
  if (selfTestModes.has("--self-test") || selfTestModes.has("--eol-self-test")) {
    const lf = "alpha\nbeta\n";
    const crlf = "alpha\r\nbeta\r\n";
    if (semanticFingerprint(lf, "sample.txt") !== semanticFingerprint(crlf, "sample.txt")) {
      fail("CRLF/LF semantic normalization parity failed.");
    }
    const gitBlobLf = createHash("sha1").update(`blob ${Buffer.byteLength(lf)}\0${lf}`).digest("hex");
    const gitBlobCrlf = createHash("sha1").update(`blob ${Buffer.byteLength(crlf)}\0${crlf}`).digest("hex");
    if (gitBlobLf === gitBlobCrlf) fail("Git blob identity must remain distinct from normalized semantic identity.");
  }
}

if (failures.length > 0) {
  console.error(`Public status verification failed:\n${[...new Set(failures)].map((line) => `- ${line}`).join("\n")}`);
  process.exit(1);
}

console.log("Public status verification passed.");
