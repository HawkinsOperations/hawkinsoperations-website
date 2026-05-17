import { externalLinks } from "./navigation";

export type ArtifactStage = {
  id: string;
  n: string;
  name: string;
  code: string;
  exists: string;
  bounded: string;
  link: { label: string; href: string; external?: boolean };
};

export const artifactStages: ArtifactStage[] = [
  {
    id: "source",
    n: "01",
    name: "Source",
    code: "SOURCE_PRESENT",
    exists: "Reviewable detection rule and SPL under version control with an owner.",
    bounded: "Source presence is not runtime, not signal, not public-safe proof.",
    link: { label: "Detections repo", href: externalLinks.detections, external: true },
  },
  {
    id: "validation",
    n: "02",
    name: "Validation",
    code: "FIXTURE_PASSED",
    exists: "Deterministic positive and negative fixtures pass inside the validation repo.",
    bounded: "Validation does not claim fleet-wide or runtime-active behavior.",
    link: { label: "Validation repo", href: externalLinks.validation, external: true },
  },
  {
    id: "case-packet",
    n: "03",
    name: "Case Packet",
    code: "PACKET_ROUTED",
    exists: "Findings, validation output, and reviewer wording bundled into a routable packet.",
    bounded: "Packet routing is not proof that every claim in the packet is independently evidenced.",
    link: { label: "HO-DET-001 case file", href: "/proof/ho-det-001/" },
  },
  {
    id: "ai-support",
    n: "04",
    name: "AI Support",
    code: "AI_AS_LABOR",
    exists: "AI drafts summaries, scaffolds reviewer prep, and accelerates documentation.",
    bounded: "AI cannot promote a claim. No AI-approved disposition.",
    link: { label: "Claim firewall", href: "/controls/" },
  },
  {
    id: "verifier",
    n: "05",
    name: "Verifier",
    code: "SCANNER_CLEAN",
    exists: "Site contract and blocked-claim scanner run on every wording change.",
    bounded: "The scanner gates wording, not runtime telemetry.",
    link: { label: "Repo authority map", href: externalLinks.repoAuthorityMap, external: true },
  },
  {
    id: "ci",
    n: "06",
    name: "CI",
    code: "CI_ENFORCED",
    exists: "CI checks fail builds when contract assertions or blocked-claim rules trip.",
    bounded: "CI does not authorize promotion. It blocks regressions only.",
    link: { label: "Proof loop", href: "/proof-loop/" },
  },
  {
    id: "proof-card",
    n: "07",
    name: "Proof Card",
    code: "RECORD_PUBLISHED",
    exists: "Public proof record exists with a stated ceiling, evidence pointers, and bounded scope.",
    bounded: "Publishing the card does not change runtime, signal, or public-safe state.",
    link: { label: "Proof ledger", href: "/proof/" },
  },
  {
    id: "public-boundary",
    n: "08",
    name: "Public Boundary",
    code: "CEILING_HELD",
    exists: "Public wording holds at the stated ceiling. Stronger wording is blocked until separately promoted.",
    bounded: "The boundary is the last gate before public surface; it is not a runtime claim.",
    link: { label: "HO-DET-001 card", href: "/proof/ho-det-001/" },
  },
];
