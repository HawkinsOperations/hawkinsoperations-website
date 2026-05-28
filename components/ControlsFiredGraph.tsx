"use client";

import { useId, useMemo, useState } from "react";
import {
  publicGovernanceSaves,
  governanceCategoryLabels,
  governanceCategoryDescriptions,
  governanceSavesSummary,
  type GovernanceSaveCategory,
} from "@data/governanceSaves";

const categoryOrder: GovernanceSaveCategory[] = [
  "claim-boundary",
  "runtime-boundary",
  "validator-hardening",
  "ai-authority",
  "merge-authority",
  "evidence-protection",
  "release-gate",
  "branch-hygiene",
  "workflow-hardening",
];

interface CategoryDatum {
  category: GovernanceSaveCategory;
  label: string;
  description: string;
  count: number;
  drift: string;
  control: string;
  matters: string;
  representativeId: string;
}

function buildCategoryData(): CategoryDatum[] {
  return categoryOrder.map((category) => {
    const matches = publicGovernanceSaves.filter((save) => save.category === category);
    const rep = matches[0];
    return {
      category,
      label: governanceCategoryLabels[category],
      description: governanceCategoryDescriptions[category],
      count: matches.length,
      drift: rep?.drift ?? "",
      control: rep?.control ?? "",
      matters: rep?.matters ?? "",
      representativeId: rep?.id ?? "",
    };
  });
}

