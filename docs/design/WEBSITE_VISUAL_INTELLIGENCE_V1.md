# HawkinsOperations Website Visual Intelligence v1

## Source Data

Preferred showcase data pack was not present locally at implementation time:

`C:\Raylee\Repo\HawkinsOperations\aevumguard\examples\showcase\ho-det-001-capability-visual-data-pack-v1.json`

Implementation uses the local Gauntlet v0 fallback:

- `C:\Raylee\Repo\HawkinsOperations\aevumguard\examples\gauntlet\ho-det-001-full-loop-run-v0.json`
- `C:\Raylee\Repo\HawkinsOperations\aevumguard\examples\gauntlet\ho-det-001-full-loop-run-v0.md`
- `C:\Raylee\Repo\HawkinsOperations\aevumguard\schemas\gauntlet-full-loop-run-v0.schema.json`
- Local source commit recorded during ingest: `9c6b591af20a6ecb7fb38aa192a2253f20acd9ed`

## Figma Direction

Figma file:

`https://www.figma.com/design/r8429Z8adp6AO9PauYMmcG`

Created directions:

1. Mission Control
2. Evidence Constellation
3. Gauntlet Engine

Selected implementation direction:

Mission Control + Gauntlet Engine. The homepage becomes an operator-facing command surface, while `/hoxline/` becomes the engine page that shows loop execution, generated outputs, authority separation, claim decisions, and gated evidence.

## Visual Principles

- Show complexity as systems: orbit, console, stage chart, authority constellation, output wall, and evidence timeline.
- Keep positive controlled capability visible before blocked states.
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

## Chart Plan

- Stage status distribution: bar chart from actual Gauntlet stage counts.
- Loop orbit: canonical stages as selectable nodes.
- Authority constellation: seven surfaces around Hoxline as the control route.
- Capability grid: filterable capability states.
- Output wall: selectable generated artifacts with external links.
- Timeline: evidence path from source artifact to reviewer handoff.
- Claim matrix: toggle allowed, blocked, and required evidence groups.

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
- Avoid all-red warning walls by placing controlled capability and stage data first.
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
