import type { Metadata } from "next";
import Image from "next/image";
import BoundaryNotice from "@components/BoundaryNotice";
import LinkCard from "@components/LinkCard";
import PageHero from "@components/PageHero";
import SectionHeader from "@components/SectionHeader";

export const metadata: Metadata = {
  title: "Hoxline reviewer route | HawkinsOperations",
  description:
    "Rendering-only reviewer route for the Hoxline HO-DET-001 controlled-validation bridge.",
  alternates: {
    canonical: "/hoxline/",
  },
};

const bridgeFacts = [
  ["Artifact", "HO-DET-001"],
  ["Evidence state", "CONTROLLED_TEST_VALIDATED"],
  ["Proof ceiling", "CONTROLLED_TEST_VALIDATED"],
  ["public_safe", "false"],
  ["human_review_required", "true"],
  ["Route status", "DRAFT_RENDERING_ROUTE"],
];

const boundaries = [
  "Hoxline is the HawkinsOperations ProofOps control plane for AI-assisted security work.",
  "Hoxline controls how security work moves from AI-assisted output to evidence-bound claims.",
  "Claim Firewall is an internal Claim Authority capability.",
  "The HO-DET-001 bridge is CONTROLLED_TEST_VALIDATED only.",
  "Website rendering is not proof.",
  "The website does not create proof authority.",
  "public_safe remains false.",
  "human_review_required remains true.",
];

const blockedClaims = [
  "runtime status",
  "signal status",
  "public-safe status",
  "production status",
  "SOCaaS status",
  "customer deployment",
  "AI approval",
  "analyst approval",
  "final authorization",
  "ProofCard authority",
  "case closure",
];

export default function HoxlineReviewerRoutePage() {
  return (
    <>
      <PageHero
        title="Hoxline"
        subtitle="Rendering-only reviewer route for the HO-DET-001 controlled-validation bridge."
        description="Hoxline by HawkinsOperations keeps AI-assisted security work below the evidence ceiling until authority sources and human review support stronger wording."
        badges={[
          { label: "DRAFT_RENDERING_ROUTE" },
          { label: "CONTROLLED_TEST_VALIDATED" },
          { label: "public_safe false" },
          { label: "human_review_required true" },
        ]}
      />

      <section className="cockpit-section--tight">
        <div className="container grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="surface overflow-hidden p-0" data-truth-surface="public-rendering">
            <Image
              src="/brand/hawkinsoperations-hero-wide.png"
              alt="HawkinsOperations reviewer surface"
              width={1400}
              height={820}
              className="h-full min-h-[320px] w-full object-cover"
              priority
            />
          </div>
          <div className="moon-panel" style={{ padding: 24 }}>
            <p className="cockpit-eyebrow">Reviewer facts</p>
            <dl className="mt-5 grid gap-3">
              {bridgeFacts.map(([label, value]) => (
                <div key={label} className="flex min-w-0 flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <dt className="text-sm text-slate-400">{label}</dt>
                  <dd className="mono text-xs uppercase text-slate-100">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="container cockpit-section--tight">
        <BoundaryNotice text="DRAFT_RENDERING_ROUTE: this page references draft Hoxline PR #7 for reviewer context only. Website rendering is not proof, does not create proof authority, and does not imply the bridge is merged." />
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader title="ProofOps Boundary" eyebrow="Hoxline reviewer route" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {boundaries.map((boundary) => (
              <div key={boundary} className="moon-panel" style={{ padding: 18 }}>
                <p className="text-sm leading-6 text-slate-300">{boundary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container grid gap-6 lg:grid-cols-[0.85fr_1fr]">
          <div>
            <SectionHeader title="Not Claimed" eyebrow="Blocked public wording" />
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
              This route does not claim runtime, signal, public-safe, production, SOCaaS,
              customer deployment, AI approval, analyst approval, final authorization,
              ProofCard authority, or case closure.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2" aria-label="Blocked claim families">
            {blockedClaims.map((claim) => (
              <li key={claim} className="moon-panel mono text-xs uppercase text-slate-300" style={{ padding: 14 }}>
                not claimed: {claim}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader title="Reviewer Links" eyebrow="Draft dependency" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <LinkCard
              href="https://github.com/HawkinsOperations/hoxline/pull/7"
              title="Hoxline PR #7"
              description="Draft product PR for the HO-DET-001 ProofCard v0 / Gauntlet controlled-validation bridge."
              external
            />
            <LinkCard
              href="/proof/ho-det-001/"
              title="HO-DET-001 route"
              description="Existing website rendering route for the bounded HO-DET-001 reviewer case file."
            />
            <LinkCard
              href="/claim-firewall/"
              title="Claim Firewall"
              description="Internal Hoxline Claim Authority capability route."
            />
          </div>
        </div>
      </section>
    </>
  );
}
