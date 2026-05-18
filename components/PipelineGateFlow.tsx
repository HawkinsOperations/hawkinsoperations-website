/**
 * PipelineGateFlow
 *
 * Reviewer-facing visualization of how a repo change becomes public
 * wording inside HawkinsOperations:
 *   Repo change → Pull Request → GitHub Actions → Controlled fixtures
 *   → Deterministic validators → Blocked-claim scanner → Proof record
 *   → Website rendering
 *
 * Each stage carries a details/summary drawer that explains what
 * happens, what it supports, what it does NOT prove, the next gate,
 * and the related surface.
 *
 * Visual contract:
 *  - Animated SVG data pulse along the route (decorative).
 *  - Public ceiling stays CONTROLLED_TEST_VALIDATED.
 *  - No live / real-time / runtime claim. The route is a proof-route
 *    map; it is not a live telemetry stream.
 */

type Stage = {
  num: string;
  code: string;
  name: string;
  glyph: string;
  what: string;
  supports: string;
  doesNotProve: string;
  nextGate: string;
  surface: string;
};

const stages: Stage[] = [
  {
    num: "01", code: "REPO_CHANGE", name: "Repo change", glyph: "⟨/⟩",
    what: "A change is made in a source repository — detection rule, validator, proof wording, or website route.",
    supports: "A change exists at a known path with a stated owner.",
    doesNotProve: "Runtime activity, signal observation, or any public claim. Source presence is not proof.",
    nextGate: "Pull request opens a reviewer-visible boundary around the change.",
    surface: "Source surface · detections / platform / validation / proof / website",
  },
  {
    num: "02", code: "PULL_REQUEST", name: "Pull request", glyph: "↳",
    what: "Change is opened as a pull request so reviewers can see what is proposed before it merges.",
    supports: "The change is reviewer-visible and the diff is bounded.",
    doesNotProve: "Merge approval, runtime behaviour, or claim promotion.",
    nextGate: "GitHub Actions runs the required checks defined by the repo's contract.",
    surface: "Governance surface · .github / repo PR settings",
  },
  {
    num: "03", code: "GH_ACTIONS", name: "GitHub Actions", glyph: "▶",
    what: "Configured GitHub Actions workflows run on the PR — site contract checks, blocked-claim scans, and deterministic validators.",
    supports: "Required checks executed against the change inside the controlled-test boundary.",
    doesNotProve: "Production deployment, model execution in CI, GPU CI proven status, runtime-active behaviour, or signal-observed activity.",
    nextGate: "Controlled fixtures and deterministic validators decide pass/fail.",
    surface: "Required checks surface · .github/workflows",
  },
  {
    num: "04", code: "CONTROLLED_FIXTURES", name: "Controlled fixtures", glyph: "🧪",
    what: "Positive and negative test cases (fixtures) define the contract the change must satisfy.",
    supports: "A bounded contract exists for what the change must accept and reject.",
    doesNotProve: "Runtime fire on real telemetry, signal-observed status, or fleet-wide behaviour.",
    nextGate: "Validators run the fixtures and emit a deterministic pass/fail receipt.",
    surface: "Validation surface · hawkinsoperations-validation",
  },
  {
    num: "05", code: "VALIDATORS", name: "Deterministic validators", glyph: "✓",
    what: "Validators execute against the fixtures and produce a deterministic pass/fail outcome.",
    supports: "A reviewable pass/fail receipt for the controlled-test contract.",
    doesNotProve: "Public-safe runtime proof, runtime-active behaviour, signal-observed activity, AI-approved disposition, or analyst-approved disposition.",
    nextGate: "Blocked-claim scanner inspects the diff for wording that cannot ship publicly.",
    surface: "Validation surface · controlled-test boundary",
  },
  {
    num: "06", code: "SCANNER", name: "Blocked-claim scanner", glyph: "▌",
    what: "Site contract scanner inspects the change for blocked wording (runtime-active, signal-observed, public-safe runtime proof, autonomous SOC, and others) outside of explicit blocked/negative context.",
    supports: "Blocked terms cannot silently appear as public assertions; they remain visible only as blocked claims.",
    doesNotProve: "That every claim is true — only that no blocked-term wording shipped through the rendering surface.",
    nextGate: "Proof record links source, validation, and the bounded public claim.",
    surface: "Claim firewall surface · verify-site-contract.mjs",
  },
  {
    num: "07", code: "PROOF_RECORD", name: "Proof record", glyph: "📜",
    what: "An evidence record in the proof repo preserves what the change supports, what it does not prove, and the public ceiling that applies.",
    supports: "A reviewer-visible record of the bounded claim and the evidence path that supports it.",
    doesNotProve: "Public-safe state on its own — promotion to public requires separate evidence and Raylee approval.",
    nextGate: "Website renders the proof route under the public claim ceiling.",
    surface: "Evidence surface · hawkinsoperations-proof",
  },
  {
    num: "08", code: "WEBSITE_RENDER", name: "Website rendering", glyph: "🌐",
    what: "The website renders the proof route at the public ceiling so reviewers can inspect the chain end to end.",
    supports: "A bounded public rendering that routes reviewers back to source, validation, and the proof record.",
    doesNotProve: "Anything beyond rendering. Website rendering is not proof. Human review authorizes whether wording can move past the current public ceiling.",
    nextGate: "Human review authorizes any promotion above CONTROLLED_TEST_VALIDATED.",
    surface: "Public rendering surface · hawkinsoperations-website",
  },
];

