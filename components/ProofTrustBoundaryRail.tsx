/**
 * ProofTrustBoundaryRail
 *
 * Quiet metallic seal that closes the proof page. Locked-rail motif, not a
 * warning wall. States the standing boundary: rendering is not proof.
 */
export default function ProofTrustBoundaryRail() {
  return (
    <section className="ptbr" aria-label="Trust boundary">
      <div className="ptbr__rail">
        <span className="ptbr__seal" aria-hidden="true">
          <svg viewBox="0 0 48 48" role="presentation">
            <circle cx="24" cy="24" r="21" className="ptbr__seal-ring" />
            <path
              d="M24 13a7 7 0 0 0-7 7v3h-2v12h18V23h-2v-3a7 7 0 0 0-7-7zm-4 10v-3a4 4 0 0 1 8 0v3z"
              className="ptbr__seal-lock"
            />
          </svg>
        </span>
        <div className="ptbr__copy">
          <p className="ptbr__lead">Rendering is not proof.</p>
          <p className="ptbr__body">
            Evidence, validators, and human review authorize claims. The website
            routes reviewers to proof; it does not author it.
          </p>
        </div>
        <span className="ptbr__edge" aria-hidden="true" />
      </div>
    </section>
  );
}
