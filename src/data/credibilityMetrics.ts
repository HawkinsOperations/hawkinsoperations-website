import { artifacts } from "./artifacts";
import { blockedClaims } from "./claims";

export type CredibilityMetric = {
  value: number;
  label: string;
  footnote: string;
};

const boundedProofRecords = artifacts.filter((artifact) => artifact.category === "proof-record").length;
const separatedTruthSurfaces = new Set(artifacts.map((artifact) => artifact.truthSurface)).size;
const deterministicValidationRoutes = artifacts.filter((artifact) =>
  artifact.category === "validation" || artifact.category === "ci-verifier"
).length;

export const credibilityMetrics: CredibilityMetric[] = [
  {
    value: artifacts.length,
    label: "Reviewer-routed artifacts",
    footnote: "Counted from src/data/artifacts.ts; routing surface only.",
  },
  {
    value: boundedProofRecords,
    label: "Bounded proof records",
    footnote: "Derived from artifact categories; does not assert runtime state.",
  },
  {
    value: separatedTruthSurfaces,
    label: "Separated truth surfaces",
    footnote: "Derived from artifact truthSurface labels, not live telemetry.",
  },
  {
    value: blockedClaims.length,
    label: "Blocked claims made visible",
    footnote: "Derived from src/data/claims.ts blockedClaims.",
  },
  {
    value: deterministicValidationRoutes,
    label: "Deterministic validation routes",
    footnote: "Derived from validation and CI verifier artifact routes.",
  },
].filter((metric) => metric.value > 0);
