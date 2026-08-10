import { externalLinks } from "./navigation";

export type TopologyNodeId =
  | "ai-labor"
  | "source"
  | "validation"
  | "hoxline"
  | "claim-gate"
  | "blocked"
  | "proof"
  | "human-review"
  | "public-output";

export type TopologyEdgeId =
  | "ai-to-source"
  | "source-to-validation"
  | "validation-to-hoxline"
  | "hoxline-to-claim"
  | "claim-to-blocked"
  | "claim-to-proof"
  | "proof-to-human"
  | "human-to-public";

export type NodeTone = "cyan" | "green" | "amber" | "red" | "silver";

export type TopologyNode = {
  id: TopologyNodeId;
  shortLabel: string;
  label: string;
  zone: "generation" | "engineering" | "control" | "evidence" | "authority" | "rendering";
  owner: string;
  input: string;
  action: string;
  output: string;
  authority: string;
  doesNotOwn: string;
  href?: string;
  reviewLabel?: string;
  tone: NodeTone;
  x: number;
  y: number;
};

export type TopologyEdge = {
  id: TopologyEdgeId;
  from: TopologyNodeId;
  to: TopologyNodeId;
  label: string;
  path: string;
  kind?: "blocked" | "publish";
};

export const repositoryAuthorities = [
  { label: ".github", authority: "Organization routing / governance shell", href: externalLinks.githubRepo },
  { label: "hoxline", authority: "Product / ProofOps control", href: externalLinks.hoxline },
  { label: "detections", authority: "Detection source truth", href: externalLinks.detections },
  { label: "validation", authority: "Controlled validation truth", href: externalLinks.validation },
  { label: "platform", authority: "Contracts / control mechanics", href: externalLinks.platform },
  { label: "proof", authority: "Evidence / claim authority", href: externalLinks.proof },
  { label: "website", authority: "Public rendering / presentation", href: externalLinks.website },
] as const;

