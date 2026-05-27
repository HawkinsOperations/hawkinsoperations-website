import {
  publicGovernanceSaves,
  governanceSavesSummary,
  governanceCategoryLabels,
  type GovernanceSaveCategory,
} from "@data/governanceSaves";

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

export default function GovernanceSavesCockpit() {
  const counts = categoryOrder.map((cat) => ({
    cat,
    label: governanceCategoryLabels[cat],
    count: publicGovernanceSaves.filter((s) => s.category === cat).length,
  }));

  return (
    <div className="gsc">
      <div className="gsc__head">
        <div>
          <p className="gsc__eyebrow">Governance Saves</p>
          <h3 className="gsc__title">
            {governanceSavesSummary.rangeLabel} · {governanceSavesSummary.publicRenderedCount} public-facing records
          </h3>
          <p className="gsc__sub">
            Website data reviewed {governanceSavesSummary.sourceSubsetCount}/{governanceSavesSummary.ledgerRangeTotal} source records; private-only and omitted/demoted rows are not rendered.
          </p>
        </div>
        <a className="gsc__cta" href="/proof/governance-saves/">
          Open explorer →
        </a>
      </div>
      <ul className="gsc__grid" role="list">
        {counts.map((c) => (
          <li key={c.cat} className="gsc__cat">
            <span className="gsc__cat-count">{c.count}</span>
            <span className="gsc__cat-label">{c.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
