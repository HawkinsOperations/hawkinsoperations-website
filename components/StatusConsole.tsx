import { ceiling, publicSafe, mandatoryBoundary } from "@config/site";

type Row = { tone: "primary" | "ice" | "quiet"; label: string; value: string };
type Disposition = { label: string; state: string };

const defaultRows: Row[] = [
  { tone: "ice", label: "Public ceiling", value: ceiling },
  { tone: "primary", label: "Surface mode", value: "RENDERING_ONLY" },
  { tone: "quiet", label: "Public-safe", value: publicSafe },
];

// Runtime, signal, and autonomous dispositions are blocked at this surface.
// Bare axis words only — never the hyphenated blocked-claim literals.
const defaultDispositions: Disposition[] = [
  { label: "Runtime", state: "BLOCKED" },
  { label: "Signal", state: "BLOCKED" },
  { label: "Autonomous", state: "BLOCKED" },
];

const dotClass = (tone: Row["tone"]) =>
  tone === "ice"
    ? "status-console__dot status-console__dot--ice"
    : tone === "quiet"
    ? "status-console__dot status-console__dot--quiet"
    : "status-console__dot";

export default function StatusConsole({
  rows = defaultRows,
  dispositions = defaultDispositions,
  footer = mandatoryBoundary,
  showLoop = true,
  showDisposition = true,
}: {
  rows?: Row[];
  dispositions?: Disposition[];
  footer?: string;
  showLoop?: boolean;
  showDisposition?: boolean;
}) {
  return (
    <aside className="status-console" aria-label="Reviewer boundary console">
      {rows.map((row) => (
        <div key={row.label} className="status-console__row">
          <span className={dotClass(row.tone)} aria-hidden="true" />
          <span className="status-console__label">{row.label}</span>
          <span className="status-console__value">{row.value}</span>
        </div>
      ))}

      {showDisposition && dispositions.length > 0 && (
        <div
          className="status-console__disposition"
          role="group"
          aria-label="Disposition: runtime, signal, and autonomous claims are blocked at this surface"
        >
          <span className="status-console__disp-label">Disposition</span>
          <div className="status-console__disp-grid">
            {dispositions.map((d) => (
              <span key={d.label} className="status-console__disp-chip" title={`${d.label} disposition: ${d.state}`}>
                <span className="status-console__disp-axis">{d.label}</span>
                <span className="status-console__disp-state">{d.state}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {showLoop && (
        <>
          <div className="status-console__divider" aria-hidden="true" />
          <svg
            className="status-console__svg"
            viewBox="0 0 340 96"
            role="img"
            aria-label="Proof route micro-diagram: source, bound, test, packet, review, publish"
          >
            <defs>
              <marker id="sc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="var(--electric-blue)" />
              </marker>
            </defs>
            {[
              { x: 28, label: "Source" },
              { x: 82, label: "Bound" },
              { x: 134, label: "Test" },
              { x: 190, label: "Packet" },
              { x: 252, label: "Review" },
              { x: 316, label: "Publish" },
            ].map((node, i, arr) => {
              const isPub = i === arr.length - 1;
              return (
                <g key={node.label}>
                  <circle cx={node.x} cy={36} r={isPub ? 8 : 5} fill={isPub ? "var(--silver-bright)" : "var(--electric-blue)"} />
                  <text
                    x={node.x}
                    y={66}
                    fill="var(--silver)"
                    fontSize={8}
                    fontFamily='"JetBrains Mono", monospace'
                    textAnchor="middle"
                    letterSpacing="0.2"
                  >
                    {node.label}
                  </text>
                  {i < arr.length - 1 && (
                    <line
                      x1={node.x + 7}
                      y1={36}
                      x2={arr[i + 1].x - 8}
                      y2={36}
                      stroke="var(--diagram-line-strong)"
                      strokeWidth={1.4}
                      markerEnd="url(#sc-arrow)"
                    />
                  )}
                </g>
              );
            })}
            <line x1={262} y1={28} x2={262} y2={20} stroke="var(--ice-blue)" strokeDasharray="3 3" strokeWidth={1} />
            <text x={262} y={14} fill="var(--ice-blue)" fontSize={7} fontFamily='"JetBrains Mono", monospace' textAnchor="middle" letterSpacing="1.5">CEILING</text>
          </svg>
        </>
      )}

      <p className="status-console__footer">{footer}</p>
    </aside>
  );
}
