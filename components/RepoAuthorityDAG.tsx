/**
 * Three-plane authority DAG.
 *
 * Layout:
 *   Top plane     — governance (.github) and runtime (platform), cross-cutting overlays.
 *   Middle plane  — authority chain: detections → validation → proof.
 *   Bottom plane  — website (rendering only).
 *
 * All linework uses --electric-blue (authority chain) and --silver (overlay).
 * Reference visual concept retained; colors re-authored to the cockpit palette.
 */

type Node = {
  id: string;
  x: number;
  y: number;
  num: string;
  name: string;
  role: string;
  plane: "governance" | "runtime" | "authority" | "render";
};

const W = 980;
const H = 460;

const nodes: Node[] = [
  { id: "github", x: 140, y: 36, num: "01", name: ".github", role: "governance / reviewer routing", plane: "governance" },
  { id: "platform", x: 620, y: 36, num: "02", name: "platform", role: "runtime contracts / boundaries", plane: "runtime" },
  { id: "detections", x: 80, y: 186, num: "03", name: "detections", role: "source logic", plane: "authority" },
  { id: "validation", x: 380, y: 186, num: "04", name: "validation", role: "tests · fixtures · verifiers", plane: "authority" },
  { id: "proof", x: 680, y: 186, num: "05", name: "proof", role: "evidence boundary · ceiling", plane: "authority" },
  { id: "website", x: 380, y: 336, num: "06", name: "website", role: "rendering only · reviewer routing", plane: "render" },
];

const NW = 240;
const NH = 78;

const planeStroke: Record<Node["plane"], string> = {
  governance: "var(--silver)",
  runtime: "var(--silver)",
  authority: "var(--electric-blue)",
  render: "var(--ice-blue)",
};

export default function RepoAuthorityDAG() {
  return (
    <div className="repo-dag" aria-label="Repository authority directed graph">
      <div className="repo-dag__viewport">
        <svg className="repo-dag__svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Six repositories, three planes; authority flows down only">
          <defs>
            <marker id="rd-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--electric-blue-bright)" />
            </marker>
            <marker id="rd-arrow-quiet" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--silver)" />
            </marker>
          </defs>

          {/* Plane labels */}
          <text x={28} y={70} fontSize={9} fontFamily='"JetBrains Mono", monospace' fill="var(--muted)" letterSpacing="2">PLANE · GOV / RUNTIME</text>
          <text x={28} y={220} fontSize={9} fontFamily='"JetBrains Mono", monospace' fill="var(--electric-blue-bright)" letterSpacing="2">PLANE · AUTHORITY CHAIN</text>
          <text x={28} y={370} fontSize={9} fontFamily='"JetBrains Mono", monospace' fill="var(--ice-blue)" letterSpacing="2">PLANE · RENDERING</text>

          {/* Authority-chain arrows (middle plane) */}
          <line x1={80 + NW} y1={186 + NH / 2} x2={380 - 4} y2={186 + NH / 2} stroke="var(--electric-blue-bright)" strokeWidth={1.8} markerEnd="url(#rd-arrow)" />
          <text x={(80 + NW + 380) / 2} y={186 + NH / 2 - 6} fill="var(--muted)" fontSize={9} fontFamily='"JetBrains Mono", monospace' textAnchor="middle" letterSpacing="1">feeds</text>

          <line x1={380 + NW} y1={186 + NH / 2} x2={680 - 4} y2={186 + NH / 2} stroke="var(--electric-blue-bright)" strokeWidth={1.8} markerEnd="url(#rd-arrow)" />
          <text x={(380 + NW + 680) / 2} y={186 + NH / 2 - 6} fill="var(--muted)" fontSize={9} fontFamily='"JetBrains Mono", monospace' textAnchor="middle" letterSpacing="1">feeds</text>

          {/* Proof → website (render-only) */}
          <polyline
            points={`${800},${186 + NH},${800},${300},${500},${300},${500},${336}`}
            fill="none"
            stroke="var(--ice-blue)"
            strokeWidth={1.6}
            markerEnd="url(#rd-arrow-quiet)"
          />
          <text x={650} y={294} fill="var(--muted)" fontSize={9} fontFamily='"JetBrains Mono", monospace' textAnchor="middle" letterSpacing="1">renders (read-only)</text>

          {/* Governance overlay dashed lines */}
          {[180, 500, 800].map((tx, i) => (
            <line key={`gov-${i}`} x1={260} y1={36 + NH} x2={tx} y2={186} stroke="var(--silver)" strokeDasharray="4 4" strokeWidth={0.9} opacity={0.6} markerEnd="url(#rd-arrow-quiet)" />
          ))}
          {/* Runtime overlay dashed lines */}
          {[500, 800].map((tx, i) => (
            <line key={`rt-${i}`} x1={740} y1={36 + NH} x2={tx} y2={186} stroke="var(--silver)" strokeDasharray="4 4" strokeWidth={0.9} opacity={0.6} markerEnd="url(#rd-arrow-quiet)" />
          ))}

          {nodes.map((node) => (
            <g key={node.id}>
              <rect
                x={node.x}
                y={node.y}
                width={NW}
                height={NH}
                rx={6}
                fill="rgba(8,13,22,0.94)"
                stroke={planeStroke[node.plane]}
                strokeWidth={1.4}
              />
              <text x={node.x + 14} y={node.y + 22} fontSize={11} fontFamily='"JetBrains Mono", monospace' fill="var(--silver-bright)" letterSpacing="1.5">
                {node.num} · {node.name}
              </text>
              <text x={node.x + 14} y={node.y + 44} fontSize={11} fontFamily='Inter, ui-sans-serif, system-ui, sans-serif' fill="var(--silver)">
                {node.role}
              </text>
              <text
                x={node.x + NW - 14}
                y={node.y + 22}
                fontSize={8}
                fontFamily='"JetBrains Mono", monospace'
                fill={planeStroke[node.plane]}
                textAnchor="end"
                letterSpacing="2"
              >
                {node.plane.toUpperCase()}
              </text>
            </g>
          ))}

          {/* Render boundary callout */}
          <text x={W - 28} y={H - 16} fontSize={9} fontFamily='"JetBrains Mono", monospace' fill="var(--muted)" textAnchor="end" letterSpacing="2">
            RENDER ≠ AUTHORITY
          </text>
        </svg>
      </div>

      <div className="repo-dag__legend">
        <span className="repo-dag__legend-item">
          <span className="repo-dag__legend-swatch" /> authority chain
        </span>
        <span className="repo-dag__legend-item">
          <span className="repo-dag__legend-swatch repo-dag__legend-swatch--ice" /> rendering
        </span>
        <span className="repo-dag__legend-item">
          <span className="repo-dag__legend-swatch repo-dag__legend-swatch--dashed" /> governance / runtime overlay
        </span>
      </div>
    </div>
  );
}
