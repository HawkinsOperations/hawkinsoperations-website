import { ceiling, publicSafe } from "@config/site";

/**
 * HeroControlConsole
 *
 * Signature instrument-panel SVG for the homepage hero. Renders the
 * five-node authority chain:
 *   AI LABOR → GATES → EVIDENCE → HUMAN REVIEW → PUBLIC CLAIM BOUNDARY
 *
 * Visual contract:
 *  - Dark cockpit surface with corner brackets, ceiling stamp, blocked-path
 *    mini inset, and an animated data pulse traveling left→right along the
 *    rail. Animation is visual only and does not claim runtime state.
 *  - No green. Electric blue for flow, amber for human review, ice blue for
 *    public boundary, red for the mini blocked-path inset.
 *  - Animation pauses for prefers-reduced-motion (handled by globals.css).
 */
export default function HeroControlConsole() {
  const width = 640;
  const height = 320;
  const padX = 36;
  const cy = 160;
  const nodeR = 22;

  const nodes = [
    { label: "AI LABOR",     sub: "drafts · scaffolds · summarizes", tone: "flow" as const },
    { label: "GATES",        sub: "deterministic checks",            tone: "flow" as const },
    { label: "EVIDENCE",     sub: "preserved receipts",              tone: "flow" as const },
    { label: "HUMAN REVIEW", sub: "authority decision",              tone: "review" as const },
    { label: "PUBLIC CLAIM", sub: "rendering ≠ proof",               tone: "public" as const },
  ];
  const stride = (width - padX * 2) / (nodes.length - 1);

  const fill = (tone: "flow" | "review" | "public") =>
    tone === "flow"   ? "var(--electric-blue-bright)"
    : tone === "review" ? "var(--ceiling-amber)"
    : "var(--ice-blue)";

  const glow = (tone: "flow" | "review" | "public") =>
    tone === "flow"   ? "rgba(96, 165, 250, 0.55)"
    : tone === "review" ? "rgba(224, 189, 99, 0.55)"
    : "rgba(143, 216, 255, 0.65)";

  return (
    <aside className="hero-console" aria-label="Authority chain instrument panel">
      <span className="hero-console__corner hero-console__corner--bl" aria-hidden="true" />
      <span className="hero-console__corner hero-console__corner--br" aria-hidden="true" />
      <span className="hero-console__sweep" aria-hidden="true" />

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
          aria-label="Authority chain: AI Labor, Gates, Evidence, Human Review, Public Claim Boundary"
          width="100%"
          height="auto"
        >
          <defs>
            <marker id="hc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--electric-blue-bright)" />
            </marker>
            <linearGradient id="hc-rail" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%"   stopColor="rgba(59,130,246,0.18)" />
              <stop offset="55%"  stopColor="rgba(96,165,250,0.6)" />
              <stop offset="100%" stopColor="rgba(143,216,255,0.95)" />
            </linearGradient>
            <radialGradient id="hc-public-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"  stopColor="rgba(143,216,255,0.55)" />
              <stop offset="60%" stopColor="rgba(143,216,255,0.18)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Faint instrument grid */}
          <g opacity="0.18" aria-hidden="true">
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`gv-${i}`} x1={padX + i * 92} y1={40} x2={padX + i * 92} y2={height - 40} stroke="rgba(143,216,255,0.18)" strokeWidth={0.5} />
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
              <line key={`gh-${i}`} x1={padX - 8} y1={60 + i * 70} x2={width - padX + 8} y2={60 + i * 70} stroke="rgba(143,216,255,0.12)" strokeWidth={0.5} />
            ))}
          </g>

          {/* Public-boundary node halo */}
          <circle
            cx={padX + stride * (nodes.length - 1)}
            cy={cy}
            r={48}
            fill="url(#hc-public-glow)"
            aria-hidden="true"
          />

          {/* Through rail */}
          <line
            x1={padX}
            y1={cy}
            x2={width - padX}
            y2={cy}
            stroke="url(#hc-rail)"
            strokeWidth={3}
          />

          {/* Animated data pulse — single pulse traveling L → R */}
          <circle r={5} fill="var(--ice-blue)" opacity={0.95} aria-hidden="true" className="svg-pulse">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path={`M ${padX} ${cy} L ${width - padX} ${cy}`}
            />
          </circle>
          <circle r={11} fill="none" stroke="var(--ice-blue)" strokeOpacity={0.35} aria-hidden="true" className="svg-pulse">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path={`M ${padX} ${cy} L ${width - padX} ${cy}`}
            />
          </circle>

          {/* Nodes + connectors */}
          {nodes.map((node, i) => {
            const cx = padX + stride * i;
            const isLast = i === nodes.length - 1;
            return (
              <g key={node.label}>
                {!isLast && (
                  <line
                    x1={cx + nodeR + 3}
                    y1={cy}
                    x2={cx + stride - nodeR - 6}
                    y2={cy}
                    stroke="var(--electric-blue-bright)"
                    strokeWidth={1.8}
                    markerEnd="url(#hc-arrow)"
                    opacity={0.85}
                  />
                )}
                <circle
                  cx={cx}
                  cy={cy}
                  r={nodeR + 8}
                  fill="none"
                  stroke={fill(node.tone)}
                  strokeOpacity={0.32}
                  strokeWidth={1.2}
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r={nodeR}
                  fill="rgba(3, 6, 11, 0.96)"
                  stroke={fill(node.tone)}
                  strokeWidth={2}
                  style={{ filter: `drop-shadow(0 0 10px ${glow(node.tone)})` }}
                />
                <text
                  x={cx}
                  y={cy + 5}
                  textAnchor="middle"
                  fontSize={13}
                  fontFamily='"JetBrains Mono", monospace'
                  fontWeight={800}
                  fill={fill(node.tone)}
                  letterSpacing={1.4}
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
                <text
                  x={cx}
                  y={cy - 42}
                  textAnchor="middle"
                  fontSize={11}
                  fontFamily='"JetBrains Mono", monospace'
                  fontWeight={700}
                  letterSpacing={1.6}
                  fill="var(--silver-bright)"
                >
                  {node.label}
                </text>
                <text
                  x={cx}
                  y={cy + 56}
                  textAnchor="middle"
                  fontSize={10}
                  fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
                  fill="#C9D3DF"
                >
                  {node.sub}
                </text>
              </g>
            );
          })}

          {/* Terminal boundary marker */}
          <line
            x1={padX + stride * (nodes.length - 1) + nodeR + 14}
            y1={cy - 32}
            x2={padX + stride * (nodes.length - 1) + nodeR + 14}
            y2={cy + 32}
            stroke="var(--ice-blue)"
            strokeWidth={1.6}
            strokeDasharray="3 3"
          />
          <text
            x={padX + stride * (nodes.length - 1) + nodeR + 18}
            y={cy - 38}
            fontSize={9}
            fontFamily='"JetBrains Mono", monospace'
            letterSpacing="1.5"
            fill="var(--ice-blue)"
          >
            BOUNDARY
          </text>

          {/* Bottom title strip */}
          <text x={padX} y={height - 18} fontSize={10} fontFamily='"JetBrains Mono", monospace' fill="var(--muted)" letterSpacing="2.6">
            AUTHORITY · CHAIN · {ceiling}
          </text>
          <text x={width - padX} y={height - 18} fontSize={10} fontFamily='"JetBrains Mono", monospace' fill="var(--muted)" letterSpacing="2" textAnchor="end">
            RENDERING ≠ PROOF
          </text>
        </svg>
      </div>

      <div className="hero-console__inset" aria-label="Blocked-path inset">
        <span className="hero-console__inset-glyph" aria-hidden="true">▌</span>
        <span>Uncontrolled promotion → blocked at every gate</span>
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
