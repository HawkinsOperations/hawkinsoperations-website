import type { Metadata } from "next";
import DetectionInventoryCockpit from "@components/detections/DetectionInventoryCockpit";
import DetectionOpsCockpit from "@components/detections/DetectionOpsCockpit";
import LinkCard from "@components/LinkCard";
import SectionHeader from "@components/SectionHeader";
import {
  BlockedClaimGrid,
  ClaimBoundaryPanel,
  EvidenceCeilingCard,
  ProofOpsPageHero,
  SignalBlockedBadge,
} from "@components/proofops";
import { EvidencePathTimeline, StageStatusChart } from "@components/visual-intelligence";
import { attackFamilies, attackMapSafeCopy, cyberKillChainStages } from "@data/attackCoverage";
import { externalLinks } from "@data/navigation";
import { validationRows } from "@data/validationRegistry";

export const metadata: Metadata = {
  title: "Detections | HawkinsOperations",
  description:
    "Detection source, validation, proof ceilings, ATT&CK mapping, and bounded claim surfaces for HawkinsOperations.",
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

const flagship = detectionRows.find((row) => row.id === "HO-DET-001");
const lifecycleSummary = cyberKillChainStages.slice(0, 4);

const lifecycle = [
  {
    label: "Source",
    title: "Detection source",
    detail: "Rule and status metadata stay on the detection source surface.",
  },
  {
    label: "Validation",
    title: "Controlled fixtures",
    detail: "Fixture results define the current behavior truth.",
  },
  {
    label: "Proof ceiling",
    title: "Evidence cap",
    detail: "The page displays the ceiling; it does not raise it.",
  },
  {
    label: "Claim boundary",
    title: "Blocked wording",
    detail: "Runtime, signal, public release, production, and customer claims stay blocked.",
  },
];

const blockedClaims = [
  "runtime-active status",
  "runtime proven status",
  "signal observed status",
  "public-safe proof",
  "production-ready status",
  "SOCaaS-ready status",
  "customer deployed status",
  "public runtime proof",
  "public signal proof",
];

export default function DetectionsPage() {
  return (
    <div className="proofops-page">
      <section className="proofops-section">
        <div className="container">
          <DetectionOpsCockpit />
        </div>
      </section>

      <ProofOpsPageHero
        eyebrow="Detection source to claim boundary"
        title="Detections"
        accent="with ceilings"
        subtitle="Detection work is useful only when its source, validation, ceiling, and blocked claims travel together."
        description="This route makes the detection lifecycle easier to scan while preserving the same proof boundaries: source truth, behavior truth, proof authority, and website rendering remain separate."
        metrics={[
          { label: "Portfolio", value: `${detectionRows.length} cards`, tone: "cyan" },
          { label: "Flagship", value: "HO-DET-001", tone: "amber" },
          { label: "Ceiling shown", value: "per artifact", tone: "green" },
          { label: "Runtime / signal", value: "not promoted", tone: "blocked" },
        ]}
      >
        <p className="proofops-kicker">Lifecycle strip</p>
        <ol className="proofops-lifecycle" aria-label="Detection lifecycle">
          {lifecycle.map((step) => (
            <li key={step.label}>
              <span>{step.label}</span>
              <strong>{step.title}</strong>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
      </ProofOpsPageHero>

      <section className="proofops-section">
        <div className="container">
          <DetectionInventoryCockpit />
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <ClaimBoundaryPanel
            title="Detection rendering keeps the claim boundary visible."
            description="Detection cards show source, validation, mapping, and proof-boundary status. They do not create deployment, signal, or public proof."
            boundaries={[
              { label: "Source truth", value: "hawkinsoperations-detections", tone: "cyan" },
              { label: "Behavior truth", value: "hawkinsoperations-validation", tone: "cyan" },
              { label: "Proof authority", value: "hawkinsoperations-proof", tone: "amber" },
              { label: "Website", value: "rendering only", tone: "neutral" },
            ]}
          />
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <SectionHeader
            title="Detection lifecycle feeds Hoxline"
            eyebrow="Source truth into claim control"
            description="Detection source and controlled validation can feed the Hoxline loop, but the runtime and signal gates remain separate until evidence exists."
          />
          <div className="vi-grid-2">
            <StageStatusChart />
            <EvidencePathTimeline />
          </div>
        </div>
      </section>

      {flagship && (
        <section className="proofops-section">
          <div className="container">
            <article className="proofops-flagship">
              <div className="proofops-flagship__grid">
                <div>
                  <p className="proofops-kicker">Flagship controlled-validation example</p>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-50 md:text-4xl">
                    {flagship.id}: {flagship.title}
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{flagship.attack}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <SignalBlockedBadge label="runtime not promoted" />
                    <SignalBlockedBadge label="signal not promoted" />
                    <SignalBlockedBadge label="public_safe false" />
                  </div>
                </div>
                <div className="proofops-grid-2">
                  <EvidenceCeilingCard
                    label="Validation"
                    ceiling={flagship.validationState}
                    detail="Controlled fixture status remains distinct from runtime or signal proof."
                    tone="green"
                  />
                  <EvidenceCeilingCard
                    label="Proof ceiling"
                    ceiling={flagship.proofCeiling}
                    detail={flagship.boundary}
                    tone="amber"
                  />
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <LinkCard href="/hoxline/" title="Hoxline ProofOps route" description="Inspect the Hoxline loop that governs the claim boundary." />
                <LinkCard href="/proof/ho-det-001/" title="HO-DET-001 route" description="Open the existing bounded reviewer case-file route." />
                <LinkCard href="/validation/" title="Validation registry" description="Inspect controlled fixtures and validation status." />
              </div>
            </article>
          </div>
        </section>
      )}

      <section className="proofops-section">
        <div className="container">
          <SectionHeader
            title="Detection systems"
            eyebrow="Source -> validation -> proof ceiling"
            description="Each card keeps source, validation, proof ceiling, and runtime/signal boundary visible so detection work cannot be over-promoted."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {detectionRows.map((row) => (
              <article key={`${row.family}-${row.id}`} className="proofops-card">
                <p className="proofops-kicker">{row.family}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="chip chip-ice">{row.id}</span>
                  <span className="chip chip-quiet">{row.tone.toUpperCase()}</span>
                </div>
                <h3>{row.title}</h3>
                <p>{row.attack}</p>
                <dl className="mt-4 grid gap-3 text-sm">
                  <div>
                    <dt className="mono text-[0.62rem] uppercase text-slate-400">Validation</dt>
                    <dd className="mt-1 text-slate-200">{row.validationState}</dd>
                  </div>
                  <div>
                    <dt className="mono text-[0.62rem] uppercase text-slate-400">Proof ceiling</dt>
                    <dd className="mt-1 text-slate-200">{row.proofCeiling}</dd>
                  </div>
                  <div>
                    <dt className="mono text-[0.62rem] uppercase text-slate-400">Runtime / signal boundary</dt>
                    <dd className="mt-1 text-slate-300">{row.boundary}</dd>
                  </div>
                </dl>
                <a className="mt-5 inline-flex text-sm text-slate-300 hover:text-blue-100" href={row.inspectHref}>
                  Inspect route -&gt;
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <SectionHeader title="What remains blocked" eyebrow="Claim boundary" />
          <BlockedClaimGrid claims={blockedClaims} />
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <SectionHeader
            title="ATT&CK and lifecycle map"
            eyebrow="Mapping"
            description={attackMapSafeCopy}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {lifecycleSummary.map((stage) => (
              <article key={stage.stage} className="proofops-card">
                <p className="proofops-kicker">{stage.stage}</p>
                <h3>{stage.currentState}</h3>
                <p>{stage.reviewerInterpretation}</p>
                <p>Strongest reviewer artifact: {stage.strongestArtifact}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="proofops-section pb-24">
        <div className="container">
          <SectionHeader title="Inspect source" eyebrow="Routes" />
          <div className="grid gap-4 md:grid-cols-3">
            <LinkCard href={externalLinks.detections} title="Detections repo" description="Open source-controlled detection packages." external />
            <LinkCard href="/validation/" title="Validation registry" description="Inspect fixture counts, pass states, and blocked runtime/public signal states." />
            <LinkCard href="/proof/" title="Proof authority" description="Inspect proof records, Governance Saves, and blocked claims." />
          </div>
        </div>
      </section>
    </div>
  );
}
