"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

type SurfaceSlug = "source" | "validation" | "runtime" | "signal" | "evidence" | "public-proof";

const surfaces: {
  slug: SurfaceSlug;
  name: string;
  question: string;
  canProve: string;
  cannotProve: string;
  example: string;
  lane: string;
  stages: string[];
}[] = [
  {
    slug: "source",
    name: "Source",
    question: "Where does the work enter the system?",
    canProve: "A detection source, SPL, or rule candidate exists and can be reviewed.",
    cannotProve: "The rule executed, matched, or produced a signal.",
    example: "HO-DET-001 detection source",
    lane: "Closed SOC Loop",
    stages: ["Detection Source"],
  },
  {
    slug: "validation",
    name: "Validation",
    question: "Did controlled fixtures exercise the behavior?",
    canProve: "Positive and negative fixtures passed inside the validation boundary.",
    cannotProve: "Endpoint runtime activity, production scope, or fleet coverage.",
    example: "HO-DET-001 validation report",
    lane: "Controlled-test validation lane",
    stages: ["Fixtures", "Case Packet"],
  },
  {
    slug: "runtime",
    name: "Runtime",
    question: "Did the system execute in a lab or runtime environment?",
    canProve: "A bounded local runtime event or execution path exists when separately evidenced.",
    cannotProve: "Public-safe signal or public proof by itself.",
    example: "Sanitized internal runtime packet when approved",
    lane: "Runtime boundary lane",
    stages: ["Case Packet", "Verifier"],
  },
  {
    slug: "signal",
    name: "Signal",
    question: "Was an event, match, or correlation observed?",
    canProve: "A bounded observed event exists when the evidence chain is approved.",
    cannotProve: "Production, fleet-wide, or public-safe status.",
    example: "Signal receipt after privacy and claim review",
    lane: "Signal boundary lane",
    stages: ["Verifier", "Proof Record"],
  },
  {
    slug: "evidence",
    name: "Evidence",
    question: "What receipt supports the reviewer decision?",
    canProve: "A packet, hash, CI output, or reviewer artifact exists.",
    cannotProve: "Public wording or promotion without the claim gate.",
    example: "Case packet and blocked-claim scanner output",
    lane: "Governance review gate",
    stages: ["AI Support", "Verifier"],
  },
  {
    slug: "public-proof",
    name: "Public Proof",
    question: "What can the public page safely route to?",
    canProve: "A reviewed public proof record exists with a stated ceiling.",
    cannotProve: "Raw runtime truth, signal observation, or stronger status by website rendering alone.",
    example: "HO-DET-001 public proof record",
    lane: "Website reviewer surface",
    stages: ["Proof Record", "Claim Ceiling"],
  },
];

