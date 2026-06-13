import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import GovernanceSavesExplorer from "@components/GovernanceSavesExplorer";
import LinkCard from "@components/LinkCard";
import PageHero from "@components/PageHero";
import SectionHeader from "@components/SectionHeader";
import { ceiling } from "@config/site";
import { governanceSavesSummary } from "@data/governanceSaves";
import { externalLinks } from "@data/navigation";

export const metadata: Metadata = {
  title: "Governance Saves | HawkinsOperations",
  description:
    "Interactive explorer for the public-facing HawkinsOperations Governance Saves subset from GS-001 through GS-080: where merge authority, claim boundaries, runtime gates, validators, AI authority, branch hygiene, evidence protection, release gates, and workflow hardening fired.",
  alternates: {
    canonical: "/proof/governance-saves/",
  },
};

export default function GovernanceSavesPage() {
  return (
    <>
      <PageHero
        title="Governance Saves"
        subtitle={`Where controls fired. Public-facing subset from ${governanceSavesSummary.rangeLabel}.`}
        description={`An interactive record of ${governanceSavesSummary.publicRenderedCount} source-backed governance saves. Each card names the drift attempted, the control that fired, and the reviewer value preserved under the current claim ceiling.`}
        badges={[
          { label: ceiling, tone: "warn" },
          { label: `${governanceSavesSummary.publicRenderedCount} / ${governanceSavesSummary.ledgerRangeTotal} RENDERED` },
          { label: "PUBLIC-FACING SUBSET" },
          { label: "NO_PRODUCTION_SAVE_METRIC", tone: "block" },
        ]}
      />

      <section className="container section-tight">
        <BoundaryNotice
          title="Governance boundary"
          text="Governance Saves are reviewer-grade examples of controls that fired. They do not prove production incident prevention, customer deployment, fleet-wide protection, runtime-active public proof, signal-observed public proof, autonomous SOC authority, or AI-approved disposition."
        />
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader
            title="Governance Saves explorer"
            eyebrow={`Public-facing subset of ${governanceSavesSummary.rangeLabel}`}
            description="Filter by control category, search by ID or surface, and expand rendered records for the attempted drift, the control that fired, and why it matters to a reviewer."
          />
          <GovernanceSavesExplorer />
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader
            title="What this surface does not claim"
            eyebrow="Boundary"
            description="Governance Saves are reviewer examples, not production-impact metrics."
          />
          <div className="grid gap-3 md:grid-cols-2">
            {[
              "No card claims production incident prevention, customer deployment, or fleet-wide protection.",
              `${governanceSavesSummary.privateOnlyCount} private-only rows and ${governanceSavesSummary.omittedIds.length} omitted/demoted source IDs are not rendered here.`,
              "Public-backed examples do not promote runtime-active public proof or signal-observed public proof.",
              "Green checks remain validation evidence, not merge or publication authority.",
            ].map((line) => (
              <article key={line} className="card p-4">
                <p className="text-sm leading-6 text-slate-300">{line}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight pb-24">
        <div className="container">
          <SectionHeader title="Continue inspection" eyebrow="Routes" />
          <div className="grid gap-4 md:grid-cols-4">
            <LinkCard href="/proof/" title="Proof ledger" description="Return to proof authority and current promotion gates." />
            <LinkCard href="/ai-security/" title="AI Security model" description="See how governance saves map to AI Security Operations." />
            <LinkCard href="/claim-firewall/" title="Claim Firewall" description="Inspect the control surface for blocked wording." />
            <LinkCard href={externalLinks.governanceSavesCandidates} title="Governance saves source" description="Open the source-controlled candidate ledger." external />
          </div>
        </div>
      </section>
    </>
  );
}
