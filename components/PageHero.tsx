import ProofBadge, { type ProofBadgeTone } from "./ProofBadge";

export interface PageHeroProps {
  title: string;
  subtitle: string;
  description?: string;
  badges?: { label: string; tone?: ProofBadgeTone }[];
}

export default function PageHero({ title, subtitle, description, badges = [] }: PageHeroProps) {
  return (
    <section className="container grid gap-10 py-20 md:grid-cols-[1.15fr_0.85fr] md:py-24">
      <div>
        <h1 className="max-w-4xl text-4xl font-semibold leading-[0.98] text-slate-50 md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-200">{subtitle}</p>
        {description && <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400">{description}</p>}
        {badges.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {badges.map((badge, idx) => (
              <ProofBadge key={idx} label={badge.label} tone={badge.tone} />
            ))}
          </div>
        )}
      </div>
      <div className="surface relative overflow-hidden p-5" data-truth-surface="public-rendering">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-100/55 to-transparent"></div>
        <p className="mono text-xs uppercase text-blue-100">Public inspection layer</p>
        <div className="mt-8 grid gap-3">
          {["source truth", "runtime truth", "signal truth", "evidence truth", "public proof"].map(
            (item) => (
              <div
                key={item}
                className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-blue-100/10 px-1 py-3 text-sm"
              >
                <span className="min-w-0 capitalize text-slate-200">{item}</span>
                <span className="mono text-[0.66rem] uppercase text-slate-500">separate</span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
