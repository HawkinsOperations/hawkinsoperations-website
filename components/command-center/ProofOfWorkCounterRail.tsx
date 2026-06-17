import { proofOfWorkMetrics } from "@data/systemShowcase";
import { generatedStatusFreshnessLabel, isGeneratedStatusStale, publicStatus } from "@data/generated/public-status.generated";
import ReviewerRunPath from "@components/ReviewerRunPath";

export default function ProofOfWorkCounterRail() {
  const stale = isGeneratedStatusStale();

  return (
    <section className="public-status-snapshot" aria-label="Generated public-status snapshot">
      <div className={`public-status-snapshot__banner ${stale ? "is-stale" : ""}`}>
        <strong>{publicStatus.snapshot_label}</strong>
        <span>{generatedStatusFreshnessLabel()}</span>
        <span>{publicStatus.source_ownership_message}</span>
        <a href="/data/public-status.json">public-status.json</a>
      </div>
      <div className="system-counter-rail" aria-label="Proof-of-work counters">
        {proofOfWorkMetrics.map((metric) => (
          <article key={metric.label} className={`system-counter system-counter--${metric.tone}`}>
            <span className="system-counter__value">{metric.value}</span>
            <span className="system-counter__label">{metric.label}</span>
            <p>{metric.detail}</p>
          </article>
        ))}
      </div>
      <ReviewerRunPath variant="home" />
    </section>
  );
}

