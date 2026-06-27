"use client";

import { useCallback, useMemo, useRef, useState } from "react";

type NodeTone = "ai" | "built" | "controlled" | "gated" | "review" | "produced" | "render";

type OrbitNode = {
  id: string;
  name: string;
  status: string;
  tone: NodeTone;
  exists: string;
  role: string;
  artifact: string;
  handoff: string;
  badges: string[];
  terminal: string;
  route: string;
  routeLabel: string;
};

// Hoxline 11-stage loop — order is contractually fixed.
const loopNodes: OrbitNode[] = [
  {
    id: "ai-work",
    name: "AI-assisted security work",
    status: "labor",
    tone: "ai",
    exists: "AI drafts detections, queries, and reviewer notes at speed.",
    role: "AI produces labor fast; it holds no authority.",
    artifact: "Draft candidate",
    handoff: "Hands a named draft to Artifact Intake.",
    badges: ["AI labor", "fast"],
    terminal: "ai draft --task ho-det-001 → candidate.draft",
    route: "/ai-security/",
    routeLabel: "AI automation surface",
  },
  {
    id: "intake",
    name: "Artifact Intake",
    status: "built",
    tone: "built",
    exists: "The draft becomes a scoped, source-controlled artifact.",
    role: "Automation attaches scope, source, and reviewer context.",
    artifact: "HO-DET-001 artifact",
    handoff: "Sends the artifact to the Evidence Graph.",
    badges: ["scoped"],
    terminal: "intake register → HO-DET-001 (source-controlled)",
    route: "/detections/",
    routeLabel: "Detection engineering",
  },
  {
    id: "graph",
    name: "Evidence Graph",
    status: "built",
    tone: "built",
    exists: "Artifact, validation, candidate, signal, review, and claim nodes stay separated.",
    role: "Automation links nodes without collapsing authority.",
    artifact: "Evidence graph",
    handoff: "Feeds the Telemetry Contract Check.",
    badges: ["separated"],
    terminal: "graph build → 6 node classes linked",
    route: "/architecture/truth-surfaces/",
    routeLabel: "Truth surfaces",
  },
  {
    id: "telemetry",
    name: "Telemetry Contract Check",
    status: "controlled",
    tone: "controlled",
    exists: "Expected telemetry fields are checked against a contract.",
    role: "Automation verifies the contract shape, not live data.",
    artifact: "Contract check result",
    handoff: "Passes the shape to Controlled Validation.",
    badges: ["contract"],
    terminal: "telemetry verify → contract shape ok",
    route: "/platform/contracts/",
    routeLabel: "Platform contracts",
  },
  {
    id: "validation",
    name: "Controlled Validation",
    status: "controlled",
    tone: "controlled",
    exists: "Positive and negative fixtures pass inside the validation boundary.",
    role: "Automation runs fixtures; humans own the meaning.",
    artifact: "Validation report",
    handoff: "Hands evidence to the Runtime Candidate Ledger.",
    badges: ["fixtures pass"],
    terminal: "validate ho-det-001 → pass (controlled boundary)",
    route: "/validation/",
    routeLabel: "Validation registry",
  },
  {
    id: "runtime-ledger",
    name: "Runtime Candidate Ledger",
    status: "gated",
    tone: "gated",
    exists: "Bounded local runtime candidates are recorded as candidates.",
    role: "Automation records candidates; runtime proof is not promoted.",
    artifact: "Runtime candidate entry",
    handoff: "Routes candidates toward Signal Observation review.",
    badges: ["gated", "candidate"],
    terminal: "ledger add candidate → not promoted",
    route: "/proof/runtime-proof-factory/",
    routeLabel: "Runtime boundary",
  },
  {
    id: "signal",
    name: "Signal Observation",
    status: "gated",
    tone: "gated",
    exists: "Signal claims wait for promoted evidence before they move.",
    role: "Automation prepares the correlation lane; evidence promotion stays gated.",
    artifact: "Signal receipt lane",
    handoff: "Holds until the Human Review Gate.",
    badges: ["gated", "pending evidence"],
    terminal: "signal claim → gated pending promoted evidence",
    route: "/proof/",
    routeLabel: "Proof surface",
  },
  {
    id: "review",
    name: "Human Review Gate",
    status: "review",
    tone: "review",
    exists: "A human reviews before any wording is allowed to move.",
    role: "AI cannot self-approve; humans own this gate.",
    artifact: "Review decision",
    handoff: "Approves movement to the ProofCard.",
    badges: ["human owned"],
    terminal: "review gate → human_review_required",
    route: "/governance-saves/",
    routeLabel: "Governance saves",
  },
  {
    id: "proofcard",
    name: "ProofCard",
    status: "produced",
    tone: "produced",
    exists: "A bounded, reviewer-readable proof card is rendered.",
    role: "Automation renders; the proof repo owns the record.",
    artifact: "HO-DET-001 ProofCard",
    handoff: "Feeds Claim Authority.",
    badges: ["reviewer-ready"],
    terminal: "render proofcard → /proof/ho-det-001/",
    route: "/proof/ho-det-001/",
    routeLabel: "HO-DET-001 record",
  },
  {
    id: "claim-authority",
    name: "Claim Authority",
    status: "controlled",
    tone: "controlled",
    exists: "Allowed wording is separated from blocked stronger families.",
    role: "Claim Firewall enforces the wording edge.",
    artifact: "Allowed vs blocked decision",
    handoff: "Emits the final Safe or Blocked claim.",
    badges: ["wording edge"],
    terminal: "claim-authority decide → allowed | blocked",
    route: "/claim-firewall/",
    routeLabel: "Claim Firewall",
  },
  {
    id: "safe-blocked",
    name: "Safe Claim / Blocked Claim",
    status: "produced",
    tone: "produced",
    exists: "A safer claim ships; stronger overclaims are converted or held.",
    role: "Automation publishes only what evidence allows.",
    artifact: "Safer claim + overclaim record",
    handoff: "Loops back as new AI-assisted work begins.",
    badges: ["safe", "hardened"],
    terminal: "emit claim → evidence-scoped; overclaim held",
    route: "/proof/",
    routeLabel: "Proof surface",
  },
];

