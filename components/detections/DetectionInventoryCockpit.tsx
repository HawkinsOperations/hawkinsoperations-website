"use client";

import { useMemo, useState } from "react";
import { attackFamilies, cyberKillChainStages, type AttackFamily, type AttackTone } from "@data/attackCoverage";

const toneLabel: Record<AttackTone, string> = {
  validated: "controlled validated",
  fixture: "fixture only",
  private: "private boundary",
  planned: "validation planned",
  contract: "contract only",
};

export default function DetectionInventoryCockpit() {
  const [family, setFamily] = useState("all");
  const [activeStage, setActiveStage] = useState(cyberKillChainStages[3]?.stage ?? cyberKillChainStages[0].stage);

  const shown: AttackFamily[] = useMemo(
    () => (family === "all" ? attackFamilies : attackFamilies.filter((item) => item.family === family)),
    [family],
  );
  const activeKillChain = cyberKillChainStages.find((stage) => stage.stage === activeStage) ?? cyberKillChainStages[0];

  const counts = attackFamilies.flatMap((item) => item.nodes).reduce<Record<AttackTone, number>>(
    (acc, node) => ({ ...acc, [node.tone]: (acc[node.tone] ?? 0) + 1 }),
    { validated: 0, fixture: 0, private: 0, planned: 0, contract: 0 },
  );

  return (
    <section className="det-cockpit" aria-label="Detection inventory cockpit">
      <div className="det-cockpit__head">
        <p className="cockpit-eyebrow">Detection Inventory Cockpit</p>
        <h2>Source truth feeds validation truth, proof ceilings, and public rendering.</h2>
        <p>
          ATT&CK and Cyber Kill Chain mapping help reviewers navigate detection intent. They do not
          prove live telemetry, runtime deployment, signal observation, or customer use.
        </p>
      </div>

      <div className="det-cockpit__stats">
        {Object.entries(counts).map(([tone, count]) => (
          <article key={tone} className={`det-stat det-tone--${tone}`}>
            <strong>{count}</strong>
            <span>{toneLabel[tone as AttackTone]}</span>
          </article>
        ))}
      </div>

      <div className="det-cockpit__filters" role="group" aria-label="Detection family filter">
        <button type="button" className={family === "all" ? "is-active" : ""} onClick={() => setFamily("all")}>All families</button>
        {attackFamilies.map((item) => (
          <button key={item.family} type="button" className={family === item.family ? "is-active" : ""} onClick={() => setFamily(item.family)}>
            {item.family}
          </button>
        ))}
      </div>

      <div className="det-cockpit__grid">
        <div className="det-inventory">
          {shown.map((group) => (
            <section key={group.family} className="det-family">
              <h3>{group.family}</h3>
              {group.nodes.map((node) => (
                <article key={node.id} className={`det-node det-tone--${node.tone}`}>
                  <span>{node.id}</span>
                  <strong>{node.title}</strong>
                  <p>{node.attack}</p>
                  <dl>
                    <div>
                      <dt>Ceiling</dt>
                      <dd>{node.ceiling}</dd>
                    </div>
                    <div>
                      <dt>Validation</dt>
                      <dd>{node.validation}</dd>
                    </div>
                  </dl>
                  <small>{node.boundary}</small>
                </article>
              ))}
            </section>
          ))}
        </div>

        <aside className="det-killchain" aria-label="Cyber Kill Chain navigator">
          <p className="cockpit-eyebrow">Lifecycle navigator</p>
          <div className="det-killchain__tabs">
            {cyberKillChainStages.map((stage) => (
              <button key={stage.stage} type="button" className={activeStage === stage.stage ? "is-active" : ""} onClick={() => setActiveStage(stage.stage)}>
                {stage.stage}
              </button>
            ))}
          </div>
          <article>
            <h3>{activeKillChain.stage}</h3>
            <p>{activeKillChain.currentState}</p>
            <dl>
              <div>
                <dt>Mapped artifacts</dt>
                <dd>{activeKillChain.mappedArtifacts.join(" · ")}</dd>
              </div>
              <div>
                <dt>Strongest artifact</dt>
                <dd>{activeKillChain.strongestArtifact}</dd>
              </div>
              <div>
                <dt>Still gated</dt>
                <dd>{activeKillChain.blockedClaims.join(" · ")}</dd>
              </div>
            </dl>
          </article>
        </aside>
      </div>

      <div className="det-lifecycle" aria-label="Detection lifecycle rail">
        {["source truth", "validation truth", "proof ceiling", "public rendering"].map((step) => (
          <span key={step}>{step}</span>
        ))}
      </div>
    </section>
  );
}
