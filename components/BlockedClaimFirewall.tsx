/**
 * BlockedClaimFirewall
 *
 * Stronger visual blocked-claim strip. Each chip expands to show why the
 * claim is blocked. Blocked claims stay visually separate from proof-positive
 * content and are not presented as features. Renders
 * src/data/blockedClaimFirewall.ts.
 */

import { blockedClaimFirewall } from "@data/blockedClaimFirewall";

export default function BlockedClaimFirewall() {
  return (
    <div className="bcf" data-ci-target="blocked-claims" aria-label="Blocked-claim firewall">
      <div className="bcf__head">
        <span className="bcf__title">Blocked-claim firewall</span>
        <span className="p2-badge p2-badge--block">{blockedClaimFirewall.length} blocked · click to expand</span>
      </div>
      <div className="bcf__chips">
        {blockedClaimFirewall.map((entry) => (
          <details key={entry.term} className="bcf__chip">
            <summary>{entry.term}</summary>
            <span className="bcf__chip-detail">{entry.detail}</span>
          </details>
        ))}
      </div>
    </div>
  );
}
