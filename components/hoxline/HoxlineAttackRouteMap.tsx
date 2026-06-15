import { detectionLifecycleSteps } from "@data/attackDetectionOps";
import { loopStageStatuses } from "@data/hoxlineVisualIntelligence";

const route = [
  "Detection artifact",
  "ATT&CK / Kill Chain context",
  "Evidence graph",
  "Telemetry contract",
  "Controlled validation",
  "Gauntlet output",
  "Claim authority",
  "Safe wording / blocked stronger claim",
];

export default function HoxlineAttackRouteMap() {
  const gated = loopStageStatuses.filter((stage) => stage.status === "BLOCKED" || stage.status === "MISSING_EVIDENCE");

  return (
    <section className="hoxline-route-map" aria-labelledby="hoxline-route-title">
      <div className="hoxline-route-map__header">
        <p className="cockpit-eyebrow">Detection-to-ProofOps route</p>
        <h2 id="hoxline-route-title">What enters the loop: source behavior, attack context, validation state.</h2>
        <p>
          Hoxline is strongest when the incoming security work already carries source, ATT&CK
          orientation, telemetry assumptions, and validation boundaries into Claim Authority.
        </p>
      </div>
      <div className="hoxline-route-map__rail">
        {route.map((step, index) => (
          <div key={step} className="hoxline-route-map__node">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
      <div className="hoxline-route-map__split">
        <article>
          <span>Incoming detection context</span>
          {detectionLifecycleSteps.slice(0, 4).map((step) => (
            <p key={step.label}>
              <strong>{step.label}:</strong> {step.status}
            </p>
          ))}
        </article>
        <article>
          <span>Still gated inside Hoxline</span>
          {gated.map((stage) => (
            <p key={stage.id}>
              <strong>{stage.stage}:</strong> {stage.status}
            </p>
          ))}
        </article>
      </div>
    </section>
  );
}