// Seven-surface truth/control map.
const surfaceNodes: OrbitNode[] = [
  {
    id: "source",
    name: "Source",
    status: "owned",
    tone: "built",
    exists: "A detection source, SPL, or rule candidate exists and is reviewable.",
    role: "Owns where work enters the system.",
    artifact: "HO-DET-001 source",
    handoff: "Runtime and signal claims stay in later gates.",
    badges: ["owned"],
    terminal: "open detections/successor/ho-det-001/rule.yml",
    route: "/detections/",
    routeLabel: "Detections",
  },
  {
    id: "validation",
    name: "Validation",
    status: "owned",
    tone: "controlled",
    exists: "Controlled positive and negative fixtures exercised the behavior.",
    role: "Owns controlled behavior truth.",
    artifact: "Validation report",
    handoff: "Endpoint runtime and broad coverage stay in later gates.",
    badges: ["controlled"],
    terminal: "open reports/ho-det-001/validation-result.md",
    route: "/validation/",
    routeLabel: "Validation",
  },
  {
    id: "runtime",
    name: "Runtime",
    status: "gated",
    tone: "gated",
    exists: "A bounded local runtime event exists when separately evidenced.",
    role: "Owns the runtime boundary; gated for public claims.",
    artifact: "Runtime candidate",
    handoff: "Public proof still needs the promoted evidence path.",
    badges: ["gated"],
    terminal: "runtime candidate → not promoted",
    route: "/proof/runtime-proof-factory/",
    routeLabel: "Runtime boundary",
  },
  {
    id: "signal",
    name: "Signal",
    status: "gated",
    tone: "gated",
    exists: "A bounded observed event exists only when the chain is approved.",
    role: "Owns the signal boundary; gated.",
    artifact: "Signal receipt (pending)",
    handoff: "Production and organization-wide wording stay out of scope.",
    badges: ["gated"],
    terminal: "signal receipt → pending review",
    route: "/proof/",
    routeLabel: "Proof",
  },
  {
    id: "evidence",
    name: "Evidence",
    status: "owned",
    tone: "produced",
    exists: "A packet, hash, CI output, or reviewer artifact exists.",
    role: "Owns reviewer receipts.",
    artifact: "Case packet",
    handoff: "Public wording still moves through the claim gate.",
    badges: ["receipts"],
    terminal: "open artifacts → case packet + scanner output",
    route: "/artifacts/",
    routeLabel: "Artifacts",
  },
  {
    id: "public-proof",
    name: "Public Proof",
    status: "owned",
    tone: "produced",
    exists: "A reviewed public proof record exists with a stated ceiling.",
    role: "Owns what the public page may route to.",
    artifact: "Proof record",
    handoff: "Raw runtime truth stays separate from rendering.",
    badges: ["proof"],
    terminal: "open proof/records/HO-DET-001.md",
    route: "/proof/",
    routeLabel: "Proof",
  },
  {
    id: "rendering",
    name: "Rendering",
    status: "render",
    tone: "render",
    exists: "The website displays reviewer routes.",
    role: "Renders reviewer routes; proof stays with the owning evidence surface.",
    artifact: "This site",
    handoff: "Displaying a state does not promote it.",
    badges: ["rendering only"],
    terminal: "render route → reviewer surface (not proof)",
    route: "/",
    routeLabel: "Home",
  },
];

type Point = { x: number; y: number };

function computePoints(count: number, radius: number): Point[] {
  return Array.from({ length: count }, (_, index) => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    return {
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius,
    };
  });
}

