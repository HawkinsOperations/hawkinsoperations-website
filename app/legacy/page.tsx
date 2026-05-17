import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import LinkCard from "@components/LinkCard";
import PageHero from "@components/PageHero";
import SectionHeader from "@components/SectionHeader";
import { externalLinks } from "@data/navigation";

export const metadata: Metadata = {
  title: "Legacy Boundary | HawkinsOperations",
  description:
    "Legacy boundary explaining HawkinsOps as reference material and HawkinsOperations as the current governed rebuild.",
};

export default function LegacyPage() {
  return (
    <>
      <PageHero
        title="Legacy boundary"
        subtitle="HawkinsOps is legacy/reference. HawkinsOperations is the current governed rebuild."
        description="Legacy proof does not automatically prove current claims. Current claims require current evidence and promotion gates."
        badges={[
          { label: "LEGACY_REFERENCE" },
          { label: "CURRENT_EVIDENCE_REQUIRED", tone: "warn" },
        ]}
      />
      <section className="container section-tight">
        <BoundaryNotice text="Legacy material may provide context, but it does not automatically promote current HawkinsOperations claims." />
      </section>
      <section className="container section">
        <SectionHeader title="Boundary rules" eyebrow="Legacy handling" />
        <div className="grid gap-4 md:grid-cols-3">
          <article className="card p-5">
            <h2 className="text-xl font-semibold text-slate-50">HawkinsOps</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Legacy/reference unless explicitly revalidated.
            </p>
          </article>
          <article className="card p-5">
            <h2 className="text-xl font-semibold text-slate-50">HawkinsOperations</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Current governed rebuild and public proof codex.
            </p>
          </article>
          <article className="card p-5">
            <h2 className="text-xl font-semibold text-slate-50">Promotion</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Current claims require current evidence, proof linkage, and promotion gates.
            </p>
          </article>
        </div>
      </section>
      <section className="container section">
        <SectionHeader title="Reference route" eyebrow="Context only" />
        <LinkCard
          href={externalLinks.legacyHawkinsOps}
          title="Legacy HawkinsOps"
          description="Historical and reference context only."
          external
        />
      </section>
    </>
  );
}
