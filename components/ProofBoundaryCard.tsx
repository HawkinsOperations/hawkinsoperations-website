import StatusChip, { type ChipTone } from "./StatusChip";

export interface ProofBoundaryCardProps {
  label: string;
  value: string;
  detail?: string;
  tone?: "default" | "ice" | "warn" | "block";
  chip?: { label: string; tone?: ChipTone };
}

const ringClassMap: Record<NonNullable<ProofBoundaryCardProps["tone"]>, string> = {
  default: "border-[var(--moon-border)]",
  ice: "border-[rgba(143,216,255,0.32)]",
  warn: "border-[rgba(250,204,21,0.32)]",
  block: "border-[rgba(251,113,133,0.32)]",
};

export default function ProofBoundaryCard({
  label,
  value,
  detail,
  tone = "default",
  chip,
}: ProofBoundaryCardProps) {
  return (
    <article className={`moon-panel relative p-6 ${ringClassMap[tone]}`}>
      <p className="mono text-[0.65rem] tracking-[0.18em] uppercase text-[var(--silver)]">{label}</p>
      <p className="mt-3 text-lg font-semibold text-[var(--silver-bright)] leading-snug">{value}</p>
      {detail && <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{detail}</p>}
      {chip && (
        <div className="mt-4">
          <StatusChip label={chip.label} tone={chip.tone} />
        </div>
      )}
    </article>
  );
}
