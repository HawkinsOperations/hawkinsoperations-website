import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  recentGovernedArtifacts,
  recentGovernedArtifactsSnapshotDate,
  getArtifactBySlug,
  type RecentArtifactClass,
} from "@data/recentGovernedArtifacts";
import { ceiling, publicSafe } from "@config/site";

/**
 * /artifacts/[slug]/page.tsx
 *
 * Public-safe reviewer detail page for one recent governed work
 * artifact. Static-export compatible (generateStaticParams pre-renders
 * one page per slug). No fetch, no GitHub API call.
 *
 * Every page renders the four required claim boundary fields:
 *  - Public ceiling: CONTROLLED_TEST_VALIDATED
 *  - Public-safe state: NOT_PUBLIC_SAFE
 *  - Website rendering is not proof
 *  - Human review required
 */

const classChip: Record<RecentArtifactClass, string> = {
  DOCS_ARTIFACT:           "ledger-class ledger-class--docs",
  MERGED_PR:               "ledger-class ledger-class--merged",
  GOVERNED_LABOR:          "ledger-class ledger-class--labor",
  VERIFIER_HARDENED:       "ledger-class ledger-class--verifier",
  RECEIPT_EMITTED:         "ledger-class ledger-class--receipt",
  PUBLIC_RENDERING_UPDATE: "ledger-class ledger-class--docs",
};

export function generateStaticParams() {
  return recentGovernedArtifacts.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = getArtifactBySlug(params.slug);
  if (!a) return { title: "Artifact not found | HawkinsOperations" };
  // Keep tab title concise. Drop long brand suffix to avoid clipping.
  const short = a.title.length > 56 ? a.title.slice(0, 53).trimEnd() + "…" : a.title;
  return {
    title: `${short} | HawkinsOps`,
    description: `${a.summary} Snapshot as of ${recentGovernedArtifactsSnapshotDate}. Website rendering is not proof.`,
    alternates: {
      canonical: `/artifacts/${a.slug}/`,
    },
  };
}

export default function ArtifactReviewPage({ params }: { params: { slug: string } }) {
  const a = getArtifactBySlug(params.slug);
  if (!a) notFound();

  return (
    <article className="artifact-review">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden cockpit-section hero-cockpit">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="container">
          <nav className="artifact-review__crumb reveal reveal--up" aria-label="Breadcrumb">
            <a href="/artifacts/">Artifacts</a>
            <span> · </span>
            <span>{a.repo.replace(/^hawkinsoperations-/, "")}</span>
            <span> · </span>
            <span>#{a.pr}</span>
          </nav>

          <header className="reveal reveal--up" data-delay="1">
            <p className="hero-cockpit__eyebrow">Artifact review · static snapshot</p>
            <h1 className="hero-cockpit__headline">{a.title}</h1>
            <p className="hero-cockpit__lede">{a.summary}</p>
          </header>

          <div className="artifact-review__meta reveal reveal--up" data-delay="2">
            <span className={classChip[a.class]}>{a.class}</span>
            <span className="artifact-review__meta-item">REPO · {a.repo}</span>
            <span className="artifact-review__meta-item">PR · #{a.pr}</span>
            <span className="artifact-review__meta-item">DATE · {a.date}</span>
            <span className="ceiling-stamp" aria-label={`Public ceiling ${ceiling}`}>
              Ceiling · {ceiling}
            </span>
          </div>

          <div className="hero-cockpit__ctas reveal reveal--up" data-delay="3">
            <a className="hero-cockpit__primary" href={a.prHref} target="_blank" rel="noopener noreferrer">
              Open the PR ↗
            </a>
            {a.relatedHref && (
              <a className="hero-cockpit__secondary" href={a.relatedHref} target="_blank" rel="noopener noreferrer">
                {a.relatedLabel ?? "Open related artifact ↗"}
              </a>
            )}
            <a className="hero-cockpit__tertiary" href="/artifacts/">
              Back to artifacts →
            </a>
          </div>
        </div>
      </section>

      {/* ── Review fields ─────────────────────────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <dl className="artifact-review__fields">
            <div className="artifact-review__field spotlight">
              <dt>What changed</dt>
              <dd>{a.whatChanged}</dd>
            </div>
            <div className="artifact-review__field spotlight">
              <dt>What this supports</dt>
              <dd>{a.supports}</dd>
            </div>
            <div className="artifact-review__field artifact-review__field--block spotlight spotlight--red">
              <dt>What this does NOT prove</dt>
              <dd>{a.doesNotProve}</dd>
            </div>
            <div className="artifact-review__field artifact-review__field--route spotlight spotlight--amber">
              <dt>Review route · next inspection</dt>
              <dd>{a.reviewRoute}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── Claim boundary footer ─────────────────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="artifact-review__boundary" role="note" aria-label="Claim boundary">
            <span className="artifact-review__boundary-label">Claim boundary</span>
            <div className="artifact-review__boundary-grid">
              <div>
                <p className="artifact-review__boundary-key">Public ceiling</p>
                <p className="artifact-review__boundary-val artifact-review__boundary-val--amber">{ceiling}</p>
              </div>
              <div>
                <p className="artifact-review__boundary-key">Public-safe state</p>
                <p className="artifact-review__boundary-val artifact-review__boundary-val--block">{publicSafe}</p>
              </div>
              <div>
                <p className="artifact-review__boundary-key">Website rendering</p>
                <p className="artifact-review__boundary-val">is not proof</p>
              </div>
              <div>
                <p className="artifact-review__boundary-key">Human review</p>
                <p className="artifact-review__boundary-val">REQUIRED</p>
              </div>
            </div>
            <p className="artifact-review__boundary-note">
              This page is a public-safe reviewer surface. The artifact is a hand-maintained static
              snapshot taken on {recentGovernedArtifactsSnapshotDate}. It is not auto-updated, does
              not claim runtime-active or signal-observed status, and does not prove public-safe
              runtime proof, GPU CI proven status, model execution in CI, AI-approved disposition,
              analyst-approved disposition, autonomous SOC, fleet-wide coverage, or any external or
              customer deployment. Stronger wording requires a separate evidence-backed promotion
              gate.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