export const topologyNodes: TopologyNode[] = [
  {
    id: "ai-labor",
    shortLabel: "AI labor",
    label: "AI-assisted labor",
    zone: "generation",
    owner: "Human-scoped AI tools",
    input: "A security hypothesis or implementation task",
    action: "Draft logic, queries, analysis, documentation, and reviewer notes.",
    output: "A named draft candidate",
    authority: "May accelerate implementation labor.",
    doesNotOwn: "Truth, evidence sufficiency, disposition, approval, or merge authority.",
    href: "/ai-security/",
    reviewLabel: "Open AI Automation",
    tone: "cyan",
    x: 124,
    y: 108,
  },
  {
    id: "source",
    shortLabel: "Source",
    label: "Detection / source",
    zone: "engineering",
    owner: "hawkinsoperations-detections",
    input: "A bounded draft candidate",
    action: "Represent the hypothesis as reviewable detection and query source.",
    output: "rule.yml + platform query",
    authority: "Can establish that inspectable source exists.",
    doesNotOwn: "Execution, validation, runtime, signal, or proof truth.",
    href: externalLinks.hoDet001Rule,
    reviewLabel: "Inspect detection source",
    tone: "cyan",
    x: 362,
    y: 108,
  },
  {
    id: "validation",
    shortLabel: "Validation",
    label: "Deterministic validation",
    zone: "engineering",
    owner: "hawkinsoperations-validation",
    input: "Detection source + controlled positive and negative fixtures",
    action: "Exercise expected matches and known non-matches with deterministic checks.",
    output: "Validation result + case packet",
    authority: "Can establish controlled validation scope.",
    doesNotOwn: "Runtime activity, signal observation, production status, or disposition.",
    href: externalLinks.validationReportHo,
    reviewLabel: "Open validation result",
    tone: "green",
    x: 616,
    y: 108,
  },
  {
    id: "hoxline",
    shortLabel: "Hoxline",
    label: "Hoxline",
    zone: "control",
    owner: "hoxline",
    input: "Artifact, validation result, and configured evidence ceiling",
    action: "Run the ProofOps control path and package reviewer-facing control output.",
    output: "Gauntlet result + claim-control context",
    authority: "Can enforce configured contracts and route reviewer work.",
    doesNotOwn: "Proof authority, runtime truth, signal truth, or public-safe approval.",
    href: "/hoxline/",
    reviewLabel: "Open Hoxline",
    tone: "cyan",
    x: 616,
    y: 284,
  },
  {
    id: "claim-gate",
    shortLabel: "Claim gate",
    label: "Claim Firewall / Claim Authority",
    zone: "control",
    owner: "Hoxline claim-control capability",
    input: "Proposed wording + configured evidence state",
    action: "Compare the proposed claim with the evidence ceiling and blocked claim families.",
    output: "Allowed, constrained, or blocked wording decision",
    authority: "Can deterministically block configured unsupported wording.",
    doesNotOwn: "Evidence sufficiency, proof promotion, merge, or final human approval.",
    href: "/claim-firewall/",
    reviewLabel: "Try Claim Firewall",
    tone: "amber",
    x: 868,
    y: 284,
  },
  {
    id: "blocked",
    shortLabel: "Blocked",
    label: "Blocked claim route",
    zone: "control",
    owner: "Configured claim-control policy",
    input: "Wording that exceeds the available evidence",
    action: "Reject the unsupported claim and identify safer wording and missing evidence.",
    output: "BLOCKED decision + required next evidence",
    authority: "Can prevent a checked claim from entering the bounded publish path.",
    doesNotOwn: "A stronger claim, runtime evidence, or permission to bypass review.",
    href: "/claim-firewall/",
    reviewLabel: "Inspect blocked claims",
    tone: "red",
    x: 1124,
    y: 150,
  },
  {
    id: "proof",
    shortLabel: "Proof",
    label: "Evidence / proof artifacts",
    zone: "evidence",
    owner: "hawkinsoperations-proof",
    input: "Source routes, bounded results, receipts, and claim decision",
    action: "Package named, inspectable records with an explicit evidence ceiling.",
    output: "Proof record + reviewer receipts + stated ceiling",
    authority: "Can authorize only the claim stated by the owned proof record.",
    doesNotOwn: "Broader runtime, signal, production, customer, or disposition claims.",
    href: externalLinks.proofRecord,
    reviewLabel: "Inspect proof record",
    tone: "amber",
    x: 868,
    y: 452,
  },
  {
    id: "human-review",
    shortLabel: "Human review",
    label: "Human authority gate",
    zone: "authority",
    owner: "Human reviewer",
    input: "Inspectable source, validation, claim decision, and proof artifacts",
    action: "Resolve concerns and control merge, promotion, publication, and disposition decisions.",
    output: "A separately recorded human decision",
    authority: "Owns approval decisions within the applicable governance process.",
    doesNotOwn: "Evidence that was never produced or authority outside the reviewed scope.",
    href: externalLinks.prReviewAuthority,
    reviewLabel: "Review authority contract",
    tone: "amber",
    x: 1124,
    y: 452,
  },
  {
    id: "public-output",
    shortLabel: "Public output",
    label: "Bounded public output",
    zone: "rendering",
    owner: "hawkinsoperations-website",
    input: "Approved bounded wording + source-owned reviewer routes",
    action: "Render the explanation and route reviewers to owning artifacts.",
    output: "Public presentation + inspection links",
    authority: "Can present and route within the approved wording ceiling.",
    doesNotOwn: "Source, validation, runtime, signal, proof, or merge authority.",
    href: "/proof/",
    reviewLabel: "Inspect proof routes",
    tone: "silver",
    x: 1336,
    y: 452,
  },
];

