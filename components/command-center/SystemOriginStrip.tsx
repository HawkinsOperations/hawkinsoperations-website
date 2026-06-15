"use client";

import { useState } from "react";

const modes = {
  v1: {
    title: "V1 proved the builder energy.",
    detail:
      "HawkinsOps V1 carried the pipeline, inventory, MITRE coverage, and verification-terminal feel as a historical closed surface.",
    metrics: ["324,074 historical cases", "211 historical artifacts", "~88% historical auto-close", "8/8 historical host coverage"],
  },
  v2: {
    title: "V2 separates authority.",
    detail:
      "HawkinsOperations splits source, validation, platform, proof, Hoxline, governance routing, and website rendering so claims cannot outrun evidence.",
    metrics: ["72 controls fired", "49 validation fires", "106 validation cases", "31 blocked claims"],
  },
};

export default function SystemOriginStrip() {
  const [mode, setMode] = useState<"v1" | "v2">("v2");
  const current = modes[mode];

  return (
    <section className="system-origin-strip" aria-labelledby="system-origin-title">
      <div>
        <p className="cockpit-eyebrow">V1 to V2 evolution hall</p>
        <h2 id="system-origin-title">{current.title}</h2>
        <p>{current.detail}</p>
      </div>
      <div className="system-origin-strip__toggle">
        <button type="button" className={mode === "v1" ? "is-active" : ""} onClick={() => setMode("v1")}>
          V1 archive
        </button>
        <button type="button" className={mode === "v2" ? "is-active" : ""} onClick={() => setMode("v2")}>
          V2 current system
        </button>
      </div>
      <div className="system-origin-strip__metrics">
        {current.metrics.map((metric) => (
          <span key={metric}>{metric}</span>
        ))}
      </div>
    </section>
  );
}
