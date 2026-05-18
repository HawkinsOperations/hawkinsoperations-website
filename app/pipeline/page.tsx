import type { Metadata } from "next";
import GpuFactoryLane from "@components/GpuFactoryLane";
import PipelineGateCards from "@components/PipelineGateCards";
import PipelineGateFlow from "@components/PipelineGateFlow";
import StatusConsole from "@components/StatusConsole";
import StatusChip from "@components/StatusChip";
import { externalLinks } from "@data/navigation";

export const metadata: Metadata = {
  title: "Pipeline | HawkinsOps",
  description:
    "How a change becomes public wording: GitHub Actions, controlled fixtures, deterministic validators, blocked-claim scanner, proof record, website rendering. HO-DET-001 + Local GPU Triage / Factory governed lane.",
};

type Cluster = {
  eyebrow: string;
  title: string;
  tone: "ice" | "block";
  rows: { value: string; label: string }[];
};

const metricClusters: Cluster[] = [
  {
    eyebrow: "Workflow",
    title: "Public proof-loop",
    tone: "ice",
    rows: [
      { value: "1", label: "public proof-loop workflow" },
      { value: "3", label: "repos checked out by workflow" },
      { value: "13", label: "verifier / check steps" },
      { value: "11", label: "referenced Python scripts" },
    ],
  },
  {
    eyebrow: "Validation",
    title: "Controlled cases",
    tone: "ice",
    rows: [
      { value: "14", label: "controlled test cases" },
      { value: "7", label: "positive cases" },
      { value: "7", label: "negative cases" },
      { value: "14/14", label: "passed" },
    ],
  },
  {
    eyebrow: "Quality",
    title: "Determinism check",
    tone: "ice",
    rows: [
      { value: "0", label: "failed" },
      { value: "0", label: "missed positives" },
      { value: "0", label: "false-positive negatives" },
      { value: "0", label: "missing referenced scripts" },
    ],
  },
  {
    eyebrow: "Boundary",
    title: "Blocked claim categories",
    tone: "block",
    rows: [
      { value: "10", label: "unsupported claim categories blocked" },
      { value: "0", label: "blocked claim shipped" },
      { value: "0", label: "boundary regressions" },
      { value: "0", label: "scanner failures merged" },
    ],
  },
];

type Stage = {
  n: string;
  name: string;
  chip: string;
  variant: "default" | "block" | "final";
  surface: string;
  line: string;
  href: string;
};

const stages: Stage[] = [
  { n: "01", name: "Detection source", chip: "SOURCE", variant: "default", surface: "source", line: "Reviewable rule and SPL source under version control.", href: externalLinks.hoDet001Rule },
  { n: "02", name: "Controlled test cases", chip: "CASES", variant: "default", surface: "validation", line: "7 positive and 7 negative cases with expected outcomes.", href: externalLinks.validationCasesHo },
  { n: "03", name: "Deterministic harness", chip: "HARNESS", variant: "default", surface: "validation", line: "Python verifiers produce deterministic pass/fail output.", href: externalLinks.validationHarnessHo },
  { n: "04", name: "Public workflow", chip: "WORKFLOW", variant: "default", surface: "workflow", line: "Public proof-loop checks out 3 repos and runs 13 verifier/check steps.", href: externalLinks.proofLoopHo },
  { n: "05", name: "Pass/fail report", chip: "14/14", variant: "default", surface: "report", line: "14 passed, 0 failed, 0 missed positives, 0 false-positive negatives.", href: externalLinks.validationReportHo },
  { n: "06", name: "Proof record", chip: "RECORD", variant: "final", surface: "proof", line: "Proof repo preserves the public label and internal verifier boundary.", href: externalLinks.proofRecord },
  { n: "07", name: "Public claim boundary", chip: "BLOCKED", variant: "block", surface: "public claim", line: "10 unsupported claim categories stay blocked instead of implied.", href: externalLinks.pipelineProof },
];

