import { externalLinks } from "./navigation";

export type RepoRecord = {
  name: string;
  href: string;
  purpose: string;
  truthSurface: string;
  owns: string;
  doesNotProve: string;
};

export const repos: RepoRecord[] = [
  {
    name: "HawkinsOperations/.github",
    href: externalLinks.githubOrg,
    purpose: "Organization profile, reviewer entry points, and governance routing.",
    truthSurface: "Governance routing",
    owns: "START_HERE, organization map, and public review paths.",
    doesNotProve: "Detection behavior, runtime state, or signal observation.",
  },
  {
    name: "hawkinsoperations-detections",
    href: externalLinks.detections,
    purpose: "Detection source candidates and detection-as-code materials.",
    truthSurface: "Source Truth",
    owns: "Detection source, naming, and reviewable source history.",
    doesNotProve: "Runtime activity, signal observation, or public proof.",
  },
  {
    name: "hawkinsoperations-validation",
    href: externalLinks.validation,
    purpose: "Deterministic validation controls and expected-result contracts.",
    truthSurface: "Validation Truth",
    owns: "Validation cases, validators, and reproducible output format.",
    doesNotProve: "Runtime deployment or external-use authorization.",
  },
  {
    name: "hawkinsoperations-platform",
    href: externalLinks.platform,
    purpose: "Platform/runtime design and operational integration boundaries.",
    truthSurface: "Runtime Truth",
    owns: "Runtime architecture and platform control patterns.",
    doesNotProve: "Public-safe proof or fleet-wide state.",
  },
  {
    name: "hawkinsoperations-proof",
    href: externalLinks.proof,
    purpose: "Proof records, evidence linkage, and public claim contracts.",
    truthSurface: "Evidence Truth / Public Proof",
    owns: "Proof ledger records and promotion-state documentation.",
    doesNotProve: "Unlinked runtime state or claims outside the record.",
  },
  {
    name: "hawkinsoperations-website",
    href: externalLinks.website,
    purpose: "Public rendering, reviewer navigation, and claim-boundary presentation.",
    truthSurface: "Public rendering",
    owns: "Human-readable routes into proof and governance records.",
    doesNotProve: "Source truth, runtime truth, signal truth, or evidence truth.",
  },
];
