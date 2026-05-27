# Claude Design Brief: HawkinsOperations Website Information Architecture

Status: Claude-ready planning brief  
Do not implement from this file without a separate scoped implementation prompt.

## Objective

Redesign the HawkinsOperations public site information architecture so each parent page has one clear job, repeated proof/doctrine blocks are compressed, and detailed work moves to child routes. The design pass must make reviewer inspection faster without changing proof ceilings, claim boundaries, source truth, or public-safe status.

## Non-Negotiable Claim Boundaries

The design must preserve these blocked claims as blocked/not claimed:

- runtime-active public proof
- signal-observed public proof
- public-safe runtime proof
- production-ready
- autonomous SOC
- AI-approved disposition
- analyst-approved disposition
- fleet-wide coverage
- customer deployment
- live Splunk proof
- live Wazuh proof
- live AWS proof
- Cribl-routed or Wazuh-routed public proof unless separately repo-backed and promoted
- website rendering as proof
- green CI as merge/proof authority
- source presence as runtime truth
- validation truth as signal truth
- private runtime evidence as public-safe material

Use blocked/not claimed language where these concepts appear. Do not rewrite them into stronger claims.

## Page Role Matrix

| Route | Owns | Must not own |
|---|---|---|
| `/` | reviewer cockpit only | full registries, proof tables, artifact library, full ATT&CK map, full claim firewall |
| `/start/` | reviewer route selector only | recent-work library, claim firewall, proof/validation/platform details |
| `/pipeline/` | operational flow only | full validation registry, proof ledger, proof-pack release detail, contract browser |
| `/proof/` | proof authority and claim ledger only | validation registry, artifact inventory, platform contract browser, pipeline tutorial |
| `/artifacts/` | artifact inventory only | proof authority, platform narrative, validation registry, homepage-style cockpit |
| `/architecture/` | system map and authority surfaces only | proof ledger, artifact library, validation tables |
| `/about/` | operator story and methodology only | proof registry, validation registry, claim firewall, platform contract detail |
| `/controls/` | control status and governance controls only | proof records, artifact inventory, operator biography |
| `/legacy/` | HawkinsOps legacy boundary only | current proof registry, operator methodology detail |

## Section Order For Parent Pages

### `/`

1. Hero cockpit: what exists, current ceiling, first actions.
2. Inspection route cards: Proof, Pipeline, Artifacts, Architecture.
3. Compact shipped-work strip.

Design emphasis: make the first viewport feel like a reviewer command surface, not a proof encyclopedia.

Do not repeat:
- Full proof pack manifest.
- Full validation registry.
- Full ATT&CK map.
- Full claim firewall.

### `/start/`

1. Route selector.
2. First-click cards by reviewer intent.
3. External repo links.

Design emphasis: decision speed. This page is a switchboard.

Do not repeat:
- Recent governed work cards.
- Full claim firewall.
- Platform/proof/validation explanations.

### `/pipeline/`

1. End-to-end operational flow.
2. Gate cards and verifier/check responsibilities.
3. Receipt route cards.

Design emphasis: show sequence and custody. A reviewer should understand how a change moves through gates.

Do not repeat:
- Full validation registry.
- Proof Pack 001 full details.
- Claim ledger.
- Platform contract browser.

### `/proof/`

1. Current ceiling and supported/blocked claim ledger.
2. Proof records/status index.
3. Promotion gates and proof-pack route cards.

Design emphasis: authority, ledger, and ceiling. This page decides what can be claimed publicly.

Do not repeat:
- Full validation registry.
- Artifact inventory.
- Operational pipeline.
- Platform contract browser.

### `/artifacts/`

1. Evidence Bay filters and cards.
2. Anchor artifacts.
3. Recent governed artifacts by surface.

Design emphasis: inventory and inspection. Each card should show owner surface, supports, does not prove, and route.

Do not repeat:
- Proof ledger.
- Full platform contract narratives.
- Full proof-pack manifest.

### `/architecture/`

1. Repo authority map.
2. Truth surfaces and promotion model.
3. Control plane links.

Design emphasis: system separation. Make it obvious that surfaces cannot borrow authority from each other.

Do not repeat:
- Proof records.
- Validation registry.
- Artifact inventory.

### `/about/`

1. Operator profile.
2. Methodology transfer from quality control to detection governance.
3. AI labor and human governance methodology.

