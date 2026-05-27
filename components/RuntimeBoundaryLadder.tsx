export type RuntimeLadderTone = "supported" | "partial" | "blocked";

export interface RuntimeLadderStep {
  rank: string;
  label: string;
  status: string;
  tone: RuntimeLadderTone;
  description: string;
}

const defaultSteps: RuntimeLadderStep[] = [
  {
    rank: "01",
    label: "Controlled validation",
    status: "SUPPORTED",
    tone: "supported",
    description:
      "Validation packages, controlled fixtures, and deterministic verifiers run on every PR. This is the strongest publicly supported tier.",
  },
  {
    rank: "02",
    label: "Runtime path initialized",
    status: "SOURCE-VISIBLE",
    tone: "supported",
    description:
      "Runtime contracts, truth-spine schemas, and case-packet structures exist in source. Initialization is repo-visible.",
  },
  {
    rank: "03",
    label: "Runtime-supported (private)",
    status: "PARTIAL",
    tone: "partial",
    description:
      "Private runtime support is acknowledged in boundary docs (e.g. RS003 Cribl route marker). Evidence stays private; public-safe status remains BLOCKED_PENDING_REVIEW.",
  },
  {
    rank: "04",
    label: "Runtime-observed (private)",
    status: "PARTIAL",
    tone: "partial",
    description:
      "Mirrored visibility, Zeek packets, and other observation surfaces exist privately. They are not promoted into public NDR, Suricata, or cross-source proof.",
  },
  {
    rank: "05",
    label: "Public runtime claim",
    status: "BLOCKED",
    tone: "blocked",
    description:
      "Public runtime, signal-observed, or public-safe runtime claims remain blocked. They require separate capture, verifier, checklist, and human approval gates.",
  },
  {
    rank: "06",
    label: "Production / customer / fleet",
    status: "BLOCKED",
    tone: "blocked",
    description:
      "Production-ready, customer-validated, partner-endorsed, and fleet-wide claims are not made anywhere on this surface.",
  },
];

const toneClass: Record<RuntimeLadderTone, string> = {
  supported: "rbl__step--supported",
  partial: "rbl__step--partial",
  blocked: "rbl__step--blocked",
};

const toneStatusClass: Record<RuntimeLadderTone, string> = {
  supported: "rbl__status rbl__status--supported",
  partial: "rbl__status rbl__status--partial",
  blocked: "rbl__status rbl__status--blocked",
};

export default function RuntimeBoundaryLadder({ steps = defaultSteps }: { steps?: RuntimeLadderStep[] }) {
  return (
    <ol className="rbl" aria-label="Runtime proof boundary ladder">
      {steps.map((step) => (
        <li key={step.rank} className={`rbl__step ${toneClass[step.tone]}`}>
          <div className="rbl__step-head">
            <span className="rbl__rank">{step.rank}</span>
            <span className="rbl__label">{step.label}</span>
            <span className={toneStatusClass[step.tone]}>{step.status}</span>
          </div>
          <p className="rbl__desc">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
