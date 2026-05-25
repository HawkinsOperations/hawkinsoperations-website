import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import ClaimFirewallPanel from "@components/ClaimFirewallPanel";
import LinkCard from "@components/LinkCard";
import PageHero from "@components/PageHero";
import RecentGovernedArtifacts from "@components/RecentGovernedArtifacts";
import ReviewRouteSelector from "@components/ReviewRouteSelector";
import SectionHeader from "@components/SectionHeader";
import { ceiling } from "@config/site";
import { externalLinks } from "@data/navigation";

const intakeRoutes = [
  {
    num: "01",
    title: "Inspect the proof system",
    sub: "Open the proof ledger, then the HO-DET-001 record. Confirm the public ceiling holds at CONTROLLED_TEST_VALIDATED.",
    href: "/proof/",
    variant: "amber" as const,
  },
  {
    num: "02",
    title: "Review artifacts",
    sub: "Open the artifact vault. Each recent governed work item routes to a public-safe reviewer review page.",
    href: "/artifacts/#recent-governed-work",
    variant: "default" as const,
  },
  {
    num: "03",
    title: "Trace HO-DET-001",
    sub: "Walk the source → validation → proof receipts for the flagship detection. Stronger wording requires a separate promotion gate.",
    href: "/pipeline/",
    variant: "default" as const,
  },
  {
    num: "04",
    title: "Open the GitHub org",
    sub: "Inspect the upstream repos. Website rendering is not proof; the repos hold the receipts.",
    href: "https://github.com/HawkinsOperations",
    variant: "ice" as const,
    external: true,
  },
];

const phase2Routes = [
  {
    tag: "VALIDATION",
    title: "Validation registry",
    sub: "Controlled-test packages, fixture counts, and blocked runtime / signal / public-safe states.",
    href: "/proof/#validation-registry",
  },
  {
    tag: "PROOF / VERIFIER",
    title: "Proof / verifier",
    sub: "Proof Pack 001 manifest, included / excluded items, and verifier routes.",
    href: "/proof/#proof-pack-001",
  },
  {
    tag: "PLATFORM",
    title: "Platform contracts",
    sub: "SOAR packet, AutoSOC ledger, factory controller, and blocked authority footers.",
    href: "/pipeline/#platform-contracts",
  },
  {
    tag: "AI GOVERNANCE",
    title: "AI governance boundary",
    sub: "Offline LLM support is support-only labor; human review remains authority.",
    href: "/pipeline/#llm-boundary",
  },
];

export const metadata: Metadata = {
  title: "Start | HawkinsOps",
  description:
    "Reviewer routes for the HawkinsOperations public proof ceiling: hiring manager, security engineer, research partner.",
  alternates: {
    canonical: "/start/",
  },
};

export default function StartPage() {
  return (
    <>
      <PageHero
        title="Reviewer route"
        subtitle="Three reviewers. Three inspection paths."
        description="Each route reads the same system at a different speed. The underlying proof state is the same."
        badges={[{ label: ceiling, tone: "warn" }, { label: "RENDERING_ONLY" }]}
      />

      <section className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <SectionHeader
            title="Pick your starting route"
            eyebrow="Reviewer intake"
          />
          <p className="muted mt-3 max-w-3xl text-sm leading-6">
            Four bounded routes into the governed proof system. Each card is a starting action — none
            promotes a stronger claim than the public ceiling allows.
          </p>
          <div className="start-routes mt-6">
            {intakeRoutes.map((r) => (
              <a
                key={r.num}
                className={`start-routes__card spotlight ${
                  r.variant === "amber" ? "start-routes__card--amber spotlight--amber"
                  : r.variant === "ice" ? "start-routes__card--ice"
                  : ""
                }`}
                href={r.href}
                target={r.external ? "_blank" : undefined}
                rel={r.external ? "noopener noreferrer" : undefined}
              >
                <span className="start-routes__num">{r.num}</span>
                <h3 className="start-routes__title">{r.title}</h3>
                <p className="start-routes__sub">{r.sub}</p>
                <p className="start-routes__arrow">{r.external ? "Open ↗" : "Open →"}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <SectionHeader title="Phase 2 reviewer layers" eyebrow="Direct routes" />
          <p className="muted mt-3 max-w-3xl text-sm leading-6">
            Four direct entries into the Phase 2 cockpit layers. Each opens a bounded reviewer
            surface — none promotes a stronger claim than the public ceiling allows.
          </p>
          <div className="start-routes mt-6">
            {phase2Routes.map((r) => (
              <a key={r.title} className="start-routes__card spotlight" href={r.href}>
                <span className="start-routes__num">{r.tag}</span>
                <h3 className="start-routes__title">{r.title}</h3>
                <p className="start-routes__sub">{r.sub}</p>
                <p className="start-routes__arrow">Open →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <SectionHeader title="Choose the route that fits the review window" eyebrow="Inspection paths" />
          <div className="mt-6">
            <ReviewRouteSelector />
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <RecentGovernedArtifacts
            heading="Recent governed work · snapshot"
            sub="Hand-maintained static snapshot of recent governed work. Each card opens a public-safe reviewer review page."
            limit={6}
          />
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
    </>
  );
}
