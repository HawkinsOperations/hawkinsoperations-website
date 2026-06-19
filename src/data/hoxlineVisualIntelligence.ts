// HISTORICAL_POINT_IN_TIME: Capability Visual Data Pack v1 snapshot rendered for reviewer context.
// Changing public metrics belong in src/data/generated/public-status.generated.ts.

export type HoxlineStageStatus =
  | "PASS"
  | "BLOCKED"
  | "MISSING_EVIDENCE"
  | "HUMAN_REVIEW_REQUIRED"
  | "NOT_PUBLIC_SAFE"
  | "REFERENCE_ONLY";

export type VisualTone = "cyan" | "blue" | "green" | "amber" | "red" | "neutral";

export type LoopStageStatus = {
  id: string;
  order: number;
  stage: string;
  status: HoxlineStageStatus;
  statusGroup: string;
  reviewerNote: string;
  authoritySurface: string;
  authorityRefs: string[];
  missingEvidence: string[];
  tone: VisualTone;
};

export type Capability = {
  id: string;
  label: string;
  state: "available" | "controlled" | "gated";
  detail: string;
  evidence: string;
};

export type GeneratedOutput = {
  id: string;
  label: string;
  href: string;
  kind: "json" | "markdown" | "schema" | "docs" | "pull-request";
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
  order: number;
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
  dataSource: string;
  mobileBehavior: string;
  proofBoundaryNote: string;
};

export type StageStatusDistribution = {
  status: HoxlineStageStatus;
  count: number;
  stages: string[];
  tone: VisualTone;
};

export type CapabilityMaturityDatum = {
  capability: string;
  maturityScore: number;
  maturityLabel: string;
  basis: string;
  tone: VisualTone;
};

export type GeneratedOutputsDatum = {
  outputType: string;
  count: number;
  examples: string[];
  targetReader: string;
  tone: VisualTone;
};

export type VisualMetric = {
  label: string;
  value: string;
  detail: string;
  tone: VisualTone;
};

const hoxlineBlobBase = "https://github.com/HawkinsOperations/hoxline/blob/main/";

const pathHref = (path: string) => `${hoxlineBlobBase}${path}`;

const toneForStatus = (status: HoxlineStageStatus): VisualTone => {
  switch (status) {
    case "PASS":
      return "green";
    case "BLOCKED":
      return "red";
    case "MISSING_EVIDENCE":
    case "HUMAN_REVIEW_REQUIRED":
    case "NOT_PUBLIC_SAFE":
      return "amber";
    case "REFERENCE_ONLY":
      return "cyan";
  }
};

// Copied from Hoxline PR #13 after merge.
// Source: C:\Raylee\Repo\HawkinsOperations\hoxline\examples\showcase\ho-det-001-capability-visual-data-pack-v1.json
// Schema: C:\Raylee\Repo\HawkinsOperations\hoxline\schemas\capability-visual-data-pack-v1.schema.json
export const hoxlineDataSource = {
  mode: "CAPABILITY_VISUAL_DATA_PACK_V1",
  sourcePath:
    "C:\\Raylee\\Repo\\HawkinsOperations\\hoxline\\examples\\showcase\\ho-det-001-capability-visual-data-pack-v1.json",
  markdownPath:
    "C:\\Raylee\\Repo\\HawkinsOperations\\hoxline\\examples\\showcase\\ho-det-001-capability-visual-data-pack-v1.md",
  schemaPath:
    "C:\\Raylee\\Repo\\HawkinsOperations\\hoxline\\schemas\\capability-visual-data-pack-v1.schema.json",
  localSourceCommit: "903da4e5cccc9eeb53a4c21b8639c7d472b7eb7d",
  sourcePr: "Hoxline PR #13",
  showcaseId: "ho-det-001-capability-visual-data-pack-v1",
  artifactId: "HO-DET-001",
  product: "Hoxline by HawkinsOperations",
  category: "ProofOps",
  proofCeiling: "CONTROLLED_TEST_VALIDATED",
  publicSafe: false,
  humanReviewRequired: true,
  currentSafeClaim:
    "HO-DET-001 has controlled validation evidence from controlled positive and negative process-creation fixtures and remains under review.",
  executiveSummary:
    "Hoxline can run the HO-DET-001 ProofOps loop, package reviewer-readable outputs, verify the output contract, preserve the controlled-validation proof ceiling, and keep stronger claims gated when evidence is missing.",
  doctrine: {
    primary: "AI is not the authority. Evidence is.",
    controlPlane: "Hoxline controls what AI-assisted security work is allowed to become.",
    proofBoundary: "Hoxline is not proof authority.",
    websiteBoundary: "Website rendering is not proof.",
  },
} as const;

