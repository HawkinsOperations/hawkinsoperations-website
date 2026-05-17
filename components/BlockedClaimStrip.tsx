import { blockedClaims } from "@config/blocked-claims";

export interface BlockedClaimStripProps {
  variant?: "compact" | "full";
}

export default function BlockedClaimStrip({ variant = "full" }: BlockedClaimStripProps) {
  const items = variant === "compact" ? blockedClaims.slice(0, 8) : blockedClaims;
  return (
    <div className="moon-panel p-7 md:p-8" data-blocked-claims data-ci-target="blocked-claims">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow" style={{ color: "#FCA5A5" }}>Blocked claims</p>
          <h3 className="headline mt-2 text-2xl text-[var(--silver-bright)]">
            Kept off the public surface by design
          </h3>
          <p className="muted mt-2 max-w-2xl text-sm leading-6">
            These claims remain blocked unless separate evidence-backed promotion changes their state.
            Visibility of the blocked list keeps the supported ceiling honest.
          </p>
        </div>
        <span className="chip chip-block">CLAIM FIREWALL · ACTIVE</span>
      </div>
      <ul className="mt-6 flex flex-wrap gap-2">
        {items.map((claim) => (
          <li key={claim}>
            <span className="mono inline-flex items-center gap-2 border border-[rgba(251,113,133,0.32)] bg-[rgba(251,113,133,0.06)] px-3 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-[#FCA5A5] rounded-sm">
              <span className="inline-block size-1.5 rounded-full bg-[#FCA5A5] shadow-[0_0_8px_rgba(251,113,133,0.45)]"></span>
              {claim}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-5 grid gap-3 border-t border-[var(--moon-border)] pt-5 text-xs leading-5 text-[var(--muted)] md:grid-cols-3">
        <p>Public-safe runtime proof is not claimed.</p>
        <p>Cribl-routed, Wazuh-routed, AWS-live are not claimed.</p>
        <p>Autonomous SOC and AI-approved disposition are not claimed.</p>
      </div>
    </div>
  );
}
