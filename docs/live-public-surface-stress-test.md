# Live Public Surface Stress Test

Date: 2026-06-17

Production inspected: `https://hawkinsoperations.com/`

Routes inspected:

- `/`
- `/hoxline/`
- `/proof/`
- `/artifacts/`
- `/detections/`
- `/ai-security/`
- `/about/`

Browser note: in-app browser screenshot tooling was unavailable (`iab` browser unavailable). This audit uses production HTML/text-density inspection plus source-section review. The legacy/original public reference surfaced from About is `https://hawkinsops.com/`; it was treated as read-only historical comparison.

No-proof-promotion statement: this report is a visual and public-status rendering audit only. Website rendering is not proof. Generated public status is a snapshot/rendering input only. Proof repo remains proof authority; platform, validation, detections, Hoxline, `.github`, and website surfaces keep separate authority boundaries.

## Route-by-route table

| Route | Page title | Current top nav | Major sections | Hardcoded metrics/statuses visible | Current feel | Density/design risk | Keep | Move later | Cut later |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | HawkinsOperations | Home, Hoxline, Proof, Artifacts, Detections, AI Security, About | Command-center hero, Hoxline preview, V1/V2 strip, current proof spine, proof loop, attack coverage, reviewer mode, public doors, Governance Saves, artifacts bridge, trust boundary | `72`, `31`, `106`, `8`, `0`; `CONTROLLED_TEST_VALIDATED`; rendering boundary | Cinematic mission briefing drifting into proof/metric wall | Home repeats Hoxline module map, Proof boundary, Evidence receipt wall, Governance Saves, metrics, route cards | Mission hero, compact generated metric rail, route selection | Proof loop depth, artifact receipt wall, detailed Governance Saves | Duplicate proof sermons and repeated caveats during refactor |
| `/hoxline/` | Hoxline \| HawkinsOperations | Same | Visual intelligence hero, engine room, capability grid, loop orbit, claim problem, product thesis, controls, demo spotlight, claim matrix, authority architecture, reviewer path, gated panel, trust boundary, next gate | `GAUNTLET_V0`, `CONTROLLED_TEST_VALIDATED`, runtime/signal constants, `11`, `7`, `2`, `53`, `23`, `17`, `8` | Product console plus card-grid wall | Strong product identity, but repeats proof/authority/evidence explanations and receipt-wall patterns | Product loop, demo spotlight, allowed/blocked comparison | Detailed authority map and reviewer path depth | Repeated proof intro blocks after Evidence consolidation |
| `/proof/` | Proof \| HawkinsOperations | Same | Proof vault hero, evidence/proof terminal, evidence bay, Governance Saves, lifetime ledger, runtime boundary, proof pack routes | `72`, `49`, `106`, `8`, `31`, `0`, `CONTROLLED_TEST_VALIDATED`, `RENDERING_ONLY` | Evidence room / proof-boundary wall | Correct owner for authority, but overlaps heavily with Artifacts and Home proof spine | Proof records, Proof Pack, runtime boundary, claim ceiling | Artifact browsing into future Evidence | Duplicate Home/Hoxline story sections |
| `/artifacts/` | Artifacts \| HawkinsOperations | Same | Evidence bay hero, receipt wall, artifact filters/cards, reviewer paths, family matrix/coverage | `CONTROLLED_TEST_VALIDATED`, `RENDERING_ONLY`, `NOT_PUBLIC_SAFE`, runtime/signal blocked labels, artifact counts | Evidence room / receipt wall | Strong receipt identity, but public intent overlaps with Proof and repeats boundary doctrine | Receipt cards, does-prove/does-not-prove split | Merge public intent with Proof into Evidence | Duplicate proof-authority intro once Evidence exists |
| `/detections/` | Detections \| HawkinsOperations | Same | Detection operations cockpit, source-to-wording route, ATT&CK/Kill Chain board, validation/proof status, source links | `8`, `49`, `106`, `31`, `0`, detection row fixture counts, `CONTROLLED_TEST_VALIDATED`, `NOT_PUBLIC_SAFE` | Detection workbench plus metric dashboard wall | Good workbench base; proof caveats and Hoxline explanation can dominate source inspection | Catalog rows, ATT&CK mapping, validation status, source links | Long proof/Hoxline explanations | Emotional blocked-claim emphasis if repeated elsewhere |
| `/ai-security/` | AI Security \| HawkinsOperations | Same | AI support hero, support/authority split, AI workflow, evidence ceiling/blocked claims, Hoxline visual intelligence, support-only board | `public_safe false`, `human_review_required`, `CONTROLLED_TEST_VALIDATED`, runtime/signal/public-safe blocked language | Support-only AI model drifting into duplicate explainer | Repeats Hoxline loop and proof boundary; likely not a primary nav page long-term | Support-only AI model lines | Reusable Home/Hoxline/About lines | Standalone duplicate route after redistribution |
| `/about/` | About \| HawkinsOperations | Same | Operator portrait hero, public ceiling strip, V1-to-V2 bridge, V2 authority strip, failure mode, operator profile/story | `CONTROLLED_TEST_VALIDATED`, `RENDERING_ONLY`, `NOT_PUBLIC_SAFE`, `72`, `49`, `106`, `31`, `8`, `0` | Operator story plus metric/proof wall | Strong personal story gets interrupted by metric/proof wall | Raylee/operator story, manufacturing QC bridge, legacy/current boundary | V2 metrics and proof wall to Home/Evidence | Duplicate proof boundary depth |

