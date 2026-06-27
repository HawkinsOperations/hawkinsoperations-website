import { metricDisplay, publicStatus } from "./generated/public-status.generated";

export type ShowcaseTone = "cyan" | "blue" | "green" | "amber" | "red" | "neutral";

export type SystemSurface = {
  id: string;
  label: string;
  role: string;
  repo: string;
  href: string;
  owns: string;
  doesNotOwn: string;
  tone: ShowcaseTone;
};

export type SystemRouteStep = {
  id: string;
  label: string;
  short: string;
  source: string;
  status: string;
  tone: ShowcaseTone;
};

export type ProofOfWorkMetric = {
  label: string;
  value: string;
  detail: string;
  source: string;
  tone: ShowcaseTone;
};

export type GovernanceCategoryDatum = {
  label: string;
  count: number;
  lens: "claim" | "detection" | "validation" | "runtime" | "review";
  detail: string;
};

export type ClaimFirewallExample = {
  id: string;
  label: string;
  incomingClaim: string;
  context: string;
  decision: "BLOCKED" | "DOWNGRADED" | "HARDENED" | "ALLOWED_UNDER_CEILING";
  saferWording: string;
  missingEvidence: string[];
  stageNotes: string[];
  tone: ShowcaseTone;
};

export const orgSystemSources = [
  "C:\\Raylee\\Repo\\HawkinsOperations\\hoxline\\examples\\showcase\\ho-det-001-capability-visual-data-pack-v1.json",
  "C:\\Raylee\\Repo\\HawkinsOperations\\hawkinsoperations-detections\\detections\\DETECTION_FACTORY_INDEX.md",
  "C:\\Raylee\\Repo\\HawkinsOperations\\hawkinsoperations-validation\\activity\\detection-activity-ledger-v1.json",
  "C:\\Raylee\\Repo\\HawkinsOperations\\hawkinsoperations-proof\\README.md",
  "C:\\Raylee\\Repo\\HawkinsOperations\\hawkinsoperations-platform\\README.md",
  "C:\\Raylee\\Repo\\HawkinsOperations\\.github\\architecture\\REPO_AUTHORITY_MAP.md",
] as const;

export const proofOfWorkMetrics: ProofOfWorkMetric[] = [
  metricDisplay("controls_fired"),
  metricDisplay("blocked_claims"),
  metricDisplay("validation_cases"),
  metricDisplay("proof_records"),
  metricDisplay("public_safe_count"),
];

export const systemSurfaces: SystemSurface[] = [
  {
    id: "github",
    label: ".github",
    role: "Org routing",
    repo: "HawkinsOperations/.github",
    href: "https://github.com/HawkinsOperations/.github",
    owns: "reviewer routing, authority maps, governance summaries",
    doesNotOwn: "proof, runtime truth, public-safe approval, or merge authority",
    tone: "neutral",
  },
  {
    id: "detections",
    label: "Detections",
    role: "Source truth",
    repo: "hawkinsoperations-detections",
    href: "https://github.com/HawkinsOperations/hawkinsoperations-detections",
    owns: "detection source packages, ATT&CK framing, event-field contracts",
    doesNotOwn: "runtime activity, signal observation, or proof promotion",
    tone: "cyan",
  },
  {
    id: "validation",
    label: "Validation",
    role: "Behavior truth",
    repo: "hawkinsoperations-validation",
    href: "https://github.com/HawkinsOperations/hawkinsoperations-validation",
    owns: "controlled fixtures, deterministic checks, validation reports",
    doesNotOwn: "runtime deployment, public-safe proof, or final disposition",
    tone: "green",
  },
  {
    id: "platform",
    label: "Platform",
    role: "Contracts and mechanics",
    repo: "hawkinsoperations-platform",
    href: "https://github.com/HawkinsOperations/hawkinsoperations-platform",
    owns: "schemas, ledgers, case packets, runner trust, promotion mechanics",
    doesNotOwn: "proof records or public proof promotion",
    tone: "blue",
  },
  {
    id: "proof",
    label: "Proof",
    role: "Proof records",
    repo: "hawkinsoperations-proof",
    href: "https://github.com/HawkinsOperations/hawkinsoperations-proof",
    owns: "proof records, proof cards, claim ceilings, reviewer receipts",
    doesNotOwn: "raw private evidence publication or website rendering authority",
    tone: "amber",
  },
  {
    id: "hoxline",
    label: "Hoxline",
    role: "ProofOps control plane",
    repo: "HawkinsOperations/hoxline",
    href: "https://github.com/HawkinsOperations/hoxline",
    owns: "Gauntlet, Claim Authority packaging, Claim Firewall decisions",
    doesNotOwn: "proof authority, runtime truth, signal truth, or public-safe approval",
    tone: "cyan",
  },
  {
    id: "website",
    label: "Website",
    role: "Public rendering",
    repo: "hawkinsoperations-website",
    href: "https://github.com/HawkinsOperations/hawkinsoperations-website",
    owns: "public reviewer navigation and rendered product surfaces",
    doesNotOwn: "source truth, validation truth, evidence truth, or claim approval",
    tone: "neutral",
  },
];