export const positiveCapabilities: Capability[] = [
  {
    id: "canonical-proofops-loop",
    label: "Canonical ProofOps loop",
    state: "available",
    detail: "Hoxline can run the canonical ProofOps loop for HO-DET-001.",
    evidence: "examples/gauntlet/ho-det-001-full-loop-run-v0.json",
  },
  {
    id: "reviewer-json",
    label: "Reviewer-readable JSON",
    state: "available",
    detail: "Hoxline can emit reviewer-readable JSON.",
    evidence: "examples/gauntlet/ho-det-001-full-loop-run-v0.json",
  },
  {
    id: "reviewer-markdown",
    label: "Reviewer-readable Markdown",
    state: "available",
    detail: "Hoxline can emit reviewer-readable Markdown.",
    evidence: "examples/gauntlet/ho-det-001-full-loop-run-v0.md",
  },
  {
    id: "output-contract-verification",
    label: "Output contract verification",
    state: "available",
    detail: "Hoxline can verify the Gauntlet full-loop output contract.",
    evidence: "schemas/gauntlet-full-loop-run-v0.schema.json",
  },
  {
    id: "proof-ceiling-preservation",
    label: "Proof ceiling preservation",
    state: "controlled",
    detail: "Hoxline can preserve the CONTROLLED_TEST_VALIDATED proof ceiling.",
    evidence: "examples/gauntlet/ho-det-001-full-loop-run-v0.json",
  },
  {
    id: "safe-claim-mapping",
    label: "Safe claim mapping",
    state: "available",
    detail: "Hoxline can map artifact state to allowed claim wording.",
    evidence: "examples/gauntlet/ho-det-001-proofcard-v0.json",
  },
  {
    id: "blocked-claim-mapping",
    label: "Blocked claim mapping",
    state: "available",
    detail: "Hoxline can map blocked claim families to safer wording and missing evidence.",
    evidence: "examples/gauntlet/ho-det-001-full-loop-run-v0.json",
  },
  {
    id: "runtime-signal-gating",
    label: "Runtime and signal gating",
    state: "gated",
    detail: "Hoxline can keep runtime and signal gated when evidence is missing.",
    evidence: "examples/gauntlet/ho-det-001-full-loop-run-v0.json",
  },
  {
    id: "authority-separation",
    label: "Authority separation",
    state: "controlled",
    detail: "Hoxline can represent authority separation across the seven-repo system.",
    evidence: "README.md",
  },
  {
    id: "single-artifact-story",
    label: "Single-artifact story",
    state: "available",
    detail: "Hoxline can show one artifact, one loop, one safe claim, and blocked stronger claims.",
    evidence: "docs/gauntlet/HO_DET_001_GAUNTLET_RUN.md",
  },
];

