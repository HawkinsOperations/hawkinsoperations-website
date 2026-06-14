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

After v0 expansion: the page now reads as the flagship product route for Hoxline by HawkinsOperations. The first viewport names Hoxline as ProofOps control for the AI security era, states that AI is not authority and evidence is, shows `CONTROLLED_TEST_VALIDATED`, `public_safe false`, and `human_review_required true`, and gives reviewer route / controlled demo entry points before any doctrine-style boundary copy.

New Hoxline flagship sections:

- The Claim Problem: AI can draft convincing security claims faster than organizations can safely prove them.
- Product Thesis: AI is not authority; evidence is.
- What Hoxline Controls: AI output intake, evidence graphing, validation state, proof ceiling, claim decision, and reviewer handoff.
- The Hoxline Answer: generated output, evidence, validation, proof records, public rendering, and claim authority remain separate.
- Interactive ProofOps Loop: the canonical eleven-step loop stays interactive, with active detail near the controls.
- HO-DET-001 Controlled Demo Spotlight: one artifact, one loop, one ProofCard context, one safe claim, and blocked stronger claims.
- Claim Boundary Matrix: allowed, blocked, and required-review wording states.
- Authority Architecture: seven-surface authority map for Hoxline, detections, validation, platform, proof, website, and organization routing.
- Reviewer Start Path: controlled demo package, proof ceiling / blocked claims, then authority references.
- Trust Boundary: compact non-claim panel.
- Next Gate: evidence required before stronger claims.

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

## Interaction Model Update

- ProofOps loop: connected staged control diagram on desktop, single-column stepper on mobile, neutral default steps, active step emphasis, visible focus, and the microcopy "Tap a step to inspect the control."
- Reviewer lenses: tabbed views for Executive, Detection engineer, Reviewer, and Claim authority perspectives.
- Claim matrix: compact allowed / blocked / required-review cards keep wording decisions scannable without converting the page into a report.

## Mobile Fixes

- Sticky header rendering is forced to a solid dark surface with a higher stacking context through `app/globals.css`, preventing content ghosting behind mobile nav.
- Mobile ProofOps hero decoration removes the amber top-right radial glow so the `/detections/` route does not show the unwanted yellow / white artifact.
- Loop controls collapse to a one-column stepper on narrow screens, avoiding horizontal overflow and keeping the active detail panel directly after the controls.

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

FIGMA_HANDOFF_TODO_AFTER_FLAGSHIP_REDESIGN: create a `Hoxline Product Page v0` frame with mobile hero, desktop hero, ProofOps loop diagram concept, authority map concept, and claim decision matrix when a target Figma file or active local handoff is available. This design document remains the repo-local handoff artifact.
