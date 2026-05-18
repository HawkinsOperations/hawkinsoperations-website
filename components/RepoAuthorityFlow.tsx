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
  type Node,
  type NodeProps,
  type NodeTypes,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

/**
 * RepoAuthorityFlow
 *
 * Interactive React Flow diagram for the repository authority section.
 *
 * Six repositories. Three planes. Authority flows down only.
 *   .github         · governance and reviewer routing
 *   platform        · runtime contracts, no fantasy claims
 *   detections      · source logic exists, but source is not proof
 *   validation      · deterministic checks, fixtures, verifier language
 *   proof           · evidence boundary, claim ceiling
 *   website         · rendering only, not proof
 */

type RepoMeta = {
  id: string;
  plane: "governance" | "runtime" | "authority" | "rendering";
  num: string;
  name: string;
  role: string;
  owns: string;
  neverOwns: string;
  claimBoundary: string;
  inspectNext: string;
};

const REPOS: Record<string, RepoMeta> = {
  github: {
    id: "github",
    plane: "governance",
    num: "01",
    name: ".github",
    role: "governance · reviewer routing",
    owns: "PR templates · CODEOWNERS · required checks · visible human review routing.",
    neverOwns: "Detection logic · validation results · evidence records · public claim wording.",
    claimBoundary: "Governance metadata does not promote any downstream claim.",
    inspectNext: "Visible human review before merge for claim-bearing changes.",
  },
  platform: {
    id: "platform",
    plane: "runtime",
    num: "02",
    name: "platform",
    role: "runtime contracts · no fantasy claims",
    owns: "Execution boundaries · runtime handling contracts · self-hosted runner config for CI.",
    neverOwns: "Source detection logic · proof records · public-facing wording.",
    claimBoundary:
      "Runtime-active, signal-observed, GPU CI proven, and model execution in CI remain blocked at this surface.",
    inspectNext: "Repository authority map · platform contract notes.",
  },
  detections: {
    id: "detections",
    plane: "authority",
    num: "03",
    name: "detections",
    role: "source logic · source is not proof",
    owns: "Detection rule, SPL, mapping source under version control with a stated owner.",
    neverOwns: "Test results · evidence records · public claim wording.",
    claimBoundary:
      "Source presence is not proof of runtime activity, fired signal, or production deployment.",
    inspectNext: "HO-DET-001 rule.yml · splunk.spl.",
  },
  validation: {
    id: "validation",
    plane: "authority",
    num: "04",
    name: "validation",
    role: "deterministic checks · fixtures · verifier language",
    owns: "Controlled positive and negative test cases · validator scripts · CI workflow.",
    neverOwns: "Public claim wording · runtime evidence beyond the controlled cycle.",
    claimBoundary:
      "Test passage does not prove runtime activity, observed signal, or public-safe runtime proof.",
    inspectNext: "HO-DET-001 validation-result.md · validation-cases.json.",
  },
  proof: {
    id: "proof",
    plane: "authority",
    num: "05",
    name: "proof",
    role: "evidence boundary · claim ceiling",
    owns: "Proof records · stated ceilings · supported wording · blocked wording.",
    neverOwns: "Detection logic · validation source · website rendering.",
    claimBoundary:
      "Evidence-linked is not automatically public-safe; promotion to public requires human review.",
    inspectNext: "HO-DET-001 proof record · Proof Pack 001 release.",
  },
  website: {
    id: "website",
    plane: "rendering",
    num: "06",
    name: "website",
    role: "rendering only · not proof",
    owns: "Bounded public wording · reviewer-visible routes · pointers back to repo evidence.",
    neverOwns: "Source · validation · runtime · evidence · disposition authority.",
    claimBoundary:
      "Website rendering is not proof. Stronger wording requires a separate evidence-backed promotion gate.",
    inspectNext: "Site contract verifier · blocked-claim scanner.",
  },
};

const AUTHORITY_EDGES: Array<[string, string, string]> = [
  ["detections", "validation", "feeds"],
  ["validation", "proof", "feeds"],
  ["proof", "website", "renders (read-only)"],
];
const OVERLAY_EDGES: Array<[string, string]> = [
  ["github", "detections"],
  ["github", "validation"],
  ["github", "proof"],
  ["platform", "validation"],
  ["platform", "proof"],
];

type FlowNode = Node<{ meta: RepoMeta; dim: boolean; active: boolean }>;

function RepoNode({ data, id }: NodeProps<FlowNode>) {
  const m = data.meta;
  const cls = [
    "raf-node",
    `raf-node--${m.plane}`,
    data.active ? "raf-node--active" : "",
    data.dim ? "raf-node--dim" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} data-node-id={id}>
      <Handle type="target" position={Position.Top} className="raf-handle" />
      <span className="raf-node__num">{m.num}</span>
      <span className="raf-node__name">{m.name}</span>
      <span className="raf-node__role">{m.role}</span>
      <span className="raf-node__plane">{m.plane.toUpperCase()}</span>
      <Handle type="source" position={Position.Bottom} className="raf-handle" />
    </div>
  );
}

const nodeTypes: NodeTypes = { repo: RepoNode };