export const loopStageStatuses: LoopStageStatus[] = [
  {
    id: "ai-assisted-security-work",
    order: 1,
    stage: "AI-assisted security work",
    status: "REFERENCE_ONLY",
    statusGroup: "reference",
    authoritySurface: "hoxline",
    reviewerNote: "Artifact is treated as referenced AI-assisted security work; AI is not authority.",
    authorityRefs: ["hoxline"],
    missingEvidence: [],
    tone: "cyan",
  },
  {
    id: "artifact-intake",
    order: 2,
    stage: "Artifact Intake",
    status: "PASS",
    statusGroup: "working",
    authoritySurface: "hoxline",
    reviewerNote: "Artifact intake is accepted for this controlled run.",
    authorityRefs: ["hoxline"],
    missingEvidence: [],
    tone: "green",
  },
  {
    id: "evidence-graph",
    order: 3,
    stage: "Evidence Graph",
    status: "PASS",
    statusGroup: "working",
    authoritySurface: "hoxline",
    reviewerNote: "Evidence graph example links the artifact through the loop.",
    authorityRefs: ["hoxline"],
    missingEvidence: [],
    tone: "green",
  },
  {
    id: "telemetry-contract-check",
    order: 4,
    stage: "Telemetry Contract Check",
    status: "PASS",
    statusGroup: "working",
    authoritySurface: "hawkinsoperations-platform",
    reviewerNote: "Telemetry contract support is referenced from source-truth artifacts.",
    authorityRefs: ["hawkinsoperations-platform"],
    missingEvidence: [],
    tone: "green",
  },
  {
    id: "controlled-validation",
    order: 5,
    stage: "Controlled Validation",
    status: "PASS",
    statusGroup: "working",
    authoritySurface: "hawkinsoperations-validation",
    reviewerNote: "Controlled validation is limited to controlled positive and negative process-creation fixtures.",
    authorityRefs: ["hawkinsoperations-validation"],
    missingEvidence: [],
    tone: "green",
  },
  {
    id: "runtime-candidate-ledger",
    order: 6,
    stage: "Runtime Candidate Ledger",
    status: "BLOCKED",
    statusGroup: "gated",
    authoritySurface: "hoxline",
    reviewerNote: "Runtime evidence is missing; this run does not claim runtime-active status.",
    authorityRefs: ["hoxline"],
    missingEvidence: ["runtime_evidence"],
    tone: "red",
  },
  {
    id: "signal-observation",
    order: 7,
    stage: "Signal Observation",
    status: "MISSING_EVIDENCE",
    statusGroup: "gated",
    authoritySurface: "hoxline",
    reviewerNote: "Signal evidence is missing; this run does not claim signal observed status.",
    authorityRefs: ["hoxline"],
    missingEvidence: ["signal_observation_evidence"],
    tone: "amber",
  },
  {
    id: "human-review-gate",
    order: 8,
    stage: "Human Review Gate",
    status: "HUMAN_REVIEW_REQUIRED",
    statusGroup: "review",
    authoritySurface: "hoxline",
    reviewerNote: "Human review remains required; no final authorization claim is made.",
    authorityRefs: ["hoxline"],
    missingEvidence: ["human_review_gate_complete"],
    tone: "amber",
  },
  {
    id: "proofcard",
    order: 9,
    stage: "ProofCard",
    status: "PASS",
    statusGroup: "working",
    authoritySurface: "hawkinsoperations-proof",
    reviewerNote: "ProofCard v0 exists as a reviewer bridge, not proof authority.",
    authorityRefs: ["hawkinsoperations-proof"],
    missingEvidence: [],
    tone: "green",
  },
  {
    id: "claim-authority",
    order: 10,
    stage: "Claim Authority",
    status: "PASS",
    statusGroup: "working",
    authoritySurface: "hoxline",
    reviewerNote: "Claim Authority preserves allowed wording and blocked wording boundaries.",
    authorityRefs: ["hoxline"],
    missingEvidence: [],
    tone: "green",
  },
  {
    id: "safe-claim-blocked-claim",
    order: 11,
    stage: "Safe Claim / Blocked Claim",
    status: "PASS",
    statusGroup: "working",
    authoritySurface: "hoxline",
    reviewerNote: "Safe and blocked outputs are present under the controlled-validation proof ceiling.",
    authorityRefs: ["hoxline"],
    missingEvidence: [],
    tone: "green",
  },
];

