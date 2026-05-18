import type { Metadata } from "next";
import GpuFactoryLane from "@components/GpuFactoryLane";
import RecentGovernedArtifacts from "@components/RecentGovernedArtifacts";
import StatusConsole from "@components/StatusConsole";
import {
  artifacts,
  artifactCategories,
  flagshipArtifacts,
  legacyArtifacts,
  artifactsByCategory,
  type Artifact,
  type ArtifactCategory,
} from "@data/artifacts";

export const metadata: Metadata = {
  title: "Artifacts | HawkinsOps",
  description:
    "Reviewer artifact vault: proof records, validation outputs, CI receipts, case files, and reviewer-safe packets — grouped by surface and separated by what each one can prove.",
};

const catLabel: Record<string, string> = {
  "proof-record": "PROOF RECORD",
  "case-study": "CASE STUDY",
  validation: "VALIDATION",
  "ci-verifier": "CI / VERIFIER",
  architecture: "ARCHITECTURE",
  governance: "GOVERNANCE",
  "public-packet": "PUBLIC PACKET",
  "field-note": "FIELD NOTE",
  legacy: "LEGACY",
};

const statusLabel = (status: string): string => {
  switch (status) {
    case "supported": return "SUPPORTED";
    case "rendering-only": return "RENDERING ONLY";
    case "reference": return "REFERENCE";
    case "blocked-pending-promotion": return "BLOCKED · PENDING";
    default: return status.toUpperCase();
  }
};

