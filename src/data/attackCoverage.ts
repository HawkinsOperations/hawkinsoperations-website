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

export type KillChainStage = {
  stage: string;
  mappedArtifacts: string[];
  currentState: string;
  strongestArtifact: string;
  blockedClaims: string[];
  reviewerInterpretation: string;
};

export const cyberKillChainBoundary =
  "Cyber Kill Chain mapping is reviewer navigation, not proof authority. Follow the path: Cyber Kill Chain -> MITRE ATT&CK -> detection source -> validation -> proof boundary.";

export const cyberKillChainStages: KillChainStage[] = [
  {
    stage: "Reconnaissance",
    mappedArtifacts: ["ID-DET-001..004", "HO-NDR-001", "HO-PIPE-001"],
    currentState: "Boundary/source contracts plus controlled identity validation reports.",
    strongestArtifact: "ID-DET validation reports and HO-NDR-001 / HO-PIPE-001 boundary contracts.",
    blockedClaims: ["live IdP", "live SIEM/NDR", "complete identity coverage", "public-safe runtime proof"],
    reviewerInterpretation:
      "Use this stage to inspect visibility planning, identity-context validation, and gap tracking without inferring live coverage.",
  },
  {
    stage: "Weaponization",
    mappedArtifacts: ["Detection source packages", "validation packages", "proof records where present"],
    currentState: "Defensive behavior modeling with source, validation, and proof truth separated.",
    strongestArtifact: "Proof records for HO-DET-001, HO-DET-011, HO-DET-012, and AWS-DET-001 where present.",
    blockedClaims: ["AI-approved detection", "analyst-approved disposition", "production-ready", "runtime-active"],
    reviewerInterpretation:
      "Use this stage to see how behaviors become testable detection artifacts and where proof records do or do not exist.",
  },
  {
    stage: "Delivery",
    mappedArtifacts: ["AWS-DET-001"],
    currentState: "FIXTURE_ONLY / CONTROLLED_TEST_VALIDATED.",
    strongestArtifact: "AWS-DET-001 proof record and proof card.",
    blockedClaims: ["live AWS", "live CloudTrail", "AWS account coverage", "cloud runtime-active proof"],
    reviewerInterpretation:
      "Use this stage for cloud-access fixture review only; it does not assert a live AWS deployment.",
  },
  {
    stage: "Exploitation",
    mappedArtifacts: ["HO-DET-001", "Proof Pack 001", "controlled case packet"],
    currentState: "CONTROLLED_TEST_VALIDATED.",
    strongestArtifact: "HO-DET-001 proof record, proof card, Proof Pack 001, and validation report.",
    blockedClaims: ["live Splunk", "runtime-active", "signal-observed", "production-ready"],
    reviewerInterpretation:
      "Use this stage to trace PowerShell execution detection from ATT&CK mapping through source, validation, and proof boundary.",
  },
  {
    stage: "Installation",
    mappedArtifacts: ["HO-DET-011", "HO-DET-012"],
    currentState:
      "HO-DET-011 has private runtime evidence captured and excluded; HO-DET-012 has a CONTROLLED_TEST_VALIDATED proof record.",
    strongestArtifact: "HO-DET-012 proof record, proof card, validation report, and proof index boundary.",
    blockedClaims: ["public-safe proof", "signal-observed", "production deployment", "scheduled-task coverage completeness"],
    reviewerInterpretation:
      "Use this stage for persistence review; HO-DET-012 is no longer validation-only, but it remains runtime/signal/public-safe blocked.",
  },
  {
    stage: "Command & Control",
    mappedArtifacts: ["HO-NDR-001", "HO-PIPE-001"],
    currentState: "BOUNDARY_CONTRACT_ONLY / SOURCE_EXISTS / VALIDATION_CONTRACT_ENFORCED.",
    strongestArtifact: "HO-NDR-001 boundary contract and HO-PIPE-001 route-integrity contract.",
    blockedClaims: ["Security Onion observed proof", "Cribl-routed proof", "Wazuh-routed proof", "signal-observed"],
    reviewerInterpretation:
      "Use this stage to inspect telemetry architecture and route-integrity boundaries without claiming observed C2 telemetry.",
  },
  {
    stage: "Actions on Objectives",
    mappedArtifacts: ["SOAR Case Packet v0", "AutoSOC Case Ledger v0", "Local GPU Triage Gate", "Offline LLM Triage Support Contract"],
    currentState: "AI_SUPPORT_ONLY / HUMAN_REVIEW_REQUIRED.",
    strongestArtifact: "SOAR case packet, AutoSOC packet, Detection Factory Controller v0, and LLM support contract.",
    blockedClaims: ["autonomous SOC", "AI-approved disposition", "analyst-approved disposition", "containment execution"],
    reviewerInterpretation:
      "Use this stage to inspect analyst-support workflow controls; AI remains labor and human review remains authority.",
  },
];

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
          "Proof record present in hawkinsoperations-proof. Runtime, signal, public-safe runtime proof, and completeness claims remain blocked at this ceiling.",
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
  "Cyber Kill Chain and ATT&CK mapping help reviewers understand lifecycle stage, detection intent, and coverage. They do not prove live telemetry, runtime deployment, signal observation, or customer use.";
