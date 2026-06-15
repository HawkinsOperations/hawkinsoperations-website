import type { CSSProperties } from "react";
import { governanceSavesSummary } from "@data/governanceSaves";
import { hoxlineDataSource } from "@data/hoxlineVisualIntelligence";

export default function MissionControlHero() {
  return (
    <section className="cc-hero" aria-labelledby="mission-control-title">
      <div className="cc-hero__copy">
        <p className="cockpit-eyebrow">Mission Control · HawkinsOperations</p>
        <h1 id="mission-control-title">
          A proof-governed AI security operations system.
        </h1>
        <p className="cc-hero__tagline">
          Governance that catches bad security truth before it ships.
        </p>
        <p className="cc-hero__body">
          Hoxline runs the controlled ProofOps loop. Claim Firewall intercepts unsafe wording.
          Governance Saves records controls that fired. Proof and artifacts route reviewers to
          evidence without letting the website become proof.
        </p>
        <div className="cc-hero__actions">
          <a className="cta cta-primary" href="/hoxline/">Open Hoxline</a>
          <a className="cta cta-quiet" href="/governance-saves/">Explore Governance Saves</a>
          <a className="cta cta-quiet" href="/proof/">Inspect Proof</a>
        </div>
      </div>

      <div className="cc-map" aria-label="Animated-looking system map">
        <div className="cc-map__core">
          <span>HOXLINE</span>
          <strong>{hoxlineDataSource.proofCeiling}</strong>
        </div>
        {[
          ["AI draft", "cyan"],
          ["Evidence graph", "blue"],
          ["Validation", "green"],
          ["Claim Firewall", "red"],
          ["Human review", "amber"],
          ["Proof record", "amber"],
          ["Website render", "neutral"],
        ].map(([label, tone], index) => (
          <span key={label} className={`cc-map__node cc-map__node--${tone}`} style={{ "--cc-i": index } as CSSProperties}>
            {label}
          </span>
        ))}
        <svg className="cc-map__routes" viewBox="0 0 420 300" aria-hidden="true">
          <path d="M66 152 C120 48 290 42 348 152 C288 256 134 250 66 152Z" />
          <path d="M210 36 L210 264" />
          <path d="M52 150 L368 150" />
          <path d="M92 74 L328 226" />
          <path d="M328 74 L92 226" />
        </svg>
      </div>

      <aside className="cc-hero__teaser" aria-label="Mission control proof counters">
        <article>
          <span>controls fired</span>
          <strong>{governanceSavesSummary.publicRenderedCount}</strong>
          <small>public-facing Governance Saves</small>
        </article>
        <article>
          <span>public-safe</span>
          <strong>0</strong>
          <small>still gated by evidence and review</small>
        </article>
        <article>
          <span>engine source</span>
          <strong>PR #13</strong>
          <small>Capability Visual Data Pack v1</small>
        </article>
      </aside>
    </section>
  );
}
