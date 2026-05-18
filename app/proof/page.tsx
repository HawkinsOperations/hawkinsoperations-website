import type { Metadata } from "next";
import ArtifactFamilyMatrix from "@components/ArtifactFamilyMatrix";
import RecentGovernedArtifacts from "@components/RecentGovernedArtifacts";
import ClaimFirewallPanel from "@components/ClaimFirewallPanel";
import PromotionGateLadder from "@components/PromotionGateLadder";
import ProofPathTimeline, { type ProofPathStep } from "@components/ProofPathTimeline";
import StatusConsole from "@components/StatusConsole";
import { allowedClaims, promotionRequirements } from "@data/claims";
import { blockedClaims } from "@config/blocked-claims";
import { proofRecords } from "@data/proofRecords";
import { externalLinks } from "@data/navigation";
import { ceiling, publicSafe } from "@config/site";

export const metadata: Metadata = {
  title: "Proof | HawkinsOps",
  description:
    "HawkinsOperations proof authority console: public ceiling, supported claim routes, blocked claim firewall, proof records, and promotion gates.",
};

type ClaimRow = { id: string; scope: string; text: string; gate: string };
type BlockedCategory = { id: string; eyebrow: string; title: string; reason: string; terms: string[] };

const supportedRoutes: ClaimRow[] = allowedClaims.map((c, i) => {
  const scope = i < 2 ? "system" : i < 4 ? "HO-DET-001" : "system";
  const gate =
    i < 2
      ? "rendering layer → repo authority"
      : i < 4
      ? "controlled-test validation → proof record"
      : "doctrine boundary → blocked-claim scanner";
  return { id: `A·${String(i + 1).padStart(2, "0")}`, scope, text: c, gate };
});

const blockedCategorization = (terms: string[]): BlockedCategory[] => {
  const has = (needle: string) => terms.find((t) => t.toLowerCase() === needle.toLowerCase());
  const pull = (needles: string[]) =>
    needles.map((n) => has(n)).filter((t): t is string => Boolean(t));
  return [
    {
      id: "runtime",
      eyebrow: "Runtime",
      title: "Runtime promotions are blocked",
      reason: "No public runtime evidence has been linked. Source presence is not runtime.",
      terms: pull(["runtime-active", "production-ready", "fleet-wide"]),
    },
    {
      id: "signal",
      eyebrow: "Signal",
      title: "Signal promotions are blocked",
      reason: "No public signal-observation receipt has been promoted to the surface.",
      terms: pull([
        "signal-observed",
        "live Splunk fired",
        "Splunk-proven Runtime Signal 001",
        "Cribl-routed",
        "Wazuh-routed",
        "AWS-live",
      ]),
    },
    {
      id: "public-safe",
      eyebrow: "Public-safe",
      title: "Public-safe promotions are blocked",
      reason: "Public-safe status requires evidence linkage and explicit promotion. The current state is NOT_PUBLIC_SAFE.",
      terms: pull(["public-safe", "public-safe runtime proof"]),
    },
    {
      id: "authority",
      eyebrow: "AI / analyst authority",
      title: "Disposition authority promotions are blocked",
      reason: "AI is labor. Governance is authority. No model or implied analyst chain can promote a claim from this surface.",
      terms: pull(["autonomous SOC", "AI-approved disposition", "analyst-approved disposition"]),
    },
  ];
};

const flagshipTraceSteps: ProofPathStep[] = [
  {
    code: "SOURCE_PRESENT",
    label: "Source present",
    line: "Detection rule and SPL reside in the detections repo under version control with a stated owner.",
    href: externalLinks.hoDet001Rule,
    external: true,
  },
  {
    code: "FIXTURE_VALIDATED",
    label: "Fixture validated",
    line: "HO-DET-001 passes controlled positive and negative cases in the validation repo.",
    href: externalLinks.validationReportHo,
    external: true,
  },
  {
    code: "RECORD_PUBLISHED",
    label: "Record published",
    line: "Public proof record holds the stated ceiling and links back to source and validation.",
    href: externalLinks.proofRecord,
    external: true,
  },
  {
    code: "CEILING_HELD",
    label: "Ceiling held",
    line: "Public surface holds at CONTROLLED_TEST_VALIDATED. Stronger wording is blocked until promotion clears.",
    href: "/proof/ho-det-001/",
  },
];