## Page-overlap matrix

Legend: `H` high overlap, `M` medium overlap, `L` low overlap. Repeated concept examples are listed in each cell.

| Page pair | Overlap | Repeated concepts |
| --- | --- | --- |
| Home x Hoxline | H | Hoxline loop explanation, Claim Firewall/Claim Authority, metric cards, status chips, route cards, proof ceiling, reviewer path |
| Home x Proof | H | Proof-boundary wording, "does not prove" language, proof ceiling, metrics, receipt/proof route cards, Governance Saves |
| Home x Artifacts | H | Receipt/artifact cards, evidence browsing, rendering-only boundary, route cards, reviewer path |
| Home x Detections | M | Detection activity counts, ATT&CK orientation, proof ceiling, runtime/signal/public-safe blocked language |
| Home x AI Security | H | AI support-only explanation, Claim Firewall, proof ceiling, human review required, repeated reviewer paths |
| Home x About | H | V1/V2 transition, metric rail, AI/evidence authority line, proof boundary |
| Hoxline x Proof | H | Claim authority, proof ceiling, runtime/signal blocked language, evidence/proof authority separation, reviewer path |
| Hoxline x Artifacts | M | Output artifact wall, receipt routes, does-not-prove caveats, rendering-only boundary |
| Hoxline x Detections | H | HO-DET-001 flow, controlled validation, ATT&CK/source context, proof ceiling, blocked public-safe/runtime/signal language |
| Hoxline x AI Security | H | AI is support-only, Hoxline loop, Claim Firewall, human review, public-safe blocked language |
| Hoxline x About | M | AI/evidence authority, Hoxline control plane, proof-governed successor story |
| Proof x Artifacts | H | Evidence bay, proof records, receipt cards, proof packs, runtime boundary, does-not-prove wording |
| Proof x Detections | M | Validation counts, proof ceilings, detection proof routes, runtime/signal blocked language |
| Proof x AI Security | M | Proof ceiling, human review, AI authority blocked, website rendering boundary |
| Proof x About | H | Proof-governed successor, metrics, website rendering boundary, public ceiling strip |
| Artifacts x Detections | M | Detection rows route to artifacts/receipts, validation status, proof ceiling, public-safe blocked language |
| Artifacts x AI Security | M | Evidence/authority split, AI support boundary, receipt cards and proof caveats |
| Artifacts x About | M | Legacy/current boundary via receipt framing, public ceiling strip, website rendering boundary |
| Detections x AI Security | M | AI/workflow support, validation gate, Claim Firewall, blocked public-safe/runtime/signal language |
| Detections x About | M | Manufacturing-to-detection governance bridge, source/validation/proof separation, metrics |
| AI Security x About | H | AI support-only model, human review authority, failure mode, proof-governed successor story |

## Repeated concept ownership

