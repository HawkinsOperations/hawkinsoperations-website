"use client";

export type ClaimPipelineStep = {
  id: string;
  label: string;
  detail: string;
  status: "input" | "check" | "gate" | "decision";
};

export default function ClaimPipelineStepper({
  steps,
  activeId,
  onSelect,
}: {
  steps: ClaimPipelineStep[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <ol className="cf-stepper" aria-label="Claim Firewall pipeline stepper">
      {steps.map((step, index) => (
        <li key={step.id}>
          <button
            type="button"
            className={`cf-stepper__node cf-stepper__node--${step.status} ${activeId === step.id ? "is-active" : ""}`}
            onClick={() => onSelect(step.id)}
            aria-pressed={activeId === step.id}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step.label}</strong>
          </button>
        </li>
      ))}
    </ol>
  );
}
