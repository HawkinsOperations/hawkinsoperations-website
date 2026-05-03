# Scope

Repository: `hawkinsoperations-website`

## In Scope

- Reviewer-facing project narrative and navigation
- Repository map and system overview pages
- Claim-bounded evidence summary links
- Astro static routes for reviewer, proof, architecture, repository, claim firewall, field-note, operator, and legacy-boundary pages
- Typed public rendering data under `src/data`

## Out of Scope

- Host-level operational state
- Internal cutover/control docs
- Secret-bearing telemetry or runtime internals

## Promotion Boundary

Website claims must map to proof records in `hawkinsoperations-proof`.

Website rendering is not proof. The Astro site is a static public inspection layer and does not promote runtime, signal, evidence, or external-use claims by itself.
