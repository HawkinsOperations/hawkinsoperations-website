import { proofLoopSteps as loopSteps, type LoopStep } from "@config/proof-loop";

/**
 * Six-phase proof loop visualization layered over the unchanged 8-step
 * loopSteps data. Each phase maps to one or more underlying steps so the
 * data authority is preserved (config/proof-loop.ts re-exports loopSteps).
 *
 * Phases: Generate → Constrain → Validate → Capture → Review → Publish.
 */

type Phase = { key: string; verb: string; mapsTo: string[] };

const phases: Phase[] = [
  { key: "generate", verb: "Generate", mapsTo: ["Detection Source", "Splunk SPL"] },
  { key: "constrain", verb: "Constrain", mapsTo: ["Controlled-Test Validation"] },
  { key: "validate", verb: "Validate", mapsTo: ["Controlled-Test Validation", "Deterministic Verifier"] },
  { key: "capture", verb: "Capture", mapsTo: ["Case Packet", "AI Support-Only"] },
  { key: "review", verb: "Review", mapsTo: ["Deterministic Verifier", "CI Enforcement"] },
  { key: "publish", verb: "Publish", mapsTo: ["Proof Record"] },
];

const W = 920;
const H = 360;
const cx = W / 2;
const cy = H / 2 + 6;
const radius = 130;

function angle(i: number) {
  return -Math.PI / 2 + (2 * Math.PI * i) / phases.length;
}

export default function ProofLoopDiagram() {
  // Sanity touch: pull title strings from loopSteps so the data authority is referenced.
  const stepIndex = new Map<string, string>(loopSteps.map((s: LoopStep) => [s.title, s.num]));

  return (
    <div className="proof-loop-diagram" aria-label="Six-phase proof loop">
      <svg className="proof-loop-diagram__svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Generate, Constrain, Validate, Capture, Review, Publish">
        <defs>
          <marker id="pld-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--electric-blue-bright)" />
          </marker>
        </defs>

        {/* Outer ring */}
        <circle cx={cx} cy={cy} r={radius + 36} fill="none" stroke="var(--diagram-line)" strokeWidth={1} strokeDasharray="2 4" />

        {/* Arcs between phases */}
        {phases.map((_, i) => {
          const a1 = angle(i) + 0.18;
          const a2 = angle(i + 1) - 0.18;
          const x1 = cx + radius * Math.cos(a1);
          const y1 = cy + radius * Math.sin(a1);
          const x2 = cx + radius * Math.cos(a2);
          const y2 = cy + radius * Math.sin(a2);
          return (
            <path
              key={`arc-${i}`}
              d={`M${x1.toFixed(1)},${y1.toFixed(1)} A${radius},${radius} 0 0 1 ${x2.toFixed(1)},${y2.toFixed(1)}`}
              fill="none"
              stroke="var(--electric-blue-bright)"
              strokeWidth={2}
              markerEnd="url(#pld-arrow)"
              opacity={0.8}
            />
          );
        })}

        {/* Phase nodes */}
        {phases.map((p, i) => {
          const a = angle(i);
          const px = cx + radius * Math.cos(a);
          const py = cy + radius * Math.sin(a);
          const labelOut = radius + 64;
          const lx = cx + labelOut * Math.cos(a);
          const ly = cy + labelOut * Math.sin(a);
          const codeY = ly + 14;
          return (
            <g key={p.key}>
              <circle cx={px} cy={py} r={14} fill="rgba(8,13,22,0.96)" stroke="var(--electric-blue)" strokeWidth={1.8} />
              <text x={px} y={py + 4} fontSize={10} fontFamily='"JetBrains Mono", monospace' fill="var(--electric-blue-bright)" textAnchor="middle" letterSpacing="1.5">{String(i + 1).padStart(2, "0")}</text>
              <text x={lx} y={ly} fontSize={13} fontWeight={700} fontFamily="Inter, ui-sans-serif, system-ui, sans-serif" fill="var(--silver-bright)" textAnchor="middle">{p.verb}</text>
              <text x={lx} y={codeY} fontSize={8} fontFamily='"JetBrains Mono", monospace' fill="var(--ice-blue)" textAnchor="middle" letterSpacing="1.5">PHASE · {p.key.toUpperCase()}</text>
            </g>
          );
        })}

        {/* Center label */}
        <text x={cx} y={cy - 8} fontSize={11} fontFamily='"JetBrains Mono", monospace' fill="var(--muted)" textAnchor="middle" letterSpacing="3">PROOF LOOP</text>
        <text x={cx} y={cy + 16} fontSize={20} fontWeight={700} fontFamily="Inter, ui-sans-serif, system-ui, sans-serif" fill="#ffffff" textAnchor="middle">6 phases</text>
        <text x={cx} y={cy + 36} fontSize={10} fontFamily='"JetBrains Mono", monospace' fill="var(--electric-blue-bright)" textAnchor="middle" letterSpacing="2">{loopSteps.length} underlying steps</text>
      </svg>

      <div className="proof-loop-diagram__table" aria-label="Phase to underlying-step mapping">
        {phases.map((p) => (
          <div key={p.key} className="proof-loop-diagram__row">
            <span className="proof-loop-diagram__phase">phase · {p.key}</span>
            <span className="proof-loop-diagram__verb">{p.verb}</span>
            <span className="proof-loop-diagram__maps">
              {p.mapsTo
                .map((title) => {
                  const num = stepIndex.get(title);
                  return num ? `${num} · ${title}` : title;
                })
                .join(" · ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
