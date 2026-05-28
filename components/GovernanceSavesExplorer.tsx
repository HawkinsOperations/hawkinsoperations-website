"use client";

import { useMemo, useState } from "react";
import {
  publicGovernanceSaves,
  governanceSavesSummary,
  governanceCategoryLabels,
  governanceCategoryDescriptions,
  type GovernanceSave,
  type GovernanceSaveCategory,
  type GovernanceSavePublicSafety,
  type GovernanceSaveOutcome,
} from "@data/governanceSaves";

type Filter = "all" | GovernanceSaveCategory;
type DetailRow = { label: string; value: string; href?: string };

const UNKNOWN_NOT_IN_SOURCE = "UNKNOWN_NOT_IN_SOURCE";

const safetyToneClass: Record<GovernanceSavePublicSafety, string> = {
  PUBLIC_BACKED: "gse__safety gse__safety--public",
  PUBLIC_BACKED_PARTIAL: "gse__safety gse__safety--partial",
  PUBLIC_SAFE_WITH_REDACTION: "gse__safety gse__safety--redaction",
  INTERNAL_REVIEW_REQUIRED: "gse__safety gse__safety--internal",
  PRIVATE_ONLY: "gse__safety gse__safety--private",
};

const safetyLabel: Record<GovernanceSavePublicSafety, string> = {
  PUBLIC_BACKED: "PUBLIC BACKED",
  PUBLIC_BACKED_PARTIAL: "PUBLIC BACKED · PARTIAL",
  PUBLIC_SAFE_WITH_REDACTION: "PUBLIC SAFE · REDACTED",
  INTERNAL_REVIEW_REQUIRED: "INTERNAL REVIEW",
  PRIVATE_ONLY: "PRIVATE ONLY",
};

const outcomeToneClass: Record<GovernanceSaveOutcome, string> = {
  BLOCKED: "gse__outcome gse__outcome--blocked",
  CORRECTED: "gse__outcome gse__outcome--corrected",
  DOWNGRADED: "gse__outcome gse__outcome--downgraded",
  DELAYED: "gse__outcome gse__outcome--delayed",
  HARDENED: "gse__outcome gse__outcome--hardened",
  DOCUMENTED: "gse__outcome gse__outcome--documented",
};

const categoryOrder: GovernanceSaveCategory[] = [
  "merge-authority",
  "claim-boundary",
  "runtime-boundary",
  "validator-hardening",
  "ai-authority",
  "branch-hygiene",
  "evidence-protection",
  "release-gate",
  "workflow-hardening",
];

function valueOrUnknown(value?: string | null) {
  return value && value.trim().length > 0 ? value : UNKNOWN_NOT_IN_SOURCE;
}

