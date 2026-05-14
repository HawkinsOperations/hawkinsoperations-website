export type TruthPlane = {
  key: string;
  label: string;
  short: string;
  active: boolean;
  ceiling?: string;
};

export const truthPlanes: TruthPlane[] = [
  {
    key: "source",
    label: "Source Truth",
    short: "Reviewable artifact",
    active: true,
  },
  {
    key: "validation",
    label: "Validation Truth",
    short: "Controlled-test scope",
    active: true,
    ceiling: "CONTROLLED_TEST_VALIDATED",
  },
  {
    key: "runtime",
    label: "Runtime Truth",
    short: "Not claimed publicly",
    active: false,
  },
  {
    key: "signal",
    label: "Signal Truth",
    short: "Not claimed publicly",
    active: false,
  },
  {
    key: "evidence",
    label: "Evidence Truth",
    short: "Bounded preservation",
    active: false,
  },
  {
    key: "public-proof",
    label: "Public Proof",
    short: "Routing only",
    active: false,
  },
];
