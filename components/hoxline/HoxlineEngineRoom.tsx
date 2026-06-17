import { generatedStatusFreshnessLabel, publicStatus } from "@data/generated/public-status.generated";
import { hoxlineDataSource, positiveCapabilities } from "@data/hoxlineVisualIntelligence";
import ReviewerRunPath from "@components/ReviewerRunPath";
import HoxlineAttackRouteMap from "./HoxlineAttackRouteMap";

export default function HoxlineEngineRoom() {
  return (
    <section className="hoxline-engine-room-v2" aria-labelledby="hoxline-engine-room-title">
      <div className="hoxline-engine-room-v2__hero">
        <div>
          <p className="cockpit-eyebrow">Hoxline Engine Room</p>
          <h2 id="hoxline-engine-room-title">Run the ProofOps loop against real detection work.</h2>
          <p>
            The current public example is {hoxlineDataSource.artifactId}: Hoxline packages the
            Gauntlet loop, emits reviewer outputs, preserves controlled-validation scope, and hands
            claim wording to source-owned authority surfaces.
          </p>
        </div>
        <div className="hoxline-engine-room-v2__status">
          <span>{publicStatus.hoxline.runner.label}</span>
          <span>{publicStatus.hoxline.proof_ceiling.label}</span>
          <span>{publicStatus.hoxline.runtime.label}</span>
          <span>{publicStatus.hoxline.signal.label}</span>
          <span>{publicStatus.hoxline.human_review.label}</span>
        </div>
      </div>
      <div className="hoxline-engine-room-v2__snapshot" role="note">
        <strong>{generatedStatusFreshnessLabel()}</strong>
        <span>{publicStatus.source_ownership_message}</span>
      </div>
      <ReviewerRunPath variant="hoxline" />
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

