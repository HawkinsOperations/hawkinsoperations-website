import type { Metadata } from "next";
import BrandMark from "@components/BrandMark";
import StatusConsole from "@components/StatusConsole";
import PortraitCommandFrame from "@components/PortraitCommandFrame";
import { externalLinks } from "@data/navigation";

export const metadata: Metadata = {
  title: "Operator | HawkinsOperations",
  description:
    "Operator behind HawkinsOperations: governed detection engineering, AI-assisted security operations bounded by validation, evidence, CI controls, and human review. Manufacturing quality discipline transferred into AI security operations governance.",
};

type FailureStep = {
  code: string;
  label: string;
  why: string;
};

const failurePath: FailureStep[] = [
  {
    code: "01",
    label: "AI output",
    why: "Cheap to produce, hard to govern. Without a gate, downstream surfaces treat it as fact.",
  },
  {
    code: "02",
    label: "Analyst conclusion",
    why: "Once pasted into a ticket or brief, AI wording becomes a claim with someone's name on it.",
  },
  {
    code: "03",
    label: "Operational action",
    why: "Block, alert, escalate. The action itself becomes downstream proof the claim was real.",
  },
  {
    code: "04",
    label: "Public claim",
    why: "Public statements are hardest to retract. Websites, decks, press become the new baseline.",
  },
  {
    code: "05",
    label: "Executive truth",
    why: "Once enough surfaces repeat a claim, executives treat it as established. The AI origin is gone.",
  },
];

type BuiltItem = {
  label: string;
  detail: string;
};

const builtItems: BuiltItem[] = [
  {
    label: "Evidence-controlled detection engineering",
    detail: "Detection-as-code with reviewable source, deterministic validation, and bounded claim wording.",
  },
  {
    label: "Deterministic validators",
    detail: "Controlled positive and negative test cases produce pass/fail receipts the next surface can require.",
  },
  {
    label: "CI gates",
    detail: "Site contract verifier, blocked-claim scanner, schema validity, MITRE mapping integrity. CI fails the build when a gate trips.",
  },
  {
    label: "Proof records",
    detail: "Public proof records carry stated ceilings, evidence pointers, supported wording, and blocked wording.",
  },
  {
    label: "Claim firewall",
    detail: "Wording outside the supported set is blocked at the public surface — not warned about, blocked.",
  },
  {
    label: "AI labor under human authority",
    detail: "AI accelerates drafting, scaffolding, triage support, and reviewer preparation. AI does not own the promotion boundary.",
  },
];

type ResumeRow = {
  label: string;
  value: string;
  note?: string;
};

const resumeRows: ResumeRow[] = [
  {
    label: "Role focus",
    value: "AI Security Operations · Detection Engineering · SOC Automation",
  },
  {
    label: "Cases processed",
    value: "324,074",
    note: "Across an 8-month controlled build-and-validation cycle. Not an enterprise production claim.",
  },
  {
    label: "Auto-close rate",
    value: "~88%",
    note: "Inside the same controlled cycle. Auto-close routed only the cases the validators authorized.",
  },
  {
    label: "Reviewer-escalated evidence packs",
    value: "8,574",
    note: "Surfaced for human review under the bounded routing rules.",
  },
  {
    label: "Cycle window",
    value: "8 months · controlled build and validation",
  },
  {
    label: "Certification",
    value: "CompTIA Security+ · May 2026",
  },
  {
    label: "Current role",
    value: "Outlier · AI Model Evaluator · cybersecurity domain · Dec 2025 → present",
  },
  {
    label: "Prior role",
    value: "Unipres Alabama · Production Supervisor · 30+ operators · audit-heavy IATF/TISAX quality expectations",
  },
  {
    label: "Earlier role",
    value: "Fehrer Automotive · Production Operator → Team Lead · high-throughput line ownership",
  },
];

const stackItems: string[] = [
  "Detection-as-code",
  "Python CI verifier",
  "Schema validity checks",
  "MITRE mapping integrity",
  "Claim-scope boundaries",
  "GitHub Actions self-hosted runner executes verifiers on PRs",
];

const isItems = [
  "An AI security operations control layer.",
  "A governed detection engineering surface.",
  "A reviewer-ready proof path with bounded claims.",
];

const isNotItems = [
  "Not a production-ready SOC. Blocked / not claimed.",
  "Not public-safe runtime proof. Blocked / not claimed.",
  "Not an autonomous SOC. Blocked / not claimed.",
  "Not AI-approved disposition. Blocked / not claimed.",
  "Not analyst-approved disposition unless explicitly proven. Blocked / not claimed.",
  "Not fleet-wide enterprise deployment. Blocked / not claimed.",
];

