/**
 * MITRE ATT&CK-mapped detection coverage.
 *
 * Reviewer value: shows that HawkinsOperations detections carry an ATT&CK
 * mapping alongside an explicit proof ceiling, validation state, and a
 * blocked-claim boundary. The map is general detection-engineering value —
 * it is not tied to any single employer or deployment.
 *
 * Claim contract enforced in the copy below:
 *  - ATT&CK mapping explains detection intent and coverage. It does not
 *    prove live telemetry, runtime deployment, signal observation, or use.
 *  - Technique IDs are only asserted where repo-backed. Where a precise ID
 *    is not represented in source, the family/category is shown with a
 *    "mapping in source artifact" / "mapping pending" qualifier rather than
 *    an invented technique ID.
 *  - Every node's runtime and signal claims are blocked at this ceiling.
 */

export type AttackTone =
  | "validated" // controlled-test validated at the public ceiling
  | "fixture" // fixture-only validation, no live source
  | "private" // private evidence captured, blocked from public proof
  | "planned" // source exists, validation planned
  | "contract"; // boundary/contract surface, not a coverage claim

export type AttackNode = {
  id: string;
  title: string;
  /** ATT&CK technique label — precise ID only where repo-backed */
  attack: string;
  /** status / proof ceiling label */
  ceiling: string;
  tone: AttackTone;
  /** validation count line, or contract status */
  validation: string;
  /** what this node does NOT prove — phrased to keep runtime/signal blocked */
  boundary: string;
};

export type AttackFamily = {
  family: string;
  nodes: AttackNode[];
};

export const attackFamilies: AttackFamily[] = [
  {
    family: "Endpoint / PowerShell",
    nodes: [
      {
        id: "HO-DET-001",
        title: "Suspicious PowerShell EncodedCommand Execution",
        attack: "T1059.001 · Command and Scripting Interpreter: PowerShell",
        ceiling: "CONTROLLED_TEST_VALIDATED",
        tone: "validated",
        validation: "14 controlled cases: 7 positive, 7 negative, 0 missed, 0 false-positive negatives",
        boundary:
          "Runtime and signal claims are blocked at this ceiling. No production, customer-deployment, or autonomous-resolution claim is made.",
      },
    ],
  },
  {
    family: "Endpoint / Persistence",
    nodes: [
      {
        id: "HO-DET-011",
        title: "Windows Service Creation / Binary Change",
        attack: "Persistence: service creation — ATT&CK mapping in source artifact",
        ceiling: "private runtime evidence captured and excluded from public proof · NOT_PUBLIC_SAFE",
        tone: "private",
        validation: "17 controlled cases: 7 positive, 10 negative, 0 missed, 0 false-positive negatives",
        boundary:
          "Private runtime evidence is held privately and is blocked from public proof; no public-safe runtime claim is made and runtime/signal stay blocked.",
      },
      {
        id: "HO-DET-012",
        title: "Suspicious Scheduled Task Creation",
        attack: "Scheduled Task/Job: Scheduled Task — ATT&CK mapping in source artifact",
        ceiling: "CONTROLLED_TEST_VALIDATED",
        tone: "validated",
        validation: "8 controlled cases: 4 positive, 4 negative, 0 missed, 0 false-positive negatives",
        boundary:
          "No proof record yet. Runtime, signal, public-proof, and completeness claims are blocked at this ceiling.",
      },
    ],
  },
  {
    family: "Cloud / IAM",
    nodes: [
      {
        id: "AWS-DET-001",
        title: "CloudTrail-Style IAM Denial",
        attack: "Cloud / IAM denial — mapping in source/proof artifacts",
        ceiling: "CONTROLLED_TEST_VALIDATED · FIXTURE_ONLY",
        tone: "fixture",
        validation: "6 fixture cases: 3 positive, 3 negative",
        boundary:
          "Fixture-only. Live AWS and CloudTrail proof are blocked at this ceiling; no live-cloud claim is made.",
      },
    ],
  },
  {
    family: "Identity / Access Behavior",
    nodes: [
      {
        id: "ID-DET-001…004",
        title: "Identity Detection Family",
        attack: "ATT&CK-aligned identity behavior (mapping per detection)",
        ceiling: "CONTROLLED_TEST_VALIDATED",
        tone: "validated",
        validation:
          "ID-DET-001…004 each: 10 controlled cases — 5 positive, 5 negative, 0 missed, 0 false-positive negatives",
        boundary:
          "Live IdP, production identity coverage, and completeness claims are blocked at this ceiling; no live-identity claim is made.",
      },
    ],
  },
  {
    family: "Telemetry / Defense Evasion",
    nodes: [
      {
        id: "HO-DET-013",
        title: "Defense Tool and Telemetry Tamper Attempt",
        attack: "Defense evasion / telemetry tamper — mapping in source artifact",
        ceiling: "SOURCE_EXISTS · VALIDATION_PLANNED",
        tone: "planned",
        validation: "Validation not complete.",
        boundary:
          "Source exists only. Validation, runtime, and signal claims are blocked at this ceiling; no validation claim is made yet.",
      },
    ],
  },
  {
    family: "Network / Visibility Contract",
    nodes: [
      {
        id: "HO-NDR-001",
        title: "Security Onion / NDR Visibility Boundary",
        attack: "Boundary / corroboration contract — not a coverage claim",
        ceiling: "BOUNDARY_CONTRACT_ONLY",
        tone: "contract",
        validation: "Contract surface — no validation count.",
        boundary:
          "Security Onion observed proof is blocked; this defines a visibility boundary and makes no observed-signal claim.",
      },
    ],
  },
  {
    family: "Pipeline / Telemetry Contract",
    nodes: [
      {
        id: "HO-PIPE-001",
        title: "Cribl / Pipeline Route Integrity",
        attack: "Pipeline route contract — not an ATT&CK detection proof",
        ceiling: "SOURCE_EXISTS · VALIDATION_PLANNED",
        tone: "planned",
        validation: "Source exists; validation planned.",
        boundary:
          "Cribl-routed proof is blocked at this ceiling; no Cribl-routed claim is made.",
      },
    ],
  },
];

/** Section-level safe copy. Kept here so the contract scanner sees the negation. */
export const attackMapSafeCopy =
  "ATT&CK mapping helps reviewers understand detection intent and coverage. It does not prove live telemetry, runtime deployment, signal observation, or customer use.";
