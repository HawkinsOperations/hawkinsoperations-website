import type { Metadata } from "next";
import ActivityLedger from "@components/ActivityLedger";
import ArtifactMachine from "@components/ArtifactMachine";
import ClaimFirewallPanel from "@components/ClaimFirewallPanel";
import FailureModeStrip from "@components/FailureModeStrip";
import HeroControlConsole from "@components/HeroControlConsole";
import PreventionBridge from "@components/PreventionBridge";
import PromotionLadderHomepage from "@components/PromotionLadderHomepage";
import ProofPathTimeline, { type ProofPathStep } from "@components/ProofPathTimeline";
import RepoAuthorityDAG from "@components/RepoAuthorityDAG";
import ReviewRouteSelector from "@components/ReviewRouteSelector";
import TruthSurfaceInfographic from "@components/TruthSurfaceInfographic";
import TruthTelemetryMatrix from "@components/TruthTelemetryMatrix";
import { externalLinks } from "@data/navigation";

const caseStudyHref =
  "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/main/docs/case-studies/AI-GOVERNANCE-CONTROL-LAYER.md";

export const metadata: Metadata = {
  title: "HawkinsOperations",
  description:
    "HawkinsOperations is a governed AI-assisted detection engineering control layer: source, validation, evidence, and public proof stay separated so AI labor cannot quietly inflate the truth. Website rendering is not proof.",
};

