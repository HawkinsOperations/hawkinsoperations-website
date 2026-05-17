import { ceiling } from "@config/site";

export type ProofPathStep = {
  code: string;
  label: string;
  line: string;
  href: string;
  external?: boolean;
};

const DEFAULT_DETECTION_ID = "HO-DET-001";

export default function ProofPathTimeline({
  detectionId = DEFAULT_DETECTION_ID,
  title = "Flagship proof path",
  steps,
  showCeiling = true,
}: {
  detectionId?: string;
  title?: string;
  steps: ProofPathStep[];
  showCeiling?: boolean;
}) {
  const count = steps.length;
  const width = 920;
  const height = 130;
  const padX = 48;
  const rail = 80;
  const stride = (width - padX * 2) / Math.max(count - 1, 1);

  return (
    <section className="proof-path-timeline" aria-labelledby={`proof-path-${detectionId}`}>
      <header className="proof-path-timeline__head">
        <div>
          <p className="proof-path-timeline__id">{detectionId}</p>
          <h3 id={`proof-path-${detectionId}`} className="proof-path-timeline__title">{title}</h3>
        </div>
        {showCeiling && (
          <span className="proof-path-timeline__ceiling" aria-label={`Public ceiling ${ceiling}`}>
            ceiling · {ceiling}
          </span>
        )}
      </header>

      <svg className="proof-path-timeline__svg" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${detectionId} proof path with ${count} stages`}>
        <defs>
          <marker id="ppt-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--electric-blue-bright)" />
          </marker>
          <linearGradient id="ppt-rail" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(59,130,246,0.1)" />
            <stop offset="50%" stopColor="rgba(59,130,246,0.6)" />
            <stop offset="100%" stopColor="rgba(238,244,250,0.85)" />
          </linearGradient>
        </defs>

        <line x1={padX} y1={rail} x2={width - padX} y2={rail} stroke="url(#ppt-rail)" strokeWidth={3} />

        {steps.map((step, i) => {
          const cx = padX + stride * i;
          const isFinal = i === count - 1;
          return (
            <g key={step.code}>
              {i < count - 1 && (
                <line
                  x1={cx + 9}
                  y1={rail}
                  x2={cx + stride - 9}
                  y2={rail}
                  stroke="var(--electric-blue-bright)"
                  strokeWidth={1.6}
                  markerEnd="url(#ppt-arrow)"
                  opacity={0.6}
                />
              )}
              <circle cx={cx} cy={rail} r={isFinal ? 11 : 8} fill={isFinal ? "var(--silver-bright)" : "var(--electric-blue)"} stroke={isFinal ? "var(--silver-bright)" : "var(--electric-blue-bright)"} strokeWidth={2} />
              {isFinal && <circle cx={cx} cy={rail} r={16} fill="none" stroke="var(--ice-blue-soft)" strokeWidth={1} />}
              <text x={cx} y={rail - 22} fontSize={10} fontFamily='"JetBrains Mono", monospace' fill="var(--electric-blue-bright)" textAnchor="middle" letterSpacing="2">{String(i + 1).padStart(2, "0")}</text>
              <text x={cx} y={rail + 28} fontSize={9} fontFamily='"JetBrains Mono", monospace' fill="var(--ice-blue)" textAnchor="middle" letterSpacing="1.5">{step.code}</text>
            </g>
          );
        })}
      </svg>

      <ol className="proof-path-timeline__rows" aria-label={`${detectionId} proof path rows`}>
        {steps.map((step, i) => (
          <li key={step.code} className="proof-path-timeline__row">
            <span className="proof-path-timeline__row-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="proof-path-timeline__row-code">{step.code}</span>
            <span className="proof-path-timeline__row-text">{step.line}</span>
            <a
              className="proof-path-timeline__row-link"
              href={step.href}
              target={step.external ? "_blank" : undefined}
              rel={step.external ? "noopener noreferrer" : undefined}
            >
              {step.external ? "Open ↗" : "Open →"}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
