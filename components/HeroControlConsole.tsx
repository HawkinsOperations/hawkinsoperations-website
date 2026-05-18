import { ceiling, publicSafe } from "@config/site";

/**
 * HeroControlConsole
 *
 * Right-side instrument-panel SVG for the homepage hero. Shows the
 * five-node authority chain:
 *   AI LABOR → GATES → EVIDENCE → HUMAN REVIEW → PUBLIC CLAIM BOUNDARY
 *
 * Visual contract:
 *  - Dark cockpit surface with corner brackets (cockpit identity).
 *  - Electric-blue flow nodes, amber human-review node, ice-blue
 *    terminal public-boundary node. No green.
 *  - Static SVG; hover route glow is CSS-only. No runtime claims.
 */
export default function HeroControlConsole() {
  const width = 520;
  const height = 220;
  const padX = 30;
  const cy = 110;
  const nodeR = 16;

  const nodes = [
    { label: "AI LABOR",       sub: "drafts · scaffolds · summarizes", tone: "flow" as const },
    { label: "GATES",          sub: "deterministic checks",            tone: "flow" as const },
    { label: "EVIDENCE",       sub: "preserved receipts",              tone: "flow" as const },
    { label: "HUMAN REVIEW",   sub: "authority decision",              tone: "review" as const },
    { label: "PUBLIC CLAIM",   sub: "rendering ≠ proof",               tone: "public" as const },
  ];
  const stride = (width - padX * 2) / (nodes.length - 1);

  const fill = (tone: "flow" | "review" | "public") =>
    tone === "flow"   ? "var(--electric-blue-bright)"
    : tone === "review" ? "var(--ceiling-amber)"
    : "var(--ice-blue)";

  const glow = (tone: "flow" | "review" | "public") =>
    tone === "flow"   ? "rgba(96, 165, 250, 0.55)"
    : tone === "review" ? "rgba(224, 189, 99, 0.55)"
    : "rgba(143, 216, 255, 0.55)";

  return (
    <aside className="hero-console" aria-label="Hero control console — authority chain">
      <span className="hero-console__corner hero-console__corner--bl" aria-hidden="true" />
      <span className="hero-console__corner hero-console__corner--br" aria-hidden="true" />

      <header className="hero-console__head">
        <span className="hero-console__label">Authority chain · governed</span>
        <span className="hero-console__ceiling" aria-label={`Public ceiling ${ceiling}`}>
          Ceiling · {ceiling}
        </span>
      </header>

      <div className="hero-console__svg-wrap">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Five-node authority chain: AI Labor, Gates, Evidence, Human Review, Public Claim Boundary"
          width="100%"
          height="auto"
        >
          <defs>
            <marker id="hc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--electric-blue-bright)" />
            </marker>
            <linearGradient id="hc-rail" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%"   stopColor="rgba(59,130,246,0.15)" />
              <stop offset="55%"  stopColor="rgba(96,165,250,0.55)" />
              <stop offset="100%" stopColor="rgba(143,216,255,0.85)" />
            </linearGradient>
          </defs>

          {/* through rail */}
          <line
            x1={padX}
            y1={cy}
            x2={width - padX}
            y2={cy}
            stroke="url(#hc-rail)"
            strokeWidth={2.4}
          />

          {/* segmented arrows + nodes */}
          {nodes.map((node, i) => {
            const cx = padX + stride * i;
            const isLast = i === nodes.length - 1;
            return (
              <g key={node.label}>
                {!isLast && (
                  <line
                    x1={cx + nodeR + 2}
                    y1={cy}
                    x2={cx + stride - nodeR - 4}
                    y2={cy}
                    stroke="var(--electric-blue-bright)"
                    strokeWidth={1.6}
                    markerEnd="url(#hc-arrow)"
                    opacity={0.75}
                  />
                )}
                <circle
                  cx={cx}
                  cy={cy}
                  r={nodeR + 6}
                  fill="none"
                  stroke={fill(node.tone)}
                  strokeOpacity={0.32}
                  strokeWidth={1}
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r={nodeR}
                  fill="rgba(3, 6, 11, 0.95)"
                  stroke={fill(node.tone)}
                  strokeWidth={1.8}
                  style={{ filter: `drop-shadow(0 0 8px ${glow(node.tone)})` }}
                />
                <text
                  x={cx}
                  y={cy + 4}
                  textAnchor="middle"
                  fontSize={10}
                  fontFamily='"JetBrains Mono", monospace'
                  fontWeight={700}
                  fill={fill(node.tone)}
                  letterSpacing={1.2}
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
                <text
                  x={cx}
                  y={cy - 30}
                  textAnchor="middle"
                  fontSize={9}
                  fontFamily='"JetBrains Mono", monospace'
                  fontWeight={700}
                  letterSpacing={1.4}
                  fill="var(--silver-bright)"
                >
                  {node.label}
                </text>
                <text
                  x={cx}
                  y={cy + 38}
                  textAnchor="middle"
                  fontSize={8}
                  fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
                  fill="var(--muted)"
                >
                  {node.sub}
                </text>
              </g>
            );
          })}

          {/* terminal boundary marker */}
          <line
            x1={padX + stride * (nodes.length - 1) + nodeR + 10}
            y1={cy - 22}
            x2={padX + stride * (nodes.length - 1) + nodeR + 10}
            y2={cy + 22}
            stroke="var(--ice-blue)"
            strokeWidth={1.4}
            strokeDasharray="3 3"
          />
        </svg>
      </div>

      <div className="hero-console__legend" aria-hidden="true">
        <span className="hero-console__legend-item">
          <span className="hero-console__dot hero-console__dot--flow" /> flow node
        </span>
        <span className="hero-console__legend-item">
          <span className="hero-console__dot hero-console__dot--review" /> human review
        </span>
        <span className="hero-console__legend-item">
          <span className="hero-console__dot hero-console__dot--public" /> public boundary
        </span>
        <span className="hero-console__legend-item">
          <span className="hero-console__dot hero-console__dot--blocked" /> blocked path
        </span>
      </div>

      <div className="hero-console__meta">
        <span><b>SURFACE</b> · RENDERING_ONLY</span>
        <span><b>PUBLIC-SAFE</b> · {publicSafe}</span>
        <span><b>HUMAN REVIEW</b> · REQUIRED</span>
      </div>
    </aside>
  );
}
