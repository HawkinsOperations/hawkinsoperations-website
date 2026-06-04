"use client";

import { useId, useState } from "react";

/**
 * ArtifactCoverageHeatmap
 *
 * An interactive visual layer over the existing artifact-family coverage data.
 * Each family is a full-card button that selects a detail panel describing its
 * coverage across planes. Color is never the sole signal — every cell shows its
 * textual value, and the canonical table remains below as the list fallback.
 *
 * Data mirrors the public coverage matrix already on this page (coverage state,
 * not proof). No claims are promoted; private/blocked states stay visible.
 */

const planes = ["Source", "Validation", "Proof", "Website", "Private evidence", "Public status"] as const;

interface CoverageRow {
  family: string;
  cells: string[];
  summary: string;
}

const rows: CoverageRow[] = [
  { family: "HO-DET-001 proof loop", cells: ["present", "present", "present", "routed", "—", "controlled-test"], summary: "Source, validation, and proof routes are public; the website routes to the receipt. Claim ceiling remains controlled-test." },
  { family: "Proof Pack 001", cells: ["present", "present", "routed", "routed", "—", "reviewer-routed"], summary: "Proof Pack route available as a bounded reviewer package with release, manifest, hash, and verifier routing. It does not promote runtime or public-safe runtime proof." },
  { family: "HO-DET-001 detection source", cells: ["present", "present", "routed", "routed", "—", "controlled-test"], summary: "Detection source and validation exist publicly; proof and website route to them at controlled-test scope." },
  { family: "Validation CI / report", cells: ["present", "present", "routed", "routed", "—", "present"], summary: "Validation output is public and routed from proof and website surfaces." },
  { family: "Backend adapter · field mapping", cells: ["private", "private", "—", "reference", "private", "blocked"], summary: "Held in private/internal evidence; the website references it only. Public claim is blocked until a promotion gate clears." },
  { family: "AI support · GPU support", cells: ["private", "private", "—", "—", "private", "blocked"], summary: "Private/internal support material. Not routed publicly; public claim is blocked by design." },
  { family: "NDR · Security Onion record", cells: ["private", "—", "reference", "reference", "private", "unpublished"], summary: "Private NDR evidence, referenced but unpublished. Not promoted to public proof." },
  { family: "Cyber Kill Chain / ATT&CK reviewer map", cells: ["present", "present", "routed", "routed", "—", "rendering"], summary: "Public reviewer map across source and validation; the website renders the routing only." },
  { family: "Governance · review authority", cells: ["present", "present", "routed", "routed", "—", "present"], summary: "Governance and review-authority artifacts are public and routed across surfaces." },
  { family: "Website proof routing", cells: ["present", "present", "routed", "routed", "—", "rendering"], summary: "Website routing surfaces are public; the website renders routes, it does not author proof." },
];

const toneFor = (value: string): string => {
  switch (value) {
    case "present": return "ok";
    case "controlled-test": return "ceiling";
    case "routed": return "route";
    case "private": return "private";
    case "reference": return "ref";
    case "unpublished": return "ref";
    case "reviewer-routed": return "route";
    case "pending": return "pending";
    case "blocked": return "block";
    case "rendering": return "neutral";
    default: return "none";
  }
};

export default function ArtifactCoverageHeatmap() {
  const [active, setActive] = useState(0);
  const titleId = useId();
  const selected = rows[active];

  return (
    <div className="ach" aria-labelledby={titleId}>
      <div className="ach__head">
        <p className="cockpit-eyebrow">Coverage heatmap</p>
        <h3 id={titleId} className="ach__title">Family coverage at a glance.</h3>
        <p className="ach__sub">
          Select a family to read its coverage across planes. Cells show where each
          family exists in public, where the website routes, and what stays private
          or blocked. The matrix below holds the same data as a table.
        </p>
      </div>

      <div className="ach__stage">
        <div className="ach__grid" role="group" aria-label="Artifact family coverage selector">
          <div className="ach__col-head" aria-hidden="true">
            <span className="ach__col-family" />
            {planes.map((p) => (
              <span key={p} className="ach__col-label">{p}</span>
            ))}
          </div>
          {rows.map((row, i) => {
            const isActive = i === active;
            return (
              <button
                key={row.family}
                type="button"
                aria-pressed={isActive}
                className={`ach__row${isActive ? " is-active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="ach__row-family">{row.family}</span>
                {row.cells.map((value, ci) => (
                  <span
                    key={ci}
                    className={`ach__cell ach__cell--${toneFor(value)}`}
                    data-value={value}
                    title={`${planes[ci]}: ${value}`}
                  >
                    <span className="ach__cell-text">{value}</span>
                  </span>
                ))}
              </button>
            );
          })}
        </div>

        <aside className="ach__detail" aria-live="polite">
          <p className="ach__detail-eyebrow">Family</p>
          <h4 className="ach__detail-title">{selected.family}</h4>
          <p className="ach__detail-summary">{selected.summary}</p>
          <dl className="ach__detail-cells">
            {planes.map((p, i) => (
              <div key={p} className="ach__detail-cell">
                <dt>{p}</dt>
                <dd className={`ach__detail-tag ach__detail-tag--${toneFor(selected.cells[i])}`}>
                  {selected.cells[i]}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </div>
  );
}
