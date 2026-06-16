import { proofAuthorityNodes } from "@data/proofAuthorityMap";
import EvidenceRouteMap from "./EvidenceRouteMap";

export default function ProofAuthorityBay() {
  return (
    <section className="proof-authority-bay" aria-labelledby="proof-authority-bay-title">
      <div className="proof-authority-bay__head">
        <p className="cockpit-eyebrow">Evidence Bay / Proof Terminal</p>
        <h2 id="proof-authority-bay-title">Proof records are where public claims hit a ceiling.</h2>
        <p>
          The website routes reviewers to proof; it does not become proof. This bay shows the receipt
          path and which authority owns each ceiling.
        </p>
      </div>
      <EvidenceRouteMap />
      <div className="proof-authority-bay__grid">
        {proofAuthorityNodes.map((node) => (
          <a key={node.id} href={node.route} className={`proof-authority-card proof-authority-card--${node.tone}`}>
            <span>{node.authority}</span>
            <strong>{node.label}</strong>
            <p>{node.supports}</p>
            <small>Ceiling: {node.ceiling}</small>
          </a>
        ))}
      </div>
    </section>
  );
}

