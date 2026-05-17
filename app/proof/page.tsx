import type { Metadata } from "next";
import ArtifactFamilyMatrix from "@components/ArtifactFamilyMatrix";
import StatusChip from "@components/StatusChip";
import SectionEyebrow from "@components/SectionEyebrow";
import ProofCeilingDisplay from "@components/ProofCeilingDisplay";
import { allowedClaims, promotionRequirements } from "@data/claims";
import { blockedClaims } from "@config/blocked-claims";
import { proofRecords } from "@data/proofRecords";
import { externalLinks } from "@data/navigation";

export const metadata: Metadata = {
  title: "Proof Ledger | HawkinsOperations Detection Engineering SOC",
  description:
    "HawkinsOperations proof ledger: current public proof ceiling, supported claims, blocked claims, proof records, validation status, and promotion gates.",
};

const gridBg =
  "linear-gradient(to right, rgba(201,211,223,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,211,223,0.06) 1px, transparent 1px)";

export default function ProofIndexPage() {
  const allowedRows = allowedClaims.map((c, i) => ({
    id: `A·${String(i + 1).padStart(2, "0")}`,
    scope: i < 2 ? "system" : i < 4 ? "HO-DET-001" : "system",
    text: c,
  }));

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
        </div>

        <div className="container relative pt-14 pb-10 lg:pt-20">
          <div className="flex flex-wrap items-center gap-2">
            <StatusChip label="PROOF AUTHORITY SURFACE" tone="ice" />
            <StatusChip label="LEDGER · ACTIVE" />
            <StatusChip label="WEBSITE RENDERING IS NOT PROOF" tone="block" />
          </div>

          <h1 className="headline mt-6 text-[clamp(2.2rem,5vw,3.8rem)]">Proof ledger</h1>
          <p className="lede mt-5 max-w-3xl">
            Website rendering is not proof. This page routes reviewers to proof records, validation artifacts, and bounded claim surfaces.
          </p>
        </div>
      </section>

      <section className="container section-tight">
        <SectionEyebrow eyebrow="01 · Ceiling" title="Current public proof ceiling" />
        <div className="status-band signature-status-module">
          <span className="status-band__rule" aria-hidden="true"></span>
          <div className="grid gap-6 md:grid-cols-[1.6fr_1fr] md:items-center">
            <ProofCeilingDisplay size="xl" />
            <div className="flex flex-col gap-2 text-sm leading-6 text-[var(--muted)] md:items-end md:text-right">
              <p>Validation surface — controlled-test scope.</p>
              <p>Public rendering — routing only.</p>
              <p className="mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--silver)]">
                Last reviewed · 2026-05-02
              </p>
            </div>
          </div>
        </div>
        <p className="muted mt-5 max-w-3xl text-sm leading-6">
          HawkinsOperations is presented at a controlled-test validation ceiling. Stronger runtime, signal, evidence, and public-safe claims require separate evidence-backed promotion.
        </p>
      </section>

      <section className="container section-tight">
        <SectionEyebrow
          eyebrow="02 · Supported"
          title="Supported public claims"
          description="Each row maps a supported claim to its scope. Claims outside this ledger require separate promotion."
        />
        <div className="ledger" style={{ ["--ledger-cols" as string]: "0.5fr 0.7fr 2.4fr" } as React.CSSProperties}>
          <div className="ledger__head">
            <div>ID</div>
            <div>Scope</div>
            <div>Claim</div>
          </div>
          {allowedRows.map((row) => (
            <div key={row.id} className="ledger__row ledger__row--static">
              <div className="ledger__cell ledger__cell--mono" data-label="ID">{row.id}</div>
              <div className="ledger__cell ledger__cell--muted" data-label="Scope">{row.scope}</div>
              <div className="ledger__cell" data-label="Claim">{row.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container section-tight">
        <SectionEyebrow
          eyebrow="03 · Blocked"
          title="Blocked public claims"
          description="Visible by design. Blocked claims remain blocked unless separate evidence-backed promotion changes their state."
        />
        <div
          className="ledger ledger--blocked"
          data-ci-target="blocked-claims"
          style={{ ["--ledger-cols" as string]: "0.52fr 1.15fr 1.55fr" } as React.CSSProperties}
        >
          <div className="ledger__head">
            <div>State</div>
            <div>Term</div>
            <div>Why blocked</div>
          </div>
          {blockedClaims.map((claim) => (
            <div key={claim} className="ledger__row ledger__row--static ledger__row--block">
              <div className="ledger__cell ledger__cell--mono ledger__cell--blocked-state" data-label="State">
                BLOCKED
              </div>
              <div className="ledger__cell" data-label="Term">
                <strong>{claim}</strong>
              </div>
              <div className="ledger__cell ledger__cell--reason" data-label="Why blocked">
                No evidence-backed promotion has cleared this term for the public surface.
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container section-tight">
        <SectionEyebrow
          eyebrow="03b · Registry"
          title="Artifact registry preview"
          description="Seven artifact families by four evidence axes. Filled cells are supported at the current ceiling; hollow cells require a specific promotion gate."
        />
        <div className="mt-5">
          <ArtifactFamilyMatrix />
        </div>
      </section>

      <section className="container section-tight">
        <SectionEyebrow
          eyebrow="04 · Records"
          title="Proof records"
          description="Each record holds its bounded ceiling, supported state, and what is not claimed."
        />
        <div className="grid gap-5">
          {proofRecords.map((record) => (
            <article
              key={record.detectionId}
              className="proof-record-panel moon-panel-strong overflow-hidden"
              data-detection-id={record.detectionId}
              data-proof-ceiling={record.proofLevel}
            >
              <header className="grid gap-6 border-b border-[var(--moon-border)] p-7 md:grid-cols-[1.4fr_1fr] md:items-center">
                <div>
                  <p className="mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--ice-blue)]">Detection ID</p>
                  <h3 className="mt-2 text-3xl font-semibold text-[var(--silver-bright)]">{record.detectionId}</h3>
                  <p className="mt-1 text-[var(--muted)]">{record.title}</p>
                </div>
                <div className="md:text-right">
                  <p className="mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--silver)]">Ceiling</p>
                  <div className="mt-2 md:flex md:justify-end">
                    <ProofCeilingDisplay />
                  </div>
                </div>
              </header>

              <dl className="grid grid-cols-2 md:grid-cols-4 text-sm">
                <div className="border-r border-[var(--moon-border)] p-5">
                  <dt className="mono text-[0.58rem] tracking-[0.2em] uppercase text-[var(--silver)]">Validation</dt>
                  <dd className="mt-2 text-[var(--silver-bright)]" data-ci-target="validation-status">
                    {record.validationState}
                  </dd>
                </div>
                <div className="border-r border-[var(--moon-border)] p-5 md:border-r">
                  <dt className="mono text-[0.58rem] tracking-[0.2em] uppercase text-[var(--silver)]">Runtime</dt>
                  <dd className="mt-2 text-[#FCA5A5]">{record.runtimeState}</dd>
                </div>
                <div className="border-t border-[var(--moon-border)] p-5 md:border-t-0 md:border-r">
                  <dt className="mono text-[0.58rem] tracking-[0.2em] uppercase text-[var(--silver)]">Signal</dt>
                  <dd className="mt-2 text-[#FCA5A5]">{record.signalState}</dd>
                </div>
                <div className="border-l border-t border-[var(--moon-border)] p-5 md:border-l md:border-t-0">
                  <dt className="mono text-[0.58rem] tracking-[0.2em] uppercase text-[var(--silver)]">Public-safe</dt>
                  <dd className="mt-2 text-[var(--silver-bright)]">{record.publicSafeState}</dd>
                </div>
              </dl>

              <footer className="flex flex-wrap gap-3 border-t border-[var(--moon-border)] p-7">
                {record.caseFileHref && (
                  <a className="cta cta-primary" href={record.caseFileHref}>
                    Open case file →
                  </a>
                )}
                <a
                  className={record.caseFileHref ? "cta cta-quiet" : "cta cta-primary"}
                  href={record.proofRepoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Proof repo record ↗
                </a>
                <a className="cta cta-quiet" href={record.sourceRepoLink} target="_blank" rel="noopener noreferrer">
                  Source repo ↗
                </a>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-tight">
        <SectionEyebrow eyebrow="05 · Boundary" title="What this proves — and what it does not" />
        <div className="grid gap-3">
          <div className="status-band">
            <span className="status-band__rule" aria-hidden="true"></span>
            <div>
              <p className="mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--ice-blue)]">PROVES</p>
              <p className="mt-1 text-sm leading-6 text-[var(--silver)]">
                The public proof ceiling is stated, controlled-test validation passed inside its declared scope, blocked promotions are visible, and reviewers can route from rendered surface to record to source.
              </p>
            </div>
          </div>
          <div className="status-band status-band--block">
            <span className="status-band__rule" aria-hidden="true"></span>
            <div>
              <p className="mono text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: "#FCA5A5" }}>
                DOES NOT PROVE
              </p>
              <p className="mt-1 text-sm leading-6 text-[var(--silver)]">
                Runtime activation, signal observation, fleet scope, autonomous SOC, AI-approved disposition, public-safe runtime proof — none of these are claimed from this surface.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-tight">
        <SectionEyebrow
          eyebrow="06 · Gates"
          title="Promotion requirements"
          description="Before stronger public wording can ship."
        />
        <div className="ledger" style={{ ["--ledger-cols" as string]: "0.45fr 3fr" } as React.CSSProperties}>
          <div className="ledger__head">
            <div>Gate</div>
            <div>Requirement</div>
          </div>
          {promotionRequirements.map((item, i) => (
            <div key={i} className="ledger__row ledger__row--static">
              <div className="ledger__cell ledger__cell--mono" data-label="Gate">{`G·${String(i + 1).padStart(2, "0")}`}</div>
              <div className="ledger__cell" data-label="Requirement">{item}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container section-tight pb-24">
        <SectionEyebrow eyebrow="07 · Routes" title="Control links" />
        <div className="grid gap-3 md:grid-cols-3">
          <a className="artifact-tile" href="/controls/">
            <span className="artifact-tile__cat">CLAIM FIREWALL</span>
            <span className="artifact-tile__title">Allowed and blocked wording</span>
            <span className="artifact-tile__desc">
              The firewall keeps validation results from being stretched into runtime or signal language.
            </span>
            <span className="artifact-tile__link">Open →</span>
          </a>
          <a className="artifact-tile" href="/architecture/">
            <span className="artifact-tile__cat">ARCHITECTURE</span>
            <span className="artifact-tile__title">Plane separation map</span>
            <span className="artifact-tile__desc">Where each surface lives and what its promotion gate looks like.</span>
            <span className="artifact-tile__link">Open →</span>
          </a>
          <a className="artifact-tile" href={externalLinks.controlMatrix} target="_blank" rel="noopener noreferrer">
            <span className="artifact-tile__cat">CONTROL MATRIX ↗</span>
            <span className="artifact-tile__title">Status routing</span>
            <span className="artifact-tile__desc">
              Routing surface for HawkinsOperations control ownership and promotion state.
            </span>
            <span className="artifact-tile__link">Open ↗</span>
          </a>
        </div>
      </section>
    </>
  );
}