export const topologyEdges: TopologyEdge[] = [
  { id: "ai-to-source", from: "ai-labor", to: "source", label: "draft candidate", path: "M 190 108 H 296" },
  { id: "source-to-validation", from: "source", to: "validation", label: "reviewable source", path: "M 428 108 H 550" },
  { id: "validation-to-hoxline", from: "validation", to: "hoxline", label: "bounded result", path: "M 616 145 V 247" },
  { id: "hoxline-to-claim", from: "hoxline", to: "claim-gate", label: "proposed claim", path: "M 682 284 H 802" },
  { id: "claim-to-blocked", from: "claim-gate", to: "blocked", label: "unsupported", path: "M 914 252 C 966 182 1018 150 1058 150", kind: "blocked" },
  { id: "claim-to-proof", from: "claim-gate", to: "proof", label: "within ceiling", path: "M 868 321 V 415", kind: "publish" },
  { id: "proof-to-human", from: "proof", to: "human-review", label: "review package", path: "M 934 452 H 1058" },
  { id: "human-to-public", from: "human-review", to: "public-output", label: "bounded decision", path: "M 1190 452 H 1270", kind: "publish" },
];

export type ScenarioId = "controlled_validation" | "unsupported_runtime_claim" | "missing_signal_evidence";

export type FlowState =
  | "idle"
  | "ai_draft"
  | "source_controlled"
  | "validating"
  | "validated"
  | "control_context"
  | "claim_evaluation"
  | "blocked"
  | "evidence_packaged"
  | "human_review"
  | "bounded_output";

export type ScenarioStep = {
  state: FlowState;
  label: string;
  activeNode: TopologyNodeId;
  activeEdge?: TopologyEdgeId;
  visitedNodes: TopologyNodeId[];
  events: string[];
  explanation: string;
  artifact: string;
  ceiling: string;
  claimDecision: "PENDING" | "ALLOWED_UNDER_CEILING" | "BLOCKED" | "HUMAN_REVIEW_REQUIRED";
  missingEvidence?: string;
  saferWording?: string;
};

export type Scenario = {
  id: ScenarioId;
  label: string;
  shortDescription: string;
  incomingClaim: string;
  steps: ScenarioStep[];
};

const controlledCeiling = "CONTROLLED_TEST_VALIDATED";
const boundedWording =
  "HO-DET-001 has controlled validation evidence from controlled positive and negative process-creation fixtures and remains under review.";

