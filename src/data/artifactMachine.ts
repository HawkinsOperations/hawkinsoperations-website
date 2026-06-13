import { externalLinks } from "./navigation";

export type ArtifactStage = {
  id: string;
  n: string;
  name: string;
  code: string;
  exists: string;
  /** What the stage's receipt supports — the claim it earns. */
  supports: string;
  bounded: string;
  /** The next gate the receipt unlocks. */
  nextGate: string;
  link: { label: string; href: string; external?: boolean };
};

export const artifactStages: ArtifactStage[] = [
  {
    id: "source",
    n: "01",
    name: "Source",
    code: "SOURCE_PRESENT",
    exists: "Reviewable detection rule and SPL under version control with an owner.",
    supports: "Supports a claim that the detection logic exists and is inspectable.",
    bounded: "Source presence is not runtime, not signal, not public-safe proof.",
    nextGate: "Controlled-test validation in the validation repo.",
    link: { label: "Detections repo", href: externalLinks.detections, external: true },
  },
  {
    id: "validation",
    n: "02",
    name: "Validation",
    code: "FIXTURE_PASSED",
    exists: "Deterministic positive and negative fixtures pass inside the validation repo.",
    supports: "Supports a claim that the logic behaves correctly against controlled fixtures.",
    bounded: "Validation does not claim fleet-wide or runtime-active behavior.",
    nextGate: "Bundle findings and wording into a routable case packet.",
    link: { label: "Validation repo", href: externalLinks.validation, external: true },
  },
  {
    id: "case-packet",
    n: "03",
    name: "Case Packet",
    code: "PACKET_ROUTED",
    exists: "Findings, validation output, and reviewer wording bundled into a routable packet.",
    supports: "Supports a claim that evidence is assembled and traceable in one place.",
    bounded: "Packet routing is not proof that every claim in the packet is independently evidenced.",
    nextGate: "AI accelerates labor on the packet under support-only rules.",
    link: { label: "HO-DET-001 case file", href: "/proof/ho-det-001/" },
  },
  {
    id: "ai-support",
    n: "04",
    name: "AI Support",
    code: "AI_AS_LABOR",
    exists: "AI drafts summaries, scaffolds reviewer prep, and accelerates documentation.",
    supports: "Supports faster labor only — drafting, scaffolding, and reviewer prep.",
    bounded: "AI cannot promote a claim. No AI-approved disposition.",
    nextGate: "Deterministic verifier scans the wording before it can advance.",
    link: { label: "Claim Firewall", href: "/claim-firewall/" },
  },
  {
    id: "verifier",
    n: "05",
    name: "Verifier",
    code: "SCANNER_CLEAN",
    exists: "Site contract and blocked-claim scanner run on every wording change.",
    supports: "Supports a claim that published wording stays inside the allowed boundary.",
    bounded: "The scanner gates wording, not runtime telemetry.",
    nextGate: "CI enforces the scan result on the pull request.",
    link: { label: "Repo authority map", href: externalLinks.repoAuthorityMap, external: true },
  },
  {
    id: "ci",
    n: "06",
    name: "CI",
    code: "CI_ENFORCED",
    exists: "CI checks fail builds when contract assertions or blocked-claim rules trip.",
    supports: "Supports a claim that no change ships without passing the gate.",
    bounded: "CI does not authorize promotion. It blocks regressions only.",
    nextGate: "A bounded public proof record is published.",
    link: { label: "Proof loop", href: "/proof-loop/" },
  },
  {
    id: "proof-card",
    n: "07",
    name: "Proof Card",
    code: "RECORD_PUBLISHED",
    exists: "Public proof record exists with a stated ceiling, evidence pointers, and bounded scope.",
    supports: "Supports a claim at the stated ceiling — CONTROLLED_TEST_VALIDATED.",
    bounded: "Publishing the card does not change runtime, signal, or public-safe state.",
    nextGate: "Human review holds the public boundary before rendering.",
    link: { label: "Proof ledger", href: "/proof/" },
  },
  {
    id: "public-boundary",
    n: "08",
    name: "Public Boundary",
    code: "CEILING_HELD",
    exists: "Public wording holds at the stated ceiling. Stronger wording is blocked until separately promoted.",
    supports: "Supports only what the proof record evidences — nothing the website adds.",
    bounded: "The boundary is the last gate before public surface; it is not a runtime claim.",
    nextGate: "Human review authorizes any promotion; rendering never does.",
    link: { label: "HO-DET-001 card", href: "/proof/ho-det-001/" },
  },
];
