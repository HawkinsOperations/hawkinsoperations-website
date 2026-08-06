"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  generatedStatusFreshnessLabel,
  isGeneratedStatusStale,
  metricDisplay,
} from "@data/generated/public-status.generated";
import { externalLinks } from "@data/navigation";

type SceneId =
  | "problem"
  | "system"
  | "ho-det-001"
  | "ai-authority"
  | "truth-surfaces"
  | "reviewer-verification"
  | "controls-receipts"
  | "closing";

type Scene = {
  id: SceneId;
  label: string;
  title: string;
};

const scenes: Scene[] = [
  { id: "problem", label: "The problem", title: "AI can generate security work faster than organizations can prove it." },
  { id: "system", label: "The whole system", title: "One controlled route from generated work to bounded public output." },
  { id: "ho-det-001", label: "Concrete example", title: "Follow one PowerShell behavior hypothesis through the complete system." },
  { id: "ai-authority", label: "AI and authority", title: "AI stops at the evidence gate. Human authority governs what happens next." },
  { id: "truth-surfaces", label: "Truth surfaces", title: "Six kinds of truth. None can silently stand in for another." },
  { id: "reviewer-verification", label: "Reviewer verification", title: "View the work. Clone the source. Run the checks. Verify the boundary." },
  { id: "controls-receipts", label: "Controls and receipts", title: "The strongest receipts show what the system prevented." },
  { id: "closing", label: "Closing thesis", title: "Move fast, but make every important claim earn its authority." },
];

const systemStages = [
  {
    number: "01",
    label: "AI-assisted labor",
    enters: "A security question or implementation task",
    happens: "AI drafts logic, queries, analysis, and reviewer material.",
    exits: "Named draft candidate",
    cannot: "Authorize truth or disposition",
    tone: "cyan",
  },
  {
    number: "02",
    label: "Source-controlled work",
    enters: "Draft candidate",
    happens: "Scope, logic, metadata, and ownership become inspectable source.",
    exits: "Detection and query source",
    cannot: "Prove execution or a signal",
    tone: "blue",
  },
  {
    number: "03",
    label: "Deterministic validation",
    enters: "Source plus controlled fixtures",
    happens: "Positive cases test matching; negative cases test restraint.",
    exits: "Validation result and case packet",
    cannot: "Create runtime or production truth",
    tone: "green",
  },
  {
    number: "04",
    label: "Hoxline + claim gates",
    enters: "Artifact, result, and evidence ceiling",
    happens: "Contracts and Claim Firewall evaluate configured evidence state and constrain checked wording.",
    exits: "Gated claim decision",
    cannot: "Own proof or approval authority",
    tone: "cyan",
  },
  {
    number: "05",
    label: "Evidence artifacts",
    enters: "Source, results, and claim decision",
    happens: "Receipts link what exists, what passed, and what remains blocked.",
    exits: "Proof record and reviewer routes",
    cannot: "Promote beyond the stated ceiling",
    tone: "amber",
  },
  {
    number: "06",
    label: "Human review",
    enters: "Inspectable evidence package",
    happens: "A human resolves concerns and controls merge or promotion.",
    exits: "Recorded review decision",
    cannot: "Be replaced by green CI or AI",
    tone: "white",
  },
  {
    number: "07",
    label: "Bounded public output",
    enters: "Bounded wording and source-owned routes",
    happens: "The website guides reviewers without becoming proof authority.",
    exits: "Public explanation and source links",
    cannot: "Create a stronger operational claim",
    tone: "neutral",
  },
] as const;

