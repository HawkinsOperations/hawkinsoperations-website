const quickStartCommands = [
  "python -m claimfirewall scan README.md --policy policy/blocked_claims.yml",
  "claimfirewall scan README.md --policy policy/blocked_claims.yml",
];

const policyAreas = [
  "production maturity",
  "runtime evidence",
  "public release safety",
  "signal observation",
  "automated SOC claims",
  "AI approval language",
  "analyst approval language",
  "customer rollout evidence",
  "service availability",
  "coverage breadth",
];

const safeContexts = [
  "does not prove production deployment",
  "does not claim public release safety",
  "support-only AI wording",
  "rendering is not proof",
];

const transformations = [
  {
    blocked: "This detection is production ready.",
    why: "Production maturity requires deployment evidence and explicit review.",
    safer: "This detection has controlled-test validation only.",
  },
  {
    blocked: "AI approved the final disposition.",
    why: "AI can support analysis, but approval authority remains human.",
    safer: "AI provided support-only triage context. Human review remains authority.",
  },
  {
    blocked: "The website proves signal observation.",
    why: "Rendering routes reviewers. It does not create signal evidence.",
    safer: "The website routes reviewers to evidence. It does not prove signal observation.",
  },
  {
    blocked: "Coverage is fleet wide.",
    why: "Coverage breadth requires separate telemetry and deployment evidence.",
    safer: "Coverage breadth is not claimed by this page.",
  },
];

const authorityStack = [
  [".github", "command center and reviewer routing"],
  ["detections", "source truth"],
  ["validation", "behavior validation"],
  ["platform", "control mechanics"],
  ["proof", "proof and claim authority"],
  ["website", "rendering only"],
  ["claim-firewall", "utility only"],
] as const;

const receipts = [
  {
    label: "Repo",
    value: "HawkinsOperations/claim-firewall",
    href: "https://github.com/HawkinsOperations/claim-firewall",
  },
  {
    label: "Release v0.1.0",
    value: "GitHub release",
    href: "https://github.com/HawkinsOperations/claim-firewall/releases/tag/v0.1.0",
  },
  {
    label: "Announcement",
    value: "HawkinsOperations discussion",
    href: "https://github.com/orgs/HawkinsOperations/discussions/51",
  },
  {
    label: "CI",
    value: "Actions",
    href: "https://github.com/HawkinsOperations/claim-firewall/actions",
  },
];

