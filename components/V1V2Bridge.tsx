/**
 * V1V2Bridge
 *
 * One-line bridge replacing the larger "prior context strip" on the
 * homepage. Legacy metrics are not surfaced as if they were V2 claims.
 *
 * Wording follows the approved standard: V1/original HawkinsOps is
 * legacy reference; HawkinsOperations V2 is the governed successor
 * architecture.
 */
export default function V1V2Bridge() {
  return (
    <div className="v1v2-bridge" aria-label="V1 to V2 lineage">
      <span className="v1v2-bridge__side v1v2-bridge__side--legacy">
        HawkinsOps V1 · legacy reference
      </span>
      <span className="v1v2-bridge__arrow">────▶</span>
      <span className="v1v2-bridge__side v1v2-bridge__side--current">
        HawkinsOperations V2 · governed successor
      </span>
      <p className="v1v2-bridge__caption">
        V1 detection counts and case metrics are historical context, not current V2 claims. Current claims
        are bounded by source, validation, evidence, and the controlled-test ceiling.{" "}
        <a href="/legacy/">Legacy boundary →</a>
      </p>
    </div>
  );
}
