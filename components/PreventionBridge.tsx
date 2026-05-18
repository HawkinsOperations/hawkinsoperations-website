/**
 * PreventionBridge
 *
 * Three executive-readable cards immediately after the hero, before the
 * deeper failure-mode and control-layer sections. Frames what the system
 * is built to prevent — readable by hiring managers and SOC leaders
 * without descending into the diagrams below.
 *
 * Claim contract:
 *  - Describes the prevention surface and does not claim runtime-active,
 *    signal-observed, public-safe runtime proof, autonomous SOC,
 *    AI-approved disposition, or analyst-approved disposition. Those
 *    wordings remain blocked by the claim firewall.
 *  - Each card carries a short tag pointing at the deeper section the
 *    reviewer can inspect next.
 */

type Card = {
  num: string;
  title: string;
  body: string;
  tag: string;
  tagHref: string;
  variant: "default" | "amber" | "red";
};

const cards: Card[] = [
  {
    num: "01",
    title: "Uncontrolled AI promotion",
    body:
      "AI output cannot quietly become analyst conclusion, operational action, public claim, or executive truth without passing gates a human signed off on.",
    tag: "See the failure mode",
    tagHref: "#failure-mode",
    variant: "red",
  },
  {
    num: "02",
    title: "Unsupported security claims",
    body:
      "Source, validation, runtime, signal, evidence, and public proof stay separated so each claim remains inside its supported boundary. Public ceiling is bounded.",
    tag: "See the control layer",
    tagHref: "#control-layer",
    variant: "amber",
  },
  {
    num: "03",
    title: "Review failure",
    body:
      "Human review, deterministic scanners, and proof ceilings make it visible what is supported, what is blocked, and what still needs evidence before promotion.",
    tag: "See reviewer routes",
    tagHref: "/start/",
    variant: "default",
  },
];

export default function PreventionBridge() {
  return (
    <ul className="prevention-bridge" role="list">
      {cards.map((card) => (
        <li
          key={card.num}
          className={`prevention-card ${card.variant === "amber" ? "prevention-card--amber" : card.variant === "red" ? "prevention-card--red" : ""}`}
        >
          <span className="prevention-card__num">{card.num}</span>
          <h3 className="prevention-card__title">{card.title}</h3>
          <p className="prevention-card__body">{card.body}</p>
          <a className="prevention-card__tag" href={card.tagHref}>
            {card.tag} →
          </a>
        </li>
      ))}
    </ul>
  );
}
