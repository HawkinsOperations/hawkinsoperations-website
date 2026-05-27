import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import LinkCard from "@components/LinkCard";
import PageHero from "@components/PageHero";
import SectionHeader from "@components/SectionHeader";
import { attackFamilies, attackMapSafeCopy, cyberKillChainStages } from "@data/attackCoverage";
import { validationRows } from "@data/validationRegistry";
import { externalLinks } from "@data/navigation";

export const metadata: Metadata = {
  title: "Detections | HawkinsOperations",
  description:
    "Detection engineering portfolio for HawkinsOperations: detection IDs, validation status, ATT&CK mapping, proof ceilings, and runtime/public signal boundaries.",
  alternates: {
    canonical: "/detections/",
  },
};

const detectionRows = attackFamilies.flatMap((family) =>
  family.nodes.map((node) => {
    const validation = validationRows.find((row) => row.id === node.id);
    return {
      ...node,
      family: family.family,
      validationState: validation?.status === "pass" ? "Controlled validation passed" : node.validation,
      proofCeiling: validation?.claimCeiling ?? node.ceiling,
      inspectHref:
        node.id === "HO-DET-001"
          ? "/proof/ho-det-001/"
          : node.id === "HO-DET-011" || node.id === "HO-DET-012"
          ? "/proof/runtime-proof-factory/"
          : "/validation/",
    };
  }),
);

const lifecycleSummary = cyberKillChainStages.slice(0, 4);

export default function DetectionsPage() {
  return (
    <>
      <PageHero
        title="Detections"
        subtitle="Detection engineering portfolio with proof boundaries attached."
        description="This page shows the public detection-engineering surface: detection IDs, validation status, ATT&CK mapping where represented, proof ceilings, and runtime/public signal boundaries."
        badges={[
          { label: "DETECTION_ENGINEERING" },
          { label: "CONTROLLED_VALIDATION" },
          { label: "RUNTIME_PUBLIC_CLAIMS_BOUNDED", tone: "block" },
        ]}
      />

      <section className="container section-tight">
        <BoundaryNotice
          title="Detection boundary"
          text="Detection cards show source, validation, mapping, and proof-boundary status. They do not prove production deployment, customer coverage, runtime-active public proof, public signal-observed proof, or autonomous SOC decisions."
        />
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader
            title="Detection cards"
            eyebrow="Portfolio"
            description="Each card keeps validation, proof ceiling, and runtime/signal boundary visible so detection work cannot be over-promoted."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {detectionRows.map((row) => (
              <article key={`${row.family}-${row.id}`} className="card p-5">
                <p className="mono text-xs uppercase text-blue-100">{row.family}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="chip chip-ice">{row.id}</span>
                  <span className="chip chip-quiet">{row.tone.toUpperCase()}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-50">{row.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{row.attack}</p>
                <dl className="mt-4 grid gap-3 text-sm">
                  <div>
                    <dt className="mono text-[0.62rem] uppercase tracking-[0.16em] text-slate-400">Validation</dt>
                    <dd className="mt-1 text-slate-200">{row.validationState}</dd>
                  </div>
                  <div>
                    <dt className="mono text-[0.62rem] uppercase tracking-[0.16em] text-slate-400">Proof ceiling</dt>
                    <dd className="mt-1 text-slate-200">{row.proofCeiling}</dd>
                  </div>
                  <div>
                    <dt className="mono text-[0.62rem] uppercase tracking-[0.16em] text-slate-400">Runtime / signal boundary</dt>
                    <dd className="mt-1 text-slate-300">{row.boundary}</dd>
                  </div>
                </dl>
                <a className="mt-5 inline-flex text-sm text-slate-300 hover:text-blue-100" href={row.inspectHref}>
                  Inspect route →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader
            title="ATT&CK and lifecycle map"
            eyebrow="Mapping"
            description={attackMapSafeCopy}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {lifecycleSummary.map((stage) => (
              <article key={stage.stage} className="card p-5">
                <p className="mono text-xs uppercase text-blue-100">{stage.stage}</p>
                <h3 className="mt-3 text-lg font-semibold text-slate-50">{stage.currentState}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{stage.reviewerInterpretation}</p>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  Strongest reviewer artifact: {stage.strongestArtifact}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight pb-24">
        <div className="container">
          <SectionHeader title="Inspect source" eyebrow="Routes" />
          <div className="grid gap-4 md:grid-cols-3">
            <LinkCard href={externalLinks.detections} title="Detections repo" description="Open source-controlled detection packages." external />
            <LinkCard href="/validation/" title="Validation registry" description="Inspect fixture counts, pass states, and blocked runtime/public signal states." />
            <LinkCard href="/proof/" title="Proof authority" description="Inspect proof records, Governance Saves, and blocked claims." />
          </div>
        </div>
      </section>
    </>
  );
}
