type RailStage = {
  num: string;
  title: string;
  happens: string;
  control: string;
  blocked: string;
};

const stages: RailStage[] = [
  {
    num: "01",
    title: "Generate",
    happens: "AI-assisted drafting accelerates detection-as-code, SPL, and reviewer prose.",
    control: "Generation runs against repo source; no public copy ships from a draft.",
    blocked: "AI cannot decide disposition or promote claims.",
  },
  {
    num: "02",
    title: "Constrain",
    happens: "Schema, contracts, and the blocked-claim scanner cap wording at source.",
    control: "Public surfaces are gated by a site-contract scan and runtime boundary rules.",
    blocked: "Unsafe wording (runtime, customer, fleet, production) is not allowed to render.",
  },
  {
    num: "03",
    title: "Validate",
    happens: "Deterministic controlled-test packages decide pass or fail.",
    control: "The verifier owns the gate; case packets stay bounded to the validation result.",
    blocked: "Source presence is not signal observation; ceilings remain capped.",
  },
  {
    num: "04",
    title: "Review",
    happens: "Human review must resolve threads before merge authority is granted.",
    control: "Green CI is not merge authority; review and scope sit above checks.",
    blocked: "AI-approved disposition and analyst-approved disposition are not claimed.",
  },
  {
    num: "05",
    title: "Publish",
    happens: "Bounded reviewer artifacts surface: proof records, receipts, governance saves.",
    control: "Stronger claims require a separate promotion path with new evidence.",
    blocked: "Private-only evidence and host-local paths stay off public surfaces.",
  },
];

export default function ProofLoopRail() {
  return (
    <div className="plr">
      <ol className="plr__rail" aria-label="Proof loop stages">
        {stages.map((stage, i) => (
          <li className="plr__stage" key={stage.num}>
            <div className="plr__node" aria-hidden="true">
              <span className="plr__node-num">{stage.num}</span>
              <span className="plr__node-pulse" />
            </div>
            {i < stages.length - 1 && <div className="plr__connector" aria-hidden="true" />}
            <article className="plr__card" tabIndex={0}>
              <header className="plr__card-head">
                <span className="plr__card-num">{stage.num}</span>
                <h3 className="plr__card-title">{stage.title}</h3>
              </header>
              <dl className="plr__rows">
                <div className="plr__row">
                  <dt className="plr__row-label plr__row-label--happens">Happens</dt>
                  <dd className="plr__row-value">{stage.happens}</dd>
                </div>
                <div className="plr__row">
                  <dt className="plr__row-label plr__row-label--control">Control</dt>
                  <dd className="plr__row-value">{stage.control}</dd>
                </div>
                <div className="plr__row">
                  <dt className="plr__row-label plr__row-label--blocked">Blocked</dt>
                  <dd className="plr__row-value">{stage.blocked}</dd>
                </div>
              </dl>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
