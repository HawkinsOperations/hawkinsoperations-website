/**
 * Proof Pack 001 manifest, verifier routes, and proof status index.
 *
 * The manifest separates what the reviewer package includes from what is
 * excluded and what it does not prove. Verifier scripts check structure,
 * parity, claim boundaries, and packet contracts — they do not prove
 * runtime activity or public-safe evidence. Website rendering is not proof.
 */

export const proofPack = {
  id: "HAWKINSOPERATIONS_PROOF_PACK_001",
  ceiling: "CONTROLLED_TEST_VALIDATED",
  reviewerPackage: "PUBLIC_SAFE_REVIEWER_RELEASE_CANDIDATE",
  rawRuntimeEvidence: "NOT_PUBLIC_SAFE",
  publicSafeRuntimeProof: "BLOCKED",
  zipSha256: "44d8a643aa2b113c9e99be0462e699d39af707a67190823cc05bb381907dc452",
};

export type ManifestItem = { name: string; note: string };

/** Files routed inside the bounded reviewer release. */
export const manifestIncluded: ManifestItem[] = [
  { name: "REVIEWER_PACKET.md", note: "Boundary packet for HO-DET-001." },
  { name: "SHA256SUMS.txt", note: "Source-controlled checksums for packet files." },
  { name: "HO-DET-001 proof card", note: "Bounded controlled-test proof card." },
  { name: "HO-DET-001 proof record", note: "Public proof record with stated ceiling." },
  { name: "Validation record", note: "14 / 14 controlled fixtures." },
  { name: "Ledger / schema", note: "Evidence ledger and schema." },
  { name: "Proof verifier", note: "Structure / parity / boundary checks." },
];

/** Items kept out of the public reviewer release. */
export const manifestExcluded: ManifestItem[] = [
  { name: "Raw / private runtime evidence", note: "NOT_PUBLIC_SAFE — excluded from the public proof basis." },
  { name: "Public-safe runtime proof", note: "BLOCKED until evidence linkage and explicit promotion." },
];

/** What Proof Pack 001 does not prove. */
export const proofPackDoesNotProve: string[] = [
  "Runtime-active status is not claimed.",
  "Signal-observed status is not claimed.",
  "Evidence-linked public runtime proof is blocked.",
  "Production-ready and SOCaaS availability are not claimed.",
  "Live Splunk, Cribl/Wazuh, and live AWS are blocked.",
  "Autonomous SOC and AI / analyst disposition are not claimed.",
];

export const releaseRouteCaveat = {
  note: "An official direct GitHub Release route exists. Source packet manifest / check-mode language remains source-packet / release-candidate metadata — a route / status distinction, not a stronger proof claim.",
  badges: ["DIRECT_RELEASE_ROUTE", "SOURCE_PACKET_CHECK_MODE", "NO_SIGNED_ARTIFACT"],
};

export const reviewerPacket = {
  name: "REVIEWER_PACKET.md",
  scope: "Boundary packet for HO-DET-001.",
  evidenceChain: [
    "Detections",
    "Validation",
    "Platform case-packet sample",
    "Proof card / record",
    "Website rendering (not proof)",
  ],
  doesNotProve: [
    "Runtime-active and signal-observed status are not claimed.",
    "Production / customer deployment is blocked.",
    "SOCaaS availability and autonomous / AI / analyst approval are blocked.",
  ],
};

export const checksumManifest = {
  name: "SHA256SUMS.txt",
  scope: "Source-controlled checksums for packet files.",
  doesNotProve:
    "Checksum presence does not promote runtime or signal proof, and does not prove an official release unless tied to the release ZIP route / runbook and checksum verification.",
};

export type VerifierGroup = {
  group: string;
  blurb: string;
  scripts: string[];
};

export const verifierGroups: VerifierGroup[] = [
  {
    group: "Release / pack verifiers",
    blurb: "Check the release route and ZIP packet contract.",
    scripts: [
      "scripts/verify-proof-pack-001-release.py",
      "scripts/verify-proof-pack-001-zip.py",
    ],
  },
  {
    group: "Proof integrity verifiers",
    blurb: "Check proof integrity and HO-DET-001 proof structure.",
    scripts: [
      "scripts/verify_proof_integrity.py",
      "scripts/verify-ho-det-001-proof-integrity.py",
    ],
  },
  {
    group: "Boundary / parity / contract verifiers",
    blurb: "Check claim boundaries, parity, and packet contracts.",
    scripts: [
      "claim-boundary scanners",
      "parity verifiers",
      "contract verifiers",
    ],
  },
];

export const verifierBoundary =
  "Verifier scripts check structure, parity, claim boundaries, and packet contracts. They do not prove runtime activity or public-safe evidence.";

export type ProofStatusRow = {
  id: string;
  status: string;
  tone: "ceiling" | "block" | "warn" | "drift";
  note: string;
};

export const proofStatusIndex = {
  path: "proof/indexes/DETECTION_PROOF_STATUS_INDEX.yml",
  websiteStatus: "WEBSITE_UNTOUCHED_NOT_PROOF",
  humanReview: "HUMAN_REVIEW_REQUIRED",
  rows: [
    { id: "HO-DET-001", status: "PROOF_RECORD_PRESENT", tone: "ceiling", note: "Controlled-test proof record and card." },
    { id: "HO-DET-011", status: "PRIVATE_RUNTIME_BOUNDARY", tone: "ceiling", note: "Bounded summary approved; raw evidence private; Splunk NOT_VERIFIED; no public runtime proof." },
    { id: "HO-DET-012", status: "PROOF_RECORD_PRESENT", tone: "ceiling", note: "Bounded public-safe summary approved; raw evidence private; Splunk NOT_VERIFIED." },
    { id: "AWS-DET-001", status: "PROOF_RECORD_PRESENT", tone: "ceiling", note: "Cloud validation card; live AWS blocked." },
    { id: "ID-DET-001", status: "NO_PROOF_RECORD", tone: "warn", note: "Validation-only; no proof record." },
    { id: "ID-DET-002", status: "NO_PROOF_RECORD", tone: "warn", note: "Validation-only; no proof record." },
    { id: "ID-DET-003", status: "NO_PROOF_RECORD", tone: "warn", note: "Validation-only; no proof record." },
    { id: "ID-DET-004", status: "NO_PROOF_RECORD", tone: "warn", note: "Validation-only; no proof record." },
    { id: "HO-NDR-001", status: "BOUNDARY_CONTRACT_ONLY", tone: "warn", note: "Cross-source corroboration contract defined, not proof promotion." },
  ] as ProofStatusRow[],
};
