import type { Metadata } from "next";
import GovernanceSavesCockpit from "@components/GovernanceSavesCockpit";
import LinkCard from "@components/LinkCard";
import StatusConsole from "@components/StatusConsole";
import WorkDashboard from "@components/WorkDashboard";
import { ceiling } from "@config/site";
import { governanceSavesSummary, publicGovernanceSaves } from "@data/governanceSaves";
import { registryStats, validationRows } from "@data/validationRegistry";
import { proofPack } from "@data/proofPackManifest";
import { externalLinks } from "@data/navigation";

export const metadata: Metadata = {
  title: "HawkinsOperations",
  description:
    "HawkinsOperations is governed detection engineering and AI Security Operations that turns AI-assisted security work into controlled, reviewable proof.",
  alternates: {
    canonical: "/",
  },
};

const cockpitMetrics = [
  { label: "Public ceiling", value: ceiling, note: "Current public claim ceiling." },
  { label: "Validation packages", value: String(registryStats.passedPackages), note: "Controlled-test packages only." },
  { label: "Controlled fixtures", value: String(registryStats.totalFixtures), note: "Positive and negative fixtures." },
  {
    label: "Governance Saves",
    value: `${publicGovernanceSaves.length} / ${governanceSavesSummary.ledgerRangeTotal}`,
    note: "Public-facing subset; private-only rows excluded.",
  },
  { label: "Proof pack", value: proofPack.id.replace("HAWKINSOPERATIONS_", ""), note: "Released reviewer package route." },
];

type RouteGroup = {
  label: string;
  routes: { href: string; title: string; description: string }[];
};