export default function ProofIndexPage() {
  const blockedCategories = blockedCategorization(blockedClaims);

  return (
    <>
      {/* ── Hero · proof authority surface ────────────────────────────── */}
      <section className="relative overflow-hidden cockpit-section">
        <div className="container grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 items-start">
          <div>
            <p className="cockpit-eyebrow">Proof authority surface</p>
            <h1 className="cockpit-headline cockpit-headline--xl mt-5">
              Proof ledger.
              <span className="block mt-2" style={{ color: "var(--electric-blue-bright)" }}>
                Routing only. Evidence lives in the repos.
              </span>
            </h1>
            <p className="lede mt-7 max-w-2xl" style={{ color: "var(--silver)" }}>
              The ledger shows what can be claimed publicly, what is blocked from public wording, and
              which repository owns the underlying evidence. Website rendering is not proof.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a className="cta cta-primary" href="#ceiling-console">See the ceiling →</a>
              <a className="cta cta-quiet" href="#blocked-firewall">Open the firewall</a>
              <a className="cta cta-quiet" href={externalLinks.proofRecord} target="_blank" rel="noopener noreferrer">Proof repo ↗</a>
            </div>
          </div>

          <div className="lg:pt-2">
            <StatusConsole />
          </div>
        </div>

        <div className="container mt-12">
          <hr className="cockpit-rule" />
        </div>
      </section>

      {/* ── Ceiling authority console ─────────────────────────────────── */}
      <section id="recent-governed-proof-work" className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <RecentGovernedArtifacts
            surface="proof"
            heading="Recent governed proof-repo work"
            sub="Recent governed work on the proof repo. Public-safe reviewer cards. Hand-maintained static snapshot. Does not promote runtime or public-safe runtime proof."
          />
          <div className="biz-translate" role="note" aria-label="Business translation">
            <span className="biz-translate__label">In plain English</span>
            <span><span className="biz-translate__text">Proof-repo updates are reviewer-visible but do not change the public claim ceiling. Stronger wording requires a separate evidence-backed promotion gate.</span></span>
          </div>
        </div>
      </section>

      <section id="ceiling-console" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">01 · Ceiling</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Public proof ceiling holds at controlled-test scope.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Stronger runtime, signal, evidence, and public-safe wording cannot ship from this surface
              until separate evidence-backed promotion clears them.
            </p>
          </div>

          <div className="ceiling-authority-panel" aria-label="Ceiling authority panel">
            <div className="ceiling-authority-panel__left">
              <span className="mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--ice-blue)]">Current ceiling</span>
              <span className="ceiling-authority-panel__token mono">{ceiling}</span>
              <span className="ceiling-authority-panel__sub">Controlled · Test · Validated</span>
            </div>
            <div className="ceiling-authority-panel__rail" aria-hidden="true">
              <svg viewBox="0 0 320 96" role="img" aria-label="Boundary rail: validated to gate to stronger claims">
                <defs>
                  <marker id="cap-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L10,5 L0,10 z" fill="var(--electric-blue-bright)" />
                  </marker>
                </defs>
                <line x1={20} y1={48} x2={300} y2={48} stroke="var(--diagram-line-strong)" strokeWidth={2} />
                <circle cx={36} cy={48} r={9} fill="var(--electric-blue)" stroke="var(--electric-blue-bright)" strokeWidth={1.8} />
                <text x={36} y={26} fontSize={8} fontFamily='"JetBrains Mono", monospace' fill="var(--ice-blue)" textAnchor="middle" letterSpacing="2">CONTROLLED</text>
                <rect x={132} y={32} width={56} height={32} rx={4} fill="rgba(8,13,22,0.94)" stroke="var(--electric-blue-bright)" strokeWidth={1.4} />
                <text x={160} y={52} fontSize={9} fontFamily='"JetBrains Mono", monospace' fill="var(--silver-bright)" textAnchor="middle" letterSpacing="1.6">GATE</text>
                <line x1={46} y1={48} x2={130} y2={48} stroke="var(--electric-blue-bright)" strokeWidth={1.6} markerEnd="url(#cap-arrow)" />
                <line x1={190} y1={48} x2={284} y2={48} stroke="var(--electric-blue-bright)" strokeWidth={1.6} markerEnd="url(#cap-arrow)" strokeDasharray="4 4" />
                <circle cx={296} cy={48} r={9} fill="rgba(8,13,22,0.94)" stroke="var(--silver-bright)" strokeWidth={1.8} />
                <text x={296} y={26} fontSize={8} fontFamily='"JetBrains Mono", monospace' fill="var(--silver-bright)" textAnchor="middle" letterSpacing="2">STRONGER</text>
                <text x={160} y={84} fontSize={8} fontFamily='"JetBrains Mono", monospace' fill="var(--muted)" textAnchor="middle" letterSpacing="1.5">promotion required</text>
              </svg>
            </div>
            <div className="ceiling-authority-panel__right">
              <span className="mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--silver)]">What this means</span>
              <ul className="ceiling-authority-panel__list">
                <li><strong>Validated</strong> · controlled-test scope inside the validation repo.</li>
                <li><strong>Routing only</strong> · the website does not author proof.</li>
                <li><strong>Public-safe</strong> · {publicSafe} · gated by evidence linkage.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Supported claim routes ────────────────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">02 · Supported</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Supported public claim routes.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Each row maps a supported claim to its scope and the evidence route that backs it.
              Stronger wording requires a separate promotion gate below.
            </p>
          </div>

          <div className="claim-route-grid">
            {supportedRoutes.map((row) => (
              <article key={row.id} className="claim-route-card" data-scope={row.scope}>
                <header className="claim-route-card__head">
                  <span className="claim-route-card__id mono">{row.id}</span>
                  <span className="claim-route-card__scope mono">{row.scope}</span>
                </header>
                <p className="claim-route-card__text">{row.text}</p>
                <div className="claim-route-card__rail" aria-hidden="true">
                  <span className="claim-route-card__rail-dot" />
                  <span className="claim-route-card__rail-line" />
                  <span className="claim-route-card__rail-dot claim-route-card__rail-dot--end" />
                </div>
                <p className="claim-route-card__gate mono">route · {row.gate}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blocked firewall ─────────────────────────────────────────── */}
      <section id="blocked-firewall" className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">03 · Blocked</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Blocked public claims · categorized.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Blocked claims stay visible. They describe what the public surface does not assert
              and remain blocked until an evidence-backed promotion gate changes their state.
            </p>
          </div>

          <ClaimFirewallPanel />

          <div className="blocked-category-grid mt-7" data-ci-target="blocked-claims">
            {blockedCategories.map((cat) => (
              <article key={cat.id} className="blocked-category">
                <header className="blocked-category__head">
                  <span className="mono text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: "#FCA5A5" }}>{cat.eyebrow}</span>
                  <h3 className="blocked-category__title">{cat.title}</h3>
                </header>
                <p className="blocked-category__reason">{cat.reason}</p>
                <ul className="blocked-category__chips" aria-label={`${cat.eyebrow} blocked terms`}>
                  {cat.terms.map((term) => (
                    <li key={term} className="blocked-category__chip" title={`${term} is blocked from public wording`}>
                      <span aria-hidden="true">⊘</span>
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Artifact registry preview ─────────────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">04 · Registry</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Seven families · four evidence axes.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Filled cells are supported at the current ceiling. Hollow cells require a specific
              promotion gate before they can be claimed.
            </p>
          </div>
          <ArtifactFamilyMatrix />
        </div>
      </section>

      {/* ── Proof records · receipt panels ────────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">05 · Records</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Proof records · receipt panels.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Each record holds its bounded ceiling, the surface it supports, and the routes back
              to source and validation.
            </p>
          </div>

          {proofRecords[0] && (
            <div className="mb-7">
              <ProofPathTimeline
                detectionId={proofRecords[0].detectionId}
                title="Source to public boundary"
                steps={flagshipTraceSteps}
              />
            </div>
          )}

          <div className="grid gap-5">
            {proofRecords.map((record) => (
              <article
                key={record.detectionId}
                className="proof-receipt-panel"
                data-detection-id={record.detectionId}
                data-proof-ceiling={record.proofLevel}
              >
                <header className="proof-receipt-panel__head">
                  <div className="proof-receipt-panel__head-left">
                    <span className="mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--ice-blue)]">Detection ID</span>
                    <h3 className="proof-receipt-panel__id">{record.detectionId}</h3>
                    <p className="proof-receipt-panel__sub">{record.title}</p>
                  </div>
                  <div className="proof-receipt-panel__head-right">
                    <span className="mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--silver)]">Ceiling</span>
                    <span className="proof-receipt-panel__ceiling mono">{record.proofLevel}</span>
                  </div>
                </header>

                <dl className="proof-receipt-panel__cells">
                  <div className="proof-receipt-panel__cell">
                    <dt className="mono">Validation</dt>
                    <dd className="proof-receipt-panel__cell-strong" data-ci-target="validation-status">{record.validationState}</dd>
                  </div>
                  <div className="proof-receipt-panel__cell">
                    <dt className="mono">Runtime</dt>
                    <dd className="proof-receipt-panel__cell-block">{record.runtimeState}</dd>
                  </div>
                  <div className="proof-receipt-panel__cell">
                    <dt className="mono">Signal</dt>
                    <dd className="proof-receipt-panel__cell-block">{record.signalState}</dd>
                  </div>
                  <div className="proof-receipt-panel__cell">
                    <dt className="mono">Public-safe state</dt>
                    <dd className="proof-receipt-panel__cell-strong">{record.publicSafeState}</dd>
                  </div>
                </dl>

                <footer className="proof-receipt-panel__foot">
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
        </div>
      </section>

      {/* ── Proof Pack 001 receipt console ─────────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Proof pack · release path</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Proof Pack 001 · receipt console.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              The official GitHub Release is published from the proof repo. This surface routes
              reviewers to the release; it does not raise the public proof ceiling.
            </p>
          </div>

          <div className="proof-pack-console proof-pack-console--ledger" aria-label="Proof Pack 001 receipt console">
            <header className="proof-pack-console__head">
              <div>
                <p className="cockpit-eyebrow">Proof Pack 001</p>
                <h3 className="proof-pack-console__title">
                  HO-DET-001 · official reviewer release route.
                </h3>
                <p className="proof-pack-console__sub">
                  Reviewer packet, manifest, checksum file, proof card, proof record, validation
                  record, ledger/schema, and proof verifier are packaged in the approved release ZIP.
                  Nothing here promotes runtime, signal, production, or stronger public proof status.
                </p>
              </div>
              <span className="proof-pack-console__ceiling mono">{ceiling}</span>
            </header>
            <dl className="proof-pack-console__grid">
              <div className="proof-pack-console__cell">
                <dt>Pack ID</dt>
                <dd className="mono">HAWKINSOPERATIONS_PROOF_PACK_001</dd>
              </div>
              <div className="proof-pack-console__cell">
                <dt>Detection</dt>
                <dd className="mono">HO-DET-001</dd>
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
                <dt>Public-safe state</dt>
                <dd className="mono proof-pack-console__cell-block">{publicSafe}</dd>
              </div>
              <div className="proof-pack-console__cell">
                <dt>Public-safe runtime proof</dt>
                <dd className="mono proof-pack-console__cell-block">BLOCKED</dd>
              </div>
              <div className="proof-pack-console__cell">
                <dt>Next gate</dt>
                <dd className="mono">RUNTIME_AND_SIGNAL_EVIDENCE_REVIEW</dd>
              </div>
            </dl>
            <footer className="proof-pack-console__foot">
              <span className="mono">GitHub Release route · ZIP asset only · no signing claimed</span>
              <a className="cta cta-primary" href={externalLinks.proofPack001Release} target="_blank" rel="noopener noreferrer">
                Open official release ↗
              </a>
              <a className="cta cta-quiet" href="/artifacts/">Artifact coverage →</a>
            </footer>
          </div>
        </div>
      </section>

      {/* ── Boundary statement ────────────────────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">06 · Boundary</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              What this proves — and what it does not.
            </h2>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            <div className="status-band">
              <span className="status-band__rule" aria-hidden="true"></span>
              <div>
                <p className="mono text-[0.6rem] tracking-[0.2em] uppercase text-[var(--ice-blue)]">Proves</p>
                <p className="mt-1 text-sm leading-6 text-[var(--silver)]">
                  The public proof ceiling is stated, controlled-test validation passed inside its
                  declared scope, blocked promotions are visible, and reviewers can route from
                  rendered surface to record to source.
                </p>
              </div>
            </div>
            <div className="status-band status-band--block">
              <span className="status-band__rule" aria-hidden="true"></span>
              <div>
                <p className="mono text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: "#FCA5A5" }}>Does not prove</p>
                <p className="mt-1 text-sm leading-6 text-[var(--silver)]">
                  Runtime activation, signal observation, fleet scope, autonomous SOC, AI-approved disposition,
                  and public-safe runtime proof — none of these are claimed from this surface.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Promotion gate ladder ─────────────────────────────────────── */}
      <section className="cockpit-section--tight">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">07 · Gates</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Promotion gate ladder.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Each rung names what must hold before stronger public wording can ship. The ladder
              is sequential — no rung is skipped.
            </p>
          </div>
          <PromotionGateLadder items={promotionRequirements} ariaLabel="Promotion gate ladder · supported claim promotion" />
        </div>
      </section>

      {/* ── Control routes ────────────────────────────────────────────── */}
      <section className="cockpit-section--tight pb-24">
        <div className="container">
          <div className="mb-6">
            <p className="cockpit-eyebrow">08 · Routes</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Control links.
            </h2>
          </div>
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
        </div>
      </section>
    </>
  );
}
