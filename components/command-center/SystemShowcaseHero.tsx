import Link from "next/link";
import OrgSystemMap from "./OrgSystemMap";
import ProofOfWorkCounterRail from "./ProofOfWorkCounterRail";

export default function SystemShowcaseHero() {
  return (
    <section className="system-showcase-hero" aria-labelledby="system-showcase-title">
      <div className="system-showcase-hero__copy">
        <p className="cockpit-eyebrow">HawkinsOperations command center</p>
        <h1 id="system-showcase-title">A proof-governed AI security operations system.</h1>
        <p className="system-showcase-hero__doctrine">AI accelerates work. Evidence owns authority.</p>
        <p className="system-showcase-hero__lede">
          The public surface now exposes the machine: detection source, ATT&CK context, controlled
          validation, proof ceilings, Hoxline Gauntlet output, Claim Firewall decisions, Governance
          Saves, and rendering boundaries.
        </p>
        <div className="system-showcase-hero__actions" aria-label="Primary system routes">
          <Link href="/hoxline/">Open Hoxline</Link>
          <Link href="/governance-saves/">Explore Governance Saves</Link>
          <Link href="/detections/">Inspect Detection Ops</Link>
          <Link href="/claim-firewall/">Open Claim Firewall</Link>
        </div>
      </div>
      <div className="system-showcase-hero__machine">
        <OrgSystemMap />
      </div>
      <div className="system-showcase-hero__counters">
        <ProofOfWorkCounterRail />
      </div>
    </section>
  );
}

