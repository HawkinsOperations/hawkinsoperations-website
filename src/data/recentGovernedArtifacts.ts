/**
 * Hand-maintained static snapshot of recent governed work artifacts.
 *
 * THIS FILE IS A SNAPSHOT, NOT A LIVE FEED.
 *
 * Editing rules (every artifact must stay inside the claim firewall —
 * these wordings are blocked from row titles and a row must not claim
 * any of them):
 *
 *  - The following claims are blocked from row titles and supports
 *    fields and do not claim truth about the underlying work:
 *    runtime-active, signal-observed, public-safe runtime proof,
 *    production-ready, fleet-wide, autonomous SOC, AI-approved
 *    disposition, analyst-approved disposition, GPU CI proven, model
 *    execution in CI, live Splunk fired, Cribl-routed, Wazuh-routed,
 *    AWS-live, enterprise deployment, customer deployment,
 *    CISO-approved, company-used.
 *  - Local GPU Triage rows must use GOVERNED_LABOR or RECEIPT_EMITTED
 *    only. The phrases "passed", "proven", "runtime-active",
 *    "GPU CI proven", "model execution in CI", and "public-safe
 *    runtime proof" are blocked from GPU triage rows.
 *  - Update `recentGovernedArtifactsSnapshotDate` when artifacts change.
 *  - This file is hand-maintained — no fetch, no useEffect, no GitHub
 *    API call, no build-time auto-update mechanism is permitted here.
 */

export type RecentArtifactClass =
  | "DOCS_ARTIFACT"
  | "MERGED_PR"
  | "GOVERNED_LABOR"
  | "VERIFIER_HARDENED"
  | "RECEIPT_EMITTED"
  | "PUBLIC_RENDERING_UPDATE";

export type RecentArtifactSurface = "proof" | "platform" | "validation" | "detections" | "website";

export type RecentGovernedArtifact = {
  slug: string;
  title: string;
  repo: string;
  pr: number;
  date: string;
  class: RecentArtifactClass;
  surface: RecentArtifactSurface;
  summary: string;          // one-line card summary
  whatChanged: string;      // detail · what changed
  supports: string;         // detail · what this supports
  doesNotProve: string;     // detail · what this does NOT prove
  reviewRoute: string;      // detail · next inspection action
  prHref: string;
  relatedHref?: string;
  relatedLabel?: string;
};

export const recentGovernedArtifactsSnapshotDate = "2026-05-18" as const;

