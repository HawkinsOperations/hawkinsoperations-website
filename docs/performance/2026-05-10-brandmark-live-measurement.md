# BrandMark Live Performance Measurement

Date: 2026-05-10

## Scope

This receipt records the live deployed measurement taken after PR #15:

- PR: HawkinsOperations/hawkinsoperations-website#15
- Merge commit: `e64578545e4c11e0c825826e5c02d1747eed7039`
- Change: BrandMark AVIF/WebP runtime variants with the existing PNG retained as fallback

This is a local operator measurement of live deployed asset delivery and transfer size. It does not promote runtime, signal, detection, governance, public-safe, production-wide, or evidence claims.

Proof ceiling: `PERFORMANCE_TUNING_MEASURED_LIVE_DEPLOY_ONLY`

## Method

The live routes were measured with browser network cache disabled through Chrome DevTools Protocol. No HAR, trace, screenshot, or other measurement artifact file was created.

The measured browser selected the AVIF BrandMark runtime asset from the manual `picture` path. The PNG fallback remained present in the markup but was not requested by the measured modern browser. The WebP fallback was not directly exercised.

## Live Measurement Results

| Route | Total transfer, CDP encoded | DOMContentLoaded | FCP | BrandMark used | BrandMark transfer |
| --- | ---: | ---: | --- | --- | ---: |
| `/` | 202,094 bytes / 197.36 KiB | 771 ms | UNMEASURED | AVIF | 10,073 bytes CDP / 9,547 bytes content |
| `/proof/` | 174,072 bytes / 169.99 KiB | 296 ms | UNMEASURED | AVIF | 10,073 bytes CDP / 9,547 bytes content |
| `/artifacts/` | 175,406 bytes / 171.30 KiB | 147 ms | UNMEASURED | AVIF | 10,073 bytes CDP / 9,547 bytes content |

## Baseline Comparison

Prior known baseline:

- Homepage transfer baseline: about 421 KB
- BrandMark PNG after PR #14: 294,712 bytes
- PR #15 AVIF variant: 9,547 bytes
- PR #15 WebP variant: 21,392 bytes

The measured live homepage transfer after PR #15 was 202,094 bytes by CDP encoded network bytes. The reduction versus the prior homepage transfer baseline is approximate because the measurement methods may not be identical.

For the measured browser, the BrandMark runtime content moved from the 294,712 byte PNG fallback to the 9,547 byte AVIF asset. The CDP encoded transfer for the AVIF request was 10,073 bytes.

## Explicitly Unmeasured

- First-contentful-paint remained UNMEASURED because it was not exposed by the browser performance timing or CDP performance metrics in the measurement session.
- WebP fallback live behavior remains UNMEASURED because the measured browser selected AVIF.
- Production-wide and user-population performance impact remain UNMEASURED.
- No public proof, runtime, signal, detection, governance, public-safe, or evidence promotion is claimed by this receipt.
