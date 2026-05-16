import type { RepoRecord } from "@data/repos";

export default function RepoCard({ repo }: { repo: RepoRecord }) {
  return (
    <a className="card block p-5" href={repo.href} target="_blank" rel="noopener noreferrer">
      <p className="mono text-xs uppercase text-blue-100">{repo.truthSurface}</p>
      <h3 className="mt-4 text-xl font-semibold text-slate-50">{repo.name}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{repo.purpose}</p>
      <dl className="mt-5 space-y-3 text-sm">
        <div>
          <dt className="mono text-[0.68rem] uppercase text-slate-500">Owns</dt>
          <dd className="mt-1 text-slate-300">{repo.owns}</dd>
        </div>
        <div>
          <dt className="mono text-[0.68rem] uppercase text-slate-500">Does not prove</dt>
          <dd className="mt-1 text-slate-400">{repo.doesNotProve}</dd>
        </div>
      </dl>
    </a>
  );
}
