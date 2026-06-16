"use client";

import { useState } from "react";

const commands = [
  "npm run check:site",
  "python -B -m claimfirewall scan docs/demo docs/reviewer examples/demo --policy policy/blocked_claims.yml",
  "$env:PYTHONPATH='src'; python -B -m hoxline gauntlet run --artifact HO-DET-001 --format json",
];

export default function VerifyTerminalDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <section className={`cc-terminal ${open ? "is-open" : ""}`} aria-label="Verification terminal">
      <button
        type="button"
        className="cc-terminal__toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span>Verification Terminal</span>
        <strong>{open ? "collapse" : "expand"}</strong>
      </button>
      {open && (
        <div className="cc-terminal__body">
          <p>
            Local checks make rendering, claim wording, and generated reviewer artifacts inspectable.
            Passing checks still do not create proof authority.
          </p>
          <pre>
            <code>{commands.join("\n")}</code>
          </pre>
          <div className="cc-terminal__chips">
            <span>website rendering not proof</span>
            <span>human review required</span>
            <span>stronger claims require evidence</span>
          </div>
        </div>
      )}
    </section>
  );
}
