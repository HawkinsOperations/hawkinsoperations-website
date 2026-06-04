type ProofSpineCard = {
  title: string;
  status: string;
  proves: string;
  doesNotProve: string;
  routeLabel: string;
  routeHref: string;
  external?: boolean;
};

const proofSpineCards: ProofSpineCard[] = [
  {
    title: "Reviewer Metrics Pipeline v1",
    status: "reviewer-visible metrics",
    proves:
      "Separates 4 governed cases, 49 detection activity / controlled validation fires, 106 validation cases, 8 proof records, 31 blocked claims, and public-safe count 0.",
    doesNotProve:
      "Does not prove production SOC metrics, customer metrics, runtime case volume, or public-safe runtime proof.",
    routeLabel: "Open proof metrics route",
    routeHref: "/proof/",
  },
  {
    title: "HO-DET-001 Receipt Chain",
    status: "CONTROLLED_TEST_VALIDATED",
    proves:
      "Connects detection source, validation receipt, platform contract, proof case study, and website route without raising the ceiling.",
    doesNotProve:
      "Does not prove SOCaaS deployment, customer deployment, FortiSIEM integration, production readiness, or public-safe runtime proof.",
    routeLabel: "Trace HO-DET-001",
    routeHref: "/proof/ho-det-001/",
  },
  {
    title: "Lifetime Case Ledger v1",
    status: "append-gated accounting spine",
    proves: "Provides governed-case accounting and a verifier-backed metric source.",
    doesNotProve:
      "Does not prove production case tracking, autonomous closure, or public runtime case proof.",
    routeLabel: "Inspect ledger route",
    routeHref: "/proof/#lifetime-case-ledger",
  },
  {
    title: "Runtime Case Collector v0",
    status: "private candidate lane",
    proves: "Separates route, dedupe, and append-gate handling for private runtime candidates.",
    doesNotProve:
      "Does not prove governed case append, public runtime-active proof, or public signal-observed proof.",
    routeLabel: "Review runtime boundary",
    routeHref: "/proof/#runtime-boundary",
  },
  {
    title: "Runner Trust Split",
    status: "workflow trust boundary",
    proves: "Separates public PR workflows from trusted manual runner paths.",
    doesNotProve:
      "Does not prove private runner infrastructure details or broad public PR self-hosted safety beyond the workflow split.",
    routeLabel: "Open platform contracts",
    routeHref: "/platform/contracts/",
  },
  {
    title: "Standing Governance Controls",
    status: "merged reviewer-routing controls",
    proves: "Shows blocked-claim and reviewer-routing controls exist.",
    doesNotProve:
      "Does not prove runtime truth, signal truth, public-safe status, or GitHub Project metadata as proof.",
    routeLabel: "Open controls",
    routeHref: "/controls/",
  },
  {
    title: "Proof Pack 001 Quick Check",
    status: "bounded reviewer package",
    proves: "Routes the 90-second reviewer check, release path, manifest, and verifier cards.",
    doesNotProve:
      "Does not prove runtime proof promotion, public-safe runtime proof, or any production deployment claim.",
    routeLabel: "Open Proof Pack 001",
    routeHref: "/proof/proof-pack-001/",
  },
];

export default function CurrentProofSpine() {
  return (
    <section id="current-proof-spine" className="cockpit-section--tight">
      <div className="container">
        <div className="home-section__head mb-6">
          <p className="cockpit-eyebrow">Current proof spine</p>
          <h2
            className="cockpit-headline mt-2"
            style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)" }}
          >
            Current Proof Spine
          </h2>
          <p className="muted mt-3 max-w-3xl text-sm leading-6">
            Recent HawkinsOperations work that separates source truth, validation truth, runtime
            candidates, metrics, proof records, and blocked claims before anything is presented as
            proof. Website rendering is not proof.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {proofSpineCards.map((card) => (
            <article key={card.title} className="artifact-tile">
              <span className="artifact-tile__cat">Status</span>
              <span className="artifact-tile__title">{card.status}</span>
              <h3 className="mt-4 text-base font-semibold text-slate-50">{card.title}</h3>
              <dl className="mt-4 grid gap-3 text-sm leading-6">
                <div>
                  <dt className="mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-blue-100">
                    Proves
                  </dt>
                  <dd className="mt-1 text-slate-300">{card.proves}</dd>
                </div>
                <div>
                  <dt className="mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-amber-100">
                    Does not prove
                  </dt>
                  <dd className="mt-1 text-slate-400">{card.doesNotProve}</dd>
                </div>
              </dl>
              <a
                className="artifact-tile__link mt-4"
                href={card.routeHref}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
              >
                {card.routeLabel}
              </a>
            </article>
          ))}
        </div>

        <div className="biz-translate mt-4" role="note" aria-label="Current Proof Spine boundary">
          <span className="biz-translate__label">Boundary</span>
          <span>
            <span className="biz-translate__text">
              Website rendering and public navigation only. No proof promotion, no runtime-active
              claim, no signal-observed claim, no public-safe runtime proof, no production, SOCaaS,
              customer deployment, FortiSIEM integration-proven, autonomous SOC, AI disposition, or
              analyst disposition claim is made.
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
