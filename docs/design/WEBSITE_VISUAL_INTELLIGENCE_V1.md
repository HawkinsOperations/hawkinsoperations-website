# HawkinsOperations Website Visual Intelligence v1

## Source Data

Implementation now uses the real Hoxline Capability Visual Data Pack v1 from merged Hoxline PR #13.

Source files:

- `C:\Raylee\Repo\HawkinsOperations\hoxline\examples\showcase\ho-det-001-capability-visual-data-pack-v1.json`
- `C:\Raylee\Repo\HawkinsOperations\hoxline\examples\showcase\ho-det-001-capability-visual-data-pack-v1.md`
- `C:\Raylee\Repo\HawkinsOperations\hoxline\schemas\capability-visual-data-pack-v1.schema.json`

Merged source commit verified locally:

`903da4e5cccc9eeb53a4c21b8639c7d472b7eb7d`

The previous temporary source references were removed. Website-local typed exports copy only bounded, chart-ready values from the Hoxline data pack because the website cannot import files outside this repo at runtime.

## Figma Direction

Figma file:

`https://www.figma.com/design/r8429Z8adp6AO9PauYMmcG`

Created directions:

1. Mission Control
2. Evidence Constellation
3. Gauntlet Engine

Selected implementation direction remains:

Mission Control + Gauntlet Engine. The homepage is an operator-facing command surface, while `/hoxline/` is the engine page showing capability data, stage distribution, generated outputs, authority separation, claim decisions, build timeline, and gated evidence.

Figma file status for this update: direction frames already exist. The website and this design doc now carry the real data-pack labels and source references.

## Visual Principles

- Show complexity as systems: orbit, console, stage chart, authority constellation, output wall, evidence timeline, and module rail.
- Foreground positive controlled capabilities before blocked states.
- Use cyan and blue for inspection/navigation, green for controlled capability, amber for proof ceilings and required gates, and red only for blocked claim states.
- Avoid text-only expansion. Each new content block should have a chart, diagram, stage map, console, or selectable state.
- Keep mobile interactions stacked and tappable.

## Components

Implemented under `components/visual-intelligence/`:

- `VisualIntelligenceHero`
- `LoopStatusOrbit`
- `StageStatusChart`
- `CapabilityMaturityGrid`
- `AuthorityConstellation`
- `GauntletExecutionConsole`
- `OutputArtifactWall`
- `EvidencePathTimeline`
- `ClaimDecisionMatrixVisual`
- `StillGatedPanel`
- `ComplexityStatsRail`
- `BoundedMetricsRail`
- `DataPackSourceStrip`
- `VisualModuleRail`

## Chart Plan

Data comes from the PR #13 `website_chart_data` object:

- `stage_status_distribution`
- `loop_stage_status_chart`
- `capability_maturity_chart`
- `authority_surface_chart`
- `generated_outputs_chart`
- `claim_decision_chart`
- `build_timeline`

Visual modules come from the PR #13 `visual_modules` list:

- `mission_control_hero`
- `proofops_loop_orbit`
- `gauntlet_execution_console`
- `capability_maturity_visual`
- `authority_constellation`
- `evidence_pipeline_timeline`
- `claim_decision_matrix`
- `generated_outputs_wall`
- `reviewer_path_timeline`
- `still_gated_panel`
- `complexity_stats_rail`

## Interaction Plan

Interactive controls:

- Stage selector in `LoopStatusOrbit`
- Authority selector in `AuthorityConstellation`
- Output selector in `OutputArtifactWall`
- Timeline selector in `EvidencePathTimeline`
- Claim decision toggle in `ClaimDecisionMatrixVisual`
- Capability filter in `CapabilityMaturityGrid`

## Mobile Plan

- Stack visual modules vertically.
- Keep tap targets visible and large enough for phone preview.
- Show what Hoxline can verify today before still-gated states.
- Use responsive grids with no horizontal overflow.
- Keep browser/header overlap out of the critical first viewport.

## Proof-Boundary Notes

- Website rendering is not proof.
- Hoxline is not proof authority.
- Controlled validation proves controlled validation only.
- `public_safe` remains false.
- `human_review_required` remains true.
- Runtime Candidate Ledger remains blocked.
- Signal Observation remains missing evidence.
- Stronger public wording requires separate evidence and review records.

## Non-Claims

This design and implementation do not claim runtime proof, signal proof, public-safe proof, production readiness, SOCaaS readiness or deployment, customer deployment, AI approval, analyst approval, final authorization, legal availability, revenue, product-market fit, or case closure.
