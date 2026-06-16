# Website PR #68 Org System Review

Date: 2026-06-15

Mode: `WEBSITE_PR68_ORG_AWARE_S_TIER_SECURITY_SYSTEM_SHOWCASE`

## PR state

- Website PR #68 is open and draft.
- Starting head: `be1aba614c7032a6ba2c64a855b9dfb2debfb720`.
- PR #67 is merged at `d3fa0c202f1a394d8ce80675dfa2aff2e90dca49`.
- PR #66 is closed and superseded by PR #67.

## Public surfaces inspected

- Current production: `https://hawkinsoperations.com/`
- PR #68 preview: `https://80e2da65.hawkinsoperations-website.pages.dev/`
- Historical V1 surface: `https://hawkinsops.com/`

Current production remains proof-disciplined but still reads partly like a documentation surface. HawkinsOps V1 has stronger pipeline and detection-inventory energy, but it is explicitly historical. The opportunity is to bring V1's system energy into HawkinsOperations V2 without collapsing source, validation, platform, proof, Hoxline, and website authority boundaries.

## Repos inspected

### Hoxline / local `aevumguard`

Paths inspected:

- `examples/showcase/ho-det-001-capability-visual-data-pack-v1.json`
- `examples/showcase/ho-det-001-capability-visual-data-pack-v1.md`
- `examples/gauntlet/ho-det-001-full-loop-run-v0.json`
- `examples/gauntlet/ho-det-001-proofcard-v0.json`
- `PRODUCT_BOUNDARY.md`
- `README.md`
- `docs/product/MODULE_MAP.md`

Facts found:

- Hoxline is the ProofOps control plane for AI-assisted security work.
- The Hoxline data pack states proof ceiling `CONTROLLED_TEST_VALIDATED`.
- `public_safe` is `false`.
- `human_review_required` is `true`.
- Hoxline can run the canonical HO-DET-001 ProofOps loop.
- The Gauntlet emits reviewer-readable JSON and Markdown.
- Runtime Candidate Ledger is `BLOCKED`.
- Signal Observation is `MISSING_EVIDENCE`.
- Claim Firewall is an internal Claim Authority capability, not the whole product and not proof authority.

Safe visualization:

- Hoxline engine route from artifact intake through evidence graph, telemetry contract, controlled validation, Gauntlet output, Claim Authority, and safer wording.
- Runtime and signal appear as gated lanes, not as capability wins.

### Detections

Paths inspected:

- `README.md`
- `detections/DETECTION_FACTORY_INDEX.md`
- `detections/successor/ho-det-001/*`
- `detections/successor/ho-det-011/*`
- `detections/successor/ho-det-012/*`
- `detections/successor/ho-det-013/*`

Facts found:

- `hawkinsoperations-detections` is source truth.
- Detection factory rows include Sigma, Splunk SPL, Wazuh XML, Security Onion/NDR, Suricata/Zeek candidates, CloudTrail fixtures, Sysmon and Windows Event ID mapping, Linux auth/audit, Cowrie, and Cribl pipeline contracts.
- `HO-DET-001` maps to PowerShell process behavior and ATT&CK `T1059.001`.
- `HO-DET-001` is `CONTROLLED_TEST_VALIDATED`.
- `HO-DET-011` has private runtime evidence captured but not public-safe.
- `HO-DET-012` is `CONTROLLED_TEST_VALIDATED`.
- `HO-DET-013` source exists and validation is planned.
- Identity detections `ID-DET-001..004` are controlled-test validated.
- `HO-NDR-001` is a boundary contract only.

Safe visualization:

- Detection Operations Cockpit with ATT&CK/Kill Chain orientation.
- Platform lanes for Sigma, Wazuh, Splunk, IR playbooks, Hoxline/Claim Firewall.
- Lifecycle rail from source truth to website render.

Do not visualize as proof:

- Live SIEM firing, live Wazuh routing, live Splunk proof, public-safe proof, production coverage, or complete ATT&CK coverage.

### Validation

Paths inspected:

- `README.md`
- `activity/detection-activity-ledger-v1.json`
- `activity/detection-activity-ledger-v1.md`
- `validation/VALIDATION_REGISTRY.yml`
- `reports/ho-det-001/validation-result.md`

Facts found:

- `hawkinsoperations-validation` is behavior truth.
- Controlled validation activity count: `49`.
- Controlled negative test count: `57`.
- Validation case count: `106`.
- Activity entry count: `10`.
- Runtime and signal truth are `NOT_PROVEN`.
- Public-safe count is `0`.
- HO-DET-001 has 14 controlled cases: 7 positive, 7 negative, 0 missed positives, 0 false-positive negatives.

Safe visualization:

