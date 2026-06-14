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
    "Hoxline by HawkinsOperations is a rendering-only reviewer route for ProofOps claim boundaries and the HO-DET-001 controlled-validation bridge.",
  alternates: {
    canonical: "/hoxline/",
  },
};

const heroFacts = [
  ["Product", "Hoxline by HawkinsOperations"],
  ["Artifact", "HO-DET-001"],
  ["Evidence state", "CONTROLLED_TEST_VALIDATED"],
  ["Proof ceiling", "CONTROLLED_TEST_VALIDATED"],
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

const lenses: ReviewerLens[] = [
  {
    label: "Manager scan",
    title: "What Hoxline controls",
    body: "Hoxline controls how AI-assisted security output is allowed to become an evidence-bound claim.",
    checkpoints: [
      "Start with the allowed controlled-validation claim.",
      "Check that public_safe remains false.",
      "Check that website rendering is not proof.",
    ],
  },
  {
    label: "Engineer path",
    title: "What to inspect",
    body: "Review the ProofCard, Gauntlet run, evidence graph, and promotion state before stronger wording is considered.",
    checkpoints: [
      "Open the HO-DET-001 ProofCard bridge.",
      "Inspect controlled positive and negative fixture counts.",
      "Confirm runtime and signal gates remain blocked.",
    ],
  },
  {
    label: "Claim boundary",
    title: "What remains blocked",
    body: "Controlled validation does not become runtime proof, signal proof, public-safe proof, production status, or customer status.",
    checkpoints: [
      "AI is labor, not authority.",
      "Evidence sources remain authority.",
      "Human review gates promotion.",
    ],
  },
];

export default function HoxlinePage() {
  return (
    <div className="proofops-page">
      <ProofOpsPageHero
        eyebrow="Hoxline by HawkinsOperations"
        title="Hoxline"
        accent="ProofOps cockpit"
        subtitle="A control plane for deciding what AI-assisted security work is allowed to become."
        description="Hoxline turns fast security work into reviewer-readable claim decisions while keeping proof authority, source truth, validation truth, platform contracts, and website rendering separate."
        metrics={[
          { label: "Route", value: "DRAFT_RENDERING_ROUTE", tone: "cyan" },
          { label: "Ceiling", value: "CONTROLLED_TEST_VALIDATED", tone: "amber" },
          { label: "public_safe", value: "false", tone: "blocked" },
          { label: "Human review", value: "required", tone: "green" },
        ]}
      >
        <p className="proofops-kicker">Reviewer facts</p>
        <dl className="proofops-compact-list">
          {heroFacts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </ProofOpsPageHero>

      <section className="proofops-section">
        <div className="container">
          <ProofOpsLoopDiagram />
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <ClaimBoundaryPanel
            title="Hoxline controls claim promotion, not proof truth."
            description="The product route shows how claim authority should read the evidence ceiling. It does not create the evidence ceiling itself."
            boundaries={[
              { label: "Proof authority", value: "hawkinsoperations-proof", tone: "amber" },
              { label: "Source truth", value: "hawkinsoperations-detections", tone: "cyan" },
              { label: "Behavior truth", value: "hawkinsoperations-validation", tone: "cyan" },
              { label: "Promotion authority", value: "hawkinsoperations-platform", tone: "amber" },
              { label: "Rendering", value: "hawkinsoperations-website only", tone: "neutral" },
              { label: "Current ceiling", value: "CONTROLLED_TEST_VALIDATED", tone: "green" },
            ]}
          />
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <SectionHeader
            title="Safe claim vs blocked claim"
            eyebrow="Claim Authority"
            description="One safe claim is allowed. Stronger claim families remain visibly blocked until separate evidence and promotion gates exist."
          />
          <div className="proofops-grid-2">
            <SafeClaimCard
              claim="HO-DET-001 has controlled validation evidence from controlled positive and negative process-creation fixtures and remains under review."
              detail="This wording stays below the controlled-validation ceiling and keeps human review visible."
            />
            <div className="proofops-card">
              <p className="proofops-kicker">Blocked wording</p>
              <h3>What the page does not claim</h3>
              <p>
                This route does not claim public-safe proof, production-ready status,
                SOCaaS availability, customer deployment, runtime truth, signal truth,
                AI approval, analyst approval, final human authorization, or case closure.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["runtime", "signal", "public_safe", "production", "customer"].map((item) => (
                  <SignalBlockedBadge key={item} label={item} />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <BlockedClaimGrid claims={blockedClaims} />
          </div>
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <SectionHeader
            title="Reviewer navigation"
            eyebrow="Inspect the bounded package"
            description="Start with the bridge and release packet. PR #10 is draft demo-packaging work only and is not treated as merged proof."
          />
          <ReviewerLensTabs lenses={lenses} />
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
              href="/proof/ho-det-001/"
              title="HO-DET-001 route"
              description="Existing website rendering route for the bounded HO-DET-001 reviewer case file."
            />
          </div>
        </div>
      </section>

      <section className="proofops-section pb-24">
        <div className="container proofops-grid-3">
          <EvidenceCeilingCard
            label="Controlled validation"
            ceiling="CONTROLLED_TEST_VALIDATED"
            detail="Fixture validation is the strongest claim supported here."
          />
          <EvidenceCeilingCard
            label="Website route"
            ceiling="RENDERING_ONLY"
            detail="Website rendering is not proof and does not create proof authority."
            tone="cyan"
          />
          <EvidenceCeilingCard
            label="Promotion gate"
            ceiling="HUMAN_REVIEW_REQUIRED"
            detail="human_review_required remains true before stronger wording."
            tone="blocked"
          />
        </div>
      </section>
    </div>
  );
}
