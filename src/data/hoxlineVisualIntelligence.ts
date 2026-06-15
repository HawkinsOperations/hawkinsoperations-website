export type HoxlineStageStatus =
  | "PASS"
  | "BLOCKED"
  | "MISSING_EVIDENCE"
  | "HUMAN_REVIEW_REQUIRED"
  | "REFERENCE_ONLY";

export type VisualTone = "cyan" | "blue" | "green" | "amber" | "red" | "neutral";

export type LoopStageStatus = {
  id: string;
  stage: string;
  status: HoxlineStageStatus;
  reviewerNote: string;
  authorityRefs: string[];
  missingEvidence: string[];
  tone: VisualTone;
};

export type Capability = {
  id: string;
  label: string;
  state: "available" | "controlled" | "gated";
  score: number;
  detail: string;
  evidence: string;
};

export type GeneratedOutput = {
  id: string;
  label: string;
  href: string;
  kind: "json" | "markdown" | "docs" | "pull-request";
  detail: string;
};

export type AuthoritySurface = {
  id: string;
  label: string;
  role: string;
  status: "control" | "source-truth" | "behavior-truth" | "contracts" | "proof-records" | "rendering" | "routing";
  detail: string;
  tone: VisualTone;
};

export type ClaimDecisionGroup = {
  id: string;
  label: string;
  status: "allowed" | "blocked" | "required";
  claims: string[];
  detail: string;
  tone: VisualTone;
};

export type EvidenceTimelineEvent = {
  id: string;
  label: string;
  status: string;
  detail: string;
  tone: VisualTone;
};

export type VisualModuleDefinition = {
  id: string;
  label: string;
  role: string;
  interaction: string;
};

export const hoxlineDataSource = {
  mode: "GAUNTLET_V0_FALLBACK",
  sourcePath:
    "C:\\Raylee\\Repo\\HawkinsOperations\\aevumguard\\examples\\gauntlet\\ho-det-001-full-loop-run-v0.json",
  schemaPath:
    "C:\\Raylee\\Repo\\HawkinsOperations\\aevumguard\\schemas\\gauntlet-full-loop-run-v0.schema.json",
  localSourceCommit: "9c6b591af20a6ecb7fb38aa192a2253f20acd9ed",
  runId: "ho-det-001-full-loop-run-v0",
  artifactId: "HO-DET-001",
  product: "Hoxline by HawkinsOperations",
  proofCeiling: "CONTROLLED_TEST_VALIDATED",
  publicSafe: false,
  humanReviewRequired: true,
} as const;

