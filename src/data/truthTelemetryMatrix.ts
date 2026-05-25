/**
 * Truth vs Telemetry matrix data.
 *
 * Rows = detections. Columns = claim axes.
 *
 * Rule, enforced in code: every row's "runtime-active" and
 * "signal-observed" cells must be "blocked". Those claim axes do not
 * change row-by-row at the current public ceiling.
 *
 * Cell states:
 *   "supported"     ● claim is supported at the current ceiling
 *   "at-ceiling"    ◐ claim is at the current public ceiling boundary
 *   "gate-defined"  ○ next promotion gate is defined; not promoted
 *   "blocked"       ✕ blocked at this ceiling (claim firewall active)
 *   "na"            · not applicable
 */

export type MatrixCell = "supported" | "at-ceiling" | "gate-defined" | "blocked" | "na";

export type MatrixColumn = {
  key:
    | "source-exists"
    | "test-validated"
    | "evidence-linked"
    | "bounded-public-claim"
    | "runtime-active"
    | "signal-observed";
  label: string;
  /** "above" marks the column at which the ceiling boundary line is drawn */
  boundary?: "above";
};

// Note: the runtime-active and signal-observed columns are blocked at this
// ceiling and every row in matrixDetections renders the "blocked" cell for
// those columns. The labels appear in the rendered matrix only to show that
// those claim axes are blocked / not claimed — the matrix does not prove
// runtime activity or signal observation for any row.
export const matrixColumns: MatrixColumn[] = [
  { key: "source-exists",        label: "Source Exists" },
  { key: "test-validated",       label: "Test Validated" },
  { key: "evidence-linked",      label: "Evidence Linked" },
  { key: "bounded-public-claim", label: "Bounded Public Claim" },
  { key: "runtime-active",       label: "Runtime-Active", boundary: "above" },
  { key: "signal-observed",      label: "Signal-Observed" },
];

export type MatrixRow = {
  id: string;
  cells: Record<MatrixColumn["key"], MatrixCell>;
};

export const matrixDetections: MatrixRow[] = [
  {
    id: "HO-DET-001",
    cells: {
      "source-exists":        "supported",
      "test-validated":       "supported",
      "evidence-linked":      "supported",
      "bounded-public-claim": "at-ceiling",
      "runtime-active":       "blocked",
      "signal-observed":      "blocked",
    },
  },
  {
    id: "AWS-DET-001",
    cells: {
      "source-exists":        "supported",
      "test-validated":       "supported",
      "evidence-linked":      "at-ceiling",
      "bounded-public-claim": "gate-defined",
      "runtime-active":       "blocked",
      "signal-observed":      "blocked",
    },
  },
  {
    id: "HO-DET-011",
    cells: {
      "source-exists":        "supported",
      "test-validated":       "supported",
      "evidence-linked":      "at-ceiling",
      "bounded-public-claim": "gate-defined",
      "runtime-active":       "blocked",
      "signal-observed":      "blocked",
    },
  },
  {
    id: "HO-DET-012",
    cells: {
      "source-exists":        "supported",
      "test-validated":       "supported",
      "evidence-linked":      "na",
      "bounded-public-claim": "gate-defined",
      "runtime-active":       "blocked",
      "signal-observed":      "blocked",
    },
  },
  {
    id: "ID-DET-001",
    cells: {
      "source-exists":        "supported",
      "test-validated":       "supported",
      "evidence-linked":      "na",
      "bounded-public-claim": "gate-defined",
      "runtime-active":       "blocked",
      "signal-observed":      "blocked",
    },
  },
  {
    id: "ID-DET-002",
    cells: {
      "source-exists":        "supported",
      "test-validated":       "supported",
      "evidence-linked":      "na",
      "bounded-public-claim": "gate-defined",
      "runtime-active":       "blocked",
      "signal-observed":      "blocked",
    },
  },
  {
    id: "ID-DET-003",
    cells: {
      "source-exists":        "supported",
      "test-validated":       "supported",
      "evidence-linked":      "na",
      "bounded-public-claim": "gate-defined",
      "runtime-active":       "blocked",
      "signal-observed":      "blocked",
    },
  },
  {
    id: "ID-DET-004",
    cells: {
      "source-exists":        "supported",
      "test-validated":       "supported",
      "evidence-linked":      "na",
      "bounded-public-claim": "gate-defined",
      "runtime-active":       "blocked",
      "signal-observed":      "blocked",
    },
  },
  {
    id: "HO-NDR-001",
    cells: {
      "source-exists":        "supported",
      "test-validated":       "gate-defined",
      "evidence-linked":      "na",
      "bounded-public-claim": "gate-defined",
      "runtime-active":       "blocked",
      "signal-observed":      "blocked",
    },
  },
  {
    id: "HO-PIPE-001",
    cells: {
      "source-exists":        "supported",
      "test-validated":       "na",
      "evidence-linked":      "na",
      "bounded-public-claim": "gate-defined",
      "runtime-active":       "blocked",
      "signal-observed":      "blocked",
    },
  },
];