export const scenarios: Record<ScenarioId, Scenario> = {
  controlled_validation: {
    id: "controlled_validation",
    label: "Controlled validation",
    shortDescription: "Follow HO-DET-001 from an AI-assisted draft to a human-review-required evidence package.",
    incomingClaim: "HO-DET-001 has controlled validation evidence.",
    steps: [
      { state: "idle", label: "Ready", activeNode: "ai-labor", visitedNodes: [], events: [], explanation: "The system is ready. Nothing is promoted until the scenario is run.", artifact: "No artifact yet", ceiling: "UNASSESSED", claimDecision: "PENDING" },
      { state: "ai_draft", label: "AI draft", activeNode: "ai-labor", visitedNodes: ["ai-labor"], events: ["AI_DRAFT_CREATED"], explanation: "AI-assisted labor turns the hypothesis into a bounded draft candidate.", artifact: "draft candidate", ceiling: "UNASSESSED", claimDecision: "PENDING" },
      { state: "source_controlled", label: "Source bound", activeNode: "source", activeEdge: "ai-to-source", visitedNodes: ["ai-labor", "source"], events: ["SOURCE_BOUND"], explanation: "The idea becomes inspectable detection logic and a platform query.", artifact: "rule.yml + splunk.spl", ceiling: "SOURCE_EXISTS", claimDecision: "PENDING" },
      { state: "validating", label: "Positive fixtures", activeNode: "validation", activeEdge: "source-to-validation", visitedNodes: ["ai-labor", "source", "validation"], events: ["POSITIVE_FIXTURES_PASS"], explanation: "Controlled positive cases exercise the behavior expected to match.", artifact: "positive fixture result", ceiling: "VALIDATION_IN_PROGRESS", claimDecision: "PENDING" },
      { state: "validating", label: "Negative fixtures", activeNode: "validation", visitedNodes: ["ai-labor", "source", "validation"], events: ["NEGATIVE_FIXTURES_PASS"], explanation: "Controlled negative cases test restraint and known non-matches.", artifact: "negative fixture result", ceiling: "VALIDATION_IN_PROGRESS", claimDecision: "PENDING" },
      { state: "validated", label: "Deterministic result", activeNode: "validation", visitedNodes: ["ai-labor", "source", "validation"], events: ["DETERMINISTIC_VALIDATION_PASS", "CEILING=CONTROLLED_TEST_VALIDATED"], explanation: "The deterministic validator packages the positive and negative fixture result. The result remains bounded to controlled scope; claim evaluation has not happened yet.", artifact: "validation-result.md", ceiling: controlledCeiling, claimDecision: "PENDING" },
      { state: "control_context", label: "Hoxline control", activeNode: "hoxline", activeEdge: "validation-to-hoxline", visitedNodes: ["ai-labor", "source", "validation", "hoxline"], events: ["HOXLINE_CONTROL_CONTEXT_LOADED"], explanation: "Hoxline loads the bounded artifact, validation result, and configured ceiling into the ProofOps control path. This establishes control context, not proof, runtime, signal, or approval authority.", artifact: "Gauntlet control context", ceiling: controlledCeiling, claimDecision: "PENDING" },
      { state: "claim_evaluation", label: "Claim evaluated", activeNode: "claim-gate", activeEdge: "hoxline-to-claim", visitedNodes: ["ai-labor", "source", "validation", "hoxline", "claim-gate"], events: ["CLAIM_EVALUATION_STARTED", "CLAIM_WITHIN_CEILING"], explanation: "Hoxline and the claim gate compare the proposed wording with the controlled validation ceiling.", artifact: "claim decision", ceiling: controlledCeiling, claimDecision: "ALLOWED_UNDER_CEILING", saferWording: boundedWording },
      { state: "evidence_packaged", label: "Evidence packaged", activeNode: "proof", activeEdge: "claim-to-proof", visitedNodes: ["ai-labor", "source", "validation", "hoxline", "claim-gate", "proof"], events: ["PROOF_RECORD_LINKED", "RUNTIME_AND_SIGNAL_UNPROMOTED"], explanation: "Source routes, validation output, and the proof record are packaged without merging their authority planes.", artifact: "proof/records/HO-DET-001.md", ceiling: controlledCeiling, claimDecision: "ALLOWED_UNDER_CEILING", saferWording: boundedWording },
      { state: "human_review", label: "Human review required", activeNode: "human-review", activeEdge: "proof-to-human", visitedNodes: ["ai-labor", "source", "validation", "hoxline", "claim-gate", "proof", "human-review"], events: ["HUMAN_REVIEW=REQUIRED", "NO_AUTOMATIC_PROMOTION"], explanation: "A human controls merge and any future claim promotion. The scenario does not self-authorize publication, runtime, signal, or disposition claims.", artifact: "review decision required", ceiling: controlledCeiling, claimDecision: "HUMAN_REVIEW_REQUIRED", saferWording: boundedWording },
    ],
  },
  unsupported_runtime_claim: {
    id: "unsupported_runtime_claim",
    label: "Unsupported runtime claim",
    shortDescription: "Send a runtime-status overclaim through the control path and watch it diverge to BLOCKED.",
    incomingClaim: "HO-DET-001 is runtime active.",
    steps: [
      { state: "idle", label: "Ready", activeNode: "ai-labor", visitedNodes: [], events: [], explanation: "The unsupported claim is staged but has not entered the control path.", artifact: "proposed wording", ceiling: controlledCeiling, claimDecision: "PENDING" },
      { state: "ai_draft", label: "Wording drafted", activeNode: "ai-labor", visitedNodes: ["ai-labor"], events: ["CLAIM_DRAFT_CREATED"], explanation: "AI-assisted labor can draft wording, including wording that is too strong.", artifact: "proposed public claim", ceiling: controlledCeiling, claimDecision: "PENDING" },
      { state: "source_controlled", label: "Source found", activeNode: "source", activeEdge: "ai-to-source", visitedNodes: ["ai-labor", "source"], events: ["SOURCE_EXISTS"], explanation: "Source exists, but source existence does not establish runtime activity.", artifact: "rule.yml", ceiling: controlledCeiling, claimDecision: "PENDING" },
      { state: "validated", label: "Validation found", activeNode: "validation", activeEdge: "source-to-validation", visitedNodes: ["ai-labor", "source", "validation"], events: ["CONTROLLED_VALIDATION_FOUND"], explanation: "Controlled validation exists, but validation truth does not become runtime truth.", artifact: "validation-result.md", ceiling: controlledCeiling, claimDecision: "PENDING" },
      { state: "control_context", label: "Hoxline control", activeNode: "hoxline", activeEdge: "validation-to-hoxline", visitedNodes: ["ai-labor", "source", "validation", "hoxline"], events: ["HOXLINE_CONTROL_CONTEXT_LOADED"], explanation: "Hoxline loads the available controlled-validation context and the proposed runtime wording. It routes the claim to evaluation without creating runtime evidence or proof authority.", artifact: "claim-control context", ceiling: controlledCeiling, claimDecision: "PENDING" },
      { state: "claim_evaluation", label: "Claim evaluated", activeNode: "claim-gate", activeEdge: "hoxline-to-claim", visitedNodes: ["ai-labor", "source", "validation", "hoxline", "claim-gate"], events: ["RUNTIME_CLAIM_DETECTED", "CEILING_COMPARED"], explanation: "Claim Authority compares runtime wording with the controlled validation ceiling.", artifact: "claim evaluation", ceiling: controlledCeiling, claimDecision: "PENDING" },
      { state: "blocked", label: "Runtime claim blocked", activeNode: "blocked", activeEdge: "claim-to-blocked", visitedNodes: ["ai-labor", "source", "validation", "hoxline", "claim-gate", "blocked"], events: ["DECISION=BLOCKED", "REQUIRED_EVIDENCE=RUNTIME_EVIDENCE"], explanation: "The blocked route visibly diverges. Public output never activates.", artifact: "blocked claim receipt", ceiling: controlledCeiling, claimDecision: "BLOCKED", missingEvidence: "runtime evidence", saferWording: "HO-DET-001 has controlled validation evidence and runtime claims remain gated." },
    ],
  },
  missing_signal_evidence: {
    id: "missing_signal_evidence",
    label: "Missing signal evidence",
    shortDescription: "Show why source plus controlled validation still does not establish an observed signal.",
    incomingClaim: "HO-DET-001 signal was observed.",
    steps: [
      { state: "idle", label: "Ready", activeNode: "source", visitedNodes: [], events: [], explanation: "The claim is staged for evidence inspection.", artifact: "proposed signal claim", ceiling: controlledCeiling, claimDecision: "PENDING" },
      { state: "source_controlled", label: "Source exists", activeNode: "source", visitedNodes: ["source"], events: ["SOURCE_EXISTS"], explanation: "The detection source is inspectable.", artifact: "rule.yml + splunk.spl", ceiling: "SOURCE_EXISTS", claimDecision: "PENDING" },
      { state: "validated", label: "Validation exists", activeNode: "validation", activeEdge: "source-to-validation", visitedNodes: ["source", "validation"], events: ["CONTROLLED_VALIDATION_FOUND", "SIGNAL_EVIDENCE_NOT_FOUND"], explanation: "Controlled fixtures passed, but no public signal observation evidence is present.", artifact: "validation-result.md", ceiling: controlledCeiling, claimDecision: "PENDING" },
      { state: "control_context", label: "Hoxline control", activeNode: "hoxline", activeEdge: "validation-to-hoxline", visitedNodes: ["source", "validation", "hoxline"], events: ["HOXLINE_CONTROL_CONTEXT_LOADED"], explanation: "Hoxline loads the source and controlled-validation context with the missing-signal boundary intact. It does not substitute validation for observed signal evidence.", artifact: "missing-signal control context", ceiling: controlledCeiling, claimDecision: "PENDING" },
      { state: "claim_evaluation", label: "Signal claim evaluated", activeNode: "claim-gate", activeEdge: "hoxline-to-claim", visitedNodes: ["source", "validation", "hoxline", "claim-gate"], events: ["SIGNAL_CLAIM_DETECTED", "TRUTH_SURFACES_COMPARED"], explanation: "The system refuses to substitute validation truth for signal truth.", artifact: "claim evaluation", ceiling: controlledCeiling, claimDecision: "PENDING" },
      { state: "blocked", label: "Signal claim blocked", activeNode: "blocked", activeEdge: "claim-to-blocked", visitedNodes: ["source", "validation", "hoxline", "claim-gate", "blocked"], events: ["DECISION=BLOCKED", "REQUIRED_EVIDENCE=SIGNAL_OBSERVATION_EVIDENCE"], explanation: "The route stops at the evidence boundary. Public output remains inactive.", artifact: "missing-evidence receipt", ceiling: controlledCeiling, claimDecision: "BLOCKED", missingEvidence: "signal observation evidence", saferWording: "HO-DET-001 has controlled validation evidence; signal observation remains unproven on the public route." },
    ],
  },
};

