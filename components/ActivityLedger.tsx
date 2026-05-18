/**
 * ActivityLedger
 *
 * Hand-maintained static snapshot of recent governed work in the
 * HawkinsOperations organization. NOT live. NOT auto-updated. NO fetch,
 * no useEffect, no GitHub API call, no build-time scraping.
 *
 * Claim contract:
 *  - Snapshot date is explicit in the header.
 *  - Every row uses one of five bounded class labels.
 *  - No row claims runtime-active, signal-observed, public-safe runtime
 *    proof, GPU CI proven, model execution in CI, AI-approved
 *    disposition, or analyst-approved disposition.
 *  - Local GPU Triage rows use GOVERNED_LABOR or RECEIPT_EMITTED only.
 */

import {
  activityLedger,
  activityLedgerSnapshotDate,
  type ActivityClass,
} from "@data/activityLedger";

const classChip: Record<ActivityClass, { label: string; cls: string }> = {
  DOCS_ARTIFACT:     { label: "DOCS_ARTIFACT",     cls: "ledger-class ledger-class--docs" },
  MERGED_PR:         { label: "MERGED_PR",         cls: "ledger-class ledger-class--merged" },
  GOVERNED_LABOR:    { label: "GOVERNED_LABOR",    cls: "ledger-class ledger-class--labor" },
  VERIFIER_HARDENED: { label: "VERIFIER_HARDENED", cls: "ledger-class ledger-class--verifier" },
  RECEIPT_EMITTED:   { label: "RECEIPT_EMITTED",   cls: "ledger-class ledger-class--receipt" },
};

export default function ActivityLedger() {
  return (
    <section className="activity-ledger" aria-labelledby="activity-ledger-title">
      <header className="activity-ledger__head">
        <div>
          <p className="activity-ledger__eyebrow">
            Recent governed work · Snapshot as of {activityLedgerSnapshotDate}
          </p>
          <h2 id="activity-ledger__title" className="activity-ledger__title">
            Bounded snapshot of recently merged work — not a live dashboard.
          </h2>
          <p className="activity-ledger__sub">
            Hand-maintained snapshot of recently merged work across the HawkinsOperations organization.
            This list is not auto-updated and does not claim runtime-active, signal-observed, public-safe
            runtime proof, GPU CI proven, model execution in CI, AI-approved disposition, or
            analyst-approved disposition. Claims remain bounded by the public ceiling
            CONTROLLED_TEST_VALIDATED. Website rendering is not proof.
          </p>
        </div>
        <span className="activity-ledger__snapshot">SNAPSHOT · {activityLedgerSnapshotDate}</span>
      </header>

      <ul className="activity-ledger__list" role="list">
        {activityLedger.map((row) => {
          const chip = classChip[row.class];
          return (
            <li key={`${row.repo}-${row.pr}`} className="ledger-row">
              <span className="ledger-row__date">{row.date}</span>
              <span className="ledger-row__repo" title={`${row.repo} · PR #${row.pr}`}>
                {row.repo.replace(/^hawkinsoperations-/, "")} · #{row.pr}
              </span>
              <span className={chip.cls}>{chip.label}</span>
              <span className="ledger-row__title">{row.title}</span>
              <a
                className="ledger-row__open"
                href={row.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${row.repo} pull request ${row.pr} on GitHub (new tab)`}
              >
                Open ↗
              </a>
            </li>
          );
        })}
      </ul>

      <footer className="activity-ledger__foot">
        <span className="activity-ledger__foot-note">
          Snapshot scope: governed labor and reviewed merges. Not auto-updated. Does not claim
          runtime, signal, or public-safe state.
        </span>
        <a
          className="cta cta-quiet"
          href="https://github.com/HawkinsOperations"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open the org ↗
        </a>
      </footer>
    </section>
  );
}
