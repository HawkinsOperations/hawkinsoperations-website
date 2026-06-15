"use client";

import { useMemo, useState } from "react";
import { detectionOpsInventory } from "@data/attackDetectionOps";

const filters = ["all", "validated", "private", "planned", "contract", "fixture"] as const;

export default function AttackCoverageCommandMap() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const rows = useMemo(
    () => (filter === "all" ? detectionOpsInventory : detectionOpsInventory.filter((row) => row.tone === filter)),
    [filter],
  );

  return (
    <section className="attack-command-map" aria-labelledby="attack-command-map-title">
      <div className="attack-command-map__head">
        <div>
          <p className="cockpit-eyebrow">ATT&CK / Kill Chain operations board</p>
          <h2 id="attack-command-map-title">Detection work mapped to source, validation, proof, and gates.</h2>
        </div>
        <div className="attack-command-map__filters" aria-label="Detection state filters">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? "is-active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="attack-command-map__grid">
        {rows.map((row) => (
          <article key={`${row.id}-${row.family}`} className={`attack-command-card attack-command-card--${row.tone}`}>
            <div>
              <span>{row.killChainStage}</span>
              <strong>{row.id}</strong>
            </div>
            <h3>{row.title}</h3>
            <p>{row.attackContext}</p>
            <dl>
              <div>
                <dt>Lane</dt>
                <dd>{row.platformLane}</dd>
              </div>
              <div>
                <dt>Validation</dt>
                <dd>{row.validationState}</dd>
              </div>
              <div>
                <dt>Ceiling</dt>
                <dd>{row.proofCeiling}</dd>
              </div>
            </dl>
            <a href={row.proofRoute}>Open route -&gt;</a>
          </article>
        ))}
      </div>
    </section>
  );
}

