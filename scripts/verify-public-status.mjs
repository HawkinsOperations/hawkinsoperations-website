import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readStrictJson, strictJsonParse } from "./strict-json.mjs";
import { readSourceManifest, verifySourceCheckouts, SOURCE_PATHS, git } from "./resolve-public-status-checkouts.mjs";
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
    return /[a-z]:[\\/]/i.test(value) || /^\\\\[^\\/]/.test(value) || /^file:\/\//i.test(value);
  }
  if (Array.isArray(value)) return value.some(hasForbiddenLocalPath);
  if (value && typeof value === "object") return Object.values(value).some(hasForbiddenLocalPath);
  return false;
}

export function validateStatus(status, tsSource) {
failures.length = 0;
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

if (status) {
  if (status.source_selection !== "reviewed_immutable_commit") fail("Immutable reviewed source selection is required.");
  if (!/^[a-f0-9]{64}$/.test(status.generator_fingerprint_sha256 ?? "")) fail("Generator content fingerprint is required.");
  if (JSON.stringify(status.metric_list) !== JSON.stringify(Object.values(status.metrics ?? {}))) fail("metric_list must exactly match metrics.");
  if (status.public_safe?.count !== 0) fail("public_safe.count must remain zero.");
  for (const metric of Object.values(status.metrics ?? {})) {
    if (!Number.isSafeInteger(metric.value) || metric.value < 0) fail("Every generated count must be a non-negative safe integer from an available reviewed source.");
  }
  const walk = (value, key = "") => {
    if (value && typeof value === "object") {
      for (const [childKey, child] of Object.entries(value)) {
        if (/^(public_safe|public_safe_approved|production_ready|runtime_active|signal_observed|ai_approved_disposition|analyst_approved_disposition|case_closed)$/i.test(childKey) && child === true) fail("Nested promotion rejected: " + childKey);
        walk(child, childKey);
      }
    } else if (typeof value === "string" && /\b(?:production[-_ ]ready|runtime[-_ ]active|signal[-_ ]observed|public[-_ ]safe[-_ ]approved|AI[-_ ]approved disposition|analyst[-_ ]approved disposition|case closure approved)\b/i.test(value)) {
      const promotions = value.matchAll(/\b(?:production[-_ ]ready|runtime[-_ ]active|signal[-_ ]observed|public[-_ ]safe[-_ ]approved|AI[-_ ]approved disposition|analyst[-_ ]approved disposition|case closure approved)\b/gi);
      for (const match of promotions) {
        const prefix = value.slice(0, match.index);
        if (!/(?:\bnot|\bno|\bblocked|\bmust not|\bdoes not (?:claim|prove|promote))\s+$/i.test(prefix)) fail("Nested promotion language rejected at " + key);
      }
    }
  };
  walk(status);
  const match = tsSource.match(/^export const GENERATED_PUBLIC_STATUS_V0 = ([\s\S]+?) as const;/);
  try {
    if (!match || JSON.stringify(strictJsonParse(match[1], "generated TypeScript JSON")) !== JSON.stringify(status)) fail("Generated JSON and TypeScript data must be identical.");
  } catch (error) { fail(error.message); }
}
return [...failures];
}
function selfTest() {
  const original = readStrictJson(jsonPath);
  const tsFor = value => "export const GENERATED_PUBLIC_STATUS_V0 = " + JSON.stringify(value) + " as const;\n" + ["GENERATED_PUBLIC_STATUS_V0_SNAPSHOT", "generatedStatusFreshnessLabel", "isGeneratedStatusStale", "metricDisplay"].join("\n");
  assert.deepEqual(validateStatus(original, readFileSync(tsPath, "utf8")), []);
  const reject = (mutate, pattern) => { const data = structuredClone(original); mutate(data); data.metric_list = Object.values(data.metrics); assert.ok(validateStatus(data, tsFor(data)).some(message => pattern.test(message)), "Hostile mutation must be rejected: " + pattern); };
  reject(data => data.metrics.public_safe_count.value = 1, /public_safe_count must remain zero/);
  reject(data => data.metrics.public_safe_count.value = null, /public_safe_count must remain zero/);
  reject(data => data.public_safe.value = true, /public_safe.value/);
  reject(data => data.public_safe.count = 1, /public_safe.count/);
  reject(data => data.metrics.validation_cases.value = -1, /non-negative safe integer/);
  reject(data => data.attacker = { deep: { production_ready: true } }, /Nested promotion/);
  reject(data => data.attacker = { deep: { text: "production-ready" } }, /Nested promotion language/);
  reject(data => data.attacker = { text: "not stale and production-ready" }, /Nested promotion language/);
  reject(data => data.attacker = { text: "no delays; runtime-active" }, /Nested promotion language/);
  reject(data => data.attacker = { text: "not production-ready but runtime-active" }, /Nested promotion language/);
  reject(data => data.attacker = { private_path: "C:\\private\\runtime.json" }, /absolute local paths/);
  reject(data => data.attacker = { private_path: "c:\\private\\runtime.json" }, /absolute local paths/);
  reject(data => data.attacker = { private_path: "D:/private/runtime.json" }, /absolute local paths/);
  const mismatchedTs = tsFor({ ...original, snapshot_label: "forged" });
  assert.ok(validateStatus(original, mismatchedTs).some(message => /must be identical/.test(message)));
  for (const malformed of ['{"value":0,"value":1}', '{"Public_Safe":false,"public_safe":true}', '{"value":NaN}', '{"value":1e999}', '{"value":0} trailing']) assert.throws(() => strictJsonParse(malformed));
  assert.deepEqual(strictJsonParse('{\r\n"value":0\r\n}'), strictJsonParse('{\n"value":0\n}'));
  const helperSource = readFileSync(tsPath, "utf8").slice(readFileSync(tsPath, "utf8").indexOf("export function generatedStatusAgeHours")).replaceAll("export function", "function");
  const helpers = new Function("publicStatus", helperSource + "; return { isGeneratedStatusStale, generatedStatusFreshnessLabel }; ")(original);
  const timestamp = Date.parse(original.generated_at);
  assert.equal(helpers.isGeneratedStatusStale(new Date(timestamp + 336 * 3600000)), false);
  assert.equal(helpers.isGeneratedStatusStale(new Date(timestamp + 337 * 3600000)), true);
  assert.match(helpers.generatedStatusFreshnessLabel(new Date(timestamp + 337 * 3600000)), /Reviewed snapshot .*age evaluated at render\/build .*stale/);
  console.log("Public status hostile tests passed (nonzero/unavailable public-safe, negative count, nested claims, private paths, pair drift, malformed/duplicate JSON, CRLF/LF).");
}
if (process.argv.includes("--self-test")) {
  selfTest();
} else {
  for (const path of [jsonPath, tsPath, schemaPath]) assert.ok(existsSync(path), "Missing required public-status file: " + path);
  const status = readStrictJson(jsonPath);
  const tsSource = readFileSync(tsPath, "utf8");
  const errors = validateStatus(status, tsSource);
  const manifest = readSourceManifest(root);
  const checked = verifySourceCheckouts(root, manifest);
  if (JSON.stringify(status.sources?.map(source => source.repo)) !== JSON.stringify(Object.keys(SOURCE_PATHS))) errors.push("sources must contain the exact canonical source set.");
  for (const source of status.sources ?? []) {
    const selected = checked.get(source.repo);
    if (!selected || source.commit !== selected.revision || source.path !== SOURCE_PATHS[source.repo][0] || source.available !== true || source.authoritative_git_blob_sha !== selected.authoritative_paths[source.path]) errors.push("Generated source identity drift: " + source.repo);
  }
  for (const metric of Object.values(status.metrics ?? {})) {
    const source = checked.get(metric.source_repo);
    if (!source || metric.source_commit !== source.revision || !Object.hasOwn(source.authoritative_paths, metric.source_path)) errors.push("Metric source identity drift: " + metric.id);
  }
  try {
    const generatorPath = "scripts/generate-public-status.mjs";
    git(root, ["merge-base", "--is-ancestor", status.generator_commit, git(root, ["rev-parse", "HEAD"])]);
    const committedGenerator = git(root, ["show", status.generator_commit + ":" + generatorPath]).replace(/\r\n?/g, "\n") + "\n";
    if (createHash("sha256").update(committedGenerator).digest("hex") !== status.generator_fingerprint_sha256) errors.push("Generator commit/fingerprint identity drift.");
  } catch { errors.push("Generator revision is malformed, unreachable, or outside the event lineage."); }
  if (errors.length) throw new Error("Public status verification failed:\n" + errors.map(message => "- " + message).join("\n"));
  execFileSync(process.execPath, [join(root, "scripts/generate-public-status.mjs"), "--check"], { cwd: root, stdio: "inherit" });
  console.log("Public status verification passed; public-safe remains zero and website rendering is not proof.");
}
