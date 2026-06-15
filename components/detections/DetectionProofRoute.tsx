import { proofOfWorkMetrics, systemRouteSteps } from "@data/systemShowcase";

export default function DetectionProofRoute() {
  return (
    <section className="detection-proof-route" aria-label="Detection to ProofOps route">
      <div className="detection-proof-route__copy">
        <p className="cockpit-eyebrow">Detection artifact to public wording</p>
        <h2>Source work does not ship as a claim until the route survives the gates.</h2>
        <p>
          The route starts in detection source and only becomes public wording after validation,
          proof ceiling, Hoxline claim control, and website rendering boundaries are respected.
        </p>
      </div>
      <div className="detection-proof-route__flow">
        {systemRouteSteps.map((step) => (
          <div key={step.id} className={`detection-proof-route__node detection-proof-route__node--${step.tone}`}>
            <strong>{step.label}</strong>
            <span>{step.status}</span>
          </div>
        ))}
      </div>
      <div className="detection-proof-route__metrics">
        {proofOfWorkMetrics.slice(1).map((metric) => (
          <div key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

