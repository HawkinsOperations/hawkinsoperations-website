import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import CaseFileHeader from "@components/CaseFileHeader";
import LinkCard from "@components/LinkCard";
import SectionHeader from "@components/SectionHeader";
import StatusCard from "@components/StatusCard";
import { externalLinks } from "@data/navigation";
import { flagshipProofRecord as record } from "@data/proofRecords";

export const metadata: Metadata = {
  title: "HO-DET-001 Case File | HawkinsOperations",
  description:
    "HO-DET-001 case file preserving the CONTROLLED_TEST_VALIDATED proof ceiling and public claim boundary.",
};

export default function HoDet001CaseFilePage() {
  return (
    <>
      <CaseFileHeader record={record} />
      <section className="container section-tight">
        <BoundaryNotice text="HO-DET-001 remains at CONTROLLED_TEST_VALIDATED. Website rendering is not proof." />
      </section>
      <section className="container section">
        <SectionHeader title="Current state" eyebrow="Case file" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatusCard label="Proof level" value={record.proofLevel} tone="warn" dataTarget="proof-ceiling" />
          <StatusCard label="Validation" value={record.validationState} dataTarget="validation-status" />
          <StatusCard label="Runtime" value={record.runtimeState} tone="block" />
          <StatusCard label="Signal" value={record.signalState} tone="block" />
        </div>
      </section>
      <section className="container section">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="card p-6">
            <h2 className="text-2xl font-semibold text-slate-50">What exists</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-400">
              {record.exists.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card p-6">
            <h2 className="text-2xl font-semibold text-slate-50">What passed</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-400">
              {record.passed.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card p-6">
            <h2 className="text-2xl font-semibold text-slate-50">What is not claimed</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-400">
              {record.notClaimed.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card p-6">
            <h2 className="text-2xl font-semibold text-slate-50">What remains blocked</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-400">
              {record.remainingBlocked.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
      <section className="container section">
        <SectionHeader title="Promotion requirements" eyebrow="Before stronger public wording" />
        <ul className="grid gap-3 md:grid-cols-2">
          {record.promotionRequirements.map((item, i) => (
            <li key={i} className="card p-4 text-sm leading-6 text-slate-300">
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="container section">
        <SectionHeader title="Related links" eyebrow="Evidence routes" />
        <div className="grid gap-4 md:grid-cols-3">
          <LinkCard
            href={externalLinks.proofRecord}
            title="Proof record"
            description="The canonical public proof record route for HO-DET-001."
            external
          />
          <LinkCard
            href={externalLinks.detections}
            title="Source repo"
            description="Detection source candidates. Source presence does not prove runtime."
            external
          />
          <LinkCard href="/controls/" title="Claim firewall" description="Blocked terms and promotion requirements." />
        </div>
      </section>
    </>
  );
}
