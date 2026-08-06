"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type Dispatch,
} from "react";
import {
  generatedStatusFreshnessLabel,
  metricDisplay,
} from "@data/generated/public-status.generated";
import { externalLinks } from "@data/navigation";
import {
  controlFamilies,
  presentationScenes,
  scenarios,
  type PresentationSceneId,
  type TopologyNodeId,
} from "../../src/data/reviewerGuide";
import {
  createReviewerGuideMachine,
  machineSnapshot,
  reviewerGuideReducer,
  scenarioSnapshotAt,
  type ReviewerGuideAction,
} from "../../src/lib/reviewerGuideMachine";
import AuthorityBoundary from "./AuthorityBoundary";
import ReviewerConsole from "./ReviewerConsole";
import ScenarioRunner from "./ScenarioRunner";
import SystemInspector from "./SystemInspector";
import SystemTopology from "./SystemTopology";
import TruthSurfaceExplorer from "./TruthSurfaceExplorer";

function isInteractiveTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(
    target.closest('a, button, input, select, textarea, [contenteditable="true"], [data-presentation-ignore-keys]'),
  );
}

function strictSceneIndex(value: string | null) {
  if (!value || !/^\d+$/.test(value)) return 0;
  const requested = Number(value);
  return Math.max(0, Math.min(presentationScenes.length - 1, requested - 1));
}

function SceneHeader({
  number,
  label,
  title,
  description,
  id,
}: {
  number: string;
  label: string;
  title: string;
  description: string;
  id: string;
}) {
  return (
    <header className="rg-scene-head">
      <p><span>{number}</span>{label}</p>
      <h2 id={id} tabIndex={-1}>{title}</h2>
      <div><i aria-hidden="true" /><p>{description}</p></div>
    </header>
  );
}

