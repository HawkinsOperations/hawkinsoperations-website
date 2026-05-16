import StatusChip from "./StatusChip";
import type { Artifact, ArtifactStatus } from "@data/artifacts";

export interface ArtifactCardProps {
  artifact: Artifact;
  variant?: "default" | "flagship" | "legacy";
}

const statusTone = (status: ArtifactStatus) => {
  switch (status) {
    case "supported":
      return "ice" as const;
    case "rendering-only":
      return "default" as const;
    case "reference":
      return "quiet" as const;
    case "blocked-pending-promotion":
      return "block" as const;
  }
};

const statusLabel = (status: ArtifactStatus) => {
  switch (status) {
    case "supported":
      return "SUPPORTED";
    case "rendering-only":
      return "RENDERING ONLY";
    case "reference":
      return "REFERENCE";
    case "blocked-pending-promotion":
      return "BLOCKED · PENDING PROMOTION";
  }
};

const categoryLabel: Record<string, string> = {
  "proof-record": "PROOF RECORD",
  "case-study": "CASE STUDY",
  validation: "VALIDATION",
  "ci-verifier": "CI / VERIFIER",
  architecture: "ARCHITECTURE",
  governance: "GOVERNANCE",
  "public-packet": "PUBLIC PACKET",
  "field-note": "FIELD NOTE",
  legacy: "LEGACY",
};

export default function ArtifactCard({ artifact, variant = "default" }: ArtifactCardProps) {
  const variantClass =
    variant === "flagship"
      ? "artifact-card artifact-card--flagship"
      : variant === "legacy"
        ? "artifact-card artifact-card--legacy"
        : "artifact-card";

  const isExternal = artifact.primary.external === true;

  return (
    <a
      className={variantClass}
      data-artifact={artifact.slug}
      href={artifact.primary.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={`${artifact.primary.label}: ${artifact.title}`}
    >
      <div className="artifact-card__chips">
        <StatusChip label={categoryLabel[artifact.category] ?? artifact.category.toUpperCase()} />
        <StatusChip label={artifact.truthSurface.toUpperCase()} tone="quiet" />
        <StatusChip label={statusLabel(artifact.status)} tone={statusTone(artifact.status)} />
        {artifact.proofCeiling && <StatusChip label={artifact.proofCeiling} tone="warn" />}
      </div>

      <h3 className="artifact-card__title">{artifact.title}</h3>
      <p className="artifact-card__desc">{artifact.description}</p>

      <div className="artifact-card__detail" aria-label="What this proves and does not prove">
        <div className="artifact-card__row">
          <strong>Proves</strong>
          <span>{artifact.proves}</span>
        </div>
        <div className="artifact-card__row">
          <strong>Does not prove</strong>
          <span>{artifact.doesNotProve}</span>
        </div>
      </div>

      <div className="artifact-card__links">
        <span className="surface-link-label surface-link-label--primary" aria-hidden="true">
          {artifact.primary.label} →
        </span>
        {artifact.secondary && (
          <span className="surface-link-label surface-link-label--quiet" aria-hidden="true">
            {artifact.secondary.label}
          </span>
        )}
      </div>
    </a>
  );
}
