import { validationRows, registryStats } from "@data/validationRegistry";
import { proofRecords } from "@data/proofRecords";
import { artifacts } from "@data/artifacts";
import { blockedClaims } from "@data/claims";

/**
 * WorkDashboard
 *
 * Compact "work shipped" counters. Every number is derived from existing
 * site data — no hand-entered totals. Counts describe controlled-test scope
 * and reviewer routing only; website rendering is not proof.
 */
type Counter = {
  value: string;
  label: string;
  meaning: string;
  href: string;
  external?: boolean;
};

const proofRecordsPresent = proofRecords.filter(
  (p) => p.proofRecordState === "PROOF_RECORD_PRESENT",
).length;

const counters: Counter[] = [
  {
    value: String(validationRows.length),
    label: "detections & contracts represented",
    meaning: "Endpoint, cloud, identity, and NDR/telemetry rows under controlled-test scope.",
    href: "/proof/#validation-registry",
  },
  {
    value: String(registryStats.totalFixtures),
    label: "controlled fixtures",
    meaning: "Positive and negative test fixtures across the validation registry.",
    href: "/proof/#validation-registry",
  },
  {
    value: String(registryStats.passedPackages),
    label: "validation packages passed",
    meaning: "Deterministic pass inside controlled-test scope; runtime stays blocked.",
    href: "/proof/#validation-registry",
  },
  {
    value: String(proofRecordsPresent),
    label: "public proof records",
    meaning: "Records with a stated ceiling and blocked promotions made visible.",
    href: "/proof/",
  },
  {
    value: String(artifacts.length),
    label: "reviewer artifacts",
    meaning: "Filterable receipts in the Evidence Bay; cards route to the evidence.",
    href: "/artifacts/#evidence-bay",
  },
  {
    value: String(blockedClaims.length),
    label: "blocked claims kept visible",
    meaning: "Runtime, signal, and stronger claims shown as blocked, not hidden.",
    href: "/controls/",
  },
];

export default function WorkDashboard() {
  return (
    <div className="workdash" aria-label="Work shipped dashboard">
      {counters.map((c) => (
        <a key={c.label} className="workdash__card" href={c.href}>
          <span className="workdash__value">{c.value}</span>
          <span className="workdash__label">{c.label}</span>
          <span className="workdash__meaning">{c.meaning}</span>
          <span className="workdash__inspect">Inspect →</span>
        </a>
      ))}
    </div>
  );
}