export const loopStageStatuses: LoopStageStatus[] = [
  {
    id: "ai-assisted",
    stage: "AI-assisted security work",
    status: "REFERENCE_ONLY",
    reviewerNote: "Artifact is treated as referenced AI-assisted security work; AI is not authority.",
    authorityRefs: ["HOXLINE-CONTROLLED-DEMO-V0"],
    missingEvidence: [],
    tone: "cyan",
  },
  {
    id: "artifact-intake",
    stage: "Artifact Intake",
    status: "PASS",
    reviewerNote: "Artifact intake is accepted for this controlled run.",
    authorityRefs: ["HOXLINE-CONTROLLED-DEMO-V0"],
    missingEvidence: [],
    tone: "green",
  },
  {
    id: "evidence-graph",
    stage: "Evidence Graph",
    status: "PASS",
    reviewerNote: "Evidence graph example links the artifact through the loop.",
    authorityRefs: ["ho-det-001-evidence-graph-v0"],
    missingEvidence: [],
    tone: "green",
  },
  {
    id: "telemetry-contract",
    stage: "Telemetry Contract Check",
    status: "PASS",
    reviewerNote: "Telemetry contract support is referenced from source-truth artifacts.",
    authorityRefs: ["ho-det-001-telemetry-contract"],
    missingEvidence: [],
    tone: "green",
  },
  {
    id: "controlled-validation",
    stage: "Controlled Validation",
    status: "PASS",
    reviewerNote: "Controlled validation is limited to controlled positive and negative process-creation fixtures.",
    authorityRefs: [
      "hawkinsoperations-proof/proof/records/HO-DET-001.md",
      "hawkinsoperations-proof/proof/cards/HO-DET-001.md",
      "hawkinsoperations-detections/detections/successor/ho-det-001/rule.yml",
      "hawkinsoperations-detections/detections/successor/ho-det-001/status.yml",
      "hawkinsoperations-validation/reports/ho-det-001/validation-result.json",
      "hawkinsoperations-validation/validation/successor/ho-det-001/validation-cases.json",
      "hawkinsoperations-platform/contracts/examples/ho-det-001-runtime-contract.sample.json",
    ],
    missingEvidence: [],
    tone: "green",
  },
  {
    id: "runtime-candidate",
    stage: "Runtime Candidate Ledger",
    status: "BLOCKED",
    reviewerNote: "Runtime evidence is missing; this run does not claim runtime-active status.",
    authorityRefs: [],
    missingEvidence: ["runtime_evidence"],
    tone: "red",
  },
  {
    id: "signal-observation",
    stage: "Signal Observation",
    status: "MISSING_EVIDENCE",
    reviewerNote: "Signal evidence is missing; this run does not claim signal observed status.",
    authorityRefs: [],
    missingEvidence: ["signal_observation_evidence"],
    tone: "amber",
  },
  {
    id: "human-review",
    stage: "Human Review Gate",
    status: "HUMAN_REVIEW_REQUIRED",
    reviewerNote: "Human review remains required; no final authorization claim is made.",
    authorityRefs: [],
    missingEvidence: ["human_review_gate_complete"],
    tone: "amber",
  },
  {
    id: "proofcard",
    stage: "ProofCard",
    status: "PASS",
    reviewerNote: "ProofCard v0 exists as a reviewer bridge, not proof authority.",
    authorityRefs: [
      "hawkinsoperations-proof/proof/records/HO-DET-001.md",
      "hawkinsoperations-validation/reports/ho-det-001/validation-result.json",
    ],
    missingEvidence: [],
    tone: "green",
  },
  {
    id: "claim-authority",
    stage: "Claim Authority",
    status: "PASS",
    reviewerNote: "Claim Authority preserves allowed wording and blocked wording boundaries.",
    authorityRefs: ["examples/policies/default-claim-authority-policy.yml"],
    missingEvidence: [],
    tone: "green",
  },
  {
    id: "safe-blocked-claim",
    stage: "Safe Claim / Blocked Claim",
    status: "PASS",
    reviewerNote: "Safe and blocked outputs are present under the controlled-validation proof ceiling.",
    authorityRefs: ["examples/gauntlet/ho-det-001-proofcard-v0.json"],
    missingEvidence: [],
    tone: "green",
  },
];

export const positiveCapabilities: Capability[] = [
  {
    id: "loop-execution",
    label: "Canonical loop execution",
    state: "available",
    score: 11,
    detail: "Gauntlet v0 emits all eleven canonical loop stages for HO-DET-001.",
    evidence: "Full-loop JSON and Markdown outputs exist in the Hoxline repo.",
  },
  {
    id: "reviewer-artifacts",
    label: "Reviewer-readable outputs",
    state: "available",
    score: 3,
    detail: "The runner emits structured JSON, Markdown, and reviewer summary content.",
    evidence: "examples/gauntlet and docs/gauntlet outputs.",
  },
  {
    id: "controlled-validation",
    label: "Controlled validation ceiling",
    state: "controlled",
    score: 1,
    detail: "The current ceiling remains CONTROLLED_TEST_VALIDATED.",
    evidence: "Gauntlet proof_ceiling field and controlled validation authority refs.",
  },
  {
    id: "claim-boundaries",
    label: "Claim boundary output",
    state: "available",
    score: 23,
    detail: "Blocked claim families and required evidence are emitted for reviewer inspection.",
    evidence: "blocked_claims and missing_evidence arrays.",
  },
  {
    id: "runtime-signal",
    label: "Runtime and signal gates",
    state: "gated",
    score: 2,
    detail: "Runtime Candidate Ledger remains blocked and Signal Observation remains missing evidence.",
    evidence: "runtime_evidence and signal_observation_evidence are missing.",
  },
];