export type AuthorityActionId =
  | "draft-detection"
  | "draft-query"
  | "summarize"
  | "translate"
  | "approve-evidence"
  | "merge"
  | "promote-claim"
  | "close-case"
  | "disposition";

export type AuthorityAction = {
  id: AuthorityActionId;
  label: string;
  domain: "labor" | "authority";
  result: "AI_ASSIST_ALLOWED" | "HUMAN_AUTHORITY_REQUIRED";
  reason: string;
};

export const authorityActions: AuthorityAction[] = [
  { id: "draft-detection", label: "Draft detection", domain: "labor", result: "AI_ASSIST_ALLOWED", reason: "AI may draft bounded source for human review." },
  { id: "draft-query", label: "Draft query", domain: "labor", result: "AI_ASSIST_ALLOWED", reason: "Query assistance is implementation labor, not execution truth." },
  { id: "summarize", label: "Summarize evidence", domain: "labor", result: "AI_ASSIST_ALLOWED", reason: "AI may summarize preserved facts without authorizing their sufficiency." },
  { id: "translate", label: "Translate formats", domain: "labor", result: "AI_ASSIST_ALLOWED", reason: "Format translation is reviewable implementation labor." },
  { id: "approve-evidence", label: "Approve evidence", domain: "authority", result: "HUMAN_AUTHORITY_REQUIRED", reason: "Evidence sufficiency is a human governance decision." },
  { id: "merge", label: "Merge", domain: "authority", result: "HUMAN_AUTHORITY_REQUIRED", reason: "Green checks and AI review are not merge authority." },
  { id: "promote-claim", label: "Promote claim", domain: "authority", result: "HUMAN_AUTHORITY_REQUIRED", reason: "Stronger wording requires new evidence and separate human promotion." },
  { id: "close-case", label: "Close case", domain: "authority", result: "HUMAN_AUTHORITY_REQUIRED", reason: "AI does not own case closure." },
  { id: "disposition", label: "Set disposition", domain: "authority", result: "HUMAN_AUTHORITY_REQUIRED", reason: "AI does not decide detection or incident disposition." },
];

