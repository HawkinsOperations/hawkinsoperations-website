import { ceiling } from "@config/site";

export interface ProofCeilingDisplayProps {
  size?: "default" | "xl";
  visualLabel?: string;
}

export default function ProofCeilingDisplay({ size = "default", visualLabel }: ProofCeilingDisplayProps) {
  const defaultVisual = "Controlled · Test · Validated";
  const visual = visualLabel ?? defaultVisual;
  return (
    <div className={`ceiling-display ${size === "xl" ? "ceiling-display--xl" : ""}`}>
      <p className="ceiling-display__visual">{visual}</p>
      <p className="ceiling-display__token" title={ceiling}>
        {ceiling}
      </p>
    </div>
  );
}
