import { validationRows } from "@data/validationRegistry";
import { externalLinks } from "@data/navigation";

/**
 * FeaturedWork
 *
 * Compact highlight of actual work units, sourced from the validation
 * registry data (not a parallel dataset). Each card states what was built,
 * its controlled-test status, what it supports, what it does not prove, and
 * where to inspect it. Website rendering is not proof.
 */
type WorkCard = {
  tag: string;
  title: string;
  built: string;
  status: string;
  tone: "ceiling" | "release" | "warn";
  supports: string;
  doesNotProve: string;
  inspect: { label: string; href: string; external?: boolean };
};

const row = (id: string) => validationRows.find((r) => r.id === id)!;

const fromRow = (id: string, inspect: WorkCard["inspect"]): WorkCard => {
  const r = row(id);
  return {
    tag: `${r.id} · ${r.family}`,
    title: r.name,
    built: r.fixtures ? `${r.fixtures.total} controlled fixtures` : "contract sample · no fixtures",
    status: r.noProofRecord ? `${r.claimCeiling} · NO_PROOF_RECORD` : r.claimCeiling,
    tone: r.noProofRecord ? "warn" : "ceiling",
    supports: r.proves[0],
    doesNotProve: r.doesNotProve[0],
    inspect,
  };
};

const idRows = validationRows.filter((r) => r.family === "Identity");
const idFixtures = idRows.reduce((sum, r) => sum + (r.fixtures?.total ?? 0), 0);

const cards: WorkCard[] = [
  fromRow("HO-DET-001", { label: "Open proof card", href: "/proof/ho-det-001/" }),
  fromRow("HO-DET-011", { label: "Validation registry", href: "/proof/#validation-registry" }),
  fromRow("HO-DET-012", { label: "Validation registry", href: "/proof/#validation-registry" }),
  fromRow("AWS-DET-001", { label: "Validation registry", href: "/proof/#validation-registry" }),
  {
    tag: `ID-DET-001…004 · Identity`,
    title: "Identity detection family",
    built: `${idRows.length} detections · ${idFixtures} controlled fixtures`,
    status: "CONTROLLED_TEST_VALIDATED · NO_PROOF_RECORD",
    tone: "warn",
    supports: "Identity-context detections pass deterministic controlled fixtures.",
    doesNotProve: "Live IdP coverage and identity completeness are not claimed.",
    inspect: { label: "Validation registry", href: "/proof/#validation-registry" },
  },
  {
    tag: "PROOF PACK 001 · Release",
    title: "Proof Pack 001",
    built: "Released proof pack manifest with included / excluded items.",
    status: "RELEASED · CONTROLLED_TEST_VALIDATED",
    tone: "release",
    supports: "A bounded, reviewable evidence bundle routed from the proof repo.",
    doesNotProve: "Runtime, signal, or public-safe runtime proof.",
    inspect: { label: "Open GitHub release", href: externalLinks.proofPack001Release, external: true },
  },
];

export default function FeaturedWork() {
  return (
    <div className="featwork" aria-label="Featured work units">
      {cards.map((c) => (
        <article key={c.tag} className="featwork__card">
          <header className="featwork__head">
            <span className="featwork__tag">{c.tag}</span>
            <span className={`featwork__status featwork__status--${c.tone}`}>{c.status}</span>
          </header>
          <h3 className="featwork__title">{c.title}</h3>
          <p className="featwork__built">{c.built}</p>
          <dl className="featwork__facts">
            <div>
              <dt>Supports</dt>
              <dd>{c.supports}</dd>
            </div>
            <div className="featwork__fact--blocked">
              <dt>Does not prove</dt>
              <dd>{c.doesNotProve}</dd>
            </div>
          </dl>
          <a
            className="featwork__inspect"
            href={c.inspect.href}
            target={c.inspect.external ? "_blank" : undefined}
            rel={c.inspect.external ? "noopener noreferrer" : undefined}
          >
            {c.inspect.label} {c.inspect.external ? "↗" : "→"}
          </a>
        </article>
      ))}
    </div>
  );
}
