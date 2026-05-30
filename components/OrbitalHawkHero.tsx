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

      <div className="ohh__glow" aria-hidden="true" />

      <div className="container ohh__grid">
        <div className="ohh__stage">
          <div className="ohh__frame">
            <span className="ohh__frame-corner ohh__frame-corner--tl" aria-hidden="true" />
            <span className="ohh__frame-corner ohh__frame-corner--tr" aria-hidden="true" />
            <span className="ohh__frame-corner ohh__frame-corner--bl" aria-hidden="true" />
            <span className="ohh__frame-corner ohh__frame-corner--br" aria-hidden="true" />
            <picture>
              <source
                media="(max-width: 720px)"
                srcSet="/brand/hawkinsoperations-hero-mobile.png"
              />
              <img
                className="ohh__brand-img"
                src="/brand/hawkinsoperations-hero-wide.png"
                alt="HawkinsOperations — Detection Engineering SOC. Proof. Truth. Authority."
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>
          <p className="ohh__stage-caption">Detection Engineering SOC · Proof &gt; Truth &gt; Authority</p>
        </div>

        <div className="ohh__content">
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
