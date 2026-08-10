"use client";

import { useId, useMemo, useRef, type KeyboardEvent } from "react";
import {
  repositoryAuthorities,
  topologyEdges,
  topologyNodes,
  type TopologyNode,
  type TopologyNodeId,
} from "../../src/data/reviewerGuide";
import type { MachineSnapshot } from "../../src/lib/reviewerGuideMachine";

type SystemTopologyProps = {
  snapshot: MachineSnapshot;
  onSelectNode?: (nodeId: TopologyNodeId) => void;
  variant?: "full" | "mini" | "closing";
  label?: string;
  showAuthorityMap?: boolean;
  interactive?: boolean;
};

const controlledMiniNodeIds: TopologyNodeId[] = ["ai-labor", "validation", "claim-gate", "human-review"];
const blockedMiniNodeIds: TopologyNodeId[] = ["ai-labor", "validation", "claim-gate", "blocked"];
const mobileCoreNodeIds: TopologyNodeId[] = ["ai-labor", "source", "validation", "hoxline", "claim-gate"];
const mobilePublishNodeIds: TopologyNodeId[] = ["proof", "human-review", "public-output"];

function NodeMark({ node }: { node: TopologyNode }) {
  if (node.id === "ai-labor") {
    return (
      <g className="rg-topology__ai-mark" aria-hidden="true">
        <circle cx={node.x - 50} cy={node.y} r="19" />
        <circle cx={node.x - 50} cy={node.y} r="5" />
        <path d={`M ${node.x - 50} ${node.y - 28} V ${node.y - 20} M ${node.x - 50} ${node.y + 20} V ${node.y + 28} M ${node.x - 78} ${node.y} H ${node.x - 70} M ${node.x - 30} ${node.y} H ${node.x - 22}`} />
      </g>
    );
  }
  if (node.id === "source") {
    return (
      <g className="rg-topology__source-mark" aria-hidden="true">
        <path d={`M ${node.x - 66} ${node.y - 24} H ${node.x - 43} L ${node.x - 33} ${node.y - 14} V ${node.y + 24} H ${node.x - 66} Z`} />
        <path d={`M ${node.x - 43} ${node.y - 24} V ${node.y - 14} H ${node.x - 33}`} />
        <path d={`M ${node.x - 58} ${node.y - 2} H ${node.x - 41} M ${node.x - 58} ${node.y + 7} H ${node.x - 41}`} />
      </g>
    );
  }
  if (node.id === "validation") {
    return (
      <g className="rg-topology__validation-mark" aria-hidden="true">
        <path d={`M ${node.x - 70} ${node.y - 14} H ${node.x - 47} M ${node.x - 70} ${node.y + 14} H ${node.x - 47}`} />
        <circle cx={node.x - 60} cy={node.y - 14} r="5" />
        <circle cx={node.x - 60} cy={node.y + 14} r="5" />
        <path d={`M ${node.x - 45} ${node.y + 1} L ${node.x - 39} ${node.y + 7} L ${node.x - 27} ${node.y - 8}`} />
      </g>
    );
  }
  if (node.id === "hoxline") {
    return (
      <g className="rg-topology__hoxline-mark" aria-hidden="true">
        <path d={`M ${node.x - 50} ${node.y - 25} L ${node.x - 29} ${node.y - 13} V ${node.y + 13} L ${node.x - 50} ${node.y + 25} L ${node.x - 71} ${node.y + 13} V ${node.y - 13} Z`} />
        <path d={`M ${node.x - 61} ${node.y} H ${node.x - 39}`} />
      </g>
    );
  }
  if (node.id === "claim-gate") {
    return (
      <g className="rg-topology__gate-mark" aria-hidden="true">
        <path d={`M ${node.x - 56} ${node.y - 28} V ${node.y + 28}`} />
        <path d={`M ${node.x - 46} ${node.y - 28} V ${node.y + 28}`} />
        <circle cx={node.x - 51} cy={node.y} r="5" />
      </g>
    );
  }
  if (node.id === "human-review") {
    return (
      <g className="rg-topology__human-mark" aria-hidden="true">
        <circle cx={node.x - 50} cy={node.y} r="19" />
        <circle cx={node.x - 50} cy={node.y} r="6" />
      </g>
    );
  }
  if (node.id === "blocked") {
    return (
      <g className="rg-topology__blocked-mark" aria-hidden="true">
        <path d={`M ${node.x - 68} ${node.y - 18} L ${node.x - 32} ${node.y + 18} M ${node.x - 32} ${node.y - 18} L ${node.x - 68} ${node.y + 18}`} />
        <path d={`M ${node.x - 78} ${node.y} H ${node.x - 70} M ${node.x - 30} ${node.y} H ${node.x - 20}`} />
      </g>
    );
  }
  if (node.id === "proof") {
    return (
      <g className="rg-topology__proof-mark" aria-hidden="true">
        <rect x={node.x - 72} y={node.y - 23} width="29" height="34" rx="1" />
        <rect x={node.x - 67} y={node.y - 18} width="29" height="34" rx="2" />
        <path d={`M ${node.x - 60} ${node.y - 7} H ${node.x - 44} M ${node.x - 60} ${node.y} H ${node.x - 44} M ${node.x - 60} ${node.y + 7} H ${node.x - 48}`} />
      </g>
    );
  }
  if (node.id === "public-output") {
    return (
      <g className="rg-topology__terminal-mark" aria-hidden="true">
        <path d={`M ${node.x - 67} ${node.y - 22} H ${node.x - 42} V ${node.y + 22} H ${node.x - 67}`} />
        <path d={`M ${node.x - 57} ${node.y} H ${node.x - 34}`} />
        <path d={`M ${node.x - 37} ${node.y - 8} L ${node.x - 27} ${node.y} L ${node.x - 37} ${node.y + 8}`} />
      </g>
    );
  }
  return (
    <g className="rg-topology__node-mark" aria-hidden="true">
      <path d={`M ${node.x - 68} ${node.y - 21} H ${node.x - 59} M ${node.x - 68} ${node.y - 21} V ${node.y + 21} M ${node.x - 68} ${node.y + 21} H ${node.x - 59}`} />
      <circle cx={node.x - 49} cy={node.y} r="8" />
    </g>
  );
}

