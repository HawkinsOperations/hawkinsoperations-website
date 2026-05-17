export type StatusCardTone = "default" | "safe" | "warn" | "block";

export interface StatusCardProps {
  label: string;
  value: string;
  detail?: string;
  tone?: StatusCardTone;
  dataTarget?: string;
}

const toneClassMap: Record<StatusCardTone, string> = {
  default: "border-slate-700/70",
  safe: "border-blue-100/30",
  warn: "border-yellow-300/35",
  block: "border-rose-300/35",
};

export default function StatusCard({
  label,
  value,
  detail,
  tone = "default",
  dataTarget,
}: StatusCardProps) {
  return (
    <article className={`card p-5 ${toneClassMap[tone]}`} data-ci-target={dataTarget}>
      <p className="mono text-xs uppercase text-slate-500">{label}</p>
      <p className="mt-3 text-lg font-semibold text-slate-100">{value}</p>
      {detail && <p className="mt-3 text-sm leading-6 text-slate-400">{detail}</p>}
    </article>
  );
}
