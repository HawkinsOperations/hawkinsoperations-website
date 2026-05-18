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
    <div className="truth-matrix scan-sweep" role="region" aria-label="Truth vs telemetry matrix">
      <p className="truth-matrix__why">
        <strong>Why this matters · </strong>
        Recruiters and security leaders can read claim discipline in one glance. Filled cells say what is
        supported. Hollow cells say what still needs the next gate. The <strong>amber line</strong> marks
        the public ceiling — every cell to the right of it remains blocked at this surface and cannot be
        promoted by website rendering alone.
      </p>
      <div className="truth-matrix__table-wrap">
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
      </div>

      {/* Mobile fallback — per-detection cards instead of the wide table */}
      <div className="truth-matrix__mobile" aria-label="Truth matrix mobile view">
        {matrixDetections.map((row) => (
          <div key={row.id} className="truth-matrix__mobile-card">
            <p className="truth-matrix__mobile-card-id">{row.id}</p>
            {matrixColumns.map((col) => {
              const cell = row.cells[col.key];
              return (
                <div key={col.key} className="truth-matrix__mobile-row">
                  <span>{col.label}</span>
                  <span
                    className={`truth-matrix__glyph ${glyphClass[cell]}`}
                    aria-label={glyphLabel[cell]}
                  >
                    {glyph[cell]}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

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

      <div className="truth-matrix__details" aria-label="Per-detection inspection drawer">
        {matrixDetections.map((row) => {
          const supported = matrixColumns.filter((c) => row.cells[c.key] === "supported").map((c) => c.label);
          const atCeiling = matrixColumns.filter((c) => row.cells[c.key] === "at-ceiling").map((c) => c.label);
          const gated = matrixColumns.filter((c) => row.cells[c.key] === "gate-defined").map((c) => c.label);
          const blocked = matrixColumns.filter((c) => row.cells[c.key] === "blocked").map((c) => c.label);
          return (
            <details key={row.id} className="disclose">
              <summary>Inspect · {row.id}</summary>
              <div className="disclose__body">
                <div className="truth-matrix__details-grid">
                  <div className="truth-matrix__details-card">
                    <strong>Supported</strong>
                    <div style={{ marginTop: 4 }}>{supported.length ? supported.join(" · ") : "—"}</div>
                  </div>
                  <div className="truth-matrix__details-card">
                    <strong>At ceiling</strong>
                    <div style={{ marginTop: 4 }}>{atCeiling.length ? atCeiling.join(" · ") : "—"}</div>
                  </div>
                  <div className="truth-matrix__details-card">
                    <strong>Gate defined · not promoted</strong>
                    <div style={{ marginTop: 4 }}>{gated.length ? gated.join(" · ") : "—"}</div>
                  </div>
                  <div className="truth-matrix__details-card">
                    <strong>Blocked at this ceiling</strong>
                    <div style={{ marginTop: 4, color: "var(--blocked-red-strong)" }}>
                      {blocked.length ? blocked.join(" · ") : "—"}
                    </div>
                  </div>
                </div>
                <p style={{ marginTop: "0.8rem", fontSize: "0.8rem", color: "var(--muted)" }}>
                  Public claims for {row.id} remain bounded by the ceiling line. Runtime-Active and
                  Signal-Observed are blocked at this ceiling and do not change row-by-row.
                </p>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
