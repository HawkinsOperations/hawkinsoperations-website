const lenses = ["Claim control", "Detection quality", "Validation hardening", "Runtime/signal boundary", "Merge/review authority"];

export default function GovernanceOpsLens({ active, onChange }: { active: string; onChange: (lens: string) => void }) {
  return (
    <div className="governance-ops-lens" aria-label="Governance ops lens">
      {lenses.map((lens) => (
        <button key={lens} type="button" className={active === lens ? "is-active" : ""} onClick={() => onChange(lens)}>
          {lens}
        </button>
      ))}
    </div>
  );
}