export const systemRouteSteps: SystemRouteStep[] = [
  {
    id: "source",
    label: "Detections",
    short: "source truth",
    source: "DETECTION_FACTORY_INDEX.md",
    status: "ATT&CK-oriented source packages",
    tone: "cyan",
  },
  {
    id: "attack",
    label: "ATT&CK / Kill Chain",
    short: "context",
    source: "detection source metadata",
    status: "reviewer orientation only",
    tone: "blue",
  },
  {
    id: "validation",
    label: "Validation",
    short: "behavior truth",
    source: "detection-activity-ledger-v1.json",
    status: `${publicStatus.metrics.validation_fires.value} fires / ${publicStatus.metrics.validation_cases.value} cases`,
    tone: "green",
  },
  {
    id: "proof",
    label: "Proof",
    short: "claim ceiling",
    source: "proof records and cards",
    status: `${publicStatus.metrics.proof_records.value} records / ${publicStatus.metrics.blocked_claims.value} blocked claims`,
    tone: "amber",
  },
  {
    id: "hoxline",
    label: "Hoxline",
    short: "control plane",
    source: "capability visual data pack v1",
    status: "Gauntlet v0 loop",
    tone: "cyan",
  },
  {
    id: "firewall",
    label: "Claim Firewall",
    short: "claim clamp",
    source: "Hoxline Claim Authority policy",
    status: "block / downgrade / harden",
    tone: "red",
  },
  {
    id: "render",
    label: "Website Render",
    short: "public surface",
    source: "hawkinsoperations-website",
    status: "rendering only",
    tone: "neutral",
  },
];

export const governanceCategoryData: GovernanceCategoryDatum[] = [
  { label: "Claim boundary", count: 16, lens: "claim", detail: "public wording narrowed to evidence" },
  { label: "Runtime boundary", count: 7, lens: "runtime", detail: "runtime/signal wording held back" },
  { label: "Validator hardening", count: 8, lens: "validation", detail: "deterministic checks tightened" },
  { label: "AI authority", count: 2, lens: "claim", detail: "AI kept support-only" },
  { label: "Merge authority", count: 13, lens: "review", detail: "green CI kept below review authority" },
  { label: "Evidence protection", count: 3, lens: "claim", detail: "private evidence stayed private" },
  { label: "Release gate", count: 2, lens: "review", detail: "release wording gated" },
  { label: "Branch hygiene", count: 16, lens: "review", detail: "wrong-branch and dirty-tree risk stopped" },
  { label: "Workflow hardening", count: 5, lens: "validation", detail: "workflow enforcement clarified" },
];

export const claimFirewallExamples: ClaimFirewallExample[] = [
  {
    id: "runtime-active",
    label: "runtime-status overclaim",
    incomingClaim: "Blocked example: HO-DET-001 is runtime active.",
    context: "HO-DET-001 controlled validation route",
    decision: "BLOCKED",
    saferWording: "HO-DET-001 has controlled validation evidence and runtime claims remain gated.",
    missingEvidence: ["runtime evidence", "proof promotion", "public-safe authorization"],
    stageNotes: ["Extractor sees runtime wording.", "Evidence ceiling is CONTROLLED_TEST_VALIDATED.", "Verifier blocks promotion."],
    tone: "red",
  },
  {
    id: "signal-observed",
    label: "signal-status overclaim",
    incomingClaim: "Blocked example: HO-DET-001 signal was observed.",
    context: "Hoxline Gauntlet stage 7",
    decision: "BLOCKED",
    saferWording: "Signal Observation remains MISSING_EVIDENCE for the public Hoxline run.",
    missingEvidence: ["signal observation evidence", "reviewer record", "proof update"],
    stageNotes: ["Signal claim enters pipeline.", "Gauntlet reports MISSING_EVIDENCE.", "Public wording stays blocked."],
    tone: "red",
  },
  {
    id: "production-ready",
    label: "production-readiness overclaim",
    incomingClaim: "Blocked example: the detection package is production ready.",
    context: "detection factory source package",
    decision: "DOWNGRADED",
    saferWording: "The source package and controlled validation state are inspectable; production claims require separate evidence.",
    missingEvidence: ["deployment evidence", "operational tuning record", "proof promotion"],
    stageNotes: ["Production wording exceeds source truth.", "Validation is not deployment.", "Wording downgrades to inspectable source/validation."],
    tone: "amber",
  },
  {
    id: "ai-approved",
    label: "AI-approval overclaim",
    incomingClaim: "Blocked example: AI approved the case.",
    context: "AI-assisted security workflow",
    decision: "HARDENED",
    saferWording: "AI can support summarization; deterministic checks and human review own authority.",
    missingEvidence: ["human review record", "deterministic verifier output"],
    stageNotes: ["AI-authority wording is extracted.", "Verifier checks support-only model.", "Final copy names human review boundary."],
    tone: "amber",
  },
  {
    id: "under-ceiling",
    label: "controlled validation",
    incomingClaim: "HO-DET-001 has controlled validation evidence.",
    context: "Proof ceiling route",
    decision: "ALLOWED_UNDER_CEILING",
    saferWording: "HO-DET-001 has controlled validation evidence from controlled positive and negative process-creation fixtures and remains under review.",
    missingEvidence: ["none for controlled-validation wording"],
    stageNotes: ["Claim stays under ceiling.", "Verifier sees matching proof route.", "Public wording remains bounded."],
    tone: "green",
  },
];

