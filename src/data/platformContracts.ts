/**
 * Platform Contract Blueprints — extracted Phase 2 payload.
 *
 * Each blueprint is a three-lane structure: schema, example/packet, and
 * verifier/gate. Every blueprint carries a blocked-authority footer that
 * states what it cannot do. These are bounded structure/boundary packets;
 * website rendering is not proof.
 *
 * Scanner note: blocked tokens in `blockedAuthority` are paired on-line
 * with "blocked" or "not claimed".
 */

export type ContractLane = {
  kind: "Schema" | "Example" | "Verifier";
  label: string;
  path: string;
};

export type ContractField = { label: string; value: string };

export type PlatformContract = {
  id: string;
  name: string;
  type: string;
  supports: string;
  lanes: ContractLane[];
  /** optional fixed status fields rendered as a mono key/value strip */
  fields?: ContractField[];
  caveat?: string;
  shortCopy?: string;
  blockedAuthority: string[];
};

export const platformContracts: PlatformContract[] = [
  {
    id: "soar-case-packet-v0",
    name: "SOAR Case Packet v0",
    type: "Deterministic analyst-support case packet",
    supports:
      "Analyst-support structure: sanitized refs, checklist, response gates, blocked actions, and an AI support summary.",
    lanes: [
      { kind: "Schema", label: "Packet schema", path: "contracts/schemas/soar-case-packet-v0.schema.json" },
      { kind: "Example", label: "Sample packet", path: "contracts/examples/soar-case-packet-v0.sample.json" },
      { kind: "Verifier", label: "Packet verifier", path: "scripts/verify-soar-case-packet-v0.py" },
    ],
    shortCopy: "SOAR packet models analyst support, not response authority.",
    blockedAuthority: [
      "Live Torq / SOAR is not claimed.",
      "Production SOC and response automation are blocked.",
      "Containment, closure, and suppression execution are blocked.",
      "Autonomous SOC and AI / analyst disposition are blocked.",
    ],
  },
  {
    id: "autosoc-case-ledger-v0",
    name: "AutoSOC Case Ledger v0",
    type: "Append-only seed ledger",
    supports:
      "An append-only seed ledger that demonstrates constraints — every case is human-review required.",
    lanes: [
      { kind: "Example", label: "Seed ledger", path: "evidence/autosoc-case-ledger-v0.sqlite" },
      { kind: "Schema", label: "Schema logic", path: "scripts/ho_factory.py" },
    ],
    fields: [
      { label: "Total cases", value: "1" },
      { label: "Human review required", value: "1" },
      { label: "Public-safe state", value: "0" },
      { label: "Proof", value: "BLOCKED" },
      { label: "Deterministic close", value: "BLOCKED" },
    ],
    shortCopy: "Append-only seed ledger demonstrates constraints, not live SOC operation.",
    blockedAuthority: [
      "Live runtime ledger is not claimed.",
      "Proof promotion is blocked.",
      "Case closure is blocked.",
    ],
  },
  {
    id: "detection-factory-controller-v0",
    name: "Detection Factory Controller v0",
    type: "Bounded reviewer status / plan emitter",
    supports:
      "Emits bounded reviewer status and plan packets for HO-DET-001, HO-DET-011, HO-DET-012, and ID-DET-001..004.",
    lanes: [
      { kind: "Schema", label: "Controller doc", path: "docs/factory/DETECTION_FACTORY_CONTROLLER_V0.md" },
      { kind: "Schema", label: "Controller schema", path: "contracts/schemas/detection-factory-controller-v0.schema.json" },
      { kind: "Verifier", label: "Controller script", path: "scripts/ho_factory.py" },
    ],
    caveat: "HO-DET-011 reports STATE_DRIFT_REVIEW_REQUIRED.",
    shortCopy: "The controller emits bounded status and plan packets. It reports state; it does not promote proof or publish evidence.",
    blockedAuthority: [
      "Website updates and proof promotion are blocked.",
      "Evidence publishing and PR creation are blocked.",
      "Merge and generated-output writing are blocked.",
    ],
  },
  {
    id: "local-gpu-triage-gate",
    name: "Local GPU Triage Gate",
    type: "Bounded manual gate receipt",
    supports: "A bounded manual gate receipt exists for local GPU triage support.",
    lanes: [
      { kind: "Schema", label: "Pipeline doc", path: "docs/factory/LOCAL_GPU_TRIAGE_PIPELINE_V0.md" },
      { kind: "Example", label: "Support schema / sample", path: "local-gpu-triage-support-v0 schema / sample" },
      { kind: "Verifier", label: "Triage verifier", path: "scripts/verify_local_gpu_triage.py" },
    ],
    fields: [
      { label: "Gate status", value: "GITHUB_ACTIONS_RUN_PASSED" },
      { label: "Metadata", value: "PRIVATE_OPERATIONAL" },
    ],
    shortCopy: "Local GPU support is private support-only infrastructure. The public website may describe the contract boundary, not public runtime proof.",
    blockedAuthority: [
      "Model execution in CI is not claimed.",
      "Prompt execution in CI and artifact upload are blocked.",
      "Public proof, production, autonomous, and AI-approved claims are blocked.",
    ],
  },
  {
    id: "offline-llm-triage-support-contract",
    name: "Offline LLM Triage Support Contract",
    type: "Support-only labor contract",
    supports:
      "AI may summarize sanitized facts, identify missing context, draft questions, and map fields to the checklist.",
    lanes: [
      { kind: "Schema", label: "Support contract", path: "docs/autosoc/OFFLINE_LLM_TRIAGE_SUPPORT_CONTRACT.md" },
    ],
    shortCopy: "Offline LLM is support-only labor; human review remains authority.",
    blockedAuthority: [
      "Disposition decision and approval are blocked.",
      "Proof promotion and case closure are blocked.",
      "Public-safe marking and production claim are blocked.",
    ],
  },
  {
    id: "local-llm-runtime-receipt",
    name: "Local LLM Runtime Receipt",
    type: "Private support-only receipt packet",
    supports:
      "A private support-only local LLM runtime receipt exists as a structure / boundary packet.",
    lanes: [
      { kind: "Schema", label: "Receipt schema", path: "contracts/schemas/local-llm-runtime-receipt.schema.json" },
      { kind: "Example", label: "Valid sample", path: "contracts/examples/local-llm-runtime-receipt.valid.sample.json" },
      { kind: "Verifier", label: "Private evidence index", path: "validation-side private-runtime-evidence-index.json" },
    ],
    shortCopy: "A private boundary packet — never a public runtime claim.",
    blockedAuthority: [
      "Public-safe state is not claimed.",
      "Runtime-active public proof and signal-observed status are blocked.",
      "AI-approved disposition is blocked.",
    ],
  },
  {
    id: "ho-det-001-runtime-contract",
    name: "HO-DET-001 Runtime Contract",
    type: "Non-promotional platform guardrail",
    supports:
      "Platform runtime contract enforcement exists as a non-promotional guardrail.",
    lanes: [
      { kind: "Schema", label: "Contract schema / sample", path: "ho-det-001-runtime-contract schema / sample" },
      { kind: "Verifier", label: "Contract verifier", path: "scripts/verify-ho-det-001-runtime-contract.py" },
    ],
    fields: [
      { label: "PROMOTION_STATUS", value: "BLOCKED" },
      { label: "RUNTIME_ACTIVE", value: "false" },
      { label: "SIGNAL_OBSERVED", value: "false" },
      { label: "AI_DECIDED_DISPOSITION", value: "false" },
    ],
    shortCopy: "A guardrail that holds promotion blocked — it does not raise the ceiling.",
    blockedAuthority: [
      "Promotion beyond CONTROLLED_TEST_VALIDATED is blocked.",
      "Runtime-active and signal-observed status are not claimed.",
    ],
  },
  {
    id: "ho-det-011-case-packet",
    name: "HO-DET-011 Case Packet",
    type: "Case-packet guardrail",
    supports: "A case-packet guardrail exists for HO-DET-011.",
    lanes: [
      { kind: "Schema", label: "Packet schema / sample", path: "ho-det-011-case-packet schema / sample" },
      { kind: "Verifier", label: "Packet verifier", path: "scripts/verify-ho-det-011-case-packet.py" },
    ],
    fields: [
      { label: "Packet shape", value: "6-case (pinned)" },
      { label: "Validation / proof state", value: "17 fixtures" },
      { label: "Drift", value: "STATE_DRIFT_REVIEW_REQUIRED" },
    ],
    caveat:
      "Pinned to an older 6-case shape while validation / proof state records 17 fixtures. The drift surfaces as STATE_DRIFT_REVIEW_REQUIRED and is not silently normalized.",
    shortCopy: "The packet shows the drift instead of hiding it.",
    blockedAuthority: [
      "Promotion is blocked while drift review is required.",
      "Public-safe runtime proof is not claimed.",
    ],
  },
];
