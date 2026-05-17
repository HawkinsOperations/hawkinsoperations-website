import { truthSurfaces } from "@config/truth-surfaces";

const gateBetween = [
  "promotion gate · validation receipt",
  "promotion gate · runtime evidence",
  "promotion gate · signal evidence",
  "promotion gate · evidence linkage",
  "promotion gate · ceiling review",
];

export default function TruthSurfaceInfographic() {
  return (
    <div className="truth-infographic" aria-label="Six truth surfaces, stacked lanes">
      {truthSurfaces.map((surface, i) => (
        <div key={surface.slug}>
          <div className="truth-infographic__lane" data-surface={surface.slug}>
            <div className="truth-infographic__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</div>
            <div className="truth-infographic__body">
              <span className="truth-infographic__name">{surface.name}</span>
              <span className="truth-infographic__proves">supports — {surface.proves}</span>
              <span className="truth-infographic__proves" style={{ color: "var(--muted)", marginTop: 4 }}>
                does not assert — {surface.doesNotProve}
              </span>
              <div className="truth-infographic__chips">
                <span className="truth-infographic__chip">{surface.slug.toUpperCase()}</span>
                <span className="truth-infographic__chip truth-infographic__chip--gate">requires next gate</span>
              </div>
            </div>
          </div>
          {i < truthSurfaces.length - 1 && (
            <div className="truth-infographic__gate" aria-hidden="true">
              <span />
              <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, var(--diagram-line-strong), transparent)" }} />
                <span>↑ {gateBetween[i]}</span>
                <span style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, var(--diagram-line-strong), transparent)" }} />
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
