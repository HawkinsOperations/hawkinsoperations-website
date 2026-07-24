import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { tmpdir } from "node:os";
import { readStrictJson, strictJsonParse } from "./strict-json.mjs";

const root = process.cwd();
const orgRoot = dirname(root);
const jsonPath = join(root, "public/data/public-status.json");
const tsPath = join(root, "src/data/generated/public-status.generated.ts");
const schemaPath = join(root, "schemas/public-status-v0.schema.json");
const manifestPath = join(root, "config/public-status-source-manifest-v1.json");
const failures = [];
const commandManifestRelativePath = "governance/CONVERGENCE_SOURCE_MANIFEST.json";

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

function storedOrigin(dir) {
  const value = runGit(dir, ["config", "--local", "--null", "--get-all", "remote.origin.url"]);
  if (value === null) return null;
  const origins = value.split("\0");
  if (origins.at(-1) === "") origins.pop();
  const stripped = origins.map((item) => item.trim());
  return stripped.length === 1 && stripped[0] ? stripped[0] : null;
}

function trackedVocabularyFindings(dir = root) {
  const retired = ["syn", "thetic"].join("");
  const binaryExtensions = new Set([
    ".7z", ".avif", ".avi", ".bz2", ".dll", ".dylib", ".eot", ".exe", ".gif",
    ".gz", ".ico", ".jpeg", ".jpg", ".mov", ".mp3", ".mp4", ".pdf",
    ".png", ".pyc", ".so", ".tar", ".tgz", ".ttf", ".wasm", ".webp",
    ".woff", ".woff2", ".xz", ".zip",
  ]);
  const findings = [];
  let tracked;
  try {
    tracked = execFileSync(
      "git",
      ["-c", `safe.directory=${dir.replaceAll("\\", "/")}`, "-C", dir, "ls-files", "-z"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
    );
  } catch {
    return ["tracked-source vocabulary check could not enumerate Git-tracked files."];
  }
  const trackedPaths = tracked.split("\0").filter(Boolean);
  for (const path of trackedPaths) {
    if (path.normalize("NFKC").toLocaleLowerCase("en-US").includes(retired)) {
      findings.push(`retired fixture vocabulary appears in tracked filename: ${path}`);
    }
    const extension = extname(path).toLocaleLowerCase("en-US");
    if (binaryExtensions.has(extension)) continue;
    let blob;
    try {
      blob = execFileSync(
        "git",
        [
          "-c",
          `safe.directory=${dir.replaceAll("\\", "/")}`,
          "-C",
          dir,
          "show",
          `:${path}`,
        ],
        { stdio: ["ignore", "pipe", "pipe"] },
      );
    } catch {
      findings.push(`tracked-source vocabulary check could not read indexed content: ${path}`);
      continue;
    }
    if (blob.includes(0)) {
      findings.push(`tracked non-binary content contains NUL: ${path}`);
      continue;
    }
    let text;
    try {
      text = new TextDecoder("utf-8", { fatal: true }).decode(blob);
    } catch {
      findings.push(`tracked non-binary content is not UTF-8: ${path}`);
      continue;
    }
    if (text.normalize("NFKC").toLocaleLowerCase("en-US").includes(retired)) {
      findings.push(`retired fixture vocabulary appears in tracked content: ${path}`);
    }
  }
  return findings;
}

function trackedVocabularySelfTest() {
  const retired = ["syn", "thetic"].join("");
  const testRoot = mkdtempSync(join(tmpdir(), "public-status-vocabulary-"));
  try {
    execFileSync("git", ["-C", testRoot, "init", "--quiet"], {
      stdio: ["ignore", "pipe", "pipe"],
    });
    const fullwidth = [...retired]
      .map((character) => String.fromCodePoint(character.codePointAt(0) + 0xfee0))
      .join("");
    const contentPath = join(testRoot, "content-fixture.txt");
    const filenamePath = join(testRoot, `fixture-${fullwidth}.txt`);
    const utf16Path = join(testRoot, "utf16-fixture.md");
    writeFileSync(contentPath, `controlled-test boundary rejects ${fullwidth}\n`, "utf8");
    writeFileSync(filenamePath, "controlled-test boundary\n", "utf8");
    writeFileSync(utf16Path, Buffer.from(`controlled-test ${retired}\n`, "utf16le"));
    execFileSync("git", ["-C", testRoot, "add", "--", contentPath, filenamePath, utf16Path], {
      stdio: ["ignore", "pipe", "pipe"],
    });
    const findings = trackedVocabularyFindings(testRoot);
    if (!findings.some((item) => item.includes("tracked content"))) {
      fail("tracked-source vocabulary self-test accepted retired content.");
    }
    if (!findings.some((item) => item.includes("tracked filename"))) {
      fail("tracked-source vocabulary self-test accepted a retired filename.");
    }
    if (!findings.some((item) => item.includes("utf16-fixture.md"))) {
      fail("tracked-source vocabulary self-test accepted UTF-16 text.");
    }
    const unreadableFindings = trackedVocabularyFindings(join(testRoot, "missing-repository"));
    if (!unreadableFindings.some((item) => item.includes("could not enumerate"))) {
      fail("tracked-source vocabulary self-test accepted an unreadable Git index.");
    }
  } finally {
    rmSync(testRoot, { recursive: true, force: true });
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
    return `${JSON.stringify(canonicalJson(strictJsonParse(normalizedEol, path)))}\n`;
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
    .replace(/\.git$/i, "")
    .toLowerCase();
}

function expectedOrigin(repo) {
  return `https://github.com/${repo}.git`;
}

function storedOriginRewriteSelfTest() {
  const fixture = mkdtempSync(join(tmpdir(), "public-status-origin-"));
  const stored = "C:/hostile/local-proof";
  const canonical = expectedOrigin("HawkinsOperations/hawkinsoperations-proof");
  const keys = ["GIT_CONFIG_COUNT", "GIT_CONFIG_KEY_0", "GIT_CONFIG_VALUE_0"];
  const previous = new Map(keys.map((key) => [key, process.env[key]]));
  try {
    execFileSync("git", ["init", "--quiet", fixture], { stdio: "ignore" });
    execFileSync("git", ["-C", fixture, "remote", "add", "origin", stored], { stdio: "ignore" });
    process.env.GIT_CONFIG_COUNT = "1";
    process.env.GIT_CONFIG_KEY_0 = `url.${canonical}.insteadOf`;
    process.env.GIT_CONFIG_VALUE_0 = stored;
    const effective = runGit(fixture, ["remote", "get-url", "origin"]);
    if (effective !== canonical) {
      fail("origin rewrite self-test fixture did not activate.");
    }
    if (storedOrigin(fixture) !== stored) {
      fail("stored origin inspection accepted ambient insteadOf laundering.");
    }
    execFileSync(
      "git",
      ["-C", fixture, "config", "--add", "remote.origin.url", ""],
      { stdio: "ignore" },
    );
    if (storedOrigin(fixture) !== null) {
      fail("stored origin inspection accepted a nonempty origin followed by an empty duplicate.");
    }
    execFileSync(
      "git",
      ["-C", fixture, "config", "--unset-all", "remote.origin.url"],
      { stdio: "ignore" },
    );
    execFileSync(
      "git",
      ["-C", fixture, "config", "--add", "remote.origin.url", ""],
      { stdio: "ignore" },
    );
    execFileSync(
      "git",
      ["-C", fixture, "config", "--add", "remote.origin.url", canonical],
      { stdio: "ignore" },
    );
    if (storedOrigin(fixture) !== null) {
      fail("stored origin inspection accepted an empty origin followed by a nonempty duplicate.");
    }
  } finally {
    for (const key of keys) {
      const value = previous.get(key);
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    rmSync(fixture, { recursive: true, force: true });
  }
}

let reviewedSourceIdentitiesCache;

function reviewedSourceIdentities() {
  if (reviewedSourceIdentitiesCache !== undefined) return reviewedSourceIdentitiesCache;
  reviewedSourceIdentitiesCache = null;
  const commandRepo = join(orgRoot, ".github");
  if (!existsSync(commandRepo)) return reviewedSourceIdentitiesCache;
  if (normalizeOrigin(storedOrigin(commandRepo)) !==
      normalizeOrigin(expectedOrigin("HawkinsOperations/.github"))) {
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
    const selectionManifest = readStrictJson(manifestPath);
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
    for (const repo of exactSourceRepos) {
      const entry = byRepository.get(repo);
      const selection = selectionByRepository.get(repo);
      const dir = localRepoPath(repo);
      const path = sourceContracts[repo].path;
      const reviewedRevision = repo === "HawkinsOperations/.github"
        ? commandHead
        : entry?.revision;
      const reviewedTree = repo === "HawkinsOperations/.github"
        ? runGit(dir, ["rev-parse", `${commandHead}^{tree}`])
        : entry?.reviewed_tree_sha;
      const commandContentRevision = entry?.authority_content_revision;
      const contentRevision = selection?.revision;
      if (
        !entry ||
        !selection ||
        selection.authoritative_path !== path ||
        !/^[a-f0-9]{40}$/.test(reviewedRevision ?? "") ||
        !/^[a-f0-9]{40}$/.test(reviewedTree ?? "") ||
        !/^[a-f0-9]{40}$/.test(commandContentRevision ?? "") ||
        !/^[a-f0-9]{40}$/.test(contentRevision ?? "") ||
        runGit(dir, ["cat-file", "-t", reviewedRevision]) !== "commit" ||
        runGit(dir, ["cat-file", "-t", commandContentRevision]) !== "commit" ||
        runGit(dir, ["cat-file", "-t", contentRevision]) !== "commit" ||
        runGit(dir, ["rev-parse", `${reviewedRevision}^{tree}`]) !== reviewedTree
      ) {
        return reviewedSourceIdentitiesCache;
      }
      const reviewedBlob = runGit(dir, ["rev-parse", `${reviewedRevision}:${path}`]);
      const contentBlob = runGit(dir, ["rev-parse", `${contentRevision}:${path}`]);
      const rewrittenCommandCenter = repo === "HawkinsOperations/.github";
      if (
        !reviewedBlob ||
        reviewedBlob !== contentBlob ||
        (
          !rewrittenCommandCenter &&
          (
            runGit(dir, ["merge-base", "--is-ancestor", commandContentRevision, reviewedRevision]) === null ||
            runGit(dir, ["merge-base", "--is-ancestor", contentRevision, reviewedRevision]) === null
          )
        )
      ) return reviewedSourceIdentitiesCache;
      identities.set(repo, {
        revision: reviewedRevision,
        tree: reviewedTree,
        contentRevision,
        sourceRevision: contentRevision,
        currentObservation: reviewedRevision,
        generatorObservation: repo === "HawkinsOperations/hawkinsoperations-website"
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

function reviewedLineageMatchesWithIdentity(
  repo,
  dir,
  candidateRevision,
  currentRevision,
  path,
  currentBlob,
  role,
  identity,
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
          runGit(dir, ["merge-base", "--is-ancestor", identity.revision, candidateRevision]) !== null &&
          runGit(dir, ["merge-base", "--is-ancestor", candidateRevision, currentRevision]) !== null
        ) ||
        (
          (
            candidateRevision !== identity.contentRevision ||
            role === "current"
          ) &&
          runGit(dir, ["merge-base", "--is-ancestor", identity.contentRevision, candidateRevision]) !== null &&
          runGit(dir, ["merge-base", "--is-ancestor", candidateRevision, identity.revision]) !== null &&
          runGit(dir, ["merge-base", "--is-ancestor", identity.revision, currentRevision]) !== null
        )
      )
    );
  const candidateCarriesReviewedContentLineage =
    candidateRevision === identity.contentRevision ||
    runGit(dir, ["merge-base", "--is-ancestor", identity.contentRevision, candidateRevision]) !== null;
  const projectedObservation =
    role !== "source" &&
    candidateCarriesReviewedContentLineage &&
    observationProjectionAllowed(repo, dir, candidateRevision, identity.revision, role);
  if (role === "source" && candidateRevision !== identity.contentRevision) return false;
  if (
    role === "generator" &&
    !candidateIsReviewedObservation
  ) {
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
  if (runGit(dir, ["cat-file", "-t", candidateRevision]) !== "commit" ||
      runGit(dir, ["cat-file", "-t", identity.revision]) !== "commit") {
    return false;
  }
  if ((currentRevision !== candidateRevision &&
      runGit(dir, ["merge-base", "--is-ancestor", currentRevision, candidateRevision]) !== null) ||
      (
        !candidateIsReviewedObservation &&
        !projectedObservation &&
        !(repo === "HawkinsOperations/.github" &&
          role === "source" &&
          candidateRevision === identity.contentRevision) &&
        runGit(dir, ["merge-base", "--is-ancestor", candidateRevision, identity.revision]) === null
      )) {
    return false;
  }
  const currentTree = runGit(dir, ["rev-parse", `${currentRevision}^{tree}`]);
  if (runGit(dir, ["rev-parse", `${identity.revision}^{tree}`]) !== identity.tree ||
      (
        currentTree !== identity.tree &&
        runGit(dir, ["merge-base", "--is-ancestor", identity.revision, currentRevision]) === null
      )) {
    return false;
  }
  return runGit(dir, ["rev-parse", `${candidateRevision}:${path}`]) === currentBlob &&
    runGit(dir, ["rev-parse", `${identity.revision}:${path}`]) === currentBlob;
}

function observationProjectionAllowed(repo, dir, candidateRevision, reviewedRevision, role) {
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
  const allowed = allowedByRepo[repo];
  if (!allowed || !["current", "generator"].includes(role)) return false;
  const commandCenterProjection = repo === "HawkinsOperations/.github";
  if (
    commandCenterProjection
      ? runGit(dir, ["cat-file", "-t", candidateRevision]) !== "commit"
      : runGit(dir, ["rev-parse", `${reviewedRevision}^`]) !== candidateRevision
  ) return false;
  const changed = runGit(
    dir,
    ["diff", "--name-only", "--no-renames", candidateRevision, reviewedRevision],
  );
  const paths = changed ? changed.split(/\r?\n/).filter(Boolean) : [];
  return paths.length === allowed.size &&
    paths.every((path) => allowed.has(path));
}

function reviewedLineageMatchesInRepo(repo, dir, candidateRevision, currentRevision, path, currentBlob, role) {
  return reviewedLineageMatchesWithIdentity(
    repo,
    dir,
    candidateRevision,
    currentRevision,
    path,
    currentBlob,
    role,
    reviewedSourceIdentities()?.get(repo),
  );
}

function revisionMatches(repo, dir, candidateRevision, currentRevision, path, currentBlob, role) {
  const identity = reviewedSourceIdentities()?.get(repo);
  return revisionMatchesWithIdentity(
    repo,
    dir,
    candidateRevision,
    currentRevision,
    path,
    currentBlob,
    role,
    identity,
  );
}

function revisionMatchesWithIdentity(
  repo,
  dir,
  candidateRevision,
  currentRevision,
  path,
  currentBlob,
  role,
  identity,
) {
  const currentTree = identity
    ? runGit(dir, ["rev-parse", `${currentRevision}^{tree}`])
    : null;
  const reviewedIdentityIsActive = identity &&
    runGit(dir, ["rev-parse", `${identity.revision}^{tree}`]) === identity.tree &&
    (
      currentTree === identity.tree ||
      runGit(dir, ["merge-base", "--is-ancestor", identity.revision, currentRevision]) !== null
    );
  if (!reviewedIdentityIsActive) return false;
  return reviewedLineageMatchesWithIdentity(
    repo,
    dir,
    candidateRevision,
    currentRevision,
    path,
    currentBlob,
    role,
    identity,
  );
}

function revisionRelationshipSelfTest() {
  const approvedTempRoot = process.env.HAWKINSOPERATIONS_TEST_TMP_ROOT;
  const parent = approvedTempRoot && existsSync(approvedTempRoot) ? approvedTempRoot : tmpdir();
  const fixture = mkdtempSync(join(parent, "website-revision-relationship-"));
  const fixtureGit = (args) => {
    const result = runGit(fixture, args);
    if (result === null) throw new Error(`controlled Git fixture command failed: git ${args.join(" ")}`);
    return result;
  };
  try {
    fixtureGit(["init"]);
    fixtureGit(["config", "user.name", "HawkinsOperations controlled test"]);
    fixtureGit(["config", "user.email", "controlled-test.invalid"]);
    writeFileSync(join(fixture, "authority.txt"), "owned authority\n");
    writeFileSync(join(fixture, "other.txt"), "base\n");
    fixtureGit(["add", "authority.txt", "other.txt"]);
    fixtureGit(["commit", "-m", "controlled base"]);
    const base = fixtureGit(["rev-parse", "HEAD"]);

    writeFileSync(join(fixture, "other.txt"), "current\n");
    fixtureGit(["add", "other.txt"]);
    fixtureGit(["commit", "-m", "controlled current"]);
    const current = fixtureGit(["rev-parse", "HEAD"]);
    const currentTree = fixtureGit(["rev-parse", `${current}^{tree}`]);
    const pairDir = join(fixture, "public", "data");
    const generatedPairDir = join(fixture, "src", "data", "generated");
    mkdirSync(pairDir, { recursive: true });
    mkdirSync(generatedPairDir, { recursive: true });
    writeFileSync(join(pairDir, "public-status.json"), "reviewed pair\n");
    writeFileSync(join(generatedPairDir, "public-status.generated.ts"), "export const reviewed = true;\n");
    fixtureGit(["add", "public/data/public-status.json",
      "src/data/generated/public-status.generated.ts"]);
    fixtureGit(["commit", "-m", "controlled reviewed final"]);
    const reviewedFinal = fixtureGit(["rev-parse", "HEAD"]);
    const reviewedTree = fixtureGit(["rev-parse", `${reviewedFinal}^{tree}`]);
    const projectedEquivalent = fixtureGit(["commit-tree", reviewedTree, "-m", "controlled projected equivalent"]);
    fixtureGit(["checkout", "--detach", current]);
    fixtureGit(["commit", "--allow-empty", "-m", "controlled same-tree future"]);
    const sameTreeFuture = fixtureGit(["rev-parse", "HEAD"]);
    fixtureGit(["checkout", "--detach", current]);
    writeFileSync(join(fixture, "other.txt"), "future\n");
    fixtureGit(["add", "other.txt"]);
    fixtureGit(["commit", "-m", "controlled future"]);
    const future = fixtureGit(["rev-parse", "HEAD"]);
    const futureTree = fixtureGit(["rev-parse", `${future}^{tree}`]);
    const differentTreeUnrelated = fixtureGit(["commit-tree", futureTree, "-m", "controlled different-tree identity"]);

    const reviewedIdentity = {
      revision: reviewedFinal,
      tree: reviewedTree,
      contentRevision: base,
      sourceRevision: base,
      currentObservation: current,
      generatorObservation: current,
    };
    fixtureGit(["checkout", "--detach", reviewedFinal]);
    writeFileSync(join(fixture, "other.txt"), "post-review unrelated change\n");
    fixtureGit(["add", "other.txt"]);
    fixtureGit(["commit", "-m", "controlled unchanged-authority descendant"]);
    const unchangedAuthorityDescendant = fixtureGit(["rev-parse", "HEAD"]);
    const unchangedAuthorityBlob = fixtureGit([
      "rev-parse",
      `${unchangedAuthorityDescendant}:authority.txt`,
    ]);
    if (!revisionMatchesWithIdentity(
      "HawkinsOperations/hawkinsoperations-website",
      fixture,
      base,
      unchangedAuthorityDescendant,
      "authority.txt",
      unchangedAuthorityBlob,
      "source",
      reviewedIdentity,
    )) {
      fail("revision relationship self-test rejected an unchanged authority blob on a reviewed descendant.");
    }
    if (!reviewedLineageMatchesWithIdentity(
      "HawkinsOperations/hawkinsoperations-validation",
      fixture,
      current,
      reviewedFinal,
      "authority.txt",
      fixtureGit(["rev-parse", `${reviewedFinal}:authority.txt`]),
      "current",
      reviewedIdentity,
    )) {
      fail(
        "reviewed lineage self-test rejected a content-bound current observation "
        + "that predates the final reviewed tip.",
      );
    }
    if (!reviewedLineageMatchesWithIdentity(
      "HawkinsOperations/hawkinsoperations-validation",
      fixture,
      base,
      reviewedFinal,
      "authority.txt",
      fixtureGit(["rev-parse", `${reviewedFinal}:authority.txt`]),
      "current",
      reviewedIdentity,
    )) {
      fail(
        "reviewed lineage self-test rejected the manifest-selected content "
        + "revision as its generation-time current observation.",
      );
    }
    if (!revisionMatchesWithIdentity(
      "HawkinsOperations/hawkinsoperations-website",
      fixture,
      unchangedAuthorityDescendant,
      unchangedAuthorityDescendant,
      "authority.txt",
      unchangedAuthorityBlob,
      "current",
      reviewedIdentity,
    )) {
      fail("revision relationship self-test rejected the exact current observation with unchanged authority.");
    }
    fixtureGit(["checkout", "--detach", unchangedAuthorityDescendant]);
    writeFileSync(join(fixture, "other.txt"), "post-observation unrelated change\n");
    fixtureGit(["add", "other.txt"]);
    fixtureGit(["commit", "-m", "controlled post-observation descendant"]);
    const postObservationDescendant = fixtureGit(["rev-parse", "HEAD"]);
    if (!revisionMatchesWithIdentity(
      "HawkinsOperations/hawkinsoperations-website",
      fixture,
      unchangedAuthorityDescendant,
      postObservationDescendant,
      "authority.txt",
      unchangedAuthorityBlob,
      "current",
      reviewedIdentity,
    )) {
      fail("revision relationship self-test rejected an unchanged recorded observation on a reviewed lineage.");
    }
    fixtureGit(["checkout", "--detach", reviewedFinal]);
    writeFileSync(join(fixture, "authority.txt"), "changed authority\n");
    fixtureGit(["add", "authority.txt"]);
    fixtureGit(["commit", "-m", "controlled changed-authority descendant"]);
    const changedAuthorityDescendant = fixtureGit(["rev-parse", "HEAD"]);
    const changedAuthorityBlob = fixtureGit([
      "rev-parse",
      `${changedAuthorityDescendant}:authority.txt`,
    ]);
    if (revisionMatchesWithIdentity(
      "HawkinsOperations/hawkinsoperations-website",
      fixture,
      base,
      changedAuthorityDescendant,
      "authority.txt",
      changedAuthorityBlob,
      "source",
      reviewedIdentity,
    )) {
      fail("revision relationship self-test accepted a changed authority blob on a reviewed descendant.");
    }
    if (revisionMatchesWithIdentity(
      "HawkinsOperations/hawkinsoperations-website",
      fixture,
      changedAuthorityDescendant,
      changedAuthorityDescendant,
      "authority.txt",
      changedAuthorityBlob,
      "current",
      reviewedIdentity,
    )) {
      fail("revision relationship self-test accepted a current observation with changed authority.");
    }
    const projectedBlob = fixtureGit(["rev-parse", `${projectedEquivalent}:authority.txt`]);
    const rewrittenCommandCenterIdentity = {
      ...reviewedIdentity,
      revision: projectedEquivalent,
      tree: reviewedTree,
    };
    if (!revisionMatchesWithIdentity(
      "HawkinsOperations/.github",
      fixture,
      base,
      projectedEquivalent,
      "authority.txt",
      projectedBlob,
      "source",
      rewrittenCommandCenterIdentity,
    )) {
      fail("reviewed lineage self-test rejected exact command-center content after identity rewrite.");
    }
    fixtureGit(["checkout", "--detach", reviewedFinal]);
    mkdirSync(join(fixture, "governance"), { recursive: true });
    writeFileSync(
      join(fixture, "governance", "CONVERGENCE_SOURCE_MANIFEST.json"),
      "{\"repositories\":[]}\n",
    );
    fixtureGit(["add", "governance/CONVERGENCE_SOURCE_MANIFEST.json"]);
    fixtureGit(["commit", "-m", "controlled command-center projection"]);
    const commandCenterFinal = fixtureGit(["rev-parse", "HEAD"]);
    const commandCenterTree = fixtureGit(["rev-parse", `${commandCenterFinal}^{tree}`]);
    const projectedCommandCenter = fixtureGit([
      "commit-tree",
      commandCenterTree,
      "-m",
      "controlled rewritten command-center",
    ]);
    const commandCenterAuthorityBlob = fixtureGit([
      "rev-parse",
      `${projectedCommandCenter}:authority.txt`,
    ]);
    const projectedCommandCenterIdentity = {
      ...reviewedIdentity,
      revision: projectedCommandCenter,
      tree: commandCenterTree,
    };
    if (!reviewedLineageMatchesWithIdentity(
      "HawkinsOperations/.github",
      fixture,
      reviewedFinal,
      projectedCommandCenter,
      "authority.txt",
      commandCenterAuthorityBlob,
      "current",
      projectedCommandCenterIdentity,
    )) {
      fail("reviewed lineage self-test rejected an exact command-center manifest projection.");
    }
    const foreignPreManifest = fixtureGit([
      "commit-tree",
      reviewedTree,
      "-m",
      "controlled foreign pre-manifest identity",
    ]);
    if (reviewedLineageMatchesWithIdentity(
      "HawkinsOperations/.github",
      fixture,
      foreignPreManifest,
      projectedCommandCenter,
      "authority.txt",
      commandCenterAuthorityBlob,
      "current",
      projectedCommandCenterIdentity,
    )) {
      fail("reviewed lineage self-test accepted a foreign exact-path projection.");
    }
    fixtureGit(["checkout", "--detach", reviewedFinal]);
    mkdirSync(join(fixture, "unexpected"), { recursive: true });
    writeFileSync(
      join(fixture, "unexpected", "manifest.json"),
      "{\"repositories\":[]}\n",
    );
    fixtureGit(["add", "unexpected/manifest.json"]);
    fixtureGit(["commit", "-m", "controlled rename-shaped projection source"]);
    const renameShapedPreManifest = fixtureGit(["rev-parse", "HEAD"]);
    if (reviewedLineageMatchesWithIdentity(
      "HawkinsOperations/.github",
      fixture,
      renameShapedPreManifest,
      projectedCommandCenter,
      "authority.txt",
      commandCenterAuthorityBlob,
      "current",
      projectedCommandCenterIdentity,
    )) {
      fail("reviewed lineage self-test accepted a rename-shaped extra-path projection.");
    }
    fixtureGit(["checkout", "--detach", commandCenterFinal]);
    writeFileSync(join(fixture, "unexpected.txt"), "unexpected projection path\n");
    fixtureGit(["add", "unexpected.txt"]);
    fixtureGit(["commit", "-m", "controlled command-center projection with extra path"]);
    const commandCenterExtraFinal = fixtureGit(["rev-parse", "HEAD"]);
    const commandCenterExtraTree = fixtureGit(["rev-parse", `${commandCenterExtraFinal}^{tree}`]);
    const projectedCommandCenterExtra = fixtureGit([
      "commit-tree",
      commandCenterExtraTree,
      "-m",
      "controlled rewritten command-center with extra path",
    ]);
    if (reviewedLineageMatchesWithIdentity(
      "HawkinsOperations/.github",
      fixture,
      reviewedFinal,
      projectedCommandCenterExtra,
      "authority.txt",
      fixtureGit(["rev-parse", `${projectedCommandCenterExtra}:authority.txt`]),
      "current",
      {
        ...projectedCommandCenterIdentity,
        revision: projectedCommandCenterExtra,
        tree: commandCenterExtraTree,
      },
    )) {
      fail("reviewed lineage self-test accepted a command-center projection with an extra path.");
    }
    if (!reviewedLineageMatchesWithIdentity(
      "HawkinsOperations/hawkinsoperations-website",
      fixture,
      current,
      projectedEquivalent,
      "authority.txt",
      projectedBlob,
      "generator",
      reviewedIdentity,
    )) {
      fail("reviewed lineage self-test rejected the exact reviewed-tree projection.");
    }
    if (revisionMatchesWithIdentity(
      "HawkinsOperations/hawkinsoperations-website",
      fixture,
      current,
      projectedEquivalent,
      "authority.txt",
      projectedBlob,
      "source",
      null,
    )) {
      fail("revision relationship self-test accepted a source without reviewed identity.");
    }
    if (revisionMatchesWithIdentity(
      "HawkinsOperations/hawkinsoperations-website",
      fixture,
      current,
      projectedEquivalent,
      "authority.txt",
      projectedBlob,
      "source",
      { ...reviewedIdentity, tree: "f".repeat(40) },
    )) {
      fail("revision relationship self-test accepted an inactive reviewed identity.");
    }
    if (reviewedLineageMatchesWithIdentity(
      "HawkinsOperations/hawkinsoperations-website",
      fixture,
      base,
      projectedEquivalent,
      "authority.txt",
      projectedBlob,
      "generator",
      reviewedIdentity,
    )) {
      fail("reviewed lineage self-test accepted an arbitrary same-blob ancestor.");
    }
    if (reviewedLineageMatchesWithIdentity(
      "HawkinsOperations/hawkinsoperations-website",
      fixture,
      reviewedFinal,
      projectedEquivalent,
      "authority.txt",
      projectedBlob,
      "generator",
      reviewedIdentity,
    )) {
      fail("reviewed lineage self-test accepted reviewed-tree revision substitution.");
    }
    if (reviewedLineageMatchesWithIdentity(
      "HawkinsOperations/hawkinsoperations-website",
      fixture,
      current,
      differentTreeUnrelated,
      "authority.txt",
      fixtureGit(["rev-parse", `${differentTreeUnrelated}:authority.txt`]),
      "generator",
      reviewedIdentity,
    )) {
      fail("reviewed lineage self-test accepted a wrong current repository tree.");
    }
    if (reviewedLineageMatchesWithIdentity(
      "HawkinsOperations/hawkinsoperations-website",
      fixture,
      "f".repeat(40),
      projectedEquivalent,
      "authority.txt",
      projectedBlob,
      "generator",
      { ...reviewedIdentity, generatorObservation: "f".repeat(40) },
    )) {
      fail("reviewed lineage self-test accepted an unreachable recorded observation.");
    }
    if (reviewedLineageMatchesWithIdentity(
      "HawkinsOperations/hawkinsoperations-website",
      fixture,
      current,
      projectedEquivalent,
      "authority.txt",
      projectedBlob,
      "generator",
      { ...reviewedIdentity, tree: "f".repeat(40) },
    )) {
      fail("reviewed lineage self-test accepted a forged reviewed tree.");
    }
    const futureIdentity = {
      ...reviewedIdentity,
      revision: sameTreeFuture,
      tree: currentTree,
      contentRevision: base,
      generatorObservation: sameTreeFuture,
    };
    if (reviewedLineageMatchesWithIdentity(
      "HawkinsOperations/hawkinsoperations-website",
      fixture,
      sameTreeFuture,
      current,
      "authority.txt",
      fixtureGit(["rev-parse", `${current}:authority.txt`]),
      "generator",
      futureIdentity,
    )) {
      fail("reviewed lineage self-test accepted current-as-ancestor of the recorded observation.");
    }

    fixtureGit(["checkout", "--detach", current]);
    const hoxlinePairDir = join(fixture, "examples", "case-growth");
    mkdirSync(hoxlinePairDir, { recursive: true });
    writeFileSync(join(hoxlinePairDir, "current-case-growth-index.json"), "{}\n");
    writeFileSync(join(hoxlinePairDir, "current-case-growth-index.md"), "# Controlled pair\n");
    fixtureGit(["add", "examples/case-growth/current-case-growth-index.json",
      "examples/case-growth/current-case-growth-index.md"]);
    fixtureGit(["commit", "-m", "controlled Hoxline generated pair"]);
    const hoxlinePairRevision = fixtureGit(["rev-parse", "HEAD"]);
    if (!observationProjectionAllowed(
      "HawkinsOperations/hoxline",
      fixture,
      current,
      hoxlinePairRevision,
      "current",
    )) {
      fail("reviewed lineage self-test rejected the direct Hoxline generated-pair projection.");
    }
    fixtureGit(["checkout", "--detach", current]);
    mkdirSync(hoxlinePairDir, { recursive: true });
    writeFileSync(join(hoxlinePairDir, "current-case-growth-index.json"), "{\"one_sided\":true}\n");
    fixtureGit(["add", "examples/case-growth/current-case-growth-index.json"]);
    fixtureGit(["commit", "-m", "controlled one-sided Hoxline projection"]);
    const oneSidedProjectionRevision = fixtureGit(["rev-parse", "HEAD"]);
    if (observationProjectionAllowed(
      "HawkinsOperations/hoxline",
      fixture,
      current,
      oneSidedProjectionRevision,
      "current",
    )) {
      fail("reviewed lineage self-test accepted a one-sided Hoxline generated-pair projection.");
    }
    fixtureGit(["checkout", "--detach", current]);
    mkdirSync(hoxlinePairDir, { recursive: true });
    writeFileSync(join(hoxlinePairDir, "current-case-growth-index.md"), "# One sided\n");
    fixtureGit(["add", "examples/case-growth/current-case-growth-index.md"]);
    fixtureGit(["commit", "-m", "controlled Markdown-only Hoxline projection"]);
    const markdownOnlyProjectionRevision = fixtureGit(["rev-parse", "HEAD"]);
    if (observationProjectionAllowed(
      "HawkinsOperations/hoxline",
      fixture,
      current,
      markdownOnlyProjectionRevision,
      "current",
    )) {
      fail("reviewed lineage self-test accepted a Markdown-only Hoxline generated-pair projection.");
    }
    fixtureGit(["checkout", "--detach", current]);
    mkdirSync(pairDir, { recursive: true });
    writeFileSync(join(pairDir, "public-status.json"), "{\"one_sided\":true}\n");
    fixtureGit(["add", "public/data/public-status.json"]);
    fixtureGit(["commit", "-m", "controlled JSON-only Website projection"]);
    const websiteJsonOnlyRevision = fixtureGit(["rev-parse", "HEAD"]);
    if (observationProjectionAllowed(
      "HawkinsOperations/hawkinsoperations-website",
      fixture,
      current,
      websiteJsonOnlyRevision,
      "current",
    )) {
      fail("reviewed lineage self-test accepted a JSON-only Website generated-pair projection.");
    }
    fixtureGit(["checkout", "--detach", current]);
    mkdirSync(generatedPairDir, { recursive: true });
    writeFileSync(join(generatedPairDir, "public-status.generated.ts"), "export const oneSided = true;\n");
    fixtureGit(["add", "src/data/generated/public-status.generated.ts"]);
    fixtureGit(["commit", "-m", "controlled TypeScript-only Website projection"]);
    const websiteTypeScriptOnlyRevision = fixtureGit(["rev-parse", "HEAD"]);
    if (observationProjectionAllowed(
      "HawkinsOperations/hawkinsoperations-website",
      fixture,
      current,
      websiteTypeScriptOnlyRevision,
      "current",
    )) {
      fail("reviewed lineage self-test accepted a TypeScript-only Website generated-pair projection.");
    }
    fixtureGit(["checkout", "--detach", current]);
    const commandCenterDir = join(fixture, "governance");
    mkdirSync(commandCenterDir, { recursive: true });
    writeFileSync(join(commandCenterDir, "CONVERGENCE_SOURCE_MANIFEST.json"), "{\"wave\":1}\n");
    fixtureGit(["add", "governance/CONVERGENCE_SOURCE_MANIFEST.json"]);
    fixtureGit(["commit", "-m", "controlled command-center observation wave one"]);
    writeFileSync(join(commandCenterDir, "CONVERGENCE_SOURCE_MANIFEST.json"), "{\"wave\":2}\n");
    fixtureGit(["add", "governance/CONVERGENCE_SOURCE_MANIFEST.json"]);
    fixtureGit(["commit", "-m", "controlled command-center observation wave two"]);
    const commandCenterProjectionRevision = fixtureGit(["rev-parse", "HEAD"]);
    if (!observationProjectionAllowed(
      "HawkinsOperations/.github",
      fixture,
      current,
      commandCenterProjectionRevision,
      "current",
    )) {
      fail("reviewed lineage self-test rejected a manifest-only command-center observation chain.");
    }
    const projectedCommandCenterTree = fixtureGit([
      "rev-parse",
      `${commandCenterProjectionRevision}^{tree}`,
    ]);
    const rewrittenCommandCenterProjection = fixtureGit([
      "commit-tree",
      projectedCommandCenterTree,
      "-m",
      "controlled rewritten command-center projection",
    ]);
    if (!observationProjectionAllowed(
      "HawkinsOperations/.github",
      fixture,
      current,
      rewrittenCommandCenterProjection,
      "current",
    )) {
      fail("reviewed lineage self-test rejected a rewritten manifest-only command-center projection.");
    }
    writeFileSync(join(fixture, "other.txt"), "unauthorized command-center projection\n");
    fixtureGit(["add", "other.txt"]);
    fixtureGit(["commit", "-m", "controlled command-center mixed projection"]);
    const mixedCommandCenterProjection = fixtureGit(["rev-parse", "HEAD"]);
    if (observationProjectionAllowed(
      "HawkinsOperations/.github",
      fixture,
      current,
      mixedCommandCenterProjection,
      "current",
    )) {
      fail("reviewed lineage self-test accepted a command-center projection with a non-manifest change.");
    }
    fixtureGit(["checkout", "--detach", hoxlinePairRevision]);
    writeFileSync(join(fixture, "other.txt"), "unauthorized mixed projection\n");
    fixtureGit(["add", "other.txt"]);
    fixtureGit(["commit", "-m", "controlled mixed projection"]);
    const mixedProjectionRevision = fixtureGit(["rev-parse", "HEAD"]);
    if (observationProjectionAllowed(
      "HawkinsOperations/hoxline",
      fixture,
      hoxlinePairRevision,
      mixedProjectionRevision,
      "current",
    )) {
      fail("reviewed lineage self-test accepted a non-pair Hoxline projection.");
    }
  } catch (error) {
    fail(`revision relationship self-test failed to execute: ${error.message}`);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
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

function securityScanText(value) {
  return decodeRepeated(value)
    .normalize("NFKD")
    .replace(/[\t\r\n]/g, " ")
    .replace(/[\p{M}\p{C}]/gu, "");
}

function pathIssue(value) {
  if (typeof value !== "string") return null;
  const decoded = securityScanText(value);
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
const privateNormalizedTokens = [
  "privateraw",
  "privateevidence",
  "privatepayload",
  "rawwazuh",
  "rawwazuhalert",
  "rawalert",
  "endpointlog",
  "generatedpassword",
  "mufg",
  "customeridentifier",
];
const authorityKeyPattern = /(?:ai|analyst).*(?:authority|approval)|final.*authorization|case.*closure|public.*safe.*approved|runtime.*active|signal.*observed/i;
const exactBoundedAuthorityValues = /^(?:false|blocked|none|not[_ -]?approved|not[_ -]?authorized|not[_ -]?public[_ -]?safe)$/i;
const exactProofCeiling = "Website rendering/reporting only. Does not prove runtime, signal, production, public-safe proof, customer deployment, final approval, merge readiness, or website-as-proof.";
const promotionKeyNames = new Set([
  "runtimeactive",
  "signalobserved",
  "publicsafe",
  "publicsafestatus",
  "publicsafeapproved",
  "productionready",
  "productionstate",
  "productionstatus",
  "productiondeployed",
  "customerdeployed",
  "customerstate",
  "customerstatus",
  "socaasdeployed",
  "socaasstate",
  "socaasstatus",
  "aiapproved",
  "aiapproval",
  "aiauthority",
  "aidispositionauthority",
  "analystapproved",
  "analystapproval",
  "analystauthority",
  "analystdispositionauthority",
  "finalauthorization",
  "finalauthority",
  "caseclosed",
  "caseclosure",
  "casestate",
  "casestatus",
  "approvalstate",
  "approvalstatus",
  "runtimestate",
]);
const allowedAuthorityKeyNames = new Set([
  "currentauthority",
  "authority",
  "authorityowner",
  "authorityrole",
  "sourceauthorityowner",
  "sourceauthorityrole",
]);
const sensitiveAuthoritySegments = new Set([
  "runtime", "signal", "public", "approval", "production", "customer",
  "socaas", "ai", "analyst", "review", "final", "case",
]);
const affirmativeAuthorityScalar = /^(?:true|1|active|live|observed|approved|authorized|enabled|granted|closed|complete|deployed|productionready|publicsafe)$/i;

function compositionalPromotionKey(key) {
  return (
    (key.includes("production") && /(?:active|live|ready|deploy|state|status)/.test(key)) ||
    (/(?:customer|socaas)/.test(key) && /(?:active|deploy|state|status)/.test(key)) ||
    (key.includes("runtime") && /(?:active|state|status)/.test(key)) ||
    (key.includes("signal") && /(?:observed|state|status)/.test(key)) ||
    (key.includes("publicsafe") && !key.includes("count")) ||
    (key.includes("final") && /(?:authoriz|authority)/.test(key)) ||
    (key.includes("case") && /(?:closed|closure|state|status)/.test(key) && !key.includes("count")) ||
    /(?:approvalstate|approvalstatus|closurestatus|casestate|casestatus)/.test(key) ||
    ((key.startsWith("ai") || key.startsWith("analyst")) &&
      /(?:approved|approval|authority|disposition)/.test(key)) ||
    (key.includes("review") && key.includes("disposition"))
  );
}

function affirmativeAuthorityValue(value) {
  if (value === true) return true;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    return affirmativeAuthorityScalar.test(
      value.normalize("NFKC").toLocaleLowerCase("en-US").replace(/[^a-z0-9]/g, ""),
    );
  }
  return value !== null && typeof value === "object";
}

function normalizedAuthorityPath(path) {
  return path
    .filter((part) => !/^\d+$/.test(String(part)))
    .map((part) => decodeRepeated(String(part))
      .normalize("NFKC")
      .toLocaleLowerCase("en-US")
      .replace(/[^a-z0-9]/g, ""));
}

function pathCarriesPromotionContext(path) {
  const segments = normalizedAuthorityPath(path);
  if (segments.some((segment) =>
    promotionKeyNames.has(segment) ||
    authorityKeyPattern.test(segment) ||
    compositionalPromotionKey(segment))) {
    return true;
  }
  return segments.some((segment, index) =>
    sensitiveAuthoritySegments.has(segment) &&
    segments.slice(index + 1).some((terminal) => {
      const candidate = `${segment}${terminal}`;
      return promotionKeyNames.has(candidate) ||
        authorityKeyPattern.test(candidate) ||
        compositionalPromotionKey(candidate);
    }));
}

function explicitlyBoundedAuthorityValue(value) {
  return value === false ||
    value === null ||
    value === 0 ||
    (typeof value === "string" && exactBoundedAuthorityValues.test(value));
}
const affirmativeClaimPatterns = new Map([
  ["runtime active", /\bruntime\b.{0,24}\b(?:active|live)\b/i],
  ["signal observed", /\bsignal\b.{0,24}\b(?:active|observed)\b/i],
  ["public safe", /\bpublic[\s_-]*safe\b.{0,32}\b(?:approved|confirmed|established|release|runtime\s+proof)\b/i],
  ["production ready", /\bproduction\b.{0,32}\b(?:active|confirmed|deployed|deployment|live|ready|readiness|status)\b/i],
  ["customer deployed", /\b(?:customer|socaas)\b.{0,48}\bdeploy(?:ed|ment|ing)?\b|\bdeploy(?:ed|ment|ing)?\b.{0,48}\b(?:customer|socaas)\b/i],
  ["AI authority", /\bai\b.{0,40}\b(?:approval|authority|disposition)\b.{0,24}\b(?:approved|enabled|granted)\b|\bai\b.{0,40}\b(?:approved|authorized)\b.{0,24}\b(?:case|decision|disposition)\b|\bai[\s_-]+authority\b/i],
  ["analyst authority", /\banalyst\b.{0,40}\b(?:approval|authority|disposition)\b.{0,24}\b(?:approved|enabled|granted)\b|\banalyst\b.{0,40}\b(?:approved|authorized)\b.{0,24}\b(?:case|decision|disposition)\b|\banalyst[\s_-]+authority\b/i],
  ["final authorization", /\bfinal\s+authori[sz]ation\b.{0,32}\b(?:approved|complete|granted|received)\b|\bfinal(?:[\s_-]+human)?[\s_-]+authorization\b/i],
  ["case closure", /\bcase\s+closure\b.{0,32}\b(?:approved|complete|granted|received)\b|\bcase\b.{0,16}\b(?:is|was)?\s*closed\b/i],
  ["website as proof", /\bwebsite(?:[\s_-]+rendering)?[\s_-]+(?:as|is)[\s_-]+proof\b/i],
  ["green CI as approval", /\bgreen[\s_-]+ci[\s_-]+(?:as|is)[\s_-]+approval\b/i],
]);
const localNegationPattern = /(?:\b(?:not|never|no|without|missing|blocked|future|pending|unsupported)\b|\b(?:does|do|must|is|are|was|were|can|cannot|could|should|will|would)\s+not\b|\bnot\s+(?:authorized|approved|promoted)\b|\brequires?\s+separate\b|\bremain(?:s)?\s+(?:a\s+)?separate\b)/i;
const negativeListIntroPattern = /\b(?:does|do|did|must|is|are|was|were|can|cannot|could|should|will|would)\s+not\s+(?:prove|establish|claim|promote|authorize|assert)\b|\bwithout\s+claiming\b/i;
const negativeListSuffixPattern = /\bclaims?\s+(?:remain|remains|are|is)\s+(?:blocked|unsupported|not\s+approved)\.?$/i;
const affirmativeStateAfterNegativeListPatterns = new Map([
  ["customer deployed", /(?:customer|socaas)\b.{0,32}\b(?:deployment\s+)?(?:is|was)\s+(?:active|confirmed|deployed|live|ready)\b/i],
  ["production ready", /production\b.{0,24}\b(?:is|was)\s+(?:active|live|ready)\b/i],
  ["runtime active", /runtime\b.{0,16}\b(?:is|was)\s+active\b/i],
  ["signal observed", /signal\b.{0,16}\b(?:is|was)\s+observed\b/i],
  ["public safe", /public[\s_-]*safe\b.{0,24}\b(?:is|was)\s+(?:approved|confirmed|established|ready|released)\b/i],
  ["AI authority", /ai\b.{0,32}\b(?:(?:is|was)\s+approved|approval\s+(?:is\s+)?granted|authority\s+(?:is\s+)?enabled)\b/i],
  ["analyst authority", /analyst\b.{0,32}\b(?:(?:is|was)\s+approved|approval\s+(?:is\s+)?granted|authority\s+(?:is\s+)?enabled)\b/i],
  ["final authorization", /final\s+authori[sz]ation\b.{0,16}\b(?:is|was)?\s*(?:approved|complete|granted|received)\b/i],
  ["case closure", /(?:case\s+closure\s+(?:(?:is|was)\s+)?(?:approved|complete|granted|received)|case\b.{0,16}\b(?:is|was)\s+closed)\b/i],
]);
const exactBlockedClaimValues = new Set([
  "runtime proof",
  "signal proof",
  "production readiness",
  "customer deployment",
  "public-safe runtime proof",
  "ai approval",
  "analyst approval",
  "website-as-proof",
]);

function affirmativeStringClaims(value, path) {
  const normalized = securityScanText(value);
  if (normalized === exactProofCeiling) return [];
  if (
    ["blocked_claims", "not_claiming"].includes(path.at(-2)) &&
    exactBlockedClaimValues.has(normalized.trim().toLocaleLowerCase("en-US"))
  ) {
    return [];
  }
  const issues = [];
  for (const segment of normalized.split(/(?:[;:\/!?\r\n]+|[—–]+|\b(?:but|however|although|yet|while|whereas)\b)/i)) {
    const intro = negativeListIntroPattern.exec(segment);
    const suffix = negativeListSuffixPattern.exec(segment);
    if (suffix) {
      const boundedPrefix = `, ${segment.slice(0, suffix.index)}`;
      for (const [label, pattern] of affirmativeStateAfterNegativeListPatterns) {
        if (pattern.test(boundedPrefix)) issues.push(label);
      }
      continue;
    }
    if (intro) {
      const tail = segment.slice(intro.index + intro[0].length);
      for (const [label, pattern] of affirmativeStateAfterNegativeListPatterns) {
        if (pattern.test(tail)) issues.push(label);
      }
      continue;
    }
    for (const clause of segment.split(",")) {
      for (const [label, pattern] of affirmativeStateAfterNegativeListPatterns) {
        const match = pattern.exec(clause);
        if (match && !localNegationPattern.test(clause.slice(0, match.index))) {
          issues.push(label);
        }
      }
      if (localNegationPattern.test(clause)) continue;
      for (const [label, pattern] of affirmativeClaimPatterns) {
        if (pattern.test(clause)) issues.push(label);
      }
    }
  }
  return [...new Set(issues)];
}

function recursiveSecurityIssues(value, path = []) {
  const issues = [];
  const normalizedPath = normalizedAuthorityPath(path);
  const exactBoundedPublicSafeDetail =
    normalizedPath.at(-2) === "publicsafe" &&
    normalizedPath.at(-1) === "detail" &&
    value === "Public-safe runtime proof is not promoted by this website data plane.";
  if (
    (value === null || typeof value !== "object") &&
    pathCarriesPromotionContext(path) &&
    !exactBoundedPublicSafeDetail &&
    !explicitlyBoundedAuthorityValue(value)
  ) {
    issues.push(`${path.join(".") || "<root>"} attempts authority promotion.`);
  }
  if (typeof value === "string") {
    const pathProblem = pathIssue(value);
    if (pathProblem) issues.push(`${path.join(".") || "<root>"} contains ${pathProblem}.`);
    const decodedUpper = securityScanText(value).toUpperCase();
    for (const token of promotionTokens) {
      if (decodedUpper.includes(token)) issues.push(`${path.join(".")} contains unauthorized promotion token ${token}.`);
    }
    for (const token of privateTokens) {
      if (decodedUpper.includes(token)) issues.push(`${path.join(".")} contains private marker ${token}.`);
    }
    const decodedNormalized = securityScanText(value)
      .toLocaleLowerCase("en-US")
      .replace(/[^a-z0-9]/g, "");
    for (const token of privateNormalizedTokens) {
      if (decodedNormalized.includes(token)) {
        issues.push(`${path.join(".") || "<root>"} contains private marker ${token}.`);
      }
    }
    for (const claim of affirmativeStringClaims(value, path)) {
      issues.push(`${path.join(".") || "<root>"} contains unauthorized ${claim} wording.`);
    }
    return issues;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => issues.push(...recursiveSecurityIssues(item, [...path, String(index)])));
    return issues;
  }
  if (value && typeof value === "object") {
    for (const [childKey, childValue] of Object.entries(value)) {
      const normalizedChildKey = decodeRepeated(childKey)
        .normalize("NFKC")
        .toLocaleLowerCase("en-US")
        .replace(/[^a-z0-9]/g, "");
      const normalizedAncestry = normalizedAuthorityPath(path);
      const cumulativeKeys = [normalizedChildKey];
      cumulativeKeys.push(
        ...normalizedAncestry
          .filter((segment) => sensitiveAuthoritySegments.has(segment))
          .map((segment) => `${segment}${normalizedChildKey}`),
      );
      cumulativeKeys.push(
        ...normalizedAncestry
          .filter((segment) =>
            promotionKeyNames.has(segment) ||
            authorityKeyPattern.test(segment) ||
            compositionalPromotionKey(segment))
          .map((segment) => `${segment}${normalizedChildKey}`),
      );
      const scalarAuthorityState =
        childValue === null || typeof childValue !== "object";
      const exactPromotionKey = cumulativeKeys.some(
        (candidate) => promotionKeyNames.has(candidate) ||
          authorityKeyPattern.test(candidate),
      );
      const promotionKey = scalarAuthorityState && (
        exactPromotionKey || (
          cumulativeKeys.some(compositionalPromotionKey) &&
          affirmativeAuthorityValue(childValue)
        )
      );
      const allowedAuthorityKey =
        allowedAuthorityKeyNames.has(normalizedChildKey) &&
        !cumulativeKeys.some((candidate) => authorityKeyPattern.test(candidate));
      const boundedPublicSafeObject =
        normalizedChildKey === "publicsafe" &&
        childValue !== null &&
        typeof childValue === "object" &&
        !Array.isArray(childValue) &&
        Object.keys(childValue).every((key) => ["raw", "label", "value", "count", "detail"].includes(key)) &&
        childValue.raw === "NOT_PUBLIC_SAFE" &&
        childValue.label === "Not public-safe" &&
        (childValue.value === undefined || childValue.value === false) &&
        (childValue.count === undefined || childValue.count === 0) &&
        (
          childValue.detail === undefined ||
          childValue.detail === "Public-safe runtime proof is not promoted by this website data plane."
        );
      if (
        promotionKey &&
        !allowedAuthorityKey &&
        !boundedPublicSafeObject &&
        !(
          explicitlyBoundedAuthorityValue(childValue)
        )
      ) {
        issues.push(`${[...path, childKey].join(".")} attempts authority promotion.`);
      }
      issues.push(...recursiveSecurityIssues(childValue, [...path, childKey]));
    }
  }
  return issues;
}

function strictJsonSelfTest() {
  const duplicateCases = [
    ["top-level revision", '{"revision":"a","revision":"b"}', "revision"],
    ["nested owner", '{"source":{"authority_owner":"good","authority_owner":"spoofed"}}', "authority_owner"],
    ["nested path", '{"source":{"path":"safe.json","path":"../private.json"}}', "path"],
    ["nested claim", '{"metadata":{"claim_status":"blocked","claim_status":"PUBLIC_SAFE_APPROVED"}}', "claim_status"],
    ["nested status", '{"metadata":{"status":"blocked","status":"RUNTIME_ACTIVE"}}', "status"],
    ["deep array object", '{"items":[{"owner":"good","owner":"spoofed"}]}', "owner"],
    ["escaped-key alias", '{"owner":"good","\\u006fwner":"spoofed"}', "owner"],
    ["case-folded key alias", '{"owner":"good","OWNER":"spoofed"}', "OWNER"],
    ["compatibility key alias", '{"owner":"good","ｏｗｎｅｒ":"spoofed"}', "ｏｗｎｅｒ"],
    ["encoded key alias", '{"owner":"good","%6fwner":"spoofed"}', "%6fwner"],
    ["double-encoded key alias", '{"owner":"good","%256fwner":"spoofed"}', "%256fwner"],
  ];
  for (const [name, text, key] of duplicateCases) {
    try {
      strictJsonParse(text, `controlled-${name}`);
      fail(`strict JSON self-test accepted duplicate ${name}.`);
    } catch (error) {
      if (!String(error.message).includes(`duplicate object key "${key}"`)) {
        fail(`strict JSON self-test produced the wrong duplicate diagnostic for ${name}.`);
      }
    }
  }
  const valid = strictJsonParse(
    '{"revision":"a","source":{"authority_owner":"good","path":"safe.json"},"items":[1,true,null]}',
    "controlled-valid",
  );
  if (valid.revision !== "a" || valid.source.path !== "safe.json" || valid.items.length !== 3) {
    fail("strict JSON self-test rejected or corrupted a valid nested document.");
  }
}

function recursiveSecuritySelfTest() {
  const negationLaunderingAttacks = [
    "does not prove runtime, customer deployment is active",
    "does not prove runtime, AI authority is enabled",
    "does not prove runtime, analyst approval granted",
    "does not prove runtime, public safe is confirmed",
    "does not prove runtime, final authorization received",
    "does not prove runtime, case closure approved",
    "does not prove runtime and customer deployment is active",
    "does not prove runtime plus public safe is confirmed",
    "does not prove runtime though case closure is approved",
    "public\u200B safe is confirmed",
    "case\u200B closure approved",
    "AI\u200B authority is enabled",
    "runtime\u200B is active",
  ];
  const connectorIndependentAttacks = [
    ",", "and", "plus", "though", "because", "therefore", "meanwhile",
    "furthermore", "also", "nevertheless", "nonetheless", "except",
    "despite that", "in fact", "so", "consequently", "moreover", "then",
    "still", "even though",
  ].map((connector) =>
    connector === ","
      ? "does not prove runtime, customer deployment is active"
      : `does not prove runtime ${connector} customer deployment is active`);
  negationLaunderingAttacks.push(...connectorIndependentAttacks);
  negationLaunderingAttacks.push(
    "customer deployment is active and not a typo",
    "runtime is active and not simulated",
    "final authorization received and no objections",
    "AI authority is enabled and not revoked",
    "public safe is confirmed and not disputed",
    "case closure approved and not provisional",
    "production is ready and not delayed",
    "signal is observed and not inferred",
    "customer deployment is active without ambiguity",
  );
  for (const attack of negationLaunderingAttacks) {
    const issues = recursiveSecurityIssues({ detail: attack });
    if (!issues.some((issue) => issue.includes("contains unauthorized"))) {
      fail(`recursive security self-test allowed negation laundering ${JSON.stringify(attack)}.`);
    }
  }
  const combiningMarkTemplates = [
    "public{mark} safe is confirmed",
    "case{mark} closure approved",
    "runtime{mark} is active",
    "AI{mark} authority is enabled",
  ];
  for (const code of ["034F", "0301", "FE0F", "0000", "0008", "001F", "007F"]) {
    for (const template of combiningMarkTemplates) {
      const escapedAttack = template.replace("{mark}", `\\u${code}`);
      const nested = JSON.parse(
        `{"extensions":[{"notes":[{"deep":"${escapedAttack}"}]}]}`,
      );
      const attack = nested.extensions[0].notes[0].deep;
      const issues = recursiveSecurityIssues(nested);
      if (!issues.some((issue) => issue.includes("contains unauthorized"))) {
        fail(`recursive security self-test allowed combining-mark laundering ${JSON.stringify(attack)}.`);
      }
    }
  }
  const boundedNegativeLists = [
    "This does not prove runtime-active status, signal-observed status, production-ready status, " +
      "public-safe status, AI-approved status, analyst-approved status, final authorization, or case closure.",
    "Runtime, signal, public-safe, live IdP, production identity coverage, autonomous SOC, " +
      "AI-approved disposition, and analyst-approved disposition claims remain blocked.",
    "Café résumé – reviewer note.",
    "Reviewer 👩‍💻️ note.",
    "Reviewer note.\n\tStill bounded.",
  ];
  for (const boundedNegativeList of boundedNegativeLists) {
    if (recursiveSecurityIssues({ detail: boundedNegativeList }).length > 0) {
      fail(`recursive security self-test rejected bounded negative authority list ${JSON.stringify(boundedNegativeList)}.`);
    }
  }
  for (const key of [
    "detail",
    "statement",
    "not_claiming",
    "does_not_prove",
    "blocked_reason",
    "known_gaps",
    "no_proof_promotion_statement",
  ]) {
    for (const token of ["PUBLIC_SAFE_APPROVED", "PRIVATE_EVIDENCE"]) {
      const issues = recursiveSecurityIssues({ [key]: { nested: [{ value: token }] } });
      if (!issues.some((issue) => issue.includes(token))) {
        fail(`recursive security self-test allowed ${token} beneath ${key}.`);
      }
    }
  }
  for (const value of ["false", "blocked", "none", "not approved", "not authorized", "not public safe"]) {
    const issues = recursiveSecurityIssues({ final_authorization: value });
    if (issues.length > 0) {
      fail(`recursive security self-test rejected exact bounded authority value ${JSON.stringify(value)}.`);
    }
  }
  for (const value of [true, 1, { nested: "approved" }, ["approved"]]) {
    const issues = recursiveSecurityIssues({ final_authorization: value });
    if (!issues.some((issue) => issue.includes("attempts authority promotion"))) {
      fail(`recursive security self-test allowed non-bounded authority shape ${JSON.stringify(value)}.`);
    }
  }
  for (const key of [
    "public_safe",
    "public_safe_status",
    "production_ready",
    "customer_deployed",
    "socaas_deployed",
    "analyst_approved",
    "ai_approved",
    "case_closed",
    "ｐｕｂｌｉｃ＿ｓａｆｅ",
    "ＡＩ＿ｄｉｓｐｏｓｉｔｉｏｎ＿ａｕｔｈｏｒｉｔｙ",
  ]) {
    const issues = recursiveSecurityIssues({ [key]: true });
    if (!issues.some((issue) => issue.includes("attempts authority promotion"))) {
      fail(`recursive security self-test allowed promotion key ${JSON.stringify(key)}.`);
    }
  }
  for (const [key, value] of Object.entries({
    production_active: true,
    production_live: true,
    customer_deployment: true,
    socaas_deployment: true,
    runtime_status: "active",
    signal_status: "observed",
    approval_status: "approved",
    closure_status: "closed",
    case_status: "closed",
    public_safe_runtime: true,
    final_authorized: true,
    "%70roduction_live": true,
    "%2570roduction_live": true,
    "%72untime_status": "active",
    "%66inal_authorized": true,
  })) {
    const issues = recursiveSecurityIssues({ [key]: value });
    if (!issues.some((issue) => issue.includes("attempts authority promotion"))) {
      fail(`recursive security self-test allowed compositional key ${JSON.stringify(key)}.`);
    }
  }
  const splitAndDirectAttacks = [
    { runtime: { state: true } },
    { signal: { observed: true } },
    { public: { safe: true } },
    { approval: { status: true } },
    { production: { active: true } },
    { customer: { deployed: true } },
    { socaas: { deployed: true } },
    { ai: { authority: true } },
    { analyst: { approval: true } },
    { review: { disposition: "APPROVED" } },
    { final: { authorization: true } },
    { case: { closed: true } },
    { extensions: [{ final: { authorization: true } }] },
    { runtime: { metadata: { state: true } } },
    { final: { review: { authorization: true } } },
    { ai: { metadata: { authority: true } } },
    { customer: { review: { deployed: true } } },
    { review: { metadata: { disposition: "APPROVED" } } },
    { production_live: { enabled: true } },
    { ai_authority: { enabled: true } },
    { review_disposition: { approved: true } },
    { final_authorization: { granted: true } },
    { production_live: [true] },
    { ai_authority: ["APPROVED"] },
    { review_disposition: [true] },
    { final_authorization: [1] },
    { runtime: { metadata: { state: [true] } } },
    { runtime_state: true },
    { approval_state: true },
    { production_state: true },
    { customer_state: true },
    { socaas_state: true },
    { final_authority: true },
    { case_state: true },
  ];
  for (const attack of splitAndDirectAttacks) {
    const issues = recursiveSecurityIssues(attack);
    if (!issues.some((issue) => issue.includes("attempts authority promotion"))) {
      fail(`recursive security self-test allowed split/direct authority path ${JSON.stringify(attack)}.`);
    }
  }
  const splitAndDirectControls = [
    { runtime: { state: false } },
    { signal: { observed: false } },
    { public: { safe: "NOT_PUBLIC_SAFE" } },
    { approval: { status: "NOT_APPROVED" } },
    { production: { active: "BLOCKED" } },
    { customer: { deployed: false } },
    { socaas: { deployed: false } },
    { ai: { authority: false } },
    { analyst: { approval: "NOT_APPROVED" } },
    { review: { disposition: "NOT_APPROVED" } },
    { final: { authorization: "BLOCKED" } },
    { case: { closed: false } },
    { extensions: [{ final: { authorization: "BLOCKED" } }] },
    { runtime_state: false },
    { approval_state: "NOT_APPROVED" },
    { production_state: "BLOCKED" },
    { customer_state: false },
    { socaas_state: false },
    { final_authority: false },
    { case_state: false },
    { production_live: { enabled: false } },
    { ai_authority: { enabled: false } },
    { review_disposition: { approved: "NOT_APPROVED" } },
    { final_authorization: { granted: "BLOCKED" } },
    { production_live: [false] },
    { ai_authority: ["BLOCKED"] },
    { review_disposition: ["NOT_APPROVED"] },
    { final_authorization: ["BLOCKED"] },
    { runtime: { metadata: { state: [false] } } },
  ];
  for (const control of splitAndDirectControls) {
    const issues = recursiveSecurityIssues(control);
    if (issues.length > 0) {
      fail(`recursive security self-test rejected bounded authority path ${JSON.stringify(control)}.`);
    }
  }
  const ownedBoundedMetadata = {
    metrics: {
      blocked_claims: { authority: "proof-owned blocked boundary" },
      public_safe_count: { label: "Not public-safe", value: 0 },
    },
    source_authority_owner: "HawkinsOperations/hawkinsoperations-proof",
    source_authority_role: "proof and claim authority",
    runtime_truth_spine: {
      runtime_truth: { state: "RUNTIME_EVIDENCE_VERIFIED_PRIVATE" },
    },
  };
  const ownedBoundedIssues = recursiveSecurityIssues(ownedBoundedMetadata);
  if (ownedBoundedIssues.length > 0) {
    fail(`recursive security self-test rejected bounded source metadata: ${ownedBoundedIssues.join("; ")}`);
  }
  for (const phrase of [
    "runtime is active",
    "signal was observed",
    "production is ready",
    "customer environment deployed",
    "AI disposition authority enabled",
    "analyst approval granted",
    "final authorization received",
    "case was closed",
    "website is proof",
    "green CI is approval",
  ]) {
    const issues = recursiveSecurityIssues({ detail: { nested: [{ value: phrase }] } });
    if (!issues.some((issue) => issue.includes("unauthorized"))) {
      fail(`recursive security self-test allowed affirmative wording ${JSON.stringify(phrase)}.`);
    }
  }
  const crossClause = recursiveSecurityIssues({
    detail: "Runtime is not active, but customer environment deployed.",
  });
  if (!crossClause.some((issue) => issue.includes("customer deployed"))) {
    fail("recursive security self-test allowed cross-clause negation laundering.");
  }
  for (const marker of [
    "raw_wazuh",
    "private_evidence",
    "endpoint_log",
    "generated_password",
    "private_payload",
    "raw-alert",
    "%72aw_wazuh",
    "%2572aw_wazuh",
  ]) {
    const issues = recursiveSecurityIssues({ detail: marker });
    if (!issues.some((issue) => issue.includes("private marker"))) {
      fail(`recursive security self-test allowed private marker ${JSON.stringify(marker)}.`);
    }
  }
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

function verifyContentIdentity(record, repo, path, issues) {
  const repoDir = localRepoPath(repo);
  if (!repoDir) {
    issues.push(`${String(repo)}: non-canonical repository owner rejected before filesystem access.`);
    return;
  }
  if (!existsSync(repoDir)) {
    issues.push(`${repo}: required sibling checkout is missing.`);
    return;
  }
  const origin = storedOrigin(repoDir);
  if (normalizeOrigin(origin) !== normalizeOrigin(expectedOrigin(repo))) issues.push(`${repo}: canonical repository origin mismatch.`);
  const currentHead = runGit(repoDir, ["rev-parse", "HEAD"]);
  if (!currentHead) {
    issues.push(`${repo}: current checked HEAD is unavailable.`);
    return;
  }
  const resolvedRef = record.resolved_ref ?? record.source_resolved_ref;
  if (resolvedRef !== undefined && resolvedRef !== record.source_observed_head_sha) {
    issues.push(`${repo}/${path}: resolved source ref must equal the selected immutable revision.`);
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
  const sourceRevisionMatches = revisionMatches(
    repo,
    repoDir,
    record.source_observed_head_sha,
    currentHead,
    path,
    runGit(repoDir, ["rev-parse", `${currentHead}:${path}`]),
    "source",
  );
  if (!sourceRevisionMatches) {
    issues.push(
      `${repo}/${path}: selected source revision must equal current HEAD, be its ancestor, or have the exact current repository tree.`,
    );
  }
  const currentBlob = runGit(repoDir, ["rev-parse", `${currentHead}:${path}`]);
  const observedBlob = runGit(repoDir, ["rev-parse", `${record.source_observed_head_sha}:${path}`]);
  const generationObservedHead = record.current_observed_head_sha;
  if (!/^[a-f0-9]{40}$/.test(generationObservedHead ?? "") ||
      runGit(repoDir, ["cat-file", "-t", generationObservedHead]) !== "commit") {
    issues.push(`${repo}/${path}: generation-time current observation must be an available immutable commit.`);
  } else if (!revisionMatches(
    repo,
    repoDir,
    generationObservedHead,
    currentHead,
    path,
    runGit(repoDir, ["rev-parse", `${currentHead}:${path}`]),
    "current",
  )) {
    issues.push(`${repo}/${path}: generation-time current observation is not safely related to current HEAD.`);
  }
  const generationObservedBlob = runGit(repoDir, ["rev-parse", `${generationObservedHead}:${path}`]);
  if (!currentBlob) {
    issues.push(`${repo}/${path}: authoritative path is missing from current checked tree.`);
    return;
  }
  if (record.authoritative_git_blob_sha !== currentBlob || observedBlob !== currentBlob) {
    issues.push(`${repo}/${path}: authoritative Git blob does not equal the blob in the checked current tree.`);
  }
  if (generationObservedBlob !== currentBlob) {
    issues.push(`${repo}/${path}: generation-time current observation has different authoritative content.`);
  }
  const currentText = committedText(repoDir, currentHead, path);
  const expectedFingerprint = currentText === null ? null : semanticFingerprint(currentText, path);
  if (record.authoritative_content_fingerprint !== expectedFingerprint || record.source_fingerprint_sha256 !== expectedFingerprint) {
    issues.push(`${repo}/${path}: normalized semantic fingerprint does not match current authoritative content.`);
  }
  const expectedCommitTime = runGit(repoDir, ["show", "-s", "--format=%cI", record.source_observed_head_sha]);
  if (record.freshness_observation !== undefined &&
      record.freshness_observation?.source_commit_time !== expectedCommitTime) {
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
      verifyContentIdentity(source, source.repo, source.path, issues);
    }
  }

  for (const metric of candidate.metric_list ?? []) {
    verifyContentIdentity(metric, metric.source_repo, metric.source_path, issues);
  }
  const generatorHead = candidate.generator_observed_head_sha;
  if (candidate.generator_commit !== generatorHead) issues.push("generator_commit must equal generator_observed_head_sha.");
  const currentWebsiteHead = runGit(root, ["rev-parse", "HEAD"]);
  if (runGit(root, ["cat-file", "-t", generatorHead]) !== "commit") {
    issues.push("generator observed head must be an available immutable reviewed revision.");
  }
  if (!revisionMatches(
    "HawkinsOperations/hawkinsoperations-website",
    root,
    generatorHead,
    currentWebsiteHead,
    "scripts/generate-public-status.mjs",
    runGit(root, ["rev-parse", `${currentWebsiteHead}:scripts/generate-public-status.mjs`]),
    "generator",
  )) {
    issues.push("generator observed head must equal current HEAD, be its ancestor, or have the exact current repository tree.");
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

if (process.argv.includes("--vocabulary-self-test")) {
  for (const issue of trackedVocabularyFindings()) fail(issue);
  trackedVocabularySelfTest();
  if (failures.length > 0) {
    console.error(`Tracked-source vocabulary verification failed:\n${[...new Set(failures)].map((line) => `- ${line}`).join("\n")}`);
    process.exit(1);
  }
  console.log("Tracked-source vocabulary verification passed.");
  process.exit(0);
}

for (const path of [jsonPath, tsPath, schemaPath, manifestPath]) {
  if (!existsSync(path)) fail(`Missing required public-status file: ${path}`);
}

let status = null;
let schema = null;
let manifest = null;
try {
  status = readStrictJson(jsonPath);
  schema = readStrictJson(schemaPath);
  manifest = readStrictJson(manifestPath);
} catch (error) {
  fail(`Public status, schema, or source manifest is not valid JSON: ${error.message}`);
}
const tsSource = existsSync(tsPath) ? readFileSync(tsPath, "utf8") : "";

if (status && schema && manifest) {
  for (const issue of semanticIssues(status, { schema, manifest })) fail(issue);
  if (!tsSource.replace(/\r\n?/g, "\n").includes(JSON.stringify(status, null, 2).replace(/\r\n?/g, "\n"))) {
    fail("generated TypeScript snapshot must reproduce public-status JSON exactly.");
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
}

const selfTestModes = new Set(process.argv.slice(2));
for (const issue of trackedVocabularyFindings()) fail(issue);
if (
  status &&
  schema &&
  manifest &&
  ["--self-test", "--owner-self-test-only", "--source-checkout-test", "--freshness-reachability-test", "--dirty-provenance-test", "--nested-claim-test", "--strict-json-test", "--eol-self-test"]
    .some((mode) => selfTestModes.has(mode))
) {
  if (selfTestModes.has("--self-test")) {
    trackedVocabularySelfTest();
  }
  if (selfTestModes.has("--self-test") || selfTestModes.has("--strict-json-test")) {
    strictJsonSelfTest();
  }
  if (selfTestModes.has("--self-test") || selfTestModes.has("--nested-claim-test")) {
    recursiveSecuritySelfTest();
  }
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
      name: "branch-name substitution",
      mutate: (value) => { value.sources[0].resolved_ref = "main"; },
      expected: "resolved source ref must equal the selected immutable revision",
    },
    {
      name: "future generation-time observation",
      mutate: (value) => { value.sources[0].current_observed_head_sha = "f".repeat(40); },
      expected: "generation-time current observation must be an available immutable commit",
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
    "--source-checkout-test": [
      "wrong canonical source",
      "unreachable revision",
      "branch-name substitution",
      "future generation-time observation",
    ],
    "--freshness-reachability-test": ["unreachable revision", "future observation", "stale labeled fresh", "source commit time from branch tip"],
    "--dirty-provenance-test": ["dirty source fingerprint substitution", "dirty generator fingerprint substitution"],
    "--nested-claim-test": ["unknown nested shape", "nested public-safe laundering", "nested runtime laundering"],
    "--strict-json-test": [],
    "--eol-self-test": [],
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
    const embeddedJson = JSON.stringify({ alpha: "beta", nested: { count: 1 } }, null, 2);
    const embeddedTsCrlf = `export const STATUS = ${embeddedJson} as const;\n`.replace(/\n/g, "\r\n");
    if (!embeddedTsCrlf.replace(/\r\n?/g, "\n").includes(embeddedJson.replace(/\r\n?/g, "\n"))) {
      fail("CRLF TypeScript and LF JSON generated-pair parity failed.");
    }
  }
  if (selfTestModes.has("--self-test") || selfTestModes.has("--owner-self-test-only")) {
    storedOriginRewriteSelfTest();
    const expected = normalizeOrigin(expectedOrigin("HawkinsOperations/hawkinsoperations-proof"));
    for (const accepted of [
      "https://github.com/HawkinsOperations/hawkinsoperations-proof",
      "https://github.com/HawkinsOperations/hawkinsoperations-proof.git",
      "git@github.com:HawkinsOperations/hawkinsoperations-proof.git",
      "ssh://git@github.com/HawkinsOperations/hawkinsoperations-proof",
    ]) {
      if (normalizeOrigin(accepted) !== expected) fail(`origin normalization rejected canonical transport form: ${accepted}`);
    }
    for (const spoofed of [
      "https://github.com/HawkinsOperations/hawkinsoperations-proof-attacker.git",
      "https://github.com/HawkinsOperations/hawkinsoperations-proof.git.attacker",
      "https://github.com/HawkinsOperations-attacker/hawkinsoperations-proof.git",
      "https://github.com/HawkinsOperations/hawkinsoperations-proof/attacker.git",
    ]) {
      if (normalizeOrigin(spoofed) === expected) fail(`origin normalization accepted owner or repository suffix spoof: ${spoofed}`);
    }
  }
  if (selfTestModes.has("--self-test") || selfTestModes.has("--source-checkout-test")) {
    revisionRelationshipSelfTest();
    if (!(status.sources ?? []).some(
      (source) => source.current_observed_head_sha !== source.source_observed_head_sha,
    )) {
      fail("content identity self-test requires a distinct generation-time current observation.");
    }
  }
}

if (failures.length > 0) {
  console.error(`Public status verification failed:\n${[...new Set(failures)].map((line) => `- ${line}`).join("\n")}`);
  process.exit(1);
}

console.log("Public status verification passed.");
