import { reviewerRoutes } from "@data/reviewerRoutes";

/**
 * Three reviewer routes, three different visual forms.
 *
 *   Executive  — horizontal timeline strip (3 stops).
 *   Proof      — small DAG inspection (source → validation → proof → render).
 *   Technical  — compact matrix preview (surfaces × promotion gates).
 *
 * Routes share underlying data (`reviewerRoutes`) but each renders a distinct
 * visual to avoid the repeated-square-card pattern the brief forbids.
 */

function ExecutiveVisual({ items }: { items: string[] }) {
  const points = items.slice(0, 3);
  return (
    <svg viewBox="0 0 340 80" className="review-route-selector__svg" role="img" aria-label="Executive timeline: three stops">
      <defs>
        <marker id="rrs-exec-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--electric-blue-bright)" />
        </marker>
      </defs>
      <line x1={28} y1={40} x2={312} y2={40} stroke="var(--diagram-line-strong)" strokeWidth={2} />
      {points.map((label, i) => {
        const cx = 28 + (284 / Math.max(points.length - 1, 1)) * i;
        return (
          <g key={label}>
            <circle cx={cx} cy={40} r={7} fill={i === points.length - 1 ? "var(--silver-bright)" : "var(--electric-blue)"} stroke="var(--electric-blue-bright)" strokeWidth={1.4} />
            <text x={cx} y={22} fontSize={9} fontFamily='"JetBrains Mono", monospace' fill="var(--electric-blue-bright)" textAnchor="middle" letterSpacing="2">{String(i + 1).padStart(2, "0")}</text>
            <text x={cx} y={66} fontSize={10} fontFamily='Inter, ui-sans-serif, system-ui, sans-serif' fill="var(--silver)" textAnchor="middle">{label.split(" ").slice(0, 3).join(" ")}</text>
            {i < points.length - 1 && (
              <line x1={cx + 8} y1={40} x2={cx + (284 / Math.max(points.length - 1, 1)) - 9} y2={40} stroke="var(--electric-blue-bright)" strokeWidth={1.4} markerEnd="url(#rrs-exec-arrow)" />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function ProofVisual() {
  const ids = [
    { x: 36, label: "src" },
    { x: 130, label: "val" },
    { x: 224, label: "proof" },
    { x: 318, label: "render" },
  ];
  return (
    <svg viewBox="0 0 340 110" className="review-route-selector__svg" role="img" aria-label="Proof inspection mini-DAG">
      <defs>
        <marker id="rrs-proof-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--electric-blue-bright)" />
        </marker>
      </defs>
      {ids.map((n, i) => {
        const cy = i < 3 ? 36 : 88;
        const isRender = i === 3;
        return (
          <g key={n.label}>
            <rect x={n.x - 28} y={cy - 14} width={56} height={28} rx={4} fill="rgba(8,13,22,0.94)" stroke={isRender ? "var(--ice-blue)" : "var(--electric-blue)"} strokeWidth={1.4} />
            <text x={n.x} y={cy + 4} fontSize={10} fontFamily='"JetBrains Mono", monospace' fill={isRender ? "var(--ice-blue)" : "var(--silver-bright)"} textAnchor="middle" letterSpacing="1.5">{n.label}</text>
            {i > 0 && i < 3 && (
              <line x1={ids[i - 1].x + 28} y1={36} x2={n.x - 30} y2={36} stroke="var(--electric-blue-bright)" strokeWidth={1.4} markerEnd="url(#rrs-proof-arrow)" />
            )}
          </g>
        );
      })}
      <polyline points="252,50 252,72 318,72 318,74" fill="none" stroke="var(--ice-blue)" strokeWidth={1.4} markerEnd="url(#rrs-proof-arrow)" />
      <text x={20} y={106} fontSize={8} fontFamily='"JetBrains Mono", monospace' fill="var(--muted)" letterSpacing="2">SOURCE → VALIDATION → PROOF · RENDER ≠ AUTHORITY</text>
    </svg>
  );
}

function TechnicalVisual() {
  const inputNodes = [
    { x: 58, label: "Source" },
    { x: 170, label: "Fixtures" },
    { x: 282, label: "Proof" },
  ];
  const gateNodes = [
    { x: 76, label: "Scanner" },
    { x: 170, label: "CI" },
    { x: 264, label: "Ceiling" },
  ];
  return (
    <svg viewBox="0 0 340 126" className="review-route-selector__svg" role="img" aria-label="Technical route: source and fixtures feed proof; scanner, CI, and ceiling gate stronger wording">
      <defs>
        <marker id="rrs-tech-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--electric-blue-bright)" />
        </marker>
      </defs>

      <text x={18} y={16} fontSize={8} fontFamily='"JetBrains Mono", monospace' fill="var(--electric-blue-bright)" letterSpacing="2">INPUTS</text>
      <text x={18} y={72} fontSize={8} fontFamily='"JetBrains Mono", monospace' fill="var(--muted)" letterSpacing="2">GATES</text>
      {inputNodes.map((node, i) => (
        <g key={node.label}>
          <rect x={node.x - 38} y={26} width={76} height={26} rx={4} fill="rgba(8,13,22,0.94)" stroke="var(--electric-blue)" strokeWidth={1.3} />
          <text x={node.x} y={43} fontSize={10} fontFamily='"JetBrains Mono", monospace' fill="var(--silver-bright)" textAnchor="middle">{node.label}</text>
          {i < inputNodes.length - 1 && (
            <line x1={node.x + 40} y1={39} x2={inputNodes[i + 1].x - 42} y2={39} stroke="var(--electric-blue-bright)" strokeWidth={1.3} markerEnd="url(#rrs-tech-arrow)" />
          )}
        </g>
      ))}
      {gateNodes.map((node, i) => (
        <g key={node.label}>
          <rect x={node.x - 34} y={80} width={68} height={24} rx={4} fill="rgba(3,6,11,0.72)" stroke={i === gateNodes.length - 1 ? "var(--ice-blue)" : "var(--diagram-line-strong)"} strokeWidth={1.2} />
          <text x={node.x} y={96} fontSize={9} fontFamily='"JetBrains Mono", monospace' fill={i === gateNodes.length - 1 ? "var(--ice-blue)" : "var(--silver)"} textAnchor="middle">{node.label}</text>
          {i < gateNodes.length - 1 && (
            <line x1={node.x + 36} y1={92} x2={gateNodes[i + 1].x - 38} y2={92} stroke="var(--diagram-line-strong)" strokeWidth={1.1} markerEnd="url(#rrs-tech-arrow)" />
          )}
        </g>
      ))}
      <text x={170} y={122} fontSize={8} fontFamily='"JetBrains Mono", monospace' fill="var(--muted)" textAnchor="middle" letterSpacing="1.2">
        CHECK GATES BEFORE STRONGER WORDING
      </text>
    </svg>
  );
}

const audiences = ["Hiring manager · 3 min", "Security engineer · 10 min", "Research partner · deep"];
const variantClass = ["timeline", "dag", "matrix"] as const;

export default function ReviewRouteSelector() {
  return (
    <div className="review-route-selector" role="list">
      {reviewerRoutes.map((route, i) => (
        <article
          key={route.title}
          className={`review-route-selector__route review-route-selector__route--${variantClass[i] ?? "timeline"}`}
          role="listitem"
        >
          <header className="review-route-selector__header">
            <span className="review-route-selector__audience">{audiences[i] ?? route.duration}</span>
            <h3 className="review-route-selector__title">{route.title}</h3>
            <p className="review-route-selector__purpose">{route.purpose}</p>
          </header>
          <div className="review-route-selector__visual">
            {i === 0 && <ExecutiveVisual items={route.items} />}
            {i === 1 && <ProofVisual />}
            {i === 2 && <TechnicalVisual />}
          </div>
          <a className="review-route-selector__cta" href={route.links[0]?.href ?? "/start/"}>
            {route.links[0]?.label ?? "Open route"} →
          </a>
        </article>
      ))}
    </div>
  );
}
