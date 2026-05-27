# Website Page Role Matrix

Status: planning only  
Purpose: define one exact job per parent page before design implementation

## Parent Page Matrix

| Route | Exact job | One-sentence contract | Maximum 3 primary sections | Child routes to point to | Visible proof boundary |
|---|---|---|---|---|---|
| `/` | reviewer cockpit only | The homepage gives a fast executive route into what exists, what is proven, what is blocked, and where to inspect. | Hero status and first clicks; inspection route cards; compact shipped-work strip | `/proof/`, `/proof/ho-det-001/`, `/proof/proof-pack-001/`, `/artifacts/evidence-bay/`, `/pipeline/`, `/architecture/` | Current ceiling: CONTROLLED_TEST_VALIDATED. Website rendering is not proof. |
| `/pipeline/` | operational flow only | Pipeline shows the controlled path from repo change to validation, proof record, scanner, and website rendering. | End-to-end flow; gate cards; receipt route cards | `/validation/`, `/platform/contracts/`, `/proof/`, `/proof/proof-pack-001/` | Pipeline evidence stays within its stated scope and does not prove runtime or signal truth. |
| `/proof/` | proof authority and claim ledger only | Proof owns claim ceilings, proof records, supported claims, blocked claims, and promotion gates. | Ceiling and claim ledger; proof records/status index; promotion and pack route cards | `/proof/ho-det-001/`, `/proof/proof-pack-001/`, `/proof/runtime-proof-factory/`, `/proof/governance-saves/`, `/validation/`, `/controls/` | Proof records authorize only stated ceilings. Stronger claims require separate promotion. |
| `/artifacts/` | artifact inventory only | Artifacts is the filterable inventory of reviewer receipts and artifact cards. | Evidence Bay; anchor artifacts; recent governed artifacts by surface | `/artifacts/evidence-bay/`, `/artifacts/[slug]/`, `/proof/`, `/pipeline/`, `/architecture/` | Artifact cards route to receipts; rendered cards are not proof by themselves. |
| `/architecture/` | system map and authority surfaces only | Architecture explains repo authority, truth surfaces, promotion surfaces, and control planes. | Repo authority; truth surfaces; control plane links | `/architecture/truth-surfaces/`, `/architecture/repo-authority-map/`, `/architecture/claim-firewall/`, `/platform/contracts/` | Architecture explains separation; it does not prove runtime activity. |
| `/about/` | operator story and methodology only | About explains Raylee's operator profile, methodology, and quality-control transfer. | Operator profile; methodology transfer; AI labor/human authority method | `/about/methodology/`, `/about/hawkinsops-to-hawkinsoperations/`, `/proof/`, `/artifacts/`, `/legacy/` | Operator story explains method and judgment; it does not promote proof claims. |
| `/start/` | reviewer route selector only | Start helps reviewers choose the fastest inspection path without duplicating destination content. | Route selector; first-click cards; external repo links | `/proof/`, `/pipeline/`, `/artifacts/`, `/architecture/`, `/controls/`, `/architecture/repo-authority-map/` | Start routes are navigation only and do not author proof. |
| `/controls/` | control status and governance controls only | Controls owns blocked wording, claim firewall, and promotion-control visibility. | Claim firewall; promotion/control gates; repo/proof control links | `/architecture/claim-firewall/`, `/proof/`, `/architecture/repo-authority-map/` | Controls block unsupported wording; controls do not promote claims by themselves. |
| `/legacy/` | HawkinsOps legacy boundary only | Legacy explains HawkinsOps as reference context and HawkinsOperations as current governed work. | HawkinsOps context; HawkinsOperations current boundary; legacy cannot-prove rules | `/about/hawkinsops-to-hawkinsoperations/`, `/proof/` | Legacy material does not automatically promote current HawkinsOperations claims. |

## Page-Level Stay / Move / Compress / Delete

### `/`

Must stay:
- Compact hero status row.
- First-click links to proof, artifacts, pipeline, architecture, and GitHub org.
- One-line AI labor/human authority boundary.

Must move:
- ATT&CK/Kill Chain map to `/detections/`.
- Repo DAG to `/architecture/repo-authority-map/`.
- Truth surfaces to `/architecture/truth-surfaces/`.
- Claim firewall to `/controls/`.
- Full evidence bay language to `/artifacts/evidence-bay/`.