export const validationMetrics = [
  { label: "Loop stages", value: loopStageStatuses.length, tone: "cyan" as VisualTone },
  { label: "PASS stages", value: loopStageStatuses.filter((stage) => stage.status === "PASS").length, tone: "green" as VisualTone },
  { label: "Gated stages", value: loopStageStatuses.filter((stage) => stage.status !== "PASS").length, tone: "amber" as VisualTone },
  { label: "Blocked claim groups", value: 23, tone: "red" as VisualTone },
];

export const generatedOutputs: GeneratedOutput[] = [
  {
    id: "full-loop-json",
    label: "Full-loop JSON",
    kind: "json",
    href: "https://github.com/HawkinsOperations/hoxline/blob/main/examples/gauntlet/ho-det-001-full-loop-run-v0.json",
    detail: "Structured reviewer artifact with stages, proof ceiling, allowed claim, blocked claims, and missing evidence.",
  },
  {
    id: "full-loop-markdown",
    label: "Full-loop Markdown",
    kind: "markdown",
    href: "https://github.com/HawkinsOperations/hoxline/blob/main/examples/gauntlet/ho-det-001-full-loop-run-v0.md",
    detail: "Human-readable full-loop report for review, not proof promotion.",
  },
  {
    id: "runner-docs",
    label: "Runner docs",
    kind: "docs",
    href: "https://github.com/HawkinsOperations/hoxline/blob/main/docs/gauntlet/HOXLINE_GAUNTLET_FULL_LOOP_RUNNER_V0.md",
    detail: "Documentation for the local Gauntlet runner and bounded output model.",
  },
  {
    id: "hoxline-pr-11",
    label: "Hoxline PR #11",
    kind: "pull-request",
    href: "https://github.com/HawkinsOperations/hoxline/pull/11",
    detail: "Merged Hoxline Gauntlet full-loop runner v0 change.",
  },
];

export const authoritySurfaces: AuthoritySurface[] = [
  {
    id: "hoxline",
    label: "Hoxline",
    role: "product/control plane",
    status: "control",
    detail: "Controls how AI-assisted security work moves through loop stages and claim decisions.",
    tone: "cyan",
  },
  {
    id: "detections",
    label: "detections",
    role: "source truth",
    status: "source-truth",
    detail: "Owns detection packages, rule context, and source metadata.",
    tone: "green",
  },
  {
    id: "validation",
    label: "validation",
    role: "behavior truth",
    status: "behavior-truth",
    detail: "Owns controlled fixture behavior status and validation reports.",
    tone: "green",
  },
  {
    id: "platform",
    label: "platform",
    role: "contracts and ledgers",
    status: "contracts",
    detail: "Owns schemas, ledgers, runtime contracts, and promotion mechanics.",
    tone: "blue",
  },
  {
    id: "proof",
    label: "proof",
    role: "proof authority",
    status: "proof-records",
    detail: "Owns proof records, evidence ceilings, and proof-card authority references.",
    tone: "amber",
  },
  {
    id: "website",
    label: "website",
    role: "rendering only",
    status: "rendering",
    detail: "Displays reviewer routes and public context without creating proof.",
    tone: "neutral",
  },
  {
    id: "github",
    label: ".github",
    role: "org/reviewer routing",
    status: "routing",
    detail: "Connects organization-level review and workflow routing.",
    tone: "blue",
  },
];

