"use client";

import { useState, useCallback, useRef, type KeyboardEvent } from "react";
import StatusChip, { type ChipTone } from "./StatusChip";

export type SurfaceSlug = "source" | "validation" | "runtime" | "signal" | "evidence" | "public-proof";

export type PipelineStage = {
  id: string;
  n: string;
  name: string;
  chip: string;
  tone: ChipTone;
  body: string;
  surfaces: SurfaceSlug[];
  detail: {
    proves: string;
    doesNotProve: string;
    links: { label: string; href: string; external?: boolean }[];
  };
};

export default function EvidenceConveyor({ stages }: { stages: PipelineStage[] }) {
  const [activeId, setActiveId] = useState<string>(stages[0]?.id ?? "");
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activate = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentId: string) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const idx = stages.findIndex((s) => s.id === currentId);
    if (idx === -1) return;
    const nextIdx = e.key === "ArrowRight" ? (idx + 1) % stages.length : (idx - 1 + stages.length) % stages.length;
    const nextStage = stages[nextIdx];
    buttonRefs.current[nextStage.id]?.focus();
    activate(nextStage.id);
  };

  return (
    <div className="pipeline-shell">
      <ol className="pipeline" aria-label="Evidence conveyor from detection source to claim ceiling" role="tablist">
        {stages.map((stage, idx) => {
          const isActive = stage.id === activeId;
          return (
            <li
              key={stage.id}
              className={`pipeline__item ${idx === stages.length - 1 ? "pipeline__item--last" : ""}`}
            >
              <button
                type="button"
                ref={(el) => {
                  buttonRefs.current[stage.id] = el;
                }}
                className={`pipeline__node ${isActive ? "is-active" : ""}`}
                role="tab"
                data-pipeline-stage={stage.id}
                data-surface={stage.surfaces.join(" ")}
                aria-controls={`pipeline-detail-${stage.id}`}
                aria-selected={isActive ? "true" : "false"}
                aria-expanded={isActive ? "true" : "false"}
                onClick={() => activate(stage.id)}
                onKeyDown={(e) => onKeyDown(e, stage.id)}
              >
                <span className="pipeline__gate mono">Gate {stage.n}</span>
                <span className="pipeline__head">
                  <span className="pipeline__num mono">{stage.n}</span>
                  <span className="pipeline__name">{stage.name}</span>
                </span>
                <StatusChip label={stage.chip} tone={stage.tone} />
                <span className="pipeline__body">{stage.body}</span>
                <span className="pipeline__inspect mono" aria-hidden="true">Inspect</span>
              </button>
            </li>
          );
        })}
      </ol>

      {stages.map((stage) => (
        <div
          key={stage.id}
          className="pipeline-detail"
          id={`pipeline-detail-${stage.id}`}
          data-pipeline-detail={stage.id}
          role="tabpanel"
          hidden={stage.id !== activeId}
        >
          <header className="pipeline-detail__head">
            <p className="eyebrow">Stage · {stage.n}</p>
            <h3 className="pipeline-detail__title">{stage.name}</h3>
            <StatusChip label={stage.chip} tone={stage.tone} />
          </header>
          <dl className="pipeline-detail__grid">
            <div>
              <dt>Proves</dt>
              <dd>{stage.detail.proves}</dd>
            </div>
            <div>
              <dt>Does not prove</dt>
              <dd>{stage.detail.doesNotProve}</dd>
            </div>
            <div>
              <dt>Linked artifacts</dt>
              <dd>
                <ul className="pipeline-detail__links">
                  {stage.detail.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                      >
                        {link.label}
                        {link.external ? " ↗" : " →"}
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      ))}
    </div>
  );
}
