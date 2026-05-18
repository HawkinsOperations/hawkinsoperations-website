/**
 * Hand-maintained static snapshot of recent governed work in the
 * HawkinsOperations organization. This snapshot is not a live feed.
 *
 * Editing rules (all rows must stay inside the claim firewall — these
 * wordings are blocked from public rendering surfaces and a row title
 * must not claim any of them):
 *
 *  - `class` must be one of the five literals in ActivityClass below.
 *  - The following claims are blocked from row titles and do not claim
 *    truth about the underlying work: runtime-active, signal-observed,
 *    public-safe runtime proof, production-ready, fleet-wide,
 *    autonomous SOC, AI-approved disposition, analyst-approved
 *    disposition, GPU CI proven, model execution in CI, live Splunk
 *    fired. Use bounded wording instead.
 *  - Local GPU Triage rows must use GOVERNED_LABOR or RECEIPT_EMITTED
 *    only. The phrases "passed", "proven", "runtime-active", and
 *    "GPU CI proven" are blocked from GPU triage rows and do not prove
 *    any of those states.
 *  - Update `activityLedgerSnapshotDate` when rows change.
 *  - This file is hand-maintained — no fetch, no useEffect, no GitHub
 *    API call, no build-time auto-update mechanism is permitted here.
 */

export type ActivityClass =
  | "DOCS_ARTIFACT"
  | "MERGED_PR"
  | "GOVERNED_LABOR"
  | "VERIFIER_HARDENED"
  | "RECEIPT_EMITTED";

export type ActivityRow = {
  date: string;          // ISO date (YYYY-MM-DD)
  repo: string;          // short repo name
  pr: number;
  class: ActivityClass;
  title: string;
  href: string;
};

export const activityLedgerSnapshotDate = "2026-05-17" as const;

export const activityLedger: ActivityRow[] = [
  {
    date: "2026-05-17",
    repo: "hawkinsoperations-proof",
    pr: 37,
    class: "DOCS_ARTIFACT",
    title: "AI Governance Control Layer case study merged",
    href: "https://github.com/HawkinsOperations/hawkinsoperations-proof/pull/37",
  },
  {
    date: "2026-05-17",
    repo: "hawkinsoperations-platform",
    pr: 19,
    class: "RECEIPT_EMITTED",
    title: "Local GPU Triage Gate · receipt-emit hardened",
    href: "https://github.com/HawkinsOperations/hawkinsoperations-platform/pull/19",
  },
  {
    date: "2026-05-17",
    repo: "hawkinsoperations-platform",
    pr: 17,
    class: "GOVERNED_LABOR",
    title: "Local GPU Triage Phase B workflow gate added",
    href: "https://github.com/HawkinsOperations/hawkinsoperations-platform/pull/17",
  },
  {
    date: "2026-05-17",
    repo: "hawkinsoperations-platform",
    pr: 15,
    class: "GOVERNED_LABOR",
    title: "Local GPU Triage Pipeline v0 Phase A scaffold",
    href: "https://github.com/HawkinsOperations/hawkinsoperations-platform/pull/15",
  },
  {
    date: "2026-05-17",
    repo: "hawkinsoperations-platform",
    pr: 14,
    class: "GOVERNED_LABOR",
    title: "Detection Factory Controller v0 status packets",
    href: "https://github.com/HawkinsOperations/hawkinsoperations-platform/pull/14",
  },
  {
    date: "2026-05-17",
    repo: "hawkinsoperations-proof",
    pr: 36,
    class: "MERGED_PR",
    title: "Proof Pack 001 reviewer-package wording hardened",
    href: "https://github.com/HawkinsOperations/hawkinsoperations-proof/pull/36",
  },
  {
    date: "2026-05-16",
    repo: "hawkinsoperations-validation",
    pr: 34,
    class: "VERIFIER_HARDENED",
    title: "HO-DET-001 AI triage private-key edge cases closed",
    href: "https://github.com/HawkinsOperations/hawkinsoperations-validation/pull/34",
  },
  {
    date: "2026-05-16",
    repo: "hawkinsoperations-validation",
    pr: 33,
    class: "VERIFIER_HARDENED",
    title: "HO-DET-001 AI triage contract verifier added",
    href: "https://github.com/HawkinsOperations/hawkinsoperations-validation/pull/33",
  },
];
