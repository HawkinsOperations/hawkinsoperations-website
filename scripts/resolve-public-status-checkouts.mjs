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

const CONTENT_REPOSITORY_ORDER = Object.freeze([
  "HawkinsOperations/.github",
  "HawkinsOperations/hoxline",
  "HawkinsOperations/hawkinsoperations-detections",
  "HawkinsOperations/hawkinsoperations-validation",
  "HawkinsOperations/hawkinsoperations-platform",
  "HawkinsOperations/hawkinsoperations-proof",
  "HawkinsOperations/hawkinsoperations-website",
]);
const REVIEWED_REPOSITORY_ORDER = Object.freeze([
  "HawkinsOperations/.github",
  "HawkinsOperations/hawkinsoperations-detections",
  "HawkinsOperations/hawkinsoperations-validation",
  "HawkinsOperations/hawkinsoperations-platform",
  "HawkinsOperations/hawkinsoperations-proof",
  "HawkinsOperations/hawkinsoperations-website",
  "HawkinsOperations/hoxline",
]);
const AUTHORITY_PATHS = Object.freeze({
  "HawkinsOperations/.github": "architecture/REPO_AUTHORITY_MAP.md",
  "HawkinsOperations/hoxline": "schemas/case-growth-index-v0.schema.json",
  "HawkinsOperations/hawkinsoperations-detections": "detections/DETECTION_PROMOTION_MATRIX.yml",
  "HawkinsOperations/hawkinsoperations-validation": "activity/detection-activity-ledger-v1.json",
  "HawkinsOperations/hawkinsoperations-platform": "contracts/reviewer-metrics-pipeline-v1-state.json",
  "HawkinsOperations/hawkinsoperations-proof": "proof/indexes/DETECTION_PROOF_STATUS_INDEX.yml",
  "HawkinsOperations/hawkinsoperations-website": "schemas/public-status-v0.schema.json",
});
const SHA_PATTERN = /^[a-f0-9]{40}$/;

