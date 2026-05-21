/**
 * AttackCoverageMap
 *
 * MITRE ATT&CK-mapped detection coverage, grouped into detection families.
 * Each node carries: detection ID, ATT&CK technique/family label, proof
 * ceiling, validation state, and a blocked runtime/signal boundary.
 *
 * Claim contract:
 *  - ATT&CK mapping describes detection intent and coverage. It does not
 *    prove live telemetry, runtime deployment, signal observation, or use.
 *  - Every node renders a blocked runtime/signal marker. Website rendering
 *    does not promote any node above its stated ceiling.
 *  - Data lives in src/data/attackCoverage.ts.
 */

import { attackFamilies, attackMapSafeCopy, type AttackTone } from "@data/attackCoverage";

const toneClass: Record<AttackTone, string> = {
  validated: "attack-node--validated",
  fixture: "attack-node--fixture",
  private: "attack-node--private",
  planned: "attack-node--planned",
  contract: "attack-node--contract",
};

const toneLabel: Record<AttackTone, string> = {
  validated: "validated",
  fixture: "fixture-only",
  private: "private · not public-safe",
  planned: "validation planned",
  contract: "contract only",
};

export default function AttackCoverageMap() {
  return (
    <div className="attack-map" role="region" aria-label="MITRE ATT&CK-mapped detection coverage">
      <p className="attack-map__why">
        <strong>Why this matters · </strong>
        Reviewers in detection engineering, SOC operations, identity security, and validation can read
        coverage intent at a glance: each detection carries an ATT&CK mapping, an explicit proof ceiling,
        a validation state, and a blocked runtime/signal boundary. The map is general reviewer value,
        not a deployment claim.
      </p>

      <div className="attack-map__families">
        {attackFamilies.map((fam) => (
          <section key={fam.family} className="attack-fam" aria-label={fam.family}>
            <header className="attack-fam__head">
              <span className="attack-fam__rule" aria-hidden="true" />
              <h3 className="attack-fam__name">{fam.family}</h3>
              <span className="attack-fam__count">{fam.nodes.length}</span>
            </header>

            <div className="attack-fam__nodes">
              {fam.nodes.map((node) => (
                <article key={node.id} className={`attack-node ${toneClass[node.tone]}`}>
                  <div className="attack-node__top">
                    <span className="attack-node__id">{node.id}</span>
                    <span className="attack-node__tone">{toneLabel[node.tone]}</span>
                  </div>
                  <p className="attack-node__title">{node.title}</p>

                  <dl className="attack-node__rows">
                    <div className="attack-node__row">
                      <dt>ATT&amp;CK</dt>
                      <dd className="attack-node__attack">{node.attack}</dd>
                    </div>
                    <div className="attack-node__row">
                      <dt>Ceiling</dt>
                      <dd className="attack-node__ceiling">{node.ceiling}</dd>
                    </div>
                    <div className="attack-node__row">
                      <dt>Validation</dt>
                      <dd>{node.validation}</dd>
                    </div>
                  </dl>

                  <p className="attack-node__blocked" role="note">
                    <span className="attack-node__blocked-tag">RUNTIME / SIGNAL · BLOCKED</span>
                    {node.boundary}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="attack-map__legend" aria-label="Coverage map legend">
        <span className="attack-map__legend-item"><span className="attack-dot attack-dot--validated" />validated</span>
        <span className="attack-map__legend-item"><span className="attack-dot attack-dot--fixture" />fixture-only</span>
        <span className="attack-map__legend-item"><span className="attack-dot attack-dot--private" />private · not public-safe</span>
        <span className="attack-map__legend-item"><span className="attack-dot attack-dot--planned" />validation planned</span>
        <span className="attack-map__legend-item"><span className="attack-dot attack-dot--contract" />contract only</span>
      </div>

      <p className="attack-map__safe">{attackMapSafeCopy}</p>
    </div>
  );
}
