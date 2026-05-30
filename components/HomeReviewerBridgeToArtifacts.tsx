import { artifacts, type Artifact } from "@data/artifacts";

/**
 * HomeReviewerBridgeToArtifacts
 *
 * Connective rail that makes the Home → Artifacts transition explicit:
 * Home explains the control plane; Artifacts shows the inspectable receipts.
 * Three flagship artifact previews are full-card links (no tiny click
 * targets). Uses existing public-safe artifact data only — no invented
 * artifacts, no claim promotion.
 */

const previewSlugs = [
  "ho-det-001-proof-record",
  "controlled-test-validation-boundary",
  "claim-firewall",
] as const;

const previews: Artifact[] = previewSlugs
  .map((slug) => artifacts.find((a) => a.slug === slug))
  .filter((a): a is Artifact => Boolean(a));

export default function HomeReviewerBridgeToArtifacts() {
  return (
    <div className="hrb">
      <div className="hrb__intro">
        <p className="cockpit-eyebrow">From cockpit to receipts</p>
        <h2 className="hrb__title">
          Home explains the control plane.{" "}
          <span className="hrb__title-emph">Artifacts shows the receipts.</span>
        </h2>
        <p className="hrb__lede">
          Every claim on this site is meant to be inspectable. Artifacts is the
          evidence bay: each card routes to a receipt and states what it supports
          and what it does not prove. Website rendering is not proof.
        </p>
        <a className="hrb__cta" href="/artifacts/">
          <span>Open the evidence bay</span>
          <span aria-hidden="true" className="hrb__cta-arrow">→</span>
        </a>
      </div>

      <ul className="hrb__previews" role="list" aria-label="Flagship reviewer artifacts">
        {previews.map((artifact) => {
          const external = artifact.primary.external === true;
          return (
            <li key={artifact.slug}>
              <a
                className="hrb__card"
                href={artifact.primary.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={`${artifact.title}: ${artifact.primary.label}`}
              >
                <span className="hrb__card-cat">{artifact.truthSurface.toUpperCase()}</span>
                <span className="hrb__card-title">{artifact.title}</span>
                <span className="hrb__card-split">
                  <span className="hrb__card-supports">
                    <span className="hrb__card-label">Supports</span>
                    {artifact.proves}
                  </span>
                  <span className="hrb__card-blocks">
                    <span className="hrb__card-label">Does not prove</span>
                    {artifact.doesNotProve}
                  </span>
                </span>
                <span className="hrb__card-cta">
                  {artifact.primary.label} {external ? "↗" : "→"}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