export const recentGovernedArtifacts: RecentGovernedArtifact[] = [
  {
    slug: "ai-governance-control-layer-case-study",
    title: "AI Governance Control Layer case study merged",
    repo: "hawkinsoperations-proof",
    pr: 37,
    date: "2026-05-17",
    class: "DOCS_ARTIFACT",
    surface: "proof",
    summary:
      "Context-only case study describing the governed AI-assisted proof routing model. Not pipeline proof.",
    whatChanged:
      "A reviewer-visible case study was merged into the proof repo describing how AI work is bounded by deterministic gates, evidence records, and human review. The document is a context artifact — it explains the model and routes reviewers to the proof surfaces; it does not itself promote any new claim.",
    supports:
      "A bounded, reviewer-visible explanation of the governed AI-assisted control layer exists in the proof repo and is reachable from this website rendering.",
    doesNotProve:
      "Runtime-active behaviour, signal-observed status, public-safe runtime proof, autonomous SOC, AI-approved disposition, analyst-approved disposition, fleet-wide coverage, or external/customer adoption. The case study is context only; it is not pipeline proof.",
    reviewRoute:
      "Open the case study on the proof repo, then trace back to the HO-DET-001 record to inspect the controlled-test boundary the case study refers to.",
    prHref: "https://github.com/HawkinsOperations/hawkinsoperations-proof/pull/37",
    relatedHref:
      "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/main/docs/case-studies/AI-GOVERNANCE-CONTROL-LAYER.md",
    relatedLabel: "Open case study ↗",
  },
  {
    slug: "local-gpu-triage-receipt-path",
    title: "Local GPU Triage Gate · receipt-emit hardened",
    repo: "hawkinsoperations-platform",
    pr: 19,
    date: "2026-05-17",
    class: "RECEIPT_EMITTED",
    surface: "platform",
    summary:
      "Receipt-emit path for the Local GPU Triage Gate workflow hardened. Receipt path only.",
    whatChanged:
      "The receipt-emission step of the Local GPU Triage Gate workflow was hardened so that the gate emits a clean, bounded receipt artifact for governed inspection. The receipt format and emission boundary were tightened; no runtime claim was added.",
    supports:
      "A bounded receipt-emission path exists for the Local GPU Triage Gate workflow under governed labor scope.",
    doesNotProve:
      "Model execution in CI, GPU CI proven status, runtime-active deployment, public-safe runtime proof, signal-observed activity, autonomous SOC, AI-approved disposition, or analyst-approved disposition. The gate emits a receipt only; it does not promote runtime proof.",
    reviewRoute:
      "Open the platform PR to inspect the receipt path hardening; cross-reference the governed work snapshot on the homepage.",
    prHref: "https://github.com/HawkinsOperations/hawkinsoperations-platform/pull/19",
  },
  {
    slug: "local-gpu-triage-phase-b-gate",
    title: "Local GPU Triage Phase B workflow gate added",
    repo: "hawkinsoperations-platform",
    pr: 17,
    date: "2026-05-17",
    class: "GOVERNED_LABOR",
    surface: "platform",
    summary:
      "Phase B workflow gate scaffolding for the Local GPU Triage Gate. Governed labor only.",
    whatChanged:
      "A Phase B workflow gate was added to the Local GPU Triage Gate scaffold. The gate defines a controlled boundary for the next phase of governed labor; it does not promote any runtime or signal claim.",
    supports:
      "A second-phase governed workflow gate exists in the platform repo as scaffolded labor.",
    doesNotProve:
      "Model execution in CI, GPU CI proven status, runtime-active behaviour, public-safe runtime proof, signal-observed activity, autonomous SOC, AI-approved disposition, or analyst-approved disposition. Phase B is governed labor; it is not runtime proof.",
    reviewRoute:
      "Open the platform PR; check the Phase A scaffold artifact for the prior phase.",
    prHref: "https://github.com/HawkinsOperations/hawkinsoperations-platform/pull/17",
  },
  {
    slug: "local-gpu-triage-phase-a-scaffold",
    title: "Local GPU Triage Pipeline v0 Phase A scaffold",
    repo: "hawkinsoperations-platform",
    pr: 15,
    date: "2026-05-17",
    class: "GOVERNED_LABOR",
    surface: "platform",
    summary:
      "Phase A scaffold of the Local GPU Triage Pipeline v0. Scaffold only.",
    whatChanged:
      "Phase A of the Local GPU Triage Pipeline v0 was scaffolded in the platform repo. The scaffold defines the bounded structure for governed work; it does not invoke or claim runtime activity.",
    supports:
      "A Phase A pipeline scaffold exists in the platform repo as governed labor.",
    doesNotProve:
      "Model execution in CI, GPU CI proven status, runtime-active behaviour, production-ready deployment, public-safe runtime proof, signal-observed activity, autonomous SOC, AI-approved disposition, or analyst-approved disposition. The scaffold is structure; it is not runtime proof.",
    reviewRoute:
      "Open the platform PR; cross-reference the Phase B gate artifact for the next phase.",
    prHref: "https://github.com/HawkinsOperations/hawkinsoperations-platform/pull/15",
  },
  {
    slug: "detection-factory-controller-status-packets",
    title: "Detection Factory Controller v0 status packets",
    repo: "hawkinsoperations-platform",
    pr: 14,
    date: "2026-05-17",
    class: "GOVERNED_LABOR",
    surface: "platform",
    summary:
      "Detection Factory Controller v0 emits bounded status packets. Governed work only.",
    whatChanged:
      "A v0 Detection Factory Controller was added to the platform repo with bounded status-packet emission for governed inspection. The controller defines status-packet shape; it does not own promotion or claim autonomy.",
    supports:
      "A v0 Detection Factory Controller emits bounded status packets for governed labor inspection.",
    doesNotProve:
      "Autonomous SOC, AI-approved disposition, analyst-approved disposition, runtime-active behaviour, signal-observed activity, public-safe runtime proof, production-ready deployment, or fleet-wide coverage. The controller emits status packets; it does not promote a claim.",
    reviewRoute:
      "Open the platform PR; review the status-packet shape in the controller scaffold.",
    prHref: "https://github.com/HawkinsOperations/hawkinsoperations-platform/pull/14",
  },
  {
    slug: "proof-pack-001-wording-hardening",
    title: "Proof Pack 001 reviewer-package wording hardened",
    repo: "hawkinsoperations-proof",
    pr: 36,
    date: "2026-05-17",
    class: "MERGED_PR",
    surface: "proof",
    summary:
      "Reviewer-package wording for Proof Pack 001 tightened. Wording only.",
    whatChanged:
      "Wording in the Proof Pack 001 reviewer package was hardened so that stronger runtime, signal, and public-proof claims cannot be implied through the package framing. This row records the earlier wording hardening, not the later official release.",
    supports:
      "The Proof Pack 001 reviewer-package wording is bounded and does not imply runtime-active, signal-observed, or public-safe runtime proof status.",
    doesNotProve:
      "Stronger runtime, signal, or public-proof status. Wording was hardened; release routing is tracked in the Proof Pack 001 receipt console.",
    reviewRoute:
      "Open the proof repo PR to inspect the wording diff and the bounded reviewer-package framing.",
    prHref: "https://github.com/HawkinsOperations/hawkinsoperations-proof/pull/36",
  },
  {
    slug: "ho-det-001-ai-triage-private-key-edge-cases",
    title: "HO-DET-001 AI triage private-key edge cases closed",
    repo: "hawkinsoperations-validation",
    pr: 34,
    date: "2026-05-16",
    class: "VERIFIER_HARDENED",
    surface: "validation",
    summary:
      "HO-DET-001 AI triage verifier hardened around private-key rejection edge cases.",
    whatChanged:
      "Validation harness for HO-DET-001 AI triage was hardened so that previously open private-key edge cases now reject deterministically inside the controlled-test boundary.",
    supports:
      "HO-DET-001 AI triage contract verifier rejects the previously open private-key edge cases under the controlled-test boundary.",
    doesNotProve:
      "Runtime-active behaviour, signal-observed activity, public-safe runtime proof, GPU CI proven status, model execution in CI, AI-approved disposition, or analyst-approved disposition. The verifier closes controlled-test edge cases only.",
    reviewRoute:
      "Open the validation PR; cross-reference the HO-DET-001 AI triage contract verifier artifact.",
    prHref: "https://github.com/HawkinsOperations/hawkinsoperations-validation/pull/34",
  },
  {
    slug: "ho-det-001-ai-triage-contract-verifier",
    title: "HO-DET-001 AI triage contract verifier added",
    repo: "hawkinsoperations-validation",
    pr: 33,
    date: "2026-05-16",
    class: "VERIFIER_HARDENED",
    surface: "validation",
    summary:
      "Contract verifier added for the HO-DET-001 AI triage path inside the controlled-test boundary.",
    whatChanged:
      "A deterministic contract verifier was added for the HO-DET-001 AI triage path. The verifier asserts the bounded contract HO-DET-001 must satisfy under controlled-test conditions; it does not invoke or claim runtime behaviour.",
    supports:
      "A reviewable contract verifier for HO-DET-001 AI triage exists inside the controlled-test boundary.",
    doesNotProve:
      "Runtime-active behaviour, signal-observed activity, public-safe runtime proof, AI-approved disposition, analyst-approved disposition, autonomous SOC, or production-ready deployment. The verifier asserts a controlled-test contract only.",
    reviewRoute:
      "Open the validation PR; cross-reference the private-key edge-case hardening artifact.",
    prHref: "https://github.com/HawkinsOperations/hawkinsoperations-validation/pull/33",
  },
  {
    slug: "homepage-ai-governance-control-layer-packaging",
    title: "Homepage AI governance control-layer visual packaging",
    repo: "hawkinsoperations-website",
    pr: 30,
    date: "2026-05-17",
    class: "PUBLIC_RENDERING_UPDATE",
    surface: "website",
    summary:
      "Public rendering update for the homepage AI governance control-layer packaging. Rendering only.",
    whatChanged:
      "The homepage was repackaged around a dark reviewer-cockpit visual identity with an enterprise-failure-mode strip, promotion ladder, truth-vs-telemetry matrix, recent governed work snapshot, and interactive cockpit polish. The change is a public rendering update only; it does not promote any new proof claim.",
    supports:
      "A reviewer-visible public rendering surface that explains the governed AI-assisted control layer and routes reviewers to the proof, validation, and platform repos.",
    doesNotProve:
      "Runtime-active behaviour, signal-observed activity, public-safe runtime proof, autonomous SOC, AI-approved disposition, analyst-approved disposition, GPU CI proven status, model execution in CI, fleet-wide coverage, or external/customer adoption. Website rendering is not proof.",
    reviewRoute:
      "Open the website PR; review the homepage preview and trace any claim back to the proof or validation repos.",
    prHref: "https://github.com/HawkinsOperations/hawkinsoperations-website/pull/30",
  },
];

export function getArtifactBySlug(slug: string): RecentGovernedArtifact | undefined {
  return recentGovernedArtifacts.find((a) => a.slug === slug);
}

export function artifactsBySurface(surface: RecentArtifactSurface): RecentGovernedArtifact[] {
  return recentGovernedArtifacts.filter((a) => a.surface === surface);
}
