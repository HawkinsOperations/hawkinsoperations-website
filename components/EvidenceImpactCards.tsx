/**
 * EvidenceImpactCards
 *
 * Four cards that present each evidence type with an explicit
 * Proves / Does not prove split. Replaces the long "what proves what"
 * prose on the homepage.
 *
 * Claim contract:
 *  - "Proves" lines are bounded by the current public ceiling.
 *  - "Does not prove" lines stay within the claim-firewall surface area
 *    so the blocked-claim scanner accepts them as boundary-scoped.
 *  - No card asserts runtime, signal, public-safe, autonomous, or
 *    AI/analyst disposition status.
 */

type Variant = "source" | "gate" | "linked" | "firewall";

type Card = {
  trustClass: string;
  title: string;
  proves: string;
  doesNotProve: string;
  variant: Variant;
};

const cards: Card[] = [
  {
    trustClass: "SOURCE_EXISTS",
    title: "Source under version control.",
    proves: "Detection rule and SPL exist at known paths in hawkinsoperations-detections with stated owners.",
    doesNotProve: "Runtime deployment, signal output, or fleet coverage. Source presence is not runtime activity.",
    variant: "source",
  },
  {
    trustClass: "TEST_VALIDATED",
    title: "Controlled test cases pass.",
    proves: "HO-DET-001 runs against 7 positive and 7 negative cases in the validation repo with deterministic pass/fail.",
    doesNotProve: "Live signal observation, production deployment, or autonomous SOC disposition. Test passage does not prove runtime behavior.",
    variant: "gate",
  },
  {
    trustClass: "EVIDENCE_LINKED",
    title: "Proof record preserves the chain.",
    proves: "HO-DET-001 record links source, validation fixtures, run output, and the public claim ceiling in one re-runnable trail.",
    doesNotProve: "Public-safe runtime proof or signal-observed status. The record is bounded at the controlled-test ceiling.",
    variant: "linked",
  },
  {
    trustClass: "CLAIM FIREWALL",
    title: "Blocked claims stay blocked.",
    proves: "Deterministic scanner enforces the claim firewall so unsupported wording cannot ship through the rendering surface.",
    doesNotProve: "Anything about the underlying environment. The firewall governs wording, not deployment. Runtime-active, signal-observed, public-safe, autonomous SOC, and AI-approved disposition remain blocked unless separately promoted.",
    variant: "firewall",
  },
];

export default function EvidenceImpactCards() {
  return (
    <ul className="evidence-impact-grid" role="list">
      {cards.map((card) => (
        <li key={card.title} className={`evidence-impact-card evidence-impact-card--${card.variant}`}>
          <p className="evidence-impact-card__class">{card.trustClass}</p>
          <h3 className="evidence-impact-card__title">{card.title}</h3>
          <div className="evidence-impact-card__split">
            <div className="evidence-impact-card__row evidence-impact-card__row--positive">
              <span className="evidence-impact-card__row-key">Proves</span>
              <span className="evidence-impact-card__row-val">{card.proves}</span>
            </div>
            <div className="evidence-impact-card__row evidence-impact-card__row--negative">
              <span className="evidence-impact-card__row-key">Does not prove</span>
              <span className="evidence-impact-card__row-val">{card.doesNotProve}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
