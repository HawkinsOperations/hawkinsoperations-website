export const GENERATED_PUBLIC_STATUS_V0 = {
  "schema_version": "public-status-v0",
  "generated_at": "2026-06-29T04:40:22.395Z",
  "generated_by": "scripts/generate-public-status.mjs",
  "generator_commit": "834c3d266a423c1202591ccf87b92b56b1502d09",
  "generation_mode": "generated_public_status_data_plane_v0",
  "snapshot_label": "Generated public status v0 data plane",
  "freshness_window_days": 14,
  "freshness": {
    "status": "fresh",
    "max_age_hours": 336,
    "age_hours": 0,
    "evaluated_at": "2026-06-29T04:40:22.395Z"
  },
  "stale_evaluation": {
    "supported": true,
    "method": "Compare generated_at to freshness.max_age_hours at render time; stale data remains visible.",
    "stale_when_older_than_days": 14
  },
  "sources": [
    {
      "repo": "HawkinsOperations/.github",
      "authority": "source truth",
      "path": "architecture/REPO_AUTHORITY_MAP.md",
      "commit": "872ae1241f6712e8314e4b133c2381df7bb6e390",
      "available": true,
      "method": "presence and git commit only; no metric derived in v0",
      "notes": "Source repository is locally available for generation."
    },
    {
      "repo": "HawkinsOperations/hoxline",
      "authority": "Hoxline/product truth",
      "path": "examples/gauntlet/ho-det-001-full-loop-run-v0.json",
      "commit": "bed34b8704f476075d65ec50095bb37121cb635b",
      "available": true,
      "method": "presence and git commit only; path contains product artifact, no metric derived in v0",
      "notes": "Source repository is locally available for generation."
    },
    {
      "repo": "HawkinsOperations/hawkinsoperations-detections",
      "authority": "source truth",
      "path": "detections/DETECTION_PROMOTION_MATRIX.yml",
      "commit": "9be6760a134b2f56d46133f550329260cb35643e",
      "available": true,
      "method": "presence and git commit only; no metric derived in v0",
      "notes": "Source repository is locally available for generation."
    },
    {
      "repo": "HawkinsOperations/hawkinsoperations-validation",
      "authority": "validation truth",
      "path": "activity/detection-activity-ledger-v1.json",
      "commit": "ea5ee1c8bcdfcd0caab689cb7cbcb3113df655ae",
      "available": true,
      "method": "read-only corroborating source; not used to inflate reviewer-safe public metrics in v0",
      "notes": "Source repository is locally available for generation."
    },
    {
      "repo": "HawkinsOperations/hawkinsoperations-platform",
      "authority": "platform/ledger truth",
      "path": "contracts/reviewer-metrics-pipeline-v1-state.json",
      "commit": "58ed6fc6122264d99ecf993c0f537e15ea75d78e",
      "available": true,
      "method": "read bounded reviewer metrics state when available",
      "notes": "Source repository is locally available for generation."
    },
    {
      "repo": "HawkinsOperations/hawkinsoperations-proof",
      "authority": "proof/claim-authority truth",
      "path": "proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "commit": "70c679276b42dfc154d53bf4ce9f129aa0638c78",
      "available": true,
      "method": "read proof-owned reviewer-safe summary metrics",
      "notes": "Source repository is locally available for generation."
    },
    {
      "repo": "HawkinsOperations/hawkinsoperations-website",
      "authority": "website rendering only",
      "path": "src/data/governanceSaves.ts",
      "commit": "834c3d266a423c1202591ccf87b92b56b1502d09",
      "available": true,
      "method": "count source-controlled public governance-save entries excluding PRIVATE_ONLY",
      "notes": "Source repository is locally available for generation."
    }
  ],
  "source_repos": [
    "HawkinsOperations/.github",
    "HawkinsOperations/hoxline",
    "HawkinsOperations/hawkinsoperations-detections",
    "HawkinsOperations/hawkinsoperations-validation",
    "HawkinsOperations/hawkinsoperations-platform",
    "HawkinsOperations/hawkinsoperations-proof",
    "HawkinsOperations/hawkinsoperations-website"
  ],
  "source_paths": [
    ".github/architecture/REPO_AUTHORITY_MAP.md",
    "hoxline/examples/gauntlet/ho-det-001-full-loop-run-v0.json",
    "hawkinsoperations-detections/detections/DETECTION_PROMOTION_MATRIX.yml",
    "hawkinsoperations-validation/activity/detection-activity-ledger-v1.json",
    "hawkinsoperations-platform/contracts/reviewer-metrics-pipeline-v1-state.json",
    "hawkinsoperations-proof/proof/records/reviewer-metrics-pipeline-v1-summary.json",
    "hawkinsoperations-website/src/data/governanceSaves.ts"
  ],
  "source_commit_refs": {
    ".github": "872ae1241f6712e8314e4b133c2381df7bb6e390",
    "hoxline": "bed34b8704f476075d65ec50095bb37121cb635b",
    "hawkinsoperations-detections": "9be6760a134b2f56d46133f550329260cb35643e",
    "hawkinsoperations-validation": "ea5ee1c8bcdfcd0caab689cb7cbcb3113df655ae",
    "hawkinsoperations-platform": "58ed6fc6122264d99ecf993c0f537e15ea75d78e",
    "hawkinsoperations-proof": "70c679276b42dfc154d53bf4ce9f129aa0638c78",
    "hawkinsoperations-website": "834c3d266a423c1202591ccf87b92b56b1502d09"
  },
  "metric_list": [
    {
      "id": "controls_fired",
      "label": "controls fired",
      "value": 72,
      "unit": "count",
      "authority": "website rendering only",
      "source_repo": "HawkinsOperations/hawkinsoperations-website",
      "source_path": "src/data/governanceSaves.ts",
      "source_commit": "834c3d266a423c1202591ccf87b92b56b1502d09",
      "method": "count governance save records excluding publicSafety PRIVATE_ONLY",
      "generated_at": "2026-06-29T04:40:22.395Z",
      "freshness_status": "fresh",
      "proof_ceiling": "Website rendering/reporting only. Does not prove runtime, signal, production, public-safe proof, customer deployment, final approval, merge readiness, or website-as-proof.",
      "claim_status": "bounded_generated_count",
      "not_claiming": [
        "runtime proof",
        "signal proof",
        "production readiness",
        "customer deployment",
        "public-safe runtime proof",
        "AI approval",
        "analyst approval",
        "website-as-proof"
      ],
      "display_value": "72",
      "display_label": "Controls Fired",
      "detail": "fresh from src/data/governanceSaves.ts @ 834c3d2",
      "source_label": "hawkinsoperations-website 834c3d2",
      "source_href": "https://github.com/HawkinsOperations/hawkinsoperations-website/blob/834c3d266a423c1202591ccf87b92b56b1502d09/src/data/governanceSaves.ts",
      "tone": "cyan"
    },
    {
      "id": "validation_fires",
      "label": "validation fires",
      "value": 49,
      "unit": "count",
      "authority": "proof/claim-authority truth",
      "source_repo": "HawkinsOperations/hawkinsoperations-proof",
      "source_path": "proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "source_commit": "70c679276b42dfc154d53bf4ce9f129aa0638c78",
      "method": "read proof-owned reviewer metrics summary controlled_validation_fire_count",
      "generated_at": "2026-06-29T04:40:22.395Z",
      "freshness_status": "fresh",
      "proof_ceiling": "Website rendering/reporting only. Does not prove runtime, signal, production, public-safe proof, customer deployment, final approval, merge readiness, or website-as-proof.",
      "claim_status": "bounded_generated_count",
      "not_claiming": [
        "runtime proof",
        "signal proof",
        "production readiness",
        "customer deployment",
        "public-safe runtime proof",
        "AI approval",
        "analyst approval",
        "website-as-proof"
      ],
      "display_value": "49",
      "display_label": "Validation Fires",
      "detail": "fresh from proof/records/reviewer-metrics-pipeline-v1-summary.json @ 70c6792",
      "source_label": "hawkinsoperations-proof 70c6792",
      "source_href": "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/70c679276b42dfc154d53bf4ce9f129aa0638c78/proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "tone": "green"
    },
    {
      "id": "validation_cases",
      "label": "validation cases",
      "value": 106,
      "unit": "count",
      "authority": "proof/claim-authority truth",
      "source_repo": "HawkinsOperations/hawkinsoperations-proof",
      "source_path": "proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "source_commit": "70c679276b42dfc154d53bf4ce9f129aa0638c78",
      "method": "read proof-owned reviewer metrics summary validation_case_count",
      "generated_at": "2026-06-29T04:40:22.395Z",
      "freshness_status": "fresh",
      "proof_ceiling": "Website rendering/reporting only. Does not prove runtime, signal, production, public-safe proof, customer deployment, final approval, merge readiness, or website-as-proof.",
      "claim_status": "bounded_generated_count",
      "not_claiming": [
        "runtime proof",
        "signal proof",
        "production readiness",
        "customer deployment",
        "public-safe runtime proof",
        "AI approval",
        "analyst approval",
        "website-as-proof"
      ],
      "display_value": "106",
      "display_label": "Validation Cases",
      "detail": "fresh from proof/records/reviewer-metrics-pipeline-v1-summary.json @ 70c6792",
      "source_label": "hawkinsoperations-proof 70c6792",
      "source_href": "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/70c679276b42dfc154d53bf4ce9f129aa0638c78/proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "tone": "green"
    },
    {
      "id": "proof_records",
      "label": "proof records",
      "value": 8,
      "unit": "count",
      "authority": "proof/claim-authority truth",
      "source_repo": "HawkinsOperations/hawkinsoperations-proof",
      "source_path": "proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "source_commit": "70c679276b42dfc154d53bf4ce9f129aa0638c78",
      "method": "read proof-owned reviewer metrics summary proof_record_count",
      "generated_at": "2026-06-29T04:40:22.395Z",
      "freshness_status": "fresh",
      "proof_ceiling": "Website rendering/reporting only. Does not prove runtime, signal, production, public-safe proof, customer deployment, final approval, merge readiness, or website-as-proof.",
      "claim_status": "bounded_generated_count",
      "not_claiming": [
        "runtime proof",
        "signal proof",
        "production readiness",
        "customer deployment",
        "public-safe runtime proof",
        "AI approval",
        "analyst approval",
        "website-as-proof"
      ],
      "display_value": "8",
      "display_label": "Proof Records",
      "detail": "fresh from proof/records/reviewer-metrics-pipeline-v1-summary.json @ 70c6792",
      "source_label": "hawkinsoperations-proof 70c6792",
      "source_href": "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/70c679276b42dfc154d53bf4ce9f129aa0638c78/proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "tone": "amber"
    },
    {
      "id": "blocked_claims",
      "label": "claims blocked",
      "value": 31,
      "unit": "count",
      "authority": "proof/claim-authority truth",
      "source_repo": "HawkinsOperations/hawkinsoperations-proof",
      "source_path": "proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "source_commit": "70c679276b42dfc154d53bf4ce9f129aa0638c78",
      "method": "read proof-owned reviewer metrics summary blocked_claim_count",
      "generated_at": "2026-06-29T04:40:22.395Z",
      "freshness_status": "fresh",
      "proof_ceiling": "Website rendering/reporting only. Does not prove runtime, signal, production, public-safe proof, customer deployment, final approval, merge readiness, or website-as-proof.",
      "claim_status": "bounded_generated_count",
      "not_claiming": [
        "runtime proof",
        "signal proof",
        "production readiness",
        "customer deployment",
        "public-safe runtime proof",
        "AI approval",
        "analyst approval",
        "website-as-proof"
      ],
      "display_value": "31",
      "display_label": "Claims Blocked",
      "detail": "fresh from proof/records/reviewer-metrics-pipeline-v1-summary.json @ 70c6792",
      "source_label": "hawkinsoperations-proof 70c6792",
      "source_href": "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/70c679276b42dfc154d53bf4ce9f129aa0638c78/proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "tone": "red"
    },
    {
      "id": "governed_cases",
      "label": "governed cases",
      "value": 4,
      "unit": "count",
      "authority": "proof/claim-authority truth",
      "source_repo": "HawkinsOperations/hawkinsoperations-proof",
      "source_path": "proof/records/lifetime-case-ledger-v1-public-summary.json",
      "source_commit": "70c679276b42dfc154d53bf4ce9f129aa0638c78",
      "method": "read proof-owned lifetime case ledger public summary total_cases",
      "generated_at": "2026-06-29T04:40:22.395Z",
      "freshness_status": "fresh",
      "proof_ceiling": "Website rendering/reporting only. Does not prove runtime, signal, production, public-safe proof, customer deployment, final approval, merge readiness, or website-as-proof.",
      "claim_status": "bounded_generated_count",
      "not_claiming": [
        "runtime proof",
        "signal proof",
        "production readiness",
        "customer deployment",
        "public-safe runtime proof",
        "AI approval",
        "analyst approval",
        "website-as-proof"
      ],
      "display_value": "4",
      "display_label": "Governed Cases",
      "detail": "fresh from proof/records/lifetime-case-ledger-v1-public-summary.json @ 70c6792",
      "source_label": "hawkinsoperations-proof 70c6792",
      "source_href": "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/70c679276b42dfc154d53bf4ce9f129aa0638c78/proof/records/lifetime-case-ledger-v1-public-summary.json",
      "tone": "blue"
    },
    {
      "id": "closed_case_count",
      "label": "closed cases",
      "value": 0,
      "unit": "count",
      "authority": "proof/claim-authority truth",
      "source_repo": "HawkinsOperations/hawkinsoperations-proof",
      "source_path": "proof/records/lifetime-case-ledger-v1-public-summary.json",
      "source_commit": "70c679276b42dfc154d53bf4ce9f129aa0638c78",
      "method": "read proof-owned lifetime case ledger public summary closed_case_count",
      "generated_at": "2026-06-29T04:40:22.395Z",
      "freshness_status": "fresh",
      "proof_ceiling": "Website rendering/reporting only. Does not prove runtime, signal, production, public-safe proof, customer deployment, final approval, merge readiness, or website-as-proof.",
      "claim_status": "bounded_generated_count",
      "not_claiming": [
        "runtime proof",
        "signal proof",
        "production readiness",
        "customer deployment",
        "public-safe runtime proof",
        "AI approval",
        "analyst approval",
        "website-as-proof"
      ],
      "display_value": "0",
      "display_label": "Closed Cases",
      "detail": "fresh from proof/records/lifetime-case-ledger-v1-public-summary.json @ 70c6792",
      "source_label": "hawkinsoperations-proof 70c6792",
      "source_href": "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/70c679276b42dfc154d53bf4ce9f129aa0638c78/proof/records/lifetime-case-ledger-v1-public-summary.json",
      "tone": "neutral"
    },
    {
      "id": "public_safe_count",
      "label": "public-safe",
      "value": 0,
      "unit": "count",
      "authority": "proof/claim-authority truth",
      "source_repo": "HawkinsOperations/hawkinsoperations-proof",
      "source_path": "proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "source_commit": "70c679276b42dfc154d53bf4ce9f129aa0638c78",
      "method": "read proof-owned reviewer metrics public_safe_count; keep zero unless proof-owned approval exists",
      "generated_at": "2026-06-29T04:40:22.395Z",
      "freshness_status": "fresh",
      "proof_ceiling": "Website rendering/reporting only. Does not prove runtime, signal, production, public-safe proof, customer deployment, final approval, merge readiness, or website-as-proof.",
      "claim_status": "blocked_not_public_safe",
      "not_claiming": [
        "runtime proof",
        "signal proof",
        "production readiness",
        "customer deployment",
        "public-safe runtime proof",
        "AI approval",
        "analyst approval",
        "website-as-proof"
      ],
      "blocked_reason": "Public-safe proof is not present in approved public artifacts.",
      "display_value": "0",
      "display_label": "Public-Safe",
      "detail": "fresh from proof/records/reviewer-metrics-pipeline-v1-summary.json @ 70c6792",
      "source_label": "hawkinsoperations-proof 70c6792",
      "source_href": "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/70c679276b42dfc154d53bf4ce9f129aa0638c78/proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "tone": "neutral"
    }
  ],
  "metrics": {
    "controls_fired": {
      "id": "controls_fired",
      "label": "controls fired",
      "value": 72,
      "unit": "count",
      "authority": "website rendering only",
      "source_repo": "HawkinsOperations/hawkinsoperations-website",
      "source_path": "src/data/governanceSaves.ts",
      "source_commit": "834c3d266a423c1202591ccf87b92b56b1502d09",
      "method": "count governance save records excluding publicSafety PRIVATE_ONLY",
      "generated_at": "2026-06-29T04:40:22.395Z",
      "freshness_status": "fresh",
      "proof_ceiling": "Website rendering/reporting only. Does not prove runtime, signal, production, public-safe proof, customer deployment, final approval, merge readiness, or website-as-proof.",
      "claim_status": "bounded_generated_count",
      "not_claiming": [
        "runtime proof",
        "signal proof",
        "production readiness",
        "customer deployment",
        "public-safe runtime proof",
        "AI approval",
        "analyst approval",
        "website-as-proof"
      ],
      "display_value": "72",
      "display_label": "Controls Fired",
      "detail": "fresh from src/data/governanceSaves.ts @ 834c3d2",
      "source_label": "hawkinsoperations-website 834c3d2",
      "source_href": "https://github.com/HawkinsOperations/hawkinsoperations-website/blob/834c3d266a423c1202591ccf87b92b56b1502d09/src/data/governanceSaves.ts",
      "tone": "cyan"
    },
    "validation_fires": {
      "id": "validation_fires",
      "label": "validation fires",
      "value": 49,
      "unit": "count",
      "authority": "proof/claim-authority truth",
      "source_repo": "HawkinsOperations/hawkinsoperations-proof",
      "source_path": "proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "source_commit": "70c679276b42dfc154d53bf4ce9f129aa0638c78",
      "method": "read proof-owned reviewer metrics summary controlled_validation_fire_count",
      "generated_at": "2026-06-29T04:40:22.395Z",
      "freshness_status": "fresh",
      "proof_ceiling": "Website rendering/reporting only. Does not prove runtime, signal, production, public-safe proof, customer deployment, final approval, merge readiness, or website-as-proof.",
      "claim_status": "bounded_generated_count",
      "not_claiming": [
        "runtime proof",
        "signal proof",
        "production readiness",
        "customer deployment",
        "public-safe runtime proof",
        "AI approval",
        "analyst approval",
        "website-as-proof"
      ],
      "display_value": "49",
      "display_label": "Validation Fires",
      "detail": "fresh from proof/records/reviewer-metrics-pipeline-v1-summary.json @ 70c6792",
      "source_label": "hawkinsoperations-proof 70c6792",
      "source_href": "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/70c679276b42dfc154d53bf4ce9f129aa0638c78/proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "tone": "green"
    },
    "validation_cases": {
      "id": "validation_cases",
      "label": "validation cases",
      "value": 106,
      "unit": "count",
      "authority": "proof/claim-authority truth",
      "source_repo": "HawkinsOperations/hawkinsoperations-proof",
      "source_path": "proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "source_commit": "70c679276b42dfc154d53bf4ce9f129aa0638c78",
      "method": "read proof-owned reviewer metrics summary validation_case_count",
      "generated_at": "2026-06-29T04:40:22.395Z",
      "freshness_status": "fresh",
      "proof_ceiling": "Website rendering/reporting only. Does not prove runtime, signal, production, public-safe proof, customer deployment, final approval, merge readiness, or website-as-proof.",
      "claim_status": "bounded_generated_count",
      "not_claiming": [
        "runtime proof",
        "signal proof",
        "production readiness",
        "customer deployment",
        "public-safe runtime proof",
        "AI approval",
        "analyst approval",
        "website-as-proof"
      ],
      "display_value": "106",
      "display_label": "Validation Cases",
      "detail": "fresh from proof/records/reviewer-metrics-pipeline-v1-summary.json @ 70c6792",
      "source_label": "hawkinsoperations-proof 70c6792",
      "source_href": "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/70c679276b42dfc154d53bf4ce9f129aa0638c78/proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "tone": "green"
    },
    "proof_records": {
      "id": "proof_records",
      "label": "proof records",
      "value": 8,
      "unit": "count",
      "authority": "proof/claim-authority truth",
      "source_repo": "HawkinsOperations/hawkinsoperations-proof",
      "source_path": "proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "source_commit": "70c679276b42dfc154d53bf4ce9f129aa0638c78",
      "method": "read proof-owned reviewer metrics summary proof_record_count",
      "generated_at": "2026-06-29T04:40:22.395Z",
      "freshness_status": "fresh",
      "proof_ceiling": "Website rendering/reporting only. Does not prove runtime, signal, production, public-safe proof, customer deployment, final approval, merge readiness, or website-as-proof.",
      "claim_status": "bounded_generated_count",
      "not_claiming": [
        "runtime proof",
        "signal proof",
        "production readiness",
        "customer deployment",
        "public-safe runtime proof",
        "AI approval",
        "analyst approval",
        "website-as-proof"
      ],
      "display_value": "8",
      "display_label": "Proof Records",
      "detail": "fresh from proof/records/reviewer-metrics-pipeline-v1-summary.json @ 70c6792",
      "source_label": "hawkinsoperations-proof 70c6792",
      "source_href": "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/70c679276b42dfc154d53bf4ce9f129aa0638c78/proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "tone": "amber"
    },
    "blocked_claims": {
      "id": "blocked_claims",
      "label": "claims blocked",
      "value": 31,
      "unit": "count",
      "authority": "proof/claim-authority truth",
      "source_repo": "HawkinsOperations/hawkinsoperations-proof",
      "source_path": "proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "source_commit": "70c679276b42dfc154d53bf4ce9f129aa0638c78",
      "method": "read proof-owned reviewer metrics summary blocked_claim_count",
      "generated_at": "2026-06-29T04:40:22.395Z",
      "freshness_status": "fresh",
      "proof_ceiling": "Website rendering/reporting only. Does not prove runtime, signal, production, public-safe proof, customer deployment, final approval, merge readiness, or website-as-proof.",
      "claim_status": "bounded_generated_count",
      "not_claiming": [
        "runtime proof",
        "signal proof",
        "production readiness",
        "customer deployment",
        "public-safe runtime proof",
        "AI approval",
        "analyst approval",
        "website-as-proof"
      ],
      "display_value": "31",
      "display_label": "Claims Blocked",
      "detail": "fresh from proof/records/reviewer-metrics-pipeline-v1-summary.json @ 70c6792",
      "source_label": "hawkinsoperations-proof 70c6792",
      "source_href": "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/70c679276b42dfc154d53bf4ce9f129aa0638c78/proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "tone": "red"
    },
    "governed_cases": {
      "id": "governed_cases",
      "label": "governed cases",
      "value": 4,
      "unit": "count",
      "authority": "proof/claim-authority truth",
      "source_repo": "HawkinsOperations/hawkinsoperations-proof",
      "source_path": "proof/records/lifetime-case-ledger-v1-public-summary.json",
      "source_commit": "70c679276b42dfc154d53bf4ce9f129aa0638c78",
      "method": "read proof-owned lifetime case ledger public summary total_cases",
      "generated_at": "2026-06-29T04:40:22.395Z",
      "freshness_status": "fresh",
      "proof_ceiling": "Website rendering/reporting only. Does not prove runtime, signal, production, public-safe proof, customer deployment, final approval, merge readiness, or website-as-proof.",
      "claim_status": "bounded_generated_count",
      "not_claiming": [
        "runtime proof",
        "signal proof",
        "production readiness",
        "customer deployment",
        "public-safe runtime proof",
        "AI approval",
        "analyst approval",
        "website-as-proof"
      ],
      "display_value": "4",
      "display_label": "Governed Cases",
      "detail": "fresh from proof/records/lifetime-case-ledger-v1-public-summary.json @ 70c6792",
      "source_label": "hawkinsoperations-proof 70c6792",
      "source_href": "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/70c679276b42dfc154d53bf4ce9f129aa0638c78/proof/records/lifetime-case-ledger-v1-public-summary.json",
      "tone": "blue"
    },
    "closed_case_count": {
      "id": "closed_case_count",
      "label": "closed cases",
      "value": 0,
      "unit": "count",
      "authority": "proof/claim-authority truth",
      "source_repo": "HawkinsOperations/hawkinsoperations-proof",
      "source_path": "proof/records/lifetime-case-ledger-v1-public-summary.json",
      "source_commit": "70c679276b42dfc154d53bf4ce9f129aa0638c78",
      "method": "read proof-owned lifetime case ledger public summary closed_case_count",
      "generated_at": "2026-06-29T04:40:22.395Z",
      "freshness_status": "fresh",
      "proof_ceiling": "Website rendering/reporting only. Does not prove runtime, signal, production, public-safe proof, customer deployment, final approval, merge readiness, or website-as-proof.",
      "claim_status": "bounded_generated_count",
      "not_claiming": [
        "runtime proof",
        "signal proof",
        "production readiness",
        "customer deployment",
        "public-safe runtime proof",
        "AI approval",
        "analyst approval",
        "website-as-proof"
      ],
      "display_value": "0",
      "display_label": "Closed Cases",
      "detail": "fresh from proof/records/lifetime-case-ledger-v1-public-summary.json @ 70c6792",
      "source_label": "hawkinsoperations-proof 70c6792",
      "source_href": "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/70c679276b42dfc154d53bf4ce9f129aa0638c78/proof/records/lifetime-case-ledger-v1-public-summary.json",
      "tone": "neutral"
    },
    "public_safe_count": {
      "id": "public_safe_count",
      "label": "public-safe",
      "value": 0,
      "unit": "count",
      "authority": "proof/claim-authority truth",
      "source_repo": "HawkinsOperations/hawkinsoperations-proof",
      "source_path": "proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "source_commit": "70c679276b42dfc154d53bf4ce9f129aa0638c78",
      "method": "read proof-owned reviewer metrics public_safe_count; keep zero unless proof-owned approval exists",
      "generated_at": "2026-06-29T04:40:22.395Z",
      "freshness_status": "fresh",
      "proof_ceiling": "Website rendering/reporting only. Does not prove runtime, signal, production, public-safe proof, customer deployment, final approval, merge readiness, or website-as-proof.",
      "claim_status": "blocked_not_public_safe",
      "not_claiming": [
        "runtime proof",
        "signal proof",
        "production readiness",
        "customer deployment",
        "public-safe runtime proof",
        "AI approval",
        "analyst approval",
        "website-as-proof"
      ],
      "blocked_reason": "Public-safe proof is not present in approved public artifacts.",
      "display_value": "0",
      "display_label": "Public-Safe",
      "detail": "fresh from proof/records/reviewer-metrics-pipeline-v1-summary.json @ 70c6792",
      "source_label": "hawkinsoperations-proof 70c6792",
      "source_href": "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/70c679276b42dfc154d53bf4ce9f129aa0638c78/proof/records/reviewer-metrics-pipeline-v1-summary.json",
      "tone": "neutral"
    }
  },
  "known_gaps": [
    {
      "id": "runtime_signal_metrics_gated",
      "status": "blocked",
      "detail": "Runtime and signal metrics remain gated because no approved public-safe runtime evidence is published in source artifacts."
    },
    {
      "id": "hoxline_local_path_artifacts_not_published",
      "status": "unverified",
      "detail": "Hoxline local case-growth artifacts can contain absolute local paths and are not copied into website public JSON."
    },
    {
      "id": "validation_ledger_counts_not_used_to_inflate_public_snapshot",
      "status": "static_example",
      "detail": "Validation ledger currently reports 136 cases, but v0 renders proof-owned reviewer-safe counts until claim authority updates public proof records."
    }
  ],
  "proof_ceiling": {
    "raw": "WEBSITE_RENDERING_ONLY_PUBLIC_STATUS_V0",
    "label": "Website rendering only",
    "detail": "Website rendering/reporting only. Does not prove runtime, signal, production, public-safe proof, customer deployment, final approval, merge readiness, or website-as-proof."
  },
  "snapshot_authority": "Generated website rendering data. It routes readers to owning proof/platform/validation records and does not claim live authority.",
  "source_ownership_message": "Website rendering reads generated public status; proof, validation, platform, detections, Hoxline, and org routing records own their respective facts.",
  "public_safe": {
    "raw": "NOT_PUBLIC_SAFE",
    "label": "Not public-safe",
    "value": false,
    "count": 0,
    "detail": "Public-safe runtime proof is not promoted by this website data plane."
  },
  "website_rendering_boundary": {
    "raw": "RENDERING_ONLY",
    "label": "Rendering only",
    "statement": "Website rendering is not proof."
  },
  "no_proof_promotion_statement": "Generated public status is a snapshot/rendering input only. Proof, platform, validation, and source repositories remain authority.",
  "owning_routes": {
    "public_status_json": "/data/public-status.json",
    "hoxline": "https://github.com/HawkinsOperations/hoxline",
    "proof": "/proof/",
    "validation": "/validation/",
    "detections": "/detections/",
    "platform_contracts": "/platform/contracts/",
    "claim_firewall": "/claim-firewall/"
  },
  "raw_status_constants": {
    "FRESH": "Fresh",
    "STALE": "Stale",
    "SOURCE_UNAVAILABLE": "Source unavailable",
    "UNVERIFIED": "Unverified",
    "NOT_PUBLIC_SAFE": "Not public-safe",
    "RENDERING_ONLY": "Rendering only",
    "RUNTIME_BLOCKED": "Runtime blocked",
    "RUNTIME_GATED": "Runtime gated",
    "SIGNAL_MISSING_EVIDENCE": "Signal missing evidence",
    "HUMAN_REVIEW_REQUIRED": "Human review required"
  },
  "hoxline": {
    "runner": {
      "raw": "GAUNTLET_V0",
      "label": "Gauntlet v0"
    },
    "artifact": {
      "raw": "HO-DET-001",
      "label": "HO-DET-001"
    },
    "proof_ceiling": {
      "raw": "WEBSITE_RENDERING_ONLY_PUBLIC_STATUS_V0",
      "label": "Website rendering only"
    },
    "runtime": {
      "raw": "RUNTIME_BLOCKED",
      "label": "Runtime blocked"
    },
    "signal": {
      "raw": "SIGNAL_MISSING_EVIDENCE",
      "label": "Signal missing evidence"
    },
    "human_review": {
      "raw": "HUMAN_REVIEW_REQUIRED",
      "label": "Human review required"
    },
    "public_safe": {
      "raw": "NOT_PUBLIC_SAFE",
      "label": "Not public-safe"
    }
  },
  "reviewer_actions": {
    "inspect_online": [
      {
        "label": "Open generated public status JSON",
        "href": "/data/public-status.json",
        "detail": "Website-rendered generated data and source-owner routes."
      },
      {
        "label": "Open Hoxline repo",
        "href": "https://github.com/HawkinsOperations/hoxline",
        "detail": "Product/control route for the HO-DET-001 Gauntlet path."
      },
      {
        "label": "Open proof records",
        "href": "/proof/",
        "detail": "Proof authority route for records, proof packs, and ceilings."
      },
      {
        "label": "Open validation registry",
        "href": "/validation/",
        "detail": "Controlled validation status and fixture scope."
      }
    ],
    "download_json": {
      "label": "Download/open public status JSON",
      "href": "/data/public-status.json",
      "detail": "Generated website input; not proof authority."
    },
    "clone_repo": {
      "label": "Clone Hoxline",
      "working_directory": "hoxline repo root",
      "command": "git clone https://github.com/HawkinsOperations/hoxline.git"
    },
    "run_commands": [
      {
        "label": "Regenerate public status",
        "repo": "HawkinsOperations/hawkinsoperations-website",
        "working_directory": "hawkinsoperations-website repo root",
        "command": "npm run public-status:generate",
        "source_basis": "Website public status data plane generator."
      },
      {
        "label": "Verify public status",
        "repo": "HawkinsOperations/hawkinsoperations-website",
        "working_directory": "hawkinsoperations-website repo root",
        "command": "npm run public-status:verify",
        "source_basis": "Website public status data plane fail-closed verifier."
      },
      {
        "label": "Website site contract",
        "repo": "HawkinsOperations/hawkinsoperations-website",
        "working_directory": "hawkinsoperations-website repo root",
        "command": "npm run check:site",
        "source_basis": "Website generated-status and public-surface contract verifier."
      },
      {
        "label": "Website typecheck",
        "repo": "HawkinsOperations/hawkinsoperations-website",
        "working_directory": "hawkinsoperations-website repo root",
        "command": "npm run typecheck",
        "source_basis": "Website TypeScript verifier."
      },
      {
        "label": "Website visual QA",
        "repo": "HawkinsOperations/hawkinsoperations-website",
        "working_directory": "hawkinsoperations-website repo root",
        "command": "npm run test:visual",
        "source_basis": "Chromium viewport homepage visual QA."
      }
    ]
  }
} as const;

