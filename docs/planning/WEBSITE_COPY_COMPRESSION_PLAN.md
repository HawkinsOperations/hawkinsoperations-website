# Website Copy Compression Plan

Status: planning only  
Purpose: reduce parent-page density while preserving claim boundaries

## Global Compression Rules

1. Parent pages get one job each.
2. Parent pages get at most three primary sections.
3. Warnings become compact badges unless the parent page owns the warning.
4. Full registries move to child routes.
5. Full doctrine moves to the owning parent or child route.
6. Every parent page keeps one visible proof boundary line.
7. Repeated paragraphs are replaced by route cards.

## Global Warning Treatment

| Warning | Current issue | New treatment |
|---|---|---|
| Website rendering is not proof | Repeated as paragraphs across many pages | Global badge or one-line footer/status strip. Full explanation lives in field note and architecture. |
| Runtime/signal/public-safe blocked | Repeated in long lists | Compact "runtime/signal/public-safe blocked" badge on non-owner pages. Full ledger lives on `/proof/` and `/controls/`. |
| AI is labor, governance is authority | Repeated as doctrine | Global short statement. Methodology detail lives on `/about/`; control detail lives on `/controls/`. |
| Source truth is not runtime truth | Repeated concept | Architecture tooltip/link card. |
| Validation truth is not signal truth | Repeated concept | Validation page boundary line. |
| Green CI is not merge/proof authority | Not central to all pages | Controls/governance route only unless a CI/check section appears. |

## Parent Page Compression

### `/`

Max purpose: reviewer cockpit only.

Top 3 sections:
1. Hero cockpit: current ceiling, key counts, first actions.
2. Inspection routes: Proof, Pipeline, Artifacts, Architecture.
3. Compact shipped-work strip: latest/highest-value receipts only.

Move off page:
- Full ATT&CK/Kill Chain map.
- Truth surfaces infographic.
- Repo authority DAG.
- Claim firewall panel.
- Promotion ladder.
- Evidence Bay detail.

Global warning that remains:
- "CONTROLLED_TEST_VALIDATED. Website rendering is not proof."

Tooltip/badge/link instead of paragraph:
- Runtime/signal/public-safe blocked.
- AI labor/human authority.
- Proof Pack 001 released at current ceiling.

Recommended CTA targets:
- `/proof/`
- `/proof/ho-det-001/`
- `/proof/proof-pack-001/`
- `/artifacts/evidence-bay/`

### `/pipeline/`

Max purpose: operational flow only.

Top 3 sections:
1. End-to-end pipeline sequence.
2. Gate cards and verifier/check responsibilities.
3. Receipt dependencies: validation, proof, platform contracts.

Move off page:
- Validation registry.
- Platform contract browser.
- Proof Pack 001 release/manifest detail.
- LLM/GPU detail.
- Proof claim ledger.

Global warning that remains:
- "Pipeline gates do not prove runtime or signal truth."

Tooltip/badge/link instead of paragraph:
- Current ceiling.
- Blocked runtime/signal/public-safe.
- Green CI is not proof authority.

Recommended CTA targets:
- `/validation/`
- `/platform/contracts/`
- `/proof/`
- `/proof/proof-pack-001/`

### `/proof/`

Max purpose: proof authority and claim ledger only.

Top 3 sections:
1. Current ceiling and supported/blocked claim ledger.
2. Proof records/status index.
3. Promotion gates and proof-pack route cards.

Move off page:
- Validation registry detail.
- Artifact family matrix.
- Platform contract detail.
- Proof Pack 001 full manifest/release console.

Global warning that remains:
- "Proof records authorize only their stated claim ceiling."

Tooltip/badge/link instead of paragraph:
- Validation dependency.
- Platform dependency.
- Website rendering is not proof.

Recommended CTA targets:
- `/proof/ho-det-001/`
- `/proof/proof-pack-001/`
- `/proof/runtime-proof-factory/`
- `/proof/governance-saves/`
- `/validation/`
- `/controls/`

### `/artifacts/`

Max purpose: artifact inventory only.

Top 3 sections:
1. Evidence Bay filters/cards.
2. Anchor artifacts.
3. Recent governed artifacts by surface.