export default function ClaimFirewall() {
  return (
    <div className="claim-firewall-demo" data-ci-target="blocked-claims">
      <section className="claim-firewall-demo__panel" aria-labelledby="quick-start-title">
        <div className="claim-firewall-demo__panel-head">
          <div>
            <p className="cockpit-eyebrow">Quick Start</p>
            <h2 id="quick-start-title" className="claim-firewall-demo__panel-title">
              Run the scanner where the wording lives
            </h2>
          </div>
          <span className="claim-firewall-demo__panel-status">CLI</span>
        </div>
        <div className="claim-firewall-demo__examples">
          {quickStartCommands.map((command) => (
            <pre key={command} className="claim-firewall-demo__terminal">
              <code>{command}</code>
            </pre>
          ))}
        </div>
      </section>

      <section className="claim-firewall-demo__panel claim-firewall-demo__panel--blocked" aria-labelledby="failure-title">
        <div className="claim-firewall-demo__panel-head">
          <div>
            <p className="cockpit-eyebrow">Failure Example</p>
            <h2 id="failure-title" className="claim-firewall-demo__panel-title">
              What a blocked claim looks like
            </h2>
          </div>
          <span className="claim-firewall-demo__panel-status">CONTROLLED RISK CHIPS</span>
        </div>
        <div className="claim-firewall-demo__examples">
          <article className="claim-firewall-demo__panel claim-firewall-demo__panel--unsafe">
            <p className="cockpit-eyebrow">Unsafe wording examples</p>
            <p className="claim-firewall-demo__boundary">This detection is production ready.</p>
          </article>
          <article className="claim-firewall-demo__panel">
            <p className="cockpit-eyebrow">Finding</p>
            <ul className="claim-firewall-demo__list claim-firewall-demo__list--unsafe">
              <li>Blocked claim: production maturity</li>
              <li>Reason: production maturity requires evidence outside wording scan</li>
              <li>Suggested ceiling: TOOL_FUNCTION_ONLY</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="claim-firewall-demo__panel" aria-labelledby="action-title">
        <div className="claim-firewall-demo__panel-head">
          <div>
            <p className="cockpit-eyebrow">GitHub Action</p>
            <h2 id="action-title" className="claim-firewall-demo__panel-title">
              Gate public wording in CI
            </h2>
          </div>
          <span className="claim-firewall-demo__panel-status">HawkinsOperations/claim-firewall@v0.1.0</span>
        </div>
        <pre className="claim-firewall-demo__terminal" aria-label="Claim Firewall GitHub Action example">
          <code>{`- uses: HawkinsOperations/claim-firewall@v0.1.0
  with:
    paths: "."
    format: "text"
    exclude: "examples/fail.md policy/blocked_claims.yml"`}</code>
        </pre>
      </section>

      <section className="claim-firewall-demo__panel" aria-labelledby="transformer-title">
        <div className="claim-firewall-demo__panel-head">
          <div>
            <p className="cockpit-eyebrow">Claim Transformer</p>
            <h2 id="transformer-title" className="claim-firewall-demo__panel-title">
              Replace overreach with bounded wording
            </h2>
          </div>
          <span className="claim-firewall-demo__panel-status">EVIDENCE BEFORE CLAIMS</span>
        </div>
        <div className="claim-firewall-demo__examples">
          {transformations.map((item) => (
            <article key={item.blocked} className="claim-firewall-demo__panel">
              <p className="cockpit-eyebrow">Blocked wording</p>
              <p className="claim-firewall-demo__boundary">{item.blocked}</p>
              <p className="cockpit-eyebrow">Why it fails</p>
              <p className="claim-firewall-demo__boundary">{item.why}</p>
              <p className="cockpit-eyebrow">Safer wording</p>
              <p className="claim-firewall-demo__boundary">{item.safer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="claim-firewall-demo__panel claim-firewall-demo__panel--blocked" aria-labelledby="coverage-title">
        <div className="claim-firewall-demo__panel-head">
          <div>
            <p className="cockpit-eyebrow">Policy Coverage</p>
            <h2 id="coverage-title" className="claim-firewall-demo__panel-title">
              The policy watches language families, not just slogans
            </h2>
          </div>
          <span className="claim-firewall-demo__panel-status">Blocked / not claimed</span>
        </div>
        <div className="claim-firewall-demo__chips" aria-label="Claim Firewall policy areas">
          {policyAreas.map((claim) => (
            <span key={claim} className="claim-firewall-demo__chip">
              {claim}
            </span>
          ))}
        </div>
        <p className="cockpit-eyebrow" style={{ marginTop: 22 }}>
          Allowed wording examples
        </p>
        <ul className="claim-firewall-demo__list claim-firewall-demo__list--allowed">
          {safeContexts.map((claim) => (
            <li key={claim}>{claim}</li>
          ))}
        </ul>
      </section>

      <section className="claim-firewall-demo__panel" aria-labelledby="boundary-title">
        <div className="claim-firewall-demo__panel-head">
          <div>
            <p className="cockpit-eyebrow">Proof Boundary</p>
            <h2 id="boundary-title" className="claim-firewall-demo__panel-title">
              The tool checks wording. It does not approve claims.
            </h2>
          </div>
          <span className="claim-firewall-demo__panel-status">RENDERING_ONLY / TOOL_FUNCTION_ONLY</span>
        </div>
        <p className="claim-firewall-demo__boundary">
          Claim Firewall checks wording against configured policy only.
        </p>
        <p className="claim-firewall-demo__boundary">
          It does not prove detection behavior, runtime telemetry, signal observation, production deployment,
          public release safety, customer rollout, service availability, AI approval, analyst approval, or final
          human authorization.
        </p>
        <p className="claim-firewall-demo__boundary">
          Website proof boundary: This website renders reviewer navigation only. Rendering is not proof authority.
          The website rendering layer remains separate from evidence.
        </p>
        <ul className="claim-firewall-demo__list claim-firewall-demo__list--allowed">
          <li>RENDERING_ONLY for this website page.</li>
          <li>TOOL_FUNCTION_ONLY for Claim Firewall v0.1.0.</li>
          <li>No public-safe proof is created by this page.</li>
        </ul>
      </section>

      <section className="claim-firewall-demo__panel" aria-labelledby="fit-title">
        <div className="claim-firewall-demo__panel-head">
          <div>
            <p className="cockpit-eyebrow">HawkinsOperations Fit</p>
            <h2 id="fit-title" className="claim-firewall-demo__panel-title">
              Utility only, authority stays separate
            </h2>
          </div>
          <span className="claim-firewall-demo__panel-status">AUTHORITY MAP</span>
        </div>
        <div className="claim-firewall-demo__examples">
          {authorityStack.map(([repo, role]) => (
            <article key={repo} className="claim-firewall-demo__panel">
              <p className="cockpit-eyebrow">{repo}</p>
              <p className="claim-firewall-demo__boundary">{role}</p>
            </article>
          ))}
        </div>
        <p className="claim-firewall-demo__outcome-copy">
          Claim Firewall supports claim hygiene. It does not approve claims. Evidence and human review decide truth.
        </p>
      </section>

      <section className="claim-firewall-demo__panel claim-firewall-demo__panel--outcome" aria-labelledby="receipts-title">
        <div className="claim-firewall-demo__panel-head">
          <div>
            <p className="cockpit-eyebrow">Receipts</p>
            <h2 id="receipts-title" className="claim-firewall-demo__panel-title">
              Public routes for reviewers
            </h2>
          </div>
          <span className="claim-firewall-demo__panel-status">Outcome panel</span>
        </div>
        <ul className="claim-firewall-demo__outcomes" aria-label="Claim Firewall public receipts">
          {receipts.map((receipt) => (
            <li key={receipt.label}>
              <span>{receipt.label}</span>
              <strong aria-hidden="true">-&gt;</strong>
              <a href={receipt.href} target="_blank" rel="noopener noreferrer">
                {receipt.value}
              </a>
              <em>open</em>
            </li>
          ))}
        </ul>
        <ul className="claim-firewall-demo__list claim-firewall-demo__list--allowed">
          <li>Ceiling: TOOL_FUNCTION_ONLY</li>
          <li>Website status: RENDERING_ONLY</li>
          <li>Evidence ceiling gauge: release routes are reviewer navigation, not proof promotion.</li>
          <li>Promotion gate timeline: green CI is useful status, not approval.</li>
          <li>AI support remains support. runtime candidate language stays below proof authority.</li>
        </ul>
      </section>
    </div>
  );
}
