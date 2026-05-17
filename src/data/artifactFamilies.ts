/**
 * Artifact family matrix data.
 *
 * Seven artifact families × four evidence axes.
 *   "filled"  — the family already produces this kind of receipt at the current ceiling.
 *   "gated"   — the family will produce this once a named promotion gate fires.
 *   "empty"   — out of scope for this family by design.
 *
 * No runtime, signal, or public-safe state is asserted from this table — it
 * is a description of what the artifact registry covers and what it does not.
 */

export type AxisKey = "source" | "validation" | "evidence" | "rendering";

export type CellState = "filled" | "gated" | "empty";

export type ArtifactFamily = {
  slug: string;
  name: string;
  purpose: string;
  cells: Record<AxisKey, CellState>;
};

export const artifactFamilyAxes: { key: AxisKey; label: string }[] = [
  { key: "source", label: "Source receipt" },
  { key: "validation", label: "Validation receipt" },
  { key: "evidence", label: "Evidence receipt" },
  { key: "rendering", label: "Public rendering" },
];

export const artifactFamilies: ArtifactFamily[] = [
  {
    slug: "proof-records",
    name: "Proof records",
    purpose: "HO-DET-001, AWS-DET-001 — bounded proof cards at the current ceiling.",
    cells: { source: "filled", validation: "filled", evidence: "filled", rendering: "filled" },
  },
  {
    slug: "detection-factory",
    name: "Detection factory",
    purpose: "Detection-as-code rule, SPL, and ownership trail in the detections repo.",
    cells: { source: "filled", validation: "filled", evidence: "gated", rendering: "filled" },
  },
  {
    slug: "validation-ci",
    name: "Validation / CI",
    purpose: "Deterministic fixtures, contract assertions, blocked-claim scanner.",
    cells: { source: "filled", validation: "filled", evidence: "filled", rendering: "filled" },
  },
  {
    slug: "proof-system",
    name: "Proof system",
    purpose: "Promotion gates, claim ceiling, evidence linkage records.",
    cells: { source: "filled", validation: "filled", evidence: "filled", rendering: "filled" },
  },
  {
    slug: "repo-governance",
    name: "Repo governance",
    purpose: "Plane separation between source, validation, platform, proof, and rendering.",
    cells: { source: "filled", validation: "gated", evidence: "filled", rendering: "filled" },
  },
  {
    slug: "platform-runtime",
    name: "Platform / runtime contracts",
    purpose: "Runtime architecture and platform control patterns. Behind the next promotion gate.",
    cells: { source: "filled", validation: "gated", evidence: "gated", rendering: "empty" },
  },
  {
    slug: "website-rendering",
    name: "Website rendering",
    purpose: "Public routes, reviewer navigation. Renders the receipts; does not author them.",
    cells: { source: "empty", validation: "empty", evidence: "empty", rendering: "filled" },
  },
];
