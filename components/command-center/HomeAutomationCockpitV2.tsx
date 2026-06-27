"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { publicStatus } from "@data/generated/public-status.generated";

type StageTone = "ai" | "logic" | "validate" | "gate" | "firewall" | "artifact";

type PipelineStage = {
  id: string;
  step: string;
  label: string;
  status: string;
  statusTone: "ready" | "active" | "controlled" | "gated";
  tone: StageTone;
  happening: string;
  artifact: string;
  terminal: string;
  route: string;
  routeLabel: string;
};

// AI Draft -> Detection Logic -> Validation -> Hoxline Gate -> Claim Firewall -> Reviewer Artifact
const stages: PipelineStage[] = [
  {
    id: "ai-draft",
    step: "01",
    label: "AI Draft",
    status: "labor",
    statusTone: "ready",
    tone: "ai",
    happening:
      "AI-assisted work drafts detection ideas, SPL, and reviewer notes fast. It starts the workflow as labor while review stays human-owned.",
    artifact: "Draft detection candidate + reviewer note",
    terminal: "ai draft --task ho-det-001 → candidate.draft.md (labor only)",
    route: "/ai-security/",
    routeLabel: "See the AI automation surface",
  },
  {
    id: "detection-logic",
    step: "02",
    label: "Detection Logic",
    status: "built",
    statusTone: "ready",
    tone: "logic",
    happening:
      "The draft becomes a named, source-controlled detection with scope, ATT&CK context, and rule logic attached.",
    artifact: "HO-DET-001 rule.yml + splunk.spl",
    terminal: "detections build --id HO-DET-001 → rule.yml, splunk.spl",
    route: "/detections/",
    routeLabel: "Inspect detection engineering",
  },
  {
    id: "validation",
    step: "03",
    label: "Validation",
    status: "controlled",
    statusTone: "controlled",
    tone: "validate",
    happening:
      "Controlled positive and negative fixtures exercise the behavior inside an explicit validation boundary.",
    artifact: "Controlled validation report + case packet",
    terminal: "validate ho-det-001 → fixtures pass (controlled boundary)",
    route: "/validation/",
    routeLabel: "Open the validation registry",
  },
  {
    id: "hoxline-gate",
    step: "04",
    label: "Hoxline Gate",
    status: "gating",
    statusTone: "active",
    tone: "gate",
    happening:
      "Hoxline holds the evidence ceiling with the artifact so wording cannot climb above what evidence supports.",
    artifact: "Gated state + evidence ceiling",
    terminal: "hoxline gate evaluate --artifact HO-DET-001 → state=controlled",
    route: "/hoxline/",
    routeLabel: "Open the Hoxline cockpit",
  },
  {
    id: "claim-firewall",
    step: "05",
    label: "Claim Firewall",
    status: "hardening",
    statusTone: "active",
    tone: "firewall",
    happening:
      "Claim Authority hardens wording: stronger claim families are converted into safer, evidence-scoped phrasing.",
    artifact: "Safer claim + overclaim record",
    terminal: "claim-firewall scan 'runtime proven' → convert → safer wording",
    route: "/claim-firewall/",
    routeLabel: "Try the Claim Firewall",
  },
  {
    id: "reviewer-artifact",
    step: "06",
    label: "Reviewer Artifact",
    status: "produced",
    statusTone: "ready",
    tone: "artifact",
    happening:
      "A reviewer-ready ProofCard / packet is produced: bounded, inspectable, and routed to the owning proof surface.",
    artifact: "ProofCard + reviewer packet route",
    terminal: "emit reviewer-pack → /proof/ho-det-001/ (rendering route)",
    route: "/proof/",
    routeLabel: "Review the proof surface",
  },
];

type Metric = { value: string; label: string; detail: string; href: string };

const ROTATE_MS = 3600;

