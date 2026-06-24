import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import CaseFileHeader from "@components/CaseFileHeader";
import ClaimFirewallPanel from "@components/ClaimFirewallPanel";
import LinkCard from "@components/LinkCard";
import ProofPathTimeline, { type ProofPathStep } from "@components/ProofPathTimeline";
import SectionHeader from "@components/SectionHeader";
import SocaasWorkflowFlow from "@components/SocaasWorkflowFlow";
import StatusConsole from "@components/StatusConsole";
import { externalLinks } from "@data/navigation";
import { flagshipProofRecord as record } from "@data/proofRecords";

export const metadata: Metadata = {
  title: "HO-DET-001 | HawkinsOperations",
  description:
    "HO-DET-001 case file preserving the CONTROLLED_TEST_VALIDATED proof ceiling and public claim boundary.",
  alternates: {
    canonical: "/proof/ho-det-001/",
  },
};

const traceSteps: ProofPathStep[] = [
  {
    code: "SOURCE_PRESENT",
    label: "Detection source",
    line: "HO-DET-001 source is reviewable as Suspicious PowerShell EncodedCommand detection material.",
    href: externalLinks.detections,
    external: true,
  },
  {
    code: "ALERT_SHAPE",
    label: "Alert shape",
    line: "The receipt describes endpoint process context and expected fixture behavior without exposing raw runtime evidence.",
    href: "/proof/ho-det-001/",
  },
  {
    code: "CONTROLLED_VALIDATION",
    label: "Controlled validation",
    line: "Fourteen positive and negative fixtures define the controlled-test validation boundary.",
    href: externalLinks.validationReportHo,
    external: true,
  },
  {
    code: "CASE_PACKET_CONTRACT",
    label: "Case packet contract",
    line: "Case packet workflow routes source facts, validation status, blocked actions, and support-only review fields.",
    href: "/platform/contracts/",
  },
  {
    code: "AI_SUPPORT_ONLY",
    label: "AI support only",
    line: "AI accelerates labor: drafting, scaffolding, reviewer prep. AI does not promote claims.",
    href: "/ai-security/",
  },
  {
    code: "HUMAN_REVIEW_GATE",
    label: "Human review gate",
    line: "Human review authorizes any stronger claim movement; green checks and rendering do not.",
    href: "/claim-firewall/",
  },
  {
    code: "PROOF_AUTHORITY",
    label: "Proof authority",
    line: "Proof record and validation artifacts own the current ceiling; this website is only the route.",
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

const receiptSections = [
  { title: "Detection source", items: record.detectionSource ?? [] },
  { title: "Alert shape", items: record.alertShape ?? [] },
  { title: "Controlled validation", items: record.passed },
  { title: "Case packet / workflow contract", items: record.workflowContract ?? [] },
  { title: "Proof authority", items: record.proofAuthority ?? [] },
  { title: "AI support boundary", items: record.aiSupportBoundary ?? [] },
  { title: "Human review gate", items: record.humanReviewGate ?? [] },
  { title: "Blocked claims", items: record.notClaimed },
];

export default function HoDet001CaseFilePage() {
  return (
    <>
      <CaseFileHeader record={record} />

      <section className="container cockpit-section--tight">
        <BoundaryNotice text="HO-DET-001 remains at CONTROLLED_TEST_VALIDATED. Website rendering is not proof." />
      </section>

      <section className="cockpit-section--tight">
        <div className="container grid gap-6 lg:grid-cols-[1.4fr_0.9fr] items-start">
          <ProofPathTimeline detectionId={record.detectionId} title="Controlled Validation Receipt · source to public boundary" steps={traceSteps} />
          <StatusConsole
            rows={[
              { tone: "ice", label: "Proof level", value: record.proofLevel },
              { tone: "primary", label: "Validation", value: record.validationState },
              { tone: "quiet", label: "Runtime", value: record.runtimeState },
              { tone: "quiet", label: "Signal", value: record.signalState },
              { tone: "quiet", label: "Public-safe", value: record.publicSafeState },
            ]}
            footer="Website rendering is not proof. Open the proof repo record for evidence."
          />
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader
            title={record.receiptTitle ?? "HO-DET-001 receipt"}
            eyebrow="Controlled Validation Receipt"
            description={record.receiptSummary}
          />
          <div className="mt-6 grid gap-4 lg:grid-cols-4">
            {receiptSections.map((section) => (
              <article key={section.title} className="moon-panel" style={{ padding: 20 }}>
                <p className="cockpit-eyebrow">{section.title}</p>
                <ul className="mt-3 space-y-3 text-sm leading-6" style={{ color: "var(--silver)" }}>
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader
            title="Workflow contract"
            eyebrow="SOC workflow pilot loop"
            description="The flow is visualized as source, validation, case packet, support-only AI, human review, and proof-controlled reporting. Each stage keeps its own authority boundary."
          />
          <div className="mt-6">
            <SocaasWorkflowFlow />
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <ClaimFirewallPanel
            title="What HO-DET-001 does not claim"
            line="The receipts above support the bounded ceiling. The terms below are blocked from this case file unless a separate evidence-backed promotion changes their state."
          />
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader title="Promotion requirements" eyebrow="Before stronger public wording" />
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {record.promotionRequirements.map((item, i) => (
              <li key={i} className="moon-panel" style={{ padding: 16, color: "var(--silver)", fontSize: "0.86rem", lineHeight: 1.5 }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader title="Related links" eyebrow="Evidence routes" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <LinkCard href={externalLinks.proofPack001Release} title="Proof Pack 001 release" description="Official GitHub Release for the bounded HO-DET-001 reviewer ZIP. Stronger public proof status remains blocked." external />
            <LinkCard href={externalLinks.proofRecord} title="Proof record" description="The canonical public proof record route for HO-DET-001." external />
            <LinkCard href={externalLinks.detections} title="Source repo" description="Detection source candidates. Source presence does not prove runtime." external />
          </div>
        </div>
      </section>
    </>
  );
}
