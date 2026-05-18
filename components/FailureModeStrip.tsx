/**
 * FailureModeStrip
 *
 * Dark cockpit section that names the enterprise AI-governance failure mode:
 * uncontrolled promotion. Renders a dashed red broken pipeline of five
 * red-outlined nodes followed by a single green footer band stating that
 * HawkinsOperations blocks the path.
 *
 * Claim contract:
 *  - The strip describes a failure pattern, not a HawkinsOperations claim.
 *  - The footer states what HawkinsOperations does NOT allow.
 *  - No runtime, signal-observed, public-safe, autonomous SOC, or AI-approved
 *    disposition claim is asserted.
 */

type FailureNode = {
  label: string;
  sub: string;
  glyph: string;
  why: string;
  blockedBy: string;
};

const failureNodes: FailureNode[] = [
  {
    label: "AI OUTPUT",
    sub: "Unrestricted generation",
    glyph: "⚠",
    why: "Generated text is the cheapest part of an AI system to produce and the hardest to govern. Without a gate, output is treated as fact by whatever reads it next.",
    blockedBy: "Source surface — output stays inside the labor lane; promotion requires a downstream receipt.",
  },
  {
    label: "ANALYST CONCLUSION",
    sub: "Opinion without bounded evidence",
    glyph: "❓",
    why: "Once AI-generated wording is pasted into a ticket, a brief, or a Slack thread, it becomes a claim an analyst attaches their name to — usually without the evidence chain attached.",
    blockedBy: "Validation surface — analyst-approved disposition remains blocked unless an evidence-linked record is present.",
  },
  {
    label: "OPERATIONAL ACTION",
    sub: "Actions taken on unverified claims",
    glyph: "⚙",
    why: "Operational systems act on inputs they trust. If an unverified claim reaches an action surface — block, alert, escalate — the action becomes proof the claim was real.",
    blockedBy: "Runtime surface — runtime-active state is blocked from public rendering and gated behind evidence promotion.",
  },
  {
    label: "PUBLIC CLAIM",
    sub: "Marketing or public statements",
    glyph: "📣",
    why: "Public statements are the hardest to retract. Once a claim ships to a website, deck, or press surface, it becomes the new baseline for everything downstream.",
    blockedBy: "Public-claim surface — claim firewall blocks runtime, signal-observed, public-safe runtime proof, autonomous SOC, and AI-approved disposition wording.",
  },
  {
    label: "EXECUTIVE TRUTH",
    sub: "Becomes organizational truth",
    glyph: "👑",
    why: "Once enough downstream surfaces repeat a claim, executives treat it as established truth. The original AI-generated origin is no longer in view.",
    blockedBy: "Ceiling surface — public claims are capped at CONTROLLED_TEST_VALIDATED; higher wording requires a separate evidence-backed promotion gate.",
  },
];

export default function FailureModeStrip() {
  const width = 980;
  const height = 180;
  const padX = 40;
  const stride = (width - padX * 2) / (failureNodes.length - 1);

  return (
    <aside className="failure-strip" aria-labelledby="failure-strip-title">
      <header className="failure-strip__head">
        <div>
          <p className="cockpit-eyebrow" style={{ color: "var(--blocked-red-strong)" }}>
            Enterprise failure mode
          </p>
          <h2 id="failure-strip-title" className="failure-strip__title">
            How AI quietly inflates the truth.
          </h2>
        </div>
        <span className="rubber-stamp-blocked" aria-label="Uncontrolled promotion pattern">
          Uncontrolled promotion
        </span>
      </header>

      <p className="failure-strip__sub">
        The enterprise AI failure mode is uncontrolled promotion. Generated output becomes analyst
        conclusion, operational action, public claim, and executive truth without enough validation,
        evidence, or human review to support it. This is the path HawkinsOperations is built to block.
      </p>

      <div className="failure-strip__svg-wrap">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Five-node uncontrolled promotion pipeline: AI Output to Executive Truth"
          width="100%"
          style={{ minWidth: 760 }}
        >
          <defs>
            <marker
              id="fs-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--blocked-red-strong)" />
            </marker>
          </defs>

          {failureNodes.map((node, i) => {
            const cx = padX + stride * i;
            const cy = 70;
            return (
              <g key={node.label}>
                {i < failureNodes.length - 1 && (
                  <line
                    x1={cx + 56}
                    y1={cy}
                    x2={cx + stride - 60}
                    y2={cy}
                    stroke="var(--blocked-red-strong)"
                    strokeWidth={1.6}
                    strokeDasharray="6 5"
                    markerEnd="url(#fs-arrow)"
                    opacity={0.85}
                  />
                )}
                <rect
                  x={cx - 56}
                  y={cy - 32}
                  width={112}
                  height={64}
                  rx={6}
                  fill="rgba(3, 6, 11, 0.85)"
                  stroke="var(--blocked-red-strong)"
                  strokeWidth={1.4}
                />
                <text
                  x={cx}
                  y={cy - 8}
                  textAnchor="middle"
                  fontSize={20}
                  fill="var(--blocked-red-strong)"
                >
                  {node.glyph}
                </text>
                <text
                  x={cx}
                  y={cy + 16}
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
                  y={cy + 50}
                  textAnchor="middle"
                  fontSize={8.5}
                  fontFamily='Inter, ui-sans-serif, system-ui, sans-serif'
                  fill="var(--muted)"
                >
                  {node.sub.length > 28 ? node.sub.slice(0, 26) + "…" : node.sub}
                </text>
              </g>
            );
          })}

          <text
            x={width / 2}
            y={156}
            textAnchor="middle"
            fontSize={9}
            fontFamily='"JetBrains Mono", monospace'
            letterSpacing={2}
            fill="var(--blocked-red-strong)"
          >
            UNCONTROLLED PROMOTION · NO GATE · NO RECEIPT · NO REVIEW
          </text>
        </svg>
      </div>

      <div className="failure-strip__footer">
        <span className="failure-strip__footer-stamp">▌ Claim firewall · path blocked</span>
        <span className="failure-strip__footer-text">
          HawkinsOperations blocks this path. No uncontrolled promotion. No silent inflation of truth.
        </span>
      </div>

      <div className="failure-strip__nodes" aria-label="Failure-mode node details">
        {failureNodes.map((node) => (
          <details key={node.label} className="disclose failure-strip__node">
            <summary>
              <span className="failure-strip__node-glyph" aria-hidden="true">{node.glyph}</span>
              {node.label}
            </summary>
            <dl className="disclose__body">
              <dt>Why uncontrolled promotion here is dangerous</dt>
              <dd>{node.why}</dd>
              <dt>How HawkinsOperations blocks it</dt>
              <dd>{node.blockedBy}</dd>
            </dl>
          </details>
        ))}
      </div>
    </aside>
  );
}
