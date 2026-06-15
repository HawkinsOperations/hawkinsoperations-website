"use client";

import { useMemo, useState } from "react";
import { governanceCategoryLabels, governanceSaves } from "@data/governanceSaves";
import GovernanceCategoryDistribution from "./GovernanceCategoryDistribution";
import GovernanceOpsLens from "./GovernanceOpsLens";
import GovernanceRecordSpotlight from "./GovernanceRecordSpotlight";

const categories = ["all", ...Object.keys(governanceCategoryLabels)] as const;

const lensCategoryMap: Record<string, string[]> = {
  "Claim control": ["claim-boundary", "ai-authority", "evidence-protection", "release-gate"],
  "Detection quality": ["claim-boundary", "validator-hardening"],
  "Validation hardening": ["validator-hardening", "workflow-hardening"],
  "Runtime/signal boundary": ["runtime-boundary", "evidence-protection"],
  "Merge/review authority": ["merge-authority", "branch-hygiene", "workflow-hardening"],
};

export default function GovernanceIntelDashboard() {
  const [category, setCategory] = useState<(typeof categories)[number]>("all");
  const [query, setQuery] = useState("");
  const [lens, setLens] = useState("Claim control");
  const [activeId, setActiveId] = useState(governanceSaves[0]?.id ?? "");

  const filtered = useMemo(() => {
    const lensCategories = lensCategoryMap[lens] ?? [];
    return governanceSaves.filter((record) => {
      const matchesCategory = category === "all" || record.category === category;
      const matchesLens = lensCategories.length === 0 || lensCategories.includes(record.category);
      const haystack = `${record.id} ${record.title} ${record.drift} ${record.control} ${record.matters}`.toLowerCase();
      return matchesCategory && matchesLens && haystack.includes(query.toLowerCase());
    });
  }, [category, lens, query]);

  const active = filtered.find((record) => record.id === activeId) ?? filtered[0] ?? governanceSaves[0];

  return (
    <section className="governance-intel" aria-labelledby="governance-intel-title">
      <div className="governance-intel__hero">
        <div>
          <p className="cockpit-eyebrow">Governance Saves Control Dashboard</p>
          <h2 id="governance-intel-title">72 unverified claims blocked before bad truth shipped.</h2>
          <p>
            This dashboard is the public control-intelligence view: category distribution, ops lens,
            searchable records, selected save, and the exact control that fired.
          </p>
        </div>
        <div className="governance-intel__counter">
          <strong>72</strong>
          <span>controls fired</span>
          <small>public-facing records</small>
        </div>
      </div>
      <GovernanceOpsLens active={lens} onChange={setLens} />
      <div className="governance-intel__controls">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search records, controls, drift..."
          aria-label="Search Governance Saves"
        />
        <select value={category} onChange={(event) => setCategory(event.target.value as (typeof categories)[number])} aria-label="Filter Governance Saves by category">
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All categories" : governanceCategoryLabels[item as keyof typeof governanceCategoryLabels]}
            </option>
          ))}
        </select>
      </div>
      <div className="governance-intel__grid">
        <GovernanceCategoryDistribution />
        {active && <GovernanceRecordSpotlight record={active} />}
        <div className="governance-intel__records" aria-label="Governance save records">
          {filtered.slice(0, 12).map((record) => (
            <button key={record.id} type="button" className={active?.id === record.id ? "is-active" : ""} onClick={() => setActiveId(record.id)}>
              <span>{record.id}</span>
              <strong>{record.title}</strong>
              <small>{record.outcome} · {governanceCategoryLabels[record.category]}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

