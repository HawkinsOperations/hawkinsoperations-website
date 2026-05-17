import type { Metadata } from "next";
import BrandMark from "@components/BrandMark";
import StatusChip from "@components/StatusChip";
import SectionEyebrow from "@components/SectionEyebrow";
import PortraitCommandFrame from "@components/PortraitCommandFrame";
import { externalLinks } from "@data/navigation";

export const metadata: Metadata = {
  title: "About | HawkinsOperations Detection Engineering SOC",
  description:
    "Operator profile and methodology for HawkinsOperations Detection Engineering SOC: detection engineering, SOC automation, manufacturing quality-control transfer, and AI governance.",
};

const gridBg =
  "linear-gradient(to right, rgba(201,211,223,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,211,223,0.06) 1px, transparent 1px)";

const transferRows = [
  { left: "Standard work", right: "Detection-as-code", note: "Reviewable, repeatable, owned." },
  { left: "Traceability", right: "Evidence records", note: "Bounded artifacts, retained." },
  { left: "Defect control", right: "Validation failures", note: "Deterministic, gated, surfaced." },
  { left: "Escalation paths", right: "Human review gates", note: "Operator-approved promotion." },
  { left: "Quality gates", right: "CI / verifier enforcement", note: "Wording cannot ship until checks pass." },
];

const isItems = [
  "Governed detection engineering SOC.",
  "Proof-bound security engineering system.",
  "Public reviewer surface with bounded claims.",
];

const isNotItems = [
  "Autonomous SOC is blocked / not claimed.",
  "Production SOC is blocked / not claimed.",
  "Fleet-wide enterprise deployment is blocked / not claimed.",
  "Public-safe runtime proof is blocked / not claimed.",
];

