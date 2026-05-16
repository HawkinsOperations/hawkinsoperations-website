import type { Metadata } from "next";
import BrandMark from "@components/BrandMark";
import PortraitCommandFrame from "@components/PortraitCommandFrame";
import StatusChip from "@components/StatusChip";
import ArtifactCard from "@components/ArtifactCard";
import SectionEyebrow from "@components/SectionEyebrow";
import ProofCeilingDisplay from "@components/ProofCeilingDisplay";
import TruthSurfaceSeparation from "@components/TruthSurfaceSeparation";
import EvidenceConveyor, { type PipelineStage } from "@components/EvidenceConveyor";
import { credibilityMetrics } from "@data/credibilityMetrics";
import { externalLinks } from "@data/navigation";
import { artifacts, type Artifact } from "@data/artifacts";

export const metadata: Metadata = {
  title: "HawkinsOperations Detection Engineering SOC",
  description:
    "HawkinsOperations turns detection work into governed proof. Trace the path from detection source to public claim across seven separated stages.",
};

const previewSlugs = [
  "ho-det-001-proof-record",
  "aws-det-001-proof-record",
  "ho-det-001-lab-runtime-match",
  "cribl-to-splunk-marker-delivery",
  "controlled-test-validation-boundary",
  "blocked-claim-scanner",
];

const reviewerModes = [
  {
    id: "exec",
    label: "Executive",
    duration: "3 min",
    question: "Can this system show disciplined proof without overstating status?",
    checklist: [
      "Follow HO-DET-001 from source to proof ceiling.",
      "Confirm AI is assistive labor, not approval authority.",
      "Check that blocked wording stays visually secondary and accessible.",
    ],
    nextClick: { label: "Trace HO-DET-001", href: "#trace" },
    path: ["HO-DET-001", "Verifier", "Claim Ceiling"],
  },
  {
    id: "proof",
    label: "Proof",
    duration: "10 min",
    question: "Which evidence surface supports each public claim?",
    checklist: [
      "Inspect validation fixture boundaries.",
      "Open the proof record and confirm the claim ceiling.",
      "Use the Truth Surface Control Board to isolate public proof.",
    ],
    nextClick: { label: "Open proof ledger", href: "/proof/" },
    path: ["Fixtures", "Case Packet", "Proof Record"],
  },
  {
    id: "tech",
    label: "Technical",
    duration: "deep",
    question: "Can the reviewer clone the route and understand the gates?",
    checklist: [
      "Review source, fixtures, scanner, and repo authority routes.",
      "Confirm deterministic checks gate website wording.",
      "Verify no runtime or signal wording is promoted by rendering.",
    ],
    nextClick: { label: "Open repo map", href: "/repos/" },
    path: ["Detection Source", "Fixtures", "Verifier"],
  },
];

