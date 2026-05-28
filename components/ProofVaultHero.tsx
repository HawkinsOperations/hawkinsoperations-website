import { governanceSavesSummary } from "@data/governanceSaves";
import { ceiling } from "@config/site";

/**
 * ProofVaultHero
 *
 * Entry to the proof vault — a sealed metallic ring with an electric-blue
 * signal sweep, not a compliance header. Human-readable copy leads; machine
 * labels appear only as secondary chips.
 */

type SealChip = { label: string; tone: "ceiling" | "supported" | "blocked" };

const sealChips: SealChip[] = [
  { label: `Public ceiling · ${ceiling}`, tone: "ceiling" },
  { label: `${governanceSavesSummary.publicRenderedCount} public-facing governance saves`, tone: "supported" },
  { label: "Runtime claims bounded", tone: "blocked" },
  { label: "Private-only records excluded", tone: "blocked" },
];

export default function ProofVaultHero() {
  return (
    <section className="pvh" aria-labelledby="pvh-headline">
      <div className="pvh__field" aria-hidden="true" />

      <div className="container pvh__grid">
        <div className="pvh__copy">
          <p className="pvh__eyebrow">
            <span className="pvh__eyebrow-dot" />
            Evidence vault · claim authority hub
          </p>
          <h1 id="pvh-headline" className="pvh__headline">
            Proof is what survives validation, boundaries, and{" "}
            <span className="pvh__headline-emph">human review.</span>
          </h1>
          <p className="pvh__lede">
            The website routes reviewers to proof. It does not authorize claims.
            Claims either survive the vault — validators, evidence boundaries, and
            human review — or they stop at the gate.
          </p>

          <div className="pvh__chips" role="note" aria-label="Proof status seal">
            {sealChips.map((chip) => (
              <span key={chip.label} className={`pvh__chip pvh__chip--${chip.tone}`}>
                <span className="pvh__chip-dot" aria-hidden="true" />
                {chip.label}
              </span>
            ))}
          </div>

          <div className="pvh__ctas">
            <a className="pvh__cta pvh__cta--primary" href="#governance-saves">
              <span>Governance Saves</span>
              <span aria-hidden="true" className="pvh__cta-arrow">→</span>
            </a>
            <a className="pvh__cta pvh__cta--ghost" href="#proof-pack-001">
              Proof Pack 001
            </a>
            <a className="pvh__cta pvh__cta--ghost" href="#runtime-boundary">
              Runtime Boundary
            </a>
          </div>
        </div>

        <div className="pvh__vault" aria-hidden="true">
          <svg className="pvh__seal" viewBox="0 0 240 240" role="presentation">
            <defs>
              <radialGradient id="pvhCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8FD8FF" stopOpacity="0.34" />
                <stop offset="55%" stopColor="#3B82F6" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#03060B" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="pvhSteel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EEF4FA" />
                <stop offset="55%" stopColor="#8A96A7" />
                <stop offset="100%" stopColor="#2A3340" />
              </linearGradient>
              <linearGradient id="pvhEdge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5FBFFF" stopOpacity="0" />
                <stop offset="50%" stopColor="#8FD8FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#5FBFFF" stopOpacity="0" />
              </linearGradient>
            </defs>

            <circle cx="120" cy="120" r="116" fill="url(#pvhCore)" />
            <circle cx="120" cy="120" r="104" className="pvh__ring pvh__ring--outer" />
            <circle cx="120" cy="120" r="86" className="pvh__ring pvh__ring--mid" />
            <circle cx="120" cy="120" r="64" className="pvh__ring pvh__ring--inner" />

            {/* signal sweep */}
            <circle
              cx="120"
              cy="120"
              r="95"
              className="pvh__sweep"
              fill="none"
              stroke="url(#pvhEdge)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="60 537"
            />

            {/* lugs around the vault door */}
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
              const r = 86;
              return (
                <circle
                  key={i}
                  cx={120 + r * Math.cos(a)}
                  cy={120 + r * Math.sin(a)}
                  r="3.4"
                  className="pvh__lug"
                />
              );
            })}

            {/* sealed core / monogram */}
            <circle cx="120" cy="120" r="46" className="pvh__door" />
            <path
              d="M104 96 L112 96 L112 116 L128 116 L128 96 L136 96 L136 144 L128 144 L128 124 L112 124 L112 144 L104 144 Z"
              fill="url(#pvhSteel)"
              stroke="url(#pvhEdge)"
              strokeWidth="0.8"
            />
            <circle cx="120" cy="120" r="2.6" fill="#8FD8FF" />
          </svg>
        </div>
      </div>
    </section>
  );
}
