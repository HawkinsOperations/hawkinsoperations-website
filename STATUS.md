# Status

## Current Milestone

Framework migration from Astro to Next.js (App Router) underway as PR1. Visual design unchanged in this PR; the migration preserves all 15 prior public routes and adds `/proof-loop/`. The new `config/**` authority layer is introduced as re-exports from `src/data/**` to enable a future redesign PR without churn.

## Next Gate

After Cloudflare Pages preview deploy confirms `dist/` parity, plan the visual redesign PR using the new reviewer-routing direction (Six Truth Surfaces lane stack, Proof Promotion State Machine, Repository Authority DAG, Claim Firewall). All future visual changes must continue to keep the claim ceiling at `CONTROLLED_TEST_VALIDATED` and public-safe at `NOT_PUBLIC_SAFE`.

## Blocking Risks

- Public wording must continue to preserve the CONTROLLED_TEST_VALIDATED ceiling.
- Website rendering must not be treated as proof.
- Blocked claims must stay in blocked / not-claimed / claim-firewall context.
- Cloudflare Pages publish-dir is preserved as `dist`; if the Pages project auto-detects Next.js and changes settings, the preview deploy must be verified before merge.
