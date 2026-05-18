/**
 * PipelineGateCards
 *
 * Three compact explanation cards under "How the proof pipeline works":
 * required checks, claim firewall, human review. Each card carries a
 * technical line and a plain-English translation.
 */

type Card = {
  title: string;
  tech: string;
  plain: string;
  variant: "default" | "amber" | "red";
  href?: string;
  hrefLabel?: string;
};

const cards: Card[] = [
  {
    title: "Required checks",
    tech: "GitHub Actions runs deterministic validation and site/proof contract checks before public wording ships.",
    plain: "Pull requests can move faster, but public claims cannot outrun the gates.",
    variant: "default",
    href: "/proof-loop/",
    hrefLabel: "Inspect the proof loop →",
  },
  {
    title: "Claim firewall",
    tech: "Blocked terms remain visible as blocked claims but cannot silently become public assertions.",
    plain: "The system can discuss what is blocked without accidentally claiming it.",
    variant: "red",
    href: "/controls/",
    hrefLabel: "Open the claim firewall →",
  },
  {
    title: "Human review",
    tech: "Green checks are not authority. Review authorizes whether a claim can move forward.",
    plain: "Automation does labor. Human review authorizes truth.",
    variant: "amber",
    href: "/start/",
    hrefLabel: "Choose a reviewer route →",
  },
];

export default function PipelineGateCards() {
  return (
    <ul className="gh-gate-cards" role="list">
      {cards.map((c) => (
        <li
          key={c.title}
          className={`gh-gate-card spotlight ${
            c.variant === "amber" ? "gh-gate-card--amber spotlight--amber"
            : c.variant === "red" ? "gh-gate-card--red spotlight--red"
            : ""
          }`}
        >
          <p className="gh-gate-card__eyebrow">GitHub Actions · gate</p>
          <h3 className="gh-gate-card__title">{c.title}</h3>
          <p className="gh-gate-card__tech">{c.tech}</p>
          <p className="gh-gate-card__plain">
            <b>In plain English</b>
            {c.plain}
          </p>
          {c.href && (
            <p style={{ marginTop: "0.9rem", fontFamily: '"JetBrains Mono", monospace', fontSize: "0.7rem", letterSpacing: "0.14em" }}>
              <a href={c.href} style={{ color: "var(--ice-blue)", borderBottom: "1px solid rgba(143,216,255,0.4)" }}>
                {c.hrefLabel}
              </a>
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
