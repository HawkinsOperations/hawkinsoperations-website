import type { Metadata } from "next";
import HoxlineEngineRoom from "@components/hoxline/HoxlineEngineRoom";
import LinkCard from "@components/LinkCard";
import SectionHeader from "@components/SectionHeader";
import {
  BlockedClaimGrid,
  ClaimBoundaryPanel,
  EvidenceCeilingCard,
  ProofOpsLoopDiagram,
  ProofOpsPageHero,
  ReviewerLensTabs,
  SafeClaimCard,
  SignalBlockedBadge,
  type ReviewerLens,
} from "@components/proofops";
import {
  AuthorityConstellation,
  BoundedMetricsRail,
  CapabilityMaturityGrid,
  ClaimDecisionMatrixVisual,
  ComplexityStatsRail,
  DataPackSourceStrip,
  EvidencePathTimeline,
  GauntletExecutionConsole,
  LoopStatusOrbit,
  OutputArtifactWall,
  StageStatusChart,
  StillGatedPanel,
  VisualIntelligenceHero,
  VisualModuleRail,
} from "@components/visual-intelligence";

export const metadata: Metadata = {
  title: "Hoxline | HawkinsOperations",
  description:
    "Hoxline by HawkinsOperations runs the controlled ProofOps loop for HO-DET-001 and emits bounded reviewer JSON and Markdown outputs while preserving claim boundaries.",
  alternates: {
    canonical: "/hoxline/",
  },
};

const heroFacts = [
  ["Public form", "Hoxline by HawkinsOperations"],
  ["Product role", "ProofOps control plane"],
  ["Current example", "HO-DET-001"],
  ["Evidence ceiling", "CONTROLLED_TEST_VALIDATED"],
  ["public_safe", "false"],
  ["human_review_required", "true"],
];

const blockedClaims = [
  "runtime-status overclaim",
  "runtime-proof overclaim",
  "signal-status overclaim",
  "public-safe proof overclaim",
  "production-readiness overclaim",
  "SOCaaS-readiness overclaim",
  "SOCaaS-deployment overclaim",
  "customer-deployment overclaim",
  "AI-disposition approval overclaim",
  "analyst-disposition approval overclaim",
  "final-authorization overclaim",
  "case-closure overclaim",
];

const controlSurfaces = [
  {
    label: "Intake",
    title: "AI output intake",
    detail: "Generated security work enters as a named artifact with scope, source, and reviewer context attached.",
  },
  {
    label: "Graph",
    title: "Evidence graphing",
    detail: "Artifact, validation, runtime candidate, signal, review, and claim nodes stay separated for inspection.",
  },
  {
    label: "State",
    title: "Validation state",
    detail: "Controlled fixture status is shown as evidence state, not as runtime or signal truth.",
  },
  {
    label: "Ceiling",
    title: "Proof ceiling",
    detail: "The current ceiling travels with the artifact so public language cannot climb past evidence.",
  },
  {
    label: "Decision",
    title: "Claim decision",
    detail: "Claim Authority separates allowed controlled-validation wording from blocked stronger families.",
  },
  {
    label: "Review",
    title: "Reviewer handoff",
    detail: "The route points reviewers to proof, source, validation, and platform authority before trust is granted.",
  },
];

const hoxlineAnswer = [
  ["Generated output", "Useful draft material, never authority."],
  ["Evidence", "References attached to source-controlled artifacts."],
  ["Validation", "Controlled behavior checks with explicit fixture scope."],
  ["Proof records", "Owned by the proof authority surface, not this page."],
  ["Public rendering", "Readable website surface only."],
  ["Claim authority", "Hoxline capability for allowed and blocked wording."],
];

const claimMatrix = [
  {
    label: "Allowed",
    title: "Controlled validation evidence exists",
    detail: "HO-DET-001 has controlled positive and negative fixture validation evidence under the current ceiling.",
    tone: "green",
  },
  {
    label: "Blocked",
    title: "Runtime or signal promotion",
    detail: "Runtime-active, runtime proven, signal observed, and public signal proof wording remain blocked.",
    tone: "blocked",
  },
  {
    label: "Blocked",
    title: "Public release or deployment wording",
    detail: "public_safe remains false; production, customer, deployment, and SOCaaS status are not claimed.",
    tone: "blocked",
  },
  {
    label: "Required",
    title: "Human and authority review",
    detail: "human_review_required remains true and authority references must be inspected before stronger claims.",
    tone: "amber",
  },
];