export default function HomeAutomationCockpitV2() {
  const [activeIndex, setActiveIndex] = useState(3); // start on the Hoxline Gate
  const [paused, setPaused] = useState(false);
  const [feed, setFeed] = useState<string[]>([stages[3].terminal]);
  const reducedMotion = useRef(false);
  const stageButtons = useRef<(HTMLButtonElement | null)[]>([]);

  const active = stages[activeIndex];

  const metrics: Metric[] = useMemo(() => {
    const m = publicStatus.metrics;
    return [
      {
        value: m.controls_fired.display_value,
        label: m.controls_fired.display_label,
        detail: m.controls_fired.detail,
        href: m.controls_fired.source_href,
      },
      {
        value: m.validation_cases.display_value,
        label: m.validation_cases.display_label,
        detail: m.validation_cases.detail,
        href: m.validation_cases.source_href,
      },
      {
        value: m.proof_records.display_value,
        label: m.proof_records.display_label,
        detail: m.proof_records.detail,
        href: m.proof_records.source_href,
      },
      {
        value: m.blocked_claims.display_value,
        label: "Claims hardened",
        detail: m.blocked_claims.detail,
        href: m.blocked_claims.source_href,
      },
    ];
  }, []);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const select = useCallback((index: number) => {
    setActiveIndex(index);
    setFeed((prev) => {
      const line = stages[index].terminal;
      if (prev[prev.length - 1] === line) return prev;
      return [...prev, line].slice(-5);
    });
  }, []);

  useEffect(() => {
    if (paused || reducedMotion.current) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % stages.length;
        setFeed((prev) => {
          const line = stages[next].terminal;
          if (prev[prev.length - 1] === line) return prev;
          return [...prev, line].slice(-5);
        });
        return next;
      });
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [paused]);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const next = (index + delta + stages.length) % stages.length;
    select(next);
    stageButtons.current[next]?.focus();
  };

  return (
    <section
      className="awb"
      aria-labelledby="awb-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="awb__glow" aria-hidden="true" />
      <div className="awb__copy">
        <p className="cockpit-eyebrow awb__eyebrow">
          <span className="awb__live" aria-hidden="true" /> AI security automation cockpit
        </p>
        <h1 id="awb-title" className="awb__headline">
          HawkinsOperations builds AI-assisted security automation with{" "}
          <span className="awb__accent">review-ready output</span>.
        </h1>
        <p className="awb__lede">
          A working detection workflow turns fast, AI-assisted security work into reviewer-ready
          artifacts. Hoxline keeps public wording evidence-scoped as the loop moves.
        </p>

        <div className="awb__cta-row">
          <a className="awb__cta awb__cta--primary" href="/hoxline/">
            Open Hoxline
          </a>
          <a className="awb__cta" href="/claim-firewall/">
            Try Claim Firewall
          </a>
          <a className="awb__cta" href="/proof/">
            Review Proof
          </a>
        </div>

        <div className="awb__metrics" aria-label="Built-system metrics">
          {metrics.map((metric) => (
            <a key={metric.label} className="awb__metric" href={metric.href}>
              <span className="awb__metric-value">{metric.value}</span>
              <span className="awb__metric-label">{metric.label}</span>
              <span className="awb__metric-detail">{metric.detail}</span>
            </a>
          ))}
        </div>

        <details className="awb__gated">
          <summary>
            <span className="awb__gated-dot" aria-hidden="true" /> Evidence-scoped claim lane
          </summary>
          <p>
            Runtime, signal, production, customer, and approval claims stay gated until evidence
            is promoted. Controlled validation is the current ceiling; this website is the
            reviewer surface.
          </p>
        </details>
      </div>

      <div className="awb__console" aria-label="Automation workflow console">
        <ol className="awb__pipeline" role="tablist" aria-label="Automation pipeline stages">
          {stages.map((stage, index) => (
            <li key={stage.id} className="awb__pipe-item">
              <button
                ref={(el) => {
                  stageButtons.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`awb-tab-${stage.id}`}
                aria-selected={index === activeIndex}
                aria-controls="awb-stage-panel"
                tabIndex={index === activeIndex ? 0 : -1}
                className={`awb__pipe awb__pipe--${stage.tone} ${
                  index === activeIndex ? "is-active" : ""
                } ${index < activeIndex ? "is-done" : ""}`}
                onClick={() => select(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <span className="awb__pipe-step">{stage.step}</span>
                <span className="awb__pipe-label">{stage.label}</span>
              </button>
              {index < stages.length - 1 && <span className="awb__pipe-link" aria-hidden="true" />}
            </li>
          ))}
        </ol>

        <article
          className={`awb__stage awb__stage--${active.tone}`}
          id="awb-stage-panel"
          role="tabpanel"
          aria-labelledby={`awb-tab-${active.id}`}
        >
          <header className="awb__stage-head">
            <span className="awb__stage-index">
              Stage {active.step} / {String(stages.length).padStart(2, "0")}
            </span>
            <span className={`awb__badge awb__badge--${active.statusTone}`}>{active.status}</span>
          </header>
          <h2 className="awb__stage-title">{active.label}</h2>
          <p className="awb__stage-happening">{active.happening}</p>
          <div className="awb__stage-artifact">
            <span>Output</span>
            <strong>{active.artifact}</strong>
          </div>
          <a className="awb__stage-route" href={active.route}>
            {active.routeLabel} <span aria-hidden="true">→</span>
          </a>
        </article>

        <div className="awb__terminal" aria-hidden="true">
          <div className="awb__terminal-bar">
            <span /> <span /> <span /> hoxline@hawkinsops — workflow
          </div>
          <div className="awb__terminal-body">
            {feed.map((line, index) => (
              <p
                key={`${line}-${index}`}
                className={index === feed.length - 1 ? "is-current" : ""}
              >
                <span className="awb__prompt">$</span> {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
