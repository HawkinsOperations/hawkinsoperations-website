import { truthPlanes } from "@data/truthPlanes";

export default function TruthRail() {
  return (
    <section
      className="moon-panel relative overflow-hidden p-7 md:p-9"
      data-truth-rail
      aria-labelledby="truth-rail-title"
    >
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="eyebrow">Truth split rail</p>
          <h2 id="truth-rail-title" className="headline mt-2 text-2xl md:text-[1.7rem]">
            Six surfaces, separated by design.
          </h2>
          <p className="muted mt-3 text-sm leading-6">
            Each surface answers a different question. None inherits proof from another.
          </p>
        </div>
      </header>

      <div className="truth-rail mt-8">
        <div className="truth-rail__legend">
          <span className="truth-rail__legend-active">Active surface</span>
          <span className="truth-rail__legend-blocked">Not claimed publicly</span>
        </div>

        <div className="truth-rail__track" role="list">
          {truthPlanes.map((plane, i) => (
            <div
              key={plane.key}
              className={`truth-node ${plane.active ? "truth-node--active" : "truth-node--inactive"}`}
              data-plane={plane.key}
              role="listitem"
            >
              <span className="truth-node__index">{`S${String(i + 1).padStart(2, "0")}`}</span>
              <span className="truth-node__dot" aria-hidden="true"></span>
              <div>
                <span className="truth-node__label">{plane.label}</span>
                <span className="truth-node__sub">{plane.short}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
