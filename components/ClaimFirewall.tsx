import {
  allowedClaims,
  blockedClaims,
  promotionRequirements,
  safeWordingExamples,
  unsafeWordingExamples,
} from "@data/claims";

const ceilingLevels = [
  {
    label: "Source truth",
    state: "reviewable",
    detail: "Source-controlled wording can be inspected, but source presence does not prove runtime.",
    tone: "active",
  },
  {
    label: "Validation truth",
    state: "controlled",
    detail: "Deterministic validation can support controlled-test wording at the current ceiling.",
    tone: "active",
  },
  {
    label: "Runtime candidate",
    state: "candidate only",
    detail: "Runtime candidates remain below public proof until separately evidenced and promoted.",
    tone: "warn",
  },
  {
    label: "Signal / evidence review",
    state: "gated",
    detail: "Signal and evidence claims require separate review before public wording can move.",
    tone: "warn",
  },
  {
    label: "Human approval",
    state: "authority",
    detail: "Human review authorizes promotion; AI and green checks do not.",
    tone: "active",
  },
  {
    label: "Public proof",
    state: "blocked until promoted",
    detail: "Public-safe status remains blocked unless explicit evidence linkage and promotion clear.",
    tone: "blocked",
  },
];

const outcomeRules = [
  "Rendering is not proof.",
  "Green CI is evidence, not approval.",
  "AI support is not disposition authority.",
  "Runtime evidence does not automatically become public-safe proof.",
  "Public wording must stay below the evidence ceiling.",
];

