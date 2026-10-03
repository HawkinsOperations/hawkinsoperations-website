import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, appendFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync, chmodSync, readdirSync, statSync, realpathSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";
import assert from "node:assert/strict";
import { readStrictJson } from "./strict-json.mjs";
import { sanitizedGitEnv } from "./git-source-identity.mjs";

export const SOURCE_PATHS = Object.freeze({
  "HawkinsOperations/.github": ["architecture/REPO_AUTHORITY_MAP.md"],
  "HawkinsOperations/hoxline": ["examples/gauntlet/ho-det-001-full-loop-run-v0.json"],
  "HawkinsOperations/hawkinsoperations-detections": ["detections/DETECTION_PROMOTION_MATRIX.yml"],
  "HawkinsOperations/hawkinsoperations-validation": ["activity/detection-activity-ledger-v1.json"],
  "HawkinsOperations/hawkinsoperations-platform": ["contracts/reviewer-metrics-pipeline-v1-state.json"],
  "HawkinsOperations/hawkinsoperations-proof": ["proof/records/reviewer-metrics-pipeline-v1-summary.json", "proof/records/lifetime-case-ledger-v1-public-summary.json"],
  "HawkinsOperations/hawkinsoperations-website": ["src/data/governanceSaves.ts"],
});
const WEBSITE = "HawkinsOperations/hawkinsoperations-website";
const SHA = /^[a-f0-9]{40}$/;
export function git(dir, args, options = {}) {
  return execFileSync("git", ["-c", "safe.directory=" + resolve(dir).replaceAll("\\", "/"), "-C", dir, ...args], {
    encoding: "utf8", env: sanitizedGitEnv(), stdio: ["pipe", "pipe", "pipe"], ...options,
  }).trim();
}
export function readSourceManifest(websiteRoot) {
  return validateManifest(readStrictJson(join(websiteRoot, "config/public-status-source-manifest-v1.json")));
}
export function validateManifest(manifest) {
  assert.equal(manifest?.manifest_version, "public-status-source-manifest-v1", "Invalid source manifest version.");
  assert.equal(manifest?.observation_kind, "reviewed_immutable_commit", "Source selection must be immutable.");
  assert.deepEqual(Object.keys(manifest).sort(), ["generated_at", "manifest_version", "observation_kind", "repositories"], "Unsupported source manifest fields.");
  assert.ok(typeof manifest.generated_at === "string" && new Date(manifest.generated_at).toISOString() === manifest.generated_at, "Invalid snapshot timestamp.");
  assert.ok(Date.parse(manifest.generated_at) <= Date.now(), "Snapshot timestamp must not be in the future.");
  assert.deepEqual(manifest.repositories?.map(entry => entry.repository), Object.keys(SOURCE_PATHS), "Source manifest requires the exact seven canonical repositories in order.");
  for (const entry of manifest.repositories) {
    assert.deepEqual(Object.keys(entry).sort(), ["authoritative_paths", "repository", "revision"], "Unsupported source entry fields.");
    assert.match(entry.revision, SHA, "Source revision must be an immutable SHA, never a branch or fallback.");
    assert.deepEqual(Object.keys(entry.authoritative_paths), SOURCE_PATHS[entry.repository], "Wrong authoritative source paths.");
    for (const blob of Object.values(entry.authoritative_paths)) assert.match(blob, SHA, "Invalid authoritative blob identity.");
  }
  return manifest;
}
export function verifySourceCheckouts(websiteRoot, manifest = readSourceManifest(websiteRoot)) {
  validateManifest(manifest);
  const checked = new Map();
  for (const entry of manifest.repositories) {
    const name = entry.repository.slice("HawkinsOperations/".length);
    const dir = join(websiteRoot, "..", name);
    assert.ok(existsSync(join(dir, ".git")), "Missing source checkout: " + entry.repository + "; checkout every source at its manifest SHA beneath the shared organization root.");
    try {
      const normalizeDir = value => process.platform === "win32" ? realpathSync.native(value).toLowerCase() : realpathSync(value);
      assert.equal(normalizeDir(git(dir, ["rev-parse", "--show-toplevel"])), normalizeDir(dir), "Source checkout topology must resolve to its declared sibling directory.");
      assert.equal(normalizeDir(git(dir, ["rev-parse", "--absolute-git-dir"])), normalizeDir(join(dir, ".git")), "Source Git metadata must remain in its declared checkout.");
      const origins = git(dir, ["config", "--local", "--get-all", "remote.origin.url"]).split("\n");
      const normalized = origins.map(value => value.replace(/^git@github.com:/, "https://github.com/").replace(/^ssh:\/\/git@github.com\//, "https://github.com/").replace(/\.git$/, "").toLowerCase());
      assert.deepEqual(normalized, ["https://github.com/" + entry.repository.toLowerCase()], "Wrong or ambiguous origin: " + entry.repository);
      assert.equal(git(dir, ["cat-file", "-t", entry.revision]), "commit", "Source revision is unreachable.");
      const head = git(dir, ["rev-parse", "HEAD"]);
      if (entry.repository === WEBSITE) {
        git(dir, ["merge-base", "--is-ancestor", entry.revision, head]);
      } else {
        assert.equal(head, entry.revision, "Source checkout SHA mismatch: " + entry.repository);
      }
      const paths = SOURCE_PATHS[entry.repository];
      git(dir, ["diff", "--quiet", "HEAD", "--", ...paths]);
      for (const sourcePath of paths) {
        const selectedBlob = git(dir, ["rev-parse", entry.revision + ":" + sourcePath]);
        assert.equal(git(dir, ["cat-file", "-t", selectedBlob]), "blob", "Authority path must be a file.");
        assert.equal(selectedBlob, entry.authoritative_paths[sourcePath], "Authoritative blob identity drift: " + entry.repository + ":" + sourcePath);
        assert.equal(git(dir, ["rev-parse", head + ":" + sourcePath]), selectedBlob, "Event head changed a selected authority input; review and update its content anchor.");
        const committed = execFileSync("git", ["-c", "safe.directory=" + resolve(dir).replaceAll("\\", "/"), "-C", dir, "show", head + ":" + sourcePath], { encoding: "utf8", env: sanitizedGitEnv(), stdio: ["pipe", "pipe", "pipe"] });
        assert.equal(readFileSync(join(dir, sourcePath), "utf8").replace(/\r\n?/g, "\n"), committed.replace(/\r\n?/g, "\n"), "Dirty source content (including assume-unchanged/skip-worktree): " + entry.repository + ":" + sourcePath);
      }
      checked.set(entry.repository, { ...entry, dir, head });
    } catch (error) {
      throw new Error("Source checkout rejected: " + entry.repository + "; " + error.message + "; use the exact reviewed manifest source set; no default-branch fallback.");
    }
  }
  return checked;
}
export function committedSource(checked, repository, sourcePath) {
  const source = checked.get(repository);
  assert.ok(source && Object.hasOwn(source.authoritative_paths, sourcePath), "Unreviewed authoritative path: " + repository + ":" + sourcePath);
  return git(source.dir, ["show", source.revision + ":" + sourcePath]);
}
function selfTest() {
  const fixtureRoot = mkdtempSync(join(tmpdir(), "ho-public-status-sources-"));
  const websiteRoot = join(fixtureRoot, "hawkinsoperations-website");
  const manifest = { manifest_version: "public-status-source-manifest-v1", observation_kind: "reviewed_immutable_commit", generated_at: "2026-10-02T12:00:00.000Z", repositories: [] };
  try {
    for (const [repository, paths] of Object.entries(SOURCE_PATHS)) {
      const dir = join(fixtureRoot, repository.slice("HawkinsOperations/".length));
      mkdirSync(dir);
      git(dir, ["init"]);
      git(dir, ["config", "user.email", "fixture@example.invalid"]);
      git(dir, ["config", "user.name", "Public status fixture"]);
      git(dir, ["remote", "add", "origin", "https://github.com/" + repository + ".git"]);
      for (const sourcePath of paths) {
        mkdirSync(join(dir, sourcePath, ".."), { recursive: true });
        writeFileSync(join(dir, sourcePath), "reviewed source\n");
      }
      git(dir, ["add", "--", ...paths]);
      git(dir, ["commit", "-m", "Reviewed fixture"]);
      manifest.repositories.push({ repository, revision: git(dir, ["rev-parse", "HEAD"]), authoritative_paths: Object.fromEntries(paths.map(sourcePath => [sourcePath, git(dir, ["rev-parse", "HEAD:" + sourcePath])])) });
    }
    verifySourceCheckouts(websiteRoot, manifest);
    const badManifest = (change, pattern) => { const clone = structuredClone(manifest); change(clone); assert.throws(() => verifySourceCheckouts(websiteRoot, clone), pattern); };
    badManifest(m => m.generated_at = "2099-01-01T00:00:00.000Z", /must not be in the future/);
    badManifest(m => m.repositories.pop(), /exact seven/);
    badManifest(m => m.repositories[0].repository = "HawkinsOperations/attacker", /exact seven/);
    badManifest(m => m.repositories[0].revision = "main", /immutable SHA/);
    badManifest(m => m.repositories[0].revision = "a".repeat(40), /rejected/);
    badManifest(m => m.repositories[0].authoritative_paths = { "README.md": "a".repeat(40) }, /authoritative source paths/);
    badManifest(m => m.repositories[0].authoritative_paths[SOURCE_PATHS[m.repositories[0].repository][0]] = "a".repeat(40), /blob identity drift/);
    const sourceDir = join(fixtureRoot, ".github");
    const externalWorktree = join(fixtureRoot, "external-worktree");
    mkdirSync(externalWorktree);
    git(sourceDir, ["config", "core.worktree", externalWorktree]);
    assert.throws(() => verifySourceCheckouts(websiteRoot, manifest), /checkout topology/);
    git(sourceDir, ["config", "--unset", "core.worktree"]);
    git(sourceDir, ["remote", "set-url", "origin", "https://github.com/HawkinsOperations/attacker.git"]);
    assert.throws(() => verifySourceCheckouts(websiteRoot, manifest), /Wrong or ambiguous origin/);
    git(sourceDir, ["remote", "set-url", "origin", "https://github.com/HawkinsOperations/.github.git"]);
    writeFileSync(join(sourceDir, SOURCE_PATHS["HawkinsOperations/.github"][0]), "dirty source\n");
    assert.throws(() => verifySourceCheckouts(websiteRoot, manifest), /rejected/);
    git(sourceDir, ["update-index", "--assume-unchanged", "--", ...SOURCE_PATHS["HawkinsOperations/.github"]]);
    assert.throws(() => verifySourceCheckouts(websiteRoot, manifest), /Dirty source content/);
    git(sourceDir, ["update-index", "--no-assume-unchanged", "--", ...SOURCE_PATHS["HawkinsOperations/.github"]]);
    git(sourceDir, ["add", "--", ...SOURCE_PATHS["HawkinsOperations/.github"]]);
    assert.throws(() => verifySourceCheckouts(websiteRoot, manifest), /rejected/);
    git(sourceDir, ["commit", "-m", "Newer unselected source"]);
    assert.throws(() => verifySourceCheckouts(websiteRoot, manifest), /SHA mismatch/);
    git(websiteRoot, ["commit", "--allow-empty", "-m", "Rendering descendant"]);
    const current = structuredClone(manifest);
    current.repositories[0].revision = git(sourceDir, ["rev-parse", "HEAD"]);
    current.repositories[0].authoritative_paths[SOURCE_PATHS["HawkinsOperations/.github"][0]] = git(sourceDir, ["rev-parse", "HEAD:" + SOURCE_PATHS["HawkinsOperations/.github"][0]]);
    verifySourceCheckouts(websiteRoot, current);
    writeFileSync(join(websiteRoot, SOURCE_PATHS[WEBSITE][0]), "changed website input\n");
    git(websiteRoot, ["add", "--", ...SOURCE_PATHS[WEBSITE]]);
    git(websiteRoot, ["commit", "-m", "Changed rendering input"]);
    assert.throws(() => verifySourceCheckouts(websiteRoot, current), /changed a selected authority input/);
    const isolatedWebsite = join(fixtureRoot, "isolated", "hawkinsoperations-website");
    mkdirSync(isolatedWebsite, { recursive: true });
    assert.throws(() => verifySourceCheckouts(isolatedWebsite, manifest), /Missing source checkout/);
    console.log("Source checkout hostile tests passed (missing, wrong owner/path/blob, stale/unreachable SHA, unstaged/staged dirt, descendant input drift).");
  } finally {
    assert.ok(resolve(fixtureRoot).startsWith(resolve(tmpdir(), "ho-public-status-sources-")), "Fixture cleanup must remain in the intended temporary route.");
    const writable = dir => { for (const name of readdirSync(dir)) { const file = join(dir, name); if (statSync(file).isDirectory()) writable(file); else chmodSync(file, 0o600); } };
    writable(fixtureRoot);
    try { rmSync(fixtureRoot, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 }); }
    catch (error) {
      if (process.platform !== "win32" || !["ENOTEMPTY", "EPERM"].includes(error.code)) throw error;
      console.warn("ENVIRONMENT_ONLY: Windows could not clean the attributed disposable source fixture; all test assertions still apply. Fixture retained at " + fixtureRoot);
    }
  }
}
function main() {
  if (process.argv.includes("--self-test")) return selfTest();
  const websiteRoot = process.cwd();
  const manifest = readSourceManifest(websiteRoot);
  if (process.argv.includes("--github-output")) {
    assert.ok(process.env.GITHUB_OUTPUT, "GITHUB_OUTPUT required.");
    appendFileSync(process.env.GITHUB_OUTPUT, manifest.repositories.map(entry => entry.repository.split("/")[1].replaceAll("-", "_").replace(".github", "org") + "=" + entry.revision).join("\n") + "\n");
  } else {
    verifySourceCheckouts(websiteRoot, manifest);
    console.log("Exact reviewed source checkouts verified.");
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
