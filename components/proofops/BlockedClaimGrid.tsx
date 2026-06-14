export default function BlockedClaimGrid({ claims }: { claims: string[] }) {
  return (
    <div className="proofops-blocked-grid" aria-label="Blocked claim families">
      {claims.map((claim) => (
        <div key={claim} className="proofops-blocked-grid__item">
          <span>Blocked</span>
          <strong>{claim}</strong>
        </div>
      ))}
    </div>
  );
}
