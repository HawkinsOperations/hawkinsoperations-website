import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Hoxline | HawkinsOperations",
  description:
    "Hoxline by HawkinsOperations is a ProofOps control plane for bounded AI-assisted security work, reviewer evidence paths, and claim boundaries.",
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
  "runtime-active status",
  "runtime proven status",
  "signal observed status",
  "public-safe proof",
  "production-ready status",
  "SOCaaS-ready status",
  "SOCaaS deployed status",
  "customer deployed status",
  "AI approved disposition",
  "analyst approved disposition",
  "final human authorization",
  "case closed status",
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
    detail: "Start with the HO-DET-001 bridge, release packet, and existing bounded case-file route.",
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
      <ProofOpsPageHero
        eyebrow="Hoxline by HawkinsOperations"
        title="Hoxline"
        accent="ProofOps control"
        subtitle="ProofOps control for the AI security era."
        description="AI is not the authority. Evidence is. Hoxline controls what AI-assisted security work is allowed to become while proof authority, source truth, validation truth, platform contracts, and website rendering remain separate."
        metrics={[
          { label: "Product", value: "control plane", tone: "cyan" },
          { label: "Ceiling", value: "CONTROLLED_TEST_VALIDATED", tone: "amber" },
          { label: "public_safe", value: "false", tone: "blocked" },
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
              href="/validation/"
              title="Validation registry"
              description="Inspect controlled fixture status and blocked runtime or signal states."
            />
          </div>
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
