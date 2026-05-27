# HawkinsOperations Website Information Architecture Audit

Status: planning only  
Scope: hawkinsoperations-website public information architecture  
Mode: read-only discovery followed by approved planning file creation  
Authority boundary: website owns public rendering and reviewer navigation only

## Audit Purpose

The current public site repeats the same proof ceiling, blocked-claim, validation registry, proof-pack, artifact, platform, and governance language across too many parent pages. That makes every page feel like an all-in-one proof landfill instead of a clear reviewer route.

This audit defines page ownership, duplicate-content severity, child-route recommendations, and copy compression rules for a later design pass. It does not authorize route creation, component edits, source-data edits, proof promotion, or public claim expansion.

## Source Routes Inspected

| Route | Source file | Current purpose | Actual rendered themes | Density risk | Recommended role |
|---|---|---|---|---|---|
| `/` | `app/page.tsx` | Main public entry | reviewer cockpit, proof pack, work dashboard, artifacts, ATT&CK, pipeline, promotion, repo authority, truth surfaces, claim firewall | P0 | reviewer cockpit only |
| `/pipeline/` | `app/pipeline/page.tsx` | Proof pipeline | workflow gates, validation registry, platform contracts, LLM boundary, receipts, proof pack, proof boundary | P0 | operational flow only |
| `/proof/` | `app/proof/page.tsx` | Proof authority surface | recent proof work, ceiling, validation registry, proof status, blocked firewall, artifacts, proof records, proof pack, verifiers, platform boundaries, gates | P0 | proof authority and claim ledger only |
| `/artifacts/` | `app/artifacts/page.tsx` | Artifact evidence bay | evidence bay, anchor artifacts, GPU/factory lane, recent governed work by surface, coverage matrix | P1 | artifact inventory only |
| `/architecture/` | `app/architecture/page.tsx` | System architecture | proof planes, truth surfaces, CI/governance concept | P2 | system map and authority surfaces only |
| `/about/` | `app/about/page.tsx` | Operator profile | operator story, legacy boundary, AI governance, public ceiling, methodology, blocked claims, external routes | P1 | operator story and methodology only |
| `/start/` | `app/start/page.tsx` | Reviewer entry | route selector, phase 2 links, recent work, boundary notice, external links, claim firewall | P1 | reviewer route selector only |
| `/controls/` | `app/controls/page.tsx` | Claim firewall | blocked wording and public claim standard | P2 | control status and governance controls only |
| `/legacy/` | `app/legacy/page.tsx` | Legacy boundary | HawkinsOps reference, current evidence requirement, reference link | P3 | HawkinsOps legacy boundary only |
| `/proof/ho-det-001/` | `app/proof/ho-det-001/page.tsx` | Case file | proof path, status, what exists, what passed, firewall, promotion requirements, related links | P2 | child proof detail route |
| `/architecture/truth-surfaces/` | `app/architecture/truth-surfaces/page.tsx` | Truth surface child | six-surface board | P3 | child architecture detail route |
| `/proof-loop/` | `app/proof-loop/page.tsx` | Proof loop explainer | proof loop, boundary, promotion flow, links | P2 | merge into pipeline/proof or keep as child explainer |
| `/repos/` | `app/repos/page.tsx` | Repository map | repo DAG and inventory | P2 | move under architecture route tree |
| `/field-notes/` | `app/field-notes/page.tsx` | Boundary note archive | doctrine notes | P2 | keep as supporting archive, reduce parent links |
| `/artifacts/[slug]/` | `app/artifacts/[slug]/page.tsx` | Artifact detail | recent governed artifact details | P2 | child artifact detail route |
| `/field-notes/[slug]/` | `app/field-notes/[slug]/page.tsx` | Note detail | doctrine detail | P3 | child note detail route |

## Duplicate Severity Scale

| Severity | Meaning | Rule |
|---|---|---|
| P0 | Damages reviewer clarity | Move detail off parent pages or delete duplicate parent rendering. Keep only a short route card or badge. |
| P1 | Creates density or scanning failure | Compress to summary, link card, or child route. |
| P2 | Acceptable repetition but should be compressed | Keep as compact badge, tooltip, or one-line boundary. |
| P3 | Keep as global badge only | Use globally only as a compact label, not explanatory paragraph. |

