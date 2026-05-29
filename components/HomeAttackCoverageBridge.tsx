/**
 * HomeAttackCoverageBridge
 *
 * Compact, cinematic homepage framework / reviewer-orientation module.
 * Renders the reviewer route Cyber Kill Chain -> MITRE ATT&CK -> Detection
 * Source -> Validation State -> Proof Boundary, plus a compact preview of the
 * mapped detection families from src/data/attackCoverage.ts.
 *
 * Claim contract:
 *  - This module is reviewer navigation and coverage intent only. It does not
 *    prove live coverage, runtime signal, or customer use. Validation records
 *    and proof boundaries authorize claims. Website rendering is not proof.
 *  - It is NOT the full AttackCoverageMap registry; it is a compact bridge that
 *    routes reviewers to /detections/ for the full surface.
 */

import { attackFamilies, type AttackTone } from "@data/attackCoverage";

type RouteNode = {
  step: string;
  label: string;
  detail: string;
  boundary?: boolean;
};

const routeNodes: RouteNode[] = [
  {
    step: "01",
    label: "Cyber Kill Chain",
    detail: "Orient where a behavior sits in the attack lifecycle.",
  },
  {
    step: "02",
    label: "MITRE ATT&CK",
    detail: "Map detection intent to ATT&CK techniques and tactics.",
  },
  {
    step: "03",
    label: "Detection Source",
    detail: "Inspect the repo-backed detection package behind the mapping.",
  },
  {
    step: "04",
    label: "Validation State",
    detail: "Read controlled-test counts and the claim ceiling.",
  },
  {
    step: "05",
    label: "Proof Boundary",
    detail: "Validation records and proof boundaries authorize claims; live coverage and runtime signal stay blocked.",
    boundary: true,
  },
];

const toneLabel: Record<AttackTone, string> = {
  validated: "validated",
  fixture: "fixture-only",
  private: "private · not public-safe",
  planned: "validation planned",
  contract: "contract only",
};

// Compact preview only — a few families, not the full registry wall.
const previewFamilies = attackFamilies.slice(0, 6);

export default function HomeAttackCoverageBridge() {
  return (
    <div className="home-acb" role="region" aria-labelledby="home-acb-title">
      <div className="home-acb__intro">
        <p className="cockpit-eyebrow">Cyber Kill Chain / MITRE ATT&CK</p>
        <h2 id="home-acb-title" className="cockpit-headline mt-2 home-acb__headline">
          Attack context routes into proof boundaries.
        </h2>
        <p className="home-acb__body">
          Use attack-lifecycle mapping to orient detection intent, ATT&CK context, validation state,
          and claim ceilings. The map helps reviewers navigate the system; it does not prove live
          coverage or runtime signal.
        </p>
      </div>

      <ol className="home-acb__route" aria-label="Reviewer route from attack context to proof boundary">
        {routeNodes.map((node) => (
          <li
            key={node.step}
            className={`home-acb__node${node.boundary ? " home-acb__node--boundary" : ""}`}
          >
            <span className="home-acb__node-step" aria-hidden="true">{node.step}</span>
            <span className="home-acb__node-label">{node.label}</span>
            <span className="home-acb__node-detail">{node.detail}</span>
            {node.boundary && (
              <span className="home-acb__node-flag">RUNTIME / SIGNAL · BLOCKED</span>
            )}
          </li>
        ))}
      </ol>

      <div className="home-acb__families" aria-label="Mapped detection families preview">
        <span className="home-acb__families-label">Mapped families</span>
        <ul className="home-acb__family-list">
          {previewFamilies.map((fam) => {
            const lead = fam.nodes[0];
            return (
              <li key={fam.family} className="home-acb__family">
                <span className={`attack-dot attack-dot--${lead.tone}`} aria-hidden="true" />
                <span className="home-acb__family-name">{fam.family}</span>
                <span className="home-acb__family-tone">{toneLabel[lead.tone]}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="home-acb__boundary" role="note">
        <strong>Boundary.</strong> Mapping is reviewer navigation. Validation records and proof
        boundaries authorize claims.
      </p>

      <a className="home-acb__cta" href="/detections/" aria-label="Inspect coverage map on the detections page">
        <span>Inspect coverage map</span>
        <span className="home-acb__cta-arrow" aria-hidden="true">→</span>
      </a>
    </div>
  );
}
