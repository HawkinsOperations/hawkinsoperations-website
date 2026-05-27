import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import LinkCard from "@components/LinkCard";
import PageHero from "@components/PageHero";
import PlatformContractBlueprint from "@components/PlatformContractBlueprint";
import SectionHeader from "@components/SectionHeader";
import { externalLinks } from "@data/navigation";
import { platformContracts } from "@data/platformContracts";

const supplementalContracts = [
  {
    title: "Runtime Truth Spine",
    detail: "Private runtime/evidence boundary route. Keep as a pointer only unless public wording is separately approved.",
    boundary: "Private runtime evidence is not public-safe material.",
  },
  {
    title: "Telemetry Coverage Contract v0",
    detail: "Aligns HO-NDR-001 and HO-PIPE-001 as visibility and route-integrity contracts.",
    boundary: "Contract status does not prove live telemetry or public signal proof.",
  },
];

export const metadata: Metadata = {
  title: "Platform Contracts | HawkinsOperations",
  description:
    "Owner route for HawkinsOperations platform contracts, SOAR case packets, Detection Factory Controller, telemetry coverage contracts, and support-only guardrails.",
  alternates: {
    canonical: "/platform/contracts/",
  },
};

export default function PlatformContractsPage() {
  return (
    <>
      <PageHero
        title="Platform contracts"
        subtitle="Guardrails, schemas, samples, verifiers, and blocked authority footers."
        description="This route owns the platform contract wall. Contracts define structure and gates; they do not prove public runtime or signal truth."
        badges={[
          { label: `${platformContracts.length} contracts` },
          { label: "SUPPORT_ONLY" },
          { label: "RUNTIME_SIGNAL_BLOCKED", tone: "block" },
        ]}
      />

      <section className="container section-tight">
        <BoundaryNotice
          title="Platform contract boundary"
          text="Platform contracts are guardrails and support-only structures. They do not prove live SOAR operation, runtime activity, signal observation, model execution, case closure, or disposition authority."
        />
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader
            title="Contract wall"
            eyebrow="Platform owner route"
            description="Each contract keeps its blocked-authority footer visible so support structure cannot become a stronger public claim."
          />
          <PlatformContractBlueprint />
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader title="Supplemental contract pointers" eyebrow="Boundaries" />
          <div className="grid gap-4 md:grid-cols-2">
            {supplementalContracts.map((contract) => (
              <article key={contract.title} className="card p-5">
                <p className="mono text-xs uppercase text-blue-100">Contract pointer</p>
                <h2 className="mt-3 text-xl font-semibold text-slate-50">{contract.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{contract.detail}</p>
                <p className="mt-3 text-xs leading-5 text-rose-100">{contract.boundary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight pb-24">
        <div className="container">
          <SectionHeader title="Continue inspection" eyebrow="Routes" />
          <div className="grid gap-4 md:grid-cols-3">
            <LinkCard href="/pipeline/" title="Operational pipeline" description="See where platform guardrails sit in the workflow." />
            <LinkCard href="/proof/runtime-proof-factory/" title="Runtime Proof Factory" description="Inspect bounded runtime summaries without promoting public runtime proof." />
            <LinkCard href={externalLinks.platform} title="Platform repo" description="Open the source-controlled platform repository." external />
          </div>
        </div>
      </section>
    </>
  );
}
