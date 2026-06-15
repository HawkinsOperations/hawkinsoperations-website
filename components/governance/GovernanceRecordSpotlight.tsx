import type { GovernanceSave } from "@data/governanceSaves";
import { governanceCategoryLabels } from "@data/governanceSaves";

export default function GovernanceRecordSpotlight({ record }: { record: GovernanceSave }) {
  return (
    <article className="governance-record-spotlight">
      <div className="governance-record-spotlight__head">
        <span>{record.id}</span>
        <strong>{record.outcome}</strong>
      </div>
      <h3>{record.title}</h3>
      <p>{governanceCategoryLabels[record.category]} · {record.surface}</p>
      <dl>
        <div>
          <dt>Risk prevented</dt>
          <dd>{record.drift}</dd>
        </div>
        <div>
          <dt>Control that fired</dt>
          <dd>{record.control}</dd>
        </div>
        <div>
          <dt>What changed</dt>
          <dd>{record.matters}</dd>
        </div>
      </dl>
    </article>
  );
}

