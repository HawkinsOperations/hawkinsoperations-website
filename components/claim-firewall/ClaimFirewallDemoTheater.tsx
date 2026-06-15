"use client";

import { useState } from "react";
import { claimFirewallExamples } from "@data/systemShowcase";
import ClaimDecisionStamp from "./ClaimDecisionStamp";
import ClaimPacketFlow from "./ClaimPacketFlow";
import EvidenceGapChips from "./EvidenceGapChips";

export default function ClaimFirewallDemoTheater() {
  const [activeClaim, setActiveClaim] = useState(0);
  const [activeStage, setActiveStage] = useState(2);
  const example = claimFirewallExamples[activeClaim];

  return (
    <section className="claim-demo-theater" aria-labelledby="claim-demo-title">
      <div className="claim-demo-theater__header">
        <div>
          <p className="cockpit-eyebrow">Claim Firewall Intercept Chamber</p>
          <h2 id="claim-demo-title">Pick a bad claim. Watch the ceiling clamp it.</h2>
          <p>
            The demo shows how unsupported public wording moves through extraction, evidence ceiling,
            deterministic verification, human review, and final wording.
          </p>
        </div>
        <ClaimDecisionStamp decision={example.decision} />
      </div>
      <div className="claim-demo-theater__selector" aria-label="Bad claim examples">
        {claimFirewallExamples.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={activeClaim === index ? "is-active" : ""}
            onClick={() => {
              setActiveClaim(index);
              setActiveStage(2);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <ClaimPacketFlow active={activeStage} />
      <div className="claim-demo-theater__stage-controls" aria-label="Pipeline stage controls">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <button key={index} type="button" onClick={() => setActiveStage(index)} className={activeStage === index ? "is-active" : ""}>
            stage {index + 1}
          </button>
        ))}
      </div>
      <div className="claim-demo-theater__grid">
        <article className="claim-demo-theater__draft">
          <span>AI draft / incoming wording</span>
          <p>{example.incomingClaim}</p>
          <small>{example.context}</small>
        </article>
        <article className="claim-demo-theater__notes">
          <span>Active stage note</span>
          <p>{example.stageNotes[Math.min(activeStage, example.stageNotes.length - 1)]}</p>
          <EvidenceGapChips gaps={example.missingEvidence} />
        </article>
        <article className="claim-demo-theater__safe">
          <span>Safer public wording</span>
          <p>{example.saferWording}</p>
        </article>
      </div>
    </section>
  );
}

