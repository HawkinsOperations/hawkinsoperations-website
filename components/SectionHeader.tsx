export interface SectionHeaderProps {
  title: string;
  eyebrow?: string;
  description?: string;
}

export default function SectionHeader({ title, eyebrow, description }: SectionHeaderProps) {
  return (
    <div className="mb-9 max-w-3xl">
      {eyebrow && (
        <p className="mono mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold leading-tight text-slate-50 md:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-7 text-slate-400">{description}</p>}
    </div>
  );
}
