"use client";

import { useId, useState } from "react";

/**
 * RuntimeBoundaryVisual
 *
 * A sealed vertical proof tower. Each level is a rung from controlled
 * validation up to production/customer/fleet. Supported rungs glow; blocked
 * rungs read as sealed gates, not merely inactive. Selecting a level reveals
 * what it means and what it does not prove.
 *
 * Blocked-term wording (signal-observed, production-ready, fleet-wide,
 * autonomous SOC) appears only inside blocked / not-claimed context, framed
 * as not claimed. Public runtime proof remains blocked at this surface.
 */

type Tone = "supported" | "partial" | "blocked";

interface Level {
  rank: string;
  label: string;
  status: string;
  tone: Tone;
  means: string;
  notProve: string;
}

const levels: Level[] = [
  {
    rank: "01",
    label: "Controlled validation",
    status: "SUPPORTED",
    tone: "supported",
    means:
      "Validation packages, controlled fixtures, and deterministic verifiers run on every PR. This is the strongest publicly supported tier.",
    notProve: "It does not prove runtime activation or any signal observation.",
  },
  {
    rank: "02",
    label: "Runtime path initialized",
    status: "SOURCE-VISIBLE",
    tone: "supported",
    means:
      "Runtime contracts, truth-spine schemas, and case-packet structures exist in source. Initialization is repo-visible.",
    notProve: "Source presence is not runtime; nothing here is claimed as executed in production.",
  },
  {
    rank: "03",
    label: "Runtime-supported (private)",
    status: "PARTIAL",
    tone: "partial",
    means:
      "Private runtime support is acknowledged in boundary docs (e.g. the RS003 route marker). Evidence stays private; public status remains BLOCKED_PENDING_REVIEW.",
    notProve: "Public runtime proof is blocked; the private marker is not a public claim.",
  },
  {
    rank: "04",
    label: "Runtime-observed (private)",
    status: "PARTIAL",
    tone: "partial",
    means:
      "Mirrored visibility and private observation surfaces exist as bounded summaries, only where source-supported. Raw evidence stays outside public repos.",
    notProve: "Public NDR, cross-source, and signal-observed proof are not claimed from this surface.",
  },
  {
    rank: "05",
    label: "Public runtime proof",
    status: "BLOCKED",
    tone: "blocked",
    means:
      "This rung is a sealed gate. Public runtime claims require separate capture, verifier, checklist, and human approval before anything advances.",
    notProve:
      "Runtime-active, signal-observed, and public-safe runtime proof are blocked and not claimed until a separate promotion gate clears them.",
  },
  {
    rank: "06",
    label: "Production / customer / fleet",
    status: "BLOCKED",
    tone: "blocked",
    means: "This rung is a sealed gate held above every other surface.",
    notProve:
      "Production-ready, customer-validated, partner-endorsed, fleet-wide, and autonomous SOC claims are blocked and not made anywhere on this surface.",
  },
];

const mark: Record<Tone, string> = {
  supported: "●",
  partial: "◐",
  blocked: "⊘",
};

export default function RuntimeBoundaryVisual() {
  const [active, setActive] = useState(0);
  const titleId = useId();
  const selected = levels[active];

  return (
    <section className="rbv" aria-labelledby={titleId}>
      <header className="rbv__head">
        <p className="cockpit-eyebrow">Runtime boundary</p>
        <h3 id={titleId} className="rbv__title">
          The runtime proof tower — what survives, what stays sealed.
        </h3>
        <p className="rbv__sub">
          Each level names a stronger runtime status. The public surface holds at
          controlled validation; higher rungs are sealed gates that require
          separate evidence and human approval.
        </p>
      </header>

      <div className="rbv__stage">
        <ol className="rbv__tower" aria-label="Runtime proof boundary levels">
          {levels.map((level, i) => {
            const isActive = i === active;
            return (
              <li key={level.rank} className="rbv__rung-wrap">
                <button
                  type="button"
                  aria-pressed={isActive}
                  className={`rbv__rung rbv__rung--${level.tone}${isActive ? " is-active" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="rbv__rung-rank">{level.rank}</span>
                  <span className="rbv__rung-mark" aria-hidden="true">{mark[level.tone]}</span>
                  <span className="rbv__rung-label">{level.label}</span>
                  <span className={`rbv__rung-status rbv__rung-status--${level.tone}`}>
                    {level.status}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <aside className={`rbv__detail rbv__detail--${selected.tone}`} aria-live="polite">
          <p className="rbv__detail-rank">Level {selected.rank}</p>
          <h4 className="rbv__detail-title">{selected.label}</h4>
          <span className={`rbv__detail-status rbv__detail-status--${selected.tone}`}>
            {selected.status}
          </span>
          <dl className="rbv__detail-list">
            <div>
              <dt>What it means</dt>
              <dd>{selected.means}</dd>
            </div>
            <div>
              <dt>What it does not prove</dt>
              <dd>{selected.notProve}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <details className="rbv__table-wrap">
        <summary className="rbv__table-summary">View levels as text</summary>
        <table className="rbv__table">
          <caption className="cfg__sr-only">Runtime proof boundary levels.</caption>
          <thead>
            <tr>
              <th scope="col">Level</th>
              <th scope="col">Status</th>
              <th scope="col">What it does not prove</th>
            </tr>
          </thead>
          <tbody>
            {levels.map((level) => (
              <tr key={level.rank}>
                <th scope="row">{level.rank} · {level.label}</th>
                <td>{level.status}</td>
                <td>{level.notProve}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </section>
  );
}
