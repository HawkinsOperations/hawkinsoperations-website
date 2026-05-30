"use client";

import { useId, useState, type KeyboardEvent } from "react";

type ModeId = "executive" | "proof" | "technical";

type RouteItem = { label: string; href: string; note: string };

type Mode = {
  id: ModeId;
  label: string;
  blurb: string;
  routes: RouteItem[];
};

const modes: Mode[] = [
  {
    id: "executive",
    label: "Executive",
    blurb:
      "Why governed AI Security Operations exists, what the value story looks like, and where the AI authority boundary sits.",
    routes: [
      { label: "Proof overview", href: "/proof/", note: "Claim authority and reviewer entry" },
      { label: "AI Security model", href: "/ai-security/", note: "Support-only model, human authority" },
      { label: "Mission and boundary", href: "/about/", note: "Operating thesis and current scope" },
    ],
  },
  {
    id: "proof",
    label: "Proof",
    blurb:
      "Where to inspect the controls that fired: governance saves, bounded reviewer packages, and the runtime boundary.",
    routes: [
      { label: "Governance Saves", href: "/proof/governance-saves/", note: "Controls that fired" },
      { label: "Proof Pack 001", href: "/proof/proof-pack-001/", note: "Bounded reviewer package" },
      { label: "Runtime boundary", href: "/proof/runtime-proof-factory/", note: "Bounded runtime summaries" },
    ],
  },
  {
    id: "technical",
    label: "Technical",
    blurb:
      "Detection-as-code, reviewer artifacts, controlled-test validation, and the support routes that feed the doors.",
    routes: [
      { label: "Detections", href: "/detections/", note: "Detection engineering portfolio" },
      { label: "Artifacts", href: "/artifacts/", note: "Receipts and proof packages" },
      { label: "Validation registry", href: "/validation/", note: "Controlled-test packages" },
    ],
  },
];

export default function ReviewerModeSelector() {
  const [active, setActive] = useState<ModeId>("executive");
  const groupId = useId();

  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "Home" && event.key !== "End") {
      return;
    }
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % modes.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + modes.length) % modes.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = modes.length - 1;
    setActive(modes[nextIndex].id);
    const nextBtn = document.getElementById(`${groupId}-tab-${modes[nextIndex].id}`);
    nextBtn?.focus();
  }

  const activeMode = modes.find((m) => m.id === active) ?? modes[0];

  return (
    <div className="rms">
      <div className="rms__tabs" role="tablist" aria-label="Reviewer mode">
        {modes.map((mode, i) => {
          const selected = mode.id === active;
          return (
            <button
              key={mode.id}
              id={`${groupId}-tab-${mode.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${groupId}-panel-${mode.id}`}
              tabIndex={selected ? 0 : -1}
              className={`rms__tab ${selected ? "rms__tab--active" : ""}`}
              onClick={() => setActive(mode.id)}
              onKeyDown={(event) => onKey(event, i)}
            >
              <span className="rms__tab-label">{mode.label}</span>
              <span className="rms__tab-underline" aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div
        className="rms__panel"
        role="tabpanel"
        id={`${groupId}-panel-${activeMode.id}`}
        aria-labelledby={`${groupId}-tab-${activeMode.id}`}
      >
        <p className="rms__blurb">{activeMode.blurb}</p>
        <ul className="rms__routes">
          {activeMode.routes.map((route) => (
            <li key={route.href} className="rms__route">
              <a className="rms__route-link" href={route.href}>
                <span className="rms__route-label">{route.label}</span>
                <span className="rms__route-note">{route.note}</span>
                <span className="rms__route-arrow" aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
