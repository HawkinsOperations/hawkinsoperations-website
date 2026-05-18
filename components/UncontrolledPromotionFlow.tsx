"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider,
  type Edge,
  type EdgeTypes,
  type Node,
  type NodeProps,
  type NodeTypes,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

/**
 * UncontrolledPromotionFlow
 *
 * Interactive React Flow diagram for the homepage.
 *
 *   AI Output  ──(uncontrolled, dashed red, blocked)─►  Analyst → Action → Public Claim → Executive Truth
 *              ──(controlled, ice-blue, gated)──────►   Validation → Evidence → Claim Firewall → Human Review → Public Boundary
 *
 * Hover highlights the connected path, click opens an inspection panel.
 * Reduced motion: edge animation disabled by CSS.
 */

type NodeKind = "origin" | "failure" | "gate" | "boundary";

type NodeMeta = {
  id: string;
  kind: NodeKind;
  title: string;
  sub: string;
  whyDangerous?: string;
  howBlocked?: string;
  proofOrGate?: string;
  inspectNext?: string;
};

const META: Record<string, NodeMeta> = {
  "ai-output": {
    id: "ai-output",
    kind: "origin",
    title: "AI Output",
    sub: "Unrestricted generation",
    whyDangerous:
      "Model output is cheap to produce and hard to govern. Without a gate the next surface treats it as fact.",
    howBlocked:
      "HawkinsOperations keeps AI output inside a labor lane. Promotion requires deterministic receipts from downstream surfaces.",
    proofOrGate: "Source lane only. No claim promotion without downstream receipts.",
    inspectNext: "Validation Gate · how controlled tests pass before any claim moves.",
  },
  "fail-analyst": {
    id: "fail-analyst",
    kind: "failure",
    title: "Analyst Conclusion",
    sub: "Opinion without bounded evidence",
    whyDangerous:
      "Once AI wording is pasted into a ticket, brief, or chat thread, it becomes a claim with someone's name on it — usually without the evidence chain attached.",
    howBlocked:
      "Analyst-approved disposition remains blocked at the claim firewall unless an evidence-linked record is present.",
    proofOrGate: "Blocked at validation/evidence surface.",
    inspectNext: "Claim firewall · what wording is blocked vs supported.",
  },
  "fail-action": {
    id: "fail-action",
    kind: "failure",
    title: "Operational Action",
    sub: "Action taken on unverified claim",
    whyDangerous:
      "Operational systems act on inputs they trust. If an unverified claim reaches an action surface, the action itself becomes downstream proof the claim was real.",
    howBlocked:
      "Runtime-active state is blocked from public rendering and gated behind a separate evidence-backed promotion path.",
    proofOrGate: "Blocked at runtime surface · not promoted publicly.",
    inspectNext: "Repository authority · where runtime contracts live.",
  },
  "fail-public": {
    id: "fail-public",
    kind: "failure",
    title: "Public Claim",
    sub: "Marketing / public statement",
    whyDangerous:
      "Public statements are the hardest to retract. Once a claim ships to a website, deck, or press surface, it becomes the new baseline for everything downstream.",
    howBlocked:
      "Claim firewall blocks runtime-active, signal-observed, public-safe runtime proof, autonomous SOC, AI-approved disposition, and analyst-approved disposition wording.",
    proofOrGate: "Site contract verifier · blocked-claim scanner · CI enforcement.",
    inspectNext: "Site contract verifier · the deterministic gate that blocks wording.",
  },
  "fail-exec": {
    id: "fail-exec",
    kind: "failure",
    title: "Executive Truth",
    sub: "Becomes organizational truth",
    whyDangerous:
      "Once enough downstream surfaces repeat a claim, executives treat it as established truth. The original AI-generated origin is gone from view.",
    howBlocked:
      "Public claims stay capped at CONTROLLED_TEST_VALIDATED. Stronger wording requires a separate evidence-backed promotion gate.",
    proofOrGate: "Public ceiling held · stronger wording requires promotion.",
    inspectNext: "Proof ledger · what each proof record asserts and refuses.",
  },
  "gate-validation": {
    id: "gate-validation",
    kind: "gate",
    title: "Validation Gate",
    sub: "Deterministic checks",
    whyDangerous:
      "Without a validation gate, source presence is treated as runtime truth. Source is not proof.",
    howBlocked:
      "Controlled positive and negative test cases produce deterministic pass/fail receipts the next surface can require.",
    proofOrGate: "HO-DET-001 validation result · validation-cases.json · CI run.",
    inspectNext: "HO-DET-001 validation result · public validation receipt.",
  },
  "gate-evidence": {
    id: "gate-evidence",
    kind: "gate",
    title: "Evidence Record",
    sub: "Bounded receipts retained",
    whyDangerous:
      "Without an evidence record the chain dissolves and any downstream surface can claim what it likes.",
    howBlocked:
      "Proof records carry stated ceilings, evidence pointers, supported wording, and blocked wording.",
    proofOrGate: "HO-DET-001 proof record · evidence pointers · stated ceiling.",
    inspectNext: "HO-DET-001 proof record.",
  },
  "gate-firewall": {
    id: "gate-firewall",
    kind: "gate",
    title: "Claim Firewall",
    sub: "Blocked-claim scanner",
    whyDangerous:
      "Marketing language drifts; engineering claims drift. Without a firewall, drift becomes the public surface.",
    howBlocked:
      "Site contract verifier scans for blocked terms. CI fails the build when a term lands outside allowed context.",
    proofOrGate: "scripts/verify-site-contract.mjs · blocked-claim list · CI required check.",
    inspectNext: "Claim firewall page · allowed vs blocked wording.",
  },
  "gate-review": {
    id: "gate-review",
    kind: "gate",
    title: "Human Review",
    sub: "Authority decision · gate",
    whyDangerous:
      "AI does not own promotion. Without a human authority gate, nothing in the chain decides what becomes public truth.",
    howBlocked:
      "Visible human review on GitHub before merge for claim-bearing, governance, validation, proof, detection, CI, and website wording changes.",
    proofOrGate: "MERGE_APPROVED · visible GitHub review · explicit operator authority.",
    inspectNext: "Repo rules · visible human review before merge.",
  },
  "public-boundary": {
    id: "public-boundary",
    kind: "boundary",
    title: "Public Boundary",
    sub: "Ceiling held",
    whyDangerous:
      "Without a stated ceiling the public surface inherits whatever the loudest internal voice says.",
    howBlocked:
      "Public ceiling holds at CONTROLLED_TEST_VALIDATED. Website rendering is not proof.",
    proofOrGate: "CONTROLLED_TEST_VALIDATED · NOT_PUBLIC_SAFE · rendering ≠ proof.",
    inspectNext: "Proof Pack 001 release · what is actually shipped.",
  },
};