function formatCandidateDateTime(value: string) {
  if (!/[T ]\d{1,2}:\d{2}/.test(value)) return UNKNOWN_NOT_IN_SOURCE;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return UNKNOWN_NOT_IN_SOURCE;

  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getMonth() + 1)}-${pad(date.getDate())}-${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function detailRowsFor(save: GovernanceSave): DetailRow[] {
  return [
    { label: "Candidate ID", value: save.id },
    { label: "Candidate Title", value: save.title },
    { label: "Date/Time", value: formatCandidateDateTime(save.date) },
    { label: "Source Window", value: UNKNOWN_NOT_IN_SOURCE },
    { label: "Repo / Surface", value: valueOrUnknown(save.surface) },
    {
      label: "Artifact / File / PR / Check / Log Location",
      value: valueOrUnknown(save.sourceHref),
      href: save.sourceHref,
    },
    { label: "Save Type", value: valueOrUnknown(save.saveType) },
    { label: "Control That Fired", value: valueOrUnknown(save.control) },
    { label: "Where It Was Blocked / Found", value: UNKNOWN_NOT_IN_SOURCE },
    { label: "Risk Caught", value: valueOrUnknown(save.drift) },
    { label: "Failure Prevented", value: UNKNOWN_NOT_IN_SOURCE },
    { label: "Outcome", value: valueOrUnknown(save.outcome) },
    { label: "Why This Is High ROI", value: valueOrUnknown(save.matters) },
    { label: "Evidence Source", value: valueOrUnknown(save.sourceHref), href: save.sourceHref },
    { label: "Evidence Confidence", value: UNKNOWN_NOT_IN_SOURCE },
    { label: "Public Safety", value: valueOrUnknown(save.publicSafety) },
    { label: "Countability", value: UNKNOWN_NOT_IN_SOURCE },
    { label: "Website Readiness", value: UNKNOWN_NOT_IN_SOURCE },
    { label: "Follow-Up Needed", value: UNKNOWN_NOT_IN_SOURCE },
    { label: "Proof Boundary Notes", value: UNKNOWN_NOT_IN_SOURCE },
  ];
}

export default function GovernanceSavesExplorer() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const counts = useMemo(() => {
    const map: Record<Filter, number> = { all: publicGovernanceSaves.length } as Record<Filter, number>;
    for (const cat of categoryOrder) {
      map[cat] = publicGovernanceSaves.filter((s) => s.category === cat).length;
    }
    return map;
  }, []);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publicGovernanceSaves.filter((s) => {
      if (filter !== "all" && s.category !== filter) return false;
      if (!q) return true;
      return [s.id, s.title, s.surface, s.saveType, s.drift, s.control, s.matters]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [filter, query]);

  const toggle = (id: string) => setExpanded((prev) => (prev === id ? null : id));

  const activeDescription =
    filter === "all"
      ? "Each category represents a class of controls that fired across HawkinsOperations repos. Use the chips to narrow the view, or search by ID, surface, or wording."
      : governanceCategoryDescriptions[filter];

  return (
    <div className="gse">
      <div className="gse__metrics" role="group" aria-label="Governance saves at a glance">
        <article className="gse__metric">
          <p className="gse__metric-label">Range represented</p>
          <p className="gse__metric-value">{governanceSavesSummary.rangeLabel}</p>
          <p className="gse__metric-note">{governanceSavesSummary.sourceSubsetCount} source records reviewed for this website subset.</p>
        </article>
        <article className="gse__metric">
          <p className="gse__metric-label">Records on this page</p>
          <p className="gse__metric-value">{governanceSavesSummary.publicRenderedCount}</p>
          <p className="gse__metric-note">
            {governanceSavesSummary.privateOnlyCount} private-only and {governanceSavesSummary.omittedIds.length} omitted/demoted records are not rendered.
          </p>
        </article>
        <article className="gse__metric">
          <p className="gse__metric-label">Control categories</p>
          <p className="gse__metric-value">{categoryOrder.length}</p>
          <p className="gse__metric-note">Each maps to a distinct failure mode this system blocks.</p>
        </article>
        <article className="gse__metric">
          <p className="gse__metric-label">Authority above CI</p>
          <p className="gse__metric-value">Human review</p>
          <p className="gse__metric-note">Green checks never escalated to merge authority.</p>
        </article>
      </div>

      <div className="gse__controls">
        <div className="gse__chips" role="group" aria-label="Filter by category">
          <button
            type="button"
            className={`gse__chip${filter === "all" ? " gse__chip--active" : ""}`}
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All <span className="gse__chip-count">{counts.all}</span>
          </button>
          {categoryOrder.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`gse__chip${filter === cat ? " gse__chip--active" : ""}`}
              aria-pressed={filter === cat}
              onClick={() => setFilter(cat)}
            >
              {governanceCategoryLabels[cat]} <span className="gse__chip-count">{counts[cat]}</span>
            </button>
          ))}
        </div>

        <label className="gse__search">
          <span className="gse__search-label">Search</span>
          <input
            type="search"
            placeholder="Filter by ID, surface, wording…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="gse__search-input"
            aria-label="Search governance saves"
          />
        </label>
      </div>

      <p className="gse__category-note" aria-live="polite">
        {activeDescription}
      </p>

      <p className="gse__source-boundary">
        This explorer renders a public-safe/source-backed subset of the governance-saves range.
        Private-only records are excluded. Internal/local evidence is summarized only where
        public-safe wording exists, and these records are governance evidence, not production
        incident-prevention metrics.
      </p>

      <p className="gse__status" aria-live="polite">
        {shown.length} {shown.length === 1 ? "record" : "records"}
        {filter !== "all" ? ` · ${governanceCategoryLabels[filter]}` : ""}
        {query ? ` · matches “${query}”` : ""}
      </p>

      <div className="gse__grid">
        {shown.map((save) => {
          const isOpen = expanded === save.id;
          return (
            <article key={save.id} className={`gse__card${isOpen ? " gse__card--open" : ""}`}>
              <header className="gse__card-head">
                <div className="gse__card-id-row">
                  <span className="gse__card-id">{save.id}</span>
                  <span className="gse__card-date">{save.date}</span>
                </div>
                <div className="gse__card-tags">
                  <span className="gse__category">{governanceCategoryLabels[save.category]}</span>
                  <span className={outcomeToneClass[save.outcome]}>{save.outcome}</span>
                  <span className={safetyToneClass[save.publicSafety]}>{safetyLabel[save.publicSafety]}</span>
                </div>
              </header>

              <h3 className="gse__card-title">{save.title}</h3>
              <p className="gse__card-surface">{save.surface}</p>

              <button
                type="button"
                className="gse__expand"
                aria-expanded={isOpen}
                aria-controls={`gse-details-${save.id}`}
                onClick={() => toggle(save.id)}
              >
                {isOpen ? "Hide detail" : "Inspect detail"}
                <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <dl id={`gse-details-${save.id}`} className="gse__detail">
                  {detailRowsFor(save).map((row) => (
                    <div key={row.label}>
                      <dt>{row.label}</dt>
                      <dd className={row.value === UNKNOWN_NOT_IN_SOURCE ? "gse__unknown" : undefined}>
                        {row.href ? (
                          <a className="gse__source" href={row.href} target="_blank" rel="noopener noreferrer">
                            {row.value} ↗
                          </a>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </article>
          );
        })}
      </div>

      {shown.length === 0 && (
        <p className="gse__empty">No records match the current filter or search. Clear the search or pick another category.</p>
      )}
    </div>
  );
}
