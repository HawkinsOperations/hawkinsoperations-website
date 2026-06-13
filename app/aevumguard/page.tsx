import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import LinkCard from "@components/LinkCard";
import PageHero from "@components/PageHero";
import SectionHeader from "@components/SectionHeader";
import { externalLinks } from "@data/navigation";

const productLoop = [
  "AI-assisted security work",
  "Artifact Intake",
  "Evidence Graph",
  "Telemetry Contract Check",
  "Controlled Validation",
  "Runtime Candidate Ledger",
  "Signal Observation",
  "Human Review Gate",
  "ProofCard",
  "Claim Authority",
  "Safe Claim / Blocked Claim",
];

export const metadata: Metadata = {
  title: "AevumGuard | HawkinsOperations",
  description:
    "AevumGuard governs how AI-assisted security work becomes tested, reviewed, blocked, or safe to claim.",
  alternates: {
    canonical: "/aevumguard/",
  },
};

export default function AevumGuardPage() {
  return (
    <>
      <PageHero
        title="AevumGuard"
        subtitle="ProofOps control for the AI security era."
        description="AevumGuard governs how AI-assisted security work becomes tested, reviewed, blocked, or safe to claim."
        badges={[{ label: "PRODUCT_FRONT_DOOR" }, { label: "RENDERING_ONLY" }]}
      />

      <section className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <SectionHeader title="Product Doctrine" eyebrow="AevumGuard" />
          <p className="muted mt-3 max-w-3xl text-sm leading-6">
            AI is not the authority. Evidence is. HawkinsOperations is the brand/system;
            AevumGuard is the product/front-door repo for the governed product experience.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <LinkCard
              href={externalLinks.aevumguard}
              title="AevumGuard repo"
              description="Product front-door repo for AevumGuard and Claim Authority capabilities."
              external
            />
            <LinkCard
              href="/claim-firewall/"
              title="Claim Firewall capability"
              description="Legacy capability route for the internal AevumGuard Claim Authority wording enforcement edge."
            />
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <SectionHeader title="Core Loop" eyebrow="Product flow" />
          <ol className="claim-firewall-demo__outcomes" aria-label="AevumGuard core loop">
            {productLoop.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                <em>{index === productLoop.length - 1 ? "claim state" : "next"}</em>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container cockpit-section--tight">
        <BoundaryNotice text="RENDERING_ONLY: this page changes public website wording and routing only. Runtime, signal, public-safe, production, customer, SOCaaS, autonomous SOC, AI-approved, analyst-approved, and case-closed claims remain blocked / not claimed." />
      </section>
    </>
  );
}
