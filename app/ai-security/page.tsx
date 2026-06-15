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
  SignalBlockedBadge,
  type ReviewerLens,
} from "@components/proofops";
import { CapabilityMaturityGrid, GauntletExecutionConsole } from "@components/visual-intelligence";
import { externalLinks } from "@data/navigation";
import { proofPack } from "@data/proofPackManifest";
import { registryStats } from "@data/validationRegistry";

export const metadata: Metadata = {
  title: "AI Security | HawkinsOperations",
  description:
    "A governed AI Security Operations implementation model for AI-assisted detection engineering, deterministic verification, and human authority.",
  alternates: {
    canonical: "/ai-security/",
  },
};

const workflowLenses: ReviewerLens[] = [
  {
    label: "AI support",
    title: "AI is labor",
    body: "AI can help draft detections, summarize reviewer context, and organize case packets, but it does not authorize disposition.",
    checkpoints: [
      "AI output enters the same artifact intake path.",
      "Claim wording is checked against evidence ceilings.",
      "AI approval is not claimed.",
    ],
  },
  {
    label: "Verifier",
    title: "Deterministic checks gate behavior",
    body: "Schemas, controlled fixture results, and claim-boundary scanners provide deterministic friction before public rendering.",
    checkpoints: [
      "Validation remains separate from proof authority.",
      "Controlled validation does not become runtime or signal proof.",
      "Failed checks stop promotion.",
    ],
  },
  {
    label: "Human authority",
    title: "Humans gate promotion",
    body: "Human review sits above implementation momentum, green checks, and AI summaries.",
    checkpoints: [
      "human_review_required remains true where applicable.",
      "Final authorization is not claimed by the site.",
      "Analyst approval is not implied by AI support.",
    ],
  },
  {
    label: "Ceiling",
    title: "The proof ceiling travels with the artifact",
    body: "Each reviewer route should show what the artifact supports and what it does not prove.",
    checkpoints: [
      "Website rendering is not proof.",
      "public_safe remains false unless separately approved.",
      "Proof authority remains outside the website repo.",
    ],
  },
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
  "autonomous SOC operation",
  "AI approved disposition",
  "analyst approved disposition",
  "final human authorization",
  "case closed status",
];

const reviewerSurfaces = [
  {
    href: "/hoxline/",
    title: "Hoxline",
    description: "Open the ProofOps control plane route and interactive claim loop.",
  },
  {
    href: "/proof/proof-pack-001/",
    title: "Proof Pack 001",
    description: `${proofPack.id} routes a bounded HO-DET-001 reviewer package at ${proofPack.ceiling}.`,
  },
  {
    href: "/detections/",
    title: "Detections",
    description: "Detection portfolio, validation status, ATT&CK mapping, and proof boundaries.",
  },
  {
    href: "/validation/",
    title: "Validation registry",
    description: `${registryStats.passedPackages} controlled-test validation packages and ${registryStats.totalFixtures} fixtures with blocked runtime / signal states.`,
  },
];