| Concept | Pages found | Owner page | Risk | Future treatment |
| --- | --- | --- | --- | --- |
| Proof-boundary wording | Home, Hoxline, Proof, Artifacts, Detections, AI Security, About | Evidence / future Proof+Artifacts | REDUNDANCY_RISK | Keep on owner; compress into one sentence elsewhere; link to owner |
| "does not prove" language | Home, Hoxline, Proof, Artifacts, Detections, About | Evidence / future Proof+Artifacts | REDUNDANCY_RISK | Keep on owner and receipt cards; move duplicates to details |
| Claim Firewall / Claim Authority explanation | Home, Hoxline, Proof, Detections, AI Security | Hoxline | REDUNDANCY_RISK | Keep on Hoxline; link/card elsewhere |
| Hoxline loop explanation | Home, Hoxline, Detections, AI Security | Hoxline | REDUNDANCY_RISK | One full loop maximum; replace duplicates with owner card |
| AI is support-only explanation | Home, Hoxline, AI Security, About | AI Security until redistributed | REDUNDANCY_RISK | Keep concise doctrine; move details to About/Hoxline later |
| Proof ceiling explanation | Home, Hoxline, Proof, Artifacts, Detections, AI Security, About | Evidence / future Proof+Artifacts | REDUNDANCY_RISK | Keep on owner; use badges elsewhere |
| Runtime/signal/public-safe blocked language | Home, Hoxline, Proof, Artifacts, Detections, AI Security, About | Evidence / future Proof+Artifacts | REDUNDANCY_RISK | Keep as doctrine; shorten to badge/details elsewhere |
| Metric cards | Home, Proof, Detections, About | Home for fast credibility; Evidence for ledger detail | REDUNDANCY_RISK | Generated snapshot rail on Home; detailed ledger in Evidence |
| Status chips | Home, Hoxline, Proof, Artifacts, Detections, AI Security, About | Page-specific only | REDUNDANCY_RISK | Human labels in primary copy; raw constants in metadata/details |
| Route cards | Home, Proof, Artifacts, Detections, About | Home | REDUNDANCY_RISK | Home owns route selection; replace duplicate route grids with compact links |
| Receipt/artifact cards | Home, Proof, Artifacts | Evidence / future Proof+Artifacts | REDUNDANCY_RISK | Keep on Evidence; Home gets one teaser card |
| Dense dark panels | All pages | None; page-specific primitive owner | VISUAL_MONOTONY_RISK | Replace with mission strip, console, table/workbench, timeline, receipt wall by page |
| Grid-of-cards sections | All pages | None; page-specific primitive owner | VISUAL_MONOTONY_RISK | Reduce consecutive grids; use tables, flow diagrams, accordions, rails |
| Long paragraph blocks | Home, Hoxline, Proof, AI Security, About | Page owner for story only | REDUNDANCY_RISK | Two paragraphs max before visual break |
| Repeated CTAs | Home, Hoxline, Proof, Artifacts, About | Home for route choice; owner page for action | REDUNDANCY_RISK | One primary CTA cluster per page |
| Reviewer path sections | Home, Hoxline, Artifacts, Proof | Home for lens choice; Evidence for proof audit | REDUNDANCY_RISK | Hoxline gets demo path only; Evidence gets proof audit path |

## REDUNDANCY_RISK decision table

| Concept | Pages found | Owner page | Current problem | Future treatment |
| --- | --- | --- | --- | --- |
| Proof-boundary language | Home, Hoxline, Proof, Artifacts, Detections, AI Security, About | Evidence / future Proof+Artifacts | The same ceiling doctrine competes with the product and operator story on every page. | Keep on owner page; compress elsewhere into one sentence; link to owner page; move long caveats to details/accordion. |
| "Does not prove" language | Home, Hoxline, Proof, Artifacts, Detections, About | Evidence / future Proof+Artifacts | Repetition makes the public site feel defensive before it shows accomplishments. | Keep on receipt/proof owner; replace elsewhere with "what exists" lead plus compact boundary disclosure. |
| Claim Firewall / Claim Authority explanation | Home, Hoxline, Proof, Detections, AI Security | Hoxline | Claim Authority reads like a site-wide doctrine instead of a product capability. | Keep full explanation on Hoxline; use a route card or one-line source link elsewhere. |
| Hoxline loop explanation | Home, Hoxline, Detections, AI Security | Hoxline | Multiple loop descriptions dilute the Hoxline front door and make Home longer than needed. | Keep one full loop on Hoxline; Home gets a compact product tile; Detections links to source-owned route. |
| AI support-only explanation | Home, Hoxline, AI Security, About | AI Security temporarily | The support-only model is important, but it repeats the same authority line in several contexts. | Keep until demotion; move best lines into Home/Hoxline/About; cut standalone duplication later. |
| Proof ceiling explanation | Home, Hoxline, Proof, Artifacts, Detections, AI Security, About | Evidence / future Proof+Artifacts | Raw ceiling/status labels crowd primary public copy. | Human labels in primary copy; raw constants only in technical metadata/details. |
| Runtime/signal/public-safe blocked language | Home, Hoxline, Proof, Artifacts, Detections, AI Security, About | Evidence / future Proof+Artifacts | Blocked-state language dominates pages that should lead with inspectable work. | Keep as doctrine; convert duplicates into badges/details; cut repeated walls. |
| Metric rails | Home, Proof, Detections, About | Home fast credibility, Evidence ledger detail | Counts are repeated in ways that can drift stale or feel like dashboard filler. | Generated snapshot on Home; detailed source-owned ledger in Evidence; links elsewhere. |
| Status chips | All major pages | Page-specific only | Same chip grids make routes feel visually interchangeable. | Keep page-specific chips; use rings/console/tables on other pages. |
| Route cards and reviewer CTAs | Home, Hoxline, Proof, Artifacts, About | Home route selection, Evidence proof audit | Route selection appears in too many places, creating navigation fatigue. | Home owns route choice; owner pages keep one action console. |


