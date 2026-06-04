import type { Metadata } from "next";
import ClaimFirewall from "@components/ClaimFirewall";
import { ceiling } from "@config/site";

export const metadata: Metadata = {
  title: "Claim Firewall | HawkinsOperations",
  description:
    "HawkinsOperations claim firewall for allowed wording, blocked wording, and proof promotion requirements.",
  alternates: {
    canonical: "/controls/",
  },
};

export default function ControlsPage() {
  return (
    <>
      <section className="controls-hero" aria-labelledby="claim-firewall-title">
        <div className="container controls-hero__grid">
          <div className="controls-hero__copy">
            <p className="cockpit-eyebrow">CI claim boundary console</p>
            <h1 id="claim-firewall-title" className="controls-hero__title">
              Claim Firewall
            </h1>
            <p className="controls-hero__lede">
              Unsupported security claims should fail before they reach the public page.
              Public wording stays below the evidence ceiling until evidence linkage and explicit promotion clear a stronger claim.
            </p>
            <div className="controls-hero__pills" aria-label="Claim Firewall public status">
              <span>RENDERING_ONLY</span>
              <span>{ceiling}</span>
              <span className="controls-hero__pill--blocked">NOT_PUBLIC_SAFE</span>
            </div>
          </div>

          <aside className="controls-hero__rail" aria-label="Public inspection layer">
            <span className="controls-hero__rail-label">Public inspection layer</span>
            <p>Reviewer navigation, blocked wording, and evidence-ceiling status are visible here.</p>
            <p>Green checks are evidence, not approval. AI support is labor, not authority.</p>
          </aside>

          <div className="controls-hero__console" aria-label="Wording to scanner to ceiling firewall diagram">
            <div className="controls-hero__console-head">
              <span>PUBLIC WORDING ROUTE</span>
              <span className="rubber-stamp-blocked">BLOCKED</span>
            </div>
            <div className="controls-hero__flow">
              <div className="controls-hero__node controls-hero__node--wording">
                <span>01</span>
                <strong>WORDING</strong>
                <p>Copy, metadata, proof cards, reviewer summaries.</p>
              </div>
              <div className="controls-hero__beam" aria-hidden="true" />
              <div className="controls-hero__node controls-hero__node--scanner">
                <span>02</span>
                <strong>SCANNER</strong>
                <p>Blocked terms, unsafe context, proof drift.</p>
                <em>fail closed</em>
              </div>
              <div className="controls-hero__beam controls-hero__beam--blocked" aria-hidden="true" />
              <div className="controls-hero__node controls-hero__node--ceiling">
                <span>03</span>
                <strong>CEILING</strong>
                <p>Evidence-linked claims only.</p>
              </div>
            </div>
            <div className="controls-hero__meter" aria-label="Evidence ceiling summary">
              <span>source</span>
              <span>validation</span>
              <span>runtime candidate</span>
              <span>evidence review</span>
              <span>human approval</span>
              <span className="controls-hero__meter-blocked">public proof blocked</span>
            </div>
            <div className="controls-hero__boundary-strip" role="note">
              <strong>Website rendering is not proof.</strong>
              <span>Public proof requires evidence linkage and explicit promotion.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container controls-main">
        <ClaimFirewall />
      </section>
    </>
  );
}
