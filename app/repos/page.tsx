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
};

export default function ReposPage() {
  return (
    <>
      <PageHero
        title="Repository map"
        subtitle="Six repositories. Three planes. Authority flows down only."
        description="detections → validation → proof feeds the chain. .github and platform overlay it. website renders the receipts; it does not author them."
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
