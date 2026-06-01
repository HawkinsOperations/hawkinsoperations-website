# HawkinsOperations Website

HawkinsOperations website is the render-only reviewer cockpit for public navigation, claim-boundary summaries, and proof-route handoffs; it is not proof authority.

Owner identity: Raylee Hawkins, Detection Engineer | SOC Automation | Detection-as-Code | Security Automation.

Official links: [Raylee Hawkins on LinkedIn](https://www.linkedin.com/in/raylee-hawkins) | [Raylee Hawkins on GitHub](https://github.com/raylee-hawkins) | [HawkinsOps detection engineering portfolio](https://hawkinsops.com) | [HawkinsOperations GitHub organization](https://github.com/HawkinsOperations) | [RayleeOps public operating journal](https://rayleeops.com)

## What This Repo Is

This repository renders the public website for HawkinsOperations reviewer navigation. It presents static routes, typed public data, claim ceilings, blocked-claim boundaries, and links into the repositories that own source, validation, and proof records.

The site can help a reviewer find the right door quickly. It does not create detection truth, runtime truth, signal truth, evidence truth, public proof, or external-use approval.

## Reviewer Routing

Reviewer routing is separate from build and deployment.

- The homepage cockpit routes reviewers to Proof, Artifacts, Detections, AI Security, About, and source inspection.
- `src/data/reviewerRoutes.ts` defines bounded reviewer paths for validation review, proof/verifier review, platform/SOAR contract review, and AI governance boundary review.
- The public pages route reviewers toward owned repositories and proof records; they do not replace those records.
- The activity ledger is a hand-maintained static snapshot, not a live GitHub feed or runtime dashboard.
- The receipt and lifetime-ledger displays are reviewer summaries only. The proof repository owns the lifetime-ledger summary and proof bundle; the website renders bounded counts, badges, and route links without promoting runtime, signal, public-safe runtime proof, SOCaaS, production, autonomous SOC, disposition, or case-closure claims.

## Public Claim Data Layer

`src/data/*` is the typed public claim-boundary data layer for this static site.

Current public data modules include reviewer routes, proof records, receipt/activity ledgers, blocked-claim data, navigation links, validation registry content, artifact summaries, truth surfaces, and repository routing metadata. These files control what the website renders; they are not proof authority by themselves.

Data-layer rules:

- Keep every rendered claim at or below its approved ceiling.
- Treat repo source, validation output, proof records, runtime evidence, and website pages as separate truth surfaces.
- Use `CONTROLLED_TEST_VALIDATED`, `NOT_PUBLIC_SAFE`, `BLOCKED`, and other bounded labels only where the underlying data already supports them.
- Do not infer live deployment, signal observation, public-safe runtime proof, production readiness, customer use, autonomous SOC authority, AI-approved disposition, analyst-approved disposition, containment approval, suppression approval, or case closure from a rendered page.
- Keep lifetime-ledger wording tied to the proof-owned summary/bundle and its explicit render boundary.

## Build and Deploy

- Framework: Next.js (App Router) + Tailwind CSS + TypeScript
- Output mode: static export (`output: "export"` in `next.config.mjs`)
- Primary deploy target: Cloudflare Pages
- Build command: `npm run build` (runs `next build` then moves `out/` to `dist/`)
- Output directory: `dist`
- Workers required: no
- SSR required: no
- Image optimization: disabled (`images.unoptimized: true`)
- Fake dynamic APIs: none

Cloudflare Pages should build from the repository root and publish `dist`. No dashboard setting change is required for this migration: the `finalize-dist.mjs` postbuild script renames Next.js's `out/` directory to `dist/` to preserve the existing publish path.

A successful build or deployment proves only that the static website can be rendered and published. It does not prove a detection fired, a runtime route executed, a signal was observed, evidence is public-safe, or any claim is authorized for external use beyond its approved wording.

## Proof Boundary

Website rendering is not proof.

- Website repo: public rendering and reviewer routing only
- Detection truth: `hawkinsoperations-detections`
- Validation truth: `hawkinsoperations-validation`
- Platform/runtime truth: internal platform routes; not public website authority
- Proof and claim linkage: `hawkinsoperations-proof`
- Organization-level successor governance: `https://github.com/HawkinsOperations`

Website pages may summarize approved claim ceilings and route reviewers to public proof records. Page text does not authorize stronger external-use claims, does not promote proof status, and does not make raw/private evidence public-safe.

## HawkinsOperations Closed SOC Loop 001

- GitHub Projects: pending access / attachment. Current org project route: https://github.com/orgs/HawkinsOperations/projects
- Reviewer entry point: https://github.com/HawkinsOperations/.github/blob/main/profile/START_HERE.md
- Repository authority map: https://github.com/HawkinsOperations/.github/blob/main/architecture/REPO_AUTHORITY_MAP.md
- HO-DET-001 public proof route: https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/main/proof/records/HO-DET-001.md
- Current HO-DET-001 public label: CONTROLLED_TEST_VALIDATED
- HawkinsOperations is the governed successor system; HawkinsOps and older surfaces are legacy/reference unless revalidated.
- Sprint thesis: speed with enforcement through deterministic validation, CI/CD gates, evidence records, proof contracts, and bounded public claims.
- AI is labor. Governance is authority.
- Build loud. Verify hard. Claim tight. Ship receipts.
- Website/public pages route to proof records; they do not replace proof.
- Platform runtime contract enforcement exists for HO-DET-001 through an internal platform route as a non-promotional guardrail.
- Platform contract status: it preserves `CONTROLLED_TEST_VALIDATED`, `NOT_PUBLIC_SAFE`, and `BLOCKED`; it does not prove runtime-active status, signal-observed public proof, public-safe runtime proof, live Splunk fired, Splunk-proven Runtime Signal 001, Cribl-routed status, Wazuh-routed public proof, production-ready status, fleet-wide coverage, AWS-live status, autonomous SOC operation, AI-approved disposition, or analyst-approved disposition.
- Next gates: evidence-backed runtime or signal promotion only after separate proof review, privacy review, stale review, wording review, and Raylee approval.

## Blocked Claims

This repository does not claim: runtime-active, signal-observed, evidence-linked public proof, public-safe runtime proof, live Splunk firing, production triage, analyst-approved disposition, private model host runtime-active, Cribl-routed, Wazuh-routed, AWS-live, autonomous SOC, production-ready SOC, fleet-wide deployment, customer deployment, case closure authority, or AI-approved disposition.

## Scope

- Render-only website source
- Reviewer routing between public surfaces
- Repository map and system overview
- Links to successor source, validation, and proof repositories
- Static public claim-boundary routes for reviewer inspection
- Bounded cockpit, activity-ledger, receipt-ledger, and lifetime-ledger presentation

## Out of Scope

- Host-level operational state
- Internal cutover/control docs
- Any non-public secrets or environment details
- Detection implementation authority
- Runtime, signal, evidence, publication approval, or external reuse authority
- Live telemetry, live GitHub status, live SIEM/SOAR state, or deployment-state claims

## Repository Contract

- Keep language clear, technical, and evidence-backed.
- Avoid internal plumbing details that do not help external readers.
- Link claims to source/proof artifacts rather than undocumented assertions.
- Do not claim that website text proves runtime behavior, validation, signal observation, evidence linkage, or external-use approval.
- Treat `src/data/*` as render input for bounded public pages, not as proof authority.

## Related Repositories

- Detections: `https://github.com/HawkinsOperations/hawkinsoperations-detections`
- Validation: `https://github.com/HawkinsOperations/hawkinsoperations-validation`
- Platform/runtime contracts: internal platform route; not a public reviewer link
- Proof: `https://github.com/HawkinsOperations/hawkinsoperations-proof`