## Top Duplicate Blocks Ranked

| Rank | Block | Severity | Current spread | Recommended action |
|---|---|---|---|---|
| 1 | Public ceiling plus blocked runtime/signal/public-safe status | P0 | `/`, `/start/`, `/pipeline/`, `/proof/`, `/artifacts/`, `/about/`, `/controls/`, `/proof/ho-det-001/` | Keep one global compact status badge. Full explanation belongs on `/proof/` and `/architecture/truth-surfaces/`. |
| 2 | Validation registry summaries | P0 | `/pipeline/`, `/proof/`, homepage links/data, start links | Move full registry to `/validation/`. Parent pages show only counts and a route card. |
| 3 | Proof Pack 001 release and manifest | P0 | `/`, `/proof/`, `/start/`, `/artifacts/`, artifact data | Move full manifest/release detail to `/proof/proof-pack-001/`. Parents link to it. |
| 4 | Claim firewall language | P1 | `/`, `/proof/`, `/controls/`, `/start/`, `/proof/ho-det-001/`, field notes, artifacts | Make `/controls/` the control owner. Parents use a compact "blocked claims visible" badge or card. |
| 5 | Platform contracts and LLM/GPU support boundaries | P1 | `/pipeline/`, `/proof/`, `/artifacts/`, `/start/`, `src/data/platformContracts.ts` | Move full contract browser to `/platform/contracts/`. Pipeline keeps operational position only. |
| 6 | Evidence bay / artifact-family coverage | P1 | `/artifacts/`, `/`, `/proof/`, `/start/` | Artifacts owns inventory. Other pages show route cards only. |
| 7 | AI labor / governance authority doctrine | P2 | `/`, `/about/`, `/proof/`, `/controls/`, `/proof-loop/`, field notes | About owns methodology; controls owns governance control. Global copy becomes one badge. |
| 8 | Cyber Kill Chain / ATT&CK mapping | P2 | `/`, proof mapping link, attack data | Move full map to `/detections/` or `/detections/coverage/`. Homepage uses one card. |
| 9 | Legacy boundary language | P2 | `/about/`, `/legacy/`, artifacts, footer | `/legacy/` owns the full boundary. About keeps one context card. |
| 10 | Website rendering is not proof | P3 | almost every parent | Keep as global badge or one-line footer/status strip. Avoid paragraph repetition. |

## Parent Page Contracts

### `/` Homepage

Contract: reviewer cockpit only, giving the fastest explanation of what exists, what is proven, what is blocked, and where to inspect.

Primary sections:
1. Hero cockpit with public ceiling, key counts, and primary reviewer routes.
2. "What to inspect first" route cards for proof, artifacts, pipeline, and architecture.
3. Compact recent shipped-work strip with no full registries.

Must stay:
- One compact public ceiling/status row.
- Fast links to Proof Pack 001, HO-DET-001, Evidence Bay, GitHub org.
- Very short "AI is labor; evidence and human review authorize claims" statement.

Must move:
- Full ATT&CK/Kill Chain map to `/detections/` or `/detections/coverage/`.
- Promotion ladder detail to `/proof/` or `/controls/`.
- Repo authority DAG to `/architecture/repo-authority-map/`.
- Truth surfaces infographic to `/architecture/truth-surfaces/`.
- Claim firewall panel to `/controls/`.
- Full evidence bay language to `/artifacts/`.

Compact badge/link card:
- Website rendering is not proof.
- Runtime/signal/public-safe blocked.
- Controlled-test validation count.

Delete as duplicate:
- Any second full paragraph explaining proof ceiling after the hero.
- Any duplicate proof-pack explanation once route card exists.

Child routes to point to:
- `/proof/`
- `/proof/ho-det-001/`
- `/proof/proof-pack-001/`
- `/artifacts/evidence-bay/`
- `/pipeline/`
- `/architecture/`

Visible boundary:
- "Current public ceiling: CONTROLLED_TEST_VALIDATED. Website rendering is not proof."

### `/pipeline/`

Contract: operational flow only, showing how repo change becomes controlled validation, proof record, and website rendering.

