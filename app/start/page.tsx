import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import ClaimFirewallPanel from "@components/ClaimFirewallPanel";
import LinkCard from "@components/LinkCard";
import PageHero from "@components/PageHero";
import ReviewRouteSelector from "@components/ReviewRouteSelector";
import SectionHeader from "@components/SectionHeader";
import { ceiling } from "@config/site";
import { externalLinks } from "@data/navigation";

export const metadata: Metadata = {
  title: "Reviewer Route | HawkinsOperations",
  description:
    "Reviewer routes for the HawkinsOperations public proof ceiling: hiring manager, security engineer, research partner.",
};

export default function StartPage() {
  return (
    <div className="page-start">
      <PageHero
        title="Reviewer route"
        subtitle="Three reviewers. Three inspection paths."
        description="Each route reads the same system at a different speed. The underlying proof state is the same."
        badges={[{ label: ceiling, tone: "warn" }, { label: "RENDERING_ONLY" }]}
      />

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader title="Choose the route that fits the review window" eyebrow="Inspection paths" />
          <div className="mt-6">
            <ReviewRouteSelector />
          </div>
        </div>
      </section>

      <section className="container cockpit-section--tight">
        <BoundaryNotice text="Current proof ceiling: CONTROLLED_TEST_VALIDATED. Website rendering is not proof." />
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader title="External review links" eyebrow="Repository routes" />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <LinkCard href={externalLinks.githubOrg} title="GitHub organization" description="Organization front door for HawkinsOperations." external />
            <LinkCard href={externalLinks.proof} title="Proof repo" description="Proof records and promotion-state documentation." external />
            <LinkCard href={externalLinks.detections} title="Detection repo" description="Detection source candidates. Source does not prove runtime." external />
            <LinkCard href={externalLinks.controlMatrix} title="Control matrix" description="Current control routing when available." external />
            <LinkCard href={externalLinks.repoAuthorityMap} title="Repository authority map" description="Repo plane separation and authority boundaries." external />
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <ClaimFirewallPanel
            title="What this surface does not assert"
            line="The reviewer route does not author proof. Blocked terms below remain blocked unless a separate evidence-backed promotion changes their state."
          />
        </div>
      </section>
    </div>
  );
}
