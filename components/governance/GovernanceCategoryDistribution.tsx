import { governanceCategoryData } from "@data/systemShowcase";

export default function GovernanceCategoryDistribution() {
  const max = Math.max(...governanceCategoryData.map((item) => item.count));

  return (
    <div className="governance-distribution" aria-label="Governance Saves category distribution">
      {governanceCategoryData.map((item) => (
        <div key={item.label} className="governance-distribution__row">
          <span>{item.label}</span>
          <div>
            <i style={{ width: `${(item.count / max) * 100}%` }} />
          </div>
          <strong>{item.count}</strong>
        </div>
      ))}
    </div>
  );
}

