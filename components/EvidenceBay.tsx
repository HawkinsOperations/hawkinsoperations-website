"use client";

import { useState } from "react";
import {
  artifacts,
  artifactCategories,
  type Artifact,
  type ArtifactCategory,
} from "@data/artifacts";

const statusLabel = (status: Artifact["status"]): string => {
  switch (status) {
    case "supported": return "SUPPORTED";
    case "rendering-only": return "RENDERING ONLY";
    case "reference": return "REFERENCE";
    case "blocked-pending-promotion": return "BLOCKED · PENDING";
    default: return String(status).toUpperCase();
  }
};

const catShort: Record<ArtifactCategory, string> = {
  "proof-record": "PROOF RECORD",
  "case-study": "CASE STUDY",
  validation: "VALIDATION",
  "ci-verifier": "CI / VERIFIER",
  architecture: "ARCHITECTURE",
  governance: "GOVERNANCE",
  "public-packet": "PUBLIC PACKET",
  "field-note": "FIELD NOTE",
  legacy: "LEGACY",
};

type Filter = "all" | ArtifactCategory;

export default function EvidenceBay() {
  const [filter, setFilter] = useState<Filter>("all");

  const shown = filter === "all" ? artifacts : artifacts.filter((a) => a.category === filter);
  const countFor = (key: Filter) =>
    key === "all" ? artifacts.length : artifacts.filter((a) => a.category === key).length;

  return (
    <div className="evbay">
      <div className="evbay__chips" role="group" aria-label="Filter artifacts by family">
        <button
          type="button"
          className={`evbay__chip${filter === "all" ? " evbay__chip--active" : ""}`}
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
        >
          All <span className="evbay__chip-count">{countFor("all")}</span>
        </button>
        {artifactCategories.map((cat) => (
          <button
            key={cat.key}
            type="button"
            className={`evbay__chip${filter === cat.key ? " evbay__chip--active" : ""}`}
            aria-pressed={filter === cat.key}
            onClick={() => setFilter(cat.key)}
          >
            {cat.label} <span className="evbay__chip-count">{countFor(cat.key)}</span>
          </button>
        ))}
      </div>

      <p className="evbay__status" aria-live="polite">
        {shown.length} {shown.length === 1 ? "artifact" : "artifacts"}
        {filter !== "all" ? ` · ${catShort[filter]}` : " · all families"}
      </p>

      <div className="evbay__grid">
        {shown.map((a) => {
          const isExternal = a.primary.external === true;
          const blocked = a.status === "blocked-pending-promotion";
          return (
            <article key={a.slug} className={`evbay__card${blocked ? " evbay__card--blocked" : ""}`}>
              <header className="evbay__card-head">
                <span className="evbay__card-cat">{catShort[a.category]}</span>
                <span className={`evbay__card-state${blocked ? " evbay__card-state--blocked" : ""}`}>
                  {statusLabel(a.status)}
                </span>
              </header>

              <h3 className="evbay__card-title">{a.title}</h3>

              <div className="evbay__card-rail" aria-hidden="true">
                <span className="evbay__card-pill">{a.truthSurface}</span>
                {a.proofCeiling && <span className="evbay__card-pill evbay__card-pill--ceiling">{a.proofCeiling}</span>}
              </div>

              <dl className="evbay__facts">
                <div>
                  <dt>Supports</dt>
                  <dd>{a.proves}</dd>
                </div>
                <div className="evbay__fact--blocked">
                  <dt>Does not prove</dt>
                  <dd>{a.doesNotProve}</dd>
                </div>
              </dl>

              {(a.sourceRoute || a.publicSafeStatus || a.reviewerAction || a.relatedSurface || a.proofBoundaryNote) && (
                <dl className="evbay__review-fields" aria-label={`${a.title} reviewer fields`}>
                  <div>
                    <dt>Source route</dt>
                    <dd>
                      {a.sourceRoute ? (
                        <a
                          href={a.sourceRoute.href}
                          target={a.sourceRoute.external ? "_blank" : undefined}
                          rel={a.sourceRoute.external ? "noopener noreferrer" : undefined}
                        >
                          {a.sourceRoute.label} {a.sourceRoute.external ? "↗" : "→"}
                        </a>
                      ) : (
                        "UNKNOWN_NOT_IN_SOURCE"
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>Public-safe status</dt>
                    <dd>{a.publicSafeStatus ?? "UNKNOWN_NOT_IN_SOURCE"}</dd>
                  </div>
                  <div>
                    <dt>Reviewer action</dt>
                    <dd>{a.reviewerAction ?? "UNKNOWN_NOT_IN_SOURCE"}</dd>
                  </div>
                  <div>
                    <dt>Related surface / repo</dt>
                    <dd>{a.relatedSurface ?? "UNKNOWN_NOT_IN_SOURCE"}</dd>
                  </div>
                  <div>
                    <dt>Proof boundary note</dt>
                    <dd>{a.proofBoundaryNote ?? "UNKNOWN_NOT_IN_SOURCE"}</dd>
                  </div>
                </dl>
              )}

              <a
                className="evbay__inspect"
                href={a.primary.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
              >
                {a.primary.label} {isExternal ? "↗" : "→"}
              </a>
            </article>
          );
        })}
      </div>
    </div>
  );
}
