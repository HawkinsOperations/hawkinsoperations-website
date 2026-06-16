import type { Metadata } from "next";
import GovernanceIntelDashboard from "@components/governance/GovernanceIntelDashboard";
import LinkCard from "@components/LinkCard";
import SectionHeader from "@components/SectionHeader";
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
      <section className="cockpit-section">
        <div className="container">
          <GovernanceIntelDashboard />
          <p className="gov-explorer__status mt-4">
            Governance Saves renders a public-facing subset. Private-only records and omitted or
            demoted records are not rendered on this website surface.
          </p>
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader
            title="What this surface does not claim"
            eyebrow="Boundary"
            description="Governance Saves are reviewer examples of controls that fired, not production-impact metrics."
          />
          <div className="grid gap-3 md:grid-cols-2">
            {[
              "No card claims production incident prevention, customer deployment, or fleet-wide protection.",
              "Public-backed examples do not promote runtime-active public proof or signal-observed public proof.",
              "Green checks remain validation evidence, not merge or publication authority.",
              "Outcome impact totals are not_measured unless a source record explicitly supports them.",
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
