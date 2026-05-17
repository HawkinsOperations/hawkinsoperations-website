/**
 * CaseStudyCTA
 *
 * Single dominant call-to-action pointing reviewers to the merged
 * AI Governance Control Layer case study in the proof repo.
 *
 * Claim contract: the case study is explicitly framed as context, not
 * as pipeline proof. No new claim is asserted by the CTA itself.
 */

const CASE_STUDY_HREF =
  "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/main/docs/case-studies/AI-GOVERNANCE-CONTROL-LAYER.md";

export default function CaseStudyCTA() {
  return (
    <a
      className="case-study-cta"
      href={CASE_STUDY_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Read the AI Governance Control Layer case study (opens in a new tab)"
    >
      <div>
        <p className="case-study-cta__eyebrow">Case study · governance</p>
        <h3 className="case-study-cta__title">
          AI Governance Control Layer — how the firewall keeps AI labor from authoring authority.
        </h3>
        <p className="case-study-cta__sub">
          A deterministic claim firewall lets AI draft, summarize, and scaffold work without granting AI
          authority over the truth. Walks the boundary between measurable acceleration and the gates that
          decide what may be claimed publicly.
        </p>
        <span className="case-study-cta__caveat">Context only · case study is not pipeline proof</span>
      </div>
      <span className="case-study-cta__arrow" aria-hidden="true">↗</span>
    </a>
  );
}
