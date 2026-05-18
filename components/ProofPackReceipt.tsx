import { externalLinks } from "@data/navigation";

/**
 * ProofPackReceipt
 *
 * Stamped release receipt for Proof Pack 001 placed directly under the hero.
 * Visual contract:
 *  - Docket / receipt aesthetic — perforated edges, monospace ID strip,
 *    stamped ceiling badge — intentionally NOT a generic cockpit card.
 *  - States what the release is, what it ceilings at, and what it does not
 *    promote. No runtime / signal / public-safe runtime proof claims.
 *  - "BLOCKED" appears next to "Public-safe runtime proof" so the blocked
 *    state is the wording on the surface, not an implied claim.
 */
export default function ProofPackReceipt() {
  return (
    <aside className="release-receipt" aria-labelledby="release-receipt-title">
      <span className="release-receipt__perf release-receipt__perf--top" aria-hidden="true" />
      <span className="release-receipt__perf release-receipt__perf--bottom" aria-hidden="true" />

      <header className="release-receipt__head">
        <div className="release-receipt__stamp" aria-hidden="true">
          <span className="release-receipt__stamp-id">PP-001</span>
          <span className="release-receipt__stamp-tag">RELEASED</span>
        </div>
        <div className="release-receipt__intro">
          <p className="release-receipt__eyebrow">Release receipt · governed</p>
          <h2 id="release-receipt-title" className="release-receipt__title">
            Proof Pack 001 · released.
          </h2>
          <p className="release-receipt__sub">
            <span className="release-receipt__det mono">HO-DET-001</span>
            <span aria-hidden="true"> · </span>
            Suspicious PowerShell EncodedCommand Execution via Sysmon Event ID 1.
          </p>
        </div>
        <span className="release-receipt__ceiling mono" aria-label="Public ceiling CONTROLLED_TEST_VALIDATED">
          <span className="release-receipt__ceiling-label">CEILING</span>
          <span className="release-receipt__ceiling-value">CONTROLLED_TEST_VALIDATED</span>
        </span>
      </header>

      <dl className="release-receipt__grid">
        <div className="release-receipt__row">
          <dt>Reviewer package</dt>
          <dd className="mono release-receipt__row-ok">PUBLIC_SAFE_REVIEWER_RELEASE_CANDIDATE</dd>
        </div>
        <div className="release-receipt__row">
          <dt>Public-safe runtime proof</dt>
          <dd className="mono release-receipt__row-block">BLOCKED</dd>
        </div>
        <div className="release-receipt__row">
          <dt>Raw / private runtime evidence</dt>
          <dd className="mono release-receipt__row-block">NOT_PUBLIC_SAFE</dd>
        </div>
        <div className="release-receipt__row">
          <dt>Asset</dt>
          <dd className="mono">HAWKINSOPERATIONS_PROOF_PACK_001.zip</dd>
        </div>
        <div className="release-receipt__row release-receipt__row--wide">
          <dt>ZIP SHA256</dt>
          <dd className="mono release-receipt__sha">
            44d8a643aa2b113c9e99be0462e699d39af707a67190823cc05bb381907dc452
          </dd>
        </div>
      </dl>

      <footer className="release-receipt__foot">
        <p className="release-receipt__note">
          The proof repo holds the official GitHub Release and bounded reviewer ZIP. Website rendering is not proof. This release does not prove runtime-active or signal-observed claims; public-safe runtime proof remains blocked at this surface and stays in the claim firewall.
        </p>
        <div className="release-receipt__ctas">
          <a
            className="release-receipt__cta release-receipt__cta--primary"
            href={externalLinks.proofPack001Release}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open GitHub Release ↗
          </a>
          <a
            className="release-receipt__cta release-receipt__cta--quiet"
            href={externalLinks.proofPack001Discussion}
            target="_blank"
            rel="noopener noreferrer"
          >
            Discussion ↗
          </a>
          <a className="release-receipt__cta release-receipt__cta--quiet" href="/proof/ho-det-001/">
            Inspect proof route →
          </a>
        </div>
      </footer>
    </aside>
  );
}