const pipelineStages: PipelineStage[] = [
  {
    id: "source",
    n: "01",
    name: "Detection Source",
    chip: "SOURCE_PRESENT",
    tone: "quiet",
    body: "Work enters as a reviewable rule and SPL source. Presence is the starting input, not runtime proof.",
    surfaces: ["source"],
    detail: {
      proves: "A reviewable detection rule exists under version control with a stated owner.",
      doesNotProve: "That the rule has executed, matched, or produced any signal-observed runtime-active result.",
      links: [
        { label: "Detections repository", href: externalLinks.detections, external: true },
        { label: "Repository map", href: "/repos/" },
      ],
    },
  },
  {
    id: "validation",
    n: "02",
    name: "Fixtures",
    chip: "FIXTURE_PASSED",
    tone: "ice",
    body: "Positive and negative fixtures test behavior in a controlled validation boundary.",
    surfaces: ["validation"],
    detail: {
      proves: "The rule passes deterministic positive and negative fixtures inside the validation repo.",
      doesNotProve: "Endpoint, fleet-wide, or production-ready behavior. Validation does not claim live telemetry.",
      links: [
        { label: "Validation repository", href: externalLinks.validation, external: true },
        { label: "HO-DET-001 validation report", href: externalLinks.validationReportHo, external: true },
      ],
    },
  },
  {
    id: "case-packet",
    n: "03",
    name: "Case Packet",
    chip: "PACKET_ROUTED",
    tone: "quiet",
    body: "Findings, fixture output, and reviewer wording move together as a routable packet.",
    surfaces: ["evidence"],
    detail: {
      proves: "Findings, validation outputs, and reviewer wording are bundled into a routable case file.",
      doesNotProve: "Any claim that has not been independently linked to evidence inside the packet.",
      links: [
        { label: "HO-DET-001 case file", href: "/proof/ho-det-001/" },
        { label: "Artifact vault", href: "/artifacts/" },
      ],
    },
  },
  {
    id: "ai-triage",
    n: "04",
    name: "AI Support",
    chip: "AI_AS_LABOR",
    tone: "ice",
    body: "AI drafts summaries and reviewer prep. It assists the controlled review line, but cannot authorize release.",
    surfaces: ["evidence", "runtime"],
    detail: {
      proves: "AI is wired in as labor for drafting, summarizing, and reviewer prep.",
      doesNotProve: "Any AI-approved disposition or analyst-approved disposition. AI cannot promote a claim by itself.",
      links: [
        { label: "Claim firewall", href: "/controls/" },
        { label: "Field note · AI is labor", href: "/field-notes/ai-is-labor-governance-is-authority/" },
      ],
    },
  },
  {
    id: "verifier",
    n: "05",
    name: "Verifier",
    chip: "SCANNER_CLEAN",
    tone: "ice",
    body: "Deterministic checks block unsupported wording before any public route ships.",
    surfaces: ["evidence", "runtime", "signal", "public-proof"],
    detail: {
      proves: "A deterministic site contract and blocked-claim scanner run before any wording change ships.",
      doesNotProve: "That every runtime statement is independently witnessed. The scanner gates wording, not telemetry.",
      links: [
        { label: "Claim firewall", href: "/controls/" },
        { label: "Repo authority map", href: externalLinks.repoAuthorityMap, external: true },
      ],
    },
  },
  {
    id: "proof-record",
    n: "06",
    name: "Proof Record",
    chip: "RECORD_PUBLISHED",
    tone: "quiet",
    body: "The receipt ships with evidence pointers, explicit boundaries, and a stated ceiling.",
    surfaces: ["signal", "public-proof"],
    detail: {
      proves: "A public proof record exists with a stated ceiling, evidence pointers, and bounded scope.",
      doesNotProve: "Runtime-active deployment, signal-observed truth, or public-safe runtime proof.",
      links: [
        { label: "Proof ledger", href: "/proof/" },
        { label: "HO-DET-001 proof card", href: "/proof/ho-det-001/" },
      ],
    },
  },
  {
    id: "public-claim",
    n: "07",
    name: "Claim Ceiling",
    chip: "CEILING_HELD",
    tone: "ice",
    body: "Public wording holds at the approved ceiling. Stronger claims require a separate gate.",
    surfaces: ["public-proof"],
    detail: {
      proves: "The public surface holds the stated ceiling: CONTROLLED_TEST_VALIDATED.",
      doesNotProve: "Anything stronger than the ceiling. Stronger wording is blocked until separately promoted.",
      links: [
        { label: "Claim firewall", href: "/controls/" },
        { label: "Architecture", href: "/architecture/" },
      ],
    },
  },
];

const priorEvidence = [
  { value: "324,074", label: "cases processed" },
  { value: "200+", label: "detections built" },
  { value: "208/208", label: "CI assertions" },
  { value: "39.7%", label: "reduction measured" },
  { value: "100%", label: "high-severity preservation" },
];

const promotionSurfaces = [
  { name: ".github", role: "Governance / reviewer routing" },
  { name: "platform", role: "Runtime contracts / execution boundaries" },
  { name: "detections", role: "Source logic" },
  { name: "validation", role: "Tests / fixtures / verifiers" },
  { name: "proof", role: "Evidence boundary / claim ceilings" },
  { name: "website", role: "Public rendering / reviewer routing" },
];

const launchControls = [
  "Fixed working directory",
  "AGENTS.md launch contract",
  "Control folder routing",
  "Path restrictions",
  "Stop conditions",
  "Governed logging",
];

