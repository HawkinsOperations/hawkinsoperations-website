export const GENERATED_PUBLIC_STATUS_V0_SNAPSHOT = {
  generated_at: "2026-06-17T01:45:18.000Z",
  generated_by: "GENERATED_PUBLIC_STATUS_V0_SNAPSHOT",
  generation_mode: "bounded_v0_snapshot_fixture",
  snapshot_label: "Generated public status v0 snapshot",
  freshness_window_days: 14,
  stale_evaluation: {
    supported: true,
    method: "Compare generated_at to freshness_window_days at render time.",
    stale_when_older_than_days: 14,
  },
  source_repos: [
    "HawkinsOperations/.github",
    "HawkinsOperations/hoxline",
    "HawkinsOperations/hawkinsoperations-detections",
    "HawkinsOperations/hawkinsoperations-validation",
    "HawkinsOperations/hawkinsoperations-platform",
    "HawkinsOperations/hawkinsoperations-proof",
    "HawkinsOperations/hawkinsoperations-website",
  ],
  source_paths: [
    "src/data/governanceSaves.ts",
    "src/data/systemShowcase.ts",
    "src/data/hoxlineVisualIntelligence.ts",
    "hawkinsoperations-validation/activity/detection-activity-ledger-v1.json",
    "hawkinsoperations-proof/proof/records/",
    "hawkinsoperations-platform README reviewer metrics pipeline",
    "hoxline/examples/gauntlet/ho-det-001-full-loop-run-v0.json",
  ],
  source_commit_refs: {
    "hawkinsoperations-website": "79e168a61634762b0aa405edf7953b24f5ab3eef",
    hoxline_capability_visual_pack: "903da4e5cccc9eeb53a4c21b8639c7d472b7eb7d",
  },
  snapshot_authority:
    "Bounded v0 website rendering snapshot. It routes readers to owning proof/platform/validation records and does not claim live authority.",
  source_ownership_message:
    "Website rendering reads this snapshot; proof, validation, platform, detections, Hoxline, and org routing records own their respective facts.",
  proof_ceiling: {
    raw: "CONTROLLED_TEST_VALIDATED",
    label: "Controlled test validated",
    detail: "Controlled validation is the public ceiling represented by this website snapshot.",
  },
  public_safe: {
    raw: "NOT_PUBLIC_SAFE",
    label: "Not public-safe",
    value: false,
    count: 0,
    detail: "Public-safe runtime proof is not promoted by this website snapshot.",
  },
  website_rendering_boundary: {
    raw: "RENDERING_ONLY",
    label: "Rendering only",
    statement: "Website rendering is not proof.",
  },
  no_proof_promotion_statement:
    "Generated public status is a snapshot/rendering input only. Proof, platform, validation, and source repositories remain authority.",
  owning_routes: {
    public_status_json: "/data/public-status.json",
    hoxline: "https://github.com/HawkinsOperations/hoxline",
    proof: "/proof/",
    validation: "/validation/",
    detections: "/detections/",
    platform_contracts: "/platform/contracts/",
    claim_firewall: "/claim-firewall/",
  },
  metrics: {
    controls_fired: {
      value: 72,
      display_value: "72",
      label: "controls fired",
      display_label: "Controls fired",
      detail: "public-facing Governance Saves records",
      source_label: "Governance Saves public subset",
      source_href: "/governance-saves/",
      tone: "cyan",
    },
    validation_fires: {
      value: 49,
      display_value: "49",
      label: "validation fires",
      display_label: "Validation fires",
      detail: "controlled validation activity fires",
      source_label: "Validation activity ledger",
      source_href: "/validation/",
      tone: "green",
    },
    validation_cases: {
      value: 106,
      display_value: "106",
      label: "validation cases",
      display_label: "Validation cases",
      detail: "controlled validation case count",
      source_label: "Validation activity ledger",
      source_href: "/validation/",
      tone: "green",
    },
    proof_records: {
      value: 8,
      display_value: "8",
      label: "proof records",
      display_label: "Proof records",
      detail: "proof-record activity metric",
      source_label: "Proof records",
      source_href: "/proof/",
      tone: "amber",
    },
    blocked_claims: {
      value: 31,
      display_value: "31",
      label: "claims blocked",
      display_label: "Claims blocked",
      detail: "reviewer metrics blocked-claim count",
      source_label: "Reviewer metrics pipeline",
      source_href: "/proof/",
      tone: "red",
    },
    governed_cases: {
      value: 6,
      display_value: "6",
      label: "governed cases",
      display_label: "Governed cases",
      detail: "strict governed case count",
      source_label: "Lifetime Case Ledger v1",
      source_href: "/proof/#lifetime-case-ledger",
      tone: "blue",
    },
    closed_case_count: {
      value: 0,
      display_value: "0",
      label: "closed cases",
      display_label: "Closed cases",
      detail: "closed case count remains zero",
      source_label: "Lifetime Case Ledger v1",
      source_href: "/proof/#lifetime-case-ledger",
      tone: "neutral",
    },
    public_safe_count: {
      value: 0,
      display_value: "0",
      label: "public-safe",
      display_label: "Public-safe",
      detail: "public-safe count remains zero",
      source_label: "Public-safe gate",
      source_href: "/proof/",
      tone: "neutral",
    },
  },
  raw_status_constants: {
    CONTROLLED_TEST_VALIDATED: "Controlled test validated",
    NOT_PUBLIC_SAFE: "Not public-safe",
    RENDERING_ONLY: "Rendering only",
    RUNTIME_BLOCKED: "Runtime blocked",
    RUNTIME_GATED: "Runtime gated",
    SIGNAL_MISSING_EVIDENCE: "Signal missing evidence",
    HUMAN_REVIEW_REQUIRED: "Human review required",
  },
  hoxline: {
    runner: { raw: "GAUNTLET_V0", label: "Gauntlet v0" },
    artifact: { raw: "HO-DET-001", label: "HO-DET-001" },
    proof_ceiling: { raw: "CONTROLLED_TEST_VALIDATED", label: "Controlled test validated" },
    runtime: { raw: "RUNTIME_BLOCKED", label: "Runtime blocked" },
    signal: { raw: "SIGNAL_MISSING_EVIDENCE", label: "Signal missing evidence" },
    human_review: { raw: "HUMAN_REVIEW_REQUIRED", label: "Human review required" },
    public_safe: { raw: "NOT_PUBLIC_SAFE", label: "Not public-safe" },
  },
  reviewer_actions: {
    inspect_online: [
      {
        label: "Open generated public status JSON",
        href: "/data/public-status.json",
        detail: "Website-rendered snapshot data and source-owner routes.",
      },
      {
        label: "Open Hoxline repo",
        href: "https://github.com/HawkinsOperations/hoxline",
        detail: "Product/control route for the HO-DET-001 Gauntlet path.",
      },
      {
        label: "Open proof records",
        href: "/proof/",
        detail: "Proof authority route for records, proof packs, and ceilings.",
      },
      {
        label: "Open validation registry",
        href: "/validation/",
        detail: "Controlled validation status and fixture scope.",
      },
    ],
    download_json: {
      label: "Download/open public status JSON",
      href: "/data/public-status.json",
      detail: "Generated website input; not proof authority.",
    },
    clone_repo: {
      label: "Clone Hoxline",
      working_directory: "hoxline repo root",
      command: "git clone https://github.com/HawkinsOperations/hoxline.git",
    },
    run_commands: [
      {
        label: "Hoxline tests",
        repo: "HawkinsOperations/hoxline",
        working_directory: "hoxline repo root",
        command: "python -B -m pytest -q tests",
        source_basis: "Hoxline reviewer path requested for clone-run inspection.",
      },
      {
        label: "Hoxline Gauntlet output verifier",
        repo: "HawkinsOperations/hoxline",
        working_directory: "hoxline repo root",
        command:
          "python -B -m hoxline gauntlet verify --input examples/gauntlet/ho-det-001-full-loop-run-v0.json --schema schemas/gauntlet-full-loop-run-v0.schema.json",
        source_basis: "Capability visual data pack verifier command path.",
      },
      {
        label: "Website site contract",
        repo: "HawkinsOperations/hawkinsoperations-website",
        working_directory: "hawkinsoperations-website repo root",
        command: "npm run check:site",
        source_basis: "Website generated-status and public-surface contract verifier.",
      },
      {
        label: "Website static build",
        repo: "HawkinsOperations/hawkinsoperations-website",
        working_directory: "hawkinsoperations-website repo root",
        command: "npm run build",
        source_basis: "Website static export and route-generation check.",
      },
    ],
  },
} as const;

export type PublicStatusMetricKey = keyof typeof GENERATED_PUBLIC_STATUS_V0_SNAPSHOT.metrics;

export const publicStatus = GENERATED_PUBLIC_STATUS_V0_SNAPSHOT;

export function metricDisplay(key: PublicStatusMetricKey) {
  const metric = publicStatus.metrics[key];
  return {
    label: metric.label,
    value: metric.display_value,
    detail: metric.detail,
    source: metric.source_label,
    sourceHref: metric.source_href,
    tone: metric.tone,
  };
}

export function generatedStatusAgeDays(now = new Date()) {
  const generatedAt = new Date(publicStatus.generated_at).getTime();
  return Math.floor((now.getTime() - generatedAt) / 86_400_000);
}

export function isGeneratedStatusStale(now = new Date()) {
  return generatedStatusAgeDays(now) > publicStatus.freshness_window_days;
}

export function generatedStatusFreshnessLabel(now = new Date()) {
  return isGeneratedStatusStale(now)
    ? `Snapshot older than ${publicStatus.freshness_window_days} days`
    : `Snapshot under ${publicStatus.freshness_window_days}-day freshness window`;
}