const authorityMap = [
  ["hoxline", "product/control plane", "Routes AI-assisted work into evidence-bound claim decisions."],
  ["hawkinsoperations-detections", "source truth", "Owns detection packages, rule context, and source metadata."],
  ["hawkinsoperations-validation", "behavior truth", "Owns controlled fixture behavior status."],
  ["hawkinsoperations-platform", "contracts/ledgers/promotion authority", "Owns schemas, ledgers, and promotion mechanics."],
  ["hawkinsoperations-proof", "proof authority", "Owns proof records and evidence ceilings."],
  ["hawkinsoperations-website", "rendering only", "Displays public reviewer routes without creating proof."],
  ["HawkinsOperations.github", "org/reviewer routing", "Connects org-level review and workflow routing."],
];

const reviewerPath = [
  {
    title: "Inspect the controlled demo package",
    detail: "Clone the Hoxline repo, run `python -B -m hoxline demo quickstart`, then read `.hoxline/demo-runs/<timestamp>/reviewer-pack.md`. The demo is deterministic, local, fixture-based, and not runtime proof.",
  },
  {
    title: "Inspect the proof ceiling and blocked claims",
    detail: "Confirm the ceiling is CONTROLLED_TEST_VALIDATED and stronger claim families remain blocked.",
  },
  {
    title: "Inspect authority references",
    detail: "Check proof, detections, validation, and platform surfaces before trusting public wording.",
  },
];

const publicReviewerPacket = [
  {
    title: "Current-state panel",
    detail:
      "Hoxline Public Reviewer Packet v0 keeps public_safe false, human review required, website rendering below proof, and green CI below approval.",
  },
  {
    title: "Allowed claim",
    detail: "HO-DET-001 has controlled validation evidence and remains under governed review.",
  },
  {
    title: "Blocked stronger claims",
    detail:
      "The packet does not claim runtime proof, signal observation, production readiness, customer deployment, SOCaaS deployment, AI approval, analyst approval, case closure, or public proof promotion.",
  },
  {
    title: "Private runtime candidate boundary",
    detail:
      "HO-DET-009, HO-DET-010, HO-DET-011, and HO-DET-012 may be referenced only as private runtime candidate and standing collector support. They remain NOT_PUBLIC_SAFE, human review required, and not public proof.",
  },
  {
    title: "Private reference boundary",
    detail:
      "Private runtime reference digests are hash references only. They are not public proof and do not raise the public proof ceiling.",
  },
  {
    title: "No promotion side effects",
    detail: "No ledger append, no public proof promotion, and no schedule enablement are created by this page.",
  },
];

const nextGate = [
  "Separate runtime evidence from the appropriate authority path.",
  "Preserved signal evidence tied to the artifact and telemetry contract.",
  "Updated promotion ledger state in the platform authority surface.",
  "Proof authority update that raises the ceiling without relying on website rendering.",
  "Explicit human review decision before public wording changes.",
];

const lenses: ReviewerLens[] = [
  {
    label: "Executive",
    title: "What leadership can trust",
    body: "Hoxline makes the evidence ceiling and blocked claim families visible before AI-assisted security work becomes public wording.",
    checkpoints: [
      "The product controls claim movement, not proof truth.",
      "The safe claim stays below CONTROLLED_TEST_VALIDATED.",
      "public_safe remains false and human review remains required.",
    ],
  },
  {
    label: "Detection engineer",
    title: "What implementation teams inspect",
    body: "Engineers can trace the artifact through source, controlled validation, telemetry expectations, and blocked runtime or signal gates.",
    checkpoints: [
      "Open the HO-DET-001 ProofCard bridge.",
      "Inspect controlled positive and negative fixture counts.",
      "Confirm runtime and signal gates remain blocked.",
    ],
  },
  {
    label: "Reviewer",
    title: "Where review starts",
    body: "Reviewers start from the release packet, then verify proof ceilings and source-controlled authority surfaces before trusting copy.",
    checkpoints: [
      "Website rendering is not proof.",
      "The proof ceiling is attached to the artifact.",
      "Draft packaging work is not treated as merged proof.",
    ],
  },
  {
    label: "Claim authority",
    title: "How wording is decided",
    body: "Claim Firewall is an internal Hoxline Claim Authority capability that separates allowed wording from blocked wording.",
    checkpoints: [
      "Controlled validation proves controlled validation only.",
      "Runtime, signal, public-safe, and production claims stay blocked.",
      "Hoxline does not replace proof authority.",
    ],
  },
];

