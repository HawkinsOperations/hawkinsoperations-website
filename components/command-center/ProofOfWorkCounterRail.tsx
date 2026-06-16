import { proofOfWorkMetrics } from "@data/systemShowcase";

export default function ProofOfWorkCounterRail() {
  return (
    <div className="system-counter-rail" aria-label="Proof-of-work counters">
      {proofOfWorkMetrics.map((metric) => (
        <article key={metric.label} className={`system-counter system-counter--${metric.tone}`}>
          <span className="system-counter__value">{metric.value}</span>
          <span className="system-counter__label">{metric.label}</span>
          <p>{metric.detail}</p>
        </article>
      ))}
    </div>
  );
}

