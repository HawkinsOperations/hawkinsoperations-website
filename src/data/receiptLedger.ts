/**
 * Receipt / ledger timeline — a hand-maintained reviewer snapshot.
 *
 * This is not live telemetry. Each lane is a bounded packet or receipt that
 * a reviewer can route to. The timeline is append-only in intent and
 * hand-maintained; it does not imply dynamic runtime telemetry.
 */

export const ledgerCaveat =
  "Reviewer snapshot · hand-maintained · rendering only. This timeline is not live runtime telemetry.";

export type LedgerEntry = {
  marker: string;
  kind: "receipt" | "bounded packet" | "snapshot";
  title: string;
  line: string;
};

export const ledgerEntries: LedgerEntry[] = [
  {
    marker: "001",
    kind: "bounded packet",
    title: "Proof Pack 001 reviewer packet",
    line: "Bounded HO-DET-001 reviewer packet at CONTROLLED_TEST_VALIDATED.",
  },
  {
    marker: "002",
    kind: "receipt",
    title: "Checksum manifest",
    line: "SHA256SUMS.txt locks source packet files for review.",
  },
  {
    marker: "003",
    kind: "snapshot",
    title: "Validation registry",
    line: "Controlled-test packages, fixture counts, and blocked runtime states.",
  },
  {
    marker: "004",
    kind: "snapshot",
    title: "Proof status index",
    line: "Per-detection proof status; human review required.",
  },
  {
    marker: "005",
    kind: "bounded packet",
    title: "AutoSOC seed ledger",
    line: "Append-only seed ledger — 1 case, human-review required.",
  },
  {
    marker: "006",
    kind: "bounded packet",
    title: "SOAR case packet",
    line: "Deterministic analyst-support structure; response authority blocked.",
  },
  {
    marker: "007",
    kind: "bounded packet",
    title: "Local GPU / LLM support boundary",
    line: "Private support-only contract boundary; public runtime proof blocked.",
  },
];
