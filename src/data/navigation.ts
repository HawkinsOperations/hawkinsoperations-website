export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNavigation: NavItem[] = [
  { label: "Home", href: "/", description: "Command surface" },
  { label: "Pipeline", href: "/pipeline/", description: "HO-DET-001 proof route" },
  { label: "Proof", href: "/proof/", description: "Proof ledger" },
  { label: "Artifacts", href: "/artifacts/", description: "Evidence vault" },
  { label: "Operator", href: "/about/", description: "Operator profile" },
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
  proofPack001Release: "https://github.com/HawkinsOperations/hawkinsoperations-proof/releases/tag/hawkinsoperations-proof-pack-001",
  proofPack001Discussion: "https://github.com/orgs/HawkinsOperations/discussions/32",
  proofRecordAws: "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/main/proof/records/AWS-DET-001.md",
  pipelineProof: "https://github.com/HawkinsOperations/hawkinsoperations-validation/blob/main/reports/ho-det-001/pipeline-proof.md",
  pipelineProofJson: "https://github.com/HawkinsOperations/hawkinsoperations-validation/blob/main/reports/ho-det-001/pipeline-proof.json",
  validationHarnessHo: "https://github.com/HawkinsOperations/hawkinsoperations-validation/blob/main/scripts/validate-ho-det-001.py",
  validationCasesHo: "https://github.com/HawkinsOperations/hawkinsoperations-validation/blob/main/validation/successor/ho-det-001/validation-cases.json",
  validationPipelineProofPr: "https://github.com/HawkinsOperations/hawkinsoperations-validation/pull/27",
  validationPipelineProofMerge: "https://github.com/HawkinsOperations/hawkinsoperations-validation/commit/6d4e3ac7b284e380048e8e4f20edf50b6fa9bccb",
  proofBoundaryPr: "https://github.com/HawkinsOperations/hawkinsoperations-proof/pull/27",
  proofBoundaryMerge: "https://github.com/HawkinsOperations/hawkinsoperations-proof/commit/c4911db3d9723ce2b7c1247e40fafc90037ebe03",
  proofLoopHo: "https://github.com/HawkinsOperations/hawkinsoperations-validation/blob/main/.github/workflows/ho-det-001-proof-loop.yml",
  hoDet001Rule: "https://github.com/HawkinsOperations/hawkinsoperations-detections/blob/main/detections/successor/ho-det-001/rule.yml",
  hoDet001Splunk: "https://github.com/HawkinsOperations/hawkinsoperations-detections/blob/main/detections/successor/ho-det-001/splunk.spl",
  validationReportHo: "https://github.com/HawkinsOperations/hawkinsoperations-validation/blob/main/reports/ho-det-001/validation-result.md",
  validationReportAws: "https://github.com/HawkinsOperations/hawkinsoperations-validation/blob/main/reports/aws-det-001/validation-result.md",
  website: "https://github.com/HawkinsOperations/hawkinsoperations-website",
  rayleeGithub: "https://github.com/raylee-hawkins",
  rayleeLinkedIn: "https://www.linkedin.com/in/raylee-hawkins",
  legacyHawkinsOps: "https://hawkinsops.com",
};
