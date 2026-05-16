/**
 * Blocked-claim list for the public website surface.
 *
 * These terms are blocked from public wording unless a separate evidence-backed
 * promotion gate changes their state. Re-exported from src/data/claims.ts to
 * keep a single source of truth during the framework migration.
 */
import { blockedClaims as dataBlockedClaims } from "@data/claims";

export const blockedClaims = dataBlockedClaims;

export type BlockedClaim = (typeof blockedClaims)[number];
