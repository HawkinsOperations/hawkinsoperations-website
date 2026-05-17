import type { Metadata } from "next";
import SectionEyebrow from "@components/SectionEyebrow";
import StatusChip, { type ChipTone } from "@components/StatusChip";
import { externalLinks } from "@data/navigation";

export const metadata: Metadata = {
  title: "HO-DET-001 Public Pipeline Proof | HawkinsOperations",
  description:
    "A controlled-test validated detection routed through public workflow gates, deterministic pass/fail checks, and blocked-claim enforcement.",
};

type ScoreboardTone = "ice" | "quiet" | "pass" | "block";

const scoreboard: { label: string; value: string; tone: ScoreboardTone }[] = [
  { label: "public proof-loop workflow", value: "1", tone: "ice" },
  { label: "repos checked out by workflow", value: "3", tone: "ice" },
  { label: "verifier/check steps", value: "13", tone: "ice" },
  { label: "referenced Python scripts", value: "11", tone: "ice" },
  { label: "missing referenced scripts", value: "0", tone: "pass" },
  { label: "controlled test cases", value: "14", tone: "ice" },
  { label: "positive cases", value: "7", tone: "quiet" },
  { label: "negative cases", value: "7", tone: "quiet" },
  { label: "passed", value: "14/14", tone: "pass" },
  { label: "failed", value: "0", tone: "pass" },
  { label: "missed positives", value: "0", tone: "pass" },
  { label: "false-positive negatives", value: "0", tone: "pass" },
  { label: "blocked unsupported claim categories", value: "10", tone: "block" },
];

const stages: { n: string; name: string; chip: string; tone: ChipTone; surface: string; line: string; href: string }[] = [
  {
    n: "01",
    name: "Detection source",
    chip: "SOURCE",
    tone: "quiet",
    surface: "source",
    line: "Reviewable rule and SPL source under version control.",
    href: externalLinks.hoDet001Rule,
  },
  {
    n: "02",
    name: "Controlled test cases",
    chip: "CASES",
    tone: "ice",
    surface: "validation",
    line: "7 positive and 7 negative cases with expected outcomes.",
    href: externalLinks.validationCasesHo,
  },
  {
    n: "03",
    name: "Deterministic harness",
    chip: "HARNESS",
    tone: "ice",
    surface: "validation",
    line: "Python verifiers produce deterministic pass/fail output.",
    href: externalLinks.validationHarnessHo,
  },
  {
    n: "04",
    name: "Public workflow",
    chip: "WORKFLOW",
    tone: "ice",
    surface: "workflow",
    line: "Public proof-loop checks out 3 repos and runs 13 verifier/check steps.",
    href: externalLinks.proofLoopHo,
  },
  {
    n: "05",
    name: "Pass/fail report",
    chip: "14/14",
    tone: "ice",
    surface: "report",
    line: "14 passed, 0 failed, 0 missed positives, 0 false-positive negatives.",
    href: externalLinks.validationReportHo,
  },
  {
    n: "06",
    name: "Proof record",
    chip: "RECORD",
    tone: "quiet",
    surface: "proof",
    line: "Proof repo preserves the public label and internal verifier boundary.",
    href: externalLinks.proofRecord,
  },
  {
    n: "07",
    name: "Public claim boundary",
    chip: "BLOCKED",
    tone: "block",
    surface: "public claim",
    line: "10 unsupported claim categories stay blocked instead of implied.",
    href: externalLinks.pipelineProof,
  },
];

const proves = [
  "HO-DET-001 has controlled-test validation.",
  "The validation uses controlled positive and negative cases.",
  "The harness produces deterministic pass/fail results.",
  "The public workflow checks supporting proof-loop gates.",
  "Unsupported claims remain blocked at the public surface.",
];

const blocked = [
  "runtime-active deployment",
  "production readiness",
  "fleet-wide coverage",
  "public-safe runtime evidence",
  "live Splunk firing",
  "Cribl-routed telemetry",
  "Wazuh live collection",
  "autonomous disposition",
  "evidence-linked public runtime proof",
  "analyst-approved disposition",
];

const links = [
  { label: "View workflow", href: externalLinks.proofLoopHo, desc: "Public proof-loop workflow with 13 verifier/check steps." },
  { label: "View validation harness", href: externalLinks.validationHarnessHo, desc: "Python validation harness used for deterministic output." },
  { label: "View controlled test cases", href: externalLinks.validationCasesHo, desc: "7 positive and 7 negative controlled test cases." },
  { label: "View validation report", href: externalLinks.validationReportHo, desc: "14/14 passed with 0 missed positives and 0 false-positive negatives." },
  { label: "View pipeline proof report", href: externalLinks.pipelineProof, desc: "Merged validation proof pack on main." },
  { label: "View proof record", href: externalLinks.proofRecord, desc: "Merged proof boundary record on main." },
  { label: "View validation merge", href: externalLinks.validationPipelineProofMerge, desc: "Validation PR #27 merge commit for the public proof-loop report." },
  { label: "View proof merge", href: externalLinks.proofBoundaryMerge, desc: "Proof PR #27 merge commit for the proof-boundary record." },
  { label: "View detection source", href: externalLinks.hoDet001Rule, desc: "Detection rule source file in the detections repo." },
  { label: "View Splunk source", href: externalLinks.hoDet001Splunk, desc: "SPL source file in the detections repo; not live firing evidence." },
];

