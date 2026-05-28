import type { Metadata } from "next";
import ProofVaultHero from "@components/ProofVaultHero";
import ControlsFiredGraph from "@components/ControlsFiredGraph";
import ClaimFirewallSplitPane from "@components/ClaimFirewallSplitPane";
import ProofPackReceipt from "@components/ProofPackReceipt";
import ProofManifestConsole from "@components/ProofManifestConsole";
import RuntimeBoundaryVisual from "@components/RuntimeBoundaryVisual";
import ProofRecordsEvidenceBay from "@components/ProofRecordsEvidenceBay";
import ProofTrustBoundaryRail from "@components/ProofTrustBoundaryRail";
import PromotionGateLadder from "@components/PromotionGateLadder";
import RecentGovernedArtifacts from "@components/RecentGovernedArtifacts";
import { promotionRequirements } from "@data/claims";
import { externalLinks } from "@data/navigation";

export const metadata: Metadata = {
  title: "Proof | HawkinsOperations",
  description:
    "HawkinsOperations evidence vault and claim authority hub: governance saves, the claim firewall, Proof Pack 001, the runtime boundary, and proof records. The website routes reviewers to proof; it does not authorize claims.",
  alternates: {
    canonical: "/proof/",
  },
};

export default function ProofIndexPage() {
  return (
    <>
      {/* ── Vault hero ───────────────────────────────────────────────── */}
      <ProofVaultHero />

      {/* ── Governance Saves dashboard ───────────────────────────────── */}
      <section id="governance-saves" className="cockpit-section--tight">
        <div className="container">
          <ControlsFiredGraph />
          <div className="biz-translate" role="note" aria-label="Business translation">
            <span className="biz-translate__label">In plain English</span>
            <span>
              <span className="biz-translate__text">
                Governance saves are the moments a control fired before bad truth shipped —
                drift was attempted, the control caught it, and the public surface stayed honest.
                Private-only records are excluded from this view.
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* ── Claim firewall ───────────────────────────────────────────── */}
      <div id="verifiers" className="legacy-anchor-target" aria-hidden="true" />
      <section id="claim-firewall" className="cockpit-section--tight">
        <div className="container">
          <ClaimFirewallSplitPane />
        </div>
      </section>

      {/* ── Proof Pack 001 ───────────────────────────────────────────── */}
      <section id="proof-pack-001" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Sealed reviewer package</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Proof Pack 001 — a bounded reviewer package.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              The receipt states what the package supports and what it does not prove.
              Raw / private runtime evidence is excluded and public runtime proof stays blocked.
            </p>
          </div>
          <ProofPackReceipt />
          <div className="mt-6">
            <ProofManifestConsole />
          </div>
        </div>
      </section>

      {/* ── Runtime boundary tower ───────────────────────────────────── */}
      <div id="validation-registry" className="legacy-anchor-target" aria-hidden="true" />
      <section id="runtime-boundary" className="cockpit-section--tight">
        <div className="container">
          <RuntimeBoundaryVisual />
        </div>
      </section>

      {/* ── Evidence bay · proof records ─────────────────────────────── */}
      <section id="evidence-bay" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Evidence bay</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Proof records — receipts, not a ledger.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              The flagship record leads; supporting records follow at lower weight.
              Each holds its bounded ceiling and a supports / does-not-prove split.
            </p>
          </div>
          <ProofRecordsEvidenceBay />
        </div>
      </section>

      {/* ── Promotion gates (supporting) ─────────────────────────────── */}
      <section id="promotion-gates" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Promotion gates</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }}>
              What must hold before stronger wording ships.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              The ladder is sequential — no rung is skipped. Stronger runtime, signal,
              and public proof wording cannot ship until its gate clears.
            </p>
          </div>
          <PromotionGateLadder items={promotionRequirements} ariaLabel="Promotion gate ladder" />
        </div>
      </section>

      {/* ── Recent governed proof work (compact) ─────────────────────── */}
      <section id="recent-governed-proof-work" className="cockpit-section--tight">
        <div className="container">
          <RecentGovernedArtifacts
            surface="proof"
            heading="Recent governed proof-repo work"
            sub="Recent governed work on the proof repo. Reviewer-visible cards that do not change the public claim ceiling. Stronger wording requires a separate evidence-backed promotion gate."
          />
        </div>
      </section>

      {/* ── Control routes ───────────────────────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Routes</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }}>
              Where to inspect next.
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <a className="artifact-tile" href="/proof/governance-saves/">
              <span className="artifact-tile__cat">GOVERNANCE SAVES</span>
              <span className="artifact-tile__title">Controls that prevented unsafe truth</span>
              <span className="artifact-tile__desc">
                Public-backed examples where review, verifiers, branch hygiene, and claim ceilings blocked drift.
              </span>
              <span className="artifact-tile__link">Open →</span>
            </a>
            <a className="artifact-tile" href="/architecture/">
              <span className="artifact-tile__cat">ARCHITECTURE</span>
              <span className="artifact-tile__title">Plane separation map</span>
              <span className="artifact-tile__desc">Where each surface lives and what its promotion gate looks like.</span>
              <span className="artifact-tile__link">Open →</span>
            </a>
            <a className="artifact-tile" href={externalLinks.controlMatrix} target="_blank" rel="noopener noreferrer">
              <span className="artifact-tile__cat">CONTROL MATRIX ↗</span>
              <span className="artifact-tile__title">Status routing</span>
              <span className="artifact-tile__desc">
                Routing surface for HawkinsOperations control ownership and promotion state.
              </span>
              <span className="artifact-tile__link">Open ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Trust boundary rail ──────────────────────────────────────── */}
      <ProofTrustBoundaryRail />
    </>
  );
}
