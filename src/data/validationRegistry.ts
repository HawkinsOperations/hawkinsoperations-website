/**
 * Validation Registry — extracted controlled-test validation payload.
 *
 * Each row records a contract-enforced, human-review-gated validation
 * package: fixture counts, the claim ceiling it holds, and the runtime /
 * signal / public-safe states that stay blocked. Website rendering is not
 * proof; this file is a reviewer map of validation output only.
 *
 * Scanner note: blocked tokens below are paired on-line with "blocked",
 * "not claimed", or "excluded" so the public claim ceiling stays honest.
 */

import { externalLinks } from "./navigation";

export type ValidationFamily = "Endpoint" | "Cloud" | "Identity" | "NDR/Telemetry";

export type RegistryBadge = {
  label: string;
  tone: "ceiling" | "block" | "drift" | "warn";
};

export type ValidationRow = {
  id: string;
  name: string;
  family: ValidationFamily;
  status: "pass" | "contract-sample";
  /** claim ceiling token shown as the package badge */
  claimCeiling: string;
  fixtures: { total: number; positive: number; negative: number; missed: number; falsePositiveNegatives: number } | null;
  badges: RegistryBadge[];
  /** true when no proof record exists yet for the row */
  noProofRecord: boolean;
  /** true when the row is a boundary contract sample, not a validated package */
  contractOnly: boolean;
  /** true when public runtime promotion is blocked for the row */
  publicRuntimeBlocked: boolean;
  copyBoundary?: string;
  exists: string[];
  proves: string[];
  doesNotProve: string[];
  sourceLink: string;
};

