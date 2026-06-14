# Hoxline Website Visual System v0

Status: DESIGN_HANDOFF / WEBSITE_RENDERING_ONLY / NO_PROOF_PROMOTION

Date: 2026-06-14

## Design Goals

- Make Hoxline visually obvious as the HawkinsOperations ProofOps product route.
- Bring `/hoxline/`, `/detections/`, and `/ai-security/` into one product family.
- Reduce report-like copy density by moving detail into cards, tabs, lifecycle strips, and an interactive loop diagram.
- Keep proof ceilings, authority surfaces, and blocked claim families visible.
- Preserve the rule that website rendering is not proof.

## Color Roles

- Dark command-center base: site background and panel depth.
- Controlled cyan/blue: navigation, inspection, active diagram state, and source/validation routing.
- Proof amber: proof ceiling and controlled-validation state.
- Blocked red/pink: blocked claim families and promotion gates.
- Emerald/green: safe or allowed wording only.
- Slate/neutral: non-claims, rendering boundaries, and reviewer notes.

## Component List

- `ProofOpsPageHero`: shared hero with reviewer status metrics and first-screen product identity.
- `ProofOpsLoopDiagram`: clickable and keyboard-selectable loop with active step detail.
- `ClaimBoundaryPanel`: authority model and rendering-not-proof summary.
- `ReviewerLensTabs`: density control for manager, engineer, and claim-boundary perspectives.
- `EvidenceCeilingCard`: compact proof ceiling and status card.
- `SignalBlockedBadge`: blocked status chip.
- `SafeClaimCard`: allowed wording panel.
- `BlockedClaimGrid`: blocked claim family grid.

## Page-By-Page Audit Notes

### Home

Home already has the strongest cockpit rhythm: proof spine, reviewer mode, six-door navigation, and artifact bridge. No home rewrite was required.

### Artifacts

Artifacts already has a strong evidence-bay layout, cards with ceilings, and reviewer routes. No rewrite was required.

### Hoxline

Before: the page read like a rendering report and made Hoxline feel smaller than the underlying proof packet.

After: the first viewport names Hoxline by HawkinsOperations, shows `CONTROLLED_TEST_VALIDATED`, `public_safe false`, and `human_review_required true`, and routes into the interactive ProofOps loop.

### Detections

Before: the page was a linear list of detection cards with limited visual rhythm.

After: it includes a compact lifecycle strip, a flagship HO-DET-001 controlled-validation feature, shared ceiling cards, and a blocked-claim grid.

### AI Security

Before: the route was accurate but dense and report-like.

After: it separates AI support, deterministic verifier, human authority, proof ceiling, and blocked claims with reusable components and the shared ProofOps loop.

## Diagram Design Spec

The diagram shows the canonical Hoxline loop:

AI-assisted security work -> Artifact Intake -> Evidence Graph -> Telemetry Contract Check -> Controlled Validation -> Runtime Candidate Ledger -> Signal Observation -> Human Review Gate -> ProofCard -> Claim Authority -> Safe Claim / Blocked Claim

Each step exposes:

- what happens
- what control applies
- what remains blocked

The diagram is implemented as buttons, supports keyboard focus, and uses an active detail panel. It makes these boundaries visible:

- AI is labor.
- Evidence is authority.
- Human review gates promotion.
- Controlled validation proves controlled validation only.
- Website rendering is not proof.

## Before / After Summary

- Before: Hoxline, Detections, and AI Security used correct boundary text but did not feel like one product family.
- After: all three routes use the same ProofOps cockpit components, colors, cards, and diagram language.
- Before: much of the copy was long-form report prose.
- After: primary information is split into lifecycle strips, cards, tabs, and route links.
- Before: Hoxline was a reviewer route.
- After: Hoxline is presented as the product route while still preserving rendering-only boundaries.

## What Remains Blocked

This visual system does not claim runtime-active status, runtime proven status, signal observed status, public-safe proof, production-ready status, SOCaaS-ready status, SOCaaS deployed status, customer deployed status, live Splunk fired status, Cribl routed live telemetry, Wazuh routed live telemetry, AWS-live status, autonomous SOC operation, AI approved disposition, analyst approved disposition, final human authorization, case closed status, public runtime proof, public signal proof, enterprise purchase intent, customer traction, revenue, legal availability, trademark clearance, LLC formation, or product-market fit.

## Screenshot And Figma Notes

VISUAL_SCREENSHOT_UNAVAILABLE: project-local Playwright is not installed and the in-app browser surface was unavailable during this run.

FIGMA_HANDOFF_UNAVAILABLE: no target Figma file or active local handoff was available. This design document is the repo-local handoff artifact.
