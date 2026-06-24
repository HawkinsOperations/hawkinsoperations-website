import { blockedClaims, proofCeiling } from "./claims";
import { externalLinks } from "./navigation";

/**
 * proofRecordState values:
 *   PROOF_RECORD_PRESENT     a public proof record exists
 *   PRIVATE_RUNTIME_BOUNDARY private runtime evidence excluded, not public-safe
 *   NO_PROOF_RECORD          validation-only; no proof record exists yet
 *   BOUNDARY_CONTRACT_ONLY   contract sample only; no fixtures, no proof record
 */
export type ProofRecordState =
  | "PROOF_RECORD_PRESENT"
  | "PRIVATE_RUNTIME_BOUNDARY"
  | "NO_PROOF_RECORD"
  | "BOUNDARY_CONTRACT_ONLY";

export type ProofRecord = {
  detectionId: string;
  title: string;
  proofLevel: string;
  proofRecordState: ProofRecordState;
  validationState: string;
  runtimeState: string;
  signalState: string;
  publicSafeState: string;
  sourceRepoLink: string;
  proofRepoLink?: string;
  caseFileHref?: string;
  blockedPromotions: string[];
  exists: string[];
  passed: string[];
  notClaimed: string[];
  remainingBlocked: string[];
  promotionRequirements: string[];
  receiptTitle?: string;
  receiptSummary?: string;
  detectionSource?: string[];
  alertShape?: string[];
  workflowContract?: string[];
  proofAuthority?: string[];
  aiSupportBoundary?: string[];
  humanReviewGate?: string[];
};

export const lifetimeCaseLedgerV1 = {
  title: "Lifetime Case Ledger v1",
  status: "NOT_PUBLIC_SAFE",
  proofCeiling: "SCHEMA_CONTRACT_VERIFIER_EXISTS_ONLY",
  renderBoundary:
    "website is render-only; proof repo owns the summary and proof bundle; badges are workflow-status indicators only; no runtime, signal, public-safe runtime proof, SOCaaS, production, autonomous SOC, disposition, or case-closure claim is made.",
  counts: {
    total_ledger_events: 6,
    total_cases: 6,
    public_safe_count: 0,
    closed_case_count: 0,
    correction_event_count: 0,
    superseding_event_count: 0,
  },
  appendedDetections: ["HO-DET-001", "HO-DET-011", "HO-DET-012"],
  references: [
    {
      label: "Proof-owned public summary",
      href: externalLinks.lifetimeLedgerSummary,
      repoPath: "proof/records/lifetime-case-ledger-v1-public-summary.json",
      role: "bounded count and boundary summary",
    },
    {
      label: "Proof bundle",
      href: externalLinks.lifetimeLedgerProofBundle,
      repoPath: "proof/records/lifetime-case-ledger-v1-proof-bundle.json",
      role: "reviewer verification packet source",
    },
    {
      label: "Badge verification",
      href: externalLinks.lifetimeLedgerBadges,
      repoPath: ".github/workflows/governance-gate.yml",
      role: "workflow-status routing for ledger verifier jobs",
    },
  ],
  doesNotProve: [
    "live runtime activity",
    "signal observation",
    "public proof",
    "public-safe runtime proof",
    "SOCaaS deployment",
    "production deployment",
    "autonomous SOC authority",
    "AI-approved final disposition",
    "analyst-approved final disposition",
    "case closure authority",
  ],
} as const;

