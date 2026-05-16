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