const FAILURE_PATH = ["ai-output", "fail-analyst", "fail-action", "fail-public", "fail-exec"];
const CONTROL_PATH = [
  "ai-output",
  "gate-validation",
  "gate-evidence",
  "gate-firewall",
  "gate-review",
  "public-boundary",
];

// ─── Custom node ──────────────────────────────────────────────────────

type FlowNode = Node<{ meta: NodeMeta; dim: boolean; active: boolean }>;

function PromotionNode({ data, id }: NodeProps<FlowNode>) {
  const m = data.meta;
  const tone =
    m.kind === "origin"
      ? "origin"
      : m.kind === "failure"
        ? "failure"
        : m.kind === "boundary"
          ? "boundary"
          : "gate";
  const cls = [
    "upf-node",
    `upf-node--${tone}`,
    data.active ? "upf-node--active" : "",
    data.dim ? "upf-node--dim" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} data-node-id={id}>
      <Handle type="target" position={Position.Left} className="upf-handle" />
      <span className="upf-node__kind">
        {m.kind === "failure" ? "BLOCKED PATH" : m.kind === "gate" ? "CONTROL GATE" : m.kind === "boundary" ? "PUBLIC BOUNDARY" : "SOURCE"}
      </span>
      <span className="upf-node__title">{m.title}</span>
      <span className="upf-node__sub">{m.sub}</span>
      <Handle type="source" position={Position.Right} className="upf-handle" />
    </div>
  );
}

const nodeTypes: NodeTypes = { promotion: PromotionNode };
const edgeTypes: EdgeTypes = {};

// ─── Inner flow ───────────────────────────────────────────────────────