export type TruthSurfaceId = "source" | "validation" | "runtime" | "signal" | "proof" | "public";

export type ReviewerTruthSurface = {
  id: TruthSurfaceId;
  label: string;
  owner: string;
  establishedBy: string;
  supports: string;
  cannotSupport: string;
  nextEvidence: string;
  href: string;
};

export const reviewerTruthSurfaces: ReviewerTruthSurface[] = [
  { id: "source", label: "Source", owner: "hawkinsoperations-detections", establishedBy: "Reviewable detection and query files", supports: "A source artifact exists and can be inspected.", cannotSupport: "Execution, runtime, signal, deployment, or proof authority.", nextEvidence: "Controlled validation tied to the source.", href: externalLinks.hoDet001Rule },
  { id: "validation", label: "Validation", owner: "hawkinsoperations-validation", establishedBy: "Deterministic positive and negative fixture results", supports: "Expected behavior matched and known non-matches stayed quiet within stated scope.", cannotSupport: "Runtime, observed signal, production status, or disposition.", nextEvidence: "Separately captured evidence for the next claimed truth surface.", href: externalLinks.validationReportHo },
  { id: "runtime", label: "Runtime", owner: "Runtime evidence route, not Website", establishedBy: "Current scoped runtime evidence", supports: "Only the runtime action and environment actually evidenced.", cannotSupport: "Observed signal, fleet coverage, production status, or public-safe proof by itself.", nextEvidence: "Scoped runtime receipts reviewed under the applicable evidence boundary.", href: "/proof/runtime-proof-factory/" },
  { id: "signal", label: "Signal", owner: "Observed telemetry route, not Website", establishedBy: "Time- and source-bounded observed telemetry", supports: "A scoped signal was observed in the evidenced context.", cannotSupport: "Compromise, broad coverage, production readiness, or public proof by itself.", nextEvidence: "Reviewable signal evidence plus a proof-authority decision.", href: "/claim-firewall/" },
  { id: "proof", label: "Evidence / proof", owner: "hawkinsoperations-proof", establishedBy: "Named proof records with explicit ceilings and reviewer receipts", supports: "Only the bounded claim stated by the owned record.", cannotSupport: "A broader, newer, or differently scoped claim.", nextEvidence: "New evidence plus separate human promotion review.", href: externalLinks.proofRecord },
  { id: "public", label: "Public rendering", owner: "hawkinsoperations-website", establishedBy: "Approved bounded wording and source-owned routes", supports: "Reviewer orientation and navigation.", cannotSupport: "Source, validation, runtime, signal, proof, approval, or merge authority.", nextEvidence: "The owning repository record; rendering never substitutes for it.", href: "/proof/" },
];

