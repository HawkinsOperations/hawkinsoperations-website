"use client";

import { topologyNode } from "../../src/data/reviewerGuide";
import type { MachineSnapshot } from "../../src/lib/reviewerGuideMachine";

export default function SystemInspector({ snapshot }: { snapshot: MachineSnapshot }) {
  const node = topologyNode(snapshot.selectedNodeId);
  const isCurrent = snapshot.activeNodeId === node.id;

  return (
    <aside
      id="reviewer-system-inspector"
      className="rg-inspector"
      aria-label="Selected system stage inspector"
      aria-live="polite"
      data-node={node.id}
      data-current={isCurrent ? "true" : "false"}
    >
      <div className="rg-inspector__head">
        <div>
          <span>Selected stage</span>
          <h3>{node.label}</h3>
        </div>
        <strong>{isCurrent ? "Current path" : "Inspecting"}</strong>
      </div>
      <p className="rg-inspector__owner"><span>Owner</span>{node.owner}</p>
      <dl className="rg-inspector__facts">
        <div><dt>Input</dt><dd>{node.input}</dd></div>
        <div><dt>Action</dt><dd>{node.action}</dd></div>
        <div><dt>Artifact exits</dt><dd>{node.output}</dd></div>
        <div><dt>Authority</dt><dd>{node.authority}</dd></div>
        <div className="rg-inspector__limit"><dt>Does not own</dt><dd>{node.doesNotOwn}</dd></div>
      </dl>
      {node.href && node.reviewLabel ? (
        <a
          className="rg-inspector__route"
          href={node.href}
          target={node.href.startsWith("http") ? "_blank" : undefined}
          rel={node.href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          <span>Review</span>
          <strong>{node.reviewLabel}</strong>
          <span aria-hidden="true">↗</span>
        </a>
      ) : null}
      <p className="rg-inspector__scenario">
        <span>Scenario state</span>
        <strong>{snapshot.step.label}</strong>
        <small>{snapshot.step.explanation}</small>
      </p>
    </aside>
  );
}
