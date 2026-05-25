import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import CaseFileHeader from "@components/CaseFileHeader";
import ClaimFirewallPanel from "@components/ClaimFirewallPanel";
import LinkCard from "@components/LinkCard";
import ProofPathTimeline, { type ProofPathStep } from "@components/ProofPathTimeline";
import SectionHeader from "@components/SectionHeader";
import StatusConsole from "@components/StatusConsole";
import { externalLinks } from "@data/navigation";
import { flagshipProofRecord as record } from "@data/proofRecords";

export const metadata: Metadata = {
  title: "HO-DET-001 | HawkinsOps",
  description:
    "HO-DET-001 case file preserving the CONTROLLED_TEST_VALIDATED proof ceiling and public claim boundary.",
  alternates: {
    canonical: "/proof/ho-det-001/",
  },
};

const traceSteps: ProofPathStep[] = [
  {
    code: "SOURCE_PRESENT",
    label: "Source present",
    line: "Detection rule and SPL exist in hawkinsoperations-detections under version control.",
    href: externalLinks.detections,
    external: true,
  },
  {
    code: "FIXTURE_VALIDATED",
    label: "Fixture validated",
    line: "Controlled positive and negative test cases pass in the validation repo.",
    href: externalLinks.validationReportHo,
    external: true,
  },
  {
    code: "CASE_PACKET_ROUTED",
    label: "Case packet routed",
    line: "Findings, validation output, and reviewer wording assembled into the case file you are reading.",
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
    line: "Blocked-claim scanner and site contract verifier pass before wording can ship.",
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

export default function HoDet001CaseFilePage() {
  return (
    <>
      <CaseFileHeader record={record} />

      <section className="container cockpit-section--tight">
        <BoundaryNotice text="HO-DET-001 remains at CONTROLLED_TEST_VALIDATED. Website rendering is not proof." />
      </section>

      <section className="cockpit-section--tight">
        <div className="container grid gap-6 lg:grid-cols-[1.4fr_0.9fr] items-start">
          <ProofPathTimeline detectionId={record.detectionId} title="HO-DET-001 · source to public boundary" steps={traceSteps} />
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
          <SectionHeader title="What exists, what passed, what is not claimed" eyebrow="Case file" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="moon-panel" style={{ padding: 22 }}>
              <p className="cockpit-eyebrow">What exists</p>
              <ul className="mt-3 space-y-3 text-sm leading-6" style={{ color: "var(--silver)" }}>
                {record.exists.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="moon-panel" style={{ padding: 22 }}>
              <p className="cockpit-eyebrow">What passed</p>
              <ul className="mt-3 space-y-3 text-sm leading-6" style={{ color: "var(--silver)" }}>
                {record.passed.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </article>
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