export interface OrbitInteractionWorkbenchProps {
  mode?: "loop" | "surfaces";
  eyebrow?: string;
  title?: string;
  intro?: string;
}

export default function OrbitInteractionWorkbench({
  mode = "loop",
  eyebrow,
  title,
  intro,
}: OrbitInteractionWorkbenchProps) {
  const nodes = mode === "loop" ? loopNodes : surfaceNodes;
  const [activeIndex, setActiveIndex] = useState(0);
  const nodeButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const active = nodes[activeIndex];

  const points = useMemo(() => computePoints(nodes.length, 38), [nodes.length]);

  const ringPath = useMemo(
    () => points.map((p) => `${p.x},${p.y}`).join(" "),
    [points],
  );

  const activeArc = useMemo(() => {
    const prev = points[(activeIndex - 1 + points.length) % points.length];
    const cur = points[activeIndex];
    const next = points[(activeIndex + 1) % points.length];
    return `${prev.x},${prev.y} ${cur.x},${cur.y} ${next.x},${next.y}`;
  }, [points, activeIndex]);

  const select = useCallback((index: number) => {
    setActiveIndex(((index % nodes.length) + nodes.length) % nodes.length);
  }, [nodes.length]);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = nodes.length - 1;
    else return;
    event.preventDefault();
    const normalized = ((next % nodes.length) + nodes.length) % nodes.length;
    select(normalized);
    nodeButtons.current[normalized]?.focus();
  };

  const headingId = `orbx-${mode}-title`;

  return (
    <section className={`orbx orbx--${mode}`} aria-labelledby={headingId}>
      {(eyebrow || title || intro) && (
        <div className="orbx__head">
          {eyebrow && <p className="cockpit-eyebrow">{eyebrow}</p>}
          {title && (
            <h2 id={headingId} className="orbx__title">
              {title}
            </h2>
          )}
          {intro && <p className="orbx__intro">{intro}</p>}
        </div>
      )}

      <div className="orbx__workspace">
        <div className="orbx__stage" role="group" aria-label={`${mode} orbit selector`}>
          <div className="orbx__ring" aria-hidden="true">
            <span className="orbx__spin" />
          </div>
          <svg className="orbx__wires" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="38" className="orbx__wire-ring" />
            <polygon points={ringPath} className="orbx__wire-poly" />
            <polyline points={activeArc} className="orbx__wire-active" />
          </svg>

          <div className="orbx__core" aria-hidden="true">
            <span className="orbx__core-index">
              {String(activeIndex + 1).padStart(2, "0")}
              <em>/{String(nodes.length).padStart(2, "0")}</em>
            </span>
            <strong className="orbx__core-name">{active.name}</strong>
            <span className={`orbx__core-status orbx__core-status--${active.tone}`}>
              {active.status}
            </span>
          </div>

          {nodes.map((node, index) => (
            <button
              key={node.id}
              ref={(el) => {
                nodeButtons.current[index] = el;
              }}
              type="button"
              className={`orbx__node orbx__node--${node.tone} ${
                index === activeIndex ? "is-active" : ""
              }`}
              style={{
                left: `${points[index].x}%`,
                top: `${points[index].y}%`,
              }}
              aria-pressed={index === activeIndex}
              aria-label={`${node.name}: ${node.status}`}
              onClick={() => select(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <span>{index + 1}</span>
            </button>
          ))}
        </div>

        <article className={`orbx__panel orbx__panel--${active.tone}`} aria-live="polite">
          <header className="orbx__panel-head">
            <span className="orbx__panel-step">
              {mode === "loop" ? "Stage" : "Surface"} {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className={`orbx__badge orbx__badge--${active.tone}`}>{active.status}</span>
          </header>
          <h3 className="orbx__panel-title">{active.name}</h3>

          <dl className="orbx__facts">
            <div>
              <dt>What exists</dt>
              <dd>{active.exists}</dd>
            </div>
            <div>
              <dt>{mode === "loop" ? "AI / automation role" : "Owns"}</dt>
              <dd>{active.role}</dd>
            </div>
            <div>
              <dt>Output artifact</dt>
              <dd>{active.artifact}</dd>
            </div>
            <div>
              <dt>{mode === "loop" ? "Next handoff" : "Boundary"}</dt>
              <dd>{active.handoff}</dd>
            </div>
          </dl>

          <div className="orbx__chips" aria-label="status badges">
            {active.badges.map((badge) => (
              <span key={badge} className="orbx__chip">
                {badge}
              </span>
            ))}
          </div>

          <p className="orbx__terminal">
            <span className="orbx__prompt">$</span> {active.terminal}
          </p>

          <div className="orbx__panel-foot">
            <a className="orbx__route" href={active.route}>
              {active.routeLabel} <span aria-hidden="true">→</span>
            </a>
            <div className="orbx__stepper">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => select(activeIndex - 1)}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => select(activeIndex + 1)}
              >
                ›
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
