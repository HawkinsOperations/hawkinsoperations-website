import type { Metadata } from "next";
import BrandMark from "@components/BrandMark";
import StatusConsole from "@components/StatusConsole";
import PortraitCommandFrame from "@components/PortraitCommandFrame";
import { externalLinks } from "@data/navigation";

export const metadata: Metadata = {
  title: "About | HawkinsOperations Detection Engineering SOC",
  description:
    "Operator methodology for HawkinsOperations Detection Engineering SOC: detection engineering, SOC production, AI labor, manufacturing quality-control transfer, and governance authority.",
};

type Lane = {
  eyebrow: string;
  title: string;
  steps: string[];
  note: string;
};

const lanes: Lane[] = [
  {
    eyebrow: "Detection engineering",
    title: "Source → control → bounded claim",
    steps: ["Detection source", "Controlled validation", "Bounded claim"],
    note: "Detection-as-code: reviewable source, deterministic validation, no claim that source presence is runtime.",
  },
  {
    eyebrow: "SOC production",
    title: "Findings → gate → record",
    steps: ["Findings packet", "Verifier / CI gate", "Proof record"],
    note: "Closed engineering loops: source → validation → verifier → CI → record. Every step has a gate; no step skips one.",
  },
  {
    eyebrow: "AI labor",
    title: "Draft → verifier → operator review",
    steps: ["AI draft", "Deterministic verifier", "Operator review"],
    note: "AI accelerates drafting, scaffolding, and review. AI never owns the promotion boundary.",
  },
];