## Hardcoded metric inventory

| Metric/status | Current public locations | Foundation treatment |
| --- | --- | --- |
| `72 controls fired` | Home, Proof, About, Governance Saves components | Added to generated public status snapshot; homepage counter consumes generated value |
| `49 validation fires` | Home route steps, Proof, Detections, About | Added to generated public status snapshot; homepage route step/proof spine consume generated value |
| `106 validation cases` | Home, Hoxline, Proof, Detections, About | Added to generated public status snapshot; homepage counter/proof spine consume generated value |
| `8 proof records` | Home, Proof, Detections, About | Added to generated public status snapshot; homepage counter/proof spine consume generated value |
| `31 blocked claims` | Home, Proof, Detections, About | Added to generated public status snapshot; homepage counter/proof spine consume generated value |
| `6 governed cases` | Home proof spine, Proof lifetime ledger | Added to generated public status snapshot; homepage proof spine consumes generated value |
| `0 public-safe` / `NOT_PUBLIC_SAFE` | Home, Proof, Artifacts, Detections, AI Security, About | Added to generated public status snapshot; homepage shows generated count and Hoxline shows human status labels |
| `CONTROLLED_TEST_VALIDATED` | All major routes | Human label provided in generated public status; raw constant remains technical metadata/detail |
| Hoxline pack counts: `11`, `7`, `2`, `53`, `23`, `17`, `8` | Home/Hoxline visual intelligence modules | Left as labeled historical point-in-time Hoxline visual data pack; future generation should move pack metrics behind generated source files |

## Repeated phrase table

| Phrase | Pages found | Owner page | Future treatment |
| --- | --- | --- | --- |
| Website rendering is not proof. | Home, Proof, Artifacts, About, Claim/field-note routes | Evidence / future Proof+Artifacts | Keep as doctrine, shorten elsewhere, link to proof boundary |
| AI is not the authority. Evidence is. | Home, Hoxline, AI Security, About | AI Security until redistributed; then Hoxline/About | Shorten and move to badges/one-line doctrine |
| runtime-active remains blocked / runtime not promoted | Home, Hoxline, Proof, Artifacts, Detections, AI Security, About | Evidence / future Proof+Artifacts | Replace duplicate prose with badge/details |
| signal-observed remains blocked / signal missing evidence | Home, Hoxline, Proof, Artifacts, Detections, AI Security | Evidence / future Proof+Artifacts | Replace duplicate prose with badge/details |
| public-safe remains blocked / not public-safe | Home, Hoxline, Proof, Artifacts, Detections, AI Security, About | Evidence / future Proof+Artifacts | Keep as compact status label; avoid long repeated caveats |
| Claim Firewall is not proof authority | Home, Hoxline, Proof, Claim Firewall | Hoxline | Link to Hoxline/Claim Firewall owner |
| controlled validation only | Home, Hoxline, Proof, Artifacts, Detections | Detections for validation detail; Evidence for proof ceiling | Shorten outside owner pages |
| human review required | Home, Hoxline, AI Security, About | AI Security/About for governance story; Hoxline for product loop | Replace with badge where repeated |

## Visual identity recommendation table