const exampleSteps = [
  ["01", "Hypothesis", "A PowerShell process-creation behavior is worth detecting."],
  ["02", "Source", "Detection logic and a Splunk query represent the idea in reviewable files."],
  ["03", "Positive fixtures", "Seven controlled cases test the behavior expected to match."],
  ["04", "Negative fixtures", "Seven controlled cases test whether known non-matches stay quiet."],
  ["05", "Deterministic result", "The validator records seven matched positives, zero misses, and zero false-positive negatives."],
  ["06", "Evidence package", "Source routes, validation output, a proof record, and a claim ceiling remain separate and inspectable."],
  ["07", "Claim boundary", "Hoxline and Claim Firewall constrain stronger runtime, signal, and production wording within this checked route."],
  ["08", "Human authority", "A person controls merge and any future claim promotion."],
] as const;

const truthSurfaces = [
  ["Source", "A reviewable file exists.", "Execution, a match, or deployment."],
  ["Validation", "Controlled fixtures passed in scope.", "Runtime, signal, or production behavior."],
  ["Runtime", "A scoped system action occurred when separately evidenced.", "A public-safe signal or broad coverage."],
  ["Signal", "A scoped observation exists when separately evidenced.", "Compromise, fleet coverage, or public proof."],
  ["Evidence + proof", "A receipt supports its stated claim ceiling.", "A broader or newer claim than the record states."],
  ["Public rendering", "A reviewer can find the right source and receipt.", "Truth, approval, or proof promotion by presentation."],
] as const;

const receiptMetrics = [
  { ...metricDisplay("controls_fired"), displayLabel: "documented Governance Saves" },
  { ...metricDisplay("validation_cases"), displayLabel: "controlled validation cases" },
  { ...metricDisplay("blocked_claims"), displayLabel: "claims blocked in checked scope" },
];

const controls = [
  ["Overclaim stopped", "In the cited records, defined unsupported runtime and production wording was blocked or constrained."],
  ["AI authority held", "In the cited records, AI-assisted output did not receive disposition, approval, or case-closure authority."],
  ["Merge gate preserved", "Cited controls kept green checks as validation evidence rather than merge authority."],
  ["Evidence contained", "Documented safeguards kept identified private and host-local material off public rendering surfaces."],
  ["Validator strengthened", "Cited review findings became deterministic fail-closed checks instead of prose promises."],
] as const;

const presentationTimes = [
  ["00:30", "The problem"],
  ["01:00", "The whole system"],
  ["02:00", "HO-DET-001"],
  ["01:00", "AI authority"],
  ["00:45", "Truth surfaces"],
  ["01:00", "Reviewer verification"],
  ["00:30", "Controls and receipts"],
  ["00:15", "Why boundaries matter"],
] as const;

function isTextEntryTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(
    target.closest(
      'input, textarea, select, [contenteditable="true"], [data-presentation-ignore-keys]',
    ),
  );
}

function isActionTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(target.closest("a, button, summary"));
}

