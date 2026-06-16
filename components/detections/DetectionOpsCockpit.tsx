import { attackOpsSummary } from "@data/attackDetectionOps";
import AttackCoverageCommandMap from "./AttackCoverageCommandMap";
import DetectionLifecycleRail from "./DetectionLifecycleRail";
import DetectionProofRoute from "./DetectionProofRoute";
import MitreKillChainBoard from "./MitreKillChainBoard";

export default function DetectionOpsCockpit() {
  return (
    <section className="detection-ops-cockpit" aria-labelledby="detection-ops-title">
      <div className="detection-ops-cockpit__hero">
        <div>
          <p className="cockpit-eyebrow">Detection Operations Cockpit</p>
          <h2 id="detection-ops-title">Detection Operations Cockpit.</h2>
          <p>
            ATT&CK / Kill Chain orientation, source-backed rows, controlled validation, proof
            ceilings, and Hoxline claim control in one routed machine.
          </p>
        </div>
        <div className="detection-ops-cockpit__stats">
          <span>
            <strong>{attackOpsSummary.sourceBackedRows}</strong>
            source-backed rows
          </span>
          <span>
            <strong>{attackOpsSummary.controlledValidationFires}</strong>
            validation fires
          </span>
          <span>
            <strong>{attackOpsSummary.validationCases}</strong>
            validation cases
          </span>
          <span>
            <strong>{attackOpsSummary.publicSafeCount}</strong>
            public-safe
          </span>
        </div>
      </div>
      <DetectionLifecycleRail />
      <div className="mt-5">
        <DetectionProofRoute />
      </div>
      <div className="mt-5">
        <AttackCoverageCommandMap />
      </div>
      <div className="mt-5">
        <MitreKillChainBoard />
      </div>
    </section>
  );
}
