import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const jsonPath = join(root, "public/data/public-status.json");
const tsPath = join(root, "src/data/generated/public-status.generated.ts");
const schemaPath = join(root, "schemas/public-status-v0.schema.json");

const failures = [];

function fail(message) {
  failures.push(message);
}

function hasForbiddenLocalPath(value) {
  if (typeof value === "string") {
    return /[A-Z]:\\/.test(value) || value.includes("C:/");
  }
  if (Array.isArray(value)) return value.some(hasForbiddenLocalPath);
  if (value && typeof value === "object") return Object.values(value).some(hasForbiddenLocalPath);
  return false;
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
      "method",
      "generated_at",
      "freshness_status",
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

if (failures.length > 0) {
  console.error(`Public status verification failed:\n${failures.map((line) => `- ${line}`).join("\n")}`);
  process.exit(1);
}

console.log("Public status verification passed.");