export default function SystemTopology({
  snapshot,
  onSelectNode,
  variant = "full",
  label = "HawkinsOperations governed system topology",
  showAuthorityMap = false,
  interactive = true,
}: SystemTopologyProps) {
  const instanceId = useId().replace(/:/g, "");
  const arrowId = `rg-arrow-${variant}-${instanceId}`;
  const glowId = `rg-token-glow-${variant}-${instanceId}`;
  const nodeRefs = useRef(new Map<TopologyNodeId, SVGGElement>());
  const visibleNodes = useMemo(
    () => {
      if (variant !== "mini") return topologyNodes;
      const miniNodeIds = snapshot.scenarioId === "controlled_validation" ? controlledMiniNodeIds : blockedMiniNodeIds;
      return topologyNodes.filter((node) => miniNodeIds.includes(node.id));
    },
    [snapshot.scenarioId, variant],
  );
  const miniActiveIndex = visibleNodes.findIndex((node) => node.id === snapshot.activeNodeId);
  const focusableNodeId = visibleNodes.some((node) => node.id === snapshot.selectedNodeId)
    ? snapshot.selectedNodeId
    : visibleNodes.some((node) => node.id === snapshot.activeNodeId)
      ? snapshot.activeNodeId
      : visibleNodes[0].id;

  const moveFocus = (currentId: TopologyNodeId, direction: -1 | 1) => {
    if (!interactive || !onSelectNode) return;
    const index = visibleNodes.findIndex((node) => node.id === currentId);
    const nextIndex = (index + direction + visibleNodes.length) % visibleNodes.length;
    const nextNode = visibleNodes[nextIndex];
    onSelectNode(nextNode.id);
    nodeRefs.current.get(nextNode.id)?.focus();
  };

  const onNodeKeyDown = (event: KeyboardEvent<SVGGElement>, nodeId: TopologyNodeId) => {
    if (!interactive || !onSelectNode) return;
    if (["ArrowRight", "ArrowDown"].includes(event.key)) {
      event.preventDefault();
      moveFocus(nodeId, 1);
    } else if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      moveFocus(nodeId, -1);
    } else if (event.key === "Home") {
      event.preventDefault();
      onSelectNode(visibleNodes[0].id);
      nodeRefs.current.get(visibleNodes[0].id)?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      const last = visibleNodes[visibleNodes.length - 1];
      onSelectNode(last.id);
      nodeRefs.current.get(last.id)?.focus();
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelectNode(nodeId);
    }
  };

  if (variant === "mini") {
    return (
      <div className="rg-mini-topology" data-topology-variant="mini">
        <svg viewBox="0 0 360 420" role="group" aria-label={label}>
          <title>Interactive HawkinsOperations system model</title>
          <desc>Four interactive checkpoints show AI labor moving through validation and a claim gate toward either a blocked termination or human review.</desc>
          <path className="rg-mini-topology__rail" d="M 64 56 V 350" />
          {visibleNodes.map((node, index) => {
            const y = 56 + index * 98;
            const status = snapshot.nodeStatuses[node.id];
            const selected = snapshot.selectedNodeId === node.id;
            return (
              <g
                key={node.id}
                ref={(element) => {
                  if (element) nodeRefs.current.set(node.id, element);
                }}
                role={interactive ? "button" : undefined}
                tabIndex={interactive ? (node.id === focusableNodeId ? 0 : -1) : undefined}
                aria-label={`Select ${node.label}`}
                aria-controls={interactive ? "reviewer-system-inspector" : undefined}
                aria-pressed={interactive ? selected : undefined}
                aria-current={snapshot.activeNodeId === node.id ? "step" : undefined}
                data-node-id={node.id}
                data-status={status}
                className="rg-mini-topology__node"
                onClick={interactive ? () => onSelectNode?.(node.id) : undefined}
                onKeyDown={interactive ? (event) => onNodeKeyDown(event, node.id) : undefined}
              >
                <rect className="rg-mini-topology__hit" x="36" y={y - 28} width="286" height="56" rx="2" />
                <circle cx="64" cy={y} r={node.id === "claim-gate" ? 17 : 11} />
                <text x="98" y={y - 4}>{node.shortLabel}</text>
                <text x="98" y={y + 18} className="rg-mini-topology__status">{status === "inactive" ? "pending" : status}</text>
              </g>
            );
          })}
          <circle className="rg-mini-topology__token" cx="64" cy={56 + (miniActiveIndex >= 0 ? miniActiveIndex : Math.min(3, Math.round(snapshot.progress * 3))) * 98} r="4" />
        </svg>
        <div className="rg-mini-topology__legend" aria-hidden="true"><span>AI = labor</span><span>Evidence = boundary</span><span>Human = authority</span></div>
      </div>
    );
  }

  return (
    <div className={`rg-topology rg-topology--${variant}`} data-interactive={interactive ? "true" : "false"} data-topology-state={snapshot.state} data-run-state={snapshot.runState} data-scenario={snapshot.scenarioId}>
      <svg viewBox="0 0 1440 560" role="group" aria-label={label}>
        <title>Interactive HawkinsOperations system topology</title>
        <desc>AI-assisted labor becomes source-controlled work, deterministic validation, Hoxline claim evaluation, evidence artifacts, human review, and bounded public output. Unsupported claims branch to a blocked route.</desc>
        <defs>
          <marker id={arrowId} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 8 4 L 0 8 Z" /></marker>
          <filter id={glowId} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>

        <g className="rg-topology__zones" aria-hidden="true">
          <text x="52" y="67">GENERATION</text><text x="276" y="67">ENGINEERING</text><text x="528" y="241">CONTROL</text><text x="774" y="415">EVIDENCE</text><text x="1030" y="415">AUTHORITY</text><text x="1256" y="415">RENDERING</text>
        </g>

        <g className="rg-topology__edges" aria-hidden="true">
          {topologyEdges.map((edge) => {
            const status = snapshot.edgeStatuses[edge.id];
            const selectedPath = edge.from === snapshot.selectedNodeId || edge.to === snapshot.selectedNodeId;
            return (
              <g key={edge.id} data-edge-id={edge.id} data-status={status} data-kind={edge.kind ?? "standard"} data-selected-path={selectedPath ? "true" : "false"}>
                <path className="rg-topology__edge-hit" d={edge.path} />
                <path className="rg-topology__edge" d={edge.path} markerEnd={`url(#${arrowId})`} />
                {status === "active" || status === "blocked" ? <circle className="rg-topology__edge-token" r="5" filter={`url(#${glowId})`}><animateMotion dur="1.1s" repeatCount="indefinite" path={edge.path} /></circle> : null}
              </g>
            );
          })}
        </g>

        <g className="rg-topology__nodes">
          {visibleNodes.map((node, index) => {
            const selected = snapshot.selectedNodeId === node.id;
            const related = topologyEdges.some(
              (edge) => (edge.from === snapshot.selectedNodeId && edge.to === node.id) || (edge.to === snapshot.selectedNodeId && edge.from === node.id),
            );
            return (
              <g
                key={node.id}
                ref={(element) => {
                  if (element) nodeRefs.current.set(node.id, element);
                }}
                role={interactive ? "button" : undefined}
                tabIndex={interactive ? (node.id === focusableNodeId ? 0 : -1) : undefined}
                aria-label={`Select ${node.label}. ${node.doesNotOwn}`}
                aria-controls={interactive ? "reviewer-system-inspector" : undefined}
                aria-pressed={interactive ? selected : undefined}
                aria-current={snapshot.activeNodeId === node.id ? "step" : undefined}
                data-node-id={node.id}
                data-status={snapshot.nodeStatuses[node.id]}
                data-selected={selected ? "true" : "false"}
                data-related={related ? "true" : "false"}
                data-tone={node.tone}
                className="rg-topology__node"
                onClick={interactive ? () => onSelectNode?.(node.id) : undefined}
                onKeyDown={interactive ? (event) => onNodeKeyDown(event, node.id) : undefined}
              >
                <rect className="rg-topology__node-hit" x={node.x - 76} y={node.y - 42} width="166" height="84" rx="8" />
                <NodeMark node={node} />
                <text className="rg-topology__node-index" x={node.x - 23} y={node.y - 14}>{String(index + 1).padStart(2, "0")}</text>
                <text className="rg-topology__node-label" x={node.x - 23} y={node.y + 5}>{node.shortLabel}</text>
                <text className="rg-topology__node-state" x={node.x - 23} y={node.y + 24}>{snapshot.nodeStatuses[node.id]}</text>
              </g>
            );
          })}
        </g>
      </svg>

      <ol className="rg-topology__mobile-rail" aria-label="System stages and claim-decision branches">
        {visibleNodes.filter((node) => mobileCoreNodeIds.includes(node.id)).map((node) => {
          const selected = snapshot.selectedNodeId === node.id;
          const index = topologyNodes.findIndex((candidate) => candidate.id === node.id);
          return (
            <li key={node.id} data-mobile-node-id={node.id} data-status={snapshot.nodeStatuses[node.id]} data-selected={selected ? "true" : "false"}>
              <button
                type="button"
                disabled={!interactive}
                aria-pressed={interactive ? selected : undefined}
                aria-current={snapshot.activeNodeId === node.id ? "step" : undefined}
                onClick={interactive ? () => onSelectNode?.(node.id) : undefined}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{node.shortLabel}</strong>
                <small>{snapshot.nodeStatuses[node.id]}</small>
              </button>
            </li>
          );
        })}
        <li className="rg-topology__mobile-branch">
          <p>Claim decision branches here</p>
          <div className="rg-topology__mobile-branch-lanes">
            <ol aria-label="Blocked claim termination">
              {visibleNodes.filter((node) => node.id === "blocked").map((node) => (
                <li key={node.id} data-mobile-node-id={node.id} data-status={snapshot.nodeStatuses[node.id]} data-selected={snapshot.selectedNodeId === node.id ? "true" : "false"}>
                  <span>Blocked termination</span>
                  <button type="button" disabled={!interactive} aria-pressed={interactive ? snapshot.selectedNodeId === node.id : undefined} aria-current={snapshot.activeNodeId === node.id ? "step" : undefined} onClick={() => onSelectNode?.(node.id)}><span>06</span><strong>{node.shortLabel}</strong><small>{snapshot.nodeStatuses[node.id]}</small></button>
                </li>
              ))}
            </ol>
            <ol aria-label="Within-ceiling continuation">
              {visibleNodes.filter((node) => mobilePublishNodeIds.includes(node.id)).map((node) => {
                const selected = snapshot.selectedNodeId === node.id;
                const index = topologyNodes.findIndex((candidate) => candidate.id === node.id);
                return <li key={node.id} data-mobile-node-id={node.id} data-status={snapshot.nodeStatuses[node.id]} data-selected={selected ? "true" : "false"}><span>{node.id === "proof" ? "Within ceiling" : ""}</span><button type="button" disabled={!interactive} aria-pressed={interactive ? selected : undefined} aria-current={snapshot.activeNodeId === node.id ? "step" : undefined} onClick={() => onSelectNode?.(node.id)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{node.shortLabel}</strong><small>{snapshot.nodeStatuses[node.id]}</small></button></li>;
              })}
            </ol>
          </div>
        </li>
      </ol>
      <p className="rg-topology__keyboard-hint">{interactive ? "Select a node. Use arrow keys to move through the topology." : "Final bounded state: human review remains the active authority gate."}</p>
      {showAuthorityMap ? (
        <aside className="rg-topology__authority-map" aria-label="Seven repository authority planes">
          <p><strong>7 repository authorities</strong><span>Functionally connected. Never interchangeable.</span></p>
          <ul>{repositoryAuthorities.map((repository) => <li key={repository.label}><a href={repository.href} target="_blank" rel="noopener noreferrer"><strong>{repository.label}</strong><span>{repository.authority}</span></a></li>)}</ul>
        </aside>
      ) : null}
    </div>
  );
}
