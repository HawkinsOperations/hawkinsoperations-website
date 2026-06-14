export default function SafeClaimCard({ claim, detail }: { claim: string; detail: string }) {
  return (
    <article className="proofops-safe-claim">
      <p className="proofops-kicker">Allowed wording</p>
      <h3>Safe claim</h3>
      <blockquote>{claim}</blockquote>
      <p>{detail}</p>
    </article>
  );
}
