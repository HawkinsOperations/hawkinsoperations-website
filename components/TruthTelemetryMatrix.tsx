/**
 * TruthTelemetryMatrix
 *
 * Detection × claim-axis grid showing which claims are supported at the
 * current public ceiling, which require the next promotion gate, and
 * which remain blocked. The Runtime-Active and Signal-Observed columns
 * render ✕ for every row by enforced rule — those claim axes are blocked
 * at this ceiling and do not change row-by-row.
 *
 * Claim contract:
 *  - Glyphs describe published claim state, not runtime state.
 *  - The amber vertical bar visually marks the public ceiling boundary.
 *  - Renders data from src/data/truthTelemetryMatrix.ts.
 */

import { matrixDetections, matrixColumns, type MatrixCell } from "@data/truthTelemetryMatrix";

const glyph: Record<MatrixCell, string> = {
  supported: "●",
  "at-ceiling": "◐",
  "gate-defined": "○",
  blocked: "✕",
  na: "·",
};

const glyphClass: Record<MatrixCell, string> = {
  supported: "truth-matrix__glyph--supported",
  "at-ceiling": "truth-matrix__glyph--at-ceiling",
  "gate-defined": "truth-matrix__glyph--gate-defined",
  blocked: "truth-matrix__glyph--blocked",
  na: "truth-matrix__glyph--na",
};

const glyphLabel: Record<MatrixCell, string> = {
  supported: "supported",
  "at-ceiling": "at current ceiling",
  "gate-defined": "gate defined, not yet promoted",
  blocked: "blocked at this ceiling",
  na: "not applicable",
};

const ceilingBoundaryIndex = matrixColumns.findIndex((c) => c.boundary === "above");

export default function TruthTelemetryMatrix() {
  return (
    <div className="truth-matrix" role="region" aria-label="Truth vs telemetry matrix">
      <table className="truth-matrix__table">
        <thead>
          <tr>
            <th className="truth-matrix__row-head" scope="col">Detection</th>
            {matrixColumns.map((col, i) => (
              <th
                key={col.key}
                scope="col"
                className={i === ceilingBoundaryIndex ? "truth-matrix__cell--ceiling-boundary" : ""}
                title={col.label}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrixDetections.map((row) => (
            <tr key={row.id}>
              <td className="truth-matrix__row-head">{row.id}</td>
              {matrixColumns.map((col, i) => {
                const cell = row.cells[col.key];
                return (
                  <td
                    key={col.key}
                    className={i === ceilingBoundaryIndex ? "truth-matrix__cell--ceiling-boundary" : ""}
                    aria-label={`${row.id} · ${col.label}: ${glyphLabel[cell]}`}
                  >
                    <span className={`truth-matrix__glyph ${glyphClass[cell]}`}>{glyph[cell]}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="truth-matrix__legend" aria-label="Matrix legend">
        <span className="truth-matrix__legend-item">
          <span className="truth-matrix__glyph truth-matrix__glyph--supported">●</span> supported
        </span>
        <span className="truth-matrix__legend-item">
          <span className="truth-matrix__glyph truth-matrix__glyph--at-ceiling">◐</span> at ceiling
        </span>
        <span className="truth-matrix__legend-item">
          <span className="truth-matrix__glyph truth-matrix__glyph--gate-defined">○</span> gate defined · not promoted
        </span>
        <span className="truth-matrix__legend-item">
          <span className="truth-matrix__glyph truth-matrix__glyph--blocked">✕</span> blocked at this ceiling
        </span>
        <span className="truth-matrix__legend-item">
          <span className="truth-matrix__glyph truth-matrix__glyph--na">·</span> not applicable
        </span>
        <span className="truth-matrix__legend-item" style={{ marginLeft: "auto" }}>
          amber bar = public ceiling boundary
        </span>
      </div>
    </div>
  );
}