export default function HomePresentationMode() {
  const [presenting, setPresenting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const enterButtonRef = useRef<HTMLButtonElement | null>(null);
  const sceneRefs = useRef<(HTMLElement | null)[]>([]);
  const enteredFromPage = useRef(false);

  const setPresentationUrl = useCallback((index: number, method: "push" | "replace") => {
    const url = new URL(window.location.href);
    url.searchParams.set("present", "1");
    url.searchParams.set("scene", String(index + 1));
    window.history[method === "push" ? "pushState" : "replaceState"](
      { homePresentation: true },
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }, []);

  const moveTo = useCallback(
    (nextIndex: number, updateUrl = true) => {
      const bounded = Math.max(0, Math.min(scenes.length - 1, nextIndex));
      setActiveIndex(bounded);
      if (presenting && updateUrl) setPresentationUrl(bounded, "replace");
    },
    [presenting, setPresentationUrl],
  );

  const enterPresentation = useCallback(() => {
    enteredFromPage.current = true;
    setActiveIndex(0);
    setPresenting(true);
    setPresentationUrl(0, "push");
  }, [setPresentationUrl]);

  const restoreEntryFocus = useCallback(() => {
    window.requestAnimationFrame(() => enterButtonRef.current?.focus());
  }, []);

  const exitPresentation = useCallback(() => {
    setPresenting(false);
    setActiveIndex(0);
    if (enteredFromPage.current && window.history.state?.homePresentation) {
      enteredFromPage.current = false;
      window.history.back();
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete("present");
      url.searchParams.delete("scene");
      window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
      restoreEntryFocus();
    }
  }, [restoreEntryFocus]);

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const shouldPresent = params.get("present") === "1";
      const requested = Number.parseInt(params.get("scene") ?? "1", 10);
      const bounded = Number.isFinite(requested)
        ? Math.max(1, Math.min(scenes.length, requested)) - 1
        : 0;
      setPresenting(shouldPresent);
      setActiveIndex(bounded);
      if (shouldPresent && requested !== bounded + 1) setPresentationUrl(bounded, "replace");
      if (!shouldPresent) restoreEntryFocus();
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [restoreEntryFocus, setPresentationUrl]);

  useEffect(() => {
    if (!presenting) return;
    window.requestAnimationFrame(() => {
      document.getElementById(`reviewer-guide-scene-${scenes[activeIndex].id}-title`)?.focus();
    });
  }, [activeIndex, presenting]);

  useEffect(() => {
    if (presenting) {
      document.body.dataset.presentationMode = "active";
    } else {
      delete document.body.dataset.presentationMode;
    }

    sceneRefs.current.forEach((scene, index) => {
      if (!scene) return;
      (scene as HTMLElement & { inert: boolean }).inert = presenting && index !== activeIndex;
    });

    return () => {
      delete document.body.dataset.presentationMode;
      sceneRefs.current.forEach((scene) => {
        if (scene) (scene as HTMLElement & { inert: boolean }).inert = false;
      });
    };
  }, [activeIndex, presenting]);

  useEffect(() => {
    if (!presenting) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key === "Escape") {
        event.preventDefault();
        exitPresentation();
        return;
      }
      if (isTextEntryTarget(event.target)) return;

      if (["ArrowRight", "PageDown"].includes(event.key) || (event.key === " " && !isActionTarget(event.target))) {
        event.preventDefault();
        moveTo(activeIndex + 1);
      } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        moveTo(activeIndex - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        moveTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        moveTo(scenes.length - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, exitPresentation, moveTo, presenting]);

  const sceneProps = (index: number) => ({
    ref: (element: HTMLElement | null) => {
      sceneRefs.current[index] = element;
    },
    hidden: presenting && index !== activeIndex,
    "aria-hidden": presenting && index !== activeIndex ? true : undefined,
    "data-presentation-scene": scenes[index].id,
    "data-scene-active": presenting && index === activeIndex ? "true" : undefined,
  });

  return (
    <div className={`reviewer-guide ${presenting ? "is-presenting" : ""}`} data-presentation-active={presenting ? "true" : "false"}>
      {presenting && (
        <div className="reviewer-guide__toolbar" role="region" aria-label="Presentation controls">
          <button type="button" className="reviewer-guide__control reviewer-guide__control--exit" onClick={exitPresentation} aria-keyshortcuts="Escape">
            Exit
          </button>
          <button type="button" className="reviewer-guide__control" onClick={() => moveTo(activeIndex - 1)} disabled={activeIndex === 0} aria-keyshortcuts="ArrowLeft PageUp">
            <span aria-hidden="true">←</span> Previous
          </button>
          <div className="reviewer-guide__progress" role="status" aria-live="polite">
            <span>Scene {activeIndex + 1} of {scenes.length}</span>
            <strong>{scenes[activeIndex].label}</strong>
          </div>
          <button type="button" className="reviewer-guide__control" onClick={() => moveTo(activeIndex + 1)} disabled={activeIndex === scenes.length - 1} aria-keyshortcuts="ArrowRight PageDown">
            Next <span aria-hidden="true">→</span>
          </button>
        </div>
      )}

      <section {...sceneProps(0)} id="reviewer-guide-scene-problem" className="reviewer-scene reviewer-scene--hero" aria-labelledby="reviewer-guide-scene-problem-title">
        <div className="container reviewer-scene__inner">
          <div className="reviewer-hero__grid">
            <div className="reviewer-hero__copy">
              <p className="reviewer-guide__eyebrow">Reviewer Guide</p>
              <h1 id="reviewer-guide-scene-problem-title" tabIndex={-1}>
                AI can generate security work faster than organizations can <span>prove it.</span>
              </h1>
              <p className="reviewer-hero__thesis">
                HawkinsOperations is a governed AI Security Operations and detection engineering system that turns fast AI-assisted security work into bounded, inspectable artifacts without allowing generated confidence to outrun evidence or human authority.
              </p>
              {!presenting && <div className="reviewer-hero__actions">
                <a className="reviewer-guide__cta reviewer-guide__cta--primary" href="#reviewer-guide-scene-system">Start the walkthrough</a>
                <button ref={enterButtonRef} type="button" className="reviewer-guide__cta" onClick={enterPresentation}>Enter presentation mode</button>
                <a className="reviewer-guide__cta reviewer-guide__cta--quiet" href="/hoxline/">Open Hoxline</a>
              </div>}
            </div>
            <aside className="reviewer-hero__boundary" aria-label="HawkinsOperations operating boundary">
              <p className="reviewer-hero__boundary-label">The control problem</p>
              <div className="reviewer-hero__contrast" aria-label="Fast generation to controlled review path">
                <span>Fast generation</span><b aria-hidden="true">→</b><span>Evidence gap</span><b aria-hidden="true">→</b><span>Controlled review</span>
              </div>
              <dl>
                <div><dt>AI creates</dt><dd>speed and implementation leverage</dd></div>
                <div><dt>Evidence limits</dt><dd>what the work can honestly claim</dd></div>
                <div><dt>Human review owns</dt><dd>merge, promotion, and final authority</dd></div>
              </dl>
            </aside>
          </div>
          <ul className="reviewer-guide__audiences" aria-label="Ways to use this Reviewer Guide">
            <li>Podcast walkthrough</li><li>Brown-bag presentation</li><li>Show-and-tell</li><li>Technical review</li><li>Hiring review</li><li>Self-guided inspection</li>
          </ul>
        </div>
      </section>

      <section {...sceneProps(1)} id="reviewer-guide-scene-system" className="reviewer-scene reviewer-scene--system" aria-labelledby="reviewer-guide-scene-system-title">
        <div className="container reviewer-scene__inner">
          <header className="reviewer-scene__head">
            <p className="reviewer-guide__eyebrow">02 · The whole system</p>
            <h2 id="reviewer-guide-scene-system-title" tabIndex={-1}>One controlled route from generated work to bounded public output.</h2>
            <p>Every stage leaves an artifact. Every stage also has an authority it does not possess.</p>
          </header>
          <ol className="reviewer-system" aria-label="Complete HawkinsOperations workflow">
            {systemStages.map((stage) => (
              <li key={stage.number} className={`reviewer-system__stage reviewer-system__stage--${stage.tone}`}>
                <div className="reviewer-system__stage-head"><span>{stage.number}</span><h3>{stage.label}</h3></div>
                <dl>
                  <div><dt>Enters</dt><dd>{stage.enters}</dd></div>
                  <div><dt>Happens</dt><dd>{stage.happens}</dd></div>
                  <div><dt>Artifact exits</dt><dd>{stage.exits}</dd></div>
                  <div className="reviewer-system__limit"><dt>No authority to</dt><dd>{stage.cannot}</dd></div>
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section {...sceneProps(2)} id="reviewer-guide-scene-ho-det-001" className="reviewer-scene reviewer-scene--example" aria-labelledby="reviewer-guide-scene-ho-det-001-title">
        <div className="container reviewer-scene__inner">
          <header className="reviewer-scene__head reviewer-scene__head--split">
            <div>
              <p className="reviewer-guide__eyebrow">03 · One concrete example</p>
              <h2 id="reviewer-guide-scene-ho-det-001-title" tabIndex={-1}>Follow one PowerShell behavior hypothesis through the complete system.</h2>
            </div>
            <aside className="reviewer-example__ceiling">
              <span>Current public ceiling</span>
              <strong><code>CONTROLLED_TEST_VALIDATED</code></strong>
              <p>Controlled positive and negative process-creation fixtures passed in stated scope. HO-DET-001 remains under review; runtime, signal, deployment, customer, and disposition claims are not promoted.</p>
            </aside>
          </header>
          <ol className="reviewer-example__steps">
            {exampleSteps.map(([number, label, description]) => (
              <li key={number}><span>{number}</span><div><h3>{label}</h3><p>{description}</p></div></li>
            ))}
          </ol>
          <div className="reviewer-example__routes" aria-label="HO-DET-001 inspection routes">
            <a href={externalLinks.hoDet001Rule} target="_blank" rel="noopener noreferrer"><span>View</span><strong>Detection source ↗</strong></a>
            <a href={externalLinks.validationReportHo} target="_blank" rel="noopener noreferrer"><span>View</span><strong>Validation result ↗</strong></a>
            <a href={externalLinks.proofRecord} target="_blank" rel="noopener noreferrer"><span>View</span><strong>Proof record ↗</strong></a>
            <a href="/hoxline/"><span>Open</span><strong>Hoxline control route</strong></a>
            <a href="/claim-firewall/"><span>Try</span><strong>Claim Firewall</strong></a>
          </div>
        </div>
      </section>

      <section {...sceneProps(3)} id="reviewer-guide-scene-ai-authority" className="reviewer-scene reviewer-scene--authority" aria-labelledby="reviewer-guide-scene-ai-authority-title">
        <div className="container reviewer-scene__inner">
          <header className="reviewer-scene__head">
            <p className="reviewer-guide__eyebrow">04 · AI and authority</p>
            <h2 id="reviewer-guide-scene-ai-authority-title" tabIndex={-1}>AI stops at the evidence gate. Human authority governs what happens next.</h2>
            <p>“Human in the loop” is too vague. HawkinsOperations names exactly what AI may accelerate and exactly what remains human-owned.</p>
          </header>
          <div className="reviewer-authority__split">
            <article className="reviewer-authority__panel reviewer-authority__panel--labor">
              <p>AI can accelerate</p>
              <h3>High-volume implementation labor</h3>
              <ul><li>Drafting</li><li>Detection logic assistance</li><li>Query assistance</li><li>Format translation</li><li>Documentation</li><li>Summaries and enrichment</li><li>Reviewer notes</li><li>Repetitive implementation</li></ul>
            </article>
            <div className="reviewer-authority__handoff" aria-label="Authority boundary"><span>AI stops here</span><b aria-hidden="true">→</b><strong>Human authority</strong></div>
            <article className="reviewer-authority__panel reviewer-authority__panel--authority">
              <p>AI cannot authorize</p>
              <h3>Truth, disposition, or promotion</h3>
              <ul><li>Evidence sufficiency</li><li>Detection disposition</li><li>Incident disposition</li><li>Approval</li><li>Merge authority</li><li>Claim promotion</li><li>Public-safe status</li><li>Case closure or production status</li></ul>
            </article>
          </div>
          <p className="reviewer-authority__rule">Deterministic checks decide whether scoped contracts pass. A human decides whether the evidence is sufficient for merge, promotion, publication, or disposition.</p>
        </div>
      </section>

      <section {...sceneProps(4)} id="reviewer-guide-scene-truth-surfaces" className="reviewer-scene reviewer-scene--truth" aria-labelledby="reviewer-guide-scene-truth-surfaces-title">
        <div className="container reviewer-scene__inner">
          <header className="reviewer-scene__head">
            <p className="reviewer-guide__eyebrow">05 · Truth surfaces</p>
            <h2 id="reviewer-guide-scene-truth-surfaces-title" tabIndex={-1}>Six kinds of truth. None can silently stand in for another.</h2>
            <p>A file, a passing test, an observed event, a proof record, and a polished page answer different questions.</p>
          </header>
          <div className="reviewer-truth__grid">
            {truthSurfaces.map(([name, proves, doesNotProve], index) => (
              <article key={name} className="reviewer-truth__surface">
                <span>{String(index + 1).padStart(2, "0")}</span><h3>{name}</h3>
                <dl><div><dt>Can establish</dt><dd>{proves}</dd></div><div><dt>Does not establish</dt><dd>{doesNotProve}</dd></div></dl>
              </article>
            ))}
          </div>
          <div className="reviewer-truth__boundary"><strong>Website rendering is navigation, not proof authority.</strong><span>Stronger claims require stronger evidence and a separate human promotion decision.</span></div>
        </div>
      </section>

      <section {...sceneProps(5)} id="reviewer-guide-scene-reviewer-verification" className="reviewer-scene reviewer-scene--verify" aria-labelledby="reviewer-guide-scene-reviewer-verification-title">
        <div className="container reviewer-scene__inner">
          <header className="reviewer-scene__head">
            <p className="reviewer-guide__eyebrow">06 · Reviewer verification</p>
            <h2 id="reviewer-guide-scene-reviewer-verification-title" tabIndex={-1}>View the work. Clone the source. Run the checks. Verify the boundary.</h2>
            <p>These are real routes and repository-supported commands. Each verifies only its stated scope.</p>
          </header>
          <div className="reviewer-verify__grid">
            <article className="reviewer-verify__actions">
              <a href={externalLinks.hoDet001Rule} target="_blank" rel="noopener noreferrer"><span>View</span><strong>HO-DET-001 source</strong><small>Detection truth</small></a>
              <a href={externalLinks.validationReportHo} target="_blank" rel="noopener noreferrer"><span>View</span><strong>Controlled validation result</strong><small>Validation truth</small></a>
              <a href={externalLinks.proofRecord} target="_blank" rel="noopener noreferrer"><span>View</span><strong>Proof record and ceiling</strong><small>Proof-owned claim route</small></a>
              <a href="/hoxline/"><span>Open</span><strong>Hoxline</strong><small>Product and claim-control route</small></a>
              <a href="/claim-firewall/"><span>Try</span><strong>Claim Firewall</strong><small>Blocked-claim demonstration</small></a>
              <a href={externalLinks.reproducibleReviewerPath} target="_blank" rel="noopener noreferrer"><span>Run</span><strong>Reproducible reviewer path</strong><small>Organization-owned instructions</small></a>
            </article>
            <div className="reviewer-verify__commands" aria-label="Reviewer commands">
              <div><span>Clone · validation</span><code>git clone https://github.com/HawkinsOperations/hawkinsoperations-validation.git</code></div>
              <div><span>Run · controlled fixtures</span><code>python -B scripts/validate-ho-det-001.py --source-contract skip-if-missing</code></div>
              <div><span>Clone · Hoxline</span><code>git clone https://github.com/HawkinsOperations/hoxline.git</code></div>
              <div><span>Verify · HO-DET-001 Gauntlet artifact</span><code>python -B -m hoxline gauntlet verify --input examples\gauntlet\ho-det-001-full-loop-run-v0.json</code></div>
              <p>Passing these commands supports their controlled source, fixture, or artifact-verification scope. It does not verify live runtime behavior.</p>
            </div>
          </div>
        </div>
      </section>

      <section {...sceneProps(6)} id="reviewer-guide-scene-controls-receipts" className="reviewer-scene reviewer-scene--receipts" aria-labelledby="reviewer-guide-scene-controls-receipts-title">
        <div className="container reviewer-scene__inner">
          <header className="reviewer-scene__head">
            <p className="reviewer-guide__eyebrow">07 · Controls and receipts</p>
            <h2 id="reviewer-guide-scene-controls-receipts-title" tabIndex={-1}>The strongest receipts show what the system prevented.</h2>
          </header>
          <div className="reviewer-receipts__layout">
            <ol className="reviewer-receipts__controls">
              {controls.map(([title, description], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}
            </ol>
            <aside className="reviewer-receipts__snapshot" aria-label="Generated public-status snapshot">
              <p className="reviewer-receipts__freshness">{isGeneratedStatusStale() ? "Stale generated snapshot" : "Current generated snapshot"}</p>
              <h3>Source-backed reviewer indicators</h3>
              <p>{generatedStatusFreshnessLabel()}</p>
              <div className="reviewer-receipts__routes" aria-label="Control receipt routes">
                <a href="/governance-saves/"><strong>Governance Saves</strong><span>Documented controls that fired</span></a>
                <a href="/claim-firewall/"><strong>Claim Firewall</strong><span>Blocked wording demonstration</span></a>
                <a href="/proof/"><strong>Proof</strong><span>Records and evidence ceilings</span></a>
              </div>
              <div className="reviewer-receipts__metrics">
                {receiptMetrics.map((metric) => <a key={metric.label} href={metric.sourceHref}><strong>{metric.value}</strong><span>{metric.displayLabel}</span><small>{metric.source}</small></a>)}
              </div>
              <p className="reviewer-receipts__note">Changing indicators stay tied to their generated source routes. A stale snapshot remains visibly stale; its timestamp is never refreshed for appearance.</p>
            </aside>
          </div>
        </div>
      </section>

      <section {...sceneProps(7)} id="reviewer-guide-scene-closing" className="reviewer-scene reviewer-scene--closing" aria-labelledby="reviewer-guide-scene-closing-title">
        <div className="container reviewer-scene__inner">
          <div className="reviewer-closing__grid">
            <div className="reviewer-closing__copy">
              <p className="reviewer-guide__eyebrow">08 · Closing thesis</p>
              <h2 id="reviewer-guide-scene-closing-title" tabIndex={-1}>Move fast, but make every important claim earn its authority.</h2>
              <div className="reviewer-closing__thesis"><p><strong>AI</strong> creates leverage.</p><p><strong>Deterministic controls</strong> create consistency.</p><p><strong>Evidence</strong> creates credibility.</p><p><strong>Human review</strong> creates authority.</p></div>
              <div className="reviewer-hero__actions"><a className="reviewer-guide__cta reviewer-guide__cta--primary" href="/hoxline/">Open Hoxline</a><a className="reviewer-guide__cta" href="/proof/">Inspect Proof</a><a className="reviewer-guide__cta reviewer-guide__cta--quiet" href={externalLinks.githubOrg} target="_blank" rel="noopener noreferrer">Review GitHub organization ↗</a></div>
            </div>
            <aside className="reviewer-closing__route" aria-label="Seven-minute presentation route">
              <p>Seven-minute presentation route</p>
              <ol>{presentationTimes.map(([time, label]) => <li key={label}><span>{time}</span><strong>{label}</strong></li>)}</ol>
              <small>Useful for a podcast, brown bag, show-and-tell, technical review, hiring review, or self-guided inspection.</small>
            </aside>
          </div>
          <p className="reviewer-closing__boundary">This Reviewer Guide routes to source and receipts. It does not prove runtime activity, signal observation, production deployment, customer use, public-safe runtime evidence, disposition, case closure, or claim promotion.</p>
        </div>
      </section>

      {!presenting && (
        <nav className="reviewer-guide__scene-nav" aria-label="Reviewer Guide scenes">
          <div className="container"><ol>{scenes.map((scene, index) => <li key={scene.id}><a href={`#reviewer-guide-scene-${scene.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{scene.label}</a></li>)}</ol></div>
        </nav>
      )}
    </div>
  );
}
