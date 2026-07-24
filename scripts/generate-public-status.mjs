import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { readStrictJson, strictJsonParse } from "./strict-json.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const websiteRoot = join(scriptDir, "..");
const orgRoot = join(websiteRoot, "..");
const sourceManifestPath = join(websiteRoot, "config/public-status-source-manifest-v1.json");
const checkedStatusPath = join(websiteRoot, "public/data/public-status.json");
const checkMode = process.argv.includes("--check");
const checkedStatus = checkMode && existsSync(checkedStatusPath)
  ? readStrictJson(checkedStatusPath)
  : null;
const checkedGeneratedAt = checkedStatus?.generated_at ?? null;
const generatedAt = checkedGeneratedAt ?? new Date().toISOString();
const maxAgeHours = 14 * 24;
const proofCeiling =
  "Website rendering/reporting only. Does not prove runtime, signal, production, public-safe proof, customer deployment, final approval, merge readiness, or website-as-proof.";

const repoSpecs = [
  {
    repo: "HawkinsOperations/.github",
    authorityOwner: "HawkinsOperations/.github",
    authorityRole: "orchestration",
    consumerOnly: false,
    currentAuthority: true,
    dir: join(orgRoot, ".github"),
    publicPath: "architecture/REPO_AUTHORITY_MAP.md",
    method: "presence and git commit only; no metric derived in v0",
  },
  {
    repo: "HawkinsOperations/hoxline",
    authorityOwner: "HawkinsOperations/hoxline",
    authorityRole: "review consumer",
    consumerOnly: true,
    currentAuthority: false,
    dir: join(orgRoot, "hoxline"),
    publicPath: "schemas/case-growth-index-v0.schema.json",
    method: "reviewer navigation only; Hoxline output does not establish website or authority-owned metric truth",
  },
  {
    repo: "HawkinsOperations/hawkinsoperations-detections",
    authorityOwner: "HawkinsOperations/hawkinsoperations-detections",
    authorityRole: "detection source truth",
    consumerOnly: false,
    currentAuthority: true,
    dir: join(orgRoot, "hawkinsoperations-detections"),
    publicPath: "detections/DETECTION_PROMOTION_MATRIX.yml",
    method: "presence and git commit only; no metric derived in v0",
  },
  {
    repo: "HawkinsOperations/hawkinsoperations-validation",
    authorityOwner: "HawkinsOperations/hawkinsoperations-validation",
    authorityRole: "controlled validation truth",
    consumerOnly: false,
    currentAuthority: true,
    dir: join(orgRoot, "hawkinsoperations-validation"),
    publicPath: "activity/detection-activity-ledger-v1.json",
    method: "read-only corroborating source; not used to inflate reviewer-safe public metrics in v0",
  },
  {
    repo: "HawkinsOperations/hawkinsoperations-platform",
    authorityOwner: "HawkinsOperations/hawkinsoperations-platform",
    authorityRole: "contract and mechanical truth",
    consumerOnly: false,
    currentAuthority: true,
    dir: join(orgRoot, "hawkinsoperations-platform"),
    publicPath: "contracts/reviewer-metrics-pipeline-v1-state.json",
    method: "read bounded reviewer metrics state when available",
  },
  {
    repo: "HawkinsOperations/hawkinsoperations-proof",
    authorityOwner: "HawkinsOperations/hawkinsoperations-proof",
    authorityRole: "proof and claim authority",
    consumerOnly: false,
    currentAuthority: true,
    dir: join(orgRoot, "hawkinsoperations-proof"),
    publicPath: "proof/indexes/DETECTION_PROOF_STATUS_INDEX.yml",
    method: "derive current proof-record and ProofCard counts from unique non-null paths in the proof-owned current-authority index",
  },
  {
    repo: "HawkinsOperations/hawkinsoperations-website",
    authorityOwner: "HawkinsOperations/hawkinsoperations-website",
    authorityRole: "rendering consumer",
    consumerOnly: true,
    currentAuthority: false,
    dir: websiteRoot,
    publicPath: "schemas/public-status-v0.schema.json",
    method: "rendering contract only; website content never establishes proof or cross-repository authority",
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
  return readStrictJson(fullPath);
}

function storedOrigin(dir) {
  const value = runGit(dir, ["config", "--local", "--null", "--get-all", "remote.origin.url"]);
  if (value === null) return null;
  const origins = value.split("\0");
  if (origins.at(-1) === "") origins.pop();
  const stripped = origins.map((item) => item.trim());
  return stripped.length === 1 && stripped[0] ? stripped[0] : null;
}

function sha256File(path) {
  if (!existsSync(path)) return null;
  return sha256Text(normalizeSemanticText(readFileSync(path, "utf8"), path));
}

function committedText(dir, revision, path) {
  if (!revision) return null;
  try {
    return execFileSync("git", ["-c", `safe.directory=${dir.replaceAll("\\", "/")}`, "-C", dir, "show", `${revision}:${path}`], {
      encoding: "utf8",
    });
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

function normalizeSemanticText(value, path) {
  const normalizedEol = value.replace(/\r\n?/g, "\n");
  if (path.endsWith(".json")) {
    return `${JSON.stringify(canonicalJson(strictJsonParse(normalizedEol, path)))}\n`;
  }
  return `${normalizedEol.split("\n").map((line) => line.replace(/[ \t]+$/g, "")).join("\n").replace(/\n*$/, "")}\n`;
}

function canonicalOrigin(repo) {
  return `https://github.com/${repo}.git`;
}

function normalizeOrigin(value) {
  return value
    ?.trim()
    .replace(/^git@github\.com:/i, "https://github.com/")
    .replace(/^ssh:\/\/git@github\.com\//i, "https://github.com/")
    .replace(/\/+$/, "")
    .replace(/\.git$/i, "")
    .toLowerCase();
}

const commandManifestRelativePath = "governance/CONVERGENCE_SOURCE_MANIFEST.json";
let reviewedSourceIdentitiesCache;

function reviewedSourceIdentities() {
  if (reviewedSourceIdentitiesCache !== undefined) return reviewedSourceIdentitiesCache;
  reviewedSourceIdentitiesCache = null;
  const commandRepo = join(orgRoot, ".github");
  if (!existsSync(commandRepo)) return reviewedSourceIdentitiesCache;
  if (normalizeOrigin(storedOrigin(commandRepo)) !==
      normalizeOrigin(canonicalOrigin("HawkinsOperations/.github"))) {
    return reviewedSourceIdentitiesCache;
  }
  const commandHead = runGit(commandRepo, ["rev-parse", "HEAD"]);
  if (!commandHead ||
      runGit(commandRepo, ["diff", "--quiet", "HEAD", "--", commandManifestRelativePath]) === null) {
    return reviewedSourceIdentitiesCache;
  }
  const manifestText = committedText(commandRepo, commandHead, commandManifestRelativePath);
  try {
    const manifest = strictJsonParse(manifestText, `${commandManifestRelativePath}@${commandHead}`);
    const entries = manifest?.repositories ?? [];
    const byRepository = new Map(entries.map((entry) => [entry.canonical_repository, entry]));
    const selectionManifest = readStrictJson(sourceManifestPath);
    const selectionEntries = selectionManifest?.repositories ?? [];
    const selectionByRepository = new Map(
      selectionEntries.map((entry) => [entry.repository, entry]),
    );
    const commandCenterEntry = byRepository.get("HawkinsOperations/.github");
    if (manifest?.schema !== "hawkinsoperations-convergence-source-manifest-v1" ||
        manifest?.constraints?.exact_repository_count !== 7 ||
        entries.length !== 7 ||
        byRepository.size !== 7 ||
        commandCenterEntry?.revision_source !== "github_event_sha" ||
        commandCenterEntry?.tree_source !== "github_event_tree" ||
        selectionEntries.length !== 7 ||
        selectionByRepository.size !== 7) {
      return reviewedSourceIdentitiesCache;
    }
    const identities = new Map();
    for (const spec of repoSpecs) {
      const entry = byRepository.get(spec.repo);
      const selection = selectionByRepository.get(spec.repo);
      const reviewedRevision = spec.repo === "HawkinsOperations/.github"
        ? commandHead
        : entry?.revision;
      const reviewedTree = spec.repo === "HawkinsOperations/.github"
        ? runGit(spec.dir, ["rev-parse", `${commandHead}^{tree}`])
        : entry?.reviewed_tree_sha;
      const commandContentRevision = entry?.authority_content_revision;
      const contentRevision = selection?.revision;
      if (
        !entry ||
        !selection ||
        selection.authoritative_path !== spec.publicPath ||
        !/^[a-f0-9]{40}$/.test(reviewedRevision ?? "") ||
        !/^[a-f0-9]{40}$/.test(reviewedTree ?? "") ||
        !/^[a-f0-9]{40}$/.test(commandContentRevision ?? "") ||
        !/^[a-f0-9]{40}$/.test(contentRevision ?? "") ||
        runGit(spec.dir, ["cat-file", "-t", reviewedRevision]) !== "commit" ||
        runGit(spec.dir, ["cat-file", "-t", commandContentRevision]) !== "commit" ||
        runGit(spec.dir, ["cat-file", "-t", contentRevision]) !== "commit" ||
        runGit(spec.dir, ["rev-parse", `${reviewedRevision}^{tree}`]) !== reviewedTree
      ) {
        return reviewedSourceIdentitiesCache;
      }
      const reviewedBlob = runGit(spec.dir, ["rev-parse", `${reviewedRevision}:${spec.publicPath}`]);
      const contentBlob = runGit(spec.dir, ["rev-parse", `${contentRevision}:${spec.publicPath}`]);
      const rewrittenCommandCenter = spec.repo === "HawkinsOperations/.github";
      if (
        !reviewedBlob ||
        reviewedBlob !== contentBlob ||
        (
          !rewrittenCommandCenter &&
          (
            runGit(spec.dir, ["merge-base", "--is-ancestor", commandContentRevision, reviewedRevision]) === null ||
            runGit(spec.dir, ["merge-base", "--is-ancestor", contentRevision, reviewedRevision]) === null
          )
        )
      ) return reviewedSourceIdentitiesCache;
      identities.set(spec.repo, {
        revision: reviewedRevision,
        tree: reviewedTree,
        contentRevision,
        sourceRevision: contentRevision,
        currentObservation: reviewedRevision,
        generatorObservation: spec.repo === "HawkinsOperations/hawkinsoperations-website"
          ? reviewedRevision
          : undefined,
      });
    }
    reviewedSourceIdentitiesCache = identities;
    return reviewedSourceIdentitiesCache;
  } catch {
    return reviewedSourceIdentitiesCache;
  }
}

function reviewedLineageMatches(
  spec,
  candidateRevision,
  currentRevision,
  path,
  currentBlob,
  role,
  identity = reviewedSourceIdentities()?.get(spec.repo),
) {
  // CONTENT_BOUND_OBSERVATION_V1: a recorded current observation may predate
  // the final reviewed tip only when the selected content revision anchors it.
  if (!identity) return false;
  const candidateIsReviewedObservation =
    ["current", "generator"].includes(role) &&
    (
      candidateRevision === currentRevision ||
      (
        (
          runGit(spec.dir, ["merge-base", "--is-ancestor", identity.revision, candidateRevision]) !== null &&
          runGit(spec.dir, ["merge-base", "--is-ancestor", candidateRevision, currentRevision]) !== null
        ) ||
        (
          (
            candidateRevision !== identity.contentRevision ||
            role === "current"
          ) &&
          runGit(spec.dir, ["merge-base", "--is-ancestor", identity.contentRevision, candidateRevision]) !== null &&
          runGit(spec.dir, ["merge-base", "--is-ancestor", candidateRevision, identity.revision]) !== null &&
          runGit(spec.dir, ["merge-base", "--is-ancestor", identity.revision, currentRevision]) !== null
        )
      )
    );
  const candidateCarriesReviewedContentLineage =
    candidateRevision === identity.contentRevision ||
    runGit(
      spec.dir,
      ["merge-base", "--is-ancestor", identity.contentRevision, candidateRevision],
    ) !== null;
  const projectedObservation =
    role !== "source" &&
    candidateCarriesReviewedContentLineage &&
    observationProjectionAllowed(spec, candidateRevision, identity.revision, role);
  if (role === "source" && candidateRevision !== identity.contentRevision) return false;
  if (role === "generator" && !candidateIsReviewedObservation) {
    if (!projectedObservation) {
      return false;
    }
  } else if (
    role !== "source" &&
    !candidateIsReviewedObservation &&
    candidateRevision !== identity.revision &&
    !projectedObservation
  ) {
    return false;
  }
  if (runGit(spec.dir, ["cat-file", "-t", candidateRevision]) !== "commit" ||
      runGit(spec.dir, ["cat-file", "-t", identity.revision]) !== "commit") {
    return false;
  }
  if (currentRevision !== candidateRevision &&
      runGit(spec.dir, ["merge-base", "--is-ancestor", currentRevision, candidateRevision]) !== null) {
    return false;
  }
  if (
    !candidateIsReviewedObservation &&
    !projectedObservation &&
    !(spec.repo === "HawkinsOperations/.github" &&
      role === "source" &&
      candidateRevision === identity.contentRevision) &&
    runGit(spec.dir, ["merge-base", "--is-ancestor", candidateRevision, identity.revision]) === null
  ) {
    return false;
  }
  const currentTree = runGit(spec.dir, ["rev-parse", `${currentRevision}^{tree}`]);
  if (runGit(spec.dir, ["rev-parse", `${identity.revision}^{tree}`]) !== identity.tree ||
      (
        currentTree !== identity.tree &&
        runGit(spec.dir, ["merge-base", "--is-ancestor", identity.revision, currentRevision]) === null
      )) {
    return false;
  }
  return runGit(spec.dir, ["rev-parse", `${candidateRevision}:${path}`]) === currentBlob &&
    runGit(spec.dir, ["rev-parse", `${identity.revision}:${path}`]) === currentBlob;
}

function observationProjectionAllowed(spec, candidateRevision, reviewedRevision, role) {
  const allowedByRepo = {
    "HawkinsOperations/.github": new Set(["governance/CONVERGENCE_SOURCE_MANIFEST.json"]),
    "HawkinsOperations/hawkinsoperations-website": new Set([
      "public/data/public-status.json",
      "src/data/generated/public-status.generated.ts",
    ]),
    "HawkinsOperations/hoxline": new Set([
      "examples/case-growth/current-case-growth-index.json",
      "examples/case-growth/current-case-growth-index.md",
    ]),
  };
  const allowed = allowedByRepo[spec.repo];
  if (!allowed || !["current", "generator"].includes(role)) return false;
  const commandCenterProjection = spec.repo === "HawkinsOperations/.github";
  if (
    commandCenterProjection
      ? runGit(spec.dir, ["cat-file", "-t", candidateRevision]) !== "commit"
      : runGit(spec.dir, ["rev-parse", `${reviewedRevision}^`]) !== candidateRevision
  ) return false;
  const changed = runGit(
    spec.dir,
    ["diff", "--name-only", "--no-renames", candidateRevision, reviewedRevision],
  );
  const paths = changed ? changed.split(/\r?\n/).filter(Boolean) : [];
  return paths.length === allowed.size &&
    paths.every((path) => allowed.has(path));
}

function revisionMatches(spec, candidateRevision, currentRevision, path, currentBlob, role) {
  const identity = reviewedSourceIdentities()?.get(spec.repo);
  return revisionMatchesWithIdentity(
    spec,
    candidateRevision,
    currentRevision,
    path,
    currentBlob,
    role,
    identity,
  );
}

function revisionMatchesWithIdentity(
  spec,
  candidateRevision,
  currentRevision,
  path,
  currentBlob,
  role,
  identity,
) {
  const currentTree = identity
    ? runGit(spec.dir, ["rev-parse", `${currentRevision}^{tree}`])
    : null;
  const reviewedIdentityIsActive = identity &&
    runGit(spec.dir, ["rev-parse", `${identity.revision}^{tree}`]) === identity.tree &&
    (
      currentTree === identity.tree ||
      runGit(spec.dir, ["merge-base", "--is-ancestor", identity.revision, currentRevision]) !== null
    );
  if (!reviewedIdentityIsActive) return false;
  return reviewedLineageMatches(
    spec,
    candidateRevision,
    currentRevision,
    path,
    currentBlob,
    role,
    identity,
  );
}

function hasTrackedProvenanceChanges(spec) {
  const pathspec = ["."];
  if (spec.repo === "HawkinsOperations/hawkinsoperations-website") {
    pathspec.push(
      ":(exclude)public/data/public-status.json",
      ":(exclude)src/data/generated/public-status.generated.ts",
    );
  }
  return runGit(spec.dir, ["diff", "--quiet", "HEAD", "--", ...pathspec]) === null;
}

function boundedCurrentObservation(spec, currentRevision, authoritativeBlob) {
  if (!checkMode) return currentRevision;
  const checked = checkedStatus?.sources?.find((source) => source.repo === spec.repo);
  const recorded = checked?.current_observed_head_sha;
  const observationMatches = revisionMatches(
    spec,
    recorded,
    currentRevision,
    spec.publicPath,
    authoritativeBlob,
    "current",
  );
  if (!observationMatches) {
    return currentRevision;
  }
  const recordedBlob = runGit(spec.dir, ["rev-parse", `${recorded}:${spec.publicPath}`]);
  return recordedBlob === authoritativeBlob ? recorded : currentRevision;
}

function repoSource(spec, selectedRevision) {
  const repoAvailable = existsSync(spec.dir);
  const currentObservedHeadSha = repoAvailable ? runGit(spec.dir, ["rev-parse", "HEAD"]) : null;
  const origin = repoAvailable ? storedOrigin(spec.dir) : null;
  const expectedOrigin = canonicalOrigin(spec.repo);
  const originValid = normalizeOrigin(origin) === normalizeOrigin(expectedOrigin);
  const trackedDirty = repoAvailable ? hasTrackedProvenanceChanges(spec) : true;
  const authoritativeGitBlobSha = currentObservedHeadSha
    ? runGit(spec.dir, ["rev-parse", `${currentObservedHeadSha}:${spec.publicPath}`])
    : null;
  const sourceText = repoAvailable ? committedText(spec.dir, currentObservedHeadSha, spec.publicPath) : null;
  const available = sourceText !== null;
  const contentFingerprint = sourceText === null ? null : sha256Text(normalizeSemanticText(sourceText, spec.publicPath));
  const selectedRevisionValid = /^[a-f0-9]{40}$/.test(selectedRevision ?? "") &&
    runGit(spec.dir, ["cat-file", "-t", selectedRevision]) === "commit" &&
    runGit(spec.dir, ["rev-parse", `${selectedRevision}:${spec.publicPath}`]) === authoritativeGitBlobSha &&
    revisionMatches(
      spec,
      selectedRevision,
      currentObservedHeadSha,
      spec.publicPath,
      authoritativeGitBlobSha,
      "source",
    );
  const recordedObservedHead = selectedRevisionValid ? selectedRevision : currentObservedHeadSha;
  const currentObservation = boundedCurrentObservation(spec, currentObservedHeadSha, authoritativeGitBlobSha);
  const sourceCommitTime = recordedObservedHead ? runGit(spec.dir, ["show", "-s", "--format=%cI", recordedObservedHead]) : null;
  const freshnessState = available && originValid && !trackedDirty && selectedRevisionValid ? "fresh" : "source_unavailable";
  return {
    repo: spec.repo,
    repository: spec.repo,
    authority: spec.authorityRole,
    authority_owner: spec.authorityOwner,
    authority_role: spec.authorityRole,
    path: spec.publicPath,
    authoritative_path: spec.publicPath,
    commit: recordedObservedHead,
    repository_commit: recordedObservedHead,
    current_observed_head_sha: currentObservation,
    source_observed_head_sha: recordedObservedHead,
    source_observation_kind: "reviewed_immutable_commit",
    resolved_ref: recordedObservedHead,
    canonical_origin: expectedOrigin,
    authoritative_git_blob_sha: authoritativeGitBlobSha,
    authoritative_content_fingerprint: contentFingerprint,
    source_fingerprint_sha256: contentFingerprint,
    freshness_state: freshnessState,
    freshness_observation: {
      state: freshnessState,
      observed_at: generatedAt,
      source_commit_time: sourceCommitTime,
      max_age_hours: maxAgeHours,
    },
    historical_snapshot: false,
    current_authority: spec.currentAuthority,
    consumer_only: spec.consumerOnly,
    available: available && originValid && !trackedDirty && selectedRevisionValid,
    method: spec.method,
    notes: available && originValid && !trackedDirty && selectedRevisionValid
      ? "The authoritative path blob equals the blob in the checked current tree; the observed head is separate freshness context."
      : "Source unavailable, repository identity mismatched, selected immutable revision invalid, or tracked source is dirty; dependent metrics fail closed.",
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
  const source = committedText(
    websiteRoot,
    sourceByRepo["HawkinsOperations/hawkinsoperations-website"]?.source_observed_head_sha,
    "src/data/governanceSaves.ts",
  );
  if (source === null) return null;
  const records = [...source.matchAll(/\{\s*id: "GS-[\s\S]*?\n\s*\}/g)].map((match) => match[0]);
  if (records.length === 0) return null;
  return records.filter((record) => !record.includes('publicSafety: "PRIVATE_ONLY"')).length;
}

if (!existsSync(sourceManifestPath)) {
  throw new Error("Required immutable source manifest is missing.");
}
const sourceManifest = readStrictJson(sourceManifestPath);
const manifestEntries = sourceManifest.repositories;
if (
  sourceManifest.manifest_version !== "public-status-source-manifest-v1" ||
  sourceManifest.observation_kind !== "reviewed_immutable_commit" ||
  Object.keys(sourceManifest).some((key) => !["manifest_version", "observation_kind", "repositories"].includes(key)) ||
  !Array.isArray(manifestEntries) ||
  manifestEntries.length !== repoSpecs.length
) {
  throw new Error("Source manifest shape or observation kind is invalid.");
}
const manifestByRepo = Object.fromEntries(manifestEntries.map((entry) => [entry.repository, entry]));
if (Object.keys(manifestByRepo).length !== repoSpecs.length) {
  throw new Error("Source manifest repository identities must be unique.");
}

const sources = repoSpecs.map((spec) => repoSource(spec, manifestByRepo[spec.repo]?.revision));
for (const spec of repoSpecs) {
  const source = sources.find((candidate) => candidate.repo === spec.repo);
  const entry = manifestByRepo[spec.repo];
  if (!entry || entry.authoritative_path !== spec.publicPath) {
    throw new Error(`Source manifest owner/path mismatch for ${spec.repo}.`);
  }
  const allowedEntryKeys = ["repository", "revision", "authoritative_path"];
  if (Object.keys(entry).some((key) => !allowedEntryKeys.includes(key))) {
    throw new Error(`Source manifest contains an unknown field for ${spec.repo}.`);
  }
  if (!/^[a-f0-9]{40}$/.test(entry.revision ?? "") || entry.revision !== source.source_observed_head_sha) {
    throw new Error(`Checked source selection differs from immutable manifest for ${spec.repo}.`);
  }
  if (spec.repo === "HawkinsOperations/hawkinsoperations-website") {
    const websiteHead = runGit(spec.dir, ["rev-parse", "HEAD"]);
    const immutableObservedSha = process.env.HAWKINS_WEBSITE_IMMUTABLE_OBSERVED_SHA;
    if (immutableObservedSha && immutableObservedSha !== websiteHead) {
      throw new Error("Website checkout HEAD does not equal the explicitly selected immutable event revision.");
    }
    if (!revisionMatches(
      spec,
      entry.revision,
      websiteHead,
      spec.publicPath,
      source.authoritative_git_blob_sha,
      "source",
    )) {
      throw new Error("Website immutable content revision is outside the reviewed Website lineage.");
    }
  }
}
const unavailableSources = sources.filter((source) => !source.available);
if (unavailableSources.length > 0) {
  throw new Error(
    `Public-status generation refused unavailable, dirty, or wrong-origin sources: ${unavailableSources.map((source) => source.repo).join(", ")}`,
  );
}
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
const platformState = platformStateText === null
  ? null
  : strictJsonParse(platformStateText, "contracts/reviewer-metrics-pipeline-v1-state.json");
const validationLedger = validationLedgerText === null
  ? null
  : strictJsonParse(validationLedgerText, "activity/detection-activity-ledger-v1.json");
const publicGovernanceSaveCount = countPublicGovernanceSaves();

function sourceVariant(source, path, method, { historicalSnapshot, currentAuthority, consumerOnly = source?.consumer_only ?? false }) {
  const spec = repoSpecs.find((candidate) => candidate.repo === source?.repo);
  const revision = source?.source_observed_head_sha ?? null;
  const sourceText = source && spec ? committedText(spec.dir, revision, path) : null;
  const available = sourceText !== null;
  const authoritativeGitBlobSha = source && spec ? runGit(spec.dir, ["rev-parse", `${revision}:${path}`]) : null;
  const contentFingerprint = sourceText === null ? null : sha256Text(normalizeSemanticText(sourceText, path));
  return source
    ? {
        ...source,
        path,
        authoritative_path: path,
        commit: revision,
        method,
        available,
        authoritative_git_blob_sha: authoritativeGitBlobSha,
        authoritative_content_fingerprint: contentFingerprint,
        source_fingerprint_sha256: contentFingerprint,
        freshness_state: available && source.freshness_state === "fresh" ? "fresh" : "source_unavailable",
        historical_snapshot: historicalSnapshot,
        current_authority: currentAuthority,
        consumer_only: consumerOnly,
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
    source_authority_owner: source?.authority_owner ?? "unknown",
    source_authority_role: source?.authority_role ?? "unknown",
    source_commit: source?.commit ?? null,
    source_repository_commit: source?.repository_commit ?? null,
    source_observed_head_sha: source?.source_observed_head_sha ?? null,
    current_observed_head_sha: source?.current_observed_head_sha ?? null,
    source_observation_kind: source?.source_observation_kind ?? "reviewed_immutable_commit",
    authoritative_git_blob_sha: source?.authoritative_git_blob_sha ?? null,
    authoritative_content_fingerprint: source?.authoritative_content_fingerprint ?? null,
    source_resolved_ref: source?.resolved_ref ?? null,
    source_fingerprint_sha256: source?.source_fingerprint_sha256 ?? null,
    method: method ?? source?.method ?? "source unavailable",
    generated_at: generatedAt,
    freshness_status: "source_unavailable",
    historical_snapshot: source?.historical_snapshot ?? false,
    current_authority: source?.current_authority ?? false,
    consumer_only: source?.consumer_only ?? false,
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
    source_authority_owner: source.authority_owner,
    source_authority_role: source.authority_role,
    source_commit: source.commit,
    source_repository_commit: source.repository_commit,
    source_observed_head_sha: source.source_observed_head_sha,
    current_observed_head_sha: source.current_observed_head_sha,
    source_observation_kind: source.source_observation_kind,
    authoritative_git_blob_sha: source.authoritative_git_blob_sha,
    authoritative_content_fingerprint: source.authoritative_content_fingerprint,
    source_resolved_ref: source.resolved_ref,
    source_fingerprint_sha256: source.source_fingerprint_sha256,
    method,
    generated_at: generatedAt,
    freshness_status: freshnessStatus,
    historical_snapshot: source.historical_snapshot,
    current_authority: source.current_authority,
    consumer_only: source.consumer_only,
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
const websiteGovernanceSource = sourceVariant(
  websiteSource,
  "src/data/governanceSaves.ts",
  "count source-controlled public governance-save entries excluding publicSafety PRIVATE_ONLY as render-only website content",
  { historicalSnapshot: false, currentAuthority: false, consumerOnly: true },
);
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
proofSummary = proofSummaryText === null
  ? null
  : strictJsonParse(proofSummaryText, "proof/records/reviewer-metrics-pipeline-v1-summary.json");
lifetimeLedger = lifetimeLedgerText === null
  ? null
  : strictJsonParse(lifetimeLedgerText, "proof/records/lifetime-case-ledger-v1-public-summary.json");
const proofIndexCounts = deriveProofIndexCounts();
const proofMetrics = proofSummary?.metrics ?? platformState?.metrics ?? {};
const ledgerCounts = lifetimeLedger?.ledger_counts ?? {};

const metrics = {
  controls_fired: metric({
    id: "controls_fired",
    label: "controls fired",
    value: publicGovernanceSaveCount,
    source: websiteGovernanceSource,
    method: "count source-controlled public governance-save entries excluding publicSafety PRIVATE_ONLY as render-only website content",
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
const websiteGeneratorHead = runGit(websiteRoot, ["rev-parse", "HEAD"]);
const generatorBlobSha = websiteGeneratorHead
  ? runGit(websiteRoot, ["rev-parse", `${websiteGeneratorHead}:scripts/generate-public-status.mjs`])
  : null;
const checkedGeneratorHead = checkedStatus?.generator_observed_head_sha;
const checkedGeneratorBlob = checkedGeneratorHead
  ? runGit(websiteRoot, ["rev-parse", `${checkedGeneratorHead}:scripts/generate-public-status.mjs`])
  : null;
const generatorObservation = checkMode &&
  revisionMatches(
    websiteRepo,
    checkedGeneratorHead,
    websiteGeneratorHead,
    "scripts/generate-public-status.mjs",
    generatorBlobSha,
    "generator",
  ) &&
  checkedGeneratorBlob === generatorBlobSha
  ? checkedGeneratorHead
  : websiteGeneratorHead;
const generatorText = committedText(websiteRoot, websiteGeneratorHead, "scripts/generate-public-status.mjs");
const generatorFingerprint = generatorText === null
  ? null
  : sha256Text(normalizeSemanticText(generatorText, "scripts/generate-public-status.mjs"));
const sourceManifestDigest = sha256Text(JSON.stringify(canonicalJson(sources.map((source) => ({
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

const publicStatus = {
  schema_version: "public-status-v0",
  generated_at: generatedAt,
  generated_by: "scripts/generate-public-status.mjs",
  generator_commit: generatorObservation,
  generator_observed_head_sha: generatorObservation,
  generator_git_blob_sha: generatorBlobSha,
  generator_semantic_fingerprint: generatorFingerprint,
  generator_fingerprint_sha256: generatorFingerprint,
  source_manifest_digest: sourceManifestDigest,
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
  source_blob_refs: Object.fromEntries(
    sources.map((source) => [source.repo.replace("HawkinsOperations/", ""), source.authoritative_git_blob_sha]),
  ),
  source_semantic_fingerprint_refs: Object.fromEntries(
    sources.map((source) => [source.repo.replace("HawkinsOperations/", ""), source.authoritative_content_fingerprint]),
  ),
  authority_source_repos: sources.filter((source) => source.current_authority && !source.consumer_only).map((source) => source.repo),
  consumer_source_repos: sources.filter((source) => source.consumer_only).map((source) => source.repo),
  metric_list: metricList,
  metrics,
  current_metric_ids: metricList.filter((item) => item.current_authority).map((item) => item.id),
  historical_metric_ids: metricList.filter((item) => item.historical_snapshot).map((item) => item.id),
  render_only_metric_ids: metricList.filter((item) => item.consumer_only).map((item) => item.id),
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

const generatedOutputs = [
  [join(websiteRoot, "public/data/public-status.json"), serialized],
  [join(websiteRoot, "src/data/generated/public-status.generated.ts"), tsSource],
];
if (checkMode) {
  const drifted = generatedOutputs
    .filter(([path, expected]) =>
      !existsSync(path) || readFileSync(path, "utf8").replace(/\r\n?/g, "\n") !== expected.replace(/\r\n?/g, "\n"))
    .map(([path]) => relative(process.cwd(), path));
  if (drifted.length > 0) {
    console.error(`Generated public status is stale: ${drifted.join(", ")}`);
    process.exit(1);
  }
  for (const [path] of generatedOutputs) console.log(`Verified ${relative(process.cwd(), path)}`);
} else {
  for (const [path, content] of generatedOutputs) {
    writeFileSync(path, content);
    console.log(`Generated ${relative(process.cwd(), path)}`);
  }
}