export default function PresentationShell() {
  const [machine, machineDispatch] = useReducer(reviewerGuideReducer, undefined, () => createReviewerGuideMachine());
  const snapshot = useMemo(() => machineSnapshot(machine), [machine]);
  const [presenting, setPresenting] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [freshness, setFreshness] = useState("Generated snapshot · freshness checking");
  const [activeControlId, setActiveControlId] = useState<(typeof controlFamilies)[number]["id"]>(controlFamilies[0].id);
  const sceneRefs = useRef<(HTMLElement | null)[]>([]);
  const enterButtonRef = useRef<HTMLButtonElement | null>(null);
  const historyOrigin = useRef<"page" | "direct">("direct");
  const controlsMetric = metricDisplay("controls_fired");
  const activeControl = controlFamilies.find((family) => family.id === activeControlId) ?? controlFamilies[0];
  const controlledScenario = scenarios.controlled_validation;
  const walkthroughIndex = machine.scenarioId === "controlled_validation" ? Math.max(1, machine.stepIndex) : 1;
  const walkthroughSnapshot = scenarioSnapshotAt("controlled_validation", walkthroughIndex, machine.selectedNodeId);
  const closingSnapshot = scenarioSnapshotAt("controlled_validation", controlledScenario.steps.length - 1);

  const writePresentationUrl = useCallback((sceneIndex: number, method: "push" | "replace", nodeId?: TopologyNodeId, scenarioId?: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("present", "1");
    url.searchParams.set("scene", String(sceneIndex + 1));
    if (nodeId) url.searchParams.set("node", nodeId);
    else url.searchParams.delete("node");
    if (scenarioId) url.searchParams.set("scenario", scenarioId);
    else url.searchParams.delete("scenario");
    const nextState = {
      ...window.history.state,
      __hawkinsPresentation: { origin: historyOrigin.current },
    };
    window.history[method === "push" ? "pushState" : "replaceState"](
      nextState,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }, []);

  const moveToScene = useCallback((index: number, updateUrl = true) => {
    const bounded = Math.max(0, Math.min(presentationScenes.length - 1, index));
    setActiveSceneIndex(bounded);
    if (presenting && updateUrl) writePresentationUrl(bounded, "replace", machine.selectedNodeId, machine.scenarioId);
  }, [machine.scenarioId, machine.selectedNodeId, presenting, writePresentationUrl]);

  const enterPresentation = useCallback(() => {
    historyOrigin.current = "page";
    setActiveSceneIndex(0);
    setPresenting(true);
    writePresentationUrl(0, "push", machine.selectedNodeId, machine.scenarioId);
  }, [machine.scenarioId, machine.selectedNodeId, writePresentationUrl]);

  const exitPresentation = useCallback(() => {
    const marker = window.history.state?.__hawkinsPresentation;
    setPresenting(false);
    setActiveSceneIndex(0);
    if (marker?.origin === "page") {
      window.history.back();
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.delete("present");
    url.searchParams.delete("scene");
    url.searchParams.delete("node");
    url.searchParams.delete("scenario");
    window.history.replaceState({ ...window.history.state, __hawkinsPresentation: undefined }, "", `${url.pathname}${url.search}${url.hash}`);
    window.requestAnimationFrame(() => enterButtonRef.current?.focus());
  }, []);

  const dispatch: Dispatch<ReviewerGuideAction> = useCallback((action) => {
    machineDispatch(action);
    if (!presenting) return;
    if (action.type === "SELECT_NODE") {
      writePresentationUrl(activeSceneIndex, "replace", action.nodeId, machine.scenarioId);
    } else if (action.type === "SELECT_SCENARIO") {
      writePresentationUrl(activeSceneIndex, "replace", scenarios[action.scenarioId].steps[0].activeNode, action.scenarioId);
    }
  }, [activeSceneIndex, machine.scenarioId, machine.selectedNodeId, presenting, writePresentationUrl]);

  useEffect(() => {
    setHydrated(true);
    setFreshness(generatedStatusFreshnessLabel());
    const syncFromUrl = () => {
      const url = new URL(window.location.href);
      const shouldPresent = url.searchParams.get("present") === "1";
      const sceneIndex = strictSceneIndex(url.searchParams.get("scene"));
      historyOrigin.current = window.history.state?.__hawkinsPresentation?.origin === "page" ? "page" : "direct";
      setPresenting(shouldPresent);
      setActiveSceneIndex(sceneIndex);

      const scenarioParam = url.searchParams.get("scenario");
      const validScenario = scenarioParam && Object.prototype.hasOwnProperty.call(scenarios, scenarioParam)
        ? scenarioParam as keyof typeof scenarios
        : undefined;
      if (validScenario) {
        machineDispatch({ type: "SELECT_SCENARIO", scenarioId: validScenario });
      }
      const nodeParam = url.searchParams.get("node");
      const validNode = nodeParam && ["ai-labor", "source", "validation", "hoxline", "claim-gate", "blocked", "proof", "human-review", "public-output"].includes(nodeParam)
        ? nodeParam as TopologyNodeId
        : undefined;
      if (validNode) {
        machineDispatch({ type: "SELECT_NODE", nodeId: validNode });
      }
      if (shouldPresent && (
        url.searchParams.get("scene") !== String(sceneIndex + 1)
        || Boolean(scenarioParam && !validScenario)
        || Boolean(nodeParam && !validNode)
      )) {
        writePresentationUrl(sceneIndex, "replace", validNode, validScenario);
      }
      if (!shouldPresent) window.requestAnimationFrame(() => enterButtonRef.current?.focus());
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [writePresentationUrl]);

  useEffect(() => {
    if (machine.runState !== "running") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(
      () => machineDispatch(reduceMotion
        ? { type: "JUMP", stepIndex: scenarios[machine.scenarioId].steps.length - 1 }
        : { type: "STEP" }),
      reduceMotion ? 0 : 780,
    );
    return () => window.clearTimeout(timer);
  }, [machine.runState, machine.scenarioId, machine.stepIndex]);

  useEffect(() => {
    if (!presenting) return;
    window.requestAnimationFrame(() => {
      document.getElementById(`rg-scene-${presentationScenes[activeSceneIndex].id}-title`)?.focus();
    });
  }, [activeSceneIndex, presenting]);

  useEffect(() => {
    if (presenting) document.body.dataset.presentationMode = "active";
    else delete document.body.dataset.presentationMode;
    sceneRefs.current.forEach((scene, index) => {
      if (scene) (scene as HTMLElement & { inert: boolean }).inert = presenting && index !== activeSceneIndex;
    });
    return () => {
      delete document.body.dataset.presentationMode;
      sceneRefs.current.forEach((scene) => {
        if (scene) (scene as HTMLElement & { inert: boolean }).inert = false;
      });
    };
  }, [activeSceneIndex, presenting]);

  useEffect(() => {
    if (!presenting) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key === "Escape") {
        event.preventDefault();
        exitPresentation();
        return;
      }
      if (isInteractiveTarget(event.target)) return;
      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        moveToScene(activeSceneIndex + 1);
      } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        moveToScene(activeSceneIndex - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        moveToScene(0);
      } else if (event.key === "End") {
        event.preventDefault();
        moveToScene(presentationScenes.length - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeSceneIndex, exitPresentation, moveToScene, presenting]);

  const sceneProps = (index: number, id: PresentationSceneId) => ({
    ref: (element: HTMLElement | null) => { sceneRefs.current[index] = element; },
    hidden: presenting && index !== activeSceneIndex,
    "aria-hidden": presenting && index !== activeSceneIndex ? true : undefined,
    "data-presentation-scene": id,
    "data-scene-active": presenting && index === activeSceneIndex ? "true" : undefined,
  });

  return (
    <div className={`rg-guide ${presenting ? "is-presenting" : ""}`} data-presentation-active={presenting ? "true" : "false"} data-hydrated={hydrated ? "true" : "false"}>
      {presenting ? (
        <nav className="rg-present" aria-label="Presentation controls">
          <button type="button" onClick={exitPresentation} aria-keyshortcuts="Escape">Exit</button>
          <div className="rg-present__progress" aria-label={`Scene ${activeSceneIndex + 1} of ${presentationScenes.length}`}>
            {presentationScenes.map((scene, index) => <button key={scene.id} type="button" aria-label={`Go to ${scene.label}`} aria-current={index === activeSceneIndex ? "step" : undefined} onClick={() => moveToScene(index)}><span>{index + 1}</span></button>)}
          </div>
          <span><b>{String(activeSceneIndex + 1).padStart(2, "0")} / {String(presentationScenes.length).padStart(2, "0")}</b> {presentationScenes[activeSceneIndex].label}</span>
          <button type="button" onClick={() => moveToScene(activeSceneIndex - 1)} disabled={activeSceneIndex === 0} aria-label="Previous scene">←</button>
          <button type="button" onClick={() => moveToScene(activeSceneIndex + 1)} disabled={activeSceneIndex === presentationScenes.length - 1} aria-label="Next scene">→</button>
        </nav>
      ) : null}

      <section {...sceneProps(0, "problem")} id="rg-scene-problem" className="rg-scene rg-hero" aria-labelledby="rg-scene-problem-title">
        <div className="rg-shell rg-hero__layout">
          <div className="rg-hero__copy">
            <p className="rg-kicker"><span>HawkinsOperations</span> / Reviewer Guide · System explorer</p>
            <h1 id="rg-scene-problem-title" tabIndex={-1}>AI can build security work faster than we can <em>prove it.</em></h1>
            <p className="rg-hero__lede">HawkinsOperations controls the promotion path between AI-assisted labor and operational truth—turning fast security work into bounded, inspectable reviewer artifacts.</p>
            <div className="rg-hero__actions">
              <a href="#rg-scene-system" className="rg-button rg-button--primary">Explore the system <span aria-hidden="true">↓</span></a>
              {hydrated ? <button ref={enterButtonRef} type="button" className="rg-button" onClick={enterPresentation}>Enter presentation mode</button> : null}
              <a href="/hoxline/" className="rg-text-link">Open Hoxline <span aria-hidden="true">↗</span></a>
            </div>
            <p className="rg-hero__audience">Built for podcasts, brown bags, show-and-tells, technical reviews, hiring reviews, and self-guided inspection.</p>
          </div>
          <aside className="rg-hero__preview" aria-label="Interactive system model preview">
            <div className="rg-hero__preview-head"><span>System preview</span><strong>{snapshot.step.label}</strong></div>
            <SystemTopology snapshot={snapshot} onSelectNode={(nodeId) => dispatch({ type: "SELECT_NODE", nodeId })} variant="mini" />
            <button type="button" className="rg-hero__scenario" onClick={() => { dispatch({ type: "SELECT_SCENARIO", scenarioId: "unsupported_runtime_claim" }); dispatch({ type: "RUN" }); }}><span>Run blocked-claim preview</span><strong>HO-DET-001 is runtime active. <i aria-hidden="true">→</i></strong></button>
          </aside>
          <div className="rg-hero__doctrine"><span>AI <b>= labor</b></span><span>Evidence <b>= boundary</b></span><span>Human <b>= authority</b></span></div>
        </div>
      </section>

      <section {...sceneProps(1, "system")} id="rg-scene-system" className="rg-scene rg-system" aria-labelledby="rg-scene-system-title">
        <div className="rg-shell">
          <SceneHeader number="01" label="The complete system" id="rg-scene-system-title" title="Run the governed path. Inspect every authority boundary." description="Select any node or launch a scenario. The topology, inspector, event trace, claim decision, and evidence ceiling all render from the same deterministic browser model." />
          <div className="rg-system__workbench" data-presentation-ignore-keys>
            <div className="rg-system__canvas"><SystemTopology snapshot={snapshot} onSelectNode={(nodeId) => dispatch({ type: "SELECT_NODE", nodeId })} showAuthorityMap /></div>
            <SystemInspector snapshot={snapshot} />
            <ScenarioRunner snapshot={snapshot} dispatch={dispatch} />
          </div>
          <p className="rg-model-boundary"><span aria-hidden="true">◇</span>Topology state shows a user-triggered guided scenario, not runtime activity or observed telemetry.</p>
        </div>
      </section>

      <section {...sceneProps(2, "ho-det-001")} id="rg-scene-ho-det-001" className="rg-scene rg-walkthrough" aria-labelledby="rg-scene-ho-det-001-title">
        <div className="rg-shell">
          <SceneHeader number="02" label="Concrete walkthrough" id="rg-scene-ho-det-001-title" title="Scrub through one bounded detection workflow." description="HO-DET-001 makes the architecture tangible: source exists, controlled fixtures exercise expected behavior and restraint, evidence is packaged, and human authority remains required." />
          <div className="rg-walkthrough__layout" data-presentation-ignore-keys>
            <div className="rg-walkthrough__main">
              <div className="rg-walkthrough__topology"><SystemTopology snapshot={walkthroughSnapshot} onSelectNode={(nodeId) => dispatch({ type: "SELECT_NODE", nodeId })} /></div>
              <div className="rg-walkthrough__fixture-branch" aria-label="Controlled fixture branch">
                <span>Detection source</span><i aria-hidden="true" />
                <div><strong>Positive fixtures</strong><small>Expected matches</small></div>
                <div><strong>Negative fixtures</strong><small>Known non-matches</small></div>
                <i aria-hidden="true" /><span>Deterministic result</span>
              </div>
              <div className="rg-walkthrough__scrubber">
                <div><span>HO-DET-001 walkthrough</span><strong>Step {walkthroughIndex} of {controlledScenario.steps.length - 1}</strong></div>
                <input
                  type="range"
                  min={1}
                  max={controlledScenario.steps.length - 1}
                  step={1}
                  value={walkthroughIndex}
                  aria-label="HO-DET-001 walkthrough step"
                  onChange={(event) => {
                    if (machine.scenarioId !== "controlled_validation") dispatch({ type: "SELECT_SCENARIO", scenarioId: "controlled_validation" });
                    dispatch({ type: "JUMP", stepIndex: Number(event.target.value) });
                  }}
                />
                <ol>
                  {controlledScenario.steps.slice(1).map((step, index) => (
                    <li key={`${step.state}-${step.label}`}><button type="button" aria-current={walkthroughIndex === index + 1 ? "step" : undefined} onClick={() => { if (machine.scenarioId !== "controlled_validation") dispatch({ type: "SELECT_SCENARIO", scenarioId: "controlled_validation" }); dispatch({ type: "JUMP", stepIndex: index + 1 }); }}><span>{index + 1}</span><strong>{step.label}</strong></button></li>
                  ))}
                </ol>
              </div>
            </div>
            <aside className="rg-walkthrough__artifact" aria-live="polite">
              <span>Current artifact</span><h3>{walkthroughSnapshot.step.artifact}</h3>
              <p>{walkthroughSnapshot.step.explanation}</p>
              <dl><div><dt>State</dt><dd>{walkthroughSnapshot.step.label}</dd></div><div><dt>Ceiling</dt><dd>{walkthroughSnapshot.step.ceiling}</dd></div><div><dt>Decision</dt><dd>{walkthroughSnapshot.step.claimDecision}</dd></div></dl>
              <div className="rg-walkthrough__routes"><a href={externalLinks.hoDet001Rule} target="_blank" rel="noopener noreferrer">Source ↗</a><a href={externalLinks.validationReportHo} target="_blank" rel="noopener noreferrer">Validation ↗</a><a href={externalLinks.proofRecord} target="_blank" rel="noopener noreferrer">Proof ↗</a><a href="/hoxline/">Hoxline</a><a href="/claim-firewall/">Claim Firewall</a></div>
              <p className="rg-walkthrough__limit">No live runtime, signal, deployment, customer, public-safe, or disposition state is inferred.</p>
            </aside>
          </div>
        </div>
      </section>

      <section {...sceneProps(3, "ai-authority")} id="rg-scene-ai-authority" className="rg-scene rg-authority-scene" aria-labelledby="rg-scene-ai-authority-title">
        <div className="rg-shell"><SceneHeader number="03" label="AI and authority" id="rg-scene-ai-authority-title" title="Test exactly where AI assistance stops." description="Choose an action. The boundary responds with a deterministic authority decision instead of vague “human in the loop” language." /><AuthorityBoundary /></div>
      </section>

      <section {...sceneProps(4, "truth-surfaces")} id="rg-scene-truth-surfaces" className="rg-scene rg-truth-scene" aria-labelledby="rg-scene-truth-surfaces-title">
        <div className="rg-shell"><SceneHeader number="04" label="Truth surfaces" id="rg-scene-truth-surfaces-title" title="Inspect the surfaces that must never be silently substituted." description="Source, validation, runtime, signal, proof, and public rendering answer different questions. Click a surface, then expose the invalid shortcuts." /><TruthSurfaceExplorer /></div>
      </section>

      <section {...sceneProps(5, "reviewer-verification")} id="rg-scene-reviewer-verification" className="rg-scene rg-console-scene" aria-labelledby="rg-scene-reviewer-verification-title">
        <div className="rg-shell"><SceneHeader number="05" label="Reviewer verification" id="rg-scene-reviewer-verification-title" title="View, clone, run, and verify from owning routes." description="Every route and command is real. The console names its owner, expected result, checked scope, and what the action does not prove." /><ReviewerConsole /></div>
      </section>

      <section {...sceneProps(6, "controls-receipts")} id="rg-scene-controls-receipts" className="rg-scene rg-controls" aria-labelledby="rg-scene-controls-receipts-title">
        <div className="rg-shell">
          <SceneHeader number="06" label="Controls and receipts" id="rg-scene-controls-receipts-title" title="See which controls prevented trust drift." description="The most useful receipt is often the path that never reached publication. Filter the control plane without mistaking a generated snapshot for live status." />
          <div className="rg-controls__visual">
            <div className="rg-controls__radar" aria-label="Control family visualization">
              <div className="rg-controls__core"><span>{controlsMetric.value}</span><strong>{controlsMetric.label}</strong><small>generated Website rendering input</small></div>
              {controlFamilies.map((family, index) => <button key={family.id} type="button" style={{ "--control-index": index } as React.CSSProperties} data-tone={family.tone} aria-pressed={activeControlId === family.id} onClick={() => setActiveControlId(family.id)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{family.label}</strong></button>)}
              <svg viewBox="0 0 600 440" aria-hidden="true" focusable="false"><path d="M 300 220 L 94 88 M 300 220 L 506 88 M 300 220 L 548 280 M 300 220 L 300 410 M 300 220 L 52 280" /></svg>
            </div>
            <aside className="rg-controls__inspector" aria-live="polite" data-tone={activeControl.tone}><span>Selected control family</span><h3>{activeControl.label}</h3><p>{activeControl.detail}</p><a href={activeControl.route} target={activeControl.route.startsWith("http") ? "_blank" : undefined} rel={activeControl.route.startsWith("http") ? "noopener noreferrer" : undefined}>{activeControl.routeLabel} <span aria-hidden="true">↗</span></a><dl><div><dt>Snapshot</dt><dd>{freshness}</dd></div><div><dt>Source</dt><dd>{controlsMetric.source}</dd></div><div><dt>Boundary</dt><dd>Rendering-only indicator; not runtime, signal, approval, or proof authority.</dd></div></dl></aside>
          </div>
        </div>
      </section>

      <section {...sceneProps(7, "closing")} id="rg-scene-closing" className="rg-scene rg-closing" aria-labelledby="rg-scene-closing-title">
        <div className="rg-shell rg-closing__layout">
          <div className="rg-closing__copy"><p className="rg-kicker"><span>Bounded output</span> / Human authority unresolved</p><h2 id="rg-scene-closing-title" tabIndex={-1}>The system stays impressive because its claims stay honest.</h2><div className="rg-closing__thesis"><span><b>AI</b> creates leverage.</span><span><b>Controls</b> create consistency.</span><span><b>Evidence</b> creates credibility.</span><span><b>Human review</b> creates authority.</span></div><div className="rg-closing__actions"><a href="/hoxline/">Open Hoxline</a><a href="/proof/">Inspect Proof</a><a href={externalLinks.githubOrg} target="_blank" rel="noopener noreferrer">Review GitHub ↗</a></div></div>
          <div className="rg-closing__system"><SystemTopology snapshot={closingSnapshot} variant="closing" interactive={false} label="Final bounded system state with human review still required" /><p><span>Controlled validation</span><span>Claim ceiling preserved</span><strong>Human review required</strong></p></div>
          <p className="rg-closing__boundary"><strong>Website rendering is not proof.</strong> This surface demonstrates the designed control model and routes reviewers to owning records. It does not establish runtime activity, signal observation, production or customer deployment, public-safe runtime proof, disposition, case closure, proof promotion, human approval, or merge authority.</p>
        </div>
      </section>
    </div>
  );
}
