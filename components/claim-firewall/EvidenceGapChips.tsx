export default function EvidenceGapChips({ gaps }: { gaps: string[] }) {
  return (
    <div className="evidence-gap-chips" aria-label="Missing evidence">
      {gaps.map((gap) => (
        <span key={gap}>{gap}</span>
      ))}
    </div>
  );
}

