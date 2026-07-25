import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "From Logs to AI Triage | HawkinsOperations",
  description:
    "A beginner-friendly visual field guide to logs, candidate signals, controlled validation, AI-assisted triage, evidence review, and human decision authority.",
  alternates: {
    canonical: "/podcast/",
  },
};

const teachingCards = [
  {
    src: "/podcast/02-logs-to-signal-16x9.png",
    alt: "A log is an observation, not a conclusion",
    eyebrow: "Start with telemetry",
    title: "An observation needs context before it becomes a candidate signal.",
    body: "Time, source, actor, action, object, result, and surrounding context make an event useful. A match is still a review prompt—not an incident conclusion.",
  },
  {
    src: "/podcast/03-positive-negative-validation-16x9.png",
    alt: "Positive and negative controlled validation fixtures",
    eyebrow: "Test in two directions",
    title: "Controlled validation checks both detection and restraint.",
    body: "A positive fixture asks whether intended behavior matches. A negative fixture asks whether a known non-match stays quiet. The result is real evidence inside a bounded scope.",
  },
  {
    src: "/podcast/04-ai-support-boundary-16x9.png",
    alt: "AI support and human authority boundary",
    eyebrow: "Keep authority explicit",
    title: "AI can compress labor without becoming decision authority.",
    body: "Summaries, enrichment, organization, drafts, and reviewer notes can move faster. Evidence, disposition, approval, case closure, claim promotion, and merge authority remain outside the AI role.",
  },
];

export default function PodcastPage() {
  return (
    <div className="podcast-page">
      <section className="podcast-hero">
        <div className="container">
          <div className="podcast-hero__grid">
            <div className="podcast-hero__copy">
              <p className="cockpit-eyebrow">Podcast field guide</p>
              <h1>From Logs to AI Triage</h1>
              <p className="podcast-hero__dek">A practical SOC workflow for beginners.</p>
              <p className="podcast-hero__body">
                Follow one clean chain from a recorded observation to a human decision. Each step
                keeps its own job: context gives logs meaning, detection logic creates a candidate
                signal, controlled fixtures test behavior, AI assists triage, evidence stays
                visible, and a human owns disposition.
              </p>
              <div className="podcast-hero__actions">
                <a className="cta" href="#workflow">Follow the workflow</a>
                <a className="cta cta-quiet" href="/claim-firewall/">Try Claim Firewall</a>
              </div>
            </div>
            <aside className="podcast-hero__boundary" aria-label="Episode truth boundary">
              <p className="podcast-boundary__label">Truth boundary</p>
              <ul>
                <li>Logs are observations.</li>
                <li>Detection matches are candidate signals.</li>
                <li>Controlled fixtures are bounded evidence.</li>
                <li>AI assists; human authority remains explicit.</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section id="workflow" className="podcast-section">
        <div className="container">
          <div className="podcast-section__head">
            <p className="cockpit-eyebrow">Beginner SOC teaching flow</p>
            <h2>From logs to a human decision.</h2>
            <p>
              The workflow begins before AI enters. Validation remains separate from triage, and
              evidence review remains separate from the final human decision.
            </p>
          </div>
          <figure className="podcast-visual podcast-visual--hero">
            <img
              src="/podcast/01-soc-workflow-16x9.png"
              alt="Logs through human decision SOC teaching workflow"
              width="1920"
              height="1080"
            />
          </figure>
        </div>
      </section>

      <section className="podcast-section podcast-section--compact">
        <div className="container">
          <div className="podcast-card-grid">
            {teachingCards.map((card) => (
              <article className="podcast-card" key={card.src}>
                <div className="podcast-card__visual">
                  <img src={card.src} alt={card.alt} width="1920" height="1080" />
                </div>
                <div className="podcast-card__copy">
                  <p className="cockpit-eyebrow">{card.eyebrow}</p>
                  <h2>{card.title}</h2>
                  <p>{card.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="podcast-section">
        <div className="container">
          <div className="podcast-section__head">
            <p className="cockpit-eyebrow">Separate starting points</p>
            <h2>The SOC teaching flow and the product/control flow are not the same.</h2>
            <p>
              The SOC flow begins with telemetry. The HawkinsOperations product/control flow begins
              later, when AI-assisted work enters a governed review path.
            </p>
          </div>
          <figure className="podcast-visual">
            <img
              src="/podcast/05-two-flows-distinct-16x9.png"
              alt="Two separate flows for SOC teaching and HawkinsOperations product control"
              width="1920"
              height="1080"
            />
          </figure>
        </div>
      </section>

      <section className="podcast-section podcast-section--closing">
        <div className="container">
          <div className="podcast-closing">
            <div>
              <p className="cockpit-eyebrow">A small controlled starting point</p>
              <h2>Build for review, not for theater.</h2>
              <p>
                Start with one trustworthy source, one hypothesis, two controlled fixtures, one
                deterministic result, and one human decision record. That is enough to learn the
                workflow without pretending the system is production evidence.
              </p>
              <div className="podcast-hero__actions">
                <a className="cta" href="/hoxline/">Explore the governed review path</a>
                <a className="cta cta-quiet" href="/ai-security/">See the AI support boundary</a>
              </div>
            </div>
            <figure className="podcast-visual">
              <img
                src="/podcast/06-human-authority-close-16x9.png"
                alt="Six-step controlled beginner build model"
                width="1920"
                height="1080"
              />
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
}
