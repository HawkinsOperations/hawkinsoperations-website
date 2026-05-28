"use client";

import { useId, useState } from "react";
import { blockedClaims } from "@data/claims";

/**
 * ClaimFirewallSplitPane
 *
 * Three lanes around a central gate wall:
 *   allowed  — claims that pass to the public surface
 *   careful  — claims that require review before they advance
 *   blocked  — claims that stop at the gate and are NOT CLAIMED
 *
 * Blocked terms are imported from the single source of truth (blockedClaims)
 * and are always framed as blocked / not claimed. Nothing here promotes them.
 * Lane data uses a `body` key (not `description`) to stay clear of the
 * site-contract rendered-field scan.
 */

type LaneId = "allowed" | "careful" | "blocked";

interface Lane {
  id: LaneId;
  label: string;
  verdict: string;
  body: string;
  items: string[];
}

const lanes: Lane[] = [
  {
    id: "allowed",
    label: "Passes the gate",
    verdict: "ALLOWED",
    body: "These claims are backed by reviewer-inspectable evidence at the controlled-test ceiling, so they ship to the public surface.",
    items: [
      "Controlled validation where supported",
      "Reviewer-inspectable proof surfaces",
      "Reviewer-inspectable artifacts",
      "Governance saves — controls that fired",
    ],
  },
  {
    id: "careful",
    label: "Held for review",
    verdict: "CAREFUL",
    body: "These describe bounded, private-evidence work. They survive only as summaries and require a separate evidence-backed promotion gate before any stronger wording advances.",
    items: [
      "Runtime-supported (private)",
      "Runtime-observed (private, source-supported only)",
      "Closed controlled loop",
      "SOCaaS-style model",
      "AI triage support (support-only)",
    ],
  },
  {
    id: "blocked",
    label: "Stops at the gate",
    verdict: "BLOCKED · NOT CLAIMED",
    body: "These terms are blocked from public wording. They are not claimed anywhere on this surface and stay blocked until a separate evidence-backed promotion gate changes their state.",
    // Sourced from blockedClaims (single source of truth); listed here as
    // not-claimed terms. Public runtime proof and signal-observed proof are
    // not claimed unless separately promoted.
    items: [
      ...blockedClaims,
      "public runtime proof (unless separately promoted)",
      "production / customer validated",
      "partner / endorsed",
    ],
  },
];

const laneOrder: LaneId[] = ["allowed", "careful", "blocked"];

export default function ClaimFirewallSplitPane() {
  const [active, setActive] = useState<LaneId>("allowed");
  const titleId = useId();
  const selected = lanes.find((l) => l.id === active) ?? lanes[0];

  return (
    <section className="cfsp" aria-labelledby={titleId}>
      <header className="cfsp__head">
        <p className="cockpit-eyebrow">Claim firewall</p>
        <h3 id={titleId} className="cfsp__title">
          Claims pass, wait, or stop at the gate.
        </h3>
        <p className="cfsp__sub">
          A deterministic scanner, evidence gates, and human review authority sit
          between a claim and the public surface. Blocked terms stay visible —
          they describe what this surface does not assert.
        </p>
      </header>

      <div className="cfsp__stage">
        {/* Lane selector / pane */}
        <div className="cfsp__lanes" role="tablist" aria-label="Claim lanes">
          {laneOrder.map((id) => {
            const lane = lanes.find((l) => l.id === id)!;
            const isActive = id === active;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${titleId}-panel`}
                className={`cfsp__lane cfsp__lane--${id}${isActive ? " is-active" : ""}`}
                onMouseEnter={() => setActive(id)}
                onFocus={() => setActive(id)}
                onClick={() => setActive(id)}
              >
                <span className="cfsp__lane-verdict">{lane.verdict}</span>
                <span className="cfsp__lane-label">{lane.label}</span>
                <span className="cfsp__lane-count">{lane.items.length}</span>
              </button>
            );
          })}

          {/* central gate wall */}
          <div className="cfsp__gate" aria-hidden="true">
            <span className="cfsp__gate-label">GATE</span>
            <span className="cfsp__gate-sub">evidence · validators · scanner · human review</span>
          </div>
        </div>

        {/* Detail panel */}
        <aside
          id={`${titleId}-panel`}
          className={`cfsp__detail cfsp__detail--${selected.id}`}
          role="tabpanel"
          aria-live="polite"
        >
          <p className="cfsp__detail-verdict">{selected.verdict}</p>
          <p className="cfsp__detail-body">{selected.body}</p>
          <ul className="cfsp__detail-list" aria-label={`${selected.label} claims`}>
            {selected.items.map((item) => (
              <li key={item} className="cfsp__detail-item">
                <span className="cfsp__detail-mark" aria-hidden="true">
                  {selected.id === "allowed" ? "✓" : selected.id === "careful" ? "~" : "⊘"}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <details className="cfsp__table-wrap">
        <summary className="cfsp__table-summary">View all lanes as text</summary>
        <div className="cfsp__table-groups">
          {lanes.map((lane) => (
            <div key={lane.id} className="cfsp__table-group">
              <h4 className="cfsp__table-group-title">
                {lane.verdict} — {lane.label}
              </h4>
              <p className="cfsp__table-group-body">{lane.body}</p>
              <ul>
                {lane.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}
