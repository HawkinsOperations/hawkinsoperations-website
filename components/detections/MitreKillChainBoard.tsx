"use client";

import { useState } from "react";
import { cyberKillChainStages } from "@data/attackCoverage";

export default function MitreKillChainBoard() {
  const [active, setActive] = useState(0);
  const stage = cyberKillChainStages[active];

  return (
    <section className="killchain-board" aria-labelledby="killchain-board-title">
      <div className="killchain-board__header">
        <p className="cockpit-eyebrow">Kill Chain navigator</p>
        <h2 id="killchain-board-title">Attack context is navigation, not proof promotion.</h2>
      </div>
      <div className="killchain-board__tabs" role="tablist" aria-label="Kill Chain stages">
        {cyberKillChainStages.map((item, index) => (
          <button
            key={item.stage}
            type="button"
            role="tab"
            aria-selected={active === index}
            className={active === index ? "is-active" : ""}
            onClick={() => setActive(index)}
          >
            {item.stage}
          </button>
        ))}
      </div>
      <article className="killchain-board__panel">
        <div>
          <span>Active stage</span>
          <h3>{stage.stage}</h3>
          <p>{stage.reviewerInterpretation}</p>
        </div>
        <dl>
          <div>
            <dt>Mapped artifacts</dt>
            <dd>{stage.mappedArtifacts.join(", ")}</dd>
          </div>
          <div>
            <dt>Strongest artifact</dt>
            <dd>{stage.strongestArtifact}</dd>
          </div>
          <div>
            <dt>Blocked claim lane</dt>
            <dd>{stage.blockedClaims.join(" / ")}</dd>
          </div>
        </dl>
      </article>
    </section>
  );
}

