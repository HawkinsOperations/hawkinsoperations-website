export type ProofBadgeTone = "default" | "safe" | "warn" | "block";

export interface ProofBadgeProps {
  label: string;
  tone?: ProofBadgeTone;
}

const toneClassMap: Record<ProofBadgeTone, string> = {
  default: "border-blue-200/25 bg-blue-950/20 text-blue-100",
  safe: "border-sky-200/25 bg-sky-950/25 text-sky-100",
  warn: "border-yellow-300/35 bg-yellow-950/35 text-yellow-100",
  block: "border-rose-300/35 bg-rose-950/35 text-rose-100",
};

export default function ProofBadge({ label, tone = "default" }: ProofBadgeProps) {
  return (
    <span
      className={`mono inline-flex max-w-full items-center rounded-full border px-3 py-1 text-center text-[0.68rem] font-semibold uppercase leading-4 tracking-[0.14em] [overflow-wrap:anywhere] ${toneClassMap[tone]}`}
    >
      {label}
    </span>
  );
}