type TransferRow = { left: string; right: string; note: string };
const transferRows: TransferRow[] = [
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

const routeSlots = [
  {
    cat: "EXTERNAL ↗",
    label: "GitHub",
    desc: "Operator profile.",
    href: externalLinks.rayleeGithub,
    external: true,
  },
  {
    cat: "EXTERNAL ↗",
    label: "LinkedIn",
    desc: "Professional profile.",
    href: externalLinks.rayleeLinkedIn,
    external: true,
  },
  {
    cat: "REFERENCE ↗",
    label: "Legacy HawkinsOps",
    desc: "Reference / context only · does not promote current claims.",
    href: externalLinks.legacyHawkinsOps,
    external: true,
  },
  {
    cat: "ORGANIZATION ↗",
    label: "HawkinsOperations",
    desc: "Current governed organization on GitHub.",
    href: externalLinks.githubOrg,
    external: true,
  },
];

export default function AboutPage() {
  return (
    <div className="page-about">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden cockpit-section">
        <div className="container grid gap-14 lg:grid-cols-[1.45fr_0.85fr] lg:gap-16 items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <BrandMark size="sm" />
              <span className="cockpit-eyebrow">Operator methodology · governance authority</span>
            </div>

            <h1 className="cockpit-headline cockpit-headline--xl mt-6">
              Raylee Hawkins.
              <span className="block mt-2" style={{ color: "var(--electric-blue-bright)" }}>
                Detection engineer · SOC production.
              </span>
            </h1>

            <p className="lede mt-7 max-w-2xl" style={{ color: "var(--silver)" }}>
              I build governed detection engineering workflows where AI accelerates work and
              evidence controls the claim. Manufacturing quality control taught the discipline;
              detection engineering inherits it.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a className="cta cta-primary" href={externalLinks.rayleeGithub} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
              <a className="cta cta-quiet" href={externalLinks.rayleeLinkedIn} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
              <a className="cta cta-quiet" href="/proof/">Proof ledger</a>
            </div>
          </div>

          <div className="flex flex-col gap-6 items-stretch lg:items-end lg:pt-2">
            <div className="lg:max-w-[280px] w-full">
              <PortraitCommandFrame size="compact" showArc={false} showBoundary={false} />
            </div>
            <StatusConsole showLoop={false} />
          </div>
        </div>

        <div className="container mt-12">
          <hr className="cockpit-rule" />
        </div>
      </section>

      {/* ── Operator lanes ──────────────────────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Operator lanes</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Three lanes. One direction. Input → control → output.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Each lane describes the day-to-day work that produces a bounded artifact. AI
              accelerates the work inside the lanes; governance owns the boundary.
            </p>
          </div>

          <div className="operator-lanes">
            {lanes.map((lane) => (
              <article key={lane.eyebrow} className="operator-lane">
                <span className="operator-lane__eyebrow">{lane.eyebrow}</span>
                <h3 className="operator-lane__title">{lane.title}</h3>
                <div className="operator-lane__flow">
                  {lane.steps.map((step, i) => (
                    <div key={step} className="operator-lane__step">
                      <span className="operator-lane__step-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="operator-lane__step-label">{step}</span>
                      {i < lane.steps.length - 1 && <span className="operator-lane__step-arrow">→</span>}
                    </div>
                  ))}
                </div>
                <p className="operator-lane__note">{lane.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Methodology translation map (Manufacturing QC → DE) ─────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Methodology transfer</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Manufacturing QC → detection engineering.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              The same discipline, mapped. Each row is a one-to-one translation, not a metaphor.
            </p>
          </div>

          <div className="translation-map">
            <div className="translation-map__head">
              <span className="translation-map__head-cell">Manufacturing QC</span>
              <span className="translation-map__head-spacer" aria-hidden="true">→</span>
              <span className="translation-map__head-cell">Detection engineering</span>
              <span className="translation-map__head-cell">Practice outcome</span>
            </div>
            {transferRows.map((row) => (
              <div key={row.left} className="translation-map__row">
                <span className="translation-map__left">{row.left}</span>
                <span className="translation-map__arrow" aria-hidden="true">→</span>
                <span className="translation-map__right">{row.right}</span>
                <span className="translation-map__note">{row.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI governance flow ───────────────────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="ai-flow">
            <div className="ai-flow__copy">
              <p className="cockpit-eyebrow">AI governance</p>
              <h2 className="ai-flow__title">AI is labor. Governance is authority.</h2>
              <p className="ai-flow__line">
                AI accelerates the work — drafting detections, scaffolding validators, surfacing
                review notes. Authority lives in deterministic verifiers, explicit evidence linkage,
                and operator-approved promotion gates.
              </p>
              <p className="ai-flow__creed">Build loud · Verify hard · Claim tight · Ship receipts</p>
            </div>

            <div className="ai-flow__visual" aria-hidden="true">
              <svg viewBox="0 0 460 220" role="img" aria-label="AI accelerates labor; deterministic verifier and operator review own the promotion gate">
                <defs>
                  <marker id="aif-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L10,5 L0,10 z" fill="var(--electric-blue-bright)" />
                  </marker>
                </defs>

                {/* Top lane: AI labor */}
                <text x={28} y={28} fontSize={9} fontFamily='"JetBrains Mono", monospace' fill="var(--electric-blue-bright)" letterSpacing="2">LABOR · AI</text>
                <rect x={28} y={38} width={104} height={42} rx={5} fill="rgba(8,13,22,0.94)" stroke="var(--electric-blue)" strokeWidth={1.4} />
                <text x={80} y={56} fontSize={11} fontWeight={700} fontFamily="Inter, ui-sans-serif, system-ui, sans-serif" fill="var(--silver-bright)" textAnchor="middle">AI drafts</text>
                <text x={80} y={70} fontSize={9} fontFamily='"JetBrains Mono", monospace' fill="var(--ice-blue)" textAnchor="middle" letterSpacing="1.5">DRAFT</text>

                <line x1={132} y1={60} x2={172} y2={60} stroke="var(--electric-blue-bright)" strokeWidth={1.4} markerEnd="url(#aif-arrow)" />

                <rect x={172} y={38} width={120} height={42} rx={5} fill="rgba(8,13,22,0.94)" stroke="var(--electric-blue)" strokeWidth={1.4} />
                <text x={232} y={56} fontSize={11} fontWeight={700} fontFamily="Inter, ui-sans-serif, system-ui, sans-serif" fill="var(--silver-bright)" textAnchor="middle">Verifier checks</text>
                <text x={232} y={70} fontSize={9} fontFamily='"JetBrains Mono", monospace' fill="var(--ice-blue)" textAnchor="middle" letterSpacing="1.5">DETERMINISTIC</text>

                <line x1={292} y1={60} x2={332} y2={60} stroke="var(--electric-blue-bright)" strokeWidth={1.4} markerEnd="url(#aif-arrow)" />

                <rect x={332} y={38} width={104} height={42} rx={5} fill="rgba(8,13,22,0.94)" stroke="var(--electric-blue)" strokeWidth={1.4} />
                <text x={384} y={56} fontSize={11} fontWeight={700} fontFamily="Inter, ui-sans-serif, system-ui, sans-serif" fill="var(--silver-bright)" textAnchor="middle">Evidence link</text>
                <text x={384} y={70} fontSize={9} fontFamily='"JetBrains Mono", monospace' fill="var(--ice-blue)" textAnchor="middle" letterSpacing="1.5">RECORD</text>

                {/* Lower gate */}
                <text x={28} y={120} fontSize={9} fontFamily='"JetBrains Mono", monospace' fill="var(--muted)" letterSpacing="2">AUTHORITY · OPERATOR</text>
                <rect x={132} y={130} width={196} height={48} rx={6} fill="rgba(15,22,36,0.94)" stroke="var(--silver-bright)" strokeWidth={1.6} />
                <text x={230} y={150} fontSize={12} fontWeight={700} fontFamily="Inter, ui-sans-serif, system-ui, sans-serif" fill="var(--silver-bright)" textAnchor="middle">Operator review · promotion</text>
                <text x={230} y={166} fontSize={9} fontFamily='"JetBrains Mono", monospace' fill="var(--ice-blue)" textAnchor="middle" letterSpacing="2">GATE · NOT MODEL-OWNED</text>

                <line x1={384} y1={84} x2={328} y2={130} stroke="var(--diagram-line-strong)" strokeWidth={1.4} markerEnd="url(#aif-arrow)" />

                {/* Footer note */}
                <text x={28} y={206} fontSize={8} fontFamily='"JetBrains Mono", monospace' fill="var(--muted)" letterSpacing="1.5">DRAFT · CHECK · LINK · PROMOTE · NEVER AI-OWNED</text>
                <text x={432} y={206} fontSize={8} fontFamily='"JetBrains Mono", monospace' fill="var(--ice-blue)" textAnchor="end" letterSpacing="2">AUTHORITY ≠ MODEL</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Boundary panels ──────────────────────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Boundary</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              What HawkinsOperations is — and is not.
            </h2>
          </div>

          <div className="boundary-panels">
            <div className="boundary-panel boundary-panel--is">
              <p className="mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--ice-blue)]">Is</p>
              <h3 className="boundary-panel__title">A governed detection engineering surface.</h3>
              <ul className="boundary-panel__list">
                {isItems.map((item) => (
                  <li key={item} className="boundary-panel__item">{item}</li>
                ))}
              </ul>
            </div>
            <div className="boundary-panel boundary-panel--isnot">
              <p className="mono text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: "#FCA5A5" }}>Is not</p>
              <h3 className="boundary-panel__title">Runtime, fleet, and disposition claims stay blocked.</h3>
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
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Operator routes</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Where the operator lives outside this surface.
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
    </div>
  );
}
