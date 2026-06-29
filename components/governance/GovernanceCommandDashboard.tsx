import { publicStatus } from "@data/generated/public-status.generated";
import { governanceSavesSummary } from "@data/governanceSaves";
import GovernanceCategoryChart from "./GovernanceCategoryChart";
import GovernanceSaveRecordExplorer from "./GovernanceSaveRecordExplorer";

export default function GovernanceCommandDashboard() {
  const controlsMetric = publicStatus.metrics.controls_fired;
  return (
    <div className="gov-dashboard">
      <section className="gov-hero" aria-labelledby="governance-command-title">
        <div>
          <p className="cockpit-eyebrow">Governance Saves Control Dashboard</p>
          <h1 id="governance-command-title">
            {controlsMetric.display_value} Unverified Claims Blocked
          </h1>
          <p>
            Controls fired before bad security truth shipped. This is a source-backed public subset
            of the Governance Saves ledger, rendered as a control activity dashboard rather than a blog.
          </p>
          <div className="gov-hero__actions">
            <a className="cta cta-primary" href="#records">Explore records</a>
            <a className="cta cta-quiet" href="/claim-firewall/">Open Claim Firewall</a>
          </div>
        </div>
        <aside className="gov-counter" aria-label="Governance Saves counter">
          <span>controls fired</span>
          <strong>{controlsMetric.display_value}</strong>
          <small>{controlsMetric.freshness_status} - {controlsMetric.source_label}</small>
          <em>outcome impact totals: not_measured unless source states them</em>
        </aside>
      </section>

      <section className="gov-dashboard__grid">
        <GovernanceCategoryChart />
        <div className="gov-risk-panel">
          <p className="cockpit-eyebrow">Control board</p>
          <h2>Bad truth is intercepted at the gate.</h2>
          <div className="gov-risk-panel__lanes">
            <article>
              <span>Risk prevented</span>
              <p>Claims could outrun source, validation, runtime, signal, release, or review evidence.</p>
            </article>
            <article>
              <span>Control that fired</span>
              <p>Review gates, claim scanners, merge stops, branch hygiene, and verifier hardening.</p>
            </article>
            <article>
              <span>What changed</span>
              <p>Unsafe wording was blocked, downgraded, corrected, hardened, delayed, or documented.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="gov-ticker" aria-label="Governance Saves ticker">
        {["claim boundary", "runtime boundary", "merge authority", "branch hygiene", "validator hardening", "evidence protection"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section id="records">
        <GovernanceSaveRecordExplorer />
      </section>
    </div>
  );
}
