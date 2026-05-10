# ClientRouter Removal Live Performance Measurement

Date: 2026-05-10

## Scope

This receipt records the live deployed measurement taken after PR #17:

- PR: HawkinsOperations/hawkinsoperations-website#17
- Merge commit: `193f2795f5569c9967805810e047e491be6e0fdb`
- Change: removed the unused Astro ClientRouter import and global render from `BaseLayout.astro`

This is a live deployed measurement of asset delivery and transfer size. It does not promote runtime, signal, detection, governance, public-safe, production-wide, evidence, or broader performance claims.

Proof ceiling: `PERFORMANCE_TUNING_MEASURED_LIVE_DEPLOY_ONLY`

## Method

The live routes were measured with browser network cache disabled through Chrome DevTools Protocol. No HAR, trace, screenshot, or other measurement artifact file was created.

The comparison is reasonably method-aligned because both the prior post-BrandMark measurement and this measurement used cache-disabled CDP. The transfer delta is still measured single-run live data and should be treated as such.

## Deployment Readback

- `origin/main`: `193f2795f5569c9967805810e047e491be6e0fdb`
- Live deployed site reflected PR #17 during measurement.
- ClientRouter JS requests: 0
- `script[src*="ClientRouter"]`: 0
- Astro transition meta tags: 0
- Live HTML contained `ClientRouter`: false
- Live HTML contained `astro-view-transitions-enabled`: false
- Live HTML contained `astro-view-transitions-fallback`: false
- BrandMark still served AVIF on all measured routes.

## Live Measurement Results

| Route | Total transfer, CDP encoded | DOMContentLoaded | FCP | JS requests | ClientRouter requests | BrandMark |
| --- | ---: | ---: | --- | ---: | ---: | --- |
| `/` | 195,728 bytes / 191.14 KiB | 301 ms | UNMEASURED | 2 | 0 | AVIF |
| `/proof/` | 168,473 bytes / 164.52 KiB | 224 ms | UNMEASURED | 2 | 0 | AVIF |
| `/artifacts/` | 169,113 bytes / 165.15 KiB | 457 ms | UNMEASURED | 2 | 0 | AVIF |

## Prior Comparison

Prior post-BrandMark live CDP comparison:

| Route | Prior transfer | Current transfer | Delta |
| --- | ---: | ---: | ---: |
| `/` | 202,094 bytes | 195,728 bytes | -6,366 bytes |
| `/proof/` | 174,072 bytes | 168,473 bytes | -5,599 bytes |
| `/artifacts/` | 175,406 bytes | 169,113 bytes | -6,293 bytes |

Prior known ClientRouter asset:

- Raw: 15,849 bytes
- Gzip: 5,421 bytes
- Brotli: 4,881 bytes

The measured transfer deltas are consistent with removing the prior ClientRouter asset and associated request overhead, but remain single-run live data.

## Explicitly Unmeasured

- First-contentful-paint remained UNMEASURED because it was not exposed by the browser performance timing or CDP performance metrics in the measurement session.
- Production-wide and user-population impact remain UNMEASURED.
- Other browsers and non-AVIF fallback behavior remain UNMEASURED.
- No runtime, signal, detection, governance, public-safe, production-wide, evidence, or broader performance promotion is claimed by this receipt.
