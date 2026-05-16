const steps = [
  {
    name: "Source Truth",
    note: "Source exists and can be reviewed.",
    boundary: "Source does not prove runtime.",
  },
  {
    name: "Validation Truth",
    note: "A bounded validation path passed.",
    boundary: "Validation does not prove signal.",
  },
  {
    name: "Runtime Truth",
    note: "Runtime state needs separate evidence.",
    boundary: "Website rendering is not proof.",
  },
  {
    name: "Signal Truth",
    note: "Signal state needs observed evidence.",
    boundary: "Promotion requires evidence.",
  },
  {
    name: "Evidence Truth",
    note: "Evidence must be preserved and linked.",
    boundary: "Public claims require promotion.",
  },
  {
    name: "Public Proof",
    note: "Only explicitly promoted claims belong here.",
    boundary: "The ceiling remains bounded.",
  },
];

export default function ClaimPromotionFlow() {
  return (
    <ol className="grid gap-3 lg:grid-cols-6" aria-label="Claim promotion flow">
      {steps.map((step, index) => (
        <li key={step.name} className="relative border-t border-blue-100/20 pt-5 lg:pr-4">
          <p className="mono text-[0.68rem] uppercase text-blue-100">0{index + 1}</p>
          <h3 className="mt-3 text-lg font-semibold text-slate-50">{step.name}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">{step.note}</p>
          <p className="mt-4 border-l border-blue-100/20 pl-3 text-xs leading-5 text-slate-500">
            {step.boundary}
          </p>
        </li>
      ))}
    </ol>
  );
}
