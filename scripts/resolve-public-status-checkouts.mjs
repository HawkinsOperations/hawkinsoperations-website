import fs from "node:fs";
import { strict as assert } from "node:assert";
import { pathToFileURL } from "node:url";
import { strictJsonParse } from "./strict-json.mjs";

const REPOSITORY_OUTPUTS = Object.freeze({
  "HawkinsOperations/.github": "org",
  "HawkinsOperations/hoxline": "hoxline",
  "HawkinsOperations/hawkinsoperations-detections": "detections",
  "HawkinsOperations/hawkinsoperations-validation": "validation",
  "HawkinsOperations/hawkinsoperations-platform": "platform",
  "HawkinsOperations/hawkinsoperations-proof": "proof",
});

const SHA_PATTERN = /^[a-f0-9]{40}$/;

function uniqueEntries(entries, key, label) {
  if (!Array.isArray(entries) || entries.length !== 7) {
    throw new Error(`${label} must contain exactly seven repositories.`);
  }
  const byRepository = Object.fromEntries(entries.map((entry) => [entry?.[key], entry]));
  if (Object.keys(byRepository).length !== 7 || Object.hasOwn(byRepository, "undefined")) {
    throw new Error(`${label} repository identities must be present and unique.`);
  }
  return byRepository;
}

export function resolveReviewedCheckouts({
  contentManifest,
  reviewedManifest,
  commandManifestSha,
}) {
  if (contentManifest?.manifest_version !== "public-status-source-manifest-v1" ||
      contentManifest?.observation_kind !== "reviewed_immutable_commit") {
    throw new Error("Content manifest identity or observation kind is invalid.");
  }
  if (reviewedManifest?.schema !== "hawkinsoperations-convergence-source-manifest-v1" ||
      reviewedManifest?.constraints?.exact_repository_count !== 7) {
    throw new Error("Reviewed-head manifest identity or repository count is invalid.");
  }
  if (!SHA_PATTERN.test(commandManifestSha ?? "")) {
    throw new Error("Command-center manifest SHA must be an immutable commit identity.");
  }

  const contentEntries = uniqueEntries(
    contentManifest.repositories,
    "repository",
    "Content manifest",
  );
  const reviewedEntries = uniqueEntries(
    reviewedManifest.repositories,
    "canonical_repository",
    "Reviewed-head manifest",
  );
  const commandEntry = reviewedEntries["HawkinsOperations/.github"];
  if (commandEntry?.revision_source !== "github_event_sha" ||
      commandEntry?.tree_source !== "github_event_tree") {
    throw new Error("Command-center reviewed identity must be supplied by the pinned event manifest.");
  }

  const outputs = {};
  for (const [repository, output] of Object.entries(REPOSITORY_OUTPUTS)) {
    const content = contentEntries[repository];
    const reviewed = reviewedEntries[repository];
    if (!content ||
        !reviewed ||
        !SHA_PATTERN.test(content.revision ?? "") ||
        !SHA_PATTERN.test(reviewed.authority_content_revision ?? "")) {
      throw new Error(`Invalid immutable content/reviewed identity for ${repository}.`);
    }
    const revision = repository === "HawkinsOperations/.github"
      ? commandManifestSha
      : reviewed.revision;
    if (!SHA_PATTERN.test(revision ?? "")) {
      throw new Error(`Missing immutable reviewed checkout revision for ${repository}.`);
    }
    outputs[output] = revision;
  }
  return outputs;
}

function selfTest() {
  const repositories = [
    "HawkinsOperations/.github",
    "HawkinsOperations/hoxline",
    "HawkinsOperations/hawkinsoperations-detections",
    "HawkinsOperations/hawkinsoperations-validation",
    "HawkinsOperations/hawkinsoperations-platform",
    "HawkinsOperations/hawkinsoperations-proof",
    "HawkinsOperations/hawkinsoperations-website",
  ];
  const sha = (character) => character.repeat(40);
  const contentManifest = {
    manifest_version: "public-status-source-manifest-v1",
    observation_kind: "reviewed_immutable_commit",
    repositories: repositories.map((repository) => ({
      repository,
      revision: sha("1"),
      authoritative_path: "authority.json",
    })),
  };
  const reviewedManifest = {
    schema: "hawkinsoperations-convergence-source-manifest-v1",
    constraints: { exact_repository_count: 7 },
    repositories: repositories.map((canonical_repository) => ({
      canonical_repository,
      revision: sha("2"),
      authority_content_revision: sha("1"),
      ...(canonical_repository === "HawkinsOperations/.github"
        ? { revision_source: "github_event_sha", tree_source: "github_event_tree" }
        : {}),
    })),
  };
  const resolved = resolveReviewedCheckouts({
    contentManifest,
    reviewedManifest,
    commandManifestSha: sha("3"),
  });
  assert.equal(resolved.org, sha("3"));
  for (const [name, revision] of Object.entries(resolved)) {
    if (name !== "org") assert.equal(revision, sha("2"));
    assert.notEqual(revision, sha("1"), `${name} must not fall back to content revision`);
  }

  const duplicate = structuredClone(reviewedManifest);
  duplicate.repositories[6].canonical_repository = duplicate.repositories[5].canonical_repository;
  assert.throws(
    () => resolveReviewedCheckouts({
      contentManifest,
      reviewedManifest: duplicate,
      commandManifestSha: sha("3"),
    }),
    /unique/,
  );
  const missingReviewedRevision = structuredClone(reviewedManifest);
  delete missingReviewedRevision.repositories[1].revision;
  assert.throws(
    () => resolveReviewedCheckouts({
      contentManifest,
      reviewedManifest: missingReviewedRevision,
      commandManifestSha: sha("3"),
    }),
    /reviewed checkout revision/,
  );
  console.log("Public-status reviewed checkout resolver self-test passed.");
}

function main() {
  if (process.argv.includes("--self-test")) {
    selfTest();
    return;
  }
  const contentManifest = strictJsonParse(
    fs.readFileSync("config/public-status-source-manifest-v1.json", "utf8"),
    "config/public-status-source-manifest-v1.json",
  );
  const reviewedManifest = strictJsonParse(
    fs.readFileSync("../.github/governance/CONVERGENCE_SOURCE_MANIFEST.json", "utf8"),
    "../.github/governance/CONVERGENCE_SOURCE_MANIFEST.json",
  );
  const outputs = resolveReviewedCheckouts({
    contentManifest,
    reviewedManifest,
    commandManifestSha: process.env.HAWKINS_REVIEWED_SOURCE_MANIFEST_SHA,
  });
  if (process.argv.includes("--github-output")) {
    const outputPath = process.env.GITHUB_OUTPUT;
    if (!outputPath) throw new Error("GITHUB_OUTPUT is required for workflow output mode.");
    fs.appendFileSync(
      outputPath,
      `${Object.entries(outputs).map(([key, value]) => `${key}=${value}`).join("\n")}\n`,
    );
    return;
  }
  console.log(JSON.stringify(outputs, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
