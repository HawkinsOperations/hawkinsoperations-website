import type { Metadata } from "next";
import PageHero from "@components/PageHero";
import RepoAuthorityDAG from "@components/RepoAuthorityDAG";
import RepoCard from "@components/RepoCard";
import SectionHeader from "@components/SectionHeader";
import { repoAuthority } from "@config/repo-authority";

export const metadata: Metadata = {
  title: "Repository Map | HawkinsOperations",
  description:
    "Repository map for HawkinsOperations source, validation, platform, proof, and website rendering surfaces.",
  alternates: {
    canonical: "/repos/",
  },
};

export default function ReposPage() {
  return (
    <>
      <PageHero
        title="Repository map"
        subtitle="Seven repositories. Three planes. Authority remains separated."
        description="detections → validation → proof feeds the authority chain. .github, Hoxline, and platform retain distinct routing, product-control, and runtime-boundary roles. The website renders receipts; it does not author them."
        badges={[
          { label: "REPO_PLANE_SEPARATION" },
          { label: "SOURCE_DOES_NOT_PROVE_RUNTIME", tone: "warn" },
        ]}
      />

      <section className="cockpit-section--tight">
        <div className="container">
          <RepoAuthorityDAG />
        </div>
      </section>

      <section className="cockpit-section--tight">
        <div className="container">
          <SectionHeader title="Repository inventory" eyebrow="Tabular view" description="Same data as the DAG, indexable by reviewers who want to skim by repo name." />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {repoAuthority.map((repo) => (
              <RepoCard key={repo.name} repo={repo} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
