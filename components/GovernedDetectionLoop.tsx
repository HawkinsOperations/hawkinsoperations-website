"use client";

import { useState } from "react";
import { artifactStages } from "@data/artifactMachine";

/**
 * GovernedDetectionLoop
 *
 * Interactive presentation of the canonical artifact pipeline. Selecting,
 * focusing, or hovering a stage updates a single detail panel — what happens,
 * what the receipt supports, what it does NOT prove, the next gate, and the
 * owning surface. Detail is revealed through interaction, not dumped by default.
 *
 * Claim contract: reuses src/data/artifactMachine.ts only. No new claims.
 */
export default function GovernedDetectionLoop() {
  const [active, setActive] = useState(0);
  const stage = artifactStages[active];
  const total = artifactStages.length;

  return (
    <div className="gdl" role="region" aria-label="Governed detection loop">
      <div className="gdl__track" role="tablist" aria-label="Pipeline stages" aria-orientation="horizontal">
        {artifactStages.map((s, i) => {
          const isLast = i === total - 1;
          const isActive = i === active;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              id={`gdl-tab-${s.id}`}
              aria-selected={isActive}
              aria-controls="gdl-panel"
              tabIndex={isActive ? 0 : -1}
              className={`gdl__node${isActive ? " gdl__node--active" : ""}${isLast ? " gdl__node--boundary" : ""}`}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((i + 1) % total);
                } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((i - 1 + total) % total);
                }
              }}
            >
              <span className="gdl__node-n">{s.n}</span>
              <span className="gdl__node-name">{s.name}</span>
              <span className="gdl__node-code">{s.code}</span>
              {!isLast && <span className="gdl__node-arrow" aria-hidden="true">→</span>}
            </button>
          );
        })}
      </div>

      <div
        className="gdl__panel"
        id="gdl-panel"
        role="tabpanel"
        aria-labelledby={`gdl-tab-${stage.id}`}
        tabIndex={0}
      >
        <div className="gdl__panel-head">
          <span className="gdl__panel-step">Stage {stage.n} / {total}</span>
          <h3 className="gdl__panel-title">{stage.name}</h3>
          <code className="gdl__panel-code">{stage.code}</code>
        </div>

        <dl className="gdl__facts">
          <div className="gdl__fact">
            <dt>What happens</dt>
            <dd>{stage.exists}</dd>
          </div>
          <div className="gdl__fact">
            <dt>What this supports</dt>
            <dd>{stage.supports}</dd>
          </div>
          <div className="gdl__fact gdl__fact--blocked">
            <dt>What this does <strong>not</strong> prove</dt>
            <dd>{stage.bounded}</dd>
          </div>
          <div className="gdl__fact">
            <dt>Next gate</dt>
            <dd>{stage.nextGate}</dd>
          </div>
        </dl>

        <a
          className="gdl__panel-link"
          href={stage.link.href}
          target={stage.link.external ? "_blank" : undefined}
          rel={stage.link.external ? "noopener noreferrer" : undefined}
        >
          {stage.link.label} {stage.link.external ? "↗" : "→"}
        </a>
      </div>
    </div>
  );
}
