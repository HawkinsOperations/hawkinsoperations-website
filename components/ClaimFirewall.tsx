import {
  allowedClaims,
  blockedClaims,
  promotionRequirements,
  safeWordingExamples,
  unsafeWordingExamples,
} from "@data/claims";

export default function ClaimFirewall() {
  return (
    <div className="grid gap-5 lg:grid-cols-2" data-ci-target="blocked-claims">
      <article className="surface rounded-lg p-6">
        <p className="mono text-xs uppercase text-blue-100">Allowed claims</p>
        <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
          {allowedClaims.map((claim, i) => (
            <li key={i}>{claim}</li>
          ))}
        </ul>
      </article>
      <article className="surface rounded-lg border-rose-300/25 p-6">
        <p className="mono text-xs uppercase text-rose-200">Blocked / not claimed</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {blockedClaims.map((claim) => (
            <span
              key={claim}
              className="mono border border-rose-300/25 bg-rose-950/30 px-2.5 py-1 text-[0.68rem] uppercase text-rose-100"
            >
              {claim}
            </span>
          ))}
        </div>
      </article>
      <article className="card p-6">
        <p className="mono text-xs uppercase text-slate-500">Promotion requirements</p>
        <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
          {promotionRequirements.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </article>
      <article className="card p-6">
        <p className="mono text-xs uppercase text-slate-500">Wording examples</p>
        <div className="mt-5 grid gap-4">
          <div>
            <h3 className="text-sm font-semibold text-blue-100">Safe wording</h3>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-400">
              {safeWordingExamples.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-rose-200">Unsafe wording</h3>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-400">
              {unsafeWordingExamples.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
}
