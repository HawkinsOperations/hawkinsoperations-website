"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { publicStatus } from "@data/generated/public-status.generated";
import {
  authoritySurfaces,
  boundedMetrics,
  capabilityMaturityChart,
  claimDecisionGroups,
  complexityStats,
  evidencePathTimeline,
  generatedOutputs,
  generatedOutputsChart,
  hoxlineDataSource,
  loopStageStatuses,
  positiveCapabilities,
  remainingGates,
  validationMetrics,
  visualModuleDefinitions,
  stageStatusDistribution,
  type AuthoritySurface,
  type ClaimDecisionGroup,
  type GeneratedOutput,
  type HoxlineStageStatus,
  type LoopStageStatus,
  type VisualTone,
} from "@data/hoxlineVisualIntelligence";

type CustomStyle = CSSProperties & Record<"--vi-x" | "--vi-y" | "--vi-size" | "--vi-pct", string>;

function toneClass(tone: VisualTone) {
  return `vi-tone--${tone}`;
}

function StatusChip({ children, tone = "cyan" }: { children: string; tone?: VisualTone }) {
  return <span className={`vi-chip ${toneClass(tone)}`}>{children}</span>;
}

function statusLabel(status: HoxlineStageStatus) {
  return status
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function ComplexityStatsRail() {
  return (
    <div className="vi-stats-rail" aria-label="Hoxline visual intelligence complexity stats">
      {complexityStats.map((stat) => (
        <article key={stat.label} className={`vi-stat ${toneClass(stat.tone)}`}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
          <small>{stat.detail}</small>
        </article>
      ))}
    </div>
  );
}

export function VisualIntelligenceHero({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`vi-hero ${compact ? "vi-hero--compact" : ""}`}>
      <div className="vi-hero__copy">
        <p className="cockpit-eyebrow">Hoxline by HawkinsOperations</p>
        <h1 className="vi-hero__title">
          Hoxline
          <span>Run the ProofOps loop.</span>
        </h1>
        <p className="vi-hero__subtitle">Executable claim control for AI-assisted security work.</p>
        <p className="vi-hero__body">
          Capability Visual Data Pack v1 shows what Hoxline can verify today: HO-DET-001 loop
          execution, reviewer-readable outputs, output contract checks, bounded claim decisions,
          and still-gated runtime and signal evidence.
        </p>
        <div className="vi-chip-row" aria-label="Current Hoxline status">
          <StatusChip tone="cyan">Capability visual data pack v1</StatusChip>
          <StatusChip tone="blue">HO-DET-001</StatusChip>
          <StatusChip tone="green">{publicStatus.hoxline.proof_ceiling.label}</StatusChip>
          <StatusChip tone="red">{publicStatus.raw_status_constants.RUNTIME_GATED}</StatusChip>
          <StatusChip tone="amber">{publicStatus.hoxline.signal.label}</StatusChip>
          <StatusChip tone="amber">{publicStatus.hoxline.human_review.label}</StatusChip>
        </div>
        <div className="vi-hero__actions">
          <a className="cta cta-primary" href="/hoxline/">
            Open Hoxline
          </a>
          <a className="cta cta-quiet" href="/artifacts/">
            Inspect proof/artifacts
          </a>
        </div>
      </div>
      <div className="vi-hero__visual" aria-label="Gauntlet mission-control preview">
        <LoopStatusOrbit compact />
      </div>
    </section>
  );
}