Must become compact badge or link card:
- "Website rendering is not proof."
- "Runtime/signal/public-safe blocked."
- Controlled-test validation count.

Delete as duplicate:
- Repeated proof-pack explanations after the hero route card.
- Full promotion ladder detail.

### `/pipeline/`

Must stay:
- Operational flow and gate sequence.
- GitHub Actions/check context.
- Receipt flow as a route map.

Must move:
- Full validation registry to `/validation/`.
- Platform contract detail to `/platform/contracts/`.
- Proof Pack 001 detail to `/proof/proof-pack-001/`.
- LLM/GPU contract detail to `/platform/contracts/`.

Must become compact badge or link card:
- Public ceiling.
- Blocked runtime/signal status.
- Platform contract dependency.

Delete as duplicate:
- Proof-ledger boundary panels.
- Long proof-pack release console.

### `/proof/`

Must stay:
- Public ceiling.
- Supported and blocked claim ledger.
- Proof records and proof status.
- Promotion gates.

Must move:
- Validation registry to `/validation/`.
- Artifact family matrix to `/artifacts/`.
- Platform boundaries to `/platform/contracts/`.
- Proof Pack 001 detail to `/proof/proof-pack-001/`.

Must become compact badge or link card:
- Validation dependency.
- Platform dependency.
- Rendering-only warning.

Delete as duplicate:
- Artifact inventory copy.
- Operational pipeline explanation.

### `/artifacts/`

Must stay:
- EvidenceBay.
- Artifact card metadata.
- Recent governed artifact links.

Must move:
- GPU/factory details to `/platform/contracts/` or `/proof/runtime-proof-factory/`.
- Coverage matrix to a child route if retained.
- Proof doctrine paragraphs to `/proof/` or `/controls/`.

Must become compact badge or link card:
- "Each artifact keeps its own ceiling."
- "Rendered cards are not proof."

Delete as duplicate:
- Long proof-pack explanations.
- Proof-ledger restatements.

### `/architecture/`

Must stay:
- System map.
- Truth-surface separation.
- Repo/control route links.

Must move:
- Repo inventory to `/architecture/repo-authority-map/`.
- Claim firewall to `/controls/` or `/architecture/claim-firewall/`.

Must become compact badge or link card:
- STATIC_SITE / RENDERING_ONLY.
- Source truth is not runtime truth.

Delete as duplicate:
- Proof-record lists.
- Validation registry tables.

### `/about/`

Must stay:
- Operator profile.
- Methodology transfer from quality control.
- AI labor/human authority methodology.

Must move:
- Full legacy boundary to `/legacy/`.
- Claim firewall to `/controls/`.
- Technical registries to their owner pages.

Must become compact badge or link card:
- Public ceiling.
- AI labor/human authority.
- Legacy reference.

Delete as duplicate:
- Full blocked-claim list.
- Full proof-ceiling paragraph.

### `/start/`

Must stay:
- ReviewRouteSelector.
- Intake cards.
- External repo route links.

Must move:
- Recent governed work snapshot to `/artifacts/`.
- Phase 2 detailed cards to destination pages.
- Claim firewall to `/controls/`.

Must become compact badge or link card:
- Current ceiling.
- Rendering-only.

Delete as duplicate:
- Full ClaimFirewallPanel.
- Repeated proof, validation, platform paragraphs.

### `/controls/`

Must stay:
- ClaimFirewall.
- Public claim standard.
- Promotion-control links.

Must move:
- Architecture explanation to `/architecture/`.
- Proof-record detail to `/proof/`.

Must become compact badge or link card:
- Current ceiling.
- Public-safe state.
- Rendering-only.

Delete as duplicate:
- Proof-ledger descriptions.

### `/legacy/`

Must stay:
- HawkinsOps reference boundary.
- Current evidence requirement.
- Legacy reference link.

Must move:
- Operator story to `/about/`.
- Technical architecture to `/architecture/`.

Must become compact badge or link card:
- LEGACY_REFERENCE.
- CURRENT_EVIDENCE_REQUIRED.

Delete as duplicate:
- Current proof registry content.

## Claim Boundary

This role matrix defines navigation and page responsibility only. It does not promote public proof, runtime proof, signal proof, production readiness, autonomous authority, analyst approval, AI approval, fleet scope, customer deployment, or public-safe status.
