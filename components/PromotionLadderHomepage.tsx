/**
 * PromotionLadderHomepage
 *
 * Vertical six-rung promotion ladder showing the .github → platform →
 * detections → validation → proof → website authority stack. Each rung
 * is separated by a PROMOTION GATE strip. Right side-rail carries the
 * SYSTEM RULE and WHAT THIS PREVENTS cards.
 *
 * Claim contract:
 *  - Describes the governance ladder; does not assert runtime, signal,
 *    or public-safe state.
 *  - Top rung ("website") carries a ceiling cap labelled
 *    CONTROLLED_TEST_VALIDATED.
 */

import { ceiling } from "@config/site";

type Rung = {
  num: number;
  name: string;
  role: string;
  detail: string;
  glyph: string;
};

// Ordered bottom (.github = 1) to top (website = 6)
const rungs: Rung[] = [
  { num: 1, name: ".github",     role: "Governance · reviewer routing", detail: "PR templates · human review visibility · required checks", glyph: "⟨/⟩" },
  { num: 2, name: "platform",    role: "Runtime contracts",             detail: "Execution boundaries · runtime handling rules · no fantasy claims", glyph: "🛡" },
  { num: 3, name: "detections",  role: "Source logic",                  detail: "Detection content · logic lives here · source is not proof", glyph: "🐛" },
  { num: 4, name: "validation",  role: "Tests · fixtures · verifiers",  detail: "Schema checks · CI validation · controlled-test boundaries", glyph: "🧪" },
  { num: 5, name: "proof",       role: "Evidence boundary",             detail: "Claim ceilings · what is supported · no auto-promotion", glyph: "📜" },
  { num: 6, name: "website",     role: "Public rendering",              detail: "Bounded claims only · rendering is not proof", glyph: "🌐" },
];

const gateRules = "checks pass · ceiling preserved · no private leakage · explicit review";

export default function PromotionLadderHomepage() {
  // Render top-to-bottom: website at top, .github at bottom
  const stack = [...rungs].reverse();

  return (
    <section className="promo-ladder" aria-labelledby="promo-ladder-title">
      <div className="promo-ladder__stack">
        {stack.map((rung, i) => {
          const isTop = rung.num === 6;
          const isLast = i === stack.length - 1; // .github at the bottom in render order
          return (
            <div key={rung.num}>
              <article
                className={`promo-ladder__rung ${isTop ? "promo-ladder__rung--top" : ""}`}
                aria-label={`Rung ${rung.num} ${rung.name}`}
              >
                <span className="promo-ladder__rung-num">{rung.num}</span>
                <div>
                  <p className="promo-ladder__rung-name">
                    <span aria-hidden="true" style={{ marginRight: "0.5rem" }}>{rung.glyph}</span>
                    {rung.name}
                  </p>
                  <p className="promo-ladder__rung-role">{rung.role}</p>
                  <p className="promo-ladder__rung-role" style={{ marginTop: "0.4rem", color: "var(--silver)" }}>
                    {rung.detail}
                  </p>
                </div>
                {isTop && (
                  <span className="promo-ladder__rung-cap" aria-label={`Public ceiling ${ceiling}`}>
                    Ceiling · {ceiling}
                  </span>
                )}
              </article>
              {!isLast && (
                <div className="promo-ladder__gate" aria-hidden="true">
                  <span>Promotion gate</span>
                  <span className="promo-ladder__gate-rules">{gateRules}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <aside className="promo-ladder__side" aria-label="Promotion ladder side notes">
        <div className="promo-ladder__card promo-ladder__card--rule">
          <p className="promo-ladder__card-eyebrow">System rule</p>
          <p className="promo-ladder__card-text">
            Higher surfaces can only inherit bounded truth from lower surfaces. Work moves upward
            only when lower-surface rules are satisfied.
          </p>
        </div>
        <div className="promo-ladder__card promo-ladder__card--prev">
          <p className="promo-ladder__card-eyebrow">What this prevents</p>
          <ul className="promo-ladder__card-list">
            <li>Unauthorized claim promotion</li>
            <li>Private leakage into public surfaces</li>
            <li>Source treated as proof</li>
            <li>Dashboards mistaken for truth</li>
          </ul>
        </div>
        <div className="promo-ladder__card">
          <p className="promo-ladder__card-eyebrow" style={{ color: "var(--ice-blue)" }}>Authority</p>
          <p className="promo-ladder__card-text">
            AI generates work. Evidence and human review authorize claims. Promotion is gated and
            reviewer-visible.
          </p>
        </div>
      </aside>

      <h2 id="promo-ladder-title" style={{ position: "absolute", left: "-9999px" }}>
        Promotion ladder
      </h2>
    </section>
  );
}
