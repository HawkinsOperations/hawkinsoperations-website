export type TruthSurface = {
  name: string;
  slug: string;
  location: string;
  proves: string;
  doesNotProve: string;
  promotesBy: string;
  blockedBy: string;
};

export const truthSurfaces: TruthSurface[] = [
  {
    name: "Source Truth",
    slug: "source",
    location: "hawkinsoperations-detections",
    proves: "A source artifact exists and can be reviewed.",
    doesNotProve: "Deployment, runtime behavior, signal observation, or public proof.",
    promotesBy: "Reviewable source plus a linked validation path.",
    blockedBy: "Missing source, unclear ownership, or unverifiable lineage.",
  },
  {
    name: "Validation Truth",
    slug: "validation",
    location: "hawkinsoperations-validation",
    proves: "A deterministic validation process passed inside its stated scope.",
    doesNotProve: "Runtime operation, public signal, or external-use authorization.",
    promotesBy: "Stable validator output linked to the proof ledger.",
    blockedBy: "Non-deterministic checks, missing outputs, or changed claim scope.",
  },
  {
    name: "Runtime Truth",
    slug: "runtime",
    location: "hawkinsoperations-platform",
    proves: "A control or detection is active in a runtime environment.",
    doesNotProve: "Signal observation, evidence linkage, or public-safe proof.",
    promotesBy: "Current runtime evidence with a bounded trust class.",
    blockedBy: "Private-only evidence, stale host state, or unreviewed telemetry.",
  },
  {
    name: "Signal Truth",
    slug: "signal",
    location: "running systems and validation output",
    proves: "The detection produced a bounded signal in the observed context.",
    doesNotProve: "Fleet scope, production readiness, or public-safe status.",
    promotesBy: "Signal artifacts tied to time, source, and validation records.",
    blockedBy: "No event record, unclear source, or non-public evidence limits.",
  },
  {
    name: "Evidence Truth",
    slug: "evidence",
    location: "private evidence vault and hawkinsoperations-proof",
    proves: "A preserved evidence artifact supports a specific bounded claim.",
    doesNotProve: "Claims outside the evidence boundary.",
    promotesBy: "Explicit linkage, retention, and reviewable proof records.",
    blockedBy: "Unpromoted data, sensitive material, or missing review linkage.",
  },
  {
    name: "Public Proof",
    slug: "public-proof",
    location: "hawkinsoperations-proof and hawkinsoperations-website",
    proves: "A public-facing claim has passed the required promotion boundary.",
    doesNotProve: "Private runtime or signal claims not linked into public proof.",
    promotesBy: "Evidence-linked proof records and claim-boundary review.",
    blockedBy: "Blocked terms, missing promotion gates, or website-only rendering.",
  },
];