export const stageStatusDistribution: StageStatusDistribution[] = [
  {
    status: "PASS",
    count: 7,
    stages: [
      "Artifact Intake",
      "Evidence Graph",
      "Telemetry Contract Check",
      "Controlled Validation",
      "ProofCard",
      "Claim Authority",
      "Safe Claim / Blocked Claim",
    ],
    tone: "green",
  },
  { status: "BLOCKED", count: 1, stages: ["Runtime Candidate Ledger"], tone: "red" },
  { status: "MISSING_EVIDENCE", count: 1, stages: ["Signal Observation"], tone: "amber" },
  { status: "HUMAN_REVIEW_REQUIRED", count: 1, stages: ["Human Review Gate"], tone: "amber" },
  { status: "REFERENCE_ONLY", count: 1, stages: ["AI-assisted security work"], tone: "cyan" },
];

export const validationMetrics = stageStatusDistribution.map((datum) => ({
  label: datum.status,
  value: datum.count,
  tone: datum.tone,
  detail: datum.stages.join(", "),
}));

export const capabilityMaturityChart: CapabilityMaturityDatum[] = [
  {
    capability: "Gauntlet full-loop runner",
    maturityScore: 85,
    maturityLabel: "operational v0",
    basis: "Runner emits JSON and Markdown for all 11 stages.",
    tone: "green",
  },
  {
    capability: "Gauntlet output contract",
    maturityScore: 80,
    maturityLabel: "contracted v0",
    basis: "Verify CLI and schema enforce output invariants.",
    tone: "green",
  },
  {
    capability: "Controlled validation packaging",
    maturityScore: 78,
    maturityLabel: "validated in controlled scope",
    basis: "Controlled positive and negative metrics are recorded.",
    tone: "green",
  },
  {
    capability: "Claim Authority packaging",
    maturityScore: 76,
    maturityLabel: "working boundary control",
    basis: "Allowed claim and blocked claim families are emitted.",
    tone: "green",
  },
  {
    capability: "Runtime evidence",
    maturityScore: 20,
    maturityLabel: "gated",
    basis: "Runtime Candidate Ledger remains BLOCKED.",
    tone: "red",
  },
  {
    capability: "Signal evidence",
    maturityScore: 20,
    maturityLabel: "gated",
    basis: "Signal Observation remains MISSING_EVIDENCE.",
    tone: "amber",
  },
  {
    capability: "Public-safe release",
    maturityScore: 10,
    maturityLabel: "not public-safe",
    basis: "public_safe remains false.",
    tone: "amber",
  },
  {
    capability: "Business, legal, and market claims",
    maturityScore: 5,
    maturityLabel: "not asserted",
    basis: "Business, legal, and market evidence is outside this controlled data pack.",
    tone: "neutral",
  },
];

export const generatedOutputs: GeneratedOutput[] = [
  {
    id: "full-loop-json",
    label: "Full-loop JSON",
    kind: "json",
    href: pathHref("examples/gauntlet/ho-det-001-full-loop-run-v0.json"),
    detail: "Target reader: reviewer or website data loader.",
  },
  {
    id: "full-loop-markdown",
    label: "Full-loop Markdown",
    kind: "markdown",
    href: pathHref("examples/gauntlet/ho-det-001-full-loop-run-v0.md"),
    detail: "Target reader: human reviewer.",
  },
  {
    id: "gauntlet-schema",
    label: "Gauntlet output schema",
    kind: "schema",
    href: pathHref("schemas/gauntlet-full-loop-run-v0.schema.json"),
    detail: "Target reader: contract verifier.",
  },
  {
    id: "visual-data-pack-schema",
    label: "Visual data pack schema",
    kind: "schema",
    href: pathHref("schemas/capability-visual-data-pack-v1.schema.json"),
    detail: "Target reader: website data loader.",
  },
];

export const generatedOutputsChart: GeneratedOutputsDatum[] = [
  {
    outputType: "JSON",
    count: 1,
    examples: ["examples/gauntlet/ho-det-001-full-loop-run-v0.json"],
    targetReader: "website data loader",
    tone: "cyan",
  },
  {
    outputType: "Markdown",
    count: 1,
    examples: ["examples/gauntlet/ho-det-001-full-loop-run-v0.md"],
    targetReader: "human reviewer",
    tone: "green",
  },
  {
    outputType: "Schema",
    count: 2,
    examples: [
      "schemas/gauntlet-full-loop-run-v0.schema.json",
      "schemas/capability-visual-data-pack-v1.schema.json",
    ],
    targetReader: "verifier or data loader",
    tone: "blue",
  },
];

