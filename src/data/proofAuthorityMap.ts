import type { ShowcaseTone } from "./systemShowcase";

export type ProofAuthorityNode = {
  id: string;
  label: string;
  route: string;
  authority: string;
  ceiling: string;
  supports: string;
  stillGated: string[];
  source: string;
  tone: ShowcaseTone;
};

export const proofAuthorityNodes: ProofAuthorityNode[] = [
  {
    id: "proof-pack-001",
    label: "Proof Pack 001",
    route: "/proof/proof-pack-001/",
    authority: "hawkinsoperations-proof",
    ceiling: "CONTROLLED_TEST_VALIDATED reviewer package",
    supports: "bounded reviewer ZIP, checksum, manifest, proof card, proof record, and verifier route",
    stillGated: ["raw private runtime evidence", "public runtime proof", "production deployment"],
    source: "hawkinsoperations-proof/README.md and RELEASE_MANIFEST.json",
    tone: "amber",
  },
  {
    id: "ho-det-001",
    label: "HO-DET-001 proof route",
    route: "/proof/ho-det-001/",
    authority: "hawkinsoperations-proof",
    ceiling: "CONTROLLED_TEST_VALIDATED",
    supports: "source, Splunk source, controlled validation, proof-loop checks, and blocked claims",
    stillGated: ["runtime-active", "signal-observed", "public-safe proof", "production wording"],
    source: "hawkinsoperations-proof/proof/records/HO-DET-001.md",
    tone: "green",
  },
  {
    id: "reviewer-metrics",
    label: "Reviewer Metrics Pipeline v1",
    route: "/proof/",
    authority: "hawkinsoperations-proof / hawkinsoperations-platform",
    ceiling: "proof-bounded metrics snapshot",
    supports: "49 activity fires, 106 validation cases, 8 proof records, 31 blocked claims, 0 public-safe",
    stillGated: ["runtime truth", "signal truth", "case closure", "customer or production claims"],
    source: "hawkinsoperations-proof README and hawkinsoperations-platform README",
    tone: "cyan",
  },
  {
    id: "runtime-private-candidate",
    label: "Runtime Route Proof v1 private candidate",
    route: "/proof/runtime-proof-factory/",
    authority: "hawkinsoperations-proof / hawkinsoperations-platform",
    ceiling: "PRIVATE_RUNTIME_ROUTE_PROOF_V1_CANDIDATE_PRESERVED",
    supports: "reviewer-safe private route-proof packet reference and verifier result",
    stillGated: ["public-safe runtime proof", "broad ingestion", "production operation"],
    source: "proof/maps/RUNTIME-ROUTE-PROOF-V1-REVIEWER-MAP.md",
    tone: "red",
  },
  {
    id: "website-render",
    label: "Website render",
    route: "/artifacts/",
    authority: "hawkinsoperations-website",
    ceiling: "RENDERING_ONLY",
    supports: "public routing to proof, artifacts, governance saves, and reviewer paths",
    stillGated: ["claim approval", "proof authority", "runtime truth", "signal truth"],
    source: "hawkinsoperations-website app routes",
    tone: "neutral",
  },
];

export const evidenceRoute = [
  "artifact",
  "source",
  "validation",
  "platform contract",
  "proof record",
  "Hoxline claim gate",
  "website render",
] as const;

