import { reviewerRoutes } from "@data/reviewerRoutes";

/**
 * Four reviewer routes, four distinct visual forms.
 *
 *   Hiring manager           — horizontal timeline strip (3 stops).
 *   Detection engineering    — source -> validation -> proof DAG.
 *   SOC automation           — proof-loop gate diagram.
 *   AI governance            — AI-labor vs human-authority split.
 *
 * Routes share underlying data (`reviewerRoutes`) but each renders a distinct
 * visual to avoid the repeated-square-card pattern the brief forbids.
 */

function HiringManagerVisual({ items }: { items: string[] }) {
  const points = items.slice(0, 3);
  return (
    <svg viewBox="0 0 340 80" className="review-route-selector__svg" role="img" aria-label="Hiring manager timeline: three stops">
      <defs>
        <marker id="rrs-hm-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
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
              <line x1={cx + 8} y1={40} x2={cx + (284 / Math.max(points.length - 1, 1)) - 9} y2={40} stroke="var(--electric-blue-bright)" strokeWidth={1.4} markerEnd="url(#rrs-hm-arrow)" />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function DetectionEngineerVisual() {
  const ids = [
    { x: 36, label: "src" },
    { x: 130, label: "val" },
    { x: 224, label: "proof" },
    { x: 318, label: "render" },
  ];
  return (
    <svg viewBox="0 0 340 110" className="review-route-selector__svg" role="img" aria-label="Detection engineering inspection mini-DAG">
      <defs>
        <marker id="rrs-de-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
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
              <line x1={ids[i - 1].x + 28} y1={36} x2={n.x - 30} y2={36} stroke="var(--electric-blue-bright)" strokeWidth={1.4} markerEnd="url(#rrs-de-arrow)" />
            )}
          </g>
        );
      })}
      <polyline points="252,50 252,72 318,72 318,74" fill="none" stroke="var(--ice-blue)" strokeWidth={1.4} markerEnd="url(#rrs-de-arrow)" />
      <text x={20} y={106} fontSize={8} fontFamily='"JetBrains Mono", monospace' fill="var(--muted)" letterSpacing="2">SOURCE → VALIDATION → PROOF · RENDER ≠ AUTHORITY</text>
    </svg>
  );
}

function SocAutomationVisual() {
  const gates = [
    { x: 50, label: "fixtures" },
    { x: 138, label: "verifier" },
    { x: 226, label: "CI gate" },
    { x: 308, label: "ceiling" },
  ];
  return (
    <svg viewBox="0 0 340 110" className="review-route-selector__svg" role="img" aria-label="Proof loop gate diagram">
      <defs>
        <marker id="rrs-soc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--electric-blue-bright)" />
        </marker>
      </defs>
      <text x={18} y={16} fontSize={8} fontFamily='"JetBrains Mono", monospace' fill="var(--electric-blue-bright)" letterSpacing="2">CASE PACKET FLOW</text>
      {gates.map((g, i) => {
        const isLast = i === gates.length - 1;
        return (
          <g key={g.label}>
            <rect
              x={g.x - 30}
              y={40}
              width={60}
              height={28}
              rx={4}
              fill="rgba(8,13,22,0.94)"
              stroke={isLast ? "var(--ice-blue)" : "var(--electric-blue)"}
              strokeWidth={1.3}
            />
            <text
              x={g.x}
              y={58}
              fontSize={9}
              fontFamily='"JetBrains Mono", monospace'
              fill={isLast ? "var(--ice-blue)" : "var(--silver-bright)"}
              textAnchor="middle"
              letterSpacing="1"
            >
              {g.label}
            </text>
            {i < gates.length - 1 && (
              <line
                x1={g.x + 32}
                y1={54}
                x2={gates[i + 1].x - 32}
                y2={54}
                stroke="var(--electric-blue-bright)"
                strokeWidth={1.3}
                markerEnd="url(#rrs-soc-arrow)"
              />
            )}
          </g>
        );
      })}
      <text x={170} y={94} fontSize={8} fontFamily='"JetBrains Mono", monospace' fill="var(--muted)" textAnchor="middle" letterSpacing="1.2">
        CEILING HELD UNLESS STRONGER EVIDENCE PROMOTED
      </text>
    </svg>
  );
}

