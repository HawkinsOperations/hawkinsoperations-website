"use client";

import { useMemo, useState } from "react";
import {
  governanceCategoryLabels,
  publicGovernanceSaves,
  type GovernanceSave,
  type GovernanceSaveCategory,
  type GovernanceSaveOutcome,
} from "@data/governanceSaves";
import { governanceCategoryCounts } from "./GovernanceCategoryChart";

type Filter = "all" | GovernanceSaveCategory;
type View = "grid" | "table";
type OutcomeFilter = "all" | GovernanceSaveOutcome | "not_measured";

const outcomeLabels: OutcomeFilter[] = ["all", "BLOCKED", "DOWNGRADED", "HARDENED", "CORRECTED", "DOCUMENTED", "DELAYED", "not_measured"];

function outcomeClass(outcome: GovernanceSaveOutcome) {
  return `gov-outcome gov-outcome--${outcome.toLowerCase()}`;
}

function saveText(save: GovernanceSave) {
  return [save.id, save.title, save.surface, save.saveType, save.outcome, save.drift, save.control, save.matters]
    .join(" ")
    .toLowerCase();
}

export default function GovernanceSaveRecordExplorer() {
  const [category, setCategory] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>("grid");
  const [outcome, setOutcome] = useState<OutcomeFilter>("all");
  const [activeId, setActiveId] = useState(publicGovernanceSaves[0]?.id ?? "");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publicGovernanceSaves.filter((save) => {
      if (category !== "all" && save.category !== category) return false;
      if (outcome !== "all" && outcome !== "not_measured" && save.outcome !== outcome) return false;
      if (outcome === "not_measured") return false;
      if (q && !saveText(save).includes(q)) return false;
      return true;
    });
  }, [category, outcome, query]);

  const active = shown.find((save) => save.id === activeId) ?? shown[0] ?? publicGovernanceSaves[0];

  return (
    <section className="gov-explorer" aria-label="Governance Saves record explorer">
      <div className="gov-explorer__toolbar">
        <div className="gov-explorer__chips" role="group" aria-label="Governance Saves category filter">
          <button type="button" className={category === "all" ? "is-active" : ""} onClick={() => setCategory("all")}>
            All <span>{publicGovernanceSaves.length}</span>
          </button>
          {governanceCategoryCounts.map((item) => (
            <button
              key={item.key}
              type="button"
              className={category === item.key ? "is-active" : ""}
              onClick={() => setCategory(item.key)}
            >
              {governanceCategoryLabels[item.key]} <span>{item.count}</span>
            </button>
          ))}
        </div>
        <div className="gov-explorer__tools">
          <label>
            <span>Search</span>
            <input
              value={query}
              type="search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ID, surface, drift, control..."
            />
          </label>
          <div className="gov-explorer__segmented" role="group" aria-label="Explorer view toggle">
            {(["grid", "table"] as const).map((item) => (
              <button key={item} type="button" className={view === item ? "is-active" : ""} onClick={() => setView(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="gov-explorer__outcomes" role="group" aria-label="Governance outcome toggle">
        {outcomeLabels.map((item) => (
          <button
            key={item}
            type="button"
            className={outcome === item ? "is-active" : ""}
            onClick={() => setOutcome(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="gov-explorer__status" aria-live="polite">
        {shown.length} records visible. Outcome counts are source labels; impact totals are not_measured unless explicitly present in source.
      </p>

      {active && (
        <article className="gov-spotlight">
          <div>
            <p className="cockpit-eyebrow">Representative record spotlight</p>
            <h3>{active.id}: {active.title}</h3>
            <p>{active.surface}</p>
          </div>
          <div className="gov-spotlight__panels">
            <section>
              <span>Risk prevented</span>
              <p>{active.drift}</p>
            </section>
            <section>
              <span>Control that fired</span>
              <p>{active.control}</p>
            </section>
            <section>
              <span>What changed</span>
              <p>{active.matters}</p>
            </section>
          </div>
        </article>
      )}

      {view === "grid" ? (
        <div className="gov-record-grid">
          {shown.map((save) => (
            <button
              key={save.id}
              type="button"
              className={`gov-record ${active?.id === save.id ? "is-active" : ""}`}
              onClick={() => setActiveId(save.id)}
            >
              <span>{save.id}</span>
              <strong>{save.title}</strong>
              <small>{governanceCategoryLabels[save.category]} · {save.surface}</small>
              <em className={outcomeClass(save.outcome)}>{save.outcome}</em>
            </button>
          ))}
        </div>
      ) : (
        <div className="gov-table" role="table" aria-label="Governance Saves table">
          <div className="gov-table__row gov-table__row--head" role="row">
            <span>ID</span>
            <span>Category</span>
            <span>Outcome</span>
            <span>Surface</span>
            <span>Control</span>
          </div>
          {shown.map((save) => (
            <button key={save.id} type="button" className="gov-table__row" onClick={() => setActiveId(save.id)} role="row">
              <span>{save.id}</span>
              <span>{governanceCategoryLabels[save.category]}</span>
              <span>{save.outcome}</span>
              <span>{save.surface}</span>
              <span>{save.control}</span>
            </button>
          ))}
        </div>
      )}

      {shown.length === 0 && <p className="gov-explorer__empty">No source-backed public records match this filter.</p>}
    </section>
  );
}
