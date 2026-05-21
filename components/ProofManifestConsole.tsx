/**
 * ProofManifestConsole
 *
 * Receipt-console view of Proof Pack 001: collapsible included / excluded
 * manifest panels, the does-not-prove list, and the release-route caveat.
 * Included items stay visually separate from excluded / blocked items.
 * Website rendering is not proof.
 */

import {
  proofPack,
  manifestIncluded,
  manifestExcluded,
  proofPackDoesNotProve,
  releaseRouteCaveat,
} from "@data/proofPackManifest";

export default function ProofManifestConsole() {
  return (
    <div className="pm-console" aria-label="Proof Pack 001 manifest console">
      <div className="pm-console__bar">
        <span className="pm-console__dot" aria-hidden="true" />
        <span className="pm-console__path">{proofPack.id}</span>
        <span className="p2-badge p2-badge--ceiling" style={{ marginLeft: "auto" }}>{proofPack.ceiling}</span>
      </div>

      <details className="pm-panel pm-panel--include" open>
        <summary>Included · reviewer package ({manifestIncluded.length})</summary>
        <div className="pm-panel__body">
          {manifestIncluded.map((item) => (
            <div key={item.name} className="pm-line pm-line--in">
              <span className="pm-line__mark" aria-hidden="true">+</span>
              <span>
                <span className="pm-line__name">{item.name}</span>{" "}
                <span className="pm-line__note">— {item.note}</span>
              </span>
            </div>
          ))}
        </div>
      </details>

      <details className="pm-panel pm-panel--exclude">
        <summary>Excluded · blocked from public release ({manifestExcluded.length})</summary>
        <div className="pm-panel__body">
          {manifestExcluded.map((item) => (
            <div key={item.name} className="pm-line pm-line--out">
              <span className="pm-line__mark" aria-hidden="true">−</span>
              <span>
                <span className="pm-line__name">{item.name}</span>{" "}
                <span className="pm-line__note">— {item.note}</span>
              </span>
            </div>
          ))}
        </div>
      </details>

      <details className="pm-panel pm-panel--exclude">
        <summary>Does not prove</summary>
        <div className="pm-panel__body">
          {proofPackDoesNotProve.map((line) => (
            <div key={line} className="pm-line pm-line--out">
              <span className="pm-line__mark" aria-hidden="true">⊘</span>
              <span className="pm-line__note">{line}</span>
            </div>
          ))}
        </div>
      </details>

      <div className="pm-panel__body" style={{ paddingTop: "0.8rem" }}>
        <div className="flex flex-wrap gap-2">
          {releaseRouteCaveat.badges.map((b) => (
            <span key={b} className="p2-badge">{b}</span>
          ))}
        </div>
        <p className="pm-line__note" style={{ marginTop: "0.5rem", lineHeight: 1.5 }}>
          {releaseRouteCaveat.note}
        </p>
      </div>
    </div>
  );
}
