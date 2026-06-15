const stages = [
  ["Alert / detection context", "source and ATT&CK orientation enter as context"],
  ["AI-assisted summary", "AI summarizes and organizes; it does not approve"],
  ["ATT&CK orientation", "mapping guides review without proving live coverage"],
  ["Deterministic verifier", "controlled checks and contracts own pass/fail"],
  ["Claim Firewall", "unsupported public wording is blocked or downgraded"],
  ["Human review", "authority stays with evidence and review"],
  ["Bounded output", "public wording stays under the proof ceiling"],
];

export default function AiGovernedTriageBoard() {
  return (
    <section className="ai-triage-board" aria-labelledby="ai-triage-title">
      <div className="ai-triage-board__head">
        <p className="cockpit-eyebrow">Governed AI triage</p>
        <h2 id="ai-triage-title">AI moves faster inside a cage of evidence, verifiers, and review.</h2>
      </div>
      <div className="ai-triage-board__flow">
        {stages.map(([label, detail], index) => (
          <article key={label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{label}</strong>
            <p>{detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

