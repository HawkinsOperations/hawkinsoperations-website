import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import ClosedLoopFlow from "@components/ClosedLoopFlow";
import LinkCard from "@components/LinkCard";
import PageHero from "@components/PageHero";
import RuntimeBoundaryLadder from "@components/RuntimeBoundaryLadder";
import SectionHeader from "@components/SectionHeader";
import SocaasWorkflowFlow from "@components/SocaasWorkflowFlow";
import { ceiling } from "@config/site";
import { externalLinks } from "@data/navigation";
import { proofPack } from "@data/proofPackManifest";
import { registryStats } from "@data/validationRegistry";

const whatTransfers = [
  {
    title: "Source-controlled detections",
    detail: "Rule logic, ATT&CK mapping, status metadata, and review history are version-controlled and auditable.",
  },
  {
    title: "Deterministic verifiers",
    detail: "Validation packages, schema checks, and claim-boundary scanners fail closed before merge.",
  },
  {
    title: "Case-packet structure",
    detail: "SOAR-shaped case packets with support-only AI fields, blocked actions, and dry-run defaults.",
  },
  {
    title: "Human review authority",
    detail: "Visible reviewer + MERGE_APPROVED sits above CI, above AI output, above implementation momentum.",
  },
  {
    title: "Claim ceiling discipline",
    detail: "Scanners + record boundaries + record-is-not-rendering rule keep public copy below evidence ceilings.",
  },
  {
    title: "Governance saves discipline",
    detail: "The public-facing Governance Saves subset models what \"controls fired\" looks like across merge, claim, runtime, evidence, and validator surfaces.",
  },
];

const reviewerSurfaces = [
  {
    href: "/proof/proof-pack-001/",
    title: "Proof Pack 001",
    description: `${proofPack.id} routes a bounded HO-DET-001 reviewer package at ${proofPack.ceiling}.`,
  },
  {
    href: "/proof/governance-saves/",
    title: "Governance Saves explorer",
    description: "Public-facing subset: what was blocked, what control fired, why it matters.",
  },
  {
    href: "/validation/",
    title: "Validation registry",
    description: `${registryStats.passedPackages} controlled-test validation packages and ${registryStats.totalFixtures} fixtures with blocked runtime / signal states.`,
  },
  {
    href: "/platform/contracts/",
    title: "Platform contracts",
    description: "SOAR case packet, controller, support-only triage, and blocked authority footers.",
  },
];

const blockedClaims = [
  "HawkinsOperations is not presented as a production SOCaaS platform.",
  "Customer validation, partner endorsement, and live enterprise deployment are not claimed.",
  "Runtime-active public proof and signal-observed public proof remain blocked unless separately proven and approved.",
  "AI-approved disposition, autonomous SOC, and analyst-approved-by-AI wording remain blocked.",
];

export const metadata: Metadata = {
  title: "SOCaaS / AI Security Operations | HawkinsOperations",
  description:
    "A governed implementation model for AI-assisted detection engineering and security operations. Detection → validation → case packet → verifier → proof → reviewer surface, under a published claim ceiling.",
  alternates: {
    canonical: "/socaas-ai-security-operations/",
  },
};

export default function SocaasAiSecurityOperationsPage() {
  return (
    <>
      <PageHero
        title="SOCaaS / AI Security Operations"
        subtitle="A governed implementation model for AI-assisted detection engineering."
        description="HawkinsOperations demonstrates a transferable SOCaaS-style implementation model: governed detection engineering, deterministic validation, support-only AI triage, human review authority, and proof-controlled reporting under a published claim ceiling."
        badges={[
          { label: ceiling, tone: "warn" },
          { label: "AI_SUPPORT_ONLY" },
          { label: "HUMAN_AUTHORITY_REQUIRED" },
          { label: "PRODUCTION_CLAIM_BLOCKED", tone: "block" },
        ]}
      />

      <section className="container section-tight">
        <BoundaryNotice
          title="SOCaaS boundary"
          text="This is an implementation model and reviewer route. It does not claim production SOCaaS availability, customer validation, partner endorsement, runtime-active public proof, signal-observed public proof, or autonomous SOC authority."
        />
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader
            title="Workflow: source → reviewer surface"
            eyebrow="Implementation flow"
            description="Each stage owns a distinct truth. AI supports labor; verifiers gate evidence; humans authorize claims. The ceiling stays published."
          />
          <SocaasWorkflowFlow />
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader
            title="Closed-loop detection → proof"
            eyebrow="Closed loop"
            description="A repo-visible loop reviewers can trace end-to-end. Runtime/signal/production promotion sits outside this loop on purpose."
          />
          <ClosedLoopFlow />
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader
            title="Runtime proof boundary"
            eyebrow="Claim ladder"
            description="Where each level of runtime claim sits. Controlled validation is real. Public runtime proof is not promoted until the gate fires."
          />
          <RuntimeBoundaryLadder />
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader
            title="What transfers to a SOC"
            eyebrow="Transferable model"
            description="Each item is repo-visible discipline that maps to real security operations work without requiring HawkinsOperations infrastructure."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {whatTransfers.map((item) => (
              <article key={item.title} className="card p-5">
                <p className="mono text-xs uppercase text-blue-100">Transfers</p>
                <h3 className="mt-3 text-lg font-semibold text-slate-50">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader
            title="Reviewer inspection path"
            eyebrow="Evidence routes"
            description="Start with the strongest bounded reviewer package, then inspect validation, platform contracts, and the governance saves explorer."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {reviewerSurfaces.map((surface) => (
              <LinkCard key={surface.href} href={surface.href} title={surface.title} description={surface.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader title="What remains blocked" eyebrow="Claim ceiling" />
          <div className="grid gap-3 md:grid-cols-2">
            {blockedClaims.map((claim) => (
              <article key={claim} className="card p-4">
                <p className="text-sm leading-6 text-slate-300">{claim}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight pb-24">
        <div className="container">
          <SectionHeader title="Source-controlled context" eyebrow="Repos" />
          <div className="grid gap-4 md:grid-cols-3">
            <LinkCard href={externalLinks.reproducibleReviewerPath} title="Reproducible reviewer path" description="Clone-runnable route through all six repos without private runtime access." external />
            <LinkCard href={externalLinks.orgRequiredChecksMatrix} title="Required checks matrix" description="Observed checks, report-only controls, and website rendering boundaries." external />
            <LinkCard href={externalLinks.platformDetectionFactoryController} title="Detection Factory Controller v0" description="Bounded reviewer status and plan emitter; platform visibility, not proof promotion." external />
          </div>
        </div>
      </section>
    </>
  );
}
