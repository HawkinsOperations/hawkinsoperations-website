/**
 * PlatformContractBlueprint
 *
 * Asymmetric blueprint panels for the platform contracts. Each panel carries
 * three lanes (schema / example / verifier), optional fixed status fields,
 * and a blocked-authority footer that states what the contract cannot do.
 * Renders src/data/platformContracts.ts. Website rendering is not proof.
 */

import { platformContracts, type PlatformContract } from "@data/platformContracts";

const laneOrder: Record<string, number> = { Schema: 0, Example: 1, Verifier: 2 };

function Blueprint({ contract }: { contract: PlatformContract }) {
  const lanes = [...contract.lanes].sort((a, b) => laneOrder[a.kind] - laneOrder[b.kind]);
  return (
    <article className="pcb" data-contract-id={contract.id}>
      <header className="pcb__head">
        <p className="pcb__type">{contract.type}</p>
        <h3 className="pcb__name">{contract.name}</h3>
        <p className="pcb__supports">{contract.supports}</p>
      </header>

      <div className="pcb__lanes">
        {lanes.map((lane) => (
          <div key={lane.path} className="pcb__lane">
            <p className="pcb__lane-kind">{lane.kind}</p>
            <p className="pcb__lane-label">{lane.label}</p>
            <p className="pcb__lane-path">{lane.path}</p>
          </div>
        ))}
      </div>

      {contract.fields && (
        <div className="pcb__fields">
          {contract.fields.map((f) => (
            <span key={f.label} className="pcb__field">
              <b>{f.label}</b> {f.value}
            </span>
          ))}
        </div>
      )}

      {contract.caveat && (
        <p className="pcb__caveat">
          <span aria-hidden="true">⚠</span>
          <span>{contract.caveat}</span>
        </p>
      )}

      {contract.shortCopy && <p className="pcb__short">{contract.shortCopy}</p>}

      <footer className="pcb__foot">
        <p className="pcb__foot-label">Blocked authority</p>
        <ul className="pcb__foot-list">
          {contract.blockedAuthority.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </footer>
    </article>
  );
}

export interface PlatformContractBlueprintProps {
  /** optional subset of contract ids to render, in order */
  ids?: string[];
}

export default function PlatformContractBlueprint({ ids }: PlatformContractBlueprintProps) {
  const list = ids
    ? ids
        .map((id) => platformContracts.find((c) => c.id === id))
        .filter((c): c is PlatformContract => Boolean(c))
    : platformContracts;
  return (
    <div className="pcb-grid" aria-label="Platform contract blueprints">
      {list.map((contract) => (
        <Blueprint key={contract.id} contract={contract} />
      ))}
    </div>
  );
}
