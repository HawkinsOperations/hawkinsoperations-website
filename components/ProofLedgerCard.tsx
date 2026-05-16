import ProofBadge from "./ProofBadge";
import type { ProofRecord } from "@data/proofRecords";

export default function ProofLedgerCard({ record }: { record: ProofRecord }) {
  return (
    <article
      className="surface rounded-lg p-6"
      data-detection-id={record.detectionId}
      data-proof-ceiling={record.proofLevel}
      data-claim-state="rendering-only"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mono text-xs uppercase text-slate-500">Detection ID</p>
          <h3 className="mt-2 text-3xl font-semibold text-slate-50">{record.detectionId}</h3>
          <p className="mt-2 text-slate-400">{record.title}</p>
        </div>
        <ProofBadge label={record.proofLevel} tone="warn" />
      </div>
      <dl className="mt-7 grid gap-3 md:grid-cols-2">
        <div className="border border-slate-700/60 p-4">
          <dt className="mono text-xs uppercase text-slate-500">Validation state</dt>
          <dd className="mt-2 text-sm text-slate-200" data-ci-target="validation-status">
            {record.validationState}
          </dd>
        </div>
        <div className="border border-slate-700/60 p-4">
          <dt className="mono text-xs uppercase text-slate-500">Runtime state</dt>
          <dd className="mt-2 text-sm text-slate-200">{record.runtimeState}</dd>
        </div>
        <div className="border border-slate-700/60 p-4">
          <dt className="mono text-xs uppercase text-slate-500">Signal state</dt>
          <dd className="mt-2 text-sm text-slate-200">{record.signalState}</dd>
        </div>
        <div className="border border-slate-700/60 p-4">
          <dt className="mono text-xs uppercase text-slate-500">Public-safe state</dt>
          <dd className="mt-2 text-sm text-slate-200">{record.publicSafeState}</dd>
        </div>
      </dl>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          className="mono border border-blue-100/20 px-3 py-2 text-xs uppercase text-slate-200 hover:border-blue-100/45"
          href={record.sourceRepoLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Source repo
        </a>
        <a
          className="mono border border-blue-100/20 px-3 py-2 text-xs uppercase text-slate-200 hover:border-blue-100/45"
          href={record.proofRepoLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Proof repo
        </a>
      </div>
    </article>
  );
}
