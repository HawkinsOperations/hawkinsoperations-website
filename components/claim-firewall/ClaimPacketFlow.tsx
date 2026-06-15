const stages = ["AI Draft", "Claim Extractor", "Evidence Ceiling", "Verifier", "Human Review", "Output Decision"];

export default function ClaimPacketFlow({ active }: { active: number }) {
  return (
    <ol className="claim-packet-flow" aria-label="Claim packet flow">
      {stages.map((stage, index) => (
        <li key={stage} className={active === index ? "is-active" : ""}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{stage}</strong>
        </li>
      ))}
    </ol>
  );
}