export default function PipelineGateFlow() {
  const width = 1040;
  const height = 200;
  const padX = 36;
  const cy = 88;
  const nodeR = 18;
  const stride = (width - padX * 2) / (stages.length - 1);

  return (
    <section className="gate-flow" aria-label="How the proof pipeline works">
      <div className="gate-flow__svg-wrap">
        <svg
          className="gate-flow__svg"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Proof pipeline gate flow: repo change to website rendering"
        >
          <defs>
            <marker id="gf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--electric-blue-bright)" />
            </marker>
            <linearGradient id="gf-rail" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%"   stopColor="rgba(59,130,246,0.18)" />
              <stop offset="50%"  stopColor="rgba(96,165,250,0.55)" />
              <stop offset="100%" stopColor="rgba(143,216,255,0.9)" />
            </linearGradient>
          </defs>

          {/* Through rail */}
          <line x1={padX} y1={cy} x2={width - padX} y2={cy} stroke="url(#gf-rail)" strokeWidth={2.4} />

          {/* Animated pulse along the rail */}
          <circle r={5} fill="var(--ice-blue)" opacity={0.95} className="svg-pulse">
            <animateMotion dur="6s" repeatCount="indefinite" path={`M ${padX} ${cy} L ${width - padX} ${cy}`} />
          </circle>
          <circle r={11} fill="none" stroke="var(--ice-blue)" strokeOpacity={0.32} className="svg-pulse">
            <animateMotion dur="6s" repeatCount="indefinite" path={`M ${padX} ${cy} L ${width - padX} ${cy}`} />
          </circle>

          {stages.map((s, i) => {
            const cx = padX + stride * i;
            const isLast = i === stages.length - 1;
            const isReview = s.code === "WEBSITE_RENDER";
            const isFirewall = s.code === "SCANNER";
            const stroke =
              isReview ? "var(--ice-blue)"
              : isFirewall ? "var(--blocked-red-strong)"
              : s.code === "PROOF_RECORD" ? "var(--ceiling-amber)"
              : "var(--electric-blue-bright)";
            return (
              <g key={s.code}>
                {!isLast && (
                  <line
                    x1={cx + nodeR + 2}
                    y1={cy}
                    x2={cx + stride - nodeR - 5}
                    y2={cy}
                    stroke="var(--electric-blue-bright)"
                    strokeWidth={1.6}
                    markerEnd="url(#gf-arrow)"
                    opacity={0.78}
                  />
                )}
                <circle cx={cx} cy={cy} r={nodeR + 7} fill="none" stroke={stroke} strokeOpacity={0.3} strokeWidth={1} />
                <circle cx={cx} cy={cy} r={nodeR} fill="rgba(3,6,11,0.95)" stroke={stroke} strokeWidth={1.8} />
                <text x={cx} y={cy + 4} textAnchor="middle" fontSize={11} fontWeight={800} fontFamily='"JetBrains Mono", monospace' fill={stroke} letterSpacing={1.2}>
                  {s.num}
                </text>
                <text x={cx} y={cy - 32} textAnchor="middle" fontSize={9} fontFamily='"JetBrains Mono", monospace' fontWeight={700} fill="var(--silver-bright)" letterSpacing={1.4}>
                  {s.code}
                </text>
                <text x={cx} y={cy + 44} textAnchor="middle" fontSize={9.5} fontFamily="Inter, ui-sans-serif, system-ui, sans-serif" fill="#C9D3DF">
                  {s.name}
                </text>
              </g>
            );
          })}

          {/* Top label strip */}
          <text x={padX} y={20} fontSize={10} fontFamily='"JetBrains Mono", monospace' fill="var(--electric-blue-bright)" letterSpacing="2.4">
            HOW THE PROOF PIPELINE WORKS
          </text>
          <text x={width - padX} y={20} fontSize={10} fontFamily='"JetBrains Mono", monospace' fill="var(--muted)" letterSpacing="2" textAnchor="end">
            SOURCE → BOUNDARY · CONTROLLED_TEST_VALIDATED
          </text>

          {/* Public boundary marker after node 08 */}
          <line
            x1={padX + stride * (stages.length - 1) + nodeR + 12}
            y1={cy - 26}
            x2={padX + stride * (stages.length - 1) + nodeR + 12}
            y2={cy + 26}
            stroke="var(--ice-blue)"
            strokeWidth={1.4}
            strokeDasharray="3 3"
          />
        </svg>
      </div>

      <ul className="gate-flow__legend" aria-hidden="true">
        <li className="gate-flow__legend-item">
          <span className="hero-console__dot hero-console__dot--flow" /> flow node
        </li>
        <li className="gate-flow__legend-item">
          <span className="hero-console__dot hero-console__dot--blocked" /> claim firewall
        </li>
        <li className="gate-flow__legend-item">
          <span className="hero-console__dot hero-console__dot--review" /> proof record / ceiling
        </li>
        <li className="gate-flow__legend-item">
          <span className="hero-console__dot hero-console__dot--public" /> public rendering boundary
        </li>
      </ul>

      <div className="gate-flow__nodes" aria-label="Pipeline node inspection drawers">
        {stages.map((s) => (
          <details key={s.code} className="gate-flow__node disclose">
            <summary>
              <span className="gate-flow__node-num">{s.num}</span>
              <span>{s.name}</span>
            </summary>
            <dl className="disclose__body">
              <dt>What happens</dt>
              <dd>{s.what}</dd>
              <dt>What this supports</dt>
              <dd>{s.supports}</dd>
              <dt>What this does NOT prove</dt>
              <dd style={{ color: "var(--blocked-red-strong)" }}>{s.doesNotProve}</dd>
              <dt>Next gate</dt>
              <dd>{s.nextGate}</dd>
              <dt>Related surface</dt>
              <dd>{s.surface}</dd>
            </dl>
          </details>
        ))}
      </div>
    </section>
  );
}
