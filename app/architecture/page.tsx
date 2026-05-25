import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import ClaimPromotionFlow from "@components/ClaimPromotionFlow";
import LinkCard from "@components/LinkCard";
import PageHero from "@components/PageHero";
import SectionHeader from "@components/SectionHeader";
import TruthSurfaceSeparation from "@components/TruthSurfaceSeparation";

export const metadata: Metadata = {
  title: "System Architecture | HawkinsOperations",
  description:
    "System architecture map for HawkinsOperations proof planes, repository separation, and claim promotion boundaries.",
  alternates: {
    canonical: "/architecture/",
  },
};

export default function ArchitecturePage() {
  return (
    <>
      <PageHero
        title="System architecture"
        subtitle="A public map of separated proof planes."
        description="The architecture is designed so source, validation, runtime, signal, evidence, and public proof do not collapse into one unsupported claim."
        badges={[
          { label: "STATIC_SITE" },
          { label: "NO_SSR" },
          { label: "NO_WORKERS_REQUIRED" },
        ]}
      />
      <section className="container section-tight">
        <BoundaryNotice text="Public rendering can explain the architecture. It does not prove the architecture is active in runtime." />
      </section>
      <section className="container section">
        <SectionHeader
          title="Repo plane separation"
          eyebrow="System overview"
          description="Each plane owns a different class of truth. Promotion requires movement through gates, not presentation alone."
        />
        <ClaimPromotionFlow />
      </section>
      <section className="container section">
        <SectionHeader
          title="Truth Surface Separation"
          eyebrow="Promotion model"
          description="A public claim cannot inherit proof from a different plane. Each plane has its own can-prove and cannot-prove boundary."
        />
        <TruthSurfaceSeparation />
      </section>
      <section className="container section">
        <SectionHeader
          title="CI and governance enforcement concept"
          eyebrow="Controls"
          description="The website can host stable data attributes for scanners, but enforcement still lives in repositories, workflows, and promotion gates."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <LinkCard href="/controls/" title="Claim firewall" description="Allowed claims, blocked terms, and wording examples." />
          <LinkCard href="/repos/" title="Repository map" description="Where each proof plane lives." />
          <LinkCard href="/proof/" title="Proof ledger" description="The flagship HO-DET-001 record and current ceiling." />
        </div>
      </section>
    </>
  );
}