export default function AiSecurityPage() {
  return (
    <div className="proofops-page">
      <ProofOpsPageHero
        eyebrow="AI support under ProofOps control"
        title="AI Security"
        accent="without AI authority"
        subtitle="A governed implementation model where AI helps security work move faster, while evidence and human review decide what can be claimed."
        description="This route separates AI support, deterministic verification, human authority, proof ceilings, and blocked claims so the model reads like an operator workflow instead of a long report."
        metrics={[
          { label: "AI role", value: "support only", tone: "cyan" },
          { label: "Verifier", value: "deterministic", tone: "green" },
          { label: "Authority", value: "human review", tone: "amber" },
          { label: "Promotion", value: "bounded", tone: "blocked" },
        ]}
      >
        <p className="proofops-kicker">Support-only split</p>
        <div className="proofops-grid-2">
          <EvidenceCeilingCard
            label="AI support"
            ceiling="Labor"
            detail="Draft, organize, summarize, and route."
            tone="cyan"
          />
          <EvidenceCeilingCard
            label="Authority"
            ceiling="Evidence + human review"
            detail="Claims move only when evidence and review permit it."
            tone="amber"
          />
        </div>
      </ProofOpsPageHero>

      <section className="proofops-section">
        <div className="container">
          <div className="ai-workflow-scene" aria-label="Governed AI workflow visual">
            <div>
              <p className="cockpit-eyebrow">Governed AI Workflow</p>
              <h2>AI drafts. Verifiers test. Claim Firewall clamps. Human review decides.</h2>
              <p>
                The workflow shows where AI helps and where the system stops it. Public wording
                stays below evidence, proof ceilings, and human review gates.
              </p>
            </div>
            <ol className="ai-workflow-scene__rail">
              {["AI Draft", "Verifier", "Claim Firewall", "Human Review", "Public Wording"].map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <ClaimBoundaryPanel
            title="AI support does not become claim authority."
            description="The route keeps AI, deterministic verifiers, human review, and proof ceilings visually separated."
            boundaries={[
              { label: "AI support", value: "labor and drafting", tone: "cyan" },
              { label: "Verifier", value: "schema and controlled checks", tone: "green" },
              { label: "Human authority", value: "promotion gate", tone: "amber" },
              { label: "Website", value: "rendering only", tone: "neutral" },
              { label: "Not claimed", value: "AI approved disposition", tone: "blocked" },
              { label: "Not claimed", value: "analyst approved disposition", tone: "blocked" },
            ]}
          />
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <SectionHeader
            title="AI support is governed by ProofOps control"
            eyebrow="Hoxline visual intelligence"
            description="Gauntlet v0 shows how AI-assisted security work enters a controlled loop, emits reviewer artifacts, and keeps runtime, signal, approval, and public-safe claims gated."
          />
          <div className="vi-grid-2">
            <CapabilityMaturityGrid />
            <GauntletExecutionConsole />
          </div>
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <SectionHeader
            title="Workflow visualization"
            eyebrow="Support -> verify -> review -> bound"
            description="The same Hoxline loop applies to AI-assisted security work: AI helps; evidence gates; humans promote."
          />
          <ProofOpsLoopDiagram />
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <SectionHeader
            title="Reviewer lenses"
            eyebrow="Read the model by authority"
            description="The page is organized by what each layer can do and what it cannot claim."
          />
          <ReviewerLensTabs lenses={workflowLenses} />
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <SectionHeader title="Evidence ceiling and blocked claims" eyebrow="Claim discipline" />
          <div className="proofops-grid-3">
            <EvidenceCeilingCard
              label="Controlled validation"
              ceiling="Supported where records exist"
              detail="Controlled validation remains distinct from runtime and signal proof."
              tone="green"
            />
            <EvidenceCeilingCard
              label="public_safe"
              ceiling="false unless approved"
              detail="Public release safety requires separate evidence and approval."
              tone="blocked"
            />
            <EvidenceCeilingCard
              label="Human gate"
              ceiling="required"
              detail="Human review sits above AI output and green checks."
              tone="amber"
            />
          </div>
          <div className="mt-6">
            <BlockedClaimGrid claims={blockedClaims} />
          </div>
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <SectionHeader
            title="Reviewer inspection path"
            eyebrow="Evidence routes"
            description="Start with Hoxline, then inspect proof, detections, and validation routes. Each surface keeps its own authority boundary."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {reviewerSurfaces.map((surface) => (
              <LinkCard key={surface.href} href={surface.href} title={surface.title} description={surface.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <SectionHeader title="What transfers" eyebrow="Operator-grade pattern" />
          <div className="proofops-grid-3">
            {[
              ["Source control", "Rule logic, mapping, status metadata, and review history remain auditable."],
              ["Deterministic gates", "Validation packages, schema checks, and claim-boundary scans fail closed."],
              ["Case structure", "Case packets can carry support-only AI fields and blocked action defaults."],
              ["Human review", "Review authority stays visible above CI, AI output, and implementation momentum."],
              ["Claim ceilings", "Public copy remains below the evidence ceiling attached to each artifact."],
              ["Reviewer routes", "Routes help reviewers inspect evidence without turning rendering into proof."],
            ].map(([title, detail]) => (
              <article key={title} className="proofops-card">
                <p className="proofops-kicker">Transfer</p>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="proofops-section pb-24">
        <div className="container">
          <SectionHeader title="Source-controlled context" eyebrow="Repos" />
          <div className="grid gap-4 md:grid-cols-3">
            <LinkCard href={externalLinks.reproducibleReviewerPath} title="Reproducible reviewer path" description="Clone-runnable route through all six repos without private runtime access." external />
            <LinkCard href={externalLinks.orgRequiredChecksMatrix} title="Required checks matrix" description="Observed checks, report-only controls, and website rendering boundaries." external />
            <LinkCard href={externalLinks.platformDetectionFactoryController} title="Detection Factory Controller v0" description="Bounded reviewer status and plan emitter; platform visibility, not proof promotion." external />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <SignalBlockedBadge label="AI approval not claimed" />
            <SignalBlockedBadge label="analyst approval not claimed" />
            <SignalBlockedBadge label="case closure not claimed" />
          </div>
        </div>
      </section>
    </div>
  );
}