const gateChecks = ["checks pass", "claim ceiling preserved", "no private leakage", "explicit review"];

const preventionList = [
  "unauthorized claim promotion",
  "private leakage",
  "source treated as proof",
  "dashboards mistaken for truth",
];

const traceSteps = [
  {
    code: "SOURCE_PRESENT",
    label: "Source present",
    line: "Detection rule and SPL exist in hawkinsoperations-detections. This proves source presence only.",
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
    line: "Findings, validation result, and reviewer wording assemble into the case file.",
    href: "/proof/ho-det-001/",
    external: false,
  },
  {
    code: "AI_SUPPORT_ONLY",
    label: "AI support only",
    line: "AI assists triage, drafting, and reviewer prep. It does not approve a disposition.",
    href: "/controls/",
    external: false,
  },
  {
    code: "CLAIM_SCANNER_CLEAN",
    label: "Claim scanner clean",
    line: "Site contract verifier and blocked-claim scanner must pass before wording ships.",
    href: externalLinks.repoAuthorityMap,
    external: true,
  },
  {
    code: "PROOF_RECORD_PUBLISHED",
    label: "Proof record published",
    line: "Public proof record published with bounded ceiling, evidence pointers, and explicit boundaries.",
    href: externalLinks.proofRecord,
    external: true,
  },
  {
    code: "PUBLIC_CEILING_HELD",
    label: "Public ceiling held",
    line: "Public claim ceiling stays at CONTROLLED_TEST_VALIDATED. Stronger claims require a separate promotion gate.",
    href: "/proof/ho-det-001/",
    external: false,
  },
];

const qcMap = [
  { shop: "Standard work", detection: "Detection-as-code", line: "A rule enters the evidence line with a reviewable source path." },
  { shop: "Traceability", detection: "Evidence records", line: "Receipts preserve what was tested, routed, and reviewed." },
  { shop: "Defect control", detection: "Validation failures", line: "A failed fixture stops promotion instead of becoming copy." },
  { shop: "Escalation paths", detection: "Human review gates", line: "Unsupported wording routes to review before release." },
  { shop: "Quality gates", detection: "CI / verifier enforcement", line: "Checks keep the public claim ceiling from drifting." },
];

