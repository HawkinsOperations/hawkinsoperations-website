import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import LinkCard from "@components/LinkCard";
import PageHero from "@components/PageHero";
import SectionHeader from "@components/SectionHeader";
import { ceiling } from "@config/site";
import { proofRecords } from "@data/proofRecords";
import { externalLinks } from "@data/navigation";

const runtimeRecords = proofRecords.filter((record) =>
  ["HO-DET-011", "HO-DET-012"].includes(record.detectionId),
);

export const metadata: Metadata = {
  title: "Runtime Proof Factory | HawkinsOperations",
  description:
    "Owner route for Runtime Proof Factory v0 bounded summaries for HO-DET-011 and HO-DET-012 with raw evidence excluded and public runtime proof blocked.",
  alternates: {
    canonical: "/proof/runtime-proof-factory/",
  },
};

export default function RuntimeProofFactoryPage() {
  return (
    <>
      <PageHero
        title="Runtime Proof Factory v0"
        subtitle="Bounded summaries for private lab runtime receipts."
        description="This route summarizes HO-DET-011 and HO-DET-012 without exposing private material or promoting public runtime or signal proof."
        badges={[
          { label: ceiling, tone: "warn" },
          { label: "RAW_EVIDENCE_PRIVATE", tone: "block" },
          { label: "SPLUNK_NOT_VERIFIED", tone: "block" },
          { label: "PUBLIC_RUNTIME_PROOF_BLOCKED", tone: "block" },
        ]}
      />

      <section className="container section-tight">
        <BoundaryNotice
          title="Runtime boundary"
          text="These are bounded private lab runtime receipt summaries. Raw evidence remains private. Public runtime proof and public signal-observed proof remain blocked."
        />
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader
            title="Bounded runtime summaries"
            eyebrow="Runtime Proof Factory"
            description="The website may render bounded summaries already represented in site data. It must not publish raw material or imply production, fleet, autonomous SOC, AI-approved, or analyst-approved claims."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {runtimeRecords.map((record) => (
              <article key={record.detectionId} className="proof-receipt-panel">
                <header className="proof-receipt-panel__head">
                  <div className="proof-receipt-panel__head-left">
                    <span className="mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--ice-blue)]">Detection ID</span>
                    <h2 className="proof-receipt-panel__id">{record.detectionId}</h2>
                    <p className="proof-receipt-panel__sub">{record.title}</p>
                  </div>
                  <div className="proof-receipt-panel__head-right">
                    <span className="mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--silver)]">Ceiling</span>
                    <span className="proof-receipt-panel__ceiling mono">{record.proofLevel}</span>
                  </div>
                </header>

                <dl className="proof-receipt-panel__cells">
                  <div className="proof-receipt-panel__cell">
                    <dt className="mono">Validation</dt>
                    <dd className="proof-receipt-panel__cell-strong">{record.validationState}</dd>
                  </div>
                  <div className="proof-receipt-panel__cell">
                    <dt className="mono">Runtime</dt>
                    <dd className="proof-receipt-panel__cell-block">private lab runtime receipt summary</dd>
                  </div>
                  <div className="proof-receipt-panel__cell">
                    <dt className="mono">Signal</dt>
                    <dd className="proof-receipt-panel__cell-block">public signal-observed proof blocked</dd>
                  </div>
                  <div className="proof-receipt-panel__cell">
                    <dt className="mono">Splunk</dt>
                    <dd className="proof-receipt-panel__cell-block">NOT_VERIFIED</dd>
                  </div>
                </dl>

                <div className="grid gap-4 p-5 md:grid-cols-2">
                  <div>
                    <p className="mono text-xs uppercase text-blue-100">What exists</p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                      {record.exists.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mono text-xs uppercase text-rose-200">Not claimed</p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                      {record.notClaimed.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight pb-24">
        <div className="container">
          <SectionHeader title="Continue inspection" eyebrow="Routes" />
          <div className="grid gap-4 md:grid-cols-3">
            <LinkCard href="/proof/" title="Proof ledger" description="Return to current proof authority and promotion gates." />
            <LinkCard href="/validation/" title="Validation registry" description="Inspect the controlled-test packages behind the summaries." />
            <LinkCard href={externalLinks.proof} title="Proof repo" description="Open the proof repository for source-controlled proof records." external />
          </div>
        </div>
      </section>
    </>
  );
}