export const authoritySurfaces: AuthoritySurface[] = [
  {
    id: "github",
    label: ".github",
    role: "organization workflow metadata",
    status: "routing",
    detail: "Owns organization-level repository coordination; does not own artifact proof status.",
    tone: "blue",
  },
  {
    id: "detections",
    label: "detections",
    role: "detection source",
    status: "source-truth",
    detail: "Owns detection rule and status source references; does not own public-safe release claims.",
    tone: "green",
  },
  {
    id: "validation",
    label: "validation",
    role: "controlled validation",
    status: "behavior-truth",
    detail: "Owns controlled validation cases and reports; does not own runtime or signal claims.",
    tone: "green",
  },
  {
    id: "platform",
    label: "platform",
    role: "runtime contract examples",
    status: "contracts",
    detail: "Owns platform contract references; does not own runtime observation proof.",
    tone: "blue",
  },
  {
    id: "proof",
    label: "proof",
    role: "proof records and cards",
    status: "proof-records",
    detail: "Owns proof status records; does not own Hoxline website rendering.",
    tone: "amber",
  },
  {
    id: "website",
    label: "website",
    role: "public rendering",
    status: "rendering",
    detail: "Owns website presentation; does not own proof authority.",
    tone: "neutral",
  },
  {
    id: "hoxline",
    label: "hoxline",
    role: "ProofOps control plane",
    status: "control",
    detail: "Owns claim boundary packaging, Gauntlet runner, output contract, and website-ready data; does not own proof authority.",
    tone: "cyan",
  },
];

export const claimDecisionGroups: ClaimDecisionGroup[] = [
  {
    id: "allowed-controlled-claim",
    label: "Allowed controlled claim",
    status: "allowed",
    claims: [hoxlineDataSource.currentSafeClaim],
    detail: "One allowed controlled-validation claim is present in the visual data pack.",
    tone: "green",
  },
  {
    id: "blocked-stronger-claim-families",
    label: "Blocked stronger families",
    status: "blocked",
    claims: ["runtime-active", "signal observed", "public-safe proof"],
    detail: "The data pack collapses 23 stronger claim families behind reviewer gates.",
    tone: "red",
  },
  {
    id: "missing-evidence-groups",
    label: "Missing evidence groups",
    status: "required",
    claims: ["runtime_evidence", "signal_observation_evidence", "public_safe_authorization"],
    detail: "The data pack records 17 missing evidence groups required before stronger claims can move.",
    tone: "amber",
  },
];

export const evidencePathTimeline: EvidenceTimelineEvent[] = [
  {
    id: "hoxline-product-front-door-route",
    order: 1,
    label: "Hoxline product/front-door route",
    status: "README.md",
    detail: "Hoxline became the current product/front-door repo.",
    tone: "cyan",
  },
  {
    id: "route-discovery-cleanup",
    order: 2,
    label: "Route discovery cleanup",
    status: "system map",
    detail: "Repository boundaries and route responsibilities were clarified.",
    tone: "blue",
  },
  {
    id: "controlled-demo-packaging",
    order: 3,
    label: "HO-DET-001 controlled demo packaging",
    status: "manifest",
    detail: "Controlled demo artifacts and reviewer entry points were packaged.",
    tone: "green",
  },
  {
    id: "gauntlet-v0-full-loop-runner",
    order: 4,
    label: "Gauntlet v0 full-loop runner",
    status: "PR #11",
    detail: "Runner emitted JSON and Markdown across the 11-stage loop.",
    tone: "green",
  },
  {
    id: "output-contract-v0",
    order: 5,
    label: "Output contract v0",
    status: "PR #12",
    detail: "Schema and verify CLI made the Gauntlet output enforceable.",
    tone: "green",
  },
  {
    id: "capability-visual-data-pack",
    order: 6,
    label: "Capability visual data pack",
    status: "PR #13",
    detail: "Website-ready chart datasets and visual module specs were created.",
    tone: "cyan",
  },
];