export const forbiddenSubstitutions = [
  { from: "SOURCE", to: "RUNTIME", detail: "A file existing does not prove it ran." },
  { from: "VALIDATION", to: "SIGNAL", detail: "Controlled fixtures are not observed telemetry." },
  { from: "WEBSITE", to: "PROOF", detail: "Presentation cannot manufacture proof authority." },
  { from: "CI GREEN", to: "APPROVAL", detail: "Passing checks do not merge or promote claims." },
] as const;

export type ConsoleTabId = "view" | "clone" | "run" | "verify";

export type ReviewerConsoleItem = {
  label: string;
  value: string;
  href?: string;
  description: string;
  scope: string;
  expected: string;
  owner: string;
  doesNotProve: string;
};

export const reviewerConsole: Record<ConsoleTabId, ReviewerConsoleItem[]> = {
  view: [
    { label: "HO-DET-001 detection source", value: "Open rule.yml", href: externalLinks.hoDet001Rule, description: "Inspect the source-controlled detection representation.", scope: "Source truth", expected: "A reviewable source artifact", owner: "hawkinsoperations-detections", doesNotProve: "Execution, runtime, or signal observation" },
    { label: "Controlled validation result", value: "Open validation-result.md", href: externalLinks.validationReportHo, description: "Inspect the stated positive and negative fixture result.", scope: "Validation truth", expected: "A bounded controlled-validation report", owner: "hawkinsoperations-validation", doesNotProve: "Runtime, signal, or production behavior" },
    { label: "HO-DET-001 proof record", value: "Open proof record", href: externalLinks.proofRecord, description: "Inspect the proof-owned ceiling and blocked claims.", scope: "Evidence / proof truth", expected: controlledCeiling, owner: "hawkinsoperations-proof", doesNotProve: "A stronger or newer claim than the record states" },
  ],
  clone: [
    { label: "Clone validation", value: "git clone https://github.com/HawkinsOperations/hawkinsoperations-validation.git", description: "Clone the repository that owns deterministic validation source and reports.", scope: "Repository source", expected: "A local validation checkout", owner: "hawkinsoperations-validation", doesNotProve: "That any validator has been run locally" },
    { label: "Clone Hoxline", value: "git clone https://github.com/HawkinsOperations/hoxline.git", description: "Clone the product and ProofOps control surface.", scope: "Repository source", expected: "A local Hoxline checkout", owner: "hoxline", doesNotProve: "Proof authority, runtime activity, or signal observation" },
  ],
  run: [
    { label: "Run controlled fixtures", value: "python -B scripts/validate-ho-det-001.py --source-contract skip-if-missing", description: "Run the repository-supported HO-DET-001 controlled validator from the validation repository root.", scope: "Controlled validation", expected: "The validator reports the checked fixture result", owner: "hawkinsoperations-validation", doesNotProve: "Live runtime behavior or observed signal" },
    { label: "Run Website contract", value: "npm run check:site", description: "Run the Website public-surface and claim-boundary contract.", scope: "Static Website contract", expected: "Site contract checks passed", owner: "hawkinsoperations-website", doesNotProve: "Detection behavior, runtime, signal, proof promotion, or approval" },
  ],
  verify: [
    { label: "Verify HO-DET-001 Gauntlet artifact", value: "python -B -m hoxline gauntlet verify --input examples/gauntlet/ho-det-001-full-loop-run-v0.json", description: "Verify the published example artifact contract from the Hoxline repository root.", scope: "Artifact contract verification", expected: "The artifact contract verifies within its configured scope", owner: "hoxline", doesNotProve: "Live runtime behavior, observed signal, disposition, or approval" },
    { label: "Verify generated public status", value: "npm run public-status:verify", description: "Verify the checked-in generated Website status input without regenerating it.", scope: "Website rendering input", expected: "The checked-in snapshot matches its verifier contract", owner: "hawkinsoperations-website", doesNotProve: "That a stale snapshot is current or that Website data owns source truth" },
  ],
};