const proves = [
  "HO-DET-001 has controlled-test validation.",
  "Validation uses controlled positive and negative cases.",
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

type ReceiptLane = { route: string; title: string; desc: string; href: string };
const receiptLanes: ReceiptLane[] = [
  { route: "WORKFLOW", title: "Public proof-loop workflow", desc: "13 verifier / check steps across 3 repos.", href: externalLinks.proofLoopHo },
  { route: "HARNESS", title: "Validation harness", desc: "Python validation harness — deterministic pass/fail output.", href: externalLinks.validationHarnessHo },
  { route: "CASES", title: "Controlled test cases", desc: "7 positive and 7 negative controlled test cases.", href: externalLinks.validationCasesHo },
  { route: "REPORT", title: "Validation report", desc: "14/14 passed · 0 missed positives · 0 false-positive negatives.", href: externalLinks.validationReportHo },
  { route: "PIPELINE PROOF", title: "Merged pipeline proof pack", desc: "Validation report merged on main.", href: externalLinks.pipelineProof },
  { route: "PROOF RECORD", title: "Proof record on main", desc: "Merged proof boundary record on main.", href: externalLinks.proofRecord },
  { route: "VALIDATION MERGE", title: "Validation PR #27", desc: "Validation merge commit for the public proof-loop report.", href: externalLinks.validationPipelineProofMerge },
  { route: "PROOF MERGE", title: "Proof PR #27", desc: "Proof merge commit for the proof-boundary record.", href: externalLinks.proofBoundaryMerge },
  { route: "RULE", title: "Detection rule source", desc: "Rule file in the detections repo.", href: externalLinks.hoDet001Rule },
  { route: "SPL", title: "Splunk SPL source", desc: "SPL source file in the detections repo · not live firing evidence.", href: externalLinks.hoDet001Splunk },
];

export default function PipelinePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="pipeline-hero pipeline-hero--cockpit">
        <div className="container">
          <div className="pipeline-hero__cockpit-grid">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusChip label="CONTROLLED_TEST_VALIDATED" tone="ice" />
                <StatusChip label="RUNTIME CLAIMS BLOCKED" tone="block" />
                <StatusChip label="WEBSITE RENDERING IS NOT PROOF" tone="warn" />
              </div>
              <h1 className="cockpit-headline cockpit-headline--xl mt-6">
                HO-DET-001
                <span className="block mt-2" style={{ color: "var(--electric-blue-bright)" }}>
                  Public pipeline proof.
                </span>
              </h1>
              <p className="lede mt-6 max-w-3xl" style={{ color: "var(--silver)" }}>
                A controlled-test validated detection routed through public workflow gates,
                deterministic pass/fail checks, and blocked-claim enforcement.
              </p>
              <p className="muted mt-4 max-w-3xl text-sm leading-6">
                HO-DET-001 is CONTROLLED_TEST_VALIDATED through a public proof-loop workflow with
                controlled positive and negative test cases, deterministic pass/fail output, and
                blocked-claim enforcement. The proof-loop workflow carries the receipt route; the
                website renders the map.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a className="cta cta-primary" href="#pipeline-flow">See the pipeline →</a>
                <a className="cta cta-quiet" href="#proof-boundary">What it does not prove</a>
                <a className="cta cta-quiet" href={externalLinks.proofLoopHo} target="_blank" rel="noopener noreferrer">Workflow ↗</a>
              </div>
            </div>
            <div className="lg:pt-2">
              <StatusConsole
                rows={[
                  { tone: "ice", label: "HO-DET-001", value: "CONTROLLED_TEST_VALIDATED" },
                  { tone: "primary", label: "Validation", value: "14 / 14 PASSED" },
                  { tone: "quiet", label: "Blocked categories", value: "10 KEPT VISIBLE" },
                ]}
                footer="Website rendering is not proof."
                showLoop={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── How the proof pipeline works · gate flow ────────────────── */}
      <section id="how-it-works" className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <div className="mb-5">
            <p className="cockpit-eyebrow">How the proof pipeline works</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.0rem)" }}>
              GitHub Actions, deterministic validators, blocked-claim scanner, proof record, website rendering.
            </h2>
            <p className="muted mt-3 max-w-3xl text-sm leading-6" style={{ color: "#B7C4D6" }}>
              A change only moves toward public wording after GitHub Actions, deterministic validators,
              blocked-claim scans, proof records, and human review keep the claim inside its evidence
              boundary. The route is a reviewer-visible proof-route map; it is not a runtime telemetry
              claim.
            </p>
          </div>
          <PipelineGateFlow />
        </div>
      </section>

      {/* ── GitHub Actions gate explanation cards ────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <div className="mb-5">
            <p className="cockpit-eyebrow">GitHub Actions · gates</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.85rem)" }}>
              Three gates the pipeline can't ship past quietly.
            </h2>
          </div>
          <PipelineGateCards />
        </div>
      </section>

      {/* ── Local GPU Triage / Factory governed lane ────────────────── */}
      <section id="gpu-factory-lane" className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <GpuFactoryLane />
        </div>
      </section>

      {/* ── Bridge: HO-DET-001 vs GPU/Factory lane ──────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="biz-translate" role="note" aria-label="Lane bridge">
            <span className="biz-translate__label">Lane bridge</span>
            <span>
              <span className="biz-translate__text">
                HO-DET-001 is the public proof-loop example below. The Local GPU Triage / Factory
                lane above is governed platform work — bounded receipts and status packets only. The
                website renders both lanes; it does not prove runtime behaviour for either.
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* ── Metric clusters ──────────────────────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Receipts at a glance</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Four clusters · receipt-backed.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Workflow scope, controlled cases, determinism, and the blocked-claim boundary.
              Each cluster groups its own receipts.
            </p>
          </div>

          <div className="metric-clusters" aria-label="HO-DET-001 public proof-loop receipts">
            {metricClusters.map((cluster) => (
              <article
                key={cluster.eyebrow}
                className={`metric-cluster ${cluster.tone === "block" ? "metric-cluster--block" : ""}`}
              >
                <span className="metric-cluster__eyebrow">{cluster.eyebrow}</span>
                <h3 className="metric-cluster__title">{cluster.title}</h3>
                <dl className="metric-cluster__rows">
                  {cluster.rows.map((row) => (
                    <div key={row.label} className="metric-cluster__row">
                      <dt className="metric-cluster__value mono">{row.value}</dt>
                      <dd className="metric-cluster__label">{row.label}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pipeline flow / machine strip ───────────────────────────── */}
      <section id="pipeline-flow" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Pipeline flow</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Source → controlled cases → harness → workflow → report → record → boundary.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Each stage routes to a public artifact or repo surface. The website renders the map;
              it does not replace the proof record.
            </p>
          </div>

          <div className="pipeline-machine">
            <div className="pipeline-machine__viewport">
              <ol className="pipeline-machine__stages" aria-label="Public pipeline flow stages">
                {stages.map((stage) => (
                  <li
                    key={stage.n}
                    className={`pipeline-machine__stage ${
                      stage.variant === "final" ? "pipeline-machine__stage--final" : ""
                    } ${stage.variant === "block" ? "pipeline-machine__stage--block" : ""}`}
                  >
                    <span className="pipeline-machine__num">GATE · {stage.n}</span>
                    <span className="pipeline-machine__name">{stage.name}</span>
                    <span className="pipeline-machine__chip">{stage.chip}</span>
                    <a className="pipeline-machine__line" href={stage.href} target="_blank" rel="noopener noreferrer">
                      {stage.line}
                    </a>
                    <span className="pipeline-machine__surface">truth surface · {stage.surface}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="pipeline-machine__legend">
              <span>STAGES · 07</span>
              <span>SOURCE → BOUNDARY</span>
              <span>BLOCKED · {blocked.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proves / Does not prove ──────────────────────────────────── */}
      <section id="proof-boundary" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Proof boundary</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              What this proves — and what it does not.
            </h2>
          </div>

          <div className="boundary-panels">
            <div className="boundary-panel boundary-panel--is">
              <p className="mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--ice-blue)]">Proves</p>
              <h3 className="boundary-panel__title">Controlled-test validation, visible in public.</h3>
              <ul className="boundary-panel__list">
                {proves.map((item) => (
                  <li key={item} className="boundary-panel__item">{item}</li>
                ))}
              </ul>
            </div>
            <div className="boundary-panel boundary-panel--isnot">
              <p className="mono text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: "#FCA5A5" }}>Does not prove</p>
              <h3 className="boundary-panel__title">Runtime and promotion claims stay blocked.</h3>
              <ul className="boundary-panel__list" aria-label="Blocked claim categories — not claimed from this surface">
                {blocked.map((claim) => (
                  <li key={claim} className="boundary-panel__item">{claim}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Receipt route lanes ──────────────────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Open the receipts</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Every visible claim has a route.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              These lanes point to merged public artifacts on main or merged PR/commit records.
              The website renders the lanes; the artifacts are the proof.
            </p>
          </div>

          <div className="receipt-lanes">
            {receiptLanes.map((lane) => (
              <a
                key={lane.href}
                className="receipt-lane"
                href={lane.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="receipt-lane__route">PUBLIC ROUTE · {lane.route}</span>
                <span className="receipt-lane__title">{lane.title}</span>
                <span className="receipt-lane__desc">{lane.desc}</span>
                <span className="receipt-lane__inspect">Inspect path ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof Pack 001 release route panel ───────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="proof-pack-console" aria-label="Proof Pack 001 release route status panel">
            <header className="proof-pack-console__head">
              <div>
                <p className="cockpit-eyebrow">Release route · governed</p>
                <h2 className="proof-pack-console__title">
                  Proof Pack 001 · official release routed.
                </h2>
                <p className="proof-pack-console__sub">
                  The proof repo holds the official GitHub Release and bounded reviewer ZIP.
                  Website rendering is not proof; this pipeline page routes reviewers to the release.
                </p>
              </div>
              <span className="proof-pack-console__ceiling mono">CONTROLLED_TEST_VALIDATED</span>
            </header>
            <dl className="proof-pack-console__grid">
              <div className="proof-pack-console__cell">
                <dt>Detection</dt>
                <dd className="mono">HO-DET-001</dd>
              </div>
              <div className="proof-pack-console__cell">
                <dt>Pack ID</dt>
                <dd className="mono">HAWKINSOPERATIONS_PROOF_PACK_001</dd>
              </div>
              <div className="proof-pack-console__cell">
                <dt>Pack status</dt>
                <dd className="mono proof-pack-console__cell-strong">PUBLIC_SAFE_REVIEWER_RELEASE_CANDIDATE</dd>
              </div>
              <div className="proof-pack-console__cell">
                <dt>ZIP SHA256</dt>
                <dd className="mono">44d8a643aa2b113c9e99be0462e699d39af707a67190823cc05bb381907dc452</dd>
              </div>
              <div className="proof-pack-console__cell">
                <dt>Public-safe runtime proof</dt>
                <dd className="mono proof-pack-console__cell-block">BLOCKED</dd>
              </div>
              <div className="proof-pack-console__cell">
                <dt>Public-safe state</dt>
                <dd className="mono proof-pack-console__cell-block">NOT_PUBLIC_SAFE</dd>
              </div>
            </dl>
            <footer className="proof-pack-console__foot">
              <span className="mono">GitHub Release route · ZIP asset only · release package does not promote runtime proof</span>
              <a className="cta cta-primary" href={externalLinks.proofPack001Release} target="_blank" rel="noopener noreferrer">
                Open official release ↗
              </a>
              <a className="cta cta-quiet" href="/proof/">Proof ledger →</a>
            </footer>
          </div>
        </div>
      </section>

      {/* ── Reviewer takeaway ────────────────────────────────────────── */}
      <section className="cockpit-section--tight pb-24">
        <div className="container">
          <div className="reviewer-takeaway">
            <p className="reviewer-takeaway__eyebrow">Reviewer takeaway · signed note</p>
            <h2 className="reviewer-takeaway__title">
              This is not a production claim. It is a public proof loop.
            </h2>
            <p className="reviewer-takeaway__body">
              A detection source, controlled cases, deterministic validation, workflow gates,
              and explicit blocked claims. The value is not that the claim is maximal — the value
              is that the claim cannot silently exceed the evidence. The scanner scope expanded
              from 5 files to 7 before merge, so the public route reflects the merged validation
              and proof records without widening the claim ceiling.
            </p>
            <p className="reviewer-takeaway__sig">— hawkinsoperations · public surface · routing only</p>
          </div>
        </div>
      </section>
    </>
  );
}
