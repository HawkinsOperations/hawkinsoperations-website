type Boundary = {
  label: string;
  value: string;
  tone?: "cyan" | "amber" | "green" | "blocked" | "neutral";
};

export interface ClaimBoundaryPanelProps {
  title?: string;
  description?: string;
  boundaries: Boundary[];
}

export default function ClaimBoundaryPanel({
  title = "Claim boundary",
  description = "The website renders reviewer context only. Authority remains with the owning evidence surfaces.",
  boundaries,
}: ClaimBoundaryPanelProps) {
  return (
    <section className="proofops-boundary" aria-labelledby="claim-boundary-title">
      <div>
        <p className="proofops-kicker">Authority boundary</p>
        <h2 id="claim-boundary-title">{title}</h2>
        <p>{description}</p>
      </div>
      <dl className="proofops-boundary__grid">
        {boundaries.map((item) => (
          <div key={item.label} className={`proofops-boundary__item proofops-boundary__item--${item.tone ?? "neutral"}`}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