function AiGovernanceVisual() {
  return (
    <svg viewBox="0 0 340 120" className="review-route-selector__svg" role="img" aria-label="AI labor versus human authority split">
      <defs>
        <marker id="rrs-ai-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--ceiling-amber)" />
        </marker>
      </defs>
      <text x={18} y={16} fontSize={8} fontFamily='"JetBrains Mono", monospace' fill="var(--electric-blue-bright)" letterSpacing="2">AI LABOR</text>
      <text x={322} y={16} fontSize={8} fontFamily='"JetBrains Mono", monospace' fill="var(--ceiling-amber)" letterSpacing="2" textAnchor="end">HUMAN AUTHORITY</text>

      <rect x={18} y={28} width={148} height={70} rx={6} fill="rgba(8,13,22,0.92)" stroke="var(--electric-blue)" strokeWidth={1.3} />
      <text x={92} y={52} fontSize={10} fontFamily='"JetBrains Mono", monospace' fill="var(--silver-bright)" textAnchor="middle" letterSpacing="1.2">drafts</text>
      <text x={92} y={72} fontSize={10} fontFamily='"JetBrains Mono", monospace' fill="var(--silver-bright)" textAnchor="middle" letterSpacing="1.2">scaffolds</text>
      <text x={92} y={92} fontSize={10} fontFamily='"JetBrains Mono", monospace' fill="var(--silver-bright)" textAnchor="middle" letterSpacing="1.2">summaries</text>

      <line x1={170} y1={62} x2={196} y2={62} stroke="var(--ceiling-amber)" strokeWidth={1.6} markerEnd="url(#rrs-ai-arrow)" />

      <rect x={200} y={28} width={120} height={70} rx={6} fill="rgba(8,13,22,0.92)" stroke="var(--ceiling-amber)" strokeWidth={1.4} />
      <text x={260} y={56} fontSize={10} fontFamily='"JetBrains Mono", monospace' fill="var(--ceiling-amber)" textAnchor="middle" letterSpacing="1.2">human review</text>
      <text x={260} y={76} fontSize={9} fontFamily='Inter, ui-sans-serif, system-ui, sans-serif' fill="var(--silver)" textAnchor="middle">authorizes claims</text>

      <text x={170} y={114} fontSize={8} fontFamily='"JetBrains Mono", monospace' fill="var(--muted)" textAnchor="middle" letterSpacing="1.2">
        AI authority · SUPPORT_ONLY
      </text>
    </svg>
  );
}

const variantClass = ["timeline", "dag", "loop", "split"] as const;

export default function ReviewRouteSelector() {
  return (
    <div className="review-route-selector review-route-selector--four" role="list">
      {reviewerRoutes.map((route, i) => (
        <article
          key={route.title}
          className={`review-route-selector__route review-route-selector__route--${variantClass[i] ?? "timeline"}`}
          role="listitem"
        >
          <header className="review-route-selector__header">
            <span className="review-route-selector__audience">
              {route.audience} · {route.duration}
            </span>
            <h3 className="review-route-selector__title">{route.title}</h3>
            <p className="review-route-selector__purpose">{route.purpose}</p>
          </header>
          <div className="review-route-selector__visual">
            {i === 0 && <HiringManagerVisual items={route.items} />}
            {i === 1 && <DetectionEngineerVisual />}
            {i === 2 && <SocAutomationVisual />}
            {i === 3 && <AiGovernanceVisual />}
          </div>
          <dl className="review-route-selector__meta">
            <dt>Cares about</dt>
            <dd>{route.cares}</dd>
            <dt>Do not infer</dt>
            <dd>{route.doNotInfer}</dd>
          </dl>
          <a className="review-route-selector__cta" href={route.links[0]?.href ?? "/start/"}>
            {route.links[0]?.label ?? "Open route"} →
          </a>
        </article>
      ))}
    </div>
  );
}
