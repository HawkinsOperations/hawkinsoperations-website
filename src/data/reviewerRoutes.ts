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

export const reviewerRoutes: ReviewerRoute[] = [
  {
    duration: "3 min",
    audience: "Hiring manager",
    title: "Executive scan",
    purpose: "Confirm the public ceiling, the released reviewer package, and the flagship HO-DET-001 proof route.",
    cares: "What is the system? What is the current public claim? What is blocked?",
    doNotInfer: "Do not infer runtime-active, signal-observed, or public-safe runtime proof from the rendered page.",
    items: ["Read the current proof ceiling.", "Open Proof Pack 001 release.", "Confirm the blocked claim list."],
    links: [
      { label: "Proof ledger", href: "/proof/" },
      { label: "HO-DET-001 card", href: "/proof/ho-det-001/" },
      { label: "Claim firewall", href: "/controls/" },
    ],
  },
  {
    duration: "10 min",
    audience: "Detection engineering lead",
    title: "Source and validation",
    purpose: "Trace the HO-DET-001 detection rule, the controlled validation fixtures, and the case packet flow.",
    cares: "Where is the rule? What does validation prove? What is the case packet?",
    doNotInfer: "Do not infer runtime deployment or fleet coverage from a passing controlled-test validation.",
    items: ["Open the detection rule.", "Read the validation result.", "Trace the case packet to the proof record."],
    links: [
      { label: "Detection rule", href: externalLinks.hoDet001Rule, external: true },
      { label: "Validation report", href: externalLinks.validationReportHo, external: true },
      { label: "Proof record", href: externalLinks.proofRecord, external: true },
    ],
  },
  {
    duration: "10 min",
    audience: "SOC automation lead",
    title: "Case packet flow",
    purpose: "Inspect deterministic checks, CI gates, and the internal/private runtime-contract separation.",
    cares: "How is the loop gated? What does CI enforce? Where does the runtime contract live?",
    doNotInfer: "Do not infer model execution in CI or live vendor pipeline proof from the proof-loop workflow.",
    items: [
      "Open the proof-loop workflow.",
      "Open the runtime contract on the platform plane.",
      "Confirm the verifier preserves the public ceiling.",
    ],
    links: [
      { label: "Proof loop", href: "/proof-loop/" },
      { label: "Platform plane", href: externalLinks.platform, external: true },
      { label: "Repository map", href: "/repos/" },
    ],
  },
  {
    duration: "Deep",
    audience: "AI governance reviewer",
    title: "Authority chain",
    purpose: "Trace where AI is allowed as labor and where evidence and human review authorize claims.",
    cares: "What can AI do here? What can AI not do? Where is the authority gate?",
    doNotInfer: "Do not infer AI-approved disposition or analyst-approved disposition from any AI-assisted artifact.",
    items: [
      "Read the AI support boundary.",
      "Read the claim firewall.",
      "Trace the human-review gate before public wording.",
    ],
    links: [
      { label: "Truth surfaces", href: "/architecture/truth-surfaces/" },
      { label: "Claim firewall", href: "/controls/" },
      { label: "Control matrix", href: externalLinks.controlMatrix, external: true },
    ],
  },
];
