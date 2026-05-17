import { blockedClaims } from "@config/blocked-claims";

/**
 * ClaimFirewallStrip
 *
 * Compressed companion to BlockedClaimStrip. Renders a short list of
 * blocked-claim chips inside a single horizontal band rather than a
 * full panel. Use on pages where the full list lives elsewhere and
 * only a quick "the firewall is active" reminder is needed.
 *
 * Claim contract: blocked claims are surfaced inside an
 * explicit "claim firewall" context, satisfying the scanner's
 * allowed-context rule.
 */
export default function ClaimFirewallStrip({
  limit = 6,
  moreHref = "/controls/",
}: {
  limit?: number;
  moreHref?: string;
}) {
  const items = blockedClaims.slice(0, limit);
  const remaining = Math.max(0, blockedClaims.length - items.length);

  return (
    <div className="claim-firewall-strip" data-blocked-claims aria-label="Claim firewall · blocked wording">
      <span className="claim-firewall-strip__label">Claim firewall · blocked</span>
      <ul className="claim-firewall-strip__list" role="list">
        {items.map((claim) => (
          <li key={claim}>
            <span className="claim-firewall-strip__chip">{claim}</span>
          </li>
        ))}
      </ul>
      <span className="claim-firewall-strip__more">
        {remaining > 0 ? <>+{remaining} more · </> : null}
        <a href={moreHref}>See the full firewall →</a>
      </span>
    </div>
  );
}
