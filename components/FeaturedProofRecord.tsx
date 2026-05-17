import ProofPathTimeline, { type ProofPathStep } from "@components/ProofPathTimeline";
import { ceiling } from "@config/site";

/**
 * FeaturedProofRecord
 *
 * Paper slab that hosts the flagship proof record (HO-DET-001 by default).
 * Wraps the existing ProofPathTimeline so its receipts re-tint cleanly on
 * the paper surface. Adds a ceiling stamp in the slab header.
 *
 * Claim contract: ceiling label comes from config/site.ts. The wrapped
 * timeline preserves every receipt code and link as-is.
 */
export default function FeaturedProofRecord({
  detectionId = "HO-DET-001",
  title = "Source to public boundary",
  eyebrow = "Flagship proof path",
  summary = "Eight named receipts move a single detection from version-controlled source to the current public claim boundary. Each receipt is re-runnable; none promotes the record beyond the controlled-test ceiling.",
  steps,
}: {
  detectionId?: string;
  title?: string;
  eyebrow?: string;
  summary?: string;
  steps: ProofPathStep[];
}) {
  return (
    <section className="featured-proof-slab" id="flagship" aria-labelledby={`featured-proof-${detectionId}`}>
      <header className="featured-proof-slab__head">
        <div>
          <p className="featured-proof-slab__id">{eyebrow} · {detectionId}</p>
          <h2 id={`featured-proof-${detectionId}`} className="featured-proof-slab__title">
            {title}
          </h2>
          <p className="featured-proof-slab__sub">{summary}</p>
        </div>
        <span className="ceiling-stamp ceiling-stamp--on-paper" aria-label={`Public ceiling ${ceiling}`}>
          Ceiling · {ceiling}
        </span>
      </header>

      <div className="featured-proof-slab__inner">
        <ProofPathTimeline detectionId={detectionId} title={title} steps={steps} showCeiling={false} />
      </div>
    </section>
  );
}