export default function ArtifactsIndexPage() {
  const supportingArtifacts: Artifact[] = artifacts.filter(
    (a) =>
      !a.flagship &&
      !a.legacy &&
      (a.category === "validation" ||
        a.category === "ci-verifier" ||
        a.category === "public-packet" ||
        a.category === "field-note"),
  );

  const caseStudies = artifactsByCategory("case-study");
  const proofRecordsList = artifactsByCategory("proof-record").filter((a) => !a.flagship);
  const archMaps: Artifact[] = [
    ...artifactsByCategory("architecture"),
    ...artifactsByCategory("governance").filter((a) => !a.flagship),
  ];

  const countByCategory = (key: ArtifactCategory) =>
    artifacts.filter((a) => a.category === key).length;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden cockpit-section">
        <div className="container grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 items-start">
          <div>
            <p className="cockpit-eyebrow">Reviewer evidence bay</p>
            <h1 className="cockpit-headline cockpit-headline--xl mt-5">
              Reviewer artifacts.
              <span className="block mt-2" style={{ color: "var(--electric-blue-bright)" }}>
                Each shelf keeps its own ceiling.
              </span>
            </h1>
            <p className="lede mt-7 max-w-2xl" style={{ color: "var(--silver)" }}>
              Proof records, validation outputs, CI receipts, case files, and reviewer-safe packets
              are separated by what they can prove. Website cards route reviewers to evidence; they
              are not the evidence.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a className="cta cta-primary" href="#anchors">See the anchor artifacts →</a>
              <a className="cta cta-quiet" href="#shelves">Browse shelves</a>
              <a className="cta cta-quiet" href="/proof/">Proof ledger</a>
            </div>
          </div>

          <div className="lg:pt-2">
            <StatusConsole />
          </div>
        </div>

        <div className="container mt-12">
          <hr className="cockpit-rule" />
        </div>
      </section>

      {/* ── Featured GPU / Factory governed lane ─────────────────────── */}
      <section id="recent-governed-work" className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <GpuFactoryLane />
        </div>
      </section>

      {/* ── Recent governed work · grouped by surface ────────────────── */}
      <section id="by-surface" className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <div className="mb-5">
            <p className="cockpit-eyebrow">Recent governed work · by surface</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)" }}>
              Grouped by where the work lives.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl" style={{ color: "#B7C4D6" }}>
              Each group is a hand-maintained static snapshot. Cards open public-safe reviewer review
              pages. No card claims runtime-active, signal-observed, or public-safe runtime proof.
            </p>
          </div>

          <div className="surface-group">
            <div className="surface-group__head">
              <h3 className="surface-group__title">Proof · case studies</h3>
              <span className="surface-group__eyebrow">Evidence boundary</span>
            </div>
            <p className="surface-group__sub">
              Proof-repo updates and reviewer-visible case studies. Does not promote runtime or
              public-safe runtime proof.
            </p>
            <RecentGovernedArtifacts surface="proof" heading="Proof / case study artifacts" eyebrow="Proof surface" sub="Proof-repo updates and reviewer-visible case studies." />
          </div>

          <div className="surface-group">
            <div className="surface-group__head">
              <h3 className="surface-group__title">Platform · GPU · Factory</h3>
              <span className="surface-group__eyebrow">Governed labor</span>
            </div>
            <p className="surface-group__sub">
              Platform-repo work — bounded workflow gates, receipt emission, and Detection Factory
              Controller status packets. Governed labor only; does not claim model execution in CI or
              GPU CI proven status.
            </p>
            <RecentGovernedArtifacts surface="platform" heading="Platform / GPU / Factory artifacts" eyebrow="Platform surface" sub="Bounded workflow gates and receipts. Governed labor only." />
          </div>

          <div className="surface-group">
            <div className="surface-group__head">
              <h3 className="surface-group__title">Validation · verifiers</h3>
              <span className="surface-group__eyebrow">Controlled-test boundary</span>
            </div>
            <p className="surface-group__sub">
              Validation-repo verifier work for HO-DET-001 AI triage. Closes controlled-test edge
              cases; runtime and signal-observed status remain blocked at this surface.
            </p>
            <RecentGovernedArtifacts surface="validation" heading="Validation / verifier artifacts" eyebrow="Validation surface" sub="Controlled-test verifier work." />
          </div>

          <div className="surface-group">
            <div className="surface-group__head">
              <h3 className="surface-group__title">Website · public rendering</h3>
              <span className="surface-group__eyebrow">Public rendering</span>
            </div>
            <p className="surface-group__sub">
              Website-repo updates. Public rendering only — website rendering is not proof.
            </p>
            <RecentGovernedArtifacts surface="website" heading="Website / public rendering artifacts" eyebrow="Website surface" sub="Public rendering updates only." />
          </div>

          <div className="biz-translate mt-6" role="note" aria-label="Business translation">
            <span className="biz-translate__label">In plain English</span>
            <span><span className="biz-translate__text">Recently merged work is reviewer-visible and routes back to the upstream PR. The cards are bounded snapshots; they are not auto-updated and they do not promote runtime claims.</span></span>
          </div>
        </div>
      </section>

      {/* ── Vault shelf selector ─────────────────────────────────────── */}
      <section id="shelves" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Shelves</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Pick a shelf · the ceiling travels with the artifact.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Categories describe what the artifact authoritatively renders. Website rendering is
              not proof, and legacy material does not promote current claims.
            </p>
          </div>

          <nav className="vault-shelf" aria-label="Vault shelf navigation">
            <span className="vault-shelf__rail" aria-hidden="true" />
            {artifactCategories.map((cat) => {
              const count = countByCategory(cat.key);
              return (
                <a key={cat.key} className="vault-shelf__slot" href={`#cat-${cat.key}`}>
                  <span className="vault-shelf__cat">{cat.label}</span>
                  <span className="vault-shelf__label">{count} {count === 1 ? "artifact" : "artifacts"}</span>
                  <span className="vault-shelf__count">on this shelf</span>
                </a>
              );
            })}
          </nav>
        </div>
      </section>

      {/* ── Anchor artifacts ─────────────────────────────────────────── */}
      <section id="anchors" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Reviewer anchors</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Start with the proof-bearing artifacts.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              The proof record holds the bounded ceiling. The doctrine keeps rendering separate
              from proof. The route line below shows how the rendered card points back to evidence.
            </p>
          </div>

          <div className="anchor-spread-grid">
            {flagshipArtifacts.map((artifact) => {
              const isExternal = artifact.primary.external === true;
              return (
                <a
                  key={artifact.slug}
                  className="anchor-spread"
                  href={artifact.primary.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={`${artifact.primary.label}: ${artifact.title}`}
                >
                  <header className="anchor-spread__head">
                    <span className="anchor-spread__cat">{catLabel[artifact.category] ?? artifact.category}</span>
                    <span className="chip chip-quiet">{statusLabel(artifact.status)}</span>
                  </header>
                  <h3 className="anchor-spread__title">{artifact.title}</h3>
                  <p className="anchor-spread__body">{artifact.description}</p>

                  <div className="anchor-spread__rail" aria-hidden="true">
                    <span className="anchor-spread__rail-pill">{artifact.truthSurface.toUpperCase()}</span>
                    <span className="anchor-spread__rail-arrow" />
                    <span className="anchor-spread__rail-pill">{artifact.proofCeiling ?? "RENDERING"}</span>
                  </div>

                  <dl className="anchor-spread__meta">
                    <div className="anchor-spread__meta-cell">
                      <dt>Proves</dt>
                      <dd>{artifact.proves}</dd>
                    </div>
                    <div className="anchor-spread__meta-cell">
                      <dt>Does not prove</dt>
                      <dd>{artifact.doesNotProve}</dd>
                    </div>
                  </dl>

                  <span className="anchor-spread__cta">{artifact.primary.label} {isExternal ? "↗" : "→"}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Artifact coverage matrix ─────────────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Reviewer evidence coverage</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Artifact coverage matrix.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Each row is an artifact family. Each column is an authority surface. Cells declare what
              exists in public, what is routed by the website, and what is held private or blocked.
              The matrix does not promote claims; it shows what is covered and what is not.
            </p>
          </div>

          <div className="coverage-matrix" role="table" aria-label="Reviewer artifact coverage matrix">
            <div className="coverage-matrix__head" role="row">
              <span role="columnheader">Artifact family</span>
              <span role="columnheader">Source</span>
              <span role="columnheader">Validation</span>
              <span role="columnheader">Proof</span>
              <span role="columnheader">Website</span>
              <span role="columnheader">Private evidence</span>
              <span role="columnheader">Public status</span>
            </div>

            {[
              {
                family: "HO-DET-001 proof loop",
                cells: ["present", "present", "present", "routed", "—", "controlled-test"],
              },
              {
                family: "Proof Pack 001",
                cells: ["present", "present", "routed", "routed", "—", "pending"],
              },
              {
                family: "HO-DET-001 detection source",
                cells: ["present", "present", "routed", "routed", "—", "controlled-test"],
              },
              {
                family: "Validation CI / report",
                cells: ["present", "present", "routed", "routed", "—", "present"],
              },
              {
                family: "Backend adapter · field mapping",
                cells: ["private", "private", "—", "reference", "private", "blocked"],
              },
              {
                family: "AI support · GPU support",
                cells: ["private", "private", "—", "—", "private", "blocked"],
              },
              {
                family: "NDR · Security Onion record",
                cells: ["private", "—", "reference", "reference", "private", "unpublished"],
              },
              {
                family: "ATT&CK alignment matrix",
                cells: ["pending", "—", "—", "pending", "—", "pending"],
              },
              {
                family: "Governance · review authority",
                cells: ["present", "present", "routed", "routed", "—", "present"],
              },
              {
                family: "Website proof routing",
                cells: ["present", "present", "routed", "routed", "—", "rendering"],
              },
            ].map((row) => (
              <div key={row.family} className="coverage-matrix__row" role="row">
                <span className="coverage-matrix__family" role="cell">{row.family}</span>
                {row.cells.map((value, i) => (
                  <span
                    key={i}
                    className={`coverage-matrix__cell coverage-matrix__cell--${value}`}
                    role="cell"
                    data-value={value}
                  >
                    {value === "—" ? "—" : value}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <p className="muted mt-6 text-xs leading-5 max-w-3xl">
            Legend · <span className="mono">present</span> = public artifact exists on its authority repo ·
            {" "}<span className="mono">routed</span> = website surface points to the receipt ·
            {" "}<span className="mono">private</span> = held in private/internal evidence, not public ·
            {" "}<span className="mono">reference</span> = referenced but not promoted ·
            {" "}<span className="mono">blocked</span> = not eligible for public claim until promotion gate clears ·
            {" "}<span className="mono">pending</span> = candidate route, not yet implemented.
            Website rendering is not proof; the matrix only describes coverage state.
          </p>
        </div>
      </section>

      {/* ── Bounded narratives (records + case studies) ─────────────── */}
      <section id="cat-proof-record" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Records · Case studies</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Bounded narratives · ceiling stays with the artifact.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Each record holds its proof ceiling and the surface it routes back to. Case studies
              preserve the same boundary.
            </p>
          </div>

          <div className="record-row-grid" id="cat-case-study">
            {[...proofRecordsList, ...caseStudies].map((artifact) => {
              const isExternal = artifact.primary.external === true;
              return (
                <a
                  key={artifact.slug}
                  className="record-row"
                  href={artifact.primary.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  <header className="record-row__head">
                    <span className="record-row__cat">{catLabel[artifact.category]}</span>
                    <span className="chip chip-quiet">{statusLabel(artifact.status)}</span>
                    {artifact.proofCeiling && <span className="chip chip-warn">{artifact.proofCeiling}</span>}
                  </header>
                  <h3 className="record-row__title">{artifact.title}</h3>
                  <p className="record-row__desc">{artifact.description}</p>
                  <dl className="record-row__meta">
                    <div className="record-row__meta-cell">
                      <span className="record-row__meta-label">Proves</span>
                      <span className="record-row__meta-value">{artifact.proves}</span>
                    </div>
                    <div className="record-row__meta-cell">
                      <span className="record-row__meta-label">Does not prove</span>
                      <span className="record-row__meta-value">{artifact.doesNotProve}</span>
                    </div>
                  </dl>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Supporting receipts conveyor ─────────────────────────────── */}
      <section id="cat-validation" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Validation · CI · Public packets · Field notes</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Supporting receipts conveyor.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Validation outputs, the deterministic CI scanner, reviewer-safe packets, and short
              technical field notes. Each cell routes to its named receipt.
            </p>
          </div>

          <div id="cat-ci-verifier" className="receipt-conveyor">
            {supportingArtifacts.map((artifact) => {
              const isExternal = artifact.primary.external === true;
              return (
                <a
                  key={artifact.slug}
                  className="receipt-conveyor__cell"
                  href={artifact.primary.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  <span className="receipt-conveyor__cat">{catLabel[artifact.category]}</span>
                  <span className="receipt-conveyor__title">{artifact.title}</span>
                  <span className="receipt-conveyor__desc">{artifact.description}</span>
                  <span className="receipt-conveyor__link">{isExternal ? "Open ↗" : "Open →"}</span>
                </a>
              );
            })}
          </div>
          <div id="cat-public-packet" aria-hidden="true" />
          <div id="cat-field-note" aria-hidden="true" />
        </div>
      </section>

      {/* ── Architecture · Governance ───────────────────────────────── */}
      <section id="cat-architecture" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Architecture · Governance</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Plane separation · authority routing.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              System maps and governance documents. Compact lanes — one line, one route.
            </p>
          </div>

          <div id="cat-governance" className="receipt-lanes">
            {archMaps.map((artifact) => {
              const isExternal = artifact.primary.external === true;
              return (
                <a
                  key={artifact.slug}
                  className="receipt-lane"
                  href={artifact.primary.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  <span className="receipt-lane__route">{catLabel[artifact.category]}</span>
                  <span className="receipt-lane__title">{artifact.title}</span>
                  <span className="receipt-lane__desc">{artifact.description}</span>
                  <span className="receipt-lane__inspect">{isExternal ? "Open ↗" : "Open →"}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Legacy archive strip ─────────────────────────────────────── */}
      <section id="cat-legacy" className="cockpit-section--tight pb-24">
        <div className="container">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="cockpit-eyebrow">Legacy archive</p>
              <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }}>
                Reference only · does not promote current claims.
              </h2>
            </div>
            <a className="cta cta-quiet" href="/legacy/">Open the legacy boundary →</a>
          </div>

          <div className="archive-strip">
            <span className="archive-strip__label">Archive · reference material</span>
            <div className="grid gap-2 md:grid-cols-2">
              {legacyArtifacts.map((artifact) => {
                const isExternal = artifact.primary.external === true;
                return (
                  <a
                    key={artifact.slug}
                    className="archive-row"
                    href={artifact.primary.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                    <span>
                      <strong>{artifact.title}</strong>
                      <span className="ml-2 muted text-xs">{artifact.description}</span>
                    </span>
                    <span className="archive-row__tag">{isExternal ? "OPEN ↗" : "OPEN →"}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