| Page | Current feel | Target feel | Repeated elements | Keep | Compress | Move later | Cut later |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | Cinematic mission briefing plus metric/proof/card wall | Cinematic mission briefing | Metrics, proof loop, Hoxline modules, route cards, receipt cards | Mission hero, generated metric rail, route tiles | Proof boundary to one banner | Receipt wall and detailed proof loop | Duplicate Hoxline module map |
| Hoxline | Product console plus card-grid wall | Interactive product console | Authority maps, proof caveats, receipt/output cards | Loop, demo spotlight, allowed/blocked matrix | Proof caveats to one boundary strip | Evidence receipt depth | Repeated story blocks |
| Proof | Evidence room plus proof-boundary wall | Evidence authority room | Artifact wall, metrics, runtime boundary, does-not-prove | Proof records, Proof Pack, proof ceilings | Website caveat repetition | Artifact browsing into Evidence | Home/Hoxline story copy |
| Artifacts | Evidence room / receipt wall | Future Evidence receipt wall | Proof authority intro, proof ceiling, runtime boundary | Receipt cards, supports/does-not-prove | Repeated caveats | Merge with Proof intent | Duplicate proof intro |
| Detections | Detection workbench plus metric dashboard wall | Technical catalog / ATT&CK workbench | Hoxline explanation, proof caveats, blocked claims | Detection rows, ATT&CK mapping, validation status | Blocked claims to compact badges | Long proof route explanation | Emotional proof sermon |
| AI Security | Support model plus duplicate Hoxline/proof explainer | Support-only AI model | Hoxline loop, Claim Firewall, proof caveats | AI support/labor split | Proof caveats | Best lines into Home/Hoxline/About | Primary-nav standalone page later |
| About | Operator story plus metric/proof wall | Operator origin / methodology bridge | Metrics, V2 authority strip, proof boundary | Raylee story, manufacturing QC bridge, legacy/current boundary | Proof boundary | V2 metrics to Home/Evidence | Metric wall |

## Page-specific future rules

Home should route, not exhaust. It must not contain the full proof loop more than once, more than one major proof-boundary section, duplicate Hoxline module maps, or duplicate Evidence receipt walls.

Hoxline must stay product/problem/loop/demo first. It should keep one full loop visualization maximum and avoid becoming another Evidence page.

Proof and Artifacts should be treated as overlapping public intents. Prompt 4 should consolidate them into Evidence, with Proof owning authority records today and Artifacts owning receipt cards today.

Detections must feel like a source/ATT&CK workbench. It should not repeat the full Hoxline explanation or long proof sermons.

AI Security should not remain a duplicate Hoxline/proof explainer. Its best support-only AI model lines should be redistributed, then the route should be demoted from primary nav.

About must lead with Raylee/operator story and manufacturing QC bridge. It should keep proof boundary short and linked out.

## Design primitive budget and monotony risks

VISUAL_MONOTONY_RISK: dense dark panels and grid-of-cards sections appear as dominant primitives across more than three pages. Future replacements:

- Home: mission hero, compact metric rail, route tiles, one story bridge.
- Hoxline: product console, loop diagram, demo spotlight, allowed-vs-blocked comparison.
- Evidence: evidence room, receipt wall, proof record cards, runtime boundary tower.
- Detections: catalog table/cards, ATT&CK mapping, validation status rail, source links.
- About: origin story, manufacturing QC bridge, timeline/methodology ladder.

## VISUAL_MONOTONY_RISK primitive inventory