export const GENERATED_PUBLIC_STATUS_V0_SNAPSHOT = GENERATED_PUBLIC_STATUS_V0;

export type PublicStatusMetricKey = keyof typeof GENERATED_PUBLIC_STATUS_V0.metrics;

export const publicStatus = GENERATED_PUBLIC_STATUS_V0;

export function metricDisplay(key: PublicStatusMetricKey) {
  const metric = publicStatus.metrics[key];
  return {
    label: metric.label,
    value: metric.display_value,
    detail: metric.detail,
    source: metric.source_label,
    sourceHref: metric.source_href,
    tone: metric.tone,
    freshness: metric.freshness_status,
    sourceCommit: metric.source_commit ? metric.source_commit.slice(0, 7) : "unverified",
  };
}

export function generatedStatusAgeHours(now = new Date()) {
  const generatedAt = new Date(publicStatus.generated_at).getTime();
  return Math.floor((now.getTime() - generatedAt) / 3_600_000);
}

export function generatedStatusAgeDays(now = new Date()) {
  return Math.floor(generatedStatusAgeHours(now) / 24);
}

export function isGeneratedStatusStale(now = new Date()) {
  return generatedStatusAgeHours(now) > publicStatus.freshness.max_age_hours;
}

export function generatedStatusFreshnessLabel(now = new Date()) {
  if (isGeneratedStatusStale(now)) {
    return `Stale: older than ${publicStatus.freshness.max_age_hours} hours`;
  }
  return `${publicStatus.freshness.status}: under ${publicStatus.freshness.max_age_hours}-hour freshness window`;
}