export default function HoxlinePage() {
  return (
    <div className="proofops-page">
      <section className="proofops-section">
        <div className="container">
          <VisualIntelligenceHero />
          <div className="mt-6">
            <HoxlineEngineRoom />
          </div>
          <div className="mt-5">
            <DataPackSourceStrip />
          </div>
          <div className="mt-5">
            <ComplexityStatsRail />
          </div>
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <SectionHeader
            title="What Hoxline can verify today"
            eyebrow="Controlled capability before gated states"
            description="Capability Visual Data Pack v1 makes the product feel like an engine: it records the canonical HO-DET-001 loop, reviewer outputs, output contract checks, bounded metrics, visual modules, and remaining gates without promoting runtime or signal claims."
          />
          <div className="vi-grid-2">
            <CapabilityMaturityGrid />
            <StageStatusChart />
          </div>
          <div className="mt-5">
            <BoundedMetricsRail />
          </div>
          <div className="mt-5 vi-grid-2">
            <GauntletExecutionConsole />
            <OutputArtifactWall />
          </div>
          <div className="mt-5">
            <VisualModuleRail />
          </div>
        </div>
      </section>

      <ProofOpsPageHero
        eyebrow="Hoxline by HawkinsOperations"
        title="Hoxline"
        accent="Run the ProofOps loop."
        subtitle="Executable claim control for AI-assisted security work."
        description="ProofOps control for the AI security era. AI is not the authority. Evidence is. Hoxline controls what AI-assisted security work is allowed to become while Capability Visual Data Pack v1 keeps runtime, signal, public-safe, production, customer, and approval claims blocked unless evidence exists."
        metrics={[
          { label: "Runner", value: "GAUNTLET_V0", tone: "cyan" },
          { label: "Artifact", value: "HO-DET-001", tone: "cyan" },
          { label: "Ceiling", value: "CONTROLLED_TEST_VALIDATED", tone: "amber" },
          { label: "Runtime", value: "gated", tone: "blocked" },
          { label: "Signal", value: "missing evidence", tone: "amber" },
          { label: "Human review", value: "required", tone: "green" },
        ]}
      >
        <p className="proofops-kicker">Product boundary</p>
        <dl className="proofops-compact-list">
          {heroFacts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 grid gap-3">
          <LinkCard
            href="#controlled-demo"
            title="Inspect controlled demo"
            description="Open the HO-DET-001 spotlight and claim decision boundary."
          />
          <LinkCard
            href="#reviewer-path"
            title="Reviewer route"
            description="Follow the bounded path through package, ceiling, and authority references."
          />
        </div>
      </ProofOpsPageHero>

      <section className="proofops-section">
        <div className="container">
          <SectionHeader
            title="Gauntlet engine"
            eyebrow="Interactive visual intelligence"
            description="The same controlled-loop data is rendered as a stage orbit, authority constellation, evidence path timeline, and claim decision matrix. These visuals make complexity inspectable without turning the website into proof."
          />
          <div className="vi-grid-2">
            <LoopStatusOrbit />
            <AuthorityConstellation />
          </div>
          <div className="mt-5 vi-grid-2">
            <EvidencePathTimeline />
            <ClaimDecisionMatrixVisual />
          </div>
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <SectionHeader
            title="The Claim Problem"
            eyebrow="AI speed meets evidence discipline"
            description="AI can draft convincing security claims faster than an organization can safely prove them. Hoxline keeps generated output, evidence, validation, telemetry, proof ceilings, and human review from collapsing into one public sentence."
          />
          <div className="proofops-grid-3">
            {[
              ["Fast output", "AI-assisted work can create detection ideas, summaries, and reviewer notes quickly."],
              ["Slow authority", "Evidence, validation, telemetry, proof records, and review gates must stay explicit."],
              ["Claim pressure", "The dangerous step is turning useful output into wording that sounds stronger than the evidence."],
            ].map(([title, detail]) => (
              <article key={title} className="proofops-card">
                <p className="proofops-kicker">Problem</p>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <ClaimBoundaryPanel
            title="Product thesis: AI is not the authority. Evidence is."
            description="Hoxline is the control layer for claim movement. It does not make the website a proof source, does not promote public_safe, and does not convert controlled validation into runtime or signal proof."
            boundaries={[
              { label: "AI role", value: "labor and drafting", tone: "cyan" },
              { label: "Evidence role", value: "authority input", tone: "amber" },
              { label: "Hoxline role", value: "claim-control layer", tone: "cyan" },
              { label: "Website role", value: "rendering only", tone: "neutral" },
              { label: "Current ceiling", value: "CONTROLLED_TEST_VALIDATED", tone: "green" },
              { label: "Promotion", value: "human_review_required true", tone: "blocked" },
            ]}
          />
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <SectionHeader
            title="What Hoxline Controls"
            eyebrow="From generated output to claim-ready evidence"
            description="Hoxline organizes the movement from AI-assisted work into reviewer-readable evidence boundaries. Each control keeps one authority surface from being confused with another."
          />
          <div className="proofops-grid-3">
            {controlSurfaces.map((surface) => (
              <article key={surface.title} className="proofops-card">
                <p className="proofops-kicker">{surface.label}</p>
                <h3>{surface.title}</h3>
                <p>{surface.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <SectionHeader
            title="The Hoxline Answer"
            eyebrow="Separate the layers"
            description="The product value is not a bigger claim. It is a disciplined route that keeps generated output, evidence, validation, proof records, public rendering, and claim authority in separate compartments."
          />
          <div className="proofops-grid-3">
            {hoxlineAnswer.map(([title, detail]) => (
              <article key={title} className="proofops-card">
                <p className="proofops-kicker">Layer</p>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <SectionHeader
            title="ProofOps Loop"
            eyebrow="Interactive control diagram"
            description="Tap a step to inspect the control. The active step shows what happens, what control applies, and what remains blocked."
          />
          <ProofOpsLoopDiagram />
        </div>
      </section>

      <section id="controlled-demo" className="proofops-section">
        <div className="container">
          <SectionHeader
            title="HO-DET-001 Controlled Demo Spotlight"
            eyebrow="One artifact, one loop, one bounded claim"
            description="HO-DET-001 is the flagship example for the current route. It demonstrates controlled validation boundaries without promoting runtime, signal, public-safe, production, customer, or final authorization claims."
          />
          <article className="proofops-flagship">
            <div className="proofops-flagship__grid">
              <div>
                <p className="proofops-kicker">Artifact</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-50 md:text-4xl">
                  HO-DET-001: controlled validation bridge
                </h2>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  The demo package shows controlled positive and negative fixture validation evidence and keeps the current ceiling visible. It does not authorize stronger public wording.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <SignalBlockedBadge label="public_safe false" />
                  <SignalBlockedBadge label="human review required" />
                  <SignalBlockedBadge label="runtime not promoted" />
                  <SignalBlockedBadge label="signal not promoted" />
                </div>
              </div>
              <div className="proofops-grid-2">
                <EvidenceCeilingCard
                  label="State"
                  ceiling="CONTROLLED_TEST_VALIDATED"
                  detail="Controlled validation evidence exists for the bounded package."
                  tone="green"
                />
                <EvidenceCeilingCard
                  label="ProofCard"
                  ceiling="Rendering route"
                  detail="The website can display the ProofCard context but does not become proof authority."
                  tone="cyan"
                />
                <SafeClaimCard
                  claim="HO-DET-001 has controlled validation evidence from controlled positive and negative process-creation fixtures and remains under review."
                  detail="This wording stays below the current evidence ceiling."
                />
                <EvidenceCeilingCard
                  label="Blocked claim"
                  ceiling="Runtime / signal / public-safe"
                  detail="Runtime, signal, public-safe, production, customer, and final authorization wording remain blocked."
                  tone="blocked"
                />
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <LinkCard
                href="https://github.com/HawkinsOperations/hoxline/pull/7"
                title="PR #7 bridge"
                description="Merged HO-DET-001 ProofCard v0 / Gauntlet controlled-validation bridge."
                external
              />
              <LinkCard
                href="https://github.com/HawkinsOperations/hoxline/pull/9"
                title="Release packet"
                description="Merged reviewer packet summarizing bridge, strategy docs, and website route."
                external
              />
              <LinkCard
                href="/proof/ho-det-001/"
                title="HO-DET-001 route"
                description="Open the bounded reviewer case-file rendering route."
              />
            </div>
          </article>
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <SectionHeader
            title="Claim Boundary Matrix"
            eyebrow="Claim Authority"
            description="Hoxline makes the decision surface visible: what the current evidence allows, what remains blocked, and what needs authority review."
          />
          <div className="proofops-grid-4">
            {claimMatrix.map((item) => (
              <EvidenceCeilingCard
                key={`${item.label}-${item.title}`}
                label={item.label}
                ceiling={item.title}
                detail={item.detail}
                tone={item.tone as "green" | "blocked" | "amber"}
              />
            ))}
          </div>
          <div className="mt-6">
            <BlockedClaimGrid claims={blockedClaims} />
          </div>
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <SectionHeader
            title="Authority Architecture"
            eyebrow="Seven surfaces, separate authority"
            description="The architecture is intentionally split. Hoxline controls product flow and claim decisions, while proof, source, validation, platform, rendering, and organization routing keep their own authority boundaries."
          />
          <div className="proofops-grid-3">
            {authorityMap.map(([repo, role, detail]) => (
              <article key={repo} className="proofops-card">
                <p className="proofops-kicker">{role}</p>
                <h3>{repo}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="reviewer-path" className="proofops-section">
        <div className="container">
          <SectionHeader
            title="Reviewer Start Path"
            eyebrow="Where to begin"
            description="A reviewer should not start by trusting the page. Start with the controlled package, then inspect ceilings and authority references."
          />
          <div className="proofops-grid-3">
            {reviewerPath.map((step, index) => (
              <article key={step.title} className="proofops-card">
                <p className="proofops-kicker">Step {index + 1}</p>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
          <div className="mt-6">
            <ReviewerLensTabs lenses={lenses} />
          </div>
          <div className="mt-6">
            <ClaimBoundaryPanel
              title="Hoxline Public Reviewer Packet v0"
              description="This route renders the packet as reviewer orientation only. Rendering is not proof, public_safe remains false, private runtime references are not public proof, human review remains required, no ledger append happened, no public proof promotion happened, and no schedule was enabled."
              boundaries={[
                { label: "Packet status", value: "NOT_PUBLIC_SAFE", tone: "blocked" },
                { label: "Public ceiling", value: "CONTROLLED_TEST_VALIDATED", tone: "green" },
                { label: "Private references", value: "hash references only", tone: "amber" },
                { label: "Website", value: "rendering only", tone: "neutral" },
                { label: "Human review", value: "required", tone: "amber" },
                { label: "Promotion", value: "not promoted", tone: "blocked" },
              ]}
            />
          </div>
          <div className="mt-6 proofops-grid-3">
            {publicReviewerPacket.map((item) => (
              <article key={item.title} className="proofops-card">
                <p className="proofops-kicker">Reviewer packet</p>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <LinkCard
              href="https://github.com/HawkinsOperations/hoxline/pull/7"
              title="PR #7 bridge"
              description="Merged HO-DET-001 ProofCard v0 / Gauntlet controlled-validation bridge."
              external
            />
            <LinkCard
              href="https://github.com/HawkinsOperations/hoxline/pull/9"
              title="Release packet"
              description="Merged reviewer packet summarizing the bridge, strategy docs, and website route."
              external
            />
            <LinkCard
              href="https://github.com/HawkinsOperations/hoxline/pull/10"
              title="PR #10 draft"
              description="Draft controlled demo packaging work. Demo packaging only; not merged proof."
              external
            />
            <LinkCard
              href="https://github.com/HawkinsOperations/hoxline/blob/main/docs/reviewer/HOXLINE_PUBLIC_REVIEWER_PACKET_V0.md"
              title="Reviewer packet doc"
              description="Read the public reviewer packet boundary and current-state explanation."
              external
            />
            <LinkCard
              href="https://github.com/HawkinsOperations/hoxline/blob/main/examples/reviewer/hoxline-public-reviewer-packet-v0.json"
              title="Reviewer packet JSON"
              description="Inspect the sanitized current-state packet data."
              external
            />
            <LinkCard
              href="https://github.com/HawkinsOperations/hoxline/blob/main/schemas/public-reviewer-packet-v0.schema.json"
              title="Reviewer packet schema"
              description="Inspect the fail-closed schema constants for the packet."
              external
            />
            <LinkCard
              href="/validation/"
              title="Validation registry"
              description="Inspect controlled fixture status and blocked runtime or signal states."
            />
          </div>
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <StillGatedPanel />
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <ClaimBoundaryPanel
            title="Trust Boundary"
            description="This is the compact operating boundary for the page. Hoxline helps control claims, but it does not create proof authority or promote stronger states by rendering them."
            boundaries={[
              { label: "Website rendering", value: "not proof", tone: "neutral" },
              { label: "Hoxline", value: "not proof authority", tone: "cyan" },
              { label: "runtime / signal", value: "blocked", tone: "blocked" },
              { label: "public_safe", value: "false", tone: "blocked" },
              { label: "Human review", value: "required", tone: "amber" },
              { label: "Controlled validation", value: "current ceiling only", tone: "green" },
            ]}
          />
        </div>
      </section>

      <section className="proofops-section pb-24">
        <div className="container">
          <SectionHeader
            title="Next Gate"
            eyebrow="Evidence required before stronger claims"
            description="Stronger wording would require separate evidence and authority updates. Website rendering cannot supply those gates."
          />
          <div className="proofops-grid-3">
            {nextGate.map((gate) => (
              <article key={gate} className="proofops-card">
                <p className="proofops-kicker">Required next evidence</p>
                <h3>{gate}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
