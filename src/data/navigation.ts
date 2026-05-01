export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNavigation: NavItem[] = [
  { label: "Start", href: "/start/", description: "Reviewer route" },
  { label: "Proof", href: "/proof/", description: "Proof ledger" },
  { label: "Architecture", href: "/architecture/", description: "Truth model" },
  { label: "Repos", href: "/repos/", description: "Repository map" },
  { label: "Controls", href: "/controls/", description: "Claim firewall" },
  { label: "Field Notes", href: "/field-notes/", description: "Field notes" },
  { label: "About", href: "/about/", description: "Operator profile" },
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
