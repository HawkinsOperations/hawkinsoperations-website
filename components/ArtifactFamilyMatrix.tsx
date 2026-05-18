import { artifactFamilies, artifactFamilyAxes, type CellState } from "@data/artifactFamilies";

const glyph: Record<CellState, string> = {
  filled: "●",
  gated: "○",
  empty: "·",
};

const cellModifier: Record<CellState, string> = {
  filled: "artifact-matrix__cell--filled",
  gated: "artifact-matrix__cell--gated",
  empty: "artifact-matrix__cell--empty",
};

export default function ArtifactFamilyMatrix() {
  const cols = `minmax(220px, 1.6fr) ${artifactFamilyAxes.map(() => "minmax(90px, 1fr)").join(" ")}`;
  return (
    <div className="artifact-matrix" aria-label="Artifact family matrix: 7 families by 4 evidence axes">
      <div className="artifact-matrix__grid" style={{ gridTemplateColumns: cols }}>
        <div className="artifact-matrix__head">
          <div className="artifact-matrix__cell artifact-matrix__cell--head">Artifact family</div>
          {artifactFamilyAxes.map((axis) => (
            <div key={axis.key} className="artifact-matrix__cell artifact-matrix__cell--head">{axis.label}</div>
          ))}
        </div>
        {artifactFamilies.map((family) => (
          <div key={family.slug} className="artifact-matrix__row">
            <div className="artifact-matrix__cell artifact-matrix__cell--row-head">
              <strong>{family.name}</strong>
              <div style={{ marginTop: 4, fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif', fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 400, letterSpacing: 0 }}>
                {family.purpose}
              </div>
            </div>
            {artifactFamilyAxes.map((axis) => {
              const state = family.cells[axis.key];
              const stateLabel = state === "filled" ? "supports today" : state === "gated" ? "requires next promotion gate" : "out of scope by design";
              return (
                <div
                  key={axis.key}
                  className={`artifact-matrix__cell ${cellModifier[state]}`}
                  role="img"
                  aria-label={`${family.name} · ${axis.label}: ${stateLabel}`}
                >
                  <span aria-hidden="true">{glyph[state]}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="artifact-matrix__legend">
        <span><span className="artifact-matrix__legend-glyph">●</span> supports today</span>
        <span><span className="artifact-matrix__legend-glyph artifact-matrix__legend-glyph--gated">○</span> requires next promotion gate</span>
        <span>· out of scope by design</span>
      </div>
    </div>
  );
}
