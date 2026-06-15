"use client";

import { useMemo, useState } from "react";
import { artifactCategories, artifacts } from "@data/artifacts";
import EvidenceRouteMap from "./EvidenceRouteMap";

const filters = ["all", ...artifactCategories.map((item) => item.key)] as const;

export default function ArtifactReceiptWall() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const visible = useMemo(() => (filter === "all" ? artifacts : artifacts.filter((artifact) => artifact.category === filter)), [filter]);

  return (
    <section className="artifact-receipt-wall" aria-labelledby="artifact-receipt-wall-title">
      <div className="artifact-receipt-wall__head">
        <p className="cockpit-eyebrow">Artifact Receipt Wall</p>
        <h2 id="artifact-receipt-wall-title">Receipts first. Claims second. Rendering last.</h2>
        <p>
          Every artifact card is a reviewer route: what it supports, what it does not prove, where it
          lives, and how it connects to the source-validation-proof chain.
        </p>
      </div>
      <EvidenceRouteMap />
      <div className="artifact-receipt-wall__filters" aria-label="Artifact filters">
        {filters.map((item) => (
          <button key={item} type="button" className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>
            {item === "all" ? "all" : artifactCategories.find((category) => category.key === item)?.label ?? item}
          </button>
        ))}
      </div>
      <div className="artifact-receipt-wall__grid">
        {visible.slice(0, 9).map((artifact) => (
          <a key={artifact.slug} href={artifact.primary.href} className="artifact-receipt">
            <span>{artifact.truthSurface}</span>
            <strong>{artifact.title}</strong>
            <p>{artifact.proves}</p>
            <small>{artifact.doesNotProve}</small>
          </a>
        ))}
      </div>
    </section>
  );
}

