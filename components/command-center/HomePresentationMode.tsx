import PresentationShell from "../reviewer-guide/PresentationShell";

/**
 * Compatibility wrapper retained because the repository contract and homepage
 * already own this import path. The presentation shell now orchestrates the
 * approved reviewer-guide components and deterministic interaction model.
 */
export default function HomePresentationMode() {
  return <PresentationShell />;
}
