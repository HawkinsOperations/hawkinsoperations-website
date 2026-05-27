import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import LinkCard from "@components/LinkCard";
import PageHero from "@components/PageHero";
import ProofManifestConsole from "@components/ProofManifestConsole";
import SectionHeader from "@components/SectionHeader";
import {
  checksumManifest,
  proofPack,
  proofPackDoesNotProve,
  releaseRouteCaveat,
  reviewerPacket,
  verifierBoundary,
  verifierGroups,
} from "@data/proofPackManifest";
import { externalLinks } from "@data/navigation";

export const metadata: Metadata = {
  title: "Proof Pack 001 | HawkinsOperations",
  description:
    "Owner route for Proof Pack 001 release routing, included and excluded package contents, checksum status, and proof ceiling boundaries.",
  alternates: {
    canonical: "/proof/proof-pack-001/",
  },
};

export default function ProofPack001Page() {
  return (
    <>
      <PageHero
        title="Proof Pack 001"
        subtitle="Released reviewer package at the current public ceiling."
        description="This route owns the release route, manifest, checksum reference, included and excluded items, and the claims the package does not prove."
        badges={[
          { label: proofPack.ceiling, tone: "warn" },
          { label: proofPack.reviewerPackage },
          { label: proofPack.rawRuntimeEvidence, tone: "block" },
          { label: "PUBLIC_RUNTIME_PROOF_BLOCKED", tone: "block" },
        ]}
      />

      <section className="container section-tight">
        <BoundaryNotice
          title="Proof pack boundary"
          text="Proof Pack 001 is a bounded reviewer packet. It does not raise the proof ceiling and does not prove runtime activity, signal observation, production use, or public-safe runtime proof."
        />
      </section>

      <section className="cockpit-section--tight">
        <div className="container grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <ProofManifestConsole />
          <div className="grid gap-4">
            <article className="card p-5">
              <p className="mono text-xs uppercase text-blue-100">{reviewerPacket.name}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{reviewerPacket.scope}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {reviewerPacket.evidenceChain.map((item) => (
                  <span key={item} className="p2-badge">{item}</span>
                ))}
              </div>
            </article>
            <article className="card p-5">
              <p className="mono text-xs uppercase text-blue-100">{checksumManifest.name}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{checksumManifest.scope}</p>
              <p className="mt-3 text-xs leading-5 text-slate-400">{checksumManifest.doesNotProve}</p>
              <p className="mono mt-4 break-all text-xs text-slate-300">ZIP SHA256: {proofPack.zipSha256}</p>
            </article>
            <article className="card p-5">
              <p className="mono text-xs uppercase text-blue-100">Release caveat</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{releaseRouteCaveat.note}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {releaseRouteCaveat.badges.map((badge) => (
                  <span key={badge} className="p2-badge">{badge}</span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader title="What the package does not prove" eyebrow="Boundary ledger" />
          <div className="grid gap-3 md:grid-cols-2">
            {proofPackDoesNotProve.map((line) => (
              <article key={line} className="card p-4">
                <p className="text-sm leading-6 text-slate-300">{line}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader title="Verifier route" eyebrow="Checks" description={verifierBoundary} />
          <div className="grid gap-4 md:grid-cols-3">
            {verifierGroups.map((group) => (
              <article key={group.group} className="card p-5">
                <p className="mono text-xs uppercase text-blue-100">{group.group}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{group.blurb}</p>
                <ul className="mt-4 space-y-2 text-xs leading-5 text-slate-400">
                  {group.scripts.map((script) => (
                    <li key={script} className="mono">{script}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight pb-24">
        <div className="container">
          <SectionHeader title="Continue inspection" eyebrow="Routes" />
          <div className="grid gap-4 md:grid-cols-3">
            <LinkCard href={externalLinks.proofPack001Release} title="Official release" description="Open the GitHub release route for Proof Pack 001." external />
            <LinkCard href="/proof/" title="Proof ledger" description="Return to proof authority and the current claim ledger." />
            <LinkCard href="/proof/ho-det-001/" title="HO-DET-001 case file" description="Inspect the flagship bounded proof route." />
          </div>
        </div>
      </section>
    </>
  );
}