export const validationRows: ValidationRow[] = [
  {
    id: "HO-DET-001",
    name: "Suspicious PowerShell EncodedCommand",
    family: "Endpoint",
    status: "pass",
    claimCeiling: "CONTROLLED_TEST_VALIDATED",
    fixtures: { total: 14, positive: 7, negative: 7, missed: 0, falsePositiveNegatives: 0 },
    badges: [{ label: "CONTROLLED_TEST_VALIDATED", tone: "ceiling" }],
    noProofRecord: false,
    contractOnly: false,
    publicRuntimeBlocked: true,
    exists: [
      "A controlled-test validation package with 14 fixtures.",
      "A public proof record and reviewer release route.",
    ],
    proves: [
      "14 / 14 fixtures pass deterministically.",
      "0 missed positives and 0 false-positive negatives.",
    ],
    doesNotProve: [
      "Runtime-active status is blocked from this surface.",
      "Signal-observed status is not claimed.",
      "Live Splunk, Cribl/Wazuh routing, production, fleet, and public-safe runtime proof are blocked.",
      "AI / analyst disposition is not claimed.",
    ],
    sourceLink: externalLinks.validationReportHo,
  },
  {
    id: "HO-DET-011",
    name: "Windows Service Creation / Binary Change",
    family: "Endpoint",
    status: "pass",
    claimCeiling: "CONTROLLED_TEST_VALIDATED",
    fixtures: { total: 17, positive: 7, negative: 10, missed: 0, falsePositiveNegatives: 0 },
    badges: [
      { label: "CONTROLLED_TEST_VALIDATED", tone: "ceiling" },
      { label: "DRIFT_REVIEW_REQUIRED", tone: "drift" },
      { label: "NOT_PUBLIC_SAFE", tone: "block" },
    ],
    noProofRecord: false,
    contractOnly: false,
    publicRuntimeBlocked: true,
    copyBoundary: "Platform guardrail drift requires review; private runtime evidence is excluded and not public-safe.",
    exists: [
      "A controlled-test validation package with 17 fixtures.",
      "A private runtime evidence index, excluded from the public proof basis.",
    ],
    proves: [
      "17 / 17 fixtures pass deterministically.",
      "0 missed positives and 0 false-positive negatives.",
    ],
    doesNotProve: [
      "Public-safe state is NOT_PUBLIC_SAFE; raw private runtime evidence is excluded.",
      "Runtime-active and signal-observed status are blocked.",
      "Platform guardrail drift is unresolved and review is required, so promotion is blocked.",
    ],
    sourceLink: externalLinks.validation,
  },
  {
    id: "HO-DET-012",
    name: "Suspicious Scheduled Task Creation",
    family: "Endpoint",
    status: "pass",
    claimCeiling: "CONTROLLED_TEST_VALIDATED",
    fixtures: { total: 8, positive: 4, negative: 4, missed: 0, falsePositiveNegatives: 0 },
    badges: [
      { label: "CONTROLLED_TEST_VALIDATED", tone: "ceiling" },
      { label: "PROOF_RECORD_PRESENT", tone: "ceiling" },
      { label: "NOT_PUBLIC_SAFE", tone: "block" },
    ],
    noProofRecord: false,
    contractOnly: false,
    publicRuntimeBlocked: true,
    copyBoundary: "Proof record exists in hawkinsoperations-proof; runtime, signal, and public-safe runtime proof remain blocked.",
    exists: [
      "A controlled-test validation package with 8 fixtures.",
      "A proof record exists at proof/records/HO-DET-012.md.",
      "A proof card exists at proof/cards/HO-DET-012.md.",
    ],
    proves: [
      "8 / 8 fixtures pass deterministically.",
      "0 missed positives and 0 false-positive negatives.",
      "The proof repo records the public ceiling as CONTROLLED_TEST_VALIDATED.",
    ],
    doesNotProve: [
      "Runtime-active status is NOT_PROVEN / blocked.",
      "Signal-observed status is NOT_PROVEN / blocked.",
      "Public-safe runtime proof is NOT_PUBLIC_SAFE / blocked.",
    ],
    sourceLink: externalLinks.validation,
  },
  {
    id: "AWS-DET-001",
    name: "CloudTrail-style IAM denial",
    family: "Cloud",
    status: "pass",
    claimCeiling: "CONTROLLED_TEST_VALIDATED",
    fixtures: { total: 6, positive: 3, negative: 3, missed: 0, falsePositiveNegatives: 0 },
    badges: [
      { label: "CONTROLLED_TEST_VALIDATED", tone: "ceiling" },
      { label: "AWS_LIVE_BLOCKED", tone: "block" },
    ],
    noProofRecord: false,
    contractOnly: false,
    publicRuntimeBlocked: true,
    copyBoundary: "Fixture-only CloudTrail-style IAM denial validation; live AWS proof is blocked.",
    exists: [
      "A fixture-only CloudTrail-style detection candidate.",
      "A fixture-only validation report with 6 fixtures.",
    ],
    proves: [
      "6 / 6 fixtures pass deterministically.",
      "0 missed positives and 0 false-positive negatives.",
    ],
    doesNotProve: [
      "Live AWS and CloudTrail live evidence are not claimed.",
      "Cloud runtime-active and signal-observed status are blocked.",
    ],
    sourceLink: externalLinks.validationReportAws,
  },
  {
    id: "ID-DET-001",
    name: "Suspicious identity session context",
    family: "Identity",
    status: "pass",
    claimCeiling: "CONTROLLED_TEST_VALIDATED",
    fixtures: { total: 10, positive: 5, negative: 5, missed: 0, falsePositiveNegatives: 0 },
    badges: [
      { label: "CONTROLLED_TEST_VALIDATED", tone: "ceiling" },
      { label: "NO_PROOF_RECORD", tone: "warn" },
    ],
    noProofRecord: true,
    contractOnly: false,
    publicRuntimeBlocked: true,
    exists: [
      "A controlled-test validation package with 10 fixtures.",
      "No proof record exists yet; the row is validation-only.",
    ],
    proves: [
      "10 / 10 fixtures pass deterministically.",
      "0 missed positives and 0 false-positive negatives.",
    ],
    doesNotProve: [
      "Live IdP / SIEM / NDR coverage is not claimed.",
      "Production identity coverage and autonomous / AI disposition are blocked.",
    ],
    sourceLink: externalLinks.validation,
  },
  {
    id: "ID-DET-002",
    name: "MFA fatigue / repeated MFA failure",
    family: "Identity",
    status: "pass",
    claimCeiling: "CONTROLLED_TEST_VALIDATED",
    fixtures: { total: 10, positive: 5, negative: 5, missed: 0, falsePositiveNegatives: 0 },
    badges: [
      { label: "CONTROLLED_TEST_VALIDATED", tone: "ceiling" },
      { label: "NO_PROOF_RECORD", tone: "warn" },
    ],
    noProofRecord: true,
    contractOnly: false,
    publicRuntimeBlocked: true,
    exists: [
      "A controlled-test validation package with 10 fixtures.",
      "No proof record exists yet; the row is validation-only.",
    ],
    proves: [
      "10 / 10 fixtures pass deterministically.",
      "0 missed positives and 0 false-positive negatives.",
    ],
    doesNotProve: [
      "Live IdP and live SIEM / NDR are not claimed.",
      "Proof promotion and public-safe state are blocked.",
    ],
    sourceLink: externalLinks.validation,
  },
  {
    id: "ID-DET-003",
    name: "Privileged role / admin group change",
    family: "Identity",
    status: "pass",
    claimCeiling: "CONTROLLED_TEST_VALIDATED",
    fixtures: { total: 10, positive: 5, negative: 5, missed: 0, falsePositiveNegatives: 0 },
    badges: [
      { label: "CONTROLLED_TEST_VALIDATED", tone: "ceiling" },
      { label: "NO_PROOF_RECORD", tone: "warn" },
    ],
    noProofRecord: true,
    contractOnly: false,
    publicRuntimeBlocked: true,
    exists: [
      "A controlled-test validation package with 10 fixtures.",
      "No proof record exists yet; the row is validation-only.",
    ],
    proves: [
      "10 / 10 fixtures pass deterministically.",
      "0 missed positives and 0 false-positive negatives.",
    ],
    doesNotProve: [
      "Live IdP / SIEM coverage is not claimed.",
      "Production coverage and AI / analyst disposition are blocked.",
    ],
    sourceLink: externalLinks.validation,
  },
  {
    id: "ID-DET-004",
    name: "Impossible travel / anomalous session",
    family: "Identity",
    status: "pass",
    claimCeiling: "CONTROLLED_TEST_VALIDATED",
    fixtures: { total: 10, positive: 5, negative: 5, missed: 0, falsePositiveNegatives: 0 },
    badges: [
      { label: "CONTROLLED_TEST_VALIDATED", tone: "ceiling" },
      { label: "COMPLETENESS_BLOCKED", tone: "block" },
      { label: "NO_PROOF_RECORD", tone: "warn" },
    ],
    noProofRecord: true,
    contractOnly: false,
    publicRuntimeBlocked: true,
    exists: [
      "A controlled-test validation package with 10 fixtures.",
      "No proof record exists yet; the row is validation-only.",
    ],
    proves: [
      "10 / 10 fixtures pass deterministically.",
      "0 missed positives and 0 false-positive negatives.",
    ],
    doesNotProve: [
      "Impossible-travel and session-hijacking completeness are not claimed.",
      "Live IdP and public-safe state are blocked.",
    ],
    sourceLink: externalLinks.validation,
  },
  {
    id: "HO-NDR-001",
    name: "Security Onion visibility contract",
    family: "NDR/Telemetry",
    status: "contract-sample",
    claimCeiling: "BOUNDARY_CONTRACT_ONLY",
    fixtures: null,
    badges: [{ label: "BOUNDARY_CONTRACT_ONLY", tone: "warn" }],
    noProofRecord: true,
    contractOnly: true,
    publicRuntimeBlocked: true,
    copyBoundary: "Contract sample only; no fixtures. Cross-source corroboration contract defined, not proof promotion.",
    exists: [
      "A boundary contract sample for Security Onion visibility.",
      "No fixtures and no proof record; the row is contract-only.",
    ],
    proves: [
      "A cross-source corroboration contract is defined.",
    ],
    doesNotProve: [
      "Security Onion runtime, Splunk search, and Cribl/Wazuh routes are blocked.",
      "Zeek / Suricata quality and public-safe proof are not claimed.",
    ],
    sourceLink: externalLinks.validation,
  },
];

export const validationFamilies: ValidationFamily[] = ["Endpoint", "Cloud", "Identity", "NDR/Telemetry"];

const validatedRows = validationRows.filter((r) => r.status === "pass");

export const registryStats = {
  totalFixtures: validationRows.reduce((sum, r) => sum + (r.fixtures?.total ?? 0), 0),
  passedPackages: validatedRows.length,
  noProofRecordRows: validationRows.filter((r) => r.noProofRecord).length,
  contractOnlyRows: validationRows.filter((r) => r.contractOnly).length,
  publicRuntimeBlockedRows: validationRows.filter((r) => r.publicRuntimeBlocked).length,
};
