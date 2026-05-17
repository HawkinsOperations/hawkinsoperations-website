import type { Metadata } from "next";
import ArtifactMachine from "@components/ArtifactMachine";
import ArtifactFamilyMatrix from "@components/ArtifactFamilyMatrix";
import ClaimFirewallPanel from "@components/ClaimFirewallPanel";
import ProofPathTimeline, { type ProofPathStep } from "@components/ProofPathTimeline";
import RepoAuthorityDAG from "@components/RepoAuthorityDAG";
import ReviewRouteSelector from "@components/ReviewRouteSelector";
import StatusConsole from "@components/StatusConsole";
import TruthSurfaceInfographic from "@components/TruthSurfaceInfographic";
import { externalLinks } from "@data/navigation";

export const metadata: Metadata = {
  title: "HawkinsOperations Detection Engineering SOC",
  description:
    "HawkinsOperations turns detection work into bounded artifacts: source, validation, case packet, AI support, verifier, CI, proof card, and public claim boundary.",
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

const priorContext = [
  { value: "324,074", label: "cases processed" },
  { value: "200+", label: "detections built" },
  { value: "208/208", label: "CI assertions" },
  { value: "39.7%", label: "reduction measured" },
  { value: "100%", label: "high-severity preservation" },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden cockpit-section">
        <div className="container grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 items-start">
          <div>
            <p className="cockpit-eyebrow">Governed detection engineering</p>
            <h1 className="cockpit-headline cockpit-headline--xl mt-5">
              HawkinsOperations turns detection work into governed proof routes.
              <span className="block mt-2" style={{ color: "var(--electric-blue-bright)" }}>
                Human review controls promotion.
              </span>
            </h1>
            <p className="lede mt-7 max-w-2xl" style={{ color: "var(--silver)" }}>
              AI accelerates the work. The system separates source, validation,
              evidence, and public claims so reviewers can follow the artifact trail
              without treating website rendering as proof.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a className="cta cta-primary" href="#artifact-machine">See the artifact machine →</a>
              <a className="cta cta-quiet" href="#flagship">Trace HO-DET-001 →</a>
              <a className="cta cta-quiet" href="/start/">Reviewer routes</a>
            </div>
          </div>

          <div className="lg:pt-2">
            <StatusConsole />
          </div>
        </div>

        <div className="container mt-12">
          <hr className="cockpit-rule" />
        </div>
      </section>

      {/* ── Artifact machine (8 stages) ──────────────────────────────── */}
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
              The machine describes what the system does. Each stage produces a named receipt; the next stage requires it.
            </p>
          </div>
          <ArtifactMachine />
        </div>
      </section>

      {/* ── Reviewer route selector ──────────────────────────────────── */}
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

      {/* ── HO-DET-001 flagship proof path ───────────────────────────── */}
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

      {/* ── Six Truth Surfaces ───────────────────────────────────────── */}
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

      {/* ── Repository authority DAG ─────────────────────────────────── */}
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

      {/* ── Artifact family matrix ───────────────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Artifact registry preview</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Seven families. Four evidence axes. What is supported and what is gated.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Filled cells are supported at the current ceiling. Hollow cells require a specific promotion gate before they can be claimed.
            </p>
          </div>
          <ArtifactFamilyMatrix />
        </div>
      </section>

      {/* ── Claim firewall (precision boundary) ──────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <ClaimFirewallPanel />
        </div>
      </section>

      {/* ── Website rendering boundary ───────────────────────────────── */}
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

      {/* ── Prior context strip (demoted V1 metrics) ─────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="prior-context-strip" aria-label="Prior operating context — HawkinsOps V1 / SignalFoundry">
            <div>
              <p className="prior-context-strip__label">Prior operating context · HawkinsOps V1 / SignalFoundry</p>
              <p className="prior-context-strip__note">
                Recorded for context, not as current HawkinsOperations proof. Current claims are bounded by source, validation, evidence, and the public-proof surface.
              </p>
            </div>
            <ul className="prior-context-strip__metrics">
              {priorContext.map((metric) => (
                <li key={metric.label} className="prior-context-strip__metric">
                  <strong>{metric.value}</strong>
                  {metric.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Doctrine closer ──────────────────────────────────────────── */}
      <section className="cockpit-section">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <p className="cockpit-eyebrow">Doctrine</p>
              <h2 className="cockpit-headline mt-3">AI is labor. Governance is authority.</h2>
              <p className="muted mt-4 max-w-2xl text-base leading-7">
                Build loud. Verify hard. Claim tight. Ship receipts. The system separates the work AI can accelerate from the gates that decide what HawkinsOperations is allowed to claim publicly.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <a className="cta cta-primary" href="/about/">Operator profile →</a>
              <a className="cta cta-quiet" href="/proof/">Proof ledger</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
