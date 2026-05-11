import { externalLinks } from "./navigation";

export type ReviewerRouteLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ReviewerRoute = {
  duration: string;
  title: string;
  purpose: string;
  items: string[];
  links: ReviewerRouteLink[];
};

export const reviewerRoutes: ReviewerRoute[] = [
  {
    duration: "3 min",
    title: "Executive scan",
    purpose: "Confirm the public ceiling, the blocked claims, and the flagship HO-DET-001 proof route.",
    items: ["Read the current proof ceiling.", "Open the HO-DET-001 proof card.", "Confirm the blocked claim list."],
    links: [
      { label: "Proof ledger", href: "/proof/" },
      { label: "HO-DET-001 card", href: "/proof/ho-det-001/" },
      { label: "Claim firewall", href: "/controls/" },
    ],
  },
  {
    duration: "10 min",
    title: "Proof review",
    purpose: "Follow the proof record, validation route, and repository map without inferring runtime state.",
    items: ["Read the proof ledger.", "Open the validation route.", "Confirm website rendering is not proof."],
    links: [
      { label: "Proof repo", href: externalLinks.proof, external: true },
      { label: "Validation report", href: externalLinks.validationReportHo, external: true },
      { label: "Repository map", href: "/repos/" },
    ],
  },
  {
    duration: "Deep",
    title: "Technical inspection",
    purpose: "Trace the separated surfaces and promotion gates before accepting any stronger wording.",
    items: [
      "Trace source, validation, runtime, signal, evidence, and public proof.",
      "Inspect owner repositories.",
      "Review promotion requirements before accepting stronger wording.",
    ],
    links: [
      { label: "Truth surfaces", href: "/architecture/truth-surfaces/" },
      { label: "Architecture", href: "/architecture/" },
      { label: "Control matrix", href: externalLinks.controlMatrix, external: true },
      { label: "Repo authority map", href: externalLinks.repoAuthorityMap, external: true },
    ],
  },
];
