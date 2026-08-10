"use client";

import {
  scenarios,
  type ScenarioId,
} from "../../src/data/reviewerGuide";
import type {
  MachineSnapshot,
  ReviewerGuideAction,
} from "../../src/lib/reviewerGuideMachine";

type ScenarioRunnerProps = {
  snapshot: MachineSnapshot;
  dispatch: (action: ReviewerGuideAction) => void;
  compact?: boolean;
};

export default function ScenarioRunner({ snapshot, dispatch, compact = false }: ScenarioRunnerProps) {
  const scenario = scenarios[snapshot.scenarioId];
  const lastStep = snapshot.stepIndex === snapshot.totalSteps - 1;

  return (
    <section className={`rg-runner ${compact ? "rg-runner--compact" : ""}`} aria-label="Scenario runner" data-presentation-ignore-keys>
      <div className="rg-runner__controls">
        <label>
          <span>Scenario</span>
          <select
            value={snapshot.scenarioId}
            onChange={(event) => dispatch({ type: "SELECT_SCENARIO", scenarioId: event.target.value as ScenarioId })}
            aria-label="Select scenario"
          >
            {Object.values(scenarios).map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.label}</option>)}
          </select>
        </label>
        <div className="rg-runner__buttons">
          {snapshot.runState === "running" ? (
            <button type="button" onClick={() => dispatch({ type: "PAUSE" })} aria-label="Pause scenario">Pause</button>
          ) : (
            <button type="button" className="rg-runner__run" onClick={() => dispatch({ type: "RUN" })} aria-label={lastStep ? "Run scenario again" : "Run scenario"}>{lastStep ? "Run again" : "Run system"}</button>
          )}
          <button type="button" onClick={() => dispatch({ type: "STEP" })} disabled={lastStep} aria-label="Step scenario">Step</button>
          <button type="button" onClick={() => dispatch({ type: "RESET" })} disabled={snapshot.stepIndex === 0} aria-label="Reset scenario">Reset</button>
        </div>
      </div>

      <div className="rg-runner__state">
        <div>
          <span>State</span>
          <strong>{String(snapshot.stepIndex + 1).padStart(2, "0")} / {String(snapshot.totalSteps).padStart(2, "0")}</strong>
          <b>{snapshot.step.label}</b>
        </div>
        <div className="rg-runner__progress" role="progressbar" aria-valuemin={0} aria-valuemax={snapshot.totalSteps - 1} aria-valuenow={snapshot.stepIndex} aria-label="Scenario progress">
          <span style={{ width: `${snapshot.progress * 100}%` }} />
        </div>
        <p><span>Evidence ceiling</span><strong>{snapshot.step.ceiling}</strong></p>
        <p data-claim-decision={snapshot.step.claimDecision.toLowerCase()}><span>Claim decision</span><strong>{snapshot.step.claimDecision}</strong></p>
      </div>

      {snapshot.step.claimDecision === "BLOCKED" ? (
        <div className="rg-runner__blocked" role="status" aria-live="polite">
          <span>Decision: blocked</span>
          <dl>
            <div><dt>Rejected wording</dt><dd>{scenario.incomingClaim}</dd></div>
            <div><dt>Safer wording</dt><dd>{snapshot.step.saferWording}</dd></div>
            <div><dt>Required next evidence</dt><dd>{snapshot.step.missingEvidence}</dd></div>
          </dl>
        </div>
      ) : null}

      {!compact ? (
        <div className="rg-runner__feed">
          <div className="rg-runner__feed-head"><span>Scenario trace</span><small>Deterministic browser model · not runtime telemetry</small></div>
          <ol aria-live="polite">
            {snapshot.events.length === 0 ? <li data-event-state="pending"><span>000</span><strong>READY_FOR_USER_INPUT</strong></li> : snapshot.events.map((event, index) => (
              <li key={`${event}-${index}`} data-event-state={index === snapshot.events.length - 1 ? "current" : "complete"}>
                <span>{String(index + 1).padStart(3, "0")}</span><strong>{event}</strong>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </section>
  );
}
