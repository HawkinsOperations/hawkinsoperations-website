import type { Metadata } from "next";
import LinkCard from "@components/LinkCard";
import SectionHeader from "@components/SectionHeader";
import {
  ClaimBoundaryPanel,
  EvidenceCeilingCard,
  SignalBlockedBadge,
} from "@components/proofops";
import { externalLinks } from "@data/navigation";

export const metadata: Metadata = {
  title: "Hoxline moved | HawkinsOperations",
  description:
    "AevumGuard was a prior working name. Hoxline by HawkinsOperations is the current product front door.",
  alternates: {
    canonical: "/hoxline/",
  },
};

export default function HoxlineCompatibilityPage() {
  return (
    <div className="proofops-page">
      <section className="proofops-hero">
        <div className="container proofops-hero__grid">
          <div className="proofops-hero__copy">
            <p className="proofops-kicker">Legacy compatibility route</p>
            <h1 className="proofops-hero__title">
              Hoxline
              <span>moved</span>
            </h1>
            <p className="proofops-hero__subtitle">
              AevumGuard was a prior working name. Hoxline by HawkinsOperations is the current product front door.
            </p>
            <p className="proofops-hero__description">
              Use the current `/hoxline/` route for the flagship ProofOps control-plane page. This compatibility route exists only for older links and does not create proof authority.
            </p>
            <div className="proofops-hero__metrics" aria-label="Legacy route status">
              <div className="proofops-metric proofops-metric--cyan">
                <span>Current route</span>
                <strong>/hoxline/</strong>
              </div>
              <div className="proofops-metric proofops-metric--amber">
                <span>Legacy route</span>
                <strong>/aevumguard/</strong>
              </div>
              <div className="proofops-metric proofops-metric--blocked">
                <span>public_safe</span>
                <strong>false</strong>
              </div>
              <div className="proofops-metric proofops-metric--green">
                <span>Human review</span>
                <strong>required</strong>
              </div>
            </div>
          </div>
          <aside className="proofops-hero__panel" aria-label="Current Hoxline route">
            <p className="proofops-kicker">Open current product page</p>
            <LinkCard
              href="/hoxline/"
              title="Open Hoxline"
              description="Go to the current ProofOps control-plane product route."
            />
            <LinkCard
              href={externalLinks.hoxline}
              title="Hoxline repo"
              description="Open the current Hoxline source repository."
              external
            />
          </aside>
        </div>
      </section>

      <section className="proofops-section">
        <div className="container">
          <SectionHeader
            title="Compatibility only"
            eyebrow="Prior-name boundary"
            description="This page is not the product front door. It exists to move older links toward Hoxline while keeping proof and claim boundaries visible."
          />
          <div className="proofops-grid-3">
            <EvidenceCeilingCard
              label="Current product route"
              ceiling="/hoxline/"
              detail="The flagship Hoxline page is the public product route."
              tone="cyan"
            />
            <EvidenceCeilingCard
              label="Legacy name"
              ceiling="prior working name"
              detail="AevumGuard was a prior working name. Hoxline is the current product name."
              tone="amber"
            />
            <EvidenceCeilingCard
              label="Website role"
              ceiling="RENDERING_ONLY"
              detail="Website rendering routes reviewers and users. It is not proof."
              tone="blocked"
            />
          </div>
        </div>
      </section>

      <section className="proofops-section pb-24">
        <div className="container">
          <ClaimBoundaryPanel
            title="Legacy route trust boundary"
            description="Hoxline remains the product route, but neither this compatibility page nor the website creates proof authority or stronger claim status."
            boundaries={[
              { label: "Website rendering", value: "not proof", tone: "neutral" },
              { label: "Hoxline", value: "not proof authority", tone: "cyan" },
              { label: "Controlled validation", value: "current ceiling only", tone: "green" },
              { label: "public_safe", value: "false", tone: "blocked" },
              { label: "Human review", value: "required", tone: "amber" },
              { label: "Stronger claims", value: "blocked", tone: "blocked" },
            ]}
          />
          <div className="mt-6 flex flex-wrap gap-2">
            <SignalBlockedBadge label="runtime not claimed" />
            <SignalBlockedBadge label="signal not claimed" />
            <SignalBlockedBadge label="production not claimed" />
            <SignalBlockedBadge label="customer not claimed" />
          </div>
        </div>
      </section>
    </div>
  );
}
