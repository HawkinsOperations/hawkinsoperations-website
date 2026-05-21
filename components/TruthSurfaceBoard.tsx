"use client";

import { useState, type KeyboardEvent } from "react";
import { truthSurfaces } from "@config/truth-surfaces";

/**
 * TruthSurfaceBoard
 *
 * Interactive control board for the six truth surfaces. Selecting a surface
 * (click / focus / arrow keys) updates one detail panel: what it proves, what
 * it does not prove, what promotes it, what blocks it, an example artifact,
 * and the related repo. Reuses config/truth-surfaces.ts only.
 */
export default function TruthSurfaceBoard() {
  const [activeSlug, setActiveSlug] = useState(truthSurfaces[0]?.slug ?? "");
  const total = truthSurfaces.length;
  const active = Math.max(
    truthSurfaces.findIndex((surface) => surface.slug === activeSlug),
    0,
  );
  const s = truthSurfaces[active];

  const setActiveByIndex = (index: number) => {
    setActiveSlug(truthSurfaces[index].slug);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActiveByIndex((active + 1) % total);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveByIndex((active - 1 + total) % total);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveByIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveByIndex(total - 1);
    }
  };

  return (
    <div className="tsb">
      <div
        className="tsb__list"
        role="tablist"
        aria-label="Truth surfaces"
        aria-orientation="vertical"
      >
        {truthSurfaces.map((surface, i) => {
          const isActive = i === active;
          return (
            <button
              key={surface.slug}
              type="button"
              role="tab"
              id={`tsb-tab-${surface.slug}`}
              aria-selected={isActive}
              aria-controls="tsb-panel"
              tabIndex={isActive ? 0 : -1}
              className={`tsb__item${isActive ? " tsb__item--active" : ""}`}
              onClick={() => setActiveSlug(surface.slug)}
              onFocus={() => setActiveSlug(surface.slug)}
              onMouseEnter={() => setActiveSlug(surface.slug)}
              onKeyDown={handleKeyDown}
            >
              <span className="tsb__item-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="tsb__item-name">{surface.name}</span>
              <span className="tsb__item-loc">{surface.location}</span>
            </button>
          );
        })}
      </div>

      <div
        className="tsb__panel"
        id="tsb-panel"
        role="tabpanel"
        aria-labelledby={`tsb-tab-${s.slug}`}
        tabIndex={0}
      >
        <div className="tsb__panel-head">
          <span className="tsb__panel-eyebrow">Surface {String(active + 1).padStart(2, "0")} / {total}</span>
          <h3 className="tsb__panel-title">{s.name}</h3>
          <span className="tsb__panel-repo">{s.location}</span>
        </div>

        <dl className="tsb__facts">
          <div className="tsb__fact">
            <dt>What it proves</dt>
            <dd>{s.proves}</dd>
          </div>
          <div className="tsb__fact tsb__fact--blocked">
            <dt>What it does not prove</dt>
            <dd>{s.doesNotProve}</dd>
          </div>
          <div className="tsb__fact">
            <dt>Promoted by</dt>
            <dd>{s.promotesBy}</dd>
          </div>
          <div className="tsb__fact tsb__fact--blocked">
            <dt>Blocked by</dt>
            <dd>{s.blockedBy}</dd>
          </div>
        </dl>

        {s.exampleArtifact && (
          <a
            className="tsb__example"
            href={s.exampleArtifact.href}
            target={s.exampleArtifact.external ? "_blank" : undefined}
            rel={s.exampleArtifact.external ? "noopener noreferrer" : undefined}
          >
            <span className="tsb__example-label">Example artifact</span>
            <span className="tsb__example-value">
              {s.exampleArtifact.label} {s.exampleArtifact.external ? "↗" : "→"}
            </span>
          </a>
        )}
      </div>
    </div>
  );
}
