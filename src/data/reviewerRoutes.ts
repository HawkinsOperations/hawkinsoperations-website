import { externalLinks } from "./navigation";

export type ReviewerRouteLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ReviewerRoute = {
  duration: string;
  audience: string;
  title: string;
  purpose: string;
  cares: string;
  doNotInfer: string;
  items: string[];
  links: ReviewerRouteLink[];
};

/**
 * Four reviewer routes, mapped to the four indexed visuals in
 * ReviewRouteSelector (timeline, DAG, loop, split). The first link is the
 * route's first action.
 */
export const reviewerRoutes: ReviewerRoute[] = [
  {
    duration: "5 min",
    audience: "Validation reviewer",
    title: "Validation registry",
    purpose: "Confirm controlled-test packages, fixture counts, and the blocked runtime / signal / public-safe states.",
    cares: "What is validated? How many fixtures? What is blocked?",
    doNotInfer: "Do not infer runtime deployment or fleet coverage from a passing controlled-test validation.",
    items: ["Open the validation registry.", "Filter by family.", "Inspect a package drawer."],
    links: [
      { label: "Validation registry", href: "/proof/#validation-registry" },
      { label: "Pipeline registry", href: "/pipeline/#validation-registry" },
      { label: "Validation repo", href: externalLinks.validation, external: true },
    ],
  },
  {
    duration: "10 min",
    audience: "Proof / verifier reviewer",
    title: "Proof / verifier",
    purpose: "Trace Proof Pack 001, the included / excluded manifest, verifier routes, and the proof status index.",
    cares: "What is in the pack? What is excluded? What do the verifiers check?",
    doNotInfer: "Do not infer public-safe runtime proof from a released reviewer package.",
    items: ["Open Proof Pack 001.", "Read the verifier cards.", "Confirm the proof status index."],
    links: [
      { label: "Proof Pack 001", href: "/proof/#proof-pack-001" },
      { label: "Verifier cards", href: "/proof/#verifiers" },
      { label: "Proof repo", href: externalLinks.proof, external: true },
    ],
  },
  {
    duration: "10 min",
    audience: "Platform / SOAR reviewer",
    title: "Platform contracts",
    purpose: "Inspect SOAR packet, AutoSOC ledger, Detection Factory Controller, and the GPU / LLM support boundaries.",
    cares: "What contracts exist? What authority is blocked on each?",
    doNotInfer: "Do not infer live Torq / SOAR, response automation, or case closure from a contract blueprint.",
    items: [
      "Open the platform contract blueprints.",
      "Read the blocked-authority footer on each.",
      "Confirm the AutoSOC ledger metrics.",
    ],
    links: [
      { label: "Platform contracts", href: "/pipeline/#platform-contracts" },
      { label: "Receipt lane", href: "/pipeline/#receipt-lane" },
      { label: "Platform plane", href: externalLinks.platform, external: true },
    ],
  },
  {
    duration: "Deep",
    audience: "AI governance reviewer",
    title: "AI governance boundary",
    purpose: "Trace where AI is allowed as labor and where evidence and human review authorize claims.",
    cares: "What can AI do here? What can AI not do? Where is the authority gate?",
    doNotInfer: "Do not infer AI-approved disposition or analyst-approved disposition from any AI-assisted artifact.",
    items: [
      "Read the offline LLM support boundary.",
      "Read the claim firewall.",
      "Trace the human-review gate before public wording.",
    ],
    links: [
      { label: "LLM boundary", href: "/pipeline/#llm-boundary" },
      { label: "Claim Firewall", href: "/claim-firewall/" },
      { label: "Control matrix", href: externalLinks.controlMatrix, external: true },
    ],
  },
];
