import { governanceSavesSummary } from "@data/governanceSaves";

type StatusChipTone = "det" | "ceiling" | "blocked" | "released";

const statusChips: { label: string; tone: StatusChipTone }[] = [
  { label: "Controls fired before public truth", tone: "ceiling" },
  { label: `${governanceSavesSummary.publicRenderedCount} public-facing governance examples`, tone: "det" },
  { label: "Proof Pack 001 available", tone: "released" },
  { label: "AI support-only", tone: "det" },
  { label: "Runtime claims bounded", tone: "blocked" },
  { label: "Private-only records excluded", tone: "blocked" },
];

const constellationNodes = [
  { x: 6, y: 22 }, { x: 14, y: 68 }, { x: 22, y: 12 }, { x: 28, y: 44 },
  { x: 36, y: 78 }, { x: 44, y: 18 }, { x: 58, y: 82 }, { x: 66, y: 36 },
  { x: 74, y: 68 }, { x: 82, y: 24 }, { x: 90, y: 54 }, { x: 95, y: 14 },
  { x: 12, y: 88 }, { x: 50, y: 8 }, { x: 78, y: 90 },
];

const constellationLines = [
  { x1: 6, y1: 22, x2: 22, y2: 12 },
  { x1: 22, y1: 12, x2: 44, y2: 18 },
  { x1: 44, y1: 18, x2: 50, y2: 8 },
  { x1: 50, y1: 8, x2: 82, y2: 24 },
  { x1: 82, y1: 24, x2: 95, y2: 14 },
  { x1: 14, y1: 68, x2: 28, y2: 44 },
  { x1: 28, y1: 44, x2: 36, y2: 78 },
  { x1: 36, y1: 78, x2: 58, y2: 82 },
  { x1: 58, y1: 82, x2: 78, y2: 90 },
  { x1: 66, y1: 36, x2: 74, y2: 68 },
  { x1: 74, y1: 68, x2: 90, y2: 54 },
  { x1: 12, y1: 88, x2: 36, y2: 78 },
];

export default function OrbitalHawkHero() {
  return (
    <section className="ohh" aria-labelledby="ohh-headline">
      <div className="ohh__image" aria-hidden="true" />

      <div className="ohh__sky" aria-hidden="true">
        <svg
          className="ohh__constellation"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          role="presentation"
        >
          {constellationLines.map((line, i) => (
            <line
              key={`l-${i}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              className="ohh__net-line"
            />
          ))}
          {constellationNodes.map((node, i) => (
            <circle
              key={`n-${i}`}
              cx={node.x}
              cy={node.y}
              r="0.55"
              className="ohh__net-node"
              style={{ animationDelay: `${(i % 6) * 0.6}s` }}
            />
          ))}
        </svg>
      </div>

      <div className="ohh__core" aria-hidden="true">
        <div className="ohh__ring ohh__ring--xl" />
        <div className="ohh__ring ohh__ring--lg" />
        <div className="ohh__ring ohh__ring--md" />
        <div className="ohh__ring ohh__ring--sm" />
        <div className="ohh__pulse" />
        <div className="ohh__monogram">
          <svg viewBox="0 0 100 120" role="presentation">
            <defs>
              <linearGradient id="ohhSteel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E7EEF7" />
                <stop offset="50%" stopColor="#8A96A7" />
                <stop offset="100%" stopColor="#2A3340" />
              </linearGradient>
              <linearGradient id="ohhEdge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5FBFFF" stopOpacity="0.0" />
                <stop offset="50%" stopColor="#8FD8FF" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#5FBFFF" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M14 8 L34 8 L34 50 L66 50 L66 8 L86 8 L86 112 L66 112 L66 70 L34 70 L34 112 L14 112 Z"
              fill="url(#ohhSteel)"
              stroke="url(#ohhEdge)"
              strokeWidth="0.8"
            />
            <circle cx="50" cy="60" r="3.6" fill="#8FD8FF" opacity="0.95" />
          </svg>
        </div>
      </div>

      <div className="ohh__veil" aria-hidden="true" />

      <div className="container ohh__content">
        <div className="max-w-5xl">
          <p className="ohh__eyebrow">
            <span className="ohh__eyebrow-dot" />
            AI Security Operations · Reviewer cockpit
          </p>
          <h1 id="ohh-headline" className="ohh__headline">
            Governance that catches bad security truth{" "}
            <span className="ohh__headline-emph">before it ships.</span>
          </h1>
          <p className="ohh__lede">
            HawkinsOperations is a governed AI Security Operations and detection engineering control plane.
            It turns fast AI-assisted security work into evidence-bounded, reviewer-inspectable output.
          </p>
          <p className="ohh__lede ohh__lede--quiet">
            The proof is not that a website renders. The proof is that controls fired: unsafe claims
            were blocked, stale truth was corrected, private evidence stayed private, and AI stayed support-only.
          </p>

          <div className="ohh__chips" role="note" aria-label="Reviewer status">
            {statusChips.map((chip) => (
              <span key={chip.label} className={`ohh__chip ohh__chip--${chip.tone}`}>
                <span className="ohh__chip-dot" />
                {chip.label}
              </span>
            ))}
          </div>

          <div className="ohh__ctas">
            <a className="ohh__cta ohh__cta--primary" href="/proof/">
              <span>See Proof</span>
              <span aria-hidden="true" className="ohh__cta-arrow">→</span>
            </a>
            <a className="ohh__cta ohh__cta--ghost" href="/artifacts/">
              Inspect Artifacts
            </a>
            <a className="ohh__cta ohh__cta--ghost" href="/ai-security/">
              View AI Security Model
            </a>
          </div>

          <p className="ohh__boundary">
            <strong>Trust boundary.</strong> Website rendering is not proof.
            Evidence, validators, and human review authorize claims.
          </p>
        </div>
      </div>
    </section>
  );
}
