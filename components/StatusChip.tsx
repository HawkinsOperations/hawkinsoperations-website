export type ChipTone = "default" | "ice" | "warn" | "block" | "quiet";

export interface StatusChipProps {
  label: string;
  tone?: ChipTone;
  title?: string;
}

const toneClassMap: Record<ChipTone, string> = {
  default: "",
  ice: "chip-ice",
  warn: "chip-warn",
  block: "chip-block",
  quiet: "chip-quiet",
};

export default function StatusChip({ label, tone = "default", title }: StatusChipProps) {
  return (
    <span className={`chip ${toneClassMap[tone]}`} title={title ?? label}>
      {label}
    </span>
  );
}