export function StageStatusChart() {
  const totals = useMemo(
    () =>
      validationMetrics.map((metric) => ({
        ...metric,
        pct: Math.max(12, Math.round((metric.value / loopStageStatuses.length) * 100)),
      })),
    [],
  );

  return (
    <section className="vi-panel">
      <div className="vi-panel__head">
        <p className="cockpit-eyebrow">stage_status_distribution</p>
        <h2>Visual stage status data</h2>
        <p>Capability Visual Data Pack v1 exposes the loop as status data, not as a flat warning list.</p>
      </div>
      <div className="vi-bars">
        {totals.map((metric) => (
          <div key={metric.label} className="vi-bar-row">
            <span>{metric.label}</span>
            <div className="vi-bar-track">
              <span
                className={`vi-bar-fill ${toneClass(metric.tone)}`}
                style={{ "--vi-pct": `${metric.pct}%` } as CustomStyle}
              />
            </div>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LoopStatusOrbit({ compact = false }: { compact?: boolean }) {
  const [activeId, setActiveId] = useState(loopStageStatuses[4].id);
  const active = loopStageStatuses.find((stage) => stage.id === activeId) ?? loopStageStatuses[0];

  return (
    <section className={`vi-orbit ${compact ? "vi-orbit--compact" : ""}`} aria-label="Interactive Hoxline loop status orbit">
      {!compact && (
        <div className="vi-panel__head">
          <p className="cockpit-eyebrow">Gauntlet engine</p>
          <h2>LoopStatusOrbit</h2>
          <p>Tap a node to inspect status, reviewer note, authority refs, and missing evidence.</p>
        </div>
      )}
      <div className="vi-orbit__shell">
        <div className="vi-orbit__core">
          <span>HO-DET-001</span>
          <strong>{publicStatus.hoxline.proof_ceiling.label}</strong>
        </div>
        {loopStageStatuses.map((stage, index) => {
          const angle = (Math.PI * 2 * index) / loopStageStatuses.length - Math.PI / 2;
          const radius = compact ? 38 : 44;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;
          return (
            <button
              key={stage.id}
              type="button"
              className={`vi-orbit__node ${toneClass(stage.tone)} ${active.id === stage.id ? "is-active" : ""}`}
              style={{ "--vi-x": `${x}%`, "--vi-y": `${y}%`, "--vi-size": compact ? "34px" : "44px" } as CustomStyle}
              onClick={() => setActiveId(stage.id)}
              aria-pressed={active.id === stage.id}
              aria-label={`${stage.stage}: ${stage.status}`}
            >
              <span>{index + 1}</span>
            </button>
          );
        })}
      </div>
      <StageDetail stage={active} compact={compact} />
    </section>
  );
}

function StageDetail({ stage, compact }: { stage: LoopStageStatus; compact?: boolean }) {
  return (
    <article className={`vi-detail ${toneClass(stage.tone)}`}>
      <p className="vi-detail__eyebrow">{statusLabel(stage.status)}</p>
      <h3>{stage.stage}</h3>
      <p>{stage.reviewerNote}</p>
      {!compact && (
        <dl>
          <div>
            <dt>Authority refs</dt>
            <dd>{stage.authorityRefs.length ? stage.authorityRefs.slice(0, 2).join(" · ") : "No public authority ref for this gated state"}</dd>
          </div>
          <div>
            <dt>Missing evidence</dt>
            <dd>{stage.missingEvidence.length ? stage.missingEvidence.join(" · ") : "None listed for this stage"}</dd>
          </div>
        </dl>
      )}
    </article>
  );
}

export function CapabilityMaturityGrid() {
  const [filter, setFilter] = useState<"all" | "available" | "controlled" | "gated">("all");
  const capabilities = positiveCapabilities.filter((capability) => filter === "all" || capability.state === filter);

  return (
    <section className="vi-panel">
      <div className="vi-panel__head">
        <p className="cockpit-eyebrow">What Hoxline can verify today</p>
        <h2>capability_maturity_chart</h2>
        <p>Positive capability is shown first; the PR #13 maturity chart keeps gated areas visible without taking over the story.</p>
      </div>
      <div className="vi-tabs" role="tablist" aria-label="Capability filter">
        {(["all", "available", "controlled", "gated"] as const).map((item) => (
          <button key={item} type="button" className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="vi-capability-grid">
        {capabilities.map((capability) => (
          <article key={capability.id} className={`vi-capability vi-capability--${capability.state}`}>
            <span>{capability.state}</span>
            <strong>{capability.label}</strong>
            <p>{capability.detail}</p>
            <small>{capability.evidence}</small>
          </article>
        ))}
      </div>
      <div className="vi-maturity-bars" aria-label="Capability maturity chart values">
        {capabilityMaturityChart.map((item) => (
          <div key={item.capability} className="vi-bar-row">
            <span>{item.capability}</span>
            <div className="vi-bar-track">
              <span
                className={`vi-bar-fill ${toneClass(item.tone)}`}
                style={{ "--vi-pct": `${item.maturityScore}%` } as CustomStyle}
              />
            </div>
            <strong>{item.maturityLabel}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AuthorityConstellation({ compact = false }: { compact?: boolean }) {
  const [activeId, setActiveId] = useState("hoxline");
  const active = authoritySurfaces.find((surface) => surface.id === activeId) ?? authoritySurfaces[0];

  return (
    <section className={`vi-panel vi-constellation ${compact ? "vi-constellation--compact" : ""}`}>
      <div className="vi-panel__head">
        <p className="cockpit-eyebrow">authority_surface_chart</p>
        <h2>Seven surfaces, separated</h2>
        <p>Hoxline is the control route. It does not replace proof, source, validation, platform, website, or org routing boundaries.</p>
      </div>
      <div className="vi-constellation__map">
        {authoritySurfaces.map((surface, index) => {
          const angle = (Math.PI * 2 * index) / authoritySurfaces.length - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 38;
          const y = 50 + Math.sin(angle) * 38;
          return (
            <button
              key={surface.id}
              type="button"
              className={`vi-constellation__node ${toneClass(surface.tone)} ${active.id === surface.id ? "is-active" : ""}`}
              style={{ "--vi-x": `${x}%`, "--vi-y": `${y}%`, "--vi-size": surface.id === "hoxline" ? "76px" : "58px" } as CustomStyle}
              onClick={() => setActiveId(surface.id)}
              aria-pressed={active.id === surface.id}
            >
              {surface.label}
            </button>
          );
        })}
      </div>
      <AuthorityDetail surface={active} />
    </section>
  );
}

function AuthorityDetail({ surface }: { surface: AuthoritySurface }) {
  return (
    <article className={`vi-detail ${toneClass(surface.tone)}`}>
      <p className="vi-detail__eyebrow">{surface.status}</p>
      <h3>{surface.label}</h3>
      <p>{surface.role}</p>
      <p>{surface.detail}</p>
    </article>
  );
}

export function GauntletExecutionConsole() {
  return (
    <section className="vi-console" aria-label="Gauntlet execution console">
      <div className="vi-console__chrome">
        <span />
        <span />
        <span />
        <strong>LOCAL_CHECKOUT_CLI</strong>
      </div>
      <pre>
        <code>{`$env:PYTHONPATH='src'; python -B -m hoxline gauntlet run --artifact HO-DET-001 --format json\n$env:PYTHONPATH='src'; python -B -m hoxline gauntlet run --artifact HO-DET-001 --format markdown`}</code>
      </pre>
      <div className="vi-console__footer">
        <StatusChip tone="green">JSON output</StatusChip>
        <StatusChip tone="green">Markdown output</StatusChip>
        <StatusChip tone="blue">contract tests 8</StatusChip>
        <StatusChip tone="red">runtime gated</StatusChip>
        <StatusChip tone="amber">signal missing evidence</StatusChip>
      </div>
    </section>
  );
}

export function OutputArtifactWall() {
  const [activeId, setActiveId] = useState(generatedOutputs[0].id);
  const active = generatedOutputs.find((output) => output.id === activeId) ?? generatedOutputs[0];

  return (
    <section className="vi-panel">
      <div className="vi-panel__head">
        <p className="cockpit-eyebrow">generated_outputs_chart</p>
        <h2>Output artifact wall</h2>
        <p>Reviewer-readable outputs are surfaced as artifacts. They are routes to inspect, not proof promotion.</p>
      </div>
      <div className="vi-output-grid">
        {generatedOutputs.map((output) => (
          <button
            key={output.id}
            type="button"
            className={`vi-output-card ${active.id === output.id ? "is-active" : ""}`}
            onClick={() => setActiveId(output.id)}
            aria-pressed={active.id === output.id}
          >
            <span>{output.kind}</span>
            <strong>{output.label}</strong>
          </button>
        ))}
      </div>
      <OutputDetail output={active} />
      <div className="vi-output-summary" aria-label="Generated outputs chart">
        {generatedOutputsChart.map((output) => (
          <span key={output.outputType} className={`vi-chip ${toneClass(output.tone)}`}>
            {output.outputType}: {output.count}
          </span>
        ))}
      </div>
    </section>
  );
}

function OutputDetail({ output }: { output: GeneratedOutput }) {
  return (
    <article className="vi-detail vi-tone--cyan">
      <p className="vi-detail__eyebrow">{output.kind}</p>
      <h3>{output.label}</h3>
      <p>{output.detail}</p>
      <a href={output.href} target="_blank" rel="noopener noreferrer">
        Open artifact -&gt;
      </a>
    </article>
  );
}

export function EvidencePathTimeline() {
  const [activeId, setActiveId] = useState(evidencePathTimeline[2].id);
  const active = evidencePathTimeline.find((event) => event.id === activeId) ?? evidencePathTimeline[0];

  return (
    <section className="vi-panel">
      <div className="vi-panel__head">
        <p className="cockpit-eyebrow">build_timeline</p>
        <h2>Reviewer path from source to gated claims</h2>
        <p>Tap a node to inspect what exists today and what remains gated.</p>
      </div>
      <div className="vi-timeline" role="list">
        {evidencePathTimeline.map((event) => (
          <button
            key={event.id}
            type="button"
            className={`vi-timeline__node ${toneClass(event.tone)} ${active.id === event.id ? "is-active" : ""}`}
            onClick={() => setActiveId(event.id)}
            aria-pressed={active.id === event.id}
          >
            <span>{event.label}</span>
            <strong>{event.status}</strong>
          </button>
        ))}
      </div>
      <article className={`vi-detail ${toneClass(active.tone)}`}>
        <p className="vi-detail__eyebrow">{active.status}</p>
        <h3>{active.label}</h3>
        <p>{active.detail}</p>
      </article>
    </section>
  );
}

export function ClaimDecisionMatrixVisual() {
  const [activeId, setActiveId] = useState<ClaimDecisionGroup["id"]>("allowed-now");
  const active = claimDecisionGroups.find((group) => group.id === activeId) ?? claimDecisionGroups[0];

  return (
    <section className="vi-panel">
      <div className="vi-panel__head">
        <p className="cockpit-eyebrow">claim_decision_chart</p>
        <h2>Allowed, blocked, and required evidence</h2>
        <p>Toggle the decision families. Blocked claims are visible as boundaries, not as product claims.</p>
      </div>
      <div className="vi-tabs" role="tablist" aria-label="Claim decision groups">
        {claimDecisionGroups.map((group) => (
          <button
            key={group.id}
            type="button"
            className={active.id === group.id ? "is-active" : ""}
            onClick={() => setActiveId(group.id)}
          >
            {group.label}
          </button>
        ))}
      </div>
      <article className={`vi-detail ${toneClass(active.tone)}`}>
        <p className="vi-detail__eyebrow">{active.status}</p>
        <h3>{active.label}</h3>
        <p>{active.detail}</p>
        <div className="vi-chip-row">
          {active.claims.map((claim) => (
            <StatusChip key={claim} tone={active.tone}>
              {claim}
            </StatusChip>
          ))}
        </div>
      </article>
    </section>
  );
}

export function StillGatedPanel() {
  return (
    <section className="vi-panel vi-gated">
      <div className="vi-panel__head">
        <p className="cockpit-eyebrow">Still gated</p>
        <h2>What stronger wording still needs</h2>
        <p>These states remain required before stronger public claims can move.</p>
      </div>
      <div className="vi-gated__grid">
        {remainingGates.map((gate) => (
          <span key={gate.gate}>{gate.gate}: {gate.status}</span>
        ))}
      </div>
      <p className="vi-boundary-line">
        Website rendering cannot supply these records. Hoxline visualizes the boundary and keeps
        public_safe false with human_review_required true.
      </p>
    </section>
  );
}

export function VisualModuleRail() {
  return (
    <section className="vi-panel">
      <div className="vi-panel__head">
        <p className="cockpit-eyebrow">visual modules</p>
        <h2>PR #13 module map</h2>
        <p>The website renders the exact visual modules defined by the Capability Visual Data Pack v1.</p>
      </div>
      <div className="vi-module-grid">
        {visualModuleDefinitions.map((module) => (
          <article key={module.id} className="vi-module-card">
            <span>{module.id}</span>
            <strong>{module.label}</strong>
            <p>{module.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function BoundedMetricsRail() {
  return (
    <div className="vi-stats-rail" aria-label="Capability visual data pack bounded metrics">
      {boundedMetrics.map((metric) => (
        <article key={metric.label} className={`vi-stat ${toneClass(metric.tone)}`}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
          <small>{metric.detail}</small>
        </article>
      ))}
    </div>
  );
}

export function DataPackSourceStrip() {
  return (
    <div className="vi-source-strip" aria-label="Capability Visual Data Pack v1 source">
      <StatusChip tone="cyan">{hoxlineDataSource.mode}</StatusChip>
      <StatusChip tone="blue">{hoxlineDataSource.sourcePr}</StatusChip>
      <StatusChip tone="green">{hoxlineDataSource.showcaseId}</StatusChip>
      <StatusChip tone="amber">{`stage_status_distribution ${stageStatusDistribution.length}`}</StatusChip>
    </div>
  );
}
