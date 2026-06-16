import { governanceCategoryLabels, type GovernanceSaveCategory } from "@data/governanceSaves";

export const governanceCategoryCounts: { key: GovernanceSaveCategory; count: number; tone: string }[] = [
  { key: "claim-boundary", count: 16, tone: "red" },
  { key: "runtime-boundary", count: 7, tone: "amber" },
  { key: "validator-hardening", count: 8, tone: "green" },
  { key: "ai-authority", count: 2, tone: "blue" },
  { key: "merge-authority", count: 13, tone: "cyan" },
  { key: "evidence-protection", count: 3, tone: "amber" },
  { key: "release-gate", count: 2, tone: "blue" },
  { key: "branch-hygiene", count: 16, tone: "cyan" },
  { key: "workflow-hardening", count: 5, tone: "green" },
];

export default function GovernanceCategoryChart() {
  const max = Math.max(...governanceCategoryCounts.map((item) => item.count));

  return (
    <section className="gov-chart" aria-label="Governance Saves category count bar chart">
      <div className="gov-chart__head">
        <p className="cockpit-eyebrow">Category distribution</p>
        <h2>Where the controls fired</h2>
      </div>
      <div className="gov-chart__bars">
        {governanceCategoryCounts.map((item) => (
          <div key={item.key} className={`gov-chart__row gov-tone--${item.tone}`}>
            <span>{governanceCategoryLabels[item.key]}</span>
            <div className="gov-chart__track">
              <span style={{ width: `${Math.round((item.count / max) * 100)}%` }} />
            </div>
            <strong>{item.count}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