| Primitive | Pages found | Risk | Future replacement |
| --- | --- | --- | --- |
| Hero block | Home, Hoxline, Proof, Artifacts, Detections, AI Security, About | Repeated hero-plus-copy structure makes pages feel like variants of the same template. | Keep hero only where it defines a route; use compact headers on secondary routes. |
| Metric rail | Home, Proof, Detections, About | Metrics become visual filler and stale-risk surfaces. | Generated Home rail plus Evidence ledger; replace elsewhere with source chips or links. |
| Dark card grid | Home, Hoxline, Proof, Artifacts, Detections, AI Security, About | Main VISUAL_MONOTONY_RISK: square card walls flatten distinct page jobs. | Use console panels, tables, receipt walls, timelines, ladders, and asymmetric panels. |
| Proof caveat panel | Home, Hoxline, Proof, Artifacts, Detections, AI Security, About | Caveats dominate the emotional read. | One ribbon plus details/accordion on non-owner pages. |
| Receipt wall | Home, Proof, Artifacts | Evidence identity is diluted. | Move receipt wall ownership to Evidence; Home gets one ticket. |
| Route tiles | Home, Proof, Artifacts, Detections, About | Repeated CTAs make every page behave like a landing page. | Home owns route tiles; owner pages use action consoles. |
| Console panel | Home, Hoxline, Claim Firewall | Useful but should become Hoxline/product-specific where possible. | Keep command/run console on Hoxline; use source-link strip on Home. |
| Status chip grid | Home, Hoxline, Detections, AI Security | Repeated chips hide which status actually matters. | Replace some chips with rings, source strips, comparison matrices, and evidence tickets. |
| Long text block | Home, Hoxline, Proof, AI Security, About | Explainers slow reviewer orientation. | Two paragraphs max before visual/action break. |
| Warning banner | Home, Hoxline, Proof, Artifacts, AI Security | Warnings become the page personality. | Compact proof-boundary ribbon; details for expanded caveat. |

## Accomplishment-first rewrite inventory

| Page | Current caveat-heavy section | What should lead instead | Boundary treatment |
| --- | --- | --- | --- |
| Home | Current proof spine and trust-boundary areas repeat what the site cannot prove. | Generated status exists; proof records, validation counts, Governance Saves, Hoxline route, and reviewer paths are inspectable. | One generated snapshot ribbon plus a details disclosure for proof ceiling. |
| Hoxline | Trust boundary, next gate, and blocked-claim sections can overtake the product loop. | Hoxline packages HO-DET-001, emits reviewer outputs, preserves controlled scope, and routes claim decisions. | One compact boundary strip and one details drawer for stronger-claim requirements. |
| Proof | Lifetime ledger and runtime boundary can read as wall-to-wall proof caveats. | Proof records, ProofCards, Proof Pack, receipts, and source-owned ledgers are the center. | Evidence owns full boundary doctrine; use receipt-level "what it supports / what stays bounded." |
| Artifacts | Artifact cards repeat does-not-prove language across receipt browsing. | Receipts are inspectable outputs with source links, artifact families, and reviewer paths. | Collapse repeated caveats into receipt details and route-level boundary. |
| Detections | Blocked claims and proof ceiling can compete with source catalog value. | Detection source rows, ATT&CK mapping, validation status, and source inspection lead. | Compact status badges with links to Evidence/Proof. |
| AI Security | Support-only caveats repeat Hoxline/proof doctrine. | AI is labor in a governed workflow; deterministic checks and human review route authority. | Keep one support-only doctrine ribbon, then redistribute later. |
| About | V2 authority and metric strips can interrupt the operator story. | Raylee/operator origin, manufacturing QC bridge, learning arc, current/legacy boundary. | Short linked proof boundary; no metric wall. |

## Partial reduction already made in this PR

The touched Home/Hoxline areas now use generated snapshot data, human-readable status labels, a source ownership ribbon, status/action rings, compact source-link tickets, and an expandable reviewer command drawer. The Current Proof Spine keeps accomplishments visible and moves repeated proof-ceiling caveats into details disclosures.

## Next-refactor cut/move table

| Item | Owner after refactor | Action |
| --- | --- | --- |
| Proof + Artifacts public intent | Evidence | Merge into Evidence |
| AI Security primary nav item | Home/Hoxline/About reused content | Demote out of primary nav |
| Hoxline module map on Home | Hoxline | Replace with compact product route tile |
| Receipt wall on Home | Evidence | Keep one teaser/link |
| Long proof caveats across pages | Evidence | Convert to one banner/details/link |
| Metrics repeated on About/Detections | Home/Evidence generated data | Replace with links or compact status |
| Reviewer path grids | Home/Evidence | One route-selection path and one proof-audit path |

## Prompt 4 plan

Prompt 4 should be: Public Site Visual Refactor + Evidence Consolidation.

Scope:

- Simplify primary nav.
- Merge Proof + Artifacts public intent into Evidence.
- Demote AI Security out of primary nav after reusable content is placed elsewhere.
- Make Home shorter and route-oriented.
- Make Hoxline demo-first.
- Make Evidence the receipt/proof room.
- Make Detections a technical workbench.
- Make About human/story-first.
- Convert repeated caveats into compact proof-boundary components.
- Add reviewer action panels to major pages.

Do not implement Prompt 4 during this PR without explicit approval.
