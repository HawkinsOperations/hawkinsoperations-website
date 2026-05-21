"use client";

/**
 * ValidationRegistryDashboard
 *
 * Contract-enforced, human-review-gated validation registry. Compact
 * counters, family filters, proof-ceiling / caveat badges, and an
 * expandable boundary drawer per package. Renders src/data/validationRegistry.ts.
 * Website rendering is not proof.
 */

import { useState } from "react";
import BoundaryDrawer from "@components/BoundaryDrawer";
import {
  validationRows,
  validationFamilies,
  registryStats,
  type ValidationFamily,
} from "@data/validationRegistry";

type Filter = "All" | ValidationFamily;

const badgeClass: Record<string, string> = {
  ceiling: "p2-badge p2-badge--ceiling",
  block: "p2-badge p2-badge--block",
  drift: "p2-badge p2-badge--drift",
  warn: "p2-badge p2-badge--warn",
};

export default function ValidationRegistryDashboard() {
  const [filter, setFilter] = useState<Filter>("All");
  const rows = filter === "All" ? validationRows : validationRows.filter((r) => r.family === filter);
  const filters: Filter[] = ["All", ...validationFamilies];

  return (
    <div className="reveal reveal--up" aria-label="Validation registry dashboard">
      <p className="muted mb-5 max-w-3xl text-sm leading-6">
        The validation registry is contract-enforced and human-review gated. It records
        controlled-test packages, verifier routes, and blocked runtime / signal / public-safe states.
      </p>

      <div className="vr-stats" aria-label="Registry totals">
        <div className="vr-stat">
          <span className="vr-stat__value mono">{registryStats.totalFixtures}</span>
          <span className="vr-stat__label">total fixtures</span>
        </div>
        <div className="vr-stat">
          <span className="vr-stat__value mono">{registryStats.passedPackages}</span>
          <span className="vr-stat__label">passed packages</span>
        </div>
        <div className="vr-stat">
          <span className="vr-stat__value mono">{registryStats.noProofRecordRows}</span>
          <span className="vr-stat__label">no-proof-record rows</span>
        </div>
        <div className="vr-stat">
          <span className="vr-stat__value mono">{registryStats.contractOnlyRows}</span>
          <span className="vr-stat__label">contract-only rows</span>
        </div>
        <div className="vr-stat">
          <span className="vr-stat__value vr-stat__value--block mono">{registryStats.publicRuntimeBlockedRows}</span>
          <span className="vr-stat__label">public-runtime blocked</span>
        </div>
      </div>

      <div className="vr-filters" role="group" aria-label="Family filters">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className="vr-filter"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="vr-rows">
        {rows.map((row) => (
          <article
            key={row.id}
            className="vr-row"
            data-detection-id={row.id}
            data-no-proof={row.noProofRecord}
            data-contract-only={row.contractOnly}
          >
            <div className="vr-row__head">
              <div>
                <span className="vr-row__id">{row.id}</span>
                <span className="vr-row__fam">{row.family}</span>
              </div>
              <div>
                <span className="vr-row__name">{row.name}</span>
                <div className="vr-row__counts">
                  {row.fixtures ? (
                    <>
                      <span className="vr-count">total {row.fixtures.total}</span>
                      <span className="vr-count">pos {row.fixtures.positive}</span>
                      <span className="vr-count">neg {row.fixtures.negative}</span>
                      <span className="vr-count vr-count--zero">missed {row.fixtures.missed}</span>
                      <span className="vr-count vr-count--zero">fp-neg {row.fixtures.falsePositiveNegatives}</span>
                    </>
                  ) : (
                    <span className="vr-count">no fixtures · contract sample</span>
                  )}
                </div>
              </div>
              <div className="vr-row__badges">
                {row.badges.map((b) => (
                  <span key={b.label} className={badgeClass[b.tone]}>{b.label}</span>
                ))}
              </div>
            </div>
            {row.copyBoundary && (
              <p className="px-4 pb-1 text-xs leading-5" style={{ color: "var(--ceiling-amber)" }}>
                {row.copyBoundary}
              </p>
            )}
            <BoundaryDrawer
              className="vr-row__drawer"
              summary={`Inspect · ${row.id}`}
              exists={row.exists}
              proves={row.proves}
              doesNotProve={row.doesNotProve}
            />
          </article>
        ))}
      </div>
    </div>
  );
}