Move off page:
- GPU/factory lane narrative.
- Proof ledger explanations.
- Platform contract explanations.
- Artifact family coverage matrix if it duplicates Evidence Bay.

Global warning that remains:
- "Artifact cards are reviewer routes, not proof by themselves."

Tooltip/badge/link instead of paragraph:
- Per-card proof ceiling.
- Rendering-only.
- Not-public-safe where relevant.

Recommended CTA targets:
- `/artifacts/evidence-bay/`
- `/artifacts/[slug]/`
- `/proof/`
- `/pipeline/`

### `/architecture/`

Max purpose: system map and authority surfaces only.

Top 3 sections:
1. Repo authority map.
2. Truth surfaces and promotion model.
3. Control plane links.

Move off page:
- Proof ledger detail.
- Validation tables.
- Artifact inventory.
- Claim firewall detail.

Global warning that remains:
- "Architecture explains separation; it does not prove runtime activity."

Tooltip/badge/link instead of paragraph:
- Source truth is not runtime truth.
- Website rendering is not proof.

Recommended CTA targets:
- `/architecture/truth-surfaces/`
- `/architecture/repo-authority-map/`
- `/architecture/claim-firewall/`
- `/platform/contracts/`

### `/about/`

Max purpose: operator story and methodology only.

Top 3 sections:
1. Operator profile.
2. Methodology transfer.
3. AI labor/human governance method.

Move off page:
- Full legacy boundary.
- Technical registries.
- Claim firewall.
- Proof ceiling details.

Global warning that remains:
- "Methodology does not promote proof claims."

Tooltip/badge/link instead of paragraph:
- AI is labor, governance is authority.
- Current ceiling.
- Legacy reference.

Recommended CTA targets:
- `/about/methodology/`
- `/about/hawkinsops-to-hawkinsoperations/`
- `/proof/`
- `/legacy/`

### `/start/`

Max purpose: reviewer route selector only.

Top 3 sections:
1. Route selector.
2. First-click cards.
3. External repo links.

Move off page:
- Recent governed work.
- Claim firewall.
- Phase 2 details.

Global warning that remains:
- "Start is navigation only."

Tooltip/badge/link instead of paragraph:
- Current ceiling.
- Rendering-only.

Recommended CTA targets:
- `/proof/`
- `/pipeline/`
- `/artifacts/`
- `/architecture/`
- `/controls/`

### `/controls/`

Max purpose: control status and governance controls only.

Top 3 sections:
1. Claim firewall.
2. Promotion/control gates.
3. Control route links.

Move off page:
- Proof records.
- Architecture maps.

Global warning that remains:
- "Controls block unsupported wording; they do not promote claims."

Tooltip/badge/link instead of paragraph:
- Current ceiling.
- Public-safe blocked status.
- Rendering-only.

Recommended CTA targets:
- `/proof/`
- `/architecture/claim-firewall/`
- `/architecture/repo-authority-map/`

### `/legacy/`

Max purpose: HawkinsOps legacy boundary only.

Top 3 sections:
1. HawkinsOps reference context.
2. HawkinsOperations current boundary.
3. What legacy cannot prove.

Move off page:
- Operator story.
- Technical registries.

Global warning that remains:
- "Legacy reference does not promote current claims."

Tooltip/badge/link instead of paragraph:
- LEGACY_REFERENCE.
- CURRENT_EVIDENCE_REQUIRED.

Recommended CTA targets:
- `/about/hawkinsops-to-hawkinsoperations/`
- `/proof/`

## Copy Deletion Candidates

Delete duplicate parent-page paragraphs when they restate:
- Website rendering is not proof after a badge already states it.
- The public ceiling after a status row already states it.
- Blocked runtime/signal/public-safe claims after a link to `/proof/` or `/controls/`.
- Full proof-pack explanation outside `/proof/proof-pack-001/`.
- Full validation registry explanation outside `/validation/`.
- Full platform contract explanation outside `/platform/contracts/`.

## Claim Boundary

Compression must not weaken the blocked-claim boundary. It should reduce repeated paragraphs while keeping the claim ceiling visible and easier to inspect.