export const presentationScenes = [
  { id: "problem", label: "Interactive system model", title: "AI can build security work faster than we can prove it." },
  { id: "system", label: "System topology", title: "Run the governed path. Inspect every authority boundary." },
  { id: "ho-det-001", label: "HO-DET-001", title: "Scrub through one bounded detection workflow." },
  { id: "ai-authority", label: "Authority", title: "Test exactly where AI assistance stops." },
  { id: "truth-surfaces", label: "Truth surfaces", title: "Inspect the surfaces that must never be silently substituted." },
  { id: "reviewer-verification", label: "Reviewer console", title: "View, clone, run, and verify from owning routes." },
  { id: "controls-receipts", label: "Controls", title: "See which control families prevented trust drift." },
  { id: "closing", label: "Bounded output", title: "The complete system, held below human authority." },
] as const;

export type PresentationSceneId = (typeof presentationScenes)[number]["id"];

export const controlFamilies = [
  { id: "claim", label: "Claim control", detail: "Unsupported runtime, signal, production, and public-safe wording is blocked or constrained in checked routes.", route: "/claim-firewall/", routeLabel: "Open Claim Firewall", tone: "red" },
  { id: "merge", label: "Merge control", detail: "Green CI remains validation evidence. Visible human review and MERGE_APPROVED remain separate authority gates.", route: externalLinks.prReviewAuthority, routeLabel: "Review merge authority", tone: "amber" },
  { id: "evidence", label: "Evidence control", detail: "Named proof records preserve ceilings, missing evidence, and non-promoted truth surfaces.", route: "/proof/", routeLabel: "Inspect Proof", tone: "green" },
  { id: "ai", label: "AI authority", detail: "AI output stays support-only and cannot decide disposition, approval, promotion, merge, or closure.", route: "/ai-security/", routeLabel: "Open AI Automation", tone: "cyan" },
  { id: "source", label: "Source hygiene", detail: "Branch, scope, private-term, and validator controls prevent unrelated or unsupported material from entering public source.", route: "/governance-saves/", routeLabel: "Explore Governance Saves", tone: "silver" },
] as const;

export function topologyNode(id: TopologyNodeId) {
  const node = topologyNodes.find((candidate) => candidate.id === id);
  if (!node) throw new Error(`Unknown topology node: ${id}`);
  return node;
}
