import {
  scenarios,
  topologyEdges,
  type FlowState,
  type ScenarioId,
  type ScenarioStep,
  type TopologyEdgeId,
  type TopologyNodeId,
} from "../data/reviewerGuide";

export type MachineRunState = "idle" | "running" | "paused" | "complete";

export type ReviewerGuideMachine = {
  scenarioId: ScenarioId;
  stepIndex: number;
  runState: MachineRunState;
  selectedNodeId: TopologyNodeId;
};

export type ReviewerGuideAction =
  | { type: "SELECT_SCENARIO"; scenarioId: ScenarioId }
  | { type: "SELECT_NODE"; nodeId: TopologyNodeId }
  | { type: "RUN" }
  | { type: "PAUSE" }
  | { type: "STEP" }
  | { type: "RESET" }
  | { type: "JUMP"; stepIndex: number };

export type NodeStatus = "inactive" | "visited" | "active" | "blocked";
export type EdgeStatus = "inactive" | "visited" | "active" | "blocked";

export type MachineSnapshot = {
  scenarioId: ScenarioId;
  stepIndex: number;
  totalSteps: number;
  runState: MachineRunState;
  state: FlowState;
  step: ScenarioStep;
  selectedNodeId: TopologyNodeId;
  activeNodeId: TopologyNodeId;
  activeEdgeId?: TopologyEdgeId;
  nodeStatuses: Record<TopologyNodeId, NodeStatus>;
  edgeStatuses: Record<TopologyEdgeId, EdgeStatus>;
  events: string[];
  progress: number;
  publicOutputActive: boolean;
};

export function createReviewerGuideMachine(
  scenarioId: ScenarioId = "controlled_validation",
): ReviewerGuideMachine {
  const firstStep = scenarios[scenarioId].steps[0];
  return {
    scenarioId,
    stepIndex: 0,
    runState: "idle",
    selectedNodeId: firstStep.activeNode,
  };
}

function boundedStepIndex(scenarioId: ScenarioId, requested: number) {
  return Math.max(0, Math.min(scenarios[scenarioId].steps.length - 1, requested));
}

export function reviewerGuideReducer(
  state: ReviewerGuideMachine,
  action: ReviewerGuideAction,
): ReviewerGuideMachine {
  const scenario = scenarios[state.scenarioId];
  const lastIndex = scenario.steps.length - 1;

  switch (action.type) {
    case "SELECT_SCENARIO":
      return createReviewerGuideMachine(action.scenarioId);
    case "SELECT_NODE":
      return { ...state, selectedNodeId: action.nodeId };
    case "RUN":
      if (state.stepIndex >= lastIndex) {
        const reset = createReviewerGuideMachine(state.scenarioId);
        return { ...reset, runState: "running" };
      }
      return { ...state, runState: "running" };
    case "PAUSE":
      return state.runState === "running" ? { ...state, runState: "paused" } : state;
    case "STEP": {
      if (state.stepIndex >= lastIndex) return { ...state, runState: "complete" };
      const nextIndex = state.stepIndex + 1;
      const nextStep = scenario.steps[nextIndex];
      return {
        ...state,
        stepIndex: nextIndex,
        runState: nextIndex >= lastIndex ? "complete" : state.runState,
        selectedNodeId: nextStep.activeNode,
      };
    }
    case "RESET":
      return createReviewerGuideMachine(state.scenarioId);
    case "JUMP": {
      const nextIndex = boundedStepIndex(state.scenarioId, action.stepIndex);
      return {
        ...state,
        stepIndex: nextIndex,
        runState: nextIndex >= lastIndex ? "complete" : "paused",
        selectedNodeId: scenario.steps[nextIndex].activeNode,
      };
    }
    default:
      return state;
  }
}

export function machineSnapshot(machine: ReviewerGuideMachine): MachineSnapshot {
  const scenario = scenarios[machine.scenarioId];
  const step = scenario.steps[machine.stepIndex];
  const visited = new Set(step.visitedNodes);
  const isBlocked = step.state === "blocked";

  const nodeStatuses = Object.fromEntries(
    [
      "ai-labor",
      "source",
      "validation",
      "hoxline",
      "claim-gate",
      "blocked",
      "proof",
      "human-review",
      "public-output",
    ].map((nodeId) => {
      const typedId = nodeId as TopologyNodeId;
      let status: NodeStatus = visited.has(typedId) ? "visited" : "inactive";
      if (typedId === step.activeNode) status = isBlocked && typedId === "blocked" ? "blocked" : "active";
      return [typedId, status];
    }),
  ) as Record<TopologyNodeId, NodeStatus>;

  const edgeStatuses = Object.fromEntries(
    topologyEdges.map((edge) => {
      let status: EdgeStatus =
        visited.has(edge.from) && visited.has(edge.to) ? "visited" : "inactive";
      if (edge.id === step.activeEdge) {
        status = isBlocked && edge.kind === "blocked" ? "blocked" : "active";
      }
      if (isBlocked && edge.kind === "publish") status = "inactive";
      return [edge.id, status];
    }),
  ) as Record<TopologyEdgeId, EdgeStatus>;

  const events = scenario.steps
    .slice(0, machine.stepIndex + 1)
    .flatMap((scenarioStep) => scenarioStep.events);

  return {
    scenarioId: machine.scenarioId,
    stepIndex: machine.stepIndex,
    totalSteps: scenario.steps.length,
    runState: machine.runState,
    state: step.state,
    step,
    selectedNodeId: machine.selectedNodeId,
    activeNodeId: step.activeNode,
    activeEdgeId: step.activeEdge,
    nodeStatuses,
    edgeStatuses,
    events,
    progress: scenario.steps.length <= 1 ? 1 : machine.stepIndex / (scenario.steps.length - 1),
    publicOutputActive: visited.has("public-output") && !isBlocked,
  };
}

export function scenarioSnapshotAt(
  scenarioId: ScenarioId,
  stepIndex: number,
  selectedNodeId?: TopologyNodeId,
): MachineSnapshot {
  const scenario = scenarios[scenarioId];
  const bounded = boundedStepIndex(scenarioId, stepIndex);
  return machineSnapshot({
    scenarioId,
    stepIndex: bounded,
    runState: bounded === scenario.steps.length - 1 ? "complete" : "paused",
    selectedNodeId: selectedNodeId ?? scenario.steps[bounded].activeNode,
  });
}
