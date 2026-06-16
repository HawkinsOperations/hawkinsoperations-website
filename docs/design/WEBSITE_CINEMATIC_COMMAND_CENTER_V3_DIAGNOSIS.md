# HawkinsOperations Cinematic Command Center v3 Diagnosis

## Current HawkinsOperations strengths

- PR #67 moved the site beyond static doctrine by wiring Hoxline visual intelligence to the real Capability Visual Data Pack v1 from Hoxline PR #13.
- `/hoxline/` now has actual product data: loop stage status, capability maturity, authority surfaces, output artifacts, claim decisions, and still-gated states.
- `/proof/`, `/artifacts/`, `/detections/`, and `/ai-security/` preserve strong truth boundaries and keep website rendering below proof authority.
- Governance Saves already contains a high-value public data set: 72 public-facing controls fired across the GS-001 through GS-080 range.

## Where the current site feels too careful

- The homepage still reads as a sequence of website sections instead of a command-center scene.
- Governance Saves is valuable but text-heavy; the first impression does not yet feel like a control activity dashboard.
- Claim Firewall explains the concept but does not let a reviewer experience the intercept path interactively.
- Proof and artifacts still over-rely on cards and repeated does-not-prove copy rather than feeling like an evidence bay or receipt wall.
- Detections and AI Security are bounded and readable, but the visual model is not yet as aggressive as the underlying system.

## HawkinsOps V1 inspiration to adapt

- V1’s strongest visual energy came from pipeline movement, inventory density, MITRE/security coverage framing, case-funnel numbers, benchmarks, and verification terminal language.
- V1 historical values can appear only as archive context: `324,074` total cases, `211` historical artifacts/rules inventory, `~88%` historical auto-close, `8/8` historical host coverage, and `0` historical reconciliation mismatches.
- V2 should adapt the energy, not the claims: pipeline diagrams become proof gates, detection inventory becomes source/validation/proof lifecycle cockpit, case funnel becomes governed-control counters, and verification terminal becomes a bounded reviewer terminal.

## Page-by-page scene plan

- `/`: Mission Control. Lead with HawkinsOperations as a working proof-governed AI security system, Hoxline as the engine, Governance Saves as controls fired, and proof/artifact routes as inspection terminals.
- `/hoxline/`: Hoxline Engine Room. Preserve PR #67 data-pack wiring, but frame it with a deeper engine visual and source-to-claim system map.
- `/governance-saves/` and `/proof/governance-saves/`: Governance Saves Control Dashboard. Make 72 controls fired the emotional lead, with category chart, filters, search, explorer, spotlight, timeline, and risk/control/outcome panels.
- `/claim-firewall/`: Claim Firewall Intercept Chamber. Add an interactive claim simulator with example bad claims, pipeline stepper, evidence gaps, safer wording, and output decision.
- `/proof/`: Evidence Bay / Proof Terminal. Show proof authority as a receipt environment with compact claim ceiling visuals and verification terminal treatment.
- `/artifacts/`: Receipt Wall. Add filterable artifact wall and relationship map from artifact to source, validation, proof, and website rendering.
- `/detections/`: Detection Inventory Cockpit. Use ATT&CK/cyber-kill-chain data as navigation, not runtime proof, and show lifecycle from source truth to rendering.
- `/ai-security/`: Governed AI Workflow. Show where AI helps, where verifiers stop it, and where human review controls public wording.
- `/about/`: Founder System Story. Sharpen V1 to V2 evolution, split architecture rationale, and Raylee as builder/operator/founder without overclaiming current deployment.

## Component plan

- Command center: `MissionControlHero`, `ProofSpineMetricsRail`, `V1ToV2EvolutionStrip`, `VerifyTerminalDrawer`.
- Governance: `GovernanceCommandDashboard`, `GovernanceCategoryChart`, `GovernanceSaveRecordExplorer`.
- Claim Firewall: `ClaimFirewallSimulator`, `ClaimPipelineStepper`, `SaferWordingPanel`.
- Detections: `DetectionInventoryCockpit`.
- Evidence: `EvidenceBay` wrapper scene.
- Reuse PR #67 visual intelligence components rather than replacing `src/data/hoxlineVisualIntelligence.ts`.

## Figma status

- Figma metadata access is available for the existing Visual Intelligence v1 file: `https://www.figma.com/design/r8429Z8adp6AO9PauYMmcG`.
- Current accessible page: `Visual Intelligence v1 Directions`.
- Direct `use_figma` canvas-write tooling is not exposed in this session, so authored Cinematic Command Center v3 frames could not be created directly.
- Status label for this pass: `FIGMA_LIMITED_METADATA_ONLY`.
- The implemented routes and this diagnosis document are the current handoff artifacts for the cinematic direction.

## Interaction plan

- Governance category filter, search, table/grid toggle, outcome selector, and spotlight selection.
- Claim Firewall bad-claim selector and pipeline stepper.
- Hoxline loop stage selector and authority constellation selector remain from PR #67.
- Artifact wall filter, detection family filter, verification terminal drawer, and V1/V2 comparison toggle.

## Claim-boundary risk plan

- Boundaries move into gates, locks, clamps, status chips, proof-ceiling indicators, and still-gated rails.
- Blocked claim terms can appear only in negative, gated, required-evidence, or visual-label context.
- V1 numbers are labeled historical/archive context and never promoted as current HawkinsOperations proof.
- Website rendering remains explicitly below proof authority.
- Hoxline remains a control plane, not proof authority.
- `public_safe` and `human_review_required` remain visible where applicable without dominating the first impression.
