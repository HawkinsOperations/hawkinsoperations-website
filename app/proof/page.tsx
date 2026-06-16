import type { Metadata } from "next";
import ProofVaultHero from "@components/ProofVaultHero";
import BlockedClaimStrip from "@components/BlockedClaimStrip";
import ControlsFiredGraph from "@components/ControlsFiredGraph";
import ClaimFirewallSplitPane from "@components/ClaimFirewallSplitPane";
import ProofPackReceipt from "@components/ProofPackReceipt";
import ProofManifestConsole from "@components/ProofManifestConsole";
import RuntimeBoundaryVisual from "@components/RuntimeBoundaryVisual";
import ProofRecordsEvidenceBay from "@components/ProofRecordsEvidenceBay";
import ProofTrustBoundaryRail from "@components/ProofTrustBoundaryRail";
import PromotionGateLadder from "@components/PromotionGateLadder";
import RecentGovernedArtifacts from "@components/RecentGovernedArtifacts";
import EvidenceBayScene from "@components/evidence/EvidenceBay";
import ProofAuthorityBay from "@components/evidence/ProofAuthorityBay";
import { AuthorityConstellation, ClaimDecisionMatrixVisual } from "@components/visual-intelligence";
import { promotionRequirements } from "@data/claims";
import { externalLinks } from "@data/navigation";
import { lifetimeCaseLedgerV1 } from "@data/proofRecords";

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

      <section className="cockpit-section--tight">
        <div className="container">
          <ProofAuthorityBay />
          <div className="mt-6" />
          <EvidenceBayScene />
        </div>
      </section>

      <section id="hoxline-rendering-reference" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Hoxline rendering reference</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "2rem" }}>
              Hoxline can visualize the loop. Proof authority stays here.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Gauntlet v0 output is useful reviewer context for HO-DET-001, but it does not make
              Hoxline or the website proof authority. Runtime and signal promotion still require
              separate evidence and review records.
            </p>
          </div>
          <div className="vi-grid-2">
            <AuthorityConstellation compact />
            <ClaimDecisionMatrixVisual />
          </div>
        </div>
      </section>

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
          <div className="mt-6">
            <BlockedClaimStrip variant="compact" />
          </div>
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

      {/* ── Lifetime Case Ledger v1 render-only route ───────────────── */}
      <section id="lifetime-case-ledger" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Render-only ledger route</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Lifetime Case Ledger v1
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              The website is render-only; the proof repo owns the summary and proof bundle.
              The badges are workflow-status indicators only. Boundary: no runtime, signal, public-safe runtime proof, SOCaaS, production, autonomous SOC, disposition, or case-closure claim is made.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <article className="artifact-tile">
              <span className="artifact-tile__cat">LEDGER STATUS</span>
              <span className="artifact-tile__title">NOT_PUBLIC_SAFE</span>
              <span className="artifact-tile__desc">Proof ceiling: SCHEMA_CONTRACT_VERIFIER_EXISTS_ONLY</span>
            </article>
            <article className="artifact-tile">
              <span className="artifact-tile__cat">COUNT SNAPSHOT</span>
              <span className="artifact-tile__title">total_ledger_events=6</span>
              <span className="artifact-tile__desc">
                total_cases=6 · public_safe_count=0 · closed_case_count=0
              </span>
            </article>
            <article className="artifact-tile">
              <span className="artifact-tile__cat">APPENDED DETECTIONS</span>
              <span className="artifact-tile__title">HO-DET-001, HO-DET-011, HO-DET-012</span>
              <span className="artifact-tile__desc">Tracked by proof-owned summary references, not by website authority.</span>
            </article>
            <article className="artifact-tile">
              <span className="artifact-tile__cat">VERIFICATION STATUS</span>
              <span className="artifact-tile__title">Workflow-status indicators only</span>
              <span className="artifact-tile__desc">
                Inspect lifetime-ledger-public-summary and lifetime-ledger-proof-bundle jobs in Governance Gate.
              </span>
            </article>
          </div>

          <div className="grid gap-3 md:grid-cols-3 mt-4">
            {lifetimeCaseLedgerV1.references.map((reference) => (
              <a
                key={reference.label}
                className="artifact-tile"
                href={reference.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="artifact-tile__cat">{reference.label.toUpperCase()} ↗</span>
                <span className="artifact-tile__title">{reference.repoPath}</span>
                <span className="artifact-tile__desc">{reference.role}</span>
                <span className="artifact-tile__link">Open ↗</span>
              </a>
            ))}
          </div>

          <div className="biz-translate mt-4" role="note" aria-label="Lifetime Case Ledger boundary">
            <span className="biz-translate__label">Boundary</span>
            <span>
              <span className="biz-translate__text">
                {lifetimeCaseLedgerV1.renderBoundary} Does not prove:{" "}
                {lifetimeCaseLedgerV1.doesNotProve.join("; ")}.
              </span>
            </span>
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
          <div className="grid gap-3 md:grid-cols-4">
            <a className="artifact-tile" href="/claim-firewall/">
              <span className="artifact-tile__cat">CLAIM FIREWALL</span>
              <span className="artifact-tile__title">Claim Firewall control surface</span>
              <span className="artifact-tile__desc">
                Review the public wording gate that keeps website rendering below proof authority.
              </span>
              <span className="artifact-tile__link">Open Claim Firewall -&gt;</span>
            </a>
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
