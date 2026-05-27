import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import LinkCard from "@components/LinkCard";
import PageHero from "@components/PageHero";
import SectionHeader from "@components/SectionHeader";
import ValidationRegistryDashboard from "@components/ValidationRegistryDashboard";
import { ceiling } from "@config/site";
import { registryStats } from "@data/validationRegistry";
import { externalLinks } from "@data/navigation";

export const metadata: Metadata = {
  title: "Validation Registry | HawkinsOperations",
  description:
    "Owner route for HawkinsOperations controlled-test validation packages, fixture counts, status, and blocked runtime and signal states.",
  alternates: {
    canonical: "/validation/",
  },
};

export default function ValidationPage() {
  return (
    <>
      <PageHero
        title="Validation registry"
        subtitle="Controlled-test packages, fixture counts, and validation status."
        description="This route owns the validation registry. It shows what passed inside controlled validation scope and what remains outside validation authority."
        badges={[
          { label: ceiling, tone: "warn" },
          { label: `${registryStats.totalFixtures} fixtures` },
          { label: `${registryStats.passedPackages} packages` },
          { label: "VALIDATION_TRUTH_ONLY", tone: "block" },
        ]}
      />

      <section className="container section-tight">
        <BoundaryNotice
          title="Validation boundary"
          text="Validation truth supports controlled-test results only. It does not prove runtime activity, signal observation, public proof, or public-safe runtime evidence."
        />
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader
            title="Controlled validation packages"
            eyebrow="Registry owner"
            description="Filter by family, inspect fixture counts, and keep blocked runtime / signal / public-safe states visible without turning them into proof."
          />
          <ValidationRegistryDashboard />
        </div>
      </section>

      <section className="cockpit-section--tight pb-24">
        <div className="container">
          <SectionHeader title="Validation dependencies" eyebrow="Continue" />
          <div className="grid gap-4 md:grid-cols-3">
            <LinkCard href="/pipeline/" title="Operational pipeline" description="See where validation sits in the source-to-rendering flow." />
            <LinkCard href="/proof/" title="Proof ledger" description="Open the proof authority route that consumes validation results under a stated ceiling." />
            <LinkCard href={externalLinks.validation} title="Validation repo" description="Open the source-controlled validation repository." external />
          </div>
        </div>
      </section>
    </>
  );
}