- Validation counters, activity ledger, fixture split, and validation stage of lifecycle maps.

### Proof

Paths inspected:

- `README.md`
- `RELEASE_MANIFEST.json`
- `proof/records/README.md`
- `proof/records/HO-DET-001.md`
- `proof/cards/HO-DET-001.md`
- `proof/records/lifetime-case-ledger-v1-public-summary.json`

Facts found:

- `hawkinsoperations-proof` owns proof records, proof cards, proof maps, claim ceilings, and blocked-claim boundaries.
- Proof Pack 001 is a bounded HO-DET-001 reviewer route.
- Reviewer metrics include 49 activity fires, 106 validation cases, 8 proof records, 31 blocked claims, and 0 public-safe runtime proofs.
- Proof records do not publish raw private evidence or raise ceilings by presentation.

Safe visualization:

- Proof Authority Bay, proof record gallery, claim ceiling visual, receipt route, verify terminal.

### Platform

Paths inspected:

- `README.md`
- `contracts/contract-version.json`
- `contracts/reviewer-metrics-pipeline-v1-state.json`
- `contracts/lifetime-case-ledger-v1-state-manifest.json`
- `contracts/schemas/*`
- `contracts/examples/*`

Facts found:

- `hawkinsoperations-platform` owns contracts, schemas, ledgers, runner trust, packet shapes, runtime-receipt shapes, and promotion mechanics.
- Current platform truth states 6 governed cases / 6 ledger events, 49 detection activity records, 106 validation cases, 8 proof records, 31 blocked claims, 2 append-ready runtime candidates, 0 duplicate normalized candidates, 0 public-safe cases, and 0 closed cases.
- Append-ready runtime candidates are useful but authority-blocked until exact human approval.
- Platform contracts do not prove public proof, production readiness, or current runtime state.

Safe visualization:

- Contract lanes and promotion gates.
- Ledger mechanics as control machinery, not proof promotion.

### `.github`

Paths inspected:

- `architecture/REPO_AUTHORITY_MAP.md`
- `architecture/REPRODUCIBLE_REVIEWER_PATH.md`
- `governance/ORG_REQUIRED_CHECKS_MATRIX.yml`
- `wiki/11_ORG_SYSTEM_MAP.md`

Facts found:

- `.github` owns org routing and authority maps.
- Repository authority map separates `.github`, detections, validation, platform, proof, website, and Hoxline compatibility repo path.
- Website/GitHub rendering is not proof.
- Reviewer path is clone-runnable and does not claim runtime, signal, public-safe proof, production, customer readiness, or AI/analyst approval.

Safe visualization:

- Seven-surface authority constellation and reviewer route.

### Website

Paths inspected:

- `src/data/hoxlineVisualIntelligence.ts`
- `src/data/governanceSaves.ts`
- `src/data/attackCoverage.ts`
- `src/data/artifacts.ts`
- `components/visual-intelligence/*`
- `components/command-center/*`
- `components/governance/*`
- `components/claim-firewall/*`
- `components/detections/*`
- `components/evidence/*`

Facts found:

- PR #67 Hoxline real data-pack wiring is present.
- PR #68 already added command-center, Governance Saves, Claim Firewall, Detection Inventory Cockpit, and Evidence Bay foundations.
- The remaining upgrade is to make these scenes org-aware and visible as a single multi-repo machine.

## Strongest website opportunities

1. Put the system route map above the fold: Detections -> ATT&CK -> Validation -> Proof -> Hoxline -> Claim Firewall -> Website Render.
2. Replace landing-page text weight with proof-of-work counters and route machinery.
3. Make detections a cockpit with ATT&CK/Kill Chain orientation and validation/proof route state.
4. Make Claim Firewall the memorable demo moment.
5. Make Governance Saves feel like control intelligence, not a record list.
6. Make Hoxline show what enters the ProofOps loop from detections.
7. Make proof/artifacts read as receipt infrastructure.

## Data gaps

- Exact public preview screenshots were unavailable because Browser tooling was not available in the session.
- Exact ATT&CK technique IDs should be shown only where source-backed; otherwise use ATT&CK/Kill Chain orientation language.
- Outcome totals for Governance Saves beyond category counts are not measured; use `not_measured`.
- Runtime and signal states remain gated unless separate proof records approve stronger wording.

## Claim-boundary risk plan

- Use runtime/signal/public-safe/production/customer/approval terms only as blocked, gated, missing-evidence, or simulator-bad-claim examples.
- Do not claim live telemetry, live SIEM firing, public-safe proof, production readiness, customer deployment, AI approval, analyst approval, final authorization, legal availability, revenue, or product-market fit.
- Present boundaries as status locks, proof ceiling rails, and missing-evidence lanes instead of brand headline copy.

