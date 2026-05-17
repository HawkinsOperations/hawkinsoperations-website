import { ceiling } from "@config/site";

/**
 * BoundaryRail
 *
 * Sticky bottom strip that carries the three load-bearing boundary
 * statements (ceiling, rendering posture, human review) on every page
 * except About. Compresses the repeated boundary notices that previously
 * crowded the body of every section.
 *
 * About is suppressed via `body:has(.page-about) .boundary-rail { display: none }`
 * in design-system-v2.css.
 *
 * Server-rendered. No state, no script.
 */
export default function BoundaryRail() {
  return (
    <aside className="boundary-rail" role="contentinfo" aria-label="Public claim boundary">
      <span className="boundary-rail__item boundary-rail__item--ceiling">
        Ceiling · {ceiling}
      </span>
      <span className="boundary-rail__sep">·</span>
      <span className="boundary-rail__item boundary-rail__item--block">
        Website rendering is not proof
      </span>
      <span className="boundary-rail__sep">·</span>
      <span className="boundary-rail__item">Human review required</span>
      <span className="boundary-rail__sep">·</span>
      <a className="boundary-rail__item" href="/proof/">
        Open ledger →
      </a>
    </aside>
  );
}
