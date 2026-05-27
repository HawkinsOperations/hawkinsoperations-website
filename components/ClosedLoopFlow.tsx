export interface ClosedLoopNode {
  step: string;
  label: string;
  detail: string;
}

const defaultNodes: ClosedLoopNode[] = [
  { step: "01", label: "Detection", detail: "Source rule + ATT&CK context in detections repo." },
  { step: "02", label: "Validation", detail: "Controlled fixtures + deterministic verifier pass." },
  { step: "03", label: "Case packet", detail: "SOAR-shaped case structure with support-only AI fields." },
  { step: "04", label: "Verifier", detail: "Schema, claim-boundary, and parity gates fail closed." },
  { step: "05", label: "Proof record", detail: "Proof record / card under the current ceiling." },
  { step: "06", label: "Reviewer surface", detail: "Website route + reviewer packet to the bounded truth." },
];

export default function ClosedLoopFlow({ nodes = defaultNodes }: { nodes?: ClosedLoopNode[] }) {
  return (
    <div className="clf" role="list" aria-label="Closed-loop detection → proof flow">
      {nodes.map((node, idx) => (
        <div key={node.step} role="listitem" className="clf__node">
          <div className="clf__node-card">
            <span className="clf__step">{node.step}</span>
            <h3 className="clf__label">{node.label}</h3>
            <p className="clf__detail">{node.detail}</p>
          </div>
          {idx < nodes.length - 1 && <span className="clf__arrow" aria-hidden="true">→</span>}
        </div>
      ))}
      <p className="clf__boundary" role="note">
        Public claim boundary stops at the reviewer surface. Runtime / signal / production / customer / fleet promotion requires separate gates.
      </p>
    </div>
  );
}