export default function PipelinePage() {
  return (
    <>
      <section className="pipeline-hero">
        <div className="container">
          <div className="pipeline-hero__grid">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusChip label="CONTROLLED_TEST_VALIDATED" tone="ice" />
                <StatusChip label="RUNTIME CLAIMS BLOCKED PENDING PUBLIC LAB RECEIPT" tone="block" />
                <StatusChip label="WEBSITE RENDERING IS NOT PROOF" tone="warn" />
              </div>
              <h1 className="headline mt-7 text-[clamp(2.45rem,5.6vw,4.5rem)]">HO-DET-001 Public Pipeline Proof</h1>
              <p className="lede mt-6 max-w-3xl">
                A controlled-test validated detection routed through public workflow gates, deterministic pass/fail checks, and blocked-claim enforcement.
              </p>
              <p className="muted mt-5 max-w-3xl text-sm leading-6">
                HO-DET-001 is CONTROLLED_TEST_VALIDATED through a public proof-loop workflow with controlled positive and negative test cases, deterministic pass/fail output, and blocked-claim enforcement.
              </p>
            </div>
            <aside className="pipeline-hero__receipt" aria-label="Proof receipt summary">
              <span className="mono">RECEIPT BACKED</span>
              <strong>14/14 passed</strong>
              <p>0 missed positives. 0 false-positive negatives. 10 unsupported claim categories blocked.</p>
              <p>Workflow checkout: 3 repos. Script inventory: 11 referenced, 0 missing.</p>
            </aside>
          </div>

          <ul className="scoreboard mt-10" aria-label="HO-DET-001 public proof-loop scoreboard">
            {scoreboard.map((metric) => (
              <li key={metric.label} className={`scoreboard__cell scoreboard__cell--${metric.tone}`}>
                <strong className="scoreboard__value mono">{metric.value}</strong>
                <span className="scoreboard__label">{metric.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container section-tight">
        <SectionEyebrow
          eyebrow="Pipeline flow"
          title="Source to public claim boundary"
          description="Each stage routes to a public artifact or repo surface. The website renders the map; it does not replace the proof record."
        />
        <div className="pipeline-shell pipeline-shell--proof">
          <ol className="pipeline" aria-label="Public pipeline proof flow">
            {stages.map((stage, index) => (
              <li
                key={stage.n}
                className={`pipeline__item ${index === stages.length - 1 ? "pipeline__item--last" : ""}`}
              >
                <a className="pipeline__node pipeline-proof-node" href={stage.href} target="_blank" rel="noopener noreferrer">
                  <span className="pipeline__gate mono">Gate {stage.n}</span>
                  <span className="pipeline__head">
                    <span className="pipeline__num mono">{stage.n}</span>
                    <span className="pipeline__name">{stage.name}</span>
                  </span>
                  <StatusChip label={stage.chip} tone={stage.tone} />
                  <span className="pipeline__body">{stage.line}</span>
                  <span className="pipeline__inspect mono">truth surface - {stage.surface}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container section-tight">
        <div className="proof-split">
          <article className="proof-split__panel">
            <p className="eyebrow">What this proves</p>
            <h2 className="headline mt-2 text-2xl md:text-3xl">Controlled-test validation, visible in public.</h2>
            <ul className="proof-list mt-6">
              {proves.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="proof-split__panel proof-split__panel--block">
            <p className="eyebrow">What this does not prove</p>
            <h2 className="headline mt-2 text-2xl md:text-3xl">Runtime and promotion claims stay blocked.</h2>
            <ul className="blocked-chip-grid mt-6" aria-label="Blocked claim categories">
              {blocked.map((claim) => (
                <li key={claim}>
                  <span>{claim}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="container section-tight">
        <SectionEyebrow
          eyebrow="Open the receipts"
          title="Every visible claim has a route"
          description="These links point to merged public artifacts on main or merged PR/commit records."
        />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {links.map((route) => (
            <a
              key={route.href}
              className="artifact-tile artifact-tile--proof"
              href={route.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="artifact-tile__cat">PUBLIC ROUTE</span>
              <span className="artifact-tile__title">{route.label}</span>
              <span className="artifact-tile__desc">{route.desc}</span>
              <span className="artifact-tile__link">Inspect path -&gt;</span>
            </a>
          ))}
        </div>
      </section>

      <section className="container py-16">
        <div className="doctrine-strip pipeline-takeaway">
          <p className="eyebrow">Reviewer takeaway</p>
          <p className="muted mt-4 max-w-4xl text-base leading-7">
            This is not a production claim. It is a public proof loop: a detection source, controlled cases, deterministic validation, workflow gates, and explicit blocked claims. The value is not that the claim is maximal. The value is that the claim cannot silently exceed the evidence.
            The scanner scope expanded from 5 files to 7 before merge, so the public route reflects the merged validation and proof records without widening the claim ceiling.
          </p>
        </div>
      </section>
    </>
  );
}
