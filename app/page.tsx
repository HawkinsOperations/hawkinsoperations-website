import type { Metadata } from "next";
import GovernanceSavesCockpit from "@components/GovernanceSavesCockpit";
import LinkCard from "@components/LinkCard";
import { externalLinks } from "@data/navigation";
import { governanceSavesSummary } from "@data/governanceSaves";

export const metadata: Metadata = {
  title: "HawkinsOperations",
  description:
    "HawkinsOperations is a governed AI Security Operations and detection engineering control plane that turns fast security work into evidence-bounded, reviewer-inspectable output.",
  alternates: {
    canonical: "/",
  },
};

type StatusChipTone = "det" | "ceiling" | "blocked" | "released";
const statusChips: { label: string; tone: StatusChipTone }[] = [
  { label: "Controls fired before public truth", tone: "ceiling" },
  { label: `${governanceSavesSummary.publicRenderedCount} public-facing governance examples`, tone: "det" },
  { label: "Proof Pack 001 available", tone: "released" },
  { label: "AI support-only", tone: "det" },
  { label: "Runtime claims bounded", tone: "blocked" },
  { label: "Private-only records excluded", tone: "blocked" },
];

const publicDoors = [
  {
    href: "/proof/",
    title: "Proof",
    description:
      "Claim authority, Governance Saves, Proof Pack 001, runtime boundaries, validation ceilings, and blocked claims.",
  },
  {
    href: "/artifacts/",
    title: "Artifacts",
    description:
      "Reviewer receipts, proof packages, evidence cards, release artifacts, and does-prove / does-not-prove boundaries.",
  },
  {
    href: "/detections/",
    title: "Detections",
    description:
      "Detection engineering portfolio with validation status, ATT&CK mapping, proof ceilings, and runtime boundaries.",
  },
  {
    href: "/ai-security/",
    title: "AI Security",
    description:
      "SOCaaS-style implementation model for AI-assisted triage, deterministic verification, and human authority.",
  },
  {
    href: "/about/",
    title: "About",
    description:
      "Mission, operating thesis, current HawkinsOperations boundary, and archive / legacy context.",
  },
  {
    href: externalLinks.githubOrg,
    title: "Inspect Source",
    description:
      "Open the HawkinsOperations GitHub organization. Repos carry the evidence; the website routes reviewers.",
    external: true,
  },
];

const reviewerProofs = [
  {
    label: "Governance Saves",
    value: `${governanceSavesSummary.publicRenderedCount} public-facing examples`,
    detail: "Controls that blocked unsafe claims, stale truth, bad merge risk, and private-evidence leakage.",
  },
  {
    label: "Proof Pack 001",
    value: "Reviewer package available",
    detail: "Bounded HO-DET-001 package route with release, manifest, checksum, and proof ceiling boundaries.",
  },
  {
    label: "AI boundary",
    value: "Support-only",
    detail: "AI can summarize and assist; it does not approve disposition, promote proof, or own authority.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden cockpit-section hero-cockpit">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="container">
          <div className="reveal reveal--up max-w-5xl">
            <p className="hero-cockpit__eyebrow">Reviewer cockpit</p>
            <h1 className="hero-cockpit__headline">
              Governance that catches bad security truth before it ships.
            </h1>
            <p className="hero-cockpit__lede">
              HawkinsOperations is a governed AI Security Operations and detection engineering control plane.
              It turns fast AI-assisted security work into evidence-bounded, reviewer-inspectable output.
            </p>
            <p className="hero-cockpit__lede mt-5">
              The proof is not that a website renders. The proof is that controls fired: unsafe claims were
              blocked, stale truth was corrected, private evidence stayed private, and AI stayed support-only.
            </p>

            <div className="hero-status" role="note" aria-label="Reviewer status">
              {statusChips.map((chip) => (
                <span key={chip.label} className={`hero-status__chip hero-status__chip--${chip.tone}`}>
                  {chip.label}
                </span>
              ))}
            </div>

            <div className="hero-cockpit__ctas">
              <a className="hero-cockpit__primary" href="/proof/">
                See Proof
              </a>
              <a className="hero-cockpit__secondary" href="/artifacts/">
                Inspect Artifacts
              </a>
              <a className="hero-cockpit__secondary" href="/ai-security/">
                View AI Security Model
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="six-doors" className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Six public doors</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)" }}>
              Pick the surface you want to inspect.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              The public site now routes through six primary pages. Support routes still exist, but they serve these doors.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {publicDoors.map((door) => (
              <LinkCard
                key={door.href}
                href={door.href}
                title={door.title}
                description={door.description}
                external={door.external}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="governance-saves-cockpit" className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Proof of value</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)" }}>
              Controls that fired before bad truth shipped.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Governance Saves are the clearest public indicator of the system: the site shows examples where
              unsupported public claims, stale state, private evidence, or AI-authority drift were blocked or corrected.
            </p>
          </div>
          <GovernanceSavesCockpit />
        </div>
      </section>

      <section id="reviewer-proof" className="cockpit-section--tight pb-24">
        <div className="container reveal reveal--up">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Reviewer proof path</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)" }}>
              What matters first.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {reviewerProofs.map((item) => (
              <article key={item.label} className="card p-5">
                <p className="mono text-xs uppercase text-blue-100">{item.label}</p>
                <h3 className="mt-3 text-lg font-semibold text-slate-50">{item.value}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
