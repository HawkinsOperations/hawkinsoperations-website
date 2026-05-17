import ProofBadge from "./ProofBadge";
import type { ProofRecord } from "@data/proofRecords";

export default function CaseFileHeader({ record }: { record: ProofRecord }) {
  return (
    <header
      className="container py-16"
      data-detection-id={record.detectionId}
      data-proof-ceiling={record.proofLevel}
    >
      <p className="mono text-xs uppercase text-blue-100">Case file</p>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="text-4xl font-semibold leading-none text-slate-50 [overflow-wrap:anywhere] md:text-7xl">
            {record.detectionId}
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-300">{record.title}</p>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <ProofBadge label="RENDERING_ONLY" />
          <ProofBadge label={record.proofLevel} tone="warn" />
          <ProofBadge label="NOT_PUBLIC_SAFE" tone="block" />
        </div>
      </div>
    </header>
  );
}