export default function ClaimFirewall() {
  return (
    <div className="claim-firewall-demo" data-ci-target="blocked-claims">
      <article className="claim-firewall-demo__control" aria-label="Claim Firewall visual control panel">
        <div className="claim-firewall-demo__control-head">
          <div>
            <p className="cockpit-eyebrow">CI Claim Firewall</p>
            <h3 className="claim-firewall-demo__title">WORDING -&gt; SCANNER -&gt; CEILING</h3>
          </div>
          <span className="rubber-stamp-blocked">BLOCKED</span>
        </div>

        <div className="claim-firewall-demo__flow" aria-label="Wording passes through scanner before reaching the public ceiling">
          <div className="claim-firewall-demo__node claim-firewall-demo__node--wording">
            <span className="claim-firewall-demo__node-code">01</span>
            <strong>WORDING</strong>
            <p>Public page copy, metadata, proof cards, and reviewer-facing summaries enter as claims to inspect.</p>
          </div>
          <div className="claim-firewall-demo__arrow" aria-hidden="true">-&gt;</div>
          <div className="claim-firewall-demo__node claim-firewall-demo__node--scanner">
            <span className="claim-firewall-demo__node-code">02</span>
            <strong>SCANNER</strong>
            <p>Deterministic checks look for blocked wording, unsafe context, rendering-as-proof drift, and promotion language.</p>
            <div className="claim-firewall-demo__blocked-line">blocked claim context required</div>
          </div>
          <div className="claim-firewall-demo__arrow" aria-hidden="true">-&gt;</div>
          <div className="claim-firewall-demo__node claim-firewall-demo__node--ceiling">
            <span className="claim-firewall-demo__node-code">03</span>
            <strong>CEILING</strong>
            <p>Public wording stays below the evidence ceiling unless evidence linkage and explicit promotion authorize movement.</p>
          </div>
        </div>

        <div className="claim-firewall-demo__console-line" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <p className="claim-firewall-demo__boundary">
          Unsupported security claims should fail before they reach the public page. Website rendering is not proof.
          Deterministic checks and human review keep public wording below the evidence ceiling.
        </p>
      </article>

      <article className="claim-firewall-demo__panel claim-firewall-demo__panel--meter">
        <div className="claim-firewall-demo__panel-head">
          <div>
            <p className="cockpit-eyebrow">Evidence ceiling gauge</p>
            <h3 className="claim-firewall-demo__panel-title">Claim levels stay separated</h3>
          </div>
          <span className="claim-firewall-demo__panel-status">PUBLIC-SAFE BLOCKED UNLESS PROMOTED</span>
        </div>
        <ol className="claim-firewall-demo__meter" aria-label="Evidence ceiling gauge">
          {ceilingLevels.map((level, index) => (
            <li key={level.label} className={`claim-firewall-demo__meter-step claim-firewall-demo__meter-step--${level.tone}`}>
              <span className="claim-firewall-demo__meter-index">{String(index + 1).padStart(2, "0")}</span>
              <strong>{level.label}</strong>
              <em>{level.state}</em>
              <p>{level.detail}</p>
            </li>
          ))}
        </ol>
      </article>

      <article className="claim-firewall-demo__panel claim-firewall-demo__panel--blocked">
        <div className="claim-firewall-demo__panel-head">
          <p className="cockpit-eyebrow">Blocked / not claimed</p>
          <span className="claim-firewall-demo__panel-status">CONTROLLED RISK CHIPS</span>
        </div>
        <div className="claim-firewall-demo__chips" aria-label="Blocked claim chips">
          {blockedClaims.map((claim) => (
            <span key={claim} className="claim-firewall-demo__chip">
              {claim}
            </span>
          ))}
        </div>
      </article>

      <div className="claim-firewall-demo__examples">
        <article className="claim-firewall-demo__panel">
          <p className="cockpit-eyebrow">Allowed wording examples</p>
          <ul className="claim-firewall-demo__list claim-firewall-demo__list--allowed">
            {safeWordingExamples.map((claim, i) => (
              <li key={i}>{claim}</li>
            ))}
          </ul>
        </article>

        <article className="claim-firewall-demo__panel claim-firewall-demo__panel--unsafe">
          <p className="cockpit-eyebrow">Unsafe wording examples</p>
          <ul className="claim-firewall-demo__list claim-firewall-demo__list--unsafe">
            {unsafeWordingExamples.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <article className="claim-firewall-demo__panel">
        <div className="claim-firewall-demo__panel-head">
          <p className="cockpit-eyebrow">Promotion requirements</p>
          <span className="claim-firewall-demo__panel-status">EVIDENCE LINKAGE REQUIRED</span>
        </div>
        <ol className="claim-firewall-demo__requirements">
          {promotionRequirements.map((item, i) => (
            <li key={i}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ol>
      </article>

      <article className="claim-firewall-demo__panel claim-firewall-demo__panel--timeline">
        <div className="claim-firewall-demo__panel-head">
          <div>
            <p className="cockpit-eyebrow">Promotion gate timeline</p>
            <h3 className="claim-firewall-demo__panel-title">Evidence moves before wording moves</h3>
          </div>
          <span className="claim-firewall-demo__panel-status">FAIL CLOSED</span>
        </div>
        <ol className="claim-firewall-demo__timeline">
          {[
            "Source truth",
            "Validation truth",
            "Runtime candidate",
            "Signal / evidence review",
            "Human approval",
            "Public proof",
          ].map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
      </article>

      <article className="claim-firewall-demo__panel claim-firewall-demo__panel--outcome">
        <div className="claim-firewall-demo__panel-head">
          <div>
            <p className="cockpit-eyebrow">Outcome panel</p>
            <h3 className="claim-firewall-demo__panel-title">What the firewall prevents</h3>
          </div>
          <span className="claim-firewall-demo__panel-status">AI LABOR / HUMAN AUTHORITY</span>
        </div>
        <ul className="claim-firewall-demo__outcomes">
          {outcomeRules.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="claim-firewall-demo__outcome-copy">
          AI-assisted security work can move fast, but public wording stays governed: the scanner
          constrains unsupported language, then human review decides whether evidence is sufficient
          for any explicit promotion.
        </p>
      </article>

      <article className="claim-firewall-demo__panel claim-firewall-demo__panel--allowed">
        <div className="claim-firewall-demo__panel-head">
          <p className="cockpit-eyebrow">Allowed claim basis</p>
          <span className="claim-firewall-demo__panel-status">BELOW CEILING</span>
        </div>
        <ul className="claim-firewall-demo__list claim-firewall-demo__list--allowed">
          {allowedClaims.map((claim, i) => (
            <li key={i}>{claim}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}
