/**
 * Public ceiling and public-safe state for the HawkinsOperations website.
 *
 * Authority order:
 *   1. config/site.ts (this file) — controls public ceiling and public-safe status.
 *   2. proof manifests — control proof artifact facts.
 *   3. proof repo — controls evidence.
 *   4. website — renders only.
 *
 * Any change to `ceiling` or `publicSafe` must be matched by an evidence-backed
 * promotion in the proof repository. Website rendering is not proof.
 */

export const ceiling = "CONTROLLED_TEST_VALIDATED" as const;
export const publicSafe = "NOT_PUBLIC_SAFE" as const;

export const mandatoryBoundary = "Website rendering is not proof.";

export const siteUrl = "https://hawkinsoperations.com" as const;
export const siteName = "HawkinsOperations Detection Engineering SOC" as const;

export type Ceiling = typeof ceiling;
export type PublicSafeState = typeof publicSafe;
