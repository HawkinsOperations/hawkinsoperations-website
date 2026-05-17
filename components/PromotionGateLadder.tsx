/**
 * Vertical promotion-gate ladder.
 *
 * Reusable across /proof/ and /pipeline/ for surfacing the named gates that
 * must clear before stronger public wording can ship. Replaces the previous
 * flat ledger table with a stepped rail so reviewers see the chain of
 * promotion control, not a spreadsheet of clauses.
 *
 * No proof state is asserted from this component — it renders display rows
 * over data the page passes in. The text remains the authority.
 */

export type PromotionGate = string | { label: string; note?: string };

function asGate(item: PromotionGate): { label: string; note?: string } {
  return typeof item === "string" ? { label: item } : item;
}

export default function PromotionGateLadder({
  items,
  prefix = "G",
  ariaLabel = "Promotion gate ladder",
}: {
  items: PromotionGate[];
  prefix?: string;
  ariaLabel?: string;
}) {
  return (
    <ol className="gate-ladder" aria-label={ariaLabel}>
      {items.map((raw, i) => {
        const gate = asGate(raw);
        const isLast = i === items.length - 1;
        const num = `${prefix}·${String(i + 1).padStart(2, "0")}`;
        return (
          <li key={`${num}-${gate.label}`} className={`gate-ladder__rung ${isLast ? "gate-ladder__rung--last" : ""}`}>
            <span className="gate-ladder__rail" aria-hidden="true" />
            <span className="gate-ladder__node" aria-hidden="true">
              <span className="gate-ladder__node-dot" />
            </span>
            <span className="gate-ladder__num mono">{num}</span>
            <span className="gate-ladder__body">
              <span className="gate-ladder__label">{gate.label}</span>
              {gate.note && <span className="gate-ladder__note">{gate.note}</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