export const stillGatedStates = [
  "runtime_evidence",
  "signal_observation_evidence",
  "public_safe_authorization",
  "human_review_gate_complete",
  "analyst_review_record",
  "final_authorization_record",
  "case_closure_record",
  "legal_review_record",
  "business_evidence_record",
];

export const remainingGates = [
  {
    gate: "Runtime Candidate Ledger",
    status: "BLOCKED",
    needed: "preserved runtime evidence",
    tone: "red" as VisualTone,
  },
  {
    gate: "Signal Observation",
    status: "MISSING_EVIDENCE",
    needed: "preserved signal observation evidence",
    tone: "amber" as VisualTone,
  },
  {
    gate: "Human Review Gate",
    status: "HUMAN_REVIEW_REQUIRED",
    needed: "human review gate completion record",
    tone: "amber" as VisualTone,
  },
  {
    gate: "Public-safe release",
    status: "NOT_PUBLIC_SAFE",
    needed: "public_safe_authorization",
    tone: "amber" as VisualTone,
  },
  {
    gate: "Business and legal claims",
    status: "MISSING_EVIDENCE",
    needed: "business and legal review records",
    tone: "neutral" as VisualTone,
  },
];

export const visualModuleDefinitions: VisualModuleDefinition[] = [
  {
    id: "mission_control_hero",
    label: "Mission Control Hero",
    role: "Show Hoxline as a working ProofOps control plane for one artifact.",
    interaction: "Compact command-center header with capability counters.",
    dataSource: "executive_summary, positive_capabilities, validation_metrics",
    mobileBehavior: "Stack summary, proof ceiling, and safe claim as short rows.",
    proofBoundaryNote: "Website rendering is not proof.",
  },
  {
    id: "proofops_loop_orbit",
    label: "ProofOps Loop Orbit",
    role: "Render the 11-stage loop with status coloring.",
    interaction: "Orbit or rail diagram with pass, gated, review, and reference states.",
    dataSource: "website_chart_data.loop_stage_status_chart",
    mobileBehavior: "Vertical ordered timeline.",
    proofBoundaryNote: "Controlled validation proves controlled validation only.",
  },
  {
    id: "gauntlet_execution_console",
    label: "Gauntlet Execution Console",
    role: "Show generated outputs and verifier command.",
    interaction: "Terminal-style output list with JSON, Markdown, and schema rows.",
    dataSource: "generated_outputs, contract_metrics",
    mobileBehavior: "Single-column output cards.",
    proofBoundaryNote: "Generated output is reviewer packaging, not proof authority.",
  },
  {
    id: "capability_maturity_visual",
    label: "Capability Maturity Visual",
    role: "Separate built capabilities from gated capabilities.",
    interaction: "Horizontal bar chart with conservative maturity scores.",
    dataSource: "website_chart_data.capability_maturity_chart",
    mobileBehavior: "Ranked list with labels.",
    proofBoundaryNote: "Low scores for gated areas are intentional evidence boundaries.",
  },
  {
    id: "authority_constellation",
    label: "Authority Constellation",
    role: "Show seven-repo authority separation.",
    interaction: "Node map grouped by source, validation, authority, and presentation.",
    dataSource: "authority_surfaces, website_chart_data.authority_surface_chart",
    mobileBehavior: "Accordion by visual group.",
    proofBoundaryNote: "Hoxline is not proof authority.",
  },
  {
    id: "evidence_pipeline_timeline",
    label: "Evidence Pipeline Timeline",
    role: "Trace artifact data from demo packaging through Gauntlet output.",
    interaction: "Milestone timeline.",
    dataSource: "evidence_references, website_chart_data.build_timeline",
    mobileBehavior: "Compact stepper.",
    proofBoundaryNote: "Pipeline visibility does not create runtime or signal evidence.",
  },
  {
    id: "claim_decision_matrix",
    label: "Claim Decision Matrix",
    role: "Show one allowed claim and collapsed blocked families.",
    interaction: "Matrix with allowed, gated, and evidence-needed columns.",
    dataSource: "current_safe_claim, website_chart_data.claim_decision_chart, blocked_claims_collapsed",
    mobileBehavior: "Tabbed allowed and gated sections.",
    proofBoundaryNote: "Blocked families remain blocked until evidence exists.",
  },
  {
    id: "generated_outputs_wall",
    label: "Generated Outputs Wall",
    role: "Show the concrete artifacts available to reviewers and website loaders.",
    interaction: "Output cards with target reader labels.",
    dataSource: "website_chart_data.generated_outputs_chart",
    mobileBehavior: "Two-column then single-column responsive grid.",
    proofBoundaryNote: "Outputs are packaging, not final authorization.",
  },
  {
    id: "reviewer_path_timeline",
    label: "Reviewer Path Timeline",
    role: "Show how a reviewer moves from source references to safe claim.",
    interaction: "Linear reviewer path with authority-reference badges.",
    dataSource: "loop_stage_statuses, evidence_references",
    mobileBehavior: "Vertical checklist.",
    proofBoundaryNote: "Human review remains required.",
  },
  {
    id: "still_gated_panel",
    label: "Still Gated Panel",
    role: "Summarize remaining gates without making them the primary story.",
    interaction: "Collapsed evidence-needed panel.",
    dataSource: "remaining_gates, blocked_claims_collapsed",
    mobileBehavior: "Accordion closed by default.",
    proofBoundaryNote: "Gated does not mean failed; it means evidence is missing.",
  },
  {
    id: "complexity_stats_rail",
    label: "Complexity Stats Rail",
    role: "Show bounded counts that explain the amount of working structure.",
    interaction: "Small metric rail.",
    dataSource: "validation_metrics, contract_metrics, claim_authority_metrics",
    mobileBehavior: "Scrollable compact stat row.",
    proofBoundaryNote: "Counts are bounded to this data pack and cited sources.",
  },
];

