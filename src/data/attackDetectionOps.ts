import { attackFamilies, cyberKillChainStages } from "./attackCoverage";

export type DetectionOpsDatum = {
  id: string;
  title: string;
  family: string;
  platformLane: string;
  attackContext: string;
  killChainStage: string;
  validationState: string;
  proofCeiling: string;
  nextGate: string;
  sourcePath: string;
  proofRoute: string;
  tone: "validated" | "private" | "planned" | "contract" | "fixture";
};

export type DetectionLifecycleStep = {
  label: string;
  surface: string;
  status: string;
  source: string;
};

export const detectionLifecycleSteps: DetectionLifecycleStep[] = [
  {
    label: "Source truth",
    surface: "hawkinsoperations-detections",
    status: "detection source packages, ATT&CK orientation, event-field contracts",
    source: "detections/DETECTION_FACTORY_INDEX.md",
  },
  {
    label: "ATT&CK context",
    surface: "detections metadata",
    status: "reviewer orientation; not live coverage proof",
    source: "detections/successor/*/rule.yml and status metadata",
  },
  {
    label: "Controlled validation",
    surface: "hawkinsoperations-validation",
    status: "49 controlled validation fires / 106 validation cases",
    source: "activity/detection-activity-ledger-v1.json",
  },
  {
    label: "Proof ceiling",
    surface: "hawkinsoperations-proof",
    status: "proof records and claim ceilings where present",
    source: "proof/records/README.md",
  },
  {
    label: "Claim boundary",
    surface: "Hoxline / Claim Firewall",
    status: "unsupported runtime/signal/public-safe wording blocked or downgraded",
    source: "hoxline/examples/showcase/ho-det-001-capability-visual-data-pack-v1.json",
  },
  {
    label: "Website render",
    surface: "hawkinsoperations-website",
    status: "public navigation only",
    source: "app/detections/page.tsx",
  },
];

const killChainByArtifact = new Map(
  cyberKillChainStages.flatMap((stage) =>
    stage.mappedArtifacts.map((artifact) => [artifact.replace("..004", ""), stage.stage] as const),
  ),
);

const platformLaneFor = (id: string) => {
  if (id.startsWith("ID-DET")) return "Identity / Splunk source candidate";
  if (id.startsWith("AWS")) return "CloudTrail fixture";
  if (id.includes("NDR")) return "Security Onion / NDR contract";
  if (id.includes("PIPE")) return "Cribl pipeline contract";
  if (id === "HO-DET-011" || id === "HO-DET-012") return "Sigma + Wazuh + Splunk";
  if (id === "HO-DET-001") return "Sigma + Splunk + Sysmon mapping";
  return "Sigma / Splunk / Wazuh planned lane";
};

const sourcePathFor = (id: string) => {
  if (id.startsWith("ID-DET")) return `detections/identity/${id.toLowerCase()}/`;
  if (id.startsWith("AWS")) return "detections/cloud/aws/aws-det-001/";
  if (id === "HO-NDR-001") return "validation/security-onion/ho-ndr-001/";
  if (id === "HO-PIPE-001") return "detections/successor/ho-pipe-001/";
  return `detections/successor/${id.toLowerCase()}/`;
};

export const detectionOpsInventory: DetectionOpsDatum[] = attackFamilies.flatMap((family) =>
  family.nodes.map((node) => {
    const id = node.id.includes("…") ? "ID-DET-001..004" : node.id;
    return {
      id,
      title: node.title,
      family: family.family,
      platformLane: platformLaneFor(node.id),
      attackContext: node.attack,
      killChainStage: killChainByArtifact.get(id) ?? killChainByArtifact.get(node.id) ?? "ATT&CK orientation",
      validationState: node.validation,
      proofCeiling: node.ceiling,
      nextGate: node.boundary,
      sourcePath: sourcePathFor(node.id.replace("…004", "")),
      proofRoute:
        node.id === "HO-DET-001"
          ? "/proof/ho-det-001/"
          : node.id === "HO-DET-011" || node.id === "HO-DET-012"
          ? "/proof/runtime-proof-factory/"
          : "/validation/",
      tone: node.tone,
    };
  }),
);

export const attackOpsSummary = {
  sourceBackedRows: detectionOpsInventory.length,
  controlledValidationFires: 49,
  validationCases: 106,
  publicSafeCount: 0,
  source:
    "hawkinsoperations-detections/detections/DETECTION_FACTORY_INDEX.md and hawkinsoperations-validation/activity/detection-activity-ledger-v1.json",
} as const;

