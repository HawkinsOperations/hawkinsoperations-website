import { artifactStages } from "@data/artifactMachine";

const NODE_W = 140;
const NODE_H = 80;
const GAP = 28;
const PAD_X = 32;
const PAD_TOP = 56;
const PAD_BOTTOM = 70;

export default function ArtifactMachine() {
  const total = artifactStages.length;
  const width = PAD_X * 2 + NODE_W * total + GAP * (total - 1);
  const height = PAD_TOP + NODE_H + PAD_BOTTOM;
  const centerY = PAD_TOP + NODE_H / 2;

  return (
    <div className="machine-strip" data-stages={total}>
      <div className="machine-strip__viewport">
        <svg
          className="machine-strip__svg"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Artifact machine: source, validation, case packet, AI support, verifier, CI, proof card, public boundary"
        >
          <defs>
            <marker id="am-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--electric-blue-bright)" />
            </marker>
            <linearGradient id="am-node" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(59,130,246,0.18)" />
              <stop offset="100%" stopColor="rgba(8,13,22,0.94)" />
            </linearGradient>
            <linearGradient id="am-node-final" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(238,244,250,0.18)" />
              <stop offset="100%" stopColor="rgba(8,13,22,0.94)" />
            </linearGradient>
          </defs>

          {/* Through-rail */}
          <line
            x1={PAD_X}
            x2={width - PAD_X}
            y1={centerY + NODE_H / 2 + 18}
            y2={centerY + NODE_H / 2 + 18}
            stroke="var(--diagram-line)"
            strokeWidth={1}
            strokeDasharray="2 4"
          />

          {artifactStages.map((stage, i) => {
            const x = PAD_X + i * (NODE_W + GAP);
            const isLast = i === total - 1;
            const nextX = PAD_X + (i + 1) * (NODE_W + GAP);
            return (
              <g key={stage.id}>
                {/* Connector to next stage */}
                {!isLast && (
                  <line
                    x1={x + NODE_W}
                    y1={centerY}
                    x2={nextX - 4}
                    y2={centerY}
                    stroke="var(--electric-blue-bright)"
                    strokeWidth={1.6}
                    markerEnd="url(#am-arrow)"
                  />
                )}

                <a
                  className="machine-strip__stage-link"
                  href={stage.link.href}
                  target={stage.link.external ? "_blank" : undefined}
                  rel={stage.link.external ? "noopener noreferrer" : undefined}
                  aria-label={`Open ${stage.name}: ${stage.link.label}`}
                >
                  {/* Stage node */}
                  <rect
                    className="machine-strip__stage-focus"
                    x={x - 4}
                    y={PAD_TOP - 4}
                    width={NODE_W + 8}
                    height={NODE_H + 8}
                    rx={9}
                    fill="transparent"
                    stroke="var(--electric-blue-bright)"
                    strokeWidth={1.4}
                    opacity={0}
                  />
                  <rect
                    className="machine-strip__stage-node"
                    x={x}
                    y={PAD_TOP}
                    width={NODE_W}
                    height={NODE_H}
                    rx={6}
                    fill={isLast ? "url(#am-node-final)" : "url(#am-node)"}
                    stroke={isLast ? "var(--silver-bright)" : "var(--electric-blue)"}
                    strokeWidth={1.4}
                  />

                  {/* Index */}
                  <text
                    x={x + 12}
                    y={PAD_TOP + 18}
                    fontSize={9}
                    fontFamily='"JetBrains Mono", monospace'
                    fill={isLast ? "var(--silver-bright)" : "var(--electric-blue-bright)"}
                    letterSpacing="2"
                  >
                    {stage.n}
                  </text>

                  {/* Name */}
                  <text
                    x={x + 12}
                    y={PAD_TOP + 40}
                    fontSize={14}
                    fontWeight={700}
                    fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
                    fill="var(--silver-bright)"
                  >
                    {stage.name}
                  </text>

                  {/* Code chip */}
                  <rect
                    x={x + 12}
                    y={PAD_TOP + 50}
                    width={NODE_W - 24}
                    height={18}
                    rx={3}
                    fill="rgba(3,6,11,0.7)"
                    stroke={isLast ? "var(--silver)" : "var(--electric-blue-soft)"}
                    strokeWidth={1}
                  />
                  <text
                    x={x + NODE_W / 2}
                    y={PAD_TOP + 62}
                    fontSize={9}
                    fontFamily='"JetBrains Mono", monospace'
                    fill={isLast ? "var(--silver-bright)" : "var(--ice-blue)"}
                    letterSpacing="1.5"
                    textAnchor="middle"
                  >
                    {stage.code}
                  </text>
                </a>

                {/* Stage caption below the rail */}
                <text
                  x={x + NODE_W / 2}
                  y={centerY + NODE_H / 2 + 38}
                  fontSize={10}
                  fontFamily='"JetBrains Mono", monospace'
                  fill="var(--muted)"
                  textAnchor="middle"
                  letterSpacing="1"
                >
                  {stage.code === "CEILING_HELD" ? "ceiling" : `→ ${artifactStages[Math.min(i + 1, total - 1)].name.toLowerCase()}`}
                </text>
              </g>
            );
          })}

          {/* Title strip */}
          <text x={PAD_X} y={28} fontSize={11} fontFamily='"JetBrains Mono", monospace' fill="var(--electric-blue-bright)" letterSpacing="3">
            ARTIFACT MACHINE · 08 STAGES
          </text>
          <text x={width - PAD_X} y={28} fontSize={11} fontFamily='"JetBrains Mono", monospace' fill="var(--muted)" letterSpacing="2" textAnchor="end">
            SOURCE → BOUNDARY
          </text>
        </svg>
      </div>

      <div className="machine-strip__legend">
        <span className="machine-strip__legend-item">
          <span className="machine-strip__legend-swatch" /> stage node
        </span>
        <span className="machine-strip__legend-item">
          <span className="machine-strip__legend-swatch machine-strip__legend-swatch--ice" /> stage code
        </span>
        <span className="machine-strip__legend-item">
          <span className="machine-strip__legend-swatch machine-strip__legend-swatch--ceiling" /> public boundary
        </span>
      </div>
    </div>
  );
}
