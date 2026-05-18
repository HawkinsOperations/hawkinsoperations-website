import type { Metadata } from "next";
import ActivityLedger from "@components/ActivityLedger";
import ClaimFirewallPanel from "@components/ClaimFirewallPanel";
import HeroControlConsole from "@components/HeroControlConsole";
import ProofPackReceipt from "@components/ProofPackReceipt";
import PromotionLadderHomepage from "@components/PromotionLadderHomepage";
import ProofPathTimeline, { type ProofPathStep } from "@components/ProofPathTimeline";
import RepoAuthorityFlow from "@components/RepoAuthorityFlow";
import ReviewRouteSelector from "@components/ReviewRouteSelector";
import TruthTelemetryMatrix from "@components/TruthTelemetryMatrix";
import UncontrolledPromotionFlow from "@components/UncontrolledPromotionFlow";
import { externalLinks } from "@data/navigation";

export const metadata: Metadata = {
  title: "HawkinsOperations",
  description:
    "HawkinsOperations is an AI security operations control layer. AI can generate security work faster than enterprises can govern it; this framework keeps that work from becoming analyst conclusion, operational action, public claim, or executive truth before validation, evidence, CI controls, and human review authorize it. Website rendering is not proof.",
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
      {/* ── 01 · Hero ─ enterprise problem + control surface identity ─── */}
      <section className="relative overflow-hidden cockpit-section hero-cockpit">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="container-cockpit grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 items-start">
          <div className="reveal reveal--up">
            <p className="hero-cockpit__eyebrow">
              AI Security Operations Control Layer
            </p>
            <h1 className="hero-cockpit__headline">
              AI can generate security work faster than enterprises can govern it.
              <span className="hero-cockpit__headline-emph">
                HawkinsOperations decides what becomes truth.
              </span>
            </h1>
            <p className="hero-cockpit__lede">
              A governed framework that stops AI-assisted security output from becoming
              analyst conclusion, operational action, public claim, or executive truth
              before validation, evidence, CI controls, and human review authorize it.
              AI accelerates the work. Evidence and human review authorize the claim.
            </p>

            <div className="hero-status" role="note" aria-label="Release and ceiling status">
              <span className="hero-status__chip hero-status__chip--released">
                <span className="hero-status__dot" aria-hidden="true" />
                Proof Pack 001 · released
              </span>
              <span className="hero-status__chip hero-status__chip--det">HO-DET-001</span>
              <span className="hero-status__chip hero-status__chip--ceiling">
                CONTROLLED_TEST_VALIDATED
              </span>
              <span className="hero-status__chip hero-status__chip--blocked">
                Public-safe runtime proof · BLOCKED
              </span>
            </div>

            <div className="hero-cockpit__ctas">
              <a
                className="hero-cockpit__primary"
                href={externalLinks.proofPack001Release}
                target="_blank"
                rel="noopener noreferrer"
              >
                Inspect Proof Pack 001 ↗
              </a>
              <a className="hero-cockpit__secondary" href="/proof/ho-det-001/">
                Trace HO-DET-001 →
              </a>
              <a
                className="hero-cockpit__secondary"
                href={externalLinks.githubOrg}
                target="_blank"
                rel="noopener noreferrer"
              >
                View GitHub Org ↗
              </a>
              <a className="hero-cockpit__tertiary" href="/about/">
                Read Operator page →
              </a>
            </div>
          </div>

          <div className="lg:pt-2 reveal reveal--up" data-delay="2">
            <HeroControlConsole />
          </div>
        </div>
      </section>

      {/* ── 02 · Proof-now strip · Release 001 receipt above the fold ── */}
      <section id="release-001" className="cockpit-section--tight">
        <div className="container-cockpit reveal reveal--up">
          <ProofPackReceipt />
        </div>
      </section>

      {/* ── 03 · What shipped · receipts, not roadmap ───────────────── */}
      <section id="release-sprint" className="cockpit-section--tight">
        <div className="container-cockpit">
          <div className="mb-6">
            <p className="cockpit-eyebrow">What exists now</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Receipts that already shipped in Release 001.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Proof record, validation result, detection source, deterministic verifier, CI workflow,
              and the public claim ceiling. Each item is a link to the artifact in the repo, not a
              promise on this page.
            </p>
          </div>
          <ActivityLedger />
        </div>
      </section>

      {/* ── 04 · Enterprise failure mode · interactive React Flow ───── */}
      <section id="failure-mode" className="cockpit-section--tight">
        <div className="container-cockpit reveal reveal--up">
          <div className="mb-6">
            <p className="cockpit-eyebrow" style={{ color: "var(--blocked-red)" }}>
              Enterprise failure mode
            </p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Uncontrolled AI promotion gets blocked here.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              The top red path is the enterprise failure mode: AI output becomes analyst
              conclusion, operational action, public claim, and executive truth without
              authorization. The bottom ice-blue path is the HawkinsOperations control route
              through deterministic gates to the public boundary. Click a node to inspect.
            </p>
          </div>
          <UncontrolledPromotionFlow />
        </div>
      </section>

      {/* ── 05 · HawkinsOperations control route · promotion ladder ── */}
      <section id="control-route" className="cockpit-section--tight">
        <div className="container-cockpit">
          <div className="mb-6">
            <p className="cockpit-eyebrow">HawkinsOperations control route</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              AI labor enters here. Public wording exits only after the gates.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Source, controlled validation, deterministic verifier, evidence record, proof record,
              human review, public boundary. Promotion is upward and gated. Public claims stay capped
              at CONTROLLED_TEST_VALIDATED until stronger evidence is separately promoted.
            </p>
          </div>
          <div className="reveal reveal--up" data-delay="1">
            <PromotionLadderHomepage />
          </div>
          <div className="biz-translate" role="note" aria-label="Business translation">
            <span className="biz-translate__label">In plain English</span>
            <span>
              <span className="biz-translate__text">
                Work moves up only when the surface below has receipts. AI accelerates labor;
                evidence and human review authorize the claim.
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* ── 06 · HO-DET-001 flagship proof path ─────────────────────── */}
      <section id="flagship" className="cockpit-section--tight">
        <div className="container-cockpit">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Flagship proof path</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              HO-DET-001 · the artifact you can inspect end to end.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Eight named receipts move a single detection from version-controlled source to the
              current public boundary.
            </p>
          </div>
          <ProofPathTimeline detectionId="HO-DET-001" title="Source to public boundary" steps={traceSteps} />
        </div>
      </section>

      {/* ── 07 · Repository authority ───────────────────────────────── */}
      <section id="repo-authority" className="cockpit-section--tight">
        <div className="container-cockpit">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Repository authority</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Six repositories. Three planes. Authority flows down only.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              detections → validation → proof feeds the chain. .github and platform overlay it.
              website renders the receipts; it does not author them.
            </p>
          </div>
          <RepoAuthorityFlow />
        </div>
      </section>

      {/* ── 08 · Proof ceiling chart · supported vs blocked lanes ──── */}
      <section id="proof-ceiling" className="cockpit-section--tight">
        <div className="container-cockpit">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Proof ceiling</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Supported lanes are filled. Blocked lanes stay blocked.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Source, controlled validation, and bounded public-claim lanes are filled at the
              current public ceiling. Runtime-active and signal-observed lanes are blocked at this
              surface — those claims require a separate evidence-backed promotion gate.
            </p>
          </div>
          <TruthTelemetryMatrix />
        </div>
      </section>

      {/* ── 09 · Reviewer routes · four audiences ───────────────────── */}
      <section id="reviewer-routes" className="cockpit-section--tight">
        <div className="container-cockpit">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Reviewer routes</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Four audiences. Four inspection paths.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              The route changes how you read the system. It does not change the underlying proof
              state. Each route lists what to inspect first and what not to infer.
            </p>
          </div>
          <ReviewRouteSelector />
        </div>
      </section>

      {/* ── 10 · Claim firewall · compact boundary panel ────────────── */}
      <section id="claim-firewall" className="cockpit-section--tight">
        <div className="container-cockpit">
          <ClaimFirewallPanel />
        </div>
      </section>

      {/* ── 11 · Doctrine closer ────────────────────────────────────── */}
      <section className="cockpit-section">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <p className="cockpit-eyebrow">Doctrine</p>
              <h2 className="cockpit-headline mt-3">
                AI generates work. Evidence and human review authorize claims.
              </h2>
              <p className="muted mt-4 max-w-2xl text-base leading-7">
                The system separates the work AI can accelerate from the gates that decide what
                HawkinsOperations is allowed to claim publicly. Promotion is gated. Receipts are
                reviewer-visible. Public ceiling holds at CONTROLLED_TEST_VALIDATED. Website
                rendering is not proof.
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
