import type { Metadata } from "next";
import EvidenceBay from "@components/EvidenceBay";
import GpuFactoryLane from "@components/GpuFactoryLane";
import RecentGovernedArtifacts from "@components/RecentGovernedArtifacts";
import StatusConsole from "@components/StatusConsole";
import { flagshipArtifacts } from "@data/artifacts";

export const metadata: Metadata = {
  title: "Artifacts | HawkinsOps",
  description:
    "Reviewer evidence bay: proof records, validation outputs, CI receipts, case files, and reviewer-safe packets — filterable by family and separated by what each one can prove.",
  alternates: {
    canonical: "/artifacts/",
  },
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
                Each card keeps its own ceiling.
              </span>
            </h1>
            <p className="lede mt-7 max-w-2xl" style={{ color: "var(--silver)" }}>
              Filter the evidence by family. Every card routes reviewers to the receipt and states
              what it supports and what it does not prove. Website cards are not the evidence.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a className="cta cta-primary" href="#evidence-bay">Open the evidence bay →</a>
              <a className="cta cta-quiet" href="#anchors">Anchor artifacts</a>
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

      {/* ── Evidence Bay · filterable control room ───────────────────── */}
      <section id="evidence-bay" className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Evidence bay</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Filter by family · the ceiling travels with the artifact.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              One control room for every reviewer artifact. Pick a family; each card shows its owning
              surface, what it supports, what it does not prove, and where to inspect it.
            </p>
          </div>
          <EvidenceBay />
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
              from proof. The route line shows how the rendered card points back to evidence.
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
              Each group is a hand-maintained static snapshot. Cards open reviewer review pages. No
              card claims runtime-active, signal-observed, or public-safe runtime proof.
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
        </div>
      </section>

      {/* ── Artifact family coverage matrix ──────────────────────────── */}
      <section className="cockpit-section--tight pb-24">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Reviewer evidence coverage</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Artifact family coverage.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              This matrix groups <strong>artifact families</strong> across planes. Cells declare what
              exists in public, what the website routes, and what is held private or blocked. The
              matrix does not promote claims; it shows family-level coverage.
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
                family: "Cyber Kill Chain / ATT&CK reviewer map",
                cells: ["present", "present", "routed", "routed", "—", "rendering"],
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
    </>
  );
}
