import { generatedStatusFreshnessLabel, metricDisplay } from "@data/generated/public-status.generated";

type ProofSpineCard = {
  title: string;
  status: string;
  supports: string;
  doesNotProve: string;
  routeLabel: string;
  routeHref: string;
  tier: "hero" | "supporting";
  external?: boolean;
};

const operatingLayers = [
  {
    title: "Proof Authority",
    copy:
      "Proof records, proof cards, proof packs, reviewer maps, accomplishment ledgers, and authority-boundary case studies control what can be claimed.",
  },
  {
    title: "Validation Engine",
    copy:
      "Local pipelines, parity checks, case-packet contracts, claim scanners, activity ledgers, and CI gates turn detection claims into repeatable checks.",
  },
  {
    title: "Platform Control Layer",
    copy:
      "Factory commands, ledger gates, state manifests, runtime candidates, recoverability drills, and SOAR packet contracts turn detections into governed workflow artifacts.",
  },
];

const metricStrip = [
  metricDisplay("governed_cases"),
  metricDisplay("validation_fires"),
  metricDisplay("validation_cases"),
  metricDisplay("proof_records"),
  metricDisplay("blocked_claims"),
  metricDisplay("public_safe_count"),
];

const proofSpineCards: ProofSpineCard[] = [
  {
    title: "HO-DET-001 Receipt Chain",
    status: "Controlled test validated",
    supports:
      "Connects detection source, validation receipt, platform contract, proof case study, website route, and reviewer handoff.",
    doesNotProve:
      "Does not prove SOCaaS deployment, customer deployment, FortiSIEM integration, production readiness, or public-safe runtime proof.",
    routeLabel: "Trace HO-DET-001",
    routeHref: "/proof/ho-det-001/",
    tier: "hero",
  },
  {
    title: "Lifetime Case Ledger v1",
    status: "append-gated accounting spine",
    supports:
      "Provides governed-case accounting, append gates, verifier-backed metrics, and state-manifest control.",
    doesNotProve:
      "Does not prove production case tracking, autonomous closure, or public runtime case proof.",
    routeLabel: "Inspect ledger route",
    routeHref: "/proof/#lifetime-case-ledger",
    tier: "hero",
  },
  {
    title: "Reviewer Metrics Pipeline v1",
    status: "reviewer-visible metrics",
    supports:
      "Separates strict governed cases from validation activity, proof records, and blocked-claim counts.",
    doesNotProve:
      "Does not prove production SOC metrics, customer metrics, runtime case volume, or public-safe runtime proof.",
    routeLabel: "Open proof metrics route",
    routeHref: "/proof/",
    tier: "hero",
  },
  {
    title: "Runtime Case Collector v0",
    status: "private candidate lane",
    supports:
      "Separates route, dedupe, append-gate handling, and Runtime Route Proof v1 private-candidate review routing.",
    doesNotProve:
      "Does not prove governed case append, public runtime-active proof, public signal-observed proof, or public-safe runtime proof.",
    routeLabel: "Review runtime boundary",
    routeHref: "/proof/#runtime-boundary",
    tier: "supporting",
  },
  {
    title: "Runner Trust Boundary",
    status: "workflow trust boundary",
    supports: "Separates public PR checks from manually triggered trusted-runner proof routes.",
    doesNotProve:
      "Does not expose private runner details or claim broad self-hosted PR safety.",
    routeLabel: "Open platform contracts",
    routeHref: "/platform/contracts/",
    tier: "supporting",
  },
  {
    title: "Standing Governance Controls",
    status: "reviewer-routing controls",
    supports:
      "Maintains blocked-claim controls, reviewer routing, PR review rituals, and proof-boundary enforcement surfaces.",
    doesNotProve:
      "Does not make GitHub Project metadata, website rendering, runtime truth, or signal truth into proof.",
    routeLabel: "Open Claim Firewall",
    routeHref: "/claim-firewall/",
    tier: "supporting",
  },
  {
    title: "Proof Pack 001 Quick Check",
    status: "bounded reviewer package",
    supports:
      "Routes the 90-second reviewer check, release path, manifest, hash/verification path, and verifier cards.",
    doesNotProve:
      "Does not prove runtime promotion, public-safe runtime proof, or production deployment.",
    routeLabel: "Open Proof Pack 001",
    routeHref: "/proof/proof-pack-001/",
    tier: "supporting",
  },
];

