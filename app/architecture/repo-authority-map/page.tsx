import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import LinkCard from "@components/LinkCard";
import PageHero from "@components/PageHero";
import RepoAuthorityDAG from "@components/RepoAuthorityDAG";
import RepoCard from "@components/RepoCard";
import SectionHeader from "@components/SectionHeader";
import { repoAuthority } from "@config/repo-authority";
import { externalLinks } from "@data/navigation";

export const metadata: Metadata = {
  title: "Repository Authority Map | HawkinsOperations",
  description:
    "Owner route for HawkinsOperations repository ownership, authority flow, and truth-surface separation.",
  alternates: {
    canonical: "/architecture/repo-authority-map/",
  },
};

export default function RepoAuthorityMapPage() {
  return (
    <>
      <PageHero
        title="Repository authority map"
        subtitle="Six repositories. Separate truth surfaces. Authority does not flow upward from rendering."
        description="This route owns repository responsibility and source-of-truth routing. It is governance navigation, not proof that every repository complied in runtime."
        badges={[
          { label: "REPO_PLANE_SEPARATION" },
          { label: "SOURCE_NOT_RUNTIME", tone: "block" },
          { label: "WEBSITE_RENDERING_ONLY", tone: "block" },
        ]}
      />

      <section className="container section-tight">
        <BoundaryNotice
          title="Authority boundary"
          text="The authority map explains ownership and routing. It does not prove runtime activity, signal observation, or proof promotion."
        />
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader
            title="Authority flow"
            eyebrow="System map"
            description="Detections, validation, platform, proof, governance, and website each own a different question. Website rendering remains non-authoritative."
          />
          <RepoAuthorityDAG />
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader title="Repository inventory" eyebrow="Owner table" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {repoAuthority.map((repo) => (
              <RepoCard key={repo.name} repo={repo} />
            ))}
          </div>
        </div>
      </section>

      <section className="cockpit-section--tight pb-24">
        <div className="container">
          <SectionHeader title="Continue inspection" eyebrow="Routes" />
          <div className="grid gap-4 md:grid-cols-3">
            <LinkCard href="/architecture/truth-surfaces/" title="Truth surfaces" description="Inspect what each truth surface can and cannot prove." />
            <LinkCard href="/platform/contracts/" title="Platform contracts" description="Open guardrails, schemas, samples, verifiers, and blocked authority footers." />
            <LinkCard href={externalLinks.repoAuthorityMap} title="Authority map source" description="Open the organization source route for repo authority." external />
          </div>
        </div>
      </section>
    </>
  );
}
