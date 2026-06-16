export default function ClaimDecisionStamp({ decision }: { decision: string }) {
  return <strong className={`claim-decision-stamp claim-decision-stamp--${decision.toLowerCase().replaceAll("_", "-")}`}>{decision}</strong>;
}