const traceSteps: ProofPathStep[] = [
  {
    code: "SOURCE_PRESENT",
    label: "Source present",
    line: "Detection rule and SPL exist in hawkinsoperations-detections under version control with a stated owner.",
    href: externalLinks.detections,
    external: true,
  },
  {
    code: "FIXTURE_VALIDATED",
    label: "Fixture validated",
    line: "HO-DET-001 passes controlled positive and negative test cases in the validation repo.",
    href: externalLinks.validationReportHo,
    external: true,
  },
  {
    code: "CASE_PACKET_ROUTED",
    label: "Case packet routed",
    line: "Findings, validation output, and reviewer wording assemble into the case file.",
    href: "/proof/ho-det-001/",
  },
  {
    code: "AI_SUPPORT_ONLY",
    label: "AI support only",
    line: "AI accelerates labor: drafting, scaffolding, reviewer prep. AI does not promote claims.",
    href: "/controls/",
  },
  {
    code: "SCANNER_CLEAN",
    label: "Scanner clean",
    line: "Site contract verifier and blocked-claim scanner pass before wording can ship.",
    href: externalLinks.repoAuthorityMap,
    external: true,
  },
  {
    code: "CI_ENFORCED",
    label: "CI enforced",
    line: "CI fails the build when contract assertions or blocked-claim rules trip on a change.",
    href: "/proof-loop/",
  },
  {
    code: "RECORD_PUBLISHED",
    label: "Record published",
    line: "Public proof record exists with a stated ceiling, evidence pointers, and bounded scope.",
    href: externalLinks.proofRecord,
    external: true,
  },
  {
    code: "CEILING_HELD",
    label: "Public boundary held",
    line: "Public claim ceiling holds at CONTROLLED_TEST_VALIDATED. Stronger wording requires a separate promotion gate.",
    href: "/proof/ho-det-001/",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── 01 · Hero (S-tier cockpit) ───────────────────────────────── */}
      <section className="relative overflow-hidden cockpit-section hero-cockpit">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="container grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 items-start">
          <div className="reveal reveal--up">
            <p className="hero-cockpit__eyebrow">
              Governed AI-assisted detection engineering
            </p>
            <h1 className="hero-cockpit__headline">
              AI accelerates the work.
              <span className="hero-cockpit__headline-emph">
                Evidence and human review authorize the claims.
              </span>
            </h1>
            <p className="hero-cockpit__lede">
              HawkinsOperations is a control layer for AI-assisted security work. The system separates
              source, validation, evidence, and public proof so generated work cannot become operational
              truth without passing gates a human signed off on.
            </p>

            <div className="hero-cockpit__ctas">
              <a className="hero-cockpit__primary" href="/proof/">
                Inspect the proof system →
              </a>
              <a
                className="hero-cockpit__secondary"
                href={externalLinks.githubOrg}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open GitHub org ↗
              </a>
              <a
                className="hero-cockpit__secondary"
                href={caseStudyHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                AI governance case study ↗
              </a>
              <a className="hero-cockpit__tertiary" href="#flagship">
                Trace HO-DET-001 →
              </a>
            </div>
          </div>

          <div className="lg:pt-2 reveal reveal--up" data-delay="2">
            <HeroControlConsole />
          </div>
        </div>

        <div className="container mt-12">
          <hr className="cockpit-rule" />
        </div>
      </section>

      {/* ── 02 · Prevention bridge (NEW — CISO/SecOps on-ramp) ───────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6 reveal reveal--up">
            <p className="cockpit-eyebrow">What this prevents</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.0rem)" }}>
              Three failure modes the system is built to block.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              The diagrams below show how. The cards here name what would be at risk without the
              controls.
            </p>
          </div>
          <div className="reveal reveal--up" data-delay="1">
            <PreventionBridge />
          </div>
          <div className="biz-translate reveal reveal--up" data-delay="2" role="note" aria-label="Business translation">
            <span className="biz-translate__label">In plain English</span>
            <span><span className="biz-translate__text">Polished output cannot promote a security claim without evidence and human review.</span></span>
          </div>
        </div>
      </section>

      {/* ── 03 · Enterprise failure mode ─────────────────────────────── */}
      <section id="failure-mode" className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <FailureModeStrip />
        </div>
      </section>

      {/* ── 03 · Control layer · promotion ladder (NEW) ──────────────── */}
      <section id="control-layer" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Control layer</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Six surfaces. One direction. Promotion is gated.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Work moves upward only when lower-surface rules are satisfied. That is how AI labor is
              used aggressively without letting output quietly inflate the truth.
            </p>
          </div>
          <div className="reveal reveal--up" data-delay="1">
            <PromotionLadderHomepage />
          </div>
          <div className="biz-translate" role="note" aria-label="Business translation">
            <span className="biz-translate__label">In plain English</span>
            <span><span className="biz-translate__text">Work moves up only when the surface below has receipts. Public claims stay capped at CONTROLLED_TEST_VALIDATED until stronger evidence exists.</span></span>
          </div>
        </div>
      </section>

      {/* ── 04 · Artifact machine (preserved) ────────────────────────── */}
      <section id="artifact-machine" className="cockpit-section--tight">
        <div className="container">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
            <div>
              <p className="cockpit-eyebrow">Artifact machine</p>
              <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
                Eight stages. One direction. Source to public boundary.
              </h2>
            </div>
            <p className="muted max-w-md text-sm leading-6">
              Each stage produces a named receipt; the next stage requires it. Receipts live in the repos, not on this page.
            </p>
          </div>
          <ArtifactMachine />
        </div>
      </section>

      {/* ── 05 · Reviewer routes (preserved) ─────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Reviewer routes</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Three reviewers. Three inspection paths.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              The route changes how you read the system. It does not change the underlying proof state.
            </p>
          </div>
          <ReviewRouteSelector />
        </div>
      </section>

      {/* ── 06 · HO-DET-001 flagship (preserved) ─────────────────────── */}
      <section id="flagship" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Flagship proof path</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              HO-DET-001 · the artifact you can inspect end to end.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Eight named receipts move a single detection from version-controlled source to the current public boundary.
            </p>
          </div>
          <ProofPathTimeline detectionId="HO-DET-001" title="Source to public boundary" steps={traceSteps} />
        </div>
      </section>

      {/* ── 07 · Six truth surfaces (preserved) ──────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Truth surfaces</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Six surfaces. Each one supports its own claims, nothing more.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Promotion is always upward and gated. The surfaces describe what each layer can prove and the receipt the next layer requires.
            </p>
          </div>
          <TruthSurfaceInfographic />
        </div>
      </section>

      {/* ── 08 · Repository authority (preserved) ────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Repository authority</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Six repositories. Three planes. Authority flows down only.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              detections → validation → proof feeds the chain. .github and platform overlay it. website renders the receipts; it does not author them.
            </p>
          </div>
          <RepoAuthorityDAG />
        </div>
      </section>

      {/* ── 09 · Truth vs telemetry matrix (NEW — replaces registry preview) ── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Evidence boundary</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Six detections. Six claim axes. The ceiling is a vertical line in this grid.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Filled cells are supported at the current public ceiling. Hollow cells require the next promotion gate. Blocked cells stay that way unless a separate evidence-backed promotion changes their state.
            </p>
          </div>
          <TruthTelemetryMatrix />
          <div className="biz-translate" role="note" aria-label="Business translation">
            <span className="biz-translate__label">In plain English</span>
            <span><span className="biz-translate__text">Every row shows what HawkinsOperations can prove and what it cannot. Runtime-Active and Signal-Observed columns are blocked at this surface — those claims need separate evidence promotion.</span></span>
          </div>
        </div>
      </section>

      {/* ── 10 · Claim firewall (preserved) ──────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <ClaimFirewallPanel />
        </div>
      </section>

      {/* ── 11 · Website rendering boundary (preserved) ──────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div
            className="moon-panel-strong"
            style={{ padding: "22px 24px", display: "grid", gap: 14, gridTemplateColumns: "1fr auto", alignItems: "center" }}
          >
            <div>
              <p className="cockpit-eyebrow">Website rendering</p>
              <p style={{ color: "var(--silver-bright)", fontWeight: 700, fontSize: "1.1rem", marginTop: 6 }}>
                Website renders the map. Proof lives in the repos.
              </p>
            </div>
            <a className="cta cta-quiet" href="/proof/">Open the proof ledger →</a>
          </div>
        </div>
      </section>

      {/* ── 12 · Proof Pack 001 release-path console (preserved) ─────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="proof-pack-console" aria-label="Proof Pack 001 release-path status console">
            <header className="proof-pack-console__head">
              <div>
                <p className="cockpit-eyebrow">Release path · governed</p>
                <h2 className="proof-pack-console__title">
                  Proof Pack 001 · release path implemented.
                </h2>
                <p className="proof-pack-console__sub">
                  Source / check-mode release path is merged on the proof repo. No official release, tag, or signed artifact is claimed from this surface.
                </p>
              </div>
              <span className="proof-pack-console__ceiling mono">CONTROLLED_TEST_VALIDATED</span>
            </header>
            <dl className="proof-pack-console__grid">
              <div className="proof-pack-console__cell">
                <dt>Detection</dt>
                <dd className="mono">HO-DET-001</dd>
              </div>
              <div className="proof-pack-console__cell">
                <dt>Pack status</dt>
                <dd className="mono proof-pack-console__cell-strong">RELEASE_PATH_IMPLEMENTED</dd>
              </div>
              <div className="proof-pack-console__cell">
                <dt>Source mode</dt>
                <dd className="mono">CHECK_MODE_SOURCE_ONLY</dd>
              </div>
              <div className="proof-pack-console__cell">
                <dt>Next gate</dt>
                <dd className="mono">OFFICIAL_RELEASE_PENDING_APPROVAL</dd>
              </div>
              <div className="proof-pack-console__cell">
                <dt>Public-safe state</dt>
                <dd className="mono proof-pack-console__cell-block">NOT_PUBLIC_SAFE</dd>
              </div>
              <div className="proof-pack-console__cell">
                <dt>Authority</dt>
                <dd>Proof repo holds the receipt; website routes only.</dd>
              </div>
            </dl>
            <footer className="proof-pack-console__foot">
              <span className="mono">no tag · no GitHub Release · no zip · no signing claimed</span>
              <a className="cta cta-quiet" href="/artifacts/#cat-proof-record">Artifact coverage →</a>
            </footer>
          </div>
        </div>
      </section>

      {/* ── 13 · Recent governed work snapshot (NEW — replaces prior-context) ── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <ActivityLedger />
        </div>
      </section>

      {/* ── 14 · Doctrine closer (preserved wording, receipt-strip treatment) ── */}
      <section className="cockpit-section">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <p className="cockpit-eyebrow">Doctrine</p>
              <h2 className="cockpit-headline mt-3">
                AI accelerates the work. Evidence and human review authorize the claims.
              </h2>
              <p className="muted mt-4 max-w-2xl text-base leading-7">
                The system separates the work AI can accelerate from the gates that decide what HawkinsOperations is allowed to claim publicly. Promotion is gated. Receipts are reviewer-visible. Public ceiling holds at CONTROLLED_TEST_VALIDATED.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <a className="cta cta-primary" href="/about/">Operator profile →</a>
              <a className="cta cta-quiet" href="/proof/">Proof ledger</a>
            </div>
          </div>

          <div className="mt-10">
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
      </section>
    </>
  );
}
