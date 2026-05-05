import { blockedClaims, proofCeiling } from "./claims";
import { externalLinks } from "./navigation";

export type ProofRecord = {
  detectionId: string;
  title: string;
  proofLevel: typeof proofCeiling;
  validationState: string;
  runtimeState: string;
  signalState: string;
  publicSafeState: string;
  sourceRepoLink: string;
  proofRepoLink: string;
  caseFileHref?: string;
  blockedPromotions: string[];
  exists: string[];
  passed: string[];
  notClaimed: string[];
  remainingBlocked: string[];
  promotionRequirements: string[];
};

export const proofRecords: ProofRecord[] = [
  {
    detectionId: "HO-DET-001",
    title: "Synthetic validation proof card",
    proofLevel: proofCeiling,
    validationState: "synthetic validation status",
    runtimeState: "not claimed from public website",
    signalState: "not claimed from public website",
    publicSafeState: "blocked until evidence linkage and explicit promotion",
    sourceRepoLink: externalLinks.detections,
    proofRepoLink: externalLinks.proofRecord,
    caseFileHref: "/proof/ho-det-001/",
    blockedPromotions: blockedClaims,
    exists: [
      "A public proof record route exists.",
      "A public website route can point reviewers to the proof record.",
      "A synthetic validation boundary is stated.",
      "Platform runtime contract enforcement exists as a non-promotional guardrail.",
    ],
    passed: [
      "The public ceiling is stated as TEST_VALIDATED_SYNTHETIC_SCOPE.",
      "Blocked promotions are visible instead of hidden.",
      "Website rendering remains separated from evidence authority.",
      "The platform verifier preserves NOT_PUBLIC_SAFE and BLOCKED runtime promotion fields.",
    ],
    notClaimed: [
      "Runtime activation is not claimed.",
      "Signal observation is not claimed.",
      "Public-safe runtime proof is not claimed.",
      "Live Splunk fired, Cribl-routed status, Wazuh-routed public proof, AWS-live status, production-ready status, fleet-wide coverage, autonomous SOC operation, AI-approved disposition, and analyst-approved disposition are not claimed.",
      "External-use approval is not claimed.",
      "Public-safe proof is not claimed.",
    ],
    remainingBlocked: [
      "Runtime evidence must be promoted separately.",
      "Signal evidence must be promoted separately.",
      "Public proof requires evidence linkage.",
      "The platform runtime contract does not promote HO-DET-001 beyond TEST_VALIDATED_SYNTHETIC_SCOPE.",
      "Blocked-claim scanner must stay clean before wording changes ship.",
    ],
    promotionRequirements: [
      "Preserved validation output linked to the record.",
      "Evidence bundle with current trust classification.",
      "Runtime and signal claims reviewed independently.",
      "Public wording reviewed against blocked promotions.",
    ],
  },
  {
    detectionId: "AWS-DET-001",
    title: "CloudTrail-style IAM denial fixture proof card",
    proofLevel: proofCeiling,
    validationState: "fixture-only synthetic validation status",
    runtimeState: "not claimed from public website",
    signalState: "not claimed from public website",
    publicSafeState: "blocked until evidence linkage and explicit promotion",
    sourceRepoLink: externalLinks.detections,
    proofRepoLink: externalLinks.proofRecordAws,
    blockedPromotions: blockedClaims,
    exists: [
      "A public proof record route exists for AWS-DET-001.",
      "A fixture-only CloudTrail-style detection candidate is published as source.",
      "A synthetic validation report is published in the validation repository.",
    ],
    passed: [
      "AWS-DET-001 passed fixture-only validation against controlled CloudTrail-style IAM denial fixtures.",
      "The proof record states the public ceiling as TEST_VALIDATED_SYNTHETIC_SCOPE.",
      "Blocked promotions for AWS-live, CloudTrail live, cloud runtime-active, signal-observed, and public-safe runtime proof are visible instead of hidden.",
    ],
    notClaimed: [
      "AWS-live status is not claimed.",
      "AWS CloudTrail live evidence is not claimed.",
      "Cloud runtime-active deployment is not claimed.",
      "Signal-observed public proof is not claimed.",
      "Public-safe runtime proof is not claimed.",
      "AWS account coverage is not claimed.",
    ],
    remainingBlocked: [
      "AWS-live proof requires separate evidence and Raylee approval.",
      "Cloud runtime-active proof requires separate deployment evidence.",
      "Signal-observed public proof requires preserved cloud telemetry.",
      "Public-safe runtime proof requires evidence linkage and promotion.",
    ],
    promotionRequirements: [
      "Real CloudTrail evidence with sanitization and stale review.",
      "Cloud deployment evidence linking the rule to an enabled environment.",
      "Public wording reviewed against the blocked-claim list.",
      "Raylee approval after evidence and claim review.",
    ],
  },
];

export const flagshipProofRecord = proofRecords[0];
