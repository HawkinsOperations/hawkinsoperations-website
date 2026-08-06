"use client";

import { useState } from "react";
import {
  authorityActions,
  type AuthorityActionId,
} from "../../src/data/reviewerGuide";

export default function AuthorityBoundary() {
  const [selectedId, setSelectedId] = useState<AuthorityActionId>("draft-detection");
  const selected = authorityActions.find((action) => action.id === selectedId) ?? authorityActions[0];
  const labor = authorityActions.filter((action) => action.domain === "labor");
  const authority = authorityActions.filter((action) => action.domain === "authority");

  return (
    <div className="rg-authority" data-authority-result={selected.result.toLowerCase()}>
      <div className="rg-authority__field rg-authority__field--labor">
        <p><span>Domain 01</span>AI-assisted labor</p>
        <h3>Accelerate the work</h3>
        <div className="rg-authority__actions" role="group" aria-label="AI-assisted labor actions">
          {labor.map((action) => (
            <button key={action.id} type="button" aria-pressed={selectedId === action.id} onClick={() => setSelectedId(action.id)}>
              <span aria-hidden="true">→</span>{action.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rg-authority__gate" aria-label="Evidence and human authority boundary">
        <span>Evidence gate</span>
        <i aria-hidden="true" />
        <strong>{selected.result === "AI_ASSIST_ALLOWED" ? "assistance allowed" : "authority required"}</strong>
      </div>

      <div className="rg-authority__field rg-authority__field--human">
        <p><span>Domain 02</span>Human / evidence authority</p>
        <h3>Authorize the outcome</h3>
        <div className="rg-authority__actions" role="group" aria-label="Human authority actions">
          {authority.map((action) => (
            <button key={action.id} type="button" aria-pressed={selectedId === action.id} onClick={() => setSelectedId(action.id)}>
              <span aria-hidden="true">×</span>{action.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rg-authority__decision" role="status" aria-live="polite">
        <span>Boundary decision</span>
        <strong>{selected.result}</strong>
        <p><b>{selected.label}</b>{selected.reason}</p>
      </div>
    </div>
  );
}