export default function AboutPage() {
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

        <div className="container relative grid gap-12 pt-14 pb-14 lg:grid-cols-[1.45fr_0.85fr] lg:pt-20 lg:pb-20 lg:gap-14">
          <div className="order-1">
            <div className="flex flex-wrap items-center gap-2">
              <BrandMark size="sm" />
              <StatusChip label="OPERATOR PROFILE" tone="ice" />
              <span className="mono text-[0.6rem] tracking-[0.22em] uppercase text-[var(--muted)]">
                methodology · governance · ai
              </span>
            </div>

            <h1 className="headline mt-6 text-[clamp(2rem,4.6vw,3.4rem)]">
              Raylee Hawkins
              <span className="block mt-2 text-[0.55em] font-medium text-[var(--ice-blue)] tracking-tight">
                Detection engineer · SOC production
              </span>
            </h1>

            <p className="lede mt-6 max-w-2xl">
              Building a governed detection engineering SOC workflow — proof-bound, evidence-routed, quality-controlled.
            </p>
            <p className="muted mt-4 max-w-2xl text-base leading-7">
              Manufacturing quality control taught the discipline. Detection engineering inherits it: standard work, traceability, defect control, escalation, and gates that decide what can be claimed.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                className="cta cta-primary"
                href={externalLinks.rayleeGithub}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Raylee Hawkins on GitHub"
              >
                GitHub ↗
              </a>
              <a
                className="cta cta-quiet"
                href={externalLinks.rayleeLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Raylee Hawkins on LinkedIn"
              >
                LinkedIn ↗
              </a>
              <a className="cta cta-quiet" href="/proof/">
                Proof ledger
              </a>
            </div>
          </div>

          <div className="order-2 flex items-start justify-center lg:justify-end lg:pt-3">
            <PortraitCommandFrame size="compact" showArc={false} showBoundary={false} />
          </div>
        </div>
        <div className="container">
          <hr className="thin-rule" />
        </div>
      </section>

      <section className="container section-tight">
        <SectionEyebrow
          eyebrow="Focus"
          title="Detection engineering and SOC automation"
          description="Where the work lives day-to-day, and what it produces."
        />
        <div className="grid gap-3 md:grid-cols-3">
          <div className="status-band">
            <span className="status-band__rule" aria-hidden="true"></span>
            <div>
              <p className="mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--ice-blue)]">Detection engineering</p>
              <p className="mt-2 text-sm leading-6 text-[var(--silver)]">
                Detection-as-code: reviewable source, deterministic validation, bounded claims. Source presence does not prove runtime.
              </p>
            </div>
          </div>
          <div className="status-band">
            <span className="status-band__rule" aria-hidden="true"></span>
            <div>
              <p className="mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--ice-blue)]">SOC production</p>
              <p className="mt-2 text-sm leading-6 text-[var(--silver)]">
                Closed engineering loops: source → validation → verifier → CI → record. Every step has a gate; no step skips one.
              </p>
            </div>
          </div>
          <div className="status-band">
            <span className="status-band__rule" aria-hidden="true"></span>
            <div>
              <p className="mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--ice-blue)]">AI labor</p>
              <p className="mt-2 text-sm leading-6 text-[var(--silver)]">
                AI accelerates drafting, scaffolding, and review. AI never owns the promotion boundary.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-tight">
        <SectionEyebrow
          eyebrow="Methodology transfer"
          title="Manufacturing QC → detection engineering"
          description="The same discipline, mapped."
        />
        <div className="ledger" style={{ ["--ledger-cols" as string]: "1fr 1.2fr 1.4fr" } as React.CSSProperties}>
          <div className="ledger__head">
            <div>Manufacturing QC</div>
            <div>Detection engineering</div>
            <div>Practice</div>
          </div>
          {transferRows.map((row) => (
            <div key={row.left} className="ledger__row ledger__row--static">
              <div className="ledger__cell" data-label="Manufacturing QC">{row.left}</div>
              <div className="ledger__cell" data-label="Detection engineering">
                <strong>{row.right}</strong>
              </div>
              <div className="ledger__cell ledger__cell--muted" data-label="Practice">{row.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container section-tight">
        <div className="moon-panel relative overflow-hidden p-8 md:p-10">
          <div
            className="absolute -right-20 -top-20 size-[360px] rounded-full pointer-events-none"
            aria-hidden="true"
            style={{
              background: "radial-gradient(circle, rgba(143,216,255,0.08), transparent 60%)",
              filter: "blur(20px)",
            }}
          ></div>
          <div className="relative grid gap-6 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div>
              <p className="eyebrow">AI governance</p>
              <h2 className="headline mt-3 text-3xl md:text-4xl">AI is labor. Governance is authority.</h2>
              <p className="muted mt-4 max-w-2xl text-base leading-7">
                AI accelerates the work — drafting detections, scaffolding validators, surfacing review notes. Authority lives in deterministic verifiers, explicit evidence linkage, and operator-approved promotion gates.
              </p>
              <p className="mono mt-5 text-[0.62rem] tracking-[0.22em] uppercase text-[var(--silver)]">
                Build loud · Verify hard · Claim tight · Ship receipts
              </p>
            </div>
            <ul className="grid gap-2.5 text-sm leading-6 text-[var(--silver)] md:border-l md:border-[var(--moon-border)] md:pl-6">
              <li className="flex gap-3">
                <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[var(--ice-blue)] shadow-[0_0_8px_var(--ice-blue-glow)]"></span>
                <span>AI drafts. Verifier decides.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[var(--ice-blue)] shadow-[0_0_8px_var(--ice-blue-glow)]"></span>
                <span>Promotion requires evidence linkage, not model confidence.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[var(--ice-blue)] shadow-[0_0_8px_var(--ice-blue-glow)]"></span>
                <span>Public wording must clear the blocked-claim CI scanner.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container section-tight">
        <SectionEyebrow eyebrow="Boundary" title="What HawkinsOperations is — and is not" />
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="status-band">
            <span className="status-band__rule" aria-hidden="true"></span>
            <div>
              <p className="mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--ice-blue)]">Is</p>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--silver)]">
                {isItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[var(--ice-blue)] shadow-[0_0_8px_var(--ice-blue-glow)]"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="status-band status-band--block">
            <span className="status-band__rule" aria-hidden="true"></span>
            <div>
              <p className="mono text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: "#FCA5A5" }}>
                Is not
              </p>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--silver)]">
                {isNotItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[#FCA5A5] shadow-[0_0_8px_rgba(251,113,133,0.4)]"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-tight pb-20">
        <SectionEyebrow eyebrow="Routes" title="Operator and system links" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <a className="artifact-tile" href={externalLinks.rayleeGithub} target="_blank" rel="noopener noreferrer">
            <span className="artifact-tile__cat">EXTERNAL ↗</span>
            <span className="artifact-tile__title">GitHub</span>
            <span className="artifact-tile__desc">Operator profile.</span>
            <span className="artifact-tile__link">Open ↗</span>
          </a>
          <a className="artifact-tile" href={externalLinks.rayleeLinkedIn} target="_blank" rel="noopener noreferrer">
            <span className="artifact-tile__cat">EXTERNAL ↗</span>
            <span className="artifact-tile__title">LinkedIn</span>
            <span className="artifact-tile__desc">Professional profile.</span>
            <span className="artifact-tile__link">Open ↗</span>
          </a>
          <a className="artifact-tile" href={externalLinks.legacyHawkinsOps} target="_blank" rel="noopener noreferrer">
            <span className="artifact-tile__cat">REFERENCE ↗</span>
            <span className="artifact-tile__title">Legacy HawkinsOps</span>
            <span className="artifact-tile__desc">Reference / context only.</span>
            <span className="artifact-tile__link">Open ↗</span>
          </a>
          <a className="artifact-tile" href={externalLinks.githubOrg} target="_blank" rel="noopener noreferrer">
            <span className="artifact-tile__cat">ORGANIZATION ↗</span>
            <span className="artifact-tile__title">HawkinsOperations</span>
            <span className="artifact-tile__desc">Current governed organization.</span>
            <span className="artifact-tile__link">Open ↗</span>
          </a>
        </div>
      </section>
    </>
  );
}
