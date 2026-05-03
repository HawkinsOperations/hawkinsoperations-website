export const proofCeiling = "TEST_VALIDATED_SYNTHETIC_SCOPE" as const;

export const mandatoryBoundary = "Website rendering is not proof.";

export const allowedClaims = [
  "HawkinsOperations is a public rendering layer.",
  "HawkinsOperations separates source truth, runtime truth, signal truth, evidence truth, and public proof.",
  "HO-DET-001 has synthetic validation status.",
  "HO-DET-001 public proof ceiling is TEST_VALIDATED_SYNTHETIC_SCOPE.",
  "Source presence does not prove runtime.",
  "Validation does not prove public signal.",
  "Public proof requires evidence linkage and explicit promotion.",
];

export const blockedClaims = [
  "runtime-active",
  "signal-observed",
  "public-safe runtime proof",
  "production-ready",
  "fleet-wide",
  "live Splunk fired",
  "Splunk-proven Runtime Signal 001",
  "Cribl-routed",
  "Wazuh-routed",
  "AWS-live",
  "autonomous SOC",
  "AI-approved disposition",
  "analyst-approved disposition",
  "public-safe",
];

export const safeWordingExamples = [
  "HO-DET-001 is presented at TEST_VALIDATED_SYNTHETIC_SCOPE.",
  "Website pages route reviewers to proof records; they do not replace proof records.",
  "Synthetic validation supports the validation surface only.",
  "Runtime, signal, evidence, and public proof require separate promotion gates.",
];

export const unsafeWordingExamples = [
  "HO-DET-001 is deployed across live systems.",
  "The website proves public signal observation.",
  "Source presence proves operational coverage.",
  "AI has approved the final disposition.",
];

export const promotionRequirements = [
  "Current source artifact remains reviewable in the owning repository.",
  "Validation output is deterministic and linked to the proof record.",
  "Runtime state is independently evidenced before runtime claims move forward.",
  "Signal state is independently evidenced before signal claims move forward.",
  "Evidence linkage is explicit before public proof status changes.",
  "Public wording is scanned against the blocked-claim list before release.",
];
