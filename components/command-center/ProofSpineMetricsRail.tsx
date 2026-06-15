import { blockedClaims } from "@data/claims";
import { artifacts, artifactCategories } from "@data/artifacts";
import { proofRecords, lifetimeCaseLedgerV1 } from "@data/proofRecords";

const proofSpineMetrics = [
  {
    value: "6",
    label: "governed cases",
    detail: "Lifetime Case Ledger v1 public summary count.",
    tone: "cyan",
  },
  {
    value: "49",
    label: "validation fires",
    detail: "Controlled validation evidence across current public proof spine.",
    tone: "green",
  },
  {
    value: "106",
    label: "validation cases",
    detail: "Bounded cases represented by public validation summaries.",
    tone: "blue",
  },
  {
    value: String(proofRecords.length),
    label: "proof records",
    detail: "Public proof-record data rendered as reviewer navigation.",
    tone: "amber",
  },
  {
    value: String(blockedClaims.length),
    label: "blocked claims",
    detail: "Claim families held below current proof ceilings.",
    tone: "red",
  },
  {
    value: String(lifetimeCaseLedgerV1.counts.public_safe_count),
    label: "public-safe",
    detail: "No public-safe promotion is created by the website.",
    tone: "neutral",
  },
];

export default function ProofSpineMetricsRail() {
  return (
    <section className="cc-metrics" aria-label="Proof spine metrics rail">
      <div className="cc-metrics__head">
        <p className="cockpit-eyebrow">Proof spine telemetry</p>
        <h2>Six governed cases. Eight proof records. Zero public-safe promotion.</h2>
      </div>
      <div className="cc-metrics__grid">
        {proofSpineMetrics.map((metric) => (
          <article key={metric.label} className={`cc-metric cc-tone--${metric.tone}`}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            <small>{metric.detail}</small>
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
