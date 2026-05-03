export type LoopStep = {
  num: string;
  title: string;
  body: string;
  status: "active" | "support" | "boundary";
};

export const loopSteps: LoopStep[] = [
  {
    num: "01",
    title: "Detection Source",
    body: "Detection-as-code in the source repo. Source presence does not prove runtime.",
    status: "active",
  },
  {
    num: "02",
    title: "Splunk SPL",
    body: "Search expression is reviewable as source. SPL existence is not signal observation.",
    status: "active",
  },
  {
    num: "03",
    title: "Synthetic Validation",
    body: "Deterministic test inputs and expected outputs in the validation repo.",
    status: "active",
  },
  {
    num: "04",
    title: "Case Packet",
    body: "Bounded result bundle preserved against the proof record.",
    status: "active",
  },
  {
    num: "05",
    title: "AI Support-Only",
    body: "AI accelerates labor: drafting, scaffolding, review. AI does not promote claims.",
    status: "support",
  },
  {
    num: "06",
    title: "Deterministic Verifier",
    body: "Static checks decide pass or fail. The verifier owns the gate, not the model.",
    status: "active",
  },
  {
    num: "07",
    title: "CI Enforcement",
    body: "Blocked-claim scan and contract checks run before any wording can ship.",
    status: "active",
  },
  {
    num: "08",
    title: "Proof Record",
    body: "Public proof record holds the bounded ceiling. Stronger claims require separate promotion.",
    status: "boundary",
  },
];