Primary sections:
1. Source -> PR -> checks -> controlled fixtures -> validators -> scanner -> proof record -> website rendering.
2. Gate cards for each operational stage.
3. Receipt route cards to validation, proof, and platform contract detail.

Must stay:
- Pipeline gate flow.
- GitHub Actions/check concept.
- Receipt lane as operational trace.

Must move:
- Full validation registry to `/validation/`.
- Full platform contract browser to `/platform/contracts/`.
- Proof Pack 001 release console to `/proof/proof-pack-001/`.
- LLM/GPU support detail to `/platform/contracts/` or `/about/methodology/` depending on content.

Compact badge/link card:
- Public ceiling.
- Blocked runtime/signal/public-safe status.
- Platform contract link.

Delete as duplicate:
- Proof-ledger boundary panels that repeat `/proof/`.
- Long proof-pack release block.

Child routes to point to:
- `/validation/`
- `/platform/contracts/`
- `/proof/proof-pack-001/`
- `/proof/`

Visible boundary:
- "Pipeline output is validation and routing evidence within stated scope; it does not prove runtime or signal truth."

### `/proof/`

Contract: proof authority and claim ledger only.

Primary sections:
1. Current public ceiling and supported/blocked claim ledger.
2. Proof records and proof status index.
3. Promotion gates and proof-pack route cards.

Must stay:
- Public ceiling authority.
- Supported public claim routes.
- Blocked claim categories as a ledger, not repeated doctrine paragraphs.
- Proof records.
- Promotion gate ladder.

Must move:
- Full validation registry to `/validation/`.
- Full artifact-family matrix to `/artifacts/`.
- Platform boundaries to `/platform/contracts/`.
- Proof Pack 001 manifest/release detail to `/proof/proof-pack-001/`.

Compact badge/link card:
- Validation dependency summary.
- Platform contract dependency summary.
- Website rendering is not proof.

Delete as duplicate:
- Any repeated artifact inventory once `/artifacts/` owns it.
- Any repeated operational pipeline detail once `/pipeline/` owns it.

Child routes to point to:
- `/proof/ho-det-001/`
- `/proof/proof-pack-001/`
- `/proof/runtime-proof-factory/`
- `/proof/governance-saves/`
- `/validation/`
- `/controls/`

Visible boundary:
- "Proof records authorize only their stated claim ceiling. Stronger runtime, signal, and public-safe claims remain blocked until separately promoted."

### `/artifacts/`

Contract: artifact inventory only, with filterable cards and minimal repeated doctrine.

Primary sections:
1. Evidence Bay filters and cards.
2. Anchor artifacts.
3. Recent governed artifacts grouped by source surface.

Must stay:
- EvidenceBay.
- Artifact card metadata: owner surface, supports, does not prove.
- Recent governed artifact detail links.

Must move:
- GPU/factory lane detail to `/platform/contracts/` or `/proof/runtime-proof-factory/`.
- Artifact family coverage matrix to a child route if kept.
- Proof doctrine explanations to `/proof/` or `/controls/`.

Compact badge/link card:
- Each card keeps its own ceiling.
- Website cards are not evidence.

Delete as duplicate:
- Long family-level proof explanations repeated from `/proof/`.
- Any proof-pack detail that duplicates `/proof/proof-pack-001/`.

Child routes to point to:
- `/artifacts/evidence-bay/`
- `/artifacts/[slug]/`
- `/proof/`
- `/pipeline/`
- `/architecture/`

Visible boundary:
- "Artifacts route reviewers to receipts; a rendered artifact card is not proof by itself."

### `/architecture/`

Contract: system map and authority surfaces only.

Primary sections:
1. Repo authority map.
2. Truth surfaces and promotion gates.
3. Control planes and boundary routes.

Must stay:
- ClaimPromotionFlow or equivalent system map.
- TruthSurfaceSeparation.
- Links to controls, repos, proof.

Must move:
- Full proof ledger to `/proof/`.
- Full repo inventory to `/architecture/repo-authority-map/`.
- Full claim firewall to `/architecture/claim-firewall/` or `/controls/`.

Compact badge/link card:
- Static site / rendering-only boundary.
- "Source truth is not runtime truth."

