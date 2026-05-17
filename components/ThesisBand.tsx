import { ceiling, publicSafe } from "@config/site";

/**
 * ThesisBand
 *
 * Paper-surface hero anchoring the homepage. Carries the core thesis:
 * AI can accelerate security work; it cannot authorize the truth.
 *
 * Visual contract:
 *  - Paper surface (breaks the all-navy sameness).
 *  - Display serif headline (reserved typography).
 *  - Ceiling stamp is the only authority-colored chip in this band.
 *
 * Claim contract:
 *  - Renders the public ceiling from config/site.ts.
 *  - Reaffirms that website rendering is not proof.
 *  - Does not claim runtime, signal-observed, public-safe, or autonomous SOC status.
 *    Those terms remain blocked by the claim firewall.
 */
export default function ThesisBand() {
  return (
    <section className="thesis-band" aria-label="Thesis">
      <div className="container">
        <p className="thesis-band__eyebrow">HawkinsOperations · governed detection engineering</p>
        <h1 className="thesis-band__headline">
          AI can accelerate security work. It cannot <em>authorize</em> the truth.
        </h1>
        <p className="thesis-band__sub">
          HawkinsOperations is a governed detection-engineering system where AI accelerates the work and
          deterministic validation, evidence records, and human review decide what can be claimed.
          Promotion is gated. Website rendering is not proof.
        </p>

        <div className="thesis-band__meta" aria-label="Public ceiling and rendering status">
          <span className="ceiling-stamp ceiling-stamp--on-paper" aria-label={`Public ceiling ${ceiling}`}>
            Ceiling · {ceiling}
          </span>
          <span className="thesis-band__meta-divider">·</span>
          <span>Public-safe state · {publicSafe}</span>
          <span className="thesis-band__meta-divider">·</span>
          <span>Website rendering is not proof</span>
          <span className="thesis-band__meta-divider">·</span>
          <span>Human review required</span>
        </div>

        <div className="thesis-band__ctas">
          <a className="thesis-band__cta thesis-band__cta--primary" href="#flagship">
            See HO-DET-001 →
          </a>
          <a className="thesis-band__cta thesis-band__cta--quiet" href="/start/">
            Reviewer routes
          </a>
          <a className="thesis-band__cta thesis-band__cta--quiet" href="/proof/">
            Proof ledger
          </a>
        </div>
      </div>
    </section>
  );
}
