import { proofLoopSteps } from "@config/proof-loop";
import StatusChip from "./StatusChip";

const statusChip = (status: "active" | "support" | "boundary") => {
  if (status === "support") return { label: "AI · LABOR ONLY", tone: "default" as const };
  if (status === "boundary") return { label: "PROOF BOUNDARY", tone: "warn" as const };
  return { label: "DETERMINISTIC", tone: "ice" as const };
};

export default function ClosedLoopPreview() {
  return (
    <div className="moon-panel p-7 md:p-9" data-closed-loop>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Closed loop preview</p>
          <h2 className="headline mt-2 text-2xl md:text-3xl">
            Detection → Validation → Verifier → Proof Record
          </h2>
          <p className="muted mt-3 max-w-3xl text-sm leading-6">
            A controlled engineering loop. AI is allowed inside steps as labor; the deterministic
            verifier and CI hold the gate. The proof record carries the bounded ceiling.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <StatusChip label="LOOP · CLOSED" tone="ice" />
          <StatusChip label="GATE · DETERMINISTIC" />
        </div>
      </div>

      <ol className="loop-grid mt-9">
        {proofLoopSteps.map((step) => {
          const chip = statusChip(step.status);
          return (
            <li key={step.num} className="loop-step" data-step={step.num}>
              <div className="flex items-center justify-between gap-2">
                <span className="loop-step__num">{`STEP ${step.num}`}</span>
                <StatusChip label={chip.label} tone={chip.tone} />
              </div>
              <h3 className="loop-step__title">{step.title}</h3>
              <p className="loop-step__body">{step.body}</p>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--moon-border)] pt-5 text-xs text-[var(--muted)]">
        <p>
          The loop closes back into the proof record. Wording cannot ship until the blocked-claim
          scanner passes.
        </p>
        <a className="cta cta-quiet" href="/proof/">
          Inspect proof ledger →
        </a>
      </div>
    </div>
  );
}
