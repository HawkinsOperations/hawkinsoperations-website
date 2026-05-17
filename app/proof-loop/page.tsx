import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import ClaimPromotionFlow from "@components/ClaimPromotionFlow";
import LinkCard from "@components/LinkCard";
import PageHero from "@components/PageHero";
import ProofLoopDiagram from "@components/ProofLoopDiagram";
import SectionHeader from "@components/SectionHeader";
import { ceiling, publicSafe } from "@config/site";

export const metadata: Metadata = {
  title: "Proof Loop | HawkinsOperations",
  description:
    "Six-phase Proof Loop — Generate, Constrain, Validate, Capture, Review, Publish — mapped over the underlying detection-engineering steps that bound every public claim.",
};

export default function ProofLoopPage() {
  return (
    <>
      <PageHero
        title="Proof loop"
        subtitle="Six phases. One direction. Every public claim ships through them."
        description="Detection source enters at Generate. A public claim ships only after Constrain, Validate, Capture, Review, and Publish — each phase produces a receipt the next phase requires."
        badges={[
          { label: ceiling, tone: "warn" },
          { label: publicSafe, tone: "block" },
          { label: "RENDERING_ONLY" },
        ]}
      />

      <section className="container cockpit-section--tight">
        <BoundaryNotice
          title="Loop boundary"
          text="The website renders the loop; it does not execute it. The loop's authority lives in the validation, proof, detections, and platform repos."
        />
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <ProofLoopDiagram />
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader
            title="Promotion path across six surfaces"
            eyebrow="Truth surfaces"
            description="Each surface answers a different question. None inherits proof from another."
          />
          <div className="mt-6">
            <ClaimPromotionFlow />
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight pb-20">
        <div className="container">
          <SectionHeader title="Open the linked routes" eyebrow="Continue" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <LinkCard href="/proof/" title="Proof ledger" description="Supported claims, blocked claims, proof records, and promotion gates." />
            <LinkCard href="/proof/ho-det-001/" title="HO-DET-001 case file" description="The flagship case file at the current ceiling." />
            <LinkCard href="/architecture/truth-surfaces/" title="Truth surface model" description="Six surfaces with their can-prove and cannot-prove boundaries." />
          </div>
        </div>
      </section>
    </>
  );
}
