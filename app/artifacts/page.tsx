import type { Metadata } from "next";
import StatusChip, { type ChipTone } from "@components/StatusChip";
import SectionEyebrow from "@components/SectionEyebrow";
import ArtifactCard from "@components/ArtifactCard";
import {
  artifacts,
  artifactCategories,
  flagshipArtifacts,
  legacyArtifacts,
  artifactsByCategory,
} from "@data/artifacts";

export const metadata: Metadata = {
  title: "Artifacts | HawkinsOperations Detection Engineering SOC",
  description:
    "HawkinsOperations Artifacts: a routed library of reviewer-safe receipts — proof cards, validation outputs, case studies, diagrams, CI records, and bounded evidence surfaces.",
};

const gridBg =
  "linear-gradient(to right, rgba(201,211,223,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,211,223,0.06) 1px, transparent 1px)";

const statusBadge = (status: string): { label: string; tone: ChipTone } => {
  switch (status) {
    case "supported":
      return { label: "SUPPORTED", tone: "ice" };
    case "rendering-only":
      return { label: "RENDERING ONLY", tone: "default" };
    case "reference":
      return { label: "REFERENCE", tone: "quiet" };
    case "blocked-pending-promotion":
      return { label: "BLOCKED · PENDING", tone: "block" };
    default:
      return { label: status.toUpperCase(), tone: "default" };
  }
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

export default function ArtifactsIndexPage() {
  const supportingArtifacts = artifacts.filter(
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
  const archMaps = [
    ...artifactsByCategory("architecture"),
    ...artifactsByCategory("governance").filter((a) => !a.flagship),
  ];

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage: gridBg,
              backgroundSize: "64px 64px",
              maskImage: "radial-gradient(ellipse at 50% 0%, black 0%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, black 0%, transparent 70%)",
            }}
          ></div>
          <div
            className="absolute -top-40 right-0 size-[520px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(143,216,255,0.06), transparent 60%)",
              filter: "blur(20px)",
            }}
          ></div>
        </div>

        <div className="container relative pt-14 pb-10 lg:pt-20">
          <div className="flex flex-wrap items-center gap-2">
            <StatusChip label="EVIDENCE VAULT" tone="ice" />
            <StatusChip label="PUBLIC-FACING SHELVES" />
            <StatusChip label="WEBSITE RENDERING IS NOT PROOF" tone="block" />
          </div>

          <h1 className="headline mt-6 text-[clamp(2.2rem,5vw,3.8rem)]">Reviewer artifacts</h1>
          <p className="lede mt-5 max-w-3xl">
            Proof records, validation outputs, CI verifier records, and reviewer-safe packets first. Every artifact keeps its own ceiling.
          </p>

          <ul className="muted mt-7 grid max-w-3xl gap-1 text-sm leading-6 md:grid-cols-2">
            <li>· Artifacts are not automatically proof.</li>
            <li>· Screenshots are not automatically evidence.</li>
            <li>· Website cards are not proof records.</li>
            <li>· Legacy artifacts do not promote current claims.</li>
            <li>· Private runtime artifacts stay private until sanitized.</li>
            <li>· Case studies preserve their proof ceiling.</li>
          </ul>
        </div>
      </section>

      <section className="container section-snug">
        <nav aria-label="Shelf navigation" className="shelf-nav hairline">
          <ul className="shelf-nav__list flex flex-wrap items-center gap-x-6 gap-y-2 py-5 text-sm">
            {artifactCategories.map((cat) => (
              <li key={cat.key}>
                <a
                  className="mono text-[0.66rem] tracking-[0.18em] uppercase text-[var(--silver)] hover:text-[var(--ice-blue)]"
                  href={`#cat-${cat.key}`}
                >
                  {cat.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section className="container section-tight" id="cat-flagship">
        <SectionEyebrow
          eyebrow="Reviewer anchors"
          title="Start with the proof-bearing artifacts"
          description="The proof record holds the bounded ceiling. The doctrine keeps rendering separate from proof."
        />
        <div className="grid gap-6 lg:grid-cols-1 xl:grid-cols-2">
          {flagshipArtifacts.map((artifact) => {
            const sb = statusBadge(artifact.status);
            const isExternal = artifact.primary.external === true;
            return (
              <a
                key={artifact.slug}
                className="flagship-spread"
                data-artifact={artifact.slug}
                href={artifact.primary.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-label={`${artifact.primary.label}: ${artifact.title}`}
              >
                <div className="flagship-spread__rail">
                  <div>
                    <p className="mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--ice-blue)]">
                      {catLabel[artifact.category] ?? artifact.category}
                    </p>
                    <h3 className="mt-3 text-[1.65rem] font-semibold leading-tight text-[var(--silver-bright)]">
                      {artifact.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <StatusChip label={sb.label} tone={sb.tone} />
                    {artifact.proofCeiling && <StatusChip label={artifact.proofCeiling} tone="warn" />}
                    <StatusChip label={artifact.truthSurface.toUpperCase()} tone="quiet" />
                  </div>
                </div>
                <div className="flagship-spread__body">
                  <p className="text-[var(--silver)] leading-relaxed">{artifact.description}</p>
                  <dl className="grid gap-3 border-t border-[var(--moon-border)] pt-4 text-sm">
                    <div className="grid grid-cols-[7em_1fr] gap-3">
                      <dt className="mono text-[0.6rem] tracking-[0.18em] uppercase text-[var(--silver)]">Proves</dt>
                      <dd className="text-[var(--muted)] leading-6">{artifact.proves}</dd>
                    </div>
                    <div className="grid grid-cols-[7em_1fr] gap-3">
                      <dt className="mono text-[0.6rem] tracking-[0.18em] uppercase text-[var(--silver)]">
                        Does not prove
                      </dt>
                      <dd className="text-[var(--muted)] leading-6">{artifact.doesNotProve}</dd>
                    </div>
                  </dl>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="surface-link-label surface-link-label--primary" aria-hidden="true">
                      {artifact.primary.label} →
                    </span>
                    {artifact.secondary && (
                      <span className="surface-link-label surface-link-label--quiet" aria-hidden="true">
                        {artifact.secondary.label}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section className="container section-tight" id="cat-proof-record">
        <SectionEyebrow
          eyebrow="Records · Case studies"
          title="Bounded narratives"
          description="Each record holds its proof ceiling. Case studies preserve the same boundary."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {[...proofRecordsList, ...caseStudies].map((artifact) => (
            <ArtifactCard key={artifact.slug} artifact={artifact} />
          ))}
        </div>
      </section>

      <section className="container section-tight" id="cat-validation">
        <SectionEyebrow
          eyebrow="Validation · CI · Public packets"
          title="Supporting receipts"
          description="Compact rack: validation outputs, the deterministic CI scanner, and reviewer-safe packets."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {supportingArtifacts.map((artifact) => {
            const isExternal = artifact.primary.external === true;
            return (
              <a
                key={artifact.slug}
                className="artifact-tile"
                href={artifact.primary.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
              >
                <span className="artifact-tile__cat">{catLabel[artifact.category]}</span>
                <span className="artifact-tile__title">{artifact.title}</span>
                <span className="artifact-tile__desc">{artifact.description}</span>
                <span className="artifact-tile__link">{isExternal ? "Open ↗" : "Open →"}</span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="container section-tight" id="cat-architecture">
        <SectionEyebrow
          eyebrow="Architecture · Governance"
          title="Plane separation and authority"
          description="System maps and governance documents. Compact rows — one line, one route."
        />
        <div className="ledger" style={{ ["--ledger-cols" as string]: "1.4fr 2fr 0.5fr" } as React.CSSProperties}>
          <div className="ledger__head">
            <div>Artifact</div>
            <div>What it routes</div>
            <div>Status</div>
          </div>
          {archMaps.map((artifact) => {
            const isExternal = artifact.primary.external === true;
            const sb = statusBadge(artifact.status);
            return (
              <a
                key={artifact.slug}
                className="ledger__row ledger__row--link"
                href={artifact.primary.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
              >
                <div className="ledger__cell" data-label="Artifact">
                  <strong>{artifact.title}</strong> <span className="muted text-xs">{isExternal ? "↗" : "→"}</span>
                </div>
                <div className="ledger__cell ledger__cell--muted" data-label="Routes">
                  {artifact.description}
                </div>
                <div className="ledger__cell" data-label="Status">
                  <StatusChip label={sb.label} tone={sb.tone} />
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section className="container section-tight pb-20" id="cat-legacy">
        <SectionEyebrow
          eyebrow="Legacy"
          title="Reference material"
          description="Older HawkinsOps material is reference-only. Current claims require current evidence and promotion gates."
          align="between"
          cta={{ label: "Open the legacy boundary", href: "/legacy/" }}
        />
        <div className="grid gap-3 md:grid-cols-2">
          {legacyArtifacts.map((artifact) => {
            const isExternal = artifact.primary.external === true;
            return (
              <a
                key={artifact.slug}
                className="legacy-quiet"
                href={artifact.primary.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
              >
                <span>
                  <strong>{artifact.title}</strong> · {artifact.description}
                </span>
                <span className="mono text-[0.62rem] tracking-[0.18em] uppercase shrink-0">
                  {isExternal ? "Open ↗" : "Open →"}
                </span>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}