const VIEW = 600;
const CENTER = VIEW / 2;
const INNER_RADIUS = 132;
const MAX_BAR = 92;
const NODE_RADIUS = 246;
const SECTOR_GAP_DEG = 4;

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function sectorPath(
  rInner: number,
  rOuter: number,
  startDeg: number,
  endDeg: number,
) {
  const a = polar(CENTER, CENTER, rInner, startDeg);
  const b = polar(CENTER, CENTER, rOuter, startDeg);
  const c = polar(CENTER, CENTER, rOuter, endDeg);
  const d = polar(CENTER, CENTER, rInner, endDeg);
  const large = endDeg - startDeg <= 180 ? 0 : 1;
  return [
    `M ${a.x.toFixed(2)} ${a.y.toFixed(2)}`,
    `L ${b.x.toFixed(2)} ${b.y.toFixed(2)}`,
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${c.x.toFixed(2)} ${c.y.toFixed(2)}`,
    `L ${d.x.toFixed(2)} ${d.y.toFixed(2)}`,
    `A ${rInner} ${rInner} 0 ${large} 0 ${a.x.toFixed(2)} ${a.y.toFixed(2)}`,
    "Z",
  ].join(" ");
}

export default function ControlsFiredGraph() {
  const data = useMemo(() => buildCategoryData(), []);
  const maxCount = useMemo(
    () => Math.max(1, ...data.map((d) => d.count)),
    [data],
  );
  const [selectedIdx, setSelectedIdx] = useState(0);
  const titleId = useId();
  const descId = useId();

  const sliceDeg = 360 / data.length;
  const selected = data[selectedIdx];

  return (
    <div className="cfg" aria-labelledby={titleId} aria-describedby={descId}>
      <header className="cfg__head">
        <div>
          <p className="cfg__eyebrow">Governance Saves · proof of value</p>
          <h3 id={titleId} className="cfg__title">
            Controls Fired Before Bad Truth Shipped
          </h3>
          <p id={descId} className="cfg__sub">
            {governanceSavesSummary.publicRenderedCount} public-facing records from{" "}
            {governanceSavesSummary.rangeLabel} source range. Private-only records are
            excluded from this surface.
          </p>
        </div>
        <a className="cfg__cta" href="/proof/governance-saves/">
          Open explorer <span aria-hidden="true">→</span>
        </a>
      </header>

      <div className="cfg__stage">
        <div className="cfg__chart-wrap">
          <svg
            className="cfg__chart"
            viewBox={`0 0 ${VIEW} ${VIEW}`}
            role="img"
            aria-label={`Radial bar chart of ${data.length} governance-save categories. Highest count: ${maxCount}.`}
          >
            <defs>
              <radialGradient id="cfgCoreGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8FD8FF" stopOpacity="0.32" />
                <stop offset="60%" stopColor="#8FD8FF" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#03060B" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="cfgBarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8FD8FF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.55" />
              </linearGradient>
              <linearGradient id="cfgBarGradActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="100%" stopColor="#8FD8FF" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="cfgSteel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EEF4FA" />
                <stop offset="55%" stopColor="#8A96A7" />
                <stop offset="100%" stopColor="#2A3340" />
              </linearGradient>
            </defs>

            <circle
              cx={CENTER}
              cy={CENTER}
              r={INNER_RADIUS + MAX_BAR + 36}
              fill="url(#cfgCoreGrad)"
            />

            <circle
              cx={CENTER}
              cy={CENTER}
              r={INNER_RADIUS - 12}
              className="cfg__ring cfg__ring--outer"
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              r={NODE_RADIUS + 18}
              className="cfg__ring cfg__ring--perimeter"
            />

            {data.map((d, i) => {
              const start = i * sliceDeg + SECTOR_GAP_DEG / 2;
              const end = (i + 1) * sliceDeg - SECTOR_GAP_DEG / 2;
              const rOuter = INNER_RADIUS + (d.count / maxCount) * MAX_BAR;
              const active = i === selectedIdx;
              return (
                <path
                  key={`bar-${d.category}`}
                  d={sectorPath(INNER_RADIUS, rOuter, start, end)}
                  className={`cfg__bar${active ? " cfg__bar--active" : ""}`}
                  fill={active ? "url(#cfgBarGradActive)" : "url(#cfgBarGrad)"}
                  style={{ animationDelay: `${i * 70}ms` }}
                />
              );
            })}

            {data.map((d, i) => {
              const mid = i * sliceDeg + sliceDeg / 2;
              const p = polar(CENTER, CENTER, NODE_RADIUS, mid);
              const labelP = polar(CENTER, CENTER, NODE_RADIUS + 38, mid);
              const active = i === selectedIdx;
              return (
                <g key={`node-${d.category}`} className="cfg__node-group">
                  <line
                    x1={polar(CENTER, CENTER, INNER_RADIUS + (d.count / maxCount) * MAX_BAR, mid).x}
                    y1={polar(CENTER, CENTER, INNER_RADIUS + (d.count / maxCount) * MAX_BAR, mid).y}
                    x2={p.x}
                    y2={p.y}
                    className={`cfg__spoke${active ? " cfg__spoke--active" : ""}`}
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={active ? 8 : 5}
                    className={`cfg__node${active ? " cfg__node--active" : ""}`}
                  />
                  <text
                    x={labelP.x}
                    y={labelP.y}
                    className={`cfg__node-count${active ? " cfg__node-count--active" : ""}`}
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {d.count}
                  </text>
                </g>
              );
            })}

            <g className="cfg__core">
              <circle cx={CENTER} cy={CENTER} r="84" className="cfg__core-disc" />
              <text
                x={CENTER}
                y={CENTER - 6}
                textAnchor="middle"
                className="cfg__core-num"
                fill="url(#cfgSteel)"
              >
                {governanceSavesSummary.publicRenderedCount}
              </text>
              <text
                x={CENTER}
                y={CENTER + 22}
                textAnchor="middle"
                className="cfg__core-label"
              >
                controls fired
              </text>
              <text
                x={CENTER}
                y={CENTER + 40}
                textAnchor="middle"
                className="cfg__core-sub"
              >
                public-facing
              </text>
            </g>
          </svg>
        </div>

        <aside
          className="cfg__detail"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="cfg__detail-eyebrow">
            <span className="cfg__detail-dot" aria-hidden="true" />
            Category {selectedIdx + 1} of {data.length}
          </p>
          <h4 className="cfg__detail-title">{selected.label}</h4>
          <p className="cfg__detail-count">
            <span className="cfg__detail-num">{selected.count}</span>
            <span className="cfg__detail-unit">controls fired</span>
          </p>
          <p className="cfg__detail-desc">{selected.description}</p>

          <dl className="cfg__detail-list">
            <div className="cfg__detail-row">
              <dt>Risk prevented</dt>
              <dd>{selected.drift}</dd>
            </div>
            <div className="cfg__detail-row">
              <dt>Control that fired</dt>
              <dd>{selected.control}</dd>
            </div>
            <div className="cfg__detail-row">
              <dt>Why it matters</dt>
              <dd>{selected.matters}</dd>
            </div>
            {selected.representativeId ? (
              <div className="cfg__detail-row cfg__detail-row--meta">
                <dt>Representative record</dt>
                <dd>{selected.representativeId}</dd>
              </div>
            ) : null}
          </dl>
        </aside>
      </div>

      <ul className="cfg__legend" role="list" aria-label="Category selector">
        {data.map((d, i) => {
          const active = i === selectedIdx;
          return (
            <li key={`leg-${d.category}`}>
              <button
                type="button"
                className={`cfg__legend-btn${active ? " cfg__legend-btn--active" : ""}`}
                aria-pressed={active}
                onMouseEnter={() => setSelectedIdx(i)}
                onFocus={() => setSelectedIdx(i)}
                onClick={() => setSelectedIdx(i)}
              >
                <span className="cfg__legend-dot" aria-hidden="true" />
                <span className="cfg__legend-label">{d.label}</span>
                <span className="cfg__legend-count">{d.count}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <details className="cfg__table-wrap">
        <summary className="cfg__table-summary">View as table</summary>
        <table className="cfg__table">
          <caption className="cfg__sr-only">
            Controls fired by category across {governanceSavesSummary.publicRenderedCount} public-facing records.
          </caption>
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Count</th>
              <th scope="col">What it covers</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={`row-${d.category}`}>
                <th scope="row">{d.label}</th>
                <td>{d.count}</td>
                <td>{d.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="cfg__table-footnote">
          Private-only records are excluded from this surface.
        </p>
      </details>
    </div>
  );
}
