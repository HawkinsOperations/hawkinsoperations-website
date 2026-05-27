import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import LinkCard from "@components/LinkCard";
import PageHero from "@components/PageHero";
import PipelineGateCards from "@components/PipelineGateCards";
import PipelineGateFlow from "@components/PipelineGateFlow";
import ReceiptLedgerTimeline from "@components/ReceiptLedgerTimeline";
import SectionHeader from "@components/SectionHeader";
import { ceiling } from "@config/site";

export const metadata: Metadata = {
  title: "Pipeline | HawkinsOperations",
  description:
    "Operational flow route for HawkinsOperations: source change, pull request, checks, fixtures, validators, proof record, human review, and public rendering.",
  alternates: {
    canonical: "/pipeline/",
  },
};

export default function PipelinePage() {
  return (
    <>
      <PageHero
        title="Pipeline"
        subtitle="Operational flow from source change to public rendering."
        description="This parent page owns the gate sequence only. Full validation, proof-pack, and platform-contract details now live on their owner routes."
        badges={[
          { label: ceiling, tone: "warn" },
          { label: "HUMAN_REVIEW_REQUIRED" },
          { label: "GREEN_CI_NOT_AUTHORITY", tone: "block" },
        ]}
      />

      <section className="container section-tight">
        <BoundaryNotice
          title="Pipeline boundary"
          text="Pipeline gates produce scoped validation and routing receipts. They do not prove runtime activity, signal observation, public proof promotion, or merge authority."
        />
      </section>

      <section id="pipeline-flow" className="cockpit-section--tight">
        <div className="container">
          <SectionHeader
            title="Source to rendered route"
            eyebrow="Operational flow"
            description="A change moves through source, review, controlled fixtures, validators, scanners, proof record, human review, and public rendering."
          />
          <PipelineGateFlow />
        </div>
      </section>

      <section id="pipeline-gates" className="cockpit-section--tight">
        <div className="container">
          <SectionHeader
            title="Gates and responsibilities"
            eyebrow="Checks"
            description="Checks can fail a change, but green checks are not human governance or proof authority."
          />
          <PipelineGateCards />
        </div>
      </section>

      <section id="receipt-lane" className="cockpit-section--tight pb-24">
        <div className="container">
          <SectionHeader
            title="Receipt dependencies"
            eyebrow="Owner routes"
            description="Deep registries and contract details moved out of the pipeline parent page."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <LinkCard href="/validation/" title="Validation registry" description="Controlled-test packages, fixture counts, and validation boundaries." />
            <LinkCard href="/proof/" title="Proof ledger" description="Public ceiling, proof records, supported claims, and blocked claims." />
            <LinkCard href="/proof/proof-pack-001/" title="Proof Pack 001" description="Release route, manifest, checksum, and included/excluded boundaries." />
            <LinkCard href="/platform/contracts/" title="Platform contracts" description="Support-only guardrails, schemas, samples, verifiers, and blocked authority." />
          </div>
          <div className="mt-8">
            <ReceiptLedgerTimeline />
          </div>
        </div>
      </section>
    </>
  );
}
