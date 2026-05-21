import type { Metadata } from "next";
import ActivityLedger from "@components/ActivityLedger";
import AttackCoverageMap from "@components/AttackCoverageMap";
import ClaimFirewallPanel from "@components/ClaimFirewallPanel";
import FailureModeStrip from "@components/FailureModeStrip";
import FeaturedWork from "@components/FeaturedWork";
import GovernedDetectionLoop from "@components/GovernedDetectionLoop";
import HeroControlConsole from "@components/HeroControlConsole";
import ProofPackReceipt from "@components/ProofPackReceipt";
import PromotionLadderHomepage from "@components/PromotionLadderHomepage";
import RepoAuthorityDAG from "@components/RepoAuthorityDAG";
import StatusConsole from "@components/StatusConsole";
import TruthSurfaceInfographic from "@components/TruthSurfaceInfographic";
import TruthTelemetryMatrix from "@components/TruthTelemetryMatrix";
import WorkDashboard from "@components/WorkDashboard";
import { registryStats, validationRows } from "@data/validationRegistry";
import { externalLinks } from "@data/navigation";

const detectionCount = validationRows.length;
const fixtureCount = registryStats.totalFixtures;

export const metadata: Metadata = {
  title: "HawkinsOperations",
  description:
    "HawkinsOperations is a detection engineering proof system: detections, validation cases, proof records, and reviewer artifacts shipped with claim boundaries attached. Website rendering is not proof.",
};

