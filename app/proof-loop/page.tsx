import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import ClaimPromotionFlow from "@components/ClaimPromotionFlow";
import ClosedLoopPreview from "@components/ClosedLoopPreview";
import LinkCard from "@components/LinkCard";
import PageHero from "@components/PageHero";
import SectionHeader from "@components/SectionHeader";
import { ceiling, publicSafe } from "@config/site";

export const metadata: Metadata = {
  title: "Proof Loop | HawkinsOperations",
  description:
    "The HawkinsOperations Proof Loop: source, validation, AI labor, deterministic verifier, CI, and proof record steps that bound any public claim.",
};

export default function ProofLoopPage() {
  return (
    <>
      <PageHero
        title="Proof loop"
        subtitle="Each step has an authority. No step skips its gate."
        description="Detection source enters at the bottom. A public claim ships only after deterministic validation, an AI-labor pass, the verifier, CI enforcement, and a bounded proof record."
        badges={[
          { label: ceiling, tone: "warn" },
          { label: publicSafe, tone: "block" },
          { label: "RENDERING_ONLY" },
        ]}
      />
      <section className="container section-tight">
        <BoundaryNotice
          title="Loop boundary"
          text="The website renders the loop; it does not execute it. The loop's authority lives in the validation, proof, detections, and platform repos."
        />
      </section>
      <section className="container section">
        <ClosedLoopPreview />
      </section>
      <section className="container section">
        <SectionHeader
          title="Promotion path across six surfaces"
          eyebrow="Truth surfaces"
          description="Each surface answers a different question. None inherits proof from another."
        />
        <ClaimPromotionFlow />
      </section>
      <section className="container section pb-20">
        <SectionHeader title="Open the linked routes" eyebrow="Continue" />
        <div className="grid gap-4 md:grid-cols-3">
          <LinkCard href="/proof/" title="Proof ledger" description="Supported claims, blocked claims, proof records, and promotion gates." />
          <LinkCard href="/proof/ho-det-001/" title="HO-DET-001 case file" description="The flagship case file at the current ceiling." />
          <LinkCard href="/architecture/truth-surfaces/" title="Truth surface model" description="Six surfaces with their can-prove and cannot-prove boundaries." />
        </div>
      </section>
    </>
  );
}