export const complexityStats: VisualMetric[] = [
  { label: "Canonical loop stages", value: "11", detail: "measured in PR #13 pack", tone: "cyan" },
  { label: "Authority surfaces", value: "7", detail: "measured in PR #13 pack", tone: "blue" },
  { label: "Reviewer outputs", value: "2", detail: "JSON and Markdown", tone: "green" },
  { label: "Current pytest count", value: "53", detail: "pack validation run", tone: "green" },
];

export const boundedMetrics: VisualMetric[] = [
  { label: "Controlled positives", value: "7", detail: "measured", tone: "green" },
  { label: "Controlled negatives", value: "7", detail: "measured", tone: "green" },
  { label: "Matched positives", value: "7", detail: "measured", tone: "green" },
  { label: "Missed positives", value: "0", detail: "measured", tone: "green" },
  { label: "False-positive negatives", value: "0", detail: "measured", tone: "green" },
  { label: "Blocked families", value: "23", detail: "claim authority metrics", tone: "red" },
  { label: "Missing evidence groups", value: "17", detail: "claim decision chart", tone: "amber" },
  { label: "Output contract tests", value: "8", detail: "test_hoxline_gauntlet.py", tone: "blue" },
];

export const contractMetrics = {
  gauntletOutputSchema: "schemas/gauntlet-full-loop-run-v0.schema.json",
  visualDataPackSchema: "schemas/capability-visual-data-pack-v1.schema.json",
  verifyCommand:
    "$env:PYTHONPATH='src'; python -B -m hoxline gauntlet verify --input examples/gauntlet/ho-det-001-full-loop-run-v0.json",
  requiredGauntletFields: 13,
  contractTestCount: 8,
} as const;

export const claimAuthorityMetrics = {
  safeClaimCount: 1,
  blockedClaimFamilyCount: 23,
  saferWordingAvailable: true,
  missingEvidenceAvailable: true,
  publicSafe: false,
} as const;

export const statusTone = toneForStatus;
