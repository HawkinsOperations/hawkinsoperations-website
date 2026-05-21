/**
 * ReceiptLedgerTimeline
 *
 * A hand-maintained reviewer snapshot of bounded packets and receipts,
 * rendered as a small append-only timeline. This is not live runtime
 * telemetry; the caveat states so. Renders src/data/receiptLedger.ts.
 */

import { ledgerEntries, ledgerCaveat } from "@data/receiptLedger";

export default function ReceiptLedgerTimeline() {
  return (
    <div className="rlt" aria-label="Receipt and ledger timeline">
      <p className="rlt__caveat">{ledgerCaveat}</p>
      <div className="rlt__lanes">
        {ledgerEntries.map((entry) => (
          <div key={entry.marker} className="rlt__lane">
            <span className="rlt__marker">{entry.marker}</span>
            <div>
              <span className="rlt__kind">{entry.kind}</span>
              <h3 className="rlt__title">{entry.title}</h3>
              <p className="rlt__line">{entry.line}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