export default function TruthSurfaceSeparation() {
  const [activePanel, setActivePanel] = useState<SurfaceSlug>("source");
  const [activeFilter, setActiveFilter] = useState<SurfaceSlug | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-surface]");

    if (!activeFilter) {
      targets.forEach((el) => el.classList.remove("is-surface-dim", "is-surface-match"));
      delete document.body.dataset.activeSurface;
      return;
    }

    targets.forEach((el) => {
      const declared = (el.dataset.surface || "").split(/\s+/).filter(Boolean);
      if (declared.includes(activeFilter)) {
        el.classList.add("is-surface-match");
        el.classList.remove("is-surface-dim");
      } else {
        el.classList.add("is-surface-dim");
        el.classList.remove("is-surface-match");
      }
    });
    document.body.dataset.activeSurface = activeFilter;
  }, [activeFilter]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && document.body.dataset.activeSurface) {
        setActiveFilter(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleSwitch = (slug: SurfaceSlug) => {
    setActivePanel(slug);
    setActiveFilter((current) => (current === slug ? null : slug));
  };

  const handleTabKey = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "Home" && event.key !== "End") {
      return;
    }
    event.preventDefault();

    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % surfaces.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + surfaces.length) % surfaces.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = surfaces.length - 1;

    const nextSurface = surfaces[nextIndex];
    setActivePanel(nextSurface.slug);
    setActiveFilter(nextSurface.slug);
    document.getElementById(`truth-tab-${nextSurface.slug}`)?.focus();
  };

  const statusText = activeFilter
    ? `Filter active · ${surfaces.find((s) => s.slug === activeFilter)?.name ?? activeFilter} surface highlighted.`
    : "Filter inactive · all surfaces shown.";

  return (
    <section ref={rootRef} className="truth-board" aria-labelledby="truth-board-title">
      <header className="truth-board__header">
        <div>
          <p className="eyebrow">Truth Surface Control Board</p>
          <h2 id="truth-board-title" className="headline mt-3 text-2xl md:text-[1.8rem]">
            Select one surface. Inspect its boundary before the claim moves.
          </h2>
          <p className="truth-board__plain mt-3">
            These controls highlight matching lanes and conveyor gates. They do not promote proof.
            Website rendering remains reviewer routing only.
          </p>
        </div>
        <button
          type="button"
          className="truth-board__reset"
          onClick={() => setActiveFilter(null)}
          aria-label="Show all surfaces and clear the active filter"
        >
          Show all
        </button>
      </header>

      <div className="truth-board__switches" role="tablist" aria-label="Truth surfaces">
        {surfaces.map((surface, index) => {
          const isActive = activeFilter === surface.slug;
          const isSelected = activePanel === surface.slug;
          return (
            <button
              key={surface.slug}
              id={`truth-tab-${surface.slug}`}
              type="button"
              className={`truth-board__switch ${isSelected ? "is-selected" : ""} ${isActive ? "is-active" : ""}`}
              onClick={() => handleSwitch(surface.slug)}
              onKeyDown={(event) => handleTabKey(event, index)}
              role="tab"
              aria-selected={isSelected ? "true" : "false"}
              aria-pressed={isActive ? "true" : "false"}
              aria-controls={`truth-panel-${surface.slug}`}
              tabIndex={isSelected ? 0 : -1}
            >
              <span className="truth-board__switch-index mono">{String(index + 1).padStart(2, "0")}</span>
              <span>{surface.name}</span>
            </button>
          );
        })}
      </div>

      <div className="truth-board__workspace">
        <ol className="truth-board__rail" aria-label="Separated control surfaces">
          {surfaces.map((surface, index) => (
            <li
              key={surface.slug}
              className={`truth-board__rail-item ${activePanel === surface.slug ? "is-selected" : ""}`}
              data-surface-marker={surface.slug}
            >
              <span className="truth-board__rail-index mono">{String(index + 1).padStart(2, "0")}</span>
              <span className="truth-board__rail-label">{surface.name}</span>
            </li>
          ))}
        </ol>

        <div className="truth-board__panels">
          {surfaces.map((surface) => (
            <article
              key={surface.slug}
              className="truth-board__panel"
              id={`truth-panel-${surface.slug}`}
              role="tabpanel"
              aria-labelledby={`truth-tab-${surface.slug}`}
              hidden={activePanel !== surface.slug}
            >
              <div className="truth-board__panel-head">
                <p className="truth-board__surface mono">{surface.slug}</p>
                <h3>{surface.name}</h3>
                <p>{surface.question}</p>
              </div>

              <dl className="truth-board__facts">
                <div>
                  <dt>Can prove</dt>
                  <dd>{surface.canProve}</dd>
                </div>
                <div>
                  <dt>Cannot prove</dt>
                  <dd>{surface.cannotProve}</dd>
                </div>
                <div>
                  <dt>Example artifact</dt>
                  <dd>{surface.example}</dd>
                </div>
                <div>
                  <dt>Matching lane</dt>
                  <dd>{surface.lane}</dd>
                </div>
                <div className="truth-board__stages">
                  <dt>Related conveyor gates</dt>
                  <dd>
                    {surface.stages.map((stage) => (
                      <span key={stage}>{stage}</span>
                    ))}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>

      <p className="truth-board__status mono" aria-live="polite">
        {statusText}
      </p>
    </section>
  );
}
