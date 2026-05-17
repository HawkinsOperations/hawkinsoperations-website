import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import PageHero from "@components/PageHero";
import SectionHeader from "@components/SectionHeader";
import { ceiling } from "@config/site";

export const metadata: Metadata = {
  title: "System History | HawkinsOperations",
  description: "Conservative HawkinsOperations system history for website governance and proof-codex changes.",
};

const entries = [
  {
    label: "2026-05-17",
    title: "Proof Pack 001 release path implemented",
    detail:
      "Proof repo merged the source / check-mode release path for Proof Pack 001 on main. No official release, tag, zip, or signed artifact is claimed from the website; the next gate is explicit release approval. Public ceiling remains controlled-test scope and is NOT_PUBLIC_SAFE.",
  },
  {
    label: "2026-05-17",
    title: "Reviewer cockpit extended across core pages",
    detail:
      "Pipeline, proof, artifacts, and about pages now share the cockpit shell, status console, and receipt-style routing language for senior reviewers.",
  },
  {
    label: "2026-05-16",
    title: "Black / blue reviewer cockpit implemented",
    detail:
      "Homepage moved to a black/electric-blue cockpit layout with a status console, claim firewall, and artifact family matrix. Rendering surface remains routing only.",
  },
  {
    label: "PR #7",
    title: "Astro proof codex redesign",
    detail:
      "Converted the website into an Astro, Tailwind CSS, and TypeScript static proof codex for public inspection.",
  },
  {
    label: "PR #6",
    title: "CODEOWNERS soft enforcement added",
    detail: "Added soft review-routing boundaries for website and public-claim files.",
  },
];

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        title="System history"
        subtitle="A conservative change record for the proof codex."
        description="This route records website and governance milestones without promoting runtime, signal, or public proof claims."
        badges={[{ label: ceiling, tone: "warn" }, { label: "RENDERING_ONLY" }]}
      />
      <section className="container section-tight">
        <BoundaryNotice text="Website rendering remains not proof. HO-DET-001 remains CONTROLLED_TEST_VALIDATED." />
      </section>
      <section className="container section">
        <SectionHeader
          title="Conservative history"
          eyebrow="Change record"
          description="Only reviewed, conservative site and governance changes are listed here."
        />
        <div className="divide-y divide-blue-100/10 border-y border-blue-100/10">
          {entries.map((entry) => (
            <article key={entry.label} className="grid gap-4 py-7 md:grid-cols-[180px_1fr]">
              <p className="mono text-xs uppercase text-blue-100">{entry.label}</p>
              <div>
                <h2 className="text-2xl font-semibold text-slate-50">{entry.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{entry.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