export const claimDecisionGroups: ClaimDecisionGroup[] = [
  {
    id: "allowed-now",
    label: "Allowed now",
    status: "allowed",
    claims: [
      "HO-DET-001 has controlled validation evidence from controlled positive and negative process-creation fixtures and remains under review.",
    ],
    detail: "This wording stays below the current controlled-validation ceiling.",
    tone: "green",
  },
  {
    id: "blocked-runtime-signal",
    label: "Blocked now",
    status: "blocked",
    claims: [
      "runtime-active",
      "runtime proven",
      "signal observed",
      "public runtime proof",
      "public signal proof",
    ],
    detail: "Runtime and signal evidence are missing from the Gauntlet v0 run.",
    tone: "red",
  },
  {
    id: "blocked-public-business",
    label: "Blocked now",
    status: "blocked",
    claims: [
      "public-safe proof",
      "production-ready",
      "SOCaaS-ready",
      "customer deployed",
      "revenue",
      "legal availability",
      "product-market fit",
    ],
    detail: "Public, business, legal, and service claims require separate evidence and approval.",
    tone: "red",
  },
  {
    id: "required-promotion",
    label: "Required before promotion",
    status: "required",
    claims: [
      "runtime_evidence",
      "signal_observation_evidence",
      "public_safe_authorization",
      "human_review_gate_complete",
    ],
    detail: "The next gates are evidence records and review completion, not a website rendering update.",
    tone: "amber",
  },
];

export const evidencePathTimeline: EvidenceTimelineEvent[] = [
  {
    id: "source-artifact",
    label: "Source artifact",
    status: "HO-DET-001",
    detail: "Detection source and status metadata identify the artifact under review.",
    tone: "cyan",
  },
  {
    id: "controlled-fixtures",
    label: "Controlled fixtures",
    status: "validated",
    detail: "Controlled positive and negative process-creation fixtures support controlled validation only.",
    tone: "green",
  },
  {
    id: "gauntlet-run",
    label: "Gauntlet run",
    status: "emitted",
    detail: "The runner emits stage table, proof ceiling, allowed claim, blocked claims, and missing evidence.",
    tone: "blue",
  },
  {
    id: "runtime-ledger",
    label: "Runtime Candidate Ledger",
    status: "BLOCKED",
    detail: "Runtime evidence is absent from this public loop output.",
    tone: "red",
  },
  {
    id: "signal-observation",
    label: "Signal Observation",
    status: "MISSING_EVIDENCE",
    detail: "Signal observation evidence is absent from this public loop output.",
    tone: "amber",
  },
  {
    id: "reviewer-handoff",
    label: "Reviewer handoff",
    status: "human_review_required",
    detail: "Human review remains required before stronger public wording can move.",
    tone: "amber",
  },
];

export const stillGatedStates = [
  "runtime_evidence",
  "signal_observation_evidence",
  "public_safe_authorization",
  "human_review_gate_complete",
  "analyst_review_record",
  "final_authorization_record",
  "customer_deployment_evidence",
  "service_readiness_review",
  "business_evidence_record",
  "legal_review_record",
];

export const visualModuleDefinitions: VisualModuleDefinition[] = [
  {
    id: "loop-orbit",
    label: "LoopStatusOrbit",
    role: "Interactive stage map",
    interaction: "Select a loop stage to inspect status, authority references, and missing evidence.",
  },
  {
    id: "authority-constellation",
    label: "AuthorityConstellation",
    role: "Seven-surface authority map",
    interaction: "Select a surface to inspect role and authority boundary.",
  },
  {
    id: "artifact-wall",
    label: "OutputArtifactWall",
    role: "Generated output preview",
    interaction: "Select JSON, Markdown, docs, or PR output.",
  },
  {
    id: "claim-matrix",
    label: "ClaimDecisionMatrixVisual",
    role: "Claim decision groups",
    interaction: "Toggle allowed, blocked, and required evidence groups.",
  },
  {
    id: "timeline",
    label: "EvidencePathTimeline",
    role: "Reviewer path timeline",
    interaction: "Select timeline nodes to inspect what each step proves or gates.",
  },
];

export const complexityStats = [
  { label: "Canonical loop stages", value: "11", detail: "from Gauntlet v0", tone: "cyan" as VisualTone },
  { label: "Authority surfaces", value: "7", detail: "kept separate", tone: "blue" as VisualTone },
  { label: "Generated outputs", value: "3+", detail: "JSON, Markdown, docs", tone: "green" as VisualTone },
  { label: "Gated evidence items", value: `${stillGatedStates.length}`, detail: "still required", tone: "amber" as VisualTone },
];
