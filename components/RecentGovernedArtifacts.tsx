import {
  recentGovernedArtifacts,
  recentGovernedArtifactsSnapshotDate,
  type RecentArtifactClass,
  type RecentArtifactSurface,
  type RecentGovernedArtifact,
} from "@data/recentGovernedArtifacts";

/**
 * RecentGovernedArtifacts
 *
 * Card grid of recent governed work artifacts. Each card links to the
 * artifact detail page at /artifacts/<slug>/ and to the upstream PR.
 *
 * Claim contract:
 *  - Hand-maintained static snapshot; no fetch, no useEffect, no GitHub
 *    API call.
 *  - Class chips use the five literals from the Activity Ledger plus
 *    PUBLIC_RENDERING_UPDATE for the active website PR. No row claims
 *    runtime-active, signal-observed, or public-safe runtime proof.
 */

const classChip: Record<RecentArtifactClass, { label: string; cls: string }> = {
  DOCS_ARTIFACT:            { label: "DOCS_ARTIFACT",            cls: "ledger-class ledger-class--docs" },
  MERGED_PR:                { label: "MERGED_PR",                cls: "ledger-class ledger-class--merged" },
  GOVERNED_LABOR:           { label: "GOVERNED_LABOR",           cls: "ledger-class ledger-class--labor" },
  VERIFIER_HARDENED:        { label: "VERIFIER_HARDENED",        cls: "ledger-class ledger-class--verifier" },
  RECEIPT_EMITTED:          { label: "RECEIPT_EMITTED",          cls: "ledger-class ledger-class--receipt" },
  PUBLIC_RENDERING_UPDATE:  { label: "PUBLIC_RENDERING_UPDATE",  cls: "ledger-class ledger-class--docs" },
};

export type RecentGovernedArtifactsProps = {
  surface?: RecentArtifactSurface | "all";
  limit?: number;
  heading?: string;
  eyebrow?: string;
  sub?: string;
};

export default function RecentGovernedArtifacts({
  surface = "all",
  limit,
  heading = "Recent governed work · artifacts",
  eyebrow = `Snapshot as of ${recentGovernedArtifactsSnapshotDate}`,
  sub = "Hand-maintained snapshot of recently merged governed work. Each artifact opens to a reviewer-visible review page. No row claims runtime-active, signal-observed, or public-safe runtime proof.",
}: RecentGovernedArtifactsProps) {
  const filtered: RecentGovernedArtifact[] =
    surface === "all"
      ? recentGovernedArtifacts
      : recentGovernedArtifacts.filter((a) => a.surface === surface);

  const items = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section className="rga" aria-labelledby="rga-title">
      <header className="rga__head">
        <div>
          <p className="rga__eyebrow">Governed work · {eyebrow}</p>
          <h2 id="rga-title" className="rga__title">{heading}</h2>
          <p className="rga__sub">{sub}</p>
        </div>
        <span className="rga__snapshot">SNAPSHOT · {recentGovernedArtifactsSnapshotDate}</span>
      </header>

      <ul className="rga__grid" role="list">
        {items.map((a) => {
          const chip = classChip[a.class];
          return (
            <li key={a.slug} className="rga__card spotlight">
              <a href={`/artifacts/${a.slug}/`} className="rga__card-link" aria-label={`Open artifact ${a.title}`}>
                <div className="rga__card-head">
                  <span className={chip.cls}>{chip.label}</span>
                  <span className="rga__card-date">{a.date}</span>
                </div>
                <h3 className="rga__card-title">{a.title}</h3>
                <p className="rga__card-sub">{a.summary}</p>
                <dl className="rga__card-meta">
                  <div>
                    <dt>Supports</dt>
                    <dd>{a.supports}</dd>
                  </div>
                  <div>
                    <dt>Does not prove</dt>
                    <dd className="rga__card-block">{a.doesNotProve}</dd>
                  </div>
                </dl>
                <div className="rga__card-foot">
                  <span className="rga__card-repo">{a.repo.replace(/^hawkinsoperations-/, "")} · #{a.pr}</span>
                  <span className="rga__card-open">Open review →</span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>

      <footer className="rga__foot">
        <span className="rga__foot-note">
          Snapshot scope: governed labor and reviewed merges. Hand-maintained. Not auto-updated.
          Does not claim runtime-active, signal-observed, or public-safe runtime proof — those
          wordings remain blocked by the claim firewall.
        </span>
        <a className="cta cta-quiet" href="https://github.com/HawkinsOperations" target="_blank" rel="noopener noreferrer">
          Open the org ↗
        </a>
      </footer>
    </section>
  );
}