export default function HomePage() {
  return (
    <>
      {/* ── 01 · Hero · shipped work first ───────────────────────────── */}
      <section className="relative overflow-hidden cockpit-section hero-cockpit">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="container grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 items-start">
          <div className="reveal reveal--up">
            <p className="hero-cockpit__eyebrow">Detection engineering · shipped with receipts</p>
            <h1 className="hero-cockpit__headline">
              Governed detection engineering,
              <span className="hero-cockpit__headline-emph">shipped with receipts.</span>
            </h1>
            <p className="hero-cockpit__lede">
              Detections, validation cases, proof records, and reviewer artifacts — shipped with claim
              boundaries attached. AI helps produce the work; evidence and human review decide what can
              be claimed.
            </p>

            <div className="hero-status" role="note" aria-label="Shipped-work and ceiling status">
              <span className="hero-status__chip hero-status__chip--released">
                <span className="hero-status__dot" aria-hidden="true" />
                Proof Pack 001 · released
              </span>
              <span className="hero-status__chip hero-status__chip--det">HO-DET-001</span>
              <span className="hero-status__chip hero-status__chip--det">{detectionCount} detections validated</span>
              <span className="hero-status__chip hero-status__chip--det">{fixtureCount} controlled fixtures</span>
              <span className="hero-status__chip hero-status__chip--ceiling">CONTROLLED_TEST_VALIDATED</span>
              <span className="hero-status__chip hero-status__chip--blocked">Runtime / signal · BLOCKED</span>
            </div>

            <div className="hero-cockpit__ctas">
              <a
                className="hero-cockpit__primary"
                href={externalLinks.proofPack001Release}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open GitHub Release ↗
              </a>
              <a className="hero-cockpit__secondary" href="/artifacts/#evidence-bay">
                Open the Evidence Bay →
              </a>
              <a className="hero-cockpit__secondary" href="/proof/ho-det-001/">
                Inspect proof route →
              </a>
              <a
                className="hero-cockpit__tertiary"
                href={externalLinks.githubOrg}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub org ↗
              </a>
            </div>
          </div>

          <div className="lg:pt-2 reveal reveal--up" data-delay="2">
            <HeroControlConsole />
          </div>
        </div>
      </section>

      {/* ── 02 · Work shipped · dashboard ────────────────────────────── */}
      <section id="work-shipped" className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Work shipped</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              What's been built, validated, and recorded.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Every number is counted from the site's own data. Each card opens the receipt.
            </p>
          </div>
          <WorkDashboard />
        </div>
      </section>

      {/* ── 03 · Featured work units ─────────────────────────────────── */}
      <section id="featured-work" className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Featured work</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Detections and the proof pack you can inspect.
            </h2>
          </div>
          <FeaturedWork />
        </div>
      </section>

      {/* ── 04 · Proof Pack 001 release receipt ──────────────────────── */}
      <section id="release-001" className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <ProofPackReceipt />
        </div>
      </section>

      {/* ── 05 · Recent governed work ────────────────────────────────── */}
      <section id="release-sprint" className="cockpit-section--tight">
        <div className="container">
          <ActivityLedger />
        </div>
      </section>

      {/* ── 06 · Evidence Bay CTA ────────────────────────────────────── */}
      <section id="evidence-bay-cta" className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <div className="evbay-cta">
            <div>
              <p className="cockpit-eyebrow">Evidence Bay</p>
              <h2 className="evbay-cta__title">The full library of shipped work and receipts.</h2>
              <p className="evbay-cta__sub">
                Filter proof records, validation outputs, CI receipts, and reviewer packets. Each card
                routes to the evidence and states what it does not prove.
              </p>
            </div>
            <a className="cta cta-primary evbay-cta__btn" href="/artifacts/#evidence-bay">
              Open the Evidence Bay →
            </a>
          </div>
        </div>
      </section>

      {/* ── 07 · ATT&CK-mapped detection coverage ────────────────────── */}
      <section id="attack-coverage" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">MITRE ATT&CK-mapped coverage</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Each detection carries an ATT&CK mapping, a proof ceiling, and a blocked runtime claim.
            </h2>
          </div>
          <div className="reveal reveal--up" data-delay="1">
            <AttackCoverageMap />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a className="cta cta-quiet" href="/proof/#validation-registry">Validation registry →</a>
            <a className="cta cta-quiet" href="/pipeline/#platform-contracts">Platform contracts →</a>
          </div>
        </div>
      </section>

      {/* ── 08 · How the work is controlled · interactive loop ───────── */}
      <section id="detection-loop" className="cockpit-section--tight">
        <div className="container">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
            <div>
              <p className="cockpit-eyebrow">How the work is controlled</p>
              <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
                Source to public boundary, in eight gated stages.
              </h2>
            </div>
            <p className="muted max-w-md text-sm leading-6">
              Select a stage to see what it produces, what it supports, and what it does not prove.
            </p>
          </div>
          <GovernedDetectionLoop />
        </div>
      </section>

      {/* ════ Control layer · the framework behind the work ════════════ */}

      {/* ── 09 · What this work prevents ─────────────────────────────── */}
      <section id="failure-mode" className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <FailureModeStrip />
        </div>
      </section>

      {/* ── 10 · How work becomes a public-safe claim ────────────────── */}
      <section id="control-route" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Control layer</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              How work becomes a public-safe claim.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Promotion is upward and gated; public claims stay capped at CONTROLLED_TEST_VALIDATED
              until stronger evidence is separately promoted.
            </p>
          </div>
          <div className="reveal reveal--up" data-delay="1">
            <PromotionLadderHomepage />
          </div>
        </div>
      </section>

      {/* ── 11 · Proof ceiling matrix ────────────────────────────────── */}
      <section id="proof-ceiling" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Proof ceiling</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Supported lanes are filled. Blocked lanes stay blocked.
            </h2>
          </div>
          <TruthTelemetryMatrix />
        </div>
      </section>

      {/* ── 12 · Repository authority ────────────────────────────────── */}
      <section id="repo-authority" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Repository authority</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Six repositories. Authority flows down only.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              detections → validation → proof feeds the chain. website renders the receipts; it does not author them.
            </p>
          </div>
          <RepoAuthorityDAG />
        </div>
      </section>

      {/* ── 13 · Truth surfaces ──────────────────────────────────────── */}
      <section id="truth-surfaces" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Truth surfaces</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Six surfaces. Each supports its own claims, nothing more.
            </h2>
          </div>
          <TruthSurfaceInfographic />
        </div>
      </section>

      {/* ── 14 · Claim firewall ──────────────────────────────────────── */}
      <section id="claim-firewall" className="cockpit-section--tight">
        <div className="container">
          <ClaimFirewallPanel />
        </div>
      </section>

      {/* ── 15 · Boundary closer · console + motto ───────────────────── */}
      <section className="cockpit-section">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-center">
            <div>
              <p className="cockpit-eyebrow">The boundary, in one panel</p>
              <h2 className="cockpit-headline mt-3" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }}>
                AI is labor. Evidence and human review authorize claims.
              </h2>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a className="cta cta-primary" href="/proof/">Proof ledger →</a>
                <a className="cta cta-quiet" href="/about/">Operator profile</a>
              </div>
              <div className="mt-8">
                <div className="receipt-strip" aria-label="Doctrine motto">
                  <span>Build loud</span>
                  <span className="receipt-strip__sep">·</span>
                  <span>Verify hard</span>
                  <span className="receipt-strip__sep">·</span>
                  <span>Claim tight</span>
                  <span className="receipt-strip__sep">·</span>
                  <span>Ship receipts</span>
                </div>
              </div>
            </div>
            <div>
              <StatusConsole showLoop={false} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
