# Website Missing Work Map

Status: planning only  
Purpose: compare current website presentation against repo-backed work that is missing, underplayed, or needs clearer routing  
Boundary: missing from website does not mean public-safe or ready for stronger public copy

## Missing or Underplayed Repo-Backed Work

| Work item | Repo-backed evidence observed | Current website state | Gap | Recommended route | Public copy ceiling |
|---|---|---|---|---|---|
| Runtime Proof Factory v0 | `hawkinsoperations-proof/docs/runtime/RUNTIME-PROOF-FACTORY-V0.md`; platform factory/controller references | Mentioned in validation/proof data but no focused route | Underplayed; parent pages cannot explain it safely without density | `/proof/runtime-proof-factory/` | Bounded summaries only; no public runtime proof claim. |
| HO-DET-011 bounded private runtime summary | `proof/records/HO-DET-011.md`; validation `reports/ho-det-011/`; runtime review docs; platform case-packet guardrail | Appears in proof/validation data and ATT&CK map | Needs route/card that states bounded public-safe summary and raw evidence exclusion | `/proof/runtime-proof-factory/` or `/detections/telemetry/` | Controlled-test validation plus bounded summary; raw evidence private; public runtime proof blocked. |
| HO-DET-012 bounded private runtime summary | `proof/records/HO-DET-012.md`; `proof/cards/HO-DET-012.md`; validation `reports/ho-det-012/`; runtime docs | Appears in proof/validation data and ATT&CK map | Needs route/card parity with HO-DET-011 | `/proof/runtime-proof-factory/` or `/detections/telemetry/` | Controlled-test validation plus bounded summary; public runtime proof blocked. |
| Governance Saves evidence lane | `hawkinsoperations-proof/docs/governance-saves/` | Not clearly owned by a website route | Missing dedicated proof/governance route | `/proof/governance-saves/` | Governance evidence lane only; not runtime proof. |
| Operations Accomplishment Ledger | `hawkinsoperations-proof/docs/case-studies/OPERATIONS-ACCOMPLISHMENT-LEDGER.md`; proof README link | Not surfaced as distinct reviewer artifact | Underplayed as operator proof-of-work summary | `/artifacts/` card or `/artifacts/[slug]/` | Case-study/context artifact; not proof promotion. |
| SOAR Case Packet v0 | `hawkinsoperations-platform/contracts/schemas/soar-case-packet-v0.schema.json`; sample and verifier; `src/data/platformContracts.ts` | Mentioned under platform contracts and start route | Needs contract detail route; avoid live SOAR implication | `/platform/contracts/` | Analyst-support structure only; live SOAR and response automation blocked. |
| Runtime Truth Spine | `hawkinsoperations-validation/validation/successor/ho-det-001/private-runtime-evidence-index.md` includes Runtime Truth Spine heading | Not public-detail routed | Needs careful boundary handling; may be private-adjacent | Keep as repo link only unless public wording is approved | Private runtime/evidence boundary; not public-safe proof. |
| Detection Factory Controller v0 | `hawkinsoperations-platform/docs/factory/DETECTION_FACTORY_CONTROLLER_V0.md`; `scripts/ho_factory.py`; contract schema/examples | Mentioned in artifacts and platform data | Needs clearer platform-owned route | `/platform/contracts/` | Status/plan packet emitter only; no autonomous SOC or promotion authority. |
| HO-PIPE-001 telemetry coverage contract status | validation reports and platform telemetry coverage contract | Present in attack coverage/registry but no route | Underplayed route-integrity contract | `/detections/telemetry/` or `/platform/contracts/` | Pipeline route contract only; not live telemetry proof. |
| HO-NDR-001 visibility contract | proof card, proof boundary doc, validation samples, platform telemetry contract | Present in registry and attack coverage | Needs clear NDR/telemetry route | `/detections/telemetry/` | Boundary contract only unless fixtures/proof are promoted. |
| ID-DET-001 through ID-DET-004 split cards | detection source folders; validation reports; platform controller specs | Grouped in validation/proof data, no split website child cards | Missing reviewer-specific identity route | `/detections/identity/` with split cards | Controlled-test validation only; live IdP/SIEM/NDR and proof promotion blocked where no proof record exists. |
| HO-DET-013 source-only telemetry tamper lane | detection source folder `detections/successor/ho-det-013/` | Present in attack coverage data only | Missing source-only route and boundary | `/detections/telemetry/` | Source-only unless validation/proof records are confirmed and promoted. |
| Proof Pack 001 release route | proof README, release scripts, release runbook, release manifest, website proof data | Repeated across pages but no focused child route | Over-repeated, not missing; needs owned detail page | `/proof/proof-pack-001/` | Released reviewer package at stated ceiling; no runtime/signal/public-safe runtime proof. |
| Cyber Kill Chain coverage map | `hawkinsoperations-proof/docs/mappings/CYBER_KILL_CHAIN_COVERAGE.md`; proof index; website attack coverage data | Full map on homepage | Not missing; misplaced and too dense | `/detections/` or `/detections/coverage/` | Mapping is reviewer navigation, not proof authority. |

