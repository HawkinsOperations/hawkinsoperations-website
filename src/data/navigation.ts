export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNavigation: NavItem[] = [
  { label: "Home", href: "/", description: "Reviewer cockpit" },
  { label: "Proof", href: "/proof/", description: "Claim authority" },
  { label: "Artifacts", href: "/artifacts/", description: "Reviewer receipts" },
  { label: "Detections", href: "/detections/", description: "Detection engineering" },
  { label: "AI Security", href: "/ai-security/", description: "AI-assisted SOC model" },
  { label: "About", href: "/about/", description: "Mission and archive boundary" },
];

export const reviewerLinks: NavItem[] = [
  { label: "Governance Saves", href: "/proof/governance-saves/", description: "Controls that fired" },
  { label: "Proof Pack 001", href: "/proof/proof-pack-001/", description: "Bounded reviewer package" },
  { label: "Runtime boundary", href: "/proof/runtime-proof-factory/", description: "Bounded runtime summaries" },
  { label: "Architecture", href: "/architecture/", description: "Truth-plane separation" },
  { label: "Validation registry", href: "/validation/", description: "Controlled-test packages" },
  { label: "Platform contracts", href: "/platform/contracts/", description: "Support-only contract wall" },
  { label: "Archive", href: "/about/#archive", description: "Legacy/current boundary" },
];

export const externalLinks = {
  githubOrg: "https://github.com/HawkinsOperations",
  startHere: "https://github.com/HawkinsOperations/.github/blob/main/profile/START_HERE.md",
  controlMatrix: "https://github.com/HawkinsOperations/.github/blob/main/governance/CONTROL_STATUS_MATRIX.md",
  orgRequiredChecksMatrix: "https://github.com/HawkinsOperations/.github/blob/main/governance/ORG_REQUIRED_CHECKS_MATRIX.yml",
  reproducibleReviewerPath: "https://github.com/HawkinsOperations/.github/blob/main/architecture/REPRODUCIBLE_REVIEWER_PATH.md",
  repoAuthorityMap: "https://github.com/HawkinsOperations/.github/blob/main/architecture/REPO_AUTHORITY_MAP.md",
  prReviewAuthority: "https://github.com/HawkinsOperations/.github/blob/main/governance/PR_REVIEW_AUTHORITY.md",
  detections: "https://github.com/HawkinsOperations/hawkinsoperations-detections",
  validation: "https://github.com/HawkinsOperations/hawkinsoperations-validation",
  platform: "https://github.com/HawkinsOperations/hawkinsoperations-platform",
  proof: "https://github.com/HawkinsOperations/hawkinsoperations-proof",
  governanceSavesCandidates: "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/main/docs/governance-saves/GOVERNANCE-SAVES-CANDIDATES.md",
  governanceSavesEvidenceMatrix: "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/main/docs/governance-saves/GOVERNANCE-SAVES-EVIDENCE-MATRIX.md",
  platformDetectionFactoryController: "https://github.com/HawkinsOperations/hawkinsoperations-platform/blob/main/docs/factory/DETECTION_FACTORY_CONTROLLER_V0.md",
  platformSoarCasePacket: "https://github.com/HawkinsOperations/hawkinsoperations-platform/blob/main/contracts/examples/soar-case-packet-v0.sample.json",
  validationRegistry: "https://github.com/HawkinsOperations/hawkinsoperations-validation/blob/main/validation/VALIDATION_REGISTRY.yml",
  proofRecord: "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/main/proof/records/HO-DET-001.md",
  cyberKillChainCoverage: "https://github.com/HawkinsOperations/hawkinsoperations-proof/blob/main/docs/mappings/CYBER_KILL_CHAIN_COVERAGE.md",
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
