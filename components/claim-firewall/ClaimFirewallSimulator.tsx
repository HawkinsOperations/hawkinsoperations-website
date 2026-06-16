"use client";

import { useMemo, useState } from "react";
import ClaimPipelineStepper, { type ClaimPipelineStep } from "./ClaimPipelineStepper";
import SaferWordingPanel from "./SaferWordingPanel";

type ExampleId = "runtime" | "customer" | "production" | "ai" | "signal" | "publicSafe";

const examples: Record<ExampleId, {
  label: string;
  original: string;
  reason: string;
  missing: string[];
  safer: string;
  decision: "BLOCKED" | "DOWNGRADED" | "HARDENED" | "ALLOWED_UNDER_CEILING";
}> = {
  runtime: {
    label: "runtime active",
    original: "HO-DET-001 is runtime active.",
    reason: "Runtime evidence must be preserved and promoted by the appropriate authority path.",
    missing: ["preserved runtime evidence", "promotion ledger update", "human review"],
    safer: "HO-DET-001 has controlled validation evidence; runtime status remains gated.",
    decision: "BLOCKED",
  },
  customer: {
    label: "customer deployed",
    original: "Hoxline is customer deployed.",
    reason: "Customer deployment is not present in the public evidence set.",
    missing: ["customer evidence", "public authorization", "business approval"],
    safer: "Hoxline is a public product route and control-plane implementation; customer deployment is not claimed.",
    decision: "BLOCKED",
  },
  production: {
    label: "production ready",
    original: "This detection is production ready.",
    reason: "Production readiness requires separate deployment and operations evidence.",
    missing: ["deployment evidence", "operational acceptance", "release authority"],
    safer: "This detection has bounded controlled validation where source-backed.",
    decision: "DOWNGRADED",
  },
  ai: {
    label: "AI approved",
    original: "AI approved the final disposition.",
    reason: "AI is labor. Human review is authority.",
    missing: ["human review decision", "disposition authority record"],
    safer: "AI supplied support-only context; human review remains required.",
    decision: "HARDENED",
  },
  signal: {
    label: "signal observed",
    original: "Signal was observed publicly.",
    reason: "Signal observation needs preserved evidence tied to the artifact and contract.",
    missing: ["preserved signal evidence", "authority reference", "public-safe review"],
    safer: "Signal observation remains missing evidence for this public surface.",
    decision: "BLOCKED",
  },
  publicSafe: {
    label: "public-safe proof",
    original: "This is public-safe proof.",
    reason: "Public-safe proof requires explicit evidence linkage and approval.",
    missing: ["public-safe promotion", "proof authority update", "human review"],
    safer: "This page renders reviewer context only; public-safe proof is not claimed.",
    decision: "BLOCKED",
  },
};

const steps: ClaimPipelineStep[] = [
  { id: "draft", label: "AI Draft", status: "input", detail: "A polished sentence enters the public wording lane." },
  { id: "extractor", label: "Claim Extractor", status: "check", detail: "The claim family is identified before wording reaches a public surface." },
  { id: "ceiling", label: "Evidence Ceiling Check", status: "gate", detail: "The current proof ceiling is compared to the requested wording." },
  { id: "verifier", label: "Deterministic Verifier", status: "check", detail: "Policy-as-code keeps blocked terms from slipping through as assertions." },
  { id: "review", label: "Human Review Gate", status: "gate", detail: "Human review remains above AI draft and green checks." },
  { id: "decision", label: "Output Decision", status: "decision", detail: "The claim is blocked, downgraded, hardened, or allowed only under the current ceiling." },
];

export default function ClaimFirewallSimulator() {
  const [exampleId, setExampleId] = useState<ExampleId>("runtime");
  const [activeStepId, setActiveStepId] = useState("ceiling");
  const example = examples[exampleId];
  const activeStep = useMemo(() => steps.find((step) => step.id === activeStepId) ?? steps[0], [activeStepId]);

  return (
    <section className="cf-sim" aria-label="Claim Firewall intercept simulator">
      <div className="cf-sim__head">
        <p className="cockpit-eyebrow">Claim Firewall Intercept Chamber</p>
        <h2>Watch unsupported security truth hit the gate.</h2>
        <p>
          Pick a bad claim. The simulator shows extraction, ceiling check, deterministic verification,
          human review, and the public wording decision.
        </p>
      </div>

      <div className="cf-sim__selector" role="group" aria-label="Choose example bad claim">
        {(Object.keys(examples) as ExampleId[]).map((id) => (
          <button
            key={id}
            type="button"
            className={exampleId === id ? "is-active" : ""}
            onClick={() => setExampleId(id)}
          >
            {examples[id].label}
          </button>
        ))}
      </div>

      <div className="cf-sim__grid">
        <ClaimPipelineStepper steps={steps} activeId={activeStepId} onSelect={setActiveStepId} />
        <article className={`cf-decision cf-decision--${example.decision.toLowerCase().replaceAll("_", "-")}`}>
          <span>{activeStep.label}</span>
          <h3>{example.decision}</h3>
          <p>{activeStep.detail}</p>
          <dl>
            <div>
              <dt>Why it fails</dt>
              <dd>{example.reason}</dd>
            </div>
            <div>
              <dt>Evidence missing</dt>
              <dd>{example.missing.join(" · ")}</dd>
            </div>
          </dl>
        </article>
      </div>

      <SaferWordingPanel original={example.original} safer={example.safer} decision={example.decision} />
    </section>
  );
}
