import type { TruthSurface } from "@config/truth-surfaces";

export default function TruthSurfaceCard({ surface }: { surface: TruthSurface }) {
  return (
    <article className="card p-5" data-truth-surface={surface.slug}>
      <p className="mono text-xs uppercase text-blue-100">{surface.location}</p>
      <h3 className="mt-4 text-xl font-semibold text-slate-50">{surface.name}</h3>
      <dl className="mt-5 space-y-4 text-sm leading-6">
        <div>
          <dt className="mono text-[0.68rem] uppercase text-slate-500">What it proves</dt>
          <dd className="mt-1 text-slate-300">{surface.proves}</dd>
        </div>
        <div>
          <dt className="mono text-[0.68rem] uppercase text-slate-500">What it does not prove</dt>
          <dd className="mt-1 text-slate-400">{surface.doesNotProve}</dd>
        </div>
        <div>
          <dt className="mono text-[0.68rem] uppercase text-slate-500">Promotes by</dt>
          <dd className="mt-1 text-slate-400">{surface.promotesBy}</dd>
        </div>
        <div>
          <dt className="mono text-[0.68rem] uppercase text-slate-500">Blocked by</dt>
          <dd className="mt-1 text-slate-400">{surface.blockedBy}</dd>
        </div>
      </dl>
    </article>
  );
}
