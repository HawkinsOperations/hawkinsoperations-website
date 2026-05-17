import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import LinkCard from "@components/LinkCard";
import PageHero from "@components/PageHero";
import ReviewerRouteCard from "@components/ReviewerRouteCard";
import SectionHeader from "@components/SectionHeader";
import { blockedClaims } from "@config/blocked-claims";
import { ceiling } from "@config/site";
import { externalLinks } from "@data/navigation";
import { reviewerRoutes } from "@data/reviewerRoutes";

export const metadata: Metadata = {
  title: "Reviewer Route | HawkinsOperations",
  description:
    "Reviewer route for HawkinsOperations proof ceiling, blocked claims, and public inspection links.",
};

export default function StartPage() {
  return (
    <>
      <PageHero
        title="Reviewer route"
        subtitle="Three speeds through the public proof codex."
        description="Start with the proof ceiling, then follow the repository routes only as far as the evidence supports."
        badges={[{ label: ceiling, tone: "warn" }, { label: "RENDERING_ONLY" }]}
      />
      <section className="container section">
        <SectionHeader title="Choose the route that fits the review window" eyebrow="Inspection paths" />
        <div className="grid gap-4 lg:grid-cols-3">
          {reviewerRoutes.map((route) => (
            <ReviewerRouteCard
              key={route.title}
              duration={route.duration}
              title={route.title}
              purpose={route.purpose}
              items={route.items}
              links={route.links}
            />
          ))}
        </div>
      </section>
      <section className="container section-tight">
        <BoundaryNotice text="Current proof ceiling: CONTROLLED_TEST_VALIDATED. Website rendering is not proof." />
      </section>
      <section className="container section">
        <SectionHeader title="External review links" eyebrow="Repository routes" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <LinkCard href={externalLinks.githubOrg} title="GitHub organization" description="Organization front door for HawkinsOperations." external />
          <LinkCard href={externalLinks.proof} title="Proof repo" description="Proof records and promotion-state documentation." external />
          <LinkCard href={externalLinks.detections} title="Detection repo" description="Detection source candidates. Source does not prove runtime." external />
          <LinkCard href={externalLinks.controlMatrix} title="Control matrix" description="Current control routing when available." external />
          <LinkCard href={externalLinks.repoAuthorityMap} title="Repository authority map" description="Repo plane separation and authority boundaries." external />
        </div>
      </section>
      <section className="container section">
        <SectionHeader title="Blocked claims summary" eyebrow="Do not infer" />
        <div className="flex flex-wrap gap-2">
          {blockedClaims.map((claim) => (
            <span
              key={claim}
              className="mono border border-rose-300/25 bg-rose-950/30 px-3 py-2 text-xs uppercase text-rose-100"
            >
              {claim}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