export default function CurrentProofSpine() {
  const heroSystems = proofSpineCards.filter((card) => card.tier === "hero");
  const supportingSystems = proofSpineCards.filter((card) => card.tier === "supporting");

  return (
    <section id="current-proof-spine" className="cockpit-section--tight">
      <div className="container">
        <div className="home-section__head mb-6 max-w-5xl">
          <p className="cockpit-eyebrow">Current proof spine</p>
          <h2
            className="cockpit-headline mt-2"
            style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)" }}
          >
            Proof authority, validation engine, platform control layer.
          </h2>
          <p className="muted mt-3 max-w-4xl text-base leading-7">
            HawkinsOperations exposes built work first: proof records, controlled validation,
            platform ledgers, governed metrics, reviewer routes, and claim-boundary controls are
            separated so reviewers can inspect the system without trusting the website presentation.
          </p>
        </div>

        <div className="mt-4 grid gap-2 rounded-md border border-blue-300/15 bg-blue-950/20 p-3 sm:grid-cols-3 xl:grid-cols-6">
          {metricStrip.map((metric) => (
            <div key={metric.label} className="rounded border border-slate-500/20 bg-slate-950/60 px-3 py-2">
              <span className="block text-xl font-semibold text-slate-50">{metric.value}</span>
              <span className="mono mt-1 block text-[0.66rem] uppercase tracking-[0.14em] text-blue-100">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-400">
          Generated public-status rendering input: {generatedStatusFreshnessLabel()}. Counts route
          to owning proof, platform, and validation records; this website does not authorize them.
        </p>

        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {operatingLayers.map((layer, index) => (
            <article
              key={layer.title}
              className="artifact-tile border-blue-300/20 bg-slate-950/70"
            >
              <span className="artifact-tile__cat">Layer 0{index + 1}</span>
              <h3 className="mt-2 text-lg font-semibold text-slate-50">{layer.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{layer.copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {heroSystems.map((card) => (
            <article key={card.title} className="artifact-tile border-blue-300/25 bg-slate-950/80">
              <span className="artifact-tile__cat">Hero system · {card.status}</span>
              <h3 className="mt-3 text-lg font-semibold text-slate-50">{card.title}</h3>
              <dl className="mt-4 grid gap-3 text-sm leading-6">
                <div>
                  <dt className="mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-blue-100">
                    Supports
                  </dt>
                  <dd className="mt-1 text-slate-300">{card.supports}</dd>
                </div>
                <div>
                  <dt className="mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-amber-100">
                    Boundary
                  </dt>
                  <dd className="mt-1 text-slate-400">
                    <details className="proof-boundary-details">
                      <summary>Open proof ceiling</summary>
                      <span>{card.doesNotProve}</span>
                    </details>
                  </dd>
                </div>
              </dl>
              <a
                className="artifact-tile__link mt-4"
                href={card.routeHref}
              >
                {card.routeLabel}
              </a>
            </article>
          ))}
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {supportingSystems.map((card) => (
            <article key={card.title} className="artifact-tile">
              <span className="artifact-tile__cat">Supporting system · {card.status}</span>
              <h3 className="mt-3 text-base font-semibold text-slate-50">{card.title}</h3>
              <dl className="mt-4 grid gap-3 text-sm leading-6">
                <div>
                  <dt className="mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-blue-100">
                    Supports
                  </dt>
                  <dd className="mt-1 text-slate-300">{card.supports}</dd>
                </div>
                <div>
                  <dt className="mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-amber-100">
                    Boundary
                  </dt>
                  <dd className="mt-1 text-slate-400">
                    <details className="proof-boundary-details">
                      <summary>Open proof ceiling</summary>
                      <span>{card.doesNotProve}</span>
                    </details>
                  </dd>
                </div>
              </dl>
              <a className="artifact-tile__link mt-4" href={card.routeHref}>
                {card.routeLabel}
              </a>
            </article>
          ))}
        </div>

        <div className="biz-translate mt-4" role="note" aria-label="Current Proof Spine boundary">
          <span className="biz-translate__label">Boundary</span>
          <span>
            <span className="biz-translate__text">
              Website rendering is not proof; public navigation only. This section compresses the
              operating model for reviewers; it does not promote proof, runtime-active status,
              signal-observed status, public-safe runtime proof, production/SOCaaS/customer
              deployment, FortiSIEM integration, autonomous SOC, AI disposition, or analyst
              disposition authority.
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
