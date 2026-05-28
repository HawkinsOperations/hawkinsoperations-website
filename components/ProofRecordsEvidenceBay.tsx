import { proofRecords, type ProofRecord, type ProofRecordState } from "@data/proofRecords";

/**
 * ProofRecordsEvidenceBay
 *
 * A lighter evidence bay built from the proof records. Each record renders as
 * a receipt with a state chip and a supports / does-not-prove split; details
 * expand for the remaining blocked promotions and promotion requirements.
 * The flagship record leads; supporting records follow at lower weight.
 *
 * All copy is rendered from proofRecords data (the single source of truth);
 * blocked promotions stay framed as not-claimed.
 */

const stateChip: Record<ProofRecordState, { label: string; tone: string }> = {
  PROOF_RECORD_PRESENT: { label: "PROOF RECORD PRESENT", tone: "ok" },
  PRIVATE_RUNTIME_BOUNDARY: { label: "PRIVATE RUNTIME BOUNDARY", tone: "block" },
  NO_PROOF_RECORD: { label: "NO PROOF RECORD", tone: "warn" },
  BOUNDARY_CONTRACT_ONLY: { label: "BOUNDARY CONTRACT ONLY", tone: "warn" },
};

function ReceiptLinks({ record }: { record: ProofRecord }) {
  return (
    <footer className="peb__links">
      {record.caseFileHref && (
        <a className="peb__link peb__link--primary" href={record.caseFileHref}>
          Open case file →
        </a>
      )}
      {record.proofRepoLink ? (
        <a className="peb__link" href={record.proofRepoLink} target="_blank" rel="noopener noreferrer">
          Proof record ↗
        </a>
      ) : (
        <span className="peb__link peb__link--dead" aria-disabled="true">
          No proof record
        </span>
      )}
      <a className="peb__link" href={record.sourceRepoLink} target="_blank" rel="noopener noreferrer">
        Source repo ↗
      </a>
    </footer>
  );
}

function Receipt({ record, flagship = false }: { record: ProofRecord; flagship?: boolean }) {
  const chip = stateChip[record.proofRecordState];
  const supports = (flagship ? record.passed : record.passed.slice(0, 2));
  return (
    <article
      className={`peb__receipt${flagship ? " peb__receipt--flagship" : ""}`}
      data-detection-id={record.detectionId}
      data-proof-ceiling={record.proofLevel}
    >
      <span className="peb__perf peb__perf--top" aria-hidden="true" />
      <header className="peb__receipt-head">
        <div className="peb__receipt-id-wrap">
          <span className="peb__receipt-id mono">{record.detectionId}</span>
          <p className="peb__receipt-title">{record.title}</p>
        </div>
        <div className="peb__receipt-meta">
          <span className="peb__ceiling mono">{record.proofLevel}</span>
          <span className={`peb__chip peb__chip--${chip.tone}`}>{chip.label}</span>
        </div>
      </header>

      <div className="peb__split">
        <div className="peb__split-col peb__split-col--ok">
          <p className="peb__split-label">Supports</p>
          <ul>
            {supports.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="peb__split-col peb__split-col--block">
          <p className="peb__split-label">Does not prove</p>
          <ul>
            {record.notClaimed.slice(0, flagship ? record.notClaimed.length : 2).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>

      <details className="peb__more">
        <summary className="peb__more-summary">Remaining gates &amp; promotion requirements</summary>
        <div className="peb__more-body">
          <div>
            <p className="peb__split-label">Remaining blocked</p>
            <ul>
              {record.remainingBlocked.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="peb__split-label">Promotion requirements</p>
            <ul>
              {record.promotionRequirements.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </details>

      <ReceiptLinks record={record} />
    </article>
  );
}

export default function ProofRecordsEvidenceBay() {
  const [flagship, ...rest] = proofRecords;
  return (
    <div className="peb">
      <Receipt record={flagship} flagship />
      <div className="peb__grid">
        {rest.map((record) => (
          <Receipt key={record.detectionId} record={record} />
        ))}
      </div>
      <p className="peb__foot muted">
        Each record holds its bounded ceiling and routes reviewers to source and
        validation. Website rendering is not proof.
      </p>
    </div>
  );
}