function exactEntries(entries, key, label, expectedOrder) {
  if (!Array.isArray(entries) || entries.length !== 7) {
    throw new Error(`${label} must contain exactly seven repositories.`);
  }
  const actualOrder = entries.map((entry) => entry?.[key]);
  if (actualOrder.some((repository, index) => repository !== expectedOrder[index])) {
    throw new Error(`${label} must contain the exact canonical repository set and order.`);
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
      contentManifest?.observation_kind !== "reviewed_immutable_commit" ||
      Object.keys(contentManifest).sort().join(",") !==
        "manifest_version,observation_kind,repositories") {
    throw new Error("Content manifest identity or observation kind is invalid.");
  }
  if (reviewedManifest?.schema !== "hawkinsoperations-convergence-source-manifest-v1" ||
      reviewedManifest?.manifest_id !== "HAWKINSOPERATIONS_SEVEN_SOURCE_PR_HEAD_MATRIX_V1" ||
      JSON.stringify(reviewedManifest?.constraints) !== JSON.stringify({
        exact_repository_count: 7,
        read_only: true,
        default_branch_fallback: false,
        require_detached_exact_revision: true,
        record_checked_revisions: true,
        consumer_outputs_are_not_authority: true,
        proof_ceiling: "CONTROLLED_REPO_CONVERGENCE_AND_LOCAL_FIXTURE_REVIEW_ONLY",
      }) ||
      Object.keys(reviewedManifest).sort().join(",") !==
        "constraints,manifest_id,repositories,schema") {
    throw new Error("Reviewed-head manifest identity or repository count is invalid.");
  }
  if (!SHA_PATTERN.test(commandManifestSha ?? "")) {
    throw new Error("Command-center manifest SHA must be an immutable commit identity.");
  }

  const contentEntries = exactEntries(
    contentManifest.repositories,
    "repository",
    "Content manifest",
    CONTENT_REPOSITORY_ORDER,
  );
  const reviewedEntries = exactEntries(
    reviewedManifest.repositories,
    "canonical_repository",
    "Reviewed-head manifest",
    REVIEWED_REPOSITORY_ORDER,
  );
  const commandEntry = reviewedEntries["HawkinsOperations/.github"];
  if (commandEntry?.revision_source !== "github_event_sha" ||
      commandEntry?.tree_source !== "github_event_tree") {
    throw new Error("Command-center reviewed identity must be supplied by the pinned event manifest.");
  }

  for (const repository of CONTENT_REPOSITORY_ORDER) {
    const content = contentEntries[repository];
    const reviewed = reviewedEntries[repository];
    const expectedShortRepository = repository.replace("HawkinsOperations/", "");
    if (!content ||
        !reviewed ||
        reviewed.repository !== expectedShortRepository ||
        content.authoritative_path !== AUTHORITY_PATHS[repository] ||
        Object.keys(content).sort().join(",") !==
          "authoritative_path,repository,revision" ||
        !SHA_PATTERN.test(content.revision ?? "") ||
        !SHA_PATTERN.test(reviewed.authority_content_revision ?? "")) {
      throw new Error(`Invalid immutable content/reviewed identity for ${repository}.`);
    }
    if (repository === "HawkinsOperations/.github") {
      if (Object.keys(reviewed).sort().join(",") !==
            "authority_content_revision,canonical_repository,repository,revision_source,tree_source") {
        throw new Error("Command-center reviewed entry has an unsupported shape.");
      }
    } else if (Object.keys(reviewed).sort().join(",") !==
        "authority_content_revision,canonical_repository,repository,reviewed_tree_sha,revision" ||
        !SHA_PATTERN.test(reviewed.revision ?? "") ||
        !SHA_PATTERN.test(reviewed.reviewed_tree_sha ?? "")) {
      throw new Error(`Reviewed-head entry has an unsupported shape: ${repository}.`);
    }
  }

  const outputs = {};
  for (const [repository, output] of Object.entries(REPOSITORY_OUTPUTS)) {
    const reviewed = reviewedEntries[repository];
    const revision = repository === "HawkinsOperations/.github"
      ? commandManifestSha
      : reviewed.revision;
    if (!SHA_PATTERN.test(revision ?? "")) {
      throw new Error(`Missing immutable reviewed checkout revision for ${repository}.`);
    }
    outputs[output] = revision;
  }
  const websiteRepository = "HawkinsOperations/hawkinsoperations-website";
  outputs.website_content = contentEntries[websiteRepository].revision;
  outputs.website_authority_content =
    reviewedEntries[websiteRepository].authority_content_revision;
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
      authoritative_path: AUTHORITY_PATHS[repository],
    })),
  };
  const reviewedManifest = {
    schema: "hawkinsoperations-convergence-source-manifest-v1",
    manifest_id: "HAWKINSOPERATIONS_SEVEN_SOURCE_PR_HEAD_MATRIX_V1",
    constraints: {
      exact_repository_count: 7,
      read_only: true,
      default_branch_fallback: false,
      require_detached_exact_revision: true,
      record_checked_revisions: true,
      consumer_outputs_are_not_authority: true,
      proof_ceiling: "CONTROLLED_REPO_CONVERGENCE_AND_LOCAL_FIXTURE_REVIEW_ONLY",
    },
    repositories: REVIEWED_REPOSITORY_ORDER.map((canonical_repository) =>
      canonical_repository === "HawkinsOperations/.github"
        ? {
          repository: ".github",
          canonical_repository,
          revision_source: "github_event_sha",
          tree_source: "github_event_tree",
          authority_content_revision: sha("1"),
        }
        : {
          repository: canonical_repository.replace("HawkinsOperations/", ""),
          canonical_repository,
          revision: sha("2"),
          authority_content_revision: sha("1"),
          reviewed_tree_sha: sha("4"),
        }),
  };
  const resolved = resolveReviewedCheckouts({
    contentManifest,
    reviewedManifest,
    commandManifestSha: sha("3"),
  });
  assert.equal(resolved.org, sha("3"));
  assert.notEqual(
    resolved.org,
    contentManifest.repositories[0].revision,
    "command manifest checkout must remain separate from command-center authority content",
  );
  for (const [name, revision] of Object.entries(resolved)) {
    if (name === "website_content" || name === "website_authority_content") {
      assert.equal(revision, sha("1"));
      continue;
    }
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
    /exact canonical repository set and order/,
  );
  const missingReviewedRevision = structuredClone(reviewedManifest);
  delete missingReviewedRevision.repositories[1].revision;
  assert.throws(
    () => resolveReviewedCheckouts({
      contentManifest,
      reviewedManifest: missingReviewedRevision,
      commandManifestSha: sha("3"),
    }),
    /unsupported shape/,
  );
  const forgedContentOwner = structuredClone(contentManifest);
  forgedContentOwner.repositories[6].repository = "HawkinsOperations/attacker";
  assert.throws(
    () => resolveReviewedCheckouts({
      contentManifest: forgedContentOwner,
      reviewedManifest,
      commandManifestSha: sha("3"),
    }),
    /exact canonical repository set and order/,
  );
  const forgedContentPath = structuredClone(contentManifest);
  forgedContentPath.repositories[2].authoritative_path = "README.md";
  assert.throws(
    () => resolveReviewedCheckouts({
      contentManifest: forgedContentPath,
      reviewedManifest,
      commandManifestSha: sha("3"),
    }),
    /identity/,
  );
  const forgedReviewedOwner = structuredClone(reviewedManifest);
  forgedReviewedOwner.repositories[5].canonical_repository = "HawkinsOperations/attacker";
  assert.throws(
    () => resolveReviewedCheckouts({
      contentManifest,
      reviewedManifest: forgedReviewedOwner,
      commandManifestSha: sha("3"),
    }),
    /exact canonical repository set and order/,
  );
  const wrongManifestId = structuredClone(reviewedManifest);
  wrongManifestId.manifest_id = "UNREVIEWED_MATRIX";
  assert.throws(
    () => resolveReviewedCheckouts({
      contentManifest,
      reviewedManifest: wrongManifestId,
      commandManifestSha: sha("3"),
    }),
    /identity/,
  );
  const spoofedShortOwner = structuredClone(reviewedManifest);
  spoofedShortOwner.repositories[2].repository = "attacker-suffix-spoof";
  assert.throws(
    () => resolveReviewedCheckouts({
      contentManifest,
      reviewedManifest: spoofedShortOwner,
      commandManifestSha: sha("3"),
    }),
    /identity/,
  );
  const alteredConstraints = structuredClone(reviewedManifest);
  alteredConstraints.constraints.default_branch_fallback = true;
  assert.throws(
    () => resolveReviewedCheckouts({
      contentManifest,
      reviewedManifest: alteredConstraints,
      commandManifestSha: sha("3"),
    }),
    /identity/,
  );
  assert.throws(
    () => resolveReviewedCheckouts({
      contentManifest,
      reviewedManifest,
      commandManifestSha: "main",
    }),
    /immutable commit identity/,
  );
  const substitutedCommandHead = structuredClone(reviewedManifest);
  substitutedCommandHead.repositories[0] = {
    ...substitutedCommandHead.repositories[0],
    revision: sha("3"),
  };
  assert.throws(
    () => resolveReviewedCheckouts({
      contentManifest,
      reviewedManifest: substitutedCommandHead,
      commandManifestSha: sha("3"),
    }),
    /unsupported shape/,
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
