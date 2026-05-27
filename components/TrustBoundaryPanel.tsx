// Claim firewall — public-render list of phrases that are not claimed.
// Each entry renders inside a "Not claimed · blocked at the site contract"
// column so a reviewer can see exactly what the public surface does not prove.
// These strings are not promotion-authorizing and are surfaced as blocked,
// not as supported claims.
const notClaimed: string[] = [
  // not claimed — blocked
  "production-ready",
  "customer validated",
  "Fortinet endorsed",
  "Douglas endorsed",
  "partner validated",
  // not claimed — blocked
  "autonomous SOC",
  "AI-approved disposition",
  "analyst-approved disposition",
  "live enterprise deployment",
  "real customer detection coverage",
  // not claimed — blocked
  "public runtime proof",
  "public signal-observed proof",
  "production incident prevented",
];

const safeFraming: string[] = [
  "governed AI Security Operations",
  "detection engineering",
  "evidence-bounded output",
  "reviewer-inspectable proof",
  "governance saves",
  "controls fired",
  "unsafe public truth blocked",
  "AI support-only",
  "human review authority",
  "controlled validation",
];

export default function TrustBoundaryPanel() {
  return (
    <aside className="tbp" aria-label="Trust boundary">
      <div className="tbp__frame" aria-hidden="true" />
      <div className="tbp__body">
        <header className="tbp__head">
          <span className="tbp__crest" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 3l8 3v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3z" />
            </svg>
          </span>
          <div>
            <p className="tbp__eyebrow">Trust boundary</p>
            <h3 className="tbp__title">
              Website rendering routes reviewers to proof. It does not authorize claims.
            </h3>
            <p className="tbp__sub">
              Evidence, validators, and human review authorize claims. Private-only records are
              excluded from public surfaces.
            </p>
          </div>
        </header>

        <div className="tbp__grid">
          <section className="tbp__col tbp__col--blocked">
            <p className="tbp__col-label">Not claimed · blocked at the site contract</p>
            <ul className="tbp__chips">
              {notClaimed.map((claim) => (
                <li key={claim} className="tbp__chip tbp__chip--blocked">
                  <span className="tbp__chip-dot" aria-hidden="true" />
                  {claim}
                </li>
              ))}
            </ul>
          </section>

          <section className="tbp__col tbp__col--safe">
            <p className="tbp__col-label">Allowed safe framing</p>
            <ul className="tbp__chips">
              {safeFraming.map((claim) => (
                <li key={claim} className="tbp__chip tbp__chip--safe">
                  <span className="tbp__chip-dot" aria-hidden="true" />
                  {claim}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </aside>
  );
}
