/**
 * Proof Loop step definitions.
 *
 * Re-exported from src/data/loopSteps.ts during the framework migration.
 * The visual Proof Loop redesign happens in a later PR; PR1 preserves the
 * current 8-step structure (Source / SPL / Validation / Case Packet /
 * AI Support / Verifier / CI / Proof Record).
 */
import { loopSteps as dataLoopSteps, type LoopStep } from "@data/loopSteps";

export const proofLoopSteps = dataLoopSteps;
export type { LoopStep };
