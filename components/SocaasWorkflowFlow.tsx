export interface SocaasFlowStage {
  index: string;
  title: string;
  role: string;
  detail: string;
  ceiling: string;
}

const stages: SocaasFlowStage[] = [
  {
    index: "01",
    title: "Detection engineering",
    role: "Source-controlled rules + ATT&CK context",
    detail:
      "Detection source, rule logic, status metadata, and ATT&CK-aligned context live in the detections repo. Reviewable in plain text, version-controlled, mappable.",
    ceiling: "SOURCE",
  },
  {
    index: "02",
    title: "Telemetry confidence",
    role: "Route contracts + visibility evidence",
    detail:
      "Telemetry routes and contracts are treated as visibility or private/internal evidence. Public-safe runtime/signal status requires a separate promotion gate.",
    ceiling: "CONTRACT",
  },
  {
    index: "03",
    title: "Validation",
    role: "Deterministic verifiers + controlled fixtures",
    detail:
      "Controlled-test validation packages and fixtures support controlled validation claims. Verifiers fail closed; no runtime promotion happens here.",
    ceiling: "CONTROLLED",
  },
  {
    index: "04",
    title: "Alert-to-case flow",
    role: "Case packets, support gates, blocked actions",
    detail:
      "Case-packet schemas and samples model analyst support, response gates, and blocked actions. Mutation, closure, and disposition authority stay outside the contract.",
    ceiling: "SUPPORT-ONLY",
  },
  {
    index: "05",
    title: "AI-assisted triage",
    role: "Sanitized summaries + missing context",
    detail:
      "AI may summarize sanitized facts and call out missing context. It does not decide disposition, close cases, approve actions, or promote proof.",
    ceiling: "AI SUPPORT-ONLY",
  },
  {
    index: "06",
    title: "Human review authority",
    role: "Visible reviewer + MERGE_APPROVED",
    detail:
      "Visible human review is the authority layer. AI is below human review; CI is below human review; momentum is below human review.",
    ceiling: "HUMAN",
  },
  {
    index: "07",
    title: "Proof-controlled reporting",
    role: "Reviewer packets at the current ceiling",
    detail:
      "Proof Pack 001 and proof records route reviewer claims under the current ceiling. Website rendering remains a route to proof, not proof itself.",
    ceiling: "PROOF CEILING",
  },
];

export default function SocaasWorkflowFlow() {
  return (
    <ol className="swf" aria-label="SOCaaS / AI Security Operations workflow">
      {stages.map((stage, idx) => (
        <li key={stage.index} className="swf__stage">
          <div className="swf__stage-head">
            <span className="swf__index">{stage.index}</span>
            <span className="swf__ceiling">{stage.ceiling}</span>
          </div>
          <h3 className="swf__title">{stage.title}</h3>
          <p className="swf__role">{stage.role}</p>
          <p className="swf__detail">{stage.detail}</p>
          {idx < stages.length - 1 && (
            <span className="swf__connector" aria-hidden="true">→</span>
          )}
        </li>
      ))}
    </ol>
  );
}
