import { externalLinks } from "./navigation";

export type ArtifactStatus = "supported" | "rendering-only" | "reference" | "blocked-pending-promotion";

export type ArtifactCategory =
  | "proof-record"
  | "case-study"
  | "validation"
  | "ci-verifier"
  | "architecture"
  | "governance"
  | "public-packet"
  | "field-note"
  | "legacy";

export type Artifact = {
  slug: string;
  title: string;
  category: ArtifactCategory;
  truthSurface: string;
  status: ArtifactStatus;
  proofCeiling?: string;
  description: string;
  proves: string;
  doesNotProve: string;
  primary: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string; external?: boolean };
  flagship?: boolean;
  legacy?: boolean;
  tags?: string[];
};

export const artifactCategories: { key: ArtifactCategory; label: string }[] = [
  { key: "proof-record", label: "Proof records" },
  { key: "case-study", label: "Case studies" },
  { key: "validation", label: "Validation outputs" },
  { key: "ci-verifier", label: "CI / verifier" },
  { key: "architecture", label: "Architecture maps" },
  { key: "governance", label: "Governance" },
  { key: "public-packet", label: "Public packets" },
  { key: "field-note", label: "Field notes" },
  { key: "legacy", label: "Legacy references" },
];

export const artifacts: Artifact[] = [
  {
    slug: "ho-det-001-proof-record",
    title: "HO-DET-001 Proof Record",
    category: "proof-record",
    truthSurface: "Public Proof",
    status: "supported",
    proofCeiling: "TEST_VALIDATED_SYNTHETIC_SCOPE",
    description: "The flagship public proof record with synthetic validation status, bounded ceiling, and explicit blocked promotions.",
    proves: "A public proof record exists with a stated ceiling, blocked promotions, and a path back to source and validation.",
    doesNotProve: "Runtime activation, signal observation, fleet scope, or external-use authorization.",
    primary: { label: "Open proof card", href: "/proof/ho-det-001/" },
    secondary: { label: "Proof repo record", href: externalLinks.proofRecord, external: true },
    flagship: true,
    tags: ["HO-DET-001", "validation", "synthetic"],
  },
  {
    slug: "website-rendering-is-not-proof",
    title: "Website Rendering Is Not Proof",
    category: "governance",
    truthSurface: "Public rendering",
    status: "supported",
    description: "The boundary doctrine that separates a rendered page from a proof record. Routing is not evidence.",
    proves: "The public website owns presentation only and routes reviewers to evidence and proof records.",
    doesNotProve: "Runtime, signal, or evidence claims that live in their own repositories and gates.",
    primary: { label: "Read field note", href: "/field-notes/website-rendering-is-not-proof/" },
    flagship: true,
    tags: ["boundary", "rendering", "doctrine"],
  },
  {
    slug: "ho-det-001-case-file",
    title: "HO-DET-001 Case File",
    category: "case-study",
    truthSurface: "Public Proof",
    status: "supported",
    proofCeiling: "TEST_VALIDATED_SYNTHETIC_SCOPE",
    description: "Reviewer case file showing what exists, what passed, what is not claimed, and what remains blocked for HO-DET-001.",
    proves: "The bounded scope of synthetic validation status against an explicit promotion gate list.",
    doesNotProve: "Runtime or signal authority outside the synthetic test path.",
    primary: { label: "Open case file", href: "/proof/ho-det-001/" },
    tags: ["HO-DET-001", "case-file"],
  },
  {
    slug: "synthetic-validation-boundary",
    title: "Validation Report — Synthetic Scope",
    category: "validation",
    truthSurface: "Validation Truth",
    status: "supported",
    proofCeiling: "TEST_VALIDATED_SYNTHETIC_SCOPE",
    description: "What synthetic validation can and cannot prove. Bounded test paths, deterministic outputs, no runtime inference.",
    proves: "A bounded test path passed inside its declared scope.",
    doesNotProve: "Runtime activity, public signal, or external-use approval.",
    primary: { label: "Read field note", href: "/field-notes/what-synthetic-validation-proves/" },
    secondary: { label: "Validation repo", href: externalLinks.validation, external: true },
    tags: ["validation", "synthetic"],
  },
  {
    slug: "claim-firewall",
    title: "Claim Firewall",
    category: "governance",
    truthSurface: "Public claim boundary",
    status: "supported",
    description: "Allowed wording, blocked wording, and the wording examples that route safe claims through promotion gates.",
    proves: "The supported public ceiling and the explicit list of claims kept off the public surface.",
    doesNotProve: "That blocked claims are merely pending; some remain blocked by design.",
    primary: { label: "Open firewall", href: "/controls/" },
    tags: ["claims", "governance"],
  },
  {
    slug: "blocked-claim-scanner",
    title: "Blocked-Claim CI Scanner",
    category: "ci-verifier",
    truthSurface: "Public claim boundary",
    status: "supported",
    description: "The site contract scanner enforcing blocked-claim wording rules across rendering files before any wording can ship.",
    proves: "Rendering wording is checked deterministically in CI against a published blocked-claim list.",
    doesNotProve: "Runtime control coverage; the scanner only governs public wording.",
    primary: { label: "Site contract", href: externalLinks.website + "/blob/main/scripts/verify-site-contract.mjs", external: true },
    tags: ["CI", "verifier"],
  },
  {
    slug: "truth-surface-model",
    title: "Truth Surface Model",
    category: "architecture",
    truthSurface: "System architecture",
    status: "supported",
    description: "Six surfaces, six meanings: source, validation, runtime, signal, evidence, public proof — each with what it proves and what blocks it.",
    proves: "Each surface owns a different question; none inherits proof by presentation.",
    doesNotProve: "That every surface is currently active for HawkinsOperations claims.",
    primary: { label: "Open model", href: "/architecture/truth-surfaces/" },
    tags: ["architecture", "truth-surfaces"],
  },
  {
    slug: "repo-authority-map",
    title: "Repository Authority Map",
    category: "architecture",
    truthSurface: "System architecture",
    status: "supported",
    description: "Which repository owns source, validation, platform, proof, and rendering — and which authorities each one cannot inherit.",
    proves: "Repository plane separation by ownership and authority.",
    doesNotProve: "Runtime state across repositories.",
    primary: { label: "Open repo map", href: "/repos/" },
    secondary: { label: "Authority map source", href: externalLinks.repoAuthorityMap, external: true },
    tags: ["repos", "authority"],
  },
  {
    slug: "control-status-matrix",
    title: "Control Status Matrix",
    category: "governance",
    truthSurface: "Governance routing",
    status: "supported",
    description: "Routing surface for HawkinsOperations controls, ownership, and current promotion state.",
    proves: "A central reviewer-facing routing surface for control status exists in the .github profile repo.",
    doesNotProve: "Runtime control activation outside the matrix's own statements.",
    primary: { label: "Open matrix", href: externalLinks.controlMatrix, external: true },
    tags: ["governance", "controls"],
  },
  {
    slug: "claim-promotion-flow",
    title: "Claim Promotion Flow",
    category: "architecture",
    truthSurface: "Promotion model",
    status: "supported",
    description: "How a claim moves from source through validation, runtime, signal, evidence, and into public proof — and where it gets stopped.",
    proves: "A documented promotion path with separate gates per surface.",
    doesNotProve: "That a given claim has currently passed every gate.",
    primary: { label: "Open architecture", href: "/architecture/" },
    tags: ["promotion", "gates"],
  },
  {
    slug: "reviewer-route",
    title: "Reviewer Route — 3 Speeds",
    category: "public-packet",
    truthSurface: "Public rendering",
    status: "supported",
    description: "Three inspection speeds (3 minute, 10 minute, deep technical) for reviewers entering the system.",
    proves: "Reviewer-friendly entry routes into proof and architecture.",
    doesNotProve: "That reading the route promotes any claim.",
    primary: { label: "Open route", href: "/start/" },
    tags: ["reviewer", "routing"],
  },
  {
    slug: "field-notes-codex",
    title: "Field Notes Codex",
    category: "field-note",
    truthSurface: "Public rendering",
    status: "supported",
    description: "Short technical notes that explain the boundary model: rendering vs proof, source vs runtime, validation scope, claim firewall reasoning.",
    proves: "A short-form public surface that defends the system's boundary doctrine.",
    doesNotProve: "Runtime claims; field notes route to records.",
    primary: { label: "Open field notes", href: "/field-notes/" },
    tags: ["field-notes", "doctrine"],
  },
  {
    slug: "ai-authority-boundary",
    title: "AI Authority Boundary",
    category: "governance",
    truthSurface: "Promotion model",
    status: "supported",
    description: "AI is labor, governance is authority. The line between AI-accelerated work and the deterministic gates that decide what can be claimed.",
    proves: "Where AI assistance ends and human-approved governance begins inside this system.",
    doesNotProve: "That any model output is itself a proof artifact.",
    primary: { label: "Read field note", href: "/field-notes/ai-is-labor-governance-is-authority/" },
    tags: ["AI", "governance"],
  },
  {
    slug: "blocked-claims-summary",
    title: "Blocked Public Claims",
    category: "governance",
    truthSurface: "Public claim boundary",
    status: "supported",
    description: "The current public list of claims kept off the rendering layer until separate evidence-backed promotion changes their state.",
    proves: "Reviewers can see what is blocked, not just what is supported.",
    doesNotProve: "Hidden claims; the blocked list is intentionally visible.",
    primary: { label: "Open firewall", href: "/controls/" },
    secondary: { label: "Why blocked claims help", href: "/field-notes/why-blocked-claims-increase-credibility/" },
    tags: ["claims", "blocked"],
  },
  {
    slug: "legacy-boundary",
    title: "Legacy Boundary",
    category: "legacy",
    truthSurface: "Reference",
    status: "reference",
    description: "Older HawkinsOps material is reference-only. It does not automatically promote current HawkinsOperations claims.",
    proves: "Legacy material exists and can give context.",
    doesNotProve: "Current runtime, signal, or evidence claims for HawkinsOperations.",
    primary: { label: "Open boundary", href: "/legacy/" },
    secondary: { label: "Legacy site", href: externalLinks.legacyHawkinsOps, external: true },
    legacy: true,
    tags: ["legacy", "reference"],
  },
  {
    slug: "system-history",
    title: "System History",
    category: "public-packet",
    truthSurface: "Public rendering",
    status: "supported",
    description: "Codex changelog showing public structural moves of the rendering layer.",
    proves: "Rendering changes are tracked publicly.",
    doesNotProve: "Runtime or signal changes to the underlying detection system.",
    primary: { label: "Open changelog", href: "/changelog/" },
    tags: ["changelog", "history"],
  },
];

export function artifactsByCategory(category: ArtifactCategory): Artifact[] {
  return artifacts.filter((a) => a.category === category);
}

export const flagshipArtifacts = artifacts.filter((a) => a.flagship);
export const legacyArtifacts = artifacts.filter((a) => a.legacy);
export const nonFlagshipArtifacts = artifacts.filter((a) => !a.flagship && !a.legacy);
