import { detectionLifecycleSteps } from "@data/attackDetectionOps";

export default function DetectionLifecycleRail() {
  return (
    <ol className="detection-lifecycle-rail" aria-label="Detection source to claim lifecycle">
      {detectionLifecycleSteps.map((step, index) => (
        <li key={step.label}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{step.label}</strong>
          <p>{step.status}</p>
          <small>{step.surface}</small>
        </li>
      ))}
    </ol>
  );
}