## Stale Repo-Truth Gaps To Recheck Before Implementation

| Area | Reason to recheck | Required source before public copy |
|---|---|---|
| HO-DET-011 status | Platform status previously references guardrail drift and CI required-check uncertainty | Proof record, validation report, platform STATUS, current guardrail docs |
| HO-DET-012 parity | Org reproducible reviewer path notes proof and website parity concerns | Proof record/card, validation report, platform controller, current website data |
| ID-DET-002 through ID-DET-004 | Org reviewer path says proof records/routes pending | Detection source, validation reports, proof status index |
| HO-NDR-001 | Registry says contract sample / boundary only | Proof card, validation samples, telemetry contract docs |
| HO-PIPE-001 | Route-integrity contract is not detection proof | Validation report, detection source, platform telemetry contract |
| Runtime Proof Factory | Contains private-runtime-adjacent summaries | Proof runtime docs and public-safe decision gates |
| Governance Saves | Needs exact public-safe framing | Governance Saves evidence matrix and candidates docs |

## Recommended Website Treatment

### Create Route Families Only When They Reduce Density

- `/validation/` should own the full validation registry currently duplicated on `/pipeline/` and `/proof/`.
- `/platform/contracts/` should own SOAR, AutoSOC, Detection Factory Controller, LLM support, GPU support, telemetry contracts, and blocked authority footers.
- `/proof/proof-pack-001/` should own release, manifest, included/excluded, checksum, and proof-pack boundaries.
- `/proof/runtime-proof-factory/` should own bounded Runtime Proof Factory summaries only if public-safe wording is rechecked against proof repo docs.
- `/detections/identity/` should split ID-DET-001 through ID-DET-004 into cards without implying proof records where proof records are absent.
- `/detections/telemetry/` should hold HO-NDR-001, HO-PIPE-001, and HO-DET-013 with clear contract/source-only boundaries.

## What Must Not Be Added As Public Copy

- Raw private runtime evidence.
- Private markers, private paths, host/user details, internal network details, command output, raw logs, raw telemetry, or private hashes.
- Any wording that turns validation into signal observation.
- Any wording that turns source into runtime deployment.
- Any wording that turns private evidence into public-safe material.
- Any wording that implies runtime-active public proof, signal-observed public proof, public-safe runtime proof, production readiness, autonomous SOC, AI-approved disposition, analyst-approved disposition, fleet-wide coverage, customer deployment, live Splunk proof, live Wazuh proof, live AWS proof, or Cribl/Wazuh routed public proof without separate promotion.

## Claim Boundary

This missing work map identifies public navigation gaps and underplayed repo-backed work. It does not certify that any item is public-safe beyond its current repo wording, and it does not promote any private runtime or signal material.