function FlowInner() {
  const [selectedId, setSelectedId] = useState<string | null>("proof");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const focusId = hoveredId ?? selectedId;
  const focusNeighbors = useMemo(() => {
    if (!focusId) return new Set<string>();
    const set = new Set<string>([focusId]);
    for (const [a, b] of [...AUTHORITY_EDGES.map(([a, b]) => [a, b] as [string, string]), ...OVERLAY_EDGES]) {
      if (a === focusId) set.add(b);
      if (b === focusId) set.add(a);
    }
    return set;
  }, [focusId]);

  const positions: Record<string, { x: number; y: number }> = {
    github: { x: 60, y: 0 },
    platform: { x: 760, y: 0 },
    detections: { x: 0, y: 200 },
    validation: { x: 420, y: 200 },
    proof: { x: 840, y: 200 },
    website: { x: 420, y: 400 },
  };

  const nodes = useMemo<FlowNode[]>(
    () =>
      Object.values(REPOS).map((meta) => ({
        id: meta.id,
        position: positions[meta.id],
        type: "repo",
        data: {
          meta,
          active: meta.id === selectedId || meta.id === hoveredId,
          dim: focusId !== null && !focusNeighbors.has(meta.id),
        },
        draggable: false,
        selectable: true,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [focusId, focusNeighbors, hoveredId, selectedId],
  );

  const edges = useMemo<Edge[]>(() => {
    const authority: Edge[] = AUTHORITY_EDGES.map(([from, to, label]) => {
      const inFocus = focusNeighbors.has(from) && focusNeighbors.has(to);
      return {
        id: `${from}->${to}`,
        source: from,
        target: to,
        animated: true,
        label,
        style: {
          stroke: inFocus || focusId === null ? "var(--ice-blue)" : "rgba(143, 216, 255, 0.32)",
          strokeWidth: inFocus ? 2 : 1.6,
        },
        labelStyle: { fill: "var(--silver)", fontSize: 10, fontFamily: '"JetBrains Mono", monospace' },
        labelBgStyle: { fill: "rgba(8, 8, 10, 0.85)" },
        markerEnd: { type: "arrowclosed" as const, width: 14, height: 14, color: "var(--ice-blue)" },
        className: focusId !== null && !inFocus ? "raf-edge raf-edge--dim" : "raf-edge",
      };
    });
    const overlay: Edge[] = OVERLAY_EDGES.map(([from, to]) => {
      const inFocus = focusNeighbors.has(from) && focusNeighbors.has(to);
      return {
        id: `${from}->${to}`,
        source: from,
        target: to,
        type: "straight",
        style: {
          stroke: inFocus || focusId === null ? "rgba(220, 224, 232, 0.45)" : "rgba(220, 224, 232, 0.16)",
          strokeWidth: 1,
          strokeDasharray: "4 4",
        },
        className: focusId !== null && !inFocus ? "raf-edge raf-edge--dim" : "raf-edge raf-edge--overlay",
      };
    });
    return [...authority, ...overlay];
  }, [focusId, focusNeighbors]);

  const handleNodeClick = useCallback((_: unknown, node: Node) => {
    setSelectedId((prev) => (prev === node.id ? null : node.id));
  }, []);
  const handlePaneClick = useCallback(() => setSelectedId(null), []);
  const handleNodeMouseEnter = useCallback((_: unknown, node: Node) => setHoveredId(node.id), []);
  const handleNodeMouseLeave = useCallback(() => setHoveredId(null), []);

  const inspected = selectedId ? REPOS[selectedId] : null;

  return (
    <div className="raf-shell" aria-label="Repository authority directed graph">
      <div className="raf-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
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
          fitViewOptions={{ padding: 0.18 }}
          proOptions={{ hideAttribution: true }}
          minZoom={0.45}
          maxZoom={1.35}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
        >
          <Background variant={BackgroundVariant.Dots} gap={28} size={1} color="rgba(143, 216, 255, 0.10)" />
          <Controls showInteractive={false} className="raf-controls" />
        </ReactFlow>
      </div>

      <aside className="raf-panel" aria-live="polite">
        {inspected ? (
          <>
            <p className="raf-panel__eyebrow">
              {inspected.num} · {inspected.plane}
            </p>
            <h3 className="raf-panel__title">{inspected.name}</h3>
            <p className="raf-panel__role">{inspected.role}</p>

            <dl className="raf-panel__dl">
              <dt>Owns</dt>
              <dd>{inspected.owns}</dd>
              <dt>Must never own</dt>
              <dd>{inspected.neverOwns}</dd>
              <dt>Claim boundary</dt>
              <dd>{inspected.claimBoundary}</dd>
              <dt>Inspect next</dt>
              <dd>{inspected.inspectNext}</dd>
            </dl>
          </>
        ) : (
          <>
            <p className="raf-panel__eyebrow">Inspection panel</p>
            <h3 className="raf-panel__title">Click a repository to inspect.</h3>
            <p className="raf-panel__role">
              Six repositories. Three planes. Authority flows down only. detections → validation →
              proof feeds the chain. .github and platform overlay it. website renders the receipts;
              it does not author them.
            </p>
          </>
        )}
      </aside>
    </div>
  );
}

export default function RepoAuthorityFlow() {
  return (
    <ReactFlowProvider>
      <FlowInner />
    </ReactFlowProvider>
  );
}
