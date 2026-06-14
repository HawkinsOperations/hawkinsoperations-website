export interface EvidenceCeilingCardProps {
  label: string;
  ceiling: string;
  detail: string;
  tone?: "cyan" | "amber" | "green" | "blocked" | "neutral";
}

export default function EvidenceCeilingCard({
  label,
  ceiling,
  detail,
  tone = "amber",
}: EvidenceCeilingCardProps) {
  return (
    <article className={`proofops-ceiling proofops-ceiling--${tone}`}>
      <p>{label}</p>
      <h3>{ceiling}</h3>
      <span>{detail}</span>
    </article>
  );
}
