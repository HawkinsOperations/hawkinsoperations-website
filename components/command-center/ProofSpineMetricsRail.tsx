import { artifacts, artifactCategories } from "@data/artifacts";
import { metricDisplay, publicStatus, type PublicStatusMetricKey } from "@data/generated/public-status.generated";

const proofSpineMetricKeys: PublicStatusMetricKey[] = [
  "governed_cases",
  "validation_fires",
  "validation_cases",
  "proof_records",
  "blocked_claims",
  "public_safe_count",
];

const proofSpineMetrics = proofSpineMetricKeys.map(metricDisplay);

const governedCases = publicStatus.metrics.governed_cases.display_value;
const proofRecords = publicStatus.metrics.proof_records.display_value;
const publicSafe = publicStatus.metrics.public_safe_count.display_value;

const proofSpineHeadline = `${governedCases} governed cases. ${proofRecords} proof records. ${publicSafe} public-safe promotion.`;

export default function ProofSpineMetricsRail() {
  return (
    <section className="cc-metrics" aria-label="Proof spine metrics rail">
      <div className="cc-metrics__head">
        <p className="cockpit-eyebrow">Proof spine telemetry</p>
        <h2>{proofSpineHeadline}</h2>
      </div>
      <div className="cc-metrics__grid">
        {proofSpineMetrics.map((metric) => (
          <article key={metric.label} className={`cc-metric cc-tone--${metric.tone}`}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            <small>{metric.detail}</small>
            <small>
              {metric.freshness} - {metric.source}
            </small>
          </article>
        ))}
      </div>
      <div className="cc-metrics__footer">
        <span>{artifacts.length} reviewer artifacts</span>
        <span>{artifactCategories.length} artifact families</span>
        <span>Website rendering: navigation only</span>
      </div>
    </section>
  );
}
