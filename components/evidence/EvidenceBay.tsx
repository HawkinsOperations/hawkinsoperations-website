"use client";

import { useMemo, useState } from "react";
import { artifactCategories, artifacts, type ArtifactCategory } from "@data/artifacts";
import { proofRecords } from "@data/proofRecords";

type Filter = "all" | ArtifactCategory;

export default function EvidenceBayScene() {
  const [filter, setFilter] = useState<Filter>("all");

  const shown = useMemo(() => (filter === "all" ? artifacts : artifacts.filter((artifact) => artifact.category === filter)), [filter]);
  const proofRecordCount = proofRecords.filter((record) => record.proofRecordState === "PROOF_RECORD_PRESENT").length;

  return (
    <section className="evidence-scene" aria-label="Evidence Bay and receipt wall">
      <div className="evidence-scene__hero">
        <div>
          <p className="cockpit-eyebrow">Evidence Bay</p>
          <h2>Receipts live here. Claims do not get to float free.</h2>
          <p>
            Artifact cards route reviewers from public rendering back to source, validation, proof,
            and authority surfaces. The wall is searchable by family and keeps proof ceilings attached.
          </p>
        </div>
        <aside>
          <strong>{artifacts.length}</strong>
          <span>reviewer artifacts</span>
          <small>{proofRecordCount} proof-record-present rows</small>
        </aside>
      </div>

      <div className="evidence-scene__filters" role="group" aria-label="Artifact wall filter">
        <button type="button" className={filter === "all" ? "is-active" : ""} onClick={() => setFilter("all")}>All</button>
        {artifactCategories.map((category) => (
          <button key={category.key} type="button" className={filter === category.key ? "is-active" : ""} onClick={() => setFilter(category.key)}>
            {category.label}
          </button>
        ))}
      </div>

      <div className="receipt-wall">
        {shown.slice(0, 18).map((artifact) => {
          const external = artifact.primary.external === true;
          return (
            <a
              key={artifact.slug}
              className={`receipt-wall__card receipt-wall__card--${artifact.status}`}
              href={artifact.primary.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              <span>{artifact.category}</span>
              <strong>{artifact.title}</strong>
              <p>{artifact.truthSurface}</p>
              <small>{artifact.proofCeiling ?? "rendering/reference boundary"}</small>
            </a>
          );
        })}
      </div>

      <div className="evidence-route-map" aria-label="Artifact relationship map">
        {["artifact", "source", "validation", "proof", "website render"].map((node) => (
          <span key={node}>{node}</span>
        ))}
      </div>
    </section>
  );
}
