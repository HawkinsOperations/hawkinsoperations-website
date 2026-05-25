import type { Metadata } from "next";
import PageHero from "@components/PageHero";
import TruthSurfaceBoard from "@components/TruthSurfaceBoard";
import { ceiling } from "@config/site";

export const metadata: Metadata = {
  title: "Truth Surface Model | HawkinsOperations",
  description:
    "Truth surface model separating source, validation, runtime, signal, evidence, and public proof for HawkinsOperations.",
  alternates: {
    canonical: "/architecture/truth-surfaces/",
  },
};

export default function TruthSurfacesPage() {
  return (
    <>
      <PageHero
        title="Truth surface model"
        subtitle="Six surfaces, six proof meanings."
        description="Each surface says what it proves, what it does not prove, where it lives, what promotes it, and what blocks it."
        badges={[{ label: ceiling, tone: "warn" }, { label: "CLAIM_FIREWALL" }]}
      />
      <section className="container section">
        <TruthSurfaceBoard />
      </section>
    </>
  );
}