const routeGroups: RouteGroup[] = [
  {
    label: "Reviewer-grade proof surfaces",
    routes: [
      {
        href: "/proof/",
        title: "Proof authority",
        description: "Claim ceiling, proof records, blocked claim ledger, and promotion gates.",
      },
      {
        href: "/proof/proof-pack-001/",
        title: "Proof Pack 001",
        description: "Bounded HO-DET-001 reviewer package, manifest, checksum route, and proof ceiling.",
      },
      {
        href: "/proof/governance-saves/",
        title: "Governance Saves explorer",
        description: "Public-facing Governance Saves subset across nine categories of controls that fired.",
      },
      {
        href: "/socaas-ai-security-operations/",
        title: "SOCaaS / AI Security Operations",
        description: "Transferable implementation model with AI support-only and human authority boundaries.",
      },
    ],
  },
  {
    label: "Source · validation · platform",
    routes: [
      {
        href: "/validation/",
        title: "Validation registry",
        description: `${validationRows.length} validation rows with fixture counts and blocked runtime / signal states.`,
      },
      {
        href: "/pipeline/",
        title: "Pipeline",
        description: "Source-to-rendered-route flow with gates, verifier responsibilities, and receipt dependencies.",
      },
      {
        href: "/platform/contracts/",
        title: "Platform contracts",
        description: "Factory/controller, SOAR case packet, AI support-only, and blocked authority footers.",
      },
      {
        href: "/proof/runtime-proof-factory/",
        title: "Runtime boundary",
        description: "Bounded Runtime Proof Factory summaries with raw evidence private and public runtime proof blocked.",
      },
    ],
  },
  {
    label: "Maps · artifacts · controls",
    routes: [
      {
        href: "/artifacts/",
        title: "Artifact inventory",
        description: "Filterable reviewer receipts and artifact cards with does-not-prove boundaries.",
      },
      {
        href: "/architecture/",
        title: "System map",
        description: "Repository authority, truth surfaces, and control-plane separation.",
      },
      {
        href: "/controls/",
        title: "Claim firewall",
        description: "Allowed wording and blocked wording across runtime, signal, public-safe, and authority claims.",
      },
      {
        href: "/architecture/repo-authority-map/",
        title: "Repo authority map",
        description: "Six-repo authority model and truth-plane ownership.",
      },
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden cockpit-section hero-cockpit">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="container grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 items-start">
          <div className="reveal reveal--up">
            <p className="hero-cockpit__eyebrow">Reviewer cockpit</p>
            <h1 className="hero-cockpit__headline">
              HawkinsOperations.
              <span className="hero-cockpit__headline-emph">
                Governed detection engineering and AI Security Operations.
              </span>
            </h1>
            <p className="hero-cockpit__lede">
              HawkinsOperations turns AI-assisted security work into controlled, reviewable proof.
              Detections, validation cases, proof records, and reviewer artifacts route through claim
              boundaries — AI supports the labor; evidence and human review authorize claims.
            </p>

            <div className="hero-status" role="note" aria-label="Public ceiling and top receipt status">
              <span className="hero-status__chip hero-status__chip--released">Proof Pack 001 route</span>
              <span className="hero-status__chip hero-status__chip--det">HO-DET-001 case file</span>
              <span className="hero-status__chip hero-status__chip--det">{registryStats.totalFixtures} controlled fixtures</span>
              <span className="hero-status__chip hero-status__chip--det">GS-001-GS-080 subset</span>
              <span className="hero-status__chip hero-status__chip--ceiling">{ceiling}</span>
              <span className="hero-status__chip hero-status__chip--blocked">Runtime / signal blocked</span>
            </div>

            <div className="hero-cockpit__ctas">
              <a className="hero-cockpit__primary" href="/proof/">
                Open proof authority
              </a>
              <a className="hero-cockpit__secondary" href="/proof/governance-saves/">
                Governance Saves
              </a>
              <a className="hero-cockpit__secondary" href="/socaas-ai-security-operations/">
                SOCaaS model
              </a>
              <a className="hero-cockpit__secondary" href="/proof/proof-pack-001/">
                Proof Pack 001
              </a>
              <a className="hero-cockpit__tertiary" href={externalLinks.githubOrg} target="_blank" rel="noopener noreferrer">
                GitHub org
              </a>
            </div>
          </div>

          <div className="lg:pt-2 reveal reveal--up" data-delay="2">
            <StatusConsole showLoop={false} />
          </div>
        </div>
      </section>

      <section id="cockpit-metrics" className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <div className="mb-6">
            <p className="cockpit-eyebrow">What has shipped</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Compact receipts at the current ceiling.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              The homepage shows the reviewer cockpit. Full registries and detailed proof pages live on their owner routes.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {cockpitMetrics.map((metric) => (
              <article key={metric.label} className="card p-5">
                <p className="mono text-xs uppercase text-blue-100">{metric.label}</p>
                <p className="mt-3 break-words text-2xl font-semibold text-slate-50">{metric.value}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">{metric.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="governance-saves-cockpit" className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Governance Saves snapshot</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Where controls fired — by category.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Public-facing Governance Saves are organized by the failure mode they blocked. Open the explorer to
              filter, search, and inspect rendered records.
            </p>
          </div>
          <GovernanceSavesCockpit />
        </div>
      </section>

      <section id="work-shipped" className="cockpit-section--tight">
        <div className="container reveal reveal--up">
          <WorkDashboard />
        </div>
      </section>

      <section id="inspect-next" className="cockpit-section--tight pb-24">
        <div className="container reveal reveal--up">
          <div className="mb-6">
            <p className="cockpit-eyebrow">Inspect next</p>
            <h2 className="cockpit-headline mt-2" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>
              Choose the owner route.
            </h2>
            <p className="muted mt-3 text-sm leading-6 max-w-3xl">
              Parent pages summarize. Child and owner routes explain. Website rendering is not proof.
            </p>
          </div>
          <div className="grid gap-10">
            {routeGroups.map((group) => (
              <div key={group.label}>
                <h3 className="mono text-[0.65rem] tracking-[0.18em] uppercase text-blue-100 mb-3">
                  {group.label}
                </h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {group.routes.map((route) => (
                    <LinkCard
                      key={route.href}
                      href={route.href}
                      title={route.title}
                      description={route.description}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