Delete as duplicate:
- Any proof-record list.
- Any validation registry table.

Child routes to point to:
- `/architecture/truth-surfaces/`
- `/architecture/repo-authority-map/`
- `/architecture/claim-firewall/`
- `/platform/contracts/`

Visible boundary:
- "Architecture explains separation; it does not prove a runtime plane is active."

### `/about/`

Contract: operator story and methodology only.

Primary sections:
1. Operator profile and focus.
2. Methodology transfer from quality control to detection governance.
3. AI labor and human authority methodology.

Must stay:
- Raylee Hawkins operator profile.
- Manufacturing quality-control transfer.
- Detection engineering and SOC automation methodology.
- One legacy context card.

Must move:
- Full legacy boundary to `/legacy/`.
- Technical registries to `/proof/`, `/validation/`, `/artifacts/`, `/architecture/`.
- Claim firewall detail to `/controls/`.

Compact badge/link card:
- Public ceiling.
- "AI is labor. Governance is authority."
- Legacy reference link.

Delete as duplicate:
- Full blocked-claim list.
- Full proof ceiling paragraph.

Child routes to point to:
- `/about/methodology/`
- `/about/hawkinsops-to-hawkinsoperations/`
- `/proof/`
- `/artifacts/`
- `/legacy/`

Visible boundary:
- "The operator story explains method and judgment; it does not promote proof claims."

### `/start/`

Contract: reviewer route selector only.

Primary sections:
1. Three-speed or role-based route selector.
2. First-click route cards.
3. External repo links.

Must stay:
- ReviewRouteSelector.
- Intake routes.
- External review links.

Must move:
- Recent governed work snapshot to `/artifacts/`.
- Phase 2 detailed route list into child destinations.
- Claim firewall detail to `/controls/`.

Compact badge/link card:
- Current public ceiling.
- Website rendering is not proof.

Delete as duplicate:
- Full ClaimFirewallPanel.
- Repeated proof/validation/platform explanatory paragraphs.

Child routes to point to:
- `/proof/`
- `/pipeline/`
- `/artifacts/`
- `/architecture/`
- `/controls/`
- `/repos/` or `/architecture/repo-authority-map/`

Visible boundary:
- "Start routes are navigation only; they do not author proof."

### `/controls/`

Contract: control status and governance controls only.

Primary sections:
1. Claim firewall and blocked wording.
2. Promotion requirements and control gates.
3. Links to repo authority and proof routes.

Must stay:
- ClaimFirewall.
- BoundaryNotice.
- Public claim standard.

Must move:
- General architecture explanation to `/architecture/`.
- Proof-record detail to `/proof/`.

Compact badge/link card:
- Current ceiling.
- Public-safe state.
- Rendering-only.

Delete as duplicate:
- Broad proof-ledger descriptions already owned by `/proof/`.

Child routes to point to:
- `/architecture/claim-firewall/`
- `/proof/`
- `/architecture/repo-authority-map/`

Visible boundary:
- "Controls block unsupported wording; controls do not promote claims by themselves."

### `/legacy/`

Contract: HawkinsOps legacy boundary only.

Primary sections:
1. What HawkinsOps is.
2. What HawkinsOperations is.
3. What legacy material cannot prove.

Must stay:
- Legacy/reference language.
- Current evidence requirement.
- Link to legacy reference.

Must move:
- Operator story to `/about/`.
- Technical architecture to `/architecture/`.

Compact badge/link card:
- LEGACY_REFERENCE.
- CURRENT_EVIDENCE_REQUIRED.

Delete as duplicate:
- Any current proof registry content.

Child routes to point to:
- `/about/hawkinsops-to-hawkinsoperations/`
- `/proof/`

Visible boundary:
- "Legacy material is reference context only and does not automatically promote current HawkinsOperations claims."

## Proposed Child Route Tree

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
/legacy/
```

## Claim Boundary

This planning document does not prove runtime, signal, public-safe runtime proof, production readiness, fleet scope, customer deployment, autonomous SOC authority, AI-approved disposition, analyst-approved disposition, or public-safe status. It only maps current rendered content and repo-backed route opportunities for a later implementation pass.
