"use client";

import { useState } from "react";

const modes = {
  v1: {
    label: "V1 archive energy",
    title: "Pipeline density, inventory, and verification terminal force.",
    stats: ["324,074 historical cases", "211 historical artifacts/rules", "~88% historical auto-close", "8/8 historical host coverage"],
    note: "Historical V1 context only. These values do not become current HawkinsOperations proof.",
  },
  v2: {
    label: "V2 current system",
    title: "Proof-governed AI security operations with separated authority surfaces.",
    stats: ["Hoxline control plane", "72 public-facing controls fired", "8 proof records", "0 public-safe promotions"],
    note: "Current public truth is governed by proof records, validation, claim boundaries, and human review.",
  },
};

export default function V1ToV2EvolutionStrip() {
  const [mode, setMode] = useState<keyof typeof modes>("v2");
  const active = modes[mode];

  return (
    <section className="cc-evolution" aria-label="V1 to V2 evolution strip">
      <div className="cc-evolution__controls" role="tablist" aria-label="Evolution comparison">
        {Object.entries(modes).map(([key, value]) => (
          <button
            key={key}
            type="button"
            className={mode === key ? "is-active" : ""}
            onClick={() => setMode(key as keyof typeof modes)}
            aria-pressed={mode === key}
          >
            {value.label}
          </button>
        ))}
      </div>
      <div className="cc-evolution__panel">
        <p className="cockpit-eyebrow">{active.label}</p>
        <h2>{active.title}</h2>
        <div className="cc-evolution__stats">
          {active.stats.map((stat) => (
            <span key={stat}>{stat}</span>
          ))}
        </div>
        <p>{active.note}</p>
      </div>
    </section>
  );
}