Design emphasis: Raylee's story and judgment. The page should explain how the operator thinks, not rerender the proof system.

Do not repeat:
- Technical registries.
- Claim firewall.
- Full legacy rules.

### `/controls/`

1. Claim firewall.
2. Promotion/control gates.
3. Control route links.

Design emphasis: governance controls. Make blocked wording easy to scan.

Do not repeat:
- Proof-record details.
- Architecture maps beyond links.

### `/legacy/`

1. HawkinsOps reference context.
2. HawkinsOperations current boundary.
3. What legacy cannot prove.

Design emphasis: clean boundary. Legacy is context only.

Do not repeat:
- Current proof registry.
- About page biography.

## Moved Content Map

| Content | Move to | Parent replacement |
|---|---|---|
| Validation registry | `/validation/` | "Open validation registry." |
| Proof Pack 001 manifest/release detail | `/proof/proof-pack-001/` | "Proof Pack 001 released at current ceiling." |
| Runtime Proof Factory v0 summaries | `/proof/runtime-proof-factory/` | "Runtime Proof Factory summaries are bounded and raw evidence stays private." |
| Governance Saves | `/proof/governance-saves/` | "Open Governance Saves evidence lane." |
| Platform contracts | `/platform/contracts/` | "Open platform contracts." |
| Detection Factory Controller v0 | `/platform/contracts/` | "Open factory controller contract." |
| SOAR/AutoSOC/LLM/GPU support boundaries | `/platform/contracts/` | "Support-only contracts; no live response authority claimed." |
| Cyber Kill Chain / ATT&CK map | `/detections/` | "Open detection coverage map." |
| Identity detection cards | `/detections/identity/` | "Open identity detection cards." |
| HO-NDR-001 / HO-PIPE-001 / HO-DET-013 | `/detections/telemetry/` | "Open telemetry and route-contract cards." |
| Repo authority DAG/inventory | `/architecture/repo-authority-map/` | "Open repo authority map." |
| Truth surface model | `/architecture/truth-surfaces/` | "Open truth surface model." |
| Claim firewall detail | `/controls/` or `/architecture/claim-firewall/` | "Open claim firewall." |
| Full legacy explanation | `/legacy/` | "Legacy context only." |

## Design Must Emphasize

- Fast reviewer routing.
- Clear parent-page ownership.
- Compact status badges instead of repeated warning paragraphs.
- Link cards that make the next inspection action obvious.
- Proof ceilings that travel with content but do not dominate every page.
- Visual separation between source, validation, runtime, signal, evidence, public proof, and website rendering.
- "Does not prove" fields on artifact/detail cards.
- Child-route hierarchy for dense work.

## Design Must Not Change

- Do not raise claim ceilings.
- Do not imply public-safe runtime proof.
- Do not imply runtime-active, signal-observed, production-ready, fleet-wide, customer deployment, autonomous SOC, AI-approved, or analyst-approved status.
- Do not treat website rendering as proof.
- Do not treat green CI as merge/proof authority.
- Do not turn source truth into runtime truth.
- Do not turn validation truth into signal truth.
- Do not expose or summarize raw private evidence.
- Do not remove all visible claim boundaries. Compress them, but keep one visible boundary per parent page.

## Recommended Child Route Tree

```text
/
/start/
/pipeline/
/proof/
  /proof/ho-det-001/
  /proof/proof-pack-001/
  /proof/runtime-proof-factory/
  /proof/governance-saves/
/artifacts/
  /artifacts/evidence-bay/
  /artifacts/[slug]/
/architecture/
  /architecture/truth-surfaces/
  /architecture/repo-authority-map/
  /architecture/claim-firewall/
/detections/
  /detections/identity/
  /detections/telemetry/
/validation/
/platform/
  /platform/contracts/
/about/
  /about/methodology/
  /about/hawkinsops-to-hawkinsoperations/
/controls/
/legacy/
```

## Claude Output Expectation

Claude should produce a design implementation plan first, not code. The plan must list:

- routes to edit or create
- components to touch
- source data to move or refactor
- exact copy blocks to compress
- boundaries preserved
- validation commands
- any public-copy risk

Implementation must wait for a separate scoped Codex prompt.

## Claim Boundary

This brief is a planning artifact for design information architecture. It is not proof, not promotion, not runtime evidence, not signal evidence, and not approval for public-safe runtime claims.
