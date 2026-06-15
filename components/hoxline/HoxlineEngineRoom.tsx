import { hoxlineDataSource, positiveCapabilities } from "@data/hoxlineVisualIntelligence";
import HoxlineAttackRouteMap from "./HoxlineAttackRouteMap";

export default function HoxlineEngineRoom() {
  return (
    <section className="hoxline-engine-room-v2" aria-labelledby="hoxline-engine-room-title">
      <div className="hoxline-engine-room-v2__hero">
        <div>
          <p className="cockpit-eyebrow">Hoxline Engine Room</p>
          <h2 id="hoxline-engine-room-title">Run the ProofOps loop against real detection work.</h2>
          <p>
            The current public example is {hoxlineDataSource.artifactId}: a controlled-validation
            route where Hoxline packages the loop, emits reviewer outputs, keeps runtime and signal
            gated, and hands claim wording to the appropriate authority surfaces.
          </p>
        </div>
        <div className="hoxline-engine-room-v2__status">
          <span>GAUNTLET_V0</span>
          <span>{hoxlineDataSource.proofCeiling}</span>
          <span>RUNTIME_BLOCKED</span>
          <span>SIGNAL_MISSING_EVIDENCE</span>
          <span>human_review_required true</span>
        </div>
      </div>
      <HoxlineAttackRouteMap />
      <div className="hoxline-engine-room-v2__capabilities">
        {positiveCapabilities.slice(0, 8).map((capability) => (
          <article key={capability.id}>
            <span>{capability.state}</span>
            <strong>{capability.label}</strong>
            <p>{capability.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

