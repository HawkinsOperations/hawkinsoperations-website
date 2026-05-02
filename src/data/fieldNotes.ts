export type FieldNote = {
  slug: string;
  title: string;
  date: string;
  status: string;
  tags: string[];
  summary: string;
  proofBoundary: string;
  relatedLinks: { label: string; href: string }[];
  body: string[];
};

export const fieldNotes: FieldNote[] = [
  {
    slug: "website-rendering-is-not-proof",
    title: "Website rendering is not proof",
    date: "2026-05-01",
    status: "PUBLIC_RENDERING_BOUNDARY",
    tags: ["website", "proof-boundary", "claim-firewall"],
    summary: "A page can route reviewers to evidence, but it cannot become evidence by existing.",
    proofBoundary: "The website owns presentation and routing only.",
    relatedLinks: [{ label: "Proof ledger", href: "/proof/" }],
    body: [
      "The website is a public inspection layer. It makes the proof map easier to read, but it does not replace proof records, validators, runtime evidence, or signal evidence.",
      "A rendered page can state a ceiling, link a record, and show blocked promotions. It cannot promote claims on its own.",
    ],
  },
  {
    slug: "source-truth-vs-runtime-truth",
    title: "Source truth vs runtime truth",
    date: "2026-05-01",
    status: "TRUTH_SURFACE_NOTE",
    tags: ["source", "runtime", "governance"],
    summary: "Source presence is useful, but it does not prove a control is running.",
    proofBoundary: "Source truth and runtime truth are separate surfaces.",
    relatedLinks: [{ label: "Truth surfaces", href: "/architecture/truth-surfaces/" }],
    body: [
      "A detection file can prove that source exists. It does not prove that the source has been deployed, executed, or observed.",
      "That separation keeps a readable repository from becoming an accidental runtime claim.",
    ],
  },
  {
    slug: "what-synthetic-validation-proves",
    title: "What synthetic validation proves",
    date: "2026-05-01",
    status: "VALIDATION_BOUNDARY",
    tags: ["validation", "HO-DET-001", "synthetic"],
    summary: "Synthetic validation can prove a bounded test path, not full operational behavior.",
    proofBoundary: "HO-DET-001 remains at TEST_VALIDATED_SYNTHETIC_SCOPE.",
    relatedLinks: [{ label: "HO-DET-001 case file", href: "/proof/ho-det-001/" }],
    body: [
      "Synthetic validation is valuable because it is bounded and repeatable.",
      "The correct public claim is the bounded one: the proof ceiling remains TEST_VALIDATED_SYNTHETIC_SCOPE until separate runtime, signal, and evidence gates are satisfied.",
    ],
  },
  {
    slug: "why-blocked-claims-increase-credibility",
    title: "Why blocked claims increase credibility",
    date: "2026-05-01",
    status: "CLAIM_FIREWALL_NOTE",
    tags: ["claims", "review", "credibility"],
    summary: "Showing what is blocked makes the supported claim easier to trust.",
    proofBoundary: "Blocked promotions are intentionally visible.",
    relatedLinks: [{ label: "Claim firewall", href: "/controls/" }],
    body: [
      "A proof system is stronger when it names what has not been proven.",
      "The claim firewall prevents a good validation result from being stretched into runtime, signal, or public proof language.",
    ],
  },
  {
    slug: "ai-is-labor-governance-is-authority",
    title: "AI is labor, governance is authority",
    date: "2026-05-01",
    status: "SYSTEM_THESIS",
    tags: ["AI", "governance", "authority"],
    summary: "AI can accelerate the work, but it does not own the promotion boundary.",
    proofBoundary: "Governance controls decide what can be claimed.",
    relatedLinks: [{ label: "Architecture", href: "/architecture/" }],
    body: [
      "The system can use AI-assisted labor to build, inspect, and validate artifacts.",
      "Authority remains in deterministic controls, explicit evidence, and Raylee-approved promotion gates.",
    ],
  },
];

export const latestFieldNotes = fieldNotes.slice(0, 3);
