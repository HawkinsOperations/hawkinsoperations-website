import type { Metadata } from "next";
import ArtifactMachine from "@components/ArtifactMachine";
import CaseStudyCTA from "@components/CaseStudyCTA";
import CeilingStrip from "@components/CeilingStrip";
import ClaimFirewallStrip from "@components/ClaimFirewallStrip";
import EvidenceImpactCards from "@components/EvidenceImpactCards";
import FeaturedProofRecord from "@components/FeaturedProofRecord";
import { type ProofPathStep } from "@components/ProofPathTimeline";
import ReviewRouteSelector from "@components/ReviewRouteSelector";
import ThesisBand from "@components/ThesisBand";
import TruthSurfaceInfographic from "@components/TruthSurfaceInfographic";
import V1V2Bridge from "@components/V1V2Bridge";
import { externalLinks } from "@data/navigation";

export const metadata: Metadata = {
  title: "HawkinsOperations Detection Engineering SOC",
  description:
    "HawkinsOperations is a governed detection-engineering system where AI accelerates the work and deterministic validation, evidence records, and human review decide what may be claimed publicly. Website rendering is not proof.",
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
    <div className="page-home">
      {/* ── 01 · Thesis (paper) ───────────────────────────────────────── */}
      <ThesisBand />

      {/* ── 02 · Ceiling strip ────────────────────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <CeilingStrip />
        </div>
      </section>

      {/* ── 03 · Reviewer routes (promoted up the page) ───────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Reviewer routes</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Three reviewers. Three inspection paths.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Pick by time, not by role. The route changes how you read the system. It does not change the underlying proof state.
            </p>
          </div>
          <ReviewRouteSelector />
        </div>
      </section>

      {/* ── 04 · Evidence impact (paper cards) ────────────────────────── */}
      <section className="section-paper section-paper--tight">
        <div className="container">
          <div className="mb-7">
            <p className="thesis-band__eyebrow">Evidence boundary</p>
            <h2 className="display-serif display-serif--md mt-2" style={{ color: "var(--paper-ink)" }}>
              What each evidence type proves — and what it does not.
            </h2>
            <p className="mt-3 text-sm leading-6 max-w-2xl" style={{ color: "var(--paper-muted)" }}>
              The proof boundary is enforced per evidence type. The "does not prove" line is as load-bearing as the "proves" line.
            </p>
          </div>
          <EvidenceImpactCards />
        </div>
      </section>

      {/* ── 05 · Flagship proof (paper slab) ──────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <FeaturedProofRecord steps={traceSteps} />
        </div>
      </section>

      {/* ── 06 · Artifact machine (preserved, compressed eyebrow) ─────── */}
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

      {/* ── 07 · Truth surfaces (compressed) ──────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Truth surfaces</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Six surfaces. Each supports its own claims, nothing more.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Promotion is always upward and gated. The full repo authority map and artifact registry live on{" "}
              <a href="/repos/">Repos</a> and <a href="/artifacts/">Artifacts</a>.
            </p>
          </div>
          <TruthSurfaceInfographic />
        </div>
      </section>

      {/* ── 08 · V1 → V2 bridge (replaces prior-context strip) ────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <V1V2Bridge />
        </div>
      </section>

      {/* ── 09 · Case study CTA ───────────────────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <CaseStudyCTA />
        </div>
      </section>

      {/* ── 10 · Claim firewall (compressed) ──────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <ClaimFirewallStrip />
        </div>
      </section>

      {/* ── 11 · Proof Pack 001 release-path console (preserved) ──────── */}
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

      {/* ── 12 · Doctrine closer (paper band) ─────────────────────────── */}
      <section className="section-paper section-paper--tight">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <p className="thesis-band__eyebrow">Doctrine</p>
              <h2 className="display-serif display-serif--lg mt-3" style={{ color: "var(--paper-ink)" }}>
                AI is labor. Governance is authority.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7" style={{ color: "var(--paper-muted)" }}>
                Build loud. Verify hard. Claim tight. Ship receipts. The system separates the work AI can accelerate from the gates that decide what HawkinsOperations is allowed to claim publicly.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <a className="thesis-band__cta thesis-band__cta--primary" href="/about/">Operator profile →</a>
              <a className="thesis-band__cta thesis-band__cta--quiet" href="/proof/">Proof ledger</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
