export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNavigation: NavItem[] = [
  { label: "Home", href: "/", description: "Command surface" },
  { label: "Proof", href: "/proof/", description: "Proof ledger" },
  { label: "Artifacts", href: "/artifacts/", description: "Evidence vault" },
  { label: "About", href: "/about/", description: "Operator profile" },
];

export const reviewerLinks: NavItem[] = [
  { label: "Reviewer route", href: "/start/", description: "Three-speed inspection path" },
  { label: "System architecture", href: "/architecture/", description: "Plane separation map" },
  { label: "Truth surface model", href: "/architecture/truth-surfaces/", description: "Six surfaces, six meanings" },
  { label: "Repository map", href: "/repos/", description: "Where each plane lives" },
  { label: "Claim firewall", href: "/controls/", description: "Allowed and blocked wording" },
  { label: "Field notes", href: "/field-notes/", description: "Boundary notes" },
  { label: "Legacy boundary", href: "/legacy/", description: "Reference material rules" },
  { label: "System history", href: "/changelog/", description: "Codex changelog" },
];

export const externalLinks = {
  githubOrg: "https://github.com/HawkinsOperations",
  startHere: "https://github.com/HawkinsOperations/.github/blob/main/profile/START_HERE.md",
  controlMatrix: "https://github.com/HawkinsOperations/.github/blob/main/governance/CONTROL_STATUS_MATRIX.md",
  repoAuthorityMap: "https://github.com/HawkinsOperations/.github/blob/main/architecture/REPO_AUTHORITY_MAP.md",
  detections: "https://github.com/HawkinsOperations/hawkinsoperations-detections",
  validation: "https://github.com/HawkinsOperations/hawkinsoperations-validation",
  platform: "https://github.com/HawkinsOperations/hawkinsoperations-platform",
  proof: "https://github.com/HawkinsOperations/hawkinsoperations-proof",
  proofRecord: "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/main/proof/records/HO-DET-001.md",
  website: "https://github.com/HawkinsOperations/hawkinsoperations-website",
  rayleeGithub: "https://github.com/raylee-hawkins",
  rayleeLinkedIn: "https://www.linkedin.com/in/raylee-hawkins",
  legacyHawkinsOps: "https://hawkinsops.com",
};
