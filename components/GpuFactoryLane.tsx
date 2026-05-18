/**
 * GpuFactoryLane
 *
 * Local GPU Triage / Factory governed lane — recent platform work
 * surfaced as a sequenced row of reviewer-visible artifact nodes.
 *
 * Claim contract: every node uses GOVERNED_LABOR or RECEIPT_EMITTED
 * class wording only. No node claims model execution in CI, GPU CI
 * proven, runtime-active, signal-observed, or public-safe runtime
 * proof. The boundary strip at the bottom states this explicitly.
 */

type LaneNode = {
  slug: string;
  step: string;
  title: string;
  meta: string;
  blocked: string;
};

const nodes: LaneNode[] = [
  {
    slug: "local-gpu-triage-phase-a-scaffold",
    step: "01 · Phase A",
    title: "Phase A scaffold",
    meta: "Pipeline structure scaffolded as governed labor.",
    blocked: "Does not prove runtime activity or GPU CI status.",
  },
  {
    slug: "local-gpu-triage-phase-b-gate",
    step: "02 · Phase B",
    title: "Phase B workflow gate",
    meta: "Second-phase workflow gate added as bounded structure.",
    blocked: "Governed labor only; not runtime proof.",
  },
  {
    slug: "local-gpu-triage-receipt-path",
    step: "03 · Receipt",
    title: "Receipt-emit hardened",
    meta: "Workflow emits a bounded receipt artifact for governed inspection.",
    blocked: "Does not prove model execution in CI or public-safe runtime proof.",
  },
  {
    slug: "detection-factory-controller-status-packets",
    step: "04 · Factory",
    title: "Factory status packets",
    meta: "Detection Factory Controller v0 emits bounded status packets.",
    blocked: "Does not claim autonomous SOC or AI-approved disposition.",
  },
];

export default function GpuFactoryLane() {
  return (
    <section className="gpu-lane" aria-labelledby="gpu-lane-title">
      <header className="gpu-lane__head">
        <div>
          <p className="gpu-lane__eyebrow">Local GPU Triage / Factory Lane</p>
          <h2 id="gpu-lane-title" className="gpu-lane__title">
            Governed platform work · bounded receipts and status packets.
          </h2>
          <p className="gpu-lane__sub">
            Recent platform work defines bounded workflow gates, receipt emission, and status packets.
            This lane is reviewer-visible governed labor only. It does not claim model execution in CI,
            GPU CI proven status, runtime-active status, signal-observed status, or public-safe runtime
            proof.
          </p>
        </div>
        <span className="gpu-lane__stamp" aria-label="Governed labor only">Governed labor only</span>
      </header>

      <ol className="gpu-lane__nodes" role="list">
        {nodes.map((n) => (
          <li key={n.slug}>
            <a className="gpu-lane__node spotlight spotlight--amber" href={`/artifacts/${n.slug}/`}>
              <span className="gpu-lane__node-step">{n.step}</span>
              <h3 className="gpu-lane__node-title">{n.title}</h3>
              <p className="gpu-lane__node-meta">{n.meta}</p>
              <p className="gpu-lane__node-block">{n.blocked}</p>
              <p className="gpu-lane__node-open">Open artifact ↗</p>
            </a>
          </li>
        ))}
      </ol>

      <p className="gpu-lane__boundary">
        <b>Boundary</b>
        GPU / factory artifacts are reviewer-visible governed work. They do not prove model execution
        in CI, GPU CI status, runtime-active status, signal-observed status, or public-safe runtime
        proof. Public ceiling stays at CONTROLLED_TEST_VALIDATED.
      </p>
    </section>
  );
}
