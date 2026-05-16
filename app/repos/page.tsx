import type { Metadata } from "next";
import PageHero from "@components/PageHero";
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
        subtitle="The public system split by ownership and proof surface."
        description="A repository can own source, validation, platform, proof, or rendering. It does not inherit the authority of the others."
        badges={[
          { label: "REPO_PLANE_SEPARATION" },
          { label: "SOURCE_DOES_NOT_PROVE_RUNTIME", tone: "warn" },
        ]}
      />
      <section className="container section">
        <SectionHeader title="HawkinsOperations repositories" eyebrow="Map" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {repoAuthority.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      </section>
    </>
  );
}