export default function HomePage() {
  const previewArtifacts = previewSlugs
    .map((slug) => artifacts.find((a) => a.slug === slug))
    .filter((a): a is Artifact => a !== undefined);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container relative grid gap-14 pt-14 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:pt-24 lg:pb-20 lg:gap-16">
          <div className="order-1 flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <StatusChip label="GOVERNED REBUILD" tone="ice" />
              <StatusChip label="AI · LABOR" />
              <StatusChip label="GOVERNANCE · AUTHORITY" tone="quiet" />
              <span className="mono text-[0.6rem] tracking-[0.22em] uppercase text-[var(--muted)]">v · 2026-05</span>
            </div>

            <h1 className="headline mt-7 text-[clamp(2.4rem,5.6vw,4.4rem)] tracking-tight">
              HawkinsOperations
              <span className="block text-[var(--ice-blue)]">Detection Engineering SOC</span>
            </h1>

            <p className="lede mt-7 max-w-2xl">
              A governed detection engineering system that turns agent-generated work into bounded, reviewable proof routes.
            </p>
            <p className="muted mt-4 max-w-2xl text-base leading-7">
              Raylee builds detection-as-code, validation fixtures, evidence packets, and public reviewer surfaces. Agents generate work; HawkinsOperations decides what can move upward into a claim.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a className="cta cta-primary" href="#promotion-system">See Promotion System →</a>
              <a className="cta cta-quiet" href="#conveyor">Follow the Conveyor →</a>
              <a className="cta cta-quiet" href="#trace">Trace HO-DET-001 →</a>
            </div>

            <aside className="hero-ceiling mt-10 max-w-xl">
              <div className="hero-ceiling__inner">
                <p className="hero-ceiling__eyebrow mono">Current public claim ceiling</p>
                <div className="hero-ceiling__display">
                  <ProofCeilingDisplay visualLabel="Controlled Test Validated" />
                </div>
                <p className="hero-ceiling__note">
                  Every public claim has a ceiling. Stronger wording requires a separate promotion gate.
                </p>
              </div>
            </aside>
          </div>

          <div className="order-2 flex items-center justify-center lg:justify-end">
            <div className="hero-identity-panel" aria-label="HawkinsOperations brand identity">
              <BrandMark size="lg" />
              <div>
                <p className="hero-identity-panel__wordmark">HawkinsOperations</p>
                <p className="hero-identity-panel__line mono">Proof &gt; Truth &gt; Authority</p>
              </div>
              <PortraitCommandFrame size="compact" showArc={false} />
            </div>
          </div>
        </div>

        <div className="container"><hr className="thin-rule" /></div>
      </section>

      <section className="container section-tight" aria-labelledby="prior-evidence-title">
        <div className="prior-evidence">
          <div className="prior-evidence__intro">
            <p className="eyebrow">HawkinsOps V1 / SignalFoundry Operating Evidence</p>
            <h2 id="prior-evidence-title" className="headline mt-3 text-2xl md:text-3xl">
              Prior systems showed operating output. HawkinsOperations shows governance.
            </h2>
            <p className="muted mt-4 text-sm leading-6">
              Prior-system operating evidence. Current HawkinsOperations proof claims remain separately bounded by source, validation, runtime, signal, evidence, and public-proof surfaces. Cross-repo prior metrics are marked{" "}
              <span className="mono">NEEDS_LIVE_GITHUB_REVIEW</span> before they can be packaged as current public proof.
            </p>
          </div>
          <ul className="prior-evidence__metrics" aria-label="Prior operating evidence metrics">
            {priorEvidence.map((metric) => (
              <li key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </li>
            ))}
          </ul>
          <p className="prior-evidence__line mono">
            Wazuh → Cribl → Splunk validation work is prior operating evidence only, not a current HawkinsOperations proof-ledger claim.
          </p>
        </div>
      </section>

      <section className="container section-tight" aria-labelledby="pipeline-proof-title">
        <a className="pipeline-strip" href="/pipeline/" aria-label="Trace the HO-DET-001 public pipeline proof">
          <span className="pipeline-strip__tag mono">New · /pipeline/</span>
          <span id="pipeline-proof-title" className="pipeline-strip__title">HO-DET-001 public pipeline proof</span>
          <span className="pipeline-strip__stats mono">
            14 controlled test cases · 14/14 passed · 0 missed positives · 0 false-positive negatives · 10 blocked claim categories
          </span>
          <span className="pipeline-strip__cta">Trace the pipeline →</span>
        </a>
      </section>

      <section className="container section-tight" id="promotion-system" aria-labelledby="promotion-system-title">
        <div className="promotion-system">
          <header className="promotion-system__header">
            <div>
              <p className="eyebrow">Governed Agent Promotion System</p>
              <h2 id="promotion-system-title" className="headline mt-3 text-2xl md:text-3xl">
                Agents generate work. The system promotes claims.
              </h2>
              <p className="muted mt-4 max-w-3xl text-sm leading-6">
                Agent output starts inside launch controls. Work can move upward only when lower-surface rules are satisfied. Higher surfaces can inherit only bounded truth from lower surfaces.
              </p>
            </div>
            <ul className="promotion-system__controls" aria-label="Agent launch controls">
              {launchControls.map((control) => (
                <li key={control}>{control}</li>
              ))}
            </ul>
          </header>

          <ol className="promotion-ladder" aria-label="Promotion ladder">
            {promotionSurfaces.map((surface, index) => (
              <li key={surface.name}>
                <span className="promotion-ladder__index mono">{String(index + 1).padStart(2, "0")}</span>
                <strong>{surface.name}</strong>
                <span>{surface.role}</span>
              </li>
            ))}
          </ol>

          <div className="promotion-system__footer">
            <div>
              <p className="mono">Promotion gate</p>
              <ul>
                {gateChecks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mono">Prevents</p>
              <ul>
                {preventionList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-tight" id="conveyor" aria-labelledby="conveyor-title">
        <div className="conveyor-section">
          <header className="conveyor-section__header">
            <p className="eyebrow">Evidence Conveyor</p>
            <h2 id="conveyor-title" className="headline mt-2 text-2xl md:text-[1.85rem]">
              Detection work moves through controlled inspection gates.
            </h2>
            <p className="muted mt-3 max-w-3xl text-sm leading-6">
              Detection Source → Fixtures → Case Packet → AI Support → Verifier → Proof Record → Claim Ceiling. The rail is a promotion path, not a live dashboard.
            </p>
          </header>

          <EvidenceConveyor stages={pipelineStages} />
        </div>
      </section>

      <section className="container section-tight" id="cockpit" aria-labelledby="cockpit-title">
        <div className="cockpit">
          <header className="cockpit__header">
            <div>
              <p className="eyebrow">Reviewer Command Deck</p>
              <h2 id="cockpit-title" className="headline mt-2 text-2xl md:text-[1.85rem]">Choose the inspection mode.</h2>
              <p className="muted mt-3 text-sm leading-6 max-w-2xl">
                Executive, Proof, and Technical modes change the reviewer path only. They do not change the underlying proof state.
              </p>
            </div>
            <ul className="cockpit__metrics" aria-label="Repo-derived surface metrics">
              {credibilityMetrics.slice(0, 3).map((metric) => (
                <li key={metric.label} className="cockpit__metric" title={metric.footnote}>
                  <span className="cockpit__metric-value mono">{metric.value}</span>
                  <span className="cockpit__metric-label">{metric.label}</span>
                </li>
              ))}
            </ul>
          </header>

          <div className="cockpit-tabs" role="radiogroup" aria-label="Reviewer mode">
            <input className="cockpit-tabs__radio" type="radio" name="reviewer-mode" id="cockpit-mode-exec" defaultChecked />
            <input className="cockpit-tabs__radio" type="radio" name="reviewer-mode" id="cockpit-mode-proof" />
            <input className="cockpit-tabs__radio" type="radio" name="reviewer-mode" id="cockpit-mode-tech" />

            <div className="cockpit-tabs__bar">
              <label className="cockpit-tabs__label" htmlFor="cockpit-mode-exec" data-mode="exec">
                <span className="cockpit-tabs__dot" aria-hidden="true"></span>
                <span className="cockpit-tabs__name">Executive · 3 min</span>
              </label>
              <label className="cockpit-tabs__label" htmlFor="cockpit-mode-proof" data-mode="proof">
                <span className="cockpit-tabs__dot" aria-hidden="true"></span>
                <span className="cockpit-tabs__name">Proof review · 10 min</span>
              </label>
              <label className="cockpit-tabs__label" htmlFor="cockpit-mode-tech" data-mode="tech">
                <span className="cockpit-tabs__dot" aria-hidden="true"></span>
                <span className="cockpit-tabs__name">Technical · deep</span>
              </label>
            </div>

            {reviewerModes.map((mode) => (
              <div key={mode.id} className="cockpit-panel command-panel" data-mode={mode.id}>
                <div className="command-panel__question">
                  <p className="mono">Primary reviewer question</p>
                  <h3>{mode.question}</h3>
                </div>
                <ul className="command-panel__checklist" aria-label={`${mode.label} checklist`}>
                  {mode.checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="command-panel__footer">
                  <a className="command-panel__next" href={mode.nextClick.href}>
                    {mode.nextClick.label} →
                  </a>
                  <ol className="command-panel__path" aria-label={`${mode.label} highlighted path`}>
                    {mode.path.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container section-tight" id="trace" aria-labelledby="trace-title">
        <div className="trace-terminal">
          <header className="trace-terminal__header">
            <div>
              <p className="eyebrow">Trace One Receipt</p>
              <h2 id="trace-title" className="headline mt-2 text-2xl md:text-3xl">HO-DET-001 · proof trace terminal</h2>
              <p className="muted mt-3 max-w-2xl text-sm leading-6">
                A single bounded receipt traced through the controlled review line. Rows expand to explain the route.
              </p>
            </div>
            <div className="trace-terminal__badge mono">
              <span>Public ceiling</span>
              <strong>CONTROLLED_TEST_VALIDATED</strong>
            </div>
          </header>

          <div className="trace-terminal__screen" aria-label="HO-DET-001 proof trace terminal">
            <div className="trace-terminal__prompt mono">
              <span>receipt://HO-DET-001</span>
              <span>RENDERING_ONLY</span>
            </div>
            {traceSteps.map((step, idx) => (
              <details key={step.code} className="trace-terminal__row" open={idx === 0}>
                <summary>
                  <span className="trace-terminal__row-index mono">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="trace-terminal__row-code mono">{step.code}</span>
                  <span className="trace-terminal__row-label">{step.label}</span>
                </summary>
                <div className="trace-terminal__row-body">
                  <p>{step.line}</p>
                  <a
                    className="trace-terminal__link"
                    href={step.href}
                    target={step.external ? "_blank" : undefined}
                    rel={step.external ? "noopener noreferrer" : undefined}
                  >
                    {step.external ? "Open linked repo ↗" : "Open route →"}
                  </a>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container section-tight">
        <TruthSurfaceSeparation />
      </section>

      <section className="container section-tight" aria-labelledby="qc-map-title">
        <div className="qc-map" data-static-card>
          <div className="qc-map__intro">
            <p className="eyebrow">Manufacturing QC → Detection Engineering</p>
            <h2 id="qc-map-title" className="headline mt-3 text-2xl md:text-3xl">A control system for claims, not a dashboard for vibes.</h2>
            <p className="muted mt-4 max-w-3xl text-sm leading-6">
              HawkinsOperations treats each detection like work on a controlled review line: source enters, fixtures test it, human review owns escalation, deterministic checks guard release, and the public record carries a ceiling.
            </p>
          </div>
          <ol className="qc-map__rows" aria-label="Manufacturing quality control mapped to detection engineering">
            {qcMap.map((item) => (
              <li key={item.shop} className="qc-map__row">
                <span className="qc-map__shop mono">{item.shop}</span>
                <span className="qc-map__arrow" aria-hidden="true">→</span>
                <span className="qc-map__detection">{item.detection}</span>
                <span className="qc-map__line">{item.line}</span>
              </li>
            ))}
          </ol>
          <p className="qc-map__note mono">
            Mapping only · this section explains the operating model and does not create proof.
          </p>
        </div>
      </section>

      <section className="container section-tight proof-cta-block">
        <SectionEyebrow
          eyebrow="Artifact / proof route"
          title="Open the receipts, then follow the record."
          description="Proof records, validation outputs, CI verifier records, and public packets each carry their own ceiling."
          align="between"
          cta={{ label: "Open the full vault", href: "/artifacts/" }}
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {previewArtifacts.map((artifact) => (
            <ArtifactCard key={artifact.slug} artifact={artifact} variant={artifact.flagship ? "flagship" : "default"} />
          ))}
        </div>
      </section>

      <section className="container section-snug" aria-labelledby="boundary-drawer-title">
        <details className="boundary-drawer">
          <summary>
            <span>
              <span className="eyebrow">Claim Boundary Drawer</span>
              <strong id="boundary-drawer-title">What HawkinsOperations is not claiming from the homepage</strong>
            </span>
            <span className="boundary-drawer__toggle mono">Inspect boundary</span>
          </summary>
          <div className="boundary-drawer__body">
            <p>
              This homepage is a reviewer route, not proof by itself. It does not claim runtime-active deployment, signal-observed truth, production scope, fleet-wide coverage, Cribl-routed public proof, Wazuh-routed public proof, AWS-live status, public-safe runtime proof, autonomous SOC operation, AI-approved disposition, or analyst-approved disposition.
            </p>
            <p>
              Security Onion visibility boundary is under private/internal review and is not a public proof claim. No homepage wording should imply production NDR, permanent SPAN, PCAP availability, signal observation, live runtime visibility, cross-source corroboration, or long-term retention.
            </p>
          </div>
        </details>
      </section>

      <section className="container py-16 quiet-text-section">
        <div className="doctrine-strip" data-static-card>
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <p className="eyebrow">Doctrine</p>
              <h2 className="headline mt-3 text-3xl md:text-4xl">AI is labor. Governance is authority.</h2>
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
