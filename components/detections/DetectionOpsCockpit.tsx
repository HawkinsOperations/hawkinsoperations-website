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
          <h2 id="detection-ops-title">ATT&CK context, validation firepower, proof ceilings.</h2>
          <p>
            This is the detection engineering machine: source packages, platform lanes, controlled
            validation, proof routing, Hoxline claim control, and public rendering separated.
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