export const proofRecords: ProofRecord[] = [
  {
    detectionId: "HO-DET-001",
    title: "Controlled Validation Receipt · controlled-test validation",
    proofLevel: proofCeiling,
    proofRecordState: "PROOF_RECORD_PRESENT",
    validationState: "controlled-test validation status",
    runtimeState: "not claimed from public website",
    signalState: "not claimed from public website",
    publicSafeState: "blocked until evidence linkage and explicit promotion",
    sourceRepoLink: externalLinks.detections,
    proofRepoLink: externalLinks.proofRecord,
    caseFileHref: "/proof/ho-det-001/",
    blockedPromotions: blockedClaims,
    exists: [
      "A HO-DET-001 source route exists for Suspicious PowerShell EncodedCommand detection review.",
      "A public proof record route exists and owns the proof ceiling.",
      "A public website route can point reviewers to the proof record without becoming proof itself.",
      "A controlled-test validation boundary is stated for 14 deterministic fixtures.",
      "A platform case-packet / workflow contract exists as a non-promotional guardrail.",
    ],
    passed: [
      "The public ceiling is stated as CONTROLLED_TEST_VALIDATED.",
      "Blocked promotions are visible instead of hidden.",
      "Website rendering remains separated from evidence authority.",
      "The platform verifier preserves NOT_PUBLIC_SAFE and BLOCKED runtime promotion fields.",
      "The controlled validation receipt shows source, alert shape, validation, case packet, AI support, and human review as separate stages.",
    ],
    notClaimed: [
      "Runtime activation is not claimed.",
      "Signal observation is not claimed.",
      "Public-safe runtime proof is not claimed.",
      "Live Splunk fired, Cribl-routed status, Wazuh-routed public proof, AWS-live status, production-ready status, fleet-wide coverage, autonomous SOC operation, AI-approved disposition, and analyst-approved disposition are not claimed.",
      "External-use approval is not claimed.",
      "Public-safe proof is not claimed.",
      "Production/customer/SOCaaS deployment, SOCaaS-ready status, FortiSIEM integration proven status, and autonomous production alert resolution are not claimed.",
    ],
    remainingBlocked: [
      "Runtime evidence must be promoted separately.",
      "Signal evidence must be promoted separately.",
      "Public proof requires evidence linkage.",
      "The platform runtime contract does not promote HO-DET-001 beyond CONTROLLED_TEST_VALIDATED.",
      "Blocked-claim scanner must stay clean before wording changes ship.",
    ],
    promotionRequirements: [
      "Preserved validation output linked to the record.",
      "Evidence bundle with current trust classification.",
      "Runtime and signal claims reviewed independently.",
      "Public wording reviewed against blocked promotions.",
    ],
    receiptTitle: "HO-DET-001 Controlled Validation Receipt",
    receiptSummary:
      "A reviewer-readable receipt for a controlled validation loop: source-controlled detection, controlled alert shape, deterministic validation, support-only case packet flow, proof authority, and human review gate. The website renders the receipt; it does not authorize stronger proof.",
    detectionSource: [
      "Detection route: Suspicious PowerShell EncodedCommand.",
      "Source truth lives in the detections repository; source presence does not prove runtime deployment.",
      "Validation truth lives in controlled fixtures and verifiers, not in website rendering.",
    ],
    alertShape: [
      "Alert subject: encoded PowerShell process behavior.",
      "Reviewer shape: endpoint process context, command-line indicator, expected positive / negative fixture outcomes, and blocked response authority.",
      "The page does not expose raw private telemetry, internal host data, customer data, or runtime evidence.",
    ],
    workflowContract: [
      "Case packet contract: route source facts, validation result, missing context, blocked actions, and reviewer-safe wording.",
      "Workflow boundary: a packet can support analyst review; it cannot close a case, approve containment, or promote proof.",
      "Proof Pack 001 and the proof record are the reviewer routes for the current ceiling.",
    ],
    proofAuthority: [
      "Proof authority remains the proof record and validation artifacts, not the website page.",
      "Current public ceiling remains CONTROLLED_TEST_VALIDATED.",
      "Website rendering is not proof.",
    ],
    aiSupportBoundary: [
      "AI may draft, summarize sanitized facts, identify missing context, and prepare reviewer wording.",
      "AI cannot approve disposition, containment, case closure, proof promotion, public-safe status, or release authority.",
      "AI labor remains below deterministic checks and human governance.",
    ],
    humanReviewGate: [
      "Human review authorizes claim movement above the current ceiling.",
      "Green checks and website rendering are not merge, proof, publication, or promotion authority.",
      "Stronger runtime, signal, public-safe, deployment, SOCaaS-ready, FortiSIEM, autonomous, or analyst-disposition wording stays blocked until separately approved.",
    ],
  },
  {
    detectionId: "AWS-DET-001",
    title: "CloudTrail-style IAM denial fixture proof card",
    proofLevel: proofCeiling,
    proofRecordState: "PROOF_RECORD_PRESENT",
    validationState: "fixture-only controlled validation status",
    runtimeState: "not claimed from public website",
    signalState: "not claimed from public website",
    publicSafeState: "blocked until evidence linkage and explicit promotion",
    sourceRepoLink: externalLinks.detections,
    proofRepoLink: externalLinks.proofRecordAws,
    blockedPromotions: blockedClaims,
    exists: [
      "A public proof record route exists for AWS-DET-001.",
      "A fixture-only CloudTrail-style detection candidate is published as source.",
      "A fixture-only validation report is published in the validation repository.",
    ],
    passed: [
      "AWS-DET-001 passed fixture-only validation against controlled CloudTrail-style IAM denial fixtures.",
      "The website renders the public ceiling as CONTROLLED_TEST_VALIDATED.",
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
  {
    detectionId: "HO-DET-011",
    title: "Windows Service Creation / Binary Change · bounded summary",
    proofLevel: proofCeiling,
    proofRecordState: "PRIVATE_RUNTIME_BOUNDARY",
    validationState: "controlled-test validation · 17 fixtures · bounded summary approved",
    runtimeState: "private lab runtime receipt summarized; public runtime proof not claimed",
    signalState: "not claimed from public website",
    publicSafeState: "bounded public-safe summary approved; raw evidence private",
    sourceRepoLink: externalLinks.proof,
    blockedPromotions: blockedClaims,
    exists: [
      "A controlled-test validation package with 17 fixtures.",
      "A private lab runtime receipt with Wazuh-backed private observation.",
      "Merged deterministic verifier, review packet, decision gate, and Runtime Proof Factory v0 summary.",
    ],
    passed: [
      "17 / 17 fixtures pass deterministically.",
      "0 missed positives and 0 false-positive negatives.",
      "The website may publish the bounded summary; raw evidence remains outside public repos.",
    ],
    notClaimed: [
      "Public runtime proof and public signal-observed proof are not claimed.",
      "Splunk remains NOT_VERIFIED.",
      "Production, fleet-wide, autonomous SOC, AI-approved, and analyst-approved claims are not made.",
    ],
    remainingBlocked: [
      "Raw Wazuh lines, Windows event payloads, command output, host/user details, private paths, internal network details, service markers, correlation markers, and private hashes remain excluded.",
      "Public runtime proof requires a separate approval beyond this bounded summary.",
    ],
    promotionRequirements: [
      "Separate proof/index vocabulary and approval before any stronger runtime or signal claim.",
      "Fresh wording review before publishing any evidence anchor or private hash.",
    ],
  },
  {
    detectionId: "HO-DET-012",
    title: "Suspicious Scheduled Task Creation · bounded summary",
    proofLevel: proofCeiling,
    proofRecordState: "PROOF_RECORD_PRESENT",
    validationState: "controlled-test validation · 8 fixtures",
    runtimeState: "private lab runtime receipt summarized; public runtime proof not claimed",
    signalState: "not claimed from public website",
    publicSafeState: "bounded public-safe summary approved; raw evidence private",
    sourceRepoLink: externalLinks.proof,
    blockedPromotions: blockedClaims,
    exists: [
      "A controlled-test validation package with 8 fixtures.",
      "A governed proof record exists for controlled-test validation.",
      "A private lab runtime receipt with Wazuh-backed private observation.",
      "Merged deterministic verifier, review packet, decision gate, and Runtime Proof Factory v0 summary.",
    ],
    passed: [
      "8 / 8 fixtures pass deterministically.",
      "0 missed positives and 0 false-positive negatives.",
      "The website may publish the bounded summary; raw evidence remains outside public repos.",
    ],
    notClaimed: [
      "Public runtime proof and public signal-observed proof are not claimed.",
      "Splunk remains NOT_VERIFIED.",
      "Production, fleet-wide, autonomous SOC, AI-approved, and analyst-approved claims are not made.",
    ],
    remainingBlocked: [
      "Raw Wazuh lines, Windows event payloads, command output, host/user details, private paths, internal network details, task markers, correlation markers, and private hashes remain excluded.",
      "Public runtime proof requires a separate approval beyond this bounded summary.",
    ],
    promotionRequirements: [
      "Separate proof/index vocabulary and approval before any stronger runtime or signal claim.",
      "Fresh wording review before publishing any evidence anchor or private hash.",
    ],
  },
  {
    detectionId: "ID-DET-001",
    title: "Suspicious identity session context · no proof record",
    proofLevel: proofCeiling,
    proofRecordState: "NO_PROOF_RECORD",
    validationState: "controlled-test validation · 10 fixtures",
    runtimeState: "not claimed from public website",
    signalState: "not claimed from public website",
    publicSafeState: "blocked until evidence linkage and explicit promotion",
    sourceRepoLink: externalLinks.validation,
    blockedPromotions: blockedClaims,
    exists: [
      "A controlled-test validation package with 10 fixtures.",
      "No proof record exists yet; the row is validation-only.",
    ],
    passed: [
      "10 / 10 fixtures pass deterministically.",
      "0 missed positives and 0 false-positive negatives.",
    ],
    notClaimed: [
      "Live IdP / SIEM / NDR coverage is not claimed.",
      "Production identity coverage and autonomous / AI disposition are not claimed.",
    ],
    remainingBlocked: [
      "A proof record must be created before public proof status.",
    ],
    promotionRequirements: [
      "Proof record authored and linked to validation output.",
    ],
  },
  {
    detectionId: "ID-DET-002",
    title: "MFA fatigue / repeated MFA failure · no proof record",
    proofLevel: proofCeiling,
    proofRecordState: "NO_PROOF_RECORD",
    validationState: "controlled-test validation · 10 fixtures",
    runtimeState: "not claimed from public website",
    signalState: "not claimed from public website",
    publicSafeState: "blocked until evidence linkage and explicit promotion",
    sourceRepoLink: externalLinks.validation,
    blockedPromotions: blockedClaims,
    exists: [
      "A controlled-test validation package with 10 fixtures.",
      "No proof record exists yet; the row is validation-only.",
    ],
    passed: [
      "10 / 10 fixtures pass deterministically.",
      "0 missed positives and 0 false-positive negatives.",
    ],
    notClaimed: [
      "Live IdP and live SIEM / NDR are not claimed.",
      "Proof promotion and public-safe state are not claimed.",
    ],
    remainingBlocked: [
      "A proof record must be created before public proof status.",
    ],
    promotionRequirements: [
      "Proof record authored and linked to validation output.",
    ],
  },
  {
    detectionId: "ID-DET-003",
    title: "Privileged role / admin group change · no proof record",
    proofLevel: proofCeiling,
    proofRecordState: "NO_PROOF_RECORD",
    validationState: "controlled-test validation · 10 fixtures",
    runtimeState: "not claimed from public website",
    signalState: "not claimed from public website",
    publicSafeState: "blocked until evidence linkage and explicit promotion",
    sourceRepoLink: externalLinks.validation,
    blockedPromotions: blockedClaims,
    exists: [
      "A controlled-test validation package with 10 fixtures.",
      "No proof record exists yet; the row is validation-only.",
    ],
    passed: [
      "10 / 10 fixtures pass deterministically.",
      "0 missed positives and 0 false-positive negatives.",
    ],
    notClaimed: [
      "Live IdP / SIEM coverage is not claimed.",
      "Production coverage and AI / analyst disposition are not claimed.",
    ],
    remainingBlocked: [
      "A proof record must be created before public proof status.",
    ],
    promotionRequirements: [
      "Proof record authored and linked to validation output.",
    ],
  },
  {
    detectionId: "ID-DET-004",
    title: "Impossible travel / anomalous session · no proof record",
    proofLevel: proofCeiling,
    proofRecordState: "NO_PROOF_RECORD",
    validationState: "controlled-test validation · 10 fixtures",
    runtimeState: "not claimed from public website",
    signalState: "not claimed from public website",
    publicSafeState: "blocked until evidence linkage and explicit promotion",
    sourceRepoLink: externalLinks.validation,
    blockedPromotions: blockedClaims,
    exists: [
      "A controlled-test validation package with 10 fixtures.",
      "No proof record exists yet; the row is validation-only.",
    ],
    passed: [
      "10 / 10 fixtures pass deterministically.",
      "0 missed positives and 0 false-positive negatives.",
    ],
    notClaimed: [
      "Impossible-travel and session-hijacking completeness are not claimed.",
      "Live IdP and public-safe state are not claimed.",
    ],
    remainingBlocked: [
      "Completeness is blocked; a proof record must be created before public proof status.",
    ],
    promotionRequirements: [
      "Proof record authored and linked to validation output.",
    ],
  },
  {
    detectionId: "HO-NDR-001",
    title: "Security Onion visibility contract · boundary scaffold",
    proofLevel: "BOUNDARY_CONTRACT_ONLY",
    proofRecordState: "BOUNDARY_CONTRACT_ONLY",
    validationState: "contract sample only · no fixtures",
    runtimeState: "not claimed from public website",
    signalState: "not claimed from public website",
    publicSafeState: "blocked until evidence linkage and explicit promotion",
    sourceRepoLink: externalLinks.validation,
    blockedPromotions: blockedClaims,
    exists: [
      "A boundary contract sample for Security Onion visibility.",
      "No fixtures and no proof record; the row is contract-only.",
    ],
    passed: [
      "A cross-source corroboration contract is defined.",
    ],
    notClaimed: [
      "Security Onion runtime, Splunk search, and Cribl / Wazuh routes are not claimed.",
      "Zeek / Suricata quality and public-safe proof are not claimed.",
    ],
    remainingBlocked: [
      "Cross-source corroboration contract is defined, not promoted to proof.",
    ],
    promotionRequirements: [
      "Fixtures authored and validated before any proof record.",
    ],
  },
];

export const flagshipProofRecord = proofRecords[0];
