"use client";

import { useMemo, useState } from "react";

type ProofOpsStep = {
  title: string;
  happens: string;
  control: string;
  blocked: string;
  tone: "labor" | "inspect" | "ceiling" | "blocked" | "human" | "safe";
};

const steps: ProofOpsStep[] = [
  {
    title: "AI-assisted security work",
    happens: "AI helps draft, summarize, and organize security work.",
    control: "AI is labor, not authority.",
    blocked: "AI cannot approve claims or close cases.",
    tone: "labor",
  },
  {
    title: "Artifact Intake",
    happens: "A specific artifact enters the reviewer path.",
    control: "The artifact keeps its ID, source, and scope attached.",
    blocked: "No unnamed work is promoted.",
    tone: "inspect",
  },
  {
    title: "Evidence Graph",
    happens: "The graph links artifact, validation, runtime candidate, signal, review, and claim decision nodes.",
    control: "References stay attached to authority sources.",
    blocked: "Rendered cards do not become evidence.",
    tone: "inspect",
  },
  {
    title: "Telemetry Contract Check",
    happens: "The expected telemetry family is checked against the artifact contract.",
    control: "Telemetry expectations are separated from observation claims.",
    blocked: "No signal observed status is claimed.",
    tone: "inspect",
  },
  {
    title: "Controlled Validation",
    happens: "Controlled positive and negative fixtures define the current evidence state.",
    control: "The ceiling is CONTROLLED_TEST_VALIDATED.",
    blocked: "Controlled validation proves controlled validation only.",
    tone: "ceiling",
  },
  {
    title: "Runtime Candidate Ledger",
    happens: "Runtime candidacy is represented as a future gate.",
    control: "Runtime evidence must come from a separate authority path.",
    blocked: "This page does not claim runtime-active status.",
    tone: "blocked",
  },
  {
    title: "Signal Observation",
    happens: "Signal observation remains a distinct future gate.",
    control: "Preserved signal evidence is required before stronger wording.",
    blocked: "This page does not claim signal observed status.",
    tone: "blocked",
  },
  {
    title: "Human Review Gate",
    happens: "A human review gate controls promotion.",
    control: "human_review_required remains true.",
    blocked: "Final authorization is not claimed here.",
    tone: "human",
  },
  {
    title: "ProofCard",
    happens: "The ProofCard summarizes current evidence and blocked claims.",
    control: "ProofCard rendering is not proof authority.",
    blocked: "Website rendering is not proof.",
    tone: "ceiling",
  },
  {
    title: "Claim Authority",
    happens: "Claim Firewall applies internal Hoxline Claim Authority rules.",
    control: "Claim Firewall is a capability inside Hoxline.",
    blocked: "Claim Firewall is not the product identity.",
    tone: "human",
  },
  {
    title: "Safe Claim / Blocked Claim",
    happens: "A safe controlled-validation claim is allowed; stronger claim families stay blocked.",
    control: "public_safe remains false.",
    blocked: "This page does not claim public-safe proof.",
    tone: "safe",
  },
];

export default function ProofOpsLoopDiagram() {
  const [activeIndex, setActiveIndex] = useState(4);
  const activeStep = steps[activeIndex];

  const statusLine = useMemo(
    () => `${activeIndex + 1} of ${steps.length}: ${activeStep.title}`,
    [activeIndex, activeStep.title],
  );

  return (
    <section className="proofops-loop" aria-labelledby="proofops-loop-title">
      <div className="proofops-loop__head">
        <div>
          <p className="proofops-kicker">Interactive ProofOps loop</p>
          <h2 id="proofops-loop-title">AI helps. Evidence gates. Humans promote.</h2>
          <p className="proofops-loop__hint">Tap a step to inspect the control.</p>
        </div>
        <p>{statusLine}</p>
      </div>

      <div className="proofops-loop__stage">
        <ol className="proofops-loop__rail" aria-label="Hoxline ProofOps loop steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <button
                type="button"
                className={`proofops-loop__step proofops-loop__step--${step.tone} ${
                  index === activeIndex ? "is-active" : ""
                }`}
                aria-pressed={index === activeIndex}
                aria-label={`Select step ${index + 1}: ${step.title}`}
                onClick={() => setActiveIndex(index)}
              >
                <span className="proofops-loop__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="proofops-loop__label">{step.title}</span>
              </button>
            </li>
          ))}
        </ol>

        <article className={`proofops-loop__detail proofops-loop__detail--${activeStep.tone}`} aria-live="polite">
          <p className="proofops-loop__detail-kicker">Active gate</p>
          <h3>{activeStep.title}</h3>
          <dl>
            <div>
              <dt>What happens</dt>
              <dd>{activeStep.happens}</dd>
            </div>
            <div>
              <dt>Control</dt>
              <dd>{activeStep.control}</dd>
            </div>
            <div>
              <dt>Still blocked</dt>
              <dd>{activeStep.blocked}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}