const routeSlots = [
  {
    cat: "INSPECT →",
    label: "Proof Pack 001",
    desc: "Released proof pack receipt.",
    href: externalLinks.proofPack001Release,
    external: true,
  },
  {
    cat: "TRACE →",
    label: "HO-DET-001",
    desc: "End-to-end proof route.",
    href: "/proof/ho-det-001/",
  },
  {
    cat: "ORG ↗",
    label: "HawkinsOperations",
    desc: "Governed organization on GitHub.",
    href: externalLinks.githubOrg,
    external: true,
  },
  {
    cat: "EXTERNAL ↗",
    label: "GitHub · Raylee",
    desc: "Operator profile.",
    href: externalLinks.rayleeGithub,
    external: true,
  },
  {
    cat: "EXTERNAL ↗",
    label: "LinkedIn · Raylee",
    desc: "Professional profile.",
    href: externalLinks.rayleeLinkedIn,
    external: true,
  },
];

export default function OperatorPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden cockpit-section">
        <div className="container-cockpit grid gap-14 lg:grid-cols-[1.4fr_0.85fr] lg:gap-16 items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <BrandMark size="sm" />
              <span className="cockpit-eyebrow">Operator</span>
            </div>

            <h1 className="cockpit-headline cockpit-headline--xl mt-6">
              I built HawkinsOperations because AI can accelerate security work
              <span className="block mt-2" style={{ color: "var(--electric-blue-bright)" }}>
                faster than most teams can verify it.
              </span>
            </h1>

            <p className="lede mt-7 max-w-2xl" style={{ color: "var(--silver)" }}>
              The system is my answer to uncontrolled promotion: AI-generated output becoming
              analyst conclusion, operational action, public claim, or executive truth before
              validation, evidence, CI controls, and human review authorize it. AI accelerates the
              work. Evidence and human review authorize the claim.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                className="cta cta-primary"
                href={externalLinks.proofPack001Release}
                target="_blank"
                rel="noopener noreferrer"
              >
                Inspect Proof Pack 001 ↗
              </a>
              <a className="cta cta-quiet" href="/proof/ho-det-001/">
                Trace HO-DET-001 →
              </a>
              <a
                className="cta cta-quiet"
                href={externalLinks.githubOrg}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Org ↗
              </a>
              <a className="cta cta-quiet" href={externalLinks.rayleeLinkedIn} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6 items-stretch lg:items-end lg:pt-2">
            <div className="lg:max-w-[300px] w-full">
              <PortraitCommandFrame size="compact" showArc={false} showBoundary={false} />
            </div>
            <StatusConsole showLoop={false} />
          </div>
        </div>

        <div className="container-cockpit mt-12">
          <hr className="cockpit-rule" />
        </div>
      </section>

      {/* ── Failure mode · output promoted before proof ─────────────── */}
      <section className="cockpit-section--tight">
        <div className="container-cockpit reveal reveal--up">
          <div className="mb-6">
            <p className="cockpit-eyebrow" style={{ color: "var(--blocked-red-strong, #FCA5A5)" }}>
              The failure mode
            </p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Output promoted before proof.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Without controls, AI output becomes analyst conclusion, operational action, public
              claim, and executive truth without enough validation, evidence, or human review to
              support it. HawkinsOperations is built to block that path.
            </p>
          </div>

          <ol className="operator-failure" aria-label="Five-stage failure path">
            {failurePath.map((step) => (
              <li key={step.code} className="operator-failure__step">
                <span className="operator-failure__num">{step.code}</span>
                <span className="operator-failure__label">{step.label}</span>
                <span className="operator-failure__why">{step.why}</span>
              </li>
            ))}
          </ol>

          <p className="muted mt-6 text-sm leading-6 max-w-3xl">
            HawkinsOperations interrupts this path with deterministic validators, evidence records,
            CI controls, blocked-claim scanners, and human review. Promotion is upward and gated;
            public wording stays capped at CONTROLLED_TEST_VALIDATED.
          </p>
        </div>
      </section>

      {/* ── Operator origin · manufacturing → governance ─────────────── */}
      <section className="cockpit-section--tight">
        <div className="container-cockpit reveal reveal--up">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14 items-start">
            <div>
              <p className="cockpit-eyebrow">Operator origin</p>
              <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.0rem)" }}>
                Manufacturing quality discipline, transferred into AI security operations.
              </h2>
              <p className="muted mt-4 text-sm leading-6">
                I came up on production floors with audit-heavy quality systems — IATF and TISAX
                environments where every step had a gate, every defect had an owner, and nothing
                shipped without a traceable record. Move fast, validate hard, never let a public
                claim outrun its evidence.
              </p>
              <p className="muted mt-3 text-sm leading-6">
                HawkinsOperations applies that discipline to AI-assisted security work. AI
                accelerates drafting, triage, and reviewer preparation. Deterministic validators,
                CI gates, evidence records, and public claim boundaries decide what becomes
                operational truth.
              </p>
            </div>
            <div className="translation-map" aria-label="Manufacturing quality → AI security operations translation">
              <div className="translation-map__head">
                <span className="translation-map__head-cell">Manufacturing QC</span>
                <span className="translation-map__head-spacer" aria-hidden="true">→</span>
                <span className="translation-map__head-cell">AI security operations</span>
                <span className="translation-map__head-cell">Practice outcome</span>
              </div>
              <div className="translation-map__row">
                <span className="translation-map__left">Standard work</span>
                <span className="translation-map__arrow" aria-hidden="true">→</span>
                <span className="translation-map__right">Detection-as-code</span>
                <span className="translation-map__note">Reviewable, repeatable, owned.</span>
              </div>
              <div className="translation-map__row">
                <span className="translation-map__left">Traceability</span>
                <span className="translation-map__arrow" aria-hidden="true">→</span>
                <span className="translation-map__right">Evidence records</span>
                <span className="translation-map__note">Bounded artifacts, retained.</span>
              </div>
              <div className="translation-map__row">
                <span className="translation-map__left">Defect control</span>
                <span className="translation-map__arrow" aria-hidden="true">→</span>
                <span className="translation-map__right">Validation failures</span>
                <span className="translation-map__note">Deterministic, gated, surfaced.</span>
              </div>
              <div className="translation-map__row">
                <span className="translation-map__left">Quality gates</span>
                <span className="translation-map__arrow" aria-hidden="true">→</span>
                <span className="translation-map__right">CI / verifier enforcement</span>
                <span className="translation-map__note">Wording cannot ship until checks pass.</span>
              </div>
              <div className="translation-map__row">
                <span className="translation-map__left">Escalation paths</span>
                <span className="translation-map__arrow" aria-hidden="true">→</span>
                <span className="translation-map__right">Human review gates</span>
                <span className="translation-map__note">Operator-approved promotion.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What I built ─────────────────────────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container-cockpit">
          <div className="mb-6">
            <p className="cockpit-eyebrow">What I built</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              A control layer for AI-assisted security work.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Six surfaces, gated promotion, reviewer-visible receipts. AI is scoped labor. Validators,
              CI, evidence records, and human review own the boundary.
            </p>
          </div>
          <div className="operator-built">
            {builtItems.map((item) => (
              <article key={item.label} className="operator-built__card">
                <p className="operator-built__label">{item.label}</p>
                <p className="operator-built__detail">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Resume snapshot · bounded facts ──────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container-cockpit">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Resume snapshot</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Bounded public-safe facts, framed inside the controlled cycle.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Throughput and ratios below are reviewer-facing facts from an 8-month controlled
              build-and-validation cycle. They are not an enterprise production-deployment claim.
              Runtime-active, fleet-wide, and public-safe runtime proof wording remains blocked at
              this surface.
            </p>
          </div>

          <div className="operator-resume" role="list">
            {resumeRows.map((row) => (
              <div key={row.label} role="listitem" className="operator-resume__row">
                <span className="operator-resume__label">{row.label}</span>
                <span className="operator-resume__value">{row.value}</span>
                {row.note ? <span className="operator-resume__note">{row.note}</span> : null}
              </div>
            ))}
          </div>

          <div className="operator-stack">
            <p className="operator-stack__eyebrow">Stack · enforcement</p>
            <ul className="operator-stack__list">
              {stackItems.map((s) => (
                <li key={s} className="operator-stack__item">{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Is / Is not ──────────────────────────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container-cockpit">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Boundary</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              What HawkinsOperations is — and what I do not claim.
            </h2>
          </div>

          <div className="boundary-panels">
            <div className="boundary-panel boundary-panel--is">
              <p className="mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--ice-blue)]">Is</p>
              <h3 className="boundary-panel__title">A governed AI security operations control surface.</h3>
              <ul className="boundary-panel__list">
                {isItems.map((item) => (
                  <li key={item} className="boundary-panel__item">{item}</li>
                ))}
              </ul>
            </div>
            <div className="boundary-panel boundary-panel--isnot">
              <p className="mono text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: "#FCA5A5" }}>
                I do not claim
              </p>
              <h3 className="boundary-panel__title">Runtime, fleet, autonomous, and AI-approved disposition stay blocked.</h3>
              <ul className="boundary-panel__list">
                {isNotItems.map((item) => (
                  <li key={item} className="boundary-panel__item">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Route dock ───────────────────────────────────────────────── */}
      <section className="cockpit-section--tight pb-24">
        <div className="container-cockpit">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Operator routes</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Where to look next.
            </h2>
          </div>

          <div className="route-dock">
            {routeSlots.map((slot) => (
              <a
                key={slot.label}
                className="route-dock__slot"
                href={slot.href}
                target={slot.external ? "_blank" : undefined}
                rel={slot.external ? "noopener noreferrer" : undefined}
              >
                <span className="route-dock__cat">{slot.cat}</span>
                <span className="route-dock__label">{slot.label}</span>
                <span className="route-dock__desc">{slot.desc}</span>
                <span className="route-dock__cta">{slot.external ? "Open ↗" : "Open →"}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
