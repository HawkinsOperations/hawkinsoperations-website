/**
 * BoundaryDrawer
 *
 * Reusable expandable drawer for the "what exists / what it proves / what it
 * does not prove" pattern. One source of truth used across the validation
 * registry, proof records, and platform contracts. Website rendering is not
 * proof; the does-not-prove column keeps the boundary explicit.
 */

export interface BoundaryDrawerProps {
  summary: string;
  exists: string[];
  proves: string[];
  doesNotProve: string[];
  className?: string;
  open?: boolean;
}

export default function BoundaryDrawer({
  summary,
  exists,
  proves,
  doesNotProve,
  className,
  open,
}: BoundaryDrawerProps) {
  return (
    <details className={`boundary-drawer ${className ?? ""}`} open={open}>
      <summary>
        <span>{summary}</span>
      </summary>
      <div className="boundary-drawer__grid">
        <div className="boundary-drawer__col boundary-drawer__col--exists">
          <h4>What exists</h4>
          <ul>
            {exists.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="boundary-drawer__col boundary-drawer__col--proves">
          <h4>What it proves</h4>
          <ul>
            {proves.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="boundary-drawer__col boundary-drawer__col--block">
          <h4>What it does not prove</h4>
          <ul>
            {doesNotProve.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </details>
  );
}
