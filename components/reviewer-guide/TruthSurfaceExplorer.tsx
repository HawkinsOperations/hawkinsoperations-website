"use client";

import { useState } from "react";
import {
  forbiddenSubstitutions,
  reviewerTruthSurfaces,
  type TruthSurfaceId,
} from "../../src/data/reviewerGuide";

export default function TruthSurfaceExplorer() {
  const [selectedId, setSelectedId] = useState<TruthSurfaceId>("source");
  const [showForbidden, setShowForbidden] = useState(false);
  const selected = reviewerTruthSurfaces.find((surface) => surface.id === selectedId) ?? reviewerTruthSurfaces[0];

  return (
    <div className="rg-truth">
      <div className="rg-truth__map">
        <div className="rg-truth__rail" role="group" aria-label="Truth surfaces">
          {reviewerTruthSurfaces.map((surface, index) => (
            <button
              key={surface.id}
              type="button"
              aria-pressed={selectedId === surface.id}
              aria-controls="truth-surface-inspector"
              onClick={() => setSelectedId(surface.id)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{surface.label}</strong>
              <small>{selectedId === surface.id ? "inspecting" : "separate authority"}</small>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="rg-truth__toggle"
          aria-pressed={showForbidden}
          onClick={() => setShowForbidden((current) => !current)}
        >
          <span aria-hidden="true">{showForbidden ? "−" : "+"}</span>
          {showForbidden ? "Hide forbidden substitutions" : "Show forbidden substitutions"}
        </button>
      </div>

      <aside id="truth-surface-inspector" className="rg-truth__inspector" aria-live="polite">
        <span>Truth surface</span>
        <h3>{selected.label}</h3>
        <dl>
          <div><dt>Owner</dt><dd>{selected.owner}</dd></div>
          <div><dt>Established by</dt><dd>{selected.establishedBy}</dd></div>
          <div><dt>Can support</dt><dd>{selected.supports}</dd></div>
          <div className="rg-truth__limit"><dt>Cannot support</dt><dd>{selected.cannotSupport}</dd></div>
          <div><dt>Required next evidence</dt><dd>{selected.nextEvidence}</dd></div>
        </dl>
        <a href={selected.href} target={selected.href.startsWith("http") ? "_blank" : undefined} rel={selected.href.startsWith("http") ? "noopener noreferrer" : undefined}>Inspect owning route <span aria-hidden="true">↗</span></a>
      </aside>

      {showForbidden ? (
        <div className="rg-truth__forbidden" aria-label="Forbidden truth substitutions">
          <div><span>Forbidden substitutions</span><strong>These paths do not promote automatically.</strong></div>
          <ul>
            {forbiddenSubstitutions.map((item) => (
              <li key={`${item.from}-${item.to}`}><b>{item.from}</b><span aria-hidden="true">×</span><b>{item.to}</b><small>{item.detail}</small></li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