function FlowInner() {
  const [selectedId, setSelectedId] = useState<string | null>("ai-output");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const focusId = hoveredId ?? selectedId;
  const focusPath = useMemo(() => {
    if (!focusId) return new Set<string>();
    if (FAILURE_PATH.includes(focusId)) return new Set(FAILURE_PATH);
    if (CONTROL_PATH.includes(focusId)) return new Set(CONTROL_PATH);
    return new Set<string>([focusId]);
  }, [focusId]);

  const nodes = useMemo<FlowNode[]>(() => {
    const positions: Record<string, { x: number; y: number }> = {
      "ai-output": { x: 0, y: 170 },
      "fail-analyst": { x: 260, y: 30 },
      "fail-action": { x: 480, y: 30 },
      "fail-public": { x: 720, y: 30 },
      "fail-exec": { x: 960, y: 30 },
      "gate-validation": { x: 260, y: 290 },
      "gate-evidence": { x: 480, y: 290 },
      "gate-firewall": { x: 720, y: 290 },
      "gate-review": { x: 960, y: 290 },
      "public-boundary": { x: 1200, y: 170 },
    };
    return Object.values(META).map((meta) => {
      const id = meta.id;
      const inFocus = focusPath.has(id);
      return {
        id,
        position: positions[id],
        type: "promotion",
        data: {
          meta,
          active: id === selectedId || id === hoveredId,
          dim: focusId !== null && !inFocus,
        },
        draggable: false,
        selectable: true,
      };
    });
  }, [focusId, focusPath, hoveredId, selectedId]);

  const edges = useMemo<Edge[]>(() => {
    const make = (from: string, to: string, kind: "failure" | "control"): Edge => {
      const inFocus = focusPath.has(from) && focusPath.has(to);
      return {
        id: `${from}->${to}`,
        source: from,
        target: to,
        animated: kind === "control",
        type: kind === "failure" ? "straight" : "default",
        style:
          kind === "failure"
            ? {
                stroke: inFocus ? "var(--blocked-red)" : "rgba(252, 165, 165, 0.45)",
                strokeWidth: inFocus ? 2 : 1.4,
                strokeDasharray: "6 6",
              }
            : {
                stroke: inFocus ? "var(--ice-blue)" : "rgba(143, 216, 255, 0.45)",
                strokeWidth: inFocus ? 2 : 1.4,
              },
        markerEnd: {
          type: "arrowclosed" as const,
          width: 16,
          height: 16,
          color: kind === "failure" ? "var(--blocked-red)" : "var(--ice-blue)",
        },
        className: focusId !== null && !inFocus ? "upf-edge upf-edge--dim" : "upf-edge",
      };
    };
    const fail: Edge[] = [];
    for (let i = 0; i < FAILURE_PATH.length - 1; i++) {
      fail.push(make(FAILURE_PATH[i], FAILURE_PATH[i + 1], "failure"));
    }
    const ctrl: Edge[] = [];
    for (let i = 0; i < CONTROL_PATH.length - 1; i++) {
      ctrl.push(make(CONTROL_PATH[i], CONTROL_PATH[i + 1], "control"));
    }
    return [...fail, ...ctrl];
  }, [focusId, focusPath]);

  const handleNodeClick = useCallback((_: unknown, node: Node) => {
    setSelectedId((prev) => (prev === node.id ? null : node.id));
  }, []);

  const handlePaneClick = useCallback(() => setSelectedId(null), []);
  const handleNodeMouseEnter = useCallback((_: unknown, node: Node) => setHoveredId(node.id), []);
  const handleNodeMouseLeave = useCallback(() => setHoveredId(null), []);

  const inspected = selectedId ? META[selectedId] : null;

  return (
    <div className="upf-shell" aria-label="Uncontrolled vs governed AI promotion diagram">
      <div className="upf-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
          onNodeMouseEnter={handleNodeMouseEnter}
          onNodeMouseLeave={handleNodeMouseLeave}
          panOnDrag
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch
          zoomOnDoubleClick={false}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          proOptions={{ hideAttribution: true }}
          minZoom={0.4}
          maxZoom={1.4}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
        >
          <Background variant={BackgroundVariant.Dots} gap={28} size={1} color="rgba(143, 216, 255, 0.12)" />
          <Controls showInteractive={false} className="upf-controls" />
        </ReactFlow>
      </div>

      <aside className="upf-panel" aria-live="polite">
        {inspected ? (
          <>
            <p className="upf-panel__eyebrow">{
              inspected.kind === "failure"
                ? "Blocked path · uncontrolled promotion"
                : inspected.kind === "gate"
                  ? "Control gate · governance authority"
                  : inspected.kind === "boundary"
                    ? "Public boundary · ceiling"
                    : "Source · AI labor"
            }</p>
            <h3 className="upf-panel__title">{inspected.title}</h3>
            <p className="upf-panel__sub">{inspected.sub}</p>

            <dl className="upf-panel__dl">
              <dt>Why this stage is dangerous</dt>
              <dd>{inspected.whyDangerous}</dd>
              <dt>How HawkinsOperations blocks uncontrolled promotion</dt>
              <dd>{inspected.howBlocked}</dd>
              <dt>What proof or gate applies</dt>
              <dd>{inspected.proofOrGate}</dd>
              <dt>Inspect next</dt>
              <dd>{inspected.inspectNext}</dd>
            </dl>

            <p className="upf-panel__hint">Click another node to inspect. Click the empty canvas to clear.</p>
          </>
        ) : (
          <>
            <p className="upf-panel__eyebrow">Inspection panel</p>
            <h3 className="upf-panel__title">Click a node to inspect.</h3>
            <p className="upf-panel__sub">
              The top red path is the enterprise failure mode: uncontrolled promotion. The bottom
              ice-blue path is the HawkinsOperations control route through deterministic gates to
              the public boundary.
            </p>
            <ul className="upf-panel__legend">
              <li><span className="upf-dot upf-dot--failure" /> Blocked path · uncontrolled promotion</li>
              <li><span className="upf-dot upf-dot--gate" /> Control gate · governance authority</li>
              <li><span className="upf-dot upf-dot--boundary" /> Public boundary · ceiling held</li>
            </ul>
          </>
        )}
      </aside>
    </div>
  );
}

export default function UncontrolledPromotionFlow() {
  return (
    <ReactFlowProvider>
      <FlowInner />
    </ReactFlowProvider>
  );
}
