import { blockedClaims } from "@config/blocked-claims";

/**
 * Precision firewall panel.
 *
 *   Left  — title + one-line credibility statement.
 *   Right — SVG firewall + blocked-term chips.
 *
 * Intentionally compact. The brief calls for boundaries to be present but
 * not the emotional center of the page — this panel reads as a control, not
 * an apology.
 */

const FW_W = 360;
const FW_H = 130;

export default function ClaimFirewallPanel({
  title = "Claim firewall",
  line = "Public wording passes through a deterministic scanner before it ships. Blocked terms stay visible — they describe what this surface does not assert.",
}: {
  title?: string;
  line?: string;
} = {}) {
  return (
    <section className="claim-firewall-panel scan-sweep" aria-label={title}>
      <div className="claim-firewall-panel__intro">
        <p className="cockpit-eyebrow">Precision boundary</p>
        <h3 className="claim-firewall-panel__title">{title}</h3>
        <p className="claim-firewall-panel__line">{line}</p>
      </div>

      <div>
        <svg className="claim-firewall-panel__svg" viewBox={`0 0 ${FW_W} ${FW_H}`} role="img" aria-label="Wording change passes through a deterministic scanner before reaching the public surface">
          <defs>
            <marker id="cfp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--electric-blue-bright)" />
            </marker>
            <pattern id="cfp-bars" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M0,6 L6,0" stroke="rgba(252,165,165,0.45)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Wording change */}
          <rect x={10} y={50} width={84} height={30} rx={4} fill="rgba(8,13,22,0.94)" stroke="var(--silver)" strokeWidth={1.2} />
          <text x={52} y={68} fontSize={9} fontFamily='"JetBrains Mono", monospace' fill="var(--silver-bright)" textAnchor="middle" letterSpacing="1.5">WORDING</text>
          <line x1={94} y1={65} x2={134} y2={65} stroke="var(--electric-blue-bright)" strokeWidth={1.6} markerEnd="url(#cfp-arrow)" />

          {/* Scanner */}
          <rect x={138} y={36} width={84} height={58} rx={4} fill="rgba(8,13,22,0.96)" stroke="var(--electric-blue)" strokeWidth={1.4} />
          <text x={180} y={56} fontSize={9} fontFamily='"JetBrains Mono", monospace' fill="var(--electric-blue-bright)" textAnchor="middle" letterSpacing="2">SCANNER</text>
          <line x1={148} y1={68} x2={212} y2={68} stroke="var(--diagram-line-strong)" strokeWidth={1} />
          <line x1={148} y1={76} x2={212} y2={76} stroke="var(--diagram-line-strong)" strokeWidth={1} />
          <line x1={148} y1={84} x2={212} y2={84} stroke="var(--diagram-line-strong)" strokeWidth={1} />
          <line x1={222} y1={65} x2={258} y2={65} stroke="var(--electric-blue-bright)" strokeWidth={1.6} markerEnd="url(#cfp-arrow)" />

          {/* Public ceiling */}
          <rect x={262} y={50} width={88} height={30} rx={4} fill="rgba(238,244,250,0.06)" stroke="var(--silver-bright)" strokeWidth={1.4} />
          <text x={306} y={68} fontSize={9} fontFamily='"JetBrains Mono", monospace' fill="var(--silver-bright)" textAnchor="middle" letterSpacing="1.5">CEILING</text>

          {/* Blocked exit */}
          <rect x={138} y={102} width={84} height={20} fill="url(#cfp-bars)" stroke="var(--blocked-red)" strokeWidth={1} />
          <text x={180} y={116} fontSize={8} fontFamily='"JetBrains Mono", monospace' fill="var(--blocked-red)" textAnchor="middle" letterSpacing="2">BLOCKED</text>
          <line x1={180} y1={94} x2={180} y2={102} stroke="var(--blocked-red)" strokeWidth={1} strokeDasharray="2 2" />

          {/* Label */}
          <text x={10} y={20} fontSize={9} fontFamily='"JetBrains Mono", monospace' fill="var(--electric-blue-bright)" letterSpacing="2">CLAIM · CI/CD</text>
          <text x={FW_W - 10} y={20} fontSize={9} fontFamily='"JetBrains Mono", monospace' fill="var(--muted)" textAnchor="end" letterSpacing="2">DETERMINISTIC GATE</text>
        </svg>

        <div className="claim-firewall-panel__chips" aria-label="Blocked terms">
          {blockedClaims.map((claim) => (
            <span
              key={claim}
              className="claim-firewall-panel__chip"
              tabIndex={0}
              role="note"
              aria-label={`Blocked: ${claim} is blocked from public wording`}
              data-tooltip={`Blocked: ${claim} is not permitted in public wording at this surface.`}
            >
              {claim}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
