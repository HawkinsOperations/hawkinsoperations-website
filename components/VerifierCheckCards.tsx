/**
 * VerifierCheckCards
 *
 * Grouped verifier-route cards. Verifier scripts check structure, parity,
 * claim boundaries, and packet contracts. They do not prove runtime activity
 * or public-safe evidence — stated in the boundary line below.
 */

import { verifierGroups, verifierBoundary } from "@data/proofPackManifest";

export default function VerifierCheckCards() {
  return (
    <div aria-label="Verifier check cards">
      <div className="vc-grid">
        {verifierGroups.map((group) => (
          <article key={group.group} className="vc-card">
            <p className="vc-card__group">{group.group}</p>
            <p className="vc-card__blurb">{group.blurb}</p>
            <ul className="vc-card__list">
              {group.scripts.map((script) => (
                <li key={script} className="vc-card__script">{script}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="muted mt-4 text-xs leading-5 max-w-3xl">{verifierBoundary}</p>
    </div>
  );
}
