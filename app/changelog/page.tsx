import type { Metadata } from "next";
import BoundaryNotice from "@components/BoundaryNotice";
import PageHero from "@components/PageHero";
import SectionHeader from "@components/SectionHeader";
import { ceiling } from "@config/site";

export const metadata: Metadata = {
  title: "System History | HawkinsOperations",
  description: "Conservative HawkinsOperations system history for website governance and proof-codex changes.",
  alternates: {
    canonical: "/changelog/",
  },
};

const entries = [
  {
    label: "2026-05-21",
    title: "Validation Registry and Platform Contract reviewer layers added",
    detail:
      "Phase 2 added a Validation Registry dashboard, proof manifest console, verifier cards, platform contract blueprints, a receipt / ledger reviewer snapshot, and an expandable blocked-claim firewall. Rendering only — the website is not proof. Public ceiling remains CONTROLLED_TEST_VALIDATED; runtime, signal, and public-safe runtime proof remain blocked, and rows with no proof record stay marked NO_PROOF_RECORD.",
  },
  {
    label: "2026-05-17",
    title: "Proof Pack 001 official release routed",
    detail:
      "Proof repo holds the official Proof Pack 001 GitHub Release, and the website routes reviewers to that release. ZIP SHA256 is 44d8a643aa2b113c9e99be0462e699d39af707a67190823cc05bb381907dc452. Website rendering is not proof; public ceiling remains CONTROLLED_TEST_VALIDATED, reviewer package status remains PUBLIC_SAFE_REVIEWER_RELEASE_CANDIDATE, raw/private runtime evidence remains NOT_PUBLIC_SAFE and excluded, and public-safe runtime proof remains BLOCKED.",
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
    title: "Astro proof codex redesign (historical · superseded)",
    detail:
      "Historical milestone: an earlier iteration built the site on Astro, Tailwind CSS, and TypeScript. The current HawkinsOperations site is a React / Next.js App Router reviewer surface; the Astro stack is superseded and retained here only as a change record.",
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
